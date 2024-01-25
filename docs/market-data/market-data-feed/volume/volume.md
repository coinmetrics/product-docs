# Volume

Volume metrics aggregate the **volume of the trading activity** occurring on cryptoasset exchanges.

Coin Metrics calculates several volume metrics for the assets in our coverage universe.&#x20;

## Volume Reported Spot

### Endpoints
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
{% endswagger %}

## Volume Trusted Spot

## Definition

The sum of all volume from the spot markets of a set of trusted exchanges in units of U.S. dollars.[\
](https://docs.coinmetrics.io/info/metrics/volume\_trusted\_spot\_usd\_1d). Exchanges are selected based on the [Trusted Exchange Framework](https://coinmetrics.io/special-insights/trusted-exchange-framework)

| Name                        | MetricID                       | Category | Subcategory | Type | Unit | Interval |
| --------------------------- | ------------------------------ | -------- | ----------- | ---- | ---- | -------- |
| Trusted Spot Volume         | volume\_trusted\_spot\_usd\_1d | Volume   | Spot        | Sum  | USD  | 1d       |
| Trusted Spot Volume, 1 Hour | volume\_trusted\_spot\_usd\_1h | Volume   | Spot        | Sum  | USD  | 1h       |

### Endpoints
{% swagger src="../../../.gitbook/assets/openapi.yaml" path="/timeseries/asset-metrics" method="get" %}
[openapi.yaml](../../../.gitbook/assets/openapi.yaml)
{% endswagger %}

{% swagger src="../../../.gitbook/assets/openapi.yaml" path="/timeseries/pair-metrics" method="get" %}
[openapi.yaml](../../../.gitbook/assets/openapi.yaml)
{% endswagger %}
