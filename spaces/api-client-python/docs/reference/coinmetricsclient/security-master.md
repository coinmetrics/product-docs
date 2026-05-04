# Security Master

#### `CoinMetricsClient.security_master_assets(assets=None, codes=None, page_size=None, paging_from=None, next_page_token=None)`
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
  [DataCollection](../data-collection.md#coinmetrics._data_collection.DataCollection)

#### `CoinMetricsClient.security_master_markets(type=None, markets=None, symbol=None, exchange=None, base=None, quote=None, page_size=None, paging_from=None, next_page_token=None)`
Returns metadata on all the markets offered (spot, options, futures), sorted alphabetically by market.

* **Parameters:**
  * **type** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Type of markets.
  * **markets** (*Optional* *[**Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]* *]*) -- List of markets.
  * **symbol** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Symbol of derivative markets, full instrument name.
  * **exchange** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Unique name of an exchange.
  * **base** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Base asset of markets.
  * **quote** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Quote asset of markets.
  * **page_size** (*Optional* *[*[*int*](https://docs.python.org/3/library/functions.html#int) *]*) -- Number of items per single page of results.
  * **paging_from** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Where does the first page start, at the start of the interval or at the end.
  * **next_page_token** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use next_page_url response field.
* **Returns:**
  List of security master entries.
* **Return type:**
  [DataCollection](../data-collection.md#coinmetrics._data_collection.DataCollection)
