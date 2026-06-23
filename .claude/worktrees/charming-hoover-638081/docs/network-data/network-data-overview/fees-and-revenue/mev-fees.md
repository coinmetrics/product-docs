# MEV Fees

### Contents

* [Total MEV Tips (FeeMevTotNtv, FeeMevTotUSD)](mev-fees.md#adractcont)
* [Mean MEV Tips (FeeMevMeanNtv, FeeMevMeanUSD)](mev-fees.md#adractcont-1)
* [Median MEV Tips (FeeMevMedNtv, FeeMevMedUSD)](mev-fees.md#adractcont-2)
* [Total Miner Tips Among MEV Transactions (FeePrioTotMevNtv, FeePrioTotMevUSD)](mev-fees.md#total-miner-tips-among-mev-transactions)
* [Mean Miner Tips Among MEV Transactions (FeePrioMeanMevNtv, FeePrioMeanMevUSD)](mev-fees.md#mean-miner-tips-among-mev-transactions)
* [Median Miner Tips Among MEV Transactions (FeePrioMeanMevNtv, FeePrioMeanMevUSD)](mev-fees.md#median-miner-tips-among-mev-transactions)
* [Miner Revenue from MEV tips (%) (FeeMevRevPct)](mev-fees.md#miner-revenue-from-mev-tips)

## Total MEV Tips <a href="#adractcont" id="adractcont"></a>

<table><thead><tr><th width="177">Name</th><th width="157">MetricID</th><th width="124">Unit</th><th>Interval</th></tr></thead><tbody><tr><td>Total MEV Tips (native units)</td><td>FeeMevTotNtv</td><td>Native Units</td><td>1 day</td></tr><tr><td>Total MEV Tips (USD)</td><td>FeeMevTotUSD</td><td>USD</td><td>1 day</td></tr></tbody></table>

### Definition

The sum of all MEV tips in native units and USD that interval. The MEV tip represents the non-native transaction fee that goes to miners or validators as an incentive mechanism for transaction ordering. MEV tips are excluded from total native fee metrics.

### Details

* This fee is not included in `FeeTotNtv`. Total fees paid for transactions (MEV + protocol fees) can be obtained by leveraging the following formula: $$TotalFees=FeeTotNtv+FeeMevTotNtv$$

### **Asset-Specific Details**

* For Solana, slots proposed by validators running the Jito-Solana client are considered as MEV slots. Further, in Solana it is possible to identify which transactions paid MEV tip in addition to simply identifying the slot. For this metric each individual transaction is evaluated to determine which are MEV-enabled and which aren't.

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics-v2/FeeMevTotNtv" %}
FeeMevTotNtv
{% endembed %}

{% embed url="https://coverage.coinmetrics.io/asset-metrics-v2/FeeMevTotUSD" %}
FeeMevTotUSD
{% endembed %}

## Mean MEV Tips <a href="#adractcont" id="adractcont"></a>

<table><thead><tr><th width="177">Name</th><th width="157">MetricID</th><th width="124">Unit</th><th>Interval</th></tr></thead><tbody><tr><td>Mean MEV Tips (native units)</td><td>FeeMevMeanNtv</td><td>Native Units</td><td>1 day</td></tr><tr><td>Mean MEV Tips (USD)</td><td>FeeMevMeanUSD</td><td>USD</td><td>1 day</td></tr></tbody></table>

### Definition

The mean MEV tip per transaction in native units that interval. The MEV tip represents the non-native transaction fee that goes to miners or validators as an incentive mechanism for transaction ordering. MEV tips are excluded from total native fee metrics.

### Details

* This fee is not included in `FeeMeanNtv`.&#x20;

### **Asset-Specific Details**

* For Solana, slots proposed by validators running the Jito-Solana client are considered as MEV slots. Further, in Solana it is possible to identify which transactions paid MEV tip in addition to simply identifying the slot. For this metric each individual transaction is evaluated to determine which are MEV-enabled and which aren't.

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics-v2/FeeMevMeanNtv" %}
FeeMevMeanNtv
{% endembed %}

{% embed url="https://coverage.coinmetrics.io/asset-metrics-v2/FeeMevMeanUSD" %}
FeeMevMeanUSD
{% endembed %}

## Median MEV Tips <a href="#adractcont" id="adractcont"></a>

<table><thead><tr><th width="177">Name</th><th width="157">MetricID</th><th width="124">Unit</th><th>Interval</th></tr></thead><tbody><tr><td>Median MEV Tips (native units)</td><td>FeeMevMedNtv</td><td>Native Units</td><td>1 day</td></tr><tr><td>Median MEV Tips (USD)</td><td>FeeMevMedUSD</td><td>USD</td><td>1 day</td></tr></tbody></table>

### Definition

The median MEV tip per transaction in native units that interval. The MEV tip represents the non-native transaction fee that goes to miners or validators as an incentive mechanism for transaction ordering. MEV tips are excluded from total native fee metrics.

### Details

* This fee is not included in `FeeMedNtv`.&#x20;

### **Asset-Specific Details**

* For Solana, slots proposed by validators running the Jito-Solana client are considered as MEV slots. Further, in Solana it is possible to identify which transactions paid MEV tip in addition to simply identifying the slot. For this metric each individual transaction is evaluated to determine which are MEV-enabled and which aren't.

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics-v2/FeeMevMedNtv" %}
FeeMevMedNtv
{% endembed %}

{% embed url="https://coverage.coinmetrics.io/asset-metrics-v2/FeeMevMedUSD" %}
FeeMevMedUSD
{% endembed %}

## Total Miner Tips Among MEV Transactions

<table><thead><tr><th width="177">Name</th><th width="157">MetricID</th><th width="124">Unit</th><th>Interval</th></tr></thead><tbody><tr><td>Total Miner Tips Among MEV txs (native units)</td><td>FeePrioTotMevNtv</td><td>Native Units</td><td>1 day</td></tr><tr><td>Total Miner Tips Among MEV txs (USD)</td><td>FeePrioTotMevUSD</td><td>USD</td><td>1 day</td></tr></tbody></table>

### Definition

The sum native units value of all priority fees in that interval among MEV-enabled transactions. An MEV-enabled transaction is one that paid an MEV tip to miners/validators in exchange for specific block ordering.

### Details

* This fee is not included in `FeePrioTotNtv`.&#x20;
* Generally, MEV transactions to not also pay an additional protocol native priority fee. While this can happen this would be the exception.

### **Asset-Specific Details**

* For Solana, slots proposed by validators running the Jito-Solana client are considered as MEV slots. Further, in Solana it is possible to identify which transactions paid MEV tip in addition to simply identifying the slot. For this metric each individual transaction is evaluated to determine which are MEV-enabled and which aren't.

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics-v2/FeePrioTotMevNtv" %}
FeePrioTotMevNtv
{% endembed %}

{% embed url="https://coverage.coinmetrics.io/asset-metrics-v2/FeePrioTotMevUSD" %}
FeePrioTotMevUSD
{% endembed %}

## Mean Miner Tips Among MEV Transactions

<table><thead><tr><th width="177">Name</th><th width="157">MetricID</th><th width="124">Unit</th><th>Interval</th></tr></thead><tbody><tr><td>Mean Miner Tips Among MEV txs (native units)</td><td>FeePrioMeanMevNtv</td><td>Native Units</td><td>1 day</td></tr><tr><td>Mean Miner Tips Among MEV txs (USD)</td><td>FeePrioMeanMevUSD</td><td>USD</td><td>1 day</td></tr></tbody></table>

### Definition

The mean priority fee per MEV-enabled transaction in native units that interval. An MEV-enabled transaction is one that paid an MEV tip to miners/validators in exchange for specific block ordering.

### Details

* This fee is not included in `FeePrioMeanNtv`.&#x20;
* Generally, MEV transactions to not also pay an additional protocol native priority fee. While this can happen this would be the exception.

### **Asset-Specific Details**

* For Solana, slots proposed by validators running the Jito-Solana client are considered as MEV slots. Further, in Solana it is possible to identify which transactions paid MEV tip in addition to simply identifying the slot. For this metric each individual transaction is evaluated to determine which are MEV-enabled and which aren't.

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics-v2/FeePrioMeanMevNtv" %}
FeePrioMeanMevNtv
{% endembed %}

{% embed url="https://coverage.coinmetrics.io/asset-metrics-v2/FeePrioMeanMevUSD" %}
FeePrioMeanMevUSD
{% endembed %}

## Median Miner Tips Among MEV Transactions

<table><thead><tr><th width="177">Name</th><th width="157">MetricID</th><th width="124">Unit</th><th>Interval</th></tr></thead><tbody><tr><td>Median Miner Tips Among MEV txs (native units)</td><td>FeePrioMedMevNtv</td><td>Native Units</td><td>1 day</td></tr><tr><td>Median Miner Tips Among MEV txs (USD)</td><td>FeePrioMedMevUSD</td><td>USD</td><td>1 day</td></tr></tbody></table>

### Definition

The median priority fee per MEV-enabled transaction in native units that interval. An MEV-enabled transaction is one that paid an MEV tip to miners/validators in exchange for specific block ordering.

### Details

* This fee is not included in `FeePrioMedNtv`.&#x20;
* Generally, MEV transactions to not also pay an additional protocol native priority fee. While this can happen this would be the exception.

### **Asset-Specific Details**

* For Solana, slots proposed by validators running the Jito-Solana client are considered as MEV slots. Further, in Solana it is possible to identify which transactions paid MEV tip in addition to simply identifying the slot. For this metric each individual transaction is evaluated to determine which are MEV-enabled and which aren't.

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics-v2/FeePrioMedMevNtv" %}
FeePrioMedMevNtv
{% endembed %}

{% embed url="https://coverage.coinmetrics.io/asset-metrics-v2/FeePrioTedMevUSD" %}
FeePrioMedMevUSD
{% endembed %}

## Miner Revenue from MEV tips (%)

<table><thead><tr><th width="177">Name</th><th width="157">MetricID</th><th width="124">Unit</th><th>Interval</th></tr></thead><tbody><tr><td>Miner Revenue from MEV tips</td><td>FeeMevRevPct</td><td>Percent</td><td>1 day</td></tr></tbody></table>

### Definition

The percentage of miner revenue derived from MEV tips that interval. This is equal to the MEV tips divided by the native miner revenue plus non-native revenue (MEV tips).

### Details

* This fee is not included in `FeeRevPct`.&#x20;
* Generally, MEV transactions to not also pay an additional protocol native priority fee. While this can happen this would be the exception.

### **Asset-Specific Details**

* For Solana, slots proposed by validators running the Jito-Solana client are considered as MEV slots. Further, in Solana it is possible to identify which transactions paid MEV tip in addition to simply identifying the slot. For this metric each individual transaction is evaluated to determine which are MEV-enabled and which aren't.

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics-v2/FeeMevRevPct" %}

### API Endpoints

MEV Fee metrics can be accessed using these endpoints:

* `timeseries/asset-metrics`

and by passing in the metric ID's `Fee*` and `FeeMev*` in the `metrics` parameter.

<mark style="color:blue;">`GET`</mark> `undefined/timeseries/asset-metrics`

{% tabs %}
{% tab title="Shell" %}
```shell
curl --compressed "https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=FeeMevTotNtv&assets=sol&pretty=true&api_key=<your_key>"
```
{% endtab %}

{% tab title="Python" %}
```python
import requests
response = requests.get('https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=FeeMevTotNtv&assets=sol&pretty=true&api_key=<your_key>').json()
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
        metrics="FeeMevTotNtv", 
        assets="sol",
    ).to_dataframe()
)
```
{% endtab %}
{% endtabs %}
