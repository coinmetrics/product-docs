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
from pytz import timezone as timezone_conv
from datetime import timezone as timezone_info
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
# We recommend privately storing your API key in your local environment.
try:
    api_key = environ["CM_API_KEY"]
    logging.info("Using API key found in environment")
except KeyError:
    api_key = ""
    logging.info("API key not found. Using community client")


client = CoinMetricsClient(api_key)
```

    2024-09-12 08:45:52 INFO     Using API key found in environment


# Market Cap Based on Verified On-Chain Supply


In order to trustlessly verify market capitalization, Coin Metrics directly indexes the blockchain to independently validate the amount of circulating supply.

The **CapMrktCurUSD** metric offers the most reliable measure of asset supply, with the trade-off of slightly limited asset coverage.


```python
catalog_cur = client.catalog_asset_metrics(metrics='CapMrktCurUSD').to_dataframe()
```

    2024-09-12 08:45:52 WARNING  /catalog/ endpoints will be deprecated in the future. Consider using /catalog-v2/ and /reference-data/ endpoints instead.



```python
catalog_cur
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
      <th>display_name</th>
      <th>frequency</th>
      <th>asset</th>
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
      <td>Market Cap (USD)</td>
      <td>1d</td>
      <td>1inch</td>
    </tr>
    <tr>
      <th>1</th>
      <td>CapMrktCurUSD</td>
      <td>Capitalization, market, current supply, USD</td>
      <td>The sum USD value of the current supply. Also ...</td>
      <td>Network Data</td>
      <td>Market</td>
      <td>Market Capitalization</td>
      <td>USD</td>
      <td>decimal</td>
      <td>Product</td>
      <td>Market Cap (USD)</td>
      <td>1d</td>
      <td>aave</td>
    </tr>
    <tr>
      <th>2</th>
      <td>CapMrktCurUSD</td>
      <td>Capitalization, market, current supply, USD</td>
      <td>The sum USD value of the current supply. Also ...</td>
      <td>Network Data</td>
      <td>Market</td>
      <td>Market Capitalization</td>
      <td>USD</td>
      <td>decimal</td>
      <td>Product</td>
      <td>Market Cap (USD)</td>
      <td>1d</td>
      <td>ada</td>
    </tr>
    <tr>
      <th>3</th>
      <td>CapMrktCurUSD</td>
      <td>Capitalization, market, current supply, USD</td>
      <td>The sum USD value of the current supply. Also ...</td>
      <td>Network Data</td>
      <td>Market</td>
      <td>Market Capitalization</td>
      <td>USD</td>
      <td>decimal</td>
      <td>Product</td>
      <td>Market Cap (USD)</td>
      <td>1d</td>
      <td>ae_eth</td>
    </tr>
    <tr>
      <th>4</th>
      <td>CapMrktCurUSD</td>
      <td>Capitalization, market, current supply, USD</td>
      <td>The sum USD value of the current supply. Also ...</td>
      <td>Network Data</td>
      <td>Market</td>
      <td>Market Capitalization</td>
      <td>USD</td>
      <td>decimal</td>
      <td>Product</td>
      <td>Market Cap (USD)</td>
      <td>1d</td>
      <td>aion_eth</td>
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
    </tr>
    <tr>
      <th>148</th>
      <td>CapMrktCurUSD</td>
      <td>Capitalization, market, current supply, USD</td>
      <td>The sum USD value of the current supply. Also ...</td>
      <td>Network Data</td>
      <td>Market</td>
      <td>Market Capitalization</td>
      <td>USD</td>
      <td>decimal</td>
      <td>Product</td>
      <td>Market Cap (USD)</td>
      <td>1d</td>
      <td>xvg</td>
    </tr>
    <tr>
      <th>149</th>
      <td>CapMrktCurUSD</td>
      <td>Capitalization, market, current supply, USD</td>
      <td>The sum USD value of the current supply. Also ...</td>
      <td>Network Data</td>
      <td>Market</td>
      <td>Market Capitalization</td>
      <td>USD</td>
      <td>decimal</td>
      <td>Product</td>
      <td>Market Cap (USD)</td>
      <td>1d</td>
      <td>yfi</td>
    </tr>
    <tr>
      <th>150</th>
      <td>CapMrktCurUSD</td>
      <td>Capitalization, market, current supply, USD</td>
      <td>The sum USD value of the current supply. Also ...</td>
      <td>Network Data</td>
      <td>Market</td>
      <td>Market Capitalization</td>
      <td>USD</td>
      <td>decimal</td>
      <td>Product</td>
      <td>Market Cap (USD)</td>
      <td>1d</td>
      <td>zec</td>
    </tr>
    <tr>
      <th>151</th>
      <td>CapMrktCurUSD</td>
      <td>Capitalization, market, current supply, USD</td>
      <td>The sum USD value of the current supply. Also ...</td>
      <td>Network Data</td>
      <td>Market</td>
      <td>Market Capitalization</td>
      <td>USD</td>
      <td>decimal</td>
      <td>Product</td>
      <td>Market Cap (USD)</td>
      <td>1d</td>
      <td>zil_eth</td>
    </tr>
    <tr>
      <th>152</th>
      <td>CapMrktCurUSD</td>
      <td>Capitalization, market, current supply, USD</td>
      <td>The sum USD value of the current supply. Also ...</td>
      <td>Network Data</td>
      <td>Market</td>
      <td>Market Capitalization</td>
      <td>USD</td>
      <td>decimal</td>
      <td>Product</td>
      <td>Market Cap (USD)</td>
      <td>1d</td>
      <td>zrx</td>
    </tr>
  </tbody>
