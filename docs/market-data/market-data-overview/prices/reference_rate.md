# Reference Rate

## **Definition**

The CM Reference Rates represent the reference rate of one unit of the asset in quoted units (USD, BTC, ETH, EUR)

<table data-header-hidden><thead><tr><th></th><th width="179"></th><th></th><th></th></tr></thead><tbody><tr><td>Name</td><td><strong>MetricID</strong></td><td><strong>Unit</strong></td><td><strong>Interval</strong></td></tr><tr><td>Reference Rate</td><td><a href="https://coverage.coinmetrics.io/search-results?query=ReferenceRate">ReferenceRate</a></td><td>USD</td><td>1d, 1d-ny-close, 1h, 1m, 1s, 200ms</td></tr><tr><td>Reference Rate, USD</td><td><a href="https://coverage.coinmetrics.io/search-results?query=ReferenceRateUSD">ReferenceRateUSD</a></td><td>USD</td><td>1d, 1d-ny-close, 1h, 1m, 1s, 200ms</td></tr><tr><td>Reference Rate, BTC</td><td><a href="https://coverage.coinmetrics.io/search-results?query=ReferenceRateBTC">ReferenceRateBTC</a></td><td>BTC</td><td>1d, 1d-ny-close, 1h, 1m, 1s, 200ms</td></tr><tr><td>Reference Rate, ETH</td><td><a href="https://coverage.coinmetrics.io/search-results?query=ReferenceRateETH">ReferenceRateETH</a></td><td>ETH</td><td>1d, 1d-ny-close, 1h, 1m, 1s, 200ms</td></tr><tr><td>Reference Rate, EUR</td><td><a href="https://coverage.coinmetrics.io/search-results?query=ReferenceRateEUR">ReferenceRateEUR</a></td><td>EUR</td><td>1d, 1d-ny-close, 1h, 1m, 1s, 200ms</td></tr></tbody></table>

Please note that `ReferenceRate` and `ReferenceRateUSD` metrics are identical to each other.

## Details

* The CM Reference Rates are published once a day, once an hour, once a minute, once a second, and once every 200 milliseconds and utilizes volume-weighted median, time-weighted average, and inverse price variance-weighted median techniques. \\
* Common use cases for the CM Reference Rates include research, backtesting, calculating net asset value for investment funds, calculating closing prices for indexes or financial benchmarks, serving as a data source for on-chain price oracles, risk management, indicative intraday values for investment funds and financial benchmarks, and settling financial derivatives.\\
* The CM Reference Rates supports multiple frequencies. The daily and hourly frequencies utilize one calculation methodology and the minute, second, and 200 millisecond frequencies ("real-time frequencies") utilize a separate calculation methodology.\\
* The daily and hourly frequencies are calculated at the end of every hour and day, respectively, (the "Calculation Time") and are published within 5 minutes (the “Publication Time”). The real-time frequencies are published in real-time with no delay.\\
* Please note that this metric is served through both the [/timeseries/asset-metrics](https://docs.coinmetrics.io/api/v4#operation/getTimeseriesAssetMetrics) HTTP endpoint and the [/timeseries-stream/asset-metrics](https://docs.coinmetrics.io/api/v4#operation/getTimeseriesStreamAssetMetrics) websocket endpoint. The HTTP endpoint supports the frequencies 1d, 1h, 1m, and 1s. The websocket endpoint supports the frequencies 1s and 200ms.\\
* Please see our [CM Prices Overview](market-data/reference-rates-overview.md) for more information on methodology and policies.

## API Endpoints

`ReferenceRate` metrics are available in the endpoints:

* `/timeseries/asset-metrics`
* `/timeseries-stream/asset-metrics` by passing in the `<metric_id>` in the `metrics` parameter.

{% swagger src="../../.gitbook/assets/openapi.yaml" path="/timeseries/asset-metrics" method="get" %}
[openapi.yaml](../../.gitbook/assets/openapi.yaml)
{% endswagger %}

{% swagger src="../../.gitbook/assets/openapi.yaml" path="/timeseries-stream/asset-metrics" method="get" %}
[openapi.yaml](../../.gitbook/assets/openapi.yaml)
{% endswagger %}

## **Example**

A sample of the reference rates data for Bitcoin with one hour frequency is shown below:

```
{
  "data" : [ {
    "asset" : "btc",
    "time" : "2023-03-23T10:00:00.000000000Z",
    "ReferenceRateUSD" : "27706.6749620105"
  }, {
    "asset" : "btc",
    "time" : "2023-03-23T11:00:00.000000000Z",
    "ReferenceRateUSD" : "27720.9770701344"
  }, {
    "asset" : "btc",
    "time" : "2023-03-23T12:00:00.000000000Z",
    "ReferenceRateUSD" : "27617.113279661"
  }, {
    "asset" : "btc",
    "time" : "2023-03-23T13:00:00.000000000Z",
    "ReferenceRateUSD" : "27633.9196513735"
  }, {
    "asset" : "btc",
    "time" : "2023-03-23T14:00:00.000000000Z",
    "ReferenceRateUSD" : "27450.324137931"
  }
}
```

A sample of the reference rates data for Bitcoin with one second frequency is shown below:

```
{
  "data" : [ {
    "asset" : "btc",
    "time" : "2023-03-23T14:21:37.000000000Z",
    "ReferenceRateUSD" : "27460"
  }, {
    "asset" : "btc",
    "time" : "2023-03-23T14:21:38.000000000Z",
    "ReferenceRateUSD" : "27460"
  }, {
    "asset" : "btc",
    "time" : "2023-03-23T14:21:39.000000000Z",
    "ReferenceRateUSD" : "27460"
  }, {
    "asset" : "btc",
    "time" : "2023-03-23T14:21:40.000000000Z",
    "ReferenceRateUSD" : "27460"
  }, {
    "asset" : "btc",
    "time" : "2023-03-23T14:21:41.000000000Z",
    "ReferenceRateUSD" : "27460"
  }
}
```

* **`asset`**: The ID of the asset.\\
* **`time`**: The reference rate time in ISO 8601 date-time format.\\
* **`ReferenceRateUSD`**: The published reference rate value in U.S. Dollars.

## Release History

* Please see the [Coin Metrics Prices Change Log](https://docs.coinmetrics.io/market-data/methodologies/coin-metrics-prices-methodology#change-log) for release history.

## **Availability for Assets**

Community and pro asset availability does not differ. Community is available via HTTP API only, is limited to 1,000 API requests per 10 minutes per IP address and only showcases the last 24 hours of history for the 1 hour, 1 minute and 1 second frequencies. The full history is available for daily frequencies.

Please see our Coin Metrics Coverage below for our asset coverage universe.

{% embed url="https://coverage.coinmetrics.io/asset-metrics/ReferenceRateUSD" %}
