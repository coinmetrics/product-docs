# `CoinMetricsClient.reference_data_exchange_pair_metrics`

```python
coinmetrics.api_client.CoinMetricsClient.reference_data_exchange_pair_metrics(
    metrics=None,
    page_size=None,
    paging_from=None,
    format='json_stream',
)
```

Returns a list of exchange pair metrics metadata.

* **Parameters:**
  * **metrics** (*Optional* *[**Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]* *]*) -- Comma separated list of metrics. By default all metrics are returned.
  * **page_size** (*Optional* *[*[*int*](https://docs.python.org/3/library/functions.html#int) *]*) -- Number of items per single page of results.
  * **paging_from** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Where does the first page start, at the start of the interval or at the end.
  * **format** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Default: "json_stream" (catalog-v2 and reference-data, market-orderbooks and other heavy endpoints), "json" (timeseries/`*-metrics` and other lighter endpoints). Format of the response. Supported values are json, json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'.
* **Returns:**
  List of exchange asset metrics metadata.
* **Return type:**
  [DataCollection](../../data-collection/README.md#coinmetrics._data_collection.DataCollection)
