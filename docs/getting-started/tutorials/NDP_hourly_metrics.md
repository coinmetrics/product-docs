<img src="https://5264302.fs1.hubspotusercontent-na1.net/hubfs/5264302/Demo%20Asset%20Resources/Demo%20Covers/CM-Demo-hourly_metrics-Cover.png" width=1100 margin-left='auto' margin-right='auto'/>

## Resources
This notebook demonstrates basic functionality offered by the Coin Metrics Python API Client and Network Data Pro.

Coin Metrics offers a vast assortment of data for hundreds of cryptoassets. The Python API Client allows for easy access to this data using Python without needing to create your own wrappers using `requests` and other such libraries.

To understand the data that Coin Metrics offers, feel free to peruse the resources below.

- The [Coin Metrics API v4](https://docs.coinmetrics.io/api/v4) website contains the full set of endpoints and data offered by Coin Metrics.
- The [Coin Metrics Product Documentation](https://docs.coinmetrics.io/info) gives detailed, conceptual explanations of the data that Coin Metrics offers.
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
import matplotlib
from matplotlib.ticker import FuncFormatter
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

    2024-09-09 13:56:02 INFO     Using API key found in environment


# Hourly Metrics

Coin Metrics is pleased to announce the release of a new set of hourly metrics for **Network Data Pro**. This feature unlocks a new level granularity for our existing suite of on-chain metrics. 

Previously, our Network Data Pro offering provided both Daily (EOD) and Block-by-Block (BBB) aggregations of on-chain metrics. Now, users have the ability to capture on-chain activity at an intermediate frequency, providing timely insights into metrics like Active Address Count, Transaction Fees, and more.

### Retrieve Hourly Metrics Catalog


```python
hourly_metrics_cat = client.catalog_asset_metrics().to_dataframe()
hourly_metrics_cat = hourly_metrics_cat.loc[(hourly_metrics_cat['frequency']=='1h') & (hourly_metrics_cat['product']=='Network Data')]
hourly_metrics_cat
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
      <th>full_name</th>
      <th>description</th>
      <th>product</th>
      <th>category</th>
      <th>subcategory</th>
      <th>unit</th>
      <th>data_type</th>
      <th>type</th>
      <th>display_name</th>
      <th>experimental</th>
      <th>reviewable</th>
      <th>frequency</th>
      <th>asset</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>120</th>
      <td>AdrActBlobCnt</td>
      <td>Addresses, active, blob, count</td>
      <td>The sum count of unique addresses that were ac...</td>
      <td>Network Data</td>
      <td>Transactions</td>
      <td>Blobs</td>
      <td>Addresses</td>
      <td>decimal</td>
      <td>Sum</td>
      <td>Active Addr Blob Cnt</td>
      <td>False</td>
      <td>&lt;NA&gt;</td>
      <td>1h</td>
      <td>eth</td>
    </tr>
    <tr>
      <th>122</th>
      <td>AdrActBlobContRecCnt</td>
      <td>Addresses, active, blob, to contracts, recipie...</td>
      <td>The sum count of unique smart contract or burn...</td>
      <td>Network Data</td>
      <td>Transactions</td>
      <td>Blobs</td>
      <td>Addresses</td>
      <td>decimal</td>
      <td>Sum</td>
      <td>Active Addr Blob Contract Cnt (Received)</td>
      <td>False</td>
      <td>&lt;NA&gt;</td>
      <td>1h</td>
      <td>eth</td>
    </tr>
    <tr>
      <th>124</th>
      <td>AdrActBlobRecCnt</td>
      <td>Addresses, active, blob, recipients, count</td>
      <td>The sum count of unique addresses that were ac...</td>
      <td>Network Data</td>
      <td>Transactions</td>
      <td>Blobs</td>
      <td>Addresses</td>
      <td>decimal</td>
      <td>Sum</td>
      <td>Active Addr Blob Cnt (Received)</td>
      <td>False</td>
      <td>&lt;NA&gt;</td>
      <td>1h</td>
      <td>eth</td>
    </tr>
    <tr>
      <th>126</th>
      <td>AdrActBlobSendCnt</td>
      <td>Addresses, active, blob, senders, count</td>
      <td>The sum count of unique addresses that were ac...</td>
      <td>Network Data</td>
      <td>Transactions</td>
      <td>Blobs</td>
      <td>Addresses</td>
      <td>decimal</td>
      <td>Sum</td>
      <td>Active Addr Blob Cnt (Sent)</td>
      <td>False</td>
      <td>&lt;NA&gt;</td>
      <td>1h</td>
      <td>eth</td>
    </tr>
    <tr>
      <th>130</th>
      <td>AdrActCnt</td>
      <td>Addresses, active, count</td>
      <td>The sum count of unique addresses that were ac...</td>
      <td>Network Data</td>
      <td>Addresses</td>
      <td>Active</td>
      <td>Addresses</td>
      <td>bigint</td>
      <td>Sum</td>
      <td>Active Addr Cnt</td>
      <td>&lt;NA&gt;</td>
      <td>&lt;NA&gt;</td>
      <td>1h</td>
      <td>btc</td>
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
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>48852</th>
      <td>ValidatorExtSlhCnt</td>
      <td>Validators, inactive, ineligible, slashed, count</td>
      <td>Validators that have been slashed and are no l...</td>
      <td>Network Data</td>
      <td>Staking</td>
      <td>Validators</td>
      <td>Validators</td>
      <td>bigint</td>
      <td>Sum</td>
      <td>Inactive Ineligible Validators</td>
      <td>&lt;NA&gt;</td>
      <td>&lt;NA&gt;</td>
      <td>1h</td>
      <td>eth_cl</td>
    </tr>
    <tr>
      <th>48854</th>
      <td>ValidatorExtUnslhCnt</td>
      <td>Validators, inactive, eligible, count</td>
      <td>Validators that have not been slashed but are ...</td>
      <td>Network Data</td>
      <td>Staking</td>
      <td>Validators</td>
      <td>Validators</td>
      <td>bigint</td>
      <td>Sum</td>
      <td>Inactive Eligible Validators</td>
      <td>&lt;NA&gt;</td>
      <td>&lt;NA&gt;</td>
      <td>1h</td>
      <td>eth_cl</td>
    </tr>
    <tr>
      <th>48856</th>
      <td>ValidatorPndInitCnt</td>
      <td>Validators, pending active, ineligible, count</td>
      <td>Validators Pending Eligibility</td>
      <td>Network Data</td>
      <td>Staking</td>
      <td>Validators</td>
      <td>Validators</td>
      <td>bigint</td>
      <td>Sum</td>
      <td>Validators Pending Eligibility</td>
      <td>&lt;NA&gt;</td>
      <td>&lt;NA&gt;</td>
      <td>1h</td>
      <td>eth_cl</td>
    </tr>
    <tr>
      <th>48858</th>
      <td>ValidatorPndQedCnt</td>
      <td>Validators, pending active, eligible, count</td>
      <td>Validators waiting in the activation queue</td>
      <td>Network Data</td>
      <td>Staking</td>
      <td>Validators</td>
      <td>Validators</td>
      <td>bigint</td>
      <td>Sum</td>
      <td>Validator in Activation Queue</td>
      <td>&lt;NA&gt;</td>
      <td>&lt;NA&gt;</td>
      <td>1h</td>
      <td>eth_cl</td>
    </tr>
    <tr>
      <th>48860</th>
      <td>ValidatorRemCnt1d</td>
      <td>Validator, removed, count</td>
      <td>Count of Validators removed Daily</td>
      <td>Network Data</td>
      <td>Staking</td>
      <td>Validators</td>
      <td>Validators</td>
      <td>bigint</td>
      <td>Sum</td>
      <td>Daily Removed Validators</td>
      <td>&lt;NA&gt;</td>
      <td>&lt;NA&gt;</td>
      <td>1h</td>
      <td>eth_cl</td>
    </tr>
  </tbody>
</table>
<p>197 rows × 14 columns</p>
</div>



# Example Analyses


```python
start = datetime.utcnow() - timedelta(days=7)
```

## ETH Fee Burn vs. Tx Count

First, we'll examine the relationship between Ethereum's transaction count (**TxCnt**) and the amount of ETH being "burned," or removed from circulation (**SplyBurntNtv**). 

Since the introduction of EIP-1559, Ethereum has segmented gas fees into two separate fees: the "base fee" and the "priority tip." While the priority tip is rewarded to validators, the base fee is burnt. Over the long-term, this has enabled ETH to offer a deflationary monetary policy, with periods of high transaction activity permanently destroying units of ETH and lowering the total circulating supply. 

For more details on the impact of EIP-1559, check out [**State of the Network #166: Ethereum After EIP-1559**](https://coinmetrics.substack.com/p/state-of-the-network-issue-166)


```python
fee_burn_and_tx_metrics = client.get_asset_metrics(
    assets='eth',
    metrics=['TxCnt','SplyBurntNtv'],
    start_time = start,
    frequency='1h'
).to_dataframe()
```


```python
fee_burn_and_tx_metrics['time'] = pd.to_datetime(fee_burn_and_tx_metrics['time'])
```


```python
fee_burn_and_tx_metrics = fee_burn_and_tx_metrics[['SplyBurntNtv','TxCnt','time']].set_index('time')
fee_burn_and_tx_metrics['SplyBurntNtv'] = fee_burn_and_tx_metrics['SplyBurntNtv'] * -1
fee_burn_and_tx_metrics
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
      <th>SplyBurntNtv</th>
      <th>TxCnt</th>
    </tr>
    <tr>
      <th>time</th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2024-09-02 19:00:00+00:00</th>
      <td>-28.268117</td>
      <td>46655</td>
    </tr>
    <tr>
      <th>2024-09-02 20:00:00+00:00</th>
      <td>-28.29321</td>
      <td>45206</td>
    </tr>
    <tr>
      <th>2024-09-02 21:00:00+00:00</th>
      <td>-25.031108</td>
      <td>43525</td>
    </tr>
    <tr>
      <th>2024-09-02 22:00:00+00:00</th>
      <td>-9.513352</td>
      <td>44960</td>
    </tr>
    <tr>
      <th>2024-09-02 23:00:00+00:00</th>
      <td>-5.128315</td>
      <td>46469</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>2024-09-09 13:00:00+00:00</th>
      <td>-56.862607</td>
      <td>51487</td>
    </tr>
    <tr>
      <th>2024-09-09 14:00:00+00:00</th>
      <td>-38.997709</td>
      <td>49931</td>
    </tr>
    <tr>
      <th>2024-09-09 15:00:00+00:00</th>
      <td>-31.450488</td>
      <td>51008</td>
    </tr>
    <tr>
      <th>2024-09-09 16:00:00+00:00</th>
      <td>-62.788125</td>
      <td>49049</td>
    </tr>
    <tr>
      <th>2024-09-09 17:00:00+00:00</th>
      <td>-48.554057</td>
      <td>48920</td>
    </tr>
  </tbody>
</table>
<p>167 rows × 2 columns</p>
</div>




```python
# Function to format y-axis tick labels
def thousands(x, pos):
    'The two args are the value and tick position'
    return '%1.0fK' % (x * 1e-3)

fig, (ax1, ax2) = plt.subplots(2, 1, sharex=True, figsize=(14,8))
ax1.set_title('\nETH Transaction Count \nand Supply Burnt (1H)\n', color='black', fontsize=16)  # Change title color to white for visibility

# Plot TxCnt as a line plot
ax1.plot(fee_burn_and_tx_metrics.index, fee_burn_and_tx_metrics['TxCnt'], color='lime')
ax1.set_facecolor('#212530')
ax1.set_ylabel('Transaction Count', color='black')  
ax1.tick_params(length=0, axis='y', labelcolor='black') 
ax1.tick_params(length=0, axis='x', labelcolor='black')  
ax1.yaxis.set_major_formatter(FuncFormatter(thousands))
ax1.grid(axis='y',linestyle='--', color='gray')  # Change gridline color to white for visibility

cmap = matplotlib.cm.Reds(np.linspace(0.5,0.75,20))
cmap = matplotlib.colors.ListedColormap(cmap[::-1, :-1])

# Plot SplyBurntUSD as a scatter plot with the colormap
sc = ax2.scatter(fee_burn_and_tx_metrics.index, fee_burn_and_tx_metrics['SplyBurntNtv'], c=fee_burn_and_tx_metrics['SplyBurntNtv'], cmap=cmap)
ax2.set_facecolor('#212530')
ax2.set_xlabel('')
ax2.set_ylabel('Supply Burnt (ETH)', color='black')  # Change label color to white for visibility
ax2.tick_params(length=0,axis='y', labelcolor='black')  # Change tick color to white for visibility
ax2.grid(axis='y',linestyle='--', color='gray')  # Change gridline color to white for visibility
ax2.set_ylim(fee_burn_and_tx_metrics['SplyBurntNtv'].min()*1.05,0)
fig.tight_layout()
plt.show()
```

    2024-09-09 13:56:04 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 13:56:04 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 13:56:04 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 13:56:04 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 13:56:04 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 13:56:04 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 13:56:04 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 13:56:04 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 13:56:04 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 13:56:04 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 13:56:04 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 13:56:04 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 13:56:04 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 13:56:06 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 13:56:06 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 13:56:06 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 13:56:06 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 13:56:06 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 13:56:06 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 13:56:06 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 13:56:06 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 13:56:07 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 13:56:07 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 13:56:07 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 13:56:07 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 13:56:07 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 13:56:07 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 13:56:07 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 13:56:07 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 13:56:07 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 13:56:16 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 13:56:16 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 13:56:16 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 13:56:16 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 13:56:16 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 13:56:16 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 13:56:16 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 13:56:16 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 13:56:16 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 13:56:17 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 13:56:17 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 13:56:17 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 13:56:17 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 13:56:18 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 13:56:18 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 13:56:18 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 13:56:18 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 13:56:18 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 13:56:18 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 13:56:18 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 13:56:18 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 13:56:18 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 13:56:18 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 13:56:18 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 13:56:18 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 13:56:18 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 13:56:19 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 13:56:19 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 13:56:19 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 13:56:19 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 13:56:19 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 13:56:19 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 13:56:19 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 13:56:19 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 13:56:19 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 13:56:19 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 13:56:19 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 13:56:19 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 13:56:19 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 13:56:19 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 13:56:19 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 13:56:19 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 13:56:20 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 13:56:20 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 13:56:20 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 13:56:20 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 13:56:20 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 13:56:20 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 13:56:20 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 13:56:20 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 13:56:20 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 13:56:20 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 13:56:20 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 13:56:20 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 13:56:20 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 13:56:20 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 13:56:20 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 13:56:20 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 13:56:20 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 13:56:20 WARNING  findfont: Font family 'Lato' not found.



    
![png](output_17_1.png)
    


## BTC Block Interval vs. Mean Fee

In contrast to Etheruem's predictable 12-second block time, Bitcoin's block interval is based on probabilistic factors— there's no way of knowing for sure when the next block will come in. 

The blockchain's difficulty adjustment software targets an average block interval of 10 minutes, but blocks can occasionally take an hour or more to be mined, resulting in brief periods of transaction congestion. This congestion can result in spikes in transaction fees, as a busy backlog of BTC users bid up fees in order to ensure their inclusion in the next block.

In the following analysis, we examine how Bitcoin's median transaction fee (**FeeMedUSD**) responds to prolonged block intervals (**BlkIntMean**).


```python
blk_size_and_fee_metrics = client.get_asset_metrics(
    assets='btc',
    metrics=['BlkIntMean','FeeMedUSD'],
    start_time = start,
    frequency='1h'
).to_dataframe()
```


```python
blk_size_and_fee_metrics['time'] = pd.to_datetime(blk_size_and_fee_metrics['time'])
blk_size_and_fee_metrics['FeeMedUSD'] = blk_size_and_fee_metrics['FeeMedUSD'].replace('None', np.nan).astype(float)
blk_size_and_fee_metrics['BlkIntMean'] = blk_size_and_fee_metrics['BlkIntMean'] / 60
```


```python
blk_size_and_fee_metrics.set_index('time')
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
      <th>BlkIntMean</th>
      <th>FeeMedUSD</th>
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
      <th>2024-09-02 19:00:00+00:00</th>
      <td>btc</td>
      <td>8.398148</td>
      <td>0.181229</td>
    </tr>
    <tr>
      <th>2024-09-02 20:00:00+00:00</th>
      <td>btc</td>
      <td>8.930952</td>
      <td>0.174959</td>
    </tr>
    <tr>
      <th>2024-09-02 21:00:00+00:00</th>
      <td>btc</td>
      <td>6.291667</td>
      <td>0.177847</td>
    </tr>
    <tr>
      <th>2024-09-02 22:00:00+00:00</th>
      <td>btc</td>
      <td>9.89</td>
      <td>0.769682</td>
    </tr>
    <tr>
      <th>2024-09-02 23:00:00+00:00</th>
      <td>btc</td>
      <td>8.745238</td>
      <td>0.421212</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>2024-09-09 12:00:00+00:00</th>
      <td>btc</td>
      <td>10.527778</td>
      <td>0.292639</td>
    </tr>
    <tr>
      <th>2024-09-09 13:00:00+00:00</th>
      <td>btc</td>
      <td>8.284848</td>
      <td>0.167118</td>
    </tr>
    <tr>
      <th>2024-09-09 14:00:00+00:00</th>
      <td>btc</td>
      <td>5.003333</td>
      <td>0.162879</td>
    </tr>
    <tr>
      <th>2024-09-09 15:00:00+00:00</th>
      <td>btc</td>
      <td>7.488889</td>
      <td>0.166460</td>
    </tr>
    <tr>
      <th>2024-09-09 16:00:00+00:00</th>
      <td>btc</td>
      <td>6.97</td>
      <td>0.539007</td>
    </tr>
  </tbody>
</table>
<p>166 rows × 3 columns</p>
</div>




```python
fig, ax1 = plt.subplots(figsize=(16,8))

# Calculate width of bars in terms of the time difference
width = 0.02

ax1.set_title('\nBTC Block Interval vs.\nMedian Tx Fee (1H)\n', color='black', fontsize=16)
ax1.set_facecolor('#212530')

# Bar chart for BlkIntMean
ax1.bar(blk_size_and_fee_metrics['time'], blk_size_and_fee_metrics['BlkIntMean'], width=width, color='#ffb836', label='Mean Block Interval')
ax1.set_xlabel('')
ax1.set_ylabel('Block Interval (mins)\n', fontsize=12.5)
ax1.tick_params(axis='y')

# Set x-axis limits
ax1.set_xlim([blk_size_and_fee_metrics['time'].min(), blk_size_and_fee_metrics['time'].max()])

ax1.grid(axis='x',linestyle='--', color='gray')  # Change gridline color to white for visibility
# Line chart for FeeMeanUSD on a second y-axis
ax2 = ax1.twinx()
ax2.plot(blk_size_and_fee_metrics['time'], blk_size_and_fee_metrics['FeeMedUSD'], color='#62fc98', label='Median Fee (USD)')
ax2.set_ylabel('\nMedian Fee (USD)', fontsize=12.5)
ax2.tick_params(axis='y')

# Display the legend
fig.legend(loc="upper left", bbox_to_anchor=(0.82,1.1), bbox_transform=ax1.transAxes, frameon=False)

plt.show()
```

    2024-09-09 15:56:09 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 15:56:09 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 15:56:09 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 15:56:09 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 15:56:09 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 15:56:09 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 15:56:09 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 15:56:09 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 15:56:09 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 15:56:09 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 15:56:09 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 15:56:10 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 15:56:10 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 15:56:10 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 15:56:10 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 15:56:10 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 15:56:10 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 15:56:10 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 15:56:10 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 15:56:10 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 15:56:10 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 15:56:10 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 15:56:10 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 15:56:10 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 15:56:10 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 15:56:10 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 15:56:10 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 15:56:10 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 15:56:10 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 15:56:10 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 15:56:10 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 15:56:10 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 15:56:10 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 15:56:10 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 15:56:10 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 15:56:10 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 15:56:10 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 15:56:10 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 15:56:10 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 15:56:10 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 15:56:10 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 15:56:10 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 15:56:10 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 15:56:11 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 15:56:11 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 15:56:11 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 15:56:11 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 15:56:11 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 15:56:11 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 15:56:11 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 15:56:11 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 15:56:11 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 15:56:11 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 15:56:11 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 15:56:11 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 15:56:11 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 15:56:11 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 15:56:11 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 15:56:11 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 15:56:11 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 15:56:11 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 15:56:11 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 15:56:11 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 15:56:11 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 15:56:11 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 15:56:11 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 15:56:11 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 15:56:11 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 15:56:11 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 15:56:11 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 15:56:11 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 15:56:11 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 15:56:11 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 15:56:11 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 15:56:11 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 15:56:11 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 15:56:11 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 15:56:11 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 15:56:11 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 15:56:11 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 15:56:11 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 15:56:11 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 15:56:11 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 15:56:11 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 15:56:11 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 15:56:11 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 15:56:11 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 15:56:11 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 15:56:11 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 15:56:11 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 15:56:11 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 15:56:11 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 15:56:11 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 15:56:11 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 15:56:11 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 15:56:11 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 15:56:11 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 15:56:11 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 15:56:11 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 15:56:11 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 15:56:11 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 15:56:11 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 15:56:11 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 15:56:11 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 15:56:11 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 15:56:11 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 15:56:11 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 15:56:11 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 15:56:11 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 15:56:11 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 15:56:11 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 15:56:11 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 15:56:11 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 15:56:11 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 15:56:11 WARNING  findfont: Font family 'Lato' not found.
    2024-09-09 15:56:11 WARNING  findfont: Font family 'Lato' not found.



    
![png](output_23_1.png)
    

