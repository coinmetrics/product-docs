# Dissecting a Bitcoin Bull Market

**Date:** 20-11-24

The following is an excerpt from a full-length report which has been truncated due to space limitations. Read the full report here.

A pandemic, followed by global societal shutdowns, followed by rampant social unrest, followed by increased political polarization, followed by unprecedented levels of monetary interventionism.

This has been 2020.

And in the midst of all of this uncertainty and chaos, a Bitcoin bull market brewed.

Two competing theories have transpired to explain BTC’s rapid rise to $19,000. Some have speculated that this rally is being predominantly driven by increased regulatory scrutiny in China, which has prevented miners and market participants from selling their BTC. Others attribute it to increased institutional participation after Bitcoin received a trove of endorsements from high-profile macro investors.

In this post, we will evaluate the merit of each of these narratives through the use of network data.

It is no secret that Beijing has been cracking down on Bitcoin businesses, from miners to exchanges. Earlier this month, news broke that both Huobi and OKex, two of the largest exchanges operating in China, were facing stronger regulatory scrutiny as part of the country’s new mandate to fight money laundering and fraud. Now, local industry observers have reported that the bank accounts of many Shenzhen miners have been frozen as part of this regulatory crackdown.

Media outlets have hypothesized that the recent run up in Bitcoin’s price was a direct result of this crackdown. If miners are unable to sell their BTC, a sustained disruption in the existing supply chain would ultimately generate scarcity. Thus far, however, solid evidence of the impact of the crackdown on mining operations has been anecdotal. Thankfully, we have devised metrics to assess this impact more objectively by tracking the movements of newly issued BTC.

Over the course of 2020, we have closely analyzed the on-chain custody behavior of both mining pool operators and their individual miners. We have found that unspent miner rewards provide a good proxy for aggregate mining pool custody. Since mining pools issue payouts to all of their participants, supply that sits 1 transaction from mining pools is a good representation of the holdings of individual miners. The culmination of this research was a new family of metrics released in October that can provide a view of when these network participants are accumulating, or disseminating, the bitcoins they mine.

On an aggregate basis, the amount of Bitcoin held by mining pool operators has increased over the course of 2020. Notably, there was a sharp spike in April ahead of the halving and a steady increase followed. Conversely, Bitcoin held by individual miners has decreased in 2020, and at a particularly increased rate in November.

If, in fact, there was a liquidity crunch predominantly driven by miners, one would expect the amount of BTC held by both pools (purple) and individual miners (green) to increase. Since individual miners are the liquidity gateways of newly issued bitcoins, any supply chain disruption would entail an increase in their holdings, whereas the opposite seems to be taking place.

Another metric that suggests miners have been able to sell their BTC as usual is the aggregate value of bitcoins sent by them. If miners were unable to sell their BTC, the aggregate outflows from their account would likely drop. However, that does not seem to be the case. As of November 21st, 809,217 BTC has left miner accounts. At this pace, the sum of bitcoins sent by miners in November will surpass the yearly average of 1,052,589 BTC sent per month.

Coupled with the aforementioned data on BTC held by miners, the lack of a clear change in miner outflows discredits the hypothesis that miners have not been able to sell as a result of a regulatory crackdown in China.

Another troublesome factor in attributing the rally to miners is the size of BTC markets. At a market cap of over three hundred billion dollars, it is very unlikely that a rally of this magnitude could have been caused by miners alone. After all, miners are disincentivized to hoard BTC. They are rewarded in a volatile currency, whereas their operations entail monthly expenses paid in fiat. As such, their impact on the market decreases as less BTC is issued.

Nearly 100B USD was added to BTC’s total market capitalization over the course of November. It is hard to envision a scenario where miners alone were responsible for it given that they have received just shy of 360M USD thus far in November. As such, any impact of the regulatory crackdown on liquidity would likely be limited to that, which is too small to an impact of this magnitude.

Now, let us look at the on-chain footprint of centralized exchanges and assess their impact on the recent rally, not only in the context of increased regulatory pressure in the East, but also in light of other factors impacting exchanges in the West.

