# Open Interest Metrics

## Overview

Open interest metrics express the open interest of derivatives markets in U.S. dollars, aggregated across markets by asset, exchange, exchange-asset, and pair. Where the raw [Market Open Interest](market-open-interest.md) data reports the number of outstanding contracts for a single market, these metrics convert that open interest into a common U.S. dollar unit and sum it, so a single value answers how much capital is committed to futures or options on an asset, on an exchange, on an exchange-asset, or on a pair. Traders, risk teams, and researchers use them to size positioning and leverage across venues, compare futures against options, and track how dollar open interest builds and unwinds over time.

They are called **reported** open interest because the input is the open interest as reported by each exchange, which Coin Metrics converts to U.S. dollars and sums.

## At a Glance

<table data-full-width="true"><thead><tr><th>Data type</th><th>Entities</th><th width="159">Frequency / cadence</th><th>Unit</th><th>Primary endpoints</th><th>Coverage</th></tr></thead><tbody><tr><td>Aggregated open interest converted to U.S. dollars (derivatives)</td><td>Assets, exchanges, exchange-assets, and pairs (full family). Markets (three total metrics only)</td><td>1h and 1d at the aggregate levels. The per-market subset adds a 1m frequency. Every value is a point-in-time snapshot, not an average over the interval</td><td>U.S. dollars (USD)</td><td><code>/timeseries/asset-metrics</code><br><br><code>/timeseries/exchange-metrics</code><br><br><code>/timeseries/exchange-asset-metrics</code><br><br><code>/timeseries/pair-metrics</code><br><br><code>/timeseries/market-metrics</code> (three metrics only)</td><td><a href="https://coverage.coinmetrics.io/search-results?query=open_interest_reported_%2A">🔗</a></td></tr></tbody></table>

## Metrics

The family splits into futures metrics and options metrics. Futures open interest is expressed as notional value. Options open interest is expressed both as market value (the mark-priced value of the contracts) and as notional value. Within each group, variants narrow the market set by settlement type, margin asset, or option type.

