<img src="https://5264302.fs1.hubspotusercontent-na1.net/hubfs/5264302/Demo%20Asset%20Resources/CM-Demo-address_analysis-Cover.png" width=1100 margin-left='auto' margin-right='auto'/>

The open accounting systems of public blockchain networks enable an unprecedented level of transparency, but raw blockchain data can be difficult to decipher. Coin Metrics **ATLAS** blockchain search engine allows users to investigate address activity by transforming complex on-chain metadata into more easily understandable debits and credits using a Universal Blockchain Data Model (UBDM).

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
from matplotlib.dates import MonthLocator, DateFormatter, YearLocator, AutoDateLocator
from matplotlib.ticker import NullFormatter
%matplotlib inline
import plotly
from plotly.subplots import make_subplots
import plotly.graph_objs as go
from dateutil.relativedelta import relativedelta
```


```python
logging.basicConfig(
    format='%(asctime)s %(levelname)-8s %(message)s',
    level=logging.INFO,
    datefmt='%Y-%m-%d %H:%M:%S'
)
plt.rcParams["figure.figsize"] = (16,9)
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

    2024-09-12 16:17:43 INFO     Using API key found in environment


# ATLAS Blockchain Search Engine

ATLAS is more than just a blockchain explorer. ATLAS is better defined as a complete blockchain search engine, enabling users to look up information on transactions, addresses, and blocks via a high-performance API.  ATLAS provides a uniform interface for querying on-chain data— regardless of network accounting standards or blockchain architecture— using the standard double-entry bookkeeping format. 

By leveraging the unique capabilities of the ATLAS API, users can easily access and analyze detailed information about on-chain value transfers.

## Retrieve Basic Account Info


```python
asset = 'usdc'
# Tagged Kraken address
account = '0xae2d4617c862309a3d75a0ffb358c7a5009c673f'
```


```python
account_info = client.get_list_of_accounts_v2(
    accounts=account,
    asset=asset
).to_dataframe()
```


```python
account_info.transpose()
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
      <th>account</th>
      <td>ae2d4617c862309a3d75a0ffb358c7a5009c673f</td>
    </tr>
    <tr>
      <th>type</th>
      <td>ACCOUNT</td>
    </tr>
    <tr>
      <th>creation_height</th>
      <td>9227547</td>
    </tr>
    <tr>
      <th>creation_block_hash</th>
      <td>9859e085f0bd073650078987216e70230e6799f896cfbf...</td>
    </tr>
    <tr>
      <th>creation_time</th>
      <td>2020-01-06 14:46:21+00:00</td>
    </tr>
    <tr>
      <th>creation_chain_sequence_number</th>
      <td>39632012587302917</td>
    </tr>
    <tr>
      <th>balance</th>
      <td>218903264.992134</td>
    </tr>
    <tr>
      <th>n_debits</th>
      <td>494023</td>
    </tr>
    <tr>
      <th>n_credits</th>
      <td>573978</td>
    </tr>
    <tr>
      <th>last_chain_sequence_number</th>
      <td>89065415421984784</td>
    </tr>
    <tr>
      <th>last_debit_height</th>
      <td>20737158</td>
    </tr>
    <tr>
      <th>last_credit_height</th>
      <td>20737149</td>
    </tr>
  </tbody>
</table>
</div>



## Retrieve Account Balance Updates


```python
end = datetime.now()
start = end - timedelta(days=90)
```


```python

bal_updates = client.get_list_of_balance_updates_v2(
    accounts=account,
    asset=asset,
    start_time=start,
    end_time=end,
    page_size=10000
).parallel(time_increment=timedelta(days=1)).to_dataframe()
```

    Exporting to dataframe type: 100%|██████████████████████████████████████████████████| 90/90 [00:03<00:00, 25.33it/s]



```python
list(bal_updates.columns)
```




    ['chain_sequence_number',
     'account',
     'account_creation_height',
     'change',
     'previous_balance',
     'new_balance',
     'transaction_sequence_number',
     'n_debits',
     'n_credits',
     'block_hash',
     'height',
     'consensus_time',
     'credit',
     'total_received',
     'total_sent',
     'previous_debit_height',
     'previous_credit_height',
     'previous_chain_sequence_number',
     'txid']




```python
# The 'new_balance' field can be used to plot amount held by an address after each update
bal_only = bal_updates[['new_balance','height']].copy()
bal_only.index = bal_only.height
bal_only = bal_only[~bal_only.index.duplicated(keep='first')]
bal_only["new_balance"] = bal_only.new_balance.astype(float)
bal_only = bal_only.drop(columns=['height'])
bal_only
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
      <th>new_balance</th>
    </tr>
    <tr>
      <th>height</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>20091188</th>
      <td>1.645689e+08</td>
    </tr>
    <tr>
      <th>20091190</th>
      <td>1.658713e+08</td>
    </tr>
    <tr>
      <th>20091195</th>
      <td>1.658718e+08</td>
    </tr>
    <tr>
      <th>20091214</th>
      <td>1.659114e+08</td>
    </tr>
    <tr>
      <th>20091220</th>
      <td>1.659315e+08</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
    </tr>
    <tr>
      <th>20735606</th>
      <td>2.156230e+08</td>
    </tr>
    <tr>
      <th>20735637</th>
      <td>2.156341e+08</td>
    </tr>
    <tr>
      <th>20735644</th>
      <td>2.156308e+08</td>
    </tr>
    <tr>
      <th>20735662</th>
      <td>2.156318e+08</td>
    </tr>
    <tr>
      <th>20735669</th>
      <td>2.155819e+08</td>
    </tr>
  </tbody>
</table>
<p>53722 rows × 1 columns</p>
</div>




