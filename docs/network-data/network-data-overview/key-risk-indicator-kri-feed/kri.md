# Key Risk Indicator (KRI) Feed

**A Background on Network Risk**

Bitcoin is the first successful implementation of a blockchain with its own native cryptocurrency. It solved a fundamental problem in computer science abstractly expressed by Lamport, Shostak, and Pease in 1982 as the Byzantine Generals Problem, or BGP. The crux of this problem is that, in networks where participants do not trust each other, it is hard to discern statements that are true from those that are false. If enough network participants are malicious or are acting erratically, it becomes impossible for honest participants to converge on what is true. It took decades for this problem to be effectively solved in an open network with the advent of Bitcoin’s Nakamoto Consensus. Beyond providing a solution to the BGP, Bitcoin effectively gave birth to an entire industry as it demonstrated a novel way to issue and settle assets.\\

A fundamental property of Nakamoto Consensus that was key in solving the BGP is the ability for the ordering of blocks in the blockchain to be changed if certain conditions are met. The most common of such events are Chain Reorganizations, or “reorgs”. When reorgs occur, transactions may be removed from the blockchain. Previously valid blocks are removed and transactions are sent back to the memory pool or the mempool, the space within a blockchain node where unprocessed transactions are temporarily stored. A drawback of this system is that if fee conditions in the network change by the time such transactions return to the mempool, their final settlement might be impeded without additional action by users. Cryptoasset exchanges have historically been impacted by this in times of network fee volatility, especially during the 2017 bull market.\\

The very same property also makes it possible for network attacks, such as so-called “51% attacks,” in which an attacker attains enough mining power to trigger reorgs for personal gain. The feasibility of these attacks depends on the number of honest miners securing a network: while these attacks have never been successfully performed on a large network like Bitcoin, smaller networks such as Bitcoin Gold, Vertcoin, and Ethereum Classic have been targeted. In most cases, cryptoasset exchanges are the main targets of these attacks. By simply reverting exchange deposits, attackers have been able to net millions of dollars worth of cryptoassets. Unfortunately, just like naturally occurring reorgs, market participants such as exchanges have few resources to manage such risks and assess the likelihood of their transactions being affected.\\

FARUM solves this problem by tracking the full spectrum of possible risks by making use of both conventional and unconventional data sources. Raw data on blockchain transactions across all supported networks is formatted in accordance with Coin Metric’s Universal Blockchain Data Model (UBDM), which is provisioned via the [Atlas API](https://coinmetrics.io/atlas/). In order to also provide alerts on unprocessed transactions, FARUM employs Coin Metric’s Mempool Collector, a low-latency mempool querying engine built from the ground up to maximize performance. These sources provide a complete view of both processed and unprocessed transactions from which network risk can be managed and alerts can be created.\\

![Data Sources Supporting FARUM](https://lh6.googleusercontent.com/tbrLzx8p7\_ijfSK2gijy8av2Ap7MK2pKXW4bvYNPK9VRS4whGYd\_srEvbJfFxn-s4lma0pJsEzlomKUvW8283seoEcEUhdfGVJtCjmviGCBtdDXkzxv91ag6e51uQm1698mSvOo)

Given the wide spectrum of risk vectors that must be covered, FARUM looks beyond transactional data flowing through a cryptoasset’s peer-to-peer network. Since observing mining pool protocols can provide a view on future blocks, additional data sources include the Mining Pool Collector, which connects to several mining pools via the Stratum protocol to obtain information about blocks being mined and/or impending network attacks. In order to evaluate potential attack vectors and/or ongoing attacks, FARUM employs many other collectors that will be described in this document.

See:

* [Network Risk Overview](broken-reference)

[**Block Attributes**](block-attributes.md)

* block\_base\_fee
* block\_priority\_fee

[**Block Size**](block-size.md)

* block\_size

[**Block Times**](block-times.md)

* time\_inter\_block
* time\_since\_last\_block

[**Blocks**](blocks.md)

* block\_count\_at\_tip
* block\_count\_by\_same\_miner\_6b
* block\_count\_by\_unknown\_miners\_6b
* block\_count\_without\_segwit

[**Empty Blocks**](empty-blocks.md)

* block\_count\_consecutive\_empty
* block\_count\_empty\_6b
* block\_missed\_slots

[**Feerates**](feerates.md)

* mempool\_feerate\_mean
* mempool\_feerate\_median
* mempool\_next\_block\_approx\_feerate\_max
* mempool\_next\_block\_approx\_feerate\_mean
* mempool\_next\_block\_approx\_feerate\_median
* mempool\_next\_block\_approx\_feerate\_min
* mempool\_next\_block\_inclusion\_approx\_feerate\_min

[**Fees**](fees.md)

* mempool\_fee
* mempool\_fee\_entered\_1m
* mempool\_fee\_mean
* mempool\_fee\_mean\_entered\_1m
* mempool\_fee\_median

[**Hashrate**](hashrate.md)

* block\_hashrate\_mean\_1d

[**Outputs**](outputs.md)

* mempool\_output\_value
* mempool\_output\_value\_entered\_1m

[**Rewards**](rewards.md)

* mining\_reward\_mean
* mining\_reward\_spread

[**Transaction Feerates**](transaction-feerates.md)

* block\_feerate\_max
* block\_feerate\_mean
* block\_feerate\_median
* block\_feerate\_min

[**Transaction Fees**](transaction-fees.md)

* block\_fee\_max
* block\_fee\_mean
* block\_fee\_median
* block\_fee\_min
* block\_fees

[**Transaction Sizes**](transaction-sizes.md)

* mempool\_size
* mempool\_size\_entered\_1m
* mempool\_size\_left\_1m
* mempool\_vsize
* mempool\_vsize\_entered\_1m
* mempool\_vsize\_left\_1m

[**Transactions**](transactions.md)

* block\_tx\_count
* mempool\_count
* mempool\_count\_entered\_1m
