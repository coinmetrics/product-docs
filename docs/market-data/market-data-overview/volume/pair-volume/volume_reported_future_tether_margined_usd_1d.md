# Reported Tether-Margined Future Volume

## Definition

The sum of all reported volume from all tether-margined futures markets containing the specified pair in units of U.S. dollars. Tether-margined futures markets are futures markets where the margin currency is Tether.

| Name                                           | Metric                                               | Category | Subcategory | Type | Unit | Frequency |
| ---------------------------------------------- | ---------------------------------------------------- | -------- | ----------- | ---- | ---- | --------- |
| Reported Tether-Margined Future Volume, 1 Day  | <p>volume_reported_tether_</p><p>margined_usd_1d</p> | Volume   | Future      | Sum  | USD  | 1d        |
| Reported Tether-Margined Future Volume, 1 Hour | <p>volume_reported_tether_</p><p>margined_usd_1h</p> | Volume   | Future      | Sum  | USD  | 1h        |

## Details

Our reported spot volume metric is an aggregation of the reported volume for all Tether-margined futures markets containing the specified pair in CM's coverage universe. Covered exchanges can be found [here](../../market-data/all-exchanges.md).

We use the `candle_usd_volume` from our market candles as input into the calculation of this metric. For more information on our market candles, please see the page below.

{% content-ref url="../../market-data-timeseries/market-candles.md" %}
[market-candles.md](../../market-data-timeseries/market-candles.md)
{% endcontent-ref %}

## Example

A sample of the metric `volume_reported_future_tether_margined_usd_1d` for pair `btc-usdt` from our `/timeseries/pair-metrics` API endpoint is provided below.

```
{
  "data" : [ {
    "pair" : "btc-usdt",
    "time" : "2023-04-21T00:00:00.000000000Z",
    "volume_reported_future_tether_margined_usd_1d" : "33078868263.1365"
  }, {
    "pair" : "btc-usdt",
    "time" : "2023-04-22T00:00:00.000000000Z",
    "volume_reported_future_tether_margined_usd_1d" : "16152355230.0029"
  }, {
    "pair" : "btc-usdt",
    "time" : "2023-04-23T00:00:00.000000000Z",
    "volume_reported_future_tether_margined_usd_1d" : "16077712224.8015"
  }, {
    "pair" : "btc-usdt",
    "time" : "2023-04-24T00:00:00.000000000Z",
    "volume_reported_future_tether_margined_usd_1d" : "28756225568.4456"
  }, {
    "pair" : "btc-usdt",
    "time" : "2023-04-25T00:00:00.000000000Z",
    "volume_reported_future_tether_margined_usd_1d" : "25122494069.2362"
  } ]
}
```

* **`pair`**: The id of the pair. Pair ids use the following naming convention: `baseAsset-quoteAsset`.\\
* **`time`**: The time in ISO 8601 date-time format. Always with nanoseconds precision.\\
* **`volume_reported_future_tether_margined_usd_1d`**: The reported future tether-margined volume in U.S. dollars over the interval of 1 day.

## Release History

* [**CM MDF v2.4 on September 1, 2021**](https://coinmetrics.io/cm-market-data-feed-v2-4-release-notes/)

## Availability for Exchanges

{% embed url="https://coverage.coinmetrics.io/exchange-metrics/volume_reported_future_tether_margined_usd_1d" %}
