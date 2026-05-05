# CoinMetricsClient.get_list_of_balance_updates_for_account_v2

<a id="coinmetrics.api_client.CoinMetricsClient.get_list_of_balance_updates_for_account_v2"></a>

## `method CoinMetricsClient.get_list_of_balance_updates_for_account_v2`

```python
coinmetrics.api_client.CoinMetricsClient.get_list_of_balance_updates_for_account_v2(
    asset,
    account,
    txids=None,
    block_hashes=None,
    include_counterparties=None,
    start_time=None,
    end_time=None,
    start_height=None,
    end_height=None,
    start_chain_sequence_number=None,
    end_chain_sequence_number=None,
    include_sub_accounts=None,
    chain=None,
    start_inclusive=None,
    end_inclusive=None,
    timezone=None,
    page_size=None,
    paging_from=None,
    next_page_token=None,
    ignore_unsupported_errors=False,
)
```

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
  [DataCollection](../../data-collection/README.md#coinmetrics._data_collection.DataCollection)
