---
description: 'The CoinMetricsClient class is a Python wrapper for calling the Coin Metrics API.'
icon: code
---


# CoinMetricsClient

`coinmetrics.api_client.CoinMetricsClient`

The CoinMetricsClient class is a Python wrapper for calling the Coin Metrics API.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L143)

## Constructor

```python
def CoinMetricsClient.__init__(self, api_key: str='', verify_ssl_certs: Union[bool, str]=True, proxy_url: Optional[str]=None, session: Optional[requests.Session]=None, debug_mode: bool=False, verbose: bool=False, host: Optional[str]=None, port: Optional[int]=None, schema: str='https', ignore_unsupported_errors: bool=False, ignore_forbidden_errors: bool=False, max_retries: Optional[int]=5):
```


**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `api_key` | `str` | The API key for the CoinMetrics API. |
| `verify_ssl_certs` | `bool or str` | Whether to verify SSL certificates. Default is True. SSLErrors may be raised due to network configurations (e.g. proxies). You may set this to False or a path to bypass this error. |
| `proxy_url` | `str` | The URL of the proxy to use. |
| `session` | `requests.Session` | The session to use. |
| `debug_mode` | `bool` | Whether to enable debug mode for logging. |
| `verbose` | `bool` | Whether to enable verbose mode for logging. |
| `host` | `str` | The host for the Coin Metrics API. Default is "api.coinmetrics.io" or "community-api.coinmetrics.io based on user credentials. |
| `port` | `int` | The port for accessing the Coin Metrics API. Default is None. |
| `schema` | `str` | The schema for accessing the Coin Metrics API. Default is "https". |
| `ignore_unsupported_errors` | `bool` | Whether to ignore 401 Unauthorized errors. Default is False. |
| `ignore_forbidden_errors` | `bool` | Whether to ignore 403 Forbidden errors. Default is False. |
| `max_retries` | `int` | Maximum number of retries for rate-limited requests. |

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L147)

## Methods

### `catalog_assets`

```python
def CoinMetricsClient.catalog_assets(self, assets: Optional[Union[List[str], str]]=None, include: Optional[Union[List[str], str]]=None, exclude: Optional[Union[List[str], str]]=None) -> CatalogAssetsData:
```


**Deprecated:** Returns meta information about _available_ assets.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `assets` | `list(str), str` | A single asset or a list of assets to return info for. If no assets provided, all available assets are returned. |
| `include` | `list(str), str` | list of fields to include in response. Supported values are metrics, markets, exchanges. Included by default if omitted. |
| `exclude` | `list(str), str` | list of fields to include in response. Supported values are metrics, markets, exchanges. Included by default if omitted. |

**Returns**

`list(dict(str, any))` &mdash; Information that is available for requested assets, like: Full name, metrics and available frequencies, markets, exchanges, etc.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L252)

### `catalog_asset_alerts`

```python
def CoinMetricsClient.catalog_asset_alerts(self, assets: Optional[Union[str, List[str]]]=None, alerts: Optional[Union[str, List[str]]]=None) -> CatalogAssetAlertsData:
```


**Deprecated:**

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `assets` | `Union[str, List[str]]` | Comma separated list of assets. By default all assets are returned. |
| `alerts` | `Union[str, List[str]]` | Comma separated list of asset alert names. By default all asset alerts are returned. |

**Returns**

`CatalogAssetAlertsData` &mdash; List of asset alerts.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L278)

### `catalog_asset_chains`

```python
def CoinMetricsClient.catalog_asset_chains(self, assets: Optional[Union[str, List[str]]]=None) -> CatalogAssetChainsData:
```


**Deprecated:**

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `assets` | `Optional[Union[str, List[str]]]` | Comma separated list of assets. By default all assets are returned. |

**Returns**

`CatalogAssetChainsData` &mdash; List of asset chains assets

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L300)

### `catalog_mempool_feerates`

```python
def CoinMetricsClient.catalog_mempool_feerates(self, assets: Optional[Union[str, List[str]]]=None) -> CatalogMempoolFeeratesData:
```


**Deprecated:**

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `assets` | `Optional[Union[str, List[str]]]` | Comma separated list of assets. By default all assets are returned. |

**Returns**

`CatalogMempoolFeeratesData` &mdash; List of mempool feerates assets

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L317)

### `catalog_mining_pool_tips_summaries`

```python
def CoinMetricsClient.catalog_mining_pool_tips_summaries(self, assets: Optional[Union[str, List[str]]]=None) -> CatalogMiningPoolTipsData:
```


**Deprecated:**

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `assets` | `Optional[Union[str, List[str]]]` | Comma separated list of assets. By default all assets are returned. |

**Returns**

`CatalogMiningPoolTipsData` &mdash; List of mining pool tips assets

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L334)

### `catalog_transaction_tracker_assets`

```python
def CoinMetricsClient.catalog_transaction_tracker_assets(self, assets: Optional[Union[str, List[str]]]=None) -> CatalogTransactionTrackerData:
```


**Deprecated:**

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `assets` | `Optional[Union[str, List[str]]]` | Comma separated list of assets. By default all assets are returned. |

**Returns**

`CatalogTransactionTrackerData` &mdash; List of transaction tracker assets

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L352)

### `catalog_asset_pairs`

```python
def CoinMetricsClient.catalog_asset_pairs(self, asset_pairs: Optional[Union[List[str], str]]=None) -> CatalogAssetPairsData:
```


**Deprecated:** Returns meta information about _available_ asset-asset pairs

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `asset_pairs` | `list(str), str` | A single asset-asset pair (e.g. "btc-eth") or a list of asset-asset pairs to return info for. If none are provided, all available pairs are returned. |

**Returns**

`list(dict(str, any))` &mdash; Information that is available for requested asset-asset pair like metrics and their respective frequencies and time ranges

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L370)

### `catalog_asset_metrics`

```python
def CoinMetricsClient.catalog_asset_metrics(self, metrics: Optional[Union[List[str], str]]=None, reviewable: Optional[bool]=None) -> CatalogMetricsData:
```


**Deprecated:** Returns list of _available_ asset metrics along with information for them like
description, category, precision and assets for which a metric is available.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `metrics` | `list(str), str` | A single asset metric name or a list of metrics to return info for. If no metrics provided, all available metrics are returned. |
| `reviewable` | `bool` | Show only reviewable or non-reviewable by human metrics. By default all metrics are shown. |

**Returns**

`list(dict(str, any))` &mdash; Information about asset metrics that correspond to a filter along with meta information like: description, category, precision and assets for which a metric is available.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L385)

### `catalog_exchange_metrics`

```python
def CoinMetricsClient.catalog_exchange_metrics(self, metrics: Optional[Union[List[str], str]]=None, reviewable: Optional[bool]=None) -> CatalogMetricsData:
```


**Deprecated:** Returns list of _available_ exchange metrics along with information for them like
description, category, precision and assets for which a metric is available.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `metrics` | `list(str), str` | A single exchange metric name or a list of metrics to return info for. If no metrics provided, all available metrics are returned. |
| `reviewable` | `bool` | Show only reviewable or non-reviewable by human metrics. By default all metrics are shown. |

**Returns**

`list(dict(str, any))` &mdash; Information about exchange metrics that correspond to a filter along with meta information like: description, category, precision and assets for which a metric is available.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L407)

### `catalog_exchange_asset_metrics`

```python
def CoinMetricsClient.catalog_exchange_asset_metrics(self, metrics: Optional[Union[List[str], str]]=None, reviewable: Optional[bool]=None) -> CatalogExchangeAssetMetricsData:
```


**Deprecated:** Returns list of _available_ exchange metrics along with information for them like
description, category, precision and assets for which a metric is available.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `metrics` | `list(str), str` | A single exchange metric name or a list of metrics to return info for. If no metrics provided, all available metrics are returned. |
| `reviewable` | `bool` | Show only reviewable or non-reviewable by human metrics. By default all metrics are shown. |

**Returns**

`list(dict(str, any))` &mdash; Information about exchange metrics that correspond to a filter along with meta information like: description, category, precision and assets for which a metric is available.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L429)

### `catalog_pair_metrics`

```python
def CoinMetricsClient.catalog_pair_metrics(self, metrics: Optional[Union[List[str], str]]=None, reviewable: Optional[bool]=None) -> CatalogPairMetricsData:
```


**Deprecated:** Returns list of _available_ pair metrics along with information for them like
description, category, precision and assets for which a metric is available.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `metrics` | `list(str), str` | A single pair metric name or a list of metrics to return info for. If no metrics provided, all available metrics are returned. |
| `reviewable` | `bool` | Show only reviewable or non-reviewable by human metrics. By default all metrics are shown. |

**Returns**

`list(dict(str, any))` &mdash; Information about pair metrics that correspond to a filter along with meta information like: description, category, precision and assets for which a metric is available.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L451)

### `catalog_institution_metrics`

```python
def CoinMetricsClient.catalog_institution_metrics(self, metrics: Optional[Union[List[str], str]]=None, reviewable: Optional[bool]=None) -> CatalogInstitutionMetricsData:
```


**Deprecated:** Returns list of _available_ institution metrics along with information for them like
description, category, precision and assets for which a metric is available.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `metrics` | `list(str), str` | A single institution metric name or a list of metrics to return info for. If no metrics provided, all available metrics are returned. |
| `reviewable` | `bool` | Show only reviewable or non-reviewable by human metrics. By default all metrics are shown. |

**Returns**

`list(dict(str, any))` &mdash; Information about institution metrics that correspond to a filter along with meta information like: description, category, precision and assets for which a metric is available.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L473)

### `catalog_asset_pair_candles`

```python
def CoinMetricsClient.catalog_asset_pair_candles(self, asset_pairs: Optional[Union[List[str], str]]=None) -> CatalogAssetPairCandlesData:
```


**Deprecated:** Returns meta information about _available_ asset-asset pairs

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `asset_pairs` | `list(str), str` | A single asset-asset pair (e.g. "btc-eth") or a list of asset-asset pairs to return info for. If none are provided, all available pairs are returned. |

**Returns**

`list(dict(str, any))` &mdash; Returns a list of available asset pair candles along with the time ranges of available data per candle duration.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L495)

### `catalog_exchanges`

```python
def CoinMetricsClient.catalog_exchanges(self, exchanges: Optional[Union[List[str], str]]=None) -> CatalogExchangesData:
```


**Deprecated:** Returns meta information about exchanges.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `exchanges` | `list(str), str` | A single exchange name or a list of exchanges to return info for. If no exchanges provided, all available exchanges are returned. |

**Returns**

`list(dict(str, any))` &mdash; Information that is available for requested exchanges, like: markets, min and max time available.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L512)

### `catalog_exchange_assets`

```python
def CoinMetricsClient.catalog_exchange_assets(self, exchange_assets: Optional[Union[List[str], str]]=None) -> CatalogExchangeAssetsData:
```


**Deprecated:** Returns meta information about _available_ exchange-asset pairs

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `exchange_assets` | `list(str), str` | A single exchange-asset pair (e.g. "binance-btc") or a list of exchange-asset pairs to return info for. If none are provided, all available pairs are returned. |

**Returns**

`list(dict(str, any))` &mdash; Information that is available for requested exchange-asset pair like metrics and their respective frequencies and time ranges

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L527)

### `catalog_indexes`

```python
def CoinMetricsClient.catalog_indexes(self, indexes: Optional[Union[List[str], str]]=None) -> CatalogIndexesData:
```


**Deprecated:** Returns meta information about _available_ indexes.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `indexes` | `list(str), str` | A single index name or a list of indexes to return info for. If no indexes provided, all available indexes are returned. |

**Returns**

`list(dict(str, any))` &mdash; Information that is available for requested indexes, like: Full name, and available frequencies.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L544)

### `catalog_index_candles`

```python
def CoinMetricsClient.catalog_index_candles(self, indexes: Optional[Union[List[str], str]]=None) -> CatalogMarketCandlesData:
```


**Deprecated:** Returns meta information about _available_ index candles.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `indexes` | `list(str), str` | A single index name or a list of indexes to return info for. If no indexes provided, all available index candles are returned. |

**Returns**

`list(dict(str, any))` &mdash; Information that is available for requested index candles, like: Full name, and available frequencies.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L559)

### `catalog_institutions`

```python
def CoinMetricsClient.catalog_institutions(self, institutions: Optional[Union[List[str], str]]=None) -> CatalogInstitutionsData:
```


**Deprecated:** Returns meta information about _available_ institutions

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `institutions` | `list(str), str` | A single institution (e.g. "grayscale") or a list of institutions to return info for. If none are provided, all available pairs are returned. |

**Returns**

`list(dict(str, any))` &mdash; Information that is available for requested institution like metrics and their respective frequencies and time ranges.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L576)

### `catalog_markets`

```python
def CoinMetricsClient.catalog_markets(self, markets: Optional[Union[List[str], str]]=None, market_type: Optional[str]=None, exchange: Optional[str]=None, base: Optional[str]=None, quote: Optional[str]=None, asset: Optional[str]=None, symbol: Optional[str]=None, include: Optional[Union[List[str], str]]=None, exclude: Optional[Union[List[str], str]]=None) -> CatalogMarketsData:
```


**Deprecated:** Returns list of _available_ markets that correspond to a filter. If no filter is set, returns all available assets.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `markets` | `list(str), str` | list of market names, e.g. 'coinbase-btc-usd-spot' |
| `market_type` | `str` | Type of market: "spot", "future", "option" |
| `exchange` | `str` | name of the exchange |
| `base` | `str` | name of base asset |
| `quote` | `str` | name of quote asset |
| `asset` | `str` | name of either base or quote asset |
| `symbol` | `str` | name of a symbol. Usually used for futures contracts. |
| `include` | `list(str), str` | list of fields to include in response. Supported values are trades, orderbooks, quotes, funding_rates, openinterest, liquidations. Included by default if omitted. |
| `exclude` | `list(str), str` | list of fields to exclude from response. Supported values are trades, orderbooks, quotes, funding_rates, openinterest, liquidations. Included by default if omitted. |

**Returns**

`list(dict(str, any))` &mdash; Information about markets that correspond to a filter along with meta information like: type of market and min and max available time frames.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L593)

### `catalog_market_trades`

```python
def CoinMetricsClient.catalog_market_trades(self, markets: Optional[Union[List[str], str]]=None, market_type: Optional[str]=None, exchange: Optional[str]=None, base: Optional[str]=None, quote: Optional[str]=None, asset: Optional[str]=None, symbol: Optional[str]=None) -> CatalogMarketTradesData:
```


**Deprecated:** Returns a list of markets with trades support along with the time ranges of available data.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `markets` | `list(str), str` | list of market names, e.g. 'coinbase-btc-usd-spot' |
| `market_type` | `str` | Type of market: "spot", "future", "option" |
| `exchange` | `str` | name of the exchange |
| `base` | `str` | name of base asset |
| `quote` | `str` | name of quote asset |
| `asset` | `str` | name of either base or quote asset |
| `symbol` | `str` | name of a symbol. Usually used for futures contracts. |

**Returns**

`list(dict(str, any))` &mdash; Information about market trades that are available for the provided filter, as well as the time frames they are available

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L646)

### `catalog_metrics`

```python
def CoinMetricsClient.catalog_metrics(self, metrics: Optional[Union[List[str], str]]=None, reviewable: Optional[bool]=None) -> CatalogMetricsData:
```


**Deprecated:** Returns list of _available_ metrics along with information for them like
description, category, precision and assets for which a metric is available.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `metrics` | `list(str), str` | A single metric name or a list of metrics to return info for. If no metrics provided, all available metrics are returned. |
| `reviewable` | `bool` | Show only reviewable or non-reviewable by human metrics. By default all metrics are shown. |

**Returns**

`list(dict(str, any))` &mdash; Information about metrics that correspond to a filter along with meta information like: description, category, precision and assets for which a metric is available.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L690)

### `catalog_market_metrics`

```python
def CoinMetricsClient.catalog_market_metrics(self, markets: Optional[Union[List[str], str]]=None, market_type: Optional[str]=None, exchange: Optional[str]=None, base: Optional[str]=None, quote: Optional[str]=None, asset: Optional[str]=None, symbol: Optional[str]=None) -> CatalogMarketMetricsData:
```


**Deprecated:** Returns list of _available_ markets with metrics support along woth time ranges of available data per metric.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `markets` | `list(str), str` | list of market names, e.g. 'coinbase-btc-usd-spot' |
| `market_type` | `str` | Type of market: "spot", "future", "option" |
| `exchange` | `str` | name of the exchange |
| `base` | `str` | name of base asset |
| `quote` | `str` | name of quote asset |
| `asset` | `str` | name of either base or quote asset |
| `symbol` | `str` | name of a symbol. Usually used for futures contracts. |

**Returns**

`list(dict(str, any))` &mdash; Information about markets that correspond to a filter along with meta information like: type of market and min and max available time frames.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L710)

### `catalog_market_candles`

```python
def CoinMetricsClient.catalog_market_candles(self, markets: Optional[Union[List[str], str]]=None, market_type: Optional[str]=None, exchange: Optional[str]=None, base: Optional[str]=None, quote: Optional[str]=None, asset: Optional[str]=None, symbol: Optional[str]=None) -> CatalogMarketCandlesData:
```


**Deprecated:** Returns list of _available_ markets with candles support along woth time ranges of available data per metric.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `markets` | `list(str), str` | list of market names, e.g. 'coinbase-btc-usd-spot' |
| `market_type` | `str` | Type of market: "spot", "future", "option" |
| `exchange` | `str` | name of the exchange |
| `base` | `str` | name of base asset |
| `quote` | `str` | name of quote asset |
| `asset` | `str` | name of either base or quote asset |
| `symbol` | `str` | name of a symbol. Usually used for futures contracts. |

**Returns**

`list(dict(str, any))` &mdash; Information about markets that correspond to a filter along with meta information like: type of market and min and max available time frames.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L754)

### `catalog_market_orderbooks`

```python
def CoinMetricsClient.catalog_market_orderbooks(self, markets: Optional[Union[List[str], str]]=None, market_type: Optional[str]=None, exchange: Optional[str]=None, base: Optional[str]=None, quote: Optional[str]=None, asset: Optional[str]=None, symbol: Optional[str]=None) -> CatalogMarketOrderbooksData:
```


**Deprecated:** Returns a list of markets with orderbooks support along with the time ranges of available data.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `markets` | `list(str), str` | list of market names, e.g. 'coinbase-btc-usd-spot' |
| `market_type` | `str` | Type of market: "spot", "future", "option" |
| `exchange` | `str` | name of the exchange |
| `base` | `str` | name of base asset |
| `quote` | `str` | name of quote asset |
| `asset` | `str` | name of either base or quote asset |
| `symbol` | `str` | name of a symbol. Usually used for futures contracts. |

**Returns**

`list(dict(str, any))` &mdash; Information about markets orderbooks that correspond to a filter

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L798)

### `catalog_market_quotes`

```python
def CoinMetricsClient.catalog_market_quotes(self, markets: Optional[Union[List[str], str]]=None, market_type: Optional[str]=None, exchange: Optional[str]=None, base: Optional[str]=None, quote: Optional[str]=None, asset: Optional[str]=None, symbol: Optional[str]=None) -> CatalogMarketTradesData:
```


**Deprecated:** Returns a list of markets with quotes support along with the time ranges of available data.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `markets` | `list(str), str` | list of market names, e.g. 'coinbase-btc-usd-spot' |
| `market_type` | `str` | Type of market: "spot", "future", "option" |
| `exchange` | `str` | name of the exchange |
| `base` | `str` | name of base asset |
| `quote` | `str` | name of quote asset |
| `asset` | `str` | name of either base or quote asset |
| `symbol` | `str` | name of a symbol. Usually used for futures contracts. |

**Returns**

`list(dict(str, any))` &mdash; Information about markets quotes that correspond to a filter

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L842)

### `catalog_market_funding_rates`

```python
def CoinMetricsClient.catalog_market_funding_rates(self, markets: Optional[Union[List[str], str]]=None, market_type: Optional[str]=None, exchange: Optional[str]=None, base: Optional[str]=None, quote: Optional[str]=None, asset: Optional[str]=None, symbol: Optional[str]=None) -> CatalogMarketTradesData:
```


**Deprecated:** Returns a list of markets with funding rates support along with the time ranges of available data.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `markets` | `list(str), str` | list of market names, e.g. 'coinbase-btc-usd-spot' |
| `market_type` | `str` | Type of market: "spot", "future", "option" |
| `exchange` | `str` | name of the exchange |
| `base` | `str` | name of base asset |
| `quote` | `str` | name of quote asset |
| `asset` | `str` | name of either base or quote asset |
| `symbol` | `str` | name of a symbol. Usually used for futures contracts. |

**Returns**

`list(dict(str, any))` &mdash; Information about funding rates that correspond to a filter

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L886)

### `catalog_market_contract_prices`

```python
def CoinMetricsClient.catalog_market_contract_prices(self, markets: Optional[Union[str, List[str]]]=None, exchange: Optional[str]=None, type: Optional[str]=None, base: Optional[str]=None, quote: Optional[str]=None, asset: Optional[str]=None, symbol: Optional[str]=None, format: Optional[str]=None, limit: Optional[str]=None) -> CatalogMarketContractPrices:
```


**Deprecated:**

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `markets` | `Optional[Union[str, List[str]]]` | Comma separated list of markets. By default all markets are returned. |
| `exchange` | `Optional[str]` | Unique name of an exchange. |
| `type` | `Optional[str]` | Type of markets. |
| `base` | `Optional[str]` | Base asset of markets. |
| `quote` | `Optional[str]` | Quote asset of markets. |
| `asset` | `Optional[str]` | Any asset of markets. |
| `symbol` | `Optional[str]` | Symbol of derivative markets, full instrument name. |
| `format` | `Optional[str]` | Format of the response. Supported values are `json`, `json_stream`. |
| `limit` | `Optional[str]` | Limit of response items. `none` means no limit. |

**Returns**

`CatalogMarketContractPrices` &mdash; List of contract prices statistics.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L930)

### `catalog_market_implied_volatility`

```python
def CoinMetricsClient.catalog_market_implied_volatility(self, markets: Optional[Union[str, List[str]]]=None, exchange: Optional[str]=None, type: Optional[str]=None, base: Optional[str]=None, quote: Optional[str]=None, asset: Optional[str]=None, symbol: Optional[str]=None, format: Optional[str]=None, limit: Optional[str]=None) -> CatalogMarketImpliedVolatility:
```


**Deprecated:**

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `markets` | `Optional[Union[str, List[str]]]` | Comma separated list of markets. By default all markets are returned. |
| `exchange` | `Optional[str]` | Unique name of an exchange. |
| `type` | `Optional[str]` | Type of markets. |
| `base` | `Optional[str]` | Base asset of markets. |
| `quote` | `Optional[str]` | Quote asset of markets. |
| `asset` | `Optional[str]` | Any asset of markets. |
| `symbol` | `Optional[str]` | Symbol of derivative markets, full instrument name. |
| `format` | `Optional[str]` | Format of the response. Supported values are `json`, `json_stream`. |
| `limit` | `Optional[str]` | Limit of response items. `none` means no limit. |

**Returns**

`CatalogMarketImpliedVolatility` &mdash; List of implied volatility statistics.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L979)

### `catalog_market_greeks`

```python
def CoinMetricsClient.catalog_market_greeks(self, markets: Optional[Union[List[str], str]]=None, market_type: Optional[str]=None, exchange: Optional[str]=None, base: Optional[str]=None, quote: Optional[str]=None, asset: Optional[str]=None, symbol: Optional[str]=None) -> CatalogMarketTradesData:
```


**Deprecated:** Returns a list of markets with greeks support along with the time ranges of available data.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `markets` | `list(str), str` | list of market names, e.g. 'coinbase-btc-usd-spot' |
| `market_type` | `str` | Type of market: "spot", "future", "option" |
| `exchange` | `str` | name of the exchange |
| `base` | `str` | name of base asset |
| `quote` | `str` | name of quote asset |
| `asset` | `str` | name of either base or quote asset |
| `symbol` | `str` | name of a symbol. Usually used for futures contracts. |

**Returns**

`list(dict(str, any))` &mdash; Information about market greeks that correspond to the filter

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L1028)

### `catalog_market_open_interest`

```python
def CoinMetricsClient.catalog_market_open_interest(self, markets: Optional[Union[List[str], str]]=None, market_type: Optional[str]=None, exchange: Optional[str]=None, base: Optional[str]=None, quote: Optional[str]=None, asset: Optional[str]=None, symbol: Optional[str]=None) -> CatalogMarketTradesData:
```


**Deprecated:** Returns a list of markets with open interest support along with the time ranges of available data.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `markets` | `list(str), str` | list of market names, e.g. 'coinbase-btc-usd-spot' |
| `market_type` | `str` | Type of market: "spot", "future", "option" |
| `exchange` | `str` | name of the exchange |
| `base` | `str` | name of base asset |
| `quote` | `str` | name of quote asset |
| `asset` | `str` | name of either base or quote asset |
| `symbol` | `str` | name of a symbol. Usually used for futures contracts. |

**Returns**

`list(dict(str, any))` &mdash; Information about market open interest that correspond to a filter

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L1072)

### `catalog_market_liquidations`

```python
def CoinMetricsClient.catalog_market_liquidations(self, markets: Optional[Union[List[str], str]]=None, market_type: Optional[str]=None, exchange: Optional[str]=None, base: Optional[str]=None, quote: Optional[str]=None, asset: Optional[str]=None, symbol: Optional[str]=None) -> CatalogMarketTradesData:
```


**Deprecated:** Returns a list of markets with liquidations support along with the time ranges of available data.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `markets` | `list(str), str` | list of market names, e.g. 'coinbase-btc-usd-spot' |
| `market_type` | `str` | Type of market: "spot", "future", "option" |
| `exchange` | `str` | name of the exchange |
| `base` | `str` | name of base asset |
| `quote` | `str` | name of quote asset |
| `asset` | `str` | name of either base or quote asset |
| `symbol` | `str` | name of a symbol. Usually used for futures contracts. |

**Returns**

`list(dict(str, any))` &mdash; Information about market liquidations that correspond to a filter

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L1116)

### `catalog_full_assets`

```python
def CoinMetricsClient.catalog_full_assets(self, assets: Optional[Union[List[str], str]]=None, include: Optional[Union[List[str], str]]=None, exclude: Optional[Union[List[str], str]]=None) -> CatalogAssetsData:
```


**Deprecated:** Returns meta information about _supported_ assets.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `assets` | `list(str), str` | A single asset or a list of assets to return info for. If no assets provided, all supported assets are returned. |
| `include` | `list(str), str` | list of fields to include in response. Supported values are metrics, markets, exchanges. Included by default if omitted. |
| `exclude` | `list(str), str` | list of fields to exclude from response. Supported values are metrics, markets, exchanges. Included by default if omitted. |

**Returns**

`list(dict(str, any))` &mdash; Information that is supported for requested assets, like: Full name, metrics and supported frequencies, markets, exchanges, etc.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L1160)

### `catalog_full_asset_metrics`

```python
def CoinMetricsClient.catalog_full_asset_metrics(self, metrics: Optional[Union[List[str], str]]=None, reviewable: Optional[bool]=None) -> CatalogMetricsData:
```


**Deprecated:** Returns list of all _available_ asset metrics along with information for them like
description, category, precision and assets for which a metric is available.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `metrics` | `list(str), str` | A single asset metric name or a list of metrics to return info for. If no metrics provided, all available metrics are returned. |
| `reviewable` | `bool` | Show only reviewable or non-reviewable by human metrics. By default all metrics are shown. |

**Returns**

`list(dict(str, any))` &mdash; Information about asset metrics that correspond to a filter along with meta information like: description, category, precision and assets for which a metric is available.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L1187)

### `catalog_full_asset_alerts`

```python
def CoinMetricsClient.catalog_full_asset_alerts(self, assets: Optional[Union[str, List[str]]]=None, alerts: Optional[Union[str, List[str]]]=None) -> CatalogAssetAlertsData:
```


**Deprecated:**

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `assets` | `Union[str, List[str]]` | Comma separated list of assets. By default all assets are returned. |
| `alerts` | `Union[str, List[str]]` | Comma separated list of asset alert names. By default all asset alerts are returned. |

**Returns**

`CatalogAssetAlertsData` &mdash; List of asset alerts.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L1209)

### `catalog_full_asset_chains`

```python
def CoinMetricsClient.catalog_full_asset_chains(self, assets: Optional[Union[str, List[str]]]=None) -> CatalogAssetChainsData:
```


**Deprecated:**

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `assets` | `Optional[Union[str, List[str]]]` | Comma separated list of assets. By default all assets are returned. |

**Returns**

`CatalogAssetChainsData` &mdash; List of asset chains assets

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L1231)

### `catalog_full_mempool_feerates`

```python
def CoinMetricsClient.catalog_full_mempool_feerates(self, assets: Optional[Union[str, List[str]]]=None) -> CatalogMempoolFeeratesData:
```


**Deprecated:**

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `assets` | `Optional[Union[str, List[str]]]` | Comma separated list of assets. By default all assets are returned. |

**Returns**

`CatalogMempoolFeeratesData` &mdash; List of mempool feerates assets

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L1248)

### `catalog_full_mining_pool_tips_summaries`

```python
def CoinMetricsClient.catalog_full_mining_pool_tips_summaries(self, assets: Optional[Union[str, List[str]]]=None) -> CatalogMiningPoolTipsData:
```


**Deprecated:**

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `assets` | `Optional[Union[str, List[str]]]` | Comma separated list of assets. By default all assets are returned. |

**Returns**

`CatalogMiningPoolTipsData` &mdash; List of mining pool tips assets

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L1265)

### `catalog_full_transaction_tracker_assets`

```python
def CoinMetricsClient.catalog_full_transaction_tracker_assets(self, assets: Optional[Union[str, List[str]]]=None) -> CatalogTransactionTrackerData:
```


**Deprecated:**

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `assets` | `Optional[Union[str, List[str]]]` | Comma separated list of assets. By default all assets are returned. |

**Returns**

`CatalogTransactionTrackerData` &mdash; List of transaction tracker assets

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L1282)

### `catalog_full_asset_pairs`

```python
def CoinMetricsClient.catalog_full_asset_pairs(self, asset_pairs: Optional[Union[List[str], str]]=None) -> CatalogAssetPairsData:
```


**Deprecated:** Returns meta information about _supported_ asset-asset pairs

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `asset_pairs` | `list(str), str` | A single asset-asset pair (e.g. "btc-eth") or a list of asset-asset pairs to return info for. If none are provided, all supported pairs are returned. |

**Returns**

`list(dict(str, any))` &mdash; Information that is supported for requested asset-asset pair like metrics and their respective frequencies and time ranges

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L1299)

### `catalog_full_pair_metrics`

```python
def CoinMetricsClient.catalog_full_pair_metrics(self, metrics: Optional[Union[List[str], str]]=None, reviewable: Optional[bool]=None) -> CatalogPairMetricsData:
```


**Deprecated:** Returns list of all _available_ pair metrics along with information for them like
description, category, precision and assets for which a metric is available.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `metrics` | `list(str), str` | A single pair metric name or a list of metrics to return info for. If no metrics provided, all available metrics are returned. |
| `reviewable` | `bool` | Show only reviewable or non-reviewable by human metrics. By default all metrics are shown. |

**Returns**

`list(dict(str, any))` &mdash; Information about pair metrics that correspond to a filter along with meta information like: description, category, precision and assets for which a metric is available.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L1318)

### `catalog_full_institution_metrics`

```python
def CoinMetricsClient.catalog_full_institution_metrics(self, metrics: Optional[Union[List[str], str]]=None, reviewable: Optional[bool]=None) -> CatalogInstitutionMetricsData:
```


