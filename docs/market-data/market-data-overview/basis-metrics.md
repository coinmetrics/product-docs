# Basis Metrics

## Overview

Basis metrics measure how far a futures contract trades from its underlying spot market, expressed as an annualized rate. The basis answers a common derivatives question: what forward return is implied by holding a dated futures contract instead of spot? It is widely used to gauge carry, funding conditions, and market sentiment across exchanges. Coin Metrics publishes the basis for a fixed set of target horizons (30, 60, 90, and 120 days to expiration) at the exchange-asset level, so values are reported per exchange-asset (like `binance-btc`) rather than for an individual contract.

## At a Glance

<table data-full-width="true"><thead><tr><th>Data type</th><th>Entities</th><th width="159">Frequency / cadence</th><th>Unit</th><th>Primary endpoint</th><th>Coverage</th></tr></thead><tbody><tr><td>Metric (exchange-asset)</td><td>Exchange-assets (e.g. <code>binance-btc</code>)</td><td>1d, 1h</td><td>Dimensionless (annualized fraction)</td><td><code>/timeseries/exchange-asset-metrics</code></td><td><a href="https://coverage.coinmetrics.io/search-results?query=basis_%2A">🔗</a></td></tr></tbody></table>

## Metrics

This family contains four metrics, one per target time to expiration. Each is a dimensionless annualized fraction (for example, `0.04` is a 4% annualized basis). All four are available at both `1d` and `1h` frequency.

<table data-full-width="true"><thead><tr><th width="260">Metric</th><th>Description</th><th width="120">Frequency</th><th width="100">Coverage</th></tr></thead><tbody><tr><td><code>basis_annualized_30d_exp</code></td><td>The relative difference between the price of a futures contract that expires in 30 days and the price of its underlying spot market, annualized.</td><td>1d, 1h</td><td><a href="https://coverage.coinmetrics.io/exchange-asset-metrics/basis_annualized_30d_exp">🔗</a></td></tr><tr><td><code>basis_annualized_60d_exp</code></td><td>The relative difference between the price of a futures contract that expires in 60 days and the price of its underlying spot market, annualized.</td><td>1d, 1h</td><td><a href="https://coverage.coinmetrics.io/exchange-asset-metrics/basis_annualized_60d_exp">🔗</a></td></tr><tr><td><code>basis_annualized_90d_exp</code></td><td>The relative difference between the price of a futures contract that expires in 90 days and the price of its underlying spot market, annualized.</td><td>1d, 1h</td><td><a href="https://coverage.coinmetrics.io/exchange-asset-metrics/basis_annualized_90d_exp">🔗</a></td></tr><tr><td><code>basis_annualized_120d_exp</code></td><td>The relative difference between the price of a futures contract that expires in 120 days and the price of its underlying spot market, annualized.</td><td>1d, 1h</td><td><a href="https://coverage.coinmetrics.io/exchange-asset-metrics/basis_annualized_120d_exp">🔗</a></td></tr></tbody></table>

{% hint style="info" %}
**Conventions.** Values are returned as JSON strings to preserve precision. The metric is a dimensionless annualized fraction, not a percentage point value (multiply by 100 to read it as a percent). Timestamps are UTC ISO-8601 with nanosecond resolution, where `time` is the observation time.
{% endhint %}

## Methodology

The basis at a target horizon is not read directly off a single contract. Available contracts rarely expire exactly at the target horizon, so Coin Metrics interpolates between the two dated contracts that straddle the target expiration and annualizes the result. The steps below describe how each observation is produced.

### Spot reference and contract selection

At each observation time the spot price is the Coin Metrics reference rate for the asset in US dollars. Coin Metrics then considers the exchange's eligible dated futures contracts for that asset. A contract is eligible when it:

- Has a defined expiration date (perpetual contracts are excluded) and has not yet expired.
- Traded with nonzero volume over the observation interval.
- Is quoted in USD, USDT, or USDC.
- Expires after the 20th of its expiration month.
- Expires in a quarterly month (March, June, September, or December). CME contracts are exempt from this quarterly filter.

Non-conforming instruments (for example spread contracts, volatility or binary contracts, and certain short-dated weekly contracts) are excluded so that only standard directional futures contribute.

### Per-contract basis

For a target horizon of D days (30, 60, 90, or 120), let S be the spot reference rate. For each eligible contract, let F be its close price and T its time to expiration in years. Coin Metrics uses a 365.25-day year, so T equals the contract's days remaining divided by 365.25. The annualized basis of a single contract is:

