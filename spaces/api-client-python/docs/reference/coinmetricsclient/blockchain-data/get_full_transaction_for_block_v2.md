# CoinMetricsClient.get_full_transaction_for_block_v2

<a id="coinmetrics.api_client.CoinMetricsClient.get_full_transaction_for_block_v2"></a>

## *method* `CoinMetricsClient.get_full_transaction_for_block_v2`

```python
coinmetrics.api_client.CoinMetricsClient.get_full_transaction_for_block_v2(
    asset,
    block_hash,
    txid,
    include_sub_accounts,
    ignore_unsupported_errors=False,
)
```

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
