# Fees

### Contents

* [Mean Tx Fee per Byte (native units) (FeeByteMeanNtv)](fees.md#mean-tx-fee-per-byte-native-units)
* [Mean Tx Fee (native units, USD) (FeeMeanNtv, FeeMeanUSD)](fees.md#feemean)
* [Median Tx Fee (native units, USD) (FeeMeanNtv, FeeMeanUSD)](fees.md#feemed)
* [Mean Miner Tip (native units, USD) (FeePrioMeanNtv, FeePrioMeanUSD)](fees.md#feepriomean)
* [Median Miner Tip (native units, USD) (FeePrioMedNtv, FeePrioMedUSD)](fees.md#e)
* [Total Miner Tips (native units, USD) (FeePrioTotNtv, FeePrioTotUSD)](fees.md#feepriotot)
* [Miner Revenue from Fees (%) (FeeRevPct)](fees.md#feerevpct)
* [Total Fees (native units, USD) (FeeTotNtv, FeeTotUSD)](fees.md#feetot)
* [Mean Tx Fee per Block Weight (native units) (FeeWghtMeanNtv)](fees.md#feewghtmean)
* [Mean Base Fee (Wei) (GasBaseBlkMean)](fees.md#gasbaseblkmean)
* [Block Gas Limit (GasLmtBlk)](fees.md#gaslmtblk)
* [Mean Block Gas Limit (GasLmtBlkMean)](fees.md#gasbaseblkmean)
* [Tx Gas Limit (GasLmtTx)](fees.md#gaslmttx)
* [Mean Gas Limit per Tx (GasLmtTxMean)](fees.md#gaslmttxmean)
* [Tx Gas Used (GasUsedTx)](fees.md#gasusedtx)
* [Mean Gas Used per Tx (GasUsedTxMean)](fees.md#gaslmttxmean-1)
* [Total blob fees (FeeBlobTotNtv, FeeBlobTotUSD)](fees.md#total-blob-fees)
* [Mean blob fees (FeeBlobMeanNtv, FeeBlobMeanUSD)](fees.md#mean-blob-fees)
* [Median blob fees (FeeBlobMedNtv, FeeBlobMedUSD)](fees.md#median-blob-fees)
* [Mean fee per blob byte (FeeBlobByteMeanNtv, FeeBlobByteMeanUSD)](fees.md#mean-fee-per-blob-byte)
* [Mean fee per blob carrying transaction (FeeBlobTxMeanNtv, FeeBlobTxMeanUSD)](fees.md#mean-fee-per-blob-carrying-transaction)
* [Total Blob Fees Paid by Layer 2s (FeeBlob\*TotNtv, FeeBlob\*TotUSD)](fees.md#total-blob-fees-paid-by-layer-2s)
* [Mean Blob Fees Paid by Layer 2s (FeeBlob\*MeanNtv, FeeBlob\*MeanUSD)](fees.md#mean-blob-fees-paid-by-layer-2s)
* [Network State Storage Fees](fees.md#network-state-storage-fees)

## Mean Tx Fee per Byte (native units)

### Definition

The mean transaction fee per byte of all blocks that interval in native units.

| Name                                | MetricID       | Unit         | Interval |
| ----------------------------------- | -------------- | ------------ | -------- |
| Mean Tx Fee per Byte (native units) | FeeByteMeanNtv | Native units | 1 day    |

### Details

* 0-fee transactions are included
* Computed as FeeTotNtv / BlkSizeByte
* If there were no transactions that interval, this metric isn’t computed
* For SOL, this metric does not include vote transactions. Includes successful and unsuccessful transactions.

### Chart

<figure><img src="../../../.gitbook/assets/image (4).png" alt=""><figcaption></figcaption></figure>

### Asset Specific Details

Any blockchain where users are paying for block space rather than computation.

### Examples

During the BTC mining ban in China in 2021, we saw an influx of miners turn off their operations so the block interval time increased significantly due to less hash power on the network. In effect, because less miners were online, we saw a spike in the mean transaction fee per byte since less miners were available to include transactions in the blocks, therefore transactions costs higher before the next difficulty adjustment.

### Release History

* Release Version: NDP-EOD 4.8 (Nov, 2020)

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/FeeByteMeanNtv" %}

## Mean Tx Fee <a href="#feemean" id="feemean"></a>

### Definition

The mean transaction fee per byte of all blocks that interval in native units.

| Name                       | MetricID   | Unit         | Interval      |
| -------------------------- | ---------- | ------------ | ------------- |
| Mean Tx Fee (native units) | FeeMeanNtv | Native units | 1 day, 1 hour |
| Mean Tx Fee (USD)          | FeeMeanUSD | USD          | 1 day, 1 hour |

### Details

* 0-fee transactions are included
* If there were no transactions that interval, this metric isn’t computed
* FeeByteMeanNtv is Computed as FeeTotNtv / BlkSizeByte
* FeeMeanUSD is Computed as FeeMeanNtv \* PriceUSD
* The price used is the daily close price

### Asset Specific Details

* Any blockchain where users are paying for block space rather than computation.
* For SOL, this metric does not include vote transactions. Includes successful and unsuccessful transactions.

### Examples

During the BTC mining ban in China in 2021, we saw an influx of miners turn off their operations so the block interval time increased significantly due to less hash power on the network. In effect, because less miners were online, we saw a spike in the mean transaction fee per byte since less miners were available to include transactions in the blocks, therefore transactions costs higher before the next difficulty adjustment.

### Release History

* Release Version: NDP-EOD 4.8 (Nov, 2020)

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/FeeByteMeanNtv" %}

## Median Tx Fee <a href="#feemed" id="feemed"></a>

### Definition

The median fee per transaction in native units that interval.

| Name                         | MetricID  | Unit         | Interval      |
| ---------------------------- | --------- | ------------ | ------------- |
| Median Tx Fee (native units) | FeeMedNtv | Native units | 1 day, 1 hour |
| Median Tx Fee (USD)          | FeeMedUSD | USD          | 1 day, 1 hour |

### Details

* 0-fee transactions are included
* If there were no transactions that interval, this metric isn’t computed
* If there’s an even number of fees, the median is computed by averaging the middle values of the sorted fees
* FeeMedUSD is computed as FeeMedNtv \* PriceUSD
* Price used is the daily close price
* 0-fee transactions are included

### Asset Specific Details

* For SOL, this metric does not include vote transactions. Includes successful and unsuccessful transactions.

### Release History

* Released in the 1.0 release of NDP

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/FeeMedNtv" %}

## Mean Miner Tip <a href="#feepriomean" id="feepriomean"></a>

### Definition

The average (mean) Miner Tip, a.k.a. _priority fee,_ paid for transactions during a time interval (e.g. 1 day).

The concept of a Miner Tip was introduced as part of [EIP-1559](https://notes.ethereum.org/@vbuterin/eip-1559-faq) and it represents the portion of the total transaction fees that rewards miners. This serves as an added incentive so that miners prioritize transactions that have opted-in and paid a tip. The other portion is called the Base Fee, and it is burnt (destroyed) after the transaction is included in a block.

Ethereum post-1559 requires users to pay for a Base Fee as a prerequisite to include transactions in a block. The Base Fee can go up or down on the basis of the size (in gas units) of the previous block. In times of congestion, where blocks are sequentially increasing in size, paying a Base Fee does not guarantee that a transaction will be included in a block. In such events, users can optionally pay an additional miner tip to nudge miners to include their transactions in their block.

| Name                          | MetricID       | Unit         | Interval      |
| ----------------------------- | -------------- | ------------ | ------------- |
| Mean Miner Tip (native units) | FeePrioMeanNtv | Native units | 1 day, 1 hour |
| Mean Miner Tip (USD)          | FeePrioMeanUSD | USD          | 1 day, 1 hour |

### Details

* EIP1559 was a highly anticipated proposal that changes how transaction fees are priced in Ethereum, as well as the dynamics of block sizes.
* The proposal activated on the Ethereum Network in August of 2021 and marks one of the biggest changes in monetary policy in the history of cryptoassets.
* Instead of the legacy _gas price_, 1559 splits transaction fees into two distinct fields: a Base Fee and an optional Tip (also known as a _Priority Fee_).
* This metric calculates the average Tip in transactions that have occurred in the network over the measuring period (e.g. 1 day).
* For a thorough review of EIP1559 and the design of its pricing mechanism, please refer to [this paper](https://arxiv.org/pdf/2012.00854.pdf).

### Chart

<figure><img src="../../../.gitbook/assets/image (12).png" alt=""><figcaption></figcaption></figure>

### Interpretation

* Miner tips are optional and showcase demand for block space (i.e. transaction settlement) in the short-term.
* Changes in average miner tip over time can depict changes in demand for block space. When miner tips have to be used due to Base Fees not being enough, the fee market reverts back to first-price auction (like other Crypto assets).
* In such scenarios, this metric should see an increase as users bid up fees as they did prior to the activation of EIP1559.

### Asset-Specific Details

* Only available for ETH, this metric was introduced following the EIP-1559 upgrade

### Examples

We saw a major drop in gas used in Spring 2022 due to the built in difficulty bomb. In the early days of Ethereum, core developers implemented this difficulty bomb mechanism to hold everyone accountable to the PoS timeline. The idea was that the bomb would go off making mining extremely difficult/unprofitable. So each time the bomb started to go off, less blocks were being found so less gas used. Therefore, less priority fees were needed since network activity was low.

### Release History

* Released in the 5.0 release of NDP (August, 2021)

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/FeePrioMeanNtv" %}

## Median Miner Tip <a href="#e" id="e"></a>

### Definition

The median Miner Tip, a.k.a. _priority fee,_ paid for transactions during a time interval (e.g. 1 day), shown in native units (e.g. units of ETH).

The concept of a Miner Tip was introduced as part of [EIP-1559](https://notes.ethereum.org/@vbuterin/eip-1559-faq) and it represents the portion of the total transaction fees that rewards miners. This serves as an added incentive so that miners prioritize transactions that have opted-in and paid a tip. The other portion is called the Base Fee, and it is burnt (destroyed) after the transaction is included in a block.

Ethereum post-1559 requires users to pay for a Base Fee as a prerequisite to include transactions in a block. The Base Fee can go up or down on the basis of the size (in gas units) of the previous block. In times of congestion, where blocks are sequentially increasing in size, paying a Base Fee does not guarantee that a transaction will be included in a block. In such events, users can optionally pay an additional miner tip to nudge miners to include their transactions in their block.

| Name                            | MetricID      | Unit         | Interval      |
| ------------------------------- | ------------- | ------------ | ------------- |
| Median Miner Tip (native units) | FeePrioMedNtv | Native units | 1 day, 1 hour |
| Median Miner Tip (USD)          | FeePrioMedUSD | USD          | 1 day, 1 hour |

### Details

* EIP1559 was a highly anticipated proposal that changes how transaction fees are priced in Ethereum, as well as the dynamics of block sizes.
* The proposal activated on the Ethereum Network in August of 2021 and marks one of the biggest changes in monetary policy in the history of cryptoassets.
* Instead of the legacy _gas price_, 1559 splits transaction fees into two distinct fields: a Base Fee and an optional Tip (also known as a _Priority Fee_).
* This metric calculates the median Tip in transactions that have occurred in the network over the measuring period (e.g. 1 day).
* For a thorough review of EIP1559 and the design of its pricing mechanism, please refer to [this paper](https://arxiv.org/pdf/2012.00854.pdf).

### Asset-Specific Details

* Only available for ETH, this metric was introduced following the EIP-1559 upgrade
* For Solana transactions, priority fees are fees paid on top of the 5000 lamport base fee per signature. This includes both setting a higher price per compute unit and setting a higher total compute budget

### Examples

* We saw a major drop in gas used in Spring 2022 due to the built in difficulty bomb. In the early days of Ethereum, core developers implemented this difficulty bomb mechanism to hold everyone accountable to the PoS timeline. The idea was that the bomb would go off making mining extremely difficult/unprofitable. So each time the bomb started to go off, less blocks were being found so less gas used. Therefore, less priority fees were needed since network activity was low.

### Interpretation

* Miner tips are optional and showcase demand for block space (i.e. transaction settlement) in the short-term.
* Changes in median miner tip over time can depict changes in demand for block space. When miner tips have to be used due to Base Fees not being enough, the fee market reverts back to first-price auction (like other cryptoassets).
* In such scenarios, this metric should see an increase as users bid up fees as they did prior to the activation of EIP1559.

### Release History

* Released in the 5.0 release of NDP (August, 2021)

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/FeePrioMedNtv" %}

## Total Miner Tips <a href="#feepriotot" id="feepriotot"></a>

### Definition

The total value of Miner Tips, a.k.a. _priority fees,_ paid for all transactions during a time interval (e.g. 1 day), shown in native units (e.g. units of ETH).

The concept of a Miner Tip was introduced as part of [EIP-1559](https://notes.ethereum.org/@vbuterin/eip-1559-faq) and it represents the portion of the total transaction fees that rewards miners. This serves as an added incentive so that miners prioritize transactions that have opted-in and paid a tip. The other portion is called the Base Fee, and it is burnt (destroyed) after the transaction is included in a block.

Ethereum post-1559 requires users to pay for a Base Fee as a prerequisite to include transactions in a block. The Base Fee can go up or down on the basis of the size (in gas units) of the previous block. In times of congestion, where blocks are sequentially increasing in size, paying a Base Fee does not guarantee that a transaction will be included in a block. In such events, users can optionally pay an additional miner tip to nudge miners to include their transactions in their block.

| Name                            | MetricID      | Unit         | Interval      |
| ------------------------------- | ------------- | ------------ | ------------- |
| Total Miner Tips (native units) | FeePrioTotNtv | Native units | 1 day, 1 hour |
| Total Miner Tips (USD)          | FeePrioTotUSD | USD          | 1 day, 1 hour |

### Details

* EIP1559 was a highly anticipated proposal that changes how transaction fees are priced in Ethereum, as well as the dynamics of block sizes.
* The proposal activated on the Ethereum Network in August of 2021 and marks one of the biggest changes in monetary policy in the history of cryptoassets.
* Instead of the legacy _gas price_, 1559 splits transaction fees into two distinct fields: a Base Fee and an optional Tip (also known as a _Priority Fee_).
* This metric calculates the total value paid for Tips in transactions that have occurred in the network over the measuring period (e.g. 1 day).
* For a thorough review of EIP1559 and the design of its pricing mechanism, please refer to [this paper](https://arxiv.org/pdf/2012.00854.pdf).

### Asset Specific Details

* For Solana transactions, priority fees are fees paid on top of the 5000 lamport base fee per signature. This includes both setting a higher price per compute unit and setting a higher total compute budget

### Interpretation

* Miner tips are optional and showcase demand for block space (i.e. transaction settlement) in the short-term.
* Changes in total miner tip over time can depict changes in demand for block space. When miner tips have to be used due to Base Fees not being enough, the fee market reverts back to first-price auction (like other cryptoassets).
* In such scenarios, this metric should see an increase as users bid up fees as they did prior to the activation of EIP1559.

### Release History

* Released in the 5.0 release of NDP (August, 2021)

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/FeePrioTotNtv" %}

## Revenue from Fees (%) <a href="#feerevpct" id="feerevpct"></a>

### Definition

The percentage of revenue derived from fees that interval. This is equal to the fees divided by the  revenue.

| Name                  | MetricID  | Unit          | Interval |
| --------------------- | --------- | ------------- | -------- |
| Revenue from Fees (%) | FeeRevPct | Dimensionless | 1 day    |

### Details

* Computed as 100 \* FeeTotNtv / RevNtv

### Release History

* Released in the 1.0 release of NDP

### Interpretation

For blockchains aiming to retain a limited supply by weaning themselves off an issuance-based validator subsidy, fees are expected to be a critical part of the long-term security model. This metric gives you an indication of how prepared a blockchain is to transition from an issuance-based compensation model for validators to a fee-based model.

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/FeeRevPct" %}

## Total Fees <a href="#feetot" id="feetot"></a>

### Definition

The sum of all fees paid to miners, transaction validators, stakers and/or block producers that interval. In certain cryptonetworks, fees might be burned (destroyed), but they are still accounted for in this metric.

| Name                      | MetricID  | Unit         | Interval      |
| ------------------------- | --------- | ------------ | ------------- |
| Total Fees (native units) | FeeTotNtv | Native units | 1 day, 1 hour |
| Total Fees (USD)          | FeeTotUSD | USD          | 1 day, 1 hour |

### Details

* This metric includes fees that are burned as part of the protocol.
* For chains that use median time, the day is defined using it, otherwise, it’s defined using the block’s timestamps.

### Asset Specific Details

* For Solana transactions, priority fees are fees paid on top of the 5000 lamport base fee per signature. This includes both setting a higher price per compute unit and setting a higher total compute budget.
* For Ethereum this fee includes fees for transaction execution as well as blob fees. It is made up of base fees, priority fees and blob fees. Fees paid for the execution of transactions only can be calculated by subtracting [total blob fees](fees.md#total-blob-fees) from total fees.

### Release History

* Released in the 1.0 release of NDP

### Interpretation

Fees in USD terms (see Fees, Transaction, Median, USD; Fees, Transaction, Mean, USD, and Fees, Total, USD) are often biased by volatility in unit price, making it difficult to determine trends in fee pressure. Evaluating fees in native unit terms removes the noise from exchange rate volatility and enables more consistent time series comparisons.

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/FeeTotNtv" %}

## Mean Tx Fee per Block Weight (native units) <a href="#feewghtmean" id="feewghtmean"></a>

### Definition

The mean transaction fee per weight unit in that interval in native units. Weight is a dimensionless measure of a block’s “size”. It is only applicable for chains that use SegWit (segregated witness).

| Name                                        | MetricID       | Unit         | Interval |
| ------------------------------------------- | -------------- | ------------ | -------- |
| Mean Tx Fee per Block Weight (native units) | FeeWghtMeanNtv | Native units | 1 day    |

### Details

* For more details on SegWit, check the [Bitcoin Wiki Entry](https://en.bitcoin.it/wiki/Segregated_Witness)

### Asset-Specific Details

* Only relevant to cryptoassets that have implemented Segregated Witness (SegWit)

### Examples

* During the BTC mining ban in China in 2021, we saw an influx of miners turn off their operations so the block interval time increased significantly due to less hash power on the network. In effect, because less miners were online, we saw a spike in the mean transaction fee per byte since less miners were available to include transactions in the blocks, therefore transactions costs were more competitive.

### Release History

* Release Version: NDP-EOD 4.8 (Nov, 2020)

### Interpretation

* The Segwit upgrade replaced the concept of block size with block weight . While Bitcoins block weight is 4 MB, the mean block time is still slower than other chains such as Litecoin resulting

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/FeeWghtMeanNtv" %}

## Mean Base Fee (Wei) <a href="#gasbaseblkmean" id="gasbaseblkmean"></a>

### Definition

The average (mean) Base Fee paid for transactions during a time interval (e.g. 1 day), shown in the smallest denomination of Ether, [Wei units](https://ethdocs.org/en/latest/ether.html#denominations).

The concept of a Base Fee was introduced as part of [EIP-1559](https://notes.ethereum.org/@vbuterin/eip-1559-faq) and it represents the portion of the total transaction fees that is destroyed and taken out of circulation (i.e. _burnt)_. Ethereum post-1559 requires users to pay for a Base Fee as a prerequisite to include transactions in a block. The Base Fee can go up or down on the basis of the size (in gas units) of the previous block. In times of congestion, where blocks are sequentially increasing in size, paying a Base Fee does not guarantee that a transaction will be included in a block. In such events, users can optionally pay an additional Miner Tip to nudge miners to include their transactions in their block.

| Name                | MetricID       | Unit | Interval |
| ------------------- | -------------- | ---- | -------- |
| Mean Base Fee (Wei) | GasBaseBlkMean | Wei  | 1 day    |

### Details

* EIP1559 was a highly anticipated proposal that changes how transaction fees are priced in Ethereum, as well as the dynamics of block sizes.
* The proposal activated on the Ethereum Network in August of 2021 and marks one of the biggest changes in monetary policy in the history of cryptoassets.
* Instead of the legacy _gas price_, 1559 splits transaction fees into two distinct fields: a Base Fee and an optional Tip (also known as a _Priority Fee_).
* This metric calculates the average Base Fee in transactions that have occurred in the network over the measuring period (e.g. 1 day).
* For a thorough review of EIP1559 and the design of its pricing mechanism, please refer to [this paper](https://arxiv.org/pdf/2012.00854.pdf).

### Interpretation

* Base Fees fluctuate on the basis of network utilization. If there is high demand for transaction settlement, Base Fees go up, and as demand fades, Base Fees go down.
* The pricing of Base Fees is inextricably connected to size of blocks in the blockchain. Upon the the activation fo EIP-1559, the maximum size of blocks in Ethereum (measured in units of gas) was more than doubled to 30M.
* Although blocks are larger, this pricing mechanism attempts to target an average of 15M gas units per block, and an exponential function is used to increase or decrease Base Fees so that this target is hit.
* If, for example, the previous block was above 15M units of gas, the base fee is increased. If there are several sequential blocks above the 15M target, Base Fees increase exponentially which disincentivizes users from transacting.
* Changes in Base Fees over time can depict changes in demand for block space. When miner tips have to be used due to Base Fees not being enough, this is a sign of network congestion.

### Release History

* Released in the 5.0 release of NDP (August, 2021)

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/GasBaseBlkMean" %}

## Block Gas Limit <a href="#gaslmtblk" id="gaslmtblk"></a>

### Definition

The sum gas limit of all blocks that day.

| Name            | MetricID  | Unit | Interval       |
| --------------- | --------- | ---- | -------------- |
| Block Gas Limit | GasLmtBlk | Gas  | 1 block, 1 day |

### Details

* Gas is a dimensionless unit measuring the computational cost of operations for ETH-based assets. Each transaction spends gas when being processed.
* Each block has a limit of how much gas can be expanded when processing its operations. It is the scaling limit for ETH-based assets, just as block size is for BTC-based ones.

### Chart

<figure><img src="../../../.gitbook/assets/image (13).png" alt=""><figcaption></figcaption></figure>

### Asset-Specific Details

* Only relevant for ETH and ETC.

### Interpretation

* Ethereum blocks are mined roughly every 15 seconds. Each Ethereum block has a maximum size, which limits the amount of data that can be included. The current maximum block size is set at about 15M gas per block on April 22 (seen in green on the chart above). Prior to that, the gas limit was 12.5M per block, which set in July 2020. Since the maximum block size is denominated in gas and different transactions have different gas usages based on complexity, there isn’t a consistent maximum number of transactions that can be included in a block. But on average, about 160-200 transactions are included per block.
* The greater the gas limit, the more space is available per block, which can help push down the average gas price.

### Release History

* Released in the 1.0 release of NDP

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/GasLmtBlk" %}

## Mean Block Gas Limit <a href="#gaslmtblkmean" id="gaslmtblkmean"></a>

### Definition

The mean gas limit per block that day.

| Name                 | MetricID      | Unit | Interval |
| -------------------- | ------------- | ---- | -------- |
| Mean Block Gas Limit | GasLmtBlkMean | Gas  | 1 day    |

### Details

* Computed as GasLmtBlk / BlkCnt
* Gas is a dimensionless unit measuring the computational cost of operations for ETH-based assets. Each transaction spends gas when being processed.

### Asset-Specific details

* Only relevant for ETH and ETC.

### Release History

* Released in the 1.0 release of NDP

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/GasLmtBlkMean" %}

## Tx Gas Limit <a href="#gaslmttx" id="gaslmttx"></a>

### Definition

The sum gas limit of all transactions that day.

| Name         | MetricID | Unit | Interval       |
| ------------ | -------- | ---- | -------------- |
| Tx Gas Limit | GasLmtTx | Gas  | 1 block, 1 day |

### Details

* Gas is a dimensionless unit measuring the computational cost of operations for ETH-based assets. Each transaction uses gas when being processed. As it’s impossible to know how much gas every transaction will use before executing it, each transaction specifies a gas limit it’s willing to use.

### Asset-Specific Details

* Only relevant for ETH and ETC.

### Release History

* Released in the 1.0 release of NDP

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/GasLmtTx" %}

## Mean Block Gas Limit <a href="#gaslmtblkmean" id="gaslmtblkmean"></a>

### Definition

The mean gas limit per block that day.

| Name                 | MetricID      | Unit | Interval |
| -------------------- | ------------- | ---- | -------- |
| Mean Block Gas Limit | GasLmtBlkMean | Gas  | 1 day    |

### Details

* Computed as GasLmtBlk / BlkCnt
* Gas is a dimensionless unit measuring the computational cost of operations for ETH-based assets. Each transaction spends gas when being processed.

### Asset-Specific details

* Only relevant for ETH and ETC.

### Release History

* Released in the 1.0 release of NDP

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/GasLmtBlkMean" %}

## Mean Gas Limit per Tx <a href="#gaslmttxmean" id="gaslmttxmean"></a>

### Definition

The mean gas limit per transaction that day.

| Name                  | MetricID     | Unit | Interval       |
| --------------------- | ------------ | ---- | -------------- |
| Mean Gas Limit per Tx | GasLmtTxMean | Gas  | 1 block, 1 day |

### Details

* Computed as GasLmtTx / TxCnt
* Gas is a dimensionless unit measuring the computational cost of operations for ETH-based assets. Each transaction uses gas when being processed. As it’s impossible to know how much gas every transaction will use before executing it, each transaction specifies a gas limit it’s willing to use.

### Asset-Specific Details

* Only relevant for ETH and ETC.

### Release History

* Released in the 1.0 release of NDP

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/GasLmtTxMean" %}

## Tx Gas Used <a href="#gasusedtx" id="gasusedtx"></a>

### Definition

The sum gas used (i.e., paid) across all transactions that day.

| Name        | MetricID  | Unit | Interval       |
| ----------- | --------- | ---- | -------------- |
| Tx Gas Used | GasUsedTx | Gas  | 1 block, 1 day |

### Details

* Gas is a dimensionless unit measuring the computational cost of operations for ETH-based assets. Each transaction uses gas when being processed.

### Asset-Specific details

* Only relevant for ETH and ETC.

### Release History

* Released in the 1.0 release of NDP

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/GasUsedTx" %}

## Mean Gas Used per Tx <a href="#gaslmttxmean" id="gaslmttxmean"></a>

### Definition

The mean gas used (i.e., paid) per transaction that day.

| Name                 | MetricID      | Unit | Interval       |
| -------------------- | ------------- | ---- | -------------- |
| Mean Gas Used per Tx | GasUsedTxMean | Gas  | 1 block, 1 day |

### Details

* Computed as GasUsedTx / TxCnt
* Gas is a dimensionless unit measuring the computational cost of operations for ETH-based assets. Each transaction uses gas when being processed.

### Asset-Specific Details

* Only relevant for ETH and ETC.

### Release History

* Released in the 1.0 release of NDP

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/GasUsedTxMean" %}

## Total blob fees

### Definition

Total amount of Fees paid for blob space (available in native units and USD)

<table><thead><tr><th width="222">Name</th><th>MetricID</th><th>Unit</th><th>Interval</th></tr></thead><tbody><tr><td>Total blob fees (native units)</td><td>FeeBlobTotNtv</td><td>Native units</td><td>1 block, 1 day</td></tr><tr><td>Total blob fees (USD)</td><td>FeeBlobTotUSD</td><td>USD</td><td>1 block, 1 day</td></tr></tbody></table>

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics-v2/FeeBlobTotNtv" %}

## Mean blob fees

### Definition

Mean fees paid per blob, shown (available in native units and USD)

<table><thead><tr><th width="249">Name</th><th width="174">MetricID</th><th>Unit</th><th>Interval</th></tr></thead><tbody><tr><td>Mean blob fees (native units)</td><td>FeeBlobMeanNtv</td><td>Native units</td><td>1 block, 1 day</td></tr><tr><td>Mean blob fees (USD)</td><td>FeeBlobMeanUSD</td><td>USD</td><td>1 block, 1 day</td></tr></tbody></table>

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics-v2/FeeBlobMeanNtv" %}

## Median blob fees

### Definition

Median fees paid per blob, shown (available in native units and USD)

<table><thead><tr><th width="219">Name</th><th>MetricID</th><th>Unit</th><th>Interval</th></tr></thead><tbody><tr><td>Median blob fees (native units)</td><td>FeeBlobMedNtv</td><td>Native Units</td><td>1 block, 1 day</td></tr><tr><td>Median blob fees (USD)</td><td>FeeBlobMedUSD</td><td>USD</td><td>1 block, 1 day</td></tr></tbody></table>

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics-v2/FeeBlobMedNtv" %}

## Mean Fee per blob Byte

### Definition

Mean fee paid per byte of used blob space (available in native units and USD)

<table><thead><tr><th>Name</th><th width="205">MetricID</th><th width="200">Unit</th><th>Interval</th></tr></thead><tbody><tr><td>Mean Fee per blob Byte (native units)</td><td>FeeBlobByteMeanNtv</td><td>Native units</td><td>1 block, 1 day</td></tr><tr><td>Mean Fee per blob Byte (USD)</td><td>FeeBlobByteMeanUSD</td><td>USD</td><td>1 block, 1 day</td></tr></tbody></table>

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics-v2/FeeBlobByteMeanNtv" %}

## Mean fee per blob carrying transaction

### Definition

Mean fee paid in blob fees per blob carrying transaction (available in native units and USD)

| Name                                                  | MetricID         | Unit         | Interval       |
| ----------------------------------------------------- | ---------------- | ------------ | -------------- |
| Mean fee per blob carrying transaction (native units) | FeeBlobTxMeanNtv | Native units | 1 block, 1 day |
| Mean fee per blob carrying transaction (USD)          | FeeBlobTxMeanUSD | USD          | 1 block, 1 day |

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics-v2/FeeBlobTxMeanNtv" %}

## Total Blob Fees paid by Layer 2s

### Definition

The sum of all fees paid by tagged Layer 2 sequencers for blob space, shown in native units and USD.

<table><thead><tr><th>Name</th><th width="197">MetricID</th><th>Unit</th><th>Interval</th></tr></thead><tbody><tr><td>Total Blob Fees (layer 2, native units)</td><td>FeeBlobL2TotNtv</td><td>Native units</td><td>1 day</td></tr><tr><td>Total Blob Fees (layer 2, USD)</td><td>FeeBlobL2TotUSD</td><td>USD</td><td>1 day</td></tr><tr><td>Total Blob Fees (Arbitrum, native units)</td><td>FeeBlobARBTotNtv </td><td>Native units</td><td>1 day</td></tr><tr><td>Total Blob Fees (Arbitrum, USD)</td><td>FeeBlobARBTotUSD</td><td>USD</td><td>1 day</td></tr><tr><td>Total Blob Fees (Optimism, native units)</td><td>FeeBlobOPTotNtv </td><td>Native units</td><td>1 day</td></tr><tr><td>Total Blob Fees (Optimism, USD)</td><td>FeeBlobOPTotUSD</td><td>USD</td><td>1 day</td></tr><tr><td>Total Blob Fees (Base, native units)</td><td>FeeBlobBASETotNtv</td><td>Native units</td><td>1 day</td></tr><tr><td>Total Blob Fees (Base, USD)</td><td>FeeBlobBASETotUSD</td><td>USD</td><td>1 day</td></tr></tbody></table>

#### Details

* The aggregate L2 metrics (FeeBlobL2TotNtv & FeeBlobL2TotUSD) include all tagged L2 sequencers. This list includes additional L2s that do not have dedicated metrics.

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/FeeBlobL2TotNtv" %}

## Mean Blob Fees paid by Layer 2s

### Definition

The sum of all fees paid by tagged Layer 2 sequencers for blob space, shown in native units and USD.

<table><thead><tr><th>Name</th><th width="216">MetricID</th><th>Unit</th><th>Interval</th></tr></thead><tbody><tr><td>Mean Blob Fees (layer 2, native units)</td><td>FeeBlobL2MeanNtv</td><td>Native units</td><td>1 day</td></tr><tr><td>Mean Blob Fees (layer 2, USD)</td><td>FeeBlobL2MeanUSD</td><td>USD</td><td>1 day</td></tr><tr><td>Mean Blob Fees (Arbitrum, native units)</td><td>FeeBlobARBMeanNtv </td><td>Native units</td><td>1 day</td></tr><tr><td>Mean Blob Fees (Arbitrum, USD)</td><td>FeeBlobARBMeanUSD</td><td>USD</td><td>1 day</td></tr><tr><td>Mean Blob Fees (Optimism, native units)</td><td>FeeBlobOPMeanNtv </td><td>Native units</td><td>1 day</td></tr><tr><td>Mean Blob Fees (Optimism, USD)</td><td>FeeBlobOPMeanUSD</td><td>USD</td><td>1 day</td></tr><tr><td>Mean Blob Fees (Base, native units)</td><td>FeeBlobBASEMeanNtv</td><td>Native units</td><td>1 day</td></tr><tr><td>Mean Blob Fees (Base, USD)</td><td>FeeBlobBASEMeanUSD</td><td>USD</td><td>1 day</td></tr></tbody></table>

#### Details

* The aggregate L2 metrics (FeeBlobL2MeanNtv & FeeBlobL2MeanUSD) include all tagged L2 sequencers. This list includes additional L2s that do not have dedicated metrics.

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/FeeBlobL2MeanNtv" %}

## Network State Storage Fees

### Definition

Total fees paid for storing state on the network within an interval in native units.

<table><thead><tr><th>Name</th><th width="216">MetricID</th><th>Unit</th><th>Interval</th></tr></thead><tbody><tr><td>Network state storage fees (native units)</td><td>FeeStorTotNtv</td><td>Native units</td><td>1 day</td></tr><tr><td>Network state storage fees (USD)</td><td>FeeStorTotUSD</td><td>USD</td><td>1 day</td></tr></tbody></table>

#### Details

* Solana removed network state storage fees in November of 2023 as of which time they are 0

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/FeeStorTotNtv" %}

### API Endpoints

Exchange Deposits metrics can be accessed using these endpoints:

* `timeseries/asset-metrics`

and by passing in the metric ID's `Fee*` and `Gas*` in the `metrics` parameter.

<mark style="color:blue;">`GET`</mark> `undefined/timeseries/asset-metrics`

{% tabs %}
{% tab title="Shell" %}
```shell
curl --compressed "https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=FeeByteMeanNtv&assets=btc&pretty=true&api_key=<your_key>"
```
{% endtab %}

{% tab title="Python" %}
```python
import requests
response = requests.get('https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=FeeByteMeanNtv&assets=btc&pretty=true&api_key=<your_key>').json()
print(response)
```
{% endtab %}

{% tab title="Python Client" %}
```python
from coinmetrics.api_client import CoinMetricsClient

api_key = "<API_KEY>"
client = CoinMetricsClient(api_key)

print(
    client.get_asset_metrics(
        metrics="FeeByteMeanNtv", 
        assets="btc",
    ).to_dataframe()
)
```
{% endtab %}
{% endtabs %}
