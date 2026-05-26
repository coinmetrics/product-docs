# Miner Entity

## Definition

Name of the entity that mined a block.

| Name          | MetricID    | Unit | Interval |
| ------------- | ----------- | ---- | -------- |
| Miner Entity  | MinerEntity | N/A  | 1 block  |

## Details

* Identifies the mining pool or solo miner responsible for producing each block.
* Entity identification is performed by matching coinbase transaction signatures and known pool tags against Coin Metrics' internal entity registry.
* Returned as a text string (e.g. `"Foundry USA"`, `"AntPool"`). Blocks from unknown or unidentified miners are returned as `null` or an empty string.
* Available at 1-block granularity; not aggregated to daily intervals.

## API Endpoints

Miner entity data can be accessed using the `timeseries/asset-metrics` endpoint:

{% swagger src="../../../.gitbook/assets/openapi.yaml" path="/timeseries/asset-metrics" method="get" %}
[openapi.yaml](../../../.gitbook/assets/openapi.yaml)
{% endswagger %}

{% tabs %}
{% tab title="Shell" %}
```shell
curl --compressed "https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=MinerEntity&assets=btc&frequency=1b&pretty=true&api_key=<your_key>"
```
{% endtab %}

{% tab title="Python" %}
```python
import requests
response = requests.get('https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=MinerEntity&assets=btc&frequency=1b&pretty=true&api_key=<your_key>').json()
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
        metrics="MinerEntity",
        assets="btc",
        frequency="1b",
    ).to_dataframe()
)
```
{% endtab %}
{% endtabs %}
