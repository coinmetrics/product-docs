---
description: >-
  Methodology of how Validators set Miner Weights based on Ranking in Previous
  Sections
---

# Miner Shares from Ranks

### Share per Rank

As mentioned on the previous pages, each miner receives a "share" or weight of that epoch's reward depending on their rank.  The share is 1.0 for the best miner and is exponentially decreasing for worse ranks.  In the simplest case, without ties, each miners point forecast share is calculated as:  $$s_i =(0.9)^{r_i}$$

### Separate shares per forecast

Each forecast, point and interval, is evaluated separately, ranked separately, and assigned a share separately.  The methodology below in other words is applied twice, once for each forecast ranking.  After each miner is awarded their shares the two types are combined into a final share of the rewards which are written to the TAO Blockchain as Miner Weights.

### Ties

Miners can tie for a given rank, in particular with newer Miners implementing the base class.  When multiple miners produce the same forecast, the shares for the ranks they occupy are divided and distributed equally to each of them.  Then the next miner after the tied group continues the pattern  $$s_i = 0.9^{r_i}$$, independent of any ties before them.

For example, in the case of 6 miners where 3x miners tie for 3rd, the shares would be $$\mathbf{s} = [1.0, 0.9, 0.7317, 0.7317, 0.7317,  0.59049]$$,&#x20;

where

$$
0.7317 = (0.9^2 + 0.9^3 + 0.9^4) / 3
$$
