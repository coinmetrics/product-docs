# Best Practices

This page describes recommended patterns for getting the most out of the Python API Client. See also the [official efficiency guide](https://docs.coinmetrics.io/tutorials-and-examples/user-guides/how-to-use-the-coin-metrics-api-efficiently-http#python-api-client) for guidance that applies to the Coin Metrics API more broadly.

## Use Catalog and Reference Data First

Most workflows are faster, cheaper, and more reliable when you discover the universe of valid assets, markets, or metrics with `reference_data_*` and `catalog_*_v2` *before* hitting the historical-data endpoints. The catalog also tells you which markets actually have recent data, which lets you drop obsolete entries before paying for a full timeseries pull.

![API_Flow_Illustration](/.gitbook/assets/api_flow.png)

For example, follow the flow indicated in light blue.

**Step 1.** List all spot markets:

```python
spot_markets = client.reference_data_markets(type='spot').to_dataframe()
```

**Step 2.** Use the catalog to keep only markets that have minute candles available within the last two days:

```python
from datetime import datetime, timedelta, timezone

cat = client.catalog_market_candles_v2(
    markets=list(spot_markets.market),
).to_dataframe()
cat = cat.loc[
    (cat.frequency == '1m') &
    (cat.max_time > datetime.now(timezone.utc) - timedelta(days=2))
].reset_index(drop=True)
```

[Demo Video](https://youtu.be/YSC_pwd1B5k?si=DAEQaSthsE4uumkK&amp;t=71)

**Step 3.** Pass the filtered list to a historical-data method (and, for large pulls, layer `parallel()` on top — see the next section). The same pattern applies to asset metrics: instead of calling `get_asset_metrics` directly with `*`, derive the asset and metric lists from `reference_data_assets` and `catalog_asset_metrics_v2` and pass them in explicitly.

{% hint style="info" %}
Driving `CoinMetricsClient` methods from a pre-filtered list of assets / markets / metrics is consistently more performant than relying on wildcards, and it pairs naturally with `.parallel()` because each parallel worker gets a single, well-scoped query.
{% endhint %}

## Parallel Execution

For large historical exports the most effective lever is to split your request into many smaller requests and run them in parallel. The client supports this directly via `.parallel()`:

```python
import os
from coinmetrics.api_client import CoinMetricsClient


if __name__ == '__main__':
    client = CoinMetricsClient(os.environ['CM_API_KEY'])
    coinbase_eth_markets = [
        market['market']
        for market in client.catalog_market_candles_v2(exchange="coinbase", base="eth").to_list()
    ]
    client.get_market_candles(
        markets=coinbase_eth_markets,
        start_time="2024-03-01",
        end_time="2024-05-01",
    ).parallel().export_to_json_files()
```

`.parallel()` either writes one file per worker (`export_to_csv_files()`, `export_to_json_files()`, `export_to_parquet_files()`) or merges every worker's output into a single result (`to_list()`, `to_dataframe()`, `export_to_csv()`, `export_to_json()`). Internally it uses Python's [`concurrent.futures`](https://docs.python.org/3/library/concurrent.futures.html), so it consumes more resources than a single-threaded request and may approach the [Coin Metrics rate limits](https://docs.coinmetrics.io/api/v4/#tag/Rate-limits).

In rough order of resource usage and speed (most performant first):

* `.export_to_parquet_files()`
* `.export_to_json_files()`
* `.export_to_csv_files()`
* `.to_list()`
* `.export_to_json()`
* `.to_dataframe()`

### Splitting Across Time

Use `time_increment` to split a single query into many parallel requests along the time axis. This example pulls a year of minute-frequency reference rates for three assets in parallel:

```python
import datetime
import os
from coinmetrics.api_client import CoinMetricsClient
from dateutil.relativedelta import relativedelta

client = CoinMetricsClient(os.environ.get("CM_API_KEY"))
assets = ["btc", "eth", "sol"]

if __name__ == '__main__':
    start_time = datetime.datetime.now()
    client.get_asset_metrics(
        assets=assets,
        metrics="ReferenceRateUSD",
        frequency="1m",
        start_time="2024-01-01",
        end_time="2025-01-01",
        end_inclusive=False,
    ).parallel(
        time_increment=relativedelta(months=1),
    ).export_to_csv("btcRRs.csv")
    print(f"Time taken parallel: {datetime.datetime.now() - start_time}")

    start_time = datetime.datetime.now()
    client.get_asset_metrics(
        assets=assets,
        metrics="ReferenceRateUSD",
        frequency="1m",
        start_time="2024-01-01",
        end_time="2025-01-01",
        end_inclusive=False,
    ).export_to_csv("btcRRsNormal.csv")
    print(f"Time taken normal: {datetime.datetime.now() - start_time}")
```

`time_increment=relativedelta(months=1)` runs 36 workers in total — 12 monthly windows for each of the 3 assets. The wall-clock difference is dramatic:

```text
Exporting to dataframe type: 100%|██████████| 36/36 [00:00<00:00, 54.62it/s]
Time taken parallel: 0:00:36.654147
Time taken normal:   0:05:20.073826
```

Use `datetime.timedelta` for sub-month windows and `dateutil.relativedelta.relativedelta` for month- or year-sized windows.

### Guidelines

* `.parallel()` is best when you can split a request across many list-type parameters (`assets`, `markets`, `metrics`, ...) or along the time axis. Single-market or single-asset requests will not see a meaningful speedup.
* The `*_files()` exports are the safest and most performant choice — every worker writes its own file, so the client never needs to merge results in memory. The merging variants (`to_dataframe()`, `to_list()`, `export_to_csv()`) can use a lot of memory for high-volume endpoints like `market-trades` or `market-orderbooks` and may fail outright on very large windows.
* By default `*_files()` writes to `/{endpoint}/{parallelize_on}/...`. For example, `client.get_market_trades("coinbase-eth-btc-spot,coinbase-eth-usdc-spot").parallel("markets").export_to_json_files()` produces `./market-trades/coinbase-eth-btc-spot.json` and `./market-trades/coinbase-eth-usdc-spot.json`. Adding `time_increment=timedelta(days=1)` further nests the output under `start_time=...` directories.
* `.parallel()` is highly configurable — `max_workers`, a custom `executor` (e.g. `ProcessPoolExecutor`), and `progress_bar` are all available. Multithreaded code is harder to debug than single-threaded code, so this tool is best suited for historical exports rather than for real-time production systems.
* If you see `BrokenProcessPool`, [you are probably missing a `if __name__ == '__main__':` guard](https://stackoverflow.com/questions/15900366/all-example-concurrent-futures-code-is-failing-with-brokenprocesspool).
* Pass `verbose=True` or `debug=True` to `CoinMetricsClient(...)` if a parallel run is taking longer than expected.

## Lazy Execution

[Lazy execution](https://docs.pola.rs/user-guide/concepts/lazy-api/) lets you describe transformations on a `DataCollection` without materializing the result, which is useful when you want to filter on a column the API does not expose as a parameter. Convert a `DataCollection` into a polars [`LazyFrame`](https://docs.pola.rs/api/python/stable/reference/lazyframe/index.html) with `to_lazyframe()` and chain transformations onto it. See the [polars guide](https://docs.pola.rs/user-guide/lazy/using/) for the full lazy API.

```python
from datetime import datetime, timedelta
import os
import time
import polars as pl
from coinmetrics.api_client import CoinMetricsClient

client = CoinMetricsClient(os.environ.get("CM_API_KEY"))

# Example 1: Tether reference rate samples >= 1.00 USD
t0 = time.time()
eager_pandas = client.get_asset_metrics(
    assets="usdt", metrics="ReferenceRateUSD",
    end_time="2025-01-01", frequency='1h',
).to_dataframe()
eager_pandas = eager_pandas.loc[eager_pandas.ReferenceRateUSD >= 1.00]
print(f"Pandas: {time.time() - t0}s")

t0 = time.time()
eager_polars = client.get_asset_metrics(
    assets="usdt", metrics="ReferenceRateUSD",
    end_time="2025-01-01", frequency='1h',
).to_dataframe(dataframe_type="polars")
eager_polars = eager_polars.filter(pl.col("ReferenceRateUSD") >= 1.00)
print(f"Polars (Eager): {time.time() - t0}s")

t0 = time.time()
lazy = client.get_asset_metrics(
    assets="usdt", metrics="ReferenceRateUSD",
    end_time="2025-01-01", frequency='1h',
).to_lazyframe()
lazy = lazy.filter(pl.col("ReferenceRateUSD") >= 1.00)
print(f"Polars (Lazy): {time.time() - t0}s")

# Example 2: BTC FEES balance updates with change >= 0.001 BTC
start_time = datetime.now() - timedelta(hours=3)
end_time = datetime.now()

t0 = time.time()
lazy = client.get_list_of_balance_updates_v2(
    asset="btc", accounts="FEES",
    start_time=start_time, end_time=end_time,
).to_lazyframe()
lazy = lazy.cast({"change": pl.Float32}).filter(pl.col("change") >= 1.0E-3)
print(f"Polars (Lazy): {time.time() - t0}s")
```

## Wildcards

Wildcards (`*`) let you query several entities — assets, exchanges, markets — with a single parameter:

```python
asset_metrics = client.get_asset_metrics(
    assets='*', metrics='PriceUSD', limit_per_asset=1,
)

market_candles_btc_usd = client.get_market_candles(
    markets=['*-btc-usd-spot'], limit_per_market=10,
)

exchanges_reference = client.reference_data_exchanges().to_list()
market_candles_spot = client.get_market_candles(
    markets=[f"{exchange['exchange']}-*-spot" for exchange in exchanges_reference],
    limit_per_market=10,
)
```

Wildcards are convenient, but for historical exports prefer the catalog-driven flow described in Use Catalog and Reference Data First: resolving the concrete list of assets / markets first and feeding it to `.parallel()` is consistently faster, gives you a stable input you can reproduce, and lets you drop obsolete entries before they cost you a request.
