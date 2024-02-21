# Contents

* [Flows to Lido Contract](validator-supply.md#flowtolidocont)
* [Supply in CL Contract](validator-supply.md#splyclcont)
* [Supply in Lido Contract](validator-supply.md#splylidocont)

# Flows to Lido Contract<a href="#flowtolidocont" id="flowtolidocont"></a>

## Definition

Daily sent to the Lido staking contract.

| Name                   | MetricID       | Category | Subcategory      | Type | Unit         | Interval |
| ---------------------- | -------------- | -------- | ---------------- | ---- | ------------ | -------- |
| Flows to Lido Contract | FlowToLidoCont | Staking  | Validator Supply | Sum  | Native Units | 1 day    |

## Details

* Daily amount of ETH sent to the Lido staking contract (0xae7ab96520de3a18e5e111b5eaab095312d7fe84), sourced from Coin Metrics ATLAS™ blockchain search engine.

## Release History

* Released September 2022.

## Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/FlowToLidoCont" %}

# Supply in CL Contract<a href="#splyclcont" id="splyclcont"></a>

## Definition

Total supply sent to the Consensus Layer (CL) Contract.

| Name                  | MetricID   | Category | Subcategory      | Type | Unit         | Interval |
| --------------------- | ---------- | -------- | ---------------- | ---- | ------------ | -------- |
| Supply in CL Contract | SplyCLCont | Staking  | Validator Supply | Sum  | Native Units | 1 day    |

## Details

* The total supply of ETH sent to the Consensus Layer (CL) smart contract (0x00000000219ab540356cBB839Cbe05303d7705Fa), sourced from Coin Metrics ATLAS™ blockchain search engine.

## Release History

* Released September 2022.

## Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/SplyCLCont" %}

# Supply in Lido Contract<a href="#splylidocont" id="splylidocont"></a>

## Definition

Total sent to the Lido staking contract.

| Name                    | MetricID     | Category | Subcategory      | Type | Unit         | Interval |
| ----------------------- | ------------ | -------- | ---------------- | ---- | ------------ | -------- |
| Supply in Lido Contract | SplyLidoCont | Staking  | Validator Supply | Sum  | Native Units | 1 day    |

## Details

* Total ETH sent to the Lido staking contract (0xae7ab96520de3a18e5e111b5eaab095312d7fe84) over the daily interval, sourced from Coin Metrics ATLAS™ blockchain search engine.

## Release History

* Released September 2022.

## Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/SplyLidoCont" %}

# API Endpoints

Validator Supply metrics can be accessed using these endpoints:

* `timeseries/asset-metrics`

and by passing in the metric ID's `SplyLido*` and `FlowToLidoCont` in the `metrics` parameter.

{% swagger src="../../.gitbook/assets/openapi.yaml" path="/timeseries/asset-metrics" method="get" %}
[openapi.yaml](../../.gitbook/assets/openapi.yaml)
{% endswagger %}

{% tabs %}
{% tab title="Shell" %}
```shell
curl --compressed "https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=FlowToLidoCont&assets=eth&pretty=true&api_key=<your_key>"
```
{% endtab %}

{% tab title="Python" %}
```python
import requests
response = requests.get('https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=FlowToLidoCont&assets=eth&pretty=true&api_key=<your_key>').json()
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
        metrics="FlowToLidoCont", 
        assets="eth",
    ).to_dataframe()
)
```
{% endtab %}
{% endtabs %}
