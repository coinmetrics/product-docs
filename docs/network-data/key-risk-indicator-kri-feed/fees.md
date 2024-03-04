# Contents

* [Mempool Fee Sum](fees.md#mempool_fee)
* [Fees entered Mempool 1 minute](fees.md#)
* [Mempool Fees Mean](fees.md#)
* [Mean Fees Entered Mempool 1 minute](fees.md#)
* [Mempool Fees Median](fees.md#)

# Mempool Fee Sum<a href="#mempool_fee" id="mempool_fee"></a>

**Definition**

The sum value of all mempool transaction fees at a point in time in native units.

**Dictionary**

| Name            | MetricID     | Category | Sub-category | Type | Unit         | Interval |
| --------------- | ------------ | -------- | ------------ | ---- | ------------ | -------- |
| Mempool Fee Sum | mempool\_fee | KRI      | Mempool      | Sum  | Native units | 1m       |

**Methodology**

The mempool is evaluated and all transactions indexed. The value of all transaction fees within these unprocessed transactions is then summed.

**Available Assets**&#x20;

Bitcoin (BTC)

Sample Query

{% embed url="https://api.coinmetrics.io/v4/timeseries/asset-metrics?api_key=%3Cyour_key%3E&assets=btc&frequency=1m&limit_per_asset=1&metrics=mempool_fee&pretty=true" %}

# Fees entered Mempool 1 minute<a href="#mempool_fee_entered" id="mempool_fee_entered">

**Definition**

The sum value of all mempool transaction fees for all transactions entering the mempool over the course of a 1-minute aggregation window. The beginning of this time window is noted in the “time” field of the response.

**Dictionary**

| Name                          | MetricID                  | Category | Sub-category | Type | Unit         | Interval |
| ----------------------------- | ------------------------- | -------- | ------------ | ---- | ------------ | -------- |
| Fees entered mempool 1 minute | mempool\_fee\_entered\_1m | KRI      | Mempool      | Sum  | Native units | 1m       |

**Methodology**

The mempool is evaluated and the fees attached to all transactions that have been entered (new transactions broadcasted by users) in the previous 1-minute interval are counted.

**Available Assets**&#x20;

Bitcoin (BTC)

**Sample Query**

{% embed url="https://api.coinmetrics.io/v4/timeseries/asset-metrics?api_key=%3Cyour_key%3E&assets=btc&frequency=1m&limit_per_asset=1&metrics=mempool_fee_entered_1m&pretty=true" %}

# Mempool Fees Mean<a href="#mempool_fee_mean" id="mempool_fee_mean">

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



# Mean Fees Entered Mempool 1 minute<a href="#mempool_fee_mean_entered" id="mempool_fee_mean_entered">

**Definition**

The mean value of the fees paid for all transactions entering the mempool over the course of a 1-minute aggregation window. The beginning of this time window is noted in the “time” field of the response.

**Dictionary**

| Name                               | MetricID                        | Category | Sub-category | Type | Unit         | Interval |
| ---------------------------------- | ------------------------------- | -------- | ------------ | ---- | ------------ | -------- |
| Mean Fees entered mempool 1 minute | mempool\_fee\_mean\_entered\_1m | KRI      | Mempool      | Mean | Native units | 1m       |

**Methodology**

The mempool is evaluated and the fees attached to all transactions that have been entered (new transactions broadcasted by users) in the previous 1-minute interval are aggregated. The statistical mean of these fees is then calculated.

**Available Assets**&#x20;

Bitcoin (BTC)

**Sample Query**

{% embed url="https://api.coinmetrics.io/v4/timeseries/asset-metrics?api_key=%3Cyour_key%3E&assets=btc&frequency=1m&limit_per_asset=1&metrics=mempool_fee_mean_entered_1m&pretty=true" %}

# Mempool Fees Median<a href="#mempool_fee_median" id="mempool_fee_median">

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

Fees metrics can be accessed using these endpoints:

* `timeseries/asset-metrics`

and by passing in the metric ID's `mempool_fee*` in the `metrics` parameter.

{% swagger src="../../.gitbook/assets/openapi.yaml" path="/timeseries/asset-metrics" method="get" %}
[openapi.yaml](../../.gitbook/assets/openapi.yaml)
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
