# Cloud Delivery

{% hint style="info" %}
**Cloud Delivery is in limited availability.** To request access, reach out to your sales or account manager.
{% endhint %}

## Overview

Cloud Delivery publishes Coin Metrics market data as Apache Parquet files in Amazon S3, refreshed daily, and exposes the same files as tables in Snowflake. Rather than paging through an API, you read whole datasets directly from object storage or query them in your warehouse. Quantitative researchers, data engineers, and analytics teams use it to load multi-year histories of trades, candles, quotes, and order books into their own environment once, then work with the data locally.

The same objects back both destinations. Choosing S3 or Snowflake changes how you reach the data, not what the data contains.

## At a Glance

<table data-full-width="true"><thead><tr><th>Delivery targets</th><th>Datasets</th><th width="159">Update cadence</th><th>Format</th><th>Partitioning</th><th>Access model</th></tr></thead><tbody><tr><td>Amazon S3 and Snowflake</td><td>Trades, candles, quotes, order books, reference rates, and reference data</td><td>Daily, covering the previous UTC day</td><td>Apache Parquet, Snappy compressed</td><td>Hive-style <code>key=value</code> prefixes by market type, exchange, and date</td><td>Cross-account IAM for S3. Secure Data Sharing for Snowflake</td></tr></tbody></table>

## When to use Cloud Delivery

Cloud Delivery and the API serve different shapes of work. The API is the right tool for interactive queries, narrow slices, and anything real time. Cloud Delivery is the right tool when the volume of data makes repeated API calls impractical.

| Use Cloud Delivery when | Use the [API](../api/) when |
| --- | --- |
| You want a full history of a dataset in your own storage or warehouse | You need a specific market and time range on demand |
| You are loading data into Spark, Snowflake, DuckDB, Athena, or a data lake | You are building an application that queries interactively |
| Your volumes make repeated API paging impractical | You need real-time data over websockets |
| You want columnar files you can scan and filter locally | You want the newest observation within seconds |

Cloud Delivery does not replace API access. Most customers use both.

## Datasets

Ten tables are published. Each maps to one prefix in S3 and one table in Snowflake. Field definitions live on the existing dataset pages, since the columns delivered here are the same ones the API returns.

<table data-full-width="true"><thead><tr><th>Dataset</th><th>S3 prefix</th><th>Snowflake table</th><th>Field reference</th></tr></thead><tbody><tr><td>Market trades</td><td><code>data-type=market-trades/</code></td><td><code>market_trades</code></td><td><a href="../../market-data/market-data-overview/market-trades.md">Market Trades</a></td></tr><tr><td>Market candles</td><td><code>data-type=market-candles/</code></td><td><code>market_candles</code></td><td><a href="../../market-data/market-data-overview/market-candles.md">Market Candles</a></td></tr><tr><td>Market quotes</td><td><code>data-type=market-quotes/</code></td><td><code>market_quotes</code></td><td><a href="../../market-data/market-data-overview/market-quotes.md">Market Quotes</a></td></tr><tr><td>Order book snapshots</td><td><code>data-type=market-orderbooks/…/dataset=snapshots/</code></td><td><code>market_orderbooks_snapshots</code></td><td><a href="../../market-data/market-data-overview/market-order-books.md">Market Order Books</a></td></tr><tr><td>Order book updates</td><td><code>data-type=market-orderbooks/…/dataset=updates/</code></td><td><code>market_orderbooks_updates</code></td><td><a href="../../market-data/market-data-overview/market-order-books.md">Market Order Books</a></td></tr><tr><td>Reference rates</td><td><code>data-type=reference-rates/</code></td><td><code>reference_rates</code></td><td><a href="../../market-data/reference-rates-overview/reference_rate.md">Reference Rate</a></td></tr><tr><td>Reference data: markets</td><td><code>data-type=reference-data/dataset=markets/</code></td><td><code>reference_data_markets</code></td><td><a href="../../market-data/market-data-overview/market-reference-data.md">Market Reference Data</a></td></tr><tr><td>Reference data: assets</td><td><code>data-type=reference-data/dataset=assets/</code></td><td><code>reference_data_assets</code></td><td>See below</td></tr><tr><td>Reference data: exchanges</td><td><code>data-type=reference-data/dataset=exchanges/</code></td><td><code>reference_data_exchanges</code></td><td>See below</td></tr><tr><td>Reference data: pairs</td><td><code>data-type=reference-data/dataset=pairs/</code></td><td><code>reference_data_pairs</code></td><td>See below</td></tr></tbody></table>

### Schema differences

Two tables carry fewer fields than the API returns for the same dataset. Everything else matches the linked pages field for field.

