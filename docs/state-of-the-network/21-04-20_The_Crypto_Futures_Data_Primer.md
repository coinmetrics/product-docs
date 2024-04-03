# The Crypto Futures Data Primer

**Date:** 21-04-20

After topping $63K last week bitcoin (BTC) came crashing back down to earth this weekend. Following Coinbase’s IPO on Wednesday market sentiment was at a high amidst a rush of new media coverage. But by the end of the week narratives began to shift.

On Friday reports began to surface of regional blackouts in Northwest China causing mining operations to go offline and leading to a drop in Bitcoin’s hash rate. Bitcoin’s estimated hash rate indeed dropped on Friday to its lowest level since November 2020. But it has already started to rebound, and should continue to recover as miners come back online or relocate to other regions.

Although the drop in hash rate may have contributed to an initial panic selloff, BTC’s  drop was likely largely due to a cascade of liquidations on overleveraged BTC futures positions. Following the Coinbase IPO, BTC perpetual futures open interest surged to its highest levels ever. Open interest is a measurement of the total number of active futures contracts. Increasing open interest indicates that more contracts are being opened and additional money is coming into the market.

Open interest can also serve as a proxy for measuring leverage. Leverage can be used to increase the potential returns of a futures contract. Using leverage effectively allows a trader to wager larger amounts of capital than they currently have in the account. But using leverage also amplifies risk.

If there’s a relatively high amount of open interest there’s a good chance there’s a high amount of leverage in the futures market, as contracts are often opened using leverage. As large liquidations occur, open interest can quickly start to decrease as the market deleverages.

After opening a leveraged futures contract, the trader must keep a certain level of maintenance margin at the risk of being liquidated and losing their investment. Price movements can cause a trader to fall below margin requirements and result in liquidation. Highly leveraged trades typically require high levels of maintenance margin, which means relatively small dips in price can lead to getting liquidated.

April 17th had the highest amount of BTC perpetual futures long liquidations so far in 2021. As price dropped, overleveraged positions began to get liquidated. Liquidations tend to be self-reinforcing - as long positions are liquidated and sold spot price drops, leading to more liquidations. This can lead to liquidation cascades, which can sometimes cause large, sudden movements in spot price. Liquidation cascades can be painful in the short-term, but are generally healthy in the long-term as leverage levels get reset.

Derivatives like futures can get endlessly complex. But even just understanding the fundamentals can give you deeper insight into market dynamics and the forces pulling price in different directions.

To help better understand crypto futures and analyze the data behind them check out our latest in-depth research report: The Crypto Futures Data Primer.

It was an eventful week for both Bitcoin and Ethereum. BTC and ETH market caps both reached new all-time highs over the past week. But Bitcoin hash rate dropped 12.2% week-over-week due to the aforementioned regional blackouts in Northwest China. As block production slowed, BTC fees surged, growing 58.7%. Fees on ETH also surged as traders rushed to react to market volatility and on-chain arbitrage bots kicked in.

Stablecoins also saw a flurry of activity over the past week, likely due to investors moving to safety amidst the volatility over the weekend. Tether (USDT) and USDC active addresses grew by 13.9% and 33.9%, respectively. On-chain transfer value also surged for both, with USDT growing by 27.6% and USDC by 49.4%.

On Friday we released a special research report covering the recent OpenEthereum stoppage.

At block number 12,244,000 the Berlin hard fork was activated on Ethereum. Among many changes, it paves the ground for the upcoming London hard fork which will revamp how fees work on Ethereum with the activation of EIP-1559.

294 blocks after the Berlin hard fork activated, the second most popular implementation of the Ethereum protocol, OpenEthereum (ex-Parity) refused to accept new blocks. According to Etherscan, around 16% of all nodes were OpenEthereum (and another 15% Parity).

Immediately, many exchanges and services (including Coin Metrics) either became effectively disconnected from the Ethereum network, or stopped broadcasting transactions out of caution. Around 5 hours after the stoppage, a fix was released by the OpenEthereum team and most of the affected services were back online 9 hours after the incident started.

At first glance, the number of transactions mined on Ethereum was barely, if at all, affected by the sudden disappearance of OpenEthereum nodes.

(approximate stoppage window shown in red)

The best way to quantify the impact of the OpenEthereum stoppage is to look at how many distinct accounts created transactions. It usually hovers around 15,000 unique accounts creating transactions per hour, but dropped to around 9,000 during the outage. Knocking down 16% of nodes dropped the number of active network participants by 40%.

Thankfully, no block was mined that would have split the network in two. Furthermore, there was no decrease in mining activity. This is an indication that miners were not running OpenEthereum.

For more, read the full research report here: Analyzing the On-chain Impact of the OpenEthereum Stoppage.