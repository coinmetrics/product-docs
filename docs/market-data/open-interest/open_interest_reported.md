# Contents
* [Reported Coin Margined](#coin_margined)
* [Reported Non-Perpetual](#non_perpetual)
* [Reported Perpetual](#perpetual)
* [Reported Tether Margined](#tether_margined)
* [Reported Futures](#reported)

## API Endpoints

All reported open interest metrics can be queried using the following endpoints:
* `/timeseries/asset-metrics`
* `/timeseries/exchange-metrics`
* `/timeseries/exchange-asset-metrics`
* `/timeseries/pair-metrics`

 and by passing in `open_interest_reported_*` metric ID's in the the `metrics` parameter.

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

# Reported Coin-Margined Future Open Interest <a name="coin_margined"></a>

## Definition

The sum of all reported open interested from futures markets where the margin asset is equivalent to the underlying base asset in units of U.S. dollars.

| Name                                        | MetricID                                                              | Category      | Subcategory | Type | Unit | Frequency |
| ------------------------------------------- | --------------------------------------------------------------------- | ------------- | ----------- | ---- | ---- | --------- |
| Reported Coin-Margined Future Open Interest | open\_interest\_reported\_future\_coin\_margined\_usd | Open Interest | Future      | Sum  | USD  | 1h, 1d    |

## Details

Our reported coin-margined future open interest metric is an aggregation of the reported coin-margined future open interest from all futures exchanges in CM's coverage universe. Covered exchanges can be found [here](../all-exchanges.md).

## Release History

* Release Version. Market Data Feed 2.4 (August 2021)

## See Also

* [Futures Contract Specifications](../market-metadata.md)
* [Market Open Interest](market-open-interest.md)
* [Reported Coin-Margined Future Volume](../volume/volume\_reported\_future\_coin\_margined\_usd\_1d.md)

## Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/open_interest_reported_future_coin_margined_usd" %}


# Reported Non-Perpetual Future Open Interest <a name="non_perpetual"></a>

## Definition

The sum of all reported open interest from non-perpetual futures markets in units of U.S. dollars.[\
](https://docs.coinmetrics.io/asset-metrics/volume/volume\_reported\_future\_coin\_margined\_usd\_1d)

| Name                                        | MetricID                                                     | Category      | Subcategory | Type | Unit | Frequency |
| ------------------------------------------- | ------------------------------------------------------------ | ------------- | ----------- | ---- | ---- | --------- |
| Reported Non-Perpetual Future Open Interest | open\_interest\_reported\_future\_nonperpetual\_usd | Open Interest | Future      | Sum  | USD  | 1h, 1d    |

## Details

Our non-perpetual future open interest metric is an aggregation of the reported non-perpetual futures open interest from all futures exchanges in CM's coverage universe. Covered exchanges can be found [here](../all-exchanges.md).

## Release History

* Release Version. Market Data Feed 2.4 (August 2021)

## See Also

* [Futures Contract Specifications](../market-metadata.md)
* [Market Open Interest](../market-open-interest.md)
* [Reported Non-Perpetual Future Volume](../volume/volume\_reported\_future\_nonperpetual\_usd\_1d.md)

## Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/open_interest_reported_future_nonperpetual_usd" %}

# Reported Perpetual Future Open Interest <a name="perpetual"></a>

## Definition

The sum of all reported open interest from perpetual futures markets in units of U.S. dollars.[\
](https://docs.coinmetrics.io/asset-metrics/volume/volume\_reported\_future\_coin\_margined\_usd\_1d)

| Name                                    | MetricID                                                  | Category      | Subcategory | Type | Unit | Frequency |
| --------------------------------------- | --------------------------------------------------------- | ------------- | ----------- | ---- | ---- | --------- |
| Reported Perpetual Future Open Interest | open\_interest\_reported\_future_\_perpetual\_usd</p> | Open Interest | Future      | Sum  | USD  | 1h, 1d    |

## Details

Our perpetual future open interest metric is an aggregation of the reported perpetual futures open interest from all futures exchanges in CM's coverage universe. Covered exchanges can be found [here](../all-exchanges.md).

## Release History

* Release Version. Market Data Feed 2.4 (August 2021)

## See Also

* [Futures Contract Specifications](../../market-data-timeseries/market-metadata.md)
* [Market Open Interest](../../market-data-timeseries/market-open-interest.md)
* [Reported Perpetual Future Volume](../volume/volume\_reported\_future\_perpetual\_usd\_1d.md)

## Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/open_interest_reported_future_perpetual_usd" %}

# Reported Tether-Margined Future Open Interest <a name="tether_margined"></a>

## Definition

The sum of all reported open interest from futures markets where the margin asset is Tether in units of U.S. dollars.

| Name                                          | MetricID                                                | Category      | Subcategory | Type | Unit | Frequency |
| --------------------------------------------- | ------------------------------------------------------- | ------------- | ----------- | ---- | ---- | --------- |
| Reported Tether-Margined Future Open Interest | open\_interest\_reported\_future\_tether\_margined\_usd | Open Interest | Future      | Sum  | USD  | 1h, 1d    |

## Details

Our reported Tether-margined future open interest metric is an aggregation of the reported Tether-margined future open interest from all futures exchanges in CM's coverage universe. Covered exchanges can be found [here](../all-exchanges.md).

## Release History

* Release Version. Market Data Feed 2.4 (August 2021)

## See Also

* [Futures Contract Specifications](../market-metadata.md)
* [Market Open Interest](market-open-interest.md)
* [Reported Tether-Margined Future Volume](../volume/volume\_reported\_future\_tether\_margined\_usd\_1d.md)

## Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/open_interest_reported_future_tether_margined_usd" %}


# Reported Future Open Interest <a name="reported"></a>

## Definition

The sum of all reported future open interest from the spot markets in Coin Metrics' coverage in units of U.S. dollars.

| Name                          | MetricID                              | Category      | Subcategory | Type | Unit | Frequency |
| ----------------------------- | ------------------------------------- | ------------- | ----------- | ---- | ---- | --------- |
| Reported Future Open Interest | open\_interest\_reported\_future\_usd | Open Interest | Future      | Sum  | USD  | 1h, 1d    |

## Details

Our reported future open interest metric is an aggregation of the reported future open interest from all futures exchanges in CM's coverage universe. Covered exchanges can be found [here](../all-exchanges.md).

## Release History

* Release Version. Market Data Feed 2.4 (August 2021)

## Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/open_interest_reported_future_usd" %}

# Reported Future Open Interest

## Definition

The sum of all reported future open interest from the spot markets in Coin Metrics' coverage in units of U.S. dollars.

| Name                          | MetricID                              | Category      | Subcategory | Type | Unit | Frequency |
| ----------------------------- | ------------------------------------- | ------------- | ----------- | ---- | ---- | --------- |
| Reported Future Open Interest | open\_interest\_reported\_future\_usd | Open Interest | Future      | Sum  | USD  | 1h, 1d    |

## Details

Our reported future open interest metric is an aggregation of the reported future open interest from all futures exchanges in CM's coverage universe. Covered exchanges can be found [here](../all-exchanges.md).

## Release History

* Release Version. Market Data Feed 2.4 (August 2021)

## Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/open_interest_reported_future_usd" %}


