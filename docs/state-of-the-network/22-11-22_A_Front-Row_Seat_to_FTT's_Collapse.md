# A Front-Row Seat to FTT's Collapse

**Date:** 22-11-22

As we covered in last week’s State of the Network, the lines between Alameda and FTX were intrinsically blurred due to the ownership distribution of FTT, the exchange’s native token. As we hypothesized, Alameda’s large FTT position might have been used as collateral for a large loan from FTX. Through this loan, Alameda may have received funds that belonged to FTX’s users. Woefully, due to the Alameda’s abysmal lack of risk management, these funds were subsequently lost.

Our analysis of Binance’s markets render a dramatic scene of the events leading to the catastrophic devaluation of FTT. Binance is of particular interest due to their preeminence, measured by exchange volume, the extent of their derivative products, and (critically) the significance of its own FTT market.

First, remember that the FTT token was central to both FTX and Alameda’s survival. Prior to the collapse, FTT was a top-performing asset in the bear market and a welcomed form of collateral among FTX counterparties. It was imperative for the price of FTT to retain a certain valuation and therefore support FTX’s solvency. Could Binance have sensed Alameda’s despair through its actions on the exchange’s FTT market?

We ventured to compare the price discovery mechanism operating on Binance relative to other FTT trading venues, and built an orderbook heatmap—leveraging Coin Metric’s Market Data Feed (MDF)—to perform a complete analysis of Binance’s FTT market, starting on November 1st, until the complete collapse of FTT by November 11th. We especially wanted to understand the market in the aftermath of the CoinDesk article, published on November 2nd, which revealed that much of FTX’s balance sheet was FTT.

Shortly after the CoinDesk article was published, a clear price support formed on Binance’s orderbook at $23.50 per FTT. Our hypothesis is that Alameda was signaling to the market their willingness to defend FTT. Two days later, on November 5th, large sell orders shifted the price trend. This was a day before CZ announced the unwind of their FTT position, and the shift happened on Binance first.

We were able to confirm that the downtrend that preceded the collapse of FTT started on Binance on November 5th. The pressure from these large orders persisted and grew over the following days, eventually breaking FTT—and with it, FTX’s fate was cast.

On November 6th, the announcement arrived and with it came a new wave of price support orders at $20 and $10 per FTT. We hypothesize that these were also placed by Alameda. There are clear attempts at reviving FTT’s price throughout the day, especially after a tweet by Alameda’s CEO offering to buy all FTT owned by Binance. These attempts ultimately failed as sell orders kept coming in. The collapse arrived early on November 8th, with the announcement that FTX was pausing withdrawals.

FTT markets get increasingly chaotic after that collapse. Alameda had likely left the room by then as no other support was available at that point. FTX filed for bankruptcy on November 11th, and by then, FTT markets had already absorbed the worst-case scenario. Given the sizes involved in defending this market within Binance and the timing of key price support levels, we find it very likely that Alameda was behind this.

This was likely not the first time Alameda was buying FTT. The token’s significance as FTX’s largest position, its use as collateral for loans, as well how its price functioned as a barometer of confidence in FTX makes FTT central to the story of FTX and Alameda. It is almost certain that FTX user funds were used to prop up the price of FTT, especially towards the end. We will hopefully find out more in the following months.

Thanks to blockchain data observers like Coin Metrics and Etherscan, there is an on-chain footprint behind many of the questionable decisions that culminated with the collapse of FTX. Beyond our initial findings related to FTT, we set out to more closely examine Alameda’s historical behavior and attempt to shed light on where the funds that once belonged to FTX users might have gone. This represents possibly one of the largest scale wallet transaction analyses performed on an enterprise entity’s group of on-chain wallets using blockchain transaction records.

We specifically wish to focus on Alameda’s aggregated transaction outflows in order to shed light on some of the following points:

What type of financial investments & activities did Alameda wallets deploy their capital toward that could have contributed to a $10 billion plus balance sheet hole?

Could the timing of these investments help explain the magnitude of their losses?

What was Alameda doing with their funds?

First, a note on the on-chain data. In the absence of historical logs of Alameda wallet balances across all tokens, referencing Ethereum-chain transaction inflows/outflows is a helpful proxy for portfolio size and can illustrate patterns in funds flow for a particular entity.

We conducted this set of transaction outflows analysis using Etherscan’s raw wallet transaction records on a set of 20+ Alameda wallets between June 2021 and November 2022. Tagged Alameda wallets refer to a group of Ethereum wallets tagged by Larry Cermak’s team and publicly shared. We analyzed both ETH transactions as well as ERC20 token transactions. Inter-Alameda funds movement (inter-wallet flows) were removed on purpose to leave only Alameda-to-external address outflows for a clearer picture on where funds were spent.

