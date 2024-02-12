# Address Balances
Addresses that hold a balance of X amount for a given asset.

## Contents
* [Address Count with ≥ X% Supply](#percent)
* [Address Count with Balance ≥ X (native units)](#native)
* [Address Count with Balance ≥ $X](#usd)
* [New Funded Address Count](#new_funded)
* [New Address Count](#new)

# Address Count with ≥ X% Supply <a href="#percent" id="percent"></a>

## Definition

The sum count of unique addresses holding at least one in Xth of the current supply of native units as of the end of that day. Only native units are considered \(e.g., an address with less than one ten-billionth ETH but with ERC-20 tokens would not be considered\).

| Name | MetricID | Category | Subcategory | Type | Unit | Interval |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Addr Cnt with ≥ 0.00000001% Supply | [AdrBal1in10BCnt](https://coverage.coinmetrics.io/search-results?query=AdrBal1in10BCnt) | Addresses | Balance | Sum | Addresses | 1 day |
| Addr Cnt with ≥ 0.0000001% Supply | [AdrBal1in1BCnt](https://coverage.coinmetrics.io/search-results?query=AdrBal1in1BCnt) | Addresses | Balance | Sum | Addresses | 1 day |
| Addr Cnt with ≥ 0.000001% Supply | [AdrBal1in100MCnt](https://coverage.coinmetrics.io/search-results?query=AdrBal1in100MCnt) | Addresses | Balance | Sum | Addresses | 1 day |
| Addr Cnt with ≥ 0.00001% Supply | [AdrBal1in10MCnt](https://coverage.coinmetrics.io/search-results?query=AdrBal1in10MCnt) | Addresses | Balance | Sum | Addresses | 1 day |
| Addr Cnt with ≥ 0.0001% Supply | [AdrBal1in1MCnt](https://coverage.coinmetrics.io/search-results?query=AdrBal1in1MCnt) | Addresses | Balance | Sum | Addresses | 1 day |
| Addr Cnt with ≥ 0.001% Supply | [AdrBal1in100KCnt](https://coverage.coinmetrics.io/search-results?query=AdrBal1in100KCnt) | Addresses | Balance | Sum | Addresses | 1 day |
| Addr Cnt with ≥ 0.01% Supply | [AdrBal1in10KCnt](https://coverage.coinmetrics.io/search-results?query=AdrBal1in10KCnt) | Addresses | Balance | Sum | Addresses | 1 day |
| Addr Cnt with ≥ 0.1% Supply | [AdrBal1in1KCnt](https://coverage.coinmetrics.io/search-results?query=AdrBal1in1KCnt) | Addresses | Balance | Sum | Addresses | 1 day |

## Details

* These metrics are a breakdown of the addresses with balance by relative ownership of the total current supply
* In this unadjusted version, the total current supply is used.
* The state of the ledger is the one at the last available block for that day.
* Only the native units balance is considered, L2 tokens \(ERC-20, etc..\) are not taken into account.
* The computation uses greater than or equal comparison: owning exactly 1 billionth of the current supply qualifies an address for AdrBal1in1BCnt

## Asset-Specific Details

* For XRP, escrowed amounts are not taken into account for balances but are counted towards total current supply.
* This metric is not available for assets that have full privacy, like Monero, Grin.
* For assets that have opt-in privacy features, like ZCash, it only takes the non-private balances into account. The shielded balances are taken into account for the supply component of the metric.

## Examples

If the total current supply of the token is 10,000,000,000 units \(10 billion units\):

* Addresses with less than 1 native unit \(or 0.00000001% of supply\) don't appear in any of these metrics
* Addresses with a balance of 1 native unit \(or 0.00000001% of supply\) are counted only in AdrBal1in10BCnt
* Addresses with a balance of 10 native units \(or 0.0000001% of supply\) are counted in AdrBal1in10BCnt and AdrBal1in1BCnt
* Addresses with 10,000,000 native units \(0.1% of supply\) are counted in all of these metrics 

## Release History

* All but AdrBal1in10KCnt and AdrBal1in1KCnt were released in the 4.0 release of NDP
* AdrBal1in10KCnt and AdrBal1in1KCnt were released in the 4.2 release of NDP

## Interpretation

In contrast with Addresses, with balance, greater than X native units, count, this metric seeks to facilitate direct comparisons between blockchains, even if they have widely varying supply counts. This metric allows you to determine how many addresses own a given fraction of supply, rather than a given number of units of supply. Keep in mind that in blockchains where transacting is cheap or free, this metric can be gamed.

## Coverage
* [AdrBal1in10BCnt](https://coverage.coinmetrics.io/search-results?query=AdrBal1in10BCnt)
* [AdrBal1in1BCnt](https://coverage.coinmetrics.io/search-results?query=AdrBal1in1BCnt)
* [AdrBal1in100MCnt](https://coverage.coinmetrics.io/search-results?query=AdrBal1in100MCnt)
* [AdrBal1in10MCnt](https://coverage.coinmetrics.io/search-results?query=AdrBal1in10MCnt)
* [AdrBal1in1MCnt](https://coverage.coinmetrics.io/search-results?query=AdrBal1in1MCnt)
* [AdrBal1in100KCnt](https://coverage.coinmetrics.io/search-results?query=AdrBal1in100KCnt)
* [AdrBal1in10KCnt](https://coverage.coinmetrics.io/search-results?query=AdrBal1in10KCnt)
* [AdrBal1in1KCnt](https://coverage.coinmetrics.io/search-results?query=AdrBal1in1KCnt)

# Address Count with Balance ≥ X (native units) <a href="#native" id="native"></a>

## Definition

The sum count of unique addresses holding at least X native units as of the end of that day. Only native units are considered (e.g., an address with less than X ETH but with more than X in ERC-20 tokens would not be considered).

| Name                                   | MetricID                                  | Category  | Subcategory | Type | Unit      | Interval |
| -------------------------------------- | ----------------------------------------- | --------- | ----------- | ---- | --------- | -------- |
| Addr Cnt of Bal ≥ 0.001 (native units) | [AdrBalNtv0.001Cnt](https://coverage.coinmetrics.io/search-results?query=adrbalntv0.001cnt) | Addresses | Balance     | Sum  | Addresses | 1 day    |
| Addr Cnt of Bal ≥ 0.01 (native units)  | [AdrBalNtv0.01Cnt](https://coverage.coinmetrics.io/search-results?query=adrbalntv0.01cnt)   | Addresses | Balance     | Sum  | Addresses | 1 day    |
| Addr Cnt of Bal ≥ 0.1 (native units)   | [AdrBalNtv0.1Cnt](https://coverage.coinmetrics.io/search-results?query=adrbalntv0.1cnt)     | Addresses | Balance     | Sum  | Addresses | 1 day    |
| Addr Cnt of Bal ≥ 1 (native units)     | [AdrBalNtv1Cnt](https://coverage.coinmetrics.io/search-results?query=adrbalntv1cnt)         | Addresses | Balance     | Sum  | Addresses | 1 day    |
| Addr Cnt of Bal ≥ 10 (native units)    | [AdrBalNtv10Cnt](https://coverage.coinmetrics.io/search-results?query=adrbalntv10cnt)       | Addresses | Balance     | Sum  | Addresses | 1 day    |
| Addr Cnt of Bal ≥ 100 (native units)   | [AdrBalNtv100Cnt](https://coverage.coinmetrics.io/search-results?query=adrbalntv100cnt)     | Addresses | Balance     | Sum  | Addresses | 1 day    |
| Addr Cnt of Bal ≥ 1K (native units)    | [AdrBalNtv1KCnt](https://coverage.coinmetrics.io/search-results?query=adrbalntv1kcnt)       | Addresses | Balance     | Sum  | Addresses | 1 day    |
| Addr Cnt of Bal ≥ 10K (native units)   | [AdrBalNtv10KCnt](https://coverage.coinmetrics.io/search-results?query=adrbalntv10kcnt)     | Addresses | Balance     | Sum  | Addresses | 1 day    |
| Addr Cnt of Bal ≥ 100K (native units)  | [AdrBalNtv100KCnt](https://coverage.coinmetrics.io/search-results?query=adrbalntv100kcnt)   | Addresses | Balance     | Sum  | Addresses | 1 day    |
| Addr Cnt of Bal ≥ 1M (native units)    | [AdrBalNtv1MCnt](https://coverage.coinmetrics.io/search-results?query=adrbalntv1mcnt)       | Addresses | Balance     | Sum  | Addresses | 1 day    |

## Details

* These metrics provide a count of addresses with balance by equal or higher than a native unit threshold.
* The state of the ledger is the one at the last available block for that day.
* Only the native units balance is considered, L2 tokens (ERC-20, etc..) are not taken into account.
* The computation uses greater than or equal comparison: owning exactly 1 native unit qualifies an address for AdrBalNtv1Cnt.

## Asset-Specific Details

* For XRP, escrowed amounts are not taken into account.
* This metric is not available for assets that have full privacy, like Monero, Grin.
* For assets that have opt-in privacy features, like ZCash, it only takes the non-private activities into account.

## Release History

* Released in the 4.0 release of NDP

## Interpretation

* This is a potent set of metrics which can elucidate the dispersion of ownership of the address space in a cryptocurrency. The trend can demonstrate whether or not a cryptocurrency is in a concentrative or distributive phase. It should be noted that supply is arbitrary, and for large-cap assets varies between tens of millions to hundreds of billions; so unit dispersion is often not directly comparable between chains. Put otherwise: it is cheaper to accumulate addresses with 100 XRP than 100 BTC since those are so different in fiat terms. This metric can also be gamed to a degree by adding dust to many thousands of addresses.

## Coverage
* [AdrBalNtv0.001Cnt](https://coverage.coinmetrics.io/search-results?query=adrbalntv0.001cnt)
* [AdrBalNtv0.01Cnt](https://coverage.coinmetrics.io/search-results?query=adrbalntv0.01cnt)
* [AdrBalNtv0.1Cnt](https://coverage.coinmetrics.io/search-results?query=adrbalntv0.1cnt)
* [AdrBalNtv1Cnt](https://coverage.coinmetrics.io/search-results?query=adrbalntv1cnt)
* [AdrBalNtv10Cnt](https://coverage.coinmetrics.io/search-results?query=adrbalntv10cnt)
* [AdrBalNtv100Cnt](https://coverage.coinmetrics.io/search-results?query=adrbalntv100cnt)
* [AdrBalNtv1KCnt](https://coverage.coinmetrics.io/search-results?query=adrbalntv1kcnt)
* [AdrBalNtv10KCnt](https://coverage.coinmetrics.io/search-results?query=adrbalntv10kcnt)
* [AdrBalNtv100KCnt](https://coverage.coinmetrics.io/search-results?query=adrbalntv100kcnt)
* [AdrBalNtv1MCnt](https://coverage.coinmetrics.io/search-results?query=adrbalntv1mcnt)

# Address Count with Balance ≥ $X <a href="#usd" id="usd"></a>

## Definition

The sum count of unique addresses holding at least X dollar's worth of native units as of the end of that day. Only native units are considered (e.g., an address with less than X dollar's worth of ETH but with more than X dollar's worth of ERC-20 tokens would not be considered).

| Name                       | MetricID                                | Category  | Subcategory | Type | Unit      | Interval |
| -------------------------- | --------------------------------------- | --------- | ----------- | ---- | --------- | -------- |
| Address Cnt of Bal ≥ $1    | [AdrBalUSD1Cnt](https://coverage.coinmetrics.io/search-results?query=adrbalusd1cnt)       | Addresses | Balance     | Sum  | Addresses | 1 day    |
| Address Cnt of Bal ≥ $10   | [AdrBalUSD10Cnt](https://coverage.coinmetrics.io/search-results?query=adrbalusd10cnt)     | Addresses | Balance     | Sum  | Addresses | 1 day    |
| Address Cnt of Bal ≥ $100  | [AdrBalUSD100Cnt](https://coverage.coinmetrics.io/search-results?query=adrbalusd100cnt)   | Addresses | Balance     | Sum  | Addresses | 1 day    |
| Address Cnt of Bal ≥ $1K   | [AdrBalUSD1KCnt](https://coverage.coinmetrics.io/search-results?query=adrbalusd1kcnt)     | Addresses | Balance     | Sum  | Addresses | 1 day    |
| Address Cnt of Bal ≥ $10K  | [AdrBalUSD10KCnt](https://coverage.coinmetrics.io/search-results?query=adrbalusd10kcnt)   | Addresses | Balance     | Sum  | Addresses | 1 day    |
| Address Cnt of Bal ≥ $100K | [AdrBalUSD100KCnt](https://coverage.coinmetrics.io/search-results?query=adrbalusd100kcnt) | Addresses | Balance     | Sum  | Addresses | 1 day    |
| Address Cnt of Bal ≥ $1M   | [AdrBalUSD1MCnt](https://coverage.coinmetrics.io/search-results?query=adrbalusd1mcnt)     | Addresses | Balance     | Sum  | Addresses | 1 day    |
| Address Cnt of Bal ≥ $10M  | [AdrBalUSD10MCnt](https://coverage.coinmetrics.io/search-results?query=adrbalusd10mcnt)   | Addresses | Balance     | Sum  | Addresses | 1 day    |

## Details

* These metrics are a breakdown of the addresses with balance count with USD balance thresholds.
* The state of the ledger is the one at the last available block for that day.
* The price used is the daily close price.
* Only the native units balance is considered, L2 tokens (ERC-20, etc..) are not taken into account.
* The computation uses greater than or equal comparison: owning exactly $1 qualifies an address for AdrBalUSD1Cnt.

## Asset-Specific Details

* For XRP, escrowed amounts are not taken into account.
* This metric is not available for assets that have full privacy, like Monero, Grin.
* For assets that have opt-in privacy features, like ZCash, it only takes the non-private activities into account.

## Release History

* Released in the 4.0 release of NDP

## Interpretation

* This metric standardizes wealth cohorts across multiple blockchains for easy comparison, although differences in address creation must be taken into account. Some wallets in UTXO chains tend to fragment user balances into multiple addresses to preserve privacy. Note that this metric is sensitive to changes in unit price; common address sizes combined with price changes can lead to large numbers of addresses hitting a new threshold at the same time. This can lead to sharp discontinuities in the metric. For a purer measure of holder dispersion (albeit not as directly comparable), see addresses, with balance, greater than X native units, count.

## Coverage
* [AdrBalUSD1Cnt](https://coverage.coinmetrics.io/search-results?query=adrbalusd1cnt) 
* [AdrBalUSD10Cnt](https://coverage.coinmetrics.io/search-results?query=adrbalusd10cnt)
* [AdrBalUSD100Cnt](https://coverage.coinmetrics.io/search-results?query=adrbalusd100cnt)
* [AdrBalUSD1KCnt](https://coverage.coinmetrics.io/search-results?query=adrbalusd1kcnt)
* [AdrBalUSD10KCnt](https://coverage.coinmetrics.io/search-results?query=adrbalusd10kcnt)
* [AdrBalUSD100KCnt](https://coverage.coinmetrics.io/search-results?query=adrbalusd100kcnt)
* [AdrBalUSD1MCnt](https://coverage.coinmetrics.io/search-results?query=adrbalusd1mcnt)
* [AdrBalUSD10MCnt](https://coverage.coinmetrics.io/search-results?query=adrbalusd10mcnt)

# New Funded Address Count <a href="#new_funded" id="new_funded"></a>

## **Definition**

The sum count of all unique addresses that were newly created and funded (e.g. have a non-zero balance) that interval.

## **Dictionary**

| Name          | **MetricID** | **Category** | **Sub-category** | **Type** | **Unit**  | **Interval** |
| ------------- | ------------ | ------------ | ---------------- | -------- | --------- | ------------ |
| New Addresses | [AdrNewBalCnt](https://coverage.coinmetrics.io/search-results?query=AdrNewBalCnt) | Addresses    | Activity         | Sum      | Addresses | 1 day        |

## **Details**

* [Addresses](../../on-chain-basics.md#address) are the user-identifiers in a ledger change.
* New addresses are addresses identified in the blockchain that did not exist prior to the observation period (e.g. 1 day).
* Depending upon how a blockchain stores address information, new addresses might not be funded with any tokens. In other words, they have a balance of zero.
* This metric only accounts for new addresses that have been funded.

## **Chart**

[New Addr Cnt](https://docs.coinmetrics.io/asset-metrics/adresses/adrnewcnt) showcases all new addresses observed in the network over the previous day, and New Funded Addr Cnt is a subset of New Addr Cnt that only counts addresses with a balance greater than 0.

![Source: CM Network Data Charts](<../../../.gitbook/assets/9 - New Addresses.png>)

## **Asset-Specific Details**

This metric is not available for assets that have full privacy, like Monero and Grin. For assets that have opt-in privacy features, like ZCash, it only takes the non-private activities into account.

## **Examples**

Consider the following example:

* Both Addreses A and Address B are seen on the ledger for the first time.
* Address A was referred by a smart contract application, perhaps as user identifier, but it was not funded or otherwise engaged by the smart contract. Its balance is zero.
* During that same interval, Address B received funds from an exhange for the first time. Its balance is 0.002.

If the above was the only activity observed in the network during that interval, AdrNewCnt would showcase a value of 1. This value only aggregates activity that is economically relevant (Address B), and excludes non-monetary activity (Address A).

## **Release History**

* Release Version: 5.0 (August, 2021)

## **Interpretation**

* Like Active Addresses, New Funded Addresses is a popular measure to proxy the number of new users on a blockchain. Unlike New Addr Cnt, this only showcases addresses with a non-zero balance .

## **See Also**

* [New Addr Cnt](adrnewcnt.md)
* [Address](../../on-chain-basics.md#address)
* [Active Addresses (Received)](adractreccnt.md)
* [Active Addresses (Sent)](adractsentcnt.md)

## Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/AdrActCnt" %}

# New Address Count <a href="#new" id="new"></a>

## **Definition**

The sum count of all unique addresses that were newly created that interval.

## **Dictionary**

| Name          | **MetricID** | **Category** | **Sub-category** | **Type** | **Unit**  | **Interval** |
| ------------- | ------------ | ------------ | ---------------- | -------- | --------- | ------------ |
| New Addresses | [AdrNewCnt](https://coverage.coinmetrics.io/search-results?query=AdrNewCnt)    | Addresses    | Activity         | Sum      | Addresses | 1 day        |

## **Details**

* [Addresses](../../on-chain-basics.md#address) are the user-identifiers in a ledger change.
* New addresses are addresses identified in the blockchain that did not exist prior to the observation period (e.g. 1 day).
* Depending upon how a blockchain stores address information, new addresses might not be funded with any tokens. In other words, they have a balance of zero.
* As such, a caveat of this metric is that it can be inflated by activity that is not economicallt relevant.
* For new addresses that are funded and are economically relevant, please refer to New Funded Adrr Cnt (AdrNewBalCnt).

## **Chart**

New Addr Cnt showcases all new addresses observed in the network over the previous day, and [New Funded Addr Cnt](https://docs.coinmetrics.io/asset-metrics/adresses/adrnewbalcnt) is a subset of New Addr Cnt that only counts addresses with a balance greater than 0.

![Source: CM Network Data Charts](<../../../.gitbook/assets/9 - New Addresses.png>)

## **Asset-Specific Details**

* This metric is not available for assets that have full privacy, like Monero and Grin. For assets that have opt-in privacy features, like ZCash, it only takes the non-private activities into account.

## **Examples**

Consider the following example:

* Both Addreses A and Address B are seen on the ledger for the first time.
* Address A was referred by a smart contract application, perhaps as user identifier, but it was not funded or otherwise engaged by the smart contract. Its balance is zero.
* During that same interval, Address B received funds from an exhange for the first time. Its balance is 0.002.

If the above was the only activity observed in the network during that interval, AdrNewCnt would showcase a value of 2. This value aggregates activity that is economically relevant (Address B) as well as non monetary (Address A).

## **Release History**

* Release Version: 5.0 (August, 2021)

## **Interpretation**

* Like Active Addresses, New Addresses is a popular measure to proxy the number of _new_ users on a blockchain. However, in blockchains where address creation is cheap, or free, new addresses can still be trivially forged.

## **See Also**

* [New Funded Addr Cnt](adrnewbalcnt.md)
* [Address](../../on-chain-basics.md#address)
* [Active Addresses (Received)](adractreccnt.md)
* [Active Addresses (Sent)](adractsentcnt.md)

## Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/AdrActCnt" %}

# API Endpoints

Address Balances can be accessed using these endpoints:

* `timeseries/asset-metrics` 

and by passing in the metric IDs in the `metrics` parameter.

{% swagger src="../../.gitbook/assets/openapi.yaml" path="/timeseries/asset-metrics" method="get" %}
[openapi.yaml](../../.gitbook/assets/openapi.yaml)
{% endswagger %}

{% tabs %}
{% tab title="Shell" %}
```shell
curl --compressed "https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=AdrBal1in10BCnt&assets=btc&pretty=true&api_key=<your_key>"
```
{% endtab %}

{% tab title="Python" %}
```python
import requests
response = requests.get('https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=AdrBal1in10BCnt&assets=btc&pretty=true&api_key=<your_key>').json()
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
        metrics="AdrBal1in10BCnt", 
        assets='btc',
    ).to_dataframe()
)
```
{% endtab %}
{% endtabs %}



