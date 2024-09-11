<img src="https://5264302.fs1.hubspotusercontent-na1.net/hubfs/5264302/Demo%20Asset%20Resources/CM-Demo-balance_sheets-Cover.png" width=1100 margin-left='auto' margin-right='auto'/>

Decentralized Finance (DeFi) is a rapidly emerging ecosystem of applications and protocols used for trading, lending, and various other financial services. Rather than relying on centralized intermediaries, these protocols utilize permissionless blockchains such as Ethereum to conduct the majority of their activities and transactions on-chain. While these protocols offer an unprecedented level of transparency, complex smart contract code and overlapping on-chain transactions can be difficult to interpret. Coin Metrics **DeFi Balance Sheets** endpoint attempts to distill these operations into a traditional accounting format, presenting protocol assets and liabilities in an intuitive, easy-to-understand schema.

## Resources
This notebook demonstrates basic functionality offered by the Coin Metrics Python API Client.

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
import seaborn as sns
import logging
from datetime import date, datetime, timedelta
from coinmetrics.api_client import CoinMetricsClient
import json
import logging
from pytz import timezone as timezone_conv
from datetime import timezone as timezone_info
import matplotlib.dates as mdates
from IPython.display import Markdown as md
import matplotlib.pyplot as plt
import requests
import locale
import ast
%matplotlib inline
```


```python
sns.set_theme()
sns.set(rc={'figure.figsize':(12,8)})
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

    2024-09-10 17:11:49 INFO     Using API key found in environment


# Retrieve Balance Sheet


```python
days = 365
protocol = 'aave_v2_eth'
```


```python
data = requests.get('https://api.coinmetrics.io/v4/timeseries/defi-balance-sheets?defi_protocols=' + protocol + '&api_key=' + api_key + '&pretty=true&page_size=' + str(days))
```


