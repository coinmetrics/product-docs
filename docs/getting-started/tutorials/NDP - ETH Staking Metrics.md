<img src="https://5264302.fs1.hubspotusercontent-na1.net/hubfs/5264302/Demo%20Asset%20Resources/Demo%20Covers/CM-Demo-eth_staking_metrics-Cover.png" width=1100 margin-left='auto' margin-right='auto'/>

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
import warnings
%matplotlib inline
```


```python
# Chart themes
sns.set_theme()
warnings.filterwarnings('ignore')
fig = plt.style.use('seaborn')
sns.set(rc={'figure.figsize':(14,9)})
sns.set_style("whitegrid",{'axes.grid' : True,'grid.linestyle': '--', 'grid.color': 'gray','axes.edgecolor': 'white','font.family': ['Lato']})
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

    2024-09-12 08:27:02 INFO     Using API key found in environment


# Calculate Estimated Validator Yield

Using ETH_CL validator metrics it is possible to estimate the yield from the protocol. In combination with historical data on priority tips, we can estimate what a validator should expect to earn. Note that maximal extractable value (MEV) is another source of revenue for validators but is currently not considered as part of this analysis.

A validator’s expected annual percentage return (APR) from staking rewards accumulated on the Consensus Layer, assuming perfect performance and uptime, can be estimated with the formula below (where ValidatorActOngCnt = number of active validators):

 > 2940.21 ÷ sqrt(ValidatorActOngCnt) = Staking Yield



```python
start = '2022-01-01'
```

### Retrieve Consensus Layer Metrics


```python
consensus_metrics = client.get_asset_metrics(
    assets='eth_cl',
    metrics=['ValidatorActOngCnt'],
    start_time = start,
).to_dataframe()
```


```python
consensus_metrics['time'] = pd.to_datetime(consensus_metrics['time'])
```


```python
consensus_metrics
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
      <th>ValidatorActOngCnt</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>eth_cl</td>
      <td>2022-01-01 00:00:00+00:00</td>
      <td>275880</td>
    </tr>
    <tr>
      <th>1</th>
      <td>eth_cl</td>
      <td>2022-01-02 00:00:00+00:00</td>
      <td>276301</td>
    </tr>
    <tr>
      <th>2</th>
      <td>eth_cl</td>
      <td>2022-01-03 00:00:00+00:00</td>
      <td>276784</td>
    </tr>
    <tr>
      <th>3</th>
      <td>eth_cl</td>
      <td>2022-01-04 00:00:00+00:00</td>
      <td>277530</td>
    </tr>
    <tr>
      <th>4</th>
      <td>eth_cl</td>
      <td>2022-01-05 00:00:00+00:00</td>
      <td>278349</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>980</th>
      <td>eth_cl</td>
      <td>2024-09-07 00:00:00+00:00</td>
      <td>1070495</td>
    </tr>
    <tr>
      <th>981</th>
      <td>eth_cl</td>
      <td>2024-09-08 00:00:00+00:00</td>
      <td>1070031</td>
    </tr>
    <tr>
      <th>982</th>
      <td>eth_cl</td>
      <td>2024-09-09 00:00:00+00:00</td>
      <td>1068924</td>
    </tr>
    <tr>
      <th>983</th>
      <td>eth_cl</td>
      <td>2024-09-10 00:00:00+00:00</td>
      <td>1068727</td>
    </tr>
    <tr>
      <th>984</th>
      <td>eth_cl</td>
      <td>2024-09-11 00:00:00+00:00</td>
      <td>1068670</td>
    </tr>
  </tbody>
</table>
<p>985 rows × 3 columns</p>
</div>



Rewards from staking are only one part of a validator’s yield. Post-Merge, validators now also receive user transaction priority fees, or tips, that used to go to miners on the Execution Layer. Considering the historical record of fees, we can estimate the magnitude of this additional source of yield. For our analysis, we show how to estimate both staking revenues and priority tips as yields on staked ETH.

To do this, we use the results we found above and divide gross annual emission by the total number of validators to produce average validator revenue, which for this purpose only consider revenues that originate from the protocol and not from fees.

 >940.87 × sqrt(ValidatorActOngCnt) ÷ ValidatorActOngCnt = Avg. Validator Revenue
                 
The expected annual number of blocks proposed in turn allows us to estimate the priority tip that is earned by each block proposal. Using a 14-day moving average to smooth priority tips, we then estimate what a proposer should expect to earn in tips.

   > 1 ÷ ValidatorActOngCnt × 2,629,800 = Annual Num. of      
                                      Proposals per  Validator

   > sma(FeePrioTotNtv ÷ BlkCnt, 14)
       × Ann. Num. of Proposals per Validator
                                      = Average Priority Tip 
                                             per Block

### Retrieve Execution Layer Metrics


```python
execution_metrics = client.get_asset_metrics(
    assets='eth',
    metrics=['FeePrioTotNtv', 'BlkCnt'],
    start_time = start,
).to_dataframe()
```


```python
execution_metrics['time'] = pd.to_datetime(execution_metrics['time'])
```


```python
execution_metrics
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
      <th>BlkCnt</th>
      <th>FeePrioTotNtv</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>eth</td>
      <td>2022-01-01 00:00:00+00:00</td>
      <td>6506</td>
      <td>747.204977</td>
    </tr>
    <tr>
      <th>1</th>
      <td>eth</td>
      <td>2022-01-02 00:00:00+00:00</td>
      <td>6495</td>
      <td>905.938725</td>
    </tr>
    <tr>
      <th>2</th>
      <td>eth</td>
      <td>2022-01-03 00:00:00+00:00</td>
      <td>6461</td>
      <td>898.990928</td>
    </tr>
    <tr>
      <th>3</th>
      <td>eth</td>
      <td>2022-01-04 00:00:00+00:00</td>
      <td>6494</td>
      <td>1245.74813</td>
    </tr>
    <tr>
      <th>4</th>
      <td>eth</td>
      <td>2022-01-05 00:00:00+00:00</td>
      <td>6460</td>
      <td>1485.351677</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>980</th>
      <td>eth</td>
      <td>2024-09-07 00:00:00+00:00</td>
      <td>7179</td>
      <td>323.894622</td>
    </tr>
    <tr>
      <th>981</th>
      <td>eth</td>
      <td>2024-09-08 00:00:00+00:00</td>
      <td>7159</td>
      <td>209.683444</td>
    </tr>
    <tr>
      <th>982</th>
      <td>eth</td>
      <td>2024-09-09 00:00:00+00:00</td>
      <td>7168</td>
      <td>423.488956</td>
    </tr>
    <tr>
      <th>983</th>
      <td>eth</td>
      <td>2024-09-10 00:00:00+00:00</td>
      <td>7152</td>
      <td>487.742792</td>
    </tr>
    <tr>
      <th>984</th>
      <td>eth</td>
      <td>2024-09-11 00:00:00+00:00</td>
      <td>7162</td>
      <td>349.133171</td>
    </tr>
  </tbody>
