# Transaction Fees

## Contents

* [Block Maximum Fees (block_fee_max)](transaction-fees.md#block\_fee\_max)
* [Block Mean Fees (block_fee_mean)](transaction-fees.md#block\_fee\_mean)
* [Block Median Fees (block_fee_median)](transaction-fees.md#block\_fee\_median)
* [Block Minimum Fees (block_fee_min)](transaction-fees.md#block\_fee\_min)
* [Miner Fees per Block (block\_fees)](transaction-fees.md#block\_fees)

## Block Maximum Fees <a href="#block_fee_max" id="block_fee_max"></a>

**Definition**

Mined block's max transaction fee in native units.

**Dictionary**

<table data-header-hidden><thead><tr><th width="165"></th><th width="210"></th><th width="107"></th><th></th></tr></thead><tbody><tr><td>Name</td><td>MetricID</td><td>Unit</td><td>Interval</td></tr><tr><td>Block Maximum Fees</td><td>block_fee_max</td><td>Native Currency</td><td>1 block</td></tr></tbody></table>

**Methodology**

The most recently-mined block is evaluated and the maximum of fees in that block is computed.

**Available Assets**

Bitcoin (BTC)

**Sample Query**

{% embed url="https://api.coinmetrics.io/v4/timeseries/asset-metrics?api_key=%3Cyour_key%3E&assets=btc&frequency=1b&metrics=block_fee_max&pretty=true" %}

## Block Mean Fees <a href="#block_fee_mean" id="block_fee_mean"></a>

**Definition**

Mined block's mean transaction fee in native units.

**Dictionary**

<table data-header-hidden><thead><tr><th width="165"></th><th width="210"></th><th width="107"></th><th></th></tr></thead><tbody><tr><td>Name</td><td>MetricID</td><td>Unit</td><td>Interval</td></tr><tr><td>Block Mean Fees</td><td>block_fee_mean</td><td>Native Currency</td><td>1 block</td></tr></tbody></table>

**Methodology**

The most recently-mined block is evaluated and the mean of fees in that block is computed.

**Available Assets**

Bitcoin (BTC)

**Sample Query**

{% embed url="https://api.coinmetrics.io/v4/timeseries/asset-metrics?api_key=%3Cyour_key%3E&assets=btc&frequency=1b&metrics=block_fee_mean&pretty=true" %}

## Block Median Fees <a href="#block_fee_median" id="block_fee_median"></a>

**Definition**

Mined block's median transaction fee in native units.

**Dictionary**

<table data-header-hidden><thead><tr><th width="165"></th><th width="210"></th><th width="107"></th><th></th></tr></thead><tbody><tr><td>Name</td><td>MetricID</td><td>Unit</td><td>Interval</td></tr><tr><td>Block Median Fees</td><td>block_fee_median</td><td>Native Currency</td><td>1 block</td></tr></tbody></table>

**Methodology**

The most recently-mined block is evaluated and the median of fees in that block is computed.

**Available Assets**

Bitcoin (BTC)

**Sample Query**

{% embed url="https://api.coinmetrics.io/v4/timeseries/asset-metrics?api_key=%3Cyour_key%3E&assets=btc&frequency=1b&metrics=block_fee_median&pretty=true" %}

## Block Minimum Fees <a href="#block_fee_min" id="block_fee_min"></a>

**Definition**

Mined block's minimum transaction fee in native units.

**Dictionary**

<table data-header-hidden><thead><tr><th width="165"></th><th width="210"></th><th width="107"></th><th></th></tr></thead><tbody><tr><td>Name</td><td>MetricID</td><td>Unit</td><td>Interval</td></tr><tr><td>Block Minimum Fees</td><td>block_fee_min</td><td>Native Currency</td><td>1 block</td></tr></tbody></table>

**Methodology**

The most recently-mined block is evaluated and the minimum of fees in that block is computed.

**Available Assets**

Bitcoin (BTC)

**Sample Query**

{% embed url="https://api.coinmetrics.io/v4/timeseries/asset-metrics?api_key=%3Cyour_key%3E&assets=btc&frequency=1b&metrics=block_fee_min&pretty=true" %}

## Miner Fees per Block <a href="#block_fees" id="block_fees"></a>

**Definition**

The sum of fees paid to miners for the transactions included in each mined block.

**Dictionary**

| Name                 | MetricID    | Unit       | Interval |
| -------------------- | ----------- | ---------- | -------- |
| Miner Fees per block | block\_fees | Difficulty | 1 block  |

**Methodology**

The most recently-mined block is evaluated and the sum of fees in that block is computed.

**Available Assets**

Bitcoin (BTC), _Ethereum (ETH)\*_

_\* Historical data covering the pre-merge timeframe only (up to 9/15/2022). With the merge ETH switched from Proof of Work and miners to Proof of Stake and validators meaning the miner fees per block are non-existent post the merge date for Ethereum._

**Sample Query**

{% embed url="https://api.coinmetrics.io/v4/timeseries/asset-metrics?api_key=%3Cyour_key%3E&assets=btc&frequency=1b&limit_per_asset=1&metrics=block_fees&pretty=true" %}

## API Endpoints

metrics can be accessed using these endpoints:

* `timeseries/asset-metrics`

and by passing in the metric ID's `block_fee*` in the `metrics` parameter.

{% swagger src="../../../.gitbook/assets/openapi.yaml" path="/timeseries/asset-metrics" method="get" %}
[openapi.yaml](../../../.gitbook/assets/openapi.yaml)
{% endswagger %}

{% tabs %}
{% tab title="Shell" %}
```shell
curl --compressed "https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=block_fees&assets=btc&pretty=true&api_key=<your_key>"
```
{% endtab %}

{% tab title="Python" %}
```python
import requests
response = requests.get('https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=block_fees&assets=btc&pretty=true&api_key=<your_key>').json()
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
        metrics="block_fees", 
        assets="btc",
    ).to_dataframe()
)
```
{% endtab %}
{% endtabs %}
