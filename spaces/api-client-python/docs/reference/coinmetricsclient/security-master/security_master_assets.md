# CoinMetricsClient.security_master_assets

<a id="coinmetrics.api_client.CoinMetricsClient.security_master_assets"></a>

## `coinmetrics.api_client.CoinMetricsClient.security_master_assets(assets=None, codes=None, page_size=None, paging_from=None, next_page_token=None)`

Returns all the assets and their metadata in security master.

* **Parameters:**
  * **assets** (*Optional* *[**Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]* *]*) -- Comma-separated list of assets to query. Mutually exclusive with codes.
  * **codes** (*Optional* *[**Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]* *]*) -- Comma-separated list of ten-digit alphanumeric identifying codes. Mutually exclusive with assets.
  * **page_size** (*Optional* *[*[*int*](https://docs.python.org/3/library/functions.html#int) *]*) -- Number of items per single page of results.
  * **paging_from** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Where does the first page start, at the start of the interval or at the end.
  * **next_page_token** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use next_page_url response field.
* **Returns:**
  List of assets and their metadata in security master
* **Return type:**
  [DataCollection](../../data-collection/README.md#coinmetrics._data_collection.DataCollection)
