# Exchange Supply

## Contents

* [Exchange Supply (SplyXNtv, SplyXUSD)](exchange-supply.md#splyex)

## Exchange Supply <a href="#splyex" id="splyex"></a>

### Definition

The sum held by an exchange at the end of that interval.

| Name                             | MetricID   | Unit         | Interval |
| -------------------------------- | ---------- | ------------ | -------- |
| Bitfinex Supply (native units)   | SplyBFXNtv | Native units | 1 day    |
| Bitfinex Supply (USD)            | SplyBFXUSD | USD          | 1 day    |
| BitMEX Supply (native units)     | SplyBMXNtv | Native units | 1 day    |
| BitMEX Supply (USD)              | SplyBMXUSD | USD          | 1 day    |
| Binance Supply (native units)    | SplyBNBNtv | Native units | 1 day    |
| Binance Supply (USD)             | SplyBNBUSD | USD          | 1 day    |
| Bitstamp Supply (native units)   | SplyBSPNtv | Native units | 1 day    |
| Bitstamp Supply (USD)            | SplyBSPUSD | USD          | 1 day    |
| Bittrex Supply (native units)    | SplyBTXNtv | Native units | 1 day    |
| Bittrex Supply (USD)             | SplyBTXUSD | USD          | 1 day    |
| Bybit Supply (native units)      | SplyBITNtv | Native units | 1 day    |
| Bybit Supply (USD)               | SplyBITUSD | USD          | 1 day    |
| Coinbase Supply (native units)   | SplyCBSNtv | Native units | 1 day    |
| Coinbase Supply (USD)            | SplyCBSUSD | USD          | 1 day    |
| Crypto.com Supply (native units) | SplyCRONtv | Native units | 1 day    |
| Crypto.com Supply (USD)          | SplyCROUSD | USD          | 1 day    |
| Deribit Supply (native units)    | SplyDERNtv | Native units | 1 day    |
| Deribit Supply (USD)             | SplyDERUSD | USD          | 1 day    |
| Exchange Supply (native units)   | SplyExNtv  | Native units | 1 day    |
| Exchange Supply (USD)            | SplyExUSD  | USD          | 1 day    |
| Gate.io Supply (native units)    | SplyGIONtv | Native units | 1 day    |
| Gate.io Supply (USD)             | SplyGIOUSD | USD          | 1 day    |
| Gemini Supply (native units)     | SplyGEMNtv | Native units | 1 day    |
| Gemini Supply (USD)              | SplyGEMUSD | USD          | 1 day    |
| HitBTC Supply (native units)     | SplyHBTNtv | Native units | 1 day    |
| BitBTC Supply (USD)              | SplyHBTUSD | USD          | 1 day    |
| Huobi Supply (native units)      | SplyHUONtv | Native units | 1 day    |
| Huobi Supply (USD)               | SplyHUOUSD | USD          | 1 day    |
| Korbit Supply (native units)     | SplyKORNtv | Native units | 1 day    |
| Korbit Supply (USD)              | SplyKORUSD | USD          | 1 day    |
| Kraken Supply (native units)     | SplyKRKNtv | Native units | 1 day    |
| Kraken Supply (USD)              | SplyKRKUSD | USD          | 1 day    |
| Kucoin Supply (native units)     | SplyKCNNtv | Native units | 1 day    |
| Kucoin Supply (USD)              | SplyKCNUSD | USD          | 1 day    |
| MEXC Supply (native units)       | SplyMXCNtv | Native units | 1 day    |
| MEXC Supply (USD)                | SplyMXCUSD | USD          | 1 day    |
| NBX Supply (native units)        | SplyNBXNtv | Native units | 1 day    |
| NBX Supply (USD)                 | SplyNBXUSD | USD          | 1 day    |
| OKX Supply (native units)        | SplyOKXNtv | Native units | 1 day    |
| OKX Supply (USD)                 | SplyOKXUSD | USD          | 1 day    |
| Poloniex Supply (native units)   | SplyPOLNtv | Native units | 1 day    |
| Poloniex Supply (USD)            | SplyPOLUSD | USD          | 1 day    |
| Poloniex Supply (native units)   | SplySBGNtv | Native units | 1 day    |
| Poloniex Supply (USD)            | SplySBGUSD | USD          | 1 day    |

### Details

* All wallets (hot and cold) are considered to count towards the supply held by an exchange.
* This metric should be seen as an underestimation of the actual figure, as our heuristics and sources might not discover all addresses owned by an exchange.
* USD metrics computed as SplyBFXNtv \* PriceUSD.
* `SplyEx*` includes the balances of all addresses we have flagged as being controlled by an exchange, even if our coverage of the exchange is not complete.

### Asset-Specific Details

* This metric might not be available for all assets. Either that exchange doesn’t support this asset (BitMEX only trades in BTC for example), or we deemed that our coverage of the exchange was not complete enough to release the metric for it.

### Release History

* Released in the 4.0 release of NDP

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/SplyBFXNtv" %}

## API Endpoints

Exchange Supply metrics can be accessed using these endpoints:

* `timeseries/asset-metrics`

and by passing in the metric ID's `Sply{Exchange}*` in the `metrics` parameter.

{% openapi-operation spec="knowledge-coinmetrics-api" path="/timeseries/asset-metrics" method="get" %}
[OpenAPI knowledge-coinmetrics-api](https://gitbook-x-prod-openapi.4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/raw/08e54b073fe224876d70fb093dff66c7f1921316515e8f46ff1b7a4836f20780.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20250725%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250725T204414Z&X-Amz-Expires=172800&X-Amz-Signature=4f276cdbbe6e6a74330d81207f3b5964dda3faf8fd52501440d533444f0f0a4c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-operation %}

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
