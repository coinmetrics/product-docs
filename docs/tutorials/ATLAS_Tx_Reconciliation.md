<img src="https://5264302.fs1.hubspotusercontent-na1.net/hubfs/5264302/Demo%20Asset%20Resources/CM-Demo-tx_reconciliation-Cover.png" width=1100 margin-left='auto' margin-right='auto'/>

### Notebook Setup


```python
import pandas as pd
import os
from os import environ
import requests
from datetime import date, datetime, timedelta
from coinmetrics.api_client import CoinMetricsClient
import json
from pytz import timezone as timezone_conv
from datetime import timezone as timezone_info
from pandas import json_normalize
import numpy as np
import logging
import matplotlib.pyplot as plt
```


```python
logging.basicConfig(
    format='%(asctime)s %(levelname)-8s %(message)s',
    level=logging.INFO,
    datefmt='%Y-%m-%d %H:%M:%S'
)
plt.rcParams["figure.figsize"] = (13,7)
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

    2024-09-11 15:34:00 INFO     Using API key found in environment


## Internal Records

The purpose behind transaction reconciliation is to compare internal records to the on-chain trust to make sure that the data matches.

As a first step in this process we are pulling mock internal transactions. For purposes of the demo these are a small set of transactions kept in a csv file. In a real world use case, this would most likely be a larger data set pulled from a data base or different internal data source.


```python
#####
# Load CSV for transactions
#####
internalTx = pd.read_csv(os.curdir+'/sampleTransactions.csv')
internalTx
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
      <th>time_internal</th>
      <th>internal_tx_id</th>
      <th>chain_tx_id</th>
      <th>adr</th>
      <th>amt</th>
      <th>asset</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1/13/2023 12:21:41</td>
      <td>n827523572</td>
      <td>0bc35bc7c24d20eafb839b81b17e588806ed67d4192dd1...</td>
      <td>bc1qrp9uar5696atawxacr2nl8udxhaxh2gp4a8d24</td>
      <td>0.833000</td>
      <td>btc</td>
    </tr>
    <tr>
      <th>1</th>
      <td>1/13/2023 12:28:46</td>
      <td>n758675035</td>
      <td>686b4b154841f133f63567595a72d042409846521d29fb...</td>
      <td>bc1qrp9uar5696atawxacr2nl8udxhaxh2gp4a8d24</td>
      <td>-0.833000</td>
      <td>btc</td>
    </tr>
    <tr>
      <th>2</th>
      <td>1/13/2023 12:28:46</td>
      <td>i934602052</td>
      <td>0n4tfebc7c24d20eafb839b81b17e588806ed67d4192dd...</td>
      <td>bc1qrp9uar5696atawxacr2nl8udxhaxh2gp4a8d24</td>
      <td>1.000000</td>
      <td>btc</td>
    </tr>
    <tr>
      <th>3</th>
      <td>6/9/2020 10:00:40</td>
      <td>s964830134</td>
      <td>9262ebcd0bd0f3fe7316eb81e8ff3f3e954acbf3f4f3bf...</td>
      <td>3BMEXWUNCNxbmNmeTZwxNUQ1w1qL1aSeKP</td>
      <td>0.035156</td>
      <td>btc</td>
    </tr>
    <tr>
      <th>4</th>
      <td>4/4/2019 4:05:50</td>
      <td>a810293195</td>
      <td>8153bae0c36d7104665630c46dd53930a14e157caf5f91...</td>
      <td>3D1i7saNYx6DJ9SUN8wUxgoHou7dwEHupy</td>
      <td>0.003034</td>
      <td>btc</td>
    </tr>
    <tr>
      <th>5</th>
      <td>5/19/2021 12:52:35</td>
      <td>a851479635</td>
      <td>f09b5a18c08ee3d6573354bf58b952832c6c0963a092ff...</td>
      <td>1DbYUCWL61G1u4ZKvRC6WJWrwzmnQyoLmF</td>
      <td>6.999500</td>
      <td>btc</td>
    </tr>
    <tr>
      <th>6</th>
      <td>1/13/2023 9:08:05</td>
      <td>g548723842</td>
      <td>6a3e786396c0527b78fc7415d1b1b88efcb9d375c1c09e...</td>
      <td>bc1q3wa78tmkfvpascw3ycfmvuzv4jd58sggqn03fz</td>
      <td>0.464801</td>
      <td>btc</td>
    </tr>
    <tr>
      <th>7</th>
      <td>1/13/2023 15:33:17</td>
      <td>t521047986</td>
      <td>4528ef0536de03b3e64c8151b2f2b48eff552e48a7774e...</td>
      <td>bc1q3wa78tmkfvpascw3ycfmvuzv4jd58sggqn03fz</td>
      <td>-0.564801</td>
      <td>btc</td>
    </tr>
  </tbody>
