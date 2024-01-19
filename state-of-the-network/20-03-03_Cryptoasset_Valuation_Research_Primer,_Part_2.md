# Cryptoasset Valuation Research Primer, Part 2

**Date:** 20-03-03

In a previous State of the Network, we published the first part of our cryptoasset valuation research primer focused on summarizing and synthesizing this emergent field in the literature.

Our introduction in the first part describes our approach:

We conducted a comprehensive literature review to identify all major facets of cryptoasset valuation research that has been conducted so far. All methods were considered, from theoretical valuation frameworks, to empirical valuation models, to novel indicators that have application to valuation.

In short, we are interested in all research that can be used to understand the current value of cryptoassets, estimate the value of cryptoassets, or predict future values of cryptoassets. All publication mediums are considered, regardless of pedigree, from forum postings to academic journals. The most salient articles from both academic and industry researchers are included.

In the second part to our cryptoasset valuation primer, we survey five additional facets of the literature: fundamental ratios, UTXO age analysis, realized capitalization-based analysis, factor investing, and social media-based analysis.

The use of fundamental ratios is one of the most widely used approaches to cryptoasset valuation. Taking inspiration from the field of fundamental equity research (particularly ratios such as the price-earnings ratio), fundamental ratios are frequently used to determine periods of overvaluation and undervaluation.

Woo (2017) was the first to make the connection that fundamental ratios could be applied to cryptoassets by introducing the network value to transactions (NVT) ratio, calculated as a cryptoasset’s market capitalization divided by its daily value transacted over the network. The logic behind this approach is that daily transaction value represents the usage and utility of a cryptoasset. High values of the NVT ratio have reliably detected bubbles and low values have indicated attractive entry points in the past.

Kalichkin (2018a) extends the idea behind the NVT ratio by introducing additional smoothing to correct for certain shortcomings in the original formulation that prevent it from being used as a real-time trading indicator. Kalichkin’s version of NVT is often referred to as NVT Signal.

Franek (2018) introduces a new ratio, based on a valuation derived from Metcalfe’s Law called the network value to Metcalfe ratio, which Kalichkin (2018b) extends by empirically testing on other similar laws.

Arun (2018) also explores alternatives methods of smoothing and more precise estimates of daily transaction value. Combining ideas from both Metcalfe’s Law and the NVT ratio, the article introduces a network value to transactions to growth (NVTG) ratio. As a critical input to the NVT ratio, Coin Metrics (2018a) more precisely estimates transaction value by removing change outputs and non-economic transfers.

Bitcoin network momentum, introduced in Swift (2018), does not use a fundamental ratio, but instead introduces daily transaction value denominated in native units as a leading indicator for prices.

Several other ratios have been proposed that are derived from miner revenue which represents the dollar value of capital that secures a network and a cryptoasset’s intrinsic value. Miners are also a consistent and significant source of selling pressure. For these reasons, Leibowitz (2018) defines a fee ratio multiple which provides a measure of how much of a cryptoassets security spend is dependent on block rewards versus transaction fees. And cryptopoiesis (2019) defines the Puell ratio as daily issuance divided by a 365 period moving average of daily issuance.

Research using fundamental ratios touches upon many facets of the literature. Several additional fundamental ratios leveraging other inputs have been introduced in the fields of UTXO age analysis and realized capitalization ratio, including the the liveliness ratio, market capitalization to realized capitalization (MVRV) ratio, the spent output profit (SOPR) ratio, and the realized capitalization to transaction value (RVT) ratio and others. These areas of the literature and their associated ratios are discussed in the following sections.

Fundamental ratios are perhaps the most developed thread in the literature due to their straightforward interpretation and application to market timing. Still, more work can be done in this area to address certain shortcomings. The most salient criticism points to reduced out-of-sample accuracy in predictions for some ratios such as the NVT ratio and the increasing tendency for more transactions to occur off-chain, either on second layer networks or within an internal ledger of an exchange or custodian. Furthermore, the extremely strong impact that the  bubble-and-crash cycle has on price means that any transformation (such as using ratios) that de-trends price tends to show excellent within-sample predictions but might not necessarily generalize well out-of-sample.

