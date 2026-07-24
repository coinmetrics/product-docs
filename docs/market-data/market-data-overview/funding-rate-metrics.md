# Funding Rate Metrics

## Overview

Funding rate metrics summarize perpetual-futures funding across many markets at once. Where the raw [Market Funding Rates](market-funding-rates.md) data reports the funding rate of a single market, these metrics combine those per-market rates into an open-interest-weighted average for a whole asset or for an asset on one exchange, and then accumulate that average over time. They answer two related questions: what is the prevailing cost of holding a leveraged perpetual position on an asset right now, and what would that position have paid or earned in funding over the past day, week, or month. Traders, risk teams, and researchers use them to read the cost of carry, gauge crowding and sentiment across venues, and compare the economics of perpetuals without pulling every individual market.

This page covers two families. The **aggregate** funding rate is the open-interest-weighted average funding rate across markets, standardized to a fixed period (8 hours, 1 day, 30 days, or 1 year). The **cumulative** funding rate accumulates that aggregate over a rolling window (1 day, 7 days, or 30 days) to give the realized funding a holder would have accrued.

## At a Glance

<table data-full-width="true"><thead><tr><th>Data type</th><th>Entities</th><th width="159">Frequency / cadence</th><th>Unit</th><th>Primary endpoints</th><th>Coverage</th></tr></thead><tbody><tr><td>Aggregated and cumulative perpetual-futures funding rate (derivatives)</td><td>Assets and exchange-assets</td><td>Published once per hour. Available at 1h and 1d, where the 1d series is the hourly value at the daily boundary rather than an average over the day</td><td>Dimensionless (a decimal fraction over the stated period or window)</td><td><code>/timeseries/asset-metrics</code><br><br><code>/timeseries/exchange-asset-metrics</code></td><td><a href="https://coverage.coinmetrics.io/search-results?query=futures_aggregate_funding_rate_%2A">🔗</a></td></tr></tbody></table>

## Metrics

The family splits into aggregate funding rate metrics and cumulative funding rate metrics. Within each group, variants narrow the market set by margin type (`usd_margin`, `coin_margin`, or `all_margin`) and select a standard period or rolling window. Every metric is dimensionless, expressed as a decimal fraction (for example `0.0001` is 0.01% over the stated period). Both families are served at the asset and exchange-asset levels.

### Aggregate funding rate

