# Blobs

### Contents

* [Blob Count](blobs.md#s)
* [Blob Count per blob carrying transaction](blobs.md#s-1)
* [Total Blob Space Used (bytes)](blobs.md#s-2)
* [All Time Blob Space Used (bytes)](blobs.md#s-3)

## Blob Count <a href="#s" id="s"></a>

### Definition

The sum count of blobs created that interval that were included in the main chain.

| Name       | MetricID | Unit  | Interval       |
| ---------- | -------- | ----- | -------------- |
| Blob Count | BlobCnt  | Blobs | 1 block, 1 day |

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/BlobCnt" %}

## Blob Count per blob carrying transaction <a href="#s" id="s"></a>

### Definition

The mean number of blobs per blob carrying transaction.

| Name                                     | MetricID    | Unit  | Interval       |
| ---------------------------------------- | ----------- | ----- | -------------- |
| Blob Count per blob carrying transaction | BlobMeanCnt | Blobs | 1 block, 1 day |

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/BlobMeanCnt" %}

## Total Blob Space Used <a href="#s" id="s"></a>

### Definition

The sum of the size (in bytes) of blob space used in that interval.

| Name                  | MetricID     | Unit  | Interval       |
| --------------------- | ------------ | ----- | -------------- |
| Total Blob Space Used | BlobSizeByte | Bytes | 1 block, 1 day |

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/BlobSizeByte" %}

## All Time Blob Space Used (bytes) <a href="#s" id="s"></a>

### Definition

The mean gas limit per transaction that day.

| Name                             | MetricID            | Unit  | Interval |
| -------------------------------- | ------------------- | ----- | -------- |
| All Time Blob Space Used (bytes) | BlobSizeAllTimeByte | Bytes | 1 day    |

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/BlobSizeAllTimeByte" %}

### API Endpoints

Exhange Deposits metrics can be accessed using these endpoints:

* `timeseries/asset-metrics`

and by passing in the metric ID's `Blob*` in the `metrics` parameter.

{% swagger path="/timeseries/asset-metrics" method="get" %}
{% swagger-description %}

{% endswagger-description %}
{% endswagger %}

{% tabs %}
{% tab title="Shell" %}
```shell
curl --compressed "https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=BlobCnt&assets=eth&pretty=true&api_key=<your_key>"
```
{% endtab %}

{% tab title="Python" %}
```python
import requests
response = requests.get('https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=BlobCnt&assets=eth&pretty=true&api_key=<your_key>').json()
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
        metrics="BlobCnt", 
        assets="eth",
    ).to_dataframe()
)
```
{% endtab %}
{% endtabs %}
