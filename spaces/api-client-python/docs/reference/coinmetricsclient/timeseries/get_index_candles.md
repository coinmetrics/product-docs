# CoinMetricsClient.get_index_candles

<a id="coinmetrics.api_client.CoinMetricsClient.get_index_candles"></a>

```python
coinmetrics.api_client.CoinMetricsClient.get_index_candles(
    indexes,
    frequency=None,
    page_size=None,
    paging_from='start',
    start_time=None,
    end_time=None,
    start_inclusive=None,
    end_inclusive=None,
    timezone=None,
    limit_per_index=None,
    format='json_stream',
)
```

Returns index candles for specified indexes and date range.

* **Parameters:**
  * **indexes** ([*list*](https://docs.python.org/3/library/stdtypes.html#list) *(*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *)* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- list of index names, e.g. 'CMBI10'
  * **frequency** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- frequency of the returned timeseries, e.g 15s, 1d, etc.
  * **page_size** ([*int*](https://docs.python.org/3/library/functions.html#int)) -- number of items returned per page when calling the API. If the request times out, try using a smaller number.
  * **paging_from** (*PagingFrom* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Defines where you want to start receiving items from, 'start' or 'end' of the timeseries.
  * **start_time** (*datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Start time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **end_time** (*datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- End time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **start_inclusive** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if start timestamp must be included in the timeseries if present. True by default.
  * **end_inclusive** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if end timestamp must be included in the timeseries if present. True by default.
  * **timezone** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- timezone of the start/end times in db format for example: "America/Chicago". Default value is "UTC". For more details check out API documentation page.
  * **limit_per_index** ([*int*](https://docs.python.org/3/library/functions.html#int)) -- How many entries *per index* the result should contain.
  * **format** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Format of the response. Supported values are json, csv. Default is json.
* **Returns:**
  Index Candles timeseries.
* **Return type:**
  [DataCollection](../../data-collection/README.md#coinmetrics._data_collection.DataCollection)
