# Using Staking Metrics to Get Yield and Staked Supply

![](https://5264302.fs1.hubspotusercontent-na1.net/hubfs/5264302/Demo%20Asset%20Resources/Demo%20Covers/CM-Demo-eth\_staking\_metrics-Cover.png)

### Resources

This notebook demonstrates basic functionality offered by the Coin Metrics Python API Client and Network Data Pro.

Coin Metrics offers a vast assortment of data for hundreds of cryptoassets. The Python API Client allows for easy access to this data using Python without needing to create your own wrappers using `requests` and other such libraries.

To understand the data that Coin Metrics offers, feel free to peruse the resources below.

* The [Coin Metrics API v4](https://docs.coinmetrics.io/api/v4) website contains the full set of endpoints and data offered by Coin Metrics.
* The [Coin Metrics Product Documentation](https://docs.coinmetrics.io/info) gives detailed, conceptual explanations of the data that Coin Metrics offers.
* The [API Spec](https://coinmetrics.github.io/api-client-python/site/api\_client.html) contains a full list of functions.

### File Download

Download the entire notebook as either a jupyter notebook to run yourself or as a pdf from the two links below

{% file src="../../.gitbook/assets/NDP - ETH Staking Metrics.ipynb" %}

{% file src="../../.gitbook/assets/NDP - ETH Staking Metrics.ipynb" %}



#### Notebook Setup

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
sns.set(rc={'figure.figsize':(8,6)})
sns.set_style("whitegrid",{'axes.grid' : True,'grid.linestyle': '--', 'grid.color': 'gray','axes.edgecolor': 'white','font.family': ['arial']})
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
2024-09-27 14:45:08 INFO     Using API key found in environment
```

## Calculate Estimated Validator Yield

Using ETH\_CL validator metrics it is possible to estimate the yield from the protocol. In combination with historical data on priority tips, we can estimate what a validator should expect to earn. Note that maximal extractable value (MEV) is another source of revenue for validators but is currently not considered as part of this analysis.

A validator’s expected annual percentage return (APR) from staking rewards accumulated on the Consensus Layer, assuming perfect performance and uptime, can be estimated with the formula below (where ValidatorActOngCnt = number of active validators):

> 2940.21 ÷ sqrt(ValidatorActOngCnt) = Staking Yield

```python
start_time = '2022-01-01'
end_time = '2022-12-31'
```

#### Retrieve Consensus Layer Metrics

```python
consensus_metrics = client.get_asset_metrics(
    assets='eth_cl',
    metrics=['ValidatorActOngCnt'],
    start_time = start_time,
    end_time = end_time
).to_dataframe()
```

```python
consensus_metrics['time'] = pd.to_datetime(consensus_metrics['time'])
```

```python
consensus_metrics
```

|     | asset   | time                      | ValidatorActOngCnt |
| --- | ------- | ------------------------- | ------------------ |
| 0   | eth\_cl | 2022-01-01 00:00:00+00:00 | 275880             |
| 1   | eth\_cl | 2022-01-02 00:00:00+00:00 | 276301             |
| 2   | eth\_cl | 2022-01-03 00:00:00+00:00 | 276784             |
| 3   | eth\_cl | 2022-01-04 00:00:00+00:00 | 277530             |
| 4   | eth\_cl | 2022-01-05 00:00:00+00:00 | 278349             |
| ... | ...     | ...                       | ...                |
| 360 | eth\_cl | 2022-12-27 00:00:00+00:00 | 491923             |
| 361 | eth\_cl | 2022-12-28 00:00:00+00:00 | 492863             |
| 362 | eth\_cl | 2022-12-29 00:00:00+00:00 | 493116             |
| 363 | eth\_cl | 2022-12-30 00:00:00+00:00 | 493662             |
| 364 | eth\_cl | 2022-12-31 00:00:00+00:00 | 493896             |

365 rows × 3 columns

Rewards from staking are only one part of a validator’s yield. Post-Merge, validators now also receive user transaction priority fees, or tips, that used to go to miners on the Execution Layer. Considering the historical record of fees, we can estimate the magnitude of this additional source of yield. For our analysis, we show how to estimate both staking revenues and priority tips as yields on staked ETH.

To do this, we use the results we found above and divide gross annual emission by the total number of validators to produce average validator revenue, which for this purpose only consider revenues that originate from the protocol and not from fees.

> 940.87 × sqrt(ValidatorActOngCnt) ÷ ValidatorActOngCnt = Avg. Validator Revenue

The expected annual number of blocks proposed in turn allows us to estimate the priority tip that is earned by each block proposal. Using a 14-day moving average to smooth priority tips, we then estimate what a proposer should expect to earn in tips.

> 1 ÷ ValidatorActOngCnt × 2,629,800 = Annual Num. of\
> Proposals per Validator

> sma(FeePrioTotNtv ÷ BlkCnt, 14) × Ann. Num. of Proposals per Validator = Average Priority Tip per Block

#### Retrieve Execution Layer Metrics

```python
execution_metrics = client.get_asset_metrics(
    assets='eth',
    metrics=['FeePrioTotNtv', 'BlkCnt'],
    start_time = start_time,
    end_time = end_time
).to_dataframe()
```

```python
execution_metrics['time'] = pd.to_datetime(execution_metrics['time'])
```

```python
execution_metrics
```

|     | asset | time                      | BlkCnt | FeePrioTotNtv |
| --- | ----- | ------------------------- | ------ | ------------- |
| 0   | eth   | 2022-01-01 00:00:00+00:00 | 6506   | 747.204977    |
| 1   | eth   | 2022-01-02 00:00:00+00:00 | 6495   | 905.938725    |
| 2   | eth   | 2022-01-03 00:00:00+00:00 | 6461   | 898.990928    |
| 3   | eth   | 2022-01-04 00:00:00+00:00 | 6494   | 1245.74813    |
| 4   | eth   | 2022-01-05 00:00:00+00:00 | 6460   | 1485.351677   |
| ... | ...   | ...                       | ...    | ...           |
| 360 | eth   | 2022-12-27 00:00:00+00:00 | 7156   | 343.663114    |
| 361 | eth   | 2022-12-28 00:00:00+00:00 | 7173   | 353.437599    |
| 362 | eth   | 2022-12-29 00:00:00+00:00 | 7161   | 324.786107    |
| 363 | eth   | 2022-12-30 00:00:00+00:00 | 7166   | 319.41694     |
| 364 | eth   | 2022-12-31 00:00:00+00:00 | 7166   | 290.772518    |

365 rows × 4 columns

```python
eth_metrics = consensus_metrics.merge(execution_metrics, on='time', how='inner')
```

```python
eth_metrics = eth_metrics[['time','ValidatorActOngCnt','BlkCnt','FeePrioTotNtv']]
```

#### Calculate theoretical validator yield based on Active Validator count

```python
eth_metrics['Validator Yield'] = 100 * (
    (32 + ((940.87 * (eth_metrics['ValidatorActOngCnt'] ** (1/2))) / eth_metrics['ValidatorActOngCnt']))/32 - 1
)
eth_metrics
```

|     | time                      | ValidatorActOngCnt | BlkCnt | FeePrioTotNtv | Validator Yield |
| --- | ------------------------- | ------------------ | ------ | ------------- | --------------- |
| 0   | 2022-01-01 00:00:00+00:00 | 275880             | 6506   | 747.204977    | 5.597828        |
| 1   | 2022-01-02 00:00:00+00:00 | 276301             | 6495   | 905.938725    | 5.593561        |
| 2   | 2022-01-03 00:00:00+00:00 | 276784             | 6461   | 898.990928    | 5.588679        |
| 3   | 2022-01-04 00:00:00+00:00 | 277530             | 6494   | 1245.74813    | 5.581163        |
| 4   | 2022-01-05 00:00:00+00:00 | 278349             | 6460   | 1485.351677   | 5.572946        |
| ... | ...                       | ...                | ...    | ...           | ...             |
| 360 | 2022-12-27 00:00:00+00:00 | 491923             | 7156   | 343.663114    | 4.192095        |
| 361 | 2022-12-28 00:00:00+00:00 | 492863             | 7173   | 353.437599    | 4.188095        |
| 362 | 2022-12-29 00:00:00+00:00 | 493116             | 7161   | 324.786107    | 4.187021        |
| 363 | 2022-12-30 00:00:00+00:00 | 493662             | 7166   | 319.41694     | 4.184704        |
| 364 | 2022-12-31 00:00:00+00:00 | 493896             | 7166   | 290.772518    | 4.183713        |

365 rows × 5 columns

#### Calculate estimated blocks proposals per year based on Active Validator count

```python
eth_metrics['est_block_proposals_per_yr'] = ((1/eth_metrics['ValidatorActOngCnt']) * (2629800))
```

#### Estimate tips per block

```python
eth_metrics['avg_per_block_tip_2w'] = (eth_metrics['FeePrioTotNtv'] / eth_metrics['BlkCnt']).rolling(window=14).mean()
```

```python
eth_metrics
```

|     | time                      | ValidatorActOngCnt | BlkCnt | FeePrioTotNtv | Validator Yield | est\_block\_proposals\_per\_yr | avg\_per\_block\_tip\_2w |
| --- | ------------------------- | ------------------ | ------ | ------------- | --------------- | ------------------------------ | ------------------------ |
| 0   | 2022-01-01 00:00:00+00:00 | 275880             | 6506   | 747.204977    | 5.597828        | 9.532405                       | NaN                      |
| 1   | 2022-01-02 00:00:00+00:00 | 276301             | 6495   | 905.938725    | 5.593561        | 9.517881                       | NaN                      |
| 2   | 2022-01-03 00:00:00+00:00 | 276784             | 6461   | 898.990928    | 5.588679        | 9.501272                       | NaN                      |
| 3   | 2022-01-04 00:00:00+00:00 | 277530             | 6494   | 1245.74813    | 5.581163        | 9.475732                       | NaN                      |
| 4   | 2022-01-05 00:00:00+00:00 | 278349             | 6460   | 1485.351677   | 5.572946        | 9.447851                       | NaN                      |
| ... | ...                       | ...                | ...    | ...           | ...             | ...                            | ...                      |
| 360 | 2022-12-27 00:00:00+00:00 | 491923             | 7156   | 343.663114    | 4.192095        | 5.345959                       | 0.048594                 |
| 361 | 2022-12-28 00:00:00+00:00 | 492863             | 7173   | 353.437599    | 4.188095        | 5.335763                       | 0.048059                 |
| 362 | 2022-12-29 00:00:00+00:00 | 493116             | 7161   | 324.786107    | 4.187021        | 5.333025                       | 0.047630                 |
| 363 | 2022-12-30 00:00:00+00:00 | 493662             | 7166   | 319.41694     | 4.184704        | 5.327127                       | 0.045280                 |
| 364 | 2022-12-31 00:00:00+00:00 | 493896             | 7166   | 290.772518    | 4.183713        | 5.324603                       | 0.044691                 |

365 rows × 7 columns

#### Calculate priority tip yield

```python
eth_metrics['Priority Tip Yield'] = (100 *
    ((32 + eth_metrics['avg_per_block_tip_2w'] * eth_metrics['est_block_proposals_per_yr'])/32+(-1)))
```

```python
eth_metrics = eth_metrics.dropna().set_index('time')
```

```python
ax = eth_metrics[['Validator Yield', 'Priority Tip Yield']].plot.area(stacked=True, figsize=(8, 6),color=['orange', 'red'])
ax.set_ylabel('Yield (%)')
ax.set_xlabel('')
ax.set_title('\nETH Staking \nEstimated Yield',fontsize=14)
plt.legend(loc='upper right', bbox_to_anchor=(1.00, 1.0))
plt.savefig("NDP_ETH_staking_metrics_validator_priority_tip_yield.png")
plt.show()
```

## Calculate ETH Supply: Staked vs. Unstaked

One of the many advantages of a blockchain-based ledger is auditability, but increasingly complex consensus architectures and supply mechanics can make it difficult to understand the full picture of asset supply. Ethereum's shift to proof-of-stake introduced a number of novel considerations in obtaining network-wide supply figures. In the following example, we combine various Supply metrics from ETH's Consensus and Execution Layers to ascertain the total amount of staked vs. unstaked supply.

#### Consensus Layer Metrics

```python
cl_supply = client.get_asset_metrics(
    assets='eth_cl',
    metrics=['SplyCur','SplyStkedNtv'],
    start_time = start_time,
    end_time = end_time,
    frequency = '1d'
).to_dataframe()

cl_supply = cl_supply.rename(columns={"SplyCur": "SplyCur_CL"})
```

#### Execution Layer Metrics

```python
el_supply = client.get_asset_metrics(
    assets='eth',
    metrics=['SplyCur','SplyCLCont'],
    start_time = start_time,
    end_time = end_time,
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

#### Calculate the total 'adjusted' ETH supply

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

|                           | SplyCur\_EL      | SplyCur\_CL     | SplyCLCont     | SplyStkedNtv | Total ETH Supply | Staked Supply | Unstaked Supply  |
| ------------------------- | ---------------- | --------------- | -------------- | ------------ | ---------------- | ------------- | ---------------- |
| time                      |                  |                 |                |              |                  |               |                  |
| 2022-01-01 00:00:00+00:00 | 118049177.834937 | 9227820.793013  | 8852770.0      | 8828515      | 118424228.62795  | 8828515       | 109595713.62795  |
| 2022-01-02 00:00:00+00:00 | 118054804.893592 | 9242509.802432  | 8866898.0      | 8841891      | 118430416.696023 | 8841891       | 109588525.696023 |
| 2022-01-03 00:00:00+00:00 | 118060102.632049 | 9264680.84189   | 8887122.0      | 8862723      | 118437661.47394  | 8862723       | 109574938.47394  |
| 2022-01-04 00:00:00+00:00 | 118063057.343795 | 9286929.282994  | 8915506.0      | 8883635      | 118434480.626789 | 8883635       | 109550845.626789 |
| 2022-01-05 00:00:00+00:00 | 118064691.965118 | 9311811.478199  | 8931074.0      | 8907187      | 118445429.443318 | 8907187       | 109538242.443318 |
| ...                       | ...              | ...             | ...            | ...          | ...              | ...           | ...              |
| 2022-12-27 00:00:00+00:00 | 120528662.458689 | 16755428.289539 | 15813639.05565 | 15767369     | 121470451.692578 | 15767369      | 105703082.692578 |
| 2022-12-28 00:00:00+00:00 | 120528732.408086 | 16761680.161693 | 15819655.05565 | 15771865     | 121470757.51413  | 15771865      | 105698892.51413  |
| 2022-12-29 00:00:00+00:00 | 120528750.981834 | 16772281.136252 | 15834119.05565 | 15780713     | 121466913.062437 | 15780713      | 105686200.062437 |
| 2022-12-30 00:00:00+00:00 | 120528698.245699 | 16790630.62361  | 15846119.05565 | 15797305     | 121473209.81366  | 15797305      | 105675904.81366  |
| 2022-12-31 00:00:00+00:00 | 120528769.150157 | 16800132.616449 | 15854791.05565 | 15805049     | 121474110.710956 | 15805049      | 105669061.710956 |

365 rows × 7 columns

#### Plot staked vs. unstaked supply

```python
ax = adjusted_supply[['Staked Supply', 'Unstaked Supply']].plot.area(stacked=True, figsize=(8, 4),color=['pink', 'purple'])
ax.set_ylabel('')
ax.set_xlabel('')
ax.set_title('\nETH Staked vs. Unstaked Supply\n',fontsize=14)
ax.yaxis.set_major_formatter(lambda x, _: f'{x*1e-6}M')
plt.legend(loc='upper right', bbox_to_anchor=(1.05, 1.15), fontsize=10)
plt.savefig("NDP_ETH_Staking_Metrics_staked_vs_unstaked_supply.png")
plt.show()
```

```python
```
