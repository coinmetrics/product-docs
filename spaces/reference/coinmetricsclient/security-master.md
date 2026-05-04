# Security Master

#### `CoinMetricsClient.security_master_assets(assets=None, codes=None, page_size=None, paging_from=None, next_page_token=None)`

Returns all the assets and their metadata in security master.

* **Parameters:**
  * **assets** (_Optional_ \*\[\*_Union_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _,_ _List_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_ _]_ _]_) -- Comma-separated list of assets to query. Mutually exclusive with codes.
  * **codes** (_Optional_ \*\[\*_Union_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _,_ _List_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_ _]_ _]_) -- Comma-separated list of ten-digit alphanumeric identifying codes. Mutually exclusive with assets.
  * **page\_size** (_Optional_ _\[_[_int_](https://docs.python.org/3/library/functions.html#int) _]_) -- Number of items per single page of results.
  * **paging\_from** (_Optional_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_) -- Where does the first page start, at the start of the interval or at the end.
  * **next\_page\_token** (_Optional_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_) -- Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use next\_page\_url response field.
* **Returns:** List of assets and their metadata in security master
* **Return type:** [DataCollection](../../api-client-python/docs/reference/data-collection.md#coinmetrics._data_collection.DataCollection)

#### `CoinMetricsClient.security_master_markets(type=None, markets=None, symbol=None, exchange=None, base=None, quote=None, page_size=None, paging_from=None, next_page_token=None)`

Returns metadata on all the markets offered (spot, options, futures), sorted alphabetically by market.

* **Parameters:**
  * **type** (_Optional_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_) -- Type of markets.
  * **markets** (_Optional_ \*\[\*_Union_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _,_ _List_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_ _]_ _]_) -- List of markets.
  * **symbol** (_Optional_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_) -- Symbol of derivative markets, full instrument name.
  * **exchange** (_Optional_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_) -- Unique name of an exchange.
  * **base** (_Optional_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_) -- Base asset of markets.
  * **quote** (_Optional_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_) -- Quote asset of markets.
  * **page\_size** (_Optional_ _\[_[_int_](https://docs.python.org/3/library/functions.html#int) _]_) -- Number of items per single page of results.
  * **paging\_from** (_Optional_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_) -- Where does the first page start, at the start of the interval or at the end.
  * **next\_page\_token** (_Optional_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_) -- Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use next\_page\_url response field.
* **Returns:** List of security master entries.
* **Return type:** [DataCollection](../../api-client-python/docs/reference/data-collection.md#coinmetrics._data_collection.DataCollection)
