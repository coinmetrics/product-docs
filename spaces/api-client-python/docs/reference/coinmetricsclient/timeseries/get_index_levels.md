# CoinMetricsClient.get_index_levels

<a id="coinmetrics.api_client.CoinMetricsClient.get_index_levels"></a>

## `method CoinMetricsClient.get_index_levels`

```python
coinmetrics.api_client.CoinMetricsClient.get_index_levels(
    indexes,
    frequency=None,
    granularity=None,
    start_time=None,
    end_time=None,
    start_inclusive=None,
    end_inclusive=None,
    timezone=None,
    page_size=None,
    paging_from='start',
    limit_per_index=None,
    include_verification=None,
    format='json_stream',
)
```

Returns index levels for specified indexes and date range.

* **Parameters:**
  * **indexes** ([*list*](https://docs.python.org/3/library/stdtypes.html#list) *(*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *)* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- list of index names, e.g. 'CMBI10'
  * **frequency** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- frequency of the returned timeseries, e.g 15s, 1d, etc.
  * **granularity** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Default: "1s" granularity of the returned timeseries, e.g 1s, 1m, etc.
  * **start_time** (*datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Start time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **end_time** (*datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- End time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **start_inclusive** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if start timestamp must be included in the timeseries if present. True by default.
  * **end_inclusive** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if end timestamp must be included in the timeseries if present. True by default.
  * **timezone** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- timezone of the start/end times in db format for example: "America/Chicago". Default value is "UTC". For more details check out API documentation page.
  * **page_size** ([*int*](https://docs.python.org/3/library/functions.html#int)) -- number of items returned per page when calling the API. If the request times out, try using a smaller number.
  * **paging_from** (*PagingFrom* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Defines where you want to start receiving items from, 'start' or 'end' of the timeseries.
  * **limit_per_index** ([*int*](https://docs.python.org/3/library/functions.html#int)) -- How many entries *per index* the result should contain.
  * **include_verification** ([*bool*](https://docs.python.org/3/library/functions.html#bool) *|* *None*) -- Default: False set to true, includes information about verification.
  * **format** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'.
* **Type:**
  [bool](https://docs.python.org/3/library/functions.html#bool)
* **Returns:**
  Index Levels timeseries.
* **Return type:**
  [DataCollection](../../data-collection/README.md#coinmetrics._data_collection.DataCollection)
