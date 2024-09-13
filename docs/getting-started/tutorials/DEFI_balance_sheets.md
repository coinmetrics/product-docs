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

    2024-09-11 15:18:44 INFO     Using API key found in environment


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
      <th>361</th>
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
      <th>362</th>
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
      <th>363</th>
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
    <tr>
      <th>364</th>
      <td>aave_v2_eth</td>
      <td>20723649</td>
      <td>2024-09-11T00:00:00.000000000Z</td>
      <td>1355796786.5179</td>
      <td>49</td>
      <td>1356061228.0378</td>
      <td>49</td>
      <td>386309607.1148</td>
      <td>969487179.4031</td>
      <td>-386574048.6347</td>
      <td>[{'asset': '1inch', 'total_units': '56582.2525...</td>
      <td>[{'asset': '1inch', 'total_units': '56206.2808...</td>
      <td>0.284877</td>
      <td>0.714929</td>
      <td>0.714929</td>
      <td>1.000196</td>
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
      <td>20723649</td>
    </tr>
    <tr>
      <th>time</th>
      <td>2024-09-11T00:00:00.000000000Z</td>
    </tr>
    <tr>
      <th>assets_total_usd</th>
      <td>1355796786.5179</td>
    </tr>
    <tr>
      <th>assets_total_count</th>
      <td>49</td>
    </tr>
    <tr>
      <th>liabilities_total_usd</th>
      <td>1356061228.0378</td>
    </tr>
    <tr>
      <th>liabilities_total_count</th>
      <td>49</td>
    </tr>
    <tr>
      <th>loans_lent_total_usd</th>
      <td>386309607.1148</td>
    </tr>
    <tr>
      <th>tvl_total_usd</th>
      <td>969487179.4031</td>
    </tr>
    <tr>
      <th>net_working_capital_usd</th>
      <td>-386574048.6347</td>
    </tr>
    <tr>
      <th>assets</th>
      <td>[{'asset': '1inch', 'total_units': '56582.2525...</td>
    </tr>
    <tr>
      <th>liabilities</th>
      <td>[{'asset': '1inch', 'total_units': '56206.2808...</td>
    </tr>
    <tr>
      <th>protocol_utilization_ratio</th>
      <td>0.284877</td>
    </tr>
    <tr>
      <th>liquid_supply_ratio</th>
      <td>0.714929</td>
    </tr>
    <tr>
      <th>current_ratio</th>
      <td>0.714929</td>
    </tr>
    <tr>
      <th>debt_to_assets_ratio</th>
      <td>1.000196</td>
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
      <td>1.544855e+05</td>
      <td>NaN</td>
      <td>1.544855e+05</td>
      <td>3.690537e+08</td>
      <td>NaN</td>
      <td>3.690537e+08</td>
      <td>0.272204</td>
      <td>NaN</td>
      <td>0.380669</td>
    </tr>
    <tr>
      <th>wbtc</th>
      <td>5.603619e+03</td>
      <td>5.956406e+02</td>
      <td>5.007978e+03</td>
      <td>3.227848e+08</td>
      <td>3.431063e+07</td>
      <td>2.884742e+08</td>
      <td>0.238078</td>
      <td>0.088816</td>
      <td>0.297553</td>
    </tr>
    <tr>
      <th>weth</th>
      <td>1.310875e+05</td>
      <td>4.049350e+04</td>
      <td>9.059399e+04</td>
      <td>3.132357e+08</td>
      <td>9.675988e+07</td>
      <td>2.164758e+08</td>
      <td>0.231034</td>
      <td>0.250472</td>
      <td>0.223289</td>
    </tr>
    <tr>
      <th>usdc</th>
      <td>1.588818e+08</td>
      <td>1.255413e+08</td>
      <td>3.334052e+07</td>
      <td>1.588852e+08</td>
      <td>1.255440e+08</td>
      <td>3.334123e+07</td>
      <td>0.117190</td>
      <td>0.324983</td>
      <td>0.034391</td>
    </tr>
    <tr>
      <th>usdt_eth</th>
      <td>1.124254e+08</td>
      <td>8.982969e+07</td>
      <td>2.259566e+07</td>
      <td>1.124301e+08</td>
      <td>8.983346e+07</td>
      <td>2.259661e+07</td>
      <td>0.082925</td>
      <td>0.232543</td>
      <td>0.023308</td>
    </tr>
    <tr>
      <th>link</th>
      <td>1.484104e+06</td>
      <td>5.493181e+04</td>
      <td>1.429172e+06</td>
      <td>1.572480e+07</td>
      <td>5.820294e+05</td>
      <td>1.514277e+07</td>
      <td>0.011598</td>
      <td>0.001507</td>
      <td>0.015619</td>
    </tr>
    <tr>
      <th>dai</th>
      <td>4.724180e+07</td>
      <td>3.782985e+07</td>
      <td>9.411950e+06</td>
      <td>4.728078e+07</td>
      <td>3.786106e+07</td>
      <td>9.419715e+06</td>
      <td>0.034873</td>
      <td>0.098007</td>
      <td>0.009716</td>
    </tr>
    <tr>
      <th>aave</th>
      <td>4.823621e+04</td>
      <td>NaN</td>
      <td>4.823621e+04</td>
      <td>7.268864e+06</td>
      <td>NaN</td>
      <td>7.268864e+06</td>
      <td>0.005361</td>
      <td>NaN</td>
      <td>0.007498</td>
    </tr>
    <tr>
      <th>mkr</th>
      <td>1.280608e+03</td>
      <td>1.055003e+00</td>
      <td>1.279553e+03</td>
      <td>2.060503e+06</td>
      <td>1.697503e+03</td>
      <td>2.058805e+06</td>
      <td>0.001520</td>
      <td>0.000004</td>
      <td>0.002124</td>
    </tr>
    <tr>
      <th>crv</th>
      <td>2.571763e+06</td>
      <td>7.749804e+03</td>
      <td>2.564013e+06</td>
      <td>7.191379e+05</td>
      <td>2.167065e+03</td>
      <td>7.169709e+05</td>
      <td>0.000530</td>
      <td>0.000006</td>
      <td>0.000740</td>
    </tr>
    <tr>
      <th>snx</th>
      <td>4.279042e+05</td>
      <td>2.605631e+03</td>
      <td>4.252986e+05</td>
      <td>6.017594e+05</td>
      <td>3.664285e+03</td>
      <td>5.980951e+05</td>
      <td>0.000444</td>
      <td>0.000009</td>
      <td>0.000617</td>
    </tr>
    <tr>
      <th>busd</th>
      <td>7.889985e+05</td>
      <td>2.137916e+05</td>
      <td>5.752069e+05</td>
      <td>7.870198e+05</td>
      <td>2.132555e+05</td>
      <td>5.737644e+05</td>
      <td>0.000580</td>
      <td>0.000552</td>
      <td>0.000592</td>
    </tr>
    <tr>
      <th>uni</th>
      <td>8.227151e+04</td>
      <td>2.834319e+03</td>
      <td>7.943719e+04</td>
      <td>5.525864e+05</td>
      <td>1.903704e+04</td>
      <td>5.335493e+05</td>
      <td>0.000408</td>
      <td>0.000049</td>
      <td>0.000550</td>
    </tr>
    <tr>
      <th>frax</th>
      <td>5.854333e+05</td>
      <td>1.100934e+05</td>
      <td>4.753399e+05</td>
      <td>5.838315e+05</td>
      <td>1.097922e+05</td>
      <td>4.740393e+05</td>
      <td>0.000431</td>
      <td>0.000284</td>
      <td>0.000489</td>
    </tr>
    <tr>
      <th>susd</th>
      <td>6.194831e+05</td>
      <td>1.657407e+05</td>
      <td>4.537424e+05</td>
      <td>6.142920e+05</td>
      <td>1.643518e+05</td>
      <td>4.499401e+05</td>
      <td>0.000453</td>
      <td>0.000425</td>
      <td>0.000464</td>
    </tr>
    <tr>
      <th>tusd</th>
      <td>5.182068e+05</td>
      <td>1.352792e+05</td>
      <td>3.829276e+05</td>
      <td>5.174583e+05</td>
      <td>1.350838e+05</td>
      <td>3.823744e+05</td>
      <td>0.000382</td>
      <td>0.000350</td>
      <td>0.000394</td>
    </tr>
    <tr>
      <th>gusd</th>
      <td>5.841511e+05</td>
      <td>2.513482e+05</td>
      <td>3.328029e+05</td>
      <td>5.835489e+05</td>
      <td>2.510891e+05</td>
      <td>3.324598e+05</td>
      <td>0.000430</td>
      <td>0.000650</td>
      <td>0.000343</td>
    </tr>
    <tr>
      <th>yfi</th>
      <td>5.335878e+01</td>
      <td>5.594907e-02</td>
      <td>5.330283e+01</td>
      <td>2.644870e+05</td>
      <td>2.773264e+02</td>
      <td>2.642097e+05</td>
      <td>0.000195</td>
      <td>0.000001</td>
      <td>0.000273</td>
    </tr>
    <tr>
      <th>mana</th>
      <td>9.081566e+05</td>
      <td>1.631133e+05</td>
      <td>7.450433e+05</td>
      <td>2.458359e+05</td>
      <td>4.415438e+04</td>
      <td>2.016815e+05</td>
      <td>0.000181</td>
      <td>0.000114</td>
      <td>0.000208</td>
    </tr>
    <tr>
      <th>rai</th>
      <td>7.797072e+04</td>
      <td>1.621062e+04</td>
      <td>6.176010e+04</td>
      <td>2.354580e+05</td>
      <td>4.895324e+04</td>
      <td>1.865048e+05</td>
      <td>0.000174</td>
      <td>0.000127</td>
      <td>0.000192</td>
    </tr>
    <tr>
      <th>ens</th>
      <td>9.662993e+03</td>
      <td>3.256861e+01</td>
      <td>9.630424e+03</td>
      <td>1.706321e+05</td>
      <td>5.751063e+02</td>
      <td>1.700569e+05</td>
      <td>0.000126</td>
      <td>0.000001</td>
      <td>0.000175</td>
    </tr>
    <tr>
      <th>pax</th>
      <td>2.245738e+05</td>
      <td>1.000337e+05</td>
      <td>1.245401e+05</td>
      <td>2.250197e+05</td>
      <td>1.002323e+05</td>
      <td>1.247874e+05</td>
      <td>0.000166</td>
      <td>0.000259</td>
      <td>0.000129</td>
    </tr>
    <tr>
      <th>bal</th>
      <td>6.267183e+04</td>
      <td>3.423892e+03</td>
      <td>5.924794e+04</td>
      <td>1.191376e+05</td>
      <td>6.508736e+03</td>
      <td>1.126289e+05</td>
      <td>0.000088</td>
      <td>0.000017</td>
      <td>0.000116</td>
    </tr>
    <tr>
      <th>ust</th>
      <td>6.377954e+06</td>
      <td>3.082812e+05</td>
      <td>6.069673e+06</td>
      <td>1.082931e+05</td>
      <td>5.234396e+03</td>
      <td>1.030587e+05</td>
      <td>0.000080</td>
      <td>0.000014</td>
      <td>0.000106</td>
    </tr>
    <tr>
      <th>lusd</th>
      <td>1.405305e+05</td>
      <td>5.504126e+04</td>
      <td>8.548924e+04</td>
      <td>1.409187e+05</td>
      <td>5.519330e+04</td>
      <td>8.572538e+04</td>
      <td>0.000104</td>
      <td>0.000143</td>
      <td>0.000088</td>
    </tr>
    <tr>
      <th>zrx</th>
      <td>2.990740e+05</td>
      <td>5.303998e+03</td>
      <td>2.937700e+05</td>
      <td>8.496553e+04</td>
      <td>1.506841e+03</td>
      <td>8.345869e+04</td>
      <td>0.000063</td>
      <td>0.000004</td>
      <td>0.000086</td>
    </tr>
    <tr>
      <th>cvx</th>
      <td>3.274037e+04</td>
      <td>1.436289e+02</td>
      <td>3.259674e+04</td>
      <td>6.997011e+04</td>
      <td>3.069522e+02</td>
      <td>6.966316e+04</td>
      <td>0.000052</td>
      <td>0.000001</td>
      <td>0.000072</td>
    </tr>
    <tr>
      <th>ren</th>
      <td>1.750770e+06</td>
      <td>6.696953e+03</td>
      <td>1.744073e+06</td>
      <td>6.820384e+04</td>
      <td>2.608898e+02</td>
      <td>6.794296e+04</td>
      <td>0.000050</td>
      <td>0.000001</td>
      <td>0.000070</td>
    </tr>
    <tr>
      <th>bat</th>
      <td>3.406711e+05</td>
      <td>6.710318e+03</td>
      <td>3.339607e+05</td>
      <td>5.691630e+04</td>
      <td>1.121100e+03</td>
      <td>5.579520e+04</td>
      <td>0.000042</td>
      <td>0.000003</td>
      <td>0.000058</td>
    </tr>
    <tr>
      <th>enj</th>
      <td>2.979707e+05</td>
      <td>1.097738e+05</td>
      <td>1.881969e+05</td>
      <td>4.402891e+04</td>
      <td>1.622045e+04</td>
      <td>2.780846e+04</td>
      <td>0.000032</td>
      <td>0.000042</td>
      <td>0.000029</td>
    </tr>
    <tr>
      <th>1inch</th>
      <td>5.658225e+04</td>
      <td>1.129365e+03</td>
      <td>5.545289e+04</td>
      <td>1.472982e+04</td>
      <td>2.940029e+02</td>
      <td>1.443582e+04</td>
      <td>0.000011</td>
      <td>0.000001</td>
      <td>0.000015</td>
    </tr>
    <tr>
      <th>ampl</th>
      <td>2.026368e+05</td>
      <td>1.937561e+05</td>
      <td>8.880723e+03</td>
      <td>2.388705e+05</td>
      <td>2.284018e+05</td>
      <td>1.046870e+04</td>
      <td>0.000176</td>
      <td>0.000591</td>
      <td>0.000011</td>
    </tr>
    <tr>
      <th>knc</th>
      <td>3.332780e+04</td>
      <td>1.367518e+04</td>
      <td>1.965262e+04</td>
      <td>1.463334e+04</td>
      <td>6.004405e+03</td>
      <td>8.628936e+03</td>
      <td>0.000011</td>
      <td>0.000016</td>
      <td>0.000009</td>
    </tr>
    <tr>
      <th>fei_eth</th>
      <td>1.065348e+04</td>
      <td>3.199692e+03</td>
      <td>7.453792e+03</td>
      <td>1.062954e+04</td>
      <td>3.192502e+03</td>
      <td>7.437041e+03</td>
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
      <td>1.137386e+03</td>
      <td>4.123218e+02</td>
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
      <td>4.262429e+05</td>
      <td>3.295759e+02</td>
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
      <td>$369,053,732.27</td>
    </tr>
    <tr>
      <th>wbtc</th>
      <td>$288,474,150.66</td>
    </tr>
    <tr>
      <th>weth</th>
      <td>$216,475,808.56</td>
    </tr>
    <tr>
      <th>usdc</th>
      <td>$33,341,234.42</td>
    </tr>
    <tr>
      <th>usdt_eth</th>
      <td>$22,596,610.62</td>
    </tr>
    <tr>
      <th>link</th>
      <td>$15,142,773.16</td>
    </tr>
    <tr>
      <th>dai</th>
      <td>$9,419,715.04</td>
    </tr>
    <tr>
      <th>aave</th>
      <td>$7,268,863.58</td>
    </tr>
    <tr>
      <th>mkr</th>
      <td>$2,058,805.48</td>
    </tr>
    <tr>
      <th>crv</th>
      <td>$716,970.86</td>
    </tr>
    <tr>
      <th>other</th>
      <td>$4,938,514.76</td>
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
    ax.set_title(str(protocol).upper() + '\nEstimated TVL Share (USD) by Asset*',size=20, font='arial')

fig = axes[0, 0].get_figure()
fig.suptitle('\n*Assets with CM Reference Rate',size=11, font='arial')

fig.tight_layout()
plt.rcParams['font.size'] = 15.0
```

    2024-09-11 15:18:46 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:46 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:46 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:46 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:46 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:46 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:46 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:46 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:46 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:46 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:46 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:46 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:46 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:46 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:46 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:46 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:46 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:46 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:46 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:46 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:46 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:46 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:46 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.



    
![png](output_16_60.png)
    



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
      <th>2023-09-17</th>
      <td>aave_v2_eth</td>
      <td>2.196492e+09</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
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
    <tr>
      <th>2024-09-11</th>
      <td>aave_v2_eth</td>
      <td>9.694872e+08</td>
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

    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.


    2024-09-11 15:18:47 WARNING  findfont: Font family 'Lato' not found.



    
![png](output_19_100.png)
    