**Deprecated:** Returns list of _available_ institution metrics along with information for them like
description, category, precision and assets for which a metric is available.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `metrics` | `list(str), str` | A single institution metric name or a list of metrics to return info for. If no metrics provided, all available metrics are returned. |
| `reviewable` | `bool` | Show only reviewable or non-reviewable by human metrics. By default all metrics are shown. |

**Returns**

`list(dict(str, any))` &mdash; Information about institution metrics that correspond to a filter along with meta information like: description, category, precision and assets for which a metric is available.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L1341)

### `catalog_full_asset_pair_candles`

```python
def CoinMetricsClient.catalog_full_asset_pair_candles(self, asset_pairs: Optional[Union[List[str], str]]=None) -> CatalogAssetPairCandlesData:
```


**Deprecated:** Returns meta information about _available_ asset-asset pairs

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `asset_pairs` | `list(str), str` | A single asset-asset pair (e.g. "btc-eth") or a list of asset-asset pairs to return info for. If none are provided, all available pairs are returned. |

**Returns**

`list(dict(str, any))` &mdash; Returns a list of available asset pair candles along with the time ranges of available data per candle duration.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L1364)

### `catalog_full_exchanges`

```python
def CoinMetricsClient.catalog_full_exchanges(self, exchanges: Optional[Union[List[str], str]]=None) -> CatalogExchangesData:
```


**Deprecated:** Returns meta information about exchanges.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `exchanges` | `list(str), str` | A single exchange name or a list of exchanges to return info for. If no exchanges provided, all supported exchanges are returned. |

**Returns**

`list(dict(str, any))` &mdash; Information that is supported for requested exchanges, like: markets, min and max time supported.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L1382)

### `catalog_full_exchange_assets`

```python
def CoinMetricsClient.catalog_full_exchange_assets(self, exchange_assets: Optional[Union[List[str], str]]=None) -> CatalogExchangeAssetsData:
```


**Deprecated:** Returns meta information about _supported_ exchange-asset pairs

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `exchange_assets` | `list(str), str` | A single exchange-asset pair (e.g. "binance-btc") or a list of exchange-asset pairs to return info for. If none are provided, all supported pairs are returned. |

**Returns**

`list(dict(str, any))` &mdash; Information that is supported for requested exchange-asset pair like metrics and their respective frequencies and time ranges

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L1402)

### `catalog_full_exchange_metrics`

```python
def CoinMetricsClient.catalog_full_exchange_metrics(self, metrics: Optional[Union[List[str], str]]=None, reviewable: Optional[bool]=None) -> CatalogMetricsData:
```


**Deprecated:** Returns list of all _available_ exchange metrics along with information for them like
description, category, precision and assets for which a metric is available.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `metrics` | `list(str), str` | A single exchange metric name or a list of metrics to return info for. If no metrics provided, all available metrics are returned. |
| `reviewable` | `bool` | Show only reviewable or non-reviewable by human metrics. By default all metrics are shown. |

**Returns**

`list(dict(str, any))` &mdash; Information about exchange metrics that correspond to a filter along with meta information like: description, category, precision and assets for which a metric is available.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L1420)

### `catalog_full_exchange_asset_metrics`

```python
def CoinMetricsClient.catalog_full_exchange_asset_metrics(self, metrics: Optional[Union[List[str], str]]=None, reviewable: Optional[bool]=None) -> CatalogExchangeAssetMetricsData:
```


**Deprecated:** Returns list of _available_ exchange metrics along with information for them like
description, category, precision and assets for which a metric is available.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `metrics` | `list(str), str` | A single exchange metric name or a list of metrics to return info for. If no metrics provided, all available metrics are returned. |
| `reviewable` | `bool` | Show only reviewable or non-reviewable by human metrics. By default all metrics are shown. |

**Returns**

`list(dict(str, any))` &mdash; Information about exchange metrics that correspond to a filter along with meta information like: description, category, precision and assets for which a metric is available.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L1443)

### `catalog_full_indexes`

```python
def CoinMetricsClient.catalog_full_indexes(self, indexes: Optional[Union[List[str], str]]=None) -> CatalogIndexesData:
```


**Deprecated:** Returns meta information about _supported_ indexes.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `indexes` | `list(str), str` | A single index name or a list of indexes to return info for. If no indexes provided, all supported indexes are returned. |

**Returns**

`list(dict(str, any))` &mdash; Information that is supported for requested indexes, like: Full name, and supported frequencies.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L1466)

### `catalog_full_index_candles`

```python
def CoinMetricsClient.catalog_full_index_candles(self, indexes: Optional[Union[List[str], str]]=None) -> CatalogMarketCandlesData:
```


**Deprecated:** Returns meta information about _supported_ index candles.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `indexes` | `list(str), str` | A single index name or a list of indexes to return info for. If no indexes provided, all supported indexes are returned. |

**Returns**

`list(dict(str, any))` &mdash; Information that is supported for requested index candles, like: Full name, and supported frequencies.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L1482)

### `catalog_full_institutions`

```python
def CoinMetricsClient.catalog_full_institutions(self, institutions: Optional[Union[List[str], str]]=None) -> CatalogInstitutionsData:
```


**Deprecated:** Returns meta information about _supported_ institutions

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `institutions` | `list(str), str` | A single institution (e.g. "grayscale") or a list of institutions to return info for. If none are provided, all supported pairs are returned. |

**Returns**

`list(dict(str, any))` &mdash; Information that is supported for requested institution like metrics and their respective frequencies and time ranges.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L1500)

### `catalog_full_markets`

```python
def CoinMetricsClient.catalog_full_markets(self, markets: Optional[Union[List[str], str]]=None, market_type: Optional[str]=None, exchange: Optional[str]=None, base: Optional[str]=None, quote: Optional[str]=None, asset: Optional[str]=None, symbol: Optional[str]=None, include: Optional[str]=None, exclude: Optional[str]=None) -> CatalogMarketsData:
```


**Deprecated:** Returns list of _supported_ markets that correspond to a filter. If no filter is set, returns all supported assets.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `markets` | `list(str), str` | list of market names, e.g. 'coinbase-btc-usd-spot' |
| `market_type` | `str` | Type of market: "spot", "future", "option" |
| `exchange` | `str` | name of the exchange |
| `base` | `str` | name of base asset |
| `quote` | `str` | name of quote asset |
| `asset` | `str` | name of either base or quote asset |
| `symbol` | `str` | name of a symbol. Usually used for futures contracts. |
| `include` | `list(str), str` | ist of fields to include in response. Supported values are trades, orderbooks, quotes, funding_rates, openinterest, liquidations. Included by default if omitted. |
| `exclude` | `list(str), str` | list of fields to exclude from response. Supported values are trades, orderbooks, quotes, funding_rates, openinterest, liquidations. Included by default if omitted. |

**Returns**

`list(dict(str, any))` &mdash; Information about markets that correspond to a filter along with meta information like: type of market and min and max supported time frames.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L1518)

### `catalog_full_market_trades`

```python
def CoinMetricsClient.catalog_full_market_trades(self, markets: Optional[Union[List[str], str]]=None, market_type: Optional[str]=None, exchange: Optional[str]=None, base: Optional[str]=None, quote: Optional[str]=None, asset: Optional[str]=None, symbol: Optional[str]=None) -> CatalogMarketTradesData:
```


**Deprecated:** Returns a list of all markets with trades support along with the time ranges of available data.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `markets` | `list(str), str` | list of market names, e.g. 'coinbase-btc-usd-spot' |
| `market_type` | `str` | Type of market: "spot", "future", "option" |
| `exchange` | `str` | name of the exchange |
| `base` | `str` | name of base asset |
| `quote` | `str` | name of quote asset |
| `asset` | `str` | name of either base or quote asset |
| `symbol` | `str` | name of a symbol. Usually used for futures contracts. |

**Returns**

`list(dict(str, any))` &mdash; Information about market trades that are available for the provided filter, as well as the time frames they are available

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L1571)

### `catalog_full_metrics`

```python
def CoinMetricsClient.catalog_full_metrics(self, metrics: Optional[Union[List[str], str]]=None, reviewable: Optional[bool]=None) -> CatalogMetricsData:
```


**Deprecated:** Returns list of _supported_ metrics along with information for them like
description, category, precision and assets for which a metric is supported.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `metrics` | `list(str), str` | A single metric name or a list of metrics to return info for. If no metrics provided, all supported metrics are returned. |
| `reviewable` | `bool` | Show only reviewable or non-reviewable by human metrics. By default all metrics are shown. |

**Returns**

`list(dict(str, any))` &mdash; Information about metrics that correspond to a filter along with meta information like: description, category, precision and assets for which a metric is supported.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L1616)

### `catalog_full_market_metrics`

```python
def CoinMetricsClient.catalog_full_market_metrics(self, markets: Optional[Union[List[str], str]]=None, market_type: Optional[str]=None, exchange: Optional[str]=None, base: Optional[str]=None, quote: Optional[str]=None, asset: Optional[str]=None, symbol: Optional[str]=None) -> CatalogMarketMetricsData:
```


**Deprecated:** Returns list of _supported_ markets with metrics support along woth time ranges of available data per metric.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `markets` | `list(str), str` | list of market names, e.g. 'coinbase-btc-usd-spot' |
| `market_type` | `str` | Type of market: "spot", "future", "option" |
| `exchange` | `str` | name of the exchange |
| `base` | `str` | name of base asset |
| `quote` | `str` | name of quote asset |
| `asset` | `str` | name of either base or quote asset |
| `symbol` | `str` | name of a symbol. Usually used for futures contracts. |

**Returns**

`list(dict(str, any))` &mdash; Information about markets that correspond to a filter along with meta information like: type of market and min and max available time frames.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L1637)

### `catalog_full_market_candles`

```python
def CoinMetricsClient.catalog_full_market_candles(self, markets: Optional[Union[List[str], str]]=None, market_type: Optional[str]=None, exchange: Optional[str]=None, base: Optional[str]=None, quote: Optional[str]=None, asset: Optional[str]=None, symbol: Optional[str]=None) -> CatalogMarketCandlesData:
```


**Deprecated:** Returns list of _available_ markets with candles support along woth time ranges of available data per metric.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `markets` | `list(str), str` | list of market names, e.g. 'coinbase-btc-usd-spot' |
| `market_type` | `str` | Type of market: "spot", "future", "option" |
| `exchange` | `str` | name of the exchange |
| `base` | `str` | name of base asset |
| `quote` | `str` | name of quote asset |
| `asset` | `str` | name of either base or quote asset |
| `symbol` | `str` | name of a symbol. Usually used for futures contracts. |

**Returns**

`list(dict(str, any))` &mdash; Information about markets that correspond to a filter along with meta information like: type of market and min and max available time frames.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L1682)

### `catalog_full_market_orderbooks`

```python
def CoinMetricsClient.catalog_full_market_orderbooks(self, markets: Optional[Union[List[str], str]]=None, market_type: Optional[str]=None, exchange: Optional[str]=None, base: Optional[str]=None, quote: Optional[str]=None, asset: Optional[str]=None, symbol: Optional[str]=None) -> CatalogMarketTradesData:
```


**Deprecated:** Returns a list of markets with orderbooks support along with the time ranges of available data.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `markets` | `list(str), str` | list of market names, e.g. 'coinbase-btc-usd-spot' |
| `market_type` | `str` | Type of market: "spot", "future", "option" |
| `exchange` | `str` | name of the exchange |
| `base` | `str` | name of base asset |
| `quote` | `str` | name of quote asset |
| `asset` | `str` | name of either base or quote asset |
| `symbol` | `str` | name of a symbol. Usually used for futures contracts. |

**Returns**

`list(dict(str, any))` &mdash; Information about markets orderbooks that correspond to a filter

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L1727)

### `catalog_full_market_quotes`

```python
def CoinMetricsClient.catalog_full_market_quotes(self, markets: Optional[Union[List[str], str]]=None, market_type: Optional[str]=None, exchange: Optional[str]=None, base: Optional[str]=None, quote: Optional[str]=None, asset: Optional[str]=None, symbol: Optional[str]=None) -> CatalogMarketTradesData:
```


**Deprecated:** Returns a list of markets with quotes support along with the time ranges of available data.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `markets` | `list(str), str` | list of market names, e.g. 'coinbase-btc-usd-spot' |
| `market_type` | `str` | Type of market: "spot", "future", "option" |
| `exchange` | `str` | name of the exchange |
| `base` | `str` | name of base asset |
| `quote` | `str` | name of quote asset |
| `asset` | `str` | name of either base or quote asset |
| `symbol` | `str` | name of a symbol. Usually used for futures contracts. |

**Returns**

`list(dict(str, any))` &mdash; Information about markets quotes that correspond to a filter

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L1772)

### `catalog_full_market_funding_rates`

```python
def CoinMetricsClient.catalog_full_market_funding_rates(self, markets: Optional[Union[List[str], str]]=None, market_type: Optional[str]=None, exchange: Optional[str]=None, base: Optional[str]=None, quote: Optional[str]=None, asset: Optional[str]=None, symbol: Optional[str]=None) -> CatalogMarketTradesData:
```


**Deprecated:** Returns a list of all markets with funding rates support along with the time ranges of available data.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `markets` | `list(str), str` | list of market names, e.g. 'coinbase-btc-usd-spot' |
| `market_type` | `str` | Type of market: "spot", "future", "option" |
| `exchange` | `str` | name of the exchange |
| `base` | `str` | name of base asset |
| `quote` | `str` | name of quote asset |
| `asset` | `str` | name of either base or quote asset |
| `symbol` | `str` | name of a symbol. Usually used for futures contracts. |

**Returns**

`list(dict(str, any))` &mdash; Information about funding rates that correspond to a filter

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L1817)

### `catalog_full_market_contract_prices`

```python
def CoinMetricsClient.catalog_full_market_contract_prices(self, markets: Optional[Union[str, List[str]]]=None, exchange: Optional[str]=None, type: Optional[str]=None, base: Optional[str]=None, quote: Optional[str]=None, asset: Optional[str]=None, symbol: Optional[str]=None, format: Optional[str]=None, limit: Optional[str]=None) -> CatalogMarketContractPrices:
```


**Deprecated:**

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `markets` | `Optional[Union[str, List[str]]]` | Comma separated list of markets. By default all markets are returned. |
| `exchange` | `Optional[str]` | Unique name of an exchange. |
| `type` | `Optional[str]` | Type of markets. |
| `base` | `Optional[str]` | Base asset of markets. |
| `quote` | `Optional[str]` | Quote asset of markets. |
| `asset` | `Optional[str]` | Any asset of markets. |
| `symbol` | `Optional[str]` | Symbol of derivative markets, full instrument name. |
| `format` | `Optional[str]` | Format of the response. Supported values are `json`, `json_stream`. |
| `limit` | `Optional[str]` | Limit of response items. `none` means no limit. |

**Returns**

`CatalogMarketContractPrices` &mdash; List of contract prices statistics.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L1862)

### `catalog_full_contract_prices_v2`

```python
def CoinMetricsClient.catalog_full_contract_prices_v2(self, markets: Optional[Union[str, List[str]]]=None, exchange: Optional[str]=None, market_type: Optional[str]=None, base: Optional[str]=None, quote: Optional[str]=None, asset: Optional[str]=None, symbol: Optional[str]=None, start_time: Optional[Union[datetime, date, str]]=None, end_time: Optional[Union[datetime, date, str]]=None, start_inclusive: Optional[bool]=None, end_inclusive: Optional[bool]=None, timezone: Optional[str]=None, format: Optional[str]='json_stream', page_size: Optional[int]=None, paging_from: Optional[str]=None, next_page_token: Optional[str]=None) -> CatalogV2DataCollection:
```


**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `markets` | `Optional[Union[str, List[str]]]` | Comma separated list of markets. By default all markets are returned. |
| `exchange` | `Optional[str]` | Unique name of an exchange. |
| `market_type` | `Optional[str]` | Type of markets. |
| `base` | `Optional[str]` | Base asset of markets. |
| `quote` | `Optional[str]` | Quote asset of markets. |
| `asset` | `Optional[str]` | Any asset of markets. |
| `symbol` | `Optional[str]` | Symbol of derivative markets, full instrument name. |
| `format` | `Optional[str]` | Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'. |
| `start_time` | `Optional[Union[datetime, date, str]]` | Start time of the interval. |
| `end_time` | `Optional[Union[datetime, date, str]]` | End time of the interval. |
| `start_inclusive` | `Optional[bool]` | Whether to include the start time in the interval. |
| `end_inclusive` | `Optional[bool]` | Whether to include the end time in the interval. |
| `timezone` | `Optional[str]` | Timezone of the interval. |
| `page_size` | `Optional[int]` | Number of items per single page of results. |
| `paging_from` | `Optional[str]` | Where does the first page start, at the start of the interval or at the end. |
| `next_page_token` | `Optional[str]` | Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use `next_page_url` response field. |

**Returns**

`CatalogV2DataCollection` &mdash; List of contract prices statistics.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L1911)

### `catalog_full_market_implied_volatility`

```python
def CoinMetricsClient.catalog_full_market_implied_volatility(self, markets: Optional[Union[str, List[str]]]=None, exchange: Optional[str]=None, type: Optional[str]=None, base: Optional[str]=None, quote: Optional[str]=None, asset: Optional[str]=None, symbol: Optional[str]=None, format: Optional[str]=None, limit: Optional[str]=None) -> CatalogMarketImpliedVolatility:
```


**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `markets` | `Optional[Union[str, List[str]]]` | Comma separated list of markets. By default all markets are returned. |
| `exchange` | `Optional[str]` | Unique name of an exchange. |
| `type` | `Optional[str]` | Type of markets. |
| `base` | `Optional[str]` | Base asset of markets. |
| `quote` | `Optional[str]` | Quote asset of markets. |
| `asset` | `Optional[str]` | Any asset of markets. |
| `symbol` | `Optional[str]` | Symbol of derivative markets, full instrument name. |
| `format` | `Optional[str]` | Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'. |
| `limit` | `Optional[str]` | Limit of response items. `none` means no limit. |

**Returns**

`CatalogMarketImpliedVolatility` &mdash; List of implied volatility statistics.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L1988)

### `catalog_full_market_greeks`

```python
def CoinMetricsClient.catalog_full_market_greeks(self, markets: Optional[Union[List[str], str]]=None, market_type: Optional[str]=None, exchange: Optional[str]=None, base: Optional[str]=None, quote: Optional[str]=None, asset: Optional[str]=None, symbol: Optional[str]=None) -> CatalogMarketTradesData:
```


Returns a list of all markets with greeks support along with the time ranges of available data.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `markets` | `list(str), str` | list of market names, e.g. 'coinbase-btc-usd-spot' |
| `market_type` | `str` | Type of market: "spot", "future", "option" |
| `exchange` | `str` | name of the exchange |
| `base` | `str` | name of base asset |
| `quote` | `str` | name of quote asset |
| `asset` | `str` | name of either base or quote asset |
| `symbol` | `str` | name of a symbol. Usually used for futures contracts. |

**Returns**

`list(dict(str, any))` &mdash; Information about market greeks that correspond to the filter

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L2037)

### `catalog_full_market_open_interest`

```python
def CoinMetricsClient.catalog_full_market_open_interest(self, markets: Optional[Union[List[str], str]]=None, market_type: Optional[str]=None, exchange: Optional[str]=None, base: Optional[str]=None, quote: Optional[str]=None, asset: Optional[str]=None, symbol: Optional[str]=None) -> CatalogMarketTradesData:
```


Returns a list of markets with open interest support along with the time ranges of available data.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `markets` | `list(str), str` | list of market names, e.g. 'coinbase-btc-usd-spot' |
| `market_type` | `str` | Type of market: "spot", "future", "option" |
| `exchange` | `str` | name of the exchange |
| `base` | `str` | name of base asset |
| `quote` | `str` | name of quote asset |
| `asset` | `str` | name of either base or quote asset |
| `symbol` | `str` | name of a symbol. Usually used for futures contracts. |

**Returns**

`list(dict(str, any))` &mdash; Information about market open interest that correspond to a filter

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L2081)

### `catalog_full_market_liquidations`

```python
def CoinMetricsClient.catalog_full_market_liquidations(self, markets: Optional[Union[List[str], str]]=None, market_type: Optional[str]=None, exchange: Optional[str]=None, base: Optional[str]=None, quote: Optional[str]=None, asset: Optional[str]=None, symbol: Optional[str]=None) -> CatalogMarketTradesData:
```


Returns a list of all markets with liquidations support along with the time ranges of available data.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `markets` | `list(str), str` | list of market names, e.g. 'coinbase-btc-usd-spot' |
| `market_type` | `str` | Type of market: "spot", "future", "option" |
| `exchange` | `str` | name of the exchange |
| `base` | `str` | name of base asset |
| `quote` | `str` | name of quote asset |
| `asset` | `str` | name of either base or quote asset |
| `symbol` | `str` | name of a symbol. Usually used for futures contracts. |

**Returns**

`list(dict(str, any))` &mdash; Information about market liquidations that correspond to a filter

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L2125)

### `catalog_market_trades_v2`

```python
def CoinMetricsClient.catalog_market_trades_v2(self, markets: Optional[Union[str, List[str]]]=None, exchange: Optional[str]=None, market_type: Optional[str]=None, base: Optional[str]=None, quote: Optional[str]=None, asset: Optional[str]=None, symbol: Optional[str]=None, start_time: Optional[Union[datetime, date, str]]=None, end_time: Optional[Union[datetime, date, str]]=None, start_inclusive: Optional[bool]=None, end_inclusive: Optional[bool]=None, timezone: Optional[str]=None, format: Optional[str]='json_stream', page_size: Optional[int]=None, paging_from: Optional[str]=None, next_page_token: Optional[str]=None) -> CatalogV2DataCollection:
```


**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `markets` | `Optional[Union[str, List[str]]]` | Comma separated list of markets. By default all markets are returned. |
| `exchange` | `Optional[str]` | Unique name of an exchange. |
| `market_type` | `Optional[str]` | Type of markets. |
| `base` | `Optional[str]` | Base asset of markets. |
| `quote` | `Optional[str]` | Quote asset of markets. |
| `asset` | `Optional[str]` | Any asset of markets. |
| `symbol` | `Optional[str]` | Symbol of derivative markets, full instrument name. |
| `start_time` | `Optional[Union[datetime, date, str]]` | Start time of the interval. |
| `end_time` | `Optional[Union[datetime, date, str]]` | End time of the interval. |
| `start_inclusive` | `Optional[bool]` | Whether to include the start time in the interval. |
| `end_inclusive` | `Optional[bool]` | Whether to include the end time in the interval. |
| `timezone` | `Optional[str]` | Timezone of the interval. |
| `format` | `Optional[str]` | Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'. |
| `page_size` | `Optional[int]` | Number of items per single page of results. |
| `paging_from` | `Optional[str]` | Where does the first page start, at the start of the interval or at the end. |
| `next_page_token` | `Optional[str]` | Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use `next_page_url` response field. |

**Returns**

`CatalogV2DataCollection` &mdash; List of market trades statistics.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L2169)

### `catalog_market_candles_v2`

```python
def CoinMetricsClient.catalog_market_candles_v2(self, markets: Optional[Union[str, List[str]]]=None, exchange: Optional[str]=None, market_type: Optional[str]=None, base: Optional[str]=None, quote: Optional[str]=None, asset: Optional[str]=None, symbol: Optional[str]=None, start_time: Optional[Union[datetime, date, str]]=None, end_time: Optional[Union[datetime, date, str]]=None, start_inclusive: Optional[bool]=None, end_inclusive: Optional[bool]=None, timezone: Optional[str]=None, format: Optional[str]='json_stream', page_size: Optional[int]=None, paging_from: Optional[str]=None, next_page_token: Optional[str]=None) -> CatalogV2DataCollection:
```


**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `markets` | `Optional[Union[str, List[str]]]` | Comma separated list of markets. By default all markets are returned. |
| `exchange` | `Optional[str]` | Unique name of an exchange. |
| `market_type` | `Optional[str]` | Type of markets. |
| `base` | `Optional[str]` | Base asset of markets. |
| `quote` | `Optional[str]` | Quote asset of markets. |
| `asset` | `Optional[str]` | Any asset of markets. |
| `symbol` | `Optional[str]` | Symbol of derivative markets, full instrument name. |
| `start_time` | `Optional[Union[datetime, date, str]]` | Start time of the interval. |
| `end_time` | `Optional[Union[datetime, date, str]]` | End time of the interval. |
| `start_inclusive` | `Optional[bool]` | Whether to include the start time in the interval. |
| `end_inclusive` | `Optional[bool]` | Whether to include the end time in the interval. |
| `timezone` | `Optional[str]` | Timezone of the interval. |
| `format` | `Optional[str]` | Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'. |
| `page_size` | `Optional[int]` | Number of items per single page of results. |
| `paging_from` | `Optional[str]` | Where does the first page start, at the start of the interval or at the end. |
| `next_page_token` | `Optional[str]` | Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use `next_page_url` response field. |

**Returns**

`CatalogV2DataCollection` &mdash; List of market candles statistics.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L2245)

### `catalog_market_orderbooks_v2`

```python
def CoinMetricsClient.catalog_market_orderbooks_v2(self, markets: Optional[Union[str, List[str]]]=None, exchange: Optional[str]=None, market_type: Optional[str]=None, base: Optional[str]=None, quote: Optional[str]=None, asset: Optional[str]=None, symbol: Optional[str]=None, start_time: Optional[Union[datetime, date, str]]=None, end_time: Optional[Union[datetime, date, str]]=None, start_inclusive: Optional[bool]=None, end_inclusive: Optional[bool]=None, timezone: Optional[str]=None, format: Optional[str]='json_stream', page_size: Optional[int]=None, paging_from: Optional[str]=None, next_page_token: Optional[str]=None) -> CatalogV2DataCollection:
```


**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `markets` | `Optional[Union[str, List[str]]]` | Comma separated list of markets. By default all markets are returned. |
| `exchange` | `Optional[str]` | Unique name of an exchange. |
| `market_type` | `Optional[str]` | Type of markets. |
| `base` | `Optional[str]` | Base asset of markets. |
| `quote` | `Optional[str]` | Quote asset of markets. |
| `asset` | `Optional[str]` | Any asset of markets. |
| `symbol` | `Optional[str]` | Symbol of derivative markets, full instrument name. |
| `start_time` | `Optional[Union[datetime, date, str]]` | Start time of the interval. |
| `end_time` | `Optional[Union[datetime, date, str]]` | End time of the interval. |
| `start_inclusive` | `Optional[bool]` | Whether to include the start time in the interval. |
| `end_inclusive` | `Optional[bool]` | Whether to include the end time in the interval. |
| `timezone` | `Optional[str]` | Timezone of the interval. |
| `format` | `Optional[str]` | Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'. |
| `page_size` | `Optional[int]` | Number of items per single page of results. |
| `paging_from` | `Optional[str]` | Where does the first page start, at the start of the interval or at the end. |
| `next_page_token` | `Optional[str]` | Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use `next_page_url` response field. |

**Returns**

`CatalogV2DataCollection` &mdash; List of market orderbooks statistics.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L2328)

### `catalog_market_quotes_v2`

```python
def CoinMetricsClient.catalog_market_quotes_v2(self, markets: Optional[Union[str, List[str]]]=None, exchange: Optional[str]=None, market_type: Optional[str]=None, base: Optional[str]=None, quote: Optional[str]=None, asset: Optional[str]=None, symbol: Optional[str]=None, start_time: Optional[Union[datetime, date, str]]=None, end_time: Optional[Union[datetime, date, str]]=None, start_inclusive: Optional[bool]=None, end_inclusive: Optional[bool]=None, timezone: Optional[str]=None, format: Optional[str]='json_stream', page_size: Optional[int]=None, paging_from: Optional[str]=None, next_page_token: Optional[str]=None) -> CatalogV2DataCollection:
```


**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `markets` | `Optional[Union[str, List[str]]]` | Comma separated list of markets. By default all markets are returned. |
| `exchange` | `Optional[str]` | Unique name of an exchange. |
| `market_type` | `Optional[str]` | Type of markets. |
| `base` | `Optional[str]` | Base asset of markets. |
| `quote` | `Optional[str]` | Quote asset of markets. |
| `asset` | `Optional[str]` | Any asset of markets. |
| `symbol` | `Optional[str]` | Symbol of derivative markets, full instrument name. |
| `start_time` | `Optional[Union[datetime, date, str]]` | Start time of the interval. |
| `end_time` | `Optional[Union[datetime, date, str]]` | End time of the interval. |
| `start_inclusive` | `Optional[bool]` | Whether to include the start time in the interval. |
| `end_inclusive` | `Optional[bool]` | Whether to include the end time in the interval. |
| `timezone` | `Optional[str]` | Timezone of the interval. |
| `format` | `Optional[str]` | Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'. |
| `page_size` | `Optional[int]` | Number of items per single page of results. |
| `paging_from` | `Optional[str]` | Where does the first page start, at the start of the interval or at the end. |
| `next_page_token` | `Optional[str]` | Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use `next_page_url` response field. |

**Returns**

`CatalogV2DataCollection` &mdash; List of market quotes statistics.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L2411)

### `catalog_market_funding_rates_v2`

```python
def CoinMetricsClient.catalog_market_funding_rates_v2(self, markets: Optional[Union[str, List[str]]]=None, exchange: Optional[str]=None, market_type: Optional[str]=None, base: Optional[str]=None, quote: Optional[str]=None, asset: Optional[str]=None, symbol: Optional[str]=None, start_time: Optional[Union[datetime, date, str]]=None, end_time: Optional[Union[datetime, date, str]]=None, start_inclusive: Optional[bool]=None, end_inclusive: Optional[bool]=None, timezone: Optional[str]=None, format: Optional[str]='json_stream', page_size: Optional[int]=None, paging_from: Optional[str]=None, next_page_token: Optional[str]=None) -> CatalogV2DataCollection:
```


**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `markets` | `Optional[Union[str, List[str]]]` | Comma separated list of markets. By default all markets are returned. |
| `exchange` | `Optional[str]` | Unique name of an exchange. |
| `market_type` | `Optional[str]` | Type of markets. |
| `base` | `Optional[str]` | Base asset of markets. |
| `quote` | `Optional[str]` | Quote asset of markets. |
| `asset` | `Optional[str]` | Any asset of markets. |
| `symbol` | `Optional[str]` | Symbol of derivative markets, full instrument name. |
| `start_time` | `Optional[Union[datetime, date, str]]` | Start time of the interval. |
| `end_time` | `Optional[Union[datetime, date, str]]` | End time of the interval. |
| `start_inclusive` | `Optional[bool]` | Whether to include the start time in the interval. |
| `end_inclusive` | `Optional[bool]` | Whether to include the end time in the interval. |
| `timezone` | `Optional[str]` | Timezone of the interval. |
| `format` | `Optional[str]` | Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'. |
| `page_size` | `Optional[int]` | Number of items per single page of results. |
| `paging_from` | `Optional[str]` | Where does the first page start, at the start of the interval or at the end. |
| `next_page_token` | `Optional[str]` | Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use `next_page_url` response field. |

**Returns**

`CatalogV2DataCollection` &mdash; List of market funding rates statistics.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L2487)

### `catalog_market_funding_rates_predicted_v2`

```python
def CoinMetricsClient.catalog_market_funding_rates_predicted_v2(self, markets: Optional[Union[str, List[str]]]=None, exchange: Optional[str]=None, market_type: Optional[str]=None, base: Optional[str]=None, quote: Optional[str]=None, asset: Optional[str]=None, symbol: Optional[str]=None, start_time: Optional[Union[datetime, date, str]]=None, end_time: Optional[Union[datetime, date, str]]=None, start_inclusive: Optional[bool]=None, end_inclusive: Optional[bool]=None, timezone: Optional[str]=None, format: Optional[str]='json_stream', page_size: Optional[int]=None, paging_from: Optional[str]=None, next_page_token: Optional[str]=None) -> CatalogV2DataCollection:
```


