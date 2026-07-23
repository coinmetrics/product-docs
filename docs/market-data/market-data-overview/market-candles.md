# Market Candles

## Overview

A market candle summarizes the trading activity of a single market over a fixed time interval as a set of open, high, low, and close prices together with volume statistics (OHLCV). Each candle answers a simple question: over this interval, where did the market open and close, how far did it move, and how much traded? Candles are the standard input for charting and for technical-analysis indicators, and traders, quantitative researchers, and analysts use them to study price action and liquidity over time without processing every individual trade.

Coin Metrics builds candles from the trades it collects rather than from candles reported by exchanges. This lets the same calculation apply consistently across every venue, which supports cross-exchange analysis, and it produces fields many exchanges do not publish, such as volume converted to US dollars, a trade count, and a volume-weighted average price.

Candles can be accessed via the following endpoints:

* Historical candles over the HTTP endpoint [`/timeseries/market-candles`](https://docs.coinmetrics.io/api/v4#operation/getTimeseriesMarketCandles)
* A real-time streaming feed over the websocket endpoint [`/timeseries-stream/market-candles`](https://docs.coinmetrics.io/api/v4#operation/getTimeseriesStreamMarketCandles)

{% embed url="https://youtu.be/nGbw3-T3kTA?feature=shared" %}
Market candles demo (dYdX)
{% endembed %}

## At a Glance

<table data-full-width="true"><thead><tr><th>Data type</th><th>Entities</th><th width="159">Frequency / cadence</th><th>Unit</th><th>Primary endpoints</th><th>Coverage</th></tr></thead><tbody><tr><td>Market candles (OHLCV)</td><td>Markets (spot, futures, options, DeFi)</td><td>Fixed intervals: 1m, 5m, 10m, 15m, 30m, 1h, 4h, 1d</td><td>Prices in the quote asset. Volume in base-asset units (contracts for derivatives). USD volume in US dollars</td><td><code>/timeseries/market-candles</code><br><br><code>/timeseries-stream/market-candles</code></td><td><a href="https://coverage.coinmetrics.io/market-candles-v2">🔗</a></td></tr></tbody></table>

## Schema

One observation is a single candle for one market and one interval. Every candle carries the same fields regardless of market type (spot, futures, options, or DeFi). The websocket feed carries the same fields and adds a `cm_sequence_id`. The columns below are the response schema for `/timeseries/market-candles`.

| Field                 | Type               | Description                                                                                                                                                      | Notes                                                                                          |
| --------------------- | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `market`              | string             | Unique name of the market. Spot markets follow `exchange-base-quote-spot`, futures follow `exchange-symbol-future`, and options follow `exchange-symbol-option`. | Required                                                                                       |
| `time`                | string (date-time) | The start of the candle interval. ISO 8601, nanosecond precision.                                                                                                | Required. Interval start (see [Interval timing](market-candles.md#interval-timing))            |
| `price_open`          | string (decimal)   | The price of the first trade in the interval.                                                                                                                    | Required                                                                                       |
| `price_high`          | string (decimal)   | The highest trade price in the interval.                                                                                                                         | Required                                                                                       |
| `price_low`           | string (decimal)   | The lowest trade price in the interval.                                                                                                                          | Required                                                                                       |
| `price_close`         | string (decimal)   | The price of the last trade in the interval.                                                                                                                     | Required                                                                                       |
| `vwap`                | string (decimal)   | The volume-weighted average price over the interval.                                                                                                             | Required                                                                                       |
| `volume`              | string (decimal)   | Total traded volume in the interval, in base-asset units (or the number of contracts for derivatives).                                                           | Required                                                                                       |
| `candle_usd_volume`   | string (decimal)   | Total traded volume in the interval, converted to US dollars.                                                                                                    | Required. See [Volume in US dollars](market-candles.md#volume-in-us-dollars)                   |
| `candle_trades_count` | string (int64)     | The number of trades in the interval.                                                                                                                            | Required. `0` on gap-filled candles (see [Gapless candles](market-candles.md#gapless-candles)) |
| `cm_sequence_id`      | string             | Per-connection message sequence number for ordering a live stream. Resets on reconnection.                                                                       | Websocket messages only                                                                        |

{% hint style="info" %}
**Conventions.** Prices and volumes are returned as JSON **strings** to preserve precision. Timestamps are UTC ISO-8601 with nanosecond resolution. `time` marks the **start** of the candle interval, not its end. Units are per-field: prices are in the quote asset, `volume` is in base-asset units (contracts for derivatives), and `candle_usd_volume` is in US dollars. The websocket feed adds a per-connection `cm_sequence_id` for ordering.
{% endhint %}

## Methodology

### From trades to candles

Each base (one-minute) candle is computed directly from the executed trades that Coin Metrics collects for that market, the same trades served by [Market Trades](market-trades.md). Trades are ordered by time within the interval, and the candle fields follow from them:

* `price_open` is the first trade's price and `price_close` is the last trade's price.
* `price_high` and `price_low` are the maximum and minimum trade prices.
* `volume` is the sum of the traded amounts, in base-asset units (or contracts for derivatives).
* `vwap` is the volume-weighted average price: the sum of price times amount across all trades, divided by the total volume.
* `candle_trades_count` is the number of trades in the interval.

Because candles are derived from the trades pipeline, they inherit its redundancy and deduplication, so a given market and interval returns a stable result once finalized.

### Aggregating to longer intervals

Candles at intervals longer than one minute (5m, 10m, 15m, 30m, 1h, 4h, 1d) are built by aggregating shorter candles that fall inside them. The open is the first sub-candle's open, the close is the last sub-candle's close, the high and low are the maximum and minimum across the sub-candles, and volume, US-dollar volume, and trade count are summed. The `vwap` of a longer interval is the volume-weighted average of the sub-candle VWAPs.

### Interval timing

A candle's `time` is the **start** of its interval. For example, a one-minute candle stamped `06:01:00` covers trades from `06:01:00` up to (but not including) `06:02:00`. Daily candles are bucketed in UTC by default. The `timezone` and `1d-HH:00` parameters can move that daily boundary to a different time or time zone (see [Custom daily boundaries](market-candles.md#custom-daily-boundaries-offsets-and-time-zones)), and the returned timestamps are always UTC.

### Custom daily boundaries (offsets and time zones)

By default a `1d` candle covers a UTC calendar day, from 00:00 UTC to the next 00:00 UTC. Two request parameters realign that daily boundary, which lets you build daily candles that close at a specific local time such as a 4:00 PM New York close.

* **`timezone`** moves the day boundary to local midnight in the given [TZ database](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) zone. For example, `frequency=1d&timezone=Asia/Tokyo` returns candles that each cover a Tokyo calendar day.
* **`1d-HH:00`** moves the daily boundary from midnight to the whole hour `HH`. Combined with `timezone`, the boundary is `HH:00` in that zone. For example, `frequency=1d-16:00&timezone=America/New_York` returns daily candles that run from 16:00 one day to 16:00 the next in New York (a "New York close" daily candle). Without `timezone`, the offset is applied in UTC.

For a few common market closes, Coin Metrics also accepts named shorthands that carry their own time zone, so you do not pass a separate `timezone`:

* `1d-ny-close`: 16:00 in New York, a 4:00 PM Eastern close.
* `1d-ldn-close`: 16:00 in London.
* `1d-sg-close`: 16:00 in Singapore.
* `1d-ny-midday`: 12:00 in New York.

For example, `frequency=1d-ny-close` is equivalent to `frequency=1d-16:00&timezone=America/New_York`.

A few rules follow from how these candles are built, by aggregating the underlying hourly candles:

* Offsets apply only to `1d`, and only on whole hours. `HH` is `00` through `23` and the minutes are always `00` (`1d-16:00` is valid, `1d-16:30` is not).
* The `time` field is still the **start** of the interval, expressed in UTC. For `1d-16:00&timezone=America/New_York`, a candle stamped `2025-01-15T21:00:00Z` starts at 16:00 New York time on 2025-01-15 (UTC-5 in January) and ends at 16:00 New York time the next day.
* Boundaries track the zone's local time, so they follow daylight-saving changes. Across a daylight-saving transition a single daily candle can span 23 or 25 hours, and its UTC `time` shifts by an hour when the zone's offset changes.

### Volume in US dollars

Alongside `volume`, each candle carries `candle_usd_volume`, the interval's volume valued in US dollars. Expressing volume in a common currency makes activity comparable across markets that quote in different assets.

In general, US-dollar volume is the interval's volume, scaled by the contract size, multiplied by a US-dollar price:

$$
\text{candle\_usd\_volume} = V \times S \times P_{\text{USD}}
$$

* $$V$$: the interval `volume`, in base-asset units (or contracts for derivatives).
* $$S$$: the contract size, or `1` for markets that do not define one.
* $$P_{\text{USD}}$$: the US-dollar price of one base-asset or underlying unit over the interval.

For **spot** markets the price is resolved in order. If the base asset is US dollars, no price is needed and the US-dollar volume equals $$V \times S$$. If the quote asset is US dollars, the candle's own VWAP is the price:

$$
\text{candle\_usd\_volume} = V \times S \times \text{VWAP}
$$

Otherwise Coin Metrics forms two candidate prices for the base asset: a market-derived price $$P_c$$ (routed through Coin Metrics candle prices for the base or quote asset against USD, BTC, ETH, or a major stablecoin) and a reference-rate price $$P_r$$ (from Coin Metrics reference rates). The reference rate is used only when the two disagree by more than 5%:

$$
P_{\text{USD}} = \begin{cases} P_r & \text{if } \left| 1 - \frac{P_r}{P_c} \right| > 0.05 \\ P_c & \text{otherwise} \end{cases}
$$

If only one candidate price is available, it is used, and if neither is available `candle_usd_volume` is `0`.

For **derivatives** markets, $$P_{\text{USD}}$$ is the US-dollar price of the contract's settlement (size) asset, taken from Coin Metrics reference rates or a spot candle. When that price is unavailable, the candle's VWAP converted to US dollars through the quote asset is used instead.

Gap-filled candles have a `volume` of `0`, so their `candle_usd_volume` is `0` as well.

### Gapless candles

Coin Metrics produces **gapless** candles. If a market has no trades during an interval, the candle is still emitted, carrying the previous candle's close forward: `price_open`, `price_high`, `price_low`, and `price_close` are all set to the prior candle's close, and `vwap` is set to the prior candle's VWAP. For these filled-forward candles, `volume`, `candle_usd_volume`, and `candle_trades_count` are all `0`. A flat candle with zero volume therefore indicates that no trades occurred, not a gap in collection.

### Real-time publication and recalculation

Candles for centralized-exchange spot and futures markets are computed in real time and published within a few seconds of the interval closing (about 5 seconds), which already captures most late-arriving trades. Because a small number can still be collected later than that, Coin Metrics continuously re-verifies recently published candles over a rolling window of roughly three hours: the trades on record are compared against each candle, and any interval whose contents changed is recalculated. Around twenty minutes after an interval closes, the API serves the finalized candle in place of the initial real-time one. As a result, very recent candles can change slightly shortly after first publication before settling.

### Market coverage and availability

Coin Metrics calculates candles for **spot**, **futures**, and **option** markets from exchanges in its coverage universe, and for swaps on supported **decentralized exchanges (DeFi)**. Centralized-exchange spot and futures candles are available immediately. Candles for option markets and decentralized-exchange spot markets are published on a delay of about twenty minutes.

## Accessing the Data

Candles are available over HTTP at `/timeseries/market-candles` for historical queries and as a real-time websocket feed at `/timeseries-stream/market-candles`.

### Historical Candles (HTTP)

Choose an interval with the `frequency` parameter (default `1d`).

{% tabs %}
{% tab title="Python Client" %}
```python
import os
from datetime import timedelta
from coinmetrics.api_client import CoinMetricsClient

client = CoinMetricsClient(os.environ["CM_API_KEY"])

# 1-minute candles over a time range, fetched in parallel and returned as a DataFrame.
df = client.get_market_candles(
    markets=["coinbase-btc-usd-spot"],
    frequency="1m",
    start_time="2025-01-01",
    end_time="2025-01-02",
    format="json_stream",
).parallel(time_increment=timedelta(days=1)).to_dataframe()

print(df)

# For just the latest candles, use limit_per_market instead (uses format="json"):
# client.get_market_candles(markets=["coinbase-btc-usd-spot"], frequency="1m", limit_per_market=5).to_dataframe()
```
{% endtab %}

{% tab title="Shell" %}
```shell
curl --compressed "https://api.coinmetrics.io/v4/timeseries/market-candles?markets=coinbase-btc-usd-spot&frequency=1m&limit_per_market=5&api_key=$CM_API_KEY"
```
{% endtab %}

{% tab title="Python" %}
```python
import os, requests

response = requests.get(
    "https://api.coinmetrics.io/v4/timeseries/market-candles",
    params={"markets": "coinbase-btc-usd-spot", "frequency": "1m", "limit_per_market": 5,
            "api_key": os.environ["CM_API_KEY"]},
).json()
print(response)
```
{% endtab %}
{% endtabs %}

The `markets` parameter accepts a comma-separated list or wildcard patterns such as `coinbase-*`, `binance-*-spot`, or `*-USDT-future`, so you can query many markets in one call. Supported `frequency` values are `1m`, `5m`, `10m`, `15m`, `30m`, `1h`, `4h`, `1d`, and `1d-HH:00` for a daily candle whose boundary is offset to a whole hour and time zone (see [Custom daily boundaries](market-candles.md#custom-daily-boundaries-offsets-and-time-zones)).

### Real-Time Stream (Websocket)

The stream delivers a message for each candle as its interval completes, carrying a per-connection `cm_sequence_id` for ordering. Each candle is published a few seconds after its interval closes (around 5 seconds for spot markets, a little longer for futures), which leaves room for trades that arrive slightly late. Use `backfill=latest` (the default) to receive the latest candles just before switching to real time, or `backfill=none` to receive only new candles. The stream supports the standard frequencies (`1m` through `1d`, without the `1d-HH:00` offset form) and covers centralized-exchange spot and futures markets.

{% tabs %}
{% tab title="Python Client" %}
```python
stream = client.get_stream_market_candles(markets=["coinbase-btc-usd-spot"], frequency="1m")
stream.run()   # prints candles as they arrive, Ctrl-C to stop
```
{% endtab %}

{% tab title="Shell" %}
```shell
websocat "wss://api.coinmetrics.io/v4/timeseries-stream/market-candles?markets=coinbase-btc-usd-spot&frequency=1m&api_key=$CM_API_KEY"
```
{% endtab %}

{% tab title="JavaScript" %}
```javascript
ws = new WebSocket("wss://api.coinmetrics.io/v4/timeseries-stream/market-candles?markets=coinbase-btc-usd-spot&frequency=1m&api_key=<YOUR_API_KEY>")
ws.onmessage = m => console.log(m.data)
ws.onclose = () => console.log("closed")
```
{% endtab %}
{% endtabs %}

Full parameter reference: see the API Reference for [`/timeseries/market-candles`](https://docs.coinmetrics.io/api/v4/#operation/getTimeseriesMarketCandles) and [`/timeseries-stream/market-candles`](https://docs.coinmetrics.io/api/v4/#operation/getTimeseriesStreamMarketCandles).

## Examples

The examples below show candles for a representative market. Futures, option, and DeFi candles share this identical schema. Numeric quantities are returned as JSON strings.

### Example: 1-minute candles (`/timeseries/market-candles`)

The latest one-minute candles from `coinbase-btc-usd-spot` ([browser](https://api.coinmetrics.io/v4/timeseries/market-candles?markets=coinbase-btc-usd-spot\&frequency=1m\&limit_per_market=3\&api_key=YOUR_API_KEY)):

```json
{
  "data": [
    {
      "market": "coinbase-btc-usd-spot",
      "time": "2026-07-11T06:01:00.000000000Z",
      "price_open": "64096.75",
      "price_close": "64102.04",
      "price_high": "64104.03",
      "price_low": "64096.75",
      "vwap": "64102.61596165262",
      "volume": "0.25155461",
      "candle_usd_volume": "16125.3085582133000000000005484724",
      "candle_trades_count": "203"
    },
    {
      "market": "coinbase-btc-usd-spot",
      "time": "2026-07-11T06:02:00.000000000Z",
      "price_open": "64102.04",
      "price_close": "64099.43",
      "price_high": "64107.67",
      "price_low": "64099.41",
      "vwap": "64101.41411351819",
      "volume": "0.4492892",
      "candle_usd_volume": "28800.0730659313000000000003736471",
      "candle_trades_count": "202"
    },
    {
      "market": "coinbase-btc-usd-spot",
      "time": "2026-07-11T06:03:00.000000000Z",
      "price_open": "64099.42",
      "price_close": "64103.39",
      "price_high": "64103.4",
      "price_low": "64099.42",
      "vwap": "64103.03412777501",
      "volume": "0.25650555",
      "candle_usd_volume": "16442.784025613699999999999728483",
      "candle_trades_count": "222"
    }
  ]
}
```

### Example: real-time stream (`/timeseries-stream/market-candles`)

Messages from `wss://api.coinmetrics.io/v4/timeseries-stream/market-candles?markets=coinbase-btc-usd-spot&frequency=1m`. The stream sends one message per completed candle, each carrying an incrementing `cm_sequence_id`:

```json
{"market": "coinbase-btc-usd-spot", "time": "2026-07-11T06:44:00.000000000Z", "price_open": "64167.75", "price_close": "64167.77", "price_high": "64167.77", "price_low": "64167.75", "vwap": "64167.76684067207", "volume": "0.316524060", "candle_usd_volume": "20310.64208154289999999999954384380", "candle_trades_count": "181", "cm_sequence_id": "0"}
{"market": "coinbase-btc-usd-spot", "time": "2026-07-11T06:45:00.000000000Z", "price_open": "64167.77", "price_close": "64169.56", "price_high": "64169.56", "price_low": "64156.97", "vwap": "64165.07338132449", "volume": "2.082064660", "candle_usd_volume": "133595.83169356239999999999537935760", "candle_trades_count": "259", "cm_sequence_id": "1"}
```

### Example: New York close daily candles (`1d-16:00` + `timezone`)

Daily candles for `coinbase-btc-usd-spot` aligned to a 4:00 PM New York close, using `frequency=1d-16:00` with `timezone=America/New_York` ([browser](https://api.coinmetrics.io/v4/timeseries/market-candles?markets=coinbase-btc-usd-spot\&frequency=1d-16:00\&timezone=America/New_York\&limit_per_market=2\&api_key=YOUR_API_KEY)). Each `time` is the interval start in UTC, so `20:00:00Z` is 16:00 in New York during EDT:

```json
{
  "data": [
    {
      "market": "coinbase-btc-usd-spot",
      "time": "2026-07-08T20:00:00.000000000Z",
      "price_open": "62226.01",
      "price_close": "63193.84",
      "price_high": "63448.46",
      "price_low": "61636.05",
      "vwap": "62623.342666761777416739",
      "volume": "6359.04202793",
      "candle_usd_volume": "398224467.9474001084984128750121",
      "candle_trades_count": "584718"
    },
    {
      "market": "coinbase-btc-usd-spot",
      "time": "2026-07-09T20:00:00.000000000Z",
      "price_open": "63199.27",
      "price_close": "63878.41",
      "price_high": "64669.42",
      "price_low": "62865.01",
      "vwap": "63963.270934832555281488",
      "volume": "6892.78525955",
      "candle_usd_volume": "440885091.052216796614849133451012",
      "candle_trades_count": "601967"
    }
  ]
}
```

## Coverage

{% embed url="https://coverage.coinmetrics.io/market-candles-v2" %}

## Usage

* **Charting and technical analysis.** Candles are the standard OHLCV input for price charts and for indicators such as moving averages, RSI, and Bollinger Bands.
* **Cross-exchange comparison.** Because every candle uses the same calculation, the same interval is directly comparable across venues. `candle_usd_volume` further normalizes activity to a common currency.
* **Continuous series.** Gapless candles give an unbroken series through quiet periods, which simplifies resampling and backtests that assume a value at every interval.
* **Real-time streaming.** The websocket feed pushes each candle as its interval completes, which suits dashboards and production consumers. Order messages within a connection by `cm_sequence_id`.
* **Choosing an interval.** Use short intervals (`1m`, `5m`) for microstructure and intraday work, and longer intervals (`1h`, `1d`) for trend and longer-horizon analysis.

## Limitations

* **Recent candles can be revised.** Within a rolling window of roughly three hours, candles are re-verified against late-arriving trades and recalculated if their contents changed, so a very recent candle can change slightly after first publication.
* **Availability delay by market type.** Option and decentralized-exchange spot candles are published on a delay of about twenty minutes. Centralized-exchange spot and futures candles are available immediately.
* **Derived from collected trades.** Candles reflect the trades Coin Metrics collects for a market. Coverage and history therefore track the underlying [trades data](market-trades.md) for that market.

## FAQ

### Do you use the candles reported by exchanges?

No. Coin Metrics calculates candles from the individual trades it collects, rather than ingesting candles published by exchanges. This keeps the calculation consistent across every venue and lets us include fields many exchanges do not report, such as US-dollar volume, a trade count, and a volume-weighted average price.

### What candle intervals are available?

`1m`, `5m`, `10m`, `15m`, `30m`, `1h`, `4h`, and `1d`, plus `1d-HH:00` for a daily candle whose boundary is offset to a specific hour. Select one with the `frequency` parameter (the default is `1d`).

### How do I get daily candles that close at a specific time zone, such as a 4 PM New York close?

Use the `timezone` parameter, plus a `1d-HH:00` offset when the boundary is not midnight. `frequency=1d&timezone=Asia/Tokyo` aligns each daily candle to Tokyo midnight, and `frequency=1d-16:00&timezone=America/New_York` (or the shorthand `frequency=1d-ny-close`) produces daily candles that run from 4:00 PM to 4:00 PM New York time. The offset must be a whole hour (`HH:00`), and the returned `time` values stay in UTC. See [Custom daily boundaries](market-candles.md#custom-daily-boundaries-offsets-and-time-zones) for details.

### Why does a candle show a flat price and zero volume?

That is a gapless candle. When no trades occur during an interval, Coin Metrics still emits a candle, carrying the previous close forward into open, high, low, and close and the previous VWAP into `vwap`, with `volume`, `candle_usd_volume`, and `candle_trades_count` set to `0`. It indicates no trading in that interval, not a gap in collection.

### What time does the `time` field represent?

The start of the candle interval. A one-minute candle stamped `06:01:00` covers `06:01:00` up to `06:02:00`.

### How is a candle's trading volume calculated?

A candle's `volume` is the sum of the base-asset amounts of every trade Coin Metrics collected on that market during the interval (or the number of contracts for derivatives), and `candle_usd_volume` is that same volume valued in US dollars. Both are computed for each market individually, from that market's own trades.

### How is `candle_usd_volume` calculated?

It is the interval's volume valued in US dollars. For markets quoted in US dollars or a US-dollar stablecoin the conversion follows from the traded prices, and otherwise Coin Metrics derives a US-dollar price from related market prices and reference rates. Derivatives conversions also account for the contract size. See [Volume in US dollars](market-candles.md#volume-in-us-dollars) for the formulas.

### Why did a recent candle change after I first queried it?

A few trades can be collected slightly late. Coin Metrics re-verifies recently published candles over a rolling window of roughly three hours and recalculates any interval whose contents changed, so very recent candles can shift slightly before settling.

### How far back does candle history go?

Candles are derived from trades, so a market's candle history matches its [trades](market-trades.md) history. That depth varies by exchange: Coin Metrics collects the maximum history each venue permits, which reaches back to 2010 for the earliest Bitcoin markets and only a short recent window for venues that expose little history. Check a specific market's available range on the [coverage page](https://coverage.coinmetrics.io/market-candles-v2).

## Related

* [Market Trades](market-trades.md): the tick-level executions that candles are aggregated from.
* [Pair Candles](pair-candles.md): OHLC candles built from Coin Metrics' cross-exchange reference rate for an asset pair.
* [Index Candles](../../index-data/index/index-timeseries/index-candles.md): OHLC candles for Coin Metrics indexes.
* [Reported Volume](volume/volume_reported.md): exchange-reported trading volume.
* [Look-ahead bias FAQ](../../resources/faqs.md#how-does-candle-recalculation-create-look-ahead-bias): how candle recalculation affects point-in-time-correct backtests.
