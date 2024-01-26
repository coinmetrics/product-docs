# Volume

Volume metrics aggregate the **volume of the trading activity** occurring on cryptoasset exchanges.

Coin Metrics calculates several volume metrics for the assets in our coverage universe.&#x20;

## Volume Reported Spot

### Definition

The sum of all reported volume from the spot markets in Coin Metrics' coverage in units of U.S. dollars.

| Name                         | MetricID                        | Category | Subcategory | Type | Unit | Interval |
| ---------------------------- | ------------------------------- | -------- | ----------- | ---- | ---- | -------- |
| Reported Spot Volume         | volume\_reported\_spot\_usd\_1d | Volume   | Spot        | Sum  | USD  | 1d       |
| Reported Spot Volume, 1 Hour | volume\_reported\_spot\_usd\_1h | Volume   | Spot        | Sum  | USD  | 1h       |

### Details

Our reported volume metric is an aggregation of the reported volume from all exchanges in CM's coverage universe. Covered exchanges can be found [here](../../market-data/all-exchanges.md).

### API Endpoints

Reported Spot Volume can be accessed using the following API Endpoints:

{% swagger src="../../../.gitbook/assets/openapi.yaml" path="/timeseries/asset-metrics" method="get" %}
[openapi.yaml](../../../.gitbook/assets/openapi.yaml)
{% endswagger %}

{% swagger src="../../../.gitbook/assets/openapi.yaml" path="/timeseries/exchange-metrics" method="get" %}
[openapi.yaml](../../../.gitbook/assets/openapi.yaml)
{% endswagger %}

{% swagger src="../../../.gitbook/assets/openapi.yaml" path="/timeseries/exchange-asset-metrics" method="get" %}
[openapi.yaml](../../../.gitbook/assets/openapi.yaml)
{% endswagger %}

{% swagger src="../../../.gitbook/assets/openapi.yaml" path="/timeseries/pair-metrics" method="get" %}
[openapi.yaml](../../../.gitbook/assets/openapi.yaml)

### Chart

![Spot volume and futures volume](../../../.gitbook/assets/Coin\_Metrics\_Network\_Data\_2021-08-26T18-41.png)

### Examples

A sample of the daily reported spot volume for Bitcoin is shown below:

| assets | time                | volume\_reported\_spot\_usd\_1d |
| ------ | ------------------- | ------------------------------- |
| btc    | 2021-07-25 00:00:00 | 7790004055.86305                |
| btc    | 2021-07-26 00:00:00 | 27380811113.0087                |
| btc    | 2021-07-27 00:00:00 | 16167140594.9998                |
| btc    | 2021-07-28 00:00:00 | 19318207388.4525                |

* asset. The IDs of the asset.
* time. The reference rate time in ISO 8601 date-time format.
* reported\_trusted\_spot\_usd\_1d. The reported volume value in units of U.S. dollars.

### Release History

* Release Version. Market Data Feed 2.4 (August 2021)

### See Also

* [Trusted Volume](volume\_trusted\_spot\_usd\_1d.md)
* [Reported Future Volume](volume\_reported\_future\_usd\_1d.md)
* [Reported Coin-Margined Future Volume](volume\_reported\_future\_coin\_margined\_usd\_1d.md)
* [Reported Non-Perpetual Future Volume](volume\_reported\_future\_nonperpetual\_usd\_1d.md)
* [Reported Perpetual Future Volume](volume\_reported\_future\_perpetual\_usd\_1d.md)
* [Reported Tether-Margined Future Volume](volume\_reported\_future\_tether\_margined\_usd\_1d.md)

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/volume_reported_spot_usd_1d" %}

{% endswagger %}

## Volume Trusted Spot

### Definition

The sum of all volume from the spot markets of a set of trusted exchanges in units of U.S. dollars.[\
](https://docs.coinmetrics.io/info/metrics/volume\_trusted\_spot\_usd\_1d). Exchanges are selected based on the [Trusted Exchange Framework](https://coinmetrics.io/special-insights/trusted-exchange-framework)

| Name                        | MetricID                       | Category | Subcategory | Type | Unit | Interval |
| --------------------------- | ------------------------------ | -------- | ----------- | ---- | ---- | -------- |
| Trusted Spot Volume         | volume\_trusted\_spot\_usd\_1d | Volume   | Spot        | Sum  | USD  | 1d       |
| Trusted Spot Volume, 1 Hour | volume\_trusted\_spot\_usd\_1h | Volume   | Spot        | Sum  | USD  | 1h       |

### API Endpoints

Trusted Spot Volume can be accessed using the following endpoints by passing `volume_trusted_spot_usd_1d` or `volume_trusted_spot_usd_1h` into the `metrics` parameter.

{% swagger src="../../../.gitbook/assets/openapi.yaml" path="/timeseries/asset-metrics" method="get" %}
[openapi.yaml](../../../.gitbook/assets/openapi.yaml)
{% endswagger %}

{% swagger src="../../../.gitbook/assets/openapi.yaml" path="/timeseries/pair-metrics" method="get" %}
[openapi.yaml](../../../.gitbook/assets/openapi.yaml)
{% endswagger %}

### Chart

![Trusted volume as a portion of total volume](../../../../.gitbook/assets/BTC\_Trusted\_and\_Non-Trusted\_Volume.png)

### Examples

A sample of the hourly trusted volumes data for Bitcoin is shown below:

| assets | time                | volume\_trusted\_spot\_usd\_1d |
| ------ | ------------------- | ------------------------------ |
| btc    | 2020-09-21 00:00:00 | 44395555400                    |
| btc    | 2020-09-22 00:00:00 | 60004540100                    |
| btc    | 2020-09-23 00:00:00 | 45919134800                    |

* asset. The IDs of the asset.
* time. The reference rate time in ISO 8601 date-time format.
* volume\_trusted\_spot\_usd\_1d. The trusted volume value in units of U.S. dollars.

### Release History

* Release Version. Market Data Feed v2.2 - Jan 21, 2021 rollout (not a separate MDF version)

### Interpretation

Fake trading volume is a persistent problem on crypto exchanges. With little regulatory oversight, it can be difficult to determine whether reported volume numbers are accurate or exaggerated. At Coin Metrics, we’ve taken a data driven approach to the problem and offer a trusted volume metric to help identify legitimate trading volume. Our trusted volume metric is an aggregation of the reported volume from exchanges that we consider the most accurate and trustworthy. This is based on a combination of both quantitative and qualitative features. Our framework for measuring the reporting quality of an exchange is broken down into three broad categories: volume correlation, web traffic analytics and qualitative features. Each of these three categories culminates in a pass/fail test. Exchanges that pass all three measures are included in our trusted volume set of metrics. The current set of trusted volume metrics consider spot markets only and do not include futures or options markets.

### See Also

* [Trusted Volume Framework](https://coinmetrics.io/q3-refresh-of-trusted-spot-volume-framework/)
* [Reported Spot Volume](volume\_reported\_spot\_usd\_1d.md)

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/volume_trusted_spot_usd_1d" %}

