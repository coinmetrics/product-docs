# Contents

* [Exchange Withdrawals](withdrawals.md#flowout)
* [Exchange Withdrawals (Total)](withdrawals.md#flowoutex)
* [Exchange Withdrawals, Incl EtoE](withdrawals.md#flowoutexincl)
* [Withdrawal Count](withdrawals.md#flowtfrout)

# Exchange Withdrawals<a href="#flowout" id="flowout"></a>
## Definition

The sum withdrawn from an exchange that day.

| Name                                | MetricID      | Category | Subcategory | Type | Unit         | Interval       |
| ----------------------------------- | ------------- | -------- | ----------- | ---- | ------------ | -------------- |
| Bitfinex Withdrawals (native units) | FlowOutBFXNtv | Exchange | Withdrawals | Sum  | Native units | 1 block, 1 day |
| Bitfinex Withdrawals (USD) | FlowOutBFXUSD | Exchange | Withdrawals | Sum  | USD  | 1 block, 1 day |
| BitMEX Withdrawals (native units) | FlowOutBMXNtv | Exchange | Withdrawals | Sum  | Native units | 1 block, 1 day |
| BitMEX Withdrawals (USD) | FlowOutBMXUSD | Exchange | Withdrawals | Sum  | USD  | 1 block, 1 day |
| Binance Withdrawals (native units) | FlowOutBNBNtv | Exchange | Withdrawals | Sum  | Native units | 1 block, 1 day |
| Binance Withdrawals (USD) | FlowOutBNBUSD | Exchange | Withdrawals | Sum  | USD  | 1 block, 1 day |
| Bitstamp Withdrawals (native units) | FlowOutBSPNtv | Exchange | Withdrawals | Sum  | Native units | 1 block, 1 day |
| Bitstamp Withdrawals (USD) | FlowOutBSPUSD | Exchange | Withdrawals | Sum  | USD  | 1 block, 1 day |
| Bittrex Withdrawals (native units) | FlowOutBTXNtv | Exchange | Withdrawals | Sum  | Native units | 1 block, 1 day |
| Bittrex Withdrawals (USD) | FlowOutBTXUSD | Exchange | Withdrawals | Sum  | USD  | 1 block, 1 day |
| Gemini Withdrawals (native units) | FlowOutGEMNtv | Exchange | Withdrawals | Sum  | Native units | 1 block, 1 day |
| Gemini Withdrawals (USD) | FlowOutGEMUSD | Exchange | Withdrawals | Sum  | USD  | 1 block, 1 day |
| Huobi Withdrawals (native units) | FlowOutHUONtv | Exchange | Withdrawals | Sum  | Native units | 1 block, 1 day |
| Huobi Withdrawal (USD) | FlowOutHUOUSD | Exchange | Withdrawals | Sum  | USD  | 1 block, 1 day |
| Kraken Withdrawals (native units) | FlowOutKRKNtv | Exchange | Withdrawals | Sum  | Native units | 1 block, 1 day |
| Kraken Withdrawals (USD) | FlowOutKRKUSD | Exchange | Withdrawals | Sum  | USD  | 1 block, 1 day |
| Poloniex Withdrawals (native units) | FlowOutPOLNtv | Exchange | Withdrawals | Sum  | Native units | 1 block, 1 day |
| Poloniex Withdrawals (USD) | FlowOutPOLUSD | Exchange | Withdrawals | Sum  | USD  | 1 block, 1 day |

## Details

* Native units are considered as withdrawn if they leave the control of an address we identify as being owned by an exchange.

## Asset-Specific Details

* This metric might not be available for all assets. Either that exchange doesn’t support this asset (BitMEX only trades in BTC for example), or we deemed that our coverage of the exchange was not complete enough to release the metric for it.
* For Bitcoin, this metric excludes the effect of change outputs:
*
  * If a transaction spends 100 BTC from exchange A but 90 BTC are sent back to it as change, the flow is -10 BTC, not -100 BTC and +90 BTC.

## Release History

* Released in the 4.0 release of NDP

## Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/FlowOutBFXNtv" %}

# Exchange Withdrawals (Total)<a href="#flowoutex" id="flowoutex"></a>

## Definition

The sum withdrawn from exchanges that day, excluding exchange to exchange activity.

| Name                                | MetricID     | Category | Subcategory | Type | Unit         | Interval       |
| ----------------------------------- | ------------ | -------- | ----------- | ---- | ------------ | -------------- |
| Exchange Withdrawals (native units) | FlowOutExNtv | Exchange | Withdrawals | Sum  | Native units | 1 block, 1 day |
| Exchange Withdrawals (USD) | FlowOutExUSD | Exchange | Withdrawals | Sum  | USD  | 1 block, 1 day |

## Details

* This metric captures interactions between users of a cryptoasset and exchanges supporting that market. It excludes inter-exchange activity.
* If a transaction sends 90 units from exchange B to exchange A, it doesn’t count towards this metric.
* If a transaction spends 10 units from exchange A and sends 5 units to exchange B and 5 units to unknown destination, it counts as a 5 units outflow for exchanges overall, 10 units outflow for exchange A, 5 units inflow for exchange B

## Release History

* Released in the 4.0 release of NDP

## Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/FlowOutExNtv" %}

# Exchange Withdrawals, Incl EtoE (USD)<a href="#flowoutexincl" id="flowoutexincl"></a>

## Definition

The sum USD value withdrawn from exchanges that day, including exchange to exchange activity.

| Name                                  | MetricID         | Category | Subcategory | Type | Unit | Interval       |
| ------------------------------------- | ---------------- | -------- | ----------- | ---- | ---- | -------------- |
| Exchange Withdrawals, Incl EtoE (USD) | FlowOutExInclUSD | Exchange | Withdrawals | Sum  | USD  | 1 block, 1 day |

## Details

* Computed as FlowOutExInclNtv \* PriceUSD
* If a transaction sends 90 units from exchange B to exchange A, it counts towards this metric.
* If a transaction moves 90 units inside exchange A (cold to hot or equivalent), it doesn’t count towards this metric.

## Release History

* Released in the 4.0 release of NDP

## Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/FlowOutExInclUSD" %}



# Withdrawal Cnt<a href="#flowtfrout" id="flowtfrout"></a>

## Definition

The sum count of transfers from any address belonging to exchange Bitfinex in that interval. If the recipient address also belongs to Bitfinex, the transfer is not counted.

| Name                    | MetricID         | Category | Subcategory | Type | Unit         | Interval       |
| ----------------------- | ---------------- | -------- | ----------- | ---- | ------------ | -------------- |
| Bitfinex Withdrawal Cnt | FlowTfrOutBFXCnt | Exchange | Withdrawals | Sum  | Native units | 1 block, 1 day |
| BitMEX Withdrawal Cnt | FlowTfrOutBMXCnt | Exchange | Withdrawals | Sum  | Native units | 1 block, 1 day |
| Binance Withdrawal Cnt | FlowTfrOutBNBCnt | Exchange | Withdrawals | Sum  | Native units | 1 block, 1 day |
| Bitstamp Withdrawal Cnt | FlowTfrOutBSPCnt | Exchange | Withdrawals | Sum  | Native units | 1 block, 1 day |
| Bittrex Withdrawal Cnt | FlowTfrOutBTXCnt | Exchange | Withdrawals | Sum  | Native units | 1 block, 1 day |
| Gemini Withdrawal Cnt | FlowTfrOutGEMCnt | Exchange | Withdrawals | Sum  | Native units | 1 block, 1 day |
| Huobi Withdrawal Cnt | FlowTfrOutHUOCnt | Exchange | Withdrawals | Sum  | Native units | 1 block, 1 day |
| Kraken Withdrawal Cnt | FlowTfrOutKRKCnt | Exchange | Withdrawals | Sum  | Native units | 1 block, 1 day |
| Poloniex Withdrawal Cnt | FlowTfrOutPOLCnt | Exchange | Withdrawals | Sum  | Native units | 1 block, 1 day |
| Exchange Deposit Cnt | FlowTfrToExCnt | Exchange | Deposits    | Sum  | Transfers | 1 block, 1 day |

## Details

* Coinbase (i.e., miner reward) transactions are not counted.

## Asset-Specific Details

* For account-based protocols, if both sender and recipient belong to Bitfinex, then the transfer is not counted.
* For UTXO-based protocols, this metric applies the following logic:
  * If the input addresses belong to Bitfinex, then only the outputs where the address doesn’t belong to Bitfinex are counted as transfers from Bitfinex.

## Release History

* Version 4.2 of CM Network Data Pro Daily Macro (End of Day)

## Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/FlowTfrOutBFXCnt" %}


# API Endpoints

Withdrawal metrics can be accessed using these endpoints:

* `timeseries/asset-metrics`

and by passing in the metric ID's `FlowOut*` and `FlowTfrOut*` in the `metrics` parameter.

{% swagger src="../../.gitbook/assets/openapi.yaml" path="/timeseries/asset-metrics" method="get" %}
[openapi.yaml](../../.gitbook/assets/openapi.yaml)
{% endswagger %}

{% tabs %}
{% tab title="Shell" %}
```shell
curl --compressed "https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=FlowOutBFXUSD&assets=btc&pretty=true&api_key=<your_key>"
```
{% endtab %}

{% tab title="Python" %}
```python
import requests
response = requests.get('https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=FlowOutBFXUSD&assets=btc&pretty=true&api_key=<your_key>').json()
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
        metrics="FlowOutBFXUSD", 
        assets="btc",
    ).to_dataframe()
)
```
{% endtab %}
{% endtabs %}
