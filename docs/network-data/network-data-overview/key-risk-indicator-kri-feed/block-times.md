# Block Times

## Contents

* [Time between blocks (time\_inter\_block)](block-times.md#time\_inter\_block)
* [Time Since Last Block (time\_since\_last\_block)](block-times.md#time\_since\_last\_block)

## Time between blocks <a href="#time_inter_block" id="time_inter_block"></a>

**Definition**

The time elapsed between the block at the tip of the chain (the most recent block) and its predecessor.

**Dictionary**

| Name                | MetricID           | Unit    | Interval |
| ------------------- | ------------------ | ------- | -------- |
| Time between blocks | time\_inter\_block | seconds | 1 minute |

**Methodology**

The metric is computed as the time difference between the arrival of the block at the chain tip as seen by our nodes, and the arrival of the previous block.

**Available Assets**

Bitcoin (BTC), Ethereum (ETH)

**Sample Query**

{% embed url="https://api.coinmetrics.io/v4/timeseries/asset-metrics?api_key=%3Cyour_key%3E&assets=btc&frequency=1m&limit_per_asset=1&metrics=time_inter_block&pretty=true" %}

## Time Since Last Block <a href="#time_since_last_block" id="time_since_last_block"></a>

**Definition**

The time elapsed between the current time and the last block at the tip of the chain (the most recent block).

**Dictionary**

| Name                  | MetricID                 | Category | Sub-category     | Type  | Unit    | Interval |
| --------------------- | ------------------------ | -------- | ---------------- | ----- | ------- | -------- |
| Time since last block | time\_since\_last\_block | KRI      | Block Attributes | Delta | seconds | 1 minute |

**Methodology**

The metric is computed as the time difference between the arrival of the block at the chain tip as seen by our nodes, and the current time. As a timestamp for the block at the chain tip this metric uses the concept of miner\_time (for more on the differences between miner\_time and consensus\_time refer to our [wiki article](../../../on-chain-data/methodologies/on-chain-basics.md) on normalizing timestamps). For Bitcoin, miner\_time can be set arbitrarily by miners which can impact the value of this metric.

**Available Assets**

Bitcoin (BTC), Ethereum (ETH)

**Sample Query**

{% embed url="https://api.coinmetrics.io/v4/timeseries/asset-metrics?api_key=%3Cyour_key%3E&assets=btc,eth&frequency=1m&limit_per_asset=1&metrics=time_since_last_block&pretty=true" %}

## API Endpoints

Block time metrics can be accessed using these endpoints:

* `timeseries/asset-metrics`

and by passing in the metric ID's `time_*` in the `metrics` parameter.

{% swagger src="../../../.gitbook/assets/openapi.yaml" path="/timeseries/asset-metrics" method="get" %}
[openapi.yaml](../../../.gitbook/assets/openapi.yaml)
{% endswagger %}

{% tabs %}
{% tab title="Shell" %}
```shell
curl --compressed "https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=time_inter_block&assets=btc&pretty=true&api_key=<your_key>"
```
{% endtab %}

{% tab title="Python" %}
```python
import requests
response = requests.get('https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=time_inter_block&assets=btc&pretty=true&api_key=<your_key>').json()
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
        metrics="time_inter_block", 
        assets="btc",
    ).to_dataframe()
)
```
{% endtab %}
{% endtabs %}
