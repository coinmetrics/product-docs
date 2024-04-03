# New Addresses

## Address Balances

Addresses that hold a balance of X amount for a given asset.

### Contents

* [New Funded Address Count](new-addresses.md#adrnewbal)
* [New Address Count](new-addresses.md#adrnewcnt)

## New Funded Address Count <a href="#adrnewbal" id="adrnewbal"></a>

### **Definition**

The sum count of all unique addresses that were newly created and funded (e.g. have a non-zero balance) that interval.

### **Dictionary**

| Name          | **MetricID**                                                                      | **Unit**  | **Interval** |
| ------------- | --------------------------------------------------------------------------------- | --------- | ------------ |
| New Addresses | [AdrNewBalCnt](https://coverage.coinmetrics.io/search-results?query=AdrNewBalCnt) | Addresses | 1 day        |

### **Details**

* [Addresses](../../../on-chain-basics.md#address) are the user-identifiers in a ledger change.
* New addresses are addresses identified in the blockchain that did not exist prior to the observation period (e.g. 1 day).
* Depending upon how a blockchain stores address information, new addresses might not be funded with any tokens. In other words, they have a balance of zero.
* This metric only accounts for new addresses that have been funded.

### **Chart**

[New Addr Cnt](https://docs.coinmetrics.io/asset-metrics/adresses/adrnewcnt) showcases all new addresses observed in the network over the previous day, and New Funded Addr Cnt is a subset of New Addr Cnt that only counts addresses with a balance greater than 0.

![Source: CM Network Data Charts](../../../../.gitbook/assets/9%20-%20New%20Addresses.png)

### **Asset-Specific Details**

This metric is not available for assets that have full privacy, like Monero and Grin. For assets that have opt-in privacy features, like ZCash, it only takes the non-private activities into account.

### **Examples**

Consider the following example:

* Both Addreses A and Address B are seen on the ledger for the first time.
* Address A was referred by a smart contract application, perhaps as user identifier, but it was not funded or otherwise engaged by the smart contract. Its balance is zero.
* During that same interval, Address B received funds from an exhange for the first time. Its balance is 0.002.

If the above was the only activity observed in the network during that interval, AdrNewCnt would showcase a value of 1. This value only aggregates activity that is economically relevant (Address B), and excludes non-monetary activity (Address A).

### **Release History**

* Release Version: 5.0 (August, 2021)

### **Interpretation**

* Like Active Addresses, New Funded Addresses is a popular measure to proxy the number of new users on a blockchain. Unlike New Addr Cnt, this only showcases addresses with a non-zero balance .

### **See Also**

* [New Addr Cnt](../../addresses/adrnewcnt.md)
* [Address](../../../on-chain-basics.md#address)
* [Active Addresses (Received)](../../addresses/adractreccnt.md)
* [Active Addresses (Sent)](../../addresses/adractsentcnt.md)

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/AdrActCnt" %}

## New Address Count <a href="#adrnewcnt" id="adrnewcnt"></a>

### **Definition**

The sum count of all unique addresses that were newly created that interval.

### **Dictionary**

| Name          | **MetricID**                                                                | **Unit**  | **Interval** |
| ------------- | --------------------------------------------------------------------------- | --------- | ------------ |
| New Addresses | [AdrNewCnt](https://coverage.coinmetrics.io/search-results?query=AdrNewCnt) | Addresses | 1 day        |

### **Details**

* [Addresses](../../../on-chain-basics.md#address) are the user-identifiers in a ledger change.
* New addresses are addresses identified in the blockchain that did not exist prior to the observation period (e.g. 1 day).
* Depending upon how a blockchain stores address information, new addresses might not be funded with any tokens. In other words, they have a balance of zero.
* As such, a caveat of this metric is that it can be inflated by activity that is not economicallt relevant.
* For new addresses that are funded and are economically relevant, please refer to New Funded Adrr Cnt (AdrNewBalCnt).

### **Chart**

New Addr Cnt showcases all new addresses observed in the network over the previous day, and [New Funded Addr Cnt](https://docs.coinmetrics.io/asset-metrics/adresses/adrnewbalcnt) is a subset of New Addr Cnt that only counts addresses with a balance greater than 0.

![Source: CM Network Data Charts](../../../../.gitbook/assets/9%20-%20New%20Addresses.png)

### **Asset-Specific Details**

* This metric is not available for assets that have full privacy, like Monero and Grin. For assets that have opt-in privacy features, like ZCash, it only takes the non-private activities into account.

### **Examples**

Consider the following example:

* Both Addreses A and Address B are seen on the ledger for the first time.
* Address A was referred by a smart contract application, perhaps as user identifier, but it was not funded or otherwise engaged by the smart contract. Its balance is zero.
* During that same interval, Address B received funds from an exhange for the first time. Its balance is 0.002.

If the above was the only activity observed in the network during that interval, AdrNewCnt would showcase a value of 2. This value aggregates activity that is economically relevant (Address B) as well as non monetary (Address A).

### **Release History**

* Release Version: 5.0 (August, 2021)

### **Interpretation**

* Like Active Addresses, New Addresses is a popular measure to proxy the number of _new_ users on a blockchain. However, in blockchains where address creation is cheap, or free, new addresses can still be trivially forged.

### **See Also**

* [New Funded Addr Cnt](../../addresses/adrnewbalcnt.md)
* [Address](../../../on-chain-basics.md#address)
* [Active Addresses (Received)](../../addresses/adractreccnt.md)
* [Active Addresses (Sent)](../../addresses/adractsentcnt.md)

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/AdrActCnt" %}

## API Endpoints

New Address metrics can be accessed using these endpoints:

* `timeseries/asset-metrics`

and by passing in the metric IDs `AdrNewBal` `AdrNewCnt` in the `metrics` parameter.

{% swagger src="../../../.gitbook/assets/openapi.yaml" path="/timeseries/asset-metrics" method="get" %}
[openapi.yaml](../../../.gitbook/assets/openapi.yaml)
{% endswagger %}

{% tabs %}
{% tab title="Shell" %}
```shell
curl --compressed "https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=AdrNewBal&assets=btc&pretty=true&api_key=<your_key>"
```
{% endtab %}

{% tab title="Python" %}
```python
import requests
response = requests.get('https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=AdrNewBal&assets=btc&pretty=true&api_key=<your_key>').json()
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
        metrics="AdrNewBal", 
        assets="btc",
    ).to_dataframe()
)
```
{% endtab %}
{% endtabs %}
