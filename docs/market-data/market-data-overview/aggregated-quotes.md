# Aggregated Quotes

## Overview

Aggregated quotes are a consolidated best bid and best ask for a pair (like `btc-usd`) or an asset (like `btc`), derived from the individual quotes of a selection of high-quality constituent markets. They answer the question "what is the market-wide top of book for this pair or asset, not just on one exchange?" and are used by traders, execution teams, and researchers who want a single cross-exchange reference for the best available price and spread. They are conceptually similar to the National Best Bid and Offer (NBBO), the United States Securities and Exchange Commission regulation that requires brokers to execute customer trades at the best available price.

Aggregated quotes are served in real time over two websocket endpoints:

* Pair quotes over [`/timeseries-stream/pair-quotes`](https://docs.coinmetrics.io/api/v4/#operation/getTimeseriesStreamPairQuotes)
* Asset quotes over [`/timeseries-stream/asset-quotes`](https://docs.coinmetrics.io/api/v4/#operation/getTimeseriesStreamAssetQuotes)

For the per-market building block these are computed from, see [Market Quotes](quotes.md).

## At a Glance

<table data-full-width="true"><thead><tr><th>Data type</th><th>Entities</th><th width="159">Frequency / cadence</th><th>Unit</th><th>Primary endpoints</th><th>Coverage</th></tr></thead><tbody><tr><td>Aggregated best bid / best ask (consolidated across constituent markets)</td><td>Pairs and assets</td><td>Real-time websocket stream (a new message up to roughly every 250ms)</td><td>Price in quote currency. Size in units of the base asset</td><td><code>/timeseries-stream/pair-quotes</code><br><br><code>/timeseries-stream/asset-quotes</code></td><td><a href="https://coverage.coinmetrics.io/pair-quotes-v2">🔗</a></td></tr></tbody></table>

## Schema

Pair quotes and asset quotes share one message schema. Each message is a single consolidated quote for one entity at one point in time. The entity is always reported in the `pair` field. For a pair quote it is the requested pair. For an asset quote it is the asset expressed against US dollars (for example, an asset quote for `btc` is reported as `btc-usd`), because an asset quote aggregates the asset's markets after converting them to US dollars.

| Field | Type | Description | Notes |
| --- | --- | --- | --- |
| `pair` | string | The entity the quote is for, as `<base>-<quote>`. Asset quotes are always expressed against US dollars, so an asset quote for `btc` is reported as `btc-usd`. | See [Entities](#entities-and-aggregation-method) |
| `time` | string (date-time) | The time of the consolidated quote. ISO 8601, nanosecond precision. | |
| `ask_price` | string (decimal) | The consolidated best ask price, in units of the quote currency, as produced by the aggregation method. | |
| `ask_size` | string (decimal) | The consolidated ask size, in units of the base asset, as produced by the aggregation method. | |
| `bid_price` | string (decimal) | The consolidated best bid price, in units of the quote currency, as produced by the aggregation method. | |
| `bid_size` | string (decimal) | The consolidated bid size, in units of the base asset, as produced by the aggregation method. | |
| `mid_price` | string (decimal) | The average of `ask_price` and `bid_price`. | |
| `spread` | string (decimal) | The bid-ask spread as a fraction of the mid price: `(ask_price - bid_price) / mid_price`. | Fraction, not an absolute price |
| `cm_sequence_id` | string | Per-connection message sequence number for ordering the live stream. | Websocket messages only |

{% hint style="info" %}
**Conventions.** Prices, sizes, and spreads are returned as JSON **strings** to preserve precision. Timestamps are UTC ISO-8601 with nanosecond resolution. `time` is the timestamp of the consolidated quote. `spread` is a dimensionless fraction of the mid price, not a price in quote-currency units. Units are per-field (see the table).
{% endhint %}

## Methodology

Aggregated quotes take the best bid and best ask from a set of high-quality constituent markets and combine them into a single consolidated quote. Aggregation runs continuously as the underlying market quotes update, and the result is published to the streaming endpoints.

### Entities and aggregation method

A **pair quote** consolidates the constituent markets whose trading pair matches the requested pair, in the pair's own quote currency. An **asset quote** consolidates the constituent markets for the requested base asset whose quote currency is US dollars or convertible to US dollars, converting each market's prices to US dollars first, and is reported against US dollars (for example, an asset quote for `btc` is reported as `btc-usd`).

The consolidation method is selected with the `aggregation_method` parameter. Only `aggregated_spread` is currently implemented, and it is the default. Requests for any other method are rejected.

### The `aggregated_spread` method

The method is designed to produce a coherent consolidated quote that is not crossed. A naive approach would take the highest bid and the lowest ask across all venues, the way a National Best Bid and Offer is formed within a single regulated market. In crypto this frequently yields a crossed book, where the reported best bid is higher than the best ask, because arbitrage across exchanges is limited. Moving assets and capital between venues takes time and incurs fees, withdrawal limits, and transfer risk, so the same asset can trade at persistently different prices on different exchanges. Pairing one venue's highest bid with another venue's lowest ask would therefore report a spread that no participant could actually trade against. Instead, `aggregated_spread` measures each market's own mid price and spread first, then combines those, so the consolidated bid stays below the consolidated ask by construction.

The method combines the eligible constituent markets in the following steps.

**1. Select and validate inputs.** Take the eligible constituent markets for the entity (see [Constituent market selection](#constituent-market-selection)), and use only those with a valid, two-sided book: a positive best bid and best ask, with the ask above the bid. Empty, one-sided, and crossed books are excluded.

**2. Clamp outliers (winsorization).** To keep a single off-market venue from skewing the result, each market's best bid is pulled toward the median best bid across the selected markets, and its best ask toward the median best ask. A price is held within about 1% of that median, or about 3% for markets quoted in a US-dollar stablecoin (`usd`, `usdt`, `usdc`). A price already inside the band is left unchanged, and one outside it is capped at the band edge. This clamping is applied only when more than two markets are present, since a median is not meaningful below that.

**3. Compute per-market mid price and spread** from the clamped prices, for each constituent market (indexed by i):

$$MidpointPrice_i = \frac{BestAskPrice_i + BestBidPrice_i}{2}$$

$$Spread_i = \frac{BestAskPrice_i - BestBidPrice_i}{MidpointPrice_i}$$

**4. Volume-weight across markets.** Calculate the volume-weighted average mid price and the volume-weighted average spread, using each market's traded volume over a trailing one-hour window as the weight (shown as the volume term in the formulas below). Trailing volume is used because it reflects the real contribution of an exchange to the market. Weighting by the size resting at the top of the book instead would let the random behavior of individual participants bias the aggregate in a way that does not represent an exchange's true contribution. Volume weighting measures the spread that is actually realized through real trading activity for a given asset or pair.

$$AvgMidpointPrice = \frac{\sum_{i=1}^{n} Volume_i \times MidpointPrice_i}{\sum_{i=1}^{n} Volume_i}$$

$$AvgSpread = \frac{\sum_{i=1}^{n} Volume_i \times Spread_i}{\sum_{i=1}^{n} Volume_i}$$

**5. Reconstruct the aggregated bid and ask** prices from the average mid price and average spread:

$$AggBidPrice = AvgMidpointPrice - 0.5 \times AvgSpread \times AvgMidpointPrice$$

$$AggAskPrice = AvgMidpointPrice + 0.5 \times AvgSpread \times AvgMidpointPrice$$

**6. Sum the sizes.** The aggregated bid and ask sizes are the sums of the best bid and best ask sizes across the constituent markets:

$$AggBidAmount = \sum_{i=1}^{n} BestBidAmount_i$$

$$AggAskAmount = \sum_{i=1}^{n} BestAskAmount_i$$

For an asset quote, each constituent market's prices are first converted to US dollars using Coin Metrics reference rates, and the consolidated quote is reported as `<asset>-usd`. Only markets whose quote currency is US dollars or has a US-dollar reference rate are included. A market whose quote currency cannot be converted to US dollars is left out.

### Publication and continuity

Each entity's consolidated quote is recomputed and published up to once every 250 milliseconds. An entity with no traded volume over the trailing window produces no quote. When an entity has no fresh input in a given cycle, its most recent value is republished, restamped with the current time, for up to 10 minutes before it stops.

### Constituent market selection

Constituent markets are the spot markets on the Coin Metrics set of trusted exchanges, selected using the [Trusted Exchange Framework](https://coinmetrics.io/special-insights/trusted-exchange-framework/). This set is maintained as configuration and changes over time, so treat the coverage pages as the authoritative list of what is currently included. Two further filters apply:

* **Manual exclusions.** A curated list of specific markets is removed from the aggregate, for example a market that is known to be unreliable or unrepresentative for a given pair. This exclusion list is maintained as configuration and updated as needed.
* **Book validity.** Only markets with a valid, two-sided book at the moment of computation contribute. Empty, one-sided, or crossed books are skipped.

Each remaining market is weighted by its recent traded volume, so a venue with little or no trading over the trailing hour has little or no effect on the result. For asset quotes, a market also contributes only if its quote currency is US dollars or convertible to US dollars through a reference rate.

## Accessing the Data

Aggregated quotes are available only as real-time websocket streams. The stream sends a new consolidated quote as the underlying markets move. By default the connection first emits the most recent cached quote for each requested entity (`backfill=latest`), then continues with live data. Set `backfill=none` to receive live data only. The `aggregation_method` parameter defaults to `aggregated_spread`.

### Pair quotes

{% tabs %}
{% tab title="Python Client" %}
```python
import os
from coinmetrics.api_client import CoinMetricsClient

client = CoinMetricsClient(os.environ["CM_API_KEY"])

stream = client.get_stream_pair_quotes(pairs=["btc-usd"])
stream.run()   # prints consolidated quotes as they arrive; Ctrl-C to stop
```
{% endtab %}

{% tab title="Shell" %}
```shell
websocat "wss://api.coinmetrics.io/v4/timeseries-stream/pair-quotes?pairs=btc-usd&api_key=$CM_API_KEY"
```
{% endtab %}

{% tab title="JavaScript" %}
```javascript
ws = new WebSocket("wss://api.coinmetrics.io/v4/timeseries-stream/pair-quotes?pairs=btc-usd&api_key=<YOUR_API_KEY>")
ws.onmessage = m => console.log(m.data)
ws.onclose = () => console.log("closed")
```
{% endtab %}
{% endtabs %}

### Asset quotes

{% tabs %}
{% tab title="Python Client" %}
```python
import os
from coinmetrics.api_client import CoinMetricsClient

client = CoinMetricsClient(os.environ["CM_API_KEY"])

stream = client.get_stream_asset_quotes(assets=["btc"])
stream.run()   # prints consolidated quotes as they arrive; Ctrl-C to stop
```
{% endtab %}

{% tab title="Shell" %}
```shell
websocat "wss://api.coinmetrics.io/v4/timeseries-stream/asset-quotes?assets=btc&api_key=$CM_API_KEY"
```
{% endtab %}

{% tab title="JavaScript" %}
```javascript
ws = new WebSocket("wss://api.coinmetrics.io/v4/timeseries-stream/asset-quotes?assets=btc&api_key=<YOUR_API_KEY>")
ws.onmessage = m => console.log(m.data)
ws.onclose = () => console.log("closed")
```
{% endtab %}
{% endtabs %}

Full parameter reference: see the API Reference for [`/timeseries-stream/pair-quotes`](https://docs.coinmetrics.io/api/v4/#operation/getTimeseriesStreamPairQuotes) and [`/timeseries-stream/asset-quotes`](https://docs.coinmetrics.io/api/v4/#operation/getTimeseriesStreamAssetQuotes).

## Examples

The examples below are single live messages, captured from the streams. The entity is reported in the `pair` field for both endpoints.

### Example: pair quote (`btc-usd`)

A consolidated quote for the `btc-usd` pair from `wss://api.coinmetrics.io/v4/timeseries-stream/pair-quotes?pairs=btc-usd`:

```json
{
  "pair": "btc-usd",
  "time": "2026-07-11T18:50:25.250000000Z",
  "ask_price": "64283.096296423675",
  "ask_size": "2.16637243",
  "bid_price": "64283.07106966449",
  "bid_size": "2.91571352",
  "mid_price": "64283.08368304408",
  "spread": "0.00000039243231234341923",
  "cm_sequence_id": "0"
}
```

### Example: asset quote (`btc`)

A consolidated quote for the `btc` asset from `wss://api.coinmetrics.io/v4/timeseries-stream/asset-quotes?assets=btc`. The asset is reported against US dollars, so `btc` appears as `btc-usd`:

```json
{
  "pair": "btc-usd",
  "time": "2026-07-11T18:50:25.750000000Z",
  "ask_price": "64283.72707408306",
  "ask_size": "15.020860047",
  "bid_price": "64283.31606941969",
  "bid_size": "12.351677669999999",
  "mid_price": "64283.52157175138",
  "spread": "0.000006393623954004689",
  "cm_sequence_id": "0"
}
```

## Coverage

Pair quotes:

{% embed url="https://coverage.coinmetrics.io/pair-quotes-v2" %}

Asset quotes:

{% embed url="https://coverage.coinmetrics.io/asset-quotes-v2" %}

## FAQ

### What are the constituent markets used in the calculation?

Constituent markets are the spot markets on the Coin Metrics set of trusted exchanges, selected using the [Trusted Exchange Framework](https://coinmetrics.io/special-insights/trusted-exchange-framework/). This set is maintained as configuration and changes over time, so the coverage pages are the authoritative source for what is currently included. A curated list of specific markets is excluded, only valid two-sided books are used, and each market contributes in proportion to its recent traded volume.

The quote currencies that participate depend on the entity. A pair quote uses only markets for that exact pair, so the quote currency is the one named in the pair (for example, `btc-usdt` uses `btc-usdt` markets). An asset quote combines an asset's markets across quote currencies, including only those whose quote currency is US dollars or convertible to US dollars through a Coin Metrics reference rate, and converts them to US dollars before combining.

### How do pair quotes and asset quotes differ?

A pair quote consolidates the constituent markets for one specific trading pair, such as `btc-usd`. An asset quote consolidates the markets for a base asset, such as `btc`, converting each to US dollars and reporting the result as `<asset>-usd` (for example, `btc-usd`). Both use the same schema and the same `aggregated_spread` method.

### How often is the data updated?

The websocket streams send a new message up to roughly once every 250 milliseconds.

## Related

* [Market Quotes](quotes.md): the per-market best bid and best ask these aggregates are built from.
* [Order Books](order-books.md): the full order book that market quotes are derived from.
* [Market Trades](market-trades.md): executed trades for the same markets.
