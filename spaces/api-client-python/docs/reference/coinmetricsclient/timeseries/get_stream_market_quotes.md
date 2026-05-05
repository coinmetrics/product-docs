# <code>CoinMetricsClient.get_stream_market_quotes</code>

*method*

```python
coinmetrics.api_client.CoinMetricsClient.get_stream_market_quotes(
    markets,
    backfill=Backfill.LATEST,
    include_one_sided=None,
)
```

Returns timeseries stream of market quotes.

* **Parameters:**
  * **markets** ([*list*](https://docs.python.org/3/library/stdtypes.html#list) *(*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *)* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- list of markets or market patterns like `exchange-*` or `exchange-*-spot` or `*USDT-future`.
  * **backfill** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- What data should be sent upon a connection ("latest" or "none"). By default the latest values are sent just before real-time data.
  * **include_one_sided** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Default: false. Include one-side and empty books in quotes response.
* **Returns:**
  Market Quotes timeseries stream.
* **Return type:**
  [CmStream](../../cm-stream/README.md#coinmetrics.api_client.CmStream)
