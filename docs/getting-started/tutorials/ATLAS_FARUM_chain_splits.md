<img src="https://5264302.fs1.hubspotusercontent-na1.net/hubfs/5264302/Demo%20Asset%20Resources/Demo%20Covers/CM-Demo-chain-splits-Cover.png" width=1100 margin-left='auto' margin-right='auto'/>

This notebook demonstrates basic functionality offered by the Coin Metrics Python API Client, ATLAS, and FARUM.

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
from pytz import timezone as timezone_conv
from datetime import timezone as timezone_info
import matplotlib.dates as mdates
import matplotlib.pyplot as plt
%matplotlib inline
import ast
import matplotlib.ticker as ticker
import matplotlib as mpl
```


```python
plt.rcParams["figure.figsize"] = (13,7)
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

    2024-09-12 17:22:34 INFO     Using API key found in environment


# What is a Blockchain Split?

Blockchain Splits, also known as chain splits, occurr when two or more versions of the blockchain can be observed at the same height. Often, splits are a natural by-product of a network's consensus protocol. For example, if two Bitcoin miners happen to find mine block at the same time, the blockchain is split into two versions. In such events, a race condition ensues whereby miners must converge on a single version. Ultimately, only one of the blocks will be considered valid and all competing versions become stale.

# ATLAS Blockchain Search Engine

Coin Metrics **ATLAS** is more than just a blockchain explorer. ATLAS is better defined as a complete blockchain search engine, enabling users to look up information on transactions, addresses, and blocks via a high-performance API.  ATLAS provides a uniform interface for querying on-chain data— regardless of network accounting standards or blockchain architecture— using the standard double-entry bookkeeping format. 

By leveraging the unique capabilities of the ATLAS API, users can easily access and analyze detailed information about any block, regardless of whether those blocks are part of the main chain.

## Retrieve blocks at height 781277

With ATLAS v2, we can retrieve a list of blocks at a particular block height. Specifying the chain parameter as *main* will return only the block in the consensus "longest chain," while specifying *all* will return any block mined, including those that have since become 'stale.'


```python
asset = 'btc'
```


```python
# Main block at height 781277
main_block = client.get_list_of_blocks_v2(
    asset=asset,
    start_height='781277',
    end_height='781277',
    chain='main'
).to_dataframe()
```


```python
main_block.transpose()
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
      <th>block_hash</th>
      <td>000000000000000000014bdfbf46969d9b1f290ad21f27...</td>
    </tr>
    <tr>
      <th>height</th>
      <td>781277</td>
    </tr>
    <tr>
      <th>consensus_time</th>
      <td>2023-03-18 00:48:39+00:00</td>
    </tr>
    <tr>
      <th>miner_time</th>
      <td>2023-03-18 01:41:17+00:00</td>
    </tr>
    <tr>
      <th>n_transactions</th>
      <td>2321</td>
    </tr>
    <tr>
      <th>n_balance_updates</th>
      <td>16884</td>
    </tr>
    <tr>
      <th>parent_block_hash</th>
      <td>00000000000000000004627dcc2895cf0364c1defacdec...</td>
    </tr>
    <tr>
      <th>nonce</th>
      <td>3d281699</td>
    </tr>
    <tr>
      <th>extra_data</th>
      <td>03ddeb0b192f5669614254432f4d696e65642062792031...</td>
    </tr>
    <tr>
      <th>version</th>
      <td>797122560</td>
    </tr>
    <tr>
      <th>difficulty</th>
      <td>43551722213590.367188</td>
    </tr>
    <tr>
      <th>physical_size</th>
      <td>1961922</td>
    </tr>
    <tr>
      <th>consensus_size</th>
      <td>3993249</td>
    </tr>
    <tr>
      <th>consensus_size_limit</th>
      <td>4000000</td>
    </tr>
  </tbody>
</table>
</div>




```python

