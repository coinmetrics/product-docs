# Reference Data

#### `CoinMetricsClient.reference_data_asset_metrics(metrics=None, reviewable=None, page_size=None, paging_from=None, format='json_stream')`

Returns a list of asset metrics metadata.

* **Parameters:**
  * **metrics** (_Optional_ \*\[\*_Union_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _,_ _List_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_ _]_ _]_) -- Comma separated list of metrics. By default all metrics are returned.
  * **reviewable** (_Optional_ _\[_[_bool_](https://docs.python.org/3/library/functions.html#bool) _]_) -- Limit to human-reviewable metrics. By default all metrics are returned.
  * **page\_size** (_Optional_ _\[_[_int_](https://docs.python.org/3/library/functions.html#int) _]_) -- Number of items per single page of results.
  * **paging\_from** (_Optional_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_) -- Where does the first page start, at the start of the interval or at the end.
  * **format** (_Optional_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_) -- Format of the response. Supported values are json, json\_stream, csv. Default is json\_stream. Setting format='json\_stream' is generally more performant. page\_size and paging\_from is ignored when format='json\_stream'.
* **Returns:** List of asset metrics metadata.
* **Return type:** [DataCollection](../../api-client-python/docs/reference/data-collection.md#coinmetrics._data_collection.DataCollection)

#### `CoinMetricsClient.reference_data_assets(assets=None, include=None, page_size=None, paging_from=None, next_page_token=None, format='json_stream')`

Returns a list of assets metadata.

* **Parameters:**
  * **assets** (_Optional_ \*\[\*_Union_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _,_ _List_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_ _]_ _]_) -- Comma separated list of assets. By default all assets are returned.
  * **include** (_Optional_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_) -- Comma-separated list of namespaces to include in response. Currently, the only supported value is talos.
  * **page\_size** (_Optional_ _\[_[_int_](https://docs.python.org/3/library/functions.html#int) _]_) -- Number of items per single page of results.
  * **paging\_from** (_Optional_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_) -- Where does the first page start, at the start of the interval or at the end.
  * **next\_page\_token** (_Optional_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_) -- Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use next\_page\_url response field.
  * **format** (_Optional_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_) -- Format of the response. Supported values are json, json\_stream, csv. Default is json\_stream. Setting format='json\_stream' is generally more performant. page\_size and paging\_from is ignored when format='json\_stream'.
* **Returns:** List of assets metadata.
* **Return type:** [DataCollection](../../api-client-python/docs/reference/data-collection.md#coinmetrics._data_collection.DataCollection)

#### `CoinMetricsClient.reference_data_exchange_asset_metrics(metrics=None, page_size=None, paging_from=None, format='json_stream')`

Returns a list of exchange asset metrics metadata.

* **Parameters:**
  * **metrics** (_Optional_ \*\[\*_Union_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _,_ _List_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_ _]_ _]_) -- Comma separated list of metrics. By default all metrics are returned.
  * **page\_size** (_Optional_ _\[_[_int_](https://docs.python.org/3/library/functions.html#int) _]_) -- Number of items per single page of results.
  * **paging\_from** (_Optional_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_) -- Where does the first page start, at the start of the interval or at the end.
  * **format** (_Optional_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_) -- Format of the response. Supported values are json, json\_stream, csv. Default is json\_stream. Setting format='json\_stream' is generally more performant. page\_size and paging\_from is ignored when format='json\_stream'.
* **Returns:** List of exchange asset metrics metadata.
* **Return type:** [DataCollection](../../api-client-python/docs/reference/data-collection.md#coinmetrics._data_collection.DataCollection)

#### `CoinMetricsClient.reference_data_exchange_metrics(metrics=None, page_size=None, paging_from=None, format='json_stream')`

Returns a list of exchange metrics metadata.

* **Parameters:**
  * **metrics** (_Optional_ \*\[\*_Union_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _,_ _List_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_ _]_ _]_) -- Comma separated list of metrics. By default all metrics are returned.
  * **page\_size** (_Optional_ _\[_[_int_](https://docs.python.org/3/library/functions.html#int) _]_) -- Number of items per single page of results.
  * **paging\_from** (_Optional_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_) -- Where does the first page start, at the start of the interval or at the end.
  * **format** (_Optional_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_) -- Format of the response. Supported values are json, json\_stream, csv. Default is json\_stream. Setting format='json\_stream' is generally more performant. page\_size and paging\_from is ignored when format='json\_stream'.
* **Returns:** List of exchange metrics metadata.
* **Return type:** [DataCollection](../../api-client-python/docs/reference/data-collection.md#coinmetrics._data_collection.DataCollection)

#### `CoinMetricsClient.reference_data_exchange_pair_metrics(metrics=None, page_size=None, paging_from=None, format='json_stream')`

Returns a list of exchange pair metrics metadata.

* **Parameters:**
  * **metrics** (_Optional_ \*\[\*_Union_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _,_ _List_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_ _]_ _]_) -- Comma separated list of metrics. By default all metrics are returned.
  * **page\_size** (_Optional_ _\[_[_int_](https://docs.python.org/3/library/functions.html#int) _]_) -- Number of items per single page of results.
  * **paging\_from** (_Optional_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_) -- Where does the first page start, at the start of the interval or at the end.
  * **format** (_Optional_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_) -- Default: "json\_stream" (catalog-v2 and reference-data, market-orderbooks and other heavy endpoints), "json" (timeseries/`*-metrics` and other lighter endpoints). Format of the response. Supported values are json, json\_stream. Setting format='json\_stream' is generally more performant. page\_size and paging\_from is ignored when format='json\_stream'.
* **Returns:** List of exchange asset metrics metadata.
* **Return type:** [DataCollection](../../api-client-python/docs/reference/data-collection.md#coinmetrics._data_collection.DataCollection)

#### `CoinMetricsClient.reference_data_exchanges(exchanges=None, include=None, page_size=None, paging_from=None, next_page_token=None, format='json_stream')`

Returns a list of exchanges metadata.

* **Parameters:**
  * **exchanges** (_Optional_ \*\[\*_Union_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _,_ _List_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_ _]_ _]_) -- Comma separated list of exchanges. By default all exchanges are returned.
  * **include** (_Optional_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_) -- Comma-separated list of namespaces to include in response. Currently, the only supported value is talos.
  * **page\_size** (_Optional_ _\[_[_int_](https://docs.python.org/3/library/functions.html#int) _]_) -- Number of items per single page of results.
  * **paging\_from** (_Optional_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_) -- Where does the first page start, at the start of the interval or at the end.
  * **next\_page\_token** (_Optional_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_) -- Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use next\_page\_url response field.
  * **format** (_Optional_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_) -- Format of the response. Supported values are json, json\_stream, csv. Default is json\_stream. Setting format='json\_stream' is generally more performant. page\_size and paging\_from is ignored when format='json\_stream'.
* **Returns:** List of exchanges metadata.
* **Return type:** [DataCollection](../../api-client-python/docs/reference/data-collection.md#coinmetrics._data_collection.DataCollection)

#### `CoinMetricsClient.reference_data_indexes(indexes=None, page_size=None, paging_from=None, next_page_token=None, format='json_stream')`

Returns a list of indexes metadata.

* **Parameters:**
  * **indexes** (_Optional_ \*\[\*_Union_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _,_ _List_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_ _]_ _]_) -- Comma separated list of indexes. By default all indexes are returned.
  * **page\_size** (_Optional_ _\[_[_int_](https://docs.python.org/3/library/functions.html#int) _]_) -- Number of items per single page of results.
  * **paging\_from** (_Optional_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_) -- Where does the first page start, at the start of the interval or at the end.
  * **next\_page\_token** (_Optional_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_) -- Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use next\_page\_url response field.
  * **format** (_Optional_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_) -- Format of the response. Supported values are json, json\_stream, csv. Default is json\_stream. Setting format='json\_stream' is generally more performant. page\_size and paging\_from is ignored when format='json\_stream'.
* **Returns:** List of indexes metadata.
* **Return type:** [DataCollection](../../api-client-python/docs/reference/data-collection.md#coinmetrics._data_collection.DataCollection)

#### `CoinMetricsClient.reference_data_institution_metrics(metrics=None, page_size=None, paging_from=None, format='json_stream')`

Returns a list of institution metrics metadata.

* **Parameters:**
  * **metrics** (_Optional_ \*\[\*_Union_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _,_ _List_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_ _]_ _]_) -- Comma separated list of metrics. By default all metrics are returned.
  * **page\_size** (_Optional_ _\[_[_int_](https://docs.python.org/3/library/functions.html#int) _]_) -- Number of items per single page of results.
  * **paging\_from** (_Optional_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_) -- Where does the first page start, at the start of the interval or at the end.
  * **format** (_Optional_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_) -- Format of the response. Supported values are json, json\_stream, csv. Default is json\_stream. Setting format='json\_stream' is generally more performant. page\_size and paging\_from is ignored when format='json\_stream'.
* **Returns:** List of institution metrics metadata.
* **Return type:** [DataCollection](../../api-client-python/docs/reference/data-collection.md#coinmetrics._data_collection.DataCollection)

#### `CoinMetricsClient.reference_data_market_metrics(metrics=None, page_size=None, paging_from=None, next_page_token=None, format='json_stream')`

Returns a list of market metrics metadata.

* **Parameters:**
  * **metrics** (_Optional_ \*\[\*_Union_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _,_ _List_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_ _]_ _]_) -- Comma separated list of metrics. By default all metrics are returned.
  * **page\_size** (_Optional_ _\[_[_int_](https://docs.python.org/3/library/functions.html#int) _]_) -- Number of items per single page of results.
  * **paging\_from** (_Optional_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_) -- Where does the first page start, at the start of the interval or at the end.
  * **next\_page\_token** (_Optional_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_) -- Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use next\_page\_url response field.
  * **format** (_Optional_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_) -- Format of the response. Supported values are json, json\_stream, csv. Default is json\_stream. Setting format='json\_stream' is generally more performant. page\_size and paging\_from is ignored when format='json\_stream'.
* **Returns:** List of market metrics metadata.
* **Return type:** [DataCollection](../../api-client-python/docs/reference/data-collection.md#coinmetrics._data_collection.DataCollection)

#### `CoinMetricsClient.reference_data_markets(markets=None, exchange=None, type=None, base=None, quote=None, asset=None, symbol=None, include=None, page_size=None, paging_from=None, next_page_token=None, format='json_stream')`

Returns a list of markets metadata.

* **Parameters:**
  * **markets** (_Optional_ \*\[\*_Union_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _,_ _List_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_ _]_ _]_) -- Comma separated list of markets. By default all markets are returned.
  * **exchange** (_Optional_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_) -- Unique name of an exchange.
  * **type** (_Optional_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_) -- Type of markets.
  * **base** (_Optional_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_) -- Base asset of markets.
  * **quote** (_Optional_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_) -- Quote asset of markets.
  * **asset** (_Optional_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_) -- Any asset of markets.
  * **symbol** (_Optional_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_) -- Symbol of derivative markets, full instrument name.
  * **include** (_Optional_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_) -- Comma-separated list of namespaces to include in response. Currently, the only supported value is talos.
  * **page\_size** (_Optional_ _\[_[_int_](https://docs.python.org/3/library/functions.html#int) _]_) -- Number of items per single page of results.
  * **paging\_from** (_Optional_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_) -- Where does the first page start, at the start of the interval or at the end.
  * **next\_page\_token** (_Optional_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_) -- Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use next\_page\_url response field.
  * **format** (_Optional_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_) -- Format of the response. Supported values are json, json\_stream, csv. Default is json\_stream. Setting format='json\_stream' is generally more performant. page\_size and paging\_from is ignored when format='json\_stream'.
* **Returns:** List of markets metadata.
* **Return type:** [DataCollection](../../api-client-python/docs/reference/data-collection.md#coinmetrics._data_collection.DataCollection)

#### `CoinMetricsClient.reference_data_pair_metrics(metrics=None, page_size=None, paging_from=None, format='json_stream')`

Returns a list of pair metrics metadata.

* **Parameters:**
  * **metrics** (_Optional_ \*\[\*_Union_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _,_ _List_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_ _]_ _]_) -- Comma separated list of metrics. By default all metrics are returned.
  * **page\_size** (_Optional_ _\[_[_int_](https://docs.python.org/3/library/functions.html#int) _]_) -- Number of items per single page of results.
  * **paging\_from** (_Optional_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_) -- Where does the first page start, at the start of the interval or at the end.
  * **format** (_Optional_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_) -- Format of the response. Supported values are json, json\_stream, csv. Default is json\_stream. Setting format='json\_stream' is generally more performant. page\_size and paging\_from is ignored when format='json\_stream'.
* **Returns:** List of pair metrics metadata.
* **Return type:** [DataCollection](../../api-client-python/docs/reference/data-collection.md#coinmetrics._data_collection.DataCollection)

#### `CoinMetricsClient.reference_data_pairs(pairs=None, page_size=None, paging_from=None, next_page_token=None, format='json_stream')`

Returns a list of pairs metadata.

* **Parameters:**
  * **pairs** (_Optional_ \*\[\*_Union_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _,_ _List_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_ _]_ _]_) -- Comma separated list of asset pairs. By default, all asset pairs are returned.
  * **page\_size** (_Optional_ _\[_[_int_](https://docs.python.org/3/library/functions.html#int) _]_) -- Number of items per single page of results.
  * **paging\_from** (_Optional_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_) -- Where does the first page start, at the start of the interval or at the end.
  * **next\_page\_token** (_Optional_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_) -- Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use next\_page\_url response field.
  * **format** (_Optional_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_) -- Format of the response. Supported values are json, json\_stream, csv. Default is json\_stream. Setting format='json\_stream' is generally more performant. page\_size and paging\_from is ignored when format='json\_stream'.
* **Returns:** List of pairs metadata.
* **Return type:** [DataCollection](../../api-client-python/docs/reference/data-collection.md#coinmetrics._data_collection.DataCollection)
