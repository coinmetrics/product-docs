# Rewards

## Contents

* [Average Mining Reward (mining\_reward\_mean)](rewards.md#mining\_reward\_mean)
* [Mining Reward Spread (mining\_reward\_spread)](rewards.md#mining\_reward\_spread)

## Average Mining Reward <a href="#mining_reward_mean" id="mining_reward_mean"></a>

**Definition**

The mean mining reward (transaction fees + issuance) of the blocks currently being mined across all major mining pools, in native units (e.g. units of BTC).

**Dictionary**

| Name                  | MetricID             | Unit         | Interval |
| --------------------- | -------------------- | ------------ | -------- |
| Average Mining Reward | mining\_reward\_mean | Native units | 1m       |

**Methodology**

Coin Metrics collects data from major mining pools through the Stratum protocol, a popular software used by individual miners to connect to mining pools. That enables Coin Metrics to access all data a mining pool constituent would normally see. In order to compute this metric, the coinbase transactions of all blocks currently being worked on by major mining pools are aggregated and assessed. The statistical mean is then calculated.

**Available Assets**

Bitcoin (BTC)

**Sample Query**

{% embed url="https://api.coinmetrics.io/v4/timeseries/asset-metrics?api_key=%3Cyour_key%3E&assets=btc&frequency=1m&limit_per_asset=1&metrics=mining_reward_mean&pretty=true" %}

## Mining Reward Spread <a href="#mining_reward_spread" id="mining_reward_spread"></a>

**Definition**

The difference between the highest and lowest miner reward of the blocks being mined by the major mining pools.

**Dictionary**

| Name                 | MetricID               | Unit         | Interval |
| -------------------- | ---------------------- | ------------ | -------- |
| Mining Reward Spread | mining\_reward\_spread | Native units | 1m       |

**Methodology**

Coin Metrics collects data from major mining pools through the Stratum protocol, a popular software used by individual miners to connect to pools. That enables Coin Metrics to access all data an individual constituent of a mining pool would normally receive. In order to compute this metric, the coinbase transactions of all blocks currently being worked on by major mining pools are aggregated and assessed. The difference between the highest and lowest coinbase transaction is then calculated.

**Available Assets**

Bitcoin (BTC)

**Sample Query**

{% embed url="https://api.coinmetrics.io/v4/timeseries/asset-metrics?api_key=%3Cyour_key%3E&assets=btc&frequency=1m&limit_per_asset=1&metrics=mining_reward_spread&pretty=true" %}

## API Endpoints

metrics can be accessed using these endpoints:

* `timeseries/asset-metrics`

and by passing in the metric ID's `mining_reward*` in the `metrics` parameter.

{% swagger src="../../../.gitbook/assets/openapi.yaml" path="/timeseries/asset-metrics" method="get" %}
[openapi.yaml](../../../.gitbook/assets/openapi.yaml)
{% endswagger %}

{% tabs %}
{% tab title="Shell" %}
```shell
curl --compressed "https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=mining_reward_mean&assets=btc&pretty=true&api_key=<your_key>"
```
{% endtab %}

{% tab title="Python" %}
```python
import requests
response = requests.get('https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=mining_reward_mean&assets=btc&pretty=true&api_key=<your_key>').json()
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
        metrics="mining_reward_mean", 
        assets="btc",
    ).to_dataframe()
)
```
{% endtab %}
{% endtabs %}
