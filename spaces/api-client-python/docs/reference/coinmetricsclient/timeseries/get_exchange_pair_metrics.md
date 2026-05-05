# `CoinMetricsClient.get_exchange_pair_metrics`

*method*

```python
coinmetrics.api_client.CoinMetricsClient.get_exchange_pair_metrics(
    exchange_pairs,
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
    format='json_stream',
    limit_per_exchange_pair=None,
)
```

Returns metrics for specified exchange-pair.

* **Parameters:**
  * **exchange_pairs** ([*list*](https://docs.python.org/3/library/stdtypes.html#list) *(*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *)* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- A list of exchange-pairs or patterns like `exchange-*` or `*-pair`.
  * **metrics** ([*list*](https://docs.python.org/3/library/stdtypes.html#list) *(*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *)* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Example: metrics=volatility_implied_put_delta_50_1y_expiration,volatility_implied_skew_delta_05_1d_expiration
    Comma separated metrics to request time series data for.
    Information on all available metrics can be found on page [https://coverage.coinmetrics.io/exchange-pair-metrics](https://coverage.coinmetrics.io/exchange-pair-metrics).
    Use the catalog_full_exchange_pair_metrics_v2() method for the full list of supported metrics per exchange-pair combination.
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
  * **format** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Default: "json". Enum: "json" "json_stream" "csv". Format of the response. Supported values are json, json_stream, csv.
  * **limit_per_exchange_pair** ([*int*](https://docs.python.org/3/library/functions.html#int)) -- How many entries *per exchange* the result should contain.
* **Returns:**
  Exchange-Pair Metrics timeseries.
* **Return type:**
  [DataCollection](../../data-collection/README.md#coinmetrics._data_collection.DataCollection)
