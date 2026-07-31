# Amazon S3

{% hint style="info" %}
**Cloud Delivery is in limited availability.** To request access, reach out to your sales or account manager.
{% endhint %}

## Overview

Coin Metrics publishes Cloud Delivery datasets to an S3 bucket that Coin Metrics owns and operates. You read objects from that bucket directly using your own AWS account, with standard tooling such as the AWS CLI, the AWS SDKs, DuckDB, Spark, Athena, or Glue. Nothing is copied into your account unless you copy it yourself.

This page covers granting your account access, the layout of the bucket, and reading the files. For which datasets exist and how far back they go, see [Cloud Delivery](./).

## Get access

Access is granted per customer through cross-account IAM. Anonymous and public access are not supported.

### What to provide

Send your account manager the following.

| Input | Required | Notes |
| --- | --- | --- |
| AWS account ID | Yes | The account that will read the data. |
| IAM role ARN | Preferred | Scoping the grant to a single role is safer than granting to a whole account. |
| Datasets needed | Yes | Determines which prefixes are opened to you. |

Coin Metrics grants read-only access to the prefixes covering your entitled datasets. You receive `s3:GetObject` on those prefixes and `s3:ListBucket` scoped to them. Write, delete, and ACL operations are never granted.

### Requester Pays

The bucket runs in **Requester Pays** mode. Coin Metrics pays to store the data. You pay the S3 request and data-transfer charges for what you read, billed to your own AWS account.

This has a practical consequence: every request must declare that you accept the charges, or S3 rejects it with `403 Access Denied`. How you declare it depends on the tool.

{% tabs %}
{% tab title="AWS CLI" %}
```shell
aws s3 ls s3://talos-data-daily/data-type=market-trades/ --request-payer requester
```
{% endtab %}

{% tab title="boto3" %}
```python
import boto3

s3 = boto3.client("s3")

response = s3.get_object(
    Bucket="talos-data-daily",
    Key="data-type=market-trades/market-type=spot/exchange=coinbase/dt=2026-07-28/coinbase-all-spot-2026-07-28-2026-07-29.parquet",
    RequestPayer="requester",
)
```
{% endtab %}

{% tab title="s3fs / PyArrow" %}
```python
import s3fs

fs = s3fs.S3FileSystem(requester_pays=True)
fs.ls("talos-data-daily/data-type=market-trades/market-type=spot/exchange=coinbase/")
```
{% endtab %}
{% endtabs %}

{% hint style="warning" %}
**A missing request-payer flag looks like a permissions error.** If reads fail with `403 Access Denied` even though your grant is in place, confirm the flag is set. Many libraries default it to off.
{% endhint %}

To read the bucket you must use an AWS account that can accept Requester Pays charges. If you cannot bill through AWS, talk to your account manager about alternatives.

## Understand the layout

Objects use Hive-style partitioning, where each directory level is a `key=value` pair. Query engines including Athena, Glue, Spark, DuckDB, and PyArrow discover these partitions automatically and skip prefixes that cannot match your filters.

A trades object looks like this.

```text
s3://talos-data-daily/
  data-type=market-trades/
    market-type=spot/
      exchange=coinbase/
        dt=2026-07-28/
          coinbase-all-spot-2026-07-28-2026-07-29.parquet
```

Partition values are lowercase, with any character outside `a-z0-9` collapsed to an underscore. An exchange such as `binance.us` therefore appears as `exchange=binance_us`.

### Path templates

Levels differ by dataset. The order is always coarsest first, so filtering on an early level eliminates the most work.

| Dataset | Prefix template |
| --- | --- |
| Market trades | `data-type=market-trades/market-type={type}/exchange={exchange}/dt={date}/` |
| Market candles | `data-type=market-candles/market-type={type}/exchange={exchange}/frequency={frequency}/dt={date}/` |
| Market quotes | `data-type=market-quotes/market-type={type}/exchange={exchange}/granularity={granularity}/dt={date}/` |
| Order books | `data-type=market-orderbooks/market-type={type}/exchange={exchange}/depth={depth}/granularity={granularity}/dataset={snapshots\|updates}/dt={date}/` |
| Reference rates | `data-type=reference-rates/frequency={frequency}/dt={date}/` |
| Reference data | `data-type=reference-data/dataset={assets\|exchanges\|markets\|pairs}/` |

Two shapes are worth noting. Reference rates carry no `market-type` or `exchange` level, because the dataset is keyed by asset rather than by market. Reference data carries no `dt` level at all, so each of its four objects is overwritten in place every day.

### Partition values

| Key | Values |
| --- | --- |
| `market-type` | `spot`, `future`, `option` |
| `exchange` | Normalized exchange identifier, for example `coinbase`, `binance`, `binance_us` |
| `frequency` | Candles: `1m`, `5m`, `10m`, `15m`, `30m`, `1h`, `4h`, `1d`. Reference rates: `1s`, `1h` |
| `granularity` | `raw` |
| `depth` | `full_book` |
| `dataset` | Order books: `snapshots`, `updates`. Reference data: `assets`, `exchanges`, `markets`, `pairs` |
| `dt` | UTC date of the data, formatted `YYYY-MM-DD` |

