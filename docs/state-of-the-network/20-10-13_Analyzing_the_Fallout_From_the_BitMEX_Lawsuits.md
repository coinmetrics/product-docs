# Analyzing the Fallout From the BitMEX Lawsuits

**Date:** 20-10-13

On October 1st, the CFTC and Department of Justice jointly announced charges filed against BitMEX’s owners and operators. The CFTC is alleging they were illegally operating a derivatives trading platform and the Department of Justice that they violated various parts of the Bank Secrecy Act. BitMEX’s CTO, Samuel Reed, was arrested and released on a $5M bail the same day in Massachusetts.

The red line represents when the filings were made public

In this feature, we’ll look at the impact of these filings on BitMEX and the broader cryptocurrency ecosystem from different perspectives.

BitMEX stands out amongst cryptocurrency exchanges by how it stores its bitcoin. Instead of using the common hot/cold wallets structure, all the coins are held in cold storage. Withdrawals are processed once a day, usually around 1 PM UTC, and signed by 2 of the 3 BitMEX founders. A blog post by BitMEX details how this works and plays together with their broader security efforts.

From a technical point of view, each BitMEX address is a multisignature address that requires 3-of-4 keys to spend from. Three of the four keys are owned by one founder each. The fourth key is “mined” to ensure that each BitMEX’s addresses starts with a vanity prefix (either 3BMEX or 3BiTMEX). The latter key, also called “vanity key”, always signs the withdrawal transactions; then only 2 of the 3 founders are required to approve a withdrawal (it could also be that all 3 founders approve and the vanity key doesn’t sign, but this hasn’t happened in the last months we observed).

While the identities of the founders are known, it is not trivial to associate the public keys with its real life owner. By collecting the recent BitMEX withdrawals and identifying which keys signed for which withdrawal batch, we can make an educated guess which public key belongs to which founder.

Activity map showing which key signed for which withdrawal batch. The four additional off-cycle withdrawal batches not at 1 PM UTC are highlighted in red.

Most interestingly, key A didn’t sign on Oct 1st, when Samuel Reed was in custody. It has signed twice since the publication of the filings against BitMEX, both times presumably after Samuel Reed was released on bail. We further presume that key B belongs to Ben Delo and key C to Arthur Hayes.

The fact that all three founder keys have signed following the publication of the filings is reassuring for traders with funds on BitMEX. Had Mr Reed not been released on bail, any incapacitation of any of the two remaining founders could have meant a freeze of all the funds on the platform.

Samuel Reed’s bail prevents him from contacting the co-defendants without counsel being present. However, since his release on Oct 1st, all founder keys signed withdrawals. While Bitcoin multisignature is technically a non-interactive protocol, signing BitMEX withdrawals probably requires some level of interaction between the founders involved.

What remains unknown is whether the founder keys changed ownership since the publication of the filings. The fact that the 3 original founders stepped down from their executive roles at 100x, the parent company of BitMEX, seem to indicate such a transition has happened, or will happen soon.

Right after the publication of the filings and the arrest of BitMEX’s CTO, thousands of users withdrew funds from the platform. BitMEX also broke from its traditional once-a-day withdrawal processing and did 6 batches in 2 days to reassure traders that the funds were “SAFU”.

Using our database of tagged addresses, we can dig deeper into the direct destination of these withdrawals:

Platforms with products similar to BitMEX (Binance, Okex, Deribit, and Huobi) feature prominently in the list of destinations, along with traditional exchanges like Gemini, Bitstamp, et al.

BitMEX ruled for many years as Bitcoin’s emergent derivatives market. Its perpetual inverse swap saw trillions of dollars in volume and generated hundreds of millions in trading fees. But in 2020 it’s dominant position in the market became challenged by many competitors and BitMEX’s troubles in handling the March 12th crash marked its peak.

The recent filings are another blow to BitMEX’s standing:

While BitMEX’s competitors have gained market share, it remains to be seen whether the CFTC and DoJ will stop at BitMEX or continue going down the list of unregistered exchanges.

