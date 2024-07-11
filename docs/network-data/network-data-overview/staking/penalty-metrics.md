# Penalty Metrics

## Contents

* [Penalty Amounts](penalty-metrics.md#penaltyntv)

## Penalty Amounts <a href="#penaltyntv" id="penaltyntv"></a>

### Definition

Amount of tokens taken as penalty from Validators in native units.&#x20;

| Name            | MetricID   | Unit         | Interval |
| --------------- | ---------- | ------------ | -------- |
| Penalty Amounts | PenaltyNtv | Native Units | 1 day    |

### Details

* Due to the nature of how penalties are enforced, this metric operates on a 1 day frequency to accurately represent penalties.

### Asset Specific Details

* This metric is available for Ethereum only under the ETH\_CL ticker. The definition of penalties follows that of Ethereum as outlined here: [https://ethereum.org/en/developers/docs/consensus-mechanisms/pos/rewards-and-penalties/#penalties](https://ethereum.org/en/developers/docs/consensus-mechanisms/pos/rewards-and-penalties/#penalties)

### Release History

* Released November 2023.

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/PenaltyNTV" %}

## API Endpoints

Flows metrics can be accessed using these endpoints:

* `timeseries/asset-metrics`

and by passing in the metric ID's `PenaltyNtv` in the `metrics` parameter.

{% swagger src="../../../.gitbook/assets/openapi.yaml" path="/timeseries/asset-metrics" method="get" %}
[openapi.yaml](../../../.gitbook/assets/openapi.yaml)
{% endswagger %}

{% tabs %}
{% tab title="Shell" %}
```shell
curl --compressed "https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=PenaltyNtv&assets=eth&pretty=true&api_key=<your_key>"
```
{% endtab %}

{% tab title="Python" %}
```python
import requests
response = requests.get('https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=PenaltyNtv&assets=eth&pretty=true&api_key=<your_key>').json()
print(response)
```
{% endtab %}

{% tab title="Python Client" %}
```python
from coinmetrics.api_client import CoinMetricsClient

api_key = "<API_KEY>"
client = CoinMetricsClient(api_key)

print(
    client.get_asset_metrics(
        metrics="PenaltyNtv", 
        assets="eth",
    ).to_dataframe()
)
```
{% endtab %}
{% endtabs %}
