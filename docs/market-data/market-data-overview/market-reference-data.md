# Market Reference Data

## Overview

Market reference data describes every market (a trading pair or a derivative contract) that Coin Metrics collects. It answers a single question: what are the identity, trading rules, and contract terms of a given market? For each market it provides descriptive attributes such as the base and quote assets, the exchange-reported symbol, market status, amount and price precision, fees, and, for derivatives, the full contract specification. It is used to interpret and normalize the trades, quotes, order book, and derivatives data that Coin Metrics publishes for those same markets, and to build or filter a universe of markets to query.

## At a Glance

<table data-full-width="true"><thead><tr><th>Data type</th><th>Entities</th><th width="159">Frequency / cadence</th><th>Unit</th><th>Primary endpoint</th><th>Coverage</th></tr></thead><tbody><tr><td>Market reference data</td><td>Markets</td><td>Reference data, refreshed on an ongoing basis as venues change</td><td>Mixed (per field)</td><td><code>/reference-data/markets</code></td><td><a href="https://coverage.coinmetrics.io/markets-v2">🔗</a></td></tr></tbody></table>

## Schema

The response returns one object per market. Every market carries the core identification fields. The remaining fields are populated only for the market types they apply to, so any single market returns a subset of the schema below. Fields that a venue does not expose are omitted for that market.

### Core identification (all markets)

