# Fees

## Contents

* [Mempool Fee Sum](fees-1.md#mempool\_fee)
* [Fees entered Mempool 1 minute](fees-1.md)
* [Mempool Fees Mean](fees-1.md)
* [Mean Fees Entered Mempool 1 minute](fees-1.md)
* [Mempool Fees Median](fees-1.md)

## Mempool Fee Sum <a href="#mempool_fee" id="mempool_fee"></a>

**Definition**

The sum value of all mempool transaction fees at a point in time in native units.

**Dictionary**

| Name            | MetricID     | Category | Sub-category | Type | Unit         | Interval |
| --------------- | ------------ | -------- | ------------ | ---- | ------------ | -------- |
| Mempool Fee Sum | mempool\_fee | KRI      | Mempool      | Sum  | Native units | 1m       |

**Methodology**

The mempool is evaluated and all transactions indexed. The value of all transaction fees within these unprocessed transactions is then summed.

**Available Assets**

Bitcoin (BTC)

Sample Query

{% embed url="https://api.coinmetrics.io/v4/timeseries/asset-metrics?api_key=%3Cyour_key%3E&assets=btc&frequency=1m&limit_per_asset=1&metrics=mempool_fee&pretty=true" %}

## Fees entered Mempool 1 minute <a href="#mempool_fee_entered" id="mempool_fee_entered"></a>

[**Definition**The sum value of all mempool transaction fees for all transactions entering the mempool over the course of a 1-minute aggregation window. The beginning of this time window is noted in the “time” field of the response.**DictionaryMethodology**The mempool is evaluated and the fees attached to all transactions that have been entered (new transactions broadcasted by users) in the previous 1-minute interval are counted.**Available Assets**Bitcoin (BTC)**Sample Query**](fees-1.md#mempool\_fee\_entered)

## [Mempool Fees Mean](fees-1.md#mempool\_fee\_entered) <a href="#mempool_fee_mean" id="mempool_fee_mean"></a>

[**Definition**The sum value of all mempool transaction fees at a point in time in native units.**DictionaryMethodology**The mempool is evaluated and all transactions indexed. The mean value of all transaction fees within these unprocessed transactions is then calculated.**Available Assets**Bitcoin (BTC)**Sample Query**](fees-1.md#mempool\_fee\_mean)

## [Mean Fees Entered Mempool 1 minute](fees-1.md#mempool\_fee\_mean) <a href="#mempool_fee_mean_entered" id="mempool_fee_mean_entered"></a>

[**Definition**The mean value of the fees paid for all transactions entering the mempool over the course of a 1-minute aggregation window. The beginning of this time window is noted in the “time” field of the response.**DictionaryMethodology**The mempool is evaluated and the fees attached to all transactions that have been entered (new transactions broadcasted by users) in the previous 1-minute interval are aggregated. The statistical mean of these fees is then calculated.**Available Assets**Bitcoin (BTC)**Sample Query**](fees-1.md#mempool\_fee\_mean\_entered)

## [Mempool Fees Median](fees-1.md#mempool\_fee\_mean\_entered) <a href="#mempool_fee_median" id="mempool_fee_median"></a>

[**Definition**The sum value of all mempool transaction fees at a point in time in native units.**DictionaryMethodology**The mempool is evaluated and all transactions indexed. The median value of all transaction fees within these unprocessed transactions is then calculated.**Available Assets**Bitcoin (BTC)**Sample Query**API EndpointsFees metrics can be accessed using these endpoints:`timeseries/asset-metrics`and by passing in the metric ID's `mempool_fee*` in the `metrics` parameter.](fees-1.md#mempool\_fee\_median)

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
