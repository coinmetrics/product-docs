# ParallelDataCollection

<a id="coinmetrics._data_collection.ParallelDataCollection"></a>

`class coinmetrics._data_collection.ParallelDataCollection(parent_data_collection, parallelize_on=None, executor=None, max_workers=None, progress_bar=None, time_increment=None, height_increment=None)`

Bases: [`DataCollection`](../data-collection/README.md#coinmetrics._data_collection.DataCollection)

This class will be used as an extension of the normal data collection, but all functions will run in parallel,
utilizing Python's concurrent.futures features. The main purpose of this class is for historical export of
data.

* **Parameters:**
  * **parent_data_collection** ([*DataCollection*](../data-collection/README.md#coinmetrics._data_collection.DataCollection))
  * **parallelize_on** (*Optional* *[**Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]* *]*)
  * **executor** (*Optional* *[**Callable* *[* *...* *,* *Executor* *]* *]*)
  * **max_workers** (*Optional* *[*[*int*](https://docs.python.org/3/library/functions.html#int) *]*)
  * **progress_bar** (*Optional* *[*[*bool*](https://docs.python.org/3/library/functions.html#bool) *]*)
  * **time_increment** (*Optional* *[**Union* *[**relativedelta* *,* *timedelta* *,* *DateOffset* *]* *]*)
  * **height_increment** (*Optional* *[*[*int*](https://docs.python.org/3/library/functions.html#int) *]*)

### Methods

* [`ParallelDataCollection.get_parallel_datacollections`](get_parallel_datacollections.md)
* [`ParallelDataCollection.to_list`](to_list.md)
* [`ParallelDataCollection.to_dataframe`](to_dataframe.md)
* [`ParallelDataCollection.to_lazyframe`](to_lazyframe.md)
* [`ParallelDataCollection.export_to_csv_files`](export_to_csv_files.md)
* [`ParallelDataCollection.export_to_csv`](export_to_csv.md)
* [`ParallelDataCollection.export_to_json`](export_to_json.md)
* [`ParallelDataCollection.export_to_parquet_files`](export_to_parquet_files.md)
* [`ParallelDataCollection.export_to_json_files`](export_to_json_files.md)
* [`ParallelDataCollection.parse_date`](parse_date.md)
