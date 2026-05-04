# Staking Supply

## Contents

* [Supply Staked in Validators](validator-supply.md#splystkedntc)
* [Active Staked Supply](validator-supply.md#splyactstkedntv)
* [Total Staked Supply](validator-supply.md#splytotstkedntv)

## Supply Staked by Stakers <a href="#splystkedntc" id="splystkedntc"></a>

### Definition

Supply staked in validators.

| Name                                    | MetricID     | Unit         | Interval      |
| --------------------------------------- | ------------ | ------------ | ------------- |
| Supply Staked by Stakers (native units) | SplyStkedNtv | Native Units | 1 day, 1 hour |
| Supply Staked by Stakers (USD)          | SplyStkedUSD | USD          | 1 day         |

### Details

* For Ethereum:
  * Sum of all balances from all eligible active validators (validators with 'active' or 'pending' status).
* For other assets:
  * Sum of all balances from all eligible stakers (delegators + validators)

### Release History

* Released September 2022.

## Active Staked Supply <a href="#splyactstkedntv" id="splyactstkedntv"></a>

### Definition

Supply from validators that were active that day.

<table><thead><tr><th>Name</th><th width="159">MetricID</th><th>Unit</th><th>Interval</th></tr></thead><tbody><tr><td>Sum of all balances from active stakers (native units)</td><td>SplyActStkedNtv</td><td>Native Units</td><td>1 day, 1 hour</td></tr><tr><td>Sum of all balances from active stakers (USD)</td><td>SplyActStkedUSD</td><td>USD</td><td>1 day</td></tr><tr><td>Sum of all balances from active delegators (native units)</td><td>SplyDelegatorActStkedNtv</td><td>Native units</td><td>1 day</td></tr><tr><td>Sum of all balances from active delegators (USD)</td><td>SplyDelegatorActStkedUSD</td><td>USD</td><td>1 day</td></tr><tr><td>Sum of all balances from active validators (native units)</td><td>SplyValidatorActStkedNtv</td><td>Native Units</td><td>1 day</td></tr><tr><td>Sum of all balances from active validators (USD)</td><td>SplyValidatorActStkedUSD</td><td>USD</td><td>1 day</td></tr></tbody></table>

### Details

* Sum of all balances from actively participating stakers.

### Release History

* Released September 2022.

## Total Staked Supply <a href="#splytotstkedntv" id="splytotstkedntv"></a>

### Definition

Sum of all balances held by all validators.

| Name                               | MetricID        | Unit         | Interval      |
| ---------------------------------- | --------------- | ------------ | ------------- |
| Total Staked Supply (native units) | SplyTotStkedNtv | Native Units | 1 day, 1 hour |
| Total Staked Supply (USD)          | SplyTotStkedUSD | USD          | 1 day         |

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
