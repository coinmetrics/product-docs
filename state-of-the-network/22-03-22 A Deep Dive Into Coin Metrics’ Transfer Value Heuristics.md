# A Deep Dive Into Coin Metrics’ Transfer Value Heuristics

**Date:** 22-03-22

The following is an excerpt from an in-depth report covering the nuances of Coin Metrics’ adjusted blockchain transfer volume. Access the full report here.

In 2021, more value was transferred across Bitcoin and Ethereum in dollar terms than ever before, with both networks settling amounts measured in the trillions. As crypto adoption accelerates, more and more eyes are now turning to blockchain data to understand their growing economic significance.

Raw transfer figures are exactly measurable because public blockchains are distributed and open databases that allow anyone, anywhere, to access the entire history of transactions and amounts transferred between users.

Flow of bitcoin in 100 sample transactions extracted from Bitcoin block 727506, data compiled from Coin Metrics’ ATLAS.

However, using blockchain data for economic analysis is a fragile exercise. Raw data is rife with noise and opportunity for misinterpretation. Coin Metrics was founded out of this exact need for high quality, carefully-curated crypto data. Some of CM’s earliest research (c. 2018) outlined the arduous task of estimating on-chain volume.

Today, Coin Metrics approaches this task by applying a series of rules or “heuristics” to the raw data, informed by leading industry research and our own fundamental understanding of blockchain data. These rules ultimately help us siphon out noise and better determine the significance of burgeoning public blockchain economies. We currently offer our adjusted transfer volume estimates across 116 unique assets to both community and pro CM users alike.

It is vital to understand the sources of difficulty in accurately gauging on-chain transfer volume. They can be broken down into two buckets: adjustments needed for non-meaningful activity and adjustments arising from blockchain design.

Non-meaningful activity comes in many different flavors but a general theme is that the owner of the asset does not change during the transfer. Some examples include mixers, centralized exchange wallet reshuffles, and pass throughs/obvious intermediaries.

The other challenge arises from different blockchain design schemes. Today, there are two major blockchain design philosophies: unspent transaction output (UTXO) based and account-based.

Given the structural differences between UTXO and Account-based blockchain design, different approaches must be applied to each. The table below summarizes the heuristics that Coin Metrics currently uses when calculating our base transfer value figure (TxTfrVal) and adjusted transfer value (TxTfrValAdj), for both native and USD denominated data.

Without the ground truth, it’s impossible to exactly measure the performance of transfer value heuristics. However, there are methods to establish confidence in the results.

Studying unadjusted total value transferred against adjusted totals by crypto asset yields valuable insight into the heuristics’ effectiveness. The table below shows the total value transferred in 2021 using our baseline metric and heuristic-adjusted total. The column to the far right shows the impact of adjustments, measured by the percentage of volume removed when moving from the baseline to adjusted figure.

Continue reading the full report…

Most major crypto assets bounced back over the last week with BTC and ETH market caps rising by 5% and 8%, respectively. BTC active addresses averaged 937K per day over the week, a 4% rise week-over-week. The two largest stablecoins on Ethereum saw increased on-chain activity last week. Daily active USDT (ETH) addresses rose 10% week-over-week while USDC active addresses increased 4%.

The charts below show the cumulative donated to and current balance of Ukrainian-government controlled crypto addresses as of Monday, March 21st.

The total amount of ETH sent to the Ethereum staking contract accelerated past 10M on March 8th and is already more than half way to 11M ETH. In total, about 9% of all ETH supply is now locked in the staking contract.

Much of the new ETH deposits have been completed using Lido which is a liquid staking protocol. Lido depositors receive staked ETH tokens (stETH) that represent their staking position. The supply of stETH is now over 2.5M, rising from 2M just at the beginning of March.

The move to a proof-of-stake Ethereum also took one step closer last week with the successful testing of The Merge (move from a proof-of-work to proof-of-stake consensus) on the Kiln testnet.

Check out our weekly summary video for more on-chain highlights. Over 2M ETH has now been burnt since EIP-1559 was introduced to Ethereum in August 2021.