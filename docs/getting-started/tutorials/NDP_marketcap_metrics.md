<img src="https://5264302.fs1.hubspotusercontent-na1.net/hubfs/5264302/Demo%20Asset%20Resources/Demo%20Covers/CM-Demo-market_cap_metrics-Cover.png" width=1100 margin-left='auto' margin-right='auto'/>

This notebook demonstrates basic functionality offered by the Coin Metrics Python API Client and Network Data Pro.

Coin Metrics offers a vast assortment of data for hundreds of cryptoassets. The Python API Client allows for easy access to this data using Python without needing to create your own wrappers using `requests` and other such libraries.

## Resources
To understand the data that Coin Metrics offers, feel free to peruse the resources below.

- The [Coin Metrics API v4](https://docs.coinmetrics.io/api/v4) website contains the full set of endpoints and data offered by Coin Metrics.
- The [Coin Metrics Knowledge Base](https://docs.coinmetrics.io/info) gives detailed, conceptual explanations of the data that Coin Metrics offers.
- The [API Spec](https://coinmetrics.github.io/api-client-python/site/api_client.html) contains a full list of functions.

## Setup


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
import matplotlib.ticker as mticker
from matplotlib.dates import DateFormatter
from matplotlib.ticker import FuncFormatter
import matplotlib.pyplot as plt
import matplotlib.dates as mdates
%matplotlib inline
```


```python
logging.basicConfig(
    format='%(asctime)s %(levelname)-8s %(message)s',
    level=logging.INFO,
    datefmt='%Y-%m-%d %H:%M:%S'
)
```


```python
end_time = datetime.today().date()
start_time = end_time - timedelta(days=90)
```


```python

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

    2024-09-16 15:00:54 INFO     Using API key found in environment


# Market Cap Based on Verified On-Chain Supply


In order to trustlessly verify market capitalization, Coin Metrics directly indexes the blockchain to independently validate the amount of circulating supply.

The **CapMrktCurUSD** metric offers the most reliable measure of asset supply, with the trade-off of slightly limited asset coverage.


```python
df_reference_capmkrtcur = client.reference_data_asset_metrics(metrics='CapMrktCurUSD').to_dataframe()
```


```python
df_reference_capmkrtcur
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
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>CapMrktCurUSD</td>
      <td>Capitalization, market, current supply, USD</td>
      <td>The sum USD value of the current supply. Also ...</td>
      <td>Network Data</td>
      <td>Market</td>
      <td>Market Capitalization</td>
      <td>USD</td>
      <td>decimal</td>
      <td>Product</td>
    </tr>
  </tbody>
</table>
</div>




```python
list_capmrktcur_assets = [a['asset'] for a in client.catalog_asset_metrics_v2(metrics='CapMrktCurUSD')]
```


```python
print(f"Number of assets with Market Cap: {len(list_capmrktcur_assets)}")
```

    Number of assets with Market Cap: 153



```python
capmrktcur = client.get_asset_metrics(
    assets=list_capmrktcur_assets,
    metrics='CapMrktCurUSD',
    start_time=start_time,
    end_time=end_time,
    page_size=1000
).to_dataframe()
```


```python
capmrktcur.head()
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
      <th>CapMrktCurUSD</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1inch</td>
      <td>2024-06-18 00:00:00+00:00</td>
      <td>601806926.332868</td>
    </tr>
    <tr>
      <th>1</th>
      <td>1inch</td>
      <td>2024-06-19 00:00:00+00:00</td>
      <td>669292018.418909</td>
    </tr>
    <tr>
      <th>2</th>
      <td>1inch</td>
      <td>2024-06-20 00:00:00+00:00</td>
      <td>638964090.844949</td>
    </tr>
    <tr>
      <th>3</th>
      <td>1inch</td>
      <td>2024-06-21 00:00:00+00:00</td>
      <td>602574091.306198</td>
    </tr>
    <tr>
      <th>4</th>
      <td>1inch</td>
      <td>2024-06-22 00:00:00+00:00</td>
      <td>614578628.290457</td>
    </tr>
  </tbody>
</table>
</div>




```python
capmrktcur_pivot = capmrktcur.pivot(index='time',columns='asset',values='CapMrktCurUSD')
```


```python
capmrktcur_pivot['Total Cap'] = capmrktcur_pivot.sum(axis=1)
```


```python
capmrktcur_pivot
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
      <th>asset</th>
      <th>1inch</th>
      <th>aave</th>
      <th>ada</th>
      <th>ae_eth</th>
      <th>algo</th>
      <th>alpha</th>
      <th>ant</th>
      <th>avaxc</th>
      <th>avaxp</th>
      <th>avaxx</th>
      <th>...</th>
      <th>xem</th>
      <th>xlm</th>
      <th>xmr</th>
      <th>xrp</th>
      <th>xvg</th>
      <th>yfi</th>
      <th>zec</th>
      <th>zil_eth</th>
      <th>zrx</th>
      <th>Total Cap</th>
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
      <th>2024-06-18 00:00:00+00:00</th>
      <td>601806926.332868</td>
      <td>1306437999.295638</td>
      <td>13424730961.241064</td>
      <td>8832610.158148</td>
      <td>1339360258.68476</td>
      <td>80619082.899196</td>
      <td>352010549.615121</td>
      <td>2388322499.746325</td>
      <td>12838611730.911514</td>
      <td>713309094.675862</td>
      <td>...</td>
      <td>126980953.174033</td>
      <td>9610695086.9286</td>
      <td>3054203115.691232</td>
      <td>49052418232.612778</td>
      <td>6724446390.59112</td>
      <td>212203308.017145</td>
      <td>311270858.886043</td>
      <td>2305684.889749</td>
      <td>336195840.86146</td>
      <td>2.229542e+12</td>
    </tr>
    <tr>
      <th>2024-06-19 00:00:00+00:00</th>
      <td>669292018.418909</td>
      <td>1400637382.569757</td>
      <td>13423644078.574947</td>
      <td>9099450.288229</td>
      <td>1382363720.84246</td>
      <td>81094309.783218</td>
      <td>356082846.868479</td>
      <td>2414215130.39066</td>
      <td>12984873845.978542</td>
      <td>721319158.751801</td>
      <td>...</td>
      <td>126674840.822162</td>
      <td>9820585062.035196</td>
      <td>3020726381.652565</td>
      <td>49268483622.64537</td>
      <td>6829094885.807176</td>
      <td>217383791.66592</td>
      <td>303049562.236562</td>
      <td>2343771.624651</td>
      <td>353937035.765548</td>
      <td>2.237127e+12</td>
    </tr>
    <tr>
      <th>2024-06-20 00:00:00+00:00</th>
      <td>638964090.844949</td>
      <td>1358825403.114587</td>
      <td>13453912813.410269</td>
      <td>9227041.800181</td>
      <td>1383256522.94337</td>
      <td>84522774.743021</td>
      <td>350618174.842791</td>
      <td>2471190230.800348</td>
      <td>13321331442.85092</td>
      <td>739621942.386422</td>
      <td>...</td>
      <td>132373773.581515</td>
      <td>9896582194.97669</td>
      <td>3046146822.064857</td>
      <td>48866370533.68499</td>
      <td>6940480158.50313</td>
      <td>216572442.484699</td>
      <td>303519008.658101</td>
      <td>2350164.716928</td>
      <td>360417663.325525</td>
      <td>2.231134e+12</td>
    </tr>
    <tr>
      <th>2024-06-21 00:00:00+00:00</th>
      <td>602574091.306198</td>
      <td>1310711198.734895</td>
      <td>13174182377.372046</td>
      <td>9316984.240167</td>
      <td>1391489499.4855</td>
      <td>82641066.611264</td>
      <td>353348338.081292</td>
      <td>2456046637.217133</td>
      <td>13261561451.744013</td>
      <td>738741018.612855</td>
      <td>...</td>
      <td>129064560.654881</td>
      <td>9697203679.229527</td>
      <td>2863904454.917198</td>
      <td>48889782361.155952</td>
      <td>6827462838.701295</td>
      <td>213908822.241556</td>
      <td>304438515.678476</td>
      <td>2329727.25247</td>
      <td>359650229.244396</td>
      <td>2.214003e+12</td>
    </tr>
    <tr>
      <th>2024-06-22 00:00:00+00:00</th>
      <td>614578628.290457</td>
      <td>1303628383.546602</td>
      <td>13475267480.649416</td>
      <td>9080680.725316</td>
      <td>1339705315.54913</td>
      <td>81442254.171929</td>
      <td>351060582.670069</td>
      <td>2342337218.532271</td>
      <td>12381600154.273886</td>
      <td>639220357.617559</td>
      <td>...</td>
      <td>129465576.97741</td>
      <td>9581669381.902111</td>
      <td>2995259845.285223</td>
      <td>48655540991.974068</td>
      <td>7013277883.554922</td>
      <td>214667247.899236</td>
      <td>304854610.414748</td>
      <td>2373452.370937</td>
      <td>359377609.401009</td>
      <td>2.213118e+12</td>
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
      <th>2024-09-11 00:00:00+00:00</th>
      <td>370795675.998745</td>
      <td>2394157493.994128</td>
      <td>&lt;NA&gt;</td>
      <td>7086282.571463</td>
      <td>1272138738.08548</td>
      <td>55696931.758843</td>
      <td>236080888.610476</td>
      <td>2381194755.211256</td>
      <td>11102231898.578779</td>
      <td>561574500.581236</td>
      <td>...</td>
      <td>150087591.429489</td>
      <td>9790016731.104605</td>
      <td>3120199983.171181</td>
      <td>53527147783.98262</td>
      <td>6095473842.098846</td>
      <td>178156431.46414</td>
      <td>459255827.96882</td>
      <td>1810381.365383</td>
      <td>277605159.385683</td>
      <td>1.915254e+12</td>
    </tr>
    <tr>
      <th>2024-09-12 00:00:00+00:00</th>
      <td>384232522.92621</td>
      <td>2327005794.360288</td>
      <td>&lt;NA&gt;</td>
      <td>7371122.985217</td>
      <td>1299855257.21774</td>
      <td>57785093.830921</td>
      <td>236071341.779449</td>
      <td>2452806790.290408</td>
      <td>11431048630.015509</td>
      <td>578191291.778559</td>
      <td>...</td>
      <td>154361726.733294</td>
      <td>9997934147.338022</td>
      <td>3105706133.057552</td>
      <td>56215867452.010078</td>
      <td>6267860632.323607</td>
      <td>178663216.244342</td>
      <td>454920192.594087</td>
      <td>1848757.475975</td>
      <td>287032283.247654</td>
      <td>1.939759e+12</td>
    </tr>
    <tr>
      <th>2024-09-13 00:00:00+00:00</th>
      <td>400557336.250521</td>
      <td>2311665536.23392</td>
      <td>&lt;NA&gt;</td>
      <td>7832592.091806</td>
      <td>1330044901.28941</td>
      <td>58858736.968168</td>
      <td>240512223.869399</td>
      <td>2545118411.801699</td>
      <td>11866069991.509184</td>
      <td>600182210.371027</td>
      <td>...</td>
      <td>157141907.013232</td>
      <td>10153491708.845804</td>
      <td>3064948299.210351</td>
      <td>57221528978.257057</td>
      <td>6405467690.943713</td>
      <td>179478034.544076</td>
      <td>473244206.395726</td>
      <td>1885345.54056</td>
      <td>297832199.512269</td>
      <td>2.004984e+12</td>
    </tr>
    <tr>
      <th>2024-09-14 00:00:00+00:00</th>
      <td>393157001.05276</td>
      <td>2244118799.251264</td>
      <td>&lt;NA&gt;</td>
      <td>7425554.562711</td>
      <td>1312275710.52702</td>
      <td>59357434.029832</td>
      <td>241324187.737431</td>
      <td>2585622436.498027</td>
      <td>12055268780.843508</td>
      <td>609742449.013718</td>
      <td>...</td>
      <td>163021038.424844</td>
      <td>10239633535.133228</td>
      <td>3044883873.886052</td>
      <td>59683009523.175056</td>
      <td>6404671209.191757</td>
      <td>180551959.332886</td>
      <td>474742175.553408</td>
      <td>1876469.594495</td>
      <td>293961123.7075</td>
      <td>1.991043e+12</td>
    </tr>
    <tr>
      <th>2024-09-15 00:00:00+00:00</th>
      <td>368561790.184033</td>
      <td>2297900163.986864</td>
      <td>&lt;NA&gt;</td>
      <td>7423784.032991</td>
      <td>1265330435.59742</td>
      <td>56307463.023177</td>
      <td>237024036.656687</td>
      <td>2436809618.506954</td>
      <td>11348207028.418108</td>
      <td>574093158.696821</td>
      <td>...</td>
      <td>160791667.882743</td>
      <td>10027244938.128235</td>
      <td>3063351773.476915</td>
      <td>57120501674.456192</td>
      <td>6073655509.257232</td>
      <td>179087880.508707</td>
      <td>453729407.723865</td>
      <td>1816117.52146</td>
      <td>286316863.361929</td>
      <td>1.950918e+12</td>
    </tr>
  </tbody>
</table>
<p>90 rows × 137 columns</p>
</div>




```python
current_market_cap_last = capmrktcur_pivot['Total Cap'][-1]

formatted_market_cap = '${:,.2f}'.format(current_market_cap_last)

print('Current Market Cap based on verified on-chain supply: ' + formatted_market_cap)
```

    Current Market Cap based on verified on-chain supply: $1,950,918,193,666.17



```python
plt.figure(figsize=(8, 6))
capmrktcur_pivot['Total Cap'].plot(kind='area', stacked=True)

# Set the title and labels
plt.title('Total Crypto Market Cap \n(CapMrktCurUSD)\n',fontsize=16)
plt.xlabel('') 
plt.ylabel('Market Cap (USD)',fontsize=14)
plt.grid(True, alpha=0.3, linestyle='--')
formatter = mticker.FuncFormatter(lambda x, pos: '${:,.2f}T'.format(x/1000000000000))
plt.gca().yaxis.set_major_formatter(formatter)

plt.savefig("ndp_capmrktcurusd.png");
```


    
![png](output_19_0.png)
    


![CapMrktCurUSD](ndp_capmrktcurusd.png)

# Estimated Market Cap

Due to the complexity of running blockchain nodes, some assets pose additional challenges in directly verifying supply data. Coin Metrics partners with CoinGecko to offer a "estimated supply" metric, sourced from a variety of third-party sources like token projects or blockchain explorers.

The **CapMrktEstUSD** metric offers slightly wider asset coverage, with the trade-off of leveraging more "trusted" sources for supply.


```python
df_reference_capmrktest = client.reference_data_asset_metrics(metrics='CapMrktEstUSD').to_dataframe()
```


```python
df_reference_capmrktest
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
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>CapMrktEstUSD</td>
      <td>Capitalization, market, estimated supply, USD</td>
      <td>The sum USD value of the estimated supply in c...</td>
      <td>Network Data</td>
      <td>Market</td>
      <td>Market Capitalization</td>
      <td>USD</td>
      <td>decimal</td>
      <td>Product</td>
    </tr>
  </tbody>
</table>
</div>




```python
list_capmrktest_assets = [a['asset'] for a in client.catalog_asset_metrics_v2(metrics='CapMrktEstUSD')]
```


```python
capmrktest = client.get_asset_metrics(
    assets=list_capmrktest_assets,
    metrics='CapMrktEstUSD',
    start_time=start_time,
    end_time=end_time,
    page_size=10000
).to_dataframe()
```


```python
capmrktest_pivot = capmrktest.pivot(index='time',columns='asset',values='CapMrktEstUSD')
```


```python
capmrktest_pivot['Total Cap'] = capmrktest_pivot.sum(axis=1)
```


```python
est_market_cap_last = capmrktest_pivot['Total Cap'][-1]

formatted_est_market_cap = '${:,.2f}'.format(est_market_cap_last)

print('Estimated Market Cap based on estimated supply (3rd-party sources): ' + formatted_est_market_cap)
```

    Estimated Market Cap based on estimated supply (3rd-party sources): $2,084,782,376,216.38



```python
plt.figure(figsize=(8, 6))

capmrktest_pivot['Total Cap'].plot(kind='area', stacked=True, color='green')
plt.title('Total Crypto Market Cap \n(CapMrktEstUSD)\n',fontsize=16)
plt.xlabel('') 
plt.ylabel('Market Cap (USD)',fontsize=14)
plt.grid(True, alpha=0.3, linestyle='--')

formatter = mticker.FuncFormatter(lambda x, pos: '${:,.2f}T'.format(x/1000000000000))
plt.gca().yaxis.set_major_formatter(formatter)

plt.show()
```


    
![png](output_30_0.png)
    


# Free Float Market Cap

While traditional market capitalization metrics rely on circulating supply to quantify the aggregate value of an asset, circulating supply may not necessarily be the appropriate metric for measuring the liquid, readily-available count of units available on the markert.

Free Float Market Capitalization, or **CapMrktFFUSD**, is a measure of the market value of an asset’s supply that is issued and available to market participants. This excludes supply that is held by insiders (i.e. protocol treasuries), controlling investors, and long term strategic holders (units with 5+ years of inactivity).


```python
df_reference_capmrktffusd = client.reference_data_asset_metrics(metrics='CapMrktFFUSD').to_dataframe()
```


```python
df_reference_capmrktffusd
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
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>CapMrktFFUSD</td>
      <td>Capitalization, market, free float, USD</td>
      <td>The sum USD value of the current free float su...</td>
      <td>Network Data</td>
      <td>Market</td>
      <td>Market Capitalization</td>
      <td>USD</td>
      <td>decimal</td>
      <td>Product</td>
    </tr>
  </tbody>
</table>
</div>




```python
catalog_ff = client.catalog_asset_metrics_v2(metrics='CapMrktFFUSD').to_list()
```


```python
catalog_ff[:5]
```




    [{'asset': '1inch',
      'metrics': [{'metric': 'CapMrktFFUSD',
        'frequencies': [{'frequency': '1d',
          'min_time': '2020-12-26T00:00:00.000000000Z',
          'max_time': '2024-09-15T00:00:00.000000000Z',
          'community': True}]}]},
     {'asset': 'aave',
      'metrics': [{'metric': 'CapMrktFFUSD',
        'frequencies': [{'frequency': '1d',
          'min_time': '2020-10-10T00:00:00.000000000Z',
          'max_time': '2024-09-15T00:00:00.000000000Z',
          'community': True}]}]},
     {'asset': 'ada',
      'metrics': [{'metric': 'CapMrktFFUSD',
        'frequencies': [{'frequency': '1d',
          'min_time': '2017-12-01T00:00:00.000000000Z',
          'max_time': '2024-09-08T00:00:00.000000000Z',
          'community': True}]}]},
     {'asset': 'aion_eth',
      'metrics': [{'metric': 'CapMrktFFUSD',
        'frequencies': [{'frequency': '1d',
          'min_time': '2017-12-22T00:00:00.000000000Z',
          'max_time': '2023-03-03T00:00:00.000000000Z',
          'community': True}]}]},
     {'asset': 'algo',
      'metrics': [{'metric': 'CapMrktFFUSD',
        'frequencies': [{'frequency': '1d',
          'min_time': '2019-06-22T00:00:00.000000000Z',
          'max_time': '2024-09-15T00:00:00.000000000Z',
          'community': True}]}]}]



### Comparing BTC market capitalization with BTC free float market capitalization


```python
btc_ff_and_cur = client.get_asset_metrics(
    assets='btc',
    metrics=['CapMrktFFUSD','CapMrktCurUSD'],
    start_time=start_time,
    end_time=end_time
).to_dataframe()
```


```python
btc_ff_and_cur
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
      <th>CapMrktCurUSD</th>
      <th>CapMrktFFUSD</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>btc</td>
      <td>2024-06-18 00:00:00+00:00</td>
      <td>1283620750458.029053</td>
      <td>892930547450.634399</td>
    </tr>
    <tr>
      <th>1</th>
      <td>btc</td>
      <td>2024-06-19 00:00:00+00:00</td>
      <td>1279047103315.121094</td>
      <td>889718923157.247559</td>
    </tr>
    <tr>
      <th>2</th>
      <td>btc</td>
      <td>2024-06-20 00:00:00+00:00</td>
      <td>1279448394407.814453</td>
      <td>889934057173.784424</td>
    </tr>
    <tr>
      <th>3</th>
      <td>btc</td>
      <td>2024-06-21 00:00:00+00:00</td>
      <td>1263474830674.393311</td>
      <td>878772804275.674194</td>
    </tr>
    <tr>
      <th>4</th>
      <td>btc</td>
      <td>2024-06-22 00:00:00+00:00</td>
      <td>1266898089628.073975</td>
      <td>881035407234.292114</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>85</th>
      <td>btc</td>
      <td>2024-09-11 00:00:00+00:00</td>
      <td>1133986205007.474609</td>
      <td>785339554938.315308</td>
    </tr>
    <tr>
      <th>86</th>
      <td>btc</td>
      <td>2024-09-12 00:00:00+00:00</td>
      <td>1148145814023.138916</td>
      <td>795139187847.963867</td>
    </tr>
    <tr>
      <th>87</th>
      <td>btc</td>
      <td>2024-09-13 00:00:00+00:00</td>
      <td>1195818457804.406494</td>
      <td>828180803304.224121</td>
    </tr>
    <tr>
      <th>88</th>
      <td>btc</td>
      <td>2024-09-14 00:00:00+00:00</td>
      <td>1185380845498.997314</td>
      <td>820893975766.963257</td>
    </tr>
    <tr>
      <th>89</th>
      <td>btc</td>
      <td>2024-09-15 00:00:00+00:00</td>
      <td>1168079552742.053711</td>
      <td>808927520410.375</td>
    </tr>
  </tbody>
</table>
<p>90 rows × 4 columns</p>
</div>




```python
plt.figure(figsize=(8, 6))

plt.plot(btc_ff_and_cur['time'], btc_ff_and_cur['CapMrktCurUSD'] / 1e9, label='Market Cap', color='blue')
plt.plot(btc_ff_and_cur['time'], btc_ff_and_cur['CapMrktFFUSD'] / 1e9, label='Free Float Market Cap', color='green')

plt.title('Bitcoin Market Cap Over Time\n(Circulating vs. Free Float Supply)\n', fontsize=16)
plt.xlabel('')
plt.ylabel('Market Cap (USD)', fontsize=14)
plt.grid(True, alpha=0.3, linestyle='--')

formatter = mticker.FuncFormatter(lambda x, pos: '${:,.0f}B'.format(x))
plt.gca().yaxis.set_major_formatter(formatter)
plt.gca().xaxis.set_major_locator(mdates.AutoDateLocator())
plt.gca().xaxis.set_major_formatter(mdates.ConciseDateFormatter(mdates.AutoDateLocator()))

plt.legend()

plt.show()
```


    
![png](output_40_0.png)
    



```python

```