</table>
</div>



#### Address List Generation
For purposes of this demo, we are getting a list of relevant addresses based on the transaction list. In a real world this could be a separate list of addresses that is being pulled in from a database or a separate csv file.


```python
####
# Generate a list of relevant addresses
####
adrList = internalTx.drop(['time_internal', 'internal_tx_id', 'chain_tx_id', 'amt'], axis=1)
adrList.drop_duplicates(inplace=True)
```

## Coin Metrics ATLAS data
For each address in the address list, we query all relevant transactions. In a real world example, this query could be limited by the date for example to limit the amount of data that needs to be pulled in.


```python
####
# Pull in on-chain data from Coin Metrics ATLAS
####
chainTx = pd.DataFrame()
startIndex = 0

while startIndex < len(adrList):
    df = client.get_list_of_balance_updates_v2(
        asset=adrList['asset'].loc[adrList.index[startIndex]],
        accounts=adrList['adr'].loc[adrList.index[startIndex]]
    ).to_dataframe()

    chainTx = pd.concat([chainTx, df], ignore_index=True)
    
    startIndex += 1

chainTx
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
      <th>txid</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>3314718320099339</td>
      <td>bc1qrp9uar5696atawxacr2nl8udxhaxh2gp4a8d24</td>
      <td>771768</td>
      <td>0.833</td>
      <td>0.0</td>
      <td>0.833</td>
      <td>0</td>
      <td>0</td>
      <td>1</td>
      <td>00000000000000000003018b8b678f5327b697908ffa30...</td>
      <td>771768</td>
      <td>2023-01-13 16:49:20+00:00</td>
      <td>True</td>
      <td>0.833</td>
      <td>0.0</td>
      <td>0bc35bc7c24d20eafb839b81b17e588806ed67d4192dd1...</td>
    </tr>
    <tr>
      <th>1</th>
      <td>3314765564758291</td>
      <td>bc1qrp9uar5696atawxacr2nl8udxhaxh2gp4a8d24</td>
      <td>771768</td>
      <td>-0.833</td>
      <td>0.833</td>
      <td>0.0</td>
      <td>0</td>
      <td>1</td>
      <td>1</td>
      <td>00000000000000000000d937e3f040d1c9bf5f8eb7ef9a...</td>
      <td>771779</td>
      <td>2023-01-13 18:44:14+00:00</td>
      <td>False</td>
      <td>0.833</td>
      <td>0.833</td>
      <td>686b4b154841f133f63567595a72d042409846521d29fb...</td>
    </tr>
    <tr>
      <th>2</th>
      <td>2208008327135719</td>
      <td>3BMEXWUNCNxbmNmeTZwxNUQ1w1qL1aSeKP</td>
      <td>514092</td>
      <td>0.048198</td>
      <td>0.0</td>
      <td>0.048198</td>
      <td>0</td>
      <td>0</td>
      <td>1</td>
      <td>000000000000000000087660750ff9a53e52ddbfc52398...</td>
      <td>514092</td>
      <td>2018-03-18 12:28:53+00:00</td>
      <td>True</td>
      <td>0.048198</td>
      <td>0.0</td>
      <td>33f1b3416ce83e65eec2266f193b1ad6a88e3a2c398e3f...</td>
    </tr>
    <tr>
      <th>3</th>
      <td>2208034096940161</td>
      <td>3BMEXWUNCNxbmNmeTZwxNUQ1w1qL1aSeKP</td>
      <td>514092</td>
      <td>0.091339</td>
      <td>0.048198</td>
      <td>0.139537</td>
      <td>0</td>
      <td>0</td>
      <td>2</td>
      <td>000000000000000000237e165afff5d283dde60defa2bc...</td>
      <td>514098</td>
      <td>2018-03-18 13:30:22+00:00</td>
      <td>True</td>
      <td>0.139537</td>
      <td>0.0</td>
      <td>d1d9316dd3596a53e3bec348753e5bead1ee34f40c2616...</td>
    </tr>
    <tr>
      <th>4</th>
      <td>2319488498279914</td>
      <td>3BMEXWUNCNxbmNmeTZwxNUQ1w1qL1aSeKP</td>
      <td>514092</td>
      <td>0.319946</td>
      <td>0.139537</td>
      <td>0.459483</td>
      <td>0</td>
      <td>0</td>
      <td>3</td>
      <td>0000000000000000000696f95e7fc0b9db0050579d45e3...</td>
      <td>540048</td>
      <td>2018-09-05 11:25:23+00:00</td>
      <td>True</td>
      <td>0.459483</td>
      <td>0.0</td>
      <td>c69d83cad7f82db81d0ebdd7527f35f73152bda0838db5...</td>
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
    </tr>
    <tr>
      <th>1255</th>
      <td>2938685343408311</td>
      <td>1DbYUCWL61G1u4ZKvRC6WJWrwzmnQyoLmF</td>
      <td>476005</td>
      <td>-6.9995</td>
      <td>20.9985</td>
      <td>13.999</td>
      <td>0</td>
      <td>580</td>
      <td>582</td>
      <td>0000000000000000000008cb180510f6ac6c3f52ba1fc4...</td>
      <td>684216</td>
      <td>2021-05-19 16:14:14+00:00</td>
      <td>False</td>
      <td>1769.131831</td>
      <td>1755.132831</td>
      <td>34074c4b5c9584edf14cc172ee15d2c3433f3389437eb0...</td>
    </tr>
    <tr>
      <th>1256</th>
      <td>2938685343408402</td>
      <td>1DbYUCWL61G1u4ZKvRC6WJWrwzmnQyoLmF</td>
      <td>476005</td>
      <td>-6.9995</td>
      <td>13.999</td>
      <td>6.9995</td>
      <td>0</td>
      <td>581</td>
      <td>582</td>
      <td>0000000000000000000008cb180510f6ac6c3f52ba1fc4...</td>
      <td>684216</td>
      <td>2021-05-19 16:14:14+00:00</td>
      <td>False</td>
      <td>1769.131831</td>
      <td>1762.132331</td>
      <td>ac02aec09350fcabdf6b3b2b26445fec069a729ae8daf4...</td>
    </tr>
    <tr>
      <th>1257</th>
      <td>2940420510197699</td>
      <td>1DbYUCWL61G1u4ZKvRC6WJWrwzmnQyoLmF</td>
      <td>476005</td>
      <td>-6.9995</td>
      <td>6.9995</td>
      <td>0.0</td>
      <td>0</td>
      <td>582</td>
      <td>582</td>
      <td>000000000000000000091ef19f1ac7e2ada79654729d58...</td>
      <td>684620</td>
      <td>2021-05-23 04:56:37+00:00</td>
      <td>False</td>
      <td>1769.131831</td>
      <td>1769.131831</td>
      <td>9acf957c987b570f42bc5b5752768bae875e18cb3a2de9...</td>
    </tr>
    <tr>
      <th>1258</th>
      <td>3314598061018820</td>
      <td>bc1q3wa78tmkfvpascw3ycfmvuzv4jd58sggqn03fz</td>
      <td>771740</td>
      <td>0.464801</td>
      <td>0.0</td>
      <td>0.464801</td>
      <td>0</td>
      <td>0</td>
      <td>1</td>
      <td>00000000000000000003676c7115f378fe47a8c156d37f...</td>
      <td>771740</td>
      <td>2023-01-13 13:19:19+00:00</td>
      <td>True</td>
      <td>0.464801</td>
      <td>0.0</td>
      <td>6a3e786396c0527b78fc7415d1b1b88efcb9d375c1c09e...</td>
    </tr>
    <tr>
      <th>1259</th>
      <td>3314799924477987</td>
      <td>bc1q3wa78tmkfvpascw3ycfmvuzv4jd58sggqn03fz</td>
      <td>771740</td>
      <td>-0.464801</td>
      <td>0.464801</td>
      <td>0.0</td>
      <td>0</td>
      <td>1</td>
      <td>1</td>
      <td>0000000000000000000486bf641cf101d94f250ad73bb7...</td>
      <td>771787</td>
      <td>2023-01-13 19:41:16+00:00</td>
      <td>False</td>
      <td>0.464801</td>
      <td>0.464801</td>
      <td>4528ef0536de03b3e64c8151b2f2b48eff552e48a7774e...</td>
    </tr>
  </tbody>
</table>
<p>1260 rows × 16 columns</p>
</div>



## Joining the two worlds
To do the reconciliation, we join dataframes from the internal data as well as the ATLAS data to excecute our comparison against.


```python
comparison = internalTx.merge(chainTx, how = 'left', left_on=['chain_tx_id', 'adr'], right_on=['txid', 'account'])
comparison.drop(['credit', 'total_received', 'total_sent', 'chain_sequence_number', 'account_creation_height', 'transaction_sequence_number', 'n_debits', 'n_credits'], axis=1, inplace=True)

