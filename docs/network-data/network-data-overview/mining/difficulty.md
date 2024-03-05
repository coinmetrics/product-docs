# Contents

* [Difficulty](difficulty.md#difflast)
* [Mean Difficulty](difficulty.md#diffmean)

# Difficulty<a href="#difflast" id="difflast"></a>

## Definition

The difficulty of the last block in the considered time period. Difficulty represents how hard it is to find a hash that meets the protocol-designated requirement (i.e., the difficulty of finding a new block) that day. The requirement is unique to each applicable cryptocurrency protocol. Difficulty is adjusted periodically by the protocol as a function of how much hashing power is being deployed by miners.

| Name       | MetricID | Category | Subcategory | Type | Unit          | Interval      |
| ---------- | -------- | -------- | ----------- | ---- | ------------- | ------------- |
| Difficulty | DiffLast | Mining   | Mining      | Mean | Dimensionless | 1 day, 1 hour |

## Details

* This metric is not comparable across all chains as its value is dependent on the hashing function used by each chain.

## Chart

<figure><img src="../../.gitbook/assets/BTC_Blocktime_vs._Difficulty_Adjustments.png" alt=""><figcaption></figcaption></figure>

## Chart

<figure><img src="../../.gitbook/assets/Coin_Metrics_Network_Data_2022-09-15T15-37.png" alt=""><figcaption><p>Source: CM Network Data Charts</p></figcaption></figure>

## Asset-Specific Details

* This metric is only available for PoW chains.

## Examples

* Bitcoin’s mining difficulty is a network-determined parameter that automatically adjusts roughly every 2 weeks (2,016 Bitcoin blocks) to target a 10-minute block interval. To maintain this frequency, the algorithm steps in and increases or decreases the difficulty of mining Bitcoin depending on the mining activity on the network. When China banned BTC mining in Q2 of 2021, we saw a drop in mining activity on the network, therefore the difficulty dropped as well.

## Release History

* Released in the 4.2 release of NDP

## Interpretation

* Difficulty is a measure of how difficult it is to mine a block. The greater the difficulty, the more computational power is needed to mine a block.

## See Also

{% content-ref url="hashrate.md" %}
[hashrate.md](hashrate.md)
{% endcontent-ref %}

{% content-ref url="diffmean.md" %}
[diffmean.md](diffmean.md)
{% endcontent-ref %}

{% content-ref url="../network-usage/blkintmean.md" %}
[blkintmean.md](../network-usage/blkintmean.md)
{% endcontent-ref %}

## Availability for Assets<a href="#diffmean" id="diffmean"></a>

{% embed url="https://coverage.coinmetrics.io/asset-metrics/DiffLast" %}

# Mean Difficulty

## Definition

The mean difficulty of finding a hash that meets the protocol-designated requirement (i.e., the difficulty of finding a new block) that day. The requirement is unique to each applicable cryptocurrency protocol. Difficulty is adjusted periodically by the protocol as a function of how much hashing power is being deployed by miners.

| Name            | MetricID | Category | Subcategory | Type | Unit          | Interval |
| --------------- | -------- | -------- | ----------- | ---- | ------------- | -------- |
| Mean Difficulty | DiffMean | Mining   | Mining      | Mean | Dimensionless | 1 day    |

## Details

* This metric is not comparable across all chains as its value is dependent on the hashing function used by each chain.

## Chart

<figure><img src="../../.gitbook/assets/BTC_Mean_Difficulty___Price (1).png" alt=""><figcaption><p>Source: CM Network Data Charts</p></figcaption></figure>

## Examples

* When the majority of the Bitcoin blocks are produced at 10 minutes, the difficulty adjustments will not be significant. This could indicate new miners are not getting online and existing ones are not shutting off their operations.

## Asset-Specific Details

* This metric is only available for PoW chains.

## Interpretation

* This measures how difficult and time consuming it is to find the right hash for each block

## Release History

* Released in the 1.0 release of NDP

## See Also

{% content-ref url="difflast.md" %}
[difflast.md](difflast.md)
{% endcontent-ref %}

## Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/DiffMean" %}

# API Endpoints

<Subcategory> metrics can be accessed using these endpoints:

* `timeseries/asset-metrics`

and by passing in the metric ID's `Diff*` in the `metrics` parameter.

{% swagger src="../../.gitbook/assets/openapi.yaml" path="/timeseries/asset-metrics" method="get" %}
[openapi.yaml](../../.gitbook/assets/openapi.yaml)
{% endswagger %}

{% tabs %}
{% tab title="Shell" %}
```shell
curl --compressed "https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=DiffMean&assets=btc&pretty=true&api_key=<your_key>"
```
{% endtab %}

{% tab title="Python" %}
```python
import requests
response = requests.get('https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=DiffMean&assets=btc&pretty=true&api_key=<your_key>').json()
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
        metrics="DiffMean", 
        assets="btc",
    ).to_dataframe()
)
```
{% endtab %}
{% endtabs %}
