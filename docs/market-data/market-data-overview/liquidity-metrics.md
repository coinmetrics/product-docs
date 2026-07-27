# Liquidity Metrics

## Overview

Liquidity metrics measure how cheaply and how large you can trade in a single market. They are computed from the order book rather than from executed trades, so they describe the liquidity that was actually resting and available at a point in time. Together they answer three related questions: how wide is the market, how much size is resting near the top of the book, and what would a given order actually cost to execute. Traders, execution and transaction-cost analysis teams, market makers, and exchange-quality researchers use them to compare venues, size orders, and monitor how market quality changes over time.

This page covers three families, all served for markets on the same endpoint. **Bid-ask spread** is the distance between the best bid and the best ask as a percent of the midprice. **Order book depth** is the resting volume within a given percentage band around the midprice. **Slippage** is the cost of executing a market order of a given U.S. dollar size against the resting book.

## At a Glance

<table data-full-width="true"><thead><tr><th>Data type</th><th>Entities</th><th width="159">Frequency / cadence</th><th>Unit</th><th>Primary endpoint</th><th>Coverage</th></tr></thead><tbody><tr><td>Order book liquidity metrics (bid-ask spread, order book depth, slippage)</td><td>Markets (spot and futures)</td><td>Bid-ask spread at 1m, 1h, and 1d. Order book depth and slippage at 1h</td><td>Dimensionless (percent) for spread and slippage. Native units or USD for depth</td><td><code>/timeseries/market-metrics</code></td><td><a href="https://docs.coinmetrics.io/api/v4/#operation/getCatalogAllV2MarketMetrics">🔗</a></td></tr></tbody></table>

## Metrics