</table>
<p>153 rows × 12 columns</p>
</div>




```python
cur_assets = catalog_cur['asset'].to_list()
```


```python
capmrktcur = client.get_asset_metrics(
    assets=cur_assets,
    metrics='CapMrktCurUSD',
    start_time='2023-01-01'
).to_dataframe()
```


```python
capmrktcur
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
      <td>2023-01-01 00:00:00+00:00</td>
      <td>578851371.621414</td>
    </tr>
    <tr>
      <th>1</th>
      <td>1inch</td>
      <td>2023-01-02 00:00:00+00:00</td>
      <td>593808264.113895</td>
    </tr>
    <tr>
      <th>2</th>
      <td>1inch</td>
      <td>2023-01-03 00:00:00+00:00</td>
      <td>578865051.831563</td>
    </tr>
    <tr>
      <th>3</th>
      <td>1inch</td>
      <td>2023-01-04 00:00:00+00:00</td>
      <td>593238406.963806</td>
    </tr>
    <tr>
      <th>4</th>
      <td>1inch</td>
      <td>2023-01-05 00:00:00+00:00</td>
      <td>582087444.014613</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>76257</th>
      <td>zrx</td>
      <td>2024-09-07 00:00:00+00:00</td>
      <td>267634066.088106</td>
    </tr>
    <tr>
      <th>76258</th>
      <td>zrx</td>
      <td>2024-09-08 00:00:00+00:00</td>
      <td>272160623.638388</td>
    </tr>
    <tr>
      <th>76259</th>
      <td>zrx</td>
      <td>2024-09-09 00:00:00+00:00</td>
      <td>284178629.703559</td>
    </tr>
    <tr>
      <th>76260</th>
      <td>zrx</td>
      <td>2024-09-10 00:00:00+00:00</td>
      <td>284095301.654262</td>
    </tr>
    <tr>
      <th>76261</th>
      <td>zrx</td>
      <td>2024-09-11 00:00:00+00:00</td>
      <td>277605159.385683</td>
    </tr>
  </tbody>
</table>
<p>76262 rows × 3 columns</p>
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
      <th>aion_eth</th>
      <th>algo</th>
      <th>alpha</th>
      <th>ant</th>
      <th>avaxc</th>
      <th>avaxp</th>
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
      <th>2023-01-01 00:00:00+00:00</th>
      <td>578851371.621414</td>
      <td>831948979.47479</td>
      <td>8451539587.658916</td>
      <td>18644020.73658</td>
      <td>12239502.169169</td>
      <td>1768591937.02466</td>
      <td>64544443.735012</td>
      <td>87115766.669661</td>
      <td>642762397.472898</td>
      <td>5214877209.377698</td>
      <td>...</td>
      <td>259171431.626701</td>
      <td>7639215755.457377</td>
      <td>2632860166.703537</td>
      <td>33837072510.297253</td>
      <td>44617153.21175</td>
      <td>188210406.42401</td>
      <td>493296665.484186</td>
      <td>2373211.820023</td>
      <td>150632510.143823</td>
      <td>7.873325e+11</td>
    </tr>
    <tr>
      <th>2023-01-02 00:00:00+00:00</th>
      <td>593808264.113895</td>
      <td>851020271.355582</td>
      <td>8597584057.884974</td>
      <td>18750678.426629</td>
      <td>12489769.069673</td>
      <td>1808468934.79715</td>
      <td>70578964.574366</td>
      <td>82316246.224697</td>
      <td>660974895.85718</td>
      <td>5361434821.170975</td>
      <td>...</td>
      <td>264143902.292725</td>
      <td>7775524994.847002</td>
      <td>2623167156.242698</td>
      <td>34867827771.112366</td>
      <td>45316887.023706</td>
      <td>197083185.633783</td>
      <td>525164426.16789</td>
      <td>2416318.633379</td>
      <td>156513969.521389</td>
      <td>7.940376e+11</td>
    </tr>
    <tr>
      <th>2023-01-03 00:00:00+00:00</th>
      <td>578865051.831563</td>
      <td>848435934.094928</td>
      <td>8554974393.535182</td>
      <td>18603370.747725</td>
      <td>12285150.03425</td>
      <td>1836672352.97871</td>
      <td>78137368.539352</td>
      <td>82452389.917058</td>
      <td>673225550.946419</td>
      <td>5459978201.137544</td>
      <td>...</td>
      <td>261878089.63144</td>
      <td>7756791760.323215</td>
      <td>2630851162.104404</td>
      <td>34377733338.76976</td>
      <td>44379933.98261</td>
      <td>195075319.020523</td>
      <td>530098822.525029</td>
      <td>2419972.145896</td>
      <td>154216182.925003</td>
      <td>7.921778e+11</td>
    </tr>
    <tr>
      <th>2023-01-04 00:00:00+00:00</th>
      <td>593238406.963806</td>
      <td>907987443.290126</td>
      <td>9067043606.220013</td>
      <td>19040490.687955</td>
      <td>12663854.867556</td>
      <td>1868734277.1305</td>
      <td>79853965.132896</td>
      <td>86452798.779089</td>
      <td>711448888.407065</td>
      <td>5806780114.686279</td>
      <td>...</td>
      <td>262182705.611528</td>
      <td>7768234798.194243</td>
      <td>2672828311.409489</td>
      <td>34742622565.624596</td>
      <td>44754796.11021</td>
      <td>197186290.329716</td>
      <td>539341616.426411</td>
      <td>2463067.806896</td>
      <td>158372682.672612</td>
      <td>8.047702e+11</td>
    </tr>
    <tr>
      <th>2023-01-05 00:00:00+00:00</th>
      <td>582087444.014613</td>
      <td>885704860.022093</td>
      <td>9109700818.250706</td>
      <td>18907681.595424</td>
      <td>12488676.830626</td>
      <td>1830604723.51768</td>
      <td>76922560.518855</td>
      <td>84904373.55696</td>
      <td>691102883.455612</td>
      <td>5640855253.242864</td>
      <td>...</td>
      <td>260788907.49254</td>
      <td>7668727105.103478</td>
      <td>2759477181.047567</td>
      <td>33801112192.113197</td>
      <td>44494924.556887</td>
      <td>197221242.89333</td>
      <td>527629675.08353</td>
      <td>2464707.363439</td>
      <td>156751762.072911</td>
      <td>8.000731e+11</td>
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
      <th>2024-09-07 00:00:00+00:00</th>
      <td>376115152.010272</td>
      <td>1998364083.531952</td>
      <td>11431583936.917015</td>
      <td>6944338.039345</td>
      <td>&lt;NA&gt;</td>
      <td>1204577720.23605</td>
      <td>51613663.005479</td>
      <td>233628127.390195</td>
      <td>2199723171.051611</td>
      <td>10370256439.311075</td>
      <td>...</td>
      <td>140905429.098824</td>
      <td>9323273396.52611</td>
      <td>2999861892.680227</td>
      <td>52430580030.55117</td>
      <td>5473041383.105303</td>
      <td>176190449.380923</td>
      <td>429194758.11444</td>
      <td>1735646.25364</td>
      <td>267634066.088106</td>
      <td>1.836560e+12</td>
    </tr>
    <tr>
      <th>2024-09-08 00:00:00+00:00</th>
      <td>375622828.020915</td>
      <td>2011917799.254128</td>
      <td>&lt;NA&gt;</td>
      <td>6944062.374262</td>
      <td>&lt;NA&gt;</td>
      <td>1253919889.26445</td>
      <td>53756045.116953</td>
      <td>229692778.299745</td>
      <td>2346524421.676602</td>
      <td>11064754050.725536</td>
      <td>...</td>
      <td>145166067.99447</td>
      <td>9474372324.624439</td>
      <td>3087179955.879978</td>
      <td>52941105640.203995</td>
      <td>5682094595.100723</td>
      <td>180032136.345333</td>
      <td>428858954.01059</td>
      <td>1757443.086217</td>
      <td>272160623.638388</td>
      <td>1.850814e+12</td>
    </tr>
    <tr>
      <th>2024-09-09 00:00:00+00:00</th>
      <td>395066098.198083</td>
      <td>2247865472.5736</td>
      <td>&lt;NA&gt;</td>
      <td>7201958.244965</td>
      <td>&lt;NA&gt;</td>
      <td>1280993081.19023</td>
      <td>56100567.517792</td>
      <td>233525136.063422</td>
      <td>2447746835.593971</td>
      <td>11382901480.707348</td>
      <td>...</td>
      <td>150819994.198272</td>
      <td>9812840447.756355</td>
      <td>3075210193.856463</td>
      <td>53988763627.705078</td>
      <td>6007566415.766265</td>
      <td>183561441.594406</td>
      <td>454987124.382952</td>
      <td>1819412.536767</td>
      <td>284178629.703559</td>
      <td>1.913523e+12</td>
    </tr>
    <tr>
      <th>2024-09-10 00:00:00+00:00</th>
      <td>390488771.174392</td>
      <td>2411089438.355552</td>
      <td>&lt;NA&gt;</td>
      <td>6981670.775403</td>
      <td>&lt;NA&gt;</td>
      <td>1292706651.92217</td>
      <td>58732306.029003</td>
      <td>240363973.1034</td>
      <td>2495883285.278121</td>
      <td>11597850724.476965</td>
      <td>...</td>
      <td>151821745.601129</td>
      <td>9909505346.092257</td>
      <td>3009040677.829431</td>
      <td>54111362800.362495</td>
      <td>6169571885.387193</td>
      <td>181744783.778183</td>
      <td>478226321.208768</td>
      <td>1827474.331853</td>
      <td>284095301.654262</td>
      <td>1.930948e+12</td>
    </tr>
    <tr>
      <th>2024-09-11 00:00:00+00:00</th>
      <td>370795675.998745</td>
      <td>2394157493.994128</td>
      <td>&lt;NA&gt;</td>
      <td>7086282.571463</td>
      <td>&lt;NA&gt;</td>
      <td>1272138738.08548</td>
      <td>55696931.758843</td>
      <td>236080888.610476</td>
      <td>2381194755.211256</td>
      <td>11102231898.578779</td>
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
  </tbody>
</table>
<p>620 rows × 143 columns</p>
</div>




```python
current_market_cap_last = capmrktcur_pivot['Total Cap'][-1]

