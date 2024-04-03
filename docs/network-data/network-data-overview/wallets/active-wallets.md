# Active Wallets

## Active Wallets

## Contents

* [Active Wallets Count](active-wallets.md#active)
* [Active Wallets Count (Received)](active-wallets.md#received)
* [Active Wallets Count (Sent)](active-wallets.md#sent)

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

This metric is not available for assets that have full privacy, like Monero and Grin. For assets that have opt-in privacy features, like ZCash, it only takes the non-private activities into account.

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

## API Endpoints

Address Balances can be accessed using these endpoints:

* `timeseries/asset-metrics`

and by passing in the metric IDs `WalActCnt`, `WalActSentCnt`, etc. in the `metrics` parameter.

{% swagger src="../../../.gitbook/assets/openapi.yaml" path="/timeseries/asset-metrics" method="get" %}
[openapi.yaml](../../../.gitbook/assets/openapi.yaml)
{% endswagger %}

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
