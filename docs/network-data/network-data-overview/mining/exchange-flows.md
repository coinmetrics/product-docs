# Exchange Flows

## Contents

* [Flows Received by Miners from Exchanges](exchange-flows.md#flowminerin0hopall)
* [Flows Received One Hop from Miners from Exchanges](exchange-flows.md#flowminerin1hopall)
* [Flows Sent by Miners to Exchanges](exchange-flows.md#flowminerout0hopall)
* [Flows Sent One Hop from Miners to Exchanges](exchange-flows.md#flowminerout1hopall)

## Flows Received by Miners from Exchanges <a href="#flowminerin0hopall" id="flowminerin0hopall"></a>

### Definition

The sum value of all non-fee transfers received by all mining entities from exchanges that interval.

| Name                                                   | MetricID                | Unit         | Interval |
| ------------------------------------------------------ | ----------------------- | ------------ | -------- |
| Flows Received by Miners from Exchanges (USD)          | FlowMinerIn0HopAllExUSD | USD          | 1 day    |
| Flows Received by Miners from Exchanges (native units) | FlowMinerIn0HopAllExNtv | Native units | 1 day    |

### Details

* This metric is part of the next iteration of our Miner Flows and it is the culmination of months of research on miner behavior and entity clustering.
* Miner-to-Exchange Flows can be used to better understand the impact that miners have on crypto markets.
* The ultimate goal of this family of metrics is to improve the understanding of when and where miners sell their coins.
* We have published research in this area in (State of The Network Issue 91)\[https://coinmetrics.io/following-flows-ii-where-do-miners-sell/]

### Release History

* Released in the version 4.9 of Network Data Pro

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/FlowMinerIn0HopAllExUSD" %}

## Flows Received One Hop from Miners from Exchanges <a href="#flowminerin1hopall" id="flowminerin1hopall"></a>

### Definition

The sum of all non-fee transfers received by all addresses within one hop of a mining entity from an exchange in that interval.

| Name                                                             | MetricID                 | Unit         | Interval |
| ---------------------------------------------------------------- | ------------------------ | ------------ | -------- |
| Flows Received One Hop from Miners from Bitfinex (native units)  | FlowMinerIn1HopAllBFXNtv | Native units | 1 day    |
| Flows Received One Hop from Miners from Bitfinex (USD)           | FlowMinerIn1HopAllBFXUSD | USD          | 1 day    |
| Flows Received One Hop from Miners from BitMEX (native units)    | FlowMinerIn1HopAllBMXNtv | Native units | 1 day    |
| Flows Received One Hop from Miners from BitMEX (USD)             | FlowMinerIn1HopAllBMXUSD | USD          | 1 day    |
| Flows Received One Hop from Miners from Binance (native units)   | FlowMinerIn1HopAllBNBNtv | Native units | 1 day    |
| Flows Received One Hop from Miners from Binance (USD)            | FlowMinerIn1HopAllBNBUSD | USD          | 1 day    |
| Flows Received One Hop from Miners from Bitstamp (native units)  | FlowMinerIn1HopAllBSPNtv | Native units | 1 day    |
| Flows Received One Hop from Miners from Bitstamp (USD)           | FlowMinerIn1HopAllBSPUSD | USD          | 1 day    |
| Flows Received One Hop from Miners from Bittrex (native units)   | FlowMinerIn1HopAllBTXNtv | Native units | 1 day    |
| Flows Received One Hop from Miners from Bittrex (USD)            | FlowMinerIn1HopAllBTXUSD | USD          | 1 day    |
| Flows Received One Hop from Miners from Gemini (native units)    | FlowMinerIn1HopAllGEMNtv | Native units | 1 day    |
| Flows Received One Hop from Miners from Gemini (USD)             | FlowMinerIn1HopAllGEMUSD | USD          | 1 day    |
| Flows Received One Hop from Miners from Huobi (native units)     | FlowMinerIn1HopAllHUONtv | Native units | 1 day    |
| Flows Received One Hop from Miners from Huobi (USD)              | FlowMinerIn1HopAllHUOUSD | USD          | 1 day    |
| Flows Received One Hop from Miners from Kraken (native units)    | FlowMinerIn1HopAllKRKNtv | Native units | 1 day    |
| Flows Received One Hop from Miners from Kraken (USD)             | FlowMinerIn1HopAllKRKUSD | USD          | 1 day    |
| Flows Received One Hop from Miners from Exchanges (native units) | FlowMinerIn1HopAllExNtv  | Native units | 1 day    |
| Flows Received One Hop from Miners from Exchanges (USD)          | FlowMinerIn1HopAllExUSD  | USD          | 1 day    |

### Details

* This metric is part of the next iteration of our Miner Flows and it is the culmination of months of research on miner behavior and entity clustering.
* Miner-to-Exchange Flows can be used to better understand the impact that miners have on crypto markets.
* The ultimate goal of this family of metrics is to improve the understanding of when and where miners sell their coins.
* We have published research in this area in (State of The Network Issue 91)\[https://coinmetrics.io/following-flows-ii-where-do-miners-sell/]

### Release History

* Released in the version 4.9 of Network Data Pro

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/FlowMinerIn1HopAllBFXNtv" %}

## Flows Sent by Miners to Exchanges <a href="#flowminerout0hopall" id="flowminerout0hopall"></a>

### Definition

The sum of all transfers sent by all mining entities to exchanges that interval.

| Name                                             | MetricID                 | Unit         | Interval |
| ------------------------------------------------ | ------------------------ | ------------ | -------- |
| Flows Sent by Miners to Exchanges (native units) | FlowMinerOut0HopAllExNtv | Native units | 1 day    |
| Flows Sent by Miners to Exchanges (USD)          | FlowMinerOut0HopAllExUSD | USD          | 1 day    |

### Details

* This metric is part of the next iteration of our Miner Flows and it is the culmination of months of research on miner behavior and entity clustering.
* Miner-to-Exchange Flows can be used to better understand the impact that miners have on crypto markets.
* The ultimate goal of this family of metrics is to improve the understanding of when and where miners sell their coins.
* We have published research in this area in (State of The Network Issue 91)\[https://coinmetrics.io/following-flows-ii-where-do-miners-sell/]

### Release History

* Released in the version 4.9 of Network Data Pro

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/FlowMinerOut0HopAllExNtv" %}

## Flows Sent One Hop from Miners to Exchanges <a href="#flowminerout1hopall" id="flowminerout1hopall"></a>

### Definition

The sum of all transfers sent by all addresses within one hop of a mining entity to Bitfinex that interval.

| Name                                                      | MetricID                  | Unit         | Interval |
| --------------------------------------------------------- | ------------------------- | ------------ | -------- |
| Flows Sent One Hop from Miners to Bitfinex (native units) | FlowMinerOut1HopAllBFXNtv | Native units | 1 day    |
| Flows Sent One Hop from Miners to Bitfinex (USD)          | FlowMinerOut1HopAllBFXUSD | USD          | 1 day    |
| Flows Sent One Hop from Miners to BitMEX (native units)   | FlowMinerOut1HopAllBMXNtv | Native units | 1 day    |
| Flows Sent One Hop from Miners to BitMEX (USD)            | FlowMinerOut1HopAllBMXUSD | USD          | 1 day    |
| Flows Sent One Hop from Miners to Binance (native units)  | FlowMinerOut1HopAllBNBNtv | Native units | 1 day    |
| Flows Sent One Hop from Miners to Binance (USD)           | FlowMinerOut1HopAllBNBUSD | USD          | 1 day    |
| Flows Sent One Hop from Miners to Bitstamp (native units) | FlowMinerOut1HopAllBSPNtv | Native units | 1 day    |
| Flows Sent One Hop from Miners to Bitstamp (USD)          | FlowMinerOut1HopAllBSPUSD | USD          | 1 day    |
| Flows Sent One Hop from Miners to Bittrex (native units)  | FlowMinerOut1HopAllBTXNtv | Native units | 1 day    |
| Flows Sent One Hop from Miners (USD)                      | FlowMinerOut1HopAllUSD    | USD          | 1 day    |
| Flows Sent One Hop from Miners to Bittrex (USD)           | FlowMinerOut1HopAllBTXUSD | USD          | 1 day    |
| Flow Sent One Hop from Miners to Exchanges (native units) | FlowMinerOut1HopAllExNtv  | Native units | 1 day    |
| Flow Sent One Hop from Miners to Exchanges (USD)          | FlowMinerOut1HopAllExUSD  | USD          | 1 day    |
| Flows Sent One Hop from Miners to Gemini (native units)   | FlowMinerOut1HopAllGEMNtv | Native units | 1 day    |
| Flows Sent One Hop from Miners to Gemini (USD)            | FlowMinerOut1HopAllGEMUSD | USD          | 1 day    |
| Flows Sent One Hop from Miners to Huobi (native units)    | FlowMinerOut1HopAllHUONtv | Native units | 1 day    |
| Flows Sent One Hop from Miners to Huobi (USD)             | FlowMinerOut1HopAllHUOUSD | USD          | 1 day    |
| Flows Sent One Hop from Miners to Kraken (native units)   | FlowMinerOut1HopAllKRKNtv | Native units | 1 day    |
| Flows Sent One Hop from Miners to Kraken (USD)            | FlowMinerOut1HopAllKRKUSD | USD          | 1 day    |
| Flows Sent One Hop from Miners to Poloniex (native units) | FlowMinerOut1HopAllPOLNtv | Native units | 1 day    |
| Flows Sent One Hop from Miners to Poloniex (USD)          | FlowMinerOut1HopAllPOLUSD | USD          | 1 day    |

### Details

* This metric is part of the next iteration of our Miner Flows and it is the culmination of months of research on miner behavior and entity clustering.
* Miner-to-Exchange Flows can be used to better understand the impact that miners have on crypto markets.
* The ultimate goal of this family of metrics is to improve the understanding of when and where miners sell their coins.
* We have published research in this area in (State of The Network Issue 91)\[https://coinmetrics.io/following-flows-ii-where-do-miners-sell/]

### Release History

* Released in the version 4.9 of Network Data Pro

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/FlowMinerOut1HopAllBFXNtv" %}

## API Endpoints

ExchangeFlows metrics can be accessed using these endpoints:

* `timeseries/asset-metrics`

and by passing in the metric ID's `FlowMinerIn0HopAll{Exchange}*` in the `metrics` parameter.

{% swagger src="../../../.gitbook/assets/openapi.yaml" path="/timeseries/asset-metrics" method="get" %}
[openapi.yaml](../../../.gitbook/assets/openapi.yaml)
{% endswagger %}

{% tabs %}
{% tab title="Shell" %}
```shell
curl --compressed "https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=FlowMinerIn1HopAllExUSD&assets=btc&pretty=true&api_key=<your_key>"
```
{% endtab %}

{% tab title="Python" %}
```python
import requests
response = requests.get('https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=FlowMinerIn1HopAllExUSD&assets=btc&pretty=true&api_key=<your_key>').json()
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
        metrics="FlowMinerIn1HopAllExUSD", 
        assets="btc",
    ).to_dataframe()
)
```
{% endtab %}
{% endtabs %}