</table>
<p>985 rows × 4 columns</p>
</div>




```python
eth_metrics = consensus_metrics.merge(execution_metrics, on='time', how='inner')
```


```python
eth_metrics = eth_metrics[['time','ValidatorActOngCnt','BlkCnt','FeePrioTotNtv']]
```

### Calculate theoretical validator yield based on Active Validator count


```python
eth_metrics['Validator Yield'] = 100 * (
    (32 + ((940.87 * (eth_metrics['ValidatorActOngCnt'] ** (1/2))) / eth_metrics['ValidatorActOngCnt']))/32 - 1
)
eth_metrics
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
      <th>ValidatorActOngCnt</th>
      <th>BlkCnt</th>
      <th>FeePrioTotNtv</th>
      <th>Validator Yield</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>2022-01-01 00:00:00+00:00</td>
      <td>275880</td>
      <td>6506</td>
      <td>747.204977</td>
      <td>5.597828</td>
    </tr>
    <tr>
      <th>1</th>
      <td>2022-01-02 00:00:00+00:00</td>
      <td>276301</td>
      <td>6495</td>
      <td>905.938725</td>
      <td>5.593561</td>
    </tr>
    <tr>
      <th>2</th>
      <td>2022-01-03 00:00:00+00:00</td>
      <td>276784</td>
      <td>6461</td>
      <td>898.990928</td>
      <td>5.588679</td>
    </tr>
    <tr>
      <th>3</th>
      <td>2022-01-04 00:00:00+00:00</td>
      <td>277530</td>
      <td>6494</td>
      <td>1245.74813</td>
      <td>5.581163</td>
    </tr>
    <tr>
      <th>4</th>
      <td>2022-01-05 00:00:00+00:00</td>
      <td>278349</td>
      <td>6460</td>
      <td>1485.351677</td>
      <td>5.572946</td>
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
      <th>980</th>
      <td>2024-09-07 00:00:00+00:00</td>
      <td>1070495</td>
      <td>7179</td>
      <td>323.894622</td>
      <td>2.84176</td>
    </tr>
    <tr>
      <th>981</th>
      <td>2024-09-08 00:00:00+00:00</td>
      <td>1070031</td>
      <td>7159</td>
      <td>209.683444</td>
      <td>2.842376</td>
    </tr>
    <tr>
      <th>982</th>
      <td>2024-09-09 00:00:00+00:00</td>
      <td>1068924</td>
      <td>7168</td>
      <td>423.488956</td>
      <td>2.843847</td>
    </tr>
    <tr>
      <th>983</th>
      <td>2024-09-10 00:00:00+00:00</td>
      <td>1068727</td>
      <td>7152</td>
      <td>487.742792</td>
      <td>2.844109</td>
    </tr>
    <tr>
      <th>984</th>
      <td>2024-09-11 00:00:00+00:00</td>
      <td>1068670</td>
      <td>7162</td>
      <td>349.133171</td>
      <td>2.844185</td>
    </tr>
  </tbody>
</table>
<p>985 rows × 5 columns</p>
</div>



### Calculate estimated blocks proposals per year based on Active Validator count


```python
eth_metrics['est_block_proposals_per_yr'] = ((1/eth_metrics['ValidatorActOngCnt']) * (2629800))
```

### Estimate tips per block


```python
eth_metrics['avg_per_block_tip_2w'] = (eth_metrics['FeePrioTotNtv'] / eth_metrics['BlkCnt']).rolling(window=14).mean()
```


```python
eth_metrics
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
      <th>ValidatorActOngCnt</th>
      <th>BlkCnt</th>
      <th>FeePrioTotNtv</th>
      <th>Validator Yield</th>
      <th>est_block_proposals_per_yr</th>
      <th>avg_per_block_tip_2w</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>2022-01-01 00:00:00+00:00</td>
      <td>275880</td>
      <td>6506</td>
      <td>747.204977</td>
      <td>5.597828</td>
      <td>9.532405</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>1</th>
      <td>2022-01-02 00:00:00+00:00</td>
      <td>276301</td>
      <td>6495</td>
      <td>905.938725</td>
      <td>5.593561</td>
      <td>9.517881</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>2</th>
      <td>2022-01-03 00:00:00+00:00</td>
      <td>276784</td>
      <td>6461</td>
      <td>898.990928</td>
      <td>5.588679</td>
      <td>9.501272</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>3</th>
      <td>2022-01-04 00:00:00+00:00</td>
      <td>277530</td>
      <td>6494</td>
      <td>1245.74813</td>
      <td>5.581163</td>
      <td>9.475732</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>4</th>
      <td>2022-01-05 00:00:00+00:00</td>
      <td>278349</td>
      <td>6460</td>
      <td>1485.351677</td>
      <td>5.572946</td>
      <td>9.447851</td>
      <td>NaN</td>
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
    </tr>
    <tr>
      <th>980</th>
      <td>2024-09-07 00:00:00+00:00</td>
      <td>1070495</td>
      <td>7179</td>
      <td>323.894622</td>
      <td>2.84176</td>
      <td>2.456621</td>
      <td>0.039804</td>
    </tr>
    <tr>
      <th>981</th>
      <td>2024-09-08 00:00:00+00:00</td>
      <td>1070031</td>
      <td>7159</td>
      <td>209.683444</td>
      <td>2.842376</td>
      <td>2.457686</td>
      <td>0.040130</td>
    </tr>
    <tr>
      <th>982</th>
      <td>2024-09-09 00:00:00+00:00</td>
      <td>1068924</td>
      <td>7168</td>
      <td>423.488956</td>
      <td>2.843847</td>
      <td>2.460231</td>
      <td>0.042128</td>
    </tr>
    <tr>
      <th>983</th>
      <td>2024-09-10 00:00:00+00:00</td>
      <td>1068727</td>
      <td>7152</td>
      <td>487.742792</td>
      <td>2.844109</td>
      <td>2.460685</td>
      <td>0.044301</td>
    </tr>
    <tr>
      <th>984</th>
      <td>2024-09-11 00:00:00+00:00</td>
      <td>1068670</td>
      <td>7162</td>
      <td>349.133171</td>
      <td>2.844185</td>
      <td>2.460816</td>
      <td>0.045128</td>
    </tr>
  </tbody>
