<img src="https://5264302.fs1.hubspotusercontent-na1.net/hubfs/5264302/Demo%20Asset%20Resources/CM-Demo-options_exploration-Cover.png" width=1100 margin-left='auto' margin-right='auto'/>

Options contracts have become an increasingly liquid segment of crypytoasset derivatives. Coin Metrics currently offers options data through various endpoints in our Market Data Feed offering. Available endpoints include market greeks, implied volatility, contract prices, market quotes, open interest, and more. 

## Resources
This notebook demonstrates basic functionality offered by the Coin Metrics Python API Client and Market Data Feed.

Coin Metrics offers a vast assortment of data for hundreds of cryptoassets. The Python API Client allows for easy access to this data using Python without needing to create your own wrappers using `requests` and other such libraries.

To understand the data that Coin Metrics offers, feel free to peruse the resources below.

- The [Coin Metrics API v4](https://docs.coinmetrics.io/api/v4) website contains the full set of endpoints and data offered by Coin Metrics.
- The [Coin Metrics Product Documentation](https://docs.coinmetrics.io/info) gives detailed, conceptual explanations of the data that Coin Metrics offers.
- The [API Spec](https://coinmetrics.github.io/api-client-python/site/api_client.html) contains a full list of functions.

# Notebook Setup


```python
from os import environ
import pandas as pd
import numpy as np
import seaborn as sns
import logging
from datetime import date, timedelta
from coinmetrics.api_client import CoinMetricsClient
import logging
import calendar
from datetime import date
import matplotlib.ticker as mtick
import matplotlib.pyplot as plt
%matplotlib inline
```


```python
sns.set_theme()
sns.set(rc={'figure.figsize':(18,8)})
sns.set_palette("YlGn",3)
sns.set_style("ticks", {"xtick.major.size":20,"ytick.major.size":20})
sns.set_style("whitegrid",{'axes.grid' : True,'grid.linestyle': '--', 'grid.color': '#b0b0b0','axes.edgecolor': 'white',
              'font.family': ['Lato'],'axes.facecolor':'#4b5359'})
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

    2024-09-12 08:52:43 INFO     Using API key found in environment


# Query Examples
### Retrieving Market Greeks
---


```python
greeks_deribit = client.get_market_greeks(
    markets='deribit-BTC-30DEC22-*-option',
    limit_per_market=1
).to_dataframe()
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
      <td>deribit-BTC-30DEC22-10000-C-option</td>
      <td>2022-05-11 14:09:00+00:00</td>
      <td>2022-05-11 14:09:14.701194+00:00</td>
      <td>12.95354</td>
      <td>-2.40646</td>
      <td>58.03478</td>
      <td>0.97893</td>
      <td>0.0</td>
      <td>2022-05-11 14:09:13.336000+00:00</td>
    </tr>
    <tr>
      <th>1</th>
      <td>deribit-BTC-30DEC22-10000-P-option</td>
      <td>2022-05-11 14:09:00+00:00</td>
      <td>2022-05-11 14:09:14.701194+00:00</td>
      <td>12.95354</td>
      <td>-2.40646</td>
      <td>-5.73063</td>
      <td>-0.02107</td>
      <td>0.0</td>
      <td>2022-05-11 14:09:13.329000+00:00</td>
    </tr>
    <tr>
      <th>2</th>
      <td>deribit-BTC-30DEC22-100000-C-option</td>
      <td>2021-12-30 08:02:00+00:00</td>
      <td>2021-12-30 08:02:03.247339+00:00</td>
      <td>158.05411</td>
      <td>-14.17178</td>
      <td>86.78939</td>
      <td>0.24002</td>
      <td>0.00001</td>
      <td>2021-12-30 08:02:02.591000+00:00</td>
    </tr>
    <tr>
      <th>3</th>
      <td>deribit-BTC-30DEC22-100000-P-option</td>
      <td>2021-12-30 08:02:00+00:00</td>
      <td>2021-12-30 08:02:04.257489+00:00</td>
      <td>156.75983</td>
      <td>-13.9386</td>
      <td>-914.15583</td>
      <td>-0.76354</td>
      <td>0.00001</td>
      <td>2021-12-30 08:02:03.416000+00:00</td>
    </tr>
    <tr>
      <th>4</th>
      <td>deribit-BTC-30DEC22-11000-C-option</td>
      <td>2022-11-16 09:06:00+00:00</td>
      <td>2022-11-16 09:06:40.873351+00:00</td>
      <td>9.65147</td>
      <td>-11.41404</td>
      <td>10.99731</td>
      <td>0.90588</td>
      <td>0.00003</td>
      <td>2022-11-16 09:06:40.094000+00:00</td>
    </tr>
  </tbody>
</table>
</div>



### Retrieving Market Quotes
---


```python
quotes_deribit = client.get_market_quotes(
    markets='deribit-BTC-30DEC22-*-option',
    limit_per_market=1,
).to_dataframe()
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
      <td>deribit-BTC-30DEC22-10000-C-option</td>
      <td>2022-05-11 14:09:00+00:00</td>
      <td>1652278140000000-0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>1</th>
      <td>deribit-BTC-30DEC22-10000-P-option</td>
      <td>2022-05-11 14:09:00+00:00</td>
      <td>1652278140000000-0</td>
      <td>1.9</td>
      <td>0.012</td>
      <td>2.3</td>
      <td>0.01</td>
    </tr>
    <tr>
      <th>2</th>
      <td>deribit-BTC-30DEC22-100000-C-option</td>
      <td>2021-12-30 08:02:00+00:00</td>
      <td>1640851320000000-0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>2.5</td>
      <td>0.0185</td>
    </tr>
    <tr>
      <th>3</th>
      <td>deribit-BTC-30DEC22-100000-P-option</td>
      <td>2021-12-30 08:02:00+00:00</td>
      <td>1640851320000000-0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>4</th>
      <td>deribit-BTC-30DEC22-11000-C-option</td>
      <td>2022-11-16 09:06:00+00:00</td>
      <td>1668589560000000-0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
    </tr>
  </tbody>
</table>
</div>



### Retrieving Contract Prices
---


```python
prices_deribit = client.get_market_contract_prices(
    markets='deribit-BTC-30DEC22-*-option',
    limit_per_market=1,
).to_dataframe()
prices_deribit.head()
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
      <th>mark_price</th>
      <th>index_price</th>
      <th>exchange_time</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>deribit-BTC-30DEC22-10000-C-option</td>
      <td>2022-05-11 14:09:00+00:00</td>
      <td>2022-05-11 14:09:14.701194+00:00</td>
      <td>0.695</td>
      <td>31350.76</td>
      <td>2022-05-11 14:09:13.336000+00:00</td>
    </tr>
    <tr>
      <th>1</th>
      <td>deribit-BTC-30DEC22-10000-P-option</td>
      <td>2022-05-11 14:09:00+00:00</td>
      <td>2022-05-11 14:09:14.701194+00:00</td>
      <td>0.007</td>
      <td>31350.76</td>
      <td>2022-05-11 14:09:13.329000+00:00</td>
    </tr>
    <tr>
      <th>2</th>
      <td>deribit-BTC-30DEC22-100000-C-option</td>
      <td>2021-12-30 08:02:00+00:00</td>
      <td>2021-12-30 08:02:03.247339+00:00</td>
      <td>0.069329</td>
      <td>47033.61</td>
      <td>2021-12-30 08:02:02.591000+00:00</td>
    </tr>
    <tr>
      <th>3</th>
      <td>deribit-BTC-30DEC22-100000-P-option</td>
      <td>2021-12-30 08:02:00+00:00</td>
      <td>2021-12-30 08:02:04.257489+00:00</td>
      <td>1.034568</td>
      <td>47034.05</td>
      <td>2021-12-30 08:02:03.416000+00:00</td>
    </tr>
    <tr>
      <th>4</th>
      <td>deribit-BTC-30DEC22-11000-C-option</td>
      <td>2022-11-16 09:06:00+00:00</td>
      <td>2022-11-16 09:06:40.873351+00:00</td>
      <td>0.3547</td>
      <td>16744.61</td>
      <td>2022-11-16 09:06:40.094000+00:00</td>
    </tr>
  </tbody>
</table>
</div>



### Retrieving Open Interest
---


```python
oi_deribit = client.get_market_open_interest(
    markets='deribit-BTC-30DEC22-*-option',
    limit_per_market=1,
).to_dataframe()
oi_deribit.head()
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
      <td>deribit-BTC-30DEC22-10000-C-option</td>
      <td>2022-05-11 14:09:00+00:00</td>
      <td>0</td>
      <td>0</td>
      <td>2022-05-11 14:09:39.584165+00:00</td>
      <td>2022-05-11 14:09:00+00:00</td>
    </tr>
    <tr>
      <th>1</th>
      <td>deribit-BTC-30DEC22-10000-P-option</td>
      <td>2022-05-11 14:09:00+00:00</td>
      <td>0</td>
      <td>0</td>
      <td>2022-05-11 14:09:39.584165+00:00</td>
      <td>2022-05-11 14:09:00+00:00</td>
    </tr>
    <tr>
      <th>2</th>
      <td>deribit-BTC-30DEC22-100000-C-option</td>
      <td>2021-12-30 08:02:00+00:00</td>
      <td>0</td>
      <td>0</td>
      <td>2021-12-30 08:02:35.912527+00:00</td>
      <td>2021-12-30 08:02:00+00:00</td>
    </tr>
    <tr>
      <th>3</th>
      <td>deribit-BTC-30DEC22-100000-P-option</td>
      <td>2021-12-30 08:02:00+00:00</td>
      <td>0</td>
      <td>0</td>
      <td>2021-12-30 08:02:37.918026+00:00</td>
      <td>2021-12-30 08:02:00+00:00</td>
    </tr>
    <tr>
      <th>4</th>
      <td>deribit-BTC-30DEC22-11000-C-option</td>
      <td>2022-11-16 09:06:00+00:00</td>
      <td>0</td>
      <td>0</td>
      <td>2022-11-16 09:06:24.566250+00:00</td>
      <td>2022-11-16 09:06:00+00:00</td>
    </tr>
  </tbody>
</table>
</div>



# Plotting Options 'Volatility Smiles'
---
'Volatility smiles' are a popular options data visualization tool that help traders understand predicted asset volatility across various contract expiration dates. The 'smile' is plotted by mapping the strike price and implied volatility of a group of options with the same underlying asset and expiration date.


```python
asset = 'btc'
```

### Catalog Endpoint

The Coin Metrics API contains two types of catalog endpoints (Python client functions in paranthesis): the `catalog` (`catalog_*`) and `catalog-all` (`catalog_full_*`). The `catalog` endpoint displays the set of data available to your API key. The `catalog-all` endpoint displays the full set of data for CM Pro users.

Catalog objects return a list of dictionaries. For `catalog_full_market_implied_volatility_v2`, each element of the list is an option market that supports implied volatility data.


```python
markets_deribit = client.catalog_full_market_implied_volatility_v2(
    exchange='deribit',
    market_type='option',
    base=asset,
    page_size=10000
).to_dataframe()
```


```python
markets_deribit.sort_values(by='max_time')
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
      <th>39266</th>
      <td>deribit-BTC-2SEP21-51000-C-option</td>
      <td>2021-09-01 13:24:00+00:00</td>
      <td>2021-09-02 08:00:00+00:00</td>
    </tr>
    <tr>
      <th>39274</th>
      <td>deribit-BTC-2SEP21-56000-C-option</td>
      <td>2021-09-01 13:24:00+00:00</td>
      <td>2021-09-02 08:00:00+00:00</td>
    </tr>
    <tr>
      <th>39273</th>
      <td>deribit-BTC-2SEP21-54000-P-option</td>
      <td>2021-09-01 13:24:00+00:00</td>
      <td>2021-09-02 08:00:00+00:00</td>
    </tr>
    <tr>
      <th>39272</th>
      <td>deribit-BTC-2SEP21-54000-C-option</td>
      <td>2021-09-01 13:24:00+00:00</td>
      <td>2021-09-02 08:00:00+00:00</td>
    </tr>
    <tr>
      <th>39271</th>
      <td>deribit-BTC-2SEP21-53000-P-option</td>
      <td>2021-09-01 13:24:00+00:00</td>
      <td>2021-09-02 08:00:00+00:00</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>33024</th>
      <td>deribit-BTC-27JUN25-20000-C-option</td>
      <td>2024-06-27 08:06:00+00:00</td>
      <td>2024-09-12 13:05:00+00:00</td>
    </tr>
    <tr>
      <th>33025</th>
      <td>deribit-BTC-27JUN25-20000-P-option</td>
      <td>2024-06-27 08:06:00+00:00</td>
      <td>2024-09-12 13:05:00+00:00</td>
    </tr>
    <tr>
      <th>33026</th>
      <td>deribit-BTC-27JUN25-200000-C-option</td>
      <td>2024-06-27 14:10:00+00:00</td>
      <td>2024-09-12 13:05:00+00:00</td>
    </tr>
    <tr>
      <th>33028</th>
      <td>deribit-BTC-27JUN25-250000-C-option</td>
      <td>2024-07-22 11:58:00+00:00</td>
      <td>2024-09-12 13:05:00+00:00</td>
    </tr>
    <tr>
      <th>33793</th>
      <td>deribit-BTC-27SEP24-105000-P-option</td>
      <td>2023-11-09 02:26:00+00:00</td>
      <td>2024-09-12 13:05:00+00:00</td>
    </tr>
  </tbody>
</table>
<p>54924 rows × 3 columns</p>
</div>




```python
markets_deribit["min_time"] = pd.to_datetime(markets_deribit.min_time)
markets_deribit["max_time"] = pd.to_datetime(markets_deribit.max_time)
```


```python
# Select contracts that are still trading as of yesterday
end_date = (date.today() - timedelta(days=1)).strftime("%Y-%m-%d") 
deribit_current = markets_deribit.loc[(markets_deribit["max_time"] >= end_date)]
```

### Collect Contract Reference Data


```python
ref_data = client.reference_data_markets(
    exchange = 'deribit',
    type = 'option',
    base = asset,
    page_size=10000
).to_dataframe()
```


```python
ref_data.head()
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
      <th>exchange</th>
      <th>base</th>
      <th>quote</th>
      <th>pair</th>
      <th>symbol</th>
      <th>type</th>
      <th>size_asset</th>
      <th>margin_asset</th>
      <th>strike</th>
      <th>...</th>
      <th>order_amount_min</th>
      <th>order_amount_max</th>
      <th>order_price_increment</th>
      <th>order_price_min</th>
      <th>order_price_max</th>
      <th>order_size_min</th>
      <th>order_taker_fee</th>
      <th>order_maker_fee</th>
      <th>margin_trading_enabled</th>
      <th>experimental</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>deribit-BTC-10APR20-4750-C-option</td>
      <td>deribit</td>
      <td>btc</td>
      <td>usd</td>
      <td>btc-usd</td>
      <td>BTC-10APR20-4750-C</td>
      <td>option</td>
      <td>btc</td>
      <td>&lt;NA&gt;</td>
      <td>4750</td>
      <td>...</td>
      <td>0.1</td>
      <td>&lt;NA&gt;</td>
      <td>0.0005</td>
      <td>&lt;NA&gt;</td>
      <td>&lt;NA&gt;</td>
      <td>&lt;NA&gt;</td>
      <td>0.0004</td>
      <td>0.0004</td>
      <td>&lt;NA&gt;</td>
      <td>&lt;NA&gt;</td>
    </tr>
    <tr>
      <th>1</th>
      <td>deribit-BTC-10APR20-4750-P-option</td>
      <td>deribit</td>
      <td>btc</td>
      <td>usd</td>
      <td>btc-usd</td>
      <td>BTC-10APR20-4750-P</td>
      <td>option</td>
      <td>btc</td>
      <td>&lt;NA&gt;</td>
      <td>4750</td>
      <td>...</td>
      <td>0.1</td>
      <td>&lt;NA&gt;</td>
      <td>0.0005</td>
      <td>&lt;NA&gt;</td>
      <td>&lt;NA&gt;</td>
      <td>&lt;NA&gt;</td>
      <td>0.0004</td>
      <td>0.0004</td>
      <td>&lt;NA&gt;</td>
      <td>&lt;NA&gt;</td>
    </tr>
    <tr>
      <th>2</th>
      <td>deribit-BTC-10APR20-5000-C-option</td>
      <td>deribit</td>
      <td>btc</td>
      <td>usd</td>
      <td>btc-usd</td>
      <td>BTC-10APR20-5000-C</td>
      <td>option</td>
      <td>btc</td>
      <td>&lt;NA&gt;</td>
      <td>5000</td>
      <td>...</td>
      <td>0.1</td>
      <td>&lt;NA&gt;</td>
      <td>0.0005</td>
      <td>&lt;NA&gt;</td>
      <td>&lt;NA&gt;</td>
      <td>&lt;NA&gt;</td>
      <td>0.0004</td>
      <td>0.0004</td>
      <td>&lt;NA&gt;</td>
      <td>&lt;NA&gt;</td>
    </tr>
    <tr>
      <th>3</th>
      <td>deribit-BTC-10APR20-5000-P-option</td>
      <td>deribit</td>
      <td>btc</td>
      <td>usd</td>
      <td>btc-usd</td>
      <td>BTC-10APR20-5000-P</td>
      <td>option</td>
      <td>btc</td>
      <td>&lt;NA&gt;</td>
      <td>5000</td>
      <td>...</td>
      <td>0.1</td>
      <td>&lt;NA&gt;</td>
      <td>0.0005</td>
      <td>&lt;NA&gt;</td>
      <td>&lt;NA&gt;</td>
      <td>&lt;NA&gt;</td>
      <td>0.0004</td>
      <td>0.0004</td>
      <td>&lt;NA&gt;</td>
      <td>&lt;NA&gt;</td>
    </tr>
    <tr>
      <th>4</th>
      <td>deribit-BTC-10APR20-5250-P-option</td>
      <td>deribit</td>
      <td>btc</td>
      <td>usd</td>
      <td>btc-usd</td>
      <td>BTC-10APR20-5250-P</td>
      <td>option</td>
      <td>btc</td>
      <td>&lt;NA&gt;</td>
      <td>5250</td>
      <td>...</td>
      <td>0.1</td>
      <td>&lt;NA&gt;</td>
      <td>0.0005</td>
      <td>&lt;NA&gt;</td>
      <td>&lt;NA&gt;</td>
      <td>&lt;NA&gt;</td>
      <td>0.0004</td>
      <td>0.0004</td>
      <td>&lt;NA&gt;</td>
      <td>&lt;NA&gt;</td>
    </tr>
  </tbody>
</table>
<p>5 rows × 37 columns</p>
</div>




```python
deribit_current = pd.merge(deribit_current, ref_data[['market','expiration','option_contract_type','strike']], on='market', how='left')
```


```python
# Set max expiration date
max_expiry = (date.today() + timedelta(days=365)).strftime("%Y-%m-%d")
max_expiry = (pd.to_datetime(max_expiry)).strftime("%Y-%m-%d")
deribit_current = pd.DataFrame(deribit_current.loc[(deribit_current["expiration"] < max_expiry)])
```


```python
deribit_current = deribit_current.sort_values(by=['expiration'])
```


```python
deribit_current
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
      <th>expiration</th>
      <th>option_contract_type</th>
      <th>strike</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>deribit-BTC-11SEP24-48000-C-option</td>
      <td>2024-09-08 08:05:00+00:00</td>
      <td>2024-09-11 08:00:00+00:00</td>
      <td>2024-09-11T08:00:00.000000000Z</td>
      <td>call</td>
      <td>48000</td>
    </tr>
    <tr>
      <th>28</th>
      <td>deribit-BTC-11SEP24-56500-C-option</td>
      <td>2024-09-08 08:05:00+00:00</td>
      <td>2024-09-11 08:00:00+00:00</td>
      <td>2024-09-11T08:00:00.000000000Z</td>
      <td>call</td>
      <td>56500</td>
    </tr>
    <tr>
      <th>29</th>
      <td>deribit-BTC-11SEP24-56500-P-option</td>
      <td>2024-09-08 08:05:00+00:00</td>
      <td>2024-09-11 08:00:00+00:00</td>
      <td>2024-09-11T08:00:00.000000000Z</td>
      <td>put</td>
      <td>56500</td>
    </tr>
    <tr>
      <th>30</th>
      <td>deribit-BTC-11SEP24-57000-C-option</td>
      <td>2024-09-08 08:05:00+00:00</td>
      <td>2024-09-11 08:00:00+00:00</td>
      <td>2024-09-11T08:00:00.000000000Z</td>
      <td>call</td>
      <td>57000</td>
    </tr>
    <tr>
      <th>31</th>
      <td>deribit-BTC-11SEP24-57000-P-option</td>
      <td>2024-09-08 08:05:00+00:00</td>
      <td>2024-09-11 08:00:00+00:00</td>
      <td>2024-09-11T08:00:00.000000000Z</td>
      <td>put</td>
      <td>57000</td>
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
      <th>594</th>
      <td>deribit-BTC-27JUN25-200000-C-option</td>
      <td>2024-06-27 14:10:00+00:00</td>
      <td>2024-09-12 13:05:00+00:00</td>
      <td>2025-06-27T08:00:00.000000000Z</td>
      <td>call</td>
      <td>200000</td>
    </tr>
    <tr>
      <th>595</th>
      <td>deribit-BTC-27JUN25-200000-P-option</td>
      <td>2024-06-27 14:10:00+00:00</td>
      <td>2024-09-12 13:05:00+00:00</td>
      <td>2025-06-27T08:00:00.000000000Z</td>
      <td>put</td>
      <td>200000</td>
    </tr>
    <tr>
      <th>596</th>
      <td>deribit-BTC-27JUN25-250000-C-option</td>
      <td>2024-07-22 11:58:00+00:00</td>
      <td>2024-09-12 13:05:00+00:00</td>
      <td>2025-06-27T08:00:00.000000000Z</td>
      <td>call</td>
      <td>250000</td>
    </tr>
    <tr>
      <th>598</th>
      <td>deribit-BTC-27JUN25-30000-C-option</td>
      <td>2024-06-27 08:06:00+00:00</td>
      <td>2024-09-12 13:05:00+00:00</td>
      <td>2025-06-27T08:00:00.000000000Z</td>
      <td>call</td>
      <td>30000</td>
    </tr>
    <tr>
      <th>622</th>
      <td>deribit-BTC-27JUN25-90000-C-option</td>
      <td>2024-06-27 08:06:00+00:00</td>
      <td>2024-09-12 13:05:00+00:00</td>
      <td>2025-06-27T08:00:00.000000000Z</td>
      <td>call</td>
      <td>90000</td>
    </tr>
  </tbody>
</table>
<p>986 rows × 6 columns</p>
</div>



## Retrieve Implied Volatility


```python
iv_asset_contracts = client.get_market_implied_volatility(
    markets='deribit-*-option',
    start_time = end_date,
    limit_per_market=1,
    page_size=10000
).to_dataframe()
```


```python
iv_asset_contracts = iv_asset_contracts.loc[iv_asset_contracts['market'].isin(deribit_current['market'].to_list())]
iv_asset_contracts
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
      <td>deribit-BTC-11SEP24-48000-C-option</td>
      <td>2024-09-11 00:00:00+00:00</td>
      <td>2024-09-11 00:00:02.798450+00:00</td>
      <td>0.0</td>
      <td>3.5275</td>
      <td>1.1414</td>
      <td>2024-09-11 00:00:00.990000+00:00</td>
    </tr>
    <tr>
      <th>1</th>
      <td>deribit-BTC-11SEP24-48000-P-option</td>
      <td>2024-09-11 00:00:00+00:00</td>
      <td>2024-09-11 00:00:04.120775+00:00</td>
      <td>0.0</td>
      <td>2.3432</td>
      <td>1.1414</td>
      <td>2024-09-11 00:00:03.003000+00:00</td>
    </tr>
    <tr>
      <th>2</th>
      <td>deribit-BTC-11SEP24-49000-C-option</td>
      <td>2024-09-11 00:00:00+00:00</td>
      <td>2024-09-11 00:00:12.131328+00:00</td>
      <td>0.0</td>
      <td>3.2405</td>
      <td>1.1413</td>
      <td>2024-09-11 00:00:10.053000+00:00</td>
    </tr>
    <tr>
      <th>3</th>
      <td>deribit-BTC-11SEP24-49000-P-option</td>
      <td>2024-09-11 00:00:00+00:00</td>
      <td>2024-09-11 00:00:06.796683+00:00</td>
      <td>0.0</td>
      <td>2.1052</td>
      <td>1.1413</td>
      <td>2024-09-11 00:00:06.024000+00:00</td>
    </tr>
    <tr>
      <th>4</th>
      <td>deribit-BTC-11SEP24-50000-C-option</td>
      <td>2024-09-11 00:00:00+00:00</td>
      <td>2024-09-11 00:00:02.798450+00:00</td>
      <td>0.0</td>
      <td>2.7594</td>
      <td>1.1413</td>
      <td>2024-09-11 00:00:00.990000+00:00</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>981</th>
      <td>deribit-BTC-8NOV24-75000-P-option</td>
      <td>2024-09-11 00:00:00+00:00</td>
      <td>2024-09-11 00:00:22.852002+00:00</td>
      <td>0.6045</td>
      <td>0.7507</td>
      <td>0.649</td>
      <td>2024-09-11 00:00:21.130000+00:00</td>
    </tr>
    <tr>
      <th>982</th>
      <td>deribit-BTC-8NOV24-80000-C-option</td>
      <td>2024-09-11 00:00:00+00:00</td>
      <td>2024-09-11 00:00:10.130485+00:00</td>
      <td>0.6609</td>
      <td>0.6718</td>
      <td>0.6668</td>
      <td>2024-09-11 00:00:08.038000+00:00</td>
    </tr>
    <tr>
      <th>983</th>
      <td>deribit-BTC-8NOV24-80000-P-option</td>
      <td>2024-09-11 00:00:00+00:00</td>
      <td>2024-09-11 00:00:03.795897+00:00</td>
      <td>0.6051</td>
      <td>0.7862</td>
      <td>0.6668</td>
      <td>2024-09-11 00:00:00.990000+00:00</td>
    </tr>
    <tr>
      <th>984</th>
      <td>deribit-BTC-8NOV24-90000-C-option</td>
      <td>2024-09-11 00:00:00+00:00</td>
      <td>2024-09-11 00:00:16.136093+00:00</td>
      <td>0.6987</td>
      <td>0.7152</td>
      <td>0.7075</td>
      <td>2024-09-11 00:00:14.082000+00:00</td>
    </tr>
    <tr>
      <th>985</th>
      <td>deribit-BTC-8NOV24-90000-P-option</td>
      <td>2024-09-11 00:00:00+00:00</td>
      <td>2024-09-11 00:00:08.797861+00:00</td>
      <td>0.5958</td>
      <td>0.8937</td>
      <td>0.7075</td>
      <td>2024-09-11 00:00:07.032000+00:00</td>
    </tr>
  </tbody>
</table>
<p>986 rows × 7 columns</p>
</div>




```python
iv_only = iv_asset_contracts.drop(['time', 'database_time','iv_bid','iv_ask','exchange_time'], axis=1).drop_duplicates()
iv_only
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
      <th>iv_mark</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>deribit-BTC-11SEP24-48000-C-option</td>
      <td>1.1414</td>
    </tr>
    <tr>
      <th>1</th>
      <td>deribit-BTC-11SEP24-48000-P-option</td>
      <td>1.1414</td>
    </tr>
    <tr>
      <th>2</th>
      <td>deribit-BTC-11SEP24-49000-C-option</td>
      <td>1.1413</td>
    </tr>
    <tr>
      <th>3</th>
      <td>deribit-BTC-11SEP24-49000-P-option</td>
      <td>1.1413</td>
    </tr>
    <tr>
      <th>4</th>
      <td>deribit-BTC-11SEP24-50000-C-option</td>
      <td>1.1413</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>981</th>
      <td>deribit-BTC-8NOV24-75000-P-option</td>
      <td>0.649</td>
    </tr>
    <tr>
      <th>982</th>
      <td>deribit-BTC-8NOV24-80000-C-option</td>
      <td>0.6668</td>
    </tr>
    <tr>
      <th>983</th>
      <td>deribit-BTC-8NOV24-80000-P-option</td>
      <td>0.6668</td>
    </tr>
    <tr>
      <th>984</th>
      <td>deribit-BTC-8NOV24-90000-C-option</td>
      <td>0.7075</td>
    </tr>
    <tr>
      <th>985</th>
      <td>deribit-BTC-8NOV24-90000-P-option</td>
      <td>0.7075</td>
    </tr>
  </tbody>
</table>
<p>986 rows × 2 columns</p>
</div>




```python
merged = pd.merge(deribit_current, iv_only, on="market").drop_duplicates()
```


```python
calls = pd.DataFrame(merged.loc[merged['option_contract_type'] == 'call'])
```


```python
calls['expiration'] = pd.to_datetime(calls['expiration']).dt.strftime('%b %d, %Y')
calls = calls.dropna(subset=['strike'])
calls['strike'] = calls['strike'].astype('int64')
calls['iv_mark'] = calls['iv_mark'].astype('float64')
calls['expiration'] = calls['expiration'].astype('category')
calls = calls.dropna(subset=['strike', 'iv_mark'])
calls = calls[np.isfinite(calls['strike']) & np.isfinite(calls['iv_mark'])]
calls
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
      <th>expiration</th>
      <th>option_contract_type</th>
      <th>strike</th>
      <th>iv_mark</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>deribit-BTC-11SEP24-48000-C-option</td>
      <td>2024-09-08 08:05:00+00:00</td>
      <td>2024-09-11 08:00:00+00:00</td>
      <td>Sep 11, 2024</td>
      <td>call</td>
      <td>48000</td>
      <td>1.1414</td>
    </tr>
    <tr>
      <th>1</th>
      <td>deribit-BTC-11SEP24-56500-C-option</td>
      <td>2024-09-08 08:05:00+00:00</td>
      <td>2024-09-11 08:00:00+00:00</td>
      <td>Sep 11, 2024</td>
      <td>call</td>
      <td>56500</td>
      <td>0.7326</td>
    </tr>
    <tr>
      <th>3</th>
      <td>deribit-BTC-11SEP24-57000-C-option</td>
      <td>2024-09-08 08:05:00+00:00</td>
      <td>2024-09-11 08:00:00+00:00</td>
      <td>Sep 11, 2024</td>
      <td>call</td>
      <td>57000</td>
      <td>0.7153</td>
    </tr>
    <tr>
      <th>5</th>
      <td>deribit-BTC-11SEP24-57500-C-option</td>
      <td>2024-09-08 08:05:00+00:00</td>
      <td>2024-09-11 08:00:00+00:00</td>
      <td>Sep 11, 2024</td>
      <td>call</td>
      <td>57500</td>
      <td>0.7153</td>
    </tr>
    <tr>
      <th>7</th>
      <td>deribit-BTC-11SEP24-58000-C-option</td>
      <td>2024-09-08 08:05:00+00:00</td>
      <td>2024-09-11 08:00:00+00:00</td>
      <td>Sep 11, 2024</td>
      <td>call</td>
      <td>58000</td>
      <td>0.7038</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>979</th>
      <td>deribit-BTC-27JUN25-20000-C-option</td>
      <td>2024-06-27 08:06:00+00:00</td>
      <td>2024-09-12 13:05:00+00:00</td>
      <td>Jun 27, 2025</td>
      <td>call</td>
      <td>20000</td>
      <td>0.7327</td>
    </tr>
    <tr>
      <th>981</th>
      <td>deribit-BTC-27JUN25-200000-C-option</td>
      <td>2024-06-27 14:10:00+00:00</td>
      <td>2024-09-12 13:05:00+00:00</td>
      <td>Jun 27, 2025</td>
      <td>call</td>
      <td>200000</td>
      <td>0.7796</td>
    </tr>
    <tr>
      <th>983</th>
      <td>deribit-BTC-27JUN25-250000-C-option</td>
      <td>2024-07-22 11:58:00+00:00</td>
      <td>2024-09-12 13:05:00+00:00</td>
      <td>Jun 27, 2025</td>
      <td>call</td>
      <td>250000</td>
      <td>0.8076</td>
    </tr>
    <tr>
      <th>984</th>
      <td>deribit-BTC-27JUN25-30000-C-option</td>
      <td>2024-06-27 08:06:00+00:00</td>
      <td>2024-09-12 13:05:00+00:00</td>
      <td>Jun 27, 2025</td>
      <td>call</td>
      <td>30000</td>
      <td>0.6875</td>
    </tr>
    <tr>
      <th>985</th>
      <td>deribit-BTC-27JUN25-90000-C-option</td>
      <td>2024-06-27 08:06:00+00:00</td>
      <td>2024-09-12 13:05:00+00:00</td>
      <td>Jun 27, 2025</td>
      <td>call</td>
      <td>90000</td>
      <td>0.6820</td>
    </tr>
  </tbody>
</table>
<p>493 rows × 7 columns</p>
</div>




```python
calls = calls.sort_values(by='expiration')
```


```python
calls.dtypes
```




    market                       string[python]
    min_time                datetime64[ns, UTC]
    max_time                datetime64[ns, UTC]
    expiration                         category
    option_contract_type         string[python]
    strike                                int64
    iv_mark                             float64
    dtype: object




```python
l = sns.lineplot(data=calls, x="strike", y="iv_mark", hue='expiration')
l.set_xlabel("\nStrike Price", fontsize = 17)
l.set_ylabel("Implied Volatility \n", fontsize = 17)
l.set_xlim([0, calls['strike'].max()])

l.set_xticks(l.get_xticks().tolist())
l.set_xticklabels(['${:,.0f}'.format(x) for x in l.get_xticks().tolist()],fontsize=14)
l.set_yticks(l.get_yticks().tolist())
l.set_yticklabels(['{:.2f}'.format(y) for y in l.get_yticks().tolist()],fontsize=14)
plt.setp(l.get_yticklabels()[0], visible=False)    
leg = plt.legend(loc='upper right',ncol=2,fontsize=13.5)
for text in leg.get_texts():
    text.set_color("white")
l.set_title('\n' + asset.upper() + ' Volatility Smiles\n', fontsize = 25)
plt.suptitle('\n\n         Deribit Options by Expiration',fontsize=16);
```

    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:30 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:31 WARNING  findfont: Font family 'Lato' not found.



    
![png](output_39_402.png)
    


# Plotting Calls vs. Puts by Open Interest


```python
options_oi = client.get_market_open_interest(
    markets='deribit-*-option',
    limit_per_market=1,
    paging_from='end',
    start_time=end_date,
    page_size=10000
).to_dataframe()
```


```python
options_oi['value_usd'] = pd.to_numeric(options_oi['value_usd'])
options_oi = options_oi.loc[options_oi['value_usd'] > 0]
```


```python
options_oi = options_oi.sort_values('value_usd',ascending=False)
```


```python
oi_only = options_oi[['market','contract_count','value_usd']]
```


```python
oi_only
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
      <th>contract_count</th>
      <th>value_usd</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2590</th>
      <td>deribit-XRP_USDC-27SEP24-1-C-option</td>
      <td>7376000.0</td>
      <td>4196206400.0</td>
    </tr>
    <tr>
      <th>2540</th>
      <td>deribit-XRP_USDC-25OCT24-0d8-C-option</td>
      <td>3849000.0</td>
      <td>2190081000.0</td>
    </tr>
    <tr>
      <th>2588</th>
      <td>deribit-XRP_USDC-27SEP24-0d9-C-option</td>
      <td>3069000.0</td>
      <td>1746261000.0</td>
    </tr>
    <tr>
      <th>2586</th>
      <td>deribit-XRP_USDC-27SEP24-0d85-C-option</td>
      <td>1753000.0</td>
      <td>997457000.0</td>
    </tr>
    <tr>
      <th>2584</th>
      <td>deribit-XRP_USDC-27SEP24-0d8-C-option</td>
      <td>1737000.0</td>
      <td>988526700.0</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>1450</th>
      <td>deribit-ETH-27JUN25-1000-C-option</td>
      <td>1.0</td>
      <td>2338.55</td>
    </tr>
    <tr>
      <th>1713</th>
      <td>deribit-ETH-29NOV24-2700-P-option</td>
      <td>1.0</td>
      <td>2338.55</td>
    </tr>
    <tr>
      <th>1250</th>
      <td>deribit-ETH-20SEP24-2150-C-option</td>
      <td>1.0</td>
      <td>2338.42</td>
    </tr>
    <tr>
      <th>1242</th>
      <td>deribit-ETH-20SEP24-1800-C-option</td>
      <td>1.0</td>
      <td>2338.42</td>
    </tr>
    <tr>
      <th>1717</th>
      <td>deribit-ETH-29NOV24-2900-P-option</td>
      <td>1.0</td>
      <td>2337.84</td>
    </tr>
  </tbody>
</table>
<p>1958 rows × 3 columns</p>
</div>




```python
asset_deribit_oi = deribit_current[['market','expiration','strike','option_contract_type']]
```


```python
oi_merged = pd.merge(asset_deribit_oi, oi_only, on="market").drop_duplicates()
```


```python
oi_merged
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
      <th>expiration</th>
      <th>strike</th>
      <th>option_contract_type</th>
      <th>contract_count</th>
      <th>value_usd</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>deribit-BTC-11SEP24-48000-C-option</td>
      <td>2024-09-11T08:00:00.000000000Z</td>
      <td>48000</td>
      <td>call</td>
      <td>0.2</td>
      <td>11326.79</td>
    </tr>
    <tr>
      <th>1</th>
      <td>deribit-BTC-11SEP24-56500-C-option</td>
      <td>2024-09-11T08:00:00.000000000Z</td>
      <td>56500</td>
      <td>call</td>
      <td>162.0</td>
      <td>9174695.04</td>
    </tr>
    <tr>
      <th>2</th>
      <td>deribit-BTC-11SEP24-56500-P-option</td>
      <td>2024-09-11T08:00:00.000000000Z</td>
      <td>56500</td>
      <td>put</td>
      <td>78.0</td>
      <td>4417459.8</td>
    </tr>
    <tr>
      <th>3</th>
      <td>deribit-BTC-11SEP24-57000-C-option</td>
      <td>2024-09-11T08:00:00.000000000Z</td>
      <td>57000</td>
      <td>call</td>
      <td>226.4</td>
      <td>12821942.128</td>
    </tr>
    <tr>
      <th>4</th>
      <td>deribit-BTC-11SEP24-57000-P-option</td>
      <td>2024-09-11T08:00:00.000000000Z</td>
      <td>57000</td>
      <td>put</td>
      <td>188.8</td>
      <td>10692485.984</td>
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
      <th>865</th>
      <td>deribit-BTC-27JUN25-20000-P-option</td>
      <td>2025-06-27T08:00:00.000000000Z</td>
      <td>20000</td>
      <td>put</td>
      <td>103.7</td>
      <td>5961696.408</td>
    </tr>
    <tr>
      <th>866</th>
      <td>deribit-BTC-27JUN25-200000-C-option</td>
      <td>2025-06-27T08:00:00.000000000Z</td>
      <td>200000</td>
      <td>call</td>
      <td>497.2</td>
      <td>28553266.236</td>
    </tr>
    <tr>
      <th>867</th>
      <td>deribit-BTC-27JUN25-250000-C-option</td>
      <td>2025-06-27T08:00:00.000000000Z</td>
      <td>250000</td>
      <td>call</td>
      <td>101.2</td>
      <td>5817971.808</td>
    </tr>
    <tr>
      <th>868</th>
      <td>deribit-BTC-27JUN25-30000-C-option</td>
      <td>2025-06-27T08:00:00.000000000Z</td>
      <td>30000</td>
      <td>call</td>
      <td>9.9</td>
      <td>569448.594</td>
    </tr>
    <tr>
      <th>869</th>
      <td>deribit-BTC-27JUN25-90000-C-option</td>
      <td>2025-06-27T08:00:00.000000000Z</td>
      <td>90000</td>
      <td>call</td>
      <td>124.9</td>
      <td>7179644.186</td>
    </tr>
  </tbody>
</table>
<p>870 rows × 6 columns</p>
</div>




```python
oi_merged.expiration = pd.to_datetime(oi_merged.expiration).dt.strftime('%b %d, %Y')
oi_merged
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
      <th>expiration</th>
      <th>strike</th>
      <th>option_contract_type</th>
      <th>contract_count</th>
      <th>value_usd</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>deribit-BTC-11SEP24-48000-C-option</td>
      <td>Sep 11, 2024</td>
      <td>48000</td>
      <td>call</td>
      <td>0.2</td>
      <td>11326.79</td>
    </tr>
    <tr>
      <th>1</th>
      <td>deribit-BTC-11SEP24-56500-C-option</td>
      <td>Sep 11, 2024</td>
      <td>56500</td>
      <td>call</td>
      <td>162.0</td>
      <td>9174695.04</td>
    </tr>
    <tr>
      <th>2</th>
      <td>deribit-BTC-11SEP24-56500-P-option</td>
      <td>Sep 11, 2024</td>
      <td>56500</td>
      <td>put</td>
      <td>78.0</td>
      <td>4417459.8</td>
    </tr>
    <tr>
      <th>3</th>
      <td>deribit-BTC-11SEP24-57000-C-option</td>
      <td>Sep 11, 2024</td>
      <td>57000</td>
      <td>call</td>
      <td>226.4</td>
      <td>12821942.128</td>
    </tr>
    <tr>
      <th>4</th>
      <td>deribit-BTC-11SEP24-57000-P-option</td>
      <td>Sep 11, 2024</td>
      <td>57000</td>
      <td>put</td>
      <td>188.8</td>
      <td>10692485.984</td>
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
      <th>865</th>
      <td>deribit-BTC-27JUN25-20000-P-option</td>
      <td>Jun 27, 2025</td>
      <td>20000</td>
      <td>put</td>
      <td>103.7</td>
      <td>5961696.408</td>
    </tr>
    <tr>
      <th>866</th>
      <td>deribit-BTC-27JUN25-200000-C-option</td>
      <td>Jun 27, 2025</td>
      <td>200000</td>
      <td>call</td>
      <td>497.2</td>
      <td>28553266.236</td>
    </tr>
    <tr>
      <th>867</th>
      <td>deribit-BTC-27JUN25-250000-C-option</td>
      <td>Jun 27, 2025</td>
      <td>250000</td>
      <td>call</td>
      <td>101.2</td>
      <td>5817971.808</td>
    </tr>
    <tr>
      <th>868</th>
      <td>deribit-BTC-27JUN25-30000-C-option</td>
      <td>Jun 27, 2025</td>
      <td>30000</td>
      <td>call</td>
      <td>9.9</td>
      <td>569448.594</td>
    </tr>
    <tr>
      <th>869</th>
      <td>deribit-BTC-27JUN25-90000-C-option</td>
      <td>Jun 27, 2025</td>
      <td>90000</td>
      <td>call</td>
      <td>124.9</td>
      <td>7179644.186</td>
    </tr>
  </tbody>
</table>
<p>870 rows × 6 columns</p>
</div>




```python
oi_merged_sum = oi_merged.groupby(
        ['expiration', 'option_contract_type']).value_usd.sum().reset_index()
```


```python
oi_merged_sum
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
      <th>expiration</th>
      <th>option_contract_type</th>
      <th>value_usd</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>Dec 27, 2024</td>
      <td>call</td>
      <td>3199442527.608</td>
    </tr>
    <tr>
      <th>1</th>
      <td>Dec 27, 2024</td>
      <td>put</td>
      <td>1122357017.952</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Jun 27, 2025</td>
      <td>call</td>
      <td>185273228.508</td>
    </tr>
    <tr>
      <th>3</th>
      <td>Jun 27, 2025</td>
      <td>put</td>
      <td>61556628.982</td>
    </tr>
    <tr>
      <th>4</th>
      <td>Mar 28, 2025</td>
      <td>call</td>
      <td>1071269902.409</td>
    </tr>
    <tr>
      <th>5</th>
      <td>Mar 28, 2025</td>
      <td>put</td>
      <td>148561155.599</td>
    </tr>
    <tr>
      <th>6</th>
      <td>Nov 08, 2024</td>
      <td>call</td>
      <td>361483324.797</td>
    </tr>
    <tr>
      <th>7</th>
      <td>Nov 08, 2024</td>
      <td>put</td>
      <td>241145760.561</td>
    </tr>
    <tr>
      <th>8</th>
      <td>Nov 29, 2024</td>
      <td>call</td>
      <td>177720587.474</td>
    </tr>
    <tr>
      <th>9</th>
      <td>Nov 29, 2024</td>
      <td>put</td>
      <td>255061345.279</td>
    </tr>
    <tr>
      <th>10</th>
      <td>Oct 04, 2024</td>
      <td>call</td>
      <td>4834909.783</td>
    </tr>
    <tr>
      <th>11</th>
      <td>Oct 04, 2024</td>
      <td>put</td>
      <td>4956171.593</td>
    </tr>
    <tr>
      <th>12</th>
      <td>Oct 25, 2024</td>
      <td>call</td>
      <td>1117269811.708</td>
    </tr>
    <tr>
      <th>13</th>
      <td>Oct 25, 2024</td>
      <td>put</td>
      <td>622225343.206</td>
    </tr>
    <tr>
      <th>14</th>
      <td>Sep 11, 2024</td>
      <td>call</td>
      <td>118648120.348</td>
    </tr>
    <tr>
      <th>15</th>
      <td>Sep 11, 2024</td>
      <td>put</td>
      <td>68934878.937</td>
    </tr>
    <tr>
      <th>16</th>
      <td>Sep 12, 2024</td>
      <td>call</td>
      <td>59402046.508</td>
    </tr>
    <tr>
      <th>17</th>
      <td>Sep 12, 2024</td>
      <td>put</td>
      <td>59465930.256</td>
    </tr>
    <tr>
      <th>18</th>
      <td>Sep 13, 2024</td>
      <td>call</td>
      <td>720042127.531</td>
    </tr>
    <tr>
      <th>19</th>
      <td>Sep 13, 2024</td>
      <td>put</td>
      <td>607151546.634</td>
    </tr>
    <tr>
      <th>20</th>
      <td>Sep 14, 2024</td>
      <td>call</td>
      <td>36101398.761</td>
    </tr>
    <tr>
      <th>21</th>
      <td>Sep 14, 2024</td>
      <td>put</td>
      <td>21246061.244</td>
    </tr>
    <tr>
      <th>22</th>
      <td>Sep 15, 2024</td>
      <td>call</td>
      <td>5273028.319</td>
    </tr>
    <tr>
      <th>23</th>
      <td>Sep 15, 2024</td>
      <td>put</td>
      <td>6256926.83</td>
    </tr>
    <tr>
      <th>24</th>
      <td>Sep 20, 2024</td>
      <td>call</td>
      <td>447717378.271</td>
    </tr>
    <tr>
      <th>25</th>
      <td>Sep 20, 2024</td>
      <td>put</td>
      <td>289874278.739</td>
    </tr>
    <tr>
      <th>26</th>
      <td>Sep 27, 2024</td>
      <td>call</td>
      <td>2988249196.738</td>
    </tr>
    <tr>
      <th>27</th>
      <td>Sep 27, 2024</td>
      <td>put</td>
      <td>1832919611.477</td>
    </tr>
  </tbody>
</table>
</div>




```python
calls_oi = pd.DataFrame(oi_merged_sum.loc[oi_merged_sum['option_contract_type'] == 'call'])
puts_oi = pd.DataFrame(oi_merged_sum.loc[oi_merged_sum['option_contract_type'] == 'put'])
```


```python
# Convert 'expiration' to datetime and extract month
calls_oi['expiration'] = pd.to_datetime(calls_oi['expiration'])
calls_oi['Expiration Month'] = calls_oi['expiration'].dt.month

puts_oi['expiration'] = pd.to_datetime(puts_oi['expiration'])
puts_oi['Expiration Month'] = puts_oi['expiration'].dt.month

# Group by 'expiration_month' and sum 'value_usd'
calls_oi_grouped = calls_oi.groupby('Expiration Month')['value_usd'].sum()
puts_oi_grouped = puts_oi.groupby('Expiration Month')['value_usd'].sum()

# Convert Series to DataFrame and reset index
calls_oi_df = calls_oi_grouped.reset_index()
puts_oi_df = puts_oi_grouped.reset_index()

# Replace month numbers with month names
calls_oi_df['Expiration Month'] = calls_oi_df['Expiration Month'].apply(lambda x: calendar.month_name[x])
puts_oi_df['Expiration Month'] = puts_oi_df['Expiration Month'].apply(lambda x: calendar.month_name[x])
```


```python
calls_oi_df
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
      <th>Expiration Month</th>
      <th>value_usd</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>March</td>
      <td>1071269902.409</td>
    </tr>
    <tr>
      <th>1</th>
      <td>June</td>
      <td>185273228.508</td>
    </tr>
    <tr>
      <th>2</th>
      <td>September</td>
      <td>4375433296.476</td>
    </tr>
    <tr>
      <th>3</th>
      <td>October</td>
      <td>1122104721.491</td>
    </tr>
    <tr>
      <th>4</th>
      <td>November</td>
      <td>539203912.271</td>
    </tr>
    <tr>
      <th>5</th>
      <td>December</td>
      <td>3199442527.608</td>
    </tr>
  </tbody>
</table>
</div>




```python
# Add a new column to distinguish between calls and puts
calls_oi_df['type'] = 'calls'
puts_oi_df['type'] = 'puts'

# Concatenate the dataframes
df = pd.concat([calls_oi_df, puts_oi_df])
df = df.rename(columns={"value_usd": "Open Interest (USD)"})

# Plot the bars side by side
p = sns.barplot(data=df, x='Expiration Month', y='Open Interest (USD)', hue='type', palette=['green', 'red'])
p.set_title('\nBTC Options Open Interest (USD)\nby Expiration Month\n',fontsize=16)
# Format y-axis in billions
fmt = '${x:,.0f}B'
p.legend_.remove()

tick = mtick.FuncFormatter(lambda x, pos: '${:,.2f}B'.format(x*1e-9))
p.yaxis.set_major_formatter(tick)
```

    2024-09-12 08:53:53 INFO     Using categorical units to plot a list of strings that are all parsable as floats or dates. If these strings should be plotted as numbers, cast to the appropriate data type before plotting.


    2024-09-12 08:53:53 INFO     Using categorical units to plot a list of strings that are all parsable as floats or dates. If these strings should be plotted as numbers, cast to the appropriate data type before plotting.


    2024-09-12 08:53:53 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:53 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:53 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:53 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:53 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:53 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:53 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:53 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:53 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:53 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:53 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:53 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:53 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:53 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:53 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:53 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:53 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:53 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:53 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:53 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:53 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:53 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:53 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:53 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:53 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:53 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:53 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:53 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:53 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:53 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:53 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:53 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:53 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:53 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:53 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:53 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:53 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:53 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:53 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:53 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:53 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:53 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:53 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:53 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:53 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:53 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:53 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:53 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:53 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:53 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:53 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:53 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:53 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:53 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:53 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:53 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:53 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:53 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:53 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:53 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:53 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:53 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:53 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:53 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:53 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:53 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:53 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:53 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:53 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:53:53 WARNING  findfont: Font family 'Lato' not found.



    
![png](output_55_72.png)
    

