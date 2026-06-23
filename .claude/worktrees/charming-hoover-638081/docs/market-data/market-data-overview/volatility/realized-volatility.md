# Realized Volatility

## Overview

The rolling realized volatility, measured as the standard deviation of the natural log of returns prices in U.S. dollars calculated every 10 minutes over the specified interval.

## Metrics

There are 9 realized volatility metrics representing different rolling periods. The metrics follow the naming convention:\
\
`volatility_realized_usd_rolling_[period]`

The period can take the following values:

* `[period]`: `24h`, `7d`, `30d`, `60d`, `90d`, `120d`, `180d`, `270d`, `1y`

<table data-full-width="true"><thead><tr><th width="335.125">Metric</th><th>Description</th><th width="100">Frequency</th><th width="100">Coverage</th></tr></thead><tbody><tr><td><code>volatility_realized_usd_rolling_24h</code></td><td>The 24 hour rolling realized volatility, measured as the standard deviation of the natural log of returns of price in U.S. dollars calculated every 10 minutes over the past 24 hours.</td><td>10m, 1h, 1d</td><td><a href="https://coverage.coinmetrics.io/search-results?query=volatility_realized_usd_rolling_24h">🔗</a></td></tr><tr><td><code>volatility_realized_usd_rolling_7d</code></td><td>The 7 day rolling realized volatility, measured as the standard deviation of the natural log of returns of price in U.S. dollars calculated every 10 minutes over the past 7 days.</td><td>10m, 1h, 1d</td><td><a href="https://coverage.coinmetrics.io/search-results?query=volatility_realized_usd_rolling_7d">🔗</a></td></tr><tr><td><code>volatility_realized_usd_rolling_30d</code></td><td>The 30 day rolling realized volatility, measured as the standard deviation of the natural log of returns of price in U.S. dollars calculated every 10 minutes over the past 30 days.</td><td>10m, 1h, 1d</td><td><a href="https://coverage.coinmetrics.io/search-results?query=volatility_realized_usd_rolling_30d">🔗</a></td></tr><tr><td><code>volatility_realized_usd_rolling_60d</code></td><td>The 60 day rolling realized volatility, measured as the standard deviation of the natural log of returns of price in U.S. dollars calculated every hour over the past 60 days.</td><td>10m, 1h, 1d</td><td><a href="https://coverage.coinmetrics.io/search-results?query=volatility_realized_usd_rolling_60d">🔗</a></td></tr><tr><td><code>volatility_realized_usd_rolling_90d</code></td><td>The 90 day rolling realized volatility, measured as the standard deviation of the natural log of returns of price in U.S. dollars calculated every hour over the past 90 days.</td><td>10m, 1h, 1d</td><td><a href="https://coverage.coinmetrics.io/search-results?query=volatility_realized_usd_rolling_90d">🔗</a></td></tr><tr><td><code>volatility_realized_usd_rolling_120d</code></td><td>The 120 day rolling realized volatility, measured as the standard deviation of the natural log of returns of price in U.S. dollars calculated every hour over the past 120 days.</td><td>10m, 1h, 1d</td><td><a href="https://coverage.coinmetrics.io/search-results?query=volatility_realized_usd_rolling_120d">🔗</a></td></tr><tr><td><code>volatility_realized_usd_rolling_180d</code></td><td>The 180 day rolling realized volatility, measured as the standard deviation of the natural log of returns of price in U.S. dollars calculated every hour over the past 180 days.</td><td>10m, 1h, 1d</td><td><a href="https://coverage.coinmetrics.io/search-results?query=volatility_realized_usd_rolling_180d">🔗</a></td></tr><tr><td><code>volatility_realized_usd_rolling_270d</code></td><td>The 270 day rolling realized volatility, measured as the standard deviation of the natural log of returns of price in U.S. dollars calculated every hour over the past 270 days.</td><td>10m, 1h, 1d</td><td><a href="https://coverage.coinmetrics.io/search-results?query=volatility_realized_usd_rolling_270d">🔗</a></td></tr><tr><td><code>volatility_realized_usd_rolling_1y</code></td><td>The 1 year rolling realized volatility, measured as the standard deviation of the natural log of returns of price in U.S. dollars calculated every hour over the past 1 year.</td><td>10m, 1h, 1d</td><td><a href="https://coverage.coinmetrics.io/search-results?query=volatility_realized_usd_rolling_1y">🔗</a></td></tr></tbody></table>

## Data Sources and Methodology

Coin Metrics calculates realized volatility using our [Real-Time Reference Rates](../../methodologies/coin-metrics-prices-methodology.md#reference-rates-calculation-methodology) as the price input. Volatility is calculated using the close-to-close method, as this is optimal for continuous markets and is widely accepted across financial literature. For this calculation we use the population mean with zero drift, meaning the formula reduces to:

$$
RV=\sqrt{\frac{1}{N-1}\sum_{i=1}^{N}(ln(\frac{s_i}{s_{i-1}}) - 0)^2}\cdot\sqrt{T}
$$

Where $$RV$$is the realized volatility (annualized), $$N$$is the lookback window, $${s_i}$$ is the real-time reference rate price at time $$i$$, and $$T$$ is the time adjustment factor. Using an average return of 0 is standard in these calculations as it avoids misleading volatility numbers during sustained periods of substantially high or low return.

The real-time reference rates are resampled to calculate returns over a 10 minute period, as this frequency captures the rapid nature of volatility in cryptocurrency markets. Volatility is then annualized by setting $$T=6⋅24⋅365$$, as crypto markets trade 24 hours a day each day of the year. Volatility can then be calculated on a rolling window with a specified lookback.

## Coverage

{% embed url="https://coverage.coinmetrics.io/search-results?query=volatility_realized_%2A" %}

## API Endpoints

The metrics are served through the following endpoints:

* [/timeseries/asset-metrics](https://docs.coinmetrics.io/api/v4/#tag/Timeseries/operation/getTimeseriesAssetMetrics)

## Examples

#### Example for Asset Metrics

A sample of the `volatility_realized_usd_rolling_30d` metric for the asset `btc` from our `/timeseries/asset-metrics` API endpoint is provided below. You can view this example in your browser [here](https://api.coinmetrics.io/v4/timeseries/asset-metrics?assets=btc\&metrics=volatility_realized_usd_rolling_30d\&limit_per_asset=3\&frequency=1d\&api_key=YOUR_API_KEY).

```json
[
  {
    "asset": "btc",
    "time": "2025-04-30T00:00:00.000000000Z",
    "volatility_realized_usd_rolling_30d": "0.5278415"
  },
  {
    "asset": "btc",
    "time": "2025-05-01T00:00:00.000000000Z",
    "volatility_realized_usd_rolling_30d": "0.5247378"
  },
  {
    "asset": "btc",
    "time": "2025-05-02T00:00:00.000000000Z",
    "volatility_realized_usd_rolling_30d": "0.5223685"
  }
]
```

## Frequently Asked Questions

### What units are the realized volatility metrics in?

The realized volatility metrics are presented in raw units. For instance, a value of `0.5223685` should be interpreted as `52.23685%`.