```python
ax = bal_only.plot.area(figsize=(13.5, 8),color='orange')
plt.ylim([bal_only['new_balance'].min()*0.99, bal_only['new_balance'].max()])
ax.yaxis.set_ticks(plt.gca().get_yticks())
plt.gca().set_yticklabels([str('{:,.0f} ' + str(asset).upper()).format(x) for x in ax.get_yticks().tolist()])
ax.yaxis.set_ticks(plt.gca().get_yticks())
plt.setp(ax.get_xticklabels(), rotation=45)
plt.title(str('\nAccount Balance\n'),fontdict={'fontsize':23})
plt.suptitle('\n\n' + str(account[0:5] + '...' +  str(account[-5:])) + '\n')
plt.xlim([bal_only.index[0], bal_only.index[-1]])
ax.set_xlabel("\nBlock Height\n", fontsize = 11)
ax.get_legend().remove()
```


    
![png](output_15_0.png)
    


## Map Aggregated Inflows/Outflows


```python
bal_updates['consensus_time'] = bal_updates['consensus_time'].values.astype('<M8[D]')
```


```python
all_inflows = bal_updates.loc[bal_updates.change > 0]
all_inflows = pd.DataFrame(all_inflows.groupby('consensus_time')['change'].sum())
new_index = pd.date_range(start, end, freq='D')
all_inflows['Inflow (7D)'] = all_inflows['change'].rolling(7).mean()
all_inflows = all_inflows.dropna()
all_inflows
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
      <th>change</th>
      <th>Inflow (7D)</th>
    </tr>
    <tr>
      <th>consensus_time</th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2024-06-20</th>
      <td>27767185.833327</td>
      <td>2.224316e+07</td>
    </tr>
    <tr>
      <th>2024-06-21</th>
      <td>35920343.141371</td>
      <td>2.540398e+07</td>
    </tr>
    <tr>
      <th>2024-06-22</th>
      <td>4344250.089062</td>
      <td>2.512754e+07</td>
    </tr>
    <tr>
      <th>2024-06-23</th>
      <td>3655527.587898</td>
      <td>2.475073e+07</td>
    </tr>
    <tr>
      <th>2024-06-24</th>
      <td>29144450.78971</td>
      <td>2.318472e+07</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>2024-09-08</th>
      <td>11234483.316814</td>
      <td>2.646577e+07</td>
    </tr>
    <tr>
      <th>2024-09-09</th>
      <td>35082020.361127</td>
      <td>2.799553e+07</td>
    </tr>
    <tr>
      <th>2024-09-10</th>
      <td>24809930.321601</td>
      <td>2.702816e+07</td>
    </tr>
    <tr>
      <th>2024-09-11</th>
      <td>21020540.169323</td>
      <td>2.343855e+07</td>
    </tr>
    <tr>
      <th>2024-09-12</th>
      <td>17710498.148422</td>
      <td>2.207771e+07</td>
    </tr>
  </tbody>
</table>
<p>85 rows × 2 columns</p>
</div>




```python
all_outflows = bal_updates.loc[bal_updates.change < 0]
all_outflows = pd.DataFrame(all_outflows.groupby('consensus_time')['change'].sum())
new_index = pd.date_range(start, end, freq='D')
all_outflows['Outflow (7D)'] = all_outflows['change'].rolling(7).mean()
all_outflows = all_outflows.dropna()
all_outflows
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
      <th>change</th>
      <th>Outflow (7D)</th>
    </tr>
    <tr>
      <th>consensus_time</th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2024-06-20</th>
      <td>-22312750.357754</td>
      <td>-2.122269e+07</td>
    </tr>
    <tr>
      <th>2024-06-21</th>
      <td>-40484979.116283</td>
      <td>-2.536637e+07</td>
    </tr>
    <tr>
      <th>2024-06-22</th>
      <td>-4083755.074052</td>
      <td>-2.448948e+07</td>
    </tr>
    <tr>
      <th>2024-06-23</th>
      <td>-4117626.03075</td>
      <td>-2.460757e+07</td>
    </tr>
    <tr>
      <th>2024-06-24</th>
      <td>-32575644.187802</td>
      <td>-2.220271e+07</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>2024-09-08</th>
      <td>-6893613.502699</td>
      <td>-2.600324e+07</td>
    </tr>
    <tr>
      <th>2024-09-09</th>
      <td>-31977989.371912</td>
      <td>-2.782010e+07</td>
    </tr>
    <tr>
      <th>2024-09-10</th>
      <td>-26160239.299303</td>
      <td>-2.823174e+07</td>
    </tr>
    <tr>
      <th>2024-09-11</th>
      <td>-24250619.966492</td>
      <td>-2.464224e+07</td>
    </tr>
    <tr>
      <th>2024-09-12</th>
      <td>-31917789.866378</td>
      <td>-2.433360e+07</td>
    </tr>
  </tbody>
</table>
<p>85 rows × 2 columns</p>
</div>




