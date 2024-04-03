# The Evolution of Ethereum Tokens

**Date:** 19-11-12

In 2015, Ethereum ushered in a new era for blockchains: the age of the token.

Broadly defined, a “token” represents a utility or asset and is typically issued on an existing blockchain. In contrast, a “coin” is a crypto asset that is native to its own blockchain and is primarily used as a currency (“coin” and “token” are sometimes used interchangeably, but we will keep the distinction throughout this piece). For example, BTC and ETH are coins, while MKR and BAT are tokens.

The concept of crypto tokens has existed in various forms since well before Ethereum. For example, Bitcoin “colored coins” can be used to tokenize items using BTC, without the need to issue a new asset. This can be done by “coloring,” i.e. marking, specific coins using OP_RETURN. Alternatively, this can also be done by agreeing that specific Satoshis, which is the smallest unit of BTC, represent a real-world asset.

But Ethereum introduced a new, more user-friendly way to create tokens. Using a simple smart contract, Ethereum made it easy for anyone to launch their own token for just about anything.

Before long, thousands of tokens were launched on Ethereum. The explosion of tokens made standardization increasingly important, to ensure that the tokens could be exchanged for each other. ERC-20 implemented a standard interface that made it trivial to exchange any ERC-20 token for another, and to integrate ERC-20s within crypto wallets and decentralized applications (dapps). In early 2018, ERC-721, which are tokens that are specifically used to represent unique, non-fungible digitally scarce tokens (for example, a CryptoKitty or a one-of-a-kind piece of crypto art) was also adopted as an official standard.

Since then, the pace of Ethereum token change has increasingly accelerated. In this piece we explore the evolution of Ethereum tokens and look at where they might be headed.

One way to evaluate tokens is to look at the market cap of the smart contract platform’s native coin (i.e. ETH) compared to the aggregate market caps of tokens launched on that platform. We refer to this ratio as the “Network Value to Token Value” (NVTV) ratio, as proposed by Chris Burniske.

In this case, we calculated the ratio by dividing ETH’s market cap by the aggregate market cap of a selection of the biggest ERC-20s. Although there are thousands of other tokens that have been launched on Ethereum, the selected tokens represent a large majority of the total ERC-20 token market cap. A full list of the tokens we used can be found as a footnote under the below chart.

Ethereum’s NVTV ratio has been steadily declining. On April 1st, 2019, Ethereum’s NVTV ratio hit an all-time low of 1.57. As of November 10th, the ratio is 1.90.

ERC-20 Assets: ant, bat, bnb, cennz, ctxc, cvc, dai, fun, gnt, gusd, ht, icn, knc, leo_eth, link, loom, gno, lrc, mana, mkr, omg, pax, pay, poly, powr, ppt, qash,rep, salt, srn, tusd, usdc, usdt_eth, wtc, zrx

Realized cap tells a similar story. Realized capitalization is a metric created by Coin Metrics that is calculated by valuing each unit of supply at the price it last moved. This is in contrast to traditional market cap which values each coin uniformly at the current market price. Realized cap can be thought of as a measure of the average cost basis (cost basis is basically the total amount originally invested).

The realized cap version of Ethereum NVTV has also been steadily decreasing and is currently at an all-time low of 2.57. The decreasing NVTV ratios signify that tokens have steadily been gaining ground on ETH in terms of valuation.

Most of this growth since mid-2018 has been coming from a specific subset of ERC-20 tokens: stablecoins.

The below chart shows the share of market cap for utility tokens, exchange tokens, and stablecoins. We used a simple, high-level taxonomy for categorizing tokens; however, other groupings or taxonomies are possible.

A “utility token” is a subset of tokens that are “used to finance the network by providing its buyers with a guarantee of being able to consume some of the network’s products” (definition via BitcoinWiki). Utility tokens were typically issued during the ICO boom to serve as a way to raise money as well as a way to make payments within a project’s ecosystem, access a particular service or feature, or participate in a particular activity such as voting.

“Exchange tokens” are a subset of utility tokens created by cryptocurrency exchanges (e.g. Binance’s BNB token). Exchange tokens are typically used to raise funds for exchanges and offer discounts on things like exchange fees.

“Stablecoins” are tokens that are designed to fix their value to another asset, often a fiat currency such as the USD. Tether is currently the biggest stablecoin by most measures, but other stablecoins built on top of Ethereum include DAI, USDC, PAX, and TUSD.

Although exchange tokens were gaining ground in early 2019, BNB switched over from an ERC-20 token to a mainnet version of the BNB token (on their own blockchain) in April, which caused Ethereum exchange coin market cap to plummet.

