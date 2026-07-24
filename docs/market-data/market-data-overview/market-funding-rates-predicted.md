# Market Funding Rates Predicted

## Overview

The predicted funding rate is a real-time estimate of what a perpetual futures contract's funding rate will be at the end of the current funding interval. Funding rates are periodic payments exchanged between the long and short holders of a perpetual contract to keep its price aligned with the underlying spot or index price. Because perpetual contracts never expire, there is no settlement that forces convergence, so the funding mechanism substitutes for it. Many venues publish two versions of the rate: the realized rate, calculated over the previous interval and used to determine the actual payment, and the predicted rate, a running estimate of the rate that will apply at the end of the current interval. Some venues call the predicted rate the real-time rate or the next funding rate. Traders, risk teams, and researchers use it to read the current cost of carry and the direction funding is heading before the interval closes.

Coin Metrics samples the predicted rate from each venue's perpetual futures markets and serves it as a per-market time series over the HTTP endpoint [`/timeseries/market-funding-rates-predicted`](https://docs.coinmetrics.io/api/v4/#operation/getTimeseriesMarketFundingRatesPredicted). Coin Metrics uses the term "funding rate" for the realized rate and "predicted funding rate" for the real-time estimate described here.

{% hint style="info" %}
**Predicted, not realized.** This page covers the **predicted** funding rate: a real-time estimate of the rate that will apply at the end of the current funding interval. For the **realized** rate that is actually calculated over the previous interval and used to settle the payment, see [Market Funding Rates](market-funding-rates.md).
{% endhint %}

## At a Glance

<table data-full-width="true"><thead><tr><th>Data type</th><th>Entities</th><th width="159">Frequency / cadence</th><th>Unit</th><th>Primary endpoint</th><th>Coverage</th></tr></thead><tbody><tr><td>Predicted (real-time) perpetual-futures funding rates</td><td>Markets (perpetual futures)</td><td>Sampled once per minute per market from the exchange's real-time futures ticker</td><td>Funding rate as a decimal fraction over the funding period (for example <code>0.0010</code> = 0.10%)</td><td><code>/timeseries/market-funding-rates-predicted</code></td><td><a href="https://coverage.coinmetrics.io/market-funding-rates-predicted-v2">🔗</a></td></tr></tbody></table>

## Schema

One observation is the predicted funding rate for one market sampled at one point in time. Every observation carries the fields below. The columns are the response schema for `/timeseries/market-funding-rates-predicted`.

