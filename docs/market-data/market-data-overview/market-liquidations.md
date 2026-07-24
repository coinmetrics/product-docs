# Market Liquidations

## Overview

A liquidation is a forced order or trade that an exchange uses to close a leveraged position before the trader's losses exceed their collateral. Exchanges that offer futures let participants hold positions with notional value far larger than their account balance, which raises the possibility of losing more than they deposited. To contain that risk, the exchange sets a liquidation price for each position and, if the market reaches it, forcibly closes the position. Traders, risk teams, and researchers use liquidation data to gauge forced-selling pressure, study cascades during volatile moves, and build leverage and market-stress indicators.

Coin Metrics collects liquidations from **futures** markets across its exchange coverage universe and harmonizes the differing formats each exchange reports into one schema. The data can be accessed via the following endpoints:

* Historical liquidations are available over the HTTP endpoint [`/timeseries/market-liquidations`](https://docs.coinmetrics.io/api/v4#operation/getTimeseriesMarketLiquidations)
* A real-time streaming feed is available over the websocket endpoint [`/timeseries-stream/market-liquidations`](https://docs.coinmetrics.io/api/v4#operation/getTimeseriesStreamMarketLiquidations)

## At a Glance

<table data-full-width="true"><thead><tr><th>Data type</th><th>Entities</th><th width="159">Frequency / cadence</th><th>Unit</th><th>Primary endpoints</th><th>Coverage</th></tr></thead><tbody><tr><td>Market liquidations (forced closes on futures markets)</td><td>Markets (futures)</td><td>Event-driven (one observation per liquidation order or trade)</td><td>Price in the quote asset. Amount is the liquidated size in the exchange's native unit (number of contracts on most futures venues)</td><td><code>/timeseries/market-liquidations</code><br><br><code>/timeseries-stream/market-liquidations</code></td><td><a href="https://coverage.coinmetrics.io/market-liquidations-v2">🔗</a></td></tr></tbody></table>

## Schema

One observation is a single liquidation order or liquidation trade. Every observation carries the fields below. The websocket feed carries the same fields except where noted. The columns below are the response schema for `/timeseries/market-liquidations`.

| Field | Type | Description | Notes |
| --- | --- | --- | --- |
| `market` | string | Unique name of the market. Futures markets follow the `exchange-symbol-future` convention, for example `binance-BTCUSDT-future`. | Required |
| `time` | string (date-time) | The exchange-reported event time. ISO 8601, nanosecond precision. | Required. On a small number of venues this is Coin Metrics' receive time (see [Timestamps](#timestamps)) |
| `coin_metrics_id` | string | Identifier of a liquidation, unique per exchange market. Uses the exchange-reported value when it is numeric, otherwise it is derived from the exchange's data (see [Identifiers](#identifiers)). | Required |
| `amount` | string (decimal) | The size that was liquidated, reported in the exchange's native size unit. This is the number of contracts on most futures venues, and base-asset units on venues that size positions in the base asset. | Required |
| `price` | string (decimal) | The price at which the liquidation trade executed, or at which the liquidation order was set, quoted in the quote asset. | Required |
| `side` | string | The order-book (aggressor) side of the trade or order that closes the position under liquidation, not the side of the original position. `buy` means an incoming buy order removed an ask from the book. `sell` means an incoming sell order removed a bid. | Optional in the schema. Populated for all current data |
| `type` | string | `trade` means the liquidation was executed. `order` means a liquidation order was placed at this timestamp but had not necessarily executed yet. | Required |
| `database_time` | string (date-time) | The time Coin Metrics stored the observation. ISO 8601, nanosecond precision. | Returned by the HTTP endpoint. Not present in websocket messages |
| `cm_sequence_id` | string | Per-connection message sequence number for ordering a live stream. Resets on reconnection. | Websocket messages only |

{% hint style="info" %}
**Conventions.** Prices and amounts are returned as JSON **strings** to preserve precision. Timestamps are UTC ISO-8601 with nanosecond resolution. `time` is the exchange-reported event time, and `database_time` is when Coin Metrics stored the observation (HTTP endpoint). `side` reflects the side of the order or trade that closes the position under liquidation. Units are per-field (see the table).
{% endhint %}

## Methodology

Liquidation reporting differs widely across exchanges. Some publish the liquidation order at the moment a position enters forced closure, others publish the resulting executed trades, and the size, price, and side conventions are not consistent between venues. Coin Metrics harmonizes these into the single schema above.

### Collection

Coin Metrics operates feed handlers that record liquidations from each supported exchange as they happen, and backfills history where an exchange permits querying it. Liquidations are collected from nine exchanges: **Binance, Bitfinex, BitMEX, Bybit, Deribit, dYdX, Huobi, Kraken, and OKEx**. Most venues are collected over a real-time websocket. A few are polled or backfilled over the exchange's REST interface instead, either because the exchange offers no real-time liquidation stream or because it tags liquidations only after a delay. For the authoritative, current list of markets and their history start dates, see the [coverage page](https://coverage.coinmetrics.io/market-liquidations-v2).

Exchanges expose liquidations in one of two ways, and Coin Metrics collects from whichever a venue provides:

* **Dedicated liquidation feed.** Most venues publish a separate liquidation stream or historical endpoint that carries liquidation orders or liquidation trades directly. Binance, Bybit, BitMEX, OKEx, Huobi, and Bitfinex work this way.
* **Liquidation-tagged trades.** Some venues have no separate liquidation feed. Instead, liquidations appear inside the regular trades feed, marked with a liquidation tag or trade type, and Coin Metrics identifies them by that marker. Kraken and Deribit work this way.

In both cases the records are normalized into the single schema above, so the source is transparent to the consumer.

### Normalization

Each exchange's native message is parsed into a common liquidation record. Prices and amounts are preserved as exact decimal **strings** and never converted to floating point, so no precision is lost. The exchange's native timestamp resolution is preserved and served at nanosecond precision in UTC.

### Liquidation orders and trades

The `type` field distinguishes the two ways exchanges report a liquidation:

* A liquidation **order** (`type` = `order`) is the forced order the exchange places when a position first enters liquidation, typically a limit order at the bankruptcy price. It shows the size and price of the position being closed but does not represent the matched executions.
* A liquidation **trade** (`type` = `trade`) is an actual matched execution that results from closing the position.

Some exchanges report only liquidation orders, some report only liquidation trades, and some report both. When an exchange reports both, Coin Metrics stores both and distinguishes them with the `type` field.

### Aggregated and individual liquidations

Among the exchanges that report liquidation trades, the granularity differs. Some aggregate a liquidation into a single row that sums the amount and averages the price across all matched trades. Others report each matched trade as its own observation, so one liquidation can appear as several rows.

### Liquidation side

`side` is normalized to the order-book (aggressor) convention across all venues, and it generally describes the order or trade that **closes** the position under liquidation rather than the original position. For example, if a trader holds a long position and the price falls far enough to trigger liquidation, the position is closed by a sell, so the observation has a `side` of `sell`.

Most exchanges report the side this way already. Some report the side of the original position instead (for example Bybit), which Coin Metrics inverts to match the house convention.

### Identifiers

Every liquidation carries a `coin_metrics_id` that is designed to be unique per exchange market, so that each observation stays distinct. Even two adjacent liquidations with identical `time`, `price`, `amount`, and `side` remain separate records. It is derived as follows:

* If the exchange reports a numeric liquidation id, that value is used as-is.
* If the exchange reports a string id (for example a hexadecimal identifier), it is mapped bijectively to a stable numeric value.
* If the exchange reports no unique id, one is synthesized from the liquidation's own data (such as its timestamp, price, and amount), with a disambiguating counter so that identical liquidations in the same instant remain distinct.

### Deduplication and redundancy

To stay resilient to disconnects and outages, Coin Metrics runs redundant collectors per exchange. Observations are deduplicated on a composite key of **exchange, market, and liquidation id**, so every liquidation persisted to the database is unique regardless of how many collectors observed it. The first record written for a key wins, and later duplicates are discarded rather than overwriting it. The live stream applies the same uniqueness rule so a reconnect does not resend liquidations a consumer has already seen.

### Timestamps

A liquidation can carry two timestamps. The gap between them measures collection lag, which is useful for backtests and simulations that need to know exactly what data was available at a given point in time:

* `time`: the exchange-reported event time. On a small number of venues the exchange does not stamp its liquidation messages, so `time` is Coin Metrics' receive time instead.
* `database_time`: when Coin Metrics persisted the observation (HTTP endpoint).

## Accessing the Data

Liquidations are available over HTTP at `/timeseries/market-liquidations` for historical queries and as a real-time websocket feed at `/timeseries-stream/market-liquidations`.

### Historical Liquidations (HTTP)

{% tabs %}
{% tab title="Python Client" %}
```python
import os
from datetime import timedelta
from coinmetrics.api_client import CoinMetricsClient

client = CoinMetricsClient(os.environ["CM_API_KEY"])

# Liquidations over a time range, fetched in parallel and returned as a DataFrame.
df = client.get_market_liquidations(
    markets=["binance-BTCUSDT-future"],
    start_time="2025-01-01",
    end_time="2025-01-02",
    format="json_stream",
).parallel(time_increment=timedelta(days=1)).to_dataframe()

print(df)

# For just the latest liquidations, use limit_per_market instead (uses format="json"):
# client.get_market_liquidations(markets=["binance-BTCUSDT-future"], limit_per_market=5).to_dataframe()
```
{% endtab %}

{% tab title="Shell" %}
```shell
curl --compressed "https://api.coinmetrics.io/v4/timeseries/market-liquidations?markets=binance-BTCUSDT-future&limit_per_market=5&api_key=$CM_API_KEY"
```
{% endtab %}

{% tab title="Python" %}
```python
import os, requests

response = requests.get(
    "https://api.coinmetrics.io/v4/timeseries/market-liquidations",
    params={"markets": "binance-BTCUSDT-future", "limit_per_market": 5,
            "api_key": os.environ["CM_API_KEY"]},
).json()
print(response)
```
{% endtab %}
{% endtabs %}

The `markets` parameter accepts a comma-separated list or wildcard patterns such as `binance-*`, `*-USDT-future`, or `*-future`, so you can query many markets in one call.

### Real-Time Stream (Websocket)

The stream sends each liquidation as a standalone message as it arrives, carrying a per-connection `cm_sequence_id` for ordering. Use `backfill=latest` (the default) to receive the latest values just before switching to real time, or `backfill=none` to receive only new liquidations.

{% tabs %}
{% tab title="Python Client" %}
```python
stream = client.get_stream_market_liquidations(markets=["binance-BTCUSDT-future"])
stream.run()   # prints liquidations as they arrive, Ctrl-C to stop
```
{% endtab %}

{% tab title="Shell" %}
```shell
websocat "wss://api.coinmetrics.io/v4/timeseries-stream/market-liquidations?markets=binance-BTCUSDT-future&api_key=$CM_API_KEY"
```
{% endtab %}

{% tab title="JavaScript" %}
```javascript
ws = new WebSocket("wss://api.coinmetrics.io/v4/timeseries-stream/market-liquidations?markets=binance-BTCUSDT-future&api_key=<YOUR_API_KEY>")
ws.onmessage = m => console.log(m.data)
ws.onclose = () => console.log("closed")
```
{% endtab %}
{% endtabs %}

Full parameter reference: see the API Reference for [`/timeseries/market-liquidations`](https://docs.coinmetrics.io/api/v4/#operation/getTimeseriesMarketLiquidations) and [`/timeseries-stream/market-liquidations`](https://docs.coinmetrics.io/api/v4/#operation/getTimeseriesStreamMarketLiquidations).

## Examples

Examples below show the latest liquidations for a representative market. Numeric quantities are returned as JSON strings.

### Example: liquidation trade (`/timeseries/market-liquidations`)

The latest liquidations from `binance-BTCUSDT-future` ([browser](https://api.coinmetrics.io/v4/timeseries/market-liquidations?markets=binance-BTCUSDT-future\&limit_per_market=3\&api_key=YOUR_API_KEY)):

```json
{
  "data": [
    {
      "market": "binance-BTCUSDT-future",
      "time": "2026-07-14T00:00:10.077000000Z",
      "coin_metrics_id": "1783987210077000000",
      "amount": "0.152",
      "price": "62324.9",
      "type": "trade",
      "database_time": "2026-07-14T00:00:12.282335000Z",
      "side": "buy"
    },
    {
      "market": "binance-BTCUSDT-future",
      "time": "2026-07-14T00:00:13.827000000Z",
      "coin_metrics_id": "1783987213827000000",
      "amount": "0.073",
      "price": "62326.9",
      "type": "trade",
      "database_time": "2026-07-14T00:00:15.047135000Z",
      "side": "buy"
    },
    {
      "market": "binance-BTCUSDT-future",
      "time": "2026-07-14T00:00:15.361000000Z",
      "coin_metrics_id": "1783987215361000000",
      "amount": "0.591",
      "price": "62325.6",
      "type": "trade",
      "database_time": "2026-07-14T00:00:16.580605000Z",
      "side": "buy"
    }
  ]
}
```

### Example: real-time stream (`/timeseries-stream/market-liquidations`)

Messages from `wss://api.coinmetrics.io/v4/timeseries-stream/market-liquidations?markets=binance-BTCUSDT-future`. Each message is a single liquidation carrying an incrementing `cm_sequence_id`, and it omits `database_time`:

```json
{"market": "binance-BTCUSDT-future", "time": "2026-07-14T00:00:15.361000000Z", "coin_metrics_id": "1783987215361000000", "amount": "0.591", "price": "62325.6", "type": "trade", "side": "buy", "cm_sequence_id": "0"}
{"market": "binance-BTCUSDT-future", "time": "2026-07-14T00:10:24.501000000Z", "coin_metrics_id": "1783987824501000000", "amount": "0.002", "price": "62345", "type": "trade", "side": "buy", "cm_sequence_id": "1"}
```

## Coverage

{% embed url="https://coverage.coinmetrics.io/market-liquidations-v2" %}

## Usage

* **Historical (HTTP)** is best for backfills and event studies of forced-selling pressure, for example reconstructing liquidation cascades around a sharp price move. Use `.parallel(time_increment=…)` for large time ranges, and `limit_per_market` for a quick "latest N" look.
* **The websocket stream** is best for monitoring liquidations live in production. Order messages within a connection by `cm_sequence_id`, which resets whenever the connection is re-established.
* **For aggregated volumes** rather than individual events, see the [Liquidation Metrics](liquidation-metrics.md), which sum liquidation volume in native units and U.S. dollars over 5-minute, hourly, and daily intervals.

## Limitations

* **Reporting differs by exchange.** Venues vary in whether they report liquidation orders, liquidation trades, or both, and in whether trades are aggregated into one row or reported individually (see [Methodology](#methodology)). Some exchanges also include data on the original position while others do not.
* **Amount units are not uniform.** `amount` is the exchange's native size, which is the number of contracts on most futures venues and base-asset units on others. The per-market contract specification (`contract_size` and `size_asset`) is published in [Market Reference Data](market-reference-data.md). Compare sizes within the same market rather than across exchanges, and use the [Liquidation Metrics](liquidation-metrics.md) for values normalized to native units and U.S. dollars.
* **Event time on some venues is receive time.** Where an exchange does not timestamp its liquidation messages, `time` reflects when Coin Metrics received the message rather than the exchange event time.
* **History depth and outage recovery vary by exchange.** A few venues expose a queryable liquidation history that Coin Metrics backfills (for example Deribit and Bitfinex, which are collected from their historical interfaces rather than in real time, and Deribit tags liquidations only after a delay). Most venues are real-time only with no liquidation history to re-query, so a collection or exchange outage leaves a gap that cannot be filled afterward. The incidents listed below are examples of this.
* **Some fields follow exchange-specific conventions.** On venues that report liquidation orders rather than executed trades (`type` = `order`), `amount` and `price` describe the order, not a confirmed execution. In particular, OKEx reports the bankruptcy price rather than the fill price, and BitMEX reports the size still open on the liquidation order rather than the amount actually filled. Compare these values within a single market rather than across venues.
* **Binance delivers aggregated liquidations.** Binance's public liquidation feed pushes at most one update per market per second, so not every individual liquidation is delivered. Each Binance observation reflects the exchange's per-interval snapshot (its size and average price) rather than a complete record of every liquidation in that window. This has been the case since a Binance API change in 2021 (see below).
* **dYdX liquidations include auto-deleveraging.** The dYdX feed surfaces both liquidations and auto-deleveraging (ADL) events as liquidation observations. Consumers who treat auto-deleveraging as distinct from ordinary liquidations should account for this.

### Known historical data issues

{% hint style="warning" %}
The items below are historical and are retained for reference. Confirm against current coverage before relying on them.
{% endhint %}

* **Binance liquidations are missing from 2021-04-27 to 2021-05-11** because of a breaking change Binance made to its API on 2021-04-27.
* **Binance liquidations are underreported for roughly four months after 2021-04-27.** Before that date Binance reported every liquidation. The API change made Binance report only the latest liquidation within each 1,000 ms window. Coin Metrics changed its collection on 2021-08-31 to use the total quantity liquidated in the interval and the average price of the interval, but data captured between 2021-05-11 and 2021-08-31 remains underreported and cannot be recovered, since Binance does not permit collecting historical liquidations. Liquidations before 2021-04-27 are accurate.
* **OKEx: prior to 2021-09-21, when OKEx reported two adjacent liquidations with identical time, amount, and price, only the first was stored.** This was corrected on 2021-09-21.
* **BitMEX liquidations are underreported prior to 2021-09-20** because of rate limits the exchange imposed. This was corrected on 2021-09-20.
* **Bybit liquidations were interrupted from 2021-09-24 to 2021-09-29** because of a deprecation of the exchange's API endpoint. This was corrected on 2021-09-29.

## FAQ

### What does the liquidation side represent?

It represents the side of the trade or order used to close the position under liquidation, not the side of the original position. For example, if a trader holds a long position and a price decline triggers liquidation, the position is closed by a sell, so the observation has a `side` of `sell`.

### What determines the frequency of liquidations data?

There is no fixed frequency. Liquidations are event-based, like trades. Whenever an exchange liquidates a position, the data is collected in real time. In a flat market you see few liquidations, while high volatility produces a much denser stream.

### How is `amount` denominated?

`amount` is the exchange's native size unit. On most futures venues this is the number of contracts, and on venues that size positions in the base asset it is base-asset units. To turn a contract count into notional or base-asset terms, use the per-market contract specification (`contract_size` and `size_asset`) in [Market Reference Data](market-reference-data.md), which publishes the full contract terms for every derivatives market. Because the unit is not uniform across exchanges, compare sizes within the same market, or use the [Liquidation Metrics](liquidation-metrics.md) for volumes normalized to native units and U.S. dollars.

### How do you ensure the data contains no duplicate liquidations?

Coin Metrics runs redundant collectors per exchange for resilience. Observations are deduplicated on a composite key of exchange, market id, and liquidation id, so each record stored in the database is unique regardless of how many collectors observed it.

### Is there a way to pull data for multiple markets in one API call?

Yes. The `markets` parameter accepts wildcards such as `binance-*`, `*-USDT-future`, or `*-future`, as well as a comma-separated list of individual markets, so you do not need to enumerate every market.

## Related

* [Liquidation Metrics](liquidation-metrics.md): liquidation volume aggregated to 5-minute, hourly, and daily bars in native units and U.S. dollars.
* [Market Trades](market-trades.md): executed trades, including a `liquidation` flag on derivatives trades.
* [Market Open Interest](market-open-interest.md): outstanding derivatives positions on the same markets.
* [Funding Rates](market-funding-rates.md): perpetual-futures funding rates on the same markets.
* [Obtaining Futures Market Liquidations](../../tutorials-and-examples/tutorials/obtaining-futures-market-liquidations.md): a worked example that pulls and charts liquidations.
