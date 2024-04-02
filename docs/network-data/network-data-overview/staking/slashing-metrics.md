# Slashing Metrics

## Contents

* [Count of Double Attestation Slashing Events](slashing-metrics.md#slashattdblevcnt)
* [Count of Attester Slashing Events](slashing-metrics.md#slashattevcnt)
* [Count of Surrounding Attestation Slashing Events](slashing-metrics.md#slashattsurrevcnt)
* [Proposer Slashing Events](slashing-metrics.md#slashpropevcnt)
* [Total Slashing Events](slashing-metrics.md#slashevcnt)
* [Slashed Amounts](slashing-metrics.md#slashedntv)

## Count of Double Attestation Slashing Events <a href="#slashattdblevcnt" id="slashattdblevcnt"></a>

### Definition

Count of attester slashing events cause by double attestations

| Name                                        | MetricID         | Unit | Interval |
| ------------------------------------------- | ---------------- | ---- | -------- |
| Count of Double Attestation Slashing Events | SlashAttDblEvCnt | N/A  | 1 minute |

### Details

* Count of the total double attesting slashing events enforced by the protocol in the last 1 minute

### Release History

* Released November 2023.

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/SlashAttDblEvCnt" %}

## Count of Attester Slashing Events <a href="#slashattevcnt" id="slashattevcnt"></a>

### Definition

Count of attester slashing events.

| Name                           | MetricID      | Unit | Interval |
| ------------------------------ | ------------- | ---- | -------- |
| Count Attester Slashing Events | SlashAttEvCnt | N/A  | 1 minute |

### Details

* Count of the total attester slashing events enforced by the protocol in the last 1 minute

### Release History

* Released November 2023.

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/SlashAttEvCnt" %}

## Count of Surrounding Attestation Slashing Events <a href="#slashattsurrevcnt" id="slashattsurrevcnt"></a>

### Definition

Count of attester slashing events.

| Name                                             | MetricID          | Unit | Interval |
| ------------------------------------------------ | ----------------- | ---- | -------- |
| Count of Surrounding Attestation Slashing Events | SlashAttSurrEvCnt | N/A  | 1 minute |

### Details

* Count of the total Surrounding Attestation Slashing events enforced by the protocol in the last 1 minute

### Release History

* Released November 2023.

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/SlashAttSurrEvCnt" %}

## Proposer Slashing Events <a href="#slashpropevcnt" id="slashpropevcnt"></a>

### Definition

Count of total number of slashing events.

| Name                     | MetricID       | Unit | Interval |
| ------------------------ | -------------- | ---- | -------- |
| Proposer Slashing Events | SlashPropEvCnt | N/A  | 1 minute |

### Details

* Count of the total number of proposer slashing events enforced by the protocol in the last 1 minute

### Release History

* Released November 2023.

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/SlashPropEvCnt" %}

### Definition

Count of attester slashing events.

| Name                                             | MetricID          | Unit | Interval |
| ------------------------------------------------ | ----------------- | ---- | -------- |
| Count of Surrounding Attestation Slashing Events | SlashAttSurrEvCnt | N/A  | 1 minute |

### Details

* Count of the total Surrounding Attestation Slashing events enforced by the protocol in the last 1 minute

### Release History

* Released November 2023.

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/SlashAttSurrEvCnt" %}

## Total Slashing Events <a href="#slashevcnt" id="slashevcnt"></a>

### Definition

Count of total number of slashing events.

\| Name | MetricID | Unit | Interval |

### Details

* Count of the total number of slashing events, including attester and proposer slashing events enforced by the protocol in the last 1 minute

### Release History

* Released November 2023.

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/SlashEvCnt" %}

## Slashed Amounts <a href="#slashedntv" id="slashedntv"></a>

### Definition

Total amout of penalties enforced by the protocol in native units.

\| Name | MetricID | Category | Subcategory | Type | Unit | Interval |

### Details

* This metric operates on a 1 day frequency.

### Release History

* Released November 2023.

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/SlashedNTV" %}

## API Endpoints

Slashing metrics can be accessed using these endpoints:

* `timeseries/asset-metrics`

and by passing in the metric ID's `Slash*` in the `metrics` parameter.

{% tabs %}
{% tab title="Shell" %}
```shell
curl --compressed "https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=SlashAttDblEvCnt&assets=eth&pretty=true&api_key=<your_key>"
```
{% endtab %}

{% tab title="Python" %}
```python
import requests
response = requests.get('https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=SlashAttDblEvCnt&assets=eth&pretty=true&api_key=<your_key>').json()
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
        metrics="SlashAttDblEvCnt", 
        assets="eth",
    ).to_dataframe()
)
```
{% endtab %}
{% endtabs %}