On July 1st, 2018, Ethereum utility tokens had an aggregate market cap of $7.52B, compared to $2.98B for exchange tokens, and $109M for stablecoins. As of November 10th, 2019, utility tokens have a market cap of $5.19B, exchange tokens have a cap of $2.55B, and stablecoins have a market cap of $3B, up by over $2.8B from just a year and a half earlier.

The below chart shows the percent share of market cap for each of the three token categories. A complete list of the assets we used for each category can be found in the footnote under the below chart.

Utility tokens: ant, bat, cennz, ctxc, cvc, fun, link, loom, gno, gnt, icn, lrc, mana, mkr, omg, pay, poly, powr, ppt, qash, rep, salt, sr, wtc, zrx

Stablecoins: dai, gusd, tusd, usdc, pax, usdt_eth

Exchange Tokens: bnb, ht, knc, leo_eth

Furthermore, most of the growth has been coming from one specific stablecoin: Tether (USDT).

As we’ve covered in past issues of State of the Network, Tether exists on multiple different protocols, the two biggest of which are the Omni protocol (which itself is built on top of Bitcoin) and Ethereum. Over the last several months, usage has been shifting from the Omni-based version to the Ethereum-based version of Tether.

Historically, aggregate token transaction count has been lower than Ethereum’s non-token transaction count (i.e. total transaction count minus ERC-20 and ERC-721 transaction count which was largely comprised of simple transfers of ETH). But since May 2019, token transactions have been threatening to pass non-token transactions. As of November 10th, ERC-20’s had about  303,000 daily transactions vs about 290,000 for ETH.

The below chart shows transaction counts for ERC-20s (red line), ERC-721s (green line), and non-token transactions (blue line, ETH transactions minus ERC-20 and ERC-721 transactions), smoothed using a 7-day rolling average.

A lot of ERC-20’s rapid transaction count rise has also been due to USDT. The below chart shows the market share of the ten ERC-20 tokens with the highest daily transaction counts (averaged over the last 30 days) over the course of 2019. USDT started gaining ground in May and now has over 80% of the share of transaction counts of the top ten tokens.

While ERC-20s have been the dominant type of token up to this point, we may be on the cusp of the rise of ERC-721s.

As of late October, ERC-721 transfer count has shot past both ERC-20 and ETH transfer counts. Previously, ERC-721 transfer count peaked during the CryptoKitty craze of late 2017. November ERC-721 transfer counts have already rocketed past peak CryptoKitty transfer counts.

Transfer count paints a slightly fuller picture than transaction count of the real trading activity of individual ERC-721 assets. Since ERC-721’s each represent unique tokens, many tokens are often bundled together and transferred as part of a single transaction. The below chart shows transfer counts for ERC-20s (red line), ERC-721s (green line), and ETH transfers (blue line), smoothed using a 7 day rolling average.

This large spike in ERC-721 tokens is due almost entirely to an Ethereum-based card game called “Gods Unchained.”

Gods Unchained is a trading card game that is similar to the popular game Hearthstone. However, unlike Hearthstone, Gods Unchained is built on the Ethereum blockchain, and each one of its cards is represented by an ERC-721 token. This means that users truly own their cards and can trade them freely on the open market, similar to any other cryptocurrency.

Gods Unchained has been in the news recently due to an incident related to the Hong Kong protests. On October 7th, Blizzard, the maker of Hearthstone, announced that they were rescinding the prize money from a champion pro player and suspending him for a year because he had spoken out in support of the Hong Kong protests.

The next day, in a tweet that has since been retweeted over ten thousand times, Gods Unchained stated that Hearthstone cared “about money more than freedom.” They also offered to pay for all of the banned Hearthstone player’s lost winnings and offered a free entry ticket into a large Gods Unchained tournament. Subsequently, Gods Unchained sold out their Genesis Card Pack for a total of 33,333 ETH, equivalent to about $6.2 million.

Although still early, Gods Unchained could be an example of a real use case for crypto tokens in gaming. Blockchain-based games put gamers in control of their in-game assets, which means they cannot be revoked or censored. Gods Unchained is only one example of many games that are now being developed on blockchains using non-fungible tokens (NFTs). NFTs are also being used in applications like the Ethereum Name Service and in virtual worlds like Decentraland, and will soon likely be used for many other types of applications as well.

Although there are still only about 4,600 ERC-721 contracts compared to over 184,000 ERC-20 contracts (and over 12 million non-token contracts), ERC-721 contracts have been growing rapidly over the course of 2019. Since January 1st, the number of deployed ERC-721 contracts has grown by almost 350%, compared to about 39% and 36% for ERC-21 contracts and non-token contracts, respectively.

