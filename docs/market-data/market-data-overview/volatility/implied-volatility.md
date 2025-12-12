# Implied Volatility, Constant Maturity, At-The-Money

## Overview

A continuous timeseries representing the annualized implied volatility of an option at constant maturity using at-the-money option contracts. The metrics are available for exchange-assets.

Implied volatility ($$\sigma_{imp}$$) is a metric derived from options contracts that quantifies the market’s expectation of future price fluctuations for an underlying asset. In standard option pricing models (such as Black-Scholes), $$\sigma_{imp}$$ is the variable that equates the theoretical model price to the current market price of the option.

Tracking $$\sigma_{imp}$$ as a continuous timeseries presents two significant challenges regarding time decay and moneyness:

1. Time Decay ($$T$$): The time to expiration for any specific contract decreases linearly. If an option expires in $$30$$ days at time $$t$$, it will expire in $$29$$ days at time $$t+1$$. Comparing volatility day-over-day requires disentangling the effects of changing market conditions from the mechanical decay of time.
2. Moneyness ($$\frac{S}{K}$$): As the spot price of the underlying asset ($$S$$) fluctuates, the significance of a fixed strike price ($$K$$) changes. For example, a strike price of $$\$60,000$$ represents a different risk profile when the underlying asset trades at $$\$40,000$$ versus $$\$59,000$$.

To resolve these inconsistencies, we provide constant-maturity, at-the-money (ATM) implied volatility metrics. These synthetic metrics estimate the implied volatility for a hypothetical option that always has a fixed time horizon and a strike price equal to the current spot price.

These implied volatility curves enable cross-sectional and timeseries comparison of volatility expectations across assets, independent of contract expiries or moneyness distortions.&#x20;

## Metrics

The implied volatility metrics across various combinations of tenor. The metrics follow the naming convention:\
\
`volatility_implied_atm_[tenor]_expiration`

The tenor dimension and its values are:&#x20;

* **`[tenor]`**: `1d`, `2d`, `3d`, `7d`, `14d`, `21d`, `30d`, `60d`, `90d`, `120d`, `180d`, `270d`, `1y`

<table data-full-width="true"><thead><tr><th width="357.75">Metric</th><th>Description</th><th width="100">Frequency</th><th width="100">Coverage</th></tr></thead><tbody><tr><td><code>volatility_implied_atm_1d_expiration</code></td><td>The annualized estimated implied volatility of an option expiring 1 day in the future, using at the money option contracts with near-by expiration dates.</td><td>1h, 1d</td><td><a href="https://coverage.coinmetrics.io/search-results?query=volatility_implied_atm_1d_expiration">🔗</a></td></tr><tr><td><code>volatility_implied_atm_2d_expiration</code></td><td>The annualized estimated implied volatility of an option expiring 2 days in the future, using at the money option contracts with near-by expiration dates.</td><td>1h, 1d</td><td><a href="https://coverage.coinmetrics.io/search-results?query=volatility_implied_atm_2d_expiration">🔗</a></td></tr><tr><td><code>volatility_implied_atm_3d_expiration</code></td><td>The annualized estimated implied volatility of an option expiring 3 days in the future, using at the money option contracts with near-by expiration dates.</td><td>1h, 1d</td><td><a href="https://coverage.coinmetrics.io/search-results?query=volatility_implied_atm_3d_expiration">🔗</a></td></tr><tr><td><code>volatility_implied_atm_7d_expiration</code></td><td>The annualized estimated implied volatility of an option expiring 7 days in the future, using at the money option contracts with near-by expiration dates.</td><td>1h, 1d</td><td><a href="https://coverage.coinmetrics.io/search-results?query=volatility_implied_atm_7d_expiration">🔗</a></td></tr><tr><td><code>volatility_implied_atm_14d_expiration</code></td><td>The annualized estimated implied volatility of an option expiring 14 days in the future, using at the money option contracts with near-by expiration dates.</td><td>1h, 1d</td><td><a href="https://coverage.coinmetrics.io/search-results?query=volatility_implied_atm_14d_expiration">🔗</a></td></tr><tr><td><code>volatility_implied_atm_21d_expiration</code></td><td>The annualized estimated implied volatility of an option expiring 21 days in the future, using at the money option contracts with near-by expiration dates.</td><td>1h, 1d</td><td><a href="https://coverage.coinmetrics.io/search-results?query=volatility_implied_atm_21d_expiration">🔗</a></td></tr><tr><td><code>volatility_implied_atm_30d_expiration</code></td><td>The annualized estimated implied volatility of an option expiring 30 days in the future, using at the money option contracts with near-by expiration dates.</td><td>1h, 1d</td><td><a href="https://coverage.coinmetrics.io/search-results?query=volatility_implied_atm_30d_expiration">🔗</a></td></tr><tr><td><code>volatility_implied_atm_60d_expiration</code></td><td>The annualized estimated implied volatility of an option expiring 60 days in the future, using at the money option contracts with near-by expiration dates.</td><td>1h, 1d</td><td><a href="https://coverage.coinmetrics.io/search-results?query=volatility_implied_atm_60d_expiration">🔗</a></td></tr><tr><td><code>volatility_implied_atm_90d_expiration</code></td><td>The annualized estimated implied volatility of an option expiring 90 days in the future, using at the money option contracts with near-by expiration dates.</td><td>1h, 1d</td><td><a href="https://coverage.coinmetrics.io/search-results?query=volatility_implied_atm_90d_expiration">🔗</a></td></tr><tr><td><code>volatility_implied_atm_120d_expiration</code></td><td>The annualized estimated implied volatility of an option expiring 120 days in the future, using at the money option contracts with near-by expiration dates.</td><td>1h, 1d</td><td><a href="https://coverage.coinmetrics.io/search-results?query=volatility_implied_atm_120d_expiration">🔗</a></td></tr><tr><td><code>volatility_implied_atm_180d_expiration</code></td><td>The annualized estimated implied volatility of an option expiring 180 days in the future, using at the money option contracts with near-by expiration dates.</td><td>1h, 1d</td><td><a href="https://coverage.coinmetrics.io/search-results?query=volatility_implied_atm_180d_expiration">🔗</a></td></tr><tr><td><code>volatility_implied_atm_270d_expiration</code></td><td>The annualized estimated implied volatility of an option expiring 270 days in the future, using at the money option contracts with near-by expiration dates.</td><td>1h, 1d</td><td><a href="https://coverage.coinmetrics.io/search-results?query=volatility_implied_atm_270d_expiration">🔗</a></td></tr><tr><td><code>volatility_implied_atm_1y_expiration</code></td><td>The annualized estimated implied volatility of an option expiring 365 days in the future, using at the money option contracts with near-by expiration dates.</td><td>1h, 1d</td><td><a href="https://coverage.coinmetrics.io/search-results?query=volatility_implied_atm_1y_expiration">🔗</a></td></tr></tbody></table>

