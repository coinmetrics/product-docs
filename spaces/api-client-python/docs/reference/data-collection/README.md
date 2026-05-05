# DataCollection

<a id="coinmetrics._data_collection.DataCollection"></a>

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

Every REST method on [`CoinMetricsClient`](../coinmetricsclient.md#coinmetrics.api_client.CoinMetricsClient)
returns a `DataCollection`. It iterates over rows on demand (with
transparent paging) and exposes helpers for converting the response into
common Python data structures:

- [`to_dataframe()`](to_dataframe.md#coinmetrics._data_collection.DataCollection.to_dataframe) -- materialize into a pandas or polars dataframe.
- [`to_list()`](to_list.md#coinmetrics._data_collection.DataCollection.to_list) -- materialize into `List[Dict[str, Any]]`.
- [`export_to_csv()`](export_to_csv.md#coinmetrics._data_collection.DataCollection.export_to_csv) -- stream the response into a CSV file or buffer.
- [`export_to_json()`](export_to_json.md#coinmetrics._data_collection.DataCollection.export_to_json) -- stream the response into a JSON file or buffer.
- [`export_to_parquet()`](export_to_parquet.md#coinmetrics._data_collection.DataCollection.export_to_parquet) -- stream the response into a Parquet file.
- [`parallel()`](parallel.md#coinmetrics._data_collection.DataCollection.parallel) -- return a [`ParallelDataCollection`](../parallel-data-collection/README.md#coinmetrics._data_collection.ParallelDataCollection) that splits
  the request across worker threads. The result can be chained with
  [`to_dataframe()`](to_dataframe.md#coinmetrics._data_collection.DataCollection.to_dataframe), [`to_list()`](to_list.md#coinmetrics._data_collection.DataCollection.to_list),
  [`export_to_csv_files()`](../parallel-data-collection/export_to_csv_files.md#coinmetrics._data_collection.ParallelDataCollection.export_to_csv_files),
  [`export_to_json_files()`](../parallel-data-collection/export_to_json_files.md#coinmetrics._data_collection.ParallelDataCollection.export_to_json_files), and so on.

* **Parameters:**
  * **data_retrieval_function** (*DataRetrievalFuncType*)
  * **endpoint** ([*str*](https://docs.python.org/3/library/stdtypes.html#str))
  * **url_params** (*Dict* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *UrlParamTypes* *]*)
  * **csv_export_supported** ([*bool*](https://docs.python.org/3/library/functions.html#bool))
  * **client** (*Optional* *[*[*CoinMetricsClient*](../coinmetricsclient.md#coinmetrics.api_client.CoinMetricsClient) *]*)
  * **paginated** ([*bool*](https://docs.python.org/3/library/functions.html#bool))
  * **kwargs** (*Any*)

## Methods

* [`DataCollection.get_schema_field_names`](get_schema_field_names.md)
* [`DataCollection.first_page`](first_page.md)
* [`DataCollection.to_list`](to_list.md)
* [`DataCollection.export_to_csv`](export_to_csv.md)
* [`DataCollection.export_to_json`](export_to_json.md)
* [`DataCollection.export_to_parquet`](export_to_parquet.md)
* [`DataCollection.to_dataframe`](to_dataframe.md)
* [`DataCollection.to_lazyframe`](to_lazyframe.md)
* [`DataCollection.parallel`](parallel.md)
