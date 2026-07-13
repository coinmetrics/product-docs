# Market Quotes

## Overview

A market quote is the best bid and best ask for a single market (like `coinbase-btc-usd-spot`) at a point in time. The best bid is the highest price a buyer is willing to pay for one unit of the base asset (spot) or one contract (derivatives), and the best ask is the lowest price a seller is willing to accept. This is the level-1, top-of-book view of the order book, and it answers "what is the tightest available price on this venue right now?" Traders, execution and trade cost analysis teams, and market-microstructure researchers use it as a compact price and spread signal without consuming the full book. Market quotes are conceptually similar to the National Best Bid and Offer (NBBO), the United States Securities and Exchange Commission regulation that requires brokers to execute customer trades at the best available price.

Coin Metrics serves market quotes in two complementary forms:

* A historical series over the HTTP endpoint [`/timeseries/market-quotes`](https://docs.coinmetrics.io/api/v4/#operation/getTimeseriesMarketQuotes), derived from stored order book snapshots.
* A real-time top-of-book feed over the websocket endpoint [`/timeseries-stream/market-quotes`](https://docs.coinmetrics.io/api/v4/#operation/getTimeseriesStreamMarketQuotes).

Because quotes are the level-1 view of the book, most collection and coverage questions are answered on the [Order Books](order-books.md) page.

## At a Glance

<table data-full-width="true"><thead><tr><th>Data type</th><th>Entities</th><th width="159">Frequency / cadence</th><th>Unit</th><th>Primary endpoints</th><th>Coverage</th></tr></thead><tbody><tr><td>Best bid / best ask (level-1, top of book)</td><td>Markets (spot, futures, options)</td><td><strong>HTTP</strong>: derived from the 10-second order book snapshots (major markets).<br><br><strong>Websocket</strong>: real-time, event-driven (on top-of-book change)</td><td>Price in quote currency. Size in base asset (spot) or contracts (derivatives)</td><td><code>/timeseries/market-quotes</code><br><br><code>/timeseries-stream/market-quotes</code></td><td><a href="https://coverage.coinmetrics.io/market-quotes-v2">🔗</a></td></tr></tbody></table>

## Schema

One observation is the best bid and best ask for a market at a single point in time. The table below is the response schema for `/timeseries/market-quotes`. The websocket stream carries the same fields plus `cm_sequence_id`.

| Field | Type | Description | Notes |
| --- | --- | --- | --- |
| `market` | string | Unique name of the market. Market ids follow `exchange-base-quote-spot` for spot, `exchange-symbol-future` for futures, and `exchange-symbol-option` for options. | |
| `time` | string (date-time) | The time of the quote in ISO 8601 date-time format, at nanosecond precision. Exchange-reported event time where the venue publishes one, otherwise Coin Metrics' receive time. | |
| `coin_metrics_id` | string | Identifier of the quote observation (for the HTTP series, the identifier of the underlying order book snapshot). Preserves the exchange's sequence number where one is provided, otherwise Coin Metrics-assigned. See [Identifiers and timestamps](#identifiers-and-timestamps). | |
| `ask_price` | string (decimal) | The limit price of the top ask on the book, in units of the quote currency. Omitted when the book has no asks. | See [One-sided books](#one-sided-books) |
| `ask_size` | string (decimal) | The size of the top ask on the book, in units of the base asset (spot) or number of contracts (derivatives). Omitted when the book has no asks. | See [One-sided books](#one-sided-books) |
| `bid_price` | string (decimal) | The limit price of the top bid on the book, in units of the quote currency. Omitted when the book has no bids. | See [One-sided books](#one-sided-books) |
| `bid_size` | string (decimal) | The size of the top bid on the book, in units of the base asset (spot) or number of contracts (derivatives). Omitted when the book has no bids. | See [One-sided books](#one-sided-books) |
| `cm_sequence_id` | string | Per-connection message sequence number for ordering the live stream. Monotonically increasing, resets on reconnection. | Websocket messages only |

{% hint style="info" %}
**Conventions.** Prices and sizes are returned as JSON **strings** to preserve precision. Timestamps are UTC ISO-8601 with nanosecond resolution. `time` is the exchange-reported event time where the venue publishes one, otherwise Coin Metrics' receive time. Units are per-field (see the table).
{% endhint %}

## Methodology

Market quotes are the top of the order book, produced in two ways depending on the endpoint.

### Real-time stream

The websocket feed is a dedicated top-of-book feed. Coin Metrics collects each market directly from the exchange and publishes a new message whenever the best bid or best ask changes. Messages where neither the best bid nor the best ask moved are suppressed, so each message reflects an actual change at the top of the book. Older or duplicate messages for a market are discarded, and each delivered message carries a `cm_sequence_id` for ordering within the connection.

### Historical series

The HTTP series is derived from stored order book snapshots. For each snapshot, Coin Metrics takes the single best bid and best ask (level-1) and serves them as a quote. As a result, the historical series follows the order book snapshot cadence rather than every top-of-book change: for major markets, snapshots are taken every 10 seconds. Each observation carries the exchange event time of the most recent update captured before the snapshot mark, so `time` typically falls a fraction of a second before each round 10-second mark rather than exactly on it. For the full mechanics of snapshot collection, cadence, and coverage, see the [Order Books](order-books.md) page.

### One-sided books

When one side of the book is empty, that side's price and size are omitted from the observation by default. Request `include_one_sided` to receive rows where only one side is present.

### Identifiers and timestamps

`coin_metrics_id` uniquely identifies the observation. When an exchange publishes its own sequence number or message id, Coin Metrics preserves it so you can order and de-duplicate messages exactly as the exchange does. When an exchange does not, Coin Metrics assigns its own identifier. For the HTTP series, `coin_metrics_id` is the identifier of the underlying order book snapshot the quote was taken from.

`time` is the exchange-reported event time for venues that publish a per-message timestamp. For venues that do not, `time` reflects the moment Coin Metrics received the message. The per-exchange breakdown of identifier and timestamp conventions is documented in the [Order Books](order-books.md#identifiers-and-timestamps) page and applies to quotes as well, since both are produced from the same collection.

## Accessing the Data

Market quotes are available over HTTP at `/timeseries/market-quotes` for the historical series, and as a real-time websocket feed at `/timeseries-stream/market-quotes`.

### Historical Series (HTTP)

{% tabs %}
{% tab title="Python Client" %}
```python
import os
from datetime import timedelta
from coinmetrics.api_client import CoinMetricsClient

client = CoinMetricsClient(os.environ["CM_API_KEY"])

# A time range, fetched in parallel and returned as a DataFrame.
df = client.get_market_quotes(
    markets=["coinbase-btc-usd-spot"],
    start_time="2025-01-01",
    end_time="2025-01-08",
    format="json_stream",
).parallel(time_increment=timedelta(days=1)).to_dataframe()

print(df)

# For just the latest quotes, use limit_per_market instead (uses format="json"):
# client.get_market_quotes(markets=["coinbase-btc-usd-spot"], limit_per_market=5).to_dataframe()
```
{% endtab %}

{% tab title="Shell" %}
```shell
curl --compressed "https://api.coinmetrics.io/v4/timeseries/market-quotes?markets=coinbase-btc-usd-spot&limit_per_market=5&api_key=$CM_API_KEY"
```
{% endtab %}

{% tab title="Python" %}
```python
import os, requests

response = requests.get(
    "https://api.coinmetrics.io/v4/timeseries/market-quotes",
    params={"markets": "coinbase-btc-usd-spot", "limit_per_market": 5,
            "api_key": os.environ["CM_API_KEY"]},
).json()
print(response)
```
{% endtab %}
{% endtabs %}

### Real-Time Stream (Websocket)

{% tabs %}
{% tab title="Python Client" %}
```python
stream = client.get_stream_market_quotes(markets=["coinbase-btc-usd-spot"])
stream.run()   # prints quotes as the top of book changes; Ctrl-C to stop
```
{% endtab %}

{% tab title="Shell" %}
```shell
websocat "wss://api.coinmetrics.io/v4/timeseries-stream/market-quotes?markets=coinbase-btc-usd-spot&api_key=$CM_API_KEY"
```
{% endtab %}

{% tab title="JavaScript" %}
```javascript
ws = new WebSocket("wss://api.coinmetrics.io/v4/timeseries-stream/market-quotes?markets=coinbase-btc-usd-spot&api_key=<YOUR_API_KEY>")
ws.onmessage = m => console.log(m.data)
ws.onclose = () => console.log("closed")
```
{% endtab %}
{% endtabs %}

Full parameter reference: see the API Reference for [`/timeseries/market-quotes`](https://docs.coinmetrics.io/api/v4/#operation/getTimeseriesMarketQuotes) and [`/timeseries-stream/market-quotes`](https://docs.coinmetrics.io/api/v4/#operation/getTimeseriesStreamMarketQuotes).

## Examples

### Example: latest market quotes (`/timeseries/market-quotes`)

The most recent quotes for `coinbase-btc-usd-spot` from the HTTP series ([browser](https://api.coinmetrics.io/v4/timeseries/market-quotes?markets=coinbase-btc-usd-spot\&limit_per_market=2\&api_key=YOUR_API_KEY)). The observations are 10 seconds apart, matching the order book snapshot cadence:

```json
{
  "data": [
    {
      "market": "coinbase-btc-usd-spot",
      "time": "2026-07-11T18:49:59.922619000Z",
      "coin_metrics_id": "1783795799922619-0",
      "ask_price": "64286.71",
      "ask_size": "0.28830549",
      "bid_price": "64286.7",
      "bid_size": "0.32114082"
    },
    {
      "market": "coinbase-btc-usd-spot",
      "time": "2026-07-11T18:50:09.969534000Z",
      "coin_metrics_id": "1783795809969534-0",
      "ask_price": "64286.71",
      "ask_size": "0.28699963",
      "bid_price": "64286.7",
      "bid_size": "0.29127939"
    }
  ]
}
```

### Example: real-time stream (`/timeseries-stream/market-quotes`)

Messages from `wss://api.coinmetrics.io/v4/timeseries-stream/market-quotes?markets=coinbase-btc-usd-spot`. Each carries a `cm_sequence_id` that increments per message on the connection:

```json
{
  "market": "coinbase-btc-usd-spot",
  "time": "2026-07-11T18:50:22.685923000Z",
  "coin_metrics_id": "1783744548545953-14302008",
  "ask_price": "64283.5",
  "ask_size": "0.72334502",
  "bid_price": "64283.49",
  "bid_size": "0.0372613",
  "cm_sequence_id": "0"
}
```

```json
{
  "market": "coinbase-btc-usd-spot",
  "time": "2026-07-11T18:50:23.024128000Z",
  "coin_metrics_id": "1783744548545953-14302090",
  "ask_price": "64283.5",
  "ask_size": "0.72334502",
  "bid_price": "64283.49",
  "bid_size": "0.02726176",
  "cm_sequence_id": "1"
}
```

## Coverage

{% embed url="https://coverage.coinmetrics.io/market-quotes-v2" %}

## Usage

Choose the endpoint that matches your question:

* **The HTTP series** is best for historical analysis, backtests, and periodic top-of-book or spread series. It follows the snapshot cadence, so it samples the top of book rather than capturing every change.
* **The websocket stream** is best for maintaining a live best bid and best ask in production. It publishes on every top-of-book change and is the right source for tick-level quote data.
* **Historical tick-level quotes.** The HTTP series is sampled at the snapshot cadence. To reconstruct every top-of-book change over a past period rather than the 10-second samples, use the order book updates dataset for supported markets. Request `/timeseries/market-orderbooks` with `dataset=updates`, reconstruct the book from the updates, and read the best bid and best ask after each update. See [Order Books](order-books.md).

For the full order book behind these quotes, use [Order Books](order-books.md). For a cross-exchange consolidated quote for a pair or asset, use [Aggregated Quotes](aggregated-quotes.md).

## Limitations

* **The HTTP series samples the book.** It is derived from order book snapshots (every 10 seconds for major markets), so it does not capture every intermediate top-of-book change. For every change in real time, use the websocket stream. For every change historically, reconstruct level-1 (best bid and ask) from the order book updates dataset by requesting `/timeseries/market-orderbooks` with `dataset=updates` for supported markets. See [Order Books](order-books.md).
* **One-sided books.** When a side of the book is empty, that side is omitted unless you request `include_one_sided`.
* **History follows order book collection.** Quotes cannot be backfilled from exchanges beyond the order book history Coin Metrics collected, so coverage generally begins when Coin Metrics started collecting a market. See the [coverage page](https://coverage.coinmetrics.io/market-quotes-v2) for authoritative per-market availability.

## FAQ

Because market quotes are derived from order book data, many questions about collection, latency, snapshot timing, and history are answered on the [Order Books](order-books.md) page.

{% content-ref url="order-books.md" %}
[order-books.md](order-books.md)
{% endcontent-ref %}

### How do market quotes relate to order book data?

A market quote is the level-1 (top-of-book) view of the order book: the single best bid and best ask. The HTTP series is derived by taking the top level of stored order book snapshots. Order Books serves the full depth, the historical updates, and the real-time book stream. See [Order Books](order-books.md).

### What is the difference between the HTTP endpoint and the websocket stream?

The HTTP endpoint returns a historical series derived from order book snapshots, sampled at the snapshot cadence (every 10 seconds for major markets). The websocket stream is a real-time feed that publishes a new message whenever the best bid or best ask changes.

## Related

* [Order Books](order-books.md): the full order book that market quotes are the level-1 view of.
* [Aggregated Quotes](aggregated-quotes.md): cross-exchange consolidated quotes for a pair or asset, built from market quotes.
* [Market Trades](market-trades.md): executed trades for the same markets.
