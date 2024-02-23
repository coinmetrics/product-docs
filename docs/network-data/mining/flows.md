# Contents

* [Flows Received by Miners](flows.md#flowminerin0hopall)
* [Flows Received One Hop from Miners](flows.md#flowminerin1hopall)
* [Miner Net Flows](flows.md#flowminernet0hopall)
* [Net Flows One Hop from Miners](flows.md#flowminernet1hopall)
* [Flows Sent by Miners](flows.md#flowminerout0hopall)
* [Flows Sent One Hop from Miners](flows.md#flowminerout1hopall)
* [Miner Rolling Inventory, 30 day (%)](flows.md#mri0hopall30d)
* [Miner One Hop Rolling Inventory, 30 day (%)](flows.md#mri1hopall30d)


# Flows Received by Miners<a href="#flowminerin0hopall" id="flowminerin0hopall"></a>

## Definition

The sum of block rewards, fees, and other transfers received by all mining entities during an interval, excluding transfers from another mining entity. A mining entity is defined as an address that has been credited from a transaction debiting the 'FEES' or 'ISSUANCE' accounts in accordance with Coin Metric’s Universal Blockchain Data Model (UBDM).

| Name                                    | MetricID              | Category | Subcategory | Type | Unit         | Interval |
| --------------------------------------- | --------------------- | -------- | ----------- | ---- | ------------ | -------- |
| Flows Received by Miners (native units) | FlowMinerIn0HopAllNtv | Miners   | Flows In    | Sum  | Native units | 1 day    |
| Flows Received by Miners (USD) | FlowMinerIn0HopAllUSD | Miners   | Flows In    | Sum  | USD  | 1 day    |

## Details

* This metric is not computed as the sum of block rewards and fees collected by all mining entities during an interval.
* For more details on how this metric is computed, please refer to our blog post introducing [Miner Flows](https://coinmetrics.substack.com/p/coin-metrics-state-of-the-network-3e2)

## Asset-Specific Details

* This metric will initially only be available for Bitcoin.

## Release History

* Release Version: 4.8 (Nov, 2020)

## Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/FlowMinerIn0HopAllNtv" %}




# Flows Received One Hop from Miners<a href="#flowminerin1hopall" id="flowminerin1hopall"></a>

## Defintion

The sum of block rewards, fees, and other transfers received by all addresses within one hop of a mining entity during an interval, excluding transfers from another address within one hop of a mining entity. An address within one hop of a mining entity is defined as an address that has been credited from a transaction debiting the 'FEES' or 'ISSUANCE' accounts in accordance with Coin Metric’s Universal Blockchain Data Model (UBDM).

| Name                                              | MetricID              | Category | Subcategory | Type | Unit         | Interval |
| ------------------------------------------------- | --------------------- | -------- | ----------- | ---- | ------------ | -------- |
| Flows Received One Hop from Miners (native units) | FlowMinerIn1HopAllNtv | Miners   | Flows In    | Sum  | Native units | 1 day    |
| Flows Received One Hop from Miners (USD) | FlowMinerIn1HopAllUSD | Miners   | Flows In    | Sum  | USD  | 1 day    |
## Details

* This metric is not computed as the sum of block rewards and fees collected by addresses within one hop of a mining entity during an interval.
* For more details on how this metric is computed, please refer to our blog post introducing [Miner Flows](https://coinmetrics.substack.com/p/coin-metrics-state-of-the-network-3e2)

## Asset-Specific Details

* This metric will initially only be available for Bitcoin.

## Release History

* Release Version: NDP-EOD 4.8 (Nov, 2020)

## Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/FlowMinerIn1HopAllNtv" %}


# Miner Net Flows<a href="#flowminernet0hopall" id="flowminernet0hopall"></a>

## Definition

The net value sent or received by a mining entity in native units . A mining entity is defined as an address that has been credited from a transaction debiting the 'FEES' or 'ISSUANCE' accounts in accordance with Coin Metric’s Universal Blockchain Data Model (UBDM).

| Name                           | MetricID               | Category | Subcategory | Type | Unit         | Interval |
| ------------------------------ | ---------------------- | -------- | ----------- | ---- | ------------ | -------- |
| Miner Net Flows (native units) | FlowMinerNet0HopAllNtv | Mining   | Net Flows   | Sum  | Native units | 1 day    |
| Miner Net Flows (native units) | FlowMinerNet0HopAllUSD | Mining   | Net Flows   | Sum  | USD | 1 day    |

## Details

* For more details on how this metric is computed, please refer to our blog post introducing [Miner Flows](https://coinmetrics.substack.com/p/coin-metrics-state-of-the-network-3e2)

## Asset-Specific Details

* This metric will initially only be available for Bitcoin.

## Release History

* Release Version: NDP-EOD 4.8 (Nov, 2020)

## Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/FlowMinerNet0HopAllNtv" %}


# Net Flows One Hop from Miners<a href="#flowminernet1hopall" id="flowminernet1hopall"></a>

## Definition

The difference between the sum of block rewards, fees, and other transfers received by all addresses within one hop of a mining entity during an interval, excluding transfers to another address within one hop of a mining entity, and those sent. An address within one hop of a mining entity is defined as an address that has been credited from a transaction debiting the 'FEES' or 'ISSUANCE' accounts in accordance with Coin Metric’s Universal Blockchain Data Model (UBDM), or any address that has been credited in a transaction sent by such an address.

| Name                                         | MetricID               | Category | Subcategory | Type | Unit         | Interval |
| -------------------------------------------- | ---------------------- | -------- | ----------- | ---- | ------------ | -------- |
| Net Flows One Hop from Miners (native units) | FlowMinerNet1HopAllNtv | Mining   | Flows Net   | Sum  | Native units | 1 day    |
| Net Flows One Hop from Miners (USD) | FlowMinerNet1HopAllUSD | Mining   | Flows Net   | Sum  | USD  | 1 day    |

## Details

* For more details on how this metric is computed, please refer to our blog post introducing [Miner Flows](https://coinmetrics.substack.com/p/coin-metrics-state-of-the-network-3e2)

## Asset-Specific Details

* This metric will initially only be available for Bitcoin.

## Release History

* Release Version: NDP-EOD 4.8 (Nov, 2020)

## Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/FlowMinerNet1HopAllNtv" %}


# Flows Sent by Miners<a href="#flowminerout0hopall" id="flowminerout0hopall"></a>

## Definition

The sum of block rewards, fees, and other transfers received by all mining entities during an interval, excluding transfers from another mining entity. A mining entity is defined as an address that has been credited from a transaction debiting the 'FEES' or 'ISSUANCE' accounts in accordance with Coin Metric’s Universal Blockchain Data Model (UBDM).

| Name                                | MetricID               | Category | Subcategory | Type | Unit         | Interval |
| ----------------------------------- | ---------------------- | -------- | ----------- | ---- | ------------ | -------- |
| Flows Sent by Miners (native units) | FlowMinerOut0HopAllNtv | Mining   | Flows Out   | Sum  | Native units | 1 day    |
| Flows Sent by Miners (USD) | FlowMinerOut0HopAllUSD | Mining   | Flows Out   | Sum  | USD  | 1 day    |

## Details

* For more details on how this metric is computed, please refer to our blog post introducing [Miner Flows](https://coinmetrics.substack.com/p/coin-metrics-state-of-the-network-3e2)

## Asset-Specific Details

* This metric will initially only be available for Bitcoin.

## Release History

* Release Version: NDP-EOD 4.8 (Nov, 2020)

## Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/FlowMinerOut0HopAllNtv" %}

# Flows Sent One Hop from Miners<a href="#flowminerout1hopall" id="flowminerout1hopall"></a> 

## Definition

The sum of block rewards, fees, and other transfers sent by all addresses within one hop of a mining entity during an interval, excluding transfers to another address within one hop of a mining entity. An address within one hop of a mining entity is defined as an address that has been credited from a transaction debiting the 'FEES' or 'ISSUANCE' accounts in accordance with Coin Metric’s Universal Blockchain Data Model (UBDM), or any address that has been credited in a transaction sent by such an address.

| Name                                          | MetricID               | Category | Subcategory | Type | Unit         | Interval |
| --------------------------------------------- | ---------------------- | -------- | ----------- | ---- | ------------ | -------- |
| Flows Sent One Hop from Miners (native units) | FlowMinerOut1HopAllNtv | Mining   | Flows Out   | Sum  | Native units | 1 day    |
| Flows Sent One Hop from Miners (USD) | FlowMinerOut1HopAllUSD | Mining   | Flows Out   | Sum  | USD  | 1 day    |

## Details

* For more details on how this metric is computed, please refer to our blog post introducing [Miner Flows](https://coinmetrics.substack.com/p/coin-metrics-state-of-the-network-3e2)

## Asset-Specific Details

* This metric will initially only be available for Bitcoin.

## Release History

* Release Version: NDP-EOD 4.8 (Nov, 2020)

## Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/FlowMinerOut1HopAllNtv" %}


# Miner Rolling Inventory, 30 day (%)<a href="#mri0hopall30d" id="mri0hopall30d"></a>

## Definition

The outflow from all mining entities divided by miner revenue, over a rolling window of 30 days.

| Name                                | MetricID      | Category | Subcategory | Type  | Unit       | Interval |
| ----------------------------------- | ------------- | -------- | ----------- | ----- | ---------- | -------- |
| Miner Rolling Inventory, 30 day (%) | MRI0HopAll30d | Mining   | Flows       | Ratio | Percentage | 30 days  |

## Details

* This metric is computed as FlowMinerOut0HopAllNtv / RevNtv over a rolling window of 30 days

## Asset-specific Details

* This metric will initially only be available for Bitcoin.

## Release History

* Release Version: NDP-EOD 4.8 (Nov, 2020)

## Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/MRI0HopAll30d" %}

# Miner One Hop Rolling Inventory, 30 day (%)<a href="#mri1hopall30d" id="mri1hopall30d"></a>

## Definition

The outflow from all addresses within one hop of a mining entity divided by miner revenue, over a rolling window of 30 days.

## Dictionary

| Name                                        | MetricID      | Category | Subcategory | Type  | Unit       | Interval |
| ------------------------------------------- | ------------- | -------- | ----------- | ----- | ---------- | -------- |
| Miner One Hop Rolling Inventory, 30 day (%) | MRI1HopAll30d | Mining   | Flows       | Ratio | Percentage | 30 days  |

## Details

* This metric is computed as FlowMinerOut1HopAllNtv / RevNtv over a rolling window of 30 days

## Asset-Specific Details

* This metric will initially only be available for Bitcoin.

## Release History

* Release Version: NDP-EOD 4.8 (Nov, 2020)

## Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/MRI1HopAll30d" %}

# API Endpoints

Flows metrics can be accessed using these endpoints:

* `timeseries/asset-metrics`

and by passing in the metric ID's `FlowMinerIn0HopAll*`, `FlowMinerIn1HopAll*` `FlowMinerNet0HopAll*``FlowMinerNet0HopAll*``FlowMinerOut0HopAll*``FlowMinerOut0HopAll*`in the `metrics` parameter.

{% swagger src="../../.gitbook/assets/openapi.yaml" path="/timeseries/asset-metrics" method="get" %}
[openapi.yaml](../../.gitbook/assets/openapi.yaml)
{% endswagger %}

{% tabs %}
{% tab title="Shell" %}
```shell
curl --compressed "https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=FlowMinerIn0HopAllNtv&assets=btc&pretty=true&api_key=<your_key>"
```
{% endtab %}

{% tab title="Python" %}
```python
import requests
response = requests.get('https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=FlowMinerIn0HopAllNtv&assets=btc&pretty=true&api_key=<your_key>').json()
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
        metrics="FlowMinerIn0HopAllNtv", 
        assets="btc",
    ).to_dataframe()
)
```
{% endtab %}
{% endtabs %}