```python
inflows_and_outflows = pd.concat([all_inflows, all_outflows], axis=1)
inflows_and_outflows[['Inflow (7D)','Outflow (7D)']]
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
      <th>Inflow (7D)</th>
      <th>Outflow (7D)</th>
    </tr>
    <tr>
      <th>consensus_time</th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2024-06-20</th>
      <td>2.224316e+07</td>
      <td>-2.122269e+07</td>
    </tr>
    <tr>
      <th>2024-06-21</th>
      <td>2.540398e+07</td>
      <td>-2.536637e+07</td>
    </tr>
    <tr>
      <th>2024-06-22</th>
      <td>2.512754e+07</td>
      <td>-2.448948e+07</td>
    </tr>
    <tr>
      <th>2024-06-23</th>
      <td>2.475073e+07</td>
      <td>-2.460757e+07</td>
    </tr>
    <tr>
      <th>2024-06-24</th>
      <td>2.318472e+07</td>
      <td>-2.220271e+07</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>2024-09-08</th>
      <td>2.646577e+07</td>
      <td>-2.600324e+07</td>
    </tr>
    <tr>
      <th>2024-09-09</th>
      <td>2.799553e+07</td>
      <td>-2.782010e+07</td>
    </tr>
    <tr>
      <th>2024-09-10</th>
      <td>2.702816e+07</td>
      <td>-2.823174e+07</td>
    </tr>
    <tr>
      <th>2024-09-11</th>
      <td>2.343855e+07</td>
      <td>-2.464224e+07</td>
    </tr>
    <tr>
      <th>2024-09-12</th>
      <td>2.207771e+07</td>
      <td>-2.433360e+07</td>
    </tr>
  </tbody>
</table>
<p>85 rows × 2 columns</p>
</div>




```python
inflows_and_outflows['Net Flows (7D)'] = inflows_and_outflows['Inflow (7D)'] + inflows_and_outflows['Outflow (7D)']
inflows_and_outflows
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
      <th>change</th>
      <th>Inflow (7D)</th>
      <th>change</th>
      <th>Outflow (7D)</th>
      <th>Net Flows (7D)</th>
    </tr>
    <tr>
      <th>consensus_time</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2024-06-20</th>
      <td>27767185.833327</td>
      <td>2.224316e+07</td>
      <td>-22312750.357754</td>
      <td>-2.122269e+07</td>
      <td>1.020467e+06</td>
    </tr>
    <tr>
      <th>2024-06-21</th>
      <td>35920343.141371</td>
      <td>2.540398e+07</td>
      <td>-40484979.116283</td>
      <td>-2.536637e+07</td>
      <td>3.760292e+04</td>
    </tr>
    <tr>
      <th>2024-06-22</th>
      <td>4344250.089062</td>
      <td>2.512754e+07</td>
      <td>-4083755.074052</td>
      <td>-2.448948e+07</td>
      <td>6.380626e+05</td>
    </tr>
    <tr>
      <th>2024-06-23</th>
      <td>3655527.587898</td>
      <td>2.475073e+07</td>
      <td>-4117626.03075</td>
      <td>-2.460757e+07</td>
      <td>1.431613e+05</td>
    </tr>
    <tr>
      <th>2024-06-24</th>
      <td>29144450.78971</td>
      <td>2.318472e+07</td>
      <td>-32575644.187802</td>
      <td>-2.220271e+07</td>
      <td>9.820114e+05</td>
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
      <th>2024-09-08</th>
      <td>11234483.316814</td>
      <td>2.646577e+07</td>
      <td>-6893613.502699</td>
      <td>-2.600324e+07</td>
      <td>4.625333e+05</td>
    </tr>
    <tr>
      <th>2024-09-09</th>
      <td>35082020.361127</td>
      <td>2.799553e+07</td>
      <td>-31977989.371912</td>
      <td>-2.782010e+07</td>
      <td>1.754356e+05</td>
    </tr>
    <tr>
      <th>2024-09-10</th>
      <td>24809930.321601</td>
      <td>2.702816e+07</td>
      <td>-26160239.299303</td>
      <td>-2.823174e+07</td>
      <td>-1.203590e+06</td>
    </tr>
    <tr>
      <th>2024-09-11</th>
      <td>21020540.169323</td>
      <td>2.343855e+07</td>
      <td>-24250619.966492</td>
      <td>-2.464224e+07</td>
      <td>-1.203693e+06</td>
    </tr>
    <tr>
      <th>2024-09-12</th>
      <td>17710498.148422</td>
      <td>2.207771e+07</td>
      <td>-31917789.866378</td>
      <td>-2.433360e+07</td>
      <td>-2.255894e+06</td>
    </tr>
  </tbody>
</table>
<p>85 rows × 5 columns</p>
</div>




