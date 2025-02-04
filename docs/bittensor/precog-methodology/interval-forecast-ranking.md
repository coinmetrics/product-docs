---
description: Methodology and example images of how the the Interval Forecast is scored
---

# Interval Forecast Ranking

The interval forecast is a little more complex, and as a result evaluation is as well.  Rather than basing on an error, we base the ranking on a score which the Miners are trying to maximize.  This score has a maximum (1.0) when the top and bottom of the Price Interval Forecast are exactly equal to the maximum and minimum observed Reference Rate during the evaluation window (which is the previous 1 hour as of launch).  The wider the interval becomes, the lower the score gets.  On the other hand, the less of the price time series which lies in the interval the lower the score gets as well.  In this way, the mechanism punishes both “wasted” interval prediction that is wider than necessary, and “insufficient” intervals that don’t capture the full range of price movement.

The methodology is illustrated in plots below.

The Interval Forecast is defined by the expected min and max price expected in the future window: $$IF = [p^f_{min}, p^f_{max}]$$. &#x20;

The Interval Score is the product of two components: a width-factor and an inclusion-factor.  The former penalizes intervals of excess width, and the latter penalizes intervals which do not include the observed prices.

### Width Factor

To calculate the width-factor, we first determine an “effective top” and “effective bottom” of the Interval Forecast.  The effective top is given by the smaller of either the upper bound of the Interval Forecast or the observed highest Reference Rate; and vice versa for the effective bottom.  The idea is that we consider the top and bottom of the interval, but don’t count excess width the goes beyond the observed price movement.  Mathematically, the effective top and bottom are:

$$t = \min( p^f_{max}, p^o_{max} ) \\  b = \max( p^f_{min}, p^o_{min} )$$

Where $$p^o(t)$$ is the real observed CM Reference Rate before evaluation time.

Then, the width-factor is calculated by the proportion of Interval Forecast captured by the effective bottom and top:

$$f_w=\frac{t-b}{p^f_{max}-p^f_{min}}$$

If the effective top and bottom are equal to the forecasted interval, the factor is 1.0.  But if the effective top or bottom is less (ie. the forecast has "wasted space"), the factor is some value less than 1.0.

### Inclusion Factor

The inclusion-factor meanwhile is determined by looking at the percentage of time points when the observed price lies within the Interval Forecast. This is a simpler to express in code than in math symbols: If p\[t] represents an array of the Coin Metrics Reference Rate at each second, indexed on the timestamp t, then the inclusion-factor is given by:

```python
f_i = sum((p >= pred_min) & (p <= pred_max)) / len(p)
```

Like the weight-factor, the inclusion-factor has a maximum of 1.0 and a minimum value of 0.0.  It reaches 1.0 when the Interval Prediction encompasses all observed prices.  It reaches a value of 0.0 if the interval does not include any prices.

Finally, the Miner’s interval score ($$r_{ivl}$$) for the interval prediction is given quite simply by the product:

$$r_{ivl} = f_i * f_w$$

The Miners are ranked from best to worst according to this score.  Not that unlike the Point Forecast Delta-factor, which was based on the _error,_ the Interval Score is ranked from highest. (best) to lowest (worst)

On the next page we'll show some sample plots to better illustrate how the interval score behaves under different scenarios.