formatted_market_cap = '${:,.2f}'.format(current_market_cap_last)

print('Current Market Cap based on verified on-chain supply: ' + formatted_market_cap)
```

    Current Market Cap based on verified on-chain supply: $1,915,254,245,828.67



```python
plt.figure(figsize=(13, 7))
capmrktcur_pivot['Total Cap'].plot(kind='area', stacked=True)

# Set the title and labels
plt.title('Total Crypto Market Cap \n(CapMrktCurUSD)\n',fontsize=16)
plt.xlabel('') 
plt.ylabel('Market Cap (USD)',fontsize=14)
plt.grid(True, alpha=0.3, linestyle='--')
formatter = mticker.FuncFormatter(lambda x, pos: '${:,.2f}T'.format(x/1000000000000))
plt.gca().yaxis.set_major_formatter(formatter)

plt.show()
```


    
![png](output_16_0.png)
    


# Estimated Market Cap

Due to the complexity of running blockchain nodes, some assets pose additional challenges in directly verifying supply data. Coin Metrics partners with CoinGecko to offer a "estimated supply" metric, sourced from a variety of third-party sources like token projects or blockchain explorers.

The **CapMrktEstUSD** metric offers slightly wider asset coverage, with the trade-off of leveraging more "trusted" sources for supply.


```python
catalog_est = client.catalog_asset_metrics(metrics='CapMrktEstUSD').to_dataframe()
```

    2024-09-12 08:47:05 WARNING  /catalog/ endpoints will be deprecated in the future. Consider using /catalog-v2/ and /reference-data/ endpoints instead.



```python
catalog_est
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
      <th>display_name</th>
      <th>frequency</th>
      <th>asset</th>
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
      <td>Market Cap Estimated (USD)</td>
      <td>1d</td>
      <td>1inch</td>
    </tr>
    <tr>
      <th>1</th>
      <td>CapMrktEstUSD</td>
      <td>Capitalization, market, estimated supply, USD</td>
      <td>The sum USD value of the estimated supply in c...</td>
      <td>Network Data</td>
      <td>Market</td>
      <td>Market Capitalization</td>
      <td>USD</td>
      <td>decimal</td>
      <td>Product</td>
      <td>Market Cap Estimated (USD)</td>
      <td>1d</td>
      <td>aave</td>
    </tr>
    <tr>
      <th>2</th>
      <td>CapMrktEstUSD</td>
      <td>Capitalization, market, estimated supply, USD</td>
      <td>The sum USD value of the estimated supply in c...</td>
      <td>Network Data</td>
      <td>Market</td>
      <td>Market Capitalization</td>
      <td>USD</td>
      <td>decimal</td>
      <td>Product</td>
      <td>Market Cap Estimated (USD)</td>
      <td>1d</td>
      <td>aca</td>
    </tr>
    <tr>
      <th>3</th>
      <td>CapMrktEstUSD</td>
      <td>Capitalization, market, estimated supply, USD</td>
      <td>The sum USD value of the estimated supply in c...</td>
      <td>Network Data</td>
      <td>Market</td>
      <td>Market Capitalization</td>
      <td>USD</td>
      <td>decimal</td>
      <td>Product</td>
      <td>Market Cap Estimated (USD)</td>
      <td>1d</td>
      <td>ach</td>
    </tr>
    <tr>
      <th>4</th>
      <td>CapMrktEstUSD</td>
      <td>Capitalization, market, estimated supply, USD</td>
      <td>The sum USD value of the estimated supply in c...</td>
      <td>Network Data</td>
      <td>Market</td>
      <td>Market Capitalization</td>
      <td>USD</td>
      <td>decimal</td>
      <td>Product</td>
      <td>Market Cap Estimated (USD)</td>
      <td>1d</td>
      <td>ada</td>
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
    </tr>
    <tr>
      <th>465</th>
      <td>CapMrktEstUSD</td>
      <td>Capitalization, market, estimated supply, USD</td>
      <td>The sum USD value of the estimated supply in c...</td>
      <td>Network Data</td>
      <td>Market</td>
      <td>Market Capitalization</td>
      <td>USD</td>
      <td>decimal</td>
      <td>Product</td>
      <td>Market Cap Estimated (USD)</td>
      <td>1d</td>
      <td>zk</td>
    </tr>
    <tr>
      <th>466</th>
      <td>CapMrktEstUSD</td>
      <td>Capitalization, market, estimated supply, USD</td>
      <td>The sum USD value of the estimated supply in c...</td>
      <td>Network Data</td>
      <td>Market</td>
      <td>Market Capitalization</td>
      <td>USD</td>
      <td>decimal</td>
      <td>Product</td>
      <td>Market Cap Estimated (USD)</td>
      <td>1d</td>
      <td>zkj</td>
    </tr>
    <tr>
      <th>467</th>
      <td>CapMrktEstUSD</td>
      <td>Capitalization, market, estimated supply, USD</td>
      <td>The sum USD value of the estimated supply in c...</td>
      <td>Network Data</td>
      <td>Market</td>
      <td>Market Capitalization</td>
      <td>USD</td>
      <td>decimal</td>
      <td>Product</td>
      <td>Market Cap Estimated (USD)</td>
      <td>1d</td>
      <td>zks</td>
    </tr>
    <tr>
      <th>468</th>
      <td>CapMrktEstUSD</td>
      <td>Capitalization, market, estimated supply, USD</td>
      <td>The sum USD value of the estimated supply in c...</td>
      <td>Network Data</td>
      <td>Market</td>
      <td>Market Capitalization</td>
      <td>USD</td>
      <td>decimal</td>
      <td>Product</td>
      <td>Market Cap Estimated (USD)</td>
      <td>1d</td>
      <td>zro</td>
    </tr>
    <tr>
      <th>469</th>
      <td>CapMrktEstUSD</td>
      <td>Capitalization, market, estimated supply, USD</td>
      <td>The sum USD value of the estimated supply in c...</td>
      <td>Network Data</td>
      <td>Market</td>
      <td>Market Capitalization</td>
      <td>USD</td>
      <td>decimal</td>
      <td>Product</td>
      <td>Market Cap Estimated (USD)</td>
      <td>1d</td>
      <td>zrx</td>
    </tr>
  </tbody>
