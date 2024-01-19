# State of the Network’s Q4 2022 Mining Data Special

**Date:** 22-12-13

In this special edition of State of the Network, we take a data-driven look at the Bitcoin mining ecosystem in Q4 2022. To catch up on our other quarterly mining reviews from this year, check out the links below.

SOTN’s 2022 Quarterly Mining Specials: Q1, Q2, Q3

Bitcoin hash rate continued to push higher throughout most of Q4 in spite of a subdued spot BTC price. Hash rate — a proxy for the total amount of computational effort securing the network — hit as high as 250 EH/s (quintillion hashes per second) in late October, an all-time high. Hash rate had grown throughout the summer as publicly-traded Bitcoin miners continued to add capacity via mining rigs pre-ordered during the bull market.

There’s a potentially interesting explanation behind the late September and October rise in hash rate: The Ethereum Merge. As independent crypto researcher Data Always has suggested, the end of Ethereum mining likely incentivized operators to repurpose industrial rack space, swapping out GPUs used to mine Ethereum with ASICs used to mine Bitcoin. It’s hard to put an exact figure on the magnitude of this resource reallocation, but Bitcoin hash rate grew quickly from 220 EH/s to 250 EH/s shortly after the completion of The Merge in September.

However, with the price of spot BTC facing renewed downward pressure in the wake of FTX’s failures, hash rate has started to slide. Bitcoin’s mining difficulty — a network parameter that automatically adjusts every 2 weeks to keep block times in check — decreased by more than 7% recently (see first chart above), the biggest decrease since miners abruptly exited China in spring 2021.

The stagnation in hash rate is a sign that miners are facing a new round of challenges amid wary market conditions.

Sources: Coin Metrics ATLAS & Reference Rates

One proxy we can use to monitor mining activity is the number of Bitcoin addresses receiving payouts directly from mining pools. These "one-hop" addresses are typically controlled by individual miners contributing hash power to their mining pool of choice. Active miner addresses tend to peak just after Bitcoin price has topped, with slow-moving hardware deployments arriving late to the party as speculative enthusiasm begins to dwindle. Five months after the BTC price peaked in December 2017, monthly active miner addresses tipped 80,000, only to crash to lows near 10,000 in 2020.

This bull cycle, we didn't see nearly the same level of mining mania reflected in active addresses, potentially due to the consolidation of hash power into a smaller set of publicly-traded entities. However, in 2022 we've still seen the number of active mining addresses fall more than 50% from recent highs, reaching the lowest levels since 2011. Miner active addresses appeared to find a bottom in August, bouncing weakly back over the past few months, but activity could easily decline in December as major miners continue to file for bankruptcy.

Though the mining industry has matured significantly in the past few years, the continued trend of cyclical capitulation indicates the sector has some progress to make on proper risk management. While power-purchasing agreements enable miners to control exposure to rising energy prices, options for managing exposure to hashprice— a metric measuring USD-denominated revenue per unit of hashrate— are slim to none. To this end, mining service providers like Luxor Technologies have developed derivatives products for more sophisticated operations, allowing miners to hedge their exposure by selling hashprice Non-Deliverable Forward (NDF) contracts.

In the example scenario pictured above, a miner could use Luxor's NDF contract to hedge against a month-over-month decline in hashprice. Normally, a drop in hashprice would simply result in a loss of revenue— however, if a miner sold 1,500 NDF contracts at $90 per PH/s/day, they'd effectively lock-in revenue at this threshold. Thirty days later, the miner settles the contract at a hashprice of $70 per PH/s/day, netting a $30K profit and offsetting a broader decline in mining revenue.

While Luxor's hashprice marketplace is still in its early stages, hashrate derivatives will undoubtedly play an increasingly important role in managing miner risk, especially as the industry continues to attract capital allocators from more traditional sectors.

With the collapse of Poolin and the unprecedented growth of the U.S. mining industry, Foundry USA Pool has aggressively expanded its share of the Bitcoin hashrate. While the Poolin episode serves as a healthy reminder of how quickly fortunes can change in the mining pool ecosystem, the migration of hashrate has furthered the dominance of the top 3 mining pools, with Foundry, AntPool, and F2Pool collectively controlling well over 50% of market share. Foundry’s place in the top 3 is especially noteworthy, with the American mining pool overtaking the longstanding leadership of Asia-based pools at the beginning of 2022.

