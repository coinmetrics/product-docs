# Balances

## Contents

* [Miner Supply](balances.md#splyminer0hopall)
* [Supply One Hop from Miners](balances.md#splyminer1hopall)

## Miner Supply <a href="#splyminer0hopall" id="splyminer0hopall"></a>

### Definition

The sum of the balances of all mining entities. A mining entity is defined as an address that has been credited from a transaction debiting the 'FEES' or 'ISSUANCE' accounts in accordance with Coin Metric’s Universal Blockchain Data Model (UBDM).

| Name                        | MetricID            | Unit         | Interval |
| --------------------------- | ------------------- | ------------ | -------- |
| Miner Supply (native units) | SplyMiner0HopAllNtv | Native units | 1 day    |
| Miner Supply (USD)          | SplyMiner0HopAllUSD | USD          | 1 day    |

### Details

* For more details on how this metric is computed, please refer to our blog post introducing [Miner Flows](https://coinmetrics.substack.com/p/coin-metrics-state-of-the-network-3e2)
* This metric will initially only be available for Bitcoin.

### Release History

* Release Version: NDP-EOD 4.8 (Nov, 2020)

### Availability for Assets

{% embed url="https://docs.coinmetrics.io/info/metrics/SplyMiner0HopAllNtv" %}

## Supply One Hop from Miners <a href="#splyminer1hopall" id="splyminer1hopall"></a>

### Definition

The sum of the balances of all addresses within one hop of a mining entity. An address within one hop of a mining entity is defined as an address that has been credited from a transaction debiting the 'FEES' or 'ISSUANCE' accounts in accordance with Coin Metric’s Universal Blockchain Data Model (UBDM), or any address that has been credited in a transaction sent by such an address.

| Name                                      | MetricID            | Unit         | Interval |
| ----------------------------------------- | ------------------- | ------------ | -------- |
| Supply One Hop from Miners (native units) | SplyMiner1HopAllNtv | Native units | 1 day    |
| Supply One Hop from Miners (USD)          | SplyMiner1HopAllUSD | USD          | 1 day    |

### Details

* For more details on how this metric is computed, please refer to our blog post introducing [Miner Flows](https://coinmetrics.substack.com/p/coin-metrics-state-of-the-network-3e2)
* This metric will initially only be available for Bitcoin.

### Release History

* Release Version: NDP-EOD 4.8 (Nov, 2020)

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/SplyMiner1HopAllUSD" %}

## API Endpoints

Mining balance metrics can be accessed using these endpoints:

* `timeseries/asset-metrics`

and by passing in the metric ID's `SplyMiner{n}HopAll*` in the `metrics` parameter.

{% swagger src="../../../.gitbook/assets/openapi.yaml" path="/timeseries/asset-metrics" method="get" %}
[openapi.yaml](../../../.gitbook/assets/openapi.yaml)
{% endswagger %}

{% tabs %}
{% tab title="Shell" %}
```shell
curl --compressed "https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=SplyMiner0HopAllNtv&assets=btc&pretty=true&api_key=<your_key>"
```
{% endtab %}

{% tab title="Python" %}
```python
import requests
response = requests.get('https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=SplyMiner0HopAllNtv&assets=btc&pretty=true&api_key=<your_key>').json()
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
        metrics="SplyMiner0HopAllNtv", 
        assets="btc",
    ).to_dataframe()
)
```
{% endtab %}
{% endtabs %}
