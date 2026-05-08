# Changelog

<!--
Wording rules for changelog entries (apply when adding or refining entries,
including stubs produced by scripts/update_api_client_python_changelog.py):

1. Lead each bullet with the user-visible impact, then describe the change.
   Good: "to_dataframe() is faster on large payloads. It now uses a PyArrow
   schema instead of round-tripping through CSV."
   Bad:  "Refactored to_dataframe() to use PyArrow."
2. Exception: pure endpoint additions can simply name the new endpoints,
   e.g. "Added get_stream_market_contract_prices() for the
   /timeseries-stream/market-contract-prices WebSocket endpoint."
3. Do not include internal ticket identifiers (PLAT-, MD-, CYBERSEC-, etc.).
   Translate the ticket's intent into the user-impact framing instead.
4. Use the ### Added, ### Changed, ### Fixed, ### Deprecated, ### Removed,
   and (rarely) ### Documentation headings, in that priority order.
5. Skip entries that are purely internal (CI, build, deploy housekeeping)
   unless they affect users; if you must include them, say "No user-facing
   API changes" so reviewers can recognize the housekeeping case quickly.
-->

## 2026.4.30.17

### Fixed

- `get_market_candles()` no longer raises overflow errors for high-precision decimal columns; the client now materializes those columns as `decimal256`, with a fallback for older Polars versions that lack `decimal256` support.

### Changed

- The upstream documentation is now rendered with Sphinx (replacing MkDocs). No change to the published GitBook space served from this repo.

## 2026.4.16.18

### Added

- `to_dataframe(dataframe_type="polars")` and `to_lazyframe()` now run in parallel on `ParallelDataCollection`, giving end-to-end speedups of roughly 2-5x on representative endpoints. Internally the parallel path fans out via `ThreadPoolExecutor` and concatenates Arrow tables with `pl.concat(how="diagonal_relaxed")`.

### Fixed

- `to_dataframe()` no longer raises overflow errors when casting numeric columns to `decimal`.

### Changed

- PyArrow was upgraded to pick up upstream bug fixes. The Nix build target for Python 3.10 is dropped as a side effect; Python 3.10 itself remains supported via the standard install path until its EOL in October 2026.

## 2026.4.9.19

### Changed

- `.to_list()` is now ~1.5-1.9x faster on large result sets because `format="json_stream"` is the default (single streaming HTTP connection instead of paginated round trips). When a `limit` is set the client falls back to `format="json"` so behavior is unchanged for paginated callers.

## 2026.4.6.18

### Added

- Several `CoinMetricsClient` methods that were missing a `format` parameter now expose one, so callers can opt into `json_stream` / `csv` consistently across the API surface.

## 2026.4.2.14

### Fixed

- `to_dataframe(dataframe_type="polars")` on an empty result now returns an empty Polars DataFrame instead of an empty pandas one.
- `client.reference_data_markets(include="talos").to_dataframe()` no longer raises `ParserError`.
- Polars exports no longer suffer from dtype mismatches on nested and decimal columns.

### Changed

- `to_dataframe()`, `to_lazyframe()`, and `export_to_parquet()` are faster on large payloads and free of CSV-parsing edge cases. They now build outputs via PyArrow `RecordBatch.from_pylist()` driven by the schema from `get_schema()` instead of round-tripping through CSV.

### Added

- `decimal_as_string` parameter on `to_dataframe()` for callers that need full decimal precision instead of the lossy `float64` conversion.

### Deprecated

- `optimize_dtypes`, `header`, and `columns_to_store` parameters on `to_dataframe()` now emit a `DeprecationWarning`. Calls keep working.

### Removed

- Unused `TransactionTrackerData`, `CoinMetricsAPIModel`, and `AssetChainsDataCollection` helpers, plus the dead `SchemaWrapper` methods (`get_field_types`, `get_pandas_dtypes`, `get_datetime_columns`, `has_nested_fields`). These were not part of the documented client surface.

## 2026.3.31.13

### Added

- `include` query parameter on `reference_data_assets()`, `reference_data_exchanges()`, and `reference_data_markets()`.

## 2026.2.19.20

### Changed

- Internal release-pipeline cleanup. No user-facing API changes.

## 2026.2.19.19

### Fixed

