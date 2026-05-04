# Time Series

| [`CoinMetricsClient.get_asset_alerts`](#coinmetrics.api_client.CoinMetricsClient.get_asset_alerts)                                     | Returns asset alerts for the specified assets.                                |
|----------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------|
| [`CoinMetricsClient.get_asset_chains`](#coinmetrics.api_client.CoinMetricsClient.get_asset_chains)                                     | Returns the chains of blocks for the specified assets.                        |
| [`CoinMetricsClient.get_asset_metrics`](#coinmetrics.api_client.CoinMetricsClient.get_asset_metrics)                                   | Returns requested metrics for specified assets.                               |
| [`CoinMetricsClient.get_defi_balance_sheets`](#coinmetrics.api_client.CoinMetricsClient.get_defi_balance_sheets)                       | Returns Defi Balance Sheet records for specified DeFi protocols.              |
| [`CoinMetricsClient.get_exchange_asset_metrics`](#coinmetrics.api_client.CoinMetricsClient.get_exchange_asset_metrics)                 | Returns metrics for specified exchange-asset.                                 |
| [`CoinMetricsClient.get_exchange_metrics`](#coinmetrics.api_client.CoinMetricsClient.get_exchange_metrics)                             | Returns metrics for specified exchanges.                                      |
| [`CoinMetricsClient.get_exchange_pair_metrics`](#coinmetrics.api_client.CoinMetricsClient.get_exchange_pair_metrics)                   | Returns metrics for specified exchange-pair.                                  |
| [`CoinMetricsClient.get_index_candles`](#coinmetrics.api_client.CoinMetricsClient.get_index_candles)                                   | Returns index candles for specified indexes and date range.                   |
| [`CoinMetricsClient.get_index_constituents`](#coinmetrics.api_client.CoinMetricsClient.get_index_constituents)                         | Returns index constituents for specified indexes and date range.              |
| [`CoinMetricsClient.get_index_levels`](#coinmetrics.api_client.CoinMetricsClient.get_index_levels)                                     | Returns index levels for specified indexes and date range.                    |
| [`CoinMetricsClient.get_institution_metrics`](#coinmetrics.api_client.CoinMetricsClient.get_institution_metrics)                       | Returns metrics for specified institutions.                                   |
| [`CoinMetricsClient.get_market_candles`](#coinmetrics.api_client.CoinMetricsClient.get_market_candles)                                 | Returns market candles for specified markets, frequency and date range.       |
| [`CoinMetricsClient.get_market_contract_prices`](#coinmetrics.api_client.CoinMetricsClient.get_market_contract_prices)                 | Returns contract prices for specified markets.                                |
| [`CoinMetricsClient.get_market_funding_rates`](#coinmetrics.api_client.CoinMetricsClient.get_market_funding_rates)                     | Returns market funding rates for specified markets and date range.            |
| [`CoinMetricsClient.get_market_greeks`](#coinmetrics.api_client.CoinMetricsClient.get_market_greeks)                                   | Returns greeks for option markets.                                            |
| [`CoinMetricsClient.get_market_implied_volatility`](#coinmetrics.api_client.CoinMetricsClient.get_market_implied_volatility)           | Returns implied volatility for specified markets.                             |
| [`CoinMetricsClient.get_market_liquidations`](#coinmetrics.api_client.CoinMetricsClient.get_market_liquidations)                       | Returns market liquidations for specified markets and date range.             |
| [`CoinMetricsClient.get_market_metrics`](#coinmetrics.api_client.CoinMetricsClient.get_market_metrics)                                 | Returns market metrics for specified markets, frequency and date range.       |
| [`CoinMetricsClient.get_market_open_interest`](#coinmetrics.api_client.CoinMetricsClient.get_market_open_interest)                     | Returns market open interest for specified markets and date range.            |
| [`CoinMetricsClient.get_market_orderbooks`](#coinmetrics.api_client.CoinMetricsClient.get_market_orderbooks)                           | Returns market order books for specified markets and date range.              |
| [`CoinMetricsClient.get_market_quotes`](#coinmetrics.api_client.CoinMetricsClient.get_market_quotes)                                   | Returns market quotes for specified markets and date range.                   |
| [`CoinMetricsClient.get_market_trades`](#coinmetrics.api_client.CoinMetricsClient.get_market_trades)                                   | Returns market trades for specified markets and date range.                   |
| [`CoinMetricsClient.get_mempool_feerates`](#coinmetrics.api_client.CoinMetricsClient.get_mempool_feerates)                             | Returns mempool feerates for the specified assets.                            |
| [`CoinMetricsClient.get_mining_pool_tips_summary`](#coinmetrics.api_client.CoinMetricsClient.get_mining_pool_tips_summary)             | Returns mining pool tips summaries for specified assets.                      |
| [`CoinMetricsClient.get_pair_candles`](#coinmetrics.api_client.CoinMetricsClient.get_pair_candles)                                     | Returns candles for specified asset pairs.                                    |
| [`CoinMetricsClient.get_pair_metrics`](#coinmetrics.api_client.CoinMetricsClient.get_pair_metrics)                                     | Returns metrics books for specified asset-asset pairs.                        |
| [`CoinMetricsClient.get_predicted_market_funding_rates`](#coinmetrics.api_client.CoinMetricsClient.get_predicted_market_funding_rates) | Returns predicted funding rates for specified futures markets.                |
| [`CoinMetricsClient.get_stream_asset_metrics`](#coinmetrics.api_client.CoinMetricsClient.get_stream_asset_metrics)                     | Returns timeseries stream of metrics for specified assets.                    |
| [`CoinMetricsClient.get_stream_asset_quotes`](#coinmetrics.api_client.CoinMetricsClient.get_stream_asset_quotes)                       | Returns a websocket stream of asset quotes for the requested assets.          |
| [`CoinMetricsClient.get_stream_index_levels`](#coinmetrics.api_client.CoinMetricsClient.get_stream_index_levels)                       | Returns timeseries stream of index levels.                                    |
| [`CoinMetricsClient.get_stream_market_candles`](#coinmetrics.api_client.CoinMetricsClient.get_stream_market_candles)                   | Returns timeseries stream of market candles.                                  |
| [`CoinMetricsClient.get_stream_market_contract_prices`](#coinmetrics.api_client.CoinMetricsClient.get_stream_market_contract_prices)   | Returns timeseries stream of market contract prices.                          |
| [`CoinMetricsClient.get_stream_market_liquidations`](#coinmetrics.api_client.CoinMetricsClient.get_stream_market_liquidations)         | Returns timeseries stream for market liquidations                             |
| [`CoinMetricsClient.get_stream_market_open_interest`](#coinmetrics.api_client.CoinMetricsClient.get_stream_market_open_interest)       | Returns a websocket stream of market open interest for the requested markets. |
| [`CoinMetricsClient.get_stream_market_orderbooks`](#coinmetrics.api_client.CoinMetricsClient.get_stream_market_orderbooks)             | Returns timeseries stream of market orderbooks.                               |
| [`CoinMetricsClient.get_stream_market_quotes`](#coinmetrics.api_client.CoinMetricsClient.get_stream_market_quotes)                     | Returns timeseries stream of market quotes.                                   |
| [`CoinMetricsClient.get_stream_market_trades`](#coinmetrics.api_client.CoinMetricsClient.get_stream_market_trades)                     | Returns timeseries stream of market trades.                                   |
| [`CoinMetricsClient.get_stream_pair_quotes`](#coinmetrics.api_client.CoinMetricsClient.get_stream_pair_quotes)                         | Returns a websocket stream of pair quotes for the requested asset pairs.      |

#### CoinMetricsClient.get_asset_alerts(assets, alerts, page_size=None, paging_from='start', start_time=None, end_time=None, start_inclusive=None, end_inclusive=None, timezone=None, include_heartbeats=None, format=None)

Returns asset alerts for the specified assets.

* **Parameters:**
  * **assets** ([*list*](https://docs.python.org/3/library/stdtypes.html#list) *(*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *)* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- list of asset names, e.g. 'btc'
  * **alerts** ([*list*](https://docs.python.org/3/library/stdtypes.html#list) *(*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *)* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- list of asset alert names
  * **page_size** ([*int*](https://docs.python.org/3/library/functions.html#int)) -- number of items returned per page when calling the API. If the request times out, try using a smaller number.
  * **paging_from** (*PagingFrom* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Defines where you want to start receiving items from, 'start' or 'end' of the timeseries.
  * **start_time** (*datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Start time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **end_time** (*datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- End time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **start_inclusive** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if start timestamp must be included in the timeseries if present. True by default.
  * **end_inclusive** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if end timestamp must be included in the timeseries if present. True by default.
  * **timezone** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- timezone of the start/end times in db format for example: "America/Chicago". Default value is "UTC". For more details check out API documentation page.
  * **include_heartbeats** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- If set to true, includes information about most recent time asset was successfully evaluated.
  * **format** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Format of the response. Supported values are json, csv. Default is json.
* **Returns:**
  Asset alerts timeseries.
* **Return type:**
  [DataCollection](../data-collection.md#coinmetrics._data_collection.DataCollection)

#### CoinMetricsClient.get_asset_chains(assets, page_size=None, paging_from='start', start_time=None, end_time=None, start_inclusive=None, end_inclusive=None, timezone=None, format=None)

Returns the chains of blocks for the specified assets.

* **Parameters:**
  * **assets** ([*list*](https://docs.python.org/3/library/stdtypes.html#list) *(*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *)* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- list of asset names, e.g. 'btc'
  * **page_size** ([*int*](https://docs.python.org/3/library/functions.html#int)) -- number of items returned per page when calling the API. If the request times out, try using a smaller number.
  * **paging_from** (*PagingFrom* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Defines where you want to start receiving items from, 'start' or 'end' of the timeseries.
  * **start_time** (*datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Start time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **end_time** (*datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- End time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **start_inclusive** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if start timestamp must be included in the timeseries if present. True by default.
  * **end_inclusive** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if end timestamp must be included in the timeseries if present. True by default.
  * **timezone** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- timezone of the start/end times in db format for example: "America/Chicago". Default value is "UTC". For more details check out API documentation page.
  * **format** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Format of the response. Supported values are json, csv. Default is json.
* **Returns:**
  Asset chains timeseries.
* **Return type:**
  [DataCollection](../data-collection.md#coinmetrics._data_collection.DataCollection)

#### CoinMetricsClient.get_asset_metrics(assets, metrics, frequency=None, page_size=None, paging_from='start', start_time=None, end_time=None, start_height=None, end_height=None, start_inclusive=None, end_inclusive=None, timezone=None, sort=None, limit_per_asset=None, status=None, start_hash=None, end_hash=None, min_confirmations=None, null_as_zero=None, ignore_forbidden_errors=None, ignore_unsupported_errors=None, format='json_stream')

Returns requested metrics for specified assets.

* **Parameters:**
  * **assets** ([*list*](https://docs.python.org/3/library/stdtypes.html#list) *(*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *)* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- list of asset names, e.g. 'btc' Use the client.catalog_asset_metrics_v2() method for the full list of supported assets or specify asterisk (`*`) in order to get metrics for all supported assets.
  * **metrics** ([*list*](https://docs.python.org/3/library/stdtypes.html#list) *(*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *)* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- list of asset-specific metric names, e.g. 'AdrActCnt', 'BlkHgt'. Example: metrics='AdrActCnt,BlkHgt'
    Comma separated metrics to request time series data for.
    Information on all available metrics can be found on page [https://coverage.coinmetrics.io/asset-metrics-v2](https://coverage.coinmetrics.io/asset-metrics-v2).
    Use the client.catalog_full_asset_metrics_v2() method for the full list of supported metrics per asset.
  * **frequency** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- frequency of the returned timeseries, e.g 15s, 1d, etc.
  * **page_size** ([*int*](https://docs.python.org/3/library/functions.html#int)) -- number of items returned per page when calling the API. If the request times out, try using a smaller number.
  * **paging_from** (*PagingFrom* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Defines where you want to start receiving items from, 'start' or 'end' of the timeseries.
  * **start_time** (*datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Start time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **end_time** (*datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- End time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **start_height** ([*int*](https://docs.python.org/3/library/functions.html#int)) -- Start block of the timeseries (only applicable when querying with frequency 1b).
  * **end_height** ([*int*](https://docs.python.org/3/library/functions.html#int)) -- End block of the timeseries (only applicable when querying with frequency 1b).
  * **start_inclusive** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if start timestamp must be included in the timeseries if present. True by default.
  * **end_inclusive** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if end timestamp must be included in the timeseries if present. True by default.
  * **timezone** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- timezone of the start/end times in db format for example: "America/Chicago". Default value is "UTC". For more details check out API documentation page.
  * **sort** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- How results will be sorted, e.g. "asset", "height", or "time". Default is "asset". Metrics with 1b frequency are sorted by (asset, height, block_hash) tuples by default. Metrics with other frequencies are sorted by (asset, time) by default. If you want to sort 1d metrics by (time, asset) you should choose time as value for the sort parameter. Sorting by time is useful if you request metrics for a set of assets.
  * **limit_per_asset** ([*int*](https://docs.python.org/3/library/functions.html#int)) -- How many entries *per asset* the result should contain.
  * **status** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Which metric values do you want to see. Applicable only for "reviewable" metrics.
    You can find them in the /catalog/metrics endpoint. Default: "all". Supported: "all" "flash" "reviewed" "revised"
  * **start_hash** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- The start hash indicates the beginning block height for the set of data that are returned.
    Inclusive by default. Mutually exclusive with start_time and start_height.
  * **end_hash** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- The end hash indicates the ending block height for the set of data that are returned.
    Inclusive by default. Mutually exclusive with end_time and end_height.
  * **min_confirmations** ([*int*](https://docs.python.org/3/library/functions.html#int)) -- Specifies how many blocks behind the chain tip block by block metrics
    (1b frequency) are based on. Default for btc is 2 and 99 for eth.
  * **null_as_zero** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Default: false. Nulls are represented as zeros in the response.
  * **ignore_forbidden_errors** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Default: false. Ignore HTTP 403 Forbidden errors
  * **ignore_unsupported_errors** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Default: false. Ignore errors for unsupported assets, metrics or frequencies.
  * **format** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'.
* **Returns:**
  Asset Metrics timeseries.
* **Return type:**
  [DataCollection](../data-collection.md#coinmetrics._data_collection.DataCollection)

#### CoinMetricsClient.get_defi_balance_sheets(defi_protocols, page_size=None, paging_from='start', start_time=None, end_time=None, start_height=None, end_height=None, start_inclusive=None, end_inclusive=None, timezone=None, format=None)

Returns Defi Balance Sheet records for specified DeFi protocols.

* **Parameters:**
  * **defi_protocols** ([*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- list of DeFi protocols like aave_v2_eth or protocol patterns like `aave_v2_*` or `aave_*_eth` or `*_eth`.
  * **page_size** ([*int*](https://docs.python.org/3/library/functions.html#int)) -- number of items returned per page when calling the API. If the request times out, try using a smaller number.
  * **paging_from** (*PagingFrom* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Defines where you want to start receiving items from, 'start' or 'end' of the timeseries.
  * **start_time** (*datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Start time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **end_time** (*datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- End time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **start_height** ([*int*](https://docs.python.org/3/library/functions.html#int)) -- The start height indicates the beginning block height for the set of data that are returned. Mutually exclusive with start_time
  * **end_height** ([*int*](https://docs.python.org/3/library/functions.html#int)) -- The end height indicates the beginning block height for the set of data that are returned. Mutually exclusive with end_time
  * **start_inclusive** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if start timestamp must be included in the timeseries if present. True by default.
  * **end_inclusive** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if end timestamp must be included in the timeseries if present. True by default.
  * **timezone** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- timezone of the start/end times in db format for example: "America/Chicago". Default value is "UTC". For more details check out API documentation page.
  * **format** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Format of the response. Supported values are json, csv. Default is json.
* **Returns:**
  list of blockchain blocks metadata
* **Return type:**
  [DataCollection](../data-collection.md#coinmetrics._data_collection.DataCollection)

#### CoinMetricsClient.get_exchange_asset_metrics(exchange_assets, metrics, frequency=None, page_size=None, paging_from='start', start_time=None, end_time=None, start_height=None, end_height=None, start_inclusive=None, end_inclusive=None, timezone=None, sort=None, limit_per_exchange_asset=None, format='json_stream')

Returns metrics for specified exchange-asset.

* **Parameters:**
  * **exchange_assets** ([*list*](https://docs.python.org/3/library/stdtypes.html#list) *(*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *)* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- A list of exchange-asset pairs (e.g. "binance-btc") or patterns like `exchange-*` or `*-asset`.
  * **metrics** ([*list*](https://docs.python.org/3/library/stdtypes.html#list) *(*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *)* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Example: metrics=open_interest_reported_future_usd,volume_reported_spot_usd_1d
    Comma separated metrics to request time series data for.
    Information on all available metrics can be found on page [https://coverage.coinmetrics.io/exchange-asset-metrics-v2](https://coverage.coinmetrics.io/exchange-asset-metrics-v2).
    Use the client.catalog_full_exchange_asset_metrics_v2() method for the full list of supported metrics per exchange-asset combination.
  * **frequency** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- frequency of the returned timeseries, e.g 15s, 1d, etc.
  * **page_size** ([*int*](https://docs.python.org/3/library/functions.html#int)) -- number of items returned per page when calling the API. If the request times out, try using a smaller number.
  * **paging_from** (*PagingFrom* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Defines where you want to start receiving items from, 'start' or 'end' of the timeseries.
  * **start_time** (*datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Start time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **end_time** (*datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- End time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **start_height** ([*int*](https://docs.python.org/3/library/functions.html#int)) -- Start block of the timeseries (only applicable when querying with frequency 1b).
  * **end_height** ([*int*](https://docs.python.org/3/library/functions.html#int)) -- End block of the timeseries (only applicable when querying with frequency 1b).
  * **start_inclusive** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if start timestamp must be included in the timeseries if present. True by default.
  * **end_inclusive** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if end timestamp must be included in the timeseries if present. True by default.
  * **timezone** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- timezone of the start/end times in db format for example: "America/Chicago". Default value is "UTC". For more details check out API documentation page.
  * **sort** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- How results will be sorted, e.g. "exchange_asset", "time". Default is "exchange_asset".
  * **limit_per_exchange_asset** ([*int*](https://docs.python.org/3/library/functions.html#int)) -- How many entries *per exchange-asset* the result should contain.
  * **format** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'.
* **Returns:**
  Exchange-Asset Metrics timeseries.
* **Return type:**
  [DataCollection](../data-collection.md#coinmetrics._data_collection.DataCollection)

#### CoinMetricsClient.get_exchange_metrics(exchanges, metrics, frequency=None, page_size=None, paging_from='start', start_time=None, end_time=None, start_height=None, end_height=None, start_inclusive=None, end_inclusive=None, timezone=None, sort=None, limit_per_exchange=None, format='json_stream')

Returns metrics for specified exchanges.

* **Parameters:**
  * **exchanges** ([*list*](https://docs.python.org/3/library/stdtypes.html#list) *(*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *)* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Examples:
    - exchanges='coinbase,binance,etc' - the list of exchanges
    - exchanges=\* - all supported exchanges
    Comma separated list of exchange names or asterisk (`*`) for all supported exchanges.
  * **metrics** ([*list*](https://docs.python.org/3/library/stdtypes.html#list) *(*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *)* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Example: metrics=open_interest_reported_future_usd,volume_reported_spot_usd_1d
    Comma separated metrics to request time series data for.
    Information on all available metrics can be found on page [https://coverage.coinmetrics.io/exchange-metrics-v2](https://coverage.coinmetrics.io/exchange-metrics-v2).
    Use the client.catalog_full_exchange_metrics_v2() method for the full list of supported metrics per exchange.
  * **frequency** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- frequency of the returned timeseries, e.g 15s, 1d, etc.
  * **page_size** ([*int*](https://docs.python.org/3/library/functions.html#int)) -- number of items returned per page when calling the API. If the request times out, try using a smaller number.
  * **paging_from** (*PagingFrom* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Defines where you want to start receiving items from, 'start' or 'end' of the timeseries.
  * **start_time** (*datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Start time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **end_time** (*datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- End time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **start_height** ([*int*](https://docs.python.org/3/library/functions.html#int)) -- Start block of the timeseries (only applicable when querying with frequency 1b).
  * **end_height** ([*int*](https://docs.python.org/3/library/functions.html#int)) -- End block of the timeseries (only applicable when querying with frequency 1b).
  * **start_inclusive** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if start timestamp must be included in the timeseries if present. True by default.
  * **end_inclusive** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if end timestamp must be included in the timeseries if present. True by default.
  * **timezone** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- timezone of the start/end times in db format for example: "America/Chicago". Default value is "UTC". For more details check out API documentation page.
  * **sort** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- How results will be sorted, e.g. 'exchange', 'time'. Metrics are sorted by 'exchange' by default.
  * **limit_per_exchange** ([*int*](https://docs.python.org/3/library/functions.html#int)) -- How many entries *per exchange* the result should contain.
  * **format** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Format of the response. Supported values are json, csv. Default is json.
* **Returns:**
  Exchange Metrics timeseries.
* **Return type:**
  [DataCollection](../data-collection.md#coinmetrics._data_collection.DataCollection)

#### CoinMetricsClient.get_exchange_pair_metrics(exchange_pairs, metrics, frequency=None, page_size=None, paging_from='start', start_time=None, end_time=None, start_height=None, end_height=None, start_inclusive=None, end_inclusive=None, timezone=None, format='json_stream', limit_per_exchange_pair=None)

Returns metrics for specified exchange-pair.

* **Parameters:**
  * **exchange_pairs** ([*list*](https://docs.python.org/3/library/stdtypes.html#list) *(*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *)* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- A list of exchange-pairs or patterns like `exchange-*` or `*-pair`.
  * **metrics** ([*list*](https://docs.python.org/3/library/stdtypes.html#list) *(*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *)* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Example: metrics=volatility_implied_put_delta_50_1y_expiration,volatility_implied_skew_delta_05_1d_expiration
    Comma separated metrics to request time series data for.
    Information on all available metrics can be found on page [https://coverage.coinmetrics.io/exchange-pair-metrics](https://coverage.coinmetrics.io/exchange-pair-metrics).
    Use the catalog_full_exchange_pair_metrics_v2() method for the full list of supported metrics per exchange-pair combination.
  * **frequency** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- frequency of the returned timeseries, e.g 15s, 1d, etc.
  * **page_size** ([*int*](https://docs.python.org/3/library/functions.html#int)) -- number of items returned per page when calling the API. If the request times out, try using a smaller number.
  * **paging_from** (*PagingFrom* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Defines where you want to start receiving items from, 'start' or 'end' of the timeseries.
  * **start_time** (*datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Start time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **end_time** (*datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- End time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **start_height** ([*int*](https://docs.python.org/3/library/functions.html#int)) -- Start block of the timeseries (only applicable when querying with frequency 1b).
  * **end_height** ([*int*](https://docs.python.org/3/library/functions.html#int)) -- End block of the timeseries (only applicable when querying with frequency 1b).
  * **start_inclusive** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if start timestamp must be included in the timeseries if present. True by default.
  * **end_inclusive** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if end timestamp must be included in the timeseries if present. True by default.
  * **timezone** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- timezone of the start/end times in db format for example: "America/Chicago". Default value is "UTC". For more details check out API documentation page.
  * **format** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Default: "json". Enum: "json" "json_stream" "csv". Format of the response. Supported values are json, json_stream, csv.
  * **limit_per_exchange_pair** ([*int*](https://docs.python.org/3/library/functions.html#int)) -- How many entries *per exchange* the result should contain.
* **Returns:**
  Exchange-Pair Metrics timeseries.
* **Return type:**
  [DataCollection](../data-collection.md#coinmetrics._data_collection.DataCollection)

#### CoinMetricsClient.get_index_candles(indexes, frequency=None, page_size=None, paging_from='start', start_time=None, end_time=None, start_inclusive=None, end_inclusive=None, timezone=None, limit_per_index=None, format='json_stream')

Returns index candles for specified indexes and date range.

* **Parameters:**
  * **indexes** ([*list*](https://docs.python.org/3/library/stdtypes.html#list) *(*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *)* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- list of index names, e.g. 'CMBI10'
  * **frequency** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- frequency of the returned timeseries, e.g 15s, 1d, etc.
  * **page_size** ([*int*](https://docs.python.org/3/library/functions.html#int)) -- number of items returned per page when calling the API. If the request times out, try using a smaller number.
  * **paging_from** (*PagingFrom* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Defines where you want to start receiving items from, 'start' or 'end' of the timeseries.
  * **start_time** (*datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Start time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **end_time** (*datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- End time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **start_inclusive** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if start timestamp must be included in the timeseries if present. True by default.
  * **end_inclusive** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if end timestamp must be included in the timeseries if present. True by default.
  * **timezone** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- timezone of the start/end times in db format for example: "America/Chicago". Default value is "UTC". For more details check out API documentation page.
  * **limit_per_index** ([*int*](https://docs.python.org/3/library/functions.html#int)) -- How many entries *per index* the result should contain.
  * **format** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Format of the response. Supported values are json, csv. Default is json.
* **Returns:**
  Index Candles timeseries.
* **Return type:**
  [DataCollection](../data-collection.md#coinmetrics._data_collection.DataCollection)

#### CoinMetricsClient.get_index_constituents(indexes, frequency=None, page_size=None, paging_from='start', start_time=None, end_time=None, start_inclusive=None, end_inclusive=None, timezone=None, format=None)

Returns index constituents for specified indexes and date range.

* **Parameters:**
  * **indexes** ([*list*](https://docs.python.org/3/library/stdtypes.html#list) *(*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *)* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- list of index names, e.g. 'CMBI10'
  * **frequency** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- frequency of the returned timeseries, e.g 15s, 1d, etc.
  * **page_size** ([*int*](https://docs.python.org/3/library/functions.html#int)) -- number of items returned per page when calling the API. If the request times out, try using a smaller number.
  * **paging_from** (*PagingFrom* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Defines where you want to start receiving items from, 'start' or 'end' of the timeseries.
  * **start_time** (*datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Start time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **end_time** (*datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- End time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **start_inclusive** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if start timestamp must be included in the timeseries if present. True by default.
  * **end_inclusive** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if end timestamp must be included in the timeseries if present. True by default.
  * **timezone** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- timezone of the start/end times in db format for example: "America/Chicago". Default value is "UTC". For more details check out API documentation page.
  * **format** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Format of the response. Supported values are json, csv. Default is json.
* **Returns:**
  Index Constituents timeseries.
* **Return type:**
  [DataCollection](../data-collection.md#coinmetrics._data_collection.DataCollection)

#### CoinMetricsClient.get_index_levels(indexes, frequency=None, granularity=None, start_time=None, end_time=None, start_inclusive=None, end_inclusive=None, timezone=None, page_size=None, paging_from='start', limit_per_index=None, include_verification=None, format='json_stream')

Returns index levels for specified indexes and date range.

* **Parameters:**
  * **indexes** ([*list*](https://docs.python.org/3/library/stdtypes.html#list) *(*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *)* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- list of index names, e.g. 'CMBI10'
  * **frequency** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- frequency of the returned timeseries, e.g 15s, 1d, etc.
  * **granularity** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Default: "1s" granularity of the returned timeseries, e.g 1s, 1m, etc.
  * **start_time** (*datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Start time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **end_time** (*datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- End time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **start_inclusive** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if start timestamp must be included in the timeseries if present. True by default.
  * **end_inclusive** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if end timestamp must be included in the timeseries if present. True by default.
  * **timezone** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- timezone of the start/end times in db format for example: "America/Chicago". Default value is "UTC". For more details check out API documentation page.
  * **page_size** ([*int*](https://docs.python.org/3/library/functions.html#int)) -- number of items returned per page when calling the API. If the request times out, try using a smaller number.
  * **paging_from** (*PagingFrom* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Defines where you want to start receiving items from, 'start' or 'end' of the timeseries.
  * **limit_per_index** ([*int*](https://docs.python.org/3/library/functions.html#int)) -- How many entries *per index* the result should contain.
  * **include_verification** ([*bool*](https://docs.python.org/3/library/functions.html#bool) *|* *None*) -- Default: False set to true, includes information about verification.
  * **format** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'.
* **Type:**
  [bool](https://docs.python.org/3/library/functions.html#bool)
* **Returns:**
  Index Levels timeseries.
* **Return type:**
  [DataCollection](../data-collection.md#coinmetrics._data_collection.DataCollection)

#### CoinMetricsClient.get_institution_metrics(institutions, metrics, frequency=None, page_size=None, paging_from='start', start_time=None, end_time=None, start_height=None, end_height=None, start_inclusive=None, end_inclusive=None, timezone=None, sort=None, limit_per_institution=None, format=None)

Returns metrics for specified institutions.

* **Parameters:**
  * **institutions** ([*list*](https://docs.python.org/3/library/stdtypes.html#list) *(*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *)* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- A single institution name or a list of institutions to return info for.
  * **metrics** ([*list*](https://docs.python.org/3/library/stdtypes.html#list) *(*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *)* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- list of *institution-specific* metric names, e.g. 'gbtc_total_assets'
  * **frequency** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- frequency of the returned timeseries, e.g 15s, 1d, etc.
  * **page_size** ([*int*](https://docs.python.org/3/library/functions.html#int)) -- number of items returned per page when calling the API. If the request times out, try using a smaller number.
  * **paging_from** (*PagingFrom* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Defines where you want to start receiving items from, 'start' or 'end' of the timeseries.
  * **start_time** (*datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Start time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **end_time** (*datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- End time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **start_height** ([*int*](https://docs.python.org/3/library/functions.html#int)) -- Start block of the timeseries (only applicable when querying with frequency 1b).
  * **end_height** ([*int*](https://docs.python.org/3/library/functions.html#int)) -- End block of the timeseries (only applicable when querying with frequency 1b).
  * **start_inclusive** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if start timestamp must be included in the timeseries if present. True by default.
  * **end_inclusive** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if end timestamp must be included in the timeseries if present. True by default.
  * **timezone** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- timezone of the start/end times in db format for example: "America/Chicago". Default value is "UTC". For more details check out API documentation page.
  * **sort** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- How results will be sorted, e.g. "institution", or "time". Default is "institution".
  * **limit_per_institution** ([*int*](https://docs.python.org/3/library/functions.html#int)) -- How many entries *per institution* the result should contain.
  * **format** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Format of the response. Supported values are json, csv. Default is json.
* **Returns:**
  Asset Metrics timeseries.
* **Return type:**
  [DataCollection](../data-collection.md#coinmetrics._data_collection.DataCollection)

#### CoinMetricsClient.get_market_candles(markets, frequency=None, page_size=None, paging_from='start', start_time=None, end_time=None, start_inclusive=None, end_inclusive=None, timezone=None, limit_per_market=None, format='json_stream', ignore_unsupported_errors=None, ignore_forbidden_errors=None)

Returns market candles for specified markets, frequency and date range.
For more information on market candles, see: [https://docs.coinmetrics.io/info/markets/candles](https://docs.coinmetrics.io/info/markets/candles)

* **Parameters:**
  * **markets** ([*list*](https://docs.python.org/3/library/stdtypes.html#list) *(*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *)* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- list of market ids. Market ids use the following naming convention: exchangeName-baseAsset-quoteAsset-spot for spot markets, exchangeName-futuresSymbol-future for futures markets, and exchangeName-optionsSymbol-option for options markets. e.g., 'coinbase-btc-usd-spot', 'bitmex-XBTUSD-future'
  * **frequency** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- frequency of the returned timeseries, e.g 15s, 1d, etc.
  * **page_size** ([*int*](https://docs.python.org/3/library/functions.html#int)) -- number of items returned per page when calling the API. If the request times out, try using a smaller number.
  * **paging_from** (*PagingFrom* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Defines where you want to start receiving items from, 'start' or 'end' of the timeseries.
  * **start_time** (*datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Start time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **end_time** (*datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- End time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **start_inclusive** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if start timestamp must be included in the timeseries if present. True by default.
  * **end_inclusive** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if end timestamp must be included in the timeseries if present. True by default.
  * **timezone** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- timezone of the start/end times in db format for example: "America/Chicago". Default value is "UTC". For more details check out API documentation page.
  * **limit_per_market** ([*int*](https://docs.python.org/3/library/functions.html#int)) -- How many entries *per market* the result should contain.
  * **format** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'.
  * **ignore_unsupported_errors** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Whether to ignore 401 Unauthorized errors. Default is False.
  * **ignore_forbidden_errors** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Whether to ignore 403 Forbidden errors. Default is False.
* **Returns:**
  Market Candles timeseries.
* **Return type:**
  [DataCollection](../data-collection.md#coinmetrics._data_collection.DataCollection)

#### CoinMetricsClient.get_market_contract_prices(markets, page_size=None, paging_from='start', start_time=None, end_time=None, start_inclusive=None, end_inclusive=None, granularity=None, timezone=None, limit_per_market=None, frequency=None, format='json_stream')

Returns contract prices for specified markets. This includes index price and mark price that are used by the exchange for settlement and risk management purposes.

* **Parameters:**
  * **markets** ([*list*](https://docs.python.org/3/library/stdtypes.html#list) *(*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *)* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- list of market ids. Market ids use the following naming convention: exchangeName-baseAsset-quoteAsset-spot for spot markets, exchangeName-futuresSymbol-future for futures markets, and exchangeName-optionsSymbol-option for options markets. e.g., 'coinbase-btc-usd-spot', 'bitmex-XBTUSD-future', 'deribit-ETH-25MAR22-1200-P-option'
  * **page_size** ([*int*](https://docs.python.org/3/library/functions.html#int)) -- number of items returned per page when calling the API. If the request times out, try using a smaller number.
  * **paging_from** (*PagingFrom* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Defines where you want to start receiving items from, 'start' or 'end' of the timeseries.
  * **start_time** (*datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Start time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **end_time** (*datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- End time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **start_inclusive** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if start timestamp must be included in the timeseries if present. True by default.
  * **end_inclusive** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if end timestamp must be included in the timeseries if present. True by default.
  * **granularity** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Downsampling granularity of market contract prices. Supported values are raw, 1m, 1h, and 1d.
  * **timezone** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- timezone of the start/end times in db format for example: "America/Chicago". Default value is "UTC". For more details check out API documentation page.
  * **limit_per_market** ([*int*](https://docs.python.org/3/library/functions.html#int)) -- How many entries *per market* the result should contain.
  * **format** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Format of the response. Supported values are json, json_stream, csv. Default is json.
  * **frequency** ([*str*](https://docs.python.org/3/library/stdtypes.html#str) *|* *None*)
* **Returns:**
  Market Contract Prices timeseries.
* **Return type:**
  [DataCollection](../data-collection.md#coinmetrics._data_collection.DataCollection)

#### CoinMetricsClient.get_market_funding_rates(markets, page_size=None, paging_from='start', start_time=None, end_time=None, start_inclusive=None, end_inclusive=None, timezone=None, limit_per_market=None, format='json_stream')

Returns market funding rates for specified markets and date range.
For more information on funding rates, see: [https://docs.coinmetrics.io/info/markets/fundingrates](https://docs.coinmetrics.io/info/markets/fundingrates)

* **Parameters:**
  * **markets** ([*list*](https://docs.python.org/3/library/stdtypes.html#list) *(*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *)* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- list of market ids. Market ids use the following naming convention: exchangeName-baseAsset-quoteAsset-spot for spot markets, exchangeName-futuresSymbol-future for futures markets, and exchangeName-optionsSymbol-option for options markets. e.g., 'coinbase-btc-usd-spot', 'bitmex-XBTUSD-future'
  * **page_size** ([*int*](https://docs.python.org/3/library/functions.html#int)) -- number of items returned per page when calling the API. If the request times out, try using a smaller number.
  * **paging_from** (*PagingFrom* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Defines where you want to start receiving items from, 'start' or 'end' of the timeseries.
  * **start_time** (*datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Start time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **end_time** (*datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- End time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **start_inclusive** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if start timestamp must be included in the timeseries if present. True by default.
  * **end_inclusive** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if end timestamp must be included in the timeseries if present. True by default.
  * **timezone** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- timezone of the start/end times in db format for example: "America/Chicago". Default value is "UTC". For more details check out API documentation page.
  * **limit_per_market** ([*int*](https://docs.python.org/3/library/functions.html#int)) -- How many entries *per market* the result should contain.
  * **format** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Format of the response. Supported values are json, json_stream, csv. Default is json.
* **Returns:**
  Market Funding Rates timeseries.
* **Return type:**
  [DataCollection](../data-collection.md#coinmetrics._data_collection.DataCollection)

#### CoinMetricsClient.get_market_greeks(markets, page_size=None, paging_from='start', start_time=None, end_time=None, start_inclusive=None, end_inclusive=None, granularity=None, timezone=None, limit_per_market=None, format='json_stream')

Returns greeks for option markets.

* **Parameters:**
  * **markets** ([*list*](https://docs.python.org/3/library/stdtypes.html#list) *(*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *)* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- list of market ids. Market ids use the following naming convention: exchangeName-baseAsset-quoteAsset-spot for spot markets, exchangeName-futuresSymbol-future for futures markets, and exchangeName-optionsSymbol-option for options markets. e.g., 'coinbase-btc-usd-spot', 'bitmex-XBTUSD-future', 'deribit-ETH-25MAR22-1200-P-option'
  * **page_size** ([*int*](https://docs.python.org/3/library/functions.html#int)) -- number of items returned per page when calling the API. If the request times out, try using a smaller number.
  * **paging_from** (*PagingFrom* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Defines where you want to start receiving items from, 'start' or 'end' of the timeseries.
  * **start_time** (*datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Start time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **end_time** (*datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- End time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **start_inclusive** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if start timestamp must be included in the timeseries if present. True by default.
  * **end_inclusive** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if end timestamp must be included in the timeseries if present. True by default.
  * **granularity** (*str - one* *of* *raw* *,* *1m* *,* *1h* *,* *and 1d*) -- Downsampling granularity of market greeks. Supported values are raw, 1m, 1h, and 1d
  * **timezone** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- timezone of the start/end times in db format for example: "America/Chicago". Default value is "UTC". For more details check out API documentation page.
  * **limit_per_market** ([*int*](https://docs.python.org/3/library/functions.html#int)) -- How many entries *per market* the result should contain.
  * **format** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Format of the response. Supported values are json, json_stream, csv. Default is json.
* **Returns:**
  Market Greeks timeseries.
* **Return type:**
  [DataCollection](../data-collection.md#coinmetrics._data_collection.DataCollection)

#### CoinMetricsClient.get_market_implied_volatility(markets, page_size=None, paging_from='start', start_time=None, end_time=None, start_inclusive=None, end_inclusive=None, granularity=None, timezone=None, limit_per_market=None, format='json_stream')

Returns implied volatility for specified markets.

* **Parameters:**
  * **markets** ([*list*](https://docs.python.org/3/library/stdtypes.html#list) *(*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *)* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- list of market ids. Market ids use the following naming convention: exchangeName-baseAsset-quoteAsset-spot for spot markets, exchangeName-futuresSymbol-future for futures markets, and exchangeName-optionsSymbol-option for options markets. e.g., 'coinbase-btc-usd-spot', 'bitmex-XBTUSD-future', 'deribit-ETH-25MAR22-1200-P-option'
  * **page_size** ([*int*](https://docs.python.org/3/library/functions.html#int)) -- number of items returned per page when calling the API. If the request times out, try using a smaller number.
  * **paging_from** (*PagingFrom* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Defines where you want to start receiving items from, 'start' or 'end' of the timeseries.
  * **start_time** (*datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Start time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **end_time** (*datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- End time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **start_inclusive** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if start timestamp must be included in the timeseries if present. True by default.
  * **end_inclusive** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if end timestamp must be included in the timeseries if present. True by default.
  * **granularity** (*str - one* *of* *raw* *,* *1m* *,* *1h* *,* *and 1d*) -- Downsampling granularity of market implied volatility. Supported values are raw, 1m, 1h, and 1d.
  * **timezone** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- timezone of the start/end times in db format for example: "America/Chicago". Default value is "UTC". For more details check out API documentation page.
  * **limit_per_market** ([*int*](https://docs.python.org/3/library/functions.html#int)) -- How many entries *per market* the result should contain.
  * **format** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Format of the response. Supported values are json, json_stream, csv. Default is json.
* **Returns:**
  Market Volatility timeseries.
* **Return type:**
  [DataCollection](../data-collection.md#coinmetrics._data_collection.DataCollection)

#### CoinMetricsClient.get_market_liquidations(markets, page_size=None, paging_from='start', start_time=None, end_time=None, start_inclusive=None, end_inclusive=None, timezone=None, limit_per_market=None, format='json_stream')

Returns market liquidations for specified markets and date range.
For more information on liquidations, see: [https://docs.coinmetrics.io/info/markets/liquidations](https://docs.coinmetrics.io/info/markets/liquidations)

* **Parameters:**
  * **markets** ([*list*](https://docs.python.org/3/library/stdtypes.html#list) *(*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *)* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- list of market ids. Market ids use the following naming convention: exchangeName-baseAsset-quoteAsset-spot for spot markets, exchangeName-futuresSymbol-future for futures markets, and exchangeName-optionsSymbol-option for options markets. e.g., 'coinbase-btc-usd-spot', 'bitmex-XBTUSD-future'
  * **page_size** ([*int*](https://docs.python.org/3/library/functions.html#int)) -- number of items returned per page when calling the API. If the request times out, try using a smaller number.
  * **paging_from** (*PagingFrom* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Defines where you want to start receiving items from, 'start' or 'end' of the timeseries.
  * **start_time** (*datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Start time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **end_time** (*datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- End time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **start_inclusive** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if start timestamp must be included in the timeseries if present. True by default.
  * **end_inclusive** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if end timestamp must be included in the timeseries if present. True by default.
  * **timezone** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- timezone of the start/end times in db format for example: "America/Chicago". Default value is "UTC". For more details check out API documentation page.
  * **limit_per_market** ([*int*](https://docs.python.org/3/library/functions.html#int)) -- How many entries *per market* the result should contain.
  * **format** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Format of the response. Supported values are json, json_stream, csv. Default is json.
* **Returns:**
  Market Liquidations timeseries.
* **Return type:**
  [DataCollection](../data-collection.md#coinmetrics._data_collection.DataCollection)

#### CoinMetricsClient.get_market_metrics(markets, metrics, frequency=None, page_size=None, paging_from='start', start_time=None, end_time=None, start_inclusive=None, end_inclusive=None, timezone=None, limit_per_market=None, sort=None, ignore_forbidden_errors=None, ignore_unsupported_errors=None, format='json_stream')

Returns market metrics for specified markets, frequency and date range.
For more information on market metrics, see: [https://docs.coinmetrics.io/api/v4#operation/getTimeseriesMarketMetrics](https://docs.coinmetrics.io/api/v4#operation/getTimeseriesMarketMetrics)

* **Parameters:**
  * **markets** ([*list*](https://docs.python.org/3/library/stdtypes.html#list) *(*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *)* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- list of market ids. Market ids use the following naming convention: exchangeName-baseAsset-quoteAsset-spot for spot markets, exchangeName-futuresSymbol-future for futures markets, and exchangeName-optionsSymbol-option for options markets. e.g., 'coinbase-btc-usd-spot', 'bitmex-XBTUSD-future'
  * **metrics** ([*list*](https://docs.python.org/3/library/stdtypes.html#list) *(*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *)* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- list of metrics, i.e. 'liquidations_reported_future_buy_units_1d'. See market metrics catalog for a list of supported metrics: [https://docs.coinmetrics.io/api/v4#operation/getCatalogMarketMetrics](https://docs.coinmetrics.io/api/v4#operation/getCatalogMarketMetrics)
  * **frequency** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- frequency of the returned timeseries, e.g 15s, 1d, etc.
  * **page_size** ([*int*](https://docs.python.org/3/library/functions.html#int)) -- number of items returned per page when calling the API. If the request times out, try using a smaller number.
  * **paging_from** (*PagingFrom* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Defines where you want to start receiving items from, 'start' or 'end' of the timeseries.
  * **start_time** (*datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Start time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **end_time** (*datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- End time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **start_inclusive** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if start timestamp must be included in the timeseries if present. True by default.
  * **end_inclusive** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if end timestamp must be included in the timeseries if present. True by default.
  * **timezone** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- timezone of the start/end times in db format for example: "America/Chicago". Default value is "UTC". For more details check out API documentation page.
  * **limit_per_market** ([*int*](https://docs.python.org/3/library/functions.html#int)) -- How many entries *per market* the result should contain.
  * **sort** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- How results will be sorted. Metrics are sorted by (market, time) by default. If you want to sort
    1d metrics by (time, market) you should choose time as value for the sort parameter. Sorting by time is useful
    if you request metrics for a set of markets.
  * **ignore_forbidden_errors** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Default: false. Ignore HTTP 403 Forbidden errors
  * **ignore_unsupported_errors** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Default: false. Ignore errors for unsupported assets, metrics or frequencies.
  * **format** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'.
* **Returns:**
  Market metrics timeseries.
* **Return type:**
  [DataCollection](../data-collection.md#coinmetrics._data_collection.DataCollection)

#### CoinMetricsClient.get_market_open_interest(markets, page_size=None, paging_from='start', start_time=None, end_time=None, start_inclusive=None, end_inclusive=None, granularity=None, timezone=None, limit_per_market=None, format='json_stream')

Returns market open interest for specified markets and date range.
For more information on open interest, see: [https://docs.coinmetrics.io/info/markets/openinterest](https://docs.coinmetrics.io/info/markets/openinterest)

* **Parameters:**
  * **markets** ([*list*](https://docs.python.org/3/library/stdtypes.html#list) *(*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *)* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- list of market ids. Market ids use the following naming convention: exchangeName-baseAsset-quoteAsset-spot for spot markets, exchangeName-futuresSymbol-future for futures markets, and exchangeName-optionsSymbol-option for options markets. e.g., 'coinbase-btc-usd-spot', 'bitmex-XBTUSD-future'
  * **page_size** ([*int*](https://docs.python.org/3/library/functions.html#int)) -- number of items returned per page when calling the API. If the request times out, try using a smaller number.
  * **paging_from** (*PagingFrom* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Defines where you want to start receiving items from, 'start' or 'end' of the timeseries.
  * **start_time** (*datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Start time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **end_time** (*datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- End time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **start_inclusive** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if start timestamp must be included in the timeseries if present. True by default.
  * **end_inclusive** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if end timestamp must be included in the timeseries if present. True by default.
  * **granularity** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Downsampling granularity of market open interest. Supported values are raw, 1m, 1h, and 1d.
  * **timezone** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- timezone of the start/end times in db format for example: "America/Chicago". Default value is "UTC". For more details check out API documentation page.
  * **limit_per_market** ([*int*](https://docs.python.org/3/library/functions.html#int)) -- How many entries *per market* the result should contain.
  * **format** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'.
* **Returns:**
  Market Open Interest timeseries.
* **Return type:**
  [DataCollection](../data-collection.md#coinmetrics._data_collection.DataCollection)

#### CoinMetricsClient.get_market_orderbooks(markets, granularity=None, page_size=None, paging_from='start', start_time=None, end_time=None, start_inclusive=None, end_inclusive=None, depth_limit='100', timezone=None, limit_per_market=None, format='json_stream')

Returns market order books for specified markets and date range.
For more information on order books, see: [https://docs.coinmetrics.io/info/markets/orderbook](https://docs.coinmetrics.io/info/markets/orderbook)

* **Parameters:**
  * **markets** ([*list*](https://docs.python.org/3/library/stdtypes.html#list) *(*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *)* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- list of market ids. Market ids use the following naming convention: exchangeName-baseAsset-quoteAsset-spot for spot markets, exchangeName-futuresSymbol-future for futures markets, and exchangeName-optionsSymbol-option for options markets. e.g., 'coinbase-btc-usd-spot', 'bitmex-XBTUSD-future'
  * **granularity** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Downsampling granularity of market order books and quotes. Supported values are raw, 1m, 1h, and 1d.
  * **page_size** ([*int*](https://docs.python.org/3/library/functions.html#int)) -- number of items returned per page when calling the API. If the request times out, try using a smaller number.
  * **paging_from** (*PagingFrom* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Defines where you want to start receiving items from, 'start' or 'end' of the timeseries.
  * **start_time** (*datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Start time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **end_time** (*datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- End time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **start_inclusive** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if start timestamp must be included in the timeseries if present. True by default.
  * **end_inclusive** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if end timestamp must be included in the timeseries if present. True by default.
  * **depth_limit** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- book depth limit, 100 levels max or full book that is not limited and provided as is from the exchange. Full book snapshots are collected once per hour
  * **timezone** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- timezone of the start/end times in db format for example: "America/Chicago". Default value is "UTC". For more details check out API documentation page.
  * **limit_per_market** ([*int*](https://docs.python.org/3/library/functions.html#int)) -- How many entries *per market* the result should contain.
  * **format** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'.
* **Returns:**
  Market Order Books timeseries.
* **Return type:**
  [DataCollection](../data-collection.md#coinmetrics._data_collection.DataCollection)

#### CoinMetricsClient.get_market_quotes(markets, granularity=None, page_size=None, paging_from='start', start_time=None, end_time=None, start_inclusive=None, end_inclusive=None, timezone=None, limit_per_market=None, include_one_sided=None, format='json_stream')

Returns market quotes for specified markets and date range.
For more information on quotes, see: [https://docs.coinmetrics.io/info/markets/quotes](https://docs.coinmetrics.io/info/markets/quotes)

* **Parameters:**
  * **markets** ([*list*](https://docs.python.org/3/library/stdtypes.html#list) *(*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *)* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- list of market ids. Market ids use the following naming convention: exchangeName-baseAsset-quoteAsset-spot for spot markets, exchangeName-futuresSymbol-future for futures markets, and exchangeName-optionsSymbol-option for options markets. e.g., 'coinbase-btc-usd-spot', 'bitmex-XBTUSD-future'
  * **granularity** -- Downsampling granularity of market order books and quotes. Supported values are raw, 1m, 1h, and 1d.
  * **page_size** ([*int*](https://docs.python.org/3/library/functions.html#int)) -- number of items returned per page when calling the API. If the request times out, try using a smaller number.
  * **paging_from** (*PagingFrom* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Defines where you want to start receiving items from, 'start' or 'end' of the timeseries.
  * **start_time** (*datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Start time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **end_time** (*datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- End time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **start_inclusive** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if start timestamp must be included in the timeseries if present. True by default.
  * **end_inclusive** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if end timestamp must be included in the timeseries if present. True by default.
  * **timezone** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- timezone of the start/end times in db format for example: "America/Chicago". Default value is "UTC". For more details check out API documentation page.
  * **limit_per_market** ([*int*](https://docs.python.org/3/library/functions.html#int)) -- How many entries *per market* the result should contain.
  * **include_one_sided** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Default: false Include one-side and empty books in quotes response.
  * **format** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Format of the response. Supported values are json, json_stream, csv. Default is json_stream. Setting format='json_stream' is generally more performant. page_size and paging_from is ignored when format='json_stream'.
* **Returns:**
  Market Quotes timeseries.
* **Return type:**
  [DataCollection](../data-collection.md#coinmetrics._data_collection.DataCollection)

#### CoinMetricsClient.get_market_trades(markets, page_size=None, paging_from='start', start_time=None, end_time=None, start_inclusive=None, end_inclusive=None, timezone=None, limit_per_market=None, min_confirmations=None, format='json_stream')

Returns market trades for specified markets and date range.
For more information on market trades, see: [https://docs.coinmetrics.io/info/markets/trades](https://docs.coinmetrics.io/info/markets/trades)

* **Parameters:**
  * **markets** ([*list*](https://docs.python.org/3/library/stdtypes.html#list) *(*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *)* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- list of market ids. Market ids use the following naming convention: exchangeName-baseAsset-quoteAsset-spot for spot markets, exchangeName-futuresSymbol-future for futures markets, and exchangeName-optionsSymbol-option for options markets. e.g., 'coinbase-btc-usd-spot', 'bitmex-XBTUSD-future'
  * **page_size** ([*int*](https://docs.python.org/3/library/functions.html#int)) -- number of items returned per page when calling the API. If the request times out, try using a smaller number.
  * **paging_from** (*PagingFrom* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Defines where you want to start receiving items from, 'start' or 'end' of the timeseries.
  * **start_time** (*datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Start time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **end_time** (*datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- End time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **start_inclusive** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if start timestamp must be included in the timeseries if present. True by default.
  * **end_inclusive** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if end timestamp must be included in the timeseries if present. True by default.
  * **timezone** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- timezone of the start/end times in db format for example: "America/Chicago". Default value is "UTC". For more details check out API documentation page.
  * **limit_per_market** ([*int*](https://docs.python.org/3/library/functions.html#int)) -- How many entries *per market* the result should contain.
  * **min_confirmations** ([*int*](https://docs.python.org/3/library/functions.html#int)) -- Specifies how many blocks behind the chain tip trades are based on. Default is 2.
  * **format** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Default: "json_stream". Format of the response. Supported values are json, json_stream.
* **Returns:**
  Market Trades timeseries.
* **Return type:**
  [DataCollection](../data-collection.md#coinmetrics._data_collection.DataCollection)

#### CoinMetricsClient.get_mempool_feerates(assets, page_size=200, paging_from='start', start_time=None, end_time=None, start_inclusive=None, end_inclusive=None, timezone=None, format=None)

Returns mempool feerates for the specified assets. Note: for this method, page_size must be <= 200.

* **Parameters:**
  * **assets** ([*list*](https://docs.python.org/3/library/stdtypes.html#list) *(*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *)* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- list of asset names, e.g. 'btc'
  * **page_size** ([*int*](https://docs.python.org/3/library/functions.html#int)) -- number of items returned per page when calling the API. If the request times out, try using a smaller number.
  * **paging_from** (*PagingFrom* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Defines where you want to start receiving items from, 'start' or 'end' of the timeseries.
  * **start_time** (*datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Start time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **end_time** (*datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- End time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **start_inclusive** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if start timestamp must be included in the timeseries if present. True by default.
  * **end_inclusive** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if end timestamp must be included in the timeseries if present. True by default.
  * **timezone** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- timezone of the start/end times in db format for example: "America/Chicago". Default value is "UTC". For more details check out API documentation page.
  * **format** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Format of the response. Supported values are json, csv. Default is json.
* **Returns:**
  Mempool Fee Rates timeseries.
* **Return type:**
  [DataCollection](../data-collection.md#coinmetrics._data_collection.DataCollection)

#### CoinMetricsClient.get_mining_pool_tips_summary(assets, page_size=None, paging_from='start', start_time=None, end_time=None, start_inclusive=None, end_inclusive=None, timezone=None, format=None)

Returns mining pool tips summaries for specified assets.

* **Parameters:**
  * **assets** ([*list*](https://docs.python.org/3/library/stdtypes.html#list) *(*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *)* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- list of asset names, e.g. 'btc'
  * **page_size** ([*int*](https://docs.python.org/3/library/functions.html#int)) -- number of items returned per page when calling the API. If the request times out, try using a smaller number.
  * **paging_from** (*PagingFrom* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Defines where you want to start receiving items from, 'start' or 'end' of the timeseries.
  * **start_time** (*datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Start time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **end_time** (*datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- End time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **start_inclusive** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if start timestamp must be included in the timeseries if present. True by default.
  * **end_inclusive** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if end timestamp must be included in the timeseries if present. True by default.
  * **timezone** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- timezone of the start/end times in db format for example: "America/Chicago". Default value is "UTC". For more details check out API documentation page.
  * **format** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Format of the response. Supported values are json, csv. Default is json.
* **Returns:**
  Mining Pool Tips timeseries.
* **Return type:**
  [DataCollection](../data-collection.md#coinmetrics._data_collection.DataCollection)

#### CoinMetricsClient.get_pair_candles(pairs, frequency=None, page_size=None, paging_from='start', start_time=None, end_time=None, start_height=None, end_height=None, start_inclusive=None, end_inclusive=None, timezone=None, limit_per_pair=None, format='json_stream')

Returns candles for specified asset pairs.
Results are ordered by tuple (pair, time).

* **Parameters:**
  * **pairs** ([*list*](https://docs.python.org/3/library/stdtypes.html#list) *(*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *)* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- A single asset-asset pairs (e.g. "btc-usd") or a list of asset-asset-pairs to return info for.
  * **frequency** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- frequency of the returned timeseries, e.g 15s, 1d, etc.
  * **page_size** ([*int*](https://docs.python.org/3/library/functions.html#int)) -- number of items returned per page when calling the API. If the request times out, try using a smaller number.
  * **paging_from** (*PagingFrom* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Defines where you want to start receiving items from, 'start' or 'end' of the timeseries.
  * **start_time** (*datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Start time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **end_time** (*datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- End time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **start_height** ([*int*](https://docs.python.org/3/library/functions.html#int)) -- Start block of the timeseries (only applicable when querying with frequency 1b).
  * **end_height** ([*int*](https://docs.python.org/3/library/functions.html#int)) -- End block of the timeseries (only applicable when querying with frequency 1b).
  * **start_inclusive** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if start timestamp must be included in the timeseries if present. True by default.
  * **end_inclusive** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if end timestamp must be included in the timeseries if present. True by default.
  * **timezone** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- timezone of the start/end times in db format for example: "America/Chicago". Default value is "UTC". For more details check out API documentation page.
  * **limit_per_pair** ([*int*](https://docs.python.org/3/library/functions.html#int)) -- How many entries *per asset pair* the result should contain.
  * **format** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Format of the response. Supported values are json, csv. Default is json.
* **Returns:**
  Asset pair candles timeseries.
* **Return type:**
  [DataCollection](../data-collection.md#coinmetrics._data_collection.DataCollection)

#### CoinMetricsClient.get_pair_metrics(pairs, metrics, frequency=None, page_size=None, paging_from='start', start_time=None, end_time=None, start_height=None, end_height=None, start_inclusive=None, end_inclusive=None, timezone=None, sort=None, limit_per_pair=None, format='json')

Returns metrics books for specified asset-asset pairs.

* **Parameters:**
  * **pairs** ([*list*](https://docs.python.org/3/library/stdtypes.html#list) *(*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *)* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- List of asset pairs or patterns like `btc-*`, or `*-btc`.
    Use a corresponding client.catalog_pair_metrics_v2() method for the full list of supported pairs for a given data type.
  * **metrics** ([*list*](https://docs.python.org/3/library/stdtypes.html#list) *(*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *)* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Example: metrics=volume_trusted_spot_usd_1h,volume_trusted_spot_usd_1d
    Comma separated metrics to request time series data for.
    Information on all available metrics can be found on page [https://coverage.coinmetrics.io/pair-metrics-v2](https://coverage.coinmetrics.io/pair-metrics-v2).
    Use the client.catalog_full_pair_metrics_v2() method for the full list of supported metrics per pair.
  * **frequency** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- frequency of the returned timeseries, e.g 15s, 1d, etc.
  * **page_size** ([*int*](https://docs.python.org/3/library/functions.html#int)) -- number of items returned per page when calling the API. If the request times out, try using a smaller number.
  * **paging_from** (*PagingFrom* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Defines where you want to start receiving items from, 'start' or 'end' of the timeseries.
  * **start_time** (*datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Start time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **end_time** (*datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- End time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **start_height** ([*int*](https://docs.python.org/3/library/functions.html#int)) -- Start block of the timeseries (only applicable when querying with frequency 1b).
  * **end_height** ([*int*](https://docs.python.org/3/library/functions.html#int)) -- End block of the timeseries (only applicable when querying with frequency 1b).
  * **start_inclusive** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if start timestamp must be included in the timeseries if present. True by default.
  * **end_inclusive** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if end timestamp must be included in the timeseries if present. True by default.
  * **timezone** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- timezone of the start/end times in db format for example: "America/Chicago". Default value is "UTC". For more details check out API documentation page.
  * **sort** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- How results will be sorted, e.g."pair", "time". "pair" by default
  * **limit_per_pair** ([*int*](https://docs.python.org/3/library/functions.html#int)) -- How many entries *per asset pair* the result should contain.
  * **format** ([*str*](https://docs.python.org/3/library/stdtypes.html#str) *|* *None*)
* **Returns:**
  Pair Metrics timeseries.
* **Return type:**
  [DataCollection](../data-collection.md#coinmetrics._data_collection.DataCollection)

#### CoinMetricsClient.get_predicted_market_funding_rates(markets, start_time=None, end_time=None, start_inclusive=None, end_inclusive=None, timezone=None, page_size=None, paging_from='start', limit_per_market=None, format='json_stream')

Returns predicted funding rates for specified futures markets. Results are ordered by tuple (market, time).
For more information on funding rates, see: [https://docs.coinmetrics.io/info/markets/fundingrates](https://docs.coinmetrics.io/info/markets/fundingrates)

* **Parameters:**
  * **markets** ([*list*](https://docs.python.org/3/library/stdtypes.html#list) *(*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *)* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- list of market ids. Market ids use the following naming convention: exchangeName-baseAsset-quoteAsset-spot for spot markets, exchangeName-futuresSymbol-future for futures markets, and exchangeName-optionsSymbol-option for options markets. e.g., 'coinbase-btc-usd-spot', 'bitmex-XBTUSD-future'
  * **page_size** ([*int*](https://docs.python.org/3/library/functions.html#int)) -- number of items returned per page when calling the API. If the request times out, try using a smaller number.
  * **paging_from** (*PagingFrom* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Defines where you want to start receiving items from, 'start' or 'end' of the timeseries.
  * **start_time** (*datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Start time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **end_time** (*datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- End time of the timeseries (string or datetime). Datetime object may be timezone naive or aware. Multiple formats of ISO 8601 are supported: 2006-01-20T00:00:00Z, 2006-01-20T00:00:00.000Z, 2006-01-20T00:00:00.123456Z, 2006-01-20T00:00:00.123456789, 2006-01-20, 20060120
  * **start_inclusive** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if start timestamp must be included in the timeseries if present. True by default.
  * **end_inclusive** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if end timestamp must be included in the timeseries if present. True by default.
  * **timezone** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- timezone of the start/end times in db format for example: "America/Chicago". Default value is "UTC". For more details check out API documentation page.
  * **limit_per_market** ([*int*](https://docs.python.org/3/library/functions.html#int)) -- How many entries *per market* the result should contain.
  * **format** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Format of the response. Supported values are json, json_stream, csv. Default is json.
* **Returns:**
  Market Funding Rates timeseries.
* **Return type:**
  [DataCollection](../data-collection.md#coinmetrics._data_collection.DataCollection)

#### CoinMetricsClient.get_stream_asset_metrics(assets, metrics, frequency=None, backfill=Backfill.LATEST, ignore_forbidden_errors=None, ignore_unsupported_errors=None)

Returns timeseries stream of metrics for specified assets.

* **Parameters:**
  * **assets** ([*list*](https://docs.python.org/3/library/stdtypes.html#list) *(*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *)* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- list of asset names, e.g. 'btc'
  * **metrics** ([*list*](https://docs.python.org/3/library/stdtypes.html#list) *(*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *)* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- list of *asset-specific* metric names, e.g. 'PriceUSD'
  * **frequency** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- frequency of the returned timeseries, e.g 15s, 1d, etc.
  * **backfill** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- What data should be sent upon a connection ("latest" or "none"). By default the latest values are sent just before real-time data.
  * **ignore_forbidden_errors** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Default: false. Ignore HTTP 403 Forbidden errors
  * **ignore_unsupported_errors** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Default: false. Ignore errors for unsupported assets, metrics or frequencies.
* **Returns:**
  Asset Metrics timeseries stream.
* **Return type:**
  [CmStream](../cm-stream.md#coinmetrics.api_client.CmStream)

#### CoinMetricsClient.get_stream_asset_quotes(assets, aggregation_method=None, backfill=None)

Returns a websocket stream of asset quotes for the requested assets.

* **Parameters:**
  * **assets** (*Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]*) -- Comma separated list of assets. Use the /catalog-all/assets endpoint for the full list of supported assets.
  * **aggregation_method** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- The method to use for aggregation.
  * **backfill** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- What data should be sent upon a connection. By default the latest values are sent just before real-time data.
* **Returns:**
* **Return type:**
  [CmStream](../cm-stream.md#coinmetrics.api_client.CmStream)

#### CoinMetricsClient.get_stream_index_levels(indexes, include_verification=None, backfill=Backfill.LATEST)

Returns timeseries stream of index levels.

* **Parameters:**
  * **indexes** ([*list*](https://docs.python.org/3/library/stdtypes.html#list) *(*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *)* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- list of indxes or market patterns such as CMBIBTC
  * **backfill** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- What data should be sent upon a connection ("latest" or "none"). By default the latest values are sent just before real-time data.
  * **include_verification** ([*bool*](https://docs.python.org/3/library/functions.html#bool) *|* *None*) -- Default: False If set to true, includes information about verification.
* **Returns:**
  Index levels data timeseries stream.
* **Return type:**
  [CmStream](../cm-stream.md#coinmetrics.api_client.CmStream)

#### CoinMetricsClient.get_stream_market_candles(markets, frequency=None, backfill=Backfill.LATEST)

Returns timeseries stream of market candles.

* **Parameters:**
  * **markets** ([*list*](https://docs.python.org/3/library/stdtypes.html#list) *(*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *)* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- list of markets or market patterns like `exchange-*` or `exchange-*-spot` or `*USDT-future`.
  * **frequency** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Candle duration. Supported values are 1m, 5m, 10m, 15m, 30m, 1h, 4h, 1d.
  * **backfill** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- What data should be sent upon a connection ("latest" or "none"). By default the latest values are sent just before real-time data.
* **Returns:**
  Market Candles timeseries stream.
* **Return type:**
  [CmStream](../cm-stream.md#coinmetrics.api_client.CmStream)

#### CoinMetricsClient.get_stream_market_contract_prices(markets, backfill=None)

Returns timeseries stream of market contract prices.

This includes index price and mark price that are used by the exchange
for settlement and risk management purposes.

* **Parameters:**
  * **markets** (*Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]*) -- Comma separated list of markets or market patterns like exchange-\* or exchange-\*-spot or \*USDT-future. Use the /catalog-all-v2/markets endpoint for the full list of supported markets.
  * **backfill** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- What data should be sent upon a connection. By default the latest values are sent just before real-time data.
* **Returns:**
  Market Contract Prices timeseries stream.
* **Return type:**
  [CmStream](../cm-stream.md#coinmetrics.api_client.CmStream)

#### CoinMetricsClient.get_stream_market_liquidations(markets, backfill=None)

Returns timeseries stream for market liquidations

* **Parameters:**
  * **markets** (*Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]*) -- Comma separated list of markets or market patterns like exchange-\* or exchange-\*-spot or \*USDT-future. Use the /catalog-all/markets endpoint for the full list of supported markets.
  * **backfill** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- What data should be sent upon a connection. By default the latest values are sent just before real-time data.
* **Returns:**
  Market liquidations timeseries stream
* **Return type:**
  [CmStream](../cm-stream.md#coinmetrics.api_client.CmStream)

#### CoinMetricsClient.get_stream_market_open_interest(markets, backfill=None)

Returns a websocket stream of market open interest for the requested markets.

* **Parameters:**
  * **markets** (*Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]*) -- Comma separated list of markets or market patterns like exchange-\* or exchange-\*-spot or \*USDT-future. Use the /catalog-all/markets endpoint for the full list of supported markets.
  * **backfill** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- What data should be sent upon a connection. By default the latest values are sent just before real-time data.
* **Returns:**
* **Return type:**
  [CmStream](../cm-stream.md#coinmetrics.api_client.CmStream)

#### CoinMetricsClient.get_stream_market_orderbooks(markets, backfill=Backfill.LATEST, depth_limit=None)

Returns timeseries stream of market orderbooks.

* **Parameters:**
  * **markets** ([*list*](https://docs.python.org/3/library/stdtypes.html#list) *(*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *)* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- list of markets or market patterns like `exchange-*` or `exchange-*-spot` or `*USDT-future`.
  * **backfill** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- What data should be sent upon a connection ("latest" or "none"). By default the latest values are sent just before real-time data.
  * **depth_limit** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Default: 100. Supported Values: 100 "full_book". Book depth limit.
* **Returns:**
  Market Orderbooks timeseries stream.
* **Return type:**
  [CmStream](../cm-stream.md#coinmetrics.api_client.CmStream)

#### CoinMetricsClient.get_stream_market_quotes(markets, backfill=Backfill.LATEST, include_one_sided=None)

Returns timeseries stream of market quotes.

* **Parameters:**
  * **markets** ([*list*](https://docs.python.org/3/library/stdtypes.html#list) *(*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *)* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- list of markets or market patterns like `exchange-*` or `exchange-*-spot` or `*USDT-future`.
  * **backfill** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- What data should be sent upon a connection ("latest" or "none"). By default the latest values are sent just before real-time data.
  * **include_one_sided** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Default: false. Include one-side and empty books in quotes response.
* **Returns:**
  Market Quotes timeseries stream.
* **Return type:**
  [CmStream](../cm-stream.md#coinmetrics.api_client.CmStream)

#### CoinMetricsClient.get_stream_market_trades(markets, backfill=Backfill.LATEST)

Returns timeseries stream of market trades.

* **Parameters:**
  * **markets** ([*list*](https://docs.python.org/3/library/stdtypes.html#list) *(*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *)* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- list of markets or market patterns like `exchange-*` or `exchange-*-spot` or `*USDT-future`.
  * **backfill** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- What data should be sent upon a connection ("latest" or "none"). By default the latest values are sent just before real-time data.
* **Returns:**
  Market Trades timeseries stream.
* **Return type:**
  [CmStream](../cm-stream.md#coinmetrics.api_client.CmStream)

#### CoinMetricsClient.get_stream_pair_quotes(pairs, aggregation_method=None, backfill=None)

Returns a websocket stream of pair quotes for the requested asset pairs.

* **Parameters:**
  * **pairs** (*Optional* *[**Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]* *]*) -- Comma separated list of asset pairs. Use the /catalog-all/pairs endpoint for the full list of supported asset pairs.
  * **aggregation_method** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- The method to use for aggregation.
  * **backfill** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- What data should be sent upon a connection. By default the latest values are sent just before real-time data.
* **Returns:**
* **Return type:**
  [CmStream](../cm-stream.md#coinmetrics.api_client.CmStream)
