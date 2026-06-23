# UTXOs

## Contents

* [UTXO Mean Age (Days)](utxos.md#utxoagemean)
* [UTXO Median Age (Days)](utxos.md#utxoagemed)
* [UTXO Val-Weighted Mean Age (Days)](utxos.md#utxoagevalmean)
* [UTXO Cnt](utxos.md#utxocnt)
* [UTXO Age-Weighted Value (native units)](utxos.md#utxoday)

## UTXO Mean Age (Days) <a href="#utxoagemean" id="utxoagemean"></a>

### Definition

The simple average age in full days of all unspent transaction outputs. \\

| Name                 | MetricID    | Unit | Interval |
| -------------------- | ----------- | ---- | -------- |
| UTXO Mean Age (Days) | UTXOAgeMean | Days | 1 day    |

### Release History

* Release Version: NDP-EOD 4.8 (Nov, 2020)

### Interpretation

This metric calculates the average number of days an asset (e.g, BTC) is held between transactions. Note that it may be less robust to outliers than median and could be skewed by older addresses.

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/UTXOAgeMean" %}

## UTXO Median Age (Days) <a href="#utxoagemed" id="utxoagemed"></a>

### Definition

The median age in full days of all unspent transaction outputs, rounded down to the nearest day.

| Name                   | MetricID   | Unit | Interval |
| ---------------------- | ---------- | ---- | -------- |
| UTXO Median Age (Days) | UTXOAgeMed | Days | 1 day    |

### Release History

* Release Version: NDP-EOD 4.8 (Nov, 2020)

### Interpretation

This metric calculates the median number of days an asset (e.g, BTC) is held between transactions.

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/UTXOAgeMed" %}

## UTXO Val-Weighted Mean Age (Days) <a href="#utxoagevalmean" id="utxoagevalmean"></a>

### Definition

The value-weighted average age in full days of all unspent transaction outputs.

### Dictionary

| Name                              | MetricID       | Unit | Interval |
| --------------------------------- | -------------- | ---- | -------- |
| UTXO Val-Weighted Mean Age (Days) | UTXOAgeValMean | Days | 1 day    |

### Release History

* Release Version: NDP-EOD 4.8 (Nov, 2020)

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/UTXOAgeValMean" %}

## UTXO Cnt <a href="#utxocnt" id="utxocnt"></a>

### Definitions

The sum count of unspent transaction outputs that interval.

| Name     | MetricID | Unit | Interval |
| -------- | -------- | ---- | -------- |
| UTXO Cnt | UTXOCnt  | UTXO | 1 day    |

### Details

* Unspent Transaction Outputs (UTXOs) are cryptoasset balances that have been received by the output addresses listed in a transaction. As transactions are comprised of senders (input addresses) and receivers (output addresses), only the owner of output addresses can spend them after the transaction confirms. Said differently, UTXOs are balances received that have not yet been spent by their owners. Collectively, the UTXO set constitutes the current ownership state of a cryptonetwork. Bitcoin is the first and most predominant network that uses this structure, but there are several other UTXO-based chains.

### **Asset-Specific Details**

* For BTC and derivatives asset, it doesn’t include OP\_RETURN outputs as they are provably unspendable.

### Release History

* Released in the 4.0 release of NDP

### Interpretation

This metric gives a proxy for an asset’s ownership fragmentation. If there’s not a lot of unspent outputs, then there cannot be a lot of onchain owners. More broadly, the UTXO set count is an upper bound estimate on the number of people owning funds on-chain.

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/UTXOCnt" %}

## UTXO Age-Weighted Value (native units) <a href="#utxoday" id="utxoday"></a>

### Definition

The sum product of age in full days and value in native units of all unspent transaction outputs.

| Name                                   | MetricID | Unit          | Interval |
| -------------------------------------- | -------- | ------------- | -------- |
| UTXO Age-Weighted Value (native units) | UTXODay  | Dimensionless | 1 day    |

### Release History

* Release Version: NDP-EOD 4.8 (Nov, 2020)

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/UTXODay" %}

## API Endpoints

UTXO metrics can be accessed using these endpoints:

* `timeseries/asset-metrics`

and by passing in the metric ID's `UTXO*` in the `metrics` parameter.

{% swagger src="../../../.gitbook/assets/openapi.yaml" path="/timeseries/asset-metrics" method="get" %}
[openapi.yaml](../../../.gitbook/assets/openapi.yaml)
{% endswagger %}

{% tabs %}
{% tab title="Shell" %}
```shell
curl --compressed "https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=UTXOAgeMean&assets=btc&pretty=true&api_key=<your_key>"
```
{% endtab %}

{% tab title="Python" %}
```python
import requests
response = requests.get('https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=UTXOAgeMean&assets=btc&pretty=true&api_key=<your_key>').json()
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
        metrics="UTXOAgeMean", 
        assets="btc",
    ).to_dataframe()
)
```
{% endtab %}
{% endtabs %}