</table>
<p>985 rows × 7 columns</p>
</div>



### Calculate priority tip yield


```python
eth_metrics['Priority Tip Yield'] = (100 *
    ((32 + eth_metrics['avg_per_block_tip_2w'] * eth_metrics['est_block_proposals_per_yr'])/32+(-1)))
```


```python
eth_metrics = eth_metrics.dropna().set_index('time')
```


```python
ax = eth_metrics[['Validator Yield', 'Priority Tip Yield']].plot.area(stacked=True, figsize=(14, 8),color=['orange', 'red'])
ax.set_ylabel('Yield (%)')
ax.set_xlabel('')
ax.set_title('\nETH Staking \nEstimated Yield',fontsize=18)
plt.legend(loc='upper right', bbox_to_anchor=(1, 1.11))
plt.show()
```

    2024-09-12 08:27:04 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:04 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:04 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:04 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:04 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:04 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:04 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:04 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:04 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:04 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:04 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:04 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:04 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:04 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:04 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:04 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:04 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:04 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:04 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:04 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:04 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:04 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:04 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:04 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:04 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:04 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:04 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:04 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:04 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:04 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:04 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:04 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:04 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:05 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:05 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:05 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:05 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:05 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:05 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:05 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:05 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:05 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:05 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:05 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:05 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:05 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:05 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:05 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:05 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:05 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:05 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:05 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:05 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:05 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:05 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:05 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:05 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:05 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:05 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:05 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:05 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:05 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:05 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:05 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:05 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:05 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:05 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:05 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:05 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:05 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:05 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:05 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:05 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:05 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:05 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:05 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:05 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:05 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:05 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:05 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:05 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:05 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:05 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:05 WARNING  findfont: Font family 'Lato' not found.



    