The open-interest-weighted average funding rate across markets, standardized to a fixed period. The `8h_period` variant is the base rate. The `1d`, `30d`, and `1y` variants rescale that base rate to the longer period (see [Methodology](#aggregate-funding-rate-calculation)).

<table data-full-width="true"><thead><tr><th width="470">Metric</th><th>Description</th><th width="90">Frequency</th><th width="90">Coverage</th></tr></thead><tbody><tr><td><code>futures_aggregate_funding_rate_usd_margin_8h_period</code></td><td>The average funding rate weighted by open interest from futures markets where the margin asset is U.S. dollars converted to a 8 hour period.</td><td>1h, 1d</td><td><a href="https://coverage.coinmetrics.io/search-results?query=futures_aggregate_funding_rate_usd_margin_8h_period">🔗</a></td></tr><tr><td><code>futures_aggregate_funding_rate_usd_margin_1d_period</code></td><td>The average funding rate weighted by open interest from futures markets where the margin asset is U.S. dollars converted to a 1 day period.</td><td>1h, 1d</td><td><a href="https://coverage.coinmetrics.io/search-results?query=futures_aggregate_funding_rate_usd_margin_1d_period">🔗</a></td></tr><tr><td><code>futures_aggregate_funding_rate_usd_margin_30d_period</code></td><td>The average funding rate weighted by open interest from futures markets where the margin asset is U.S. dollars converted to a 30 day period.</td><td>1h, 1d</td><td><a href="https://coverage.coinmetrics.io/search-results?query=futures_aggregate_funding_rate_usd_margin_30d_period">🔗</a></td></tr><tr><td><code>futures_aggregate_funding_rate_usd_margin_1y_period</code></td><td>The average funding rate weighted by open interest from futures markets where the margin asset is U.S. dollars converted to a 1 year period.</td><td>1h, 1d</td><td><a href="https://coverage.coinmetrics.io/search-results?query=futures_aggregate_funding_rate_usd_margin_1y_period">🔗</a></td></tr><tr><td><code>futures_aggregate_funding_rate_coin_margin_8h_period</code></td><td>The average funding rate weighted by open interest from futures markets where the margin asset is equivalent to the underlying base asset converted to a 8 hour period.</td><td>1h, 1d</td><td><a href="https://coverage.coinmetrics.io/search-results?query=futures_aggregate_funding_rate_coin_margin_8h_period">🔗</a></td></tr><tr><td><code>futures_aggregate_funding_rate_coin_margin_1d_period</code></td><td>The average funding rate weighted by open interest from futures markets where the margin asset is equivalent to the underlying base asset converted to a 1 day period.</td><td>1h, 1d</td><td><a href="https://coverage.coinmetrics.io/search-results?query=futures_aggregate_funding_rate_coin_margin_1d_period">🔗</a></td></tr><tr><td><code>futures_aggregate_funding_rate_coin_margin_30d_period</code></td><td>The average funding rate weighted by open interest from futures markets where the margin asset is equivalent to the underlying base asset converted to a 30 day period.</td><td>1h, 1d</td><td><a href="https://coverage.coinmetrics.io/search-results?query=futures_aggregate_funding_rate_coin_margin_30d_period">🔗</a></td></tr><tr><td><code>futures_aggregate_funding_rate_coin_margin_1y_period</code></td><td>The average funding rate weighted by open interest from futures markets where the margin asset is equivalent to the underlying base asset converted to a 1 year period.</td><td>1h, 1d</td><td><a href="https://coverage.coinmetrics.io/search-results?query=futures_aggregate_funding_rate_coin_margin_1y_period">🔗</a></td></tr><tr><td><code>futures_aggregate_funding_rate_all_margin_8h_period</code></td><td>The average funding rate weighted by open interest from all futures markets, regardless of the margin asset, converted to a 8 hour period.</td><td>1h, 1d</td><td><a href="https://coverage.coinmetrics.io/search-results?query=futures_aggregate_funding_rate_all_margin_8h_period">🔗</a></td></tr><tr><td><code>futures_aggregate_funding_rate_all_margin_1d_period</code></td><td>The average funding rate weighted by open interest from all futures markets, regardless of the margin asset, converted to a 1 day period.</td><td>1h, 1d</td><td><a href="https://coverage.coinmetrics.io/search-results?query=futures_aggregate_funding_rate_all_margin_1d_period">🔗</a></td></tr><tr><td><code>futures_aggregate_funding_rate_all_margin_30d_period</code></td><td>The average funding rate weighted by open interest from all futures markets, regardless of the margin asset, converted to a 30 day period.</td><td>1h, 1d</td><td><a href="https://coverage.coinmetrics.io/search-results?query=futures_aggregate_funding_rate_all_margin_30d_period">🔗</a></td></tr><tr><td><code>futures_aggregate_funding_rate_all_margin_1y_period</code></td><td>The average funding rate weighted by open interest from all futures markets, regardless of the margin asset, converted to a 1 year period.</td><td>1h, 1d</td><td><a href="https://coverage.coinmetrics.io/search-results?query=futures_aggregate_funding_rate_all_margin_1y_period">🔗</a></td></tr></tbody></table>

### Cumulative funding rate

The aggregate funding rate accumulated over a rolling window, so the value is the realized funding a position would have accrued over the previous 1, 7, or 30 days (see [Methodology](#cumulative-funding-rate-calculation)).

<table data-full-width="true"><thead><tr><th width="470">Metric</th><th>Description</th><th width="90">Frequency</th><th width="90">Coverage</th></tr></thead><tbody><tr><td><code>futures_cumulative_funding_rate_usd_margin_rolling_1d</code></td><td>The cumulative average funding rate weighted by open interest from futures markets where the margin asset is U.S. dollars or U.S. dollar stablecoin over the previous rolling 1 day period.</td><td>1h, 1d</td><td><a href="https://coverage.coinmetrics.io/search-results?query=futures_cumulative_funding_rate_usd_margin_rolling_1d">🔗</a></td></tr><tr><td><code>futures_cumulative_funding_rate_usd_margin_rolling_7d</code></td><td>The cumulative average funding rate weighted by open interest from futures markets where the margin asset is U.S. dollars or U.S. dollar stablecoin over the previous rolling 7 day period.</td><td>1h, 1d</td><td><a href="https://coverage.coinmetrics.io/search-results?query=futures_cumulative_funding_rate_usd_margin_rolling_7d">🔗</a></td></tr><tr><td><code>futures_cumulative_funding_rate_usd_margin_rolling_30d</code></td><td>The cumulative average funding rate weighted by open interest from futures markets where the margin asset is U.S. dollars or U.S. dollar stablecoin over the previous rolling 30 day period.</td><td>1h, 1d</td><td><a href="https://coverage.coinmetrics.io/search-results?query=futures_cumulative_funding_rate_usd_margin_rolling_30d">🔗</a></td></tr><tr><td><code>futures_cumulative_funding_rate_coin_margin_rolling_1d</code></td><td>The cumulative average funding rate weighted by open interest from futures markets where the margin asset is equivalent to the underlying base asset over the previous rolling 1 day period.</td><td>1h, 1d</td><td><a href="https://coverage.coinmetrics.io/search-results?query=futures_cumulative_funding_rate_coin_margin_rolling_1d">🔗</a></td></tr><tr><td><code>futures_cumulative_funding_rate_coin_margin_rolling_7d</code></td><td>The cumulative average funding rate weighted by open interest from futures markets where the margin asset is equivalent to the underlying base asset over the previous rolling 7 day period.</td><td>1h, 1d</td><td><a href="https://coverage.coinmetrics.io/search-results?query=futures_cumulative_funding_rate_coin_margin_rolling_7d">🔗</a></td></tr><tr><td><code>futures_cumulative_funding_rate_coin_margin_rolling_30d</code></td><td>The cumulative average funding rate weighted by open interest from futures markets where the margin asset is equivalent to the underlying base asset over the previous rolling 30 day period.</td><td>1h, 1d</td><td><a href="https://coverage.coinmetrics.io/search-results?query=futures_cumulative_funding_rate_coin_margin_rolling_30d">🔗</a></td></tr><tr><td><code>futures_cumulative_funding_rate_all_margin_rolling_1d</code></td><td>The cumulative average funding rate weighted by open interest from all futures markets, regardless of the margin asset, over the previous rolling 1 day period.</td><td>1h, 1d</td><td><a href="https://coverage.coinmetrics.io/search-results?query=futures_cumulative_funding_rate_all_margin_rolling_1d">🔗</a></td></tr><tr><td><code>futures_cumulative_funding_rate_all_margin_rolling_7d</code></td><td>The cumulative average funding rate weighted by open interest from all futures markets, regardless of the margin asset, over the previous rolling 7 day period.</td><td>1h, 1d</td><td><a href="https://coverage.coinmetrics.io/search-results?query=futures_cumulative_funding_rate_all_margin_rolling_7d">🔗</a></td></tr><tr><td><code>futures_cumulative_funding_rate_all_margin_rolling_30d</code></td><td>The cumulative average funding rate weighted by open interest from all futures markets, regardless of the margin asset, over the previous rolling 30 day period.</td><td>1h, 1d</td><td><a href="https://coverage.coinmetrics.io/search-results?query=futures_cumulative_funding_rate_all_margin_rolling_30d">🔗</a></td></tr></tbody></table>

{% hint style="info" %}
**Conventions.** Metric values are returned as JSON strings to preserve precision. Timestamps are UTC ISO-8601 with nanosecond resolution, and `time` is the observation time the value corresponds to. Values are dimensionless decimal fractions over the metric's period or rolling window, not percentages or annualized numbers (except the `1y_period` aggregate, which is scaled to a one-year period). A positive value means long holders pay short holders, and a negative value means short holders pay long holders.
{% endhint %}

## Methodology

Both families are built from two per-market inputs: the realized funding rate of each perpetual futures market, documented in [Market Funding Rates](market-funding-rates.md), and the open interest of each market valued in U.S. dollars, the same input aggregated by the [Open Interest Metrics](open-interest-metrics.md). Valuing open interest in U.S. dollars puts every market on one scale, which is what lets a coin-margined market and a stablecoin-margined market be weighted against each other. The metrics are recalculated once per hour.

### Margin type

The `usd_margin`, `coin_margin`, and `all_margin` variants select which markets enter the aggregation:

* **`usd_margin`** covers markets margined in U.S. dollars or a U.S. dollar stablecoin, such as USDT or USDC.
* **`coin_margin`** covers markets margined in the underlying base asset (for example a BTC-margined BTC perpetual).
* **`all_margin`** covers every perpetual futures market for the asset, regardless of margin type.

### Aggregate funding rate calculation

Exchanges pay funding on different schedules, so each market's rate is first put on a common basis. For a market $$m$$ with a native funding rate $$FR^{(m)}$$ over its native period $$p_m$$, the rate is linearly rescaled to a target period $$P$$:

$$
FR^{(m)}_{P} = \frac{P}{p_m}\, FR^{(m)}
$$

For the base 8-hour period this is $$FR^{(m)}_{8h} = (8 / p_m)\, FR^{(m)}$$, where $$p_m$$ is expressed in hours.

The rescaled rates are then averaged across markets, weighted by each market's U.S. dollar open interest:

$$
\mathrm{AFR}_{P} = \frac{\sum_{m} \mathrm{OI}^{\mathrm{usd}}_{m}\, FR^{(m)}_{P}}{\sum_{m} \mathrm{OI}^{\mathrm{usd}}_{m}}
$$

Because the rescaling factor $$P / 8h$$ is the same for every market, the 1-day, 30-day, and 1-year metrics equal the 8-hour aggregate multiplied by that factor. The scaling is linear and the longer periods are not compounded. The 1-year metric uses the actual length of the trailing calendar year, so it accounts for leap years (365 or 366 days).

The set of markets summed over depends on the entity. At the asset level the aggregation spans every qualifying market on every exchange for that asset. At the exchange-asset level it is restricted to the markets for that asset on one exchange. A market is included only while a recent funding rate and open interest value are available for it. Markets without open interest do not contribute to the weighting, and if no market in the group has open interest, no value is produced for that timestamp.

### Cumulative funding rate calculation

The cumulative funding rate accumulates the 8-hour aggregate rate over a rolling window. Each hourly aggregate is first converted to an hourly rate:

$$
\mathrm{AFR}_{1h} = \frac{\mathrm{AFR}_{8h}}{8}
$$

The hourly rates over the window are then compounded, so the cumulative rate reflects funding applied period over period rather than a simple sum:

$$
\mathrm{CFR}_{L} = \prod_{i=1}^{L} \left(1 + \mathrm{AFR}_{1h,i}\right) - 1
$$

The window length $$L$$ is the number of hourly observations in the rolling period: 24 for `rolling_1d`, 168 for `rolling_7d`, and 720 for `rolling_30d`. The cumulative rate is computed per margin type from the matching 8-hour aggregate, and at both the asset and exchange-asset levels.

### Frequency

Both families are recalculated once per hour, so the hourly series is the native cadence. The daily series is that same series sampled at the daily boundary rather than an average over the day. The `1d` value for a date is the same number as the `1h` value at `00:00` UTC on that date. Read a daily value as the rate that prevailed at that instant, not as the day's average funding. To get an average over a period, pull the hourly series and average it. To get funding accumulated over a period, use the cumulative metrics.

## Accessing the Data

Both families are served over the asset and exchange-asset metric endpoints. Pass the metric names in the `metrics` parameter and select the entity with the endpoint's entity parameter (`assets` or `exchange_assets`). Supported frequencies are `1h` and `1d`.

* [`/timeseries/asset-metrics`](https://docs.coinmetrics.io/api/v4/#operation/getTimeseriesAssetMetrics)
* [`/timeseries/exchange-asset-metrics`](https://docs.coinmetrics.io/api/v4/#operation/getTimeseriesExchangeAssetMetrics)

The examples below query `futures_aggregate_funding_rate_all_margin_8h_period` for the asset `btc`. Switch the endpoint and its entity parameter to query at the exchange-asset level (for example `client.get_exchange_asset_metrics(exchange_assets=["binance-btc"], ...)`), and swap the metric name for any row in the [Metrics](#metrics) tables.

{% tabs %}
{% tab title="Python Client" %}
```python
import os
from datetime import timedelta
from coinmetrics.api_client import CoinMetricsClient

client = CoinMetricsClient(os.environ["CM_API_KEY"])

# Aggregate funding rate for BTC over a time range, fetched in parallel as a DataFrame.
df = client.get_asset_metrics(
    assets=["btc"],
    metrics=["futures_aggregate_funding_rate_all_margin_8h_period"],
    frequency="1h",
    start_time="2025-01-01",
    end_time="2025-02-01",
    format="json_stream",
).parallel(time_increment=timedelta(days=7)).to_dataframe()

print(df)

# For just the latest value, use limit_per_asset instead (uses format="json"):
# client.get_asset_metrics(assets=["btc"], metrics=["futures_aggregate_funding_rate_all_margin_8h_period"], frequency="1h", limit_per_asset=1).to_dataframe()
```
{% endtab %}

{% tab title="Shell" %}
```shell
curl --compressed "https://api.coinmetrics.io/v4/timeseries/asset-metrics?assets=btc&metrics=futures_aggregate_funding_rate_all_margin_8h_period&frequency=1h&limit_per_asset=3&api_key=$CM_API_KEY"
```
{% endtab %}

{% tab title="Python" %}
```python
import os, requests

response = requests.get(
    "https://api.coinmetrics.io/v4/timeseries/asset-metrics",
    params={"assets": "btc", "metrics": "futures_aggregate_funding_rate_all_margin_8h_period",
            "frequency": "1h", "limit_per_asset": 3,
            "api_key": os.environ["CM_API_KEY"]},
).json()
print(response)
```
{% endtab %}
{% endtabs %}

Full parameter reference: see the API Reference for [`/timeseries/asset-metrics`](https://docs.coinmetrics.io/api/v4/#operation/getTimeseriesAssetMetrics) and [`/timeseries/exchange-asset-metrics`](https://docs.coinmetrics.io/api/v4/#operation/getTimeseriesExchangeAssetMetrics).

## Examples

The examples below are live daily pulls, returned as JSON strings, and change on each pull. They show the aggregate and cumulative all-margined rate at the asset and exchange-asset levels.

### Example: aggregate funding rate for an asset

The aggregate all-margined funding rate for the asset `btc`, standardized to an 8-hour period ([browser](https://api.coinmetrics.io/v4/timeseries/asset-metrics?assets=btc\&metrics=futures_aggregate_funding_rate_all_margin_8h_period\&limit_per_asset=3\&frequency=1d\&api_key=YOUR_API_KEY)):

```json
[
  {
    "asset": "btc",
    "time": "2026-07-22T00:00:00.000000000Z",
    "futures_aggregate_funding_rate_all_margin_8h_period": "-0.00000589681955415212"
  },
  {
    "asset": "btc",
    "time": "2026-07-23T00:00:00.000000000Z",
    "futures_aggregate_funding_rate_all_margin_8h_period": "0.0000232900145591262"
  },
  {
    "asset": "btc",
    "time": "2026-07-24T00:00:00.000000000Z",
    "futures_aggregate_funding_rate_all_margin_8h_period": "0.0000573352141944837"
  }
]
```

### Example: aggregate funding rate for an exchange-asset

The same metric for the exchange-asset `binance-btc`, restricted to BTC markets on Binance ([browser](https://api.coinmetrics.io/v4/timeseries/exchange-asset-metrics?exchange_assets=binance-btc\&metrics=futures_aggregate_funding_rate_all_margin_8h_period\&limit_per_exchange_asset=3\&frequency=1d\&api_key=YOUR_API_KEY)):

```json
[
  {
    "exchange_asset": "binance-btc",
    "time": "2026-07-22T00:00:00.000000000Z",
    "futures_aggregate_funding_rate_all_margin_8h_period": "0.0000216143568855255"
  },
  {
    "exchange_asset": "binance-btc",
    "time": "2026-07-23T00:00:00.000000000Z",
    "futures_aggregate_funding_rate_all_margin_8h_period": "0.0000255811438314194"
  },
  {
    "exchange_asset": "binance-btc",
    "time": "2026-07-24T00:00:00.000000000Z",
    "futures_aggregate_funding_rate_all_margin_8h_period": "0.0000745723320889897"
  }
]
```

### Example: cumulative funding rate for an asset

The cumulative all-margined funding rate for the asset `btc` over the previous rolling 1 day window ([browser](https://api.coinmetrics.io/v4/timeseries/asset-metrics?assets=btc\&metrics=futures_cumulative_funding_rate_all_margin_rolling_1d\&limit_per_asset=3\&frequency=1d\&api_key=YOUR_API_KEY)):

```json
[
  {
    "asset": "btc",
    "time": "2026-07-22T00:00:00.000000000Z",
    "futures_cumulative_funding_rate_all_margin_rolling_1d": "0.0000740854787844025"
  },
  {
    "asset": "btc",
    "time": "2026-07-23T00:00:00.000000000Z",
    "futures_cumulative_funding_rate_all_margin_rolling_1d": "0.000109949732320258"
  },
  {
    "asset": "btc",
    "time": "2026-07-24T00:00:00.000000000Z",
    "futures_cumulative_funding_rate_all_margin_rolling_1d": "0.0000822019342630043"
  }
]
```

### Example: cumulative funding rate for an exchange-asset

The same cumulative metric for the exchange-asset `binance-btc` ([browser](https://api.coinmetrics.io/v4/timeseries/exchange-asset-metrics?exchange_assets=binance-btc\&metrics=futures_cumulative_funding_rate_all_margin_rolling_1d\&limit_per_exchange_asset=3\&frequency=1d\&api_key=YOUR_API_KEY)):

```json
[
  {
    "exchange_asset": "binance-btc",
    "time": "2026-07-22T00:00:00.000000000Z",
    "futures_cumulative_funding_rate_all_margin_rolling_1d": "0.000168715168651357"
  },
  {
    "exchange_asset": "binance-btc",
    "time": "2026-07-23T00:00:00.000000000Z",
    "futures_cumulative_funding_rate_all_margin_rolling_1d": "0.000131773136820001"
  },
  {
    "exchange_asset": "binance-btc",
    "time": "2026-07-24T00:00:00.000000000Z",
    "futures_cumulative_funding_rate_all_margin_rolling_1d": "0.0000782303632063108"
  }
]
```

## Coverage

Coverage is published per family. The aggregate and cumulative funding rate metrics each have their own coverage search.

### Aggregate funding rate coverage

{% embed url="https://coverage.coinmetrics.io/search-results?query=futures_aggregate_funding_rate_%2A" %}

### Cumulative funding rate coverage

{% embed url="https://coverage.coinmetrics.io/search-results?query=futures_cumulative_funding_rate_%2A" %}

## Usage

* **Cross-venue cost of carry.** Read the aggregate rate for an asset to see the prevailing funding across the whole market, rather than reading one venue at a time. Use the exchange-asset level to compare one exchange against the asset-wide rate.
* **Standardized comparison.** Because the aggregate is standardized to a fixed period, the `8h_period`, `1d_period`, `30d_period`, and `1y_period` variants are directly comparable across assets and venues without converting each market's native period by hand.
* **Realized funding over a window.** Use the cumulative metrics to estimate what a position would have paid or earned in funding over the previous day, week, or month, compounded period over period.
* **Margin-type breakdown.** Compare the `usd_margin`, `coin_margin`, and `all_margin` variants to see whether stablecoin-margined and coin-margined markets are funding differently.
* **Derivatives context.** Combine funding with [Open Interest Metrics](open-interest-metrics.md) and [Liquidation Metrics](liquidation-metrics.md) on the same entities to study leverage build-up and unwind, and with the raw per-market [Market Funding Rates](market-funding-rates.md) when a single market is the focus.

## Limitations

* **Open-interest weighted.** The aggregate is weighted by U.S. dollar open interest, so markets with the largest open interest dominate the value. A market with little or no open interest contributes little or nothing.
* **Coverage follows the collected market universe.** Each value aggregates the perpetual futures markets Coin Metrics collects for the entity. Markets outside the coverage universe are not included. See the coverage searches above for what is available.
* **Longer aggregate periods are linear rescalings.** The `1d`, `30d`, and `1y` aggregates are the 8-hour rate scaled to the longer period, not a compounded figure. The cumulative metrics are the compounded series.
* **Cumulative depends on a continuous hourly series.** The cumulative rate compounds the hourly aggregate over the window. Gaps in the underlying hourly series reduce the number of terms in the product rather than being filled in.
* **Perpetual futures only.** Funding is a perpetual-futures mechanism, so these metrics reflect perpetual markets only.

## FAQ

### What is the difference between the aggregate and cumulative funding rate?

The aggregate funding rate is an open-interest-weighted average of the current funding rate across markets, standardized to a fixed period (8 hours, 1 day, 30 days, or 1 year). The cumulative funding rate takes the hourly aggregate and compounds it over a rolling window (1, 7, or 30 days), so it measures the funding a position would have actually accrued over that window rather than the rate at a single point in time.

### How is this different from the per-market Market Funding Rates data?

The raw [Market Funding Rates](market-funding-rates.md) data is the funding rate of a single market as reported by its exchange, on that exchange's own period. The metrics on this page combine many markets into one open-interest-weighted value for an asset or an exchange-asset, standardized to a common period. Use the raw data to study one market, and these metrics to study an asset or exchange across markets.

### What do the usd_margin, coin_margin, and all_margin variants mean?

They select which markets enter the aggregation by margin type. `usd_margin` covers markets margined in U.S. dollars or a U.S. dollar stablecoin such as USDT or USDC, `coin_margin` covers markets margined in the underlying base asset, and `all_margin` covers every perpetual futures market for the asset regardless of margin type.

### Are the 1-day, 30-day, and 1-year aggregates compounded?

No. Those aggregates are the 8-hour rate rescaled linearly to the longer period. The compounded series is the cumulative funding rate, which accumulates the hourly rate over a rolling window.

### Is the daily value an average over the day?

No. The daily series is the hourly series sampled at the daily boundary, so the `1d` value for a date is the same number as the `1h` value at `00:00` UTC on that date. Request the hourly frequency and average it yourself if you need a daily average, or use the cumulative metrics if you need funding accumulated over the day.

## Related

* [Market Funding Rates](market-funding-rates.md): the raw per-market realized funding rate that these metrics aggregate.
* [Market Funding Rates Predicted](market-funding-rates-predicted.md): the forward, real-time estimate of a market's next funding rate.
* [Open Interest Metrics](open-interest-metrics.md): the U.S. dollar open interest used to weight the aggregate funding rate.
* [Market Open Interest](market-open-interest.md): the raw per-market open interest (contract counts).
* [Liquidation Metrics](liquidation-metrics.md): reported liquidation volumes aggregated over the same entities.
