# Mean blob fees (native units)

## Definition

With the Dencun Upgrade in March 2024, EIP-4844, introduces "blob-carrying transactions." These blobs transactions are created to include large data blobs. These blobs, while not directly accessible by the EVM, are anchored by commitments that are. The format is devised to be compatible with the anticipated full sharding model.  This metric shows the mean fees paid per blob, shown in native units.

## Dictionary

| Name                          | MetricID       | Category         | Subcategory | Type | Unit         | Interval               |
| ----------------------------- | -------------- | ---------------- | ----------- | ---- | ------------ | ---------------------- |
| Mean blob fees (native units) | FeeBlobMeanNtv | Fees and Revenue | Fees        | Mean | Native Units | 1 day, 1 block, 1 hour |

## Details

* Only available since the dencun upgrade in March 2024

## Asset-Specific Details

* This metric is only available for ETH

## Release History

* Released in the Dencun Upgrade Release

## See Also

* To learn more about the Dencun Upgrade see [State Of The Network #245](https://coinmetrics.substack.com/p/state-of-the-network-issue-245)

