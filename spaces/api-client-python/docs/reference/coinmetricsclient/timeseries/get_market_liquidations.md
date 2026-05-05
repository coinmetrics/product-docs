# CoinMetricsClient.get_market_liquidations

<a id="coinmetrics.api_client.CoinMetricsClient.get_market_liquidations"></a>

## *method* `CoinMetricsClient.get_market_liquidations`

```python
coinmetrics.api_client.CoinMetricsClient.get_market_liquidations(
    markets,
    page_size=None,
    paging_from='start',
    start_time=None,
    end_time=None,
    start_inclusive=None,
    end_inclusive=None,
    timezone=None,
    limit_per_market=None,
    format='json_stream',
)
```

Returns market liquidations for specified markets and date range.
For more information on liquidations, see: [https://docs.coinmetrics.io/info/markets/liquidations](https://docs.coinmetrics.io/info/markets/liquidations)

* **Parameters:**
  * **markets** ([*list*](https://docs.python.org/3/library/stdtypes.html#list) *(*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *)* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- list of market ids. Market ids use the following naming convention: exchangeName-baseAsset-quoteAsset-spot for spot markets, exchangeName-futuresSymbol-future for futures markets, and exchangeName-optionsSymbol-option for options markets. e.g., 'coinbase-btc-usd-spot', 'bitmex-XBTUSD-future'
  * **page_size** ([*int*](https://docs.python.org/3/library/functions.html#int)) -- number of items returned per page when calling the API. If the request times out, try using a smaller number.
  * **paging_from** (*PagingFrom* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Defines where you want to start receiving items from, 'start' or 'end' of the timeseries.
  * **start_time** (*datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Start time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **end_time** (*datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- End time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **start_inclusive** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if start timestamp must be included in the timeseries if present. True by default.
  * **end_inclusive** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if end timestamp must be included in the timeseries if present. True by default.
  * **timezone** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- timezone of the start/end times in db format for example: "America/Chicago". Default value is "UTC". For more details check out API documentation page.
  * **limit_per_market** ([*int*](https://docs.python.org/3/library/functions.html#int)) -- How many entries *per market* the result should contain.
  * **format** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Format of the response. Supported values are json, json_stream, csv. Default is json.
* **Returns:**
  Market Liquidations timeseries.
* **Return type:**
  [DataCollection](../../data-collection/README.md#coinmetrics._data_collection.DataCollection)
