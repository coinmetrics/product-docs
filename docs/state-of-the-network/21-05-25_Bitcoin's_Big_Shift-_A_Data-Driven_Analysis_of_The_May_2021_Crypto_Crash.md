# Bitcoin's Big Shift: A Data-Driven Analysis of The May 2021 Crypto Crash

**Date:** 21-05-25

Over the last two weeks crypto was hit by a double tsunami of negative news. First, Elon Musk kicked things off by announcing Tesla would no longer be accepting bitcoin (BTC) payments and adding critical Tweets about Bitcoin’s energy usage. Then an even bigger tidal wave hit: news that China is cracking down on Bitcoin miners and traders.

The resulting sell-off has been painful in the short-term. But over the long-term, a stronger foundation is being built. A big shift is occurring, and some of the biggest criticisms of Bitcoin are potentially being torn down.

Over the last few days reports have started to surface that China's State Council, the country's central government body, has declared a crackdown on Bitcoin mining and trading. While China has had a long history of crypto regulation, this is the first known instance that Bitcoin mining was specifically brought up at a State Council committee meeting.

Although it's still unclear exactly what types of enforcement will take place, the comments have reportedly caused some Chinese miners to sell their mining equipment and BTC. Others have started the process of migrating out of China to restart their operations in other countries.

On-chain data lends support to these reports. The amount of BTC transferred out by miners has spiked to its highest levels since March 2020, which implies some miners are likely moving their BTC to sell. Although there was not a big spike in flows from miner wallets directly to exchanges the net outflow supports reports that miners have been selling on OTC desks.

For an in-depth analysis of how we derive our miner metrics and further breakdown of the implications of a potential Chinese miner migration, see our latest research report.

If these reports are true, it helps explain at least part of the sell-off. But it also has large implications for Bitcoin’s future.

For years, some investors have had concerns about the relatively high concentration of BTC miners in China. Specifically, there are often questions about China’s ability to potentially influence Bitcoin, as well as the relatively high carbon footprint of some of its coal powered mining operations.

If the Chinese government truly cracks down on mining, much of the hashpower currently concentrated in China will end up getting redistributed abroad. A shift in hashpower distribution would not only make the Bitcoin network more decentralized, but it would also address one of the last remaining big criticisms holding BTC back.

Estimated hash rate (7-day average) has also dropped by about 21% over the last ten days. This could potentially add more evidence to support reports that Chinese miners are being forced offline. If these miners are in fact forced to migrate we may see a big hash rate correction in the near future, as mining operations start to come back online.

However, there’s a misconception that daily hash rate figures can provide an authoritative view on miners pulling the plug. In reality it is impossible to get a precise daily change figure by solely looking at on-chain data.

In a special report, Coin Metrics Network Data Lead Lucas Nuzzi breaks down how hash rate is measured, including the potential pitfalls. Additionally, he goes into detail about how our miner metrics are derived, and dives deeper into the implications of China’s regulatory action.

Read the full report here: Bitcoin Miners Are Escaping China.

On May 12th, following Musk’s Tweets, BTC net inflow to exchanges (14-day average) began to spike, meaning a relatively high amount of BTC was being deposited to exchanges compared to the amount being withdrawn. By the 19th, exchange net inflows reached its highest level in years.

The sudden inflow suggests that some investors were transferring BTC onto exchanges to sell. But there are several other factors contributing to the large net inflows.

Breaking down the net flows by exchange, Binance has easily accounted for the largest portion. This is not surprising considering Binance is the largest exchange in the world. Binance also has a large futures market, so some of the inflow may have been incoming collateral to cover leveraged positions.

But looking at net flows for other exchanges shows an interesting contrast. Net flows on Huobi have plummeted, meaning there has been a relatively large net outflow. This once again lines up with reports that Chinese based exchanges like Huobi may be under threat of investigation. Binance appears to be under less of a threat as it is not officially headquartered in mainland China. A crackdown on Chinese exchanges and trading could be a further factor in Bitcoin’s shift, if that supply eventually makes its way out of China and into other hands.

While selling pressure from China has been a large contributor to the price drop over the last few days, the sell-off was already in motion well beforehand. Elon Musk’s Tweets on May 12th about his concerns about Bitcoin’s environmental impact sent an initial shockwave through the markets. Musk later clarified his comments by saying that Tesla had not sold any BTC. But by that point the selling had already begun.

After Tesla publicly announced a $1.5B purchase of BTC in early February, an incoming flood of retail investors helped push price to a new all-time high of over $63K. But now a lot of those new entrants appear to have exited following Tesla’s about-face. Much of the supply that was bought up over the last few months on a wave of Tesla hype is shifting into stronger hands.

