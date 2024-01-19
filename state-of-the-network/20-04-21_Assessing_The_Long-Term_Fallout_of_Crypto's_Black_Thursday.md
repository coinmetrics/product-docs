# Assessing The Long-Term Fallout of Crypto's Black Thursday

**Date:** 20-04-21

On March 12th 2020, now called “Black Thursday,” Bitcoin’s price dropped by nearly 50%, one of its largest drops since the Mt. Gox debacle.

In our 43rd issue, we looked at the impact of that price drop on the crypto market structure - specifically, we explained how BitMEX’s liquidation engine could have amplified the drop, the lingering impact on liquidity left by the crash, and how stablecoins seemed to have gained from it.

In this issue, we’ll look at the impact of Black Thursday on on-chain data and exchange market share.

One of the immediate impacts of the Black Thursday drop was on transaction fees. As traders rushed to move coins in and out of exchanges in order to add margin to positions or to profit from arbitrage opportunities, the demand for block space heated up.

Most Bitcoin wallets use dynamic fee estimation, and txstats.com’s archives of these estimates allow us to see how they reacted to the increase in activity (txstats.com is presented in partnership with BitMEX Research). Fee estimates for rapid confirmation (10-20 minute wait time) went from 27 satoshis/byte of transaction data to 70 sats/byte in just a few hours.

More surprisingly, median transaction fees measured in dollars for both Bitcoin and Ethereum shot up almost five-fold. Bitcoin’s fees remained elevated for two weeks while Ethereum’s fees recovered in two days.

Black Thursday highlighted in red. | Source: Coin Metrics Network Data Pro

Overlaying Bitcoin’s block space utilization (i.e. block weight used as a proportion of block weight available per block) shows that fees stayed elevated following Black Thursday despite block space utilization returning to normal levels.

Black Thursday highlighted in red. | Source: Coin Metrics Network Data Pro

What explains this discrepancy? One possible explanation is that the lingering effect on transaction fees could indicate the presence of a feedback loop between the various fee estimation APIs. Similar to how traffic jams form from a single clog in the system, a single and brief perturbation can have effects far outlasting it.

Black Thursday’s drop stopped when BitMEX, the leading Bitcoin futures platform prior to Black Thursday, experienced a denial-of-service attack. This led to many theories as to why the price recovered after BitMEX went offline, with the most prominent being explained in State of the Network Issue 43.

Following that fateful day, the number of Bitcoins held by BitMEX (on behalf of traders) first rapidly increased then dropped significantly over the following two weeks, stabilizing recently.

Black Thursday highlighted in red. | Source: Coin Metrics Network Data Pro

There could be many explanations as to why this happened. The early increase could have been caused by traders depositing coins to either trade the very high volatility or add margin to existing positions to avoid liquidation.

This is visible by looking at the distribution of deposits to BitMEX. On the 12th and 13th, the 90th percentile of deposits, by value, jumped several fold indicating that traders made larger deposits to BitMEX.

Black Thursday highlighted in red. | Source: Coin Metrics

As for the long drawdown, two main things can potentially explain it:

BitMEX lost some market share following Black Thursday

Crypto traders are deleveraging and withdrawing their remaining unused trading capital

One way to test the first hypothesis is to look at BitMEX’s market share in Bitcoin futures markets:

In both open interest (size of futures contracts held by traders) and in volume, BitMEX lost market share following Black Thursday. The biggest market share winner was Binance futures:

As for the deleveraging part, aggregate open interest fell by 50% in a single day and still hasn’t recovered (although it’s been slowly and steadily rebuilding since it bottomed).

It’s been more than a month since Black Thursday and while most of its immediate impact has now faded away with volatility reducing and spreads tightening, some of the longer term consequences are only starting to become visible.

Notably, since the crash there has been a reshuffling of the top futures marketplaces for crypto assets with BitMEX losing some of its market share to Binance. This may have an on-going impact across crypto markets, especially considering BitMEX’s outsized influence on price discovery. Only time will tell if BitMEX is able to recover the lost market share, or if the marketplace is undergoing a true changing of the guard.

Bitcoin (BTC) usage showed signs of growth this past week. BTC daily active addresses  grew 12.1% week-over-week, and topped 900K on both April 7th and April 15th. The last time BTC had more than 900K daily active addresses was in June 2019.

Bitcoin Cash (BCH) usage, on the other hand, declined over the past week. Active addresses dropped by over 46% week-over-week. Additionally, BCH estimated hash rate continues to decline after its April 9th halving.

Stablecoins have gained another $1B in market cap since the start of April. Most of the growth continues to come from Tether issued on Ethereum (USDT_ETH) which went from a market cap of $4.43B on April 1st to $5.14B on April 19th.

The following chart was created using Coin Metrics’ community charting tool, which you can access for free here.

Stablecoin transfers also continue to rise, with USDT_ETH once again leading the way. Although daily transfers for USDC, BUSD, and DAI all peaked on March 18th, daily transfers for USDT_ETH and PAX have continued to rise. USDT_ETH has grown from about 83K daily transfers in the beginning of November 2019 to about 141K daily transfers as of April 19th.

USDT_ETH transfer count has been growing faster than both BTC and ETH over the last 180 days. Although BTC and ETH both still have significantly more daily transfers, USDT_ETH transfer growth has had a noticeable uptick since mid-March.

ETH leads all large cap assets this week with a 13% gain. As noted in the Network Highlights section, issuance of stablecoins designed using the ERC-20 standard and transfers of stablecoins on the Ethereum network continue to grow strongly. Given these developments, one of the more interesting debates right now is whether stablecoin growth is good or bad for ETH.

Stablecoins are increasingly becoming critical tokens to the cryptocurrency industry and dozens of projects have been launched. The vast majority of projects have chosen to launch as ERC-20 tokens on ETH which should further solidify the ERC-20 standard and strengthen a network effect that is difficult for competing standards to overcome. When examining the first order impact, stablecoin growth should increase the demand for ETH because every stablecoin transaction requires ETH for transaction fees.

On the other hand, as stablecoins become increasingly used, there is the potential for stablecoins to lower the monetary premium of ETH. ETH has a credible claim as money within the crypto space, but stablecoins challenge this view. Stablecoins have the potential, due to their lowered volatility, to become the store-of-value, medium of exchange, and unit of account for crypto transactions and smart contracts that need to store value. This is already beginning to happen at the margin, such as MakerDAO adding USDC as an option to serve as collateral in Dai loans.

This week the narrative is that stablecoin growth is good for ETH, but it will be interesting to see the evolving impact of these competing forces.

Across the board, cryptoasset markets performed strongly through the week as reflected by all the Bletchley multi-asset indexes. The CMBI Ethereum Index was the strongest performer through to April 19, returning 10.4%, whilst the CMBI Bitcoin Index finished the week flat. The small-cap assets yielded the highest returns for the week, with the Bletchley 40 returning 7.1%, followed by the Bletchley 20 (mid-cap assets) which returned 6.2%.

The highest performer of the even indexes was the Bletchley 40 Even, which returned 6.4%, indicating that the strong performance of small cap assets was spread across all constituents within the index and not just a select few.