```


```python
# Main and stale blocks at height 781277
all_blocks = client.get_list_of_blocks_v2(
    asset=asset,
    start_height='781277',
    end_height='781277',
    chain='all'
).to_dataframe()
```


```python
all_blocks.transpose()
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
      <th>1</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>block_hash</th>
      <td>000000000000000000014bdfbf46969d9b1f290ad21f27...</td>
      <td>0000000000000000000388f42000fa901c01f2bfae3604...</td>
    </tr>
    <tr>
      <th>height</th>
      <td>781277</td>
      <td>781277</td>
    </tr>
    <tr>
      <th>consensus_time</th>
      <td>2023-03-18 00:48:39+00:00</td>
      <td>2023-03-18 00:48:39+00:00</td>
    </tr>
    <tr>
      <th>miner_time</th>
      <td>2023-03-18 01:41:17+00:00</td>
      <td>2023-03-18 01:41:10+00:00</td>
    </tr>
    <tr>
      <th>n_transactions</th>
      <td>2321</td>
      <td>2326</td>
    </tr>
    <tr>
      <th>n_balance_updates</th>
      <td>16884</td>
      <td>16794</td>
    </tr>
    <tr>
      <th>parent_block_hash</th>
      <td>00000000000000000004627dcc2895cf0364c1defacdec...</td>
      <td>00000000000000000004627dcc2895cf0364c1defacdec...</td>
    </tr>
    <tr>
      <th>nonce</th>
      <td>3d281699</td>
      <td>7ef82ca3</td>
    </tr>
    <tr>
      <th>extra_data</th>
      <td>03ddeb0b192f5669614254432f4d696e65642062792031...</td>
      <td>03ddeb0b04b71615642f466f756e647279205553412050...</td>
    </tr>
    <tr>
      <th>version</th>
      <td>797122560</td>
      <td>631144448</td>
    </tr>
    <tr>
      <th>difficulty</th>
      <td>43551722213590.367188</td>
      <td>43551722213590.367188</td>
    </tr>
    <tr>
      <th>physical_size</th>
      <td>1961922</td>
      <td>1982002</td>
    </tr>
    <tr>
      <th>consensus_size</th>
      <td>3993249</td>
      <td>3993049</td>
    </tr>
    <tr>
      <th>consensus_size_limit</th>
      <td>4000000</td>
      <td>4000000</td>
    </tr>
  </tbody>
</table>
</div>



# FARUM Reorg & Fork Tracker

Coin Metrics **FARUM** is a blockchain risk management API designed to alert network participants of a wide spectrum of network events that may impact transaction settlement.

FARUM's Reorg & Fork Tracker is a tool that can be used to monitor the conditions at the blockchain tip, the most recent set of blocks. This endpoint provides all context to understand when a network wide split is occurring, or when a network wide reorg has occurred.

## Retrieve observable chains before/after the split at height 781277


```python
list_asset_chains = client.get_asset_chains(
    assets='btc',
    start_time='2023-03-18T00:00:00',
    end_time='2023-03-18T03:00:00'
).to_list()
```


