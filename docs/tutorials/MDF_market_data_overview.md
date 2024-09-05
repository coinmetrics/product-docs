<img src="https://5264302.fs1.hubspotusercontent-na1.net/hubfs/5264302/Demo%20Asset%20Resources/CM-Demo-market_data_overview-Cover.png" width=1100 margin-left='auto' margin-right='auto'/>

Coin Metrics **Market Data Feed** provides access to historical and real-time data from over 39 of the world’s leading spot and derivatives crypto exchanges. We offer all of the fundamental market-related data types including tick-by-tick trades, quotes, order book snapshots, candles, and more.

The example charts showcased in this notebook are presented on a weekly basis in our [State of the Market](http://stateofthe.market/) newsletter.

### Resources

This notebook demonstrates basic functionality offered by the Coin Metrics Python API Client and [Market Data Feed](https://coinmetrics.io/market-data-feed/).

Coin Metrics offers a vast assortment of data for hundreds of cryptoassets. The Python API Client allows for easy access to this data using Python without needing to create your own wrappers using `requests` and other such libraries.

To understand the data that Coin Metrics offers, feel free to peruse the resources below.

- The [Coin Metrics API v4](https://docs.coinmetrics.io/api/v4) website contains the full set of endpoints and data offered by Coin Metrics.
- The [Coin Metrics Knowledge Base](https://docs.coinmetrics.io/info) gives detailed, conceptual explanations of the data that Coin Metrics offers.
- The [API Spec](https://coinmetrics.github.io/api-client-python/site/api_client.html) contains a full list of functions.

## Setup


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

    2024-09-05 01:38:29 INFO     Using API key found in environment


# Catalog Endpoints

The `catalog` endpoints display the set of data available to your API key. The `catalog-all` endpoints display the full set of data for CM Pro users.


```python
btc_market_catalog = client.catalog_markets(
                    base='btc',
                    market_type='spot',
                    exchange='binance'
                    ).to_dataframe()
btc_market_catalog.tail(5)
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>market</th>
      <th>min_time</th>
      <th>max_time</th>
      <th>exchange</th>
      <th>type</th>
      <th>orderbooks</th>
      <th>quotes</th>
      <th>base</th>
      <th>quote</th>
      <th>symbol</th>
      <th>status</th>
      <th>order_amount_increment</th>
      <th>order_amount_min</th>
      <th>order_amount_max</th>
      <th>order_price_increment</th>
      <th>order_price_min</th>
      <th>order_price_max</th>
      <th>order_size_min</th>
      <th>min_time_trades</th>
      <th>max_time_trades</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>25</th>
      <td>binance-btc-usdt-spot</td>
      <td>2017-08-17 04:00:32.285000+00:00</td>
      <td>2024-09-04 17:15:15.753000+00:00</td>
      <td>binance</td>
      <td>spot</td>
      <td>{'min_time': '2021-08-03T16:00:00.000000000Z',...</td>
      <td>{'min_time': '2021-08-03T16:00:00.000000000Z',...</td>
      <td>btc</td>
      <td>usdt</td>
      <td>BTCUSDT</td>
      <td>online</td>
      <td>0.00001000</td>
      <td>0.00001000</td>
      <td>9000.00000000</td>
      <td>0.01000000</td>
      <td>0.01000000</td>
      <td>1000000.00000000</td>
      <td>5.00000000</td>
      <td>2017-08-17 04:00:32.285000+00:00</td>
      <td>2024-09-04 17:15:15.753000+00:00</td>
    </tr>
    <tr>
      <th>26</th>
      <td>binance-btc-ust-spot</td>
      <td>2022-04-22 09:00:00+00:00</td>
      <td>2022-05-13 00:49:59.802000+00:00</td>
      <td>binance</td>
      <td>spot</td>
      <td>{'min_time': '2022-04-22T09:00:00.000000000Z',...</td>
      <td>{'min_time': '2022-04-22T09:00:00.000000000Z',...</td>
      <td>btc</td>
      <td>ust</td>
      <td>BTCUST</td>
      <td>offline</td>
      <td>0.00001000</td>
      <td>0.00001000</td>
      <td>9000.00000000</td>
      <td>0.01000000</td>
      <td>0.01000000</td>
      <td>1000000.00000000</td>
      <td>10.00000000</td>
      <td>2022-04-22 09:00:00.802000+00:00</td>
      <td>2022-05-13 00:49:59.802000+00:00</td>
    </tr>
    <tr>
      <th>27</th>
      <td>binance-btc-vai-spot</td>
      <td>2021-02-04 00:00:00+00:00</td>
      <td>2021-10-18 11:55:00+00:00</td>
      <td>binance</td>
      <td>spot</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>btc</td>
      <td>vai</td>
      <td>&lt;NA&gt;</td>
      <td>&lt;NA&gt;</td>
      <td>&lt;NA&gt;</td>
      <td>&lt;NA&gt;</td>
      <td>&lt;NA&gt;</td>
      <td>&lt;NA&gt;</td>
      <td>&lt;NA&gt;</td>
      <td>&lt;NA&gt;</td>
      <td>&lt;NA&gt;</td>
      <td>NaT</td>
      <td>NaT</td>
    </tr>
    <tr>
      <th>28</th>
      <td>binance-btc-vai_vai-spot</td>
      <td>2021-02-04 10:00:00.761000+00:00</td>
      <td>2021-09-18 12:00:00+00:00</td>
      <td>binance</td>
      <td>spot</td>
      <td>{'min_time': '2021-09-14T16:00:00.000000000Z',...</td>
      <td>{'min_time': '2021-09-14T16:00:00.000000000Z',...</td>
      <td>btc</td>
      <td>vai_vai</td>
      <td>BTCVAI</td>
      <td>offline</td>
      <td>0.00001000</td>
      <td>0.00001000</td>
      <td>9000.00000000</td>
      <td>0.01000000</td>
      <td>0.01000000</td>
      <td>1000000.00000000</td>
      <td>10.00000000</td>
      <td>2021-02-04 10:00:00.761000+00:00</td>
      <td>2021-09-18 11:55:27.171000+00:00</td>
    </tr>
    <tr>
      <th>29</th>
      <td>binance-btc-zar-spot</td>
      <td>2020-03-27 04:01:58.397000+00:00</td>
      <td>2024-09-04 17:10:25.715000+00:00</td>
      <td>binance</td>
      <td>spot</td>
      <td>{'min_time': '2022-10-03T10:00:00.000000000Z',...</td>
      <td>{'min_time': '2022-10-03T10:00:00.000000000Z',...</td>
      <td>btc</td>
      <td>zar</td>
      <td>BTCZAR</td>
      <td>online</td>
      <td>0.00001000</td>
      <td>0.00001000</td>
      <td>922.00000000</td>
      <td>1.00000000</td>
      <td>1.00000000</td>
      <td>99928191.00000000</td>
      <td>100.00000000</td>
      <td>2020-03-27 04:01:58.397000+00:00</td>
      <td>2024-09-04 17:10:25.715000+00:00</td>
    </tr>
  </tbody>
</table>
</div>



Catalog objects return a list of dictionaries. For `catalog_assets`, each element of the list is an asset, while each dictionary is a set of metadata for that specific asset.


```python
print(f"Market catalog metadata includes: {list(btc_market_catalog.keys())}")
```

    Market catalog metadata includes: ['market', 'min_time', 'max_time', 'exchange', 'type', 'orderbooks', 'quotes', 'base', 'quote', 'symbol', 'status', 'order_amount_increment', 'order_amount_min', 'order_amount_max', 'order_price_increment', 'order_price_min', 'order_price_max', 'order_size_min', 'min_time_trades', 'max_time_trades']


---
# Example 1: Returns by coin in the CM Reference Rates universe
---
We offer reference rates quoted in USD, Euro, Bitcoin, and Ethereum. We now support these quote currencies for our entire reference rates coverage universe of over 500 assets and for all of our frequencies, including 1s, 1m, 1h, 1d-ny-close and 1d.
    
**Fig. 1 - 7 Day Price Change chart from State of the Market**    
<img src="https://5264302.fs1.hubspotusercontent-na1.net/hubfs/5264302/State%20of%20the%20Market%20-%20Chart%20Examples/Mini-RefRate-Returns.png" width=450 margin-left='auto' margin-right='auto'/>



```python
# Get all assets that have a reference rate 
assets_refrate = client.catalog_metrics("ReferenceRateUSD").to_dataframe()
assets_refrate[['metric','frequency','asset']]
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>metric</th>
      <th>frequency</th>
      <th>asset</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>ReferenceRateUSD</td>
      <td>1s</td>
      <td>1cat</td>
    </tr>
    <tr>
      <th>1</th>
      <td>ReferenceRateUSD</td>
      <td>1s</td>
      <td>1inch</td>
    </tr>
    <tr>
      <th>2</th>
      <td>ReferenceRateUSD</td>
      <td>1s</td>
      <td>a8</td>
    </tr>
    <tr>
      <th>3</th>
      <td>ReferenceRateUSD</td>
      <td>1s</td>
      <td>aave</td>
    </tr>
    <tr>
      <th>4</th>
      <td>ReferenceRateUSD</td>
      <td>1s</td>
      <td>abbc</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>5955</th>
      <td>ReferenceRateUSD</td>
      <td>1d-ny-close</td>
      <td>zks</td>
    </tr>
    <tr>
      <th>5956</th>
      <td>ReferenceRateUSD</td>
      <td>1d-ny-close</td>
      <td>zkx</td>
    </tr>
    <tr>
      <th>5957</th>
      <td>ReferenceRateUSD</td>
      <td>1d-ny-close</td>
      <td>zro</td>
    </tr>
    <tr>
      <th>5958</th>
      <td>ReferenceRateUSD</td>
      <td>1d-ny-close</td>
      <td>zrx</td>
    </tr>
    <tr>
      <th>5959</th>
      <td>ReferenceRateUSD</td>
      <td>1d-ny-close</td>
      <td>ztx_ztx</td>
    </tr>
  </tbody>
</table>
<p>5960 rows × 3 columns</p>
</div>




```python
print('\nNumber of unique Reference Rate assets: ' + str(len(pd.unique(assets_refrate['asset'])))+'\n')
```

    
    Number of unique Reference Rate assets: 1192
    


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




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th>asset</th>
      <th>ada</th>
      <th>bnb</th>
      <th>btc</th>
      <th>doge</th>
      <th>eth</th>
      <th>xrp</th>
    </tr>
    <tr>
      <th>time</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2022-08-10 00:00:00+00:00</th>
      <td>0.514033</td>
      <td>325.442291</td>
      <td>23186.291746</td>
      <td>0.069148</td>
      <td>1703.992249</td>
      <td>0.368363</td>
    </tr>
    <tr>
      <th>2022-08-11 00:00:00+00:00</th>
      <td>0.536694</td>
      <td>328.034925</td>
      <td>23923.058483</td>
      <td>0.071153</td>
      <td>1850.829961</td>
      <td>0.380704</td>
    </tr>
    <tr>
      <th>2022-08-12 00:00:00+00:00</th>
      <td>0.530497</td>
      <td>323.337253</td>
      <td>23934.439056</td>
      <td>0.070800</td>
      <td>1878.113096</td>
      <td>0.379859</td>
    </tr>
  </tbody>
</table>
</div>




```python
# Index each asset's time series to 1 
for col in df_prices_pivot.columns:
    logging.info(f"Calculating returns for {col}....")
    first_price = df_prices_pivot[df_prices_pivot[col].notnull()][col].iloc[0]
    df_prices_pivot[col] = df_prices_pivot[col]/first_price
    df_prices_pivot[col] = df_prices_pivot[col].ffill()
```

    2024-09-05 01:38:32 INFO     Calculating returns for ada....
    2024-09-05 01:38:32 INFO     Calculating returns for bnb....
    2024-09-05 01:38:32 INFO     Calculating returns for btc....
    2024-09-05 01:38:32 INFO     Calculating returns for doge....
    2024-09-05 01:38:32 INFO     Calculating returns for eth....
    2024-09-05 01:38:32 INFO     Calculating returns for xrp....



```python
df_prices_pivot
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th>asset</th>
      <th>ada</th>
      <th>bnb</th>
      <th>btc</th>
      <th>doge</th>
      <th>eth</th>
      <th>xrp</th>
    </tr>
    <tr>
      <th>time</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2022-08-10 00:00:00+00:00</th>
      <td>1.000000</td>
      <td>1.000000</td>
      <td>1.000000</td>
      <td>1.000000</td>
      <td>1.000000</td>
      <td>1.000000</td>
    </tr>
    <tr>
      <th>2022-08-11 00:00:00+00:00</th>
      <td>1.044084</td>
      <td>1.007966</td>
      <td>1.031776</td>
      <td>1.028991</td>
      <td>1.086173</td>
      <td>1.033501</td>
    </tr>
    <tr>
      <th>2022-08-12 00:00:00+00:00</th>
      <td>1.032028</td>
      <td>0.993532</td>
      <td>1.032267</td>
      <td>1.023896</td>
      <td>1.102184</td>
      <td>1.031207</td>
    </tr>
    <tr>
      <th>2022-08-13 00:00:00+00:00</th>
      <td>1.051484</td>
      <td>1.005325</td>
      <td>1.052187</td>
      <td>1.046478</td>
      <td>1.147176</td>
      <td>1.030523</td>
    </tr>
    <tr>
      <th>2022-08-14 00:00:00+00:00</th>
      <td>1.089703</td>
      <td>0.995682</td>
      <td>1.053477</td>
      <td>1.054227</td>
      <td>1.162703</td>
      <td>1.025361</td>
    </tr>
    <tr>
      <th>2022-08-15 00:00:00+00:00</th>
      <td>1.110819</td>
      <td>0.976807</td>
      <td>1.048646</td>
      <td>1.183001</td>
      <td>1.136355</td>
      <td>1.021364</td>
    </tr>
    <tr>
      <th>2022-08-16 00:00:00+00:00</th>
      <td>1.070279</td>
      <td>0.980408</td>
      <td>1.038715</td>
      <td>1.106155</td>
      <td>1.116053</td>
      <td>1.017113</td>
    </tr>
    <tr>
      <th>2022-08-17 00:00:00+00:00</th>
      <td>1.085200</td>
      <td>0.971739</td>
      <td>1.029437</td>
      <td>1.257445</td>
      <td>1.101305</td>
      <td>1.023202</td>
    </tr>
  </tbody>
</table>
</div>



---
# Example 2: Spot trading volume on Coinbase
---
**Fig. 2 - Coinbase daily spot volume breakdown from State of the Market**    
<img src="https://5264302.fs1.hubspotusercontent-na1.net/hubfs/5264302/State%20of%20the%20Market%20-%20Chart%20Examples/Coinbase-Volume-Breakdown.png" width=1100 margin-left='auto' margin-right='auto'/>

### Foundational Data Types - Trades

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




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>market</th>
      <th>time</th>
      <th>coin_metrics_id</th>
      <th>amount</th>
      <th>price</th>
      <th>database_time</th>
      <th>side</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>coinbase-btc-usd-spot</td>
      <td>2024-09-04 17:38:31.008074+00:00</td>
      <td>688314607</td>
      <td>0.004098</td>
      <td>57822.55</td>
      <td>2024-09-04 17:38:31.319911+00:00</td>
      <td>buy</td>
    </tr>
    <tr>
      <th>1</th>
      <td>coinbase-btc-usd-spot</td>
      <td>2024-09-04 17:38:31.321584+00:00</td>
      <td>688314608</td>
      <td>0.00003</td>
      <td>57822.55</td>
      <td>2024-09-04 17:38:31.714974+00:00</td>
      <td>buy</td>
    </tr>
    <tr>
      <th>2</th>
      <td>coinbase-btc-usd-spot</td>
      <td>2024-09-04 17:38:31.348693+00:00</td>
      <td>688314609</td>
      <td>0.015124</td>
      <td>57822.55</td>
      <td>2024-09-04 17:38:31.714974+00:00</td>
      <td>buy</td>
    </tr>
    <tr>
      <th>3</th>
      <td>coinbase-btc-usd-spot</td>
      <td>2024-09-04 17:38:31.500177+00:00</td>
      <td>688314610</td>
      <td>0.006163</td>
      <td>57822.55</td>
      <td>2024-09-04 17:38:32.266970+00:00</td>
      <td>buy</td>
    </tr>
    <tr>
      <th>4</th>
      <td>coinbase-btc-usd-spot</td>
      <td>2024-09-04 17:38:31.595546+00:00</td>
      <td>688314611</td>
      <td>0.005</td>
      <td>57822.55</td>
      <td>2024-09-04 17:38:32.266970+00:00</td>
      <td>buy</td>
    </tr>
  </tbody>
</table>
</div>



### Spot Volume Share - Candles Data

From raw trades data, we construct OHLC candles for each market. For our *Spot Volume % by Asset* chart, we derive volume from our `get_market_candles` endpoint.

All of our endpoints that accept the markets parameter will accept wildcards  like exchange-* or exchange-*-spot or *USDT-future. The wildcards will match any market which fits this pattern so users do not need to specify every individual market when querying data for multiple markets. 


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




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>market</th>
      <th>time</th>
      <th>price_open</th>
      <th>price_close</th>
      <th>price_high</th>
      <th>price_low</th>
      <th>vwap</th>
      <th>volume</th>
      <th>candle_usd_volume</th>
      <th>candle_trades_count</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>coinbase-1inch-btc-spot</td>
      <td>2022-08-16 00:00:00+00:00</td>
      <td>0.000034</td>
      <td>0.000034</td>
      <td>0.000035</td>
      <td>0.000034</td>
      <td>0.000034</td>
      <td>12601.82</td>
      <td>10324.267565</td>
      <td>204</td>
    </tr>
    <tr>
      <th>1</th>
      <td>coinbase-1inch-btc-spot</td>
      <td>2022-08-17 00:00:00+00:00</td>
      <td>0.000034</td>
      <td>0.000033</td>
      <td>0.000035</td>
      <td>0.000033</td>
      <td>0.000034</td>
      <td>6400.08</td>
      <td>5251.890725</td>
      <td>226</td>
    </tr>
    <tr>
      <th>2</th>
      <td>coinbase-1inch-eur-spot</td>
      <td>2022-08-16 00:00:00+00:00</td>
      <td>0.807</td>
      <td>0.805</td>
      <td>0.82</td>
      <td>0.795</td>
      <td>0.807773</td>
      <td>62791.36</td>
      <td>51499.294594</td>
      <td>475</td>
    </tr>
    <tr>
      <th>3</th>
      <td>coinbase-1inch-eur-spot</td>
      <td>2022-08-17 00:00:00+00:00</td>
      <td>0.805</td>
      <td>0.755</td>
      <td>0.828</td>
      <td>0.752</td>
      <td>0.78722</td>
      <td>56349.99</td>
      <td>45122.160088</td>
      <td>478</td>
    </tr>
    <tr>
      <th>4</th>
      <td>coinbase-1inch-gbp-spot</td>
      <td>2022-08-16 00:00:00+00:00</td>
      <td>0.679</td>
      <td>0.677</td>
      <td>0.691</td>
      <td>0.669</td>
      <td>0.680058</td>
      <td>16631.32</td>
      <td>13651.391996</td>
      <td>67</td>
    </tr>
  </tbody>
</table>
</div>



* **price_open:**   The opening price of the candle.
* **price_high:**  The high price of the candle.
* **price_low:**  The low price of the candle.
* **price_close:** The close price of the candle.
* **vwap:**  The volume-weighted average price of the candle.
* **volume:** The volume of the candle in units of the base asset.
* **candle_usd_volume:** The volume of the candle in units of U.S. dollars. 
* **candle_trades_count:** The number of trades in the candle interval. 

### Total Exchange Spot Volume - Exchange Metrics

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




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>exchange</th>
      <th>time</th>
      <th>volume_reported_spot_usd_1d</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>coinbase</td>
      <td>2022-08-10 00:00:00+00:00</td>
      <td>2364732395.45783</td>
    </tr>
    <tr>
      <th>1</th>
      <td>coinbase</td>
      <td>2022-08-11 00:00:00+00:00</td>
      <td>2388044971.16654</td>
    </tr>
    <tr>
      <th>2</th>
      <td>coinbase</td>
      <td>2022-08-12 00:00:00+00:00</td>
      <td>1568920157.28374</td>
    </tr>
    <tr>
      <th>3</th>
      <td>coinbase</td>
      <td>2022-08-13 00:00:00+00:00</td>
      <td>1564683366.92133</td>
    </tr>
    <tr>
      <th>4</th>
      <td>coinbase</td>
      <td>2022-08-14 00:00:00+00:00</td>
      <td>2093992312.94672</td>
    </tr>
    <tr>
      <th>5</th>
      <td>coinbase</td>
      <td>2022-08-15 00:00:00+00:00</td>
      <td>2514301745.80601</td>
    </tr>
    <tr>
      <th>6</th>
      <td>coinbase</td>
      <td>2022-08-16 00:00:00+00:00</td>
      <td>1978781752.31132</td>
    </tr>
    <tr>
      <th>7</th>
      <td>coinbase</td>
      <td>2022-08-17 00:00:00+00:00</td>
      <td>2353956243.32178</td>
    </tr>
  </tbody>
</table>
</div>



---
# Example 3: Spot order book depth
---
**Fig. 3 - Binance order book depth from State of the Market**    
<img src="https://5264302.fs1.hubspotusercontent-na1.net/hubfs/5264302/State%20of%20the%20Market%20-%20Chart%20Examples/Binance-Order-Book-Depth.png" width=900 margin-left='auto' margin-right='auto'/>

### Foundational Data Types - Order Book Snapshots

Exchange order book data is one of the most foundational data types in the crypto industry— arguably, even more foundational than trades data, as two orders must be matched for a trade to occur. Order book data is useful for various entities, including  market makers, systematic or quantitative traders, and funds studying trade execution patterns.

Coin Metrics stores three types of order book snapshots. One type consists of a snapshot of the top 100 bids and top 100 asks taken once every 10 seconds for major markets. The second type consists of a full order book snapshot (every bid and every ask) taken once every hour for all markets. The third is a snapshot where the price is +/-10% of mid-price taken once every 10 seconds. All of these snapshots are served through our */timeseries/market-orderbooks* endpoint.


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




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>market</th>
      <th>time</th>
      <th>coin_metrics_id</th>
      <th>asks</th>
      <th>bids</th>
      <th>database_time</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>coinbase-btc-usd-spot</td>
      <td>2024-09-04 17:37:50+00:00</td>
      <td>1725471470000000-0</td>
      <td>[{'price': '57872.11', 'size': '3.28417257'}, ...</td>
      <td>[{'price': '57872.1', 'size': '0.42710731'}, {...</td>
      <td>2024-09-04 17:37:50.377532+00:00</td>
    </tr>
    <tr>
      <th>1</th>
      <td>coinbase-btc-usd-spot</td>
      <td>2024-09-04 17:38:00+00:00</td>
      <td>1725471480000000-0</td>
      <td>[{'price': '57862.4', 'size': '0.32585835'}, {...</td>
      <td>[{'price': '57862.39', 'size': '0.03106287'}, ...</td>
      <td>2024-09-04 17:38:00.319177+00:00</td>
    </tr>
    <tr>
      <th>2</th>
      <td>coinbase-btc-usd-spot</td>
      <td>2024-09-04 17:38:10+00:00</td>
      <td>1725471490000000-0</td>
      <td>[{'price': '57836.27', 'size': '0.71507733'}, ...</td>
      <td>[{'price': '57836.26', 'size': '0.00121949'}, ...</td>
      <td>2024-09-04 17:38:10.423580+00:00</td>
    </tr>
    <tr>
      <th>3</th>
      <td>coinbase-btc-usd-spot</td>
      <td>2024-09-04 17:38:20+00:00</td>
      <td>1725471500000000-0</td>
      <td>[{'price': '57831.99', 'size': '0.10303866'}, ...</td>
      <td>[{'price': '57831.98', 'size': '0.01012624'}, ...</td>
      <td>2024-09-04 17:38:20.360704+00:00</td>
    </tr>
    <tr>
      <th>4</th>
      <td>coinbase-btc-usd-spot</td>
      <td>2024-09-04 17:38:30+00:00</td>
      <td>1725471510000000-0</td>
      <td>[{'price': '57822.54', 'size': '0.20612443'}, ...</td>
      <td>[{'price': '57822.53', 'size': '0.0001262'}, {...</td>
      <td>2024-09-04 17:38:30.334903+00:00</td>
    </tr>
  </tbody>
</table>
</div>




```python
bids = eval(top100_snapshot.bids[0])
bids[0:10]
```




    [{'price': '57872.1', 'size': '0.42710731'},
     {'price': '57870.11', 'size': '0.06220742'},
     {'price': '57867.81', 'size': '0.01'},
     {'price': '57867.49', 'size': '0.02592129'},
     {'price': '57867.01', 'size': '0.02'},
     {'price': '57867', 'size': '0.04320251'},
     {'price': '57866.91', 'size': '0.35692467'},
     {'price': '57866.9', 'size': '0.03'},
     {'price': '57866.26', 'size': '0.17281224'},
     {'price': '57866.03', 'size': '0.165'}]



### Market Quotes - Best Bid & Asks

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




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>market</th>
      <th>time</th>
      <th>coin_metrics_id</th>
      <th>ask_price</th>
      <th>ask_size</th>
      <th>bid_price</th>
      <th>bid_size</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>coinbase-btc-usd-spot</td>
      <td>2024-09-04 17:38:00+00:00</td>
      <td>1725471480000000-0</td>
      <td>57862.4</td>
      <td>0.325858</td>
      <td>57862.39</td>
      <td>0.031063</td>
    </tr>
    <tr>
      <th>1</th>
      <td>coinbase-btc-usd-spot</td>
      <td>2024-09-04 17:38:10+00:00</td>
      <td>1725471490000000-0</td>
      <td>57836.27</td>
      <td>0.715077</td>
      <td>57836.26</td>
      <td>0.001219</td>
    </tr>
    <tr>
      <th>2</th>
      <td>coinbase-btc-usd-spot</td>
      <td>2024-09-04 17:38:20+00:00</td>
      <td>1725471500000000-0</td>
      <td>57831.99</td>
      <td>0.103039</td>
      <td>57831.98</td>
      <td>0.010126</td>
    </tr>
    <tr>
      <th>3</th>
      <td>coinbase-btc-usd-spot</td>
      <td>2024-09-04 17:38:30+00:00</td>
      <td>1725471510000000-0</td>
      <td>57822.54</td>
      <td>0.206124</td>
      <td>57822.53</td>
      <td>0.000126</td>
    </tr>
    <tr>
      <th>4</th>
      <td>coinbase-btc-usd-spot</td>
      <td>2024-09-04 17:38:40+00:00</td>
      <td>1725471520000000-0</td>
      <td>57820.97</td>
      <td>0.050033</td>
      <td>57820.96</td>
      <td>0.000096</td>
    </tr>
  </tbody>
</table>
</div>



**Note:** We now also offer *every quote update* via the new Coin Metrics flat file application.

---
# Example 4: Futures data types
---
We offer futures data for 3,000+ markets across top derivatives trading venues such as Binance, CME, FTX, BitMEX, Huobi, Bybit, etc. Supported data types include liquidations, contract prices, open interest, candles, volume, funding rates, and more.

**Fig. 4 - Bitcoin and Ethereum futures open interest from State of the Market**    
<img src="https://5264302.fs1.hubspotusercontent-na1.net/hubfs/5264302/State%20of%20the%20Market%20-%20Chart%20Examples/BTC-ETH-open-interest.png" width=550 margin-left='auto' margin-right='auto'/>



### Market Open Interest - Total Contracts Outstanding
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




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>market</th>
      <th>time</th>
      <th>contract_count</th>
      <th>value_usd</th>
      <th>database_time</th>
      <th>exchange_time</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>binance-BTCUSD_PERP-future</td>
      <td>2022-08-17 23:55:00+00:00</td>
      <td>3982211</td>
      <td>398221100</td>
      <td>2022-08-17 23:55:11.890405+00:00</td>
      <td>2022-08-17 23:55:00+00:00</td>
    </tr>
    <tr>
      <th>1</th>
      <td>binance-BTCUSD_PERP-future</td>
      <td>2022-08-17 23:56:00+00:00</td>
      <td>3981078</td>
      <td>398107800</td>
      <td>2022-08-17 23:56:30.226528+00:00</td>
      <td>2022-08-17 23:56:00+00:00</td>
    </tr>
    <tr>
      <th>2</th>
      <td>binance-BTCUSD_PERP-future</td>
      <td>2022-08-17 23:57:00+00:00</td>
      <td>3979201</td>
      <td>397920100</td>
      <td>2022-08-17 23:57:08.240922+00:00</td>
      <td>2022-08-17 23:57:00+00:00</td>
    </tr>
    <tr>
      <th>3</th>
      <td>binance-BTCUSD_PERP-future</td>
      <td>2022-08-17 23:58:00+00:00</td>
      <td>3979191</td>
      <td>397919100</td>
      <td>2022-08-17 23:58:18.250239+00:00</td>
      <td>2022-08-17 23:58:00+00:00</td>
    </tr>
    <tr>
      <th>4</th>
      <td>binance-BTCUSD_PERP-future</td>
      <td>2022-08-17 23:59:00+00:00</td>
      <td>3979133</td>
      <td>397913300</td>
      <td>2022-08-17 23:59:07.291820+00:00</td>
      <td>2022-08-17 23:59:00+00:00</td>
    </tr>
  </tbody>
</table>
</div>



### Aggregated Open Interest - Daily by Asset & Contract Type

In addition to querying open interest for specific markets/contracts, the `get_asset_metrics` endpoint can also be used to retrieve aggregated open interest. Our reported future open interest metric is an aggregation of the reported future open interest from all futures exchanges in CM's coverage universe.

We offer aggregated futures open interest for the following futures contract types:
- Reported Future Open Interest
- Reported Perpetual Future Open Interest
- Reported Non-Perpetual Future Open Interest
- Reported Coin-Margined Future Open Interest
- Reported Tether-Margined Future Open Interest


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




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>asset</th>
      <th>time</th>
      <th>open_interest_reported_future_nonperpetual_usd</th>
      <th>open_interest_reported_future_perpetual_usd</th>
      <th>open_interest_reported_future_usd</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>btc</td>
      <td>2024-09-02 00:00:00+00:00</td>
      <td>9811851547.968559</td>
      <td>14751552079.3918</td>
      <td>24563403627.360401</td>
    </tr>
    <tr>
      <th>1</th>
      <td>btc</td>
      <td>2024-09-03 00:00:00+00:00</td>
      <td>10077702037.8766</td>
      <td>15157015763.7684</td>
      <td>25234717801.645</td>
    </tr>
    <tr>
      <th>2</th>
      <td>btc</td>
      <td>2024-09-04 00:00:00+00:00</td>
      <td>9849088191.474421</td>
      <td>15120411586.0993</td>
      <td>24969499777.5737</td>
    </tr>
    <tr>
      <th>3</th>
      <td>eth</td>
      <td>2024-09-02 00:00:00+00:00</td>
      <td>1309660471.74935</td>
      <td>7068503136.02679</td>
      <td>8378163607.77615</td>
    </tr>
    <tr>
      <th>4</th>
      <td>eth</td>
      <td>2024-09-03 00:00:00+00:00</td>
      <td>1348911155.14029</td>
      <td>7468921813.31164</td>
      <td>8817832968.451929</td>
    </tr>
    <tr>
      <th>5</th>
      <td>eth</td>
      <td>2024-09-04 00:00:00+00:00</td>
      <td>1316948941.59002</td>
      <td>7303271189.56736</td>
      <td>8620220131.157379</td>
    </tr>
  </tbody>
</table>
</div>



### Perpetual Futures Funding Rates
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




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>market</th>
      <th>time</th>
      <th>database_time</th>
      <th>rate</th>
      <th>period</th>
      <th>interval</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>binance-BTCUSD_PERP-future</td>
      <td>2020-08-10 16:00:00+00:00</td>
      <td>2020-12-02 10:49:37.530167+00:00</td>
      <td>0.0001</td>
      <td>08:00:00</td>
      <td>08:00:00</td>
    </tr>
    <tr>
      <th>1</th>
      <td>binance-BTCUSD_PERP-future</td>
      <td>2020-08-11 00:00:00+00:00</td>
      <td>2020-12-02 10:49:37.530167+00:00</td>
      <td>0.0001</td>
      <td>08:00:00</td>
      <td>08:00:00</td>
    </tr>
    <tr>
      <th>2</th>
      <td>binance-BTCUSD_PERP-future</td>
      <td>2020-08-11 08:00:00.008000+00:00</td>
      <td>2020-12-02 10:49:37.530167+00:00</td>
      <td>0.0001</td>
      <td>08:00:00</td>
      <td>08:00:00</td>
    </tr>
    <tr>
      <th>3</th>
      <td>binance-BTCUSD_PERP-future</td>
      <td>2020-08-11 16:00:00+00:00</td>
      <td>2020-12-02 10:49:37.530167+00:00</td>
      <td>0.0001</td>
      <td>08:00:00</td>
      <td>08:00:00</td>
    </tr>
    <tr>
      <th>4</th>
      <td>binance-BTCUSD_PERP-future</td>
      <td>2020-08-12 00:00:00+00:00</td>
      <td>2020-12-02 10:49:37.530167+00:00</td>
      <td>0.0001</td>
      <td>08:00:00</td>
      <td>08:00:00</td>
    </tr>
  </tbody>
</table>
</div>



**Fig. 5 - Bitcoin perpetual futures funding rates from State of the Market**    
<img src="https://5264302.fs1.hubspotusercontent-na1.net/hubfs/5264302/State%20of%20the%20Market%20-%20Chart%20Examples/BTC-perp-funding-rates.png" width=850 margin-left='auto' margin-right='auto'/>

### Futures Basis Metrics - Aggregated by Exchange-Asset
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




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>exchange_asset</th>
      <th>time</th>
      <th>basis_annualized_30d_exp</th>
      <th>basis_annualized_60d_exp</th>
      <th>basis_annualized_90d_exp</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>1541</th>
      <td>binance-btc</td>
      <td>2024-08-31 00:00:00+00:00</td>
      <td>0.043651</td>
      <td>0.065038</td>
      <td>0.072167</td>
    </tr>
    <tr>
      <th>1542</th>
      <td>binance-btc</td>
      <td>2024-09-01 00:00:00+00:00</td>
      <td>0.048607</td>
      <td>0.065661</td>
      <td>0.071346</td>
    </tr>
    <tr>
      <th>1543</th>
      <td>binance-btc</td>
      <td>2024-09-02 00:00:00+00:00</td>
      <td>0.04601</td>
      <td>0.064136</td>
      <td>0.070178</td>
    </tr>
    <tr>
      <th>1544</th>
      <td>binance-btc</td>
      <td>2024-09-03 00:00:00+00:00</td>
      <td>0.049159</td>
      <td>0.065976</td>
      <td>0.071581</td>
    </tr>
    <tr>
      <th>1545</th>
      <td>binance-btc</td>
      <td>2024-09-04 00:00:00+00:00</td>
      <td>0.047106</td>
      <td>0.064122</td>
      <td>0.069795</td>
    </tr>
  </tbody>
</table>
</div>



**Fig. 6 - Bitcoin futures basis from State of the Market**    
<img src="https://5264302.fs1.hubspotusercontent-na1.net/hubfs/5264302/State%20of%20the%20Market%20-%20Chart%20Examples/Futures-Basis.png" width=550 margin-left='auto' margin-right='auto'/>

### Futures Liquidations - Individual Orders/Trades
Exchanges which offer futures markets utilize a risk management system that will attempt to close a user’s position before the point at which the user begins to owe more than what is in the user's account. The trade or order that closes the user's position is referred to as a liquidation. 

- Some exchanges report **liquidations orders** in which they will report the creation of a liquidation order when a trader’s position initially enters liquidation. When a trader’s position enters liquidation, an exchange will typically enter a limit order at the trader's bankruptcy price. The order will show the amount of the position that is being liquidated and the liquidation price, but will not represent the matched trades that are executed as a result of the liquidation. 
- Other exchanges will report **liquidation trades** which represent the actual matched trades as a result of a liquidation order but will not report liquidation orders. 
- Some exchanges will report both liquidation orders and liquidation trades.


```python
mkt_liqs_binance = client.get_market_liquidations(
    markets='binance-BTCUSDT-future', 
    limit_per_market=3
).to_dataframe()
```


```python
mkt_liqs_binance.head()
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>market</th>
      <th>time</th>
      <th>coin_metrics_id</th>
      <th>amount</th>
      <th>price</th>
      <th>type</th>
      <th>database_time</th>
      <th>side</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>binance-BTCUSDT-future</td>
      <td>2019-09-10 19:36:50.009000+00:00</td>
      <td>1568144210009000000</td>
      <td>0.199</td>
      <td>10013.89</td>
      <td>trade</td>
      <td>2020-10-08 06:03:35.854962+00:00</td>
      <td>sell</td>
    </tr>
    <tr>
      <th>1</th>
      <td>binance-BTCUSDT-future</td>
      <td>2019-09-10 19:38:06.010000+00:00</td>
      <td>1568144286010000000</td>
      <td>0.04</td>
      <td>9952.16</td>
      <td>trade</td>
      <td>2020-10-08 06:03:35.854962+00:00</td>
      <td>sell</td>
    </tr>
    <tr>
      <th>2</th>
      <td>binance-BTCUSDT-future</td>
      <td>2019-09-11 06:51:13.010000+00:00</td>
      <td>1568184673010000000</td>
      <td>0.04</td>
      <td>9944.65</td>
      <td>trade</td>
      <td>2020-10-08 06:03:35.854962+00:00</td>
      <td>sell</td>
    </tr>
  </tbody>
</table>
</div>



### Futures Liquidations - Aggregated Daily or Hourly



```python
liqs_binance = client.get_market_metrics(
    markets='binance-BTCUSDT-future', 
    metrics='liquidations_reported_future_buy_usd_1d'
).to_dataframe()
```


```python
liqs_binance.head()
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>market</th>
      <th>time</th>
      <th>liquidations_reported_future_buy_usd_1d</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>binance-BTCUSDT-future</td>
      <td>2019-09-12 00:00:00+00:00</td>
      <td>114.5749</td>
    </tr>
    <tr>
      <th>1</th>
      <td>binance-BTCUSDT-future</td>
      <td>2019-09-19 00:00:00+00:00</td>
      <td>268916.41422</td>
    </tr>
    <tr>
      <th>2</th>
      <td>binance-BTCUSDT-future</td>
      <td>2019-09-20 00:00:00+00:00</td>
      <td>18519.28155</td>
    </tr>
    <tr>
      <th>3</th>
      <td>binance-BTCUSDT-future</td>
      <td>2019-09-21 00:00:00+00:00</td>
      <td>8795.16</td>
    </tr>
    <tr>
      <th>4</th>
      <td>binance-BTCUSDT-future</td>
      <td>2019-09-23 00:00:00+00:00</td>
      <td>62820.22767</td>
    </tr>
  </tbody>
</table>
</div>



**Fig. 7 - Bitcoin perpetual futures liquidations from State of the Market**    
<img src="https://5264302.fs1.hubspotusercontent-na1.net/hubfs/5264302/State%20of%20the%20Market%20-%20Chart%20Examples/BTC-Perp-Liquidations.png" width=450 margin-left='auto' margin-right='auto'/>

---
# Example 5: Options data types
---

We offer options data from two of the most liquid options trading venues, Deribit and OKX. Supported data types include implied volatility, trades, open interest, contract prices, contract specifications, quotes, and greeks. We recently expanded our options coverage to include several new data types from Deribit and added several new API endpoints to serve this data.

### Options Contracts - Implied Volatility


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




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>market</th>
      <th>time</th>
      <th>database_time</th>
      <th>iv_bid</th>
      <th>iv_ask</th>
      <th>iv_mark</th>
      <th>exchange_time</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>deribit-BTC-18AUG22-19000-C-option</td>
      <td>2022-08-16 08:04:00+00:00</td>
      <td>2022-08-16 08:04:59.435418+00:00</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
      <td>2022-08-16 08:04:58.622000+00:00</td>
    </tr>
    <tr>
      <th>1</th>
      <td>deribit-BTC-18AUG22-19000-P-option</td>
      <td>2022-08-16 08:04:00+00:00</td>
      <td>2022-08-16 08:04:58.430009+00:00</td>
      <td>0.0</td>
      <td>2.5561</td>
      <td>1.0</td>
      <td>2022-08-16 08:04:57.613000+00:00</td>
    </tr>
    <tr>
      <th>2</th>
      <td>deribit-BTC-18AUG22-20000-C-option</td>
      <td>2022-08-16 08:04:00+00:00</td>
      <td>2022-08-16 08:04:57.429870+00:00</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
      <td>2022-08-16 08:04:56.605000+00:00</td>
    </tr>
    <tr>
      <th>3</th>
      <td>deribit-BTC-18AUG22-20000-P-option</td>
      <td>2022-08-16 08:04:00+00:00</td>
      <td>2022-08-16 08:04:58.430009+00:00</td>
      <td>0.0</td>
      <td>2.0536</td>
      <td>1.0</td>
      <td>2022-08-16 08:04:57.612000+00:00</td>
    </tr>
    <tr>
      <th>4</th>
      <td>deribit-BTC-18AUG22-21000-C-option</td>
      <td>2022-08-16 08:04:00+00:00</td>
      <td>2022-08-16 08:04:58.430009+00:00</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
      <td>2022-08-16 08:04:57.620000+00:00</td>
    </tr>
  </tbody>
</table>
</div>



**Fig. 8 - Bitcoin 'Volatility Smile' from State of the Market**    
<img src="https://5264302.fs1.hubspotusercontent-na1.net/hubfs/5264302/State%20of%20the%20Market%20-%20Chart%20Examples/BTC-IV-vs-StrikePrice.png" width=800 margin-left='auto' margin-right='auto'/>

### Options Contracts - Market Greeks


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




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>market</th>
      <th>time</th>
      <th>database_time</th>
      <th>vega</th>
      <th>theta</th>
      <th>rho</th>
      <th>delta</th>
      <th>gamma</th>
      <th>exchange_time</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>deribit-BTC-18AUG22-19000-C-option</td>
      <td>2022-08-16 08:04:00+00:00</td>
      <td>2022-08-16 08:04:59.435418+00:00</td>
      <td>0.03878</td>
      <td>-0.97127</td>
      <td>1.03845</td>
      <td>0.99938</td>
      <td>0.0</td>
      <td>2022-08-16 08:04:58.622000+00:00</td>
    </tr>
    <tr>
      <th>1</th>
      <td>deribit-BTC-18AUG22-19000-P-option</td>
      <td>2022-08-16 08:04:00+00:00</td>
      <td>2022-08-16 08:04:58.430009+00:00</td>
      <td>0.03875</td>
      <td>-0.30251</td>
      <td>-0.00084</td>
      <td>-0.00062</td>
      <td>0.0</td>
      <td>2022-08-16 08:04:57.613000+00:00</td>
    </tr>
    <tr>
      <th>2</th>
      <td>deribit-BTC-18AUG22-20000-C-option</td>
      <td>2022-08-16 08:04:00+00:00</td>
      <td>2022-08-16 08:04:57.429870+00:00</td>
      <td>0.287</td>
      <td>-7.18741</td>
      <td>1.08637</td>
      <td>0.99435</td>
      <td>0.00001</td>
      <td>2022-08-16 08:04:56.605000+00:00</td>
    </tr>
    <tr>
      <th>3</th>
      <td>deribit-BTC-18AUG22-20000-P-option</td>
      <td>2022-08-16 08:04:00+00:00</td>
      <td>2022-08-16 08:04:58.430009+00:00</td>
      <td>0.28587</td>
      <td>-3.27365</td>
      <td>-0.00759</td>
      <td>-0.00563</td>
      <td>0.00001</td>
      <td>2022-08-16 08:04:57.612000+00:00</td>
    </tr>
    <tr>
      <th>4</th>
      <td>deribit-BTC-18AUG22-21000-C-option</td>
      <td>2022-08-16 08:04:00+00:00</td>
      <td>2022-08-16 08:04:58.430009+00:00</td>
      <td>1.22414</td>
      <td>-30.65678</td>
      <td>1.1075</td>
      <td>0.9696</td>
      <td>0.00004</td>
      <td>2022-08-16 08:04:57.620000+00:00</td>
    </tr>
  </tbody>
</table>
</div>



**Fig. 9 - Option Chain from State of the Market**    
<img src="https://5264302.fs1.hubspotusercontent-na1.net/hubfs/5264302/State%20of%20the%20Market%20-%20Chart%20Examples/Option-Chain.png" width=800 margin-left='auto' margin-right='auto'/>

### Options Contracts - Market Quotes


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




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>market</th>
      <th>time</th>
      <th>coin_metrics_id</th>
      <th>ask_price</th>
      <th>ask_size</th>
      <th>bid_price</th>
      <th>bid_size</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>deribit-BTC-18AUG22-19000-C-option</td>
      <td>2022-08-16 08:04:00+00:00</td>
      <td>1660637040000000-0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>1</th>
      <td>deribit-BTC-18AUG22-19000-C-option</td>
      <td>2022-08-16 08:05:00+00:00</td>
      <td>1660637100000000-0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>2</th>
      <td>deribit-BTC-18AUG22-19000-C-option</td>
      <td>2022-08-16 08:06:00+00:00</td>
      <td>1660637160000000-0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>3</th>
      <td>deribit-BTC-18AUG22-19000-P-option</td>
      <td>2022-08-16 08:04:00+00:00</td>
      <td>1660637040000000-0</td>
      <td>0.1</td>
      <td>0.0085</td>
      <td>0.0</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>4</th>
      <td>deribit-BTC-18AUG22-19000-P-option</td>
      <td>2022-08-16 08:05:00+00:00</td>
      <td>1660637100000000-0</td>
      <td>10.0</td>
      <td>0.0005</td>
      <td>0.0</td>
      <td>0.0</td>
    </tr>
  </tbody>
</table>
</div>



### Options Contracts - Market Open Interest


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




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>market</th>
      <th>time</th>
      <th>contract_count</th>
      <th>value_usd</th>
      <th>database_time</th>
      <th>exchange_time</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>62</th>
      <td>deribit-BTC-30DEC22-35000-C-option</td>
      <td>2022-12-30 07:59:00+00:00</td>
      <td>6564.4</td>
      <td>108156695.5</td>
      <td>2022-12-30 07:59:11.450250+00:00</td>
      <td>2022-12-30 07:59:00+00:00</td>
    </tr>
    <tr>
      <th>7</th>
      <td>deribit-BTC-30DEC22-12000-P-option</td>
      <td>2022-12-30 07:59:00+00:00</td>
      <td>6609.7</td>
      <td>108902937.431</td>
      <td>2022-12-30 07:59:21.456460+00:00</td>
      <td>2022-12-30 07:59:00+00:00</td>
    </tr>
    <tr>
      <th>15</th>
      <td>deribit-BTC-30DEC22-15000-P-option</td>
      <td>2022-12-30 07:59:00+00:00</td>
      <td>6873.1</td>
      <td>113242845.144</td>
      <td>2022-12-30 07:59:12.451403+00:00</td>
      <td>2022-12-30 07:59:00+00:00</td>
    </tr>
    <tr>
      <th>1</th>
      <td>deribit-BTC-30DEC22-10000-P-option</td>
      <td>2022-12-30 07:59:00+00:00</td>
      <td>7731.2</td>
      <td>127381029.376</td>
      <td>2022-12-30 07:59:21.456460+00:00</td>
      <td>2022-12-30 07:59:00+00:00</td>
    </tr>
    <tr>
      <th>54</th>
      <td>deribit-BTC-30DEC22-30000-C-option</td>
      <td>2022-12-30 07:59:00+00:00</td>
      <td>7836.8</td>
      <td>129120997.632</td>
      <td>2022-12-30 07:59:17.454662+00:00</td>
      <td>2022-12-30 07:59:00+00:00</td>
    </tr>
  </tbody>
</table>
</div>



**Fig. 10 - Option Open Interest from State of the Market**    
<img src="https://5264302.fs1.hubspotusercontent-na1.net/hubfs/5264302/State%20of%20the%20Market%20-%20Chart%20Examples/Options-OI.png" width=800 margin-left='auto' margin-right='auto'/>
