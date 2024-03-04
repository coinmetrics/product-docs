# Contents

* [Base Fee for Block](block-attributes.md#block_base_fee)
* [Priority Fee for Block](block-attributes.md#block_priority_fee)

# Base Fee for Block<a href="#block_base_fee" id="block_base_fee"></a>

**Definition**

The base fee of the most recent block processed.

**Dictionary**

| Name               | MetricID         | Category | Sub-category     | Type | Unit | Interval |
| ------------------ | ---------------- | -------- | ---------------- | ---- | ---- | -------- |
| Base Fee for Block | block\_base\_fee | KRI      | Block Attributes | Sum  | ETH  | 1b       |

**Methodology**

The most recent block we processed within a 1-minute window is evaluated and its Base Fee captured. The concept of a Base Fee was introduced as part of EIP-1559 and it represents the portion of the total transaction fees that is destroyed and taken out of circulation (i.e. burnt). Ethereum post-1559 requires users to pay for a Base Fee as a prerequisite to include transactions in a block. The Base Fee can go up or down on the basis of the size (in gas units) of the previous block.

**Available Assets**

Ethereum (ETH)

**Sample Query**

{% embed url="https://api.coinmetrics.io/v4/timeseries/asset-metrics?api_key=%3Cyour_key%3E&assets=eth&frequency=1b&metrics=block_base_fee&pretty=true" %}

# Priority Fee for Block<a href="#block_priority_fee" id="block_priority_fee"></a>

**Definition**

The priority fee, or tip, of the most recent block processed.

**Dictionary**

| Name                   | MetricID             | Category | Sub-category     | Type | Unit | Interval |
| ---------------------- | -------------------- | -------- | ---------------- | ---- | ---- | -------- |
| Priority Fee for Block | block\_priority\_fee | KRI      | Block Attributes | Sum  | ETH  | 1b       |

**Methodology**

The most recent block we processed within a 1-minute window is evaluated and its Priority Fee, or tip, is captured. The concept of a Miner Tip was introduced as part of EIP-1559 and it represents the portion of the total transaction fees that rewards miners. This serves as an added incentive so that miners prioritize transactions that have opted-in and paid a tip. The other portion is called the Base Fee, and it is burnt (destroyed) after the transaction is included in a block.

**Available Assets**

Ethereum (ETH)

**Sample Query**

{% embed url="https://api.coinmetrics.io/v4/timeseries/asset-metrics?api_key=%3Cyour_key%3E&assets=eth&frequency=1b&metrics=block_priority_fee&pretty=true" %}


# API Endpoints

<Subcategory> metrics can be accessed using these endpoints:

* `timeseries/asset-metrics`

and by passing in the metric ID's `block_*_fee` in the `metrics` parameter.

{% swagger src="../../.gitbook/assets/openapi.yaml" path="/timeseries/asset-metrics" method="get" %}
[openapi.yaml](../../.gitbook/assets/openapi.yaml)
{% endswagger %}

{% tabs %}
{% tab title="Shell" %}
```shell
curl --compressed "https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=block_base_fee&assets=eth&pretty=true&api_key=<your_key>"
```
{% endtab %}

{% tab title="Python" %}
```python
import requests
response = requests.get('https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=block_base_fee&assets=btc&pretty=true&api_key=<your_key>').json()
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
        metrics="block_base_fee", 
        assets="eth",
    ).to_dataframe()
)
```
{% endtab %}
{% endtabs %}