```python
list_asset_chains[:5]
```




    [{'asset': 'btc',
      'time': '2023-03-18T00:23:39.000000000Z',
      'chains_count': '1',
      'blocks_count_at_tip': '1',
      'chains': [[{'time': '2023-03-18T00:23:39.000000000Z',
         'hash': '00000000000000000003b401838b7494d42ff7578a3305173a1b064c2a81abaf',
         'height': '781274'}]]},
     {'asset': 'btc',
      'time': '2023-03-18T00:38:56.000000000Z',
      'chains_count': '1',
      'blocks_count_at_tip': '1',
      'chains': [[{'time': '2023-03-18T00:38:56.000000000Z',
         'hash': '00000000000000000002074e62194c210280195d157e1f2527d93f8b8cb713e9',
         'height': '781275'}]]},
     {'asset': 'btc',
      'time': '2023-03-18T00:41:27.000000000Z',
      'chains_count': '1',
      'blocks_count_at_tip': '1',
      'chains': [[{'time': '2023-03-18T00:41:27.000000000Z',
         'hash': '00000000000000000004627dcc2895cf0364c1defacdeca8c74995a7c54e5712',
         'height': '781276'}]]},
     {'asset': 'btc',
      'time': '2023-03-18T00:48:39.000000000Z',
      'chains_count': '1',
      'blocks_count_at_tip': '1',
      'chains': [[{'time': '2023-03-18T00:48:39.000000000Z',
         'hash': '0000000000000000000388f42000fa901c01f2bfae36042bbae133ee430e6485',
         'height': '781277'}]]},
     {'asset': 'btc',
      'time': '2023-03-18T00:48:39.000000000Z',
      'chains_count': '2',
      'blocks_count_at_tip': '2',
      'chains': [[{'time': '2023-03-18T00:41:27.000000000Z',
         'hash': '00000000000000000004627dcc2895cf0364c1defacdeca8c74995a7c54e5712',
         'height': '781276'},
        {'time': '2023-03-18T00:48:39.000000000Z',
         'hash': '000000000000000000014bdfbf46969d9b1f290ad21f27f263e14881ef595627',
         'height': '781277'}],
       [{'time': '2023-03-18T00:41:27.000000000Z',
         'hash': '00000000000000000004627dcc2895cf0364c1defacdeca8c74995a7c54e5712',
         'height': '781276'},
        {'time': '2023-03-18T00:48:39.000000000Z',
         'hash': '0000000000000000000388f42000fa901c01f2bfae36042bbae133ee430e6485',
         'height': '781277'}]]}]




```python
# pd.json_normalize(df['chains'])
```


```python
df = pd.DataFrame(list_asset_chains)
df['time'] = pd.to_datetime(df['time'])
```


```python
# # Convert the 'chains' column from a string to a list of lists
# df['chains'] = df['chains'].apply(lambda x: ast.literal_eval(x))
```


```python
# create empty lists to store the chain data
chain_a_height = []
chain_a_hash = []
chain_b_height = []
chain_b_hash = []
time_index = []

# loop through each row in the original DataFrame
for index, row in df.iterrows():
    chains = row['chains']
    time = row['time']
    time_index.append(time)

    # get the latest height and hash values for each chain
    chain_a_last_height = -1
    chain_a_last_hash = ''
    chain_b_last_height = -1
    chain_b_last_hash = ''

    for chain in chains:
        chain_last_height = chain[-1]['height']
        chain_last_hash = chain[-1]['hash']

        # compare the hash values to determine which chain this corresponds to
        if chain_a_last_hash == '' or chain_last_hash == chain_a_last_hash:
            # this is Chain A
            for block in chain:
                if int(block['height']) > chain_a_last_height:
                    chain_a_last_height = int(block['height'])
                    chain_a_last_hash = block['hash']
            chain_a_height.append(chain_a_last_height)
            chain_a_hash.append(chain_a_last_hash)
        elif chain_b_last_hash == '' or chain_last_hash == chain_b_last_hash:
            # this is Chain B
            for block in chain:
                if int(block['height']) > chain_b_last_height:
                    chain_b_last_height = int(block['height'])
                    chain_b_last_hash = block['hash']
            chain_b_height.append(chain_b_last_height)
            chain_b_hash.append(chain_b_last_hash)

    # if there is no Chain B, append NaN values
    if len(chains) == 1:
        chain_b_height.append(np.nan)
        chain_b_hash.append(np.nan)
    # if Chain A and Chain B were switched, swap the values
    elif chain_b_last_height > chain_a_last_height:
        # check if the Chain A and Chain B values are swapped
        if chain_a_last_hash == chain_b_hash[-1] and chain_b_last_hash == chain_a_hash[-1]:
            chain_a_height[-1], chain_b_height[-1] = chain_b_height[-1], chain_a_height[-1]
            chain_a_hash[-1], chain_b_hash[-1] = chain_b_hash[-1], chain_a_hash[-1]
        else:
            chain_a_height[-1], chain_b_height[-1] = chain_b_height[-1], chain_a_height[-1]
            chain_a_hash[-1], chain_b_hash[-1] = chain_b_hash[-1], chain_a_hash[-1]

# create a new DataFrame with the extracted data
data = {'Chain A Height': chain_a_height,
        'Chain A Hash': chain_a_hash,
        'Chain B Height': chain_b_height,
        'Chain B Hash': chain_b_hash}
new_df = pd.DataFrame(data, index=time_index)

# set the "time" column as the index
new_df.index.name = 'Time'
```


