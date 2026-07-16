# Market Greeks

## Overview

Option greeks measure how an option's price responds to changes in the factors that drive it. This dataset delivers the standard greeks (delta, gamma, vega, theta, and rho) for individual option markets, exactly as each exchange reports them. It answers a practical question for anyone holding or pricing options: how sensitive is this contract to moves in the underlying, in implied volatility, in the passage of time, and in interest rates? Traders and risk teams use greeks to size positions and construct hedges that achieve a desired exposure.

## At a Glance

<table data-full-width="true"><thead><tr><th>Data type</th><th>Entities</th><th width="159">Frequency / cadence</th><th>Unit</th><th>Primary endpoint</th><th>Coverage</th></tr></thead><tbody><tr><td>Market greeks</td><td>Markets (options)</td><td>Up to one observation per market per minute (deduplicated); <code>granularity</code> supports raw / 1m / 1h / 1d</td><td>Sensitivity values, as reported by the exchange (per greek)</td><td><code>/timeseries/market-greeks</code></td><td><a href="https://coverage.coinmetrics.io/market-greeks-v2">🔗</a></td></tr></tbody></table>

## Schema

Each row is one option market's greeks at a point in time. Values are returned as JSON strings to preserve precision, and greek fields that an exchange does not report are null.

| Field | Type | Description | Notes |
| --- | --- | --- | --- |
| `market` | string | Unique name of the market. Option market ids follow the convention `exchangeName-optionsSymbol-option`. | Required |
| `time` | string (date-time) | The observation time in ISO 8601 date-time format, aligned to the start of the minute (it is `exchange_time` truncated to the minute). Always nanosecond precision. | Required. See [Timestamps](#timestamps) |
| `delta` | string (decimal) | The first derivative of the option's price with respect to the underlying asset's price. | Optional |
| `gamma` | string (decimal) | The second derivative of the option's price with respect to the underlying asset's price. | Optional |
| `vega` | string (decimal) | The first derivative of the option's price with respect to the volatility of the underlying asset's price. | Optional |
| `theta` | string (decimal) | The first derivative of the option's price with respect to the passage of time. | Optional |
| `rho` | string (decimal) | The first derivative of the option's price with respect to the risk-free interest rate. | Optional. Reported by only some venues, otherwise null. See [Sourcing](#sourcing-exchange-reported-greeks) |
| `exchange_time` | string (date-time) | The full-precision timestamp of the observation. For venues that provide their own ticker timestamp this is the exchange's time, otherwise it reflects when the value was collected. Can be null. | Optional. See [Timestamps](#timestamps) |
| `database_time` | string (date-time) | The time Coin Metrics saved the observation to the database, in ISO 8601 date-time format with nanosecond precision. | Required |

{% hint style="info" %}
**Conventions.** Decimal values are returned as JSON strings to preserve precision. Timestamps are UTC ISO-8601 with nanosecond resolution. `time` is the observation time aligned to the start of the minute (it is `exchange_time` truncated to the minute), `exchange_time` is the full-precision timestamp of the observation, and `database_time` is when Coin Metrics saved it. See [Timestamps](#timestamps) for how the three relate. Greek fields that are not reported are null and are omitted from JSON responses.
{% endhint %}

## Methodology

Market greeks are sourced from exchanges and delivered with minimal processing. The subsections below describe where the values come from, how often they are recorded, what each timestamp means, and how the `granularity` parameter shapes the returned series.

### Sourcing: exchange-reported greeks

Greeks are collected directly from each option exchange's ticker feed and passed through unchanged. Coin Metrics does not recompute greeks with its own pricing model. Each value is stored verbatim as the exchange reports it, as a high-precision decimal, with no scaling or rounding applied. Because the values originate with the exchange, the exact set of greeks provided varies by venue. In particular, `rho` is reported by only some venues and is null elsewhere. The unit conventions behind each greek (for example whether theta is expressed per day and vega per one percentage point of volatility) are also defined by the reporting exchange and can differ across venues.

### Collection cadence and deduplication

Each option market's ticker is collected on an ongoing basis. Coin Metrics deduplicates the collected observations so that at most one record is kept per market per minute: the first observation seen within a given minute is retained and later observations in that same minute are discarded. As a result, the raw series contains at most one row per market per minute, and `time` is aligned to the minute.

### Timestamps

Three timestamps accompany every observation, and they are derived from one another rather than being independent.

`exchange_time` is the full-precision timestamp of the observation. When a venue stamps its ticker with its own time, `exchange_time` carries that exchange time. For venues that do not, it reflects the moment Coin Metrics collected the value. Treat it as the precise time of the observation, but not necessarily as the exchange's own clock for every venue.

`time` is `exchange_time` truncated to the start of its minute (the seconds and sub-seconds are zeroed). Because at most one observation is retained per market per minute (the first one seen in that minute, see [Collection cadence and deduplication](#collection-cadence-and-deduplication)), `time` labels the minute while `exchange_time` shows where within that minute the retained observation actually fell. Use `time` to order and join the series (its values are exactly one minute apart), and `exchange_time` when you need the precise moment.

`database_time` is when Coin Metrics saved the observation. It is always populated and lands shortly after `exchange_time`.

### Granularity and downsampling

By default (`granularity=raw`) the endpoint returns every stored observation, up to one per minute. Setting `granularity` to `1m`, `1h`, or `1d` downsamples the series by returning the first observation in each interval and dropping the rest. Downsampling selects existing rows: it does not modify or re-align the values, so the returned `time` values remain the original observation times.

### Availability and timeliness

Greeks are served without an added delay. An observation becomes queryable as soon as it is collected and stored, subject to the one-per-minute deduplication above. The dataset covers option markets only. Per-market history and the current list of covered markets are shown on the [coverage page](https://coverage.coinmetrics.io/market-greeks-v2).

## Accessing the Data

Greeks are served from the `/timeseries/market-greeks` endpoint, keyed by one or more option `markets`. The examples below request a single Deribit BTC option over a one-day window. The Python API Client is the recommended path.

{% tabs %}
{% tab title="Python Client" %}
```python
import os
from datetime import timedelta
from coinmetrics.api_client import CoinMetricsClient

client = CoinMetricsClient(os.environ["CM_API_KEY"])

df = (
    client.get_market_greeks(
        markets=["deribit-BTC-20JUL26-72000-C-option"],
        start_time="2026-07-16",
        end_time="2026-07-17",
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
curl --compressed "https://api.coinmetrics.io/v4/timeseries/market-greeks?markets=deribit-BTC-20JUL26-72000-C-option&start_time=2026-07-16&end_time=2026-07-17&api_key=$CM_API_KEY"
```
{% endtab %}

{% tab title="Python" %}
```python
import os
import requests

url = "https://api.coinmetrics.io/v4/timeseries/market-greeks"
params = {
    "markets": "deribit-BTC-20JUL26-72000-C-option",
    "start_time": "2026-07-16",
    "end_time": "2026-07-17",
    "api_key": os.environ["CM_API_KEY"],
}
print(requests.get(url, params=params).json())
```
{% endtab %}
{% endtabs %}

To retrieve only the most recent values, replace the time range with `limit_per_market=1`. To downsample a long history, add the `granularity` parameter (see [Granularity and downsampling](#granularity-and-downsampling)).

Full parameter reference: see the API Reference for [`/timeseries/market-greeks`](https://docs.coinmetrics.io/api/v4/#operation/getTimeseriesMarketGreeks).

## Examples

### Example: Deribit BTC option greeks

The rows below are consecutive one-minute observations for the `deribit-BTC-20JUL26-72000-C-option` market. This is a Deribit option, so every greek including `rho` and the exchange-reported `exchange_time` is populated. [Open in browser ↗](https://api.coinmetrics.io/v4/timeseries/market-greeks?markets=deribit-BTC-20JUL26-72000-C-option&limit_per_market=3&api_key=YOUR_API_KEY)

```json
{
  "data": [
    {
      "market": "deribit-BTC-20JUL26-72000-C-option",
      "time": "2026-07-16T14:29:00.000000000Z",
      "database_time": "2026-07-16T14:29:02.970981000Z",
      "vega": "1.00642",
      "theta": "-4.64139",
      "rho": "0.03499",
      "delta": "0.00536",
      "gamma": "0.00001",
      "exchange_time": "2026-07-16T14:29:01.202000000Z"
    },
    {
      "market": "deribit-BTC-20JUL26-72000-C-option",
      "time": "2026-07-16T14:30:00.000000000Z",
      "database_time": "2026-07-16T14:30:01.884768000Z",
      "vega": "1.02137",
      "theta": "-4.76075",
      "rho": "0.03557",
      "delta": "0.00545",
      "gamma": "0.00001",
      "exchange_time": "2026-07-16T14:30:00.636000000Z"
    },
    {
      "market": "deribit-BTC-20JUL26-72000-C-option",
      "time": "2026-07-16T14:31:00.000000000Z",
      "database_time": "2026-07-16T14:31:03.022917000Z",
      "vega": "0.98698",
      "theta": "-4.57026",
      "rho": "0.03423",
      "delta": "0.00525",
      "gamma": "0.00001",
      "exchange_time": "2026-07-16T14:31:02.516000000Z"
    }
  ]
}
```

## Coverage

Coverage lists every option market with greeks, along with each market's available time range.

{% embed url="https://coverage.coinmetrics.io/market-greeks-v2" %}

## Limitations

A few properties of this dataset are worth keeping in mind.

* **Option markets only.** Greeks are available for option markets. A request for a spot or futures market returns an error, and non-option markets selected by a pattern are omitted from the response.
* **Exchange-dependent completeness.** Because greeks are passed through from each exchange, the set of populated greeks varies by venue. `rho` is reported by only some venues and is null otherwise. Null greek fields are omitted from JSON responses.
* **Exchange-defined conventions.** Greek values and their unit conventions are those of the reporting exchange. Coin Metrics does not normalize them to a common convention, so values are best compared within a venue.
* **Minute-level resolution.** At most one observation is stored per market per minute, so the dataset does not capture sub-minute changes in greeks.

## FAQ

### Does Coin Metrics calculate the greeks?

No. Greeks are collected as reported by each option exchange and passed through unchanged. Coin Metrics does not recompute them with its own model.

### Why are some greeks, like rho, missing?

Exchanges report different subsets of greeks. `rho` in particular is provided by only some venues. When a value is not reported, the field is null and is omitted from JSON responses.

### Can I get greeks for futures or spot markets?

No. The dataset covers option markets only. Requesting a non-option market returns an error.

### How often do greeks update?

Observations are collected continuously and deduplicated to at most one per market per minute. Use the `granularity` parameter (`raw`, `1m`, `1h`, `1d`) to downsample a long history to a coarser cadence.

### What is the difference between `time` and `exchange_time`?

`time` is `exchange_time` truncated to the start of the minute, and it is the field to sort or join on (its values are exactly one minute apart). `exchange_time` is the full-precision timestamp of the retained observation, so it falls somewhere within the minute labeled by `time`. For venues that provide their own ticker timestamp, `exchange_time` is the exchange's clock. For others, it reflects the collection time.

## Related

* [Market Contract Prices](market-contract-prices.md): mark, index, and estimated settlement prices for the same option and futures markets.
* [Market Implied Volatility](volatility/market-implied-volatility.md): exchange-reported implied volatility for option markets.
* [Market Open Interest](market-open-interest.md): open contracts outstanding for derivatives markets.

## Reviewer Notes

_Delete this entire section before the first commit / MR._

**Mode:** Improve / migration of an existing page onto the standard template. Slug unchanged (`market-greeks.md`), so no rename, no new redirect. Title relabeled "Greeks" → "Market Greeks" per the entity-first naming convention and neighboring pages (Market Contract Prices, Market Open Interest).

**SUMMARY.md:** relabel the existing entry (line ~245) from `* [Greeks](market-data/market-data-overview/market-greeks.md)` to `* [Market Greeks](market-data/market-data-overview/market-greeks.md)`. (Applied in this branch.)

**Inbound links:** `market-data/market-data-overview/README.md` has a `{% content-ref url="market-greeks.md" %}` and an API-endpoint bullet; both remain valid since the slug did not change. Existing redirect `market-data-timeseries/market-greeks → …/market-greeks.md` (docs/.gitbook.yaml) also remains valid.

**Fetch tool warnings:** none.

**Coverage:** verified. `market-greeks-v2` exists (`coverage_found = true`).

**Spec-vs-doc drift:**

* Added to the page: the `granularity` parameter (`raw`/`1m`/`1h`/`1d`), which the old page omitted.
* No field additions/removals vs the spec. Old page listed the same fields; `time` description tightened from the old "the time at which Coin Metrics queried the greeks" to note that it is `exchange_time` truncated to the minute (see the Timestamps subsection).
* Availability: the old page carried no written availability table, so nothing to replace beyond pointing to coverage.

**Dropped from the old page (per Kevin's decision):** the "Chart" section and its `ATM-Option-Chain.png` figure (sourced from CM State of the Market).

**Extracted Release History (removed from page for consolidation elsewhere):**

* CM MDF v2.5 on November 22, 2021 — expanded options coverage to include several new data types (including market implied volatility) from Deribit, and added new API endpoints to serve this data. (https://coinmetrics.io/cm-market-data-feed-v2-5-release-notes/)

**Example refresh:** old page used `deribit-ETH-25MAR22-1200-P-option` (long expired, no fresh data). Replaced with a live ATM contract `deribit-BTC-20JUL26-72000-C-option` (selected as the freshest greeks series at build time). Example values refresh on every run; keep the entity stable.

**Methodology — SME sign-off requested. Source file paths (internal, external-facing body carries none):**

* Collection (octopus):
  * Greeks land verbatim in `OptionTickerData.greek_delta/gamma/theta/vega/rho` — `octopus/src/octopus/data.py:837-841`. No pricing/greek-computation code exists in octopus (grep negative).
  * Exchange adapters parse greeks straight from the ticker: Deribit `octopus/src/octopus/exchange/deribit.py:547-551` (HTTP), `:898-902` (WS) — the only venue that reports `rho`; Bybit `bybit.py:435-439`; OKEx/OKX `okex.py:779-783`; Binance `binance.py:1120-1124` — these three set `greek_rho=None`.
  * Verbatim storage (no scale/round), `NUMERIC` columns — `octopus/src/octopus/storage/postgres/option_ticker.py:50-54`; decimals parsed via `parse_float=Decimal` — `octopus/src/utils/http.py:112-113`.
  * Dedup ≤1 row/market/minute: PK `(ticker_exchange_id, ticker_symbol, ticker_time)` with `ticker_time` minute-floored, `ON CONFLICT … DO NOTHING` — `option_ticker.py:64,188-189`; `truncate_to_minute` — `octopus/src/utils/timeutil.py:118-119`; test `octopus/test/src/octopus/storage/postgres/test_option_ticker.py:54,163-164`.
  * Cadence is mixed by venue (Deribit/Bybit HTTP poll ~30s deployed, Binance/OKEx websocket) but all funnel through the ≤1/min dedup — `octopus/src/octopus/inventory/cp2/ticker_option_realtime.py`, `octopus/src/octopus/generators/deployment/scraper_types/ticker.py:47,110,188`.
* Serving (api4):
  * Options-only guard — `api4/.../timeseries/market/GreeksEndpointImpl.kt:71-75` (non-option explicit market → HTTP 400 "Only option markets are supported."; pattern-matched non-options silently filtered).
  * Reads the option ticker store directly, `time` = stored `ticker_time` passed through, no serve-time dedup — `GreeksEndpointImpl.kt:239,278,289`.
  * No delayed data source (contrast: candles inject a ~20-min delayed source; greeks do not) — `GreeksEndpointImpl.kt` has no Delayed/NonDelayed split.
  * `granularity`: `raw` → no downsampling (all rows); `1m`/`1h`/`1d` → keep FIRST row per aligned interval, original `time` preserved (not re-aligned) — `GreeksEndpointImpl.kt:86-94,268-271`; `api4/.../TimeUtils.kt:296-327`.
  * Nullability: greeks + `exchange_time` nullable and passed through; JSON omits nulls (`allowNullValues=false`), CSV includes all columns (empty for null) — `MarketGreeks.kt:28,42-57`, `GreeksEndpointImpl.kt:147-167,296`.
  * Catalog-v2/catalog-all-v2 market-greeks return `{market, min_time, max_time}` per market from precomputed option-ticker stats — `BaseCatalogMarketService.kt:285-311`.

**Open questions / claims to confirm with SME:**

1. **`time` / `exchange_time` lineage (code-verified end-to-end; body now discloses it neutrally — confirm the wording is OK to publish).** Every collected option-ticker row sets both fields from one source value `X`: `time = truncate_to_minute(X)` (seconds/micros zeroed, `octopus/src/utils/timeutil.py:118-119`) and `exchange_time = X`.
   * `X` = the **exchange's own `timestamp`** only for **Deribit** — HTTP `dt_from_ms(result["timestamp"])` (`octopus/src/octopus/exchange/deribit.py:525,533-534`), WS `dt_from_any(ticker["timestamp"])` (`deribit.py:871,880-881`).
   * `X` = **`datetime.now(UTC)` (collection time)** for **Bybit** (`bybit.py:416,421-422`), **OKEx** (`okex.py:736,765-766`), **Binance** (`binance.py:1093-1094,1106-1107`). Binance's `optionMarkPrice` payload even carries an event-time field `E` that the adapter does **not** use.
   * Consequences the body reflects: (a) the invariant **`time == truncate_to_minute(exchange_time)`** holds for every venue (verified live on both a Deribit option, `exchange_time` 14:29:01.202 → `time` 14:29:00, and a Bybit option where `exchange_time` landed ~23s into the minute yet still truncated to the correct `time` — so the relationship holds regardless of how far into the minute the observation falls, which is why the body does not claim a fixed "few seconds" offset); (b) `exchange_time` is a genuine exchange clock only for Deribit, so the body says "for venues that provide their own ticker timestamp… otherwise it reflects when the value was collected" and avoids the flat "reported by the exchange" claim; (c) the octopus dataclass requires `exchange_time` non-null (`data.py:844-849`) and the insert always writes it, so served nulls would only come from historical/other writers even though `ticker_exchange_time` is nullable in the DDL (`storage/postgres/option_ticker.py:37`). Storage maps `time→ticker_time` (NOT NULL, PK member) and `exchange_time→ticker_exchange_time` (`option_ticker.py:64,131-133,188-189`); serving passes both straight through, `time = ticker_time`, `exchange_time = ticker_exchange_time` null-safe (`api4/.../GreeksEndpointImpl.kt:221,289,296`). **SME: confirm we are comfortable stating publicly that `exchange_time` is not the exchange's clock for non-Deribit venues, or prefer to keep it fully spec-neutral.**
2. **`rho` availability.** Only Deribit reports `rho` today; the other option venues always emit null. Body says "reported by only some venues." Confirm phrasing and whether to name venues (the availability rule keeps specifics on the coverage page).
3. **"Served without an added delay."** Confirm greeks are not subject to the delayed-serving window that applies to options candles. (Code shows no delayed data source for greeks.)
4. **`granularity` downsampling behavior** (first row per interval, original `time` preserved, not boundary-aligned) — confirm this is the intended documented behavior, matching contract-prices.
5. **Unit conventions** (e.g. theta per day, vega per 1% vol) are exchange-defined and not normalized. Confirm the "compare within a venue" guidance in Limitations.

**Fetch tool change (data-tools repo, separate, uncommitted):** registered `/timeseries/market-greeks` in `RAW_ENDPOINTS` (`scripts/productdocs/fetch_doc_facts.py`) with example `deribit-BTC-20JUL26-72000-C-option`; it was previously unregistered (only catalog endpoints existed). Commit separately in data-tools.
