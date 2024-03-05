# Contracts

## Contents

* [Contracts Cnt with Bal > 0](contracts.md#contbalcnt)
* [Contracts Cnt](contracts.md#contcnt)
* [ERC-20 Contracts Cnt](contracts.md#conterc20cnt)
* [ERC-721 Contracts Cnt](contracts.md#conterc721cnt)
* [ERC-1155 Contracts Cnt](contracts.md#conterc1155cnt)

## Contracts Cnt with Bal > 0 <a href="#contbalcnt" id="contbalcnt"></a>

### Definition

The sum count of unique contracts that exist in the ledger and that hold a balance (i.e., own a non-zero amount) of native units at the end of the interval. A contract is a special address that contains and can execute code.

| Name                      | MetricID   | Unit      | Interval |
| ------------------------- | ---------- | --------- | -------- |
| Contracts Cnt with Bal >0 | ContBalCnt | Contracts | 1 day    |

### Details

* Contracts with no balance in native units are not counted.

### Asset-Specific Details

* This metric is only available for ETH and ETC.

### Release History

* Version 4.2 of CM Network Data Pro Daily Macro (End of Day)

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/ContBalCnt" %}

## Contracts Cnt <a href="#contcnt" id="contcnt"></a>

### Definition

The sum count of unique contracts that exist in the ledger at the end of the interval. A contract is a special address that contains and can execute code.

| Name          | MetricID | Unit      | Interval |
| ------------- | -------- | --------- | -------- |
| Contracts Cnt | ContCnt  | Contracts | 1 day    |

### Details

* Contracts with no balance in native units are counted.

### Asset-Specific Details

* This metric is only available for ETH and ETC.

### Release History

* Version 4.2 of CM Network Data Pro Daily Macro (End of Day)

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/ContCnt" %}

## ERC-20 Contracts Cnt <a href="#conterc20cnt" id="conterc20cnt"></a>

### Definition

The sum count of unique ERC-20 contracts that exist on the ledger at the end of the interval. A contract is a special address that contains and can execute code. Contracts that contain all of the following are considered to be ERC-20 contracts: the balanceOf function, the transfer function, and the Transfer event hash.

| Name                 | MetricID     | Unit      | Interval |
| -------------------- | ------------ | --------- | -------- |
| ERC-20 Contracts Cnt | ContERC20Cnt | Contracts | 1 day    |

### Details

* Contracts with no balance in native units are counted.
* Full compliance with the ERC-20 standard is not required as only few ERC-20 tokens attain it. We therefore look for the bare minimum methods and events necessary for wallet integration of the token: balanceOf and transfer functions as well as the Transfer event. If a contract’s code has all of the following markers, it is considered to be ERC-20:
*
  * Signature of the balanceOf function: 6370a082311461
  * Signature of the transfer function: 63a9059cbb1461
  * Hash of the transfer event ddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef

### Asset-Specific Details

* This metric is only available for ETH and ETC.

### Release History

* Version 4.3 of CM Network Data Pro Daily Macro (End of Day)

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/ContERC20Cnt" %}

### Definition

The sum count of unique contracts that exist in the ledger at the end of the interval. A contract is a special address that contains and can execute code.

| Name          | MetricID | Unit      | Interval |
| ------------- | -------- | --------- | -------- |
| Contracts Cnt | ContCnt  | Contracts | 1 day    |

### Details

* Contracts with no balance in native units are counted.

### Asset-Specific Details

* This metric is only available for ETH and ETC.

### Release History

* Version 4.2 of CM Network Data Pro Daily Macro (End of Day)

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/ContCnt" %}

## ERC-721 Contracts Cnt <a href="#conterc721cnt" id="conterc721cnt"></a>

### Definition

The sum count of unique contracts implementing the ERC-721 standard that exist in the ledger at the end of the interval. A contract is a special address that contains and can execute code. ERC-165 is used to determine a contract’s compliance with ERC-721.

| Name                  | MetricID      | Unit      | Interval |
| --------------------- | ------------- | --------- | -------- |
| ERC-721 Contracts Cnt | ContERC721Cnt | Contracts | 1 day    |

### Details

* Contracts with no balance in native units are counted.
* ERC-721 contracts are detected if they implement the ERC-165-compatible interface defined in the ERC-721 specification using the procedure specified in the[ ERC-165 specification.](https://eips.ethereum.org/EIPS/eip-165)

### Asset-Specific Details

* This metric is only available for ETH and ETC.

### Release History

* Version 4.3 of CM Network Data Pro Daily Macro (End of Day)

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/ContERC721Cnt" %}

## ERC-1155 Contracts Cnt <a href="#conterc1155cnt" id="conterc1155cnt"></a>

### Definition

The sum count of unique smart contracts implementing the ERC-1155 standard present in the blockchain at the end of the interval. A smart contract exists in a blockchain network as a special address that contains and can execute code. The ERC-1155 standard is an emerging standard for the issuance of both fungible and non-fungible tokens on Ethereum. As of this metric's release date, the standard has attained considerable traction in the ecosystem of Non-Fungible Tokens.

| Name                   | MetricID       | Unit      | Interval |
| ---------------------- | -------------- | --------- | -------- |
| ERC-1155 Contracts Cnt | ContERC1155Cnt | Contracts | 1 day    |

### Details

* This metric is calculated by monitoring the blockchain for contracts that comply with the ERC-1155 standard\_,\_ as defined by the [EIP-1155 Standard Specification](https://eips.ethereum.org/EIPS/eip-1155).
* Like ERC-721 contracts, the activity of ERC-1155s is detected with the help of a secondary standard, ERC-165, which provides an interface for both 751 as well as 1155-compliant events.

### Asset-Specific Details

* As this metric is tailored to the Ethereum ecosystem, it is only available for ETH .

### Release History

* Released in Network Data Pro (NDP) version 5.1

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/ContERC1155Cnt" %}

## API Endpoints

Contracts metrics can be accessed using these endpoints:

* `timeseries/asset-metrics`

and by passing in the metric ID's `Cont*` in the `metrics` parameter.

{% swagger src="../../.gitbook/assets/openapi.yaml" path="/timeseries/asset-metrics" method="get" %}
[openapi.yaml](../../.gitbook/assets/openapi.yaml)
{% endswagger %}

{% tabs %}
{% tab title="Shell" %}
```shell
curl --compressed "https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=ContBalCnt&assets=eth&pretty=true&api_key=<your_key>"
```
{% endtab %}

{% tab title="Python" %}
```python
import requests
response = requests.get('https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=ContBalCnt&assets=eth&pretty=true&api_key=<your_key>').json()
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
        metrics="ContBalCnt", 
        assets="eth",
    ).to_dataframe()
)
```
{% endtab %}
{% endtabs %}
