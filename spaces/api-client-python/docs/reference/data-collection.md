# DataCollection

Every REST method on [`CoinMetricsClient`](coinmetricsclient.md) returns a `DataCollection`. The class is a lazy iterator over the API response: rows are fetched on demand, with transparent paging. It also exposes helpers for converting the response into a pandas or Polars data frame, exporting to CSV / JSON, and running the request in parallel across asset, market, or metric.

<a id="coinmetrics._data_collection.DataCollection"></a>

## *class* `DataCollection`

```python
class coinmetrics._data_collection.DataCollection(
    data_retrieval_function,
    endpoint,
    url_params,
    csv_export_supported=True,
    client=None,
    paginated=True,
    **kwargs,
)
```

Bases: [`object`](https://docs.python.org/3/library/functions.html#object)

Lazy wrapper around a Coin Metrics REST endpoint response.

Every REST method on [`CoinMetricsClient`](coinmetricsclient.md#coinmetrics.api_client.CoinMetricsClient)
returns a `DataCollection`. It iterates over rows on demand (with
transparent paging) and exposes helpers for converting the response into
common Python data structures:

- [`to_dataframe()`](#coinmetrics._data_collection.DataCollection.to_dataframe) -- materialize into a pandas or polars dataframe.
- [`to_list()`](#coinmetrics._data_collection.DataCollection.to_list) -- materialize into `List[Dict[str, Any]]`.
- [`export_to_csv()`](#coinmetrics._data_collection.DataCollection.export_to_csv) -- stream the response into a CSV file or buffer.
- [`export_to_json()`](#coinmetrics._data_collection.DataCollection.export_to_json) -- stream the response into a JSON file or buffer.
- [`export_to_parquet()`](#coinmetrics._data_collection.DataCollection.export_to_parquet) -- stream the response into a Parquet file.
- [`parallel()`](#coinmetrics._data_collection.DataCollection.parallel) -- return a [`ParallelDataCollection`](parallel-data-collection.md#coinmetrics._data_collection.ParallelDataCollection) that splits
  the request across worker threads. The result can be chained with
  [`to_dataframe()`](#coinmetrics._data_collection.DataCollection.to_dataframe), [`to_list()`](#coinmetrics._data_collection.DataCollection.to_list),
  [`export_to_csv_files()`](parallel-data-collection.md#coinmetrics._data_collection.ParallelDataCollection.export_to_csv_files),
  [`export_to_json_files()`](parallel-data-collection.md#coinmetrics._data_collection.ParallelDataCollection.export_to_json_files), and so on.

* **Parameters:**
  * **data_retrieval_function** (*DataRetrievalFuncType*)
  * **endpoint** ([*str*](https://docs.python.org/3/library/stdtypes.html#str))
  * **url_params** (*Dict* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *UrlParamTypes* *]*)
  * **csv_export_supported** ([*bool*](https://docs.python.org/3/library/functions.html#bool))
  * **client** (*Optional* *[*[*CoinMetricsClient*](coinmetricsclient.md#coinmetrics.api_client.CoinMetricsClient) *]*)
  * **paginated** ([*bool*](https://docs.python.org/3/library/functions.html#bool))
  * **kwargs** (*Any*)

<a id="coinmetrics._data_collection.DataCollection.export_to_csv"></a>

### `DataCollection.export_to_csv`

```python
coinmetrics._data_collection.DataCollection.export_to_csv(
    path_or_bufstr=None,
    columns_to_store=None,
    compress=False,
)
```

* **Parameters:**
  * **path_or_bufstr** ([*str*](https://docs.python.org/3/library/stdtypes.html#str) *|* *Path* *|* [*IO*](https://docs.python.org/3/library/typing.html#typing.IO) *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*  *|* [*IO*](https://docs.python.org/3/library/typing.html#typing.IO) *[*[*bytes*](https://docs.python.org/3/library/stdtypes.html#bytes) *]*  *|* *None*)
  * **columns_to_store** ([*List*](https://docs.python.org/3/library/typing.html#typing.List) *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*  *|* *None*)
  * **compress** ([*bool*](https://docs.python.org/3/library/functions.html#bool))
* **Return type:**
  [str](https://docs.python.org/3/library/stdtypes.html#str) | None

<a id="coinmetrics._data_collection.DataCollection.export_to_json"></a>

### `DataCollection.export_to_json`

```python
coinmetrics._data_collection.DataCollection.export_to_json(
    path_or_bufstr=None,
    compress=False,
)
```

* **Parameters:**
  * **path_or_bufstr** ([*str*](https://docs.python.org/3/library/stdtypes.html#str) *|* *Path* *|* [*IO*](https://docs.python.org/3/library/typing.html#typing.IO) *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*  *|* [*IO*](https://docs.python.org/3/library/typing.html#typing.IO) *[*[*bytes*](https://docs.python.org/3/library/stdtypes.html#bytes) *]*  *|* *None*)
  * **compress** ([*bool*](https://docs.python.org/3/library/functions.html#bool))
* **Return type:**
  [str](https://docs.python.org/3/library/stdtypes.html#str) | None

<a id="coinmetrics._data_collection.DataCollection.export_to_parquet"></a>

### `DataCollection.export_to_parquet`

```python
coinmetrics._data_collection.DataCollection.export_to_parquet(path_or_bufstr=None)
```

* **Parameters:**
  **path_or_bufstr** ([*str*](https://docs.python.org/3/library/stdtypes.html#str) *|* *Path* *|* [*IO*](https://docs.python.org/3/library/typing.html#typing.IO) *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*  *|* [*IO*](https://docs.python.org/3/library/typing.html#typing.IO) *[*[*bytes*](https://docs.python.org/3/library/stdtypes.html#bytes) *]*  *|* *None*)
* **Return type:**
  None

<a id="coinmetrics._data_collection.DataCollection.first_page"></a>

### `DataCollection.first_page`

```python
coinmetrics._data_collection.DataCollection.first_page()
```

* **Return type:**
  [*List*](https://docs.python.org/3/library/typing.html#typing.List)[[*Dict*](https://docs.python.org/3/library/typing.html#typing.Dict)[[str](https://docs.python.org/3/library/stdtypes.html#str), [*Any*](https://docs.python.org/3/library/typing.html#typing.Any)]]

<a id="coinmetrics._data_collection.DataCollection.get_schema_field_names"></a>

### `DataCollection.get_schema_field_names`

```python
coinmetrics._data_collection.DataCollection.get_schema_field_names()
```

Get all field names defined in the schema for this endpoint.
This returns ALL possible fields, even if they're not present in the actual data.

* **Returns:**
  List of field names from the schema
* **Return type:**
  List[[str](https://docs.python.org/3/library/stdtypes.html#str)]

<a id="coinmetrics._data_collection.DataCollection.parallel"></a>

### `DataCollection.parallel`

```python
coinmetrics._data_collection.DataCollection.parallel(
    parallelize_on=None,
    executor=None,
    max_workers=None,
    progress_bar=None,
    time_increment=None,
    height_increment=None,
)
```

Convert this [`DataCollection`](#coinmetrics._data_collection.DataCollection) into a [`ParallelDataCollection`](parallel-data-collection.md#coinmetrics._data_collection.ParallelDataCollection),
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
  A [`ParallelDataCollection`](parallel-data-collection.md#coinmetrics._data_collection.ParallelDataCollection) that mirrors the original
  request but executes its workload across multiple workers.
* **Return type:**
  [ParallelDataCollection](parallel-data-collection.md#coinmetrics._data_collection.ParallelDataCollection)

<a id="coinmetrics._data_collection.DataCollection.to_dataframe"></a>

### `DataCollection.to_dataframe`

```python
coinmetrics._data_collection.DataCollection.to_dataframe(
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

<a id="coinmetrics._data_collection.DataCollection.to_lazyframe"></a>

### `DataCollection.to_lazyframe`

```python
coinmetrics._data_collection.DataCollection.to_lazyframe(
    decimal_as_string=False,
    **kwargs,
)
```

* **Parameters:**
  * **decimal_as_string** ([*bool*](https://docs.python.org/3/library/functions.html#bool))
  * **kwargs** ([*Any*](https://docs.python.org/3/library/typing.html#typing.Any))
* **Return type:**
  *LazyFrame*

<a id="coinmetrics._data_collection.DataCollection.to_list"></a>

### `DataCollection.to_list`

```python
coinmetrics._data_collection.DataCollection.to_list()
```

* **Return type:**
  [*List*](https://docs.python.org/3/library/typing.html#typing.List)[[*Dict*](https://docs.python.org/3/library/typing.html#typing.Dict)[[str](https://docs.python.org/3/library/stdtypes.html#str), [*Any*](https://docs.python.org/3/library/typing.html#typing.Any)]]

## CatalogV2DataCollection

Returned by every `catalog_*_v2` method on `CoinMetricsClient`. Adds `to_dataframe` flattening for the nested `catalog-v2` response shape (per-frequency `min_time`/`max_time` rows are exploded into one row per metric or frequency).

<a id="coinmetrics._data_collection.CatalogV2DataCollection"></a>

## *class* `CatalogV2DataCollection`

```python
class coinmetrics._data_collection.CatalogV2DataCollection(
    data_retrieval_function,
    endpoint,
    url_params,
    csv_export_supported=True,
    client=None,
    metric_type=None,
    iterable_col=None,
    iterable_key=None,
    explode_on=None,
    assign_to=None,
    nested_catalog_columns=['min_time', 'max_time'],
    dataframe_type='pandas',
    **kwargs,
)
```

Bases: [`DataCollection`](#coinmetrics._data_collection.DataCollection)

This class is used to implement functionality specific to catalog-v2 endpoints.

* **Parameters:**
  * **data_retrieval_function** (*DataRetrievalFuncType*)
  * **endpoint** ([*str*](https://docs.python.org/3/library/stdtypes.html#str))
  * **url_params** (*Dict* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *UrlParamTypes* *]*)
  * **csv_export_supported** ([*bool*](https://docs.python.org/3/library/functions.html#bool))
  * **client** (*Optional* *[*[*CoinMetricsClient*](coinmetricsclient.md#coinmetrics.api_client.CoinMetricsClient) *]*)
  * **metric_type** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*)
  * **iterable_col** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*)
  * **iterable_key** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*)
  * **explode_on** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*)
  * **assign_to** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*)
  * **nested_catalog_columns** (*List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*)
  * **dataframe_type** ([*str*](https://docs.python.org/3/library/stdtypes.html#str))
  * **kwargs** (*Any*)

<a id="coinmetrics._data_collection.CatalogV2DataCollection.export_to_csv"></a>

### `CatalogV2DataCollection.export_to_csv`

```python
coinmetrics._data_collection.CatalogV2DataCollection.export_to_csv(
    path_or_bufstr=None,
    columns_to_store=None,
    compress=False,
)
```

* **Parameters:**
  * **path_or_bufstr** ([*str*](https://docs.python.org/3/library/stdtypes.html#str) *|* *Path* *|* [*IO*](https://docs.python.org/3/library/typing.html#typing.IO) *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*  *|* [*IO*](https://docs.python.org/3/library/typing.html#typing.IO) *[*[*bytes*](https://docs.python.org/3/library/stdtypes.html#bytes) *]*  *|* *None*)
  * **columns_to_store** ([*List*](https://docs.python.org/3/library/typing.html#typing.List) *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*  *|* *None*)
  * **compress** ([*bool*](https://docs.python.org/3/library/functions.html#bool))
* **Return type:**
  [str](https://docs.python.org/3/library/stdtypes.html#str) | None

<a id="coinmetrics._data_collection.CatalogV2DataCollection.export_to_json"></a>

### `CatalogV2DataCollection.export_to_json`

```python
coinmetrics._data_collection.CatalogV2DataCollection.export_to_json(
    path_or_bufstr=None,
    compress=False,
)
```

* **Parameters:**
  * **path_or_bufstr** ([*str*](https://docs.python.org/3/library/stdtypes.html#str) *|* *Path* *|* [*IO*](https://docs.python.org/3/library/typing.html#typing.IO) *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*  *|* [*IO*](https://docs.python.org/3/library/typing.html#typing.IO) *[*[*bytes*](https://docs.python.org/3/library/stdtypes.html#bytes) *]*  *|* *None*)
  * **compress** ([*bool*](https://docs.python.org/3/library/functions.html#bool))
* **Return type:**
  [str](https://docs.python.org/3/library/stdtypes.html#str) | None

<a id="coinmetrics._data_collection.CatalogV2DataCollection.export_to_parquet"></a>

### `CatalogV2DataCollection.export_to_parquet`

```python
coinmetrics._data_collection.CatalogV2DataCollection.export_to_parquet(path_or_bufstr=None)
```

* **Parameters:**
  **path_or_bufstr** ([*str*](https://docs.python.org/3/library/stdtypes.html#str) *|* *Path* *|* [*IO*](https://docs.python.org/3/library/typing.html#typing.IO) *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*  *|* [*IO*](https://docs.python.org/3/library/typing.html#typing.IO) *[*[*bytes*](https://docs.python.org/3/library/stdtypes.html#bytes) *]*  *|* *None*)
* **Return type:**
  None

<a id="coinmetrics._data_collection.CatalogV2DataCollection.first_page"></a>

### `CatalogV2DataCollection.first_page`

```python
coinmetrics._data_collection.CatalogV2DataCollection.first_page()
```

* **Return type:**
  [*List*](https://docs.python.org/3/library/typing.html#typing.List)[[*Dict*](https://docs.python.org/3/library/typing.html#typing.Dict)[[str](https://docs.python.org/3/library/stdtypes.html#str), [*Any*](https://docs.python.org/3/library/typing.html#typing.Any)]]

<a id="coinmetrics._data_collection.CatalogV2DataCollection.get_schema_field_names"></a>

### `CatalogV2DataCollection.get_schema_field_names`

```python
coinmetrics._data_collection.CatalogV2DataCollection.get_schema_field_names()
```

Get all field names defined in the schema for this endpoint.
This returns ALL possible fields, even if they're not present in the actual data.

* **Returns:**
  List of field names from the schema
* **Return type:**
  List[[str](https://docs.python.org/3/library/stdtypes.html#str)]

<a id="coinmetrics._data_collection.CatalogV2DataCollection.parallel"></a>

### `CatalogV2DataCollection.parallel`

```python
coinmetrics._data_collection.CatalogV2DataCollection.parallel(
    parallelize_on=None,
    executor=None,
    max_workers=None,
    progress_bar=None,
    time_increment=None,
    height_increment=None,
)
```

Convert this [`DataCollection`](#coinmetrics._data_collection.DataCollection) into a [`ParallelDataCollection`](parallel-data-collection.md#coinmetrics._data_collection.ParallelDataCollection),
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
  A [`ParallelDataCollection`](parallel-data-collection.md#coinmetrics._data_collection.ParallelDataCollection) that mirrors the original
  request but executes its workload across multiple workers.
* **Return type:**
  [ParallelDataCollection](parallel-data-collection.md#coinmetrics._data_collection.ParallelDataCollection)

<a id="coinmetrics._data_collection.CatalogV2DataCollection.to_dataframe"></a>

### `CatalogV2DataCollection.to_dataframe`

```python
coinmetrics._data_collection.CatalogV2DataCollection.to_dataframe(
    dtype_mapper=None,
    dataframe_type='pandas',
    decimal_as_string=False,
)
```

Transform a `catalog-v2` response into a flat dataframe.

For `*-metrics` and `market-*` endpoints the per-frequency
`min_time` / `max_time` rows are exploded into one row per metric
or frequency.

* **Parameters:**
  * **dtype_mapper** (*Optional* *[**Dict* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *Any* *]* *]*) -- Optional dictionary mapping column names to pandas
    dtypes. Overrides schema-derived types for the specified columns.
  * **dataframe_type** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Type of dataframe to return -- either `"pandas"`
    (default) or `"polars"`.
  * **decimal_as_string** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- If `True`, decimal columns are returned as
    strings to preserve full precision. If `False` (default), decimals
    are cast to `float64`, which may lose precision for values with
    more than ~15 significant digits.
* **Returns:**
  A pandas or polars dataframe.
* **Return type:**
  DataFrameType

<a id="coinmetrics._data_collection.CatalogV2DataCollection.to_lazyframe"></a>

### `CatalogV2DataCollection.to_lazyframe`

```python
coinmetrics._data_collection.CatalogV2DataCollection.to_lazyframe(
    decimal_as_string=False,
    **kwargs,
)
```

* **Parameters:**
  * **decimal_as_string** ([*bool*](https://docs.python.org/3/library/functions.html#bool))
  * **kwargs** ([*Any*](https://docs.python.org/3/library/typing.html#typing.Any))
* **Return type:**
  *LazyFrame*

<a id="coinmetrics._data_collection.CatalogV2DataCollection.to_list"></a>

### `CatalogV2DataCollection.to_list`

```python
coinmetrics._data_collection.CatalogV2DataCollection.to_list()
```

* **Return type:**
  [*List*](https://docs.python.org/3/library/typing.html#typing.List)[[*Dict*](https://docs.python.org/3/library/typing.html#typing.Dict)[[str](https://docs.python.org/3/library/stdtypes.html#str), [*Any*](https://docs.python.org/3/library/typing.html#typing.Any)]]