Furthermore, overall Ethereum smart contract usage is growing. Ethereum contracts calls have been steadily climbing upwards, and recently hit an all-time high thanks in large part to Gods Unchained. As the Ethereum smart contract economy continues to grow and evolve, tokens will likely become an increasingly important part of the ecosystem.

The below chart shows Ethereum contract calls count smoothed using a 7 day rolling average.

Ethereum tokens have already evolved tremendously over their short life span, and will undoubtedly change just as rapidly moving forward. We will continue to monitor Ethereum’s NVTV, the rise of Ethereum based stablecoins, and the potential breakout of ERC-721s.

After XRP daily average transaction value temporarily surged passed ETH last week, both XRP and BCH adjusted transfer values dropped significantly this week. LTC’s adjusted transfer value, however, shot up over 89% after being down by over 20% the previous week. Despite transfer value being up, LTC’s transfer and transaction count were both down, signifying that a relatively small number of addresses were likely moving around large amounts of crypto.

BTC’s daily fees gained over 10% for the second straight week, after growing by 16% last week. BTC continues to climb ahead of ETH in terms of daily fees; over the past week, BTC averaged $346.9k of daily fees compared to $91.8k for ETH. XRP fees grew by over 100% this past week, but still averaged less than $1k per day.

LTC’s hash rate and difficulty have both been in free fall since July. Both are now on the verge of reaching lows not seen since early 2018.

After BTC’s hash rate dropped last week, as we reported in SOTN Issue 24’s Network Data Summary Metrics section and on Twitter, BTC’s difficulty readjusted downward on November 7th.

Bitcoin’s price has remained largely unchanged over the past week at -2% while Ethereum (+4%), Litecoin (+9%), and EOS (+9%) have experienced moderate gains.

Among large-capitalization assets, Stellar has seen the largest gains at +19% after the Stellar Development Foundation effectively burned 55 billion tokens by sending them to an account that cannot sign transactions.

Among smaller capitalization assets, Cosmos (+24%) saw a large increase, although there does not appear to be a specific catalyst. Tezos (+41%) has seen the strongest gains among this set of 24 assets largely due to Coinbase’s announcement that it would offer staking rewards on its platform. Maker was up +30%, perhaps in part due to the upcoming launch of multi-collateral Dai scheduled on November 18.

Revisiting the Bitcoin Safe Haven Thesis

For the majority of this year, gold and other haven assets have seen large capital inflows due to a confluence of factors:

An environment of heightened geopolitical instability, particularly with respect to U.S.-China trade tensions but also in other localized areas.

Softness in several key macroeconomic indicators in most developed world economies, particularly in manufacturing, a sector traditionally viewed as a bellwether of the overall economy.

A sharp and unexpected pivot to more monetary policy easing, most notably from the Federal Reserve and from the European Central Bank, and a fear that more extreme monetary policy tools will be necessary.

These factors caused gold to rally above $1,500, peaking in late August. Market commentators also drew comparisons to Bitcoin because of its attractive store-of-value properties. Indeed, short-term measures of correlation between Bitcoin and gold returns earlier this year reached one of the highest levels in history (almost +0.50).

Recent developments have made it clear that we are now witnessing another shift. Based on (1) the increase in long-term sovereign bond yields across most developed world economies, (2) a shift in forward guidance from the Fed, and (3) a sell-off in gold, market participants now believe we are past the point of peak monetary policy easing. Any further easing appears to be appropriately priced in. Recent firmness in macroeconomic indicators confirm that fears of a global recession are overblown and optimism for a U.S.-China trade deal is rising.

Bitcoin received intense media attention as the need for safe-haven assets increased but it has largely been ignored as this need has abated. Recent price action and short-term measures of correlation between Bitcoin and gold returns complicate the simple narrative that Bitcoin benefits from safe-haven capital flows.

Gold recently had one of the largest single-day sell-offs in years, but the 30-day correlation between Bitcoin and gold returns stands at -0.22. Not only does this cast doubt on the narrative established earlier this year, it suggests the reaction function of Bitcoin to macroeconomic and geopolitical developments is complex and inconsistent.

For the second week running the Bletchley Mid Cap and Small Cap indexes have outperformed the larger cap indices, returning 5% and 2% respectively. As evidenced above in the Market Data Insights, the outperformance of the Mid Cap Index is largely due to the performance of Tezos, which makes up 10% of the index and returned 41% for the month.

Since Bitcoin is a major component of both the Bletchley 10 (69%) and Bletchley Total (64%), their performance relies a lot on the returns of Bitcoin over the period. Bitcoin was one of the weaker performing large-cap assets of this week, and its impact on the Bletchley 10 and Bletchley Total Indexes is highlighted by the difference in returns between the indexes market-cap-weighted (-0.5%) and the even weighted (4%) versions.