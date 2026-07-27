# Institution Metrics

## Overview

Institution metrics are daily fund-level statistics for institutional digital asset investment products such as exchange-traded funds and investment trusts. Each metric answers one question about one product on one reporting day: how large the product is, what a share is worth, what a share traded at, how many shares exist, and how much of the underlying asset backs each share. Analysts use them to track institutional adoption and asset flows, to measure the premium or discount at which a product trades against its net asset value, and to follow the effect of management fees on a product's holdings over time.

The endpoint is a general institution surface rather than a product-specific one. An institution is any entity that publishes named daily values, and each one carries its own set of metrics. Grayscale Investments is currently the only institution in the coverage universe, so every metric described on this page belongs to a Grayscale product.

## At a Glance

<table data-full-width="true"><thead><tr><th>Data type</th><th>Entities</th><th width="159">Frequency / cadence</th><th>Unit</th><th>Primary endpoint</th><th>Coverage</th></tr></thead><tbody><tr><td>Institution metrics (investment product fund statistics)</td><td>Institutions (currently <code>grayscale</code> only)</td><td>1d, on U.S. business days</td><td>USD, shares, or native units, per metric</td><td><code>/timeseries/institution-metrics</code></td><td><a href="https://docs.coinmetrics.io/api/v4/#operation/getCatalogAllV2InstitutionMetrics">🔗</a></td></tr></tbody></table>

## Metrics

There are 222 institution metrics, covering 48 investment products across 5 metric types. Every metric name joins a product identifier to a metric type with an underscore:

`<product>_<metric>`

So `gbtc_total_assets` is the assets under management of the Grayscale Bitcoin Trust ETF, and `sol_coin_per_share` is the coin per share of the Grayscale Solana Trust. Because the names are generated combinatorially, the metric types and the product identifiers are listed separately below rather than as one row per metric. Substitute a product identifier into the placeholder to build a valid metric name.

### Metric types

Each metric type is reported once per reporting day for every product that publishes it.

<table data-full-width="true"><thead><tr><th width="270">Metric</th><th>Description</th><th width="120">Unit</th><th width="100">Frequency</th></tr></thead><tbody><tr><td><code>&lt;product&gt;_total_assets</code></td><td>The total assets under management of the investment product, being the aggregate fair value of the digital assets it holds.</td><td>USD</td><td>1d</td></tr><tr><td><code>&lt;product&gt;_shares_outstanding</code></td><td>The number of shares of the investment product that have been authorized, issued, and purchased by investors.</td><td>Shares</td><td>1d</td></tr><tr><td><code>&lt;product&gt;_net_asset_value</code></td><td>The net asset value per share, being the fair value of the digital assets held by the product divided by its shares outstanding.</td><td>USD</td><td>1d</td></tr><tr><td><code>&lt;product&gt;_market_price</code></td><td>The closing price per share of the investment product on its listing exchange or over-the-counter market.</td><td>USD</td><td>1d</td></tr><tr><td><code>&lt;product&gt;_coin_per_share</code></td><td>The number of native units of the underlying digital asset attributable to each share of the investment product.</td><td>Native Units</td><td>1d</td></tr></tbody></table>

### Investment products

