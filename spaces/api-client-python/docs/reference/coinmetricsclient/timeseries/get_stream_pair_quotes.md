# <code>CoinMetricsClient.get_stream_pair_quotes</code>

*method*

```python
coinmetrics.api_client.CoinMetricsClient.get_stream_pair_quotes(
    pairs,
    aggregation_method=None,
    backfill=None,
)
```

Returns a websocket stream of pair quotes for the requested asset pairs.

* **Parameters:**
  * **pairs** (*Optional* *[**Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]* *]*) -- Comma separated list of asset pairs. Use the /catalog-all/pairs endpoint for the full list of supported asset pairs.
  * **aggregation_method** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- The method to use for aggregation.
  * **backfill** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- What data should be sent upon a connection. By default the latest values are sent just before real-time data.
* **Returns:**
* **Return type:**
  [CmStream](../../cm-stream/README.md#coinmetrics.api_client.CmStream)