![png](output_31_84.png)
    


# Calculate ETH Supply: Staked vs. Unstaked

One of the many advantages of a blockchain-based ledger is auditability, but increasingly complex consensus architectures and supply mechanics can make it difficult to understand the full picture of asset supply. Ethereum's shift to proof-of-stake introduced a number of novel considerations in obtaining network-wide supply figures. In the following example, we combine various Supply metrics from ETH's Consensus and Execution Layers to ascertain the total amount of staked vs. unstaked supply.


```python
start = '2022-01-01'
```

### Consensus Layer Metrics


```python
cl_supply = client.get_asset_metrics(
    assets='eth_cl',
    metrics=['SplyCur','SplyStkedNtv'],
    start_time = start,
    frequency = '1d'
).to_dataframe()

cl_supply = cl_supply.rename(columns={"SplyCur": "SplyCur_CL"})
```

### Execution Layer Metrics


```python
el_supply = client.get_asset_metrics(
    assets='eth',
    metrics=['SplyCur','SplyCLCont'],
    start_time = start,
    frequency = '1d'
).to_dataframe()

el_supply = el_supply.rename(columns={"SplyCur": "SplyCur_EL"})
```


```python
adjusted_supply = cl_supply.merge(el_supply, on='time', how='inner')
adjusted_supply = adjusted_supply.set_index('time')
```


```python
adjusted_supply = adjusted_supply[['SplyCur_EL','SplyCur_CL','SplyCLCont','SplyStkedNtv']]
```

### Calculate the total 'adjusted' ETH supply 


```python
adjusted_supply['Total ETH Supply'] = adjusted_supply['SplyCur_EL'] + (adjusted_supply['SplyCur_CL'] - adjusted_supply['SplyCLCont'])
```


```python
adjusted_supply['Staked Supply'] = adjusted_supply['SplyStkedNtv']
```


```python
adjusted_supply['Unstaked Supply'] = adjusted_supply['Total ETH Supply'] - adjusted_supply['Staked Supply'] 
```