</table>
<p>470 rows × 12 columns</p>
</div>




```python
est_assets = catalog_est['asset'].to_list()
```


```python
capmrktest = client.get_asset_metrics(
    assets=est_assets,
    metrics='CapMrktEstUSD',
    start_time='2023-01-01'
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

    Estimated Market Cap based on estimated supply (3rd-party sources): $2,047,071,310,148.15



```python
plt.figure(figsize=(13, 7))

capmrktest_pivot['Total Cap'].plot(kind='area', stacked=True, color='green')
plt.title('Total Crypto Market Cap \n(CapMrktEstUSD)\n',fontsize=16)
plt.xlabel('') 
plt.ylabel('Market Cap (USD)',fontsize=14)
plt.grid(True, alpha=0.3, linestyle='--')

formatter = mticker.FuncFormatter(lambda x, pos: '${:,.2f}T'.format(x/1000000000000))
plt.gca().yaxis.set_major_formatter(formatter)

plt.show()
```


    
![png](output_26_0.png)
    


# Free Float Market Cap

While traditional market capitalization metrics rely on circulating supply to quantify the aggregate value of an asset, circulating supply may not necessarily be the appropriate metric for measuring the liquid, readily-available count of units available on the markert.

Free Float Market Capitalization, or **CapMrktFFUSD**, is a measure of the market value of an asset’s supply that is issued and available to market participants. This excludes supply that is held by insiders (i.e. protocol treasuries), controlling investors, and long term strategic holders (units with 5+ years of inactivity).


```python
catalog_ff = client.catalog_asset_metrics(metrics='CapMrktFFUSD').to_dataframe()
```

    2024-09-12 08:52:13 WARNING  /catalog/ endpoints will be deprecated in the future. Consider using /catalog-v2/ and /reference-data/ endpoints instead.



```python
catalog_ff
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
      <th>display_name</th>
      <th>frequency</th>
      <th>asset</th>
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
      <td>Free Float Market Cap (USD)</td>
      <td>1d</td>
      <td>1inch</td>
    </tr>
    <tr>
      <th>1</th>
      <td>CapMrktFFUSD</td>
      <td>Capitalization, market, free float, USD</td>
      <td>The sum USD value of the current free float su...</td>
      <td>Network Data</td>
      <td>Market</td>
      <td>Market Capitalization</td>
      <td>USD</td>
      <td>decimal</td>
      <td>Product</td>
      <td>Free Float Market Cap (USD)</td>
      <td>1d</td>
      <td>aave</td>
    </tr>
    <tr>
      <th>2</th>
      <td>CapMrktFFUSD</td>
      <td>Capitalization, market, free float, USD</td>
      <td>The sum USD value of the current free float su...</td>
      <td>Network Data</td>
      <td>Market</td>
      <td>Market Capitalization</td>
      <td>USD</td>
      <td>decimal</td>
      <td>Product</td>
      <td>Free Float Market Cap (USD)</td>
      <td>1d</td>
      <td>ada</td>
    </tr>
    <tr>
      <th>3</th>
      <td>CapMrktFFUSD</td>
      <td>Capitalization, market, free float, USD</td>
      <td>The sum USD value of the current free float su...</td>
      <td>Network Data</td>
      <td>Market</td>
      <td>Market Capitalization</td>
      <td>USD</td>
      <td>decimal</td>
      <td>Product</td>
      <td>Free Float Market Cap (USD)</td>
      <td>1d</td>
      <td>aion_eth</td>
    </tr>
    <tr>
      <th>4</th>
      <td>CapMrktFFUSD</td>
      <td>Capitalization, market, free float, USD</td>
      <td>The sum USD value of the current free float su...</td>
      <td>Network Data</td>
      <td>Market</td>
      <td>Market Capitalization</td>
      <td>USD</td>
      <td>decimal</td>
      <td>Product</td>
      <td>Free Float Market Cap (USD)</td>
      <td>1d</td>
      <td>algo</td>
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
    </tr>
    <tr>
      <th>111</th>
      <td>CapMrktFFUSD</td>
      <td>Capitalization, market, free float, USD</td>
      <td>The sum USD value of the current free float su...</td>
      <td>Network Data</td>
      <td>Market</td>
      <td>Market Capitalization</td>
      <td>USD</td>
      <td>decimal</td>
      <td>Product</td>
      <td>Free Float Market Cap (USD)</td>
      <td>1d</td>
      <td>xvg</td>
    </tr>
    <tr>
      <th>112</th>
      <td>CapMrktFFUSD</td>
      <td>Capitalization, market, free float, USD</td>
      <td>The sum USD value of the current free float su...</td>
      <td>Network Data</td>
      <td>Market</td>
      <td>Market Capitalization</td>
      <td>USD</td>
      <td>decimal</td>
      <td>Product</td>
      <td>Free Float Market Cap (USD)</td>
      <td>1d</td>
      <td>yfi</td>
    </tr>
    <tr>
      <th>113</th>
      <td>CapMrktFFUSD</td>
      <td>Capitalization, market, free float, USD</td>
      <td>The sum USD value of the current free float su...</td>
      <td>Network Data</td>
      <td>Market</td>
      <td>Market Capitalization</td>
      <td>USD</td>
      <td>decimal</td>
      <td>Product</td>
      <td>Free Float Market Cap (USD)</td>
      <td>1d</td>
      <td>zec</td>
    </tr>
    <tr>
      <th>114</th>
      <td>CapMrktFFUSD</td>
      <td>Capitalization, market, free float, USD</td>
      <td>The sum USD value of the current free float su...</td>
      <td>Network Data</td>
      <td>Market</td>
      <td>Market Capitalization</td>
      <td>USD</td>
      <td>decimal</td>
      <td>Product</td>
      <td>Free Float Market Cap (USD)</td>
      <td>1d</td>
      <td>zil_eth</td>
    </tr>
    <tr>
      <th>115</th>
      <td>CapMrktFFUSD</td>
      <td>Capitalization, market, free float, USD</td>
      <td>The sum USD value of the current free float su...</td>
      <td>Network Data</td>
      <td>Market</td>
      <td>Market Capitalization</td>
      <td>USD</td>
      <td>decimal</td>
      <td>Product</td>
      <td>Free Float Market Cap (USD)</td>
      <td>1d</td>
      <td>zrx</td>
    </tr>
  </tbody>
