# Aggregated Futures Funding Rate

## Definition

The average funding rate weighted by open interest from futures markets converted to a specified time period.

<table><thead><tr><th width="227">Name</th><th width="468">MetricID</th><th>Category</th><th>Subcategory</th><th>Type</th><th>Unit</th><th>Interval</th></tr></thead><tbody><tr><td>Funding rate, aggregated, futures, USD-margined, 8 hours</td><td><a href="https://coverage.coinmetrics.io/search-results?query=futures_aggregate_funding_rate_usd_margin_8h_period">futures_aggregate_funding_rate_usd_margin_8h_period</a></td><td>Market</td><td>Futures</td><td>Percentage</td><td>Dimensionless</td><td>1 hour</td></tr><tr><td>Funding rate, aggregated, futures, USD-margined, 1 day</td><td><a href="https://coverage.coinmetrics.io/search-results?query=futures_aggregate_funding_rate_usd_margin_1d_period">futures_aggregate_funding_rate_usd_margin_1d_period</a></td><td>Market</td><td>Futures</td><td>Percentage</td><td>Dimensionless</td><td>1 hour</td></tr><tr><td>Funding rate, aggregated, futures, USD-margined, 30 days</td><td><a href="https://coverage.coinmetrics.io/search-results?query=futures_aggregate_funding_rate_usd_margin_30d_period">futures_aggregate_funding_rate_usd_margin_30d_period</a></td><td>Market</td><td>Futures</td><td>Percentage</td><td>Dimensionless</td><td>1 hour</td></tr><tr><td>Funding rate, aggregated, futures, USD-margined, 1 year</td><td><a href="https://coverage.coinmetrics.io/search-results?query=futures_aggregate_funding_rate_usd_margin_1y_period">futures_aggregate_funding_rate_usd_margin_1y_period</a></td><td>Market</td><td>Futures</td><td>Percentage</td><td>Dimensionless</td><td>1 hour</td></tr><tr><td>Funding rate, aggregated, futures, coin-margined, 8 hours</td><td><a href="https://coverage.coinmetrics.io/search-results?query=futures_aggregate_funding_rate_coin_margin_8h_period">futures_aggregate_funding_rate_coin_margin_8h_period</a></td><td>Market</td><td>Futures</td><td>Percentage</td><td>Dimensionless</td><td>1 hour</td></tr><tr><td>Funding rate, aggregated, futures, coin-margined, 1 day</td><td><a href="https://coverage.coinmetrics.io/search-results?query=futures_aggregate_funding_rate_coin_margin_1d_period">futures_aggregate_funding_rate_coin_margin_1d_period</a></td><td>Market</td><td>Futures</td><td>Percentage</td><td>Dimensionless</td><td>1 hour</td></tr><tr><td>Funding rate, aggregated, futures, coin-margined, 30 days</td><td><a href="https://coverage.coinmetrics.io/search-results?query=futures_aggregate_funding_rate_coin_margin_30d_period">futures_aggregate_funding_rate_coin_margin_30d_period</a></td><td>Market</td><td>Futures</td><td>Percentage</td><td>Dimensionless</td><td>1 hour</td></tr><tr><td>Funding rate, aggregated, futures, coin-margined, 1 year</td><td><a href="https://coverage.coinmetrics.io/search-results?query=futures_aggregate_funding_rate_coin_margin_1y_period">futures_aggregate_funding_rate_coin_margin_1y_period</a></td><td>Market</td><td>Futures</td><td>Percentage</td><td>Dimensionless</td><td>1 hour</td></tr><tr><td>Funding rate, aggregated, futures, all-margined, 8 hours</td><td><a href="https://coverage.coinmetrics.io/search-results?query=futures_aggregate_funding_rate_all_margin_8h_period">futures_aggregate_funding_rate_all_margin_8h_period</a></td><td>Market</td><td>Futures</td><td>Percentage</td><td>Dimensionless</td><td>1 hour</td></tr><tr><td>Funding rate, aggregated, futures, all-margined, 1 day</td><td><a href="https://coverage.coinmetrics.io/search-results?query=futures_aggregate_funding_rate_all_margin_1d_period">futures_aggregate_funding_rate_all_margin_1d_period</a></td><td>Market</td><td>Futures</td><td>Percentage</td><td>Dimensionless</td><td>1 hour</td></tr><tr><td>Funding rate, aggregated, futures, all-margined, 30 days</td><td><a href="https://coverage.coinmetrics.io/search-results?query=futures_aggregate_funding_rate_all_margin_30d_period">futures_aggregate_funding_rate_all_margin_30d_period</a></td><td>Market</td><td>Futures</td><td>Percentage</td><td>Dimensionless</td><td>1 hour</td></tr><tr><td>Funding rate, aggregated, futures, all-margined, 1 year</td><td><a href="https://coverage.coinmetrics.io/search-results?query=futures_aggregate_funding_rate_all_margin_1y_period">futures_aggregate_funding_rate_all_margin_1y_period</a></td><td>Market</td><td>Futures</td><td>Percentage</td><td>Dimensionless</td><td>1 hour</td></tr></tbody></table>

