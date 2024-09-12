<img src="https://5264302.fs1.hubspotusercontent-na1.net/hubfs/5264302/Demo%20Asset%20Resources/Demo%20Covers/CM-Demo-difficulty_change-Cover.png" width=1100 margin-left='auto' margin-right='auto'/>

Bitcoin's **difficulty adjustment mechanism** is arguably the core innovation introduced by Satoshi Nakamoto. While previous digital currencies struggled to balance the issuance of new units with the number of participants in the network, Bitcoin introduced the concept of 'difficulty retargeting.' Difficulty is retargeted every 2,016 blocks (approximately 2 weeks) in order to preserve Bitcoin's target block time of ten minutes, even as new miners join the network. In turn, the difficulty retarget also has an outsized impact on **miner revenue**. Put simply, upwards difficulty adjustments lower the Bitcoin-denominated revenue earned by a miner on a per TH/s basis, while downward adjustments increase revenue. In this notebook, we'll explore how Network Data Pro can be used to explore and analyze the relationship between Bitcoin's difficulty adjustment and miner revenue.

### Notebook Setup


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
import matplotlib.pyplot as plt
import matplotlib.ticker as ticker
import matplotlib.dates as mdates
from plotly.subplots import make_subplots
import warnings
%matplotlib inline
```


```python
# Chart themes
sns.set_theme()
warnings.filterwarnings('ignore')
fig = plt.style.use('seaborn')
sns.set(rc={'figure.figsize':(15,7.5)})
sns.set_palette("Oranges_r",1)
sns.set_style("whitegrid",{'axes.grid' : False,'grid.linestyle': '--', 'grid.color': 'black','axes.edgecolor': 'white','font.family': ['Lato']})
labels = ['January','February','March','April','May','June','July','August','September','October','November','December']
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

    2024-09-12 08:21:51 INFO     Using API key found in environment


## Pulling Difficulty (Block by Block)

To begin our analysis, we'll leverage the *timeseries/asset-metrics* endpoint to pull Bitcoin mining difficulty ([**DiffMean**](https://docs.coinmetrics.io/asset-metrics/mining/diffmean)). Difficulty represents how hard it is to find a hash that meets the protocol-designated requirement (i.e., the difficulty of finding a new block) that day. Difficulty is adjusted periodically by the protocol as a function of how much hashing power is being deployed by miners.

Network Data Pro timeseries data is available at 2 calculation intervals: end-of-day (EOD) and block-by-block (BBB). Some metrics (such as miner revenue) are only available at EOD frequency. However, DiffMean is a metric that can be pulled at the block-by-block interval. In addition to normalized ISO timestamps, block-by-block metrics include on-chain metadata such as block height, block hash, and parent block hash.


```python
start = '2022-01-01'
end = datetime.now() - timedelta(days=1)
```


```python
btc_diff = client.get_asset_metrics(
    assets='btc',
    metrics='DiffMean',
    start_time=start,
    end_time=end,
    frequency='1b'
).to_dataframe()
```


```python
btc_diff = btc_diff.sort_values('height')
```


```python
btc_diff["percent_change"] = btc_diff.DiffMean.pct_change(fill_method ='ffill').astype(float)
```


