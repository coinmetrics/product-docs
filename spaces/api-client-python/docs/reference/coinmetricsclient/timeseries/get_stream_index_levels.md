# `CoinMetricsClient.get_stream_index_levels`

```python
coinmetrics.api_client.CoinMetricsClient.get_stream_index_levels(
    indexes,
    include_verification=None,
    backfill=Backfill.LATEST,
)
```

Returns timeseries stream of index levels.

* **Parameters:**
  * **indexes** ([*list*](https://docs.python.org/3/library/stdtypes.html#list) *(*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *)* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- list of indxes or market patterns such as CMBIBTC
  * **backfill** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- What data should be sent upon a connection ("latest" or "none"). By default the latest values are sent just before real-time data.
  * **include_verification** ([*bool*](https://docs.python.org/3/library/functions.html#bool) *|* *None*) -- Default: False If set to true, includes information about verification.
* **Returns:**
  Index levels data timeseries stream.
* **Return type:**
  [CmStream](../../cm-stream/README.md#coinmetrics.api_client.CmStream)
