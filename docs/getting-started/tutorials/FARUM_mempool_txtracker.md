<img src="https://5264302.fs1.hubspotusercontent-na1.net/hubfs/5264302/Demo%20Asset%20Resources/CM-Demo-mempool_txtracker.png" width=1100 margin-left='auto' margin-right='auto'/>

Coin Metrics **FARUM** suite can be used for a variety of risk management applications. For entities that are actively broadcasting and receiving transactions, FARUM's mempool monitoring capabilities provide a number of helpful heuristics for investigating the status of unconfirmed transactions and ensuring timely settlement.

## Resources
This notebook demonstrates basic functionality offered by the Coin Metrics Python API Client, ATLAS, and Network Data Pro.

Coin Metrics offers a vast assortment of data for hundreds of cryptoassets. The Python API Client allows for easy access to this data using Python without needing to create your own wrappers using `requests` and other such libraries.

To understand the data that Coin Metrics offers, feel free to peruse the resources below.

- The [Coin Metrics API v4](https://docs.coinmetrics.io/api/v4) website contains the full set of endpoints and data offered by Coin Metrics.
- The [Coin Metrics Product Documentation](https://docs.coinmetrics.io/info) gives detailed, conceptual explanations of the data that Coin Metrics offers.
- The [API Spec](https://coinmetrics.github.io/api-client-python/site/api_client.html) contains a full list of functions.

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
from pytz import timezone as timezone_conv
from datetime import timezone as timezone_info
import matplotlib.dates as mdates
import matplotlib.pyplot as plt
from matplotlib.ticker import MaxNLocator
import ast
%matplotlib inline
import seaborn as sns
```


```python
sns.set(rc={'figure.figsize':(14,8)})
sns.set_theme(style='white')
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


```python
time_end = datetime.now()
time_start = time_end - timedelta(hours=3)
```

# Transaction Tracker Endpoint

Coin Metrics gathers data at the most granular level, then aggregates this data into higher-level summary metrics. To construct a comprehensive view of mempool data, we begin by collecting information about unconfirmed transactions then enter the mempool. This data is exposed via FARUM's *Transaction Tracker* endpoint.

Every node has a slightly different view of the Bitcoin mempool depending on its peers, so Coin Metrics runs several geographically-distributed nodes to ensure a high level of transaction visibility and coverage. Currently, we run nodes in both North America and Europe.

For more information about our Transaction Tracker endpoint, view the documentation:

https://knowledge-coinmetrics.gitbook.io/farum/transaction-tracker


```python
transactions = client.get_transaction_tracker(
    asset='btc',
    start_time=time_start,
).to_dataframe()
```


```python
transactions.sort_values(by='status')
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
      <th>txid</th>
      <th>time</th>
      <th>first_seen_time</th>
      <th>status</th>
      <th>status_update_time</th>
      <th>status_updates</th>
      <th>details</th>
      <th>height</th>
      <th>mempool_approx_queue_position</th>
      <th>next_block_approx_settlement_probability_pct</th>
      <th>block_hash</th>
      <th>geo</th>
      <th>replacement_for_txid</th>
      <th>inputs</th>
      <th>outputs</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>58c79dc2b3ddabbd70c503282edfebf9e5f43fd0d215bb...</td>
      <td>2024-09-12 13:55:33+00:00</td>
      <td>2024-09-12 05:55:34.694000+00:00</td>
      <td>CONFIRMED</td>
      <td>2024-09-12 06:32:52.210000+00:00</td>
      <td>[{'time': '2024-09-12T05:55:34.694000000Z', 's...</td>
      <td>{'amount': '0.025511', 'version': '2', 'replac...</td>
      <td>860970</td>
      <td>&lt;NA&gt;</td>
      <td>&lt;NA&gt;</td>
      <td>00000000000000000000a4c65ff04e1441dd237caa2ada...</td>
      <td>[{'location': 'us_east', 'seen_time': '2024-09...</td>
      <td>&lt;NA&gt;</td>
      <td>[{'address': 'bc1p9x97ecp2zadmlqz3263fy4s0pcjj...</td>
      <td>[{'address': 'bc1qydhrf6h3ewzj2m225zm64fg8w7qw...</td>
    </tr>
    <tr>
      <th>142968</th>
      <td>21b563abfb6bec3cb9797dfef5b3150e7f75a650ed1e74...</td>
      <td>2024-09-12 14:05:37+00:00</td>
      <td>2024-09-12 11:43:00.335000+00:00</td>
      <td>CONFIRMED</td>
      <td>2024-09-12 11:54:04.167000+00:00</td>
      <td>[{'time': '2024-09-12T11:43:00.335000000Z', 's...</td>
      <td>{'amount': '0.00019342', 'version': '2', 'repl...</td>
      <td>861001</td>
      <td>&lt;NA&gt;</td>
      <td>&lt;NA&gt;</td>
      <td>0000000000000000000165650ae9b6d226e710ac667418...</td>
      <td>[{'location': 'us_east', 'seen_time': '2024-09...</td>
      <td>&lt;NA&gt;</td>
      <td>[{'address': 'bc1p5mutrqm7dhy0ukqr0etfnury82nn...</td>
      <td>[{'address': 'bc1qkhe2v5qxcjn99yl3dwpa00xraltf...</td>
    </tr>
    <tr>
      <th>142969</th>
      <td>f2368f661df07ac03d841a9fba786352e0da3727e3234d...</td>
      <td>2024-09-12 14:05:37+00:00</td>
      <td>2024-09-12 11:43:01.102000+00:00</td>
      <td>CONFIRMED</td>
      <td>2024-09-12 11:45:16.706000+00:00</td>
      <td>[{'time': '2024-09-12T11:43:01.102000000Z', 's...</td>
      <td>{'amount': '0.02932692', 'version': '2', 'repl...</td>
      <td>861000</td>
      <td>&lt;NA&gt;</td>
      <td>&lt;NA&gt;</td>
      <td>00000000000000000001b03f46d47a234d8d5e42a8d523...</td>
      <td>[{'location': 'us_east', 'seen_time': '2024-09...</td>
      <td>&lt;NA&gt;</td>
      <td>[{'address': 'bc1plw09cjw4key86mhduz6zf3l6zdmx...</td>
      <td>[{'address': 'bc1q6nhgafee43aq4m98z4r5nwce5syj...</td>
    </tr>
    <tr>
      <th>142970</th>
      <td>2cae16ef7334a01db86f54dbb45183ca55f520e92e0c77...</td>
      <td>2024-09-12 14:05:37+00:00</td>
      <td>2024-09-12 11:43:01.516000+00:00</td>
      <td>CONFIRMED</td>
      <td>2024-09-12 11:45:16.699000+00:00</td>
      <td>[{'time': '2024-09-12T11:43:01.516000000Z', 's...</td>
      <td>{'amount': '0.0014346', 'version': '2', 'repla...</td>
      <td>861000</td>
      <td>&lt;NA&gt;</td>
      <td>&lt;NA&gt;</td>
      <td>00000000000000000001b03f46d47a234d8d5e42a8d523...</td>
      <td>[{'location': 'us_east', 'seen_time': '2024-09...</td>
      <td>abc7fdca13c5146337ceaf21a316700d12445b11302815...</td>
      <td>[{'address': 'bc1q93qzy5nx4sadl3arzfeus85mhfvz...</td>
      <td>[{'address': 'bc1qemravrjwhk60s7g378vmtm29f00j...</td>
    </tr>
    <tr>
      <th>142971</th>
      <td>ddeef10c853df20f63adb1df7140a6bbe28cdcdb35bff2...</td>
      <td>2024-09-12 14:05:37+00:00</td>
      <td>2024-09-12 11:43:01.517000+00:00</td>
      <td>CONFIRMED</td>
      <td>2024-09-12 11:45:16.706000+00:00</td>
      <td>[{'time': '2024-09-12T11:43:01.517000000Z', 's...</td>
      <td>{'amount': '0.0000111', 'version': '2', 'repla...</td>
      <td>861000</td>
      <td>&lt;NA&gt;</td>
      <td>&lt;NA&gt;</td>
      <td>00000000000000000001b03f46d47a234d8d5e42a8d523...</td>
      <td>[{'location': 'us_east', 'seen_time': '2024-09...</td>
      <td>&lt;NA&gt;</td>
      <td>[{'address': 'bc1q2ngvdc9mq00wgu6vhf28c4dgef2z...</td>
      <td>[{'address': 'RETURN 13 PUSHDATA(7)[14f5dd3314...</td>
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
    </tr>
    <tr>
      <th>216250</th>
      <td>b0162bc6ce617e36840f2feee1954753a0b49830b164bb...</td>
      <td>2024-09-12 14:07:20+00:00</td>
      <td>2024-09-12 13:30:53.520000+00:00</td>
      <td>UNCONFIRMED</td>
      <td>2024-09-12 13:30:53.520000+00:00</td>
      <td>[{'time': '2024-09-12T13:30:53.520000000Z', 's...</td>
      <td>{'amount': '0.0001851', 'version': '2', 'repla...</td>
      <td>&lt;NA&gt;</td>
      <td>46021/185145</td>
      <td>0.01</td>
      <td>&lt;NA&gt;</td>
      <td>[{'location': 'us_east', 'seen_time': '2024-09...</td>
      <td>&lt;NA&gt;</td>
      <td>[{'address': 'bc1qurdsdj4j2ncpek5n4w5pg0s4xqmk...</td>
      <td>[{'address': 'RETURN 13 PUSHDATA(4)[14011400]'...</td>
    </tr>
    <tr>
      <th>216249</th>
      <td>e1af5e385dce55ab9589957063f7d789fc42559c3a336e...</td>
      <td>2024-09-12 14:07:20+00:00</td>
      <td>2024-09-12 13:30:53.458000+00:00</td>
      <td>UNCONFIRMED</td>
      <td>2024-09-12 13:30:53.458000+00:00</td>
      <td>[{'time': '2024-09-12T13:30:53.458000000Z', 's...</td>
      <td>{'amount': '0.0001851', 'version': '2', 'repla...</td>
      <td>&lt;NA&gt;</td>
      <td>46021/185145</td>
      <td>0.01</td>
      <td>&lt;NA&gt;</td>
      <td>[{'location': 'us_east', 'seen_time': '2024-09...</td>
      <td>&lt;NA&gt;</td>
      <td>[{'address': 'bc1qurdsdj4j2ncpek5n4w5pg0s4xqmk...</td>
      <td>[{'address': 'RETURN 13 PUSHDATA(4)[14011400]'...</td>
    </tr>
    <tr>
      <th>216248</th>
      <td>5efb4aec2eb12afd45a7e8a4a9877a4d6e4b8d78985ee2...</td>
      <td>2024-09-12 14:07:20+00:00</td>
      <td>2024-09-12 13:30:53.457000+00:00</td>
      <td>UNCONFIRMED</td>
      <td>2024-09-12 13:30:53.457000+00:00</td>
      <td>[{'time': '2024-09-12T13:30:53.457000000Z', 's...</td>
      <td>{'amount': '0.0001851', 'version': '2', 'repla...</td>
      <td>&lt;NA&gt;</td>
      <td>46021/185145</td>
      <td>0.01</td>
      <td>&lt;NA&gt;</td>
      <td>[{'location': 'us_east', 'seen_time': '2024-09...</td>
      <td>&lt;NA&gt;</td>
      <td>[{'address': 'bc1qurdsdj4j2ncpek5n4w5pg0s4xqmk...</td>
      <td>[{'address': 'RETURN 13 PUSHDATA(4)[14011400]'...</td>
    </tr>
    <tr>
      <th>216261</th>
      <td>420c2d0e64fc20267804866d73d42ecade8dba74849df7...</td>
      <td>2024-09-12 14:07:20+00:00</td>
      <td>2024-09-12 13:30:53.626000+00:00</td>
      <td>UNCONFIRMED</td>
      <td>2024-09-12 13:30:53.626000+00:00</td>
      <td>[{'time': '2024-09-12T13:30:53.626000000Z', 's...</td>
      <td>{'amount': '0.0001662', 'version': '2', 'repla...</td>
      <td>&lt;NA&gt;</td>
      <td>46021/185145</td>
      <td>0.01</td>
      <td>&lt;NA&gt;</td>
      <td>[{'location': 'us_east', 'seen_time': '2024-09...</td>
      <td>&lt;NA&gt;</td>
      <td>[{'address': 'bc1qurdsdj4j2ncpek5n4w5pg0s4xqmk...</td>
      <td>[{'address': 'RETURN 13 PUSHDATA(4)[14011400]'...</td>
    </tr>
    <tr>
      <th>239542</th>
      <td>f1be8927c1dbab91ecd3899d9e51b0fda781ea278dd7b8...</td>
      <td>2024-09-12 14:07:49+00:00</td>
      <td>2024-09-12 14:07:48.937000+00:00</td>
      <td>UNCONFIRMED</td>
      <td>2024-09-12 14:07:48.937000+00:00</td>
      <td>[{'time': '2024-09-12T14:07:48.937000000Z', 's...</td>
      <td>{'amount': '0.00341351', 'version': '2', 'repl...</td>
      <td>&lt;NA&gt;</td>
      <td>2505/185145</td>
      <td>49.64</td>
      <td>&lt;NA&gt;</td>
      <td>[{'location': 'us_east', 'seen_time': '2024-09...</td>
      <td>&lt;NA&gt;</td>
      <td>[{'address': '1LLQYgG7uJEH7jXxJnDdTbHLsc8CGHii...</td>
      <td>[{'address': '1Ckp5e1xRXkV4MpSkfhGoaqK8CVxh2NB...</td>
    </tr>
  </tbody>
</table>
<p>239543 rows × 15 columns</p>
</div>




```python
unconfirmed = transactions.loc[transactions['status']=='UNCONFIRMED'] 
unconfirmed.head()
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
      <th>txid</th>
      <th>time</th>
      <th>first_seen_time</th>
      <th>status</th>
      <th>status_update_time</th>
      <th>status_updates</th>
      <th>details</th>
      <th>height</th>
      <th>mempool_approx_queue_position</th>
      <th>next_block_approx_settlement_probability_pct</th>
      <th>block_hash</th>
      <th>geo</th>
      <th>replacement_for_txid</th>
      <th>inputs</th>
      <th>outputs</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>3828</th>
      <td>9e1e934185f21458f263b6e4366de4b580bc5a2ea616cf...</td>
      <td>2024-09-12 13:55:56+00:00</td>
      <td>2024-09-12 06:06:41.277000+00:00</td>
      <td>UNCONFIRMED</td>
      <td>2024-09-12 06:06:41.277000+00:00</td>
      <td>[{'time': '2024-09-12T06:06:41.277000000Z', 's...</td>
      <td>{'amount': '0.00078458', 'version': '2', 'repl...</td>
      <td>&lt;NA&gt;</td>
      <td>128962/178949</td>
      <td>0.01</td>
      <td>&lt;NA&gt;</td>
      <td>[{'location': 'us_east', 'seen_time': '2024-09...</td>
      <td>&lt;NA&gt;</td>
      <td>[{'address': '1P63VhgABzf79AeYHnWpXJAqgwZfaQba...</td>
      <td>[{'address': '37eSZgSu2dnsFF4U4guzerRcRbaAcm5d...</td>
    </tr>
    <tr>
      <th>5033</th>
      <td>1896e9475b7c65123ec9aaeed82efec35a62b3727e7acd...</td>
      <td>2024-09-12 13:56:02+00:00</td>
      <td>2024-09-12 06:14:08.594000+00:00</td>
      <td>UNCONFIRMED</td>
      <td>2024-09-12 06:14:08.594000+00:00</td>
      <td>[{'time': '2024-09-12T06:14:08.594000000Z', 's...</td>
      <td>{'amount': '0.00078321', 'version': '2', 'repl...</td>
      <td>&lt;NA&gt;</td>
      <td>129160/179146</td>
      <td>0.01</td>
      <td>&lt;NA&gt;</td>
      <td>[{'location': 'us_east', 'seen_time': '2024-09...</td>
      <td>&lt;NA&gt;</td>
      <td>[{'address': '1P63VhgABzf79AeYHnWpXJAqgwZfaQba...</td>
      <td>[{'address': '37eSZgSu2dnsFF4U4guzerRcRbaAcm5d...</td>
    </tr>
    <tr>
      <th>6524</th>
      <td>d29863a7f66e937ff336adaa6a2d5e3c2a3328380cb58b...</td>
      <td>2024-09-12 13:56:11+00:00</td>
      <td>2024-09-12 06:23:07.581000+00:00</td>
      <td>UNCONFIRMED</td>
      <td>2024-09-12 06:23:07.581000+00:00</td>
      <td>[{'time': '2024-09-12T06:23:07.581000000Z', 's...</td>
      <td>{'amount': '0.00078406', 'version': '2', 'repl...</td>
      <td>&lt;NA&gt;</td>
      <td>129160/179146</td>
      <td>0.01</td>
      <td>&lt;NA&gt;</td>
      <td>[{'location': 'us_east', 'seen_time': '2024-09...</td>
      <td>&lt;NA&gt;</td>
      <td>[{'address': '1P63VhgABzf79AeYHnWpXJAqgwZfaQba...</td>
      <td>[{'address': '37eSZgSu2dnsFF4U4guzerRcRbaAcm5d...</td>
    </tr>
    <tr>
      <th>7916</th>
      <td>d6a167143357d476a923f43363f9c31965eb0812031423...</td>
      <td>2024-09-12 13:56:19+00:00</td>
      <td>2024-09-12 06:30:09.097000+00:00</td>
      <td>UNCONFIRMED</td>
      <td>2024-09-12 06:30:09.097000+00:00</td>
      <td>[{'time': '2024-09-12T06:30:09.097000000Z', 's...</td>
      <td>{'amount': '0.01745412', 'version': '1', 'repl...</td>
      <td>&lt;NA&gt;</td>
      <td>129160/179146</td>
      <td>0.01</td>
      <td>&lt;NA&gt;</td>
      <td>[{'location': 'us_east', 'seen_time': '2024-09...</td>
      <td>&lt;NA&gt;</td>
      <td>[{'address': '3ABT9vBKwjvUNveifARL5LwToLeYdBzG...</td>
      <td>[{'address': 'bc1qd50rezdgkwcjdxz47hch0d589sdk...</td>
    </tr>
    <tr>
      <th>8424</th>
      <td>0ec23bead144929fefe80b98ecfda7b6f044cd607df8c0...</td>
      <td>2024-09-12 13:56:22+00:00</td>
      <td>2024-09-12 06:31:44.356000+00:00</td>
      <td>UNCONFIRMED</td>
      <td>2024-09-12 06:31:44.356000+00:00</td>
      <td>[{'time': '2024-09-12T06:31:44.356000000Z', 's...</td>
      <td>{'amount': '0.0007859', 'version': '2', 'repla...</td>
      <td>&lt;NA&gt;</td>
      <td>129160/179146</td>
      <td>0.01</td>
      <td>&lt;NA&gt;</td>
      <td>[{'location': 'us_east', 'seen_time': '2024-09...</td>
      <td>&lt;NA&gt;</td>
      <td>[{'address': '1P63VhgABzf79AeYHnWpXJAqgwZfaQba...</td>
      <td>[{'address': '37eSZgSu2dnsFF4U4guzerRcRbaAcm5d...</td>
    </tr>
  </tbody>
</table>
</div>




```python
unconfirmed_list = unconfirmed.txid.to_list()
unconfirmed_list[0:5]
```




    ['9e1e934185f21458f263b6e4366de4b580bc5a2ea616cf6a46e55d8bc96c8aa9',
     '1896e9475b7c65123ec9aaeed82efec35a62b3727e7acd8b1bb7c8313efca12d',
     'd29863a7f66e937ff336adaa6a2d5e3c2a3328380cb58b932a34488f0adbb562',
     'd6a167143357d476a923f43363f9c31965eb0812031423109c23bedef17a2219',
     '0ec23bead144929fefe80b98ecfda7b6f044cd607df8c0d3c796766c0bc0cc0c']




```python
first_tx = pd.DataFrame(transactions.iloc[0])
first_tx
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
      <th>txid</th>
      <td>58c79dc2b3ddabbd70c503282edfebf9e5f43fd0d215bb...</td>
    </tr>
    <tr>
      <th>time</th>
      <td>2024-09-12 13:55:33+00:00</td>
    </tr>
    <tr>
      <th>first_seen_time</th>
      <td>2024-09-12 05:55:34.694000+00:00</td>
    </tr>
    <tr>
      <th>status</th>
      <td>CONFIRMED</td>
    </tr>
    <tr>
      <th>status_update_time</th>
      <td>2024-09-12 06:32:52.210000+00:00</td>
    </tr>
    <tr>
      <th>status_updates</th>
      <td>[{'time': '2024-09-12T05:55:34.694000000Z', 's...</td>
    </tr>
    <tr>
      <th>details</th>
      <td>{'amount': '0.025511', 'version': '2', 'replac...</td>
    </tr>
    <tr>
      <th>height</th>
      <td>860970</td>
    </tr>
    <tr>
      <th>mempool_approx_queue_position</th>
      <td>&lt;NA&gt;</td>
    </tr>
    <tr>
      <th>next_block_approx_settlement_probability_pct</th>
      <td>&lt;NA&gt;</td>
    </tr>
    <tr>
      <th>block_hash</th>
      <td>00000000000000000000a4c65ff04e1441dd237caa2ada...</td>
    </tr>
    <tr>
      <th>geo</th>
      <td>[{'location': 'us_east', 'seen_time': '2024-09...</td>
    </tr>
    <tr>
      <th>replacement_for_txid</th>
      <td>&lt;NA&gt;</td>
    </tr>
    <tr>
      <th>inputs</th>
      <td>[{'address': 'bc1p9x97ecp2zadmlqz3263fy4s0pcjj...</td>
    </tr>
    <tr>
      <th>outputs</th>
      <td>[{'address': 'bc1qydhrf6h3ewzj2m225zm64fg8w7qw...</td>
    </tr>
  </tbody>
</table>
</div>




```python
details = first_tx.loc["details"].astype("str")
details = details.apply(lambda x: ast.literal_eval(x))
details = details.apply(pd.Series)
details.transpose()
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
      <th>amount</th>
      <td>0.025511</td>
    </tr>
    <tr>
      <th>version</th>
      <td>2</td>
    </tr>
    <tr>
      <th>replace_by_fee_supported</th>
      <td>False</td>
    </tr>
    <tr>
      <th>fee</th>
      <td>0.00000327</td>
    </tr>
    <tr>
      <th>feerate</th>
      <td>0</td>
    </tr>
    <tr>
      <th>mempool_feerate_mean_at_first_seen_time</th>
      <td>1.563</td>
    </tr>
    <tr>
      <th>mempool_feerate_min_at_first_seen_time</th>
      <td>1</td>
    </tr>
    <tr>
      <th>consensus_size</th>
      <td>568</td>
    </tr>
    <tr>
      <th>physical_size</th>
      <td>193</td>
    </tr>
  </tbody>
</table>
</div>




```python
status = first_tx.loc["status_updates"].astype("str")
status = status.apply(lambda x: ast.literal_eval(x))
status = status.apply(pd.Series).transpose()
status.iloc[:,0].apply(pd.Series)
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
      <th>time</th>
      <th>status</th>
      <th>block_hash</th>
      <th>height</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>2024-09-12T05:55:34.694000000Z</td>
      <td>UNCONFIRMED</td>
      <td>NaN</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>1</th>
      <td>2024-09-12T06:32:52.210000000Z</td>
      <td>CONFIRMED</td>
      <td>00000000000000000000a4c65ff04e1441dd237caa2ada...</td>
      <td>860970</td>
    </tr>
  </tbody>
</table>
</div>



# Mempool Monitor Endpoint

After gathering information about all unconfirmed transactions, we can construct a full view of the state of the mempool, quantifying the total count and size of each feerate segment. This is accomplished via FARUM's dedicated *Mempool Monitor* endpoint.

For more information about our Mempool Monitor endpoint, view the documentation:

https://knowledge-coinmetrics.gitbook.io/farum/mempool-monitor


```python
mempool = client.get_mempool_feerates(
    assets='btc',
    page_size=200,
    start_time=time_start,
    end_time=time_end
).to_dataframe()
```


```python
mempool
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
      <th>feerates</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>btc</td>
      <td>2024-09-12 05:56:00+00:00</td>
      <td>[{'feerate': '1', 'count': '97953', 'consensus...</td>
    </tr>
    <tr>
      <th>1</th>
      <td>btc</td>
      <td>2024-09-12 05:57:00+00:00</td>
      <td>[{'feerate': '1', 'count': '97953', 'consensus...</td>
    </tr>
    <tr>
      <th>2</th>
      <td>btc</td>
      <td>2024-09-12 05:58:00+00:00</td>
      <td>[{'feerate': '1', 'count': '97950', 'consensus...</td>
    </tr>
    <tr>
      <th>3</th>
      <td>btc</td>
      <td>2024-09-12 05:59:00+00:00</td>
      <td>[{'feerate': '1', 'count': '97950', 'consensus...</td>
    </tr>
    <tr>
      <th>4</th>
      <td>btc</td>
      <td>2024-09-12 06:00:00+00:00</td>
      <td>[{'feerate': '1', 'count': '97949', 'consensus...</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>175</th>
      <td>btc</td>
      <td>2024-09-12 08:51:00+00:00</td>
      <td>[{'feerate': '1', 'count': '98056', 'consensus...</td>
    </tr>
    <tr>
      <th>176</th>
      <td>btc</td>
      <td>2024-09-12 08:52:00+00:00</td>
      <td>[{'feerate': '1', 'count': '98055', 'consensus...</td>
    </tr>
    <tr>
      <th>177</th>
      <td>btc</td>
      <td>2024-09-12 08:53:00+00:00</td>
      <td>[{'feerate': '1', 'count': '98054', 'consensus...</td>
    </tr>
    <tr>
      <th>178</th>
      <td>btc</td>
      <td>2024-09-12 08:54:00+00:00</td>
      <td>[{'feerate': '1', 'count': '98056', 'consensus...</td>
    </tr>
    <tr>
      <th>179</th>
      <td>btc</td>
      <td>2024-09-12 08:55:00+00:00</td>
      <td>[{'feerate': '1', 'count': '98056', 'consensus...</td>
    </tr>
  </tbody>
</table>
<p>180 rows × 3 columns</p>
</div>




```python
mempool['feerates'] = mempool.feerates.apply(lambda x: ast.literal_eval(str(x)))
mempool = mempool.join(pd.json_normalize(mempool.pop('feerates')))
mempool.index = pd.to_datetime(mempool.time.dt.strftime('%m/%d/%y %H:%M'))
```

    /var/folders/sg/cqgxcpvj08nc40917ml9ms7w0000gn/T/ipykernel_24722/5205826.py:3: UserWarning: Could not infer format, so each element will be parsed individually, falling back to `dateutil`. To ensure parsing is consistent and as-expected, please specify a format.
      mempool.index = pd.to_datetime(mempool.time.dt.strftime('%m/%d/%y %H:%M'))



```python
mempool
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
      <th>0</th>
      <th>1</th>
      <th>2</th>
      <th>3</th>
      <th>4</th>
      <th>5</th>
      <th>6</th>
      <th>7</th>
      <th>...</th>
      <th>66</th>
      <th>67</th>
      <th>68</th>
      <th>69</th>
      <th>70</th>
      <th>71</th>
      <th>72</th>
      <th>73</th>
      <th>74</th>
      <th>75</th>
    </tr>
    <tr>
      <th>time</th>
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
      <th>2024-09-12 05:56:00</th>
      <td>btc</td>
      <td>2024-09-12 05:56:00+00:00</td>
      <td>{'feerate': '1', 'count': '97953', 'consensus_...</td>
      <td>{'feerate': '2', 'count': '78733', 'consensus_...</td>
      <td>{'feerate': '3', 'count': '1326', 'consensus_s...</td>
      <td>{'feerate': '4', 'count': '667', 'consensus_si...</td>
      <td>{'feerate': '5', 'count': '343', 'consensus_si...</td>
      <td>{'feerate': '6', 'count': '265', 'consensus_si...</td>
      <td>{'feerate': '7', 'count': '116', 'consensus_si...</td>
      <td>{'feerate': '8', 'count': '38', 'consensus_siz...</td>
      <td>...</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
    </tr>
    <tr>
      <th>2024-09-12 05:57:00</th>
      <td>btc</td>
      <td>2024-09-12 05:57:00+00:00</td>
      <td>{'feerate': '1', 'count': '97953', 'consensus_...</td>
      <td>{'feerate': '2', 'count': '78733', 'consensus_...</td>
      <td>{'feerate': '3', 'count': '1442', 'consensus_s...</td>
      <td>{'feerate': '4', 'count': '694', 'consensus_si...</td>
      <td>{'feerate': '5', 'count': '371', 'consensus_si...</td>
      <td>{'feerate': '6', 'count': '284', 'consensus_si...</td>
      <td>{'feerate': '7', 'count': '121', 'consensus_si...</td>
      <td>{'feerate': '8', 'count': '43', 'consensus_siz...</td>
      <td>...</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
    </tr>
    <tr>
      <th>2024-09-12 05:58:00</th>
      <td>btc</td>
      <td>2024-09-12 05:58:00+00:00</td>
      <td>{'feerate': '1', 'count': '97950', 'consensus_...</td>
      <td>{'feerate': '2', 'count': '78734', 'consensus_...</td>
      <td>{'feerate': '3', 'count': '2299', 'consensus_s...</td>
      <td>{'feerate': '4', 'count': '732', 'consensus_si...</td>
      <td>{'feerate': '5', 'count': '578', 'consensus_si...</td>
      <td>{'feerate': '6', 'count': '296', 'consensus_si...</td>
      <td>{'feerate': '7', 'count': '124', 'consensus_si...</td>
      <td>{'feerate': '8', 'count': '47', 'consensus_siz...</td>
      <td>...</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
    </tr>
    <tr>
      <th>2024-09-12 05:59:00</th>
      <td>btc</td>
      <td>2024-09-12 05:59:00+00:00</td>
      <td>{'feerate': '1', 'count': '97950', 'consensus_...</td>
      <td>{'feerate': '2', 'count': '78737', 'consensus_...</td>
      <td>{'feerate': '3', 'count': '2397', 'consensus_s...</td>
      <td>{'feerate': '4', 'count': '780', 'consensus_si...</td>
      <td>{'feerate': '5', 'count': '623', 'consensus_si...</td>
      <td>{'feerate': '6', 'count': '320', 'consensus_si...</td>
      <td>{'feerate': '7', 'count': '128', 'consensus_si...</td>
      <td>{'feerate': '8', 'count': '49', 'consensus_siz...</td>
      <td>...</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
    </tr>
    <tr>
      <th>2024-09-12 06:00:00</th>
      <td>btc</td>
      <td>2024-09-12 06:00:00+00:00</td>
      <td>{'feerate': '1', 'count': '97949', 'consensus_...</td>
      <td>{'feerate': '2', 'count': '78739', 'consensus_...</td>
      <td>{'feerate': '3', 'count': '2404', 'consensus_s...</td>
      <td>{'feerate': '4', 'count': '835', 'consensus_si...</td>
      <td>{'feerate': '5', 'count': '657', 'consensus_si...</td>
      <td>{'feerate': '6', 'count': '338', 'consensus_si...</td>
      <td>{'feerate': '7', 'count': '132', 'consensus_si...</td>
      <td>{'feerate': '8', 'count': '51', 'consensus_siz...</td>
      <td>...</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
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
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>2024-09-12 08:51:00</th>
      <td>btc</td>
      <td>2024-09-12 08:51:00+00:00</td>
      <td>{'feerate': '1', 'count': '98056', 'consensus_...</td>
      <td>{'feerate': '2', 'count': '84168', 'consensus_...</td>
      <td>{'feerate': '3', 'count': '2549', 'consensus_s...</td>
      <td>{'feerate': '4', 'count': '1880', 'consensus_s...</td>
      <td>{'feerate': '5', 'count': '974', 'consensus_si...</td>
      <td>{'feerate': '6', 'count': '278', 'consensus_si...</td>
      <td>{'feerate': '7', 'count': '178', 'consensus_si...</td>
      <td>{'feerate': '8', 'count': '47', 'consensus_siz...</td>
      <td>...</td>
      <td>{'feerate': '222', 'count': '1', 'consensus_si...</td>
      <td>{'feerate': '292', 'count': '1', 'consensus_si...</td>
      <td>{'feerate': '313', 'count': '1', 'consensus_si...</td>
      <td>{'feerate': '315', 'count': '1', 'consensus_si...</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
    </tr>
    <tr>
      <th>2024-09-12 08:52:00</th>
      <td>btc</td>
      <td>2024-09-12 08:52:00+00:00</td>
      <td>{'feerate': '1', 'count': '98055', 'consensus_...</td>
      <td>{'feerate': '2', 'count': '84147', 'consensus_...</td>
      <td>{'feerate': '3', 'count': '2562', 'consensus_s...</td>
      <td>{'feerate': '4', 'count': '2150', 'consensus_s...</td>
      <td>{'feerate': '5', 'count': '1025', 'consensus_s...</td>
      <td>{'feerate': '6', 'count': '309', 'consensus_si...</td>
      <td>{'feerate': '7', 'count': '186', 'consensus_si...</td>
      <td>{'feerate': '8', 'count': '51', 'consensus_siz...</td>
      <td>...</td>
      <td>{'feerate': '217', 'count': '1', 'consensus_si...</td>
      <td>{'feerate': '222', 'count': '1', 'consensus_si...</td>
      <td>{'feerate': '292', 'count': '1', 'consensus_si...</td>
      <td>{'feerate': '313', 'count': '1', 'consensus_si...</td>
      <td>{'feerate': '315', 'count': '1', 'consensus_si...</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
    </tr>
    <tr>
      <th>2024-09-12 08:53:00</th>
      <td>btc</td>
      <td>2024-09-12 08:53:00+00:00</td>
      <td>{'feerate': '1', 'count': '98054', 'consensus_...</td>
      <td>{'feerate': '2', 'count': '84127', 'consensus_...</td>
      <td>{'feerate': '3', 'count': '2567', 'consensus_s...</td>
      <td>{'feerate': '4', 'count': '2186', 'consensus_s...</td>
      <td>{'feerate': '5', 'count': '1088', 'consensus_s...</td>
      <td>{'feerate': '6', 'count': '336', 'consensus_si...</td>
      <td>{'feerate': '7', 'count': '191', 'consensus_si...</td>
      <td>{'feerate': '8', 'count': '60', 'consensus_siz...</td>
      <td>...</td>
      <td>{'feerate': '213', 'count': '1', 'consensus_si...</td>
      <td>{'feerate': '217', 'count': '1', 'consensus_si...</td>
      <td>{'feerate': '222', 'count': '1', 'consensus_si...</td>
      <td>{'feerate': '292', 'count': '1', 'consensus_si...</td>
      <td>{'feerate': '313', 'count': '1', 'consensus_si...</td>
      <td>{'feerate': '315', 'count': '1', 'consensus_si...</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
    </tr>
    <tr>
      <th>2024-09-12 08:54:00</th>
      <td>btc</td>
      <td>2024-09-12 08:54:00+00:00</td>
      <td>{'feerate': '1', 'count': '98056', 'consensus_...</td>
      <td>{'feerate': '2', 'count': '84052', 'consensus_...</td>
      <td>{'feerate': '3', 'count': '2573', 'consensus_s...</td>
      <td>{'feerate': '4', 'count': '2227', 'consensus_s...</td>
      <td>{'feerate': '5', 'count': '1130', 'consensus_s...</td>
      <td>{'feerate': '6', 'count': '389', 'consensus_si...</td>
      <td>{'feerate': '7', 'count': '195', 'consensus_si...</td>
      <td>{'feerate': '8', 'count': '63', 'consensus_siz...</td>
      <td>...</td>
      <td>{'feerate': '213', 'count': '1', 'consensus_si...</td>
      <td>{'feerate': '217', 'count': '1', 'consensus_si...</td>
      <td>{'feerate': '222', 'count': '1', 'consensus_si...</td>
      <td>{'feerate': '292', 'count': '1', 'consensus_si...</td>
      <td>{'feerate': '313', 'count': '1', 'consensus_si...</td>
      <td>{'feerate': '315', 'count': '1', 'consensus_si...</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
    </tr>
    <tr>
      <th>2024-09-12 08:55:00</th>
      <td>btc</td>
      <td>2024-09-12 08:55:00+00:00</td>
      <td>{'feerate': '1', 'count': '98056', 'consensus_...</td>
      <td>{'feerate': '2', 'count': '84053', 'consensus_...</td>
      <td>{'feerate': '3', 'count': '2582', 'consensus_s...</td>
      <td>{'feerate': '4', 'count': '2262', 'consensus_s...</td>
      <td>{'feerate': '5', 'count': '1189', 'consensus_s...</td>
      <td>{'feerate': '6', 'count': '441', 'consensus_si...</td>
      <td>{'feerate': '7', 'count': '198', 'consensus_si...</td>
      <td>{'feerate': '8', 'count': '66', 'consensus_siz...</td>
      <td>...</td>
      <td>{'feerate': '202', 'count': '1', 'consensus_si...</td>
      <td>{'feerate': '213', 'count': '1', 'consensus_si...</td>
      <td>{'feerate': '217', 'count': '1', 'consensus_si...</td>
      <td>{'feerate': '222', 'count': '1', 'consensus_si...</td>
      <td>{'feerate': '292', 'count': '1', 'consensus_si...</td>
      <td>{'feerate': '313', 'count': '1', 'consensus_si...</td>
      <td>{'feerate': '315', 'count': '1', 'consensus_si...</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
    </tr>
  </tbody>
</table>
<p>180 rows × 78 columns</p>
</div>




```python
df=pd.json_normalize(mempool[0])
df
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
      <th>feerate</th>
      <th>count</th>
      <th>consensus_size</th>
      <th>fees</th>
      <th>physical_size</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1</td>
      <td>97953</td>
      <td>221154072</td>
      <td>0.67188094</td>
      <td>110902014</td>
    </tr>
    <tr>
      <th>1</th>
      <td>1</td>
      <td>97953</td>
      <td>221154072</td>
      <td>0.67188094</td>
      <td>110902014</td>
    </tr>
    <tr>
      <th>2</th>
      <td>1</td>
      <td>97950</td>
      <td>221151828</td>
      <td>0.67187531</td>
      <td>110901291</td>
    </tr>
    <tr>
      <th>3</th>
      <td>1</td>
      <td>97950</td>
      <td>221151828</td>
      <td>0.67187531</td>
      <td>110901291</td>
    </tr>
    <tr>
      <th>4</th>
      <td>1</td>
      <td>97949</td>
      <td>221151076</td>
      <td>0.6718734</td>
      <td>110901103</td>
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
      <th>175</th>
      <td>1</td>
      <td>98056</td>
      <td>221829500</td>
      <td>0.67376654</td>
      <td>111257584</td>
    </tr>
    <tr>
      <th>176</th>
      <td>1</td>
      <td>98055</td>
      <td>221828480</td>
      <td>0.67376399</td>
      <td>111257229</td>
    </tr>
    <tr>
      <th>177</th>
      <td>1</td>
      <td>98054</td>
      <td>221827912</td>
      <td>0.67376257</td>
      <td>111257006</td>
    </tr>
    <tr>
      <th>178</th>
      <td>1</td>
      <td>98056</td>
      <td>221829048</td>
      <td>0.67376549</td>
      <td>111257452</td>
    </tr>
    <tr>
      <th>179</th>
      <td>1</td>
      <td>98056</td>
      <td>221829048</td>
      <td>0.67376549</td>
      <td>111257452</td>
    </tr>
  </tbody>
</table>
<p>180 rows × 5 columns</p>
</div>



# Next Block Feerate Metrics

FARUM's Key Risk Indicator (KRI) Feed endpoint provides a number of summary metrics that can help users determine the optimal feerate when preparing to broadcast a transaction. The calculation begins by ranking mempool transactions based on how much fees they are paying. A block template is then applied to these transactions with the goal of identifying which transactions rational miners would pick if they were to build a block at that minute 

- **mempool_next_block_approx_feerate_mean:** The approximate value of the mean feerate for the upcoming blockchain block.
- **mempool_next_block_approx_feerate_median:** The approximate value of the median feerate for the upcoming blockchain block.

- **mempool_next_block_approx_feerate_max:** The approximate value of the maximum feerate for the upcoming blockchain block.

- **mempool_next_block_approx_feerate_min:** The approximate value of the minimum feerate for the upcoming blockchain block.


Using the summary fee rate metrics above, Coin Metrics derives a "recommended minimum feerate" metric:

- **mempool_next_block_inclusion_approx_feerate_min:** The recommended minimum feerate required for a transaction to be included in the upcoming blockchain block. This metric differs from *mempool_next_block_approx_feerate_min* in that it accounts for situations where there are many transactions paying the minimum feerate. By adding an additional cushion to the minimum estimate, this metric provides better settlement guarantees.

For more information about our KRI Feed endpoint, view the documentation:

https://knowledge-coinmetrics.gitbook.io/farum/key-risk-indicator-kri-feed


```python
next_block_rates = [
'mempool_next_block_approx_feerate_mean',
'mempool_next_block_approx_feerate_median',
'mempool_next_block_approx_feerate_min',
'mempool_vsize'
]
```


```python
farum_btc = client.get_asset_metrics(
    assets='btc',
    metrics= next_block_rates,
    frequency="1m",
    start_time=time_start,
    end_time=time_end
).to_dataframe()
```


```python
farum_btc.index = pd.to_datetime(farum_btc.time.dt.strftime('%m/%d/%y %H:%M'))
farum_btc = farum_btc.drop(['time'], axis=1)
```

    /var/folders/sg/cqgxcpvj08nc40917ml9ms7w0000gn/T/ipykernel_24722/936350873.py:1: UserWarning: Could not infer format, so each element will be parsed individually, falling back to `dateutil`. To ensure parsing is consistent and as-expected, please specify a format.
      farum_btc.index = pd.to_datetime(farum_btc.time.dt.strftime('%m/%d/%y %H:%M'))



```python
fees_btc = farum_btc[['mempool_next_block_approx_feerate_mean','mempool_next_block_approx_feerate_median','mempool_next_block_approx_feerate_min']]
fees_btc
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
      <th>mempool_next_block_approx_feerate_mean</th>
      <th>mempool_next_block_approx_feerate_median</th>
      <th>mempool_next_block_approx_feerate_min</th>
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
      <th>2024-09-12 05:56:00</th>
      <td>4.8082</td>
      <td>3.0052</td>
      <td>2.2272</td>
    </tr>
    <tr>
      <th>2024-09-12 05:57:00</th>
      <td>4.8258</td>
      <td>3.0057</td>
      <td>2.2275</td>
    </tr>
    <tr>
      <th>2024-09-12 05:58:00</th>
      <td>5.0074</td>
      <td>3.3116</td>
      <td>2.6077</td>
    </tr>
    <tr>
      <th>2024-09-12 05:59:00</th>
      <td>5.2353</td>
      <td>3.5397</td>
      <td>2.9654</td>
    </tr>
    <tr>
      <th>2024-09-12 06:00:00</th>
      <td>5.4747</td>
      <td>3.9365</td>
      <td>3.0</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>2024-09-12 08:51:00</th>
      <td>7.1864</td>
      <td>4.5603</td>
      <td>3.5503</td>
    </tr>
    <tr>
      <th>2024-09-12 08:52:00</th>
      <td>6.9989</td>
      <td>4.4653</td>
      <td>3.5512</td>
    </tr>
    <tr>
      <th>2024-09-12 08:53:00</th>
      <td>7.0355</td>
      <td>4.5603</td>
      <td>3.5962</td>
    </tr>
    <tr>
      <th>2024-09-12 08:54:00</th>
      <td>7.1916</td>
      <td>4.8256</td>
      <td>3.6243</td>
    </tr>
    <tr>
      <th>2024-09-12 08:55:00</th>
      <td>7.2549</td>
      <td>4.847</td>
      <td>3.6454</td>
    </tr>
  </tbody>
</table>
<p>180 rows × 3 columns</p>
</div>




```python
mempool_size = farum_btc[['mempool_vsize']]
mempool_size
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
      <th>mempool_vsize</th>
    </tr>
    <tr>
      <th>time</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2024-09-12 05:56:00</th>
      <td>107483725</td>
    </tr>
    <tr>
      <th>2024-09-12 05:57:00</th>
      <td>107561609</td>
    </tr>
    <tr>
      <th>2024-09-12 05:58:00</th>
      <td>107733715</td>
    </tr>
    <tr>
      <th>2024-09-12 05:59:00</th>
      <td>107781513</td>
    </tr>
    <tr>
      <th>2024-09-12 06:00:00</th>
      <td>107843862</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
    </tr>
    <tr>
      <th>2024-09-12 08:51:00</th>
      <td>109105126</td>
    </tr>
    <tr>
      <th>2024-09-12 08:52:00</th>
      <td>109184172</td>
    </tr>
    <tr>
      <th>2024-09-12 08:53:00</th>
      <td>109218941</td>
    </tr>
    <tr>
      <th>2024-09-12 08:54:00</th>
      <td>109267955</td>
    </tr>
    <tr>
      <th>2024-09-12 08:55:00</th>
      <td>109321146</td>
    </tr>
  </tbody>
</table>
<p>180 rows × 1 columns</p>
</div>




```python
fig, ax = plt.subplots()
ax.set_title(str('\nMempool Fee Rates vs. Mempool Size\n'),fontsize=17,font='arial')
fees_btc.plot.line(ax=ax,grid=False)
plt.ylim(0, 1.1*(fees_btc['mempool_next_block_approx_feerate_mean'].max()))  
ax.set_ylabel('\nFee Rate (Sats/vB)\n',fontsize=14,font='arial')
ax.set_xlabel('')
ax2 = ax.twinx()
mempool_size.plot.area(ax=ax2,alpha=0.15,color="gray",legend=False,grid=False)
ax2.set_yticks(ax2.get_yticks())
ylabels = ['{:,.0f}'.format(y) for y in ax2.get_yticks()]
ax2.set_yticklabels(ylabels,fontsize=11)
ax2.set_ylabel('\nMempool Size (vB)\n',fontsize=14,font='arial')
ax2.yaxis.set_ticks_position('none') 
ax.yaxis.set_ticks_position('none') 
plt.savefig('./BTC-Mempool-Feerates-vs-size.png',facecolor='white',dpi=100)
plt.show()
```


    
![png](output_29_0.png)
    

