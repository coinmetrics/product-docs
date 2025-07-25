# Deposits

## Contents

* [Exchange Deposits (FlowInXNtv, FlowInXUSD)](deposits.md#flowin)
* [Exchange Deposit Count (FlowTfrInXCnt)](deposits.md#flowtfrin)

## Exchange Deposits <a href="#flowin" id="flowin"></a>

### Definition

The sum of assets sent to an exchange that interval.

| Name                              | MetricID     | Unit         | Interval       |
| --------------------------------- | ------------ | ------------ | -------------- |
| Bitfinex Deposits (native units)  | FlowInBFXNtv | Native units | 1 block, 1 day |
| Bitfinex Deposits (USD)           | FlowInBFXUSD | USD          | 1 block, 1 day |
| BitMEX Deposits (native units)    | FlowInBMXNtv | Native units | 1 block, 1 day |
| BitMEX Deposits (USD)             | FlowInBMXUSD | USD          | 1 block, 1 day |
| Binance Deposits (native units)   | FlowInBNBNtv | Native units | 1 block, 1 day |
| Binance Deposits (USD)            | FlowInBNBUSD | USD          | 1 block, 1 day |
| Bitstamp Deposits (native units)  | FlowInBSPNtv | Native units | 1 block, 1 day |
| Bitstamp Deposits (USD)           | FlowInBSPUSD | USD          | 1 block, 1 day |
| Bittrex Deposits (native units)   | FlowInBTCNtv | Native units | 1 block, 1 day |
| Bittrex Deposit (USD)             | FlowInBTXUSD | USD          | 1 block, 1 day |
| Bybit Deposit (native units)      | FlowInBITNtv | Native units | 1 day          |
| Bybit Deposit (USD)               | FlowInBITUSD | USD          | 1 day          |
| Coinbase Deposit (native units)   | FlowInCBSNtv | Native units | 1 day          |
| Coinbase Deposit (USD)            | FlowInCBSUSD | USD          | 1 day          |
| Crypto.com Deposit (native units) | FlowInCRONtv | Native units | 1 day          |
| Crypto.com Deposit (USD)          | FlowInCROUSD | USD          | 1 day          |
| Deribit Deposit (native units)    | FlowInDERNtv | Native units | 1 day          |
| Deribit Deposit (USD)             | FlowInDERUSD | USD          | 1 day          |
| Gate.io Deposit (native units)    | FlowInGIONtv | Native units | 1 day          |
| Gate.io Deposit (USD)             | FlowInGIOUSD | USD          | 1 day          |
| Gemini Deposits (native units)    | FlowInGEMNtv | Native units | 1 block, 1 day |
| Gemini Deposits (USD)             | FlowInGEMUSD | USD          | 1 block, 1 day |
| HitBTC Deposits (native units)    | FlowInHBTNtv | Native units | 1 day          |
| HitBTC Deposits (USD)             | FlowInHBTUSD | USD          | 1 day          |
| Huobi Deposits (native units)     | FlowInHUONtv | Native units | 1 block, 1 day |
| Huobi Deposits (USD)              | FlowInHUOUSD | USD          | 1 block, 1 day |
| Korbit Deposits (native units)    | FlowInKORNtv | Native units | 1 day          |
| Korbit Deposits (USD)             | FlowInKORUSD | USD          | 1 day          |
| Kraken Deposits (native units)    | FlowInKRKNtv | Native units | 1 block, 1 day |
| Kraken Deposits (USD)             | FlowInKRKUSD | USD          | 1 block, 1 day |
| Kucoin Deposits (native units)    | FlowInKCNNtv | Native units | 1 day          |
| Kucoin Deposits (USD)             | FlowInKCNUSD | USD          | 1 day          |
| MEXC Deposits (native units)      | FlowInMXCNtv | Native units | 1 day          |
| MEXC Deposits (USD)               | FlowInMXCUSD | USD          | 1 day          |
| NBX Deposits (native units)       | FlowInNBXNtv | Native units | 1 day          |
| NBX Deposits (USD)                | FlowInNBXUSD | USD          | 1 day          |
| OKX Deposits (native units)       | FlowInOKXNtv | Native units | 1 day          |
| OKX Deposits (USD)                | FlowInOKXUSD | USD          | 1 day          |
| Poloniex Deposits (native units)  | FlowInPOLNtv | Native units | 1 block, 1 day |
| Poloniex Deposits (USD)           | FlowInPOLUSD | USD          | 1 block, 1 day |
| SwissBorg Deposits (native units) | FlowInSBGNtv | Native units | 1 day          |
| SwissBorg Deposits (USD)          | FlowInSBGUSD | USD          | 1 day          |

### Details

* Native units are considered as sent to an exchange if they are sent to an address we identify as being owned by an exchange.
* USD flows are computed as FlowIn{Exchange}Ntv \* PriceUSD

### Chart

<figure><img src="../../../.gitbook/assets/BTC_Sent_to_Bitfinex___Deposit_Count.png" alt=""><figcaption></figcaption></figure>

### Asset-Specific Details

* This metric might not be available for all assets. Either the exchange doesn’t support this asset, or we deemed that our coverage of the exchange was not complete enough to release the metric for it.
* For Bitcoin, this metric excludes the effect of change outputs:
  * If a transaction sends 90 BTC to exchange A but also withdraws 50 BTC from it, the flow is +40 BTC, not +90 BTC and -50 BTC.

### Examples

* During times of market stress or uncertainty, we see an uptick in BTC/funds being moved to exchanges. During the Luna collapse in spring 2021, we can see a rise in BTC being sent to both Bitfinex and Binance which is a precursor for more downside pressure as often times users are converting their funds into fiat or stable coins.

### Release History

* Released in the 4.0 release of NDP

### Interpretation

* This metric looks at the flow of funds being sent to Bitfinex and can give us a sense of market sentiment.

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/FlowInBFXNtv" %}

## Exchange Depoosit Count <a href="#flowtfrin" id="flowtfrin"></a>

### Definition

The sum count of transfers to any address belonging to an exchange in that interval. If the sender address also belongs to Binfinex, the transfer is not counted.

<table><thead><tr><th>Name</th><th width="181">MetricID</th><th>Unit</th><th>Interval</th></tr></thead><tbody><tr><td>Bitfinex Deposit Cnt</td><td>FlowTfrInBFXCnt</td><td>Native units</td><td>1 block, 1 day</td></tr><tr><td>BitMEX Deposit Cnt</td><td>FlowTfrInBMXCnt</td><td>Native units</td><td>1 block, 1 day</td></tr><tr><td>Binance Deposit Cnt</td><td>FlowTfrInBNBCnt</td><td>Native units</td><td>1 block, 1 day</td></tr><tr><td>Bitstamp Deposit Cnt</td><td>FlowTfrInBSPCnt</td><td>Native units</td><td>1 block, 1 day</td></tr><tr><td>Bittrex Deposit Cnt</td><td>FlowTfrInBTXCnt</td><td>Native units</td><td>1 block, 1 day</td></tr><tr><td>Bybit Deposit Cnt</td><td>FlowTfrInBITCnt</td><td>Native units</td><td>1 day</td></tr><tr><td>Coinbase Deposit Cnt</td><td>FlowTfrInCBSCnt</td><td>Native units</td><td>1 day</td></tr><tr><td>Crypto.com Deposit Cnt</td><td>FlowTfrInCROCnt</td><td>Native units</td><td>1 day</td></tr><tr><td>Deribit Deposit Cnt</td><td>FlowTfrInDERCnt</td><td>Native units</td><td>1 day</td></tr><tr><td>Gate.io Deposit Cnt</td><td>FlowTfrInGIOCnt</td><td>Native units</td><td>1 day</td></tr><tr><td>Gemini Deposit Cnt</td><td>FlowTfrInGEMCnt</td><td>Native units</td><td>1 block, 1 day</td></tr><tr><td>HitBTC Deposit Cnt</td><td>FlowTfrInHBTCnt</td><td>Native Units</td><td>1 day</td></tr><tr><td>Huobi Deposit Cnt</td><td>FlowTfrInHUOCnt</td><td>Native units</td><td>1 block, 1 day</td></tr><tr><td>Korbit Deposit Cnt</td><td>FlowTfrInKORCnt</td><td>Native units</td><td>1 day</td></tr><tr><td>Kraken Deposit Cnt</td><td>FlowTfrInKRKCnt</td><td>Native units</td><td>1 block, 1 day</td></tr><tr><td>Kucoin Deposit Cnt</td><td>FlowTfrInKCNCnt</td><td>Native units</td><td>1 day</td></tr><tr><td>MEXC Deposit Cnt</td><td>FlowTfrInMXCCnt</td><td>Native units</td><td>1 day</td></tr><tr><td>NBX Deposit Cnt</td><td>FlowTfrInNBXCnt</td><td>Native units</td><td>1 day</td></tr><tr><td>OKX Deposit Cnt</td><td>FlowTfrInOKXCnt</td><td>Native units</td><td>1 day</td></tr><tr><td>Poloniex Deposit Cnt</td><td>FlowTfrInPOLCnt</td><td>Native units</td><td>1 block, 1 day</td></tr><tr><td>SwissBorg Deposit Cnt</td><td>FlowTfrInSBGCnt</td><td>Native units</td><td>1 day</td></tr></tbody></table>

### Details

* Coinbase (i.e., miner reward) transactions are not counted.

### Asset-Specific Details

* For UTXO-based protocols, this metric does not count change outputs:
*
  * If the input addresses belong to Bitfinex, then the outputs belonging to Bitfinex are not counted as transfers to Bitfinex
* For account-based protocols, if both sender and recipient belong to Bitfinex, then the transfer is not counted.

### Release History

* Version 4.2 of CM Network Data Pro Daily Macro (End of Day)

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/FlowTfrInBFXCnt" %}

## API Endpoints

Exhange Deposits metrics can be accessed using these endpoints:

* `timeseries/asset-metrics`

and by passing in the metric ID's `FlowIn*` and `FlowTfrIn*` in the `metrics` parameter.

{% openapi-operation spec="knowledge-coinmetrics-api" path="/timeseries/asset-metrics" method="get" %}
[OpenAPI knowledge-coinmetrics-api](https://gitbook-x-prod-openapi.4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/raw/08e54b073fe224876d70fb093dff66c7f1921316515e8f46ff1b7a4836f20780.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20250725%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250725T204414Z&X-Amz-Expires=172800&X-Amz-Signature=4f276cdbbe6e6a74330d81207f3b5964dda3faf8fd52501440d533444f0f0a4c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-operation %}

{% tabs %}
{% tab title="Shell" %}
```shell
curl --compressed "https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=FlowInBFXNtv&assets=btc&pretty=true&api_key=<your_key>"
```
{% endtab %}

{% tab title="Python" %}
```python
import requests
response = requests.get('https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=FlowInBFXNtv&assets=btc&pretty=true&api_key=<your_key>').json()
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
        metrics="FlowInBFXNtv", 
        assets="btc",
    ).to_dataframe()
)
```
{% endtab %}
{% endtabs %}
