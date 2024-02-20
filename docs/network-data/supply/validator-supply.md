# Contents

* [Supply Staked in Validators](validator-supply.md#splystkedntc)
* [Sum of all Balances from Active Validators](validator-supply.md#splyactstkedntv)
* [Total Staked Supply](validator-supply.md#splytotstkedntv)

# Supply Staked in Validators<a href="splystkedntv" id="splystkedntc"></a>

## Definition

Supply staked in validators.

| Name                        | MetricID     | Category | Subcategory      | Type | Unit         | Interval |
| --------------------------- | ------------ | -------- | ---------------- | ---- | ------------ | -------- |
| Supply Staked in Validators | SplyStkedNtv | Supply   | Validator Supply | Sum  | Native Units | 1 day    |

## Details

* Sum of all balances from all eligible active validators (validators with 'active' or 'pending' status).

## Release History

* Released September 2022.

# Sum of all Balances from Active Validators<a href="splyactstkedntv" id="splyactstkedntv"></a>

## Definition

Supply from validators that were active that day.

| Name                  | MetricID        | Category | Subcategory      | Type | Unit          | Interval |
| --------------------- | --------------- | -------- | ---------------- | ---- | ------------- | -------- |
| Active Staking Supply | SplyActStkedNtv | Supply   | Validator Supply | Sum  |  Native Units | 1 day    |

## Details

* Sum of all balances from actively participating validators.

## Release History

* Released September 2022.

# Total Staked Supply<a href="splytotstkedntv" id="splytotstkedntv"></a>

## Definition

Sum of all balances held by all validators.

| Name                | MetricID        | Category | Subcategory      | Type | Unit         | Interval |
| ------------------- | --------------- | -------- | ---------------- | ---- | ------------ | -------- |
| Total Staked Supply | SplyTotStkedNtv | Supply   | Validator Supply | Sum  | Native Units | 1 day    |

## Details

* Sum of all balances held by all validators, regardless of status (i.e. rewarded supply, slashed supply, etc.)

## Release History

* Released September 2022.



# API Endpoints

Validator Supply metrics can be accessed using these endpoints:

* `timeseries/asset-metrics`

and by passing in the metric ID's `SplyStked*` in the `metrics` parameter.

{% swagger src="../../.gitbook/assets/openapi.yaml" path="/timeseries/asset-metrics" method="get" %}
[openapi.yaml](../../.gitbook/assets/openapi.yaml)
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
