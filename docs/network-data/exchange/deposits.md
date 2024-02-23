# Contents

* [Exchange Deposits](deposits.md#flowin)
* [Exchange Deposit Count](deposits.md#flowtfrin)

# Exchange Deposits<a href="#flowin" id="flowin"></a>

## Definition

The sum of assets sent to an exchange that interval.

| Name                             | MetricID     | Category | Subcategory | Type | Unit         | Interval       |
| -------------------------------- | ------------ | -------- | ----------- | ---- | ------------ | -------------- |
| Bitfinex Deposits (native units) | FlowInBFXNtv | Exchange | Deposits    | Sum  | Native units | 1 block, 1 day |
| Bitfinex Deposits (USD) | FlowInBFXUSD | Exchange | Deposits    | Sum  | USD  | 1 block, 1 day |
| BitMEX Deposits (native units) | FlowInBMXNtv | Exchange | Deposits    | Sum  | Native units | 1 block, 1 day |
| BitMEX Deposits (USD) | FlowInBMXUSD | Exchange | Deposits    | Sum  | USD  | 1 block, 1 day |
| Binance Deposits (native units) | FlowInBNBNtv | Exchange | Deposits    | Sum  | Native units | 1 block, 1 day |
| Binance Deposits (USD) | FlowInBNBUSD | Exchange | Deposits    | Sum  | USD  | 1 block, 1 day |
| Bitstamp Deposits (native units) | FlowInBSPNtv | Exchange | Deposits    | Sum  | Native units | 1 block, 1 day |
| Bitstamp Deposits (USD) | FlowInBSPUSD | Exchange | Deposits    | Sum  | USD  | 1 block, 1 day |
| Bittrex Deposits (native units) | FlowInBTCNtv | Exchange | Deposits    | Sum  | Native units | 1 block, 1 day |
| Bittrex Deposit (USD) | FlowInBTXUSD | Exchange | Deposits    | Sum  | USD  | 1 block, 1 day |
| Gemini Deposits (native units) | FlowInGEMNtv | Exchange | Deposits    | Sum  | Native units | 1 block, 1 day |
| Gemini Deposits (USD) | FlowInGEMUSD | Exchange | Deposits    | Sum  | USD  | 1 block, 1 day |
| Huobi Deposits (native units) | FlowInHUONtv | Exchange | Deposits    | Sum  | Native units | 1 block, 1 day |
| Huobi Deposits (USD) | FlowInHUOUSD | Exchange | Deposits    | Sum  | USD  | 1 block, 1 day |
| Kraken Deposits (native units) | FlowInKRKNtv | Exchange | Deposits    | Sum  | Native units | 1 block, 1 day |
| Kraken Deposits (USD) | FlowInKRKUSD | Exchange | Deposits    | Sum  | USD  | 1 block, 1 day |
| Poloniex Deposits (native units) | FlowInPOLNtv | Exchange | Deposits    | Sum  | Native units | 1 block, 1 day |
| Poloniex Deposits (USD) | FlowInPOLUSD | Exchange | Deposits    | Sum  | USD  | 1 block, 1 day |

## Details

* Native units are considered as sent to an exchange if they are sent to an address we identify as being owned by an exchange.
* USD flows are computed as FlowIn{Exchange}Ntv \* PriceUSD


## Chart

<figure><img src="../../.gitbook/assets/BTC_Sent_to_Bitfinex___Deposit_Count.png" alt=""><figcaption></figcaption></figure>

## Asset-Specific Details

* This metric might not be available for all assets. Either the exchange doesn’t support this asset, or we deemed that our coverage of the exchange was not complete enough to release the metric for it.
* For Bitcoin, this metric excludes the effect of change outputs:
  * If a transaction sends 90 BTC to exchange A but also withdraws 50 BTC from it, the flow is +40 BTC, not +90 BTC and -50 BTC.

## Examples

* During times of market stress or uncertainty, we see an uptick in BTC/funds being moved to exchanges. During the Luna collapse in spring 2021, we can see a rise in BTC being sent to both Bitfinex and Binance which is a precursor for more downside pressure as often times users are converting their funds into fiat or stable coins.

## Release History

* Released in the 4.0 release of NDP

## Interpretation

* This metric looks at the flow of funds being sent to Bitfinex and can give us a sense of market sentiment.

## Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/FlowInBFXNtv" %}

# Exchange Depoosit Count<a href="#flowtfrin" id="flowtfrin"></a>

## Definition

The sum count of transfers to any address belonging to an exchange in that interval. If the sender address also belongs to Binfinex, the transfer is not counted.

| Name                 | MetricID        | Category | Subcategory | Type | Unit         | Interval       |
| -------------------- | --------------- | -------- | ----------- | ---- | ------------ | -------------- |
| Bitfinex Deposit Cnt | FlowTfrInBFXCnt | Exchange | Deposits    | Sum  | Native units | 1 block, 1 day |
| BitMEX Deposit Cnt | FlowTfrInBMXCnt | Exchange | Deposits    | Sum  | Native units | 1 block, 1 day |
| Binance Deposit Cnt | FlowTfrInBNBCnt | Exchange | Deposits    | Sum  | Native units | 1 block, 1 day |
| Bitstamp Deposit Cnt | FlowTfrInBSPCnt | Exchange | Deposits    | Sum  | Native units | 1 block, 1 day |
| Bittrex Deposit Cnt | FlowTfrInBTXCnt | Exchange | Deposits    | Sum  | Native units | 1 block, 1 day |
| Gemini Deposit Cnt | FlowTfrInGEMCnt | Exchange | Deposits    | Sum  | Native units | 1 block, 1 day |
| Huobi Deposit Cnt | FlowTfrInHUOCnt | Exchange | Deposits    | Sum  | Native units | 1 block, 1 day |
| Kraken Deposit Cnt | FlowTfrInKRKCnt | Exchange | Deposits    | Sum  | Native units | 1 block, 1 day |
| Poloniex Deposit Cnt | FlowTfrInPOLCnt | Exchange | Deposits    | Sum  | Native units | 1 block, 1 day |

## Details

* Coinbase (i.e., miner reward) transactions are not counted.

## Asset-Specific Details

* For UTXO-based protocols, this metric does not count change outputs:
*
  * If the input addresses belong to Bitfinex, then the outputs belonging to Bitfinex are not counted as transfers to Bitfinex
* For account-based protocols, if both sender and recipient belong to Bitfinex, then the transfer is not counted.

## Release History

* Version 4.2 of CM Network Data Pro Daily Macro (End of Day)

## Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/FlowTfrInBFXCnt" %}

# API Endpoints

Exhange Deposits metrics can be accessed using these endpoints:

* `timeseries/asset-metrics`

and by passing in the metric ID's `FlowIn*` and `FlowTfrIn*` in the `metrics` parameter.

{% swagger src="../../.gitbook/assets/openapi.yaml" path="/timeseries/asset-metrics" method="get" %}
[openapi.yaml](../../.gitbook/assets/openapi.yaml)
{% endswagger %}

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
