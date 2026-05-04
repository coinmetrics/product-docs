# API Client Reference

The Python client surface is split across three classes:

- **`CoinMetricsClient`** -- the entry point. One Python method per Coin Metrics REST endpoint, grouped by endpoint root (Catalog v2, Time Series, ...).
- **`DataCollection`** -- the lazy iterator returned by every REST method. Provides paging, conversion to pandas/Polars data frames, and CSV/JSON export.
- **`ParallelDataCollection`** -- returned by `DataCollection.parallel(...)`. Splits a request across worker threads to accelerate historical exports.
- **`CmStream`** -- the WebSocket wrapper returned by every `get_stream_*` method. Provides connection management and message dispatch.
- **Exceptions** -- the typed exception hierarchy raised by the client (HTTP errors, rate limiting, transport failures, data-collection errors).

* [CoinMetricsClient](coinmetricsclient.md)
  * [`CoinMetricsClient`](coinmetricsclient.md#coinmetrics.api_client.CoinMetricsClient)
  * [Endpoints](coinmetricsclient.md#endpoints)
* [DataCollection](data-collection.md)
  * [`DataCollection`](data-collection.md#coinmetrics._data_collection.DataCollection)
  * [CatalogV2DataCollection](data-collection.md#catalogv2datacollection)
* [ParallelDataCollection](parallel-data-collection.md)
  * [`ParallelDataCollection`](parallel-data-collection.md#coinmetrics._data_collection.ParallelDataCollection)
* [CmStream](cm-stream.md)
  * [`CmStream`](cm-stream.md#coinmetrics.api_client.CmStream)
* [Exceptions](exceptions.md)
  * [HTTP errors](exceptions.md#http-errors)
  * [Transport and client errors](exceptions.md#transport-and-client-errors)
  * [Data collection errors](exceptions.md#data-collection-errors)
