<img src="https://5264302.fs1.hubspotusercontent-na1.net/hubfs/5264302/Demo%20Asset%20Resources/Demo%20Covers/CM-Demo-mdf_2_8_demo-Cover.png" width=1100 margin-left='auto' margin-right='auto'/>

# Market Data Feed v2.8 Overview
Coin Metrics is pleased to announce the version 2.8 release of our CM Market Data Feed. This release contains a significant new releases relating to our streaming order book data, exchange coverage, new metadata, new metrics, and many more upgrades and bug fixes.

Coin Metrics **Market Data Feed** provides access to historical and real-time data from over 40 of the world’s leading spot and derivatives crypto exchanges. We offer all of the fundamental market-related data types including tick-by-tick trades, quotes, order book snapshots, candles, and more.

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
from coinmetrics.api_client import CoinMetricsClient, CmStream
import json
import matplotlib.ticker as ticker
import logging
import time
import orjson
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

    2024-09-05 01:50:27 INFO     Using API key found in environment


## Real-time Order Book Data Expansion

We now offer full order book data served through our /timeseries-stream/market-orderbooks endpoint for more exchanges. This endpoint now has a depth_limit parameter that allows users to choose either the top 100 levels or the full order book. When a user subscribes to this endpoint, our API will first send a snapshot of the order book and all subsequent messages are updates to the order book. Using this method, users can maintain the full state of the order book locally. The exchanges we support for full order book are:

**For spot markets:** Binance, Binance.US, bitFlyer, Bitstamp, Bittrex, Bybit, Bullish, Bitbank, Coinbase, Crypto.com, Gate.io, Gemini, Kraken, itBit, LMAX, MEXC, OKEx, KuCoin

**For futures markets:** Binance, bitFlyer, Bybit, CME, Crypto.com, Deribit, Gate.io, Kraken, MEXC, OKEx, KuCoin


```python
stream = client.get_stream_market_orderbooks(
    markets=['bullish-btc-usdt-spot'],
    depth_limit=100
)

def on_message(
        stream: CmStream, message: str
) -> None:
    data = orjson.loads(str(message))
    json_formatted_str = json.dumps(data, indent=1)
    print(json_formatted_str)
    print(' ')
    sequence_id = int(data['cm_sequence_id'])
    max_cm_sequence_id = 0
    if sequence_id >= max_cm_sequence_id:
        print(f"Closing the connection...")
        stream.close()
        
if __name__ == '__main__':
    print(f"Opening the connection...\n")
    stream.run(on_message=on_message)
```

    Opening the connection...
    
    {
     "market": "bullish-btc-usdt-spot",
     "time": "2024-09-04T17:50:19.555000000Z",
     "coin_metrics_id": "x8nu7BcrTy2H0aBfn2ttUwAAAAABHHXn",
     "asks": [
      {
       "price": "58028.1",
       "size": "3.56513221"
      },
      {
       "price": "58028.2",
       "size": "0.00242162"
      },
      {
       "price": "58028.3",
       "size": "0.00242162"
      },
      {
       "price": "58028.4",
       "size": "0.00242161"
      },
      {
       "price": "58028.5",
       "size": "0.00242161"
      },
      {
       "price": "58028.6",
       "size": "0.0024216"
      },
      {
       "price": "58028.7",
       "size": "0.00242159"
      },
      {
       "price": "58028.8",
       "size": "0.00242159"
      },
      {
       "price": "58028.9",
       "size": "0.00242158"
      },
      {
       "price": "58029",
       "size": "0.00242157"
      }
     ],
     "bids": [
      {
       "price": "58028",
       "size": "0.00110039"
      },
      {
       "price": "58027.9",
       "size": "0.00242164"
      },
      {
       "price": "58027.8",
       "size": "0.00242164"
      },
      {
       "price": "58027.7",
       "size": "0.00242165"
      },
      {
       "price": "58027.6",
       "size": "0.00242166"
      },
      {
       "price": "58027.5",
       "size": "0.00242166"
      },
      {
       "price": "58027.4",
       "size": "0.00242167"
      },
      {
       "price": "58027.3",
       "size": "0.00242167"
      },
      {
       "price": "58027.2",
       "size": "0.00242168"
      },
      {
       "price": "58027.1",
       "size": "0.00242169"
      }
     ],
     "type": "snapshot",
     "collect_time": "2024-09-04T17:50:20.080297000Z",
     "cm_sequence_id": "0"
    }
     
    Closing the connection...


## New Exchange Coverage

Coin Metrics is constantly expanding our exchange coverage or adding additional data types for exchanges we already cover. This release contains the following new exchanges and their supported data types:
- **Bullish** spot metadata, trades, candles, hourly full order book snapshots, and real-time streaming order book with full depth
- **KuCoin** futures trades, candles, hourly full order book snapshots, and real-time streaming order book with full depth
- **Gate.io** futures trades, candles, hourly full order book snapshots, and real-time streaming order book with full depth
- **Crypto.com** futures trades, candles, and real-time streaming order book with full depth


