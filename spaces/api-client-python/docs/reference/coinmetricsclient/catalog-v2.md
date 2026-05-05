# Catalog v2

<a id="coinmetrics.api_client.CoinMetricsClient.catalog_asset_chains_v2"></a>

### `CoinMetricsClient.catalog_asset_chains_v2`

```python
coinmetrics.api_client.CoinMetricsClient.catalog_asset_chains_v2(
    assets=None,
    page_size=None,
    paging_from=None,
    next_page_token=None,
    format='json_stream',
)
```

Returns a list of available assets for the asset-chains endpoint along with time ranges of available
data.

* **Parameters:**
  * **assets** (*Optional* *[**Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]* *]*) -- Comma separated list of assets. By default all assets are returned.
  * **page_size** (*Optional* *[*[*int*](https://docs.python.org/3/library/functions.html#int) *]*) -- Number of items per single page of results.
  * **paging_from** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Where does the first page start, at the start of the interval or at the end.
  * **next_page_token** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use next_page_url response field.
  * **format** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'.
* **Returns:**
  List of asset chains assets
* **Return type:**
  [CatalogV2DataCollection](../data-collection.md#coinmetrics._data_collection.CatalogV2DataCollection)

<a id="coinmetrics.api_client.CoinMetricsClient.catalog_full_asset_chains_v2"></a>

### `CoinMetricsClient.catalog_full_asset_chains_v2`

```python
coinmetrics.api_client.CoinMetricsClient.catalog_full_asset_chains_v2(
    assets=None,
    page_size=None,
    paging_from=None,
    next_page_token=None,
    format='json_stream',
)
```

Returns a list of all supported assets for the asset-chains endpoint along with time ranges of
available data.

* **Parameters:**
  * **assets** (*Optional* *[**Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]* *]*) -- Comma separated list of assets. By default all assets are returned.
  * **page_size** (*Optional* *[*[*int*](https://docs.python.org/3/library/functions.html#int) *]*) -- Number of items per single page of results.
  * **paging_from** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Where does the first page start, at the start of the interval or at the end.
  * **next_page_token** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use next_page_url response field.
  * **format** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'.
* **Returns:**
  List of asset chains assets
* **Return type:**
  [CatalogV2DataCollection](../data-collection.md#coinmetrics._data_collection.CatalogV2DataCollection)

<a id="coinmetrics.api_client.CoinMetricsClient.catalog_asset_metrics_v2"></a>

### `CoinMetricsClient.catalog_asset_metrics_v2`

```python
coinmetrics.api_client.CoinMetricsClient.catalog_asset_metrics_v2(
    assets=None,
    metrics=None,
    reviewable=None,
    page_size=None,
    paging_from=None,
    next_page_token=None,
    format='json_stream',
)
```

Returns a list of available asset metrics along with the time ranges of available data.

* **Parameters:**
  * **assets** (*Optional* *[**Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]* *]*) -- Comma separated list of assets. By default all assets are returned.
  * **metrics** (*Optional* *[**Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]* *]*) -- Comma separated list of metrics. By default all metrics are returned.
  * **reviewable** (*Optional* *[*[*bool*](https://docs.python.org/3/library/functions.html#bool) *]*) -- Limit to human-reviewable metrics. By default all metrics are returned.
  * **page_size** (*Optional* *[*[*int*](https://docs.python.org/3/library/functions.html#int) *]*) -- Number of items per single page of results.
  * **paging_from** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Where does the first page start, at the start of the interval or at the end.
  * **next_page_token** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use next_page_url response field.
  * **format** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'.
* **Returns:**
  List of asset metrics.
* **Return type:**
  [CatalogV2DataCollection](../data-collection.md#coinmetrics._data_collection.CatalogV2DataCollection)

<a id="coinmetrics.api_client.CoinMetricsClient.catalog_full_asset_metrics_v2"></a>

### `CoinMetricsClient.catalog_full_asset_metrics_v2`

```python
coinmetrics.api_client.CoinMetricsClient.catalog_full_asset_metrics_v2(
    assets=None,
    metrics=None,
    reviewable=None,
    page_size=None,
    paging_from=None,
    next_page_token=None,
    format='json_stream',
)
```

Returns a list of all supported asset metrics along with the time ranges of available data.

* **Parameters:**
  * **assets** (*Optional* *[**Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]* *]*) -- Comma separated list of assets. By default all assets are returned.
  * **metrics** (*Optional* *[**Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]* *]*) -- Comma separated list of metrics. By default all metrics are returned.
  * **reviewable** (*Optional* *[*[*bool*](https://docs.python.org/3/library/functions.html#bool) *]*) -- Limit to human-reviewable metrics. By default all metrics are returned.
  * **page_size** (*Optional* *[*[*int*](https://docs.python.org/3/library/functions.html#int) *]*) -- Number of items per single page of results.
  * **paging_from** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Where does the first page start, at the start of the interval or at the end.
  * **next_page_token** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use next_page_url response field.
  * **format** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'.
* **Returns:**
  List of asset metrics.
* **Return type:**
  [CatalogV2DataCollection](../data-collection.md#coinmetrics._data_collection.CatalogV2DataCollection)

<a id="coinmetrics.api_client.CoinMetricsClient.catalog_blockchain_accounts_v2"></a>

### `CoinMetricsClient.catalog_blockchain_accounts_v2`

```python
coinmetrics.api_client.CoinMetricsClient.catalog_blockchain_accounts_v2(
    assets=None,
    page_size=None,
    paging_from=None,
    next_page_token=None,
    format='json_stream',
)
```

Returns a list of available assets for the blockchain accounts endpoint along with time ranges of
available data.

* **Parameters:**
  * **assets** (*Optional* *[**Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]* *]*) -- Comma separated list of assets. By default all assets are returned.
  * **page_size** (*Optional* *[*[*int*](https://docs.python.org/3/library/functions.html#int) *]*) -- Number of items per single page of results.
  * **paging_from** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Where does the first page start, at the start of the interval or at the end.
  * **next_page_token** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use next_page_url response field.
  * **format** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'.
* **Returns:**
  List of blockchain-v2/accounts assets using catalog-v2
* **Return type:**
  [CatalogV2DataCollection](../data-collection.md#coinmetrics._data_collection.CatalogV2DataCollection)

<a id="coinmetrics.api_client.CoinMetricsClient.catalog_full_blockchain_accounts_v2"></a>

### `CoinMetricsClient.catalog_full_blockchain_accounts_v2`

```python
coinmetrics.api_client.CoinMetricsClient.catalog_full_blockchain_accounts_v2(
    assets=None,
    page_size=None,
    paging_from=None,
    next_page_token=None,
    format='json_stream',
)
```

Returns a list of all supported assets for the blockchain accounts endpoint along with time ranges of
available data.

* **Parameters:**
  * **assets** (*Optional* *[**Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]* *]*) -- Comma separated list of assets. By default all assets are returned.
  * **page_size** (*Optional* *[*[*int*](https://docs.python.org/3/library/functions.html#int) *]*) -- Number of items per single page of results.
  * **paging_from** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Where does the first page start, at the start of the interval or at the end.
  * **next_page_token** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use next_page_url response field.
  * **format** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'.
* **Returns:**
  Full list of blockchain-v2/accounts assets using catalog-v2
* **Return type:**
  [CatalogV2DataCollection](../data-collection.md#coinmetrics._data_collection.CatalogV2DataCollection)

<a id="coinmetrics.api_client.CoinMetricsClient.catalog_blockchain_balance_updates_v2"></a>

### `CoinMetricsClient.catalog_blockchain_balance_updates_v2`

```python
coinmetrics.api_client.CoinMetricsClient.catalog_blockchain_balance_updates_v2(
    assets=None,
    page_size=None,
    paging_from=None,
    next_page_token=None,
    format='json_stream',
)
```

Returns a list of available assets for the blockchain balance updates endpoint along with time ranges
of available data.

* **Parameters:**
  * **assets** (*Optional* *[**Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]* *]*) -- Comma separated list of assets. By default all assets are returned.
  * **page_size** (*Optional* *[*[*int*](https://docs.python.org/3/library/functions.html#int) *]*) -- Number of items per single page of results.
  * **paging_from** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Where does the first page start, at the start of the interval or at the end.
  * **next_page_token** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use next_page_url response field.
  * **format** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'.
* **Returns:**
  List of blockchain-v2/balance-updates assets using catalog-v2
* **Return type:**
  [CatalogV2DataCollection](../data-collection.md#coinmetrics._data_collection.CatalogV2DataCollection)

<a id="coinmetrics.api_client.CoinMetricsClient.catalog_full_blockchain_balance_updates_v2"></a>

### `CoinMetricsClient.catalog_full_blockchain_balance_updates_v2`

```python
coinmetrics.api_client.CoinMetricsClient.catalog_full_blockchain_balance_updates_v2(
    assets=None,
    page_size=None,
    paging_from=None,
    next_page_token=None,
    format='json_stream',
)
```

Returns a list of all supported assets for the blockchain balance updates endpoint along with time
ranges of available data.

* **Parameters:**
  * **assets** (*Optional* *[**Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]* *]*) -- Comma separated list of assets. By default all assets are returned.
  * **page_size** (*Optional* *[*[*int*](https://docs.python.org/3/library/functions.html#int) *]*) -- Number of items per single page of results.
  * **paging_from** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Where does the first page start, at the start of the interval or at the end.
  * **next_page_token** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use next_page_url response field.
  * **format** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'.
* **Returns:**
  Full list of blockchain-v2/balance-updates assets using catalog-v2
* **Return type:**
  [CatalogV2DataCollection](../data-collection.md#coinmetrics._data_collection.CatalogV2DataCollection)

<a id="coinmetrics.api_client.CoinMetricsClient.catalog_blockchain_blocks_v2"></a>

### `CoinMetricsClient.catalog_blockchain_blocks_v2`

```python
coinmetrics.api_client.CoinMetricsClient.catalog_blockchain_blocks_v2(
    assets=None,
    page_size=None,
    paging_from=None,
    next_page_token=None,
    format='json_stream',
)
```

Returns a list of available assets for the blockchain blocks endpoint along with time ranges of
available data.

* **Parameters:**
  * **assets** (*Optional* *[**Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]* *]*) -- Comma separated list of assets. By default all assets are returned.
  * **page_size** (*Optional* *[*[*int*](https://docs.python.org/3/library/functions.html#int) *]*) -- Number of items per single page of results.
  * **paging_from** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Where does the first page start, at the start of the interval or at the end.
  * **next_page_token** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use next_page_url response field.
  * **format** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'.
* **Returns:**
  List of blockchain-v2/blocks assets using catalog-v2
* **Return type:**
  [CatalogV2DataCollection](../data-collection.md#coinmetrics._data_collection.CatalogV2DataCollection)

<a id="coinmetrics.api_client.CoinMetricsClient.catalog_full_blockchain_blocks_v2"></a>

### `CoinMetricsClient.catalog_full_blockchain_blocks_v2`

```python
coinmetrics.api_client.CoinMetricsClient.catalog_full_blockchain_blocks_v2(
    assets=None,
    page_size=None,
    paging_from=None,
    next_page_token=None,
    format='json_stream',
)
```

Returns a list of all supported assets for the blockchain blocks endpoint along with time ranges of
available data.

* **Parameters:**
  * **assets** (*Optional* *[**Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]* *]*) -- Comma separated list of assets. By default all assets are returned.
  * **page_size** (*Optional* *[*[*int*](https://docs.python.org/3/library/functions.html#int) *]*) -- Number of items per single page of results.
  * **paging_from** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Where does the first page start, at the start of the interval or at the end.
  * **next_page_token** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use next_page_url response field.
  * **format** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'.
* **Returns:**
  Full list of blockchain-v2/blocks assets using catalog-v2
* **Return type:**
  [CatalogV2DataCollection](../data-collection.md#coinmetrics._data_collection.CatalogV2DataCollection)

<a id="coinmetrics.api_client.CoinMetricsClient.catalog_blockchain_rebasing_changes_v2"></a>

### `CoinMetricsClient.catalog_blockchain_rebasing_changes_v2`

```python
coinmetrics.api_client.CoinMetricsClient.catalog_blockchain_rebasing_changes_v2(
    assets=None,
    page_size=None,
    paging_from=None,
    next_page_token=None,
    format='json_stream',
)
```

Returns a list of available assets for the blockchain rebasing changes endpoint along with time ranges of available data.

* **Parameters:**
  * **assets** (*Optional* *[**Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]* *]*) -- Comma separated list of assets. By default all assets are returned.
  * **page_size** (*Optional* *[*[*int*](https://docs.python.org/3/library/functions.html#int) *]*) -- Number of items per single page of results.
  * **paging_from** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Where does the first page start, at the start of the interval or at the end.
  * **next_page_token** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use next_page_url response field.
  * **format** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'.
* **Returns:**
  List of blockchain-v2/rebasing-changes assets using catalog-v2
* **Return type:**
  [CatalogV2DataCollection](../data-collection.md#coinmetrics._data_collection.CatalogV2DataCollection)

<a id="coinmetrics.api_client.CoinMetricsClient.catalog_full_blockchain_rebasing_changes_v2"></a>

### `CoinMetricsClient.catalog_full_blockchain_rebasing_changes_v2`

```python
coinmetrics.api_client.CoinMetricsClient.catalog_full_blockchain_rebasing_changes_v2(
    assets=None,
    page_size=None,
    paging_from=None,
    next_page_token=None,
    format='json_stream',
)
```

Returns a list of all supported assets for the blockchain rebasing changes endpoint along with time ranges of available data.

* **Parameters:**
  * **assets** (*Optional* *[**Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]* *]*) -- Comma separated list of assets. By default all assets are returned.
  * **page_size** (*Optional* *[*[*int*](https://docs.python.org/3/library/functions.html#int) *]*) -- Number of items per single page of results.
  * **paging_from** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Where does the first page start, at the start of the interval or at the end.
  * **next_page_token** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use next_page_url response field.
  * **format** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'.
* **Returns:**
  Full list of blockchain-v2/rebasing-changes assets using catalog-v2
* **Return type:**
  [CatalogV2DataCollection](../data-collection.md#coinmetrics._data_collection.CatalogV2DataCollection)

<a id="coinmetrics.api_client.CoinMetricsClient.catalog_blockchain_transactions_v2"></a>

### `CoinMetricsClient.catalog_blockchain_transactions_v2`

```python
coinmetrics.api_client.CoinMetricsClient.catalog_blockchain_transactions_v2(
    assets=None,
    page_size=None,
    paging_from=None,
    next_page_token=None,
    format='json_stream',
)
```

Returns a list of available assets for the blockchain transactions endpoint along with time ranges of
available data.

* **Parameters:**
  * **assets** (*Optional* *[**Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]* *]*) -- Comma separated list of assets. By default all assets are returned.
  * **page_size** (*Optional* *[*[*int*](https://docs.python.org/3/library/functions.html#int) *]*) -- Number of items per single page of results.
  * **paging_from** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Where does the first page start, at the start of the interval or at the end.
  * **next_page_token** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use next_page_url response field.
  * **format** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'.
* **Returns:**
  List of blockchain-v2/transactions assets using catalog-v2
* **Return type:**
  [CatalogV2DataCollection](../data-collection.md#coinmetrics._data_collection.CatalogV2DataCollection)

<a id="coinmetrics.api_client.CoinMetricsClient.catalog_full_blockchain_transactions_v2"></a>

### `CoinMetricsClient.catalog_full_blockchain_transactions_v2`

```python
coinmetrics.api_client.CoinMetricsClient.catalog_full_blockchain_transactions_v2(
    assets=None,
    page_size=None,
    paging_from=None,
    next_page_token=None,
    format='json_stream',
)
```

Returns a list of all supported assets for the blockchain transactions endpoint along with time ranges
of available data.

* **Parameters:**
  * **assets** (*Optional* *[**Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]* *]*) -- Comma separated list of assets. By default all assets are returned.
  * **page_size** (*Optional* *[*[*int*](https://docs.python.org/3/library/functions.html#int) *]*) -- Number of items per single page of results.
  * **paging_from** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Where does the first page start, at the start of the interval or at the end.
  * **next_page_token** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use next_page_url response field.
  * **format** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'.
* **Returns:**
  Full list of blockchain-v2/transactions assets using catalog-v2
* **Return type:**
  [CatalogV2DataCollection](../data-collection.md#coinmetrics._data_collection.CatalogV2DataCollection)

<a id="coinmetrics.api_client.CoinMetricsClient.catalog_contract_prices_v2"></a>

### `CoinMetricsClient.catalog_contract_prices_v2`

```python
coinmetrics.api_client.CoinMetricsClient.catalog_contract_prices_v2(
    markets=None,
    exchange=None,
    market_type=None,
    base=None,
    quote=None,
    asset=None,
    symbol=None,
    start_time=None,
    end_time=None,
    start_inclusive=None,
    end_inclusive=None,
    timezone=None,
    format='json_stream',
    page_size=None,
    paging_from=None,
    next_page_token=None,
)
```

Returns a list of contract prices for option markets that have data available within the requested
window.

* **Parameters:**
  * **markets** (*Optional* *[**Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]* *]*) -- Comma separated list of markets. By default all markets are returned.
  * **exchange** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Unique name of an exchange.
  * **market_type** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Type of markets.
  * **base** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Base asset of markets.
  * **quote** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Quote asset of markets.
  * **asset** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Any asset of markets.
  * **symbol** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Symbol of derivative markets, full instrument name.
  * **format** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'.
  * **start_time** (*Optional* *[**Union* *[**datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]*) -- Start time of the interval.
  * **end_time** (*Optional* *[**Union* *[**datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]*) -- End time of the interval.
  * **start_inclusive** (*Optional* *[*[*bool*](https://docs.python.org/3/library/functions.html#bool) *]*) -- Whether to include the start time in the interval.
  * **end_inclusive** (*Optional* *[*[*bool*](https://docs.python.org/3/library/functions.html#bool) *]*) -- Whether to include the end time in the interval.
  * **timezone** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Timezone of the interval.
  * **page_size** (*Optional* *[*[*int*](https://docs.python.org/3/library/functions.html#int) *]*) -- Number of items per single page of results.
  * **paging_from** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Where does the first page start, at the start of the interval or at the end.
  * **next_page_token** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use next_page_url response field.
* **Returns:**
  List of contract prices statistics.
* **Return type:**
  [CatalogV2DataCollection](../data-collection.md#coinmetrics._data_collection.CatalogV2DataCollection)

<a id="coinmetrics.api_client.CoinMetricsClient.catalog_full_contract_prices_v2"></a>

### `CoinMetricsClient.catalog_full_contract_prices_v2`

```python
coinmetrics.api_client.CoinMetricsClient.catalog_full_contract_prices_v2(
    markets=None,
    exchange=None,
    market_type=None,
    base=None,
    quote=None,
    asset=None,
    symbol=None,
    start_time=None,
    end_time=None,
    start_inclusive=None,
    end_inclusive=None,
    timezone=None,
    format='json_stream',
    page_size=None,
    paging_from=None,
    next_page_token=None,
)
```

Returns a list of all market contract prices for option market.

* **Parameters:**
  * **markets** (*Optional* *[**Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]* *]*) -- Comma separated list of markets. By default all markets are returned.
  * **exchange** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Unique name of an exchange.
  * **market_type** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Type of markets.
  * **base** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Base asset of markets.
  * **quote** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Quote asset of markets.
  * **asset** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Any asset of markets.
  * **symbol** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Symbol of derivative markets, full instrument name.
  * **format** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'.
  * **start_time** (*Optional* *[**Union* *[**datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]*) -- Start time of the interval.
  * **end_time** (*Optional* *[**Union* *[**datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]*) -- End time of the interval.
  * **start_inclusive** (*Optional* *[*[*bool*](https://docs.python.org/3/library/functions.html#bool) *]*) -- Whether to include the start time in the interval.
  * **end_inclusive** (*Optional* *[*[*bool*](https://docs.python.org/3/library/functions.html#bool) *]*) -- Whether to include the end time in the interval.
  * **timezone** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Timezone of the interval.
  * **page_size** (*Optional* *[*[*int*](https://docs.python.org/3/library/functions.html#int) *]*) -- Number of items per single page of results.
  * **paging_from** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Where does the first page start, at the start of the interval or at the end.
  * **next_page_token** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use next_page_url response field.
* **Returns:**
  List of contract prices statistics.
* **Return type:**
  [CatalogV2DataCollection](../data-collection.md#coinmetrics._data_collection.CatalogV2DataCollection)

<a id="coinmetrics.api_client.CoinMetricsClient.catalog_exchange_asset_metrics_v2"></a>

### `CoinMetricsClient.catalog_exchange_asset_metrics_v2`

```python
coinmetrics.api_client.CoinMetricsClient.catalog_exchange_asset_metrics_v2(
    exchange_assets=None,
    metrics=None,
    reviewable=None,
    page_size=None,
    paging_from=None,
    next_page_token=None,
    format='json_stream',
)
```

Returns a list of available exchange-asset metrics along with the time ranges of available data.

* **Parameters:**
  * **exchange_assets** (*Optional* *[**Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]* *]*) -- Comma separated list of exchange-assets. By default, all exchange-assets are returned.
  * **metrics** (*Optional* *[**Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]* *]*) -- Comma separated list of metrics. By default all metrics are returned.
  * **reviewable** (*Optional* *[*[*bool*](https://docs.python.org/3/library/functions.html#bool) *]*) -- Limit to human-reviewable metrics. By default all metrics are returned.
  * **page_size** (*Optional* *[*[*int*](https://docs.python.org/3/library/functions.html#int) *]*) -- Number of items per single page of results.
  * **paging_from** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Where does the first page start, at the start of the interval or at the end.
  * **next_page_token** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use next_page_url response field.
  * **format** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'.
* **Returns:**
  List of exchange-asset metrics.
* **Return type:**
  [CatalogV2DataCollection](../data-collection.md#coinmetrics._data_collection.CatalogV2DataCollection)

<a id="coinmetrics.api_client.CoinMetricsClient.catalog_full_exchange_asset_metrics_v2"></a>

### `CoinMetricsClient.catalog_full_exchange_asset_metrics_v2`

```python
coinmetrics.api_client.CoinMetricsClient.catalog_full_exchange_asset_metrics_v2(
    exchange_assets=None,
    metrics=None,
    reviewable=None,
    page_size=None,
    paging_from=None,
    next_page_token=None,
    format='json_stream',
)
```

Returns a list of all supported exchange-asset metrics along with the time ranges of available data.

* **Parameters:**
  * **exchange_assets** (*Optional* *[**Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]* *]*) -- Comma separated list of exchange-assets. By default, all exchange-assets are returned.
  * **metrics** (*Optional* *[**Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]* *]*) -- Comma separated list of metrics. By default all metrics are returned.
  * **reviewable** (*Optional* *[*[*bool*](https://docs.python.org/3/library/functions.html#bool) *]*) -- Limit to human-reviewable metrics. By default all metrics are returned.
  * **page_size** (*Optional* *[*[*int*](https://docs.python.org/3/library/functions.html#int) *]*) -- Number of items per single page of results.
  * **paging_from** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Where does the first page start, at the start of the interval or at the end.
  * **next_page_token** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use next_page_url response field.
  * **format** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Default: "json_stream" (catalog-v2 and reference-data, market-orderbooks and other heavy endpoints), "json" (timeseries/`*-metrics` and other lighter endpoints). Format of the response. Supported values are json, json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'.
* **Returns:**
  List of exchange-asset metrics.
* **Return type:**
  [CatalogV2DataCollection](../data-collection.md#coinmetrics._data_collection.CatalogV2DataCollection)

<a id="coinmetrics.api_client.CoinMetricsClient.catalog_exchange_metrics_v2"></a>

### `CoinMetricsClient.catalog_exchange_metrics_v2`

```python
coinmetrics.api_client.CoinMetricsClient.catalog_exchange_metrics_v2(
    exchanges=None,
    metrics=None,
    reviewable=None,
    page_size=None,
    paging_from=None,
    next_page_token=None,
    format='json_stream',
)
```

Returns a list of available exchange metrics along with the time ranges of available data.

* **Parameters:**
  * **exchanges** (*Optional* *[**Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]* *]*) -- Comma separated list of exchanges. By default all exchanges are returned.
  * **metrics** (*Optional* *[**Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]* *]*) -- Comma separated list of metrics. By default all metrics are returned.
  * **reviewable** (*Optional* *[*[*bool*](https://docs.python.org/3/library/functions.html#bool) *]*) -- Limit to human-reviewable metrics. By default all metrics are returned.
  * **page_size** (*Optional* *[*[*int*](https://docs.python.org/3/library/functions.html#int) *]*) -- Number of items per single page of results.
  * **paging_from** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Where does the first page start, at the start of the interval or at the end.
  * **next_page_token** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use next_page_url response field.
  * **format** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'.
* **Returns:**
  List of exchange metrics.
* **Return type:**
  [CatalogV2DataCollection](../data-collection.md#coinmetrics._data_collection.CatalogV2DataCollection)

<a id="coinmetrics.api_client.CoinMetricsClient.catalog_full_exchange_metrics_v2"></a>

### `CoinMetricsClient.catalog_full_exchange_metrics_v2`

```python
coinmetrics.api_client.CoinMetricsClient.catalog_full_exchange_metrics_v2(
    exchanges=None,
    metrics=None,
    reviewable=None,
    page_size=None,
    paging_from=None,
    next_page_token=None,
    format='json_stream',
)
```

Returns a list of all supported exchange metrics along with the time ranges of available data.

* **Parameters:**
  * **exchanges** (*Optional* *[**Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]* *]*) -- Comma separated list of exchanges. By default all exchanges are returned.
  * **metrics** (*Optional* *[**Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]* *]*) -- Comma separated list of metrics. By default all metrics are returned.
  * **reviewable** (*Optional* *[*[*bool*](https://docs.python.org/3/library/functions.html#bool) *]*) -- Limit to human-reviewable metrics. By default all metrics are returned.
  * **page_size** (*Optional* *[*[*int*](https://docs.python.org/3/library/functions.html#int) *]*) -- Number of items per single page of results.
  * **paging_from** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Where does the first page start, at the start of the interval or at the end.
  * **next_page_token** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use next_page_url response field.
  * **format** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'.
* **Returns:**
  List of exchange metrics.
* **Return type:**
  [CatalogV2DataCollection](../data-collection.md#coinmetrics._data_collection.CatalogV2DataCollection)

<a id="coinmetrics.api_client.CoinMetricsClient.catalog_exchange_pair_metrics_v2"></a>

### `CoinMetricsClient.catalog_exchange_pair_metrics_v2`

```python
coinmetrics.api_client.CoinMetricsClient.catalog_exchange_pair_metrics_v2(
    exchange_pairs=None,
    metrics=None,
    reviewable=None,
    page_size=None,
    paging_from=None,
    next_page_token=None,
    format='json_stream',
)
```

Returns a list of available exchange-pair metrics along with the time ranges of available data.

* **Parameters:**
  * **exchange_pairs** (*Optional* *[**Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]* *]*) -- Comma separated list of exchange-pairs. By default, all exchange-pairs are returned.
  * **metrics** (*Optional* *[**Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]* *]*) -- Comma separated list of metrics. By default all metrics are returned.
  * **reviewable** (*Optional* *[*[*bool*](https://docs.python.org/3/library/functions.html#bool) *]*) -- Limit to human-reviewable metrics. By default all metrics are returned.
  * **page_size** (*Optional* *[*[*int*](https://docs.python.org/3/library/functions.html#int) *]*) -- Number of items per single page of results.
  * **paging_from** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Where does the first page start, at the start of the interval or at the end.
  * **next_page_token** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use next_page_url response field.
  * **format** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'.
* **Returns:**
  List of exchange-pair metrics.
* **Return type:**
  [CatalogV2DataCollection](../data-collection.md#coinmetrics._data_collection.CatalogV2DataCollection)

<a id="coinmetrics.api_client.CoinMetricsClient.catalog_full_exchange_pair_metrics_v2"></a>

### `CoinMetricsClient.catalog_full_exchange_pair_metrics_v2`

```python
coinmetrics.api_client.CoinMetricsClient.catalog_full_exchange_pair_metrics_v2(
    exchange_pairs=None,
    metrics=None,
    reviewable=None,
    page_size=None,
    paging_from=None,
    next_page_token=None,
    format='json_stream',
)
```

Returns a list of all supported exchange-pair metrics along with the time ranges of available data.

* **Parameters:**
  * **exchange_pairs** (*Optional* *[**Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]* *]*) -- Comma separated list of exchange-pairs. By default, all exchange-pairs are returned.
  * **metrics** (*Optional* *[**Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]* *]*) -- Comma separated list of metrics. By default all metrics are returned.
  * **reviewable** (*Optional* *[*[*bool*](https://docs.python.org/3/library/functions.html#bool) *]*) -- Limit to human-reviewable metrics. By default all metrics are returned.
  * **page_size** (*Optional* *[*[*int*](https://docs.python.org/3/library/functions.html#int) *]*) -- Number of items per single page of results.
  * **paging_from** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Where does the first page start, at the start of the interval or at the end.
  * **next_page_token** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use next_page_url response field.
  * **format** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Default: "json_stream" (catalog-v2 and reference-data, market-orderbooks and other heavy endpoints), "json" (timeseries/`*-metrics` and other lighter endpoints). Format of the response. Supported values are json, json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'.
* **Returns:**
  List of exchange-pair metrics.
* **Return type:**
  [CatalogV2DataCollection](../data-collection.md#coinmetrics._data_collection.CatalogV2DataCollection)

<a id="coinmetrics.api_client.CoinMetricsClient.catalog_index_candles_v2"></a>

### `CoinMetricsClient.catalog_index_candles_v2`

```python
coinmetrics.api_client.CoinMetricsClient.catalog_index_candles_v2(
    indexes=None,
    page_size=None,
    paging_from=None,
    next_page_token=None,
    format='json_stream',
)
```

Returns a list of available index candles along with the time ranges of available data per candle
duration.

* **Parameters:**
  * **indexes** (*Optional* *[**Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]* *]*) -- Comma separated list of indexes. By default all assets are returned.
  * **page_size** (*Optional* *[*[*int*](https://docs.python.org/3/library/functions.html#int) *]*) -- Number of items per single page of results.
  * **paging_from** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Where does the first page start, at the start of the interval or at the end.
  * **next_page_token** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use next_page_url response field.
  * **format** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'.
* **Returns:**
  List of index candles statistics.
* **Return type:**
  [CatalogV2DataCollection](../data-collection.md#coinmetrics._data_collection.CatalogV2DataCollection)

<a id="coinmetrics.api_client.CoinMetricsClient.catalog_full_index_candles_v2"></a>

### `CoinMetricsClient.catalog_full_index_candles_v2`

```python
coinmetrics.api_client.CoinMetricsClient.catalog_full_index_candles_v2(
    indexes=None,
    page_size=None,
    paging_from=None,
    next_page_token=None,
    format='json_stream',
)
```

Returns a list of all supported index candles along with the time ranges of available data per candle
duration.

* **Parameters:**
  * **indexes** (*Optional* *[**Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]* *]*) -- Comma separated list of indexes. By default all assets are returned.
  * **page_size** (*Optional* *[*[*int*](https://docs.python.org/3/library/functions.html#int) *]*) -- Number of items per single page of results.
  * **paging_from** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Where does the first page start, at the start of the interval or at the end.
  * **next_page_token** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use next_page_url response field.
  * **format** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'.
* **Returns:**
  List of index candles statistics.
* **Return type:**
  [CatalogV2DataCollection](../data-collection.md#coinmetrics._data_collection.CatalogV2DataCollection)

<a id="coinmetrics.api_client.CoinMetricsClient.catalog_index_levels_v2"></a>

### `CoinMetricsClient.catalog_index_levels_v2`

```python
coinmetrics.api_client.CoinMetricsClient.catalog_index_levels_v2(
    indexes=None,
    page_size=None,
    paging_from=None,
    next_page_token=None,
    format='json_stream',
)
```

Returns a list of available index levels along with time ranges of available data.

* **Parameters:**
  * **indexes** (*Optional* *[**Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]* *]*) -- Comma separated list of indexes. By default all indexes are returned.
  * **page_size** (*Optional* *[*[*int*](https://docs.python.org/3/library/functions.html#int) *]*) -- Number of items per single page of results.
  * **paging_from** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Where does the first page start, at the start of the interval or at the end.
  * **next_page_token** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use next_page_url response field.
  * **format** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'.
* **Returns:**
  List of index levels.
* **Return type:**
  [CatalogV2DataCollection](../data-collection.md#coinmetrics._data_collection.CatalogV2DataCollection)

<a id="coinmetrics.api_client.CoinMetricsClient.catalog_full_index_levels_v2"></a>

### `CoinMetricsClient.catalog_full_index_levels_v2`

```python
coinmetrics.api_client.CoinMetricsClient.catalog_full_index_levels_v2(
    indexes=None,
    page_size=None,
    paging_from=None,
    next_page_token=None,
    format='json_stream',
)
```

Returns a list of all supported index levels along with time ranges of available data.

* **Parameters:**
  * **indexes** (*Optional* *[**Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]* *]*) -- Comma separated list of indexes. By default all indexes are returned.
  * **page_size** (*Optional* *[*[*int*](https://docs.python.org/3/library/functions.html#int) *]*) -- Number of items per single page of results.
  * **paging_from** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Where does the first page start, at the start of the interval or at the end.
  * **next_page_token** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use next_page_url response field.
  * **format** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'.
* **Returns:**
  List of index levels.
* **Return type:**
  [CatalogV2DataCollection](../data-collection.md#coinmetrics._data_collection.CatalogV2DataCollection)

<a id="coinmetrics.api_client.CoinMetricsClient.catalog_institution_metrics_v2"></a>

### `CoinMetricsClient.catalog_institution_metrics_v2`

```python
coinmetrics.api_client.CoinMetricsClient.catalog_institution_metrics_v2(
    institutions=None,
    metrics=None,
    reviewable=None,
    page_size=None,
    paging_from=None,
    next_page_token=None,
    format='json_stream',
)
```

Returns a list of available institution metrics along with the time ranges of available data.

* **Parameters:**
  * **institutions** (*Optional* *[**Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]* *]*) -- Comma separated list of institutions. By default, all institutions are returned.
  * **metrics** (*Optional* *[**Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]* *]*) -- Comma separated list of metrics. By default all metrics are returned.
  * **reviewable** (*Optional* *[*[*bool*](https://docs.python.org/3/library/functions.html#bool) *]*) -- Limit to human-reviewable metrics. By default all metrics are returned.
  * **page_size** (*Optional* *[*[*int*](https://docs.python.org/3/library/functions.html#int) *]*) -- Number of items per single page of results.
  * **paging_from** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Where does the first page start, at the start of the interval or at the end.
  * **next_page_token** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use next_page_url response field.
  * **format** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'.
* **Returns:**
  List of institution metrics.
* **Return type:**
  [CatalogV2DataCollection](../data-collection.md#coinmetrics._data_collection.CatalogV2DataCollection)

<a id="coinmetrics.api_client.CoinMetricsClient.catalog_full_institution_metrics_v2"></a>

### `CoinMetricsClient.catalog_full_institution_metrics_v2`

```python
coinmetrics.api_client.CoinMetricsClient.catalog_full_institution_metrics_v2(
    institutions=None,
    metrics=None,
    reviewable=None,
    page_size=None,
    paging_from=None,
    next_page_token=None,
    format='json_stream',
)
```

Returns a list of all supported institution metrics along with the time ranges of available data.

* **Parameters:**
  * **institutions** (*Optional* *[**Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]* *]*) -- Comma separated list of institutions. By default, all institutions are returned.
  * **metrics** (*Optional* *[**Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]* *]*) -- Comma separated list of metrics. By default all metrics are returned.
  * **reviewable** (*Optional* *[*[*bool*](https://docs.python.org/3/library/functions.html#bool) *]*) -- Limit to human-reviewable metrics. By default all metrics are returned.
  * **page_size** (*Optional* *[*[*int*](https://docs.python.org/3/library/functions.html#int) *]*) -- Number of items per single page of results.
  * **paging_from** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Where does the first page start, at the start of the interval or at the end.
  * **next_page_token** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use next_page_url response field.
  * **format** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'.
* **Returns:**
  List of institution metrics.
* **Return type:**
  [CatalogV2DataCollection](../data-collection.md#coinmetrics._data_collection.CatalogV2DataCollection)

<a id="coinmetrics.api_client.CoinMetricsClient.catalog_market_candles_v2"></a>

### `CoinMetricsClient.catalog_market_candles_v2`

```python
coinmetrics.api_client.CoinMetricsClient.catalog_market_candles_v2(
    markets=None,
    exchange=None,
    market_type=None,
    base=None,
    quote=None,
    asset=None,
    symbol=None,
    start_time=None,
    end_time=None,
    start_inclusive=None,
    end_inclusive=None,
    timezone=None,
    format='json_stream',
    page_size=None,
    paging_from=None,
    next_page_token=None,
)
```

Returns a list of markets with candles support along with the time ranges of available data per candle
duration.

* **Parameters:**
  * **markets** (*Optional* *[**Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]* *]*) -- Comma separated list of markets. By default all markets are returned.
  * **exchange** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Unique name of an exchange.
  * **market_type** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Type of markets.
  * **base** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Base asset of markets.
  * **quote** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Quote asset of markets.
  * **asset** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Any asset of markets.
  * **symbol** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Symbol of derivative markets, full instrument name.
  * **start_time** (*Optional* *[**Union* *[**datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]*) -- Start time of the interval.
  * **end_time** (*Optional* *[**Union* *[**datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]*) -- End time of the interval.
  * **start_inclusive** (*Optional* *[*[*bool*](https://docs.python.org/3/library/functions.html#bool) *]*) -- Whether to include the start time in the interval.
  * **end_inclusive** (*Optional* *[*[*bool*](https://docs.python.org/3/library/functions.html#bool) *]*) -- Whether to include the end time in the interval.
  * **timezone** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Timezone of the interval.
  * **format** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'.
  * **page_size** (*Optional* *[*[*int*](https://docs.python.org/3/library/functions.html#int) *]*) -- Number of items per single page of results.
  * **paging_from** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Where does the first page start, at the start of the interval or at the end.
  * **next_page_token** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use next_page_url response field.
* **Returns:**
  List of market candles statistics.
* **Return type:**
  [CatalogV2DataCollection](../data-collection.md#coinmetrics._data_collection.CatalogV2DataCollection)

<a id="coinmetrics.api_client.CoinMetricsClient.catalog_full_market_candles_v2"></a>

### `CoinMetricsClient.catalog_full_market_candles_v2`

```python
coinmetrics.api_client.CoinMetricsClient.catalog_full_market_candles_v2(
    markets=None,
    exchange=None,
    market_type=None,
    base=None,
    quote=None,
    asset=None,
    symbol=None,
    start_time=None,
    end_time=None,
    start_inclusive=None,
    end_inclusive=None,
    timezone=None,
    format='json_stream',
    page_size=None,
    paging_from=None,
    next_page_token=None,
)
```

Returns a list of all markets with candles support along with time ranges of available data per candle
duration.

* **Parameters:**
  * **markets** (*Optional* *[**Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]* *]*) -- Comma separated list of markets. By default all markets are returned.
  * **exchange** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Unique name of an exchange.
  * **market_type** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Type of markets.
  * **base** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Base asset of markets.
  * **quote** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Quote asset of markets.
  * **asset** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Any asset of markets.
  * **symbol** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Symbol of derivative markets, full instrument name.
  * **format** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'.
  * **start_time** (*Optional* *[**Union* *[**datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]*) -- Start time of the interval.
  * **end_time** (*Optional* *[**Union* *[**datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]*) -- End time of the interval.
  * **start_inclusive** (*Optional* *[*[*bool*](https://docs.python.org/3/library/functions.html#bool) *]*) -- Whether to include the start time in the interval.
  * **end_inclusive** (*Optional* *[*[*bool*](https://docs.python.org/3/library/functions.html#bool) *]*) -- Whether to include the end time in the interval.
  * **timezone** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Timezone of the interval.
  * **page_size** (*Optional* *[*[*int*](https://docs.python.org/3/library/functions.html#int) *]*) -- Number of items per single page of results.
  * **paging_from** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Where does the first page start, at the start of the interval or at the end.
  * **next_page_token** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use next_page_url response field.
* **Returns:**
  List of market candles statistics.
* **Return type:**
  [CatalogV2DataCollection](../data-collection.md#coinmetrics._data_collection.CatalogV2DataCollection)

<a id="coinmetrics.api_client.CoinMetricsClient.catalog_market_contract_prices_v2"></a>

### `CoinMetricsClient.catalog_market_contract_prices_v2`

```python
coinmetrics.api_client.CoinMetricsClient.catalog_market_contract_prices_v2(
    markets=None,
    exchange=None,
    market_type=None,
    base=None,
    quote=None,
    asset=None,
    symbol=None,
    format='json_stream',
    start_time=None,
    end_time=None,
    start_inclusive=None,
    end_inclusive=None,
    timezone=None,
    page_size=None,
    paging_from=None,
    next_page_token=None,
)
```

Returns a list of contract prices for option market.

* **Parameters:**
  * **markets** (*Optional* *[**Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]* *]*) -- Comma separated list of markets. By default all markets are returned.
  * **exchange** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Unique name of an exchange.
  * **market_type** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Type of markets.
  * **base** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Base asset of markets.
  * **quote** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Quote asset of markets.
  * **asset** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Any asset of markets.
  * **symbol** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Symbol of derivative markets, full instrument name.
  * **format** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'.
  * **start_time** (*Optional* *[**Union* *[**datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]*) -- Start time of the interval.
  * **end_time** (*Optional* *[**Union* *[**datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]*) -- End time of the interval.
  * **start_inclusive** (*Optional* *[*[*bool*](https://docs.python.org/3/library/functions.html#bool) *]*) -- Whether to include the start time in the interval.
  * **end_inclusive** (*Optional* *[*[*bool*](https://docs.python.org/3/library/functions.html#bool) *]*) -- Whether to include the end time in the interval.
  * **timezone** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Timezone of the interval.
  * **page_size** (*Optional* *[*[*int*](https://docs.python.org/3/library/functions.html#int) *]*) -- Number of items per single page of results.
  * **paging_from** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Where does the first page start, at the start of the interval or at the end.
  * **next_page_token** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use next_page_url response field.
* **Returns:**
  List of contract prices statistics.
* **Return type:**
  [CatalogV2DataCollection](../data-collection.md#coinmetrics._data_collection.CatalogV2DataCollection)

<a id="coinmetrics.api_client.CoinMetricsClient.catalog_full_market_contract_prices_v2"></a>

### `CoinMetricsClient.catalog_full_market_contract_prices_v2`

```python
coinmetrics.api_client.CoinMetricsClient.catalog_full_market_contract_prices_v2(
    markets=None,
    exchange=None,
    market_type=None,
    base=None,
    quote=None,
    asset=None,
    symbol=None,
    start_time=None,
    end_time=None,
    start_inclusive=None,
    end_inclusive=None,
    timezone=None,
    format='json_stream',
    page_size=None,
    paging_from=None,
    next_page_token=None,
)
```

Returns a list of all market contract prices for option market.

* **Parameters:**
  * **markets** (*Optional* *[**Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]* *]*) -- Comma separated list of markets. By default all markets are returned.
  * **exchange** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Unique name of an exchange.
  * **market_type** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Type of markets.
  * **base** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Base asset of markets.
  * **quote** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Quote asset of markets.
  * **asset** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Any asset of markets.
  * **symbol** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Symbol of derivative markets, full instrument name.
  * **format** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'.
  * **start_time** (*Optional* *[**Union* *[**datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]*) -- Start time of the interval.
  * **end_time** (*Optional* *[**Union* *[**datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]*) -- End time of the interval.
  * **start_inclusive** (*Optional* *[*[*bool*](https://docs.python.org/3/library/functions.html#bool) *]*) -- Whether to include the start time in the interval.
  * **end_inclusive** (*Optional* *[*[*bool*](https://docs.python.org/3/library/functions.html#bool) *]*) -- Whether to include the end time in the interval.
  * **timezone** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Timezone of the interval.
  * **page_size** (*Optional* *[*[*int*](https://docs.python.org/3/library/functions.html#int) *]*) -- Number of items per single page of results.
  * **paging_from** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Where does the first page start, at the start of the interval or at the end.
  * **next_page_token** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use next_page_url response field.
* **Returns:**
  List of contract prices statistics.
* **Return type:**
  [CatalogV2DataCollection](../data-collection.md#coinmetrics._data_collection.CatalogV2DataCollection)

<a id="coinmetrics.api_client.CoinMetricsClient.catalog_market_funding_rates_predicted_v2"></a>

### `CoinMetricsClient.catalog_market_funding_rates_predicted_v2`

```python
coinmetrics.api_client.CoinMetricsClient.catalog_market_funding_rates_predicted_v2(
    markets=None,
    exchange=None,
    market_type=None,
    base=None,
    quote=None,
    asset=None,
    symbol=None,
    start_time=None,
    end_time=None,
    start_inclusive=None,
    end_inclusive=None,
    timezone=None,
    format='json_stream',
    page_size=None,
    paging_from=None,
    next_page_token=None,
)
```

Returns a list of markets with predicted funding rates support along with the time ranges of available
data.

* **Parameters:**
  * **markets** (*Optional* *[**Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]* *]*) -- Comma separated list of markets. By default all markets are returned.
  * **exchange** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Unique name of an exchange.
  * **market_type** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Type of markets.
  * **base** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Base asset of markets.
  * **quote** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Quote asset of markets.
  * **asset** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Any asset of markets.
  * **symbol** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Symbol of derivative markets, full instrument name.
  * **start_time** (*Optional* *[**Union* *[**datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]*) -- Start time of the interval.
  * **end_time** (*Optional* *[**Union* *[**datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]*) -- End time of the interval.
  * **start_inclusive** (*Optional* *[*[*bool*](https://docs.python.org/3/library/functions.html#bool) *]*) -- Whether to include the start time in the interval.
  * **end_inclusive** (*Optional* *[*[*bool*](https://docs.python.org/3/library/functions.html#bool) *]*) -- Whether to include the end time in the interval.
  * **timezone** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Timezone of the interval.
  * **format** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'.
  * **page_size** (*Optional* *[*[*int*](https://docs.python.org/3/library/functions.html#int) *]*) -- Number of items per single page of results.
  * **paging_from** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Where does the first page start, at the start of the interval or at the end.
  * **next_page_token** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use next_page_url response field.
* **Returns:**
  List of market funding rates statistics.
* **Return type:**
  [CatalogV2DataCollection](../data-collection.md#coinmetrics._data_collection.CatalogV2DataCollection)

<a id="coinmetrics.api_client.CoinMetricsClient.catalog_full_market_funding_rates_predicted_v2"></a>

### `CoinMetricsClient.catalog_full_market_funding_rates_predicted_v2`

```python
coinmetrics.api_client.CoinMetricsClient.catalog_full_market_funding_rates_predicted_v2(
    markets=None,
    exchange=None,
    market_type=None,
    base=None,
    quote=None,
    asset=None,
    symbol=None,
    start_time=None,
    end_time=None,
    format='json_stream',
    start_inclusive=None,
    end_inclusive=None,
    timezone=None,
    page_size=None,
    paging_from=None,
    next_page_token=None,
)
```

Returns a list of all markets with predicted funding rates support along with the time ranges of
available data.

* **Parameters:**
  * **markets** (*Optional* *[**Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]* *]*) -- Comma separated list of markets. By default all markets are returned.
  * **exchange** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Unique name of an exchange.
  * **market_type** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Type of markets.
  * **base** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Base asset of markets.
  * **quote** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Quote asset of markets.
  * **asset** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Any asset of markets.
  * **symbol** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Symbol of derivative markets, full instrument name.
  * **start_time** (*Optional* *[**Union* *[**datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]*) -- Start time of the interval.
  * **end_time** (*Optional* *[**Union* *[**datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]*) -- End time of the interval.
  * **start_inclusive** (*Optional* *[*[*bool*](https://docs.python.org/3/library/functions.html#bool) *]*) -- Whether to include the start time in the interval.
  * **end_inclusive** (*Optional* *[*[*bool*](https://docs.python.org/3/library/functions.html#bool) *]*) -- Whether to include the end time in the interval.
  * **timezone** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Timezone of the interval.
  * **format** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'.
  * **page_size** (*Optional* *[*[*int*](https://docs.python.org/3/library/functions.html#int) *]*) -- Number of items per single page of results.
  * **paging_from** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Where does the first page start, at the start of the interval or at the end.
  * **next_page_token** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use next_page_url response field.
* **Returns:**
  List of market funding rates statistics.
* **Return type:**
  [CatalogV2DataCollection](../data-collection.md#coinmetrics._data_collection.CatalogV2DataCollection)

<a id="coinmetrics.api_client.CoinMetricsClient.catalog_market_funding_rates_v2"></a>

### `CoinMetricsClient.catalog_market_funding_rates_v2`

```python
coinmetrics.api_client.CoinMetricsClient.catalog_market_funding_rates_v2(
    markets=None,
    exchange=None,
    market_type=None,
    base=None,
    quote=None,
    asset=None,
    symbol=None,
    start_time=None,
    end_time=None,
    start_inclusive=None,
    end_inclusive=None,
    timezone=None,
    format='json_stream',
    page_size=None,
    paging_from=None,
    next_page_token=None,
)
```

Returns a list of markets with funding rates support along with the time ranges of available data.

* **Parameters:**
  * **markets** (*Optional* *[**Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]* *]*) -- Comma separated list of markets. By default all markets are returned.
  * **exchange** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Unique name of an exchange.
  * **market_type** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Type of markets.
  * **base** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Base asset of markets.
  * **quote** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Quote asset of markets.
  * **asset** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Any asset of markets.
  * **symbol** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Symbol of derivative markets, full instrument name.
  * **start_time** (*Optional* *[**Union* *[**datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]*) -- Start time of the interval.
  * **end_time** (*Optional* *[**Union* *[**datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]*) -- End time of the interval.
  * **start_inclusive** (*Optional* *[*[*bool*](https://docs.python.org/3/library/functions.html#bool) *]*) -- Whether to include the start time in the interval.
  * **end_inclusive** (*Optional* *[*[*bool*](https://docs.python.org/3/library/functions.html#bool) *]*) -- Whether to include the end time in the interval.
  * **timezone** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Timezone of the interval.
  * **format** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'.
  * **page_size** (*Optional* *[*[*int*](https://docs.python.org/3/library/functions.html#int) *]*) -- Number of items per single page of results.
  * **paging_from** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Where does the first page start, at the start of the interval or at the end.
  * **next_page_token** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use next_page_url response field.
* **Returns:**
  List of market funding rates statistics.
* **Return type:**
  [CatalogV2DataCollection](../data-collection.md#coinmetrics._data_collection.CatalogV2DataCollection)

<a id="coinmetrics.api_client.CoinMetricsClient.catalog_full_market_funding_rates_v2"></a>

### `CoinMetricsClient.catalog_full_market_funding_rates_v2`

```python
coinmetrics.api_client.CoinMetricsClient.catalog_full_market_funding_rates_v2(
    markets=None,
    exchange=None,
    market_type=None,
    base=None,
    quote=None,
    asset=None,
    symbol=None,
    start_time=None,
    end_time=None,
    start_inclusive=None,
    end_inclusive=None,
    timezone=None,
    format='json_stream',
    page_size=None,
    paging_from=None,
    next_page_token=None,
)
```

Returns a list of all markets with funding rates support along with the time ranges of available data.

* **Parameters:**
  * **markets** (*Optional* *[**Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]* *]*) -- Comma separated list of markets. By default all markets are returned.
  * **exchange** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Unique name of an exchange.
  * **market_type** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Type of markets.
  * **base** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Base asset of markets.
  * **quote** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Quote asset of markets.
  * **asset** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Any asset of markets.
  * **symbol** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Symbol of derivative markets, full instrument name.
  * **start_time** (*Optional* *[**Union* *[**datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]*) -- Start time of the interval.
  * **end_time** (*Optional* *[**Union* *[**datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]*) -- End time of the interval.
  * **start_inclusive** (*Optional* *[*[*bool*](https://docs.python.org/3/library/functions.html#bool) *]*) -- Whether to include the start time in the interval.
  * **end_inclusive** (*Optional* *[*[*bool*](https://docs.python.org/3/library/functions.html#bool) *]*) -- Whether to include the end time in the interval.
  * **timezone** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Timezone of the interval.
  * **format** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'.
  * **page_size** (*Optional* *[*[*int*](https://docs.python.org/3/library/functions.html#int) *]*) -- Number of items per single page of results.
  * **paging_from** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Where does the first page start, at the start of the interval or at the end.
  * **next_page_token** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use next_page_url response field.
* **Returns:**
  List of market funding rates statistics.
* **Return type:**
  [CatalogV2DataCollection](../data-collection.md#coinmetrics._data_collection.CatalogV2DataCollection)

<a id="coinmetrics.api_client.CoinMetricsClient.catalog_market_greeks_v2"></a>

### `CoinMetricsClient.catalog_market_greeks_v2`

```python
coinmetrics.api_client.CoinMetricsClient.catalog_market_greeks_v2(
    markets=None,
    exchange=None,
    market_type=None,
    base=None,
    quote=None,
    asset=None,
    symbol=None,
    start_time=None,
    end_time=None,
    start_inclusive=None,
    end_inclusive=None,
    timezone=None,
    format='json_stream',
    page_size=None,
    paging_from=None,
    next_page_token=None,
)
```

Returns a list of greeks for option market.

* **Parameters:**
  * **markets** (*Optional* *[**Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]* *]*) -- Comma separated list of markets. By default all markets are returned.
  * **exchange** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Unique name of an exchange.
  * **market_type** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Type of markets.
  * **base** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Base asset of markets.
  * **quote** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Quote asset of markets.
  * **asset** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Any asset of markets.
  * **symbol** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Symbol of derivative markets, full instrument name.
  * **start_time** (*Optional* *[**Union* *[**datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]*) -- Start time of the interval.
  * **end_time** (*Optional* *[**Union* *[**datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]*) -- End time of the interval.
  * **start_inclusive** (*Optional* *[*[*bool*](https://docs.python.org/3/library/functions.html#bool) *]*) -- Whether to include the start time in the interval.
  * **end_inclusive** (*Optional* *[*[*bool*](https://docs.python.org/3/library/functions.html#bool) *]*) -- Whether to include the end time in the interval.
  * **timezone** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Timezone of the interval.
  * **format** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'.
  * **page_size** (*Optional* *[*[*int*](https://docs.python.org/3/library/functions.html#int) *]*) -- Number of items per single page of results.
  * **paging_from** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Where does the first page start, at the start of the interval or at the end.
  * **next_page_token** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use next_page_url response field.
* **Returns:**
  List of greeks statistics.
* **Return type:**
  [CatalogV2DataCollection](../data-collection.md#coinmetrics._data_collection.CatalogV2DataCollection)

<a id="coinmetrics.api_client.CoinMetricsClient.catalog_full_market_greeks_v2"></a>

### `CoinMetricsClient.catalog_full_market_greeks_v2`

```python
coinmetrics.api_client.CoinMetricsClient.catalog_full_market_greeks_v2(
    markets=None,
    exchange=None,
    market_type=None,
    base=None,
    quote=None,
    asset=None,
    symbol=None,
    start_time=None,
    end_time=None,
    start_inclusive=None,
    end_inclusive=None,
    timezone=None,
    format='json_stream',
    page_size=None,
    paging_from=None,
    next_page_token=None,
)
```

Returns a list of all market greeks for option market.

* **Parameters:**
  * **markets** (*Optional* *[**Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]* *]*) -- Comma separated list of markets. By default all markets are returned.
  * **exchange** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Unique name of an exchange.
  * **market_type** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Type of markets.
  * **base** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Base asset of markets.
  * **quote** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Quote asset of markets.
  * **asset** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Any asset of markets.
  * **symbol** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Symbol of derivative markets, full instrument name.
  * **start_time** (*Optional* *[**Union* *[**datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]*) -- Start time of the interval.
  * **end_time** (*Optional* *[**Union* *[**datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]*) -- End time of the interval.
  * **start_inclusive** (*Optional* *[*[*bool*](https://docs.python.org/3/library/functions.html#bool) *]*) -- Whether to include the start time in the interval.
  * **end_inclusive** (*Optional* *[*[*bool*](https://docs.python.org/3/library/functions.html#bool) *]*) -- Whether to include the end time in the interval.
  * **timezone** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Timezone of the interval.
  * **format** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'.
  * **page_size** (*Optional* *[*[*int*](https://docs.python.org/3/library/functions.html#int) *]*) -- Number of items per single page of results.
  * **paging_from** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Where does the first page start, at the start of the interval or at the end.
  * **next_page_token** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use next_page_url response field.
* **Returns:**
  List of greeks statistics.
* **Return type:**
  [CatalogV2DataCollection](../data-collection.md#coinmetrics._data_collection.CatalogV2DataCollection)

<a id="coinmetrics.api_client.CoinMetricsClient.catalog_market_implied_volatility_v2"></a>

### `CoinMetricsClient.catalog_market_implied_volatility_v2`

```python
coinmetrics.api_client.CoinMetricsClient.catalog_market_implied_volatility_v2(
    markets=None,
    exchange=None,
    market_type=None,
    base=None,
    quote=None,
    asset=None,
    symbol=None,
    format='json_stream',
    start_time=None,
    end_time=None,
    start_inclusive=None,
    end_inclusive=None,
    timezone=None,
    page_size=None,
    paging_from=None,
    next_page_token=None,
)
```

Returns a list of implied volatility for option market.

* **Parameters:**
  * **markets** (*Optional* *[**Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]* *]*) -- Comma separated list of markets. By default all markets are returned.
  * **exchange** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Unique name of an exchange.
  * **market_type** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Type of markets.
  * **base** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Base asset of markets.
  * **quote** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Quote asset of markets.
  * **asset** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Any asset of markets.
  * **symbol** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Symbol of derivative markets, full instrument name.
  * **format** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'.
  * **start_time** (*Optional* *[**Union* *[**datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]*) -- Start time of the interval.
  * **end_time** (*Optional* *[**Union* *[**datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]*) -- End time of the interval.
  * **start_inclusive** (*Optional* *[*[*bool*](https://docs.python.org/3/library/functions.html#bool) *]*) -- Whether to include the start time in the interval.
  * **end_inclusive** (*Optional* *[*[*bool*](https://docs.python.org/3/library/functions.html#bool) *]*) -- Whether to include the end time in the interval.
  * **timezone** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Timezone of the interval.
  * **page_size** (*Optional* *[*[*int*](https://docs.python.org/3/library/functions.html#int) *]*) -- Number of items per single page of results.
  * **paging_from** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Where does the first page start, at the start of the interval or at the end.
  * **next_page_token** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use next_page_url response field.
* **Returns:**
  List of implied volatility statistics.
* **Return type:**
  [CatalogV2DataCollection](../data-collection.md#coinmetrics._data_collection.CatalogV2DataCollection)

<a id="coinmetrics.api_client.CoinMetricsClient.catalog_full_market_implied_volatility_v2"></a>

### `CoinMetricsClient.catalog_full_market_implied_volatility_v2`

```python
coinmetrics.api_client.CoinMetricsClient.catalog_full_market_implied_volatility_v2(
    markets=None,
    exchange=None,
    market_type=None,
    base=None,
    quote=None,
    asset=None,
    symbol=None,
    start_time=None,
    end_time=None,
    start_inclusive=None,
    end_inclusive=None,
    timezone=None,
    format='json_stream',
    page_size=None,
    paging_from=None,
    next_page_token=None,
)
```

Returns a list of all market implied volatility for option market.

* **Parameters:**
  * **markets** (*Optional* *[**Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]* *]*) -- Comma separated list of markets. By default all markets are returned.
  * **exchange** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Unique name of an exchange.
  * **market_type** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Type of markets.
  * **base** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Base asset of markets.
  * **quote** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Quote asset of markets.
  * **asset** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Any asset of markets.
  * **symbol** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Symbol of derivative markets, full instrument name.
  * **start_time** (*Optional* *[**Union* *[**datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]*) -- Start time of the interval.
  * **end_time** (*Optional* *[**Union* *[**datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]*) -- End time of the interval.
  * **start_inclusive** (*Optional* *[*[*bool*](https://docs.python.org/3/library/functions.html#bool) *]*) -- Whether to include the start time in the interval.
  * **end_inclusive** (*Optional* *[*[*bool*](https://docs.python.org/3/library/functions.html#bool) *]*) -- Whether to include the end time in the interval.
  * **timezone** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Timezone of the interval.
  * **format** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'.
  * **page_size** (*Optional* *[*[*int*](https://docs.python.org/3/library/functions.html#int) *]*) -- Number of items per single page of results.
  * **paging_from** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Where does the first page start, at the start of the interval or at the end.
  * **next_page_token** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use next_page_url response field.
* **Returns:**
  List of implied volatility statistics.
* **Return type:**
  [CatalogV2DataCollection](../data-collection.md#coinmetrics._data_collection.CatalogV2DataCollection)

<a id="coinmetrics.api_client.CoinMetricsClient.catalog_market_liquidations_v2"></a>

### `CoinMetricsClient.catalog_market_liquidations_v2`

```python
coinmetrics.api_client.CoinMetricsClient.catalog_market_liquidations_v2(
    markets=None,
    exchange=None,
    market_type=None,
    base=None,
    quote=None,
    asset=None,
    symbol=None,
    start_time=None,
    end_time=None,
    start_inclusive=None,
    end_inclusive=None,
    timezone=None,
    format='json_stream',
    page_size=None,
    paging_from=None,
    next_page_token=None,
)
```

Returns a list of markets with liquidations support along with the time ranges of available data.

* **Parameters:**
  * **markets** (*Optional* *[**Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]* *]*) -- Comma separated list of markets. By default all markets are returned.
  * **exchange** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Unique name of an exchange.
  * **market_type** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Type of markets.
  * **base** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Base asset of markets.
  * **quote** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Quote asset of markets.
  * **asset** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Any asset of markets.
  * **symbol** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Symbol of derivative markets, full instrument name.
  * **start_time** (*Optional* *[**Union* *[**datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]*) -- Start time of the interval.
  * **end_time** (*Optional* *[**Union* *[**datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]*) -- End time of the interval.
  * **start_inclusive** (*Optional* *[*[*bool*](https://docs.python.org/3/library/functions.html#bool) *]*) -- Whether to include the start time in the interval.
  * **end_inclusive** (*Optional* *[*[*bool*](https://docs.python.org/3/library/functions.html#bool) *]*) -- Whether to include the end time in the interval.
  * **timezone** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Timezone of the interval.
  * **format** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'.
  * **page_size** (*Optional* *[*[*int*](https://docs.python.org/3/library/functions.html#int) *]*) -- Number of items per single page of results.
  * **paging_from** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Where does the first page start, at the start of the interval or at the end.
  * **next_page_token** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use next_page_url response field.
* **Returns:**
  List of market liquidations statistics.
* **Return type:**
  [CatalogV2DataCollection](../data-collection.md#coinmetrics._data_collection.CatalogV2DataCollection)

<a id="coinmetrics.api_client.CoinMetricsClient.catalog_full_market_liquidations_v2"></a>

### `CoinMetricsClient.catalog_full_market_liquidations_v2`

```python
coinmetrics.api_client.CoinMetricsClient.catalog_full_market_liquidations_v2(
    markets=None,
    exchange=None,
    market_type=None,
    base=None,
    quote=None,
    asset=None,
    symbol=None,
    start_time=None,
    end_time=None,
    start_inclusive=None,
    end_inclusive=None,
    timezone=None,
    format='json_stream',
    page_size=None,
    paging_from=None,
    next_page_token=None,
)
```

Returns a list of all markets with liquidations support along with the time ranges of available data.

* **Parameters:**
  * **markets** (*Optional* *[**Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]* *]*) -- Comma separated list of markets. By default all markets are returned.
  * **exchange** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Unique name of an exchange.
  * **market_type** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Type of markets.
  * **base** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Base asset of markets.
  * **quote** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Quote asset of markets.
  * **asset** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Any asset of markets.
  * **symbol** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Symbol of derivative markets, full instrument name.
  * **start_time** (*Optional* *[**Union* *[**datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]*) -- Start time of the interval.
  * **end_time** (*Optional* *[**Union* *[**datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]*) -- End time of the interval.
  * **start_inclusive** (*Optional* *[*[*bool*](https://docs.python.org/3/library/functions.html#bool) *]*) -- Whether to include the start time in the interval.
  * **end_inclusive** (*Optional* *[*[*bool*](https://docs.python.org/3/library/functions.html#bool) *]*) -- Whether to include the end time in the interval.
  * **timezone** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Timezone of the interval.
  * **format** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'.
  * **page_size** (*Optional* *[*[*int*](https://docs.python.org/3/library/functions.html#int) *]*) -- Number of items per single page of results.
  * **paging_from** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Where does the first page start, at the start of the interval or at the end.
  * **next_page_token** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use next_page_url response field.
* **Returns:**
  List of market liquidations statistics.
* **Return type:**
  [CatalogV2DataCollection](../data-collection.md#coinmetrics._data_collection.CatalogV2DataCollection)

<a id="coinmetrics.api_client.CoinMetricsClient.catalog_market_metrics_v2"></a>

### `CoinMetricsClient.catalog_market_metrics_v2`

```python
coinmetrics.api_client.CoinMetricsClient.catalog_market_metrics_v2(
    markets=None,
    metrics=None,
    exchange=None,
    market_type=None,
    base=None,
    quote=None,
    asset=None,
    symbol=None,
    format='json_stream',
    page_size=None,
    paging_from=None,
    next_page_token=None,
)
```

Returns a list of markets with metrics support along with the time ranges of available data per
metric.

* **Parameters:**
  * **markets** (*Optional* *[**Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]* *]*) -- Comma separated list of markets. By default all markets are returned.
  * **metrics** (*Optional* *[**Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]* *]*) -- Comma separated list of metrics. By default all metrics are returned.
  * **exchange** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Unique name of an exchange.
  * **market_type** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Type of markets.
  * **base** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Base asset of markets.
  * **quote** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Quote asset of markets.
  * **asset** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Any asset of markets.
  * **symbol** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Symbol of derivative markets, full instrument name.
  * **format** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'.
  * **page_size** (*Optional* *[*[*int*](https://docs.python.org/3/library/functions.html#int) *]*) -- Number of items per single page of results.
  * **paging_from** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Where does the first page start, at the start of the interval or at the end.
  * **next_page_token** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use next_page_url response field.
* **Returns:**
  List of market metrics statistics.
* **Return type:**
  [CatalogV2DataCollection](../data-collection.md#coinmetrics._data_collection.CatalogV2DataCollection)

<a id="coinmetrics.api_client.CoinMetricsClient.catalog_full_market_metrics_v2"></a>

### `CoinMetricsClient.catalog_full_market_metrics_v2`

```python
coinmetrics.api_client.CoinMetricsClient.catalog_full_market_metrics_v2(
    markets=None,
    metrics=None,
    exchange=None,
    market_type=None,
    base=None,
    quote=None,
    asset=None,
    symbol=None,
    format='json_stream',
    page_size=None,
    paging_from=None,
    next_page_token=None,
)
```

Returns a list of all markets with market metrics support along with time ranges of available data per
metric.

* **Parameters:**
  * **markets** (*Optional* *[**Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]* *]*) -- Comma separated list of markets. By default all markets are returned.
  * **metrics** (*Optional* *[**Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]* *]*) -- Comma separated list of metrics. By default all metrics are returned.
  * **exchange** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Unique name of an exchange.
  * **market_type** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Type of markets.
  * **base** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Base asset of markets.
  * **quote** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Quote asset of markets.
  * **asset** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Any asset of markets.
  * **symbol** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Symbol of derivative markets, full instrument name.
  * **format** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'.
  * **page_size** (*Optional* *[*[*int*](https://docs.python.org/3/library/functions.html#int) *]*) -- Number of items per single page of results.
  * **paging_from** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Where does the first page start, at the start of the interval or at the end.
  * **next_page_token** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use next_page_url response field.
* **Returns:**
  List of market metrics statistics.
* **Return type:**
  [CatalogV2DataCollection](../data-collection.md#coinmetrics._data_collection.CatalogV2DataCollection)

<a id="coinmetrics.api_client.CoinMetricsClient.catalog_market_open_interest_v2"></a>

### `CoinMetricsClient.catalog_market_open_interest_v2`

```python
coinmetrics.api_client.CoinMetricsClient.catalog_market_open_interest_v2(
    markets=None,
    exchange=None,
    market_type=None,
    base=None,
    quote=None,
    asset=None,
    symbol=None,
    format='json_stream',
    start_time=None,
    end_time=None,
    start_inclusive=None,
    end_inclusive=None,
    timezone=None,
    page_size=None,
    paging_from=None,
    next_page_token=None,
)
```

Returns a list of markets with open interest support along with the time ranges of available data.

* **Parameters:**
  * **markets** (*Optional* *[**Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]* *]*) -- Comma separated list of markets. By default all markets are returned.
  * **exchange** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Unique name of an exchange.
  * **market_type** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Type of markets.
  * **base** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Base asset of markets.
  * **quote** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Quote asset of markets.
  * **asset** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Any asset of markets.
  * **symbol** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Symbol of derivative markets, full instrument name.
  * **start_inclusive** (*Optional* *[*[*bool*](https://docs.python.org/3/library/functions.html#bool) *]*) -- Whether to include the start time in the interval.
  * **end_inclusive** (*Optional* *[*[*bool*](https://docs.python.org/3/library/functions.html#bool) *]*) -- Whether to include the end time in the interval.
  * **timezone** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Timezone of the interval.
  * **start_time** (*Optional* *[**Union* *[**datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]*) -- Start time of the interval.
  * **end_time** (*Optional* *[**Union* *[**datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]*) -- End time of the interval.
  * **format** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'.
  * **page_size** (*Optional* *[*[*int*](https://docs.python.org/3/library/functions.html#int) *]*) -- Number of items per single page of results.
  * **paging_from** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Where does the first page start, at the start of the interval or at the end.
  * **next_page_token** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use next_page_url response field.
* **Returns:**
  List of market open interest statistics.
* **Return type:**
  [CatalogV2DataCollection](../data-collection.md#coinmetrics._data_collection.CatalogV2DataCollection)

<a id="coinmetrics.api_client.CoinMetricsClient.catalog_full_market_open_interest_v2"></a>

### `CoinMetricsClient.catalog_full_market_open_interest_v2`

```python
coinmetrics.api_client.CoinMetricsClient.catalog_full_market_open_interest_v2(
    markets=None,
    exchange=None,
    market_type=None,
    base=None,
    quote=None,
    asset=None,
    symbol=None,
    start_time=None,
    end_time=None,
    start_inclusive=None,
    end_inclusive=None,
    timezone=None,
    format='json_stream',
    page_size=None,
    paging_from=None,
    next_page_token=None,
)
```

Returns a list of all markets with open interest support along with the time ranges of available data.

* **Parameters:**
  * **markets** (*Optional* *[**Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]* *]*) -- Comma separated list of markets. By default all markets are returned.
  * **exchange** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Unique name of an exchange.
  * **market_type** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Type of markets.
  * **base** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Base asset of markets.
  * **quote** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Quote asset of markets.
  * **asset** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Any asset of markets.
  * **symbol** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Symbol of derivative markets, full instrument name.
  * **start_time** (*Optional* *[**Union* *[**datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]*) -- Start time of the interval.
  * **end_time** (*Optional* *[**Union* *[**datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]*) -- End time of the interval.
  * **start_inclusive** (*Optional* *[*[*bool*](https://docs.python.org/3/library/functions.html#bool) *]*) -- Whether to include the start time in the interval.
  * **end_inclusive** (*Optional* *[*[*bool*](https://docs.python.org/3/library/functions.html#bool) *]*) -- Whether to include the end time in the interval.
  * **timezone** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Timezone of the interval.
  * **format** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'.
  * **page_size** (*Optional* *[*[*int*](https://docs.python.org/3/library/functions.html#int) *]*) -- Number of items per single page of results.
  * **paging_from** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Where does the first page start, at the start of the interval or at the end.
  * **next_page_token** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use next_page_url response field.
* **Returns:**
  List of market open interest statistics.
* **Return type:**
  [CatalogV2DataCollection](../data-collection.md#coinmetrics._data_collection.CatalogV2DataCollection)

<a id="coinmetrics.api_client.CoinMetricsClient.catalog_market_orderbooks_v2"></a>

### `CoinMetricsClient.catalog_market_orderbooks_v2`

```python
coinmetrics.api_client.CoinMetricsClient.catalog_market_orderbooks_v2(
    markets=None,
    exchange=None,
    market_type=None,
    base=None,
    quote=None,
    asset=None,
    symbol=None,
    start_time=None,
    end_time=None,
    start_inclusive=None,
    end_inclusive=None,
    timezone=None,
    format='json_stream',
    page_size=None,
    paging_from=None,
    next_page_token=None,
)
```

Returns a list of markets with orderbooks support along with the time ranges of available data.

* **Parameters:**
  * **markets** (*Optional* *[**Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]* *]*) -- Comma separated list of markets. By default all markets are returned.
  * **exchange** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Unique name of an exchange.
  * **market_type** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Type of markets.
  * **base** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Base asset of markets.
  * **quote** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Quote asset of markets.
  * **asset** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Any asset of markets.
  * **symbol** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Symbol of derivative markets, full instrument name.
  * **start_time** (*Optional* *[**Union* *[**datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]*) -- Start time of the interval.
  * **end_time** (*Optional* *[**Union* *[**datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]*) -- End time of the interval.
  * **start_inclusive** (*Optional* *[*[*bool*](https://docs.python.org/3/library/functions.html#bool) *]*) -- Whether to include the start time in the interval.
  * **end_inclusive** (*Optional* *[*[*bool*](https://docs.python.org/3/library/functions.html#bool) *]*) -- Whether to include the end time in the interval.
  * **timezone** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Timezone of the interval.
  * **format** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'.
  * **page_size** (*Optional* *[*[*int*](https://docs.python.org/3/library/functions.html#int) *]*) -- Number of items per single page of results.
  * **paging_from** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Where does the first page start, at the start of the interval or at the end.
  * **next_page_token** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use next_page_url response field.
* **Returns:**
  List of market orderbooks statistics.
* **Return type:**
  [CatalogV2DataCollection](../data-collection.md#coinmetrics._data_collection.CatalogV2DataCollection)

<a id="coinmetrics.api_client.CoinMetricsClient.catalog_full_market_orderbooks_v2"></a>

### `CoinMetricsClient.catalog_full_market_orderbooks_v2`

```python
coinmetrics.api_client.CoinMetricsClient.catalog_full_market_orderbooks_v2(
    markets=None,
    exchange=None,
    market_type=None,
    base=None,
    quote=None,
    asset=None,
    symbol=None,
    start_time=None,
    end_time=None,
    start_inclusive=None,
    end_inclusive=None,
    timezone=None,
    format='json_stream',
    page_size=None,
    paging_from=None,
    next_page_token=None,
)
```

Returns a list of all markets with orderbooks support along with the time ranges of available data.

* **Parameters:**
  * **markets** (*Optional* *[**Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]* *]*) -- Comma separated list of markets. By default all markets are returned.
  * **exchange** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Unique name of an exchange.
  * **market_type** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Type of markets.
  * **base** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Base asset of markets.
  * **quote** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Quote asset of markets.
  * **asset** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Any asset of markets.
  * **symbol** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Symbol of derivative markets, full instrument name.
  * **start_time** (*Optional* *[**Union* *[**datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]*) -- Start time of the interval.
  * **end_time** (*Optional* *[**Union* *[**datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]*) -- End time of the interval.
  * **start_inclusive** (*Optional* *[*[*bool*](https://docs.python.org/3/library/functions.html#bool) *]*) -- Whether to include the start time in the interval.
  * **end_inclusive** (*Optional* *[*[*bool*](https://docs.python.org/3/library/functions.html#bool) *]*) -- Whether to include the end time in the interval.
  * **timezone** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Timezone of the interval.
  * **format** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'.
  * **page_size** (*Optional* *[*[*int*](https://docs.python.org/3/library/functions.html#int) *]*) -- Number of items per single page of results.
  * **paging_from** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Where does the first page start, at the start of the interval or at the end.
  * **next_page_token** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use next_page_url response field.
* **Returns:**
  List of market orderbooks statistics.
* **Return type:**
  [CatalogV2DataCollection](../data-collection.md#coinmetrics._data_collection.CatalogV2DataCollection)

<a id="coinmetrics.api_client.CoinMetricsClient.catalog_market_quotes_v2"></a>

### `CoinMetricsClient.catalog_market_quotes_v2`

```python
coinmetrics.api_client.CoinMetricsClient.catalog_market_quotes_v2(
    markets=None,
    exchange=None,
    market_type=None,
    base=None,
    quote=None,
    asset=None,
    symbol=None,
    start_time=None,
    end_time=None,
    start_inclusive=None,
    end_inclusive=None,
    timezone=None,
    format='json_stream',
    page_size=None,
    paging_from=None,
    next_page_token=None,
)
```

Returns a list of markets with quotes support along with the time ranges of available data.

* **Parameters:**
  * **markets** (*Optional* *[**Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]* *]*) -- Comma separated list of markets. By default all markets are returned.
  * **exchange** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Unique name of an exchange.
  * **market_type** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Type of markets.
  * **base** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Base asset of markets.
  * **quote** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Quote asset of markets.
  * **asset** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Any asset of markets.
  * **symbol** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Symbol of derivative markets, full instrument name.
  * **start_time** (*Optional* *[**Union* *[**datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]*) -- Start time of the interval.
  * **end_time** (*Optional* *[**Union* *[**datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]*) -- End time of the interval.
  * **start_inclusive** (*Optional* *[*[*bool*](https://docs.python.org/3/library/functions.html#bool) *]*) -- Whether to include the start time in the interval.
  * **end_inclusive** (*Optional* *[*[*bool*](https://docs.python.org/3/library/functions.html#bool) *]*) -- Whether to include the end time in the interval.
  * **timezone** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Timezone of the interval.
  * **format** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'.
  * **page_size** (*Optional* *[*[*int*](https://docs.python.org/3/library/functions.html#int) *]*) -- Number of items per single page of results.
  * **paging_from** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Where does the first page start, at the start of the interval or at the end.
  * **next_page_token** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use next_page_url response field.
* **Returns:**
  List of market quotes statistics.
* **Return type:**
  [CatalogV2DataCollection](../data-collection.md#coinmetrics._data_collection.CatalogV2DataCollection)

<a id="coinmetrics.api_client.CoinMetricsClient.catalog_full_market_quotes_v2"></a>

### `CoinMetricsClient.catalog_full_market_quotes_v2`

```python
coinmetrics.api_client.CoinMetricsClient.catalog_full_market_quotes_v2(
    markets=None,
    exchange=None,
    market_type=None,
    base=None,
    quote=None,
    asset=None,
    symbol=None,
    start_time=None,
    end_time=None,
    start_inclusive=None,
    end_inclusive=None,
    timezone=None,
    format='json_stream',
    page_size=None,
    paging_from=None,
    next_page_token=None,
)
```

Returns a list of all markets with quotes support along with the time ranges of available data.

* **Parameters:**
  * **markets** (*Optional* *[**Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]* *]*) -- Comma separated list of markets. By default all markets are returned.
  * **exchange** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Unique name of an exchange.
  * **market_type** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Type of markets.
  * **base** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Base asset of markets.
  * **quote** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Quote asset of markets.
  * **asset** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Any asset of markets.
  * **symbol** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Symbol of derivative markets, full instrument name.
  * **format** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'.
  * **start_time** (*Optional* *[**Union* *[**datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]*) -- Start time of the interval.
  * **end_time** (*Optional* *[**Union* *[**datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]*) -- End time of the interval.
  * **start_inclusive** (*Optional* *[*[*bool*](https://docs.python.org/3/library/functions.html#bool) *]*) -- Whether to include the start time in the interval.
  * **end_inclusive** (*Optional* *[*[*bool*](https://docs.python.org/3/library/functions.html#bool) *]*) -- Whether to include the end time in the interval.
  * **timezone** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Timezone of the interval.
  * **page_size** (*Optional* *[*[*int*](https://docs.python.org/3/library/functions.html#int) *]*) -- Number of items per single page of results.
  * **paging_from** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Where does the first page start, at the start of the interval or at the end.
  * **next_page_token** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use next_page_url response field.
* **Returns:**
  List of market quotes statistics.
* **Return type:**
  [CatalogV2DataCollection](../data-collection.md#coinmetrics._data_collection.CatalogV2DataCollection)

<a id="coinmetrics.api_client.CoinMetricsClient.catalog_market_trades_v2"></a>

### `CoinMetricsClient.catalog_market_trades_v2`

```python
coinmetrics.api_client.CoinMetricsClient.catalog_market_trades_v2(
    markets=None,
    exchange=None,
    market_type=None,
    base=None,
    quote=None,
    asset=None,
    symbol=None,
    start_time=None,
    end_time=None,
    start_inclusive=None,
    end_inclusive=None,
    timezone=None,
    format='json_stream',
    page_size=None,
    paging_from=None,
    next_page_token=None,
)
```

Returns a list of markets with trades support along with the time ranges of available data.

* **Parameters:**
  * **markets** (*Optional* *[**Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]* *]*) -- Comma separated list of markets. By default all markets are returned.
  * **exchange** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Unique name of an exchange.
  * **market_type** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Type of markets.
  * **base** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Base asset of markets.
  * **quote** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Quote asset of markets.
  * **asset** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Any asset of markets.
  * **symbol** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Symbol of derivative markets, full instrument name.
  * **start_time** (*Optional* *[**Union* *[**datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]*) -- Start time of the interval.
  * **end_time** (*Optional* *[**Union* *[**datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]*) -- End time of the interval.
  * **start_inclusive** (*Optional* *[*[*bool*](https://docs.python.org/3/library/functions.html#bool) *]*) -- Whether to include the start time in the interval.
  * **end_inclusive** (*Optional* *[*[*bool*](https://docs.python.org/3/library/functions.html#bool) *]*) -- Whether to include the end time in the interval.
  * **timezone** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Timezone of the interval.
  * **format** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'.
  * **page_size** (*Optional* *[*[*int*](https://docs.python.org/3/library/functions.html#int) *]*) -- Number of items per single page of results.
  * **paging_from** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Where does the first page start, at the start of the interval or at the end.
  * **next_page_token** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use next_page_url response field.
* **Returns:**
  List of market trades statistics.
* **Return type:**
  [CatalogV2DataCollection](../data-collection.md#coinmetrics._data_collection.CatalogV2DataCollection)

<a id="coinmetrics.api_client.CoinMetricsClient.catalog_full_market_trades_v2"></a>

### `CoinMetricsClient.catalog_full_market_trades_v2`

```python
coinmetrics.api_client.CoinMetricsClient.catalog_full_market_trades_v2(
    markets=None,
    exchange=None,
    market_type=None,
    base=None,
    quote=None,
    asset=None,
    symbol=None,
    start_time=None,
    end_time=None,
    start_inclusive=None,
    end_inclusive=None,
    timezone=None,
    format='json_stream',
    page_size=None,
    paging_from=None,
    next_page_token=None,
)
```

Returns a list of all markets with trades support along with the time ranges of available data.

* **Parameters:**
  * **markets** (*Optional* *[**Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]* *]*) -- Comma separated list of markets. By default all markets are returned.
  * **exchange** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Unique name of an exchange.
  * **market_type** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Type of markets.
  * **base** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Base asset of markets.
  * **quote** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Quote asset of markets.
  * **asset** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Any asset of markets.
  * **symbol** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Symbol of derivative markets, full instrument name.
  * **start_time** (*Optional* *[**Union* *[**datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]*) -- Start time of the interval.
  * **end_time** (*Optional* *[**Union* *[**datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]*) -- End time of the interval.
  * **format** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'.
  * **start_inclusive** (*Optional* *[*[*bool*](https://docs.python.org/3/library/functions.html#bool) *]*) -- Whether to include the start time in the interval.
  * **end_inclusive** (*Optional* *[*[*bool*](https://docs.python.org/3/library/functions.html#bool) *]*) -- Whether to include the end time in the interval.
  * **timezone** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Timezone of the interval.
  * **page_size** (*Optional* *[*[*int*](https://docs.python.org/3/library/functions.html#int) *]*) -- Number of items per single page of results.
  * **paging_from** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Where does the first page start, at the start of the interval or at the end.
  * **next_page_token** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use next_page_url response field.
* **Returns:**
  List of market trades statistics.
* **Return type:**
  [CatalogV2DataCollection](../data-collection.md#coinmetrics._data_collection.CatalogV2DataCollection)

<a id="coinmetrics.api_client.CoinMetricsClient.catalog_mempool_feerates_v2"></a>

### `CoinMetricsClient.catalog_mempool_feerates_v2`

```python
coinmetrics.api_client.CoinMetricsClient.catalog_mempool_feerates_v2(
    assets=None,
    page_size=None,
    paging_from=None,
    next_page_token=None,
    format='json_stream',
)
```

Returns a list of available assets for the mempool-feerates endpoint along with time ranges of
available data.

* **Parameters:**
  * **assets** (*Optional* *[**Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]* *]*) -- Comma separated list of assets. By default all assets are returned.
  * **page_size** (*Optional* *[*[*int*](https://docs.python.org/3/library/functions.html#int) *]*) -- Number of items per single page of results.
  * **paging_from** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Where does the first page start, at the start of the interval or at the end.
  * **next_page_token** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use next_page_url response field.
  * **format** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'.
* **Returns:**
  List of mempool feerates assets
* **Return type:**
  [CatalogV2DataCollection](../data-collection.md#coinmetrics._data_collection.CatalogV2DataCollection)

<a id="coinmetrics.api_client.CoinMetricsClient.catalog_full_mempool_feerates_v2"></a>

### `CoinMetricsClient.catalog_full_mempool_feerates_v2`

```python
coinmetrics.api_client.CoinMetricsClient.catalog_full_mempool_feerates_v2(
    assets=None,
    page_size=None,
    paging_from=None,
    next_page_token=None,
    format='json_stream',
)
```

Returns a list of all supported assets for the mempool-feerates endpoint along with time ranges of
available data.

* **Parameters:**
  * **assets** (*Optional* *[**Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]* *]*) -- Comma separated list of assets. By default all assets are returned.
  * **page_size** (*Optional* *[*[*int*](https://docs.python.org/3/library/functions.html#int) *]*) -- Number of items per single page of results.
  * **paging_from** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Where does the first page start, at the start of the interval or at the end.
  * **next_page_token** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use next_page_url response field.
  * **format** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'.
* **Returns:**
  List of mempool feerates assets
* **Return type:**
  [CatalogV2DataCollection](../data-collection.md#coinmetrics._data_collection.CatalogV2DataCollection)

<a id="coinmetrics.api_client.CoinMetricsClient.catalog_mining_pool_tips_summaries_v2"></a>

### `CoinMetricsClient.catalog_mining_pool_tips_summaries_v2`

```python
coinmetrics.api_client.CoinMetricsClient.catalog_mining_pool_tips_summaries_v2(
    assets=None,
    page_size=None,
    paging_from=None,
    next_page_token=None,
    format='json_stream',
)
```

Returns a list of available assets for the mining-pool-tips-summary endpoint along with time ranges of
available data.

* **Parameters:**
  * **assets** (*Optional* *[**Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]* *]*) -- Comma separated list of assets. By default all assets are returned.
  * **page_size** (*Optional* *[*[*int*](https://docs.python.org/3/library/functions.html#int) *]*) -- Number of items per single page of results.
  * **paging_from** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Where does the first page start, at the start of the interval or at the end.
  * **next_page_token** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use next_page_url response field.
  * **format** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'.
* **Returns:**
  List of mining pool tips assets
* **Return type:**
  [CatalogV2DataCollection](../data-collection.md#coinmetrics._data_collection.CatalogV2DataCollection)

<a id="coinmetrics.api_client.CoinMetricsClient.catalog_full_mining_pool_tips_summaries_v2"></a>

### `CoinMetricsClient.catalog_full_mining_pool_tips_summaries_v2`

```python
coinmetrics.api_client.CoinMetricsClient.catalog_full_mining_pool_tips_summaries_v2(
    assets=None,
    page_size=None,
    paging_from=None,
    next_page_token=None,
    format='json_stream',
)
```

Returns a list of all supported assets for the mining-pool-tips-summary endpoint along with time
ranges of available data.

* **Parameters:**
  * **assets** (*Optional* *[**Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]* *]*) -- Comma separated list of assets. By default all assets are returned.
  * **page_size** (*Optional* *[*[*int*](https://docs.python.org/3/library/functions.html#int) *]*) -- Number of items per single page of results.
  * **paging_from** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Where does the first page start, at the start of the interval or at the end.
  * **next_page_token** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use next_page_url response field.
  * **format** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'.
* **Returns:**
  List of mining pool tips assets
* **Return type:**
  [CatalogV2DataCollection](../data-collection.md#coinmetrics._data_collection.CatalogV2DataCollection)

<a id="coinmetrics.api_client.CoinMetricsClient.catalog_pair_candles_v2"></a>

### `CoinMetricsClient.catalog_pair_candles_v2`

```python
coinmetrics.api_client.CoinMetricsClient.catalog_pair_candles_v2(
    pairs=None,
    page_size=None,
    paging_from=None,
    next_page_token=None,
    format='json_stream',
)
```

Returns a list of available asset pair candles along with the time ranges of available data per candle
duration.

* **Parameters:**
  * **pairs** (*Optional* *[**Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]* *]*) -- Comma separated list of asset pairs. By default, all asset pairs are returned.
  * **page_size** (*Optional* *[*[*int*](https://docs.python.org/3/library/functions.html#int) *]*) -- Number of items per single page of results.
  * **paging_from** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Where does the first page start, at the start of the interval or at the end.
  * **next_page_token** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use next_page_url response field.
  * **format** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'.
* **Returns:**
  List of asset pair candles statistics.
* **Return type:**
  [CatalogV2DataCollection](../data-collection.md#coinmetrics._data_collection.CatalogV2DataCollection)

<a id="coinmetrics.api_client.CoinMetricsClient.catalog_full_pair_candles_v2"></a>

### `CoinMetricsClient.catalog_full_pair_candles_v2`

```python
coinmetrics.api_client.CoinMetricsClient.catalog_full_pair_candles_v2(
    pairs=None,
    page_size=None,
    paging_from=None,
    next_page_token=None,
    format='json_stream',
)
```

Returns a list of all supported asset pair candles along with the time ranges of available data per
candle duration.

* **Parameters:**
  * **pairs** (*Optional* *[**Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]* *]*) -- Comma separated list of asset pairs. By default, all asset pairs are returned.
  * **page_size** (*Optional* *[*[*int*](https://docs.python.org/3/library/functions.html#int) *]*) -- Number of items per single page of results.
  * **paging_from** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Where does the first page start, at the start of the interval or at the end.
  * **next_page_token** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use next_page_url response field.
  * **format** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'.
* **Returns:**
  List of asset pair candles statistics.
* **Return type:**
  [CatalogV2DataCollection](../data-collection.md#coinmetrics._data_collection.CatalogV2DataCollection)

<a id="coinmetrics.api_client.CoinMetricsClient.catalog_pair_metrics_v2"></a>

### `CoinMetricsClient.catalog_pair_metrics_v2`

```python
coinmetrics.api_client.CoinMetricsClient.catalog_pair_metrics_v2(
    pairs=None,
    metrics=None,
    reviewable=None,
    page_size=None,
    paging_from=None,
    next_page_token=None,
    format='json_stream',
)
```

Returns a list of available pair metrics along with the time ranges of available data.

* **Parameters:**
  * **pairs** (*Optional* *[**Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]* *]*) -- Comma separated list of asset pairs. By default, all asset pairs are returned.
  * **metrics** (*Optional* *[**Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]* *]*) -- Comma separated list of metrics. By default all metrics are returned.
  * **reviewable** (*Optional* *[*[*bool*](https://docs.python.org/3/library/functions.html#bool) *]*) -- Limit to human-reviewable metrics. By default all metrics are returned.
  * **page_size** (*Optional* *[*[*int*](https://docs.python.org/3/library/functions.html#int) *]*) -- Number of items per single page of results.
  * **paging_from** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Where does the first page start, at the start of the interval or at the end.
  * **next_page_token** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use next_page_url response field.
  * **format** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'.
* **Returns:**
  List of pair metrics.
* **Return type:**
  [CatalogV2DataCollection](../data-collection.md#coinmetrics._data_collection.CatalogV2DataCollection)

<a id="coinmetrics.api_client.CoinMetricsClient.catalog_full_pair_metrics_v2"></a>

### `CoinMetricsClient.catalog_full_pair_metrics_v2`

```python
coinmetrics.api_client.CoinMetricsClient.catalog_full_pair_metrics_v2(
    pairs=None,
    metrics=None,
    reviewable=None,
    page_size=None,
    paging_from=None,
    next_page_token=None,
    format='json_stream',
)
```

Returns a list of all supported pair metrics along with the time ranges of available data.

* **Parameters:**
  * **pairs** (*Optional* *[**Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]* *]*) -- Comma separated list of asset pairs. By default, all asset pairs are returned.
  * **metrics** (*Optional* *[**Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]* *]*) -- Comma separated list of metrics. By default all metrics are returned.
  * **reviewable** (*Optional* *[*[*bool*](https://docs.python.org/3/library/functions.html#bool) *]*) -- Limit to human-reviewable metrics. By default all metrics are returned.
  * **page_size** (*Optional* *[*[*int*](https://docs.python.org/3/library/functions.html#int) *]*) -- Number of items per single page of results.
  * **paging_from** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Where does the first page start, at the start of the interval or at the end.
  * **next_page_token** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use next_page_url response field.
  * **format** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'.
* **Returns:**
  List of pair metrics.
* **Return type:**
  [CatalogV2DataCollection](../data-collection.md#coinmetrics._data_collection.CatalogV2DataCollection)

<a id="coinmetrics.api_client.CoinMetricsClient.catalog_transaction_tracker_assets_v2"></a>

### `CoinMetricsClient.catalog_transaction_tracker_assets_v2`

```python
coinmetrics.api_client.CoinMetricsClient.catalog_transaction_tracker_assets_v2(
    assets=None,
    page_size=None,
    paging_from=None,
    next_page_token=None,
    format='json_stream',
)
```

Returns a list of available assets for the transaction-tracker endpoint along with time ranges of
available data.

* **Parameters:**
  * **assets** (*Optional* *[**Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]* *]*) -- Comma separated list of assets. By default all assets are returned.
  * **page_size** (*Optional* *[*[*int*](https://docs.python.org/3/library/functions.html#int) *]*) -- Number of items per single page of results.
  * **paging_from** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Where does the first page start, at the start of the interval or at the end.
  * **next_page_token** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use next_page_url response field.
  * **format** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'.
* **Returns:**
  List of transaction tracker assets
* **Return type:**
  [CatalogV2DataCollection](../data-collection.md#coinmetrics._data_collection.CatalogV2DataCollection)

<a id="coinmetrics.api_client.CoinMetricsClient.catalog_full_transaction_tracker_assets_v2"></a>

### `CoinMetricsClient.catalog_full_transaction_tracker_assets_v2`

```python
coinmetrics.api_client.CoinMetricsClient.catalog_full_transaction_tracker_assets_v2(
    assets=None,
    page_size=None,
    paging_from=None,
    next_page_token=None,
    format='json_stream',
)
```

Returns a list of all supported assets for the transaction-tracker endpoint along with time ranges of
available data.

* **Parameters:**
  * **assets** (*Optional* *[**Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]* *]*) -- Comma separated list of assets. By default all assets are returned.
  * **page_size** (*Optional* *[*[*int*](https://docs.python.org/3/library/functions.html#int) *]*) -- Number of items per single page of results.
  * **paging_from** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Where does the first page start, at the start of the interval or at the end.
  * **next_page_token** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use next_page_url response field.
  * **format** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'.
* **Returns:**
  List of transaction tracker assets
* **Return type:**
  [CatalogV2DataCollection](../data-collection.md#coinmetrics._data_collection.CatalogV2DataCollection)
