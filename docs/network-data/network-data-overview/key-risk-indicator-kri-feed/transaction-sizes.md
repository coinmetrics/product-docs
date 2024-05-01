# Transaction Sizes

## Contents

* [Mempool Size (mempool\_size)](transaction-sizes.md#mempool\_size)
* [Mempool Size Entered (mempool_size_entered)](transaction-sizes.md#mempool\_size\_entered)
* [Mempool Size Left (mempool_size_left)](transaction-sizes.md#mempool\_size\_left)
* [Mempool vSize (mempool_vsize)](transaction-sizes.md#mempool\_vsize)
* [Mempool vSize Entered (mempool_vsize_entered)](transaction-sizes.md#mempool\_vsize\_entered)
* [Mempool vSize Left (mempool_vsize_left)](transaction-sizes.md#mempool\_vsize\_left)

## Mempool Size <a href="#mempool_size" id="mempool_size"></a>

**Definition**

The total size of all transactions in the mempool, in bytes.

**Dictionary**

| Name         | MetricID      | Unit  | Interval |
| ------------ | ------------- | ----- | -------- |
| Mempool Size | mempool\_size | bytes | 1m       |

**Methodology**

The mempool is evaluated and all transactions within are indexed. The size of all transactions is summed.

**Available Assets**

Bitcoin (BTC)

**Sample Query**

{% embed url="https://api.coinmetrics.io/v4/timeseries/asset-metrics?api_key=%3Cyour_key%3E&assets=btc&frequency=1m&metrics=mempool_size&pretty=true" %}

## Mempool Size Entered <a href="#mempool_size_entered" id="mempool_size_entered"></a>

**Definition**

The total size in bytes of all transactions that have entered the mempool over the course of a 1-minute aggregation window. The beginning of this time window is noted in the “time” field of the response.

**Dictionary**

<table data-header-hidden><thead><tr><th width="162"></th><th width="240"></th><th></th><th></th></tr></thead><tbody><tr><td>Name</td><td>MetricID</td><td>Unit</td><td>Interval</td></tr><tr><td>Mempool Size Entered 1m</td><td>mempool_size_entered_1m</td><td>bytes</td><td>1m</td></tr></tbody></table>

**Methodology**

The mempool is evaluated and all transactions within are indexed. The size of all transactions that have entered the mempool in the previous 1-minute window is summed.

**Available Assets**

Bitcoin (BTC)

**Sample Query**

{% embed url="https://api.coinmetrics.io/v4/timeseries/asset-metrics?api_key=%3Cyour_key%3E&assets=btc&frequency=1m&metrics=mempool_size_entered_1m&pretty=true" %}

## Mempool Size Left <a href="#mempool_size_left" id="mempool_size_left"></a>

**Definition**

The total size in bytes of all transactions that have left the mempool over the course of a 1-minute aggregation window. The beginning of this time window is noted in the “time” field of the response.

**Dictionary**

<table data-header-hidden><thead><tr><th width="162"></th><th width="240"></th><th></th><th></th></tr></thead><tbody><tr><td>Name</td><td>MetricID</td><td>Unit</td><td>Interval</td></tr><tr><td>Mempool Size Left 1m</td><td>mempool_size_left_1m</td><td>bytes</td><td>1m</td></tr></tbody></table>

**Methodology**

The mempool is evaluated and all transactions within are indexed. The size of all transactions that have left the mempool in the previous 1-minute window is summed.

**Available Assets**

Bitcoin (BTC)

**Sample Query**

{% embed url="https://api.coinmetrics.io/v4/timeseries/asset-metrics?api_key=%3Cyour_key%3E&assets=btc&frequency=1m&metrics=mempool_size_left_1m&pretty=true" %}

## Mempool vSize <a href="#mempool_vsize" id="mempool_vsize"></a>

**Definition**

The total virtual size (vsize) of all transactions in the mempool, in virtual bytes. [Virtual Size (vsize)](https://en.bitcoin.it/wiki/Weight\_units) is a unit used to measure the size of bitcoin transactions after the activation of SegWit.

**Dictionary**

| Name          | MetricID       | Unit          | Interval |
| ------------- | -------------- | ------------- | -------- |
| Mempool vsize | mempool\_vsize | Virtual bytes | 1m       |

**Methodology**

The mempool is evaluated and all transactions within are indexed. The virtual size of all transactions is summed.

**Available Assets**

Bitcoin (BTC)

**Sample Query**

{% embed url="https://api.coinmetrics.io/v4/timeseries/asset-metrics?api_key=%3Cyour_key%3E&assets=btc&frequency=1m&limit_per_asset=1&metrics=mempool_vsize&pretty=true" %}

## Mempool vSize Entered <a href="#mempool_vsize_entered" id="mempool_vsize_entered"></a>

**Definition**

The total virtual size (vsize) of all transactions that have entered the mempool over the course of a 1-minute aggregation window. The beginning of this time window is noted in the “time” field of the response. [Virtual Size (vsize)](https://en.bitcoin.it/wiki/Weight\_units) is a unit used to measure the size of a bitcoin transaction after the activation of SegWit.

**Dictionary**

| Name                           | MetricID                    | Unit          | Interval |
| ------------------------------ | --------------------------- | ------------- | -------- |
| Mempool vsize entered 1 minute | mempool\_vsize\_entered\_1m | Virtual bytes | 1m       |

**Methodology**

The mempool is evaluated and all transactions within are indexed. The virtual size of all transactions that have entered the mempool in the previous 1-minute window is summed.

**Available Assets**

Bitcoin (BTC)

**Sample Query**

{% embed url="https://api.coinmetrics.io/v4/timeseries/asset-metrics?api_key=%3Cyour_key%3E&assets=btc&frequency=1m&limit_per_asset=1&metrics=mempool_vsize_entered_1m&pretty=true" %}

## Mempool vSize Left <a href="#mempool_vsize_left" id="mempool_vsize_left"></a>

**Definition**

The total virtual size (vsize), in bytes, of all transactions that have left the mempool over the course of a 1- minute aggregation window. The beginning of this time window is noted in the “time” field of the response. [Virtual Size (vsize)](https://en.bitcoin.it/wiki/Weight\_units) is a unit used to measure the size of a bitcoin transaction after the activation of SegWit.

**Dictionary**

| Name                        | MetricID                 | Unit          | Interval |
| --------------------------- | ------------------------ | ------------- | -------- |
| Mempool vsize left 1 minute | mempool\_vsize\_left\_1m | Virtual bytes | 1m       |

**Methodology**

The mempool is evaluated and all transactions within are indexed. The virtual size of all transactions that have left the mempool in the previous 1-minute window is summed.

**Available Assets**

Bitcoin (BTC)

**Sample Query**

{% embed url="https://api.coinmetrics.io/v4/timeseries/asset-metrics?api_key=%3Cyour_key%3E&assets=btc&frequency=1m&limit_per_asset=1&metrics=mempool_vsize_left_1m&pretty=true" %}

## API Endpoints

metrics can be accessed using these endpoints:

* `timeseries/asset-metrics`

and by passing in the metric ID's `mempool_size*` and `mempool_vsize_*` in the `metrics` parameter.

{% swagger src="../../../.gitbook/assets/openapi.yaml" path="/timeseries/asset-metrics" method="get" %}
[openapi.yaml](../../../.gitbook/assets/openapi.yaml)
{% endswagger %}

{% tabs %}
{% tab title="Shell" %}
```shell
curl --compressed "https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=mempool_size&assets=btc&pretty=true&api_key=<your_key>"
```
{% endtab %}

{% tab title="Python" %}
```python
import requests
response = requests.get('https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=mempool_size&assets=btc&pretty=true&api_key=<your_key>').json()
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
        metrics="mempool_size", 
        assets="btc",
    ).to_dataframe()
)
```
{% endtab %}
{% endtabs %}