```python
jsondata = data.json()
df_balsheet = pd.DataFrame.from_dict(jsondata['data'])
df_balsheet.tail()
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
      <th>defi_protocol</th>
      <th>block_height</th>
      <th>time</th>
      <th>assets_total_usd</th>
      <th>assets_total_count</th>
      <th>liabilities_total_usd</th>
      <th>liabilities_total_count</th>
      <th>loans_lent_total_usd</th>
      <th>tvl_total_usd</th>
      <th>net_working_capital_usd</th>
      <th>assets</th>
      <th>liabilities</th>
      <th>protocol_utilization_ratio</th>
      <th>liquid_supply_ratio</th>
      <th>current_ratio</th>
      <th>debt_to_assets_ratio</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>360</th>
      <td>aave_v2_eth</td>
      <td>20687830</td>
      <td>2024-09-06T00:00:00.000000000Z</td>
      <td>1382424131.9437</td>
      <td>49</td>
      <td>1382712366.4407</td>
      <td>49</td>
      <td>401176253.6857</td>
      <td>981247878.258</td>
      <td>-401464488.1827</td>
      <td>[{'asset': '1inch', 'total_units': '56579.0583...</td>
      <td>[{'asset': '1inch', 'total_units': '56196.8786...</td>
      <td>0.290138</td>
      <td>0.709655</td>
      <td>0.709655</td>
      <td>1.000209</td>
    </tr>
    <tr>
      <th>361</th>
      <td>aave_v2_eth</td>
      <td>20694991</td>
      <td>2024-09-07T00:00:00.000000000Z</td>
      <td>1297488503.5701</td>
      <td>49</td>
      <td>1297720840.4547</td>
      <td>49</td>
      <td>379597144.0159</td>
      <td>917891359.5542</td>
      <td>-379829480.9005</td>
      <td>[{'asset': '1inch', 'total_units': '56579.7269...</td>
      <td>[{'asset': '1inch', 'total_units': '56196.8787...</td>
      <td>0.292511</td>
      <td>0.707311</td>
      <td>0.707311</td>
      <td>1.00018</td>
    </tr>
    <tr>
      <th>362</th>
      <td>aave_v2_eth</td>
      <td>20702170</td>
      <td>2024-09-08T00:00:00.000000000Z</td>
      <td>1300985579.5729</td>
      <td>49</td>
      <td>1301234243.9899</td>
      <td>49</td>
      <td>379393083.7159</td>
      <td>921592495.857</td>
      <td>-379641748.1329</td>
      <td>[{'asset': '1inch', 'total_units': '56580.3958...</td>
      <td>[{'asset': '1inch', 'total_units': '56196.8787...</td>
      <td>0.291565</td>
      <td>0.708245</td>
      <td>0.708245</td>
      <td>1.000192</td>
    </tr>
    <tr>
      <th>363</th>
      <td>aave_v2_eth</td>
      <td>20709329</td>
      <td>2024-09-09T00:00:00.000000000Z</td>
      <td>1314125430.1564</td>
      <td>49</td>
      <td>1314397586.1761</td>
      <td>49</td>
      <td>380735859.0122</td>
      <td>933389571.1442</td>
      <td>-381008015.0319</td>
      <td>[{'asset': '1inch', 'total_units': '56581.0156...</td>
      <td>[{'asset': '1inch', 'total_units': '56206.2806...</td>
      <td>0.289666</td>
      <td>0.710128</td>
      <td>0.710128</td>
      <td>1.000208</td>
    </tr>
    <tr>
      <th>364</th>
      <td>aave_v2_eth</td>
      <td>20716497</td>
      <td>2024-09-10T00:00:00.000000000Z</td>
      <td>1343205862.2417</td>
      <td>49</td>
      <td>1343487687.7738</td>
      <td>49</td>
      <td>384916164.1788</td>
      <td>958289698.0629</td>
      <td>-385197989.7109</td>
      <td>[{'asset': '1inch', 'total_units': '56581.6339...</td>
      <td>[{'asset': '1inch', 'total_units': '56206.2807...</td>
      <td>0.286506</td>
      <td>0.713286</td>
      <td>0.713286</td>
      <td>1.00021</td>
    </tr>
  </tbody>
</table>
</div>




```python
last_row = pd.DataFrame(df_balsheet.sort_values(by='time',ascending=False).iloc[0])
last_row
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
      <th>364</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>defi_protocol</th>
      <td>aave_v2_eth</td>
    </tr>
    <tr>
      <th>block_height</th>
      <td>20716497</td>
    </tr>
    <tr>
      <th>time</th>
      <td>2024-09-10T00:00:00.000000000Z</td>
    </tr>
    <tr>
      <th>assets_total_usd</th>
      <td>1343205862.2417</td>
    </tr>
    <tr>
      <th>assets_total_count</th>
      <td>49</td>
    </tr>
    <tr>
      <th>liabilities_total_usd</th>
      <td>1343487687.7738</td>
    </tr>
    <tr>
      <th>liabilities_total_count</th>
      <td>49</td>
    </tr>
    <tr>
      <th>loans_lent_total_usd</th>
      <td>384916164.1788</td>
    </tr>
    <tr>
      <th>tvl_total_usd</th>
      <td>958289698.0629</td>
    </tr>
    <tr>
      <th>net_working_capital_usd</th>
      <td>-385197989.7109</td>
    </tr>
    <tr>
      <th>assets</th>
      <td>[{'asset': '1inch', 'total_units': '56581.6339...</td>
    </tr>
    <tr>
      <th>liabilities</th>
      <td>[{'asset': '1inch', 'total_units': '56206.2807...</td>
    </tr>
    <tr>
      <th>protocol_utilization_ratio</th>
      <td>0.286506</td>
    </tr>
    <tr>
      <th>liquid_supply_ratio</th>
      <td>0.713286</td>
    </tr>
    <tr>
      <th>current_ratio</th>
      <td>0.713286</td>
    </tr>
    <tr>
      <th>debt_to_assets_ratio</th>
      <td>1.00021</td>
    </tr>
  </tbody>
</table>
</div>




```python
assets = last_row.loc["assets"].astype("str")
assets = assets.apply(lambda x: ast.literal_eval(x))
assets = assets.apply(pd.Series)
assets = assets.transpose()
assets = pd.json_normalize(assets[days-1])
assets = assets.set_index('asset').astype(float).sort_values('tvl_usd', ascending=False)
assets
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
      <th>total_units</th>
      <th>loans_lent_units</th>
      <th>tvl_units</th>
      <th>total_usd</th>
      <th>loans_lent_usd</th>
      <th>tvl_usd</th>
      <th>total_share</th>
      <th>loans_lent_share</th>
      <th>tvl_share</th>
    </tr>
    <tr>
      <th>asset</th>
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
      <th>steth_lido</th>
      <td>1.544842e+05</td>
      <td>NaN</td>
      <td>1.544842e+05</td>
      <td>3.646769e+08</td>
      <td>NaN</td>
      <td>3.646769e+08</td>
      <td>0.271497</td>
      <td>NaN</td>
      <td>0.380550</td>
    </tr>
    <tr>
      <th>wbtc</th>
      <td>5.607640e+03</td>
      <td>5.956348e+02</td>
      <td>5.012006e+03</td>
      <td>3.200300e+08</td>
      <td>3.399308e+07</td>
      <td>2.860369e+08</td>
      <td>0.238258</td>
      <td>0.088313</td>
      <td>0.298487</td>
    </tr>
    <tr>
      <th>weth</th>
      <td>1.309178e+05</td>
      <td>4.049727e+04</td>
      <td>9.042053e+04</td>
      <td>3.092333e+08</td>
      <td>9.565626e+07</td>
      <td>2.135771e+08</td>
      <td>0.230220</td>
      <td>0.248512</td>
      <td>0.222873</td>
    </tr>
    <tr>
      <th>usdc</th>
      <td>1.578942e+08</td>
      <td>1.255623e+08</td>
      <td>3.233186e+07</td>
      <td>1.578740e+08</td>
      <td>1.255463e+08</td>
      <td>3.232774e+07</td>
      <td>0.117535</td>
      <td>0.326165</td>
      <td>0.033735</td>
    </tr>
    <tr>
      <th>usdt_eth</th>
      <td>1.125183e+08</td>
      <td>8.979090e+07</td>
      <td>2.272739e+07</td>
      <td>1.125322e+08</td>
      <td>8.980202e+07</td>
      <td>2.273021e+07</td>
      <td>0.083779</td>
      <td>0.233303</td>
      <td>0.023720</td>
    </tr>
    <tr>
      <th>link</th>
      <td>1.485303e+06</td>
      <td>5.493095e+04</td>
      <td>1.430372e+06</td>
      <td>1.568700e+07</td>
      <td>5.801524e+05</td>
      <td>1.510685e+07</td>
      <td>0.011679</td>
      <td>0.001507</td>
      <td>0.015764</td>
    </tr>
    <tr>
      <th>dai</th>
      <td>4.714478e+07</td>
      <td>3.780653e+07</td>
      <td>9.338250e+06</td>
      <td>4.727034e+07</td>
      <td>3.790722e+07</td>
      <td>9.363120e+06</td>
      <td>0.035192</td>
      <td>0.098482</td>
      <td>0.009771</td>
    </tr>
    <tr>
      <th>aave</th>
      <td>4.823621e+04</td>
      <td>NaN</td>
      <td>4.823621e+04</td>
      <td>6.776782e+06</td>
      <td>NaN</td>
      <td>6.776782e+06</td>
      <td>0.005045</td>
      <td>NaN</td>
      <td>0.007072</td>
    </tr>
    <tr>
      <th>mkr</th>
      <td>1.280607e+03</td>
      <td>1.054425e+00</td>
      <td>1.279553e+03</td>
      <td>2.064447e+06</td>
      <td>1.699822e+03</td>
      <td>2.062747e+06</td>
      <td>0.001537</td>
      <td>0.000004</td>
      <td>0.002153</td>
    </tr>
    <tr>
      <th>crv</th>
      <td>2.571759e+06</td>
      <td>7.745559e+03</td>
      <td>2.564013e+06</td>
      <td>7.263996e+05</td>
      <td>2.187752e+03</td>
      <td>7.242118e+05</td>
      <td>0.000541</td>
      <td>0.000006</td>
      <td>0.000756</td>
    </tr>
    <tr>
      <th>snx</th>
      <td>4.279797e+05</td>
      <td>2.604203e+03</td>
      <td>4.253755e+05</td>
      <td>5.786993e+05</td>
      <td>3.521313e+03</td>
      <td>5.751780e+05</td>
      <td>0.000431</td>
      <td>0.000009</td>
      <td>0.000600</td>
    </tr>
    <tr>
      <th>busd</th>
      <td>7.889400e+05</td>
      <td>2.137331e+05</td>
      <td>5.752069e+05</td>
      <td>7.872806e+05</td>
      <td>2.132835e+05</td>
      <td>5.739971e+05</td>
      <td>0.000586</td>
      <td>0.000554</td>
      <td>0.000599</td>
    </tr>
    <tr>
      <th>uni</th>
      <td>8.227386e+04</td>
      <td>2.832766e+03</td>
      <td>7.944109e+04</td>
      <td>5.542975e+05</td>
      <td>1.908498e+04</td>
      <td>5.352125e+05</td>
      <td>0.000413</td>
      <td>0.000050</td>
      <td>0.000559</td>
    </tr>
    <tr>
      <th>frax</th>
      <td>5.853817e+05</td>
      <td>1.100418e+05</td>
      <td>4.753399e+05</td>
      <td>5.837342e+05</td>
      <td>1.097321e+05</td>
      <td>4.740020e+05</td>
      <td>0.000435</td>
      <td>0.000285</td>
      <td>0.000495</td>
    </tr>
    <tr>
      <th>susd</th>
      <td>6.193252e+05</td>
      <td>1.655828e+05</td>
      <td>4.537424e+05</td>
      <td>6.141712e+05</td>
      <td>1.642048e+05</td>
      <td>4.499664e+05</td>
      <td>0.000457</td>
      <td>0.000427</td>
      <td>0.000470</td>
    </tr>
    <tr>
      <th>tusd</th>
      <td>5.181698e+05</td>
      <td>1.352422e+05</td>
      <td>3.829276e+05</td>
      <td>5.175667e+05</td>
      <td>1.350848e+05</td>
      <td>3.824819e+05</td>
      <td>0.000385</td>
      <td>0.000351</td>
      <td>0.000399</td>
    </tr>
    <tr>
      <th>gusd</th>
      <td>5.837551e+05</td>
      <td>2.508297e+05</td>
      <td>3.329254e+05</td>
      <td>5.838143e+05</td>
      <td>2.508551e+05</td>
      <td>3.329592e+05</td>
      <td>0.000435</td>
      <td>0.000652</td>
      <td>0.000347</td>
    </tr>
    <tr>
      <th>yfi</th>
      <td>5.335875e+01</td>
      <td>5.591842e-02</td>
      <td>5.330283e+01</td>
      <td>2.671306e+05</td>
      <td>2.799450e+02</td>
      <td>2.668506e+05</td>
      <td>0.000199</td>
      <td>0.000001</td>
      <td>0.000278</td>
    </tr>
    <tr>
      <th>mana</th>
      <td>9.080672e+05</td>
      <td>1.630239e+05</td>
      <td>7.450433e+05</td>
      <td>2.434258e+05</td>
      <td>4.370186e+04</td>
      <td>1.997240e+05</td>
      <td>0.000181</td>
      <td>0.000114</td>
      <td>0.000208</td>
    </tr>
    <tr>
      <th>rai</th>
      <td>7.796184e+04</td>
      <td>1.620174e+04</td>
      <td>6.176010e+04</td>
      <td>2.370619e+05</td>
      <td>4.926532e+04</td>
      <td>1.877966e+05</td>
      <td>0.000176</td>
      <td>0.000128</td>
      <td>0.000196</td>
    </tr>
    <tr>
      <th>ens</th>
      <td>9.662975e+03</td>
      <td>3.255076e+01</td>
      <td>9.630424e+03</td>
      <td>1.631242e+05</td>
      <td>5.495012e+02</td>
      <td>1.625747e+05</td>
      <td>0.000121</td>
      <td>0.000001</td>
      <td>0.000170</td>
    </tr>
    <tr>
      <th>pax</th>
      <td>2.243582e+05</td>
      <td>9.981815e+04</td>
      <td>1.245401e+05</td>
      <td>2.242012e+05</td>
      <td>9.974828e+04</td>
      <td>1.244529e+05</td>
      <td>0.000167</td>
      <td>0.000259</td>
      <td>0.000130</td>
    </tr>
    <tr>
      <th>bal</th>
      <td>6.266995e+04</td>
      <td>3.422017e+03</td>
      <td>5.924794e+04</td>
      <td>1.182883e+05</td>
      <td>6.458989e+03</td>
      <td>1.118293e+05</td>
      <td>0.000088</td>
      <td>0.000017</td>
      <td>0.000117</td>
    </tr>
    <tr>
      <th>ust</th>
      <td>6.377785e+06</td>
      <td>3.081123e+05</td>
      <td>6.069673e+06</td>
      <td>1.040517e+05</td>
      <td>5.026763e+03</td>
      <td>9.902495e+04</td>
      <td>0.000077</td>
      <td>0.000013</td>
      <td>0.000103</td>
    </tr>
    <tr>
      <th>lusd</th>
      <td>1.406104e+05</td>
      <td>5.494264e+04</td>
      <td>8.566774e+04</td>
      <td>1.409861e+05</td>
      <td>5.508947e+04</td>
      <td>8.589668e+04</td>
      <td>0.000105</td>
      <td>0.000143</td>
      <td>0.000090</td>
    </tr>
    <tr>
      <th>zrx</th>
      <td>2.990711e+05</td>
      <td>5.301093e+03</td>
      <td>2.937700e+05</td>
      <td>8.498963e+04</td>
      <td>1.506457e+03</td>
      <td>8.348317e+04</td>
      <td>0.000063</td>
      <td>0.000004</td>
      <td>0.000087</td>
    </tr>
    <tr>
      <th>cvx</th>
      <td>3.274029e+04</td>
      <td>1.435502e+02</td>
      <td>3.259674e+04</td>
      <td>7.022260e+04</td>
      <td>3.078918e+02</td>
      <td>6.991471e+04</td>
      <td>0.000052</td>
      <td>0.000001</td>
      <td>0.000073</td>
    </tr>
    <tr>
      <th>ren</th>
      <td>1.750766e+06</td>
      <td>6.693284e+03</td>
      <td>1.744073e+06</td>
      <td>6.776041e+04</td>
      <td>2.590521e+02</td>
      <td>6.750136e+04</td>
      <td>0.000050</td>
      <td>0.000001</td>
      <td>0.000070</td>
    </tr>
    <tr>
      <th>bat</th>
      <td>3.406674e+05</td>
      <td>6.706642e+03</td>
      <td>3.339607e+05</td>
      <td>5.609746e+04</td>
      <td>1.104378e+03</td>
      <td>5.499308e+04</td>
      <td>0.000042</td>
      <td>0.000003</td>
      <td>0.000057</td>
    </tr>
    <tr>
      <th>enj</th>
      <td>2.979106e+05</td>
      <td>1.097136e+05</td>
      <td>1.881969e+05</td>
      <td>4.417993e+04</td>
      <td>1.627046e+04</td>
      <td>2.790948e+04</td>
      <td>0.000033</td>
      <td>0.000042</td>
      <td>0.000029</td>
    </tr>
    <tr>
      <th>1inch</th>
      <td>5.658163e+04</td>
      <td>1.128746e+03</td>
      <td>5.545289e+04</td>
      <td>1.490232e+04</td>
      <td>2.972863e+02</td>
      <td>1.460504e+04</td>
      <td>0.000011</td>
      <td>0.000001</td>
      <td>0.000015</td>
    </tr>
    <tr>
      <th>ampl</th>
      <td>2.009598e+05</td>
      <td>1.924054e+05</td>
      <td>8.554458e+03</td>
      <td>2.532241e+05</td>
      <td>2.424448e+05</td>
      <td>1.077924e+04</td>
      <td>0.000189</td>
      <td>0.000630</td>
      <td>0.000011</td>
    </tr>
    <tr>
      <th>knc</th>
      <td>3.332031e+04</td>
      <td>1.366769e+04</td>
      <td>1.965262e+04</td>
      <td>1.460601e+04</td>
      <td>5.991254e+03</td>
      <td>8.614756e+03</td>
      <td>0.000011</td>
      <td>0.000016</td>
      <td>0.000009</td>
    </tr>
    <tr>
      <th>fei_eth</th>
      <td>1.065058e+04</td>
      <td>3.196790e+03</td>
      <td>7.453792e+03</td>
      <td>1.062796e+04</td>
      <td>3.190001e+03</td>
      <td>7.437962e+03</td>
      <td>0.000008</td>
      <td>0.000008</td>
      <td>0.000008</td>
    </tr>
    <tr>
      <th>BptBALWETH</th>
      <td>2.422182e-09</td>
      <td>NaN</td>
      <td>2.422182e-09</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>BptWBTCWETH</th>
      <td>3.185679e-03</td>
      <td>NaN</td>
      <td>3.185679e-03</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>GUniDAIUSDC</th>
      <td>3.743267e+00</td>
      <td>NaN</td>
      <td>3.743267e+00</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>GUniUSDCUSDT</th>
      <td>9.999975e-02</td>
      <td>NaN</td>
      <td>9.999975e-02</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>Univ2AAVEWETH</th>
      <td>1.346558e-01</td>
      <td>NaN</td>
      <td>1.346558e-01</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>Univ2CRVWETH</th>
      <td>4.136273e-05</td>
      <td>NaN</td>
      <td>4.136273e-05</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>Univ2DAIUSDC</th>
      <td>9.089043e-06</td>
      <td>NaN</td>
      <td>9.089043e-06</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>Univ2DAIWETH</th>
      <td>3.669936e-01</td>
      <td>NaN</td>
      <td>3.669936e-01</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>Univ2LINKWETH</th>
      <td>8.050459e+01</td>
      <td>NaN</td>
      <td>8.050459e+01</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>Univ2UNIWETH</th>
      <td>1.210293e+00</td>
      <td>NaN</td>
      <td>1.210293e+00</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>Univ2USDCWETH</th>
      <td>3.099794e-07</td>
      <td>NaN</td>
      <td>3.099794e-07</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>Univ2WBTCWETH</th>
      <td>1.887777e-07</td>
      <td>NaN</td>
      <td>1.887777e-07</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>dpi</th>
      <td>1.137160e+03</td>
      <td>4.120960e+02</td>
      <td>7.250638e+02</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>renfil</th>
      <td>6.387879e+03</td>
      <td>6.162561e+03</td>
      <td>2.253174e+02</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>xsushi</th>
      <td>4.262428e+05</td>
      <td>3.293954e+02</td>
      <td>4.259134e+05</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
    </tr>
  </tbody>
</table>
</div>




```python
assets_tvl_totals = assets['tvl_usd']
```


```python
#the top 10
assets_tvl_top10 = assets_tvl_totals[:10].copy()
# other
assets_tvl_top10.loc['other'] = assets['tvl_usd'][10:].sum()
```


```python
df = pd.DataFrame(assets_tvl_top10)
df['tvl_usd'] = df['tvl_usd'].apply(lambda x: "${:,.2f}".format((x)))
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
      <th>tvl_usd</th>
    </tr>
    <tr>
      <th>asset</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>steth_lido</th>
      <td>$364,676,875.10</td>
    </tr>
    <tr>
      <th>wbtc</th>
      <td>$286,036,893.43</td>
    </tr>
    <tr>
      <th>weth</th>
      <td>$213,577,085.42</td>
    </tr>
    <tr>
      <th>usdc</th>
      <td>$32,327,739.76</td>
    </tr>
    <tr>
      <th>usdt_eth</th>
      <td>$22,730,207.54</td>
    </tr>
    <tr>
      <th>link</th>
      <td>$15,106,850.64</td>
    </tr>
    <tr>
      <th>dai</th>
      <td>$9,363,119.56</td>
    </tr>
    <tr>
      <th>aave</th>
      <td>$6,776,781.98</td>
    </tr>
    <tr>
      <th>mkr</th>
      <td>$2,062,747.24</td>
    </tr>
    <tr>
      <th>crv</th>
      <td>$724,211.80</td>
    </tr>
    <tr>
      <th>other</th>
      <td>$4,907,185.59</td>
    </tr>
  </tbody>
</table>
</div>




```python
def my_autopct(pct):
    return ('%.2f' % pct + '%') if pct > 7 else ''

axes = assets_tvl_top10.plot(kind='pie', autopct=my_autopct, figsize=(16, 16), subplots=True, layout=(2, 2), legend=False, labeldistance=1.1)

for ax in axes.flat:
    yl = ax.get_ylabel()
    ax.set(ylabel='', title=yl)
    ax.set_title(str(protocol).upper() + '\nEstimated TVL Share (USD) by Asset*',size=20, font='Lato')

fig = axes[0, 0].get_figure()
fig.suptitle('\n*Assets with CM Reference Rate',size=11, font='Lato')

fig.tight_layout()
plt.rcParams['font.size'] = 15.0
```

    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.



    
![png](output_16_1.png)
    



```python
df_balsheet.index = (pd.to_datetime(df_balsheet.time)).dt.date
df_balsheet["Total Value Locked (USD)"] = df_balsheet.tvl_total_usd.astype(float)
aave_tvl = df_balsheet[['defi_protocol','Total Value Locked (USD)']]
```


```python
aave_tvl
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
      <th>defi_protocol</th>
      <th>Total Value Locked (USD)</th>
    </tr>
    <tr>
      <th>time</th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2023-09-12</th>
      <td>aave_v2_eth</td>
      <td>2.110840e+09</td>
    </tr>
    <tr>
      <th>2023-09-13</th>
      <td>aave_v2_eth</td>
      <td>2.142597e+09</td>
    </tr>
    <tr>
      <th>2023-09-14</th>
      <td>aave_v2_eth</td>
      <td>2.159568e+09</td>
    </tr>
    <tr>
      <th>2023-09-15</th>
      <td>aave_v2_eth</td>
      <td>2.184802e+09</td>
    </tr>
    <tr>
      <th>2023-09-16</th>
      <td>aave_v2_eth</td>
      <td>2.199822e+09</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>2024-09-06</th>
      <td>aave_v2_eth</td>
      <td>9.812479e+08</td>
    </tr>
    <tr>
      <th>2024-09-07</th>
      <td>aave_v2_eth</td>
      <td>9.178914e+08</td>
    </tr>
    <tr>
      <th>2024-09-08</th>
      <td>aave_v2_eth</td>
      <td>9.215925e+08</td>
    </tr>
    <tr>
      <th>2024-09-09</th>
      <td>aave_v2_eth</td>
      <td>9.333896e+08</td>
    </tr>
    <tr>
      <th>2024-09-10</th>
      <td>aave_v2_eth</td>
      <td>9.582897e+08</td>
    </tr>
  </tbody>
</table>
<p>365 rows × 2 columns</p>
</div>




```python
ax = aave_tvl.plot.area()
plt.xlim([aave_tvl.index[0], aave_tvl.index[-1]])
plt.title('\n' + str(aave_tvl.defi_protocol[0]).upper() + '\n Total Value Locked \n',fontdict={'fontsize':19.5})
ax.set_xlabel("")
ax.set_ylabel("Total Value Locked (USD) \n",fontdict={'fontsize':13.5})
ax.yaxis.set_ticks(plt.gca().get_yticks())
ax.get_legend().remove()
plt.gca().set_yticklabels(['${:,.2f}B'.format(x/1000000000) for x in plt.gca().get_yticks()]);
```

    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:51 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:52 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:52 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:52 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:52 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:52 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:52 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:52 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:52 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:52 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:52 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:52 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:52 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:52 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:52 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:52 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:52 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:52 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:52 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:52 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:52 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:52 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:52 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:52 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:52 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:52 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:52 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:52 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:52 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:52 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:52 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:52 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:52 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:52 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:52 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:52 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:52 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:52 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:52 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:52 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:52 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:52 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:52 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:52 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:52 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:52 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:52 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:52 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:52 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:52 WARNING  findfont: Font family 'Lato' not found.
    2024-09-10 17:11:52 WARNING  findfont: Font family 'Lato' not found.



    
![png](output_19_1.png)
    

