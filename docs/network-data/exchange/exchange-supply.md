# Contents

* [Exchange Supply](exchange-supply.md#splyex)

# Exchange Supply<a href="#splyex" id="splyex"></a>

## Definition

The sum held by an exchange at the end of that interval.

| Name                           | MetricID   | Category | Subcategory     | Type | Unit         | Interval |
| ------------------------------ | ---------- | -------- | --------------- | ---- | ------------ | -------- |
| Bitfinex Supply (native units) | SplyBFXNtv | Exchange | Exchange Supply | Sum  | Native units | 1 day    |
 Bitfinex Supply (USD) | SplyBFXUSD | Exchange | Exchange Supply | Sum  | USD  | 1 day    |
 | BitMEX Supply (native units) | SplyBMXNtv | Exchange | Exchange Supply | Sum  | Native units | 1 day    |
 | BitMEX Supply (USD) | SplyBMXUSD | Exchange | Exchange Supply | Sum  | USD  | 1 day    |
 | Binance Supply (native units) | SplyBNBNtv | Exchange | Exchange Supply | Sum  | Native units | 1 day    |
 | Binance Supply (USD) | SplyBNBUSD | Exchange | Exchange Supply | Sum  | USD  | 1 day    |
 | Bitstamp Supply (native units) | SplyBSPNtv | Exchange | Exchange Supply | Sum  | Native units | 1 day    |
 | Bitstamp Supply (USD) | SplyBSPUSD | Exchange | Exchange Supply | Sum  | USD  | 1 day    |
| Bittrex Supply (native units) | SplyBTXNtv | Exchange | Exchange Supply | Sum  | Native units | 1 day    |
| Bittrex Supply (USD) | SplyBTXUSD | Exchange | Exchange Supply | Sum  | USD  | 1 day    |
| Exchange Supply (native units) | SplyExNtv | Supply   | Held on exchange | Sum  | Native units | 1 day    |
| Exchange Supply (USD) | SplyExUSD | Supply   | Held on exchange | Sum  | USD  | 1 day    |
| Gemini Supply (native units) | SplyGEMNtv | Exchange | Exchange Supply | Sum  | Native units | 1 day    |
| Gemini Supply (USD) | SplyGEMUSD | Exchange | Exchange Supply | Sum  | USD  | 1 day    |
| Huobi Supply (native units) | SplyHUONtv | Exchange | Exchange Supply | Sum  | Native units | 1 day    |
| Huobi Supply (USD) | SplyHUOUSD | Exchange | Exchange Supply | Sum  | USD  | 1 day    |
| Kraken Supply (native units) | SplyKRKNtv | Exchange | Exchange Supply | Sum  | Native units | 1 day    |
| Kraken Supply (USD) | SplyKRKUSD | Exchange | Exchange Supply | Sum  | USD  | 1 day    |
| Poloniex Supply (native units) | SplyPOLNtv | Exchange | Exchange Supply | Sum  | Native units | 1 day    |
| Poloniex Supply (USD) | SplyPOLUSD | Exchange | Exchange Supply | Sum  | USD  | 1 day    |

## Details

* All wallets (hot and cold) are considered to count towards the supply held by an exchange.
* This metric should be seen as an underestimation of the actual figure, as our heuristics and sources might not discover all addresses owned by an exchange.
* USD metrics computed as SplyBFXNtv \* PriceUSD.
* `SplyEx*` includes the balances of all addresses we have flagged as being controlled by an exchange, even if our coverage of the exchange is not complete.

## Asset-Specific Details

* This metric might not be available for all assets. Either that exchange doesn’t support this asset (BitMEX only trades in BTC for example), or we deemed that our coverage of the exchange was not complete enough to release the metric for it.

## Release History

* Released in the 4.0 release of NDP

## Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/SplyBFXNtv" %}

# API Endpoints

Exchange Supply metrics can be accessed using these endpoints:

* `timeseries/asset-metrics`

and by passing in the metric ID's `Sply{Exchange}*` in the `metrics` parameter.

{% swagger src="../../.gitbook/assets/openapi.yaml" path="/timeseries/asset-metrics" method="get" %}
[openapi.yaml](../../.gitbook/assets/openapi.yaml)
{% endswagger %}

{% tabs %}
{% tab title="Shell" %}
```shell
curl --compressed "https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=SplyBFXNtv&assets=btc&pretty=true&api_key=<your_key>"
```
{% endtab %}

{% tab title="Python" %}
```python
import requests
response = requests.get('https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=SplyBFXNtv&assets=btc&pretty=true&api_key=<your_key>').json()
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
        metrics="SplyBFXNtv", 
        assets="btc",
    ).to_dataframe()
)
```
{% endtab %}
{% endtabs %}
