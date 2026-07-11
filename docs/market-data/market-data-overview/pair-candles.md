# Pair Candles

## Overview

A pair candle summarizes the price of a cross-exchange asset pair over a fixed time interval as open, high, low, and close prices (OHLC). A pair such as `btc-usd` represents an asset against a quote currency across the market as a whole, rather than on any single venue. Pair candles let traders, researchers, and analysts chart and study a pair's price action over time without tying the view to one exchange.

Unlike [market candles](market-candles.md), which are computed per market from that market's trades, pair candles are OHLC snapshots of the Coin Metrics **Reference Rate** for the pair. The Reference Rate is a cross-exchange price derived from a vetted set of constituent markets, so a pair candle reflects a market-wide price and carries only price fields, with no volume, VWAP, or trade count.

Historical pair candles are available over the HTTP endpoint [`/timeseries/pair-candles`](https://docs.coinmetrics.io/api/v4#operation/getTimeseriesPairCandles).

## At a Glance

<table data-full-width="true"><thead><tr><th>Data type</th><th>Entities</th><th width="159">Frequency / cadence</th><th>Unit</th><th>Primary endpoint</th><th>Coverage</th></tr></thead><tbody><tr><td>Pair candles (OHLC)</td><td>Asset pairs (for example <code>btc-usd</code>)</td><td>Fixed intervals: 1m, 5m, 10m, 15m, 30m, 1h, 4h, 1d</td><td>Price in the pair's quote currency (US dollars for <code>*-usd</code> pairs)</td><td><code>/timeseries/pair-candles</code></td><td><a href="https://coverage.coinmetrics.io/pair-candles-v2">🔗</a></td></tr></tbody></table>

## Schema

One observation is a single candle for one pair and one interval. Pair candles carry price fields only. The columns below are the response schema for `/timeseries/pair-candles`.

| Field | Type | Description | Notes |
| --- | --- | --- | --- |
| `pair` | string | Unique name of the pair, in `base-quote` form (for example `btc-usd`). | Required |
| `time` | string (date-time) | The start of the candle interval. ISO 8601, nanosecond precision. | Required. Interval start (see [Interval timing](#interval-timing)) |
| `price_open` | string (decimal) | The reference-rate price at the start of the interval. | Required |
| `price_high` | string (decimal) | The highest reference-rate price in the interval. | Required |
| `price_low` | string (decimal) | The lowest reference-rate price in the interval. | Required |
| `price_close` | string (decimal) | The reference-rate price at the end of the interval. | Required |

{% hint style="info" %}
**Conventions.** Prices are returned as JSON **strings** to preserve precision. Timestamps are UTC ISO-8601 with nanosecond resolution. `time` marks the **start** of the candle interval, not its end. Prices are in the pair's quote currency (US dollars for `*-usd` pairs). Pair candles do not include volume, VWAP, or a trade count (see [Why pair candles are price-only](#why-pair-candles-are-price-only)).
{% endhint %}

## Methodology

### Built from the Coin Metrics Reference Rate

A pair candle is an OHLC summary of the Coin Metrics Reference Rate for the pair over the interval. The Reference Rate is a continuously computed cross-exchange price. Within each interval, the candle's `price_open` is the first reference-rate value, `price_close` is the last, and `price_high` and `price_low` are the maximum and minimum reference-rate values over the interval. Candles at intervals longer than one minute are aggregated from the one-minute candles: open from the first, close from the last, and high and low from the extremes.

### Constituent markets

Because a pair candle summarizes the Reference Rate, the exchanges and markets that feed it are exactly those that feed the Reference Rate: a vetted set of constituent markets selected under the Coin Metrics reference-rate methodology. A pair candle is therefore a market-wide price, not a sum or average of individual exchange market candles. For the methodology behind the underlying price, see [Reference Rate](../reference-rates-overview/reference_rate.md).

### Interval timing

A pair candle's `time` is the **start** of its interval. For example, a one-minute candle stamped `06:17:00` covers `06:17:00` up to (but not including) `06:18:00`. Daily candles are bucketed in UTC by default. The `timezone` and `1d-HH:00` parameters can move that daily boundary to a different time or time zone (see [Custom daily boundaries](#custom-daily-boundaries-offsets-and-time-zones)), and the returned timestamps are always UTC.

### Custom daily boundaries (offsets and time zones)

By default a `1d` pair candle covers a UTC calendar day. The `timezone` and `1d-HH:00` parameters realign that daily boundary, which is useful for benchmark closes such as a 4:00 PM New York close of the pair's price.

* **`timezone`** moves the boundary to local midnight in the given [TZ database](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) zone, for example `frequency=1d&timezone=Asia/Tokyo`.
* **`1d-HH:00`** moves the boundary to the whole hour `HH` in that zone, for example `frequency=1d-16:00&timezone=America/New_York` for a New York close. Without `timezone`, the offset is applied in UTC.

Named shorthands that carry their own time zone are also accepted: `1d-ny-close` (16:00 New York), `1d-ldn-close` (16:00 London), and `1d-sg-close` (16:00 Singapore). For example, `frequency=1d-ny-close` equals `frequency=1d-16:00&timezone=America/New_York`.

The offset applies only to `1d` and only on whole hours (`1d-16:00` is valid, `1d-16:30` is not). The `time` field remains the interval **start** in UTC, and boundaries follow the zone's daylight-saving changes.

### Why pair candles are price-only

A Reference Rate is a synthesized, cross-exchange price. It is not tied to the trades of any one market, so quantities like traded volume, a volume-weighted average price, or a trade count do not apply to it. Pair candles therefore expose only open, high, low, and close. For volume, VWAP, and trade counts, use per-market [market candles](market-candles.md).

### Availability

Pair candles are produced continuously and published in real time. Because the underlying Reference Rate is computed continuously (roughly one value per second), each interval normally has a value. Intervals with no underlying reference-rate data are omitted rather than carried forward, so pair candles are not filled forward the way market candles are.

## Accessing the Data

Pair candles are available over HTTP at `/timeseries/pair-candles`. Choose an interval with the `frequency` parameter (default `1d`).

{% tabs %}
{% tab title="Python Client" %}
```python
import os
from datetime import timedelta
from coinmetrics.api_client import CoinMetricsClient

client = CoinMetricsClient(os.environ["CM_API_KEY"])

# 1-minute pair candles over a time range, fetched in parallel and returned as a DataFrame.
df = client.get_pair_candles(
    pairs=["btc-usd"],
    frequency="1m",
    start_time="2025-01-01",
    end_time="2025-01-02",
    format="json_stream",
).parallel(time_increment=timedelta(days=1)).to_dataframe()

print(df)

# For just the latest candles, use limit_per_pair instead (uses format="json"):
# client.get_pair_candles(pairs=["btc-usd"], frequency="1m", limit_per_pair=5).to_dataframe()
```
{% endtab %}

{% tab title="Shell" %}
```shell
curl --compressed "https://api.coinmetrics.io/v4/timeseries/pair-candles?pairs=btc-usd&frequency=1m&limit_per_pair=5&api_key=$CM_API_KEY"
```
{% endtab %}

{% tab title="Python" %}
```python
import os, requests

response = requests.get(
    "https://api.coinmetrics.io/v4/timeseries/pair-candles",
    params={"pairs": "btc-usd", "frequency": "1m", "limit_per_pair": 5,
            "api_key": os.environ["CM_API_KEY"]},
).json()
print(response)
```
{% endtab %}
{% endtabs %}

The `pairs` parameter accepts a comma-separated list or wildcard patterns such as `btc-*` or `*-usd`, so you can query many pairs in one call. Supported `frequency` values are `1m`, `5m`, `10m`, `15m`, `30m`, `1h`, `4h`, `1d`, and `1d-HH:00` for a daily candle whose boundary is offset to a whole hour and time zone (see [Custom daily boundaries](#custom-daily-boundaries-offsets-and-time-zones)).

Full parameter reference: see the API Reference for [`/timeseries/pair-candles`](https://docs.coinmetrics.io/api/v4/#operation/getTimeseriesPairCandles).

## Examples

The example below shows the latest candles for a representative pair. Numeric quantities are returned as JSON strings.

### Example: 1-minute pair candles (`/timeseries/pair-candles`)

The latest one-minute candles for `btc-usd` ([browser](https://api.coinmetrics.io/v4/timeseries/pair-candles?pairs=btc-usd\&frequency=1m\&limit_per_pair=3\&api_key=YOUR_API_KEY)):

```json
{
  "data": [
    {
      "pair": "btc-usd",
      "time": "2026-07-11T06:17:00.000000000Z",
      "price_open": "64149.94",
      "price_close": "64150.05",
      "price_high": "64151.35",
      "price_low": "64147.18"
    },
    {
      "pair": "btc-usd",
      "time": "2026-07-11T06:18:00.000000000Z",
      "price_open": "64150.05",
      "price_close": "64160.9",
      "price_high": "64160.91",
      "price_low": "64150.05"
    },
    {
      "pair": "btc-usd",
      "time": "2026-07-11T06:19:00.000000000Z",
      "price_open": "64160.9",
      "price_close": "64168.72",
      "price_high": "64169.37",
      "price_low": "64160.9"
    }
  ]
}
```

## Coverage

{% embed url="https://coverage.coinmetrics.io/pair-candles-v2" %}

## Usage

* **Market-wide charting.** Pair candles chart a pair's price across the market as a whole, without the idiosyncrasies of any single venue.
* **Cross-venue reference.** Because the price comes from the Reference Rate, a pair candle is a neutral benchmark for a pair, useful for valuation and comparison alongside per-market candles.
* **When to use market candles instead.** For per-exchange price action, or for volume, VWAP, and trade counts, use [market candles](market-candles.md).

## Limitations

* **Price only.** Pair candles carry no volume, VWAP, or trade count. Those quantities are defined per market, not for a cross-exchange reference price.
* **Constituent-driven.** A pair candle reflects the Reference Rate's constituent markets. A pair exists only where Coin Metrics computes a Reference Rate for it.

## FAQ

### How are pair candles different from market candles?

[Market candles](market-candles.md) are computed for a single market from that market's trades, and include volume, VWAP, and a trade count. Pair candles summarize the Coin Metrics cross-exchange Reference Rate for a pair, so they are market-wide and carry price only.

### Why do pair candles have no volume or VWAP?

They summarize a Reference Rate, which is a synthesized cross-exchange price rather than the trades of a single market. Volume, VWAP, and trade counts are properties of individual markets, so they do not apply. Use market candles for those fields.

### What determines the price of a pair candle?

The Coin Metrics Reference Rate for the pair, which is derived from a vetted set of constituent exchange markets. See [Reference Rate](../reference-rates-overview/reference_rate.md) for the methodology.

### How do I get a daily pair candle aligned to a specific time zone, such as a New York close?

Use `timezone`, plus a `1d-HH:00` offset when the boundary is not midnight. For a 4:00 PM New York close, request `frequency=1d-16:00&timezone=America/New_York` (or the shorthand `frequency=1d-ny-close`). The offset must be a whole hour, and the returned `time` values stay in UTC. See [Custom daily boundaries](#custom-daily-boundaries-offsets-and-time-zones).

### What time does the `time` field represent?

The start of the candle interval. A one-minute candle stamped `06:17:00` covers `06:17:00` up to `06:18:00`.

## Related

* [Market Candles](market-candles.md): per-market OHLCV candles computed from trades, with volume and VWAP.
* [Reference Rate](../reference-rates-overview/reference_rate.md): the cross-exchange price that pair candles summarize.
* [Index Candles](../../index-data/index/index-timeseries/index-candles.md): OHLC candles for Coin Metrics indexes.
