# Contents

* [<Metric Name>](<Subcategory>.md#<metricid>)

# <Subcategory><a href="#<metricid>" id="<metricid>"></a>

# API Endpoints

<Subcategory> metrics can be accessed using these endpoints:

* `timeseries/asset-metrics`

and by passing in the metric ID's `<metric-id>*` in the `metrics` parameter.

{% swagger src="../../.gitbook/assets/openapi.yaml" path="/timeseries/asset-metrics" method="get" %}
[openapi.yaml](../../.gitbook/assets/openapi.yaml)
{% endswagger %}

{% tabs %}
{% tab title="Shell" %}
```shell
curl --compressed "https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=<metric-id>&assets=btc&pretty=true&api_key=<your_key>"
```
{% endtab %}

{% tab title="Python" %}
```python
import requests
response = requests.get('https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=<metric-id>&assets=btc&pretty=true&api_key=<your_key>').json()
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
        metrics="<metric-id>", 
        assets="btc",
    ).to_dataframe()
)
```
{% endtab %}
{% endtabs %}
