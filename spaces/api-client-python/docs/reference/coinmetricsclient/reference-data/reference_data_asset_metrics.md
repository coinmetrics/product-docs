```python
coinmetrics.api_client.CoinMetricsClient.reference_data_asset_metrics(
    metrics=None,
    reviewable=None,
    page_size=None,
    paging_from=None,
    format='json_stream',
)
```

Returns a list of asset metrics metadata.

* **Parameters:**
  * **metrics** (*Optional* *[**Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]* *]*) -- Comma separated list of metrics. By default all metrics are returned.
  * **reviewable** (*Optional* *[*[*bool*](https://docs.python.org/3/library/functions.html#bool) *]*) -- Limit to human-reviewable metrics. By default all metrics are returned.
  * **page_size** (*Optional* *[*[*int*](https://docs.python.org/3/library/functions.html#int) *]*) -- Number of items per single page of results.
  * **paging_from** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Where does the first page start, at the start of the interval or at the end.
  * **format** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'.
* **Returns:**
  List of asset metrics metadata.
* **Return type:**
  [DataCollection](../../data-collection/README.md#coinmetrics._data_collection.DataCollection)
