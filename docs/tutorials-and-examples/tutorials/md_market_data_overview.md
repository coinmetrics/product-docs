# Getting Started With Market Data

![](https://5264302.fs1.hubspotusercontent-na1.net/hubfs/5264302/Demo%20Asset%20Resources/CM-Demo-market\_data\_overview-Cover.png)

## MDF: Market Data Overview

The Market Data Overview notebook steps through various market data types available in Market Data Feed, displaying the basic structure of the data & highlighting use cases with examples from our weekly State of the Market. The notebook explains how data is gathered at the most granular level (i.e. trades, order book snapshots) & aggregated upwards to provide convenient hourly/daily metrics across spot, futures, & options markets.

**Use Cases:** Trading, Research **Personas:** Quant Trader, Market Analyst

### Summary

Coin Metrics **Market Data Feed** provides access to historical and real-time data from over 39 of the world’s leading spot and derivatives crypto exchanges. We offer all of the fundamental market-related data types including tick-by-tick trades, quotes, order book snapshots, candles, and more.

The example charts showcased in this notebook are presented on a weekly basis in our [State of the Market](http://stateofthe.market/) newsletter.

#### Resources

This notebook demonstrates basic functionality offered by the Coin Metrics Python API Client and [Market Data Feed](https://coinmetrics.io/market-data-feed/).

Coin Metrics offers a vast assortment of data for hundreds of cryptoassets. The Python API Client allows for easy access to this data using Python without needing to create your own wrappers using `requests` and other such libraries.

To understand the data that Coin Metrics offers, feel free to peruse the resources below.

* The [Coin Metrics API v4](https://docs.coinmetrics.io/api/v4) website contains the full set of endpoints and data offered by Coin Metrics.
* The [Coin Metrics Product Documentation](https://docs.coinmetrics.io/info) gives detailed, conceptual explanations of the data that Coin Metrics offers.
* The [API Spec](https://coinmetrics.github.io/api-client-python/site/api\_client.html) contains a full list of functions.

### File Download

Download the entire notebook as either a jupyter notebook to run yourself or as a pdf from the two links below

{% file src="../../.gitbook/assets/MDF_market_data_overview (1).ipynb" %}

{% file src="../../.gitbook/assets/MDF_market_data_overview (1).pdf" %}



### Setup

```python
from os import environ
import sys
import pandas as pd
import numpy as np
import seaborn as sns
import logging
from datetime import date, datetime, timedelta
from coinmetrics.api_client import CoinMetricsClient
import json
import logging
from pytz import timezone as timezone_conv
from datetime import timezone as timezone_info
import matplotlib.pyplot as plt
%matplotlib inline
```

```python
sns.set_theme()
sns.set(rc={'figure.figsize':(12,8)})
```

```python
logging.basicConfig(
    format='%(asctime)s %(levelname)-8s %(message)s',
    level=logging.INFO,
    datefmt='%Y-%m-%d %H:%M:%S'
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
2024-09-11 15:18:51 INFO     Using API key found in environment
```

## Catalog Endpoints

The `catalog` endpoints display the set of data available to your API key. The `catalog-all` endpoints display the full set of data for CM Pro users.

```python
btc_market_catalog = client.catalog_markets(
                    base='btc',
                    market_type='spot',
                    exchange='binance'
                    ).to_dataframe()
btc_market_catalog.tail(5)
```

```
2024-09-11 15:18:51 WARNING  /catalog/ endpoints will be deprecated in the future. Consider using /catalog-v2/ and /reference-data/ endpoints instead.
```

|    | market                    | min\_time                        | max\_time                        | exchange | type | orderbooks                                         | quotes                                             | base | quote    | symbol  | status  | order\_amount\_increment | order\_amount\_min | order\_amount\_max | order\_price\_increment | order\_price\_min | order\_price\_max | order\_size\_min | min\_time\_trades                | max\_time\_trades                |
| -- | ------------------------- | -------------------------------- | -------------------------------- | -------- | ---- | -------------------------------------------------- | -------------------------------------------------- | ---- | -------- | ------- | ------- | ------------------------ | ------------------ | ------------------ | ----------------------- | ----------------- | ----------------- | ---------------- | -------------------------------- | -------------------------------- |
| 25 | binance-btc-usdt-spot     | 2017-08-17 04:00:32.285000+00:00 | 2024-09-11 19:26:10.036000+00:00 | binance  | spot | {'min\_time': '2021-08-03T16:00:00.000000000Z',... | {'min\_time': '2021-08-03T16:00:00.000000000Z',... | btc  | usdt     | BTCUSDT | online  | 0.00001000               | 0.00001000         | 9000.00000000      | 0.01000000              | 0.01000000        | 1000000.00000000  | 5.00000000       | 2017-08-17 04:00:32.285000+00:00 | 2024-09-11 19:26:10.036000+00:00 |
| 26 | binance-btc-ust-spot      | 2022-04-22 09:00:00+00:00        | 2022-05-13 00:49:59.802000+00:00 | binance  | spot | {'min\_time': '2022-04-22T09:00:00.000000000Z',... | {'min\_time': '2022-04-22T09:00:00.000000000Z',... | btc  | ust      | BTCUST  | offline | 0.00001000               | 0.00001000         | 9000.00000000      | 0.01000000              | 0.01000000        | 1000000.00000000  | 10.00000000      | 2022-04-22 09:00:00.802000+00:00 | 2022-05-13 00:49:59.802000+00:00 |
| 27 | binance-btc-vai-spot      | 2021-02-04 00:00:00+00:00        | 2021-10-18 11:55:00+00:00        | binance  | spot | NaN                                                | NaN                                                | btc  | vai      | \<NA>   | \<NA>   | \<NA>                    | \<NA>              | \<NA>              | \<NA>                   | \<NA>             | \<NA>             | \<NA>            | NaT                              | NaT                              |
| 28 | binance-btc-vai\_vai-spot | 2021-02-04 10:00:00.761000+00:00 | 2021-09-18 12:00:00+00:00        | binance  | spot | {'min\_time': '2021-09-14T16:00:00.000000000Z',... | {'min\_time': '2021-09-14T16:00:00.000000000Z',... | btc  | vai\_vai | BTCVAI  | offline | 0.00001000               | 0.00001000         | 9000.00000000      | 0.01000000              | 0.01000000        | 1000000.00000000  | 10.00000000      | 2021-02-04 10:00:00.761000+00:00 | 2021-09-18 11:55:27.171000+00:00 |
| 29 | binance-btc-zar-spot      | 2020-03-27 04:01:58.397000+00:00 | 2024-09-11 19:22:56.318000+00:00 | binance  | spot | {'min\_time': '2022-10-03T10:00:00.000000000Z',... | {'min\_time': '2022-10-03T10:00:00.000000000Z',... | btc  | zar      | BTCZAR  | online  | 0.00001000               | 0.00001000         | 922.00000000       | 1.00000000              | 1.00000000        | 99928191.00000000 | 100.00000000     | 2020-03-27 04:01:58.397000+00:00 | 2024-09-11 19:22:56.318000+00:00 |

Catalog objects return a list of dictionaries. For `catalog_assets`, each element of the list is an asset, while each dictionary is a set of metadata for that specific asset.

```python
print(f"Market catalog metadata includes: {list(btc_market_catalog.keys())}")
```

```
Market catalog metadata includes: ['market', 'min_time', 'max_time', 'exchange', 'type', 'orderbooks', 'quotes', 'base', 'quote', 'symbol', 'status', 'order_amount_increment', 'order_amount_min', 'order_amount_max', 'order_price_increment', 'order_price_min', 'order_price_max', 'order_size_min', 'min_time_trades', 'max_time_trades']
```

***

## Example 1: Returns by coin in the CM Reference Rates universe

***

We offer reference rates quoted in USD, Euro, Bitcoin, and Ethereum. We now support these quote currencies for our entire reference rates coverage universe of over 500 assets and for all of our frequencies, including 1s, 1m, 1h, 1d-ny-close and 1d.

**Fig. 1 - 7 Day Price Change chart from State of the Market**\
![](https://5264302.fs1.hubspotusercontent-na1.net/hubfs/5264302/State%20of%20the%20Market%20-%20Chart%20Examples/Mini-RefRate-Returns.png)

```python
# Get all assets that have a reference rate 
assets_refrate = client.catalog_metrics("ReferenceRateUSD").to_dataframe()
assets_refrate[['metric','frequency','asset']]
```

```
2024-09-11 15:18:51 WARNING  /catalog/ endpoints will be deprecated in the future. Consider using /catalog-v2/ and /reference-data/ endpoints instead.
```

|      | metric           | frequency   | asset    |
| ---- | ---------------- | ----------- | -------- |
| 0    | ReferenceRateUSD | 1s          | 1cat     |
| 1    | ReferenceRateUSD | 1s          | 1inch    |
| 2    | ReferenceRateUSD | 1s          | a8       |
| 3    | ReferenceRateUSD | 1s          | aave     |
| 4    | ReferenceRateUSD | 1s          | abbc     |
| ...  | ...              | ...         | ...      |
| 5955 | ReferenceRateUSD | 1d-ny-close | zks      |
| 5956 | ReferenceRateUSD | 1d-ny-close | zkx      |
| 5957 | ReferenceRateUSD | 1d-ny-close | zro      |
| 5958 | ReferenceRateUSD | 1d-ny-close | zrx      |
| 5959 | ReferenceRateUSD | 1d-ny-close | ztx\_ztx |

5960 rows × 3 columns

```python
print('\nNumber of unique Reference Rate assets: ' + str(len(pd.unique(assets_refrate['asset'])))+'\n')
```

```
Number of unique Reference Rate assets: 1192
```

We can retrieve Reference Rates from the `get_asset_metrics` endpoint. The code snippets below demonstrate how to do this with a small list of assets.

```python
# Retrieve Reference Rate
df_prices = client.get_asset_metrics(
    assets=['btc', 'eth', 'bnb', 'ada', 'doge', 'xrp'],
    metrics='ReferenceRateUSD',
    frequency='1d',
    start_time='2022-08-10',
    end_time='2022-08-17'
).to_dataframe()

# Assign datatypes
df_prices["time"] = pd.to_datetime(df_prices.time)
df_prices["ReferenceRateUSD"] = df_prices.ReferenceRateUSD.astype(float)
# Reshape dataset so assets are in columns, dates are the rows, and the values are prices
df_prices_pivot = df_prices.pivot(index="time",columns="asset",values="ReferenceRateUSD")
```

```python
df_prices_pivot.head(3)
```

| asset                     | ada      | bnb        | btc          | doge     | eth         | xrp      |
| ------------------------- | -------- | ---------- | ------------ | -------- | ----------- | -------- |
| time                      |          |            |              |          |             |          |
| 2022-08-10 00:00:00+00:00 | 0.514033 | 325.442291 | 23186.291746 | 0.069148 | 1703.992249 | 0.368363 |
| 2022-08-11 00:00:00+00:00 | 0.536694 | 328.034925 | 23923.058483 | 0.071153 | 1850.829961 | 0.380704 |
| 2022-08-12 00:00:00+00:00 | 0.530497 | 323.337253 | 23934.439056 | 0.070800 | 1878.113096 | 0.379859 |

```python
# Index each asset's time series to 1 
for col in df_prices_pivot.columns:
    logging.info(f"Calculating returns for {col}....")
    first_price = df_prices_pivot[df_prices_pivot[col].notnull()][col].iloc[0]
    df_prices_pivot[col] = df_prices_pivot[col]/first_price
    df_prices_pivot[col] = df_prices_pivot[col].ffill()
```

```
2024-09-11 15:18:52 INFO     Calculating returns for ada....


2024-09-11 15:18:52 INFO     Calculating returns for bnb....


2024-09-11 15:18:52 INFO     Calculating returns for btc....


2024-09-11 15:18:52 INFO     Calculating returns for doge....


2024-09-11 15:18:52 INFO     Calculating returns for eth....


2024-09-11 15:18:52 INFO     Calculating returns for xrp....
```

```python
df_prices_pivot
```

| asset                     | ada      | bnb      | btc      | doge     | eth      | xrp      |
| ------------------------- | -------- | -------- | -------- | -------- | -------- | -------- |
| time                      |          |          |          |          |          |          |
| 2022-08-10 00:00:00+00:00 | 1.000000 | 1.000000 | 1.000000 | 1.000000 | 1.000000 | 1.000000 |
| 2022-08-11 00:00:00+00:00 | 1.044084 | 1.007966 | 1.031776 | 1.028991 | 1.086173 | 1.033501 |
| 2022-08-12 00:00:00+00:00 | 1.032028 | 0.993532 | 1.032267 | 1.023896 | 1.102184 | 1.031207 |
| 2022-08-13 00:00:00+00:00 | 1.051484 | 1.005325 | 1.052187 | 1.046478 | 1.147176 | 1.030523 |
| 2022-08-14 00:00:00+00:00 | 1.089703 | 0.995682 | 1.053477 | 1.054227 | 1.162703 | 1.025361 |
| 2022-08-15 00:00:00+00:00 | 1.110819 | 0.976807 | 1.048646 | 1.183001 | 1.136355 | 1.021364 |
| 2022-08-16 00:00:00+00:00 | 1.070279 | 0.980408 | 1.038715 | 1.106155 | 1.116053 | 1.017113 |
| 2022-08-17 00:00:00+00:00 | 1.085200 | 0.971739 | 1.029437 | 1.257445 | 1.101305 | 1.023202 |

***

## Example 2: Spot trading volume on Coinbase

***

**Fig. 2 - Coinbase daily spot volume breakdown from State of the Market**\
![](https://5264302.fs1.hubspotusercontent-na1.net/hubfs/5264302/State%20of%20the%20Market%20-%20Chart%20Examples/Coinbase-Volume-Breakdown.png)

#### Foundational Data Types - Trades

Trades are one of the foundational data types we collect from exchanges. From raw trades data, we can construct additional aggregated metrics.

```python
coinbase_btc_trades = client.get_market_trades(
    markets='coinbase-btc-usd-spot',
    limit_per_market=5,
    paging_from='end'
).to_dataframe()
```

```python
coinbase_btc_trades
```

|   | market                | time                             | coin\_metrics\_id | amount   | price    | database\_time                   | side |
| - | --------------------- | -------------------------------- | ----------------- | -------- | -------- | -------------------------------- | ---- |
| 0 | coinbase-btc-usd-spot | 2024-09-11 20:18:48.621787+00:00 | 690965739         | 0.021684 | 57614.23 | 2024-09-11 20:18:49.612634+00:00 | sell |
| 1 | coinbase-btc-usd-spot | 2024-09-11 20:18:49.625122+00:00 | 690965740         | 0.000257 | 57616.5  | 2024-09-11 20:18:50.141086+00:00 | buy  |
| 2 | coinbase-btc-usd-spot | 2024-09-11 20:18:49.625122+00:00 | 690965741         | 0.000095 | 57616.5  | 2024-09-11 20:18:50.141086+00:00 | buy  |
| 3 | coinbase-btc-usd-spot | 2024-09-11 20:18:51.226728+00:00 | 690965742         | 0.000257 | 57616.5  | 2024-09-11 20:18:51.571653+00:00 | buy  |
| 4 | coinbase-btc-usd-spot | 2024-09-11 20:18:51.226728+00:00 | 690965743         | 0.001397 | 57617.0  | 2024-09-11 20:18:51.571653+00:00 | buy  |

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
candles_coinbase["candle_usd_volume"] = candles_coinbase.candle_usd_volume.astype(float)
candles_coinbase["time"] = pd.to_datetime(candles_coinbase.time)
```

```python
candles_coinbase.head()
```

|   | market                  | time                      | price\_open | price\_close | price\_high | price\_low | vwap     | volume   | candle\_usd\_volume | candle\_trades\_count |
| - | ----------------------- | ------------------------- | ----------- | ------------ | ----------- | ---------- | -------- | -------- | ------------------- | --------------------- |
| 0 | coinbase-1inch-btc-spot | 2022-08-16 00:00:00+00:00 | 0.000034    | 0.000034     | 0.000035    | 0.000034   | 0.000034 | 12601.82 | 10324.267565        | 204                   |
| 1 | coinbase-1inch-btc-spot | 2022-08-17 00:00:00+00:00 | 0.000034    | 0.000033     | 0.000035    | 0.000033   | 0.000034 | 6400.08  | 5251.890725         | 226                   |
| 2 | coinbase-1inch-eur-spot | 2022-08-16 00:00:00+00:00 | 0.807       | 0.805        | 0.82        | 0.795      | 0.807773 | 62791.36 | 51499.294594        | 475                   |
| 3 | coinbase-1inch-eur-spot | 2022-08-17 00:00:00+00:00 | 0.805       | 0.755        | 0.828       | 0.752      | 0.78722  | 56349.99 | 45122.160088        | 478                   |
| 4 | coinbase-1inch-gbp-spot | 2022-08-16 00:00:00+00:00 | 0.679       | 0.677        | 0.691       | 0.669      | 0.680058 | 16631.32 | 13651.391996        | 67                    |

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
    exchanges='coinbase',
    metrics ='volume_reported_spot_usd_1d',
    start_time='2022-08-10',
    end_time='2022-08-17'
).to_dataframe()
```

```python
coinbase_volume
```

|   | exchange | time                      | volume\_reported\_spot\_usd\_1d |
| - | -------- | ------------------------- | ------------------------------- |
| 0 | coinbase | 2022-08-10 00:00:00+00:00 | 2364732395.45783                |
| 1 | coinbase | 2022-08-11 00:00:00+00:00 | 2388044971.16654                |
| 2 | coinbase | 2022-08-12 00:00:00+00:00 | 1568920157.28374                |
| 3 | coinbase | 2022-08-13 00:00:00+00:00 | 1564683366.92133                |
| 4 | coinbase | 2022-08-14 00:00:00+00:00 | 2093992312.94672                |
| 5 | coinbase | 2022-08-15 00:00:00+00:00 | 2514301745.80601                |
| 6 | coinbase | 2022-08-16 00:00:00+00:00 | 1978781752.31132                |
| 7 | coinbase | 2022-08-17 00:00:00+00:00 | 2353956243.32178                |

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
    markets='coinbase-btc-usd-spot',
    depth_limit=100, # For full order book depth, pass the parameter 'full_book'. 
                     # For 10% of depth (where the price is within +/-10 % of mid-price), pass the parameter '10pct_mid_price'.
    limit_per_market=5,
    paging_from='end'
).to_dataframe()
```

```python
top100_snapshot
```

|   | market                | time                      | coin\_metrics\_id  | asks                                               | bids                                               | database\_time                   |
| - | --------------------- | ------------------------- | ------------------ | -------------------------------------------------- | -------------------------------------------------- | -------------------------------- |
| 0 | coinbase-btc-usd-spot | 2024-09-11 20:18:10+00:00 | 1726085890000000-0 | \[{'price': '57599.17', 'size': '0.12760278'}, ... | \[{'price': '57599.16', 'size': '0.05011839'}, ... | 2024-09-11 20:18:10.372158+00:00 |
| 1 | coinbase-btc-usd-spot | 2024-09-11 20:18:20+00:00 | 1726085900000000-0 | \[{'price': '57627.51', 'size': '0.5361691'}, {... | \[{'price': '57627.5', 'size': '0.01317834'}, {... | 2024-09-11 20:18:20.387447+00:00 |
| 2 | coinbase-btc-usd-spot | 2024-09-11 20:18:30+00:00 | 1726085910000000-0 | \[{'price': '57618.88', 'size': '0.00025725'}, ... | \[{'price': '57618.87', 'size': '0.00039129'}, ... | 2024-09-11 20:18:30.370948+00:00 |
| 3 | coinbase-btc-usd-spot | 2024-09-11 20:18:40+00:00 | 1726085920000000-0 | \[{'price': '57615.24', 'size': '0.45707923'}, ... | \[{'price': '57615.23', 'size': '0.0007637'}, {... | 2024-09-11 20:18:40.409875+00:00 |
| 4 | coinbase-btc-usd-spot | 2024-09-11 20:18:50+00:00 | 1726085930000000-0 | \[{'price': '57616.5', 'size': '0.19933793'}, {... | \[{'price': '57616.49', 'size': '0.00047448'}, ... | 2024-09-11 20:18:50.398049+00:00 |

```python
bids = eval(top100_snapshot.bids[0])
bids[0:10]
```

```
[{'price': '57599.16', 'size': '0.05011839'},
 {'price': '57597.82', 'size': '0.28063909'},
 {'price': '57597.81', 'size': '0.46773165'},
 {'price': '57596.05', 'size': '0.02117'},
 {'price': '57596.04', 'size': '0.05557414'},
 {'price': '57595.27', 'size': '0.16452446'},
 {'price': '57593.41', 'size': '0.03000003'},
 {'price': '57593.4', 'size': '0.05'},
 {'price': '57590', 'size': '0.00013034'},
 {'price': '57589.7', 'size': '0.04347769'}]
```

#### Market Quotes - Best Bid & Asks

As an added convenience, we also serve the top bid/ask via a separate timeseries/market-quotes endpoint. Quotes are derived from our order book snapshots, so they are available at the same 10s intervals.

```python
btc_quotes = client.get_market_quotes(
    markets='coinbase-btc-usd-spot',
    limit_per_market=5,
    paging_from='end'
).to_dataframe()
```

```python
btc_quotes
```

|   | market                | time                      | coin\_metrics\_id  | ask\_price | ask\_size | bid\_price | bid\_size |
| - | --------------------- | ------------------------- | ------------------ | ---------- | --------- | ---------- | --------- |
| 0 | coinbase-btc-usd-spot | 2024-09-11 20:18:10+00:00 | 1726085890000000-0 | 57599.17   | 0.127603  | 57599.16   | 0.050118  |
| 1 | coinbase-btc-usd-spot | 2024-09-11 20:18:20+00:00 | 1726085900000000-0 | 57627.51   | 0.536169  | 57627.5    | 0.013178  |
| 2 | coinbase-btc-usd-spot | 2024-09-11 20:18:30+00:00 | 1726085910000000-0 | 57618.88   | 0.000257  | 57618.87   | 0.000391  |
| 3 | coinbase-btc-usd-spot | 2024-09-11 20:18:40+00:00 | 1726085920000000-0 | 57615.24   | 0.457079  | 57615.23   | 0.000764  |
| 4 | coinbase-btc-usd-spot | 2024-09-11 20:18:50+00:00 | 1726085930000000-0 | 57616.5    | 0.199338  | 57616.49   | 0.000474  |

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
    markets='binance-BTCUSD_PERP-future',
    end_time='2022-08-17',
    limit_per_market=5,
    paging_from='end'
).to_dataframe()
```

```python
oi_btc_perp
```

|   | market                      | time                      | contract\_count | value\_usd | database\_time                   | exchange\_time            |
| - | --------------------------- | ------------------------- | --------------- | ---------- | -------------------------------- | ------------------------- |
| 0 | binance-BTCUSD\_PERP-future | 2022-08-17 23:55:00+00:00 | 3982211         | 398221100  | 2022-08-17 23:55:11.890405+00:00 | 2022-08-17 23:55:00+00:00 |
| 1 | binance-BTCUSD\_PERP-future | 2022-08-17 23:56:00+00:00 | 3981078         | 398107800  | 2022-08-17 23:56:30.226528+00:00 | 2022-08-17 23:56:00+00:00 |
| 2 | binance-BTCUSD\_PERP-future | 2022-08-17 23:57:00+00:00 | 3979201         | 397920100  | 2022-08-17 23:57:08.240922+00:00 | 2022-08-17 23:57:00+00:00 |
| 3 | binance-BTCUSD\_PERP-future | 2022-08-17 23:58:00+00:00 | 3979191         | 397919100  | 2022-08-17 23:58:18.250239+00:00 | 2022-08-17 23:58:00+00:00 |
| 4 | binance-BTCUSD\_PERP-future | 2022-08-17 23:59:00+00:00 | 3979133         | 397913300  | 2022-08-17 23:59:07.291820+00:00 | 2022-08-17 23:59:00+00:00 |

#### Aggregated Open Interest - Daily by Asset & Contract Type

In addition to querying open interest for specific markets/contracts, the `get_asset_metrics` endpoint can also be used to retrieve aggregated open interest. Our reported future open interest metric is an aggregation of the reported future open interest from all futures exchanges in CM's coverage universe.

We offer aggregated futures open interest for the following futures contract types:

* Reported Future Open Interest
* Reported Perpetual Future Open Interest
* Reported Non-Perpetual Future Open Interest
* Reported Coin-Margined Future Open Interest
* Reported Tether-Margined Future Open Interest

```python
oi_btc_eth = client.get_asset_metrics(
    assets='btc,eth',
    metrics='open_interest_reported_future_usd,open_interest_reported_future_nonperpetual_usd,open_interest_reported_future_perpetual_usd',
    frequency='1d',
    limit_per_asset=3,
    paging_from='end'
).to_dataframe()
```

```python
oi_btc_eth
```

|   | asset | time                      | open\_interest\_reported\_future\_nonperpetual\_usd | open\_interest\_reported\_future\_perpetual\_usd | open\_interest\_reported\_future\_usd |
| - | ----- | ------------------------- | --------------------------------------------------- | ------------------------------------------------ | ------------------------------------- |
| 0 | btc   | 2024-09-09 00:00:00+00:00 | 9774359687.35928                                    | 14703998339.544001                               | 24478358026.903301                    |
| 1 | btc   | 2024-09-10 00:00:00+00:00 | 10123550914.9461                                    | 15321509986.6583                                 | 25445060901.604401                    |
| 2 | btc   | 2024-09-11 00:00:00+00:00 | 10382377836.8039                                    | 15393970384.430799                               | 25776348221.234798                    |
| 3 | eth   | 2024-09-09 00:00:00+00:00 | 1337797270.94956                                    | 7131110098.86545                                 | 8468907369.81501                      |
| 4 | eth   | 2024-09-10 00:00:00+00:00 | 1361145037.61274                                    | 7202272289.01388                                 | 8563417326.62662                      |
| 5 | eth   | 2024-09-11 00:00:00+00:00 | 1374020181.6192                                     | 7235668722.38422                                 | 8609688904.003429                     |

#### Perpetual Futures Funding Rates

Funding rates are a mechanism that exchanges use to ensure that perpetual futures trade at a price that is close to the price of the underlying spot markets. The funding rate is used to calculate the funding fee which long position holders pay short position holders, or vice versa, as a way to incentivize market participants to take positions that keep perpetual futures prices close to the underlying.

```python
funding_btc_perp = client.get_market_funding_rates(
    markets='binance-BTCUSD_PERP-future',
    end_time='2022-08-17',
    limit_per_market=5
).to_dataframe()
```

```python
funding_btc_perp
```

|   | market                      | time                             | database\_time                   | rate   | period   | interval |
| - | --------------------------- | -------------------------------- | -------------------------------- | ------ | -------- | -------- |
| 0 | binance-BTCUSD\_PERP-future | 2020-08-10 16:00:00+00:00        | 2020-12-02 10:49:37.530167+00:00 | 0.0001 | 08:00:00 | 08:00:00 |
| 1 | binance-BTCUSD\_PERP-future | 2020-08-11 00:00:00+00:00        | 2020-12-02 10:49:37.530167+00:00 | 0.0001 | 08:00:00 | 08:00:00 |
| 2 | binance-BTCUSD\_PERP-future | 2020-08-11 08:00:00.008000+00:00 | 2020-12-02 10:49:37.530167+00:00 | 0.0001 | 08:00:00 | 08:00:00 |
| 3 | binance-BTCUSD\_PERP-future | 2020-08-11 16:00:00+00:00        | 2020-12-02 10:49:37.530167+00:00 | 0.0001 | 08:00:00 | 08:00:00 |
| 4 | binance-BTCUSD\_PERP-future | 2020-08-12 00:00:00+00:00        | 2020-12-02 10:49:37.530167+00:00 | 0.0001 | 08:00:00 | 08:00:00 |

**Fig. 5 - Bitcoin perpetual futures funding rates from State of the Market**\
![](https://5264302.fs1.hubspotusercontent-na1.net/hubfs/5264302/State%20of%20the%20Market%20-%20Chart%20Examples/BTC-perp-funding-rates.png)

#### Futures Basis Metrics - Aggregated by Exchange-Asset

The basis is the annualized percent difference between the price of a theoretical futures contract and the price of its underlying spot market. Coin Metrics calculates this for several exchange-assets such as `binance-btc` and `ftx-eth`. We calculate four basis metrics at defined days to expiration: 30 day, 60 day, 90 day, and 120 day.

```python
basis_binance = client.get_exchange_asset_metrics(
    exchange_assets='binance-btc', 
    metrics='basis_annualized_30d_exp,basis_annualized_60d_exp,basis_annualized_90d_exp'
).to_dataframe()
```

```python
basis_binance.tail()
```

|      | exchange\_asset | time                      | basis\_annualized\_30d\_exp | basis\_annualized\_60d\_exp | basis\_annualized\_90d\_exp |
| ---- | --------------- | ------------------------- | --------------------------- | --------------------------- | --------------------------- |
| 1548 | binance-btc     | 2024-09-07 00:00:00+00:00 | 0.06171                     | 0.068975                    | 0.071397                    |
| 1549 | binance-btc     | 2024-09-08 00:00:00+00:00 | 0.062091                    | 0.069271                    | 0.071665                    |
| 1550 | binance-btc     | 2024-09-09 00:00:00+00:00 | 0.063529                    | 0.069513                    | 0.071508                    |
| 1551 | binance-btc     | 2024-09-10 00:00:00+00:00 | 0.079579                    | 0.07792                     | 0.077367                    |
| 1552 | binance-btc     | 2024-09-11 00:00:00+00:00 | 0.075326                    | 0.073356                    | 0.0727                      |

**Fig. 6 - Bitcoin futures basis from State of the Market**\
![](https://5264302.fs1.hubspotusercontent-na1.net/hubfs/5264302/State%20of%20the%20Market%20-%20Chart%20Examples/Futures-Basis.png)

#### Futures Liquidations - Individual Orders/Trades

Exchanges which offer futures markets utilize a risk management system that will attempt to close a user’s position before the point at which the user begins to owe more than what is in the user's account. The trade or order that closes the user's position is referred to as a liquidation.

* Some exchanges report **liquidations orders** in which they will report the creation of a liquidation order when a trader’s position initially enters liquidation. When a trader’s position enters liquidation, an exchange will typically enter a limit order at the trader's bankruptcy price. The order will show the amount of the position that is being liquidated and the liquidation price, but will not represent the matched trades that are executed as a result of the liquidation.
* Other exchanges will report **liquidation trades** which represent the actual matched trades as a result of a liquidation order but will not report liquidation orders.
* Some exchanges will report both liquidation orders and liquidation trades.

```python
mkt_liqs_binance = client.get_market_liquidations(
    markets='binance-BTCUSDT-future', 
    limit_per_market=3
).to_dataframe()
```

```python
mkt_liqs_binance.head()
```

|   | market                 | time                             | coin\_metrics\_id   | amount | price    | type  | database\_time                   | side |
| - | ---------------------- | -------------------------------- | ------------------- | ------ | -------- | ----- | -------------------------------- | ---- |
| 0 | binance-BTCUSDT-future | 2019-09-10 19:36:50.009000+00:00 | 1568144210009000000 | 0.199  | 10013.89 | trade | 2020-10-08 06:03:35.854962+00:00 | sell |
| 1 | binance-BTCUSDT-future | 2019-09-10 19:38:06.010000+00:00 | 1568144286010000000 | 0.04   | 9952.16  | trade | 2020-10-08 06:03:35.854962+00:00 | sell |
| 2 | binance-BTCUSDT-future | 2019-09-11 06:51:13.010000+00:00 | 1568184673010000000 | 0.04   | 9944.65  | trade | 2020-10-08 06:03:35.854962+00:00 | sell |

#### Futures Liquidations - Aggregated Daily or Hourly

```python
liqs_binance = client.get_market_metrics(
    markets='binance-BTCUSDT-future', 
    metrics='liquidations_reported_future_buy_usd_1d'
).to_dataframe()
```

```python
liqs_binance.head()
```

|   | market                 | time                      | liquidations\_reported\_future\_buy\_usd\_1d |
| - | ---------------------- | ------------------------- | -------------------------------------------- |
| 0 | binance-BTCUSDT-future | 2019-09-12 00:00:00+00:00 | 114.5749                                     |
| 1 | binance-BTCUSDT-future | 2019-09-19 00:00:00+00:00 | 268916.41422                                 |
| 2 | binance-BTCUSDT-future | 2019-09-20 00:00:00+00:00 | 18519.28155                                  |
| 3 | binance-BTCUSDT-future | 2019-09-21 00:00:00+00:00 | 8795.16                                      |
| 4 | binance-BTCUSDT-future | 2019-09-23 00:00:00+00:00 | 62820.22767                                  |

**Fig. 7 - Bitcoin perpetual futures liquidations from State of the Market**\
![](https://5264302.fs1.hubspotusercontent-na1.net/hubfs/5264302/State%20of%20the%20Market%20-%20Chart%20Examples/BTC-Perp-Liquidations.png)

***

## Example 5: Options data types

***

We offer options data from two of the most liquid options trading venues, Deribit and OKX. Supported data types include implied volatility, trades, open interest, contract prices, contract specifications, quotes, and greeks. We recently expanded our options coverage to include several new data types from Deribit and added several new API endpoints to serve this data.

#### Options Contracts - Implied Volatility

```python
iv_deribit = client.get_market_implied_volatility(
    markets='deribit-BTC-18AUG22-*-option', 
    end_time='2022-08-17',
    limit_per_market=1
).to_dataframe()
```

```python
iv_deribit.head()
```

|   | market                             | time                      | database\_time                   | iv\_bid | iv\_ask | iv\_mark | exchange\_time                   |
| - | ---------------------------------- | ------------------------- | -------------------------------- | ------- | ------- | -------- | -------------------------------- |
| 0 | deribit-BTC-18AUG22-19000-C-option | 2022-08-16 08:04:00+00:00 | 2022-08-16 08:04:59.435418+00:00 | 0.0     | 0.0     | 1.0      | 2022-08-16 08:04:58.622000+00:00 |
| 1 | deribit-BTC-18AUG22-19000-P-option | 2022-08-16 08:04:00+00:00 | 2022-08-16 08:04:58.430009+00:00 | 0.0     | 2.5561  | 1.0      | 2022-08-16 08:04:57.613000+00:00 |
| 2 | deribit-BTC-18AUG22-20000-C-option | 2022-08-16 08:04:00+00:00 | 2022-08-16 08:04:57.429870+00:00 | 0.0     | 0.0     | 1.0      | 2022-08-16 08:04:56.605000+00:00 |
| 3 | deribit-BTC-18AUG22-20000-P-option | 2022-08-16 08:04:00+00:00 | 2022-08-16 08:04:58.430009+00:00 | 0.0     | 2.0536  | 1.0      | 2022-08-16 08:04:57.612000+00:00 |
| 4 | deribit-BTC-18AUG22-21000-C-option | 2022-08-16 08:04:00+00:00 | 2022-08-16 08:04:58.430009+00:00 | 0.0     | 0.0     | 1.0      | 2022-08-16 08:04:57.620000+00:00 |

**Fig. 8 - Bitcoin 'Volatility Smile' from State of the Market**\
![](https://5264302.fs1.hubspotusercontent-na1.net/hubfs/5264302/State%20of%20the%20Market%20-%20Chart%20Examples/BTC-IV-vs-StrikePrice.png)

#### Options Contracts - Market Greeks

```python
greeks_deribit = client.get_market_greeks(
    markets='deribit-BTC-18AUG22-*-option', 
    end_time='2022-08-17',
    limit_per_market=1
).to_dataframe()
```

```python
greeks_deribit.head()
```

|   | market                             | time                      | database\_time                   | vega    | theta     | rho      | delta    | gamma   | exchange\_time                   |
| - | ---------------------------------- | ------------------------- | -------------------------------- | ------- | --------- | -------- | -------- | ------- | -------------------------------- |
| 0 | deribit-BTC-18AUG22-19000-C-option | 2022-08-16 08:04:00+00:00 | 2022-08-16 08:04:59.435418+00:00 | 0.03878 | -0.97127  | 1.03845  | 0.99938  | 0.0     | 2022-08-16 08:04:58.622000+00:00 |
| 1 | deribit-BTC-18AUG22-19000-P-option | 2022-08-16 08:04:00+00:00 | 2022-08-16 08:04:58.430009+00:00 | 0.03875 | -0.30251  | -0.00084 | -0.00062 | 0.0     | 2022-08-16 08:04:57.613000+00:00 |
| 2 | deribit-BTC-18AUG22-20000-C-option | 2022-08-16 08:04:00+00:00 | 2022-08-16 08:04:57.429870+00:00 | 0.287   | -7.18741  | 1.08637  | 0.99435  | 0.00001 | 2022-08-16 08:04:56.605000+00:00 |
| 3 | deribit-BTC-18AUG22-20000-P-option | 2022-08-16 08:04:00+00:00 | 2022-08-16 08:04:58.430009+00:00 | 0.28587 | -3.27365  | -0.00759 | -0.00563 | 0.00001 | 2022-08-16 08:04:57.612000+00:00 |
| 4 | deribit-BTC-18AUG22-21000-C-option | 2022-08-16 08:04:00+00:00 | 2022-08-16 08:04:58.430009+00:00 | 1.22414 | -30.65678 | 1.1075   | 0.9696   | 0.00004 | 2022-08-16 08:04:57.620000+00:00 |

**Fig. 9 - Option Chain from State of the Market**\
![](https://5264302.fs1.hubspotusercontent-na1.net/hubfs/5264302/State%20of%20the%20Market%20-%20Chart%20Examples/Option-Chain.png)

#### Options Contracts - Market Quotes

```python
quotes_deribit = client.get_market_quotes(
    markets='deribit-BTC-18AUG22-*-option', 
    end_time='2022-08-17',
    limit_per_market=3
).to_dataframe()
```

```python
quotes_deribit.head()
```

|   | market                             | time                      | coin\_metrics\_id  | ask\_price | ask\_size | bid\_price | bid\_size |
| - | ---------------------------------- | ------------------------- | ------------------ | ---------- | --------- | ---------- | --------- |
| 0 | deribit-BTC-18AUG22-19000-C-option | 2022-08-16 08:04:00+00:00 | 1660637040000000-0 | 0.0        | 0.0       | 0.0        | 0.0       |
| 1 | deribit-BTC-18AUG22-19000-C-option | 2022-08-16 08:05:00+00:00 | 1660637100000000-0 | 0.0        | 0.0       | 0.0        | 0.0       |
| 2 | deribit-BTC-18AUG22-19000-C-option | 2022-08-16 08:06:00+00:00 | 1660637160000000-0 | 0.0        | 0.0       | 0.0        | 0.0       |
| 3 | deribit-BTC-18AUG22-19000-P-option | 2022-08-16 08:04:00+00:00 | 1660637040000000-0 | 0.1        | 0.0085    | 0.0        | 0.0       |
| 4 | deribit-BTC-18AUG22-19000-P-option | 2022-08-16 08:05:00+00:00 | 1660637100000000-0 | 10.0       | 0.0005    | 0.0        | 0.0       |

#### Options Contracts - Market Open Interest

```python
oi_deribit = client.get_market_open_interest(
    markets='deribit-BTC-30DEC22-*-option', 
    paging_from='end',
    limit_per_market=1
).to_dataframe()
```

```python
oi_deribit.sort_values('value_usd').tail()
```

|    | market                             | time                      | contract\_count | value\_usd    | database\_time                   | exchange\_time            |
| -- | ---------------------------------- | ------------------------- | --------------- | ------------- | -------------------------------- | ------------------------- |
| 62 | deribit-BTC-30DEC22-35000-C-option | 2022-12-30 07:59:00+00:00 | 6564.4          | 108156695.5   | 2022-12-30 07:59:11.450250+00:00 | 2022-12-30 07:59:00+00:00 |
| 7  | deribit-BTC-30DEC22-12000-P-option | 2022-12-30 07:59:00+00:00 | 6609.7          | 108902937.431 | 2022-12-30 07:59:21.456460+00:00 | 2022-12-30 07:59:00+00:00 |
| 15 | deribit-BTC-30DEC22-15000-P-option | 2022-12-30 07:59:00+00:00 | 6873.1          | 113242845.144 | 2022-12-30 07:59:12.451403+00:00 | 2022-12-30 07:59:00+00:00 |
| 1  | deribit-BTC-30DEC22-10000-P-option | 2022-12-30 07:59:00+00:00 | 7731.2          | 127381029.376 | 2022-12-30 07:59:21.456460+00:00 | 2022-12-30 07:59:00+00:00 |
| 54 | deribit-BTC-30DEC22-30000-C-option | 2022-12-30 07:59:00+00:00 | 7836.8          | 129120997.632 | 2022-12-30 07:59:17.454662+00:00 | 2022-12-30 07:59:00+00:00 |

**Fig. 10 - Option Open Interest from State of the Market**\
![](https://5264302.fs1.hubspotusercontent-na1.net/hubfs/5264302/State%20of%20the%20Market%20-%20Chart%20Examples/Options-OI.png)
