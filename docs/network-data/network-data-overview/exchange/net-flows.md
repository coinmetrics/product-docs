# Net Flows

## Contents

* [Net Flows (FlowNetXNtv)](net-flows.md#flownet)

## Net Flows <a href="#flownet" id="flownet"></a>

## Definiton

The net unit value sent or withdrawn to/from an exchange in that interval.

<table><thead><tr><th>Name</th><th width="197">MetricID</th><th>Unit</th><th>Interval</th></tr></thead><tbody><tr><td>Bitfinex Net Flows (native units)</td><td>FlowNetBFXNtv</td><td>Native units</td><td>1 day</td></tr><tr><td>Bitfinex Net Flows (USD)</td><td>FlowNetBFXUSD</td><td>USD</td><td>1 day</td></tr><tr><td>BitMEX Net Flows (native units)</td><td>FlowNetBMXNtv</td><td>Native units</td><td>1 day</td></tr><tr><td>BitMEX Net Flows (USD)</td><td>FlowNetBMXUSD</td><td>USD</td><td>1 day</td></tr><tr><td>Binance Net Flows (native units)</td><td>FlowNetBNBNtvFlow</td><td>Native units</td><td>1 day</td></tr><tr><td>Binance Net Flows (USD)</td><td>FlowNetBNBUSD</td><td>USD</td><td>1 day</td></tr><tr><td>Bitstamp Net Flows (native units)</td><td>FlowNetBSPNtv</td><td>Native units</td><td>1 day</td></tr><tr><td>Bitstamp Net Flows (USD)</td><td>FlowNetBSPUSD</td><td>USD</td><td>1 day</td></tr><tr><td>Bittrex Net Flows (native untis)</td><td>FlowNetBTXNtvFlow</td><td>Native units</td><td>1 day</td></tr><tr><td>Bittrex Net Flows (USD)</td><td>FlowNetBTXUSD</td><td>USD</td><td>1 day</td></tr><tr><td>Gemini Net Flows (native units)</td><td>FlowNetGEMNtv</td><td>Native units</td><td>1 day</td></tr><tr><td>Gemini Net Flows (USD)</td><td>FlowNetGEMUSD</td><td>USD</td><td>1 day</td></tr><tr><td>Huobi Net Flows (native units)</td><td>FlowNetHUONtv</td><td>Native units</td><td>1 day</td></tr><tr><td>Huobi Net Flows (USD)</td><td>FlowNetHUOUSD</td><td>USD</td><td>1 day</td></tr><tr><td>Kraken Net Flows (native units)</td><td>FlowNetKRKNtv</td><td>Native units</td><td>1 day</td></tr><tr><td>Kraken Net Flows (USD)</td><td>FlowNetKRKUSD</td><td>USD</td><td>1 day</td></tr><tr><td>Poloniex Net Flows (native units)</td><td>FlowNetPOLNtv</td><td>Native units</td><td>1 day</td></tr><tr><td>Poloniex Net Flows (USD)</td><td>FlowNetPOLUSD</td><td>USD</td><td>1 day</td></tr></tbody></table>

### Details

* Native units are considered as sent to an exchange if they are sent to an address we identify as being owned by an exchange.
* Native units are considered as withdrawn if they leave the control of an address we identify as being owned by an exchange.
* This metric is the net of the sends and withdrawals that interval.
* USD metrics are computed as FlowNet{Exchange}Ntv \* PriceUSD

### Asset-Specific Details

* This metric might not be available for all assets. Either that exchange doesn’t support this asset (BitMEX only trades in BTC for example), or we deemed that our coverage of the exchange was not complete enough to release the metric for it.
* For Bitcoin, this metric excludes the effect of change outputs:
  * If a transaction sends 90 BTC to exchange A but also withdraws 50 BTC from it, the flow is +40 BTC, not +90 BTC and -50 BTC.

### Release History

* Released in the 4.0 release of NDP

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/FlowNetBFXNtv" %}

## API Endpoints

Net Flow metrics can be accessed using these endpoints:

* `timeseries/asset-metrics`

and by passing in the metric ID's `FlowNet*` in the `metrics` parameter.

{% swagger src="../../../.gitbook/assets/openapi.yaml" path="/timeseries/asset-metrics" method="get" %}
[openapi.yaml](../../../.gitbook/assets/openapi.yaml)
{% endswagger %}

{% tabs %}
{% tab title="Shell" %}
```shell
curl --compressed "https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=FlowNetBFXNtv&assets=btc&pretty=true&api_key=<your_key>"
```
{% endtab %}

{% tab title="Python" %}
```python
import requests
response = requests.get('https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=FlowNetBFXNtv&assets=btc&pretty=true&api_key=<your_key>').json()
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
        metrics="FlowNetBFXNtv", 
        assets="btc",
    ).to_dataframe()
)
```
{% endtab %}
{% endtabs %}
