# Reported Volume
The reported volume aggregated across all exchanges in CM's coverage universe. These metrics do not use the [Trusted Exchange Framework](https://coinmetrics.io/special-insights/trusted-exchange-framework) to filter for the most accurate and trustworthy crypto exchanges. See [Trusted Volume]("volume\_trusted.md") for more details on the distinction for trustworthy exchanges. 

**Contents**
* [Spot Volume](#spot)
* [Perpetual Future](#future_perpetual)
* [Non-Perpetual Future](#future_nonperpetual)
* [Future Coin-Margined](#coin_margined)
* [Tether Coin-Margined](#tether_margined)

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

## Reported Spot Volume <a name="spot"></a>

### Definition

The sum of all reported volume from the spot markets in Coin Metrics' coverage in units of U.S. dollars.

| Name                         | MetricID                        | Category | Subcategory | Type | Unit | Interval |
| ---------------------------- | ------------------------------- | -------- | ----------- | ---- | ---- | -------- |
| Reported Spot Volume         | [volume\_reported\_spot\_usd\_1d](https://coverage.coinmetrics.io/search-results?query=volume\_reported\_spot\_usd\_1d) | Volume   | Spot        | Sum  | USD  | 1d       |
| Reported Spot Volume, 1 Hour | [volume\_reported\_spot\_usd\_1h](https://coverage.coinmetrics.io/search-results?query=volume\_reported\_spot\_usd\_1h) | Volume   | Spot        | Sum  | USD  | 1h       |

### Details

Our reported volume metric is an aggregation of the reported volume from all exchanges in CM's coverage universe. Covered exchanges can be found [here](../../market-data/all-exchanges.md).


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

| Name                           | MetricID                          | Category | Subcategory | Type | Unit | Interval |
| ------------------------------ | --------------------------------- | -------- | ----------- | ---- | ---- | -------- |
| Reported Future Volume         | [volume\_reported\_future\_usd\_1d](https://coverage.coinmetrics.io/search-results?query=volume\_reported\_future\_usd\_1d) | Volume   | Future      | Sum  | USD  | 1d       |
| Reported Future Volume, 1 Hour | [volume\_reported\_future\_usd\_1h](https://coverage.coinmetrics.io/search-results?query=volume\_reported\_future\_usd\_1h) | Volume   | Future      | Sum  | USD  | 1h       |

### Details

Our reported future volume metric is an aggregation of the reported future volume from all futures exchanges in CM's coverage universe. Covered exchanges can be found [here](../../market-data/all-exchanges.md).

### Chart

![Spot volume and futures volume](../../.gitbook/assets/Coin\_Metrics\_Network\_Data\_2021-08-26T18-41.png)

### Release History

* Release Version. Market Data Feed 2.4 (August 2021)

### See Also

* [Futures Contract Specifications](../market-metadata.md)

## Reported Perpetual Future Volume <a name="future_perpetual"></a>

### Definition

The sum of all reported volume from perpetual futures markets in units of U.S. dollars.[\
](https://docs.coinmetrics.io/asset-metrics/volume/volume\_reported\_future\_coin\_margined\_usd\_1d)

| Name                                     | MetricID                                              | Category | Subcategory | Type | Unit | Interval |
| ---------------------------------------- | ----------------------------------------------------- | -------- | ----------- | ---- | ---- | -------- |
| Reported Perpetual Future Volume         | [volume\_reported\_future\_perpetual\_usd\_1d](https://coverage.coinmetrics.io/search-results?query=volume\_reported\_future\_perpetual\_usd\_1d) | Volume   | Future      | Sum  | USD  | 1d       |
| Reported Perpetual Future Volume, 1 Hour | [volume\_reported\_future\_perpetual\_usd\_1h](https://coverage.coinmetrics.io/search-results?query=volume\_reported\_future\_perpetual\_usd\_1h) | Volume   | Future      | Sum  | USD  | 1h       |

### Details

Our perpetual future volume metric is an aggregation of the reported perpetual futures volume from all futures exchanges in CM's coverage universe. Covered exchanges can be found [here](../../market-data/all-exchanges.md).

### Release History

* Release Version. Market Data Feed 2.4 (August 2021)

### See Also

* [Futures Contract Specifications](../market-metadata.md)

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/volume_reported_future_perpetual_usd_1d" %}

## Reported Non-Perpetual Future Volume <a name="future_nonperpetual"></a>

### Definition

The sum of all reported volume from non-perpetual futures markets in units of U.S. dollars.[\
](https://docs.coinmetrics.io/asset-metrics/volume/volume\_reported\_future\_coin\_margined\_usd\_1d)

| Name                                         | MetricID                                                 | Category | Subcategory | Type | Unit | Interval |
| -------------------------------------------- | -------------------------------------------------------- | -------- | ----------- | ---- | ---- | -------- |
| Reported Non-Perpetual Future Volume         | [volume\_reported\_future\_nonperpetual\_usd\_1d](https://coverage.coinmetrics.io/search-results?query=volume\_reported\_future\_nonperpetual\_usd\_1d) | Volume   | Future      | Sum  | USD  | 1d       |
| Reported Non-Perpetual Future Volume, 1 Hour | [volume\_reported\_future\_nonperpetual\_usd\_1h](https://coverage.coinmetrics.io/search-results?query=volume\_reported\_future\_nonperpetual\_usd\_1h) | Volume   | Future      | Sum  | USD  | 1h       |

### Details

Our non-perpetual future volume metric is an aggregation of the reported non-perpetual futures volume from all futures exchanges in CM's coverage universe. Covered exchanges can be found [here](../../market-data/all-exchanges.md).

### Release History

* Release Version. Market Data Feed 2.4 (August 2021)

### See Also

* [Futures Contract Specifications](../market-metadata.md)

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/volume_reported_future_nonperpetual_usd_1d" %}

## Reported Coin-Margined Future Volume <a name="coin_margined"></a>

### Definition

The sum of all reported volume from futures markets where the margin asset is equivalent to the underlying base asset in units of U.S. dollars.[\
](https://docs.coinmetrics.io/asset-metrics/volume/volume\_reported\_future\_coin\_margined\_usd\_1d)

| Name                                         | MetricID                                                  | Category | Subcategory | Type | Unit | Interval |
| -------------------------------------------- | --------------------------------------------------------- | -------- | ----------- | ---- | ---- | -------- |
| Reported Coin-Margined Future Volume         | [volume_reported_future_coin_margined_usd\_1d](https://coverage.coinmetrics.io/search-results?query=volume_reported_future_coin_margined_usd\_1d) | Volume   | Future      | Sum  | USD  | 1d       |
| Reported Coin-Margined Future Volume, 1 Hour | [volume_reported_future_coin_margined_usd\_1h](https://coverage.coinmetrics.io/search-results?query=volume_reported_future_coin_margined_usd\_1h) | Volume   | Future      | Sum  | USD  | 1h       |

### Details

Our reported coin-margined future volume metric is an aggregation of the reported coin-margined future volume from all futures exchanges in CM's coverage universe. Covered exchanges can be found [here](../../market-data/all-exchanges.md).

## Reported Tether-Margined Future Volume <a name="tether_margined"></a>

### Definition

The sum of all reported volume from futures markets where the margin asset is Tether in units of U.S. dollars.

| Name                                           | MetricID                                             | Category | Subcategory | Type | Unit | Interval |
| ---------------------------------------------- | ---------------------------------------------------- | -------- | ----------- | ---- | ---- | -------- |
| Reported Tether-Margined Future Volume         | [volume_reported_tether_margined_usd\_1d](https://coverage.coinmetrics.io/search-results?query=volume_reported_tether_margined_usd\_1d) | Volume   | Future      | Sum  | USD  | 1d       |
| Reported Tether-Margined Future Volume, 1 Hour | [volume_reported_tether_margined_usd\_1h](https://coverage.coinmetrics.io/search-results?query=volume_reported_tether_margined_usd\_1h) | Volume   | Future      | Sum  | USD  | 1h       |

### Details

Our reported Tether-margined future volume metric is an aggregation of the reported Tether-margined future volume from all futures exchanges in CM's coverage universe. Covered exchanges can be found [here](../../market-data/all-exchanges.md).

### Release History

* Release Version. Market Data Feed 2.4 (August 2021)

### See Also

* [Futures Contract Specifications](../market-metadata.md)

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/volume_reported_future_tether_margined_usd_1d" %}
