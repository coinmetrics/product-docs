# Withdrawals

## Contents

* [Exchange Withdrawals (FlowOutXNtv, FlowOutXUSD)](withdrawals.md#flowout)
* [Exchange Withdrawals (Total) (FlowOutExNtv, FlowOutExUSD)](withdrawals.md#flowoutex)
* [Exchange Withdrawals, Incl EtoE (FlowOutExInclUSD)](withdrawals.md#flowoutexincl)
* [Withdrawal Count (FlowTfrOutXCnt)](withdrawals.md#flowtfrout)

## Exchange Withdrawals <a href="#flowout" id="flowout"></a>

### Definition

The sum withdrawn from an exchange that day.

<table><thead><tr><th>Name</th><th width="181">MetricID</th><th>Unit</th><th>Interval</th></tr></thead><tbody><tr><td>Bitfinex Withdrawals (native units)</td><td>FlowOutBFXNtv</td><td>Native units</td><td>1 block, 1 day</td></tr><tr><td>Bitfinex Withdrawals (USD)</td><td>FlowOutBFXUSD</td><td>USD</td><td>1 block, 1 day</td></tr><tr><td>BitMEX Withdrawals (native units)</td><td>FlowOutBMXNtv</td><td>Native units</td><td>1 block, 1 day</td></tr><tr><td>BitMEX Withdrawals (USD)</td><td>FlowOutBMXUSD</td><td>USD</td><td>1 block, 1 day</td></tr><tr><td>Binance Withdrawals (native units)</td><td>FlowOutBNBNtv</td><td>Native units</td><td>1 block, 1 day</td></tr><tr><td>Binance Withdrawals (USD)</td><td>FlowOutBNBUSD</td><td>USD</td><td>1 block, 1 day</td></tr><tr><td>Bitstamp Withdrawals (native units)</td><td>FlowOutBSPNtv</td><td>Native units</td><td>1 block, 1 day</td></tr><tr><td>Bitstamp Withdrawals (USD)</td><td>FlowOutBSPUSD</td><td>USD</td><td>1 block, 1 day</td></tr><tr><td>Bittrex Withdrawals (native units)</td><td>FlowOutBTXNtv</td><td>Native units</td><td>1 block, 1 day</td></tr><tr><td>Bittrex Withdrawals (USD)</td><td>FlowOutBTXUSD</td><td>USD</td><td>1 block, 1 day</td></tr><tr><td>Gemini Withdrawals (native units)</td><td>FlowOutGEMNtv</td><td>Native units</td><td>1 block, 1 day</td></tr><tr><td>Gemini Withdrawals (USD)</td><td>FlowOutGEMUSD</td><td>USD</td><td>1 block, 1 day</td></tr><tr><td>Huobi Withdrawals (native units)</td><td>FlowOutHUONtv</td><td>Native units</td><td>1 block, 1 day</td></tr><tr><td>Huobi Withdrawal (USD)</td><td>FlowOutHUOUSD</td><td>USD</td><td>1 block, 1 day</td></tr><tr><td>Kraken Withdrawals (native units)</td><td>FlowOutKRKNtv</td><td>Native units</td><td>1 block, 1 day</td></tr><tr><td>Kraken Withdrawals (USD)</td><td>FlowOutKRKUSD</td><td>USD</td><td>1 block, 1 day</td></tr><tr><td>Poloniex Withdrawals (native units)</td><td>FlowOutPOLNtv</td><td>Native units</td><td>1 block, 1 day</td></tr><tr><td>Poloniex Withdrawals (USD)</td><td>FlowOutPOLUSD</td><td>USD</td><td>1 block, 1 day</td></tr></tbody></table>

### Details

* Native units are considered as withdrawn if they leave the control of an address we identify as being owned by an exchange.

### Asset-Specific Details

* This metric might not be available for all assets. Either that exchange doesn’t support this asset (BitMEX only trades in BTC for example), or we deemed that our coverage of the exchange was not complete enough to release the metric for it.
* For Bitcoin, this metric excludes the effect of change outputs:
*
  * If a transaction spends 100 BTC from exchange A but 90 BTC are sent back to it as change, the flow is -10 BTC, not -100 BTC and +90 BTC.

### Release History

* Released in the 4.0 release of NDP

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/FlowOutBFXNtv" %}

## Exchange Withdrawals (Total) <a href="#flowoutex" id="flowoutex"></a>

### Definition

The sum withdrawn from exchanges that day, excluding exchange to exchange activity.

| Name                                | MetricID     | Unit         | Interval       |
| ----------------------------------- | ------------ | ------------ | -------------- |
| Exchange Withdrawals (native units) | FlowOutExNtv | Native units | 1 block, 1 day |
| Exchange Withdrawals (USD)          | FlowOutExUSD | USD          | 1 block, 1 day |

### Details

* This metric captures interactions between users of a cryptoasset and exchanges supporting that market. It excludes inter-exchange activity.
* If a transaction sends 90 units from exchange B to exchange A, it doesn’t count towards this metric.
* If a transaction spends 10 units from exchange A and sends 5 units to exchange B and 5 units to unknown destination, it counts as a 5 units outflow for exchanges overall, 10 units outflow for exchange A, 5 units inflow for exchange B

### Release History

* Released in the 4.0 release of NDP

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/FlowOutExNtv" %}

## Exchange Withdrawals, Incl EtoE (USD) <a href="#flowoutexincl" id="flowoutexincl"></a>

### Definition

The sum USD value withdrawn from exchanges that day, including exchange to exchange activity.

<table><thead><tr><th>Name</th><th width="180">MetricID</th><th width="116">Unit</th><th>Interval</th></tr></thead><tbody><tr><td>Exchange Withdrawals, Incl EtoE (USD)</td><td>FlowOutExInclUSD</td><td>USD</td><td>1 block, 1 day</td></tr></tbody></table>

### Details

* Computed as FlowOutExInclNtv \* PriceUSD
* If a transaction sends 90 units from exchange B to exchange A, it counts towards this metric.
* If a transaction moves 90 units inside exchange A (cold to hot or equivalent), it doesn’t count towards this metric.

### Release History

* Released in the 4.0 release of NDP

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/FlowOutExInclUSD" %}

## Withdrawal Cnt <a href="#flowtfrout" id="flowtfrout"></a>

### Definition

The sum count of transfers from any address belonging to exchange Bitfinex in that interval. If the recipient address also belongs to Bitfinex, the transfer is not counted.

<table><thead><tr><th>Name</th><th width="186">MetricID</th><th>Unit</th><th>Interval</th></tr></thead><tbody><tr><td>Bitfinex Withdrawal Cnt</td><td>FlowTfrOutBFXCnt</td><td>Native units</td><td>1 block, 1 day</td></tr><tr><td>BitMEX Withdrawal Cnt</td><td>FlowTfrOutBMXCnt</td><td>Native units</td><td>1 block, 1 day</td></tr><tr><td>Binance Withdrawal Cnt</td><td>FlowTfrOutBNBCnt</td><td>Native units</td><td>1 block, 1 day</td></tr><tr><td>Bitstamp Withdrawal Cnt</td><td>FlowTfrOutBSPCnt</td><td>Native units</td><td>1 block, 1 day</td></tr><tr><td>Bittrex Withdrawal Cnt</td><td>FlowTfrOutBTXCnt</td><td>Native units</td><td>1 block, 1 day</td></tr><tr><td>Gemini Withdrawal Cnt</td><td>FlowTfrOutGEMCnt</td><td>Native units</td><td>1 block, 1 day</td></tr><tr><td>Huobi Withdrawal Cnt</td><td>FlowTfrOutHUOCnt</td><td>Native units</td><td>1 block, 1 day</td></tr><tr><td>Kraken Withdrawal Cnt</td><td>FlowTfrOutKRKCnt</td><td>Native units</td><td>1 block, 1 day</td></tr><tr><td>Poloniex Withdrawal Cnt</td><td>FlowTfrOutPOLCnt</td><td>Native units</td><td>1 block, 1 day</td></tr><tr><td>Exchange Deposit Cnt</td><td>FlowTfrToExCnt</td><td>Transfers</td><td>1 block, 1 day</td></tr></tbody></table>

### Details

* Coinbase (i.e., miner reward) transactions are not counted.

### Asset-Specific Details

* For account-based protocols, if both sender and recipient belong to Bitfinex, then the transfer is not counted.
* For UTXO-based protocols, this metric applies the following logic:
  * If the input addresses belong to Bitfinex, then only the outputs where the address doesn’t belong to Bitfinex are counted as transfers from Bitfinex.

### Release History

* Version 4.2 of CM Network Data Pro Daily Macro (End of Day)

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/FlowTfrOutBFXCnt" %}

## API Endpoints

Withdrawal metrics can be accessed using these endpoints:

* `timeseries/asset-metrics`

and by passing in the metric ID's `FlowOut*` and `FlowTfrOut*` in the `metrics` parameter.

{% swagger src="../../../.gitbook/assets/openapi.yaml" path="/timeseries/asset-metrics" method="get" %}
[openapi.yaml](../../../.gitbook/assets/openapi.yaml)
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
