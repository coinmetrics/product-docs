# Blobs

### Contents

* [Blob Count](blobs.md#s)
* [Blob Count per blob carrying transaction](blobs.md#s-1)
* [Total Blob Space Used (bytes)](blobs.md#s-2)
* [All Time Blob Space Used (bytes)](blobs.md#s-3)
* [Unique Blob Count](blobs.md#s-4)
* [Blob Count in Txs sent to contracts](blobs.md#s-5)
* [Blob Space Used by Layer 2s](blobs.md#s-6)
* [Inscription Count](blobs.md#s-7)

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

## Unique Blob Count <a href="#s" id="s"></a>

### Definition

The sum count of distinct blobs created that interval that were included in the main chain.

| Name              | MetricID    | Unit  | Interval |
| ----------------- | ----------- | ----- | -------- |
| Blob Unique Count | BlobUniqCnt | Blobs | 1 day    |

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/BlobUniqCnt" %}

## Blob Count in Txs sent to Contracts <a href="#s" id="s"></a>

### Definition

The sum count of blobs, created by transactions sent to smart contracts or burn addresses, in that interval that were included in the main chain. Burn addresses are address which contain more than 10 consecutive empty bytes in their binary representation.

| Name                    | MetricID    | Unit  | Interval |
| ----------------------- | ----------- | ----- | -------- |
| Blobs Count (contracts) | BlobContCnt | Blobs | 1 day    |

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/BlobContCnt" %}

## Blob Space Used by Layer 2s <a href="#s" id="s"></a>

### Definition

The sum of the size (in bytes) of blob space used in that interval by tagged Layer 2 sequencers

| Name                       | MetricID         | Unit  | Interval |
| -------------------------- | ---------------- | ----- | -------- |
| Blob Space Used (layer 2)  | BlobL2SizeByte   | Bytes | 1 day    |
| Blob Space Used (Arbitrum) | BlobARBSizeByte  | Bytes | 1 day    |
| Blob Space Used (Optimism) | BlobOPSizeByte   | Bytes | 1 day    |
| Blob Space Used (Base)     | BlobBASESizeByte | Bytes | 1 day    |

#### Details

* The aggregate L2 metric (BlobL2SizeByte) includes all tagged L2 sequencers. This list includes additional L2s that do not have dedicated metrics.

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/BlobL2SizeByte" %}

## Inscription Count <a href="#s" id="s"></a>

### Definition

The sum count of data inscription blobs created that interval that were included in the main chain. Data inscription blobs are blobs created in transactions following ESIP-8

| Name                       | MetricID     | Unit  | Interval |
| -------------------------- | ------------ | ----- | -------- |
| Blobs Count (inscriptions) | BlobInscrCnt | Blobs | 1 day    |

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/BlobInscrCnt" %}

### API Endpoints

Exhange Deposits metrics can be accessed using these endpoints:

* `timeseries/asset-metrics`

and by passing in the metric ID's `Blob*` in the `metrics` parameter.

<mark style="color:blue;">`GET`</mark> `undefined/timeseries/asset-metrics`

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
