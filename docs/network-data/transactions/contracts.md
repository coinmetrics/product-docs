# Contracts

## Contents

* [Contracts Executed Count](contracts.md#txcontcallcnt)
* [Contracts Executed Successfully Count](contracts.md#txcontcallsucccnt)
* [Transactions Invoking Contract Count](contracts.md#txcontcnt)
* [New Created Contracts Count](contracts.md#txcontcreatcnt)
* [Destroyed Contracts Count](contracts.md#txcontdestcnt)

## Contracts Executed Count <a href="#txcontcallcnt" id="txcontcallcnt"></a>

### Definition

The sum count of contract calls executed across all transactions in that interval. A contract call is the invocation of a contract’s code by another contract or non-contract address. Failed invocations are counted. A single transaction can result in multiple contract calls.

| Name                     | MetricID      | Unit  | Interval |
| ------------------------ | ------------- | ----- | -------- |
| Contracts Executed Count | TxContCallCnt | Calls | 1 day    |

### Details

* Failed transactions are included.
* Contract creations and destructions are not included.

### Asset-Specific Details

* This metric is only available for ETH and ETC.

### Release History

* Version 4.2 of CM Network Data Pro Daily Macro (End of Day)

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/TxContCallCnt" %}

## Contracts Executed Successfully Count <a href="#txcontcallsucccnt" id="txcontcallsucccnt"></a>

### Definition

The sum count of contract calls successfully executed across all transactions in that interval. A contract call is the invocation of a contract’s code by another contract or non-contract address. Only successful executions are taken into account.

| Name                                | MetricID          | Unit  | Interval |
| ----------------------------------- | ----------------- | ----- | -------- |
| Contracts Executed Successfully Cnt | TxContCallSuccCnt | Calls | 1 day    |

### Details

* Contract creations and destructions are not included.

### Asset-Specific Details

* This metric is only available for ETH and ETC.

### Release History

* Version 4.2 of CM Network Data Pro Daily Macro (End of Day)

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/TxContCallSuccCnt" %}

## Transactions Invoking Contract Count <a href="#txcontcnt" id="txcontcnt"></a>

### Definition

The sum count of transactions that invoked a contract in that interval. Failed transactions are counted but internal transactions are not (i.e., only the parent transaction is counted). A contract is a special address that contains and can execute code.

| Name                                | MetricID  | Unit         | Interval |
| ----------------------------------- | --------- | ------------ | -------- |
| Transaction Invoking Contract Count | TxContCnt | Transactions | 1 day    |

### Details

* Failed transactions are counted.
* Contract creations are counted.
* Internal transactions are not counted (i.e., only the parent transaction is counted).

### Asset-Specific Details

* This metric is only available for ETH and ETC.

### Release History

* Version 4.2 of CM Network Data Pro Daily Macro (End of Day)

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/TxContCnt" %}

## New Created Contracts Count <a href="#txcontcreatcnt" id="txcontcreatcnt"></a>

### Definition

The sum count of new contracts successfully created across all transactions in that interval. A contract is a special address that contains and can execute code.

### Dictionary

| Name                        | MetricID       | Unit      | Interval |
| --------------------------- | -------------- | --------- | -------- |
| New Created Contracts Count | TxContCreatCnt | Contracts | 1 day    |

### Details

* If a transaction creates multiple contracts, each creation is counted once.

### Asset-Specific Details

* This metric is only available for ETH and ETC.

### Release History

* Version 4.2 of CM Network Data Pro Daily Macro (End of Day)

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/TxContCreatCnt" %}

## Destroyed Contracts Count <a href="#txcontdestcnt" id="txcontdestcnt"></a>

### Defintion

The sum count of contracts successfully destroyed across all transactions in that interval. A contract is a special address that contains and can execute code.

| Name                      | MetricID      | Unit      | Interval |
| ------------------------- | ------------- | --------- | -------- |
| Destroyed Contracts Count | TxContDestCnt | Contracts | 1 day    |

### Details

* If a transaction destroys several contracts, each destruction is counted once.
* Not all contract protocols allow contract destruction.

### Asset-Specific Details

* This metric is only available for ETH and ETC.

### Release History

* Version 4.2 of CM Network Data Pro Daily Macro (End of Day)

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/TxContDestCnt" %}

## API Endpoints

Token Transaction metrics can be accessed using these endpoints:

* `timeseries/asset-metrics`

and by passing in the metric ID's `TxContCallCnt` , `TxContDestCnt` etc. in the `metrics` parameter.

{% swagger src="../../.gitbook/assets/openapi.yaml" path="/timeseries/asset-metrics" method="get" %}
[openapi.yaml](../../.gitbook/assets/openapi.yaml)
{% endswagger %}

{% tabs %}
{% tab title="Shell" %}
```shell
curl --compressed "https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=TxContCallCnt&assets=eth&pretty=true&api_key=<your_key>"
```
{% endtab %}

{% tab title="Python" %}
```python
import requests
response = requests.get('https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=TxContCallCnt&assets=eth&pretty=true&api_key=<your_key>').json()
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
        metrics="TxContCallCnt", 
        assets="eth",
    ).to_dataframe()
)
```
{% endtab %}
{% endtabs %}
