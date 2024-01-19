# Examining Coin Metrics' New Staking Metrics

**Date:** 22-09-20

Ethereum hasn’t skipped a beat since The Merge. Over 5.7M transactions have been processed in the first ~32K blocks under Proof-of-Stake since last Thursday’s long-awaited transition. The hot switch from Proof-of-Work to Proof-of-Stake was executed successfully; we recapped the event in detail in a special edition of State of the Network last week.

This week’s SOTN focuses on some of Coin Metrics’ new staking-related Ethereum metrics released alongside The Merge. As a reminder, new metrics related to Ethereum’s Consensus Layer (the Beacon Chain) can be found under the ticker ETH_CL. In contrast, all existing Ethereum metrics pertaining to Ethereum’s Execution Layer can still be found under the ticker ETH.

Using the new ETH_CL validator metrics it is possible to estimate the yield from the protocol. In combination with historical data on priority tips, we can estimate what a validator should expect to earn. Note that maximal extractable value (MEV) is another source of revenue for validators but is currently not considered as part of this analysis.

A validator’s expected annual percentage return (APR) from staking rewards accumulated on the Consensus Layer, assuming perfect performance and uptime, can be estimated with the formula below (where ValidatorActOngCnt = number of active validators):

Currently, there are approximately 430,000 validators participating, which corresponds to an estimated 4.48% APR. We can also estimate the expected annual issuance (ignoring burnt fees) to around 616,970 in annual ETH emissions using the following formula:

More details on the derivations from protocol-set parameters can be found here.

Note that this measure of gross emissions does not consider any burnt fees, and for this reason we cannot say from this data alone if Ethereum is inflationary or deflationary. As seen in the chart below, after PoS, ETH tends to be deflationary when there is significant on-chain activity to drive base fees higher. Due to lower gas demand, ETH has been slightly inflationary, even after accounting for PoW issuance dropping to zero post-Merge. However, daily issuance has dropped ~88%.

Rewards from staking are only one part of a validator’s yield. Post-Merge, validators now also receive user transaction priority fees, or tips, that used to go to miners on the Execution Layer. Considering the historical record of fees, we can estimate the magnitude of this additional source of yield. For our analysis, we show how to estimate both staking revenues and priority tips as yields on staked ETH.

To do this, we use the results we found above and divide gross annual emission by the total number of validators to produce average validator revenue, which for this purpose only consider revenues that originate from the protocol and not from fees.

The expected annual number of blocks proposed in turn allows us to estimate the priority tip that is earned by each block proposal. Using a 14-day moving average to smooth priority tips, we then estimate what a proposer should expect to earn in tips.

Bringing this all together, we can estimate total yield to stakers (excluding MEV) by combining both the expected priority tip yield and validator yield. As we can see, priority tip yield can amount to a significant portion of total yield from staking, even though it is much more volatile than yield on staking (the chart below only considers the post-EIP 1559 period when the concept of tips was introduced).

We’ve also introduced metrics to track the amount of staked ETH. Currently, 13.8M ETH is being staked or about 11.5% of all ETH supply. Users stake their funds through a specified smart contract on the Execution Layer. These funds are locked up by the contract and “recreated” on the Consensus Layer, enabling users to enter the validator set (provided they have sent a total of at least 32 ETH) and start to validate blocks and receive staking rewards. The chart below shows the amount of ETH sent to the staking contract on the Execution Layer since the Beacon Chain’s genesis in December 2020 (ETH.SplyCLCont).

Staking derivatives have quickly emerged as a popular method of staking. In addition to data Coin Metrics already serves for Lido’s stETH token, we also introduced a metric to track the total supply staked through Lido on the Execution Layer (ETH.SplyLidoCont). After rising steadily in spring 2022, ETH staked with Lido has slowed. Currently around 30% of all ETH staked has been through Lido, which is a protocol that connects deposited ETH to a whitelisted set of node operators.

Using existing metrics on ETH held by smart contracts (SplyContNtv), we can compare the amount of ETH staked vs. ETH held by other smart contracts. The blue and light blue parts of the chart below shows the total amount of ETH being staked through Lido and other means. The purple is all ETH unstaked and held by smart contracts. Finally, the green is all unstaked ETH held by regular Ethereum accounts called EOAs (externally owned accounts).

New metrics also cover the number of new validators entering the active set over time. It is important to understand the dynamics of how the active validator set evolves over time for economic and security reasons. Expected staking rewards move inversely to the number of active validators, and daily issuance increases with more validators. But more validators can also help strengthen the security of the network.

Ethereum’s PoS system has embedded a rate limiting mechanism to maintain stability in the active validator set. This means that only a specified number of validators can enter the active set in a given time period. Currently, a maximum of 1,350 new validators can enter the set each day. This number is dictated by a variable known as the churn limit. The churn limit increases roughly every 66K validators, allowing more new validators to join with a higher limit. For example, the churn limit will hit 7 with 458K validators, which allow up to 1,575 new validators to join each day. When there are more users wanting to join the validator set than activations available, a queue forms. The chart below shows the number of active validators over time as well as the queue and churn limit thresholds.

So far, there have been four pronounced queues that have formed with the last large queue clearing out at the end of May 2022 as Lido deposits slowed after market conditions weakened broadly. Small queues started to form a few weeks ago in anticipation of The Merge but they have quickly cleared out. It will be interesting to see if the queue starts to rebuild as the execution risk of The Merge has abated.

This covers just a sample of the new metrics introduced in this first phase of staking metrics. For a full list of new metrics, check out our announcement here. To keep updated on new metric announcements, make sure to follow CM on Twitter, check out our website, and look here for announcements.

BTC adjusted value settled on-chain was $15.5B on September 14th, the highest level since June 21st. Over the week BTC daily adj. value settled rose 33%. ETH active addresses rose 16% week-over-week as The Merge passed by smoothly on the network. Active addresses and transfers of Lido’s stETH staking derivative rose 64% and 46% over the week, as activity increased around The Merge.