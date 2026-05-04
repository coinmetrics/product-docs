# Valuation

### Contents

* [Network Value to Transactions (NVTAdj)](valuation.md#nvt)
* [Network Value to Transactions Free Float (NVTAdjFF)](valuation.md#nvtff)
* [Realized Cap to Thermo Cap (RCTC)](valuation.md#rctc)
* [RVT Ratio (RVT)](valuation.md#rvt)
* [Spent Output Price Ratio (SOPR)](valuation.md#sopr)
* [Net Unrealized Profit/Loss (NUPL)](valuation.md#nupl)
* Long-Term and Short-Term Holder SOPR (SOPRLthX)

## Network Value to Transactions <a href="#nvt" id="nvt"></a>

### Definition

The ratio of the network value (or market capitalization, current supply) divided by the adjusted transfer value. Also referred to as NVT.

| Name                  | MetricID                                                                  | Unit          | Interval |
| --------------------- | ------------------------------------------------------------------------- | ------------- | -------- |
| NVT                   | [NVTAdj](https://coverage.coinmetrics.io/search-results?query=NVTAdj)     | Dimensionless | 1 day    |
| NVT 90-day Moving Avg | [NVTAdj90](https://coverage.coinmetrics.io/search-results?query=NVTAdj90) | Dimensionless | 1 day    |

### Details

* This metric uses the native units network value and adjusted transaction volume. It is therefore available at the asset’s genesis, unlike if it was using USD values.
* It can be thought of as a rough P/E (price to earnings) ratio proxy for crypto assets.
* First conceptualized by Willy Woo (2017) with the introduction of the network value to transactions (NVT) ratio, calculated as a cryptoasset’s market capitalization divided by its daily value transacted over the network. The logic behind the ratio is that value transacted over an asset’s network represents the utility of a cryptoasset. High values of the NVT ratio have detected bubbles and low values have indicated attractive entry points in the past.
* NVTAdj90 is computed as the current market cap over the 90-day moving average of USD adjusted transfer volume.
* Inspired by Kalichkin’s work. [Kalichkin (2018a)](https://medium.com/cryptolab/https-medium-com-kalichkin-rethinking-nvt-ratio-2cf810df0ab0) extended the idea behind the NVT ratio by introducing additional smoothing to correct for certain shortcomings in the original formulation that prevent it from being used as a real-time trading indicator.

### **Release History**

* Released in the 1.0 release of NDP

### Interpretation

NVT has been much discussed; in short, it compares market capitalization to on-chain transactional usage. Blockchains with low usage relative to market cap have a higher NVT. In this sense it can be understood as the opposite of velocity. Due to structural dissimilarities in blockchain usage modes, NVTs among all assets are not directly comparable. Our formulation employs adjusted transaction volume, as we understand this to be a purer measure of the actual usage of the chain.

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/NVTAdj" %}

{% embed url="https://coverage.coinmetrics.io/asset-metrics/NVTAdj90" %}

## Network Value to Transactions Free Float <a href="#nvtff" id="nvtff"></a>

### Definition

The ratio of the free float network value (or market capitalization, free float) divided by the adjusted transfer value. Also referred to as FFNVT.

| Name                             | MetricID                                                                  | Unit          | Interval |
| -------------------------------- | ------------------------------------------------------------------------- | ------------- | -------- |
| Free Float NVT                   | [NVTAdjFF](https://coverage.coinmetrics.io/search-results?query=NVTAdj)   | Dimensionless | 1 day    |
| Free Float NVT 90-day Moving Avg | [NVTAdjFF90](https://coverage.coinmetrics.io/search-results?query=NVTAdj) | Dimensionless | 1 day    |

### Details

* This metric provides an important adjustment to the Network Value to Transaction (NVT) Ratio using Free Float Supply (SplyFF)
* For more details on the significance of this improvement, please refer to the following [blog post](https://coinmetrics.io/introducing-free-float-supply/).
* This metric uses the native units network value and adjusted transaction volume. It is therefore available at the asset’s genesis, unlike if it was using USD values.
* It can be thought of as a rough P/E (price to earnings) ratio proxy for crypto assets.
* NVT was first conceptualized by Willy Woo (2017) with the introduction of the network value to transactions (NVT) ratio, calculated as a cryptoasset’s market capitalization divided by its daily value transacted over the network. The logic behind the ratio is that value transacted over an asset’s network represents the utility of a cryptoasset. High values of the NVT ratio have detected bubbles and low values have indicated attractive entry points in the past.

### **Release History**

* Release Version: NDP-EOD 4.8 (Nov, 2020)

### Interpretation

NVT has been much discussed; in short, it compares market capitalization to on-chain transactional usage. Blockchains with low usage relative to market cap have a higher NVT. In this sense it can be understood as the opposite of velocity. Due to structural dissimilarities in blockchain usage modes, NVTs among all assets are not directly comparable. Our formulation employs adjusted transaction volume, as we understand this to be a purer measure of the actual usage of the chain.

### See Also

* [NVT](../../economics/nvtadj.md)
* [Free Float NVT 90-day Moving Avg](../../economics/nvtadjff90.md)

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/NVTAdjFF" %}
[<br>](https://docs.coinmetrics.io/asset-metrics/economics/nvtadjff)
{% endembed %}

## Realized Cap to Thermo Cap (RCTC) <a href="#rctc" id="rctc"></a>

### Definition

The ratio of the Realized Cap over Thermo Cap at the end of that interval. [Realized Cap](broken-reference/) (CapRealUSD) is defined as the sum USD value based on the USD closing price on the day that a native unit last moved (i.e., last transacted) for all native units. Thermo Cap is calculated as RevAllTimeUSD and it represents the USD value of all funds disbursed to miners at the time of issuance.

| Name                              | IMetricD                                                          | Unit          | Interval |
| --------------------------------- | ----------------------------------------------------------------- | ------------- | -------- |
| Realized Cap to Thermo Cap (RCTC) | [RCTC](https://coverage.coinmetrics.io/search-results?query=RCTC) | Dimensionless | 1 day    |

### Details

* Like [MVRV](broken-reference/), RCTC can be used to better understand the market cycle as it identifies the ralationship between the network's overall cost basis (CapRealUSD) relative to the USD amount issued to miners by the protocol (RevAllTimeUSD).
* When evaluating market tops, RCTC provides a view on the realization of profits relative to the liquidity that is being issued to miners.
* Miners are speculators as they are naturally exposed to the price of the currency they are mining. As such, they collectively make buy or sell decisions that ultimately impact the market.

### Chart

![](<../../../.gitbook/assets/coin_metrics_network_chart(2) (1).png>)

### Interpretation

* This metric fundamentally showcases the impact of miner liquity in the overall market. When the USD value of miner income is low relative to what is being realized on-chain, this could be interpreted as a sign of market tops.
* This metric could also be interpreted as the profit margin that might be realized by miners as it showcases the gap between profit taking.
* Historically, a threshold of 10 has been indicative of market tops as a wide profit margins are being realized relative to the USD value being issued to miners.

### Asset-Specific Details

Only applicable to assets for which we have RevAllTimeUSD and CapRealUSD.

### Release History

* Release Version: NDP 5.0 (August, 2021)

### See Also:

* [MCRC (Market Cap / Realized Cap)](../../economics/miner-cap-to-realized-cap-mcrc.md)
* [MVRV (Market Cap / Realized Market Cap)](broken-reference/)

### Availability for Assets

{% embed url="https://docs.coinmetrics.io/info/metrics/CapMVRVFF" %}

## RVT <a href="#rvt" id="rvt"></a>

### Definition

The ratio of the network's realized value to its adjusted transfer value. Also referred to as RVT.

| Name                  | MetricID                                                                  | Unit          | Interval |
| --------------------- | ------------------------------------------------------------------------- | ------------- | -------- |
| RVT                   | [RVT](https://coverage.coinmetrics.io/search-results?query=RVTAdj90)      | Dimensionless | 1 day    |
| RVT 90-day Moving Avg | [RVTAdj90](https://coverage.coinmetrics.io/search-results?query=RVTAdj90) | Dimensionless | 90 days  |

### Details

* Computed as realized value (aka realized market cap) over adjusted transfer value.
* [Checkmate (2019)](https://medium.com/@_Checkmatey_/the-bitcoin-rvt-ratio-a-high-conviction-macro-indicator-615b68715b77) formulates the realized capitalization to transaction value (RVT) ratio which uses the same fundamental principles behind the NVT ratio but uses realized capitalization instead of market capitalization in the numerator of the ratio.
* RVTAdj90 is computed as the network's realized value (aka realized market cap) over the 90-day moving average of USD adjusted transfer volume.

### Release History

* Release Version: NDP-EOD 4.8 (Nov, 2020)

### Interpretation

RVT is based on the same principles as NVT but uses Realized Cap in the numerator. Realized Cap can be a smoother measure of network valuation than the Market Cap as it is concerned with the price at which the coin was last moved on-chain. As a result, both Realized Cap and the RVT are shielded from day-to-day market sentiment and speculation that are reflected in Market Cap.

RVT can be a slower moving, higher conviction signal tuned to the macro sentiment of HODLers.

### See Also

* [Realized Market Cap (USD)](broken-reference/)
* [RVT 90-day Moving Avg](../../economics/rvtadj90.md)

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/RVTAdj" %}

## Spent Output Profit Ratio (SOPR) <a href="#sopr" id="sopr"></a>

### Definition

The ratio of the sum of spent value over the sum of creation value of all spent and created outputs for that interval. There are two versions of this metric. For this version, a spent output’s “spent value” is the market value of the sum of all native units of that output (i.e., price multiplied by the sum of native units). A created output’s “creation value” is the market value of the sum of all native units of that output (i.e., price multiplied by the sum of native units).

| Name     | MetricID                                                             | Unit          | Interval |
| -------- | -------------------------------------------------------------------- | ------------- | -------- |
| SOPR     | [SOPR](https://coverage.coinmetrics.io/search-results?query=SOPR)    | Dimensionless | 1 day    |
| SOPR Out | [SOPROut](https://coverage.coinmetrics.io/search-results?query=SOPR) | Dimensionless | 1 day    |

### Details

* (Sum of spent value) / (Sum of creation value) of all spent and created outputs for that interval)
* Sum of creation value = Sum of all transactional outputs that interval multiplied by the closing price for that interval
* SOPR was introduced by Renato Shirakashi.
* It oscillates around 1, if below it, people spending are realizing losses, above it, realizing gains.
* SOPROut is our first implementation of SOPR which doesn’t weight outputs by their value.
* SOPROut oscillates around 1, if it is below 1, people spending are realizing losses, above 1, realizing gains.

### Asset-Specific Details

* This metric is not available for assets that have full privacy, like Monero, Grin.
* For assets that have opt-in privacy features, like ZCash, it only takes the non-private balances into account.

### Chart

![](../../../.gitbook/assets/SOPR.png)

The chart above shows the combined SOPR ratio of all UTXOs spent, aggregated on a daily basis. The metric is also smoothed with a 7-day rolling average as SOPR tends to be relatively volatile.

On January 8th 2021, as BTC price topped $40K, BTC SOPR (7-day average) reached 1.048, its highest level since December 2017. The following day BTC price began to decline, and SOPR bottomed out at 1.004 on January 26th with BTC price at $32.6K. It has since rebounded to about 1.015.

### Example

* If in a given day, 3 outputs are spent:
  * \*\* Output A, value 10 BTC, created when BTC was worth $10
  * \*\* Output B, value 1 BTC, created when BTC was worth $500
  * \*\* Output C, value 2 BTC, created when BTC was worth $20,000
* If market price is $7,500, SOPR for that day is computed as:
  * \*\* Sum creation values: $10 \* 10 BTC + $500 \* 1 BTC + $20,000 \* 2 BTC = $40,600
  * \*\* Sum spent values: $7,500 \* 10 BTC + $7,500 \* 1 BTC + $7,500 \* 2 BTC = $97,500
  * \*\* SOPR = $97,500 /$40,600 = 2.4014

### Release History

* Released in the 5.0 release of NDP

### Interpretation

Spent Output Profit Ratio (SOPR) gives another vantage point into bitcoin market cycles. Introduced [by Renato Shirakashi in 2019](https://medium.com/unconfiscatable/introducing-sopr-spent-outputs-to-predict-bitcoin-lows-and-tops-ceb4536b3b9), SOPR can act as a proxy for gauging whether holders are selling at a profit or at a loss.

SOPR is a ratio of bitcoin’s price at the time UTXOs are spent to its price at the time they were created. In other words, it’s a proxy for price sold divided by price paid. Every time a transaction occurs, we can compare bitcoin’s price at the time the UTXOs in that transaction were created to the price at which they were spent. Creating a ratio of the two gives a simple way to estimate whether the bitcoin in the UTXO was sold at a profit or loss.

SOPR can be computed for individual UTXOs, but it can also be computed for a group of UTXOs.

Historically, a high SOPR has signaled that bitcoin price is reaching a local maximum. Conversely, a low SOPR theoretically signals that holders are selling at a loss, which has historically indicated a good time to buy. A SOPR of 1 is also particularly important to watch, as it signals the tipping point from selling in profit to selling at a loss.

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/SOPR" %}

## Net Unrealized Profit/Loss (NUPL) <a href="#nupl" id="nupl"></a>

### Definition

NUPL measures the proportion of an asset's market cap that represents unrealized profit or loss among all coins in circulation.

| Name | MetricID | Unit          | Interval |
| ---- | -------- | ------------- | -------- |
| NUPL | NUPL     | Dimensionless | 1 day    |

### Details

* Calculated as: (CapMrktCurUSD - CapRealUSD)/CapMrktCurUSD

### Interpretation

It indicates whether the market, on average, is in a state of unrealized gain (positive) or loss (negative), reflecting investor sentiment and potential market phases.

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics-v2/NUPL" %}

## Long-Term and Short-Term Holder SOPR

### Definition

Long-Term and Short-Term Holder SOPR metrics segment the traditional SOPR calculation based on the age of the UTXOs being spent. These metrics separate profit/loss realization behavior between holders who have held their positions for different time periods, providing deeper insights into market dynamics by distinguishing between committed long-term investors and more active short-term traders.

There are two versions of this metric, one weighted by the value of each output and the other unweighted.

| Name                                                                                         | MetricID                                  | Unit          | Interval |
| -------------------------------------------------------------------------------------------- | ----------------------------------------- | ------------- | -------- |
| Spent Output Profit Ratio (SOPR) 30 day Long-Term Holder / Short-Term Holder                 | SOPRLth30d / SOPRSth30d                   | Dimensionless | 1 day    |
| Spent Output Profit Ratio (SOPR) 90 day Long-Term Holder / Short-Term Holder                 | <p>SOPRLth90d /<br>SOPRSth90d</p>         | Dimensionless | 1 day    |
| Spent Output Profit Ratio (SOPR) 155 day Long-Term Holder / Short-Term Holder                | <p>SOPRLth155d /<br>SOPRSth155d</p>       | Dimensionless | 1 day    |
| Spent Output Profit Ratio (SOPR) 1 year Long-Term Holder / Short-Term Holder                 | <p>SOPRLth1y /<br>SOPRSth1y</p>           | Dimensionless | 1 day    |
| Spent Output Profit Ratio (SOPR) 5 years Long-Term Holder / Short-Term Holder                | <p>SOPRLth5y /<br>SOPRSth5y</p>           | Dimensionless | 1 day    |
| Spent Output Profit Ratio Unweighted (SOPR Out) 30 day Long-Term Holder / Short-Term Holder  | <p>SOPRLthOut30d /<br>SOPRSthOut30d</p>   | Dimensionless | 1 day    |
| Spent Output Profit Ratio Unweighted (SOPR Out) 90 day Long-Term Holder / Short-Term Holder  | <p>SOPRLthOut90d /<br>SOPRSthOut90d</p>   | Dimensionless | 1 day    |
| Spent Output Profit Ratio Unweighted (SOPR Out) 155 day Long-Term Holder / Short-Term Holder | <p>SOPRLthOut155d /<br>SOPRSthOut155d</p> | Dimensionless | 1 day    |
| Spent Output Profit Ratio Unweighted (SOPR Out) 1 year Long-Term Holder / Short-Term Holder  | <p>SOPRLthOut1y /<br>SOPRSthOut1y</p>     | Dimensionless | 1 day    |
| Spent Output Profit Ratio Unweighted (SOPR Out) 5 years Long-Term Holder / Short-Term Holder | <p>SOPRLthOut5y /<br>SOPRSthOut5y</p>     | Dimensionless | 1 day    |

### Details

The Long-Term and Short-Term Holder SOPR metrics use the same fundamental calculation as the traditional SOPR but apply filters based on the age of UTXOs:

**For SOPRLth (Long-Term Holders):**

* Only includes UTXOs that were created more than X days/years ago
* Calculation: (Sum of spent value of old UTXOs) / (Sum of creation value of old UTXOs)

**For SOPRSth (Short-Term Holders):**

* Only includes UTXOs that were created X days/years ago or less
* Calculation: (Sum of spent value of recent UTXOs) / (Sum of creation value of recent UTXOs)

**Weighted vs Unweighted Versions:**

Like the traditional SOPR, these metrics come in two variants:

1. **Weighted (SOPR):** Value-weighted by the size of each output
2. **Unweighted (SOPROut):** Each output is treated equally regardless of size

The unweighted versions are denoted with "Out" suffix (e.g., SOPRLthOut155d, SOPRSthOut155d).

Both versions oscillate around 1:

* Values > 1 indicate holders are realizing gains on average
* Values < 1 indicate holders are realizing losses on average
* Values = 1 indicate break-even realization

### Example

Using data from October 15, 2023, with a 155-day threshold:

* **SOPR (All):** 1.0019 - Overall market slightly profitable
* **SOPR Long-Term Holders (155d):** 1.0953 - Long-term holders realizing \~9.5% profits
* **SOPR Short-Term Holders (155d):** 1.0084 - Short-term holders barely profitable at \~0.8%
* **SOPR Out (All):** 0.9732 - Unweighted average shows slight losses
* **SOPR Out Long-Term Holders (155d):** 0.9133 - Most long-term holder transactions at loss
* **SOPR Out Short-Term Holders (155d):** 1.0064 - Most short-term holder transactions slightly profitable

This example demonstrates how the weighted vs unweighted versions can tell different stories. While large long-term holders were realizing substantial profits (SOPRLth155d = 1.0953), the majority of long-term holder transactions by count were actually at a loss (SOPRLthOut155d = 0.9133), suggesting that smaller holders were selling at losses while larger holders captured gains.

### Interpretation

Long-Term and Short-Term Holder SOPR metrics provide nuanced insights into market behavior:

**Long-Term Holder SOPR Patterns:**

* High values often coincide with market tops, as committed holders finally take profits
* Sharp increases can signal capitulation events where even long-term holders sell
* Sustained values above 1.5-2.0 historically indicate overheated market conditions
* Values consistently below 1 may suggest strong conviction among long-term holders to hold despite losses

**Short-Term Holder SOPR Patterns:**

* Generally more range-bound and closer to 1 due to frequent trading
* Quick oscillations around 1 reflect active trading and price discovery
* Extreme values (very high or low) are less common but can signal intense short-term sentiment
* Divergences with long-term holder SOPR can indicate shifts in market regime

**Time Threshold Selection:**

* **30d/90d:** Captures very short-term vs medium-term holder behavior
* **155d:** Approximately one market cycle, widely used benchmark
* **1y:** Separates annual traders from multi-year investors
* **5y:** Distinguishes true long-term hodlers from shorter-term positions

**Analytical Applications:**

* **Market Timing:** Extreme divergences between LTH and STH SOPR can signal regime changes
* **Sentiment Analysis:** LTH SOPR spikes may indicate distribution phases
* **Risk Management:** High STH SOPR with low LTH SOPR suggests short-term speculation
* **Cycle Analysis:** Compare across different time thresholds to understand holder behavior evolution

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics-v2/SOPRLth30d" %}

## API Endpoints

Address Balances can be accessed using these endpoints:

* `timeseries/asset-metrics`

and by passing in the metric ID's `NVT*` , `RVT*` and `SOPR*` in the `metrics` parameter.

{% openapi src="../../../.gitbook/assets/openapi.yaml" path="/timeseries/asset-metrics" method="get" %}
[openapi.yaml](../../../.gitbook/assets/openapi.yaml)
{% endopenapi %}

{% tabs %}
{% tab title="Shell" %}
```shell
curl --compressed "https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=MCRC&assets=btc&pretty=true&api_key=<your_key>"
```
{% endtab %}

{% tab title="Python" %}
```python
import requests
response = requests.get('https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=MCRC&assets=btc&pretty=true&api_key=<your_key>').json()
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
        metrics="NVTAdj", 
        assets='btc',
    ).to_dataframe()
)
```
{% endtab %}
{% endtabs %}
