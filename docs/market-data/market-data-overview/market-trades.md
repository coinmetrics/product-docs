---
description: /timeseries/market-trades
---

# Trades

### Overview

A trade is the exchange of a financial asset between a buyer and a seller in a single market on a trading venue. The asset can be a cryptoasset, a fiat currency, or a cryptoasset derivatives contract. A trade occurs when a market participant submits an order that matches an existing order resting on the order book. Coin Metrics records the matched price and amount together with the taker's side. Traders, quantitative researchers, and transaction-cost and market-microstructure teams use trades data to measure executed prices and volume, build tick-level histories, and reconstruct market activity.

Coin Metrics collects trades from **spot**, **futures**, and **option** markets across its exchange coverage universe, and from swaps on supported **decentralized exchanges (DeFi)**. The data can be accessed via the following endpoints:

* Historical trades are available over the HTTP endpoint [`/timeseries/market-trades`](https://docs.coinmetrics.io/api/v4#operation/getTimeseriesMarketTrades)
* A real-time streaming feed is available over the websocket endpoint [`/timeseries-stream/market-trades`](https://docs.coinmetrics.io/api/v4#operation/getTimeseriesStreamMarketTrades)

### At a Glance

<table data-full-width="true"><thead><tr><th>Data type</th><th>Entities</th><th width="159">Frequency / cadence</th><th>Unit</th><th>Primary endpoints</th><th>Coverage</th></tr></thead><tbody><tr><td>Market trades (executed trades)</td><td>Markets (spot, futures, options, DeFi)</td><td>Event-driven (one observation per executed trade)</td><td>Price in quote currency. Amount in base asset (spot and DeFi) or contracts (derivatives)</td><td><code>/timeseries/market-trades</code><br><br><code>/timeseries-stream/market-trades</code></td><td><a href="https://coverage.coinmetrics.io/market-trades-v2">🔗</a></td></tr></tbody></table>

### Schema

One observation is a single executed trade. The table below is the response schema for `/timeseries/market-trades`. The websocket feed carries the same fields except where noted.

| Field             | Type               | Description                                                                                                                                                                                                                                                                        | Notes                                                            |
| ----------------- | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| `market`          | string             | Unique name of the market. Spot markets follow `exchange-base-quote-spot`, futures follow `exchange-symbol-future`, and options follow `exchange-symbol-option`. DeFi markets follow `protocol_version_chain-pool-base-quote-spot`, for example `uniswap_v3_eth-1-usdc-weth-spot`. | Required                                                         |
| `time`            | string (date-time) | The exchange-reported event time. ISO 8601, nanosecond precision.                                                                                                                                                                                                                  | Required                                                         |
| `coin_metrics_id` | string             | Identifier of a trade, unique per exchange market. Uses the exchange-reported value when numeric, otherwise derived from the exchange's identifier (see Methodology).                                                                                                              | Required                                                         |
| `amount`          | string (decimal)   | The amount of the base asset traded (or the number of contracts for derivatives).                                                                                                                                                                                                  | Required                                                         |
| `price`           | string (decimal)   | The price of the base asset, quoted in the quote asset, at which the trade executed (or the price of one contract for derivatives).                                                                                                                                                | Required                                                         |
| `side`            | string             | The taker (market order) side. `buy` means an incoming buy order removed an ask from the book. `sell` means an incoming sell order removed a bid.                                                                                                                                  | Optional. Present where the taker side is known                  |
| `database_time`   | string (date-time) | The time Coin Metrics stored the observation. ISO 8601, nanosecond precision.                                                                                                                                                                                                      | Returned by the HTTP endpoint. Not present in websocket messages |
| `collect_time`    | string (date-time) | The feed-handler host clock when the trade was received from the exchange.                                                                                                                                                                                                         | Websocket messages only                                          |
| `cm_sequence_id`  | string             | Per-connection message sequence number for ordering a live stream. Resets on reconnection.                                                                                                                                                                                         | Websocket messages only                                          |
| `mark_price`      | string (decimal)   | The futures' or option's price calculated by the exchange for risk-management purposes.                                                                                                                                                                                            | Futures and options                                              |
| `index_price`     | string (decimal)   | An aggregate price derived from major exchanges, representative of the underlying asset's market-consensus price.                                                                                                                                                                  | Futures and options                                              |
| `iv_trade`        | string (decimal)   | Implied volatility calculated from the trade price.                                                                                                                                                                                                                                | Options only                                                     |
| `liquidation`     | string             | Indicates whether the maker side, taker side, or both sides of the trade are under liquidation.                                                                                                                                                                                    | Futures and options. Present on liquidation trades               |
| `block_hash`      | string             | Swap block hash.                                                                                                                                                                                                                                                                   | DeFi markets only                                                |
| `block_height`    | string (int64)     | Swap block height.                                                                                                                                                                                                                                                                 | DeFi markets only                                                |
| `txid`            | string             | Swap transaction ID.                                                                                                                                                                                                                                                               | DeFi markets only                                                |
| `initiator`       | string             | Swap transaction initiator.                                                                                                                                                                                                                                                        | DeFi markets only                                                |
| `sender`          | string             | Swap caller.                                                                                                                                                                                                                                                                       | DeFi markets only                                                |
| `beneficiary`     | string             | Swap output receiver.                                                                                                                                                                                                                                                              | DeFi markets only                                                |

{% hint style="info" %}
**Conventions.** Prices and amounts are returned as JSON **strings** to preserve precision. Timestamps are UTC ISO-8601 with nanosecond resolution. `time` is the exchange-reported event time. `collect_time` is the feed-handler host clock when the trade was received (websocket feed). `database_time` is when Coin Metrics stored the observation (HTTP endpoint). `side` reflects the taker side. Units are per-field (see the table).
{% endhint %}

### Methodology

#### Collection

Coin Metrics operates real-time feed handlers that connect directly to each exchange's websocket (or REST, where required) and record every executed trade on each subscribed market as it happens. Where an exchange permits querying historical trades, Coin Metrics also backfills that history, collecting from every market starting at the exchange's inception. For DeFi markets, swaps are collected from on-chain events emitted by supported decentralized-exchange protocols.

#### Normalization

Each exchange's native trade message is parsed into a common trade record. Prices and amounts are preserved as exact decimal **strings** and never converted to floating point, so no precision is lost. The exchange's native timestamp resolution is preserved (up to microseconds for some venues) and served at nanosecond precision in UTC.

#### Trade side

`side` is normalized to the **taker** side across all venues. `buy` means an incoming buy order removed a resting ask, and `sell` means an incoming sell order removed a resting bid. Some exchanges report the maker side instead. For those venues, Coin Metrics inverts the reported side so the convention is consistent everywhere.

#### Identifiers

Every trade carries a `coin_metrics_id` that is unique per exchange market, which guarantees each observation is distinct. Even two adjacent trades with identical `time`, `price`, `amount`, and `side` remain separate records. It is derived as follows:

* If the exchange reports a numeric trade id, that value is used as-is.
* If the exchange reports a base-16 (hexadecimal) string id, it is converted to an integer.
* For other string ids, a bijective mapping produces a stable numeric value.
* If the exchange reports no unique id, a synthetic id is derived from the trade's timestamp, price, amount, and side, with a disambiguating counter so that identical trades in the same instant remain distinct.

Some exchanges (for example Coinbase and Binance) use an incremental id that increases by one per trade, which is also useful for sequencing trades and detecting gaps in collection. For DeFi swaps, the identifier encodes on-chain provenance (block and transaction).

#### Deduplication and redundancy

To stay resilient to disconnects and outages, Coin Metrics runs multiple redundant collector instances per exchange. Observations are deduplicated on a composite key of **exchange, market, and trade id**, so every trade persisted to the database is unique regardless of how many collectors observed it. The first record written for a key wins, and later duplicates are discarded rather than overwriting it. As a result, a trade's stored values do not change after the fact, and a given market and time range returns the same trades on every query.

Trades on spot, futures, and option markets are maintained as separate datasets, all served through the same endpoints and distinguished by the market identifier.

#### Timestamps

A trade can carry up to three timestamps. The gaps between them measure collection lag, which is useful for backtests and simulations that need to know exactly what data was available at a given point in time:

* `time`: the exchange-reported event time.
* `collect_time`: the feed-handler host clock when the trade was received from the exchange (websocket feed).
* `database_time`: when Coin Metrics persisted the observation (HTTP endpoint).

#### Derivatives fields

Trades on futures and option markets additionally carry `mark_price` and `index_price`, and option trades carry `iv_trade` (implied volatility derived from the trade price). A `liquidation` flag is set when a side of the trade is under liquidation.

#### Decentralized exchange (DeFi) trades

For decentralized exchanges, each trade is a swap decoded from an on-chain event, so a few properties differ from centralized-exchange trades:

* **Price and amount are derived from the swap.** `price` is the ratio of the swapped token amounts and, by default, is reported net of the pool fee. `amount` is the on-chain token amount. There is no order book, so `side` reflects the direction of the swap (whether the base asset was bought or sold) rather than an order-book taker side.
* **Timestamps are block-level.** `time` is the block's timestamp, so every trade mined in the same block shares it. Trades within a block are ordered by the on-chain log index, which is also the basis of `coin_metrics_id`.
* **On-chain context is included.** `initiator` is the address that sent the transaction, `sender` is the contract or router that called the pool, `beneficiary` is the address that received the swap output, and `block_hash`, `block_height`, and `txid` locate the swap on-chain. `coin_metrics_id` is derived from the block hash, block height, and log index, making it unique and reorg-aware.
* **Trades near the chain tip can be revised.** Because swaps live on-chain, a very recent trade can be removed by a block reorganization. The `min_confirmations` parameter (see Limitations) trades latency against this risk.

### Accessing the Data

Trades are available over HTTP at `/timeseries/market-trades` for historical queries and as a real-time websocket feed at `/timeseries-stream/market-trades`.

#### Historical Trades (HTTP)

{% tabs %}
{% tab title="Python Client" %}
```python
import os
from datetime import timedelta
from coinmetrics.api_client import CoinMetricsClient

client = CoinMetricsClient(os.environ["CM_API_KEY"])

# Trades over a time range, fetched in parallel and returned as a DataFrame.
df = client.get_market_trades(
    markets=["coinbase-btc-usd-spot"],
    start_time="2025-01-01",
    end_time="2025-01-02",
    format="json_stream",
).parallel(time_increment=timedelta(days=1)).to_dataframe()

print(df)

# For just the latest trades, use limit_per_market instead (uses format="json"):
# client.get_market_trades(markets=["coinbase-btc-usd-spot"], limit_per_market=5).to_dataframe()
```
{% endtab %}

{% tab title="Shell" %}
```shell
curl --compressed "https://api.coinmetrics.io/v4/timeseries/market-trades?markets=coinbase-btc-usd-spot&limit_per_market=5&api_key=$CM_API_KEY"
```
{% endtab %}

{% tab title="Python" %}
```python
import os, requests

response = requests.get(
    "https://api.coinmetrics.io/v4/timeseries/market-trades",
    params={"markets": "coinbase-btc-usd-spot", "limit_per_market": 5,
            "api_key": os.environ["CM_API_KEY"]},
).json()
print(response)
```
{% endtab %}
{% endtabs %}

The `markets` parameter accepts a comma-separated list or wildcard patterns such as `coinbase-*`, `binance-*-spot`, or `*-USDT-future`, so you can query many markets in one call.

#### Real-Time Stream (Websocket)

The stream sends each trade as a standalone message as it is executed, carrying a per-connection `cm_sequence_id` for ordering. Use `backfill=latest` (the default) to receive the latest values just before switching to real time, or `backfill=none` to receive only new trades.

{% tabs %}
{% tab title="Python Client" %}
```python
stream = client.get_stream_market_trades(markets=["coinbase-btc-usd-spot"])
stream.run()   # prints trades as they arrive, Ctrl-C to stop
```
{% endtab %}

{% tab title="Shell" %}
```shell
websocat "wss://api.coinmetrics.io/v4/timeseries-stream/market-trades?markets=coinbase-btc-usd-spot&api_key=$CM_API_KEY"
```
{% endtab %}

{% tab title="JavaScript" %}
```javascript
ws = new WebSocket("wss://api.coinmetrics.io/v4/timeseries-stream/market-trades?markets=coinbase-btc-usd-spot&api_key=<YOUR_API_KEY>")
ws.onmessage = m => console.log(m.data)
ws.onclose = () => console.log("closed")
```
{% endtab %}
{% endtabs %}

Full parameter reference: see the API Reference for [`/timeseries/market-trades`](https://docs.coinmetrics.io/api/v4/#operation/getTimeseriesMarketTrades) and [`/timeseries-stream/market-trades`](https://docs.coinmetrics.io/api/v4/#operation/getTimeseriesStreamMarketTrades).

### Examples

Examples below show the latest trades for representative markets. Numeric quantities are returned as JSON strings.

#### Example: spot trade (`/timeseries/market-trades`)

The latest trades from `coinbase-btc-usd-spot` ([browser](https://api.coinmetrics.io/v4/timeseries/market-trades?markets=coinbase-btc-usd-spot\&limit_per_market=3\&api_key=YOUR_API_KEY)):

```json
{
  "data": [
    {
      "market": "coinbase-btc-usd-spot",
      "time": "2026-07-10T22:57:58.913708000Z",
      "coin_metrics_id": "1054020120",
      "amount": "0.00000003",
      "price": "64067.93",
      "database_time": "2026-07-10T22:57:58.923476000Z",
      "side": "sell"
    },
    {
      "market": "coinbase-btc-usd-spot",
      "time": "2026-07-10T22:57:59.150913000Z",
      "coin_metrics_id": "1054020121",
      "amount": "0.00000001",
      "price": "64067.93",
      "database_time": "2026-07-10T22:57:59.186175000Z",
      "side": "sell"
    },
    {
      "market": "coinbase-btc-usd-spot",
      "time": "2026-07-10T22:57:59.629366000Z",
      "coin_metrics_id": "1054020122",
      "amount": "0.00000003",
      "price": "64067.93",
      "database_time": "2026-07-10T22:57:59.664294000Z",
      "side": "sell"
    }
  ]
}
```

#### Example: option trade (`/timeseries/market-trades`)

The latest trades from the `deribit-BTC-25SEP26-62000-P-option` market. Option trades additionally carry `mark_price`, `index_price`, and `iv_trade` ([browser](https://api.coinmetrics.io/v4/timeseries/market-trades?markets=deribit-BTC-25SEP26-62000-P-option\&limit_per_market=3\&api_key=YOUR_API_KEY)):

```json
{
  "data": [
    {
      "market": "deribit-BTC-25SEP26-62000-P-option",
      "time": "2026-07-10T15:05:53.721000000Z",
      "coin_metrics_id": "437498620",
      "amount": "0.1",
      "price": "0.0515",
      "database_time": "2026-07-10T15:05:55.109269000Z",
      "side": "sell",
      "mark_price": "0.05131029",
      "index_price": "63974.42",
      "iv_trade": "0.385"
    },
    {
      "market": "deribit-BTC-25SEP26-62000-P-option",
      "time": "2026-07-10T15:11:12.121000000Z",
      "coin_metrics_id": "437499261",
      "amount": "0.1",
      "price": "0.0513",
      "database_time": "2026-07-10T15:11:12.562626000Z",
      "side": "sell",
      "mark_price": "0.05119338",
      "index_price": "64000.6",
      "iv_trade": "0.3849"
    },
    {
      "market": "deribit-BTC-25SEP26-62000-P-option",
      "time": "2026-07-10T22:56:07.911000000Z",
      "coin_metrics_id": "437525044",
      "amount": "0.1",
      "price": "0.05",
      "database_time": "2026-07-10T22:56:08.645828000Z",
      "side": "buy",
      "mark_price": "0.04988176",
      "index_price": "64084.08",
      "iv_trade": "0.3821"
    }
  ]
}
```

#### Example: DeFi swap (`/timeseries/market-trades`)

The latest trades from the `uniswap_v3_eth-1-usdc-weth-spot` market. DeFi swaps carry on-chain context (`block_hash`, `block_height`, `txid`, `initiator`, `sender`, `beneficiary`), and their `coin_metrics_id` is a Coin Metrics-derived value rather than a numeric exchange id ([browser](https://api.coinmetrics.io/v4/timeseries/market-trades?markets=uniswap_v3_eth-1-usdc-weth-spot\&limit_per_market=3\&api_key=YOUR_API_KEY)):

```json
{
  "data": [
    {
      "market": "uniswap_v3_eth-1-usdc-weth-spot",
      "time": "2026-07-10T22:59:11.000000000Z",
      "coin_metrics_id": "062ISEFEET99BUTLUJ8HSI7557C64QDLU894C2CEI3BFC3I7DGBABNGSS8003D8",
      "amount": "971.045111",
      "price": "0.00055724219842016849482",
      "database_time": "2026-07-10T22:59:26.159668000Z",
      "side": "sell",
      "block_hash": "ee775295fbb5f4d11e48e529d86269b5f21246098e90d6f60e476c16a5de1ce2",
      "block_height": "25505337",
      "txid": "57b04cab80f59c0f86b5fdb37ecafb448965a8a6c9d53b36c66001bd3c89cd14",
      "initiator": "4c5213672f972ae8e3d39d7e3e83d47d39e2f739",
      "sender": "bc1d9760bd6ca468ca9fb5ff2cfbeac35d86c973",
      "beneficiary": "bc1d9760bd6ca468ca9fb5ff2cfbeac35d86c973"
    },
    {
      "market": "uniswap_v3_eth-1-usdc-weth-spot",
      "time": "2026-07-10T22:59:23.000000000Z",
      "coin_metrics_id": "062ISENLMSC09U6MJQUBRA4C7A6AI3NUPREKE61ETTKR4K01T6OHJSVB0G00050",
      "amount": "123.807581",
      "price": "0.00055723500897325339606",
      "database_time": "2026-07-10T22:59:35.676826000Z",
      "side": "sell",
      "block_hash": "f5b71804f8d69ebcbda88c3a8ca90efecedd47182eef69b25001e9b119f3eb04",
      "block_height": "25505338",
      "txid": "ac247555b65c577c6c2f3497cd2d890ae28cda9769a7d87b9425bab875e48347",
      "initiator": "63f2fc7802bbc0a21b7426936e8b0b65ea65d950",
      "sender": "b704fcb4c43bdc030de7ec5e0d5264b99aa3af36",
      "beneficiary": "b704fcb4c43bdc030de7ec5e0d5264b99aa3af36"
    }
  ]
}
```

#### Example: real-time stream (`/timeseries-stream/market-trades`)

Messages from `wss://api.coinmetrics.io/v4/timeseries-stream/market-trades?markets=coinbase-btc-usd-spot`. Each message is a single trade carrying `collect_time` and an incrementing `cm_sequence_id`, and omits `database_time`:

```json
{"market": "coinbase-btc-usd-spot", "time": "2026-07-10T22:57:59.825847000Z", "coin_metrics_id": "1054020123", "amount": "0.00075176", "price": "64067.94", "collect_time": "2026-07-10T22:57:59.833657000Z", "side": "buy", "cm_sequence_id": "0"}
{"market": "coinbase-btc-usd-spot", "time": "2026-07-10T22:57:59.942400000Z", "coin_metrics_id": "1054020124", "amount": "0.00000013", "price": "64067.93", "collect_time": "2026-07-10T22:57:59.950442000Z", "side": "sell", "cm_sequence_id": "1"}
{"market": "coinbase-btc-usd-spot", "time": "2026-07-10T22:58:00.180522000Z", "coin_metrics_id": "1054020125", "amount": "0.00111041", "price": "64067.94", "collect_time": "2026-07-10T22:58:00.188916000Z", "side": "buy", "cm_sequence_id": "2"}
```

### Coverage

{% embed url="https://coverage.coinmetrics.io/market-trades-v2" %}

### Usage

* **Historical (HTTP)** is best for backfills, tick-level histories, and reconstructing executed price and volume. Use `.parallel(time_increment=…)` for large time ranges, and `limit_per_market` for a quick "latest N" look.
* **The websocket stream** is best for consuming trades live in production. Order messages within a connection by `cm_sequence_id`, which resets whenever the connection is re-established.
* **Derivatives markets** expose `mark_price` and `index_price` (and options `iv_trade`), supporting options analytics and basis or funding studies alongside the raw executions.

### Limitations

* **Per-exchange history depth.** Coin Metrics collects the maximum backhistory each exchange permits. Some venues allow querying all historical trades. Others expose only a short recent window, for example the last ~1,000 trades, which bounds how far back that market's history extends.
* **DeFi confirmations.** For DeFi markets, `min_confirmations` (default `2`) controls how many blocks behind the chain tip trades are reported. Lower values reduce latency but increase the chance a trade is later reorganized out of the chain.

### FAQ

#### What is the latency of your trades data?

Latency is the gap between the exchange's event time and when Coin Metrics receives the message. It varies substantially by exchange, so it is more useful as a range than a single figure. The fastest venues deliver in single-digit milliseconds, most sit in the tens to low hundreds of milliseconds, and the slowest reach a few hundred milliseconds at the median.

As a concrete example, Coinbase is among the fastest we collect: a median near 8 ms, a 95th percentile around 11 ms, and a 99th percentile around 13 ms.

These figures compare the exchange's event timestamp (`time`) with our receipt time (`collect_time`). Venues that do not stamp their own messages are excluded, since for them `time` is Coin Metrics' receive time. Latency also depends on network conditions, so treat these as representative rather than guaranteed.

#### What is the historical coverage of your trades data?

Coin Metrics' Bitcoin trades history begins when it started trading on Mt.Gox in July 2010, giving more than a decade of history. Full historical trades are also available from several other early exchanges such as Bitstamp, TheRockTrading, Bitfinex, and Kraken. Some exchanges let users query all of their historical trades while others expose only a short recent window. Coin Metrics always attempts to collect the maximum backhistory possible.

#### How should I interpret the `coin_metrics_id` field?

Each exchange serves trades with a unique identifier (typically a trade id or uid). If it is an integer, Coin Metrics stores it as-is. If it is a base-16 string, it is converted to an integer. Other strings are mapped bijectively to a stable integer. When an exchange provides no unique id, one is derived from the trade's own data. The result is unique per market, so two adjacent trades with identical `time`, `price`, `amount`, and `side` are still distinct records. Some exchanges (for example Coinbase and Binance) use an incremental id that increases by one per trade, which is useful for sequencing and detecting gaps.

#### How do you ensure the data contains no duplicate trades?

The collection system runs multiple instances of each scraper for redundancy. Observations are deduplicated using a composite primary key of exchange, market id, and trade id, so each record inserted into the database is unique.

#### Is there a way to pull data for multiple markets in one API call?

Yes. Every endpoint that accepts the `markets` parameter also accepts wildcards such as `exchange-*`, `exchange-*-spot`, or `*USDT-future`, as well as a comma-separated list of individual markets. Wildcards match any market fitting the pattern, so you do not need to enumerate every market.

#### What is the timestamp resolution of your trades data?

Coin Metrics preserves the exchange-reported timestamp resolution, which reaches microsecond level for some exchanges, and always serves `time` at nanosecond precision.

#### What is the difference between `time` and `database_time`, and why is `database_time` useful?

`time` is the time logged by the exchange, while `database_time` is the time Coin Metrics stored the observation. The gap between them reflects collection lag, which matters for backtests and simulations that need to know exactly what data was available at a given point in time.

#### Why is there no trades data for a particular market?

Coin Metrics begins collecting trades as soon as a new market lists, with no delay, across spot, futures, option, and DeFi markets. If a market you expect is missing, contact info@coinmetrics.io and we will investigate.

#### Why are there multiple trades with the same timestamp for a market?

An incoming taker order can simultaneously match multiple resting orders on the book, producing several trades at the same timestamp. From the available data it is not possible to determine how a particular order matched the others, but each trade remains a unique record even when its timestamp, price, and amount are identical to another's.

#### Do you support decentralized exchanges (DEXes)?

Yes. Coin Metrics collects swaps as trades from major DeFi protocols across several chains, and continues to expand its DeFi universe:

* **Uniswap** (v1, v2, v3, and v4)
* **Sushiswap**
* **Curve**
* **Balancer**
* **Aerodrome** and **Velodrome**

Coverage spans **Ethereum mainnet, Base, Arbitrum, and Optimism**, encoded in the market id as `protocol_version_chain` (for example `uniswap_v3_eth` or `uniswap_v4_base`). DeFi swaps carry on-chain context (block, transaction, and the initiating, sending, and receiving addresses) in addition to the standard trade fields. For the authoritative, current list of DeFi markets, see the [coverage page](https://coverage.coinmetrics.io/market-trades-v2).

#### How does Coin Metrics ensure high levels of data quality and integrity?

See the corresponding entry on the Market Data FAQs page for a detailed explanation.

### Related

* [Market Quotes](quotes.md): level-1 best bid/ask for the same markets.
* [Order Books](order-books.md): the full depth of resting orders that trades execute against.
* [Candles](candles.md): OHLCV bars aggregated from trades.
* [Market Level Liquidations](liquidations/futures-liquidations.md): forced trades on derivatives markets.
* [Reported Volume](volume/volume_reported.md): exchange-reported trading volume.
