# CoinMetricsClient.get_asset_metrics

<a id="coinmetrics.api_client.CoinMetricsClient.get_asset_metrics"></a>

## *method* `CoinMetricsClient.get_asset_metrics`

```python
coinmetrics.api_client.CoinMetricsClient.get_asset_metrics(
    assets,
    metrics,
    frequency=None,
    page_size=None,
    paging_from='start',
    start_time=None,
    end_time=None,
    start_height=None,
    end_height=None,
    start_inclusive=None,
    end_inclusive=None,
    timezone=None,
    sort=None,
    limit_per_asset=None,
    status=None,
    start_hash=None,
    end_hash=None,
    min_confirmations=None,
    null_as_zero=None,
    ignore_forbidden_errors=None,
    ignore_unsupported_errors=None,
    format='json_stream',
)
```

Returns requested metrics for specified assets.

* **Parameters:**
  * **assets** ([*list*](https://docs.python.org/3/library/stdtypes.html#list) *(*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *)* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- list of asset names, e.g. 'btc' Use the client.catalog_asset_metrics_v2() method for the full list of supported assets or specify asterisk (`*`) in order to get metrics for all supported assets.
  * **metrics** ([*list*](https://docs.python.org/3/library/stdtypes.html#list) *(*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *)* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- list of asset-specific metric names, e.g. 'AdrActCnt', 'BlkHgt'. Example: metrics='AdrActCnt,BlkHgt'
    Comma separated metrics to request time series data for.
    Information on all available metrics can be found on page [https://coverage.coinmetrics.io/asset-metrics-v2](https://coverage.coinmetrics.io/asset-metrics-v2).
    Use the client.catalog_full_asset_metrics_v2() method for the full list of supported metrics per asset.
  * **frequency** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- frequency of the returned timeseries, e.g 15s, 1d, etc.
  * **page_size** ([*int*](https://docs.python.org/3/library/functions.html#int)) -- number of items returned per page when calling the API. If the request times out, try using a smaller number.
  * **paging_from** (*PagingFrom* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Defines where you want to start receiving items from, 'start' or 'end' of the timeseries.
  * **start_time** (*datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Start time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **end_time** (*datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- End time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **start_height** ([*int*](https://docs.python.org/3/library/functions.html#int)) -- Start block of the timeseries (only applicable when querying with frequency 1b).
  * **end_height** ([*int*](https://docs.python.org/3/library/functions.html#int)) -- End block of the timeseries (only applicable when querying with frequency 1b).
  * **start_inclusive** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if start timestamp must be included in the timeseries if present. True by default.
  * **end_inclusive** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if end timestamp must be included in the timeseries if present. True by default.
  * **timezone** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- timezone of the start/end times in db format for example: "America/Chicago". Default value is "UTC". For more details check out API documentation page.
  * **sort** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- How results will be sorted, e.g. "asset", "height", or "time". Default is "asset". Metrics with 1b frequency are sorted by (asset, height, block_hash) tuples by default. Metrics with other frequencies are sorted by (asset, time) by default. If you want to sort 1d metrics by (time, asset) you should choose time as value for the sort parameter. Sorting by time is useful if you request metrics for a set of assets.
  * **limit_per_asset** ([*int*](https://docs.python.org/3/library/functions.html#int)) -- How many entries *per asset* the result should contain.
  * **status** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Which metric values do you want to see. Applicable only for "reviewable" metrics.
    You can find them in the /catalog/metrics endpoint. Default: "all". Supported: "all" "flash" "reviewed" "revised"
  * **start_hash** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- The start hash indicates the beginning block height for the set of data that are returned.
    Inclusive by default. Mutually exclusive with start_time and start_height.
  * **end_hash** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- The end hash indicates the ending block height for the set of data that are returned.
    Inclusive by default. Mutually exclusive with end_time and end_height.
  * **min_confirmations** ([*int*](https://docs.python.org/3/library/functions.html#int)) -- Specifies how many blocks behind the chain tip block by block metrics
    (1b frequency) are based on. Default for btc is 2 and 99 for eth.
  * **null_as_zero** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Default: false. Nulls are represented as zeros in the response.
  * **ignore_forbidden_errors** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Default: false. Ignore HTTP 403 Forbidden errors
  * **ignore_unsupported_errors** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Default: false. Ignore errors for unsupported assets, metrics or frequencies.
  * **format** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'.
* **Returns:**
  Asset Metrics timeseries.
* **Return type:**
  [DataCollection](../../data-collection/README.md#coinmetrics._data_collection.DataCollection)