## Data Sources and Methodology

The calculation creates a normalized value by interpolating between the implied volatility reported by exchanges for existing market contracts. The process is defined as follows:

**1. Horizon Selection**\
\
For every observation, we define a target time horizon, $$T_{target}$$ (e.g., 30 days, 90 days, or 365 days).

**2. Contract Identification**\
\
We identify the market price of the underlying asset, $$S_t$$, using the Coin Metrics Real-Time Reference Rate. We then select two sets of call options based on their expiration dates relative to the target:\
\
Near-Term Options: Expiration $$T_{near} < T_{target}$$\
\
Far-Term Options: Expiration $$T_{far} > T_{target}$$

**3. ATM Selection**\
\
From both the Near-Term and Far-Term sets, we select the specific contract where the strike price $$K$$ is closest to the spot price $$S_t$$ (minimizing $$|S_t - K|$$). This yields two reference implied volatilities:\
\
$$\sigma_{near}$$: The implied volatility of the closest ATM option expiring before the target.\
\
$$\sigma_{far}$$: The implied volatility of the closest ATM option expiring after the target.

**4. Time-Weighted Interpolation**\
\
To determine the synthetic volatility at exactly $$T_{target}$$, we calculate a weighted mean of $$\sigma_{near}$$ and $$\sigma_{far}$$. The weights are inversely proportional to the time difference between the option's expiration and the target date.\
\
Let $$\Delta t$$ represent the absolute time difference:

$$
\Delta t_{i} = | T_{target} - T_{expiration, i} |
$$

The weight $$w_i$$ for each option is calculated as:&#x20;

$$
w_i = \frac{1}{\Delta t_{i}}
$$

**5. Final Calculation**\
\
The final implied volatility $$\sigma_{target}$$ is the weighted average of the two selected options. This ensures that an option expiring closer to the target date exerts a stronger influence on the final metric than one further away:

$$
\sigma_{target} = \frac{w_{near} \cdot \sigma_{near} + w_{far} \cdot \sigma_{far}}{w_{near} + w_{far}}
$$

## Coverage

{% embed url="https://coverage.coinmetrics.io/search-results?query=volatility_implied_atm_%2A" %}

## API Endpoints

The metrics are served through the following endpoints:

* [/timeseries/exchange-asset-metrics](https://docs.coinmetrics.io/api/v4/#tag/Timeseries/operation/getTimeseriesExchangeAssetMetrics)

## Examples

#### Example for Exchange Asset Metrics

A sample of the `volatility_implied_atm_30d_expiration` metric for the exchange\_asset `deribit-btc` from our `/timeseries/exchange-asset-metrics` API endpoint is provided below. You can view this example in your browser [here](https://api.coinmetrics.io/v4/timeseries/exchange-asset-metrics?exchange_assets=deribit-btc\&metrics=volatility_implied_atm_30d_expiration\&limit_per_exchange_asset=3\&frequency=1d\&api_key=YOUR_API_KEY).

```json
[
  {
    "exchange_asset": "deribit-btc",
    "time": "2025-12-09T00:00:00.000000000Z",
    "volatility_implied_atm_30d_expiration": "0.4708629"
  },
  {
    "exchange_asset": "deribit-btc",
    "time": "2025-12-10T00:00:00.000000000Z",
    "volatility_implied_atm_30d_expiration": "0.4496676"
  },
  {
    "exchange_asset": "deribit-btc",
    "time": "2025-12-11T00:00:00.000000000Z",
    "volatility_implied_atm_30d_expiration": "0.4313029"
  }
]
```

## Frequently Asked Questions

#### What units are the implied volatility metrics in? <a href="#what-units-are-the-realized-volatility-metrics-in" id="what-units-are-the-realized-volatility-metrics-in"></a>

The realized volatility metrics are presented in raw units. For instance, a value of `0.5223685` should be interpreted as `52.23685%`.
