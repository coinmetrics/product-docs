# Returns

### Contents

* [ROI, percent](returns.md#roi)

## ROI

### Definition

The return on investment for the asset assuming a purchase 12 months prior.[\
](https://docs.coinmetrics.io/info/metrics/ROI1yr)

| Name         | MetricID | Unit          | Interval      |
| ------------ | -------- | ------------- | ------------- |
| ROI, 1 Year  | ROI1yr   | Dimensionless | 1 day, 1 hour |
| ROI, 30 Days | ROI30d   | Dimensionless | 1 day, 1 hour |

### Details

Calculated as PriceUSD Change/PriceUSD Previous\*100

### Release History

* Released in the 1.0 release of NDP

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/ROI1yr" %}

### API Endpoints

Exhange Deposits metrics can be accessed using these endpoints:

* `timeseries/asset-metrics`

and by passing in the metric ID's `ROI*` and `ROI*` in the `metrics` parameter.

{% swagger path="/timeseries/asset-metrics" method="get" %}
{% swagger-description %}

{% endswagger-description %}
{% endswagger %}

{% tabs %}
{% tab title="Shell" %}
```shell
curl --compressed "https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=ROI1yr&assets=btc&pretty=true&api_key=<your_key>"
```
{% endtab %}

{% tab title="Python" %}
```python
import requests
response = requests.get('https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=ROI1yr&assets=btc&pretty=true&api_key=<your_key>').json()
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
        metrics="ROI1yr", 
        assets="btc",
    ).to_dataframe()
)
```
{% endtab %}
{% endtabs %}
