<img src="https://5264302.fs1.hubspotusercontent-na1.net/hubfs/5264302/Demo%20Asset%20Resources/Demo%20Covers/CM-Demo-avax_metrics-Cover.png" width=1100 margin-left='auto' margin-right='auto'/>

## Resources
This notebook demonstrates basic functionality offered by the Coin Metrics Python API Client and Network Data Pro.

Coin Metrics offers a vast assortment of data for hundreds of cryptoassets. The Python API Client allows for easy access to this data using Python without needing to create your own wrappers using `requests` and other such libraries.

To understand the data that Coin Metrics offers, feel free to peruse the resources below.

- The [Coin Metrics API v4](https://docs.coinmetrics.io/api/v4) website contains the full set of endpoints and data offered by Coin Metrics.
- The [Coin Metrics Knowledge Base](https://docs.coinmetrics.io/info) gives detailed, conceptual explanations of the data that Coin Metrics offers.
- The [API Spec](https://coinmetrics.github.io/api-client-python/site/api_client.html) contains a full list of functions.

### Notebook Setup


```python
from os import environ
import pandas as pd
import numpy as np
import seaborn as sns
import logging
from datetime import date, datetime, timedelta
from coinmetrics.api_client import CoinMetricsClient
import logging
import matplotlib.pyplot as plt
import matplotlib.ticker as ticker
import matplotlib
import warnings
%matplotlib inline
```


```python
logging.basicConfig(
    format='%(asctime)s %(levelname)-8s %(message)s',
    level=logging.INFO,
    datefmt='%Y-%m-%d %H:%M:%S'
)
matplotlib.rcParams['font.family'] = 'Lato'
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

    2024-09-10 18:32:25 INFO     Using API key found in environment


# New Avalanche (AVAX) Metrics

Coin Metrics is pleased to announce the release of our new metrics for the Avalanche (AVAX) smart contract blockchain. Avalanche offers a novel architecture of 3 interconnected chains: the Exchange Chain (X-Chain), the Contract Chain (C-Chain), and the Platform Chain (P-Chain).

In order to easily distinguish between activity on each chain, Coin Metrics offers Avalanche coverage under the following tickers:
- **AVAX (Aggregated Asset-Level Metrics):** https://coverage.coinmetrics.io/assets/avax
- **AVAXX (X-Chain Metrics):** https://coverage.coinmetrics.io/assets/avaxx
- **AVAXC (C-Chain Metrics):** https://coverage.coinmetrics.io/assets/avaxc
- **AVAXP (P-Chain Metrics):** https://coverage.coinmetrics.io/assets/avaxp

## Avalanche Market Cap Dominance

To examine market capitalization dominance of AVAX versus other smart contract platforms, we'll leverage the aggregated asset metric **CapMrktEstUSD.**


```python
start = '2021-01-01'
```


```python
market_cap_df = client.get_asset_metrics(
    assets=['eth','sol','avax','ada','bnb'],
    metrics=['CapMrktEstUSD'],
    start_time = start,
).to_dataframe()
```


```python
market_cap_df['time'] = pd.to_datetime(market_cap_df['time'])
```


```python
market_cap_df
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
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>ada</td>
      <td>2021-01-01 00:00:00+00:00</td>
      <td>5465653603.567236</td>
    </tr>
    <tr>
      <th>1</th>
      <td>ada</td>
      <td>2021-01-02 00:00:00+00:00</td>
      <td>5532934416.432623</td>
    </tr>
    <tr>
      <th>2</th>
      <td>ada</td>
      <td>2021-01-03 00:00:00+00:00</td>
      <td>6436518343.192099</td>
    </tr>
    <tr>
      <th>3</th>
      <td>ada</td>
      <td>2021-01-04 00:00:00+00:00</td>
      <td>6861478288.637813</td>
    </tr>
    <tr>
      <th>4</th>
      <td>ada</td>
      <td>2021-01-05 00:00:00+00:00</td>
      <td>8050669663.798552</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>6735</th>
      <td>sol</td>
      <td>2024-09-05 00:00:00+00:00</td>
      <td>60368322226.608711</td>
    </tr>
    <tr>
      <th>6736</th>
      <td>sol</td>
      <td>2024-09-06 00:00:00+00:00</td>
      <td>58314200040.23735</td>
    </tr>
    <tr>
      <th>6737</th>
      <td>sol</td>
      <td>2024-09-07 00:00:00+00:00</td>
      <td>59479665838.868263</td>
    </tr>
    <tr>
      <th>6738</th>
      <td>sol</td>
      <td>2024-09-08 00:00:00+00:00</td>
      <td>60790190313.36132</td>
    </tr>
    <tr>
      <th>6739</th>
      <td>sol</td>
      <td>2024-09-09 00:00:00+00:00</td>
      <td>63117947291.79084</td>
    </tr>
  </tbody>
</table>
<p>6740 rows × 3 columns</p>
</div>




```python
# Group by date and asset, then sum the CapMrktEstUSD for each group
grouped = market_cap_df.groupby(['time', 'asset'])['CapMrktEstUSD'].sum().reset_index()
# Calculate the total CapMrktEstUSD for each day
total_per_day = market_cap_df.groupby('time')['CapMrktEstUSD'].sum()
# Convert 'time' column to datetime in grouped DataFrame
grouped['time'] = pd.to_datetime(grouped['time'])
# Divide each group's sum by the total for the day to get the proportion
grouped['proportion'] = grouped.apply(lambda row: row['CapMrktEstUSD'] / total_per_day[row['time']], axis=1)
# Pivot the data to get a DataFrame with one column per asset
proportions = grouped.pivot(index='time', columns='asset', values='proportion')
ordered_proportions = proportions[proportions.columns[proportions.iloc[-1].argsort()[::-1]]]
ordered_proportions
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
      <th>eth</th>
      <th>bnb</th>
      <th>sol</th>
      <th>ada</th>
      <th>avax</th>
    </tr>
    <tr>
      <th>time</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2021-01-01 00:00:00+00:00</th>
      <td>0.879460</td>
      <td>0.058965</td>
      <td>0.000905</td>
      <td>0.057655</td>
      <td>0.003014</td>
    </tr>
    <tr>
      <th>2021-01-02 00:00:00+00:00</th>
      <td>0.884571</td>
      <td>0.056559</td>
      <td>0.000841</td>
      <td>0.055337</td>
      <td>0.002691</td>
    </tr>
    <tr>
      <th>2021-01-03 00:00:00+00:00</th>
      <td>0.897432</td>
      <td>0.048510</td>
      <td>0.000794</td>
      <td>0.051121</td>
      <td>0.002143</td>
    </tr>
    <tr>
      <th>2021-01-04 00:00:00+00:00</th>
      <td>0.898804</td>
      <td>0.045754</td>
      <td>0.000875</td>
      <td>0.052457</td>
      <td>0.002111</td>
    </tr>
    <tr>
      <th>2021-01-05 00:00:00+00:00</th>
      <td>0.895694</td>
      <td>0.043881</td>
      <td>0.000716</td>
      <td>0.057362</td>
      <td>0.002347</td>
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
      <th>2024-09-05 00:00:00+00:00</th>
      <td>0.649306</td>
      <td>0.166912</td>
      <td>0.137631</td>
      <td>0.026400</td>
      <td>0.019750</td>
    </tr>
    <tr>
      <th>2024-09-06 00:00:00+00:00</th>
      <td>0.641953</td>
      <td>0.170461</td>
      <td>0.140117</td>
      <td>0.026925</td>
      <td>0.020544</td>
    </tr>
    <tr>
      <th>2024-09-07 00:00:00+00:00</th>
      <td>0.642863</td>
      <td>0.169150</td>
      <td>0.140021</td>
      <td>0.027228</td>
      <td>0.020738</td>
    </tr>
    <tr>
      <th>2024-09-08 00:00:00+00:00</th>
      <td>0.639959</td>
      <td>0.169824</td>
      <td>0.140576</td>
      <td>0.027906</td>
      <td>0.021735</td>
    </tr>
    <tr>
      <th>2024-09-09 00:00:00+00:00</th>
      <td>0.638593</td>
      <td>0.170262</td>
      <td>0.141823</td>
      <td>0.027543</td>
      <td>0.021779</td>
    </tr>
  </tbody>
</table>
<p>1348 rows × 5 columns</p>
</div>




```python
ax = ordered_proportions.plot.area(figsize=(14, 8))
ax.set_title('\nMarket Cap Dominance\nof Smart Contract Platforms\n',fontsize=17)
ax.set_xlabel('')
ax.set_ylabel('Market Share',fontsize=14)
ax.set_ylim(0, 1)
ax.grid(False)
def percent_formatter(x, pos):
    return f'{int(x * 100)}%'
ax.yaxis.set_major_formatter(ticker.FuncFormatter(percent_formatter))
plt.legend(frameon=False, bbox_to_anchor=(0.83, 1.02), ncol=2)
plt.show()
```

    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:31 WARNING  findfont: Font family 'Lato' not found.



    
![png](output_14_1.png)
    


## Transaction Count by Chain


```python
start = '2023-07-01'
```


```python
tx_cnt_df = client.get_asset_metrics(
    assets=['avaxx, avaxc, avaxp'],
    metrics=['TxCnt'],
    start_time = start
).to_dataframe()
```


```python
tx_cnt_df
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
      <th>TxCnt</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>avaxc</td>
      <td>2023-07-01 00:00:00+00:00</td>
      <td>396363</td>
    </tr>
    <tr>
      <th>1</th>
      <td>avaxc</td>
      <td>2023-07-02 00:00:00+00:00</td>
      <td>380636</td>
    </tr>
    <tr>
      <th>2</th>
      <td>avaxc</td>
      <td>2023-07-03 00:00:00+00:00</td>
      <td>417967</td>
    </tr>
    <tr>
      <th>3</th>
      <td>avaxc</td>
      <td>2023-07-04 00:00:00+00:00</td>
      <td>395377</td>
    </tr>
    <tr>
      <th>4</th>
      <td>avaxc</td>
      <td>2023-07-05 00:00:00+00:00</td>
      <td>353774</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>1306</th>
      <td>avaxx</td>
      <td>2024-09-05 00:00:00+00:00</td>
      <td>277</td>
    </tr>
    <tr>
      <th>1307</th>
      <td>avaxx</td>
      <td>2024-09-06 00:00:00+00:00</td>
      <td>295</td>
    </tr>
    <tr>
      <th>1308</th>
      <td>avaxx</td>
      <td>2024-09-07 00:00:00+00:00</td>
      <td>228</td>
    </tr>
    <tr>
      <th>1309</th>
      <td>avaxx</td>
      <td>2024-09-08 00:00:00+00:00</td>
      <td>258</td>
    </tr>
    <tr>
      <th>1310</th>
      <td>avaxx</td>
      <td>2024-09-09 00:00:00+00:00</td>
      <td>333</td>
    </tr>
  </tbody>
</table>
<p>1311 rows × 3 columns</p>
</div>




```python
tx_cnt_df = tx_cnt_df.pivot(index='time',columns='asset',values='TxCnt')
tx_cnt_df
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
      <th>avaxc</th>
      <th>avaxp</th>
      <th>avaxx</th>
    </tr>
    <tr>
      <th>time</th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2023-07-01 00:00:00+00:00</th>
      <td>396363</td>
      <td>5783</td>
      <td>1004</td>
    </tr>
    <tr>
      <th>2023-07-02 00:00:00+00:00</th>
      <td>380636</td>
      <td>4357</td>
      <td>842</td>
    </tr>
    <tr>
      <th>2023-07-03 00:00:00+00:00</th>
      <td>417967</td>
      <td>7955</td>
      <td>800</td>
    </tr>
    <tr>
      <th>2023-07-04 00:00:00+00:00</th>
      <td>395377</td>
      <td>9473</td>
      <td>891</td>
    </tr>
    <tr>
      <th>2023-07-05 00:00:00+00:00</th>
      <td>353774</td>
      <td>17292</td>
      <td>1026</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>2024-09-05 00:00:00+00:00</th>
      <td>141528</td>
      <td>24241</td>
      <td>277</td>
    </tr>
    <tr>
      <th>2024-09-06 00:00:00+00:00</th>
      <td>179686</td>
      <td>22073</td>
      <td>295</td>
    </tr>
    <tr>
      <th>2024-09-07 00:00:00+00:00</th>
      <td>128007</td>
      <td>21309</td>
      <td>228</td>
    </tr>
    <tr>
      <th>2024-09-08 00:00:00+00:00</th>
      <td>127978</td>
      <td>22206</td>
      <td>258</td>
    </tr>
    <tr>
      <th>2024-09-09 00:00:00+00:00</th>
      <td>155872</td>
      <td>21117</td>
      <td>333</td>
    </tr>
  </tbody>
</table>
<p>437 rows × 3 columns</p>
</div>




```python
ax = tx_cnt_df.plot(figsize=(14, 8))
plt.yscale('log')
ax.set_title('\nTransaction Count of\nAvalanche Chains\n',fontsize=17)
ax.set_xlabel('')
ax.grid(True, linestyle='--')
ax.set_ylabel('Tx Count (Daily)\n',fontsize=14)
plt.legend(frameon=False, bbox_to_anchor=(1, 1.15), ncol=1)
plt.show()
```

    2024-09-10 18:32:32 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:32 WARNING  findfont: Font family ['Lato'] not found. Falling back to DejaVu Sans.
    2024-09-10 18:32:33 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:33 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:33 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:33 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:33 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:33 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:33 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:33 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:33 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:33 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:33 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:33 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:33 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:33 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:33 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:33 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:33 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:33 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:33 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:33 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:33 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:33 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:33 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:33 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:33 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:33 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:33 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:33 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:33 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:33 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:33 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:33 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:33 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:33 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:33 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:33 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:33 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:33 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:33 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:33 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:33 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:33 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:33 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:33 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:33 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:33 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:33 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:33 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:33 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:33 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:33 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:33 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:33 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:33 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:33 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:33 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:33 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:33 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:33 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:33 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:33 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:33 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:33 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:33 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:33 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:33 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:33 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:33 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:33 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:33 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:33 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:33 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:33 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:33 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:33 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:33 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:33 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:33 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:33 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:33 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:33 WARNING  findfont: Font family 'Lato' not found.



    
![png](output_20_1.png)
    


## Total USD Fees by Chain


```python
fees_df = client.get_asset_metrics(
    assets=['avaxx, avaxc, avaxp'],
    metrics=['FeeTotUSD'],
    start_time = '2020-09-01'
).to_dataframe()
fees_df
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
      <th>FeeTotUSD</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>avaxc</td>
      <td>2020-09-23 00:00:00+00:00</td>
      <td>0.103844</td>
    </tr>
    <tr>
      <th>1</th>
      <td>avaxc</td>
      <td>2020-09-24 00:00:00+00:00</td>
      <td>0.045521</td>
    </tr>
    <tr>
      <th>2</th>
      <td>avaxc</td>
      <td>2020-09-25 00:00:00+00:00</td>
      <td>7.763643</td>
    </tr>
    <tr>
      <th>3</th>
      <td>avaxc</td>
      <td>2020-09-26 00:00:00+00:00</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>4</th>
      <td>avaxc</td>
      <td>2020-09-27 00:00:00+00:00</td>
      <td>3.882022</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>4339</th>
      <td>avaxx</td>
      <td>2024-09-05 00:00:00+00:00</td>
      <td>6.899382</td>
    </tr>
    <tr>
      <th>4340</th>
      <td>avaxx</td>
      <td>2024-09-06 00:00:00+00:00</td>
      <td>6.806978</td>
    </tr>
    <tr>
      <th>4341</th>
      <td>avaxx</td>
      <td>2024-09-07 00:00:00+00:00</td>
      <td>5.547623</td>
    </tr>
    <tr>
      <th>4342</th>
      <td>avaxx</td>
      <td>2024-09-08 00:00:00+00:00</td>
      <td>6.424409</td>
    </tr>
    <tr>
      <th>4343</th>
      <td>avaxx</td>
      <td>2024-09-09 00:00:00+00:00</td>
      <td>8.626874</td>
    </tr>
  </tbody>
</table>
<p>4344 rows × 3 columns</p>
</div>




```python
fees_df = fees_df.pivot(index='time',columns='asset',values='FeeTotUSD')
```


```python
fees_df
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
      <th>avaxc</th>
      <th>avaxp</th>
      <th>avaxx</th>
    </tr>
    <tr>
      <th>time</th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2020-09-23 00:00:00+00:00</th>
      <td>0.103844</td>
      <td>0.469947</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>2020-09-24 00:00:00+00:00</th>
      <td>0.045521</td>
      <td>0.511942</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>2020-09-25 00:00:00+00:00</th>
      <td>7.763643</td>
      <td>1.006674</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>2020-09-26 00:00:00+00:00</th>
      <td>0.0</td>
      <td>0.476836</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>2020-09-27 00:00:00+00:00</th>
      <td>3.882022</td>
      <td>0.459897</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>2024-09-05 00:00:00+00:00</th>
      <td>15139.756673</td>
      <td>5.965069</td>
      <td>6.899382</td>
    </tr>
    <tr>
      <th>2024-09-06 00:00:00+00:00</th>
      <td>22517.612115</td>
      <td>6.245708</td>
      <td>6.806978</td>
    </tr>
    <tr>
      <th>2024-09-07 00:00:00+00:00</th>
      <td>13583.140329</td>
      <td>5.60849</td>
      <td>5.547623</td>
    </tr>
    <tr>
      <th>2024-09-08 00:00:00+00:00</th>
      <td>16579.092171</td>
      <td>6.146095</td>
      <td>6.424409</td>
    </tr>
    <tr>
      <th>2024-09-09 00:00:00+00:00</th>
      <td>18881.110713</td>
      <td>6.314097</td>
      <td>8.626874</td>
    </tr>
  </tbody>
</table>
<p>1448 rows × 3 columns</p>
</div>




```python
ax = fees_df.plot.area(figsize=(14, 8))
ax.set_title('\nTotal USD Fees\nPaid Across Avalanche Chains\n',fontsize=17)
ax.set_xlabel('')
ax.grid(True, linestyle='--')
ax.set_ylabel('Daily Fees (USD)\n',fontsize=14)
# Function to format the labels in millions
def millions_formatter(x, pos):
    return f'${(x / 1_000_000)}M'

# Apply the formatter to the y-axis
ax.yaxis.set_major_formatter(ticker.FuncFormatter(millions_formatter))
plt.legend(frameon=False, bbox_to_anchor=(1, 1.15), ncol=1)
plt.show()
```

    2024-09-10 18:32:37 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:37 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:37 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:37 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:37 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:37 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:37 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:37 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:37 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:37 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:37 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:37 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:37 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:37 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:37 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:37 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:37 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:37 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:37 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:37 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:37 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:37 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:37 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:37 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:37 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:37 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:37 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:37 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:37 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:37 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:37 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:37 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:37 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:37 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:37 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:37 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:37 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:37 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:37 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:37 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:37 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:37 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:37 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:37 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:37 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:37 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:37 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:37 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:37 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:37 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:37 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:37 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:37 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:37 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:37 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:37 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:37 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:37 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:37 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:37 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:37 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:37 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:37 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:37 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:37 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:37 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:37 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:37 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:37 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:37 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:37 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:37 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:37 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:37 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:37 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:37 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:37 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:37 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:37 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:37 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:37 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:37 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:37 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:37 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:37 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:37 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:37 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:37 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:37 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:37 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:37 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:37 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:37 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:37 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:37 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:37 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:37 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:37 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:37 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:37 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:37 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:37 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:37 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:37 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:37 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:37 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:37 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 18:32:37 WARNING  findfont: Font family 'Lato' not found.



    
![png](output_25_1.png)
    