```python
btc_diff.head()
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
      <th>parent_block_hash</th>
      <th>height</th>
      <th>asset</th>
      <th>time</th>
      <th>DiffMean</th>
      <th>percent_change</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>0000000000000000000288bb2cdbd907a32fdff4b8d9db...</td>
      <td>00000000000000000000663310574194d510289c27dc81...</td>
      <td>716599</td>
      <td>btc</td>
      <td>2022-01-01 00:04:14+00:00</td>
      <td>24272331996979.96875</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>1</th>
      <td>00000000000000000001fa03c2ad182a401c03c42f3e52...</td>
      <td>0000000000000000000288bb2cdbd907a32fdff4b8d9db...</td>
      <td>716600</td>
      <td>btc</td>
      <td>2022-01-01 00:14:14+00:00</td>
      <td>24272331996979.96875</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>2</th>
      <td>000000000000000000020f5e0c167fa9d817a16cb6c334...</td>
      <td>00000000000000000001fa03c2ad182a401c03c42f3e52...</td>
      <td>716601</td>
      <td>btc</td>
      <td>2022-01-01 00:20:25+00:00</td>
      <td>24272331996979.96875</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>3</th>
      <td>00000000000000000003e9f054f5c6f3f71e11b790fe1c...</td>
      <td>000000000000000000020f5e0c167fa9d817a16cb6c334...</td>
      <td>716602</td>
      <td>btc</td>
      <td>2022-01-01 00:23:25+00:00</td>
      <td>24272331996979.96875</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>4</th>
      <td>000000000000000000072ba79db2b57c4efa08f11f1d8f...</td>
      <td>00000000000000000003e9f054f5c6f3f71e11b790fe1c...</td>
      <td>716603</td>
      <td>btc</td>
      <td>2022-01-01 00:28:47+00:00</td>
      <td>24272331996979.96875</td>
      <td>0.0</td>
    </tr>
  </tbody>
</table>
</div>




```python
# Number of difficulty changes this year
count = (btc_diff['percent_change'] != 0).sum()
print('Number of difficulty adjustments so far in 2022: ' + str(count))
```

    Number of difficulty adjustments so far in 2022: 73



```python
# Difficulty Plot
p0 = sns.lineplot(data=btc_diff, x="time", y="DiffMean")
p0.xaxis.set_ticklabels(labels)
p0.set_xlabel("", fontsize = 15)
p0.set_ylabel("Difficulty", fontsize = 15)
p0.set_title("Bitcoin Difficulty (2022)",fontsize=21)
```




    Text(0.5, 1.0, 'Bitcoin Difficulty (2022)')



    2024-09-12 08:25:51 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:25:51 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:25:51 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:25:51 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:25:51 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:25:51 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:25:51 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:25:51 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:25:51 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:25:51 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:25:51 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:25:51 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:25:51 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:25:51 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:25:51 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:25:51 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:25:51 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:25:51 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:25:51 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:25:51 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:25:51 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:25:51 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:25:51 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:25:51 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:25:51 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:25:51 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:25:51 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:25:51 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:25:51 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:25:51 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:25:51 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:25:51 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:25:51 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:25:51 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:25:51 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:25:51 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:25:51 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:25:51 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:25:51 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:25:51 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:25:51 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:25:51 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:25:51 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:25:51 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:25:51 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:25:51 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:25:51 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:25:51 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:25:51 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:25:51 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:25:51 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:25:51 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:25:51 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:25:51 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:25:51 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:25:51 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:25:51 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:25:51 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:25:51 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:25:51 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:25:51 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:25:51 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:25:51 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:25:51 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:25:51 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:25:51 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:25:51 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:25:51 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:25:51 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:25:51 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:25:51 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:25:51 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:25:51 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:25:51 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:25:51 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:25:52 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:25:52 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:25:52 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:25:52 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:25:52 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:25:52 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:25:52 WARNING  findfont: Font family 'Lato' not found.



    
![png](output_15_83.png)
    



```python
# Difficulty change plot
p1 = sns.lineplot(data=btc_diff, x="height", y="percent_change")
ylabels = ['{:,.0f}'.format(x) + '%' for x in p1.get_yticks()*100]
p1.set_yticklabels(ylabels)
p1.set_xlabel("Block Height", fontsize = 15)
p1.set_ylabel("Percent Change", fontsize = 15)
p1.set_title("Bitcoin Difficulty Change (2022)",fontsize=21)
```




    Text(0.5, 1.0, 'Bitcoin Difficulty Change (2022)')



    2024-09-12 08:26:41 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:41 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:41 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:41 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:41 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:41 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:41 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:41 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:41 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:41 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:41 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:41 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:41 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:41 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:41 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:41 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:41 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:41 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:41 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:41 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:41 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:41 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:41 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:41 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:41 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:41 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:41 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:41 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:41 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:41 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:41 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:41 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:41 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:41 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:41 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:41 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:41 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:41 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:41 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:41 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:41 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:41 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:41 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:41 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:41 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:41 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:41 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:41 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:42 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:42 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:42 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:42 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:42 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:42 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:42 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:42 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:42 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:42 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:42 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:42 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:42 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:42 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:42 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:42 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:42 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:42 WARNING  findfont: Font family 'Lato' not found.



    
![png](output_16_67.png)
    


## Pulling Miner Revenue (End of Day)


```python
btc_rev = client.get_asset_metrics(
    assets='btc',
    metrics=['RevHashRateNtv','RevHashRateUSD'],
    start_time=start,
    end_time=end,
    frequency='1d'
).to_dataframe()
```


```python
# Convert from BTC to SATS
btc_rev['SatRevenue'] = btc_rev['RevHashRateNtv']*100000000
# Rename RevHashRateUSD to USD Revenue
btc_rev['USDRevenue'] = btc_rev['RevHashRateUSD']
```


```python
p2 = sns.lineplot(data=btc_rev, x="time", y="SatRevenue")
p2.xaxis.set_ticklabels(labels)
p2.set_xlabel("", fontsize = 15)
p2.set_ylabel("Daily Revenue per TH/s (sats)", fontsize = 15)
p2.set_title("Hashvalue (2022)",fontsize=21)
```




    Text(0.5, 1.0, 'Hashvalue (2022)')



    2024-09-12 08:26:43 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:43 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:43 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:43 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:43 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:43 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:43 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:43 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:43 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:43 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:43 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:43 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:43 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:43 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:43 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:43 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:43 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:43 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:43 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:43 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:43 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:43 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:43 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:43 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:43 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:43 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:43 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:43 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:43 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:43 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:43 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:43 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:43 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:43 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:43 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:43 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:43 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:43 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:43 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:43 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:43 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:43 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:43 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:43 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:43 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:43 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:43 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:43 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:43 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:43 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:43 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:43 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:43 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:43 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:43 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:43 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:43 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:43 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:43 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:43 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:43 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:43 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:43 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:43 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:43 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:43 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:43 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:43 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:43 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:43 WARNING  findfont: Font family 'Lato' not found.



    
![png](output_20_71.png)
    



```python
sns.set_palette("Greens",1)
p3 = sns.lineplot(data=btc_rev, x="time", y="USDRevenue")
p3.xaxis.set_ticklabels(labels)
p3.set_xlabel("", fontsize = 15)
p3.set_ylabel("Daily Revenue per TH/s (USD)", fontsize = 15)
p3.set_title("Hashprice (2022)",fontsize=21)
```




    Text(0.5, 1.0, 'Hashprice (2022)')



    2024-09-12 08:26:43 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:43 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:43 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:43 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:43 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:43 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:43 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:43 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:43 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:43 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:43 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:43 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:43 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:43 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:43 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:43 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:43 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:43 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:43 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:43 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:43 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:43 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:43 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:43 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:43 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:43 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:43 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:43 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:43 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:43 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:43 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:43 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:43 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:43 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:43 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:44 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:44 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:44 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:44 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:44 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:44 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:44 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:44 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:44 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:44 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:44 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:44 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:44 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:44 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:44 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:44 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:44 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:44 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:44 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:44 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:44 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:44 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:44 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:44 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:44 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:44 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:44 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:44 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:44 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:44 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:44 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:44 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:44 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:44 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:44 WARNING  findfont: Font family 'Lato' not found.



    
![png](output_21_71.png)
    



```python
btc_diff_change = btc_diff.set_index('time')
btc_diff_change = btc_diff_change.drop(['block_hash', 'parent_block_hash','height','asset'], axis=1)
btc_diff_change = btc_diff_change.fillna(0)
```


```python
# Add categorical variable for positive or negative difficulty change
btc_diff_change["Color"] = np.where(btc_diff_change["percent_change"]<0, 'g', 'r')
```


```python
# Eliminate rows where no difficulty change occurs
diffchange_nozeros = btc_diff_change[btc_diff_change.percent_change != 0]
diffchange_nozeros
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
      <th>DiffMean</th>
      <th>percent_change</th>
      <th>Color</th>
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
      <th>2022-01-08 07:45:37+00:00</th>
      <td>24371874614345.621094</td>
      <td>0.004101</td>
      <td>r</td>
    </tr>
    <tr>
      <th>2022-01-21 03:08:10+00:00</th>
      <td>26643185256535.460938</td>
      <td>0.093194</td>
      <td>r</td>
    </tr>
    <tr>
      <th>2022-02-04 02:34:17+00:00</th>
      <td>26690525287405.5</td>
      <td>0.001777</td>
      <td>r</td>
    </tr>
    <tr>
      <th>2022-02-17 11:14:51+00:00</th>
      <td>27967152532434.230469</td>
      <td>0.047831</td>
      <td>r</td>
    </tr>
    <tr>
      <th>2022-03-03 16:21:51+00:00</th>
      <td>27550332084343.839844</td>
      <td>-0.014904</td>
      <td>g</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>2024-07-18 16:09:42+00:00</th>
      <td>82047728459932.75</td>
      <td>0.032109</td>
      <td>r</td>
    </tr>
    <tr>
      <th>2024-07-31 08:50:18+00:00</th>
      <td>90666502495565.78125</td>
      <td>0.105046</td>
      <td>r</td>
    </tr>
    <tr>
      <th>2024-08-14 22:12:19+00:00</th>
      <td>86871474313761.953125</td>
      <td>-0.041857</td>
      <td>g</td>
    </tr>
    <tr>
      <th>2024-08-28 13:51:49+00:00</th>
      <td>89471664776970.765625</td>
      <td>0.029931</td>
      <td>r</td>
    </tr>
    <tr>
      <th>2024-09-11 01:58:47+00:00</th>
      <td>92671576265161.0625</td>
      <td>0.035765</td>
      <td>r</td>
    </tr>
  </tbody>
