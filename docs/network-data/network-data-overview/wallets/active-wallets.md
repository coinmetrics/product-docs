# Active Wallets

## Active Wallets

## Contents

* [Active Wallets Count](active-wallets.md#active)
* [Active Wallets Count (Received)](active-wallets.md#received)
* [Active Wallets Count (Sent)](active-wallets.md#sent)
* [MEV Active Wallets Count](active-wallets.md#adractcont)

## Active Wallets Count <a href="#active" id="active"></a>

### **Definition**

The sum count of unique wallets that were active in the network (either as a destination or source of a ledger change) that day. All unique wallets involved in a ledger change action (recipients and originators) are counted. This metric does not double-count wallets. In other words, if a wallet has been deemed active by being part of a ledger change, it is not counted again if is subsequently involved in a transaction during the same time interval. Wallets represent groups of addresses that we estimate are owned by the same entity. They provide a better proxy for user behavior since users often own more than one blockchain address.

### **Dictionary**

| Name                   | **MetricID** | **Unit** | **Interval** |
| ---------------------- | ------------ | -------- | ------------ |
| Wallets, active, count | WalActCnt    | Wallets  | 1 day        |

### **Details**

* Wallets represent groups of addresses that we estimate are owned by the same entity. In order to group addresses together, we employ a clustering methodology based on well-established industry standards.

### **Asset-Specific Details**

* This metric is not available for assets that have full privacy, like Monero and Grin. For assets that have opt-in privacy features, like ZCash, it only takes the non-private activities into account.
* For Solana, this metric captures the count of owner accounts.

### **Release History**

* Released in version 5.1 of Network Data Pro

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/WalActCnt" %}

## Active Wallets Count (Received) <a href="#received" id="received"></a>

### **Definition**

The sum count of unique wallets that were active in the network as a recipient of funds. All unique wallets that have received funds in transactions are counted. This metric does not double-count wallets. In other words, if a wallet has been deemed active by receiving funds, it is not counted again if it receives funds again during the same time interval. Wallets represent groups of addresses that we estimate are owned by the same entity. They provide a better proxy for user behavior since users often own more than one blockchain address.

### **Dictionary**

| Name                             | **MetricID** | **Unit** | **Interval** |
| -------------------------------- | ------------ | -------- | ------------ |
| Wallets, active, received, count | WalActRecCnt | Wallets  | 1 day        |

### **Details**

* Wallets represent groups of addresses that we estimate are owned by the same entity. In order to group addresses together, we employ a clustering methodology based on well-established industry standards.

### **Asset-Specific Details**

This metric is not available for assets that have full privacy, like Monero and Grin. For assets that have opt-in privacy features, like ZCash, it only takes the non-private activities into account.

### **Release History**

* Released in version 5.1 of Network Data Pro

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/WalActCnt" %}

## Active Wallets Count (Sent) <a href="#sent" id="sent"></a>

### **Definition**

The sum count of unique wallets that were active in the network as a sender of funds. All unique wallets that have sent funds in transactions are counted. This metric does not double-count wallets. In other words, if a wallet has been deemed active by sending funds, it is not counted again if it sends funds again during the same time interval. Wallets represent groups of addresses that we estimate are owned by the same entity. They provide a better proxy for user behavior since users often own more than one blockchain address.

### **Dictionary**

| Name                         | **MetricID**  | **Unit** | **Interval** |
| ---------------------------- | ------------- | -------- | ------------ |
| Wallets, active, sent, count | WalActSentCnt | Wallets  | 1 day        |

### **Details**

* Wallets represent groups of addresses that we estimate are owned by the same entity. In order to group addresses together, we employ a clustering methodology based on well-established industry standards.

### **Asset-Specific Details**

This metric is not available for assets that have full privacy, like Monero and Grin. For assets that have opt-in privacy features, like ZCash, it only takes the non-private activities into account.

### **Release History**

* Released in version 5.1 of Network Data Pro

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/WalActSentCnt" %}

## MEV Active Wallets Count <a href="#adractcont" id="adractcont"></a>

<table><thead><tr><th width="177">Name</th><th width="157">MetricID</th><th width="124">Unit</th><th>Interval</th></tr></thead><tbody><tr><td>MEV Active Wallets Count</td><td>MevWalActCnt</td><td>Addresses</td><td>1 day</td></tr></tbody></table>

### Definition

The sum count of unique wallets that were active in a MEV-enabled transaction in the network. An MEV-enabled transaction is one that paid an MEV tip to miners/validators in exchange for specific block ordering. Individual wallets are not double-counted if previously active. Wallets are groups of addresses supposed to be owned by a single entity.

### Details

* Ledger changes can include activities such as Decentralized Finance (DeFi) trades, DAO votes, token transfers, as well as any other activity facilitated by a smart contract.
* All participants of a ledger change activity are included.
* If an address was active multiple times during the aggregation interval (e.g., 1 day), it is counted only once.

### **Asset-Specific Details**

* Only available for Solana.
* For Solana, slots proposed by validators running the Jito-Solana client are considered as MEV slots. Further, in Solana it is possible to identify which transactions paid MEV tip in addition to simply identifying the slot. For this metric each individual transaction is evaluated to determine which are MEV-enabled and which aren't.

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics-v2/MevWalActCnt" %}

## API Endpoints

Address Balances can be accessed using these endpoints:

* `timeseries/asset-metrics`

and by passing in the metric IDs `WalActCnt`, `WalActSentCnt`, etc. in the `metrics` parameter.

{% openapi src="../../../.gitbook/assets/openapi.yaml" path="/timeseries/asset-metrics" method="get" %}
[openapi.yaml](../../../.gitbook/assets/openapi.yaml)
{% endopenapi %}

{% tabs %}
{% tab title="Shell" %}
```shell
curl --compressed "https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=WalActCnt&assets=btc&pretty=true&api_key=<your_key>"
```
{% endtab %}

{% tab title="Python" %}
```python
import requests
response = requests.get('https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=WalActCnt&assets=btc&pretty=true&api_key=<your_key>').json()
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
        metrics="WalActCnt", 
        assets="btc",
    ).to_dataframe()
)
```
{% endtab %}
{% endtabs %}
