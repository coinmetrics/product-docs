# Net Flows

## Contents

* [Net Flows (FlowNetXNtv)](net-flows.md#flownet)

## Net Flows <a href="#flownet" id="flownet"></a>

## Definiton

The net unit value sent or withdrawn to/from an ETF in that interval.

<table><thead><tr><th>Name</th><th width="197">MetricID</th><th>Unit</th><th>Interval</th></tr></thead><tbody><tr><td>Ark Invest Net Flows (native units)</td><td>FlowNetARKNtv</td><td>Native units</td><td>1 day</td></tr><tr><td>Ark Invest Net Flows (USD)</td><td>FlowNetARKUSD</td><td>USD</td><td>1 day</td></tr><tr><td>BlackRock Net Flows (native units)</td><td>FlowNetBLKNtv</td><td>Native units</td><td>1 day</td></tr><tr><td>BlackRock Net Flows (USD)</td><td>FlowNetBLKUSD</td><td>USD</td><td>1 day</td></tr><tr><td>Bitwise Net Flows (native units)</td><td>FlowNetBWSNtv</td><td>Native units</td><td>1 day</td></tr><tr><td>Bitwise Net Flows (USD)</td><td>FlowNetBWSUSD</td><td>USD</td><td>1 day</td></tr><tr><td>Grayscale Net Flows (native units)</td><td>FlowNetGSCNtv</td><td>Native units</td><td>1 day</td></tr><tr><td>Grayscale Net Flows (USD)</td><td>FlowNetGSCUSD</td><td>USD</td><td>1 day</td></tr><tr><td>Invesco Net Flows (native units)</td><td>FlowNetINVNtv</td><td>Native units</td><td>1 day</td></tr><tr><td>Invesco Net Flows (USD)</td><td>FlowNetINVUSD</td><td>USD</td><td>1 day</td></tr><tr><td>Franklin Templeton Net Flows (native units)</td><td>FlowNetTMPNtv</td><td>Native units</td><td>1 day</td></tr><tr><td>Franklin Templeton Net Flows (USD)</td><td>FlowNetTMPUSD</td><td>USD</td><td>1 day</td></tr><tr><td>VanEck Net Flows (native units)</td><td>FlowNetVANNtv</td><td>Native units</td><td>1 day</td></tr><tr><td>VanEck Net Flows (USD)</td><td>FlowNetVANUSD</td><td>USD</td><td>1 day</td></tr><tr><td>Valkyrie Net Flows (native units)</td><td>FlowNetVLKNtv</td><td>Native units</td><td>1 day</td></tr><tr><td>Valkyrie Net Flows (USD)</td><td>FlowNetVLKUSD</td><td>USD</td><td>1 day</td></tr><tr><td>Wisdomtree Net Flows (native units)</td><td>FlowNetWDTNtv</td><td>Native units</td><td>1 day</td></tr><tr><td>Wisdomtree Net Flows (USD)</td><td>FlowNetWDTUSD</td><td>USD</td><td>1 day</td></tr></tbody></table>

### Details

* Native units are considered as sent to an ETF if they are sent to an address we identify as being owned by an ETF.
* Native units are considered as withdrawn if they leave the control of an address we identify as being owned by an ETF.
* This metric is the net of the sends and withdrawals that interval.
* USD metrics are computed as `FlowNet{ETF}Ntv * PriceUSD`

### Asset-Specific Details

* For Bitcoin, this metric excludes the effect of change outputs:
  * If a transaction sends 90 BTC to ETF A but also withdraws 50 BTC from it, the flow is +40 BTC, not +90 BTC and -50 BTC.

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics-v2/FlowNetARKNtv" %}

## API Endpoints

Net Flow metrics can be accessed using these endpoints:

* `timeseries/asset-metrics`

and by passing in the metric ID's `FlowNet*` in the `metrics` parameter.

{% openapi-operation spec="knowledge-coinmetrics-api" path="/timeseries/asset-metrics" method="get" %}
[OpenAPI knowledge-coinmetrics-api](https://gitbook-x-prod-openapi.4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/raw/08e54b073fe224876d70fb093dff66c7f1921316515e8f46ff1b7a4836f20780.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20250725%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250725T204413Z&X-Amz-Expires=172800&X-Amz-Signature=3445c0f15057bdba4449b8da2f8cfab81ba91c772f77058d13e3d3244494bc6d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-operation %}

{% tabs %}
{% tab title="Shell" %}
```shell
curl --compressed "https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=FlowNetARKNtv&assets=btc&pretty=true&api_key=<your_key>"
```
{% endtab %}

{% tab title="Python" %}
```python
import requests
response = requests.get('https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=FlowNetARKNtv&assets=btc&pretty=true&api_key=<your_key>').json()
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
        metrics="FlowNetARKNtv", 
        assets="btc",
    ).to_dataframe()
)
```
{% endtab %}
{% endtabs %}
