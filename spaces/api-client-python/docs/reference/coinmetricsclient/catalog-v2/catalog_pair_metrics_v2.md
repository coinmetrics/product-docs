# CoinMetricsClient.catalog_pair_metrics_v2

```python
coinmetrics.api_client.CoinMetricsClient.catalog_pair_metrics_v2(
    pairs=None,
    metrics=None,
    reviewable=None,
    page_size=None,
    paging_from=None,
    next_page_token=None,
    format='json_stream',
)
```

Returns a list of available pair metrics along with the time ranges of available data.

* **Parameters:**
  * **pairs** (*Optional* *[**Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]* *]*) -- Comma separated list of asset pairs. By default, all asset pairs are returned.
  * **metrics** (*Optional* *[**Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]* *]*) -- Comma separated list of metrics. By default all metrics are returned.
  * **reviewable** (*Optional* *[*[*bool*](https://docs.python.org/3/library/functions.html#bool) *]*) -- Limit to human-reviewable metrics. By default all metrics are returned.
  * **page_size** (*Optional* *[*[*int*](https://docs.python.org/3/library/functions.html#int) *]*) -- Number of items per single page of results.
  * **paging_from** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Where does the first page start, at the start of the interval or at the end.
  * **next_page_token** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use next_page_url response field.
  * **format** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'.
* **Returns:**
  List of pair metrics.
* **Return type:**
  [CatalogV2DataCollection](../../data-collection.md#coinmetrics._data_collection.CatalogV2DataCollection)