```python
inflows_and_outflows.tail()
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
      <th>change</th>
      <th>Inflow (7D)</th>
      <th>change</th>
      <th>Outflow (7D)</th>
      <th>Net Flows (7D)</th>
    </tr>
    <tr>
      <th>consensus_time</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2024-09-08</th>
      <td>11234483.316814</td>
      <td>2.646577e+07</td>
      <td>-6893613.502699</td>
      <td>-2.600324e+07</td>
      <td>4.625333e+05</td>
    </tr>
    <tr>
      <th>2024-09-09</th>
      <td>35082020.361127</td>
      <td>2.799553e+07</td>
      <td>-31977989.371912</td>
      <td>-2.782010e+07</td>
      <td>1.754356e+05</td>
    </tr>
    <tr>
      <th>2024-09-10</th>
      <td>24809930.321601</td>
      <td>2.702816e+07</td>
      <td>-26160239.299303</td>
      <td>-2.823174e+07</td>
      <td>-1.203590e+06</td>
    </tr>
    <tr>
      <th>2024-09-11</th>
      <td>21020540.169323</td>
      <td>2.343855e+07</td>
      <td>-24250619.966492</td>
      <td>-2.464224e+07</td>
      <td>-1.203693e+06</td>
    </tr>
    <tr>
      <th>2024-09-12</th>
      <td>17710498.148422</td>
      <td>2.207771e+07</td>
      <td>-31917789.866378</td>
      <td>-2.433360e+07</td>
      <td>-2.255894e+06</td>
    </tr>
  </tbody>
</table>
</div>




```python
color_map = ['#9FE2BF','#FF6666']
ax = inflows_and_outflows[['Inflow (7D)', 'Outflow (7D)']].plot.area(color=color_map,alpha=1.0,stacked=False)
left, right = plt.xlim()
ax.xaxis.set_major_locator(YearLocator())
ax.xaxis.set_minor_locator(MonthLocator(bymonthday=15))
ax.xaxis.set_major_formatter(NullFormatter())
ax.xaxis.set_minor_formatter(DateFormatter('%b'))
ax.legend(frameon=False, loc='upper right',bbox_to_anchor=(1, 1.135))
ax.set_ylabel("Inflow/Outflow (" + str(asset).upper() + ')', fontsize=14)
plt.grid(True, axis='y',linestyle='--',alpha=0.5)
plt.tick_params(axis='x',which='both',bottom=False)
plt.title(str('\nAddress ' + str(asset).upper() + ' Flows\n'),fontdict={'fontsize':28, 'font': 'Arial'})
ax.set_xlabel("")
plt.suptitle('\n\n ' + str(account[0:5])+ '...' + str(account[-5:])  + ' - Daily Inflow/Outflow (7D Average) ',fontsize=15.5)
ax.yaxis.set_ticks(plt.gca().get_yticks())
plt.gca().set_yticklabels([str('{:,.0f} ' + str(asset).upper()).format(x) for x in ax.get_yticks().tolist()])
ax2 = plt.twinx()
inflows_and_outflows['Net Flows (7D)'].plot.line(ax=ax2,alpha=0.4,color="black",legend=True,linestyle='--')
ax2.set_yticks(ax.get_yticks())
plt.gca().set_yticklabels([str('{:,.0f}' + str(asset).upper()).format(x) for x in ax.get_yticks().tolist()])
plt.gca().set_yticklabels([])
plt.tick_params(right = False)
ax2.legend(frameon=False, loc='upper right',bbox_to_anchor=(1.011, 1.07))
plt.show()
```


    
![png](output_23_0.png)
    


## Retrieve Receivers of Account Debits



```python
# Select account debits
debits = bal_updates.loc[bal_updates['credit']==False] 
tx_ids = debits.txid.drop_duplicates().to_list()
tx_ids[0:5]
```




    ['4db03ff1af7f9e3474222445199eaa1ad7aba210f817600a444d34a27f753b7b',
     '04486f785b6b04449748f3d7e9761271e4e5d0a41425c4401277547ba17f5bf9',
     'e1ac6ca5cd36760ad0f49908eb73234a88c7a67db5efc6c390deb8c748794cec',
     '753e407969d3537c91873fcd20fffba592556cb9e74dd9fa1fb27094aaf2110e',
     '056172b49c70039f3243fb9ca74d7b75b4bd07152e7a56b629caa4d1066ae510']




```python
len(tx_ids)
```




    32825




```python
# Balance update info for single transaction
full_tx = client.get_list_of_balance_updates_v2(
    asset=asset,
    txids=tx_ids[0],
).to_dataframe()
full_tx
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
      <th>chain_sequence_number</th>
      <th>account</th>
      <th>account_creation_height</th>
      <th>change</th>
      <th>previous_balance</th>
      <th>new_balance</th>
      <th>transaction_sequence_number</th>
      <th>n_debits</th>
      <th>n_credits</th>
      <th>block_hash</th>
      <th>height</th>
      <th>consensus_time</th>
      <th>credit</th>
      <th>total_received</th>
      <th>total_sent</th>
      <th>previous_debit_height</th>
      <th>previous_credit_height</th>
      <th>previous_chain_sequence_number</th>
      <th>txid</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>86291003987722258</td>
      <td>ae2d4617c862309a3d75a0ffb358c7a5009c673f</td>
      <td>9227547</td>
      <td>-993.1337</td>
      <td>165872256.343938</td>
      <td>165871263.210238</td>
      <td>0</td>
      <td>461074</td>
      <td>537256</td>
      <td>c5cade324437d70406e22f35a792337361edb66b9f1bd1...</td>
      <td>20091190</td>
      <td>2024-06-14 16:18:23+00:00</td>
      <td>False</td>
      <td>42683648820.933891</td>
      <td>42517777557.723648</td>
      <td>20091170</td>
      <td>20091188</td>
      <td>86290995397787689</td>
      <td>4db03ff1af7f9e3474222445199eaa1ad7aba210f81760...</td>
    </tr>
    <tr>
      <th>1</th>
      <td>86291003987722259</td>
      <td>93368f47a949ff8809300d19bb3718c419679996</td>
      <td>19882476</td>
      <td>993.1337</td>
      <td>0.0</td>
      <td>993.1337</td>
      <td>0</td>
      <td>3</td>
      <td>4</td>
      <td>c5cade324437d70406e22f35a792337361edb66b9f1bd1...</td>
      <td>20091190</td>
      <td>2024-06-14 16:18:23+00:00</td>
      <td>True</td>
      <td>7548.683815</td>
      <td>6555.550115</td>
      <td>20047974</td>
      <td>20047836</td>
      <td>86105392681058330</td>
      <td>4db03ff1af7f9e3474222445199eaa1ad7aba210f81760...</td>
    </tr>
  </tbody>
</table>
</div>




