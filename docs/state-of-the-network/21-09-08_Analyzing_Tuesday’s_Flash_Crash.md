# Analyzing Tuesday’s Flash Crash

**Date:** 21-09-08

As summer came to a close the crypto markets came roaring back to life. BTC surged from $39.3K on August 1st to over $52K on September 6th. Over the same period, ETH climbed from about $2.6K to over $3.9K, close to breaking new all-time highs. Solana (SOL), Cardano (ADA), and others also surged to new all-time highs. But then on Tuesday, September 7th, the markets suddenly came crashing down. BTC dropped to as low as $43.2K, falling by almost $10K.

What caused the flash crash? As usual, there were likely many factors at play. Right before the crash, El Salvador officially accepted BTC as legal tender, a much anticipated event that was months in the making. Some traders may have been buying the rumor and selling the news, cashing out amidst the anticipated media attention.

This news or other events may have caused an initial price drop, but as is often the case in crypto markets the sudden crash was likely mostly due to a series of liquidations of  leveraged futures. There was over $2.3B worth of liquidations on Tuesday, the most since May 19th.

Leverage can be used to increase the potential returns of a futures contract. Using leverage effectively allows a trader to wager larger amounts of capital than they currently have in the account. But using leverage also amplifies risk.

After taking out a leveraged position, traders must keep a certain amount of collateral in their account or risk being liquidated and losing their investment. Sudden price movements can cause a trader to fall below margin requirements and result in liquidation. Highly leveraged trades typically require high levels of maintenance margin, which means relatively small dips in price can lead to getting liquidated.

Liquidations can also cause spot price to swing in one direction or the other. As short positions are liquidated exchanges (or arbitrageurs) may be forced to buy the underlying asset to cover. And when longs are liquidated, they may be forced to sell, putting pressure on spot price. Because of this, liquidations tend to be self-reinforcing - liquidations trigger more liquidations. This can lead to liquidation cascades, which can sometimes cause large, sudden movements in spot price.

Historically, crypto futures markets have allowed for relatively high amounts of leverage. Binance, FTX, and other exchanges recently reduced their maximum leverage from 100x to 20x, which has helped remove the ultra high risk trades. But it likely hasn’t had too much of an impact on the overall number of futures contracts being opened using leverage.

Before Tuesday’s crash, futures open interest had climbed back to levels last seen in May. During May the crypto market also experienced a large crash amplified by a liquidation cascade.

Open interest is a measurement of the total number of active futures contracts. Increasing open interest indicates that more contracts are being opened and additional money is coming into the market. Open interest can also serve as a proxy for measuring leverage. If there’s a relatively high amount of open interest there’s a good chance there’s a high amount of leverage in the futures market, as contracts are often opened using leverage. As large liquidations occur, open interest can quickly start to decrease as the market delverages.

Before the crash, BTC total open interest across the major exchanges reached as high as $19.8B. But it was still well below the all-time high of $23.25B set on April 12th, and below May’s high of $21.1B.

The amount of ETH open interest reached a new all-time high before Tuesday’s crash. ETH open interest hit $11.6B on September 6th compared to a previous high of $11.3B on May 11th. ETH open interest increased drastically in September, growing by over $3B since the start of the month. But although ETH price was approaching $4K on September 6th, it was still below the all-time high of $4,155 set on May 10th.

The rapid rise in ETH open interest was likely aided by high amounts of leverage. As traders became increasingly bullish about ETH’s future many began to take out leveraged long positions, anticipating that price would continue to rise.

In another sign of ETH bullishness, before the crash ETH perpetual futures funding rates ticked up to their highest levels since May. When the funding rate for a perpetual futures contract is positive, holders of long positions pay short positions. If the funding rate is negative, short positions pay long positions. Increasing funding rate signals that there’s a growing amount of long contracts that are willing to pay the funding rate in order to remain open, typically a sign of positive market sentiment.

ETH trading volume spiked in September although it was still significantly less than the levels seen in May leading up the run above $4.1K. But like most of crypto, ETH has significantly more futures trading volume than spot trading volume. The relatively large amount of futures trading, much of which is opened using leverage, makes crypto susceptible to the types of crashes seen on Tuesday and in May.

Although painful in the short-term, leverage flushes are typically healthy over the long-term. If the system gets overleveraged flash crashes can help flush out some of the riskier contracts and reset to healthier levels. This creates a more solid foundation for building towards the next leg up.

While liquidation cascades have dramatic effects on price, they don’t change underlying fundamentals. Ethereum alone has added more than 6.2M addresses holding 0.01-1 ETH since the start of 2021. User adoption is growing at a rapid rate, and was not meaningfully impacted by the crash.

As long as there is leverage there will be flash crashes. But despite the short-term price, the ecosystem should continue to grow over the long run as crypto gets adopted by more and more people around the world.

To explore the data used in this piece check out our new market data metrics. For an in-depth introduction to crypto futures data see our Crypto Futures Data Primer. And to see our other available assets and on-chain metrics check out our free charting tool, formula builder, correlation tool, and mobile apps.

Hash rate for BTC and ETH continued to increase over the last week from July lows. While BTC hash rate is still ~25% lower than May highs, ETH hash rate has hit an all time high. ETH miner revenue was up ~20% as NFT activity in projects such as Loot  and its many spin-offs, has likely pushed priority gas fees (miner tips) higher.

ETH gas prices spiked on Tuesday as trading activity and transfers initiated from DeFi protocols picked up during the flash crash. On top of this, NFT mania raged on with the launch of a new project called “The Sevens.” As a result, high base fees translated into negative ETH issuance during many blocks Tuesday (blocks with negative ETH issuance are represented by the red dots below).

In one extreme example, over 95 ETH was burnt in a single block. Last week, ETH had its first deflationary day post EIP-1559 with over $54M of ETH burned on September 2nd. September 7th marked the second deflationary day for ETH.

Stablecoins faced yet another test amidst yesterday’s volatility. Analyzing stablecoins’ prices during times of market tumult is important because stablecoins can be thrown off their peg during rapid liquidation events or periods when demand increases for safer assets. With total supply now over 115B, stablecoins play a vital role in the crypto ecosystem.

Stablecoins remained fairly close to their $1 peg during the height of Tuesday’s liquidations. The two largest stablecoins by supply, Tether (USDT) and USDC, did not deviate much from their peg. Tether did start trading at a larger premium to its peg however, perhaps as a the result of a rush to relative safety. DAI also fared okay compared to other periods of volatility such as March 2020 when DAI’s price far exceeded the $1 peg.

A brief exception was HUSD, the stablecoin issued by Stable Universal and first listed on the Huobi exchange. HUSD can be used to access Huobi-specific stablecoin markets (e.g. HUSD-BTC) and it is possible rapid liquidations in these markets led to large short-term imbalances.