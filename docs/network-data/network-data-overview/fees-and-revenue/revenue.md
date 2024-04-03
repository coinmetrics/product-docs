# Revenue

### Contents

* [Miner revenue, all time, USD](revenue.md#a)
* [Miner revenue, native units](revenue.md#b)
* [Miner revenue, USD](revenue.md#miner-revenue-usd)

## All Time Miner Revenue (USD) <a href="#a" id="a"></a>

### Definition

The sum USD value of all miner revenue (fees plus newly issued native units) for all time.

| Name                         | MetricID      | Unit | Interval |
| ---------------------------- | ------------- | ---- | -------- |
| All Time Miner Revenue (USD) | RevAllTimeUSD | USD  | All time |

### Details

* This metric is defined as the cumulative sum of RevUSD.
* It’s also known as thermocap

### Release History

* Released in the 1.0 release of NDP

### Interpretation

* The cumulative miner revenue for an asset, also called Thermocap, can be interpreted as an estimate of fiat inflows into an asset. The assumption behind this is that miners have fiat expenses but crypto revenue. To cover their expenses (mining hardware, electricity, wages, etc..), they must sell some or most of their crypto revenue for fiat. Given that, we know that the other party of this transaction must sell fiat for crypto and is therefore a new inflow in the asset. While this holds for large assets, miners of smaller assets might sell their mined crypto for BTC/ETH and then sell this for USD. This is a naive heuristic and presumes that miners do not mine speculatively, hoarding their coins without selling them off.

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/RevAllTimeUSD" %}

## Miner Revenue (native units) <a href="#b" id="b"></a>

### Definition

The sum native units of miner revenue (fees plus newly issued native units) that interval.

| Name                         | MetricID | Unit         | Interval       |
| ---------------------------- | -------- | ------------ | -------------- |
| Miner Revenue (native units) | RevNtv   | Native units | 1 day, 1 block |

### Details

* Mining revenue doesn’t include founders reward/community funds issuance.

### Asset-Specific Details

* Post Ethereum Merge, RevNtv includes only Priority Fees for ETH
* For SOL, sum of all rewards earned for Voting, Staking, Fees & Rent by validators.

### Release History

* Released in the 4.3 release of NDP

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/RevNtv" %}

## Miner Revenue (USD)

### Definition

The sum USD value of all miner revenue (fees plus newly issued native units) that day.

| Name                | MetricID | Unit | Interval       |
| ------------------- | -------- | ---- | -------------- |
| Miner Revenue (USD) | RevUSD   | USD  | 1 day, 1 block |

### Details

* Mining revenue doesn’t include founders reward/community funds issuance.
* Price used is PriceUSD

### Asset-Specific Details

* Post Ethereum Merge, RevUSD includes only Priority Fees for ETH

### Release History

* Released in the 1.0 release of NDP

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/RevUSD" %}

### API Endpoints

Exhange Deposits metrics can be accessed using these endpoints:

* `timeseries/asset-metrics`

and by passing in the metric ID's `Rev*` in the `metrics` parameter.

<mark style="color:blue;">`GET`</mark> `undefined/timeseries/asset-metrics`

{% tabs %}
{% tab title="Shell" %}
```shell
curl --compressed "https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=RevAllTimeUSD&assets=btc&pretty=true&api_key=<your_key>"
```
{% endtab %}

{% tab title="Python" %}
```python
import requests
response = requests.get('https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=RevAllTimeUSD&assets=btc&pretty=true&api_key=<your_key>').json()
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
        metrics="RevAllTimeUSD", 
        assets="btc",
    ).to_dataframe()
)
```
{% endtab %}
{% endtabs %}
