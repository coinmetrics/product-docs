# Core Concepts

This page covers the building blocks you’ll use most often: how the client lazily models requests as `DataCollection` objects, how to convert them into DataFrames, and how to export them to files.

## DataCollection

Every method on `CoinMetricsClient` returns a `DataCollection`. A `DataCollection` is a lazy wrapper around the underlying request: it captures the endpoint and parameters, but it does **not** hit the API until you iterate over it or call a transformation method (`to_list()`, `to_dataframe()`, `export_to_csv()`, …).

By default, time-series methods stream their response (`format='json_stream'`), so a single iteration over a `DataCollection` typically fetches everything in one continuous response. For example, to get market trades for the Coinbase BTC-USD pair:

```python
for trade in client.get_market_trades(
    markets='coinbase-btc-usd-spot',
    start_time='2020-01-01',
    end_time='2020-01-03',
    limit_per_market=10,
):
    print(trade)
```

The same pattern works for daily metrics:

```python
for metric_data in client.get_asset_metrics(
    assets='btc',
    metrics=['ReferenceRateUSD', 'BlkHgt', 'AdrActCnt', 'AdrActRecCnt', 'FlowOutBFXUSD'],
    frequency='1d',
    limit_per_asset=10,
):
    print(metric_data)
```

### Exploring Available Data

Use the `catalog_*_v2` methods to discover what data is available. For example, to list markets that report `trades` data:

```python
print(client.catalog_market_trades_v2(markets='coinbase-btc-usd-spot').to_list())
```

You can also filter by exchange, base, or quote:

```python
print(client.catalog_market_trades_v2(exchange='coinbase', base='btc', quote='usd').to_list())
```

The `catalog-v2` endpoints are designed to feed the historical-data endpoints. For example, to fetch one hour of all BTC market trades from Coinbase:

```python
btc_coinbase_markets = [
    market['market']
    for market in client.catalog_market_trades_v2(exchange="coinbase", asset="btc").to_list()
]
client.get_market_trades(
    markets=btc_coinbase_markets,
    start_time="2023-01-01T00:00:00",
    end_time="2023-01-01T01:00:00",
).export_to_csv("coinbase_trades.csv")
```

## DataFrames

### Pandas

`DataCollection.to_dataframe()` materializes the response as a pandas DataFrame:

```python
print(client.catalog_market_metrics_v2(exchange="coinbase", base='btc', quote='usd').to_dataframe())
```

You can use the full pandas API to filter, transform, and persist the result:

```python
import pandas as pd
import os
from datetime import timedelta
from coinmetrics.api_client import CoinMetricsClient

client = CoinMetricsClient(os.environ['CM_API_KEY'])
coinbase_markets = client.catalog_market_trades_v2(
    exchange="coinbase", base="btc", quote="usd",
).to_dataframe()
coinbase_markets['max_time'] = pd.to_datetime(coinbase_markets['max_time'], utc=True)
one_day_ago = pd.Timestamp.now(tz='UTC') - timedelta(days=1)
recent = coinbase_markets[coinbase_markets['max_time'] > one_day_ago]
```

Time-series data converts the same way:

```python
trades = client.get_market_trades(
    markets='coinbase-btc-usd-spot',
    start_time='2021-09-19T00:00:00Z',
    limit_per_market=10,
)
trades_df = trades.to_dataframe()
print(trades_df.head())
```

Column types are derived from the endpoint’s schema. To override types for specific columns, pass a `dtype_mapper`:

```python
mapper = {'SplyFF': 'Float64', 'AdrBalUSD1Cnt': 'Int64'}
df_mapped = client.get_asset_metrics(
    assets=['btc', 'xmr'],
    metrics=['volume_trusted_spot_usd_1d', 'SplyFF', 'AdrBalUSD1Cnt'],
    start_time='2021-12-01',
    limit_per_asset=3,
).to_dataframe(dtype_mapper=mapper)
```

### Polars

[Polars](https://docs.pola.rs/) is a high-performance DataFrame library and a more performant alternative to pandas in many cases. Pass `dataframe_type="polars"` to `to_dataframe()`:

```python
df = client.get_asset_metrics(
    'btc', 'ReferenceRateUSD', limit_per_asset=1,
).to_dataframe(dataframe_type="polars")
```

### LazyFrames

DataFrames eagerly load data into memory. *Lazy* execution defers materialization, which is useful when you want to apply intermediate transformations to large datasets before collecting. Convert a `DataCollection` into a polars [`LazyFrame`](https://docs.pola.rs/api/python/stable/reference/lazyframe/README.md) with `to_lazyframe()`. See the [Best Practices](best-practices.md) guide for an in-depth example.

## Data Exports

You can stream a `DataCollection` directly to a CSV, JSON, or Parquet file using `export_to_csv()`, `export_to_json()`, and `export_to_parquet()`:

```python
import datetime

start_date = datetime.date(2022, 1, 1)
end_date = datetime.date(2022, 1, 2)

client.get_market_trades(
    markets="coinbase-btc-usd-spot",
    start_time=start_date,
    end_time=end_date,
).export_to_csv("jan_1_2022_coinbase_btc_trades.csv")

client.get_market_trades(
    markets="coinbase-eth-usd-spot",
    start_time=start_date,
    end_time=end_date,
).export_to_json("jan_1_2022_coinbase_eth.json")

client.get_market_trades(
    markets="coinbase-sol-usd-spot",
    start_time=start_date,
    end_time=end_date,
).export_to_parquet("jan_1_2022_coinbase_sol.parquet")
```

For large historical exports across many assets or markets, see the [Parallel Execution](best-practices.md#parallel-execution) section in the Best Practices guide, which uses `parallel().export_to_csv_files()`, `parallel().export_to_json_files()`, and `parallel().export_to_parquet_files()` to write one file per worker.
