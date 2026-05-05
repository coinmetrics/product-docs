# CoinMetricsClient.get_defi_balance_sheets

<a id="coinmetrics.api_client.CoinMetricsClient.get_defi_balance_sheets"></a>

```python
coinmetrics.api_client.CoinMetricsClient.get_defi_balance_sheets(
    defi_protocols,
    page_size=None,
    paging_from='start',
    start_time=None,
    end_time=None,
    start_height=None,
    end_height=None,
    start_inclusive=None,
    end_inclusive=None,
    timezone=None,
    format=None,
)
```

Returns Defi Balance Sheet records for specified DeFi protocols.

* **Parameters:**
  * **defi_protocols** ([*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- list of DeFi protocols like aave_v2_eth or protocol patterns like `aave_v2_*` or `aave_*_eth` or `*_eth`.
  * **page_size** ([*int*](https://docs.python.org/3/library/functions.html#int)) -- number of items returned per page when calling the API. If the request times out, try using a smaller number.
  * **paging_from** (*PagingFrom* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Defines where you want to start receiving items from, 'start' or 'end' of the timeseries.
  * **start_time** (*datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Start time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **end_time** (*datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- End time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **start_height** ([*int*](https://docs.python.org/3/library/functions.html#int)) -- The start height indicates the beginning block height for the set of data that are returned. Mutually exclusive with start_time
  * **end_height** ([*int*](https://docs.python.org/3/library/functions.html#int)) -- The end height indicates the beginning block height for the set of data that are returned. Mutually exclusive with end_time
  * **start_inclusive** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if start timestamp must be included in the timeseries if present. True by default.
  * **end_inclusive** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if end timestamp must be included in the timeseries if present. True by default.
  * **timezone** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- timezone of the start/end times in db format for example: "America/Chicago". Default value is "UTC". For more details check out API documentation page.
  * **format** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Format of the response. Supported values are json, csv. Default is json.
* **Returns:**
  list of blockchain blocks metadata
* **Return type:**
  [DataCollection](../../data-collection/README.md#coinmetrics._data_collection.DataCollection)
