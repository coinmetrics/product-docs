# CoinMetricsClient.catalog_full_pair_candles_v2

<a id="coinmetrics.api_client.CoinMetricsClient.catalog_full_pair_candles_v2"></a>

`coinmetrics.api_client.CoinMetricsClient.catalog_full_pair_candles_v2(pairs=None, page_size=None, paging_from=None, next_page_token=None, format='json_stream')`

Returns a list of all supported asset pair candles along with the time ranges of available data per
candle duration.

* **Parameters:**
  * **pairs** (*Optional* *[**Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]* *]*) -- Comma separated list of asset pairs. By default, all asset pairs are returned.
  * **page_size** (*Optional* *[*[*int*](https://docs.python.org/3/library/functions.html#int) *]*) -- Number of items per single page of results.
  * **paging_from** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Where does the first page start, at the start of the interval or at the end.
  * **next_page_token** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use next_page_url response field.
  * **format** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'.

**Returns:**

* CatalogV2DataCollection
  * List of asset pair candles statistics.
