# `CoinMetricsClient.get_stream_asset_metrics`

*method*

```python
coinmetrics.api_client.CoinMetricsClient.get_stream_asset_metrics(
    assets,
    metrics,
    frequency=None,
    backfill=Backfill.LATEST,
    ignore_forbidden_errors=None,
    ignore_unsupported_errors=None,
)
```

Returns timeseries stream of metrics for specified assets.

* **Parameters:**
  * **assets** ([*list*](https://docs.python.org/3/library/stdtypes.html#list) *(*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *)* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- list of asset names, e.g. 'btc'
  * **metrics** ([*list*](https://docs.python.org/3/library/stdtypes.html#list) *(*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *)* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- list of *asset-specific* metric names, e.g. 'PriceUSD'
  * **frequency** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- frequency of the returned timeseries, e.g 15s, 1d, etc.
  * **backfill** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- What data should be sent upon a connection ("latest" or "none"). By default the latest values are sent just before real-time data.
  * **ignore_forbidden_errors** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Default: false. Ignore HTTP 403 Forbidden errors
  * **ignore_unsupported_errors** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Default: false. Ignore errors for unsupported assets, metrics or frequencies.
* **Returns:**
  Asset Metrics timeseries stream.
* **Return type:**
  [CmStream](../../cm-stream/README.md#coinmetrics.api_client.CmStream)
