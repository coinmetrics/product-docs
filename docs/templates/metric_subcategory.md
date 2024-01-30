# <Name of Sub-Category>

## Definition

<definition of metrics in sub-category>

| Name                        | MetricID                       | Category | Subcategory | Type | Unit | Interval |
| --------------------------- | ------------------------------ | -------- | ----------- | ---- | ---- | -------- |
|  <metric_name> | [metric_id](https://coverage.coinmetrics.io/search-results?query=<metric_id>) |  <category> | <subcategory>      |  <type> | <unit>  | <interval>       |

## Details

<additional context for metrics within sub-category>

## API Endpoints

`<metric_name>` can be accessed using these endpoints:
<list-of-endpoints>
* <endpoint-1> 
<!-- endpoint = path, e.g. `timeseries/asset-metrics -->
<!-- add endpoints as needed -->
</list-of-endpoints>
and by passing in the `<metric_id>` in the `metrics` parameter.

<list of endpoints from yaml>

{% swagger src="../../../.gitbook/assets/openapi.yaml" path="<path-to-endpoint-1>" method="get" %}
[openapi.yaml](../../../.gitbook/assets/openapi.yaml)
{% endswagger %}

</list of endpoints from yaml>


<!-- path to endpoint ~ like timeseries/asset-metrics-->

{% tabs %}
{% tab title="Shell" %}
```shell
curl --compressed "https://api.coinmetrics.io/v4/<endpoint_1>?assets=btc&metrics=<metric_id>&pretty=true&api_key=<your_key>"
```
{% endtab %}

{% tab title="Python" %}
```python
import requests
response = requests.get('https://api.coinmetrics.io/v4/<endpoint_1>?assets=btc&metrics=<metric_id>&pretty=true&api_key=<your_key>').json()
print(response)
```
{% endtab %}

{% tab title="Python Client" %}
```python
from coinmetrics.api_client import CoinMetricsClient

api_key = "<API_KEY>"
client = CoinMetricsClient(api_key)

print(
    client.<python_api_client_method>(
        assets=["btc"], metrics="<metric_id>", limit_per_asset=5
    ).to_dataframe()
)
```

<!-- See https://gitlab.com/coinmetrics/data-delivery/api-client-python/-/blob/master/coinmetrics/api_client.py?ref_type=heads for mapping of python_api_client_method to API endpoint -->
{% endtab %}
{% endtabs %}

## Chart

<link_to_charting_tool>
![Caption of chart](link-to-charts.coinmetrics.io)

## Examples

<list of examples> 
<!-- could be redundant with examples in markdown? -->

## Release History
<release history>

## See Also

<link of related metrics, other pages >
<link of SOTNs that may use this metric>

<!-- ## Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/volume_trusted_spot_usd_1d" %} -->
