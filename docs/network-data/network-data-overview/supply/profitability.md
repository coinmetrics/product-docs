# Profitability

## Contents

* [Supply in UTXOs at Profit](profitability.md#splyutxoprof)
* [Supply in UTXOs at Loss](profitability.md#splyutxoloss)

## Supply in UTXOs at Profit (native units) <a href="#splyutxoprof" id="splyutxoprof"></a>

### Definition

The sum of all native units held in unspent transaction outputs created on days where the closing price was lower than or equal to the closing price at the end of the period.

| Name                                     | MetricID     | Unit         | Interval |
| ---------------------------------------- | ------------ | ------------ | -------- |
| Supply in UTXOs at Profit (native units) | SplyUTXOProf | Native units | 1 day    |

### Release History

* Release Version: NDP-EOD 4.8 (Nov, 2020)

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/SplyUTXOProf" %}

## Supply in UTXOs at Loss (native units) <a href="#splyutxoloss" id="splyutxoloss"></a>

### Definition

The sum of all native units held in unspent transaction outputs created on days when the closing price was higher than the closing price at the end of the period.

| Name                                   | MetricID     | Unit         | Interval |
| -------------------------------------- | ------------ | ------------ | -------- |
| Supply in UTXOs at Loss (native units) | SplyUTXOLoss | Native units | 1 day    |

### Release History

* Release Version: NDP-EOD 4.8 (Nov, 2020)

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/SplyUTXOLoss" %}

## API Endpoints

Supply Profitability metrics can be accessed using these endpoints:

* `timeseries/asset-metrics`

and by passing in the metric ID's `SplyUTXOProf` and `SplyUTXOLoss` in the `metrics` parameter.

{% swagger src="../../../.gitbook/assets/openapi.yaml" path="/timeseries/asset-metrics" method="get" %}
[openapi.yaml](../../../.gitbook/assets/openapi.yaml)
{% endswagger %}

{% tabs %}
{% tab title="Shell" %}
```shell
curl --compressed "https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=SplyUTXOProf&assets=btc&pretty=true&api_key=<your_key>"
```
{% endtab %}

{% tab title="Python" %}
```python
import requests
response = requests.get('https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=SplyUTXOProf&assets=btc&pretty=true&api_key=<your_key>').json()
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
        metrics="SplyUTXOProf", 
        assets="btc",
    ).to_dataframe()
)
```
{% endtab %}
{% endtabs %}
