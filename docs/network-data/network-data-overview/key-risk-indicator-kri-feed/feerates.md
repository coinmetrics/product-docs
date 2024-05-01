# Feerates

## Contents

* [Mean Feerate Mempool (mempool_feerate_mean)](feerates.md#mempool\_feerate\_mean)
* [Median Feerate Mempool (mempool\_feerate\_median)](feerates.md#mempool\_feerate\_median)
* [Next Block Average Feerate (mempool_next_block_approx_feerate_mean)](feerates.md#mempool\_next\_block\_approx\_feerate\_mean)
* [Next Block Maximum Feerate (mempool\_next\_block\_approx\_feerate\_max )](feerates.md#mempool\_next\_block\_approx\_feerate\_max)
* [Next Block Median Feerate (mempool\_next\_block\_approx\_feerate\_median)](feerates.md#mempool\_next\_block\_approx\_feerate\_median)
* [Next Block Minimum Feerate (mempool_next_block_approx_feerate_min)](feerates.md#mempool\_next\_block\_approx\_feerate\_min)
* [Next Block Minimum Recommended Fee (mempool\_next\_block\_inclusion\_approx\_feerate\_min)](feerates.md#mempool\_next\_block\_inclusion\_feerate\_min)

## Mean Feerate Mempool <a href="#mempool_feerate_mean" id="mempool_feerate_mean"></a>

**Definition**

The mean feerate (fee/vsize) of all mempool transactions, in native units per byte. Virtual Size (vsize) is a unit used to measure the size of a bitcoin transaction after the activation of SegWit.

**Dictionary**

<table data-header-hidden><thead><tr><th width="241"></th><th width="221"></th><th width="114"></th><th></th></tr></thead><tbody><tr><td>Name</td><td>MetricID</td><td>Unit</td><td>Interval</td></tr><tr><td>Mean Feerate Mempool</td><td>mempool_feerate_mean</td><td>fee/vsize</td><td>1m</td></tr></tbody></table>

**Methodology**

The mempool is evaluated and the feerate (fee/vsize) attached to all transactions is aggregated. The mean feerate of all transactions is then calculated.

**Available Assets**

Bitcoin (BTC)

**Sample Query**

{% embed url="https://api.coinmetrics.io/v4/timeseries/asset-metrics?api_key=%3Cyour_key%3E&assets=btc&frequency=1m&limit_per_asset=1&metrics=mempool_feerate_mean&pretty=true" %}

## Median Feerate Mempool <a href="#mempool_feerate_median" id="mempool_feerate_median"></a>

**Definition**

The median feerate (fee/vsize) of all mempool transactions in native units per byte. Virtual Size (vsize) is a unit used to measure the size of a bitcoin transaction after the activation of SegWit.

**Dictionary**

| Name                   | MetricID                 | Unit      | Interval |
| ---------------------- | ------------------------ | --------- | -------- |
| Median Feerate Mempool | mempool\_feerate\_median | fee/vsize | 1m       |

**Methodology**

The mempool is evaluated and the feerate (fee/vsize) attached to all transactions is calculated. The median feerate of all transactions is then assessed.

**Available Assets**

Bitcoin (BTC)

**Sample Query**

{% embed url="https://api.coinmetrics.io/v4/timeseries/asset-metrics?api_key=%3Cyour_key%3E&assets=btc&frequency=1m&limit_per_asset=1&metrics=mempool_feerate_median&pretty=true" %}

## Next Block Average Feerate <a href="#mempool_next_block_approx_feerate_mean" id="mempool_next_block_approx_feerate_mean"></a>

**Definition**

The approximate value of the mean feerate for the upcoming blockchain block.

**Dictionary**

<table><thead><tr><th>Name</th><th width="209">MetricID</th><th>Unit</th><th>Interval</th></tr></thead><tbody><tr><td>Next Block Average feerate</td><td>mempool_next_block_approx_feerate_mean</td><td>sats/vbyte</td><td>1m</td></tr></tbody></table>

**Methodology**

The calculation begins by ranking mempool transactions based on how much fees they are paying. A block template is then applied to these transactions with the goal of identifying which transactions rational miners would pick if they were to build a block at that minute The average (mean) feerate of the transactions in that block template is then showcased.

**Available Assets**

Bitcoin (BTC)

**Sample Assets**

{% embed url="https://api.coinmetrics.io/v4/timeseries/asset-metrics?api_key=%3Cyour_key%3E&assets=btc&frequency=1m&limit_per_asset=1&metrics=mempool_next_block_approx_feerate_men&pretty=true" %}

## Next Block Maximum Feerate <a href="#mempool_next_block_approx_feerate_max" id="mempool_next_block_approx_feerate_max"></a>

**Definition**

The approximate value of the maximum feerate for the upcoming blockchain block.

**Dictionary**

| Name                       | MetricID                                   | Unit       | Interval |
| -------------------------- | ------------------------------------------ | ---------- | -------- |
| Next Block Maximum feerate | mempool\_next\_block\_approx\_feerate\_max | sats/vbyte | 1m       |

\\

**Methodology**

The calculation begins by ranking mempool transactions based on how much fees they are paying. A block template is then applied to these transactions with the goal of identifying which transactions rational miners would pick if they were to build a block at that minute The feerate of the highest transaction that would still be included in that block template is then showcased.

**Available Assets**

Bitcoin (BTC)

**Sample Query**

{% embed url="https://api.coinmetrics.io/v4/timeseries/asset-metrics?api_key=%3Cyour_key%3E&assets=btc&frequency=1m&limit_per_asset=1&metrics=mempool_next_block_approx_feerate_max&pretty=true" %}

## Next Block Median Feerate <a href="#mempool_next_block_approx_feerate_median" id="mempool_next_block_approx_feerate_median"></a>

**Definition**

The approximate value of the median feerate for the upcoming blockchain block.

**Dictionary**

| Name                      | MetricID                                      | Unit       | Interval |
| ------------------------- | --------------------------------------------- | ---------- | -------- |
| Next Block Median feerate | mempool\_next\_block\_approx\_feerate\_median | sats/vbyte | 1m       |

**Methodology**

The calculation begins by ranking mempool transactions based on how much fees they are paying. A block template is then applied to these transactions with the goal of identifying which transactions rational miners would pick if they were to build a block at that minute The median feerate of the transactions in that block template is then showcased.

**Available Assets**

Bitcoin (BTC)

**Sample Query**

{% embed url="https://api.coinmetrics.io/v4/timeseries/asset-metrics?api_key=%3Cyour_key%3E&assets=btc&frequency=1m&limit_per_asset=1&metrics=mempool_next_block_approx_feerate_median&pretty=true" %}

## Next Block Minimum Feerate <a href="#mempool_next_block_approx_feerate_min" id="mempool_next_block_approx_feerate_min"></a>

**Definition**

The approximate value of the minimum feerate for the upcoming blockchain block.

**Dictionary**

| Name                       | MetricID                                   | Unit       | Interval |
| -------------------------- | ------------------------------------------ | ---------- | -------- |
| Next Block Minimum feerate | mempool\_next\_block\_approx\_feerate\_min | sats/vbyte | 1m       |

**Methodology**

The calculation begins by ranking mempool transactions based on how much fees they are paying. A block template is then applied to these transactions with the goal of identifying which transactions rational miners would pick if they were to build a block at that minute. The feerate of the lowest transaction that would still be included in that block template is then showcased.

**Available Assets**

Bitcoin (BTC)

**Sample Query**

{% embed url="https://api.coinmetrics.io/v4/timeseries/asset-metrics?api_key=%3Cyour_key%3E&assets=btc&frequency=1m&limit_per_asset=1&metrics=mempool_next_block_approx_feerate_min&pretty=true" %}

## Next Block Minimum Recommended Fee <a href="#mempool_next_block_inclusion_feerate_min" id="mempool_next_block_inclusion_feerate_min"></a>

**Definition**

The recommended minimum feerate required for a transaction to be included in the upcoming blockchain block. This metric differs from mempool\_next\_block\_approx\_feerate\_min in that it accounts for situations where there are many transactions paying the minimum feerate. By adding an additional cushion to the minimum estimate, this metric provides better settlement guarantees.

**Dictionary**

| Name                               | MetricID                                              | Unit       | Interval |
| ---------------------------------- | ----------------------------------------------------- | ---------- | -------- |
| Next Block minimum recommended fee | mempool\_next\_block\_inclusion\_approx\_feerate\_min | sats/vbyte | 1m       |

**Methodology**

The calculation begins by ranking mempool transactions based on how much fees they are paying. A block template is then applied to these transactions with the goal of identifying which transactions rational miners would pick if they were to build a block at that minute The feerate of the lowest transaction that would still be included in that block template is then showcased. Depending on the aggregate size of transactions paying the minimum feerate, additional satoshi units are added in order to increase the likelihood that a transaction paying this feerate will be included in the next block.

**Available Assets**

Bitcoin (BTC)

**Sample Query**

{% embed url="https://api.coinmetrics.io/v4/timeseries/asset-metrics?api_key=%3Cyour_key%3E&assets=btc&frequency=1m&limit_per_asset=1&metrics=mempool_next_block_approx_feerate_min&pretty=true" %}

**Definition**

The approximate value of the minimum feerate for the upcoming blockchain block.

**Dictionary**

| Name                       | MetricID                                   | Unit       | Interval |
| -------------------------- | ------------------------------------------ | ---------- | -------- |
| Next Block Minimum feerate | mempool\_next\_block\_approx\_feerate\_min | sats/vbyte | 1m       |

**Methodology**

The calculation begins by ranking mempool transactions based on how much fees they are paying. A block template is then applied to these transactions with the goal of identifying which transactions rational miners would pick if they were to build a block at that minute. The feerate of the lowest transaction that would still be included in that block template is then showcased.

**Available Assets**

Bitcoin (BTC)

**Sample Query**

{% embed url="https://api.coinmetrics.io/v4/timeseries/asset-metrics?api_key=%3Cyour_key%3E&assets=btc&frequency=1m&limit_per_asset=1&metrics=mempool_next_block_approx_feerate_min&pretty=true" %}

## API Endpoints

Fee Rate metrics can be accessed using these endpoints:

* `timeseries/asset-metrics`

and by passing in the metric ID's `mempool_feerate*` and `mempool_next_block_approx_feerate_*` in the `metrics` parameter.

{% swagger src="../../../.gitbook/assets/openapi.yaml" path="/timeseries/asset-metrics" method="get" %}
[openapi.yaml](../../../.gitbook/assets/openapi.yaml)
{% endswagger %}

{% tabs %}
{% tab title="Shell" %}
```shell
curl --compressed "https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=mempool_feerate_median&assets=btc&pretty=true&api_key=<your_key>"
```
{% endtab %}

{% tab title="Python" %}
```python
import requests
response = requests.get('https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=mempool_feerate_median&assets=btc&pretty=true&api_key=<your_key>').json()
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
        metrics="mempool_feerate_median", 
        assets="btc",
    ).to_dataframe()
)
```
{% endtab %}
{% endtabs %}
