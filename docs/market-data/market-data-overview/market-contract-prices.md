# Market Contract Prices

## Overview

Market contract prices are the reference prices an exchange publishes for a derivatives contract: the mark price, the index price, and the estimated settlement price. They answer the question "what does the exchange consider this contract to be worth right now, independent of the last trade?" and are the values exchanges use to value open positions, compute unrealized profit and loss, and trigger liquidations. Derivatives traders, risk managers, and quantitative researchers use them to mark positions, model liquidations, and hedge or estimate profit and loss ahead of expiration.

Coin Metrics collects contract prices from **futures** and **option** markets across its exchange coverage universe. The data can be accessed via the following endpoints:

* Historical and latest contract prices are available over the HTTP endpoint [`/timeseries/market-contract-prices`](https://docs.coinmetrics.io/api/v4#operation/getTimeseriesMarketContractPrices)
* A real-time streaming feed is available over the websocket endpoint [`/timeseries-stream/market-contract-prices`](https://docs.coinmetrics.io/api/v4#operation/getTimeseriesStreamMarketContractPrices)

## At a Glance

<table data-full-width="true"><thead><tr><th>Data type</th><th>Entities</th><th width="159">Frequency / cadence</th><th>Unit</th><th>Primary endpoints</th><th>Coverage</th></tr></thead><tbody><tr><td>Market contract prices (mark, index, estimated settlement)</td><td>Markets (futures and options)</td><td>One-minute cadence (HTTP). Real-time, per update (websocket)</td><td>Price, in the units reported by each exchange (see field descriptions)</td><td><code>/timeseries/market-contract-prices</code><br><br><code>/timeseries-stream/market-contract-prices</code></td><td><a href="https://coverage.coinmetrics.io/market-contract-prices-v2">🔗</a></td></tr></tbody></table>

## Schema

One observation is the set of contract prices for a single market at a point in time. The columns below are the response schema for `/timeseries/market-contract-prices`. The websocket feed carries the same prices, adds a `cm_sequence_id`, and omits `database_time`.

| Field | Type | Description | Notes |
| --- | --- | --- | --- |
| `market` | string | Unique name of the market. Futures follow `exchange-symbol-future` and options follow `exchange-symbol-option`. | Required |
| `time` | string (date-time) | The Coin Metrics collection time of the observation. ISO 8601, nanosecond precision. See [Timestamps](#timestamps). | Required |
| `mark_price` | string (decimal) | The contract's fair market value calculated by the exchange for risk-management purposes, used to value positions and trigger liquidations. See [Mark price](#mark-price). | Futures and options |
| `index_price` | string (decimal) | The price of the contract's underlying benchmark index, an aggregate derived from spot markets across major exchanges. See [Index price](#index-price). | Futures and options |
| `settlement_price_estimated` | string (decimal) | A continuously updated estimate of what the contract's settlement price would be if it settled immediately. See [Estimated settlement price](#estimated-settlement-price). | Options and dated futures. Some perpetual futures (exchange-dependent) |
| `database_time` | string (date-time) | The time Coin Metrics stored the observation. ISO 8601, nanosecond precision. | Returned by the HTTP endpoint. Not present in websocket messages |
| `exchange_time` | string (date-time) | The exchange-reported event time for the observation, when the exchange supplies one. | Populated for options that report it. Null for futures over HTTP |
| `cm_sequence_id` | string | Per-connection message sequence number for ordering a live stream. Resets on reconnection. | Websocket messages only |

{% hint style="info" %}
**Conventions.** Prices are returned as JSON **strings** to preserve precision. Timestamps are UTC ISO-8601 with nanosecond resolution. `time` is the Coin Metrics collection time of the observation. `exchange_time` is the exchange-reported event time, when available. `database_time` is when Coin Metrics stored the observation (HTTP endpoint). Null fields are omitted from the response. Units are per-field: mark and settlement prices are quoted in the contract's own terms (for example, an option premium may be quoted in the underlying asset), while the index price is quoted in the index's currency.
{% endhint %}

## Methodology

Contract prices are reported by each exchange and passed through by Coin Metrics without transformation. The three prices are distinct measures, and each exchange computes them with its own methodology, so values are not directly comparable across venues.

### Mark price

The mark price is the value an exchange assigns to a contract for risk management. It is used to calculate a trader's unrealized profit and loss and to trigger liquidations. Each exchange applies its own methodology, which is typically a function of the index price, the funding rate, and the best bid and best ask, with smoothing applied over a short interval. Exchanges avoid using the last traded price for risk management because it is more susceptible to manipulation, and the smoothing helps prevent unnecessary liquidations during volatile periods.

### Index price

The index price is the price of the derivative contract's underlying index. Each exchange applies its own methodology, which typically weights spot prices for the underlying asset across several exchanges so that the index is representative of the market-consensus price.

### Estimated settlement price

The estimated settlement price is an estimate of what the contract's settlement price would be if it were settled immediately. Each exchange applies its own methodology for the final settlement price, which typically averages the index price over an interval, and the estimated settlement price applies that methodology continuously in real time. It is most useful for hedging or for estimating profit and loss ahead of expiration. It is produced for option and dated futures markets, and for some perpetual futures depending on the exchange.

The estimated settlement price is not the final, realized settlement price. Once a contract expires and settles, the exchange publishes the actual settlement price as contract reference data. That value is available in the `settlement_price` field of [Market Reference Data](market-reference-data.md).

### Collection and cadence

Coin Metrics operates real-time feed handlers that collect contract prices directly from each exchange, using the exchange's streaming feed or its REST interface depending on the venue. The mark, index, and estimated settlement prices are values the exchange recomputes and republishes continuously, often several times per minute.

To keep the historical series compact, regularly spaced, and easy to align with other one-minute data, Coin Metrics stores a single observation per market per minute. Each collected update is assigned to its one-minute bucket, and one observation is kept per bucket. This has two consequences:

* The HTTP endpoint returns at most one observation per market per minute, with `time` aligned to the start of the minute. This is the historical record.
* The websocket feed delivers each update as it is collected, so it can carry several updates within the same minute. Use it when you need full, real-time resolution.

Because the stored series is a once-per-minute sample, intra-minute movement in the mark or index price is not captured in the historical HTTP data. Prices are preserved as exact decimal strings and are never converted to floating point, so no precision is lost.

### Timestamps

A contract-price observation carries up to three timestamps, and what they represent differs slightly between futures and options:

* `time`: the Coin Metrics collection time of the observation, aligned to the start of the one-minute storage bucket. It always lands on a round minute rather than on the exact instant the exchange published the value.
* `exchange_time`: the exchange-reported event time. It is populated for option markets whose exchange supplies a timestamp, where it records the precise instant of the retained observation even though `time` is aligned to the minute. It is not populated for futures over the HTTP endpoint.
* `database_time`: when Coin Metrics stored the observation. Returned by the HTTP endpoint and not present in websocket messages.

For most uses `time` is the field to key on, since it is always present and regularly spaced. When you need the exact moment the exchange reported an option observation, use `exchange_time`. For futures over the HTTP endpoint, `time` is the only timestamp available.

## Accessing the Data

Contract prices are available over HTTP at `/timeseries/market-contract-prices` for historical and latest queries, and as a real-time websocket feed at `/timeseries-stream/market-contract-prices`.

### Historical and Latest (HTTP)

{% tabs %}
{% tab title="Python Client" %}
```python
import os
from datetime import timedelta
from coinmetrics.api_client import CoinMetricsClient

client = CoinMetricsClient(os.environ["CM_API_KEY"])

# Contract prices over a time range, fetched in parallel and returned as a DataFrame.
df = client.get_market_contract_prices(
    markets=["binance-BTCUSDT-future"],
    start_time="2025-01-01",
    end_time="2025-01-02",
    format="json_stream",
).parallel(time_increment=timedelta(days=1)).to_dataframe()

print(df)

# For just the latest values, use limit_per_market instead (uses format="json"):
# client.get_market_contract_prices(markets=["binance-BTCUSDT-future"], limit_per_market=5).to_dataframe()
```
{% endtab %}

{% tab title="Shell" %}
```shell
curl --compressed "https://api.coinmetrics.io/v4/timeseries/market-contract-prices?markets=binance-BTCUSDT-future&limit_per_market=5&api_key=$CM_API_KEY"
```
{% endtab %}

{% tab title="Python" %}
```python
import os, requests

response = requests.get(
    "https://api.coinmetrics.io/v4/timeseries/market-contract-prices",
    params={"markets": "binance-BTCUSDT-future", "limit_per_market": 5,
            "api_key": os.environ["CM_API_KEY"]},
).json()
print(response)
```
{% endtab %}
{% endtabs %}

The `markets` parameter accepts a comma-separated list or wildcard patterns such as `deribit-*-option` or `*-USDT-future`, so you can query many markets in one call. The `granularity` parameter controls resolution: the default `raw` returns the stored one-minute series, and `1m`, `1h`, or `1d` downsample it further by keeping the first observation in each interval.

### Real-Time Stream (Websocket)

The stream sends each contract-price update as a standalone message as it is collected, carrying a per-connection `cm_sequence_id` for ordering and omitting `database_time`. Use `backfill=latest` (the default) to receive the most recent value just before switching to real time, or `backfill=none` to receive only new updates.

{% tabs %}
{% tab title="Python Client" %}
```python
stream = client.get_stream_market_contract_prices(markets=["binance-BTCUSDT-future"])
stream.run()   # prints updates as they arrive, Ctrl-C to stop
```
{% endtab %}

{% tab title="Shell" %}
```shell
websocat "wss://api.coinmetrics.io/v4/timeseries-stream/market-contract-prices?markets=binance-BTCUSDT-future&api_key=$CM_API_KEY"
```
{% endtab %}

{% tab title="JavaScript" %}
```javascript
ws = new WebSocket("wss://api.coinmetrics.io/v4/timeseries-stream/market-contract-prices?markets=binance-BTCUSDT-future&api_key=<YOUR_API_KEY>")
ws.onmessage = m => console.log(m.data)
ws.onclose = () => console.log("closed")
```
{% endtab %}
{% endtabs %}

Full parameter reference: see the API Reference for [`/timeseries/market-contract-prices`](https://docs.coinmetrics.io/api/v4/#operation/getTimeseriesMarketContractPrices) and [`/timeseries-stream/market-contract-prices`](https://docs.coinmetrics.io/api/v4/#operation/getTimeseriesStreamMarketContractPrices).

## Examples

Examples below show the latest observations for representative markets. Numeric quantities are returned as JSON strings.

### Example: perpetual future (`/timeseries/market-contract-prices`)

The latest contract prices from `binance-BTCUSDT-future`. This market has no exchange-reported timestamp, so `exchange_time` is omitted ([browser](https://api.coinmetrics.io/v4/timeseries/market-contract-prices?markets=binance-BTCUSDT-future\&limit_per_market=3\&api_key=YOUR_API_KEY)):

```json
{
  "data": [
    {
      "market": "binance-BTCUSDT-future",
      "time": "2026-07-13T15:43:00.000000000Z",
      "database_time": "2026-07-13T15:43:17.993949000Z",
      "mark_price": "62613",
      "index_price": "62625.57543478",
      "settlement_price_estimated": "62788.07992862"
    },
    {
      "market": "binance-BTCUSDT-future",
      "time": "2026-07-13T15:44:00.000000000Z",
      "database_time": "2026-07-13T15:44:19.005001000Z",
      "mark_price": "62610",
      "index_price": "62622.53130435",
      "settlement_price_estimated": "62781.55594746"
    },
    {
      "market": "binance-BTCUSDT-future",
      "time": "2026-07-13T15:45:00.000000000Z",
      "database_time": "2026-07-13T15:45:18.012352000Z",
      "mark_price": "62629.36781884",
      "index_price": "62641.10934783",
      "settlement_price_estimated": "62777.02471393"
    }
  ]
}
```

### Example: option (`/timeseries/market-contract-prices`)

The latest contract prices from the `deribit-BTC-14JUL26-64000-C-option` market. Option observations additionally carry `exchange_time`, and for options the mark price is quoted in the underlying asset ([browser](https://api.coinmetrics.io/v4/timeseries/market-contract-prices?markets=deribit-BTC-14JUL26-64000-C-option\&limit_per_market=3\&api_key=YOUR_API_KEY)):

```json
{
  "data": [
    {
      "market": "deribit-BTC-14JUL26-64000-C-option",
      "time": "2026-07-13T15:44:00.000000000Z",
      "database_time": "2026-07-13T15:44:02.537842000Z",
      "mark_price": "0.0004",
      "index_price": "62561.18",
      "settlement_price_estimated": "62561.18",
      "exchange_time": "2026-07-13T15:44:00.592000000Z"
    },
    {
      "market": "deribit-BTC-14JUL26-64000-C-option",
      "time": "2026-07-13T15:45:00.000000000Z",
      "database_time": "2026-07-13T15:45:05.600893000Z",
      "mark_price": "0.0004",
      "index_price": "62587.49",
      "settlement_price_estimated": "62587.49",
      "exchange_time": "2026-07-13T15:45:05.152000000Z"
    },
    {
      "market": "deribit-BTC-14JUL26-64000-C-option",
      "time": "2026-07-13T15:46:00.000000000Z",
      "database_time": "2026-07-13T15:46:08.641909000Z",
      "mark_price": "0.0004",
      "index_price": "62544.52",
      "settlement_price_estimated": "62544.52",
      "exchange_time": "2026-07-13T15:46:08.201000000Z"
    }
  ]
}
```

### Example: real-time stream (`/timeseries-stream/market-contract-prices`)

Messages from `wss://api.coinmetrics.io/v4/timeseries-stream/market-contract-prices?markets=binance-BTCUSDT-future`. Each message carries a per-connection `cm_sequence_id` and omits `database_time`, and updates can arrive several times within a minute:

```json
{"market": "binance-BTCUSDT-future", "time": "2026-07-13T15:45:07.000000000Z", "mark_price": "62625.22238406", "index_price": "62636.96391304", "settlement_price_estimated": "62776.8484436", "exchange_time": "2026-07-13T15:45:07.000000000Z", "cm_sequence_id": "0"}
{"market": "binance-BTCUSDT-future", "time": "2026-07-13T15:45:36.000000000Z", "mark_price": "62591.8", "index_price": "62609.5373913", "settlement_price_estimated": "62773.96487355", "exchange_time": "2026-07-13T15:45:36.000000000Z", "cm_sequence_id": "1"}
{"market": "binance-BTCUSDT-future", "time": "2026-07-13T15:45:39.000000000Z", "mark_price": "62598.2", "index_price": "62614.68304348", "settlement_price_estimated": "62773.66470024", "exchange_time": "2026-07-13T15:45:39.000000000Z", "cm_sequence_id": "2"}
```

## Coverage

{% embed url="https://coverage.coinmetrics.io/market-contract-prices-v2" %}

## Usage

* **Historical (HTTP)** is best for backfills and for mark-to-market or liquidation studies over a time range. Use `.parallel(time_increment=…)` for large ranges, `limit_per_market` for a quick "latest N" look, and `granularity` to downsample.
* **The websocket stream** is best for consuming contract prices live in production. Order messages within a connection by `cm_sequence_id`, which resets whenever the connection is re-established.
* **Estimated versus final settlement.** Use `settlement_price_estimated` for a real-time estimate ahead of expiration, and the `settlement_price` field of [Market Reference Data](market-reference-data.md) for the realized value once a contract settles.

## Limitations

* **Cross-exchange comparability.** Each exchange computes the mark, index, and estimated settlement prices with its own methodology, so values are not directly comparable across venues.
* **Estimated settlement availability.** `settlement_price_estimated` is produced for option and dated futures markets, and only for some perpetual futures depending on the exchange. It can be null where an exchange does not report it.
* **Exchange time availability.** `exchange_time` is populated for option markets that report it and is null for futures over the HTTP endpoint.
* **Historical resolution.** The historical record is the once-per-minute series served over HTTP. Sub-minute changes in the mark, index, or estimated settlement price are available only in real time over the websocket feed, so a market's exact intra-minute price path is not retained in the HTTP history.

## FAQ

### What is the difference between the mark price and the index price?

The index price is the price of the contract's underlying benchmark, typically an aggregate of spot prices across several exchanges. The mark price is what the exchange uses to value open positions and trigger liquidations. It is derived from the index price but usually also incorporates the funding rate and the current best bid and ask, with smoothing applied, so it can differ from both the index price and the last traded price.

### What is the difference between the estimated settlement price and the final settlement price?

`settlement_price_estimated` is a continuously updated estimate of what the contract would settle at if it settled immediately, served here on `/timeseries/market-contract-prices`. The final settlement price is the realized value published once the contract actually expires and settles. It is available in the `settlement_price` field of [Market Reference Data](market-reference-data.md).

### Why is `settlement_price_estimated` missing for my perpetual future?

An estimated settlement price is most meaningful for contracts that settle, so it is reliably produced for options and dated futures. Perpetual futures do not expire, and most exchanges do not report an estimated settlement price for them, so the field is often null. Some exchanges do report one, in which case it is served.

### Why does the websocket stream show more frequent updates than the HTTP endpoint?

Contract prices are collected continuously but stored as a once-per-minute sample, so the HTTP endpoint returns up to one observation per market per minute. The websocket stream delivers each update as it is collected, so it can carry several updates within the same minute. If you need the full intra-minute price path, use the stream, because that resolution is not retained in the historical HTTP series.

### Why is `time` on a round minute, and which timestamp should I use?

Coin Metrics stores one observation per market per minute, and `time` is aligned to the start of that one-minute bucket, so it lands on a round minute rather than on the exact instant the exchange published the value. Key on `time` for most uses, since it is always present and regularly spaced. When you need the precise instant of an observation, use `exchange_time`, which option markets populate with the exchange's own event time. Futures do not carry `exchange_time` over the HTTP endpoint.

### What does the `granularity` parameter do?

`granularity` sets the resolution of the HTTP response. The default `raw` returns the stored one-minute series. `1m`, `1h`, and `1d` downsample it further by keeping the first observation in each interval. Timestamps are not rewritten, so a downsampled `time` is the real timestamp of the observation that was kept.

### Why is `exchange_time` empty for some markets?

`exchange_time` is the exchange's own event timestamp, which not every feed provides. It is populated for option markets that report it and is null for futures over the HTTP endpoint. Use `time`, the Coin Metrics collection time, as the always-present timestamp.

## Related

* [Market Reference Data](market-reference-data.md): contract specifications and the final `settlement_price` for expired contracts.
* [Market Trades](market-trades.md): executed trades, which for derivatives also carry `mark_price` and `index_price`.
* [Market Open Interest](open_interest/market-open-interest.md): the number of outstanding contracts on derivatives markets.
* [Funding Rates](funding-rates/funding-rates.md): periodic payments that keep perpetual futures aligned to the index price.