</table>
<p>116 rows × 12 columns</p>
</div>



### Comparing BTC market capitalization with BTC free float market capitalization


```python
btc_ff_and_cur = client.get_asset_metrics(
    assets='btc',
    metrics=['CapMrktFFUSD','CapMrktCurUSD'],
    start_time='2020-01-01'
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
      <td>2020-01-01 00:00:00+00:00</td>
      <td>130044373322.333786</td>
      <td>101631140309.664062</td>
    </tr>
    <tr>
      <th>1</th>
      <td>btc</td>
      <td>2020-01-02 00:00:00+00:00</td>
      <td>125997729470.887527</td>
      <td>98470895441.043961</td>
    </tr>
    <tr>
      <th>2</th>
      <td>btc</td>
      <td>2020-01-03 00:00:00+00:00</td>
      <td>132696546617.941193</td>
      <td>103706959483.227219</td>
    </tr>
    <tr>
      <th>3</th>
      <td>btc</td>
      <td>2020-01-04 00:00:00+00:00</td>
      <td>133217241900.653427</td>
      <td>104115224222.326797</td>
    </tr>
    <tr>
      <th>4</th>
      <td>btc</td>
      <td>2020-01-05 00:00:00+00:00</td>
      <td>133275140628.500854</td>
      <td>104158964372.081024</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>1711</th>
      <td>btc</td>
      <td>2024-09-07 00:00:00+00:00</td>
      <td>1067863679558.064819</td>
      <td>739598957752.86499</td>
    </tr>
    <tr>
      <th>1712</th>
      <td>btc</td>
      <td>2024-09-08 00:00:00+00:00</td>
      <td>1083551229332.972778</td>
      <td>750404443775.692139</td>
    </tr>
    <tr>
      <th>1713</th>
      <td>btc</td>
      <td>2024-09-09 00:00:00+00:00</td>
      <td>1128541804948.678711</td>
      <td>781579665342.109009</td>
    </tr>
    <tr>
      <th>1714</th>
      <td>btc</td>
      <td>2024-09-10 00:00:00+00:00</td>
      <td>1139009699685.700439</td>
      <td>788835269431.339844</td>
    </tr>
    <tr>
      <th>1715</th>
      <td>btc</td>
      <td>2024-09-11 00:00:00+00:00</td>
      <td>1133986205007.474609</td>
      <td>785339554938.315308</td>
    </tr>
  </tbody>
</table>
<p>1716 rows × 4 columns</p>
</div>




```python
plt.figure(figsize=(13, 7))

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


    
![png](output_34_0.png)
    

