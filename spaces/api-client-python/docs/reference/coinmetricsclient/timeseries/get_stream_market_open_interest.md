# CoinMetricsClient.get_stream_market_open_interest

<a id="coinmetrics.api_client.CoinMetricsClient.get_stream_market_open_interest"></a>

```python
coinmetrics.api_client.CoinMetricsClient.get_stream_market_open_interest(
    markets,
    backfill=None,
)
```

Returns a websocket stream of market open interest for the requested markets.

* **Parameters:**
  * **markets** (*Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]*) -- Comma separated list of markets or market patterns like exchange-\* or exchange-\*-spot or \*USDT-future. Use the /catalog-all/markets endpoint for the full list of supported markets.
  * **backfill** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- What data should be sent upon a connection. By default the latest values are sent just before real-time data.
* **Returns:**
* **Return type:**
  [CmStream](../../cm-stream/README.md#coinmetrics.api_client.CmStream)
