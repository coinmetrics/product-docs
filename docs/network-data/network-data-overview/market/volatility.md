# Volatility

### Contents

* [Volatility, daily returns](volatility-1.md#x-day-volatility)

## X Day Volatility

### Definition

The X days volatility, measured as the deviation of log returns

| Name               | MetricID      | Unit          | Interval |
| ------------------ | ------------- | ------------- | -------- |
| 180 Day Volatility | VtyDayRet180d | Dimensionless | 180 days |
| 60 Day Volatility  | VtyDayRet60d  | Dimensionless | 60 days  |
| 30 Day Volatility  | VtyDayRet30d  | Dimensionless | 30 days  |

### Details

* Computed as the standard deviation of the daily natural log returns over X days.

### Release History

* Released in the 1.0 release of NDP

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/VtyDayRet180d" %}

### API Endpoints

Exhange Deposits metrics can be accessed using these endpoints:

* `timeseries/asset-metrics`

and by passing in the metric ID's `VtyDayRet*` in the `metrics` parameter.

{% swagger path="/timeseries/asset-metrics" method="get" %}
{% swagger-description %}

{% endswagger-description %}
{% endswagger %}

{% tabs %}
{% tab title="Shell" %}
```shell
curl --compressed "https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=VtyDayRet180d&assets=btc&pretty=true&api_key=<your_key>"
```
{% endtab %}

{% tab title="Python" %}
```python
import requests
response = requests.get('https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=VtyDayRet180d&assets=btc&pretty=true&api_key=<your_key>').json()
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
        metrics="VtyDayRet180d", 
        assets="btc",
    ).to_dataframe()
)
```
{% endtab %}
{% endtabs %}