## Details

The `futures_aggregate_funding_rate_usd_margin_*` metrics represent the average funding rate weighted by open interest from perpetual futures markets where the margin asset is U.S. dollars or stablecoins converted to a specified time period.

The `futures_aggregate_funding_rate_coin_margin_*` metrics represent the average funding rate weighted by open interest from perpetual futures markets where the margin asset is equivalent to the underlying base asset converted to a specified period.

The `futures_aggregate_funding_rate_all_margin_*` metrics represent the average funding rate weighted by open interest from all perpetual futures markets, regardless of the margin asset, converted to a specified time period.

These metrics have a publication frequency of once per hour and represent the average funding rate converted to 8 hour, 1 day, 30 day, and 1 year time periods.

Most, but not all, exchanges pay out the funding rate every 8 hours. Thus, standardizing the funding rate period is a step needed for each of the calculation of the funding rate metrics. For a funding rate $$FR$$ with an period $$P$$, expressed in hours, the 8-hour funding rate $$FR_{8}$$ is calculated as follows:

$$
FR_{8} = \frac{P}{8} FR
$$

For a list of markets $$X$$, where each market $$m$$ has funding rate $$FR_{m}$$ and open interest $$OI_{m}$$ converted to U.S. dollars, the aggregate funding rate $$AFR_{X}$$ is calculated as:

$$
AFR_{x} = \frac{\sum_{m \in X} OI_{m} FR_{m,8}}{\sum_{m \in X} OI_{m}}
$$

## **API Endpoints**

Aggregate Futures Funding Rates can be accessed using the `timeseries/asset-metrics` and `timeseries/exchange-asset-metrics` endpoints by passing in `futures_aggregate_funding_rate_usd_margin_*` to the `metrics` parameter.

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
    "time" : "2023-09-19T19:00:00.000000000Z",
    "futures_aggregate_funding_rate_all_margin_8h_period](https://coverage.coinmetrics.io/search-results?query=)" : "0.0000301358130541726"
  }, {
    "asset" : "btc",
    "time" : "2023-09-19T20:00:00.000000000Z",
    "futures_aggregate_funding_rate_all_margin_8h_period](https://coverage.coinmetrics.io/search-results?query=)" : "0.0000305589276681095"
  }, {
    "asset" : "btc",
    "time" : "2023-09-19T21:00:00.000000000Z",
    "futures_aggregate_funding_rate_all_margin_8h_period](https://coverage.coinmetrics.io/search-results?query=)" : "0.0000327674045704149"
  }, {
    "asset" : "btc",
    "time" : "2023-09-19T22:00:00.000000000Z",
    "futures_aggregate_funding_rate_all_margin_8h_period](https://coverage.coinmetrics.io/search-results?query=)" : "0.0000328893535861447"
  }, {
    "asset" : "btc",
    "time" : "2023-09-19T23:00:00.000000000Z",
    "futures_aggregate_funding_rate_all_margin_8h_period](https://coverage.coinmetrics.io/search-results?query=)" : "0.0000328738735624742"
  } ]
}
```

* **`asset`**: The id of the asset.\\
* **`time`**: The exchange-reported time in ISO 8601 date-time format. Always with nanoseconds precision.\\
* **`futures_aggregate_funding_rate_all_margin_8h_period](https://coverage.coinmetrics.io/search-results?query=)`**: The weighted-average funding rate.

## Release History

* Released on September 19, 2023

## Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/futures_aggregate_funding_rate_all_margin_8h_period](https://coverage.coinmetrics.io/search-results?query=)" %}
