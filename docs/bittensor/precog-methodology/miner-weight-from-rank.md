---
description: >-
  Methodology of how Validators set Miner Weights based on Ranking in Previous
  Sections
---

# Miner Weight from Rank

Broadly speaking, once the Miners are ranked according to Point and Interval Forecast, the Validator sets an exponentially decaying weight, which is transformed into emissions by the Yuma Consensus algorithm.  Specifically the process goes:

1. Each miner gets 0.9^(rank) amount of weight.  Miners with tied rank get the same weight.
2. The previous weight value is rolling-averaged with the weight determined from the last 12 evaluations; for each forecast independently.  This rolling average has an alpha decay of 0.1, so each older evaluation contributes 90% less to rolling average.&#x20;
3. We get the mean of the two averaged weights for each forecast type.
4. The Miner's mean weight divided by the sum of all mean weights in Step 3, determines the final weight assigned by the Validator.  In other words these final weights will sum to 1.0.

Note that because Step 4 divides by the sum of all the weights assigned, when there are a small number miners participating they would all get roughly similar final weights creating an incentive for additional miners to fill the ranks

For example, in the case of only three Miners, they each would receive approximately: $$[1, 0.9, 0.81]$$ initial weights, leading to $$[0.369, 0.332, 0.299]$$.&#x20;

However when 200 Miners participate, the first three end up with _final_ weights $$[ 10\%, 9\%,  8.1\%]$$ while the 100th best Miner gets only $$0.00027 \%$$, and much less for the ones further down.