Each product publishes four or five of the metric types above, as shown in the Metrics published column (see [Metric availability by product](#metric-availability-by-product)). The Data from column is the first date on which any metric for the product has a value. Individual metrics within a product can begin later than that, so check the per-metric ranges in the catalog before relying on a specific start date (see [Coverage](#coverage)).

<table data-full-width="true"><thead><tr><th width="110">Product</th><th>Investment product</th><th width="210">Metrics published</th><th width="110">Data from</th><th>Status</th></tr></thead><tbody><tr><td><code>aave</code></td><td><em>Not yet in the metric catalog</em></td><td>All except market price</td><td>2024-10-02</td><td>Active</td></tr><tr><td><code>avax</code></td><td><em>Not yet in the metric catalog</em></td><td>All five</td><td>2024-08-20</td><td>Active</td></tr><tr><td><code>bat</code></td><td>Grayscale Basic Attention Token Trust</td><td>All five</td><td>2021-03-16</td><td>Active</td></tr><tr><td><code>bch</code></td><td>Grayscale Bitcoin Cash Trust</td><td>All five</td><td>2019-01-02</td><td>Active</td></tr><tr><td><code>bcor</code></td><td>Grayscale Bitcoin Adopters ETF</td><td>All except coin per share</td><td>2025-04-29</td><td>Active</td></tr><tr><td><code>bpi</code></td><td><em>Not yet in the metric catalog</em></td><td>All except coin per share</td><td>2025-04-01</td><td>Active</td></tr><tr><td><code>btc</code></td><td>Grayscale Bitcoin Trust</td><td>All five</td><td>2019-01-02</td><td>Superseded by <code>gbtc</code>. Last value 2025-06-25</td></tr><tr><td><code>btcc</code></td><td><em>Not yet in the metric catalog</em></td><td>All except coin per share</td><td>2025-04-01</td><td>Active</td></tr><tr><td><code>deep</code></td><td><em>Not yet in the metric catalog</em></td><td>All except market price</td><td>2025-06-16</td><td>Active</td></tr><tr><td><code>defi</code></td><td>Grayscale Decentralized Finance Fund</td><td>All five</td><td>2021-07-15</td><td>Active</td></tr><tr><td><code>dlc</code></td><td>Grayscale Digital Large Cap Fund</td><td>All five</td><td>2019-01-02</td><td>Active</td></tr><tr><td><code>doge</code></td><td><em>Not yet in the metric catalog</em></td><td>All five</td><td>2025-01-30</td><td>Active</td></tr><tr><td><code>etc</code></td><td>Grayscale Ethereum Classic Trust</td><td>All five</td><td>2019-01-02</td><td>Active</td></tr><tr><td><code>etco</code></td><td><em>Not yet in the metric catalog</em></td><td>All except coin per share</td><td>2025-09-03</td><td>Active</td></tr><tr><td><code>eth</code></td><td>Grayscale Ethereum Trust</td><td>All five</td><td>2019-01-02</td><td>Superseded by <code>ethe</code>. Last value 2025-06-25</td></tr><tr><td><code>ethe</code></td><td>Grayscale Ethereum Trust ETF</td><td>All five</td><td>2024-07-23</td><td>Active</td></tr><tr><td><code>ethemini</code></td><td>Grayscale Ethereum Mini Trust ETF</td><td>All five</td><td>2024-07-23</td><td>Active</td></tr><tr><td><code>ethepq</code></td><td>Grayscale Ethereum Trust Public Quotation</td><td>All five</td><td>2017-12-14</td><td>Pre-conversion quotation series, superseded by <code>ethe</code>. Last value 2024-07-22</td></tr><tr><td><code>fil</code></td><td>Grayscale Filecoin Trust</td><td>All five</td><td>2021-03-16</td><td>Active</td></tr><tr><td><code>gai</code></td><td>Grayscale Decentralized AI Fund</td><td>All except market price</td><td>2024-07-02</td><td>Active</td></tr><tr><td><code>gbtc</code></td><td>Grayscale Bitcoin Trust ETF</td><td>All five</td><td>2024-01-10</td><td>Active</td></tr><tr><td><code>gbtcmini</code></td><td>Grayscale Bitcoin Mini Trust ETF</td><td>All five</td><td>2024-07-31</td><td>Active</td></tr><tr><td><code>gbtcpq</code></td><td>Grayscale Bitcoin Trust Public Quotation</td><td>All five</td><td>2013-09-25</td><td>Pre-conversion quotation series, superseded by <code>gbtc</code>. Last value 2024-01-10</td></tr><tr><td><code>gfof</code></td><td>Grayscale Future of Finance ETF</td><td>All except coin per share</td><td>2022-02-01</td><td>Discontinued, last value 2024-12-12</td></tr><tr><td><code>gscf</code></td><td><em>Not yet in the metric catalog</em></td><td>All except market price</td><td>2022-03-16</td><td>Active</td></tr><tr><td><code>gscpxe</code></td><td>Grayscale Smart Contract Ex-Ethereum Fund</td><td>All except market price</td><td>2022-03-16</td><td>Superseded by <code>gscf</code>. Last value 2024-11-25</td></tr><tr><td><code>hype</code></td><td><em>Not yet in the metric catalog</em></td><td>All five</td><td>2026-06-03</td><td>Active</td></tr><tr><td><code>ip</code></td><td><em>Not yet in the metric catalog</em></td><td>All except market price</td><td>2025-07-28</td><td>Active</td></tr><tr><td><code>ldo</code></td><td><em>Not yet in the metric catalog</em></td><td>All except market price</td><td>2024-12-04</td><td>Discontinued, last value 2026-02-17</td></tr><tr><td><code>link</code></td><td>Grayscale Chainlink Trust</td><td>All five</td><td>2021-03-16</td><td>Active</td></tr><tr><td><code>lpt</code></td><td>Grayscale Livepeer Trust</td><td>All five</td><td>2021-03-16</td><td>Active</td></tr><tr><td><code>ltc</code></td><td>Grayscale Litecoin Trust</td><td>All five</td><td>2019-01-02</td><td>Active</td></tr><tr><td><code>mana</code></td><td>Grayscale Decentraland Trust</td><td>All five</td><td>2021-03-16</td><td>Active</td></tr><tr><td><code>mkr</code></td><td><em>Not yet in the metric catalog</em></td><td>All except market price</td><td>2024-08-08</td><td>Discontinued, last value 2025-09-09</td></tr><tr><td><code>mnrs</code></td><td><em>Not yet in the metric catalog</em></td><td>All except coin per share</td><td>2025-01-29</td><td>Active</td></tr><tr><td><code>near</code></td><td><em>Not yet in the metric catalog</em></td><td>All five</td><td>2024-05-22</td><td>Active</td></tr><tr><td><code>op</code></td><td><em>Not yet in the metric catalog</em></td><td>All except market price</td><td>2024-12-10</td><td>Discontinued, last value 2026-02-17</td></tr><tr><td><code>pyth</code></td><td><em>Not yet in the metric catalog</em></td><td>All except market price</td><td>2025-02-13</td><td>Active</td></tr><tr><td><code>sol</code></td><td>Grayscale Solana Trust</td><td>All five</td><td>2021-11-18</td><td>Active</td></tr><tr><td><code>stx</code></td><td><em>Not yet in the metric catalog</em></td><td>All five</td><td>2024-05-22</td><td>Active</td></tr><tr><td><code>sui</code></td><td>Grayscale Sui Trust</td><td>All five</td><td>2024-08-01</td><td>Active</td></tr><tr><td><code>sxt</code></td><td><em>Not yet in the metric catalog</em></td><td>All except market price</td><td>2025-02-24</td><td>Active</td></tr><tr><td><code>tao</code></td><td>Grayscale Bittensor Trust</td><td>All five</td><td>2024-06-10</td><td>Active</td></tr><tr><td><code>wal</code></td><td><em>Not yet in the metric catalog</em></td><td>All except market price</td><td>2025-06-16</td><td>Active</td></tr><tr><td><code>xlm</code></td><td>Grayscale Stellar Trust</td><td>All five</td><td>2019-01-02</td><td>Active</td></tr><tr><td><code>xrp</code></td><td><em>Not yet in the metric catalog</em></td><td>All five</td><td>2024-09-05</td><td>Active</td></tr><tr><td><code>zec</code></td><td>Grayscale Zcash Trust</td><td>All five</td><td>2019-01-02</td><td>Active</td></tr><tr><td><code>zen</code></td><td>Grayscale Horizen Trust</td><td>All five</td><td>2019-01-02</td><td>Active</td></tr></tbody></table>

Products marked as superseded describe a fund that continues under a different identifier, which is explained under [Product identifier changes](#product-identifier-changes). Discontinued products keep their history and remain queryable.

{% hint style="info" %}
**Conventions.** Metric values are returned as JSON strings to preserve precision. Timestamps are UTC ISO-8601 with nanosecond resolution. `time` identifies the reporting day rather than the instant a value was measured, and is always midnight UTC of that day (see [Daily observation timing](#daily-observation-timing)). Currency values are in U.S. dollars, share counts are numbers of shares, and coin-per-share values are native units of the underlying asset. `1d` is the only supported frequency, and requesting any other frequency returns an error. A metric that a product does not publish is left out of the response rather than returned as null (see [Metric availability by product](#metric-availability-by-product)).
{% endhint %}

## Methodology

Institution metrics are reported by the institution rather than calculated by Coin Metrics. Values are collected once per reporting day from the fund sponsor's published data service, mapped onto the Coin Metrics metric names, and stored without transformation or unit conversion. A published value therefore matches the sponsor's own disclosure for that day.

### Sources and collection

Coin Metrics reads each product's daily figures from the fund sponsor's data service, which carries the same numbers the sponsor discloses publicly. The five metric types map one-to-one onto fields in that feed: assets under management becomes total assets, holdings per share becomes net asset value, market price per share becomes market price, share count becomes shares outstanding, and the per-share asset holding becomes coin per share. No averaging, aggregation, or currency conversion is applied.

The product list is discovered from the sponsor rather than held as a fixed list, so a newly launched product starts reporting automatically once the sponsor publishes it. When a product first appears, its whole available history is backfilled rather than beginning on the date Coin Metrics first saw it. The earliest observation across the dataset is 2013-09-25.

### Daily observation timing

Each observation represents the close of one reporting day. The sponsor finalizes a day's figures after the U.S. market close, and collection waits until after that point before treating the day as complete. Days on which the U.S. wire system is closed are skipped, so the series follows U.S. business days rather than calendar days, and weekends and U.S. bank holidays are absent by design.

The `time` field is set to midnight UTC of the reporting day, which is not the moment of the close it describes. Read `time` as a date label. A value stamped `2026-07-23T00:00:00.000000000Z` is the close-of-business figure for 23 July 2026, not a reading taken at midnight at the start of that day. Aligning these series against intraday data requires treating each value as the end of its reporting day, otherwise daily fund figures will appear to lead intraday market data by roughly one session.

### Metric availability by product

A product publishes a metric only when the sponsor reports a value for it. The differences between products reflect what each product is rather than any Coin Metrics filtering.

Multi-asset funds and baskets generally do not publish coin per share, because a share is backed by a mix of assets and a single per-share coin figure would not describe it. Products that are not quoted on an exchange or an over-the-counter market do not publish market price, which leaves net asset value as the only per-share valuation for them. Where the sponsor reports nothing for a metric on a given day, no observation is stored for that metric and day.

### Product identifier changes

Product identifiers follow the sponsor's own symbols. A few funds have been reorganized or renamed, which leaves more than one identifier describing the same underlying fund over different periods. In each case the older identifier stops receiving values and the newer one carries on:

* `btc` and `eth` carry the Grayscale Bitcoin Trust and Grayscale Ethereum Trust under their original identifiers. Both stop on 2025-06-25. For current figures on those funds, use `gbtc` and `ethe`.
* `gbtcpq` and `ethepq` carry the public quotation series for the same two trusts, covering the period before each converted to an exchange-traded fund. `gbtcpq` ends 2024-01-10, the date on which `gbtc` begins. `ethepq` ends 2024-07-22, the day before `ethe` begins.
* `gscpxe` stops on 2024-11-25. `gscf` covers the same period from 2022-03-16 and continues to report.

To assemble one continuous long history for a fund that changed identifier, request both the retired and the current identifier and join the two series on `time`.

### Institution scope

The underlying data model is a generic institution, metric, and day triple. Nothing in the metric naming, the endpoint parameters, or the response shape is specific to a single institution or to investment products in particular, and additional institutions can publish entirely different metrics under the same endpoint. Because Grayscale is currently the only institution served, `institutions=grayscale` and `institutions=*` return the same data today. Requesting the wildcard means client code will pick up any institution added later without changes, subject to the two constraints described under [Which institutions are available?](#which-institutions-are-available).

## Accessing the Data

All institution metrics are served on a single endpoint. Pass the institution in `institutions` and the metric names in `metrics`. Metrics for many different products can be combined in one request, and values sharing a reporting day are merged into a single row.

* [`/timeseries/institution-metrics`](https://docs.coinmetrics.io/api/v4/#operation/getTimeseriesInstitutionMetrics)

Unlike most timeseries endpoints, this one supports only `json` and `csv` for `format`, so `json_stream` is not available. Daily series are small enough that this rarely matters: a single product's full history across all five metric types is a few thousand rows. The Python client's `.parallel()` does not depend on `json_stream` and works here as it does elsewhere.

The examples below pull all five metric types for the Grayscale Bitcoin Trust ETF.

{% tabs %}
{% tab title="Python Client" %}
```python
import os
from datetime import timedelta
from coinmetrics.api_client import CoinMetricsClient

client = CoinMetricsClient(os.environ["CM_API_KEY"])

# All five metric types for one product over a time range, fetched in parallel.
df = client.get_institution_metrics(
    institutions=["grayscale"],
    metrics=[
        "gbtc_total_assets",
        "gbtc_shares_outstanding",
        "gbtc_net_asset_value",
        "gbtc_market_price",
        "gbtc_coin_per_share",
    ],
    frequency="1d",
    start_time="2025-01-01",
    end_time="2026-01-01",
).parallel(time_increment=timedelta(days=30)).to_dataframe()

print(df)

# For just the most recent reporting days, use limit_per_institution instead of a time range:
# client.get_institution_metrics(institutions=["grayscale"], metrics=["gbtc_total_assets"], frequency="1d", limit_per_institution=1).to_dataframe()
```
{% endtab %}

{% tab title="Shell" %}
```shell
curl --compressed "https://api.coinmetrics.io/v4/timeseries/institution-metrics?institutions=grayscale&metrics=gbtc_total_assets,gbtc_shares_outstanding,gbtc_net_asset_value,gbtc_market_price,gbtc_coin_per_share&frequency=1d&limit_per_institution=3&page_size=10000&api_key=$CM_API_KEY"
```
{% endtab %}

{% tab title="Python" %}
```python
import os, requests

response = requests.get(
    "https://api.coinmetrics.io/v4/timeseries/institution-metrics",
    params={"institutions": "grayscale",
            "metrics": "gbtc_total_assets,gbtc_shares_outstanding,gbtc_net_asset_value,gbtc_market_price,gbtc_coin_per_share",
            "frequency": "1d", "limit_per_institution": 3,
            "page_size": 10000, "api_key": os.environ["CM_API_KEY"]},
).json()
print(response)
```
{% endtab %}
{% endtabs %}

Full parameter reference: see the API Reference for [`/timeseries/institution-metrics`](https://docs.coinmetrics.io/api/v4/#operation/getTimeseriesInstitutionMetrics).

## Examples

The examples below are live pulls of the most recent reporting days, returned as JSON strings.

### Example: all five metric types for one product

Every metric type for the Grayscale Bitcoin Trust ETF ([browser](https://api.coinmetrics.io/v4/timeseries/institution-metrics?institutions=grayscale\&metrics=gbtc_total_assets,gbtc_shares_outstanding,gbtc_net_asset_value,gbtc_market_price,gbtc_coin_per_share\&limit_per_institution=3\&frequency=1d\&api_key=YOUR_API_KEY)):

```json
[
  {
    "institution": "grayscale",
    "time": "2026-07-21T00:00:00.000000000Z",
    "gbtc_coin_per_share": "0.00077493",
    "gbtc_market_price": "51.49",
    "gbtc_net_asset_value": "51.46",
    "gbtc_shares_outstanding": "173010100",
    "gbtc_total_assets": "8903842030.46"
  },
  {
    "institution": "grayscale",
    "time": "2026-07-22T00:00:00.000000000Z",
    "gbtc_coin_per_share": "0.00077489",
    "gbtc_market_price": "51.08",
    "gbtc_net_asset_value": "51.06",
    "gbtc_shares_outstanding": "173010100",
    "gbtc_total_assets": "8834184919.13"
  },
  {
    "institution": "grayscale",
    "time": "2026-07-23T00:00:00.000000000Z",
    "gbtc_coin_per_share": "0.00077486",
    "gbtc_market_price": "50.19",
    "gbtc_net_asset_value": "50.21",
    "gbtc_shares_outstanding": "172260100",
    "gbtc_total_assets": "8648811092.07"
  }
]
```

### Example: one metric type across several products

Assets under management for four products in one request, showing how metrics sharing a reporting day are merged into a single row ([browser](https://api.coinmetrics.io/v4/timeseries/institution-metrics?institutions=grayscale\&metrics=gbtc_total_assets,ethe_total_assets,sol_total_assets,xrp_total_assets\&limit_per_institution=3\&frequency=1d\&api_key=YOUR_API_KEY)):

```json
[
  {
    "institution": "grayscale",
    "time": "2026-07-21T00:00:00.000000000Z",
    "ethe_total_assets": "1478720799.01",
    "gbtc_total_assets": "8903842030.46",
    "sol_total_assets": "102203594.3",
    "xrp_total_assets": "63622357.6"
  },
  {
    "institution": "grayscale",
    "time": "2026-07-22T00:00:00.000000000Z",
    "ethe_total_assets": "1480004531.11",
    "gbtc_total_assets": "8834184919.13",
    "sol_total_assets": "101953530.26",
    "xrp_total_assets": "62561047.58"
  },
  {
    "institution": "grayscale",
    "time": "2026-07-23T00:00:00.000000000Z",
    "ethe_total_assets": "1441496698.29",
    "gbtc_total_assets": "8648811092.07",
    "sol_total_assets": "98834329.25",
    "xrp_total_assets": "60726071.19"
  }
]
```

## Coverage

Institution metrics are not published on coverage.coinmetrics.io. Availability is read from the catalog instead, which reports every institution and metric together with the frequency and the first and last date each one has data. This is the authoritative list of what exists and over what period, and it stays current as products launch and retire.

* [`/catalog-all-v2/institution-metrics`](https://docs.coinmetrics.io/api/v4/#operation/getCatalogAllV2InstitutionMetrics): complete availability, independent of the requesting key.
* [`/catalog-v2/institution-metrics`](https://docs.coinmetrics.io/api/v4/#operation/getCatalogV2InstitutionMetrics): the same view, restricted to what a key is entitled to.
* [`/reference-data/institution-metrics`](https://docs.coinmetrics.io/api/v4/#operation/getReferenceDataInstitutionMetrics): descriptive metadata, being the display name, description, and unit of a metric.

{% tabs %}
{% tab title="Python Client" %}
```python
import os
from coinmetrics.api_client import CoinMetricsClient

client = CoinMetricsClient(os.environ["CM_API_KEY"])

# Every institution metric with its available date range.
df = client.catalog_full_institution_metrics_v2(institutions=["grayscale"]).to_dataframe()

print(df)
```
{% endtab %}

{% tab title="Shell" %}
```shell
curl --compressed "https://api.coinmetrics.io/v4/catalog-all-v2/institution-metrics?institutions=grayscale&page_size=10000&api_key=$CM_API_KEY"
```
{% endtab %}
{% endtabs %}

{% hint style="info" %}
Descriptive metadata in `/reference-data/institution-metrics` currently covers a subset of the products listed under [Investment products](#investment-products). A metric can be queryable and present in the catalog while its description and unit are still being added to reference data. Use the catalog endpoints for the complete list of what is available.
{% endhint %}

## Usage

* **Measure the premium or discount to net asset value.** The gap between `<product>_market_price` and `<product>_net_asset_value` is what a share trades at relative to what it is worth. Expressed as a fraction of net asset value it is directly comparable across products and over time, and it is only available for products that publish a market price.
* **Track flows into and out of a product.** Changes in `<product>_shares_outstanding` show share creation and redemption. Because share counts move only when the sponsor issues or retires shares, a flat series means no primary market activity rather than missing data.
* **Follow institutional adoption.** `<product>_total_assets` is the U.S. dollar size of a product, so summing it across products gives a view of assets under management by asset or by sponsor. Note that this measures value rather than holdings, so it moves with price as well as with flows.
* **Separate price effects from holdings effects.** Multiplying `<product>_coin_per_share` by `<product>_shares_outstanding` gives the product's holdings in native units, which changes only with flows and fees rather than with price.
* **Observe the effect of management fees.** Where fees are met from the product's own holdings, `<product>_coin_per_share` declines steadily. For the Grayscale Bitcoin Trust ETF it decreased on every one of the 620 reporting days between 2024-02-01 and 2026-07-23, for a total decline of 13.3 percent.
* **Cross-check figures against each other.** Net asset value per share multiplied by shares outstanding closely tracks total assets, though the three are reported independently and rounded separately, so expect small differences rather than an exact identity.

## Limitations

* **One institution.** Grayscale is the only institution currently served, so these metrics describe one sponsor's product range and are not a cross-sponsor view of the exchange-traded product market.
* **Daily only, with no intraday or streaming access.** `1d` is the only supported frequency, there is no downsampling or resampling on the serving side, and there is no websocket variant of this endpoint.
* **`time` is a date label rather than an observation instant.** Every value is stamped midnight UTC of its reporting day while describing that day's close, so joins against intraday series need care (see [Daily observation timing](#daily-observation-timing)).
* **The series follows U.S. business days.** Weekends and U.S. bank holidays produce no observations, so two consecutive rows are not necessarily consecutive calendar days.
* **Values are as reported by the sponsor.** Coin Metrics collects these figures rather than computing them, and does not independently value a product's holdings or recompute its net asset value.
* **A metric a product does not publish is absent rather than null.** Requesting it alongside valid metrics returns rows without that key, and requesting it on its own returns an error rather than an empty series.
* **Retired identifiers stay queryable and stop updating.** Several identifiers describe funds that continue under a different name, so a series that appears to have ended may simply have moved (see [Product identifier changes](#product-identifier-changes)).
* **Not every product has a market price.** Products that are not exchange-quoted or over-the-counter quoted publish only net asset value, so premium and discount analysis is not possible for them.
* **Descriptive metadata lags availability.** Some products are queryable before their descriptions and units appear in reference data.

## FAQ

### What does the `time` field represent?

The reporting day, as a date label. Values are stamped at midnight UTC of the day they describe, but each one is a close-of-business figure for that day rather than a measurement taken at midnight. A row stamped `2026-07-23T00:00:00.000000000Z` is the close for 23 July 2026.

### Which institutions are available?

Grayscale Investments only, as `grayscale`.

### Why does a metric I requested not appear in the response?

The product does not publish it. Metrics that a product never reports are omitted from the response rather than returned as null, so a row can come back with fewer keys than you asked for. If every metric in a request is unpublished, the request returns a `bad_parameter` error instead of an empty result. Check the Metrics published column under [Investment products](#investment-products), or the catalog, to see which metric types a product carries.

### How do I find every available product and metric?

Query [`/catalog-all-v2/institution-metrics`](https://docs.coinmetrics.io/api/v4/#operation/getCatalogAllV2InstitutionMetrics). It returns every metric with its frequency and its first and last available date, and it is the authoritative source. Institution metrics do not appear on coverage.coinmetrics.io.

### Why does `coin_per_share` only ever fall?

Where a product's management fee is met by selling a portion of its holdings, the amount of the underlying asset backing each share declines a little every day, and the metric records that erosion. It is expected behavior rather than a data problem. This also means coin per share is not a good proxy for a product's total holdings, for which you should multiply it by shares outstanding.

### What is the difference between net asset value and market price?

Net asset value per share is what a share is worth, being the value of the product's holdings divided by its shares outstanding. Market price per share is what a share last traded at on its listing exchange or over-the-counter market. The two can diverge substantially, and the difference between them is the premium or discount at which the product trades.

### Why did `btc_total_assets` and `eth_total_assets` stop updating?

Those identifiers belong to the original Bitcoin and Ethereum trust series, which stopped on 2025-06-25. The current identifiers for the same funds are `gbtc` and `ethe`. See [Product identifier changes](#product-identifier-changes) for the full list of superseded identifiers.

### Does `total_assets` equal net asset value times shares outstanding?

Very nearly, but not exactly. The three figures are reported independently and rounded separately, so the product of the latter two typically differs from total assets by a small fraction of a percent. Use `total_assets` directly when you need the product's reported size.

## Related

* [Market Data Overview](README.md): the full set of market data types and the levels they are served at.
* [Reference Rate](../reference-rates-overview/reference_rate.md): the independent asset prices to compare a product's net asset value or market price against.
* [How to Migrate from Catalog v1 to Catalog v2](../../tutorials-and-examples/user-guides/how-to-migrate-from-catalog-v1-to-catalog-v2.md): mapping for the deprecated `/catalog/institutions` and `/catalog/institution-metrics` endpoints.