Unspent transaction output (UTXO) age analysis is an area of the literature that studies the supply side of a cryptoasset by examining the behavior of holders. UTXO refers to the output of a transaction that a user holds and is able to spend by serving as inputs into future transactions. This accounting model is used by Bitcoin (BTC) and several other UTXO-based chains. Although the naming of this area of the literature makes specific reference to UTXOs, several of the concepts developed here have been successfully adapted to account-based chains, such as Ethereum.

The earliest known contribution to this field was in ByteCoin (2011) where the term “Bitcoin days destroyed” was first defined as an alternative measure to transaction value. Bitcoin days destroyed is calculated as the number of BTC transacted over a period of time multiplied by the number of days since those BTC were last transacted. This gives a higher weight to coins that have not been spent in a long time, and less weight to coins spent more recently. For example, a coin that had not been transacted in 100 days is weighted 100x more than a coin that had been transacted 1 day ago. This fundamental insight, that inferences can be made by analyzing the age of last use for each coin, set the foundation for subsequent research.

The following chart shows BTC transfer value weighted by days destroyed, smoothed using a seven day rolling average.

The next significant contribution was in jratcliff63367 (2014), which partitioned the total supply of BTC into various bands based on the age of last use. In subsequent years, industry terminology has converged on the terms active supply or more informally, “HODL waves.”

The same idea was revisited several years later in Bansal (2018) which was instrumental in introducing active supply to a broader audience. The article was the first to draw inferences from active supply with respect to understanding and predicting market cycles and with applications to trading.

Blummer (2018) defines liveliness as, using terminology introduced above, “the Bitcoin days destroyed divided by the total Bitcoin days that currently exist.” Liveliness provides insight into investor behavior by quantifying the behavior of long-term and short-term holders.

Hauge (2019) presents several extensions to Bitcoin days destroyed, including adjusted binary Bitcoin days destroyed, value of coins destroyed, and reserve risk, all with applications to market timing.

The unifying theory behind this approach to valuing cryptoassets is that different cohorts of holders may have differing motivations, risk tolerances, informational advantages, and sentiment depending on their holding time preferences. For instance, long-term holders hold a disproportionately large amount of the supply for many cryptoassets, and their behavior has large implications for price discovery. In our opinion, this area of the literature remains one of the promising areas in which more foundational discoveries can be found.

Realized capitalization represents a novel, cryptoasset-specific approach to valuation that has significantly advanced the field of on-chain analysis. Unlike market capitalization, which values each coin at its current price, realized capitalization values each coin at the time of its last on-chain movement. For example, if 10 BTC were last moved when BTC price was $1,000, those 10 BTC would collectively be valued at $10,000 (10 x $1,000). If 5 different BTC were last moved when the price was $10,000, those 5 BTC would be valued at $50,000 (5 x $10,000).

Under an additional assumption that each on-chain movement represents a transfer of ownership between a willing buyer and willing seller, such that the price at the time of the transfer represents the cost basis of the buyer, realized capitalization can also be interpreted as the aggregate cost basis of all holders.

While UTXO age analysis is concerned about the age at which a coin was moved on-chain, realized capitazalition-based analysis is concerned with the price at which a coin was last moved on-chain.

The core ideas were introduced in Coin Metrics (2018b) which provides a method of calculating realized capitalization for UTXO-based blockchains and account-based blockchains. The market capitalization to realized capitalization (MVRV) ratio is also presented in this article and is further explored as an indicator to identify periods of overvaluation and undervaluation in Mahmudov and Puell (2018). Awe & Wonder (2018) extends the MVRV ratio by applying a z-score transformation which allows it to serve as a more reliable trading indicator.

Checkmate (2019) formulates the realized capitalization to transaction value (RVT) ratio which uses the same fundamental principles behind the NVT ratio but uses realized capitalization instead of market capitalization in the numerator of the ratio.

Carter (2018) introduces thermo capitalization, a closely related concept of realized capitalization, which values each coin at the price at which the coin was originally mined. Under the assumption that miners operate at a long-term profitability equilibrium of barely above breakeven, thermo capitalization represents the accumulated security spend of the network.

