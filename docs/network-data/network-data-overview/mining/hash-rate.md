# Contents

* [Mean Hash Rate](hash-rate.md#hashrate)
* [Mean Hash Rate, 30 Day](hash-rate.md#hashrate30d)
* [Yearly Avg. Miner Revenue per Hash](hash-rate.md#revhash1yavg)
* [Miner Revenue per Hash](hash-rate.md#revhash)
* [Miner Revenue per Hash per Sec](hash-rate.md#revhash1yavg)


# Mean Hash Rate<a href="#hashrate" id="hashrate"></a>

## Definition

The mean rate at which miners are solving hashes that day. Hash rate is the speed at which computations are being completed across all miners in the network. The unit of measurement varies depending on the protocol.

| Name           | MetricID | Category | Subcategory | Type | Unit   | Interval |
| -------------- | -------- | -------- | ----------- | ---- | ------ | -------- |
| Mean Hash Rate | HashRate | Mining   | Hash Rate   | Mean | Varies | 1 day    |

## Asset-Specific Details

* Post Ethereum Merge, Miner Metrics are no longer calculated
* Hash rate is derived from difficulty (DiffMean), the rate at which block came in (BlkIntMean) and depending on the protocols, some other pieces of data. It gives an estimate of how much hash power is mining a given chain.

## Chart

<figure><img src="../../.gitbook/assets/Coin_Metrics_Network_Data_2022-09-15T15-37 (1).png" alt=""><figcaption><p>Source: CM Network Data Charts</p></figcaption></figure>

| Asset          | Formula                                               | Hash Rate Unit |
| -------------- | ----------------------------------------------------- | -------------- |
| BTC, BCH, BSV  | (BlkCnt / 144) \* DiffMean \* ((2^32 / 10^12) / 600)) | TH/s           |
| DASH, BTG, VTC | Daily chainwork / 86400 / 10^9                        | GH/s           |
| LTC            | (BlkCnt / 576) \* DiffMean \* ((2^32 / 10^12) / 150)) | TH/s           |
| XMR            | (BlkCnt / 720) \* DiffMean \* 1000000                 | MH/s           |
| ZEC            | ((DiffMean / 150) \* 7000) / 10^9                     | GH/s           |
| ETH, ETC       | (DiffMean / BlkIntMean) / 10^12                       | TH/s           |

## Release History

* Released in the 1.0 release of NDP

## Interpretation

Given that proof-of-work cryptocurrencies share a great variety of algorithms, with widely diverging features, hashrate is not comparable between them. The exception is cases where distinct assets share the same hash function, as is the case with BTC, BCH, and BSV for instance. To benchmark security between assets with different hash functions, a metric like security spend (Issuance, Total, USD) might be consulted instead.

## See Also

* [Mean Hash Rate, 30 Day](hashrate30d.md)

## Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/HashRate" %}


# Mean Hash Rate, 30 Day<a href="#hashrate30d" id="hashrate30d"></a>

## Definition

The mean rate at which miners are solving hashes over the last 30 days. Hash rate is the speed at which computations are being completed across all miners in the network. The unit of measurement varies depending on the protocol

| Name                   | MetricID    | Category | Subcategory | Type | Unit   | Interval |
| ---------------------- | ----------- | -------- | ----------- | ---- | ------ | -------- |
| Mean Hash Rate, 30 Day | HashRate30d | Mining   | Hash Rate   | Mean | Varies | 1 day    |

## Asset-Specific Details

* Post Ethereum Merge, Miner Metrics are no longer calculated

## Release History

* Released in the version 4.9 of Network Data Pro

## See Also

* [Mean Hash Rate](hashrate.md)

## Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/HashRate30d" %}

# Yearly Avg. Miner Revenue per Hash<a href="#revhash1yavg" id="revhash1yavg"></a>

## Definition

The trailing one-year average miner reward per estimated hash unit performed during the period. The unit of hashpower measurement depends on the protocol.

## Dictionary

| Name                                     | MetricID        | Category | Subcategory | Type | Unit | Interval |
| ---------------------------------------- | --------------- | -------- | ----------- | ---- | ---- | -------- |
| Yearly Avg. Miner Revenue per Hash (native units) | RevHash1yAvgNtv | Mining   | Revenue     | Mean | Native Units | 1 day    |
| Yearly Avg. Miner Revenue per Hash (USD) | RevHash1yAvgUSD | Mining   | Revenue     | Mean | USD  | 1 day    |

## Details

* Hash rate calculations are specific to a protocol's mining algorithm, which often targets a time in between blocks.
* Below are formulas and measurement units associated with each of the supported assets.

<table><thead><tr><th>Asset</th><th width="218.7027804410355">Hashrate Formula</th><th>Unit</th></tr></thead><tbody><tr><td>BTC, BCH, BSV</td><td>(BlkCnt / 144) * DiffMean * ((2^32 / 10^12) / 600))</td><td>TH/s</td></tr><tr><td>DASH, BTG, VTC</td><td>Daily chainwork / 86400 / 10^9</td><td>GH/s</td></tr><tr><td>LTC</td><td>(BlkCnt / 576) * DiffMean * ((2^32 / 10^12) / 150))</td><td>TH/s</td></tr><tr><td>XMR</td><td>(BlkCnt / 720) * DiffMean * 1000000</td><td>MH/s</td></tr><tr><td>ZEC</td><td>((DiffMean / 150) * 7000) / 10^9</td><td>GH/s</td></tr><tr><td>ETH, ETC</td><td>(DiffMean / BlkIntMean) / 10^12</td><td>TH/s</td></tr></tbody></table>

## Release History

* Released in Network Data Pro (NDP) version 5.1&#x20;

## Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/RevHash1yAvgUSD" %}

# Miner Revenue per Hash<a href="#revhash" id="revhash"></a>

## Definition

The mean miner reward per estimated hash unit performed during the period, in native units. The unit of hashpower measurement depends on the protocol.

| Name                                  | MetricID   | Category | Subcategory | Type | Unit         | Interval |
| ------------------------------------- | ---------- | -------- | ----------- | ---- | ------------ | -------- |
| Miner Revenue per Hash (native units) | RevHashNtv | Mining   | Revenue     | Mean | Native units | 1 day    |
| Miner Revenue per Hash (USD) | RevHashUSD | Mining   | Revenue     | Mean | USD  | 1 day    |

## Asset-Specific Details

* Post Ethereum Merge, Miner Metrics have been deprecated&#x20;
* Hash rate calculations are specific to a protocol's mining algorithm, which often targets a time in between blocks.
* Below are formulas and measurement units associated with each of the supported assets.

<table><thead><tr><th>Asset</th><th width="218.7027804410355">Hashrate Formula</th><th>Unit</th></tr></thead><tbody><tr><td>BTC, BCH, BSV</td><td>(BlkCnt / 144) * DiffMean * ((2^32 / 10^12) / 600))</td><td>TH/s</td></tr><tr><td>DASH, BTG, VTC</td><td>Daily chainwork / 86400 / 10^9</td><td>GH/s</td></tr><tr><td>LTC</td><td>(BlkCnt / 576) * DiffMean * ((2^32 / 10^12) / 150))</td><td>TH/s</td></tr><tr><td>XMR</td><td>(BlkCnt / 720) * DiffMean * 1000000</td><td>MH/s</td></tr><tr><td>ZEC</td><td>((DiffMean / 150) * 7000) / 10^9</td><td>GH/s</td></tr><tr><td>ETH, ETC</td><td>(DiffMean / BlkIntMean) / 10^12</td><td>TH/s</td></tr></tbody></table>

