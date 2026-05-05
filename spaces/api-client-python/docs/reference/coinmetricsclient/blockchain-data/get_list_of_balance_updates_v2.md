# CoinMetricsClient.get_list_of_balance_updates_v2

<a id="coinmetrics.api_client.CoinMetricsClient.get_list_of_balance_updates_v2"></a>

`coinmetrics.api_client.CoinMetricsClient.get_list_of_balance_updates_v2(asset, accounts=None, sub_accounts=None, limit_per_account=None, txids=None, block_hashes=None, page_size=None, paging_from='start', start_time=None, end_time=None, start_height=None, end_height=None, start_chain_sequence_number=None, end_chain_sequence_number=None, include_sub_accounts=None, chain=None, start_inclusive=None, end_inclusive=None, timezone=None, ignore_unsupported_errors=False)`

Returns a list of blockchain accounts balance updates.

* **Parameters:**
  * **asset** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Asset name
  * **accounts** ([*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* [*list*](https://docs.python.org/3/library/stdtypes.html#list) *(*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *)*) -- Optional comma separated list of accounts to filter a response.
  * **sub_accounts** ([*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* [*list*](https://docs.python.org/3/library/stdtypes.html#list) *(*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *)*) -- Optional comma separated list of sub-accounts to filter a response. This parameter is disabled for Community users.
  * **limit_per_account** ([*int*](https://docs.python.org/3/library/functions.html#int)) -- How many entries per account the result should contain. It is applicable when multiple accounts are requested.
  * **txids** ([*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* [*list*](https://docs.python.org/3/library/stdtypes.html#list) *(*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *)*) -- Optional comma separated list of transaction ids to filter a response.
  * **block_hashes** ([*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* [*list*](https://docs.python.org/3/library/stdtypes.html#list) *(*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *)*) -- Optional comma separated list of block hashes to filter a response.
  * **page_size** ([*int*](https://docs.python.org/3/library/functions.html#int)) -- number of items returned per page when calling the API. If the request times out, try using a smaller number.
  * **paging_from** (*PagingFrom* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Defines where you want to start receiving items from, 'start' or 'end' of the timeseries.
  * **start_time** (*datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Start time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **end_time** (*datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- End time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **start_height** ([*int*](https://docs.python.org/3/library/functions.html#int)) -- The start height indicates the beginning block height for the set of data that are returned. Mutually exclusive with start_time
  * **end_height** ([*int*](https://docs.python.org/3/library/functions.html#int)) -- The end height indicates the beginning block height for the set of data that are returned. Mutually exclusive with end_time
  * **start_chain_sequence_number** ([*int*](https://docs.python.org/3/library/functions.html#int)) -- The start height indicates the beginning block height for the set of data that are returned. Mutually exclusive with start_time
  * **end_chain_sequence_number** ([*int*](https://docs.python.org/3/library/functions.html#int)) -- The end height indicates the beginning block height for the set of data that are returned. Mutually exclusive with end_time
  * **include_sub_accounts** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- bool indicating if the response should contain sub-accounts.
  * **chain** ([*str*](https://docs.python.org/3/library/stdtypes.html#str) *|* *None*) -- Chain type. Supported values are main and all (includes both main and stale).
  * **start_inclusive** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if start timestamp must be included in the timeseries if present. True by default.
  * **end_inclusive** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if end timestamp must be included in the timeseries if present. True by default.
  * **timezone** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- timezone of the start/end times in db format for example: "America/Chicago". Default value is "UTC". For more details check out API documentation page.
  * **ignore_unsupported_errors** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Default: false. Ignore "unsupported" errors for not currently supported by Coin Metrics items.
* **Type:**
  [str](https://docs.python.org/3/library/stdtypes.html#str)

**Returns:**

* [DataCollection](../../data-collection/README.md#coinmetrics._data_collection.DataCollection)
  * list of balance updates
