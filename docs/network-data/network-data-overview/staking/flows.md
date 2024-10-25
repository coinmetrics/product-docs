# Flows

## Contents

* [Flows](flows.md#flowtoclcont)
* [Deposits to Consensus Layer](flows.md#flowtoclcont-1)
* [Withdrawals from Consensus Layer](flows.md#flowtoclcont-2)

## Flows to CL Contract <a href="#flowtoclcont" id="flowtoclcont"></a>

### Definition

Deposits sent to the Consensus Layer (CL) Contract.

| Name                 | MetricID     | Unit         | Interval |
| -------------------- | ------------ | ------------ | -------- |
| Flows to CL Contract | FlowToCLCont | Native Units | 1 day    |

### Details

* ETH sent to the Consensus Layer (CL) smart contract (0x00000000219ab540356cBB839Cbe05303d7705Fa) over the daily interval, sourced from Coin Metrics ATLAS™ blockchain search engine.

### Release History

* Released September 2022.

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/FlowToCLCont" %}

## Deposits to Consensus Layer <a href="#flowtoclcont" id="flowtoclcont"></a>

### Definition

Total deposits sent to the Consensus Layer (CL)

| Name                        | MetricID         | Unit         | Interval      |
| --------------------------- | ---------------- | ------------ | ------------- |
| Deposits to Consensus Layer | StkDepositTotNtv | Native Units | 1 day, 1 hour |

### Details

* ETH deposited to the consensus layer in the given time interval. This number will differ from the amount sent to the CL Contract due to the delay between the contract receiving funds and funds being deposited on the consensus layer. For details, refer to [Coin Metrics' State of the Network #244 ](https://coinmetrics.substack.com/p/state-of-the-network-issue-244#new\_tab)

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics-v2/StkDepositTotNtv" %}

## Withdrawals from Consensus Layer <a href="#flowtoclcont" id="flowtoclcont"></a>

### Definition

Total deposits sent to the Consensus Layer (CL)

| Name                             | MetricID          | Unit         | Interval      |
| -------------------------------- | ----------------- | ------------ | ------------- |
| Withdrawals from Consensus Layer | StkWithdrawTotNtv | Native Units | 1 day, 1 hour |

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics-v2/StkWithdrawTotNtv" %}

## API Endpoints

Flows metrics can be accessed using these endpoints:

* `timeseries/asset-metrics`

and by passing in the metric ID's `FlowToCLCont` in the `metrics` parameter.

{% swagger src="../../../.gitbook/assets/openapi.yaml" path="/timeseries/asset-metrics" method="get" %}
[openapi.yaml](../../../.gitbook/assets/openapi.yaml)
{% endswagger %}

{% tabs %}
{% tab title="Shell" %}
```shell
curl --compressed "https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=FlowToCLCont&assets=eth&pretty=true&api_key=<your_key>"
```
{% endtab %}

{% tab title="Python" %}
```python
import requests
response = requests.get('https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=FlowToCLCont&assets=eth&pretty=true&api_key=<your_key>').json()
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
        metrics="FlowToCLCont", 
        assets="eth",
    ).to_dataframe()
)
```
{% endtab %}
{% endtabs %}
