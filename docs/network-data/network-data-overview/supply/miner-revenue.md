# Miner Revenue

## Contents

* Puell Multiple, Revenue

## Puell Multiple, Revenue

### Definition <a href="#user-content-definition" id="user-content-definition"></a>

The ratio of the USD value of miner revenue during the period to the 365-day moving average of the USD value of miner revenue.

| Name                    | MetricID    | Unit          | Interval |
| ----------------------- | ----------- | ------------- | -------- |
| Puell Multiple, Revenue | PuellMulRev | Dimensionless | 365 days |

### Details <a href="#user-content-details" id="user-content-details"></a>

* Computed as RevUSD/ma365(RevUSD)

### Release History <a href="#user-content-release-history" id="user-content-release-history"></a>

* Released in the version 4.9 of Network Data Pro

### Interpretation <a href="#user-content-interpretation" id="user-content-interpretation"></a>

The Puell Multiple provides insight into market cycles from a mining revenue perspective. Because miners are sometimes considered compulsory sellers given their fixed costs (e.g., equipment, electricity), this metric provides insight into the supply side of a cryptoasset's economy. The idea being, that periods where the Puell Multiple is extremely low could be buying opportunities for investors, and periods where it is extremely high could indicate a profit-taking/selling opportunities.

### See Also <a href="#user-content-see-also" id="user-content-see-also"></a>

* Puell Multiple, Coinbase Issuance
* Puell Multiple, Total Issuance

### Availability for Assets <a href="#user-content-availability-for-assets" id="user-content-availability-for-assets"></a>

{% embed url="https://coverage.coinmetrics.io/asset-metrics/PuellMulRev" %}

## API Endpoints <a href="#user-content-api-endpoints" id="user-content-api-endpoints"></a>

Miner Revenue metrics can be accessed using these endpoints:

* `timeseries/asset-metrics`

and by passing in the metric ID's `PuellMulRev*` in the `metrics` parameter.

{% tabs %}
{% tab title="Shell" %}
```
curl --compressed "https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=PuellMulRev&assets=btc&pretty=true&api_key=<your_key>"
```
{% endtab %}

{% tab title="Python" %}
```
import requests
response = requests.get('https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=PuellMulRev&assets=btc&pretty=true&api_key=<your_key>').json()
print(response)
```
{% endtab %}

{% tab title="Python Client" %}
```
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