{% hint style="warning" %}
**Two partition keys contain hyphens.** When an engine derives columns from the prefix, `data-type` and `market-type` keep their hyphens, which most SQL dialects treat as subtraction. Quote them: backticks in Spark, double quotes in DuckDB and Athena. The Snowflake tables are unaffected, since they expose the same partitions as `market_type` with an underscore.
{% endhint %}

### Files

Each partition holds Parquet files covering that day for that slice of the market universe. Filenames encode the markets requested and the date range covered, for example `coinbase-all-spot-2026-07-28-2026-07-29.parquet`. Treat filenames as opaque. Read every `.parquet` object under a partition prefix rather than reconstructing a name, since names can change as coverage expands.

Snappy compression is applied inside the Parquet file, which is the format default and is handled transparently by readers. There is no outer `.gz` wrapper.

A day on which a market produced nothing is skipped rather than written as an empty file, so a missing partition means no activity rather than missing data.

## Read the data

Point any Parquet reader at a prefix. The examples below read one day of Coinbase spot trades.

{% tabs %}
{% tab title="AWS CLI" %}
```shell
# List what is available for a day
aws s3 ls \
  s3://talos-data-daily/data-type=market-trades/market-type=spot/exchange=coinbase/dt=2026-07-28/ \
  --request-payer requester

# Download the partition
aws s3 cp \
  s3://talos-data-daily/data-type=market-trades/market-type=spot/exchange=coinbase/dt=2026-07-28/ \
  ./trades/ --recursive --request-payer requester
```
{% endtab %}

{% tab title="pandas / PyArrow" %}
```python
import pyarrow.dataset as ds
import pyarrow.fs as fs

s3 = fs.S3FileSystem(request_payer="requester", region="us-east-1")

dataset = ds.dataset(
    "talos-data-daily/data-type=market-trades",
    filesystem=s3,
    format="parquet",
    partitioning="hive",
)

# Partition column names carry the hyphens used in the prefix, so quote them.
table = dataset.to_table(
    filter=(ds.field("market-type") == "spot")
    & (ds.field("exchange") == "coinbase")
    & (ds.field("dt") == "2026-07-28")
)

df = table.to_pandas()
print(df.head())
```
{% endtab %}

{% tab title="DuckDB" %}
```sql
INSTALL httpfs;
LOAD httpfs;

SET s3_region = 'us-east-1';
SET s3_requester_pays = true;

SELECT market, time, price, amount, side
FROM read_parquet(
  's3://talos-data-daily/data-type=market-trades/market-type=spot/exchange=coinbase/dt=2026-07-28/*.parquet'
)
ORDER BY time
LIMIT 10;
```
{% endtab %}

{% tab title="Spark" %}
```python
spark.conf.set("fs.s3a.requester-pays.enabled", "true")

df = (
    spark.read.parquet("s3a://talos-data-daily/data-type=market-trades/")
    .filter("`market-type` = 'spot' AND exchange = 'coinbase' AND dt = '2026-07-28'")
)

df.show(10)
```
{% endtab %}
{% endtabs %}

### Reading efficiently

Because you pay per request and per byte transferred, how you scan matters.

* **Filter on partition keys first.** A query filtered to one exchange and one date reads a handful of objects. The same query without those filters lists and reads the whole dataset.
* **Point readers at the deepest prefix you can.** Passing the full `dt=` prefix avoids listing every exchange.
* **Select only the columns you need.** Parquet is columnar, so projecting a few columns transfers far less than reading whole rows.
* **Avoid repeated full-bucket listings.** Listing calls are billed like any other request.

## Limits and notes

* **You pay for reads.** Requester Pays means request and transfer charges land on your AWS account. Broad scans across many exchanges and dates can be expensive.
* **The data is read-only.** Write, delete, and ACL permissions are never granted.
* **Reference data has no history.** Its four objects are overwritten daily and carry no date partition. Keep your own copies if you need point-in-time catalog history.
* **Order book files are large.** Full-book snapshots at raw granularity produce the biggest objects in the bucket. Filter tightly and expect long transfers.
* **File names are not a stable interface.** Read every `.parquet` object under a partition rather than depending on a naming pattern.
* **Encryption and transport.** Objects are encrypted at rest with server-side encryption, and the bucket policy requires TLS.

## Related

* [Cloud Delivery](./): datasets, coverage, and the update schedule.
* [Snowflake](snowflake.md): the same data as tables in your warehouse.
* [AWS documentation on Requester Pays buckets](https://docs.aws.amazon.com/AmazonS3/latest/userguide/RequesterPaysBuckets.html)
