# Outputs

## Contents

* [Mempool Transaction Output Value Entered (mempool\_output\_value\_entered\_1m)](outputs.md#mempool\_output\_value)
* [Mempool Transaction Output Value (mempool\_output\_value)](outputs.md#mempool\_output\_value\_entered)

## Mempool Transaction Output Value Entered 1 Minute <a href="#mempool_output_value_entered" id="mempool_output_value_entered"></a>

**Definition**

The sum of all mempool transaction outputs in native units that have entered the mempool over the course of a 1-minute aggregation window. The beginning of this time window is noted in the “time” field of the response.

**Dictionary**

| Name                                              | MetricID                            | Unit         | Interval |
| ------------------------------------------------- | ----------------------------------- | ------------ | -------- |
| Mempool Transaction Output value entered 1 minute | mempool\_output\_value\_entered\_1m | Native Units | 1m       |

**Methodology**

The mempool is evaluated and all transaction outputs (UTXOs) are indexed. The value of all UTXOs of mempool transactions that have entered the mempool in the previous 1-minute window is then summed.

**Available Assets**

Bitcoin (BTC)

**Sample Query**

{% embed url="https://api.coinmetrics.io/v4/timeseries/asset-metrics?api_key=%3Cyour_key%3E&assets=btc&frequency=1m&limit_per_asset=1&metrics=mempool_output_value_entered_1m&pretty=true" %}

## Mempool Transaction Output Value <a href="#mempool_output_value" id="mempool_output_value"></a>

**Definition**

The sum of all mempool transaction outputs in native units.

**Dictionary**

| Name                             | MetricID               | Unit         | Interval |
| -------------------------------- | ---------------------- | ------------ | -------- |
| Mempool Transaction Output Value | mempool\_output\_value | Native Units | 1m       |

**Methodology**

The mempool is evaluated and all transaction outputs (UTXOs) are indexed. The value of all UTXOs of mempool transactions is then summed.

**Available Assets**

Bitcoin (BTC)

**Sample Query**

{% embed url="https://api.coinmetrics.io/v4/timeseries/asset-metrics?api_key=%3Cyour_key%3E&assets=btc&frequency=1m&limit_per_asset=1&metrics=mempool_output_value&pretty=true" %}

## API Endpoints

metrics can be accessed using these endpoints:

* `timeseries/asset-metrics`

and by passing in the metric ID's `mempool_output_value*` in the `metrics` parameter.

{% swagger src="../../../.gitbook/assets/openapi.yaml" path="/timeseries/asset-metrics" method="get" %}
[openapi.yaml](../../../.gitbook/assets/openapi.yaml)
{% endswagger %}

{% tabs %}
{% tab title="Shell" %}
```shell
curl --compressed "https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=mempool_output_value&assets=btc&pretty=true&api_key=<your_key>"
```
{% endtab %}

{% tab title="Python" %}
```python
import requests
response = requests.get('https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=mempool_output_value&assets=btc&pretty=true&api_key=<your_key>').json()
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
        metrics="mempool_output_value", 
        assets="btc",
    ).to_dataframe()
)
```
{% endtab %}
{% endtabs %}
