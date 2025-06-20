# Candles

## **Definition**

Candles consist of summary statistics derived from individual trades that describe the trading activity of a market or pair over an interval of time.

{% embed url="https://youtu.be/nGbw3-T3kTA?feature=shared" %}
Market Candles Demo (for DyDx)
{% endembed %}

## **Details**

Coin Metrics engineers several statistics based on trades data that occurred over an interval of time: opening price, high price, low price, close price, volume-weighted average price, total volume in base asset units, total volume in U.S. dollars, and number of trades in the interval.

Candles are generated at regular time intervals and at a time granularity that is suitable for charting and analysis. For instance, several technical analysis indicators can be calculated using data in candles format.

We produce our candles at `1m`, `5m`, `10m`, `15m`, `30m`, `1h`, `4h`, `1d` intervals. Our candles are calculated directly from our [trades data](market-trades.md). We construct gapless candles which means that if there are no trades in a candle interval, we fill forward candles through time, setting the open, high, low, and close to the close of the previous candle, setting the vwap to the vwap of the previous candle, and setting the volume to zero. Candles are calculated in real-time and available immediately after the candle interval is complete.&#x20;

We calculate candles using trades collected from exchanges rather than collecting candles directly reported from the exchange. This approach offers several advantages, such as allowing us to apply a consistent calculation methodology across exchanges to support cross-exchange analysis, and allows us to generate additional fields that are not typically published by exchanges, such as the volume converted to U.S. dollars, trade count, and volume-weighted average price.

Our market data collection system consists of multiple redundant and resilient applications, ensuring that most data is collected with minimal latency (usually a few hundred milliseconds). However, due to the nature of real-time data collection, some trades may not be collected immediately. When certain trades observations are not collected in real-time, our system backfills missing trades with a short delay (usually a few seconds). Internal metrics show that for most exchanges, we collect 99.9 percent of trades observations within roughly 2 seconds of publication by the exchange.

Candles are available immediately for spot and future markets from centralized exchanges. Option markets and spot markets from decentralized exchanges are available with a 20-minute delay.

To address the small number of missing trades and to maintain accuracy, we recalculate the most recent candles 20 minutes after initial publication, and every hour for the next three hours after initial publication.

Coin Metrics calculates candles for **spot** and **future** and **option** markets from exchanges that are listed on our exchange coverage universe.

## API Endpoints

Candles can be accessed using the `timeseries/market-candles` or `timeseries/pair-candles` endpoint.

{% openapi src="../../.gitbook/assets/openapi.yaml" path="/timeseries/market-candles" method="get" %}
[openapi.yaml](../../.gitbook/assets/openapi.yaml)
{% endopenapi %}

{% tabs %}
{% tab title="Shell" %}
```shell
curl --compressed "https://api.coinmetrics.io/v4/timeseries/market-candles?markets=coinbase-btc-usd-spot&limit_per_market=1&api_key=<your_key>"
```
{% endtab %}

{% tab title="Python" %}
```python
import requests
response = requests.get('https://api.coinmetrics.io/v4/timeseries/market-candles?markets=coinbase-btc-usd-spot&limit_per_market=1&api_key=<your_key>').json()
print(response)
```
{% endtab %}

{% tab title="Python Client" %}
```python
from coinmetrics.api_client import CoinMetricsClient

api_key = "<API_KEY>"
client = CoinMetricsClient(api_key)

print(
    client.get_market_candles(
        markets=["coinbase-btc-usd-spot"], limit_per_market=5
    ).to_dataframe()
)
```
{% endtab %}
{% endtabs %}

{% openapi src="../../.gitbook/assets/openapi.yaml" path="/timeseries/pair-candles" method="get" %}
[openapi.yaml](../../.gitbook/assets/openapi.yaml)
{% endopenapi %}

{% tabs %}
{% tab title="Shell" %}
```shell
curl --compressed "https://api.coinmetrics.io/v4/timeseries/pair-candles?pairs=btc-usd&limit_per_pair=1&api_key=<your_key>"
```
{% endtab %}

{% tab title="Python" %}
```python
import requests
response = requests.get('https://api.coinmetrics.io/v4/timeseries/pair-candles?pairs=btc-usd&limit_per_pair=1&api_key=<your_key>').json()
print(response)
```
{% endtab %}

{% tab title="Python Client" %}
```python
from coinmetrics.api_client import CoinMetricsClient

api_key = "<API_KEY>"
client = CoinMetricsClient(api_key)

print(
    client.get_pair_candles(
        pairs=["btc-usd"], limit_per_pair=5
    ).to_dataframe()
)
```
{% endtab %}
{% endtabs %}

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

An sample of the pair candles data for the `btc-usd` pair from our [`/timeseries/pair-candles`](https://docs.coinmetrics.io/api/v4/#tag/Timeseries/operation/getTimeseriesPairCandles) API endpoint is provided below.

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

* **`time`**: The time of the beginning of the candle interval in ISO 8601 date-time format.\\
* **`pair`**: The id of the pair. \\
* **`price_open`**: The opening price of the candle.\\
* **`price_high`**: The high price of the candle.\\
* **`price_low`**: The low price of the candle.\\
* **`price_close`**: The close price of the candle.

## **Release History**

* **CM MDF v1.0 on April 2020**: Added candles for all spot markets on major exchanges.\
  \
  [**CM MDF v2.0 on December 9, 2019**](https://coinmetrics.io/release-of-cm-market-data-feed-version-2-0/): Added candles for spot markets on Binance.US. Added candles for futures markets on BitMEX and Huobi.
* [**CM MDF v2.1 on May 5, 2020**](https://coinmetrics.io/market-data-feed-v2-1-release-notes/): Added candles for spot markets on Kucoin and FTX. Added candles for futures markets on Deribit, OKEx, Binance, FTX, and Bitfinex.
* [**CM MDF v2.2 on December 2, 2020**](https://coinmetrics.io/cm-market-data-feed-futures-data-expansion/)**:** Added candles for futures markets on bitFlyer and Kraken.
* [**CM MDF v2.3 on April 25, 2021**](https://coinmetrics.io/cm-market-data-feed-v2-3-release-notes/): Added candles for spot markets on LMAX. Added candles for futures markets on CME and Bybit.
* [**CM MDF v2.4 on September 1, 2021**](https://coinmetrics.io/cm-market-data-feed-v2-4-release-notes/): Extended candles data for Ethereum futures markets on CME.
* [**CM Market Data Feed v2.6 on July 13, 2022**](https://coinmetrics.io/cm-market-data-feed-v2-6-release-notes/)

## **Availability**

The previous 24 hours of trades data is available through our community API. Community data is available via HTTP API only and is limited to 10 API requests per 6 seconds per IP address. All of our trades data is available through our professional API with higher rate limits. The professional API supports trades data through both our HTTP API and websocket API.

Our coverage can be found by querying our [`/catalog/markets`](https://docs.coinmetrics.io/api/v4#operation/getCatalogMarkets) or [`/catalog-all/markets`](https://docs.coinmetrics.io/api/v4#operation/getCatalogAllMarkets) API endpoints. Alternatively, you can query our [`/catalog/exchanges`](https://docs.coinmetrics.io/api/v4#operation/getCatalogExchanges)or [`/catalog-all/exchanges`](https://docs.coinmetrics.io/api/v4#operation/getCatalogAllExchanges) API endpoints which contain the same information but organized by exchange. See our coverage pages:

{% embed url="https://coverage.coinmetrics.io/market-candles-v2" %}
