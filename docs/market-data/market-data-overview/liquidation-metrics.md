# Liquidation Metrics

## Overview

Liquidation metrics report the volume of forced position closures on futures markets, aggregated across markets by asset, exchange, exchange-asset, and pair. A liquidation happens when an exchange forcibly closes a leveraged position whose margin is no longer sufficient, and each closure is executed as a forced order on the market. These metrics sum those forced orders over fixed time windows, split into buy and sell liquidations, and express the total in both the underlying base asset (native units) and U.S. dollars. Traders, risk teams, and researchers use them to gauge forced deleveraging, spot short and long squeezes, and measure market stress across venues.

They are called **reported** liquidations because the input is the liquidation events as reported by each exchange, which Coin Metrics normalizes, converts to a common unit, and sums.

## At a Glance

<table data-full-width="true"><thead><tr><th>Data type</th><th>Entities</th><th width="159">Frequency / cadence</th><th>Unit</th><th>Primary endpoints</th><th>Coverage</th></tr></thead><tbody><tr><td>Aggregated futures liquidation volume, split into buy and sell</td><td>Assets, exchanges, exchange-assets, and pairs</td><td>5m, 1h, and 1d at the asset, exchange, and exchange-asset levels. Pairs are served at 1h and 1d. Every value is a sum over the interval, not a point-in-time snapshot</td><td>Native units and U.S. dollars (USD)</td><td><code>/timeseries/asset-metrics</code><br><br><code>/timeseries/exchange-metrics</code><br><br><code>/timeseries/exchange-asset-metrics</code><br><br><code>/timeseries/pair-metrics</code></td><td><a href="https://coverage.coinmetrics.io/search-results?query=liquidations_reported_%2A">🔗</a></td></tr></tbody></table>

## Metrics

