# Calculating DEX Liquidity Pool Fees and Volumes

![](https://5264302.fs1.hubspotusercontent-na1.net/hubfs/5264302/Demo%20Asset%20Resources/Demo%20Covers/CM-Demo-dex\_data-Cover.png)

Decentralized exchanges are playing an increasingly important role in supporting cryptoasset trading, particularly when it comes to tokens using the ERC-20 standard. Coin Metrics has been actively working on collecting data from major DeFi protocols. For our first release, we have added support for all major liquidity pools on **Uniswap v2, Uniswap v3,** and **Sushiswap v1.**

### Resources

This notebook demonstrates basic functionality offered by the Coin Metrics Python API Client and DEX Market Data.

Coin Metrics offers a vast assortment of data for hundreds of cryptoassets. The Python API Client allows for easy access to this data using Python without needing to create your own wrappers using `requests` and other such libraries.

To understand the data that Coin Metrics offers, feel free to peruse the resources below.

* The [Coin Metrics API v4](https://docs.coinmetrics.io/api/v4) website contains the full set of endpoints and data offered by Coin Metrics.
* The [Coin Metrics Knowledge Base](https://docs.coinmetrics.io/info) gives detailed, conceptual explanations of the data that Coin Metrics offers.
* The [API Spec](https://coinmetrics.github.io/api-client-python/site/api\_client.html) contains a full list of functions.

### File Download

Download the entire notebook as either a jupyter notebook to run yourself or as a pdf from the two links below

{% file src="../../.gitbook/assets/DEFI - Dex Data.ipynb" %}

{% file src="../../.gitbook/assets/DEFI_dex_data.pdf" %}



### Setup

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
import plotly.express as px 
%matplotlib inline
```

```python
sns.set_theme()
sns.set_style('whitegrid')
sns.set(rc={'figure.figsize':(16,8)})
sns.set_context("notebook", font_scale=1.2, rc={"font.family": "Lato"});
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

```
2024-10-09 11:26:54 INFO     Using API key found in environment
```

## DEX Market Catalog

The _catalog/markets_ endpoint returns a list of available markets along with time ranges of available data. Users can pass in a list of markets, exchanges, or market types (spot, futures, options).

We can retrieve our DEX markets by fetching a list of all 'spot' markets, then filtering for the markets where the 'experimental' parameter equals _true_.

```python
spot_markets = pd.concat([client.reference_data_markets(
    type = 'spot',
    page_size = 10000,
    exchange = "uniswap_v3_eth",
).to_dataframe(), client.reference_data_markets(
    type = 'spot',
    page_size = 10000,
    exchange = "uniswap_v2_eth",
).to_dataframe(), client.reference_data_markets(
    type = 'spot',
    page_size = 10000,
    exchange = "sushiswap_v1_eth",
).to_dataframe()])
```

```python
exp_markets = spot_markets.loc[spot_markets['experimental']==True] 
```

```python
exp_markets
```

|     | market                                        | exchange           | base       | quote      | pair                  | symbol | type | size\_asset | margin\_asset | strike | ... | order\_price\_increment | order\_price\_min | order\_price\_max | order\_size\_min | order\_taker\_fee | order\_maker\_fee | margin\_trading\_enabled | experimental | base\_native | quote\_native |
| --- | --------------------------------------------- | ------------------ | ---------- | ---------- | --------------------- | ------ | ---- | ----------- | ------------- | ------ | --- | ----------------------- | ----------------- | ----------------- | ---------------- | ----------------- | ----------------- | ------------------------ | ------------ | ------------ | ------------- |
| 0   | uniswap\_v3\_eth-1-1inch-dai-spot             | uniswap\_v3\_eth   | 1inch      | dai        | 1inch-dai             | \<NA>  | spot | \<NA>       | \<NA>         | \<NA>  | ... | \<NA>                   | \<NA>             | \<NA>             | \<NA>            | \<NA>             | \<NA>             | \<NA>                    | True         | \<NA>        | \<NA>         |
| 1   | uniswap\_v3\_eth-1-1inch-usdc-spot            | uniswap\_v3\_eth   | 1inch      | usdc       | 1inch-usdc            | \<NA>  | spot | \<NA>       | \<NA>         | \<NA>  | ... | \<NA>                   | \<NA>             | \<NA>             | \<NA>            | \<NA>             | \<NA>             | \<NA>                    | True         | \<NA>        | \<NA>         |
| 2   | uniswap\_v3\_eth-1-1inch-weth-spot            | uniswap\_v3\_eth   | 1inch      | weth       | 1inch-weth            | \<NA>  | spot | \<NA>       | \<NA>         | \<NA>  | ... | \<NA>                   | \<NA>             | \<NA>             | \<NA>            | \<NA>             | \<NA>             | \<NA>                    | True         | \<NA>        | \<NA>         |
| 3   | uniswap\_v3\_eth-1-ageur\_eth-eurcv\_eth-spot | uniswap\_v3\_eth   | ageur\_eth | eurcv\_eth | ageur\_eth-eurcv\_eth | \<NA>  | spot | \<NA>       | \<NA>         | \<NA>  | ... | \<NA>                   | \<NA>             | \<NA>             | \<NA>            | \<NA>             | \<NA>             | \<NA>                    | True         | \<NA>        | \<NA>         |
| 4   | uniswap\_v3\_eth-1-ageur\_eth-usdc-spot       | uniswap\_v3\_eth   | ageur\_eth | usdc       | ageur\_eth-usdc       | \<NA>  | spot | \<NA>       | \<NA>         | \<NA>  | ... | \<NA>                   | \<NA>             | \<NA>             | \<NA>            | \<NA>             | \<NA>             | \<NA>                    | True         | \<NA>        | \<NA>         |
| ... | ...                                           | ...                | ...        | ...        | ...                   | ...    | ...  | ...         | ...           | ...    | ... | ...                     | ...               | ...               | ...              | ...               | ...               | ...                      | ...          | ...          | ...           |
| 220 | sushiswap\_v1\_eth-yfi-sushi-spot             | sushiswap\_v1\_eth | yfi        | sushi      | yfi-sushi             | \<NA>  | spot | \<NA>       | \<NA>         | \<NA>  | ... | \<NA>                   | \<NA>             | \<NA>             | \<NA>            | \<NA>             | \<NA>             | \<NA>                    | True         | \<NA>        | \<NA>         |
| 221 | sushiswap\_v1\_eth-yfi-usdc-spot              | sushiswap\_v1\_eth | yfi        | usdc       | yfi-usdc              | \<NA>  | spot | \<NA>       | \<NA>         | \<NA>  | ... | \<NA>                   | \<NA>             | \<NA>             | \<NA>            | \<NA>             | \<NA>             | \<NA>                    | True         | \<NA>        | \<NA>         |
| 222 | sushiswap\_v1\_eth-yfi-usdt\_eth-spot         | sushiswap\_v1\_eth | yfi        | usdt\_eth  | yfi-usdt\_eth         | \<NA>  | spot | \<NA>       | \<NA>         | \<NA>  | ... | \<NA>                   | \<NA>             | \<NA>             | \<NA>            | \<NA>             | \<NA>             | \<NA>                    | True         | \<NA>        | \<NA>         |
| 223 | sushiswap\_v1\_eth-yfi-wbtc-spot              | sushiswap\_v1\_eth | yfi        | wbtc       | yfi-wbtc              | \<NA>  | spot | \<NA>       | \<NA>         | \<NA>  | ... | \<NA>                   | \<NA>             | \<NA>             | \<NA>            | \<NA>             | \<NA>             | \<NA>                    | True         | \<NA>        | \<NA>         |
| 224 | sushiswap\_v1\_eth-yfi-weth-spot              | sushiswap\_v1\_eth | yfi        | weth       | yfi-weth              | \<NA>  | spot | \<NA>       | \<NA>         | \<NA>  | ... | \<NA>                   | \<NA>             | \<NA>             | \<NA>            | \<NA>             | \<NA>             | \<NA>                    | True         | \<NA>        | \<NA>         |

2544 rows × 39 columns

```python
# Calculate number of markets (pools) per DEX
mkt_counts = pd.DataFrame(exp_markets['exchange'].value_counts()).reset_index()
```

```python
print (mkt_counts)
```

```
           exchange  count
0    uniswap_v3_eth   1643
1    uniswap_v2_eth    676
2  sushiswap_v1_eth    225
```

```python
# Plot number of markets (pools) per DEX
ax1 = plt.subplot()
# mkt_counts['exchange'].plot(kind='bar', width=0.8, color=sns.color_palette('tab10'))
ax1.bar(x = mkt_counts['exchange'], height = mkt_counts['count'], color=sns.color_palette('tab10'))
plt.setp(ax1.get_xticklabels(), rotation=0)
ax1.set_facecolor("white")
plt.grid(color='black', linestyle='--', linewidth=0.2)
plt.title('\nCount of Markets \nby Decentralized Exchange\n', fontdict={'fontsize': 24, 'font': 'arial'})
# for i, v in enumerate(mkt_counts['exchange']):
ax1.set_xticks(range(len(mkt_counts['exchange'])))
ax1.set_xticklabels([label.get_text().upper() for label in ax1.get_xticklabels()], rotation=0, ha='center', va='top', fontsize=17)
plt.xticks(fontweight='bold')
plt.show()
```

<figure><img src="../../.gitbook/assets/DEFI_dex_data_market_count.png" alt=""><figcaption></figcaption></figure>



```python
# Show fields
pd.DataFrame(exp_markets.loc[exp_markets['exchange'] == 'uniswap_v3_eth'].iloc[0]).dropna()
```

|                      | 0                                        |
| -------------------- | ---------------------------------------- |
| market               | uniswap\_v3\_eth-1-1inch-dai-spot        |
| exchange             | uniswap\_v3\_eth                         |
| base                 | 1inch                                    |
| quote                | dai                                      |
| pair                 | 1inch-dai                                |
| type                 | spot                                     |
| pool\_config\_id     | 1                                        |
| contract\_address    | 063332bbf9f8385e4106919b5c6ae2e6a4f72228 |
| fee                  | 0.01                                     |
| price\_includes\_fee | False                                    |
| variable\_fee        | False                                    |
| base\_address        | 111111111117dc0aa78b770fa6a738034120c302 |
| quote\_address       | 6b175474e89094c44da98b954eedeac495271d0f |
| experimental         | True                                     |

#### DEX markets include metadata for 3 different smart contracts:

* **contract\_address:** The address of the liquidity pool contract. Each liquidity pool is a unique instance of a smart contract, deployed at a dedicated address. The pool contract holds both the base and the quote asset.
* **base\_address:** The address of the ERC-20 token contract associated with the _base_ asset.
* **quote\_address:** The address of the ERC-20 token contract associated with the _quote_ asset.

```python
# DEX fields
exp_markets[['pool_config_id','contract_address','base_address','quote_address','fee']]
```

|     | pool\_config\_id | contract\_address                        | base\_address                            | quote\_address                           | fee  |
| --- | ---------------- | ---------------------------------------- | ---------------------------------------- | ---------------------------------------- | ---- |
| 0   | 1                | 063332bbf9f8385e4106919b5c6ae2e6a4f72228 | 111111111117dc0aa78b770fa6a738034120c302 | 6b175474e89094c44da98b954eedeac495271d0f | 0.01 |
| 1   | 1                | 2ee7e6e459fffbbc655f09f2e1b3131abf98c397 | 111111111117dc0aa78b770fa6a738034120c302 | a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48 | 0.01 |
| 2   | 1                | 1d1284e43da1de5ee8dd6acbb03f3624cfbd872c | 111111111117dc0aa78b770fa6a738034120c302 | c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2 | 0.01 |
| 3   | 1                | f339217aa24e70eddf900f3b1a78eb9efcdea115 | 1a7e4e63778b4f12a199c062f3efdd288afcbce8 | 5f7827fdeb7c20b443265fc2f40845b715385ff2 | 0.01 |
| 4   | 1                | 735a26a57a0a0069dfabd41595a970faf5e1ee8b | 1a7e4e63778b4f12a199c062f3efdd288afcbce8 | a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48 | 0.01 |
| ... | ...              | ...                                      | ...                                      | ...                                      | ...  |
| 220 | \<NA>            | f173a7a055340c91dbdf3083ce3babaa7535a03c | 0bc529c00c6401aef6d220be8c6ea1667f6ad93e | 6b3595068778dd592e39a122f4f5a5cf09c90fe2 | 0.3  |
| 221 | \<NA>            | 3a5747cf4e21861e2d0d3d51a0e8737ab4dfadc8 | 0bc529c00c6401aef6d220be8c6ea1667f6ad93e | a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48 | 0.3  |
| 222 | \<NA>            | f5fbc6ca5c677f1c977ed3a064b9dda14c5e241b | 0bc529c00c6401aef6d220be8c6ea1667f6ad93e | dac17f958d2ee523a2206206994597c13d831ec7 | 0.3  |
| 223 | \<NA>            | 1d108372a83fbc3a0bfb7ca4d0e427449e7a5ca2 | 0bc529c00c6401aef6d220be8c6ea1667f6ad93e | 2260fac5e5542a773aa44fbcfedf7c193bc2c599 | 0.3  |
| 224 | \<NA>            | 088ee5007c98a9677165d78dd2109ae4a3d04d0c | 0bc529c00c6401aef6d220be8c6ea1667f6ad93e | c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2 | 0.3  |

2544 rows × 5 columns

Each liquidity pool is also associated with a corresponding fee percentage. With each trade, fees are distributed pro-rata to the pool's liquidity providers.

```python
# Range of pool fees
pool_fees = pd.DataFrame(exp_markets.fee.unique().dropna())
pool_fees
```

|   | 0    |
| - | ---- |
| 0 | 0.01 |
| 1 | 0.05 |
| 2 | 0.3  |
| 3 | 1.0  |

Due to the permissionless nature of provisioning a liquidity pool, users can easily add arbitrary ERC-20 tokens to the decentralized exchange. There are over 50,000 trading pairs available on Uniswap today. To prioritize only the most relevant and liquid markets, we cover the subset of markets where both tokens are part of Coin Metrics [reference rate coverage](https://docs.coinmetrics.io/asset-metrics/market/referenceratesusd).

```python
# Assets covered
asset_coverage = np.unique(exp_markets[['base', 'quote']].values)
print(asset_coverage)
print('\nTotal number of assets: \033[1m' + str(len(asset_coverage)) + '\033[0m\n')
```

```
['1inch' 'aave' 'ageur_eth' 'alcx' 'alpha' 'alusd' 'ampl_eth' 'ant' 'ape'
 'api3' 'audio' 'ausd_eth' 'axs_1_eth' 'axs_2_eth' 'badger' 'bal'
 'band_eth' 'bat' 'bit' 'bnb_eth' 'bnt' 'boost_eth' 'btm_eth' 'busd'
 'cbat' 'cbeth' 'ccomp' 'cdai' 'cel' 'cennz' 'ceth' 'chz_eth' 'comp' 'cro'
 'crv' 'crvusd_eth' 'cuni' 'cusdc' 'cusdcv3' 'cusdt' 'cvc' 'cvx' 'cwbtc'
 'czrx' 'dai' 'dar' 'degen_eth' 'deusd_eth' 'dgx' 'dorkl_eth' 'dpi' 'drgn'
 'eeth_eth' 'elf' 'eng' 'enj' 'ens' 'esd' 'ethos' 'ethx_eth' 'eul'
 'eurc_eth' 'eurcv_eth' 'eure_eth' 'eurs_eth' 'eurt_eth' 'fdusd_eth'
 'fei_eth' 'flx' 'fox_eth' 'frax_eth' 'frxeth_eth' 'ftm_eth' 'ftt' 'fun'
 'fwb' 'fxc_eth' 'fxs' 'gala' 'gbpt_eth' 'gho_eth' 'glm' 'gno' 'grt'
 'gt_eth' 'gusd' 'gyen_eth' 'hbot' 'hbtc' 'hedg' 'hex_eth' 'hpos10i_eth'
 'hpos1m_eth' 'ht' 'husd' 'idrt_eth' 'imx' 'inst' 'kin1' 'knc' 'ldo'
 'lend' 'leo_eth' 'link' 'linq_eth' 'looks' 'loom' 'lpt' 'ltx_eth'
 'lusd_eth' 'mana' 'matic_eth' 'mco' 'meth_eth' 'mim_eth' 'mkr_2_eth'
 'mnt' 'mpl' 'mtl_metal' 'myc' 'myth' 'nexo' 'nftx' 'nmr' 'ogn'
 'ohm_2_eth' 'okb' 'omg' 'ousd_eth' 'paid' 'parrot_eth' 'pax' 'paxg' 'pay'
 'pdt' 'pepe_eth' 'perp' 'pndc_eth' 'pog_eth' 'pol_eth' 'poly' 'pow_eth'
 'powr' 'ppt' 'pufeth_eth' 'pvpbot_eth' 'pxeth_eth' 'pyusd_eth' 'qash'
 'qnt' 'rad' 'radar' 'rai_eth' 'ren' 'renbtc' 'renfil_eth' 'rep_3_eth'
 'reth_eth' 'rev_eth' 'rez_eth' 'rlb_eth' 'rook' 'rseth_eth' 'rsr'
 'rsweth_eth' 'safe_eth' 'sai' 'salt' 'sand' 'sbtc_eth' 'sdai_eth'
 'seth_synthseth_eth' 'shepe_eth' 'shia_eth' 'shib' 'skl' 'slp_1_eth'
 'slp_2_eth' 'snt' 'snx_3_eth' 'socks' 'spell' 'srm' 'srn' 'steth_lido'
 'stg_eth' 'stkaave' 'stmx' 'stone_eth' 'storj' 'susd_eth' 'susde_eth'
 'sushi' 'sweth_eth' 'swise' 'swrv' 't_eth' 'taud_eth' 'tbtc_eth'
 'tcad_eth' 'tgbp_eth' 'thkd_eth' 'toke' 'trx_eth' 'tusd_2_eth' 'ubt'
 'uma' 'uni' 'univ2aaveweth_eth' 'univ2crvweth_eth' 'univ2daiweth_eth'
 'univ2snxweth_eth' 'univ2uniweth_eth' 'univ2wbtcweth_eth'
 'univ2yfiweth_eth' 'uqc_1_eth' 'uqc_2_eth' 'usd0_eth' 'usda_eth' 'usdc'
 'usdd_eth' 'usde_eth' 'usdk' 'usdn_eth' 'usdt_eth' 'usdv_eth' 'usdy_eth'
 'ustc.t_eth_wh' 'veri' 'wbtc' 'wcelo' 'wcusd' 'weeth_eth' 'weth' 'wluna'
 'wnxm' 'wsteth' 'wust' 'wzec' 'xai_silofinance_eth' 'xaut_1_eth'
 'xaut_2_eth' 'xchf' 'xidr_eth' 'xsgd_eth' 'xsushi' 'yama_eth' 'yfi' 'zrx']

Total number of assets: [1m249[0m

```

The majority of DEX assets trade against **Wrapped Ether (WETH)**. Note that Ethereum's native asset ETH is not supported in Uniswap V2/V3, as the asset was created prior to the ERC-20 standard. From the Uniswap documentation:

> "Unlike Uniswap V1 pools, V2 pairs do not support ETH directly, so ETH⇄ERC-20 pairs must be emulated with WETH. The motivation behind this choice was to remove ETH-specific code in the core, resulting in a leaner codebase. End users can be kept fully ignorant of this implementation detail, however, by simply wrapping/unwrapping ETH in the periphery."\
> [docs.uniswap.org](https://docs.uniswap.org/protocol/V2/concepts/protocol-overview/smart-contracts#weth)

```python
# Enter an asset ticker to see available 'base' and 'quote' markets
asset = 'weth'

selected_markets = exp_markets.loc[(exp_markets['base']==asset) | (exp_markets['quote']==asset)]
print('\nTotal number of ' + '\033[1m' + asset + '\033[0m' + ' markets: \n\033[1m' 
      + str(len(selected_markets)) + '\n')
```

```
Total number of [1mweth[0m markets: 
[1m847

```

#### Using the min\_time parameter, we can filter for the newest DEX liquidity pool deployed in our coverage

```python
defi_market_catalogs = pd.concat([client.catalog_market_trades_v2(
    market_type = 'spot',
    page_size = 10000,
    exchange = "uniswap_v3_eth",
).to_dataframe(), client.catalog_market_trades_v2(
    market_type = 'spot',
    page_size = 10000,
    exchange = "uniswap_v2_eth",
).to_dataframe(), client.catalog_market_trades_v2(
    market_type = 'spot',
    page_size = 10000,
    exchange = "sushiswap_v1_eth",
).to_dataframe()]).sort_values('min_time').reset_index()
```

```python
print (defi_market_catalogs)
```

```
      index                                      market  \
0       560               uniswap_v2_eth-usdc-weth-spot   
1       154                uniswap_v2_eth-dai-weth-spot   
2       152                uniswap_v2_eth-dai-usdc-spot   
3       387                uniswap_v2_eth-ren-usdc-spot   
4        85               uniswap_v2_eth-cdai-weth-spot   
...     ...                                         ...   
2012    207         uniswap_v3_eth-2-paxg-usdt_eth-spot   
2013    208       uniswap_v3_eth-2-paxg-xaut_2_eth-spot   
2014    302  uniswap_v3_eth-2-weeth_eth-pufeth_eth-spot   
2015     24    uniswap_v3_eth-1-deusd_eth-usdt_eth-spot   
2016    656   uniswap_v3_eth-3-usdt_eth-crvusd_eth-spot   

                      min_time                  max_time  
0    2020-05-05 21:09:32+00:00 2024-10-03 19:44:11+00:00  
1    2020-05-14 00:01:38+00:00 2024-10-03 19:22:47+00:00  
2    2020-05-15 02:18:16+00:00 2024-10-03 12:06:35+00:00  
3    2020-05-17 21:32:57+00:00 2024-09-03 22:31:59+00:00  
4    2020-05-18 17:18:03+00:00 2024-10-01 22:43:11+00:00  
...                        ...                       ...  
2012 2024-09-16 01:14:11+00:00 2024-09-17 01:00:23+00:00  
2013 2024-09-17 01:56:23+00:00 2024-09-28 12:37:23+00:00  
2014 2024-09-26 04:21:35+00:00 2024-10-03 09:49:59+00:00  
2015 2024-09-27 23:06:35+00:00 2024-10-03 10:26:47+00:00  
2016 2024-09-28 07:12:59+00:00 2024-10-03 18:50:35+00:00  

[2017 rows x 4 columns]
```

```python
# Check for the newest market
newest = defi_market_catalogs.loc[defi_market_catalogs['min_time'].idxmax()].dropna()
pd.DataFrame(newest)
```

|           | 2016                                          |
| --------- | --------------------------------------------- |
| index     | 656                                           |
| market    | uniswap\_v3\_eth-3-usdt\_eth-crvusd\_eth-spot |
| min\_time | 2024-09-28 07:12:59+00:00                     |
| max\_time | 2024-10-03 18:50:35+00:00                     |

## DEX Swaps Data

Swaps data is served through our existing _/timeseries/market-trades_ endpoint because swaps are conceptually identical to a trade. Users can see all the standard trade fields for a swap such as **time, price, and volume** but can also see defi-specific fields such as the **block height, block hash, transaction id, addresses involved** in the swap, and more.

```python
defi_market = 'uniswap_v3_eth-2-weth-usdt_eth-spot'
start = datetime.now() - timedelta(days=3)
end = datetime.now() - timedelta(hours=1)
```

```python
defi_trades = client.get_market_trades(
    markets=defi_market,
    start_time=start,
    end_time = end
).to_dataframe()
```

```python
defi_trades['amount'] = defi_trades['amount'].astype(float)
defi_trades.head()
```

|   | market                                 | time                      | coin\_metrics\_id                                 | amount   | price       | database\_time                   | side | block\_hash                                       | block\_height | txid                                              | initiator                                | sender                                   | beneficiary                              |
| - | -------------------------------------- | ------------------------- | ------------------------------------------------- | -------- | ----------- | -------------------------------- | ---- | ------------------------------------------------- | ------------- | ------------------------------------------------- | ---------------------------------------- | ---------------------------------------- | ---------------------------------------- |
| 0 | uniswap\_v3\_eth-2-weth-usdt\_eth-spot | 2024-09-30 15:53:23+00:00 | 04V5RQT2E04FT3C4GH7U1MGVR9VR7AUFALO31HO6QSOKR9... | 0.128299 | 2607.212871 | 2024-09-30 15:53:34.441041+00:00 | sell | a27008fe8d84844fe0da1fda7fb3abcf557030c706d731... | 20864491      | ae1fd1a682a4acfaddd474f06d9cbc7fe903435b465b65... | 8249187b3b1f22da84b1c82eb876a2004d60e5a7 | 3fc91a3afd70395cd496c647d5a6cc9d4b2b7fad | 3fc91a3afd70395cd496c647d5a6cc9d4b2b7fad |
| 1 | uniswap\_v3\_eth-2-weth-usdt\_eth-spot | 2024-09-30 15:55:11+00:00 | 04V5RT664167K4H7OBE0IQ00JBU0GG2K0O9O102M1TS37N... | 8.010022 | 2605.89657  | 2024-09-30 15:55:23.154367+00:00 | sell | c6204c7a1227c2dc0968009afc08405406138080560f78... | 20864500      | a585c10e6fa329213cfc758189b3dee4fbdd11f84b0090... | a172577031eafd8b03dce022533863fe988159cd | 51c72848c68a965f66fa7a88855f9f7784502a7f | 51c72848c68a965f66fa7a88855f9f7784502a7f |
| 2 | uniswap\_v3\_eth-2-weth-usdt\_eth-spot | 2024-09-30 15:55:35+00:00 | 04V5RTJ008QUN6D495DB7M93HLAHH6RUCO7GALPGLR6JRU... | 3.275656 | 2605.139188 | 2024-09-30 15:55:48.193560+00:00 | buy  | 600235eb99a4495ab3d9238d55189b7e660f055730aecd... | 20864502      | 983dd154bcd17d715def39a8a46e36d5b8f765f73bde82... | 8ae57a027c63fca8070d1bf38622321de8004c67 | ef1c6e67703c7bd7107eed8303fbe6ec2554bf6b | ef1c6e67703c7bd7107eed8303fbe6ec2554bf6b |
| 3 | uniswap\_v3\_eth-2-weth-usdt\_eth-spot | 2024-09-30 15:55:59+00:00 | 04V5RU5PJI877ESIO9ET0AAEOBK5UBINH6ER8NCIB3U2KG... | 6.002656 | 2604.703261 | 2024-09-30 15:56:09.664424+00:00 | sell | b99c9073bb92c25dd0294ec2e85f2e57899db45d9258fc... | 20864504      | cb9eda573eef860fe7019837c23a66b881e5e4b28549e7... | d1fa51f2db23a9fa9d7bb8437b89fb2e70c60cb7 | d4bc53434c5e12cb41381a556c3c47e1a86e80e3 | d4bc53434c5e12cb41381a556c3c47e1a86e80e3 |
| 4 | uniswap\_v3\_eth-2-weth-usdt\_eth-spot | 2024-09-30 15:56:11+00:00 | 04V5RUDJMTR74RDCP4JUIDIL6UN9UTSE7MEBP0BR3USP60... | 0.399800 | 2603.679987 | 2024-09-30 15:56:23.744604+00:00 | sell | b3b776726dacc927e9365537ae9f778e3d9cbc817b1fb9... | 20864505      | 0083045534c1203964355113751c48cb79f262f70edcf7... | 81fe73a6fb28c49c14c82fcae2a4fe19f57d150c | 3fc91a3afd70395cd496c647d5a6cc9d4b2b7fad | 3fc91a3afd70395cd496c647d5a6cc9d4b2b7fad |

```python
color_map = {'buy': 'green', 'sell': 'red'}
defi_price = plt.scatter(x=defi_trades['time'], y=defi_trades['price'], s=defi_trades['amount'], c=defi_trades['side'].map(color_map))

plt.xlabel("", fontsize=15)
plt.ylabel("Price (USDT)\n", font='arial',fontsize=15)

market_string = defi_market.split("uniswap_v3_eth-", 1)[-1].split("-spot")[0].upper()
plt.title('\nUniswap V3\n Pool ' + market_string + '\nTrades\n', font='arial', size=20)

legend_labels = ['BUY', 'SELL']
legend_handles = [plt.Line2D([0], [0], marker='o', color='w', markerfacecolor=color_map['buy'], markersize=12),
                  plt.Line2D([0], [0], marker='o', color='w', markerfacecolor=color_map['sell'], markersize=12)]
legend = plt.legend(legend_handles, legend_labels, loc='lower right', fontsize=16, framealpha=0, bbox_to_anchor=(0.99, 1.02))

plt.gca().set_facecolor('white')
plt.grid(color='black', linestyle='dotted')
plt.show()

```

<figure><img src="../../.gitbook/assets/DEFI_dex_data_buy_sells.png" alt=""><figcaption></figcaption></figure>



```python
pd.DataFrame(defi_trades.iloc[0])
```

|                   | 0                                                 |
| ----------------- | ------------------------------------------------- |
| market            | uniswap\_v3\_eth-2-weth-usdt\_eth-spot            |
| time              | 2024-09-30 15:53:23+00:00                         |
| coin\_metrics\_id | 04V5RQT2E04FT3C4GH7U1MGVR9VR7AUFALO31HO6QSOKR9... |
| amount            | 0.128299                                          |
| price             | 2607.212871                                       |
| database\_time    | 2024-09-30 15:53:34.441041+00:00                  |
| side              | sell                                              |
| block\_hash       | a27008fe8d84844fe0da1fda7fb3abcf557030c706d731... |
| block\_height     | 20864491                                          |
| txid              | ae1fd1a682a4acfaddd474f06d9cbc7fe903435b465b65... |
| initiator         | 8249187b3b1f22da84b1c82eb876a2004d60e5a7          |
| sender            | 3fc91a3afd70395cd496c647d5a6cc9d4b2b7fad          |
| beneficiary       | 3fc91a3afd70395cd496c647d5a6cc9d4b2b7fad          |

#### Unlike centralized exchanges, where there is an unknown buyer and a seller, each swap is associated with 3 different Ethereum addresses:

* **Initiator** is the ethereum address which submitted the transaction as a result of which the swap/liquidity action occurred
* **Sender** is the ethereum address that invoked the uniswap pool smart contract's function for swapping or adding/removing liquidity
* **Beneficiary** is the ethereum address that got credited with the output tokens (in case of a swap or liquidity removal) or with liquidity (in case of liquidity addition)

```python
print('\nTotal number of ' + '\033[1m' + defi_market + '\033[0m' + ' trades (' + str(start.date()) + ' to ' + str(end.date()) + '): \n\033[1m' 
      + str(len(defi_trades)) + '\033[0m\n')

print('\nTotal number of ' + '\033[1m' + defi_market + '\033[0m' + ' buys (' + str(start.date()) + ' to ' + str(end.date())+ '): \n\033[1m' 
      + str(len(defi_trades.loc[(defi_trades['side']=='buy')])) + '\033[0m\n')

print('\nTotal number of ' + '\033[1m' + defi_market + '\033[0m' + ' unique buyers (' + str(start.date()) + ' to ' + str(end.date()) + '): \n\033[1m' 
      + str(len((defi_trades.loc[(defi_trades['side']=='buy')]).beneficiary.unique())) + '\n')
```

```
Total number of [1muniswap_v3_eth-2-weth-usdt_eth-spot[0m trades (2024-10-06 to 2024-10-09): 
[1m5874[0m


Total number of [1muniswap_v3_eth-2-weth-usdt_eth-spot[0m buys (2024-10-06 to 2024-10-09): 
[1m3003[0m


Total number of [1muniswap_v3_eth-2-weth-usdt_eth-spot[0m unique buyers (2024-10-06 to 2024-10-09): 
[1m351

```

```python
defi_buyers = pd.DataFrame(defi_trades)
defi_buyers['time'] = pd.to_datetime(defi_buyers['time'])
defi_buyers.set_index('time', inplace=True)
```

```python
hourly_unique_buyers = defi_buyers['beneficiary'].resample('h').nunique()
sns.set_style('whitegrid')
fig, ax = plt.subplots()
sns.lineplot(data=hourly_unique_buyers, ax=ax)
ax.set_xlabel('')
ax.set_ylabel('Unique Buyers per Hour')
ax.set_title('\nPool ' + str(market_string) + '\nUnique Buyers per Hour\n', font='arial', size=20)
plt.grid(color='black', linestyle='dotted')
plt.show()
```

<figure><img src="../../.gitbook/assets/DEFI_dex_data_buyers_per_hour.png" alt=""><figcaption></figcaption></figure>



```python
# Unique buyer addresses
((defi_trades.loc[(defi_trades['side']=='buy')]).beneficiary.unique())
```

```
<StringArray>
['1111111254eeb25477b68fb85ed929f73a960582',
 '5ced44f03ff443bbe14d8ea23bc24425fb89e3ed',
 '2bbf5243e49e8f0025988754dac6620ab0d3e162',
 '308c6fbd6a14881af333649f17f2fde9cd75e2a6',
 'def1c0ded9bec7f1a1670819833240f027b25eff',
 '313d26bf14c4362883cc798d4aa50352fc55c954',
 '3fc91a3afd70395cd496c647d5a6cc9d4b2b7fad',
 '111111125421ca6dc452d289314280a0f8842a65',
 '2580916979353d3a40c71be00b0e197a98694cdf',
 'e37e799d5077682fa0a244d46e5649f71457bd09',
 ...
 '898fcb7b4e3bee37ebb0ca3a3fbd08cefdc8c995',
 '8ef79d6c328c25da633559c20c75f638a4863462',
 '309eac50cedc3909ce0f03c9725bb7a684b75829',
 '98c640aac6b88f5e1ab14073dd2d5baf71461e9c',
 '0f388ecdbc128083bfe317b00de2c25fbe9f24d5',
 '8583c58e3b0e02d2cdf45b06e437674f2fb47eb6',
 '6905fef2f9a7825f94018f4f989dc82f88be9181',
 '0b2b99d9fa762060fdbf1657984f7ece56ca5e5c',
 'f2b6525a3d7f28113cc57cb9b73dde9230073059',
 '051ef36e55875c08e4efaea6072c6d0f66fb0b9f']
Length: 351, dtype: string
```

```python
# Calculate approximate USD volume (NOTE: quote asset must be a stablecoin)
defi_trades['DEX Volume (USD)'] = (defi_trades['amount'])*(defi_trades['price'])

# Use only the amount field if base asset is a stablecoin
#defi_trades['DeFi Volume (USD)'] = (defi_trades['amount'])
```

```python
# Largest trade
largest = defi_trades.loc[defi_trades['amount'].idxmax()]
trade_size_usd = '${:,.2f}'.format(largest['DEX Volume (USD)'])
pd.DataFrame(largest)
```

|                   | 2628                                              |
| ----------------- | ------------------------------------------------- |
| market            | uniswap\_v3\_eth-2-weth-usdt\_eth-spot            |
| time              | 2024-10-07 18:39:35+00:00                         |
| coin\_metrics\_id | 04VIAJ3J2LDTBQKN8T3DB7MJM1EP7SID408V74DL4USTFL... |
| amount            | 1192.565431                                       |
| price             | 2274.221925                                       |
| database\_time    | 2024-10-07 18:39:54.427105+00:00                  |
| side              | buy                                               |
| block\_hash       | 73155bd5ea974746d59ed3b05d93f24d2011f391b527b9... |
| block\_height     | 20915532                                          |
| txid              | cb93842f093812b85469b576914d02907345d2624e1eee... |
| initiator         | b5eaac5a8649142dcdd13f981767913bcdf7ee42          |
| sender            | ddc25c965443834179438c2eb30e70f34b854a04          |
| beneficiary       | ddc25c965443834179438c2eb30e70f34b854a04          |
| DEX Volume (USD)  | 2712158.449637                                    |
| Datetime          | 2024-10-07 18:00:00                               |

```python
print('\nLARGEST TRADE: \n\n' + trade_size_usd + ' by address 0x' + largest['beneficiary'] + '\n')
```

```
LARGEST TRADE: 

$2,712,158.45 by address 0xddc25c965443834179438c2eb30e70f34b854a04

```

```python
# ATLAS links for blockchain metadata
md('<br>**ATLAS** by Coin Metrics <br> **Blockchain Search Engine** <br><br>**BUYER ADDRESS:** https://atlas.coinmetrics.io/address-details?asset=weth&address=' + str(largest['beneficiary']) + '<br><br>**TRANSACTION INFO:** https://atlas.coinmetrics.io/transaction-details?asset=weth&tx_hash=' + str(largest['txid']) + '<br><br>**BlOCK INFO:** https://atlas.coinmetrics.io/block-details?asset=weth&block_hash=' + str(largest['block_hash']) + '<br><br>For more info on **ATLAS** visit: https://coinmetrics.io/atlas/')
```

\
**ATLAS** by Coin Metrics\
**Blockchain Search Engine**\
\
**BUYER ADDRESS:** https://atlas.coinmetrics.io/address-details?asset=weth\&address=ddc25c965443834179438c2eb30e70f34b854a04\
\
**TRANSACTION INFO:** https://atlas.coinmetrics.io/transaction-details?asset=weth\&tx\_hash=cb93842f093812b85469b576914d02907345d2624e1eee463999bade940a8851\
\
**BlOCK INFO:** https://atlas.coinmetrics.io/block-details?asset=weth\&block\_hash=73155bd5ea974746d59ed3b05d93f24d2011f391b527b9d7d5c42e59752c6d41\
\
For more info on **ATLAS** visit: https://coinmetrics.io/atlas/

```python
defi_trades['Datetime'] = pd.to_datetime(defi_trades.time.dt.strftime('%m/%d/%y %H:00'))
defi_vol = defi_trades.groupby('Datetime')['DEX Volume (USD)'].sum()
```

```python
pd.DataFrame(defi_vol)
```

|                     | DEX Volume (USD) |
| ------------------- | ---------------- |
| Datetime            |                  |
| 2024-10-06 11:00:00 | 217166.26046     |
| 2024-10-06 12:00:00 | 438390.416765    |
| 2024-10-06 13:00:00 | 533070.744054    |
| 2024-10-06 14:00:00 | 1163987.797628   |
| 2024-10-06 15:00:00 | 705547.880282    |
| ...                 | ...              |
| 2024-10-09 06:00:00 | 625096.999423    |
| 2024-10-09 07:00:00 | 485056.495087    |
| 2024-10-09 08:00:00 | 553334.67282     |
| 2024-10-09 09:00:00 | 462252.636566    |
| 2024-10-09 10:00:00 | 102118.526838    |

72 rows × 1 columns

#### Retrieving volume for a centralized exchange via the market-candles endpoint

```python
cex_market = 'coinbase-eth-usd-spot'
```

```python
cex_vol = client.get_market_candles(
    markets=cex_market,
    frequency='1h',
    start_time=start,
    end_time=end- timedelta(hours=1)
).to_dataframe()

cex_vol = cex_vol.rename(columns={"candle_usd_volume": "CEX Volume (USD)"})
cex_vol['Datetime'] = pd.to_datetime(cex_vol.time.dt.strftime('%m/%d/%y %H:00'))
cex_vol = cex_vol.groupby('Datetime')['CEX Volume (USD)'].sum()
```

```python
vol_comp = pd.merge(defi_vol, cex_vol,on="Datetime", how="left").dropna()
vol_comp["DEX Volume (USD)"] = vol_comp['DEX Volume (USD)'].astype(int)
vol_comp["CEX Volume (USD)"] = vol_comp['CEX Volume (USD)'].astype(int)
```

```python
vol_comp
```

|                     | DEX Volume (USD) | CEX Volume (USD) |
| ------------------- | ---------------- | ---------------- |
| Datetime            |                  |                  |
| 2024-10-06 12:00:00 | 438390           | 946175           |
| 2024-10-06 13:00:00 | 533070           | 1258087          |
| 2024-10-06 14:00:00 | 1163987          | 3316466          |
| 2024-10-06 15:00:00 | 705547           | 2654936          |
| 2024-10-06 16:00:00 | 551985           | 1881551          |
| ...                 | ...              | ...              |
| 2024-10-09 05:00:00 | 550504           | 1912136          |
| 2024-10-09 06:00:00 | 625096           | 2814167          |
| 2024-10-09 07:00:00 | 485056           | 4493300          |
| 2024-10-09 08:00:00 | 553334           | 2393424          |
| 2024-10-09 09:00:00 | 462252           | 2559575          |

70 rows × 2 columns

```python
sns.set_style('whitegrid')
vc = sns.lineplot(data=vol_comp)
vc.yaxis.set_major_formatter('${x:,.0f}')
vc.set_title(str('\n' + defi_market.upper() + '\n vs. \n' + cex_market.upper() + '\n Hourly Volume \n'),font='arial',fontsize=17.5)
vc.set_ylabel("Volume (USD) \n", font='arial',fontsize = 14)
plt.grid(color='black', linestyle='dotted')
legend = vc.legend(fontsize=15, framealpha=0, bbox_to_anchor=(1.0, 1.2))
vc.set_xlabel("");
```

<figure><img src="../../.gitbook/assets/DEFI_dex_data_cex_dex_volume.png" alt=""><figcaption></figcaption></figure>