Historically, exchanges operating in China have been the primary target for regulators. It was no different this time. On November 2nd, Huobi’s Chief Operating Officer was reportedly arrested by Chinese authorities, although Huobi has denied the reports. In the days following the reports, Huobi experienced a mass withdrawal event as users grew worrisome. That resulted in a 60k BTC being withdrawn; a loss equivalent to 1B USD in deposits.

Interestingly, Huobi is not the only exchange to experience a decrease in deposits. Over the course of 2020, the percentage of total BTC supply held by major exchanges has decreased on an aggregate basis, even if we remove Huobi from the equation. We have noticed an aggregate reduction of BTC holdings by the major exchanges we support (Bitfinex, BitMEX, Binance, Bitstamp, Bittrex, Gemini, Kraken, and Poloniex).

Continue reading “Dissecting a Bitcoin Bull Market” here…

Many BTC on-chain metrics are on the verge of hitting new all-time highs as institutional interest in bitcoin (BTC) continues to gain momentum. BTC market cap averaged over $333B last week and topped $347B on November 21st, a new all-time high. Daily active addresses topped out at 1.20M, just below the all-time high of 1.28M. Hash rate has also bounced back and is nearing previous highs after a temporary dip thought to be caused by changing Chinese weather patterns, as covered in the Network Highlights section of State of the Network Issue 75.

Ethereum (ETH) is following suit, with most on-chain metrics surging. ETH hash rate hit a new all-time high of 265.81 TH/S on November 21st, building on a surge over the summer likely fueled by DeFi's growth. ETH daily fees grew by a huge 56.4% week-over-week and have once again passed BTC, after BTC overtook ETH in late October.

Bitcoin market capitalization and realized capitalization have both hit new all-time highs.

On October 21st, PayPal made a surprise announcement that they were introducing a way for customers to buy, sell, and hold cryptoassets including bitcoin (BTC), Ether (ETH), and Litecoin (LTC). Since then, BTC price has increased from $12.85K (end of day October 21st) to a high of over $18.70K. Although BTC price is still just shy of the December 2017 all-time high of $19.64K, market cap has reached new highs due to the gradual increase in BTC supply over the last three years.

The number of unique addresses holding at least 1,000 BTC has also reached a new all-time high. There are currently 2,255 addresses holding at least 1,000 BTC, up from 2,184 on October 21st. This potentially supports the growing narrative that more institutional level investors are starting to buy and hold BTC. However an important caveat is that a single entity can control multiple addresses, so some of the growth may potentially be due to large holders spreading out their BTC.

Additionally, the number of addresses holding at least 1 BTC hit a new all-time high in early November. On November 4th there were 825.23K addresses holding at least 1 BTC. The number has since declined slightly to 819.93K, but still remains near all-time highs. This suggests that the number of retail size holders is also increasing in tandem with institutional size holders, although the same caveat mentioned above still applies.

A rising coin lifts all boats.

Over the past 30 days we have seen bitcoin continue to climb back toward all-time highs, reigniting excitement in the space and leaving crypto enthusiasts foaming at the mouth. Potential new highs, much like every other event, is “good for Bitcoin”. However it has also been good for many other assets in the space.

An indicator that we often look at for an estimate of altcoin sentiment is the ratio of assets reaching new 30 day highs minus those reaching new 30 day lows. We use our reference rate universe of 306 assets to perform this calculation. In the chart below, you can see that the blue line in the bottom plot has recently shifted to net new highs from net new lows.

This displays new confidence in segments such as DeFi assets following the selloff this fall. Based on the historical range of this indicator, altcoins may have some additional room to run if the bullish trend continues.

The cryptoasset market had a tremendous week all around with the large cap assets enjoying the largest intra-week gains. The CMBI Ethereum returned a staggering 27.9% during the week, closing at $568.10, its highest level since June 2018. Bitcoin also had an incredibly strong week, returning 17.3% to close at $18,597.55, its fourth highest daily close ever.

However, despite the strong performance of Bitcoin and Ethereum, it was the CMBI 10 Excluding Bitcoin that had the highest weekly return, closing up 32.0%. The additional performance on top of the CMBI Ethereum is largely attributable to XRP, which closed the week up 66%, its largest weekly return since September 2018.