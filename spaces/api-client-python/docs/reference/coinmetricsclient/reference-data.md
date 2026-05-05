# Reference Data

<a id="coinmetrics.api_client.CoinMetricsClient.reference_data_asset_metrics"></a>

### `CoinMetricsClient.reference_data_asset_metrics`

```python
coinmetrics.api_client.CoinMetricsClient.reference_data_asset_metrics(
    metrics=None,
    reviewable=None,
    page_size=None,
    paging_from=None,
    format='json_stream',
)
```

Returns a list of asset metrics metadata.

* **Parameters:**
  * **metrics** (*Optional* *[**Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]* *]*) -- Comma separated list of metrics. By default all metrics are returned.
  * **reviewable** (*Optional* *[*[*bool*](https://docs.python.org/3/library/functions.html#bool) *]*) -- Limit to human-reviewable metrics. By default all metrics are returned.
  * **page_size** (*Optional* *[*[*int*](https://docs.python.org/3/library/functions.html#int) *]*) -- Number of items per single page of results.
  * **paging_from** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Where does the first page start, at the start of the interval or at the end.
  * **format** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'.
* **Returns:**
  List of asset metrics metadata.
* **Return type:**
  [DataCollection](../data-collection.md#coinmetrics._data_collection.DataCollection)

<a id="coinmetrics.api_client.CoinMetricsClient.reference_data_assets"></a>

### `CoinMetricsClient.reference_data_assets`

```python
coinmetrics.api_client.CoinMetricsClient.reference_data_assets(
    assets=None,
    include=None,
    page_size=None,
    paging_from=None,
    next_page_token=None,
    format='json_stream',
)
```

Returns a list of assets metadata.

* **Parameters:**
  * **assets** (*Optional* *[**Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]* *]*) -- Comma separated list of assets. By default all assets are returned.
  * **include** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Comma-separated list of namespaces to include in response. Currently, the only supported value is talos.
  * **page_size** (*Optional* *[*[*int*](https://docs.python.org/3/library/functions.html#int) *]*) -- Number of items per single page of results.
  * **paging_from** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Where does the first page start, at the start of the interval or at the end.
  * **next_page_token** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use next_page_url response field.
  * **format** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'.
* **Returns:**
  List of assets metadata.
* **Return type:**
  [DataCollection](../data-collection.md#coinmetrics._data_collection.DataCollection)

<a id="coinmetrics.api_client.CoinMetricsClient.reference_data_exchange_asset_metrics"></a>

### `CoinMetricsClient.reference_data_exchange_asset_metrics`

```python
coinmetrics.api_client.CoinMetricsClient.reference_data_exchange_asset_metrics(
    metrics=None,
    page_size=None,
    paging_from=None,
    format='json_stream',
)
```

Returns a list of exchange asset metrics metadata.

* **Parameters:**
  * **metrics** (*Optional* *[**Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]* *]*) -- Comma separated list of metrics. By default all metrics are returned.
  * **page_size** (*Optional* *[*[*int*](https://docs.python.org/3/library/functions.html#int) *]*) -- Number of items per single page of results.
  * **paging_from** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Where does the first page start, at the start of the interval or at the end.
  * **format** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'.
* **Returns:**
  List of exchange asset metrics metadata.
* **Return type:**
  [DataCollection](../data-collection.md#coinmetrics._data_collection.DataCollection)

<a id="coinmetrics.api_client.CoinMetricsClient.reference_data_exchange_metrics"></a>

### `CoinMetricsClient.reference_data_exchange_metrics`

```python
coinmetrics.api_client.CoinMetricsClient.reference_data_exchange_metrics(
    metrics=None,
    page_size=None,
    paging_from=None,
    format='json_stream',
)
```

Returns a list of exchange metrics metadata.

* **Parameters:**
  * **metrics** (*Optional* *[**Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]* *]*) -- Comma separated list of metrics. By default all metrics are returned.
  * **page_size** (*Optional* *[*[*int*](https://docs.python.org/3/library/functions.html#int) *]*) -- Number of items per single page of results.
  * **paging_from** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Where does the first page start, at the start of the interval or at the end.
  * **format** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'.
* **Returns:**
  List of exchange metrics metadata.
* **Return type:**
  [DataCollection](../data-collection.md#coinmetrics._data_collection.DataCollection)

<a id="coinmetrics.api_client.CoinMetricsClient.reference_data_exchange_pair_metrics"></a>

### `CoinMetricsClient.reference_data_exchange_pair_metrics`

```python
coinmetrics.api_client.CoinMetricsClient.reference_data_exchange_pair_metrics(
    metrics=None,
    page_size=None,
    paging_from=None,
    format='json_stream',
)
```

Returns a list of exchange pair metrics metadata.

* **Parameters:**
  * **metrics** (*Optional* *[**Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]* *]*) -- Comma separated list of metrics. By default all metrics are returned.
  * **page_size** (*Optional* *[*[*int*](https://docs.python.org/3/library/functions.html#int) *]*) -- Number of items per single page of results.
  * **paging_from** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Where does the first page start, at the start of the interval or at the end.
  * **format** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Default: "json_stream" (catalog-v2 and reference-data, market-orderbooks and other heavy endpoints), "json" (timeseries/`*-metrics` and other lighter endpoints). Format of the response. Supported values are json, json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'.
* **Returns:**
  List of exchange asset metrics metadata.
* **Return type:**
  [DataCollection](../data-collection.md#coinmetrics._data_collection.DataCollection)

<a id="coinmetrics.api_client.CoinMetricsClient.reference_data_exchanges"></a>

### `CoinMetricsClient.reference_data_exchanges`

```python
coinmetrics.api_client.CoinMetricsClient.reference_data_exchanges(
    exchanges=None,
    include=None,
    page_size=None,
    paging_from=None,
    next_page_token=None,
    format='json_stream',
)
```

Returns a list of exchanges metadata.

* **Parameters:**
  * **exchanges** (*Optional* *[**Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]* *]*) -- Comma separated list of exchanges. By default all exchanges are returned.
  * **include** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Comma-separated list of namespaces to include in response. Currently, the only supported value is talos.
  * **page_size** (*Optional* *[*[*int*](https://docs.python.org/3/library/functions.html#int) *]*) -- Number of items per single page of results.
  * **paging_from** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Where does the first page start, at the start of the interval or at the end.
  * **next_page_token** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use next_page_url response field.
  * **format** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'.
* **Returns:**
  List of exchanges metadata.
* **Return type:**
  [DataCollection](../data-collection.md#coinmetrics._data_collection.DataCollection)

<a id="coinmetrics.api_client.CoinMetricsClient.reference_data_indexes"></a>

### `CoinMetricsClient.reference_data_indexes`

```python
coinmetrics.api_client.CoinMetricsClient.reference_data_indexes(
    indexes=None,
    page_size=None,
    paging_from=None,
    next_page_token=None,
    format='json_stream',
)
```

Returns a list of indexes metadata.

* **Parameters:**
  * **indexes** (*Optional* *[**Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]* *]*) -- Comma separated list of indexes. By default all indexes are returned.
  * **page_size** (*Optional* *[*[*int*](https://docs.python.org/3/library/functions.html#int) *]*) -- Number of items per single page of results.
  * **paging_from** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Where does the first page start, at the start of the interval or at the end.
  * **next_page_token** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use next_page_url response field.
  * **format** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'.
* **Returns:**
  List of indexes metadata.
* **Return type:**
  [DataCollection](../data-collection.md#coinmetrics._data_collection.DataCollection)

<a id="coinmetrics.api_client.CoinMetricsClient.reference_data_institution_metrics"></a>

### `CoinMetricsClient.reference_data_institution_metrics`

```python
coinmetrics.api_client.CoinMetricsClient.reference_data_institution_metrics(
    metrics=None,
    page_size=None,
    paging_from=None,
    format='json_stream',
)
```

Returns a list of institution metrics metadata.

* **Parameters:**
  * **metrics** (*Optional* *[**Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]* *]*) -- Comma separated list of metrics. By default all metrics are returned.
  * **page_size** (*Optional* *[*[*int*](https://docs.python.org/3/library/functions.html#int) *]*) -- Number of items per single page of results.
  * **paging_from** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Where does the first page start, at the start of the interval or at the end.
  * **format** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'.
* **Returns:**
  List of institution metrics metadata.
* **Return type:**
  [DataCollection](../data-collection.md#coinmetrics._data_collection.DataCollection)

<a id="coinmetrics.api_client.CoinMetricsClient.reference_data_market_metrics"></a>

### `CoinMetricsClient.reference_data_market_metrics`

```python
coinmetrics.api_client.CoinMetricsClient.reference_data_market_metrics(
    metrics=None,
    page_size=None,
    paging_from=None,
    next_page_token=None,
    format='json_stream',
)
```

Returns a list of market metrics metadata.

* **Parameters:**
  * **metrics** (*Optional* *[**Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]* *]*) -- Comma separated list of metrics. By default all metrics are returned.
  * **page_size** (*Optional* *[*[*int*](https://docs.python.org/3/library/functions.html#int) *]*) -- Number of items per single page of results.
  * **paging_from** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Where does the first page start, at the start of the interval or at the end.
  * **next_page_token** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use next_page_url response field.
  * **format** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'.
* **Returns:**
  List of market metrics metadata.
* **Return type:**
  [DataCollection](../data-collection.md#coinmetrics._data_collection.DataCollection)

<a id="coinmetrics.api_client.CoinMetricsClient.reference_data_markets"></a>

### `CoinMetricsClient.reference_data_markets`

```python
coinmetrics.api_client.CoinMetricsClient.reference_data_markets(
    markets=None,
    exchange=None,
    type=None,
    base=None,
    quote=None,
    asset=None,
    symbol=None,
    include=None,
    page_size=None,
    paging_from=None,
    next_page_token=None,
    format='json_stream',
)
```

Returns a list of markets metadata.

* **Parameters:**
  * **markets** (*Optional* *[**Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]* *]*) -- Comma separated list of markets. By default all markets are returned.
  * **exchange** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Unique name of an exchange.
  * **type** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Type of markets.
  * **base** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Base asset of markets.
  * **quote** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Quote asset of markets.
  * **asset** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Any asset of markets.
  * **symbol** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Symbol of derivative markets, full instrument name.
  * **include** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Comma-separated list of namespaces to include in response. Currently, the only supported value is talos.
  * **page_size** (*Optional* *[*[*int*](https://docs.python.org/3/library/functions.html#int) *]*) -- Number of items per single page of results.
  * **paging_from** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Where does the first page start, at the start of the interval or at the end.
  * **next_page_token** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use next_page_url response field.
  * **format** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'.
* **Returns:**
  List of markets metadata.
* **Return type:**
  [DataCollection](../data-collection.md#coinmetrics._data_collection.DataCollection)

<a id="coinmetrics.api_client.CoinMetricsClient.reference_data_pair_metrics"></a>

### `CoinMetricsClient.reference_data_pair_metrics`

```python
coinmetrics.api_client.CoinMetricsClient.reference_data_pair_metrics(
    metrics=None,
    page_size=None,
    paging_from=None,
    format='json_stream',
)
```

Returns a list of pair metrics metadata.

* **Parameters:**
  * **metrics** (*Optional* *[**Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]* *]*) -- Comma separated list of metrics. By default all metrics are returned.
  * **page_size** (*Optional* *[*[*int*](https://docs.python.org/3/library/functions.html#int) *]*) -- Number of items per single page of results.
  * **paging_from** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Where does the first page start, at the start of the interval or at the end.
  * **format** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'.
* **Returns:**
  List of pair metrics metadata.
* **Return type:**
  [DataCollection](../data-collection.md#coinmetrics._data_collection.DataCollection)

<a id="coinmetrics.api_client.CoinMetricsClient.reference_data_pairs"></a>

### `CoinMetricsClient.reference_data_pairs`

```python
coinmetrics.api_client.CoinMetricsClient.reference_data_pairs(
    pairs=None,
    page_size=None,
    paging_from=None,
    next_page_token=None,
    format='json_stream',
)
```

Returns a list of pairs metadata.

* **Parameters:**
  * **pairs** (*Optional* *[**Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]* *]*) -- Comma separated list of asset pairs. By default, all asset pairs are returned.
  * **page_size** (*Optional* *[*[*int*](https://docs.python.org/3/library/functions.html#int) *]*) -- Number of items per single page of results.
  * **paging_from** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Where does the first page start, at the start of the interval or at the end.
  * **next_page_token** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use next_page_url response field.
  * **format** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'.
* **Returns:**
  List of pairs metadata.
* **Return type:**
  [DataCollection](../data-collection.md#coinmetrics._data_collection.DataCollection)
