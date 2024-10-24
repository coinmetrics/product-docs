# Trade Size Distribution Demo

## Resources

This notebook demonstrates basic functionality offered by the Coin Metrics Python API Client and Market Data Feed.

Coin Metrics offers a vast assortment of data for hundreds of cryptoassets. The Python API Client allows for easy access to this data using Python without needing to create your own wrappers using `requests` and other such libraries.

To understand the data that Coin Metrics offers, feel free to peruse the resources below.

- The [Coin Metrics API v4](https://docs.coinmetrics.io/api/v4) website contains the full set of endpoints and data offered by Coin Metrics.
- The [Coin Metrics Product Documentation](https://docs.coinmetrics.io/info) gives detailed, conceptual explanations of the data that Coin Metrics offers.
- The [API Spec](https://coinmetrics.github.io/api-client-python/site/api_client.html) contains a full list of functions.

## Notebook Setup


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

    2024-09-12 08:18:53 INFO     Using API key found in environment


### Retrieve Trade Sizes


```python
def get_trade_size_stats(start,end,market):
    """ 
    For a given date and market, get stats on number of trades and dist of trade sizes 
        Returns a df with:
             Number of trades
             Volume (USD/Native)
             Number of trades by size groupings
             Volume derived from trades of various size groupings
    """
    
    #Call api
    df_trades = client.get_market_trades(markets=market,
                                        start_time=start,
                                        end_time=end).to_dataframe()
    #Prep data
    df_trades["amount_usd"] = df_trades.amount*df_trades.price
    df_trades["amount_usd_groups"] = pd.cut(df_trades["amount_usd"],bins=[0,1e3,1e4,1e5,1e6,1e7,1e100])
    print(df_trades.time.min())
    print(df_trades.time.max())

    #Get stats by group
    sum_count_by_size = df_trades.groupby("amount_usd_groups").agg({"amount_usd":['count',sum]})
    
    #Collect into a df
    df_day = pd.DataFrame()

    df_day.loc[start,"NumTrades"] = len(df_trades)
    df_day.loc[start,"VolUSD"] = df_trades.amount_usd.sum()
    df_day.loc[start,"VolNTV"] = df_trades.amount.sum()

    df_day.loc[start,"AvgSizeUSD"] = df_trades.amount_usd.mean()
    df_day.loc[start,"MedSizeUSD"] = df_trades.amount_usd.median()
    df_day.loc[start,"MaxSizeUSD"] = df_trades.amount_usd.max()

    df_day.loc[start,"NumTrades_0-1K"]      = sum_count_by_size.iloc[0,0]
    df_day.loc[start,"NumTrades_1K-10K"]    = sum_count_by_size.iloc[1,0]
    df_day.loc[start,"NumTrades_10K-100K"]  = sum_count_by_size.iloc[2,0]
    df_day.loc[start,"NumTrades_100K-1M"]   = sum_count_by_size.iloc[3,0]
    df_day.loc[start,"NumTrades_1M-10M"]    = sum_count_by_size.iloc[4,0]
    df_day.loc[start,"NumTrades_10M-Over"]  = sum_count_by_size.iloc[5,0]

    df_day.loc[start,"VolUSD_Trades_0-1K"]     = sum_count_by_size.iloc[0,1]
    df_day.loc[start,"VolUSD_Trades_1K-10K"]   = sum_count_by_size.iloc[1,1]
    df_day.loc[start,"VolUSD_Trades_10K-100K"] = sum_count_by_size.iloc[2,1]
    df_day.loc[start,"VolUSD_Trades_100K-1M"]  = sum_count_by_size.iloc[3,1]
    df_day.loc[start,"VolUSD_Trades_1M-10M"]   = sum_count_by_size.iloc[4,1]
    df_day.loc[start,"VolUSD_Trades_10M-Over"] = sum_count_by_size.iloc[5,1]
    
    return df_day
```


```python
df = get_trade_size_stats('2020-01-01','2020-01-01','coinbase-*-spot')
```

    2020-01-01 00:00:00.222256+00:00
    2020-01-01 23:59:56.831802+00:00



```python
df.transpose()
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
      <th>2020-01-01</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>NumTrades</th>
      <td>1.300310e+05</td>
    </tr>
    <tr>
      <th>VolUSD</th>
      <td>5.091709e+07</td>
    </tr>
    <tr>
      <th>VolNTV</th>
      <td>4.109769e+07</td>
    </tr>
    <tr>
      <th>AvgSizeUSD</th>
      <td>3.915765e+02</td>
    </tr>
    <tr>
      <th>MedSizeUSD</th>
      <td>4.777000e+01</td>
    </tr>
    <tr>
      <th>MaxSizeUSD</th>
      <td>2.818267e+05</td>
    </tr>
    <tr>
      <th>NumTrades_0-1K</th>
      <td>1.205890e+05</td>
    </tr>
    <tr>
      <th>NumTrades_1K-10K</th>
      <td>8.859000e+03</td>
    </tr>
    <tr>
      <th>NumTrades_10K-100K</th>
      <td>5.790000e+02</td>
    </tr>
    <tr>
      <th>NumTrades_100K-1M</th>
      <td>4.000000e+00</td>
    </tr>
    <tr>
      <th>NumTrades_1M-10M</th>
      <td>0.000000e+00</td>
    </tr>
    <tr>
      <th>NumTrades_10M-Over</th>
      <td>0.000000e+00</td>
    </tr>
    <tr>
      <th>VolUSD_Trades_0-1K</th>
      <td>1.459879e+07</td>
    </tr>
    <tr>
      <th>VolUSD_Trades_1K-10K</th>
      <td>2.440244e+07</td>
    </tr>
    <tr>
      <th>VolUSD_Trades_10K-100K</th>
      <td>1.119555e+07</td>
    </tr>
    <tr>
      <th>VolUSD_Trades_100K-1M</th>
      <td>7.203104e+05</td>
    </tr>
    <tr>
      <th>VolUSD_Trades_1M-10M</th>
      <td>0.000000e+00</td>
    </tr>
    <tr>
      <th>VolUSD_Trades_10M-Over</th>
      <td>0.000000e+00</td>
    </tr>
  </tbody>
</table>
</div>