```python
new_df
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
      <th>Chain A Height</th>
      <th>Chain A Hash</th>
      <th>Chain B Height</th>
      <th>Chain B Hash</th>
    </tr>
    <tr>
      <th>Time</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2023-03-18 00:23:39+00:00</th>
      <td>781274</td>
      <td>00000000000000000003b401838b7494d42ff7578a3305...</td>
      <td>NaN</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>2023-03-18 00:38:56+00:00</th>
      <td>781275</td>
      <td>00000000000000000002074e62194c210280195d157e1f...</td>
      <td>NaN</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>2023-03-18 00:41:27+00:00</th>
      <td>781276</td>
      <td>00000000000000000004627dcc2895cf0364c1defacdec...</td>
      <td>NaN</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>2023-03-18 00:48:39+00:00</th>
      <td>781277</td>
      <td>0000000000000000000388f42000fa901c01f2bfae3604...</td>
      <td>NaN</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>2023-03-18 00:48:39+00:00</th>
      <td>781277</td>
      <td>000000000000000000014bdfbf46969d9b1f290ad21f27...</td>
      <td>781277.0</td>
      <td>0000000000000000000388f42000fa901c01f2bfae3604...</td>
    </tr>
    <tr>
      <th>2023-03-18 00:53:20+00:00</th>
      <td>781278</td>
      <td>00000000000000000001e34fc5c0db02f3061e9d14df1d...</td>
      <td>781277.0</td>
      <td>0000000000000000000388f42000fa901c01f2bfae3604...</td>
    </tr>
    <tr>
      <th>2023-03-18 01:05:00+00:00</th>
      <td>781279</td>
      <td>000000000000000000001a682f0381d691e3588824b15c...</td>
      <td>781277.0</td>
      <td>0000000000000000000388f42000fa901c01f2bfae3604...</td>
    </tr>
    <tr>
      <th>2023-03-18 01:13:52+00:00</th>
      <td>781280</td>
      <td>00000000000000000004d91e2075caaeac5686fa5081f5...</td>
      <td>781277.0</td>
      <td>0000000000000000000388f42000fa901c01f2bfae3604...</td>
    </tr>
    <tr>
      <th>2023-03-18 01:29:04+00:00</th>
      <td>781281</td>
      <td>00000000000000000000b5ae508a89556390e2be174eec...</td>
      <td>781277.0</td>
      <td>0000000000000000000388f42000fa901c01f2bfae3604...</td>
    </tr>
    <tr>
      <th>2023-03-18 01:41:17+00:00</th>
      <td>781282</td>
      <td>000000000000000000016bfaea5a6cf051e6099e348527...</td>
      <td>781277.0</td>
      <td>0000000000000000000388f42000fa901c01f2bfae3604...</td>
    </tr>
    <tr>
      <th>2023-03-18 01:46:05+00:00</th>
      <td>781283</td>
      <td>00000000000000000000701e8f5e1ac355653c91535e39...</td>
      <td>781277.0</td>
      <td>0000000000000000000388f42000fa901c01f2bfae3604...</td>
    </tr>
    <tr>
      <th>2023-03-18 02:03:55+00:00</th>
      <td>781284</td>
      <td>000000000000000000039285a530bc53bd54febe45e2c8...</td>
      <td>781277.0</td>
      <td>0000000000000000000388f42000fa901c01f2bfae3604...</td>
    </tr>
    <tr>
      <th>2023-03-18 02:25:40+00:00</th>
      <td>781285</td>
      <td>0000000000000000000135cd37c3c997986b734bdf2f04...</td>
      <td>NaN</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>2023-03-18 02:31:12+00:00</th>
      <td>781286</td>
      <td>00000000000000000002012898d08688b0048989acbe1a...</td>
      <td>NaN</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>2023-03-18 02:35:58+00:00</th>
      <td>781287</td>
      <td>00000000000000000003a3775d85cbdfaea5f88e8499d5...</td>
      <td>NaN</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>2023-03-18 02:48:52+00:00</th>
      <td>781288</td>
      <td>00000000000000000005b19615630f3e093f2c09844f6f...</td>
      <td>NaN</td>
      <td>NaN</td>
    </tr>
  </tbody>
</table>
</div>




```python
def format_func(value, tick_number):
    return format(int(value), ',')

