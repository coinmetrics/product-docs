# Active Addresses

## Active Addresses

### Contents

* [Active Monthly, Weekly, Daily Addresses](active-addresses.md#adract)
* [Active Addresses (Sent)](active-addresses.md#adractsent)
* [Active Addresses (Received)](active-addresses.md#adractrec)
* [Active Smart Contract Addresses](active-addresses.md#adractcont)

### **Interpretation**

Active addresses is a popular measure to proxy the number of users on a blockchain, since it is typically less sensitive to stress-tests (which often focus on transaction count). However, active addresses inherit idiosyncrasies from the structure of the particular blockchain, and care must be taken to understand structural differences in active address counts. In blockchains where address creation is cheap or free, and transacting is cheap or free, active addresses can still be trivially forged.

## Active Monthly, Weekly, Daily Addresses <a href="#adract" id="adract"></a>

<table><thead><tr><th width="177">Name</th><th width="157">MetricID</th><th width="124">Unit</th><th>Interval</th></tr></thead><tbody><tr><td><a href="active-addresses.md#active">Active Monthly Addresses</a></td><td><a href="https://coverage.coinmetrics.io/search-results?query=AdrAct30dCnt">AdrAct30dCnt</a></td><td>Addresses</td><td>1 Day</td></tr><tr><td><a href="active-addresses.md#active">Active Weekly Addresses</a></td><td><a href="https://coverage.coinmetrics.io/search-results?query=AdrAct7dCnt">AdrAct7dCnt</a></td><td>Addresses</td><td>1 Day</td></tr><tr><td><a href="active-addresses.md#active">Active Daily Addresses</a></td><td><a href="https://coverage.coinmetrics.io/search-results?query=AdrActCnt">AdrActCnt</a></td><td>Addresses</td><td>1 Day</td></tr></tbody></table>

### Definition

The sum count of unique addresses that were active in the network (either as a recipient or originator of a ledger change) in the trailing X days up to the end of that interval. All parties in a ledger change action (recipients and originators) are counted. Individual addresses are not double-counted if active several times in the considered interval.

### Details

* Active addresses count the number of unique addresses that participated in a ledger change.
* Ledger changes can include activities such as transacting, signing of blocks, claiming of mining or staking rewards, voting, creating accounts, and more dependent on whether the underlying protocol supports the activity (different protocols vary in the types of activities that are supported).
* All participants of a ledger change activity are included.
* If an address was active multiple times during the aggregation interval (e.g., 30 days), it is counted only once.
* For ETH, miners receiving fees from the original sender of a failed transaction are counted as active (receiving) addresses.
* Any address that's active (even if sending 0 ETH, or sending ETH to itself, or involved in failed transactions) is counted towards active addresses.

### **Asset-Specific Details**

* This metric is not available for assets that have full privacy, like Monero and Grin. For assets that have opt-in privacy features, like ZCash, it only takes the non-private activities into account.

### Coverage

* [AdrAct30dCnt](https://coverage.coinmetrics.io/search-results?query=AdrAct30dCnt)
* [AdrAct7dCnt](https://coverage.coinmetrics.io/search-results?query=AdrAct7dCnt)
* [AdrActCnt](https://coverage.coinmetrics.io/search-results?query=AdrActCnt)

## Active Addresses (Sent) <a href="#adractsent" id="adractsent"></a>

<table><thead><tr><th width="177">Name</th><th width="157">MetricID</th><th width="124">Unit</th><th>Interval</th></tr></thead><tbody><tr><td><a href="active-addresses.md#sent">Active Addresses (Sent)</a></td><td><a href="https://coverage.coinmetrics.io/search-results?query=AdrActSentCnt">AdrActSentCnt</a></td><td>Addresses</td><td>1 day, 1 hour</td></tr></tbody></table>

### Definition

The sum count of unique addresses that were active in the network (as a recipient of a ledger change) that day. Individual destination addresses are counted. Individual addresses are not double-counted if previously active.

### **Details**

* Active Addresses (sent) is the sum count of unique addresses that where the sending side of a ledger change
* For this unadjusted version of the metric, all ledger change scenarios are considered.
* Such ledger changes can include mining, staking, transacting, account creation, etc..
* If an address was active multiple times as sender during that interval, it is counted only once.

### **Asset-Specific Details**

* This metric is not available for assets that have full privacy, like Monero, Grin. For assets that have opt-in privacy features, like ZCash, it only takes the non-private activities into account.

### **Examples**

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

### Coverage

* [AdrActSentCnt](https://coverage.coinmetrics.io/search-results?query=AdrActSentCnt)

## Active Addresses (Received) <a href="#adractrec" id="adractrec"></a>

<table><thead><tr><th width="177">Name</th><th width="157">MetricID</th><th width="124">Unit</th><th>Interval</th></tr></thead><tbody><tr><td><a href="active-addresses.md#received">Active Addresses (Received)</a></td><td><a href="https://coverage.coinmetrics.io/search-results?query=AdrActRecCnt">AdrActRecCnt</a></td><td>Addresses</td><td>1 day, 1 hour</td></tr></tbody></table>

### **Definition**

The sum count of unique addresses that were active in the network (as a recipient of a ledger change) that day. Individual destination addresses are counted. Individual addresses are not double-counted if previously active.

### **Details**

* Active Addresses (Received) is the sum count of unique addresses that where the receiving end of a ledger change
* For this unadjusted version of the metric, all ledger change scenarios are considered.
* Such ledger changes can include mining, staking, transacting, account creation, etc..
* If an address was active multiple times as recipient during that interval, it is counted only once.
* For ETH, miners receiving fees from the original sender of a failed transaction are counted as active receiving addresses.

### **Asset-Specific Details**

* This metric is not available for assets that have full privacy, like Monero, Grin. For assets that have opt-in privacy features, like ZCash, it only takes the non-private activities into account.

### **Examples**

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

### Coverage

* [AdrActRecCnt](https://coverage.coinmetrics.io/search-results?query=AdrActRecCnt)

## Active Smart Contract Addresses <a href="#adractcont" id="adractcont"></a>

<table><thead><tr><th width="177">Name</th><th width="157">MetricID</th><th width="124">Unit</th><th>Interval</th></tr></thead><tbody><tr><td><a href="active-addresses.md#smart">Active Smart Contract Addr Cnt</a></td><td><a href="https://coverage.coinmetrics.io/search-results?query=AdrActContCnt">AdrActContCnt</a></td><td>Smart Contract Addresses</td><td>1 day</td></tr></tbody></table>

### Definition

The sum count of unique smart contract addresses that were active in the network (either as a recipient or originator of a ledger change) that interval. All unique smart contracts involved in a ledger change action (recipients and originators) are counted. This metric does not double-count contracts. In other words, if a contract has been deemed active by being part of a ledger change, it is not counted again if is subsequently invoked during the same time interval.

### Details

* Active smart contact [address](../../../on-chain-basics.md#address) count represents the number of unique smart contract addresses that participated in a ledger change.
* For this unadjusted version of the metric, all ledger changes are considered.
* Ledger changes can include activities such as Decentralized Finance (DeFi) trades, DAO votes, token transfers, as well as any other activity facilitated by a smart contract.
* All participants of a ledger change activity are included.
* If an address was active multiple times during the aggregation interval (e.g., 1 day), it is counted only once.

### **Asset-Specific Details**

* This metric is only available for assets that feature the notion of smart contract addresses, such as Ethereum.

### Coverage

* [AdrActContCnt](https://coverage.coinmetrics.io/search-results?query=AdrActContCnt)

## API Endpoints

Active Addresses can be accessed using these endpoints:

* `timeseries/asset-metrics`

and by passing in the metric ID's `AdrAct30dCnt`, `AdrAct7dCnt`, etc. in the `metrics` parameter.

{% swagger src="../../../.gitbook/assets/openapi.yaml" path="/timeseries/asset-metrics" method="get" %}
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
        assets="btc",
    ).to_dataframe()
)
```
{% endtab %}
{% endtabs %}

### **Release History**

* Release Version: 1.0 (X, 2019)
