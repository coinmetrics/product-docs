# Contents

* [Puell Multiple, Revenue](miner-revenue.md#puellmulrev)

# Puell Multiple, Revenue<a href="#puellmulrev" id="puellmulrev"></a>

## Definition

The ratio of the USD value of miner revenue during the period to the 365-day moving average of the USD value of miner revenue.

| Name                    | MetricID    | Category | Subcategory   | Type  | Unit          | Interval |
| ----------------------- | ----------- | -------- | ------------- | ----- | ------------- | -------- |
| Puell Multiple, Revenue | PuellMulRev | Supply   | Miner Revenue | Ratio | Dimensionless | 365 days |

## Details

* Computed as RevUSD/ma365(RevUSD)

## Release History

* Released in the version 4.9 of Network Data Pro

## Interpretation

The Puell Multiple provides insight into market cycles from a mining revenue perspective. Because miners are sometimes considered compulsory sellers given their fixed costs (e.g., equipment, electricity), this metric provides insight into the supply side of a cryptoasset's economy.   The idea being, that periods where the Puell Multiple is extremely low could be buying opportunities for investors, and periods where it is extremely high could indicate a profit-taking/selling opportunities.&#x20;

## See Also

* [Puell Multiple, Coinbase Issuance](puellmulcont.md)
* [Puell Multiple, Total Issuance](puellmultot.md)

## Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/PuellMulRev" %}

# API Endpoints

Miner Revenue metrics can be accessed using these endpoints:

* `timeseries/asset-metrics`

and by passing in the metric ID's `PuellMulRev*` in the `metrics` parameter.

{% swagger src="../../.gitbook/assets/openapi.yaml" path="/timeseries/asset-metrics" method="get" %}
[openapi.yaml](../../.gitbook/assets/openapi.yaml)
{% endswagger %}

{% tabs %}
{% tab title="Shell" %}
```shell
curl --compressed "https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=PuellMulRev&assets=btc&pretty=true&api_key=<your_key>"
```
{% endtab %}

{% tab title="Python" %}
```python
import requests
response = requests.get('https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=PuellMulRev&assets=btc&pretty=true&api_key=<your_key>').json()
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
        metrics="PuellMulRev", 
        assets="btc",
    ).to_dataframe()
)
```
{% endtab %}
{% endtabs %}
