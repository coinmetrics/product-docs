# Stakers

## Contents

* [Count of Senders to CL Contract](validators.md#sendercntclcont)
* [Total Unique Senders to CL Contract](validators.md#validatoractextcnt)
* [Active Exiting Validators](validators.md#validatoractextcnt)
* [Active Validators](validators.md#validatoractongcnt)
* [Slashed Validators](validators.md#validatoractslhcnt)
* [Stakers Count](validators.md#validatorcnt)
* [Daily Added Stakers ](validators.md#validatoraddcnt1d)
* [Daily Removed Stakers](validators.md#validatorremcnt1d)
* [Inactive Ineligible Validators](validators.md#validatorextslhcnt)
* [Inactive Eligible Validators](validators.md#validatorextunslhcnt)
* [Validators Pending Eligibility](validators.md#validatorpndinitcnt)
* [Validator in Activation Queue](validators.md#validatorpndqedcnt)
* [Full Participation Issuance](validators.md#validatorpndqedcnt-1)

## Count of Senders to CL Contract <a href="#sendercntclcont" id="sendercntclcont"></a>

### Definition

Count of new addresses that have sent to the Consensus Layer (CL) contract.

| Name                            | MetricID        | Unit       | Interval |
| ------------------------------- | --------------- | ---------- | -------- |
| Count of Senders to CL Contract | SenderCntCLCont | Validators | 1 day    |

### Details

* Unique count of new addresses that have sent to the Consensus Layer (CL) smart contract (0x00000000219ab540356cBB839Cbe05303d7705Fa) over the daily interval, sourced from Coin Metrics ATLAS™ blockchain search engine.

### Release History

* Released September 2022.

### Availability for Assets

* N/A
*

## Total Unique Senders to CL Contract <a href="#sendertotclcont" id="sendertotclcont"></a>

### Definition

Unique count of all senders to the Consensus Layer (CL) contract.

<table><thead><tr><th>Name</th><th width="164">MetricID</th><th>Unit</th><th>Interval</th></tr></thead><tbody><tr><td>Total Unique Senders to CL Contract</td><td>SenderTotCLCont</td><td>Validators</td><td>1 day</td></tr></tbody></table>

### Details

* Unique count of all senders to the Consensus Layer (CL) smart contract (0x00000000219ab540356cBB839Cbe05303d7705Fa) over the daily interval, sourced from Coin Metrics ATLAS™ blockchain search engine.

### Release History

* Released September 2022.

### Availability for Assets

* N/A

## Active Exiting Validators <a href="#validatoractextcnt" id="validatoractextcnt"></a>

### Definition

Validators who have filed a voluntary request to exit.

| Name                      | MetricID           | Unit       | Interval      |
| ------------------------- | ------------------ | ---------- | ------------- |
| Active Exiting Validators | ValidatorActExtCnt | Validators | 1 day, 1 hour |

### Details

* Count of active ETH Consensus Layer (CL) validators that have filed a voluntary request to exit.

### Release History

* Released September 2022.

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/ValidatorActExtCnt" %}

## Active Validators <a href="#validatoractongcnt" id="validatoractongcnt"></a>

### Definition

Validators that are actively participating.

| Name              | MetricID           | Unit       | Interval      |
| ----------------- | ------------------ | ---------- | ------------- |
| Active Validators | ValidatorActOngCnt | Validators | 1 day, 1 hour |

### Details

* Count of ETH Consensus Layer (CL) validators that have completed the activation queue.

### Release History

* Released September 2022.

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/ValidatorActOngCnt" %}

## Slashed Validators <a href="#validatoractslhcnt" id="validatoractslhcnt"></a>

### Definition

Slashed validators scheduled to exit.

| Name               | MetricID           | Unit       | Interval      |
| ------------------ | ------------------ | ---------- | ------------- |
| Slashed Validators | ValidatorActSlhCnt | Validators | 1 day, 1 hour |

### Details

* Count of ETH Consensus Layer (CL) validators that have been slashed and are scheduled to exit.

### Release History

* Released September 2022.

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/ValidatorActSlhCnt" %}

## Stakers Count <a href="#validatorcnt" id="validatorcnt"></a>

### Definition

Count of all validators.

| Name            | MetricID     | Unit       | Interval      |
| --------------- | ------------ | ---------- | ------------- |
| Validator Count | ValidatorCnt | Validators | 1 day, 1 hour |
| Delegator Count | DelegatorCnt | Delegators | 1 day         |
| Staker Count    | StakerCnt    | Stakers    | 1 day         |

### Details

* Number of validators on the Ethereum Consensus Layer (CL).
* Delegator count available for networks that support delegated PoS (e.g.: Solana)
* A validator who has directly staked native assets to participate in network consensus. A delegator has delegated their native asset to a validator in order to participate in network consensus.
* A staker is an account that has staked native assets to participate in network consensus. Stakers include both Delegators as well as Validators.

### Release History

* Released September 2022.

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/ValidatorCnt" %}
ValidatorCnt
{% endembed %}

{% embed url="https://coverage.coinmetrics.io/asset-metrics/DelegatorCnt" %}
DelegatorCnt
{% endembed %}

{% embed url="https://coverage.coinmetrics.io/asset-metrics/StakerCnt" %}
StakerCnt
{% endembed %}

## Daily Added Stakers <a href="#validatoraddcnt1d" id="validatoraddcnt1d"></a>

### Definition

Count of validators added daily.

| Name                   | MetricID          | Unit       | Interval      |
| ---------------------- | ----------------- | ---------- | ------------- |
| Daily Added Validators | ValidatorAddCnt1d | Validators | 1 day, 1 hour |
| Daily Added Delegators | DelegatorAddCnt1d | Delegators | 1 day         |
| Daily Added Stakers    | StakerAddCnt1d    | Stakers    | 1 day         |

### Details

* Number of validators added to the Ethereum Consensus Layer (CL) on a daily interval.
* Delegator metrics available for networks that support delegated PoS (e.g.: Solana)
* A validator who has directly staked native assets to participate in network consensus. A delegator has delegated their native asset to a validator in order to participate in network consensus.
* A staker is an account that has staked native assets to participate in network consensus. Stakers include both Delegators as well as Validators.

### Release History

* Released September 2022.

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/ValidatorAddCnt1d" %}
ValidatorAddCnt1d
{% endembed %}

{% embed url="https://coverage.coinmetrics.io/asset-metrics/DelegatorAddCnt1d" %}
DelegatorAddCnt1d
{% endembed %}

{% embed url="https://coverage.coinmetrics.io/asset-metrics/StakerAddCnt1d" %}
StakerAddCnt1d
{% endembed %}

## Daily Removed Stakers <a href="#validatorremcnt1d" id="validatorremcnt1d"></a>

### Definition

Count of validators removed daily.

| Name                     | MetricID          | Unit       | Interval      |
| ------------------------ | ----------------- | ---------- | ------------- |
| Daily Removed Validators | ValidatorRemCnt1d | Validators | 1 day, 1 hour |
| Daily Removed Delegators | DelegatorRemCnt1d | Delegators | 1 day         |
| Daily Removed Stakers    | StakerRemCnt1d    | Stakers    | 1 day         |

### Details

* For Ethereum:
  * Number of validators removed from the Ethereum Consensus Layer (CL) on a daily interval.
  * This figure will remain low until withdrawals are enabled, capturing mostly slashing.
  * Captures number of validators with 'exited' status and 'exited slashed' status.
* Delegator metrics available for networks that support delegated PoS (e.g.: Solana)
* A validator who has directly staked native assets to participate in network consensus. A delegator has delegated their native asset to a validator in order to participate in network consensus.
* A staker is an account that has staked native assets to participate in network consensus. Stakers include both Delegators as well as Validators.

### Release History

* Released September 2022.

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/ValidatorRemCnt1d" %}
ValidatorRemCnt1d
{% endembed %}

{% embed url="https://coverage.coinmetrics.io/asset-metrics/DelegatorRemCnt1d" %}
DelegatorRemCnt1d
{% endembed %}

{% embed url="https://coverage.coinmetrics.io/asset-metrics/StakerRemCnt1d" %}
StakerRemCnt1d
{% endembed %}

## Inactive Ineligible Validators <a href="#validatorextslhcnt" id="validatorextslhcnt"></a>

### Definition

Validators that have been slashed and are no longer active.

| Name                           | MetricID           | Unit       | Interval      |
| ------------------------------ | ------------------ | ---------- | ------------- |
| Inactive Ineligible Validators | ValidatorExtSlhCnt | Validators | 1 day, 1 hour |

### Details

* Count of ETH Consensus Layer (CL) validators that have been slashed and are no longer active.

### Release History

* Released September 2022.

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/ValidatorExtSlhCnt" %}

## Inactive Eligible Validators <a href="#validatorextunslhcnt" id="validatorextunslhcnt"></a>

### Definition

Validators that have not been slashed but are no longer active.

| Name                         | MetricID             | Unit       | Interval      |
| ---------------------------- | -------------------- | ---------- | ------------- |
| Inactive Eligible Validators | ValidatorExtUnslhCnt | Validators | 1 day, 1 hour |

### Details

* Count of ETH Consensus Layer (CL) validators that have not been slashed but are no longer active.

### Release History

* Released September 2022.

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/ValidatorExtUnslhCnt" %}

## Validators Pending Eligibility <a href="#validatorpndinitcnt" id="validatorpndinitcnt"></a>

### Definition

Validators pending eligibility.

| Name                           | MetricID            | Unit       | Interval      |
| ------------------------------ | ------------------- | ---------- | ------------- |
| Validators Pending Eligibility | ValidatorPndInitCnt | Validators | 1 day, 1 hour |

### Details

* Count of ETH Consensus Layer (CL) validators with ineligible status that are in the activation queue.

### Release History

* Released September 2022.

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/ValidatorPndInitCnt" %}

## Validator in Activation Queue <a href="#validatorpndqedcnt" id="validatorpndqedcnt"></a>

### Definition

Validators waiting in the activation queue

| Name                           | MetricID           | Unit       | Interval      |
| ------------------------------ | ------------------ | ---------- | ------------- |
| Validators in Activation Queue | ValidatorPndQedCnt | Validators | 1 day, 1 hour |

### Details

* Count of ETH Consensus Layer (CL) validators that are waiting in the activation queue.

### Release History

* Released September 2022.

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/ValidatorPndQedCnt" %}

## Full Participation Issuance <a href="#validatorpndqedcnt" id="validatorpndqedcnt"></a>

### Definition

Maximum daily protocol issuance on the Ethereum consensus layer (beacon chain) as a function of the number of active validators.

| Name                        | MetricID             | Unit         | Interval      |
| --------------------------- | -------------------- | ------------ | ------------- |
| Full Participation Issuance | IssFullParticipation | Native Units | 1 day, 1 hour |

### Release History

* Initially released November 2023.

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/IssFullParticipation" %}

## API Endpoints

Validator metrics can be accessed using these endpoints:

* `timeseries/asset-metrics`

and by passing in the metric ID's `Validator*` in the `metrics` parameter.

{% swagger src="../../../.gitbook/assets/openapi.yaml" path="/timeseries/asset-metrics" method="get" %}
[openapi.yaml](../../../.gitbook/assets/openapi.yaml)
{% endswagger %}

{% tabs %}
{% tab title="Shell" %}
```shell
curl --compressed "https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=ValidatorActExtCnt&assets=eth&pretty=true&api_key=<your_key>"
```
{% endtab %}

{% tab title="Python" %}
```python
import requests
response = requests.get('https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=ValidatorActExtCnt&assets=eth&pretty=true&api_key=<your_key>').json()
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
        metrics="ValidatorActExtCnt", 
        assets="eth",
    ).to_dataframe()
)
```
{% endtab %}
{% endtabs %}
