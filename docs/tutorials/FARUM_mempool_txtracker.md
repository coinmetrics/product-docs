<img src="https://5264302.fs1.hubspotusercontent-na1.net/hubfs/5264302/Demo%20Asset%20Resources/CM-Demo-mempool_txtracker.png" width=1100 margin-left='auto' margin-right='auto'/>

Coin Metrics **FARUM** suite can be used for a variety of risk management applications. For entities that are actively broadcasting and receiving transactions, FARUM's mempool monitoring capabilities provide a number of helpful heuristics for investigating the status of unconfirmed transactions and ensuring timely settlement.

## Resources
This notebook demonstrates basic functionality offered by the Coin Metrics Python API Client, ATLAS, and Network Data Pro.

Coin Metrics offers a vast assortment of data for hundreds of cryptoassets. The Python API Client allows for easy access to this data using Python without needing to create your own wrappers using `requests` and other such libraries.

To understand the data that Coin Metrics offers, feel free to peruse the resources below.

- The [Coin Metrics API v4](https://docs.coinmetrics.io/api/v4) website contains the full set of endpoints and data offered by Coin Metrics.
- The [Coin Metrics Knowledge Base](https://docs.coinmetrics.io/info) gives detailed, conceptual explanations of the data that Coin Metrics offers.
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
      <td>eafde9bd777a4e9dbdd17469111a8ae94eecccbf54caee...</td>
      <td>2024-09-11 03:20:30+00:00</td>
      <td>2024-09-10 19:20:30.353000+00:00</td>
      <td>CONFIRMED</td>
      <td>2024-09-10 19:21:38.291000+00:00</td>
      <td>[{'time': '2024-09-10T19:20:30.353000000Z', 's...</td>
      <td>{'amount': '0.00001095', 'version': '2', 'repl...</td>
      <td>&lt;NA&gt;</td>
      <td>&lt;NA&gt;</td>
      <td>00000000000000000001748b05fc27d1f78fba5d2148bf...</td>
      <td>[{'location': 'us_east', 'seen_time': '2024-09...</td>
      <td>&lt;NA&gt;</td>
      <td>[{'address': 'bc1p287vj0w8097lv3te6zsfjetm7yf8...</td>
      <td>[{'address': 'bc1pnxagu7utj6q7zznlahzkhlzyzept...</td>
    </tr>
    <tr>
      <th>90562</th>
      <td>d135519bb21d20665756bdaaefd312b219bc0ccb549c58...</td>
      <td>2024-09-11 03:25:45+00:00</td>
      <td>2024-09-11 00:15:17.887000+00:00</td>
      <td>CONFIRMED</td>
      <td>2024-09-11 00:22:45.539000+00:00</td>
      <td>[{'time': '2024-09-11T00:15:17.887000000Z', 's...</td>
      <td>{'amount': '6.34560438', 'version': '2', 'repl...</td>
      <td>&lt;NA&gt;</td>
      <td>&lt;NA&gt;</td>
      <td>00000000000000000001f3d4504b42432e3c1b2120f366...</td>
      <td>[{'location': 'us_east', 'seen_time': '2024-09...</td>
      <td>&lt;NA&gt;</td>
      <td>[{'address': 'bc1qf43tdrym26qlz8rg06f88wg35n27...</td>
      <td>[{'address': 'bc1qxn7hpglnjexq4mzum9tl30gmz64a...</td>
    </tr>
    <tr>
      <th>90561</th>
      <td>9ab2da76088f6b76037f957c27b40b83e93fe0ae3449f2...</td>
      <td>2024-09-11 03:25:45+00:00</td>
      <td>2024-09-11 00:15:17.887000+00:00</td>
      <td>CONFIRMED</td>
      <td>2024-09-11 00:22:45.508000+00:00</td>
      <td>[{'time': '2024-09-11T00:15:17.887000000Z', 's...</td>
      <td>{'amount': '0.00040539', 'version': '2', 'repl...</td>
      <td>&lt;NA&gt;</td>
      <td>&lt;NA&gt;</td>
      <td>00000000000000000001f3d4504b42432e3c1b2120f366...</td>
      <td>[{'location': 'us_east', 'seen_time': '2024-09...</td>
      <td>&lt;NA&gt;</td>
      <td>[{'address': 'bc1qj2zmzwpazgrgjh3a55jj5yty59nu...</td>
      <td>[{'address': 'bc1qwznelkc6r32u0cc4t8nuqxhx6fhp...</td>
    </tr>
    <tr>
      <th>90560</th>
      <td>b8a93db38349b32337ffe2b895d05f0657ee3cf668aa04...</td>
      <td>2024-09-11 03:25:45+00:00</td>
      <td>2024-09-11 00:15:17.383000+00:00</td>
      <td>CONFIRMED</td>
      <td>2024-09-11 00:22:45.560000+00:00</td>
      <td>[{'time': '2024-09-11T00:15:17.383000000Z', 's...</td>
      <td>{'amount': '0.00544949', 'version': '1', 'repl...</td>
      <td>&lt;NA&gt;</td>
      <td>&lt;NA&gt;</td>
      <td>00000000000000000001f3d4504b42432e3c1b2120f366...</td>
      <td>[{'location': 'us_east', 'seen_time': '2024-09...</td>
      <td>&lt;NA&gt;</td>
      <td>[{'address': 'bc1qlgku0a26aepxys2ddd3u6sjcjvsg...</td>
      <td>[{'address': 'bc1qnas0yw9rqnta7q3kc8f4xh450ykm...</td>
    </tr>
    <tr>
      <th>90559</th>
      <td>8298639132bed7ec3093a74a7d7713c61e5a4e457c10b4...</td>
      <td>2024-09-11 03:25:45+00:00</td>
      <td>2024-09-11 00:15:17.291000+00:00</td>
      <td>CONFIRMED</td>
      <td>2024-09-11 00:22:45.537000+00:00</td>
      <td>[{'time': '2024-09-11T00:15:17.291000000Z', 's...</td>
      <td>{'amount': '0.00261588', 'version': '2', 'repl...</td>
      <td>&lt;NA&gt;</td>
      <td>&lt;NA&gt;</td>
      <td>00000000000000000001f3d4504b42432e3c1b2120f366...</td>
      <td>[{'location': 'us_east', 'seen_time': '2024-09...</td>
      <td>&lt;NA&gt;</td>
      <td>[{'address': 'bc1qjdr96c0jjdh8j2n43m9sjd9xy4w9...</td>
      <td>[{'address': 'bc1q8k3628979dzgt6s8akss4w8nqyvt...</td>
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
      <th>117894</th>
      <td>4dc91aa7bcd33f515a08142a658ae30ba846f4b5272a52...</td>
      <td>2024-09-11 03:26:16+00:00</td>
      <td>2024-09-11 01:35:22.816000+00:00</td>
      <td>UNCONFIRMED</td>
      <td>2024-09-11 01:35:22.816000+00:00</td>
      <td>[{'time': '2024-09-11T01:35:22.816000000Z', 's...</td>
      <td>{'amount': '0.00051947', 'version': '2', 'repl...</td>
      <td>56226/192124</td>
      <td>0.01</td>
      <td>&lt;NA&gt;</td>
      <td>[{'location': 'us_east', 'seen_time': '2024-09...</td>
      <td>&lt;NA&gt;</td>
      <td>[{'address': 'bc1qs9ps83yc2nwpq72pdq3e87qnhye6...</td>
      <td>[{'address': 'RETURN 13 PUSHDATA(4)[14011400]'...</td>
    </tr>
    <tr>
      <th>117895</th>
      <td>aadd292b9357380d2f8fab6d41344bbddcf0f60695e902...</td>
      <td>2024-09-11 03:26:16+00:00</td>
      <td>2024-09-11 01:35:22.817000+00:00</td>
      <td>UNCONFIRMED</td>
      <td>2024-09-11 01:35:22.817000+00:00</td>
      <td>[{'time': '2024-09-11T01:35:22.817000000Z', 's...</td>
      <td>{'amount': '0.00052231', 'version': '2', 'repl...</td>
      <td>56226/192124</td>
      <td>0.01</td>
      <td>&lt;NA&gt;</td>
      <td>[{'location': 'us_east', 'seen_time': '2024-09...</td>
      <td>&lt;NA&gt;</td>
      <td>[{'address': 'bc1qs9ps83yc2nwpq72pdq3e87qnhye6...</td>
      <td>[{'address': 'RETURN 13 PUSHDATA(4)[14011400]'...</td>
    </tr>
    <tr>
      <th>117907</th>
      <td>84f36af047ce31034d763aa3302eeaba48d478b3c640eb...</td>
      <td>2024-09-11 03:26:16+00:00</td>
      <td>2024-09-11 01:35:23.154000+00:00</td>
      <td>UNCONFIRMED</td>
      <td>2024-09-11 01:35:23.154000+00:00</td>
      <td>[{'time': '2024-09-11T01:35:23.154000000Z', 's...</td>
      <td>{'amount': '0.00051379', 'version': '2', 'repl...</td>
      <td>56226/192124</td>
      <td>0.01</td>
      <td>&lt;NA&gt;</td>
      <td>[{'location': 'us_east', 'seen_time': '2024-09...</td>
      <td>&lt;NA&gt;</td>
      <td>[{'address': 'bc1qs9ps83yc2nwpq72pdq3e87qnhye6...</td>
      <td>[{'address': 'RETURN 13 PUSHDATA(4)[14011400]'...</td>
    </tr>
    <tr>
      <th>117888</th>
      <td>927960fdbe0b900e5bb57a1bb54ed643907e91cec43b55...</td>
      <td>2024-09-11 03:26:16+00:00</td>
      <td>2024-09-11 01:35:22.812000+00:00</td>
      <td>UNCONFIRMED</td>
      <td>2024-09-11 01:35:22.812000+00:00</td>
      <td>[{'time': '2024-09-11T01:35:22.812000000Z', 's...</td>
      <td>{'amount': '0.00051379', 'version': '2', 'repl...</td>
      <td>56226/192124</td>
      <td>0.01</td>
      <td>&lt;NA&gt;</td>
      <td>[{'location': 'us_east', 'seen_time': '2024-09...</td>
      <td>&lt;NA&gt;</td>
      <td>[{'address': 'bc1qs9ps83yc2nwpq72pdq3e87qnhye6...</td>
      <td>[{'address': 'RETURN 13 PUSHDATA(4)[14011400]'...</td>
    </tr>
    <tr>
      <th>164055</th>
      <td>aded503be8ad91cd9588dfba9cc63183689302ea637ccf...</td>
      <td>2024-09-11 03:27:07+00:00</td>
      <td>2024-09-11 03:27:07.097000+00:00</td>
      <td>UNCONFIRMED</td>
      <td>2024-09-11 03:27:07.097000+00:00</td>
      <td>[{'time': '2024-09-11T03:27:07.097000000Z', 's...</td>
      <td>{'amount': '0.00159742', 'version': '2', 'repl...</td>
      <td>805/188929</td>
      <td>99.22</td>
      <td>&lt;NA&gt;</td>
      <td>[{'location': 'us_east', 'seen_time': '2024-09...</td>
      <td>&lt;NA&gt;</td>
      <td>[{'address': 'bc1q6h4ze4vjh86ekcq57uek4ttarzs2...</td>
      <td>[{'address': '1N13XD57nyER33ycs1PXn6S6Tk3fSZFi...</td>
    </tr>
  </tbody>
</table>
<p>164056 rows × 14 columns</p>
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
      <th>3</th>
      <td>132a169117c6ae2fa49235b96025e435c0ab60d045ae45...</td>
      <td>2024-09-11 03:20:30+00:00</td>
      <td>2024-09-10 19:20:31.457000+00:00</td>
      <td>UNCONFIRMED</td>
      <td>2024-09-10 19:20:31.457000+00:00</td>
      <td>[{'time': '2024-09-10T19:20:31.457000000Z', 's...</td>
      <td>{'amount': '0.032301', 'version': '1', 'replac...</td>
      <td>55519/191398</td>
      <td>0.01</td>
      <td>&lt;NA&gt;</td>
      <td>[{'location': 'us_east', 'seen_time': '2024-09...</td>
      <td>&lt;NA&gt;</td>
      <td>[{'address': 'bc1q34au69mjq2qrfq5uv2qklwh42865...</td>
      <td>[{'address': 'bc1q466ar0l2ys8g7mslejfl9275xhlf...</td>
    </tr>
    <tr>
      <th>1320</th>
      <td>05f858ffa6f7befa64d97d1ce5eeab04d15ebe08cf0d2d...</td>
      <td>2024-09-11 03:20:40+00:00</td>
      <td>2024-09-10 19:22:39.908000+00:00</td>
      <td>UNCONFIRMED</td>
      <td>2024-09-10 19:22:39.908000+00:00</td>
      <td>[{'time': '2024-09-10T19:22:39.908000000Z', 's...</td>
      <td>{'amount': '0.26225869', 'version': '1', 'repl...</td>
      <td>55519/191398</td>
      <td>0.01</td>
      <td>&lt;NA&gt;</td>
      <td>[{'location': 'us_east', 'seen_time': '2024-09...</td>
      <td>&lt;NA&gt;</td>
      <td>[{'address': 'bc1qmpl2ygkvuq0xxqxeweztrc36dey5...</td>
      <td>[{'address': 'bc1qffjx2xc52mpjaduf7ntj4zftuyzm...</td>
    </tr>
    <tr>
      <th>1592</th>
      <td>d390deec78d5f41fb014f2057be810bccabc2024c49d22...</td>
      <td>2024-09-11 03:20:42+00:00</td>
      <td>2024-09-10 19:23:23.067000+00:00</td>
      <td>UNCONFIRMED</td>
      <td>2024-09-10 19:23:23.067000+00:00</td>
      <td>[{'time': '2024-09-10T19:23:23.067000000Z', 's...</td>
      <td>{'amount': '1.73967616', 'version': '2', 'repl...</td>
      <td>55519/191398</td>
      <td>0.01</td>
      <td>&lt;NA&gt;</td>
      <td>[{'location': 'us_east', 'seen_time': '2024-09...</td>
      <td>&lt;NA&gt;</td>
      <td>[{'address': 'bc1qq9ns7tk2sx6kseqw76v5mpdzc3tt...</td>
      <td>[{'address': 'bc1qtf4e4waswpqx9em0nefglpvt9ug3...</td>
    </tr>
    <tr>
      <th>1728</th>
      <td>b3841828e26fcdf832f8c95394cfdf802bbecaf0cd229b...</td>
      <td>2024-09-11 03:20:43+00:00</td>
      <td>2024-09-10 19:23:48.398000+00:00</td>
      <td>UNCONFIRMED</td>
      <td>2024-09-10 19:23:48.398000+00:00</td>
      <td>[{'time': '2024-09-10T19:23:48.398000000Z', 's...</td>
      <td>{'amount': '0.03697453', 'version': '2', 'repl...</td>
      <td>55519/191398</td>
      <td>0.01</td>
      <td>&lt;NA&gt;</td>
      <td>[{'location': 'us_east', 'seen_time': '2024-09...</td>
      <td>&lt;NA&gt;</td>
      <td>[{'address': 'bc1qmlkwked335cjsnnptg249me09gep...</td>
      <td>[{'address': 'bc1qhddgz8a889d8p9n85dl7zdrtascl...</td>
    </tr>
    <tr>
      <th>2053</th>
      <td>b2da4578ba0fea8c752649326c3a3509956987c4b55a4a...</td>
      <td>2024-09-11 03:20:45+00:00</td>
      <td>2024-09-10 19:24:41.947000+00:00</td>
      <td>UNCONFIRMED</td>
      <td>2024-09-10 19:24:41.947000+00:00</td>
      <td>[{'time': '2024-09-10T19:24:41.947000000Z', 's...</td>
      <td>{'amount': '0.10322012', 'version': '1', 'repl...</td>
      <td>55519/191398</td>
      <td>0.01</td>
      <td>&lt;NA&gt;</td>
      <td>[{'location': 'us_east', 'seen_time': '2024-09...</td>
      <td>&lt;NA&gt;</td>
      <td>[{'address': 'bc1pgznttv59cxenfcz075thm76y72wc...</td>
      <td>[{'address': 'bc1pa5kv2485765uujktmgzcw9rwwxup...</td>
    </tr>
  </tbody>
</table>
</div>




```python
unconfirmed_list = unconfirmed.txid.to_list()
unconfirmed_list[0:5]
```




    ['132a169117c6ae2fa49235b96025e435c0ab60d045ae45b9881e32ac8a30d08a',
     '05f858ffa6f7befa64d97d1ce5eeab04d15ebe08cf0d2da23a4e38fb25c17c75',
     'd390deec78d5f41fb014f2057be810bccabc2024c49d226fda5eeb5566b6d78c',
     'b3841828e26fcdf832f8c95394cfdf802bbecaf0cd229bba3c69457e70a2dcc7',
     'b2da4578ba0fea8c752649326c3a3509956987c4b55a4a060a8691a5e4f4ea0e']




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
      <td>eafde9bd777a4e9dbdd17469111a8ae94eecccbf54caee...</td>
    </tr>
    <tr>
      <th>time</th>
      <td>2024-09-11 03:20:30+00:00</td>
    </tr>
    <tr>
      <th>first_seen_time</th>
      <td>2024-09-10 19:20:30.353000+00:00</td>
    </tr>
    <tr>
      <th>status</th>
      <td>CONFIRMED</td>
    </tr>
    <tr>
      <th>status_update_time</th>
      <td>2024-09-10 19:21:38.291000+00:00</td>
    </tr>
    <tr>
      <th>status_updates</th>
      <td>[{'time': '2024-09-10T19:20:30.353000000Z', 's...</td>
    </tr>
    <tr>
      <th>details</th>
      <td>{'amount': '0.00001095', 'version': '2', 'repl...</td>
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
      <td>00000000000000000001748b05fc27d1f78fba5d2148bf...</td>
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
      <td>[{'address': 'bc1p287vj0w8097lv3te6zsfjetm7yf8...</td>
    </tr>
    <tr>
      <th>outputs</th>
      <td>[{'address': 'bc1pnxagu7utj6q7zznlahzkhlzyzept...</td>
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
      <td>0.00001095</td>
    </tr>
    <tr>
      <th>version</th>
      <td>2</td>
    </tr>
    <tr>
      <th>replace_by_fee_supported</th>
      <td>True</td>
    </tr>
    <tr>
      <th>fee</th>
      <td>0.00000549</td>
    </tr>
    <tr>
      <th>feerate</th>
      <td>0</td>
    </tr>
    <tr>
      <th>mempool_feerate_mean_at_first_seen_time</th>
      <td>1.6463</td>
    </tr>
    <tr>
      <th>mempool_feerate_min_at_first_seen_time</th>
      <td>1</td>
    </tr>
    <tr>
      <th>consensus_size</th>
      <td>608</td>
    </tr>
    <tr>
      <th>physical_size</th>
      <td>323</td>
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
      <td>2024-09-10T19:20:30.353000000Z</td>
      <td>UNCONFIRMED</td>
      <td>NaN</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>1</th>
      <td>2024-09-10T19:21:38.291000000Z</td>
      <td>CONFIRMED</td>
      <td>00000000000000000001748b05fc27d1f78fba5d2148bf...</td>
      <td>860797</td>
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
      <td>2024-09-10 19:21:00+00:00</td>
      <td>[{'feerate': '1', 'count': '82950', 'consensus...</td>
    </tr>
    <tr>
      <th>1</th>
      <td>btc</td>
      <td>2024-09-10 19:22:00+00:00</td>
      <td>[{'feerate': '1', 'count': '82950', 'consensus...</td>
    </tr>
    <tr>
      <th>2</th>
      <td>btc</td>
      <td>2024-09-10 19:23:00+00:00</td>
      <td>[{'feerate': '1', 'count': '82951', 'consensus...</td>
    </tr>
    <tr>
      <th>3</th>
      <td>btc</td>
      <td>2024-09-10 19:24:00+00:00</td>
      <td>[{'feerate': '1', 'count': '82951', 'consensus...</td>
    </tr>
    <tr>
      <th>4</th>
      <td>btc</td>
      <td>2024-09-10 19:25:00+00:00</td>
      <td>[{'feerate': '1', 'count': '82952', 'consensus...</td>
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
      <td>2024-09-10 22:16:00+00:00</td>
      <td>[{'feerate': '1', 'count': '83000', 'consensus...</td>
    </tr>
    <tr>
      <th>176</th>
      <td>btc</td>
      <td>2024-09-10 22:17:00+00:00</td>
      <td>[{'feerate': '1', 'count': '83001', 'consensus...</td>
    </tr>
    <tr>
      <th>177</th>
      <td>btc</td>
      <td>2024-09-10 22:18:00+00:00</td>
      <td>[{'feerate': '1', 'count': '82983', 'consensus...</td>
    </tr>
    <tr>
      <th>178</th>
      <td>btc</td>
      <td>2024-09-10 22:19:00+00:00</td>
      <td>[{'feerate': '1', 'count': '82983', 'consensus...</td>
    </tr>
    <tr>
      <th>179</th>
      <td>btc</td>
      <td>2024-09-10 22:20:00+00:00</td>
      <td>[{'feerate': '1', 'count': '82989', 'consensus...</td>
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

    <ipython-input-14-e027e161c29a>:3: UserWarning: Could not infer format, so each element will be parsed individually, falling back to `dateutil`. To ensure parsing is consistent and as-expected, please specify a format.
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
      <th>141</th>
      <th>142</th>
      <th>143</th>
      <th>144</th>
      <th>145</th>
      <th>146</th>
      <th>147</th>
      <th>148</th>
      <th>149</th>
      <th>150</th>
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
      <th>2024-09-10 19:21:00</th>
      <td>btc</td>
      <td>2024-09-10 19:21:00+00:00</td>
      <td>{'feerate': '1', 'count': '82950', 'consensus_...</td>
      <td>{'feerate': '2', 'count': '89743', 'consensus_...</td>
      <td>{'feerate': '3', 'count': '711', 'consensus_si...</td>
      <td>{'feerate': '4', 'count': '473', 'consensus_si...</td>
      <td>{'feerate': '5', 'count': '376', 'consensus_si...</td>
      <td>{'feerate': '6', 'count': '110', 'consensus_si...</td>
      <td>{'feerate': '7', 'count': '133', 'consensus_si...</td>
      <td>{'feerate': '8', 'count': '24', 'consensus_siz...</td>
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
      <th>2024-09-10 19:22:00</th>
      <td>btc</td>
      <td>2024-09-10 19:22:00+00:00</td>
      <td>{'feerate': '1', 'count': '82950', 'consensus_...</td>
      <td>{'feerate': '2', 'count': '87687', 'consensus_...</td>
      <td>{'feerate': '3', 'count': '104', 'consensus_si...</td>
      <td>{'feerate': '4', 'count': '97', 'consensus_siz...</td>
      <td>{'feerate': '5', 'count': '103', 'consensus_si...</td>
      <td>{'feerate': '6', 'count': '14', 'consensus_siz...</td>
      <td>{'feerate': '7', 'count': '70', 'consensus_siz...</td>
      <td>{'feerate': '8', 'count': '3', 'consensus_size...</td>
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
      <th>2024-09-10 19:23:00</th>
      <td>btc</td>
      <td>2024-09-10 19:23:00+00:00</td>
      <td>{'feerate': '1', 'count': '82951', 'consensus_...</td>
      <td>{'feerate': '2', 'count': '88433', 'consensus_...</td>
      <td>{'feerate': '3', 'count': '150', 'consensus_si...</td>
      <td>{'feerate': '4', 'count': '142', 'consensus_si...</td>
      <td>{'feerate': '5', 'count': '148', 'consensus_si...</td>
      <td>{'feerate': '6', 'count': '27', 'consensus_siz...</td>
      <td>{'feerate': '7', 'count': '82', 'consensus_siz...</td>
      <td>{'feerate': '8', 'count': '7', 'consensus_size...</td>
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
      <th>2024-09-10 19:24:00</th>
      <td>btc</td>
      <td>2024-09-10 19:24:00+00:00</td>
      <td>{'feerate': '1', 'count': '82951', 'consensus_...</td>
      <td>{'feerate': '2', 'count': '88567', 'consensus_...</td>
      <td>{'feerate': '3', 'count': '235', 'consensus_si...</td>
      <td>{'feerate': '4', 'count': '189', 'consensus_si...</td>
      <td>{'feerate': '5', 'count': '182', 'consensus_si...</td>
      <td>{'feerate': '6', 'count': '40', 'consensus_siz...</td>
      <td>{'feerate': '7', 'count': '87', 'consensus_siz...</td>
      <td>{'feerate': '8', 'count': '7', 'consensus_size...</td>
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
      <th>2024-09-10 19:25:00</th>
      <td>btc</td>
      <td>2024-09-10 19:25:00+00:00</td>
      <td>{'feerate': '1', 'count': '82952', 'consensus_...</td>
      <td>{'feerate': '2', 'count': '88660', 'consensus_...</td>
      <td>{'feerate': '3', 'count': '334', 'consensus_si...</td>
      <td>{'feerate': '4', 'count': '229', 'consensus_si...</td>
      <td>{'feerate': '5', 'count': '216', 'consensus_si...</td>
      <td>{'feerate': '6', 'count': '50', 'consensus_siz...</td>
      <td>{'feerate': '7', 'count': '89', 'consensus_siz...</td>
      <td>{'feerate': '8', 'count': '11', 'consensus_siz...</td>
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
      <th>2024-09-10 22:16:00</th>
      <td>btc</td>
      <td>2024-09-10 22:16:00+00:00</td>
      <td>{'feerate': '1', 'count': '83000', 'consensus_...</td>
      <td>{'feerate': '2', 'count': '92578', 'consensus_...</td>
      <td>{'feerate': '3', 'count': '1740', 'consensus_s...</td>
      <td>{'feerate': '4', 'count': '1934', 'consensus_s...</td>
      <td>{'feerate': '5', 'count': '1780', 'consensus_s...</td>
      <td>{'feerate': '6', 'count': '157', 'consensus_si...</td>
      <td>{'feerate': '7', 'count': '155', 'consensus_si...</td>
      <td>{'feerate': '8', 'count': '54', 'consensus_siz...</td>
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
      <th>2024-09-10 22:17:00</th>
      <td>btc</td>
      <td>2024-09-10 22:17:00+00:00</td>
      <td>{'feerate': '1', 'count': '83001', 'consensus_...</td>
      <td>{'feerate': '2', 'count': '92580', 'consensus_...</td>
      <td>{'feerate': '3', 'count': '1747', 'consensus_s...</td>
      <td>{'feerate': '4', 'count': '1947', 'consensus_s...</td>
      <td>{'feerate': '5', 'count': '1826', 'consensus_s...</td>
      <td>{'feerate': '6', 'count': '185', 'consensus_si...</td>
      <td>{'feerate': '7', 'count': '163', 'consensus_si...</td>
      <td>{'feerate': '8', 'count': '66', 'consensus_siz...</td>
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
      <th>2024-09-10 22:18:00</th>
      <td>btc</td>
      <td>2024-09-10 22:18:00+00:00</td>
      <td>{'feerate': '1', 'count': '82983', 'consensus_...</td>
      <td>{'feerate': '2', 'count': '92583', 'consensus_...</td>
      <td>{'feerate': '3', 'count': '1754', 'consensus_s...</td>
      <td>{'feerate': '4', 'count': '1958', 'consensus_s...</td>
      <td>{'feerate': '5', 'count': '1863', 'consensus_s...</td>
      <td>{'feerate': '6', 'count': '219', 'consensus_si...</td>
      <td>{'feerate': '7', 'count': '177', 'consensus_si...</td>
      <td>{'feerate': '8', 'count': '70', 'consensus_siz...</td>
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
      <th>2024-09-10 22:19:00</th>
      <td>btc</td>
      <td>2024-09-10 22:19:00+00:00</td>
      <td>{'feerate': '1', 'count': '82983', 'consensus_...</td>
      <td>{'feerate': '2', 'count': '92583', 'consensus_...</td>
      <td>{'feerate': '3', 'count': '1763', 'consensus_s...</td>
      <td>{'feerate': '4', 'count': '1971', 'consensus_s...</td>
      <td>{'feerate': '5', 'count': '1912', 'consensus_s...</td>
      <td>{'feerate': '6', 'count': '251', 'consensus_si...</td>
      <td>{'feerate': '7', 'count': '183', 'consensus_si...</td>
      <td>{'feerate': '8', 'count': '85', 'consensus_siz...</td>
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
      <th>2024-09-10 22:20:00</th>
      <td>btc</td>
      <td>2024-09-10 22:20:00+00:00</td>
      <td>{'feerate': '1', 'count': '82989', 'consensus_...</td>
      <td>{'feerate': '2', 'count': '92585', 'consensus_...</td>
      <td>{'feerate': '3', 'count': '1767', 'consensus_s...</td>
      <td>{'feerate': '4', 'count': '1986', 'consensus_s...</td>
      <td>{'feerate': '5', 'count': '1960', 'consensus_s...</td>
      <td>{'feerate': '6', 'count': '273', 'consensus_si...</td>
      <td>{'feerate': '7', 'count': '185', 'consensus_si...</td>
      <td>{'feerate': '8', 'count': '92', 'consensus_siz...</td>
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
  </tbody>
</table>
<p>180 rows × 153 columns</p>
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
      <td>82950</td>
      <td>187491636</td>
      <td>0.56939911</td>
      <td>92421305</td>
    </tr>
    <tr>
      <th>1</th>
      <td>1</td>
      <td>82950</td>
      <td>187491636</td>
      <td>0.56939911</td>
      <td>92421305</td>
    </tr>
    <tr>
      <th>2</th>
      <td>1</td>
      <td>82951</td>
      <td>187495932</td>
      <td>0.56941367</td>
      <td>92422379</td>
    </tr>
    <tr>
      <th>3</th>
      <td>1</td>
      <td>82951</td>
      <td>187495932</td>
      <td>0.56941367</td>
      <td>92422379</td>
    </tr>
    <tr>
      <th>4</th>
      <td>1</td>
      <td>82952</td>
      <td>187496372</td>
      <td>0.56941512</td>
      <td>92422570</td>
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
      <td>83000</td>
      <td>188065556</td>
      <td>0.57158047</td>
      <td>92783508</td>
    </tr>
    <tr>
      <th>176</th>
      <td>1</td>
      <td>83001</td>
      <td>188066080</td>
      <td>0.57158178</td>
      <td>92783690</td>
    </tr>
    <tr>
      <th>177</th>
      <td>1</td>
      <td>82983</td>
      <td>188056648</td>
      <td>0.5715582</td>
      <td>92780414</td>
    </tr>
    <tr>
      <th>178</th>
      <td>1</td>
      <td>82983</td>
      <td>188056648</td>
      <td>0.5715582</td>
      <td>92780414</td>
    </tr>
    <tr>
      <th>179</th>
      <td>1</td>
      <td>82989</td>
      <td>188060160</td>
      <td>0.57156766</td>
      <td>92781547</td>
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

    <ipython-input-19-9db84fb98d72>:1: UserWarning: Could not infer format, so each element will be parsed individually, falling back to `dateutil`. To ensure parsing is consistent and as-expected, please specify a format.
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
      <th>2024-09-10 19:21:00</th>
      <td>4.9046</td>
      <td>3.0</td>
      <td>2.3175</td>
    </tr>
    <tr>
      <th>2024-09-10 19:22:00</th>
      <td>2.6668</td>
      <td>2.3175</td>
      <td>2.2857</td>
    </tr>
    <tr>
      <th>2024-09-10 19:23:00</th>
      <td>2.9477</td>
      <td>2.3175</td>
      <td>2.3175</td>
    </tr>
    <tr>
      <th>2024-09-10 19:24:00</th>
      <td>3.3054</td>
      <td>2.3175</td>
      <td>2.3175</td>
    </tr>
    <tr>
      <th>2024-09-10 19:25:00</th>
      <td>3.5975</td>
      <td>2.3175</td>
      <td>2.3175</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>2024-09-10 22:16:00</th>
      <td>6.1675</td>
      <td>5.0</td>
      <td>4.0</td>
    </tr>
    <tr>
      <th>2024-09-10 22:17:00</th>
      <td>6.3823</td>
      <td>5.0</td>
      <td>4.0</td>
    </tr>
    <tr>
      <th>2024-09-10 22:18:00</th>
      <td>6.5946</td>
      <td>5.0</td>
      <td>4.008</td>
    </tr>
    <tr>
      <th>2024-09-10 22:19:00</th>
      <td>6.7349</td>
      <td>5.0</td>
      <td>4.0135</td>
    </tr>
    <tr>
      <th>2024-09-10 22:20:00</th>
      <td>6.8435</td>
      <td>5.0</td>
      <td>4.0149</td>
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
      <th>2024-09-10 19:21:00</th>
      <td>97906935</td>
    </tr>
    <tr>
      <th>2024-09-10 19:22:00</th>
      <td>97018294</td>
    </tr>
    <tr>
      <th>2024-09-10 19:23:00</th>
      <td>97261919</td>
    </tr>
    <tr>
      <th>2024-09-10 19:24:00</th>
      <td>97378651</td>
    </tr>
    <tr>
      <th>2024-09-10 19:25:00</th>
      <td>97510089</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
    </tr>
    <tr>
      <th>2024-09-10 22:16:00</th>
      <td>100231268</td>
    </tr>
    <tr>
      <th>2024-09-10 22:17:00</th>
      <td>100287021</td>
    </tr>
    <tr>
      <th>2024-09-10 22:18:00</th>
      <td>100378000</td>
    </tr>
    <tr>
      <th>2024-09-10 22:19:00</th>
      <td>100429868</td>
    </tr>
    <tr>
      <th>2024-09-10 22:20:00</th>
      <td>100457711</td>
    </tr>
  </tbody>
</table>
<p>180 rows × 1 columns</p>
</div>




```python
fig, ax = plt.subplots()
ax.set_title(str('\nMempool Fee Rates vs. Mempool Size\n'),fontsize=17,font='Lato')
fees_btc.plot.line(ax=ax,grid=False)
plt.ylim(0, 1.1*(fees_btc['mempool_next_block_approx_feerate_mean'].max()))  
ax.set_ylabel('\nFee Rate (Sats/vB)\n',fontsize=14,font='Lato')
ax.set_xlabel('')
ax2 = ax.twinx()
mempool_size.plot.area(ax=ax2,alpha=0.15,color="gray",legend=False,grid=False)
ax2.set_yticks(ax2.get_yticks())
ylabels = ['{:,.0f}'.format(y) for y in ax2.get_yticks()]
ax2.set_yticklabels(ylabels,fontsize=11)
ax2.set_ylabel('\nMempool Size (vB)\n',fontsize=14,font='Lato')
ax2.yaxis.set_ticks_position('none') 
ax.yaxis.set_ticks_position('none') 
plt.savefig('./BTC-Mempool-Feerates-vs-size.png',facecolor='white',dpi=100)
plt.show()
```

    WARNING:matplotlib.font_manager:findfont: Font family 'Lato' not found.
    WARNING:matplotlib.font_manager:findfont: Font family 'Lato' not found.
    WARNING:matplotlib.font_manager:findfont: Font family 'Lato' not found.
    WARNING:matplotlib.font_manager:findfont: Font family 'Lato' not found.
    WARNING:matplotlib.font_manager:findfont: Font family 'Lato' not found.
    WARNING:matplotlib.font_manager:findfont: Font family 'Lato' not found.
    WARNING:matplotlib.font_manager:findfont: Font family 'Lato' not found.
    WARNING:matplotlib.font_manager:findfont: Font family 'Lato' not found.
    WARNING:matplotlib.font_manager:findfont: Font family 'Lato' not found.
    WARNING:matplotlib.font_manager:findfont: Font family 'Lato' not found.
    WARNING:matplotlib.font_manager:findfont: Font family 'Lato' not found.
    WARNING:matplotlib.font_manager:findfont: Font family 'Lato' not found.
    WARNING:matplotlib.font_manager:findfont: Font family 'Lato' not found.
    WARNING:matplotlib.font_manager:findfont: Font family 'Lato' not found.
    WARNING:matplotlib.font_manager:findfont: Font family 'Lato' not found.
    WARNING:matplotlib.font_manager:findfont: Font family 'Lato' not found.
    WARNING:matplotlib.font_manager:findfont: Font family 'Lato' not found.
    WARNING:matplotlib.font_manager:findfont: Font family 'Lato' not found.
    WARNING:matplotlib.font_manager:findfont: Font family 'Lato' not found.
    WARNING:matplotlib.font_manager:findfont: Font family 'Lato' not found.
    WARNING:matplotlib.font_manager:findfont: Font family 'Lato' not found.
    WARNING:matplotlib.font_manager:findfont: Font family 'Lato' not found.
    WARNING:matplotlib.font_manager:findfont: Font family 'Lato' not found.
    WARNING:matplotlib.font_manager:findfont: Font family 'Lato' not found.
    WARNING:matplotlib.font_manager:findfont: Font family 'Lato' not found.
    WARNING:matplotlib.font_manager:findfont: Font family 'Lato' not found.
    WARNING:matplotlib.font_manager:findfont: Font family 'Lato' not found.
    WARNING:matplotlib.font_manager:findfont: Font family 'Lato' not found.
    WARNING:matplotlib.font_manager:findfont: Font family 'Lato' not found.
    WARNING:matplotlib.font_manager:findfont: Font family 'Lato' not found.
    WARNING:matplotlib.font_manager:findfont: Font family 'Lato' not found.
    WARNING:matplotlib.font_manager:findfont: Font family 'Lato' not found.
    WARNING:matplotlib.font_manager:findfont: Font family 'Lato' not found.
    WARNING:matplotlib.font_manager:findfont: Font family 'Lato' not found.
    WARNING:matplotlib.font_manager:findfont: Font family 'Lato' not found.
    WARNING:matplotlib.font_manager:findfont: Font family 'Lato' not found.
    WARNING:matplotlib.font_manager:findfont: Font family 'Lato' not found.
    WARNING:matplotlib.font_manager:findfont: Font family 'Lato' not found.
    WARNING:matplotlib.font_manager:findfont: Font family 'Lato' not found.
    WARNING:matplotlib.font_manager:findfont: Font family 'Lato' not found.
    WARNING:matplotlib.font_manager:findfont: Font family 'Lato' not found.
    WARNING:matplotlib.font_manager:findfont: Font family 'Lato' not found.



    
![png](output_29_1.png)
    