```python
exchange_list = ['bullish','gate.io','crypto.com','kucoin']
for exchange in exchange_list:
    new_exchanges = client.catalog_markets(
        exchange=exchange
    ).to_dataframe()
    print('\nNumber of markets for ' + str(exchange).upper() + ': ' + str(len(new_exchanges)) + '\n')
    display(new_exchanges.head(3))
```

    
    Number of markets for BULLISH: 110
    



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
      <th>...</th>
      <th>order_amount_increment</th>
      <th>order_amount_min</th>
      <th>order_amount_max</th>
      <th>order_price_increment</th>
      <th>order_taker_fee</th>
      <th>order_maker_fee</th>
      <th>margin_trading_enabled</th>
      <th>status</th>
      <th>min_time_trades</th>
      <th>max_time_trades</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>bullish-ADA-USDC-PERP-future</td>
      <td>2024-05-21 08:47:25.937000+00:00</td>
      <td>2024-09-04 17:15:11.808000+00:00</td>
      <td>bullish</td>
      <td>future</td>
      <td>{'min_time': '2024-05-22T08:46:30.000000000Z',...</td>
      <td>{'min_time': '2024-05-22T08:46:30.000000000Z',...</td>
      <td>ada</td>
      <td>usdc</td>
      <td>ADA-USDC-PERP</td>
      <td>...</td>
      <td>0.00001</td>
      <td>10.00000</td>
      <td>1000000.00000</td>
      <td>0.0001</td>
      <td>0.0001</td>
      <td>0.0000</td>
      <td>True</td>
      <td>&lt;NA&gt;</td>
      <td>2024-05-21 08:47:25.937000+00:00</td>
      <td>2024-09-04 17:15:11.808000+00:00</td>
    </tr>
    <tr>
      <th>1</th>
      <td>bullish-AEVO-USDC-PERP-future</td>
      <td>2024-08-29 08:00:00+00:00</td>
      <td>2024-09-04 17:00:00+00:00</td>
      <td>bullish</td>
      <td>future</td>
      <td>{'min_time': '2024-08-29T08:00:00.000000000Z',...</td>
      <td>{'min_time': '2024-08-29T08:00:00.000000000Z',...</td>
      <td>aevo</td>
      <td>usdc</td>
      <td>AEVO-USDC-PERP</td>
      <td>...</td>
      <td>0.00001</td>
      <td>10.00000</td>
      <td>50000.00000</td>
      <td>0.0001</td>
      <td>0.0001</td>
      <td>0.0000</td>
      <td>True</td>
      <td>&lt;NA&gt;</td>
      <td>NaT</td>
      <td>NaT</td>
    </tr>
    <tr>
      <th>2</th>
      <td>bullish-APT-USDC-PERP-future</td>
      <td>2024-07-25 07:00:00+00:00</td>
      <td>2024-09-04 17:15:16.240000+00:00</td>
      <td>bullish</td>
      <td>future</td>
      <td>{'min_time': '2024-07-25T07:00:00.000000000Z',...</td>
      <td>{'min_time': '2024-07-25T07:00:00.000000000Z',...</td>
      <td>apt</td>
      <td>usdc</td>
      <td>APT-USDC-PERP</td>
      <td>...</td>
      <td>0.000001</td>
      <td>1.000000</td>
      <td>10000.000000</td>
      <td>0.0001</td>
      <td>0.0001</td>
      <td>0.0000</td>
      <td>True</td>
      <td>&lt;NA&gt;</td>
      <td>2024-07-26 04:50:50.539000+00:00</td>
      <td>2024-09-04 17:15:16.240000+00:00</td>
    </tr>
  </tbody>
</table>
<p>3 rows × 24 columns</p>
</div>


    
    Number of markets for GATE.IO: 5505
    



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
      <th>base</th>
      <th>quote</th>
      <th>symbol</th>
      <th>status</th>
      <th>order_amount_increment</th>
      <th>...</th>
      <th>orderbooks</th>
      <th>quotes</th>
      <th>margin_asset</th>
      <th>tick_size</th>
      <th>order_amount_max</th>
      <th>size_asset</th>
      <th>contract_size</th>
      <th>expiration</th>
      <th>min_time_trades</th>
      <th>max_time_trades</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>gate.io-0dog-usdt-spot</td>
      <td>2024-08-21 11:00:00.007826+00:00</td>
      <td>2024-09-04 17:15:10.626000+00:00</td>
      <td>gate.io</td>
      <td>spot</td>
      <td>0dog</td>
      <td>usdt</td>
      <td>0DOG_USDT</td>
      <td>online</td>
      <td>0.01</td>
      <td>...</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>&lt;NA&gt;</td>
      <td>&lt;NA&gt;</td>
      <td>&lt;NA&gt;</td>
      <td>&lt;NA&gt;</td>
      <td>&lt;NA&gt;</td>
      <td>NaT</td>
      <td>2024-08-21 11:00:00.007826+00:00</td>
      <td>2024-09-04 17:15:10.626000+00:00</td>
    </tr>
    <tr>
      <th>1</th>
      <td>gate.io-100x-usdt-spot</td>
      <td>2021-06-04 03:59:59+00:00</td>
      <td>2021-10-27 15:28:42.754607+00:00</td>
      <td>gate.io</td>
      <td>spot</td>
      <td>100x</td>
      <td>usdt</td>
      <td>100X_USDT</td>
      <td>&lt;NA&gt;</td>
      <td>&lt;NA&gt;</td>
      <td>...</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>&lt;NA&gt;</td>
      <td>&lt;NA&gt;</td>
      <td>&lt;NA&gt;</td>
      <td>&lt;NA&gt;</td>
      <td>&lt;NA&gt;</td>
      <td>NaT</td>
      <td>2021-06-04 03:59:59+00:00</td>
      <td>2021-10-27 15:28:42.754607+00:00</td>
    </tr>
    <tr>
      <th>2</th>
      <td>gate.io-10set-usdt-spot</td>
      <td>2021-05-31 03:59:59+00:00</td>
      <td>2024-09-04 17:15:13.107000+00:00</td>
      <td>gate.io</td>
      <td>spot</td>
      <td>10set</td>
      <td>usdt</td>
      <td>10SET_USDT</td>
      <td>online</td>
      <td>0.01</td>
      <td>...</td>
      <td>{'min_time': '2024-07-24T13:00:00.000000000Z',...</td>
      <td>{'min_time': '2024-07-24T13:00:00.000000000Z',...</td>
      <td>&lt;NA&gt;</td>
      <td>&lt;NA&gt;</td>
      <td>&lt;NA&gt;</td>
      <td>&lt;NA&gt;</td>
      <td>&lt;NA&gt;</td>
      <td>NaT</td>
      <td>2021-05-31 03:59:59+00:00</td>
      <td>2024-09-04 17:15:13.107000+00:00</td>
    </tr>
  </tbody>
</table>
<p>3 rows × 25 columns</p>
</div>


    
    Number of markets for CRYPTO.COM: 1104
    



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
      <th>...</th>
      <th>order_amount_increment</th>
      <th>order_price_increment</th>
      <th>order_amount_min</th>
      <th>order_amount_max</th>
      <th>order_price_min</th>
      <th>order_price_max</th>
      <th>margin_trading_enabled</th>
      <th>expiration</th>
      <th>min_time_trades</th>
      <th>max_time_trades</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>crypto.com-1INCHUSD-PERP-future</td>
      <td>2023-04-27 11:36:24.805000+00:00</td>
      <td>2024-09-04 17:15:14.565000+00:00</td>
      <td>crypto.com</td>
      <td>future</td>
      <td>{'min_time': '2024-07-24T13:00:00.000000000Z',...</td>
      <td>{'min_time': '2024-07-24T13:00:00.000000000Z',...</td>
      <td>1inch</td>
      <td>usd</td>
      <td>1INCHUSD-PERP</td>
      <td>...</td>
      <td>1</td>
      <td>0.00001</td>
      <td>&lt;NA&gt;</td>
      <td>&lt;NA&gt;</td>
      <td>&lt;NA&gt;</td>
      <td>&lt;NA&gt;</td>
      <td>&lt;NA&gt;</td>
      <td>NaT</td>
      <td>2023-04-27 11:36:24.805000+00:00</td>
      <td>2024-09-04 17:15:14.565000+00:00</td>
    </tr>
    <tr>
      <th>1</th>
      <td>crypto.com-1inch-btc-spot</td>
      <td>2022-06-24 18:33:54.977000+00:00</td>
      <td>2022-11-30 08:33:39.982000+00:00</td>
      <td>crypto.com</td>
      <td>spot</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>1inch</td>
      <td>btc</td>
      <td>1INCH_BTC</td>
      <td>...</td>
      <td>&lt;NA&gt;</td>
      <td>&lt;NA&gt;</td>
      <td>&lt;NA&gt;</td>
      <td>&lt;NA&gt;</td>
      <td>&lt;NA&gt;</td>
      <td>&lt;NA&gt;</td>
      <td>&lt;NA&gt;</td>
      <td>NaT</td>
      <td>2022-06-24 18:33:54.977000+00:00</td>
      <td>2022-11-30 08:33:39.982000+00:00</td>
    </tr>
    <tr>
      <th>2</th>
      <td>crypto.com-1inch-usd-spot</td>
      <td>2022-11-01 13:24:59.056000+00:00</td>
      <td>2024-09-04 17:15:10+00:00</td>
      <td>crypto.com</td>
      <td>spot</td>
      <td>{'min_time': '2023-06-12T17:13:30.000000000Z',...</td>
      <td>{'min_time': '2023-06-12T17:13:30.000000000Z',...</td>
      <td>1inch</td>
      <td>usd</td>
      <td>1INCH_USD</td>
      <td>...</td>
      <td>0.1</td>
      <td>0.00001</td>
      <td>0.1</td>
      <td>84000</td>
      <td>0.00001</td>
      <td>0</td>
      <td>False</td>
      <td>NaT</td>
      <td>2022-11-01 13:24:59.056000+00:00</td>
      <td>2024-09-04 17:15:00.699000+00:00</td>
    </tr>
  </tbody>
</table>
<p>3 rows × 26 columns</p>
</div>


    
    Number of markets for KUCOIN: 2377
    



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
      <th>...</th>
      <th>order_price_increment</th>
      <th>order_price_max</th>
      <th>order_taker_fee</th>
      <th>order_maker_fee</th>
      <th>expiration</th>
      <th>order_price_min</th>
      <th>order_size_min</th>
      <th>margin_trading_enabled</th>
      <th>min_time_trades</th>
      <th>max_time_trades</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>kucoin-1000000MOGUSDTM-future</td>
      <td>2024-07-10 07:00:00+00:00</td>
      <td>2024-09-04 17:15:11.313000+00:00</td>
      <td>kucoin</td>
      <td>future</td>
      <td>{'min_time': '2024-07-10T07:00:00.000000000Z',...</td>
      <td>{'min_time': '2024-07-10T07:00:00.000000000Z',...</td>
      <td>1000000mog</td>
      <td>usdt</td>
      <td>1000000MOGUSDTM</td>
      <td>...</td>
      <td>0.00010</td>
      <td>1000000.0</td>
      <td>0.00060</td>
      <td>0.00020</td>
      <td>NaT</td>
      <td>&lt;NA&gt;</td>
      <td>&lt;NA&gt;</td>
      <td>&lt;NA&gt;</td>
      <td>2024-07-10 08:13:34.575000+00:00</td>
      <td>2024-09-04 17:15:11.313000+00:00</td>
    </tr>
    <tr>
      <th>1</th>
      <td>kucoin-10000CATUSDTM-future</td>
      <td>2024-08-23 05:00:00+00:00</td>
      <td>2024-09-04 17:07:48.408000+00:00</td>
      <td>kucoin</td>
      <td>future</td>
      <td>{'min_time': '2024-08-23T05:00:00.000000000Z',...</td>
      <td>{'min_time': '2024-08-23T05:00:00.000000000Z',...</td>
      <td>10000cat</td>
      <td>usdt</td>
      <td>10000CATUSDTM</td>
      <td>...</td>
      <td>0.000010</td>
      <td>1000000.0</td>
      <td>0.00060</td>
      <td>0.00020</td>
      <td>NaT</td>
      <td>&lt;NA&gt;</td>
      <td>&lt;NA&gt;</td>
      <td>&lt;NA&gt;</td>
      <td>2024-08-23 06:05:22.711000+00:00</td>
      <td>2024-09-04 17:07:48.408000+00:00</td>
    </tr>
    <tr>
      <th>2</th>
      <td>kucoin-10000COQUSDTM-future</td>
      <td>2023-12-22 07:00:00+00:00</td>
      <td>2024-09-04 17:14:13.105000+00:00</td>
      <td>kucoin</td>
      <td>future</td>
      <td>{'min_time': '2023-12-22T07:00:00.000000000Z',...</td>
      <td>{'min_time': '2023-12-22T07:00:00.000000000Z',...</td>
      <td>10000coq</td>
      <td>usdt</td>
      <td>10000COQUSDTM</td>
      <td>...</td>
      <td>0.000010</td>
      <td>1000000.0</td>
      <td>0.00060</td>
      <td>0.00020</td>
      <td>NaT</td>
      <td>&lt;NA&gt;</td>
      <td>&lt;NA&gt;</td>
      <td>&lt;NA&gt;</td>
      <td>2023-12-22 08:09:03.822000+00:00</td>
      <td>2024-09-04 17:14:13.105000+00:00</td>
    </tr>
  </tbody>
</table>
<p>3 rows × 29 columns</p>
</div>


## Market Metadata

Coin Metrics has enhanced the metadata we publish for our markets to include several new precision, status, and fee fields. These fields are supplement several existing fields that we publish regarding the contract metadata for our derivatives markets. Now we publish up to 28 fields that allow users to fully understand the characteristics of our spot, futures, and options markets. 

New fields include: 
- **status:** Indicates whether the market is online. Can only take values online or offline.
- **order_amount_increment:** The minimum increment that the trade amount of an order can change in units of the base currency if a spot market or in contract units if a derivatives market.
- **order_amount_min:** The minimum trade amount of an order in units of the base currency if a spot market or in contract units if a derivatives market.
- **order_amount_max:** The maximum trade amount of an order in units of the base currency if a spot market or in contract units if a derivatives market.
- **order_price_increment:** The minimum increment that the price of an order can change. The price is quoted in units of the quote currency.
- **order_price_min:** The minimum price of an order. The price is quoted in units of the quote currency.
- **order_price_max:** The maximum price of an order. The price is quoted in units of the quote currency.
- **order_size_min:** The minimum order size amount in units of the quote currency. The order size is the order amount multiplied by the order price.
- **order_taker_fee:** The taker order fee in raw units (not percent units).
- **order_maker_fee:** The maker order fee in raw units (not percent units).
- **market_margin_trading_enabled:** Indicates whether the market allows margin trading. Can take values true or false.


```python
metadata_df = client.catalog_markets(
    markets='binance-BTCBUSD-future'
).to_dataframe()
metadata_df.transpose()
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
      <th>0</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>market</th>
      <td>binance-BTCBUSD-future</td>
    </tr>
    <tr>
      <th>min_time</th>
      <td>2021-01-11 16:00:00+00:00</td>
    </tr>
    <tr>
      <th>max_time</th>
      <td>2023-12-11 05:32:00+00:00</td>
    </tr>
    <tr>
      <th>exchange</th>
      <td>binance</td>
    </tr>
    <tr>
      <th>type</th>
      <td>future</td>
    </tr>
    <tr>
      <th>orderbooks</th>
      <td>{'min_time': '2021-08-18T16:07:20.000000000Z',...</td>
    </tr>
    <tr>
      <th>quotes</th>
      <td>{'min_time': '2021-08-18T16:07:20.000000000Z',...</td>
    </tr>
    <tr>
      <th>base</th>
      <td>btc</td>
    </tr>
    <tr>
      <th>quote</th>
      <td>busd</td>
    </tr>
    <tr>
      <th>symbol</th>
      <td>BTCBUSD</td>
    </tr>
    <tr>
      <th>size_asset</th>
      <td>btc</td>
    </tr>
    <tr>
      <th>margin_asset</th>
      <td>busd</td>
    </tr>
    <tr>
      <th>contract_size</th>
      <td>1</td>
    </tr>
    <tr>
      <th>tick_size</th>
      <td>0.1</td>
    </tr>
    <tr>
      <th>listing</th>
      <td>2021-01-11 08:00:00+00:00</td>
    </tr>
    <tr>
      <th>order_amount_increment</th>
      <td>0.001</td>
    </tr>
    <tr>
      <th>order_amount_min</th>
      <td>0.001</td>
    </tr>
    <tr>
      <th>order_amount_max</th>
      <td>500</td>
    </tr>
    <tr>
      <th>order_price_increment</th>
      <td>0.1</td>
    </tr>
    <tr>
      <th>order_price_min</th>
      <td>557.6</td>
    </tr>
    <tr>
      <th>order_price_max</th>
      <td>4529890</td>
    </tr>
    <tr>
      <th>order_size_min</th>
      <td>5</td>
    </tr>
    <tr>
      <th>min_time_trades</th>
      <td>2021-01-12 07:00:55.912000+00:00</td>
    </tr>
    <tr>
      <th>max_time_trades</th>
      <td>2023-12-11 05:30:08.211000+00:00</td>
    </tr>
    <tr>
      <th>min_time_funding_rates</th>
      <td>2021-01-11 16:00:00+00:00</td>
    </tr>
    <tr>
      <th>max_time_funding_rates</th>
      <td>2023-12-11 00:00:00+00:00</td>
    </tr>
    <tr>
      <th>min_time_openinterest</th>
      <td>2021-01-12 07:15:48.339000+00:00</td>
    </tr>
    <tr>
      <th>max_time_openinterest</th>
      <td>2023-12-11 05:32:00+00:00</td>
    </tr>
    <tr>
      <th>min_time_liquidations</th>
      <td>2021-01-12 07:32:41.554000+00:00</td>
    </tr>
    <tr>
      <th>max_time_liquidations</th>
      <td>2023-12-11 02:13:30.958000+00:00</td>
    </tr>
  </tbody>
</table>
</div>



## Liquidity Metrics

We have launched a suite of new liquidity metrics that provide a more comprehensive view of liquidity dynamics in crypto markets. The new metrics cover a range of liquidity dimensions, including bid-ask spread, depth, slippage. We offer the metrics at different combinations of time intervals, depth, order amounts, bid or ask side, and in U.S. dollars or in base currency units. The following new metrics served through our */timeseries/market-metrics* endpoint:

- **liquidity_bid_ask_spread_percent_{1m|1h|1d}**
- **liquidity_depth_{0_1|1|2|5|10}_percent_{bid|ask}_volume_{usd|units}**
- **liquidity_slippage_{1K|5K|10K|50K|100K|1M}_{bid|ask}_percent**


```python
market_metrics = client.catalog_market_metrics(
    exchange='binance',
).to_dataframe()
market_metrics = market_metrics[market_metrics['metric'].str.contains('liquidity')]
print('\n' + str(len(set(market_metrics['market'].to_list()))) + ' markets with liquidity metric coverage.\n')
display(market_metrics)
set(market_metrics['metric'].to_list())
```

    
    2927 markets with liquidity metric coverage.
    



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
      <th>metric</th>
      <th>frequency</th>
      <th>min_time</th>
      <th>max_time</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>12</th>
      <td>binance-1000BONKUSDC-future</td>
      <td>liquidity_bid_ask_spread_percent_1d</td>
      <td>1d</td>
      <td>2024-05-02 00:00:00+00:00</td>
      <td>2024-09-03 00:00:00+00:00</td>
    </tr>
    <tr>
      <th>13</th>
      <td>binance-1000BONKUSDC-future</td>
      <td>liquidity_bid_ask_spread_percent_1h</td>
      <td>1h</td>
      <td>2024-05-02 07:00:00+00:00</td>
      <td>2024-09-04 16:00:00+00:00</td>
    </tr>
    <tr>
      <th>14</th>
      <td>binance-1000BONKUSDC-future</td>
      <td>liquidity_bid_ask_spread_percent_1m</td>
      <td>1m</td>
      <td>2024-05-02 07:34:00+00:00</td>
      <td>2024-09-04 17:27:00+00:00</td>
    </tr>
    <tr>
      <th>15</th>
      <td>binance-1000BONKUSDC-future</td>
      <td>liquidity_depth_0_1_percent_ask_volume_units</td>
      <td>1h</td>
      <td>2024-05-02 08:00:00+00:00</td>
      <td>2024-09-04 17:00:00+00:00</td>
    </tr>
    <tr>
      <th>16</th>
      <td>binance-1000BONKUSDC-future</td>
      <td>liquidity_depth_0_1_percent_ask_volume_usd</td>
      <td>1h</td>
      <td>2024-05-02 08:00:00+00:00</td>
      <td>2024-09-04 17:00:00+00:00</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>265095</th>
      <td>binance-zrx-usdt-spot</td>
      <td>liquidity_slippage_80K_bid_percent</td>
      <td>1h</td>
      <td>2024-05-01 00:00:00+00:00</td>
      <td>2024-09-04 16:00:00+00:00</td>
    </tr>
    <tr>
      <th>265096</th>
      <td>binance-zrx-usdt-spot</td>
      <td>liquidity_slippage_900K_ask_percent</td>
      <td>1h</td>
      <td>2024-05-01 00:00:00+00:00</td>
      <td>2024-09-04 16:00:00+00:00</td>
    </tr>
    <tr>
      <th>265097</th>
      <td>binance-zrx-usdt-spot</td>
      <td>liquidity_slippage_900K_bid_percent</td>
      <td>1h</td>
      <td>2024-05-01 00:00:00+00:00</td>
      <td>2024-09-04 16:00:00+00:00</td>
    </tr>
    <tr>
      <th>265098</th>
      <td>binance-zrx-usdt-spot</td>
      <td>liquidity_slippage_90K_ask_percent</td>
      <td>1h</td>
      <td>2024-05-01 00:00:00+00:00</td>
      <td>2024-09-04 16:00:00+00:00</td>
    </tr>
    <tr>
      <th>265099</th>
      <td>binance-zrx-usdt-spot</td>
      <td>liquidity_slippage_90K_bid_percent</td>
      <td>1h</td>
      <td>2024-05-01 00:00:00+00:00</td>
      <td>2024-09-04 16:00:00+00:00</td>
    </tr>
  </tbody>
</table>
<p>259784 rows × 5 columns</p>
</div>





    {'liquidity_bid_ask_spread_percent_1d',
     'liquidity_bid_ask_spread_percent_1h',
     'liquidity_bid_ask_spread_percent_1m',
     'liquidity_depth_0_1_percent_ask_volume_units',
     'liquidity_depth_0_1_percent_ask_volume_usd',
     'liquidity_depth_0_1_percent_bid_volume_units',
     'liquidity_depth_0_1_percent_bid_volume_usd',
     'liquidity_depth_0_2_percent_ask_volume_units',
     'liquidity_depth_0_2_percent_ask_volume_usd',
     'liquidity_depth_0_2_percent_bid_volume_units',
     'liquidity_depth_0_2_percent_bid_volume_usd',
     'liquidity_depth_0_3_percent_ask_volume_units',
     'liquidity_depth_0_3_percent_ask_volume_usd',
     'liquidity_depth_0_3_percent_bid_volume_units',
     'liquidity_depth_0_3_percent_bid_volume_usd',
     'liquidity_depth_0_4_percent_ask_volume_units',
     'liquidity_depth_0_4_percent_ask_volume_usd',
     'liquidity_depth_0_4_percent_bid_volume_units',
     'liquidity_depth_0_4_percent_bid_volume_usd',
     'liquidity_depth_0_5_percent_ask_volume_units',
     'liquidity_depth_0_5_percent_ask_volume_usd',
     'liquidity_depth_0_5_percent_bid_volume_units',
     'liquidity_depth_0_5_percent_bid_volume_usd',
     'liquidity_depth_0_6_percent_ask_volume_units',
     'liquidity_depth_0_6_percent_ask_volume_usd',
     'liquidity_depth_0_6_percent_bid_volume_units',
     'liquidity_depth_0_6_percent_bid_volume_usd',
     'liquidity_depth_0_7_percent_ask_volume_units',
     'liquidity_depth_0_7_percent_ask_volume_usd',
     'liquidity_depth_0_7_percent_bid_volume_units',
     'liquidity_depth_0_7_percent_bid_volume_usd',
     'liquidity_depth_0_8_percent_ask_volume_units',
     'liquidity_depth_0_8_percent_ask_volume_usd',
     'liquidity_depth_0_8_percent_bid_volume_units',
     'liquidity_depth_0_8_percent_bid_volume_usd',
     'liquidity_depth_0_9_percent_ask_volume_units',
     'liquidity_depth_0_9_percent_ask_volume_usd',
     'liquidity_depth_0_9_percent_bid_volume_units',
     'liquidity_depth_0_9_percent_bid_volume_usd',
     'liquidity_depth_10_percent_ask_volume_units',
     'liquidity_depth_10_percent_ask_volume_usd',
     'liquidity_depth_10_percent_bid_volume_units',
     'liquidity_depth_10_percent_bid_volume_usd',
     'liquidity_depth_1_5_percent_ask_volume_units',
     'liquidity_depth_1_5_percent_ask_volume_usd',
     'liquidity_depth_1_5_percent_bid_volume_units',
     'liquidity_depth_1_5_percent_bid_volume_usd',
     'liquidity_depth_1_percent_ask_volume_units',
     'liquidity_depth_1_percent_ask_volume_usd',
     'liquidity_depth_1_percent_bid_volume_units',
     'liquidity_depth_1_percent_bid_volume_usd',
     'liquidity_depth_2_percent_ask_volume_units',
     'liquidity_depth_2_percent_ask_volume_usd',
     'liquidity_depth_2_percent_bid_volume_units',
     'liquidity_depth_2_percent_bid_volume_usd',
     'liquidity_depth_3_percent_ask_volume_units',
     'liquidity_depth_3_percent_ask_volume_usd',
     'liquidity_depth_3_percent_bid_volume_units',
     'liquidity_depth_3_percent_bid_volume_usd',
     'liquidity_depth_4_percent_ask_volume_units',
     'liquidity_depth_4_percent_ask_volume_usd',
     'liquidity_depth_4_percent_bid_volume_units',
     'liquidity_depth_4_percent_bid_volume_usd',
     'liquidity_depth_5_percent_ask_volume_units',
     'liquidity_depth_5_percent_ask_volume_usd',
     'liquidity_depth_5_percent_bid_volume_units',
     'liquidity_depth_5_percent_bid_volume_usd',
     'liquidity_depth_6_percent_ask_volume_units',
     'liquidity_depth_6_percent_ask_volume_usd',
     'liquidity_depth_6_percent_bid_volume_units',
     'liquidity_depth_6_percent_bid_volume_usd',
     'liquidity_depth_7_percent_ask_volume_units',
     'liquidity_depth_7_percent_ask_volume_usd',
     'liquidity_depth_7_percent_bid_volume_units',
     'liquidity_depth_7_percent_bid_volume_usd',
     'liquidity_depth_8_percent_ask_volume_units',
     'liquidity_depth_8_percent_ask_volume_usd',
     'liquidity_depth_8_percent_bid_volume_units',
     'liquidity_depth_8_percent_bid_volume_usd',
     'liquidity_depth_9_percent_ask_volume_units',
     'liquidity_depth_9_percent_ask_volume_usd',
     'liquidity_depth_9_percent_bid_volume_units',
     'liquidity_depth_9_percent_bid_volume_usd',
     'liquidity_slippage_100K_ask_percent',
     'liquidity_slippage_100K_bid_percent',
     'liquidity_slippage_10K_ask_percent',
     'liquidity_slippage_10K_bid_percent',
     'liquidity_slippage_1K_ask_percent',
     'liquidity_slippage_1K_bid_percent',
     'liquidity_slippage_1M_ask_percent',
     'liquidity_slippage_1M_bid_percent',
     'liquidity_slippage_200K_ask_percent',
     'liquidity_slippage_200K_bid_percent',
     'liquidity_slippage_20K_ask_percent',
     'liquidity_slippage_20K_bid_percent',
     'liquidity_slippage_300K_ask_percent',
     'liquidity_slippage_300K_bid_percent',
     'liquidity_slippage_30K_ask_percent',
     'liquidity_slippage_30K_bid_percent',
     'liquidity_slippage_400K_ask_percent',
     'liquidity_slippage_400K_bid_percent',
     'liquidity_slippage_40K_ask_percent',
     'liquidity_slippage_40K_bid_percent',
     'liquidity_slippage_500K_ask_percent',
     'liquidity_slippage_500K_bid_percent',
     'liquidity_slippage_50K_ask_percent',
     'liquidity_slippage_50K_bid_percent',
     'liquidity_slippage_5K_ask_percent',
     'liquidity_slippage_5K_bid_percent',
     'liquidity_slippage_600K_ask_percent',
     'liquidity_slippage_600K_bid_percent',
     'liquidity_slippage_60K_ask_percent',
     'liquidity_slippage_60K_bid_percent',
     'liquidity_slippage_700K_ask_percent',
     'liquidity_slippage_700K_bid_percent',
     'liquidity_slippage_70K_ask_percent',
     'liquidity_slippage_70K_bid_percent',
     'liquidity_slippage_800K_ask_percent',
     'liquidity_slippage_800K_bid_percent',
     'liquidity_slippage_80K_ask_percent',
     'liquidity_slippage_80K_bid_percent',
     'liquidity_slippage_900K_ask_percent',
     'liquidity_slippage_900K_bid_percent',
     'liquidity_slippage_90K_ask_percent',
     'liquidity_slippage_90K_bid_percent'}



### Market Depth Example


```python
# Market depth
bid_units = client.get_market_metrics(
    markets = ['coinbase-btc-usd-spot','kraken-btc-usd-spot','gemini-btc-usd-spot'],
    metrics = 'liquidity_depth_0_1_percent_bid_volume_usd',
    frequency = '1h',
    start_time = '2023-05-01'
).to_dataframe()
```


```python
ax = plt.subplot()
for market, data in bid_units.groupby('market'):
    sns.lineplot(data=data, y='liquidity_depth_0_1_percent_bid_volume_usd', x='time', label=market)

plt.setp(ax.get_xticklabels(), rotation=0, font='Lato')
ax.set_facecolor("white")
plt.grid(color='black', linestyle='--', linewidth=0.2)
ax.set_xlabel("", fontsize=15)
ax.set_ylabel("Bid Volume (0.1% Depth)\n", font='Lato', fontsize=15)
ticks_y = ticker.FuncFormatter(lambda x, pos: '${:,.2f}M'.format(x/1000000))  # Format the y-axis ticks
ax.yaxis.set_major_formatter(ticks_y)
ax.set_title('BTC-USD Bid Depth\n', font='Lato', fontsize=21)
plt.legend(title='', frameon=False, bbox_to_anchor=(0.75, 1.15), loc='upper left', fontsize=10)
plt.show()
```

    2024-09-05 01:54:01 WARNING  findfont: Font family 'Lato' not found.
    2024-09-05 01:54:01 WARNING  findfont: Font family 'Lato' not found.
    2024-09-05 01:54:01 WARNING  findfont: Font family 'Lato' not found.
    2024-09-05 01:54:01 WARNING  findfont: Font family 'Lato' not found.
    2024-09-05 01:54:01 WARNING  findfont: Font family 'Lato' not found.
    2024-09-05 01:54:01 WARNING  findfont: Font family 'Lato' not found.
    2024-09-05 01:54:01 WARNING  findfont: Font family 'Lato' not found.
    2024-09-05 01:54:01 WARNING  findfont: Font family 'Lato' not found.
    2024-09-05 01:54:01 WARNING  findfont: Font family 'Lato' not found.
    2024-09-05 01:54:01 WARNING  findfont: Font family 'Lato' not found.
    2024-09-05 01:54:01 WARNING  findfont: Font family 'Lato' not found.
    2024-09-05 01:54:01 WARNING  findfont: Font family 'Lato' not found.
    2024-09-05 01:54:01 WARNING  findfont: Font family 'Lato' not found.
    2024-09-05 01:54:01 WARNING  findfont: Font family 'Lato' not found.
    2024-09-05 01:54:01 WARNING  findfont: Font family 'Lato' not found.
    2024-09-05 01:54:01 WARNING  findfont: Font family 'Lato' not found.
    2024-09-05 01:54:01 WARNING  findfont: Font family 'Lato' not found.
    2024-09-05 01:54:01 WARNING  findfont: Font family 'Lato' not found.
    2024-09-05 01:54:01 WARNING  findfont: Font family 'Lato' not found.
    2024-09-05 01:54:01 WARNING  findfont: Font family 'Lato' not found.
    2024-09-05 01:54:01 WARNING  findfont: Font family 'Lato' not found.
    2024-09-05 01:54:01 WARNING  findfont: Font family 'Lato' not found.
    2024-09-05 01:54:01 WARNING  findfont: Font family 'Lato' not found.
    2024-09-05 01:54:01 WARNING  findfont: Font family 'Lato' not found.
    2024-09-05 01:54:01 WARNING  findfont: Font family 'Lato' not found.
    2024-09-05 01:54:01 WARNING  findfont: Font family 'Lato' not found.
    2024-09-05 01:54:01 WARNING  findfont: Font family 'Lato' not found.
    2024-09-05 01:54:01 WARNING  findfont: Font family 'Lato' not found.
    2024-09-05 01:54:01 WARNING  findfont: Font family 'Lato' not found.
    2024-09-05 01:54:01 WARNING  findfont: Font family 'Lato' not found.
    2024-09-05 01:54:01 WARNING  findfont: Font family 'Lato' not found.
    2024-09-05 01:54:01 WARNING  findfont: Font family 'Lato' not found.
    2024-09-05 01:54:01 WARNING  findfont: Font family 'Lato' not found.
    2024-09-05 01:54:01 WARNING  findfont: Font family 'Lato' not found.
    2024-09-05 01:54:01 WARNING  findfont: Font family 'Lato' not found.
    2024-09-05 01:54:01 WARNING  findfont: Font family 'Lato' not found.
    2024-09-05 01:54:01 WARNING  findfont: Font family 'Lato' not found.
    2024-09-05 01:54:02 WARNING  findfont: Font family 'Lato' not found.
    2024-09-05 01:54:02 WARNING  findfont: Font family 'Lato' not found.
    2024-09-05 01:54:02 WARNING  findfont: Font family 'Lato' not found.
    2024-09-05 01:54:02 WARNING  findfont: Font family 'Lato' not found.



    
![png](output_20_1.png)
    


## Real-time aggregated quotes for assets and pairs

Coin Metrics collects quotes representing the best bid order and best ask order residing at the top of the order book for individual markets like coinbase-btc-usd-spot. In addition to this, Coin Metrics now calculates quotes for assets like btc and pairs like btc-usd by aggregating quotes across a selection of high-quality constituent markets. Now our users can get access to the best bid and best ask for assets and pairs in real-time. 

Our aggregated quotes are conceptually similar to the National Best Bid Offer (NBBO), a regulation issued by the United States Securities and Exchange Commission that requires brokers to execute customer trades at the best available price. We offer our aggregated quotes through our */timeseries-stream/asset-quotes* and */timeseries-stream/pair-quotes* websocket API endpoints.


```python
stream = client.get_stream_asset_quotes(
    assets=['btc'],
)

def on_message(
        stream: CmStream, message: str

) -> None:

    data = orjson.loads(str(message))
    json_formatted_str = json.dumps(data, indent=1)
    print(json_formatted_str)
    print(' ')
    sequence_id = int(data['cm_sequence_id'])
    max_cm_sequence_id = 3
    if sequence_id >= max_cm_sequence_id:
        print(f"Closing the connection...")
        stream.close()
        
if __name__ == '__main__':
    print(f"Opening the connection...\n")
    stream.run(on_message=on_message)
```

    Opening the connection...
    
    {
     "pair": "btc-usd",
     "time": "2024-09-04T17:54:03.000000000Z",
     "ask_price": "57867.42650340373",
     "ask_size": "2.205701805",
     "bid_price": "57865.982462447755",
     "bid_size": "39.916894796",
     "mid_price": "57866.70448292574",
     "spread": "0.000024954608507142226",
     "cm_sequence_id": "0"
    }
     
    {
     "pair": "btc-usd",
     "time": "2024-09-04T17:54:03.250000000Z",
     "ask_price": "57866.27038760126",
     "ask_size": "1.6192939550000003",
     "bid_price": "57864.88469822682",
     "bid_size": "42.175422546",
     "mid_price": "57865.57754291404",
     "spread": "0.000023946695657042704",
     "cm_sequence_id": "1"
    }
     
    {
     "pair": "btc-usd",
     "time": "2024-09-04T17:54:03.500000000Z",
     "ask_price": "57866.62347398701",
     "ask_size": "2.0261578650000005",
     "bid_price": "57864.92660863904",
     "bid_size": "42.112208996000014",
     "mid_price": "57865.77504131303",
     "spread": "0.000029324161765088052",
     "cm_sequence_id": "2"
    }
     
    {
     "pair": "btc-usd",
     "time": "2024-09-04T17:54:03.750000000Z",
     "ask_price": "57866.522706374424",
     "ask_size": "2.002693015",
     "bid_price": "57864.9269790893",
     "bid_size": "42.402986936000005",
     "mid_price": "57865.72484273186",
     "spread": "0.00002757638117332036",
     "cm_sequence_id": "3"
    }
     
    Closing the connection...


## Realized Volatility Metrics

We've expanded our market metrics with the introduction of realized volatility. Our realized volatility metrics are available for over 650 cryptoassets (matching our CM Reference Rate coverage) and is measured as the standard deviation of the natural log of returns calculated every 10 minutes for a rolling 24 hour window, 7 day window and 30 day window. Realized volatility is sometimes referred to as historical volatility as it measures past volatility.


```python
vol = client.get_asset_metrics(
    assets = ['btc','eth'],
    metrics = 'volatility_realized_usd_rolling_24h',
    frequency = '10m',
    start_time = datetime.now() - timedelta(days=7)
).to_dataframe()
```


```python
vol
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
      <th>volatility_realized_usd_rolling_24h</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>btc</td>
      <td>2024-08-29 02:00:00+00:00</td>
      <td>0.661368</td>
    </tr>
    <tr>
      <th>1</th>
      <td>btc</td>
      <td>2024-08-29 02:10:00+00:00</td>
      <td>0.661454</td>
    </tr>
    <tr>
      <th>2</th>
      <td>btc</td>
      <td>2024-08-29 02:20:00+00:00</td>
      <td>0.661597</td>
    </tr>
    <tr>
      <th>3</th>
      <td>btc</td>
      <td>2024-08-29 02:30:00+00:00</td>
      <td>0.660629</td>
    </tr>
    <tr>
      <th>4</th>
      <td>btc</td>
      <td>2024-08-29 02:40:00+00:00</td>
      <td>0.661774</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>1915</th>
      <td>eth</td>
      <td>2024-09-04 17:10:00+00:00</td>
      <td>0.896762</td>
    </tr>
    <tr>
      <th>1916</th>
      <td>eth</td>
      <td>2024-09-04 17:20:00+00:00</td>
      <td>0.896523</td>
    </tr>
    <tr>
      <th>1917</th>
      <td>eth</td>
      <td>2024-09-04 17:30:00+00:00</td>
      <td>0.895854</td>
    </tr>
    <tr>
      <th>1918</th>
      <td>eth</td>
      <td>2024-09-04 17:40:00+00:00</td>
      <td>0.897012</td>
    </tr>
    <tr>
      <th>1919</th>
      <td>eth</td>
      <td>2024-09-04 17:50:00+00:00</td>
      <td>0.896779</td>
    </tr>
  </tbody>
</table>
<p>1920 rows × 3 columns</p>
</div>




```python
ax = plt.subplot()
for asset, data in vol.groupby('asset'):
    sns.lineplot(data=data, y='volatility_realized_usd_rolling_24h', x='time', label=asset.upper())
ax.set_title('\nBTC and ETH Realized Vol\n', font='Lato', fontsize=20)
plt.setp(ax.get_xticklabels(), rotation=0, font='Lato')
ax.set_facecolor("white")
plt.grid(color='black', linestyle='--', linewidth=0.2)
ax.set_xlabel("", fontsize=15)
ax.set_ylabel("Realized Volatility (24h)\n", font = 'Lato',fontsize=15)
plt.legend(title='', frameon=False, bbox_to_anchor=(0.86, 1.13), loc='upper left', fontsize=12)
plt.show()
```

    2024-09-05 01:54:14 WARNING  findfont: Font family 'Lato' not found.
    2024-09-05 01:54:14 WARNING  findfont: Font family 'Lato' not found.
    2024-09-05 01:54:14 WARNING  findfont: Font family 'Lato' not found.
    2024-09-05 01:54:14 WARNING  findfont: Font family 'Lato' not found.
    2024-09-05 01:54:14 WARNING  findfont: Font family 'Lato' not found.
    2024-09-05 01:54:14 WARNING  findfont: Font family 'Lato' not found.
    2024-09-05 01:54:14 WARNING  findfont: Font family 'Lato' not found.
    2024-09-05 01:54:14 WARNING  findfont: Font family 'Lato' not found.
    2024-09-05 01:54:14 WARNING  findfont: Font family 'Lato' not found.
    2024-09-05 01:54:14 WARNING  findfont: Font family 'Lato' not found.
    2024-09-05 01:54:14 WARNING  findfont: Font family 'Lato' not found.
    2024-09-05 01:54:14 WARNING  findfont: Font family 'Lato' not found.
    2024-09-05 01:54:14 WARNING  findfont: Font family 'Lato' not found.
    2024-09-05 01:54:14 WARNING  findfont: Font family 'Lato' not found.
    2024-09-05 01:54:14 WARNING  findfont: Font family 'Lato' not found.
    2024-09-05 01:54:14 WARNING  findfont: Font family 'Lato' not found.
    2024-09-05 01:54:14 WARNING  findfont: Font family 'Lato' not found.
    2024-09-05 01:54:14 WARNING  findfont: Font family 'Lato' not found.
    2024-09-05 01:54:14 WARNING  findfont: Font family 'Lato' not found.
    2024-09-05 01:54:14 WARNING  findfont: Font family 'Lato' not found.
    2024-09-05 01:54:14 WARNING  findfont: Font family 'Lato' not found.
    2024-09-05 01:54:14 WARNING  findfont: Font family 'Lato' not found.
    2024-09-05 01:54:14 WARNING  findfont: Font family 'Lato' not found.
    2024-09-05 01:54:14 WARNING  findfont: Font family 'Lato' not found.
    2024-09-05 01:54:14 WARNING  findfont: Font family 'Lato' not found.
    2024-09-05 01:54:14 WARNING  findfont: Font family 'Lato' not found.
    2024-09-05 01:54:14 WARNING  findfont: Font family 'Lato' not found.
    2024-09-05 01:54:14 WARNING  findfont: Font family 'Lato' not found.
    2024-09-05 01:54:14 WARNING  findfont: Font family 'Lato' not found.
    2024-09-05 01:54:14 WARNING  findfont: Font family 'Lato' not found.
    2024-09-05 01:54:14 WARNING  findfont: Font family 'Lato' not found.
    2024-09-05 01:54:14 WARNING  findfont: Font family 'Lato' not found.
    2024-09-05 01:54:14 WARNING  findfont: Font family 'Lato' not found.
    2024-09-05 01:54:14 WARNING  findfont: Font family 'Lato' not found.
    2024-09-05 01:54:14 WARNING  findfont: Font family 'Lato' not found.
    2024-09-05 01:54:14 WARNING  findfont: Font family 'Lato' not found.
    2024-09-05 01:54:14 WARNING  findfont: Font family 'Lato' not found.
    2024-09-05 01:54:14 WARNING  findfont: Font family 'Lato' not found.
    2024-09-05 01:54:14 WARNING  findfont: Font family 'Lato' not found.



    
![png](output_27_1.png)
    


## Sub-Second Reference Rates

CM Reference Rates are currently used by many market participants in a wide variety of use cases where timeliness is critical. DeFi protocols, through on-chain oracles such as Chainlink and Pyth, and centralized lenders consume our prices to mark-to-market collateral from users, initiate margin calls and liquidations, and adjust risk parameters as market conditions change. These use cases benefit from the most up-to-date prices possible so that market participants can take appropriate action during periods of intense price movements. 

Coin Metrics previously offered our Real-Time Reference Rates published at a frequency of once per second for these use cases, and now we have increased our publication frequency to once per 200 milliseconds.


```python
stream = client.get_stream_asset_metrics(
    assets=['btc'],
    metrics=['ReferenceRateUSD'],
    frequency='200ms'
)

def on_message(
        stream: CmStream, message: str
) -> None:
    data = orjson.loads(str(message))
    json_formatted_str = json.dumps(data, indent=1)
    print(json_formatted_str)
    print(' ')
    sequence_id = int(data['cm_sequence_id'])
    max_cm_sequence_id = 5
    if sequence_id >= max_cm_sequence_id:
        print(f"Closing the connection...")
        stream.close()
        
if __name__ == '__main__':
    print(f"Opening the connection...\n")
    stream.run(on_message=on_message)
```

    Opening the connection...
    
    {
     "time": "2024-09-04T17:54:16.000000000Z",
     "asset": "btc",
     "ReferenceRateUSD": "57877.76",
     "cm_sequence_id": "0"
    }
     
    {
     "time": "2024-09-04T17:54:16.200000000Z",
     "asset": "btc",
     "ReferenceRateUSD": "57877.76",
     "cm_sequence_id": "1"
    }
     
    {
     "time": "2024-09-04T17:54:16.400000000Z",
     "asset": "btc",
     "ReferenceRateUSD": "57877.76",
     "cm_sequence_id": "2"
    }
     
    {
     "time": "2024-09-04T17:54:16.600000000Z",
     "asset": "btc",
     "ReferenceRateUSD": "57877.76",
     "cm_sequence_id": "3"
    }
     
    {
     "time": "2024-09-04T17:54:16.800000000Z",
     "asset": "btc",
     "ReferenceRateUSD": "57877.75",
     "cm_sequence_id": "4"
    }
     
    {
     "time": "2024-09-04T17:54:17.000000000Z",
     "asset": "btc",
     "ReferenceRateUSD": "57877.75",
     "cm_sequence_id": "5"
    }
     
    Closing the connection...

