# Blobs

### Contents

* [Blob Carrying Transaction Count](blobs.md#s)
* [Mean Blob Carrying Transactions Per Block Count](blobs.md#mean-blob-carrying-transactions-per-block-count)
* [Median Blob Carrying Transactions Per Block Count](blobs.md#median-blob-carrying-transactions-per-block-count)

## Blob Count <a href="#s" id="s"></a>

### Definition

Number of transactions carrying a blob in the interval.

| Name                            | MetricID  | Unit              | Interval       |
| ------------------------------- | --------- | ----------------- | -------------- |
| Blob Carrying Transaction Count | TxBlobCnt | BloTransactionsbs | 1 block, 1 day |

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/TxBlobCnt" %}

## Mean Blob Carrying Transactions Per Block Count

### Definition

Mean number of transactions per block, carrying a blob in the interval

| Name                                            | MetricID      | Unit         | Interval |
| ----------------------------------------------- | ------------- | ------------ | -------- |
| Mean Blob Carrying Transactions Per Block Count | TxBlobMeanCnt | Transactions | 1 day    |

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/TxBlobMeanCnt" %}

## Median Blob Carrying Transactions Per Block Count

### Definition

Median number of transactions per block carrying a blob in the interval

| Name                                              | MetricID     | Unit         | Interval |
| ------------------------------------------------- | ------------ | ------------ | -------- |
| Median Blob Carrying Transactions Per Block Count | TxBlobMedCnt | Transactions | 1 day    |

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/TxBlobMedCnt" %}

### API Endpoints

Exhange Deposits metrics can be accessed using these endpoints:

* `timeseries/asset-metrics`

and by passing in the metric ID's `TxBlob*` in the `metrics` parameter.

{% swagger path="/timeseries/asset-metrics" method="get" %}
{% swagger-description %}

{% endswagger-description %}
{% endswagger %}

{% tabs %}
{% tab title="Shell" %}
```shell
curl --compressed "https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=TxBlobCnt&assets=eth&pretty=true&api_key=<your_key>"
```
{% endtab %}

{% tab title="Python" %}
```python
import requests
response = requests.get('https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=TxBlobCnt&assets=eth&pretty=true&api_key=<your_key>').json()
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
        metrics="TxBlobCnt", 
        assets="eth",
    ).to_dataframe()
)
```
{% endtab %}
{% endtabs %}
