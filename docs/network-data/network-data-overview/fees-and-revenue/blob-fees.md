# Blob Fees

### Contents

* [Total blob fees (FeeBlobTotNtv, FeeBlobTotUSD)](blob-fees.md#total-blob-fees)
* [Mean blob fees (FeeBlobMeanNtv, FeeBlobMeanUSD)](blob-fees.md#mean-blob-fees)
* [Median blob fees (FeeBlobMedNtv, FeeBlobMedUSD)](blob-fees.md#median-blob-fees)
* [Mean fee per blob byte (FeeBlobByteMeanNtv, FeeBlobByteMeanUSD)](blob-fees.md#mean-fee-per-blob-byte)
* [Mean fee per blob carrying transaction (FeeBlobTxMeanNtv, FeeBlobTxMeanUSD)](blob-fees.md#mean-fee-per-blob-carrying-transaction)
* [Total Blob Fees Paid by Layer 2s (FeeBlob\*TotNtv, FeeBlob\*TotUSD)](blob-fees.md#total-blob-fees-paid-by-layer-2s)
* [Mean Blob Fees Paid by Layer 2s (FeeBlob\*MeanNtv, FeeBlob\*MeanUSD)](blob-fees.md#mean-blob-fees-paid-by-layer-2s)

## Total blob fees

### Definition

Total amount of Fees paid for blob space (available in native units and USD)

<table><thead><tr><th width="222">Name</th><th>MetricID</th><th>Unit</th><th>Interval</th></tr></thead><tbody><tr><td>Total blob fees (native units)</td><td>FeeBlobTotNtv</td><td>Native units</td><td>1 block, 1 day</td></tr><tr><td>Total blob fees (USD)</td><td>FeeBlobTotUSD</td><td>USD</td><td>1 block, 1 day</td></tr></tbody></table>

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics-v2/FeeBlobTotNtv" %}

## Mean blob fees

### Definition

Mean fees paid per blob, shown (available in native units and USD)

<table><thead><tr><th width="249">Name</th><th width="174">MetricID</th><th>Unit</th><th>Interval</th></tr></thead><tbody><tr><td>Mean blob fees (native units)</td><td>FeeBlobMeanNtv</td><td>Native units</td><td>1 block, 1 day</td></tr><tr><td>Mean blob fees (USD)</td><td>FeeBlobMeanUSD</td><td>USD</td><td>1 block, 1 day</td></tr></tbody></table>

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics-v2/FeeBlobMeanNtv" %}

## Median blob fees

### Definition

Median fees paid per blob, shown (available in native units and USD)

<table><thead><tr><th width="219">Name</th><th>MetricID</th><th>Unit</th><th>Interval</th></tr></thead><tbody><tr><td>Median blob fees (native units)</td><td>FeeBlobMedNtv</td><td>Native Units</td><td>1 block, 1 day</td></tr><tr><td>Median blob fees (USD)</td><td>FeeBlobMedUSD</td><td>USD</td><td>1 block, 1 day</td></tr></tbody></table>

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics-v2/FeeBlobMedNtv" %}

## Mean Fee per blob Byte

### Definition

Mean fee paid per byte of used blob space (available in native units and USD)

<table><thead><tr><th>Name</th><th width="205">MetricID</th><th width="200">Unit</th><th>Interval</th></tr></thead><tbody><tr><td>Mean Fee per blob Byte (native units)</td><td>FeeBlobByteMeanNtv</td><td>Native units</td><td>1 block, 1 day</td></tr><tr><td>Mean Fee per blob Byte (USD)</td><td>FeeBlobByteMeanUSD</td><td>USD</td><td>1 block, 1 day</td></tr></tbody></table>

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics-v2/FeeBlobByteMeanNtv" %}

## Mean fee per blob carrying transaction

### Definition

Mean fee paid in blob fees per blob carrying transaction (available in native units and USD)

| Name                                                  | MetricID         | Unit         | Interval       |
| ----------------------------------------------------- | ---------------- | ------------ | -------------- |
| Mean fee per blob carrying transaction (native units) | FeeBlobTxMeanNtv | Native units | 1 block, 1 day |
| Mean fee per blob carrying transaction (USD)          | FeeBlobTxMeanUSD | USD          | 1 block, 1 day |

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics-v2/FeeBlobTxMeanNtv" %}

## Total Blob Fees paid by Layer 2s

### Definition

The sum of all fees paid by tagged Layer 2 sequencers for blob space, shown in native units and USD.

<table><thead><tr><th>Name</th><th width="197">MetricID</th><th>Unit</th><th>Interval</th></tr></thead><tbody><tr><td>Total Blob Fees (layer 2, native units)</td><td>FeeBlobL2TotNtv</td><td>Native units</td><td>1 day</td></tr><tr><td>Total Blob Fees (layer 2, USD)</td><td>FeeBlobL2TotUSD</td><td>USD</td><td>1 day</td></tr><tr><td>Total Blob Fees (Arbitrum, native units)</td><td>FeeBlobARBTotNtv </td><td>Native units</td><td>1 day</td></tr><tr><td>Total Blob Fees (Arbitrum, USD)</td><td>FeeBlobARBTotUSD</td><td>USD</td><td>1 day</td></tr><tr><td>Total Blob Fees (Optimism, native units)</td><td>FeeBlobOPTotNtv </td><td>Native units</td><td>1 day</td></tr><tr><td>Total Blob Fees (Optimism, USD)</td><td>FeeBlobOPTotUSD</td><td>USD</td><td>1 day</td></tr><tr><td>Total Blob Fees (Base, native units)</td><td>FeeBlobBASETotNtv</td><td>Native units</td><td>1 day</td></tr><tr><td>Total Blob Fees (Base, USD)</td><td>FeeBlobBASETotUSD</td><td>USD</td><td>1 day</td></tr></tbody></table>

#### Details

* The aggregate L2 metrics (FeeBlobL2TotNtv & FeeBlobL2TotUSD) include all tagged L2 sequencers. This list includes additional L2s that do not have dedicated metrics.

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/FeeBlobL2TotNtv" %}

## Mean Blob Fees paid by Layer 2s

### Definition

The sum of all fees paid by tagged Layer 2 sequencers for blob space, shown in native units and USD.

<table><thead><tr><th>Name</th><th width="216">MetricID</th><th>Unit</th><th>Interval</th></tr></thead><tbody><tr><td>Mean Blob Fees (layer 2, native units)</td><td>FeeBlobL2MeanNtv</td><td>Native units</td><td>1 day</td></tr><tr><td>Mean Blob Fees (layer 2, USD)</td><td>FeeBlobL2MeanUSD</td><td>USD</td><td>1 day</td></tr><tr><td>Mean Blob Fees (Arbitrum, native units)</td><td>FeeBlobARBMeanNtv </td><td>Native units</td><td>1 day</td></tr><tr><td>Mean Blob Fees (Arbitrum, USD)</td><td>FeeBlobARBMeanUSD</td><td>USD</td><td>1 day</td></tr><tr><td>Mean Blob Fees (Optimism, native units)</td><td>FeeBlobOPMeanNtv </td><td>Native units</td><td>1 day</td></tr><tr><td>Mean Blob Fees (Optimism, USD)</td><td>FeeBlobOPMeanUSD</td><td>USD</td><td>1 day</td></tr><tr><td>Mean Blob Fees (Base, native units)</td><td>FeeBlobBASEMeanNtv</td><td>Native units</td><td>1 day</td></tr><tr><td>Mean Blob Fees (Base, USD)</td><td>FeeBlobBASEMeanUSD</td><td>USD</td><td>1 day</td></tr></tbody></table>

#### Details

* The aggregate L2 metrics (FeeBlobL2MeanNtv & FeeBlobL2MeanUSD) include all tagged L2 sequencers. This list includes additional L2s that do not have dedicated metrics.

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/FeeBlobL2MeanNtv" %}

### API Endpoints

Blob Fee metrics can be accessed using these endpoints:

* `timeseries/asset-metrics`

and by passing in the metric ID's `FeeBlob*` in the `metrics` parameter.

<mark style="color:blue;">`GET`</mark> `undefined/timeseries/asset-metrics`

{% tabs %}
{% tab title="Shell" %}
```shell
curl --compressed "https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=FeeBlobTotNtv&assets=eth&pretty=true&api_key=<your_key>"
```
{% endtab %}

{% tab title="Python" %}
```python
import requests
response = requests.get('https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=FeeBlobTotNtv&assets=eth&pretty=true&api_key=<your_key>').json()
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
        metrics="FeeBlobTotNtv", 
        assets="eth",
    ).to_dataframe()
)
```
{% endtab %}
{% endtabs %}
