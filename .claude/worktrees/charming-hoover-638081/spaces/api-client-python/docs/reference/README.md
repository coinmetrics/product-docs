# API Client Reference

The Python client surface is split across the following classes:

- **`CoinMetricsClient`** -- the entry point. One Python method per Coin Metrics REST endpoint, grouped by endpoint root (Catalog v2, Time Series, ...).
- **`DataCollection`** -- the lazy iterator returned by every REST method. Provides paging, conversion to pandas/Polars data frames, and CSV/JSON export.
- **`ParallelDataCollection`** -- returned by `DataCollection.parallel(...)`. Splits a request across worker threads to accelerate historical exports.
- **`CmStream`** -- the WebSocket wrapper returned by every `get_stream_*` method. Provides connection management and message dispatch.
- **Exceptions** -- the typed exception hierarchy raised by the client (HTTP errors, rate limiting, transport failures, data-collection errors).