```python
# Balance update info for full list of transactions
full_tx_list = pd.DataFrame()
batch_size = 30

for i in range(0, len(tx_ids),batch_size):
    tx_batch = tx_ids[i:i+batch_size]
    transactions = client.get_list_of_balance_updates_v2(
        asset=asset,
        txids=tx_batch,
        page_size=10000
    ).to_dataframe()
    full_tx_list = pd.concat((full_tx_list, transactions), axis = 0, ignore_index=False)

full_tx_list = full_tx_list.reset_index(drop=True)
```

    /Users/victorramirez/opt/anaconda3/lib/python3.8/site-packages/coinmetrics/_data_collection.py:281: UserWarning: Could not infer format, so each element will be parsed individually, falling back to `dateutil`. To ensure parsing is consistent and as-expected, please specify a format.
      df: pd.DataFrame = pd.read_csv(



```python
full_credit_list = full_tx_list.loc[(full_tx_list['change']>0) & (full_tx_list['account'] != account)] 
```


```python
#credits_fees = full_tx_list.loc[(full_tx_list['account'] == 'FEES')] 
#credits_fees
```


```python
credits_no_fees = full_tx_list.loc[(full_tx_list['account'] != 'FEES')] 
credits_no_fees
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
      <th>chain_sequence_number</th>
      <th>account</th>
      <th>account_creation_height</th>
      <th>change</th>
      <th>previous_balance</th>
      <th>new_balance</th>
      <th>transaction_sequence_number</th>
      <th>n_debits</th>
      <th>n_credits</th>
      <th>block_hash</th>
      <th>height</th>
      <th>consensus_time</th>
      <th>credit</th>
      <th>total_received</th>
      <th>total_sent</th>
      <th>previous_debit_height</th>
      <th>previous_credit_height</th>
      <th>previous_chain_sequence_number</th>
      <th>txid</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>86291003987722258</td>
      <td>ae2d4617c862309a3d75a0ffb358c7a5009c673f</td>
      <td>9227547</td>
      <td>-993.1337</td>
      <td>165872256.343938</td>
      <td>165871263.210238</td>
      <td>0</td>
      <td>461074</td>
      <td>537256</td>
      <td>c5cade324437d70406e22f35a792337361edb66b9f1bd1...</td>
      <td>20091190</td>
      <td>2024-06-14 16:18:23+00:00</td>
      <td>False</td>
      <td>42683648820.933891</td>
      <td>42517777557.723648</td>
      <td>20091170</td>
      <td>20091188</td>
      <td>86290995397787696</td>
      <td>4db03ff1af7f9e3474222445199eaa1ad7aba210f81760...</td>
    </tr>
    <tr>
      <th>1</th>
      <td>86291003987722259</td>
      <td>93368f47a949ff8809300d19bb3718c419679996</td>
      <td>19882476</td>
      <td>993.1337</td>
      <td>0.0</td>
      <td>993.1337</td>
      <td>0</td>
      <td>3</td>
      <td>4</td>
      <td>c5cade324437d70406e22f35a792337361edb66b9f1bd1...</td>
      <td>20091190</td>
      <td>2024-06-14 16:18:23+00:00</td>
      <td>True</td>
      <td>7548.683815</td>
      <td>6555.550115</td>
      <td>20047974</td>
      <td>20047836</td>
      <td>86105392681058336</td>
      <td>4db03ff1af7f9e3474222445199eaa1ad7aba210f81760...</td>
    </tr>
    <tr>
      <th>2</th>
      <td>86291107066937362</td>
      <td>ae2d4617c862309a3d75a0ffb358c7a5009c673f</td>
      <td>9227547</td>
      <td>-356.523212</td>
      <td>165911761.788938</td>
      <td>165911405.265726</td>
      <td>0</td>
      <td>461075</td>
      <td>537258</td>
      <td>a716bda557dc9a533815c0f0f920795855fdd0cd2e09ee...</td>
      <td>20091214</td>
      <td>2024-06-14 16:23:11+00:00</td>
      <td>False</td>
      <td>42683689319.512581</td>
      <td>42517777914.246864</td>
      <td>20091190</td>
      <td>20091195</td>
      <td>86291025462558736</td>
      <td>04486f785b6b04449748f3d7e9761271e4e5d0a41425c4...</td>
    </tr>
    <tr>
      <th>3</th>
      <td>86291107066937363</td>
      <td>44caad846107ca5f2d4129a8f889b7466114c398</td>
      <td>19784970</td>
      <td>356.523212</td>
      <td>0.0</td>
      <td>356.523212</td>
      <td>0</td>
      <td>7</td>
      <td>8</td>
      <td>a716bda557dc9a533815c0f0f920795855fdd0cd2e09ee...</td>
      <td>20091214</td>
      <td>2024-06-14 16:23:11+00:00</td>
      <td>True</td>
      <td>43766.473859</td>
      <td>43409.950647</td>
      <td>20078891</td>
      <td>20078786</td>
      <td>86238180184948752</td>
      <td>04486f785b6b04449748f3d7e9761271e4e5d0a41425c4...</td>
    </tr>
    <tr>
      <th>4</th>
      <td>86291141426675716</td>
      <td>ae2d4617c862309a3d75a0ffb358c7a5009c673f</td>
      <td>9227547</td>
      <td>-146.5584</td>
      <td>165931709.105726</td>
      <td>165931562.547326</td>
      <td>0</td>
      <td>461076</td>
      <td>537260</td>
      <td>9365fe4af81c1e3644c5a4e1fabd96903924aef37c4f57...</td>
      <td>20091222</td>
      <td>2024-06-14 16:24:47+00:00</td>
      <td>False</td>
      <td>42683709623.352585</td>
      <td>42517778060.805267</td>
      <td>20091214</td>
      <td>20091220</td>
      <td>86291132836741136</td>
      <td>e1ac6ca5cd36760ad0f49908eb73234a88c7a67db5efc6...</td>
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
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>66241</th>
      <td>89058723862937603</td>
      <td>ea3d9b4743e20ce41777149a16e4ec97185d1487</td>
      <td>13508803</td>
      <td>624.7631</td>
      <td>1023.835403</td>
      <td>1648.598503</td>
      <td>0</td>
      <td>12190</td>
      <td>2707</td>
      <td>74480f43477fabcfe4d0a1ebaf07c0f51d09d932f80c55...</td>
      <td>20735600</td>
      <td>2024-09-12 16:03:47+00:00</td>
      <td>True</td>
      <td>86513336.288438</td>
      <td>86511687.689935</td>
      <td>20735506</td>
      <td>20735439</td>
      <td>89058320136011802</td>
      <td>68a4891f67738e4774868db5cdb9f172482112d09c6796...</td>
    </tr>
    <tr>
      <th>66242</th>
      <td>89058912841498628</td>
      <td>ae2d4617c862309a3d75a0ffb358c7a5009c673f</td>
      <td>9227547</td>
      <td>-6783.2379</td>
      <td>215637594.619038</td>
      <td>215630811.381138</td>
      <td>0</td>
      <td>493898</td>
      <td>573863</td>
      <td>80e3e295978837177c25ffbcfb76a19475c9e57356eb74...</td>
      <td>20735644</td>
      <td>2024-09-12 16:12:35+00:00</td>
      <td>False</td>
      <td>45180806789.259674</td>
      <td>44965175977.878532</td>
      <td>20735600</td>
      <td>20735637</td>
      <td>89058882776727605</td>
      <td>e4e76bb487f6bdc81f865fc9958f612cae74a801f630c9...</td>
    </tr>
    <tr>
      <th>66243</th>
      <td>89058912841498629</td>
      <td>634f44d54b30c520d4ba6f16aff72e9b428f32e1</td>
      <td>20647357</td>
      <td>6783.2379</td>
      <td>759.2118</td>
      <td>7542.4497</td>
      <td>0</td>
      <td>2</td>
      <td>8</td>
      <td>80e3e295978837177c25ffbcfb76a19475c9e57356eb74...</td>
      <td>20735644</td>
      <td>2024-09-12 16:12:35+00:00</td>
      <td>True</td>
      <td>27543.4497</td>
      <td>20001.0</td>
      <td>20668251</td>
      <td>20710994</td>
      <td>88953041897652241</td>
      <td>e4e76bb487f6bdc81f865fc9958f612cae74a801f630c9...</td>
    </tr>
    <tr>
      <th>66244</th>
      <td>89059020215681040</td>
      <td>ae2d4617c862309a3d75a0ffb358c7a5009c673f</td>
      <td>9227547</td>
      <td>-49903.593399</td>
      <td>215631811.531166</td>
      <td>215581907.937767</td>
      <td>0</td>
      <td>493899</td>
      <td>573864</td>
      <td>43391fae484e9aa52c3eb2316c86197258401a949d99d9...</td>
      <td>20735669</td>
      <td>2024-09-12 16:17:35+00:00</td>
      <td>False</td>
      <td>45180807789.409698</td>
      <td>44965225881.471939</td>
      <td>20735644</td>
      <td>20735662</td>
      <td>89058990150909967</td>
      <td>8ef17189d15eca1888109f30f0fe69b3fa7f24407c9044...</td>
    </tr>
    <tr>
      <th>66245</th>
      <td>89059020215681041</td>
      <td>d653376338a26a22abfbe54fee2210e68869f699</td>
      <td>20334702</td>
      <td>49903.593399</td>
      <td>0.0</td>
      <td>49903.593399</td>
      <td>0</td>
      <td>4</td>
      <td>5</td>
      <td>43391fae484e9aa52c3eb2316c86197258401a949d99d9...</td>
      <td>20735669</td>
      <td>2024-09-12 16:17:35+00:00</td>
      <td>True</td>
      <td>278435.638519</td>
      <td>228532.04512</td>
      <td>20672455</td>
      <td>20672448</td>
      <td>88787518153031686</td>
      <td>8ef17189d15eca1888109f30f0fe69b3fa7f24407c9044...</td>
    </tr>
  </tbody>
</table>
<p>66246 rows × 19 columns</p>
</div>




```python
credit_sum = pd.DataFrame(credits_no_fees.groupby('account').change.sum())
lrg_credits = credit_sum.nlargest(10, 'change').sort_values(by='change',ascending=False)
lrg_credits
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
      <th>change</th>
    </tr>
    <tr>
      <th>account</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>be84c0e15c37b1fd5b278496b1bd3f06198f8308</th>
      <td>175227599.75</td>
    </tr>
    <tr>
      <th>4594467601ce92b0d94fc5112722131a535ef0c7</th>
      <td>102040719.9561</td>
    </tr>
    <tr>
      <th>bdc7b3526f593f6ccbf620efb0c972bea707a941</th>
      <td>93177810.6006</td>
    </tr>
    <tr>
      <th>c06f25517e906b7f9b4dec3c7889503bb00b3370</th>
      <td>65800740.759051</td>
    </tr>
    <tr>
      <th>b63881018355dc5641b5f0004caf9db3b58f2949</th>
      <td>65095088.11</td>
    </tr>
    <tr>
      <th>77ec2176824df1145425eb51b3c88b9551847667</th>
      <td>62891970.52</td>
    </tr>
    <tr>
      <th>bf33b0ff43da98c744ce209f838b54f5d0cc3b06</th>
      <td>60263652.718417</td>
    </tr>
    <tr>
      <th>eae7380dd4cef6fbd1144f49e4d1e6964258a4f4</th>
      <td>58141929.7833</td>
    </tr>
    <tr>
      <th>3c9ea5c4fec2a77e23dd82539f4414266fe8f757</th>
      <td>51999818.4355</td>
    </tr>
    <tr>
      <th>4732abb585aa0dfc7e07ba9ae03d0ce248628634</th>
      <td>51235000.0</td>
    </tr>
  </tbody>
</table>
</div>




```python
lrg_credit_tx = credits_no_fees.loc[credits_no_fees['account'].isin(lrg_credits.index.tolist())]
```


```python
fig = go.Figure(data=[go.Sankey(
      node = dict(
      pad = 10,
      thickness = 10,
      line = dict(color = "black", width = 0.5),
      label = [str("Target Account <br> " + str(account[0:5])+ '...' + str(account[-5:]))] + [i[:5]+"..."+i[-5:] for i in list(lrg_credit_tx.groupby('account').change.sum().index)]
    ),
    link = dict(
            source = [0 for i in range(len(lrg_credit_tx[lrg_credit_tx.change>0].groupby('account').change.sum().tolist()))],    
            target = [j+1 for j in range(len(lrg_credit_tx[lrg_credit_tx.change>0].groupby('account').change.sum().tolist()))],
            value =  (lrg_credit_tx.groupby('account').change.sum().tolist())
    ))])
fig.update_layout(
    autosize=False,
    width=900,
    height=550,
    title=('Top 10 Outflow Recipients<br>' + str(account[0:5])+ '...' + str(account[-5:]) )
    )
fig.show()
```


        <script type="text/javascript">
        window.PlotlyConfig = {MathJaxConfig: 'local'};
        if (window.MathJax && window.MathJax.Hub && window.MathJax.Hub.Config) {window.MathJax.Hub.Config({SVG: {font: "STIX-Web"}});}
        if (typeof require !== 'undefined') {
        require.undef("plotly");
        define('plotly', function(require, exports, module) {
            /**
* plotly.js v2.25.2
* Copyright 2012-2023, Plotly, Inc.
* All rights reserved.
* Licensed under the MIT license
*/
/*! For license information please see plotly.min.js.LICENSE.txt */
        });
        require(['plotly'], function(Plotly) {
            window._Plotly = Plotly;
        });
        }
        </script>




<div>                            <div id="a46a8761-e12a-4903-acb5-2df2d7db0b18" class="plotly-graph-div" style="height:550px; width:900px;"></div>            <script type="text/javascript">                require(["plotly"], function(Plotly) {                    window.PLOTLYENV=window.PLOTLYENV || {};                                    if (document.getElementById("a46a8761-e12a-4903-acb5-2df2d7db0b18")) {                    Plotly.newPlot(                        "a46a8761-e12a-4903-acb5-2df2d7db0b18",                        [{"link":{"source":[0,0,0,0,0,0,0,0,0,0],"target":[1,2,3,4,5,6,7,8,9,10],"value":[51999818.4355,102040719.9561,51235000.0,62891970.52,65095088.11,93177810.6006,175227599.75,60263652.718417,65800740.759051,58141929.7833]},"node":{"label":["Target Account \u003cbr\u003e 0xae2...c673f","3c9ea...8f757","45944...ef0c7","4732a...28634","77ec2...47667","b6388...f2949","bdc7b...7a941","be84c...f8308","bf33b...c3b06","c06f2...b3370","eae73...8a4f4"],"line":{"color":"black","width":0.5},"pad":10,"thickness":10},"type":"sankey"}],                        {"template":{"data":{"histogram2dcontour":[{"type":"histogram2dcontour","colorbar":{"outlinewidth":0,"ticks":""},"colorscale":[[0.0,"#0d0887"],[0.1111111111111111,"#46039f"],[0.2222222222222222,"#7201a8"],[0.3333333333333333,"#9c179e"],[0.4444444444444444,"#bd3786"],[0.5555555555555556,"#d8576b"],[0.6666666666666666,"#ed7953"],[0.7777777777777778,"#fb9f3a"],[0.8888888888888888,"#fdca26"],[1.0,"#f0f921"]]}],"choropleth":[{"type":"choropleth","colorbar":{"outlinewidth":0,"ticks":""}}],"histogram2d":[{"type":"histogram2d","colorbar":{"outlinewidth":0,"ticks":""},"colorscale":[[0.0,"#0d0887"],[0.1111111111111111,"#46039f"],[0.2222222222222222,"#7201a8"],[0.3333333333333333,"#9c179e"],[0.4444444444444444,"#bd3786"],[0.5555555555555556,"#d8576b"],[0.6666666666666666,"#ed7953"],[0.7777777777777778,"#fb9f3a"],[0.8888888888888888,"#fdca26"],[1.0,"#f0f921"]]}],"heatmap":[{"type":"heatmap","colorbar":{"outlinewidth":0,"ticks":""},"colorscale":[[0.0,"#0d0887"],[0.1111111111111111,"#46039f"],[0.2222222222222222,"#7201a8"],[0.3333333333333333,"#9c179e"],[0.4444444444444444,"#bd3786"],[0.5555555555555556,"#d8576b"],[0.6666666666666666,"#ed7953"],[0.7777777777777778,"#fb9f3a"],[0.8888888888888888,"#fdca26"],[1.0,"#f0f921"]]}],"heatmapgl":[{"type":"heatmapgl","colorbar":{"outlinewidth":0,"ticks":""},"colorscale":[[0.0,"#0d0887"],[0.1111111111111111,"#46039f"],[0.2222222222222222,"#7201a8"],[0.3333333333333333,"#9c179e"],[0.4444444444444444,"#bd3786"],[0.5555555555555556,"#d8576b"],[0.6666666666666666,"#ed7953"],[0.7777777777777778,"#fb9f3a"],[0.8888888888888888,"#fdca26"],[1.0,"#f0f921"]]}],"contourcarpet":[{"type":"contourcarpet","colorbar":{"outlinewidth":0,"ticks":""}}],"contour":[{"type":"contour","colorbar":{"outlinewidth":0,"ticks":""},"colorscale":[[0.0,"#0d0887"],[0.1111111111111111,"#46039f"],[0.2222222222222222,"#7201a8"],[0.3333333333333333,"#9c179e"],[0.4444444444444444,"#bd3786"],[0.5555555555555556,"#d8576b"],[0.6666666666666666,"#ed7953"],[0.7777777777777778,"#fb9f3a"],[0.8888888888888888,"#fdca26"],[1.0,"#f0f921"]]}],"surface":[{"type":"surface","colorbar":{"outlinewidth":0,"ticks":""},"colorscale":[[0.0,"#0d0887"],[0.1111111111111111,"#46039f"],[0.2222222222222222,"#7201a8"],[0.3333333333333333,"#9c179e"],[0.4444444444444444,"#bd3786"],[0.5555555555555556,"#d8576b"],[0.6666666666666666,"#ed7953"],[0.7777777777777778,"#fb9f3a"],[0.8888888888888888,"#fdca26"],[1.0,"#f0f921"]]}],"mesh3d":[{"type":"mesh3d","colorbar":{"outlinewidth":0,"ticks":""}}],"scatter":[{"fillpattern":{"fillmode":"overlay","size":10,"solidity":0.2},"type":"scatter"}],"parcoords":[{"type":"parcoords","line":{"colorbar":{"outlinewidth":0,"ticks":""}}}],"scatterpolargl":[{"type":"scatterpolargl","marker":{"colorbar":{"outlinewidth":0,"ticks":""}}}],"bar":[{"error_x":{"color":"#2a3f5f"},"error_y":{"color":"#2a3f5f"},"marker":{"line":{"color":"#E5ECF6","width":0.5},"pattern":{"fillmode":"overlay","size":10,"solidity":0.2}},"type":"bar"}],"scattergeo":[{"type":"scattergeo","marker":{"colorbar":{"outlinewidth":0,"ticks":""}}}],"scatterpolar":[{"type":"scatterpolar","marker":{"colorbar":{"outlinewidth":0,"ticks":""}}}],"histogram":[{"marker":{"pattern":{"fillmode":"overlay","size":10,"solidity":0.2}},"type":"histogram"}],"scattergl":[{"type":"scattergl","marker":{"colorbar":{"outlinewidth":0,"ticks":""}}}],"scatter3d":[{"type":"scatter3d","line":{"colorbar":{"outlinewidth":0,"ticks":""}},"marker":{"colorbar":{"outlinewidth":0,"ticks":""}}}],"scattermapbox":[{"type":"scattermapbox","marker":{"colorbar":{"outlinewidth":0,"ticks":""}}}],"scatterternary":[{"type":"scatterternary","marker":{"colorbar":{"outlinewidth":0,"ticks":""}}}],"scattercarpet":[{"type":"scattercarpet","marker":{"colorbar":{"outlinewidth":0,"ticks":""}}}],"carpet":[{"aaxis":{"endlinecolor":"#2a3f5f","gridcolor":"white","linecolor":"white","minorgridcolor":"white","startlinecolor":"#2a3f5f"},"baxis":{"endlinecolor":"#2a3f5f","gridcolor":"white","linecolor":"white","minorgridcolor":"white","startlinecolor":"#2a3f5f"},"type":"carpet"}],"table":[{"cells":{"fill":{"color":"#EBF0F8"},"line":{"color":"white"}},"header":{"fill":{"color":"#C8D4E3"},"line":{"color":"white"}},"type":"table"}],"barpolar":[{"marker":{"line":{"color":"#E5ECF6","width":0.5},"pattern":{"fillmode":"overlay","size":10,"solidity":0.2}},"type":"barpolar"}],"pie":[{"automargin":true,"type":"pie"}]},"layout":{"autotypenumbers":"strict","colorway":["#636efa","#EF553B","#00cc96","#ab63fa","#FFA15A","#19d3f3","#FF6692","#B6E880","#FF97FF","#FECB52"],"font":{"color":"#2a3f5f"},"hovermode":"closest","hoverlabel":{"align":"left"},"paper_bgcolor":"white","plot_bgcolor":"#E5ECF6","polar":{"bgcolor":"#E5ECF6","angularaxis":{"gridcolor":"white","linecolor":"white","ticks":""},"radialaxis":{"gridcolor":"white","linecolor":"white","ticks":""}},"ternary":{"bgcolor":"#E5ECF6","aaxis":{"gridcolor":"white","linecolor":"white","ticks":""},"baxis":{"gridcolor":"white","linecolor":"white","ticks":""},"caxis":{"gridcolor":"white","linecolor":"white","ticks":""}},"coloraxis":{"colorbar":{"outlinewidth":0,"ticks":""}},"colorscale":{"sequential":[[0.0,"#0d0887"],[0.1111111111111111,"#46039f"],[0.2222222222222222,"#7201a8"],[0.3333333333333333,"#9c179e"],[0.4444444444444444,"#bd3786"],[0.5555555555555556,"#d8576b"],[0.6666666666666666,"#ed7953"],[0.7777777777777778,"#fb9f3a"],[0.8888888888888888,"#fdca26"],[1.0,"#f0f921"]],"sequentialminus":[[0.0,"#0d0887"],[0.1111111111111111,"#46039f"],[0.2222222222222222,"#7201a8"],[0.3333333333333333,"#9c179e"],[0.4444444444444444,"#bd3786"],[0.5555555555555556,"#d8576b"],[0.6666666666666666,"#ed7953"],[0.7777777777777778,"#fb9f3a"],[0.8888888888888888,"#fdca26"],[1.0,"#f0f921"]],"diverging":[[0,"#8e0152"],[0.1,"#c51b7d"],[0.2,"#de77ae"],[0.3,"#f1b6da"],[0.4,"#fde0ef"],[0.5,"#f7f7f7"],[0.6,"#e6f5d0"],[0.7,"#b8e186"],[0.8,"#7fbc41"],[0.9,"#4d9221"],[1,"#276419"]]},"xaxis":{"gridcolor":"white","linecolor":"white","ticks":"","title":{"standoff":15},"zerolinecolor":"white","automargin":true,"zerolinewidth":2},"yaxis":{"gridcolor":"white","linecolor":"white","ticks":"","title":{"standoff":15},"zerolinecolor":"white","automargin":true,"zerolinewidth":2},"scene":{"xaxis":{"backgroundcolor":"#E5ECF6","gridcolor":"white","linecolor":"white","showbackground":true,"ticks":"","zerolinecolor":"white","gridwidth":2},"yaxis":{"backgroundcolor":"#E5ECF6","gridcolor":"white","linecolor":"white","showbackground":true,"ticks":"","zerolinecolor":"white","gridwidth":2},"zaxis":{"backgroundcolor":"#E5ECF6","gridcolor":"white","linecolor":"white","showbackground":true,"ticks":"","zerolinecolor":"white","gridwidth":2}},"shapedefaults":{"line":{"color":"#2a3f5f"}},"annotationdefaults":{"arrowcolor":"#2a3f5f","arrowhead":0,"arrowwidth":1},"geo":{"bgcolor":"white","landcolor":"#E5ECF6","subunitcolor":"white","showland":true,"showlakes":true,"lakecolor":"white"},"title":{"x":0.05},"mapbox":{"style":"light"}}},"autosize":false,"width":900,"height":550,"title":{"text":"Top 10 Outflow Recipients\u003cbr\u003e0xae2...c673f"}},                        {"responsive": true}                    ).then(function(){

var gd = document.getElementById('a46a8761-e12a-4903-acb5-2df2d7db0b18');
var x = new MutationObserver(function (mutations, observer) {{
        var display = window.getComputedStyle(gd).display;
        if (!display || display === 'none') {{
            console.log([gd, 'removed!']);
            Plotly.purge(gd);
            observer.disconnect();
        }}
}});

// Listen for the removal of the full notebook cells
var notebookContainer = gd.closest('#notebook-container');
if (notebookContainer) {{
    x.observe(notebookContainer, {childList: true});
}}

// Listen for the clearing of the current output cell
var outputEl = gd.closest('.output');
if (outputEl) {{
    x.observe(outputEl, {childList: true});
}}

                        })                };                });            </script>        </div>



```python

```


```python

```