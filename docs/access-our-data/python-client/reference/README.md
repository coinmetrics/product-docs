---
description: 'API reference for the Coin Metrics Python client.'
icon: code
---


# API Reference

This section is generated from the docstrings in [`coinmetrics`](https://github.com/coinmetrics/api-client-python/tree/master/coinmetrics) by `scripts/build_docs.py`. Edit the docstrings, then run `make docs` to regenerate.

## Classes

- [`CoinMetricsClient`](coinmetricsclient.md) &mdash; The CoinMetricsClient class is a Python wrapper for calling the Coin Metrics API.
- [`Backfill`](backfill.md) &mdash; Backfill policy applied when subscribing to a streaming endpoint.
- [`CatalogAssetAlertsData`](catalogassetalertsdata.md) &mdash;
- [`CatalogAssetChainsData`](catalogassetchainsdata.md) &mdash;
- [`CatalogAssetPairCandlesData`](catalogassetpaircandlesdata.md) &mdash; Transforms catalog data in list form into a dataframe
- [`CatalogAssetPairsData`](catalogassetpairsdata.md) &mdash;
- [`CatalogAssetsData`](catalogassetsdata.md) &mdash;
- [`CatalogExchangeAssetMetricsData`](catalogexchangeassetmetricsdata.md) &mdash; Transforms catalog exchange asset data in list form into a dataframe
- [`CatalogExchangeAssetsData`](catalogexchangeassetsdata.md) &mdash;
- [`CatalogExchangesData`](catalogexchangesdata.md) &mdash;
- [`CatalogIndexesData`](catalogindexesdata.md) &mdash; Transforms catalog data in list form into a dataframe
- [`CatalogInstitutionMetricsData`](cataloginstitutionmetricsdata.md) &mdash; Transforms catalog institution asset data in list form into a dataframe
- [`CatalogInstitutionsData`](cataloginstitutionsdata.md) &mdash; Transforms catalog data in list form into a dataframe
- [`CatalogMarketCandlesData`](catalogmarketcandlesdata.md) &mdash; Transforms catalog data in list form into a dataframe
- [`CatalogMarketContractPrices`](catalogmarketcontractprices.md) &mdash;
- [`CatalogMarketImpliedVolatility`](catalogmarketimpliedvolatility.md) &mdash;
- [`CatalogMarketMetricsData`](catalogmarketmetricsdata.md) &mdash; Transforms catalog data in list form into a dataframe
- [`CatalogMarketOrderbooksData`](catalogmarketorderbooksdata.md) &mdash;
- [`CatalogMarketsData`](catalogmarketsdata.md) &mdash; Transforms catalog data in list form into a dataframe
- [`CatalogMarketTradesData`](catalogmarkettradesdata.md) &mdash;
- [`CatalogMempoolFeeratesData`](catalogmempoolfeeratesdata.md) &mdash;
- [`CatalogMetricsData`](catalogmetricsdata.md) &mdash; Transforms catalog data in list form into a dataframe
- [`CatalogMiningPoolTipsData`](catalogminingpooltipsdata.md) &mdash;
- [`CatalogPairMetricsData`](catalogpairmetricsdata.md) &mdash; Transforms catalog pair asset data in list form into a dataframe
- [`CatalogTransactionTrackerData`](catalogtransactiontrackerdata.md) &mdash;
- [`CatalogV2DataCollection`](catalogv2datacollection.md) &mdash; This class is used to implement functionality specific to catalog-v2 endpoints.
- [`CmStream`](cmstream.md) &mdash;
- [`CoinMetricsClientBadParameterError`](coinmetricsclientbadparametererror.md) &mdash; Raised when a request is made with bad parameters (HTTP 400).
- [`CoinMetricsClientConnectionError`](coinmetricsclientconnectionerror.md) &mdash; Raised when a connection error occurs (ConnectionResetError, ChunkedEncodingError).
- [`CoinMetricsClientForbiddenError`](coinmetricsclientforbiddenerror.md) &mdash; Raised when a request is forbidden due to insufficient permissions (HTTP 403).
- [`CoinMetricsClientNotFoundError`](coinmetricsclientnotfounderror.md) &mdash; Raised when a CoinMetricsClient instance is not found.
- [`CoinMetricsClientQueryParamsException`](coinmetricsclientqueryparamsexception.md) &mdash; Raised when a request is too long.
- [`CoinMetricsClientRateLimitError`](coinmetricsclientratelimiterror.md) &mdash; Raised when the rate limit is exceeded (HTTP 429).
- [`CoinMetricsClientUnauthorizedError`](coinmetricsclientunauthorizederror.md) &mdash; Raised when a request is unauthorized due to invalid or missing API key (HTTP 401).
- [`CsvExportError`](csvexporterror.md) &mdash;
- [`DataCollection`](datacollection.md) &mdash; The DataCollection class is a Python wrapper for collecting data from the CoinMetrics API. It can be used to transform API calls into Python data structures. For example: `DataCollection.to_dataframe()` -> pd.DataFrame or pl.DataFrame. `DataCollection.to_list()` -> List[Dict[str, Any]]. `DataCollection.export_to_csv()` -> str. Export data to a CSV file. `DataCollection.export_to_json()` -> str. Export data to a JSON file. `DataCollection.parallel()` -> ParallelDataCollection. Make API calls in parallel. Can be chained with `.to_dataframe()`, `.to_list()`, `.export_to_csv()`, `.export_to_json()`, `.export_to_csv_files()`, `.export_to_json_files()`.
- [`DataFetchError`](datafetcherror.md) &mdash;
- [`PagingFrom`](pagingfrom.md) &mdash; Direction in which a paged time series should be traversed.
- [`ParallelDataCollection`](paralleldatacollection.md) &mdash; This class will be used as an extension of the normal data collection, but all functions will run in parallel, utilizing Python's concurrent.futures features. The main purpose of this class is for historical export of data.

## Modules

- [`coinmetrics.api_client`](coinmetrics-api_client.md) &mdash; HTTP and WebSocket clients for the Coin Metrics API v4.
- [`coinmetrics.constants`](coinmetrics-constants.md) &mdash; Public enumerations used by :mod:`coinmetrics.api_client` methods.
- [`coinmetrics._exceptions`](coinmetrics-_exceptions.md) &mdash; Exception classes raised by the Coin Metrics Python API Client.
- [`coinmetrics._catalogs`](coinmetrics-_catalogs.md) &mdash;
- [`coinmetrics._data_collection`](coinmetrics-_data_collection.md) &mdash;
