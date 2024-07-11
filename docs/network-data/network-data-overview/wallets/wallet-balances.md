# Wallet Balances

## Wallet Balances

Wallets that hold a balance of X amount for a given asset.

### Contents

* [Value in Wallets w/ Balance ≥ X% of Current Supply](wallet-balances.md#percent)
* [Value in Wallets w/ Balance ≥ X Native Units](wallet-balances.md#native)
* [Value in Wallets w/ Balance ≥ $X USD](wallet-balances.md#usd)
* [Wallets w/ Balance > 0 Count](wallet-balances.md#nonzero\_count)

## Value in Wallets w/ Bal ≥ X% of Current Supply <a href="#percent" id="percent"></a>

### Definition

The sum of the supply being held by all wallets whose balance was at least X% of an asset's current supply at the end of the measurement interval. For example, if an asset's current supply is 100 tokens in total, `SplyWalBal1in1B` would provide the sum of the balances held by _all_ wallets holding at least 0.0000001 units of the token. Wallets represent groups of addresses that we estimate are owned by the same entity. They provide a better proxy for user behavior since users often own more than one blockchain address.

### Dictionary

<table data-header-hidden><thead><tr><th width="280">Name</th><th width="189">MetricID</th><th>Unit</th><th>Interval</th></tr></thead><tbody><tr><td>Name</td><td>MetricID</td><td>Unit</td><td>Interval</td></tr><tr><td>Supply, in wallets with balance, greater than 1in1B</td><td>SplyWalBal1in1B</td><td>Native units</td><td>1 day</td></tr><tr><td>Supply, in wallets with balance, greater than 1in100M</td><td>SplyWalBal1in100M</td><td>Native units</td><td>1 day</td></tr><tr><td>Supply, in wallets with balance, greater than 1in10M</td><td>SplyWalBal1in10M</td><td>Native units</td><td>1 day</td></tr><tr><td>Supply, in wallets with balance, greater than 1in1M</td><td>SplyWalBal1in1M</td><td>Native units</td><td>1 day</td></tr><tr><td>Supply, in wallets with balance, greater than 1in100K</td><td>SplyWalBal1in100k</td><td>Native units</td><td>1 day</td></tr><tr><td>Supply, in wallets with balance, greater than 1in10K</td><td>SplyWalBal1in10k</td><td>Native units</td><td>1 day</td></tr><tr><td>Supply, in wallets with balance, greater than 1in1K</td><td>SplyWalBal1in1k</td><td>Native units</td><td>1 day</td></tr></tbody></table>

### Availability for Assets

* [SplyWalBal1in1B](https://coverage.coinmetrics.io/search-results?query=SplyWalBal1in1B)
* [SplyWalBal1in100M](https://coverage.coinmetrics.io/search-results?query=SplyWalBal1in100M)
* [SplyWalBal1in10M](https://coverage.coinmetrics.io/search-results?query=SplyWalBal1in10M)
* [SplyWalBal1in1M](https://coverage.coinmetrics.io/search-results?query=SplyWalBal1in1M)
* [SplyWalBal1in100K](https://coverage.coinmetrics.io/search-results?query=SplyWalBal1in100K)
* [SplyWalBal1in10K](https://coverage.coinmetrics.io/search-results?query=SplyWalBal1in10K)
* [SplyWalBal1in1K](https://coverage.coinmetrics.io/search-results?query=SplyWalBal1in1K)

## Value in Wallets w/ Balance ≥ X Native Units <a href="#native" id="native"></a>

### Definition

The sum of the supply being held by all wallets whose balance was at least X native units. For example, if an asset's current supply is 21M tokens in total, this metric would provide the sum of the balances held by _all_ wallets with a balance greater or equal to X units. Wallets represent groups of addresses that we estimate are owned by the same entity. They provide a better proxy for user behavior since users often own more than one blockchain address.

### Dictionary

<table data-header-hidden><thead><tr><th width="222">Name</th><th width="185">MetricID</th><th>Unit</th><th>Interval</th></tr></thead><tbody><tr><td>Name</td><td>MetricID</td><td>Unit</td><td>Interval</td></tr><tr><td>Supply, in wallets with balance, greater than 0.001 native units</td><td>SplyWalBalNtv0.001</td><td>Native units</td><td>1 day</td></tr><tr><td>Supply, in wallets with balance, greater than 0.01 native units</td><td>SplyWalBalNtv0.01</td><td>Native units</td><td>1 day</td></tr><tr><td>Supply, in wallets with balance, greater than 0.1 native units</td><td>SplyWalBalNtv0.1</td><td>Native units</td><td>1 day</td></tr><tr><td>Supply, in wallets with balance, greater than 1 native units</td><td>SplyWalBalNtv1</td><td>Native units</td><td>1 day</td></tr><tr><td>Supply, in wallets with balance, greater than 10 native units</td><td>SplyWalBalNtv10</td><td>Native units</td><td>1 day</td></tr><tr><td>Supply, in wallets with balance, greater than 100 native units</td><td>SplyWalBalNtv100</td><td>Native units</td><td>1 day</td></tr><tr><td>Supply, in wallets with balance, greater than 1k native units</td><td>SplyWalBalNtv1k</td><td>Native units</td><td>1 day</td></tr><tr><td>Supply, in wallets with balance, greater than 10k native units</td><td>SplyWalBalNtv10k</td><td>Native units</td><td>1 day</td></tr><tr><td>Supply, in wallets with balance, greater than 100k native units</td><td>SplyWalBalNtv100k</td><td>Native units</td><td>1 day</td></tr><tr><td>Supply, in wallets with balance, greater than 1M native units</td><td>SplyWalBalNtv1M</td><td>Native units</td><td>1 day</td></tr></tbody></table>

### Details

* Native units represent a cryptoasset's monetary unit. For example, the native unit of Bitcoin is BTC, or bitcoins\_.\_
* In order to group addresses together, we employ a clustering methodology based on well-established industry standards.

### Asset-Specific Details

* Only native units are taken into account. We do not account for token balances that may be held by the same entity. For example, this metric for ETH would not account for any ERC20 token balance that may be held by the very same address.
* This metric is not available for assets that have full privacy, like Monero, Grin.
* For assets that have opt-in privacy features, like ZCash, it only takes the non-private balances into account.

### Release History

* Released in version 5.1 of Network Data Pro

### **Availability for Assets**

* [SplyWalBalNtv0.001](https://coverage.coinmetrics.io/search-results?query=SplyWalbalntv0.001)
* [SplyWalBalNtv0.01](https://coverage.coinmetrics.io/search-results?query=SplyWalbalntv0.01)
* [SplyWalBalNtv0.1](https://coverage.coinmetrics.io/search-results?query=SplyWalbalntv0.1)
* [SplyWalBalNtv1](https://coverage.coinmetrics.io/search-results?query=SplyWalbalntv1)
* [SplyWalBalNtv10](https://coverage.coinmetrics.io/search-results?query=SplyWalbalntv10)
* [SplyWalBalNtv100](https://coverage.coinmetrics.io/search-results?query=SplyWalbalntv100)
* [SplyWalBalNtv1K](https://coverage.coinmetrics.io/search-results?query=SplyWalbalntv1k)
* [SplyWalBalNtv10K](https://coverage.coinmetrics.io/search-results?query=SplyWalbalntv10k)
* [SplyWalBalNtv100K](https://coverage.coinmetrics.io/search-results?query=SplyWalbalntv100k)
* [SplyWalBalNtv1M](https://coverage.coinmetrics.io/search-results?query=SplyWalbalntv1m)

## Value in Wallets w/ Balance ≥ $X USD <a href="#usd" id="usd"></a>

### Definition

The sum of the supply being held by all wallets whose balance is equivalent to at least X dollar when priced using the Coin Metrics Reference Rate. Wallets represent groups of addresses that we estimate are owned by the same entity. They provide a better proxy for user behavior since users often own more than one blockchain address.

### Dictionary

<table data-header-hidden><thead><tr><th width="222">Name</th><th width="185">MetricID</th><th>Unit</th><th>Interval</th></tr></thead><tbody><tr><td>Name</td><td>MetricID</td><td>Unit</td><td>Interval</td></tr><tr><td>Supply, in wallets with balance, greater than $1</td><td>SplyWalBalUSD1</td><td>USD</td><td>1 day</td></tr><tr><td>Supply, in wallets with balance, greater than $10</td><td>SplyWalBalUSD10</td><td>USD</td><td>1 day</td></tr><tr><td>Supply, in wallets with balance, greater than $100</td><td>SplyWalBalUSD100</td><td>USD</td><td>1 day</td></tr><tr><td>Supply, in wallets with balance, greater than $1K</td><td>SplyWalBalUSD1K</td><td>USD</td><td>1 day</td></tr><tr><td>Supply, in wallets with balance, greater than $10K</td><td>SplyWalBalUSD10K</td><td>USD</td><td>1 day</td></tr><tr><td>Supply, in wallets with balance, greater than $100K</td><td>SplyWalBalUSD100K</td><td>USD</td><td>1 day</td></tr><tr><td>Supply, in wallets with balance, greater than $1M</td><td>SplyWalBalUSD1M</td><td>USD</td><td>1 day</td></tr></tbody></table>

### Details

* In order to compute this metric, we multiply the balance of all wallets that we have identified in the blockchain by the price of the token. All wallets with a value greater or equal to the USD value of the threshold above are summed and depicted in units of USD.
* Wallets represent groups of addresses that we estimate are owned by the same entity. In order to group addresses together, we employ a clustering methodology based on well-established industry standards.

### Asset-Specific Details

* Only native units are taken into account. We do not account for token balances that may be held by the same entity. For example, this metric for ETH would not account for any ERC20 USD balance that may be owned by the very same address.
* This metric is not available for assets that have full privacy, like Monero, Grin.
* For assets that have opt-in privacy features, like ZCash, it only takes the non-private balances into account.

### Release History

* Released in version 5.1 of Network Data Pro

### **Availability for Assets**

* [SplyWalBalUSD1](https://coverage.coinmetrics.io/search-results?query=SplyWalBalusd1)
* [SplyWalBalUSD10](https://coverage.coinmetrics.io/search-results?query=SplyWalBalusd10)
* [SplyWalBalUSD100](https://coverage.coinmetrics.io/search-results?query=SplyWalBalusd100)
* [SplyWalBalUSD1K](https://coverage.coinmetrics.io/search-results?query=SplyWalBalusd1k)
* [SplyWalBalUSD10K](https://coverage.coinmetrics.io/search-results?query=SplyWalBalusd10k)
* [SplyWalBalUSD100K](https://coverage.coinmetrics.io/search-results?query=SplyWalBalusd100k)
* [SplyWalBalUSD1M](https://coverage.coinmetrics.io/search-results?query=SplyWalBalusd1m)
* [SplyWalBalUSD10M](https://coverage.coinmetrics.io/search-results?query=SplyWalBalusd10m)

## Wallets w/ Balance > 0 Count <a href="#nonzero_count" id="nonzero_count"></a>

### **Definition**

The sum count of unique wallets with a balance greater than 0 that can be observed in the blockchain. Wallets represent groups of addresses that we estimate are owned by the same entity. They provide a better proxy for user behavior since users often own more than one blockchain address.

### **Dictionary**

| Name                         | **MetricID** | **Unit** | **Interval** |
| ---------------------------- | ------------ | -------- | ------------ |
| Wallets, with balance, count | WalBalCnt    | Wallets  | 1 day        |

### **Details**

* Wallets represent groups of addresses that we estimate are owned by the same entity. In order to group addresses together, we employ a clustering methodology based on well-established industry standards.

### **Asset-Specific Details**

This metric is not available for assets that have full privacy, like Monero and Grin. For assets that have opt-in privacy features, like ZCash, it only takes the non-private activities into account.

### **Release History**

* Released in version 5.1 of Network Data Pro

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/WalBalCnt" %}

## API Endpoints

Address Balances can be accessed using these endpoints:

* `timeseries/asset-metrics`

and by passing in the metric IDs `SplyWalBal1in1B`, etc. in the `metrics` parameter.

{% swagger src="../../../.gitbook/assets/openapi.yaml" path="/timeseries/asset-metrics" method="get" %}
[openapi.yaml](../../../.gitbook/assets/openapi.yaml)
{% endswagger %}

{% tabs %}
{% tab title="Shell" %}
```shell
curl --compressed "https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=SplyWalBal1in1B&assets=btc&pretty=true&api_key=<your_key>"
```
{% endtab %}

{% tab title="Python" %}
```python
import requests
response = requests.get('https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=SplyWalBal1in1B&assets=btc&pretty=true&api_key=<your_key>').json()
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
        metrics="SplyWalBal1in1B", 
        assets="btc",
    ).to_dataframe()
)
```
{% endtab %}
{% endtabs %}
