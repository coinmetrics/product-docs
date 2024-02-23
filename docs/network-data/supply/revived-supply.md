# Revived Supply

## Contents

* [Supply Revived in Last X Days/Years](revived-supply.md#splyrvv)

## Supply Revived in Last X Days/Years <a href="#splyrvv" id="splyrvv"></a>

### Defintion

The sum of all native units balances last active X days/years that became active in this interval.

| Name                            | MetricID    | Unit         | Interval |
| ------------------------------- | ----------- | ------------ | -------- |
| Supply Revived in Last 7 Days   | SplyRvv7d   | Native units | 7 days   |
| Supply Revived in Last 30 Days  | SplyRvv30d  | Native units | 30 days  |
| Supply Revived in Last 90 Days  | SplyRvv90d  | Native units | 90 days  |
| Supply Revived in Last 180 Days | SplyRvv180d | Native units | 180 days |
| Supply Revived in Last 1 Year   | SplyRvv1Yr  | Native units | 1 Year   |
| Supply Revived in Last 2 Years  | SplyRvv2Yr  | Native units | 2 Years  |
| Supply Revived in Last 3 Years  | SplyRvv3Yr  | Native units | 3 Years  |
| Supply Revived in Last 4 Years  | SplyRvv4Yr  | Native units | 4 Years  |
| Supply Revived in Last 5 Years  | SplyRvv5Yr  | Native units | 5 Years  |

### Details

* For UTXO chains, revived supply is considered as the outputs created before the considered time interval and spent at the time of the metric's computation. For example, if an address has one output created inside the time interval, and one output created outside of the time interval, only the latter will be considered revived.
* For account based chains, revived supply is the sum of the balances of accounts that were either created before the considered time interval and that had no activity afterwards, or that had no outgoing native units movement during that period. Any type of movement is sufficient to mark an account as active (fees, transfers, etc.).

### Asset-Specific Details

* This metric is not available for assets that have full privacy, like Monero and Grin.
* For assets that have opt-in privacy features, like ZCash, we only take the non-private balances into account.

### Interpretation

Revived supply gives a more granular look into supply activity. Revived supply is calculated by summing up the amount of supply that has become active after being inactive for at least X days(or years). For example, “Supply Revived in Last 7 Days” is the amount of supply reactivated (on a daily basis) after remaining dormant for at least 7 days.

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/SplyRvv7d" %}

## API Endpoints

Revived Supply metrics can be accessed using these endpoints:

* `timeseries/asset-metrics`

and by passing in the metric ID's `SplyRvv*` in the `metrics` parameter.

{% swagger src="../../.gitbook/assets/openapi.yaml" path="/timeseries/asset-metrics" method="get" %}
[openapi.yaml](../../.gitbook/assets/openapi.yaml)
{% endswagger %}

{% tabs %}
{% tab title="Shell" %}
```shell
curl --compressed "https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=SplyRvv&assets=btc&pretty=true&api_key=<your_key>"
```
{% endtab %}

{% tab title="Python" %}
```python
import requests
response = requests.get('https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=SplyRvv&assets=btc&pretty=true&api_key=<your_key>').json()
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
        metrics="SplyRvv", 
        assets="btc",
    ).to_dataframe()
)
```
{% endtab %}
{% endtabs %}
