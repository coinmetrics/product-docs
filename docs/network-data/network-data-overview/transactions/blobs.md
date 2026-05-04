# Blobs

### Contents

* [Blob Carrying Transaction Count](blobs.md#s)
* [Mean Blob Carrying Transactions Per Block Count](blobs.md#mean-blob-carrying-transactions-per-block-count)
* [Median Blob Carrying Transactions Per Block Count](blobs.md#median-blob-carrying-transactions-per-block-count)
* [Count of Transactions including blob inscriptions](blobs.md#count-of-transactions-including-blob-inscriptions)
* [Blob Transaction Count sent to contracts](blobs.md#blob-transaction-count-sent-to-contracts)
* [Blob Transaction Count Layer 2s](blobs.md#blob-transaction-count-layer-2s)

## Blob Count <a href="#s" id="s"></a>

### Definition

Number of transactions carrying a blob in the interval.

| Name                            | MetricID  | Unit         | Interval       |
| ------------------------------- | --------- | ------------ | -------------- |
| Blob Carrying Transaction Count | TxBlobCnt | Transactions | 1 block, 1 day |

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

## Count of Transactions Including Blob Inscriptions

### Definition

The sum count of data inscription transactions using blobs created that interval that were included in the main chain. Data inscription transactions are transactions following ESIP-8.

<table><thead><tr><th width="257">Name</th><th>MetricID</th><th>Unit</th><th>Interval</th></tr></thead><tbody><tr><td>Blob Inscription Tx Cnt</td><td>TxBlobInscrCnt</td><td>Transactions</td><td>1 day</td></tr></tbody></table>

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/TxBlobInscrCnt" %}

## Blob Transaction Count Sent to Contracts

### Definition

The sum count of blob transactions sent to contracts or burn addresses in that interval. Burn addresses are address which contain more than 10 consecutive empty bytes in their binary representation.

<table><thead><tr><th width="257">Name</th><th>MetricID</th><th>Unit</th><th>Interval</th></tr></thead><tbody><tr><td>Blob Contract Tx Cnt</td><td>TxBlobContCnt</td><td>Transactions</td><td>1 day</td></tr></tbody></table>

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/TxBlobContCnt" %}

## Blob Transaction Count Layer 2s

### Definition

Number of blob carrying transactions originating from L2 sequencers, included in the interval.

<table><thead><tr><th width="257">Name</th><th>MetricID</th><th>Unit</th><th>Interval</th></tr></thead><tbody><tr><td>Blob Transactions (layer 2)</td><td>TxBlobL2Cnt</td><td>Transactions</td><td>1 day</td></tr><tr><td>Blob Transactions (Arbitrum)</td><td>TxBlobARBCnt</td><td>Transactions</td><td>1 day</td></tr><tr><td>Blob Transactions (Optimism)</td><td>TxBlobOPCnt</td><td>Transactions</td><td>1 day</td></tr><tr><td>Blob Transactions (Base)</td><td>TxBlobBASECnt</td><td>Transactions</td><td>1 day</td></tr></tbody></table>

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/TxBlobL2Cnt" %}

#### Details

* The aggregate L2 metric (TxBlobL2Cnt) includes all tagged L2 sequencers. This list includes additional L2s that do not have dedicated metrics.

### API Endpoints

Exhange Deposits metrics can be accessed using these endpoints:

* `timeseries/asset-metrics`

and by passing in the metric ID's `TxBlob*` in the `metrics` parameter.

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
