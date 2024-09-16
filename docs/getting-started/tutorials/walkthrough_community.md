# Coin Metrics Python API Client Walkthrough (Community Version)
_Last Updated: Version `2024.08.20`_

This notebook demonstrates basic functionality offered by the Coin Metrics Python API Client using the Community Version. 

Coin Metrics offers a vast assortment of data for hundreds of cryptoassets. The Python API Client allows for easy access to this data using Python without needing to create your own wrappers using `requests` and other such libraries.

## Prerequisites

First, python must be installed. Download and install from [python.org](https://www.python.org/downloads/). The Coin Metrics API Client is best used with Python 3.8 or later.

Then, install the Python API Client:

`pip install coinmetrics-api-client`

Some of the optional libraries such as pandas, numpy, and seaborn are used in the notebook to make the examples more interactive. These libraries are not required to use the Coin Metrics API Client.

You are now ready to run the code in the rest of the notebook.

## Resources
To understand the data that Coin Metrics offers, feel free to peruse the resources below.

- The [Coin Metrics API v4](https://docs.coinmetrics.io/api/v4) website contains the full set of endpoints and data offered by Coin Metrics.
- The [Coin Metrics Knowledge Base](https://docs.coinmetrics.io/) gives detailed, conceptual explanations of the data that Coin Metrics offers.
- The [API Spec](https://coinmetrics.github.io/api-client-python/site/api_client.html) contains a full list of functions.
- The [Coverage Tool](https://coverage.coinmetrics.io/) shows what assets, metrics, and other data types are covered.

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
# Uncomment below if you have an API Key. Otherwise we will use the Community Version.
# try:
#     api_key = environ["CM_API_KEY"]
#     logging.info("Using API key found in environment")
# except KeyError:
#     api_key = ""
#     logging.info("API key not found. Using community client")

client = CoinMetricsClient()
# client = CoinMetricsClient(api_key)
```


```python
assets = ['btc', 'eth']
metrics = ['ReferenceRateUSD', 'CapMrktEstUSD']
start_time = datetime.today() - timedelta(days=30)
end_time = datetime.today()
asset_mapping = {i: assets[i] for i in range(len(assets))}
print(asset_mapping)
```

    {0: 'btc', 1: 'eth'}


## Catalogs

The Coin Metrics API contains two types of catalog endpoints (Python client functions in paranthesis): the `catalog` (`catalog_*_v2`) and `catalog-all` (`catalog_full_*_v2`).

The `catalog` endpoint displays the set of data available to your API key. The `catalog-all` endpoint displays the full set of data for CM Pro users.


```python
asset_metrics_catalog = client.catalog_asset_metrics_v2(assets=assets).to_list()
full_asset_metrics_catalog = client.catalog_full_asset_metrics_v2(assets=assets).to_list()
```

Catalog objects return a list of dictionaries. For `catalog_asset_metrics_v2`, each element of the list is an asset, while each dictionary is a set of metadata for that specific asset.


```python
print(f"Asset Metrics Catalog metadata includes: {list(asset_metrics_catalog[0].keys())}")

for i in asset_mapping:
    print(f"Asset {asset_mapping[i]} has {len(asset_metrics_catalog[i]['metrics'])} metrics in catalog.")
    print(f"Asset {asset_mapping[i]} has {len(full_asset_metrics_catalog[i]['metrics'])} metrics in catalog-all.")
```

    Asset Metrics Catalog metadata includes: ['asset', 'metrics']
    Asset btc has 147 metrics in catalog.
    Asset btc has 513 metrics in catalog-all.
    Asset eth has 146 metrics in catalog.
    Asset eth has 500 metrics in catalog-all.


For more details on what metrics are covered, see our [Coverage Tool](https://coverage.coinmetrics.io/asset-metrics-v2)

## Getting Timeseries Data

Next, we will pull timeseries data. Typically there are two types of timeseries data that you can pull: raw observations such as trades and aggregated metrics. We will explore these two below.

### Asset Metrics
First, we will use the [`asset-metrics`](https://docs.coinmetrics.io/api/v4/#tag/Timeseries/operation/getTimeseriesAssetMetrics) endpoint to get metrics for BTC and ETH.


```python
btc_metrics = [m['metric'] for m in asset_metrics_catalog[0]['metrics']]
eth_metrics = [m['metric'] for m in asset_metrics_catalog[1]['metrics']]
```

You can bound your query by time like below:


```python
df_asset_metrics = client.get_asset_metrics(
    assets = assets, 
    metrics=metrics, 
    start_time = start_time,
    end_time = end_time
).to_dataframe()
```


```python
df_asset_metrics.head()
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
      <th>CapMrktEstUSD</th>
      <th>ReferenceRateUSD</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>btc</td>
      <td>2024-08-15 00:00:00+00:00</td>
      <td>1137894996787.05249</td>
      <td>58840.64668</td>
    </tr>
    <tr>
      <th>1</th>
      <td>btc</td>
      <td>2024-08-16 00:00:00+00:00</td>
      <td>1163252605521.227783</td>
      <td>57644.187688</td>
    </tr>
    <tr>
      <th>2</th>
      <td>btc</td>
      <td>2024-08-17 00:00:00+00:00</td>
      <td>1172900035803.550781</td>
      <td>58927.276509</td>
    </tr>
    <tr>
      <th>3</th>
      <td>btc</td>
      <td>2024-08-18 00:00:00+00:00</td>
      <td>1160659435495.434814</td>
      <td>59414.674335</td>
    </tr>
    <tr>
      <th>4</th>
      <td>btc</td>
      <td>2024-08-19 00:00:00+00:00</td>
      <td>1172894781992.733887</td>
      <td>58793.206146</td>
    </tr>
  </tbody>
</table>
</div>




```python
df_asset_metrics.loc[df_asset_metrics.asset=='btc'].plot(x='time', y='ReferenceRateUSD')
```




    <Axes: xlabel='time'>




    
![png](output_16_1.png)
    


Coin Metrics supports several metrics for various data types such as exchanges, markets, and asset-pairs.

You can also bound your queries by using the `limit` parameter.


```python
df_asset_metrics_limit = client.get_asset_metrics(
    assets = assets, 
    metrics = btc_metrics[:5], 
    start_time = start_time,
    end_time = end_time,
    limit_per_asset=2
).to_dataframe()
```


```python
df_asset_metrics_limit
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
      <th>AdrActCnt</th>
      <th>AdrBal1in100KCnt</th>
      <th>AdrBal1in100MCnt</th>
      <th>AdrBal1in10BCnt</th>
      <th>AdrBal1in10KCnt</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>btc</td>
      <td>2024-08-15 00:00:00+00:00</td>
      <td>715632</td>
      <td>9229</td>
      <td>3054724</td>
      <td>20292616</td>
      <td>973</td>
    </tr>
    <tr>
      <th>1</th>
      <td>btc</td>
      <td>2024-08-16 00:00:00+00:00</td>
      <td>700335</td>
      <td>9231</td>
      <td>3055010</td>
      <td>20300505</td>
      <td>977</td>
    </tr>
    <tr>
      <th>2</th>
      <td>eth</td>
      <td>2024-08-15 00:00:00+00:00</td>
      <td>603353</td>
      <td>6862</td>
      <td>1837926</td>
      <td>27972812</td>
      <td>1226</td>
    </tr>
    <tr>
      <th>3</th>
      <td>eth</td>
      <td>2024-08-16 00:00:00+00:00</td>
      <td>541263</td>
      <td>6871</td>
      <td>1837366</td>
      <td>27962507</td>
      <td>1223</td>
    </tr>
  </tbody>
</table>
</div>



### Market Observations

The other common timeseries data type that you will encounter are individual observations. 

First, we will need to familiarize ourselves with the market convention. Markets are in the format of `<exchange>-<base>-<quote>-<type>`. You can see a full list of markets by using the `reference-data` endpoint.


```python
df_coinbase_btc_markets = client.reference_data_markets(asset='btc', exchange='coinbase').to_dataframe()
```


```python
df_coinbase_btc_markets.head()
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
      <td>coinbase-1inch-btc-spot</td>
      <td>coinbase</td>
      <td>1inch</td>
      <td>btc</td>
      <td>1inch-btc</td>
      <td>1INCH-BTC</td>
      <td>spot</td>
      <td>&lt;NA&gt;</td>
      <td>&lt;NA&gt;</td>
      <td>&lt;NA&gt;</td>
      <td>...</td>
      <td>&lt;NA&gt;</td>
      <td>&lt;NA&gt;</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>&lt;NA&gt;</td>
      <td>0.000016</td>
      <td>&lt;NA&gt;</td>
      <td>&lt;NA&gt;</td>
      <td>False</td>
      <td>&lt;NA&gt;</td>
    </tr>
    <tr>
      <th>1</th>
      <td>coinbase-aave-btc-spot</td>
      <td>coinbase</td>
      <td>aave</td>
      <td>btc</td>
      <td>aave-btc</td>
      <td>AAVE-BTC</td>
      <td>spot</td>
      <td>&lt;NA&gt;</td>
      <td>&lt;NA&gt;</td>
      <td>&lt;NA&gt;</td>
      <td>...</td>
      <td>&lt;NA&gt;</td>
      <td>&lt;NA&gt;</td>
      <td>0.000001</td>
      <td>0.000001</td>
      <td>&lt;NA&gt;</td>
      <td>0.000016</td>
      <td>&lt;NA&gt;</td>
      <td>&lt;NA&gt;</td>
      <td>False</td>
      <td>&lt;NA&gt;</td>
    </tr>
    <tr>
      <th>2</th>
      <td>coinbase-ada-btc-spot</td>
      <td>coinbase</td>
      <td>ada</td>
      <td>btc</td>
      <td>ada-btc</td>
      <td>ADA-BTC</td>
      <td>spot</td>
      <td>&lt;NA&gt;</td>
      <td>&lt;NA&gt;</td>
      <td>&lt;NA&gt;</td>
      <td>...</td>
      <td>&lt;NA&gt;</td>
      <td>&lt;NA&gt;</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>&lt;NA&gt;</td>
      <td>0.000016</td>
      <td>&lt;NA&gt;</td>
      <td>&lt;NA&gt;</td>
      <td>False</td>
      <td>&lt;NA&gt;</td>
    </tr>
    <tr>
      <th>3</th>
      <td>coinbase-algo-btc-spot</td>
      <td>coinbase</td>
      <td>algo</td>
      <td>btc</td>
      <td>algo-btc</td>
      <td>ALGO-BTC</td>
      <td>spot</td>
      <td>&lt;NA&gt;</td>
      <td>&lt;NA&gt;</td>
      <td>&lt;NA&gt;</td>
      <td>...</td>
      <td>&lt;NA&gt;</td>
      <td>&lt;NA&gt;</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>&lt;NA&gt;</td>
      <td>0.000016</td>
      <td>&lt;NA&gt;</td>
      <td>&lt;NA&gt;</td>
      <td>False</td>
      <td>&lt;NA&gt;</td>
    </tr>
    <tr>
      <th>4</th>
      <td>coinbase-ankr-btc-spot</td>
      <td>coinbase</td>
      <td>ankr</td>
      <td>btc</td>
      <td>ankr-btc</td>
      <td>ANKR-BTC</td>
      <td>spot</td>
      <td>&lt;NA&gt;</td>
      <td>&lt;NA&gt;</td>
      <td>&lt;NA&gt;</td>
      <td>...</td>
      <td>&lt;NA&gt;</td>
      <td>&lt;NA&gt;</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>&lt;NA&gt;</td>
      <td>0.000016</td>
      <td>&lt;NA&gt;</td>
      <td>&lt;NA&gt;</td>
      <td>False</td>
      <td>&lt;NA&gt;</td>
    </tr>
  </tbody>
</table>
<p>5 rows × 37 columns</p>
</div>



We can then pass these markets onto the `timeseries/market-*` endpoints. Below is an example of how to pull individual market trades.


```python
df_coinbase_btc_trades = client.get_market_trades(
    markets = ["coinbase-btc-usd-spot"],
    start_time = datetime.now() - timedelta(seconds=60),
    end_time = datetime.now(),
).to_dataframe()
```


```python
df_coinbase_btc_trades.head()
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
      <td>2024-09-13 16:55:02.663733+00:00</td>
      <td>691698441</td>
      <td>0.008</td>
      <td>59491.6</td>
      <td>2024-09-13 16:55:03.253369+00:00</td>
      <td>sell</td>
    </tr>
    <tr>
      <th>1</th>
      <td>coinbase-btc-usd-spot</td>
      <td>2024-09-13 16:55:02.670644+00:00</td>
      <td>691698442</td>
      <td>0.008</td>
      <td>59491.61</td>
      <td>2024-09-13 16:55:03.253369+00:00</td>
      <td>buy</td>
    </tr>
    <tr>
      <th>2</th>
      <td>coinbase-btc-usd-spot</td>
      <td>2024-09-13 16:55:03.057923+00:00</td>
      <td>691698443</td>
      <td>0.001186</td>
      <td>59491.61</td>
      <td>2024-09-13 16:55:03.771512+00:00</td>
      <td>buy</td>
    </tr>
    <tr>
      <th>3</th>
      <td>coinbase-btc-usd-spot</td>
      <td>2024-09-13 16:55:03.143752+00:00</td>
      <td>691698444</td>
      <td>0.15742</td>
      <td>59491.6</td>
      <td>2024-09-13 16:55:03.771512+00:00</td>
      <td>sell</td>
    </tr>
    <tr>
      <th>4</th>
      <td>coinbase-btc-usd-spot</td>
      <td>2024-09-13 16:55:03.143816+00:00</td>
      <td>691698445</td>
      <td>0.076281</td>
      <td>59491.6</td>
      <td>2024-09-13 16:55:03.771512+00:00</td>
      <td>sell</td>
    </tr>
  </tbody>
</table>
</div>



## Index Data Examples

_The Coin Metrics Bletchley Indexes (“CMBI”) are designed to provide cryptoasset markets with a diverse range of market capitalization weighted, equal weighted and network data weighted indexes to measure performance of the largest and most utilized global cryptoassets. CMBI products are operated and calculated by Coin Metrics and are designed to serve as an independent, transparent and comprehensive measure of crypto market performance._

We can use the Python API Client to query the index data and its constituents over time. For more information on the index data, check out our [index page](https://indexes.coinmetrics.io/) and our [knowledge base](https://docs.coinmetrics.io/info/indexes).


```python
indexes = ['CMBIBE']
```


```python
client.reference_data_indexes(indexes).to_dataframe()
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
      <th>index</th>
      <th>full_name</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>CMBIBE</td>
      <td>CMBI Bitcoin &amp; Ethereum Index</td>
    </tr>
  </tbody>
</table>
</div>




```python
# Get the index levels

df_index_levels = client.get_index_levels(
    indexes,
    start_time=start_time,
    end_time=end_time
).to_dataframe()
```


```python
df_index_levels.head()
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
      <th>index</th>
      <th>time</th>
      <th>level</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>CMBIBE</td>
      <td>2024-08-15 00:00:00+00:00</td>
      <td>27360.773035</td>
    </tr>
    <tr>
      <th>1</th>
      <td>CMBIBE</td>
      <td>2024-08-16 00:00:00+00:00</td>
      <td>26718.566688</td>
    </tr>
    <tr>
      <th>2</th>
      <td>CMBIBE</td>
      <td>2024-08-17 00:00:00+00:00</td>
      <td>27232.417473</td>
    </tr>
    <tr>
      <th>3</th>
      <td>CMBIBE</td>
      <td>2024-08-18 00:00:00+00:00</td>
      <td>27449.314493</td>
    </tr>
    <tr>
      <th>4</th>
      <td>CMBIBE</td>
      <td>2024-08-19 00:00:00+00:00</td>
      <td>27250.570621</td>
    </tr>
  </tbody>
</table>
</div>




```python
# Get the index constituents

df_index_constituents = client.get_index_constituents(
    indexes, start_time=datetime.today() - timedelta(days=30), end_time=datetime.today()
).to_dataframe()
df_index_constituents['constituents'] = df_index_constituents['constituents'].apply(eval)

```

    2024-09-13 16:56:03 INFO     Sleeping for a rate limit window because 429 (too many requests) error was returned. Pleasesee Coin Metrics APIV4 documentation for more information: https://docs.coinmetrics.io/api/v4/#tag/Rate-limits



```python
df_index_constituents.head()
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
      <th>index</th>
      <th>time</th>
      <th>constituents</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>CMBIBE</td>
      <td>2024-08-14 17:00:00+00:00</td>
      <td>[{'asset': 'btc', 'weight': '0.785593659039292...</td>
    </tr>
    <tr>
      <th>1</th>
      <td>CMBIBE</td>
      <td>2024-08-14 18:00:00+00:00</td>
      <td>[{'asset': 'btc', 'weight': '0.785749832450211...</td>
    </tr>
    <tr>
      <th>2</th>
      <td>CMBIBE</td>
      <td>2024-08-14 19:00:00+00:00</td>
      <td>[{'asset': 'btc', 'weight': '0.785653622591090...</td>
    </tr>
    <tr>
      <th>3</th>
      <td>CMBIBE</td>
      <td>2024-08-14 20:00:00+00:00</td>
      <td>[{'asset': 'btc', 'weight': '0.784784783010471...</td>
    </tr>
    <tr>
      <th>4</th>
      <td>CMBIBE</td>
      <td>2024-08-14 21:00:00+00:00</td>
      <td>[{'asset': 'btc', 'weight': '0.784658272106595...</td>
    </tr>
  </tbody>
</table>
</div>



Note that the constituents column contains a list of dicts. We can do some light cleaning to pivot that into a column.


```python
def _expand_df(key, iterable):
    def _assign_value(row):
        try:
            return row[key]
        except (KeyError, TypeError):
            return None

    return list(map(_assign_value, iterable))
```


```python
df_index_constituents.info()
```

    <class 'pandas.core.frame.DataFrame'>
    RangeIndex: 720 entries, 0 to 719
    Data columns (total 3 columns):
     #   Column        Non-Null Count  Dtype              
    ---  ------        --------------  -----              
     0   index         720 non-null    string             
     1   time          720 non-null    datetime64[ns, UTC]
     2   constituents  720 non-null    object             
    dtypes: datetime64[ns, UTC](1), object(1), string(1)
    memory usage: 17.0+ KB



```python
df_index_constituents_exploded = df_index_constituents.explode(
    'constituents'
).assign(
    asset=lambda df: _expand_df(
        key="asset", iterable=df.constituents
    )
).assign(
    weight=lambda df: _expand_df(
        key="weight", iterable=df.constituents
    )
).drop(['constituents'], axis=1)

df_index_joined = df_index_constituents[
    ['index', 'time']
].merge(
    df_index_constituents_exploded, on=['index', 'time']
).sort_values('time').reset_index(drop=True)
df_index_joined['weight'] = df_index_joined['weight'].astype(float)
```


```python
df_index_joined.head()
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
      <th>index</th>
      <th>time</th>
      <th>asset</th>
      <th>weight</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>CMBIBE</td>
      <td>2024-08-14 17:00:00+00:00</td>
      <td>btc</td>
      <td>0.785594</td>
    </tr>
    <tr>
      <th>1</th>
      <td>CMBIBE</td>
      <td>2024-08-14 17:00:00+00:00</td>
      <td>eth</td>
      <td>0.214406</td>
    </tr>
    <tr>
      <th>2</th>
      <td>CMBIBE</td>
      <td>2024-08-14 18:00:00+00:00</td>
      <td>btc</td>
      <td>0.785750</td>
    </tr>
    <tr>
      <th>3</th>
      <td>CMBIBE</td>
      <td>2024-08-14 18:00:00+00:00</td>
      <td>eth</td>
      <td>0.214250</td>
    </tr>
    <tr>
      <th>4</th>
      <td>CMBIBE</td>
      <td>2024-08-14 19:00:00+00:00</td>
      <td>btc</td>
      <td>0.785654</td>
    </tr>
  </tbody>
</table>
</div>




```python
df_index_joined.info()
```

    <class 'pandas.core.frame.DataFrame'>
    RangeIndex: 1440 entries, 0 to 1439
    Data columns (total 4 columns):
     #   Column  Non-Null Count  Dtype              
    ---  ------  --------------  -----              
     0   index   1440 non-null   string             
     1   time    1440 non-null   datetime64[ns, UTC]
     2   asset   1440 non-null   object             
     3   weight  1440 non-null   float64            
    dtypes: datetime64[ns, UTC](1), float64(1), object(1), string(1)
    memory usage: 45.1+ KB



```python
df_index_weights = df_index_joined.pivot(index='time', columns='asset', values='weight').reset_index()
```


```python
df_index_weights.head()
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
      <th>time</th>
      <th>btc</th>
      <th>eth</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>2024-08-14 17:00:00+00:00</td>
      <td>0.785594</td>
      <td>0.214406</td>
    </tr>
    <tr>
      <th>1</th>
      <td>2024-08-14 18:00:00+00:00</td>
      <td>0.785750</td>
      <td>0.214250</td>
    </tr>
    <tr>
      <th>2</th>
      <td>2024-08-14 19:00:00+00:00</td>
      <td>0.785654</td>
      <td>0.214346</td>
    </tr>
    <tr>
      <th>3</th>
      <td>2024-08-14 20:00:00+00:00</td>
      <td>0.784785</td>
      <td>0.215215</td>
    </tr>
    <tr>
      <th>4</th>
      <td>2024-08-14 21:00:00+00:00</td>
      <td>0.784658</td>
      <td>0.215342</td>
    </tr>
  </tbody>
</table>
</div>




```python
df_index_merged = df_index_levels.merge(df_index_weights, on='time')
```


```python
df_index_merged.head()
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
      <th>index</th>
      <th>time</th>
      <th>level</th>
      <th>btc</th>
      <th>eth</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>CMBIBE</td>
      <td>2024-08-15 00:00:00+00:00</td>
      <td>27360.773035</td>
      <td>0.784315</td>
      <td>0.215685</td>
    </tr>
    <tr>
      <th>1</th>
      <td>CMBIBE</td>
      <td>2024-08-16 00:00:00+00:00</td>
      <td>26718.566688</td>
      <td>0.786835</td>
      <td>0.213165</td>
    </tr>
    <tr>
      <th>2</th>
      <td>CMBIBE</td>
      <td>2024-08-17 00:00:00+00:00</td>
      <td>27232.417473</td>
      <td>0.789172</td>
      <td>0.210828</td>
    </tr>
    <tr>
      <th>3</th>
      <td>CMBIBE</td>
      <td>2024-08-18 00:00:00+00:00</td>
      <td>27449.314493</td>
      <td>0.789412</td>
      <td>0.210588</td>
    </tr>
    <tr>
      <th>4</th>
      <td>CMBIBE</td>
      <td>2024-08-19 00:00:00+00:00</td>
      <td>27250.570621</td>
      <td>0.786852</td>
      <td>0.213148</td>
    </tr>
  </tbody>
</table>
</div>




```python
df_index_merged['level_btc'] = df_index_merged['btc'] * df_index_merged['level']
df_index_merged['level_eth'] = df_index_merged['eth'] * df_index_merged['level']
df_index_merged.head()
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
      <th>index</th>
      <th>time</th>
      <th>level</th>
      <th>btc</th>
      <th>eth</th>
      <th>level_btc</th>
      <th>level_eth</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>CMBIBE</td>
      <td>2024-08-15 00:00:00+00:00</td>
      <td>27360.773035</td>
      <td>0.784315</td>
      <td>0.215685</td>
      <td>21459.464973</td>
      <td>5901.308062</td>
    </tr>
    <tr>
      <th>1</th>
      <td>CMBIBE</td>
      <td>2024-08-16 00:00:00+00:00</td>
      <td>26718.566688</td>
      <td>0.786835</td>
      <td>0.213165</td>
      <td>21023.110662</td>
      <td>5695.456026</td>
    </tr>
    <tr>
      <th>2</th>
      <td>CMBIBE</td>
      <td>2024-08-17 00:00:00+00:00</td>
      <td>27232.417473</td>
      <td>0.789172</td>
      <td>0.210828</td>
      <td>21491.059285</td>
      <td>5741.358188</td>
    </tr>
    <tr>
      <th>3</th>
      <td>CMBIBE</td>
      <td>2024-08-18 00:00:00+00:00</td>
      <td>27449.314493</td>
      <td>0.789412</td>
      <td>0.210588</td>
      <td>21668.815601</td>
      <td>5780.498892</td>
    </tr>
    <tr>
      <th>4</th>
      <td>CMBIBE</td>
      <td>2024-08-19 00:00:00+00:00</td>
      <td>27250.570621</td>
      <td>0.786852</td>
      <td>0.213148</td>
      <td>21442.163183</td>
      <td>5808.407437</td>
    </tr>
  </tbody>
</table>
</div>



We can then analyze an index constituents' weight over time, as well as compare the contributions from each constituent.


```python
sns.lineplot(data=df_index_joined, x='time', y='weight', hue='asset')
```




    <Axes: xlabel='time', ylabel='weight'>




    
![png](output_46_1.png)
    



```python
df_index_melted = pd.melt(df_index_merged, id_vars='time', value_vars=['level', 'level_btc', 'level_eth'])
df_index_melted['variable'] = df_index_melted['variable'].map({'level': 'total', 'level_eth': 'eth', 'level_btc': 'btc'})
```


```python
sns.lineplot(data=df_index_melted, x='time', y='value', hue='variable')

```




    <Axes: xlabel='time', ylabel='value'>




    
![png](output_48_1.png)
    


## Examples from State of the Network

The Python API Client is often used for transforming data for [State of the Network](https://coinmetrics.substack.com/). Below are some examples of data transformations done to produce the data visualizations.

### Example 1: Get returns by coin in the CM reference rates universe over the last 10-years
In [State of the Network #128](https://coinmetrics.substack.com/p/coin-metrics-state-of-the-network-53b), we looked at the returns for each asset dating back the last 10 years.

![returns-10-yr](https://cdn.substack.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F38b38adb-c4b7-43f6-a387-0cbae028861a_985x525.png)

We can generate this data by weaving in the `catalog_asset_metrics_v2` and `get_asset_metrics` endpoint. The code snippets below demonstrate how to do this with a small list of assets. 


```python

# Get all assets that have a reference rate 
assets_refrate = client.catalog_asset_metrics_v2(metrics="ReferenceRateUSD")
# Get list of assets with daily ref rate 
# uncomment the top line to look at *every* asset with reference rates
# asset_with_ref_rates = assets_refrate[0]["frequencies"][0]["assets"]
asset_with_ref_rates = ['btc', 'eth', 'bnb', 'ada', 'doge', 'xrp']
#Query API for prices, daily CM reference rates as dataframe
metrics = "ReferenceRateUSD"
frequency = "1d"

logging.info("Getting prices...")
df_prices = client.get_asset_metrics(
    assets=asset_with_ref_rates,
    metrics=metrics,
    frequency=frequency,
    start_time=start_time,
    end_time=end_time
).to_dataframe()
# Assign datatypes
df_prices["time"] = pd.to_datetime(df_prices.time)
df_prices["ReferenceRateUSD"] = df_prices.ReferenceRateUSD.astype(float)

# Reshape dataset so assets are in columns, dates are the rows, and the values are prices
df_prices_pivot = df_prices.pivot(
    index="time",
    columns="asset",
    values="ReferenceRateUSD"
)

# Index each asset's time series to 1 
for col in df_prices_pivot.columns:
    logging.info(f"Calculating Reference rate for {col}....")
    # First price in time series
    first_price = df_prices_pivot[df_prices_pivot[col].notnull()][col].iloc[0]
    # Index time series
    df_prices_pivot[col] = df_prices_pivot[col]/first_price
    # Fill forward for Null values
    df_prices_pivot[col] = df_prices_pivot[col].ffill()
```

    2024-09-13 16:56:10 INFO     Getting prices...
    2024-09-13 16:56:11 INFO     Calculating Reference rate for ada....
    2024-09-13 16:56:11 INFO     Calculating Reference rate for bnb....
    2024-09-13 16:56:11 INFO     Calculating Reference rate for btc....
    2024-09-13 16:56:11 INFO     Calculating Reference rate for doge....
    2024-09-13 16:56:11 INFO     Calculating Reference rate for eth....
    2024-09-13 16:56:11 INFO     Calculating Reference rate for xrp....



```python
df_prices_pivot.tail()
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
      <th>2024-09-09 00:00:00+00:00</th>
      <td>1.008826</td>
      <td>0.960197</td>
      <td>0.932336</td>
      <td>0.936040</td>
      <td>0.862489</td>
      <td>0.930312</td>
    </tr>
    <tr>
      <th>2024-09-10 00:00:00+00:00</th>
      <td>1.024744</td>
      <td>0.990748</td>
      <td>0.971026</td>
      <td>1.011867</td>
      <td>0.885729</td>
      <td>0.948722</td>
    </tr>
    <tr>
      <th>2024-09-11 00:00:00+00:00</th>
      <td>1.024288</td>
      <td>0.988299</td>
      <td>0.980011</td>
      <td>1.001351</td>
      <td>0.896031</td>
      <td>0.950876</td>
    </tr>
    <tr>
      <th>2024-09-12 00:00:00+00:00</th>
      <td>1.051865</td>
      <td>1.011061</td>
      <td>0.975672</td>
      <td>0.987734</td>
      <td>0.878328</td>
      <td>0.940610</td>
    </tr>
    <tr>
      <th>2024-09-13 00:00:00+00:00</th>
      <td>1.061901</td>
      <td>1.036981</td>
      <td>0.987831</td>
      <td>1.001874</td>
      <td>0.885837</td>
      <td>0.987858</td>
    </tr>
  </tbody>
</table>
</div>



### Example 2: Get daily spot trading volume on coinbase for USDC markets

In [State of the Network #126](https://coinmetrics.substack.com/p/coin-metrics-state-of-the-network-issue-126), we looked at spot volume on trusted exchanges over time.

![vol-over-time](https://cdn.substack.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F011acfa6-6b3e-4c51-bbc8-d0354235e005_1200x709.png)

We can replicate similar data behind chart using just coinbase spot markets at 2021. Here, we derive volume from our `get_market_candles` endpoint.


```python
candles_coinbase = client.get_market_candles(
    markets="coinbase-*-usdc-spot", # wildcards can be passed to get all asset pairs
    start_time=start_time,
    end_time=end_time,
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
      <td>coinbase-eurc-usdc-spot</td>
      <td>2024-08-23 00:00:00+00:00</td>
      <td>1.121</td>
      <td>1.119</td>
      <td>1.121</td>
      <td>1.118</td>
      <td>1.120121</td>
      <td>997787.0</td>
      <td>1.117636e+06</td>
      <td>140</td>
    </tr>
    <tr>
      <th>1</th>
      <td>coinbase-eurc-usdc-spot</td>
      <td>2024-08-24 00:00:00+00:00</td>
      <td>1.12</td>
      <td>1.12</td>
      <td>1.13</td>
      <td>1.119</td>
      <td>1.120547</td>
      <td>1122215.0</td>
      <td>1.257357e+06</td>
      <td>412</td>
    </tr>
    <tr>
      <th>2</th>
      <td>coinbase-eurc-usdc-spot</td>
      <td>2024-08-25 00:00:00+00:00</td>
      <td>1.121</td>
      <td>1.12</td>
      <td>1.132</td>
      <td>1.119</td>
      <td>1.121433</td>
      <td>2796276.0</td>
      <td>3.135472e+06</td>
      <td>1727</td>
    </tr>
    <tr>
      <th>3</th>
      <td>coinbase-eurc-usdc-spot</td>
      <td>2024-08-26 00:00:00+00:00</td>
      <td>1.12</td>
      <td>1.118</td>
      <td>1.126</td>
      <td>1.116</td>
      <td>1.118883</td>
      <td>1999004.0</td>
      <td>2.236419e+06</td>
      <td>882</td>
    </tr>
    <tr>
      <th>4</th>
      <td>coinbase-eurc-usdc-spot</td>
      <td>2024-08-27 00:00:00+00:00</td>
      <td>1.117</td>
      <td>1.119</td>
      <td>1.122</td>
      <td>1.116</td>
      <td>1.118849</td>
      <td>1505368.0</td>
      <td>1.684074e+06</td>
      <td>1227</td>
    </tr>
  </tbody>
</table>
</div>



We can also break this down by month. Note that for this example, the volume numbers will look smaller because we are using fewer exchanges.

![vol-by-month](https://cdn.substack.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2Fdd12c9e3-9728-478b-b8aa-7136f2aaae10_985x525.png)


```python
month_order = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
]


candles_coinbase.groupby(
    candles_coinbase.time.dt.month_name()
)[['candle_usd_volume']].sum().reindex(month_order).dropna()
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
      <th>candle_usd_volume</th>
    </tr>
    <tr>
      <th>time</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>August</th>
      <td>1.084497e+09</td>
    </tr>
    <tr>
      <th>September</th>
      <td>6.695270e+08</td>
    </tr>
  </tbody>
</table>
</div>




```python

```


```python

```
