# <code>CoinMetricsClient.get_stream_market_candles</code>

*method*

```python
coinmetrics.api_client.CoinMetricsClient.get_stream_market_candles(
    markets,
    frequency=None,
    backfill=Backfill.LATEST,
)
```

Returns timeseries stream of market candles.

* **Parameters:**
  * **markets** ([*list*](https://docs.python.org/3/library/stdtypes.html#list) *(*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *)* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- list of markets or market patterns like `exchange-*` or `exchange-*-spot` or `*USDT-future`.
  * **frequency** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Candle duration. Supported values are 1m, 5m, 10m, 15m, 30m, 1h, 4h, 1d.
  * **backfill** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- What data should be sent upon a connection ("latest" or "none"). By default the latest values are sent just before real-time data.
* **Returns:**
  Market Candles timeseries stream.
* **Return type:**
  [CmStream](../../cm-stream/README.md#coinmetrics.api_client.CmStream)
