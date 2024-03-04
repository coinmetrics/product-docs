# Contents

* [Empty Blocks](empty-blocks.md#block_count_empty_6b)
* [Consecutive Empty Blocks](empty-blocks.md#block_count_consecutive_empty)
* [Missed Slots](empty-blocks.md#block_missed_slots)


# Empty Blocks<a href="#block_count_empty" id="block_count_empty"></a>

**Definition**

The number of empty blocks in the past 6 blocks. Empty blocks are blocks that do not contain any transactions other than the coinbase. They may be a result of no underlying economic activity leading to no user transactions to mine, or they can be a result of deliberate action by miners. As explored [here](http://dspace.unive.it/handle/10579/15163), there are incentives for miners to work on empty blocks. Since empty blocks consume less space, they can be propagated faster. Additionally, empty blocks can increase fees in times of vibrant network activity, as unprocessed transactions accumulate. If persistent, empty blocks can be very disruptive to a network.

**Dictionary**

<table data-header-hidden><thead><tr><th width="173"></th><th width="213"></th><th width="110"></th><th width="143"></th><th></th><th width="174"></th><th></th></tr></thead><tbody><tr><td>Name</td><td>MetricID</td><td>Category</td><td>Sub-category</td><td>Type</td><td>Unit</td><td>Interval</td></tr><tr><td>Empty Blocks</td><td>block_count_empty_6b</td><td>KRI</td><td>Empty Blocks</td><td>Sum</td><td>Number of blocks</td><td>1 block</td></tr></tbody></table>

**Methodology**

The 6 blocks from the tip of the blockchain (including the most recent block) are assessed, and the number of empty blocks is counted.

**Available Assets**

Bitcoin (BTC), _Ethereum (ETH)\*_

_\*Ethereum data is available up to the merge on 9/15/2022. After that date Ethereum data for this metric is not available_

**Sample Query**

{% embed url="https://api.coinmetrics.io/v4/timeseries/asset-metrics?api_key=%3Cyour_key%3E&assets=btc&frequency=1b&limit_per_asset=1&metrics=block_count_empty_6b&pretty=true" %}

# Consecutive Empty Blocks<a href="#block_count_consecutive_empty" id="block_count_consecutive_empty"></a>

**Definition**

The count of consecutive empty blocks captured within the most-recent 1-minute interval.

**Dictionary**

<table data-header-hidden><thead><tr><th width="170"></th><th width="177"></th><th width="107"></th><th width="106"></th><th></th><th></th><th></th></tr></thead><tbody><tr><td>Name</td><td>MetricID</td><td>Category</td><td>Sub-category</td><td>Type</td><td>Unit</td><td>Interval</td></tr><tr><td>Consecutive Empty Blocks</td><td>block_count_consecutive_empty</td><td>KRI</td><td>Empty Blocks</td><td>Sum</td><td>Count of  Blocks</td><td>1b</td></tr></tbody></table>

**Methodology**

The set of most recently-processed blocks within a 1-minute window are captured and their contents are evaluated. Every consecutive empty block within the window is counted. For Ethereum, the maximum possible value this metric is 5 given that the time between blocks in that network is fixed at 12 seconds.

**Available Assets**

Ethereum (ETH)

**Sample Query**

{% embed url="https://api.coinmetrics.io/v4/timeseries/asset-metrics?api_key=%3Cyour_key%3E&assets=eth&frequency=1b&metrics=block_count_consecutive_empty&pretty=true" %}

# Missed Slots<a href="#block_missed_slots" id="block_missed_slots"></a>

**Definition**

The count of missed slots within the most-recent 1-minute interval. For context, a slot represents an opportunity for a block producer (or validator) to create a block. If the validator fails to produce a block at the slot, it is considered missed and the blockchain progresses to the following slot.

**Dictionary**

| Name         | MetricID             | Category | Sub-category | Type | Unit  | Interval |
| ------------ | -------------------- | -------- | ------------ | ---- | ----- | -------- |
| Missed Slots | block\_missed\_slots | KRI      | Empty Blocks | Sum  | Slots | 1b       |

**Methodology**

This metric infers the number of missed slots on the basis of the time between blocks. If a block takes more than 12 seconds to arrive, it can be inferred that a slot has been missed as per Ethereum’s consensus rules. Note that if two slots are missed consecutively, we would still need to wait until for valid slot to arrive to capture it, as per the methodology.

**Available Assets**

Ethereum (ETH)

**Sample Query**

{% embed url="https://api.coinmetrics.io/v4/timeseries/asset-metrics?api_key=%3Cyour_key%3E&assets=eth&frequency=1b&metrics=block_missed_slots&pretty=true" %}

# API Endpoints

Empty Blocks metrics can be accessed using these endpoints:

* `timeseries/asset-metrics`

and by passing in the metric ID's `block_count_empty*` in the `metrics` parameter.

{% swagger src="../../.gitbook/assets/openapi.yaml" path="/timeseries/asset-metrics" method="get" %}
[openapi.yaml](../../.gitbook/assets/openapi.yaml)
{% endswagger %}

{% tabs %}
{% tab title="Shell" %}
```shell
curl --compressed "https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=block_count_empty_6b&assets=btc&pretty=true&api_key=<your_key>"
```
{% endtab %}

{% tab title="Python" %}
```python
import requests
response = requests.get('https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=block_count_empty_6b&assets=btc&pretty=true&api_key=<your_key>').json()
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
        metrics="block_count_empty_6b", 
        assets="btc",
    ).to_dataframe()
)
```
{% endtab %}
{% endtabs %}