| Table | Fields not delivered | Effect |
| --- | --- | --- |
| `market_trades` | `mark_price`, `index_price`, `iv_trade`, `liquidation` | Futures and options trades arrive without their derivatives-specific fields. Spot and decentralized exchange trades are unaffected. |
| `reference_data_markets` | `pool_config_id`, `fee`, `price_includes_fee`, `variable_fee`, `base_address`, `quote_address`, `multiplier_size` | Decentralized exchange pool metadata is absent from the market catalog. |

These fields remain available over the API if you need them.

### Reference data schemas

The assets, exchanges, and pairs catalogs each carry two columns, matching the `/reference-data/assets`, `/reference-data/exchanges`, and `/reference-data/pairs` endpoints.

| Table | Column | Type | Description |
| --- | --- | --- | --- |
| `reference_data_assets` | `asset` | string | Asset identifier, for example `btc`. |
| | `full_name` | string | Display name of the asset, for example `Bitcoin`. |
| `reference_data_exchanges` | `exchange` | string | Exchange identifier, for example `coinbase`. |
| | `full_name` | string | Display name of the exchange. |
| `reference_data_pairs` | `pair` | string | Pair identifier, for example `btc-usd`. |
| | `full_name` | string | Display name of the pair. |

The markets catalog is much wider. See [Market Reference Data](../../market-data/market-data-overview/market-reference-data.md) for its fields.

## Coverage

Cloud Delivery carries a curated subset of the Coin Metrics market data universe rather than every market on every venue. The scheduled datasets cover the following.

| Dataset | Exchanges | Market types | Notes |
| --- | --- | --- | --- |
| Market trades | 48 | Spot, futures, options | |
| Market candles | 48 | Spot, futures, options | Eight frequencies: `1m`, `5m`, `10m`, `15m`, `30m`, `1h`, `4h`, `1d` |
| Market quotes | 29 | Spot, futures | Raw granularity |
| Order book snapshots | 29 | Spot, futures | Full book depth, raw granularity |
| Order book updates | On request | Spot, futures | Not on the daily schedule. Contact your account manager |
| Reference rates | All covered assets | | Frequencies `1s` and `1h`. Metrics `ReferenceRateUSD`, `ReferenceRateEUR`, `ReferenceRateETH`, `ReferenceRateBTC` |
| Reference data | All covered entities | | Current catalog only, refreshed daily |

Two of these are narrower than the corresponding product documented elsewhere in this knowledge base. Reference rates are delivered at two frequencies against four quote currencies, where the [Reference Rate](../../market-data/reference-rates-overview/reference_rate.md) product covers more of both. Market quotes and order books cover spot and futures only, with no options.

For the market-level universe behind each dataset, see the [coverage tool](https://coverage.coinmetrics.io/). If a market, frequency, or quote currency you need is not in the delivered set, your account manager can arrange a backfill, and the API carries the full set in the meantime.

{% hint style="warning" %}
**Reference data has no history.** The four reference-data catalogs are current snapshots that are overwritten each day. They carry no date partition, so you cannot reconstruct the catalog as it stood on a past date. Retain your own copies if you need point-in-time catalog history.
{% endhint %}

## Update schedule

Every dataset runs once a day and covers the previous UTC day. Jobs start on a stagger to spread load.

| Dataset | Start time (UTC) |
| --- | --- |
| Reference data | 00:00 |
| Reference rates | 00:08 |
| Market trades | 00:10 |
| Market quotes | 00:20 |
| Market candles | 00:30 |
| Order book snapshots | 00:45 |

A file's `dt` partition is the UTC date of the data it contains, not the date the job ran. Data for `dt=2026-07-28` is produced by the run that begins early on 2026-07-29. Larger datasets take longer to complete, so allow for processing time after the preceding start times before expecting a full day to be present.

## File format

Every object is an Apache Parquet file with Snappy compression applied inside the file, which is the Parquet default and is handled transparently by every Parquet reader. There is no outer `.gz` wrapper, so files end in `.parquet` and can be opened directly.

Numeric fields are stored as native Parquet types rather than the JSON strings the API returns. Timestamps are stored as nanosecond epoch values in UTC.

## Getting access

Access is provisioned per customer. To get started, reach out to your sales or account manager and tell them which destination you want.

1. Confirm your entitlements and the datasets you need.
2. Provide the details for your destination. For S3 this is your AWS account ID and, preferably, an IAM role ARN. For Snowflake this is your Snowflake organization and account identifier.
3. Coin Metrics grants read access and confirms the bucket, prefixes, or share name you have been given.
4. Validate the connection using the examples on the destination page below.

## Choose your destination

{% content-ref url="amazon-s3.md" %}
[amazon-s3.md](amazon-s3.md)
{% endcontent-ref %}

{% content-ref url="snowflake.md" %}
[snowflake.md](snowflake.md)
{% endcontent-ref %}

## Related

* [Downloading Our Data](../downloading-our-data/): browser and spreadsheet tools for smaller extracts.
* [API Conventions](../api/): the HTTP API, for interactive and real-time access.
* [Status Page](../status-page.md): incident and change notifications.