## Release History

* Release Version: NDP-EOD 4.8 (Nov, 2020)

## Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/RevHashNtv" %}

# Miner Revenue per Hash per Sec<a href="#revhashrate" id="revhashrate"></a>

## Definition

The mean daily miner reward per estimated hash unit per second performed during the period, in native units. The unit of hashpower measurement depends on the protocol.

| Name                                          | MetricID       | Category | Subcategory | Type | Unit         | Interval |
| --------------------------------------------- | -------------- | -------- | ----------- | ---- | ------------ | -------- |
| Miner Revenue per Hash per Sec (native units) | RevHashRateNtv | Mining   | Hash Rate   | Mean | Native units | 1 day    |
| Miner Revenue per Hash per Sec (USD) | RevHashRateUSD | Mining   | Hash Rate   | Mean | USD  | 1 day    |

## Asset-Specific Details

* Post Ethereum Merge, Miner Metrics have been deprecated&#x20;
* Hash rate calculations are specific to a protocol's mining algorithm, which often targets a time in between blocks.
* Below are formulas and measurement units associated with each of the supported assets.

<table><thead><tr><th>Asset</th><th width="218.7027804410355">Hashrate Formula</th><th>Unit</th></tr></thead><tbody><tr><td>BTC, BCH, BSV</td><td>(BlkCnt / 144) * DiffMean * ((2^32 / 10^12) / 600))</td><td>TH/s</td></tr><tr><td>DASH, BTG, VTC</td><td>Daily chainwork / 86400 / 10^9</td><td>GH/s</td></tr><tr><td>LTC</td><td>(BlkCnt / 576) * DiffMean * ((2^32 / 10^12) / 150))</td><td>TH/s</td></tr><tr><td>XMR</td><td>(BlkCnt / 720) * DiffMean * 1000000</td><td>MH/s</td></tr><tr><td>ZEC</td><td>((DiffMean / 150) * 7000) / 10^9</td><td>GH/s</td></tr><tr><td>ETH, ETC</td><td>(DiffMean / BlkIntMean) / 10^12</td><td>TH/s</td></tr></tbody></table>

## Release History

* Released in the version 4.9 of Network Data Pro

## Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/RevHashRateNtv" %}

# API Endpoints

Hash Rate metrics can be accessed using these endpoints:

* `timeseries/asset-metrics`

and by passing in the metric ID's `HashRate*` in the `metrics` parameter.

{% swagger src="../../.gitbook/assets/openapi.yaml" path="/timeseries/asset-metrics" method="get" %}
[openapi.yaml](../../.gitbook/assets/openapi.yaml)
{% endswagger %}

{% tabs %}
{% tab title="Shell" %}
```shell
curl --compressed "https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=HashRate&assets=btc&pretty=true&api_key=<your_key>"
```
{% endtab %}

{% tab title="Python" %}
```python
import requests
response = requests.get('https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=HashRate&assets=btc&pretty=true&api_key=<your_key>').json()
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
        metrics="HashRate", 
        assets="btc",
    ).to_dataframe()
)
```
{% endtab %}
{% endtabs %}
