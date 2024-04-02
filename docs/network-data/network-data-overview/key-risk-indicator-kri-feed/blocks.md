# Blocks

## Contents

* [Block Count at Tip](blocks.md#block\_count\_at\_tip)
* [Block Count by Same Miner](blocks.md#block\_count\_by\_same\_miner)
* [Blocks by Unknown Miners](blocks.md#block\_count\_by\_unknown\_miners)
* [Blocks Without Segwit](blocks.md#block\_count\_without\_segwit)

## Block Count at Tip <a href="#block_count_at_tip" id="block_count_at_tip"></a>

**Definition**

The number of blocks identified at the chain tip.

**Dictionary**

| Name               | MetricID              | Category | Sub-category     | Type | Unit          | Interval |
| ------------------ | --------------------- | -------- | ---------------- | ---- | ------------- | -------- |
| Block Count at Tip | block\_count\_at\_tip | KRI      | Block Attributes | Sum  | Count of tips | 1b       |

**Methodology**

Counts the number of unique block hashes at the tip of the chain and returns that number. More than one block count at the tip of the chain indiciates a fork in the chain.

**Available Assets**

Bitcoin (BTC), Ethereum (ETH)

**Sample Query**

{% embed url="https://api.coinmetrics.io/v4/timeseries/asset-metrics?api_key=%3Cyour_key%3E&assets=btc,eth&frequency=1b&metrics=block_count_at_tip&pretty=true" %}

## Block Count by Same Miner <a href="#block_count_by_same_miner" id="block_count_by_same_miner"></a>

**Definition**

The number of blocks mined by the same miner in the past 6 blocks.

**Dictionary**

<table data-header-hidden><thead><tr><th width="179"></th><th width="282"></th><th width="112"></th><th width="142"></th><th></th><th width="155"></th><th></th></tr></thead><tbody><tr><td>Name</td><td>MetricID</td><td>Category</td><td>Sub-category</td><td>Type</td><td>Unit</td><td>Interval</td></tr><tr><td>Block Count by Same Miner</td><td>block_count_by_same_miner_6b</td><td>KRI</td><td>Block Attributes</td><td>Sum</td><td>Coun of Blocks</td><td>1b</td></tr></tbody></table>

**Methodology**

The 6 blocks from the tip of the blockchain (including the most recent block) are assessed. Coin Metric employs a proprietary entity clustering methodology in order to identify major mining pools & miners. The coinbase output field used by miners to self-identify is also used to help assess miner identities.

**Available Assets**

Bitcoin (BTC), _Ethereum (ETH)\*._

_\* Historical data covering the pre-merge timeframe only (up to 9/15/2022). With the merge ETH switched from Proof of Work and miners to Proof of Stake and validators meaning the network no longer has any miners as of the merge date._

**Sample Query**

{% embed url="https://api.coinmetrics.io/v4/timeseries/asset-metrics?api_key=%3Cyour_key%3E&assets=btc&frequency=1b&metrics=block_count_by_same_miner_6b&pretty=true" %}

## Blocks by Unknown Miners <a href="#block_count_by_unknown_miners" id="block_count_by_unknown_miners"></a>

**Definition**

The count of blocks that have been mined by unknown miners 6 blocks from the tip of the blockchain.

**Dictionary**

| Name                    | MetricID                              | Category | Sub-category | Type | Unit            | Interval |
| ----------------------- | ------------------------------------- | -------- | ------------ | ---- | --------------- | -------- |
| Blocks by unknown miner | block\_count\_by\_unknown\_miners\_6b | KRI      | Mining Pools | Sum  | Count of blocks | 1 block  |

**Methodology**

The 6 blocks from the tip of the blockchain (including the most recent block) are assessed. Coin Metric employs a proprietary entity clustering methodology in order to identify major mining pools & miners. The coinbase output field used by miners to self-identify is also used to help assess miner identities.

**Available Assets (v1)**

Bitcoin (BTC), _Ethereum (ETH)\*._

_\* Historical data covering the pre-merge timeframe only (up to 9/15/2022). With the merge ETH switched from Proof of Work and miners to Proof of Stake and validators meaning the network no longer has any miners as of the merge date._

**Sample Query**

{% embed url="https://api.coinmetrics.io/v4/timeseries/asset-metrics?api_key=%3Cyour_key%3E&assets=btc&frequency=1b&limit_per_asset=1&metrics=block_count_by_unknown_miners_6b&pretty=true" %}

## Non SegWit Blocks <a href="#block_count_without_segwit" id="block_count_without_segwit"></a>

**Definition**

The number of blocks without [SegWit](https://en.bitcoin.it/wiki/Segregated\_Witness) transactions in the past 6 blocks.

**Dictionary**

| Name              | MetricID                          | Category | Sub-category     | Type | Unit             | Interval |
| ----------------- | --------------------------------- | -------- | ---------------- | ---- | ---------------- | -------- |
| Non segwit blocks | block\_count\_without\_segwit\_6b | KRI      | Block Attributes | Sum  | Number of blocks | 1 block  |

**Methodology**

The 6 blocks from the tip of the blockchain (including the most recent block) are assessed, and the number of blocks without SegWit transactions is counted.

**Available Assets**

Bitcoin (BTC)

**Sample Query**

{% embed url="https://api.coinmetrics.io/v4/timeseries/asset-metrics?api_key=%3Cyour_key%3E&assets=btc&frequency=1b&limit_per_asset=1&metrics=block_count_without_segwit_6b&pretty=true" %}

## API Endpoints

Blocks metrics can be accessed using these endpoints:

* `timeseries/asset-metrics`

and by passing in the metric ID's `block_count*` in the `metrics` parameter.

{% tabs %}
{% tab title="Shell" %}
```shell
curl --compressed "https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=block_count_at_tip&assets=btc&pretty=true&api_key=<your_key>"
```
{% endtab %}

{% tab title="Python" %}
```python
import requests
response = requests.get('https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=block_count_at_tip&assets=btc&pretty=true&api_key=<your_key>').json()
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
        metrics="block_count_at_tip", 
        assets="btc",
    ).to_dataframe()
)
```
{% endtab %}
{% endtabs %}