As indicated by the market’s tepid reaction to the publication of the CFTC and DoJ’s filing, BitMEX’s legal troubles were predictable. Other recent events like John McAfee’s arrest show that the US legal system is starting to crack down on the cryptocurrency ecosystem.

With only one of the three founders arrested, BitMEX avoided a solvency problem and managed to process the numerous withdrawal requests in a timely manner. As many precedents, like MtGox or QuadrigaCX, show, it is just a question of time until the arrest or death of crypto custodians triggers another solvency problem.

Bitcoin (BTC) and Ethereum (ETH) network metrics had relatively stable weeks, apart from large swings in transaction fees. ETH fees continued to plummet following the unprecedented DeFi-driven growth over the summer. BTC fees went in the opposite direction, growing by 15.2% week-over-week and averaging about $1M per day.

Ethereum hash rate hit a new all-time high of 254.36 TH/s on October 6th. Ethereum hash rate has been growing since mid-July thanks to the rise of DeFi. The large increase in fees meant more revenue for miners, which incentivized more miners to join the network and caused hash rate to grow.

USDC also had a big week with supply growing by about 200M to a total of over 2.8B. USDC continues to grow faster than Tether, which was relatively flat this past week. However, Tether still dominates in terms of usage, with active addresses growing an additional 9.5% week-over-week compared to a 7.8% drop for USDC.

Privacy coins are back on the rise. Monero’s (XMR) market cap just hit its highest level since September, 2018. And XMR on-chain activity is surging as well. XMR transfer count is just shy of setting new all-time highs.

The following charts are smoothed using 7-day rolling averages.

Zcash (ZEC) transfers are also on the rise. Part of ZEC’s growth may be related to DeFi - similar to wrapped BTC and wrapped ETH, wrapped ZEC has been growing since June. ZEC transfers have been growing since mid-July, which coincides with the rise of DeFi.

Bitcoin closed this past week with a weekly candle of up $686.77 or ~6.4%. This was well above the three year average weekly candle of 1.1% and median of 0.79%.

The main news the market is attributing the price action to is Square’s announcement of around a $50m purchase of Bitcoin. However, this is unlikely to be the full reason as Microstrategy’s $500m purchase did not have an impact of this magnitude. This move appears to be relatively healthy, as it was still within the standard deviation of the weekly candles in the past three years.

Ethereum also saw a bigger than normal weekly gain of $21.48 or ~ 6.0%. This is much larger than the three year average of 1.1% and median of 1.8% but also still within the standard deviation.

A very strong week for all CMBI and Bletchley Indexes led by the large cap assets. There was a strong level of correlation in the markets this week with the large cap assets moving in lock step while some of the mid and small cap assets tended to lag. The CMBI Bitcoin Performed the best of the CMBI Indexes closing the week at $11,365.32, up 6.4%. The CMBI Ethereum also closed the week strong at $373.85, up 6.1%.

The large cap indexes, CMBI 10 and Bletchley 10, also performed strongly and mostly in line with Bitcoin, returning 6.4% and 6.9% respectively. The difference in returns can largely be attributed to the different close time of the indexes (CMBI close is at 4pm NY Time, Bletchley close is at midnight UTC). The other difference is the methodologies, where CMBI utilized free float and a stricter eligibility criteria for asset selection.

The CMBI Bitcoin Hash Rate again broke all time highs this week, peaking mid week at 153 EH per second before closing the week down 3% at 137 EH per second. Despite hash rate closing down, the CMBI Bitcoin Observed Work closed the week up 1.7%, with an implied 84,028 zetahashes being conducted during the week.

More performance information on each of the CMBI products can be found in our factsheets:

CMBI Bitcoin and CMBI Ethereum can be found in the September CMBI Single Asset Series Factsheet.

CMBI Bitcoin and Ethereum, CMBI 10, CMBI 10 Excluding Bitcoin, CMBI 10 Even can be found in the September CMBI Multi Asset Series Factsheet.

CMBI Bitcoin Hash Rate and CMBI Bitcoin Observed Work can be found in the September CMBI Mining Series Factsheet.