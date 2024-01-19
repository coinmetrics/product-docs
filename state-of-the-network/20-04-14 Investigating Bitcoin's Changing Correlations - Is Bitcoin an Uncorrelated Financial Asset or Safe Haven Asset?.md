# Investigating Bitcoin's Changing Correlations - Is Bitcoin an Uncorrelated Financial Asset or Safe Haven Asset?

**Date:** 20-04-14

The narratives about Bitcoin’s value have shifted over the years, and continue to be debated today. At different points, Bitcoin has been described as electronic cash, censorship resistant digital gold, and an anonymous darknet currency.

Among all of the competing narratives there are two that are particularly important when considering Bitcoin as an investment or store of value:

Bitcoin is an uncorrelated financial asset

Bitcoin is a safe haven asset

But data/analysis about these theories is often lacking. In this week’s State of the Network we analyze end-of-day and intraday correlations between Bitcoin and stocks and gold to test these popular narratives.

To calculate the correlations in this report, we first took the natural log returns for each asset and then calculated rolling Pearson correlations over specified time periods. We analyzed end of day correlations using New York close pricing (4:00 PM EDT) over a 250 day rolling time window. We also looked at intraday correlations by looking at 5 minute returns over a 60 hour rolling time window.

Since cryptocurrency markets never close but equity markets close on nights and weekends, we cut out Bitcoin results for the days/hours when equity markets were closed and stitched together the results. This helps remove some noise, but has a side effect of sometimes creating exaggerated correlations around the opening/closing of each market day.

Data sources include Coin Metrics, Finnhub, and FRED. You can check out Bitcoin (and other cryptoasset) correlation charts in our free community charting tool, although the numbers will be slightly different due to the different methodology used for this piece.

Bitcoin’s correlation with other financial assets is an important consideration when analyzing it as an investment option. If Bitcoin has low correlation with traditional financial assets like stocks, it can effectively be used as a portfolio diversifier.

The stock market is large and complex, and it can be difficult to analyze Bitcoin’s true correlation with the stock market as a whole. One relatively simple way to examine correlations with stocks is to look at Bitcoin’s correlation with the S&P 500 index (specifically SPY), which can serve as a proxy for the stock market at large.

Historically, Bitcoin has been relatively uncorrelated with the S&P 500. Since 2012, Bitcoin/S&P 500 correlation has generally stayed between about .15 and -.15, which signals little to no correlation.

But over the last month, Bitcoin/S&P 500 correlation has suddenly increased to new all-time highs. The following chart shows end-of-day correlation calculated on a 250 day rolling basis.

On a more granular level, intraday data shows that correlation peaked on Black Thursday (i.e. March 12th), when the crypto markets and equity markets both experienced historic, sudden losses (see State of the Network Issue 42 for our analysis on how the crash was mostly driven by short term holders). Correlation then decreased back to relatively normal levels by the end of March. But since then it has started to climb again.

Does this signal that Bitcoin and the S&P 500 are now suddenly correlated?

Probably not. Although short-term correlation shot up, it was under very unique market circumstances. As news about the spreading COVID-19 pandemic began to grow more and more dire on March 12th, investors across the world suddenly began rushing to cash and selling off assets en masse. As a result, correlation shot up between most assets on March 12th.

For example, the correlation between SPY and GLD suddenly shot up to its highest since 2013. This was likely due to the liquidity crunch caused by the pandemic, which led to sell-offs across the board.

Over the last year, Bitcoin and the S&P 500 have had a correlation close to zero. The following chart shows distribution of intraday correlation (5 min returns, 60 hour rolling correlation) over the last 365 days. It’s relatively centrally distributed around 0, with a mean of -.0075. This shows that under normal market conditions, Bitcoin and the S&P 500 are not significantly correlated.

Bitcoin fundamentals did not change over the last month. However, the outside world changed significantly. Over the long-term, Bitcoin and S&P 500 correlation are likely to revert to the mean and return to levels of near zero (unless there are fundamental changes in Bitcoin and/or the S&P 500). But over the short-term, or at least as long as the liquidity crisis lasts, there may continue to be a relatively high correlation between the two, since global conditions appear to be influencing both markets.

Another popular narrative is that Bitcoin is a safe haven asset. Generally speaking, a safe haven is an “investment that is expected to retain or increase in value during times of market turbulence”. Gold is traditionally used as the primary example of a safe haven asset. In uncertain times, the price of gold often increases relative to other asset classes.

Historically, Bitcoin and gold have not had a very strong correlation. But Bitcoin and gold correlation also suddenly increased in March, similar to Bitcoin and S&P 500 correlation.

Although gold is typically considered a safe haven asset under normal market conditions, like most other asset classes gold had a relatively large sell-off on March 12th due to the liquidity crisis. Bitcoin and gold correlation increased as prices for both dropped on March 12th (although the price of both dropped, correlation increased positively since both assets were moving in the same direction). But interestingly, they have stayed relatively highly correlated since.

Although Bitcoin and gold may not act as safe havens during a global liquidity crisis, they may act as a safe haven during increases in monetary inflation and quantitative easing. Given the recent $2 trillion+ injection from the Federal Reserve and the unprecedented uncertainty of global health and economic conditions, it is possible that Bitcoin is acting as a safe haven in response to some events but not to others, and potentially even changing day to day. However it is still hard to draw strong conclusions given the huge confounding factor of the global pandemic.

