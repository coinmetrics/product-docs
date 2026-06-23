---
description: >-
  Combining the shares for multiple forecasts and smoothing with an exponential
  moving average
---

# Final Weight

### Average Shares into Total Share

Each forecast's share is averaged together to calculate a total share: $$s^T = (s^p + s^i) / 2$$

This total share serves as the single-epoch weight, or in other words this epoch's contribution to the Miner weight which is written the to TAO blockchain and determines emissions.

### Exponential Moving Average with Previous Weights

The single-epoch weight is averaged together with the previous weights according to an exponential moving average:

$$
w_t = \alpha \cdot s^T + (1-\alpha)w_{t-1}
$$

Effectively this means that evaluations $$N$$ epochs ago will have contribution of $$(1-\alpha)^N$$ times smaller than the most recent evaluation.  As of v2.5.0, $$\alpha = 0.0095808525$$, which was chosen because it creates a "half-life" of 72 evaluations (ie. 6-hours).  Intuitively, this means evaluations 6 hours ago have half the contribution as current evaluations, whereas results from 12 hours ago have ¼  the contribution and 24 hours ago will have 1/16th the contribution.

### Methodology&#x20;

After ranking the miner according to each of their forecasts then, we follow these steps:&#x20;

1. Each miner gets 0.9^(rank) amount of share.  This is done separately for each forecast type
   1. When miners tie, the weight of each rank occupied by tied miners gets averaged together, and assigned to each one. &#x20;
   2. Then following the tied group, the next miner is the list gets 0.9^M weight, where M are the numbers of miners ahead of them. In other words, downstream miners see no change if miners above them are tied
2. We calculate the mean of the two averaged share for each forecast type.
3. This total share is exponentially averaged with the total weight from the previous evaluation time.
