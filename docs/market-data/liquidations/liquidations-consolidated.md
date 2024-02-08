# Contents
* [Market Liquidations](#market)
* [Liquidation Metrics](#metrics)

# Market Liquidations <a name="market"></a>

## **Definition**

Exchanges which offer futures markets utilize a risk management system that will attempt to close a user’s position before the point at which the user begins to owe more than what is in the user's account. The trade or order that closes the user's position is referred to as a liquidation.&#x20;

## **Details**

Futures contracts enable market participants to trade with leverage – that is, market participants are allowed to have a position with notional value greater than the amount of money they have in their account. This raises the possibility that market participants can lose more money than have in their account. To address this possibility, exchanges which offer futures products have a liquidation system that will attempt to close a market participant’s position before the point at which the market participant begins to owe more than what is in their account.&#x20;

A simplified example illustrates the process. Suppose a trader deposits $100 into an exchange and buys $10,000 worth of Bitcoin perpetual contracts resulting in a leverage of 100x. Also, suppose the current price of Bitcoin is $10,000. If the price declines to $9,900 (the “bankruptcy price”), the trader would be bankrupt. Therefore, the exchange sets the liquidation price for this trader’s position at $9,925 (the “liquidation price”). If the price declines to this liquidation price, the exchange will forcibly initiate a sell liquidation order to attempt to close the trader’s position.

## API Endpoints

Individual market liquidations can be accessed using these endpoints:
* `timeseries/market-liquidations` 

{% swagger src="../../.gitbook/assets/openapi.yaml" path="/timeseries/market-liquidations" method="get" %}
[openapi.yaml](../../.gitbook/assets/openapi.yaml)
{% endswagger %}

## **Example**

A sample of the liquidations data from the `binance-BTCUSDT-future` market from our  [`/timeseries/market-liquidations`](https://docs.coinmetrics.io/api/v4#operation/getTimeseriesMarketLiquidations) API endpoint is provided below.&#x20;

```
{
  "data": [
    {
      "market": "binance-BTCUSDT-future",
      "time": "2020-10-10T15:44:42.105000000Z",
      "coin_metrics_id": "1602344682105000000",
      "amount": "0.045",
      "price": "11380.39",
      "type": "trade",
      "database_time": "2020-10-10T15:44:45.109122000Z",
      "side": "buy"
    },
    {
      "market": "binance-BTCUSDT-future",
      "time": "2020-10-10T15:45:37.067000000Z",
      "coin_metrics_id": "1602344737067000000",
      "amount": "0.004",
      "price": "11386",
      "type": "trade",
      "database_time": "2020-10-10T15:45:39.329348000Z",
      "side": "buy"
    }
  ]
}
```

* **`market`**: The id of the market. Market ids use the following naming convention: `exchangeName-baseAsset-quoteAsset-spot` for spot markets, `exchangeName-futuresSymbol-future` for futures markets, and `exchangeName-optionsSymbol-option` for options markets. \

* **`time`**: The exchange-reported time in ISO 8601 date-time format. Always with nanoseconds precision.\

* **`coin_metrics_id`**: The id of a liquidation (unique per exchange). We are using exchange reported value if exchange reports a numeric liquidation id, otherwise we convert to numeric using Bijective mapping from exchange reported liquidation id’s string. For exchanges that do not report a liquidation id, we use multiple fields to create a unique liquidation id. \

* **`amount`**: The amount that is liquidated in units of number of contracts.\

* **`price`**: The price of the underlying base asset quoted in the underlying quote asset that the liquidation trade was executed at or liquidation order was set at.\

* **`type`**: The liquidation type. `trade` means that the liquidation was executed. `order` means that the order was placed for the liquidation at the timestamp of the data entry but it wasn’t necessarily executed yet.\

* **`database_time`**: The timestamp when the data was saved in the database in ISO 8601 date-time format with nanoseconds precision.\

* **`side`**: The market order side of the trade or order that closes the liquidated position. `buy` means that an ask was removed from the book by an incoming buy order, `sell` means that a bid was removed from the book by an incoming sell order. We report the side of the trade or order that was used to close the position under liquidation -- not the side of the original position.&#x20;

## Frequently Asked Questions&#x20;

### **What does the liquidation side represent?**&#x20;

We report the side of the trade or order that was used to close the position under liquidation -- not the side of the original position. For example, if a trader had a long position and the price suddenly declined that caused the trader's position to be liquidated, the result would be a liquidation with a side of `sell`. &#x20;

### **What determines the frequency of liquidations data?**

There is no set time frequency for liquidations, since they are event-based just like trades or orders. Whenever an exchange liquidates a traders position, the data is pulled in real time. In theory, if the market is trading flat and not moving much in either direction, you won't see many liquidations, whereas if there is high volatility you'll see a higher frequency stream of liquidations.&#x20;

## **Harmonization Discussion**

Our liquidation data harmonizes liquidation data across various exchanges. Here we discuss some differences in how various exchanges report their liquidations data.

* **Liquidation orders versus liquidation trades**: Some exchanges report “liquidations orders” in which they will report the creation of a liquidation order when a trader’s position initially enters liquidation. When a trader’s position enters liquidation, an exchange will typically enter a limit order at the price at which the trader will be bankruptcy price. The liquidation orders will show the amount of the position that is being liquidated and the liquidation price, but will not represent the matched trades that are executed as a result of the liquidation. Other exchanges will report “liquidation trades” which represent the actual matched trades as a result of a liquidation order but will not report liquidation orders. Some exchanges will report both liquidation orders and liquidation trades.\

* **Aggregated liquidation trades versus individual liquidation trades**: For the exchanges that report liquidation trades, the exchange can report it in aggregated or individual format. Exchanges that report liquidation trades in aggregated format means that even if the liquidation involved several matched trades, the exchange will report it as one aggregated trade representing the sum of the amount liquidated and the average price of the liquidations. Other exchanges report liquidation trades in individual trade format such that one liquidation can be reported via multiple observations representing the multiple matched trades.\

* **Side of original position versus side of liquidation:** Most exchanges report the side of the liquidation order or trade that is used to close the user's position (i.e. whether the liquidation was a buy or sell action to close the position). Some exchanges instead report the side of the original position that is under liquidation (i.e. whether the original position that is under liquidation was a long or short position). \

* **With original position data versus without original position data**: Some exchanges report data about the position that is liquidated such as the original quantity and the original price that the position was entered into while others do not.\

* **With history versus without history**: Similar to trades data, certain exchanges allow us to query historical liquidation data while others do not.

We harmonize the data in the following way:

* If an exchange reports both liquidation orders and liquidation trades, we store both types of observations and differentiate the two types with the type column. \

* Bybit is the only exchange in our coverage universe that reports the side of the original position under liquidation. Every other exchange reports the side of the liquidation. We adopt the convention of reporting the side of the liquidation, and we map Bybit's data to this convention by inverting the side reported by Bybit.&#x20;

## **Known Data Issues**&#x20;

* **Liquidations data from Binance are missing from 2021-04-27 to 2021-05-11** **due to a breaking change that was made to the Binance API on 2021-04-27.** \

* **Our liquidations data from Binance for an approximately four month window is underreported due to a breaking change that was made to the Binance API on 2021-04-27.** Prior to this date, Binance had reported every single liquidation. Our liquidations table was using the “last filled quantity” (and price), which was appropriate when all liquidations were reported. However, the change they implemented rendered their API to only report the latest liquidation within the last 1,000ms. As a result, our scrapers logic no longer fully captures every liquidation. We implemented a change to our scrapers on 2021-08-31. Rather than using the “last filled quantity” (and price), we will be using the total quantity of the liquidated orders that happened in that 1000ms interval (and the average price of that interval). Unfortunately, all liquidations data that was captured between 2021-05-11 and 2021-08-31 will remain underreported and there is no way for us to recover the data, as Binance does not permit the collection of historical liquidations. However, all liquidations that occurred before 2021-04-27 are still accurate. \

* **In rare instances where OKEx reports two adjacent liquidations with identical time, amount, and price, we only stored the first observation prior to 2021-09-21.** This issue was corrected on 2021-09-21. \

* **Our liquidations data from BitMEX are underreported prior to 2021-09-20 due to rate limits imposed by the exchange.** This issue was corrected on 2021-09-20.  \

* **Our liquidations data from Bybit were interrupted for a period of 5 days between 2021-09-24 to 2021-09-29 due to a deprecation of their API endpoint.** This issue was corrected on 2021-09-29.&#x20;

### Release History

* [**CM MDF v2.2 on December 2, 2020**](https://coinmetrics.io/cm-market-data-feed-futures-data-expansion/)**:** Added liquidations for futures markets on Binance, Bitfinex,  BitMEX, Deribit, FTX, Huobi, Kraken, and OKEx.\

* [**CM MDF v2.4 on September 1, 2021**](https://coinmetrics.io/cm-market-data-feed-v2-4-release-notes/): Added liquidations for futures markets on Bybit.

### **Availability**

The previous 24 hours of liquidations data is available through our community API.  Community data is available via HTTP API only and is limited to 10 API requests per 6 seconds per IP address. All of our liquidations data is available through our professional API with higher rate limits. &#x20;

#### Availability by Market Type

| Type    | Market Count |
| ------- | :----------: |
| Futures |     3817     |

#### Availability by Exchange

| Exchange | Futures Market Count | Start Date |
| -------- | :------------------: | :--------: |
| Binance  |          203         | 2019-09-10 |
| Bitfinex |          26          | 2019-08-01 |
| BitMEX   |          77          | 2020-10-08 |
| Bybit    |          30          | 2021-04-24 |
| Deribit  |          62          | 2018-08-14 |
| FTX      |          824         | 2019-04-19 |
| Huobi    |         1287         | 2020-07-10 |
| Kraken   |          53          | 2020-12-09 |
| OKEx     |         1255         | 2020-10-01 |


# Liquidation Metrics <a name="market"></a>

The reported liquidation metrics are a sum of all reported volume in native units or U.S. Dollars of buy or sell orders that were used to close short positions under liquidation for a specific market in our coverage universe.

| Name                                            | MetricID                                       | Category     | Subcategory | Type | Unit         | Interval |
| ----------------------------------------------- | ---------------------------------------------- | ------------ | ----------- | ---- | ------------ | -------- |
| Reported Liquidation Buy Orders (Units), 5 Min  | [liquidations\_reported\_future\_buy\_units\_5m](https://coverage.coinmetrics.io/search-results?query=liquidations\_reported\_future\_buy\_units\_5m) | Liquidations | Futures     | Sum  | Native Units | 5m       |
| Reported Liquidation Buy Orders (Units), 1 Hour | [liquidations\_reported\_future\_buy\_units\_1h](https://coverage.coinmetrics.io/search-results?query=liquidations\_reported\_future\_buy\_units\_1h) | Liquidations | Futures     | Sum  | Native Units | 1h       |
| Reported Liquidation Buy Orders (Units), 1 Day  | [liquidations\_reported\_future\_buy\_units\_1d](https://coverage.coinmetrics.io/search-results?query=liquidations\_reported\_future\_buy\_units\_1d) | Liquidations | Futures     | Sum  | Native Units | 1d       |
| Reported Liquidation Buy Orders (USD), 5 Min  | [liquidations\_reported\_future\_buy\_usd\_5m](https://coverage.coinmetrics.io/search-results?query=liquidations\_reported\_future\_buy\_usd\_5m) | Liquidations | Futures     | Sum  | USD  | 5m       |
| Reported Liquidation Buy Orders (USD), 1 Hour | [liquidations\_reported\_future\_buy\_usd\_1h](https://coverage.coinmetrics.io/search-results?query=liquidations\_reported\_future\_buy\_usd\_1h) | Liquidations | Futures     | Sum  | USD  | 1h       |
| Reported Liquidation Buy Orders (USD), 1 Day  | [liquidations\_reported\_future\_buy\_usd\_1d](https://coverage.coinmetrics.io/search-results?query=liquidations\_reported\_future\_buy\_usd\_1d) | Liquidations | Futures     | Sum  | USD  | 1d       |
| Reported Liquidation Sell Orders (Units), 5 Min  | [liquidations\_reported\_future\_sell\_units\_5m](https://coverage.coinmetrics.io/search-results?query=liquidations\_reported\_future\_sell\_units\_5m) | Liquidations | Futures     | Sum  | Native Units | 5m       |
| Reported Liquidation Sell Orders (Units), 1 Hour | [liquidations\_reported\_future\_sell\_units\_1h](https://coverage.coinmetrics.io/search-results?query=liquidations\_reported\_future\_sell\_units\_1h) | Liquidations | Futures     | Sum  | Native Units | 1h       |
| Reported Liquidation Sell Orders (Units), 1 Day  | [liquidations\_reported\_future\_sell\_units\_1d](https://coverage.coinmetrics.io/search-results?query=liquidations\_reported\_future\_sell\_units\_1d) | Liquidations | Futures     | Sum  | Native Units | 1d       |
| Reported Liquidation Sell Orders (USD), 5 Min  | [liquidations\_reported\_future\_sell\_usd\_5m](https://coverage.coinmetrics.io/search-results?query=liquidations\_reported\_future\_sell\_usd\_5m) | Liquidations | Futures     | Sum  | USD  | 5m       |
| Reported Liquidation Sell Orders (USD), 1 Hour | [liquidations\_reported\_future\_sell\_usd\_1h](https://coverage.coinmetrics.io/search-results?query=liquidations\_reported\_future\_sell\_usd\_1h) | Liquidations | Futures     | Sum  | USD  | 1h       |
| Reported Liquidation Sell Orders (USD), 1 Day  | [liquidations\_reported\_future\_sell\_usd\_1d](https://coverage.coinmetrics.io/search-results?query=liquidations\_reported\_future\_sell\_usd\_1d) | Liquidations | Futures     | Sum  | USD  | 1d       |

## **Details**

Futures contracts enable market participants to trade with leverage – that is, market participants are allowed to have a position with notional value greater than the amount of money they have in their account. This raises the possibility that market participants can lose more money than have in their account. To address this possibility, exchanges which offer futures products have a liquidation system that will attempt to close a market participant’s position before the point at which the market participant begins to owe more than what is in their account.&#x20;

A simplified example illustrates the process. Suppose a trader deposits $100 into an exchange and buys $10,000 worth of Bitcoin perpetual contracts resulting in a leverage of 100x. Also, suppose the current price of Bitcoin is $10,000. If the price declines to $9,900 (the “bankruptcy price”), the trader would be bankrupt. Therefore, the exchange sets the liquidation price for this trader’s position at $9,925 (the “liquidation price”). If the price declines to this liquidation price, the exchange will forcibly initiate a sell liquidation order to attempt to close the trader’s position.

## **API Endpoints**

Liquidation metrics can be accessed using these endpoints:
* `timeseries/exchange-metrics`
* `timeseries/exchange-asset-metrics`
* `timeseries/pair-metrics`

and by passing in the `liquidation_reported_*` metrics in the `metrics` parameter.

{% swagger src="../../.gitbook/assets/openapi.yaml" path="/timeseries/exchange-metrics" method="get" %}
[openapi.yaml](../../.gitbook/assets/openapi.yaml)
{% endswagger %}

{% swagger src="../../.gitbook/assets/openapi.yaml" path="/timeseries/exchange-asset-metrics>" method="get" %}
[openapi.yaml](../../.gitbook/assets/openapi.yaml)
{% endswagger %}

{% swagger src="../../.gitbook/assets/openapi.yaml" path="/timeseries/pair-metrics" method="get" %}
[openapi.yaml](../../.gitbook/assets/openapi.yaml)
{% endswagger %}

## Examples

A sample of the daily reported liquidation buy orders for the Binance BTCUSDT futures market is shown below:

| market                 | time                | liquidations\_reported\_future\_buy\_units\_1d |
| ---------------------- | ------------------- | ---------------------------------------------- |
| binance-BTCUSDT-future | 2022-01-01 00:00:00 | 84.918                                         |
| binance-BTCUSDT-future | 2022-01-02 00:00:00 | 80.595                                         |
| binance-BTCUSDT-future | 2022-01-03 00:00:00 | 74.007                                         |
| binance-BTCUSDT-future | 2022-01-04 00:00:00 | 109.399                                        |

* market. The IDs of the markets.
* time. The time in ISO 8601 date-time format.
* liquidations\_reported\_future\_buy\_units\_1d. The reported volume of liquidation buy orders in native units.

