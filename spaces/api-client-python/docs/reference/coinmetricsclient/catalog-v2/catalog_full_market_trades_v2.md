# CoinMetricsClient.catalog_full_market_trades_v2

<a id="coinmetrics.api_client.CoinMetricsClient.catalog_full_market_trades_v2"></a>

## `method CoinMetricsClient.catalog_full_market_trades_v2`

```python
coinmetrics.api_client.CoinMetricsClient.catalog_full_market_trades_v2(
    markets=None,
    exchange=None,
    market_type=None,
    base=None,
    quote=None,
    asset=None,
    symbol=None,
    start_time=None,
    end_time=None,
    start_inclusive=None,
    end_inclusive=None,
    timezone=None,
    format='json_stream',
    page_size=None,
    paging_from=None,
    next_page_token=None,
)
```

Returns a list of all markets with trades support along with the time ranges of available data.

* **Parameters:**
  * **markets** (*Optional* *[**Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]* *]*) -- Comma separated list of markets. By default all markets are returned.
  * **exchange** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Unique name of an exchange.
  * **market_type** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Type of markets.
  * **base** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Base asset of markets.
  * **quote** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Quote asset of markets.
  * **asset** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Any asset of markets.
  * **symbol** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Symbol of derivative markets, full instrument name.
  * **start_time** (*Optional* *[**Union* *[**datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]*) -- Start time of the interval.
  * **end_time** (*Optional* *[**Union* *[**datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]*) -- End time of the interval.
  * **format** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'.
  * **start_inclusive** (*Optional* *[*[*bool*](https://docs.python.org/3/library/functions.html#bool) *]*) -- Whether to include the start time in the interval.
  * **end_inclusive** (*Optional* *[*[*bool*](https://docs.python.org/3/library/functions.html#bool) *]*) -- Whether to include the end time in the interval.
  * **timezone** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Timezone of the interval.
  * **page_size** (*Optional* *[*[*int*](https://docs.python.org/3/library/functions.html#int) *]*) -- Number of items per single page of results.
  * **paging_from** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Where does the first page start, at the start of the interval or at the end.
  * **next_page_token** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use next_page_url response field.
* **Returns:**
  List of market trades statistics.
* **Return type:**
  CatalogV2DataCollection
