# Market Implied Volatility

## Overview

Implied volatility is the market's expectation of future volatility, backed out of an option's price using an options pricing model. This dataset delivers exchange-reported implied volatility for individual option markets, derived separately from each contract's bid, ask, mark, and (where a venue provides it) trade price. It answers a question a raw option price cannot: how expensive is this contract once the mechanical effects of strike, expiry, and the underlying's price are stripped out. Options traders and risk teams use it to compare contracts on a common scale, to gauge sentiment, and as an input to volatility surfaces.

## At a Glance

<table data-full-width="true"><thead><tr><th>Data type</th><th>Entities</th><th width="159">Frequency / cadence</th><th>Unit</th><th>Primary endpoint</th><th>Coverage</th></tr></thead><tbody><tr><td>Market implied volatility</td><td>Markets (options)</td><td>Up to one observation per market per minute (deduplicated). <code>granularity</code> supports raw, 1m, 1h, 1d</td><td>Annualized standard deviation of returns, stated as a decimal (<code>0.55</code> = 55%)</td><td><code>/timeseries/market-implied-volatility</code></td><td><a href="https://coverage.coinmetrics.io/market-implied-volatility-v2">🔗</a></td></tr></tbody></table>

## Schema

Each row is one option market's implied volatility at a point in time. The four `iv_` fields are the same quantity computed from four different input prices, so they can be read side by side. Values are returned as JSON strings to preserve precision, and fields a venue does not report are null and omitted from JSON responses.

