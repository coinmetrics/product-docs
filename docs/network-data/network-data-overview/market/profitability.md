# Profitability

### Contents

* [UTXO set, gross unrealized loss, USD](profitability-1.md#unrealized-utxo-losses-usd)
* [UTXO set, gross unrealized profit, USD](profitability-1.md#unrealized-utxo-profits-usd)

## Unrealized UTXO Losses (USD)

### Definition

The total unrealized loss of unspent transaction outputs on the network.

| Name                         | MetricID          | Unit | Interval |
| ---------------------------- | ----------------- | ---- | -------- |
| Unrealized UTXO Losses (USD) | UTXOLossUnrealUSD | USD  | 1 day    |

### Release History

* Release Version: NDP-EOD 4.8 (Nov, 2020)

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/UTXOLossUnrealUSD" %}

## Unrealized UTXO Profits (USD)

### Definition

The total unrealized profit of unspent transaction outputs on the network.

| Name                          | MetricID          | Unit | Interval |
| ----------------------------- | ----------------- | ---- | -------- |
| Unrealized UTXO Profits (USD) | UTXOProfUnrealUSD | USD  | 1 day    |

### Release History

* Release Version: NDP-EOD 4.8 (Nov, 2020)

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/UTXOProfUnrealUSD" %}

### API Endpoints

Exhange Deposits metrics can be accessed using these endpoints:

* `timeseries/asset-metrics`

and by passing in the metric ID's `UTXO*` in the `metrics` parameter.

{% swagger path="/timeseries/asset-metrics" method="get" %}
{% swagger-description %}

{% endswagger-description %}
{% endswagger %}

{% tabs %}
{% tab title="Shell" %}
```shell
curl --compressed "https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=UTXOLossUnrealUSD&assets=btc&pretty=true&api_key=<your_key>"
```
{% endtab %}

{% tab title="Python" %}
```python
import requests
response = requests.get('https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=UTXOLossUnrealUSD&assets=btc&pretty=true&api_key=<your_key>').json()
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
        metrics="UTXOLossUnrealUSD", 
        assets="btc",
    ).to_dataframe()
)
```
{% endtab %}
{% endtabs %}
