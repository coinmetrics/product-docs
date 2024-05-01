# Hashrate

## Contents

* [Average Hashrate (block\_hashrate\_mean\_1d)](hashrate.md#block\_hashrate\_mean)

## Average Hashrate <a href="#block_hashrate_mean" id="block_hashrate_mean"></a>

**Definition**

The mean hash rate needed to mine a block based on data from the previous 24 hrs. Hash rate is the speed at which computations are being completed across all miners in the network, in hashes per second.

**Dictionary**

| Name             | MetricID                  | Unit              | Interval |
| ---------------- | ------------------------- | ----------------- | -------- |
| Average Hashrate | block\_hashrate\_mean\_1d | Hashes per second | 1 block  |

**Methodology**

Hash rate is derived from difficulty (DiffMean), the rate at which block came in (BlkIntMean) and depending on the protocols, some other pieces of data. This metric gives an estimate of how much hash power is mining a given chain. This represents a sliding 1d average.

**Available Assets**

Bitcoin (BTC), _Ethereum (ETH)\*_

_\* Historical data covering the pre-merge timeframe only (up to 9/15/2022). With the merge ETH switched from Proof of Work and miners to Proof of Stake and validators meaning the network no longer has a hashrate as of the merge date._

**Sample Query**

{% embed url="https://api.coinmetrics.io/v4/timeseries/asset-metrics?api_key=%3Cyour_key%3E&assets=btc,ltc&frequency=1b&limit_per_asset=1&metrics=block_hashrate_mean_1d&pretty=true" %}

## API Endpoints

metrics can be accessed using these endpoints:

* `timeseries/asset-metrics`

and by passing in the metric ID's `block_hashrate_mean_*` in the `metrics` parameter.

{% swagger src="../../../.gitbook/assets/openapi.yaml" path="/timeseries/asset-metrics" method="get" %}
[openapi.yaml](../../../.gitbook/assets/openapi.yaml)
{% endswagger %}

{% tabs %}
{% tab title="Shell" %}
```shell
curl --compressed "https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=block_hashrate_mean_1d&assets=btc&pretty=true&api_key=<your_key>"
```
{% endtab %}

{% tab title="Python" %}
```python
import requests
response = requests.get('https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=block_hashrate_mean_1d&assets=btc&pretty=true&api_key=<your_key>').json()
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
        metrics="block_hashrate_mean_1d", 
        assets="btc",
    ).to_dataframe()
)
```
{% endtab %}
{% endtabs %}