**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `markets` | `Optional[Union[str, List[str]]]` | Comma separated list of markets. By default all markets are returned. |
| `exchange` | `Optional[str]` | Unique name of an exchange. |
| `market_type` | `Optional[str]` | Type of markets. |
| `base` | `Optional[str]` | Base asset of markets. |
| `quote` | `Optional[str]` | Quote asset of markets. |
| `asset` | `Optional[str]` | Any asset of markets. |
| `symbol` | `Optional[str]` | Symbol of derivative markets, full instrument name. |
| `start_time` | `Optional[Union[datetime, date, str]]` | Start time of the interval. |
| `end_time` | `Optional[Union[datetime, date, str]]` | End time of the interval. |
| `start_inclusive` | `Optional[bool]` | Whether to include the start time in the interval. |
| `end_inclusive` | `Optional[bool]` | Whether to include the end time in the interval. |
| `timezone` | `Optional[str]` | Timezone of the interval. |
| `format` | `Optional[str]` | Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'. |
| `page_size` | `Optional[int]` | Number of items per single page of results. |
| `paging_from` | `Optional[str]` | Where does the first page start, at the start of the interval or at the end. |
| `next_page_token` | `Optional[str]` | Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use `next_page_url` response field. |

**Returns**

`CatalogV2DataCollection` &mdash; List of market funding rates statistics.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L2563)

### `catalog_market_contract_prices_v2`

```python
def CoinMetricsClient.catalog_market_contract_prices_v2(self, markets: Optional[Union[str, List[str]]]=None, exchange: Optional[str]=None, market_type: Optional[str]=None, base: Optional[str]=None, quote: Optional[str]=None, asset: Optional[str]=None, symbol: Optional[str]=None, format: Optional[str]='json_stream', start_time: Optional[Union[datetime, date, str]]=None, end_time: Optional[Union[datetime, date, str]]=None, start_inclusive: Optional[bool]=None, end_inclusive: Optional[bool]=None, timezone: Optional[str]=None, page_size: Optional[int]=None, paging_from: Optional[str]=None, next_page_token: Optional[str]=None) -> CatalogV2DataCollection:
```


**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `markets` | `Optional[Union[str, List[str]]]` | Comma separated list of markets. By default all markets are returned. |
| `exchange` | `Optional[str]` | Unique name of an exchange. |
| `market_type` | `Optional[str]` | Type of markets. |
| `base` | `Optional[str]` | Base asset of markets. |
| `quote` | `Optional[str]` | Quote asset of markets. |
| `asset` | `Optional[str]` | Any asset of markets. |
| `symbol` | `Optional[str]` | Symbol of derivative markets, full instrument name. |
| `format` | `Optional[str]` | Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'. |
| `start_time` | `Optional[Union[datetime, date, str]]` | Start time of the interval. |
| `end_time` | `Optional[Union[datetime, date, str]]` | End time of the interval. |
| `start_inclusive` | `Optional[bool]` | Whether to include the start time in the interval. |
| `end_inclusive` | `Optional[bool]` | Whether to include the end time in the interval. |
| `timezone` | `Optional[str]` | Timezone of the interval. |
| `page_size` | `Optional[int]` | Number of items per single page of results. |
| `paging_from` | `Optional[str]` | Where does the first page start, at the start of the interval or at the end. |
| `next_page_token` | `Optional[str]` | Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use `next_page_url` response field. |

**Returns**

`CatalogV2DataCollection` &mdash; List of contract prices statistics.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L2639)

### `catalog_market_implied_volatility_v2`

```python
def CoinMetricsClient.catalog_market_implied_volatility_v2(self, markets: Optional[Union[str, List[str]]]=None, exchange: Optional[str]=None, market_type: Optional[str]=None, base: Optional[str]=None, quote: Optional[str]=None, asset: Optional[str]=None, symbol: Optional[str]=None, format: Optional[str]='json_stream', start_time: Optional[Union[datetime, date, str]]=None, end_time: Optional[Union[datetime, date, str]]=None, start_inclusive: Optional[bool]=None, end_inclusive: Optional[bool]=None, timezone: Optional[str]=None, page_size: Optional[int]=None, paging_from: Optional[str]=None, next_page_token: Optional[str]=None) -> CatalogV2DataCollection:
```


**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `markets` | `Optional[Union[str, List[str]]]` | Comma separated list of markets. By default all markets are returned. |
| `exchange` | `Optional[str]` | Unique name of an exchange. |
| `market_type` | `Optional[str]` | Type of markets. |
| `base` | `Optional[str]` | Base asset of markets. |
| `quote` | `Optional[str]` | Quote asset of markets. |
| `asset` | `Optional[str]` | Any asset of markets. |
| `symbol` | `Optional[str]` | Symbol of derivative markets, full instrument name. |
| `format` | `Optional[str]` | Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'. |
| `start_time` | `Optional[Union[datetime, date, str]]` | Start time of the interval. |
| `end_time` | `Optional[Union[datetime, date, str]]` | End time of the interval. |
| `start_inclusive` | `Optional[bool]` | Whether to include the start time in the interval. |
| `end_inclusive` | `Optional[bool]` | Whether to include the end time in the interval. |
| `timezone` | `Optional[str]` | Timezone of the interval. |
| `page_size` | `Optional[int]` | Number of items per single page of results. |
| `paging_from` | `Optional[str]` | Where does the first page start, at the start of the interval or at the end. |
| `next_page_token` | `Optional[str]` | Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use `next_page_url` response field. |

**Returns**

`CatalogV2DataCollection` &mdash; List of implied volatility statistics.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L2715)

### `catalog_market_greeks_v2`

```python
def CoinMetricsClient.catalog_market_greeks_v2(self, markets: Optional[Union[str, List[str]]]=None, exchange: Optional[str]=None, market_type: Optional[str]=None, base: Optional[str]=None, quote: Optional[str]=None, asset: Optional[str]=None, symbol: Optional[str]=None, start_time: Optional[Union[datetime, date, str]]=None, end_time: Optional[Union[datetime, date, str]]=None, start_inclusive: Optional[bool]=None, end_inclusive: Optional[bool]=None, timezone: Optional[str]=None, format: Optional[str]='json_stream', page_size: Optional[int]=None, paging_from: Optional[str]=None, next_page_token: Optional[str]=None) -> CatalogV2DataCollection:
```


**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `markets` | `Optional[Union[str, List[str]]]` | Comma separated list of markets. By default all markets are returned. |
| `exchange` | `Optional[str]` | Unique name of an exchange. |
| `market_type` | `Optional[str]` | Type of markets. |
| `base` | `Optional[str]` | Base asset of markets. |
| `quote` | `Optional[str]` | Quote asset of markets. |
| `asset` | `Optional[str]` | Any asset of markets. |
| `symbol` | `Optional[str]` | Symbol of derivative markets, full instrument name. |
| `start_time` | `Optional[Union[datetime, date, str]]` | Start time of the interval. |
| `end_time` | `Optional[Union[datetime, date, str]]` | End time of the interval. |
| `start_inclusive` | `Optional[bool]` | Whether to include the start time in the interval. |
| `end_inclusive` | `Optional[bool]` | Whether to include the end time in the interval. |
| `timezone` | `Optional[str]` | Timezone of the interval. |
| `format` | `Optional[str]` | Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'. |
| `page_size` | `Optional[int]` | Number of items per single page of results. |
| `paging_from` | `Optional[str]` | Where does the first page start, at the start of the interval or at the end. |
| `next_page_token` | `Optional[str]` | Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use `next_page_url` response field. |

**Returns**

`CatalogV2DataCollection` &mdash; List of greeks statistics.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L2791)

### `catalog_market_open_interest_v2`

```python
def CoinMetricsClient.catalog_market_open_interest_v2(self, markets: Optional[Union[str, List[str]]]=None, exchange: Optional[str]=None, market_type: Optional[str]=None, base: Optional[str]=None, quote: Optional[str]=None, asset: Optional[str]=None, symbol: Optional[str]=None, format: Optional[str]='json_stream', start_time: Optional[Union[datetime, date, str]]=None, end_time: Optional[Union[datetime, date, str]]=None, start_inclusive: Optional[bool]=None, end_inclusive: Optional[bool]=None, timezone: Optional[str]=None, page_size: Optional[int]=None, paging_from: Optional[str]=None, next_page_token: Optional[str]=None) -> CatalogV2DataCollection:
```


**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `markets` | `Optional[Union[str, List[str]]]` | Comma separated list of markets. By default all markets are returned. |
| `exchange` | `Optional[str]` | Unique name of an exchange. |
| `market_type` | `Optional[str]` | Type of markets. |
| `base` | `Optional[str]` | Base asset of markets. |
| `quote` | `Optional[str]` | Quote asset of markets. |
| `asset` | `Optional[str]` | Any asset of markets. |
| `symbol` | `Optional[str]` | Symbol of derivative markets, full instrument name. |
| `start_inclusive` | `Optional[bool]` | Whether to include the start time in the interval. |
| `end_inclusive` | `Optional[bool]` | Whether to include the end time in the interval. |
| `timezone` | `Optional[str]` | Timezone of the interval. |
| `start_time` | `Optional[Union[datetime, date, str]]` | Start time of the interval. |
| `end_time` | `Optional[Union[datetime, date, str]]` | End time of the interval. |
| `format` | `Optional[str]` | Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'. |
| `page_size` | `Optional[int]` | Number of items per single page of results. |
| `paging_from` | `Optional[str]` | Where does the first page start, at the start of the interval or at the end. |
| `next_page_token` | `Optional[str]` | Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use `next_page_url` response field. |

**Returns**

`CatalogV2DataCollection` &mdash; List of market open interest statistics.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L2867)

### `catalog_market_liquidations_v2`

```python
def CoinMetricsClient.catalog_market_liquidations_v2(self, markets: Optional[Union[str, List[str]]]=None, exchange: Optional[str]=None, market_type: Optional[str]=None, base: Optional[str]=None, quote: Optional[str]=None, asset: Optional[str]=None, symbol: Optional[str]=None, start_time: Optional[Union[datetime, date, str]]=None, end_time: Optional[Union[datetime, date, str]]=None, start_inclusive: Optional[bool]=None, end_inclusive: Optional[bool]=None, timezone: Optional[str]=None, format: Optional[str]='json_stream', page_size: Optional[int]=None, paging_from: Optional[str]=None, next_page_token: Optional[str]=None) -> CatalogV2DataCollection:
```


**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `markets` | `Optional[Union[str, List[str]]]` | Comma separated list of markets. By default all markets are returned. |
| `exchange` | `Optional[str]` | Unique name of an exchange. |
| `market_type` | `Optional[str]` | Type of markets. |
| `base` | `Optional[str]` | Base asset of markets. |
| `quote` | `Optional[str]` | Quote asset of markets. |
| `asset` | `Optional[str]` | Any asset of markets. |
| `symbol` | `Optional[str]` | Symbol of derivative markets, full instrument name. |
| `start_time` | `Optional[Union[datetime, date, str]]` | Start time of the interval. |
| `end_time` | `Optional[Union[datetime, date, str]]` | End time of the interval. |
| `start_inclusive` | `Optional[bool]` | Whether to include the start time in the interval. |
| `end_inclusive` | `Optional[bool]` | Whether to include the end time in the interval. |
| `timezone` | `Optional[str]` | Timezone of the interval. |
| `format` | `Optional[str]` | Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'. |
| `page_size` | `Optional[int]` | Number of items per single page of results. |
| `paging_from` | `Optional[str]` | Where does the first page start, at the start of the interval or at the end. |
| `next_page_token` | `Optional[str]` | Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use `next_page_url` response field. |

**Returns**

`CatalogV2DataCollection` &mdash; List of market liquidations statistics.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L2943)

### `catalog_market_metrics_v2`

```python
def CoinMetricsClient.catalog_market_metrics_v2(self, markets: Optional[Union[str, List[str]]]=None, metrics: Optional[Union[str, List[str]]]=None, exchange: Optional[str]=None, market_type: Optional[str]=None, base: Optional[str]=None, quote: Optional[str]=None, asset: Optional[str]=None, symbol: Optional[str]=None, format: Optional[str]='json_stream', page_size: Optional[int]=None, paging_from: Optional[str]=None, next_page_token: Optional[str]=None) -> CatalogV2DataCollection:
```


**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `markets` | `Optional[Union[str, List[str]]]` | Comma separated list of markets. By default all markets are returned. |
| `metrics` | `Optional[Union[str, List[str]]]` | Comma separated list of metrics. By default all metrics are returned. |
| `exchange` | `Optional[str]` | Unique name of an exchange. |
| `market_type` | `Optional[str]` | Type of markets. |
| `base` | `Optional[str]` | Base asset of markets. |
| `quote` | `Optional[str]` | Quote asset of markets. |
| `asset` | `Optional[str]` | Any asset of markets. |
| `symbol` | `Optional[str]` | Symbol of derivative markets, full instrument name. |
| `format` | `Optional[str]` | Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'. |
| `page_size` | `Optional[int]` | Number of items per single page of results. |
| `paging_from` | `Optional[str]` | Where does the first page start, at the start of the interval or at the end. |
| `next_page_token` | `Optional[str]` | Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use `next_page_url` response field. |

**Returns**

`CatalogV2DataCollection` &mdash; List of market metrics statistics.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L3019)

### `catalog_full_market_trades_v2`

```python
def CoinMetricsClient.catalog_full_market_trades_v2(self, markets: Optional[Union[str, List[str]]]=None, exchange: Optional[str]=None, market_type: Optional[str]=None, base: Optional[str]=None, quote: Optional[str]=None, asset: Optional[str]=None, symbol: Optional[str]=None, start_time: Optional[Union[datetime, date, str]]=None, end_time: Optional[Union[datetime, date, str]]=None, start_inclusive: Optional[bool]=None, end_inclusive: Optional[bool]=None, timezone: Optional[str]=None, format: Optional[str]='json_stream', page_size: Optional[int]=None, paging_from: Optional[str]=None, next_page_token: Optional[str]=None) -> CatalogV2DataCollection:
```


**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `markets` | `Optional[Union[str, List[str]]]` | Comma separated list of markets. By default all markets are returned. |
| `exchange` | `Optional[str]` | Unique name of an exchange. |
| `market_type` | `Optional[str]` | Type of markets. |
| `base` | `Optional[str]` | Base asset of markets. |
| `quote` | `Optional[str]` | Quote asset of markets. |
| `asset` | `Optional[str]` | Any asset of markets. |
| `symbol` | `Optional[str]` | Symbol of derivative markets, full instrument name. |
| `start_time` | `Optional[Union[datetime, date, str]]` | Start time of the interval. |
| `end_time` | `Optional[Union[datetime, date, str]]` | End time of the interval. |
| `format` | `Optional[str]` | Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'. |
| `start_inclusive` | `Optional[bool]` | Whether to include the start time in the interval. |
| `end_inclusive` | `Optional[bool]` | Whether to include the end time in the interval. |
| `timezone` | `Optional[str]` | Timezone of the interval. |
| `page_size` | `Optional[int]` | Number of items per single page of results. |
| `paging_from` | `Optional[str]` | Where does the first page start, at the start of the interval or at the end. |
| `next_page_token` | `Optional[str]` | Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use `next_page_url` response field. |

**Returns**

`CatalogV2DataCollection` &mdash; List of market trades statistics.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L3089)

### `catalog_full_market_candles_v2`

```python
def CoinMetricsClient.catalog_full_market_candles_v2(self, markets: Optional[Union[str, List[str]]]=None, exchange: Optional[str]=None, market_type: Optional[str]=None, base: Optional[str]=None, quote: Optional[str]=None, asset: Optional[str]=None, symbol: Optional[str]=None, start_time: Optional[Union[datetime, date, str]]=None, end_time: Optional[Union[datetime, date, str]]=None, start_inclusive: Optional[bool]=None, end_inclusive: Optional[bool]=None, timezone: Optional[str]=None, format: Optional[str]='json_stream', page_size: Optional[int]=None, paging_from: Optional[str]=None, next_page_token: Optional[str]=None) -> CatalogV2DataCollection:
```


**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `markets` | `Optional[Union[str, List[str]]]` | Comma separated list of markets. By default all markets are returned. |
| `exchange` | `Optional[str]` | Unique name of an exchange. |
| `market_type` | `Optional[str]` | Type of markets. |
| `base` | `Optional[str]` | Base asset of markets. |
| `quote` | `Optional[str]` | Quote asset of markets. |
| `asset` | `Optional[str]` | Any asset of markets. |
| `symbol` | `Optional[str]` | Symbol of derivative markets, full instrument name. |
| `format` | `Optional[str]` | Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'. |
| `start_time` | `Optional[Union[datetime, date, str]]` | Start time of the interval. |
| `end_time` | `Optional[Union[datetime, date, str]]` | End time of the interval. |
| `start_inclusive` | `Optional[bool]` | Whether to include the start time in the interval. |
| `end_inclusive` | `Optional[bool]` | Whether to include the end time in the interval. |
| `timezone` | `Optional[str]` | Timezone of the interval. |
| `page_size` | `Optional[int]` | Number of items per single page of results. |
| `paging_from` | `Optional[str]` | Where does the first page start, at the start of the interval or at the end. |
| `next_page_token` | `Optional[str]` | Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use `next_page_url` response field. |

**Returns**

`CatalogV2DataCollection` &mdash; List of market candles statistics.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L3165)

### `catalog_full_market_orderbooks_v2`

```python
def CoinMetricsClient.catalog_full_market_orderbooks_v2(self, markets: Optional[Union[str, List[str]]]=None, exchange: Optional[str]=None, market_type: Optional[str]=None, base: Optional[str]=None, quote: Optional[str]=None, asset: Optional[str]=None, symbol: Optional[str]=None, start_time: Optional[Union[datetime, date, str]]=None, end_time: Optional[Union[datetime, date, str]]=None, start_inclusive: Optional[bool]=None, end_inclusive: Optional[bool]=None, timezone: Optional[str]=None, format: Optional[str]='json_stream', page_size: Optional[int]=None, paging_from: Optional[str]=None, next_page_token: Optional[str]=None) -> CatalogV2DataCollection:
```


**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `markets` | `Optional[Union[str, List[str]]]` | Comma separated list of markets. By default all markets are returned. |
| `exchange` | `Optional[str]` | Unique name of an exchange. |
| `market_type` | `Optional[str]` | Type of markets. |
| `base` | `Optional[str]` | Base asset of markets. |
| `quote` | `Optional[str]` | Quote asset of markets. |
| `asset` | `Optional[str]` | Any asset of markets. |
| `symbol` | `Optional[str]` | Symbol of derivative markets, full instrument name. |
| `start_time` | `Optional[Union[datetime, date, str]]` | Start time of the interval. |
| `end_time` | `Optional[Union[datetime, date, str]]` | End time of the interval. |
| `start_inclusive` | `Optional[bool]` | Whether to include the start time in the interval. |
| `end_inclusive` | `Optional[bool]` | Whether to include the end time in the interval. |
| `timezone` | `Optional[str]` | Timezone of the interval. |
| `format` | `Optional[str]` | Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'. |
| `page_size` | `Optional[int]` | Number of items per single page of results. |
| `paging_from` | `Optional[str]` | Where does the first page start, at the start of the interval or at the end. |
| `next_page_token` | `Optional[str]` | Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use `next_page_url` response field. |

**Returns**

`CatalogV2DataCollection` &mdash; List of market orderbooks statistics.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L3248)

### `catalog_full_market_quotes_v2`

```python
def CoinMetricsClient.catalog_full_market_quotes_v2(self, markets: Optional[Union[str, List[str]]]=None, exchange: Optional[str]=None, market_type: Optional[str]=None, base: Optional[str]=None, quote: Optional[str]=None, asset: Optional[str]=None, symbol: Optional[str]=None, start_time: Optional[Union[datetime, date, str]]=None, end_time: Optional[Union[datetime, date, str]]=None, start_inclusive: Optional[bool]=None, end_inclusive: Optional[bool]=None, timezone: Optional[str]=None, format: Optional[str]='json_stream', page_size: Optional[int]=None, paging_from: Optional[str]=None, next_page_token: Optional[str]=None) -> CatalogV2DataCollection:
```


**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `markets` | `Optional[Union[str, List[str]]]` | Comma separated list of markets. By default all markets are returned. |
| `exchange` | `Optional[str]` | Unique name of an exchange. |
| `market_type` | `Optional[str]` | Type of markets. |
| `base` | `Optional[str]` | Base asset of markets. |
| `quote` | `Optional[str]` | Quote asset of markets. |
| `asset` | `Optional[str]` | Any asset of markets. |
| `symbol` | `Optional[str]` | Symbol of derivative markets, full instrument name. |
| `format` | `Optional[str]` | Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'. |
| `start_time` | `Optional[Union[datetime, date, str]]` | Start time of the interval. |
| `end_time` | `Optional[Union[datetime, date, str]]` | End time of the interval. |
| `start_inclusive` | `Optional[bool]` | Whether to include the start time in the interval. |
| `end_inclusive` | `Optional[bool]` | Whether to include the end time in the interval. |
| `timezone` | `Optional[str]` | Timezone of the interval. |
| `page_size` | `Optional[int]` | Number of items per single page of results. |
| `paging_from` | `Optional[str]` | Where does the first page start, at the start of the interval or at the end. |
| `next_page_token` | `Optional[str]` | Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use `next_page_url` response field. |

**Returns**

`CatalogV2DataCollection` &mdash; List of market quotes statistics.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L3331)

### `catalog_full_market_funding_rates_v2`

```python
def CoinMetricsClient.catalog_full_market_funding_rates_v2(self, markets: Optional[Union[str, List[str]]]=None, exchange: Optional[str]=None, market_type: Optional[str]=None, base: Optional[str]=None, quote: Optional[str]=None, asset: Optional[str]=None, symbol: Optional[str]=None, start_time: Optional[Union[datetime, date, str]]=None, end_time: Optional[Union[datetime, date, str]]=None, start_inclusive: Optional[bool]=None, end_inclusive: Optional[bool]=None, timezone: Optional[str]=None, format: Optional[str]='json_stream', page_size: Optional[int]=None, paging_from: Optional[str]=None, next_page_token: Optional[str]=None) -> CatalogV2DataCollection:
```


**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `markets` | `Optional[Union[str, List[str]]]` | Comma separated list of markets. By default all markets are returned. |
| `exchange` | `Optional[str]` | Unique name of an exchange. |
| `market_type` | `Optional[str]` | Type of markets. |
| `base` | `Optional[str]` | Base asset of markets. |
| `quote` | `Optional[str]` | Quote asset of markets. |
| `asset` | `Optional[str]` | Any asset of markets. |
| `symbol` | `Optional[str]` | Symbol of derivative markets, full instrument name. |
| `start_time` | `Optional[Union[datetime, date, str]]` | Start time of the interval. |
| `end_time` | `Optional[Union[datetime, date, str]]` | End time of the interval. |
| `start_inclusive` | `Optional[bool]` | Whether to include the start time in the interval. |
| `end_inclusive` | `Optional[bool]` | Whether to include the end time in the interval. |
| `timezone` | `Optional[str]` | Timezone of the interval. |
| `format` | `Optional[str]` | Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'. |
| `page_size` | `Optional[int]` | Number of items per single page of results. |
| `paging_from` | `Optional[str]` | Where does the first page start, at the start of the interval or at the end. |
| `next_page_token` | `Optional[str]` | Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use `next_page_url` response field. |

**Returns**

`CatalogV2DataCollection` &mdash; List of market funding rates statistics.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L3407)

### `catalog_full_market_funding_rates_predicted_v2`

```python
def CoinMetricsClient.catalog_full_market_funding_rates_predicted_v2(self, markets: Optional[Union[str, List[str]]]=None, exchange: Optional[str]=None, market_type: Optional[str]=None, base: Optional[str]=None, quote: Optional[str]=None, asset: Optional[str]=None, symbol: Optional[str]=None, start_time: Optional[Union[datetime, date, str]]=None, end_time: Optional[Union[datetime, date, str]]=None, format: Optional[str]='json_stream', start_inclusive: Optional[bool]=None, end_inclusive: Optional[bool]=None, timezone: Optional[str]=None, page_size: Optional[int]=None, paging_from: Optional[str]=None, next_page_token: Optional[str]=None) -> CatalogV2DataCollection:
```


**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `markets` | `Optional[Union[str, List[str]]]` | Comma separated list of markets. By default all markets are returned. |
| `exchange` | `Optional[str]` | Unique name of an exchange. |
| `market_type` | `Optional[str]` | Type of markets. |
| `base` | `Optional[str]` | Base asset of markets. |
| `quote` | `Optional[str]` | Quote asset of markets. |
| `asset` | `Optional[str]` | Any asset of markets. |
| `symbol` | `Optional[str]` | Symbol of derivative markets, full instrument name. |
| `start_time` | `Optional[Union[datetime, date, str]]` | Start time of the interval. |
| `end_time` | `Optional[Union[datetime, date, str]]` | End time of the interval. |
| `start_inclusive` | `Optional[bool]` | Whether to include the start time in the interval. |
| `end_inclusive` | `Optional[bool]` | Whether to include the end time in the interval. |
| `timezone` | `Optional[str]` | Timezone of the interval. |
| `format` | `Optional[str]` | Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'. |
| `page_size` | `Optional[int]` | Number of items per single page of results. |
| `paging_from` | `Optional[str]` | Where does the first page start, at the start of the interval or at the end. |
| `next_page_token` | `Optional[str]` | Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use `next_page_url` response field. |

**Returns**

`CatalogV2DataCollection` &mdash; List of market funding rates statistics.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L3483)

### `catalog_full_market_contract_prices_v2`

```python
def CoinMetricsClient.catalog_full_market_contract_prices_v2(self, markets: Optional[Union[str, List[str]]]=None, exchange: Optional[str]=None, market_type: Optional[str]=None, base: Optional[str]=None, quote: Optional[str]=None, asset: Optional[str]=None, symbol: Optional[str]=None, start_time: Optional[Union[datetime, date, str]]=None, end_time: Optional[Union[datetime, date, str]]=None, start_inclusive: Optional[bool]=None, end_inclusive: Optional[bool]=None, timezone: Optional[str]=None, format: Optional[str]='json_stream', page_size: Optional[int]=None, paging_from: Optional[str]=None, next_page_token: Optional[str]=None) -> CatalogV2DataCollection:
```


**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `markets` | `Optional[Union[str, List[str]]]` | Comma separated list of markets. By default all markets are returned. |
| `exchange` | `Optional[str]` | Unique name of an exchange. |
| `market_type` | `Optional[str]` | Type of markets. |
| `base` | `Optional[str]` | Base asset of markets. |
| `quote` | `Optional[str]` | Quote asset of markets. |
| `asset` | `Optional[str]` | Any asset of markets. |
| `symbol` | `Optional[str]` | Symbol of derivative markets, full instrument name. |
| `format` | `Optional[str]` | Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'. |
| `start_time` | `Optional[Union[datetime, date, str]]` | Start time of the interval. |
| `end_time` | `Optional[Union[datetime, date, str]]` | End time of the interval. |
| `start_inclusive` | `Optional[bool]` | Whether to include the start time in the interval. |
| `end_inclusive` | `Optional[bool]` | Whether to include the end time in the interval. |
| `timezone` | `Optional[str]` | Timezone of the interval. |
| `page_size` | `Optional[int]` | Number of items per single page of results. |
| `paging_from` | `Optional[str]` | Where does the first page start, at the start of the interval or at the end. |
| `next_page_token` | `Optional[str]` | Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use `next_page_url` response field. |

**Returns**

`CatalogV2DataCollection` &mdash; List of contract prices statistics.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L3559)

### `catalog_full_market_implied_volatility_v2`

```python
def CoinMetricsClient.catalog_full_market_implied_volatility_v2(self, markets: Optional[Union[str, List[str]]]=None, exchange: Optional[str]=None, market_type: Optional[str]=None, base: Optional[str]=None, quote: Optional[str]=None, asset: Optional[str]=None, symbol: Optional[str]=None, start_time: Optional[Union[datetime, date, str]]=None, end_time: Optional[Union[datetime, date, str]]=None, start_inclusive: Optional[bool]=None, end_inclusive: Optional[bool]=None, timezone: Optional[str]=None, format: Optional[str]='json_stream', page_size: Optional[int]=None, paging_from: Optional[str]=None, next_page_token: Optional[str]=None) -> CatalogV2DataCollection:
```


**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `markets` | `Optional[Union[str, List[str]]]` | Comma separated list of markets. By default all markets are returned. |
| `exchange` | `Optional[str]` | Unique name of an exchange. |
| `market_type` | `Optional[str]` | Type of markets. |
| `base` | `Optional[str]` | Base asset of markets. |
| `quote` | `Optional[str]` | Quote asset of markets. |
| `asset` | `Optional[str]` | Any asset of markets. |
| `symbol` | `Optional[str]` | Symbol of derivative markets, full instrument name. |
| `start_time` | `Optional[Union[datetime, date, str]]` | Start time of the interval. |
| `end_time` | `Optional[Union[datetime, date, str]]` | End time of the interval. |
| `start_inclusive` | `Optional[bool]` | Whether to include the start time in the interval. |
| `end_inclusive` | `Optional[bool]` | Whether to include the end time in the interval. |
| `timezone` | `Optional[str]` | Timezone of the interval. |
| `format` | `Optional[str]` | Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'. |
| `page_size` | `Optional[int]` | Number of items per single page of results. |
| `paging_from` | `Optional[str]` | Where does the first page start, at the start of the interval or at the end. |
| `next_page_token` | `Optional[str]` | Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use `next_page_url` response field. |

**Returns**

`CatalogV2DataCollection` &mdash; List of implied volatility statistics.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L3635)

### `catalog_full_market_greeks_v2`

```python
def CoinMetricsClient.catalog_full_market_greeks_v2(self, markets: Optional[Union[str, List[str]]]=None, exchange: Optional[str]=None, market_type: Optional[str]=None, base: Optional[str]=None, quote: Optional[str]=None, asset: Optional[str]=None, symbol: Optional[str]=None, start_time: Optional[Union[datetime, date, str]]=None, end_time: Optional[Union[datetime, date, str]]=None, start_inclusive: Optional[bool]=None, end_inclusive: Optional[bool]=None, timezone: Optional[str]=None, format: Optional[str]='json_stream', page_size: Optional[int]=None, paging_from: Optional[str]=None, next_page_token: Optional[str]=None) -> CatalogV2DataCollection:
```


**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `markets` | `Optional[Union[str, List[str]]]` | Comma separated list of markets. By default all markets are returned. |
| `exchange` | `Optional[str]` | Unique name of an exchange. |
| `market_type` | `Optional[str]` | Type of markets. |
| `base` | `Optional[str]` | Base asset of markets. |
| `quote` | `Optional[str]` | Quote asset of markets. |
| `asset` | `Optional[str]` | Any asset of markets. |
| `symbol` | `Optional[str]` | Symbol of derivative markets, full instrument name. |
| `start_time` | `Optional[Union[datetime, date, str]]` | Start time of the interval. |
| `end_time` | `Optional[Union[datetime, date, str]]` | End time of the interval. |
| `start_inclusive` | `Optional[bool]` | Whether to include the start time in the interval. |
| `end_inclusive` | `Optional[bool]` | Whether to include the end time in the interval. |
| `timezone` | `Optional[str]` | Timezone of the interval. |
| `format` | `Optional[str]` | Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'. |
| `page_size` | `Optional[int]` | Number of items per single page of results. |
| `paging_from` | `Optional[str]` | Where does the first page start, at the start of the interval or at the end. |
| `next_page_token` | `Optional[str]` | Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use `next_page_url` response field. |