| Field | Type | Description | Notes |
| --- | --- | --- | --- |
| `market` | string | Unique Coin Metrics name of the market. | Required |
| `exchange` | string | Name of the exchange or venue. | Required |
| `type` | string | Market type. One of `spot`, `future`, or `option`. | Required |
| `base` | string | Coin Metrics name of the base asset. | Optional |
| `quote` | string | Coin Metrics name of the quote asset. | Optional |
| `pair` | string | Pair representation as `<base>-<quote>`. | Optional |
| `symbol` | string | Exchange-reported symbol (full instrument name for derivatives). | Optional |
| `asset_class` | string | Class of the underlying asset. One of `digital`, `equity`, or `fixed_income`. See [Sources, provenance, and asset class](#sources-provenance-and-asset-class). | Optional |
| `source_type` | string | What a price from this source represents. One of `exchange`, `platform`, `composite`, or `evaluated`. See [Sources, provenance, and asset class](#sources-provenance-and-asset-class). | Optional |
| `status` | string | Market status. `online` or `offline`. | Optional |
| `base_native` | string | Exchange-reported name of the base asset. | Optional |
| `quote_native` | string | Exchange-reported name of the quote asset. | Optional |
| `experimental` | boolean | If `true`, collection of the market is under active development and the served data may contain temporary discrepancies. | Optional |

### Trading rules and precision (all markets)

| Field | Type | Description | Notes |
| --- | --- | --- | --- |
| `order_amount_increment` | string (decimal) | Minimum increment by which the order amount can change, in units of the base currency for a spot market or in contract units for a derivatives market. | Optional |
| `order_amount_min` | string (decimal) | Minimum order amount, in units of the base currency for a spot market or in contract units for a derivatives market. | Optional |
| `order_amount_max` | string (decimal) | Maximum order amount, in units of the base currency for a spot market or in contract units for a derivatives market. | Optional |
| `order_price_increment` | string (decimal) | Minimum increment by which the order price can change. The price is quoted in units of the quote currency. | Optional |
| `order_price_min` | string (decimal) | Minimum order price, quoted in units of the quote currency. | Optional |
| `order_price_max` | string (decimal) | Maximum order price, quoted in units of the quote currency. | Optional |
| `order_size_min` | string (decimal) | Minimum order size, where order size is the order amount multiplied by the order price, in units of the quote currency. | Optional |
| `order_taker_fee` | string (decimal) | Taker order fee, expressed in raw units (not percent). | Optional |
| `order_maker_fee` | string (decimal) | Maker order fee, expressed in raw units (not percent). | Optional |
| `margin_trading_enabled` | boolean | Indicates whether the market allows margin trading. | Spot |

### Derivatives contract specifications (futures and options)

| Field | Type | Description | Notes |
| --- | --- | --- | --- |
| `size_asset` | string | Asset that the contract size is denominated in. | Futures, options |
| `margin_asset` | string | Asset that the contract margin is denominated in. | Futures, options |
| `contract_size` | string (decimal) | Number of units of `size_asset` that one contract represents. | Futures, options |
| `tick_size` | string (decimal) | Minimum price increment of the contract price. | Futures, options |
| `multiplier_size` | string (decimal) | Contract multiplier. | Futures |
| `listing` | string (date-time) | Timestamp at which the contract first became available for trading. | Futures, options |
| `expiration` | string (date-time) | Timestamp at which the contract expires. Null for a perpetual future that never expires. | Futures, options |
| `settlement_price` | string (decimal) | Price of the underlying asset at contract expiration. Populated only for expired derivatives. Also called the delivery price. | Options (expired) |
| `strike` | string (decimal) | Strike price of the option contract. | Options |
| `option_contract_type` | string | Option type. `call` or `put`. | Options |
| `is_european` | boolean | Whether the option is European style (as opposed to American style). | Options |

### Traditional securities (equities and fixed income)

Some spot markets represent traditional securities rather than digital assets. These markets carry standard security identifiers and, for fixed-income instruments, term and coupon attributes.

| Field | Type | Description | Notes |
| --- | --- | --- | --- |
| `publisher` | string | Publisher of the market data. | Securities |
| `cusip` | string | CUSIP identifier for the security. | Securities |
| `figi` | string | FIGI identifier for the security. | Securities |
| `isin` | string | ISIN identifier for the security. | Securities |
| `security_type` | string | Type of the security (for example Treasury Bill, Treasury Note, Common Stock). | Securities |
| `security_term` | string | Original term of the security (for example "4-Week", "10-Year"). | Fixed income |
| `description` | string | Description of the security (for example "30-Year Treasury Bond"). | Securities |
| `coupon_rate` | string (decimal) | Coupon rate of the security. | Fixed income |
| `issue_date` | string (date) | Issue date of the security. | Fixed income |
| `maturity_date` | string (date) | Maturity date of the security. | Fixed income |
| `price_per100` | string (decimal) | Price per $100 face value. | Fixed income |

### DeFi and AMM pool markets

DeFi and automated market maker (AMM) markets carry on-chain pool attributes in place of some exchange-style order constraints.

| Field | Type | Description | Notes |
| --- | --- | --- | --- |
| `pool_config_id` | string | DeFi pool configuration identifier. | DeFi |
| `contract_address` | string | On-chain contract address of the pool. | DeFi |
| `base_address` | string | On-chain address of the base asset. | DeFi |
| `quote_address` | string | On-chain address of the quote asset. | DeFi |
| `fee` | string (decimal) | Pool fee, expressed in percent. | DeFi |
| `price_includes_fee` | boolean | Whether the reported price for a trade is inclusive (`true`) or exclusive (`false`) of the fee. | DeFi |
| `variable_fee` | boolean | Whether the market has a variable (`true`) or fixed (`false`) fee structure. | DeFi |

### Provider mappings (optional)

The `talos` field is returned only when `include=talos` is passed. It maps the Coin Metrics market to its counterpart in the Talos security master, so that a user working in Talos identifiers can resolve to Coin Metrics markets and back. It is an array for consistency with other reference-data endpoints, but the mapping is one-to-one. Fields are omitted when the underlying value is null.

| Field | Type | Description | Applies to |
| --- | --- | --- | --- |
| `cm_ext_market` | string | Stable identifier using provider names, for example `talos:coinbase:BTC-USD`. | All |
| `cm_ext_market_by_id` | string | Stable identifier using provider numeric IDs, for example `talos:by-id:1001:24`. | All |
| `market` | string | Exchange or venue name in the provider namespace. | All |
| `market_id` | integer | Numeric market identifier in the provider system. | All |
| `symbol` | string | Trading symbol in the provider notation. | All |
| `security_id` | integer | Numeric security identifier in the provider system. | All |
| `market_symbol` | string | Market symbol as used by the provider. | All |
| `product_type` | string | Product type, for example "Spot" or "Future". | All |
| `base_currency_id` | integer | Provider numeric ID of the base currency. | All |
| `quote_currency_id` | integer | Provider numeric ID of the quote currency. | All |
| `end_time` | string | Time at which the market was delisted in the provider system. | All |
| `display_name` | string | Human-readable display name for the market. | All |
| `normal_size` | string | Normal trading size for the market. | All |
| `description` | string | Human-readable description of the market. | All |
| `base_currency` | string | Base currency code (for example "BTC"). | All |
| `quote_currency` | string | Quote currency code (for example "USD"). | All |
| `position_currency_id` | integer | Provider numeric ID of the position currency. | Spot, futures |
| `settlement_currency` | string | Settlement currency code. | Futures, options |
| `notional_multiplier` | string | Contract notional multiplier. | Futures, options |
| `expiration` | string | Contract expiration date. | Futures, options |
| `settle_value_type` | string | Settlement value type (for example "Regular" or "Inverted"). | Futures, options |
| `size_buckets` | array[object] | Available order size buckets, each with a `size` field. | All |
| `underlying_security_id` | integer | Provider security ID of the underlying. | Futures, options |
| `underlying_quote_currency` | string | Quote currency of the underlying. | Futures, options |
| `counter_currency` | string | Counter currency code for options. | Options |
| `option_type` | string | Option type, for example "Call" or "Put". | Options |
| `strike_price` | string (decimal) | Option strike price. | Options |
| `underlying_code` | string | Underlying asset code. | Options |

{% hint style="info" %}
**Conventions.** Decimal values (prices, sizes, increments, and fees) are returned as JSON strings to preserve precision. Timestamps (`listing`, `expiration`) are UTC ISO-8601 with nanosecond resolution. The `pair`, `base`, and `quote` values use Coin Metrics asset names, while `base_native` and `quote_native` preserve the exchange-reported ticker. Fee fields are expressed in raw units, not percent.
{% endhint %}

## Methodology

### Collection

Coin Metrics polls each centralized venue reference endpoint (the exchange listing of its instruments, products, or symbol definitions) on a regular cadence. A venue-specific parser reads each raw instrument definition and converts it into a common internal representation for spot, futures, or option markets. Records are de-duplicated and stored, and a full history is retained per market so that both current and delisted or expired markets remain available. Because the source is polled continuously, newly listed markets and changes to existing ones (for example a status change or a precision change) are reflected on an ongoing basis.

### Normalization and market naming

The base and quote assets reported by a venue are translated from the venue ticker to the Coin Metrics asset name, while the original venue ticker is retained in `base_native` and `quote_native`. Each market is identified by a canonical Coin Metrics market name built from its components: `<exchange>-<base>-<quote>-spot` for spot markets, `<exchange>-<symbol>-future` for futures, and `<exchange>-<symbol>-option` for options. Decentralized (AMM) markets add the pool configuration identifier to the name, as `<exchange>-<pool_config_id>-<base>-<quote>-spot`, so that different pools for the same pair on the same venue remain distinct. A market is still served even when its base or quote asset is not recognized in the Coin Metrics asset universe. In that case the `base`, `quote`, and `pair` fields are returned as null, while the rest of the metadata (market name, symbol, exchange, and contract specification) is still populated.

### Sources, provenance, and asset class

The first element of every market id is its source: the locus of price formation. The `source_type` field records what a price from that source represents, which lets you filter markets by provenance (for example, to keep only real executions and exclude blended or modeled marks):

* `exchange`: matched on a single venue order book (for example `coinbase`, or the Nasdaq MIC `xnas`).
* `platform`: traded on an over-the-counter or multi-dealer electronic venue (for example `brokertec` or `tradeweb`).
* `composite`: a third-party blend across multiple venues (for example `databento.equs.mini`).
* `evaluated`: modeled, estimated, or officially published, with no live two-sided market (for example an official treasury reference source).

The `asset_class` field records the class of the underlying asset (`digital`, `equity`, or `fixed_income`). Asset class and market type are independent: a bond or an equity is still a `spot` market (an exchange of two assets), and a bond or equity future is a `future`. This keeps the market type set small and stable (`spot`, `future`, `option`) while `asset_class` distinguishes the underlying. Neither `source_type` nor `asset_class` is encoded in the market id itself.

### Market status

The `status` field is normalized to `online` or `offline` from each venue signal for whether an instrument is currently tradable. Instruments a venue marks as disabled or delisted are represented as `offline`, and expired derivatives are retained with their contract terms intact.

### Contract specification harmonization

Harmonizing derivatives contracts across venues is difficult because contract design and conventions vary widely between exchanges. Coin Metrics applies consistent rules to produce comparable fields:

* The margin asset is captured from each venue settlement or margin currency, and the size asset is captured from the contract denomination.
* Where a venue does not explicitly define a contract size and implicitly treats one contract as a single unit of the underlying, the `contract_size` is set to `1`.
* For option markets, the `settlement_price` is populated after the contract expires, once the venue publishes the settling value. This backfill can lag expiration by up to about a day for venues that publish late.
* Perpetual futures are represented with a null `expiration`, and dated futures and options carry an explicit `expiration`.

### Traditional securities

Equities and fixed-income instruments are served as `spot` markets and are distinguished by their security identifiers (`cusip`, `figi`, `isin`) and, where applicable, by `security_type`, `security_term`, and coupon and maturity attributes. This lets a single schema describe both digital-asset markets and traditional-securities markets.

### Decentralized (AMM) markets

Markets on decentralized venues (automated market makers) are produced by a separate on-chain indexer rather than by polling an exchange API. The indexer watches each protocol's pool-creation events on the underlying blockchains (for example Ethereum, Base, Arbitrum, and Optimism), reading them block by block. When a new pool appears it records the pool's on-chain contract address, the on-chain addresses of the two tokens, and the pool fee. It also assigns a pool configuration identifier (`pool_config_id`) that distinguishes different pools trading the same asset pair on the same venue. For concentrated-liquidity designs (such as Uniswap v3) this identifier corresponds to the fixed fee tier. For variable-fee venues it reflects the order in which pools for that pair were created. Two descriptive flags are derived per protocol: `variable_fee` records whether the pool uses a dynamic rather than a fixed fee, and `price_includes_fee` records whether reported trade prices already include the fee. The venue label (for example the Base deployment of Aerodrome's concentrated-liquidity product) is composed from the protocol, its version, and the network. When the market is served, the token addresses are resolved to Coin Metrics asset names, the fee is expressed as a percentage, and the canonical market name is assembled. The `experimental` flag is also applied at this serving stage to mark markets whose collection is still being stabilized. It is not part of the on-chain collection itself.

### Provider identifier mappings

When requested with `include=talos`, each market is enriched with the mapping to the Talos security master. The mapping is resolved by matching on normalized symbols and, where a direct match is not possible, on market type together with the base and quote assets, with a manual review step for the remainder. The mapping data is refreshed frequently so that it stays close to the upstream security master.

## Accessing the Data

Market reference data is served by the `/reference-data/markets` endpoint. Requests are filtered by market attributes such as `markets`, `exchange`, and `type`.

{% hint style="warning" %}
**Use `/reference-data/markets`, not the legacy catalog endpoints.** The `/catalog/*` and `/catalog-all/*` endpoints are deprecated, in particular `/catalog/markets` and `/catalog-all/markets`. Use `/reference-data/markets` for market metadata, and the `/catalog-v2/*` endpoints for data availability.
{% endhint %}

{% tabs %}
{% tab title="Python Client" %}
```python
from coinmetrics.api_client import CoinMetricsClient

client = CoinMetricsClient("YOUR_API_KEY")

# Metadata for specific markets
markets = client.reference_data_markets(
    markets=["coinbase-btc-usd-spot", "binance-BTCUSDT-future"],
).to_dataframe()
print(markets)

# All markets on an exchange, or all markets of a given type
binance = client.reference_data_markets(exchange="binance").to_dataframe()
options = client.reference_data_markets(type="option").to_dataframe()
```
{% endtab %}

{% tab title="Shell" %}
```bash
curl --compressed "https://api.coinmetrics.io/v4/reference-data/markets?markets=coinbase-btc-usd-spot,binance-BTCUSDT-future&api_key=$CM_API_KEY"
```
{% endtab %}

{% tab title="Python" %}
```python
import os
import requests

url = "https://api.coinmetrics.io/v4/reference-data/markets"
params = {
    "markets": "coinbase-btc-usd-spot,binance-BTCUSDT-future",
    "api_key": os.environ["CM_API_KEY"],
}
print(requests.get(url, params=params).json())
```
{% endtab %}
{% endtabs %}

Commonly used query parameters include `markets`, `exchange`, `type`, `base`, `quote`, `asset`, `symbol`, `cusip` / `figi` / `isin` (for securities), and `include` (for provider mappings). Responses are paginated: the Python client follows pagination automatically, while direct HTTP callers page through results using `next_page_token`. Full parameter reference: see the API Reference for [`/reference-data/markets`](https://docs.coinmetrics.io/api/v4/#operation/getReferenceDataMarkets).

## Examples

### Example: spot, futures, and options markets

Metadata for a spot market, a futures market, and an options market. Each market returns only the fields that apply to its type. Browse it live: [`/reference-data/markets`](https://api.coinmetrics.io/v4/reference-data/markets?markets=coinbase-btc-usd-spot,binance-BTCUSDT-future,binance-BNB-240306-370-C-option&api_key=YOUR_API_KEY).

```json
{
  "data": [
    {
      "market": "binance-BTCUSDT-future",
      "exchange": "binance",
      "type": "future",
      "base": "btc",
      "quote": "usdt",
      "pair": "btc-usdt",
      "symbol": "BTCUSDT",
      "asset_class": "digital",
      "source_type": "exchange",
      "size_asset": "btc",
      "margin_asset": "usdt",
      "contract_size": "1",
      "tick_size": "0.1",
      "listing": "2019-09-08T17:55:00.000000000Z",
      "order_amount_increment": "0.001",
      "order_amount_min": "0.001",
      "order_amount_max": "1000",
      "order_price_increment": "0.10",
      "order_price_min": "556.80",
      "order_price_max": "4529764",
      "base_native": "BTC",
      "quote_native": "USDT"
    },
    {
      "market": "coinbase-btc-usd-spot",
      "exchange": "coinbase",
      "type": "spot",
      "base": "btc",
      "quote": "usd",
      "pair": "btc-usd",
      "symbol": "BTC-USD",
      "asset_class": "digital",
      "source_type": "exchange",
      "status": "online",
      "order_amount_increment": "0.00000001",
      "order_price_increment": "0.01",
      "order_price_min": "0.01",
      "order_size_min": "1",
      "margin_trading_enabled": false,
      "base_native": "BTC",
      "quote_native": "USD"
    },
    {
      "market": "binance-BNB-240306-370-C-option",
      "exchange": "binance",
      "type": "option",
      "base": "bnb",
      "quote": "usdt",
      "pair": "bnb-usdt",
      "symbol": "BNB-240306-370-C",
      "asset_class": "digital",
      "source_type": "exchange",
      "size_asset": "bnb",
      "margin_asset": "usdt",
      "strike": "370",
      "option_contract_type": "call",
      "is_european": true,
      "contract_size": "1",
      "expiration": "2024-03-06T08:00:00.000000000Z",
      "order_amount_increment": "0.01",
      "order_amount_min": "0.01",
      "order_amount_max": "3000",
      "order_price_increment": "0.1",
      "order_price_min": "0.1",
      "order_taker_fee": "0.0003",
      "order_maker_fee": "0.0003",
      "base_native": "BNB",
      "quote_native": "USDT"
    }
  ]
}
```

### Example: DeFi and AMM pool market

A DeFi market carries on-chain pool attributes (addresses, pool configuration, and fee structure) in place of some exchange-style order constraints. Browse it live: [`/reference-data/markets`](https://api.coinmetrics.io/v4/reference-data/markets?markets=aerodrome_slipstream_base-1-aero_base.eth-cbbtc_base.eth-spot&api_key=YOUR_API_KEY).

```json
{
  "data": [
    {
      "market": "aerodrome_slipstream_base-1-aero_base.eth-cbbtc_base.eth-spot",
      "exchange": "aerodrome_slipstream_base",
      "type": "spot",
      "base": "aero_base.eth",
      "quote": "cbbtc_base.eth",
      "pair": "aero_base.eth-cbbtc_base.eth",
      "asset_class": "digital",
      "source_type": "exchange",
      "pool_config_id": "1",
      "contract_address": "dfe5f275020def30993f042174fc2d335678b626",
      "price_includes_fee": true,
      "variable_fee": true,
      "base_address": "940181a94a35a4569e4529a3cdfb74e38fd98631",
      "quote_address": "cbb7c0000ab88b473b1f5afd9ef808440eed33bf",
      "experimental": true
    }
  ]
}
```

### Example: Talos provider mapping

Requesting `include=talos` adds the mapping to the Talos security master, including any available size buckets. Browse it live: [`/reference-data/markets`](https://api.coinmetrics.io/v4/reference-data/markets?markets=coinbase-btc-usd-spot&include=talos&api_key=YOUR_API_KEY).

```json
{
  "data": [
    {
      "market": "coinbase-btc-usd-spot",
      "exchange": "coinbase",
      "type": "spot",
      "base": "btc",
      "quote": "usd",
      "pair": "btc-usd",
      "symbol": "BTC-USD",
      "asset_class": "digital",
      "source_type": "exchange",
      "status": "online",
      "order_amount_increment": "0.00000001",
      "order_price_increment": "0.01",
      "order_price_min": "0.01",
      "order_size_min": "1",
      "margin_trading_enabled": false,
      "base_native": "BTC",
      "quote_native": "USD",
      "talos": [
        {
          "cm_ext_market": "talos:coinbase:BTC-USD",
          "cm_ext_market_by_id": "talos:by-id:1001:24",
          "market": "coinbase",
          "market_id": 1001,
          "symbol": "BTC-USD",
          "security_id": 24,
          "market_symbol": "BTC-USD",
          "product_type": "Spot",
          "base_currency_id": 24,
          "quote_currency_id": 2,
          "display_name": "BTC-USD",
          "normal_size": "0.5",
          "description": "Bitcoin / U.S. Dollar",
          "base_currency": "BTC",
          "quote_currency": "USD",
          "size_buckets": [
            {"size": "0.5"},
            {"size": "2.5"},
            {"size": "5"},
            {"size": "25"},
            {"size": "50"}
          ],
          "position_currency_id": 24
        }
      ]
    }
  ]
}
```

## Coverage

{% embed url="https://coverage.coinmetrics.io/markets-v2" %}

## Usage

The standard workflow is to look up the markets you want here, then pull their data from the timeseries endpoints. This is the general pattern of finding the entities first, then constructing valid calls to fetch their data.

1. **Discover markets.** Query `/reference-data/markets` to find markets by attribute (`exchange`, `type`, `base`, `quote`, `asset`, `asset_class`, or a security identifier). This returns each market id along with its contract terms.
2. **Check data availability.** For the dataset you want (trades, quotes, order books, candles, funding rates, and so on), query the matching `/catalog-v2/market-*` endpoint (for example `/catalog-v2/market-trades`) to see which of those markets carry that data and over what time range.
3. **Construct the call.** Join the two on the market id, filter on the time range and any other attributes, then call the corresponding `/timeseries/*` endpoint (for example `/timeseries/market-trades`) with the resulting market list and time window.

The metadata is also used to interpret the data once you have it. Fields such as `contract_size`, `tick_size`, and the amount and price increments define how a venue quotes size and price, and the contract-specification fields let you separate perpetual from dated futures or distinguish margining styles. Provider identifiers can be resolved between Coin Metrics and the Talos security master using `include=talos`.

## Limitations

* **Field availability varies by venue.** Exchanges differ in which fields they expose. When a field is not available from a venue and cannot be reliably determined, it is omitted for that market.
* **Implicit contract sizes are set to `1`.** Where a venue does not explicitly define a contract size and treats one contract as a single unit of the underlying, `contract_size` is reported as `1`.
* **Settlement prices are backfilled.** For options, `settlement_price` appears only after expiry and can lag by up to about a day for venues that publish late.
* **Experimental markets may be unstable.** Markets flagged `experimental` are still being stabilized and their served data may contain temporary discrepancies.

## FAQ

### Do all exchanges offer these metadata fields?

Exchanges vary in which fields they offer through their API. If an exchange does not offer a particular field, Coin Metrics consults the exchange published documentation and populates some fields from it. If neither the exchange API nor its documentation can be used to populate a field, that field is omitted from the response for that market.

### Is the `margin_asset` the asset of settlement?

Yes. The `margin_asset` is the asset of settlement. A trader posts this asset as the initial margin when opening a position. Unrealized gains and losses are calculated in this asset, and a trader receives gains or losses denominated in this asset when the position is closed or the contract expires.

### How can I identify perpetual, dated, linear, inverse, and quanto contracts?

The `type` parameter filters to `spot`, `future`, or `option`, but the futures sub-type is not a separate field. You can derive it from the served fields:

* **Perpetual vs dated.** Perpetual contracts have a null `expiration`. Dated futures and options carry an explicit `expiration`.
* **Linear (stablecoin or fiat margined).** The `margin_asset` equals the `quote` asset (for example a `usdt`-margined contract). Margin and profit and loss are denominated in the quote currency.
* **Inverse (coin margined).** The `margin_asset` equals the `base` asset (for example a `btc`-margined contract). Margin and profit and loss are denominated in the base coin.
* **Quanto.** The `margin_asset` is neither the `base` nor the `quote` asset. The contract settles in a third, unrelated asset.

Requesting `include=talos` adds a `settle_value_type` field to the `talos` mapping that gives a more direct signal for these settlement styles.

## Related

* [Trades](market-trades.md): tick-level trade data for these markets.
* [Quotes](quotes.md): top-of-book quote data.
* [Order Books](order-books.md): order book snapshots and updates.
* [Market Candles](market-candles.md): OHLCV candles.
* [Pair Candles](pair-candles.md): OHLC candles for a cross-exchange asset pair.
* [Contract Prices](market-contract-prices.md): index, mark, and settlement prices for derivatives.
* [Funding Rates](funding-rates/funding-rates.md): funding rates for perpetual futures.
* [Open Interest](open_interest/market-open-interest.md): open interest for derivatives.
