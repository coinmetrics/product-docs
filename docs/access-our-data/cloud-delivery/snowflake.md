# Snowflake

{% hint style="info" %}
**Cloud Delivery is in limited availability.** To request access, reach out to your sales or account manager.
{% endhint %}

## Overview

Coin Metrics exposes Cloud Delivery datasets as tables in Snowflake through Secure Data Sharing. You mount a read-only database in your own Snowflake account and query it with SQL. No data is copied into your account and you are not charged Snowflake storage for it. You pay only for the compute you use to run queries.

The tables are Snowflake **external tables** over the same Parquet objects described on the [Amazon S3](amazon-s3.md) page. That means you never handle S3 paths or AWS credentials, but it also shapes query performance, which is covered under [Limits and notes](#limits-and-notes).

For which datasets exist and how far back they go, see [Cloud Delivery](./).

## Get access

### What to provide

Send your account manager your Snowflake **organization name** and **account name**. You can find both by running the following in your account.

```sql
SELECT CURRENT_ORGANIZATION_NAME(), CURRENT_ACCOUNT_NAME();
```

Coin Metrics adds your account to a share. Shares are curated per customer, so you see the tables covered by your entitlements rather than every table published.

### Mount the share

Once you have been added, confirm the share is visible.

```sql
SHOW SHARES;
```

Create a database from it. You choose the database name, so pick whatever fits your naming conventions.

```sql
CREATE DATABASE coin_metrics
  FROM SHARE <provider_account>.<share_name>;
```

Grant your reader roles access to it.

```sql
GRANT IMPORTED PRIVILEGES ON DATABASE coin_metrics TO ROLE analyst;
```

Tables live in the `EXTERNAL` schema, so a fully qualified name looks like `coin_metrics.EXTERNAL.market_trades`. Verify the mount worked.

```sql
SHOW TABLES IN SCHEMA coin_metrics.EXTERNAL;

SELECT COUNT(*) FROM coin_metrics.EXTERNAL.market_trades WHERE dt = '2026-07-28';
```

{% hint style="info" %}
**Shares are region-bound.** A direct share works when your account is in the same cloud region as the provider account. If yours is elsewhere, your account manager will arrange a listing that handles cross-region fulfillment.
{% endhint %}

### Marketplace listings

Coin Metrics also publishes Cloud Delivery datasets as private listings. A listing is the better route when you need cross-region or cross-cloud delivery, or when you prefer to discover and request the data through the Snowflake interface rather than by exchanging account identifiers. Ask your account manager which route suits you.

## Understand the layout

Ten tables are published in the `EXTERNAL` schema.

| Table | Contents |
| --- | --- |
| `market_trades` | Executed trades |
| `market_candles` | OHLCV bars |
| `market_quotes` | Best bid and ask |
| `market_orderbooks_snapshots` | Point-in-time order book state |
| `market_orderbooks_updates` | Incremental order book changes |
| `reference_rates` | Coin Metrics reference rates |
| `reference_data_markets` | Market catalog |
| `reference_data_assets` | Asset catalog |
| `reference_data_exchanges` | Exchange catalog |
| `reference_data_pairs` | Pair catalog |

### Partition columns

Every market dataset carries partition columns in addition to its data columns. These are derived from the underlying file layout rather than stored in the file body, and filtering on them is what keeps queries fast.

| Table | Partition columns |
| --- | --- |
| `market_trades` | `market_type`, `exchange`, `dt` |
| `market_candles` | `market_type`, `exchange`, `frequency`, `dt` |
| `market_quotes` | `market_type`, `exchange`, `granularity`, `dt` |
| `market_orderbooks_snapshots` | `market_type`, `exchange`, `depth`, `granularity`, `dt` |
| `market_orderbooks_updates` | `market_type`, `exchange`, `depth`, `granularity`, `dt` |
| `reference_rates` | `frequency`, `dt` |
| Reference data tables | None |

`dt` is a `DATE` holding the UTC date of the data. `market_type` is one of `spot`, `future`, or `option`. `exchange` is the normalized exchange identifier, lowercase with non-alphanumeric characters replaced by underscores, so `binance.us` appears as `binance_us`.

### Data columns

Column names and meanings match the API fields documented on the dataset pages linked from [Cloud Delivery](./), except for the omissions listed under [Schema differences](./#schema-differences). Two further differences are worth knowing.

**Types are native, not strings.** The API returns prices and amounts as JSON strings to preserve precision. Here they are `FLOAT`, and timestamps are `TIMESTAMP_NTZ` in UTC rather than ISO-8601 strings. If you need exact decimal arithmetic, cast to `NUMBER` with an explicit scale.

**Order book sides are semi-structured.** In `market_orderbooks_snapshots` and `market_orderbooks_updates`, `asks` and `bids` are `VARIANT` columns holding arrays of price and size objects. Use `LATERAL FLATTEN` to expand them, as shown below. The updates table additionally carries a `type` column that the snapshots table does not.

## Read the data

### Trades for one market and day

```sql
SELECT market, time, price, amount, side
FROM coin_metrics.EXTERNAL.market_trades
WHERE market_type = 'spot'
  AND exchange = 'coinbase'
  AND dt = '2026-07-28'
  AND market = 'coinbase-btc-usd-spot'
ORDER BY time
LIMIT 100;
```

### Daily candles over a date range

```sql
SELECT dt, market, price_open, price_high, price_low, price_close, volume
FROM coin_metrics.EXTERNAL.market_candles
WHERE market_type = 'spot'
  AND exchange = 'binance'
  AND frequency = '1d'
  AND dt BETWEEN '2026-01-01' AND '2026-06-30'
  AND market = 'binance-btc-usdt-spot'
ORDER BY dt;
```

### Reference rates

Metric columns are named after the metric, for example `ReferenceRateUSD`. Snowflake identifiers are case-insensitive unless quoted, so you can write them in any case.

```sql
SELECT asset, time, ReferenceRateUSD
FROM coin_metrics.EXTERNAL.reference_rates
WHERE frequency = '1h'
  AND dt = '2026-07-28'
  AND asset IN ('btc', 'eth')
ORDER BY asset, time;
```

### Flattening an order book

Expanding the `asks` array gives one row per price level.

```sql
SELECT
  ob.market,
  ob.time,
  level.index                     AS level_index,
  level.value:price::FLOAT        AS price,
  level.value:size::FLOAT         AS size
FROM coin_metrics.EXTERNAL.market_orderbooks_snapshots AS ob,
     LATERAL FLATTEN(input => ob.asks) AS level
WHERE ob.market_type = 'spot'
  AND ob.exchange = 'coinbase'
  AND ob.dt = '2026-07-28'
  AND ob.market = 'coinbase-btc-usd-spot'
  AND ob.time = '2026-07-28 00:00:00'
ORDER BY level_index
LIMIT 20;
```

### Joining to the market catalog

```sql
SELECT t.market, m.base, m.quote, m.type, COUNT(*) AS trade_count
FROM coin_metrics.EXTERNAL.market_trades AS t
JOIN coin_metrics.EXTERNAL.reference_data_markets AS m
  ON t.market = m.market
WHERE t.market_type = 'spot'
  AND t.exchange = 'coinbase'
  AND t.dt = '2026-07-28'
GROUP BY t.market, m.base, m.quote, m.type
ORDER BY trade_count DESC;
```

### Querying efficiently

External tables read from object storage at query time, so pruning matters more than it would on a native table.

* **Always filter on `dt`.** It is the highest-leverage filter available. An unfiltered query scans every day of history.
* **Filter on `exchange` and `market_type` too.** Each one eliminates a large share of the files before any are opened.
* **Filter on `frequency` for candles.** Eight frequencies share the table, so omitting it reads roughly eight times more data than you need.
* **Compare `dt` to date literals, not expressions.** Wrapping the column in a function can prevent partition elimination.
* **Materialize hot queries.** If you run the same aggregation repeatedly, create a native table or materialized view from the result rather than rescanning the external table each time.

## Limits and notes

* **The tables are read-only.** External tables do not support `INSERT`, `UPDATE`, `DELETE`, or `MERGE`. To modify data, copy it into your own table first with `CREATE TABLE ... AS SELECT`.
* **Queries are slower than on native tables.** Every query reads Parquet from object storage. Pruning is at file level rather than micro-partition level, and there is no automatic clustering. For repeated heavy analytics, copy the slice you need into a native table.
* **You pay for compute.** Snowflake storage is not charged for shared data, but every query runs on your warehouse and is billed to you.
* **No Time Travel on shared external tables.** If you need historical snapshots of the data as it stood, materialize your own copies.
* **Reference data has no history.** The four catalog tables reflect the current state and are overwritten daily. They have no `dt` column.
* **Shares cannot be re-shared.** Snowflake does not permit a consumer to re-share a database created from a share. If another account in your organization needs access, ask your account manager to add it to the share.

## Related

* [Cloud Delivery](./): datasets, coverage, and the update schedule.
* [Amazon S3](amazon-s3.md): the same data as files in object storage.
* [Snowflake documentation on consuming shares](https://docs.snowflake.com/en/user-guide/data-share-consumers)