There are 125 liquidity metrics: 3 bid-ask spread, 80 order book depth, and 42 slippage. Depth and slippage are generated combinatorially, so they are documented below by naming convention with the full list of available parameter values, rather than as one row per metric. Substitute a value from the parameter list into the placeholder to get a valid metric name. To browse the resolved list and check per-market availability, query the catalog as shown under [Coverage](#coverage).

### Bid-ask spread

The mean bid-ask spread over the interval, expressed as a percent of the midprice (see [Methodology](#bid-ask-spread-calculation)). Each metric is published only at the frequency named in its own suffix, so `liquidity_bid_ask_spread_percent_1h` must be requested with `frequency=1h`.

<table data-full-width="true"><thead><tr><th width="470">Metric</th><th>Description</th><th width="90">Unit</th><th width="90">Frequency</th></tr></thead><tbody><tr><td><code>liquidity_bid_ask_spread_percent_1m</code></td><td>The mean bid-ask spread over a 1 minute window as a percent of midprice.</td><td>Dimensionless</td><td>1m</td></tr><tr><td><code>liquidity_bid_ask_spread_percent_1h</code></td><td>The mean bid-ask spread over a 1 hour window as a percent of midprice.</td><td>Dimensionless</td><td>1h</td></tr><tr><td><code>liquidity_bid_ask_spread_percent_1d</code></td><td>The mean bid-ask spread over a 1 day window as a percent of midprice.</td><td>Dimensionless</td><td>1d</td></tr></tbody></table>

### Order book depth

The cumulative resting volume within `{X}` percent of the midprice, reported separately for the bid and the ask side and in two units (see [Methodology](#order-book-depth-calculation)). All 80 metrics are hourly.

<table data-full-width="true"><thead><tr><th width="470">Metric</th><th>Description</th><th width="120">Unit</th><th width="90">Frequency</th></tr></thead><tbody><tr><td><code>liquidity_depth_{X}_percent_ask_volume_units</code></td><td>The sum of all ask orders with price within X percent from midprice, in native units.</td><td>Native Units</td><td>1h</td></tr><tr><td><code>liquidity_depth_{X}_percent_bid_volume_units</code></td><td>The sum of all bid orders with price within X percent from midprice, in native units.</td><td>Native Units</td><td>1h</td></tr><tr><td><code>liquidity_depth_{X}_percent_ask_volume_usd</code></td><td>The sum of all ask orders with price within X percent from midprice, where the order amount is converted to USD.</td><td>USD</td><td>1h</td></tr><tr><td><code>liquidity_depth_{X}_percent_bid_volume_usd</code></td><td>The sum of all bid orders with price within X percent from midprice, where the order amount is converted to USD.</td><td>USD</td><td>1h</td></tr></tbody></table>

`{X}` is the distance from the midprice in percent, and takes 20 values. A decimal point is written as an underscore, so 0.1 percent is `0_1` and 1.5 percent is `1_5`, while whole percentages carry no decimal at all, so 1 percent is `1` and 10 percent is `10`:

`0_1`, `0_2`, `0_3`, `0_4`, `0_5`, `0_6`, `0_7`, `0_8`, `0_9`, `1`, `1_5`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`

For example, `liquidity_depth_0_5_percent_bid_volume_usd` is the U.S. dollar value of all bids resting within 0.5 percent below the midprice.

### Slippage

The price slippage incurred by a market order of `{S}` U.S. dollars, as a percent of the midprice (see [Methodology](#slippage-calculation)). Ask metrics price a market **buy** and bid metrics price a market **sell**. All 42 metrics are hourly.

<table data-full-width="true"><thead><tr><th width="470">Metric</th><th>Description</th><th width="120">Unit</th><th width="90">Frequency</th></tr></thead><tbody><tr><td><code>liquidity_slippage_{S}_ask_percent</code></td><td>The price slippage for a market buy order of S U.S. dollars as a percent of midprice.</td><td>Dimensionless</td><td>1h</td></tr><tr><td><code>liquidity_slippage_{S}_bid_percent</code></td><td>The price slippage for a market sell order of S U.S. dollars as a percent of midprice.</td><td>Dimensionless</td><td>1h</td></tr></tbody></table>

`{S}` is the notional order size in U.S. dollars, written with a `K` or `M` suffix, and takes 21 values:

`1K`, `5K`, `10K`, `20K`, `30K`, `40K`, `50K`, `60K`, `70K`, `80K`, `90K`, `100K`, `200K`, `300K`, `400K`, `500K`, `600K`, `700K`, `800K`, `900K`, `1M`

For example, `liquidity_slippage_100K_ask_percent` is the slippage on a $100,000 market buy.

{% hint style="info" %}
**Conventions.** Metric values are returned as JSON strings to preserve precision. Timestamps are UTC ISO-8601 with nanosecond resolution. For the interval-averaged spread metrics, `time` is the start of the interval the average covers. For depth and slippage, `time` is the hour of the order book snapshot the value was measured from. The spread and slippage metrics are already scaled to percent, so a value of `0.0076` means 0.0076 percent and not 0.76 percent. Depth metrics are absolute volumes in the unit named in the metric. A metric is published only at the frequency shown in its row, and requesting it at any other frequency returns an error. Values can be null where the order book was too shallow to compute them (see [Missing values](#missing-values)).
{% endhint %}

## Methodology

All three families are produced by one service, and all three use the same reference price: the midprice halfway between the best bid and the best ask.

$$
P_{\text{mid}} = \frac{P_{\text{bid}}^{(1)} + P_{\text{ask}}^{(1)}}{2}
$$

They differ in which input they read. The spread metrics only need the top of the book, so they consume the real-time quote feed, which carries a market's best bid and best ask as they change. Depth and slippage need every price level, so they read the hourly full-depth order book snapshot and evaluate that one snapshot. These are two separate inputs on two different cadences, which is why the spread is available at 1m, 1h, and 1d while depth and slippage are hourly only. It is also why a spread value and a depth value carrying the same hourly timestamp are not two readings of one book: the spread is an average across the hour, and the depth is a single instant within it.

### Bid-ask spread calculation

For each quote update, the spread is the distance between the best ask and the best bid, taken as a percent of the midprice:

$$
\text{Spread}\% = \frac{P_{\text{ask}}^{(1)} - P_{\text{bid}}^{(1)}}{P_{\text{mid}}} \times 100
$$

The 1-minute metric is the simple arithmetic mean of every quote update received for the market during that minute. Each update carries equal weight regardless of how long it stood at the top of the book, so the value is an average per update rather than a time-weighted average. Updates where either side is missing or priced at zero are discarded. Because the feed publishes a quote only when the best bid or the best ask actually changes, the number of observations behind a 1-minute value varies with how actively the market is quoted, from many in a fast market to one or none in a quiet one.

The longer intervals roll up the shorter ones rather than re-reading the raw feed. The 1-hour value is the mean of the 60 constituent 1-minute values, and the 1-day value is the mean of the 24 constituent 1-hour values, so each minute contributes equally to the hour and each hour equally to the day. When a market publishes no fresh quote in a given minute, its most recent 1-minute value is carried forward so the series stays continuous.

### Order book depth calculation

Depth walks outward from the midprice and accumulates resting size until the price crosses the target band. For a band of X percent, the threshold price sits X percent below the midprice on the bid side and X percent above it on the ask side, and the depth is the sum of the amounts at every level inside that threshold:

$$
\text{Depth}^{\text{bid}}_{X} = \sum_{p \ \ge \ P_{\text{mid}}(1 - X/100)} V(p) \qquad \text{Depth}^{\text{ask}}_{X} = \sum_{p \ \le \ P_{\text{mid}}(1 + X/100)} V(p)
$$

The 20 bands are evaluated in a single pass over the book, so the value at each band is the running total at the moment the walk crosses that band. Depth is therefore cumulative: the 2 percent value includes everything counted at 1 percent, and it never decreases as the band widens.

The U.S. dollar variant values each level at its own price rather than at the midprice, so it is the notional resting inside the band. For a market quoted directly against a currency, that is:

$$
\text{Depth}^{\text{usd}}_{X} = \sum_{p} V(p) \times p \times R_{\text{quote} \rightarrow \text{usd}}
$$

Here R is the Coin Metrics reference rate that converts the market's quote asset into U.S. dollars, which is what makes depth comparable across markets quoted in different currencies. Futures contracts additionally carry a contract size, and inverse contracts are converted through the contract's size asset rather than through the quote asset, as described under [Entity scope and units](#entity-scope-and-units).

### Slippage calculation

Slippage simulates filling a market order of a fixed U.S. dollar size against the resting book and compares the realized price to the midprice. Levels are consumed in price order starting at the best bid or best ask, each level valued in U.S. dollars, until the cumulative filled notional reaches the target order size. The final level is filled only partially if that is all the order needs.

The realized price is the volume-weighted average of the levels consumed, weighted by the base-asset amount actually taken from each level:

$$
P_{\text{exec}} = \frac{\sum_{i} q_i \, P_i}{\sum_{i} q_i}, \qquad q_i = \text{amount taken from level } i
$$

Slippage is then the absolute distance from the midprice, as a percent:

$$
\text{Slippage}\% = \frac{\left| P_{\text{exec}} - P_{\text{mid}} \right|}{P_{\text{mid}}} \times 100
$$

Because the sign is dropped, slippage is always non-negative. Direction is carried by the metric name instead, with `ask` pricing a buy and `bid` pricing a sell. All 21 order sizes are filled in the same pass over the book.

As a worked example, suppose the midprice is $25,000 and a market buy of 1 BTC consumes 0.25 BTC at $25,000, then 0.5 BTC at $25,250, then 0.25 BTC at $25,500. The realized price is the quantity-weighted average of those three fills, which is $25,250, so the slippage is $250 / $25,000, or 1 percent. A larger order would reach deeper into the book and slip further, which is why slippage is published per order size rather than as a single number.

### Entity scope and units

Metrics are computed for spot and futures markets. Decentralized exchanges are excluded, and there are no options metrics in these families.

For **spot** markets, native units are units of the base asset, so `liquidity_depth_1_percent_bid_volume_units` on a BTC-USD market is a quantity of BTC. For **futures** markets, the resting size is quoted in contracts, and the amount is scaled by the contract size before publication, so the native-units value is expressed in units of the contract's underlying size asset rather than as a raw contract count. Inverse and coin-margined contracts are converted through the contract's size asset. The U.S. dollar variants of depth, and the U.S. dollar order sizes used by slippage, are converted using Coin Metrics reference rates.

### Cadence and revisions

The spread job runs continuously and writes a value at every minute boundary, rolling up to the hour and to the day as those boundaries pass. The depth and slippage job runs once an hour, shortly after the hour, against that hour's full-book snapshot. Because some exchanges deliver their books late, each hourly run also recomputes the previous hour, so a recently published depth or slippage value can be revised once before it settles. When more than one snapshot is available for a market at the calculation time, the deepest one is used.

### Missing values

A depth or slippage value is null when the collected book is not deep enough to answer the question being asked. For depth, that means the book does not extend as far as the requested percentage band from the midprice. For slippage, it means the resting size is not sufficient to fill an order of that U.S. dollar size. In both cases a null is published deliberately, in preference to reporting the partial total, so that a shallow book is never mistaken for a genuine reading. If a market is missing values at a wide band or a large order size, the narrower bands and smaller order sizes are usually still populated. If neither side of the book has any levels at all, the market produces no rows for that hour.

## Accessing the Data

All 125 metrics are served for markets on a single endpoint. Pass the metric names in `metrics`, the market IDs in `markets`, and a `frequency` that matches the metrics requested. Metrics with different frequencies cannot be combined in one request.

* [`/timeseries/market-metrics`](https://docs.coinmetrics.io/api/v4/#operation/getTimeseriesMarketMetrics)

The examples below pull one metric from each family at the hourly frequency for `coinbase-btc-usd-spot`.

{% tabs %}
{% tab title="Python Client" %}
```python
import os
from datetime import timedelta
from coinmetrics.api_client import CoinMetricsClient

client = CoinMetricsClient(os.environ["CM_API_KEY"])

# Spread, depth, and slippage for one market over a time range, fetched in parallel.
df = client.get_market_metrics(
    markets=["coinbase-btc-usd-spot"],
    metrics=[
        "liquidity_bid_ask_spread_percent_1h",
        "liquidity_depth_2_percent_ask_volume_usd",
        "liquidity_slippage_100K_ask_percent",
    ],
    frequency="1h",
    start_time="2025-01-01",
    end_time="2025-02-01",
    format="json_stream",
).parallel(time_increment=timedelta(days=7)).to_dataframe()

print(df)

# For just the latest value, use limit_per_market instead (uses format="json"):
# client.get_market_metrics(markets=["coinbase-btc-usd-spot"], metrics=["liquidity_bid_ask_spread_percent_1h"], frequency="1h", limit_per_market=1).to_dataframe()
```
{% endtab %}

{% tab title="Shell" %}
```shell
curl --compressed "https://api.coinmetrics.io/v4/timeseries/market-metrics?markets=coinbase-btc-usd-spot&metrics=liquidity_bid_ask_spread_percent_1h,liquidity_depth_2_percent_ask_volume_usd,liquidity_slippage_100K_ask_percent&frequency=1h&limit_per_market=3&page_size=10000&api_key=$CM_API_KEY"
```
{% endtab %}

{% tab title="Python" %}
```python
import os, requests

response = requests.get(
    "https://api.coinmetrics.io/v4/timeseries/market-metrics",
    params={"markets": "coinbase-btc-usd-spot",
            "metrics": "liquidity_bid_ask_spread_percent_1h,liquidity_depth_2_percent_ask_volume_usd,liquidity_slippage_100K_ask_percent",
            "frequency": "1h", "limit_per_market": 3,
            "page_size": 10000, "api_key": os.environ["CM_API_KEY"]},
).json()
print(response)
```
{% endtab %}
{% endtabs %}

Full parameter reference: see the API Reference for [`/timeseries/market-metrics`](https://docs.coinmetrics.io/api/v4/#operation/getTimeseriesMarketMetrics).

## Examples

The examples below are live hourly pulls, returned as JSON strings, and change on each pull.

### Example: bid-ask spread

The mean hourly bid-ask spread for `coinbase-btc-usd-spot`, as a percent of the midprice ([browser](https://api.coinmetrics.io/v4/timeseries/market-metrics?markets=coinbase-btc-usd-spot\&metrics=liquidity_bid_ask_spread_percent_1h\&limit_per_market=3\&frequency=1h\&api_key=YOUR_API_KEY)):

```json
[
  {
    "market": "coinbase-btc-usd-spot",
    "time": "2026-07-24T19:00:00.000000000Z",
    "liquidity_bid_ask_spread_percent_1h": "0.0006190179107682638"
  },
  {
    "market": "coinbase-btc-usd-spot",
    "time": "2026-07-24T20:00:00.000000000Z",
    "liquidity_bid_ask_spread_percent_1h": "0.00038880138177427726"
  },
  {
    "market": "coinbase-btc-usd-spot",
    "time": "2026-07-24T21:00:00.000000000Z",
    "liquidity_bid_ask_spread_percent_1h": "0.00037232877615717694"
  }
]
```

### Example: order book depth on a spot market

The U.S. dollar value of asks resting within 2 percent of the midprice on `coinbase-btc-usd-spot` ([browser](https://api.coinmetrics.io/v4/timeseries/market-metrics?markets=coinbase-btc-usd-spot\&metrics=liquidity_depth_2_percent_ask_volume_usd\&limit_per_market=3\&frequency=1h\&api_key=YOUR_API_KEY)):

```json
[
  {
    "market": "coinbase-btc-usd-spot",
    "time": "2026-07-24T20:00:00.000000000Z",
    "liquidity_depth_2_percent_ask_volume_usd": "13316746.250485506"
  },
  {
    "market": "coinbase-btc-usd-spot",
    "time": "2026-07-24T21:00:00.000000000Z",
    "liquidity_depth_2_percent_ask_volume_usd": "6324599.903511325"
  },
  {
    "market": "coinbase-btc-usd-spot",
    "time": "2026-07-24T22:00:00.000000000Z",
    "liquidity_depth_2_percent_ask_volume_usd": "12571760.371451646"
  }
]
```

### Example: order book depth on a futures market

The same band on the bid side of the `binance-BTCUSDT-future` perpetual, in native units ([browser](https://api.coinmetrics.io/v4/timeseries/market-metrics?markets=binance-BTCUSDT-future\&metrics=liquidity_depth_2_percent_bid_volume_units\&limit_per_market=3\&frequency=1h\&api_key=YOUR_API_KEY)):

```json
[
  {
    "market": "binance-BTCUSDT-future",
    "time": "2026-07-24T20:00:00.000000000Z",
    "liquidity_depth_2_percent_bid_volume_units": "11056.79100000039"
  },
  {
    "market": "binance-BTCUSDT-future",
    "time": "2026-07-24T21:00:00.000000000Z",
    "liquidity_depth_2_percent_bid_volume_units": "11025.119000000455"
  },
  {
    "market": "binance-BTCUSDT-future",
    "time": "2026-07-24T22:00:00.000000000Z",
    "liquidity_depth_2_percent_bid_volume_units": "11059.27300000053"
  }
]
```

### Example: slippage

The slippage on a $100,000 market buy in `coinbase-btc-usd-spot`, as a percent of the midprice ([browser](https://api.coinmetrics.io/v4/timeseries/market-metrics?markets=coinbase-btc-usd-spot\&metrics=liquidity_slippage_100K_ask_percent\&limit_per_market=3\&frequency=1h\&api_key=YOUR_API_KEY)):

```json
[
  {
    "market": "coinbase-btc-usd-spot",
    "time": "2026-07-24T19:00:00.000000000Z",
    "liquidity_slippage_100K_ask_percent": "0.00011766663149434649"
  },
  {
    "market": "coinbase-btc-usd-spot",
    "time": "2026-07-24T20:00:00.000000000Z",
    "liquidity_slippage_100K_ask_percent": "0.011446722315811534"
  },
  {
    "market": "coinbase-btc-usd-spot",
    "time": "2026-07-24T21:00:00.000000000Z",
    "liquidity_slippage_100K_ask_percent": "0.002881796919164986"
  }
]
```

## Coverage

Market metrics are not published on coverage.coinmetrics.io. Availability is read from the catalog instead, which reports every market and metric together with the frequency and the first and last timestamp each one has data. This is the authoritative list of what exists and over what period, and it stays current as markets are added and retired.

* [`/catalog-all-v2/market-metrics`](https://docs.coinmetrics.io/api/v4/#operation/getCatalogAllV2MarketMetrics): complete availability, independent of the requesting key.
* [`/catalog-v2/market-metrics`](https://docs.coinmetrics.io/api/v4/#operation/getCatalogV2MarketMetrics): the same view, restricted to what a key is entitled to.
* [`/reference-data/market-metrics`](https://docs.coinmetrics.io/api/v4/#operation/getReferenceDataMarketMetrics): descriptive metadata, being the display name, description, and unit of a metric.

Because the three families do not share a frequency or a market list, query the catalog for a specific market before building against it rather than assuming a metric exists there.

The families also do not share a history start. Order book depth and slippage begin on 2021-05-01, while bid-ask spread begins on 2022-09-12, so a study spanning all three is limited to the shorter window. These are the earliest timestamps across all markets; any individual market starts no earlier than its own listing, and often considerably later.

{% tabs %}
{% tab title="Python Client" %}
```python
import os
from coinmetrics.api_client import CoinMetricsClient

client = CoinMetricsClient(os.environ["CM_API_KEY"])

# Every liquidity metric available for one market, with its date range.
df = client.catalog_full_market_metrics_v2(
    markets=["coinbase-btc-usd-spot"]
).to_dataframe()

print(df[df["metric"].str.startswith("liquidity_")])
```
{% endtab %}

{% tab title="Shell" %}
```shell
curl --compressed "https://api.coinmetrics.io/v4/catalog-all-v2/market-metrics?markets=coinbase-btc-usd-spot&page_size=10000&api_key=$CM_API_KEY"
```
{% endtab %}
{% endtabs %}

To go the other way and list every market carrying a given metric, pass `metrics` instead of `markets`. Omitting both returns the full catalog, which is large enough that it should be paged through rather than fetched in one call.

## Usage

* **Compare venues on like-for-like terms.** Spread and the U.S. dollar depth variants are normalized, so the same asset can be ranked across exchanges and across quote currencies without further conversion.
* **Size an order before sending it.** Read the slippage curve across order sizes for a market to find the size at which execution cost starts to climb, then compare that curve between venues.
* **Build a transaction-cost estimate.** Because slippage is measured against the midprice, it already includes the half-spread cost of crossing the book, and it converges on half the bid-ask spread as the order size shrinks toward a single top-of-book fill. Do not add the two together. Read the difference between slippage at your size and half the spread as the marginal cost of reaching past the top of the book.
* **Track market quality over time.** The 1-minute spread series is fine enough to see intraday deterioration around events, while the daily series is convenient for long-run venue monitoring.
* **Read depth as a shape, not a number.** Pulling several bands at once (for example 0.1, 0.5, 1, and 2 percent) describes how liquidity is distributed around the midprice rather than just how much of it there is.
* **Combine with volume.** Depth measures resting liquidity and [Volume](volume/README.md) measures executed activity. A market can show one without the other.

## Limitations

* **Depth and slippage are hourly point-in-time readings.** Each value describes one snapshot rather than an average over the hour, so an unusually thin or thick book at the moment of the snapshot is reported as-is. The bid-ask spread metrics are averages and do not have this property.
* **The spread average weights quote updates, not time.** Each quote update in the interval counts once regardless of how long it stood, so a market that requotes rapidly during a brief dislocation can pull the average further than the duration of that dislocation alone would suggest. Markets also differ in how often they requote, so observation counts behind two equal-looking values are not necessarily comparable.
* **Missing values are returned as nulls, not as absent rows.** A market with an insufficient book still appears in the response for that timestamp with a null value, so consumers should handle nulls rather than assume every returned row carries a number.
* **Values are capped by what each exchange publishes.** Metrics can only see the levels a venue exposes. Venues that publish a shallow book, such as only the top levels, produce nulls at the wider bands and larger order sizes. See the per-exchange depth table in [Order Books](order-books.md#limitations).
* **Slippage assumes an instantaneous fill against resting liquidity.** It does not model fees, latency, market impact, hidden or iceberg orders, or liquidity that would replenish while the order works. Treat it as a lower bound on the true cost of a large order.
* **Depth counts resting orders, not committed liquidity.** Orders inside a band can be cancelled before they are ever executable.
* **The most recent hour can be revised.** Late-arriving books cause each hourly run to recompute the previous hour.
* **Spot and futures only.** Decentralized exchanges are excluded and there are no options metrics in these families.
* **U.S. dollar values depend on a reference rate.** A market whose quote asset cannot be converted to U.S. dollars at the calculation time produces no U.S. dollar depth or slippage values for that hour.

## FAQ

### What units are the spread and slippage metrics in?

They are already scaled to percent. A value of `0.0076` should be read as 0.0076 percent, not as 0.76 percent and not as a decimal fraction.

### Why are some depth and slippage values missing?

Coin Metrics computes these from order book snapshots, and takes the deepest and most complete book each exchange offers, but the depth exchanges publish varies widely. If a book does not reach the requested band, or does not hold enough size to fill the requested order, the observation is published as null rather than as a partial total. This is deliberate, so that a shallow book is visible as missing rather than being silently reported as a low reading. If you need a non-null value, choose a narrower band or a smaller order size. Some venues publish only the top 20 or 100 levels, so a large share of nulls is expected there. See [Order Books](order-books.md#limitations) for the depth available per exchange.

### Why is the bid-ask spread available at 1m but depth and slippage only at 1h?

They read different inputs. The spread only needs the best bid and best ask, which arrive continuously on the real-time quote feed and can be averaged into a 1-minute bar. Depth and slippage need every price level, and the full-depth order book snapshot is captured once an hour.

### Is the hourly bid-ask spread an average of the hourly snapshots?

It is an average of averages. Every quote update in a minute is averaged into a 1-minute value, and the hourly value is the mean of those 60 one-minute values. Each minute carries equal weight regardless of how many quote updates fell inside it.

### Are depth metrics cumulative?

Yes. Each band counts everything resting inside it, so the 2 percent value includes the volume already counted at 1 percent. To get the volume resting in the band between 1 and 2 percent, subtract one metric from the other.

### What is the difference between the ask and bid variants?

They describe the two sides of the book. For depth, `ask` is resting sell-side volume above the midprice and `bid` is resting buy-side volume below it. For slippage, `ask` prices a market buy that consumes the ask side and `bid` prices a market sell that consumes the bid side.

### What does "native units" mean on a futures market?

The resting size is quoted in contracts and is scaled by the contract size before publication, so the value is expressed in units of the contract's underlying size asset rather than as a raw count of contracts. For spot markets, native units are simply units of the base asset.

## Related

* [Order Books](order-books.md): the raw order book snapshots these metrics are computed from, including the per-exchange depth available.
* [Market Quotes](quotes.md): the level-1 best bid and ask series that the bid-ask spread metrics sample.
* [Aggregated Quotes](aggregated-quotes.md): a consolidated cross-exchange best bid and ask for a pair or asset.
* [Market Candles](market-candles.md): trade-derived price and volume bars for the same markets.
* [Volume](volume/README.md): executed trading volume, the activity counterpart to resting liquidity.
* [Examining Orderbook Depth](../../tutorials-and-examples/tutorials/md_orderbook_depth.md): tutorial for querying and visualizing book depth.
* [Aggregating Orderbook Depth to Create Liquidity Metrics](../../tutorials-and-examples/tutorials/aggregating-orderbook-depth-to-create-liquidity-metrics.md): tutorial that builds depth metrics from raw books.
* [Analyzing BTC Liquidity](../../tutorials-and-examples/tutorials/analyzing-btc-liquidity.md): walkthrough of BTC liquidity analysis.
