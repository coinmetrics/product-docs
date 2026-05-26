# Availability

Availability metrics describe the completeness and coverage of Coin Metrics data for a given asset and interval. They are useful for auditing data pipelines and understanding when metric calculations have finished processing.

[**Asset Completion Time**](asseteodcompletiontime.md)

* AssetEODCompletionTime

[**Aggregation**](aggregation.md)

Aggregation metrics describe the composition of aggregate assets — assets whose metrics are computed by combining data across multiple underlying constituents. `AggAssetCnt` reports how many underlying assets contributed to a given aggregate asset's metrics in a particular interval, making it easy to detect gaps in coverage.

* AggAssetCnt

