```python
coinmetrics.api_client.CoinMetricsClient.catalog_full_market_metrics_v2(
    markets=None,
    metrics=None,
    exchange=None,
    market_type=None,
    base=None,
    quote=None,
    asset=None,
    symbol=None,
    format='json_stream',
    page_size=None,
    paging_from=None,
    next_page_token=None,
)
```

Returns a list of all markets with market metrics support along with time ranges of available data per
metric.

* **Parameters:**
  * **markets** (*Optional* *[**Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]* *]*) -- Comma separated list of markets. By default all markets are returned.
  * **metrics** (*Optional* *[**Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]* *]*) -- Comma separated list of metrics. By default all metrics are returned.
  * **exchange** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Unique name of an exchange.
  * **market_type** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Type of markets.
  * **base** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Base asset of markets.
  * **quote** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Quote asset of markets.
  * **asset** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Any asset of markets.
  * **symbol** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Symbol of derivative markets, full instrument name.
  * **format** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'.
  * **page_size** (*Optional* *[*[*int*](https://docs.python.org/3/library/functions.html#int) *]*) -- Number of items per single page of results.
  * **paging_from** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Where does the first page start, at the start of the interval or at the end.
  * **next_page_token** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use next_page_url response field.
* **Returns:**
  List of market metrics statistics.
* **Return type:**
  CatalogV2DataCollection
