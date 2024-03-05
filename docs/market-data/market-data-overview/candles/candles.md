# Candles

## **Definition**

Candles consist of summary statistics derived from individual trades that describe the trading activity of a market or pair over an interval of time.

## **Details**

Coin Metrics engineers several statistics based on trades data that occurred over an interval of time: opening price, high price, low price, close price, volume-weighted average price, total volume in base asset units, total volume in U.S. dollars, and number of trades in the interval\*\*.\*\*

Candles are generated at regular time intervals and at a time granularity that is suitable for charting and analysis. For instance, several technical analysis indicators can be calculated using data in candles format.

We produce our candles at `1m`, `5m`, `10m`, `15m`, `30m`, `1h`, `4h`, `1d` intervals. Our candles are calculated directly from our [trades data](https://docs.coinmetrics.io/market-data/market-trades). We construct gapless candles which means that if there are no trades in a candle interval, we fill forward candles through time, setting the open, high, low, and close to the close of the previous candle, setting the vwap to the vwap of the previous candle, and setting the volume to zero.

Coin Metrics calculates candles for **spot** and **future** markets from exchanges that are listed on our exchange coverage universe.

## API Endpoints

Candles can be accessed using the `timeseries/market-candles` or `timeseries/pair-candles` endpoint.

{% swagger src="../../.gitbook/assets/openapi.yaml" path="/timeseries/market-candles" method="get" %}
[openapi.yaml](../../.gitbook/assets/openapi.yaml)
{% endswagger %}

{% swagger src="../../.gitbook/assets/openapi.yaml" path="/timeseries/pair-candles" method="get" %}
[openapi.yaml](../../.gitbook/assets/openapi.yaml)
{% endswagger %}

### Example
**Market Candles**

An sample of the candles data from the `coinbase-btc-usd-spot` market from our [`/timeseries/market-candles`](https://docs.coinmetrics.io/api/v4/#operation/getTimeseriesMarketCandles) API endpoint is provided below.

```
{
  "data": [
    {
      "time": "2020-06-08T20:45:00.000000000Z",
      "market": "coinbase-btc-usd-spot",
      "price_open": "9705.07999999999993",
      "price_close": "9705.01000000000022",
      "price_high": "9706.19000000000051",
      "price_low": "9705",
      "vwap": "9705.1686505895068",
      "volume": "16.8066639099999975",
      "candle_usd_volume": "16.8066639099999975",
      "candle_trades_count": "212"
    },
    {
      "time": "2020-06-08T20:50:00.000000000Z",
      "market": "coinbase-btc-usd-spot",
      "price_open": "9705",
      "price_close": "9696.27000000000044",
      "price_high": "9705",
      "price_low": "9695.71999999999935",
      "vwap": "9698.38894423754937",
      "volume": "14.7672128699999963",
      "candle_usd_volume": "14.7672128699999963",
      "candle_trades_count": "215"
    }
  ]
}
```

* **`time`**: The time of the beginning of the candle interval in ISO 8601 date-time format.\\
* **`market`**: The id of the market. Market ids use the following naming convention: `exchangeName-baseAsset-quoteAsset-spot` for spot markets, `exchangeName-futuresSymbol-future` for futures markets, and `exchangeName-optionsSymbol-option` for options markets.
* **`price_open`**: The opening price of the candle.\\
* **`price_high`**: The high price of the candle.\\
* **`price_low`**: The low price of the candle.\\
* **`price_close`**: The close price of the candle.\\
* **`vwap`**: The volume-weighted average price of the candle.\\
* **`volume`**: The volume of the candle in units of the base asset.\\
* **`candle_usd_volume`**: The volume of the candle in units of U.S. dollars. \\
* **`candle_trades_count`**: The number of trades in the candle interval.

**Pair Candles**

An sample of the pair candles data for the \`btc-usdfrom our [`/timeseries/pair-candles`](https://docs.coinmetrics.io/api/v4/#tag/Timeseries/operation/getTimeseriesPairCandles) API endpoint is provided below.&#x20;

```
{
  "data" : [ {
    "pair" : "btc-usd",
    "time" : "2023-04-26T00:00:00.000000000Z",
    "price_open" : "28304.42",
    "price_close" : "28426.08",
    "price_high" : "30018.97",
    "price_low" : "27261.85"
  }, {
    "pair" : "btc-usd",
    "time" : "2023-04-27T00:00:00.000000000Z",
    "price_open" : "28426.08",
    "price_close" : "29486.73",
    "price_high" : "29890.83",
    "price_low" : "28390"
  }, {
    "pair" : "btc-usd",
    "time" : "2023-04-28T00:00:00.000000000Z",
    "price_open" : "29486.96",
    "price_close" : "29338.63",
    "price_high" : "29606.45",
    "price_low" : "28917"
  }, {
    "pair" : "btc-usd",
    "time" : "2023-04-29T00:00:00.000000000Z",
    "price_open" : "29338.63",
    "price_close" : "29248.18",
    "price_high" : "29464.59",
    "price_low" : "29059.33"
  }, {
    "pair" : "btc-usd",
    "time" : "2023-04-30T00:00:00.000000000Z",
    "price_open" : "29249.45",
    "price_close" : "29238.87",
    "price_high" : "29969.22",
    "price_low" : "29106.68"
  } ]
}
```

* **`time`**:  The time of the beginning of the candle interval in ISO 8601 date-time format.\

* **`pair`**:  The id of the pair. \

* **`price_open`**:   The opening price of the candle.\

* **`price_high`**:  The high price of the candle.\

* **`price_low`**:  The low price of the candle.\

* **`price_close`**: The close price of the candle.

## Frequently Asked Questions

**How come the pair candles does not include volume?**

Our pair candles are calculated from our CM Reference Rates with 1 second frequency, not from all trades from markets that contain this particular pair. Therefore, since the underlying data only includes price, volume is not calculated. We understand this can be a limitation to some users and plan on adding volume in a future release.

**Why are pair candles calculated from CM Reference Rates instead of trades?**

We use our CM Reference Rates with 1 second frequency as the underlying data to calculate our pair candles to ensure that our pair candles represent a robust price that is resistant to outliers and anomalies. If we used trades data from all markets that contain a pair, the data would likely be adversely affected by flash crashes and outliers that may occur on a single market. These outliers and anomalies would show up in either the open, high, low, or close prices. Our CM Reference Rates are resistant to these outliers.

## **Release History**

* [CM Market Data Feed v2.6 on July 13, 2022](https://coinmetrics.io/cm-market-data-feed-v2-6-release-notes/)

## **Availability**

The availability for pair candles is identical to the coverage for our CM Reference Rates below. They are only available for pairs with `usd` as the quote currency.

{% embed url="https://coverage.coinmetrics.io/asset-metrics/ReferenceRateUSD" %}


## Frequently Asked Questions

### **What is the historical coverage of your candles data?**

Our candles history for Bitcoin begins when it began trading on Mt.Gox in July 2010, so we have over 10 years of candles history. We also have full historical candles from several other early exchanges such as Bitstamp, TheRockTrading, Bitfinex, and Kraken.

Our candles are calculated from trades data that we collect. Some exchanges allow users to query all of their historical trades data while other exchanges only allow users to query a short amount of history such as the past 1,000 trades. Coin Metrics always attempts to collect the maximum backhistory possible. If an exchange allows us to query historical trades data, we will collect data from every market starting from the inception of the exchange.

### **Is there a way to pull data for multiple markets in one API call?**

Yes! All of our endpoints that accept the `markets` parameter will accept wildcards like `exchange-*` or `exchange-*-spot` or `*USDT-future`. The wildcards will match any market which fits this pattern so users do not need to specify every individual market when querying data for multiple markets. The `markets` parameter will also accept a comma-separated string of individual markets.

### **When are candles calculated?**

Our candle generator waits 20 minutes before calculating a candle to ensure that we are not missing any trades in the candle interval. We are working towards a future upgrade that will reduce this lag. If you require candles with very low delay, we recommend calculating them using our [trades data](https://docs.coinmetrics.io/market-data/market-trades).

### **How does Coin Metrics ensure high levels of data quality and data integrity?**

Please take a look at this question in the Market Data FAQs page linked below.

{% content-ref url="../market-data/market-data-faqs.md" %}
[market-data-faqs.md](../market-data/market-data-faqs.md)
{% endcontent-ref %}

### **Why are there some observations where the candle vwap is higher than the high price or lower than the low price?**

We construct gapless candles which means that if there are no trades in a candle interval, we fill forward candles through time, setting the open, high, low, and close to the close of the previous candle, setting the vwap to the vwap of the previous candle, and setting the volume to zero. In cases where there are no trades in a candle interval, it is expected that the vwap may be higher than the high price or lower than the low price due to our fill forward logic.

### **What does the time for each candle observation represent?**

Since candles represent a set of summary statistics measured over an interval of time (such as one calendar day), by convention we set the `time` field to the beginning of the candle interval.

For instance, if the `time` for a daily candle is `2022-02-17 00:00:00`, this means that the `price_open` represents the price of the first trade after`2022-02-17 00:00:00.000000` while the `price_close` represents the price of the last trade before `2022-02-17 23:59:59.999999`. And the volume represents the sum of the trades amounts from `2022-02-17 00:00:00.00000` to `2022-02-17 23:59:59.999999`, inclusive. Here we represent `00:00:00` as the beginning of a calendar day according to the [ISO 8601 standard](https://en.wikipedia.org/wiki/ISO\_8601).

## **Known Data Issues**

* **Candles data is filled forward longer than needed for markets that are delisted.** We are working on a future upgrade to our candles that will correct this.

## **Release History**

* **CM MDF v1.0 on April 2020**: Added candles for all spot markets on major exchanges.\
  \
  [**CM MDF v2.0 on December 9, 2019**](https://coinmetrics.io/release-of-cm-market-data-feed-version-2-0/): Added candles for spot markets on Binance.US. Added candles for futures markets on BitMEX and Huobi. \\
* [**CM MDF v2.1 on May 5, 2020**](https://coinmetrics.io/market-data-feed-v2-1-release-notes/): Added candles for spot markets on Kucoin and FTX. Added candles for futures markets on Deribit, OKEx, Binance, FTX, and Bitfinex. \\
* [**CM MDF v2.2 on December 2, 2020**](https://coinmetrics.io/cm-market-data-feed-futures-data-expansion/)**:** Added candles for futures markets on bitFlyer and Kraken. \\
* [**CM MDF v2.3 on April 25, 2021**](https://coinmetrics.io/cm-market-data-feed-v2-3-release-notes/): Added candles for spot markets on LMAX. Added candles for futures markets on CME and Bybit. \\
* [**CM MDF v2.4 on September 1, 2021**](https://coinmetrics.io/cm-market-data-feed-v2-4-release-notes/): Extended candles data for Ethereum futures markets on CME.

## **Availability**

The previous 24 hours of trades data is available through our community API. Community data is available via HTTP API only and is limited to 10 API requests per 6 seconds per IP address. All of our trades data is available through our professional API with higher rate limits. The professional API supports trades data through both our HTTP API and websocket API.

Our coverage can be found by querying our [`/catalog/markets`](https://docs.coinmetrics.io/api/v4#operation/getCatalogMarkets) or [`/catalog-all/markets`](https://docs.coinmetrics.io/api/v4#operation/getCatalogAllMarkets) API endpoints. Alternatively, you can query our [`/catalog/exchanges`](https://docs.coinmetrics.io/api/v4#operation/getCatalogExchanges)or [`/catalog-all/exchanges`](https://docs.coinmetrics.io/api/v4#operation/getCatalogAllExchanges) API endpoints which contain the same information but organized by exchange.

### Availability by Market Type

| Type    | Market Count |
| ------- | :----------: |
| Spot    |     13440    |
| Futures |     6874     |

### Availability by Exchange

| Exchange       | Spot Market Count | Future Market Count | Start Date |
| -------------- | :---------------: | :-----------------: | :--------: |
| Bibox          |        202        |                     | 2019-04-24 |
| Binance        |        1580       |         220         | 2017-07-14 |
| Binance.US     |        119        |                     | 2019-09-23 |
| Bitbank        |         11        |                     | 2017-02-14 |
| Bitfinex       |        533        |          35         | 2013-01-14 |
| bitFlyer       |         9         |          64         | 2019-05-28 |
| Bithumb        |         91        |                     | 2013-12-27 |
| BitMEX         |                   |         302         | 2014-11-22 |
| Bitstamp       |        108        |                     | 2011-08-18 |
| Bittrex        |        1068       |                     | 2019-03-21 |
| Bybit          |                   |          31         | 2019-10-01 |
| Cex.IO         |        240        |                     | 2013-12-27 |
| CME            |                   |         252         | 2017-12-17 |
| Coinbase       |        304        |                     | 2014-12-01 |
| Deribit        |                   |         121         | 2017-01-06 |
| FTX            |        440        |         1189        | 2019-03-05 |
| Gate.io        |        1603       |                     | 2017-09-29 |
| Gatecoin       |         80        |                     | 2014-11-11 |
| Gemini         |         78        |                     | 2018-10-16 |
| HitBTC         |        1517       |                     | 2013-12-27 |
| Huobi          |        961        |         2630        | 2019-03-15 |
| Kraken         |        394        |          79         | 2013-09-10 |
| Kucoin         |        914        |                     | 2020-04-02 |
| LBank          |        527        |                     | 2017-09-29 |
| Liquid         |        481        |                     | 2014-07-17 |
| LMAX           |         21        |                     | 2021-02-18 |
| LocalBitcoins  |        119        |                     | 2013-03-11 |
| Mt.Gox         |         16        |                     | 2010-07-17 |
| OKEx           |        629        |         1951        | 2018-12-25 |
| Poloniex       |        448        |                     | 2014-01-18 |
| TheRockTrading |         30        |                     | 2011-11-09 |
| Upbit          |        452        |                     | 2019-03-14 |
| ZB.com         |        456        |                     | 2019-03-04 |
