<img src="https://5264302.fs1.hubspotusercontent-na1.net/hubfs/5264302/Demo%20Asset%20Resources/Demo%20Covers/CM-Demo-futures_overview.png" width=1100 margin-left='auto' margin-right='auto'/>

This notebook demonstrates basic functionality offered by the Coin Metrics Python API Client and **Market Data Feed.**

Coin Metrics offers a vast assortment of data for hundreds of cryptoassets. The Python API Client allows for easy access to this data using Python without needing to create your own wrappers using `requests` and other such libraries.

## Resources
To understand the data that Coin Metrics offers, feel free to peruse the resources below.

- The [Coin Metrics API v4](https://docs.coinmetrics.io/api/v4) website contains the full set of endpoints and data offered by Coin Metrics.
- The [Coin Metrics Knowledge Base](https://docs.coinmetrics.io/info) gives detailed, conceptual explanations of the data that Coin Metrics offers.
- The [API Spec](https://coinmetrics.github.io/api-client-python/site/api_client.html) contains a full list of functions.

## Notebook Setup


```python
import os
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
import matplotlib.ticker as mticker
from matplotlib.ticker import ScalarFormatter
from matplotlib.ticker import FuncFormatter
from matplotlib.dates import DateFormatter
import matplotlib.pyplot as plt
import matplotlib.dates as mdates
%matplotlib inline
```


```python
sns.set_theme()
sns.set(rc={'figure.figsize':(8,6)})
```


```python
logging.basicConfig(
    format='%(asctime)s %(levelname)-8s %(message)s',
    level=logging.INFO,
    datefmt='%Y-%m-%d %H:%M:%S'
)
now = datetime.utcnow()
last_day_date_time = now - timedelta(hours = 24)
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

    2024-09-16 16:41:57 INFO     Using API key found in environment


# Futures Catalog

Futures contracts are standardized contracts that allow counterparties to enter into an agreement to buy or sell a standardized asset under contract specifications that are defined by the exchange. Each specific futures contract offered by a specific exchange will have identical contract specifications regardless of who is the counterparty. 

The contract specifications include information such as the underlying base and quote asset, the margin asset, the contract size, the listing time, expiration time, and other terms. 

Coin Metrics offers contract specifications for both futures and options. Here we define futures to include both non-perpetual futures that expire and perpetual futures (sometimes called perpetual swaps).  


```python
market_reference = client.reference_data_markets(
    type='future',
    page_size=10000
).to_dataframe()
```

    /Users/victorramirez/opt/anaconda3/lib/python3.8/site-packages/coinmetrics/_data_collection.py:281: DtypeWarning: Columns (35) have mixed types. Specify dtype option on import or set low_memory=False.
      df: pd.DataFrame = pd.read_csv(



```python
print('Total number of supported futures markets: ' + str(len(market_reference)))
```

    Total number of supported futures markets: 18682



```python
# Perpetual futures markets are any futures market with null expiration
print('Total number of perpetual futures markets: ' + str(len(market_reference.loc[market_reference['expiration'].isna()])))
```

    Total number of perpetual futures markets: 4222



```python
# Filter by base or quote asset
print('Total number of supported BTC futures markets: ' + str(len(market_reference.loc[market_reference['base'] == 'btc'])))
```

    Total number of supported BTC futures markets: 3109



```python
# Select first BTC futures market as an example
market_reference.loc[market_reference['base'] == 'btc'].iloc[0]
```




    market                            binance-BTCBUSD-future
    exchange                                         binance
    base                                                 btc
    quote                                               busd
    pair                                            btc-busd
    symbol                                           BTCBUSD
    type                                              future
    size_asset                                           btc
    margin_asset                                        busd
    strike                                              <NA>
    option_contract_type                                <NA>
    is_european                                         <NA>
    contract_size                                        1.0
    tick_size                                            0.1
    multiplier_size                                     <NA>
    listing                   2021-01-11T08:00:00.000000000Z
    expiration                                          <NA>
    settlement_price                                    <NA>
    pool_config_id                                      <NA>
    contract_address                                    <NA>
    fee                                                 <NA>
    price_includes_fee                                  <NA>
    variable_fee                                        <NA>
    base_address                                        <NA>
    quote_address                                       <NA>
    status                                              <NA>
    order_amount_increment                             0.001
    order_amount_min                                   0.001
    order_amount_max                                     500
    order_price_increment                                0.1
    order_price_min                                    557.6
    order_price_max                                4529890.0
    order_size_min                                       5.0
    order_taker_fee                                     <NA>
    order_maker_fee                                     <NA>
    margin_trading_enabled                              <NA>
    experimental                                        <NA>
    Name: 151, dtype: object



# Open Interest

Open interest represents the number of contracts that are currently outstanding and not settled for a specific derivatives market. 

### Open Interest is available at various levels:
- Assets level (i.e btc)
- Asset Pair level (i.e. btc-usd)
- Exchange level (i.e. binance)
- Exchange-Asset level (i.e. binance-btc)
- Market level (i.e. binance-BTCUSDT-future)

## BTC Open Interest at the Market Level


```python
binance_btcusdt_oi = client.get_market_open_interest(
    markets = 'binance-BTCUSDT-future',
    start_time = datetime.utcnow() - timedelta(days=1),
).to_dataframe()
```


```python
binance_btcusdt_oi
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
      <td>binance-BTCUSDT-future</td>
      <td>2024-09-15 21:42:00+00:00</td>
      <td>87506.236</td>
      <td>5214374094.5096</td>
      <td>2024-09-15 21:42:31.800754+00:00</td>
      <td>2024-09-15 21:42:00+00:00</td>
    </tr>
    <tr>
      <th>1</th>
      <td>binance-BTCUSDT-future</td>
      <td>2024-09-15 21:43:00+00:00</td>
      <td>87493.551</td>
      <td>5213766952.1553</td>
      <td>2024-09-15 21:43:55.721238+00:00</td>
      <td>2024-09-15 21:43:00+00:00</td>
    </tr>
    <tr>
      <th>2</th>
      <td>binance-BTCUSDT-future</td>
      <td>2024-09-15 21:44:00+00:00</td>
      <td>87505.378</td>
      <td>5215066763.2038</td>
      <td>2024-09-15 21:44:48.749434+00:00</td>
      <td>2024-09-15 21:44:00+00:00</td>
    </tr>
    <tr>
      <th>3</th>
      <td>binance-BTCUSDT-future</td>
      <td>2024-09-15 21:45:00+00:00</td>
      <td>87499.076</td>
      <td>5215364925.1648</td>
      <td>2024-09-15 21:45:41.693858+00:00</td>
      <td>2024-09-15 21:45:00+00:00</td>
    </tr>
    <tr>
      <th>4</th>
      <td>binance-BTCUSDT-future</td>
      <td>2024-09-15 21:46:00+00:00</td>
      <td>87503.139</td>
      <td>5214338303.9517</td>
      <td>2024-09-15 21:46:35.001759+00:00</td>
      <td>2024-09-15 21:46:00+00:00</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>1435</th>
      <td>binance-BTCUSDT-future</td>
      <td>2024-09-16 21:37:00+00:00</td>
      <td>84817.5</td>
      <td>4903884915.75</td>
      <td>2024-09-16 21:37:39.951283+00:00</td>
      <td>2024-09-16 21:37:00+00:00</td>
    </tr>
    <tr>
      <th>1436</th>
      <td>binance-BTCUSDT-future</td>
      <td>2024-09-16 21:38:00+00:00</td>
      <td>84825.836</td>
      <td>4902466778.702</td>
      <td>2024-09-16 21:38:33.480165+00:00</td>
      <td>2024-09-16 21:38:00+00:00</td>
    </tr>
    <tr>
      <th>1437</th>
      <td>binance-BTCUSDT-future</td>
      <td>2024-09-16 21:39:00+00:00</td>
      <td>84832.474</td>
      <td>4902417772.9756</td>
      <td>2024-09-16 21:39:26.976255+00:00</td>
      <td>2024-09-16 21:39:00+00:00</td>
    </tr>
    <tr>
      <th>1438</th>
      <td>binance-BTCUSDT-future</td>
      <td>2024-09-16 21:40:00+00:00</td>
      <td>84842.805</td>
      <td>4902471801.315</td>
      <td>2024-09-16 21:40:46.680850+00:00</td>
      <td>2024-09-16 21:40:00+00:00</td>
    </tr>
    <tr>
      <th>1439</th>
      <td>binance-BTCUSDT-future</td>
      <td>2024-09-16 21:41:00+00:00</td>
      <td>84851.162</td>
      <td>4904380193.3676</td>
      <td>2024-09-16 21:41:40.406353+00:00</td>
      <td>2024-09-16 21:41:00+00:00</td>
    </tr>
  </tbody>
</table>
<p>1440 rows × 6 columns</p>
</div>



## BTC Open Interest by Exchange (Exchange-Asset Endpoint)


```python
oi_catalog = client.catalog_exchange_asset_metrics_v2(metrics='open_interest_reported_future_usd').to_dataframe()
oi_catalog = oi_catalog[oi_catalog['exchange_asset'].str.split('-').str[1] == 'btc']
exchange_assets = oi_catalog['exchange_asset'].to_list()
```

Use the **get_exchange_asset_metrics** client function to pull the all BTC exchange-asset pairs at daily frequency:


```python
btc_oi = client.get_exchange_asset_metrics(
    exchange_assets = exchange_assets,
    metrics = 'open_interest_reported_future_usd',
    start_time = datetime.utcnow() - timedelta(days=365),
    frequency = '1d'
).to_dataframe()
```


```python
# Convert 'open_interest_reported_future_usd' to numeric
btc_oi['open_interest_reported_future_usd'] = btc_oi['open_interest_reported_future_usd'].astype(np.float64)

# Convert 'time' to datetime
btc_oi['time'] = btc_oi['time'].dt.tz_localize(None).astype('datetime64[ns]')
btc_oi
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
      <th>open_interest_reported_future_usd</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>binance-btc</td>
      <td>2023-09-18</td>
      <td>3.074676e+09</td>
    </tr>
    <tr>
      <th>1</th>
      <td>binance-btc</td>
      <td>2023-09-19</td>
      <td>3.220249e+09</td>
    </tr>
    <tr>
      <th>2</th>
      <td>binance-btc</td>
      <td>2023-09-20</td>
      <td>3.359060e+09</td>
    </tr>
    <tr>
      <th>3</th>
      <td>binance-btc</td>
      <td>2023-09-21</td>
      <td>3.272911e+09</td>
    </tr>
    <tr>
      <th>4</th>
      <td>binance-btc</td>
      <td>2023-09-22</td>
      <td>3.280109e+09</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>3280</th>
      <td>okex-btc</td>
      <td>2024-09-12</td>
      <td>2.346645e+09</td>
    </tr>
    <tr>
      <th>3281</th>
      <td>okex-btc</td>
      <td>2024-09-13</td>
      <td>2.431933e+09</td>
    </tr>
    <tr>
      <th>3282</th>
      <td>okex-btc</td>
      <td>2024-09-14</td>
      <td>2.693548e+09</td>
    </tr>
    <tr>
      <th>3283</th>
      <td>okex-btc</td>
      <td>2024-09-15</td>
      <td>2.608818e+09</td>
    </tr>
    <tr>
      <th>3284</th>
      <td>okex-btc</td>
      <td>2024-09-16</td>
      <td>2.569876e+09</td>
    </tr>
  </tbody>
</table>
<p>3285 rows × 3 columns</p>
</div>




```python
# Drop rows with missing data
btc_oi.dropna(inplace=True)
```


```python
exchanges = btc_oi['exchange_asset'].unique()
dates = btc_oi['time'].unique() 
stacked_data = [btc_oi[btc_oi['exchange_asset'] == exchange]['open_interest_reported_future_usd'].values for exchange in exchanges]

fig, ax = plt.subplots(figsize=(12, 7))
ax.stackplot(dates, stacked_data, labels=exchanges, edgecolor='none')

ax.set_title('\nBTC Open Interest\nby Exchange\n', fontsize=16)
ax.set_xlabel('', fontsize=14)
ax.set_ylabel('Reported Open Interest (USD)\n', fontsize=14)
ax.legend(loc='upper left', title='Exchange Asset', bbox_to_anchor=(1,1), frameon=False)
ax.grid(True, linestyle='--', alpha=0.5, color='gray')
ax.set_facecolor('white')

# Format y-axis in billions of dollars
def billions(x, pos):
    return f'${x * 1e-9:.1f}B'

ax.yaxis.set_major_formatter(FuncFormatter(billions))

ax.set_xlim([btc_oi['time'].min(), btc_oi['time'].max()])
ax.xaxis.set_major_locator(mdates.MonthLocator())
ax.xaxis.set_major_formatter(mdates.DateFormatter('%b\n%Y'))
fig.autofmt_xdate()
ax.tick_params(axis='x', which='major', pad=10) 
_ = plt.xticks(rotation=0)
plt.tight_layout()
plt.show()
```


    
![png](output_24_0.png)
    


# Liquidations

Next, we'll take a look at liquidations data. As a reminder, exchanges which offer futures markets utilize a risk management system that will attempt to close a user’s position before the point at which the user begins to owe more than what is in the user's account. The trade or order that closes the user's position is referred to as a liquidation.

This time, we'll use the **get_market_liquidations** client function to pull all BTCUSDT liquidations over the last 24 hours on Binance:


```python
market = 'binance-BTCUSDT-future'
```


```python
liquidations_df = client.get_market_liquidations(
    markets = market,
    start_time = datetime.utcnow() - timedelta(days=1),
).to_dataframe()
liquidations_df['amount'] = liquidations_df['amount'].astype(np.float64)
liquidations_df['price'] = liquidations_df['price'].astype(np.float64)
```


```python
liquidations_df.head()
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
      <td>2024-09-15 21:54:34.145000+00:00</td>
      <td>1726437274145000000</td>
      <td>0.011</td>
      <td>59648.0</td>
      <td>trade</td>
      <td>2024-09-15 21:54:34.297968+00:00</td>
      <td>buy</td>
    </tr>
    <tr>
      <th>1</th>
      <td>binance-BTCUSDT-future</td>
      <td>2024-09-15 21:57:52.361000+00:00</td>
      <td>1726437472361000000</td>
      <td>0.006</td>
      <td>59663.1</td>
      <td>trade</td>
      <td>2024-09-15 21:57:53.574117+00:00</td>
      <td>buy</td>
    </tr>
    <tr>
      <th>2</th>
      <td>binance-BTCUSDT-future</td>
      <td>2024-09-15 22:02:17.426000+00:00</td>
      <td>1726437737426000000</td>
      <td>0.242</td>
      <td>59511.0</td>
      <td>trade</td>
      <td>2024-09-15 22:02:18.244282+00:00</td>
      <td>sell</td>
    </tr>
    <tr>
      <th>3</th>
      <td>binance-BTCUSDT-future</td>
      <td>2024-09-15 22:02:19.433000+00:00</td>
      <td>1726437739433000000</td>
      <td>0.041</td>
      <td>59503.1</td>
      <td>trade</td>
      <td>2024-09-15 22:02:20.362299+00:00</td>
      <td>sell</td>
    </tr>
    <tr>
      <th>4</th>
      <td>binance-BTCUSDT-future</td>
      <td>2024-09-15 22:02:33.095000+00:00</td>
      <td>1726437753095000000</td>
      <td>0.009</td>
      <td>59479.2</td>
      <td>trade</td>
      <td>2024-09-15 22:02:34.376645+00:00</td>
      <td>sell</td>
    </tr>
  </tbody>
</table>
</div>




```python
# Get volume-weighted average price of the futures contract from the market-candles endpoint
price = client.get_market_candles(
        markets = market,
        start_time = datetime.utcnow() - timedelta(days=1),
        end_time = datetime.utcnow(),
        frequency='1m'
).to_dataframe()
price['vwap'] = price['vwap'].astype(np.float64)
```


```python
import matplotlib.pyplot as plt
from matplotlib.dates import DateFormatter

plt.figure(figsize=(13,7))
scaling_factor = 300  # Adjust this value to get the desired point size
color_map = {'buy': 'green', 'sell': 'red'}
liqs = plt.scatter(
    x=liquidations_df['time'],
    y=liquidations_df['price'],
    s=liquidations_df['amount'] * scaling_factor,  # Scale point sizes by the scaling factor
    c=liquidations_df['side'].map(color_map),
    alpha=0.6
)

plt.plot(price['time'], price['vwap'], color='black', linestyle='-', label='VWAP')

mean_price = liquidations_df['price'].mean()
std_price = liquidations_df['price'].std()
plt.ylim(mean_price - 3*std_price, mean_price + 3*std_price)
plt.xlabel("", fontsize=15)
plt.ylabel("Price\n", font='arial',fontsize=15)
plt.title('\n' + str(market) + '\nLiquidations\n', size=20)

# Format the xtick labels
date_format = DateFormatter('%D\n%H:%M')
plt.gca().xaxis.set_major_formatter(date_format)

legend_labels = ['BUY', 'SELL', 'VWAP']
legend_handles = [
    plt.Line2D([0], [0], marker='o', color='w', markerfacecolor=color_map['buy'], markersize=12),
    plt.Line2D([0], [0], marker='o', color='w', markerfacecolor=color_map['sell'], markersize=12),
    plt.Line2D([0], [0], color='black', lw=2)  # Legend entry for VWAP
]
legend = plt.legend(legend_handles, legend_labels, loc='lower right', fontsize=14, ncol=2, framealpha=0, bbox_to_anchor=(0.99, 1.02))

plt.gca().set_facecolor('white')
plt.grid(color='black', linestyle='dotted')

plt.tight_layout() 
plt.show()
```


    
![png](output_32_0.png)
    


Notice that this timeseries also includes the liquidation **type**. Some exchanges report “liquidations orders” in which they will report the creation of a liquidation **order** when a trader’s position initially enters liquidation. When a trader’s position enters liquidation, an exchange will typically enter a limit order at the price at which the trader will be bankruptcy price. The liquidation orders will show the amount of the position that is being liquidated and the liquidation price, but will not represent the matched trades that are executed as a result of the liquidation. Other exchanges will report “liquidation trades” which represent the actual matched **trade** as a result of a liquidation order but will not report liquidation orders. Some exchanges will report both liquidation orders and liquidation trades.

### Aggregated Liquidation Metrics

In addition to examining individual liquidations, we can also leverage aggregated liquidations metrics. This allows us to quickly view the total amount of USD-denominated liquidations that have occurred over large timeframes, without needing to aggregate the amounts at the trade level.


```python
metrics = ['liquidations_reported_future_buy_usd_1h', 'liquidations_reported_future_sell_usd_1h']
```


```python
liq_catalog = client.catalog_exchange_asset_metrics_v2(metrics=metrics).to_dataframe()
liq_catalog = liq_catalog[liq_catalog['exchange_asset'].str.split('-').str[1] == 'btc']
liq_catalog
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
      <th>metrics</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>61</th>
      <td>binance-btc</td>
      <td>[{'metric': 'liquidations_reported_future_buy_...</td>
    </tr>
    <tr>
      <th>335</th>
      <td>bitfinex-btc</td>
      <td>[{'metric': 'liquidations_reported_future_buy_...</td>
    </tr>
    <tr>
      <th>401</th>
      <td>bitmex-btc</td>
      <td>[{'metric': 'liquidations_reported_future_buy_...</td>
    </tr>
    <tr>
      <th>577</th>
      <td>bybit-btc</td>
      <td>[{'metric': 'liquidations_reported_future_buy_...</td>
    </tr>
    <tr>
      <th>925</th>
      <td>deribit-btc</td>
      <td>[{'metric': 'liquidations_reported_future_buy_...</td>
    </tr>
    <tr>
      <th>978</th>
      <td>ftx-btc</td>
      <td>[{'metric': 'liquidations_reported_future_buy_...</td>
    </tr>
    <tr>
      <th>1213</th>
      <td>huobi-btc</td>
      <td>[{'metric': 'liquidations_reported_future_buy_...</td>
    </tr>
    <tr>
      <th>1475</th>
      <td>kraken-btc</td>
      <td>[{'metric': 'liquidations_reported_future_buy_...</td>
    </tr>
    <tr>
      <th>1688</th>
      <td>okex-btc</td>
      <td>[{'metric': 'liquidations_reported_future_buy_...</td>
    </tr>
  </tbody>
</table>
</div>




```python
agg_liqs = client.get_exchange_asset_metrics(
    exchange_assets=liq_catalog['exchange_asset'].to_list(),
    metrics = metrics,
    start_time = datetime.utcnow() - timedelta(days=1.5),
    frequency='1h'
).to_dataframe()
agg_liqs.replace('None', np.nan, inplace=True)
agg_liqs[metrics[0]] = agg_liqs['liquidations_reported_future_buy_usd_1h'].astype(np.float64)
agg_liqs['liquidations_reported_future_sell_usd_1h'] = -1 * agg_liqs['liquidations_reported_future_sell_usd_1h'].astype(np.float64)
```


```python
agg_liqs = agg_liqs.fillna(0)
agg_liqs
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
      <th>liquidations_reported_future_buy_usd_1h</th>
      <th>liquidations_reported_future_sell_usd_1h</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>binance-btc</td>
      <td>2024-09-15 10:00:00+00:00</td>
      <td>41189.76644</td>
      <td>-123119.61981</td>
    </tr>
    <tr>
      <th>1</th>
      <td>binance-btc</td>
      <td>2024-09-15 11:00:00+00:00</td>
      <td>2219.32844</td>
      <td>-26757.74386</td>
    </tr>
    <tr>
      <th>2</th>
      <td>binance-btc</td>
      <td>2024-09-15 12:00:00+00:00</td>
      <td>20766.66452</td>
      <td>-540.03552</td>
    </tr>
    <tr>
      <th>3</th>
      <td>binance-btc</td>
      <td>2024-09-15 13:00:00+00:00</td>
      <td>166694.89730</td>
      <td>-28269.05000</td>
    </tr>
    <tr>
      <th>4</th>
      <td>binance-btc</td>
      <td>2024-09-15 14:00:00+00:00</td>
      <td>208587.82170</td>
      <td>-319846.10928</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>167</th>
      <td>okex-btc</td>
      <td>2024-09-16 16:00:00+00:00</td>
      <td>2309.60000</td>
      <td>-231.20680</td>
    </tr>
    <tr>
      <th>168</th>
      <td>okex-btc</td>
      <td>2024-09-16 17:00:00+00:00</td>
      <td>753306.85950</td>
      <td>-676171.41858</td>
    </tr>
    <tr>
      <th>169</th>
      <td>okex-btc</td>
      <td>2024-09-16 18:00:00+00:00</td>
      <td>0.00000</td>
      <td>-245113.87800</td>
    </tr>
    <tr>
      <th>170</th>
      <td>okex-btc</td>
      <td>2024-09-16 19:00:00+00:00</td>
      <td>0.00000</td>
      <td>-18840.23928</td>
    </tr>
    <tr>
      <th>171</th>
      <td>okex-btc</td>
      <td>2024-09-16 20:00:00+00:00</td>
      <td>52104.18704</td>
      <td>-131510.72160</td>
    </tr>
  </tbody>
</table>
<p>172 rows × 4 columns</p>
</div>




```python
btc_total_oi = client.get_asset_metrics(
    assets='btc',
    metrics='open_interest_reported_future_usd',
    frequency='1h', 
    start_time = datetime.utcnow() - timedelta(days=2)
).to_dataframe()
btc_total_oi.head()
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
      <th>open_interest_reported_future_usd</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>btc</td>
      <td>2024-09-14 22:00:00+00:00</td>
      <td>27085472082.8134</td>
    </tr>
    <tr>
      <th>1</th>
      <td>btc</td>
      <td>2024-09-14 23:00:00+00:00</td>
      <td>27086895034.416401</td>
    </tr>
    <tr>
      <th>2</th>
      <td>btc</td>
      <td>2024-09-15 00:00:00+00:00</td>
      <td>27089846618.242401</td>
    </tr>
    <tr>
      <th>3</th>
      <td>btc</td>
      <td>2024-09-15 01:00:00+00:00</td>
      <td>27103605277.447899</td>
    </tr>
    <tr>
      <th>4</th>
      <td>btc</td>
      <td>2024-09-15 02:00:00+00:00</td>
      <td>27206441557.918598</td>
    </tr>
  </tbody>
</table>
</div>




```python
df = agg_liqs
```


```python
melted_df = df.melt(id_vars=['time', 'exchange_asset'], 
                    value_vars=['liquidations_reported_future_buy_usd_1h', 'liquidations_reported_future_sell_usd_1h'],
                    var_name='transaction_type', value_name='amount')
melted_df['amount'] /= 1e6
melted_df['time'] = melted_df['time'].dt.tz_localize(None)

fig, ax = plt.subplots(figsize=(12,7))
plt.gca().set_facecolor('white')
plt.grid(color='gray', linestyle='dotted',alpha=0.3)
ax2 = ax.twinx()

unique_assets = melted_df['exchange_asset'].unique()
colormap = plt.cm.tab20
colors = {asset: colormap(i) for i, asset in enumerate(unique_assets)}

for asset in unique_assets:
    subset = melted_df[melted_df['exchange_asset'] == asset]
    ax.bar(subset['time'], subset['amount'], width=0.01, label=asset, color=colors[asset]) 

# Plot open interest on secondary y-axis
btc_total_oi['time'] = btc_total_oi['time'].dt.tz_localize(None)
ax2.plot(btc_total_oi['time'], btc_total_oi['open_interest_reported_future_usd'], color='black', label='Open Interest (USD)', linewidth=1, linestyle='--')

ax.set_xlabel('')
ax.set_ylabel('Amount Liquidated (USD)', fontsize=14)
ax2.set_ylabel('\nOpen Interest (USD)', fontsize=14)
ax.set_title('\nBTC Hourly Liquidations \nand Open Interest (USD)\n', fontsize=16)

locator = mdates.HourLocator(interval=6)  
ax.xaxis.set_major_locator(locator)
ax.xaxis.set_major_formatter(mdates.DateFormatter('%D\n%H:%M'))  

# Format y-axis ticks for liquidations
def y_formatter(x, pos):
    if x < 0:
        return f"-${abs(x):.1f}M"
    else:
        return f"${x:.1f}M"

ax.yaxis.set_major_formatter(mticker.FuncFormatter(y_formatter))
ax.yaxis.grid(True, linestyle='--', which='major')  
ax2.yaxis.grid(False)  
ax.yaxis.tick_left()  
ax.tick_params(axis='both', length=0, labelsize=12)
ax2.tick_params(axis='both', length=0, labelsize=12) 

# Format y-axis ticks for open interest in billions
def y_formatter_billion(x, pos):
    return f"${x*1e-9:.2f}B"
ax2.yaxis.set_major_formatter(mticker.FuncFormatter(y_formatter_billion))

num_ticks = 10
yticks = np.linspace(melted_df['amount'].min(), melted_df['amount'].max(), num_ticks)
ax.set_yticks(yticks)

# Set y-ticks based on a similar range
yticks2 = np.linspace(btc_total_oi['open_interest_reported_future_usd'].min(), 
                      btc_total_oi['open_interest_reported_future_usd'].max(), num_ticks)
ax2.set_yticks(yticks2)

# Legend for both axes
lines, labels = ax.get_legend_handles_labels()
lines2, labels2 = ax2.get_legend_handles_labels()
ax2.legend(lines + lines2, labels + labels2, loc='upper right', fontsize=10, ncol=2, framealpha=0, bbox_to_anchor=(1.08, 1.19))

plt.tight_layout()

for spine in ax2.spines.values():
    spine.set_visible(False)
for spine in ax.spines.values():
    spine.set_visible(False)

plt.show()
```


    
![png](output_41_0.png)
    


# Funding Rates

Funding rates are a mechanism that exchanges use to ensure that perpetual futures trade at a price that is close to the price of the underlying spot markets. The funding rate is used to calculate the funding fee which long position holders pay short position holders, or vice versa, as a way to incentivize market participants to take positions that keep perpetual futures prices close to the underlying. 

Coin Metrics funding rate data from the *timeseries/market-funding-rates* endpoint includes the following fields:
- **market:** The id of the market. Market ids use the following naming convention: exchangeName-baseAsset-quoteAsset-spot for spot markets, exchangeName-futuresSymbol-future for futures markets, and exchangeName-optionsSymbol-option for options markets. 

- **time:** The exchange-reported time in ISO 8601 date-time format. Always with nanoseconds precision.
- **rate:** The funding rate expressed as a percentage over the period. For example, if the funding rate is 0.10%, expressed as an 8 hour rate and calculated over the past 8 hours, the rate is 0.0010.
- **period:** The periodicity of the funding rate. If the rate is 0.0010then this rate would be applied every period defined by this field. 
- **interval:** The interval of time over which the funding rate is calculated. 
- **database_time:** The timestamp when the data was saved in the database in ISO 8601 date-time format with nanoseconds precision.


```python
fr_catalog = client.catalog_market_funding_rates_v2(exchange='binance').to_dataframe()
```


```python
fr_catalog
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
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>binance-1000BONKUSDC-future</td>
      <td>2024-05-01 00:00:00+00:00</td>
      <td>2024-09-16 20:00:00+00:00</td>
    </tr>
    <tr>
      <th>1</th>
      <td>binance-1000BONKUSDT-future</td>
      <td>2023-11-22 16:00:00+00:00</td>
      <td>2024-09-16 20:00:00+00:00</td>
    </tr>
    <tr>
      <th>2</th>
      <td>binance-1000BTTCUSDT-future</td>
      <td>2022-01-26 08:00:00.001000+00:00</td>
      <td>2022-04-11 08:00:00+00:00</td>
    </tr>
    <tr>
      <th>3</th>
      <td>binance-1000FLOKIUSDT-future</td>
      <td>2023-05-06 16:00:00+00:00</td>
      <td>2024-09-16 16:00:00+00:00</td>
    </tr>
    <tr>
      <th>4</th>
      <td>binance-1000LUNCBUSD-future</td>
      <td>2022-05-30 16:00:00.005000+00:00</td>
      <td>2023-06-08 08:00:00+00:00</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>442</th>
      <td>binance-ZILUSDT-future</td>
      <td>2020-06-17 08:00:00.007000+00:00</td>
      <td>2024-09-16 16:00:00+00:00</td>
    </tr>
    <tr>
      <th>443</th>
      <td>binance-ZILUSD_PERP-future</td>
      <td>2022-04-06 08:00:00.013000+00:00</td>
      <td>2022-12-26 08:00:00.014000+00:00</td>
    </tr>
    <tr>
      <th>444</th>
      <td>binance-ZKUSDT-future</td>
      <td>2024-06-17 12:00:00+00:00</td>
      <td>2024-09-16 20:00:00+00:00</td>
    </tr>
    <tr>
      <th>445</th>
      <td>binance-ZROUSDT-future</td>
      <td>2024-06-20 16:00:00+00:00</td>
      <td>2024-09-16 20:00:00+00:00</td>
    </tr>
    <tr>
      <th>446</th>
      <td>binance-ZRXUSDT-future</td>
      <td>2020-06-24 08:00:00+00:00</td>
      <td>2024-09-16 16:00:00+00:00</td>
    </tr>
  </tbody>
</table>
<p>447 rows × 3 columns</p>
</div>




```python
fr_markets = [
    'bitmex-XBTUSD-future',
    'bybit-BTCUSD-future',
    'okex-BTC-USD-SWAP-future'
]
```


```python
fr_raw = client.get_market_funding_rates(
    markets = fr_markets,
    start_time=datetime.utcnow() - timedelta(days=7),
).to_dataframe()
fr_raw
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
      <td>bitmex-XBTUSD-future</td>
      <td>2024-09-10 04:00:00+00:00</td>
      <td>2024-09-10 04:00:55.910555+00:00</td>
      <td>-0.000116</td>
      <td>08:00:00</td>
      <td>08:00:00</td>
    </tr>
    <tr>
      <th>1</th>
      <td>bitmex-XBTUSD-future</td>
      <td>2024-09-10 12:00:00+00:00</td>
      <td>2024-09-10 12:00:40.929397+00:00</td>
      <td>0.000037</td>
      <td>08:00:00</td>
      <td>08:00:00</td>
    </tr>
    <tr>
      <th>2</th>
      <td>bitmex-XBTUSD-future</td>
      <td>2024-09-10 20:00:00+00:00</td>
      <td>2024-09-10 20:00:01.451626+00:00</td>
      <td>0.000048</td>
      <td>08:00:00</td>
      <td>08:00:00</td>
    </tr>
    <tr>
      <th>3</th>
      <td>bitmex-XBTUSD-future</td>
      <td>2024-09-11 04:00:00+00:00</td>
      <td>2024-09-11 04:00:15.978545+00:00</td>
      <td>0.0001</td>
      <td>08:00:00</td>
      <td>08:00:00</td>
    </tr>
    <tr>
      <th>4</th>
      <td>bitmex-XBTUSD-future</td>
      <td>2024-09-11 12:00:00+00:00</td>
      <td>2024-09-11 12:00:04.727025+00:00</td>
      <td>0.0001</td>
      <td>08:00:00</td>
      <td>08:00:00</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>58</th>
      <td>okex-BTC-USD-SWAP-future</td>
      <td>2024-09-15 08:00:00+00:00</td>
      <td>2024-09-15 08:00:05.108766+00:00</td>
      <td>0.000062</td>
      <td>08:00:00</td>
      <td>08:00:00</td>
    </tr>
    <tr>
      <th>59</th>
      <td>okex-BTC-USD-SWAP-future</td>
      <td>2024-09-15 16:00:00+00:00</td>
      <td>2024-09-15 16:00:12.545520+00:00</td>
      <td>0.000061</td>
      <td>08:00:00</td>
      <td>08:00:00</td>
    </tr>
    <tr>
      <th>60</th>
      <td>okex-BTC-USD-SWAP-future</td>
      <td>2024-09-16 00:00:00+00:00</td>
      <td>2024-09-16 00:00:04.734967+00:00</td>
      <td>0.000046</td>
      <td>08:00:00</td>
      <td>08:00:00</td>
    </tr>
    <tr>
      <th>61</th>
      <td>okex-BTC-USD-SWAP-future</td>
      <td>2024-09-16 08:00:00+00:00</td>
      <td>2024-09-16 08:00:07.052638+00:00</td>
      <td>0.000013</td>
      <td>08:00:00</td>
      <td>08:00:00</td>
    </tr>
    <tr>
      <th>62</th>
      <td>okex-BTC-USD-SWAP-future</td>
      <td>2024-09-16 16:00:00+00:00</td>
      <td>2024-09-16 16:00:06.345528+00:00</td>
      <td>0.000011</td>
      <td>08:00:00</td>
      <td>08:00:00</td>
    </tr>
  </tbody>
</table>
<p>63 rows × 6 columns</p>
</div>




```python
# Convert 'time' to datetime for plotting, if not already in this format
fr_raw['time'] = pd.to_datetime(fr_raw['time'])
fr_raw = fr_raw.sort_values(by='time')
for column in fr_raw.columns:
    if column not in ['time', 'market']:
        fr_raw[column] = pd.to_numeric(fr_raw[column], errors='coerce') * 100
```


```python
# Create a color map
markets = fr_raw['market'].unique()
colors = plt.cm.jet(np.linspace(0, 1, len(markets)))  # Generating a color for each market
color_map = dict(zip(markets, colors))

# Plotting
plt.figure(figsize=(15, 6))
plt.gca().set_facecolor('white')
# Plot bars for each market
for market in markets:
    market_data = fr_raw[fr_raw['market'] == market]
    plt.bar(market_data['time'], market_data['rate'], color=color_map[market], label=market, width=0.07, alpha=0.9)

formatter = mticker.FuncFormatter(lambda y, _: '{:.4f}%'.format(y))
plt.gca().yaxis.set_major_formatter(formatter)
plt.grid(True, linestyle='--', which='major', color='gray', alpha=0.3)  
plt.xticks(rotation=45)
plt.xlabel('')
plt.ylabel('Funding Rate (%)')
plt.title('\nPerpetual Futures\n Funding Rates\n',fontsize=16)
plt.legend(loc='upper left', fontsize=10, bbox_to_anchor=(0.76,1.2), frameon=False)

plt.show()
```


    
![png](output_50_0.png)
    


## Aggregated Funding Rates

Coin Metrics also calculates several aggregated funding rate metrics.

**Aggregate Funding Rate** is the average funding rate weighted by open interest, published once per hour and representing the average funding rate converted to 8 hour, 1 day, 30 day, and 1 year time periods.
- **futures_aggregate_funding_rate_usd_margin_*:** metrics represent the average funding rate weighted by open interest from perpetual futures markets where the margin asset is U.S. dollars or stablecoins converted to a specified time period.
- **futures_aggregate_funding_rate_coin_margin_*:** represent the average funding rate weighted by open interest from perpetual futures markets where the margin asset is equivalent to the underlying base asset converted to a specified period.
- **futures_aggregate_funding_rate_all_margin_*:** represent the average funding rate weighted by open interest from all perpetual futures markets, regardless of the margin asset, converted to a specified time period.


```python
btc_fr = client.get_asset_metrics(
    assets='btc',
    start_time='2023-10-01',
    metrics = [
        'futures_aggregate_funding_rate_all_margin_1d_period',
        'futures_aggregate_funding_rate_all_margin_30d_period',
        'futures_aggregate_funding_rate_all_margin_1y_period'
        ]
).to_dataframe()
```


```python
btc_fr.head()
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
      <th>futures_aggregate_funding_rate_all_margin_1d_period</th>
      <th>futures_aggregate_funding_rate_all_margin_1y_period</th>
      <th>futures_aggregate_funding_rate_all_margin_30d_period</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>btc</td>
      <td>2023-10-01 00:00:00+00:00</td>
      <td>0.000101</td>
      <td>0.036712</td>
      <td>0.003017</td>
    </tr>
    <tr>
      <th>1</th>
      <td>btc</td>
      <td>2023-10-02 00:00:00+00:00</td>
      <td>0.000087</td>
      <td>0.031662</td>
      <td>0.002602</td>
    </tr>
    <tr>
      <th>2</th>
      <td>btc</td>
      <td>2023-10-03 00:00:00+00:00</td>
      <td>0.000086</td>
      <td>0.031306</td>
      <td>0.002573</td>
    </tr>
    <tr>
      <th>3</th>
      <td>btc</td>
      <td>2023-10-04 00:00:00+00:00</td>
      <td>0.000109</td>
      <td>0.039942</td>
      <td>0.003283</td>
    </tr>
    <tr>
      <th>4</th>
      <td>btc</td>
      <td>2023-10-05 00:00:00+00:00</td>
      <td>0.000071</td>
      <td>0.025923</td>
      <td>0.002131</td>
    </tr>
  </tbody>
</table>
</div>




```python
plt.figure(figsize=(14, 8))

plt.plot(btc_fr['time'], btc_fr['futures_aggregate_funding_rate_all_margin_1d_period'] * 100, label='1D Period', color='blue')
plt.plot(btc_fr['time'], btc_fr['futures_aggregate_funding_rate_all_margin_30d_period'] * 100, label='30D Period', color='green')
plt.plot(btc_fr['time'], btc_fr['futures_aggregate_funding_rate_all_margin_1y_period'] * 100, label='1Y Period', color='red')

plt.gca().set_facecolor('white')
plt.grid(color='gray', linestyle='dotted', alpha=0.3)

plt.title('Bitcoin Perpetual Futures\nAggregated Funding Rate\n', fontsize=16)
plt.xlabel('')
plt.ylabel('Aggregate\nFunding Rate\n', fontsize=14)
plt.grid(True, alpha=0.3, linestyle='--')

# Set the formatter for the Y-axis to display percentages
formatter = mticker.FuncFormatter(lambda y, _: '{:.0f}%'.format(y))
plt.gca().yaxis.set_major_formatter(formatter)

plt.gca().xaxis.set_major_locator(mdates.AutoDateLocator())
plt.gca().xaxis.set_major_formatter(mdates.ConciseDateFormatter(mdates.AutoDateLocator()))
plt.legend(loc='upper right', fontsize=10, ncol=1, framealpha=0, bbox_to_anchor=(0.99, 1.13))
plt.show()
```


    
![png](output_56_0.png)
    


###  Plotting a heatmap of BTC funding rates across exchanges


```python
btc_exch_fr_catalog = client.catalog_exchange_assets().to_dataframe()
btc_exch_fr_catalog = btc_exch_fr_catalog.loc[btc_exch_fr_catalog['metric']=='futures_aggregate_funding_rate_all_margin_1y_period']
btc_exch_fr_catalog = btc_exch_fr_catalog.loc[btc_exch_fr_catalog['frequency']=='1d']
btc_exch_fr_catalog = btc_exch_fr_catalog[btc_exch_fr_catalog['exchange_asset'].str.contains(r'-btc$', case=False)]
btc_exch_fr_catalog
```

    2024-09-16 16:42:29 WARNING  /catalog/ endpoints will be deprecated in the future. Consider using /catalog-v2/ and /reference-data/ endpoints instead.





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
      <th>metric</th>
      <th>frequency</th>
      <th>min_time</th>
      <th>max_time</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>4711</th>
      <td>binance-btc</td>
      <td>futures_aggregate_funding_rate_all_margin_1y_p...</td>
      <td>1d</td>
      <td>2020-07-27 18:00:00+00:00</td>
      <td>2024-09-16 21:00:00+00:00</td>
    </tr>
    <tr>
      <th>24034</th>
      <td>bitfinex-btc</td>
      <td>futures_aggregate_funding_rate_all_margin_1y_p...</td>
      <td>1d</td>
      <td>2020-12-02 09:00:00+00:00</td>
      <td>2024-09-16 21:00:00+00:00</td>
    </tr>
    <tr>
      <th>29530</th>
      <td>bitmex-btc</td>
      <td>futures_aggregate_funding_rate_all_margin_1y_p...</td>
      <td>1d</td>
      <td>2020-07-27 18:00:00+00:00</td>
      <td>2024-09-16 21:00:00+00:00</td>
    </tr>
    <tr>
      <th>41723</th>
      <td>bybit-btc</td>
      <td>futures_aggregate_funding_rate_all_margin_1y_p...</td>
      <td>1d</td>
      <td>2021-05-01 20:00:00+00:00</td>
      <td>2024-09-16 21:00:00+00:00</td>
    </tr>
    <tr>
      <th>66927</th>
      <td>deribit-btc</td>
      <td>futures_aggregate_funding_rate_all_margin_1y_p...</td>
      <td>1d</td>
      <td>2020-07-27 18:00:00+00:00</td>
      <td>2024-09-16 21:00:00+00:00</td>
    </tr>
    <tr>
      <th>69721</th>
      <td>ftx-btc</td>
      <td>futures_aggregate_funding_rate_all_margin_1y_p...</td>
      <td>1d</td>
      <td>2020-07-27 18:00:00+00:00</td>
      <td>2022-11-12 04:00:00+00:00</td>
    </tr>
    <tr>
      <th>88682</th>
      <td>huobi-btc</td>
      <td>futures_aggregate_funding_rate_all_margin_1y_p...</td>
      <td>1d</td>
      <td>2020-07-27 18:00:00+00:00</td>
      <td>2024-09-16 21:00:00+00:00</td>
    </tr>
    <tr>
      <th>105482</th>
      <td>kraken-btc</td>
      <td>futures_aggregate_funding_rate_all_margin_1y_p...</td>
      <td>1d</td>
      <td>2020-10-09 09:00:00+00:00</td>
      <td>2024-09-16 21:00:00+00:00</td>
    </tr>
    <tr>
      <th>126904</th>
      <td>okex-btc</td>
      <td>futures_aggregate_funding_rate_all_margin_1y_p...</td>
      <td>1d</td>
      <td>2020-10-30 09:00:00+00:00</td>
      <td>2024-09-16 21:00:00+00:00</td>
    </tr>
  </tbody>
</table>
</div>




```python
btc_fr_exchanges = client.get_exchange_asset_metrics(
    exchange_assets=btc_exch_fr_catalog['exchange_asset'].to_list(),
    start_time='2023-01-01',
    end_time='2023-12-31',
    metrics = 'futures_aggregate_funding_rate_all_margin_1y_period',
    frequency='1d'
).to_dataframe()
btc_fr_exchanges
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
      <th>futures_aggregate_funding_rate_all_margin_1y_period</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>binance-btc</td>
      <td>2023-01-01 00:00:00+00:00</td>
      <td>0.1095</td>
    </tr>
    <tr>
      <th>1</th>
      <td>binance-btc</td>
      <td>2023-01-02 00:00:00+00:00</td>
      <td>0.012148</td>
    </tr>
    <tr>
      <th>2</th>
      <td>binance-btc</td>
      <td>2023-01-03 00:00:00+00:00</td>
      <td>0.046845</td>
    </tr>
    <tr>
      <th>3</th>
      <td>binance-btc</td>
      <td>2023-01-04 00:00:00+00:00</td>
      <td>0.041311</td>
    </tr>
    <tr>
      <th>4</th>
      <td>binance-btc</td>
      <td>2023-01-05 00:00:00+00:00</td>
      <td>0.061746</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>2915</th>
      <td>okex-btc</td>
      <td>2023-12-27 00:00:00+00:00</td>
      <td>0.376005</td>
    </tr>
    <tr>
      <th>2916</th>
      <td>okex-btc</td>
      <td>2023-12-28 00:00:00+00:00</td>
      <td>0.254648</td>
    </tr>
    <tr>
      <th>2917</th>
      <td>okex-btc</td>
      <td>2023-12-29 00:00:00+00:00</td>
      <td>0.536332</td>
    </tr>
    <tr>
      <th>2918</th>
      <td>okex-btc</td>
      <td>2023-12-30 00:00:00+00:00</td>
      <td>0.455873</td>
    </tr>
    <tr>
      <th>2919</th>
      <td>okex-btc</td>
      <td>2023-12-31 00:00:00+00:00</td>
      <td>0.548358</td>
    </tr>
  </tbody>
</table>
<p>2920 rows × 3 columns</p>
</div>




```python
df = btc_fr_exchanges
pivot_df = df.pivot(index='exchange_asset', columns='time', values='futures_aggregate_funding_rate_all_margin_1y_period')
pivot_df = pivot_df.astype(float)
pivot_df
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
      <th>time</th>
      <th>2023-01-01 00:00:00+00:00</th>
      <th>2023-01-02 00:00:00+00:00</th>
      <th>2023-01-03 00:00:00+00:00</th>
      <th>2023-01-04 00:00:00+00:00</th>
      <th>2023-01-05 00:00:00+00:00</th>
      <th>2023-01-06 00:00:00+00:00</th>
      <th>2023-01-07 00:00:00+00:00</th>
      <th>2023-01-08 00:00:00+00:00</th>
      <th>2023-01-09 00:00:00+00:00</th>
      <th>2023-01-10 00:00:00+00:00</th>
      <th>...</th>
      <th>2023-12-22 00:00:00+00:00</th>
      <th>2023-12-23 00:00:00+00:00</th>
      <th>2023-12-24 00:00:00+00:00</th>
      <th>2023-12-25 00:00:00+00:00</th>
      <th>2023-12-26 00:00:00+00:00</th>
      <th>2023-12-27 00:00:00+00:00</th>
      <th>2023-12-28 00:00:00+00:00</th>
      <th>2023-12-29 00:00:00+00:00</th>
      <th>2023-12-30 00:00:00+00:00</th>
      <th>2023-12-31 00:00:00+00:00</th>
    </tr>
    <tr>
      <th>exchange_asset</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
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
      <th>binance-btc</th>
      <td>0.109500</td>
      <td>0.012148</td>
      <td>0.046845</td>
      <td>0.041311</td>
      <td>0.061746</td>
      <td>0.077517</td>
      <td>0.096432</td>
      <td>0.089722</td>
      <td>0.057266</td>
      <td>0.017031</td>
      <td>...</td>
      <td>0.281263</td>
      <td>0.206533</td>
      <td>0.154560</td>
      <td>0.195473</td>
      <td>0.425674</td>
      <td>0.383043</td>
      <td>0.379663</td>
      <td>0.549031</td>
      <td>0.457254</td>
      <td>0.387193</td>
    </tr>
    <tr>
      <th>bitfinex-btc</th>
      <td>0.240054</td>
      <td>0.382189</td>
      <td>0.211039</td>
      <td>0.229558</td>
      <td>0.074891</td>
      <td>0.131655</td>
      <td>0.131765</td>
      <td>0.160125</td>
      <td>0.113086</td>
      <td>0.129979</td>
      <td>...</td>
      <td>0.270820</td>
      <td>0.156269</td>
      <td>0.125486</td>
      <td>0.308607</td>
      <td>0.465474</td>
      <td>0.147093</td>
      <td>0.655639</td>
      <td>0.688972</td>
      <td>0.453521</td>
      <td>0.265981</td>
    </tr>
    <tr>
      <th>bitmex-btc</th>
      <td>0.109500</td>
      <td>-0.147477</td>
      <td>-0.027653</td>
      <td>-0.075540</td>
      <td>0.109140</td>
      <td>0.058906</td>
      <td>-0.078846</td>
      <td>0.109500</td>
      <td>0.109500</td>
      <td>0.109500</td>
      <td>...</td>
      <td>0.124057</td>
      <td>0.120385</td>
      <td>0.105715</td>
      <td>0.111534</td>
      <td>0.109102</td>
      <td>0.118988</td>
      <td>0.178754</td>
      <td>0.469497</td>
      <td>0.127023</td>
      <td>0.127770</td>
    </tr>
    <tr>
      <th>bybit-btc</th>
      <td>0.332716</td>
      <td>0.328811</td>
      <td>0.106620</td>
      <td>0.109500</td>
      <td>0.108059</td>
      <td>0.056104</td>
      <td>0.076392</td>
      <td>-0.001772</td>
      <td>0.090156</td>
      <td>-0.066673</td>
      <td>...</td>
      <td>0.109500</td>
      <td>0.109500</td>
      <td>0.109500</td>
      <td>0.109500</td>
      <td>0.109500</td>
      <td>0.109500</td>
      <td>0.109500</td>
      <td>0.109500</td>
      <td>0.109500</td>
      <td>0.109500</td>
    </tr>
    <tr>
      <th>deribit-btc</th>
      <td>0.004014</td>
      <td>-0.004356</td>
      <td>0.000194</td>
      <td>-0.000777</td>
      <td>-0.000004</td>
      <td>-0.003702</td>
      <td>-0.000003</td>
      <td>0.000411</td>
      <td>0.000128</td>
      <td>0.009021</td>
      <td>...</td>
      <td>0.162735</td>
      <td>0.222283</td>
      <td>0.009642</td>
      <td>0.074016</td>
      <td>0.344480</td>
      <td>0.472755</td>
      <td>0.558913</td>
      <td>0.589233</td>
      <td>0.398686</td>
      <td>0.509796</td>
    </tr>
    <tr>
      <th>huobi-btc</th>
      <td>0.109500</td>
      <td>0.099561</td>
      <td>0.109500</td>
      <td>0.109500</td>
      <td>-0.031955</td>
      <td>0.109500</td>
      <td>0.109500</td>
      <td>0.815508</td>
      <td>-0.012098</td>
      <td>0.062326</td>
      <td>...</td>
      <td>0.261585</td>
      <td>1.119745</td>
      <td>0.330376</td>
      <td>0.585262</td>
      <td>0.487209</td>
      <td>1.132452</td>
      <td>0.657258</td>
      <td>0.739781</td>
      <td>0.549361</td>
      <td>0.700592</td>
    </tr>
    <tr>
      <th>kraken-btc</th>
      <td>0.030208</td>
      <td>0.040457</td>
      <td>-0.095853</td>
      <td>-0.027047</td>
      <td>0.061041</td>
      <td>-0.130703</td>
      <td>-0.061580</td>
      <td>0.036233</td>
      <td>-0.006607</td>
      <td>0.217927</td>
      <td>...</td>
      <td>0.316554</td>
      <td>0.166807</td>
      <td>0.167266</td>
      <td>0.130185</td>
      <td>0.474480</td>
      <td>0.381600</td>
      <td>0.226822</td>
      <td>0.361264</td>
      <td>0.169106</td>
      <td>0.289377</td>
    </tr>
    <tr>
      <th>okex-btc</th>
      <td>0.209290</td>
      <td>0.191624</td>
      <td>-0.019627</td>
      <td>0.007415</td>
      <td>0.206787</td>
      <td>0.104460</td>
      <td>-0.038630</td>
      <td>0.124934</td>
      <td>0.025828</td>
      <td>0.020786</td>
      <td>...</td>
      <td>0.396916</td>
      <td>0.417243</td>
      <td>-0.002470</td>
      <td>0.271116</td>
      <td>0.250061</td>
      <td>0.376005</td>
      <td>0.254648</td>
      <td>0.536332</td>
      <td>0.455873</td>
      <td>0.548358</td>
    </tr>
  </tbody>
</table>
<p>8 rows × 365 columns</p>
</div>




```python
# Plotting the heatmap
plt.figure(figsize=(16, 8))
ax = sns.heatmap(pivot_df, cmap='viridis', annot=False)
plt.title('BTC Perp Futures\nAggregate Funding Rate (APR)\n', fontsize=14)

# Set x-ticks for monthly intervals
date_labels = [pd.to_datetime(label).strftime('%b %Y') for label in pivot_df.columns]
monthly_intervals = [i for i, label in enumerate(pivot_df.columns) if pd.to_datetime(label).day == 1]

ax.set_xticks(monthly_intervals)
ax.set_xticklabels([date_labels[i] for i in monthly_intervals], rotation=0)
ax.set_yticklabels(ax.get_yticklabels(), rotation=0)

# Formatting colorbar labels as percentages
colorbar = ax.collections[0].colorbar
colorbar.ax.yaxis.set_major_formatter(mticker.FuncFormatter(lambda x, _: f'{x:.0%}'))

plt.xlabel('')
plt.ylabel('')
plt.show()
```


    
![png](output_61_0.png)
    


## Cumulative Funding Rate

**Cumulative Funding Rate** is the cumulative average funding rate that would be accumulated by contract holders over a specified time period. Published once per hour, representing the cumulative realized funding rate over the previous 1 day, 7 day, and 30 day time periods.
- **futures_cumulative_funding_rate_usd_margin_*:** metrics represent the cumulative average funding rate weighted by open interest from futures markets where the margin asset is U.S. dollars or stablecoins over the previous specified time period.
- **futures_cumulative_funding_rate_coin_margin_*:** metrics represent the cumulative average funding rate weighted by open interest from futures markets where the margin asset is equivalent to the underlying base asset over the previous specified time period.
- **futures_cumulative_funding_rate_all_margin_*:** metrics represent the cumulative average funding rate weighted by open interest from all futures markets, regardless of the margin asset, over the previous specified time period.


```python
btc_cumulative_fr = client.get_asset_metrics(
    assets='btc',
    start_time='2023-01-01',
    end_time='2023-12-31',
    metrics = [
        'futures_cumulative_funding_rate_all_margin_rolling_1d',
        'futures_cumulative_funding_rate_all_margin_rolling_7d',
        'futures_cumulative_funding_rate_all_margin_rolling_30d'
        ]
).to_dataframe()
btc_cumulative_fr.head()
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
      <th>futures_cumulative_funding_rate_all_margin_rolling_1d</th>
      <th>futures_cumulative_funding_rate_all_margin_rolling_30d</th>
      <th>futures_cumulative_funding_rate_all_margin_rolling_7d</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>btc</td>
      <td>2023-01-01 00:00:00+00:00</td>
      <td>0.00041</td>
      <td>0.002146</td>
      <td>0.0015</td>
    </tr>
    <tr>
      <th>1</th>
      <td>btc</td>
      <td>2023-01-02 00:00:00+00:00</td>
      <td>0.000358</td>
      <td>0.002479</td>
      <td>0.001736</td>
    </tr>
    <tr>
      <th>2</th>
      <td>btc</td>
      <td>2023-01-03 00:00:00+00:00</td>
      <td>0.000128</td>
      <td>0.002587</td>
      <td>0.001735</td>
    </tr>
    <tr>
      <th>3</th>
      <td>btc</td>
      <td>2023-01-04 00:00:00+00:00</td>
      <td>0.000176</td>
      <td>0.002641</td>
      <td>0.001754</td>
    </tr>
    <tr>
      <th>4</th>
      <td>btc</td>
      <td>2023-01-05 00:00:00+00:00</td>
      <td>0.000194</td>
      <td>0.002957</td>
      <td>0.001745</td>
    </tr>
  </tbody>
</table>
</div>




```python
for column in btc_cumulative_fr.columns:
    if column != 'time':
        btc_cumulative_fr[column] = pd.to_numeric(btc_cumulative_fr[column], errors='coerce')
```


```python
# Convert the 'time' column to datetime format if it's not already
btc_cumulative_fr['time'] = pd.to_datetime(btc_cumulative_fr['time'], errors='coerce')

# Ensure 'futures_cumulative_funding_rate_all_margin_7d' is numeric, replacing non-numeric values with numpy.nan
btc_cumulative_fr['futures_cumulative_funding_rate_all_margin_7d'] = pd.to_numeric(btc_cumulative_fr['futures_cumulative_funding_rate_all_margin_rolling_7d'], errors='coerce')

# Plotting with safe checking
valid_7d_indices = ~btc_cumulative_fr['futures_cumulative_funding_rate_all_margin_rolling_7d'].isna()
valid_30d_indices = ~btc_cumulative_fr['futures_cumulative_funding_rate_all_margin_rolling_30d'].isna()

plt.plot(btc_cumulative_fr['time'], btc_cumulative_fr['futures_cumulative_funding_rate_all_margin_rolling_1d'] * 100, label='1D Period', color='blue')
plt.plot(btc_cumulative_fr['time'][valid_7d_indices], btc_cumulative_fr['futures_cumulative_funding_rate_all_margin_rolling_7d'][valid_7d_indices] * 100, label='7D Period', color='green')
plt.plot(btc_cumulative_fr['time'][valid_30d_indices], btc_cumulative_fr['futures_cumulative_funding_rate_all_margin_rolling_30d'][valid_30d_indices] * 100, label='30D Period', color='red')

plt.gca().set_facecolor('white')
plt.grid(color='gray', linestyle='dotted', alpha=0.3)

plt.title('Bitcoin Perpetual Futures\nCumulative Funding Rate\n', fontsize=16)
plt.xlabel('')
plt.ylabel('Cumulative\nFunding Rate\n', fontsize=14)
plt.grid(True, alpha=0.3, linestyle='--')

formatter = mticker.FuncFormatter(lambda y, _: '{:.2f}%'.format(y))
plt.gca().yaxis.set_major_formatter(formatter)
plt.gca().xaxis.set_major_locator(mdates.AutoDateLocator())
plt.gca().xaxis.set_major_formatter(mdates.ConciseDateFormatter(mdates.AutoDateLocator()))
plt.legend(loc='upper right', fontsize=10, ncol=1, framealpha=0, bbox_to_anchor=(0.99, 1.13))
plt.show()
```


    
![png](output_66_0.png)
    



```python

```


```python

```


```python

```