</table>
<p>72 rows × 3 columns</p>
</div>




```python
diffchange_nozeros.index = pd.to_datetime(diffchange_nozeros.index).strftime('%Y-%m-%d')
diffchange_nozeros = diffchange_nozeros.set_index(pd.DatetimeIndex(diffchange_nozeros.index))
```


```python
sat_revs = btc_rev.set_index('time')
sat_revs = sat_revs.drop(['asset', 'RevHashRateNtv', 'RevHashRateUSD'], axis=1)
sat_revs.index = pd.to_datetime(sat_revs.index).strftime('%Y-%m-%d')
sat_revs = sat_revs.set_index(pd.DatetimeIndex(sat_revs.index))
```


```python
sat_revs
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
      <th>SatRevenue</th>
      <th>USDRevenue</th>
    </tr>
    <tr>
      <th>time</th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2022-01-01</th>
      <td>522.4194</td>
      <td>0.248463</td>
    </tr>
    <tr>
      <th>2022-01-02</th>
      <td>522.8049</td>
      <td>0.247561</td>
    </tr>
    <tr>
      <th>2022-01-03</th>
      <td>525.0894</td>
      <td>0.243922</td>
    </tr>
    <tr>
      <th>2022-01-04</th>
      <td>525.4313</td>
      <td>0.241204</td>
    </tr>
    <tr>
      <th>2022-01-05</th>
      <td>527.1203</td>
      <td>0.22946</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>2024-09-07</th>
      <td>71.1819</td>
      <td>0.038486</td>
    </tr>
    <tr>
      <th>2024-09-08</th>
      <td>71.1141</td>
      <td>0.039013</td>
    </tr>
    <tr>
      <th>2024-09-09</th>
      <td>71.3334</td>
      <td>0.040757</td>
    </tr>
    <tr>
      <th>2024-09-10</th>
      <td>71.4262</td>
      <td>0.041188</td>
    </tr>
    <tr>
      <th>2024-09-11</th>
      <td>69.3378</td>
      <td>0.039806</td>
    </tr>
  </tbody>
</table>
<p>985 rows × 2 columns</p>
</div>




```python
# Maximum satoshi-denomiated revenue this year
sat_max = sat_revs['SatRevenue'].max()
sat_max
```




    527.1203




```python
# Minimum satoshi-denomiated revenue this year
sat_min = sat_revs['SatRevenue'].min()
sat_min
```




    69.3378




```python
# Maximum USD-denomiated revenue this year
usd_max = sat_revs['USDRevenue'].max()
usd_max
```




    0.24846269543




```python
# Minimum USD-denomiated revenue this year
usd_min = sat_revs['USDRevenue'].min()
usd_min
```




    0.038414237878




```python
joined = sat_revs.join(diffchange_nozeros)
joined = joined.fillna(0)
```

### Plot Difficulty vs. Miner Revenue


```python
sns.set_palette("Oranges_r",1)
joined.plot.area(y='SatRevenue',use_index=False)
plt.ylabel('Daily Revenue per TH/s (sats)', fontsize=18,labelpad=13)
plt.suptitle('BTC Revenue vs. Difficulty Change',x=0.53,y=0.95, fontsize=24)
plt.title('2022',x=0.5, y=1,fontsize=15)
# SAT REVENUE
ax = plt.gca()
ax.get_legend().remove()
ax.tick_params(colors='white',labelcolor='black')
ax.set_ylim([0.95*int(sat_min), 1.05*int(sat_max)])
ax.tick_params(axis="y", labelsize=13)
# DIFFICULTY CHANGE
ax2 = ax.twinx()
sns.barplot(x=joined.index,y ='percent_change',data=joined,hue='Color',palette=['#ff304c','#20ba34'],ax=ax2,dodge=False,alpha=0.8,edgecolor=(0,0,0,1),linewidth=0.7)
ax2.set_ylabel('Difficulty Change (%)',fontsize=18,labelpad=13)
ax2.tick_params(labelsize=14)
ax2.tick_params(axis='y', right=False)  
ax2.get_xaxis().set_visible(False)
ax2.get_legend().remove()
ax2.xaxis.set_major_locator(mdates.MonthLocator(interval=1))
ax2.xaxis.set_ticklabels(labels)
ax.tick_params(axis="x", labelsize=15)
plt.setp( ax.xaxis.get_majorticklabels(), rotation=15)
ax2.set_yticklabels(ylabels)
plt.annotate('Source: Coin Metrics',weight='book',xy=(0.99, 0.001), xycoords='axes fraction',color='black',xytext=(-8, 6), textcoords='offset pixels',horizontalalignment='right',verticalalignment='bottom')
for tick in ax2.yaxis.get_majorticklabels():
    tick.set_horizontalalignment("left")
