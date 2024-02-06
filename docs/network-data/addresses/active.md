# Active Addresses

## Definition

The sum count of unique addresses or smart contract addresses that were active in the network (either as a recipient or originator of a ledger change) in the trailing X days up to the end of that interval. All parties in a ledger change action (recipients and originators) are counted. Individual addresses are not double-counted if active several times in the considered interval.


| Name                        | MetricID                       | Category | Sub-Category | Type | Unit | Interval |
| --------------------------- | ------------------------------ | -------- | ----------- | ---- | ---- | -------- |
|  Active Monthly Addresses | [AdrAct30dCnt](https://coverage.coinmetrics.io/search-results?query=AdrAct30dCnt) |  Addresses | Active      |  Sum | Addresses  | 1 Day       |
|  Active Weekly Addresses | [AdrAct7dCnt](https://coverage.coinmetrics.io/search-results?query=AdrAct7dCnt) |  Addresses | Active      |  Sum | Addresses  | 1 Day       |
|  Active Daily Addresses | [AdrActCnt](https://coverage.coinmetrics.io/search-results?query=AdrActCnt) |  Addresses | Active      |  Sum | Addresses  | 1 Day       |
| Active Addresses (Received) | [AdrActRecCnt](https://coverage.coinmetrics.io/search-results?query=AdrActRecCnt) | Addresses    | Activity         | Sum      | Addresses | 1 day, 1 hour |
| Active Addresses (Sent) | [AdrActSentCnt](https://coverage.coinmetrics.io/search-results?query=AdrActSentCnt) | Addresses    | Activity         | Sum      | Addresses | 1 day, 1 hour |
| Active Smart Contract Addr Cnt | [AdrActContCnt](https://coverage.coinmetrics.io/search-results?query=AdrActContCnt) | Addresses    | Active           | Sum      | Smart Contract Addresses | 1 day        |
<!-- | Wallets, active, count | [WalActCnt](https://coverage.coinmetrics.io/search-results?query=WalActCnt)    | Wallets      | Activity         | Sum      | Wallets  | 1 day        |
| Wallets, active, received, count | [WalActRecCnt](https://coverage.coinmetrics.io/search-results?query=WalActRecCnt) | Wallets      | Activity         | Sum      | Wallets  | 1 day        |
| Wallets, active, sent, count | [WalActSentCnt](https://coverage.coinmetrics.io/search-results?query=WalActSentCnt) | Wallets      | Activity         | Sum      | Wallets  | 1 day        | -->


### Active Monthly, Weekly, Daily Addresses

#### Definition
The sum count of unique addresses that were active in the network (either as a recipient or originator of a ledger change) in the trailing X days up to the end of that interval. All parties in a ledger change action (recipients and originators) are counted. Individual addresses are not double-counted if active several times in the considered interval.

#### Details

* Active addresses count the number of unique addresses that participated in a ledger change.
<!-- * For this unadjusted version of the metric, all ledger changes are considered over the course of one month (30 days). -->
* Ledger changes can include activities such as transacting, signing of blocks, claiming of mining or staking rewards, voting, creating accounts, and more dependent on whether the underlying protocol supports the activity (different protocols vary in the types of activities that are supported).
* All participants of a ledger change activity are included.
* If an address was active multiple times during the aggregation interval (e.g., 30 days), it is counted only once.
* For ETH, miners receiving fees from the original sender of a failed transaction are counted as active (receiving) addresses.
* Any address that's active (even if sending 0 ETH, or sending ETH to itself, or involved in failed transactions) is counted towards active addresses.

#### **Asset-Specific Details**

* This metric is not available for assets that have full privacy, like Monero and Grin. For assets that have opt-in privacy features, like ZCash, it only takes the non-private activities into account.

### Active Addresses (Sent)

#### Definition
The sum count of unique addresses that were active in the network (as a recipient of a ledger change) that day.  Individual destination addresses are counted.  Individual addresses are not double-counted if previously active.&#x20;

#### **Details**
* Active Addresses (sent) is the sum count of unique addresses that where the sending side of a ledger change
* For this unadjusted version of the metric, all ledger change scenarios are considered.
* Such ledger changes can include mining, staking, transacting, account creation, etc..
* If an address was active multiple times as sender during that interval, it is counted only once.

#### **Asset-Specific Details**

* This metric is not available for assets that have full privacy, like Monero, Grin. For assets that have opt-in privacy features, like ZCash, it only takes the non-private activities into account.

#### **Examples**

In a given day:

* Address A mines 10 coins
  * A was recipient, no sender
* Address B sends 2 coins to each C and D
  * C and D were recipients, B was sender
* Address D delegates 20 coins to E
  * D is the sender, E is recipient
* Address A burns 1 coin
  * A is the sender, no recipient
* Address F votes on a protocol change
  * F is the sender/initiator

We would count as active senders: A, B, D and F. The value of the metric would therefore be: 4.

### Active Addresses (Received)

#### **Details**

* Active Addresses (Received) is the sum count of unique addresses that where the receiving end of a ledger change
* For this unadjusted version of the metric, all ledger change scenarios are considered.
* Such ledger changes can include mining, staking, transacting, account creation, etc..
* If an address was active multiple times as recipient during that interval, it is counted only once.
* For ETH, miners receiving fees from the original sender of a failed transaction are counted as active receiving addresses.

#### **Asset-Specific Details**

* This metric is not available for assets that have full privacy, like Monero, Grin. For assets that have opt-in privacy features, like ZCash, it only takes the non-private activities into account.

#### **Examples**

In a given day:

* Address A mines 10 coins
  * A was recipient, no sender
* Address B sends 2 coins to each C and D
  * C and D were recipients, B was sender
* Address D delegates 20 coins to E
  * D is the sender, E is recipient
* Address A burns 1 coin
  * A is the sender, no recipient
* Address F votes on a protocol change
  * F is the sender/initiator

We would count as active recipients: A, C, D and E. The value of the metric would therefore be: 4.

### Active Smart Contract Addresses

#### Definition
The sum count of unique smart contract addresses that were active in the network (either as a recipient or originator of a ledger change) that interval. All unique smart contracts involved in a ledger change action (recipients and originators) are counted. This metric does not double-count contracts. In other words, if a contract has been deemed active by being part of a ledger change, it is not counted again if is subsequently invoked during the same time interval.

#### Details
* Active smart contact [address](../../on-chain-basics.md#address) count represents the number of unique smart contract addresses that participated in a ledger change.
* For this unadjusted version of the metric, all ledger changes are considered.
* Ledger changes can include activities such as Decentralized Finance (DeFi) trades, DAO votes, token transfers, as well as any other activity facilitated by a smart contract.
* All participants of a ledger change activity are included.
* If an address was active multiple times during the aggregation interval (e.g., 1 day), it is counted only once.

#### **Asset-Specific Details**

* This metric is only available for assets that feature the notion of smart contract addresses, such as Ethereum.

## API Endpoints

Active Addresses can be accessed using these endpoints:
* `timeseries/asset-metrics` 
<!-- endpoint = path, e.g. `timeseries/asset-metrics -->
<!-- add endpoints as needed -->
and by passing in the `AdrAct30dCnt`, `AdrAct7dCnt`, etc. in the `metrics` parameter.

{% swagger src="../../../.gitbook/assets/openapi.yaml" path="timeseries/asset-metrics" method="get" %}
[openapi.yaml](../../../.gitbook/assets/openapi.yaml)
{% endswagger %}

{% tabs %}
{% tab title="Shell" %}
```shell
curl --compressed "https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=AdrAct30dCnt&assets=btc&pretty=true&api_key=<your_key>"
```
{% endtab %}

{% tab title="Python" %}
```python
import requests
response = requests.get('https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=AdrAct30dCnt&assets=btc&pretty=true&api_key=<your_key>').json()
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
        metrics="AdrAct30dCnt", 
        assets='btc',
    ).to_dataframe()
)
```

<!-- required_parameters example: assets=btc -->
<!-- required_parameters_python example: assets=['btc'] -->


<!-- See https://gitlab.com/coinmetrics/data-delivery/api-client-python/-/blob/master/coinmetrics/api_client.py?ref_type=heads for mapping of python_api_client_method to API endpoint -->
{% endtab %}
{% endtabs %}

<!-- ## Chart (optional) -->

<!-- <link_to_charting_tool>
![Caption of chart](link_to_charts.coinmetrics.io) -->
<!-- embed interactive chart using charting tool, if possible -->

<!-- ## Examples

<list of examples> 
could be redundant with examples in markdown? -->

## **Release History**

* Release Version: 1.0 (X, 2019)

## **Interpretation**

Active addresses is a popular measure to proxy the number of users on a blockchain, since it is typically less sensitive to stress-tests (which often focus on transaction count). However, active addresses inherit idiosyncrasies from the structure of the particular blockchain, and care must be taken to understand structural differences in active address counts. In blockchains where address creation is cheap or free, and transacting is cheap or free, active addresses can still be trivially forged.

## See Also

<link of related metrics, other pages >
<link of SOTNs that may use this metric>
