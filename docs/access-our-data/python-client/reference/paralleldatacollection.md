---
description: "This class will be used as an extension of the normal data collection, but all functions will run in parallel, utilizing Python's concurrent.futures features. The main purpose of this class is for historical export of data."
icon: code
---


# ParallelDataCollection

`coinmetrics._data_collection.ParallelDataCollection`(DataCollection)

This class will be used as an extension of the normal data collection, but all functions will run in parallel,
utilizing Python's concurrent.futures features. The main purpose of this class is for historical export of
data.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/_data_collection.py#L785)

## Constructor

```python
def ParallelDataCollection.__init__(self, parent_data_collection: DataCollection, parallelize_on: Optional[Union[str, List[str]]]=None, executor: Optional[Callable[..., Executor]]=None, max_workers: Optional[int]=None, progress_bar: Optional[bool]=None, time_increment: Optional[Union[relativedelta, timedelta, DateOffset]]=None, height_increment: Optional[int]=None):
```


**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `parallelize_on` |  | What parameter to parallelize on. By default will use the primary query parameter in the endpoint the user is calling. For example - if the user is calling `.get_market_candles(assets="...") it will split their request into many separate requests, one for each asset |
| `executor` |  | by default this class uses ProcessPoolExecutor for concurrency, this could be swapped out for ThreadPoolExecutor or something else custom, based on User needs |
| `max_workers` |  | The default max_workers number is 10 - so up to 10 processes or threads will be running at once. Increasing this can make the code run faster, but users may run into issues with resources, or start to hit rate limits. |
| `progress_bar` |  | By default this class uses a tqdm progress bar to show the progress of the threads finishing so it is clear what is happening during long running intervals. Can be set to false to disable |
| `time_increment` |  | Optionally, can split the data collections by time_increment. This feature splits data collections further by time increment. So if you split by MONTH this will split a year long request into 12 smaller requests. If there is no "start_time" in the request it will raise a ValueError |
| `height_increment` |  | Optionally, can split the data collections by height_increment. This feature splits data collections further by block height increment. If there is no "start_height" in the request it will raise a ValueError |

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/_data_collection.py#L878)

## Methods

### `get_parallel_datacollections`

```python
def ParallelDataCollection.get_parallel_datacollections(self) -> List[DataCollection]:
```


This method creates a list of data collections all possible combinations of all the url parameters that are
parallelized on, as well as all over all date incremnts as specified in time_increment. For example, if a user
is calls client.get_asset_metrics(assets="btc,eth,algo", ...).parallel.get_parallel_datacollections() this will
return three data collections split by asset. If they instead called
client.get_asset_metrics(assets="btc,eth,algo", metrics="volume_reported_spot_usd_1d", "volume_trusted_spot_usd_1d").parallel(paralellize_on=["metrics", "assets"]).get_parallel_datacollections()
this would instead create 6 data collections combinations. There is also a possible time increment, so if the
user did client.get_asset_metrics(assets="btc,eth,algo", metrics="volume_reported_spot_usd_1d", "volume_trusted_spot_usd_1d", start_time="2023-01-01", end_time="2023-02-01).parallel(paralellize_on=["metrics", "assets'], time_increment=timedelta(weeks=2)).get_parallel_datacollections()
it would create 12 data collections total, since it would split it by the 2 week increment as well.

**Returns**

List[DataCollection] all combinations of DataCollections based on the parallelized parameters and time increment.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/_data_collection.py#L923)

### `to_list`

```python
def ParallelDataCollection.to_list(self) -> List[Dict[str, Any]]:
```


[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/_data_collection.py#L1072)

### `to_dataframe`

```python
def ParallelDataCollection.to_dataframe(self, dtype_mapper: Optional[Dict[str, Any]]=None, dataframe_type: str='pandas', decimal_as_string: bool=False) -> DataFrameType:
```


**Deprecated:**

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/_data_collection.py#L1085)

### `to_lazyframe`

```python
def ParallelDataCollection.to_lazyframe(self, **kwargs: Any) -> pl.LazyFrame:
```


[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/_data_collection.py#L1178)

### `export_to_csv_files`

```python
def ParallelDataCollection.export_to_csv_files(self, data_directory: Optional[str]=None, columns_to_store: Optional[List[str]]=None, compress: bool=False) -> None:
```


This function will export the data requested to several csvs, based on the `parallize_on` attribute of the
parent class, for example:
client.get_market_trades("coinbase-eth-btc-spot,coinbase-eth-usdc-spot").parallel(["markets"]) will create a
file each like ./market-trades/coinbase-eth-btc-spot.csv, ./market-trades/coinbase-eth-usdc-spot.csv
client.get_asset_metrics('btc,eth', 'ReferenceRateUSD', start_time='2024-01-01', limit_per_asset=1).parallel(
"assets,metrics", time_increment=timedelta(days=1))
will create a file each like ./asset-metrics/btc/ReferenceRateUSD/start_time=2024-01-01T00-00-00Z.csv,
./asset-metrics/eth/ReferenceRateUSD/start_time=2024-01-01T00-00-00Z.csv

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `data_directory` |  | str path to directory where files should be dropped |
| `columns_to_store` |  | List[str] columns to store |
| `compress` |  | bool whether or not to compress to tar files |

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/_data_collection.py#L1181)

### `export_to_csv`

```python
def ParallelDataCollection.export_to_csv(self, path_or_bufstr: FilePathOrBuffer=None, columns_to_store: Optional[List[str]]=None, compress: bool=False, dataframe_type: str='pandas') -> None:
```


[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/_data_collection.py#L1241)

### `export_to_json`

```python
def ParallelDataCollection.export_to_json(self, path_or_bufstr: FilePathOrBuffer=None, compress: bool=False) -> Optional[str]:
```


[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/_data_collection.py#L1253)

### `export_to_parquet_files`

```python
def ParallelDataCollection.export_to_parquet_files(self, data_directory: Optional[str]=None, **kwargs: Any) -> None:
```


[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/_data_collection.py#L1287)

### `export_to_json_files`

```python
def ParallelDataCollection.export_to_json_files(self, data_directory: Optional[str]=None, compress: bool=False) -> None:
```


This function will export the data requested to several json, based on the `parallelize_on` attribute of the
parent class, for example:
client.get_market_trades("coinbase-eth-btc-spot,coinbase-eth-usdc-spot").parallel("markets") will create a
file each like ./market-trades/coinbase-eth-btc-spot.json, ./market-trades/coinbase-eth-usdc-spot.json
client.get_asset_metrics('btc,eth', 'ReferenceRateUSD', start_time='2024-01-01', limit_per_asset=1).parallel(
"assets,metrics", time_increment=timedelta(days=1))
will create a file each like ./asset-metrics/btc/ReferenceRateUSD/start_time=2024-01-01T00-00-00Z.json,
./asset-metrics/eth/ReferenceRateUSD/start_time=2024-01-01T00-00-00Z.json

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `data_directory` |  | str path to directory where files should be dropped |
| `columns_to_store` |  | List[str] columns to store |
| `compress` |  | bool whether or not to compress to tar files |

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/_data_collection.py#L1333)

### `parse_date`

```python
def ParallelDataCollection.parse_date(date_input: Union[datetime, date, str, pd.Timestamp]) -> datetime:
```


Parses a datetime object or datetime string into a datetime object. Datetime string must be a valid
ISO 8601 format. Timezone aware objects are converted to UTC

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `date_input` |  | Union[datetime, date, str] date to parse into datetime |

**Returns**

datetime

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/_data_collection.py#L1525)
