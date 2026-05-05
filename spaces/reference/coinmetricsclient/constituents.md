# Constituents

#### `CoinMetricsClient.get_snapshots_of_asset_metric_constituents(metric, at_time=None, end_time=None, start_time=None, next_page_token=None, page_size=None, paging_from=None, format=None)`

Returns snapshots of asset metric constituents. Results are sorted by tuple (time, constituent\_name), where constituent\_name depends on a target metric. E.g., the volume\_trusted\_spot\_usd\_1d metric constituents are exchanges, i.e. the output will be sorted by (time, exchange).

* **Parameters:**
  * **metric** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Target metric name.
  * **at\_time** (_Optional_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_) -- Returns constituents at a specified date. Value now can be specified to get the current constituents. Mutually exclusive with start\_time and/or end\_time.
  * **end\_time** (_Optional_ \*\[\*_Union_ \*\[\*_datetime_ _,_ _date_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_ _]_) -- End of the time interval, inclusive. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120. Mutually exclusive with at\_time.
  * **start\_time** (_Optional_ \*\[\*_Union_ \*\[\*_datetime_ _,_ _date_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_ _]_) -- Start of the time interval, inclusive. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120. Mutually exclusive with at\_time.
  * **next\_page\_token** (_Optional_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_) -- Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use next\_page\_url response field.
  * **page\_size** (_Optional_ _\[_[_int_](https://docs.python.org/3/library/functions.html#int) _]_) -- Number of items per single page of results.
  * **paging\_from** (_Optional_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_) -- Where does the first page start, at the start of the interval or at the end.
  * **format** (_Optional_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_) -- Format of the response. Supported values are json, csv. Default is json.
* **Returns:** Snapshots of asset metric constituents.
* **Return type:** [DataCollection](../../api-client-python/docs/reference/data-collection.md#coinmetrics._data_collection.DataCollection)

#### `CoinMetricsClient.get_timeframes_of_asset_metric_constituents(metric, constituents=None, end_time=None, start_time=None, next_page_token=None, page_size=None, paging_from=None, format=None)`

Returns timeframes of asset metric constituents. Results are sorted by tuple (start\_time, constituent\_name), where constituent depends on a target metric. E.g., the volume\_trusted\_spot\_usd\_1d metric constituents are exchanges, i.e. the output will be sorted by (start\_time, exchange).

* **Parameters:**
  * **metric** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Target metric name.
  * **constituents** (_Optional_ \*\[\*_Union_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _,_ _List_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_ _]_ _]_) -- Comma separated list of constituents. By default all constituents are returned. Different asset metrics may have different constituents. For example, constituents for volume\_trusted\_spot\_usd\_1d are exchanges.
  * **end\_time** (_Optional_ \*\[\*_Union_ \*\[\*_datetime_ _,_ _date_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_ _]_) -- End of the time interval, inclusive. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120.
  * **start\_time** (_Optional_ \*\[\*_Union_ \*\[\*_datetime_ _,_ _date_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_ _]_) -- Start of the time interval, inclusive. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120.
  * **next\_page\_token** (_Optional_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_) -- Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use next\_page\_url response field.
  * **page\_size** (_Optional_ _\[_[_int_](https://docs.python.org/3/library/functions.html#int) _]_) -- Number of items per single page of results.
  * **paging\_from** (_Optional_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_) -- Where does the first page start, at the start of the interval or at the end.
  * **format** (_Optional_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_) -- Format of the response. Supported values are json, csv. Default is json.
* **Returns:** List of timeframes.
* **Return type:** [DataCollection](../../api-client-python/docs/reference/data-collection.md#coinmetrics._data_collection.DataCollection)
