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

    2024-09-06 01:15:58 INFO     Using API key found in environment


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
      <td>20651993</td>
      <td>2024-09-01T00:00:00.000000000Z</td>
      <td>1459491995.9135</td>
      <td>49</td>
      <td>1459962175.6271</td>
      <td>49</td>
      <td>410437338.4923</td>
      <td>1049054657.4212</td>
      <td>-410907518.2059</td>
      <td>[{'asset': '1inch', 'total_units': '56575.7210...</td>
      <td>[{'asset': '1inch', 'total_units': '56196.8783...</td>
      <td>0.281129</td>
      <td>0.71855</td>
      <td>0.71855</td>
      <td>1.000323</td>
    </tr>
    <tr>
      <th>361</th>
      <td>aave_v2_eth</td>
      <td>20659157</td>
      <td>2024-09-02T00:00:00.000000000Z</td>
      <td>1422151532.2858</td>
      <td>49</td>
      <td>1422570183.8832</td>
      <td>49</td>
      <td>405808432.1169</td>
      <td>1016343100.1689</td>
      <td>-406227083.7143</td>
      <td>[{'asset': '1inch', 'total_units': '56576.3877...</td>
      <td>[{'asset': '1inch', 'total_units': '56196.8784...</td>
      <td>0.285265</td>
      <td>0.714442</td>
      <td>0.714442</td>
      <td>1.000295</td>
    </tr>
    <tr>
      <th>362</th>
      <td>aave_v2_eth</td>
      <td>20666327</td>
      <td>2024-09-03T00:00:00.000000000Z</td>
      <td>1460946101.4231</td>
      <td>49</td>
      <td>1461370812.6798</td>
      <td>49</td>
      <td>410711686.6373</td>
      <td>1050234414.7858</td>
      <td>-411136397.894</td>
      <td>[{'asset': '1inch', 'total_units': '56577.0548...</td>
      <td>[{'asset': '1inch', 'total_units': '56196.8784...</td>
      <td>0.281046</td>
      <td>0.718664</td>
      <td>0.718664</td>
      <td>1.000291</td>
    </tr>
    <tr>
      <th>363</th>
      <td>aave_v2_eth</td>
      <td>20673497</td>
      <td>2024-09-04T00:00:00.000000000Z</td>
      <td>1420829599.1815</td>
      <td>49</td>
      <td>1421205314.4427</td>
      <td>49</td>
      <td>404871260.5267</td>
      <td>1015958338.6548</td>
      <td>-405246975.7879</td>
      <td>[{'asset': '1inch', 'total_units': '56577.7223...</td>
      <td>[{'asset': '1inch', 'total_units': '56196.8785...</td>
      <td>0.284879</td>
      <td>0.714857</td>
      <td>0.714857</td>
      <td>1.000265</td>
    </tr>
    <tr>
      <th>364</th>
      <td>aave_v2_eth</td>
      <td>20680662</td>
      <td>2024-09-05T00:00:00.000000000Z</td>
      <td>1426984019.0719</td>
      <td>49</td>
      <td>1427379805.5783</td>
      <td>49</td>
      <td>405359066.0021</td>
      <td>1021624953.0698</td>
      <td>-405754852.5085</td>
      <td>[{'asset': '1inch', 'total_units': '56578.3901...</td>
      <td>[{'asset': '1inch', 'total_units': '56196.8785...</td>
      <td>0.283989</td>
      <td>0.715735</td>
      <td>0.715735</td>
      <td>1.000278</td>
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
      <td>20680662</td>
    </tr>
    <tr>
      <th>time</th>
      <td>2024-09-05T00:00:00.000000000Z</td>
    </tr>
    <tr>
      <th>assets_total_usd</th>
      <td>1426984019.0719</td>
    </tr>
    <tr>
      <th>assets_total_count</th>
      <td>49</td>
    </tr>
    <tr>
      <th>liabilities_total_usd</th>
      <td>1427379805.5783</td>
    </tr>
    <tr>
      <th>liabilities_total_count</th>
      <td>49</td>
    </tr>
    <tr>
      <th>loans_lent_total_usd</th>
      <td>405359066.0021</td>
    </tr>
    <tr>
      <th>tvl_total_usd</th>
      <td>1021624953.0698</td>
    </tr>
    <tr>
      <th>net_working_capital_usd</th>
      <td>-405754852.5085</td>
    </tr>
    <tr>
      <th>assets</th>
      <td>[{'asset': '1inch', 'total_units': '56578.3901...</td>
    </tr>
    <tr>
      <th>liabilities</th>
      <td>[{'asset': '1inch', 'total_units': '56196.8785...</td>
    </tr>
    <tr>
      <th>protocol_utilization_ratio</th>
      <td>0.283989</td>
    </tr>
    <tr>
      <th>liquid_supply_ratio</th>
      <td>0.715735</td>
    </tr>
    <tr>
      <th>current_ratio</th>
      <td>0.715735</td>
    </tr>
    <tr>
      <th>debt_to_assets_ratio</th>
      <td>1.000278</td>
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
      <td>1.726978e+05</td>
      <td>NaN</td>
      <td>1.726978e+05</td>
      <td>4.237859e+08</td>
      <td>NaN</td>
      <td>4.237859e+08</td>
      <td>0.296980</td>
      <td>NaN</td>
      <td>0.414816</td>
    </tr>
    <tr>
      <th>wbtc</th>
      <td>5.693608e+03</td>
      <td>6.034461e+02</td>
      <td>5.090162e+03</td>
      <td>3.299027e+08</td>
      <td>3.496526e+07</td>
      <td>2.949375e+08</td>
      <td>0.231189</td>
      <td>0.086258</td>
      <td>0.288694</td>
    </tr>
    <tr>
      <th>weth</th>
      <td>1.353701e+05</td>
      <td>4.193426e+04</td>
      <td>9.343581e+04</td>
      <td>3.320530e+08</td>
      <td>1.028617e+08</td>
      <td>2.291913e+08</td>
      <td>0.232696</td>
      <td>0.253755</td>
      <td>0.224340</td>
    </tr>
    <tr>
      <th>usdt_eth</th>
      <td>1.112871e+08</td>
      <td>8.972374e+07</td>
      <td>2.156332e+07</td>
      <td>1.112941e+08</td>
      <td>8.972940e+07</td>
      <td>2.156468e+07</td>
      <td>0.077993</td>
      <td>0.221358</td>
      <td>0.021108</td>
    </tr>
    <tr>
      <th>link</th>
      <td>1.555369e+06</td>
      <td>5.492669e+04</td>
      <td>1.500442e+06</td>
      <td>1.609692e+07</td>
      <td>5.684507e+05</td>
      <td>1.552847e+07</td>
      <td>0.011280</td>
      <td>0.001402</td>
      <td>0.015200</td>
    </tr>
    <tr>
      <th>usdc</th>
      <td>1.484601e+08</td>
      <td>1.361796e+08</td>
      <td>1.228047e+07</td>
      <td>1.484504e+08</td>
      <td>1.361708e+08</td>
      <td>1.227967e+07</td>
      <td>0.104031</td>
      <td>0.335926</td>
      <td>0.012020</td>
    </tr>
    <tr>
      <th>dai</th>
      <td>4.915082e+07</td>
      <td>3.949131e+07</td>
      <td>9.659509e+06</td>
      <td>4.924546e+07</td>
      <td>3.956735e+07</td>
      <td>9.678108e+06</td>
      <td>0.034510</td>
      <td>0.097611</td>
      <td>0.009473</td>
    </tr>
    <tr>
      <th>aave</th>
      <td>4.918830e+04</td>
      <td>NaN</td>
      <td>4.918830e+04</td>
      <td>6.688834e+06</td>
      <td>NaN</td>
      <td>6.688834e+06</td>
      <td>0.004687</td>
      <td>NaN</td>
      <td>0.006547</td>
    </tr>
    <tr>
      <th>mkr</th>
      <td>1.480644e+03</td>
      <td>1.051540e+00</td>
      <td>1.479592e+03</td>
      <td>2.478640e+06</td>
      <td>1.760307e+03</td>
      <td>2.476880e+06</td>
      <td>0.001737</td>
      <td>0.000004</td>
      <td>0.002424</td>
    </tr>
    <tr>
      <th>crv</th>
      <td>2.573776e+06</td>
      <td>7.724367e+03</td>
      <td>2.566052e+06</td>
      <td>7.499891e+05</td>
      <td>2.250853e+03</td>
      <td>7.477382e+05</td>
      <td>0.000526</td>
      <td>0.000006</td>
      <td>0.000732</td>
    </tr>
    <tr>
      <th>snx</th>
      <td>4.281201e+05</td>
      <td>2.597078e+03</td>
      <td>4.255230e+05</td>
      <td>5.844619e+05</td>
      <td>3.545485e+03</td>
      <td>5.809164e+05</td>
      <td>0.000410</td>
      <td>0.000009</td>
      <td>0.000569</td>
    </tr>
    <tr>
      <th>busd</th>
      <td>7.902438e+05</td>
      <td>2.138338e+05</td>
      <td>5.764100e+05</td>
      <td>7.892865e+05</td>
      <td>2.135748e+05</td>
      <td>5.757117e+05</td>
      <td>0.000553</td>
      <td>0.000527</td>
      <td>0.000564</td>
    </tr>
    <tr>
      <th>uni</th>
      <td>8.285293e+04</td>
      <td>2.825016e+03</td>
      <td>8.002792e+04</td>
      <td>5.338338e+05</td>
      <td>1.820200e+04</td>
      <td>5.156318e+05</td>
      <td>0.000374</td>
      <td>0.000045</td>
      <td>0.000505</td>
    </tr>
    <tr>
      <th>frax</th>
      <td>5.851246e+05</td>
      <td>1.098166e+05</td>
      <td>4.753080e+05</td>
      <td>5.831631e+05</td>
      <td>1.094485e+05</td>
      <td>4.737147e+05</td>
      <td>0.000409</td>
      <td>0.000270</td>
      <td>0.000464</td>
    </tr>
    <tr>
      <th>susd</th>
      <td>6.185345e+05</td>
      <td>1.657579e+05</td>
      <td>4.527766e+05</td>
      <td>6.146663e+05</td>
      <td>1.647213e+05</td>
      <td>4.499450e+05</td>
      <td>0.000431</td>
      <td>0.000406</td>
      <td>0.000440</td>
    </tr>
    <tr>
      <th>tusd</th>
      <td>5.179844e+05</td>
      <td>1.354872e+05</td>
      <td>3.824973e+05</td>
      <td>5.171543e+05</td>
      <td>1.352700e+05</td>
      <td>3.818842e+05</td>
      <td>0.000362</td>
      <td>0.000334</td>
      <td>0.000374</td>
    </tr>
    <tr>
      <th>yfi</th>
      <td>5.336409e+01</td>
      <td>5.576542e-02</td>
      <td>5.330833e+01</td>
      <td>2.643331e+05</td>
      <td>2.762278e+02</td>
      <td>2.640568e+05</td>
      <td>0.000185</td>
      <td>0.000001</td>
      <td>0.000258</td>
    </tr>
    <tr>
      <th>gusd</th>
      <td>5.799399e+05</td>
      <td>3.595876e+05</td>
      <td>2.203524e+05</td>
      <td>5.801514e+05</td>
      <td>3.597187e+05</td>
      <td>2.204327e+05</td>
      <td>0.000407</td>
      <td>0.000887</td>
      <td>0.000216</td>
    </tr>
    <tr>
      <th>mana</th>
      <td>9.085883e+05</td>
      <td>1.625779e+05</td>
      <td>7.460104e+05</td>
      <td>2.407153e+05</td>
      <td>4.307230e+04</td>
      <td>1.976430e+05</td>
      <td>0.000169</td>
      <td>0.000106</td>
      <td>0.000193</td>
    </tr>
    <tr>
      <th>rai</th>
      <td>7.791751e+04</td>
      <td>1.615741e+04</td>
      <td>6.176010e+04</td>
      <td>2.325229e+05</td>
      <td>4.821725e+04</td>
      <td>1.843057e+05</td>
      <td>0.000163</td>
      <td>0.000119</td>
      <td>0.000180</td>
    </tr>
    <tr>
      <th>ens</th>
      <td>9.662886e+03</td>
      <td>3.246171e+01</td>
      <td>9.630424e+03</td>
      <td>1.649377e+05</td>
      <td>5.540953e+02</td>
      <td>1.643836e+05</td>
      <td>0.000116</td>
      <td>0.000001</td>
      <td>0.000161</td>
    </tr>
    <tr>
      <th>pax</th>
      <td>2.232882e+05</td>
      <td>9.878619e+04</td>
      <td>1.245020e+05</td>
      <td>2.230426e+05</td>
      <td>9.867752e+04</td>
      <td>1.243650e+05</td>
      <td>0.000156</td>
      <td>0.000243</td>
      <td>0.000122</td>
    </tr>
    <tr>
      <th>bal</th>
      <td>6.268700e+04</td>
      <td>3.412654e+03</td>
      <td>5.927435e+04</td>
      <td>1.179639e+05</td>
      <td>6.421906e+03</td>
      <td>1.115420e+05</td>
      <td>0.000083</td>
      <td>0.000016</td>
      <td>0.000109</td>
    </tr>
    <tr>
      <th>ust</th>
      <td>6.376942e+06</td>
      <td>3.072693e+05</td>
      <td>6.069673e+06</td>
      <td>1.008426e+05</td>
      <td>4.859042e+03</td>
      <td>9.598354e+04</td>
      <td>0.000071</td>
      <td>0.000012</td>
      <td>0.000094</td>
    </tr>
    <tr>
      <th>zrx</th>
      <td>2.991495e+05</td>
      <td>5.286589e+03</td>
      <td>2.938629e+05</td>
      <td>8.539145e+04</td>
      <td>1.509043e+03</td>
      <td>8.388240e+04</td>
      <td>0.000060</td>
      <td>0.000004</td>
      <td>0.000082</td>
    </tr>
    <tr>
      <th>lusd</th>
      <td>1.400053e+05</td>
      <td>6.758067e+04</td>
      <td>7.242468e+04</td>
      <td>1.402208e+05</td>
      <td>6.768465e+04</td>
      <td>7.253612e+04</td>
      <td>0.000098</td>
      <td>0.000167</td>
      <td>0.000071</td>
    </tr>
    <tr>
      <th>cvx</th>
      <td>3.273990e+04</td>
      <td>1.431574e+02</td>
      <td>3.259674e+04</td>
      <td>6.793369e+04</td>
      <td>2.970447e+02</td>
      <td>6.763665e+04</td>
      <td>0.000048</td>
      <td>0.000001</td>
      <td>0.000066</td>
    </tr>
    <tr>
      <th>ren</th>
      <td>1.751237e+06</td>
      <td>6.674971e+03</td>
      <td>1.744562e+06</td>
      <td>6.387429e+04</td>
      <td>2.434617e+02</td>
      <td>6.363083e+04</td>
      <td>0.000045</td>
      <td>0.000001</td>
      <td>0.000062</td>
    </tr>
    <tr>
      <th>bat</th>
      <td>3.408284e+05</td>
      <td>6.688293e+03</td>
      <td>3.341401e+05</td>
      <td>5.516907e+04</td>
      <td>1.082618e+03</td>
      <td>5.408645e+04</td>
      <td>0.000039</td>
      <td>0.000003</td>
      <td>0.000053</td>
    </tr>
    <tr>
      <th>enj</th>
      <td>2.995886e+05</td>
      <td>1.112759e+05</td>
      <td>1.883127e+05</td>
      <td>4.177576e+04</td>
      <td>1.551673e+04</td>
      <td>2.625904e+04</td>
      <td>0.000029</td>
      <td>0.000038</td>
      <td>0.000026</td>
    </tr>
    <tr>
      <th>1inch</th>
      <td>5.657839e+04</td>
      <td>1.219116e+03</td>
      <td>5.535927e+04</td>
      <td>1.553513e+04</td>
      <td>3.347413e+02</td>
      <td>1.520039e+04</td>
      <td>0.000011</td>
      <td>0.000001</td>
      <td>0.000015</td>
    </tr>
    <tr>
      <th>knc</th>
      <td>3.336445e+04</td>
      <td>1.363030e+04</td>
      <td>1.973416e+04</td>
      <td>1.466142e+04</td>
      <td>5.989595e+03</td>
      <td>8.671830e+03</td>
      <td>0.000010</td>
      <td>0.000015</td>
      <td>0.000008</td>
    </tr>
    <tr>
      <th>fei_eth</th>
      <td>1.063611e+04</td>
      <td>3.182319e+03</td>
      <td>7.453792e+03</td>
      <td>1.033872e+04</td>
      <td>3.093340e+03</td>
      <td>7.245379e+03</td>
      <td>0.000007</td>
      <td>0.000008</td>
      <td>0.000007</td>
    </tr>
    <tr>
      <th>ampl</th>
      <td>1.962089e+05</td>
      <td>1.899856e+05</td>
      <td>6.223288e+03</td>
      <td>1.959969e+05</td>
      <td>1.897803e+05</td>
      <td>6.216565e+03</td>
      <td>0.000137</td>
      <td>0.000468</td>
      <td>0.000006</td>
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
      <td>1.136031e+03</td>
      <td>4.117542e+02</td>
      <td>7.242772e+02</td>
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
      <td>4.262820e+05</td>
      <td>3.952055e+02</td>
      <td>4.258868e+05</td>
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
      <td>$423,785,938.48</td>
    </tr>
    <tr>
      <th>wbtc</th>
      <td>$294,937,452.87</td>
    </tr>
    <tr>
      <th>weth</th>
      <td>$229,191,298.80</td>
    </tr>
    <tr>
      <th>usdt_eth</th>
      <td>$21,564,679.98</td>
    </tr>
    <tr>
      <th>link</th>
      <td>$15,528,470.80</td>
    </tr>
    <tr>
      <th>usdc</th>
      <td>$12,279,670.48</td>
    </tr>
    <tr>
      <th>dai</th>
      <td>$9,678,108.26</td>
    </tr>
    <tr>
      <th>aave</th>
      <td>$6,688,833.55</td>
    </tr>
    <tr>
      <th>mkr</th>
      <td>$2,476,879.70</td>
    </tr>
    <tr>
      <th>crv</th>
      <td>$747,738.24</td>
    </tr>
    <tr>
      <th>other</th>
      <td>$4,745,881.92</td>
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

    2024-09-06 01:16:03 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:03 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:03 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:03 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:03 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:03 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:03 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:03 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:03 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:03 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:03 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:03 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:03 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:03 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:03 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:03 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:03 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:03 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:03 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:03 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:03 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:03 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:03 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:03 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:03 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:03 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:03 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:03 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:03 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:03 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:03 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:03 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:03 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:03 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:03 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:03 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:03 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:03 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:03 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:03 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:03 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:03 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:03 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:03 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:03 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:03 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:03 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:03 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:03 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:03 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:03 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:03 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:03 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:03 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:03 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:03 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:03 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:03 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:03 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:03 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:03 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:03 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:03 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:03 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:03 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:03 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:03 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:03 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:03 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:03 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:03 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:03 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:03 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:03 WARNING  findfont: Font family 'Lato' not found.



    
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
      <th>2023-09-07</th>
      <td>aave_v2_eth</td>
      <td>2.207861e+09</td>
    </tr>
    <tr>
      <th>2023-09-08</th>
      <td>aave_v2_eth</td>
      <td>2.233808e+09</td>
    </tr>
    <tr>
      <th>2023-09-09</th>
      <td>aave_v2_eth</td>
      <td>2.219617e+09</td>
    </tr>
    <tr>
      <th>2023-09-10</th>
      <td>aave_v2_eth</td>
      <td>2.217438e+09</td>
    </tr>
    <tr>
      <th>2023-09-11</th>
      <td>aave_v2_eth</td>
      <td>2.193551e+09</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>2024-09-01</th>
      <td>aave_v2_eth</td>
      <td>1.049055e+09</td>
    </tr>
    <tr>
      <th>2024-09-02</th>
      <td>aave_v2_eth</td>
      <td>1.016343e+09</td>
    </tr>
    <tr>
      <th>2024-09-03</th>
      <td>aave_v2_eth</td>
      <td>1.050234e+09</td>
    </tr>
    <tr>
      <th>2024-09-04</th>
      <td>aave_v2_eth</td>
      <td>1.015958e+09</td>
    </tr>
    <tr>
      <th>2024-09-05</th>
      <td>aave_v2_eth</td>
      <td>1.021625e+09</td>
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

    2024-09-06 01:16:04 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:04 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:04 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:04 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:04 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:04 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:04 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:04 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:04 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:04 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:04 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:04 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:04 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:04 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:04 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:04 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:04 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:04 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:04 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:04 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:04 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:04 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:04 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:04 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:04 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:04 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:04 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:04 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:04 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:04 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:04 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:04 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:04 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:04 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:04 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:04 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:04 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:04 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:04 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:04 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:04 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:04 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:04 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:04 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:04 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:04 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:04 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:04 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:04 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:04 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:05 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:05 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:05 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:05 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:05 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:05 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:05 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:05 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:05 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:05 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:05 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:05 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:05 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:05 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:05 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:05 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:05 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:05 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:05 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:05 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:05 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:05 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:05 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:05 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:05 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:05 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:05 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:05 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:05 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:05 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:05 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:05 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:05 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:05 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:05 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:05 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:05 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:05 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:05 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:05 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:05 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:05 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:05 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:05 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:05 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:05 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:05 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:05 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:05 WARNING  findfont: Font family 'Lato' not found.
    2024-09-06 01:16:05 WARNING  findfont: Font family 'Lato' not found.



    
![png](output_19_1.png)
    

