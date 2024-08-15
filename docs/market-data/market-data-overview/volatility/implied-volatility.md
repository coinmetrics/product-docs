# Implied Volatility

## Definition

The implied volatility of a synthetic option, with strike price always at-the-money and with expiration date always a fixed number of days from calculation time.

<table><thead><tr><th width="224">Name</th><th width="296">MetricID</th><th width="116">Unit</th><th>Frequency</th></tr></thead><tbody><tr><td>Volatility, implied, at-the-money, 1 day</td><td><a href="https://coverage.coinmetrics.io/search-results?query=volatility_implied_atm_1d_expiration">volatility_implied_atm_1d_expiration</a></td><td>Dimensionless</td><td>1h</td></tr><tr><td>Volatility, implied, at-the-money, 2 days</td><td><a href="https://coverage.coinmetrics.io/search-results?query=volatility_implied_atm_2d_expiration">volatility_implied_atm_2d_expiration</a></td><td>Dimensionless</td><td>1h</td></tr><tr><td>Volatility, implied, at-the-money, 3 days</td><td><a href="https://coverage.coinmetrics.io/search-results?query=volatility_implied_atm_3d_expiration">volatility_implied_atm_3d_expiration</a></td><td>Dimensionless</td><td>1h</td></tr><tr><td>Volatility, implied, at-the-money, 7 days</td><td><a href="https://coverage.coinmetrics.io/search-results?query=volatility_implied_atm_7d_expiration">volatility_implied_atm_7d_expiration</a></td><td>Dimensionless</td><td>1h</td></tr><tr><td>Volatility, implied, at-the-money, 14 days</td><td><a href="https://coverage.coinmetrics.io/search-results?query=volatility_implied_atm_14d_expiration">volatility_implied_atm_14d_expiration</a></td><td>Dimensionless</td><td>1h</td></tr><tr><td>Volatility, implied, at-the-money, 21 days</td><td><a href="https://coverage.coinmetrics.io/search-results?query=volatility_implied_atm_21d_expiration">volatility_implied_atm_21d_expiration</a></td><td>Dimensionless</td><td>1h</td></tr><tr><td>Volatility, implied, at-the-money, 30 days</td><td><a href="https://coverage.coinmetrics.io/search-results?query=volatility_implied_atm_30d_expiration">volatility_implied_atm_30d_expiration</a></td><td>Dimensionless</td><td>1h</td></tr><tr><td>Volatility, implied, at-the-money, 60 days</td><td><a href="https://coverage.coinmetrics.io/search-results?query=volatility_implied_atm_60d_expiration">volatility_implied_atm_60d_expiration</a></td><td>Dimensionless</td><td>1h</td></tr><tr><td>Volatility, implied, at-the-money, 90 days</td><td><a href="https://coverage.coinmetrics.io/search-results?query=volatility_implied_atm_90d_expiration">volatility_implied_atm_90d_expiration</a></td><td>Dimensionless</td><td>1h</td></tr><tr><td>Volatility, implied, at-the-money, 120 days</td><td><a href="https://coverage.coinmetrics.io/search-results?query=volatility_implied_atm_120d_expiration">volatility_implied_atm_120d_expiration</a></td><td>Dimensionless</td><td>1h</td></tr><tr><td>Volatility, implied, at-the-money, 180 days</td><td><a href="https://coverage.coinmetrics.io/search-results?query=volatility_implied_atm_180d_expiration">volatility_implied_atm_180d_expiration</a></td><td>Dimensionless</td><td>1h</td></tr><tr><td>Volatility, implied, at-the-money, 270 days</td><td><a href="https://coverage.coinmetrics.io/search-results?query=volatility_implied_atm_270d_expiration">volatility_implied_atm_270d_expiration</a></td><td>Dimensionless</td><td>1h</td></tr><tr><td>Volatility, implied, at-the-money, 365 days</td><td><a href="https://coverage.coinmetrics.io/search-results?query=volatility_implied_atm_1y_expiration">volatility_implied_atm_1y_expiration</a></td><td>Dimensionless</td><td>1h</td></tr></tbody></table>

## Details

