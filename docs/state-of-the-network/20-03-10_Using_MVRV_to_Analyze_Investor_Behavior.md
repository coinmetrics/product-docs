# Using MVRV to Analyze Investor Behavior

**Date:** 20-03-10

In two previous issues of State of the Network (Primer on Cryptoasset Valuation Part 1 and Part 2) we conducted a comprehensive review of cryptoasset valuation research. In this issue we take a deep dive into one specific valuation metric: the market value to realized value (MVRV) ratio.

MVRV is composed of two metrics: realized capitalization and market capitalization. In the following section we give an overview of how realized capitalization is calculated, as a prerequisite to an explanation of MVRV.

All of the data used in this report including realized cap and MVRV is available as part of Coin Metrics Network Data Pro. More information is available on our new website.

Realized capitalization is a metric created by Coin Metrics that is calculated by valuing each unit of supply at the price it last moved on-chain (i.e. the last time it was transacted). This is in contrast to traditional market capitalization which values each unit of supply uniformly at the current market price.

For example, if Bitcoin’s (BTC’s) current price was $10,000, traditional market cap would value each coin equally at $10,000. If the current total BTC supply was 18 million, this would result in a total market cap of $180,000,000,000 (18 million multiplied by $10,000).

Realized cap, on the other hand, values each coin at the time it was last moved on-chain. So if a coin was last transacted when BTC was $2,500, that particular coin would be priced at $2,500 instead of the current market price. The realized cap is the total sum of all coins priced this way.

Realized cap can be thought of as an estimation of the aggregate cost basis of a cryptoasset.  This provides a valuable view into investor behavior that is not really possible with most traditional, non-crypto assets.

It’s important to note that this is just an estimate and not an exact measurement of investor cost basis. Realized cap measures the value of coins the last time they were transacted, not necessarily the last time they were traded or exchanged. But since cryptoassets are mostly used for investing/trading and not for payments (at least for now), realized cap can be used as a generalized proxy for cost basis.

Realized cap also accounts for lost coins better than market cap. For example, if 100 BTC were last moved in 2011 when BTC price was $1, there is a decent chance that those particular BTC are permanently lost (see State of the Network Issue 26 for our analysis on the amount of BTC that has been permanently lost).  Realized cap would value these coins at a total of $100 (100 BTC multiplied by $1), while market cap would value them at current market prices.

MVRV is the ratio of a cryptoasset’s market cap (aka market value) to realized cap (aka realized value). It can be used to help gauge cryptoasset market tops and bottoms, and also to gain more insight into a cryptoasset’s investor behavior.

One way to view MVRV is to think of it as a comparison between speculator and holder valuation of a cryptoasset. Under this interpretation, market cap can be thought of as an estimation of speculators’ current market value (assuming sudden market cap changes are mostly driven by speculation). Realized cap, on the other hand, is a gauge of holders’ market valuation, since it reflects prices at time of last transaction and is not as affected by sudden price swings.

An MVRV of one is therefore an important cutoff. An MVRV above one signals that speculators have a higher average market valuation than holders. An MVRV below one, on the other hand, signals that holders have (or had) a higher market valuation than current speculators. Holders are tested when MVRV swings below one, as it becomes less and less likely they will be able to immediately sell their holdings at a profit.

MVRV has historically been a good indicator of market tops and bottoms, at least for BTC. Peaks in MVRV have typically indicated that the market is at a top, while lows have occurred during times when a the market is at a bottom or in an accumulation period.

But up until this point, most of the research around MVRV has focused on BTC and not other cryptoassets. BTC’s MVRV has mostly stayed above one, with a few accumulation periods where it briefly dropped below. However this is not the case for all cryptoassets.

In the following section we analyze the MVRV ratio for a variety of cryptoassets, and explore what differing MVRV patterns tell us about each specific asset.

Historically, peaks in BTC MVRV have coincided with peaks in BTC price. MVRV spiked above 5.5 in Apr. 2013 and Nov. 2013, and above 4.5 in Dec. 2017, all three of which were local market tops.

Conversely, there have been three periods since 2011 where BTC MVRV dipped below one: Sept. - Dec. 2011, Jan. - Oct 2015, and Nov. 2018 - Apr. 2019. In hindsight, all three of these periods have been some of the best times to accumulate BTC.

BTC MVRV shows relatively healthy patterns of growth followed by accumulation periods. MVRV has rebounded back above one after all three times it dropped below, which shows that there has been long term support by holders that has balanced out cycles of speculation.

In its first few years of existence Ethereum (ETH) MVRV was well above one, which signaled a relatively speculative period. Fueled by the ICO craze, ETH MVRV spiked to 2.94 in March 2017 and 3.14 in June 2017 during local market tops. But it has declined since then, and has not topped 3.0 since the mid-2017 peak.

ETH’s MVRV reached its lowest point in December 2018, when it dipped below 0.3. It then swung upward in early 2019 and again in early 2020, which signals that ETH potentially also has a base of holders who help support speculative growth spurts. ETH’s recent MVRV spikes have not been as high as BTC’s though, which suggests its in a slightly more precarious position.

Similar to ETH, Ripple (XRP) initially had an MVRV well above one, which signaled that it was a relatively speculative asset. But in mid-2018 XRP’s MVRV abruptly dropped below one, and has not broken back above since. XRP’s MVRV inability to rebound back above one signals that speculative enthusiasm for XRP may be waning. If that is the case, holders are may increasingly be underwater.

Tezos (XTZ) MVRV shows an opposite pattern to XRP. XTZ MVRV remained below one for most of its history, and then suddenly shot above one in early 2020. This signals that XTZ likely had strong holder support for most of its early years. But its future is less clear - the sudden rise in MVRV could potentially signal that XTZ is turning the corner to an upswing, and/or that it is entering a period of high speculation.