| Field | Type | Description | Notes |
| --- | --- | --- | --- |
| `market` | string | Unique name of the market. Perpetual futures markets follow the `exchange-symbol-future` convention (for example `binance-BTCUSDT-future`). | Required |
| `time` | string (date-time) | The time the predicted rate was sampled, in ISO 8601 with nanosecond precision. Observations are aligned to the minute, so timestamps fall on whole-minute boundaries. See [Collection and sampling](#collection-and-sampling). | Required |
| `rate_predicted` | string (decimal) | The predicted funding rate at the sample time, expressed as a decimal fraction over the funding period. For example a `rate_predicted` of `0.0010` represents 0.10% applied over the period. A positive value means longs pay shorts, a negative value means shorts pay longs. See [Sign convention and units](#sign-convention-and-units). | Required |
| `rate_time` | string (date-time) | The end of the current funding interval, in ISO 8601 with nanosecond precision. The predicted rate is a real-time estimate of the realized rate that will apply at this instant. See [Convergence to the realized rate](#convergence-to-the-realized-rate). | Optional. Present only for venues that publish a next-funding time |
| `database_time` | string (date-time) | The time Coin Metrics stored the observation, in ISO 8601 with nanosecond precision. Use this for the exact instant a value was recorded. | Required |

{% hint style="info" %}
**Conventions.** The `rate_predicted` is returned as a JSON **string** to preserve precision. Timestamps are UTC ISO-8601 with nanosecond resolution: `time` is the sample time (aligned to the minute), `rate_time` is the end of the current funding interval, and `database_time` is when Coin Metrics stored the observation. The `rate_predicted` is a decimal fraction over the funding period, not a percentage or an annualized number.
{% endhint %}

## Methodology

The predicted rate is not re-derived by Coin Metrics. Each exchange publishes a real-time estimate of the next funding rate on its perpetual futures ticker, and Coin Metrics records that estimate as a harmonized per-market time series. The mechanics below cover how the estimate is sampled, how it is signed and denominated, how it converges to the realized rate, and how observations are timestamped.

### Collection and sampling

Coin Metrics reads the predicted rate from each venue's real-time futures ticker feed, where the current estimate of the next funding rate is published alongside the mark and index prices. The feed updates continuously, and Coin Metrics stores at most one observation per market per minute: samples are keyed by market and by the sample time truncated to the minute, so the first estimate seen within each minute is kept and later estimates in the same minute are not stored again. This is why the `time` field always falls on a whole-minute boundary and why the effective sampling frequency is once per minute for every market in the coverage universe.

Only perpetual futures markets carry a predicted rate. Observations without a published estimate are not stored.

### Sign convention and units

The `rate_predicted` follows the same convention as the realized rate. It is a decimal fraction that represents the return over one funding period, so a value of `0.0010` is 0.10% over that period. The sign follows the direction of the expected payment:

* When the perpetual price trades above the underlying spot or index price, the rate is **positive** and long holders are expected to pay short holders.
* When the perpetual price trades below it, the rate is **negative** and short holders are expected to pay long holders.

Because venues use different funding periods, predicted rates are not directly comparable across venues until they are put on a common basis. The predicted series does not carry the funding period itself. To annualize or compare across venues, use the venue's `period` from the realized [Market Funding Rates](market-funding-rates.md) series.

### Convergence to the realized rate

The predicted rate is a running estimate that updates in real time through the funding interval. As the end of the interval named in `rate_time` approaches, the estimate converges toward the realized rate that the venue will actually charge. At the end of the interval, the realized rate is published on the [Market Funding Rates](market-funding-rates.md) series. The calculation and interpretation of the predicted rate are otherwise identical to the realized rate, the only difference being that the predicted rate updates continuously rather than once per interval.

### Timestamps

Three timestamps describe each observation. `time` is when the estimate was sampled, aligned to the minute. `rate_time` is the end of the current funding interval, the instant the estimate is an estimate of. `database_time` is when Coin Metrics stored the observation, so the gap between `time` and `database_time` measures collection lag.

## Accessing the Data

The predicted funding rate is available over HTTP for historical queries and for the latest observations. There is no websocket stream for this data type.

Query one or more markets over a time range at `/timeseries/market-funding-rates-predicted`, or use `limit_per_market` for the most recent observations. The `markets` parameter accepts a comma-separated list or wildcard patterns such as `binance-*`, `*USDT-future`, or `*-future`, so you can query many markets in one call.

{% tabs %}
{% tab title="Python Client" %}
```python
import os
from datetime import timedelta
from coinmetrics.api_client import CoinMetricsClient

client = CoinMetricsClient(os.environ["CM_API_KEY"])

# Predicted funding rates over a time range, fetched in parallel as a DataFrame.
df = client.get_predicted_market_funding_rates(
    markets=["binance-BTCUSDT-future"],
    start_time="2025-01-01",
    end_time="2025-01-08",
    format="json_stream",
).parallel(time_increment=timedelta(days=1)).to_dataframe()

print(df)

# For just the latest observations, use limit_per_market instead (uses format="json"):
# client.get_predicted_market_funding_rates(markets=["binance-BTCUSDT-future"], limit_per_market=5).to_dataframe()
```
{% endtab %}

{% tab title="Shell" %}
```shell
curl --compressed "https://api.coinmetrics.io/v4/timeseries/market-funding-rates-predicted?markets=binance-BTCUSDT-future&limit_per_market=5&api_key=$CM_API_KEY"
```
{% endtab %}

{% tab title="Python" %}
```python
import os, requests

response = requests.get(
    "https://api.coinmetrics.io/v4/timeseries/market-funding-rates-predicted",
    params={"markets": "binance-BTCUSDT-future", "limit_per_market": 5,
            "api_key": os.environ["CM_API_KEY"]},
).json()
print(response)
```
{% endtab %}
{% endtabs %}

Full parameter reference: see the API Reference for [`/timeseries/market-funding-rates-predicted`](https://docs.coinmetrics.io/api/v4/#operation/getTimeseriesMarketFundingRatesPredicted).

## Examples

The example below shows the latest observations for one market. The `rate_predicted` is returned as a JSON string, and consecutive samples one minute apart share the same `rate_time` because they estimate the same funding interval.

### Example: predicted rate sampled per minute

The latest predicted funding rates for `binance-BTCUSDT-future`, sampled once per minute and all estimating the funding interval that ends at `rate_time` ([browser](https://api.coinmetrics.io/v4/timeseries/market-funding-rates-predicted?markets=binance-BTCUSDT-future\&limit_per_market=3\&api_key=YOUR_API_KEY)):

```json
{
  "data": [
    {
      "market": "binance-BTCUSDT-future",
      "time": "2026-07-24T18:04:00.000000000Z",
      "rate_predicted": "0.00007879",
      "database_time": "2026-07-24T18:04:24.912991000Z",
      "rate_time": "2026-07-25T00:00:00.000000000Z"
    },
    {
      "market": "binance-BTCUSDT-future",
      "time": "2026-07-24T18:05:00.000000000Z",
      "rate_predicted": "0.00007919",
      "database_time": "2026-07-24T18:05:24.920227000Z",
      "rate_time": "2026-07-25T00:00:00.000000000Z"
    },
    {
      "market": "binance-BTCUSDT-future",
      "time": "2026-07-24T18:06:00.000000000Z",
      "rate_predicted": "0.00007956",
      "database_time": "2026-07-24T18:06:24.926642000Z",
      "rate_time": "2026-07-25T00:00:00.000000000Z"
    }
  ]
}
```

## Coverage

{% embed url="https://coverage.coinmetrics.io/market-funding-rates-predicted-v2" %}

## Usage

* **Real-time cost of carry.** Use `limit_per_market` for a quick "latest N" look at a market's current predicted funding, or a wildcard such as `*-future` to scan many markets at once.
* **Watching the estimate settle.** Pull a time range to see how the predicted rate evolves minute by minute through the interval and converges toward the rate that will be charged at `rate_time`.
* **Positioning and sentiment.** Read the sign and magnitude of the predicted rate in real time to see which side is expected to pay and how strong the imbalance is before the interval closes.
* **Cross-venue comparison.** Put rates on a common basis before comparing. The predicted series does not carry the funding period, so use the `period` from the realized [Market Funding Rates](market-funding-rates.md) series to annualize.
* **Derivatives context.** Combine the predicted rate with the realized [Market Funding Rates](market-funding-rates.md), [Market Open Interest](market-open-interest.md), and [Market Liquidations](market-liquidations.md) on the same markets to study leverage build-up and unwind.

## Limitations

* **Predicted funding rate is an estimate of the actual funding rate.** The predicted rate is a real-time estimate that can move until the interval closes. For the settled rate used to determine the actual payment, use [Market Funding Rates](market-funding-rates.md).
* **`rate_time` is not always present.** Some venues do not publish a next-funding time, so `rate_time` can be absent for those markets even though `rate_predicted` is populated.
* **Perpetual futures only.** Only perpetual futures markets carry a predicted rate. Spot and options markets are not covered.
* **Per-minute granularity.** At most one observation is stored per market per minute, so the series does not capture every intraday tick the exchange publishes.
* **Conventions vary by exchange.** Each venue sets its own funding mechanism and period, so raw predicted rates are not comparable across venues until they are put on a common basis.

## FAQ

### What is the difference between the predicted and realized funding rates?

The realized funding rate is calculated over the previous funding interval and is used to determine the actual funding payment. The predicted funding rate is a real-time estimate of the rate that will apply at the end of the current interval. The calculation and interpretation are the same, the difference being that the predicted rate updates continuously while the realized rate updates once per interval. For the realized series, see [Market Funding Rates](market-funding-rates.md).

### What is the sampling frequency of the predicted funding rates?

The predicted funding rate is sampled once per minute for the perpetual futures markets in the coverage universe. The exchange ticker updates more frequently, but Coin Metrics stores at most one observation per market per minute, so `time` always falls on a whole-minute boundary.

### What does the `rate_time` field represent?

`rate_time` is the end of the current funding interval. The predicted rate at a given `time` is an estimate of the realized rate that will apply at `rate_time`. Consecutive samples that estimate the same interval share the same `rate_time`.

### Why do some observations have no `rate_time`?

`rate_time` is populated only for venues that publish a next-funding time alongside the predicted rate. For venues that publish the estimate without a next-funding time, `rate_predicted` is still returned but `rate_time` is absent.

## Related

* [Market Funding Rates](market-funding-rates.md): the realized funding rate calculated over the previous interval and used to settle the payment.
* [Funding Rate Metrics](funding-rate-metrics.md): the open-interest-weighted aggregate and cumulative funding rate across markets, by asset and exchange-asset.
* [Market Open Interest](market-open-interest.md): outstanding contracts on the same derivatives markets.
* [Market Liquidations](market-liquidations.md): forced closes on the same derivatives markets.
