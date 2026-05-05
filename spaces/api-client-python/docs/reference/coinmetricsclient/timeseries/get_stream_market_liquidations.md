# CoinMetricsClient.get_stream_market_liquidations

<a id="coinmetrics.api_client.CoinMetricsClient.get_stream_market_liquidations"></a>

## `method CoinMetricsClient.get_stream_market_liquidations`

```python
coinmetrics.api_client.CoinMetricsClient.get_stream_market_liquidations(
    markets,
    backfill=None,
)
```

Returns timeseries stream for market liquidations

* **Parameters:**
  * **markets** (*Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]*) -- Comma separated list of markets or market patterns like exchange-\* or exchange-\*-spot or \*USDT-future. Use the /catalog-all/markets endpoint for the full list of supported markets.
  * **backfill** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- What data should be sent upon a connection. By default the latest values are sent just before real-time data.
* **Returns:**
  Market liquidations timeseries stream
* **Return type:**
  [CmStream](../../cm-stream/README.md#coinmetrics.api_client.CmStream)
