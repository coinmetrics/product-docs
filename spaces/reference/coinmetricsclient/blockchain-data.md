# Blockchain Data

#### `CoinMetricsClient.get_full_block_v2(asset, block_hash, include_sub_accounts, ignore_unsupported_errors=False)`

Returns a full blockchain block with all transactions and balance updates.

* **Parameters:**
  * **asset** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Asset name
  * **block\_hash** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- block hash
  * **include\_sub\_accounts** ([_bool_](https://docs.python.org/3/library/functions.html#bool)) -- Boolean indicating if the response should contain sub-accounts
  * **ignore\_unsupported\_errors** ([_bool_](https://docs.python.org/3/library/functions.html#bool)) -- Default: false. Ignore "unsupported" errors for not currently supported by Coin Metrics items.
* **Returns:** blockchain block data
* **Return type:** [list](https://docs.python.org/3/library/stdtypes.html#list)([dict](https://docs.python.org/3/library/stdtypes.html#dict)([str](https://docs.python.org/3/library/stdtypes.html#str)), any)

#### `CoinMetricsClient.get_full_transaction_for_block_v2(asset, block_hash, txid, include_sub_accounts, ignore_unsupported_errors=False)`

Returns a full blockchain transaction with all balance updates for a specific block.

* **Parameters:**
  * **asset** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Asset name
  * **block\_hash** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- block hash
  * **txid** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- transaction identifier
  * **include\_sub\_accounts** ([_bool_](https://docs.python.org/3/library/functions.html#bool)) -- Boolean indicating if the response should contain sub-accounts
  * **ignore\_unsupported\_errors** ([_bool_](https://docs.python.org/3/library/functions.html#bool)) -- Default: false. Ignore "unsupported" errors for not currently supported by Coin Metrics items.
* **Returns:** block transaction data with balance updates
* **Return type:** [list](https://docs.python.org/3/library/stdtypes.html#list)([dict](https://docs.python.org/3/library/stdtypes.html#dict)([str](https://docs.python.org/3/library/stdtypes.html#str), Any))

#### `CoinMetricsClient.get_full_transaction_v2(asset, txid, include_sub_accounts, ignore_unsupported_errors=False)`

Returns a full blockchain transaction with all balance updates.

* **Parameters:**
  * **asset** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Asset name
  * **txid** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- transaction identifier
  * **include\_sub\_accounts** ([_bool_](https://docs.python.org/3/library/functions.html#bool)) -- Boolean indicating if the response should contain sub-accounts
  * **ignore\_unsupported\_errors** ([_bool_](https://docs.python.org/3/library/functions.html#bool)) -- Default: false. Ignore "unsupported" errors for not currently supported by Coin Metrics items.
* **Returns:** block transaction data
* **Return type:** [list](https://docs.python.org/3/library/stdtypes.html#list)([dict](https://docs.python.org/3/library/stdtypes.html#dict)([str](https://docs.python.org/3/library/stdtypes.html#str)), any)

#### `CoinMetricsClient.get_list_of_accounts_v2(asset, accounts=None, page_size=None, paging_from='start', start_time=None, end_time=None, start_height=None, end_height=None, start_chain_sequence_number=None, end_chain_sequence_number=None, start_inclusive=None, end_inclusive=None, timezone=None, ignore_unsupported_errors=False)`

Returns a list of blockchain accounts with their balances.

* **Parameters:**
  * **asset** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Asset name
  * **accounts** ([_str_](https://docs.python.org/3/library/stdtypes.html#str) _,_ [_list_](https://docs.python.org/3/library/stdtypes.html#list) _(_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _)_) -- Optional comma separated list of accounts to filter a response.
  * **page\_size** ([_int_](https://docs.python.org/3/library/functions.html#int)) -- number of items returned per page when calling the API. If the request times out, try using a smaller number.
  * **paging\_from** (_PagingFrom_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Defines where you want to start receiving items from, 'start' or 'end' of the timeseries.
  * **start\_time** (_datetime_ _,_ _date_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Start time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **end\_time** (_datetime_ _,_ _date_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- End time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **start\_height** ([_int_](https://docs.python.org/3/library/functions.html#int)) -- The start height indicates the beginning block height for the set of data that are returned. Mutually exclusive with start\_time
  * **end\_height** ([_int_](https://docs.python.org/3/library/functions.html#int)) -- The end height indicates the beginning block height for the set of data that are returned. Mutually exclusive with end\_time
  * **start\_chain\_sequence\_number** ([_int_](https://docs.python.org/3/library/functions.html#int)) -- The start height indicates the beginning block height for the set of data that are returned. Mutually exclusive with start\_time
  * **end\_chain\_sequence\_number** ([_int_](https://docs.python.org/3/library/functions.html#int)) -- The end height indicates the beginning block height for the set of data that are returned. Mutually exclusive with end\_time
  * **start\_inclusive** ([_bool_](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if start timestamp must be included in the timeseries if present. True by default.
  * **end\_inclusive** ([_bool_](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if end timestamp must be included in the timeseries if present. True by default.
  * **timezone** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- timezone of the start/end times in db format for example: "America/Chicago". Default value is "UTC". For more details check out API documentation page.
  * **ignore\_unsupported\_errors** ([_bool_](https://docs.python.org/3/library/functions.html#bool)) -- Default: false. Ignore "unsupported" errors for not currently supported by Coin Metrics items.
* **Returns:** list of blockchain accounts metadata
* **Return type:** [DataCollection](../../api-client-python/docs/reference/data-collection.md#coinmetrics._data_collection.DataCollection)

#### `CoinMetricsClient.get_list_of_balance_updates_for_account_v2(asset, account, txids=None, block_hashes=None, include_counterparties=None, start_time=None, end_time=None, start_height=None, end_height=None, start_chain_sequence_number=None, end_chain_sequence_number=None, include_sub_accounts=None, chain=None, start_inclusive=None, end_inclusive=None, timezone=None, page_size=None, paging_from=None, next_page_token=None, ignore_unsupported_errors=False)`

Returns balance update history for a single blockchain account on the specified asset, ordered by `(asset, account, block_height, transaction_hash, internal_tx_id)`.

* **Parameters:**
  * **asset** (_Optional_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_) -- Asset name.
  * **account** (_Optional_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_) -- Account id.
  * **txids** (_Union_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _,_ _List_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_ _]_) -- Optional comma separated list of transaction identifiers (txid) to filter a response. The list must contain a single element for Community users.
  * **block\_hashes** (_Union_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _,_ _List_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_ _]_) -- Optional comma separated list of block hashes to filter a response. The list must contain a single element for Community users.
  * **include\_counterparties** ([_bool_](https://docs.python.org/3/library/functions.html#bool)) -- Include information about the counterparties balance updates.
  * **start\_time** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Start of the time interval. This field refers to the time field in the response. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120Z, 2006-01-20, 20060120. Inclusive by default. Mutually exclusive with start\_height. UTC timezone by default. Z suffix is optional and timezone parameter has a priority over it. If start\_time is omitted, response will include time series from the **earliest** time available. This parameter is disabled for Community users.
  * **end\_time** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- End of the time interval. This field refers to the time field in the response. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120Z, 2006-01-20, 20060120. Inclusive by default. Mutually exclusive with end\_height. UTC timezone by default. Z suffix is optional and timezone parameter has a priority over it. If end\_time is omitted, response will include time series up to the **latest** time available. This parameter is disabled for Community users.
  * **start\_height** ([_int_](https://docs.python.org/3/library/functions.html#int)) -- The start height indicates the beginning block height for the set of data that are returned. Inclusive by default. Mutually exclusive with start\_time. This parameter is disabled for Community users.
  * **end\_height** ([_int_](https://docs.python.org/3/library/functions.html#int)) -- The end height indicates the ending block height for the set of data that are returned. Inclusive by default. Mutually exclusive with end\_time. This parameter is disabled for Community users.
  * **start\_chain\_sequence\_number** ([_int_](https://docs.python.org/3/library/functions.html#int)) -- Start of the chain\_sequence\_number interval. This parameter is disabled for Community users.
  * **end\_chain\_sequence\_number** ([_int_](https://docs.python.org/3/library/functions.html#int)) -- End of the chain\_sequence\_number interval. This parameter is disabled for Community users.
  * **include\_sub\_accounts** ([_bool_](https://docs.python.org/3/library/functions.html#bool)) -- Boolean indicating if the response should contain sub-accounts. This parameter is disabled for Community users.
  * **chain** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Chain type. Supported values are main and all (includes both main and stale). This parameter is disabled for Community users.
  * **start\_inclusive** ([_bool_](https://docs.python.org/3/library/functions.html#bool)) -- Inclusive or exclusive corresponding start\_\* parameters. This parameter is disabled for Community users.
  * **end\_inclusive** ([_bool_](https://docs.python.org/3/library/functions.html#bool)) -- Inclusive or exclusive corresponding end\_\* parameters. This parameter is disabled for Community users.
  * **timezone** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Timezone name for start\_time and end\_time timestamps. This parameter does not modify the output times, which are always UTC. Format is defined by TZ database.
  * **page\_size** ([_int_](https://docs.python.org/3/library/functions.html#int)) -- Number of items per single page of results. This parameter is disabled for Community users.
  * **paging\_from** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Where does the first page start, at the start of the interval or at the end.
  * **next\_page\_token** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use next\_page\_url response field.
  * **ignore\_unsupported\_errors** ([_bool_](https://docs.python.org/3/library/functions.html#bool)) -- Default: false. Ignore "unsupported" errors for not currently supported by Coin Metrics items.
* **Returns:** Blockchain balance updates for account.
* **Return type:** [DataCollection](../../api-client-python/docs/reference/data-collection.md#coinmetrics._data_collection.DataCollection)

#### `CoinMetricsClient.get_list_of_balance_updates_v2(asset, accounts=None, sub_accounts=None, limit_per_account=None, txids=None, block_hashes=None, page_size=None, paging_from='start', start_time=None, end_time=None, start_height=None, end_height=None, start_chain_sequence_number=None, end_chain_sequence_number=None, include_sub_accounts=None, chain=None, start_inclusive=None, end_inclusive=None, timezone=None, ignore_unsupported_errors=False)`

Returns a list of blockchain accounts balance updates.

* **Parameters:**
  * **asset** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Asset name
  * **accounts** ([_str_](https://docs.python.org/3/library/stdtypes.html#str) _,_ [_list_](https://docs.python.org/3/library/stdtypes.html#list) _(_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _)_) -- Optional comma separated list of accounts to filter a response.
  * **sub\_accounts** ([_str_](https://docs.python.org/3/library/stdtypes.html#str) _,_ [_list_](https://docs.python.org/3/library/stdtypes.html#list) _(_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _)_) -- Optional comma separated list of sub-accounts to filter a response. This parameter is disabled for Community users.
  * **limit\_per\_account** ([_int_](https://docs.python.org/3/library/functions.html#int)) -- How many entries per account the result should contain. It is applicable when multiple accounts are requested.
  * **txids** ([_str_](https://docs.python.org/3/library/stdtypes.html#str) _,_ [_list_](https://docs.python.org/3/library/stdtypes.html#list) _(_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _)_) -- Optional comma separated list of transaction ids to filter a response.
  * **block\_hashes** ([_str_](https://docs.python.org/3/library/stdtypes.html#str) _,_ [_list_](https://docs.python.org/3/library/stdtypes.html#list) _(_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _)_) -- Optional comma separated list of block hashes to filter a response.
  * **page\_size** ([_int_](https://docs.python.org/3/library/functions.html#int)) -- number of items returned per page when calling the API. If the request times out, try using a smaller number.
  * **paging\_from** (_PagingFrom_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Defines where you want to start receiving items from, 'start' or 'end' of the timeseries.
  * **start\_time** (_datetime_ _,_ _date_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Start time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **end\_time** (_datetime_ _,_ _date_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- End time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **start\_height** ([_int_](https://docs.python.org/3/library/functions.html#int)) -- The start height indicates the beginning block height for the set of data that are returned. Mutually exclusive with start\_time
  * **end\_height** ([_int_](https://docs.python.org/3/library/functions.html#int)) -- The end height indicates the beginning block height for the set of data that are returned. Mutually exclusive with end\_time
  * **start\_chain\_sequence\_number** ([_int_](https://docs.python.org/3/library/functions.html#int)) -- The start height indicates the beginning block height for the set of data that are returned. Mutually exclusive with start\_time
  * **end\_chain\_sequence\_number** ([_int_](https://docs.python.org/3/library/functions.html#int)) -- The end height indicates the beginning block height for the set of data that are returned. Mutually exclusive with end\_time
  * **include\_sub\_accounts** ([_bool_](https://docs.python.org/3/library/functions.html#bool)) -- bool indicating if the response should contain sub-accounts.
  * **chain** ([_str_](https://docs.python.org/3/library/stdtypes.html#str) _|_ _None_) -- Chain type. Supported values are main and all (includes both main and stale).
  * **start\_inclusive** ([_bool_](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if start timestamp must be included in the timeseries if present. True by default.
  * **end\_inclusive** ([_bool_](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if end timestamp must be included in the timeseries if present. True by default.
  * **timezone** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- timezone of the start/end times in db format for example: "America/Chicago". Default value is "UTC". For more details check out API documentation page.
  * **ignore\_unsupported\_errors** ([_bool_](https://docs.python.org/3/library/functions.html#bool)) -- Default: false. Ignore "unsupported" errors for not currently supported by Coin Metrics items.
* **Type:** [str](https://docs.python.org/3/library/stdtypes.html#str)
* **Returns:** list of balance updates
* **Return type:** [DataCollection](../../api-client-python/docs/reference/data-collection.md#coinmetrics._data_collection.DataCollection)

#### `CoinMetricsClient.get_list_of_blocks_v2(asset, block_hashes=None, heights=None, page_size=None, paging_from='start', start_time=None, end_time=None, start_height=None, end_height=None, chain=None, start_inclusive=None, end_inclusive=None, timezone=None, ignore_unsupported_errors=False)`

Returns a list of blockchain blocks metadata.

* **Parameters:**
  * **asset** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Asset name
  * **block\_hashes** ([_str_](https://docs.python.org/3/library/stdtypes.html#str) _,_ [_list_](https://docs.python.org/3/library/stdtypes.html#list) _(_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _)_) -- Optional comma separated list of block hashes to filter a response.
  * **heights** ([_str_](https://docs.python.org/3/library/stdtypes.html#str) _,_ [_list_](https://docs.python.org/3/library/stdtypes.html#list) _(_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _)_) -- Optional comma separated list of block heights to filter a response.
  * **page\_size** ([_int_](https://docs.python.org/3/library/functions.html#int)) -- number of items returned per page when calling the API. If the request times out, try using a smaller number.
  * **paging\_from** (_PagingFrom_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Defines where you want to start receiving items from, 'start' or 'end' of the timeseries.
  * **start\_time** (_datetime_ _,_ _date_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Start time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **end\_time** (_datetime_ _,_ _date_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- End time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **start\_height** ([_int_](https://docs.python.org/3/library/functions.html#int)) -- The start height indicates the beginning block height for the set of data that are returned. Mutually exclusive with start\_time
  * **end\_height** ([_int_](https://docs.python.org/3/library/functions.html#int)) -- The end height indicates the beginning block height for the set of data that are returned. Mutually exclusive with end\_time
  * **chain** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Default: "main" Chain type. Supported values are main and all (includes both main and stale).
  * **start\_inclusive** ([_bool_](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if start timestamp must be included in the timeseries if present. True by default.
  * **end\_inclusive** ([_bool_](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if end timestamp must be included in the timeseries if present. True by default.
  * **timezone** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- timezone of the start/end times in db format for example: "America/Chicago". Default value is "UTC". For more details check out API documentation page.
  * **ignore\_unsupported\_errors** ([_bool_](https://docs.python.org/3/library/functions.html#bool)) -- Default: false. Ignore "unsupported" errors for not currently supported by Coin Metrics items.
* **Returns:** list of blockchain blocks metadata
* **Return type:** [DataCollection](../../api-client-python/docs/reference/data-collection.md#coinmetrics._data_collection.DataCollection)

#### `CoinMetricsClient.get_list_of_rebasing_changes_v2(asset, txids=None, block_hashes=None, page_size=None, paging_from='start', start_time=None, end_time=None, start_height=None, end_height=None, start_chain_sequence_number=None, end_chain_sequence_number=None, chain=None, start_inclusive=None, end_inclusive=None, timezone=None, ignore_unsupported_errors=False)`

Returns a list of blockchain rebasing changes.

* **Parameters:**
  * **asset** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Asset name
  * **txids** ([_str_](https://docs.python.org/3/library/stdtypes.html#str) _,_ [_list_](https://docs.python.org/3/library/stdtypes.html#list) _(_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _)_) -- Optional comma separated list of transaction identifiers (txid) to filter a response.
  * **block\_hashes** ([_str_](https://docs.python.org/3/library/stdtypes.html#str) _,_ [_list_](https://docs.python.org/3/library/stdtypes.html#list) _(_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _)_) -- Optional comma separated list of block hashes to filter a response.
  * **page\_size** ([_int_](https://docs.python.org/3/library/functions.html#int)) -- number of items returned per page when calling the API. If the request times out, try using a smaller number.
  * **paging\_from** (_PagingFrom_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Defines where you want to start receiving items from, 'start' or 'end' of the timeseries.
  * **start\_time** (_datetime_ _,_ _date_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Start time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **end\_time** (_datetime_ _,_ _date_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- End time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **start\_height** ([_int_](https://docs.python.org/3/library/functions.html#int)) -- The start height indicates the beginning block height for the set of data that are returned. Mutually exclusive with start\_time
  * **end\_height** ([_int_](https://docs.python.org/3/library/functions.html#int)) -- The end height indicates the beginning block height for the set of data that are returned. Mutually exclusive with end\_time
  * **start\_chain\_sequence\_number** ([_int_](https://docs.python.org/3/library/functions.html#int)) -- The start chain sequence number for the set of data that are returned. Mutually exclusive with start\_time
  * **end\_chain\_sequence\_number** ([_int_](https://docs.python.org/3/library/functions.html#int)) -- The end chain sequence number for the set of data that are returned. Mutually exclusive with end\_time
  * **chain** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Default: "main". Chain type. Supported values are main and all (includes both main and stale).
  * **start\_inclusive** ([_bool_](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if start timestamp must be included in the timeseries if present. True by default.
  * **end\_inclusive** ([_bool_](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if end timestamp must be included in the timeseries if present. True by default.
  * **timezone** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- timezone of the start/end times in db format for example: "America/Chicago". Default value is "UTC". For more details check out API documentation page.
  * **ignore\_unsupported\_errors** ([_bool_](https://docs.python.org/3/library/functions.html#bool)) -- Default: false. Ignore "unsupported" errors for not currently supported by Coin Metrics items.
* **Returns:** list of rebasing changes
* **Return type:** [DataCollection](../../api-client-python/docs/reference/data-collection.md#coinmetrics._data_collection.DataCollection)

#### `CoinMetricsClient.get_list_of_sub_accounts_v2(asset, accounts=None, page_size=None, paging_from='start', start_time=None, end_time=None, start_height=None, end_height=None, start_chain_sequence_number=None, end_chain_sequence_number=None, start_inclusive=None, end_inclusive=None, timezone=None, ignore_unsupported_errors=False)`

Returns a list of blockchain sub-accounts with their balances.

* **Parameters:**
  * **asset** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Asset name
  * **accounts** ([_str_](https://docs.python.org/3/library/stdtypes.html#str) _,_ [_list_](https://docs.python.org/3/library/stdtypes.html#list) _(_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _)_) -- Optional comma separated list of accounts to filter a response.
  * **page\_size** ([_int_](https://docs.python.org/3/library/functions.html#int)) -- number of items returned per page when calling the API. If the request times out, try using a smaller number.
  * **paging\_from** (_PagingFrom_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Defines where you want to start receiving items from, 'start' or 'end' of the timeseries.
  * **start\_time** (_datetime_ _,_ _date_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Start time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **end\_time** (_datetime_ _,_ _date_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- End time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **start\_height** ([_int_](https://docs.python.org/3/library/functions.html#int)) -- The start height indicates the beginning block height for the set of data that are returned. Mutually exclusive with start\_time
  * **end\_height** ([_int_](https://docs.python.org/3/library/functions.html#int)) -- The end height indicates the beginning block height for the set of data that are returned. Mutually exclusive with end\_time
  * **start\_chain\_sequence\_number** ([_int_](https://docs.python.org/3/library/functions.html#int)) -- The start height indicates the beginning block height for the set of data that are returned. Mutually exclusive with start\_time
  * **end\_chain\_sequence\_number** ([_int_](https://docs.python.org/3/library/functions.html#int)) -- The end height indicates the beginning block height for the set of data that are returned. Mutually exclusive with end\_time
  * **start\_inclusive** ([_bool_](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if start timestamp must be included in the timeseries if present. True by default.
  * **end\_inclusive** ([_bool_](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if end timestamp must be included in the timeseries if present. True by default.
  * **timezone** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- timezone of the start/end times in db format for example: "America/Chicago". Default value is "UTC". For more details check out API documentation page.
  * **ignore\_unsupported\_errors** ([_bool_](https://docs.python.org/3/library/functions.html#bool)) -- Default: false. Ignore "unsupported" errors for not currently supported by Coin Metrics items.
* **Returns:** list of blockchain accounts metadata
* **Return type:** [DataCollection](../../api-client-python/docs/reference/data-collection.md#coinmetrics._data_collection.DataCollection)

#### `CoinMetricsClient.get_list_of_transactions_v2(asset, txids=None, block_hashes=None, page_size=None, paging_from='start', start_time=None, end_time=None, start_height=None, end_height=None, chain=None, start_inclusive=None, end_inclusive=None, timezone=None, ignore_unsupported_errors=False)`

Returns a list of blockchain transactions metadata.

* **Parameters:**
  * **asset** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Asset name
  * **txids** ([_str_](https://docs.python.org/3/library/stdtypes.html#str) _,_ [_list_](https://docs.python.org/3/library/stdtypes.html#list) _(_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _)_) -- Optional comma separated list of transaction identifiers (txid) to filter a response.
  * **block\_hashes** ([_str_](https://docs.python.org/3/library/stdtypes.html#str) _,_ [_list_](https://docs.python.org/3/library/stdtypes.html#list) _(_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _)_) -- Optional comma separated list of block hashes to filter a response.
  * **page\_size** ([_int_](https://docs.python.org/3/library/functions.html#int)) -- number of items returned per page when calling the API. If the request times out, try using a smaller number.
  * **paging\_from** (_PagingFrom_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Defines where you want to start receiving items from, 'start' or 'end' of the timeseries.
  * **start\_time** (_datetime_ _,_ _date_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Start time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **end\_time** (_datetime_ _,_ _date_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- End time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **start\_height** ([_int_](https://docs.python.org/3/library/functions.html#int)) -- The start height indicates the beginning block height for the set of data that are returned. Mutually exclusive with start\_time
  * **end\_height** ([_int_](https://docs.python.org/3/library/functions.html#int)) -- The end height indicates the beginning block height for the set of data that are returned. Mutually exclusive with end\_time
  * **chain** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Default: "main". Chain type. Supported values are main and all (includes both main and stale).
  * **start\_inclusive** ([_bool_](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if start timestamp must be included in the timeseries if present. True by default.
  * **end\_inclusive** ([_bool_](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if end timestamp must be included in the timeseries if present. True by default.
  * **timezone** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- timezone of the start/end times in db format for example: "America/Chicago". Default value is "UTC". For more details check out API documentation page.
  * **ignore\_unsupported\_errors** ([_bool_](https://docs.python.org/3/library/functions.html#bool)) -- Default: false. Ignore "unsupported" errors for not currently supported by Coin Metrics items.
* **Returns:** list of transaction metadata
* **Return type:** [DataCollection](../../api-client-python/docs/reference/data-collection.md#coinmetrics._data_collection.DataCollection)

#### `CoinMetricsClient.get_transaction_tracker(asset, addresses=None, txids=None, replacements_for_txids=None, replacements_only=None, page_size=None, paging_from='start', start_time=None, end_time=None, start_inclusive=None, end_inclusive=None, timezone=None, unconfirmed_only=None, format=None)`

Returns status updates for the specified or all transactions.

* **Parameters:**
  * **asset** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Asset name
  * **txids** ([_str_](https://docs.python.org/3/library/stdtypes.html#str) _,_ [_list_](https://docs.python.org/3/library/stdtypes.html#list) _(_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _)_) -- Optional comma separated list of transaction identifiers (txid) to track.
  * **replacements\_for\_txids** ([_str_](https://docs.python.org/3/library/stdtypes.html#str) _,_ [_list_](https://docs.python.org/3/library/stdtypes.html#list) _(_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _)_) -- Optional comma separated list of transaction identifiers (txid) to get the corresponding replacement transactions for. Mutually exclusive with txids.
  * **replacements\_only** ([_bool_](https://docs.python.org/3/library/functions.html#bool)) -- Boolean indicating if the response should contain only the replacement transactions.
  * **page\_size** ([_int_](https://docs.python.org/3/library/functions.html#int)) -- number of items returned per page when calling the API. If the request times out, try using a smaller number.
  * **paging\_from** (_PagingFrom_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Defines where you want to start receiving items from, 'start' or 'end' of the timeseries.
  * **start\_time** (_datetime_ _,_ _date_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Start time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **end\_time** (_datetime_ _,_ _date_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- End time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **start\_inclusive** ([_bool_](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if start timestamp must be included in the timeseries if present. True by default.
  * **end\_inclusive** ([_bool_](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if end timestamp must be included in the timeseries if present. True by default.
  * **timezone** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- timezone of the start/end times in db format for example: "America/Chicago". Default value is "UTC". For more details check out API documentation page.
  * **format** ([_str_](https://docs.python.org/3/library/stdtypes.html#str)) -- Format of the response. Supported values are json, csv. Default is json.
  * **addresses** ([_List_](https://docs.python.org/3/library/typing.html#typing.List) _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_ _|_ [_str_](https://docs.python.org/3/library/stdtypes.html#str) _|_ _None_)
  * **unconfirmed\_only** ([_bool_](https://docs.python.org/3/library/functions.html#bool) _|_ _None_)
* **Returns:** status updates for the specified or all transactions.
* **Return type:** [DataCollection](../../api-client-python/docs/reference/data-collection.md#coinmetrics._data_collection.DataCollection)
