# CoinMetricsClient.get_stream_market_orderbooks

<a id="coinmetrics.api_client.CoinMetricsClient.get_stream_market_orderbooks"></a>

```python
coinmetrics.api_client.CoinMetricsClient.get_stream_market_orderbooks(
    markets,
    backfill=Backfill.LATEST,
    depth_limit=None,
)
```

Returns timeseries stream of market orderbooks.

* **Parameters:**
  * **markets** ([*list*](https://docs.python.org/3/library/stdtypes.html#list) *(*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *)* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- list of markets or market patterns like `exchange-*` or `exchange-*-spot` or `*USDT-future`.
  * **backfill** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- What data should be sent upon a connection ("latest" or "none"). By default the latest values are sent just before real-time data.
  * **depth_limit** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Default: 100. Supported Values: 100 "full_book". Book depth limit.

**Returns:**

* [CmStream](../../cm-stream/README.md#coinmetrics.api_client.CmStream)
  * Market Orderbooks timeseries stream.
