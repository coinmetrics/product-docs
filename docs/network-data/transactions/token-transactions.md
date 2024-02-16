# Contents
* [Token Transaction Count](#token)
* [ERC-20 Transaction Count](#erc20)
* [ERC-721 Transaction Count](#erc721)
* [ERC-1155 Transaction Count](#erc1155)

# Token Tx Cnt <a href="#token" id="token"></a>

## Definition

The sum count of transactions that resulted in any token (ERC-20 or ERC-721) activity in that interval. Only Transfer or Approval events are counted as activity. If a transaction results in more than 1 transfer or approval, it’s only counted once.

| Name         | MetricID | Category     | Subcategory  | Type | Unit         | Interval |
| ------------ | -------- | ------------ | ------------ | ---- | ------------ | -------- |
| Token Tx Cnt | TxTknCnt | Transactions | Transactions | Sum  | Transactions | 1 day    |

## Details

* This metric counts only the ERC-20 and ERC-721 specification Transfer and Approval events.

## Asset-Specific Details

* This metric is only available for ETH and ETC.

## Release History

* Version 4.2 of CM Network Data Pro Daily Macro (End of Day)

## Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/TxTknCnt" %}

# ERC-20 Tx Cnt <a href="#erc20" id="erc20"></a>

## Definition

The sum count of transactions that resulted in any ERC-20 activity in that interval. Contracts that contain all of the following are considered to be ERC-20 contracts: the balanceOf function, the transfer function, and the Transfer event hash. Only Transfer or Approval events are counted as activity. If a transaction results in more than 1 transfer or approval, it’s only counted once.

| Name          | MetricID   | Category     | Subcategory  | Type | Unit         | Interval |
| ------------- | ---------- | ------------ | ------------ | ---- | ------------ | -------- |
| ERC-20 Tx Cnt | TxERC20Cnt | Transactions | Transactions | Sum  | Transactions | 1 day    |

## Details

* This metric counts only the ERC-20 specification Transfer and Approval events emitted by contracts detected as ERC-20 following the criteria outlined in Contracts, ERC-20, count.
* Full compliance with the ERC-20 standard is not required as only few ERC-20 tokens attain it. We therefore look for the bare minimum methods and events necessary for wallet integration of the token: balanceOf and transfer functions as well as the Transfer event. If a contract’s code has all of the following markers, it is considered to be ERC-20:
  * Signature of the balanceOf function: 6370a082311461
  * Signature of the transfer function: 63a9059cbb1461
  * Hash of the transfer event ddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef

## Asset-Specific Details

* This metric is only available for ETH and ETC.

## Release History

* Version 4.3 of CM Network Data Pro Daily Macro (End of Day)

## Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/TxERC20Cnt" %}

# ERC-721 Tx Cnt <a href="#erc721" id="erc721"></a>

## Definition

The sum count of transactions that resulted in any ERC-721 activity in that interval. Only transfers between two distinct addresses are counted. ERC-165 is used to determine a contract’s compliance with ERC-721. Only Transfer or Approval events are counted as activity. If a transaction results in more than 1 transfer or approval, it’s only counted once.

| Name           | MetricID    | Category     | Subcategory  | Type | Unit         | Interval |
| -------------- | ----------- | ------------ | ------------ | ---- | ------------ | -------- |
| ERC-721 Tx Cnt | TxERC721Cnt | Transactions | Transactions | Sum  | Transactions | 1 day    |

## Details

* This metric counts only the ERC-721 specification Transfer and Approval events emitted by ERC-721 compliant contracts.
* ERC-721 contracts are detected if they implement the ERC-165-compatible interface defined in the ERC-721 specification using the procedure specified in the ERC-165 specification.

## Asset-Specific Details

* This metric is only available for ETH and ETC.

## Release History

* Version 4.3 of CM Network Data Pro Daily Macro (End of Day)

## Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/TxERC721Cnt" %}

# ERC-1155 Tx Cnt <a href="#erc1155" id="erc1155"></a>

## Definition

The sum count of ERC-1155 transactions in that interval. Only transactions between two distinct addresses are counted. The ERC-1155 standard is an emerging standard for the issuance of both fungible and non-fungible tokens on Ethereum. As of this metric's release date, the standard has attained considerable traction in the ecosystem of Non-Fungible Tokens.

| Name            | MetricID     | Category     | Subcategory | Type | Unit      | Interval |
| --------------- | ------------ | ------------ | ----------- | ---- | --------- | -------- |
| ERC-1155 Tx Cnt | TxERC1155Cnt | Transactions | Transfers   | Sum  | Transfers | 1 day    |

## Details

* This metric is calculated by monitoring the blockchain for ERC-1155 _Transfer Events,_ as defined by the [EIP-1155 Standard Specification](https://eips.ethereum.org/EIPS/eip-1155).
* Like ERC-721 contracts, the activity of ERC-1155s is detected with the help of a secondary standard, ERC-165, which provides an interface for both 751 as well as 1155-compliant events.

## Asset-Specific Details

* As this metric is tailored to the Ethereum ecosystem, it is only available for ETH .

## Release History

* Released in Network Data Pro (NDP) version 5.1

## Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/TxERC1155Cnt" %}


# API Endpoints

Token Transaction metrics can be accessed using these endpoints:

* `timeseries/asset-metrics` 

and by passing in the metric ID's `TxTknCnt`, `TxERC721Cnt`, etc. in the `metrics` parameter.

{% swagger src="../../.gitbook/assets/openapi.yaml" path="/timeseries/asset-metrics" method="get" %}
[openapi.yaml](../../.gitbook/assets/openapi.yaml)
{% endswagger %}

{% tabs %}
{% tab title="Shell" %}
```shell
curl --compressed "https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=TxTknCnt&assets=eth&pretty=true&api_key=<your_key>"
```
{% endtab %}

{% tab title="Python" %}
```python
import requests
response = requests.get('https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=TxTknCnt&assets=eth&pretty=true&api_key=<your_key>').json()
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
        metrics="TxTknCnt", 
        assets="eth",
    ).to_dataframe()
)
```
{% endtab %}
{% endtabs %}