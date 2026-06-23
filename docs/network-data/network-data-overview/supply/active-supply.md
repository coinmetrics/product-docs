# Active Supply

## Contents

* [Active Supply](active-supply.md#splyact)
* [Active Supply Percent](active-supply.md#splyactpct)

## Active Supply <a href="#splyact" id="splyact"></a>

### Definition

The sum of unique native units that transacted at least once in the trailing X time to that interval. Native units that transacted more than once are only counted once.

| Name                                     | MetricID    | Unit         | Interval |
| ---------------------------------------- | ----------- | ------------ | -------- |
| 1 Day Active Supply                      | SplyAct1d   | Native units | 1 days   |
| 7 Day Active Supply                      | SplyAct7d   | Native units | 7 days   |
| 30 Day Active Supply                     | SplyAct30d  | Native units | 30 days  |
| 90 Day Active Supply                     | SplyAct90d  | Native units | 90 days  |
| 180 Day Active Supply                    | SplyAct180d | Native units | 180 days |
| 1 Year Active Supply                     | SplyAct1Yr  | Native units | 1 Year   |
| 2 Year Active Supply                     | SplyAct2Yr  | Native units | 2 Years  |
| 3 Year Active Supply                     | SplyAct3Yr  | Native units | 3 Years  |
| 4 Year Active Supply                     | SplyAct4Yr  | Native units | 4 Years  |
| 5 Year Active Supply                     | SplyAct5Yr  | Native units | 5 Years  |
| Active Supply (transacted at least once) | SplyActEver | Native units | All time |

### Details

* For UTXO-based protocols, active supply is considered as the outputs created during the time interval. Mining reward outputs are not considered active. If an address has an output created outside the time interval, and inside the time interval, only the latter output will be considered active.
* For account-based protocols, active supply is the sum of the balances of accounts that were either created outside of token generation events (genesis, mining, etc.) during the considered time interval, or that had at least one native units debit during it. Any type of movement suffice to mark an account as active (fees, transfers, etc.).

### Asset- Specific Details

* For Ripple, escrows are considered active supply, with a last active time at the time of their creation.
* This metric is not available for assets that have full privacy, like Monero and Grin.
* For assets that have opt-in privacy features, like ZCash, we only take the non-private balances into account.

### Release History

* Released in the version 4.0 of Network Data Pro

### Interpretation

This metric tracks the fraction of supply active in the trailing period specified. This allows you to determine how active given tranches of a cryptocurrency are. This is a distinct and harder to forge metric than transactional value (see for instance Transactions, transfers, value, adjusted, USD), which can be increased by a few whales making copious self-sends. In active supply, one’s ability to game the metric is proportional to one’s share of supply. The worst an adversary could do would be to make their fraction of supply appear perpetually active. Active supply cohorts are a popular tool used by traders to access the market-relevant supply of an asset and to ascertain whether a given asset is being used transactionally or as a store of value. Additionally, the longer-term active supply cohorts can be used to derive an estimate of lost coins.

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/SplyAct1d" %}

## 1 Year Active Supply % <a href="#splyactpct" id="splyactpct"></a>

### Defintion

The percentage of the current supply that has been active in the trailing 1 year up to that day.

| Name                   | MetricID      | Unit          | Interval |
| ---------------------- | ------------- | ------------- | -------- |
| 1 Year Active Supply % | SplyActPct1yr | Dimensionless | 1 day    |

### Details

* Computed as SplyAct1yr / SplyCur
* For UTXO chains, active supply is considered as the outputs created during the considered time interval. Mining reward outputs are not considered active. (If an address has an output created outside the time interval, and inside the time interval, only the latter output will be considered active).
* For account based chains, active supply is the sum of the balances of accounts that were either created outside of token generation events (genesis, mining, etc.) during the considered time interval, or that had at least one outgoing native units movement during that time period.

### Chart

![Source: CM Network Data Charts](../../../.gitbook/assets/1yr\_Active\_Supply\_\_.png)

### Asset-Specific Details

* For Ripple, escrows are considered active supply, with a last active time at the time of their creation.
* This metric is not available for assets that have full privacy, like Monero, Grin.
* For assets that have opt-in privacy features, like ZCash, it only takes the non-private balances into account.

### Release History

* Released in the 1.0 release of NDP

### Interpretation

1-year active supply %​ is the percent of total supply that has been transferred on-chain within the last year. As an asset price rises, an increasing amount of dormant supply can start to become active as long-term holders sell or move their native units. ​Some view a high percentage of 1-year active supply in the trailing year as a sign that a price rally is reaching exhaustion. Conversely, when price is low for extended periods of time, 1-year active supply % has dropped historically as investors hold through crypto winters.

### See Also

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/SplyActPct1yr" %}

## API Endpoints

Active Supply metrics can be accessed using these endpoints:

* `timeseries/asset-metrics`

and by passing in the metric ID's `SplyAct*` in the `metrics` parameter.

{% swagger src="../../../.gitbook/assets/openapi.yaml" path="/timeseries/asset-metrics" method="get" %}
[openapi.yaml](../../../.gitbook/assets/openapi.yaml)
{% endswagger %}

{% tabs %}
{% tab title="Shell" %}
```shell
curl --compressed "https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=SplyAct1d&assets=eth&pretty=true&api_key=<your_key>"
```
{% endtab %}

{% tab title="Python" %}
```python
import requests
response = requests.get('https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=SplyAct1d&assets=eth&pretty=true&api_key=<your_key>').json()
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
        metrics="SplyAct1d", 
        assets="eth",
    ).to_dataframe()
)
```
{% endtab %}
{% endtabs %}
