# Quotes

## Contents
* [Market Quotes](#market)
* [Pair Quotes](#pair)
* [Asset Quotes](#asset)

## Definition

Quotes consist of the best bid and the best ask for a market at a given point in time. The best bid represents the highest price that a buyer is willing to pay for one unit of the base asset for a spot market or one contract for a derivatives market. The best ask represents the lowest price that a seller is willing to sell.&#x20;

Coin Metrics collects quotes representing the best bid order and best ask order residing at the top of the order book for individual markets like `coinbase-btc-usd-spot`. To calculate our pair quotes, we aggregate the quotes across a selection of high-quality constituent markets to derive quotes for a pair like `btc-usd`.&#x20; To calculate our asset quotes, we aggregate the quotes across a selection of high-quality constituent markets to derive quotes for an asset like `btc`.&#x20;

Our quotes are conceptually similar to the National Best Bid Offer (NBBO), a regulation issued by the United States Securities and Exchange Commission that requires brokers to execute customer trades at the best available price.

# Market Quotes <a name="market"></a>

## Details

Quotes data is derived from our order book snapshot data by extracting the best bid and best ask. We serve quotes data through a separate endpoint as a convenience for users.&#x20;

Coin Metrics stores three types of order book snapshots. One type consists of a snapshot of the top 100 bids and top 100 asks taken once every 10 seconds for major markets. The second type includes all levels where the price is within 10 percent of the midprice taken once every 10 seconds. The third type consists of a full order book snapshot (every bid and every ask) taken once every hour for all markets that we are collecting order book data for. Quotes derived from these snapshots are served through our HTTP API endpoint [`/timeseries/market-quotes`](https://docs.coinmetrics.io/api/v4#operation/getTimeseriesMarketQuotes).&#x20;

Coin Metrics also serves quotes in real-time for major markets through our websocket API endpoint [`/timeseries-stream/market-quotes`](https://docs.coinmetrics.io/api/v4#operation/getTimeseriesStreamMarketQuotes).&#x20;

For more information about our quotes data, please reference our [market order book](https://docs.coinmetrics.io/market-data/market-order-book) page.&#x20;

## API Endpoints

Market quotes can be accessed using the `timeseries/market-quotes` and `timeseries-stream/market-quotes` for markets.

{% swagger src="../../.gitbook/assets/openapi.yaml" path="/timeseries/market-quotes" method="get" %}
[openapi.yaml](../../.gitbook/assets/openapi.yaml)
{% endswagger %}

{% swagger src="../../.gitbook/assets/openapi.yaml" path="/timeseries-stream/market-quotes" method="get" %}
[openapi.yaml](../../.gitbook/assets/openapi.yaml)
{% endswagger %}

## **Example**

An sample of the quotes data the `coinbase-btc-usd-spot` market from our [`/timeseries/market-quotes`](https://docs.coinmetrics.io/api/v4#operation/getTimeseriesMarketQuotes) API endpoint is provided below.

```
{
  "data": [
    {
      "time": "2020-06-08T21:14:48.215145000Z",
      "market": "coinbase-btc-usd-spot",
      "coin_metrics_id": "1591479594286046-27326992",
      "ask_price": "9685.02",
      "ask_size": "0.04340557",
      "bid_price": "9685.01",
      "bid_size": "0.00484254"
    }
  ]
}
```

*   **`market`**:  The id of the market. Market ids use the following naming convention: `exchangeName-baseAsset-quoteAsset-spot` for spot markets, `exchangeName-futuresSymbol-future` for futures markets, and `exchangeName-optionsSymbol-option` for options markets.&#x20;


* **`time`**:  The exchange-reported time in ISO 8601 date-time format.\

* **`coin_metrics_id`**:   Unique identifier of the order snapshot.\

* **`ask_price`**:  The price of the ask on the order book in units of the quote currency.\

* **`ask_size`**: The size of the ask on the order book in units of the base asset for a spot market or number of contracts for a derivatives market.\

* **`bid_price`**:  The price of the bid on the order book in units of the quote currency.\

* **`bid_size`**: The size of the bid on the order book in units of the base asset for a spot market or number of contracts for a derivatives market.

## Frequently Asked Questions&#x20;

Since our quotes data is derived from our order book data, please reference our [market order book](https://docs.coinmetrics.io/market-data/market-order-book) page for many frequently asked questions about order book data.&#x20;

{% content-ref url="market-order-book.md" %}
[market-order-book.md](market-order-book.md)
{% endcontent-ref %}

## **Release History**

* **CM MDF v1.0 on April 2019:** Quotes for major `btc-usd` and `eth-usd` markets. \

* **CM MDF v1.0 on July 30, 2019:** Added support for websocket endpoint which serves quotes in real-time. \

* [**CM MDF v2.0 on December 9, 2019**](https://coinmetrics.io/release-of-cm-market-data-feed-version-2-0/)**:** Expanded coverage universe to include `cex.io-btc-usd` and  `bitflyer-btc-spot`.\

* [**CM MDF v2.4 on September 1, 2021**](https://coinmetrics.io/cm-market-data-feed-v2-4-release-notes/)**:** Expanded our coverage universe to additional markets on Coinbase, Binance, FTX, Bitfinex, itBit. \

*   [**CM MDF v2.5 on November 22, 2021**](https://coinmetrics.io/cm-market-data-feed-v2-5-release-notes/)**:** Expanded our coverage universe to additional spot markets on Binance, Binance.US, Bitfinex, bitFlyer, Bitstamp, Bittrex, CEX.io, Coinbase, FTX, Gemini, Huobi, itBit, Kraken, Kucoin, Liquid, and LMAX. Initiated coverage of futures markets on Binance, Bitfinex, bitFlyer, BitMEX, Bybit, Deribit, FTX, Huobi, Kraken, OKEx. Initiated real-time coverage of CME market quotes.        &#x20;

    &#x20;                                  &#x20;
* [**CM MDF v2.7 on October 24, 2022**](https://coinmetrics.io/cm-market-data-feed-v2-7-release-notes/)**:** Expanded our market coverage to include every single market, both spot and futures, on the following 12 exchanges: Binance, Binance.US, Bybit, Coinbase, Deribit, FTX, FTX.US, Gemini, HitBTC, Huobi, Kraken, OKEx. Began storing every single quote update in flat files starting in February 2022, suitable for any use cases that require historical data.

## **Availability**

The previous 24 hours of quotes data is available through our Community API.  Community data is available via HTTP API only and is limited to 10 API requests per 6 seconds per IP address. All of our order book data is available through our professional API with higher rate limits. &#x20;

Our coverage universe is expanding rapidly. Please contact us at info@coinmetrics.io for the latest quotes coverage.&#x20;


# Pair Quotes <a name="pair"></a>

Our `/timeseries-stream/pair-quotes` endpoints supports multiple aggregation methods to aggregate the quotes data from individual constituent markets for a given pair. The different aggregation methods can be specified using the `aggregation_method` parameter.&#x20;

Currently, only the `aggregated_spread` method is implemented, and alternative methods will be implemented in the future.

## Aggregated Spread <a name="agg_spread"></a>

The `aggregated_spread` method uses the following methodology:

For a given pair, select major spot markets where the market contains the given pair. For each market i, calculate the bid ask spread in percentage terms and the midprice:

$$
MidpointPrice_i = \frac{BestAskPrice_i + BestBidPrice_i}{2}
$$

$$
Spread_i = \frac{BestAskPrice_i - BestBidPrice_i}{MidpointPrice_i}
$$

Calculate the weighted-average bid-ask spread and weighted-average midprice where the weight is determined by Volume\_i, the cumulative volume over some time period \[t-1, t] on market i. The advantage of using a trailing volume as opposed to other volume measures, such as order size at the top of the book, is that volume indicates the real contribution of a given exchange to the market. Using order sizes from the book would allow for the random behavior of market participants to bias the aggregate in a way that does not represent the actual contribution of an exchange to the broader crypto market. Using these weights will measure the trading activity actually realized on a market at a given spread. In this way, the volume-weighted spread (as opposed to size-weighted spread) will indicate the spread that is realized via real volume for a given asset or asset-pair.

$$
AvgMidpointPrice = \frac{\sum_{i=1}^{n} Volume_i \times MidpointPrice_i}{\sum_{i=1}^{n} Volume_i}
$$

$$
AvgSpread = \frac{\sum_{i=1}^{n} Volume_i \times Spread_i}{\sum_{i=1}^{n} Volume_i}
$$

Using weighted-average midprice and weighted-average spread, calculate the aggregated bid and aggregated ask. The aggregated bid amount and aggregated ask amount are the sum of bid amounts and ask amounts from major markets, respectively.

$$
AggBidPrice = AvgMidpointPrice - 0.5 \times AvgSpread \times AvgMidpointPrice
$$

$$
AggAskPrice = AvgMidpointPrice + 0.5 \times AvgSpread \times AvgMidpointPrice
$$

$$
AggBidAmount = \sum_{i=1}^{n} BestBidAmount_i
$$

$$
AggAskAmount = \sum_{i=1}^{n} BestAskAmount_i
$$

## API Endpoints

Pair quotes can be accessed using the `timeseries-stream/pair-quotes` endpoints.

{% swagger src="../../.gitbook/assets/openapi.yaml" path="/timeseries-stream/pair-quotes" method="get" %}
[openapi.yaml](../../.gitbook/assets/openapi.yaml)
{% endswagger %}

## Example

```
{
  "time": "2020-06-08T21:15:45.771742000Z",
  "pair": "btc",
  "ask_price": "24343.725954328216",
  "ask_size": "2.96375165",
  "bid_price": "24342.036360171896",
  "bid_size": "12.00588437",
  "mid_price": "24342.881157250056",
  "spread": "0.0000694081421754166",
  "cm_sequence_id": "0"
}
```

* **`time`**:  The exchange-reported time in ISO 8601 date-time format. Always with nanoseconds precision.\

* **`pair`**: The id of the pair.\

* **`ask_price`**: The price of the ask order in units of the quote currency as determined by the aggregation method.\

* **`ask_size`**: The size of the ask order in units of the base asset as determined by the aggregation method.\

* **`bid_price`**: The price of the bid order in units of the quote currency as determined by the aggregation method.\

* **`bid_size`**: The size of the bid order in units of the base asset as determined by the aggregation method.\

* **`mid_price`**: The average of the **`ask_price`** and **`bid_price`**.\

* **`spread`**: The bid-ask spread in raw units.\

* **`cm_sequence_id`**: The sequence id number of the websocket message.


# Asset Quotes <a name="asset"></a>

Our `/timeseries-stream/asset-quotes` endpoint supports multiple aggregation methods to aggregate the quotes data from individual constituent markets for a given asset. The different aggregation methods can be specified using the `aggregation_method` parameter.&#x20;

Currently, only the [`aggregated_spread`](#agg_spread) method is implemented, and alternative methods will be implemented in the future.

## API Endpoints

Asset quotes can be accessed using the `/timeseries-stream/asset-quotes` endpoint.

{% swagger src="../../.gitbook/assets/openapi.yaml" path="/timeseries-stream/asset-quotes" method="get" %}
[openapi.yaml](../../.gitbook/assets/openapi.yaml)
{% endswagger %}

## Example

```
{
  "time": "2020-06-08T21:15:45.771742000Z",
  "asset": "btc",
  "ask_price": "24343.725954328216",
  "ask_size": "2.96375165",
  "bid_price": "24342.036360171896",
  "bid_size": "12.00588437",
  "mid_price": "24342.881157250056",
  "spread": "0.0000694081421754166",
  "cm_sequence_id": "0"
}
```

* **`time`**:  The exchange-reported time in ISO 8601 date-time format. Always with nanoseconds precision.\

* **`asset`**: The id of the asset.\

* **`ask_price`**: The price of the ask order in units of the quote currency as determined by the aggregation method.\

* **`ask_size`**: The size of the ask order in units of the base asset as determined by the aggregation method.\

* **`bid_price`**: The price of the bid order in units of the quote currency as determined by the aggregation method.\

* **`bid_size`**: The size of the bid order in units of the base asset as determined by the aggregation method.\

* **`mid_price`**: The average of the **`ask_price`** and **`bid_price`**.\

* **`spread`**: The bid-ask spread in raw units.\

* **`cm_sequence_id`**: The sequence id number of the websocket message.

## Frequently Asked Questions

### What are the constituent markets used in the calculation?

Coin Metrics uses our [Trusted Exchange Framework v2.0](https://coinmetrics.io/special-insights/trusted-exchange-framework/) to seelct a set of high-quality and trustworthy exchanges in selection of our constituent markets. The set of exchanges includes `Bitstamp`, `Coinbase`, `Bitfinex`, `Binance`, `Gemini`, `Kraken`, `OKEx`, `Huobi`, `Binance.US`, `KuCoin`, `LMAX`, and `Bybit`.&#x20;

Coin Metrics performed an analysis of the distribution of volume across markets with different quote currencies and selected all major quote currencies such that we capture over 95 percent of the available volume for each asset. The selected quote currencies are: `usd`, `usdt`, `usdc`, `busd`, `eur`, `try`.&#x20;

All markets from trusted exchanges for which the given asset is the base asset and the quote asset is listed above are selected.

### **How often is the data updated?**

Our websocket API will send a new message once every 250 milliseconds.

## Release History

* **CM Market Data Feed v2.8 on May 2023**.

## Availability

The asset quotes are currently available for the following assets: `btc`, `eth`, `ltc`, `xrp`, `bnb`, `usdt`, `trx` `link`, `doge`, `usdc`, `ada`, `atom`, `matic`, `dai`, `sol`, `dot`, `avax`, `uni`.