Interestingly, Foundry has also managed to maintain its foothold as the dominant mining pool without mining a single empty block.

Foundry’s lack of empty blocks serves as a testament to the pool’s block templating prowess. In the split seconds after a block is mined, mining pools scramble to assemble a new block template, selecting the highest-paying transactions for inclusion in their next attempt at solving the Proof-of-Work. During this short period, pools continue to throw off hashrate, meaning there’s a small chance of a block being mined before a transaction-bearing template is fully assembled.

So far in 2022, Foundry has constructed block templates quickly enough to beat the clock. With the upcoming release of Stratum V2, however, individual miners will soon have the option of assembling their own templates, cutting mining pool-middlemen out of the transaction selection process. Whether this will affect the frequency of empty blocks— and how that will impact the mining pool landscape— still remains to be seen.

Through the latter half of 2022, the mempool has remained relatively muted, with the exception of a prolonged period of congestion in mid-November. A massive flood of 12-15 sat/vB transactions (allegedly due to a Binance cold wallet consolidation) resulted in a substantial spike in the average mining reward, with F2Pool netting over 0.73 BTC in transaction fees for a single block.

Of course, it wouldn't be a Bitcoin bear market without a bit of vicious community in-fighting about seemingly minor technical details. Casual users of Bitcoin likely haven’t even heard of Replace-by-Fee (RBF), a unique transaction type that allows users the option to re-broadcast a prior on-chain payment with a slightly higher fee.

Replace-by-Fee was designed to help relieve mempool pressure in periods of congestion, allowing users to bump transactions up the priority queue in exchange for a slightly higher tip to miners. However, members of Bitcoin’s business community warn the feature is easy to abuse— users can also “reverse” 0-confirmation transactions by re-broadcasting a payment and substituting their own address as the recipient. For merchants unsuspectingly accepting malicious 0-conf transactions, this effectively amounts to a double-spend, increasing the risk of chargeback fraud.

Since their introduction in 2016, RBF-enabled transactions have become increasingly common. However, with the controversial release of Bitcoin Core 24.0, Replace-by-Fee is now the default setting for node mempools. While this change has seen plenty of pushback from the merchant community, developers stand firmly behind the upgrade, arguing that 0-confirmations have never been safe to accept in the first place. If you want instant settlement, Bitcoin’s Lightning Network is a better option.

In any case, miners have little direct incentive to worry about the potential for Replace-by-Fee fraud. Higher fees simply boost miner’s bottom line, no matter where they come from. Nonetheless, the increased complexity of monitoring RBF transactions could also make block templating significantly more difficult, forcing miners to keep their finger on the pulse of the mempool more than ever before.

Miners have had a tough year and a particularly hard Q4. Looking to 2023, there are plenty of outstanding questions that will dictate the direction of the Bitcoin mining industry beyond just the price of BTC.

With the expansion of the industry’s US footprint, mining is being analyzed differently by various jurisdictions. In November, New York enacted a first of its kind two-year moratorium on new mining operations in the state. Meanwhile, as Texas prepares for winter, the Energy Reliability Council of Texas (ERCOT) recently reported 1.7 gigawatts (GW) worth of Large Flexible Loads primarily composed of Bitcoin miners to help state grid operators manage periods of high demand. The interactions between miners and governments at the local, state, and possibly federal level could continue to accelerate in 2023.

On the operational side, miners will likely need to continue to monitor input costs in the face of higher industrial electricity rates. Large operators with competitive rates in advantageous locations optimizing over every variable are poised to succeed in this environment. Further maturation and technical upgrades next year could benefit the ecosystem, such as the impending launch of Stratum V2.

There are plenty of challenges, but in the face of it all miners continue to hash away, securing the chain while cleverly positioning operations for success and survival.

On-chain activity accelerated for a few assets over the week. On Ethereum, active addresses hit 1.5M on December 9th, breaking a million for the first time since July. But as a one-off spike, this is indicative of intra-exchange activity such as a hot-wallet consolidation. Meanwhile, BTC active addresses held steady around 900K per day.