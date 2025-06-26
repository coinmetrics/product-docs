---
description: Methodology for Ranking Miners According to Point Forecast performance.
---

# Point Forecast Evaluation

## Single-Epoch Evaluation

Single-epoch refers to the forecast issued at a single prediction time ($$p_i$$), evaluated against the observed Coin Metrics Reference Rate ($$p_{CM}$$)  1-hour in the future. &#x20;

At each evaluation time (ie. each epoch) the validators calculate the Absolute Error ( $$e_i$$) of the prediction compared to the observed price:

$$e_i = |p_i-p_{CM}| / p_{CM}$$

### Ranking

The miner forecasts within each epoch are ranked from $$r_i \in \{0, ..., N-1\}$$ with rank 0 being the best Miner with the smallest error and (N-1) being the rank of the worst Miner with largest error.

### Share per Rank

Each miner receives a "share" or weight of that epoch's reward depending on their rank.  The share is 1.0 for the best miner and is exponentially decreasing for worse ranks.  In the simplest case, without ties, each miners point forecast share is calculated as:  $$s_i =(0.9)^{r_i}$$.  This explained in more detail in the section on calculating final share.&#x20;