**Returns**

`CatalogV2DataCollection` &mdash; List of greeks statistics.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L3711)

### `catalog_full_market_open_interest_v2`

```python
def CoinMetricsClient.catalog_full_market_open_interest_v2(self, markets: Optional[Union[str, List[str]]]=None, exchange: Optional[str]=None, market_type: Optional[str]=None, base: Optional[str]=None, quote: Optional[str]=None, asset: Optional[str]=None, symbol: Optional[str]=None, start_time: Optional[Union[datetime, date, str]]=None, end_time: Optional[Union[datetime, date, str]]=None, start_inclusive: Optional[bool]=None, end_inclusive: Optional[bool]=None, timezone: Optional[str]=None, format: Optional[str]='json_stream', page_size: Optional[int]=None, paging_from: Optional[str]=None, next_page_token: Optional[str]=None) -> CatalogV2DataCollection:
```


**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `markets` | `Optional[Union[str, List[str]]]` | Comma separated list of markets. By default all markets are returned. |
| `exchange` | `Optional[str]` | Unique name of an exchange. |
| `market_type` | `Optional[str]` | Type of markets. |
| `base` | `Optional[str]` | Base asset of markets. |
| `quote` | `Optional[str]` | Quote asset of markets. |
| `asset` | `Optional[str]` | Any asset of markets. |
| `symbol` | `Optional[str]` | Symbol of derivative markets, full instrument name. |
| `start_time` | `Optional[Union[datetime, date, str]]` | Start time of the interval. |
| `end_time` | `Optional[Union[datetime, date, str]]` | End time of the interval. |
| `start_inclusive` | `Optional[bool]` | Whether to include the start time in the interval. |
| `end_inclusive` | `Optional[bool]` | Whether to include the end time in the interval. |
| `timezone` | `Optional[str]` | Timezone of the interval. |
| `format` | `Optional[str]` | Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'. |
| `page_size` | `Optional[int]` | Number of items per single page of results. |
| `paging_from` | `Optional[str]` | Where does the first page start, at the start of the interval or at the end. |
| `next_page_token` | `Optional[str]` | Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use `next_page_url` response field. |

**Returns**

`CatalogV2DataCollection` &mdash; List of market open interest statistics.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L3787)

### `catalog_full_market_liquidations_v2`

```python
def CoinMetricsClient.catalog_full_market_liquidations_v2(self, markets: Optional[Union[str, List[str]]]=None, exchange: Optional[str]=None, market_type: Optional[str]=None, base: Optional[str]=None, quote: Optional[str]=None, asset: Optional[str]=None, symbol: Optional[str]=None, start_time: Optional[Union[datetime, date, str]]=None, end_time: Optional[Union[datetime, date, str]]=None, start_inclusive: Optional[bool]=None, end_inclusive: Optional[bool]=None, timezone: Optional[str]=None, format: Optional[str]='json_stream', page_size: Optional[int]=None, paging_from: Optional[str]=None, next_page_token: Optional[str]=None) -> CatalogV2DataCollection:
```


**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `markets` | `Optional[Union[str, List[str]]]` | Comma separated list of markets. By default all markets are returned. |
| `exchange` | `Optional[str]` | Unique name of an exchange. |
| `market_type` | `Optional[str]` | Type of markets. |
| `base` | `Optional[str]` | Base asset of markets. |
| `quote` | `Optional[str]` | Quote asset of markets. |
| `asset` | `Optional[str]` | Any asset of markets. |
| `symbol` | `Optional[str]` | Symbol of derivative markets, full instrument name. |
| `start_time` | `Optional[Union[datetime, date, str]]` | Start time of the interval. |
| `end_time` | `Optional[Union[datetime, date, str]]` | End time of the interval. |
| `start_inclusive` | `Optional[bool]` | Whether to include the start time in the interval. |
| `end_inclusive` | `Optional[bool]` | Whether to include the end time in the interval. |
| `timezone` | `Optional[str]` | Timezone of the interval. |
| `format` | `Optional[str]` | Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'. |
| `page_size` | `Optional[int]` | Number of items per single page of results. |
| `paging_from` | `Optional[str]` | Where does the first page start, at the start of the interval or at the end. |
| `next_page_token` | `Optional[str]` | Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use `next_page_url` response field. |

**Returns**

`CatalogV2DataCollection` &mdash; List of market liquidations statistics.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L3863)

### `catalog_full_market_metrics_v2`

```python
def CoinMetricsClient.catalog_full_market_metrics_v2(self, markets: Optional[Union[str, List[str]]]=None, metrics: Optional[Union[str, List[str]]]=None, exchange: Optional[str]=None, market_type: Optional[str]=None, base: Optional[str]=None, quote: Optional[str]=None, asset: Optional[str]=None, symbol: Optional[str]=None, format: Optional[str]='json_stream', page_size: Optional[int]=None, paging_from: Optional[str]=None, next_page_token: Optional[str]=None) -> CatalogV2DataCollection:
```


**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `markets` | `Optional[Union[str, List[str]]]` | Comma separated list of markets. By default all markets are returned. |
| `metrics` | `Optional[Union[str, List[str]]]` | Comma separated list of metrics. By default all metrics are returned. |
| `exchange` | `Optional[str]` | Unique name of an exchange. |
| `market_type` | `Optional[str]` | Type of markets. |
| `base` | `Optional[str]` | Base asset of markets. |
| `quote` | `Optional[str]` | Quote asset of markets. |
| `asset` | `Optional[str]` | Any asset of markets. |
| `symbol` | `Optional[str]` | Symbol of derivative markets, full instrument name. |
| `format` | `Optional[str]` | Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'. |
| `page_size` | `Optional[int]` | Number of items per single page of results. |
| `paging_from` | `Optional[str]` | Where does the first page start, at the start of the interval or at the end. |
| `next_page_token` | `Optional[str]` | Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use `next_page_url` response field. |

**Returns**

`CatalogV2DataCollection` &mdash; List of market metrics statistics.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L3939)

### `catalog_asset_metrics_v2`

```python
def CoinMetricsClient.catalog_asset_metrics_v2(self, assets: Optional[Union[str, List[str]]]=None, metrics: Optional[Union[str, List[str]]]=None, reviewable: Optional[bool]=None, page_size: Optional[int]=None, paging_from: Optional[str]=None, next_page_token: Optional[str]=None, format: Optional[str]='json_stream') -> CatalogV2DataCollection:
```


**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `assets` | `Optional[Union[str, List[str]]]` | Comma separated list of assets. By default all assets are returned. |
| `metrics` | `Optional[Union[str, List[str]]]` | Comma separated list of metrics. By default all metrics are returned. |
| `reviewable` | `Optional[bool]` | Limit to human-reviewable metrics. By default all metrics are returned. |
| `page_size` | `Optional[int]` | Number of items per single page of results. |
| `paging_from` | `Optional[str]` | Where does the first page start, at the start of the interval or at the end. |
| `next_page_token` | `Optional[str]` | Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use `next_page_url` response field. |
| `format` | `Optional[str]` | Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'. |

**Returns**

`CatalogV2DataCollection` &mdash; List of asset metrics.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L4009)

### `catalog_full_asset_metrics_v2`

```python
def CoinMetricsClient.catalog_full_asset_metrics_v2(self, assets: Optional[Union[str, List[str]]]=None, metrics: Optional[Union[str, List[str]]]=None, reviewable: Optional[bool]=None, page_size: Optional[int]=None, paging_from: Optional[str]=None, next_page_token: Optional[str]=None, format: Optional[str]='json_stream') -> CatalogV2DataCollection:
```


**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `assets` | `Optional[Union[str, List[str]]]` | Comma separated list of assets. By default all assets are returned. |
| `metrics` | `Optional[Union[str, List[str]]]` | Comma separated list of metrics. By default all metrics are returned. |
| `reviewable` | `Optional[bool]` | Limit to human-reviewable metrics. By default all metrics are returned. |
| `page_size` | `Optional[int]` | Number of items per single page of results. |
| `paging_from` | `Optional[str]` | Where does the first page start, at the start of the interval or at the end. |
| `next_page_token` | `Optional[str]` | Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use `next_page_url` response field. |
| `format` | `Optional[str]` | Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'. |

**Returns**

`CatalogV2DataCollection` &mdash; List of asset metrics.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L4060)

### `catalog_exchange_metrics_v2`

```python
def CoinMetricsClient.catalog_exchange_metrics_v2(self, exchanges: Optional[Union[str, List[str]]]=None, metrics: Optional[Union[str, List[str]]]=None, reviewable: Optional[bool]=None, page_size: Optional[int]=None, paging_from: Optional[str]=None, next_page_token: Optional[str]=None, format: Optional[str]='json_stream') -> CatalogV2DataCollection:
```


**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `exchanges` | `Optional[Union[str, List[str]]]` | Comma separated list of exchanges. By default all exchanges are returned. |
| `metrics` | `Optional[Union[str, List[str]]]` | Comma separated list of metrics. By default all metrics are returned. |
| `reviewable` | `Optional[bool]` | Limit to human-reviewable metrics. By default all metrics are returned. |
| `page_size` | `Optional[int]` | Number of items per single page of results. |
| `paging_from` | `Optional[str]` | Where does the first page start, at the start of the interval or at the end. |
| `next_page_token` | `Optional[str]` | Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use `next_page_url` response field. |
| `format` | `Optional[str]` | Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'. |

**Returns**

`CatalogV2DataCollection` &mdash; List of exchange metrics.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L4111)

### `catalog_full_exchange_metrics_v2`

```python
def CoinMetricsClient.catalog_full_exchange_metrics_v2(self, exchanges: Optional[Union[str, List[str]]]=None, metrics: Optional[Union[str, List[str]]]=None, reviewable: Optional[bool]=None, page_size: Optional[int]=None, paging_from: Optional[str]=None, next_page_token: Optional[str]=None, format: Optional[str]='json_stream') -> CatalogV2DataCollection:
```


**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `exchanges` | `Optional[Union[str, List[str]]]` | Comma separated list of exchanges. By default all exchanges are returned. |
| `metrics` | `Optional[Union[str, List[str]]]` | Comma separated list of metrics. By default all metrics are returned. |
| `reviewable` | `Optional[bool]` | Limit to human-reviewable metrics. By default all metrics are returned. |
| `page_size` | `Optional[int]` | Number of items per single page of results. |
| `paging_from` | `Optional[str]` | Where does the first page start, at the start of the interval or at the end. |
| `next_page_token` | `Optional[str]` | Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use `next_page_url` response field. |
| `format` | `Optional[str]` | Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'. |

**Returns**

`CatalogV2DataCollection` &mdash; List of exchange metrics.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L4161)

### `catalog_exchange_asset_metrics_v2`

```python
def CoinMetricsClient.catalog_exchange_asset_metrics_v2(self, exchange_assets: Optional[Union[str, List[str]]]=None, metrics: Optional[Union[str, List[str]]]=None, reviewable: Optional[bool]=None, page_size: Optional[int]=None, paging_from: Optional[str]=None, next_page_token: Optional[str]=None, format: Optional[str]='json_stream') -> CatalogV2DataCollection:
```


**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `exchange_assets` | `Optional[Union[str, List[str]]]` | Comma separated list of exchange-assets. By default, all exchange-assets are returned. |
| `metrics` | `Optional[Union[str, List[str]]]` | Comma separated list of metrics. By default all metrics are returned. |
| `reviewable` | `Optional[bool]` | Limit to human-reviewable metrics. By default all metrics are returned. |
| `page_size` | `Optional[int]` | Number of items per single page of results. |
| `paging_from` | `Optional[str]` | Where does the first page start, at the start of the interval or at the end. |
| `next_page_token` | `Optional[str]` | Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use `next_page_url` response field. |
| `format` | `Optional[str]` | Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'. |

**Returns**

`CatalogV2DataCollection` &mdash; List of exchange-asset metrics.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L4211)

### `catalog_full_exchange_asset_metrics_v2`

```python
def CoinMetricsClient.catalog_full_exchange_asset_metrics_v2(self, exchange_assets: Optional[Union[str, List[str]]]=None, metrics: Optional[Union[str, List[str]]]=None, reviewable: Optional[bool]=None, page_size: Optional[int]=None, paging_from: Optional[str]=None, next_page_token: Optional[str]=None, format: Optional[str]='json_stream') -> CatalogV2DataCollection:
```


