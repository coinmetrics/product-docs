# CoinMetricsClient.get_timeframes_of_asset_metric_constituents

<a id="coinmetrics.api_client.CoinMetricsClient.get_timeframes_of_asset_metric_constituents"></a>

## `coinmetrics.api_client.CoinMetricsClient.get_timeframes_of_asset_metric_constituents(metric, constituents=None, end_time=None, start_time=None, next_page_token=None, page_size=None, paging_from=None, format=None)`

Returns timeframes of asset metric constituents. Results are sorted by tuple (start_time,
constituent_name), where constituent depends on a target metric. E.g., the
volume_trusted_spot_usd_1d metric constituents are exchanges, i.e. the output will be sorted by
(start_time, exchange).

* **Parameters:**
  * **metric** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Target metric name.
  * **constituents** (*Optional* *[**Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]* *]*) -- Comma separated list of constituents. By default all constituents are returned.
    Different asset metrics may have different constituents.
    For example, constituents for volume_trusted_spot_usd_1d are exchanges.
  * **end_time** (*Optional* *[**Union* *[**datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]*) -- End of the time interval, inclusive.
    Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120.
  * **start_time** (*Optional* *[**Union* *[**datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]*) -- Start of the time interval, inclusive.
    Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120.
  * **next_page_token** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use next_page_url response field.
  * **page_size** (*Optional* *[*[*int*](https://docs.python.org/3/library/functions.html#int) *]*) -- Number of items per single page of results.
  * **paging_from** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Where does the first page start, at the start of the interval or at the end.
  * **format** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Format of the response. Supported values are json, csv. Default is json.
* **Returns:**
  List of timeframes.
* **Return type:**
  [DataCollection](../../data-collection/README.md#coinmetrics._data_collection.DataCollection)