Coverage is not uniform across entities. The full family below is calculated at the aggregate levels (assets, exchanges, exchange-assets, and pairs). A reduced set of only three metrics is calculated per individual market. See [Availability by entity](#availability-by-entity) at the end of this section for the exact split.

### Futures open interest

<table data-full-width="true"><thead><tr><th width="400">Metric</th><th>Description</th><th width="90">Frequency</th><th width="90">Coverage</th></tr></thead><tbody><tr><td><code>open_interest_reported_future_usd</code></td><td>The sum of all reported open interest from futures markets in units of U.S. dollars.</td><td>1h, 1d</td><td><a href="https://coverage.coinmetrics.io/search-results?query=open_interest_reported_future_usd">🔗</a></td></tr><tr><td><code>open_interest_reported_future_perpetual_usd</code></td><td>The sum of all reported open interest from perpetual futures markets in units of U.S. dollars.</td><td>1h, 1d</td><td><a href="https://coverage.coinmetrics.io/search-results?query=open_interest_reported_future_perpetual_usd">🔗</a></td></tr><tr><td><code>open_interest_reported_future_nonperpetual_usd</code></td><td>The sum of all reported open interest from non-perpetual futures markets in units of U.S. dollars.</td><td>1h, 1d</td><td><a href="https://coverage.coinmetrics.io/search-results?query=open_interest_reported_future_nonperpetual_usd">🔗</a></td></tr><tr><td><code>open_interest_reported_future_tether_margined_usd</code></td><td>The sum of all reported open interest from futures markets where the margin asset is Tether, in units of U.S. dollars.</td><td>1h, 1d</td><td><a href="https://coverage.coinmetrics.io/search-results?query=open_interest_reported_future_tether_margined_usd">🔗</a></td></tr><tr><td><code>open_interest_reported_future_coin_margined_usd</code></td><td>The sum of all reported open interest from futures markets where the margin asset is equivalent to the underlying base asset, in units of U.S. dollars.</td><td>1h, 1d</td><td><a href="https://coverage.coinmetrics.io/search-results?query=open_interest_reported_future_coin_margined_usd">🔗</a></td></tr></tbody></table>

### Options open interest

<table data-full-width="true"><thead><tr><th width="400">Metric</th><th>Description</th><th width="90">Frequency</th><th width="90">Coverage</th></tr></thead><tbody><tr><td><code>open_interest_reported_option_market_value_usd</code></td><td>The sum of all reported market value open interest from option markets in units of U.S. dollars.</td><td>1h, 1d</td><td><a href="https://coverage.coinmetrics.io/search-results?query=open_interest_reported_option_market_value_usd">🔗</a></td></tr><tr><td><code>open_interest_reported_option_notional_usd</code></td><td>The sum of all reported notional open interest from option markets in units of U.S. dollars.</td><td>1h, 1d</td><td><a href="https://coverage.coinmetrics.io/search-results?query=open_interest_reported_option_notional_usd">🔗</a></td></tr><tr><td><code>open_interest_reported_option_call_market_value_usd</code></td><td>The sum of all reported market value open interest from call option markets in units of U.S. dollars.</td><td>1h, 1d</td><td><a href="https://coverage.coinmetrics.io/search-results?query=open_interest_reported_option_call_market_value_usd">🔗</a></td></tr><tr><td><code>open_interest_reported_option_call_notional_usd</code></td><td>The sum of all reported notional open interest from call option markets in units of U.S. dollars.</td><td>1h, 1d</td><td><a href="https://coverage.coinmetrics.io/search-results?query=open_interest_reported_option_call_notional_usd">🔗</a></td></tr><tr><td><code>open_interest_reported_option_put_market_value_usd</code></td><td>The sum of all reported market value open interest from put option markets in units of U.S. dollars.</td><td>1h, 1d</td><td><a href="https://coverage.coinmetrics.io/search-results?query=open_interest_reported_option_put_market_value_usd">🔗</a></td></tr><tr><td><code>open_interest_reported_option_put_notional_usd</code></td><td>The sum of all reported notional open interest from put option markets in units of U.S. dollars.</td><td>1h, 1d</td><td><a href="https://coverage.coinmetrics.io/search-results?query=open_interest_reported_option_put_notional_usd">🔗</a></td></tr><tr><td><code>open_interest_reported_option_tether_margined_market_value_usd</code></td><td>The sum of all reported market value open interest from option markets where the margin asset is Tether, in units of U.S. dollars.</td><td>1h, 1d</td><td><a href="https://coverage.coinmetrics.io/search-results?query=open_interest_reported_option_tether_margined_market_value_usd">🔗</a></td></tr><tr><td><code>open_interest_reported_option_tether_margined_notional_usd</code></td><td>The sum of all reported notional open interest from option markets where the margin asset is Tether, in units of U.S. dollars.</td><td>1h, 1d</td><td><a href="https://coverage.coinmetrics.io/search-results?query=open_interest_reported_option_tether_margined_notional_usd">🔗</a></td></tr><tr><td><code>open_interest_reported_option_usdc_margined_market_value_usd</code></td><td>The sum of all reported market value open interest from option markets where the margin asset is USDC, in units of U.S. dollars.</td><td>1h, 1d</td><td><a href="https://coverage.coinmetrics.io/search-results?query=open_interest_reported_option_usdc_margined_market_value_usd">🔗</a></td></tr><tr><td><code>open_interest_reported_option_usdc_margined_notional_usd</code></td><td>The sum of all reported notional open interest from option markets where the margin asset is USDC, in units of U.S. dollars.</td><td>1h, 1d</td><td><a href="https://coverage.coinmetrics.io/search-results?query=open_interest_reported_option_usdc_margined_notional_usd">🔗</a></td></tr><tr><td><code>open_interest_reported_option_coin_margined_market_value_usd</code></td><td>The sum of all reported market value open interest from option markets where the margin asset is equivalent to the underlying base asset, in units of U.S. dollars.</td><td>1h, 1d</td><td><a href="https://coverage.coinmetrics.io/search-results?query=open_interest_reported_option_coin_margined_market_value_usd">🔗</a></td></tr><tr><td><code>open_interest_reported_option_coin_margined_notional_usd</code></td><td>The sum of all reported notional open interest from option markets where the margin asset is equivalent to the underlying base asset, in units of U.S. dollars.</td><td>1h, 1d</td><td><a href="https://coverage.coinmetrics.io/search-results?query=open_interest_reported_option_coin_margined_notional_usd">🔗</a></td></tr></tbody></table>

### Availability by entity

The metric family is not offered identically across entities. The complete set of 17 metrics is calculated for the four aggregate entities. Only the three top-level totals are calculated per individual market, and these are served on `/timeseries/market-metrics` as the per-market U.S. dollar figure that replaces the deprecated `value_usd` field on the raw [Market Open Interest](market-open-interest.md) data. The settlement-type (`perpetual`, `nonperpetual`), margin-asset (`tether_margined`, `usdc_margined`, `coin_margined`), and option-type (`call`, `put`) variants are not calculated per market.

<table data-full-width="true"><thead><tr><th>Entity level</th><th>Endpoint</th><th>Metrics available</th><th width="140">Frequency</th></tr></thead><tbody><tr><td>Asset, exchange, exchange-asset, pair</td><td><code>/timeseries/asset-metrics</code>, <code>/timeseries/exchange-metrics</code>, <code>/timeseries/exchange-asset-metrics</code>, <code>/timeseries/pair-metrics</code></td><td>The full family (all 17 metrics above)</td><td>1h, 1d</td></tr><tr><td>Market (per individual market)</td><td><code>/timeseries/market-metrics</code></td><td>Three metrics only: <code>open_interest_reported_future_usd</code>, <code>open_interest_reported_option_notional_usd</code>, <code>open_interest_reported_option_market_value_usd</code></td><td>1m, 1h, 1d</td></tr></tbody></table>

{% hint style="info" %}
**Conventions.** Metric values are returned as JSON strings to preserve precision. Timestamps are UTC ISO-8601 with nanosecond resolution, and `time` is the observation time the value corresponds to. All metrics on this page are denominated in U.S. dollars.
{% endhint %}

## Methodology

Each metric is built in two stages. First, the reported open interest of every individual derivatives market is converted from contract units into U.S. dollars. Second, those per-market U.S. dollar values are summed across the set of markets that belong to the requested entity and match the metric's market filter. The input open interest is the same per-market data documented in [Market Open Interest](market-open-interest.md). The U.S. dollar conversion here is computed from current contract specifications and reference rates, independently of the deprecated `value_usd` field on the raw data, which it does not use.

### Notation

* $$Q(T)$$: reported open interest in contract units at time $$T$$.
* $$S$$: contract size, the amount of the underlying (size) asset represented by one contract.
* $$\mathrm{MarkPrice}(T)$$: the option mark price at time $$T$$.
* $$\mathrm{ReferenceRate}_{\mathrm{size}}(T)$$: the Coin Metrics reference rate (U.S. dollar price) of the contract's size asset at time $$T$$.
* $$\mathrm{ReferenceRate}_{\mathrm{margin}}(T)$$: the reference rate of the contract's margin asset at time $$T$$.

### Converting a market to U.S. dollars

Reported futures open interest (`open_interest_reported_future_*`) converts the contract count to notional value using the size asset's reference rate:

$$
\mathrm{OpenInterestReportedFuture}(T) = Q(T) \times S \times \mathrm{ReferenceRate}_{\mathrm{size}}(T)
$$

Reported option market value (`open_interest_reported_option_*_market_value_usd`) prices the contracts at their mark price and converts using the margin asset's reference rate:

$$
\mathrm{OpenInterestReportedOptionMarketValue}(T) = Q(T) \times S \times \mathrm{MarkPrice}(T) \times \mathrm{ReferenceRate}_{\mathrm{margin}}(T)
$$

Reported option notional (`open_interest_reported_option_*_notional_usd`) converts the contract count to notional value using the size asset's reference rate:

$$
\mathrm{OpenInterestReportedOptionNotional}(T) = Q(T) \times S \times \mathrm{ReferenceRate}_{\mathrm{size}}(T)
$$

A few additional details apply to the conversion:

* **Margin asset for market value.** The option market value conversion uses the margin asset's reference rate, which is exactly 1 when the margin asset is a U.S. dollar.
* **Spot fallback.** When a reference rate is not available for an asset, a spot price for that asset on the same exchange is used as a fallback.
* **BitMEX futures.** BitMEX futures use linear and inverse contract conventions, so their U.S. dollar conversion is derived from the contract's mark price and multiplier rather than a contract size and the size asset reference rate.

The mark prices, reference rates, and contract specifications (contract size, size asset, and margin asset) are the same inputs published elsewhere in the product. Contract specifications come from [Market Reference Data](market-reference-data.md), and the U.S. dollar prices are Coin Metrics [reference rates](../reference-rates-overview/reference_rate.md).

### Aggregation and entity scope

For a given entity, each per-market U.S. dollar value is summed over the markets that belong to that entity and match the metric's filter:

$$
\mathrm{Metric}_{e}(T) = \sum_{m \in M(e)} \mathrm{OpenInterestReported}^{(m)}(T)
$$

The set of markets $$M(e)$$ depends on the entity type:

* For **assets**, the markets included are any market where the asset is either the underlying base asset or the underlying quote asset.
* For **exchanges**, the markets included are any market listed on the exchange.
* For **exchange-assets**, the markets included are any market listed on the exchange where the asset is either the underlying base or quote asset.
* For **pairs**, the markets included are any market across all exchanges that contains the underlying pair.

That market set is then narrowed by the metric's filter: settlement type for `perpetual` and `nonperpetual`, margin asset for the `tether_margined`, `usdc_margined`, and `coin_margined` variants, and option type for `call` and `put`. The unqualified `open_interest_reported_future_usd`, `open_interest_reported_option_market_value_usd`, and `open_interest_reported_option_notional_usd` metrics apply no such filter and cover all futures or all option markets in the entity.

Because a market is attributed to both its base and its quote asset, an asset's metric reflects every market where the asset appears on either side. For the same reason, the per-asset metrics are not additive into a single universe total: summing them would count each market more than once.

At the **market** level there is no aggregation across markets. Each market's own U.S. dollar value is served directly, and only for the three top-level totals (`open_interest_reported_future_usd`, `open_interest_reported_option_notional_usd`, and `open_interest_reported_option_market_value_usd`). This per-market series is the U.S. dollar replacement for the deprecated `value_usd` field on the raw open interest data, so it deliberately omits the settlement-type, margin-asset, and option-type breakdowns that the aggregate entities carry. See [Availability by entity](#availability-by-entity).

### Frequency

Every value is a point-in-time snapshot rather than a time-weighted average. At each frequency, the metric reflects the reported open interest at a point in time, converted to U.S. dollars and summed across the entity's markets. It is never an average over the interval. This applies equally to the one-minute, hourly, and daily series, which are the same snapshot observed at different cadences. The one-minute frequency, available for the per-market series on `/timeseries/market-metrics`, is closest to the cadence of the underlying open interest snapshots.

Open interest counts are summed as reported by each exchange, with no cross-exchange normalization. Exchanges differ in whether they report one-sided or two-sided open interest (notably CME reports two-sided), and no adjustment is applied for this.

## Accessing the Data

The full family is served over the four aggregate entity metric endpoints. Pass the metric names in the `metrics` parameter and select the entity with the endpoint's entity parameter (`assets`, `exchanges`, `exchange_assets`, or `pairs`).

* [`/timeseries/asset-metrics`](https://docs.coinmetrics.io/api/v4/#operation/getTimeseriesAssetMetrics)
* [`/timeseries/exchange-metrics`](https://docs.coinmetrics.io/api/v4/#operation/getTimeseriesExchangeMetrics)
* [`/timeseries/exchange-asset-metrics`](https://docs.coinmetrics.io/api/v4/#operation/getTimeseriesExchangeAssetMetrics)
* [`/timeseries/pair-metrics`](https://docs.coinmetrics.io/api/v4/#operation/getTimeseriesPairMetrics)

The three top-level totals are additionally served per individual market over [`/timeseries/market-metrics`](https://docs.coinmetrics.io/api/v4/#operation/getTimeseriesMarketMetrics) (entity parameter `markets`), for example `client.get_market_metrics(markets=["binance-BTCUSDT-future"], metrics=["open_interest_reported_future_usd"], frequency="1m")`. Only `open_interest_reported_future_usd`, `open_interest_reported_option_notional_usd`, and `open_interest_reported_option_market_value_usd` are available there (see [Availability by entity](#availability-by-entity)).

The examples below query `open_interest_reported_future_usd` for the asset `btc`. Switch the endpoint and its entity parameter to query at the exchange, exchange-asset, or pair level (for example `client.get_exchange_metrics(exchanges=["binance"], ...)`).

{% tabs %}
{% tab title="Python Client" %}
```python
import os
from datetime import timedelta
from coinmetrics.api_client import CoinMetricsClient

client = CoinMetricsClient(os.environ["CM_API_KEY"])

# Reported futures open interest for BTC over a time range, fetched in parallel as a DataFrame.
df = client.get_asset_metrics(
    assets=["btc"],
    metrics=["open_interest_reported_future_usd"],
    frequency="1d",
    start_time="2025-01-01",
    end_time="2025-02-01",
    format="json_stream",
).parallel(time_increment=timedelta(days=30)).to_dataframe()

print(df)

# For just the latest value, use limit_per_asset instead (uses format="json"):
# client.get_asset_metrics(assets=["btc"], metrics=["open_interest_reported_future_usd"], frequency="1d", limit_per_asset=1).to_dataframe()
```
{% endtab %}

{% tab title="Shell" %}
```shell
curl --compressed "https://api.coinmetrics.io/v4/timeseries/asset-metrics?assets=btc&metrics=open_interest_reported_future_usd&frequency=1d&limit_per_asset=3&api_key=$CM_API_KEY"
```
{% endtab %}

{% tab title="Python" %}
```python
import os, requests

response = requests.get(
    "https://api.coinmetrics.io/v4/timeseries/asset-metrics",
    params={"assets": "btc", "metrics": "open_interest_reported_future_usd",
            "frequency": "1d", "limit_per_asset": 3,
            "api_key": os.environ["CM_API_KEY"]},
).json()
print(response)
```
{% endtab %}
{% endtabs %}

Full parameter reference: see the API Reference for [`/timeseries/asset-metrics`](https://docs.coinmetrics.io/api/v4/#operation/getTimeseriesAssetMetrics), [`/timeseries/exchange-metrics`](https://docs.coinmetrics.io/api/v4/#operation/getTimeseriesExchangeMetrics), [`/timeseries/exchange-asset-metrics`](https://docs.coinmetrics.io/api/v4/#operation/getTimeseriesExchangeAssetMetrics), [`/timeseries/pair-metrics`](https://docs.coinmetrics.io/api/v4/#operation/getTimeseriesPairMetrics), and [`/timeseries/market-metrics`](https://docs.coinmetrics.io/api/v4/#operation/getTimeseriesMarketMetrics).

## Examples

The examples below are live daily pulls, returned as JSON strings, and change on each pull. The first show `open_interest_reported_future_usd` for one representative entity of each type. The final example shows the two options valuations (notional and market value) for a representative options exchange.

### Example: asset metrics

Reported futures open interest for the asset `btc` ([browser](https://api.coinmetrics.io/v4/timeseries/asset-metrics?assets=btc\&metrics=open_interest_reported_future_usd\&limit_per_asset=3\&frequency=1d\&api_key=YOUR_API_KEY)):

```json
[
  {
    "asset": "btc",
    "time": "2026-07-13T00:00:00.000000000Z",
    "open_interest_reported_future_usd": "36058939262.6021"
  },
  {
    "asset": "btc",
    "time": "2026-07-14T00:00:00.000000000Z",
    "open_interest_reported_future_usd": "36302345626.3873"
  },
  {
    "asset": "btc",
    "time": "2026-07-15T00:00:00.000000000Z",
    "open_interest_reported_future_usd": "37298513043.6238"
  }
]
```

### Example: exchange metrics

Reported futures open interest for the exchange `binance` ([browser](https://api.coinmetrics.io/v4/timeseries/exchange-metrics?exchanges=binance\&metrics=open_interest_reported_future_usd\&limit_per_exchange=3\&frequency=1d\&api_key=YOUR_API_KEY)):

```json
[
  {
    "exchange": "binance",
    "time": "2026-07-13T00:00:00.000000000Z",
    "open_interest_reported_future_usd": "21238135373.3271"
  },
  {
    "exchange": "binance",
    "time": "2026-07-14T00:00:00.000000000Z",
    "open_interest_reported_future_usd": "21142937242.5896"
  },
  {
    "exchange": "binance",
    "time": "2026-07-15T00:00:00.000000000Z",
    "open_interest_reported_future_usd": "22412832456.7068"
  }
]
```

### Example: exchange-asset metrics

Reported futures open interest for the exchange-asset `binance-btc` ([browser](https://api.coinmetrics.io/v4/timeseries/exchange-asset-metrics?exchange_assets=binance-btc\&metrics=open_interest_reported_future_usd\&limit_per_exchange_asset=3\&frequency=1d\&api_key=YOUR_API_KEY)):

```json
[
  {
    "exchange_asset": "binance-btc",
    "time": "2026-07-13T00:00:00.000000000Z",
    "open_interest_reported_future_usd": "8762217154.32021"
  },
  {
    "exchange_asset": "binance-btc",
    "time": "2026-07-14T00:00:00.000000000Z",
    "open_interest_reported_future_usd": "9026095467.37551"
  },
  {
    "exchange_asset": "binance-btc",
    "time": "2026-07-15T00:00:00.000000000Z",
    "open_interest_reported_future_usd": "9232417957.34598"
  }
]
```

### Example: pair metrics

Reported futures open interest for the pair `btc-usd` ([browser](https://api.coinmetrics.io/v4/timeseries/pair-metrics?pairs=btc-usd\&metrics=open_interest_reported_future_usd\&limit_per_pair=3\&frequency=1d\&api_key=YOUR_API_KEY)):

```json
[
  {
    "pair": "btc-usd",
    "time": "2026-07-13T00:00:00.000000000Z",
    "open_interest_reported_future_usd": "11259759707.1446"
  },
  {
    "pair": "btc-usd",
    "time": "2026-07-14T00:00:00.000000000Z",
    "open_interest_reported_future_usd": "11194486871.9479"
  },
  {
    "pair": "btc-usd",
    "time": "2026-07-15T00:00:00.000000000Z",
    "open_interest_reported_future_usd": "11469183896.93"
  }
]
```

### Example: market metrics

Reported futures open interest for the individual market `binance-BTCUSDT-future`, one of the three metrics served per market on `/timeseries/market-metrics` ([browser](https://api.coinmetrics.io/v4/timeseries/market-metrics?markets=binance-BTCUSDT-future\&metrics=open_interest_reported_future_usd\&limit_per_market=3\&frequency=1d\&api_key=YOUR_API_KEY)):

```json
[
  {
    "market": "binance-BTCUSDT-future",
    "time": "2026-07-13T00:00:00.000000000Z",
    "open_interest_reported_future_usd": "6418505979.65584"
  },
  {
    "market": "binance-BTCUSDT-future",
    "time": "2026-07-14T00:00:00.000000000Z",
    "open_interest_reported_future_usd": "6682897006.43904"
  },
  {
    "market": "binance-BTCUSDT-future",
    "time": "2026-07-15T00:00:00.000000000Z",
    "open_interest_reported_future_usd": "6850081652.23152"
  }
]
```

### Example: options metrics

Reported options open interest for the exchange `deribit`, showing both valuations. Notional is the underlying exposure and market value is the mark-priced value of the contracts, so notional is much larger ([browser](https://api.coinmetrics.io/v4/timeseries/exchange-metrics?exchanges=deribit\&metrics=open_interest_reported_option_notional_usd,open_interest_reported_option_market_value_usd\&limit_per_exchange=3\&frequency=1d\&api_key=YOUR_API_KEY)):

```json
[
  {
    "exchange": "deribit",
    "time": "2026-07-13T00:00:00.000000000Z",
    "open_interest_reported_option_market_value_usd": "921952997.235543",
    "open_interest_reported_option_notional_usd": "25884500577.9074"
  },
  {
    "exchange": "deribit",
    "time": "2026-07-14T00:00:00.000000000Z",
    "open_interest_reported_option_market_value_usd": "924680368.54787",
    "open_interest_reported_option_notional_usd": "25506484486.4015"
  },
  {
    "exchange": "deribit",
    "time": "2026-07-15T00:00:00.000000000Z",
    "open_interest_reported_option_market_value_usd": "935148767.587233",
    "open_interest_reported_option_notional_usd": "27271959639.5126"
  }
]
```

## Coverage

{% embed url="https://coverage.coinmetrics.io/search-results?query=open_interest_reported_%2A" %}

## Usage

* **Dollar positioning.** Read committed capital in a common U.S. dollar unit for an asset, an exchange, an exchange-asset, or a pair, rather than in venue-specific contract counts.
* **Futures versus options.** Compare `open_interest_reported_future_usd` against `open_interest_reported_option_notional_usd` and `open_interest_reported_option_market_value_usd` to see how positioning is split between the two instrument types.
* **Perpetual versus dated.** Use `open_interest_reported_future_perpetual_usd` and `open_interest_reported_future_nonperpetual_usd` to separate perpetual swap positioning from expiring futures.
* **Collateral mix.** Use the `tether_margined`, `usdc_margined`, and `coin_margined` variants to study how open interest is collateralized across stablecoin-margined and coin-margined markets.
* **Derivatives context.** Combine with the raw per-market [Market Open Interest](market-open-interest.md), [Funding Rates](funding-rates/funding-rates.md), and [Market Liquidations](market-liquidations.md) to study leverage build-up and unwind.

## Limitations

* **Coverage follows the collected market universe.** Each metric aggregates the derivatives markets Coin Metrics collects for that entity. Markets outside the coverage universe are not included. See the [coverage page](https://coverage.coinmetrics.io/search-results?query=open_interest_reported_%2A) for what is available.
* **No cross-exchange normalization.** Counts are summed as reported by each exchange. Exchanges differ in one-sided versus two-sided reporting (notably CME reports two-sided), and no adjustment is applied, so treat cross-exchange sums with that in mind.
* **Per-asset metrics are not additive.** Each market is attributed to both its base and its quote asset, so summing per-asset values across assets double counts open interest.
* **Per-market coverage is limited.** Only the three top-level totals (`open_interest_reported_future_usd`, `open_interest_reported_option_notional_usd`, and `open_interest_reported_option_market_value_usd`) are available per individual market, on `/timeseries/market-metrics`. The settlement-type, margin-asset, and option-type breakdowns are available only at the asset, exchange, exchange-asset, and pair levels. See [Availability by entity](#availability-by-entity).
* **Frequency semantics.** Every value is a point-in-time snapshot, not an average over the interval. This applies to the one-minute, hourly, and daily series alike. There is no volume-style time-weighted figure at any frequency.
* **U.S. dollar values differ from the raw `value_usd` field.** These metrics are the correct source for open interest in U.S. dollars. The raw [Market Open Interest](market-open-interest.md) `value_usd` field is deprecated and should not be used.

## FAQ

### How do I get open interest in U.S. dollars?

Use these metrics. `open_interest_reported_future_usd` gives futures notional, `open_interest_reported_option_notional_usd` gives options notional, and `open_interest_reported_option_market_value_usd` gives options market value, each aggregated by asset, exchange, exchange-asset, and pair. Those same three totals are also available per individual market on `/timeseries/market-metrics`, which is the intended replacement for the deprecated `value_usd` field on the raw [Market Open Interest](market-open-interest.md) data. Do not use `value_usd`.

### What is the difference between option market value and option notional?

Notional expresses the size of the option positions in U.S. dollars using the size asset reference rate, in the same way futures notional is computed. Market value prices the option positions at their mark price, so it reflects the current dollar value of the contracts rather than the notional exposure of the underlying.

### Why do the per-exchange metrics not sum to the asset metric?

The asset metric aggregates markets across all exchanges, and it attributes each market to both its base and its quote asset. The per-exchange metrics are scoped to one exchange and do not double count across asset sides, so the two are computed over different market sets and are not expected to reconcile by simple addition.

### Is the daily value an average over the day?

No. Every value is a point-in-time snapshot, not an average over the interval. The daily, hourly, and one-minute series are all snapshots taken at a point in time (converted to U.S. dollars and summed across markets), just at different cadences. None of them is a time-weighted average.

### Do you have per-market open interest?

Yes, in two forms. The number of outstanding contracts for a single market is a separate raw data type, documented in [Market Open Interest](market-open-interest.md). A per-market U.S. dollar value is also available for three of the metrics on this page (`open_interest_reported_future_usd`, `open_interest_reported_option_notional_usd`, and `open_interest_reported_option_market_value_usd`) over `/timeseries/market-metrics`, as the replacement for the deprecated raw `value_usd` field. The full metric family, including the settlement-type, margin-asset, and option-type breakdowns, is only available at the aggregate entity levels (see [Availability by entity](#availability-by-entity)).

## Related

* [Market Open Interest](market-open-interest.md): the raw per-market open interest (contract counts) that these metrics aggregate.
* [Market Reference Data](market-reference-data.md): per-market contract specifications, including contract size and the size and margin assets used in the conversion.
* [Reference Rate](../reference-rates-overview/reference_rate.md): the U.S. dollar reference rates used to convert open interest to dollars.
* [Liquidation Metrics](liquidation-metrics.md): reported liquidation volumes aggregated over the same entities.
* [Funding Rates](funding-rates/funding-rates.md): perpetual-futures funding rates on the same markets.
* [Exploring Options, Open Interest, and Volatility Data](../../tutorials-and-examples/tutorials/exploring-options-open-interest-and-volatility-data.md): a worked example that pulls and charts open interest.
