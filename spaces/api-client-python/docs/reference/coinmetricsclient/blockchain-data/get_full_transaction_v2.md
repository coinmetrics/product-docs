# CoinMetricsClient.get_full_transaction_v2

<a id="coinmetrics.api_client.CoinMetricsClient.get_full_transaction_v2"></a>

### `coinmetrics.api_client.CoinMetricsClient.get_full_transaction_v2(asset, txid, include_sub_accounts, ignore_unsupported_errors=False)`

Returns a full blockchain transaction with all balance updates.

* **Parameters:**
  * **asset** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Asset name
  * **txid** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- transaction identifier
  * **include_sub_accounts** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Boolean indicating if the response should contain sub-accounts
  * **ignore_unsupported_errors** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Default: false. Ignore "unsupported" errors for not currently supported by Coin Metrics items.

**Returns:**

* [list](https://docs.python.org/3/library/stdtypes.html#list)([dict](https://docs.python.org/3/library/stdtypes.html#dict)([str](https://docs.python.org/3/library/stdtypes.html#str)), any)
  * block transaction data
