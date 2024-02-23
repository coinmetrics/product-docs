# Contents

* [Net Flows](net-flows.md#flownet)

# Net Flows<a href="#flownet" id="flownet"></a>

# Definiton

The net unit value sent or withdrawn to/from an exchange in that interval.

| Name                              | MetricID      | Category | Subcategory | Type | Unit         | Interval |
| --------------------------------- | ------------- | -------- | ----------- | ---- | ------------ | -------- |
| Bitfinex Net Flows (native units) | FlowNetBFXNtv | Exchange | Net Flows   | Sum  | Native units | 1 day    |
| Bitfinex Net Flows (USD) | FlowNetBFXUSD | Exchange | Net Flows   | Sum  | USD  | 1 day    |
| BitMEX Net Flows (native units) | FlowNetBMXNtv | Exchange | Net Flows   | Sum  | Native units | 1 day    |
| BitMEX Net Flows (USD) | FlowNetBMXUSD | Exchange | Net Flows   | Sum  | USD  | 1 day    |
| Binance Net Flows (native units) | FlowNetBNBNtvFlow | Exchange | Net Flows   | Sum  | Native units | 1 day    |
| Binance Net Flows (USD) | FlowNetBNBUSD | Exchange | Net Flows   | Sum  | USD  | 1 day    |
| Bitstamp Net Flows (native units) | FlowNetBSPNtv | Exchange | Net Flows   | Sum  | Native units | 1 day    |
| Bitstamp Net Flows (USD) | FlowNetBSPUSD | Exchange | Net Flows   | Sum  | USD  | 1 day    |
| Bittrex Net Flows (native untis) | FlowNetBTXNtvFlow | Exchange | Net Flows   | Sum  | Native units | 1 day    |
| Bittrex Net Flows (USD) | FlowNetBTXUSD | Exchange | Net Flows   | Sum  | USD  | 1 day    |
| Gemini Net Flows (native units) | FlowNetGEMNtv | Exchange | Net Flows   | Sum  | Native units | 1 day    |
| Gemini Net Flows (USD) | FlowNetGEMUSD | Exchange | Net Flows   | Sum  | USD  | 1 day    |
| Huobi Net Flows (native units) | FlowNetHUONtv | Exchange | Net Flows   | Sum  | Native units | 1 day    |
| Huobi Net Flows (USD) | FlowNetHUOUSD | Exchange | Net Flows   | Sum  | USD  | 1 day    |
| Kraken Net Flows (native units) | FlowNetKRKNtv | Exchange | Net Flows   | Sum  | Native units | 1 day    |
| Kraken Net Flows (USD) | FlowNetKRKUSD | Exchange | Net Flows   | Sum  | USD  | 1 day    |
| Poloniex Net Flows (native units) | FlowNetPOLNtv | Exchange | Net Flows   | Sum  | Native units | 1 day    |
| Poloniex Net Flows (USD) | FlowNetPOLUSD | Exchange | Net Flows   | Sum  | USD  | 1 day    |

## Details

* Native units are considered as sent to an exchange if they are sent to an address we identify as being owned by an exchange.
* Native units are considered as withdrawn if they leave the control of an address we identify as being owned by an exchange.
* This metric is the net of the sends and withdrawals that interval.
* USD metrics are computed as FlowNet{Exchange}Ntv \* PriceUSD

## Asset-Specific Details

* This metric might not be available for all assets. Either that exchange doesn’t support this asset (BitMEX only trades in BTC for example), or we deemed that our coverage of the exchange was not complete enough to release the metric for it.
* For Bitcoin, this metric excludes the effect of change outputs:
*
  * If a transaction sends 90 BTC to exchange A but also withdraws 50 BTC from it, the flow is +40 BTC, not +90 BTC and -50 BTC.

## Release History

* Released in the 4.0 release of NDP

## Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/FlowNetBFXNtv" %}

# API Endpoints

Net Flow metrics can be accessed using these endpoints:

* `timeseries/asset-metrics`

and by passing in the metric ID's `FlowNet*` in the `metrics` parameter.

{% swagger src="../../.gitbook/assets/openapi.yaml" path="/timeseries/asset-metrics" method="get" %}
[openapi.yaml](../../.gitbook/assets/openapi.yaml)
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
