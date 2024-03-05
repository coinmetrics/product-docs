# Fees

## Contents

* [Mempool Fee Sum](fees.md#mempool\_fee)
* [Fees entered Mempool 1 minute](fees.md)
* [Mempool Fees Mean](fees.md#mempool_fee_mean)
* [Mean Fees Entered Mempool 1 minute](fees.md)
* [Mempool Fees Median](fees.md)

## Mempool Fee Sum <a href="#mempool_fee" id="mempool_fee"></a>

**Definition**

The sum value of all mempool transaction fees at a point in time in native units.

**Dictionary**

| Name            | MetricID     | Unit         | Interval |
| --------------- | ------------ | ------------ | -------- |
| Mempool Fee Sum | mempool\_fee | Native units | 1m       |

**Methodology**

The mempool is evaluated and all transactions indexed. The value of all transaction fees within these unprocessed transactions is then summed.

**Available Assets**

Bitcoin (BTC)

Sample Query

{% embed url="https://api.coinmetrics.io/v4/timeseries/asset-metrics?api_key=%3Cyour_key%3E&assets=btc&frequency=1m&limit_per_asset=1&metrics=mempool_fee&pretty=true" %}

# Fees entered Mempool 1 minute<a href="#mempool_fee_entered" id="mempool_fee_entered"></a>

**Definition**

The sum value of all mempool transaction fees for all transactions entering the mempool over the course of a 1-minute aggregation window. The beginning of this time window is noted in the “time” field of the response.

**Dictionary**

| Name                          | MetricID                  |  Unit         | Interval |
| ----------------------------- | ------------------------- | ------------ | -------- |
| Fees entered mempool 1 minute | mempool\_fee\_entered\_1m |  Native units | 1m       |

**Methodology**

The mempool is evaluated and the fees attached to all transactions that have been entered (new transactions broadcasted by users) in the previous 1-minute interval are counted.

**Available Assets**&#x20;

Bitcoin (BTC)

**Sample Query**

{% embed url="https://api.coinmetrics.io/v4/timeseries/asset-metrics?api_key=%3Cyour_key%3E&assets=btc&frequency=1m&limit_per_asset=1&metrics=mempool_fee_entered_1m&pretty=true" %}

# Mempool Fees Mean<a href="#mempool_fee_mean" id="mempool_fee_mean"></a>

**Definition**

The sum value of all mempool transaction fees at a point in time in native units.

**Dictionary**

| Name              | MetricID           | Category | Sub-category | Type | Unit         | Interval |
| ----------------- | ------------------ | -------- | ------------ | ---- | ------------ | -------- |
| Mempool Fees Mean | mempool\_fee\_mean | KRI      | Mempool      | Mean | Native units | 1m       |

**Methodology**

The mempool is evaluated and all transactions indexed. The mean value of all transaction fees within these unprocessed transactions is then calculated.

**Available Assets**&#x20;

Bitcoin (BTC)

**Sample Query**

{% embed url="https://api.coinmetrics.io/v4/timeseries/asset-metrics?api_key=%3Cyour_key%3E&assets=btc&frequency=1m&limit_per_asset=1&metrics=mempool_fee_mean&pretty=true" %}

# Mempool Size Entered 1 Minute<a href="#mempool_fee_mean_entered" id="mempool_fee_mean_entered"></a>

**Definition**

The total size in bytes of all transactions that have entered the mempool over the course of a 1-minute aggregation window. The beginning of this time window is noted in the “time” field of the response.&#x20;

**Dictionary**

<table data-header-hidden><thead><tr><th width="162"></th><th width="240"></th><th width="107"></th><th width="144"></th><th></th><th></th><th></th></tr></thead><tbody><tr><td>Name</td><td>MetricID</td><td>Unit</td><td>Interval</td></tr><tr><td>Mempool Size Entered 1m</td><td>mempool_size_entered_1m</td><td>bytes</td><td>1m</td></tr></tbody></table>

**Methodology**

The mempool is evaluated and all transactions within are indexed. The size of all transactions that have entered the mempool in the previous 1-minute window is summed.

**Available Assets**

Bitcoin (BTC)

**Sample Query**

{% embed url="https://api.coinmetrics.io/v4/timeseries/asset-metrics?api_key=%3Cyour_key%3E&assets=btc&frequency=1m&metrics=mempool_size_entered_1m&pretty=true" %}

# Mempool Fees Median <a href="#mempool_fee_median" id="mempool_fee_median"></a>

**Definition**

The sum value of all mempool transaction fees at a point in time in native units.

**Dictionary**

| Name                | MetricID             | Category | Sub-category | Type   | Unit         | Interval |
| ------------------- | -------------------- | -------- | ------------ | ------ | ------------ | -------- |
| Mempool Fees Median | mempool\_fee\_median | KRI      | Mempool      | Median | Native units | 1m       |

**Methodology**

The mempool is evaluated and all transactions indexed. The median value of all transaction fees within these unprocessed transactions is then calculated.

**Available Assets**&#x20;

Bitcoin (BTC)

**Sample Query**

{% embed url="https://api.coinmetrics.io/v4/timeseries/asset-metrics?api_key=%3Cyour_key%3E&assets=btc&frequency=1m&limit_per_asset=1&metrics=mempool_fee_median&pretty=true" %}


# API Endpoints

Fees metrics can be accessed using these endpoints:`timeseries/asset-metrics`and by passing in the metric ID's `mempool_fee*` in the `metrics` parameter.

{% swagger src="../../../.gitbook/assets/openapi.yaml" path="/timeseries/asset-metrics" method="get" %}
[openapi.yaml](../../../.gitbook/assets/openapi.yaml)
{% endswagger %}

{% tabs %}
{% tab title="Shell" %}
```shell
curl --compressed "https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=mempool_fee&assets=btc&pretty=true&api_key=<your_key>"
```
{% endtab %}

{% tab title="Python" %}
```python
import requests
response = requests.get('https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=mempool_fee&assets=btc&pretty=true&api_key=<your_key>').json()
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
        metrics="mempool_fee", 
        assets="btc",
    ).to_dataframe()
)
```
{% endtab %}
{% endtabs %}