plt.savefig('BTC-Revenue-vs-Difficulty-Change-2022.png',dpi = 300)
plt.show()
```

    2024-09-12 08:26:44 INFO     Using categorical units to plot a list of strings that are all parsable as floats or dates. If these strings should be plotted as numbers, cast to the appropriate data type before plotting.


    2024-09-12 08:26:44 INFO     Using categorical units to plot a list of strings that are all parsable as floats or dates. If these strings should be plotted as numbers, cast to the appropriate data type before plotting.


    2024-09-12 08:26:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:48 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:48 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:48 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:48 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:48 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:48 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:48 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:48 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:48 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:48 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:48 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:48 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:48 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:48 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:48 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:48 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:48 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:48 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:48 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:48 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:48 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:48 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:48 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:48 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:48 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:49 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:49 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:49 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:49 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:49 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:49 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:49 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:49 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:49 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:49 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:49 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:49 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:49 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:49 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:49 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:49 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:49 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:49 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:49 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:49 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:49 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:49 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:49 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:49 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:49 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:49 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:49 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:49 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:49 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:49 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:49 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:49 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:49 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:49 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:49 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:49 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:49 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:49 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:49 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:49 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:49 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:49 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:49 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:49 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:49 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:49 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:49 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:49 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:49 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:49 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:49 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:49 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:49 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:49 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:49 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:49 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:49 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:49 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:50 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:50 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:50 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:50 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:50 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:50 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:50 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:50 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:50 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:50 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:50 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:50 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:50 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:50 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:50 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:50 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:50 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:50 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:50 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:50 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:50 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:50 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:50 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:50 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:50 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:50 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:50 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:50 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:50 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:50 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:50 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:50 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:50 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:50 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:50 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:50 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:50 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:50 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:50 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:50 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:50 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:50 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:50 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:50 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:50 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:50 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:50 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:50 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:50 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:50 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:50 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:50 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:50 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:50 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:50 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:50 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:50 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:50 WARNING  findfont: Font family 'Lato' not found.



    
![png](output_34_176.png)
    



```python
sns.set_palette("Greens",1)
joined.plot.area(y='USDRevenue',use_index=False)
plt.ylabel('Daily Revenue per TH/s (USD)', fontsize=18,labelpad=13)
plt.suptitle('USD Revenue vs. Difficulty Change',x=0.53,y=0.95, fontsize=24)
plt.title('2022',x=0.5, y=1,fontsize=15)
# SAT REVENUE
ax = plt.gca()
ax.get_legend().remove()
ax.tick_params(colors='white',labelcolor='black')
ax.set_ylim([0.8*float(usd_min), 1.08*float(usd_max)])
ax.tick_params(axis="y", labelsize=13)
# DIFFICULTY CHANGE
ax2 = ax.twinx()
sns.barplot(x=joined.index,y ='percent_change',data=joined,hue='Color',palette=['#ff304c','#20ba34'],ax=ax2,dodge=False,alpha=0.8,edgecolor=(0,0,0,1),linewidth=0.7)
ax2.set_ylabel('Difficulty Change (%)',fontsize=18,labelpad=13)
ax2.tick_params(labelsize=14)
ax2.tick_params(axis='y', right=False)  
ax2.get_xaxis().set_visible(False)
ax2.get_legend().remove()
ax2.xaxis.set_major_locator(mdates.MonthLocator(interval=1))
ax2.xaxis.set_ticklabels(labels)
ax.tick_params(axis="x", labelsize=15)
plt.setp( ax.xaxis.get_majorticklabels(), rotation=15)
ax2.set_yticklabels(ylabels)
plt.annotate('Source: Coin Metrics',weight='book',xy=(0.99, 0.001), xycoords='axes fraction',color='black',xytext=(-8, 6), textcoords='offset pixels',horizontalalignment='right',verticalalignment='bottom')
for tick in ax2.yaxis.get_majorticklabels():
    tick.set_horizontalalignment("left")
