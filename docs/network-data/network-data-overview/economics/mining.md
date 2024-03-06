# Mining

### Contents

* [Miner Cap to Realized Cap](mining.md#mcrc)
* [Miner Cap to Thermo Cap](mining.md#mctc)
* [Miner Outflow to Miner Revenue](mining.md#momr)

## Miner Cap to Realized Cap (MCRC) <a href="#mcrc" id="mcrc"></a>

### Definition

The ratio of Miner Cap over Realized Cap at the end of that interval. Miner Cap represents all funds held by mining pools and miners and is calculated as the sum of SplyMiner0HopAllUSD (supply held by mining pools) and SplyMiner1HopAllUSD (supply held by miners). [Realized Cap](broken-reference) (CapRealUSD) is defined as the sum USD value based on the USD closing price on the day that a native unit last moved (i.e., last transacted) for all native units.

| Name                             | IMetricD | Unit          | Interval |
| -------------------------------- | -------- | ------------- | -------- |
| Miner Cap to Realized Cap (MCRC) | MCRC     | Dimensionless | 1 day    |

### Details

* This metric shows the ratio between the assets that miners hold in custody relative to the "cost basis" of the entire network.
* Like [MVRV](broken-reference), it can be used to better understand the market cycle as it identifies moments where the value of the supply held by miners is higher than the cost basis of the entire network.
* Similarly, it may showcase when miners are capitulating and potentially selling at a loss.
* Miners are speculators as they are naturally exposed to the price of the currency they are mining. As such, they collectively make buy or sell decisions that ultimately impact the market.

### Chart

![](../../../.gitbook/assets/MCRC\(1\).png)

### Interpretation

* When comparing the USD value of what miners have in custody relative to the cost basis of the network as a whole, a natural threshold of 1 is relevant.
* When this threshold is breached, it might indicate that miners are more willing to sell their assets, as their profit margins have widened.
* Conversely, as this ratio nears zero, it might indicate miners are selling at a loss.

### Asset-Specific Details

Only applicable to assets for which we have SplyMiner0HopAllUSD (supply held by mining pools), SplyMiner1HopAllUSD (supply held by miners) and Realized Cap (CapRealUSD).

### Release History

* Release Version: NDP 5.0 (August, 2021)

### See Also:

* [MCTC (Miner Cap / Thermo Cap)](../../economics/mctc.md)
* [MVRV (Market Cap / Realized Market Cap)](broken-reference)

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/MCTC" %}

## Miner Cap to Thermo Cap (MCTC) <a href="#mctc" id="mctc"></a>

### Definition

The ratio of Miner Cap relative to Thermo Cap at the end of that interval. Miner Cap represents all funds held by mining pools and miners and is calculated as the sum of SplyMiner0HopAllUSD (supply held by mining pools) and SplyMiner1HopAllUSD (supply held by miners). Thermo Cap is RevAllTimeUSD and represents the USD value of all funds disbursed to miners at the time of issuance.

| Name                           | MetricID | Unit          | Interval |
| ------------------------------ | -------- | ------------- | -------- |
| Miner Cap to Thermo Cap (MCTC) | MCTC     | Dimensionless | 1 day    |

### Details

* This metric shows the ratio between the assets that miners hold in custody relative to the assets that miners have been issued by the protocol as mining rewards.
* Like [MVRV](broken-reference), it can be used to better understand the market cycle as it identifies moments where the value of the supply held by miners is higher than what was issued to them.
* Similarly, it may showcase when miners are capitulating and potentially selling at a loss.
* Miners are speculators as they are naturally exposed to the price of the currency they are mining. As such, they collectively make buy or sell decisions that ultimately impact the market.

### Chart

![](../../../.gitbook/assets/MCTC\(1\).png)

### Interpretation

* Historically, a threshold of 10 has been indicative of market tops.
* When this threshold is breached, it might indicate that miners are more willing to sell their assets, as their profit margins have widened.
* Conversely, as this ratio dips below 2, it might indicate market bottoms as miner's willingness to sell decreases.

### Asset-Specific Details

Only applicable to assets for which we have SplyMiner0HopAllUSD (supply held by mining pools), SplyMiner1HopAllUSD (supply held by miners) and Thermo Cap (RevAllTimeUSD).

### Release History

* Release Version: NDP 5.0 (August, 2021)

### See Also:

* [MCRC (Market Cap / Realized Cap)](../../economics/mcrc.md)
* [MVRV (Market Cap / Realized Market Cap)](broken-reference)

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/MCRC" %}

## Miner Outflow to Miner Revenue <a href="#momr" id="momr"></a>

### Definition

The ratio of Miner Outflows over Miner Revenue at the end of that interval. Miner outflows represent the sum of funds being sent by miner addresses (1-hop from the coinbase) and are calculated as FlowMinerOut1HopAllNtv. Miner Revenue represents the sum of funds (new coins and transaction fees) sent to miners over a time window and is calculated as RevNtv.

| Name                      | MetricID                                                          | Unit          | Interval |
| ------------------------- | ----------------------------------------------------------------- | ------------- | -------- |
| Miner Cap to Realized Cap | [MOMR](https://coverage.coinmetrics.io/search-results?query=MOMR) | Dimensionless | 1 day    |

### Details

* This metric shows the ratio between the assets leaving miner addresses relative to how much miners have received as revenue.
* The FlowMinerOut1HopAllNtv is part of our Miner Flows family of metrics, which takes into account the custody structures within mining pools and their constituents who are individually mining.

### Interpretation

* When comparing the USD value of what miners are sending relative to the funds they are receiving, there appears to be a negative relationship with price.
* That makes intuitive sense as it might indicate that miners are sending more funds out (which might show higher willingness to sell) relative to what they are receiving as revenue.
* As such, this ratio might serve as a barometer for miner sentiment and identify liquidity events when miners might be bearish.
* It is important to note that the mere act of sending funds from one address to another does not necessary signify the act of selling.
* Only when there is a clear & noticeable uptick in this metric that the speculation that miners are selling is defensible, given that outflows might signify more mundane events such as a cold wallet shuffle.
* Miner outflows are naturally very volatile. As such, we recommend using a monthly (30d) Moving Average when visualizing this metric.

### Asset-Specific Details

Only applicable to assets for which we have SplyMiner0HopAllUSD (supply held by mining pools), SplyMiner1HopAllUSD (supply held by miners) and Realized Cap (CapRealUSD).

### Release History

* Release Version: NDP 5.0 (August, 2021)

### See Also:

* [MCTC (Miner Cap / Thermo Cap)](../../economics/mctc.md)
* [MVRV (Market Cap / Realized Market Cap)](broken-reference)

### Coverage

* [MOMR](https://coverage.coinmetrics.io/asset-metrics/MOMR)

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/MOMR" %}

## API Endpoints

Address Balances can be accessed using these endpoints:

* `timeseries/asset-metrics`

and by passing in the metric ID's `MCRC` , `MCTC` and `MOMR` in the `metrics` parameter.

{% swagger src="../../../.gitbook/assets/openapi.yaml" path="/timeseries/asset-metrics" method="get" %}
[openapi.yaml](../../../.gitbook/assets/openapi.yaml)
{% endswagger %}

{% tabs %}
{% tab title="Shell" %}
```shell
curl --compressed "https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=MCRC&assets=btc&pretty=true&api_key=<your_key>"
```
{% endtab %}

{% tab title="Python" %}
```python
import requests
response = requests.get('https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=MCRC&assets=btc&pretty=true&api_key=<your_key>').json()
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
        metrics="MCRC", 
        assets='btc',
    ).to_dataframe()
)
```
{% endtab %}
{% endtabs %}
