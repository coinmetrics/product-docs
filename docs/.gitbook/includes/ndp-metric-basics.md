---
title: MEV Block Count
---

# Definition

The sum count of MEV-related blocks created that interval that were included in the main (base) chain.

# Dictionary

| Name            | MetricID  | Unit          | Interval |
| --------------- | --------- | ------------- | -------- |
| MEV Block Count | MevBlkCnt | Dimensionless | 1 day    |

# Details

* Only mainchain (non-orphaned/uncles) blocks are counted.
* For chains that use median time, the day is defined using it, otherwise, it’s defined using the block’s timestamps.
