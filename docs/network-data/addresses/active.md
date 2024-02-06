# Active Addresses

## Definition

The sum count of unique addresses that were active in the network (either as a recipient or originator of a ledger change) in the trailing X days up to the end of that interval. All parties in a ledger change action (recipients and originators) are counted. Individual addresses are not double-counted if active several times in the considered interval.


| Name                        | MetricID                       | Category | Sub-Category | Type | Unit | Interval |
| --------------------------- | ------------------------------ | -------- | ----------- | ---- | ---- | -------- |
|  Active Monthly Addresses | [AdrAct30dCnt](https://coverage.coinmetrics.io/search-results?query=AdrAct30dCnt) |  Addresses | Active      |  Sum | Addresses  | 1 Day       |
|  Active Weekly Addresses | [AdrAct7dCnt](https://coverage.coinmetrics.io/search-results?query=AdrAct7dCnt) |  Addresses | Active      |  Sum | Addresses  | 1 Day       |
|  Active Daily Addresses | [AdrActCnt](https://coverage.coinmetrics.io/search-results?queryAdrActCnt) |  Addresses | Active      |  Sum | Addresses  | 1 Day       |
<!-- |  Active Weekly Addresses | [AdrAct7dCnt](https://coverage.coinmetrics.io/search-results?query=<AdrAct7dCnt>) |  Addresses | Active      |  Sum | Addresses  | 1 Day       |
|  Active Weekly Addresses | [AdrAct7dCnt](https://coverage.coinmetrics.io/search-results?query=<AdrAct7dCnt>) |  Addresses | Active      |  Sum | Addresses  | 1 Day       |
|  Active Weekly Addresses | [AdrAct7dCnt](https://coverage.coinmetrics.io/search-results?query=<AdrAct7dCnt>) |  Addresses | Active      |  Sum | Addresses  | 1 Day       |
|  Active Weekly Addresses | [AdrAct7dCnt](https://coverage.coinmetrics.io/search-results?query=<AdrAct7dCnt>) |  Addresses | Active      |  Sum | Addresses  | 1 Day       | -->

## Details

* Active addresses count the number of unique addresses that participated in a ledger change.
<!-- * For this unadjusted version of the metric, all ledger changes are considered over the course of one month (30 days). -->
* Ledger changes can include activities such as transacting, signing of blocks, claiming of mining or staking rewards, voting, creating accounts, and more dependent on whether the underlying protocol supports the activity (different protocols vary in the types of activities that are supported).
* All participants of a ledger change activity are included.
* If an address was active multiple times during the aggregation interval (e.g., 30 days), it is counted only once.
* For ETH, miners receiving fees from the original sender of a failed transaction are counted as active (receiving) addresses.
* Any address that's active (even if sending 0 ETH, or sending ETH to itself, or involved in failed transactions) is counted towards active addresses.


## API Endpoints

Active Monthly Addresses can be accessed using these endpoints:
* `timeseries/asset-metrics` 
<!-- endpoint = path, e.g. `timeseries/asset-metrics -->
<!-- add endpoints as needed -->
and by passing in the `AdrAct30dCnt`, `AdrAct7dCnt`, etc. in the `metrics` parameter.

{% swagger src="../../../.gitbook/assets/openapi.yaml" path="<timeseries/asset-metrics>" method="get" %}
[openapi.yaml](../../../.gitbook/assets/openapi.yaml)
{% endswagger %}

</list of endpoints from yaml>

{% tabs %}
{% tab title="Shell" %}
```shell
curl --compressed "https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=AdrAct30dCnt&assets=btc&pretty=true&api_key=<your_key>"
```
{% endtab %}

{% tab title="Python" %}
```python
import requests
response = requests.get('https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=AdrAct30dCnt&assets=btc&pretty=true&api_key=<your_key>').json()
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
        metrics="AdrAct30dCnt", 
        assets='btc',
    ).to_dataframe()
)
```

<!-- required_parameters example: assets=btc -->
<!-- required_parameters_python example: assets=['btc'] -->


<!-- See https://gitlab.com/coinmetrics/data-delivery/api-client-python/-/blob/master/coinmetrics/api_client.py?ref_type=heads for mapping of python_api_client_method to API endpoint -->
{% endtab %}
{% endtabs %}

<!-- ## Chart (optional) -->

<!-- <link_to_charting_tool>
![Caption of chart](link_to_charts.coinmetrics.io) -->
<!-- embed interactive chart using charting tool, if possible -->

<!-- ## Examples

<list of examples> 
could be redundant with examples in markdown? -->

## Release History
<release history>

## See Also

<link of related metrics, other pages >
<link of SOTNs that may use this metric>