Puell (2019) introduces delta capitalization, a related concept that is calculated as the realized capitalization minus average capitalization (a cumulative, trailing moving average of market capitalization). A series of trading signals based on this indicator are explored with good within-sample performance.

Similarly, Demeester, Blummer, and Lescrauwaet (2019) develops a measure to quantify the unrealized profit or loss of investors by calculating the market capitalization minus realized capitalization. Using liveliness, the article defines an indicator representing the change in long-term investor behavior. Shirakashi (2019) originated the spent output profit (SOPR) ratio by quantifying realized gains and losses and uses the ratio to predict local bottoms and tops.

The realized capitalization line of analysis represents a truly cryptoasset-specific approach to valuation due to our ability to derive insights from the blockchain ledger. Being able to estimate the cost basis for all individual investors is a profound discovery (that is impossible to replicate in traditional financial assets) with serious applications to measuring investor sentiment and advancing the field of behavioral economics. Actively managed trading strategies that leverage deeply-rooted human cognitive biases and derived from realized capitalization insights are likely to be effective.

Factor investing makes reference to models which identify specific characteristics of cryptoassets to explain returns. It further extends a very developed area of the literature in traditional financial assets, founded on Fama and French’s seminal work which identified three factors (market risk, size, and value) that explain U.S. equity returns. Since then, researchers have significantly expanded the field of factor investing by identifying hundreds of factors, not only in U.S. equities, but  in other geographies and asset classes. Cryptoassets are a natural next candidate of study.

While other articles previously conducted cross-sectional studies to identify characteristics relevant to cryptoasset values, the first serious study using a traditional factor investing methodology was conducted in Hubrich (2017). It is the first known application of momentum, value, and carry factors to cryptoassets. The paper introduces innovative interpretations of value as the ratio of market value to on-chain transaction volume, and carry as the rate of supply issuance. The evidence suggests cryptoasset factor investing can earn excess returns.

Liu and Tsyvinski (2018) significantly adds to the factor investing literature. It tests a wide number of traditional, macroeconomic, and cryptoasset-specific factors and finds evidence that a momentum factor and factors based on investor attention consistently explain cryptoasset returns but also finds a lack of predictive power for other factors. Kakushadze (2018) confirms the strong finding of a significant momentum effect and also finds lack of predictive power for a liquidity factor. Liu, Tsyvinski, and Wu (2019) extends the work on previously identified factors by introducing discussion regarding portfolio construction.

Additional progress on this thread of the literature is dependent on the evolution of cryptoasset markets. Factor investing is concerned with evaluating large numbers of assets to determine characteristics that explain returns. Additionally, it seeks to construct portfolios consisting of many assets with exposure to certain factors. Therefore, the degree to which investors desire exposure and can obtain exposure to assets in the long-tail is important. The ability for researchers and data providers to identify conceptually consistent network data across assets, regardless of the underlying blockchain architecture, is also a prerequisite for further advances.

The study of the relationship between the price of cryptoassets and social media-related data has a long history in the literature. Cryptoasset fundamentals are still only beginning to be understood (and the short history available to us shows that prices can deviate from fundamentals by a wide margin and for sustained periods), so quantifying investor attention is an active area of research.

Kristoufek (2013) was the first article to use search query volume on Google and Wikipedia to serve as proxies for investor attention and to perform a study of its correlation to BTC’s price as well as tests on causation and co-integration. Garcia, Tessone, Mavrodiev, and Perony (2014) uses a broader set of data beyond search volume which includes Twitter and Facebook activity as well as data outside of social media. Two positive feedback loops are identified: one driven by word of mouth, and the other by new BTC adopters.

Using a very similar methodology and an even broader set of data that includes several measures of on-chain activity, Georgoula, Pournarakis, Bilanakos, Sotiropoulos, and Giaglis (2015)finds that Twitter sentiment, among other indicators, has a positive short-run impact on BTC prices. A related study in Polasik, Piotrowska, Wisniewski, Kotkowski, and Lightfoot (2014) finds that BTC price returns can be explained by newspaper mentions, among other indicators. Mai, Shan, Bai, Wang, and Chiang (2018) present an empirical study using more updated data and concludes that social media sentiment is an important predictor for BTC prices.

