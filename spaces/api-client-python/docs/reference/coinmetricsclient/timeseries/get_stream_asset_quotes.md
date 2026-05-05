# CoinMetricsClient.get_stream_asset_quotes

<a id="coinmetrics.api_client.CoinMetricsClient.get_stream_asset_quotes"></a>

## `method CoinMetricsClient.get_stream_asset_quotes`

```python
coinmetrics.api_client.CoinMetricsClient.get_stream_asset_quotes(
    assets,
    aggregation_method=None,
    backfill=None,
)
```

Returns a websocket stream of asset quotes for the requested assets.

* **Parameters:**
  * **assets** (*Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]*) -- Comma separated list of assets. Use the /catalog-all/assets endpoint for the full list of supported assets.
  * **aggregation_method** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- The method to use for aggregation.
  * **backfill** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- What data should be sent upon a connection. By default the latest values are sent just before real-time data.
* **Returns:**
* **Return type:**
  [CmStream](../../cm-stream/README.md#coinmetrics.api_client.CmStream)
