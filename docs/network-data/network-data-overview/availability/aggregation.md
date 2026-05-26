# Aggregation

## Definition

The count of underlying assets aggregated to compute metrics for that aggregate asset in that interval.

| Name                    | MetricID    | Unit   | Interval      |
| ----------------------- | ----------- | ------ | ------------- |
| Aggregated Assets Count | AggAssetCnt | Assets | 1 day, 1 block |

## Details

* Coin Metrics computes metrics for aggregate assets (e.g. combined or composite assets) by aggregating data across a set of underlying constituent assets.
* `AggAssetCnt` reports how many underlying assets were included in that aggregation for a given interval.
* This metric is useful for auditing completeness — if the count drops unexpectedly, it may indicate that one or more underlying assets did not report data for that interval.

## Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/AggAssetCnt" %}