| Field | Type | Description | Notes |
| --- | --- | --- | --- |
| `market` | string | Unique name of the market. Option markets follow the `exchange-symbol-option` convention (for example `deribit-BTC-25SEP26-100000-C-option`), where the symbol is the exchange-reported symbol. | Required |
| `time` | string (date-time) | The observation time in ISO 8601 date-time format, aligned to the start of the minute (it is `exchange_time` truncated to the minute). Always nanosecond precision. | Required. See [Timestamps](#timestamps) |
| `iv_trade` | string (decimal) | The implied volatility calculated from the last reported trade price. | Optional. Reported by only some venues, otherwise null. See [The four price bases](#the-four-price-bases) |
| `iv_bid` | string (decimal) | The implied volatility calculated from the last reported bid price. | Optional. Non-positive when the contract has no resting bid. See [Reading empty and missing values](#reading-empty-and-missing-values) |
| `iv_ask` | string (decimal) | The implied volatility calculated from the last reported ask price. | Optional. Non-positive when the contract has no resting ask. See [Reading empty and missing values](#reading-empty-and-missing-values) |
| `iv_mark` | string (decimal) | The implied volatility calculated from the venue's mark price. | Optional. The most consistently populated of the four fields, and present for actively quoted contracts even when both sides of the book are empty |
| `exchange_time` | string (date-time) | The full-precision timestamp of the observation. For venues that timestamp their own data this is the exchange's time, otherwise it reflects when the value was collected. Can be null. | Optional. See [Timestamps](#timestamps) |
| `database_time` | string (date-time) | The time Coin Metrics saved the observation to the database, in ISO 8601 date-time format with nanoseconds precision. | Required |

{% hint style="info" %}
**Conventions.** Decimal values are returned as JSON strings to preserve precision. Implied volatility is an annualized standard deviation quoted in decimal form rather than as a percentage, so `0.5524` means 55.24%. Timestamps are UTC ISO-8601 with nanosecond resolution. `time` is the observation time aligned to the start of the minute, `exchange_time` is the full-precision timestamp of the observation, and `database_time` is when Coin Metrics saved it. See [Timestamps](#timestamps) for how the three relate.
{% endhint %}

## Methodology

Implied volatility is sourced from option exchanges and delivered with minimal processing. The subsections below cover what the number means, where the values come from, how they are scaled, how often they are recorded, and how the `granularity` parameter shapes the returned series.

### How implied volatility is derived

Options pricing models determine the theoretical price of an option contract as a function of several inputs. The Black-Scholes model, a widely used option pricing model, uses the following five inputs:

* Price of the underlying asset
* Strike price of the option
* Time until option expiration
* Risk-free interest rate
* Volatility of the price of the underlying asset

In other words, writing the option price as $$P$$, the underlying price as $$S$$, the strike as $$K$$, the time to expiration as $$T$$, the risk-free rate as $$r$$, and volatility as $$\sigma$$:

$$P = f(S, K, T, r, \sigma)$$

All the inputs, with the exception of volatility, are observable. The option price is also observable from market transactions. Suppose there is some inverse function $$g = f^{-1}$$ such that:

$$\sigma = g(P, S, K, T, r)$$

The volatility calculated from this equation is the implied volatility, or in other words, the market's expectation of future volatility implied by option prices. By convention, implied volatility represents the standard deviation of returns of the underlying asset calculated on an annualized basis.

### The four price bases

Trading in options markets is sparse and usually distributed over several hundred active option contracts. Since trades for a particular option contract can occur infrequently, the bid, ask, trade, and mark price of a particular contract can vary significantly. To the extent possible, Coin Metrics reports the implied volatility derived from each of these prices, as `iv_bid`, `iv_ask`, `iv_trade`, and `iv_mark`.

These four are not interchangeable. `iv_bid` and `iv_ask` bracket the volatility a taker could actually transact at, widen sharply in illiquid contracts, and carry no meaningful value at all when the corresponding side of the book is empty. `iv_mark` comes from the venue's own mark price and is therefore populated even for contracts with no live two-sided quote, which makes it the most consistently populated and most continuous of the four, and the usual default for a timeseries. `iv_trade` is the narrowest in venue coverage: most venues do not report it at all. Where a venue does report it, its definition is that venue's own and is not standardized, so confirm the convention before relying on it.

### Sourcing: exchange-reported values

Implied volatility is collected directly from each option venue and passed through. Coin Metrics does not run its own option pricing model for this dataset, so each figure is calculated using the reporting venue's proprietary model, with that venue's own assumptions about the risk-free rate, the underlying reference price, and the treatment of dividends or funding. Two venues quoting the same economic contract can therefore publish slightly different implied volatilities, and part of that gap reflects the choice of model rather than a genuine difference in market expectations. Values are best compared within a venue rather than across venues. The constant maturity metrics linked under [Related](#related) do not remove this limitation, because they are interpolated from these same exchange-reported values and are published per exchange. What they do resolve is a different problem, holding maturity and moneyness fixed so that a series can be tracked through time.

### Units and normalization

All values are annualized standard deviations of returns, expressed as a decimal rather than a percentage, so `0.5524` means 55.24%. Venues do not agree on this convention natively: some publish implied volatility already in percentage form, such as `55.24`. Coin Metrics rescales those venues at collection time so that every value served by this endpoint is on the same scale. No other scaling or rounding is applied, and values are carried at full precision.

### Reading empty and missing values

Option books are frequently one-sided, especially for strikes far from the money or contracts close to expiry, and a side with no resting order has no implied volatility to report. Venues do not agree on how to signal this, and Coin Metrics passes each venue's signal through rather than harmonizing it. Across the covered venues, an empty side of the book shows up in `iv_bid` or `iv_ask` in one of three ways:

* **Zero.** Most venues publish `0` for the missing side. This is the most common case by far.
* **Null.** Some venues omit the field entirely, in which case it is null and is dropped from JSON responses.
* **`-1`.** Some venues use `-1` as a sentinel for "no quote". It is passed through as a literal `-1` rather than being converted to null, so it can appear as a negative implied volatility, which is not economically meaningful.

The practical consequence is that a non-positive value is a signal, not a measurement. **Treat any value of `iv_bid` or `iv_ask` that is not strictly greater than zero as "no quote on this side" and exclude it** before computing an average, a bid-ask volatility spread, or any other statistic. Filtering only for null, or only for zero, will leave bad values in the sample.

This applies to the quote-derived fields. `iv_mark` is derived from the venue's own mark price rather than from the book, so it stays populated and positive for actively quoted contracts even when both sides are empty, which is the main reason to prefer it as a default series.

### Collection cadence and deduplication

Coin Metrics collects data for each option market on an ongoing basis. Some venues are polled on a short fixed interval and others push updates over a streaming connection, so the underlying arrival rate varies by venue. Coin Metrics then deduplicates the collected observations so that at most one record is kept per market per minute: the first observation seen within a given minute is retained and later observations in that same minute are discarded. As a result, the raw series contains at most one row per market per minute regardless of how fast the source updates, and `time` is aligned to the minute.

### Timestamps

Three timestamps accompany every observation, and they are derived from one another rather than being independent.

`exchange_time` is the full-precision timestamp of the observation. When a venue stamps its data with its own time, `exchange_time` carries that exchange time. For venues that do not, it reflects the moment Coin Metrics collected the value. Treat it as the precise time of the observation, but not necessarily as the exchange's own clock for every venue.

`time` is `exchange_time` truncated to the start of its minute (the seconds and sub-seconds are zeroed). Because at most one observation is retained per market per minute, `time` labels the minute while `exchange_time` shows where within that minute the retained observation actually fell. Use `time` to order and join the series, and `exchange_time` when you need the precise moment.

`database_time` is when Coin Metrics saved the observation. It is always populated and lands shortly after `exchange_time`.

### Granularity and downsampling

By default (`granularity=raw`) the endpoint returns every stored observation, up to one per minute. Setting `granularity` to `1m`, `1h`, or `1d` downsamples the series by returning the first observation in each interval and dropping the rest. Downsampling selects existing rows: it does not average or re-align them, so the returned values are original observations rather than computed aggregates.

### Availability and timeliness

Observations are served without an added delay and become queryable as soon as they are collected and stored, subject to the one-per-minute deduplication above. The dataset covers option markets only. Per-market history and the current list of covered markets are shown on the [coverage page](https://coverage.coinmetrics.io/market-implied-volatility-v2).

## Accessing the Data

Implied volatility is served from the `/timeseries/market-implied-volatility` endpoint, keyed by one or more option `markets`. The examples below request a single Deribit BTC option over a one-day window. The Python API Client is the recommended path.

{% tabs %}
{% tab title="Python Client" %}
```python
import os
from datetime import timedelta
from coinmetrics.api_client import CoinMetricsClient

client = CoinMetricsClient(os.environ["CM_API_KEY"])

df = (
    client.get_market_implied_volatility(
        markets=["deribit-BTC-25SEP26-100000-C-option"],
        start_time="2026-07-26",
        end_time="2026-07-27",
        format="json_stream",
    )
    .parallel(time_increment=timedelta(days=1))
    .to_dataframe()
)
print(df)
```
{% endtab %}

{% tab title="Shell" %}
```shell
curl --compressed "https://api.coinmetrics.io/v4/timeseries/market-implied-volatility?markets=deribit-BTC-25SEP26-100000-C-option&start_time=2026-07-26&end_time=2026-07-27&page_size=10000&api_key=$CM_API_KEY"
```
{% endtab %}

{% tab title="Python" %}
```python
import os
import requests

url = "https://api.coinmetrics.io/v4/timeseries/market-implied-volatility"
params = {
    "markets": "deribit-BTC-25SEP26-100000-C-option",
    "start_time": "2026-07-26",
    "end_time": "2026-07-27",
    "page_size": 10000,
    "api_key": os.environ["CM_API_KEY"],
}
data = requests.get(url, params=params).json()["data"]
print(f"{len(data)} observations")
print(data[0])
```
{% endtab %}
{% endtabs %}

To retrieve only the most recent values, replace the time range with `limit_per_market=1`. To pull a whole expiry at once, pass a wildcard such as `deribit-BTC-25SEP26-*-option` to `markets`. To downsample a long history, add the `granularity` parameter (see [Granularity and downsampling](#granularity-and-downsampling)).

Full parameter reference: see the API Reference for [`/timeseries/market-implied-volatility`](https://docs.coinmetrics.io/api/v4/#operation/getTimeseriesMarketImpliedVolatility).

## Examples

### Example: Deribit BTC option

The rows below are consecutive one-minute observations for the `deribit-BTC-25SEP26-100000-C-option` market. This venue reports its own timestamp, so `exchange_time` carries the exchange's clock. It does not report a trade-price implied volatility, so `iv_trade` is null and omitted. [Open in browser ↗](https://api.coinmetrics.io/v4/timeseries/market-implied-volatility?markets=deribit-BTC-25SEP26-100000-C-option&limit_per_market=3&api_key=YOUR_API_KEY)

```json
{
  "data": [
    {
      "market": "deribit-BTC-25SEP26-100000-C-option",
      "time": "2026-07-27T17:55:00.000000000Z",
      "database_time": "2026-07-27T17:55:18.540605000Z",
      "iv_bid": "0.447",
      "iv_ask": "0.4681",
      "iv_mark": "0.4604",
      "exchange_time": "2026-07-27T17:55:16.950000000Z"
    },
    {
      "market": "deribit-BTC-25SEP26-100000-C-option",
      "time": "2026-07-27T17:56:00.000000000Z",
      "database_time": "2026-07-27T17:56:18.571049000Z",
      "iv_bid": "0.4471",
      "iv_ask": "0.4682",
      "iv_mark": "0.4605",
      "exchange_time": "2026-07-27T17:56:17.380000000Z"
    },
    {
      "market": "deribit-BTC-25SEP26-100000-C-option",
      "time": "2026-07-27T17:57:00.000000000Z",
      "database_time": "2026-07-27T17:57:18.620419000Z",
      "iv_bid": "0.4465",
      "iv_ask": "0.4676",
      "iv_mark": "0.4604",
      "exchange_time": "2026-07-27T17:57:15.815000000Z"
    }
  ]
}
```

### Example: an option market that reports trade-price implied volatility

The rows below are consecutive one-minute observations for the `okex-BTC-USD-260828-90000-C-option` market, a venue that does populate `iv_trade`. All four price bases are present here, which shows how far they can diverge on the same contract at the same instant: `iv_bid` and `iv_ask` sit about two and a half volatility points apart with `iv_mark` between them, while `iv_trade` is roughly 13 volatility points below all three. [Open in browser ↗](https://api.coinmetrics.io/v4/timeseries/market-implied-volatility?markets=okex-BTC-USD-260828-90000-C-option&limit_per_market=3&api_key=YOUR_API_KEY)

```json
{
  "data": [
    {
      "market": "okex-BTC-USD-260828-90000-C-option",
      "time": "2026-07-27T17:55:00.000000000Z",
      "database_time": "2026-07-27T17:55:09.776000000Z",
      "iv_trade": "0.3436370172",
      "iv_bid": "0.4638762597",
      "iv_ask": "0.4882902734",
      "iv_mark": "0.4763797032",
      "exchange_time": "2026-07-27T17:55:08.966447000Z"
    },
    {
      "market": "okex-BTC-USD-260828-90000-C-option",
      "time": "2026-07-27T17:56:00.000000000Z",
      "database_time": "2026-07-27T17:56:01.465759000Z",
      "iv_trade": "0.3436370172",
      "iv_bid": "0.4638762597",
      "iv_ask": "0.4882902734",
      "iv_mark": "0.4766323325",
      "exchange_time": "2026-07-27T17:56:00.638656000Z"
    },
    {
      "market": "okex-BTC-USD-260828-90000-C-option",
      "time": "2026-07-27T17:57:00.000000000Z",
      "database_time": "2026-07-27T17:57:01.117525000Z",
      "iv_trade": "0.3437957738",
      "iv_bid": "0.4638762597",
      "iv_ask": "0.485848872",
      "iv_mark": "0.4760065984",
      "exchange_time": "2026-07-27T17:57:00.385282000Z"
    }
  ]
}
```

## Coverage

Coverage lists every option market with implied volatility, along with each market's available time range.

{% embed url="https://coverage.coinmetrics.io/market-implied-volatility-v2" %}

## Usage

Market participants use implied volatility in a variety of applications. Since implied volatility is a function of the option price (and other inputs), it often can be used as a replacement for price. Trading interfaces that show option chains typically show implied volatility alongside other critical information like the price, bid, ask, volume, and open interest. Some exchanges allow traders to input orders using implied volatility instead of price.

Implied volatility can also be used as a measure of valuation. Option prices can vary widely due to the range of inputs and are particularly sensitive to the strike price and time to expiration. The implied volatility allows options with different inputs to be compared against each other since it is derived from an options pricing model which incorporates the theoretical relationship between the other inputs and the options price. In theory, options contracts with the same underlying should have the same implied volatility. But market conditions and imbalances in supply and demand cause options to deviate from their theoretical value. Implied volatility is one measure market participants use to determine whether a particular options contract is under or overvalued.

Implied volatility also serves as the market's expectation for future volatility and can be used to calculate the likelihood of future price movements in the underlying or to gauge market sentiment.

## Limitations

A few properties of this dataset are worth keeping in mind.

* **Option markets only.** Implied volatility is available for option markets. A request for a spot or futures market returns an error, and non-option markets selected by a pattern are omitted from the response.
* **Venue-defined models.** Each figure is produced by the reporting venue's own pricing model rather than a Coin Metrics model, so values are best compared within a venue. Coin Metrics publishes no cross-venue-comparable alternative for this quantity: the constant maturity metrics are interpolated from these same exchange-reported values and inherit the reporting venue's model.
* **Non-positive values on empty book sides.** An empty side of the book is signalled inconsistently across venues, as `0`, as null, or as a literal `-1`. Negative implied volatility is not economically meaningful and is a sentinel rather than a measurement. Exclude any non-positive `iv_bid` or `iv_ask` before computing spreads or averages. See [Reading empty and missing values](#reading-empty-and-missing-values).
* **Sparse and venue-defined `iv_trade`.** Most venues do not report a trade-price implied volatility, so `iv_trade` is null for them. Where it is populated, its definition is the venue's own and does not necessarily correspond to the last trade on that specific contract, so verify the venue's convention before relying on it.
* **Minute-level resolution.** At most one observation is stored per market per minute, so the dataset does not capture sub-minute changes in implied volatility.
* **No streaming variant.** This dataset is available over HTTP only. Implied volatility has no `timeseries-stream` websocket endpoint.
* **Contract-level series end at expiry.** Each row is keyed to a specific option contract, which stops existing when it expires. Building a continuous history therefore requires stitching contracts together, which is what the constant maturity metrics do.

## FAQ

### How is your implied volatility calculated?

It is not calculated by Coin Metrics. This endpoint reports exchange-reported implied volatility, so each figure comes from the reporting venue's proprietary option pricing model. Coin Metrics rescales values so that every venue is reported on the same scale, but does not recompute them. Coin Metrics does publish derived volatility metrics at constant maturity and constant delta, but those interpolate these same exchange-reported values rather than repricing the contracts, so they still carry the reporting venue's model assumptions. See [Implied Volatility, Constant Maturity, At-The-Money](volatility/implied-volatility.md) and [Implied Volatility, Constant Maturity, Constant Delta](volatility/implied-volatility-constant-maturity-constant-delta.md).

### Why is the implied volatility for some options zero, or even negative?

Because the corresponding side of the book is empty, which happens routinely for options with very low liquidity. A contract with no resting bid has no bid-implied volatility to report. Venues signal this differently: most publish `0`, some omit the field so it arrives as null, and some publish `-1` as a sentinel, which is passed through and therefore appears as a negative number. None of the three is a measurement. Exclude any `iv_bid` or `iv_ask` that is not strictly greater than zero before computing statistics. See [Reading empty and missing values](#reading-empty-and-missing-values).

### Which of the four `iv_` fields should I use?

`iv_mark` is usually the right default for a timeseries, because it is derived from the venue's mark price and so remains populated even when a contract has no live two-sided quote. Use `iv_bid` and `iv_ask` when you care about volatility that is actually transactable, remembering to drop non-positive values first. Treat `iv_trade` as sparse and venue-defined. See [The four price bases](#the-four-price-bases).

### Are the values percentages or decimals?

Decimals. An `iv_mark` of `0.5524` means an annualized implied volatility of 55.24%. Venues that natively publish percentages are rescaled at collection time so the convention is uniform across the endpoint.

### What is the difference between `time` and `exchange_time`?

`time` is `exchange_time` truncated to the start of the minute, and it is the field to sort or join on. `exchange_time` is the full-precision timestamp of the retained observation, so it falls somewhere within the minute labeled by `time`. For venues that timestamp their own data, `exchange_time` is the exchange's clock. For others, it reflects the collection time.

### Can I get implied volatility for futures or spot markets?

No. The dataset covers option markets only. Requesting a non-option market returns an error.

### Is there a websocket stream for implied volatility?

No. This dataset is served over HTTP only. Poll the endpoint if you need it near real time, keeping in mind that at most one observation is stored per market per minute.

## Related

* [Market Greeks](market-greeks.md): exchange-reported delta, gamma, vega, theta, and rho for the same option markets.
* [Market Contract Prices](market-contract-prices.md): mark, index, and estimated settlement prices for option and futures markets.
* [Implied Volatility, Constant Maturity, At-The-Money](volatility/implied-volatility.md): a continuous at-the-money series at fixed tenor, interpolated from these exchange-reported values.
* [Implied Volatility, Constant Maturity, Constant Delta](volatility/implied-volatility-constant-maturity-constant-delta.md): standardized slices of the volatility surface across tenor and delta, built from these same values.
* [Realized Volatility](volatility/realized-volatility.md): backward-looking volatility measured from observed price returns.
