# Analyzing Miner to Exchange Flows

**Date:** 21-02-23

Miners are often considered natural sellers of bitcoin (BTC). Their revenue is earned from block rewards and transaction fees which are paid out in BTC. But their costs, like electricity and rent, are paid using fiat currencies. Miners therefore need to sell a certain amount of their BTC to cover costs and stay profitable.

Because of their crucial place in the ecosystem, miner on-chain behavior is important to understand. But up until now there has not been much data about how often miners send their BTC to exchanges and which exchanges they send it to.

In his latest research piece, Following Flows II: Where do Miners Sell?, Karim Helmy introduces a new set of metrics for tracking the flow of BTC from miner addresses to exchanges. The metrics are built upon his prior research into miner flows, which introduced a method for identifying transfers to mining pools and individual miners.

Miner-exchange flows give an interesting look into miners’ on-chain behavior. Two exchanges in particular are by far the biggest recipient of transfers from miners: Binance and Huobi.

These results aren’t surprising considering Huobi and Binance are the only two exchanges in our coverage that also operate mining pools. But the large share of inflows is also likely because both exchanges have a strong presence in Asia, where most miners are based.

The report also analyzes the amount of total miner-exchange flows and looks at exchange deposits and withdrawals compared to BTC price. Overall, there’s a low correlation between miner-exchange flows and price. This can be seen in the below chart which compares miner outflows, exchange inflows, and BTC price. These values rarely move in tandem, indicating a low correlation.

There are still some blind spots in the data. Miners often sell on OTC desks as opposed to retail exchanges and OTC flows are not reflected in the data. Additionally, the flows do not yet include a few major exchanges, including Coinbase. But this first iteration serves as a solid foundation for miner -exchange flow data, and will continue to be improved upon in future releases.

Read Karim’s full piece on miner-exchange flows here: Following Flows II: Where do Miners Sell?

To keep up to date with our mining flow data and other on-chain metrics check out our free charting tool, formula builder, correlation tool, and mobile apps.

Bitcoin (BTC) and Ethereum (ETH) both had strong weeks. With BTC price pushing towards $60K and ETH crossing $2k market cap and realized cap for both assets reached new all-time highs. On-chain activity dropped a little bit week-over-week, with a 3.4% drop in BTC active addresses and a modest 0.7% gain for ETH. But that comes on the heels of a very strong week of on-chain activity. Daily active addresses still remain near all-time highs, with a daily average of 1.1M for BTC and 601K for ETH.

Stablecoins also continue to ascend amidst the market volatility. Tether market cap grew by 8.1% week-over-week to over $34.6B. USDC market cap also grew by a little over 8%.

Bitcoin hash rate has surged to new all-time highs in February. As price climbs higher, miners earn more through block rewards (in USD terms) and transaction fees. This increase in revenue incentivizes miners to join the network and contribute more hash power to try to win the growing reward. The following chart shows the 7-day average Bitcoin hash rate and difficulty.

The large price increase to start 2021 has also caused realized capitalization to shoot up to new all-time highs. Realized cap can be thought of as a gross approximation of bitcoin’s aggregate cost basis. It’s calculated by valuing each unit of bitcoin individually at the price that it was last transacted on-chain. Therefore it discounts the price of coins that were last moved during periods where price was relatively low.

Market value to realized value (MVRV) is calculated by dividing bitcoin’s market capitalization by its realized capitalization. In our variant of the MVRV calculation, we use free float (i.e. liquid) market capitalization in place of the traditional version of market capitalization which is based on total on-chain supply.

BTC’s free float MVRV reached about 3.1 on February 21st. Historically, an MVRV over 3 has signalled local price peaks, like in July and December 2017. MVRV also reached about 3.0 on January 8th, 2021, as BTC price reached $40K before dropping back down to about $30K. But it's important to note that historic performance doesn’t necessarily mean that the trend will continue moving forward. Market conditions are different now than they were in 2017, and have also differed in the past. For example, free float MVRV peaked at over 5 during 2013 and 2014.

For more details about MVRV and other on-chain indicators see our Bitcoin On-chain Indicators Primer.

Fees continue to rise on both Bitcoin and Ethereum. The average transaction fee on both networks has now reached over $20.

High transaction fees have led to new rounds of talks of potential Ethereum killers - smart contract platforms that could overtake Ethereum’s big lead in decentralized applications.This time around an unexpected contender has emerged: the Binance Smart Chain (BSC).

As the name implies, the BSC is operated by a centralized exchange: Binance. It’s also designed to be compatible with the Ethereum Virtual Machine (EVM). BSC fees are much lower than Ethereum, which could potentially lure over some Ethereum users. But low fees come at a cost; the Binance Smart Chain is inherently more centralized than Ethereum due to the control exerted by Binance.

So far the big increase in ETH fees has not led to a noticeable drop in ETH daily active addresses. Ethereum usage remains near all-time highs despite the fees, at least for now, which shows the high demand to use the network.