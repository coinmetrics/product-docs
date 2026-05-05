# ParallelDataCollection

Returned by [`DataCollection.parallel(...)`](data-collection.md). Splits a single REST request across worker threads (typically one per asset, market, or metric) so that historical exports complete in a fraction of the time. Every chainable helper available on `DataCollection` -- `to_dataframe`, `to_list`, `export_to_csv_files`, `export_to_json_files`, ... -- is also available here, so `parallel()` can be dropped into an existing call chain without further changes.

A typical usage looks like:

```python
from coinmetrics.api_client import CoinMetricsClient

client = CoinMetricsClient("<your-api-key>")

(
    client.get_asset_metrics(
        assets="btc,eth,sol",
        metrics="ReferenceRateUSD,VolumeRealUsd",
        frequency="1d",
        start_time="2020-01-01",
        end_time="2024-01-01",
    )
    .parallel(parallelize_on=["assets", "metrics"], time_increment="month")
    .export_to_csv_files("./out")
)
```

<a id="coinmetrics._data_collection.ParallelDataCollection"></a>

### *class* ParallelDataCollection

```python
class coinmetrics._data_collection.ParallelDataCollection(
    parent_data_collection,
    parallelize_on=None,
    executor=None,
    max_workers=None,
    progress_bar=None,
    time_increment=None,
    height_increment=None,
)
```