comparison
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
      <th>time_internal</th>
      <th>internal_tx_id</th>
      <th>chain_tx_id</th>
      <th>adr</th>
      <th>amt</th>
      <th>asset</th>
      <th>account</th>
      <th>change</th>
      <th>previous_balance</th>
      <th>new_balance</th>
      <th>block_hash</th>
      <th>height</th>
      <th>consensus_time</th>
      <th>txid</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1/13/2023 12:21:41</td>
      <td>n827523572</td>
      <td>0bc35bc7c24d20eafb839b81b17e588806ed67d4192dd1...</td>
      <td>bc1qrp9uar5696atawxacr2nl8udxhaxh2gp4a8d24</td>
      <td>0.833000</td>
      <td>btc</td>
      <td>bc1qrp9uar5696atawxacr2nl8udxhaxh2gp4a8d24</td>
      <td>0.833</td>
      <td>0.0</td>
      <td>0.833</td>
      <td>00000000000000000003018b8b678f5327b697908ffa30...</td>
      <td>771768</td>
      <td>2023-01-13 16:49:20+00:00</td>
      <td>0bc35bc7c24d20eafb839b81b17e588806ed67d4192dd1...</td>
    </tr>
    <tr>
      <th>1</th>
      <td>1/13/2023 12:28:46</td>
      <td>n758675035</td>
      <td>686b4b154841f133f63567595a72d042409846521d29fb...</td>
      <td>bc1qrp9uar5696atawxacr2nl8udxhaxh2gp4a8d24</td>
      <td>-0.833000</td>
      <td>btc</td>
      <td>bc1qrp9uar5696atawxacr2nl8udxhaxh2gp4a8d24</td>
      <td>-0.833</td>
      <td>0.833</td>
      <td>0.0</td>
      <td>00000000000000000000d937e3f040d1c9bf5f8eb7ef9a...</td>
      <td>771779</td>
      <td>2023-01-13 18:44:14+00:00</td>
      <td>686b4b154841f133f63567595a72d042409846521d29fb...</td>
    </tr>
    <tr>
      <th>2</th>
      <td>1/13/2023 12:28:46</td>
      <td>i934602052</td>
      <td>0n4tfebc7c24d20eafb839b81b17e588806ed67d4192dd...</td>
      <td>bc1qrp9uar5696atawxacr2nl8udxhaxh2gp4a8d24</td>
      <td>1.000000</td>
      <td>btc</td>
      <td>&lt;NA&gt;</td>
      <td>&lt;NA&gt;</td>
      <td>&lt;NA&gt;</td>
      <td>&lt;NA&gt;</td>
      <td>&lt;NA&gt;</td>
      <td>&lt;NA&gt;</td>
      <td>NaT</td>
      <td>&lt;NA&gt;</td>
    </tr>
    <tr>
      <th>3</th>
      <td>6/9/2020 10:00:40</td>
      <td>s964830134</td>
      <td>9262ebcd0bd0f3fe7316eb81e8ff3f3e954acbf3f4f3bf...</td>
      <td>3BMEXWUNCNxbmNmeTZwxNUQ1w1qL1aSeKP</td>
      <td>0.035156</td>
      <td>btc</td>
      <td>3BMEXWUNCNxbmNmeTZwxNUQ1w1qL1aSeKP</td>
      <td>0.035156</td>
      <td>0.0215</td>
      <td>0.056656</td>
      <td>000000000000000000072b770768a93ba438dd8e4c78d5...</td>
      <td>633879</td>
      <td>2020-06-09 12:49:19+00:00</td>
      <td>9262ebcd0bd0f3fe7316eb81e8ff3f3e954acbf3f4f3bf...</td>
    </tr>
    <tr>
      <th>4</th>
      <td>4/4/2019 4:05:50</td>
      <td>a810293195</td>
      <td>8153bae0c36d7104665630c46dd53930a14e157caf5f91...</td>
      <td>3D1i7saNYx6DJ9SUN8wUxgoHou7dwEHupy</td>
      <td>0.003034</td>
      <td>btc</td>
      <td>3D1i7saNYx6DJ9SUN8wUxgoHou7dwEHupy</td>
      <td>0.003034</td>
      <td>0.0</td>
      <td>0.003034</td>
      <td>00000000000000000009c73be0c3d652a3a35e1c6606f4...</td>
      <td>570139</td>
      <td>2019-04-04 07:06:19+00:00</td>
      <td>8153bae0c36d7104665630c46dd53930a14e157caf5f91...</td>
    </tr>
    <tr>
      <th>5</th>
      <td>5/19/2021 12:52:35</td>
      <td>a851479635</td>
      <td>f09b5a18c08ee3d6573354bf58b952832c6c0963a092ff...</td>
      <td>1DbYUCWL61G1u4ZKvRC6WJWrwzmnQyoLmF</td>
      <td>6.999500</td>
      <td>btc</td>
      <td>1DbYUCWL61G1u4ZKvRC6WJWrwzmnQyoLmF</td>
      <td>6.9995</td>
      <td>13.999</td>
      <td>20.9985</td>
      <td>00000000000000000008c2d600654cfbe87f4f4252414a...</td>
      <td>684215</td>
      <td>2021-05-19 16:09:39+00:00</td>
      <td>f09b5a18c08ee3d6573354bf58b952832c6c0963a092ff...</td>
    </tr>
    <tr>
      <th>6</th>
      <td>1/13/2023 9:08:05</td>
      <td>g548723842</td>
      <td>6a3e786396c0527b78fc7415d1b1b88efcb9d375c1c09e...</td>
      <td>bc1q3wa78tmkfvpascw3ycfmvuzv4jd58sggqn03fz</td>
      <td>0.464801</td>
      <td>btc</td>
      <td>bc1q3wa78tmkfvpascw3ycfmvuzv4jd58sggqn03fz</td>
      <td>0.464801</td>
      <td>0.0</td>
      <td>0.464801</td>
      <td>00000000000000000003676c7115f378fe47a8c156d37f...</td>
      <td>771740</td>
      <td>2023-01-13 13:19:19+00:00</td>
      <td>6a3e786396c0527b78fc7415d1b1b88efcb9d375c1c09e...</td>
    </tr>
    <tr>
      <th>7</th>
      <td>1/13/2023 15:33:17</td>
      <td>t521047986</td>
      <td>4528ef0536de03b3e64c8151b2f2b48eff552e48a7774e...</td>
      <td>bc1q3wa78tmkfvpascw3ycfmvuzv4jd58sggqn03fz</td>
      <td>-0.564801</td>
      <td>btc</td>
      <td>bc1q3wa78tmkfvpascw3ycfmvuzv4jd58sggqn03fz</td>
      <td>-0.464801</td>
      <td>0.464801</td>
      <td>0.0</td>
      <td>0000000000000000000486bf641cf101d94f250ad73bb7...</td>
      <td>771787</td>
      <td>2023-01-13 19:41:16+00:00</td>
      <td>4528ef0536de03b3e64c8151b2f2b48eff552e48a7774e...</td>
    </tr>
  </tbody>