$$
b = \frac{F / S - 1}{T}
$$

### Interpolating to the target horizon

Two contracts are selected relative to the target horizon: the **front** contract is the eligible contract with the most days remaining that still expires before the target, and the **back** contract is the eligible contract with the fewest days remaining that expires on or after the target. When more than one eligible contract shares the same expiration (for example the same asset quoted in different settlement currencies), the calculation prefers the USD-quoted contract, then USDT, then USDC. Using each contract's annualized basis (b) and its time to expiration in years (T), with the front and back contracts denoted by subscripts, the forward yield between them is:

$$
y = \frac{b_{back} \, T_{back} - b_{front} \, T_{front}}{T_{back} - T_{front}}
$$

The target-horizon annualized basis extends the front contract along that forward yield out to the target horizon (whose length in years is the target days divided by 365.25), then re-annualizes over the full target period:

$$
\text{basis} = \frac{b_{front} \, T_{front} + y \,(T_{target} - T_{front})}{T_{target}}
$$

When only one side of the target is available, the calculation falls back to that contract (for example, if no contract expires after the target, the back leg is treated as absent), so the value degrades gracefully near the ends of the curve rather than dropping out.

### Worked example

The inputs below are illustrative (not live data), chosen to show how the 30-day basis is assembled. Suppose the spot reference rate is 60,000, the target horizon is 30 days (0.0821 years), and two contracts straddle it:

- **Front contract:** 24 days to expiration (0.0657 years), close 60,300. Its annualized basis is (60,300 / 60,000 - 1) / 0.0657 = 0.076.
- **Back contract:** 52 days to expiration (0.1424 years), close 60,800. Its annualized basis is (60,800 / 60,000 - 1) / 0.1424 = 0.094.

The forward yield between them is:

$$
y = \frac{0.094 \times 0.1424 - 0.076 \times 0.0657}{0.1424 - 0.0657} = 0.109
$$

And the interpolated 30-day annualized basis is:

$$
\text{basis} = \frac{0.076 \times 0.0657 + 0.109 \times (0.0821 - 0.0657)}{0.0821} = 0.083
$$

So `basis_annualized_30d_exp` would read approximately `0.083`, an 8.3% annualized basis.

### Cadence

Metrics are recalculated hourly from delayed candle data, so an observation reflects the market as of a short delay before its timestamp rather than the live tick.

## Accessing the Data

Basis metrics are served from the exchange-asset metrics endpoint:

- `/timeseries/exchange-asset-metrics`

Request them by exchange-asset and metric name. The examples below pull the 30-day basis for `binance-btc`.

{% tabs %}
{% tab title="Python Client" %}
```python
from coinmetrics.api_client import CoinMetricsClient
from datetime import timedelta
import os

client = CoinMetricsClient(os.environ["CM_API_KEY"])

df = client.get_exchange_asset_metrics(
    exchange_assets=["binance-btc"],
    metrics=[
        "basis_annualized_30d_exp",
        "basis_annualized_60d_exp",
        "basis_annualized_90d_exp",
        "basis_annualized_120d_exp",
    ],
    frequency="1d",
    start_time="2024-01-01",
    end_time="2024-02-01",
    format="json_stream",
).parallel(time_increment=timedelta(days=30)).to_dataframe()

print(df)
```
{% endtab %}

{% tab title="Shell" %}
```shell
curl --compressed "https://api.coinmetrics.io/v4/timeseries/exchange-asset-metrics?metrics=basis_annualized_30d_exp&exchange_assets=binance-btc&frequency=1d&pretty=true&api_key=$CM_API_KEY"
```
{% endtab %}

{% tab title="Python" %}
```python
import os
import requests

url = "https://api.coinmetrics.io/v4/timeseries/exchange-asset-metrics"
params = {
    "metrics": "basis_annualized_30d_exp",
    "exchange_assets": "binance-btc",
    "frequency": "1d",
    "pretty": "true",
    "api_key": os.environ["CM_API_KEY"],
}
response = requests.get(url, params=params).json()
print(response)
```
{% endtab %}
{% endtabs %}