Bases: [`DataCollection`](data-collection.md#coinmetrics._data_collection.DataCollection)

This class will be used as an extension of the normal data collection, but all functions will run in parallel,
utilizing Python's concurrent.futures features. The main purpose of this class is for historical export of
data.

* **Parameters:**
  * **parent_data_collection** ([*DataCollection*](data-collection.md#coinmetrics._data_collection.DataCollection))
  * **parallelize_on** (*Optional* *[**Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]* *]*)
  * **executor** (*Optional* *[**Callable* *[* *...* *,* *Executor* *]* *]*)
  * **max_workers** (*Optional* *[*[*int*](https://docs.python.org/3/library/functions.html#int) *]*)
  * **progress_bar** (*Optional* *[*[*bool*](https://docs.python.org/3/library/functions.html#bool) *]*)
  * **time_increment** (*Optional* *[**Union* *[**relativedelta* *,* *timedelta* *,* *DateOffset* *]* *]*)
  * **height_increment** (*Optional* *[*[*int*](https://docs.python.org/3/library/functions.html#int) *]*)

<a id="coinmetrics._data_collection.ParallelDataCollection.export_to_csv"></a>

### export_to_csv

```python
coinmetrics._data_collection.ParallelDataCollection.export_to_csv(
    path_or_bufstr=None,
    columns_to_store=None,
    compress=False,
    dataframe_type='pandas',
)
```

* **Parameters:**
  * **path_or_bufstr** ([*str*](https://docs.python.org/3/library/stdtypes.html#str) *|* *Path* *|* [*IO*](https://docs.python.org/3/library/typing.html#typing.IO) *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*  *|* [*IO*](https://docs.python.org/3/library/typing.html#typing.IO) *[*[*bytes*](https://docs.python.org/3/library/stdtypes.html#bytes) *]*  *|* *None*)
  * **columns_to_store** ([*List*](https://docs.python.org/3/library/typing.html#typing.List) *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*  *|* *None*)
  * **compress** ([*bool*](https://docs.python.org/3/library/functions.html#bool))
  * **dataframe_type** ([*str*](https://docs.python.org/3/library/stdtypes.html#str))
* **Return type:**
  None

<a id="coinmetrics._data_collection.ParallelDataCollection.export_to_csv_files"></a>

### export_to_csv_files

```python
coinmetrics._data_collection.ParallelDataCollection.export_to_csv_files(
    data_directory=None,
    columns_to_store=None,
    compress=False,
)
```

Export the parallelized request to a directory of CSV files, one file
per combination of the `parallelize_on` attribute of the parent
[`ParallelDataCollection`](#coinmetrics._data_collection.ParallelDataCollection).

Examples:

```default
client.get_market_trades(
    "coinbase-eth-btc-spot,coinbase-eth-usdc-spot",
).parallel(["markets"]).export_to_csv_files()
```

produces:

```default
./market-trades/coinbase-eth-btc-spot.csv
./market-trades/coinbase-eth-usdc-spot.csv
```

Layering a `time_increment` on top:

```default
client.get_asset_metrics(
    "btc,eth", "ReferenceRateUSD",
    start_time="2024-01-01", limit_per_asset=1,
).parallel(
    "assets,metrics",
    time_increment=timedelta(days=1),
).export_to_csv_files()
```

produces:

```default
./asset-metrics/btc/ReferenceRateUSD/start_time=2024-01-01T00-00-00Z.csv
./asset-metrics/eth/ReferenceRateUSD/start_time=2024-01-01T00-00-00Z.csv
```

* **Parameters:**
  * **data_directory** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Path to the directory where files should be
    written. Defaults to the current working directory.
  * **columns_to_store** (*Optional* *[**List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]*) -- Columns to include in each CSV. Defaults to
    every column returned by the endpoint.
  * **compress** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Whether to gzip the resulting files.
* **Return type:**
  None

<a id="coinmetrics._data_collection.ParallelDataCollection.export_to_json"></a>

### export_to_json

```python
coinmetrics._data_collection.ParallelDataCollection.export_to_json(
    path_or_bufstr=None,
    compress=False,
)
```

* **Parameters:**
  * **path_or_bufstr** ([*str*](https://docs.python.org/3/library/stdtypes.html#str) *|* *Path* *|* [*IO*](https://docs.python.org/3/library/typing.html#typing.IO) *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*  *|* [*IO*](https://docs.python.org/3/library/typing.html#typing.IO) *[*[*bytes*](https://docs.python.org/3/library/stdtypes.html#bytes) *]*  *|* *None*)
  * **compress** ([*bool*](https://docs.python.org/3/library/functions.html#bool))
* **Return type:**
  [str](https://docs.python.org/3/library/stdtypes.html#str) | None

<a id="coinmetrics._data_collection.ParallelDataCollection.export_to_json_files"></a>

### export_to_json_files

```python
coinmetrics._data_collection.ParallelDataCollection.export_to_json_files(
    data_directory=None,
    compress=False,
)
```

Export the parallelized request to a directory of JSON files, one file
per combination of the `parallelize_on` attribute of the parent
[`ParallelDataCollection`](#coinmetrics._data_collection.ParallelDataCollection).

Examples:

```default
client.get_market_trades(
    "coinbase-eth-btc-spot,coinbase-eth-usdc-spot",
).parallel("markets").export_to_json_files()
```

produces:

```default
./market-trades/coinbase-eth-btc-spot.json
./market-trades/coinbase-eth-usdc-spot.json
```

Layering a `time_increment` on top:

```default
client.get_asset_metrics(
    "btc,eth", "ReferenceRateUSD",
    start_time="2024-01-01", limit_per_asset=1,
).parallel(
    "assets,metrics",
    time_increment=timedelta(days=1),
).export_to_json_files()
```

produces:

```default
./asset-metrics/btc/ReferenceRateUSD/start_time=2024-01-01T00-00-00Z.json
./asset-metrics/eth/ReferenceRateUSD/start_time=2024-01-01T00-00-00Z.json
```

* **Parameters:**
  * **data_directory** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Path to the directory where files should be
    written. Defaults to the current working directory.
  * **compress** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Whether to gzip the resulting files.
* **Return type:**
  None

<a id="coinmetrics._data_collection.ParallelDataCollection.export_to_parquet"></a>

### export_to_parquet

```python
coinmetrics._data_collection.ParallelDataCollection.export_to_parquet(path_or_bufstr=None)
```

* **Parameters:**
  **path_or_bufstr** ([*str*](https://docs.python.org/3/library/stdtypes.html#str) *|* *Path* *|* [*IO*](https://docs.python.org/3/library/typing.html#typing.IO) *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*  *|* [*IO*](https://docs.python.org/3/library/typing.html#typing.IO) *[*[*bytes*](https://docs.python.org/3/library/stdtypes.html#bytes) *]*  *|* *None*)
* **Return type:**
  None

<a id="coinmetrics._data_collection.ParallelDataCollection.export_to_parquet_files"></a>

### export_to_parquet_files

```python
coinmetrics._data_collection.ParallelDataCollection.export_to_parquet_files(
    data_directory=None,
    **kwargs,
)
```

* **Parameters:**
  * **data_directory** ([*str*](https://docs.python.org/3/library/stdtypes.html#str) *|* *None*)
  * **kwargs** ([*Any*](https://docs.python.org/3/library/typing.html#typing.Any))
* **Return type:**
  None

<a id="coinmetrics._data_collection.ParallelDataCollection.first_page"></a>

### first_page

```python
coinmetrics._data_collection.ParallelDataCollection.first_page()
```

* **Return type:**
  [*List*](https://docs.python.org/3/library/typing.html#typing.List)[[*Dict*](https://docs.python.org/3/library/typing.html#typing.Dict)[[str](https://docs.python.org/3/library/stdtypes.html#str), [*Any*](https://docs.python.org/3/library/typing.html#typing.Any)]]

<a id="coinmetrics._data_collection.ParallelDataCollection.get_parallel_datacollections"></a>

### get_parallel_datacollections

```python
coinmetrics._data_collection.ParallelDataCollection.get_parallel_datacollections()
```

Materialize the cartesian product of every parallelized URL parameter
(and, optionally, every time / height increment) into one
[`DataCollection`](data-collection.md#coinmetrics._data_collection.DataCollection) per combination.

For example, calling:

```default
client.get_asset_metrics(assets="btc,eth,algo", ...) \
    .parallel() \
    .get_parallel_datacollections()
```

returns three data collections split by asset. Adding a second
parallelization axis:

```default
client.get_asset_metrics(
    assets="btc,eth,algo",
    metrics="volume_reported_spot_usd_1d,volume_trusted_spot_usd_1d",
).parallel(parallelize_on=["metrics", "assets"]) \
 .get_parallel_datacollections()
```

returns six combinations. Layering a `time_increment` on top:

```default
client.get_asset_metrics(
    assets="btc,eth,algo",
    metrics="volume_reported_spot_usd_1d,volume_trusted_spot_usd_1d",
    start_time="2023-01-01",
    end_time="2023-02-01",
).parallel(
    parallelize_on=["metrics", "assets"],
    time_increment=timedelta(weeks=2),
).get_parallel_datacollections()
```

returns twelve, because each metric / asset pair is also split into
two-week windows.

* **Returns:**
  One [`DataCollection`](data-collection.md#coinmetrics._data_collection.DataCollection) per combination of parallelized
  parameters and time / height increment.
* **Return type:**
  List[[DataCollection](data-collection.md#coinmetrics._data_collection.DataCollection)]

<a id="coinmetrics._data_collection.ParallelDataCollection.get_schema_field_names"></a>

### get_schema_field_names

```python
coinmetrics._data_collection.ParallelDataCollection.get_schema_field_names()
```

Get all field names defined in the schema for this endpoint.
This returns ALL possible fields, even if they're not present in the actual data.

* **Returns:**
  List of field names from the schema
* **Return type:**
  List[[str](https://docs.python.org/3/library/stdtypes.html#str)]

<a id="coinmetrics._data_collection.ParallelDataCollection.parallel"></a>

### parallel

```python
coinmetrics._data_collection.ParallelDataCollection.parallel(
    parallelize_on=None,
    executor=None,
    max_workers=None,
    progress_bar=None,
    time_increment=None,
    height_increment=None,
)
```

Convert this [`DataCollection`](data-collection.md#coinmetrics._data_collection.DataCollection) into a [`ParallelDataCollection`](#coinmetrics._data_collection.ParallelDataCollection),
splitting a single HTTP request into many parallel requests for faster
data export.

By default the request is split on the primary query parameter (for example,
`get_asset_metrics(assets=...)` is split into one request per asset).

* **Parameters:**
  * **parallelize_on** (*Optional* *[**Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]* *]*) -- Parameter(s) to parallelize on. Must be one of the
    list-type parameters of the underlying endpoint
    (`assets`, `markets`, `metrics`, ...).
  * **executor** (*Optional* *[**Callable* *[* *[**Any* *]* *,* [*concurrent.futures.Executor*](https://docs.python.org/3/library/concurrent.futures.html#concurrent.futures.Executor) *]* *]*) -- Executor class used for concurrency. Defaults to
    [`concurrent.futures.ThreadPoolExecutor`](https://docs.python.org/3/library/concurrent.futures.html#concurrent.futures.ThreadPoolExecutor); pass a
    [`ProcessPoolExecutor`](https://docs.python.org/3/library/concurrent.futures.html#concurrent.futures.ProcessPoolExecutor) (or any other
    `Executor` subclass) to swap it out.
  * **max_workers** (*Optional* *[*[*int*](https://docs.python.org/3/library/functions.html#int) *]*) -- Number of parallel workers. Defaults to `10` and is
    capped at `10` to respect API rate limits.
  * **progress_bar** (*Optional* *[*[*bool*](https://docs.python.org/3/library/functions.html#bool) *]*) -- Whether to display a `tqdm` progress bar while the
    workers run. Defaults to `True`.
  * **time_increment** (*Optional* *[**Union* *[**relativedelta* *,* *timedelta* *,* *DateOffset* *]* *]*) -- Optionally split the request along the time axis as
    well. Use [`datetime.timedelta`](https://docs.python.org/3/library/datetime.html#datetime.timedelta) for sub-month windows and
    `dateutil.relativedelta.relativedelta` for month / year windows.
    Requires `start_time` to be set on the original request.
  * **height_increment** (*Optional* *[*[*int*](https://docs.python.org/3/library/functions.html#int) *]*) -- Optionally split the request along the block-height
    axis. Requires `start_height` to be set on the original request.
* **Returns:**
  A [`ParallelDataCollection`](#coinmetrics._data_collection.ParallelDataCollection) that mirrors the original
  request but executes its workload across multiple workers.
* **Return type:**
  [ParallelDataCollection](#coinmetrics._data_collection.ParallelDataCollection)

#### *static* parse_date(date_input)

Parses a datetime object or datetime string into a datetime object. Datetime string must be a valid
ISO 8601 format. Timezone aware objects are converted to UTC
:param date_input: Union[datetime, date, str] date to parse into datetime
:return: datetime

* **Parameters:**
  **date_input** ([*datetime*](https://docs.python.org/3/library/datetime.html#datetime.datetime) *|* [*date*](https://docs.python.org/3/library/datetime.html#datetime.date) *|* [*str*](https://docs.python.org/3/library/stdtypes.html#str) *|* *Timestamp*)
* **Return type:**
  [*datetime*](https://docs.python.org/3/library/datetime.html#datetime.datetime)

<a id="coinmetrics._data_collection.ParallelDataCollection.to_dataframe"></a>

### to_dataframe

```python
coinmetrics._data_collection.ParallelDataCollection.to_dataframe(
    dtype_mapper=None,
    dataframe_type='pandas',
    decimal_as_string=False,
)
```

Outputs a pandas or polars dataframe with schema-derived types.

Uses PyArrow as the intermediate representation for type-safe,
near-zero-copy conversion to both pandas and polars.

* **Parameters:**
  * **dtype_mapper** ([*dict*](https://docs.python.org/3/library/stdtypes.html#dict)) -- Optional dictionary mapping column names to pandas
    dtypes.  Overrides schema-derived types for the specified columns.
  * **dataframe_type** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Type of dataframe outputted, either "pandas" (default) or "polars".
  * **decimal_as_string** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- If True, decimal columns are returned as strings
    to preserve full precision. If False (default), decimals are cast to
    float64 which may lose precision for values with more than ~15
    significant digits.
* **Returns:**
  Data in a pandas or polars dataframe
* **Return type:**
  DataFrameType

<a id="coinmetrics._data_collection.ParallelDataCollection.to_lazyframe"></a>

### to_lazyframe

```python
coinmetrics._data_collection.ParallelDataCollection.to_lazyframe(
    decimal_as_string=False,
    **kwargs,
)
```

* **Parameters:**
  * **decimal_as_string** ([*bool*](https://docs.python.org/3/library/functions.html#bool))
  * **kwargs** ([*Any*](https://docs.python.org/3/library/typing.html#typing.Any))
* **Return type:**
  *LazyFrame*

<a id="coinmetrics._data_collection.ParallelDataCollection.to_list"></a>

### to_list

```python
coinmetrics._data_collection.ParallelDataCollection.to_list()
```

* **Return type:**
  [*List*](https://docs.python.org/3/library/typing.html#typing.List)[[*Dict*](https://docs.python.org/3/library/typing.html#typing.Dict)[[str](https://docs.python.org/3/library/stdtypes.html#str), [*Any*](https://docs.python.org/3/library/typing.html#typing.Any)]]
