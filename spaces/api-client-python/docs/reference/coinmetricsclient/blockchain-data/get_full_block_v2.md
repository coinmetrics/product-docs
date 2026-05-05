```python
coinmetrics.api_client.CoinMetricsClient.get_full_block_v2(
    asset,
    block_hash,
    include_sub_accounts,
    ignore_unsupported_errors=False,
)
```

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
