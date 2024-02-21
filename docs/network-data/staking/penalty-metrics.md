# Contents

* [Penalty Amounts](flows.md#penaltyntv)

# Penalty Amounts<a href="#penaltyntv" id="penaltyntv">

## Definition

Total amout of penalties enforced by the protocol in native units.

| Penalty Amounts | PenaltyNTV | Staking | Consensus Health | Sum | Native Units | 1 day |
| --------------- | ---------- | ------- | ---------------- | --- | ------------ | ----- |

## Details

* Due to the nature of how penalties are enforced, this metric operates on a 1 day frequency to accurately represent penalties.

## Release History

* Released November 2023.

## Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/PenaltyNTV" %}

# API Endpoints

Flows metrics can be accessed using these endpoints:

* `timeseries/asset-metrics`

and by passing in the metric ID's `PenaltyNtv` in the `metrics` parameter.

{% swagger src="../../.gitbook/assets/openapi.yaml" path="/timeseries/asset-metrics" method="get" %}
[openapi.yaml](../../.gitbook/assets/openapi.yaml)
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
