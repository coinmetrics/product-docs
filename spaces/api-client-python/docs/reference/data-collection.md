# DataCollection

Every REST method on [`CoinMetricsClient`](../../../reference/coinmetricsclient/) returns a `DataCollection`. The class is a lazy iterator over the API response: rows are fetched on demand, with transparent paging. It also exposes helpers for converting the response into a pandas or Polars data frame, exporting to CSV / JSON, and running the request in parallel across asset, market, or metric.

### _class_ `coinmetrics._data_collection.DataCollection(data_retrieval_function, endpoint, url_params, csv_export_supported=True, client=None, paginated=True, **kwargs)`

Bases: [`object`](https://docs.python.org/3/library/functions.html#object)

Lazy wrapper around a Coin Metrics REST endpoint response.

Every REST method on [`CoinMetricsClient`](../../../reference/coinmetricsclient/#coinmetrics.api_client.CoinMetricsClient) returns a `DataCollection`. It iterates over rows on demand (with transparent paging) and exposes helpers for converting the response into common Python data structures:

* [`to_dataframe()`](data-collection.md#coinmetrics._data_collection.DataCollection.to_dataframe) -- materialize into a pandas or polars dataframe.
* [`to_list()`](data-collection.md#coinmetrics._data_collection.DataCollection.to_list) -- materialize into `List[Dict[str, Any]]`.
* [`export_to_csv()`](data-collection.md#coinmetrics._data_collection.DataCollection.export_to_csv) -- stream the response into a CSV file or buffer.
* [`export_to_json()`](data-collection.md#coinmetrics._data_collection.DataCollection.export_to_json) -- stream the response into a JSON file or buffer.
* [`export_to_parquet()`](data-collection.md#coinmetrics._data_collection.DataCollection.export_to_parquet) -- stream the response into a Parquet file.
* [`parallel()`](data-collection.md#coinmetrics._data_collection.DataCollection.parallel) -- return a [`ParallelDataCollection`](parallel-data-collection.md#coinmetrics._data_collection.ParallelDataCollection) that splits the request across worker threads. The result can be chained with [`to_dataframe()`](data-collection.md#coinmetrics._data_collection.DataCollection.to_dataframe), [`to_list()`](data-collection.md#coinmetrics._data_collection.DataCollection.to_list), [`export_to_csv_files()`](parallel-data-collection.md#coinmetrics._data_collection.ParallelDataCollection.export_to_csv_files), [`export_to_json_files()`](parallel-data-collection.md#coinmetrics._data_collection.ParallelDataCollection.export_to_json_files), and so on.
* **Parameters:**
  * **data\_retrieval\_function** (_DataRetrievalFuncType_)
  * **endpoint** ([_str_](https://docs.python.org/3/library/stdtypes.html#str))
  * **url\_params** (_Dict_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _,_ _UrlParamTypes_ _]_)
  * **csv\_export\_supported** ([_bool_](https://docs.python.org/3/library/functions.html#bool))
  * **client** (_Optional_ _\[_[_CoinMetricsClient_](../../../reference/coinmetricsclient/#coinmetrics.api_client.CoinMetricsClient) _]_)
  * **paginated** ([_bool_](https://docs.python.org/3/library/functions.html#bool))
  * **kwargs** (_Any_)

#### `export_to_csv(path_or_bufstr=None, columns_to_store=None, compress=False)`

* **Parameters:**
  * **path\_or\_bufstr** ([_str_](https://docs.python.org/3/library/stdtypes.html#str) _|_ _Path_ _|_ [_IO_](https://docs.python.org/3/library/typing.html#typing.IO) _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_ _|_ [_IO_](https://docs.python.org/3/library/typing.html#typing.IO) _\[_[_bytes_](https://docs.python.org/3/library/stdtypes.html#bytes) _]_ _|_ _None_)
  * **columns\_to\_store** ([_List_](https://docs.python.org/3/library/typing.html#typing.List) _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_ _|_ _None_)
  * **compress** ([_bool_](https://docs.python.org/3/library/functions.html#bool))
* **Return type:** [str](https://docs.python.org/3/library/stdtypes.html#str) | None

#### `export_to_json(path_or_bufstr=None, compress=False)`

* **Parameters:**
  * **path\_or\_bufstr** ([_str_](https://docs.python.org/3/library/stdtypes.html#str) _|_ _Path_ _|_ [_IO_](https://docs.python.org/3/library/typing.html#typing.IO) _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_ _|_ [_IO_](https://docs.python.org/3/library/typing.html#typing.IO) _\[_[_bytes_](https://docs.python.org/3/library/stdtypes.html#bytes) _]_ _|_ _None_)
  * **compress** ([_bool_](https://docs.python.org/3/library/functions.html#bool))
* **Return type:** [str](https://docs.python.org/3/library/stdtypes.html#str) | None

#### `export_to_parquet(path_or_bufstr=None)`

* **Parameters:** **path\_or\_bufstr** ([_str_](https://docs.python.org/3/library/stdtypes.html#str) _|_ _Path_ _|_ [_IO_](https://docs.python.org/3/library/typing.html#typing.IO) _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_ _|_ [_IO_](https://docs.python.org/3/library/typing.html#typing.IO) _\[_[_bytes_](https://docs.python.org/3/library/stdtypes.html#bytes) _]_ _|_ _None_)
* **Return type:** None

#### `first_page()`

* **Return type:** [_List_](https://docs.python.org/3/library/typing.html#typing.List)\[[_Dict_](https://docs.python.org/3/library/typing.html#typing.Dict)\[[str](https://docs.python.org/3/library/stdtypes.html#str), [_Any_](https://docs.python.org/3/library/typing.html#typing.Any)]]

#### `get_schema_field_names()`

Get all field names defined in the schema for this endpoint. This returns ALL possible fields, even if they're not present in the actual data.

* **Returns:** List of field names from the schema
* **Return type:** List\[[str](https://docs.python.org/3/library/stdtypes.html#str)]

#### `parallel(parallelize_on=None, executor=None, max_workers=None, progress_bar=None, time_increment=None, height_increment=None)`

Convert this [`DataCollection`](data-collection.md#coinmetrics._data_collection.DataCollection) into a [`ParallelDataCollection`](parallel-data-collection.md#coinmetrics._data_collection.ParallelDataCollection), splitting a single HTTP request into many parallel requests for faster data export.

By default the request is split on the primary query parameter (for example, `get_asset_metrics(assets=...)` is split into one request per asset).

* **Parameters:**
  * **parallelize\_on** (_Optional_ \*\[\*_Union_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _,_ _List_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_ _]_ _]_) -- Parameter(s) to parallelize on. Must be one of the list-type parameters of the underlying endpoint (`assets`, `markets`, `metrics`, ...).
  * **executor** (_Optional_ \*\[\*_Callable_ _\[_ \*\[\*_Any_ _]_ _,_ [_concurrent.futures.Executor_](https://docs.python.org/3/library/concurrent.futures.html#concurrent.futures.Executor) _]_ _]_) -- Executor class used for concurrency. Defaults to [`concurrent.futures.ThreadPoolExecutor`](https://docs.python.org/3/library/concurrent.futures.html#concurrent.futures.ThreadPoolExecutor); pass a [`ProcessPoolExecutor`](https://docs.python.org/3/library/concurrent.futures.html#concurrent.futures.ProcessPoolExecutor) (or any other `Executor` subclass) to swap it out.
  * **max\_workers** (_Optional_ _\[_[_int_](https://docs.python.org/3/library/functions.html#int) _]_) -- Number of parallel workers. Defaults to `10` and is capped at `10` to respect API rate limits.
  * **progress\_bar** (_Optional_ _\[_[_bool_](https://docs.python.org/3/library/functions.html#bool) _]_) -- Whether to display a `tqdm` progress bar while the workers run. Defaults to `True`.
  * **time\_increment** (_Optional_ \*\[\*_Union_ \*\[\*_relativedelta_ _,_ _timedelta_ _,_ _DateOffset_ _]_ _]_) -- Optionally split the request along the time axis as well. Use [`datetime.timedelta`](https://docs.python.org/3/library/datetime.html#datetime.timedelta) for sub-month windows and `dateutil.relativedelta.relativedelta` for month / year windows. Requires `start_time` to be set on the original request.
  * **height\_increment** (_Optional_ _\[_[_int_](https://docs.python.org/3/library/functions.html#int) _]_) -- Optionally split the request along the block-height axis. Requires `start_height` to be set on the original request.
* **Returns:** A [`ParallelDataCollection`](parallel-data-collection.md#coinmetrics._data_collection.ParallelDataCollection) that mirrors the original request but executes its workload across multiple workers.
* **Return type:** [ParallelDataCollection](parallel-data-collection.md#coinmetrics._data_collection.ParallelDataCollection)

#### `to_dataframe(dtype_mapper=None, dataframe_type='pandas', decimal_as_string=False)`

Outputs a pandas or polars dataframe with schema-derived types.

Uses PyArrow as the intermediate representation for type-safe, near-zero-copy conversion to both pandas and polars.

* **Parameters:**
  * **dtype\_mapper** ([_dict_](https://docs.python.org/3/library/stdtypes.html#dict)) -- Optional dictionary mapping column names to pandas dtypes. Overrides schema-derived types for the specified columns.
  * **dataframe\_type** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Type of dataframe outputted, either "pandas" (default) or "polars".
  * **decimal\_as\_string** ([_bool_](https://docs.python.org/3/library/functions.html#bool)) -- If True, decimal columns are returned as strings to preserve full precision. If False (default), decimals are cast to float64 which may lose precision for values with more than \~15 significant digits.
* **Returns:** Data in a pandas or polars dataframe
* **Return type:** DataFrameType

#### `to_lazyframe(decimal_as_string=False, **kwargs)`

* **Parameters:**
  * **decimal\_as\_string** ([_bool_](https://docs.python.org/3/library/functions.html#bool))
  * **kwargs** ([_Any_](https://docs.python.org/3/library/typing.html#typing.Any))
* **Return type:** _LazyFrame_

#### `to_list()`

* **Return type:** [_List_](https://docs.python.org/3/library/typing.html#typing.List)\[[_Dict_](https://docs.python.org/3/library/typing.html#typing.Dict)\[[str](https://docs.python.org/3/library/stdtypes.html#str), [_Any_](https://docs.python.org/3/library/typing.html#typing.Any)]]

## CatalogV2DataCollection

Returned by every `catalog_*_v2` method on `CoinMetricsClient`. Adds `to_dataframe` flattening for the nested `catalog-v2` response shape (per-frequency `min_time`/`max_time` rows are exploded into one row per metric or frequency).

### _class_ `coinmetrics._data_collection.CatalogV2DataCollection(data_retrieval_function, endpoint, url_params, csv_export_supported=True, client=None, metric_type=None, iterable_col=None, iterable_key=None, explode_on=None, assign_to=None, nested_catalog_columns=['min_time', 'max_time'], dataframe_type='pandas', **kwargs)`

Bases: [`DataCollection`](data-collection.md#coinmetrics._data_collection.DataCollection)

This class is used to implement functionality specific to catalog-v2 endpoints.

* **Parameters:**
  * **data\_retrieval\_function** (_DataRetrievalFuncType_)
  * **endpoint** ([_str_](https://docs.python.org/3/library/stdtypes.html#str))
  * **url\_params** (_Dict_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _,_ _UrlParamTypes_ _]_)
  * **csv\_export\_supported** ([_bool_](https://docs.python.org/3/library/functions.html#bool))
  * **client** (_Optional_ _\[_[_CoinMetricsClient_](../../../reference/coinmetricsclient/#coinmetrics.api_client.CoinMetricsClient) _]_)
  * **metric\_type** (_Optional_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_)
  * **iterable\_col** (_Optional_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_)
  * **iterable\_key** (_Optional_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_)
  * **explode\_on** (_Optional_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_)
  * **assign\_to** (_Optional_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_)
  * **nested\_catalog\_columns** (_List_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_)
  * **dataframe\_type** ([_str_](https://docs.python.org/3/library/stdtypes.html#str))
  * **kwargs** (_Any_)

#### `export_to_csv(path_or_bufstr=None, columns_to_store=None, compress=False)`

* **Parameters:**
  * **path\_or\_bufstr** ([_str_](https://docs.python.org/3/library/stdtypes.html#str) _|_ _Path_ _|_ [_IO_](https://docs.python.org/3/library/typing.html#typing.IO) _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_ _|_ [_IO_](https://docs.python.org/3/library/typing.html#typing.IO) _\[_[_bytes_](https://docs.python.org/3/library/stdtypes.html#bytes) _]_ _|_ _None_)
  * **columns\_to\_store** ([_List_](https://docs.python.org/3/library/typing.html#typing.List) _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_ _|_ _None_)
  * **compress** ([_bool_](https://docs.python.org/3/library/functions.html#bool))
* **Return type:** [str](https://docs.python.org/3/library/stdtypes.html#str) | None

#### `export_to_json(path_or_bufstr=None, compress=False)`

* **Parameters:**
  * **path\_or\_bufstr** ([_str_](https://docs.python.org/3/library/stdtypes.html#str) _|_ _Path_ _|_ [_IO_](https://docs.python.org/3/library/typing.html#typing.IO) _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_ _|_ [_IO_](https://docs.python.org/3/library/typing.html#typing.IO) _\[_[_bytes_](https://docs.python.org/3/library/stdtypes.html#bytes) _]_ _|_ _None_)
  * **compress** ([_bool_](https://docs.python.org/3/library/functions.html#bool))
* **Return type:** [str](https://docs.python.org/3/library/stdtypes.html#str) | None

#### `export_to_parquet(path_or_bufstr=None)`

* **Parameters:** **path\_or\_bufstr** ([_str_](https://docs.python.org/3/library/stdtypes.html#str) _|_ _Path_ _|_ [_IO_](https://docs.python.org/3/library/typing.html#typing.IO) _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_ _|_ [_IO_](https://docs.python.org/3/library/typing.html#typing.IO) _\[_[_bytes_](https://docs.python.org/3/library/stdtypes.html#bytes) _]_ _|_ _None_)
* **Return type:** None

#### `first_page()`

* **Return type:** [_List_](https://docs.python.org/3/library/typing.html#typing.List)\[[_Dict_](https://docs.python.org/3/library/typing.html#typing.Dict)\[[str](https://docs.python.org/3/library/stdtypes.html#str), [_Any_](https://docs.python.org/3/library/typing.html#typing.Any)]]

#### `get_schema_field_names()`

Get all field names defined in the schema for this endpoint. This returns ALL possible fields, even if they're not present in the actual data.

* **Returns:** List of field names from the schema
* **Return type:** List\[[str](https://docs.python.org/3/library/stdtypes.html#str)]

#### `parallel(parallelize_on=None, executor=None, max_workers=None, progress_bar=None, time_increment=None, height_increment=None)`

Convert this [`DataCollection`](data-collection.md#coinmetrics._data_collection.DataCollection) into a [`ParallelDataCollection`](parallel-data-collection.md#coinmetrics._data_collection.ParallelDataCollection), splitting a single HTTP request into many parallel requests for faster data export.

By default the request is split on the primary query parameter (for example, `get_asset_metrics(assets=...)` is split into one request per asset).

* **Parameters:**
  * **parallelize\_on** (_Optional_ \*\[\*_Union_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _,_ _List_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_ _]_ _]_) -- Parameter(s) to parallelize on. Must be one of the list-type parameters of the underlying endpoint (`assets`, `markets`, `metrics`, ...).
  * **executor** (_Optional_ \*\[\*_Callable_ _\[_ \*\[\*_Any_ _]_ _,_ [_concurrent.futures.Executor_](https://docs.python.org/3/library/concurrent.futures.html#concurrent.futures.Executor) _]_ _]_) -- Executor class used for concurrency. Defaults to [`concurrent.futures.ThreadPoolExecutor`](https://docs.python.org/3/library/concurrent.futures.html#concurrent.futures.ThreadPoolExecutor); pass a [`ProcessPoolExecutor`](https://docs.python.org/3/library/concurrent.futures.html#concurrent.futures.ProcessPoolExecutor) (or any other `Executor` subclass) to swap it out.
  * **max\_workers** (_Optional_ _\[_[_int_](https://docs.python.org/3/library/functions.html#int) _]_) -- Number of parallel workers. Defaults to `10` and is capped at `10` to respect API rate limits.
  * **progress\_bar** (_Optional_ _\[_[_bool_](https://docs.python.org/3/library/functions.html#bool) _]_) -- Whether to display a `tqdm` progress bar while the workers run. Defaults to `True`.
  * **time\_increment** (_Optional_ \*\[\*_Union_ \*\[\*_relativedelta_ _,_ _timedelta_ _,_ _DateOffset_ _]_ _]_) -- Optionally split the request along the time axis as well. Use [`datetime.timedelta`](https://docs.python.org/3/library/datetime.html#datetime.timedelta) for sub-month windows and `dateutil.relativedelta.relativedelta` for month / year windows. Requires `start_time` to be set on the original request.
  * **height\_increment** (_Optional_ _\[_[_int_](https://docs.python.org/3/library/functions.html#int) _]_) -- Optionally split the request along the block-height axis. Requires `start_height` to be set on the original request.
* **Returns:** A [`ParallelDataCollection`](parallel-data-collection.md#coinmetrics._data_collection.ParallelDataCollection) that mirrors the original request but executes its workload across multiple workers.
* **Return type:** [ParallelDataCollection](parallel-data-collection.md#coinmetrics._data_collection.ParallelDataCollection)

#### `to_dataframe(dtype_mapper=None, dataframe_type='pandas', decimal_as_string=False)`

Transform a `catalog-v2` response into a flat dataframe.

For `*-metrics` and `market-*` endpoints the per-frequency `min_time` / `max_time` rows are exploded into one row per metric or frequency.

* **Parameters:**
  * **dtype\_mapper** (_Optional_ \*\[\*_Dict_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _,_ _Any_ _]_ _]_) -- Optional dictionary mapping column names to pandas dtypes. Overrides schema-derived types for the specified columns.
  * **dataframe\_type** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Type of dataframe to return -- either `"pandas"` (default) or `"polars"`.
  * **decimal\_as\_string** ([_bool_](https://docs.python.org/3/library/functions.html#bool)) -- If `True`, decimal columns are returned as strings to preserve full precision. If `False` (default), decimals are cast to `float64`, which may lose precision for values with more than \~15 significant digits.
* **Returns:** A pandas or polars dataframe.
* **Return type:** DataFrameType

#### `to_lazyframe(decimal_as_string=False, **kwargs)`

* **Parameters:**
  * **decimal\_as\_string** ([_bool_](https://docs.python.org/3/library/functions.html#bool))
  * **kwargs** ([_Any_](https://docs.python.org/3/library/typing.html#typing.Any))
* **Return type:** _LazyFrame_

#### `to_list()`

* **Return type:** [_List_](https://docs.python.org/3/library/typing.html#typing.List)\[[_Dict_](https://docs.python.org/3/library/typing.html#typing.Dict)\[[str](https://docs.python.org/3/library/stdtypes.html#str), [_Any_](https://docs.python.org/3/library/typing.html#typing.Any)]]
