# Assets



{% swagger src="../../.gitbook/assets/openapi.yaml" path="/reference-data/assets" method="get" %}
[openapi.yaml](../../.gitbook/assets/openapi.yaml)
{% endswagger %}

### Examples

{% tabs %}

{% tab title="Shell" %}
```shell
curl --compressed "https://api.coinmetrics.io/v4/reference-data/assets?api_key=<your_key>"
```
{% endtab %}

{% tab title="Python" %}
```python
import requests
response = requests.get('https://api.coinmetrics.io/v4/reference-data/assets?api_key=<your_key>').json()
print(response)
```
{% endtab %}

{% tab title="Python API Client" %}
```python
from coinmetrics.api_client import CoinMetricsClient
api_key = "<API_KEY>"
client = CoinMetricsClient(api_key)

print(client.reference_data_assets().to_dataframe().head())
```
{% endtab %}


{% endtabs %}
