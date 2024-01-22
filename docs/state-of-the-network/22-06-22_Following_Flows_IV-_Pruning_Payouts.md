# Following Flows IV: Pruning Payouts

**Date:** 22-06-22

This week’s State of the Network adds to our “Following Flows” series of research devoted to understanding miners’ blockchain activity. You can find our past research in this series below:

FOLLOWING FLOWS: A LOOK AT MINERS’ ON-CHAIN PAYMENTS

FOLLOWING FLOWS II: WHERE DO MINERS SELL?

FOLLOWING FLOWS III: MEASURING ETHEREUM MINER ACTIVITY

Bitcoin mining has undergone many changes over the years as the rewards for mining have grown. What started out as a group of hobbyists bootstrapping the network has evolved into a global industry with yearly USD revenues measured in the billions. There are now over 40 publicly-traded Bitcoin mining companies on US and Canadian exchanges and even a NASDAQ-listed, exchange-traded product to gain broad exposure to the group.

Like any business, Bitcoin miners often need to respond to changing economic conditions. As BTC’s price has come under pressure lately, analyzing miners’ on-chain activity has become a crucial piece of analysis to understand the current market cycle. The rich set of data provided by the public BTC ledger allows us to follow miners’ activity in real-time.

But the changing nature of BTC mining through time has required data observers like Coin Metrics to build new heuristics and rules to better track miners on-chain.

One complication that we’ve dealt with is the prevalence of mining pools. Bitcoin mining is a probabilistic process at its core and miners today pool their resources in order to smooth out their expected earnings. Pools represent a large number of miners that work together to find the next block and split the subsequent earnings. When a pool finds a new valid block, it is rewarded the new BTC (6.25 today) plus the fees users pay for each transaction included in that block.

After receiving the rewards, pools pass them along to the individual miners. At Coin Metrics, we call the initial receivers of block rewards (which are almost always pools today) 0-hop miners while the addresses that receive payouts from the mining pools are referred to as 1-hop miners. This dynamic is represented below:

Concretely, below is an example of payouts from the ViaBTC mining pool on June 1, 2022 with data sourced from Coin Metrics’ ATLAS. The pool paid out a total of 223 BTC on that day to 60 unique addresses.

The ubiquity of mining pools today makes studying the set of 1-hop miners essential. Coin Metrics has long served a suite of miner flows and miner supply metrics for both 0-hop and 1-hop miners.

While looking at the full 1-hop miner set can provide a high-level proxy for market-moving trends, there are benefits from deeper investigation using powerful on-chain detective tools such as Coin Metrics’ ATLAS. At Coin Metrics, we’re continually seeking ways to augment the data we already provide to better understand and contextualize blockchain activity. We’re actively working on new Bitcoin miner metrics and we’re excited to share some early findings.

A helpful starting point is understanding the composition and size of the 1-hop miner address set on an unadjusted basis. Today, the total number of 1-hop miners totals roughly 2.9M BTC addresses. That 2.9M includes all addresses that have ever received BTC from 0-hop miner addresses (those that have ever mined at least 1 BTC block, which totals 276K).

With a set so big, it is possible that some of the earliest 1-hop miners, when mining was less developed and professional, received funds from a 0-hop miner but are not actively mining anymore themselves. So one potentially helpful constraint would be to limit and adjust the size of the 1-hop set based on the time when that address last received a payout from a 0-hop miner.

The chart below shows how different time cut-offs change the size of the 1-hop set today. For example, if we restrict the 1-hop set to only include those addresses that have received a payout from a 0-hop miner in 2022 the size of the address set drops off from 2.9M to ~34K. Looking after 2021, there are 92K BTC addresses that have received at least one payout, and an incrementally larger 167K on or after 1/1/2020.

Another way to gauge the potential benefits from pruning the 1-hop set is by assessing the number of active 1-hop addresses (accounts) per month. The chart below shows that there were about 10K active 1-hop addresses last month that received BTC from 0-hop addresses. This has fallen since early 2018, possibly due to higher amounts of address reuse, and the growth of larger mining operations.

Isolating the most active 1-hop miners allows for more granular investigations into miner behavior. One important analysis is miner supply. With low enough break-even prices and alternative means of financing, some miners have the option to accumulate a significant portion of their rewards rather than sell them immediately.

This has become especially important in the era of public miners as some mining companies have easily tapped into US capital markets while accumulating coins.

Looking at the full set of 2.9M 1-hop addresses, these addresses collectively held 2.6M BTC as of June 20, 2022, or about 13.6% of all BTC supply.

Zooming in on the trimmed-down 1-hop set of 34K addresses that have received a payout in 2022, the balances held are much smaller in scale as expected. As of June 21, these 34K addresses collectively held 125K BTC.

As mentioned above, the full 1-hop set is a helpful proxy but has a few important limitations to keep in mind. In addition to the possible “inactive miners” described above, exchange addresses can also muddy the picture.

It is not uncommon for miners to request pool payouts directly to exchange deposit or hot wallet addresses, which will lead to exchange addresses technically being classified as 1-hop miners. This can be troublesome if other users’ funds are custodied in the same exchange wallet, as the address balance would reflect more than just the BTC miner’s balance.

With this in mind, we took the pruning exercise one step further to try and eliminate any exchange addresses. We removed known exchange addresses that we have tagged and also removed any address holding greater than 10K BTC. We chose this threshold because the largest public miners disclose their BTC holdings, and according to data collected from Arcane Research, no public miner held more than this amount as of May 2022.

Adding these additional rules reduced the set to 28K addresses. To recap, to be included in this set the address must have met the following criteria:

The address received BTC from a 0-hop address in 2022.

The address is not known to be controlled by an exchange.

The address does not hold more than 10K BTC.

These 28K addresses in aggregate were mostly accumulating BTC throughout 2022 but have since decreased their balances in June during the recent volatility.

Bitcoin generates data at a level unlike any other major financial asset. Every transaction in BTC’s history is recorded on a public ledger that is readily available to analyze for anyone that would like to run a BTC node. This allows crypto data analysts to construct detailed observations about balances and flows across large groupings of on-chain addresses associated with the new issuance of coins.

While high-level observations about miners are helpful, blockchain data can be even more insightful when reasonable rules and heuristics are applied to filter out noise and isolate signals.

As more BTC miners disclose information about their operations to the public market, combining this information with blockchain data can offer new insights on miners’ BTC holdings and activity on-chain.

We are excited to continue exploring new ways to add to our existing mining data taking into account the results from this research.

To keep up to date with our mining data and other on-chain metrics check out our free charting tool, formula builder, correlation tool, and python API client.

Thanks to Karim Helmy for suggestions on this topic.

Bitcoin active addresses averaged around 917K per day over the last week, a 3% increase from the previous week. Active addresses were also up 3% week-over-week for Ethereum.

Tether saw its largest token burn in history with 6.6B USDT burned on Tron and 4.5B burned on Ethereum. To process redemptions, Tether sends USDT tokens to a treasury address it controls. It periodically conducts token burns (sending to an address where no one has the private key) to permanently remove these tokens from circulation.