**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `exchange_assets` | `Optional[Union[str, List[str]]]` | Comma separated list of exchange-assets. By default, all exchange-assets are returned. |
| `metrics` | `Optional[Union[str, List[str]]]` | Comma separated list of metrics. By default all metrics are returned. |
| `reviewable` | `Optional[bool]` | Limit to human-reviewable metrics. By default all metrics are returned. |
| `page_size` | `Optional[int]` | Number of items per single page of results. |
| `paging_from` | `Optional[str]` | Where does the first page start, at the start of the interval or at the end. |
| `next_page_token` | `Optional[str]` | Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use `next_page_url` response field. |
| `format` | `Optional[str]` | Default: "json_stream" (catalog-v2 and reference-data, market-orderbooks and other heavy endpoints), "json" (timeseries/*-metrics and other lighter endpoints). Format of the response. Supported values are json, json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'. |

**Returns**

`CatalogV2DataCollection` &mdash; List of exchange-asset metrics.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L4261)

### `catalog_exchange_pair_metrics_v2`

```python
def CoinMetricsClient.catalog_exchange_pair_metrics_v2(self, exchange_pairs: Optional[Union[str, List[str]]]=None, metrics: Optional[Union[str, List[str]]]=None, reviewable: Optional[bool]=None, page_size: Optional[int]=None, paging_from: Optional[str]=None, next_page_token: Optional[str]=None, format: Optional[str]='json_stream') -> CatalogV2DataCollection:
```


**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `exchange_pairs` | `Optional[Union[str, List[str]]]` | Comma separated list of exchange-pairs. By default, all exchange-pairs are returned. |
| `metrics` | `Optional[Union[str, List[str]]]` | Comma separated list of metrics. By default all metrics are returned. |
| `reviewable` | `Optional[bool]` | Limit to human-reviewable metrics. By default all metrics are returned. |
| `page_size` | `Optional[int]` | Number of items per single page of results. |
| `paging_from` | `Optional[str]` | Where does the first page start, at the start of the interval or at the end. |
| `next_page_token` | `Optional[str]` | Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use `next_page_url` response field. |
| `format` | `Optional[str]` | Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'. |

**Returns**

`CatalogV2DataCollection` &mdash; List of exchange-pair metrics.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L4311)

### `catalog_full_exchange_pair_metrics_v2`

```python
def CoinMetricsClient.catalog_full_exchange_pair_metrics_v2(self, exchange_pairs: Optional[Union[str, List[str]]]=None, metrics: Optional[Union[str, List[str]]]=None, reviewable: Optional[bool]=None, page_size: Optional[int]=None, paging_from: Optional[str]=None, next_page_token: Optional[str]=None, format: Optional[str]='json_stream') -> CatalogV2DataCollection:
```


**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `exchange_pairs` | `Optional[Union[str, List[str]]]` | Comma separated list of exchange-pairs. By default, all exchange-pairs are returned. |
| `metrics` | `Optional[Union[str, List[str]]]` | Comma separated list of metrics. By default all metrics are returned. |
| `reviewable` | `Optional[bool]` | Limit to human-reviewable metrics. By default all metrics are returned. |
| `page_size` | `Optional[int]` | Number of items per single page of results. |
| `paging_from` | `Optional[str]` | Where does the first page start, at the start of the interval or at the end. |
| `next_page_token` | `Optional[str]` | Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use `next_page_url` response field. |
| `format` | `Optional[str]` | Default: "json_stream" (catalog-v2 and reference-data, market-orderbooks and other heavy endpoints), "json" (timeseries/*-metrics and other lighter endpoints). Format of the response. Supported values are json, json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'. |

**Returns**

`CatalogV2DataCollection` &mdash; List of exchange-pair metrics.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L4361)

### `catalog_pair_metrics_v2`

```python
def CoinMetricsClient.catalog_pair_metrics_v2(self, pairs: Optional[Union[str, List[str]]]=None, metrics: Optional[Union[str, List[str]]]=None, reviewable: Optional[bool]=None, page_size: Optional[int]=None, paging_from: Optional[str]=None, next_page_token: Optional[str]=None, format: Optional[str]='json_stream') -> CatalogV2DataCollection:
```


**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `pairs` | `Optional[Union[str, List[str]]]` | Comma separated list of asset pairs. By default, all asset pairs are returned. |
| `metrics` | `Optional[Union[str, List[str]]]` | Comma separated list of metrics. By default all metrics are returned. |
| `reviewable` | `Optional[bool]` | Limit to human-reviewable metrics. By default all metrics are returned. |
| `page_size` | `Optional[int]` | Number of items per single page of results. |
| `paging_from` | `Optional[str]` | Where does the first page start, at the start of the interval or at the end. |
| `next_page_token` | `Optional[str]` | Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use `next_page_url` response field. |
| `format` | `Optional[str]` | Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'. |

**Returns**

`CatalogV2DataCollection` &mdash; List of pair metrics.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L4411)

### `catalog_full_pair_metrics_v2`

```python
def CoinMetricsClient.catalog_full_pair_metrics_v2(self, pairs: Optional[Union[str, List[str]]]=None, metrics: Optional[Union[str, List[str]]]=None, reviewable: Optional[bool]=None, page_size: Optional[int]=None, paging_from: Optional[str]=None, next_page_token: Optional[str]=None, format: Optional[str]='json_stream') -> CatalogV2DataCollection:
```


**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `pairs` | `Optional[Union[str, List[str]]]` | Comma separated list of asset pairs. By default, all asset pairs are returned. |
| `metrics` | `Optional[Union[str, List[str]]]` | Comma separated list of metrics. By default all metrics are returned. |
| `reviewable` | `Optional[bool]` | Limit to human-reviewable metrics. By default all metrics are returned. |
| `page_size` | `Optional[int]` | Number of items per single page of results. |
| `paging_from` | `Optional[str]` | Where does the first page start, at the start of the interval or at the end. |
| `next_page_token` | `Optional[str]` | Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use `next_page_url` response field. |
| `format` | `Optional[str]` | Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'. |

**Returns**

`CatalogV2DataCollection` &mdash; List of pair metrics.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L4460)

### `catalog_institution_metrics_v2`

```python
def CoinMetricsClient.catalog_institution_metrics_v2(self, institutions: Optional[Union[str, List[str]]]=None, metrics: Optional[Union[str, List[str]]]=None, reviewable: Optional[bool]=None, page_size: Optional[int]=None, paging_from: Optional[str]=None, next_page_token: Optional[str]=None, format: Optional[str]='json_stream') -> CatalogV2DataCollection:
```


**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `institutions` | `Optional[Union[str, List[str]]]` | Comma separated list of institutions. By default, all institutions are returned. |
| `metrics` | `Optional[Union[str, List[str]]]` | Comma separated list of metrics. By default all metrics are returned. |
| `reviewable` | `Optional[bool]` | Limit to human-reviewable metrics. By default all metrics are returned. |
| `page_size` | `Optional[int]` | Number of items per single page of results. |
| `paging_from` | `Optional[str]` | Where does the first page start, at the start of the interval or at the end. |
| `next_page_token` | `Optional[str]` | Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use `next_page_url` response field. |
| `format` | `Optional[str]` | Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'. |

**Returns**

`CatalogV2DataCollection` &mdash; List of institution metrics.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L4510)

### `catalog_full_institution_metrics_v2`

```python
def CoinMetricsClient.catalog_full_institution_metrics_v2(self, institutions: Optional[Union[str, List[str]]]=None, metrics: Optional[Union[str, List[str]]]=None, reviewable: Optional[bool]=None, page_size: Optional[int]=None, paging_from: Optional[str]=None, next_page_token: Optional[str]=None, format: Optional[str]='json_stream') -> CatalogV2DataCollection:
```


**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `institutions` | `Optional[Union[str, List[str]]]` | Comma separated list of institutions. By default, all institutions are returned. |
| `metrics` | `Optional[Union[str, List[str]]]` | Comma separated list of metrics. By default all metrics are returned. |
| `reviewable` | `Optional[bool]` | Limit to human-reviewable metrics. By default all metrics are returned. |
| `page_size` | `Optional[int]` | Number of items per single page of results. |
| `paging_from` | `Optional[str]` | Where does the first page start, at the start of the interval or at the end. |
| `next_page_token` | `Optional[str]` | Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use `next_page_url` response field. |
| `format` | `Optional[str]` | Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'. |

**Returns**

`CatalogV2DataCollection` &mdash; List of institution metrics.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L4560)

### `catalog_pair_candles_v2`

```python
def CoinMetricsClient.catalog_pair_candles_v2(self, pairs: Optional[Union[str, List[str]]]=None, page_size: Optional[int]=None, paging_from: Optional[str]=None, next_page_token: Optional[str]=None, format: Optional[str]='json_stream') -> CatalogV2DataCollection:
```


**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `pairs` | `Optional[Union[str, List[str]]]` | Comma separated list of asset pairs. By default, all asset pairs are returned. |
| `page_size` | `Optional[int]` | Number of items per single page of results. |
| `paging_from` | `Optional[str]` | Where does the first page start, at the start of the interval or at the end. |
| `next_page_token` | `Optional[str]` | Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use `next_page_url` response field. |
| `format` | `Optional[str]` | Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'. |

**Returns**

`CatalogV2DataCollection` &mdash; List of asset pair candles statistics.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L4610)

### `catalog_index_candles_v2`

```python
def CoinMetricsClient.catalog_index_candles_v2(self, indexes: Optional[Union[str, List[str]]]=None, page_size: Optional[int]=None, paging_from: Optional[str]=None, next_page_token: Optional[str]=None, format: Optional[str]='json_stream') -> CatalogV2DataCollection:
```


**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `indexes` | `Optional[Union[str, List[str]]]` | Comma separated list of indexes. By default all assets are returned. |
| `page_size` | `Optional[int]` | Number of items per single page of results. |
| `paging_from` | `Optional[str]` | Where does the first page start, at the start of the interval or at the end. |
| `next_page_token` | `Optional[str]` | Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use `next_page_url` response field. |
| `format` | `Optional[str]` | Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'. |

**Returns**

`CatalogV2DataCollection` &mdash; List of index candles statistics.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L4649)

### `catalog_index_levels_v2`

```python
def CoinMetricsClient.catalog_index_levels_v2(self, indexes: Optional[Union[str, List[str]]]=None, page_size: Optional[int]=None, paging_from: Optional[str]=None, next_page_token: Optional[str]=None, format: Optional[str]='json_stream') -> CatalogV2DataCollection:
```


**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `indexes` | `Optional[Union[str, List[str]]]` | Comma separated list of indexes. By default all indexes are returned. |
| `page_size` | `Optional[int]` | Number of items per single page of results. |
| `paging_from` | `Optional[str]` | Where does the first page start, at the start of the interval or at the end. |
| `next_page_token` | `Optional[str]` | Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use `next_page_url` response field. |
| `format` | `Optional[str]` | Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'. |

**Returns**

`CatalogV2DataCollection` &mdash; List of index levels.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L4688)

### `catalog_asset_chains_v2`

```python
def CoinMetricsClient.catalog_asset_chains_v2(self, assets: Optional[Union[str, List[str]]]=None, page_size: Optional[int]=None, paging_from: Optional[str]=None, next_page_token: Optional[str]=None, format: Optional[str]='json_stream') -> CatalogV2DataCollection:
```


**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `assets` | `Optional[Union[str, List[str]]]` | Comma separated list of assets. By default all assets are returned. |
| `page_size` | `Optional[int]` | Number of items per single page of results. |
| `paging_from` | `Optional[str]` | Where does the first page start, at the start of the interval or at the end. |
| `next_page_token` | `Optional[str]` | Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use `next_page_url` response field. |
| `format` | `Optional[str]` | Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'. |

**Returns**

`CatalogV2DataCollection` &mdash; List of asset chains assets

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L4727)

### `catalog_mempool_feerates_v2`

```python
def CoinMetricsClient.catalog_mempool_feerates_v2(self, assets: Optional[Union[str, List[str]]]=None, page_size: Optional[int]=None, paging_from: Optional[str]=None, next_page_token: Optional[str]=None, format: Optional[str]='json_stream') -> CatalogV2DataCollection:
```


**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `assets` | `Optional[Union[str, List[str]]]` | Comma separated list of assets. By default all assets are returned. |
| `page_size` | `Optional[int]` | Number of items per single page of results. |
| `paging_from` | `Optional[str]` | Where does the first page start, at the start of the interval or at the end. |
| `next_page_token` | `Optional[str]` | Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use `next_page_url` response field. |
| `format` | `Optional[str]` | Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'. |

**Returns**

`CatalogV2DataCollection` &mdash; List of mempool feerates assets

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L4759)

### `catalog_mining_pool_tips_summaries_v2`

```python
def CoinMetricsClient.catalog_mining_pool_tips_summaries_v2(self, assets: Optional[Union[str, List[str]]]=None, page_size: Optional[int]=None, paging_from: Optional[str]=None, next_page_token: Optional[str]=None, format: Optional[str]='json_stream') -> CatalogV2DataCollection:
```


**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `assets` | `Optional[Union[str, List[str]]]` | Comma separated list of assets. By default all assets are returned. |
| `page_size` | `Optional[int]` | Number of items per single page of results. |
| `paging_from` | `Optional[str]` | Where does the first page start, at the start of the interval or at the end. |
| `next_page_token` | `Optional[str]` | Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use `next_page_url` response field. |
| `format` | `Optional[str]` | Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'. |

**Returns**

`CatalogV2DataCollection` &mdash; List of mining pool tips assets

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L4791)

### `catalog_transaction_tracker_assets_v2`

```python
def CoinMetricsClient.catalog_transaction_tracker_assets_v2(self, assets: Optional[Union[str, List[str]]]=None, page_size: Optional[int]=None, paging_from: Optional[str]=None, next_page_token: Optional[str]=None, format: Optional[str]='json_stream') -> CatalogV2DataCollection:
```


**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `assets` | `Optional[Union[str, List[str]]]` | Comma separated list of assets. By default all assets are returned. |
| `page_size` | `Optional[int]` | Number of items per single page of results. |
| `paging_from` | `Optional[str]` | Where does the first page start, at the start of the interval or at the end. |
| `next_page_token` | `Optional[str]` | Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use `next_page_url` response field. |
| `format` | `Optional[str]` | Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'. |

**Returns**

`CatalogV2DataCollection` &mdash; List of transaction tracker assets

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L4823)

### `catalog_full_pair_candles_v2`

```python
def CoinMetricsClient.catalog_full_pair_candles_v2(self, pairs: Optional[Union[str, List[str]]]=None, page_size: Optional[int]=None, paging_from: Optional[str]=None, next_page_token: Optional[str]=None, format: Optional[str]='json_stream') -> CatalogV2DataCollection:
```


**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `pairs` | `Optional[Union[str, List[str]]]` | Comma separated list of asset pairs. By default, all asset pairs are returned. |
| `page_size` | `Optional[int]` | Number of items per single page of results. |
| `paging_from` | `Optional[str]` | Where does the first page start, at the start of the interval or at the end. |
| `next_page_token` | `Optional[str]` | Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use `next_page_url` response field. |
| `format` | `Optional[str]` | Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'. |

**Returns**

`CatalogV2DataCollection` &mdash; List of asset pair candles statistics.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L4855)

### `catalog_full_index_candles_v2`

```python
def CoinMetricsClient.catalog_full_index_candles_v2(self, indexes: Optional[Union[str, List[str]]]=None, page_size: Optional[int]=None, paging_from: Optional[str]=None, next_page_token: Optional[str]=None, format: Optional[str]='json_stream') -> CatalogV2DataCollection:
```


**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `indexes` | `Optional[Union[str, List[str]]]` | Comma separated list of indexes. By default all assets are returned. |
| `page_size` | `Optional[int]` | Number of items per single page of results. |
| `paging_from` | `Optional[str]` | Where does the first page start, at the start of the interval or at the end. |
| `next_page_token` | `Optional[str]` | Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use `next_page_url` response field. |
| `format` | `Optional[str]` | Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'. |

**Returns**

`CatalogV2DataCollection` &mdash; List of index candles statistics.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L4894)

### `catalog_full_index_levels_v2`

```python
def CoinMetricsClient.catalog_full_index_levels_v2(self, indexes: Optional[Union[str, List[str]]]=None, page_size: Optional[int]=None, paging_from: Optional[str]=None, next_page_token: Optional[str]=None, format: Optional[str]='json_stream') -> CatalogV2DataCollection:
```


**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `indexes` | `Optional[Union[str, List[str]]]` | Comma separated list of indexes. By default all indexes are returned. |
| `page_size` | `Optional[int]` | Number of items per single page of results. |
| `paging_from` | `Optional[str]` | Where does the first page start, at the start of the interval or at the end. |
| `next_page_token` | `Optional[str]` | Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use `next_page_url` response field. |
| `format` | `Optional[str]` | Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'. |

**Returns**

`CatalogV2DataCollection` &mdash; List of index levels.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L4933)

### `catalog_full_asset_chains_v2`

```python
def CoinMetricsClient.catalog_full_asset_chains_v2(self, assets: Optional[Union[str, List[str]]]=None, page_size: Optional[int]=None, paging_from: Optional[str]=None, next_page_token: Optional[str]=None, format: Optional[str]='json_stream') -> CatalogV2DataCollection:
```


**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `assets` | `Optional[Union[str, List[str]]]` | Comma separated list of assets. By default all assets are returned. |
| `page_size` | `Optional[int]` | Number of items per single page of results. |
| `paging_from` | `Optional[str]` | Where does the first page start, at the start of the interval or at the end. |
| `next_page_token` | `Optional[str]` | Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use `next_page_url` response field. |
| `format` | `Optional[str]` | Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'. |

**Returns**

`CatalogV2DataCollection` &mdash; List of asset chains assets

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L4970)

### `catalog_full_mempool_feerates_v2`

```python
def CoinMetricsClient.catalog_full_mempool_feerates_v2(self, assets: Optional[Union[str, List[str]]]=None, page_size: Optional[int]=None, paging_from: Optional[str]=None, next_page_token: Optional[str]=None, format: Optional[str]='json_stream') -> CatalogV2DataCollection:
```


**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `assets` | `Optional[Union[str, List[str]]]` | Comma separated list of assets. By default all assets are returned. |
| `page_size` | `Optional[int]` | Number of items per single page of results. |
| `paging_from` | `Optional[str]` | Where does the first page start, at the start of the interval or at the end. |
| `next_page_token` | `Optional[str]` | Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use `next_page_url` response field. |
| `format` | `Optional[str]` | Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'. |

**Returns**

`CatalogV2DataCollection` &mdash; List of mempool feerates assets

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L5002)

### `catalog_full_mining_pool_tips_summaries_v2`

```python
def CoinMetricsClient.catalog_full_mining_pool_tips_summaries_v2(self, assets: Optional[Union[str, List[str]]]=None, page_size: Optional[int]=None, paging_from: Optional[str]=None, next_page_token: Optional[str]=None, format: Optional[str]='json_stream') -> CatalogV2DataCollection:
```


**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `assets` | `Optional[Union[str, List[str]]]` | Comma separated list of assets. By default all assets are returned. |
| `page_size` | `Optional[int]` | Number of items per single page of results. |
| `paging_from` | `Optional[str]` | Where does the first page start, at the start of the interval or at the end. |
| `next_page_token` | `Optional[str]` | Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use `next_page_url` response field. |
| `format` | `Optional[str]` | Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'. |

**Returns**

`CatalogV2DataCollection` &mdash; List of mining pool tips assets

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L5034)

### `catalog_full_transaction_tracker_assets_v2`

```python
def CoinMetricsClient.catalog_full_transaction_tracker_assets_v2(self, assets: Optional[Union[str, List[str]]]=None, page_size: Optional[int]=None, paging_from: Optional[str]=None, next_page_token: Optional[str]=None, format: Optional[str]='json_stream') -> CatalogV2DataCollection:
```


**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `assets` | `Optional[Union[str, List[str]]]` | Comma separated list of assets. By default all assets are returned. |
| `page_size` | `Optional[int]` | Number of items per single page of results. |
| `paging_from` | `Optional[str]` | Where does the first page start, at the start of the interval or at the end. |
| `next_page_token` | `Optional[str]` | Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use `next_page_url` response field. |
| `format` | `Optional[str]` | Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'. |

**Returns**

`CatalogV2DataCollection` &mdash; List of transaction tracker assets

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L5066)

### `catalog_blockchain_accounts_v2`

```python
def CoinMetricsClient.catalog_blockchain_accounts_v2(self, assets: Optional[Union[str, List[str]]]=None, page_size: Optional[int]=None, paging_from: Optional[str]=None, next_page_token: Optional[str]=None, format: Optional[str]='json_stream') -> CatalogV2DataCollection:
```


**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `assets` | `Optional[Union[str, List[str]]]` | Comma separated list of assets. By default all assets are returned. |
| `page_size` | `Optional[int]` | Number of items per single page of results. |
| `paging_from` | `Optional[str]` | Where does the first page start, at the start of the interval or at the end. |
| `next_page_token` | `Optional[str]` | Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use `next_page_url` response field. |
| `format` | `Optional[str]` | Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'. |

**Returns**

`CatalogV2DataCollection` &mdash; List of blockchain-v2/accounts assets using catalog-v2

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L5098)

### `catalog_blockchain_balance_updates_v2`

```python
def CoinMetricsClient.catalog_blockchain_balance_updates_v2(self, assets: Optional[Union[str, List[str]]]=None, page_size: Optional[int]=None, paging_from: Optional[str]=None, next_page_token: Optional[str]=None, format: Optional[str]='json_stream') -> CatalogV2DataCollection:
```


**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `assets` | `Optional[Union[str, List[str]]]` | Comma separated list of assets. By default all assets are returned. |
| `page_size` | `Optional[int]` | Number of items per single page of results. |
| `paging_from` | `Optional[str]` | Where does the first page start, at the start of the interval or at the end. |
| `next_page_token` | `Optional[str]` | Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use `next_page_url` response field. |
| `format` | `Optional[str]` | Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'. |

**Returns**

`CatalogV2DataCollection` &mdash; List of blockchain-v2/balance-updates assets using catalog-v2

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L5130)

### `catalog_blockchain_blocks_v2`

```python
def CoinMetricsClient.catalog_blockchain_blocks_v2(self, assets: Optional[Union[str, List[str]]]=None, page_size: Optional[int]=None, paging_from: Optional[str]=None, next_page_token: Optional[str]=None, format: Optional[str]='json_stream') -> CatalogV2DataCollection:
```


**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `assets` | `Optional[Union[str, List[str]]]` | Comma separated list of assets. By default all assets are returned. |
| `page_size` | `Optional[int]` | Number of items per single page of results. |
| `paging_from` | `Optional[str]` | Where does the first page start, at the start of the interval or at the end. |
| `next_page_token` | `Optional[str]` | Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use `next_page_url` response field. |
| `format` | `Optional[str]` | Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'. |

**Returns**

`CatalogV2DataCollection` &mdash; List of blockchain-v2/blocks assets using catalog-v2

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L5162)

### `catalog_blockchain_rebasing_changes_v2`

```python
def CoinMetricsClient.catalog_blockchain_rebasing_changes_v2(self, assets: Optional[Union[str, List[str]]]=None, page_size: Optional[int]=None, paging_from: Optional[str]=None, next_page_token: Optional[str]=None, format: Optional[str]='json_stream') -> CatalogV2DataCollection:
```


Returns a list of available assets for the blockchain rebasing changes endpoint along with time ranges of available data.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `assets` | `Optional[Union[str, List[str]]]` | Comma separated list of assets. By default all assets are returned. |
| `page_size` | `Optional[int]` | Number of items per single page of results. |
| `paging_from` | `Optional[str]` | Where does the first page start, at the start of the interval or at the end. |
| `next_page_token` | `Optional[str]` | Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use `next_page_url` response field. |
| `format` | `Optional[str]` | Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'. |

**Returns**

`CatalogV2DataCollection` &mdash; List of blockchain-v2/rebasing-changes assets using catalog-v2

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L5194)

### `catalog_blockchain_transactions_v2`

```python
def CoinMetricsClient.catalog_blockchain_transactions_v2(self, assets: Optional[Union[str, List[str]]]=None, page_size: Optional[int]=None, paging_from: Optional[str]=None, next_page_token: Optional[str]=None, format: Optional[str]='json_stream') -> CatalogV2DataCollection:
```


**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `assets` | `Optional[Union[str, List[str]]]` | Comma separated list of assets. By default all assets are returned. |
| `page_size` | `Optional[int]` | Number of items per single page of results. |
| `paging_from` | `Optional[str]` | Where does the first page start, at the start of the interval or at the end. |
| `next_page_token` | `Optional[str]` | Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use `next_page_url` response field. |
| `format` | `Optional[str]` | Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'. |

**Returns**

`CatalogV2DataCollection` &mdash; List of blockchain-v2/transactions assets using catalog-v2

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L5228)

### `catalog_full_blockchain_accounts_v2`

```python
def CoinMetricsClient.catalog_full_blockchain_accounts_v2(self, assets: Optional[Union[str, List[str]]]=None, page_size: Optional[int]=None, paging_from: Optional[str]=None, next_page_token: Optional[str]=None, format: Optional[str]='json_stream') -> CatalogV2DataCollection:
```


**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `assets` | `Optional[Union[str, List[str]]]` | Comma separated list of assets. By default all assets are returned. |
| `page_size` | `Optional[int]` | Number of items per single page of results. |
| `paging_from` | `Optional[str]` | Where does the first page start, at the start of the interval or at the end. |
| `next_page_token` | `Optional[str]` | Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use `next_page_url` response field. |
| `format` | `Optional[str]` | Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'. |

**Returns**

`CatalogV2DataCollection` &mdash; Full list of blockchain-v2/accounts assets using catalog-v2

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L5260)

### `catalog_full_blockchain_balance_updates_v2`

```python
def CoinMetricsClient.catalog_full_blockchain_balance_updates_v2(self, assets: Optional[Union[str, List[str]]]=None, page_size: Optional[int]=None, paging_from: Optional[str]=None, next_page_token: Optional[str]=None, format: Optional[str]='json_stream') -> CatalogV2DataCollection:
```


**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `assets` | `Optional[Union[str, List[str]]]` | Comma separated list of assets. By default all assets are returned. |
| `page_size` | `Optional[int]` | Number of items per single page of results. |
| `paging_from` | `Optional[str]` | Where does the first page start, at the start of the interval or at the end. |
| `next_page_token` | `Optional[str]` | Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use `next_page_url` response field. |
| `format` | `Optional[str]` | Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'. |

**Returns**

`CatalogV2DataCollection` &mdash; Full list of blockchain-v2/balance-updates assets using catalog-v2

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L5292)

### `catalog_full_blockchain_blocks_v2`

```python
def CoinMetricsClient.catalog_full_blockchain_blocks_v2(self, assets: Optional[Union[str, List[str]]]=None, page_size: Optional[int]=None, paging_from: Optional[str]=None, next_page_token: Optional[str]=None, format: Optional[str]='json_stream') -> CatalogV2DataCollection:
```


**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `assets` | `Optional[Union[str, List[str]]]` | Comma separated list of assets. By default all assets are returned. |
| `page_size` | `Optional[int]` | Number of items per single page of results. |
| `paging_from` | `Optional[str]` | Where does the first page start, at the start of the interval or at the end. |
| `next_page_token` | `Optional[str]` | Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use `next_page_url` response field. |
| `format` | `Optional[str]` | Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'. |

**Returns**

`CatalogV2DataCollection` &mdash; Full list of blockchain-v2/blocks assets using catalog-v2

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L5324)

### `catalog_full_blockchain_rebasing_changes_v2`

```python
def CoinMetricsClient.catalog_full_blockchain_rebasing_changes_v2(self, assets: Optional[Union[str, List[str]]]=None, page_size: Optional[int]=None, paging_from: Optional[str]=None, next_page_token: Optional[str]=None, format: Optional[str]='json_stream') -> CatalogV2DataCollection:
```


Returns a list of all supported assets for the blockchain rebasing changes endpoint along with time ranges of available data.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `assets` | `Optional[Union[str, List[str]]]` | Comma separated list of assets. By default all assets are returned. |
| `page_size` | `Optional[int]` | Number of items per single page of results. |
| `paging_from` | `Optional[str]` | Where does the first page start, at the start of the interval or at the end. |
| `next_page_token` | `Optional[str]` | Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use `next_page_url` response field. |
| `format` | `Optional[str]` | Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'. |

**Returns**

`CatalogV2DataCollection` &mdash; Full list of blockchain-v2/rebasing-changes assets using catalog-v2

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L5356)

### `catalog_full_blockchain_transactions_v2`

```python
def CoinMetricsClient.catalog_full_blockchain_transactions_v2(self, assets: Optional[Union[str, List[str]]]=None, page_size: Optional[int]=None, paging_from: Optional[str]=None, next_page_token: Optional[str]=None, format: Optional[str]='json_stream') -> CatalogV2DataCollection:
```


**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `assets` | `Optional[Union[str, List[str]]]` | Comma separated list of assets. By default all assets are returned. |
| `page_size` | `Optional[int]` | Number of items per single page of results. |
| `paging_from` | `Optional[str]` | Where does the first page start, at the start of the interval or at the end. |
| `next_page_token` | `Optional[str]` | Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use `next_page_url` response field. |
| `format` | `Optional[str]` | Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'. |

**Returns**

`CatalogV2DataCollection` &mdash; Full list of blockchain-v2/transactions assets using catalog-v2

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L5390)

### `get_asset_alerts`

```python
def CoinMetricsClient.get_asset_alerts(self, assets: Union[List[str], str], alerts: Union[List[str], str], page_size: Optional[int]=None, paging_from: Optional[Union[PagingFrom, str]]='start', start_time: Optional[Union[datetime, date, str]]=None, end_time: Optional[Union[datetime, date, str]]=None, start_inclusive: Optional[bool]=None, end_inclusive: Optional[bool]=None, timezone: Optional[str]=None, include_heartbeats: Optional[bool]=None, format: Optional[str]=None) -> DataCollection:
```


Returns asset alerts for the specified assets.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `assets` | `list(str), str` | list of asset names, e.g. 'btc' |
| `alerts` | `list(str), str` | list of asset alert names |
| `page_size` | `int` | number of items returned per page when calling the API. If the request times out, try using a smaller number. |
| `paging_from` | `PagingFrom, str` | Defines where you want to start receiving items from, 'start' or 'end' of the timeseries. |
| `start_time` | `datetime, date, str` | Start time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120 |
| `end_time` | `datetime, date, str` | End time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120 |
| `start_inclusive` | `bool` | Flag to define if start timestamp must be included in the timeseries if present. True by default. |
| `end_inclusive` | `bool` | Flag to define if end timestamp must be included in the timeseries if present. True by default. |
| `timezone` | `str` | timezone of the start/end times in db format for example: "America/Chicago". Default value is "UTC". For more details check out API documentation page. |
| `include_heartbeats` | `bool` | If set to true, includes information about most recent time asset was successfully evaluated. |
| `format` | `str` | Format of the response. Supported values are `json`, `csv`. Default is `json`. |

**Returns**

`DataCollection` &mdash; Asset alerts timeseries.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L5422)

### `get_defi_balance_sheets`

```python
def CoinMetricsClient.get_defi_balance_sheets(self, defi_protocols: Union[str, List[str]], page_size: Optional[int]=None, paging_from: Optional[Union[PagingFrom, str]]='start', start_time: Optional[Union[datetime, date, str]]=None, end_time: Optional[Union[datetime, date, str]]=None, start_height: Optional[int]=None, end_height: Optional[int]=None, start_inclusive: Optional[bool]=None, end_inclusive: Optional[bool]=None, timezone: Optional[str]=None, format: Optional[str]=None) -> DataCollection:
```


Returns Defi Balance Sheet records for specified DeFi protocols.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `defi_protocols` | `str, List[str]` | list of DeFi protocols like aave_v2_eth or protocol patterns like aave_v2_* or aave_*_eth or *_eth. |
| `page_size` | `int` | number of items returned per page when calling the API. If the request times out, try using a smaller number. |
| `paging_from` | `PagingFrom, str` | Defines where you want to start receiving items from, 'start' or 'end' of the timeseries. |
| `start_time` | `datetime, date, str` | Start time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120 |
| `end_time` | `datetime, date, str` | End time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120 |
| `start_height` | `int` | The start height indicates the beginning block height for the set of data that are returned. Mutually exclusive with start_time |
| `end_height` | `int` | The end height indicates the beginning block height for the set of data that are returned. Mutually exclusive with end_time |
| `start_inclusive` | `bool` | Flag to define if start timestamp must be included in the timeseries if present. True by default. |
| `end_inclusive` | `bool` | Flag to define if end timestamp must be included in the timeseries if present. True by default. |
| `timezone` | `str` | timezone of the start/end times in db format for example: "America/Chicago". Default value is "UTC". For more details check out API documentation page. |
| `format` | `str` | Format of the response. Supported values are `json`, `csv`. Default is `json`. |

**Returns**

`DataCollection` &mdash; list of blockchain blocks metadata

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L5480)

### `get_asset_chains`

```python
def CoinMetricsClient.get_asset_chains(self, assets: Union[List[str], str], page_size: Optional[int]=None, paging_from: Optional[Union[PagingFrom, str]]='start', start_time: Optional[Union[datetime, date, str]]=None, end_time: Optional[Union[datetime, date, str]]=None, start_inclusive: Optional[bool]=None, end_inclusive: Optional[bool]=None, timezone: Optional[str]=None, format: Optional[str]=None) -> DataCollection:
```


Returns the chains of blocks for the specified assets.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `assets` | `list(str), str` | list of asset names, e.g. 'btc' |
| `page_size` | `int` | number of items returned per page when calling the API. If the request times out, try using a smaller number. |
| `paging_from` | `PagingFrom, str` | Defines where you want to start receiving items from, 'start' or 'end' of the timeseries. |
| `start_time` | `datetime, date, str` | Start time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120 |
| `end_time` | `datetime, date, str` | End time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120 |
| `start_inclusive` | `bool` | Flag to define if start timestamp must be included in the timeseries if present. True by default. |
| `end_inclusive` | `bool` | Flag to define if end timestamp must be included in the timeseries if present. True by default. |
| `timezone` | `str` | timezone of the start/end times in db format for example: "America/Chicago". Default value is "UTC". For more details check out API documentation page. |
| `format` | `str` | Format of the response. Supported values are `json`, `csv`. Default is `json`. |

**Returns**

`DataCollection` &mdash; Asset chains timeseries.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L5537)

### `get_asset_metrics`

```python
def CoinMetricsClient.get_asset_metrics(self, assets: Union[List[str], str], metrics: Union[List[str], str], frequency: Optional[str]=None, page_size: Optional[int]=None, paging_from: Optional[Union[PagingFrom, str]]='start', start_time: Optional[Union[datetime, date, str]]=None, end_time: Optional[Union[datetime, date, str]]=None, start_height: Optional[int]=None, end_height: Optional[int]=None, start_inclusive: Optional[bool]=None, end_inclusive: Optional[bool]=None, timezone: Optional[str]=None, sort: Optional[str]=None, limit_per_asset: Optional[int]=None, status: Optional[str]=None, start_hash: Optional[str]=None, end_hash: Optional[str]=None, min_confirmations: Optional[int]=None, null_as_zero: Optional[bool]=None, ignore_forbidden_errors: Optional[bool]=None, ignore_unsupported_errors: Optional[bool]=None, format: Optional[str]='json_stream') -> DataCollection:
```


Returns requested metrics for specified assets.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `assets` | `list(str), str` | list of asset names, e.g. 'btc' Use the client.catalog_asset_metrics_v2() method for the full list of supported assets or specify asterisk (*) in order to get metrics for all supported assets. |
| `metrics` | `list(str), str` | list of asset-specific metric names, e.g. 'AdrActCnt', 'BlkHgt'. Example: metrics='AdrActCnt,BlkHgt' Comma separated metrics to request time series data for. Information on all available metrics can be found on page https://coverage.coinmetrics.io/asset-metrics-v2. Use the client.catalog_full_asset_metrics_v2() method for the full list of supported metrics per asset. |
| `frequency` | `str` | frequency of the returned timeseries, e.g 15s, 1d, etc. |
| `page_size` | `int` | number of items returned per page when calling the API. If the request times out, try using a smaller number. |
| `paging_from` | `PagingFrom, str` | Defines where you want to start receiving items from, 'start' or 'end' of the timeseries. |
| `start_time` | `datetime, date, str` | Start time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120 |
| `end_time` | `datetime, date, str` | End time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120 |
| `start_height` | `int` | Start block of the timeseries (only applicable when querying with frequency 1b). |
| `end_height` | `int` | End block of the timeseries (only applicable when querying with frequency 1b). |
| `start_inclusive` | `bool` | Flag to define if start timestamp must be included in the timeseries if present. True by default. |
| `end_inclusive` | `bool` | Flag to define if end timestamp must be included in the timeseries if present. True by default. |
| `timezone` | `str` | timezone of the start/end times in db format for example: "America/Chicago". Default value is "UTC". For more details check out API documentation page. |
| `sort` | `str` | How results will be sorted, e.g. "asset", "height", or "time". Default is "asset". Metrics with 1b frequency are sorted by (asset, height, block_hash) tuples by default. Metrics with other frequencies are sorted by (asset, time) by default. If you want to sort 1d metrics by (time, asset) you should choose time as value for the sort parameter. Sorting by time is useful if you request metrics for a set of assets. |
| `limit_per_asset` | `int` | How many entries _per asset_ the result should contain. |
| `status` | `str` | Which metric values do you want to see. Applicable only for "reviewable" metrics. You can find them in the /catalog/metrics endpoint. Default: "all". Supported: "all" "flash" "reviewed" "revised" |
| `start_hash` | `str` | The start hash indicates the beginning block height for the set of data that are returned. Inclusive by default. Mutually exclusive with start_time and start_height. |
| `end_hash` | `str` | The end hash indicates the ending block height for the set of data that are returned. Inclusive by default. Mutually exclusive with end_time and end_height. |
| `min_confirmations` | `int` | Specifies how many blocks behind the chain tip block by block metrics (1b frequency) are based on. Default for btc is 2 and 99 for eth. |
| `null_as_zero` | `bool` | Default: false. Nulls are represented as zeros in the response. |
| `ignore_forbidden_errors` | `bool` | Default: false. Ignore HTTP 403 Forbidden errors |
| `ignore_unsupported_errors` | `bool` | Default: false. Ignore errors for unsupported assets, metrics or frequencies. |
| `format` | `str` | Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'. |

**Returns**

`DataCollection` &mdash; Asset Metrics timeseries.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L5592)

### `get_exchange_metrics`

```python
def CoinMetricsClient.get_exchange_metrics(self, exchanges: Union[List[str], str], metrics: Union[List[str], str], frequency: Optional[str]=None, page_size: Optional[int]=None, paging_from: Optional[Union[PagingFrom, str]]='start', start_time: Optional[Union[datetime, date, str]]=None, end_time: Optional[Union[datetime, date, str]]=None, start_height: Optional[int]=None, end_height: Optional[int]=None, start_inclusive: Optional[bool]=None, end_inclusive: Optional[bool]=None, timezone: Optional[str]=None, sort: Optional[str]=None, limit_per_exchange: Optional[int]=None, format: Optional[str]='json_stream') -> DataCollection:
```


Returns metrics for specified exchanges.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `exchanges` | `list(str), str` | Examples: - exchanges='coinbase,binance,etc' - the list of exchanges - exchanges=* - all supported exchanges Comma separated list of exchange names or asterisk (*) for all supported exchanges. |
| `metrics` | `list(str), str` | Example: metrics=open_interest_reported_future_usd,volume_reported_spot_usd_1d Comma separated metrics to request time series data for. Information on all available metrics can be found on page https://coverage.coinmetrics.io/exchange-metrics-v2. Use the client.catalog_full_exchange_metrics_v2() method for the full list of supported metrics per exchange. |
| `frequency` | `str` | frequency of the returned timeseries, e.g 15s, 1d, etc. |
| `page_size` | `int` | number of items returned per page when calling the API. If the request times out, try using a smaller number. |
| `paging_from` | `PagingFrom, str` | Defines where you want to start receiving items from, 'start' or 'end' of the timeseries. |
| `start_time` | `datetime, date, str` | Start time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120 |
| `end_time` | `datetime, date, str` | End time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120 |
| `start_height` | `int` | Start block of the timeseries (only applicable when querying with frequency 1b). |
| `end_height` | `int` | End block of the timeseries (only applicable when querying with frequency 1b). |
| `start_inclusive` | `bool` | Flag to define if start timestamp must be included in the timeseries if present. True by default. |
| `end_inclusive` | `bool` | Flag to define if end timestamp must be included in the timeseries if present. True by default. |
| `timezone` | `str` | timezone of the start/end times in db format for example: "America/Chicago". Default value is "UTC". For more details check out API documentation page. |
| `sort` | `str` | How results will be sorted, e.g. 'exchange', 'time'. Metrics are sorted by 'exchange' by default. |
| `limit_per_exchange` | `int` | How many entries _per exchange_ the result should contain. |
| `format` | `str` | Format of the response. Supported values are `json`, `csv`. Default is `json`. |

**Returns**

`DataCollection` &mdash; Exchange Metrics timeseries.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L5701)

### `get_exchange_asset_metrics`

```python
def CoinMetricsClient.get_exchange_asset_metrics(self, exchange_assets: Union[List[str], str], metrics: Union[List[str], str], frequency: Optional[str]=None, page_size: Optional[int]=None, paging_from: Optional[Union[PagingFrom, str]]='start', start_time: Optional[Union[datetime, date, str]]=None, end_time: Optional[Union[datetime, date, str]]=None, start_height: Optional[int]=None, end_height: Optional[int]=None, start_inclusive: Optional[bool]=None, end_inclusive: Optional[bool]=None, timezone: Optional[str]=None, sort: Optional[str]=None, limit_per_exchange_asset: Optional[int]=None, format: Optional[str]='json_stream') -> DataCollection:
```


Returns metrics for specified exchange-asset.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `exchange_assets` | `list(str), str` | A list of exchange-asset pairs (e.g. "binance-btc") or patterns like exchange-* or *-asset. |
| `metrics` | `list(str), str` | Example: metrics=open_interest_reported_future_usd,volume_reported_spot_usd_1d Comma separated metrics to request time series data for. Information on all available metrics can be found on page https://coverage.coinmetrics.io/exchange-asset-metrics-v2. Use the client.catalog_full_exchange_asset_metrics_v2() method for the full list of supported metrics per exchange-asset combination. |
| `frequency` | `str` | frequency of the returned timeseries, e.g 15s, 1d, etc. |
| `page_size` | `int` | number of items returned per page when calling the API. If the request times out, try using a smaller number. |
| `paging_from` | `PagingFrom, str` | Defines where you want to start receiving items from, 'start' or 'end' of the timeseries. |
| `start_time` | `datetime, date, str` | Start time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120 |
| `end_time` | `datetime, date, str` | End time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120 |
| `start_height` | `int` | Start block of the timeseries (only applicable when querying with frequency 1b). |
| `end_height` | `int` | End block of the timeseries (only applicable when querying with frequency 1b). |
| `start_inclusive` | `bool` | Flag to define if start timestamp must be included in the timeseries if present. True by default. |
| `end_inclusive` | `bool` | Flag to define if end timestamp must be included in the timeseries if present. True by default. |
| `timezone` | `str` | timezone of the start/end times in db format for example: "America/Chicago". Default value is "UTC". For more details check out API documentation page. |
| `sort` | `str` | How results will be sorted, e.g. "exchange_asset", "time". Default is "exchange_asset". |
| `limit_per_exchange_asset` | `int` | How many entries _per exchange-asset_ the result should contain. |
| `format` | `str` | Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'. |

**Returns**

`DataCollection` &mdash; Exchange-Asset Metrics timeseries.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L5781)

### `get_exchange_pair_metrics`

```python
def CoinMetricsClient.get_exchange_pair_metrics(self, exchange_pairs: Union[List[str], str], metrics: Union[List[str], str], frequency: Optional[str]=None, page_size: Optional[int]=None, paging_from: Optional[Union[PagingFrom, str]]='start', start_time: Optional[Union[datetime, date, str]]=None, end_time: Optional[Union[datetime, date, str]]=None, start_height: Optional[int]=None, end_height: Optional[int]=None, start_inclusive: Optional[bool]=None, end_inclusive: Optional[bool]=None, timezone: Optional[str]=None, format: Optional[str]='json_stream', limit_per_exchange_pair: Optional[int]=None) -> DataCollection:
```


Returns metrics for specified exchange-pair.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `exchange_pairs` | `list(str), str` | A list of exchange-pairs or patterns like exchange-* or *-pair. |
| `metrics` | `list(str), str` | Example: metrics=volatility_implied_put_delta_50_1y_expiration,volatility_implied_skew_delta_05_1d_expiration Comma separated metrics to request time series data for. Information on all available metrics can be found on page https://coverage.coinmetrics.io/exchange-pair-metrics. Use the catalog_full_exchange_pair_metrics_v2() method for the full list of supported metrics per exchange-pair combination. |
| `frequency` | `str` | frequency of the returned timeseries, e.g 15s, 1d, etc. |
| `page_size` | `int` | number of items returned per page when calling the API. If the request times out, try using a smaller number. |
| `paging_from` | `PagingFrom, str` | Defines where you want to start receiving items from, 'start' or 'end' of the timeseries. |
| `start_time` | `datetime, date, str` | Start time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120 |
| `end_time` | `datetime, date, str` | End time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120 |
| `start_height` | `int` | Start block of the timeseries (only applicable when querying with frequency 1b). |
| `end_height` | `int` | End block of the timeseries (only applicable when querying with frequency 1b). |
| `start_inclusive` | `bool` | Flag to define if start timestamp must be included in the timeseries if present. True by default. |
| `end_inclusive` | `bool` | Flag to define if end timestamp must be included in the timeseries if present. True by default. |
| `timezone` | `str` | timezone of the start/end times in db format for example: "America/Chicago". Default value is "UTC". For more details check out API documentation page. |
| `format` | `str` | Default: "json". Enum: "json" "json_stream" "csv". Format of the response. Supported values are json, json_stream, csv. |
| `limit_per_exchange_pair` | `int` | How many entries _per exchange_ the result should contain. |

**Returns**

`DataCollection` &mdash; Exchange-Pair Metrics timeseries.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L5860)

### `get_pair_metrics`

```python
def CoinMetricsClient.get_pair_metrics(self, pairs: Union[List[str], str], metrics: Union[List[str], str], frequency: Optional[str]=None, page_size: Optional[int]=None, paging_from: Optional[Union[PagingFrom, str]]='start', start_time: Optional[Union[datetime, date, str]]=None, end_time: Optional[Union[datetime, date, str]]=None, start_height: Optional[int]=None, end_height: Optional[int]=None, start_inclusive: Optional[bool]=None, end_inclusive: Optional[bool]=None, timezone: Optional[str]=None, sort: Optional[str]=None, limit_per_pair: Optional[int]=None, format: Optional[str]='json') -> DataCollection:
```


Returns metrics books for specified asset-asset pairs.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `pairs` | `list(str), str` | List of asset pairs or patterns like btc-*, or *-btc. Use a corresponding client.catalog_pair_metrics_v2() method for the full list of supported pairs for a given data type. |
| `metrics` | `list(str), str` | Example: metrics=volume_trusted_spot_usd_1h,volume_trusted_spot_usd_1d Comma separated metrics to request time series data for. Information on all available metrics can be found on page https://coverage.coinmetrics.io/pair-metrics-v2. Use the client.catalog_full_pair_metrics_v2() method for the full list of supported metrics per pair. |
| `frequency` | `str` | frequency of the returned timeseries, e.g 15s, 1d, etc. |
| `page_size` | `int` | number of items returned per page when calling the API. If the request times out, try using a smaller number. |
| `paging_from` | `PagingFrom, str` | Defines where you want to start receiving items from, 'start' or 'end' of the timeseries. |
| `start_time` | `datetime, date, str` | Start time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120 |
| `end_time` | `datetime, date, str` | End time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120 |
| `start_height` | `int` | Start block of the timeseries (only applicable when querying with frequency 1b). |
| `end_height` | `int` | End block of the timeseries (only applicable when querying with frequency 1b). |
| `start_inclusive` | `bool` | Flag to define if start timestamp must be included in the timeseries if present. True by default. |
| `end_inclusive` | `bool` | Flag to define if end timestamp must be included in the timeseries if present. True by default. |
| `timezone` | `str` | timezone of the start/end times in db format for example: "America/Chicago". Default value is "UTC". For more details check out API documentation page. |
| `sort` | `str` | How results will be sorted, e.g."pair", "time". "pair" by default |
| `limit_per_pair` | `int` | How many entries _per asset pair_ the result should contain. |

**Returns**

`DataCollection` &mdash; Pair Metrics timeseries.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L5933)

### `get_pair_candles`

```python
def CoinMetricsClient.get_pair_candles(self, pairs: Union[List[str], str], frequency: Optional[str]=None, page_size: Optional[int]=None, paging_from: Optional[Union[PagingFrom, str]]='start', start_time: Optional[Union[datetime, date, str]]=None, end_time: Optional[Union[datetime, date, str]]=None, start_height: Optional[int]=None, end_height: Optional[int]=None, start_inclusive: Optional[bool]=None, end_inclusive: Optional[bool]=None, timezone: Optional[str]=None, limit_per_pair: Optional[int]=None, format: Optional[str]='json_stream') -> DataCollection:
```


Returns candles for specified asset pairs.
Results are ordered by tuple (pair, time).

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `pairs` | `list(str), str` | A single asset-asset pairs (e.g. "btc-usd") or a list of asset-asset-pairs to return info for. |
| `frequency` | `str` | frequency of the returned timeseries, e.g 15s, 1d, etc. |
| `page_size` | `int` | number of items returned per page when calling the API. If the request times out, try using a smaller number. |
| `paging_from` | `PagingFrom, str` | Defines where you want to start receiving items from, 'start' or 'end' of the timeseries. |
| `start_time` | `datetime, date, str` | Start time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120 |
| `end_time` | `datetime, date, str` | End time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120 |
| `start_height` | `int` | Start block of the timeseries (only applicable when querying with frequency 1b). |
| `end_height` | `int` | End block of the timeseries (only applicable when querying with frequency 1b). |
| `start_inclusive` | `bool` | Flag to define if start timestamp must be included in the timeseries if present. True by default. |
| `end_inclusive` | `bool` | Flag to define if end timestamp must be included in the timeseries if present. True by default. |
| `timezone` | `str` | timezone of the start/end times in db format for example: "America/Chicago". Default value is "UTC". For more details check out API documentation page. |
| `limit_per_pair` | `int` | How many entries _per asset pair_ the result should contain. |
| `format` | `str` | Format of the response. Supported values are `json`, `csv`. Default is `json`. |

**Returns**

`DataCollection` &mdash; Asset pair candles timeseries.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L6009)

### `get_institution_metrics`

```python
def CoinMetricsClient.get_institution_metrics(self, institutions: Union[List[str], str], metrics: Union[List[str], str], frequency: Optional[str]=None, page_size: Optional[int]=None, paging_from: Optional[Union[PagingFrom, str]]='start', start_time: Optional[Union[datetime, date, str]]=None, end_time: Optional[Union[datetime, date, str]]=None, start_height: Optional[int]=None, end_height: Optional[int]=None, start_inclusive: Optional[bool]=None, end_inclusive: Optional[bool]=None, timezone: Optional[str]=None, sort: Optional[str]=None, limit_per_institution: Optional[int]=None, format: Optional[str]=None) -> DataCollection:
```


Returns metrics for specified institutions.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `institutions` | `list(str), str` | A single institution name or a list of institutions to return info for. |
| `metrics` | `list(str), str` | list of _institution-specific_ metric names, e.g. 'gbtc_total_assets' |
| `frequency` | `str` | frequency of the returned timeseries, e.g 15s, 1d, etc. |
| `page_size` | `int` | number of items returned per page when calling the API. If the request times out, try using a smaller number. |
| `paging_from` | `PagingFrom, str` | Defines where you want to start receiving items from, 'start' or 'end' of the timeseries. |
| `start_time` | `datetime, date, str` | Start time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120 |
| `end_time` | `datetime, date, str` | End time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120 |
| `start_height` | `int` | Start block of the timeseries (only applicable when querying with frequency 1b). |
| `end_height` | `int` | End block of the timeseries (only applicable when querying with frequency 1b). |
| `start_inclusive` | `bool` | Flag to define if start timestamp must be included in the timeseries if present. True by default. |
| `end_inclusive` | `bool` | Flag to define if end timestamp must be included in the timeseries if present. True by default. |
| `timezone` | `str` | timezone of the start/end times in db format for example: "America/Chicago". Default value is "UTC". For more details check out API documentation page. |
| `sort` | `str` | How results will be sorted, e.g. "institution", or "time". Default is "institution". |
| `limit_per_institution` | `int` | How many entries _per institution_ the result should contain. |
| `format` | `str` | Format of the response. Supported values are `json`, `csv`. Default is `json`. |

**Returns**

`DataCollection` &mdash; Asset Metrics timeseries.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L6076)

### `get_index_candles`

```python
def CoinMetricsClient.get_index_candles(self, indexes: Union[List[str], str], frequency: Optional[str]=None, page_size: Optional[int]=None, paging_from: Optional[Union[PagingFrom, str]]='start', start_time: Optional[Union[datetime, date, str]]=None, end_time: Optional[Union[datetime, date, str]]=None, start_inclusive: Optional[bool]=None, end_inclusive: Optional[bool]=None, timezone: Optional[str]=None, limit_per_index: Optional[int]=None, format: Optional[str]='json_stream') -> DataCollection:
```


Returns index candles for specified indexes and date range.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `indexes` | `list(str), str` | list of index names, e.g. 'CMBI10' |
| `frequency` | `str` | frequency of the returned timeseries, e.g 15s, 1d, etc. |
| `page_size` | `int` | number of items returned per page when calling the API. If the request times out, try using a smaller number. |
| `paging_from` | `PagingFrom, str` | Defines where you want to start receiving items from, 'start' or 'end' of the timeseries. |
| `start_time` | `datetime, date, str` | Start time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120 |
| `end_time` | `datetime, date, str` | End time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120 |
| `start_inclusive` | `bool` | Flag to define if start timestamp must be included in the timeseries if present. True by default. |
| `end_inclusive` | `bool` | Flag to define if end timestamp must be included in the timeseries if present. True by default. |
| `timezone` | `str` | timezone of the start/end times in db format for example: "America/Chicago". Default value is "UTC". For more details check out API documentation page. |
| `limit_per_index` | `int` | How many entries _per index_ the result should contain. |
| `format` | `str` | Format of the response. Supported values are `json`, `csv`. Default is `json`. |

**Returns**

`DataCollection` &mdash; Index Candles timeseries.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L6150)

### `get_index_levels`

```python
def CoinMetricsClient.get_index_levels(self, indexes: Union[List[str], str], frequency: Optional[str]=None, granularity: Optional[str]=None, start_time: Optional[Union[datetime, date, str]]=None, end_time: Optional[Union[datetime, date, str]]=None, start_inclusive: Optional[bool]=None, end_inclusive: Optional[bool]=None, timezone: Optional[str]=None, page_size: Optional[int]=None, paging_from: Optional[Union[PagingFrom, str]]='start', limit_per_index: Optional[int]=None, include_verification: Optional[bool]=None, format: Optional[str]='json_stream') -> DataCollection:
```


Returns index levels for specified indexes and date range.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `indexes` | `list(str), str` | list of index names, e.g. 'CMBI10' |
| `frequency` | `str` | frequency of the returned timeseries, e.g 15s, 1d, etc. |
| `granularity` | `str` | Default: "1s" granularity of the returned timeseries, e.g 1s, 1m, etc. |
| `start_time` | `datetime, date, str` | Start time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120 |
| `end_time` | `datetime, date, str` | End time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120 |
| `start_inclusive` | `bool` | Flag to define if start timestamp must be included in the timeseries if present. True by default. |
| `end_inclusive` | `bool` | Flag to define if end timestamp must be included in the timeseries if present. True by default. |
| `timezone` | `str` | timezone of the start/end times in db format for example: "America/Chicago". Default value is "UTC". For more details check out API documentation page. |
| `page_size` | `int` | number of items returned per page when calling the API. If the request times out, try using a smaller number. |
| `paging_from` | `PagingFrom, str` | Defines where you want to start receiving items from, 'start' or 'end' of the timeseries. |
| `limit_per_index` | `int` | How many entries _per index_ the result should contain. |
| `include_verification` |  | Default: False set to true, includes information about verification. |
| `format` | `str` | Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'. |

**Returns**

`DataCollection` &mdash; Index Levels timeseries.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L6208)

### `get_index_constituents`

```python
def CoinMetricsClient.get_index_constituents(self, indexes: Union[List[str], str], frequency: Optional[str]=None, page_size: Optional[int]=None, paging_from: Optional[Union[PagingFrom, str]]='start', start_time: Optional[Union[datetime, date, str]]=None, end_time: Optional[Union[datetime, date, str]]=None, start_inclusive: Optional[bool]=None, end_inclusive: Optional[bool]=None, timezone: Optional[str]=None, format: Optional[str]=None) -> DataCollection:
```


Returns index constituents for specified indexes and date range.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `indexes` | `list(str), str` | list of index names, e.g. 'CMBI10' |
| `frequency` | `str` | frequency of the returned timeseries, e.g 15s, 1d, etc. |
| `page_size` | `int` | number of items returned per page when calling the API. If the request times out, try using a smaller number. |
| `paging_from` | `PagingFrom, str` | Defines where you want to start receiving items from, 'start' or 'end' of the timeseries. |
| `start_time` | `datetime, date, str` | Start time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120 |
| `end_time` | `datetime, date, str` | End time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120 |
| `start_inclusive` | `bool` | Flag to define if start timestamp must be included in the timeseries if present. True by default. |
| `end_inclusive` | `bool` | Flag to define if end timestamp must be included in the timeseries if present. True by default. |
| `timezone` | `str` | timezone of the start/end times in db format for example: "America/Chicago". Default value is "UTC". For more details check out API documentation page. |
| `format` | `str` | Format of the response. Supported values are `json`, `csv`. Default is `json`. |

**Returns**

`DataCollection` &mdash; Index Constituents timeseries.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L6274)

### `get_market_metrics`

```python
def CoinMetricsClient.get_market_metrics(self, markets: Union[List[str], str], metrics: Union[List[str], str], frequency: Optional[str]=None, page_size: Optional[int]=None, paging_from: Optional[Union[PagingFrom, str]]='start', start_time: Optional[Union[datetime, date, str]]=None, end_time: Optional[Union[datetime, date, str]]=None, start_inclusive: Optional[bool]=None, end_inclusive: Optional[bool]=None, timezone: Optional[str]=None, limit_per_market: Optional[int]=None, sort: Optional[str]=None, ignore_forbidden_errors: Optional[bool]=None, ignore_unsupported_errors: Optional[bool]=None, format: Optional[str]='json_stream') -> DataCollection:
```


Returns market metrics for specified markets, frequency and date range.
For more information on market metrics, see: https://docs.coinmetrics.io/api/v4#operation/getTimeseriesMarketMetrics

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `markets` | `list(str), str` | list of market ids. Market ids use the following naming convention: `exchangeName-baseAsset-quoteAsset-spot` for spot markets, `exchangeName-futuresSymbol-future` for futures markets, and `exchangeName-optionsSymbol-option` for options markets. e.g., `'coinbase-btc-usd-spot'`, `'bitmex-XBTUSD-future'` |
| `metrics` | `list(str), str` | list of metrics, i.e. 'liquidations_reported_future_buy_units_1d'. See market metrics catalog for a list of supported metrics: https://docs.coinmetrics.io/api/v4#operation/getCatalogMarketMetrics |
| `frequency` | `str` | frequency of the returned timeseries, e.g 15s, 1d, etc. |
| `page_size` | `int` | number of items returned per page when calling the API. If the request times out, try using a smaller number. |
| `paging_from` | `PagingFrom, str` | Defines where you want to start receiving items from, 'start' or 'end' of the timeseries. |
| `start_time` | `datetime, date, str` | Start time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120 |
| `end_time` | `datetime, date, str` | End time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120 |
| `start_inclusive` | `bool` | Flag to define if start timestamp must be included in the timeseries if present. True by default. |
| `end_inclusive` | `bool` | Flag to define if end timestamp must be included in the timeseries if present. True by default. |
| `timezone` | `str` | timezone of the start/end times in db format for example: "America/Chicago". Default value is "UTC". For more details check out API documentation page. |
| `limit_per_market` | `int` | How many entries _per market_ the result should contain. |
| `sort` | `str` | How results will be sorted. Metrics are sorted by (market, time) by default. If you want to sort 1d metrics by (time, market) you should choose time as value for the sort parameter. Sorting by time is useful if you request metrics for a set of markets. |
| `ignore_forbidden_errors` | `bool` | Default: false. Ignore HTTP 403 Forbidden errors |
| `ignore_unsupported_errors` | `bool` | Default: false. Ignore errors for unsupported assets, metrics or frequencies. |
| `format` | `str` | Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'. |

**Returns**

`DataCollection` &mdash; Market metrics timeseries.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L6328)

### `get_market_candles`

```python
def CoinMetricsClient.get_market_candles(self, markets: Union[List[str], str], frequency: Optional[str]=None, page_size: Optional[int]=None, paging_from: Optional[Union[PagingFrom, str]]='start', start_time: Optional[Union[datetime, date, str]]=None, end_time: Optional[Union[datetime, date, str]]=None, start_inclusive: Optional[bool]=None, end_inclusive: Optional[bool]=None, timezone: Optional[str]=None, limit_per_market: Optional[int]=None, format: Optional[str]='json_stream', ignore_unsupported_errors: Optional[bool]=None, ignore_forbidden_errors: Optional[bool]=None) -> DataCollection:
```


Returns market candles for specified markets, frequency and date range.
For more information on market candles, see: https://docs.coinmetrics.io/info/markets/candles

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `markets` | `list(str), str` | list of market ids. Market ids use the following naming convention: `exchangeName-baseAsset-quoteAsset-spot` for spot markets, `exchangeName-futuresSymbol-future` for futures markets, and `exchangeName-optionsSymbol-option` for options markets. e.g., `'coinbase-btc-usd-spot'`, `'bitmex-XBTUSD-future'` |
| `frequency` | `str` | frequency of the returned timeseries, e.g 15s, 1d, etc. |
| `page_size` | `int` | number of items returned per page when calling the API. If the request times out, try using a smaller number. |
| `paging_from` | `PagingFrom, str` | Defines where you want to start receiving items from, 'start' or 'end' of the timeseries. |
| `start_time` | `datetime, date, str` | Start time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120 |
| `end_time` | `datetime, date, str` | End time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120 |
| `start_inclusive` | `bool` | Flag to define if start timestamp must be included in the timeseries if present. True by default. |
| `end_inclusive` | `bool` | Flag to define if end timestamp must be included in the timeseries if present. True by default. |
| `timezone` | `str` | timezone of the start/end times in db format for example: "America/Chicago". Default value is "UTC". For more details check out API documentation page. |
| `limit_per_market` | `int` | How many entries _per market_ the result should contain. |
| `format` | `str` | Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'. |
| `ignore_unsupported_errors` | `bool` | Whether to ignore 401 Unauthorized errors. Default is False. |
| `ignore_forbidden_errors` | `bool` | Whether to ignore 403 Forbidden errors. Default is False. |

**Returns**

`DataCollection` &mdash; Market Candles timeseries.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L6405)

### `get_market_trades`

```python
def CoinMetricsClient.get_market_trades(self, markets: Union[List[str], str], page_size: Optional[int]=None, paging_from: Optional[Union[PagingFrom, str]]='start', start_time: Optional[Union[datetime, date, str]]=None, end_time: Optional[Union[datetime, date, str]]=None, start_inclusive: Optional[bool]=None, end_inclusive: Optional[bool]=None, timezone: Optional[str]=None, limit_per_market: Optional[int]=None, min_confirmations: Optional[int]=None, format: Optional[str]='json_stream') -> DataCollection:
```


Returns market trades for specified markets and date range.
For more information on market trades, see: https://docs.coinmetrics.io/info/markets/trades

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `markets` | `list(str), str` | list of market ids. Market ids use the following naming convention: `exchangeName-baseAsset-quoteAsset-spot` for spot markets, `exchangeName-futuresSymbol-future` for futures markets, and `exchangeName-optionsSymbol-option` for options markets. e.g., `'coinbase-btc-usd-spot'`, `'bitmex-XBTUSD-future'` |
| `page_size` | `int` | number of items returned per page when calling the API. If the request times out, try using a smaller number. |
| `paging_from` | `PagingFrom, str` | Defines where you want to start receiving items from, 'start' or 'end' of the timeseries. |
| `start_time` | `datetime, date, str` | Start time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120 |
| `end_time` | `datetime, date, str` | End time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120 |
| `start_inclusive` | `bool` | Flag to define if start timestamp must be included in the timeseries if present. True by default. |
| `end_inclusive` | `bool` | Flag to define if end timestamp must be included in the timeseries if present. True by default. |
| `timezone` | `str` | timezone of the start/end times in db format for example: "America/Chicago". Default value is "UTC". For more details check out API documentation page. |
| `limit_per_market` | `int` | How many entries _per market_ the result should contain. |
| `min_confirmations` | `int` | Specifies how many blocks behind the chain tip trades are based on. Default is 2. |
| `format` | `str` | Default: "json_stream". Format of the response. Supported values are json, json_stream. |

**Returns**

`DataCollection` &mdash; Market Trades timeseries.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L6472)

### `get_market_open_interest`

```python
def CoinMetricsClient.get_market_open_interest(self, markets: Union[List[str], str], page_size: Optional[int]=None, paging_from: Optional[Union[PagingFrom, str]]='start', start_time: Optional[Union[datetime, date, str]]=None, end_time: Optional[Union[datetime, date, str]]=None, start_inclusive: Optional[bool]=None, end_inclusive: Optional[bool]=None, granularity: Optional[str]=None, timezone: Optional[str]=None, limit_per_market: Optional[int]=None, format: Optional[str]='json_stream') -> DataCollection:
```


Returns market open interest for specified markets and date range.
For more information on open interest, see: https://docs.coinmetrics.io/info/markets/openinterest

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `markets` | `list(str), str` | list of market ids. Market ids use the following naming convention: `exchangeName-baseAsset-quoteAsset-spot` for spot markets, `exchangeName-futuresSymbol-future` for futures markets, and `exchangeName-optionsSymbol-option` for options markets. e.g., `'coinbase-btc-usd-spot'`, `'bitmex-XBTUSD-future'` |
| `page_size` | `int` | number of items returned per page when calling the API. If the request times out, try using a smaller number. |
| `paging_from` | `PagingFrom, str` | Defines where you want to start receiving items from, 'start' or 'end' of the timeseries. |
| `start_time` | `datetime, date, str` | Start time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120 |
| `end_time` | `datetime, date, str` | End time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120 |
| `start_inclusive` | `bool` | Flag to define if start timestamp must be included in the timeseries if present. True by default. |
| `end_inclusive` | `bool` | Flag to define if end timestamp must be included in the timeseries if present. True by default. |
| `granularity` | `str` | Downsampling granularity of market open interest. Supported values are raw, 1m, 1h, and 1d. |
| `timezone` | `str` | timezone of the start/end times in db format for example: "America/Chicago". Default value is "UTC". For more details check out API documentation page. |
| `limit_per_market` | `int` | How many entries _per market_ the result should contain. |
| `format` | `str` | Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'. |

**Returns**

`DataCollection` &mdash; Market Open Interest timeseries.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L6536)

### `get_market_liquidations`

```python
def CoinMetricsClient.get_market_liquidations(self, markets: Union[List[str], str], page_size: Optional[int]=None, paging_from: Optional[Union[PagingFrom, str]]='start', start_time: Optional[Union[datetime, date, str]]=None, end_time: Optional[Union[datetime, date, str]]=None, start_inclusive: Optional[bool]=None, end_inclusive: Optional[bool]=None, timezone: Optional[str]=None, limit_per_market: Optional[int]=None, format: Optional[str]='json_stream') -> DataCollection:
```


Returns market liquidations for specified markets and date range.
For more information on liquidations, see: https://docs.coinmetrics.io/info/markets/liquidations

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `markets` | `list(str), str` | list of market ids. Market ids use the following naming convention: `exchangeName-baseAsset-quoteAsset-spot` for spot markets, `exchangeName-futuresSymbol-future` for futures markets, and `exchangeName-optionsSymbol-option` for options markets. e.g., `'coinbase-btc-usd-spot'`, `'bitmex-XBTUSD-future'` |
| `page_size` | `int` | number of items returned per page when calling the API. If the request times out, try using a smaller number. |
| `paging_from` | `PagingFrom, str` | Defines where you want to start receiving items from, 'start' or 'end' of the timeseries. |
| `start_time` | `datetime, date, str` | Start time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120 |
| `end_time` | `datetime, date, str` | End time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120 |
| `start_inclusive` | `bool` | Flag to define if start timestamp must be included in the timeseries if present. True by default. |
| `end_inclusive` | `bool` | Flag to define if end timestamp must be included in the timeseries if present. True by default. |
| `timezone` | `str` | timezone of the start/end times in db format for example: "America/Chicago". Default value is "UTC". For more details check out API documentation page. |
| `limit_per_market` | `int` | How many entries _per market_ the result should contain. |
| `format` | `str` | Format of the response. Supported values are `json`, `json_stream`, `csv`. Default is `json`. |

**Returns**

`DataCollection` &mdash; Market Liquidations timeseries.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L6595)

### `get_market_funding_rates`

```python
def CoinMetricsClient.get_market_funding_rates(self, markets: Union[List[str], str], page_size: Optional[int]=None, paging_from: Optional[Union[PagingFrom, str]]='start', start_time: Optional[Union[datetime, date, str]]=None, end_time: Optional[Union[datetime, date, str]]=None, start_inclusive: Optional[bool]=None, end_inclusive: Optional[bool]=None, timezone: Optional[str]=None, limit_per_market: Optional[int]=None, format: Optional[str]='json_stream') -> DataCollection:
```


Returns market funding rates for specified markets and date range.
For more information on funding rates, see: https://docs.coinmetrics.io/info/markets/fundingrates

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `markets` | `list(str), str` | list of market ids. Market ids use the following naming convention: `exchangeName-baseAsset-quoteAsset-spot` for spot markets, `exchangeName-futuresSymbol-future` for futures markets, and `exchangeName-optionsSymbol-option` for options markets. e.g., `'coinbase-btc-usd-spot'`, `'bitmex-XBTUSD-future'` |
| `page_size` | `int` | number of items returned per page when calling the API. If the request times out, try using a smaller number. |
| `paging_from` | `PagingFrom, str` | Defines where you want to start receiving items from, 'start' or 'end' of the timeseries. |
| `start_time` | `datetime, date, str` | Start time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120 |
| `end_time` | `datetime, date, str` | End time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120 |
| `start_inclusive` | `bool` | Flag to define if start timestamp must be included in the timeseries if present. True by default. |
| `end_inclusive` | `bool` | Flag to define if end timestamp must be included in the timeseries if present. True by default. |
| `timezone` | `str` | timezone of the start/end times in db format for example: "America/Chicago". Default value is "UTC". For more details check out API documentation page. |
| `limit_per_market` | `int` | How many entries _per market_ the result should contain. |
| `format` | `str` | Format of the response. Supported values are `json`, `json_stream`, `csv`. Default is `json`. |

**Returns**

`DataCollection` &mdash; Market Funding Rates timeseries.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L6650)

### `get_predicted_market_funding_rates`

```python
def CoinMetricsClient.get_predicted_market_funding_rates(self, markets: Union[List[str], str], start_time: Optional[Union[datetime, date, str]]=None, end_time: Optional[Union[datetime, date, str]]=None, start_inclusive: Optional[bool]=None, end_inclusive: Optional[bool]=None, timezone: Optional[str]=None, page_size: Optional[int]=None, paging_from: Optional[Union[PagingFrom, str]]='start', limit_per_market: Optional[int]=None, format: Optional[str]='json_stream') -> DataCollection:
```


Returns predicted funding rates for specified futures markets. Results are ordered by tuple (market, time).
For more information on funding rates, see: https://docs.coinmetrics.io/info/markets/fundingrates

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `markets` | `list(str), str` | list of market ids. Market ids use the following naming convention: `exchangeName-baseAsset-quoteAsset-spot` for spot markets, `exchangeName-futuresSymbol-future` for futures markets, and `exchangeName-optionsSymbol-option` for options markets. e.g., `'coinbase-btc-usd-spot'`, `'bitmex-XBTUSD-future'` |
| `page_size` | `int` | number of items returned per page when calling the API. If the request times out, try using a smaller number. |
| `paging_from` | `PagingFrom, str` | Defines where you want to start receiving items from, 'start' or 'end' of the timeseries. |
| `start_time` | `datetime, date, str` | Start time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120 |
| `end_time` | `datetime, date, str` | End time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120 |
| `start_inclusive` | `bool` | Flag to define if start timestamp must be included in the timeseries if present. True by default. |
| `end_inclusive` | `bool` | Flag to define if end timestamp must be included in the timeseries if present. True by default. |
| `timezone` | `str` | timezone of the start/end times in db format for example: "America/Chicago". Default value is "UTC". For more details check out API documentation page. |
| `limit_per_market` | `int` | How many entries _per market_ the result should contain. |
| `format` | `str` | Format of the response. Supported values are `json`, `json_stream`, `csv`. Default is `json`. |

**Returns**

`DataCollection` &mdash; Market Funding Rates timeseries.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L6705)

### `get_market_orderbooks`

```python
def CoinMetricsClient.get_market_orderbooks(self, markets: Union[List[str], str], granularity: Optional[str]=None, page_size: Optional[int]=None, paging_from: Optional[Union[PagingFrom, str]]='start', start_time: Optional[Union[datetime, date, str]]=None, end_time: Optional[Union[datetime, date, str]]=None, start_inclusive: Optional[bool]=None, end_inclusive: Optional[bool]=None, depth_limit: Optional[str]='100', timezone: Optional[str]=None, limit_per_market: Optional[int]=None, format: Optional[str]='json_stream') -> DataCollection:
```


Returns market order books for specified markets and date range.
For more information on order books, see: https://docs.coinmetrics.io/info/markets/orderbook

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `markets` | `list(str), str` | list of market ids. Market ids use the following naming convention: `exchangeName-baseAsset-quoteAsset-spot` for spot markets, `exchangeName-futuresSymbol-future` for futures markets, and `exchangeName-optionsSymbol-option` for options markets. e.g., `'coinbase-btc-usd-spot'`, `'bitmex-XBTUSD-future'` |
| `granularity` | `str` | Downsampling granularity of market order books and quotes. Supported values are raw, 1m, 1h, and 1d. |
| `page_size` | `int` | number of items returned per page when calling the API. If the request times out, try using a smaller number. |
| `paging_from` | `PagingFrom, str` | Defines where you want to start receiving items from, 'start' or 'end' of the timeseries. |
| `start_time` | `datetime, date, str` | Start time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120 |
| `end_time` | `datetime, date, str` | End time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120 |
| `start_inclusive` | `bool` | Flag to define if start timestamp must be included in the timeseries if present. True by default. |
| `end_inclusive` | `bool` | Flag to define if end timestamp must be included in the timeseries if present. True by default. |
| `depth_limit` | `str` | book depth limit, 100 levels max or full book that is not limited and provided as is from the exchange. Full book snapshots are collected once per hour |
| `timezone` | `str` | timezone of the start/end times in db format for example: "America/Chicago". Default value is "UTC". For more details check out API documentation page. |
| `limit_per_market` | `int` | How many entries _per market_ the result should contain. |
| `format` | `str` | Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'. |

**Returns**

`DataCollection` &mdash; Market Order Books timeseries.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L6760)

### `get_market_quotes`

```python
def CoinMetricsClient.get_market_quotes(self, markets: Union[List[str], str], granularity: Optional[str]=None, page_size: Optional[int]=None, paging_from: Optional[Union[PagingFrom, str]]='start', start_time: Optional[Union[datetime, date, str]]=None, end_time: Optional[Union[datetime, date, str]]=None, start_inclusive: Optional[bool]=None, end_inclusive: Optional[bool]=None, timezone: Optional[str]=None, limit_per_market: Optional[int]=None, include_one_sided: Optional[bool]=None, format: Optional[str]='json_stream') -> DataCollection:
```


Returns market quotes for specified markets and date range.
For more information on quotes, see: https://docs.coinmetrics.io/info/markets/quotes

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `markets` | `list(str), str` | list of market ids. Market ids use the following naming convention: `exchangeName-baseAsset-quoteAsset-spot` for spot markets, `exchangeName-futuresSymbol-future` for futures markets, and `exchangeName-optionsSymbol-option` for options markets. e.g., `'coinbase-btc-usd-spot'`, `'bitmex-XBTUSD-future'` |
| `granularity` |  | Downsampling granularity of market order books and quotes. Supported values are raw, 1m, 1h, and 1d. |
| `page_size` | `int` | number of items returned per page when calling the API. If the request times out, try using a smaller number. |
| `paging_from` | `PagingFrom, str` | Defines where you want to start receiving items from, 'start' or 'end' of the timeseries. |
| `start_time` | `datetime, date, str` | Start time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120 |
| `end_time` | `datetime, date, str` | End time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120 |
| `start_inclusive` | `bool` | Flag to define if start timestamp must be included in the timeseries if present. True by default. |
| `end_inclusive` | `bool` | Flag to define if end timestamp must be included in the timeseries if present. True by default. |
| `timezone` | `str` | timezone of the start/end times in db format for example: "America/Chicago". Default value is "UTC". For more details check out API documentation page. |
| `limit_per_market` | `int` | How many entries _per market_ the result should contain. |
| `include_one_sided` | `bool` | Default: false Include one-side and empty books in quotes response. |
| `format` | `str` | Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'. |

**Returns**

`DataCollection` &mdash; Market Quotes timeseries.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L6828)

### `get_market_contract_prices`

```python
def CoinMetricsClient.get_market_contract_prices(self, markets: Union[List[str], str], page_size: Optional[int]=None, paging_from: Optional[Union[PagingFrom, str]]='start', start_time: Optional[Union[datetime, date, str]]=None, end_time: Optional[Union[datetime, date, str]]=None, start_inclusive: Optional[bool]=None, end_inclusive: Optional[bool]=None, granularity: Optional[str]=None, timezone: Optional[str]=None, limit_per_market: Optional[int]=None, frequency: Optional[str]=None, format: Optional[str]='json_stream') -> DataCollection:
```


Returns contract prices for specified markets. This includes index price and mark price that are used by the exchange for settlement and risk management purposes.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `markets` | `list(str), str` | list of market ids. Market ids use the following naming convention: `exchangeName-baseAsset-quoteAsset-spot` for spot markets, `exchangeName-futuresSymbol-future` for futures markets, and `exchangeName-optionsSymbol-option` for options markets. e.g., `'coinbase-btc-usd-spot'`, `'bitmex-XBTUSD-future', 'deribit-ETH-25MAR22-1200-P-option'` |
| `page_size` | `int` | number of items returned per page when calling the API. If the request times out, try using a smaller number. |
| `paging_from` | `PagingFrom, str` | Defines where you want to start receiving items from, 'start' or 'end' of the timeseries. |
| `start_time` | `datetime, date, str` | Start time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120 |
| `end_time` | `datetime, date, str` | End time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120 |
| `start_inclusive` | `bool` | Flag to define if start timestamp must be included in the timeseries if present. True by default. |
| `end_inclusive` | `bool` | Flag to define if end timestamp must be included in the timeseries if present. True by default. |
| `granularity` | `str` | Downsampling granularity of market contract prices. Supported values are raw, 1m, 1h, and 1d. |
| `timezone` | `str` | timezone of the start/end times in db format for example: "America/Chicago". Default value is "UTC". For more details check out API documentation page. |
| `limit_per_market` | `int` | How many entries _per market_ the result should contain. |
| `format` | `str` | Format of the response. Supported values are `json`, `json_stream`, `csv`. Default is `json`. |

**Returns**

`DataCollection` &mdash; Market Contract Prices timeseries.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L6891)

### `get_market_implied_volatility`

```python
def CoinMetricsClient.get_market_implied_volatility(self, markets: Union[List[str], str], page_size: Optional[int]=None, paging_from: Optional[Union[PagingFrom, str]]='start', start_time: Optional[Union[datetime, date, str]]=None, end_time: Optional[Union[datetime, date, str]]=None, start_inclusive: Optional[bool]=None, end_inclusive: Optional[bool]=None, granularity: Optional[str]=None, timezone: Optional[str]=None, limit_per_market: Optional[int]=None, format: Optional[str]='json_stream') -> DataCollection:
```


Returns implied volatility for specified markets.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `markets` | `list(str), str` | list of market ids. Market ids use the following naming convention: `exchangeName-baseAsset-quoteAsset-spot` for spot markets, `exchangeName-futuresSymbol-future` for futures markets, and `exchangeName-optionsSymbol-option` for options markets. e.g., `'coinbase-btc-usd-spot'`, `'bitmex-XBTUSD-future', 'deribit-ETH-25MAR22-1200-P-option'` |
| `page_size` | `int` | number of items returned per page when calling the API. If the request times out, try using a smaller number. |
| `paging_from` | `PagingFrom, str` | Defines where you want to start receiving items from, 'start' or 'end' of the timeseries. |
| `start_time` | `datetime, date, str` | Start time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120 |
| `end_time` | `datetime, date, str` | End time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120 |
| `start_inclusive` | `bool` | Flag to define if start timestamp must be included in the timeseries if present. True by default. |
| `end_inclusive` | `bool` | Flag to define if end timestamp must be included in the timeseries if present. True by default. |
| `granularity` | `str - one of raw, 1m, 1h, and 1d` | Downsampling granularity of market implied volatility. Supported values are raw, 1m, 1h, and 1d. |
| `timezone` | `str` | timezone of the start/end times in db format for example: "America/Chicago". Default value is "UTC". For more details check out API documentation page. |
| `limit_per_market` | `int` | How many entries _per market_ the result should contain. |
| `format` | `str` | Format of the response. Supported values are `json`, `json_stream`, `csv`. Default is `json`. |

**Returns**

`DataCollection` &mdash; Market Volatility timeseries.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L6953)

### `get_market_greeks`

```python
def CoinMetricsClient.get_market_greeks(self, markets: Union[List[str], str], page_size: Optional[int]=None, paging_from: Optional[Union[PagingFrom, str]]='start', start_time: Optional[Union[datetime, date, str]]=None, end_time: Optional[Union[datetime, date, str]]=None, start_inclusive: Optional[bool]=None, end_inclusive: Optional[bool]=None, granularity: Optional[str]=None, timezone: Optional[str]=None, limit_per_market: Optional[int]=None, format: Optional[str]='json_stream') -> DataCollection:
```


Returns greeks for option markets.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `markets` | `list(str), str` | list of market ids. Market ids use the following naming convention: `exchangeName-baseAsset-quoteAsset-spot` for spot markets, `exchangeName-futuresSymbol-future` for futures markets, and `exchangeName-optionsSymbol-option` for options markets. e.g., `'coinbase-btc-usd-spot'`, `'bitmex-XBTUSD-future', 'deribit-ETH-25MAR22-1200-P-option'` |
| `page_size` | `int` | number of items returned per page when calling the API. If the request times out, try using a smaller number. |
| `paging_from` | `PagingFrom, str` | Defines where you want to start receiving items from, 'start' or 'end' of the timeseries. |
| `start_time` | `datetime, date, str` | Start time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120 |
| `end_time` | `datetime, date, str` | End time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120 |
| `start_inclusive` | `bool` | Flag to define if start timestamp must be included in the timeseries if present. True by default. |
| `end_inclusive` | `bool` | Flag to define if end timestamp must be included in the timeseries if present. True by default. |
| `granularity` | `str - one of raw, 1m, 1h, and 1d` | Downsampling granularity of market greeks. Supported values are raw, 1m, 1h, and 1d |
| `timezone` | `str` | timezone of the start/end times in db format for example: "America/Chicago". Default value is "UTC". For more details check out API documentation page. |
| `limit_per_market` | `int` | How many entries _per market_ the result should contain. |
| `format` | `str` | Format of the response. Supported values are `json`, `json_stream`, `csv`. Default is `json`. |

**Returns**

`DataCollection` &mdash; Market Greeks timeseries.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L7013)

### `get_mining_pool_tips_summary`

```python
def CoinMetricsClient.get_mining_pool_tips_summary(self, assets: Union[List[str], str], page_size: Optional[int]=None, paging_from: Optional[Union[PagingFrom, str]]='start', start_time: Optional[Union[datetime, date, str]]=None, end_time: Optional[Union[datetime, date, str]]=None, start_inclusive: Optional[bool]=None, end_inclusive: Optional[bool]=None, timezone: Optional[str]=None, format: Optional[str]=None) -> DataCollection:
```


Returns mining pool tips summaries for specified assets.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `assets` | `list(str), str` | list of asset names, e.g. 'btc' |
| `page_size` | `int` | number of items returned per page when calling the API. If the request times out, try using a smaller number. |
| `paging_from` | `PagingFrom, str` | Defines where you want to start receiving items from, 'start' or 'end' of the timeseries. |
| `start_time` | `datetime, date, str` | Start time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120 |
| `end_time` | `datetime, date, str` | End time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120 |
| `start_inclusive` | `bool` | Flag to define if start timestamp must be included in the timeseries if present. True by default. |
| `end_inclusive` | `bool` | Flag to define if end timestamp must be included in the timeseries if present. True by default. |
| `timezone` | `str` | timezone of the start/end times in db format for example: "America/Chicago". Default value is "UTC". For more details check out API documentation page. |
| `format` | `str` | Format of the response. Supported values are `json`, `csv`. Default is `json`. |

**Returns**

`DataCollection` &mdash; Mining Pool Tips timeseries.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L7071)

### `get_mempool_feerates`

```python
def CoinMetricsClient.get_mempool_feerates(self, assets: Union[List[str], str], page_size: Optional[int]=200, paging_from: Optional[Union[PagingFrom, str]]='start', start_time: Optional[Union[datetime, date, str]]=None, end_time: Optional[Union[datetime, date, str]]=None, start_inclusive: Optional[bool]=None, end_inclusive: Optional[bool]=None, timezone: Optional[str]=None, format: Optional[str]=None) -> DataCollection:
```


Returns mempool feerates for the specified assets. Note: for this method, page_size must be <= 200.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `assets` | `list(str), str` | list of asset names, e.g. 'btc' |
| `page_size` | `int` | number of items returned per page when calling the API. If the request times out, try using a smaller number. |
| `paging_from` | `PagingFrom, str` | Defines where you want to start receiving items from, 'start' or 'end' of the timeseries. |
| `start_time` | `datetime, date, str` | Start time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120 |
| `end_time` | `datetime, date, str` | End time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120 |
| `start_inclusive` | `bool` | Flag to define if start timestamp must be included in the timeseries if present. True by default. |
| `end_inclusive` | `bool` | Flag to define if end timestamp must be included in the timeseries if present. True by default. |
| `timezone` | `str` | timezone of the start/end times in db format for example: "America/Chicago". Default value is "UTC". For more details check out API documentation page. |
| `format` | `str` | Format of the response. Supported values are `json`, `csv`. Default is `json`. |

**Returns**

`DataCollection` &mdash; Mempool Fee Rates timeseries.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L7123)

### `get_stream_asset_metrics`

```python
def CoinMetricsClient.get_stream_asset_metrics(self, assets: Union[List[str], str], metrics: Union[List[str], str], frequency: Optional[str]=None, backfill: Union[Backfill, str]=Backfill.LATEST, ignore_forbidden_errors: Optional[bool]=None, ignore_unsupported_errors: Optional[bool]=None) -> CmStream:
```


Returns timeseries stream of metrics for specified assets.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `assets` | `list(str), str` | list of asset names, e.g. 'btc' |
| `metrics` | `list(str), str` | list of _asset-specific_ metric names, e.g. 'PriceUSD' |
| `frequency` | `str` | frequency of the returned timeseries, e.g 15s, 1d, etc. |
| `backfill` | `str` | What data should be sent upon a connection ("latest" or "none"). By default the latest values are sent just before real-time data. |
| `ignore_forbidden_errors` | `bool` | Default: false. Ignore HTTP 403 Forbidden errors |
| `ignore_unsupported_errors` | `bool` | Default: false. Ignore errors for unsupported assets, metrics or frequencies. |

**Returns**

`CmStream` &mdash; Asset Metrics timeseries stream.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L7173)

### `get_stream_market_trades`

```python
def CoinMetricsClient.get_stream_market_trades(self, markets: Union[List[str], str], backfill: Union[Backfill, str]=Backfill.LATEST) -> CmStream:
```


Returns timeseries stream of market trades.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `markets` | `list(str), str` | list of markets or market patterns like exchange-* or exchange-*-spot or *USDT-future. |
| `backfill` | `str` | What data should be sent upon a connection ("latest" or "none"). By default the latest values are sent just before real-time data. |

**Returns**

`CmStream` &mdash; Market Trades timeseries stream.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L7211)

### `get_stream_market_orderbooks`

```python
def CoinMetricsClient.get_stream_market_orderbooks(self, markets: Union[List[str], str], backfill: Union[Backfill, str]=Backfill.LATEST, depth_limit: Optional[str]=None) -> CmStream:
```


Returns timeseries stream of market orderbooks.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `markets` | `list(str), str` | list of markets or market patterns like exchange-* or exchange-*-spot or *USDT-future. |
| `backfill` | `str` | What data should be sent upon a connection ("latest" or "none"). By default the latest values are sent just before real-time data. |
| `depth_limit` | `str` | Default: 100. Supported Values: 100 "full_book". Book depth limit. |

**Returns**

`CmStream` &mdash; Market Orderbooks timeseries stream.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L7230)

### `get_stream_market_quotes`

```python
def CoinMetricsClient.get_stream_market_quotes(self, markets: Union[List[str], str], backfill: Union[Backfill, str]=Backfill.LATEST, include_one_sided: Optional[bool]=None) -> CmStream:
```


Returns timeseries stream of market quotes.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `markets` | `list(str), str` | list of markets or market patterns like exchange-* or exchange-*-spot or *USDT-future. |
| `backfill` | `str` | What data should be sent upon a connection ("latest" or "none"). By default the latest values are sent just before real-time data. |
| `include_one_sided` | `bool` | Default: false. Include one-side and empty books in quotes response. |

**Returns**

`CmStream` &mdash; Market Quotes timeseries stream.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L7256)

### `get_stream_pair_quotes`

```python
def CoinMetricsClient.get_stream_pair_quotes(self, pairs: Union[str, List[str]], aggregation_method: Optional[str]=None, backfill: Optional[str]=None) -> CmStream:
```


**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `pairs` | `Optional[Union[str, List[str]]]` | Comma separated list of asset pairs. Use the /catalog-all/pairs endpoint for the full list of supported asset pairs. |
| `aggregation_method` | `str` | The method to use for aggregation. |
| `backfill` | `str` | What data should be sent upon a connection. By default the latest values are sent just before real-time data. |

**Returns**

`CmStream` &mdash;

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L7282)

### `get_stream_asset_quotes`

```python
def CoinMetricsClient.get_stream_asset_quotes(self, assets: Union[str, List[str]], aggregation_method: Optional[str]=None, backfill: Optional[str]=None) -> CmStream:
```


**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `assets` | `Union[str, List[str]]` | Comma separated list of assets. Use the /catalog-all/assets endpoint for the full list of supported assets. |
| `aggregation_method` | `str` | The method to use for aggregation. |
| `backfill` | `str` | What data should be sent upon a connection. By default the latest values are sent just before real-time data. |

**Returns**

`CmStream` &mdash;

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L7305)

### `get_stream_market_candles`

```python
def CoinMetricsClient.get_stream_market_candles(self, markets: Union[List[str], str], frequency: Optional[str]=None, backfill: Union[Backfill, str]=Backfill.LATEST) -> CmStream:
```


Returns timeseries stream of market candles.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `markets` | `list(str), str` | list of markets or market patterns like exchange-* or exchange-*-spot or *USDT-future. |
| `frequency` | `str` | Candle duration. Supported values are 1m, 5m, 10m, 15m, 30m, 1h, 4h, 1d. |
| `backfill` | `str` | What data should be sent upon a connection ("latest" or "none"). By default the latest values are sent just before real-time data. |

**Returns**

`CmStream` &mdash; Market Candles timeseries stream.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L7328)

### `get_stream_index_levels`

```python
def CoinMetricsClient.get_stream_index_levels(self, indexes: Union[List[str], str], include_verification: Optional[bool]=None, backfill: Union[Backfill, str]=Backfill.LATEST) -> CmStream:
```


Returns timeseries stream of index levels.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `indexes` | `list(str), str` | list of indxes or market patterns such as CMBIBTC |
| `backfill` | `str` | What data should be sent upon a connection ("latest" or "none"). By default the latest values are sent just before real-time data. |
| `include_verification` |  | Default: False If set to true, includes information about verification. |

**Returns**

`CmStream` &mdash; Index levels data timeseries stream.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L7354)

### `get_stream_market_liquidations`

```python
def CoinMetricsClient.get_stream_market_liquidations(self, markets: Union[str, List[str]], backfill: Optional[str]=None) -> CmStream:
```


Returns timeseries stream for market liquidations

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `markets` | `Union[str, List[str]]` | Comma separated list of markets or market patterns like `exchange-*` or `exchange-*-spot` or `*USDT-future`. Use the /catalog-all/markets endpoint for the full list of supported markets. |
| `backfill` | `Optional[str]` | What data should be sent upon a connection. By default the latest values are sent just before real-time data. |

**Returns**

`CmStream` &mdash; Market liquidations timeseries stream

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L7379)

### `get_stream_market_open_interest`

```python
def CoinMetricsClient.get_stream_market_open_interest(self, markets: Union[str, List[str]], backfill: Optional[str]=None) -> CmStream:
```


**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `markets` | `Union[str, List[str]]` | Comma separated list of markets or market patterns like `exchange-*` or `exchange-*-spot` or `*USDT-future`. Use the /catalog-all/markets endpoint for the full list of supported markets. |
| `backfill` | `Optional[str]` | What data should be sent upon a connection. By default the latest values are sent just before real-time data. |

**Returns**

`CmStream` &mdash;

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L7400)

### `get_stream_market_contract_prices`

```python
def CoinMetricsClient.get_stream_market_contract_prices(self, markets: Union[str, List[str]], backfill: Optional[str]=None) -> CmStream:
```


Returns timeseries stream of market contract prices.

This includes index price and mark price that are used by the exchange
for settlement and risk management purposes.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `markets` | `Union[str, List[str]]` | Comma separated list of markets or market patterns like `exchange-*` or `exchange-*-spot` or `*USDT-future`. Use the /catalog-all-v2/markets endpoint for the full list of supported markets. |
| `backfill` | `Optional[str]` | What data should be sent upon a connection. By default the latest values are sent just before real-time data. |

**Returns**

`CmStream` &mdash; Market Contract Prices timeseries stream.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L7419)

### `get_list_of_blocks_v2`

```python
def CoinMetricsClient.get_list_of_blocks_v2(self, asset: str, block_hashes: Optional[Union[List[str], str]]=None, heights: Optional[Union[List[str], str]]=None, page_size: Optional[int]=None, paging_from: Optional[Union[PagingFrom, str]]='start', start_time: Optional[Union[datetime, date, str]]=None, end_time: Optional[Union[datetime, date, str]]=None, start_height: Optional[int]=None, end_height: Optional[int]=None, chain: Optional[str]=None, start_inclusive: Optional[bool]=None, end_inclusive: Optional[bool]=None, timezone: Optional[str]=None, ignore_unsupported_errors: Optional[bool]=False) -> DataCollection:
```


Returns a list of blockchain blocks metadata.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `asset` | `str` | Asset name |
| `block_hashes` | `str, list(str)` | Optional comma separated list of block hashes to filter a response. |
| `heights` | `str, list(str)` | Optional comma separated list of block heights to filter a response. |
| `page_size` | `int` | number of items returned per page when calling the API. If the request times out, try using a smaller number. |
| `paging_from` | `PagingFrom, str` | Defines where you want to start receiving items from, 'start' or 'end' of the timeseries. |
| `start_time` | `datetime, date, str` | Start time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120 |
| `end_time` | `datetime, date, str` | End time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120 |
| `start_height` | `int` | The start height indicates the beginning block height for the set of data that are returned. Mutually exclusive with start_time |
| `end_height` | `int` | The end height indicates the beginning block height for the set of data that are returned. Mutually exclusive with end_time |
| `chain` | `str` | Default: "main" Chain type. Supported values are main and all (includes both main and stale). |
| `start_inclusive` | `bool` | Flag to define if start timestamp must be included in the timeseries if present. True by default. |
| `end_inclusive` | `bool` | Flag to define if end timestamp must be included in the timeseries if present. True by default. |
| `timezone` | `str` | timezone of the start/end times in db format for example: "America/Chicago". Default value is "UTC". For more details check out API documentation page. |
| `ignore_unsupported_errors` | `bool` | Default: false. Ignore "unsupported" errors for not currently supported by Coin Metrics items. |

**Returns**

`DataCollection` &mdash; list of blockchain blocks metadata

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L7443)

### `get_list_of_accounts_v2`

```python
def CoinMetricsClient.get_list_of_accounts_v2(self, asset: str, accounts: Optional[Union[List[str], str]]=None, page_size: Optional[int]=None, paging_from: Optional[Union[PagingFrom, str]]='start', start_time: Optional[Union[datetime, date, str]]=None, end_time: Optional[Union[datetime, date, str]]=None, start_height: Optional[int]=None, end_height: Optional[int]=None, start_chain_sequence_number: Optional[int]=None, end_chain_sequence_number: Optional[int]=None, start_inclusive: Optional[bool]=None, end_inclusive: Optional[bool]=None, timezone: Optional[str]=None, ignore_unsupported_errors: Optional[bool]=False) -> DataCollection:
```


Returns a list of blockchain accounts with their balances.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `asset` | `str` | Asset name |
| `accounts` | `str, list(str)` | Optional comma separated list of accounts to filter a response. |
| `page_size` | `int` | number of items returned per page when calling the API. If the request times out, try using a smaller number. |
| `paging_from` | `PagingFrom, str` | Defines where you want to start receiving items from, 'start' or 'end' of the timeseries. |
| `start_time` | `datetime, date, str` | Start time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120 |
| `end_time` | `datetime, date, str` | End time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120 |
| `start_height` | `int` | The start height indicates the beginning block height for the set of data that are returned. Mutually exclusive with start_time |
| `end_height` | `int` | The end height indicates the beginning block height for the set of data that are returned. Mutually exclusive with end_time |
| `start_chain_sequence_number` | `int` | The start height indicates the beginning block height for the set of data that are returned. Mutually exclusive with start_time |
| `end_chain_sequence_number` | `int` | The end height indicates the beginning block height for the set of data that are returned. Mutually exclusive with end_time |
| `start_inclusive` | `bool` | Flag to define if start timestamp must be included in the timeseries if present. True by default. |
| `end_inclusive` | `bool` | Flag to define if end timestamp must be included in the timeseries if present. True by default. |
| `timezone` | `str` | timezone of the start/end times in db format for example: "America/Chicago". Default value is "UTC". For more details check out API documentation page. |
| `ignore_unsupported_errors` | `bool` | Default: false. Ignore "unsupported" errors for not currently supported by Coin Metrics items. |

**Returns**

`DataCollection` &mdash; list of blockchain accounts metadata

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L7512)

### `get_list_of_sub_accounts_v2`

```python
def CoinMetricsClient.get_list_of_sub_accounts_v2(self, asset: str, accounts: Optional[Union[List[str], str]]=None, page_size: Optional[int]=None, paging_from: Optional[Union[PagingFrom, str]]='start', start_time: Optional[Union[datetime, date, str]]=None, end_time: Optional[Union[datetime, date, str]]=None, start_height: Optional[int]=None, end_height: Optional[int]=None, start_chain_sequence_number: Optional[int]=None, end_chain_sequence_number: Optional[int]=None, start_inclusive: Optional[bool]=None, end_inclusive: Optional[bool]=None, timezone: Optional[str]=None, ignore_unsupported_errors: Optional[bool]=False) -> DataCollection:
```


Returns a list of blockchain sub-accounts with their balances.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `asset` | `str` | Asset name |
| `accounts` | `str, list(str)` | Optional comma separated list of accounts to filter a response. |
| `page_size` | `int` | number of items returned per page when calling the API. If the request times out, try using a smaller number. |
| `paging_from` | `PagingFrom, str` | Defines where you want to start receiving items from, 'start' or 'end' of the timeseries. |
| `start_time` | `datetime, date, str` | Start time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120 |
| `end_time` | `datetime, date, str` | End time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120 |
| `start_height` | `int` | The start height indicates the beginning block height for the set of data that are returned. Mutually exclusive with start_time |
| `end_height` | `int` | The end height indicates the beginning block height for the set of data that are returned. Mutually exclusive with end_time |
| `start_chain_sequence_number` | `int` | The start height indicates the beginning block height for the set of data that are returned. Mutually exclusive with start_time |
| `end_chain_sequence_number` | `int` | The end height indicates the beginning block height for the set of data that are returned. Mutually exclusive with end_time |
| `start_inclusive` | `bool` | Flag to define if start timestamp must be included in the timeseries if present. True by default. |
| `end_inclusive` | `bool` | Flag to define if end timestamp must be included in the timeseries if present. True by default. |
| `timezone` | `str` | timezone of the start/end times in db format for example: "America/Chicago". Default value is "UTC". For more details check out API documentation page. |
| `ignore_unsupported_errors` | `bool` | Default: false. Ignore "unsupported" errors for not currently supported by Coin Metrics items. |

**Returns**

`DataCollection` &mdash; list of blockchain accounts metadata

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L7581)

### `get_list_of_transactions_v2`

```python
def CoinMetricsClient.get_list_of_transactions_v2(self, asset: str, txids: Optional[Union[List[str], str]]=None, block_hashes: Optional[Union[List[str], str]]=None, page_size: Optional[int]=None, paging_from: Optional[Union[PagingFrom, str]]='start', start_time: Optional[Union[datetime, date, str]]=None, end_time: Optional[Union[datetime, date, str]]=None, start_height: Optional[int]=None, end_height: Optional[int]=None, chain: Optional[str]=None, start_inclusive: Optional[bool]=None, end_inclusive: Optional[bool]=None, timezone: Optional[str]=None, ignore_unsupported_errors: Optional[bool]=False) -> DataCollection:
```


Returns a list of blockchain transactions metadata.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `asset` | `str` | Asset name |
| `txids` | `str, list(str)` | Optional comma separated list of transaction identifiers (txid) to filter a response. |
| `block_hashes` | `str, list(str)` | Optional comma separated list of block hashes to filter a response. |
| `page_size` | `int` | number of items returned per page when calling the API. If the request times out, try using a smaller number. |
| `paging_from` | `PagingFrom, str` | Defines where you want to start receiving items from, 'start' or 'end' of the timeseries. |
| `start_time` | `datetime, date, str` | Start time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120 |
| `end_time` | `datetime, date, str` | End time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120 |
| `start_height` | `int` | The start height indicates the beginning block height for the set of data that are returned. Mutually exclusive with start_time |
| `end_height` | `int` | The end height indicates the beginning block height for the set of data that are returned. Mutually exclusive with end_time |
| `chain` | `str` | Default: "main". Chain type. Supported values are main and all (includes both main and stale). |
| `start_inclusive` | `bool` | Flag to define if start timestamp must be included in the timeseries if present. True by default. |
| `end_inclusive` | `bool` | Flag to define if end timestamp must be included in the timeseries if present. True by default. |
| `timezone` | `str` | timezone of the start/end times in db format for example: "America/Chicago". Default value is "UTC". For more details check out API documentation page. |
| `ignore_unsupported_errors` | `bool` | Default: false. Ignore "unsupported" errors for not currently supported by Coin Metrics items. |

**Returns**

`DataCollection` &mdash; list of transaction metadata

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L7652)

### `get_list_of_balance_updates_v2`

```python
def CoinMetricsClient.get_list_of_balance_updates_v2(self, asset: str, accounts: Optional[Union[List[str], str]]=None, sub_accounts: Optional[Union[List[str], str]]=None, limit_per_account: Optional[int]=None, txids: Optional[Union[List[str], str]]=None, block_hashes: Optional[Union[List[str], str]]=None, page_size: Optional[int]=None, paging_from: Optional[Union[PagingFrom, str]]='start', start_time: Optional[Union[datetime, date, str]]=None, end_time: Optional[Union[datetime, date, str]]=None, start_height: Optional[int]=None, end_height: Optional[int]=None, start_chain_sequence_number: Optional[int]=None, end_chain_sequence_number: Optional[int]=None, include_sub_accounts: Optional[bool]=None, chain: Optional[str]=None, start_inclusive: Optional[bool]=None, end_inclusive: Optional[bool]=None, timezone: Optional[str]=None, ignore_unsupported_errors: Optional[bool]=False) -> DataCollection:
```


Returns a list of blockchain accounts balance updates.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `asset` | `str` | Asset name |
| `accounts` | `str, list(str)` | Optional comma separated list of accounts to filter a response. |
| `sub_accounts` | `str, list(str)` | Optional comma separated list of sub-accounts to filter a response. This parameter is disabled for Community users. |
| `limit_per_account` | `int` | How many entries per account the result should contain. It is applicable when multiple accounts are requested. |
| `txids` | `str, list(str)` | Optional comma separated list of transaction ids to filter a response. |
| `block_hashes` | `str, list(str)` | Optional comma separated list of block hashes to filter a response. |
| `page_size` | `int` | number of items returned per page when calling the API. If the request times out, try using a smaller number. |
| `paging_from` | `PagingFrom, str` | Defines where you want to start receiving items from, 'start' or 'end' of the timeseries. |
| `start_time` | `datetime, date, str` | Start time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120 |
| `end_time` | `datetime, date, str` | End time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120 |
| `start_height` | `int` | The start height indicates the beginning block height for the set of data that are returned. Mutually exclusive with start_time |
| `end_height` | `int` | The end height indicates the beginning block height for the set of data that are returned. Mutually exclusive with end_time |
| `start_chain_sequence_number` | `int` | The start height indicates the beginning block height for the set of data that are returned. Mutually exclusive with start_time |
| `end_chain_sequence_number` | `int` | The end height indicates the beginning block height for the set of data that are returned. Mutually exclusive with end_time |
| `include_sub_accounts` | `bool` | bool indicating if the response should contain sub-accounts. |
| `chain` |  | Chain type. Supported values are main and all (includes both main and stale). |
| `start_inclusive` | `bool` | Flag to define if start timestamp must be included in the timeseries if present. True by default. |
| `end_inclusive` | `bool` | Flag to define if end timestamp must be included in the timeseries if present. True by default. |
| `timezone` | `str` | timezone of the start/end times in db format for example: "America/Chicago". Default value is "UTC". For more details check out API documentation page. |
| `ignore_unsupported_errors` | `bool` | Default: false. Ignore "unsupported" errors for not currently supported by Coin Metrics items. |

**Returns**

`DataCollection` &mdash; list of balance updates

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L7723)

### `get_list_of_rebasing_changes_v2`

```python
def CoinMetricsClient.get_list_of_rebasing_changes_v2(self, asset: str, txids: Optional[Union[List[str], str]]=None, block_hashes: Optional[Union[List[str], str]]=None, page_size: Optional[int]=None, paging_from: Optional[Union[PagingFrom, str]]='start', start_time: Optional[Union[datetime, date, str]]=None, end_time: Optional[Union[datetime, date, str]]=None, start_height: Optional[int]=None, end_height: Optional[int]=None, start_chain_sequence_number: Optional[int]=None, end_chain_sequence_number: Optional[int]=None, chain: Optional[str]=None, start_inclusive: Optional[bool]=None, end_inclusive: Optional[bool]=None, timezone: Optional[str]=None, ignore_unsupported_errors: Optional[bool]=False) -> DataCollection:
```


Returns a list of blockchain rebasing changes.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `asset` | `str` | Asset name |
| `txids` | `str, list(str)` | Optional comma separated list of transaction identifiers (txid) to filter a response. |
| `block_hashes` | `str, list(str)` | Optional comma separated list of block hashes to filter a response. |
| `page_size` | `int` | number of items returned per page when calling the API. If the request times out, try using a smaller number. |
| `paging_from` | `PagingFrom, str` | Defines where you want to start receiving items from, 'start' or 'end' of the timeseries. |
| `start_time` | `datetime, date, str` | Start time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120 |
| `end_time` | `datetime, date, str` | End time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120 |
| `start_height` | `int` | The start height indicates the beginning block height for the set of data that are returned. Mutually exclusive with start_time |
| `end_height` | `int` | The end height indicates the beginning block height for the set of data that are returned. Mutually exclusive with end_time |
| `start_chain_sequence_number` | `int` | The start chain sequence number for the set of data that are returned. Mutually exclusive with start_time |
| `end_chain_sequence_number` | `int` | The end chain sequence number for the set of data that are returned. Mutually exclusive with end_time |
| `chain` | `str` | Default: "main". Chain type. Supported values are main and all (includes both main and stale). |
| `start_inclusive` | `bool` | Flag to define if start timestamp must be included in the timeseries if present. True by default. |
| `end_inclusive` | `bool` | Flag to define if end timestamp must be included in the timeseries if present. True by default. |
| `timezone` | `str` | timezone of the start/end times in db format for example: "America/Chicago". Default value is "UTC". For more details check out API documentation page. |
| `ignore_unsupported_errors` | `bool` | Default: false. Ignore "unsupported" errors for not currently supported by Coin Metrics items. |

**Returns**

`DataCollection` &mdash; list of rebasing changes

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L7820)

### `get_full_block_v2`

```python
def CoinMetricsClient.get_full_block_v2(self, asset: str, block_hash: str, include_sub_accounts: Optional[bool], ignore_unsupported_errors: Optional[bool]=False) -> DataCollection:
```


Returns a full blockchain block with all transactions and balance updates.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `asset` | `str` | Asset name |
| `block_hash` | `str` | block hash |
| `include_sub_accounts` | `bool` | Boolean indicating if the response should contain sub-accounts |
| `ignore_unsupported_errors` | `bool` | Default: false. Ignore "unsupported" errors for not currently supported by Coin Metrics items. |

**Returns**

`list(dict(str), any)` &mdash; blockchain block data

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L7901)

### `get_full_transaction_v2`

```python
def CoinMetricsClient.get_full_transaction_v2(self, asset: str, txid: str, include_sub_accounts: Optional[bool], ignore_unsupported_errors: Optional[bool]=False) -> DataCollection:
```


Returns a full blockchain transaction with all balance updates.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `asset` | `str` | Asset name |
| `txid` | `str` | transaction identifier |
| `include_sub_accounts` | `bool` | Boolean indicating if the response should contain sub-accounts |
| `ignore_unsupported_errors` | `bool` | Default: false. Ignore "unsupported" errors for not currently supported by Coin Metrics items. |

**Returns**

`list(dict(str), any)` &mdash; block transaction data

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L7931)

### `get_full_transaction_for_block_v2`

```python
def CoinMetricsClient.get_full_transaction_for_block_v2(self, asset: str, block_hash: str, txid: str, include_sub_accounts: Optional[bool], ignore_unsupported_errors: Optional[bool]=False) -> DataCollection:
```


Returns a full blockchain transaction with all balance updates for a specific block.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `asset` | `str` | Asset name |
| `block_hash` | `str` | block hash |
| `txid` | `str` | transaction identifier |
| `include_sub_accounts` | `bool` | Boolean indicating if the response should contain sub-accounts |
| `ignore_unsupported_errors` | `bool` | Default: false. Ignore "unsupported" errors for not currently supported by Coin Metrics items. |

**Returns**

`list(dict(str, Any))` &mdash; block transaction data with balance updates

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L7962)

### `get_list_of_balance_updates_for_account_v2`

```python
def CoinMetricsClient.get_list_of_balance_updates_for_account_v2(self, asset: str, account: str, txids: Optional[Union[str, List[str]]]=None, block_hashes: Optional[Union[str, List[str]]]=None, include_counterparties: Optional[bool]=None, start_time: Optional[Union[datetime, date, str]]=None, end_time: Optional[Union[datetime, date, str]]=None, start_height: Optional[int]=None, end_height: Optional[int]=None, start_chain_sequence_number: Optional[int]=None, end_chain_sequence_number: Optional[int]=None, include_sub_accounts: Optional[bool]=None, chain: Optional[str]=None, start_inclusive: Optional[bool]=None, end_inclusive: Optional[bool]=None, timezone: Optional[str]=None, page_size: Optional[int]=None, paging_from: Optional[str]=None, next_page_token: Optional[str]=None, ignore_unsupported_errors: Optional[bool]=False) -> DataCollection:
```


**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `asset` | `Optional[str]` | Asset name. |
| `account` | `Optional[str]` | Account id. |
| `txids` | `Union[str, List[str]]` | Optional comma separated list of transaction identifiers (txid) to filter a response. The list must contain a single element for Community users. |
| `block_hashes` | `Union[str, List[str]]` | Optional comma separated list of block hashes to filter a response. The list must contain a single element for Community users. |
| `include_counterparties` | `bool` | Include information about the counterparties balance updates. |
| `start_time` | `str` | Start of the time interval. This field refers to the `time` field in the response. Multiple formats of ISO 8601 are supported: `2006-01-20T00:00:00Z`, `2006-01-20T00:00:00.000Z`, `2006-01-20T00:00:00.123456Z`, `2006-01-20T00:00:00.123456789, 2006-01-20, 20060120Z`, `2006-01-20`, `20060120`. Inclusive by default. Mutually exclusive with `start_height`. UTC timezone by default. `Z` suffix is optional and `timezone` parameter has a priority over it. If `start_time` is omitted, response will include time series from the **earliest** time available. This parameter is disabled for Community users. |
| `end_time` | `str` | End of the time interval. This field refers to the `time` field in the response. Multiple formats of ISO 8601 are supported: `2006-01-20T00:00:00Z`, `2006-01-20T00:00:00.000Z`, `2006-01-20T00:00:00.123456Z`, `2006-01-20T00:00:00.123456789, 2006-01-20, 20060120Z`, `2006-01-20`, `20060120`. Inclusive by default. Mutually exclusive with `end_height`. UTC timezone by default. `Z` suffix is optional and `timezone` parameter has a priority over it. If `end_time` is omitted, response will include time series up to the **latest** time available. This parameter is disabled for Community users. |
| `start_height` | `int` | The start height indicates the beginning block height for the set of data that are returned. Inclusive by default. Mutually exclusive with `start_time`. This parameter is disabled for Community users. |
| `end_height` | `int` | The end height indicates the ending block height for the set of data that are returned. Inclusive by default. Mutually exclusive with `end_time`. This parameter is disabled for Community users. |
| `start_chain_sequence_number` | `int` | Start of the `chain_sequence_number` interval. This parameter is disabled for Community users. |
| `end_chain_sequence_number` | `int` | End of the `chain_sequence_number` interval. This parameter is disabled for Community users. |
| `include_sub_accounts` | `bool` | Boolean indicating if the response should contain sub-accounts. This parameter is disabled for Community users. |
| `chain` | `str` | Chain type. Supported values are `main` and `all` (includes both main and stale). This parameter is disabled for Community users. |
| `start_inclusive` | `bool` | Inclusive or exclusive corresponding `start_*` parameters. This parameter is disabled for Community users. |
| `end_inclusive` | `bool` | Inclusive or exclusive corresponding `end_*` parameters. This parameter is disabled for Community users. |
| `timezone` | `str` | Timezone name for `start_time` and `end_time` timestamps. This parameter does not modify the output times, which are always `UTC`. Format is defined by TZ database. |
| `page_size` | `int` | Number of items per single page of results. This parameter is disabled for Community users. |
| `paging_from` | `str` | Where does the first page start, at the start of the interval or at the end. |
| `next_page_token` | `str` | Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use `next_page_url` response field. |
| `ignore_unsupported_errors` | `bool` | Default: false. Ignore "unsupported" errors for not currently supported by Coin Metrics items. |

**Returns**

`DataCollection` &mdash; Blockchain balance updates for account.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L8000)

### `get_transaction_tracker`

```python
def CoinMetricsClient.get_transaction_tracker(self, asset: str, addresses: Optional[Union[List[str], str]]=None, txids: Optional[Union[List[str], str]]=None, replacements_for_txids: Optional[Union[List[str], str]]=None, replacements_only: Optional[bool]=None, page_size: Optional[int]=None, paging_from: Optional[Union[PagingFrom, str]]='start', start_time: Optional[Union[datetime, date, str]]=None, end_time: Optional[Union[datetime, date, str]]=None, start_inclusive: Optional[bool]=None, end_inclusive: Optional[bool]=None, timezone: Optional[str]=None, unconfirmed_only: Optional[bool]=None, format: Optional[str]=None) -> DataCollection:
```


Returns status updates for the specified or all transactions.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `asset` | `str` | Asset name |
| `txids` | `str, list(str)` | Optional comma separated list of transaction identifiers (txid) to track. |
| `replacements_for_txids` | `str, list(str)` | Optional comma separated list of transaction identifiers (txid) to get the corresponding replacement transactions for. Mutually exclusive with txids. |
| `replacements_only` | `bool` | Boolean indicating if the response should contain only the replacement transactions. |
| `page_size` | `int` | number of items returned per page when calling the API. If the request times out, try using a smaller number. |
| `paging_from` | `PagingFrom, str` | Defines where you want to start receiving items from, 'start' or 'end' of the timeseries. |
| `start_time` | `datetime, date, str` | Start time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120 |
| `end_time` | `datetime, date, str` | End time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120 |
| `start_inclusive` | `bool` | Flag to define if start timestamp must be included in the timeseries if present. True by default. |
| `end_inclusive` | `bool` | Flag to define if end timestamp must be included in the timeseries if present. True by default. |
| `timezone` | `str` | timezone of the start/end times in db format for example: "America/Chicago". Default value is "UTC". For more details check out API documentation page. |
| `format` | `str` | Format of the response. Supported values are `json`, `csv`. Default is `json`. |

**Returns**

`DataCollection` &mdash; status updates for the specified or all transactions.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L8096)

### `get_taxonomy_assets`

```python
def CoinMetricsClient.get_taxonomy_assets(self, assets: Optional[List[str]]=None, class_ids: Optional[List[str]]=None, sector_ids: Optional[List[str]]=None, subsector_ids: Optional[List[str]]=None, classification_start_time: Optional[str]=None, classification_end_time: Optional[str]=None, end_inclusive: Optional[bool]=None, start_inclusive: Optional[bool]=None, page_size: Optional[int]=None, paging_from: Optional[str]=None, version: Optional[str]=None) -> DataCollection:
```


Returns assets with information about their sector, industry, and industry group IDs. By default reutrns all
covered assets

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `assets` | `Optional[List[str]]` | Asset names |
| `class_ids` | `Optional[List[str]]` | List of class identifiers. |
| `sector_ids` | `Optional[List[str]]` | Lst of sector identifiers. |
| `subsector_ids` | `Optional[List[str]]` | List of subsector identifiers |
| `classification_start_time` | `Optional[str]` | Start time for the taxonomy assets. ISO-8601 format date. Inclusive by default |
| `classification_end_time` | `Optional[str]` | End time for the taxonomy assets. ISO-8601 format date. Inclusive by default |
| `start_inclusive` | `bool` | Flag to define if start timestamp must be included in the timeseries if present. True by default. |
| `end_inclusive` | `bool` | Flag to define if end timestamp must be included in the timeseries if present. True by default. |
| `page_size` | `Optional[int]` | Page size for # of assets to return, will default to 100 |
| `paging_from` | `Optional[str]` | Which direction to page from "start" or "end". "end" by default |
| `version` | `Optional[str]` | Version to query, default is "latest". |

**Returns**

`Datacollection` &mdash; Returns a data collection containing the taxonomy assets

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L8163)

### `get_taxonomy_assets_metadata`

```python
def CoinMetricsClient.get_taxonomy_assets_metadata(self, start_time: Optional[Union[datetime, date, str]]=None, end_time: Optional[Union[datetime, date, str]]=None, start_inclusive: Optional[bool]=None, end_inclusive: Optional[bool]=None, page_size: Optional[int]=None, paging_from: Optional[str]=None, version: Optional[str]=None) -> DataCollection:
```


Returns metadata about the assets, sectors, and industries included in the CM taxonomy

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `start_time` | `Optional[Union[datetime, date, str]]` | Start time for the taxonomy version file. ISO-8601 format date. Inclusive by default |
| `end_time` | `Optional[Union[datetime, date, str]]` | End time for the taxonomy version file. ISO-8601 format date. Exclusive by default |
| `start_inclusive` | `str` | Start time of taxonomy version. |
| `end_inclusive` | `str` | End time of taxonomy version. |
| `page_size` | `Optional[int]` | Page size for # of asset metadata to return, will default to 100 |
| `paging_from` | `Optional[str]` | Which direction to page from "start" or "end". "end" by default |
| `version` | `Optional[str]` | Version to query, default is "latest". |

**Returns**

`Datacollection` &mdash; Returns a data collection containing the taxonomy assets

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L8226)

### `get_asset_profiles`

```python
def CoinMetricsClient.get_asset_profiles(self, assets: Optional[Union[List[str], str]]=None, full_names: Optional[Union[List[str], str]]=None, page_size: Optional[int]=None, paging_from: Optional[str]=None) -> DataCollection:
```


Returns profile data for assets, ordered by asset

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `assets` | `Optional[Union[List[str], str]]` | Returns profile data for assets. |
| `full_names` | `Optional[Union[List[str], str]]` | Comma separated list of asset full names. By default profile data for all assets is returned. Mutually exclusive with assets parameter. |
| `page_size` | `int` | Number of items per single page of results. |
| `paging_from` | `int` | Where does the first page start, at the "start" of the interval or at the "end" |

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L8271)

### `get_network_profiles`

```python
def CoinMetricsClient.get_network_profiles(self, networks: Optional[Union[List[str], str]]=None, full_names: Optional[Union[List[str], str]]=None, page_size: Optional[int]=None, paging_from: Optional[str]=None) -> DataCollection:
```


Returns profile data for assets, ordered by asset

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `networks` | `Optional[Union[List[str], str]]` | Comma separated list of networks. By default profile data for all networks is returned. Mutually exclusive with full_names parameter. |
| `full_names` | `Optional[Union[List[str], str]]` | Comma separated list of asset full names. By default profile data for all assets is returned. Mutually exclusive with networks parameter. |
| `page_size` | `int` | Number of items per single page of results. |
| `paging_from` | `int` | Where does the first page start, at the "start" of the interval or at the "end" |

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L8297)

### `reference_data_asset_metrics`

```python
def CoinMetricsClient.reference_data_asset_metrics(self, metrics: Optional[Union[str, List[str]]]=None, reviewable: Optional[bool]=None, page_size: Optional[int]=None, paging_from: Optional[str]=None, format: Optional[str]='json_stream') -> DataCollection:
```


**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `metrics` | `Optional[Union[str, List[str]]]` | Comma separated list of metrics. By default all metrics are returned. |
| `reviewable` | `Optional[bool]` | Limit to human-reviewable metrics. By default all metrics are returned. |
| `page_size` | `Optional[int]` | Number of items per single page of results. |
| `paging_from` | `Optional[str]` | Where does the first page start, at the start of the interval or at the end. |
| `format` | `Optional[str]` | Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'. |

**Returns**

`DataCollection` &mdash; List of asset metrics metadata.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L8323)

### `reference_data_markets`

```python
def CoinMetricsClient.reference_data_markets(self, markets: Optional[Union[str, List[str]]]=None, exchange: Optional[str]=None, type: Optional[str]=None, base: Optional[str]=None, quote: Optional[str]=None, asset: Optional[str]=None, symbol: Optional[str]=None, include: Optional[str]=None, page_size: Optional[int]=None, paging_from: Optional[str]=None, next_page_token: Optional[str]=None, format: Optional[str]='json_stream') -> DataCollection:
```


**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `markets` | `Optional[Union[str, List[str]]]` | Comma separated list of markets. By default all markets are returned. |
| `exchange` | `Optional[str]` | Unique name of an exchange. |
| `type` | `Optional[str]` | Type of markets. |
| `base` | `Optional[str]` | Base asset of markets. |
| `quote` | `Optional[str]` | Quote asset of markets. |
| `asset` | `Optional[str]` | Any asset of markets. |
| `symbol` | `Optional[str]` | Symbol of derivative markets, full instrument name. |
| `include` | `Optional[str]` | Comma-separated list of namespaces to include in response. Currently, the only supported value is `talos`. |
| `page_size` | `Optional[int]` | Number of items per single page of results. |
| `paging_from` | `Optional[str]` | Where does the first page start, at the start of the interval or at the end. |
| `next_page_token` | `Optional[str]` | Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use `next_page_url` response field. |
| `format` | `Optional[str]` | Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'. |

**Returns**

`DataCollection` &mdash; List of markets metadata.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L8359)

### `reference_data_exchange_metrics`

```python
def CoinMetricsClient.reference_data_exchange_metrics(self, metrics: Optional[Union[str, List[str]]]=None, page_size: Optional[int]=None, paging_from: Optional[str]=None, format: Optional[str]='json_stream') -> DataCollection:
```


**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `metrics` | `Optional[Union[str, List[str]]]` | Comma separated list of metrics. By default all metrics are returned. |
| `page_size` | `Optional[int]` | Number of items per single page of results. |
| `paging_from` | `Optional[str]` | Where does the first page start, at the start of the interval or at the end. |
| `format` | `Optional[str]` | Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'. |

**Returns**

`DataCollection` &mdash; List of exchange metrics metadata.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L8423)

### `reference_data_exchange_asset_metrics`

```python
def CoinMetricsClient.reference_data_exchange_asset_metrics(self, metrics: Optional[Union[str, List[str]]]=None, page_size: Optional[int]=None, paging_from: Optional[str]=None, format: Optional[str]='json_stream') -> DataCollection:
```


**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `metrics` | `Optional[Union[str, List[str]]]` | Comma separated list of metrics. By default all metrics are returned. |
| `page_size` | `Optional[int]` | Number of items per single page of results. |
| `paging_from` | `Optional[str]` | Where does the first page start, at the start of the interval or at the end. |
| `format` | `Optional[str]` | Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'. |

**Returns**

`DataCollection` &mdash; List of exchange asset metrics metadata.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L8455)

### `reference_data_pair_metrics`

```python
def CoinMetricsClient.reference_data_pair_metrics(self, metrics: Optional[Union[str, List[str]]]=None, page_size: Optional[int]=None, paging_from: Optional[str]=None, format: Optional[str]='json_stream') -> DataCollection:
```


**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `metrics` | `Optional[Union[str, List[str]]]` | Comma separated list of metrics. By default all metrics are returned. |
| `page_size` | `Optional[int]` | Number of items per single page of results. |
| `paging_from` | `Optional[str]` | Where does the first page start, at the start of the interval or at the end. |
| `format` | `Optional[str]` | Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'. |

**Returns**

`DataCollection` &mdash; List of pair metrics metadata.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L8487)

### `reference_data_institution_metrics`

```python
def CoinMetricsClient.reference_data_institution_metrics(self, metrics: Optional[Union[str, List[str]]]=None, page_size: Optional[int]=None, paging_from: Optional[str]=None, format: Optional[str]='json_stream') -> DataCollection:
```


**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `metrics` | `Optional[Union[str, List[str]]]` | Comma separated list of metrics. By default all metrics are returned. |
| `page_size` | `Optional[int]` | Number of items per single page of results. |
| `paging_from` | `Optional[str]` | Where does the first page start, at the start of the interval or at the end. |
| `format` | `Optional[str]` | Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'. |

**Returns**

`DataCollection` &mdash; List of institution metrics metadata.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L8519)

### `reference_data_exchange_pair_metrics`

```python
def CoinMetricsClient.reference_data_exchange_pair_metrics(self, metrics: Optional[Union[str, List[str]]]=None, page_size: Optional[int]=None, paging_from: Optional[str]=None, format: Optional[str]='json_stream') -> DataCollection:
```


**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `metrics` | `Optional[Union[str, List[str]]]` | Comma separated list of metrics. By default all metrics are returned. |
| `page_size` | `Optional[int]` | Number of items per single page of results. |
| `paging_from` | `Optional[str]` | Where does the first page start, at the start of the interval or at the end. |
| `format` | `Optional[str]` | Default: "json_stream" (catalog-v2 and reference-data, market-orderbooks and other heavy endpoints), "json" (timeseries/*-metrics and other lighter endpoints). Format of the response. Supported values are json, json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'. |

**Returns**

`DataCollection` &mdash; List of exchange asset metrics metadata.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L8551)

### `reference_data_assets`

```python
def CoinMetricsClient.reference_data_assets(self, assets: Optional[Union[str, List[str]]]=None, include: Optional[str]=None, page_size: Optional[int]=None, paging_from: Optional[str]=None, next_page_token: Optional[str]=None, format: Optional[str]='json_stream') -> DataCollection:
```


**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `assets` | `Optional[Union[str, List[str]]]` | Comma separated list of assets. By default all assets are returned. |
| `include` | `Optional[str]` | Comma-separated list of namespaces to include in response. Currently, the only supported value is `talos`. |
| `page_size` | `Optional[int]` | Number of items per single page of results. |
| `paging_from` | `Optional[str]` | Where does the first page start, at the start of the interval or at the end. |
| `next_page_token` | `Optional[str]` | Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use `next_page_url` response field. |
| `format` | `Optional[str]` | Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'. |

**Returns**

`DataCollection` &mdash; List of assets metadata.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L8583)

### `reference_data_exchanges`

```python
def CoinMetricsClient.reference_data_exchanges(self, exchanges: Optional[Union[str, List[str]]]=None, include: Optional[str]=None, page_size: Optional[int]=None, paging_from: Optional[str]=None, next_page_token: Optional[str]=None, format: Optional[str]='json_stream') -> DataCollection:
```


**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `exchanges` | `Optional[Union[str, List[str]]]` | Comma separated list of exchanges. By default all exchanges are returned. |
| `include` | `Optional[str]` | Comma-separated list of namespaces to include in response. Currently, the only supported value is `talos`. |
| `page_size` | `Optional[int]` | Number of items per single page of results. |
| `paging_from` | `Optional[str]` | Where does the first page start, at the start of the interval or at the end. |
| `next_page_token` | `Optional[str]` | Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use `next_page_url` response field. |
| `format` | `Optional[str]` | Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'. |

**Returns**

`DataCollection` &mdash; List of exchanges metadata.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L8623)

### `reference_data_indexes`

```python
def CoinMetricsClient.reference_data_indexes(self, indexes: Optional[Union[str, List[str]]]=None, page_size: Optional[int]=None, paging_from: Optional[str]=None, next_page_token: Optional[str]=None, format: Optional[str]='json_stream') -> DataCollection:
```


**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `indexes` | `Optional[Union[str, List[str]]]` | Comma separated list of indexes. By default all indexes are returned. |
| `page_size` | `Optional[int]` | Number of items per single page of results. |
| `paging_from` | `Optional[str]` | Where does the first page start, at the start of the interval or at the end. |
| `next_page_token` | `Optional[str]` | Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use `next_page_url` response field. |
| `format` | `Optional[str]` | Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'. |

**Returns**

`DataCollection` &mdash; List of indexes metadata.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L8663)

### `reference_data_pairs`

```python
def CoinMetricsClient.reference_data_pairs(self, pairs: Optional[Union[str, List[str]]]=None, page_size: Optional[int]=None, paging_from: Optional[str]=None, next_page_token: Optional[str]=None, format: Optional[str]='json_stream') -> DataCollection:
```


**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `pairs` | `Optional[Union[str, List[str]]]` | Comma separated list of asset pairs. By default, all asset pairs are returned. |
| `page_size` | `Optional[int]` | Number of items per single page of results. |
| `paging_from` | `Optional[str]` | Where does the first page start, at the start of the interval or at the end. |
| `next_page_token` | `Optional[str]` | Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use `next_page_url` response field. |
| `format` | `Optional[str]` | Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'. |

**Returns**

`DataCollection` &mdash; List of pairs metadata.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L8699)

### `reference_data_market_metrics`

```python
def CoinMetricsClient.reference_data_market_metrics(self, metrics: Optional[Union[str, List[str]]]=None, page_size: Optional[int]=None, paging_from: Optional[str]=None, next_page_token: Optional[str]=None, format: Optional[str]='json_stream') -> DataCollection:
```


**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `metrics` | `Optional[Union[str, List[str]]]` | Comma separated list of metrics. By default all metrics are returned. |
| `page_size` | `Optional[int]` | Number of items per single page of results. |
| `paging_from` | `Optional[str]` | Where does the first page start, at the start of the interval or at the end. |
| `next_page_token` | `Optional[str]` | Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use `next_page_url` response field. |
| `format` | `Optional[str]` | Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'. |

**Returns**

`DataCollection` &mdash; List of market metrics metadata.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L8735)

### `security_master_assets`

```python
def CoinMetricsClient.security_master_assets(self, assets: Optional[Union[str, List[str]]]=None, codes: Optional[Union[str, List[str]]]=None, page_size: Optional[int]=None, paging_from: Optional[str]=None, next_page_token: Optional[str]=None) -> DataCollection:
```


**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `assets` | `Optional[Union[str, List[str]]]` | Comma-separated list of assets to query. Mutually exclusive with `codes`. |
| `codes` | `Optional[Union[str, List[str]]]` | Comma-separated list of ten-digit alphanumeric identifying codes. Mutually exclusive with `assets`. |
| `page_size` | `Optional[int]` | Number of items per single page of results. |
| `paging_from` | `Optional[str]` | Where does the first page start, at the start of the interval or at the end. |
| `next_page_token` | `Optional[str]` | Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use `next_page_url` response field. |

**Returns**

`DataCollection` &mdash; List of assets and their metadata in security master

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L8771)

### `security_master_markets`

```python
def CoinMetricsClient.security_master_markets(self, type: Optional[str]=None, markets: Optional[Union[str, List[str]]]=None, symbol: Optional[str]=None, exchange: Optional[str]=None, base: Optional[str]=None, quote: Optional[str]=None, page_size: Optional[int]=None, paging_from: Optional[str]=None, next_page_token: Optional[str]=None) -> DataCollection:
```


**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `type` | `Optional[str]` | Type of markets. |
| `markets` | `Optional[Union[str, List[str]]]` | List of markets. |
| `symbol` | `Optional[str]` | Symbol of derivative markets, full instrument name. |
| `exchange` | `Optional[str]` | Unique name of an exchange. |
| `base` | `Optional[str]` | Base asset of markets. |
| `quote` | `Optional[str]` | Quote asset of markets. |
| `page_size` | `Optional[int]` | Number of items per single page of results. |
| `paging_from` | `Optional[str]` | Where does the first page start, at the start of the interval or at the end. |
| `next_page_token` | `Optional[str]` | Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use `next_page_url` response field. |

**Returns**

`DataCollection` &mdash; List of security master entries.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L8807)

### `get_snapshots_of_asset_metric_constituents`

```python
def CoinMetricsClient.get_snapshots_of_asset_metric_constituents(self, metric: str, at_time: Optional[str]=None, end_time: Optional[Union[datetime, date, str]]=None, start_time: Optional[Union[datetime, date, str]]=None, next_page_token: Optional[str]=None, page_size: Optional[int]=None, paging_from: Optional[str]=None, format: Optional[str]=None) -> DataCollection:
```


**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `metric` | `str` | Target metric name. |
| `at_time` | `Optional[str]` | Returns constituents at a specified date.         Value `now` can be specified to get the current constituents.         Mutually exclusive with `start_time` and/or `end_time`. |
| `end_time` | `Optional[Union[datetime, date, str]]` | Start of the time interval, inclusive.         Multiple formats of ISO 8601 are supported: `2006-01-20T00:00:00Z`, `2006-01-20T00:00:00.000Z`, `2006-01-20T00:00:00.123456Z`, `2006-01-20T00:00:00.123456789, 2006-01-20, 20060120Z`, `2006-01-20`, `20060120`.         Mutually exclusive with `at_time`. |
| `start_time` | `Optional[Union[datetime, date, str]]` | End of the time interval, inclusive.         Multiple formats of ISO 8601 are supported: `2006-01-20T00:00:00Z`, `2006-01-20T00:00:00.000Z`, `2006-01-20T00:00:00.123456Z`, `2006-01-20T00:00:00.123456789, 2006-01-20, 20060120Z`, `2006-01-20`, `20060120`.         Mutually exclusive with `at_time`. |
| `next_page_token` | `Optional[str]` | Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use `next_page_url` response field. |
| `page_size` | `Optional[int]` | Number of items per single page of results. |
| `paging_from` | `Optional[str]` | Where does the first page start, at the start of the interval or at the end. |
| `format` | `Optional[str]` | Format of the response. Supported values are `json`, `csv`. Default is `json`. |

**Returns**

`DataCollection` &mdash; Snapshots of asset metric constituents.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L8859)

### `get_timeframes_of_asset_metric_constituents`

```python
def CoinMetricsClient.get_timeframes_of_asset_metric_constituents(self, metric: str, constituents: Optional[Union[str, List[str]]]=None, end_time: Optional[Union[datetime, date, str]]=None, start_time: Optional[Union[datetime, date, str]]=None, next_page_token: Optional[str]=None, page_size: Optional[int]=None, paging_from: Optional[str]=None, format: Optional[str]=None) -> DataCollection:
```


**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `metric` | `str` | Target metric name. |
| `constituents` | `Optional[Union[str, List[str]]]` | Comma separated list of constituents. By default all constituents are returned. Different asset metrics may have different constituents. For example, constituents for `volume_trusted_spot_usd_1d` are exchanges. |
| `end_time` | `Optional[Union[datetime, date, str]]` | Start of the time interval, inclusive.         Multiple formats of ISO 8601 are supported: `2006-01-20T00:00:00Z`, `2006-01-20T00:00:00.000Z`, `2006-01-20T00:00:00.123456Z`, `2006-01-20T00:00:00.123456789, 2006-01-20, 20060120Z`, `2006-01-20`, `20060120`.         Mutually exclusive with `at_time`. |
| `start_time` | `Optional[Union[datetime, date, str]]` | End of the time interval, inclusive.         Multiple formats of ISO 8601 are supported: `2006-01-20T00:00:00Z`, `2006-01-20T00:00:00.000Z`, `2006-01-20T00:00:00.123456Z`, `2006-01-20T00:00:00.123456789, 2006-01-20, 20060120Z`, `2006-01-20`, `20060120`.         Mutually exclusive with `at_time`. |
| `next_page_token` | `Optional[str]` | Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use `next_page_url` response field. |
| `page_size` | `Optional[int]` | Number of items per single page of results. |
| `paging_from` | `Optional[str]` | Where does the first page start, at the start of the interval or at the end. |
| `format` | `Optional[str]` | Format of the response. Supported values are `json`, `csv`. Default is `json`. |

**Returns**

`DataCollection` &mdash; List of timeframes.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L8912)

### `get_blockchain_metadata_tags`

```python
def CoinMetricsClient.get_blockchain_metadata_tags(self, type: Optional[str]=None, page_size: Optional[int]=None, next_page_token: Optional[str]=None) -> DataCollection:
```


Returns a list of all available tags along with their descriptions, lexicographically ordered by the tag field.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `type` | `Optional[str]` | The type of a tag. |
| `page_size` | `Optional[int]` | Number of items per single page of results. |
| `next_page_token` | `Optional[str]` | Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use `next_page_url` response field. |

**Returns**

`DataCollection` &mdash; List of tags.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L8964)

### `blockchain_metadata_tags`

```python
def CoinMetricsClient.blockchain_metadata_tags(self, type: Optional[str]=None, page_size: Optional[int]=None, next_page_token: Optional[str]=None) -> DataCollection:
```


Get blockchain metadata tags.

.. deprecated::
   Use `get_blockchain_metadata_tags` instead.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `type` | `Optional[str]` | The type of a tag. |
| `page_size` | `Optional[int]` | Number of items per single page of results. |
| `next_page_token` | `Optional[str]` | Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use `next_page_url` response field. |

**Returns**

`DataCollection` &mdash; List of tags.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L8991)

### `get_blockchain_metadata_tagged_entities`

```python
def CoinMetricsClient.get_blockchain_metadata_tagged_entities(self, tags: Optional[Union[str, List[str]]]=None, entities: Optional[Union[str, List[str]]]=None, locations: Optional[Union[str, List[str]]]=None, owner_names: Optional[Union[str, List[str]]]=None, page_size: Optional[int]=None, next_page_token: Optional[str]=None) -> DataCollection:
```


Returns a list of all entities associated with provided tags. Ordered by tuple (entity, tag, location, start_time) if requested by providing entities parameter. Ordered by tuple (tag, location, entity, started_time) if requested by providing tags parameter. Ordered by tuple (owner_name, location, entity, tag, timestamp_start) if requested by providing owner_name parameter.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `tags` | `Optional[Union[str, List[str]]]` | Comma separated list of tags. Mutually exclusive with `entities` parameter. Currently a single tag is allowed per each request. |
| `entities` | `Optional[Union[str, List[str]]]` | Comma separated list of entities. Mutually exclusive with `tags` parameter. |
| `locations` | `Optional[Union[str, List[str]]]` | Comma separated list of entity locations (asset representation where the entity has been tagged). Currently a single entity location is allowed per each request. |
| `owner_names` | `Optional[Union[str, List[str]]]` | Comma separated list of owner names. Mutually exclusive with tags and entities parameters. Currently a single owner name is allowed in a request. |
| `page_size` | `Optional[int]` | Number of items per single page of results. |
| `next_page_token` | `Optional[str]` | Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use `next_page_url` response field. |

**Returns**

`DataCollection` &mdash; List of tagged entities. Ordered by tuple `(entity, tag, location, start_time)` if requested by providing `entities` parameter. Ordered by tuple `(tag, location, entity, started_time)` if requested by providing `tags` parameter.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L9015)

### `blockchain_metadata_tagged_entities`

```python
def CoinMetricsClient.blockchain_metadata_tagged_entities(self, tags: Optional[Union[str, List[str]]]=None, entities: Optional[Union[str, List[str]]]=None, locations: Optional[Union[str, List[str]]]=None, owner_names: Optional[Union[str, List[str]]]=None, page_size: Optional[int]=None, next_page_token: Optional[str]=None) -> DataCollection:
```


Returns a list of all entities associated with provided tags. Ordered by tuple (entity, tag, location, start_time) if requested by providing entities parameter. Ordered by tuple (tag, location, entity, started_time) if requested by providing tags parameter. Ordered by tuple (owner_name, location, entity, tag, timestamp_start) if requested by providing owner_name parameter.

.. deprecated::
   Use `get_blockchain_metadata_tagged_entities` instead.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `tags` | `Optional[Union[str, List[str]]]` | Comma separated list of tags. Mutually exclusive with `entities` parameter. Currently a single tag is allowed per each request. |
| `entities` | `Optional[Union[str, List[str]]]` | Comma separated list of entities. Mutually exclusive with `tags` parameter. |
| `locations` | `Optional[Union[str, List[str]]]` | Comma separated list of entity locations (asset representation where the entity has been tagged). Currently a single entity location is allowed per each request. |
| `owner_names` | `Optional[Union[str, List[str]]]` | Comma separated list of owner names. Mutually exclusive with tags and entities parameters. Currently a single owner name is allowed in a request. |
| `page_size` | `Optional[int]` | Number of items per single page of results. |
| `next_page_token` | `Optional[str]` | Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use `next_page_url` response field. |

**Returns**

`DataCollection` &mdash; List of tagged entities. Ordered by tuple `(entity, tag, location, start_time)` if requested by providing `entities` parameter. Ordered by tuple `(tag, location, entity, started_time)` if requested by providing `tags` parameter.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L9053)

### `get_blockchain_metadata_owners`

```python
def CoinMetricsClient.get_blockchain_metadata_owners(self, page_size: Optional[int]=None, next_page_token: Optional[str]=None) -> DataCollection:
```


Returns a list of all supported owners lexicographically ordered by the owner_name field.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `page_size` | `Optional[int]` | Number of items per single page of results. |
| `next_page_token` | `Optional[str]` | Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use `next_page_url` response field. |

**Returns**

`DataCollection` &mdash; List of tagged entities. Ordered by tuple `(entity, tag, location, start_time)` if requested by providing `entities` parameter. Ordered by tuple `(tag, location, entity, started_time)` if requested by providing `tags` parameter.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L9094)

### `get_blockchain_metadata_locations`

```python
def CoinMetricsClient.get_blockchain_metadata_locations(self, page_size: Optional[int]=None, next_page_token: Optional[str]=None) -> DataCollection:
```


Returns a list of all supported locations ordered lexicographically.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `page_size` | `Optional[int]` | Number of items per single page of results. |
| `next_page_token` | `Optional[str]` | Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use `next_page_url` response field. |

**Returns**

`DataCollection` &mdash; List of tagged entities. Ordered by tuple `(entity, tag, location, start_time)` if requested by providing `entities` parameter. Ordered by tuple `(tag, location, entity, started_time)` if requested by providing `tags` parameter.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L9115)