The following chart shows the amount of BTC supply revived (i.e. sent as part of a transaction) after being held for a certain period of time. Following May 12th, the amount of BTC revived after being held for 90-180 days began to spike. By May 19th, supply revived after being held for 30-90 days had also peaked. This implies that a lot of the supply flowing to exchanges was likely bought between December 2020 and May, with a large amount bought after February.

Many of these sellers appear to have capitulated and sold at a loss. BTC spent output profit ratio (SOPR) dropped to .977 on May 19th, its lowest level since April 2020.

BTC SOPR is a ratio of bitcoin’s price at the time UTXOs are spent to its price at the time they were created. In other words, it’s a proxy for price sold divided by price paid. A SOPR below 1 signals that investors are selling at a loss. This suggests that some investors who bought recently, while BTC price was near all-time highs, have capitulated and are selling their holdings. Historically, a SOPR of below 1 has corresponded with local cycle bottoms.

However, it’s important to note that SOPR is an approximation and not an exact measure of profitable transactions. Not every bitcoin transaction is a trade, which means that not every transaction represents selling in or out of profit. Read more about SOPR and other on-chain indicators in the Coin Metrics On-chain Indicators Primer.

For months prior to the crash, the crypto markets were propped up by record high levels of leveraged futures. But as BTC price dropped a lot of that leverage quickly began to unwind.

On May 19th Bitcoin hit a liquidation cascade when price unexpectedly dropped below $40K. When BTC hit $39K a burst of longs were liquidated, kicking off a temporary price spiral.

Leverage is when a trader effectively borrows money to increase their exposure to an asset. Leverage increases potential rewards, but also amplifies risk. If price suddenly drops traders may be left with an insufficient amount of collateral in their account to cover their leveraged position, which can lead to getting liquidated by the exchange and losing their funds. This can create a sudden surge of forced sellers, which can lead to spiraling liquidations - if enough positions are forced to be sold, price drops, which leads to more liquidations. For more about leverage and the crypto futures market see the Coin Metrics Crypto Futures Data Primer.

The following chart shows the value of liquidated BTC perpetual future contracts for May 19th. The green “buys” represent short sellers that were forced to buy to cover their positions. The red “sells” represent longs that were forced to sell to cover.

As BTC dropped below $40K a large amount of long contracts were liquidated in the $39,100-$40,300 range. This led to a cascade of liquidations all the way down to $30K, with close to $100M liquidated below $33,500 and over $80M liquidated below $31,000. The large amount of long-liquidations compared to short-liquidations shows that a disproportionate amount of contracts were going long, a sign of the market’s bullishness at the time. Liquidations finally started to dry up below $30,700, as BTC price approached $30K before bouncing back up.

The cascade of liquidations dropped BTC perpetual futures open interest by over $3B, bringing it to its lowest level since February. Open interest is a measurement of the total number of active futures contracts. Increasing open interest indicates that more contracts are being opened and additional money is coming into the market.

Open interest can also serve as a proxy for measuring leverage. If there’s a relatively high amount of open interest there’s a good chance there’s a high amount of leverage in the futures market, as contracts are often opened using leverage. The sharp increase in open interest starting in February indicates that BTC’s record run was partially fueled by high levels of leverage.

BTC perpetual futures open interest has now reset to January levels. This type of rapid de-leveraging leads to devastating short-term price drops. But ultimately, clearing out leverage helps create a more solid foundation for future growth, since it wipes out a huge amount of potential forced sellers.

Over the last two weeks the crypto markets suddenly started to undergo several seismic shifts. A crackdown by the Chinese government appears to have kicked off a migration of hashpower and BTC from China to other regions of the world. Tesla’s change of heart about accepting BTC payments spooked some retail investors, causing many to capitulate. And a massive futures liquidation event caused a temporary price spiral, but also cleared out a lot of outstanding leverage that was propping up the market.

The situation in China is still unfolding, and it remains to be seen what happens over the upcoming weeks. If there are more severe crackdowns the crypto markets could continue to sputter. But if things are not as bad as initially thought, the worst may be behind us.

Regardless, once the carnage is over, strong hands are waiting on the sideline to take advantage of relatively discounted prices. Institutional investors appear mostly unphased by the selloff. Those who have been waiting for an opportunity to enter the market may finally see this as the right time to do so, and investing titans like Ray Dalio continue to change their minds about BTC.

Bitcoin’s fundamentals haven’t changed. And if a big shift towards more decentralization is truly occurring, they are only growing stronger.

To explore the data used in this piece and our other on-chain metrics check out our free charting tool, formula builder, correlation tool, and mobile apps.