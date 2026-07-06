# Order Books

### Overview

An order book is the set of outstanding buy orders (bids) and sell orders (asks) for a market, organized by price level. Each level's size is the amount of the base asset (for spot markets) or the number of contracts (for derivatives markets) available at that price. Coin Metrics serves this data in two complementary shapes: point-in-time snapshots of the book, and the full sequence of updates (individual level changes or deltas) that lets you reconstruct the state of the book at any arbitrary timestamp. Traders, market-microstructure researchers, and execution and trade cost analysis teams can use our order book data to study liquidity, depth, and short-term price formation.

The data can be accessed via the following endpoints:

* Snapshots are available over the HTTP endpoint [`/timeseries/market-orderbooks`](https://docs.coinmetrics.io/api/v4#operation/getTimeseriesMarketOrderbooks)
* Historical updates are available on the same endpoint via `dataset=updates`
* A real-time streaming snapshot-then-updates feed is available over the websocket endpoint [`/timeseries-stream/market-orderbooks`](https://docs.coinmetrics.io/api/v4#operation/getTimeseriesStreamMarketOrderbooks)

{% embed url="https://youtu.be/9F0a46Ztsec?feature=shared" %}
Order Books Demo
{% endembed %}

### At a Glance

<table data-full-width="true"><thead><tr><th>Data type</th><th>Entities</th><th width="159">Frequency / cadence</th><th>Unit</th><th>Primary endpoints</th><th>Coverage</th></tr></thead><tbody><tr><td>Order books (snapshots and updates)</td><td>Markets (spot, futures, options)</td><td><strong>Snapshots</strong>: every 10s (top-100 &#x26; within-10%-of-mid, major markets) and hourly (full book, all markets).<br><br><strong>Updates</strong>: event-driven</td><td>Price in quote currency; size in base asset (spot) or contracts (derivatives)</td><td><code>/timeseries/market-orderbooks</code> <br><br><code>/timeseries-stream/market-orderbooks</code></td><td><a href="https://coverage.coinmetrics.io/market-orderbooks-v2">🔗</a></td></tr></tbody></table>

### Schema

One observation is a single order book message consisting of either a snapshot (a representation of the state of the book at a point in time) or an update (a set of changed levels). The table below is the response schema for `/timeseries/market-orderbooks`.

| Field             | Type               | Description                                                                                                                                                       | Notes                                                                                                |
| ----------------- | ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `market`          | string             | Unique name of the market. Market ids follow `exchange-base-quote-spot` for spot, `exchange-symbol-future` for futures, and `exchange-symbol-option` for options. |                                                                                                      |
| `time`            | string (date-time) | Exchange-reported event time where the venue publishes one; otherwise Coin Metrics' receive time. ISO 8601, nanosecond precision.                                 |                                                                                                      |
| `coin_metrics_id` | string             | Identifier of the order book observation. Preserves the exchange's sequence number where the exchange provides one; otherwise Coin Metrics-assigned.              |                                                                                                      |
| `asks`            | array\[object]     | The ask (sell) orders on the book.                                                                                                                                | See sub-fields                                                                                       |
| `bids`            | array\[object]     | The bid (buy) orders on the book.                                                                                                                                 | See sub-fields                                                                                       |
| `database_time`   | string (date-time) | Time Coin Metrics stored the observation.                                                                                                                         | Returned by the HTTP endpoint (both datasets). Not present in websocket messages.                    |
| `collect_time`    | string (date-time) | Feed-handler host clock when the message was received from the exchange.                                                                                          | Returned for `dataset=updates` rows and websocket messages. Absent from default `snapshot` rows.     |
| `type`            | string             | `snapshot` or `update`.                                                                                                                                           | Present in `dataset=updates` responses and websocket messages. Absent from default `snapshots` rows. |
| `cm_sequence_id`  | string             | Per-connection message sequence number for ordering a live stream.                                                                                                | Present in websocket messages only                                                                   |

Each entry in `asks` / `bids` is an object:

* **`price`** : string (decimal). The limit price of the level, in units of the quote currency.
* **`size`** : string (decimal). The amount at that price, in units of the base asset (spot) or number of contracts (derivatives). In an **update**, a `size` of `0` means the level was removed (matched or cancelled).

{% hint style="info" %}
**Conventions.** Prices and sizes are returned as JSON **strings** to preserve precision. Timestamps are UTC ISO-8601 with nanosecond resolution. `time` is the exchange-reported event time where the venue publishes one (otherwise Coin Metrics' receive time); `collect_time` is the feed-handler host clock when the message was received; `database_time` is when Coin Metrics stored the observation. Units are per-field (see the table).
{% endhint %}

### Methodology

#### Collection

Coin Metrics operates real-time feed handlers that connect directly to each exchange's websocket (or REST, where required) and maintain a live, in-memory copy of every subscribed market's book. Exchanges that report level-3 (order-by-order) data are aggregated to **level-2** (one entry per price level) before the data enters the pipeline.

#### Consolidation

A streaming layer consolidates the per-exchange feeds into continuous, delta-encoded book streams with continuity guarantees across reconnects. A snapshot message carries the full set of price levels; a delta carries only the changed levels; a level whose size drops to `0` is removed from the book.

#### **Snapshots**

Coin Metrics stores three snapshot products:

* The top **100** bids and 100 asks, every **10 seconds**.
* All levels **within 10% of the mid-price**, every **10 seconds**.
* The **full book** (every level, up to a 30,000-level cap), **once per hour**.

For the 10% of mid-price snapshots, with best bid $$p^{(1)}{\text{bid}}$$ _and best ask_ $$p^{(1)}{\text{ask}}$$ , a level at price $$p$$ is kept when

$$\left| p - \text{mid} \right| \le 0.1 \cdot \text{mid}, \qquad \text{mid} = \frac{p^{(1)}_{\text{bid}} + p^{(1)}_{\text{ask}}}{2}.$$

All recent snapshots are served from a low-latency store and full history from durable long-term storage.

#### Historical updates

For supported exchanges, Coin Metrics also retains the full stream of snapshot and update rows, so order book history can be replayed rather than only consumed live. Request it on `/timeseries/market-orderbooks` with `dataset=updates`. This mode is currently available for full-depth books (`full_book` or `30000`), `granularity=raw`, `format=json_stream`, and `paging_from=start`, and only for supported exchanges. You can find supported exchanges via the `dataset` field in `/catalog-v2/market-orderbooks`. Because it serves a fixed, persisted sequence, `dataset=updates` is fully reproducible — the same market and time range returns the identical sequence of snapshot and update rows for every client and on every re-query.

#### **Reconstructing book state**

Update rows are absolute `[price, size]` values at a level (not deltas). A `size` of `0` removes the level. Rows are ordered by `time` (nanosecond precision). To maintain the book, treat every `type=snapshot` row as a complete state replacement, then apply subsequent `type=update` rows until the next snapshot:

```text
book = {}                          # price -> size, per side
for row in rows_ordered_by_time:
    if row.type == "snapshot":     # full state replacement
        book = load(row.asks, row.bids)
    else:                          # row.type == "update"
        for level in row.asks + row.bids:
            book.remove(level.price) if level.size == 0 else book.set(level.price, level.size)
```

The `start_with_snapshot=true`  parameter guarantees the response begins with a snapshot row,  possibly from _before_ the requested `start_time`, so a client can initialize state before applying the first update. Effectively, setting this parameter to true will override the user-specified `start_time` to a modified timestamp that represents the nearest snapshot's timestamp prior to specified `start_time`. Any updates that occur between the modified `start_time` and user-requested `start_time` are also sent. Timestamps are recorded and returned at nanosecond precision.

Within the `updates` dataset, a fresh full snapshot is included at least once every **5 minutes** per market (and again whenever a market's collection restarts). Every `type=snapshot` row is therefore a clean re-synchronization point — combined with `start_with_snapshot=true`, you never need more than about five minutes of updates to rebuild the book from the nearest snapshot.

#### Redundancy and stream switching

To stay resilient to exchange disconnects, feed-handler restarts, and pipeline outages, Coin Metrics collects each market over **multiple redundant streams** and treats one as active. If the active stream goes silent, disconnects, or falls behind a healthy alternative by more than a short timeout, collection automatically **fails over** to the healthy stream, and switches back to the primary once it recovers.

Across a failover the book is kept consistent in one of two ways: a synthetic **bridging delta** that reconciles the difference between the old and new stream, or a **fresh full snapshot** of the newly-active stream. A switch can therefore surface as an out-of-band snapshot — a `type=snapshot` row in the historical `updates` dataset, or a `snapshot` message on the websocket feed. This is why you should treat **every** snapshot as a complete state reset (as described above), not just the first one — the same handling applies whether you consume the real-time feed or replay the historical `updates` dataset.

#### Identifiers and timestamps

**`coin_metrics_id`.** Every order book message carries a `coin_metrics_id` that uniquely identifies the observation. When an exchange publishes its own sequence number or message id, Coin Metrics preserves it as the `coin_metrics_id` — so you can order and de-duplicate messages exactly as the exchange does, detect gaps, and cross-reference against the exchange's native feed. When an exchange does not, Coin Metrics assigns its own identifier.

**Timestamps.** Each message can carry up to three timestamps:

* `time` — the exchange-reported event time, for venues that publish a per-message timestamp. For venues that do not, `time` reflects the moment Coin Metrics received the message and equals `collect_time`.
* `collect_time` — the wall-clock time on the collecting feed-handler host at the instant the message was received from the exchange.
* `database_time` — when Coin Metrics persisted the observation.

The two conventions are independent: a venue may preserve an exchange sequence yet still stamp `time` with receive time (for example, Binance.US and MEXC). A quick tell — if `time` equals `collect_time`, that venue does not supply its own event timestamp.

The table below summarizes both conventions per exchange, verified against live data (2026-07-02). Kraken and Crypto.com are shown split by feed because their spot and futures conventions differ; the other multi-feed venues we checked use the same conventions across spot and futures.

| Exchange               | `coin_metrics_id`     | `time`              |
| ---------------------- | --------------------- | ------------------- |
| Binance                | Exchange sequence     | Exchange event time |
| Binance.US             | Exchange sequence     | Receive time        |
| bitbank                | Coin Metrics-assigned | Exchange event time |
| Bitfinex               | Coin Metrics-assigned | Receive time        |
| bitFlyer               | Coin Metrics-assigned | Receive time        |
| Bitget                 | Coin Metrics-assigned | Exchange event time |
| BitMEX                 | Coin Metrics-assigned | Receive time        |
| Bitstamp               | Coin Metrics-assigned | Exchange event time |
| Bullish                | Coin Metrics-assigned | Exchange event time |
| Bybit                  | Exchange sequence     | Exchange event time |
| CME                    | Coin Metrics-assigned | Exchange event time |
| Coinbase               | Coin Metrics-assigned | Exchange event time |
| Coinbase Derivatives   | Coin Metrics-assigned | Receive time        |
| Coinbase International | Coin Metrics-assigned | Exchange event time |
| Crypto.com (spot)      | Exchange sequence     | Exchange event time |
| Crypto.com (futures)   | Coin Metrics-assigned | Exchange event time |
| Deribit                | Coin Metrics-assigned | Exchange event time |
| dYdX                   | Coin Metrics-assigned | Receive time        |
| Gate.io                | Exchange sequence     | Exchange event time |
| Gemini                 | Exchange sequence     | Exchange event time |
| Huobi (HTX)            | Coin Metrics-assigned | Exchange event time |
| Hyperliquid            | Coin Metrics-assigned | Exchange event time |
| itBit                  | Coin Metrics-assigned | Receive time        |
| Kraken (spot)          | Coin Metrics-assigned | Receive time        |
| Kraken (futures)       | Exchange sequence     | Exchange event time |
| KuCoin                 | Exchange sequence     | Exchange event time |
| LMAX                   | Coin Metrics-assigned | Exchange event time |
| MEXC                   | Exchange sequence     | Receive time        |
| OKX                    | Coin Metrics-assigned | Exchange event time |
| Poloniex               | Coin Metrics-assigned | Exchange event time |

### Accessing the Data

Order books are available over HTTP at `/timeseries/market-orderbooks` (snapshots by default, historical updates via `dataset=updates`) and as a real-time websocket feed at `/timeseries-stream/market-orderbooks`.

#### Snapshots (HTTP)

{% tabs %}
{% tab title="Python Client" %}
```python
import os
from datetime import timedelta
from coinmetrics.api_client import CoinMetricsClient

client = CoinMetricsClient(os.environ["CM_API_KEY"])

# Snapshots over a time range, fetched in parallel and returned as a DataFrame.
# .parallel() defaults to max_workers=10 (capped at 10) and progress_bar=True.
df = client.get_market_orderbooks(
    markets=["coinbase-btc-usd-spot"],
    start_time="2025-01-01",
    end_time="2025-01-08",
    format="json_stream",
).parallel(time_increment=timedelta(days=1)).to_dataframe()

print(df)

# For just the latest snapshots, use limit_per_market instead (uses format="json"):
# client.get_market_orderbooks(markets=["coinbase-btc-usd-spot"], limit_per_market=5).to_dataframe()
```
{% endtab %}

{% tab title="Shell" %}
```shell
curl --compressed "https://api.coinmetrics.io/v4/timeseries/market-orderbooks?markets=coinbase-btc-usd-spot&limit_per_market=5&api_key=$CM_API_KEY"
```
{% endtab %}

{% tab title="Python" %}
```python
import os, requests

response = requests.get(
    "https://api.coinmetrics.io/v4/timeseries/market-orderbooks",
    params={"markets": "coinbase-btc-usd-spot", "limit_per_market": 5,
            "api_key": os.environ["CM_API_KEY"]},
).json()
print(response)
```
{% endtab %}
{% endtabs %}

#### Historical Updates (HTTP)

To retrieve historical **updates** instead of snapshots, set `dataset=updates` (full depth, supported markets). `start_with_snapshot=true` prepends a snapshot so you can initialize book state before applying updates:

{% tabs %}
{% tab title="Python Client" %}
```python
from datetime import timedelta

# Historical updates over a time range, fetched in parallel and returned as a DataFrame.
# Full-depth updates are high-volume, so keep the window small.
df = client.get_market_orderbooks(
    markets=["coinbase-btc-usd-spot"],
    dataset="updates",
    start_with_snapshot=True,
    depth_limit="full_book",
    granularity="raw",
    format="json_stream",
    paging_from="start",
    start_time="2026-07-06T00:00:00Z",
    end_time="2026-07-06T00:05:00Z",
).parallel(time_increment=timedelta(minutes=1)).to_dataframe()

print(df)
```
{% endtab %}

{% tab title="Shell" %}
```shell
curl --compressed "https://api.coinmetrics.io/v4/timeseries/market-orderbooks?markets=coinbase-btc-usd-spot&dataset=updates&start_with_snapshot=true&depth_limit=full_book&granularity=raw&format=json_stream&paging_from=start&start_time=2026-07-06T00:00:00Z&end_time=2026-07-06T00:05:00Z&api_key=$CM_API_KEY"
```
{% endtab %}
{% endtabs %}

#### Real-Time Stream (Websocket)

The stream begins with a `snapshot` message. Subsequent messages are updates, interspersed with occasional further `snapshot` messages that fully replace the book. Maintain the book by loading each snapshot as a fresh state, then applying updates until the next one.

{% tabs %}
{% tab title="Python Client" %}
```python
stream = client.get_stream_market_orderbooks(markets=["coinbase-btc-usd-spot"])
stream.run()   # prints the snapshot, then updates; Ctrl-C to stop
```
{% endtab %}

{% tab title="Shell" %}
```shell
websocat "wss://api.coinmetrics.io/v4/timeseries-stream/market-orderbooks?markets=coinbase-btc-usd-spot&api_key=$CM_API_KEY"
```
{% endtab %}

{% tab title="JavaScript" %}
```javascript
ws = new WebSocket("wss://api.coinmetrics.io/v4/timeseries-stream/market-orderbooks?markets=coinbase-btc-usd-spot&api_key=<YOUR_API_KEY>")
ws.onmessage = m => console.log(m.data)
ws.onclose = () => console.log("closed")
```
{% endtab %}
{% endtabs %}

Full parameter reference: see the API Reference for [`/timeseries/market-orderbooks`](https://docs.coinmetrics.io/api/v4/#tag/Timeseries/operation/getTimeseriesMarketOrderbooks) and [`/timeseries-stream/market-orderbooks`](https://docs.coinmetrics.io/api/v4/#tag/Timeseries-stream/operation/getTimeseriesStreamMarketOrderbooks).

### Examples

Bids and asks below are truncated to the top few levels for readability. The API returns full depth.

#### Example — order book snapshot (`/timeseries/market-orderbooks`)

A snapshot of the `coinbase-btc-usd-spot` book from the default `snapshots` dataset ([browser](https://api.coinmetrics.io/v4/timeseries/market-orderbooks?markets=coinbase-btc-usd-spot\&limit_per_market=2\&paging_from=end\&api_key=YOUR_API_KEY)):

```json
{
  "data": [
    {
      "market": "coinbase-btc-usd-spot",
      "time": "2026-07-02T17:14:49.983825000Z",
      "coin_metrics_id": "1783012489983825-0",
      "asks": [
        { "price": "61727.67", "size": "0.23577459" },
        { "price": "61727.98", "size": "0.0001215" },
        { "price": "61728", "size": "0.0071" },
        { "price": "61728.44", "size": "0.00324" }
      ],
      "bids": [
        { "price": "61727.66", "size": "0.0200606" },
        { "price": "61724.97", "size": "0.04873373" },
        { "price": "61724.96", "size": "0.02003332" },
        { "price": "61724.53", "size": "0.02013332" }
      ],
      "database_time": "2026-07-02T17:14:50.117940000Z"
    }
  ]
}
```

#### Example — historical order book updates (`/timeseries/market-orderbooks?dataset=updates`)

Newline-delimited JSON (`format=json_stream`) from `coinbase-btc-usd-spot`: a leading `snapshot` row (from `start_with_snapshot=true`) followed by `update` rows. Note the update rows carrying `"size": "0"` indicating those levels were removed ([browser](https://api.coinmetrics.io/v4/timeseries/market-orderbooks?markets=coinbase-btc-usd-spot\&dataset=updates\&start_with_snapshot=true\&depth_limit=full_book\&granularity=raw\&format=json_stream\&paging_from=start\&start_time=2026-06-26T00:00:00.000000000Z\&api_key=YOUR_API_KEY)):

```json
{"market": "coinbase-btc-usd-spot", "time": "2026-06-26T00:00:09.984899000Z", "type": "snapshot", "coin_metrics_id": "AAEDAAZVHMrKm4NCVEMtVVNE", "asks": [{"price": "59713.19", "size": "0.19154847"}, {"price": "59713.5", "size": "1"}, {"price": "59714", "size": "0.0536"}, {"price": "59714.36", "size": "0.13397112"}], "bids": [{"price": "59713.18", "size": "0.02209052"}, {"price": "59712.16", "size": "0.01798596"}, {"price": "59710.91", "size": "0.01584847"}, {"price": "59710.9", "size": "0.03"}], "database_time": "2026-06-26T00:00:25.679752298Z", "collect_time": "2026-06-26T00:00:09.995193000Z"}
{"market": "coinbase-btc-usd-spot", "time": "2026-06-26T00:00:09.989925000Z", "type": "update", "coin_metrics_id": "AAEDAAZVHMrKryVCVEMtVVNE", "asks": [{"price": "59746.51", "size": "0.80392457"}, {"price": "59746.53", "size": "0"}], "bids": [], "database_time": "2026-06-26T00:00:25.681337856Z", "collect_time": "2026-06-26T00:00:10.001261000Z"}
{"market": "coinbase-btc-usd-spot", "time": "2026-06-26T00:00:10.004320000Z", "type": "update", "coin_metrics_id": "AAEDAAZVHMrK52BCVEMtVVNE", "asks": [], "bids": [{"price": "59683.5", "size": "1"}], "database_time": "2026-06-26T00:00:25.681342586Z", "collect_time": "2026-06-26T00:00:10.011451000Z"}
{"market": "coinbase-btc-usd-spot", "time": "2026-06-26T00:00:10.007922000Z", "type": "update", "coin_metrics_id": "AAEDAAZVHMrK9XJCVEMtVVNE", "asks": [{"price": "59746.5", "size": "1.48178634"}, {"price": "59746.52", "size": "0"}], "bids": [], "database_time": "2026-06-26T00:00:25.681346556Z", "collect_time": "2026-06-26T00:00:10.017549000Z"}
{"market": "coinbase-btc-usd-spot", "time": "2026-06-26T00:00:10.021242000Z", "type": "update", "coin_metrics_id": "AAEDAAZVHMrLKXpCVEMtVVNE", "asks": [], "bids": [{"price": "59683.5", "size": "0"}], "database_time": "2026-06-26T00:00:25.681351966Z", "collect_time": "2026-06-26T00:00:10.026804000Z"}
{"market": "coinbase-btc-usd-spot", "time": "2026-06-26T00:00:10.050929000Z", "type": "update", "coin_metrics_id": "AAEDAAZVHMrLnXFCVEMtVVNE", "asks": [{"price": "61007.25", "size": "0"}], "bids": [], "database_time": "2026-06-26T00:00:25.681503511Z", "collect_time": "2026-06-26T00:00:10.056860000Z"}
```

#### Example — real-time stream (`/timeseries-stream/market-orderbooks`)

Messages from `wss://api.coinmetrics.io/v4/timeseries-stream/market-orderbooks?markets=coinbase-btc-usd-spot`. The stream opens with a `snapshot` message (carrying a `cm_sequence_id`), then sends `update` messages:

```json
{
  "market": "coinbase-btc-usd-spot",
  "time": "2026-07-02T17:15:09.972387000Z",
  "coin_metrics_id": "F6laSHuAR9CMY1cYTVqURgAAAAArdjUR",
  "asks": [
    { "price": "61700.63", "size": "0.0206" },
    { "price": "61700.68", "size": "0.12965822" },
    { "price": "61701.36", "size": "0.02610859" },
    { "price": "61701.39", "size": "0.09726494" }
  ],
  "bids": [
    { "price": "61700.62", "size": "0.04589632" },
    { "price": "61700.59", "size": "0.00324146" },
    { "price": "61699.97", "size": "0.00231646" },
    { "price": "61699.06", "size": "0.00324154" }
  ],
  "type": "snapshot",
  "collect_time": "2026-07-02T17:15:09.981739000Z",
  "cm_sequence_id": "0"
}
```

```json
{
  "market": "coinbase-btc-usd-spot",
  "time": "2026-07-02T17:15:19.991273000Z",
  "coin_metrics_id": "F6laSHuAR9CMY1cYTVqURgAAAAArdvjz",
  "asks": [],
  "bids": [
    { "price": "61670.01", "size": "0.00081016" },
    { "price": "61661.48", "size": "0" }
  ],
  "type": "update",
  "collect_time": "2026-07-02T17:15:20.005046000Z",
  "cm_sequence_id": "2"
}
```

### Coverage

{% embed url="https://coverage.coinmetrics.io/market-orderbooks-v2" %}

### Usage

Choose the shape that matches your question:

* **Snapshots** (`dataset=snapshots`, the default) are best for periodic depth, point-in-time liquidity, and deriving level-1 (best bid/ask) or fixed-interval depth series. Use the 10-second products for major markets and the hourly full-book product for broad coverage.
* **Historical updates** (`dataset=updates`) are best for tick-level book reconstruction, event studies, and backtests that need the book's exact state between snapshots. Combine a starting snapshot (`start_with_snapshot=true`) with the subsequent updates and apply them in `time` order.
* **The websocket stream** is best for maintaining a live book in production: consume the opening snapshot, then apply updates as they arrive.

### Limitations

* **Historical updates are limited.** `dataset=updates` is available only for supported exchanges, at **full depth** (`full_book` / `30000`), with `granularity=raw`, `format=json_stream`, and `paging_from=start`. Coverage begins when a market's updates history starts (many markets from 2026-06-26 onward). Additional historical data is available — please contact our team for more information.
* **History cannot be backfilled from exchanges.** Order book data is rarely offered historically by exchanges, so coverage generally begins when Coin Metrics started collecting a market itself (with limited exceptions such as CME and some Binance history).
* **Snapshot timing.** The `time` field lies exactly on the second (10-second products) or hour (full-book product), but the actual capture is close to and not exactly at that timestamp. `collect_time` records exchange receipt time where available.
* **Resolution.** Coin Metrics stores **level-2** order book data; exchanges that publish level-3 are aggregated to level-2 before storage.
* **Per-exchange depth.** How many levels are available depends on what each exchange exposes. The table below shows the **approximate maximum depth** observed for each venue's most-liquid BTC market (measured 2026-07-02); actual levels vary by market and over time, and every snapshot is capped at 30,000 levels. See the [coverage page](https://coverage.coinmetrics.io/market-orderbooks-v2) for authoritative per-market availability.

| Exchange               | Approximate Depth |
| ---------------------- | ----------------- |
| Binance                | Full book         |
| Binance.US             | Full book         |
| bitbank                | \~200 levels      |
| Bitfinex               | \~250 levels      |
| bitFlyer               | Full book         |
| Bitget                 | \~500 levels      |
| BitMEX                 | Full book         |
| Bitstamp               | Full book         |
| Bullish                | \~200 levels      |
| Bybit                  | \~1,000 levels    |
| CME                    | Full book         |
| Coinbase               | Full book         |
| Coinbase Derivatives   | Full book         |
| Coinbase International | \~200 levels      |
| Crypto.com             | \~50 levels       |
| Deribit                | Full book         |
| dYdX                   | Full book         |
| Gate.io                | \~100 levels      |
| Gemini                 | Full book         |
| GFO-X                  | Full book         |
| Huobi (HTX)            | \~150 levels      |
| Hyperliquid            | \~20 levels       |
| itBit                  | Full book         |
| Kraken                 | Full book         |
| KuCoin                 | Full book         |
| LMAX                   | \~20 levels       |
| MEXC                   | Full book         |
| OKX                    | \~400 levels      |
| Poloniex               | \~20 levels       |

Coin Metrics also retains **historical** order book data for venues no longer collected: Bittrex (through 2024), CEX.IO (through 2025), ErisX (through 2025), FTX and FTX.US (through 2022), and Liquid (through 2023).

### FAQ

#### What are order book snapshots and order book updates?

An **order book snapshot** represents the state of the order book at a specific point in time. It contains the price level and amount for each bid and ask in the book. Coin Metrics stores three snapshot types: the top 100 bids and asks every 10 seconds for major markets; all levels within 10% of the mid-price every 10 seconds for major markets; and a full-book snapshot every hour for all collected markets.

An **order book update** represents a single change to the book: the addition, change, or removal of a bid or ask. Exchanges typically report updates as a new `[side, price, size]` tuple where the size is the new absolute value (not a delta from the previous value). Coin Metrics serves updates in real time over the websocket feed and, for migrated markets, stores them historically so a snapshot plus subsequent updates can reconstruct the book at any moment.

#### What is the difference between level 1, level 2, and level 3 order book data?

These terms are commonly used, however, no standard definitions exist. We explain these terms in the context of our documentation and our product.

**Level 1** refers to the top of the book — the best bid and best ask price and amount. It can be derived from our snapshots and is also served through the market quotes endpoint.

**Level 2** refers to snapshots or updates where individual orders at the same price level are aggregated into one observation. Most exchanges serve level 2, and Coin Metrics stores level 2. If an exchange reports level 3, we aggregate it to level 2 before storing.

**Level 3** refers to snapshots or updates where each individual order is present, with no aggregation at a price level. Only a small number of exchanges serve level 3.

#### Do you offer order book updates in the form of new orders, cancels, and changes to existing orders?

Most exchanges do not report updates with that detail. They typically report a `[side, price, size]` tuple where the size is the new value, not the delta. Some of this information can be derived by observing the effect of an update: a tuple with `size` of `0` means the order was matched (if at the top of the book) or cancelled; a tuple with a `size` greater than the current size means an order was added or increased.

#### What is the latency of your order book data?

Latency — the gap between the exchange's event time and when Coin Metrics receives the message — varies substantially by exchange, so it is more useful as a range than a single figure. The fastest venues deliver in single-digit milliseconds, most sit in the tens to low hundreds of milliseconds, and the slowest reach several hundred milliseconds at the median.

As a concrete example, `coinbase-btc-usd-spot` is among the fastest we collect: a median near 7 ms, a 95th percentile around 25 ms, and a 99th percentile around 80 ms.

These figures compare the exchange's event timestamp with our receipt time; venues that do not stamp their own messages are excluded, since for them `time` is Coin Metrics' receive time.

#### Are your order book snapshots taken exactly on the second or hour?

Our systems snapshot the order book at round timestamps, however the `time` field indicates the timestamp of the latest message received from the exchange prior to the round snapshot timestamp. Where available, `collect_time` records when the book was received from the exchange, and `time` represents the exchange-reported timestamp.

#### How much order book history does Coin Metrics support?

Generally it is not possible to collect order book history from exchanges directly — it is one of the data types very few exchanges offer history for, with exceptions such as CME and some limited Binance history. For this reason, historical coverage begins at the time we started collecting a market ourselves.

### Related

* [Market Quotes](quotes.md) — level-1 best bid/ask derived from the book.
* [Market Trades](market-trades.md) — executed trades for the same markets.
* [Order Book Depth](liquidity/order-book-depth.md) — depth-based liquidity metrics computed from order books.
* [Examining Orderbook Depth](../../tutorials-and-examples/tutorials/md_orderbook_depth.md) — tutorial for querying and visualizing book depth.
* [Aggregating Orderbook Depth to Create Liquidity Metrics](../../tutorials-and-examples/tutorials/aggregating-orderbook-depth-to-create-liquidity-metrics.md) — tutorial.