Bitcoin and gold correlation also showed similar signs of growth earlier in 2020. As covered in State of the Network Issue 33, correlation increased in January as Bitcoin and gold prices both increased as US/Iran military tensions escalated. This suggests that Bitcoin may have reacted as a safe haven asset similar to gold, at least temporarily.

These are small pieces of evidence that the correlation between Bitcoin and gold may be growing. However, Bitcoin’s overall correlation with gold is still relatively weak.

The following chart shows distribution of intraday correlation (5 min returns, 60 hour rolling correlation) between Bitcoin and gold over the last year. It’s also relatively centrally distributed around 0, but has a mean of 0.1194, which is slightly higher than the mean of the Bitcoin/S&P 500 correlation distribution.

Historically, Bitcoin has not been very highly correlated with stocks or gold. Although correlations recently reached all-time highs, it is unlikely that Bitcoin and S&P 500 correlations will remain elevated in the long-term without major changes in the fundamentals of one or both markets. But there is some evidence that correlation between Bitcoin and gold may be starting to increase, at least slightly.

Although the short-term is still uncertain amidst the global pandemic, this could potentially be a long-term inflection point for Bitcoin if federal banks around the world continue to inject money into the global economy at historic rates.  The following chart shows BTC correlation with the 5-Year Forward Inflation Expectation Rate (T5YIFR) from the St. Louis. Fed. Theoretically, if Bitcoin is used as a safe haven in times of monetary inflation, Bitcoin prices should go up as expected inflation increases (and vice versa). Interestingly, Bitcoin/T5YIFR correlation also shot up on March 12th, as the Fed sprung into action in response to the global pandemic

We will continue to follow the situation as it unfolds, and provide context around Bitcoin’s changing narratives.

Ethereum (ETH) metrics surged this past week, with active addresses growing 15% week-over-week. ETH realized cap increased 1.6% from the previous week, its first significant increase since the March 12th crash.

Bitcoin Cash (BCH) also had a big week, with hash rate and difficulty falling due to the scheduled block reward halving. The BCH halving also led to a significant spike in activity, with active addresses and transfers growing 39.3% and 60.6%, respectively.

Ethereum-issued Tether (USDT-ETH) usage continues to climb. On April 7th, USDT-ETH reached 143.32K daily transactions, the highest daily total since September 2019. The April 7th transaction count also eclipsed the 145.71K transactions on March 13th in the direct aftermath of Black Thursday. Omni Tether (USDT) and Tron Tether (USDT-TRX) both still have significantly less daily transactions than USDT-ETH.

The amount of BTC held by Bitfinex has been dropping since April 2nd. Bitfinex BTC supply had declined by about 24% over the last 30 days, which almost matches BitMEX’s 26% decrease.

Simultaneously, the amount of ETH held by Bitfinex has increased by 13% over the last 30 days, which is a larger percentage increase than any other exchange in our coverage.

Markets are up solidly for the week with high correlation among cryptoassets but meaningful dispersion in returns. Most large capitalization cryptoassets outperformed Bitcoin this week. If this pattern sustains, it could foreshadow a change in the market regime where smaller cryptoassets experience a higher beta to Bitcoin. Chainlink (+53%) and Tezos (+21%) are outperformers for the week.

Cryptoasset volatility is off its recent highs as global financial markets stabilize in response to the use of monetary policy tools designed to provide liquidity by virtually every major central bank around the world.

Stablecoins across the board have all seen dramatic increases in their issuance over the past month or so. The drivers of this increase have been a bit of a mystery, with some market participants pointing to an increased need of stablecoins to ride out market volatility, some pointing to continued growth in the lending market for stablecoins, and others pointing to increased retail activity and dip-buying behavior on exchanges.

Here we examine a broader macroeconomic driver for stablecoin issuance: a global shortage of U.S. dollars. Over the past several decades, the dollars’ status as the global reserve currency has been unrivaled. Meaningful amounts of global commerce is invoiced in dollars, major commodities are priced and transacted in U.S. dollars, and large amounts of U.S. dollar denominated foreign debt has been issued by foreign companies and governments. Under normal circumstances, these foreign entities need a steady supply of dollars to engage in trade and to service their debts.

Now, with disruptions on both the demand and supply side in global trade, the torrent of dollars from the U.S. to the world has declined to a small stream. The situation is especially acute now because dollars are needed as a store of value to ride out volatility and for margin calls as leveraged positions unwind. Dollar strength, as measured by the trade weighted U.S. dollar index, jumped nearly 8 percent in a few days starting on March 10.

On the margin, stablecoins should benefit from the global shortage of dollars. USD Coin, the second largest stablecoin, saw its supply increase by over 50 percent in just a few days, also starting on March 10 as the dollar shortage became severe and the dollar strengthened.

The dollar has since given up some of its gains as the Fed has instituted dollar swap lines with major foreign central banks to make sure foreign entities and institutions have access to the dollars they need. In response, USD Coin issuance is also showing signs of slower growth.

In designing the CMBI market cap weighted indexes, Coin Metrics have recently released commentary on many of our methodology decisions for determining the ‘free float’ (circulating) supply of cryptoassets. Information can be found in our blog article, Cryptoasset Free Float: An Exploration of Supply Dynamics, released last week.

All CMBI and Bletchley Indexes finished the week positive for a third week running, but still far from recovering from their mid March drop. The CMBI Ethereum Index was the strongest performer, returning 14.5% over the week. Mid cap cryptoassets were the best performing market size group, with the Bletchley 20 returning 12.4% for the week and being the only market weighted index to perform better than Bitcoin.