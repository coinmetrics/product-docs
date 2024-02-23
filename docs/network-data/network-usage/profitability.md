# Profitability

## Contents

* [UTXO Cnt in Loss](profitability.md#utxolosscnt)
* [UTXO Cnt in Profit](profitability.md#utxoprofcnt)

## UTXO Cnt in Loss <a href="#utxolosscnt" id="utxolosscnt"></a>

### Definition

The sum count of unspent transaction outputs created on days where the closing price was higher than the closing price at the end of the period.

| Name             | MetricID    | Unit | Interval |
| ---------------- | ----------- | ---- | -------- |
| UTXO Cnt in Loss | UTXOLossCnt | UTXO | 1 day    |

### Release History

* Release Version: NDP-EOD 4.8 (Nov, 2020)

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/UTXOLossCnt" %}

## UTXO Cnt in Profit <a href="#utxoprofcnt" id="utxoprofcnt"></a>

### Definition

The sum count of unspent transaction outputs created on days where the closing price was lower than or equal to the closing price at the end of the period.

| Name               | MetricID    | Unit | Interval |
| ------------------ | ----------- | ---- | -------- |
| UTXO Cnt in Profit | UTXOProfCnt | UTXO | 1 day    |

### Release History

* Release Version: NDP-EOD 4.8 (Nov, 2020)

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/UTXOProfCnt" %}

## API Endpoints

Profitability metrics can be accessed using these endpoints:

* `timeseries/asset-metrics`

and by passing in the metric ID's `UTXO*` in the `metrics` parameter.

{% swagger src="../../.gitbook/assets/openapi.yaml" path="/timeseries/asset-metrics" method="get" %}
[openapi.yaml](../../.gitbook/assets/openapi.yaml)
{% endswagger %}

{% tabs %}
{% tab title="Shell" %}
```shell
curl --compressed "https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=UTXOProfCnt&assets=btc&pretty=true&api_key=<your_key>"
```
{% endtab %}

{% tab title="Python" %}
```python
import requests
response = requests.get('https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=UTXOProfCnt&assets=btc&pretty=true&api_key=<your_key>').json()
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
        metrics="UTXOProfCnt", 
        assets="btc",
    ).to_dataframe()
)
```
{% endtab %}
{% endtabs %}
