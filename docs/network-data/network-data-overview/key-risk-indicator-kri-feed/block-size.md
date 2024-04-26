# Block Size

## Contents

* [Block Size (block\_size)](block-size.md#block\_size)

## Block Size <a href="#block_size" id="block_size"></a>

**Definition**

A block's size in bytes

**Dictionary**

| Name       | MetricID    | Unit  | Interval |
| ---------- | ----------- | ----- | -------- |
| Block Size | block\_size | bytes | 1b       |

**Methodology**

The most recent block is evaluated and the total size of that block is computed in bytes.

**Available Assets**

Bitcoin (BTC), Ethereum (ETH)

## API Endpoints

Block Size metrics can be accessed using these endpoints:

* `timeseries/asset-metrics`

and by passing in the metric ID's `block_size*` in the `metrics` parameter.

{% swagger src="../../../.gitbook/assets/openapi.yaml" path="/timeseries/asset-metrics" method="get" %}
[openapi.yaml](../../../.gitbook/assets/openapi.yaml)
{% endswagger %}

{% tabs %}
{% tab title="Shell" %}
```shell
curl --compressed "https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=block_size&assets=btc&pretty=true&api_key=<your_key>"
```
{% endtab %}

{% tab title="Python" %}
```python
import requests
response = requests.get('https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=block_size&assets=btc&pretty=true&api_key=<your_key>').json()
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
        metrics="block_size", 
        assets="btc",
    ).to_dataframe()
)
```
{% endtab %}
{% endtabs %}
