# Contents

* [Count of Double Attestation Slashing Events](slashing-metrics.md#slashattdblevcnt)
* [Count of Attester Slashing Events](slashing-metrics.md#slashattevcnt)
* [Count of Surrounding Attestation Slashing Events](slashing-metrics.md#slashattsurrevcnt)
* [Proposer Slashing Events](slashing-metrics.md#slashpropevcnt)
* [Total Slashing Events](slashing-metrics.md#slashevcnt)
* [Slashed Amounts](slashing-metrics.md#slashedntv)

# <Subcategory><a href="#<metricId>" id="<metricId>"></a>
# Count of Double Attestation Slashing Events<a href="#slashattdblevcnt" id="slashattdblevcnt"></a>

## Definition

Count of attester slashing events cause by double attestations

| Count of Double Attestation Slashing Events | SlashAttDblEvCnt | Staking | Consensus Health | Sum | N/A | 1 minute |
| ------------------------------------------- | ---------------- | ------- | ---------------- | --- | --- | -------- |

## Details

* Count of the total double attesting slashing events enforced by the protocol in the last 1 minute

## Release History

* Released November 2023.

## Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/SlashAttDblEvCnt" %}

# Count of Attester Slashing Events<a href="#slashattevcnt" id="slashattevcnt"></a>

## Definition

Count of attester slashing events.

| Count Attester Slashing Events | SlashAttEvCnt | Staking | Consensus Health | Sum | N/A | 1 minute |
| ------------------------------ | ------------- | ------- | ---------------- | --- | --- | -------- |

## Details

* Count of the total attester slashing events enforced by the protocol in the last 1 minute

## Release History

* Released November 2023.

## Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/SlashAttEvCnt" %}


# Count of Surrounding Attestation Slashing Events<a href="#slashattsurrevcnt" id="slashattsurrevcnt"></a>

## Definition

Count of attester slashing events.

| Count of Surrounding Attestation Slashing Events | SlashAttSurrEvCnt | Staking | Consensus Health | Sum | N/A | 1 minute |
| ------------------------------------------------ | ----------------- | ------- | ---------------- | --- | --- | -------- |

## Details

* Count of the total Surrounding Attestation Slashing events enforced by the protocol in the last 1 minute

## Release History

* Released November 2023.

## Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/SlashAttSurrEvCnt" %}

# Proposer Slashing Events<a href="#slashpropevcnt" id="slashpropevcnt"></a>

## Definition

Count of total number of slashing events.

| Proposer Slashing Events | SlashPropEvCnt | Staking | Consensus Health | Sum | N/A | 1 minute |
| ------------------------ | -------------- | ------- | ---------------- | --- | --- | -------- |

## Details

* Count of the total number of proposer slashing events enforced by the protocol in the last 1 minute

## Release History

* Released November 2023.

## Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/SlashPropEvCnt" %}


## Definition

Count of attester slashing events.

| Count of Surrounding Attestation Slashing Events | SlashAttSurrEvCnt | Staking | Consensus Health | Sum | N/A | 1 minute |
| ------------------------------------------------ | ----------------- | ------- | ---------------- | --- | --- | -------- |

## Details

* Count of the total Surrounding Attestation Slashing events enforced by the protocol in the last 1 minute

## Release History

* Released November 2023.

## Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/SlashAttSurrEvCnt" %}



# Total Slashing Events<a href="#slashevcnt" id="slashevcnt"></a>

## Definition

Count of total number of slashing events.

| Total Slashing Events | SlashEvCnt | Staking | Consensus Health | Sum | N/A | 1 minute |
| --------------------- | ---------- | ------- | ---------------- | --- | --- | -------- |

## Details

* Count of the total number of slashing events, including attester and proposer slashing events enforced by the protocol in the last 1 minute

## Release History

* Released November 2023.

## Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/SlashEvCnt" %}


# Slashed Amounts<a href="#slashedntv" id="slashedntv"></a>

## Definition

Total amout of penalties enforced by the protocol in native units.

| Slashed Amounts | SlashedNTV | Staking | Consensus Health | Sum | Native Units | 1 day |
| --------------- | ---------- | ------- | ---------------- | --- | ------------ | ----- |

## Details

* This metric operates on a 1 day frequency.

## Release History

* Released November 2023.

## Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/SlashedNTV" %}

# API Endpoints

<Subcategory> metrics can be accessed using these endpoints:

* `timeseries/asset-metrics`

and by passing in the metric ID's `<metricId>*` in the `metrics` parameter.

{% swagger src="../../.gitbook/assets/openapi.yaml" path="/timeseries/asset-metrics" method="get" %}
[openapi.yaml](../../.gitbook/assets/openapi.yaml)
{% endswagger %}

{% tabs %}
{% tab title="Shell" %}
```shell
curl --compressed "https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=<metricId>&assets=btc&pretty=true&api_key=<your_key>"
```
{% endtab %}

{% tab title="Python" %}
```python
import requests
response = requests.get('https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=<metricId>&assets=btc&pretty=true&api_key=<your_key>').json()
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
        metrics="<metricId>", 
        assets="btc",
    ).to_dataframe()
)
```
{% endtab %}
{% endtabs %}
