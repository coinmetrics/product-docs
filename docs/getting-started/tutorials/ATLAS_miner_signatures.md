<img src="https://5264302.fs1.hubspotusercontent-na1.net/hubfs/5264302/Demo%20Asset%20Resources/CM-Demo-miner_signatures.png" width=1100 margin-left='auto' margin-right='auto'/>

For much of its history, the Bitcoin mining industry has been notoriously opaque. Luckily, it has become a common practice for many BTC mining pools to leave a subtle "miner signature" in each block's coinbase transaction (not to be confused with the popular crypto exchange by the same name). This transaction contains the miner reward— currently 6.25 BTC per block—but also leaves some extra space for arbitrary data, allowing the pool to publicly assert their claim. Using ATLAS v2, we're able to extract this miner signature, enabling us to derive a variety of mining pool metrics.

## Resources
This notebook demonstrates basic functionality offered by the Coin Metrics Python API Client and ATLAS blockchain search engine.

Coin Metrics offers a vast assortment of data for hundreds of cryptoassets. The Python API Client allows for easy access to this data using Python without needing to create your own wrappers using `requests` and other such libraries.

To understand the data that Coin Metrics offers, feel free to peruse the resources below.

- The [Coin Metrics API v4](https://docs.coinmetrics.io/api/v4) website contains the full set of endpoints and data offered by Coin Metrics.
- The [Coin Metrics Knowledge Base](https://docs.coinmetrics.io/info) gives detailed, conceptual explanations of the data that Coin Metrics offers.
- The [API Spec](https://coinmetrics.github.io/api-client-python/site/api_client.html) contains a full list of functions.

## Notebook Setup


```python
from os import environ
import sys
import pandas as pd
import numpy as np
import logging
from datetime import date, datetime, timedelta
from coinmetrics.api_client import CoinMetricsClient
import json
import logging
import matplotlib.dates as mdates
import matplotlib.pyplot as plt
import matplotlib.ticker as mtick
from matplotlib.ticker import FormatStrFormatter, FuncFormatter
from matplotlib import font_manager
import cmasher as cmr
import re
%matplotlib inline
import plotly
from plotly.subplots import make_subplots
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

    2024-09-20 15:39:25 INFO     Using API key found in environment



```python
colors = np.unique(cmr.take_cmap_colors('Set3', 15, return_fmt='hex'))
colors
```




    array(['#80B1D3', '#8DD3C7', '#B3DE69', '#BC80BD', '#BEBADA', '#CCEBC5',
           '#D9D9D9', '#FB8072', '#FCCDE5', '#FDB462', '#FFED6F', '#FFFFB3'],
          dtype='<U7')



# ATLAS V2

## Retrieve Block Info


```python
block_info = client.get_list_of_blocks_v2(
    asset='btc',
    start_time="2022-01-01",
    end_time="2022-12-31",
    page_size=1000
).parallel(time_increment=timedelta(days=1)).to_dataframe()
block_info['extra_data'] = block_info['extra_data'].astype(str)
```

    Exporting to dataframe type: 100%|████████████████████████████████████████████████| 364/364 [00:07<00:00, 48.53it/s]



```python
block_info.head()
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
      <th>block_hash</th>
      <th>height</th>
      <th>consensus_time</th>
      <th>miner_time</th>
      <th>n_transactions</th>
      <th>n_balance_updates</th>
      <th>parent_block_hash</th>
      <th>nonce</th>
      <th>extra_data</th>
      <th>version</th>
      <th>difficulty</th>
      <th>physical_size</th>
      <th>consensus_size</th>
      <th>consensus_size_limit</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>000000000000000000090759121a6def30d18f2ccaad98...</td>
      <td>716604</td>
      <td>2022-01-01 00:04:14+00:00</td>
      <td>2022-01-01 00:34:54+00:00</td>
      <td>997</td>
      <td>7834</td>
      <td>000000000000000000072ba79db2b57c4efa08f11f1d8f...</td>
      <td>49519865</td>
      <td>033cef0a04aea1cf61fabe6d6d6c7c4d17f3eff2236dc8...</td>
      <td>803250176</td>
      <td>24272331996979.96875</td>
      <td>737766</td>
      <td>1840962</td>
      <td>4000000</td>
    </tr>
    <tr>
      <th>1</th>
      <td>0000000000000000000aa5bba90cc9c90a6a18b8a2160c...</td>
      <td>716605</td>
      <td>2022-01-01 00:14:14+00:00</td>
      <td>2022-01-01 00:39:14+00:00</td>
      <td>674</td>
      <td>3920</td>
      <td>000000000000000000090759121a6def30d18f2ccaad98...</td>
      <td>85736e7b</td>
      <td>033def0a1362696e616e63652f383039ff001f0373a22e...</td>
      <td>536870912</td>
      <td>24272331996979.96875</td>
      <td>282321</td>
      <td>765462</td>
      <td>4000000</td>
    </tr>
    <tr>
      <th>2</th>
      <td>00000000000000000005bd3c5d5c6da98d2d4a12460bfe...</td>
      <td>716606</td>
      <td>2022-01-01 00:20:25+00:00</td>
      <td>2022-01-01 00:39:58+00:00</td>
      <td>123</td>
      <td>701</td>
      <td>0000000000000000000aa5bba90cc9c90a6a18b8a2160c...</td>
      <td>703bda04</td>
      <td>033eef0a1b4d696e656420627920416e74506f6f6c3734...</td>
      <td>536870916</td>
      <td>24272331996979.96875</td>
      <td>45448</td>
      <td>127885</td>
      <td>4000000</td>
    </tr>
    <tr>
      <th>3</th>
      <td>00000000000000000000827b0c8805e164da3e3061fff1...</td>
      <td>716607</td>
      <td>2022-01-01 00:23:25+00:00</td>
      <td>2022-01-01 00:40:00+00:00</td>
      <td>5</td>
      <td>18</td>
      <td>00000000000000000005bd3c5d5c6da98d2d4a12460bfe...</td>
      <td>a0953825</td>
      <td>033fef0a04dfa2cf612f53424943727970746f2e636f6d...</td>
      <td>536870916</td>
      <td>24272331996979.96875</td>
      <td>1143</td>
      <td>3483</td>
      <td>4000000</td>
    </tr>
    <tr>
      <th>4</th>
      <td>00000000000000000000bb3583fa3d8d9fd6332364ca62...</td>
      <td>716608</td>
      <td>2022-01-01 00:28:47+00:00</td>
      <td>2022-01-01 00:46:21+00:00</td>
      <td>973</td>
      <td>6925</td>
      <td>00000000000000000000827b0c8805e164da3e3061fff1...</td>
      <td>241dba29</td>
      <td>0340ef0a215c204d41524120506f6f6c205c000000004f...</td>
      <td>877617152</td>
      <td>24272331996979.96875</td>
      <td>538084</td>
      <td>1455358</td>
      <td>4000000</td>
    </tr>
  </tbody>
</table>
</div>




```python
# Assign 'empty' to rows where n_transactions == 1
block_info.loc[block_info['n_transactions'] == 1, 'category'] = 'Empty'

# Assign 'not empty' to remaining rows
block_info.loc[block_info['n_transactions'] != 1, 'category'] = 'Not Empty'
```


```python
block_info['extra_data'][0]
```




    '033cef0a04aea1cf61fabe6d6d6c7c4d17f3eff2236dc876b0acc7bdc4d68ad831ba71d31ff61ce512d1e99e46020000001e34c5f062696e616e63652f686b37343772185774914865669376226bd21ef100000000000000'




```python
def convert_to_human_readable_ascii(s):
    # Check if the input string is a valid hexadecimal string
    if all(c in '0123456789abcdefABCDEF' for c in s):
        # Convert the input string to bytes
        b = bytes.fromhex(s)
        # Decode the bytes using the ISO-8859-1 encoding
        result = b.decode('ISO-8859-1')
        return result
    else:
        # Return an error message if the input string is not a valid hexadecimal string
        return 'Error: input is not a valid hexadecimal string'
```


```python
block_info['miner_tag'] = block_info['extra_data'].apply(convert_to_human_readable_ascii)
```


```python
block_signed = pd.DataFrame(block_info[['miner_tag','height','consensus_time','category']])
block_signed
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
      <th>miner_tag</th>
      <th>height</th>
      <th>consensus_time</th>
      <th>category</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>&lt;ï\n®¡Ïaú¾mml|Móïò#mÈv°¬Ç½ÄÖØ1ºqÓöåÑéF...</td>
      <td>716604</td>
      <td>2022-01-01 00:04:14+00:00</td>
      <td>Not Empty</td>
    </tr>
    <tr>
      <th>1</th>
      <td>=ï\nbinance/809ÿ s¢.Eú¾mmZ/Â@£"[ÄÖ|}öOÓ½...</td>
      <td>716605</td>
      <td>2022-01-01 00:14:14+00:00</td>
      <td>Not Empty</td>
    </tr>
    <tr>
      <th>2</th>
      <td>&gt;ï\nMined by AntPool749ÿsäÖKú¾mm?nø\rz...</td>
      <td>716606</td>
      <td>2022-01-01 00:20:25+00:00</td>
      <td>Not Empty</td>
    </tr>
    <tr>
      <th>3</th>
      <td>?ï\nß¢Ïa/SBICrypto.com Pool/L8¨O      </td>
      <td>716607</td>
      <td>2022-01-01 00:23:25+00:00</td>
      <td>Not Empty</td>
    </tr>
    <tr>
      <th>4</th>
      <td>@ï\n!\ MARA Pool \    Oç&gt;ð§/Gt&lt;   </td>
      <td>716608</td>
      <td>2022-01-01 00:28:47+00:00</td>
      <td>Not Empty</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>53027</th>
      <td>_¾|¯c/Foundry USA Pool #dropgold/Q!Ù      </td>
      <td>769631</td>
      <td>2022-12-30 23:25:11+00:00</td>
      <td>Not Empty</td>
    </tr>
    <tr>
      <th>53028</th>
      <td>`¾Mined by AntPool959[ Q§õ-ìú¾mm²99ßãï6...</td>
      <td>769632</td>
      <td>2022-12-30 23:31:09+00:00</td>
      <td>Not Empty</td>
    </tr>
    <tr>
      <th>53029</th>
      <td>a¾,ú¾mmô±\t¥ü&amp;óvm-1L´A¿ºVz¨µYTk@}Þò?(   ...</td>
      <td>769633</td>
      <td>2022-12-30 23:39:09+00:00</td>
      <td>Not Empty</td>
    </tr>
    <tr>
      <th>53030</th>
      <td>b¾Ã¯c/Foundry USA Pool #dropgold/A  6   </td>
      <td>769634</td>
      <td>2022-12-30 23:40:35+00:00</td>
      <td>Not Empty</td>
    </tr>
    <tr>
      <th>53031</th>
      <td>c¾ú¾mmeè«úÆruÎ7æB¿"LNýôKü¦#âÓ[     ...</td>
      <td>769635</td>
      <td>2022-12-30 23:47:15+00:00</td>
      <td>Not Empty</td>
    </tr>
  </tbody>
</table>
<p>53032 rows × 4 columns</p>
</div>




```python
# List of strings included in coinbase signature
miners = ['AntPool', 'ViaBTC', 'binance', 'Binance', 'Foundry', 'Luxor', 
          'SlushPool', 'slush', 'BTC.com','BTC.COM','btc.com','btccom',
          'bitdeer','btcpool', 'F2Pool', 'poolin','xxxxxx.com','CKPool', 
          'BTC.TOP', 'BTCC', 'MARA Pool', 'Mara Pool']
```


```python
def detect_keywords(df, column, keywords):
    # Create a new column called 'miner'
    df['miner'] = None
    # Iterate over the miner names
    for miner in miners:
        # Use the update method to detect the miner name in the specified column
        df['miner'].update(df[column].str.extract(rf'({miner})', expand=False))
    # Replace any rows where the 'miner' column is None with 'Unknown'
    df['miner'].replace({None: 'Other'}, inplace=True)
    return df
```


```python
miners_tagged = detect_keywords(block_signed, 'miner_tag', miners)
miners_tagged = miners_tagged.set_index('consensus_time')
miners_tagged
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
      <th>miner_tag</th>
      <th>height</th>
      <th>category</th>
      <th>miner</th>
    </tr>
    <tr>
      <th>consensus_time</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2022-01-01 00:04:14+00:00</th>
      <td>&lt;ï\n®¡Ïaú¾mml|Móïò#mÈv°¬Ç½ÄÖØ1ºqÓöåÑéF...</td>
      <td>716604</td>
      <td>Not Empty</td>
      <td>binance</td>
    </tr>
    <tr>
      <th>2022-01-01 00:14:14+00:00</th>
      <td>=ï\nbinance/809ÿ s¢.Eú¾mmZ/Â@£"[ÄÖ|}öOÓ½...</td>
      <td>716605</td>
      <td>Not Empty</td>
      <td>binance</td>
    </tr>
    <tr>
      <th>2022-01-01 00:20:25+00:00</th>
      <td>&gt;ï\nMined by AntPool749ÿsäÖKú¾mm?nø\rz...</td>
      <td>716606</td>
      <td>Not Empty</td>
      <td>AntPool</td>
    </tr>
    <tr>
      <th>2022-01-01 00:23:25+00:00</th>
      <td>?ï\nß¢Ïa/SBICrypto.com Pool/L8¨O      </td>
      <td>716607</td>
      <td>Not Empty</td>
      <td>Other</td>
    </tr>
    <tr>
      <th>2022-01-01 00:28:47+00:00</th>
      <td>@ï\n!\ MARA Pool \    Oç&gt;ð§/Gt&lt;   </td>
      <td>716608</td>
      <td>Not Empty</td>
      <td>MARA Pool</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>2022-12-30 23:25:11+00:00</th>
      <td>_¾|¯c/Foundry USA Pool #dropgold/Q!Ù      </td>
      <td>769631</td>
      <td>Not Empty</td>
      <td>Foundry</td>
    </tr>
    <tr>
      <th>2022-12-30 23:31:09+00:00</th>
      <td>`¾Mined by AntPool959[ Q§õ-ìú¾mm²99ßãï6...</td>
      <td>769632</td>
      <td>Not Empty</td>
      <td>AntPool</td>
    </tr>
    <tr>
      <th>2022-12-30 23:39:09+00:00</th>
      <td>a¾,ú¾mmô±\t¥ü&amp;óvm-1L´A¿ºVz¨µYTk@}Þò?(   ...</td>
      <td>769633</td>
      <td>Not Empty</td>
      <td>F2Pool</td>
    </tr>
    <tr>
      <th>2022-12-30 23:40:35+00:00</th>
      <td>b¾Ã¯c/Foundry USA Pool #dropgold/A  6   </td>
      <td>769634</td>
      <td>Not Empty</td>
      <td>Foundry</td>
    </tr>
    <tr>
      <th>2022-12-30 23:47:15+00:00</th>
      <td>c¾ú¾mmeè«úÆruÎ7æB¿"LNýôKü¦#âÓ[     ...</td>
      <td>769635</td>
      <td>Not Empty</td>
      <td>slush</td>
    </tr>
  </tbody>
</table>
<p>53032 rows × 4 columns</p>
</div>




```python
def transform_index_to_date(index):
    datetime_index = pd.to_datetime(index)
    date_index = [datetime.date(datetime_obj) for datetime_obj in datetime_index]
    return date_index
```


```python
date_index = transform_index_to_date(miners_tagged.index)
miners_tagged.index = pd.to_datetime(date_index)
```


```python
miners_tagged
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
      <th>miner_tag</th>
      <th>height</th>
      <th>category</th>
      <th>miner</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2022-01-01</th>
      <td>&lt;ï\n®¡Ïaú¾mml|Móïò#mÈv°¬Ç½ÄÖØ1ºqÓöåÑéF...</td>
      <td>716604</td>
      <td>Not Empty</td>
      <td>binance</td>
    </tr>
    <tr>
      <th>2022-01-01</th>
      <td>=ï\nbinance/809ÿ s¢.Eú¾mmZ/Â@£"[ÄÖ|}öOÓ½...</td>
      <td>716605</td>
      <td>Not Empty</td>
      <td>binance</td>
    </tr>
    <tr>
      <th>2022-01-01</th>
      <td>&gt;ï\nMined by AntPool749ÿsäÖKú¾mm?nø\rz...</td>
      <td>716606</td>
      <td>Not Empty</td>
      <td>AntPool</td>
    </tr>
    <tr>
      <th>2022-01-01</th>
      <td>?ï\nß¢Ïa/SBICrypto.com Pool/L8¨O      </td>
      <td>716607</td>
      <td>Not Empty</td>
      <td>Other</td>
    </tr>
    <tr>
      <th>2022-01-01</th>
      <td>@ï\n!\ MARA Pool \    Oç&gt;ð§/Gt&lt;   </td>
      <td>716608</td>
      <td>Not Empty</td>
      <td>MARA Pool</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>2022-12-30</th>
      <td>_¾|¯c/Foundry USA Pool #dropgold/Q!Ù      </td>
      <td>769631</td>
      <td>Not Empty</td>
      <td>Foundry</td>
    </tr>
    <tr>
      <th>2022-12-30</th>
      <td>`¾Mined by AntPool959[ Q§õ-ìú¾mm²99ßãï6...</td>
      <td>769632</td>
      <td>Not Empty</td>
      <td>AntPool</td>
    </tr>
    <tr>
      <th>2022-12-30</th>
      <td>a¾,ú¾mmô±\t¥ü&amp;óvm-1L´A¿ºVz¨µYTk@}Þò?(   ...</td>
      <td>769633</td>
      <td>Not Empty</td>
      <td>F2Pool</td>
    </tr>
    <tr>
      <th>2022-12-30</th>
      <td>b¾Ã¯c/Foundry USA Pool #dropgold/A  6   </td>
      <td>769634</td>
      <td>Not Empty</td>
      <td>Foundry</td>
    </tr>
    <tr>
      <th>2022-12-30</th>
      <td>c¾ú¾mmeè«úÆruÎ7æB¿"LNýôKü¦#âÓ[     ...</td>
      <td>769635</td>
      <td>Not Empty</td>
      <td>slush</td>
    </tr>
  </tbody>
</table>
<p>53032 rows × 4 columns</p>
</div>




```python
other_miners = miners_tagged.loc[miners_tagged['miner'] == 'Other']
other_miners
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
      <th>miner_tag</th>
      <th>height</th>
      <th>category</th>
      <th>miner</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2022-01-01</th>
      <td>?ï\nß¢Ïa/SBICrypto.com Pool/L8¨O      </td>
      <td>716607</td>
      <td>Not Empty</td>
      <td>Other</td>
    </tr>
    <tr>
      <th>2022-01-01</th>
      <td>Hï\nä¶Ïa//ú¾mmWdîìdùªýQR:ë¹w4Q'À*Á\t#{&gt;...</td>
      <td>716616</td>
      <td>Not Empty</td>
      <td>Other</td>
    </tr>
    <tr>
      <th>2022-01-01</th>
      <td>Sï\nÌÕÏa//ú¾mmgk&lt;»\n`!5jZBgÇyza­7ø...</td>
      <td>716627</td>
      <td>Not Empty</td>
      <td>Other</td>
    </tr>
    <tr>
      <th>2022-01-01</th>
      <td>`ï\nèÏa/SBICrypto.com Pool/¡R:«j   </td>
      <td>716640</td>
      <td>Not Empty</td>
      <td>Other</td>
    </tr>
    <tr>
      <th>2022-01-01</th>
      <td>jï\n@Ða/SBICrypto.com Pool/S!Y I    </td>
      <td>716650</td>
      <td>Not Empty</td>
      <td>Other</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>2022-12-30</th>
      <td>à½Åp®c/SBICrypto.com Pool/Jñ1£²     </td>
      <td>769504</td>
      <td>Not Empty</td>
      <td>Other</td>
    </tr>
    <tr>
      <th>2022-12-30</th>
      <td>õ½­£®c/SBICrypto.com Pool/»Ì1¾     </td>
      <td>769525</td>
      <td>Not Empty</td>
      <td>Other</td>
    </tr>
    <tr>
      <th>2022-12-30</th>
      <td>¾ \t\t\t \t\t \t@°$    </td>
      <td>769550</td>
      <td>Not Empty</td>
      <td>Other</td>
    </tr>
    <tr>
      <th>2022-12-30</th>
      <td>¾Çþ®c/SBICrypto.com Pool/ºï¢&amp;{     </td>
      <td>769563</td>
      <td>Not Empty</td>
      <td>Other</td>
    </tr>
    <tr>
      <th>2022-12-30</th>
      <td>¾ \t\t\t \t\t \t4ü4    </td>
      <td>769567</td>
      <td>Not Empty</td>
      <td>Other</td>
    </tr>
  </tbody>
</table>
<p>1962 rows × 4 columns</p>
</div>




```python
miners_tagged['miner'].replace('xxxxxx.com', 'Poolin', inplace=True)
miners_tagged['miner'].replace('poolin', 'Poolin', inplace=True)
miners_tagged['miner'].replace('btccom', 'BTC.com', inplace=True)
miners_tagged['miner'].replace('btc.com', 'BTC.com', inplace=True)
miners_tagged['miner'].replace('btcpool', 'BTC.com', inplace=True)
miners_tagged['miner'].replace('bitdeer', 'BTC.com', inplace=True)
miners_tagged['miner'].replace('slush', 'Braiins Pool', inplace=True)
miners_tagged['miner'].replace('binance', 'Binance Pool', inplace=True)
miners_tagged['miner'].replace('Binance', 'Binance Pool', inplace=True)
miners_tagged['miner'].replace('Mara Pool', 'MARA Pool', inplace=True)
```


```python
# Group the data by the date and calculate the relative proportions of each category
data = miners_tagged.groupby(miners_tagged.index.date)['miner'].value_counts(normalize=True)
data = data.unstack()

averages = data.sum()
averages = pd.DataFrame(averages.sort_values(ascending=False))
averages = averages.index.tolist()
data = data[averages]
```


```python
data
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
      <th>miner</th>
      <th>Foundry</th>
      <th>AntPool</th>
      <th>F2Pool</th>
      <th>Binance Pool</th>
      <th>ViaBTC</th>
      <th>Poolin</th>
      <th>Braiins Pool</th>
      <th>BTC.com</th>
      <th>Other</th>
      <th>Luxor</th>
      <th>MARA Pool</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2022-01-01</th>
      <td>0.191860</td>
      <td>0.191860</td>
      <td>0.156977</td>
      <td>0.139535</td>
      <td>0.104651</td>
      <td>0.034884</td>
      <td>0.052326</td>
      <td>0.023256</td>
      <td>0.081395</td>
      <td>0.017442</td>
      <td>0.005814</td>
    </tr>
    <tr>
      <th>2022-01-02</th>
      <td>0.145570</td>
      <td>0.164557</td>
      <td>0.126582</td>
      <td>0.158228</td>
      <td>0.113924</td>
      <td>0.056962</td>
      <td>0.063291</td>
      <td>0.069620</td>
      <td>0.082278</td>
      <td>0.018987</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>2022-01-03</th>
      <td>0.214286</td>
      <td>0.150000</td>
      <td>0.164286</td>
      <td>0.085714</td>
      <td>0.107143</td>
      <td>0.071429</td>
      <td>0.057143</td>
      <td>0.057143</td>
      <td>0.078571</td>
      <td>0.007143</td>
      <td>0.007143</td>
    </tr>
    <tr>
      <th>2022-01-04</th>
      <td>0.136054</td>
      <td>0.170068</td>
      <td>0.170068</td>
      <td>0.108844</td>
      <td>0.108844</td>
      <td>0.068027</td>
      <td>0.054422</td>
      <td>0.061224</td>
      <td>0.088435</td>
      <td>0.020408</td>
      <td>0.013605</td>
    </tr>
    <tr>
      <th>2022-01-05</th>
      <td>0.113333</td>
      <td>0.146667</td>
      <td>0.146667</td>
      <td>0.126667</td>
      <td>0.140000</td>
      <td>0.100000</td>
      <td>0.033333</td>
      <td>0.040000</td>
      <td>0.126667</td>
      <td>NaN</td>
      <td>0.026667</td>
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
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>2022-12-26</th>
      <td>0.255814</td>
      <td>0.217054</td>
      <td>0.193798</td>
      <td>0.062016</td>
      <td>0.108527</td>
      <td>0.015504</td>
      <td>0.031008</td>
      <td>0.023256</td>
      <td>0.046512</td>
      <td>0.031008</td>
      <td>0.015504</td>
    </tr>
    <tr>
      <th>2022-12-27</th>
      <td>0.365217</td>
      <td>0.217391</td>
      <td>0.095652</td>
      <td>0.095652</td>
      <td>0.113043</td>
      <td>NaN</td>
      <td>0.026087</td>
      <td>0.017391</td>
      <td>0.043478</td>
      <td>0.008696</td>
      <td>0.017391</td>
    </tr>
    <tr>
      <th>2022-12-28</th>
      <td>0.291667</td>
      <td>0.220238</td>
      <td>0.160714</td>
      <td>0.095238</td>
      <td>0.077381</td>
      <td>0.023810</td>
      <td>0.023810</td>
      <td>0.035714</td>
      <td>0.017857</td>
      <td>0.023810</td>
      <td>0.029762</td>
    </tr>
    <tr>
      <th>2022-12-29</th>
      <td>0.269504</td>
      <td>0.234043</td>
      <td>0.141844</td>
      <td>0.120567</td>
      <td>0.078014</td>
      <td>0.014184</td>
      <td>0.035461</td>
      <td>0.007092</td>
      <td>0.042553</td>
      <td>0.042553</td>
      <td>0.014184</td>
    </tr>
    <tr>
      <th>2022-12-30</th>
      <td>0.227848</td>
      <td>0.189873</td>
      <td>0.196203</td>
      <td>0.120253</td>
      <td>0.120253</td>
      <td>NaN</td>
      <td>0.037975</td>
      <td>0.044304</td>
      <td>0.044304</td>
      <td>0.018987</td>
      <td>NaN</td>
    </tr>
  </tbody>
</table>
<p>364 rows × 11 columns</p>
</div>




```python
# Plot the data as an area chart
ax = data.plot.area(figsize=(8, 6),fontsize=13.5,color=colors)
ax.xaxis.set_major_formatter(mdates.DateFormatter('%b'))
ax.set_title('\nBitcoin Mining Pool \nDominance (2022)\n',fontsize=22,fontdict={'font':'arial'})
ax.axhline(0.5, linestyle='--', color='black')
plt.xlim([miners_tagged.index[0],miners_tagged.index[-1]])
plt.ylim(0,1)
plt.yticks([0.2, 0.4, 0.6, 0.8, 1.0], ['20%','40%','60%','80%','100%'],fontdict={'font':'arial','size':15})
plt.legend(bbox_to_anchor=(1,1),frameon=False)
plt.annotate('Source: Coin Metrics ATLAS',weight='book',font='arial',xy=(1.001, 0.001), xycoords='axes fraction',color='black',xytext=(-8, 6), textcoords='offset pixels',horizontalalignment='right',verticalalignment='bottom')
plt.savefig('./Pool-Dominance.png',facecolor='white',dpi=100)
plt.show()
```


    
![png](output_25_0.png)
    



```python
total_blocks = pd.DataFrame(miners_tagged.index.value_counts())
total_blocks.rename(columns={total_blocks.columns[0]: 'Total Blocks'}, inplace=True)
total_blocks
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
      <th>Total Blocks</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2022-02-12</th>
      <td>187</td>
    </tr>
    <tr>
      <th>2022-09-11</th>
      <td>183</td>
    </tr>
    <tr>
      <th>2022-10-01</th>
      <td>181</td>
    </tr>
    <tr>
      <th>2022-01-13</th>
      <td>179</td>
    </tr>
    <tr>
      <th>2022-06-08</th>
      <td>178</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
    </tr>
    <tr>
      <th>2022-12-27</th>
      <td>115</td>
    </tr>
    <tr>
      <th>2022-07-13</th>
      <td>110</td>
    </tr>
    <tr>
      <th>2022-11-26</th>
      <td>109</td>
    </tr>
    <tr>
      <th>2022-06-17</th>
      <td>108</td>
    </tr>
    <tr>
      <th>2022-12-24</th>
      <td>89</td>
    </tr>
  </tbody>
</table>
<p>364 rows × 1 columns</p>
</div>




```python
empty_blocks = miners_tagged.groupby([miners_tagged.index.date,miners_tagged.miner])['category'].value_counts()
empty_blocks = empty_blocks.unstack()
```


```python
empty_blocks = pd.DataFrame(empty_blocks.reset_index()).fillna(0).set_index('level_0')
empty_blocks
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
      <th>category</th>
      <th>miner</th>
      <th>Empty</th>
      <th>Not Empty</th>
    </tr>
    <tr>
      <th>level_0</th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2022-01-01</th>
      <td>AntPool</td>
      <td>0.0</td>
      <td>33.0</td>
    </tr>
    <tr>
      <th>2022-01-01</th>
      <td>BTC.com</td>
      <td>0.0</td>
      <td>4.0</td>
    </tr>
    <tr>
      <th>2022-01-01</th>
      <td>Binance Pool</td>
      <td>0.0</td>
      <td>24.0</td>
    </tr>
    <tr>
      <th>2022-01-01</th>
      <td>Braiins Pool</td>
      <td>0.0</td>
      <td>9.0</td>
    </tr>
    <tr>
      <th>2022-01-01</th>
      <td>F2Pool</td>
      <td>0.0</td>
      <td>27.0</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>2022-12-30</th>
      <td>F2Pool</td>
      <td>0.0</td>
      <td>31.0</td>
    </tr>
    <tr>
      <th>2022-12-30</th>
      <td>Foundry</td>
      <td>0.0</td>
      <td>36.0</td>
    </tr>
    <tr>
      <th>2022-12-30</th>
      <td>Luxor</td>
      <td>0.0</td>
      <td>3.0</td>
    </tr>
    <tr>
      <th>2022-12-30</th>
      <td>Other</td>
      <td>0.0</td>
      <td>7.0</td>
    </tr>
    <tr>
      <th>2022-12-30</th>
      <td>ViaBTC</td>
      <td>0.0</td>
      <td>19.0</td>
    </tr>
  </tbody>
</table>
<p>3862 rows × 3 columns</p>
</div>




```python
df_pivot = empty_blocks.pivot_table(index=empty_blocks.index, columns="miner", values="Empty")
df_pivot = df_pivot.join(total_blocks[['Total Blocks']])
df_pivot = df_pivot.fillna(0)
df_pivot
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
      <th>AntPool</th>
      <th>BTC.com</th>
      <th>Binance Pool</th>
      <th>Braiins Pool</th>
      <th>F2Pool</th>
      <th>Foundry</th>
      <th>Luxor</th>
      <th>MARA Pool</th>
      <th>Other</th>
      <th>Poolin</th>
      <th>ViaBTC</th>
      <th>Total Blocks</th>
    </tr>
    <tr>
      <th>level_0</th>
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
      <th>2022-01-01</th>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>172</td>
    </tr>
    <tr>
      <th>2022-01-02</th>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>158</td>
    </tr>
    <tr>
      <th>2022-01-03</th>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>140</td>
    </tr>
    <tr>
      <th>2022-01-04</th>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>147</td>
    </tr>
    <tr>
      <th>2022-01-05</th>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>150</td>
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
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>2022-12-26</th>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>129</td>
    </tr>
    <tr>
      <th>2022-12-27</th>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>115</td>
    </tr>
    <tr>
      <th>2022-12-28</th>
      <td>1.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>168</td>
    </tr>
    <tr>
      <th>2022-12-29</th>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>141</td>
    </tr>
    <tr>
      <th>2022-12-30</th>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>158</td>
    </tr>
  </tbody>
</table>
<p>364 rows × 12 columns</p>
</div>




```python
df_empty = df_pivot.iloc[:,0:].div(df_pivot['Total Blocks'], axis=0)
df_empty = df_empty.drop(df_empty.columns[-1:], axis=1)
```


```python
df_empty = df_empty[averages]
```


```python
ax = df_empty.plot.bar(figsize=(8, 6),stacked=True,fontsize=13.5,color=colors,width=1.2)
plt.title('\nEmpty Blocks\nTotal Percentage (2022)\n', fontdict = {'size':18, 'font': 'arial'})
ax.xaxis.set_major_locator(mdates.MonthLocator())
ax.xaxis.set_major_formatter(mdates.DateFormatter('%b'))
plt.xticks(rotation=0)
plt.xlabel('')
plt.legend(bbox_to_anchor=(1,1),frameon=False)
plt.yticks([0.005, 0.010, 0.015, 0.02, 0.025], ['0.5%','1.0%','1.5%','2.0%','2.5%'],fontdict={'size':14})
plt.grid(True, axis='y',linestyle='--',alpha=0.5)
plt.annotate('Source: Coin Metrics ATLAS',weight='book',font='arial',xy=(1.00, 0.953), xycoords='axes fraction',color='black',xytext=(-8, 6), textcoords='offset pixels',horizontalalignment='right',verticalalignment='bottom')
plt.savefig('./Empty-Blocks-Total-2022.png',facecolor='white',dpi=100)
plt.xlabel('');
```


    
![png](output_32_0.png)
    



```python
empty_blocks_total = pd.DataFrame(miners_tagged.groupby([miners_tagged.miner])['category'].value_counts(normalize=True))
empty_blocks_total = empty_blocks_total.unstack().fillna(0)
empty_blocks_total.columns = empty_blocks_total.columns.droplevel(0)
empty_blocks_total = empty_blocks_total.reindex(averages)
empty_blocks_total
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
      <th>category</th>
      <th>Empty</th>
      <th>Not Empty</th>
    </tr>
    <tr>
      <th>miner</th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Foundry</th>
      <td>0.000000</td>
      <td>1.000000</td>
    </tr>
    <tr>
      <th>AntPool</th>
      <td>0.002657</td>
      <td>0.997343</td>
    </tr>
    <tr>
      <th>F2Pool</th>
      <td>0.003707</td>
      <td>0.996293</td>
    </tr>
    <tr>
      <th>Binance Pool</th>
      <td>0.005204</td>
      <td>0.994796</td>
    </tr>
    <tr>
      <th>ViaBTC</th>
      <td>0.006603</td>
      <td>0.993397</td>
    </tr>
    <tr>
      <th>Poolin</th>
      <td>0.000903</td>
      <td>0.999097</td>
    </tr>
    <tr>
      <th>Braiins Pool</th>
      <td>0.003862</td>
      <td>0.996138</td>
    </tr>
    <tr>
      <th>BTC.com</th>
      <td>0.003584</td>
      <td>0.996416</td>
    </tr>
    <tr>
      <th>Other</th>
      <td>0.001529</td>
      <td>0.998471</td>
    </tr>
    <tr>
      <th>Luxor</th>
      <td>0.000000</td>
      <td>1.000000</td>
    </tr>
    <tr>
      <th>MARA Pool</th>
      <td>0.000000</td>
      <td>1.000000</td>
    </tr>
  </tbody>
</table>
</div>




```python
pool_total_blocks = pd.DataFrame(miners_tagged['miner'].value_counts())
pool_total_blocks = pool_total_blocks.drop('Other')
pool_total_blocks.rename(columns={pool_total_blocks.columns[0]: 'Total Blocks Mined'}, inplace=True)
pool_total_blocks
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
      <th>Total Blocks Mined</th>
    </tr>
    <tr>
      <th>miner</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Foundry</th>
      <td>11802</td>
    </tr>
    <tr>
      <th>AntPool</th>
      <td>8658</td>
    </tr>
    <tr>
      <th>F2Pool</th>
      <td>7824</td>
    </tr>
    <tr>
      <th>Binance Pool</th>
      <td>6149</td>
    </tr>
    <tr>
      <th>ViaBTC</th>
      <td>5149</td>
    </tr>
    <tr>
      <th>Poolin</th>
      <td>4431</td>
    </tr>
    <tr>
      <th>Braiins Pool</th>
      <td>2848</td>
    </tr>
    <tr>
      <th>BTC.com</th>
      <td>2232</td>
    </tr>
    <tr>
      <th>Luxor</th>
      <td>1359</td>
    </tr>
    <tr>
      <th>MARA Pool</th>
      <td>618</td>
    </tr>
  </tbody>
</table>
</div>




```python
row_num = empty_blocks_total.index.get_loc('Other')
colors_no_other = np.delete(colors, row_num)
empty_blocks_total = empty_blocks_total.drop('Other')
```


```python
pool_total_blocks.reset_index()
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
      <th>miner</th>
      <th>Total Blocks Mined</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>Foundry</td>
      <td>11802</td>
    </tr>
    <tr>
      <th>1</th>
      <td>AntPool</td>
      <td>8658</td>
    </tr>
    <tr>
      <th>2</th>
      <td>F2Pool</td>
      <td>7824</td>
    </tr>
    <tr>
      <th>3</th>
      <td>Binance Pool</td>
      <td>6149</td>
    </tr>
    <tr>
      <th>4</th>
      <td>ViaBTC</td>
      <td>5149</td>
    </tr>
    <tr>
      <th>5</th>
      <td>Poolin</td>
      <td>4431</td>
    </tr>
    <tr>
      <th>6</th>
      <td>Braiins Pool</td>
      <td>2848</td>
    </tr>
    <tr>
      <th>7</th>
      <td>BTC.com</td>
      <td>2232</td>
    </tr>
    <tr>
      <th>8</th>
      <td>Luxor</td>
      <td>1359</td>
    </tr>
    <tr>
      <th>9</th>
      <td>MARA Pool</td>
      <td>618</td>
    </tr>
  </tbody>
</table>
</div>




```python
ax = empty_blocks_total['Empty'].plot.bar(figsize=(8, 6),stacked=True,fontsize=12,color=colors_no_other,width=0.8,zorder=2)
def format_percent(x, pos):
    return '{:.2%}'.format(x)
formatter = FuncFormatter(format_percent)
ax.yaxis.set_major_formatter(formatter)
plt.xticks(rotation=45,size=12)
plt.yticks(rotation=0,size=12)
plt.title('\nEmpty Blocks vs. Total Blocks\nby Mining Pool (2022)\n', fontdict = {'size':18, 'font': 'arial'})
plt.xlabel('');
plt.ylabel('Empty Blocks (%)',fontsize=14,labelpad=10);
plt.tick_params(axis='both', which='both', length=0, pad=8)
plt.ylim(0,0.007)
ax.grid(True, axis='y',linestyle='--',zorder=1,alpha=0.5)
ax2 = ax.twinx()
pool_total_blocks.plot.line(ax=ax2,color='black',linestyle='--',legend=True)
pool_total_blocks.reset_index().plot.scatter(x='miner',y='Total Blocks Mined',ax=ax2,color='black', s=50)
ax2.set_yticks([0,2000,4000,6000,8000,10000,12000,14000])
plt.ylim(0,14000)
ax2.yaxis.set_major_formatter(mtick.StrMethodFormatter('{x:,.0f}'))
plt.legend(bbox_to_anchor=(1,1.0),frameon=False,fontsize=11.3)
plt.tick_params(axis='both', which='both', length=0, pad=8)
plt.yticks(rotation=0,size=12)
plt.ylabel('Total Blocks Mined\n',fontsize=14,labelpad=10);
plt.annotate(
    'Source: Coin Metrics ATLAS',
    weight='book',
    font='arial',
    fontsize=12,
    xy=(1.0, 1.0),
    xycoords='axes fraction',
    color='black',
    xytext=(-8, 6),
    textcoords='offset pixels',
    horizontalalignment='right',
    verticalalignment='bottom'
)
plt.savefig('./Empty-Blocks-by-Pool.png',facecolor='white',dpi=100)
```


    
![png](output_37_0.png)
    



```python

```


```python

```


```python

```
