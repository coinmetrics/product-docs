# Transaction Feerates

## Contents

* [Block Maximum Feerate (block_feerate_max)](transaction-feerates.md#block\_feerate\_max)
* [Block Mean Feerate (block_feerate_mean)](transaction-feerates.md#block\_feerate\_mean)
* [Block Median Feerate (block_feerate_median)](transaction-feerates.md#block\_feerate\_median)
* [Block Minimum Feerate (block_feerate_min)](transaction-feerates.md#block\_feerate\_min)

## Block Maximum Feerate <a href="#block_feerate_max" id="block_feerate_max"></a>

**Definition**

A block's maximum transaction feerate. For Bitcoin this is measured in sats/vbyte. For Ethereum this measures the gas price in Gwei

**Dictionary**

<table data-header-hidden><thead><tr><th width="180"></th><th width="210"></th><th width="107"></th><th></th></tr></thead><tbody><tr><td>Name</td><td>MetricID</td><td>Unit</td><td>Interval</td></tr><tr><td>Block Maximum Feerate</td><td>block_feerate_max</td><td>Native feerate</td><td>1 block</td></tr></tbody></table>

**Methodology**

The most recent block is evaluated and the maximum feerate in that block is computed.

**Available Assets**

Bitcoin (BTC), Ethereum (ETH)

**Sample Query**

{% embed url="https://api.coinmetrics.io/v4/timeseries/asset-metrics?api_key=%3Cyour_key%3E&assets=btc,eth&frequency=1b&metrics=block_feerate_max&pretty=true" %}

## Block Mean Feerate <a href="#block_feerate_mean" id="block_feerate_mean"></a>

**Definition**

A block's mean transaction feerate. For Bitcoin this is measured in sats/vbyte. For Ethereum this measures the gas price in Gwei

**Dictionary**

<table data-header-hidden><thead><tr><th width="180"></th><th width="210"></th><th width="107"></th><th></th></tr></thead><tbody><tr><td>Name</td><td>MetricID</td><td>Unit</td><td>Interval</td></tr><tr><td>Block Mean Feerate</td><td>block_feerate_mean</td><td>Native feerate</td><td>1 block</td></tr></tbody></table>

**Methodology**

The most recent block is evaluated and the mean feerate in that block is computed.

**Available Assets**

Bitcoin (BTC), Ethereum (ETH)

**Sample Query**

{% embed url="https://api.coinmetrics.io/v4/timeseries/asset-metrics?api_key=%3Cyour_key%3E&assets=btc,eth&frequency=1b&metrics=block_feerate_mean&pretty=true" %}

## Block Median Feerate <a href="#block_feerate_median" id="block_feerate_median"></a>

**Definition**

A block's median transaction feerate. For Bitcoin this is measured in sats/vbyte. For Ethereum this measures the gas price in Gwei

**Dictionary**

<table data-header-hidden><thead><tr><th width="180"></th><th width="210"></th><th width="107"></th><th></th></tr></thead><tbody><tr><td>Name</td><td>MetricID</td><td>Unit</td><td>Interval</td></tr><tr><td>Block Median Feerate</td><td>block_feerate_median</td><td>Native feerate</td><td>1 block</td></tr></tbody></table>

**Methodology**

The most recent block is evaluated and the median feerate in that block is computed.

**Available Assets**

Bitcoin (BTC), Ethereum (ETH)

**Sample Query**

{% embed url="https://api.coinmetrics.io/v4/timeseries/asset-metrics?api_key=%3Cyour_key%3E&assets=btc,eth&frequency=1b&metrics=block_feerate_median&pretty=true" %}

## Block Minimum Feerate <a href="#block_feerate_min" id="block_feerate_min"></a>

**Definition**

A block's minimum transaction feerate. For Bitcoin this is measured in sats/vbyte. For Ethereum this measures the gas price in Gwei

**Dictionary**

<table data-header-hidden><thead><tr><th width="180"></th><th width="210"></th><th width="107"></th><th></th></tr></thead><tbody><tr><td>Name</td><td>MetricID</td><td>Unit</td><td>Interval</td></tr><tr><td>Block Minimum Feerate</td><td>block_feerate_min</td><td>Native feerate</td><td>1 block</td></tr></tbody></table>

**Methodology**

The most recent block is evaluated and the minimum feerate in that block is computed.

**Available Assets**

Bitcoin (BTC), Ethereum (ETH)

**Sample Query**

{% embed url="https://api.coinmetrics.io/v4/timeseries/asset-metrics?api_key=%3Cyour_key%3E&assets=btc,eth&frequency=1b&metrics=block_feerate_min&pretty=true" %}

## API Endpoints

Transaction Feerate metrics can be accessed using these endpoints:

* `timeseries/asset-metrics`

and by passing in the metric ID's `block_feerate_*` in the `metrics` parameter.

{% swagger src="../../../.gitbook/assets/openapi.yaml" path="/timeseries/asset-metrics" method="get" %}
[openapi.yaml](../../../.gitbook/assets/openapi.yaml)
{% endswagger %}

{% tabs %}
{% tab title="Shell" %}
```shell
curl --compressed "https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=block_feerate_max&assets=btc&pretty=true&api_key=<your_key>"
```
{% endtab %}

{% tab title="Python" %}
```python
import requests
response = requests.get('https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=block_feerate_max&assets=btc&pretty=true&api_key=<your_key>').json()
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
        metrics="block_feerate_max", 
        assets="btc",
    ).to_dataframe()
)
```
{% endtab %}
{% endtabs %}
