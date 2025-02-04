---
description: Methodology for Ranking Miners According to Point Forecast performance.
---

# Point Forecast Ranking

#### Point Forecast Ranking

For the point forecast, the best miners are determined according to a rolling average of the absolute error between the earlier forecasted price and the observed Reference Rate at the evaluation time.  For ease of reference we sometimes call this a delta-factor:

$$e_i = |p_i-p_{CM}| / p_{CM}$$

$$\Delta=\frac{1}{N}\sum_{n=1}^N  e_n$$

Where at launch, N = 12, in other words the previous 1-hour of evaluated forecasts.  The Miners are then ranked, so that the top miner is the one with the smallest delta-factor.  This ranking will determine the Point Forecast Weight they receive later.