plt.savefig('USD-Revenue-vs-Difficulty-Change-2022.png',dpi = 300)
plt.show()
```

    2024-09-12 08:26:51 INFO     Using categorical units to plot a list of strings that are all parsable as floats or dates. If these strings should be plotted as numbers, cast to the appropriate data type before plotting.


    2024-09-12 08:26:51 INFO     Using categorical units to plot a list of strings that are all parsable as floats or dates. If these strings should be plotted as numbers, cast to the appropriate data type before plotting.


    2024-09-12 08:26:54 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:54 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:54 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:54 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:54 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:54 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:54 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:54 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:54 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:54 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:54 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:54 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:54 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:54 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:54 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:54 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:54 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:54 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:54 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:54 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:54 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:54 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:54 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:54 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:54 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:54 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:54 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:54 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:54 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:54 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:54 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:54 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:54 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:54 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:54 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:54 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:54 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:54 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:54 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:54 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:54 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:54 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:54 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:54 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:54 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:54 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:54 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:54 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:54 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:54 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:54 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:54 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:54 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:54 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:54 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:54 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:54 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:54 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:55 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:55 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:55 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:55 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:55 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:55 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:55 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:55 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:55 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:55 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:55 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:55 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:55 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:55 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:55 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:55 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:55 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:55 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:55 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:55 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:55 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:55 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:55 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:55 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:55 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:55 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:55 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:55 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:55 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:55 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:55 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:55 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:55 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:55 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:55 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:55 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:55 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:55 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:55 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:55 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:55 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:55 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:55 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:55 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:55 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:55 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:55 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:55 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:55 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:55 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:55 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:55 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:55 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:55 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:55 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:55 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:55 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:55 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:56 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:56 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:56 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:56 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:56 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:56 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:56 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:56 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:56 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:56 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:56 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:56 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:56 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:56 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:56 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:56 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:56 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:56 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:56 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:56 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:56 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:56 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:56 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:56 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:56 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:56 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:56 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:56 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:56 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:56 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:56 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:56 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:56 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:56 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:56 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:56 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:56 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:56 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:56 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:56 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:56 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:56 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:56 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:56 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:56 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:56 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:56 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:56 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:56 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:56 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:56 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:56 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:57 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:57 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:57 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:57 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:57 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:26:57 WARNING  findfont: Font family 'Lato' not found.



    
![png](output_35_176.png)
    