- `to_dataframe()` and `export_to_parquet()` now produce correct dtypes for nested and decimal columns, end-to-end. The client now drives type inference from the precise schema generated off `openapi.yaml` (`coinmetrics/_schema_gen.py`, `_schema_base.py`, `_schema.py`) instead of inspecting columns heuristically.

### Added

- Several previously-missing endpoints and a routine schema regeneration.

## 2026.2.9.18

### Added

- `get_stream_market_contract_prices()` for the `/timeseries-stream/market-contract-prices` WebSocket endpoint.

## 2026.1.14.15

### Fixed

- Several parallelization-related parameters are now passed through correctly to the underlying data-collection layer; they were previously dropped before reaching `_data_collection.py`.

## 2026.1.5.19

### Added

- Python 3.13 support.

## 2025.12.16.20

### Added

- Exchange-pair endpoints: `reference_data_exchange_pair_metrics`, `catalog_exchange_pair_metrics_v2`, `catalog_full_exchange_pair_metrics_v2`, and `get_exchange_pair_metrics`.

## 2025.12.12.16

### Added

- `start_time` / `end_time` (and related) filters on the `catalog-v2/market-*` endpoints so callers can scope catalog queries to a time window.

## 2025.10.21.15

### Added

- Callers can now branch on the specific failure mode of a request: explicit exception classes for `401`, `403`, `414`, and `429` responses are now raised (`CoinMetricsClientUnauthorizedError`, `CoinMetricsClientForbiddenError`, `CoinMetricsClientBadParameterError`, `CoinMetricsClientRateLimitError`).

### Fixed

- Transient `ChunkedEncodingError` and `ConnectionError` failures are now retried more reliably.

### Changed

- The `examples/` tree was simplified: obsolete Flat Files and legacy patterns were removed and the troubleshooting docs were expanded. `docs.coinmetrics.io` is now the primary reference for example workflows.

### Removed

- The Data Exporter (`coinmetrics/data_exporter.py`) and its `typer_cli` entry point. Use the standard client methods plus `to_dataframe()` / `export_to_parquet()` instead.

## 2025.9.30.16

### Added

- `blockchain-metadata/locations` and `blockchain-metadata/owners` endpoints. The `owner_names` query parameter is now exposed on `blockchain-metadata/tagged-entities`, and tagging methods that did not follow the standard naming convention are now also reachable under canonical aliases.

### Fixed

- Taxonomy endpoints no longer drop nullable columns when the result is materialized via `to_dataframe()`.

## 2025.9.17.17

### Changed

- JSON-stream processing is now faster on heavier endpoints. Lighter endpoints continue to use `format="json"` so small queries stay fast.

## 2025.9.9.13

### Added

- `api_path_prefix` argument on `CoinMetricsClient` so callers can point the client at non-default API hosts/paths.

### Documentation

- Docstrings for `CoinMetricsClient` and `DataCollection`.

## 2025.9.3.18

### Added

- `ignore_unsupported_errors` and `ignore_forbidden_errors` parameters on `get_market_metrics()`, matching the existing pattern on other `get_market_*` methods.

## 2025.9.2.14

### Fixed

- Fixed the error where `_schema_constants.py` module is not in the Python Client package.

## 2025.8.28.15

### Fixed

- Fixed a bug where nullable columns for `blockchain-v2` endpoints and `timeseries/market-trades` were not returned when calling `.to_dataframe()`.

### Added

- Added `.to_dataframe()` for `get_full_block_v2()`, `get_full_transaction_v2()`, and `get_full_transaction_for_block_v2()`.
- Added the API schema as part of the package build.

## 2025.8.15.5

### Fixed

- Fixed a bug where nullable columns from `timeseries/*-metrics endpoints` are sometimes not returned when calling `.to_dataframe()`. This happened when the first row's columns are not the same as any of the subsequent rows.

## 2025.8.8.16

### Added

- Parallelization support to `get_predicted_funding_rates()`.

### Changed

- Changed the default to format=json_stream for the following functions:
  - All of `reference_data`.
  - All of `catalog_*_v2`.
  - `get_market_orderbooks`, `get_market_quotes`, `get_market_open_interest`, `get_market_trades`, `get_market_candles`, `get_asset_metrics`

## 2025.5.6.13

### Fixed

- Timezone normalization when using the parallel option with datetime.timedelta.

## 2025.4.24.14

### Fixed

