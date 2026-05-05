# CoinMetricsClient.get_stream_market_trades

<a id="coinmetrics.api_client.CoinMetricsClient.get_stream_market_trades"></a>

## `coinmetrics.api_client.CoinMetricsClient.get_stream_market_trades(markets, backfill=Backfill.LATEST)`

Returns timeseries stream of market trades.

* **Parameters:**
  * **markets** ([*list*](https://docs.python.org/3/library/stdtypes.html#list) *(*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *)* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- list of markets or market patterns like `exchange-*` or `exchange-*-spot` or `*USDT-future`.
  * **backfill** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- What data should be sent upon a connection ("latest" or "none"). By default the latest values are sent just before real-time data.
* **Returns:**
  Market Trades timeseries stream.
* **Return type:**
  [CmStream](../../cm-stream/README.md#coinmetrics.api_client.CmStream)
