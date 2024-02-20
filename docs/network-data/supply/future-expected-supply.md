# Contents

* [10 Year Expected Supply, Adj (native units)](future-expected-supply.md#splyexpfutcmbi)
* [Expected Future Supply](future-expected-supply.md#splyexpfut)

# 10 Year Expected Supply, Adj (native units) <a href="#splyexpfutcmbi" id="splyexpfutcmbi"></a>

## Definition

This metric is an improved version of the legacy SplyExpFut10yr metric as it is better suited for use-cases that require a high degree of standardization, such as multi-asset indexes. As part of the v4.7 release, Coin Metrics has taken additional steps to harmonize the treatment of expected future supply across different token models. We have implemented these improvements in a this new metric; SplyExpFut10yrCMBI.

| Name                                        | MetricID           | Category | Subcategory     | Type | Unit         | Interval |
| ------------------------------------------- | ------------------ | -------- | --------------- | ---- | ------------ | -------- |
| 10 Year Expected Supply, Adj (native units) | SplyExpFut10yrCMBI | Supply   | Future Expected | Sum  | Native units | 10 years |

## Details

* Expected future supply is computed by extrapolating the behavior of the currently active monetary policy.
* The CMBI version of this metric takes extra steps to guarantee heuristics are uniformly applied to various cryptoassets.
* Only implemented and programmatically defined supply inflation levels are considered. Any proposed or speculative inflation changes are not included until they are implemented in the source code as historically delays and governance processes have hindered such changes in a protocol’s monetary policy. Even if future changes in monetary policy are announced, they are only taken into account once they are enforced by the protocol.
* Unless lost, burned, or vested on-chain beyond 10 years, all current on-chain supply will be deemed liquid supply in 10 years time. Coin Metrics has taken this approach to account for the unpredictability associated with determining what holders of restricted supply will do over the next 10 years. e assets, estimating this number relies on too many assumptions (staking ratio, etc..), in which case it is not computed.

## Release History

* Released in the 4.7 release of NDP

## Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/SplyExpFut10yrCMBI" %}

# 10 Year Expected Supply (native units)<a href="#splyexpfut" id="splyexpfut"></a>

## Definition

The sum of all native units counting current supply and including all those expected to be issued over the next 10 years from that day if the current known continuous issuance schedule is followed. Future expected hard-forks that will change the continuous issuance are not considered until the day they are activated/enforced.

| Name                                   | MetricID       | Category | Subcategory      | Type | Unit         | Interval |
| -------------------------------------- | -------------- | -------- | ---------------- | ---- | ------------ | -------- |
| 10 Year Expected Supply (native units) | SplyExpFut10yr | Supply   | Future Expected  | Sum  | Native units | 10 years |
| 10 Year Expected Supply (native units) | SplyExpFut10yr | Supply   | Future Expected  | Sum  | Native units | 10 years |


## Details

* Expected future supply is computed by extrapolating the behavior of the currently active monetary policy.
* Even if future changes in monetary policy are announced, they are only taken into account once they are enforced by the protocol.
* For some assets, estimating this number relies on too many assumptions (staking ratio, etc.), in which case it is not computed.

## Release History

* Released in the 1.0 release of NDP

## Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/SplyExpFut10yr" %}

# API Endpoints

Expected Future Supply metrics can be accessed using these endpoints:

* `timeseries/asset-metrics`

and by passing in the metric ID's `SplyExpFut*` in the `metrics` parameter.

{% swagger src="../../.gitbook/assets/openapi.yaml" path="/timeseries/asset-metrics" method="get" %}
[openapi.yaml](../../.gitbook/assets/openapi.yaml)
{% endswagger %}

{% tabs %}
{% tab title="Shell" %}
```shell
curl --compressed "https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=SplyExpFut10yrCMBI&assets=eth&pretty=true&api_key=<your_key>"
```
{% endtab %}

{% tab title="Python" %}
```python
import requests
response = requests.get('https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=SplyExpFut10yrCMBI&assets=eth&pretty=true&api_key=<your_key>').json()
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
        metrics="SplyExpFut10yrCMBI", 
        assets="eth",
    ).to_dataframe()
)
```
{% endtab %}
{% endtabs %}