Full parameter reference: see the API Reference for [`/timeseries/exchange-asset-metrics`](https://docs.coinmetrics.io/api/v4/#operation/getTimeseriesExchangeAssetMetrics).

## Examples

### Example: 30-day annualized basis for binance-btc

Daily `basis_annualized_30d_exp` values for the `binance-btc` exchange-asset. The value is a dimensionless annualized fraction, so `0.0380701676443461` reads as roughly a 3.8% annualized basis.

[View in browser](https://api.coinmetrics.io/v4/timeseries/exchange-asset-metrics?exchange_assets=binance-btc&metrics=basis_annualized_30d_exp&limit_per_exchange_asset=3&frequency=1d&api_key=YOUR_API_KEY)

```json
[
  {
    "exchange_asset": "binance-btc",
    "time": "2026-07-15T00:00:00.000000000Z",
    "basis_annualized_30d_exp": "0.0380701676443461"
  },
  {
    "exchange_asset": "binance-btc",
    "time": "2026-07-16T00:00:00.000000000Z",
    "basis_annualized_30d_exp": "0.0392622000986043"
  },
  {
    "exchange_asset": "binance-btc",
    "time": "2026-07-17T00:00:00.000000000Z",
    "basis_annualized_30d_exp": "0.0408896830437413"
  }
]
```

## Coverage

Availability varies by exchange-asset. Use the coverage tool for the authoritative, up-to-date list of which exchange-assets carry each metric and over what date range.

{% embed url="https://coverage.coinmetrics.io/search-results?query=basis_%2A" %}

## Usage

Basis metrics are typically read as a term structure and as a cross-exchange comparison.

- **Carry and sentiment.** A positive basis (contango) reflects futures trading above spot, a common sign of bullish positioning or a positive cost of carry. A negative basis (backwardation) reflects futures below spot. Because the value is annualized, it is directly comparable across horizons and assets.
- **Term structure.** Reading the 30, 60, 90, and 120 day values together shows the shape of the futures curve. An upward-sloping basis (longer horizons richer) versus a flat or inverted one indicates how the market is pricing forward carry.
- **Cross-exchange comparison.** Because the metric is annualized and uses a consistent methodology, the basis for one asset can be compared across exchanges (for example `binance-btc` versus `deribit-btc`) to spot dislocations or differing demand for leverage.

## Limitations

- **Requires qualifying dated contracts.** For non-CME exchanges, only quarterly-expiry contracts (March, June, September, December) expiring after the 20th of the month qualify. An exchange listing only perpetuals or weeklies produces no basis, and coverage begins only once qualifying contracts trade with nonzero volume.
- **Interpolation and extrapolation.** Each value interpolates between the two contracts that straddle the target horizon. When no contract expires at or after the target (common at longer horizons such as 120 days on venues whose futures do not extend that far), the calculation extrapolates from the nearer contract toward a basis of zero at twice the target horizon. This can pull a long-horizon value well below the nearest contract's own basis, so treat extrapolated values at the long end with caution.
- **Stablecoin-quoted contracts.** Contracts quoted in USDT or USDC have their close price compared directly against a USD reference rate, so the calculation treats 1 USDT and 1 USDC as 1 USD. A material stablecoin depeg would bias the basis for those contracts.
- **Excludes non-standard contracts.** Spread contracts, volatility and binary contracts, and certain short-dated weekly contracts are excluded, so the basis reflects only standard directional futures.

## FAQ

### What does a positive versus negative basis mean?

A positive basis means the futures contract trades above spot (contango), implying a positive annualized carry. A negative basis means futures trade below spot (backwardation).

### Why is the value not tied to a single contract's expiration?

Listed contracts rarely expire exactly 30, 60, 90, or 120 days out. Each metric interpolates between the two contracts that straddle the target horizon and annualizes the result, so the series stays continuous as contracts roll.

### How do I read the units?

Values are dimensionless annualized fractions. Multiply by 100 to express the basis as an annualized percentage.

### Which exchanges and assets are covered?

Coverage varies over time. Use the [coverage tool](https://coverage.coinmetrics.io/search-results?query=basis_%2A) for the current list of exchange-assets and their available date ranges.

### How is the spot price determined?

The spot leg is the Coin Metrics reference rate for the asset in US dollars. See [Reference Rate](../reference-rates-overview/reference_rate.md) for its methodology.

## Related

- [Reference Rate](../reference-rates-overview/reference_rate.md): the spot price used as the denominator in the basis calculation.
- [Market Candles](market-candles.md): the futures candle close prices the basis is computed from.
- [Open Interest Metrics](open-interest-metrics.md): another exchange-asset derivatives metric.
- [Funding Rates](funding-rates/README.md): the perpetual-swap analogue of futures-curve carry.