</table>
</div>



#### Comparison
Next we compare the data from our internal data source to our external data source (ATLAS) to confirm they match and highlight any discrepancies. For this demo we only check to see if the transaction is included in our on-chain data set and calculate the difference between the two. Theoretically, we could also do further comparison to make sure additional data points match, e.g.:
- We could calcualte the running balance and compare that to the balance in ATLAS
- Could ensure source and destination match


```python
comparison['tx_found'] = np.where(comparison['txid'].isnull(), "not found on chain", "found on chain")
comparison['amount_delta'] = comparison['amt'] - comparison['change']
comparison
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
      <th>time_internal</th>
      <th>internal_tx_id</th>
      <th>chain_tx_id</th>
      <th>adr</th>
      <th>amt</th>
      <th>asset</th>
      <th>account</th>
      <th>change</th>
      <th>previous_balance</th>
      <th>new_balance</th>
      <th>block_hash</th>
      <th>height</th>
      <th>consensus_time</th>
      <th>txid</th>
      <th>tx_found</th>
      <th>amount_delta</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1/13/2023 12:21:41</td>
      <td>n827523572</td>
      <td>0bc35bc7c24d20eafb839b81b17e588806ed67d4192dd1...</td>
      <td>bc1qrp9uar5696atawxacr2nl8udxhaxh2gp4a8d24</td>
      <td>0.833000</td>
      <td>btc</td>
      <td>bc1qrp9uar5696atawxacr2nl8udxhaxh2gp4a8d24</td>
      <td>0.833</td>
      <td>0.0</td>
      <td>0.833</td>
      <td>00000000000000000003018b8b678f5327b697908ffa30...</td>
      <td>771768</td>
      <td>2023-01-13 16:49:20+00:00</td>
      <td>0bc35bc7c24d20eafb839b81b17e588806ed67d4192dd1...</td>
      <td>found on chain</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>1</th>
      <td>1/13/2023 12:28:46</td>
      <td>n758675035</td>
      <td>686b4b154841f133f63567595a72d042409846521d29fb...</td>
      <td>bc1qrp9uar5696atawxacr2nl8udxhaxh2gp4a8d24</td>
      <td>-0.833000</td>
      <td>btc</td>
      <td>bc1qrp9uar5696atawxacr2nl8udxhaxh2gp4a8d24</td>
      <td>-0.833</td>
      <td>0.833</td>
      <td>0.0</td>
      <td>00000000000000000000d937e3f040d1c9bf5f8eb7ef9a...</td>
      <td>771779</td>
      <td>2023-01-13 18:44:14+00:00</td>
      <td>686b4b154841f133f63567595a72d042409846521d29fb...</td>
      <td>found on chain</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>2</th>
      <td>1/13/2023 12:28:46</td>
      <td>i934602052</td>
      <td>0n4tfebc7c24d20eafb839b81b17e588806ed67d4192dd...</td>
      <td>bc1qrp9uar5696atawxacr2nl8udxhaxh2gp4a8d24</td>
      <td>1.000000</td>
      <td>btc</td>
      <td>&lt;NA&gt;</td>
      <td>&lt;NA&gt;</td>
      <td>&lt;NA&gt;</td>
      <td>&lt;NA&gt;</td>
      <td>&lt;NA&gt;</td>
      <td>&lt;NA&gt;</td>
      <td>NaT</td>
      <td>&lt;NA&gt;</td>
      <td>not found on chain</td>
      <td>&lt;NA&gt;</td>
    </tr>
    <tr>
      <th>3</th>
      <td>6/9/2020 10:00:40</td>
      <td>s964830134</td>
      <td>9262ebcd0bd0f3fe7316eb81e8ff3f3e954acbf3f4f3bf...</td>
      <td>3BMEXWUNCNxbmNmeTZwxNUQ1w1qL1aSeKP</td>
      <td>0.035156</td>
      <td>btc</td>
      <td>3BMEXWUNCNxbmNmeTZwxNUQ1w1qL1aSeKP</td>
      <td>0.035156</td>
      <td>0.0215</td>
      <td>0.056656</td>
      <td>000000000000000000072b770768a93ba438dd8e4c78d5...</td>
      <td>633879</td>
      <td>2020-06-09 12:49:19+00:00</td>
      <td>9262ebcd0bd0f3fe7316eb81e8ff3f3e954acbf3f4f3bf...</td>
      <td>found on chain</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>4</th>
      <td>4/4/2019 4:05:50</td>
      <td>a810293195</td>
      <td>8153bae0c36d7104665630c46dd53930a14e157caf5f91...</td>
      <td>3D1i7saNYx6DJ9SUN8wUxgoHou7dwEHupy</td>
      <td>0.003034</td>
      <td>btc</td>
      <td>3D1i7saNYx6DJ9SUN8wUxgoHou7dwEHupy</td>
      <td>0.003034</td>
      <td>0.0</td>
      <td>0.003034</td>
      <td>00000000000000000009c73be0c3d652a3a35e1c6606f4...</td>
      <td>570139</td>
      <td>2019-04-04 07:06:19+00:00</td>
      <td>8153bae0c36d7104665630c46dd53930a14e157caf5f91...</td>
      <td>found on chain</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>5</th>
      <td>5/19/2021 12:52:35</td>
      <td>a851479635</td>
      <td>f09b5a18c08ee3d6573354bf58b952832c6c0963a092ff...</td>
      <td>1DbYUCWL61G1u4ZKvRC6WJWrwzmnQyoLmF</td>
      <td>6.999500</td>
      <td>btc</td>
      <td>1DbYUCWL61G1u4ZKvRC6WJWrwzmnQyoLmF</td>
      <td>6.9995</td>
      <td>13.999</td>
      <td>20.9985</td>
      <td>00000000000000000008c2d600654cfbe87f4f4252414a...</td>
      <td>684215</td>
      <td>2021-05-19 16:09:39+00:00</td>
      <td>f09b5a18c08ee3d6573354bf58b952832c6c0963a092ff...</td>
      <td>found on chain</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>6</th>
      <td>1/13/2023 9:08:05</td>
      <td>g548723842</td>
      <td>6a3e786396c0527b78fc7415d1b1b88efcb9d375c1c09e...</td>
      <td>bc1q3wa78tmkfvpascw3ycfmvuzv4jd58sggqn03fz</td>
      <td>0.464801</td>
      <td>btc</td>
      <td>bc1q3wa78tmkfvpascw3ycfmvuzv4jd58sggqn03fz</td>
      <td>0.464801</td>
      <td>0.0</td>
      <td>0.464801</td>
      <td>00000000000000000003676c7115f378fe47a8c156d37f...</td>
      <td>771740</td>
      <td>2023-01-13 13:19:19+00:00</td>
      <td>6a3e786396c0527b78fc7415d1b1b88efcb9d375c1c09e...</td>
      <td>found on chain</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>7</th>
      <td>1/13/2023 15:33:17</td>
      <td>t521047986</td>
      <td>4528ef0536de03b3e64c8151b2f2b48eff552e48a7774e...</td>
      <td>bc1q3wa78tmkfvpascw3ycfmvuzv4jd58sggqn03fz</td>
      <td>-0.564801</td>
      <td>btc</td>
      <td>bc1q3wa78tmkfvpascw3ycfmvuzv4jd58sggqn03fz</td>
      <td>-0.464801</td>
      <td>0.464801</td>
      <td>0.0</td>
      <td>0000000000000000000486bf641cf101d94f250ad73bb7...</td>
      <td>771787</td>
      <td>2023-01-13 19:41:16+00:00</td>
      <td>4528ef0536de03b3e64c8151b2f2b48eff552e48a7774e...</td>
      <td>found on chain</td>
      <td>-0.1</td>
    </tr>
  </tbody>
</table>
</div>




```python
categories = comparison['tx_found'].value_counts().plot(kind='bar')
plt.title('\nTransaction Count by Status\n',fontdict={'fontsize':20,'font':'Lato'})
plt.ylabel("Number of Transactions\n",fontdict={'fontsize':13.5})
plt.grid(True, axis='y',linestyle='--',alpha=0.3)
plt.setp(categories.get_xticklabels(), rotation=25);
```

    2024-09-11 15:34:06 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:34:06 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:34:06 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:34:06 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:34:06 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:34:06 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:34:06 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:34:06 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:34:06 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:34:06 WARNING  findfont: Font family 'Lato' not found.



    
![png](output_15_10.png)
    

