---
description: 'The DataCollection class is a Python wrapper for collecting data from the CoinMetrics API. It can be used to transform API calls into Python data structures. For example: `DataCollection.to_dataframe()` -> pd.DataFrame or pl.DataFrame. `...'
icon: code
---


# DataCollection

`coinmetrics._data_collection.DataCollection`

The DataCollection class is a Python wrapper for collecting data from the CoinMetrics API. It can be used to transform API calls into Python data structures. For example:
`DataCollection.to_dataframe()` -> pd.DataFrame or pl.DataFrame.
`DataCollection.to_list()` -> List[Dict[str, Any]].
`DataCollection.export_to_csv()` -> str. Export data to a CSV file.
`DataCollection.export_to_json()` -> str. Export data to a JSON file.
`DataCollection.parallel()` -> ParallelDataCollection. Make API calls in parallel. Can be chained with `.to_dataframe()`, `.to_list()`, `.export_to_csv()`, `.export_to_json()`, `.export_to_csv_files()`, `.export_to_json_files()`.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/_data_collection.py#L101)

## Constructor

```python
def DataCollection.__init__(self, data_retrieval_function: DataRetrievalFuncType, endpoint: str, url_params: Dict[str, UrlParamTypes], csv_export_supported: bool=True, client: Optional[CoinMetricsClient]=None, paginated: bool=True, **kwargs: Any) -> None:
```


**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `data_retrieval_function` | `DataRetrievalFuncType` | The function to use to retrieve data from the CoinMetrics API. |
| `endpoint` | `str` | The CoinMetrics API endpoint. |
| `url_params` | `Dict[str, UrlParamTypes]` | The URL parameters to use to retrieve data from the CoinMetrics API. |
| `csv_export_supported` | `bool` | Whether CSV export is supported for this data type. |
| `client` | `CoinMetricsClient` | The CoinMetricsClient to use to retrieve data from the CoinMetrics API. |

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/_data_collection.py#L126)

## Methods

### `get_schema_field_names`

```python
def DataCollection.get_schema_field_names(self) -> List[str]:
```


Get all field names defined in the schema for this endpoint.
This returns ALL possible fields, even if they're not present in the actual data.

**Returns**

`List[str]` &mdash; List of field names from the schema

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/_data_collection.py#L198)

### `first_page`

```python
def DataCollection.first_page(self) -> List[Dict[str, Any]]:
```


[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/_data_collection.py#L210)

### `to_list`

```python
def DataCollection.to_list(self) -> List[Dict[str, Any]]:
```


[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/_data_collection.py#L226)

### `export_to_csv`

```python
def DataCollection.export_to_csv(self, path_or_bufstr: FilePathOrBuffer=None, columns_to_store: Optional[List[str]]=None, compress: bool=False) -> Optional[str]:
```


[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/_data_collection.py#L303)

### `export_to_json`

```python
def DataCollection.export_to_json(self, path_or_bufstr: FilePathOrBuffer=None, compress: bool=False) -> Optional[str]:
```


[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/_data_collection.py#L351)

### `export_to_parquet`

```python
def DataCollection.export_to_parquet(self, path_or_bufstr: FilePathOrBuffer=None) -> None:
```


[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/_data_collection.py#L662)

### `to_dataframe`

```python
def DataCollection.to_dataframe(self, dtype_mapper: Optional[Dict[str, Any]]=None, dataframe_type: str='pandas', decimal_as_string: bool=False) -> DataFrameType:
```


**Deprecated:** Outputs a pandas or polars dataframe with schema-derived types.

Uses PyArrow as the intermediate representation for type-safe,
near-zero-copy conversion to both pandas and polars.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `dtype_mapper` | `dict` | Optional dictionary mapping column names to pandas dtypes.  Overrides schema-derived types for the specified columns. |
| `dataframe_type` | `str` | Type of dataframe outputted, either "pandas" (default) or "polars". |
| `decimal_as_string` | `bool` | If True, decimal columns are returned as strings to preserve full precision. If False (default), decimals are cast to float64 which may lose precision for values with more than ~15 significant digits. |

**Returns**

`DataFrameType` &mdash; Data in a pandas or polars dataframe

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/_data_collection.py#L674)

### `to_lazyframe`

```python
def DataCollection.to_lazyframe(self, **kwargs: Any) -> pl.LazyFrame:
```


[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/_data_collection.py#L736)

### `parallel`

```python
def DataCollection.parallel(self, parallelize_on: Optional[Union[str, List[str]]]=None, executor: Optional[Callable[[Any], Executor]]=None, max_workers: Optional[int]=None, progress_bar: Optional[bool]=None, time_increment: Optional[Union[relativedelta, timedelta, DateOffset]]=None, height_increment: Optional[int]=None) -> 'ParallelDataCollection':
```


This method will convert the DataCollection into a ParallelDataCollection - enabling the ability to split
one http request into many HTTP requests for faster data export. By default this will be split based on the
primary query parameter. For example if you query get_asset_metrics(assets=....) it will split into many requests
based on the assets.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `parallelize_on` | `List[str], str` | parameter(s) to parallelize on. Can be any list type parameters |
| `executor` | `Executor` | By defualt the ParallelDataCollection will use a ProcessPoolExecutor, but this can be changed |
| `max_workers` |  | Specify the number of parallel threads. By default this is 10 and cannot be increased beyond 10 |
| `progress_bar` | `bool` | flag to show a progress bar for data export or not, by default is true |
| `time_increment` | `timedelta, relativedelta` | option to parallelize by a time. Can use timedelta for time periods in weeks and relativedelta for longer time periods like a month or year |
| `height_increment` | `int` | Optionally, can split the data collections by height_increment. This feature splits data collections further by block height increment. If there is no "start_height" in the request it will raise a ValueError |

**Returns**

ParallelDataCollection that matches the existing one

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/_data_collection.py#L746)
