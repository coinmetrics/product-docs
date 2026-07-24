# Market Open Interest

## Overview

Open interest is the number of contracts that are currently outstanding and not yet settled for a derivatives market. It measures how much capital is committed to a market rather than how much has traded, so it is a direct read on positioning and leverage. Traders, risk teams, and researchers use open interest to size crowding in a contract, track the build-up and unwind of positions, and combine it with price, funding, and liquidations to study derivatives markets.

Coin Metrics collects open interest from **futures** and **options** markets across its exchange coverage universe and serves it as a per-market time series. The data can be accessed over two endpoints:

* Historical queries and latest snapshots over the HTTP endpoint [`/timeseries/market-openinterest`](https://docs.coinmetrics.io/api/v4/#operation/getTimeseriesMarketOpenIntereset).
* A real-time feed over the websocket endpoint [`/timeseries-stream/market-openinterest`](https://docs.coinmetrics.io/api/v4/#operation/getTimeseriesStreamMarketOpenInterest).

## At a Glance

<table data-full-width="true"><thead><tr><th>Data type</th><th>Entities</th><th width="159">Frequency / cadence</th><th>Unit</th><th>Primary endpoints</th><th>Coverage</th></tr></thead><tbody><tr><td>Market open interest (outstanding contracts on derivatives markets)</td><td>Markets (futures and options)</td><td>Snapshot. About one minute for most markets, sub-minute for a few streamed venues, and up to once per trading day for some (for example CME)</td><td>Number of contracts (<code>contract_count</code>). A deprecated <code>value_usd</code> is also returned (see below)</td><td><code>/timeseries/market-openinterest</code><br><br><code>/timeseries-stream/market-openinterest</code></td><td><a href="https://coverage.coinmetrics.io/market-openinterest-v2">🔗</a></td></tr></tbody></table>

## Schema

One observation is a single open interest snapshot for one market at one point in time. Every observation carries the fields below. The columns are the response schema for `/timeseries/market-openinterest`. The websocket feed carries the same fields except that it omits `database_time` and adds `cm_sequence_id` (see the Notes column).

| Field | Type | Description | Notes |
| --- | --- | --- | --- |
| `market` | string | Unique name of the market. Futures markets follow the `exchange-symbol-future` convention (for example `binance-BTCUSDT-future`), options markets follow `exchange-symbol-option` (for example `deribit-BTC-31JUL26-70000-C-option`). | Required |
| `time` | string (date-time) | The snapshot time in ISO 8601, nanosecond precision. Aligned to the minute for most markets. See [Snapshot timing](#snapshot-timing-and-timestamps) for how this value is set per exchange. | Required |
| `contract_count` | string | The open interest denominated in number of outstanding contracts. Returned as a decimal string. | Required. Futures, options |
| `value_usd` | string (decimal) | Deprecated. Open interest converted to U.S. dollars using legacy per-exchange logic that no longer reflects current contract specifications across all venues. See [The deprecated USD value field](#the-deprecated-usd-value-field). | Deprecated. Still returned |
| `database_time` | string (date-time) | The time Coin Metrics stored the observation, in ISO 8601, nanosecond precision. Use this for the exact instant a value was recorded. | Returned by the HTTP endpoint. Not present in websocket messages |
| `exchange_time` | string (date-time) | Always equal to `time`. Open interest is stored with a single timestamp, which is returned in both fields, so `exchange_time` is not an independent exchange-reported time. Present for schema consistency with other market data types. See [Snapshot timing](#snapshot-timing-and-timestamps). | Optional. Mirrors `time` |
| `cm_sequence_id` | string | Per-connection message sequence number for ordering a live stream. Resets on reconnection. | Websocket messages only |

{% hint style="warning" %}
**`value_usd` is deprecated.** It was derived at collection time using per-exchange conversion logic that no longer reflects current contract specifications across all venues, so its values are unreliable and it is retained only for backward compatibility. For open interest denominated in U.S. dollars, use the reported open interest metrics instead: `open_interest_reported_future_usd` for futures notional, `open_interest_reported_option_notional_usd` for options notional, and `open_interest_reported_option_market_value_usd` for options market value. These three are the direct per-market replacement, served on the `/timeseries/market-metrics` family. The full metric family, including perpetual, margin-asset, and call/put breakdowns, is also available aggregated by asset, exchange, exchange-asset, and pair. See [Open Interest Metrics](open-interest-metrics.md).
{% endhint %}

{% hint style="info" %}
**Conventions.** Numeric quantities are returned as JSON **strings** to preserve precision. Timestamps are UTC ISO-8601 with nanosecond resolution. `time` is the snapshot time (for most markets this is Coin Metrics' collection time truncated to the minute), and `database_time` is when Coin Metrics stored the observation. Units are per-field (see the table).
{% endhint %}

## Methodology

Open interest is reported directly by each exchange, and Coin Metrics records it as a per-market snapshot series without re-deriving the underlying positions. The mechanics below cover how snapshots are taken, how the count is denominated, and why the U.S. dollar field is deprecated.

### Collection

Coin Metrics collects open interest from the futures and options markets of the exchanges in its coverage universe, using whichever method a venue supports:

* **Polling.** Most venues are polled over their REST endpoints on a fixed interval of about one minute, and each poll records the current open interest for a market.
* **Streaming.** A few venues push open interest over a websocket, and Coin Metrics records each update as the exchange sends it.
* **Daily or backfilled.** A small number of venues publish open interest only periodically. CME, for example, reports once per trading day at market close and is collected through a daily backfill rather than a real-time feed.

For the authoritative, current list of markets, exchanges, and history start dates, see the [coverage page](https://coverage.coinmetrics.io/market-openinterest-v2).

### Update cadence

How often a market produces a new observation depends on how it is collected, and that cadence carries through to the [real-time stream](#accessing-the-data).

* **Polled venues (most markets).** Open interest is polled about once per minute, and the snapshot time is aligned to the minute (see [Snapshot timing](#snapshot-timing-and-timestamps)), so a market produces at most one distinct observation per minute. On the stream you receive at most one message per market per minute.
* **Streamed venues.** A small number of venues are collected over websocket, and their open interest keeps the exchange's own sub-minute (millisecond) timestamp rather than being rounded to the minute. These markets can produce several observations per minute, and the stream delivers each one. As of this writing the streamed venues are Coinbase Derivatives and Crypto.com. Treat this as subject to change and confirm against current coverage.
* **Daily and backfilled venues.** Venues that publish open interest only periodically (for example CME, once per trading day) are served over the HTTP endpoint but are not carried on the real-time stream.

This cadence holds even though Coin Metrics polls each market continuously and runs redundant collectors for resilience, because observations are deduplicated by market and timestamp (see [Deduplication](#deduplication)): repeated same-minute observations and duplicate collector output collapse to a single point.

### Snapshot timing and timestamps

Open interest is stored with a single collected timestamp, returned in both `time` and `exchange_time`, plus a separate storage timestamp `database_time`. The gap between the snapshot time and `database_time` measures collection lag:

* `time` is the snapshot time, aligned to the minute. For most markets it is Coin Metrics' collection time truncated to the minute, and the collectors cycle as close to the top of the minute as the exchange allows. For some feeds it is the exchange-reported time instead (for example CME's daily market-close time and certain options feeds).
* `exchange_time` is always equal to `time`. Because open interest is stored with one timestamp, this field repeats `time` rather than carrying an independent exchange-reported value. Treat `time` as the authoritative snapshot time.
* `database_time` is when Coin Metrics stored the observation. Because `time` is aligned to the minute for most markets, `database_time` is the field to use when you need the precise instant a value was recorded.

### Contract counts and units

`contract_count` is the number of outstanding contracts as reported by the exchange. Coin Metrics does not apply any cross-exchange normalization to the count, so different venues can express the same economic exposure differently, and open interest conventions follow the exchange. In particular, most exchanges report one-sided open interest while some report two-sided (notably CME). For a small number of venues where the exchange publishes open interest in underlying or notional units rather than contracts, Coin Metrics converts it to a contract count using the contract size. To turn a contract count into notional or base-asset terms, use the per-market contract specification (`contract_size` and the size asset) published in [Market Reference Data](market-reference-data.md).

### Deduplication

Coin Metrics runs redundant collectors for resilience, so the same observation can be produced more than once. Observations are deduplicated by market and timestamp: two observations for the same market with the same snapshot time collapse to a single point, both in the stored history and on the real-time stream. For polled venues, whose snapshot time is aligned to the minute, this means repeated within-minute polls and duplicate collector output reduce to one observation per market per minute. For streamed venues, whose timestamps carry sub-minute precision, each distinct timestamp is delivered, while exact-duplicate timestamps (for example the same update seen by two collectors) are collapsed.

### The deprecated USD value field

The `value_usd` field was computed at collection time by converting the contract count into U.S. dollars with per-exchange logic (for example multiplying by a price and a contract size). That logic relied on assumptions that no longer hold uniformly across venues as contract specifications changed, so the field was deprecated. It is still returned for backward compatibility, but its values should not be relied on.

For open interest in U.S. dollars, use the reported open interest metrics, which are computed from current contract specifications and reference rates and are aggregated by asset, exchange, exchange-asset, and pair. Futures are expressed as notional value, and options are expressed as both notional value and market value. See [Open Interest Metrics](open-interest-metrics.md) for the metric list and formulas.

## Accessing the Data

Open interest is available over HTTP for historical queries and latest snapshots, and as a real-time websocket feed.

### Historical and Latest Snapshots (HTTP)

Query one or more markets over a time range at `/timeseries/market-openinterest`, or use `limit_per_market` for the latest snapshots. The `markets` parameter accepts a comma-separated list or wildcard patterns such as `binance-*`, `*USDT-future`, or `*-option`, so you can query many markets in one call. Use the `granularity` parameter (`raw`, `1m`, `1h`, `1d`) to downsample: each downsampled point is the first snapshot in the aligned window.

{% tabs %}
{% tab title="Python Client" %}
```python
import os
from datetime import timedelta
from coinmetrics.api_client import CoinMetricsClient

client = CoinMetricsClient(os.environ["CM_API_KEY"])

# Open interest over a time range, downsampled hourly, fetched in parallel as a DataFrame.
df = client.get_market_open_interest(
    markets=["binance-BTCUSDT-future"],
    start_time="2025-01-01",
    end_time="2025-01-02",
    granularity="1h",
    format="json_stream",
).parallel(time_increment=timedelta(days=1)).to_dataframe()

print(df)

# For just the latest snapshots, use limit_per_market instead (uses format="json"):
# client.get_market_open_interest(markets=["binance-BTCUSDT-future"], limit_per_market=5).to_dataframe()
```
{% endtab %}

{% tab title="Shell" %}
```shell
curl --compressed "https://api.coinmetrics.io/v4/timeseries/market-openinterest?markets=binance-BTCUSDT-future&limit_per_market=5&api_key=$CM_API_KEY"
```
{% endtab %}

{% tab title="Python" %}
```python
import os, requests

response = requests.get(
    "https://api.coinmetrics.io/v4/timeseries/market-openinterest",
    params={"markets": "binance-BTCUSDT-future", "limit_per_market": 5,
            "api_key": os.environ["CM_API_KEY"]},
).json()
print(response)
```
{% endtab %}
{% endtabs %}

### Real-Time Stream (Websocket)

The stream sends each open interest update as a standalone message as it arrives at `/timeseries-stream/market-openinterest`, carrying a per-connection `cm_sequence_id` for ordering. Use `backfill=latest` (the default) to receive the most recent value just before switching to real time, or `backfill=none` to receive only new updates. Websocket messages omit `database_time`.

Message cadence follows how each market is collected (see [Update cadence](#update-cadence)): about one message per market per minute for polled venues, and more frequent sub-minute messages for venues streamed in real time. Venues that publish open interest only once per trading day (for example CME) are available over HTTP but are not carried on the stream, and observations older than 30 minutes are not delivered on the live feed.

{% tabs %}
{% tab title="Python Client" %}
```python
stream = client.get_stream_market_open_interest(markets=["binance-BTCUSDT-future"])
stream.run()   # prints open interest updates as they arrive, Ctrl-C to stop
```
{% endtab %}

{% tab title="Shell" %}
```shell
websocat "wss://api.coinmetrics.io/v4/timeseries-stream/market-openinterest?markets=binance-BTCUSDT-future&api_key=$CM_API_KEY"
```
{% endtab %}

{% tab title="JavaScript" %}
```javascript
ws = new WebSocket("wss://api.coinmetrics.io/v4/timeseries-stream/market-openinterest?markets=binance-BTCUSDT-future&api_key=<YOUR_API_KEY>")
ws.onmessage = m => console.log(m.data)
ws.onclose = () => console.log("closed")
```
{% endtab %}
{% endtabs %}

Full parameter reference: see the API Reference for [`/timeseries/market-openinterest`](https://docs.coinmetrics.io/api/v4/#operation/getTimeseriesMarketOpenIntereset) and [`/timeseries-stream/market-openinterest`](https://docs.coinmetrics.io/api/v4/#operation/getTimeseriesStreamMarketOpenInterest).

## Examples

Examples below show the latest snapshots for a representative futures market and a representative options market. Numeric quantities are returned as JSON strings.

### Example: futures market

The latest open interest for `binance-BTCUSDT-future` ([browser](https://api.coinmetrics.io/v4/timeseries/market-openinterest?markets=binance-BTCUSDT-future\&limit_per_market=3\&api_key=YOUR_API_KEY)):

```json
{
  "data": [
    {
      "market": "binance-BTCUSDT-future",
      "time": "2026-07-15T18:39:00.000000000Z",
      "contract_count": "103679.234",
      "value_usd": "6743172964.2792",
      "database_time": "2026-07-15T18:39:36.565505000Z",
      "exchange_time": "2026-07-15T18:39:00.000000000Z"
    },
    {
      "market": "binance-BTCUSDT-future",
      "time": "2026-07-15T18:40:00.000000000Z",
      "contract_count": "103678.269",
      "value_usd": "6739087485",
      "database_time": "2026-07-15T18:40:45.379798000Z",
      "exchange_time": "2026-07-15T18:40:00.000000000Z"
    },
    {
      "market": "binance-BTCUSDT-future",
      "time": "2026-07-15T18:41:00.000000000Z",
      "contract_count": "103679.953",
      "value_usd": "6738533393.3008",
      "database_time": "2026-07-15T18:41:20.062023000Z",
      "exchange_time": "2026-07-15T18:41:00.000000000Z"
    }
  ]
}
```

### Example: options market

The latest open interest for `deribit-BTC-31JUL26-70000-C-option` ([browser](https://api.coinmetrics.io/v4/timeseries/market-openinterest?markets=deribit-BTC-31JUL26-70000-C-option\&limit_per_market=3\&api_key=YOUR_API_KEY)):

```json
{
  "data": [
    {
      "market": "deribit-BTC-31JUL26-70000-C-option",
      "time": "2026-07-15T18:44:00.000000000Z",
      "contract_count": "17638.1",
      "value_usd": "1145789672.386",
      "database_time": "2026-07-15T18:44:10.363868000Z",
      "exchange_time": "2026-07-15T18:44:00.000000000Z"
    },
    {
      "market": "deribit-BTC-31JUL26-70000-C-option",
      "time": "2026-07-15T18:45:00.000000000Z",
      "contract_count": "17638.1",
      "value_usd": "1145164401.741",
      "database_time": "2026-07-15T18:45:11.423308000Z",
      "exchange_time": "2026-07-15T18:45:00.000000000Z"
    },
    {
      "market": "deribit-BTC-31JUL26-70000-C-option",
      "time": "2026-07-15T18:46:00.000000000Z",
      "contract_count": "17638.1",
      "value_usd": "1145862870.501",
      "database_time": "2026-07-15T18:46:13.441009000Z",
      "exchange_time": "2026-07-15T18:46:00.000000000Z"
    }
  ]
}
```

### Example: real-time stream

Messages from `wss://api.coinmetrics.io/v4/timeseries-stream/market-openinterest?markets=binance-BTCUSDT-future`. Each message is a single open interest update carrying an incrementing `cm_sequence_id`, and it omits `database_time`:

```json
{"market": "binance-BTCUSDT-future", "time": "2026-07-15T20:31:00.000000000Z", "contract_count": "103444.983", "value_usd": "6723323914.0986", "exchange_time": "2026-07-15T20:31:00.000000000Z", "cm_sequence_id": "0"}
{"market": "binance-BTCUSDT-future", "time": "2026-07-15T20:32:00.000000000Z", "contract_count": "103446.084", "value_usd": "6726116104.722", "exchange_time": "2026-07-15T20:32:00.000000000Z", "cm_sequence_id": "1"}
```

## Coverage

{% embed url="https://coverage.coinmetrics.io/market-openinterest-v2" %}

## Usage

* **Latest positioning.** Use `limit_per_market` for a quick "latest N" look at a market's current open interest, or a wildcard such as `*-future` to scan many markets at once.
* **History and downsampling.** Use a `start_time` / `end_time` range with `.parallel(time_increment=…)` for backfills, and `granularity` (`1m`, `1h`, `1d`) to reduce the minute-level series to coarser bars.
* **Real-time monitoring.** Use the websocket stream to track open interest live. Order messages within a connection by `cm_sequence_id`, which resets whenever the connection is re-established.
* **U.S. dollar and aggregated open interest.** For open interest denominated in U.S. dollars, or aggregated by asset, exchange, exchange-asset, or pair, use the [Open Interest Metrics](open-interest-metrics.md) metrics rather than the deprecated `value_usd` field.
* **Derivatives context.** Combine open interest with [Funding Rates](market-funding-rates.md) and [Market Liquidations](market-liquidations.md) on the same markets to study leverage build-up and unwind.

## Limitations

* **`value_usd` is deprecated.** Do not rely on it. Use the reported open interest U.S. dollar metrics instead (see above).
* **Open interest is not standardized across exchanges.** The count follows each exchange's own convention. Most venues report one-sided open interest while some report two-sided (notably CME), so compare open interest within a single market rather than summing raw counts across exchanges. Consult the exchange's own documentation to confirm its convention.
* **Contract counts are in contracts, not a common unit.** A contract represents a venue- and market-specific amount of the underlying. Use the per-market `contract_size` and size asset in [Market Reference Data](market-reference-data.md) to convert a count into notional or base-asset terms.
* **Cadence varies by venue.** Most markets are snapshotted about once per minute. A few streamed venues update sub-minute, and some publish less frequently (for example CME reports once per trading day). See [Update cadence](#update-cadence). A collection or exchange outage leaves a gap, and the endpoint does not forward-fill missing intervals.

## FAQ

### Why do some markets update every minute while others update more or less often?

It depends on how each exchange's open interest is collected. Most venues are polled about once per minute, so their markets carry roughly one observation per minute. A few venues are streamed over websocket and keep the exchange's sub-minute timestamp, so those markets can update several times per minute. Some venues publish open interest only periodically: CME, for example, reports once per trading day at market close, so its markets carry one observation per day (available over HTTP, not on the real-time stream). See [Update cadence](#update-cadence), and the [coverage page](https://coverage.coinmetrics.io/market-openinterest-v2) for the markets available per exchange.

### Is the snapshot taken exactly on the minute?

The `time` field is aligned to the minute. For most markets it is Coin Metrics' collection time truncated to the minute, and the collectors cycle as close to the top of the minute as the exchange allows. For some feeds it is the exchange-reported time instead. If you need the precise instant Coin Metrics recorded a value, use the `database_time` field.

### How do I get open interest in U.S. dollars?

Use the reported open interest metrics rather than the deprecated `value_usd` field. `open_interest_reported_future_usd` gives futures notional in U.S. dollars, `open_interest_reported_option_notional_usd` gives options notional, and `open_interest_reported_option_market_value_usd` gives options market value. Those three are available per market on the `/timeseries/market-metrics` family. The full metric family, including perpetual, margin-asset, and call/put breakdowns, is also available aggregated by asset, exchange, exchange-asset, and pair. See [Open Interest Metrics](open-interest-metrics.md).

### Do you have open interest for assets, exchanges, asset pairs, or exchange-asset pairs?

Yes. Coin Metrics calculates aggregated open interest metrics for assets (for example `btc`), exchanges (for example `binance`), asset pairs (for example `btc-usd`), and exchange-asset pairs (for example `binance-btc`). See [Open Interest Metrics](open-interest-metrics.md).

## Related

* [Open Interest Metrics](open-interest-metrics.md): open interest aggregated in U.S. dollars by asset, exchange, exchange-asset, and pair.
* [Market Reference Data](market-reference-data.md): per-market contract specifications, including `contract_size` and the size asset.
* [Market Liquidations](market-liquidations.md): forced closes on the same derivatives markets.
* [Funding Rates](market-funding-rates.md): perpetual-futures funding rates on the same markets.
* [Exploring Options, Open Interest, and Volatility Data](../../tutorials-and-examples/tutorials/exploring-options-open-interest-and-volatility-data.md): a worked example that pulls and charts open interest.
