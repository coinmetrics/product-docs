# Contents

* [Attestation Count](consensus-health.md#attestcnt)
* [Attestations in Epoch](consensus-health.md#attestepochcnt)
* [Count of Validators with Attestation in Epoch](consensus-health.md#attestepochvalcnt)
* [Count of Validators with Attestation](consensus-health.md#attestvalcnt)
* [Count of Validators with Late Attestation](consensus-health.md#attestvallatecnt)
* [Current Epoch](consensus-health.md#epochcurr)
* [Latest Finalized Epoch](consensus-health.md#epochfinal)
* [Latest Justified Epoch](consensus-health.md#epochjust)

# Attestation Count<a href="#AttestCnt" id="AttestCnt"></a>

## Definition

Count of Attestations in a 1 minute interval. One attestation can aggregate multiple validators votes.

| Attestation Count | AttestCnt | Staking | Consensus Health | Sum | Attestations | 1 minute |
| ----------------- | --------- | ------- | ---------------- | --- | ------------ | -------- |

## Details

* Count of all attestations in the last 1 minute interval.

## Release History

* Released November 2023.

## Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/AttestCnt" %}

# Attestations in Epoch<a href="#attestepochcnt" id="attestepochcnt"></a>

## Definition

Count of Attestations in a 1 minute interval within the current Epoch. One attestation can aggregate multiple validators votes.&#x20;

| Attestations in Epoch Count | AttestEpochCnt | Staking | Consensus Health | Sum | Attestations | 1 minute |
| --------------------------- | -------------- | ------- | ---------------- | --- | ------------ | -------- |

## Details

* Count of all attestations in the last 1 minute interval in the current Epoch.
* If the current 1 minute window spans an Epoch boundary only attestations in the current Epoch are counted.

## Release History

* Released November 2023.

## Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/AttestEpochCnt" %}

# Count of Validators with Attestation in Epoch<a href="#attestepochvalcnt" id="attestepochvalcnt"></a>

## Definition

Count of Validators who attested in a 1 minute interval within the current Epoch.&#x20;

| Count of Validators with Attestation in Epoch | AttestEpochValCnt | Staking | Consensus Health | Sum | Validators | 1 minute |
| --------------------------------------------- | ----------------- | ------- | ---------------- | --- | ---------- | -------- |

## Details

* Count of all validators who attested in the last 1 minute interval in the current Epoch.
* If the current 1 minute window spans an Epoch boundary only validators attesting in the current Epoch are counted.

## Release History

* Released November 2023.

## Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/AttestEpochValCnt" %}

# Count of Validators with Attestation<a href="#attestvalcnt" id="attestvalcnt"></a>

## Definition

Count of Validators who attested in a 1 minute interval.

| Count of Validators with Attestation | AttestValCnt | Staking | Consensus Health | Sum | Validators | 1 minute |
| ------------------------------------ | ------------ | ------- | ---------------- | --- | ---------- | -------- |

## Details

* Count of all validators who attested in the last 1 minute interval.

## Release History

* Released November 2023.

## Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/AttestValCnt" %}

# Count of Validators with Late Attestation<a href="#attestvallatecnt" id="attestvallatecnt"></a>

## Definition

Count of Validators who attested late in a 1 minute interval.

| Count of Validators with Late Attestation | AttestValLateCnt | Staking | Consensus Health | Sum | Validators | 1 minute |
| ----------------------------------------- | ---------------- | ------- | ---------------- | --- | ---------- | -------- |

## Details

* Count of all validators who attested late in the last 1 minute interval.
* A late attestation is one whose slot is not the previous slot

## Release History

* Released November 2023.

## Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/AttestValLateCnt" %}

# Current Epoch<a href="#epochcurr" id="epochcurr"></a>

## Definition

Number of the current Epoch

| Current Epoch | EpochCurr | Staking | Consensus Health | N/A | Epoch | 1 minute |
| ------------- | --------- | ------- | ---------------- | --- | ----- | -------- |

## Details

* Returns the number of the current Epoch, updated on a 1 minute interval

## Release History

* Released November 2023.

## Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/EpochCurr" %}

# Latest Finalized Epoch<a href="epochfinal" id="epochfinal"></a>

## Definition

Number of the latest finalized Epoch

| Latest Finalized Epoch | EpochFinal | Staking | Consensus Health | N/A | Epoch | 1 minute |
| ---------------------- | ---------- | ------- | ---------------- | --- | ----- | -------- |

## Details

* Returns the number of the latest Finalized Epoch, updated on a 1 minute interval.
* Finalization rules follow those of the underlying protocol.

## Release History

* Released November 2023.

## Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/EpochFinal" %}

# Latest Justified Epoch<a href="#epochjust" id="epochjust"></a>

## Definition

Number of the latest justified Epoch

| Latest Justified Epoch | EpochJust | Staking | Consensus Health | N/A | Epoch | 1 minute |
| ---------------------- | --------- | ------- | ---------------- | --- | ----- | -------- |

## Details

* Returns the number of the latest Justified Epoch, updated on a 1 minute interval.
* Rules for considering an Epoch Justified follow those of the underlying protocol.

## Release History

* Released November 2023.

## Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/EpochJust" %}

# API Endpoints

Consensus Health metrics can be accessed using these endpoints:

* `timeseries/asset-metrics`

and by passing in the metric ID's above (`Attest*`, `Epoch*` , etc) in the `metrics` parameter.

{% swagger src="../../.gitbook/assets/openapi.yaml" path="/timeseries/asset-metrics" method="get" %}
[openapi.yaml](../../.gitbook/assets/openapi.yaml)
{% endswagger %}

{% tabs %}
{% tab title="Shell" %}
```shell
curl --compressed "https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=AttestCnt&assets=eth&pretty=true&api_key=<your_key>"
```
{% endtab %}

{% tab title="Python" %}
```python
import requests
response = requests.get('https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=AttestCnt&assets=eth&pretty=true&api_key=<your_key>').json()
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
        metrics="AttestCnt", 
        assets="eth",
    ).to_dataframe()
)
```
{% endtab %}
{% endtabs %}
