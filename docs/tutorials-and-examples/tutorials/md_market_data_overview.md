# Getting Started With Market Data

![](https://5264302.fs1.hubspotusercontent-na1.net/hubfs/5264302/Demo%20Asset%20Resources/CM-Demo-market\_data\_overview-Cover.png)

Coin Metrics **Market Data Feed** provides access to historical and real-time data from the world’s leading spot and derivatives crypto exchanges. We offer all of the fundamental market-related data types including tick-by-tick trades, quotes, order book snapshots, candles, and more.

The example charts showcased in this notebook are presented on a weekly basis in our [State of the Market](https://coinmetrics.io/insights/state-of-the-market/) newsletter.

#### Resources

This notebook demonstrates basic functionality offered by the Coin Metrics Python API Client and [Market Data Feed](https://coinmetrics.io/market-data-feed/).

Coin Metrics offers a vast assortment of data for hundreds of cryptoassets. The Python API Client allows for easy access to this data using Python without needing to create your own wrappers using `requests` and other such libraries.

To understand the data that Coin Metrics offers, feel free to peruse the resources below.

* The [Coin Metrics API v4](https://docs.coinmetrics.io/api/v4) website contains the full set of endpoints and data offered by Coin Metrics.
* The [Coin Metrics Product Docs](https://docs.coinmetrics.io/) gives detailed, conceptual explanations of the data that Coin Metrics offers.
* The [Python API Client Spec](https://coinmetrics.github.io/api-client-python/site/api\_client.html) contains a full list of functions..

### Setup

```python
from os import environ
import sys
from datetime import date, datetime, timedelta
import logging

import pandas as pd
import numpy as np
import seaborn as sns
from coinmetrics.api_client import CoinMetricsClient
import logging
import matplotlib.pyplot as plt

%matplotlib inline
```

```python
sns.set_theme()
sns.set(rc={"figure.figsize":(12,8)})
# pd.set_option("display.notebook_repr_html", False)
```

```python
logging.basicConfig(
    format="%(asctime)s %(levelname)-8s %(message)s",
    level=logging.INFO,
    datefmt="%Y-%m-%d %H:%M:%S"
)
```

```python
# We recommend privately storing your API key in your local environment.
try:
    api_key = environ["CM_API_KEY"]
    logging.info("Using API key found in environment")
except KeyError:
    api_key = ""
    logging.info("API key not found. Using community client")
client = CoinMetricsClient(api_key)
```

```
2024-10-25 14:48:22 INFO     Using API key found in environment
```

## Reference Data/Catalog Endpoints

The `catalog` endpoints display the set of data available to your API key. The `catalog-all` endpoints display the full set of data for our data set.

```python
btc_market_catalog = client.reference_data_markets(
    base="btc",
    type="spot",
    exchange="binance"
).to_dataframe()
btc_market_catalog.tail(5)
```

```
                      market exchange base    quote         pair   symbol  \
26     binance-btc-usdt-spot  binance  btc     usdt     btc-usdt  BTCUSDT   
27      binance-btc-ust-spot  binance  btc      ust      btc-ust   BTCUST   
28      binance-btc-vai-spot  binance  btc      vai      btc-vai     <NA>   
29  binance-btc-vai_vai-spot  binance  btc  vai_vai  btc-vai_vai   BTCVAI   
30      binance-btc-zar-spot  binance  btc      zar      btc-zar   BTCZAR   

    type  size_asset  margin_asset  strike  ...  order_price_increment  \
26  spot        <NA>          <NA>    <NA>  ...                   0.01   
27  spot        <NA>          <NA>    <NA>  ...                   0.01   
28  spot        <NA>          <NA>    <NA>  ...                   <NA>   
29  spot        <NA>          <NA>    <NA>  ...                   0.01   
30  spot        <NA>          <NA>    <NA>  ...                    1.0   

    order_price_min  order_price_max  order_size_min  order_taker_fee  \
26             0.01          1000000               5             <NA>   
27             0.01          1000000              10             <NA>   
28             <NA>             <NA>            <NA>             <NA>   
29             0.01          1000000              10             <NA>   
30              1.0         99928191             100             <NA>   

    order_maker_fee  margin_trading_enabled  experimental  base_native  \
26             <NA>                    <NA>          <NA>         <NA>   
27             <NA>                    <NA>          <NA>         <NA>   
28             <NA>                    <NA>          <NA>         <NA>   
29             <NA>                    <NA>          <NA>         <NA>   
30             <NA>                    <NA>          <NA>         <NA>   

    quote_native  
26          <NA>  
27          <NA>  
28          <NA>  
29          <NA>  
30          <NA>  

[5 rows x 39 columns]
```

```python
print(f"Market reference_data metadata includes: {list(btc_market_catalog.keys())}")
```

```
Market catalog metadata includes: ['market', 'exchange', 'base', 'quote', 'pair', 'symbol', 'type', 'size_asset', 'margin_asset', 'strike', 'option_contract_type', 'is_european', 'contract_size', 'tick_size', 'multiplier_size', 'listing', 'expiration', 'settlement_price', 'pool_config_id', 'contract_address', 'fee', 'price_includes_fee', 'variable_fee', 'base_address', 'quote_address', 'status', 'order_amount_increment', 'order_amount_min', 'order_amount_max', 'order_price_increment', 'order_price_min', 'order_price_max', 'order_size_min', 'order_taker_fee', 'order_maker_fee', 'margin_trading_enabled', 'experimental', 'base_native', 'quote_native']
```

***

## Example 1: Returns by coin in the CM Reference Rates universe

***

We offer reference rates quoted in USD, Euro, Bitcoin, and Ethereum. We now support these quote currencies for our entire reference rates coverage universe which can be found on [coverage.coinmetrics.io](http://coverage.coinmetrics.io/)

**Fig. 1 - 7 Day Price Change chart from State of the Market**\
![](https://5264302.fs1.hubspotusercontent-na1.net/hubfs/5264302/State%20of%20the%20Market%20-%20Chart%20Examples/Mini-RefRate-Returns.png)

```python
# Get all assets that have a reference rate 
assets_refrate = client.catalog_asset_metrics_v2(metrics="ReferenceRateUSD").to_dataframe()
assets_refrate[["metric","frequency","asset"]]
```

```
                metric    frequency    asset
0     ReferenceRateUSD           1s     1cat
1     ReferenceRateUSD           1m     1cat
2     ReferenceRateUSD           1h     1cat
3     ReferenceRateUSD           1d     1cat
4     ReferenceRateUSD  1d-ny-close     1cat
...                ...          ...      ...
6060  ReferenceRateUSD           1s  ztx_ztx
6061  ReferenceRateUSD           1m  ztx_ztx
6062  ReferenceRateUSD           1h  ztx_ztx
6063  ReferenceRateUSD           1d  ztx_ztx
6064  ReferenceRateUSD  1d-ny-close  ztx_ztx

[6065 rows x 3 columns]
```

```python
print("\nNumber of unique Reference Rate assets: " + str(len(pd.unique(assets_refrate["asset"])))+"\n")
```

```
Number of unique Reference Rate assets: 1213
```

We can retrieve Reference Rates from the `get_asset_metrics` endpoint. The code snippets below demonstrate how to do this with a small list of assets.

```python
# Retrieve Reference Rate
df_prices = client.get_asset_metrics(
    assets=["btc", "eth", "bnb", "ada", "doge", "xrp"],
    metrics="ReferenceRateUSD",
    frequency="1d",
    start_time="2022-08-10",
    end_time="2022-08-17"
).to_dataframe()

# Reshape dataset so assets are in columns, dates are the rows, and the values are prices
df_prices_pivot = df_prices.pivot(index="time",columns="asset",values="ReferenceRateUSD")
```

```python
df_prices_pivot.head(3)
```

```
asset                          ada         bnb           btc       doge  \
time                                                                      
2022-08-10 00:00:00+00:00  0.514033  325.442291  23186.291746  0.069148   
2022-08-11 00:00:00+00:00  0.536694  328.034925  23923.058483  0.071153   
2022-08-12 00:00:00+00:00  0.530497  323.337253  23934.439056    0.0708   

asset                             eth       xrp   
time                                              
2022-08-10 00:00:00+00:00  1703.992249  0.368363  
2022-08-11 00:00:00+00:00  1850.829961  0.380704  
2022-08-12 00:00:00+00:00  1878.113096  0.379859  
```

```python
# Index each asset"s time series to 1 
for col in df_prices_pivot.columns:
    logging.info(f"Calculating returns for {col}....")
    first_price = df_prices_pivot[df_prices_pivot[col].notnull()][col].iloc[0]
    df_prices_pivot[col] = df_prices_pivot[col]/first_price
    df_prices_pivot[col] = df_prices_pivot[col].ffill()
```

```
2024-10-25 14:48:25 INFO     Calculating returns for ada....
2024-10-25 14:48:25 INFO     Calculating returns for bnb....
2024-10-25 14:48:25 INFO     Calculating returns for btc....
2024-10-25 14:48:25 INFO     Calculating returns for doge....
2024-10-25 14:48:25 INFO     Calculating returns for eth....
2024-10-25 14:48:25 INFO     Calculating returns for xrp....
```

```python
df_prices_pivot
```

```
asset                          ada       bnb       btc       doge      eth   \
time                                                                          
2022-08-10 00:00:00+00:00       1.0       1.0       1.0       1.0       1.0   
2022-08-11 00:00:00+00:00  1.044084  1.007966  1.031776  1.028991  1.086173   
2022-08-12 00:00:00+00:00  1.032028  0.993532  1.032267  1.023896  1.102184   
2022-08-13 00:00:00+00:00  1.051484  1.005325  1.052187  1.046478  1.147176   
2022-08-14 00:00:00+00:00  1.089703  0.995682  1.053477  1.054227  1.162703   
2022-08-15 00:00:00+00:00  1.110819  0.976807  1.048646  1.183001  1.136355   
2022-08-16 00:00:00+00:00  1.070279  0.980408  1.038715  1.106155  1.116053   
2022-08-17 00:00:00+00:00    1.0852  0.971739  1.029437  1.257445  1.101305   

asset                          xrp   
time                                 
2022-08-10 00:00:00+00:00       1.0  
2022-08-11 00:00:00+00:00  1.033501  
2022-08-12 00:00:00+00:00  1.031207  
2022-08-13 00:00:00+00:00  1.030523  
2022-08-14 00:00:00+00:00  1.025361  
2022-08-15 00:00:00+00:00  1.021364  
2022-08-16 00:00:00+00:00  1.017113  
2022-08-17 00:00:00+00:00  1.023202  
```

***

## Example 2: Spot trading volume on Coinbase

***

**Fig. 2 - Coinbase daily spot volume breakdown from State of the Market**\
![](https://5264302.fs1.hubspotusercontent-na1.net/hubfs/5264302/State%20of%20the%20Market%20-%20Chart%20Examples/Coinbase-Volume-Breakdown.png)

#### Foundational Data Types - Trades

Trades are one of the foundational data types we collect from exchanges. From raw trades data, we can construct additional aggregated metrics.

```python
coinbase_btc_trades = client.get_market_trades(
    markets="coinbase-btc-usd-spot",
    limit_per_market=5,
    paging_from="end"
).to_dataframe()
```

```python
coinbase_btc_trades
```

```
                  market                             time  coin_metrics_id  \
0  coinbase-btc-usd-spot 2024-10-25 19:48:24.188784+00:00        706142046   
1  coinbase-btc-usd-spot 2024-10-25 19:48:24.188784+00:00        706142047   
2  coinbase-btc-usd-spot 2024-10-25 19:48:24.767882+00:00        706142048   
3  coinbase-btc-usd-spot 2024-10-25 19:48:25.158094+00:00        706142049   
4  coinbase-btc-usd-spot 2024-10-25 19:48:25.570517+00:00        706142050   

     amount     price                    database_time  side  
0   0.00721  66854.87 2024-10-25 19:48:24.787998+00:00  sell  
1   0.00758  66854.01 2024-10-25 19:48:24.787998+00:00  sell  
2  0.000341  66854.02 2024-10-25 19:48:25.557208+00:00   buy  
3  0.001426  66849.19 2024-10-25 19:48:26.096516+00:00   buy  
4     0.004  66846.31 2024-10-25 19:48:26.096516+00:00  sell  
```

#### Spot Volume Share - Candles Data

From raw trades data, we construct OHLC candles for each market. For our _Spot Volume % by Asset_ chart, we derive volume from our `get_market_candles` endpoint.

All of our endpoints that accept the markets parameter will accept wildcards like exchange-\* or exchange-\*-spot or \*USDT-future. The wildcards will match any market which fits this pattern so users do not need to specify every individual market when querying data for multiple markets.

```python
candles_coinbase = client.get_market_candles(
    markets="coinbase-*-spot", # wildcards can be passed to get all asset pairs
    start_time="2022-08-16",
    end_time="2022-08-17",
    frequency="1d"
).to_dataframe()

```

```python
candles_coinbase.info()
```

```
<class 'pandas.core.frame.DataFrame'>
RangeIndex: 1046 entries, 0 to 1045
Data columns (total 10 columns):
 #   Column               Non-Null Count  Dtype              
---  ------               --------------  -----              
 0   market               1046 non-null   string             
 1   time                 1046 non-null   datetime64[ns, UTC]
 2   price_open           1046 non-null   Float64            
 3   price_close          1046 non-null   Float64            
 4   price_high           1046 non-null   Float64            
 5   price_low            1046 non-null   Float64            
 6   vwap                 1046 non-null   Float64            
 7   volume               1046 non-null   Float64            
 8   candle_usd_volume    1046 non-null   Float64            
 9   candle_trades_count  1046 non-null   Int64              
dtypes: Float64(7), Int64(1), datetime64[ns, UTC](1), string(1)
memory usage: 90.0 KB
```

```python
candles_coinbase.head()
```

```
                    market                      time  price_open  price_close  \
0  coinbase-1inch-btc-spot 2022-08-16 00:00:00+00:00    0.000034     0.000034   
1  coinbase-1inch-btc-spot 2022-08-17 00:00:00+00:00    0.000034     0.000033   
2  coinbase-1inch-eur-spot 2022-08-16 00:00:00+00:00       0.807        0.805   
3  coinbase-1inch-eur-spot 2022-08-17 00:00:00+00:00       0.805        0.755   
4  coinbase-1inch-gbp-spot 2022-08-16 00:00:00+00:00       0.679        0.677   

   price_high  price_low      vwap    volume  candle_usd_volume  \
0    0.000035   0.000034  0.000034  12601.82       10324.267565   
1    0.000035   0.000033  0.000034   6400.08        5251.890725   
2        0.82      0.795  0.807773  62791.36       51499.294594   
3       0.828      0.752   0.78722  56349.99       45122.160088   
4       0.691      0.669  0.680058  16631.32       13651.391996   

   candle_trades_count  
0                  204  
1                  226  
2                  475  
3                  478  
4                   67  
```

* **price\_open:** The opening price of the candle.
* **price\_high:** The high price of the candle.
* **price\_low:** The low price of the candle.
* **price\_close:** The close price of the candle.
* **vwap:** The volume-weighted average price of the candle.
* **volume:** The volume of the candle in units of the base asset.
* **candle\_usd\_volume:** The volume of the candle in units of U.S. dollars.
* **candle\_trades\_count:** The number of trades in the candle interval.

#### Total Exchange Spot Volume - Exchange Metrics

We can retrieve the overall volume on the exchange using our `exchange_metrics` endpoint.

```python
coinbase_volume = client.get_exchange_metrics(
    exchanges="coinbase",
    metrics ="volume_reported_spot_usd_1d",
    start_time="2022-08-10",
    end_time="2022-08-17"
).to_dataframe()
```

```python
coinbase_volume
```

```
   exchange                      time  volume_reported_spot_usd_1d
0  coinbase 2022-08-10 00:00:00+00:00             2364732395.45783
1  coinbase 2022-08-11 00:00:00+00:00             2388044971.16654
2  coinbase 2022-08-12 00:00:00+00:00             1568920157.28374
3  coinbase 2022-08-13 00:00:00+00:00             1564683366.92133
4  coinbase 2022-08-14 00:00:00+00:00             2093992312.94672
5  coinbase 2022-08-15 00:00:00+00:00             2514301745.80601
6  coinbase 2022-08-16 00:00:00+00:00             1978781752.31132
7  coinbase 2022-08-17 00:00:00+00:00             2353956243.32178
```

***

## Example 3: Spot order book depth

***

**Fig. 3 - Binance order book depth from State of the Market**\
![](https://5264302.fs1.hubspotusercontent-na1.net/hubfs/5264302/State%20of%20the%20Market%20-%20Chart%20Examples/Binance-Order-Book-Depth.png)

#### Foundational Data Types - Order Book Snapshots

Exchange order book data is one of the most foundational data types in the crypto industry— arguably, even more foundational than trades data, as two orders must be matched for a trade to occur. Order book data is useful for various entities, including market makers, systematic or quantitative traders, and funds studying trade execution patterns.

Coin Metrics stores three types of order book snapshots. One type consists of a snapshot of the top 100 bids and top 100 asks taken once every 10 seconds for major markets. The second type consists of a full order book snapshot (every bid and every ask) taken once every hour for all markets. The third is a snapshot where the price is +/-10% of mid-price taken once every 10 seconds. All of these snapshots are served through our _/timeseries/market-orderbooks_ endpoint.

```python
top100_snapshot = client.get_market_orderbooks(
    markets="coinbase-btc-usd-spot",
    depth_limit=100, # For full order book depth, pass the parameter "full_book". 
                     # For 10% of depth (where the price is within +/-10 % of mid-price), pass the parameter "10pct_mid_price".
    limit_per_market=5,
    paging_from="end"
).to_dataframe()
```

```python
top100_snapshot
```

```
                  market                      time     coin_metrics_id  \
0  coinbase-btc-usd-spot 2024-10-25 19:47:40+00:00  1729885660000000-0   
1  coinbase-btc-usd-spot 2024-10-25 19:47:50+00:00  1729885670000000-0   
2  coinbase-btc-usd-spot 2024-10-25 19:48:00+00:00  1729885680000000-0   
3  coinbase-btc-usd-spot 2024-10-25 19:48:10+00:00  1729885690000000-0   
4  coinbase-btc-usd-spot 2024-10-25 19:48:20+00:00  1729885700000000-0   

                                                asks  \
0  [{'price': '66924.57', 'size': '0.00420518'}, ...   
1  [{'price': '66912.05', 'size': '0.08986286'}, ...   
2  [{'price': '66894.65', 'size': '0.06726527'}, ...   
3  [{'price': '66875.86', 'size': '0.40178901'}, ...   
4  [{'price': '66857.83', 'size': '0.00053574'}, ...   

                                                bids  \
0  [{'price': '66920.85', 'size': '0.00081'}, {'p...   
1  [{'price': '66912.04', 'size': '0.00284986'}, ...   
2  [{'price': '66894.64', 'size': '0.00015879'}, ...   
3  [{'price': '66875.85', 'size': '0.00015736'}, ...   
4  [{'price': '66857.82', 'size': '0.07172'}, {'p...   

                     database_time  
0 2024-10-25 19:47:40.403698+00:00  
1 2024-10-25 19:47:50.354886+00:00  
2 2024-10-25 19:48:00.501666+00:00  
3 2024-10-25 19:48:10.338177+00:00  
4 2024-10-25 19:48:20.357161+00:00  
```

```python
bids = eval(top100_snapshot.bids[0])
bids[0:10]
```

```
[{'price': '66920.85', 'size': '0.00081'},
 {'price': '66918.17', 'size': '0.0001607'},
 {'price': '66918.16', 'size': '0.15000424'},
 {'price': '66918.15', 'size': '0.49999905'},
 {'price': '66917.92', 'size': '0.00001495'},
 {'price': '66916.15', 'size': '0.00002241'},
 {'price': '66914.96', 'size': '0.04797143'},
 {'price': '66914.58', 'size': '0.00001495'},
 {'price': '66912.31', 'size': '0.1221577'},
 {'price': '66912.3', 'size': '0.04763478'}]
```

#### Market Quotes - Best Bid & Asks

As an added convenience, we also serve the top bid/ask via a separate timeseries/market-quotes endpoint. Quotes are derived from our order book snapshots, so they are available at the same 10s intervals.

```python
btc_quotes = client.get_market_quotes(
    markets="coinbase-btc-usd-spot",
    limit_per_market=5,
    paging_from="end"
).to_dataframe()
```

```python
btc_quotes
```

```
                  market                      time     coin_metrics_id  \
0  coinbase-btc-usd-spot 2024-10-25 19:47:40+00:00  1729885660000000-0   
1  coinbase-btc-usd-spot 2024-10-25 19:47:50+00:00  1729885670000000-0   
2  coinbase-btc-usd-spot 2024-10-25 19:48:00+00:00  1729885680000000-0   
3  coinbase-btc-usd-spot 2024-10-25 19:48:10+00:00  1729885690000000-0   
4  coinbase-btc-usd-spot 2024-10-25 19:48:20+00:00  1729885700000000-0   

   ask_price  ask_size  bid_price  bid_size  
0   66924.57  0.004205   66920.85   0.00081  
1   66912.05  0.089863   66912.04   0.00285  
2   66894.65  0.067265   66894.64  0.000159  
3   66875.86  0.401789   66875.85  0.000157  
4   66857.83  0.000536   66857.82   0.07172  
```

**Note:** We now also offer _every quote update_ via the new Coin Metrics flat file application.

***

## Example 4: Futures data types

***

We offer futures data for 3,000+ markets across top derivatives trading venues such as Binance, CME, FTX, BitMEX, Huobi, Bybit, etc. Supported data types include liquidations, contract prices, open interest, candles, volume, funding rates, and more.

**Fig. 4 - Bitcoin and Ethereum futures open interest from State of the Market**\
![](https://5264302.fs1.hubspotusercontent-na1.net/hubfs/5264302/State%20of%20the%20Market%20-%20Chart%20Examples/BTC-ETH-open-interest.png)

#### Market Open Interest - Total Contracts Outstanding

Open interest represents the number of contracts that are currently outstanding and not settled for a specific derivatives market.

```python
oi_btc_perp = client.get_market_open_interest(
    markets="binance-BTCUSD_PERP-future",
    end_time="2022-08-17",
    limit_per_market=5,
    paging_from="end"
).to_dataframe()
```

```python
oi_btc_perp
```

```
                       market                      time  contract_count  \
0  binance-BTCUSD_PERP-future 2022-08-17 23:55:00+00:00         3982211   
1  binance-BTCUSD_PERP-future 2022-08-17 23:56:00+00:00         3981078   
2  binance-BTCUSD_PERP-future 2022-08-17 23:57:00+00:00         3979201   
3  binance-BTCUSD_PERP-future 2022-08-17 23:58:00+00:00         3979191   
4  binance-BTCUSD_PERP-future 2022-08-17 23:59:00+00:00         3979133   

   value_usd                    database_time             exchange_time  
0  398221100 2022-08-17 23:55:11.890405+00:00 2022-08-17 23:55:00+00:00  
1  398107800 2022-08-17 23:56:30.226528+00:00 2022-08-17 23:56:00+00:00  
2  397920100 2022-08-17 23:57:08.240922+00:00 2022-08-17 23:57:00+00:00  
3  397919100 2022-08-17 23:58:18.250239+00:00 2022-08-17 23:58:00+00:00  
4  397913300 2022-08-17 23:59:07.291820+00:00 2022-08-17 23:59:00+00:00  
```

#### Aggregated Open Interest - Daily by Asset & Contract Type

In addition to querying open interest for specific markets/contracts, the `get_asset_metrics` endpoint can also be used to retrieve aggregated open interest. Our reported future open interest metric is an aggregation of the reported future open interest from all futures exchanges in CM"s coverage universe.

We offer aggregated futures open interest for the following futures contract types:

* Reported Future Open Interest
* Reported Perpetual Future Open Interest
* Reported Non-Perpetual Future Open Interest
* Reported Coin-Margined Future Open Interest
* Reported Tether-Margined Future Open Interest

```python
oi_btc_eth = client.get_asset_metrics(
    assets="btc,eth",
    metrics="open_interest_reported_future_usd,open_interest_reported_future_nonperpetual_usd,open_interest_reported_future_perpetual_usd",
    frequency="1d",
    limit_per_asset=3,
    paging_from="end"
).to_dataframe()
```

```python
oi_btc_eth
```

```
  asset                      time  \
0   btc 2024-10-23 00:00:00+00:00   
1   btc 2024-10-24 00:00:00+00:00   
2   btc 2024-10-25 00:00:00+00:00   
3   eth 2024-10-23 00:00:00+00:00   
4   eth 2024-10-24 00:00:00+00:00   
5   eth 2024-10-25 00:00:00+00:00   

   open_interest_reported_future_nonperpetual_usd  \
0                                13923479711.9669   
1                              13453533211.895201   
2                                13392581425.7694   
3                                1535153876.09309   
4                                1473483638.19916   
5                                1451292649.13502   

   open_interest_reported_future_perpetual_usd  \
0                           19982575374.762501   
1                           19754715551.441399   
2                           20179456440.591499   
3                             9517890065.12204   
4                            9292600168.441351   
5                            9313906648.995859   

   open_interest_reported_future_usd  
0                 33906055086.729401  
1                 33208248763.336601  
2                 33572037866.360901  
3                 11053043941.215099  
4                 10766083806.640499  
5                 10765199298.130899  
```

#### Perpetual Futures Funding Rates

Funding rates are a mechanism that exchanges use to ensure that perpetual futures trade at a price that is close to the price of the underlying spot markets. The funding rate is used to calculate the funding fee which long position holders pay short position holders, or vice versa, as a way to incentivize market participants to take positions that keep perpetual futures prices close to the underlying.

```python
funding_btc_perp = client.get_market_funding_rates(
    markets="binance-BTCUSD_PERP-future",
    end_time="2022-08-17",
    limit_per_market=5
).to_dataframe()
```

```python
funding_btc_perp
```

```
                       market                             time  \
0  binance-BTCUSD_PERP-future        2020-08-10 16:00:00+00:00   
1  binance-BTCUSD_PERP-future        2020-08-11 00:00:00+00:00   
2  binance-BTCUSD_PERP-future 2020-08-11 08:00:00.008000+00:00   
3  binance-BTCUSD_PERP-future        2020-08-11 16:00:00+00:00   
4  binance-BTCUSD_PERP-future        2020-08-12 00:00:00+00:00   

                     database_time    rate    period  interval  
0 2020-12-02 10:49:37.530167+00:00  0.0001  08:00:00  08:00:00  
1 2020-12-02 10:49:37.530167+00:00  0.0001  08:00:00  08:00:00  
2 2020-12-02 10:49:37.530167+00:00  0.0001  08:00:00  08:00:00  
3 2020-12-02 10:49:37.530167+00:00  0.0001  08:00:00  08:00:00  
4 2020-12-02 10:49:37.530167+00:00  0.0001  08:00:00  08:00:00  
```

**Fig. 5 - Bitcoin perpetual futures funding rates from State of the Market**\
![](https://5264302.fs1.hubspotusercontent-na1.net/hubfs/5264302/State%20of%20the%20Market%20-%20Chart%20Examples/BTC-perp-funding-rates.png)

#### Futures Basis Metrics - Aggregated by Exchange-Asset

The basis is the annualized percent difference between the price of a theoretical futures contract and the price of its underlying spot market. Coin Metrics calculates this for several exchange-assets such as `binance-btc` and `ftx-eth`. We calculate four basis metrics at defined days to expiration: 30 day, 60 day, 90 day, and 120 day.

```python
basis_binance = client.get_exchange_asset_metrics(
    exchange_assets="binance-btc", 
    metrics="basis_annualized_30d_exp,basis_annualized_60d_exp,basis_annualized_90d_exp"
).to_dataframe()
```

```python
basis_binance.tail()
```

```
     exchange_asset                      time  basis_annualized_30d_exp  \
1592    binance-btc 2024-10-21 00:00:00+00:00                  0.104488   
1593    binance-btc 2024-10-22 00:00:00+00:00                  0.095617   
1594    binance-btc 2024-10-23 00:00:00+00:00                  0.103859   
1595    binance-btc 2024-10-24 00:00:00+00:00                  0.103878   
1596    binance-btc 2024-10-25 00:00:00+00:00                  0.108495   

      basis_annualized_60d_exp  basis_annualized_90d_exp  
1592                  0.104552                  0.098069  
1593                  0.095675                  0.092418  
1594                  0.103922                  0.096754  
1595                  0.103941                  0.100998  
1596                  0.108561                  0.102192  
```

**Fig. 6 - Bitcoin futures basis from State of the Market**\
![](https://5264302.fs1.hubspotusercontent-na1.net/hubfs/5264302/State%20of%20the%20Market%20-%20Chart%20Examples/Futures-Basis.png)

#### Futures Liquidations - Individual Orders/Trades

Exchanges which offer futures markets utilize a risk management system that will attempt to close a user’s position before the point at which the user begins to owe more than what is in the user"s account. The trade or order that closes the user"s position is referred to as a liquidation.

* Some exchanges report **liquidations orders** in which they will report the creation of a liquidation order when a trader’s position initially enters liquidation. When a trader’s position enters liquidation, an exchange will typically enter a limit order at the trader"s bankruptcy price. The order will show the amount of the position that is being liquidated and the liquidation price, but will not represent the matched trades that are executed as a result of the liquidation.
* Other exchanges will report **liquidation trades** which represent the actual matched trades as a result of a liquidation order but will not report liquidation orders.
* Some exchanges will report both liquidation orders and liquidation trades.

```python
mkt_liqs_binance = client.get_market_liquidations(
    markets="binance-BTCUSDT-future", 
    limit_per_market=3
).to_dataframe()
```

```python
mkt_liqs_binance.head()
```

```
                   market                             time  \
0  binance-BTCUSDT-future 2019-09-10 19:36:50.009000+00:00   
1  binance-BTCUSDT-future 2019-09-10 19:38:06.010000+00:00   
2  binance-BTCUSDT-future 2019-09-11 06:51:13.010000+00:00   

       coin_metrics_id  amount     price   type  \
0  1568144210009000000   0.199  10013.89  trade   
1  1568144286010000000    0.04   9952.16  trade   
2  1568184673010000000    0.04   9944.65  trade   

                     database_time  side  
0 2020-10-08 06:03:35.854962+00:00  sell  
1 2020-10-08 06:03:35.854962+00:00  sell  
2 2020-10-08 06:03:35.854962+00:00  sell  
```

#### Futures Liquidations - Aggregated Daily or Hourly

```python
liqs_binance = client.get_market_metrics(
    markets="binance-BTCUSDT-future", 
    metrics="liquidations_reported_future_buy_usd_1d"
).to_dataframe()
```

```python
liqs_binance.head()
```

```
                   market                      time  \
0  binance-BTCUSDT-future 2019-09-12 00:00:00+00:00   
1  binance-BTCUSDT-future 2019-09-19 00:00:00+00:00   
2  binance-BTCUSDT-future 2019-09-20 00:00:00+00:00   
3  binance-BTCUSDT-future 2019-09-21 00:00:00+00:00   
4  binance-BTCUSDT-future 2019-09-23 00:00:00+00:00   

   liquidations_reported_future_buy_usd_1d  
0                                 114.5749  
1                             268916.41422  
2                              18519.28155  
3                                  8795.16  
4                              62820.22767  
```

**Fig. 7 - Bitcoin perpetual futures liquidations from State of the Market**\
![](https://5264302.fs1.hubspotusercontent-na1.net/hubfs/5264302/State%20of%20the%20Market%20-%20Chart%20Examples/BTC-Perp-Liquidations.png)

***

## Example 5: Options data types

***

We offer options data from two of the most liquid options trading venues, Deribit and OKX. Supported data types include implied volatility, trades, open interest, contract prices, contract specifications, quotes, and greeks. We recently expanded our options coverage to include several new data types from Deribit and added several new API endpoints to serve this data.

#### Options Contracts - Implied Volatility

```python
iv_deribit = client.get_market_implied_volatility(
    markets="deribit-BTC-18AUG22-*-option", 
    end_time="2022-08-17",
    limit_per_market=1
).to_dataframe()
```

```python
iv_deribit.head()
```

```
                               market                      time  \
0  deribit-BTC-18AUG22-19000-C-option 2022-08-16 08:04:00+00:00   
1  deribit-BTC-18AUG22-19000-P-option 2022-08-16 08:04:00+00:00   
2  deribit-BTC-18AUG22-20000-C-option 2022-08-16 08:04:00+00:00   
3  deribit-BTC-18AUG22-20000-P-option 2022-08-16 08:04:00+00:00   
4  deribit-BTC-18AUG22-21000-C-option 2022-08-16 08:04:00+00:00   

                     database_time  iv_bid  iv_ask  iv_mark  \
0 2022-08-16 08:04:59.435418+00:00     0.0     0.0      1.0   
1 2022-08-16 08:04:58.430009+00:00     0.0  2.5561      1.0   
2 2022-08-16 08:04:57.429870+00:00     0.0     0.0      1.0   
3 2022-08-16 08:04:58.430009+00:00     0.0  2.0536      1.0   
4 2022-08-16 08:04:58.430009+00:00     0.0     0.0      1.0   

                     exchange_time  
0 2022-08-16 08:04:58.622000+00:00  
1 2022-08-16 08:04:57.613000+00:00  
2 2022-08-16 08:04:56.605000+00:00  
3 2022-08-16 08:04:57.612000+00:00  
4 2022-08-16 08:04:57.620000+00:00  
```

**Fig. 8 - Bitcoin "Volatility Smile" from State of the Market**\
![](https://5264302.fs1.hubspotusercontent-na1.net/hubfs/5264302/State%20of%20the%20Market%20-%20Chart%20Examples/BTC-IV-vs-StrikePrice.png)

#### Options Contracts - Market Greeks

```python
greeks_deribit = client.get_market_greeks(
    markets="deribit-BTC-18AUG22-*-option", 
    end_time="2022-08-17",
    limit_per_market=1
).to_dataframe()
```

```python
greeks_deribit.head()
```

```
                               market                      time  \
0  deribit-BTC-18AUG22-19000-C-option 2022-08-16 08:04:00+00:00   
1  deribit-BTC-18AUG22-19000-P-option 2022-08-16 08:04:00+00:00   
2  deribit-BTC-18AUG22-20000-C-option 2022-08-16 08:04:00+00:00   
3  deribit-BTC-18AUG22-20000-P-option 2022-08-16 08:04:00+00:00   
4  deribit-BTC-18AUG22-21000-C-option 2022-08-16 08:04:00+00:00   

                     database_time     vega     theta      rho    delta  \
0 2022-08-16 08:04:59.435418+00:00  0.03878  -0.97127  1.03845  0.99938   
1 2022-08-16 08:04:58.430009+00:00  0.03875  -0.30251 -0.00084 -0.00062   
2 2022-08-16 08:04:57.429870+00:00    0.287  -7.18741  1.08637  0.99435   
3 2022-08-16 08:04:58.430009+00:00  0.28587  -3.27365 -0.00759 -0.00563   
4 2022-08-16 08:04:58.430009+00:00  1.22414 -30.65678   1.1075   0.9696   

     gamma                    exchange_time  
0      0.0 2022-08-16 08:04:58.622000+00:00  
1      0.0 2022-08-16 08:04:57.613000+00:00  
2  0.00001 2022-08-16 08:04:56.605000+00:00  
3  0.00001 2022-08-16 08:04:57.612000+00:00  
4  0.00004 2022-08-16 08:04:57.620000+00:00  
```

**Fig. 9 - Option Chain from State of the Market**\
![](https://5264302.fs1.hubspotusercontent-na1.net/hubfs/5264302/State%20of%20the%20Market%20-%20Chart%20Examples/Option-Chain.png)

#### Options Contracts - Market Quotes

```python
quotes_deribit = client.get_market_quotes(
    markets="deribit-BTC-18AUG22-*-option", 
    end_time="2022-08-17",
    limit_per_market=3
).to_dataframe()
```

```python
quotes_deribit.head()
```

```
                               market                      time  \
0  deribit-BTC-18AUG22-19000-C-option 2022-08-16 08:04:00+00:00   
1  deribit-BTC-18AUG22-19000-C-option 2022-08-16 08:05:00+00:00   
2  deribit-BTC-18AUG22-19000-C-option 2022-08-16 08:06:00+00:00   
3  deribit-BTC-18AUG22-19000-P-option 2022-08-16 08:04:00+00:00   
4  deribit-BTC-18AUG22-19000-P-option 2022-08-16 08:05:00+00:00   

      coin_metrics_id  ask_price  ask_size  bid_price  bid_size  
0  1660637040000000-0        0.0       0.0        0.0       0.0  
1  1660637100000000-0        0.0       0.0        0.0       0.0  
2  1660637160000000-0        0.0       0.0        0.0       0.0  
3  1660637040000000-0        0.1    0.0085        0.0       0.0  
4  1660637100000000-0       10.0    0.0005        0.0       0.0  
```

#### Options Contracts - Market Open Interest

```python
oi_deribit = client.get_market_open_interest(
    markets="deribit-BTC-30DEC22-*-option", 
    paging_from="end",
    limit_per_market=1
).to_dataframe()
```

```python
oi_deribit.sort_values("value_usd").tail()
```

```
                                market                      time  \
62  deribit-BTC-30DEC22-35000-C-option 2022-12-30 07:59:00+00:00   
7   deribit-BTC-30DEC22-12000-P-option 2022-12-30 07:59:00+00:00   
15  deribit-BTC-30DEC22-15000-P-option 2022-12-30 07:59:00+00:00   
1   deribit-BTC-30DEC22-10000-P-option 2022-12-30 07:59:00+00:00   
54  deribit-BTC-30DEC22-30000-C-option 2022-12-30 07:59:00+00:00   

    contract_count      value_usd                    database_time  \
62          6564.4    108156695.5 2022-12-30 07:59:11.450250+00:00   
7           6609.7  108902937.431 2022-12-30 07:59:21.456460+00:00   
15          6873.1  113242845.144 2022-12-30 07:59:12.451403+00:00   
1           7731.2  127381029.376 2022-12-30 07:59:21.456460+00:00   
54          7836.8  129120997.632 2022-12-30 07:59:17.454662+00:00   

               exchange_time  
62 2022-12-30 07:59:00+00:00  
7  2022-12-30 07:59:00+00:00  
15 2022-12-30 07:59:00+00:00  
1  2022-12-30 07:59:00+00:00  
54 2022-12-30 07:59:00+00:00  
```

**Fig. 10 - Option Open Interest from State of the Market**\
![](https://5264302.fs1.hubspotusercontent-na1.net/hubfs/5264302/State%20of%20the%20Market%20-%20Chart%20Examples/Options-OI.png)