Bitcoin SV (BSV) MVRV has been above one since its inception, which likely signals a relatively speculative market. Although BSV MVRV has fluctuated up and down, the level of holder support at MVRV of below one remains to be seen.

Cryptoasset valuation is still a burgeoning field, but there has already been a lot of interesting research about novel crypto-specific indicators. MVRV is a powerful metric that uses on-chain data to gauge market tops and bottoms, as well as provide information into the overall health of a cryptoasset. But it’s also important to look at other on-chain data and fundamental indicators in addition to MVRV to get a full picture of whether a cryptoasset is undervalued, or just underwater. We will continue to track MVRV across all major cryptoassets and provide updates through the latest market volatility.

Despite the market slide, usage metrics for most of the major cryptoassets were up this past week. BTC active addresses grew 5.3% week-over-week, while Litecoin (LTC), XRP, and Bitcoin Cash (BCH) active addresses all increased by 17% or more.  ETH active addresses saw a slight decline, however, dropping 4.9%.

ETH fees also dropped more than the other assets in our sample, declining by over 15%. However, it’s important to note that ETH still had an average of $96.2K of daily fees over the last week, while XRP, LTC, and BCH all had an average of less than $1K.

We recently partnered with Blocknative to provide data for their research on transaction growth. The following excerpt and chart, taken from their report, shows aggregate transactions from 2009 until 2019:

“Significantly, we crossed the 1 billion aggregate transactions per year threshold in 2019. In fact, more than 37% (>1.1 billion) of all blockchain transactions in history occurred in 2019.”

Over the last 180 days, Paxos (PAX) has outgrown Omni-issued Tether (USDT), Ethereum-issued Tether (USDT_ETH), USD Coin (USDC) and TrueUSD (TUSD) in terms of daily transactions count. PAX has grown about 545% over the period, while USDT and USDT_ETH transactions count has actually slightly declined. The following charts show percent growth smoothed using a seven day rolling average.

USDC, however, led the way in terms of adjusted transfer value growth. USDC grew by about 80%, while PAX was about even.

Most cryptoassets experienced downturns this week as broader financial markets steeply declined in response to the coronavirus and crude oil price war.

In a previous State of the Network, we showed quite strong evidence that BTC responded efficiently as military tensions escalated between the United States and Iran earlier this year. In the past week, BTC has been highly correlated with global equities with a near identical reaction to the Fed’s surprise 50 basis point interest rate cut and a coordinated sell-off on Sunday as futures markets opened. While events similar to this have happened in BTC’s history (such as during the Cypriot banking crisis, Greek default fears, and the initial passing of the Brexit referendum), the increased frequency of such events indicate that the “uncorrelated asset class” part of BTC’s narrative may no longer ring true in the future.

While gold has seen brief moments of weakness due to increased liquidity needs, it has nonetheless continued to serve as a relative safe haven asset with prices at seven year highs. BTC’s poor performance, in contrast, has raised legitimate questions about its ability to serve as a safe haven.

In order to provide some historical benchmarks, we investigated the performance of BTC during acute moves in various risk-off indicators.

S&P 500

To start, we investigated the S&P 500. Equities are typically considered to be risk assets and, as a key benchmark for equities, the S&P 500 typically falls during risk off environments. We selected the 20 worst days for the S&P 500 since the beginning of BTC’s price availability (7/18/10).

During these 20 days, the S&P 500 had an average return of -3.77% and a median return of -3.49%. The average return of BTC during these 20 days was -0.78%, with a median return of -0.40%.

VIX

We also took a look at the VIX, a volatility index commonly referred to as the “Fear Index”. Volatility increases during periods of uncertainty, driving this index higher. We reviewed the 20 largest single day gains in the VIX since the beginning of BTC’s price availability.

During these 20 days, the VIX had an average gain of 44.6% and a median increase of 42.6%. The average return of BTC during these 20 days was 0.1%, with a median return of 0.5%.

10Y Treasury Rates

During risk off environments, investors typically purchase treasuries (which are considered safe haven assets), funded by sales of risk assets such as equities. We looked at 10-Year Treasury Constant Maturity Rates, selecting the 20 largest rate drops since the beginning of BTC’s price availability.

During these 20 days, the 10 year treasury rate had an average decline of 0.1560 percentage points and a median rate decline of 0.1600 percentage points.

The average return of BTC during these 20 days was 2.8%, with a median return of 3.1%.

As can be seen from the summary table below, BTC’s behavior relative to other risk indicators is inconclusive. At a superficial level, BTC appears to fall less than the S&P 500, but it also gains significantly less than the VIX. BTC’s average gains during instances where 10 year treasury rates fell significantly is interesting and an opportunity for the kind of future research required to provide a more comprehensive and thorough picture of BTC’s performance during times of market stress.

Summary of Bitcoin’s Performance during days of acute market stress

Despite the performance during certain days of market stress illustrated above, historical correlations between BTC and financial assets have remained close to zero. Recent events, however, suggest a stronger relationship between BTC and events that affect broader financial markets. In light of recent data, BTC’s lack of correlation may be explained by its lack of maturity as an asset class rather than an inherent property.

All CMBI and Bletchley Indexes fell again this week as the cryptoasset market experienced volatility and poor performance.

After starting the week strongly with most indexes up 10% on Friday, sentiment changed quickly through the weekend. The CMBI Ethereum Index was the best performer of the week, down only 0.7% for the week but returning 1.6% against BTC. Small-cap cryptoassets performed the best this week with the Bletchley 40 only experiencing a 1.5% drawdown.