Combined ETH and ERC–20 token outflows to non-Alameda-tagged addresses over this period (mid-2021 through October 2022) amounted to over $50B. Among this amount, $9B was redirected to FTX-tagged addresses and $6.9 billion back to untagged Alameda addresses. ERC–20 tokens accounted for $41B out of a total $50B in aggregated outflows, of which more than 50% was in stablecoins. Note that it is unlikely that the aggregated outflows figures in this study represent unique streams of funds, as any token could have been re-circulated back to Alameda wallets and across different venues.

The picture this data suggests is striking. We found at least 1,500 inter-entity ERC-20 token transfers worth above $100,000 in USD from an FTX-tagged address to an Alameda tagged address, with many such transfers occurring before 2022. The magnitude and cadence of Alameda and FTX inter-entity funds flow lead us to question their claims to independence and segregation of interests.

From a timing perspective, transaction data confirms Alameda wallets deployed a massive sum of funds in 4Q21, near the market peak. Just between September–November of 2021, aggregated outflows amount to an astounding $22B. Of this amount, $13.8B was in ERC–20 denominated transactions (including FTX addresses and untagged addresses), and $9B in ETH-denominated transactions. In our view, the timing and magnitude of funds deployed leading up to the market peak partially explains why Alameda would incur enormous losses as the crypto market collapsed over the first half of 2022.

Here are the highlights on outflow destinations for Alameda wallets’ ERC20 transactions:

DeFi lending protocols represent the biggest outflow category at $7.8B, followed by DeFi LP and farming protocols at $4.6B and non-FTX Exchanges at $4.4B.

Cross-chain outflows sum up to at least $9.5B. Surprisingly, the largest flows from Ethereum were to Avalanche, Fantom and Polygon. After the collapse of TIME Wonderland, FTM & UST ecosystems in Q1–22, it is likely that Alameda incurred losses in Q1–22. However, other funds may have flowed into these ecosystems directly from other exchange accounts that would not be accounted for in this analysis.

Outflows in all sorts of stablecoins sum up to an astonishing $27B (including two untagged Alameda & FTX addresses). The outflow size suggests:

High leverage. All available forms of debt were marshaled, on-chain and off-chain alike, some collateralized with illiquid cryptoassets whose value plummeted through 1H22, but with the loan denominated in stablecoins.

In recent days, the FTX Chapter 11 first day pleadings document revealed that upwards of several billions were “loaned” to FTX executives. Such amount of stablecoin activity begs the question: were funds siphoned off-chain into the real world?

In closing, while the above transaction analysis on an entity’s associated group of wallets may never provide an exact and comprehensive account of every transaction event that occurred (due to the exclusion of unknown wallets or counter-parties), in aggregate we believe on-chain wallet analyses provide a directional sense of where & how funds were spent for an entity, which hopefully helps brings truth to where lost FTX funds were spent or transferred to.

Alameda and FTX alike were very active in providing their services, including borrowing and lending, to other companies in the sector. We have witnessed many companies publicly announcing losses due to funds held on FTX, as well as write-downs on any loans owed by FTX and Alameda. Among one of the most significant is the Digital Currency Group, a holding company that specializes in crypto and whose subsidiaries include Genesis, Grayscale, CoinDesk, Foundry, and other companies. Genesis, in particular, is under the spotlight because, as an institutional lender, they may have extended capital to entities embroiled with the FTX/Alameda collapse. Genesis has at least $175M stuck on FTX, and also had large exposure including unsecured loans to Three Arrows Capital (3AC) before it collapsed in June. On November 16th, Genesis halted withdrawals and new loan originations following FTX’s fall.

Genesis connects institutional investors to digital asset markets allowing them to trade, borrow, hedge and more. Genesis is heavily used throughout the industry, including by centralized exchanges like Gemini for their “earn” program which allows customers to earn yield off of their holdings. Last week, Gemini Earn halted withdrawals after Genesis halted withdrawals.

Questions surrounding Genesis and DCG’s health led to Coinbase attesting that funds in their custody are explicitly not hypothecated, rehypothecated, collateralized, or otherwise lent out, stifling some of the concerns surrounding Grayscale’s trust funds. However, Genesis’ lending arm, which is widely integrated into various services that offer yield on crypto, may have been affected by offering loans that FTX or Alameda will not repay. DCG has been allegedly looking to raise capital, up to $1B, with little interest from investors balking at a previously undisclosed $1.1B loan from DCG to Genesis.