fig, ax = plt.subplots(figsize=(12,8))
title = ax.set_title('\n\nBitcoin Chain Split\n', fontsize=20)
title.set_position([.5, 1.05])
plt.suptitle('\n\n\n       March 18, 2023 - 00:48:39 UTC', fontsize=12)

mpl.rcParams['font.family'] = 'Arial'

ax.scatter(new_df.index, new_df['Chain A Height'], label='Chain A Height', marker='s', s=150,alpha=0.5)
ax.scatter(new_df.index, new_df['Chain B Height'], label='Chain B Height', marker='s', s=150,alpha=0.5)
ax.plot(new_df.index, new_df['Chain A Height'], linestyle='--', color='lightblue', linewidth=0.5, alpha=1.0)
ax.plot(new_df.index, new_df['Chain B Height'], linestyle='--', color='orange', linewidth=0.5, alpha=1.0)

ax.set_xlabel('')
ax.set_ylabel('Block Height\n', fontsize=13)
plt.legend()
plt.ticklabel_format(style='plain', axis='y')
legend = ax.legend(labels=['...014bd... Chain', '...0388f... Chain'], frameon=False, loc='upper right',bbox_to_anchor=(1.01, 1.1))

ax.yaxis.grid(True, alpha=0.5, linestyle='--')
plt.yticks(new_df['Chain A Height'].tolist())
ax.xaxis.set_major_formatter(mdates.DateFormatter('%m/%d \n %H:%M:%S \nUTC'))
ax.yaxis.set_major_formatter(ticker.FuncFormatter(format_func))

timestamp = pd.Timestamp('2023-03-18 0:48:39')
ax.axvline(timestamp,color='black',linestyle='--')
ax.annotate('Foundry & ViaBTC\nMine Blocks \nAt Same Height', xy=(timestamp, ax.get_ylim()[1]), xytext=(8, -235), textcoords='offset points',
            fontsize=10.2, color='black', ha='left', va='bottom')

timestamp = pd.Timestamp('2023-03-18 01:46:05')
ax.axvline(timestamp,color='black',linestyle='--')
ax.annotate('Foundry Mines Block on \nViaBTC Chain', xy=(timestamp, ax.get_ylim()[1]), xytext=(8, -100), textcoords='offset points',
            fontsize=10.2, color='black', ha='left', va='bottom')

plt.annotate('Source: Coin Metrics FARUM',weight='book',font='arial',size=10,xy=(1.0, 0), xycoords='axes fraction',color='black',xytext=(-8, 6), textcoords='offset pixels',horizontalalignment='right',verticalalignment='bottom')
plt.annotate('Observable Chains',weight='bold',font='arial',size=14,xy=(0.85, 1.03), xycoords='axes fraction',color='black',xytext=(-8, 6), textcoords='offset pixels',horizontalalignment='right',verticalalignment='bottom')

plt.show()
```


    
![png](output_27_0.png)
    



```python

```


```python

```


```python

```
