# Blockchain Data

| [`CoinMetricsClient.get_full_block_v2`](#coinmetrics.api_client.CoinMetricsClient.get_full_block_v2)                                                   | Returns a full blockchain block with all transactions and balance updates.                                                                                            |
|--------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [`CoinMetricsClient.get_full_transaction_for_block_v2`](#coinmetrics.api_client.CoinMetricsClient.get_full_transaction_for_block_v2)                   | Returns a full blockchain transaction with all balance updates for a specific block.                                                                                  |
| [`CoinMetricsClient.get_full_transaction_v2`](#coinmetrics.api_client.CoinMetricsClient.get_full_transaction_v2)                                       | Returns a full blockchain transaction with all balance updates.                                                                                                       |
| [`CoinMetricsClient.get_list_of_accounts_v2`](#coinmetrics.api_client.CoinMetricsClient.get_list_of_accounts_v2)                                       | Returns a list of blockchain accounts with their balances.                                                                                                            |
| [`CoinMetricsClient.get_list_of_balance_updates_for_account_v2`](#coinmetrics.api_client.CoinMetricsClient.get_list_of_balance_updates_for_account_v2) | Returns balance update history for a single blockchain account on the specified asset, ordered by `(asset, account, block_height, transaction_hash, internal_tx_id)`. |
| [`CoinMetricsClient.get_list_of_balance_updates_v2`](#coinmetrics.api_client.CoinMetricsClient.get_list_of_balance_updates_v2)                         | Returns a list of blockchain accounts balance updates.                                                                                                                |
| [`CoinMetricsClient.get_list_of_blocks_v2`](#coinmetrics.api_client.CoinMetricsClient.get_list_of_blocks_v2)                                           | Returns a list of blockchain blocks metadata.                                                                                                                         |
| [`CoinMetricsClient.get_list_of_rebasing_changes_v2`](#coinmetrics.api_client.CoinMetricsClient.get_list_of_rebasing_changes_v2)                       | Returns a list of blockchain rebasing changes.                                                                                                                        |
| [`CoinMetricsClient.get_list_of_sub_accounts_v2`](#coinmetrics.api_client.CoinMetricsClient.get_list_of_sub_accounts_v2)                               | Returns a list of blockchain sub-accounts with their balances.                                                                                                        |
| [`CoinMetricsClient.get_list_of_transactions_v2`](#coinmetrics.api_client.CoinMetricsClient.get_list_of_transactions_v2)                               | Returns a list of blockchain transactions metadata.                                                                                                                   |
| [`CoinMetricsClient.get_transaction_tracker`](#coinmetrics.api_client.CoinMetricsClient.get_transaction_tracker)                                       | Returns status updates for the specified or all transactions.                                                                                                         |

#### CoinMetricsClient.get_full_block_v2(asset, block_hash, include_sub_accounts, ignore_unsupported_errors=False)

Returns a full blockchain block with all transactions and balance updates.

* **Parameters:**
  * **asset** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Asset name
  * **block_hash** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- block hash
  * **include_sub_accounts** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Boolean indicating if the response should contain sub-accounts
  * **ignore_unsupported_errors** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Default: false. Ignore "unsupported" errors for not currently supported by Coin Metrics items.
* **Returns:**
  blockchain block data
* **Return type:**
  [list](https://docs.python.org/3/library/stdtypes.html#list)([dict](https://docs.python.org/3/library/stdtypes.html#dict)([str](https://docs.python.org/3/library/stdtypes.html#str)), any)

#### CoinMetricsClient.get_full_transaction_for_block_v2(asset, block_hash, txid, include_sub_accounts, ignore_unsupported_errors=False)

Returns a full blockchain transaction with all balance updates for a specific block.

* **Parameters:**
  * **asset** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Asset name
  * **block_hash** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- block hash
  * **txid** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- transaction identifier
  * **include_sub_accounts** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Boolean indicating if the response should contain sub-accounts
  * **ignore_unsupported_errors** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Default: false. Ignore "unsupported" errors for not currently supported by Coin Metrics items.
* **Returns:**
  block transaction data with balance updates
* **Return type:**
  [list](https://docs.python.org/3/library/stdtypes.html#list)([dict](https://docs.python.org/3/library/stdtypes.html#dict)([str](https://docs.python.org/3/library/stdtypes.html#str), Any))

#### CoinMetricsClient.get_full_transaction_v2(asset, txid, include_sub_accounts, ignore_unsupported_errors=False)

Returns a full blockchain transaction with all balance updates.

* **Parameters:**
  * **asset** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Asset name
  * **txid** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- transaction identifier
  * **include_sub_accounts** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Boolean indicating if the response should contain sub-accounts
  * **ignore_unsupported_errors** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Default: false. Ignore "unsupported" errors for not currently supported by Coin Metrics items.
* **Returns:**
  block transaction data
* **Return type:**
  [list](https://docs.python.org/3/library/stdtypes.html#list)([dict](https://docs.python.org/3/library/stdtypes.html#dict)([str](https://docs.python.org/3/library/stdtypes.html#str)), any)

#### CoinMetricsClient.get_list_of_accounts_v2(asset, accounts=None, page_size=None, paging_from='start', start_time=None, end_time=None, start_height=None, end_height=None, start_chain_sequence_number=None, end_chain_sequence_number=None, start_inclusive=None, end_inclusive=None, timezone=None, ignore_unsupported_errors=False)

Returns a list of blockchain accounts with their balances.

* **Parameters:**
  * **asset** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Asset name
  * **accounts** ([*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* [*list*](https://docs.python.org/3/library/stdtypes.html#list) *(*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *)*) -- Optional comma separated list of accounts to filter a response.
  * **page_size** ([*int*](https://docs.python.org/3/library/functions.html#int)) -- number of items returned per page when calling the API. If the request times out, try using a smaller number.
  * **paging_from** (*PagingFrom* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Defines where you want to start receiving items from, 'start' or 'end' of the timeseries.
  * **start_time** (*datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Start time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **end_time** (*datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- End time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **start_height** ([*int*](https://docs.python.org/3/library/functions.html#int)) -- The start height indicates the beginning block height for the set of data that are returned. Mutually exclusive with start_time
  * **end_height** ([*int*](https://docs.python.org/3/library/functions.html#int)) -- The end height indicates the beginning block height for the set of data that are returned. Mutually exclusive with end_time
  * **start_chain_sequence_number** ([*int*](https://docs.python.org/3/library/functions.html#int)) -- The start height indicates the beginning block height for the set of data that are returned. Mutually exclusive with start_time
  * **end_chain_sequence_number** ([*int*](https://docs.python.org/3/library/functions.html#int)) -- The end height indicates the beginning block height for the set of data that are returned. Mutually exclusive with end_time
  * **start_inclusive** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if start timestamp must be included in the timeseries if present. True by default.
  * **end_inclusive** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if end timestamp must be included in the timeseries if present. True by default.
  * **timezone** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- timezone of the start/end times in db format for example: "America/Chicago". Default value is "UTC". For more details check out API documentation page.
  * **ignore_unsupported_errors** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Default: false. Ignore "unsupported" errors for not currently supported by Coin Metrics items.
* **Returns:**
  list of blockchain accounts metadata
* **Return type:**
  [DataCollection](../data-collection.md#coinmetrics._data_collection.DataCollection)

#### CoinMetricsClient.get_list_of_balance_updates_for_account_v2(asset, account, txids=None, block_hashes=None, include_counterparties=None, start_time=None, end_time=None, start_height=None, end_height=None, start_chain_sequence_number=None, end_chain_sequence_number=None, include_sub_accounts=None, chain=None, start_inclusive=None, end_inclusive=None, timezone=None, page_size=None, paging_from=None, next_page_token=None, ignore_unsupported_errors=False)

Returns balance update history for a single blockchain account on the specified asset, ordered by
`(asset, account, block_height, transaction_hash, internal_tx_id)`.

* **Parameters:**
  * **asset** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Asset name.
  * **account** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Account id.
  * **txids** (*Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]*) -- Optional comma separated list of transaction identifiers (txid) to filter a response. The list must contain a single element for Community users.
  * **block_hashes** (*Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]*) -- Optional comma separated list of block hashes to filter a response. The list must contain a single element for Community users.
  * **include_counterparties** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Include information about the counterparties balance updates.
  * **start_time** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Start of the time interval. This field refers to the time field in the response. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120Z, 2006-01-20, 20060120. Inclusive by default. Mutually exclusive with start_height. UTC timezone by default. Z suffix is optional and timezone parameter has a priority over it. If start_time is omitted, response will include time series from the **earliest** time available. This parameter is disabled for Community users.
  * **end_time** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- End of the time interval. This field refers to the time field in the response. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120Z, 2006-01-20, 20060120. Inclusive by default. Mutually exclusive with end_height. UTC timezone by default. Z suffix is optional and timezone parameter has a priority over it. If end_time is omitted, response will include time series up to the **latest** time available. This parameter is disabled for Community users.
  * **start_height** ([*int*](https://docs.python.org/3/library/functions.html#int)) -- The start height indicates the beginning block height for the set of data that are returned. Inclusive by default. Mutually exclusive with start_time. This parameter is disabled for Community users.
  * **end_height** ([*int*](https://docs.python.org/3/library/functions.html#int)) -- The end height indicates the ending block height for the set of data that are returned. Inclusive by default. Mutually exclusive with end_time. This parameter is disabled for Community users.
  * **start_chain_sequence_number** ([*int*](https://docs.python.org/3/library/functions.html#int)) -- Start of the chain_sequence_number interval. This parameter is disabled for Community users.
  * **end_chain_sequence_number** ([*int*](https://docs.python.org/3/library/functions.html#int)) -- End of the chain_sequence_number interval. This parameter is disabled for Community users.
  * **include_sub_accounts** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Boolean indicating if the response should contain sub-accounts. This parameter is disabled for Community users.
  * **chain** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Chain type. Supported values are main and all (includes both main and stale). This parameter is disabled for Community users.
  * **start_inclusive** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Inclusive or exclusive corresponding start_\* parameters. This parameter is disabled for Community users.
  * **end_inclusive** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Inclusive or exclusive corresponding end_\* parameters. This parameter is disabled for Community users.
  * **timezone** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Timezone name for start_time and end_time timestamps. This parameter does not modify the output times, which are always UTC. Format is defined by TZ database.
  * **page_size** ([*int*](https://docs.python.org/3/library/functions.html#int)) -- Number of items per single page of results. This parameter is disabled for Community users.
  * **paging_from** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Where does the first page start, at the start of the interval or at the end.
  * **next_page_token** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use next_page_url response field.
  * **ignore_unsupported_errors** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Default: false. Ignore "unsupported" errors for not currently supported by Coin Metrics items.
* **Returns:**
  Blockchain balance updates for account.
* **Return type:**
  [DataCollection](../data-collection.md#coinmetrics._data_collection.DataCollection)

#### CoinMetricsClient.get_list_of_balance_updates_v2(asset, accounts=None, sub_accounts=None, limit_per_account=None, txids=None, block_hashes=None, page_size=None, paging_from='start', start_time=None, end_time=None, start_height=None, end_height=None, start_chain_sequence_number=None, end_chain_sequence_number=None, include_sub_accounts=None, chain=None, start_inclusive=None, end_inclusive=None, timezone=None, ignore_unsupported_errors=False)

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
* **Returns:**
  list of balance updates
* **Return type:**
  [DataCollection](../data-collection.md#coinmetrics._data_collection.DataCollection)

#### CoinMetricsClient.get_list_of_blocks_v2(asset, block_hashes=None, heights=None, page_size=None, paging_from='start', start_time=None, end_time=None, start_height=None, end_height=None, chain=None, start_inclusive=None, end_inclusive=None, timezone=None, ignore_unsupported_errors=False)

Returns a list of blockchain blocks metadata.

* **Parameters:**
  * **asset** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Asset name
  * **block_hashes** ([*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* [*list*](https://docs.python.org/3/library/stdtypes.html#list) *(*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *)*) -- Optional comma separated list of block hashes to filter a response.
  * **heights** ([*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* [*list*](https://docs.python.org/3/library/stdtypes.html#list) *(*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *)*) -- Optional comma separated list of block heights to filter a response.
  * **page_size** ([*int*](https://docs.python.org/3/library/functions.html#int)) -- number of items returned per page when calling the API. If the request times out, try using a smaller number.
  * **paging_from** (*PagingFrom* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Defines where you want to start receiving items from, 'start' or 'end' of the timeseries.
  * **start_time** (*datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Start time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **end_time** (*datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- End time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **start_height** ([*int*](https://docs.python.org/3/library/functions.html#int)) -- The start height indicates the beginning block height for the set of data that are returned. Mutually exclusive with start_time
  * **end_height** ([*int*](https://docs.python.org/3/library/functions.html#int)) -- The end height indicates the beginning block height for the set of data that are returned. Mutually exclusive with end_time
  * **chain** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Default: "main" Chain type. Supported values are main and all (includes both main and stale).
  * **start_inclusive** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if start timestamp must be included in the timeseries if present. True by default.
  * **end_inclusive** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if end timestamp must be included in the timeseries if present. True by default.
  * **timezone** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- timezone of the start/end times in db format for example: "America/Chicago". Default value is "UTC". For more details check out API documentation page.
  * **ignore_unsupported_errors** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Default: false. Ignore "unsupported" errors for not currently supported by Coin Metrics items.
* **Returns:**
  list of blockchain blocks metadata
* **Return type:**
  [DataCollection](../data-collection.md#coinmetrics._data_collection.DataCollection)

#### CoinMetricsClient.get_list_of_rebasing_changes_v2(asset, txids=None, block_hashes=None, page_size=None, paging_from='start', start_time=None, end_time=None, start_height=None, end_height=None, start_chain_sequence_number=None, end_chain_sequence_number=None, chain=None, start_inclusive=None, end_inclusive=None, timezone=None, ignore_unsupported_errors=False)

Returns a list of blockchain rebasing changes.

* **Parameters:**
  * **asset** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Asset name
  * **txids** ([*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* [*list*](https://docs.python.org/3/library/stdtypes.html#list) *(*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *)*) -- Optional comma separated list of transaction identifiers (txid) to filter a response.
  * **block_hashes** ([*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* [*list*](https://docs.python.org/3/library/stdtypes.html#list) *(*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *)*) -- Optional comma separated list of block hashes to filter a response.
  * **page_size** ([*int*](https://docs.python.org/3/library/functions.html#int)) -- number of items returned per page when calling the API. If the request times out, try using a smaller number.
  * **paging_from** (*PagingFrom* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Defines where you want to start receiving items from, 'start' or 'end' of the timeseries.
  * **start_time** (*datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Start time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **end_time** (*datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- End time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **start_height** ([*int*](https://docs.python.org/3/library/functions.html#int)) -- The start height indicates the beginning block height for the set of data that are returned. Mutually exclusive with start_time
  * **end_height** ([*int*](https://docs.python.org/3/library/functions.html#int)) -- The end height indicates the beginning block height for the set of data that are returned. Mutually exclusive with end_time
  * **start_chain_sequence_number** ([*int*](https://docs.python.org/3/library/functions.html#int)) -- The start chain sequence number for the set of data that are returned. Mutually exclusive with start_time
  * **end_chain_sequence_number** ([*int*](https://docs.python.org/3/library/functions.html#int)) -- The end chain sequence number for the set of data that are returned. Mutually exclusive with end_time
  * **chain** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Default: "main". Chain type. Supported values are main and all (includes both main and stale).
  * **start_inclusive** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if start timestamp must be included in the timeseries if present. True by default.
  * **end_inclusive** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if end timestamp must be included in the timeseries if present. True by default.
  * **timezone** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- timezone of the start/end times in db format for example: "America/Chicago". Default value is "UTC". For more details check out API documentation page.
  * **ignore_unsupported_errors** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Default: false. Ignore "unsupported" errors for not currently supported by Coin Metrics items.
* **Returns:**
  list of rebasing changes
* **Return type:**
  [DataCollection](../data-collection.md#coinmetrics._data_collection.DataCollection)

#### CoinMetricsClient.get_list_of_sub_accounts_v2(asset, accounts=None, page_size=None, paging_from='start', start_time=None, end_time=None, start_height=None, end_height=None, start_chain_sequence_number=None, end_chain_sequence_number=None, start_inclusive=None, end_inclusive=None, timezone=None, ignore_unsupported_errors=False)

Returns a list of blockchain sub-accounts with their balances.

* **Parameters:**
  * **asset** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Asset name
  * **accounts** ([*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* [*list*](https://docs.python.org/3/library/stdtypes.html#list) *(*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *)*) -- Optional comma separated list of accounts to filter a response.
  * **page_size** ([*int*](https://docs.python.org/3/library/functions.html#int)) -- number of items returned per page when calling the API. If the request times out, try using a smaller number.
  * **paging_from** (*PagingFrom* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Defines where you want to start receiving items from, 'start' or 'end' of the timeseries.
  * **start_time** (*datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Start time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **end_time** (*datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- End time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **start_height** ([*int*](https://docs.python.org/3/library/functions.html#int)) -- The start height indicates the beginning block height for the set of data that are returned. Mutually exclusive with start_time
  * **end_height** ([*int*](https://docs.python.org/3/library/functions.html#int)) -- The end height indicates the beginning block height for the set of data that are returned. Mutually exclusive with end_time
  * **start_chain_sequence_number** ([*int*](https://docs.python.org/3/library/functions.html#int)) -- The start height indicates the beginning block height for the set of data that are returned. Mutually exclusive with start_time
  * **end_chain_sequence_number** ([*int*](https://docs.python.org/3/library/functions.html#int)) -- The end height indicates the beginning block height for the set of data that are returned. Mutually exclusive with end_time
  * **start_inclusive** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if start timestamp must be included in the timeseries if present. True by default.
  * **end_inclusive** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if end timestamp must be included in the timeseries if present. True by default.
  * **timezone** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- timezone of the start/end times in db format for example: "America/Chicago". Default value is "UTC". For more details check out API documentation page.
  * **ignore_unsupported_errors** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Default: false. Ignore "unsupported" errors for not currently supported by Coin Metrics items.
* **Returns:**
  list of blockchain accounts metadata
* **Return type:**
  [DataCollection](../data-collection.md#coinmetrics._data_collection.DataCollection)

#### CoinMetricsClient.get_list_of_transactions_v2(asset, txids=None, block_hashes=None, page_size=None, paging_from='start', start_time=None, end_time=None, start_height=None, end_height=None, chain=None, start_inclusive=None, end_inclusive=None, timezone=None, ignore_unsupported_errors=False)

Returns a list of blockchain transactions metadata.

* **Parameters:**
  * **asset** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Asset name
  * **txids** ([*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* [*list*](https://docs.python.org/3/library/stdtypes.html#list) *(*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *)*) -- Optional comma separated list of transaction identifiers (txid) to filter a response.
  * **block_hashes** ([*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* [*list*](https://docs.python.org/3/library/stdtypes.html#list) *(*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *)*) -- Optional comma separated list of block hashes to filter a response.
  * **page_size** ([*int*](https://docs.python.org/3/library/functions.html#int)) -- number of items returned per page when calling the API. If the request times out, try using a smaller number.
  * **paging_from** (*PagingFrom* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Defines where you want to start receiving items from, 'start' or 'end' of the timeseries.
  * **start_time** (*datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Start time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **end_time** (*datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- End time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **start_height** ([*int*](https://docs.python.org/3/library/functions.html#int)) -- The start height indicates the beginning block height for the set of data that are returned. Mutually exclusive with start_time
  * **end_height** ([*int*](https://docs.python.org/3/library/functions.html#int)) -- The end height indicates the beginning block height for the set of data that are returned. Mutually exclusive with end_time
  * **chain** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Default: "main". Chain type. Supported values are main and all (includes both main and stale).
  * **start_inclusive** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if start timestamp must be included in the timeseries if present. True by default.
  * **end_inclusive** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if end timestamp must be included in the timeseries if present. True by default.
  * **timezone** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- timezone of the start/end times in db format for example: "America/Chicago". Default value is "UTC". For more details check out API documentation page.
  * **ignore_unsupported_errors** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Default: false. Ignore "unsupported" errors for not currently supported by Coin Metrics items.
* **Returns:**
  list of transaction metadata
* **Return type:**
  [DataCollection](../data-collection.md#coinmetrics._data_collection.DataCollection)

#### CoinMetricsClient.get_transaction_tracker(asset, addresses=None, txids=None, replacements_for_txids=None, replacements_only=None, page_size=None, paging_from='start', start_time=None, end_time=None, start_inclusive=None, end_inclusive=None, timezone=None, unconfirmed_only=None, format=None)

Returns status updates for the specified or all transactions.

* **Parameters:**
  * **asset** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Asset name
  * **txids** ([*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* [*list*](https://docs.python.org/3/library/stdtypes.html#list) *(*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *)*) -- Optional comma separated list of transaction identifiers (txid) to track.
  * **replacements_for_txids** ([*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* [*list*](https://docs.python.org/3/library/stdtypes.html#list) *(*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *)*) -- Optional comma separated list of transaction identifiers (txid) to get the corresponding replacement transactions for. Mutually exclusive with txids.
  * **replacements_only** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Boolean indicating if the response should contain only the replacement transactions.
  * **page_size** ([*int*](https://docs.python.org/3/library/functions.html#int)) -- number of items returned per page when calling the API. If the request times out, try using a smaller number.
  * **paging_from** (*PagingFrom* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Defines where you want to start receiving items from, 'start' or 'end' of the timeseries.
  * **start_time** (*datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Start time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **end_time** (*datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- End time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **start_inclusive** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if start timestamp must be included in the timeseries if present. True by default.
  * **end_inclusive** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if end timestamp must be included in the timeseries if present. True by default.
  * **timezone** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- timezone of the start/end times in db format for example: "America/Chicago". Default value is "UTC". For more details check out API documentation page.
  * **format** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Format of the response. Supported values are json, csv. Default is json.
  * **addresses** ([*List*](https://docs.python.org/3/library/typing.html#typing.List) *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*  *|* [*str*](https://docs.python.org/3/library/stdtypes.html#str) *|* *None*)
  * **unconfirmed_only** ([*bool*](https://docs.python.org/3/library/functions.html#bool) *|* *None*)
* **Returns:**
  status updates for the specified or all transactions.
* **Return type:**
  [DataCollection](../data-collection.md#coinmetrics._data_collection.DataCollection)