Conventional wisdom states that cryptoassets are difficult to value because they lack a firm anchor to existing methods of asset valuation. But a close examination of the current state of cryptoasset valuation research reveals that this statement is not necessarily true.

Over the past 10 years, existing concepts from classical economics, monetary economics, discounted cash flow analysis, fundamental equity research, and other fields have been successfully adapted to valuing cryptoassets.

Simultaneously, several researchers have made noteworthy progress on cryptoasset-specific approaches to valuation which leverage on-chain data. An open ledger containing a historical record of all transactions allows for study of investor behavior, with unprecedented clarity compared to traditional financial assets. Foundational concepts upon which a formal discipline of cryptoasset valuation can be built have been established and many additional concepts likely remain undiscovered for the moment.

The major cryptoassets had a big drop-off this past week amid a general market downturn. As fear continues to build about the spread of coronavirus, Bitcoin (BTC) dropped back below $9,000 and the equities market had its worst week since 2008.

Other cryptoassets fell even more than BTC. Ethereum (ETH) market cap dropped 12.7% week over week. Ripple (XRP), Litecoin (LTC), and Bitcoin Cash (BCH) all dropped between 14% and 16%. ETH and other smaller assets outpaced BTC in the recent run past $10,000, and it appears they may also be outpacing BTC on the way down.

The percent of BTC untouched in at least two years is approaching levels unseen since mid-2017. As of March 1st, about 42% of all BTC has not been moved on-chain (i.e. transacted) for at least two years. The amount of BTC untouched in more than two years has not eclipsed 42% since July, 2017.

There was not a large spike in transfer value days destroyed prior to the recent BTC price slide under $9,000. Although there were a few peaks in early February on the 3rd and 7th, there have not been any abnormally large spikes since.

As covered in the Weekly Feature, BTC transfer value days destroyed is defined as BTC transfer value multiplied by the number of days since those BTC were last transacted. This gives a larger weight to transfers that involve coins that have not been moved in a long time. Spikes in transfer value days destroyed signal that long-dormant coins have been transferred, which could potentially precede sell-offs.

Cryptoassets sold off in concert with risk assets over the past week due primarily to the realization of the economic cost required to contain the coronavirus as the number of confirmed cases accelerate outside of China. During times when need for liquidity is high, reputed safe haven assets such as BTC and gold can be sold since liabilities can typically only be paid in fiat currency. Liabilities can take the form of margin calls in its most immediate form but also include debt service obligations like interest and principal payments.

Interestingly, BTC has seen a gain, along with global equities, after comments from the Bank of Japan (which held an emergency meeting on Monday) stating that they would take steps to stabilize markets. Such events should not be examined too closely in isolation due to the random walk that asset prices can take, but it continues to add to the body of evidence that BTC and the broader cryptoasset market do react to events beyond the immediate industry.

Despite the sharp declines in cryptoassets, forced liquidations on BitMEX and other futures exchanges remain modest in sharp contrast to the pattern seen last year. Perhaps more dispersed volume across derivatives exchanges is lessening the impact of any one exchange.

Realized volatility still remains moderate for BTC but a firm trend of increasing volatility for almost other assets remains.

The best performing CMBI  index this week was the CMBI Bitcoin Index, despite its 14% drop. This is evidenced by the negative performance of all other CMBI indexes when denominated in BTC value.

After its record run of 9 consecutive weeks of positive performance, the CMBI Ethereum Index was one of the worst performing indexes, falling over 20% during the week. Of the multi-asset indexes it was the Bletchley 20 (mid-caps) that were most impacted experiencing a 20% fall.

Despite the poor weekly performance, the CMBI Ethereum Index was by far the best performer in February, returning 25% for the month whilst most other indexes experienced between -5% and +5% returns. The CMBI Bitcoin Index was the worst performer of the month falling 6%.