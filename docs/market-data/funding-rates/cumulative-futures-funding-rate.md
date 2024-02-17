# Cumulative Futures Funding Rate

## Definition

The cumulative funding rate is the total funding rate that would be accumulated by contract holders over a specified time period.

<table><thead><tr><th width="228">Name</th><th width="413">MetricID</th><th width="154">Unit</th><th>Interval</th></tr></thead><tbody><tr><td>Funding rate, cumulative, futures, USD-margined, 1 day</td><td><a href="https://coverage.coinmetrics.io/search-results?query=futures_cumulative_funding_rate_usd_margin_1d">futures_cumulative_funding_rate_usd_margin_1d</a></td><td>Dimensionless</td><td>1 hour</td></tr><tr><td>Funding rate, cumulative, futures, USD-margined, 7 days</td><td><a href="https://coverage.coinmetrics.io/search-results?query=futures_cumulative_funding_rate_usd_margin_7d">futures_cumulative_funding_rate_usd_margin_7d</a></td><td>Dimensionless</td><td>1 hour</td></tr><tr><td>Funding rate, cumulative, futures, USD-margined, 30 days</td><td><a href="https://coverage.coinmetrics.io/search-results?query=futures_cumulative_funding_rate_usd_margin_30d">futures_cumulative_funding_rate_usd_margin_30d</a></td><td>Dimensionless</td><td>1 hour</td></tr><tr><td>Funding rate, cumulative, futures, coin-margined, 1 day</td><td><a href="https://coverage.coinmetrics.io/search-results?query=futures_cumulative_funding_rate_coin_margin_1d">futures_cumulative_funding_rate_coin_margin_1d</a></td><td>Dimensionless</td><td>1 hour</td></tr><tr><td>Funding rate, cumulative, futures, coin-margined, 7 days</td><td><a href="https://coverage.coinmetrics.io/search-results?query=futures_cumulative_funding_rate_coin_margin_7d">futures_cumulative_funding_rate_coin_margin_7d</a></td><td>Dimensionless</td><td>1 hour</td></tr><tr><td>Funding rate, cumulative, futures, coin-margined, 30 days</td><td><a href="https://coverage.coinmetrics.io/search-results?query=futures_cumulative_funding_rate_coin_margin_30d">futures_cumulative_funding_rate_coin_margin_30d</a></td><td>Dimensionless</td><td>1 hour</td></tr><tr><td>Funding rate, cumulative, futures, all-margined, 1 day</td><td><a href="https://coverage.coinmetrics.io/search-results?query=futures_cumulative_funding_rate_all_margin_1d">futures_cumulative_funding_rate_all_margin_1d</a></td><td>Dimensionless</td><td>1 hour</td></tr><tr><td>Funding rate, cumulative, futures, all-margined, 7 days</td><td><a href="https://coverage.coinmetrics.io/search-results?query=futures_cumulative_funding_rate_all_margin_7d">futures_cumulative_funding_rate_all_margin_7d</a></td><td>Dimensionless</td><td>1 hour</td></tr><tr><td>Funding rate, cumulative, futures, all-margined, 30 days</td><td><a href="https://coverage.coinmetrics.io/search-results?query=futures_cumulative_funding_rate_all_margin_30d">futures_cumulative_funding_rate_all_margin_30d</a></td><td>Dimensionless</td><td>1 hour</td></tr></tbody></table>

## Details

The `futures_cumulative_funding_rate_usd_margin_*` metrics represent the cumulative average funding rate weighted by open interest from futures markets where the margin asset is U.S. dollars or stablecoins over the previous specified time period.

The `futures_cumulative_funding_rate_coin_margin_*` metrics represent the cumulative average funding rate weighted by open interest from futures markets where the margin asset is equivalent to the underlying base asset over the previous specified time period.

The `futures_cumulative_funding_rate_all_margin_*` metrics represent the cumulative average funding rate weighted by open interest from all futures markets, regardless of the margin asset, over the previous specified time period.

These metrics have a publication frequency of once per hour and represent the cumulative realized funding rate over the previous 1 day, 7 day, and 30 day time periods.

For example, at the market level, the cumulative funding rate for `binance-BTCUSDT-future` over the course of one day would be the cumulative product of the three 8-hour funding settlement rates reported that day. For these metrics, with the CFR being calculated for assets, we leverage our [Aggregate Futures Funding Rate](aggregated-futures-funding-rate.md) to perform this calculation across all relevant markets.

To accumulate the rates hour-over-hour, we first convert the AFR to an hourly rate, multiply the rates together, then convert the product back to the desired rate.

$$
CFR_{L}=\prod_{i=1}^{L} (1 + AFR_{1h,i}) - 1
$$

$$
AFR_{1h,i} = \frac{AFR_{8h,i}}{8}
$$

where $$AFR_{i}$$ is the Aggregate Funding Rate at timestamp $$i$$. The increments $$i$$ are hourly, as $$AFR$$ is published hourly. Thus, `futures_cumulative_funding_rate_usd_margin_1d`is the accumulation of funding rates over the last 24 hours, `futures_cumulative_funding_rate_usd_margin_7d` is the accumulation of funding rates over the last 168 hours, etc.

## **API Endpoints**

Cumulative Futures Funding Rates can be accessed using the `timeseries/asset-metrics` and `timeseries/exchange-asset-metrics` endpoints by passing in `futures_cumulative_funding_rate_usd_margin_*` to the `metrics` parameter.

{% swagger src="../../.gitbook/assets/openapi.yaml" path="/timeseries/asset-metrics" method="get" %}
[openapi.yaml](../../.gitbook/assets/openapi.yaml)
{% endswagger %}

{% swagger src="../../.gitbook/assets/openapi.yaml" path="/timeseries/exchange-asset-metrics" method="get" %}
[openapi.yaml](../../.gitbook/assets/openapi.yaml)
{% endswagger %}

## Example

```
{
  "data" : [ {
    "asset" : "btc",
    "time" : "2023-09-18T19:00:00.000000000Z",
    "futures_cumulative_funding_rate_coin_margin_1d" : "0.0000748325509789538"
  }, {
    "asset" : "btc",
    "time" : "2023-09-18T20:00:00.000000000Z",
    "futures_cumulative_funding_rate_coin_margin_1d" : "0.0000725858255383738"
  }, {
    "asset" : "btc",
    "time" : "2023-09-18T21:00:00.000000000Z",
    "futures_cumulative_funding_rate_coin_margin_1d" : "0.0000703397006305284"
  }, {
    "asset" : "btc",
    "time" : "2023-09-18T22:00:00.000000000Z",
    "futures_cumulative_funding_rate_coin_margin_1d" : "0.0000678449650222124"
  }, {
    "asset" : "btc",
    "time" : "2023-09-18T23:00:00.000000000Z",
    "futures_cumulative_funding_rate_coin_margin_1d" : "0.0000653489780522154"
  } ]
}
```

* **`asset`**: The id of the asset.\\
* **`time`**: The exchange-reported time in ISO 8601 date-time format. Always with nanoseconds precision.\\
* **`futures_cumulative_funding_rate_coin_margin_1d`**: The cumulative funding rate.

## Release History

* Released on September 19, 2023

## Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/futures_cumulative_funding_rate_coin_margin_1d" %}
