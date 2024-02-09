# Reported Volume

The reported volume aggregated across all exchanges in CM's coverage universe. These metrics do not use the [Trusted Exchange Framework](https://coinmetrics.io/special-insights/trusted-exchange-framework) to filter for the most accurate and trustworthy crypto exchanges. See [Trusted Volume](%22volume\_trusted.md%22) for more details on the distinction for trustworthy exchanges.

**Contents**

* [Spot Volume](volume\_reported.md#spot)
* [Perpetual Future](volume\_reported.md#future\_perpetual)
* [Non-Perpetual Future](volume\_reported.md#future\_nonperpetual)
* [Future Coin-Margined](volume\_reported.md#coin\_margined)
* [Tether Coin-Margined](volume\_reported.md#tether\_margined)

## API Endpoints

All reported volume metrics can be queried using the following endpoints:

* `/timeseries/asset-metrics`
* `/timeseries/exchange-metrics`
* `/timeseries/exchange-asset-metrics`
* `/timeseries/pair-metrics`

and by passing in `volume_reported_*` metric ID's in the the `metrics` parameter.

{% swagger src="../../.gitbook/assets/openapi.yaml" path="/timeseries/asset-metrics" method="get" %}
[openapi.yaml](../../.gitbook/assets/openapi.yaml)
{% endswagger %}

{% swagger src="../../.gitbook/assets/openapi.yaml" path="/timeseries/exchange-metrics" method="get" %}
[openapi.yaml](../../.gitbook/assets/openapi.yaml)
{% endswagger %}

{% swagger src="../../.gitbook/assets/openapi.yaml" path="/timeseries/exchange-asset-metrics" method="get" %}
[openapi.yaml](../../.gitbook/assets/openapi.yaml)
{% endswagger %}

{% swagger src="../../.gitbook/assets/openapi.yaml" path="/timeseries/pair-metrics" method="get" %}
[openapi.yaml](../../.gitbook/assets/openapi.yaml)
{% endswagger %}

[openapi.yaml](../../.gitbook/assets/openapi.yaml)

## Reported Spot Volume <a href="#spot" id="spot"></a>

### Definition

The sum of all reported volume from the spot markets in Coin Metrics' coverage in units of U.S. dollars.

<table><thead><tr><th width="194">Name</th><th width="263">MetricID</th><th>Category</th><th>Subcategory</th><th>Type</th><th>Unit</th><th>Interval</th></tr></thead><tbody><tr><td>Reported Spot Volume</td><td><a href="https://coverage.coinmetrics.io/search-results?query=volume_reported_spot_usd_1d">volume_reported_spot_usd_1d</a></td><td>Volume</td><td>Spot</td><td>Sum</td><td>USD</td><td>1d</td></tr><tr><td>Reported Spot Volume, 1 Hour</td><td><a href="https://coverage.coinmetrics.io/search-results?query=volume_reported_spot_usd_1h">volume_reported_spot_usd_1h</a></td><td>Volume</td><td>Spot</td><td>Sum</td><td>USD</td><td>1h</td></tr></tbody></table>

### Details

Our reported volume metric is an aggregation of the reported volume from all exchanges in CM's coverage universe. Covered exchanges can be found [here](../all-exchanges.md).

### Chart

![Spot volume and futures volume](../../.gitbook/assets/Coin\_Metrics\_Network\_Data\_2021-08-26T18-41.png)

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

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/volume_reported_spot_usd_1d" %}

## Reported Future Volume

### Definition

The sum of all reported future volume from the spot markets in Coin Metrics' coverage in units of U.S. dollars.

<table><thead><tr><th width="201">Name</th><th width="273">MetricID</th><th>Category</th><th>Subcategory</th><th>Type</th><th>Unit</th><th>Interval</th></tr></thead><tbody><tr><td>Reported Future Volume</td><td><a href="https://coverage.coinmetrics.io/search-results?query=volume_reported_future_usd_1d">volume_reported_future_usd_1d</a></td><td>Volume</td><td>Future</td><td>Sum</td><td>USD</td><td>1d</td></tr><tr><td>Reported Future Volume, 1 Hour</td><td><a href="https://coverage.coinmetrics.io/search-results?query=volume_reported_future_usd_1h">volume_reported_future_usd_1h</a></td><td>Volume</td><td>Future</td><td>Sum</td><td>USD</td><td>1h</td></tr></tbody></table>

### Details

Our reported future volume metric is an aggregation of the reported future volume from all futures exchanges in CM's coverage universe. Covered exchanges can be found [here](../all-exchanges.md).

### Chart

![Spot volume and futures volume](../../.gitbook/assets/Coin\_Metrics\_Network\_Data\_2021-08-26T18-41.png)

### Release History

* Release Version. Market Data Feed 2.4 (August 2021)

### See Also

* [Futures Contract Specifications](../market-metadata.md)

## Reported Perpetual Future Volume <a href="#future_perpetual" id="future_perpetual"></a>

### Definition

The sum of all reported volume from perpetual futures markets in units of U.S. dollars.[\
](https://docs.coinmetrics.io/asset-metrics/volume/volume\_reported\_future\_coin\_margined\_usd\_1d)

<table><thead><tr><th width="233">Name</th><th width="351">MetricID</th><th>Category</th><th>Subcategory</th><th>Type</th><th>Unit</th><th>Interval</th></tr></thead><tbody><tr><td>Reported Perpetual Future Volume</td><td><a href="https://coverage.coinmetrics.io/search-results?query=volume_reported_future_perpetual_usd_1d">volume_reported_future_perpetual_usd_1d</a></td><td>Volume</td><td>Future</td><td>Sum</td><td>USD</td><td>1d</td></tr><tr><td>Reported Perpetual Future Volume, 1 Hour</td><td><a href="https://coverage.coinmetrics.io/search-results?query=volume_reported_future_perpetual_usd_1h">volume_reported_future_perpetual_usd_1h</a></td><td>Volume</td><td>Future</td><td>Sum</td><td>USD</td><td>1h</td></tr></tbody></table>

### Details

Our perpetual future volume metric is an aggregation of the reported perpetual futures volume from all futures exchanges in CM's coverage universe. Covered exchanges can be found [here](../all-exchanges.md).

### Release History

* Release Version. Market Data Feed 2.4 (August 2021)

### See Also

* [Futures Contract Specifications](../market-metadata.md)

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/volume_reported_future_perpetual_usd_1d" %}

## Reported Non-Perpetual Future Volume <a href="#future_nonperpetual" id="future_nonperpetual"></a>

### Definition

The sum of all reported volume from non-perpetual futures markets in units of U.S. dollars.[\
](https://docs.coinmetrics.io/asset-metrics/volume/volume\_reported\_future\_coin\_margined\_usd\_1d)

<table><thead><tr><th width="228">Name</th><th width="373">MetricID</th><th>Category</th><th>Subcategory</th><th>Type</th><th>Unit</th><th>Interval</th></tr></thead><tbody><tr><td>Reported Non-Perpetual Future Volume</td><td><a href="https://coverage.coinmetrics.io/search-results?query=volume_reported_future_nonperpetual_usd_1d">volume_reported_future_nonperpetual_usd_1d</a></td><td>Volume</td><td>Future</td><td>Sum</td><td>USD</td><td>1d</td></tr><tr><td>Reported Non-Perpetual Future Volume, 1 Hour</td><td><a href="https://coverage.coinmetrics.io/search-results?query=volume_reported_future_nonperpetual_usd_1h">volume_reported_future_nonperpetual_usd_1h</a></td><td>Volume</td><td>Future</td><td>Sum</td><td>USD</td><td>1h</td></tr></tbody></table>

### Details

Our non-perpetual future volume metric is an aggregation of the reported non-perpetual futures volume from all futures exchanges in CM's coverage universe. Covered exchanges can be found [here](../all-exchanges.md).

### Release History

* Release Version. Market Data Feed 2.4 (August 2021)

### See Also

* [Futures Contract Specifications](../market-metadata.md)

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/volume_reported_future_nonperpetual_usd_1d" %}

## Reported Coin-Margined Future Volume <a href="#coin_margined" id="coin_margined"></a>

### Definition

The sum of all reported volume from futures markets where the margin asset is equivalent to the underlying base asset in units of U.S. dollars.[\
](https://docs.coinmetrics.io/asset-metrics/volume/volume\_reported\_future\_coin\_margined\_usd\_1d)

<table><thead><tr><th width="232">Name</th><th width="391">MetricID</th><th>Category</th><th>Subcategory</th><th>Type</th><th>Unit</th><th>Interval</th></tr></thead><tbody><tr><td>Reported Coin-Margined Future Volume</td><td><a href="https://coverage.coinmetrics.io/search-results?query=volume_reported_future_coin_margined_usd_1d">volume_reported_future_coin_margined_usd_1d</a></td><td>Volume</td><td>Future</td><td>Sum</td><td>USD</td><td>1d</td></tr><tr><td>Reported Coin-Margined Future Volume, 1 Hour</td><td><a href="https://coverage.coinmetrics.io/search-results?query=volume_reported_future_coin_margined_usd_1h">volume_reported_future_coin_margined_usd_1h</a></td><td>Volume</td><td>Future</td><td>Sum</td><td>USD</td><td>1h</td></tr></tbody></table>

### Details

Our reported coin-margined future volume metric is an aggregation of the reported coin-margined future volume from all futures exchanges in CM's coverage universe. Covered exchanges can be found [here](../all-exchanges.md).

## Reported Tether-Margined Future Volume <a href="#tether_margined" id="tether_margined"></a>

### Definition

The sum of all reported volume from futures markets where the margin asset is Tether in units of U.S. dollars.

<table><thead><tr><th width="254">Name</th><th width="359">MetricID</th><th>Category</th><th>Subcategory</th><th>Type</th><th>Unit</th><th>Interval</th></tr></thead><tbody><tr><td>Reported Tether-Margined Future Volume</td><td><a href="https://coverage.coinmetrics.io/search-results?query=volume_reported_tether_margined_usd_1d">volume_reported_tether_margined_usd_1d</a></td><td>Volume</td><td>Future</td><td>Sum</td><td>USD</td><td>1d</td></tr><tr><td>Reported Tether-Margined Future Volume, 1 Hour</td><td><a href="https://coverage.coinmetrics.io/search-results?query=volume_reported_tether_margined_usd_1h">volume_reported_tether_margined_usd_1h</a></td><td>Volume</td><td>Future</td><td>Sum</td><td>USD</td><td>1h</td></tr></tbody></table>

### Details

Our reported Tether-margined future volume metric is an aggregation of the reported Tether-margined future volume from all futures exchanges in CM's coverage universe. Covered exchanges can be found [here](../all-exchanges.md).

### Release History

* Release Version. Market Data Feed 2.4 (August 2021)

### See Also

* [Futures Contract Specifications](../market-metadata.md)

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/volume_reported_future_tether_margined_usd_1d" %}
