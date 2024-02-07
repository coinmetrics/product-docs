<!-- slug = <product>/<category>/<Active Addresses> -->

# <Sub-Category>

## Definition
<Definition>

| Name                        | MetricID                       | Category | Subcategory | Type | Unit | Interval |
| --------------------------- | ------------------------------ | -------- | ----------- | ---- | ---- | -------- |
|  [metric_name](#metric_name) | [metric_id](https://coverage.coinmetrics.io/search-results?query=<metric_id>) |  <category> | <Active Addresses>      |  <type> | <unit>  | <interval>       |

## Details

<additional context for metrics within sub-category>

### metric_name <a href="metric_name"></a>

## API Endpoints

`<metric_name>` can be accessed using these endpoints:
<list-of-endpoints>
* <endpoint_1> 
<!-- endpoint = path, e.g. `timeseries/asset-metrics -->
<!-- add endpoints as needed -->
</list-of-endpoints>
and by passing in the `<metric_id>` in the `metrics` parameter.

<list of endpoints from yaml>

{% swagger src="../../../.gitbook/assets/openapi.yaml" path="<endpoint_1>" method="get" %}
[openapi.yaml](../../../.gitbook/assets/openapi.yaml)
{% endswagger %}

</list of endpoints from yaml>

{% tabs %}
{% tab title="Shell" %}
```shell
curl --compressed "https://api.coinmetrics.io/v4/<endpoint_1>?metrics=<metric_id>&<required_parameters>&pretty=true&api_key=<your_key>"
```
{% endtab %}

{% tab title="Python" %}
```python
import requests
response = requests.get('https://api.coinmetrics.io/v4/<endpoint_1>?metrics=<metric_id>&<required_parameters>&pretty=true&api_key=<your_key>').json()
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
        metrics="<metric_id>", 
        <required_parameters_python>,
    ).to_dataframe()
)
```

<!-- required_parameters example: assets=btc -->
<!-- required_parameters_python example: assets=['btc'] -->


<!-- See https://gitlab.com/coinmetrics/data-delivery/api-client-python/-/blob/master/coinmetrics/api_client.py?ref_type=heads for mapping of python_api_client_method to API endpoint -->
{% endtab %}
{% endtabs %}

## Chart (optional)

<link_to_charting_tool>
![Caption of chart](link_to_charts.coinmetrics.io)
<!-- embed interactive chart using charting tool, if possible -->

## Examples

<list of examples> 
<!-- could be redundant with examples in markdown? -->

## Release History
<release history>

## See Also

<link of related metrics, other pages >
<link of SOTNs that may use this metric>
