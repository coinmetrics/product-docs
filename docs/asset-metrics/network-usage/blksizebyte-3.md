---
description: /timeseries/asset-metrics
---

# All Time Blob Space Used (bytes)

## Definition

With the Dencun Upgrade in March 2024, EIP-4844, introduces "blob-carrying transactions." These blobs transactions are created to include large data blobs. These blobs, while not directly accessible by the EVM, are anchored by commitments that are. The format is devised to be compatible with the anticipated full sharding model.  This metric shows the total sum of the size (in bytes) of blob space used all time up to that time interval.

## Dictionary

| Name                             | MetricID            | Category      | Subcategory | Type | Unit  | Interval |
| -------------------------------- | ------------------- | ------------- | ----------- | ---- | ----- | -------- |
| All Time Blob Space Used (bytes) | BlobSizeAllTimeByte | Network Usage | Bytes       | Sum  | Bytes | 1 day    |

## Details

* Only available since the dencun upgrade in March 2024

## Asset-Specific Details

* This metric is only available for ETH

## Release History

* Released in the Dencun Upgrade Release

## See Also

* To learn more about the Dencun Upgrade see [State Of The Network #245](https://coinmetrics.substack.com/p/state-of-the-network-issue-245)

