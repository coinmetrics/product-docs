# NDP: Mining Pool Dominance

![](https://5264302.fs1.hubspotusercontent-na1.net/hubfs/5264302/Demo%20Asset%20Resources/CM-Demo-miner\_signatures.png)

For much of its history, the Bitcoin mining industry has been notoriously opaque. Luckily, it has become a common practice for many BTC mining pools to leave a subtle "miner signature" in each block's coinbase transaction (not to be confused with the popular crypto exchange by the same name). This transaction contains the miner reward— currently 6.25 BTC per block—but also leaves some extra space for arbitrary data, allowing the pool to publicly assert their claim. Using ATLAS v2, we're able to extract this miner signature, enabling us to derive a variety of mining pool metrics.

### Resources

This notebook demonstrates basic functionality offered by the Coin Metrics Python API Client and ATLAS blockchain search engine.

Coin Metrics offers a vast assortment of data for hundreds of cryptoassets. The Python API Client allows for easy access to this data using Python without needing to create your own wrappers using `requests` and other such libraries.

To understand the data that Coin Metrics offers, feel free to peruse the resources below.

* The [Coin Metrics API v4](https://docs.coinmetrics.io/api/v4) website contains the full set of endpoints and data offered by Coin Metrics.
* The [Coin Metrics Knowledge Base](https://docs.coinmetrics.io/info) gives detailed, conceptual explanations of the data that Coin Metrics offers.
* The [API Spec](https://coinmetrics.github.io/api-client-python/site/api\_client.html) contains a full list of functions.

### Notebook Setup

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

```
2024-09-20 15:39:25 INFO     Using API key found in environment
```

```python
colors = np.unique(cmr.take_cmap_colors('Set3', 15, return_fmt='hex'))
colors
```

```
array(['#80B1D3', '#8DD3C7', '#B3DE69', '#BC80BD', '#BEBADA', '#CCEBC5',
       '#D9D9D9', '#FB8072', '#FCCDE5', '#FDB462', '#FFED6F', '#FFFFB3'],
      dtype='<U7')
```

## ATLAS V2

### Retrieve Block Info

```python
block_info = client.get_list_of_blocks_v2(
    asset='btc',
    start_time="2022-01-01",
    end_time="2022-12-31",
    page_size=1000
).parallel(time_increment=timedelta(days=1)).to_dataframe()
block_info['extra_data'] = block_info['extra_data'].astype(str)
```

```
Exporting to dataframe type: 100%|████████████████████████████████████████████████| 364/364 [00:07<00:00, 48.53it/s]
```

```python
block_info.head()
```

|   | block\_hash                                       | height | consensus\_time           | miner\_time               | n\_transactions | n\_balance\_updates | parent\_block\_hash                               | nonce    | extra\_data                                       | version   | difficulty           | physical\_size | consensus\_size | consensus\_size\_limit |
| - | ------------------------------------------------- | ------ | ------------------------- | ------------------------- | --------------- | ------------------- | ------------------------------------------------- | -------- | ------------------------------------------------- | --------- | -------------------- | -------------- | --------------- | ---------------------- |
| 0 | 000000000000000000090759121a6def30d18f2ccaad98... | 716604 | 2022-01-01 00:04:14+00:00 | 2022-01-01 00:34:54+00:00 | 997             | 7834                | 000000000000000000072ba79db2b57c4efa08f11f1d8f... | 49519865 | 033cef0a04aea1cf61fabe6d6d6c7c4d17f3eff2236dc8... | 803250176 | 24272331996979.96875 | 737766         | 1840962         | 4000000                |
| 1 | 0000000000000000000aa5bba90cc9c90a6a18b8a2160c... | 716605 | 2022-01-01 00:14:14+00:00 | 2022-01-01 00:39:14+00:00 | 674             | 3920                | 000000000000000000090759121a6def30d18f2ccaad98... | 85736e7b | 033def0a1362696e616e63652f383039ff001f0373a22e... | 536870912 | 24272331996979.96875 | 282321         | 765462          | 4000000                |
| 2 | 00000000000000000005bd3c5d5c6da98d2d4a12460bfe... | 716606 | 2022-01-01 00:20:25+00:00 | 2022-01-01 00:39:58+00:00 | 123             | 701                 | 0000000000000000000aa5bba90cc9c90a6a18b8a2160c... | 703bda04 | 033eef0a1b4d696e656420627920416e74506f6f6c3734... | 536870916 | 24272331996979.96875 | 45448          | 127885          | 4000000                |
| 3 | 00000000000000000000827b0c8805e164da3e3061fff1... | 716607 | 2022-01-01 00:23:25+00:00 | 2022-01-01 00:40:00+00:00 | 5               | 18                  | 00000000000000000005bd3c5d5c6da98d2d4a12460bfe... | a0953825 | 033fef0a04dfa2cf612f53424943727970746f2e636f6d... | 536870916 | 24272331996979.96875 | 1143           | 3483            | 4000000                |
| 4 | 00000000000000000000bb3583fa3d8d9fd6332364ca62... | 716608 | 2022-01-01 00:28:47+00:00 | 2022-01-01 00:46:21+00:00 | 973             | 6925                | 00000000000000000000827b0c8805e164da3e3061fff1... | 241dba29 | 0340ef0a215c204d41524120506f6f6c205c000000004f... | 877617152 | 24272331996979.96875 | 538084         | 1455358         | 4000000                |

```python
# Assign 'empty' to rows where n_transactions == 1
block_info.loc[block_info['n_transactions'] == 1, 'category'] = 'Empty'

# Assign 'not empty' to remaining rows
block_info.loc[block_info['n_transactions'] != 1, 'category'] = 'Not Empty'
```

```python
block_info['extra_data'][0]
```

```
'033cef0a04aea1cf61fabe6d6d6c7c4d17f3eff2236dc876b0acc7bdc4d68ad831ba71d31ff61ce512d1e99e46020000001e34c5f062696e616e63652f686b37343772185774914865669376226bd21ef100000000000000'
```

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

|       | miner\_tag                                          | height | consensus\_time           | category  |
| ----- | --------------------------------------------------- | ------ | ------------------------- | --------- |
| 0     | <ï\n®¡Ïaú¾mml\|Móïò#mÈv°¬Ç½ÄÖØ1ºqÓöåÑéF...  | 716604 | 2022-01-01 00:04:14+00:00 | Not Empty |
| 1     | =ï\nbinance/809ÿ�s¢.Eú¾mmZ/Â@£"\[ÄÖ\|}öOÓ½... | 716605 | 2022-01-01 00:14:14+00:00 | Not Empty |
| 2     | >ï\nMined by AntPool749ÿsäÖKú¾mm? nø\rz...   | 716606 | 2022-01-01 00:20:25+00:00 | Not Empty |
| 3     | ?ï\nß¢Ïa/SBICrypto.com Pool/L8¨O ������          | 716607 | 2022-01-01 00:23:25+00:00 | Not Empty |
| 4     | @ï\n!\ MARA Pool \����Oç>ð§/Gt<���             | 716608 | 2022-01-01 00:28:47+00:00 | Not Empty |
| ...   | ...                                                 | ...    | ...                       | ...       |
| 53027 | \_¾ \|¯c/Foundry USA Pool #dropgold/ Q!Ù������ | 769631 | 2022-12-30 23:25:11+00:00 | Not Empty |
| 53028 | \`¾ Mined by AntPool959\[�Q§õ-ìú¾mm²99ßãï6... | 769632 | 2022-12-30 23:31:09+00:00 | Not Empty |
| 53029 | a¾ ,ú¾mmô±\t¥ü&óvm-1L´A¿ºVz¨µYTk@}Þò?(���...   | 769633 | 2022-12-30 23:39:09+00:00 | Not Empty |
| 53030 | b¾ Ã¯c/Foundry USA Pool #dropgold/A��6���   | 769634 | 2022-12-30 23:40:35+00:00 | Not Empty |
| 53031 | c¾ ú¾mmeè«úÆruÎ7æB¿"LNýôKü¦#âÓ\[�����...  | 769635 | 2022-12-30 23:47:15+00:00 | Not Empty |

53032 rows × 4 columns

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

|                           | miner\_tag                                          | height | category  | miner     |
| ------------------------- | --------------------------------------------------- | ------ | --------- | --------- |
| consensus\_time           |                                                     |        |           |           |
| 2022-01-01 00:04:14+00:00 | <ï\n®¡Ïaú¾mml\|Móïò#mÈv°¬Ç½ÄÖØ1ºqÓöåÑéF...  | 716604 | Not Empty | binance   |
| 2022-01-01 00:14:14+00:00 | =ï\nbinance/809ÿ�s¢.Eú¾mmZ/Â@£"\[ÄÖ\|}öOÓ½... | 716605 | Not Empty | binance   |
| 2022-01-01 00:20:25+00:00 | >ï\nMined by AntPool749ÿsäÖKú¾mm? nø\rz...   | 716606 | Not Empty | AntPool   |
| 2022-01-01 00:23:25+00:00 | ?ï\nß¢Ïa/SBICrypto.com Pool/L8¨O ������          | 716607 | Not Empty | Other     |
| 2022-01-01 00:28:47+00:00 | @ï\n!\ MARA Pool \����Oç>ð§/Gt<���             | 716608 | Not Empty | MARA Pool |
| ...                       | ...                                                 | ...    | ...       | ...       |
| 2022-12-30 23:25:11+00:00 | \_¾ \|¯c/Foundry USA Pool #dropgold/ Q!Ù������ | 769631 | Not Empty | Foundry   |
| 2022-12-30 23:31:09+00:00 | \`¾ Mined by AntPool959\[�Q§õ-ìú¾mm²99ßãï6... | 769632 | Not Empty | AntPool   |
| 2022-12-30 23:39:09+00:00 | a¾ ,ú¾mmô±\t¥ü&óvm-1L´A¿ºVz¨µYTk@}Þò?(���...   | 769633 | Not Empty | F2Pool    |
| 2022-12-30 23:40:35+00:00 | b¾ Ã¯c/Foundry USA Pool #dropgold/A��6���   | 769634 | Not Empty | Foundry   |
| 2022-12-30 23:47:15+00:00 | c¾ ú¾mmeè«úÆruÎ7æB¿"LNýôKü¦#âÓ\[�����...  | 769635 | Not Empty | slush     |

53032 rows × 4 columns

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

|            | miner\_tag                                          | height | category  | miner     |
| ---------- | --------------------------------------------------- | ------ | --------- | --------- |
| 2022-01-01 | <ï\n®¡Ïaú¾mml\|Móïò#mÈv°¬Ç½ÄÖØ1ºqÓöåÑéF...  | 716604 | Not Empty | binance   |
| 2022-01-01 | =ï\nbinance/809ÿ�s¢.Eú¾mmZ/Â@£"\[ÄÖ\|}öOÓ½... | 716605 | Not Empty | binance   |
| 2022-01-01 | >ï\nMined by AntPool749ÿsäÖKú¾mm? nø\rz...   | 716606 | Not Empty | AntPool   |
| 2022-01-01 | ?ï\nß¢Ïa/SBICrypto.com Pool/L8¨O ������          | 716607 | Not Empty | Other     |
| 2022-01-01 | @ï\n!\ MARA Pool \����Oç>ð§/Gt<���             | 716608 | Not Empty | MARA Pool |
| ...        | ...                                                 | ...    | ...       | ...       |
| 2022-12-30 | \_¾ \|¯c/Foundry USA Pool #dropgold/ Q!Ù������ | 769631 | Not Empty | Foundry   |
| 2022-12-30 | \`¾ Mined by AntPool959\[�Q§õ-ìú¾mm²99ßãï6... | 769632 | Not Empty | AntPool   |
| 2022-12-30 | a¾ ,ú¾mmô±\t¥ü&óvm-1L´A¿ºVz¨µYTk@}Þò?(���...   | 769633 | Not Empty | F2Pool    |
| 2022-12-30 | b¾ Ã¯c/Foundry USA Pool #dropgold/A��6���   | 769634 | Not Empty | Foundry   |
| 2022-12-30 | c¾ ú¾mmeè«úÆruÎ7æB¿"LNýôKü¦#âÓ\[�����...  | 769635 | Not Empty | slush     |

53032 rows × 4 columns

```python
other_miners = miners_tagged.loc[miners_tagged['miner'] == 'Other']
other_miners
```

|            | miner\_tag                                         | height | category  | miner |
| ---------- | -------------------------------------------------- | ------ | --------- | ----- |
| 2022-01-01 | ?ï\nß¢Ïa/SBICrypto.com Pool/L8¨O ������         | 716607 | Not Empty | Other |
| 2022-01-01 | Hï\nä¶Ïa//ú¾mmWdîìdùªýQR:ë¹w4Q'À\*Á\t#{>... | 716616 | Not Empty | Other |
| 2022-01-01 | Sï\nÌÕÏa//ú¾mmgk<»\n\`!5 jZBgÇyza­7ø... | 716627 | Not Empty | Other |
| 2022-01-01 | \`ï\nèÏa/SBICrypto.com Pool/¡R:«j���        | 716640 | Not Empty | Other |
| 2022-01-01 | jï\n@Ða/SBICrypto.com Pool/S!Y I����         | 716650 | Not Empty | Other |
| ...        | ...                                                | ...    | ...       | ...   |
| 2022-12-30 | à½ Åp®c/SBICrypto.com Pool/Jñ1£²�����          | 769504 | Not Empty | Other |
| 2022-12-30 | õ½ ­£®c/SBICrypto.com Pool/»Ì1¾�����          | 769525 | Not Empty | Other |
| 2022-12-30 | ¾  \t\t\t \t\t \t@°$����                    | 769550 | Not Empty | Other |
| 2022-12-30 | ¾ Çþ®c/SBICrypto.com Pool/ºï¢&{�����          | 769563 | Not Empty | Other |
| 2022-12-30 | ¾  \t\t\t \t\t \t4 ü4����                    | 769567 | Not Empty | Other |

1962 rows × 4 columns

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

| miner      | Foundry  | AntPool  | F2Pool   | Binance Pool | ViaBTC   | Poolin   | Braiins Pool | BTC.com  | Other    | Luxor    | MARA Pool |
| ---------- | -------- | -------- | -------- | ------------ | -------- | -------- | ------------ | -------- | -------- | -------- | --------- |
| 2022-01-01 | 0.191860 | 0.191860 | 0.156977 | 0.139535     | 0.104651 | 0.034884 | 0.052326     | 0.023256 | 0.081395 | 0.017442 | 0.005814  |
| 2022-01-02 | 0.145570 | 0.164557 | 0.126582 | 0.158228     | 0.113924 | 0.056962 | 0.063291     | 0.069620 | 0.082278 | 0.018987 | NaN       |
| 2022-01-03 | 0.214286 | 0.150000 | 0.164286 | 0.085714     | 0.107143 | 0.071429 | 0.057143     | 0.057143 | 0.078571 | 0.007143 | 0.007143  |
| 2022-01-04 | 0.136054 | 0.170068 | 0.170068 | 0.108844     | 0.108844 | 0.068027 | 0.054422     | 0.061224 | 0.088435 | 0.020408 | 0.013605  |
| 2022-01-05 | 0.113333 | 0.146667 | 0.146667 | 0.126667     | 0.140000 | 0.100000 | 0.033333     | 0.040000 | 0.126667 | NaN      | 0.026667  |
| ...        | ...      | ...      | ...      | ...          | ...      | ...      | ...          | ...      | ...      | ...      | ...       |
| 2022-12-26 | 0.255814 | 0.217054 | 0.193798 | 0.062016     | 0.108527 | 0.015504 | 0.031008     | 0.023256 | 0.046512 | 0.031008 | 0.015504  |
| 2022-12-27 | 0.365217 | 0.217391 | 0.095652 | 0.095652     | 0.113043 | NaN      | 0.026087     | 0.017391 | 0.043478 | 0.008696 | 0.017391  |
| 2022-12-28 | 0.291667 | 0.220238 | 0.160714 | 0.095238     | 0.077381 | 0.023810 | 0.023810     | 0.035714 | 0.017857 | 0.023810 | 0.029762  |
| 2022-12-29 | 0.269504 | 0.234043 | 0.141844 | 0.120567     | 0.078014 | 0.014184 | 0.035461     | 0.007092 | 0.042553 | 0.042553 | 0.014184  |
| 2022-12-30 | 0.227848 | 0.189873 | 0.196203 | 0.120253     | 0.120253 | NaN      | 0.037975     | 0.044304 | 0.044304 | 0.018987 | NaN       |

364 rows × 11 columns

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

![png](../../getting-started/tutorials/output\_25\_0.png)

```python
total_blocks = pd.DataFrame(miners_tagged.index.value_counts())
total_blocks.rename(columns={total_blocks.columns[0]: 'Total Blocks'}, inplace=True)
total_blocks
```

|            | Total Blocks |
| ---------- | ------------ |
| 2022-02-12 | 187          |
| 2022-09-11 | 183          |
| 2022-10-01 | 181          |
| 2022-01-13 | 179          |
| 2022-06-08 | 178          |
| ...        | ...          |
| 2022-12-27 | 115          |
| 2022-07-13 | 110          |
| 2022-11-26 | 109          |
| 2022-06-17 | 108          |
| 2022-12-24 | 89           |

364 rows × 1 columns

```python
empty_blocks = miners_tagged.groupby([miners_tagged.index.date,miners_tagged.miner])['category'].value_counts()
empty_blocks = empty_blocks.unstack()
```

```python
empty_blocks = pd.DataFrame(empty_blocks.reset_index()).fillna(0).set_index('level_0')
empty_blocks
```

| category   | miner        | Empty | Not Empty |
| ---------- | ------------ | ----- | --------- |
| level\_0   |              |       |           |
| 2022-01-01 | AntPool      | 0.0   | 33.0      |
| 2022-01-01 | BTC.com      | 0.0   | 4.0       |
| 2022-01-01 | Binance Pool | 0.0   | 24.0      |
| 2022-01-01 | Braiins Pool | 0.0   | 9.0       |
| 2022-01-01 | F2Pool       | 0.0   | 27.0      |
| ...        | ...          | ...   | ...       |
| 2022-12-30 | F2Pool       | 0.0   | 31.0      |
| 2022-12-30 | Foundry      | 0.0   | 36.0      |
| 2022-12-30 | Luxor        | 0.0   | 3.0       |
| 2022-12-30 | Other        | 0.0   | 7.0       |
| 2022-12-30 | ViaBTC       | 0.0   | 19.0      |

3862 rows × 3 columns

```python
df_pivot = empty_blocks.pivot_table(index=empty_blocks.index, columns="miner", values="Empty")
df_pivot = df_pivot.join(total_blocks[['Total Blocks']])
df_pivot = df_pivot.fillna(0)
df_pivot
```

|            | AntPool | BTC.com | Binance Pool | Braiins Pool | F2Pool | Foundry | Luxor | MARA Pool | Other | Poolin | ViaBTC | Total Blocks |
| ---------- | ------- | ------- | ------------ | ------------ | ------ | ------- | ----- | --------- | ----- | ------ | ------ | ------------ |
| level\_0   |         |         |              |              |        |         |       |           |       |        |        |              |
| 2022-01-01 | 0.0     | 0.0     | 0.0          | 0.0          | 0.0    | 0.0     | 0.0   | 0.0       | 0.0   | 0.0    | 0.0    | 172          |
| 2022-01-02 | 0.0     | 0.0     | 1.0          | 0.0          | 0.0    | 0.0     | 0.0   | 0.0       | 0.0   | 0.0    | 0.0    | 158          |
| 2022-01-03 | 0.0     | 0.0     | 1.0          | 0.0          | 0.0    | 0.0     | 0.0   | 0.0       | 0.0   | 0.0    | 0.0    | 140          |
| 2022-01-04 | 0.0     | 0.0     | 0.0          | 0.0          | 0.0    | 0.0     | 0.0   | 0.0       | 0.0   | 0.0    | 0.0    | 147          |
| 2022-01-05 | 0.0     | 0.0     | 0.0          | 0.0          | 0.0    | 0.0     | 0.0   | 0.0       | 0.0   | 0.0    | 0.0    | 150          |
| ...        | ...     | ...     | ...          | ...          | ...    | ...     | ...   | ...       | ...   | ...    | ...    | ...          |
| 2022-12-26 | 0.0     | 0.0     | 0.0          | 0.0          | 0.0    | 0.0     | 0.0   | 0.0       | 0.0   | 0.0    | 0.0    | 129          |
| 2022-12-27 | 0.0     | 0.0     | 0.0          | 0.0          | 0.0    | 0.0     | 0.0   | 0.0       | 0.0   | 0.0    | 0.0    | 115          |
| 2022-12-28 | 1.0     | 0.0     | 0.0          | 0.0          | 0.0    | 0.0     | 0.0   | 0.0       | 0.0   | 0.0    | 0.0    | 168          |
| 2022-12-29 | 0.0     | 0.0     | 0.0          | 0.0          | 0.0    | 0.0     | 0.0   | 0.0       | 0.0   | 0.0    | 0.0    | 141          |
| 2022-12-30 | 0.0     | 0.0     | 0.0          | 0.0          | 0.0    | 0.0     | 0.0   | 0.0       | 0.0   | 0.0    | 0.0    | 158          |

364 rows × 12 columns

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

![png](../../getting-started/tutorials/output\_32\_0.png)

```python
empty_blocks_total = pd.DataFrame(miners_tagged.groupby([miners_tagged.miner])['category'].value_counts(normalize=True))
empty_blocks_total = empty_blocks_total.unstack().fillna(0)
empty_blocks_total.columns = empty_blocks_total.columns.droplevel(0)
empty_blocks_total = empty_blocks_total.reindex(averages)
empty_blocks_total
```

| category     | Empty    | Not Empty |
| ------------ | -------- | --------- |
| miner        |          |           |
| Foundry      | 0.000000 | 1.000000  |
| AntPool      | 0.002657 | 0.997343  |
| F2Pool       | 0.003707 | 0.996293  |
| Binance Pool | 0.005204 | 0.994796  |
| ViaBTC       | 0.006603 | 0.993397  |
| Poolin       | 0.000903 | 0.999097  |
| Braiins Pool | 0.003862 | 0.996138  |
| BTC.com      | 0.003584 | 0.996416  |
| Other        | 0.001529 | 0.998471  |
| Luxor        | 0.000000 | 1.000000  |
| MARA Pool    | 0.000000 | 1.000000  |

```python
pool_total_blocks = pd.DataFrame(miners_tagged['miner'].value_counts())
pool_total_blocks = pool_total_blocks.drop('Other')
pool_total_blocks.rename(columns={pool_total_blocks.columns[0]: 'Total Blocks Mined'}, inplace=True)
pool_total_blocks
```

|              | Total Blocks Mined |
| ------------ | ------------------ |
| miner        |                    |
| Foundry      | 11802              |
| AntPool      | 8658               |
| F2Pool       | 7824               |
| Binance Pool | 6149               |
| ViaBTC       | 5149               |
| Poolin       | 4431               |
| Braiins Pool | 2848               |
| BTC.com      | 2232               |
| Luxor        | 1359               |
| MARA Pool    | 618                |

```python
row_num = empty_blocks_total.index.get_loc('Other')
colors_no_other = np.delete(colors, row_num)
empty_blocks_total = empty_blocks_total.drop('Other')
```

```python
pool_total_blocks.reset_index()
```

|   | miner        | Total Blocks Mined |
| - | ------------ | ------------------ |
| 0 | Foundry      | 11802              |
| 1 | AntPool      | 8658               |
| 2 | F2Pool       | 7824               |
| 3 | Binance Pool | 6149               |
| 4 | ViaBTC       | 5149               |
| 5 | Poolin       | 4431               |
| 6 | Braiins Pool | 2848               |
| 7 | BTC.com      | 2232               |
| 8 | Luxor        | 1359               |
| 9 | MARA Pool    | 618                |

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

![png](../../getting-started/tutorials/output\_37\_0.png)

```python
```

```python
```

```python
```
