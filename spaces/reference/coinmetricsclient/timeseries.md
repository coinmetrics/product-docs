# Time Series

#### `CoinMetricsClient.get_asset_alerts(assets, alerts, page_size=None, paging_from='start', start_time=None, end_time=None, start_inclusive=None, end_inclusive=None, timezone=None, include_heartbeats=None, format=None)`

Returns asset alerts for the specified assets.

* **Parameters:**
  * **assets** ([_list_](https://docs.python.org/3/library/stdtypes.html#list) _(_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _)_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- list of asset names, e.g. 'btc'
  * **alerts** ([_list_](https://docs.python.org/3/library/stdtypes.html#list) _(_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _)_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- list of asset alert names
  * **page\_size** ([_int_](https://docs.python.org/3/library/functions.html#int)) -- number of items returned per page when calling the API. If the request times out, try using a smaller number.
  * **paging\_from** (_PagingFrom_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Defines where you want to start receiving items from, 'start' or 'end' of the timeseries.
  * **start\_time** (_datetime_ _,_ _date_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Start time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **end\_time** (_datetime_ _,_ _date_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- End time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **start\_inclusive** ([_bool_](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if start timestamp must be included in the timeseries if present. True by default.
  * **end\_inclusive** ([_bool_](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if end timestamp must be included in the timeseries if present. True by default.
  * **timezone** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- timezone of the start/end times in db format for example: "America/Chicago". Default value is "UTC". For more details check out API documentation page.
  * **include\_heartbeats** ([_bool_](https://docs.python.org/3/library/functions.html#bool)) -- If set to true, includes information about most recent time asset was successfully evaluated.
  * **format** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Format of the response. Supported values are json, csv. Default is json.
* **Returns:** Asset alerts timeseries.
* **Return type:** [DataCollection](../../api-client-python/docs/reference/data-collection.md#coinmetrics._data_collection.DataCollection)

#### `CoinMetricsClient.get_asset_chains(assets, page_size=None, paging_from='start', start_time=None, end_time=None, start_inclusive=None, end_inclusive=None, timezone=None, format=None)`

Returns the chains of blocks for the specified assets.

* **Parameters:**
  * **assets** ([_list_](https://docs.python.org/3/library/stdtypes.html#list) _(_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _)_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- list of asset names, e.g. 'btc'
  * **page\_size** ([_int_](https://docs.python.org/3/library/functions.html#int)) -- number of items returned per page when calling the API. If the request times out, try using a smaller number.
  * **paging\_from** (_PagingFrom_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Defines where you want to start receiving items from, 'start' or 'end' of the timeseries.
  * **start\_time** (_datetime_ _,_ _date_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Start time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **end\_time** (_datetime_ _,_ _date_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- End time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **start\_inclusive** ([_bool_](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if start timestamp must be included in the timeseries if present. True by default.
  * **end\_inclusive** ([_bool_](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if end timestamp must be included in the timeseries if present. True by default.
  * **timezone** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- timezone of the start/end times in db format for example: "America/Chicago". Default value is "UTC". For more details check out API documentation page.
  * **format** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Format of the response. Supported values are json, csv. Default is json.
* **Returns:** Asset chains timeseries.
* **Return type:** [DataCollection](../../api-client-python/docs/reference/data-collection.md#coinmetrics._data_collection.DataCollection)

#### `CoinMetricsClient.get_asset_metrics(assets, metrics, frequency=None, page_size=None, paging_from='start', start_time=None, end_time=None, start_height=None, end_height=None, start_inclusive=None, end_inclusive=None, timezone=None, sort=None, limit_per_asset=None, status=None, start_hash=None, end_hash=None, min_confirmations=None, null_as_zero=None, ignore_forbidden_errors=None, ignore_unsupported_errors=None, format='json_stream')`

Returns requested metrics for specified assets.

* **Parameters:**
  * **assets** ([_list_](https://docs.python.org/3/library/stdtypes.html#list) _(_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _)_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- list of asset names, e.g. 'btc' Use the client.catalog\_asset\_metrics\_v2() method for the full list of supported assets or specify asterisk (`*`) in order to get metrics for all supported assets.
  * **metrics** ([_list_](https://docs.python.org/3/library/stdtypes.html#list) _(_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _)_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- list of asset-specific metric names, e.g. 'AdrActCnt', 'BlkHgt'. Example: metrics='AdrActCnt,BlkHgt' Comma separated metrics to request time series data for. Information on all available metrics can be found on page [https://coverage.coinmetrics.io/asset-metrics-v2](https://coverage.coinmetrics.io/asset-metrics-v2). Use the client.catalog\_full\_asset\_metrics\_v2() method for the full list of supported metrics per asset.
  * **frequency** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- frequency of the returned timeseries, e.g 15s, 1d, etc.
  * **page\_size** ([_int_](https://docs.python.org/3/library/functions.html#int)) -- number of items returned per page when calling the API. If the request times out, try using a smaller number.
  * **paging\_from** (_PagingFrom_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Defines where you want to start receiving items from, 'start' or 'end' of the timeseries.
  * **start\_time** (_datetime_ _,_ _date_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Start time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **end\_time** (_datetime_ _,_ _date_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- End time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **start\_height** ([_int_](https://docs.python.org/3/library/functions.html#int)) -- Start block of the timeseries (only applicable when querying with frequency 1b).
  * **end\_height** ([_int_](https://docs.python.org/3/library/functions.html#int)) -- End block of the timeseries (only applicable when querying with frequency 1b).
  * **start\_inclusive** ([_bool_](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if start timestamp must be included in the timeseries if present. True by default.
  * **end\_inclusive** ([_bool_](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if end timestamp must be included in the timeseries if present. True by default.
  * **timezone** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- timezone of the start/end times in db format for example: "America/Chicago". Default value is "UTC". For more details check out API documentation page.
  * **sort** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- How results will be sorted, e.g. "asset", "height", or "time". Default is "asset". Metrics with 1b frequency are sorted by (asset, height, block\_hash) tuples by default. Metrics with other frequencies are sorted by (asset, time) by default. If you want to sort 1d metrics by (time, asset) you should choose time as value for the sort parameter. Sorting by time is useful if you request metrics for a set of assets.
  * **limit\_per\_asset** ([_int_](https://docs.python.org/3/library/functions.html#int)) -- How many entries _per asset_ the result should contain.
  * **status** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Which metric values do you want to see. Applicable only for "reviewable" metrics. You can find them in the /catalog/metrics endpoint. Default: "all". Supported: "all" "flash" "reviewed" "revised"
  * **start\_hash** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- The start hash indicates the beginning block height for the set of data that are returned. Inclusive by default. Mutually exclusive with start\_time and start\_height.
  * **end\_hash** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- The end hash indicates the ending block height for the set of data that are returned. Inclusive by default. Mutually exclusive with end\_time and end\_height.
  * **min\_confirmations** ([_int_](https://docs.python.org/3/library/functions.html#int)) -- Specifies how many blocks behind the chain tip block by block metrics (1b frequency) are based on. Default for btc is 2 and 99 for eth.
  * **null\_as\_zero** ([_bool_](https://docs.python.org/3/library/functions.html#bool)) -- Default: false. Nulls are represented as zeros in the response.
  * **ignore\_forbidden\_errors** ([_bool_](https://docs.python.org/3/library/functions.html#bool)) -- Default: false. Ignore HTTP 403 Forbidden errors
  * **ignore\_unsupported\_errors** ([_bool_](https://docs.python.org/3/library/functions.html#bool)) -- Default: false. Ignore errors for unsupported assets, metrics or frequencies.
  * **format** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Format of the response. Supported values are json, json\_stream, csv. Default is json\_stream. Setting format='json\_stream' is generally more performant. page\_size and paging\_from is ignored when format='json\_stream'.
* **Returns:** Asset Metrics timeseries.
* **Return type:** [DataCollection](../../api-client-python/docs/reference/data-collection.md#coinmetrics._data_collection.DataCollection)

#### `CoinMetricsClient.get_defi_balance_sheets(defi_protocols, page_size=None, paging_from='start', start_time=None, end_time=None, start_height=None, end_height=None, start_inclusive=None, end_inclusive=None, timezone=None, format=None)`

Returns Defi Balance Sheet records for specified DeFi protocols.

* **Parameters:**
  * **defi\_protocols** ([_str_](https://docs.python.org/3/library/stdtypes.html#str) _,_ _List_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_) -- list of DeFi protocols like aave\_v2\_eth or protocol patterns like `aave_v2_*` or `aave_*_eth` or `*_eth`.
  * **page\_size** ([_int_](https://docs.python.org/3/library/functions.html#int)) -- number of items returned per page when calling the API. If the request times out, try using a smaller number.
  * **paging\_from** (_PagingFrom_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Defines where you want to start receiving items from, 'start' or 'end' of the timeseries.
  * **start\_time** (_datetime_ _,_ _date_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Start time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **end\_time** (_datetime_ _,_ _date_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- End time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **start\_height** ([_int_](https://docs.python.org/3/library/functions.html#int)) -- The start height indicates the beginning block height for the set of data that are returned. Mutually exclusive with start\_time
  * **end\_height** ([_int_](https://docs.python.org/3/library/functions.html#int)) -- The end height indicates the beginning block height for the set of data that are returned. Mutually exclusive with end\_time
  * **start\_inclusive** ([_bool_](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if start timestamp must be included in the timeseries if present. True by default.
  * **end\_inclusive** ([_bool_](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if end timestamp must be included in the timeseries if present. True by default.
  * **timezone** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- timezone of the start/end times in db format for example: "America/Chicago". Default value is "UTC". For more details check out API documentation page.
  * **format** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Format of the response. Supported values are json, csv. Default is json.
* **Returns:** list of blockchain blocks metadata
* **Return type:** [DataCollection](../../api-client-python/docs/reference/data-collection.md#coinmetrics._data_collection.DataCollection)

#### `CoinMetricsClient.get_exchange_asset_metrics(exchange_assets, metrics, frequency=None, page_size=None, paging_from='start', start_time=None, end_time=None, start_height=None, end_height=None, start_inclusive=None, end_inclusive=None, timezone=None, sort=None, limit_per_exchange_asset=None, format='json_stream')`

Returns metrics for specified exchange-asset.

* **Parameters:**
  * **exchange\_assets** ([_list_](https://docs.python.org/3/library/stdtypes.html#list) _(_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _)_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- A list of exchange-asset pairs (e.g. "binance-btc") or patterns like `exchange-*` or `*-asset`.
  * **metrics** ([_list_](https://docs.python.org/3/library/stdtypes.html#list) _(_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _)_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Example: metrics=open\_interest\_reported\_future\_usd,volume\_reported\_spot\_usd\_1d Comma separated metrics to request time series data for. Information on all available metrics can be found on page [https://coverage.coinmetrics.io/exchange-asset-metrics-v2](https://coverage.coinmetrics.io/exchange-asset-metrics-v2). Use the client.catalog\_full\_exchange\_asset\_metrics\_v2() method for the full list of supported metrics per exchange-asset combination.
  * **frequency** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- frequency of the returned timeseries, e.g 15s, 1d, etc.
  * **page\_size** ([_int_](https://docs.python.org/3/library/functions.html#int)) -- number of items returned per page when calling the API. If the request times out, try using a smaller number.
  * **paging\_from** (_PagingFrom_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Defines where you want to start receiving items from, 'start' or 'end' of the timeseries.
  * **start\_time** (_datetime_ _,_ _date_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Start time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **end\_time** (_datetime_ _,_ _date_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- End time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **start\_height** ([_int_](https://docs.python.org/3/library/functions.html#int)) -- Start block of the timeseries (only applicable when querying with frequency 1b).
  * **end\_height** ([_int_](https://docs.python.org/3/library/functions.html#int)) -- End block of the timeseries (only applicable when querying with frequency 1b).
  * **start\_inclusive** ([_bool_](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if start timestamp must be included in the timeseries if present. True by default.
  * **end\_inclusive** ([_bool_](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if end timestamp must be included in the timeseries if present. True by default.
  * **timezone** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- timezone of the start/end times in db format for example: "America/Chicago". Default value is "UTC". For more details check out API documentation page.
  * **sort** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- How results will be sorted, e.g. "exchange\_asset", "time". Default is "exchange\_asset".
  * **limit\_per\_exchange\_asset** ([_int_](https://docs.python.org/3/library/functions.html#int)) -- How many entries _per exchange-asset_ the result should contain.
  * **format** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Format of the response. Supported values are json, json\_stream, csv. Default is json\_stream. Setting format='json\_stream' is generally more performant. page\_size and paging\_from is ignored when format='json\_stream'.
* **Returns:** Exchange-Asset Metrics timeseries.
* **Return type:** [DataCollection](../../api-client-python/docs/reference/data-collection.md#coinmetrics._data_collection.DataCollection)

#### `CoinMetricsClient.get_exchange_metrics(exchanges, metrics, frequency=None, page_size=None, paging_from='start', start_time=None, end_time=None, start_height=None, end_height=None, start_inclusive=None, end_inclusive=None, timezone=None, sort=None, limit_per_exchange=None, format='json_stream')`

Returns metrics for specified exchanges.

* **Parameters:**
  * **exchanges** ([_list_](https://docs.python.org/3/library/stdtypes.html#list) _(_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _)_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Examples:
    * exchanges='coinbase,binance,etc' - the list of exchanges
    * exchanges=\* - all supported exchanges Comma separated list of exchange names or asterisk (`*`) for all supported exchanges.
  * **metrics** ([_list_](https://docs.python.org/3/library/stdtypes.html#list) _(_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _)_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Example: metrics=open\_interest\_reported\_future\_usd,volume\_reported\_spot\_usd\_1d Comma separated metrics to request time series data for. Information on all available metrics can be found on page [https://coverage.coinmetrics.io/exchange-metrics-v2](https://coverage.coinmetrics.io/exchange-metrics-v2). Use the client.catalog\_full\_exchange\_metrics\_v2() method for the full list of supported metrics per exchange.
  * **frequency** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- frequency of the returned timeseries, e.g 15s, 1d, etc.
  * **page\_size** ([_int_](https://docs.python.org/3/library/functions.html#int)) -- number of items returned per page when calling the API. If the request times out, try using a smaller number.
  * **paging\_from** (_PagingFrom_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Defines where you want to start receiving items from, 'start' or 'end' of the timeseries.
  * **start\_time** (_datetime_ _,_ _date_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Start time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **end\_time** (_datetime_ _,_ _date_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- End time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **start\_height** ([_int_](https://docs.python.org/3/library/functions.html#int)) -- Start block of the timeseries (only applicable when querying with frequency 1b).
  * **end\_height** ([_int_](https://docs.python.org/3/library/functions.html#int)) -- End block of the timeseries (only applicable when querying with frequency 1b).
  * **start\_inclusive** ([_bool_](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if start timestamp must be included in the timeseries if present. True by default.
  * **end\_inclusive** ([_bool_](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if end timestamp must be included in the timeseries if present. True by default.
  * **timezone** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- timezone of the start/end times in db format for example: "America/Chicago". Default value is "UTC". For more details check out API documentation page.
  * **sort** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- How results will be sorted, e.g. 'exchange', 'time'. Metrics are sorted by 'exchange' by default.
  * **limit\_per\_exchange** ([_int_](https://docs.python.org/3/library/functions.html#int)) -- How many entries _per exchange_ the result should contain.
  * **format** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Format of the response. Supported values are json, csv. Default is json.
* **Returns:** Exchange Metrics timeseries.
* **Return type:** [DataCollection](../../api-client-python/docs/reference/data-collection.md#coinmetrics._data_collection.DataCollection)

#### `CoinMetricsClient.get_exchange_pair_metrics(exchange_pairs, metrics, frequency=None, page_size=None, paging_from='start', start_time=None, end_time=None, start_height=None, end_height=None, start_inclusive=None, end_inclusive=None, timezone=None, format='json_stream', limit_per_exchange_pair=None)`

Returns metrics for specified exchange-pair.

* **Parameters:**
  * **exchange\_pairs** ([_list_](https://docs.python.org/3/library/stdtypes.html#list) _(_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _)_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- A list of exchange-pairs or patterns like `exchange-*` or `*-pair`.
  * **metrics** ([_list_](https://docs.python.org/3/library/stdtypes.html#list) _(_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _)_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Example: metrics=volatility\_implied\_put\_delta\_50\_1y\_expiration,volatility\_implied\_skew\_delta\_05\_1d\_expiration Comma separated metrics to request time series data for. Information on all available metrics can be found on page [https://coverage.coinmetrics.io/exchange-pair-metrics](https://coverage.coinmetrics.io/exchange-pair-metrics). Use the catalog\_full\_exchange\_pair\_metrics\_v2() method for the full list of supported metrics per exchange-pair combination.
  * **frequency** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- frequency of the returned timeseries, e.g 15s, 1d, etc.
  * **page\_size** ([_int_](https://docs.python.org/3/library/functions.html#int)) -- number of items returned per page when calling the API. If the request times out, try using a smaller number.
  * **paging\_from** (_PagingFrom_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Defines where you want to start receiving items from, 'start' or 'end' of the timeseries.
  * **start\_time** (_datetime_ _,_ _date_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Start time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **end\_time** (_datetime_ _,_ _date_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- End time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **start\_height** ([_int_](https://docs.python.org/3/library/functions.html#int)) -- Start block of the timeseries (only applicable when querying with frequency 1b).
  * **end\_height** ([_int_](https://docs.python.org/3/library/functions.html#int)) -- End block of the timeseries (only applicable when querying with frequency 1b).
  * **start\_inclusive** ([_bool_](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if start timestamp must be included in the timeseries if present. True by default.
  * **end\_inclusive** ([_bool_](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if end timestamp must be included in the timeseries if present. True by default.
  * **timezone** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- timezone of the start/end times in db format for example: "America/Chicago". Default value is "UTC". For more details check out API documentation page.
  * **format** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Default: "json". Enum: "json" "json\_stream" "csv". Format of the response. Supported values are json, json\_stream, csv.
  * **limit\_per\_exchange\_pair** ([_int_](https://docs.python.org/3/library/functions.html#int)) -- How many entries _per exchange_ the result should contain.
* **Returns:** Exchange-Pair Metrics timeseries.
* **Return type:** [DataCollection](../../api-client-python/docs/reference/data-collection.md#coinmetrics._data_collection.DataCollection)

#### `CoinMetricsClient.get_index_candles(indexes, frequency=None, page_size=None, paging_from='start', start_time=None, end_time=None, start_inclusive=None, end_inclusive=None, timezone=None, limit_per_index=None, format='json_stream')`

Returns index candles for specified indexes and date range.

* **Parameters:**
  * **indexes** ([_list_](https://docs.python.org/3/library/stdtypes.html#list) _(_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _)_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- list of index names, e.g. 'CMBI10'
  * **frequency** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- frequency of the returned timeseries, e.g 15s, 1d, etc.
  * **page\_size** ([_int_](https://docs.python.org/3/library/functions.html#int)) -- number of items returned per page when calling the API. If the request times out, try using a smaller number.
  * **paging\_from** (_PagingFrom_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Defines where you want to start receiving items from, 'start' or 'end' of the timeseries.
  * **start\_time** (_datetime_ _,_ _date_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Start time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **end\_time** (_datetime_ _,_ _date_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- End time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **start\_inclusive** ([_bool_](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if start timestamp must be included in the timeseries if present. True by default.
  * **end\_inclusive** ([_bool_](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if end timestamp must be included in the timeseries if present. True by default.
  * **timezone** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- timezone of the start/end times in db format for example: "America/Chicago". Default value is "UTC". For more details check out API documentation page.
  * **limit\_per\_index** ([_int_](https://docs.python.org/3/library/functions.html#int)) -- How many entries _per index_ the result should contain.
  * **format** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Format of the response. Supported values are json, csv. Default is json.
* **Returns:** Index Candles timeseries.
* **Return type:** [DataCollection](../../api-client-python/docs/reference/data-collection.md#coinmetrics._data_collection.DataCollection)

#### `CoinMetricsClient.get_index_constituents(indexes, frequency=None, page_size=None, paging_from='start', start_time=None, end_time=None, start_inclusive=None, end_inclusive=None, timezone=None, format=None)`

Returns index constituents for specified indexes and date range.

* **Parameters:**
  * **indexes** ([_list_](https://docs.python.org/3/library/stdtypes.html#list) _(_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _)_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- list of index names, e.g. 'CMBI10'
  * **frequency** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- frequency of the returned timeseries, e.g 15s, 1d, etc.
  * **page\_size** ([_int_](https://docs.python.org/3/library/functions.html#int)) -- number of items returned per page when calling the API. If the request times out, try using a smaller number.
  * **paging\_from** (_PagingFrom_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Defines where you want to start receiving items from, 'start' or 'end' of the timeseries.
  * **start\_time** (_datetime_ _,_ _date_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Start time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **end\_time** (_datetime_ _,_ _date_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- End time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **start\_inclusive** ([_bool_](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if start timestamp must be included in the timeseries if present. True by default.
  * **end\_inclusive** ([_bool_](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if end timestamp must be included in the timeseries if present. True by default.
  * **timezone** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- timezone of the start/end times in db format for example: "America/Chicago". Default value is "UTC". For more details check out API documentation page.
  * **format** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Format of the response. Supported values are json, csv. Default is json.
* **Returns:** Index Constituents timeseries.
* **Return type:** [DataCollection](../../api-client-python/docs/reference/data-collection.md#coinmetrics._data_collection.DataCollection)

#### `CoinMetricsClient.get_index_levels(indexes, frequency=None, granularity=None, start_time=None, end_time=None, start_inclusive=None, end_inclusive=None, timezone=None, page_size=None, paging_from='start', limit_per_index=None, include_verification=None, format='json_stream')`

Returns index levels for specified indexes and date range.

* **Parameters:**
  * **indexes** ([_list_](https://docs.python.org/3/library/stdtypes.html#list) _(_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _)_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- list of index names, e.g. 'CMBI10'
  * **frequency** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- frequency of the returned timeseries, e.g 15s, 1d, etc.
  * **granularity** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Default: "1s" granularity of the returned timeseries, e.g 1s, 1m, etc.
  * **start\_time** (_datetime_ _,_ _date_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Start time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **end\_time** (_datetime_ _,_ _date_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- End time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **start\_inclusive** ([_bool_](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if start timestamp must be included in the timeseries if present. True by default.
  * **end\_inclusive** ([_bool_](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if end timestamp must be included in the timeseries if present. True by default.
  * **timezone** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- timezone of the start/end times in db format for example: "America/Chicago". Default value is "UTC". For more details check out API documentation page.
  * **page\_size** ([_int_](https://docs.python.org/3/library/functions.html#int)) -- number of items returned per page when calling the API. If the request times out, try using a smaller number.
  * **paging\_from** (_PagingFrom_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Defines where you want to start receiving items from, 'start' or 'end' of the timeseries.
  * **limit\_per\_index** ([_int_](https://docs.python.org/3/library/functions.html#int)) -- How many entries _per index_ the result should contain.
  * **include\_verification** ([_bool_](https://docs.python.org/3/library/functions.html#bool) _|_ _None_) -- Default: False set to true, includes information about verification.
  * **format** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Format of the response. Supported values are json, json\_stream, csv. Default is json\_stream. Setting format='json\_stream' is generally more performant. page\_size and paging\_from is ignored when format='json\_stream'.
* **Type:** [bool](https://docs.python.org/3/library/functions.html#bool)
* **Returns:** Index Levels timeseries.
* **Return type:** [DataCollection](../../api-client-python/docs/reference/data-collection.md#coinmetrics._data_collection.DataCollection)

#### `CoinMetricsClient.get_institution_metrics(institutions, metrics, frequency=None, page_size=None, paging_from='start', start_time=None, end_time=None, start_height=None, end_height=None, start_inclusive=None, end_inclusive=None, timezone=None, sort=None, limit_per_institution=None, format=None)`

Returns metrics for specified institutions.

* **Parameters:**
  * **institutions** ([_list_](https://docs.python.org/3/library/stdtypes.html#list) _(_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _)_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- A single institution name or a list of institutions to return info for.
  * **metrics** ([_list_](https://docs.python.org/3/library/stdtypes.html#list) _(_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _)_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- list of _institution-specific_ metric names, e.g. 'gbtc\_total\_assets'
  * **frequency** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- frequency of the returned timeseries, e.g 15s, 1d, etc.
  * **page\_size** ([_int_](https://docs.python.org/3/library/functions.html#int)) -- number of items returned per page when calling the API. If the request times out, try using a smaller number.
  * **paging\_from** (_PagingFrom_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Defines where you want to start receiving items from, 'start' or 'end' of the timeseries.
  * **start\_time** (_datetime_ _,_ _date_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Start time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **end\_time** (_datetime_ _,_ _date_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- End time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **start\_height** ([_int_](https://docs.python.org/3/library/functions.html#int)) -- Start block of the timeseries (only applicable when querying with frequency 1b).
  * **end\_height** ([_int_](https://docs.python.org/3/library/functions.html#int)) -- End block of the timeseries (only applicable when querying with frequency 1b).
  * **start\_inclusive** ([_bool_](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if start timestamp must be included in the timeseries if present. True by default.
  * **end\_inclusive** ([_bool_](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if end timestamp must be included in the timeseries if present. True by default.
  * **timezone** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- timezone of the start/end times in db format for example: "America/Chicago". Default value is "UTC". For more details check out API documentation page.
  * **sort** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- How results will be sorted, e.g. "institution", or "time". Default is "institution".
  * **limit\_per\_institution** ([_int_](https://docs.python.org/3/library/functions.html#int)) -- How many entries _per institution_ the result should contain.
  * **format** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Format of the response. Supported values are json, csv. Default is json.
* **Returns:** Asset Metrics timeseries.
* **Return type:** [DataCollection](../../api-client-python/docs/reference/data-collection.md#coinmetrics._data_collection.DataCollection)

#### `CoinMetricsClient.get_market_candles(markets, frequency=None, page_size=None, paging_from='start', start_time=None, end_time=None, start_inclusive=None, end_inclusive=None, timezone=None, limit_per_market=None, format='json_stream', ignore_unsupported_errors=None, ignore_forbidden_errors=None)`

Returns market candles for specified markets, frequency and date range. For more information on market candles, see: [https://docs.coinmetrics.io/info/markets/candles](https://docs.coinmetrics.io/info/markets/candles)

* **Parameters:**
  * **markets** ([_list_](https://docs.python.org/3/library/stdtypes.html#list) _(_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _)_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- list of market ids. Market ids use the following naming convention: exchangeName-baseAsset-quoteAsset-spot for spot markets, exchangeName-futuresSymbol-future for futures markets, and exchangeName-optionsSymbol-option for options markets. e.g., 'coinbase-btc-usd-spot', 'bitmex-XBTUSD-future'
  * **frequency** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- frequency of the returned timeseries, e.g 15s, 1d, etc.
  * **page\_size** ([_int_](https://docs.python.org/3/library/functions.html#int)) -- number of items returned per page when calling the API. If the request times out, try using a smaller number.
  * **paging\_from** (_PagingFrom_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Defines where you want to start receiving items from, 'start' or 'end' of the timeseries.
  * **start\_time** (_datetime_ _,_ _date_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Start time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **end\_time** (_datetime_ _,_ _date_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- End time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **start\_inclusive** ([_bool_](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if start timestamp must be included in the timeseries if present. True by default.
  * **end\_inclusive** ([_bool_](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if end timestamp must be included in the timeseries if present. True by default.
  * **timezone** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- timezone of the start/end times in db format for example: "America/Chicago". Default value is "UTC". For more details check out API documentation page.
  * **limit\_per\_market** ([_int_](https://docs.python.org/3/library/functions.html#int)) -- How many entries _per market_ the result should contain.
  * **format** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Format of the response. Supported values are json, json\_stream, csv. Default is json\_stream. Setting format='json\_stream' is generally more performant. page\_size and paging\_from is ignored when format='json\_stream'.
  * **ignore\_unsupported\_errors** ([_bool_](https://docs.python.org/3/library/functions.html#bool)) -- Whether to ignore 401 Unauthorized errors. Default is False.
  * **ignore\_forbidden\_errors** ([_bool_](https://docs.python.org/3/library/functions.html#bool)) -- Whether to ignore 403 Forbidden errors. Default is False.
* **Returns:** Market Candles timeseries.
* **Return type:** [DataCollection](../../api-client-python/docs/reference/data-collection.md#coinmetrics._data_collection.DataCollection)

#### `CoinMetricsClient.get_market_contract_prices(markets, page_size=None, paging_from='start', start_time=None, end_time=None, start_inclusive=None, end_inclusive=None, granularity=None, timezone=None, limit_per_market=None, frequency=None, format='json_stream')`

Returns contract prices for specified markets. This includes index price and mark price that are used by the exchange for settlement and risk management purposes.

* **Parameters:**
  * **markets** ([_list_](https://docs.python.org/3/library/stdtypes.html#list) _(_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _)_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- list of market ids. Market ids use the following naming convention: exchangeName-baseAsset-quoteAsset-spot for spot markets, exchangeName-futuresSymbol-future for futures markets, and exchangeName-optionsSymbol-option for options markets. e.g., 'coinbase-btc-usd-spot', 'bitmex-XBTUSD-future', 'deribit-ETH-25MAR22-1200-P-option'
  * **page\_size** ([_int_](https://docs.python.org/3/library/functions.html#int)) -- number of items returned per page when calling the API. If the request times out, try using a smaller number.
  * **paging\_from** (_PagingFrom_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Defines where you want to start receiving items from, 'start' or 'end' of the timeseries.
  * **start\_time** (_datetime_ _,_ _date_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Start time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **end\_time** (_datetime_ _,_ _date_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- End time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **start\_inclusive** ([_bool_](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if start timestamp must be included in the timeseries if present. True by default.
  * **end\_inclusive** ([_bool_](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if end timestamp must be included in the timeseries if present. True by default.
  * **granularity** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Downsampling granularity of market contract prices. Supported values are raw, 1m, 1h, and 1d.
  * **timezone** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- timezone of the start/end times in db format for example: "America/Chicago". Default value is "UTC". For more details check out API documentation page.
  * **limit\_per\_market** ([_int_](https://docs.python.org/3/library/functions.html#int)) -- How many entries _per market_ the result should contain.
  * **format** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Format of the response. Supported values are json, json\_stream, csv. Default is json.
  * **frequency** ([_str_](https://docs.python.org/3/library/stdtypes.html#str) _|_ _None_)
* **Returns:** Market Contract Prices timeseries.
* **Return type:** [DataCollection](../../api-client-python/docs/reference/data-collection.md#coinmetrics._data_collection.DataCollection)

#### `CoinMetricsClient.get_market_funding_rates(markets, page_size=None, paging_from='start', start_time=None, end_time=None, start_inclusive=None, end_inclusive=None, timezone=None, limit_per_market=None, format='json_stream')`

Returns market funding rates for specified markets and date range. For more information on funding rates, see: [https://docs.coinmetrics.io/info/markets/fundingrates](https://docs.coinmetrics.io/info/markets/fundingrates)

* **Parameters:**
  * **markets** ([_list_](https://docs.python.org/3/library/stdtypes.html#list) _(_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _)_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- list of market ids. Market ids use the following naming convention: exchangeName-baseAsset-quoteAsset-spot for spot markets, exchangeName-futuresSymbol-future for futures markets, and exchangeName-optionsSymbol-option for options markets. e.g., 'coinbase-btc-usd-spot', 'bitmex-XBTUSD-future'
  * **page\_size** ([_int_](https://docs.python.org/3/library/functions.html#int)) -- number of items returned per page when calling the API. If the request times out, try using a smaller number.
  * **paging\_from** (_PagingFrom_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Defines where you want to start receiving items from, 'start' or 'end' of the timeseries.
  * **start\_time** (_datetime_ _,_ _date_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Start time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **end\_time** (_datetime_ _,_ _date_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- End time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **start\_inclusive** ([_bool_](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if start timestamp must be included in the timeseries if present. True by default.
  * **end\_inclusive** ([_bool_](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if end timestamp must be included in the timeseries if present. True by default.
  * **timezone** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- timezone of the start/end times in db format for example: "America/Chicago". Default value is "UTC". For more details check out API documentation page.
  * **limit\_per\_market** ([_int_](https://docs.python.org/3/library/functions.html#int)) -- How many entries _per market_ the result should contain.
  * **format** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Format of the response. Supported values are json, json\_stream, csv. Default is json.
* **Returns:** Market Funding Rates timeseries.
* **Return type:** [DataCollection](../../api-client-python/docs/reference/data-collection.md#coinmetrics._data_collection.DataCollection)

#### `CoinMetricsClient.get_market_greeks(markets, page_size=None, paging_from='start', start_time=None, end_time=None, start_inclusive=None, end_inclusive=None, granularity=None, timezone=None, limit_per_market=None, format='json_stream')`

Returns greeks for option markets.

* **Parameters:**
  * **markets** ([_list_](https://docs.python.org/3/library/stdtypes.html#list) _(_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _)_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- list of market ids. Market ids use the following naming convention: exchangeName-baseAsset-quoteAsset-spot for spot markets, exchangeName-futuresSymbol-future for futures markets, and exchangeName-optionsSymbol-option for options markets. e.g., 'coinbase-btc-usd-spot', 'bitmex-XBTUSD-future', 'deribit-ETH-25MAR22-1200-P-option'
  * **page\_size** ([_int_](https://docs.python.org/3/library/functions.html#int)) -- number of items returned per page when calling the API. If the request times out, try using a smaller number.
  * **paging\_from** (_PagingFrom_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Defines where you want to start receiving items from, 'start' or 'end' of the timeseries.
  * **start\_time** (_datetime_ _,_ _date_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Start time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **end\_time** (_datetime_ _,_ _date_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- End time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **start\_inclusive** ([_bool_](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if start timestamp must be included in the timeseries if present. True by default.
  * **end\_inclusive** ([_bool_](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if end timestamp must be included in the timeseries if present. True by default.
  * **granularity** (_str - one_ _of_ _raw_ _,_ _1m_ _,_ _1h_ _,_ _and 1d_) -- Downsampling granularity of market greeks. Supported values are raw, 1m, 1h, and 1d
  * **timezone** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- timezone of the start/end times in db format for example: "America/Chicago". Default value is "UTC". For more details check out API documentation page.
  * **limit\_per\_market** ([_int_](https://docs.python.org/3/library/functions.html#int)) -- How many entries _per market_ the result should contain.
  * **format** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Format of the response. Supported values are json, json\_stream, csv. Default is json.
* **Returns:** Market Greeks timeseries.
* **Return type:** [DataCollection](../../api-client-python/docs/reference/data-collection.md#coinmetrics._data_collection.DataCollection)

#### `CoinMetricsClient.get_market_implied_volatility(markets, page_size=None, paging_from='start', start_time=None, end_time=None, start_inclusive=None, end_inclusive=None, granularity=None, timezone=None, limit_per_market=None, format='json_stream')`

Returns implied volatility for specified markets.

* **Parameters:**
  * **markets** ([_list_](https://docs.python.org/3/library/stdtypes.html#list) _(_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _)_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- list of market ids. Market ids use the following naming convention: exchangeName-baseAsset-quoteAsset-spot for spot markets, exchangeName-futuresSymbol-future for futures markets, and exchangeName-optionsSymbol-option for options markets. e.g., 'coinbase-btc-usd-spot', 'bitmex-XBTUSD-future', 'deribit-ETH-25MAR22-1200-P-option'
  * **page\_size** ([_int_](https://docs.python.org/3/library/functions.html#int)) -- number of items returned per page when calling the API. If the request times out, try using a smaller number.
  * **paging\_from** (_PagingFrom_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Defines where you want to start receiving items from, 'start' or 'end' of the timeseries.
  * **start\_time** (_datetime_ _,_ _date_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Start time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **end\_time** (_datetime_ _,_ _date_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- End time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **start\_inclusive** ([_bool_](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if start timestamp must be included in the timeseries if present. True by default.
  * **end\_inclusive** ([_bool_](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if end timestamp must be included in the timeseries if present. True by default.
  * **granularity** (_str - one_ _of_ _raw_ _,_ _1m_ _,_ _1h_ _,_ _and 1d_) -- Downsampling granularity of market implied volatility. Supported values are raw, 1m, 1h, and 1d.
  * **timezone** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- timezone of the start/end times in db format for example: "America/Chicago". Default value is "UTC". For more details check out API documentation page.
  * **limit\_per\_market** ([_int_](https://docs.python.org/3/library/functions.html#int)) -- How many entries _per market_ the result should contain.
  * **format** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Format of the response. Supported values are json, json\_stream, csv. Default is json.
* **Returns:** Market Volatility timeseries.
* **Return type:** [DataCollection](../../api-client-python/docs/reference/data-collection.md#coinmetrics._data_collection.DataCollection)

#### `CoinMetricsClient.get_market_liquidations(markets, page_size=None, paging_from='start', start_time=None, end_time=None, start_inclusive=None, end_inclusive=None, timezone=None, limit_per_market=None, format='json_stream')`

Returns market liquidations for specified markets and date range. For more information on liquidations, see: [https://docs.coinmetrics.io/info/markets/liquidations](https://docs.coinmetrics.io/info/markets/liquidations)

* **Parameters:**
  * **markets** ([_list_](https://docs.python.org/3/library/stdtypes.html#list) _(_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _)_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- list of market ids. Market ids use the following naming convention: exchangeName-baseAsset-quoteAsset-spot for spot markets, exchangeName-futuresSymbol-future for futures markets, and exchangeName-optionsSymbol-option for options markets. e.g., 'coinbase-btc-usd-spot', 'bitmex-XBTUSD-future'
  * **page\_size** ([_int_](https://docs.python.org/3/library/functions.html#int)) -- number of items returned per page when calling the API. If the request times out, try using a smaller number.
  * **paging\_from** (_PagingFrom_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Defines where you want to start receiving items from, 'start' or 'end' of the timeseries.
  * **start\_time** (_datetime_ _,_ _date_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Start time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **end\_time** (_datetime_ _,_ _date_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- End time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **start\_inclusive** ([_bool_](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if start timestamp must be included in the timeseries if present. True by default.
  * **end\_inclusive** ([_bool_](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if end timestamp must be included in the timeseries if present. True by default.
  * **timezone** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- timezone of the start/end times in db format for example: "America/Chicago". Default value is "UTC". For more details check out API documentation page.
  * **limit\_per\_market** ([_int_](https://docs.python.org/3/library/functions.html#int)) -- How many entries _per market_ the result should contain.
  * **format** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Format of the response. Supported values are json, json\_stream, csv. Default is json.
* **Returns:** Market Liquidations timeseries.
* **Return type:** [DataCollection](../../api-client-python/docs/reference/data-collection.md#coinmetrics._data_collection.DataCollection)

#### `CoinMetricsClient.get_market_metrics(markets, metrics, frequency=None, page_size=None, paging_from='start', start_time=None, end_time=None, start_inclusive=None, end_inclusive=None, timezone=None, limit_per_market=None, sort=None, ignore_forbidden_errors=None, ignore_unsupported_errors=None, format='json_stream')`

Returns market metrics for specified markets, frequency and date range. For more information on market metrics, see: [https://docs.coinmetrics.io/api/v4#operation/getTimeseriesMarketMetrics](https://docs.coinmetrics.io/api/v4#operation/getTimeseriesMarketMetrics)

* **Parameters:**
  * **markets** ([_list_](https://docs.python.org/3/library/stdtypes.html#list) _(_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _)_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- list of market ids. Market ids use the following naming convention: exchangeName-baseAsset-quoteAsset-spot for spot markets, exchangeName-futuresSymbol-future for futures markets, and exchangeName-optionsSymbol-option for options markets. e.g., 'coinbase-btc-usd-spot', 'bitmex-XBTUSD-future'
  * **metrics** ([_list_](https://docs.python.org/3/library/stdtypes.html#list) _(_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _)_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- list of metrics, i.e. 'liquidations\_reported\_future\_buy\_units\_1d'. See market metrics catalog for a list of supported metrics: [https://docs.coinmetrics.io/api/v4#operation/getCatalogMarketMetrics](https://docs.coinmetrics.io/api/v4#operation/getCatalogMarketMetrics)
  * **frequency** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- frequency of the returned timeseries, e.g 15s, 1d, etc.
  * **page\_size** ([_int_](https://docs.python.org/3/library/functions.html#int)) -- number of items returned per page when calling the API. If the request times out, try using a smaller number.
  * **paging\_from** (_PagingFrom_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Defines where you want to start receiving items from, 'start' or 'end' of the timeseries.
  * **start\_time** (_datetime_ _,_ _date_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Start time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **end\_time** (_datetime_ _,_ _date_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- End time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **start\_inclusive** ([_bool_](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if start timestamp must be included in the timeseries if present. True by default.
  * **end\_inclusive** ([_bool_](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if end timestamp must be included in the timeseries if present. True by default.
  * **timezone** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- timezone of the start/end times in db format for example: "America/Chicago". Default value is "UTC". For more details check out API documentation page.
  * **limit\_per\_market** ([_int_](https://docs.python.org/3/library/functions.html#int)) -- How many entries _per market_ the result should contain.
  * **sort** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- How results will be sorted. Metrics are sorted by (market, time) by default. If you want to sort 1d metrics by (time, market) you should choose time as value for the sort parameter. Sorting by time is useful if you request metrics for a set of markets.
  * **ignore\_forbidden\_errors** ([_bool_](https://docs.python.org/3/library/functions.html#bool)) -- Default: false. Ignore HTTP 403 Forbidden errors
  * **ignore\_unsupported\_errors** ([_bool_](https://docs.python.org/3/library/functions.html#bool)) -- Default: false. Ignore errors for unsupported assets, metrics or frequencies.
  * **format** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Format of the response. Supported values are json, json\_stream, csv. Default is json\_stream. Setting format='json\_stream' is generally more performant. page\_size and paging\_from is ignored when format='json\_stream'.
* **Returns:** Market metrics timeseries.
* **Return type:** [DataCollection](../../api-client-python/docs/reference/data-collection.md#coinmetrics._data_collection.DataCollection)

#### `CoinMetricsClient.get_market_open_interest(markets, page_size=None, paging_from='start', start_time=None, end_time=None, start_inclusive=None, end_inclusive=None, granularity=None, timezone=None, limit_per_market=None, format='json_stream')`

Returns market open interest for specified markets and date range. For more information on open interest, see: [https://docs.coinmetrics.io/info/markets/openinterest](https://docs.coinmetrics.io/info/markets/openinterest)

* **Parameters:**
  * **markets** ([_list_](https://docs.python.org/3/library/stdtypes.html#list) _(_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _)_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- list of market ids. Market ids use the following naming convention: exchangeName-baseAsset-quoteAsset-spot for spot markets, exchangeName-futuresSymbol-future for futures markets, and exchangeName-optionsSymbol-option for options markets. e.g., 'coinbase-btc-usd-spot', 'bitmex-XBTUSD-future'
  * **page\_size** ([_int_](https://docs.python.org/3/library/functions.html#int)) -- number of items returned per page when calling the API. If the request times out, try using a smaller number.
  * **paging\_from** (_PagingFrom_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Defines where you want to start receiving items from, 'start' or 'end' of the timeseries.
  * **start\_time** (_datetime_ _,_ _date_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Start time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **end\_time** (_datetime_ _,_ _date_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- End time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **start\_inclusive** ([_bool_](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if start timestamp must be included in the timeseries if present. True by default.
  * **end\_inclusive** ([_bool_](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if end timestamp must be included in the timeseries if present. True by default.
  * **granularity** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Downsampling granularity of market open interest. Supported values are raw, 1m, 1h, and 1d.
  * **timezone** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- timezone of the start/end times in db format for example: "America/Chicago". Default value is "UTC". For more details check out API documentation page.
  * **limit\_per\_market** ([_int_](https://docs.python.org/3/library/functions.html#int)) -- How many entries _per market_ the result should contain.
  * **format** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Format of the response. Supported values are json, json\_stream, csv. Default is json\_stream. Setting format='json\_stream' is generally more performant. page\_size and paging\_from is ignored when format='json\_stream'.
* **Returns:** Market Open Interest timeseries.
* **Return type:** [DataCollection](../../api-client-python/docs/reference/data-collection.md#coinmetrics._data_collection.DataCollection)

#### `CoinMetricsClient.get_market_orderbooks(markets, granularity=None, page_size=None, paging_from='start', start_time=None, end_time=None, start_inclusive=None, end_inclusive=None, depth_limit='100', timezone=None, limit_per_market=None, format='json_stream')`

Returns market order books for specified markets and date range. For more information on order books, see: [https://docs.coinmetrics.io/info/markets/orderbook](https://docs.coinmetrics.io/info/markets/orderbook)

* **Parameters:**
  * **markets** ([_list_](https://docs.python.org/3/library/stdtypes.html#list) _(_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _)_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- list of market ids. Market ids use the following naming convention: exchangeName-baseAsset-quoteAsset-spot for spot markets, exchangeName-futuresSymbol-future for futures markets, and exchangeName-optionsSymbol-option for options markets. e.g., 'coinbase-btc-usd-spot', 'bitmex-XBTUSD-future'
  * **granularity** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Downsampling granularity of market order books and quotes. Supported values are raw, 1m, 1h, and 1d.
  * **page\_size** ([_int_](https://docs.python.org/3/library/functions.html#int)) -- number of items returned per page when calling the API. If the request times out, try using a smaller number.
  * **paging\_from** (_PagingFrom_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Defines where you want to start receiving items from, 'start' or 'end' of the timeseries.
  * **start\_time** (_datetime_ _,_ _date_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Start time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **end\_time** (_datetime_ _,_ _date_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- End time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **start\_inclusive** ([_bool_](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if start timestamp must be included in the timeseries if present. True by default.
  * **end\_inclusive** ([_bool_](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if end timestamp must be included in the timeseries if present. True by default.
  * **depth\_limit** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- book depth limit, 100 levels max or full book that is not limited and provided as is from the exchange. Full book snapshots are collected once per hour
  * **timezone** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- timezone of the start/end times in db format for example: "America/Chicago". Default value is "UTC". For more details check out API documentation page.
  * **limit\_per\_market** ([_int_](https://docs.python.org/3/library/functions.html#int)) -- How many entries _per market_ the result should contain.
  * **format** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Format of the response. Supported values are json, json\_stream, csv. Default is json\_stream. Setting format='json\_stream' is generally more performant. page\_size and paging\_from is ignored when format='json\_stream'.
* **Returns:** Market Order Books timeseries.
* **Return type:** [DataCollection](../../api-client-python/docs/reference/data-collection.md#coinmetrics._data_collection.DataCollection)

#### `CoinMetricsClient.get_market_quotes(markets, granularity=None, page_size=None, paging_from='start', start_time=None, end_time=None, start_inclusive=None, end_inclusive=None, timezone=None, limit_per_market=None, include_one_sided=None, format='json_stream')`

Returns market quotes for specified markets and date range. For more information on quotes, see: [https://docs.coinmetrics.io/info/markets/quotes](https://docs.coinmetrics.io/info/markets/quotes)

* **Parameters:**
  * **markets** ([_list_](https://docs.python.org/3/library/stdtypes.html#list) _(_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _)_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- list of market ids. Market ids use the following naming convention: exchangeName-baseAsset-quoteAsset-spot for spot markets, exchangeName-futuresSymbol-future for futures markets, and exchangeName-optionsSymbol-option for options markets. e.g., 'coinbase-btc-usd-spot', 'bitmex-XBTUSD-future'
  * **granularity** -- Downsampling granularity of market order books and quotes. Supported values are raw, 1m, 1h, and 1d.
  * **page\_size** ([_int_](https://docs.python.org/3/library/functions.html#int)) -- number of items returned per page when calling the API. If the request times out, try using a smaller number.
  * **paging\_from** (_PagingFrom_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Defines where you want to start receiving items from, 'start' or 'end' of the timeseries.
  * **start\_time** (_datetime_ _,_ _date_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Start time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **end\_time** (_datetime_ _,_ _date_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- End time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **start\_inclusive** ([_bool_](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if start timestamp must be included in the timeseries if present. True by default.
  * **end\_inclusive** ([_bool_](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if end timestamp must be included in the timeseries if present. True by default.
  * **timezone** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- timezone of the start/end times in db format for example: "America/Chicago". Default value is "UTC". For more details check out API documentation page.
  * **limit\_per\_market** ([_int_](https://docs.python.org/3/library/functions.html#int)) -- How many entries _per market_ the result should contain.
  * **include\_one\_sided** ([_bool_](https://docs.python.org/3/library/functions.html#bool)) -- Default: false Include one-side and empty books in quotes response.
  * **format** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Format of the response. Supported values are json, json\_stream, csv. Default is json\_stream. Setting format='json\_stream' is generally more performant. page\_size and paging\_from is ignored when format='json\_stream'.
* **Returns:** Market Quotes timeseries.
* **Return type:** [DataCollection](../../api-client-python/docs/reference/data-collection.md#coinmetrics._data_collection.DataCollection)

#### `CoinMetricsClient.get_market_trades(markets, page_size=None, paging_from='start', start_time=None, end_time=None, start_inclusive=None, end_inclusive=None, timezone=None, limit_per_market=None, min_confirmations=None, format='json_stream')`

Returns market trades for specified markets and date range. For more information on market trades, see: [https://docs.coinmetrics.io/info/markets/trades](https://docs.coinmetrics.io/info/markets/trades)

* **Parameters:**
  * **markets** ([_list_](https://docs.python.org/3/library/stdtypes.html#list) _(_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _)_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- list of market ids. Market ids use the following naming convention: exchangeName-baseAsset-quoteAsset-spot for spot markets, exchangeName-futuresSymbol-future for futures markets, and exchangeName-optionsSymbol-option for options markets. e.g., 'coinbase-btc-usd-spot', 'bitmex-XBTUSD-future'
  * **page\_size** ([_int_](https://docs.python.org/3/library/functions.html#int)) -- number of items returned per page when calling the API. If the request times out, try using a smaller number.
  * **paging\_from** (_PagingFrom_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Defines where you want to start receiving items from, 'start' or 'end' of the timeseries.
  * **start\_time** (_datetime_ _,_ _date_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Start time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **end\_time** (_datetime_ _,_ _date_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- End time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **start\_inclusive** ([_bool_](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if start timestamp must be included in the timeseries if present. True by default.
  * **end\_inclusive** ([_bool_](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if end timestamp must be included in the timeseries if present. True by default.
  * **timezone** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- timezone of the start/end times in db format for example: "America/Chicago". Default value is "UTC". For more details check out API documentation page.
  * **limit\_per\_market** ([_int_](https://docs.python.org/3/library/functions.html#int)) -- How many entries _per market_ the result should contain.
  * **min\_confirmations** ([_int_](https://docs.python.org/3/library/functions.html#int)) -- Specifies how many blocks behind the chain tip trades are based on. Default is 2.
  * **format** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Default: "json\_stream". Format of the response. Supported values are json, json\_stream.
* **Returns:** Market Trades timeseries.
* **Return type:** [DataCollection](../../api-client-python/docs/reference/data-collection.md#coinmetrics._data_collection.DataCollection)

#### `CoinMetricsClient.get_mempool_feerates(assets, page_size=200, paging_from='start', start_time=None, end_time=None, start_inclusive=None, end_inclusive=None, timezone=None, format=None)`

Returns mempool feerates for the specified assets. Note: for this method, page\_size must be <= 200.

* **Parameters:**
  * **assets** ([_list_](https://docs.python.org/3/library/stdtypes.html#list) _(_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _)_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- list of asset names, e.g. 'btc'
  * **page\_size** ([_int_](https://docs.python.org/3/library/functions.html#int)) -- number of items returned per page when calling the API. If the request times out, try using a smaller number.
  * **paging\_from** (_PagingFrom_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Defines where you want to start receiving items from, 'start' or 'end' of the timeseries.
  * **start\_time** (_datetime_ _,_ _date_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Start time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **end\_time** (_datetime_ _,_ _date_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- End time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **start\_inclusive** ([_bool_](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if start timestamp must be included in the timeseries if present. True by default.
  * **end\_inclusive** ([_bool_](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if end timestamp must be included in the timeseries if present. True by default.
  * **timezone** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- timezone of the start/end times in db format for example: "America/Chicago". Default value is "UTC". For more details check out API documentation page.
  * **format** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Format of the response. Supported values are json, csv. Default is json.
* **Returns:** Mempool Fee Rates timeseries.
* **Return type:** [DataCollection](../../api-client-python/docs/reference/data-collection.md#coinmetrics._data_collection.DataCollection)

#### `CoinMetricsClient.get_mining_pool_tips_summary(assets, page_size=None, paging_from='start', start_time=None, end_time=None, start_inclusive=None, end_inclusive=None, timezone=None, format=None)`

Returns mining pool tips summaries for specified assets.

* **Parameters:**
  * **assets** ([_list_](https://docs.python.org/3/library/stdtypes.html#list) _(_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _)_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- list of asset names, e.g. 'btc'
  * **page\_size** ([_int_](https://docs.python.org/3/library/functions.html#int)) -- number of items returned per page when calling the API. If the request times out, try using a smaller number.
  * **paging\_from** (_PagingFrom_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Defines where you want to start receiving items from, 'start' or 'end' of the timeseries.
  * **start\_time** (_datetime_ _,_ _date_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Start time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **end\_time** (_datetime_ _,_ _date_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- End time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **start\_inclusive** ([_bool_](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if start timestamp must be included in the timeseries if present. True by default.
  * **end\_inclusive** ([_bool_](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if end timestamp must be included in the timeseries if present. True by default.
  * **timezone** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- timezone of the start/end times in db format for example: "America/Chicago". Default value is "UTC". For more details check out API documentation page.
  * **format** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Format of the response. Supported values are json, csv. Default is json.
* **Returns:** Mining Pool Tips timeseries.
* **Return type:** [DataCollection](../../api-client-python/docs/reference/data-collection.md#coinmetrics._data_collection.DataCollection)

#### `CoinMetricsClient.get_pair_candles(pairs, frequency=None, page_size=None, paging_from='start', start_time=None, end_time=None, start_height=None, end_height=None, start_inclusive=None, end_inclusive=None, timezone=None, limit_per_pair=None, format='json_stream')`

Returns candles for specified asset pairs. Results are ordered by tuple (pair, time).

* **Parameters:**
  * **pairs** ([_list_](https://docs.python.org/3/library/stdtypes.html#list) _(_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _)_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- A single asset-asset pairs (e.g. "btc-usd") or a list of asset-asset-pairs to return info for.
  * **frequency** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- frequency of the returned timeseries, e.g 15s, 1d, etc.
  * **page\_size** ([_int_](https://docs.python.org/3/library/functions.html#int)) -- number of items returned per page when calling the API. If the request times out, try using a smaller number.
  * **paging\_from** (_PagingFrom_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Defines where you want to start receiving items from, 'start' or 'end' of the timeseries.
  * **start\_time** (_datetime_ _,_ _date_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Start time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **end\_time** (_datetime_ _,_ _date_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- End time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **start\_height** ([_int_](https://docs.python.org/3/library/functions.html#int)) -- Start block of the timeseries (only applicable when querying with frequency 1b).
  * **end\_height** ([_int_](https://docs.python.org/3/library/functions.html#int)) -- End block of the timeseries (only applicable when querying with frequency 1b).
  * **start\_inclusive** ([_bool_](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if start timestamp must be included in the timeseries if present. True by default.
  * **end\_inclusive** ([_bool_](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if end timestamp must be included in the timeseries if present. True by default.
  * **timezone** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- timezone of the start/end times in db format for example: "America/Chicago". Default value is "UTC". For more details check out API documentation page.
  * **limit\_per\_pair** ([_int_](https://docs.python.org/3/library/functions.html#int)) -- How many entries _per asset pair_ the result should contain.
  * **format** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Format of the response. Supported values are json, csv. Default is json.
* **Returns:** Asset pair candles timeseries.
* **Return type:** [DataCollection](../../api-client-python/docs/reference/data-collection.md#coinmetrics._data_collection.DataCollection)

#### `CoinMetricsClient.get_pair_metrics(pairs, metrics, frequency=None, page_size=None, paging_from='start', start_time=None, end_time=None, start_height=None, end_height=None, start_inclusive=None, end_inclusive=None, timezone=None, sort=None, limit_per_pair=None, format='json')`

Returns metrics books for specified asset-asset pairs.

* **Parameters:**
  * **pairs** ([_list_](https://docs.python.org/3/library/stdtypes.html#list) _(_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _)_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- List of asset pairs or patterns like `btc-*`, or `*-btc`. Use a corresponding client.catalog\_pair\_metrics\_v2() method for the full list of supported pairs for a given data type.
  * **metrics** ([_list_](https://docs.python.org/3/library/stdtypes.html#list) _(_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _)_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Example: metrics=volume\_trusted\_spot\_usd\_1h,volume\_trusted\_spot\_usd\_1d Comma separated metrics to request time series data for. Information on all available metrics can be found on page [https://coverage.coinmetrics.io/pair-metrics-v2](https://coverage.coinmetrics.io/pair-metrics-v2). Use the client.catalog\_full\_pair\_metrics\_v2() method for the full list of supported metrics per pair.
  * **frequency** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- frequency of the returned timeseries, e.g 15s, 1d, etc.
  * **page\_size** ([_int_](https://docs.python.org/3/library/functions.html#int)) -- number of items returned per page when calling the API. If the request times out, try using a smaller number.
  * **paging\_from** (_PagingFrom_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Defines where you want to start receiving items from, 'start' or 'end' of the timeseries.
  * **start\_time** (_datetime_ _,_ _date_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Start time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **end\_time** (_datetime_ _,_ _date_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- End time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **start\_height** ([_int_](https://docs.python.org/3/library/functions.html#int)) -- Start block of the timeseries (only applicable when querying with frequency 1b).
  * **end\_height** ([_int_](https://docs.python.org/3/library/functions.html#int)) -- End block of the timeseries (only applicable when querying with frequency 1b).
  * **start\_inclusive** ([_bool_](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if start timestamp must be included in the timeseries if present. True by default.
  * **end\_inclusive** ([_bool_](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if end timestamp must be included in the timeseries if present. True by default.
  * **timezone** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- timezone of the start/end times in db format for example: "America/Chicago". Default value is "UTC". For more details check out API documentation page.
  * **sort** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- How results will be sorted, e.g."pair", "time". "pair" by default
  * **limit\_per\_pair** ([_int_](https://docs.python.org/3/library/functions.html#int)) -- How many entries _per asset pair_ the result should contain.
  * **format** ([_str_](https://docs.python.org/3/library/stdtypes.html#str) _|_ _None_)
* **Returns:** Pair Metrics timeseries.
* **Return type:** [DataCollection](../../api-client-python/docs/reference/data-collection.md#coinmetrics._data_collection.DataCollection)

#### `CoinMetricsClient.get_predicted_market_funding_rates(markets, start_time=None, end_time=None, start_inclusive=None, end_inclusive=None, timezone=None, page_size=None, paging_from='start', limit_per_market=None, format='json_stream')`

Returns predicted funding rates for specified futures markets. Results are ordered by tuple (market, time). For more information on funding rates, see: [https://docs.coinmetrics.io/info/markets/fundingrates](https://docs.coinmetrics.io/info/markets/fundingrates)

* **Parameters:**
  * **markets** ([_list_](https://docs.python.org/3/library/stdtypes.html#list) _(_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _)_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- list of market ids. Market ids use the following naming convention: exchangeName-baseAsset-quoteAsset-spot for spot markets, exchangeName-futuresSymbol-future for futures markets, and exchangeName-optionsSymbol-option for options markets. e.g., 'coinbase-btc-usd-spot', 'bitmex-XBTUSD-future'
  * **page\_size** ([_int_](https://docs.python.org/3/library/functions.html#int)) -- number of items returned per page when calling the API. If the request times out, try using a smaller number.
  * **paging\_from** (_PagingFrom_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Defines where you want to start receiving items from, 'start' or 'end' of the timeseries.
  * **start\_time** (_datetime_ _,_ _date_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Start time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **end\_time** (_datetime_ _,_ _date_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- End time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **start\_inclusive** ([_bool_](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if start timestamp must be included in the timeseries if present. True by default.
  * **end\_inclusive** ([_bool_](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if end timestamp must be included in the timeseries if present. True by default.
  * **timezone** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- timezone of the start/end times in db format for example: "America/Chicago". Default value is "UTC". For more details check out API documentation page.
  * **limit\_per\_market** ([_int_](https://docs.python.org/3/library/functions.html#int)) -- How many entries _per market_ the result should contain.
  * **format** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Format of the response. Supported values are json, json\_stream, csv. Default is json.
* **Returns:** Market Funding Rates timeseries.
* **Return type:** [DataCollection](../../api-client-python/docs/reference/data-collection.md#coinmetrics._data_collection.DataCollection)

#### `CoinMetricsClient.get_stream_asset_metrics(assets, metrics, frequency=None, backfill=Backfill.LATEST, ignore_forbidden_errors=None, ignore_unsupported_errors=None)`

Returns timeseries stream of metrics for specified assets.

* **Parameters:**
  * **assets** ([_list_](https://docs.python.org/3/library/stdtypes.html#list) _(_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _)_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- list of asset names, e.g. 'btc'
  * **metrics** ([_list_](https://docs.python.org/3/library/stdtypes.html#list) _(_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _)_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- list of _asset-specific_ metric names, e.g. 'PriceUSD'
  * **frequency** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- frequency of the returned timeseries, e.g 15s, 1d, etc.
  * **backfill** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- What data should be sent upon a connection ("latest" or "none"). By default the latest values are sent just before real-time data.
  * **ignore\_forbidden\_errors** ([_bool_](https://docs.python.org/3/library/functions.html#bool)) -- Default: false. Ignore HTTP 403 Forbidden errors
  * **ignore\_unsupported\_errors** ([_bool_](https://docs.python.org/3/library/functions.html#bool)) -- Default: false. Ignore errors for unsupported assets, metrics or frequencies.
* **Returns:** Asset Metrics timeseries stream.
* **Return type:** [CmStream](../../api-client-python/docs/reference/cm-stream.md#coinmetrics.api_client.CmStream)

#### `CoinMetricsClient.get_stream_asset_quotes(assets, aggregation_method=None, backfill=None)`

Returns a websocket stream of asset quotes for the requested assets.

* **Parameters:**
  * **assets** (_Union_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _,_ _List_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_ _]_) -- Comma separated list of assets. Use the /catalog-all/assets endpoint for the full list of supported assets.
  * **aggregation\_method** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- The method to use for aggregation.
  * **backfill** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- What data should be sent upon a connection. By default the latest values are sent just before real-time data.
* **Returns:**
* **Return type:** [CmStream](../../api-client-python/docs/reference/cm-stream.md#coinmetrics.api_client.CmStream)

#### `CoinMetricsClient.get_stream_index_levels(indexes, include_verification=None, backfill=Backfill.LATEST)`

Returns timeseries stream of index levels.

* **Parameters:**
  * **indexes** ([_list_](https://docs.python.org/3/library/stdtypes.html#list) _(_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _)_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- list of indxes or market patterns such as CMBIBTC
  * **backfill** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- What data should be sent upon a connection ("latest" or "none"). By default the latest values are sent just before real-time data.
  * **include\_verification** ([_bool_](https://docs.python.org/3/library/functions.html#bool) _|_ _None_) -- Default: False If set to true, includes information about verification.
* **Returns:** Index levels data timeseries stream.
* **Return type:** [CmStream](../../api-client-python/docs/reference/cm-stream.md#coinmetrics.api_client.CmStream)

#### `CoinMetricsClient.get_stream_market_candles(markets, frequency=None, backfill=Backfill.LATEST)`

Returns timeseries stream of market candles.

* **Parameters:**
  * **markets** ([_list_](https://docs.python.org/3/library/stdtypes.html#list) _(_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _)_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- list of markets or market patterns like `exchange-*` or `exchange-*-spot` or `*USDT-future`.
  * **frequency** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Candle duration. Supported values are 1m, 5m, 10m, 15m, 30m, 1h, 4h, 1d.
  * **backfill** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- What data should be sent upon a connection ("latest" or "none"). By default the latest values are sent just before real-time data.
* **Returns:** Market Candles timeseries stream.
* **Return type:** [CmStream](../../api-client-python/docs/reference/cm-stream.md#coinmetrics.api_client.CmStream)

#### `CoinMetricsClient.get_stream_market_contract_prices(markets, backfill=None)`

Returns timeseries stream of market contract prices.

This includes index price and mark price that are used by the exchange for settlement and risk management purposes.

* **Parameters:**
  * **markets** (_Union_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _,_ _List_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_ _]_) -- Comma separated list of markets or market patterns like exchange-\* or exchange-\*-spot or \*USDT-future. Use the /catalog-all-v2/markets endpoint for the full list of supported markets.
  * **backfill** (_Optional_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_) -- What data should be sent upon a connection. By default the latest values are sent just before real-time data.
* **Returns:** Market Contract Prices timeseries stream.
* **Return type:** [CmStream](../../api-client-python/docs/reference/cm-stream.md#coinmetrics.api_client.CmStream)

#### `CoinMetricsClient.get_stream_market_liquidations(markets, backfill=None)`

Returns timeseries stream for market liquidations

* **Parameters:**
  * **markets** (_Union_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _,_ _List_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_ _]_) -- Comma separated list of markets or market patterns like exchange-\* or exchange-\*-spot or \*USDT-future. Use the /catalog-all/markets endpoint for the full list of supported markets.
  * **backfill** (_Optional_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_) -- What data should be sent upon a connection. By default the latest values are sent just before real-time data.
* **Returns:** Market liquidations timeseries stream
* **Return type:** [CmStream](../../api-client-python/docs/reference/cm-stream.md#coinmetrics.api_client.CmStream)

#### `CoinMetricsClient.get_stream_market_open_interest(markets, backfill=None)`

Returns a websocket stream of market open interest for the requested markets.

* **Parameters:**
  * **markets** (_Union_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _,_ _List_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_ _]_) -- Comma separated list of markets or market patterns like exchange-\* or exchange-\*-spot or \*USDT-future. Use the /catalog-all/markets endpoint for the full list of supported markets.
  * **backfill** (_Optional_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_) -- What data should be sent upon a connection. By default the latest values are sent just before real-time data.
* **Returns:**
* **Return type:** [CmStream](../../api-client-python/docs/reference/cm-stream.md#coinmetrics.api_client.CmStream)

#### `CoinMetricsClient.get_stream_market_orderbooks(markets, backfill=Backfill.LATEST, depth_limit=None)`

Returns timeseries stream of market orderbooks.

* **Parameters:**
  * **markets** ([_list_](https://docs.python.org/3/library/stdtypes.html#list) _(_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _)_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- list of markets or market patterns like `exchange-*` or `exchange-*-spot` or `*USDT-future`.
  * **backfill** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- What data should be sent upon a connection ("latest" or "none"). By default the latest values are sent just before real-time data.
  * **depth\_limit** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Default: 100. Supported Values: 100 "full\_book". Book depth limit.
* **Returns:** Market Orderbooks timeseries stream.
* **Return type:** [CmStream](../../api-client-python/docs/reference/cm-stream.md#coinmetrics.api_client.CmStream)

#### `CoinMetricsClient.get_stream_market_quotes(markets, backfill=Backfill.LATEST, include_one_sided=None)`

Returns timeseries stream of market quotes.

* **Parameters:**
  * **markets** ([_list_](https://docs.python.org/3/library/stdtypes.html#list) _(_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _)_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- list of markets or market patterns like `exchange-*` or `exchange-*-spot` or `*USDT-future`.
  * **backfill** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- What data should be sent upon a connection ("latest" or "none"). By default the latest values are sent just before real-time data.
  * **include\_one\_sided** ([_bool_](https://docs.python.org/3/library/functions.html#bool)) -- Default: false. Include one-side and empty books in quotes response.
* **Returns:** Market Quotes timeseries stream.
* **Return type:** [CmStream](../../api-client-python/docs/reference/cm-stream.md#coinmetrics.api_client.CmStream)

#### `CoinMetricsClient.get_stream_market_trades(markets, backfill=Backfill.LATEST)`

Returns timeseries stream of market trades.

* **Parameters:**
  * **markets** ([_list_](https://docs.python.org/3/library/stdtypes.html#list) _(_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _)_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- list of markets or market patterns like `exchange-*` or `exchange-*-spot` or `*USDT-future`.
  * **backfill** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- What data should be sent upon a connection ("latest" or "none"). By default the latest values are sent just before real-time data.
* **Returns:** Market Trades timeseries stream.
* **Return type:** [CmStream](../../api-client-python/docs/reference/cm-stream.md#coinmetrics.api_client.CmStream)

#### `CoinMetricsClient.get_stream_pair_quotes(pairs, aggregation_method=None, backfill=None)`

Returns a websocket stream of pair quotes for the requested asset pairs.

* **Parameters:**
  * **pairs** (_Optional_ \*\[\*_Union_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _,_ _List_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_ _]_ _]_) -- Comma separated list of asset pairs. Use the /catalog-all/pairs endpoint for the full list of supported asset pairs.
  * **aggregation\_method** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- The method to use for aggregation.
  * **backfill** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- What data should be sent upon a connection. By default the latest values are sent just before real-time data.
* **Returns:**
* **Return type:** [CmStream](../../api-client-python/docs/reference/cm-stream.md#coinmetrics.api_client.CmStream)
