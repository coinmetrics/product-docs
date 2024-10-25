# Validator Supply

## Contents

* [Supply Staked in Validators](validator-supply.md#splystkedntc)
* [Sum of all Balances from Active Validators](validator-supply.md#splyactstkedntv)
* [Total Staked Supply](validator-supply.md#splytotstkedntv)

## Supply Staked in Validators <a href="#splystkedntc" id="splystkedntc"></a>

### Definition

Supply staked in validators.

| Name                        | MetricID     | Unit         | Interval      |
| --------------------------- | ------------ | ------------ | ------------- |
| Supply Staked in Validators | SplyStkedNtv | Native Units | 1 day, 1 hour |

### Details

* Sum of all balances from all eligible active validators (validators with 'active' or 'pending' status).

### Release History

* Released September 2022.

## Sum of all Balances from Active Validators <a href="#splyactstkedntv" id="splyactstkedntv"></a>

### Definition

Supply from validators that were active that day.

<table><thead><tr><th>Name</th><th width="159">MetricID</th><th>Unit</th><th>Interval</th></tr></thead><tbody><tr><td>Active Staking Supply</td><td>SplyActStkedNtv</td><td>Native Units</td><td>1 day, 1 hour</td></tr></tbody></table>

### Details

* Sum of all balances from actively participating validators.

### Release History

* Released September 2022.

## Total Staked Supply <a href="#splytotstkedntv" id="splytotstkedntv"></a>

### Definition

Sum of all balances held by all validators.

| Name                | MetricID        | Unit         | Interval      |
| ------------------- | --------------- | ------------ | ------------- |
| Total Staked Supply | SplyTotStkedNtv | Native Units | 1 day, 1 hour |

### Details

* Sum of all balances held by all validators, regardless of status (i.e. rewarded supply, slashed supply, etc.)

### Release History

* Released September 2022.

## API Endpoints

Validator Supply metrics can be accessed using these endpoints:

* `timeseries/asset-metrics`

and by passing in the metric ID's `SplyStked*` in the `metrics` parameter.

{% swagger src="../../../.gitbook/assets/openapi.yaml" path="/timeseries/asset-metrics" method="get" %}
[openapi.yaml](../../../.gitbook/assets/openapi.yaml)
{% endswagger %}

{% tabs %}
{% tab title="Shell" %}
```shell
curl --compressed "https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=SplyStkedNtv&assets=eth&pretty=true&api_key=<your_key>"
```
{% endtab %}

{% tab title="Python" %}
```python
import requests
response = requests.get('https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=SplyStkedNtv&assets=eth&pretty=true&api_key=<your_key>').json()
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
        metrics="SplyStkedNtv", 
        assets="eth",
    ).to_dataframe()
)
```
{% endtab %}
{% endtabs %}