```python
adjusted_supply
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
      <th>SplyCur_EL</th>
      <th>SplyCur_CL</th>
      <th>SplyCLCont</th>
      <th>SplyStkedNtv</th>
      <th>Total ETH Supply</th>
      <th>Staked Supply</th>
      <th>Unstaked Supply</th>
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
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2022-01-01 00:00:00+00:00</th>
      <td>118049177.834937</td>
      <td>9227820.793013</td>
      <td>8852770.0</td>
      <td>8828515</td>
      <td>118424228.62795</td>
      <td>8828515</td>
      <td>109595713.62795</td>
    </tr>
    <tr>
      <th>2022-01-02 00:00:00+00:00</th>
      <td>118054804.893592</td>
      <td>9242509.802432</td>
      <td>8866898.0</td>
      <td>8841891</td>
      <td>118430416.696023</td>
      <td>8841891</td>
      <td>109588525.696023</td>
    </tr>
    <tr>
      <th>2022-01-03 00:00:00+00:00</th>
      <td>118060102.632049</td>
      <td>9264680.84189</td>
      <td>8887122.0</td>
      <td>8862723</td>
      <td>118437661.47394</td>
      <td>8862723</td>
      <td>109574938.47394</td>
    </tr>
    <tr>
      <th>2022-01-04 00:00:00+00:00</th>
      <td>118063057.343795</td>
      <td>9286929.282994</td>
      <td>8915506.0</td>
      <td>8883635</td>
      <td>118434480.626789</td>
      <td>8883635</td>
      <td>109550845.626789</td>
    </tr>
    <tr>
      <th>2022-01-05 00:00:00+00:00</th>
      <td>118064691.965118</td>
      <td>9311811.478199</td>
      <td>8931074.0</td>
      <td>8907187</td>
      <td>118445429.443318</td>
      <td>8907187</td>
      <td>109538242.443318</td>
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
    </tr>
    <tr>
      <th>2024-09-07 00:00:00+00:00</th>
      <td>120332865.98932</td>
      <td>34443814.448808</td>
      <td>50339408.440898</td>
      <td>34255462</td>
      <td>104437271.99723</td>
      <td>34255462</td>
      <td>70181809.99723</td>
    </tr>
    <tr>
      <th>2024-09-08 00:00:00+00:00</th>
      <td>120335341.426537</td>
      <td>34435042.84994</td>
      <td>50354544.440898</td>
      <td>34240844</td>
      <td>104415839.835578</td>
      <td>34240844</td>
      <td>70174995.835578</td>
    </tr>
    <tr>
      <th>2024-09-09 00:00:00+00:00</th>
      <td>120337467.592792</td>
      <td>34433496.725007</td>
      <td>50379659.443772</td>
      <td>34205252</td>
      <td>104391304.874028</td>
      <td>34205252</td>
      <td>70186052.874028</td>
    </tr>
    <tr>
      <th>2024-09-10 00:00:00+00:00</th>
      <td>120339497.187608</td>
      <td>34429215.500872</td>
      <td>50391738.443772</td>
      <td>34201022</td>
      <td>104376974.244708</td>
      <td>34201022</td>
      <td>70175952.244708</td>
    </tr>
    <tr>
      <th>2024-09-11 00:00:00+00:00</th>
      <td>120341799.159879</td>
      <td>34426429.794917</td>
      <td>50498640.443772</td>
      <td>34197053</td>
      <td>104269588.511024</td>
      <td>34197053</td>
      <td>70072535.511024</td>
    </tr>
  </tbody>
</table>
<p>985 rows × 7 columns</p>
</div>



### Plot staked vs. unstaked supply


```python
ax = adjusted_supply[['Staked Supply', 'Unstaked Supply']].plot.area(stacked=True, figsize=(14, 8),color=['pink', 'purple'])
ax.set_ylabel('')
ax.set_xlabel('')
ax.set_title('\nETH Staked vs. Unstaked Supply\n',fontsize=18)
ax.yaxis.set_major_formatter(lambda x, _: f'{x*1e-6}M')
plt.legend(loc='upper right', bbox_to_anchor=(1, 1.11))
plt.show()
```

    2024-09-12 08:27:07 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:07 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:07 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:07 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:07 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:07 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:07 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:07 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:07 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:07 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:07 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:07 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:07 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:07 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:07 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:07 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:07 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:07 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:07 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:07 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:07 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:07 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:07 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:07 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:07 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:07 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:07 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:07 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:07 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:07 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:07 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:07 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:07 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:07 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:07 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:07 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:07 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:07 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:07 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:07 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:07 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:07 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:07 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:07 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:07 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:07 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:07 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:07 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:07 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:07 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:07 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:07 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:07 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:07 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:07 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:07 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:07 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:07 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:07 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:07 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:07 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:07 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:07 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:07 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:07 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:07 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:07 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:07 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:07 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:07 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:07 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:07 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:07 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:07 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:07 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:07 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:07 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:07 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:07 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:07 WARNING  findfont: Font family 'Lato' not found.


    2024-09-12 08:27:07 WARNING  findfont: Font family 'Lato' not found.



    
![png](output_47_81.png)
    

