# Transactions

## Contents

* [Transactions in Block (block\_tx\_count)](transactions.md#block\_tx\_count)
* [Mempool Transaction Count (mempool\_count)](transactions.md#mempool\_count)
* [Transaction Count Entered Mempool 1 Minute (mempool\_count\_entered\_1m)](transactions.md#block\_tx\_count)

## Transactions in Block <a href="#block_tx_count" id="block_tx_count"></a>

**Definition**

The count of all transactions within the most recent block processed.

**Dictionary**

| Name                  | MetricID         | Unit                  | Interval |
| --------------------- | ---------------- | --------------------- | -------- |
| Transactions in Block | block\_tx\_count | Count of transactions | 1b       |

**Methodology**

The most recent block we processed within a 1-minute window is evaluated and the number of transactions within the block are counted. For UTXO based currencies, this includes the coinbase transaction.

**Available Assets**

Bitcoin (BTC), Ethereum (ETH)

**Sample Query**

{% embed url="https://api.coinmetrics.io/v4/timeseries/asset-metrics?api_key=%3Cyour_key%3E&assets=eth&frequency=1b&metrics=block_tx_count&pretty=true" %}

## Mempool Transaction Count <a href="#mempool_count" id="mempool_count"></a>

**Definition**

The count of all mempool transactions at a point in time.

**Dictionary**

| Name                      | MetricID       | Unit        | Interval |
| ------------------------- | -------------- | ----------- | -------- |
| Mempool Transaction Count | mempool\_count | Transaction | 1m       |

**Methodology**

The mempool is evaluated and all transactions indexed. All unprocessed mempool transactions at a point in time are then counted.

**Available Assets**

Bitcoin (BTC)

Sample Query

{% embed url="https://api.coinmetrics.io/v4/timeseries/asset-metrics?api_key=%3Cyour_key%3E&assets=btc&frequency=1m&limit_per_asset=1&metrics=mempool_count&pretty=true" %}

## Transaction Count Entered Mempool 1 Minute <a href="#mempool_count_entered" id="mempool_count_entered"></a>

**Definition**

The count of all transactions that have entered the mempool over the course of a 1-minute aggregation window. The beginning of this time window is noted in the “time” field of the response.

**Dictionary**

| Name                                       | MetricID                    | Unit        | Interval |
| ------------------------------------------ | --------------------------- | ----------- | -------- |
| Transaction Count entered mempool 1 minute | mempool\_count\_entered\_1m | Transaction | 1m       |

**Methodology**

The mempool is evaluated and all transactions that have been entered (new transactions broadcasted by users) since a point in time are counted.

**Available Assets**

Bitcoin (BTC)

**Sample Query**

{% embed url="https://api.coinmetrics.io/v4/timeseries/asset-metrics?api_key=%3Cyour_key%3E&assets=btc&frequency=1m&limit_per_asset=1&metrics=mempool_count_entered_1m&pretty=true" %}

## API Endpoints

Transactions metrics can be accessed using these endpoints:

* `timeseries/asset-metrics`

and by passing in the metric ID's `block_tx_count*` and `mempool_count_*` in the `metrics` parameter.

{% swagger src="../../../.gitbook/assets/openapi.yaml" path="/timeseries/asset-metrics" method="get" %}
[openapi.yaml](../../../.gitbook/assets/openapi.yaml)
{% endswagger %}

{% tabs %}
{% tab title="Shell" %}
```shell
curl --compressed "https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=block_tx_count&assets=btc&pretty=true&api_key=<your_key>"
```
{% endtab %}

{% tab title="Python" %}
```python
import requests
response = requests.get('https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=block_tx_count&assets=btc&pretty=true&api_key=<your_key>').json()
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
        metrics="block_tx_count", 
        assets="btc",
    ).to_dataframe()
)
```
{% endtab %}
{% endtabs %}