Implied volatility is a property of options contracts, analogous to price, which fluctuates over time. The implied volatility represents the market’s view of how significantly the price of the underlying asset could change in the future. In standard models, for an option with a given strike price and time until expiration, the implied volatility is only a function of the option’s price and can serve as a proxy for that price.

Analysts may wish to track this value as a timeseries day-over-day, however this poses a problem on two fronts: For one, the days until expiration for each option are constantly changing. If a contract expires in 30 days on Sunday, then on Monday it will be expiring in 29 days, so comparing the implied volatility to the day before will require disentangling changes due to market conditions from changes due to the closer expiration date. Additionally, as the price of the underlying asset changes, the significance of the option’s strike price will change as well: An option strike price of $60,000 at expiration will be much less valuable if Bitcoin is currently trading at $40,000 than if it is currently at $59,000.

This set of metrics normalizes these option parameters, allowing traders and analysts to see how the option market evolves over time using consistent parameters. The implied volatility is always estimated for a hypothetical option expiring at a constant horizon in the future at each calculation time. Additionally, each time the synthetic option is calculated to have a strike price approximately equal to the market price of the underlying asset (i.e. it is an at-the-money option). This ensures at each time point the metric compares the implied volatility of options with the same expiration horizon and with a strike price that will pay out if the underlying asset increases at all relative to its current market price.

The calculation methodology used is as follows:

1. Each time we calculate an observation, we select a target expiration date which is at a fixed horizon in the future from the current calculation time. These horizons can vary from 1-day to 365-days.
2. For an underlying asset on a specific exchange, we identify the call options expiring closest to, but before, the target date and the call options closest to, but after, the target date. We refer to these as the shorter-horizon and longer-horizon options.
3. We identify the market price of the underlying asset at the calculation time using the Coin Metrics Real-Time Reference Rate for that asset.
4. From the set of shorter-term options, we select the one with strike price closest to the market price of the underlying asset identified in step 3.
5. We repeat Step 4 for the longer-term options.
6. We calculate a weighted-mean of the implied volatilities reported by the exchange for the two options selected in steps 4 and 5. These two implied volatility values are given a weight equal to the inverse of time between the option’s expiration date and the target date: `w_i = 1 / abs(target date - expiration_i)`.\
   \
   This has the effect that the IV of an option very close to the target date will dominate the IV of the synthetic option, compared to one much further away.
7. This weighted mean of implied volatilities is the final implied volatility of an at-the-money option with a constant expiration horizon at the calculation time.

## API Endpoints

Implied volatility metrics can be accessed using these endpoints:

* `/timeseries/exchange-asset-metrics`

{% swagger src="../../../.gitbook/assets/openapi.yaml" path="/timeseries/exchange-asset-metrics" method="get" %}
[openapi.yaml](../../../.gitbook/assets/openapi.yaml)
{% endswagger %}

## Example

```
{
  "data": [
    {
      "exchange_asset": "deribit-btc",
      "time": "2024-05-08T00:00:00.000000000Z",
      "volatility_implied_atm_30d_expiration": "0.5161714"
    },
    {
      "exchange_asset": "deribit-btc",
      "time": "2024-05-09T00:00:00.000000000Z",
      "volatility_implied_atm_30d_expiration": "0.5306845"
    },
    {
      "exchange_asset": "deribit-btc",
      "time": "2024-05-10T00:00:00.000000000Z",
      "volatility_implied_atm_30d_expiration": "0.4946762"
    },
    {
      "exchange_asset": "deribit-btc",
      "time": "2024-05-11T00:00:00.000000000Z",
      "volatility_implied_atm_30d_expiration": "0.5138429"
    },
    {
      "exchange_asset": "deribit-btc",
      "time": "2024-05-12T00:00:00.000000000Z",
      "volatility_implied_atm_30d_expiration": "0.5133762"
    }
  ]
}
```

* **`asset`**: The id of the asset.
* **`time`**: The exchange-reported time in ISO 8601 date-time format. Always with nanoseconds precision.
* **`volatility_implied_atm_30d_expiration`**: The annualized implied volatility of an at-the-money option that expires in 30 days.

## Availability for Exchange-Assets

{% embed url="https://coverage.coinmetrics.io/exchange-asset-metrics/volatility_implied_atm_30d_expiration" %}