- Install CHANGELOG to correct location for documentation site.
- Fix broken image link in Best Practices user guide.

## 2025.4.15.13

### Added

- Allow `optimize_pandas_types` argument as an alias for `optimize_dtypes` in `DataCollection.to_dataframe()` calls but issue a deprecated warning.  Prevents exception for code using the old name.

## 2025.3.12.17

### Changed

- Made Pandas and Polars mandatory packages.

## 2025.3.3.16

### Added

- `get_network_profiles`, missing `format` param to `get_market_orderbooks`, `ignore_*_errors` to `get_stream_asset_metrics`,

## 2025.2.26.22

### Added

- Enhanced documentation for API flows

## 2025.2.12.22

### Fixed

- Polars dependency issues.

## 2025.2.11.16

**Note: This release may be unstable if you do not have polars installed. Please update to 2025.2.12.22 for a patched version.**

### Added

- Added Polars dataframes and LazyFrames. They can be accessed using `DataCollection.to_dataframe(dataframe_type='polars')` and `DataCollection.to_lazyframe()` respectively.

### Changed

- `DataCollection` attribute `optimize_pandas_types` changed to `optimize_dtypes`.

## 2025.2.4.18

### Fixed

- Type annotations in docstrings

## 2024.12.23.19

### Added

- [CHANGELOG.md](http://CHANGELOG.md)

## 2024.12.20.17

### Added

- pd.DateOffset as a valid data type for `time_increment` in `parallel()`

### Changed

- Update pandas dependency to >= 2.0 and websocket-client >= 1.6.0

## 2024.12.16.21

### Added

- Allowed pandas Timestamp data type to be passed in `client` API calls
- Added "deprecated" flag to catalog v1 endpoints

## 2024.12.11.19

### Added

- Catalog-v2/blockchain endpoints

## 2024.12.10.20

### Changed

- Removed unused columns for `reference_data_*().to_dataframe()` return
- Improved casting for return data types

## 2024.11.21.20

### Changed

- Upgraded the typer dependency to >= 0.6.1

## 2024.11.18.19

### Changed

- Set `format=json_stream` for `catalog` and `reference_data` functions by default, drastically improving speed

## 2024.10.31.17

### Fixed

- Bug where requests have double '/' in URL

## 2024.10.15.19

### Changed

- Updated the request header to denote User-Agent as a Python API Client user

## 2024.10.9.20

### Added

- `txids` as a valid `parallelize_on` variable

## 2024.10.4.15

### Added

- Transformation logic for `catalog_*_v2().to_dataframe()` that flattens these dataframes

### Fixed

- Type casting for `coin_metrics_id` field from pandas dataframes for very large integers

## 2024.9.18.17

### Added

- Auto-retry logic for Websockets

### Removed

- Redundant tests

## 2024.9.18.16

### Fixed

- Bug on parallelization where `end_time` uses user's timezone instead of UTC

### Added

- `base_native` and `quote_native` fields to `reference_data_markets()`

## 2024.8.20.13

### Changed

- Removed JSON parsing on `on_error` for `CmStream` default

## 2024.8.16.10

### Removed

- Atlas V1 (`get_blockchain_()`) endpoints

### Added

- Warnings for upcoming `catalog` deprecation

## 2024.8.14.17

### Added

- `txid`, `accounts`, `block_hashes`, `heights`, and `sub_accounts` as valid `parallel` variables
- `height_increment` as a valid `parallel` parameter

## 2024.8.5.13

### Added

- Temporary patch for returning all columns for `to_dataframe()` call for `reference_data_*` and `security_master_*` functions

## 2024.7.12.14

### Added

- Allowed timezone aware datetimes to be passed to client API calls

## 2024.2.6.16

### Added

- Functions `get_market_funding_rates_predicted`, `catalog_{full}_market_funding_rates_predicted_v2`
- Generic examples for Python API Client functions

## 2024.1.17.17

### Fixed

- Bug where `blockchain_metadata` functions were not being called properly

## 2023.11.27.17

### Added

- `blockchain_metadata_tags()` and `blockchain_metadata_tagged_entities` functions

### Changed

- Updated README to shorten example code and remove catalog v1

## 2023.11.13.14

### Added

- Functions `get_snapshots_of_asset_metric_constituents` and `get_timeframes_of_asset_metric_constituents`

## 2023.10.30.13

### Added

- Function `get_stream_market_open_interest`

## 2023.10.19.17

### Added

- Function `get_stream_market_liquidations`

## 2023.9.29.14

### Added

- `metrics` parameter to `catalog_{full}_markets_v2`
- `catalog_index_levels_v2` and `reference_data_markets`

## 2023.9.22.21

### Added

- Parallelization support for `blockchain` endpoints

## 2023.9.11.14

### Changed

- Replaced `frequency` parameter with `granularity` for `get_market_quotes` and `get_market_orderbooks`

### Added

- Functions `reference_data_assets`, `reference_data_indexes`, `reference_data_pairs`

## 2023.8.30.20

### Added

- Functions `security_master_assets`, `security_master_markets`

## 2023.8.28.16

### Added

- Functions `catalog_{full}_pair_candles_v2`, `catalog_{full}_index_candles_v2`, `catalog_{full}_asset_chains_v2`, `catalog_{full}_mempool_feerates_v2`, `catalog_{full}_mining_pool_tips_summaries_v2`, `catalog_{full}_transaction_tracker_assets_v2`

## 2023.8.25.15

### Added

- Ability to parallelize API request for significantly improved data pull speed

## 2023.8.24.13

### Added

- Functions `reference_data_asset_metrics`, `reference_data_institution_metrics`

### Fixed

- Added `frequency` parameter to `get_market_orderbooks` (fixed in 2023.9.11.14)

## 2023.8.22.14

### Added

- Functions `catalog_{full}_asset_metrics_v2`, `catalog_exchange_{full}_metrics_v2`, `catalog_{full}_exchange_asset_metrics_v2`, `catalog_{full}_pair_metrics_v2`, `catalog_{full}_institution_metrics_v2`

## 2023.8.10.19

### Added

- `on_close` handler to `CmStream`

## 2023.7.11.17

### Added

- Functions `catalog_{full}_contract_prices_v2`, `catalog_{full}_market_trades_v2`, `catalog_{full}_market_candles_v2`, `catalog_{full}_market_orderbooks_v2`, `catalog_{full}_market_quotes_v2`, `catalog_{full}_market_funding_rates_v2`, `catalog_{full}_market_contract_prices_v2`, `catalog_{full}_market_implied_volatility_v2`, `catalog_{full}_market_greeks_v2`, `catalog_{full}_market_open_interest`, `catalog_{full}_market_liquidations_v2`, `catalog_{full}_market_metrics_v2`.

## 2023.6.8.20

### Fixed

- Market metrics catalog implementation to prevent duplicate rows
- Added test to verify one row per frequency

## 2023.5.26.17

### Added

- Transaction tracker parameters
- Include heartbeats functionality

## 2023.5.17.19

### Changed

- Fixed catalog performance issues

### Added

- Walkthrough notebook for DS UA Workshop

## 2023.5.2.20

### Added

- Rate limiter for community users
- Multithreading to CI pipeline
- Sample script for exporting atlas balance updates

## 2023.4.26.13

### Fixed

- URL fixes

## 2023.4.24.14

### Added

- Missing catalog endpoints
- Support for optional columns in API data
- New endpoint and tests

## 2023.3.16.17

### Changed

- Updated Dockerfile and dependencies
- Updated poetry lock file
- Bug fixes in examples

### Added

- Missing timeseries stream endpoints

## 2023.2.27.22

### Added

- Missing functions and parameters

## 2023.2.23.0

### Added

- Missing functions parameters
- Improved documentation for DataCollections usage

## 2023.1.26.23

### Added

- Unauthorized error handling to FlatFilesExporter
- Updated CI pipeline

## 2023.1.10.21

### Added

- Debug mode to help figure out performance issues
- Documentation updates for to_dataframe() method for catalog
- Automated testing code coverage
- Error handling for large requests (URI too long)
- Support for secondary_level parameter in to_dataframe()
- Support for index levels via WS in the client

## 2022.11.14.16

### Changed

- Modified API Client to use python requests.Session for improved performance

## 2022.11.3.18

### Added

- Taxonomy endpoints
- Updated Atlas V2 balance endpoints

### Fixed

- Fixed broken examples using `type` parameter

## 2022.10.18.18

### Changed

- Updated build pipeline

## 2022.10.14.20

### Added

- New catalog endpoints for metrics
- Automated version updates on release
- Documentation generation
