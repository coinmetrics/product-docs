# Assets



{% swagger src="../../.gitbook/assets/openapi.yaml" path="/reference-data/assets" method="get" %}
[openapi.yaml](../../.gitbook/assets/openapi.yaml)
{% endswagger %}

```python
import requests
response = requests.get('https://api.coinmetrics.io/v4/reference-data/assets?api_key=<your_key>').json()
print(response)

```