The family has four stems formed by two choices: buy versus sell liquidations, and native units versus U.S. dollars. Each stem is published at three frequencies (5m, 1h, 1d). Because each value is a sum over an interval, that interval is appended to the metric name as a suffix (`_5m`, `_1h`, `_1d`), following the Coin Metrics [metric naming convention](../../resources/faqs.md#what-metric-naming-conventions-does-coin-metrics-use). Point-in-time metrics such as open interest carry no interval suffix and instead take the frequency as a query parameter. A buy liquidation is a forced buy order that closes a short position, and a sell liquidation is a forced sell order that closes a long position. The native-unit variants are denominated in the underlying base asset, and the U.S. dollar variants convert that value using Coin Metrics reference rates. See [Methodology](#methodology) for how each value is built, and [Availability by entity](#availability-by-entity) for how frequency support differs at the pair level.

<table data-full-width="true"><thead><tr><th width="400">Metric</th><th>Description</th><th width="90">Frequency</th><th width="90">Coverage</th></tr></thead><tbody><tr><td><code>liquidations_reported_future_buy_units_5m</code></td><td>The sum of all buy liquidations from perpetual futures markets in native units of the underlying base asset.</td><td>5m</td><td><a href="https://coverage.coinmetrics.io/search-results?query=liquidations_reported_future_buy_units_5m">🔗</a></td></tr><tr><td><code>liquidations_reported_future_buy_units_1h</code></td><td>The sum of all buy liquidations from perpetual futures markets in native units of the underlying base asset.</td><td>1h</td><td><a href="https://coverage.coinmetrics.io/search-results?query=liquidations_reported_future_buy_units_1h">🔗</a></td></tr><tr><td><code>liquidations_reported_future_buy_units_1d</code></td><td>The sum of all buy liquidations from perpetual futures markets in native units of the underlying base asset.</td><td>1d</td><td><a href="https://coverage.coinmetrics.io/search-results?query=liquidations_reported_future_buy_units_1d">🔗</a></td></tr><tr><td><code>liquidations_reported_future_buy_usd_5m</code></td><td>The sum of all buy liquidations from perpetual futures markets in U.S. dollars.</td><td>5m</td><td><a href="https://coverage.coinmetrics.io/search-results?query=liquidations_reported_future_buy_usd_5m">🔗</a></td></tr><tr><td><code>liquidations_reported_future_buy_usd_1h</code></td><td>The sum of all buy liquidations from perpetual futures markets in U.S. dollars.</td><td>1h</td><td><a href="https://coverage.coinmetrics.io/search-results?query=liquidations_reported_future_buy_usd_1h">🔗</a></td></tr><tr><td><code>liquidations_reported_future_buy_usd_1d</code></td><td>The sum of all buy liquidations from perpetual futures markets in U.S. dollars.</td><td>1d</td><td><a href="https://coverage.coinmetrics.io/search-results?query=liquidations_reported_future_buy_usd_1d">🔗</a></td></tr><tr><td><code>liquidations_reported_future_sell_units_5m</code></td><td>The sum of all sell liquidations from perpetual futures markets in native units of the underlying base asset.</td><td>5m</td><td><a href="https://coverage.coinmetrics.io/search-results?query=liquidations_reported_future_sell_units_5m">🔗</a></td></tr><tr><td><code>liquidations_reported_future_sell_units_1h</code></td><td>The sum of all sell liquidations from perpetual futures markets in native units of the underlying base asset.</td><td>1h</td><td><a href="https://coverage.coinmetrics.io/search-results?query=liquidations_reported_future_sell_units_1h">🔗</a></td></tr><tr><td><code>liquidations_reported_future_sell_units_1d</code></td><td>The sum of all sell liquidations from perpetual futures markets in native units of the underlying base asset.</td><td>1d</td><td><a href="https://coverage.coinmetrics.io/search-results?query=liquidations_reported_future_sell_units_1d">🔗</a></td></tr><tr><td><code>liquidations_reported_future_sell_usd_5m</code></td><td>The sum of all sell liquidations from perpetual futures markets in U.S. dollars.</td><td>5m</td><td><a href="https://coverage.coinmetrics.io/search-results?query=liquidations_reported_future_sell_usd_5m">🔗</a></td></tr><tr><td><code>liquidations_reported_future_sell_usd_1h</code></td><td>The sum of all sell liquidations from perpetual futures markets in U.S. dollars.</td><td>1h</td><td><a href="https://coverage.coinmetrics.io/search-results?query=liquidations_reported_future_sell_usd_1h">🔗</a></td></tr><tr><td><code>liquidations_reported_future_sell_usd_1d</code></td><td>The sum of all sell liquidations from perpetual futures markets in U.S. dollars.</td><td>1d</td><td><a href="https://coverage.coinmetrics.io/search-results?query=liquidations_reported_future_sell_usd_1d">🔗</a></td></tr></tbody></table>

### Availability by entity

The set of metrics is the same across entities, but the served frequencies are not. The 5m series is available at the asset, exchange, and exchange-asset levels. The pair level is served at 1h and 1d only.

<table data-full-width="true"><thead><tr><th>Entity level</th><th>Endpoint</th><th width="150">Frequencies</th></tr></thead><tbody><tr><td>Asset, exchange, exchange-asset</td><td><code>/timeseries/asset-metrics</code>, <code>/timeseries/exchange-metrics</code>, <code>/timeseries/exchange-asset-metrics</code></td><td>5m, 1h, 1d</td></tr><tr><td>Pair</td><td><code>/timeseries/pair-metrics</code></td><td>1h, 1d</td></tr></tbody></table>

{% hint style="info" %}
**Conventions.** Metric values are returned as JSON strings to preserve precision. Timestamps are UTC ISO-8601 with nanosecond resolution, and `time` is the start of the interval the value covers. Each value is the sum of liquidations over that interval. Native-unit variants are denominated in the underlying base asset, and U.S. dollar variants in U.S. dollars.
{% endhint %}

## Methodology

Each metric is built in two stages. First, every individual liquidation event is converted from its reported amount into U.S. dollars and into native units of the base asset. Second, those per-event values are summed over the events that fall inside the interval, belong to the requested entity, and match the buy or sell side of the metric. The input events are the same per-market data documented in [Market Liquidations](market-liquidations.md).

### Collection

Liquidations are collected from the futures markets in the Coin Metrics coverage universe. Where an exchange publishes a real-time liquidation feed, events are collected from it as they occur. Where it does not, they are collected from the exchange's historical endpoint. Each event is normalized to a common shape (an amount, a price, a side, a timestamp, and the market it occurred on) and deduplicated so that a given exchange liquidation is counted once. Only events with a positive amount and a valid price enter the calculation.

### Buy and sell liquidations

Each liquidation carries the side of the forced order that the exchange reports. A **buy** liquidation is a forced buy order, which closes a short position. A **sell** liquidation is a forced sell order, which closes a long position. The `buy` metrics sum the buy-side events and the `sell` metrics sum the sell-side events, so a rising sell figure indicates longs being liquidated and a rising buy figure indicates shorts being liquidated.

### Notation

* $$i$$: index of an individual liquidation event.
* $$t_i$$: timestamp of event $$i$$.
* $$Q_i$$: reported amount of event $$i$$.
* $$S$$: contract size, the amount of the size asset represented by one contract.
* $$\mathrm{ReferenceRate}_{\mathrm{size}}(t_i)$$: the Coin Metrics reference rate (U.S. dollar price) of the contract's size asset at time $$t_i$$.
* $$\mathrm{ReferenceRate}_{\mathrm{base}}(t_i)$$: the reference rate of the contract's base asset at time $$t_i$$.

### Converting an event to U.S. dollars and native units

The U.S. dollar value of a liquidation event converts the reported amount to notional value using the size asset's reference rate, in the same way reported futures volume is converted:

$$
v_i^{\mathrm{usd}} = Q_i \times S \times \mathrm{ReferenceRate}_{\mathrm{size}}(t_i)
$$

The native-unit value expresses that same U.S. dollar value back in the underlying base asset, using the base asset's reference rate:

$$
v_i^{\mathrm{units}} = \frac{v_i^{\mathrm{usd}}}{\mathrm{ReferenceRate}_{\mathrm{base}}(t_i)}
$$

A few conversion details apply:

* **U.S. dollar reference rate.** A reference rate for a U.S. dollar asset is exactly 1.
* **Rate selection.** The reference rate is taken at the event's own timestamp, using the rate observation closest in time.
* **Spot fallback.** When a reference rate is not available for an asset, a spot price for that asset is used as a fallback.
* **BitMEX contracts.** BitMEX uses linear and inverse contract conventions, so its U.S. dollar conversion is derived from the contract's price and multiplier rather than a contract size and the size asset reference rate.

The reference rates used here are the Coin Metrics [reference rates](../reference-rates-overview/reference_rate.md).

### Aggregation, time windows, and entity scope

For a given entity and side, the metric is the sum of the per-event values over the events that fall in the interval and belong to that entity:

$$
\mathrm{Liquidation}_{e}^{\mathrm{side}}(T) = \sum_{i \,\in\, M(e),\; t_i \,\in\, T,\; \mathrm{side}} v_i
$$

where $$v_i$$ is $$v_i^{\mathrm{units}}$$ for the native-unit metrics and $$v_i^{\mathrm{usd}}$$ for the U.S. dollar metrics.

Intervals are aligned to UTC and are left-inclusive and right-exclusive, so an event is placed in the window that starts at or before its timestamp and ends strictly after it. The reported `time` is the start of the window. The 5m series is computed directly from events. The 1h and 1d series are sums of the completed sub-intervals below them (1h from the 5m windows, 1d from the 1h windows), so the three frequencies are consistent with one another.

The set of markets $$M(e)$$ depends on the entity type:

* For **assets**, the markets included are the futures markets whose underlying base asset is that asset.
* For **exchanges**, the markets included are all futures markets listed on the exchange.
* For **exchange-assets**, the markets included are the futures markets on the exchange whose base asset is that asset.
* For **pairs**, the markets included are the futures markets whose trading pair matches, across all exchanges.

Because the exchange level sums every market on a venue, its native-unit total combines the native units of many different base assets and is not a meaningful quantity on its own. Use the U.S. dollar variant to compare liquidations across assets or exchanges, and reserve the native-unit variant for a single asset, exchange-asset, or pair.

## Accessing the Data

The family is served over four entity metric endpoints. Pass the metric names in the `metrics` parameter and select the entity with the endpoint's entity parameter (`assets`, `exchanges`, `exchange_assets`, or `pairs`).

* [`/timeseries/asset-metrics`](https://docs.coinmetrics.io/api/v4/#operation/getTimeseriesAssetMetrics)
* [`/timeseries/exchange-metrics`](https://docs.coinmetrics.io/api/v4/#operation/getTimeseriesExchangeMetrics)
* [`/timeseries/exchange-asset-metrics`](https://docs.coinmetrics.io/api/v4/#operation/getTimeseriesExchangeAssetMetrics)
* [`/timeseries/pair-metrics`](https://docs.coinmetrics.io/api/v4/#operation/getTimeseriesPairMetrics)

The examples below query `liquidations_reported_future_buy_usd_1d` for the asset `btc`. Switch the endpoint and its entity parameter to query at the exchange, exchange-asset, or pair level (for example `client.get_exchange_metrics(exchanges=["binance"], ...)`). The 5m frequency is available on all endpoints except `/timeseries/pair-metrics`, which serves 1h and 1d.

{% tabs %}
{% tab title="Python Client" %}
```python
import os
from datetime import timedelta
from coinmetrics.api_client import CoinMetricsClient

client = CoinMetricsClient(os.environ["CM_API_KEY"])

# Reported buy liquidations for BTC over a time range, fetched in parallel as a DataFrame.
df = client.get_asset_metrics(
    assets=["btc"],
    metrics=["liquidations_reported_future_buy_usd_1d"],
    frequency="1d",
    start_time="2025-01-01",
    end_time="2025-02-01",
    format="json_stream",
).parallel(time_increment=timedelta(days=30)).to_dataframe()

print(df)

# For just the latest value, use limit_per_asset instead (uses format="json"):
# client.get_asset_metrics(assets=["btc"], metrics=["liquidations_reported_future_buy_usd_1d"], frequency="1d", limit_per_asset=1).to_dataframe()
```
{% endtab %}

{% tab title="Shell" %}
```shell
curl --compressed "https://api.coinmetrics.io/v4/timeseries/asset-metrics?assets=btc&metrics=liquidations_reported_future_buy_usd_1d&frequency=1d&limit_per_asset=3&api_key=$CM_API_KEY"
```
{% endtab %}

{% tab title="Python" %}
```python
import os, requests

response = requests.get(
    "https://api.coinmetrics.io/v4/timeseries/asset-metrics",
    params={"assets": "btc", "metrics": "liquidations_reported_future_buy_usd_1d",
            "frequency": "1d", "limit_per_asset": 3,
            "api_key": os.environ["CM_API_KEY"]},
).json()
print(response)
```
{% endtab %}
{% endtabs %}

Full parameter reference: see the API Reference for [`/timeseries/asset-metrics`](https://docs.coinmetrics.io/api/v4/#operation/getTimeseriesAssetMetrics), [`/timeseries/exchange-metrics`](https://docs.coinmetrics.io/api/v4/#operation/getTimeseriesExchangeMetrics), [`/timeseries/exchange-asset-metrics`](https://docs.coinmetrics.io/api/v4/#operation/getTimeseriesExchangeAssetMetrics), and [`/timeseries/pair-metrics`](https://docs.coinmetrics.io/api/v4/#operation/getTimeseriesPairMetrics).

## Examples

The examples below are live daily pulls of `liquidations_reported_future_buy_usd_1d` for one representative entity of each type. They are returned as JSON strings and change on each pull.

### Example: asset metrics

Reported buy liquidations for the asset `btc` ([browser](https://api.coinmetrics.io/v4/timeseries/asset-metrics?assets=btc\&metrics=liquidations_reported_future_buy_usd_1d\&limit_per_asset=3\&frequency=1d\&api_key=YOUR_API_KEY)):

```json
[
  {
    "asset": "btc",
    "time": "2026-07-13T00:00:00.000000000Z",
    "liquidations_reported_future_buy_usd_1d": "11495500.096111"
  },
  {
    "asset": "btc",
    "time": "2026-07-14T00:00:00.000000000Z",
    "liquidations_reported_future_buy_usd_1d": "73193982.8090377"
  },
  {
    "asset": "btc",
    "time": "2026-07-15T00:00:00.000000000Z",
    "liquidations_reported_future_buy_usd_1d": "30645001.484956"
  }
]
```

### Example: exchange metrics

Reported buy liquidations for the exchange `binance`, summed across every futures market on the venue ([browser](https://api.coinmetrics.io/v4/timeseries/exchange-metrics?exchanges=binance\&metrics=liquidations_reported_future_buy_usd_1d\&limit_per_exchange=3\&frequency=1d\&api_key=YOUR_API_KEY)):

```json
[
  {
    "exchange": "binance",
    "time": "2026-07-13T00:00:00.000000000Z",
    "liquidations_reported_future_buy_usd_1d": "27785755.2527155"
  },
  {
    "exchange": "binance",
    "time": "2026-07-14T00:00:00.000000000Z",
    "liquidations_reported_future_buy_usd_1d": "122942934.422697"
  },
  {
    "exchange": "binance",
    "time": "2026-07-15T00:00:00.000000000Z",
    "liquidations_reported_future_buy_usd_1d": "94495532.6159633"
  }
]
```

### Example: exchange-asset metrics

Reported buy liquidations for the exchange-asset `binance-btc` ([browser](https://api.coinmetrics.io/v4/timeseries/exchange-asset-metrics?exchange_assets=binance-btc\&metrics=liquidations_reported_future_buy_usd_1d\&limit_per_exchange_asset=3\&frequency=1d\&api_key=YOUR_API_KEY)):

```json
[
  {
    "exchange_asset": "binance-btc",
    "time": "2026-07-13T00:00:00.000000000Z",
    "liquidations_reported_future_buy_usd_1d": "7204170.67975"
  },
  {
    "exchange_asset": "binance-btc",
    "time": "2026-07-14T00:00:00.000000000Z",
    "liquidations_reported_future_buy_usd_1d": "40656928.827229"
  },
  {
    "exchange_asset": "binance-btc",
    "time": "2026-07-15T00:00:00.000000000Z",
    "liquidations_reported_future_buy_usd_1d": "19732975.73966"
  }
]
```

### Example: pair metrics

Reported buy liquidations for the pair `btc-usd` ([browser](https://api.coinmetrics.io/v4/timeseries/pair-metrics?pairs=btc-usd\&metrics=liquidations_reported_future_buy_usd_1d\&limit_per_pair=3\&frequency=1d\&api_key=YOUR_API_KEY)):

```json
[
  {
    "pair": "btc-usd",
    "time": "2026-07-13T00:00:00.000000000Z",
    "liquidations_reported_future_buy_usd_1d": "80500.624999"
  },
  {
    "pair": "btc-usd",
    "time": "2026-07-14T00:00:00.000000000Z",
    "liquidations_reported_future_buy_usd_1d": "4855733.534878"
  },
  {
    "pair": "btc-usd",
    "time": "2026-07-15T00:00:00.000000000Z",
    "liquidations_reported_future_buy_usd_1d": "559783.759698"
  }
]
```

## Coverage

{% embed url="https://coverage.coinmetrics.io/search-results?query=liquidations_reported_%2A" %}

## Usage

* **Forced deleveraging.** Read how much leveraged positioning was force-closed on an asset, an exchange, an exchange-asset, or a pair over each interval, rather than tracking individual events.
* **Squeeze direction.** Compare the `buy` and `sell` variants to see whether shorts or longs are being liquidated. A spike in sell liquidations points to longs being flushed out, and a spike in buy liquidations to shorts being flushed out.
* **Cross-venue comparison.** Use the U.S. dollar variants to compare liquidation activity across assets and exchanges on a common unit.
* **Market-stress context.** Combine with the raw per-event [Market Liquidations](market-liquidations.md), [Open Interest Metrics](open-interest-metrics.md), and [Funding Rates](market-funding-rates.md) to study leverage build-up and unwind.

## Limitations

* **Reported means exchange-reported.** These metrics reflect only the liquidation events that exchanges publish. Some exchanges throttle, snapshot, or delay their liquidation feeds, so the reported totals can understate the true amount of liquidation activity, and the degree of understatement varies by exchange.
* **Native-unit totals are not comparable across assets.** The exchange-level native-unit variant sums the native units of many different base assets, so it is a mixed-unit figure. Use the U.S. dollar variant to compare across assets or exchanges, and the native-unit variant only within a single asset, exchange-asset, or pair.
* **Futures only.** These are liquidations on futures markets. There is no spot equivalent.
* **Missing reference rate.** A liquidation event is dropped from the U.S. dollar total when no reference rate or spot fallback is available for its size asset, and contributes zero native units when the base asset rate is unavailable.
* **Coverage follows the collected market universe.** Each metric aggregates the futures markets Coin Metrics collects for that entity. Markets outside the coverage universe are not included. See the [coverage page](https://coverage.coinmetrics.io/search-results?query=liquidations_reported_%2A) for what is available.

## FAQ

### Are these spot or futures liquidations?

Futures. Liquidations occur when a leveraged futures position is force-closed, so there is no spot equivalent. The metric name carries the `future` token for this reason.

### What is the difference between a buy and a sell liquidation?

A buy liquidation is a forced buy order that closes a short position, and a sell liquidation is a forced sell order that closes a long position. A rising `sell` figure therefore indicates longs being liquidated, and a rising `buy` figure indicates shorts being liquidated.

### Should I use native units or U.S. dollars to compare across assets or exchanges?

Use U.S. dollars. The native-unit variants are denominated in each market's underlying base asset, so the exchange-level native-unit total mixes different base assets and is not directly comparable. The U.S. dollar variants share a common unit across every asset and exchange.

### How do these relate to the raw liquidation data?

These metrics are the aggregated, converted form of the per-event liquidation data documented in [Market Liquidations](market-liquidations.md). The raw data gives every individual forced order, and these metrics sum those events into fixed time windows by entity, side, and unit.

## Related

* [Market Liquidations](market-liquidations.md): the raw, per-event liquidation data that these metrics aggregate.
* [Obtaining Futures Market Liquidations](../../tutorials-and-examples/tutorials/obtaining-futures-market-liquidations.md): a worked tutorial for pulling liquidation data.
* [Open Interest Metrics](open-interest-metrics.md): reported open interest aggregated over the same entities.
* [Funding Rates](market-funding-rates.md): perpetual-futures funding rates on the same markets.
* [Reference Rate](../reference-rates-overview/reference_rate.md): the U.S. dollar reference rates used in the conversion.
