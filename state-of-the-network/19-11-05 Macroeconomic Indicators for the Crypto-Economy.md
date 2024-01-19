# Macroeconomic Indicators for the Crypto-Economy

**Date:** 19-11-05

Macroeconomic Indicators for the Crypto-Economy

Just like a nation state’s economy has economic concepts (such as gross domestic product, inflation, and unemployment), a crypto asset can represent a miniature economy that has similar economic concepts. We present our network data using a simple analogy that many people are familiar with: macroeconomic indicators.

Miniature Crypto-Economies

For certain ERC-20 tokens, viewing crypto-networks as small-scale economies is relatively straight forward. For example, Golem (GNT) represents a miniature economy in which idle computing power is the sole service offered and purchased. Similarly, Basic Attention Token (BAT) represents an economy in which the sole services provided are an individual user’s attention and advertising.

When considering Bitcoin’s crypto-economy, things are a little more complex. Under a narrow interpretation, Bitcoin itself is the sole good that is manufactured and sold in this virtual economy. An alternative interpretation is viewing the Bitcoin network as a full-fledged economy in which Bitcoin is used as a medium of exchange for a wide range of goods and services. This represents Bitcoin’s use on the dark web, as one example.

Although analyzing a nation state’s economy is difficult because of its almost infinite complexity, government statistical agencies report on the current state of the economy by creating a conceptual, idealized definition of what they are attempting to measure, and use sophisticated sampling and survey techniques to create an estimate. Despite their best efforts and steady improvements in data collection methods and calculation methodologies, macroeconomic data is reported with lengthy lags and is subject to revisions long after the initial release. Policymakers and researchers are forced to rely on imperfect information to drive their decisions.

Crypto-economies are less susceptible to the lag and measurement error present in macroeconomic reporting in nation-state economies. The most fundamental action in any economy is a transaction between a willing buyer and a willing seller for a good or service, and a crypto-asset’s shared, immutable, and open ledger reveals each individual transaction (except for layer 2 transactions, and transactions taking place inside custodians), allowing analysis of the economy in real-time. In theory, if an actor knew the identity behind every address and the nature of each transaction, the state of a crypto-economy could be reported with no lag and with close to perfect precision.

Bitcoin’s Gross Domestic Product (GDP) Growth

Among macroeconomic indicators, a country’s gross domestic product (GDP), which measures the economic value of final goods and services produced by an economy over a given time period, is often viewed as the single most important indicator.

What is the network metric that most closely matches the conceptual definition of GDP? Coin Metrics’ adjusted transfer value, which measures the USD value of the native units transferred over a given period of time, is a strong candidate. According to the latest data, $2.33 billion of value is transferred in the Bitcoin economy each day.

Although adjusted transfer value is likely directionally correlated with GDP, it likely overstates the true GDP figure perhaps by several orders of magnitude because of two reasons. One, transactions involving the purchase of goods and services are likely a small fraction of total activity. Two, of the transactions that involve the purchase of goods and services, this metric does not exclude the purchases of intermediate goods (i.e. a product used to create a final product), which are explicitly excluded from the GDP calculation.

However, Coin Metrics does make several adjustments in order to make this metric more closely represent true economic activity. For UTXO-based chains, each output transaction must be comprised of prior inputs. All inputs are wholly consumed such that it is impossible to definitively know which outputs represent a legitimate, economic transfer of value and which outputs represent change being sent back to the sender (see here for more details on change). Coin Metrics employs several sophisticated heuristics to detect change outputs and other non-economic transfers. Such adjustments are the first step to creating an accurate GDP calculation.

Although a true measure of Bitcoin’s GDP is currently unknown, it is likely significant. Under the assumption that only 1 percent of adjusted transfer value is for final goods and services, this would result in a nominal Bitcoin GDP of $8.4 billion, approximately equivalent to the world’s 140th biggest economy.

For policymakers, the level of a country’s GDP is rarely of interest. Instead, they are interested in the growth of GDP and how this growth fluctuates against theoretical potential GDP growth. Below we show Bitcoin’s GDP growth over time, represented as annualized three-month continuous growth. Bitcoin’s “business cycles” can be seen here, sometimes growing rapidly and sometimes contracting rapidly. Current growth is slightly negative at -15% but up sharply from recent lows.

Extreme growth numbers can be seen in Bitcoin’s history. For example, a continuous growth rate of 600% (last seen during the peak of the recent bubble), sustained over a year, leads to an increase of over 40,000% from its initial value.

Note on smoothing: All level charts are smoothed with a 28-day centered moving average, followed by a 2-day centered moving average. Recent observations are extended forward using a 7-day non-centered moving average. Continuous growth charts are calculated after these transformations are applied.

Bitcoin’s Population Growth

Demographics are often linked to macroeconomic reporting because working-age population growth is a primary factor in a country’s long-term potential growth. Assume that the Bitcoin network represents a virtual nation-state. What is the population of this nation and how is it growing?

One estimate of the total population is the number of addresses with a balance greater than 0.001 Bitcoin, a number that is large enough to exclude dust balances and small enough to represent a meaningful economic amount for most people in the world. Current estimates indicate 14.42 million users of the Bitcoin network, although the true number remains unknown -- there can be a many-to-one or one-to-many mapping between individuals and addresses. Based on publicly released user counts for some exchanges, this figure likely understates the true number.

User growth remains strong at 19% although down from historical averages. User growth has become negative only once (as measured over this interval) in Bitcoin’s history during early 2018, although this artifact is likely to have been caused by UTXO consolidation as high fees subsided. Growth figures are lower over the past two years, perhaps because of the increased use of exchanges and custodians as well as more efficient transaction batching and wallet software.

Bitcoin’s Transaction Count Growth

Although Bitcoin’s transaction count does not map to an existing macroeconomic indicator, it can serve as an alternative measure of growth. Similar to how retail sales, personal income,  durable goods orders, manufacturing and services PMI all serve to measure more narrow components of a country’s GDP, analyzing transaction count can provide a more focused view on one element of economic activity.

Current transaction count stands at 302,000 transactions per day. Peak transactions have never exceeded 400,000 transactions per day, and as we approach this level, fees begin to rise and economic participants will be incentivized to move their transactions through second layer channels. Counting transactions on the blockchain layer and higher layers (in the future) is one important aggregate measure. An alternative related metric is transfer count which counts the total number of transfers within all transactions.

Here transaction count growth illustrates a problem of Bitcoin’s deflationary nature for economic activity. Current transaction count growth is -30% and has been negative for several months. What we see here is that as Bitcoin’s price rises (denominated in U.S. dollars), the price of goods and services denominated in Bitcoin decreases. A deflationary economic environment reduces the incentive to spend because holding existing Bitcoin means that an individual can purchase more goods and services at a later time. This is a key reason why almost all the planet’s central banks have price stability as their central mandate and a small but positive inflation target of 2% as one of their policy objectives.

Bitcoin’s Block Size Capacity Utilization

A nation state’s capacity utilization is also a commonly examined growth indicator. Capacity utilization measures the degree to which a nation’s productive capacity is being utilized. Most of the economic activity in the developed world economies have now shifted to services, and capacity utilization is normally a measure of a nation’s manufacturing industry. Nonetheless, capacity utilization is important because the manufacturing sector is often seen as a bellwether for the broader economy. High rates of capacity utilization also signal wage and price pressures which are important considerations for a central bank’s policy response.

Here we show Bitcoin’s block size capacity utilization -- the mean size of a Bitcoin block as a percent of maximum theoretical size. Although the analogy is imperfect, analyzing block size as an important indicator of growth draws several similarities. As block size reaches close to its theoretical maximum, it places upward pressure on Bitcoin’s fee market and generally leads to a slow down in growth of other macro indicators.

Maximum block size has only been reached twice in Bitcoin’s history and capacity utilization currently stands at 87%.

Bitcoin’s Industrial Production

Similar to capacity utilization, industrial production is a measure of a nation state’s manufacturing sector -- including mining. Although the analogy is again imperfect, Bitcoin’s hash rate is conceptually similar. Hash rate has increased from less than 5 million hashes per second during its first day of existence to a current hash rate of 90.91 million trillion hashes per second.

Similar to a nation state’s manufacturing sector, miner behavior is important for the health of a crypto network, not only as a measure of security, but also because miners are one of the only natural sellers in the market. Assuming that Bitcoin miners breakeven in the long-term, miners must sell over $6 billion of Bitcoin over the course of a year based on today’s prices.

Hash rate growth lags price growth by several months. The current hash rate is in line with recent historical averages but down from recent highs, mirroring price declines. Growth, measured over this interval, has only turned negative three times in Bitcoin’s history. Declines in hash rate are critical events and have strong implications for the amount of miner-led selling pressure.

Bitcoin’s Money Growth

Although Bitcoin’s annual issuance rate is often compared to a nation state’s inflation rate (usually measured as CPI growth), the comparison is incorrect. Currently, Bitcoin does not serve widely as a unit of account and few goods and services are denominated in Bitcoin terms. Therefore, a basket of goods and services denominated in Bitcoin does not exist and an inflation rate cannot be calculated. The more appropriate comparison is growth in base money or perhaps a measure that represents credit creation in addition to base money, like the Federal Reserve’s balance sheet.

Although critically important for Bitcoin’s appeal as a store-of-value, Bitcoin’s issuance rate is uninteresting precisely because of its predictability. Current issuance is 3.6% and will drop to 1.8% when the block reward halves around May 2020. However, the implications for miner-led selling flow are significant and market participants’ belief that the halving is impactful on prices may become self-fulfilling.

Although early in Bitcoin’s development, a rudimentary credit market is being developed for Bitcoin. Already we are seeing the rise of short-term, collateralized lending from providers such as Genesis Capital. Discussion of Bitcoin-denominated bonds are active and in the far future, a bank that takes Bitcoin deposits and originates Bitcoin loans is possible. The effective upper limit on Bitcoin in circulation could therefore exceed the current supply if trusted parties begin issuing credit-like instruments, not too dissimilar to the differences between Money Stock (M1 and M2) and the Monetary Base in traditional money markets. How this will impact the Bitcoin economy remains to be seen and deserves greater study.

Further Study

As the field of network analysis advances and as crypto assets continue to develop, data on the state of these economies will improve in quality. For example, a method that can characterize the entire address space will allow the reporting of headline metrics and its subcomponents. The rise of a robust lending market lends itself to yield curve analysis and credit creation metrics. Many existing metrics can also be reported on a per capita basis using active addresses or other metrics representing user count.

Summary

A small country (like Iceland, containing a population of 360,000) has a government statistical agency publishing a complete set of macroeconomic indicators that report on the state of the economy. Bitcoin and other crypto-assets have user counts and levels of economic activity exceeding small nation-states, and these virtual crypto-economies deserve first-class macroeconomic reporting. Coin Metrics is committed to using the principles and best practices established by government agencies and private organizations to provide transparency on the state of these networks.

BTC and BCH market cap grew for the second straight week (measured on a week-over-week basis), while ETH, XRP, and LTC bounced back from down weeks. However, although market caps were up across the board, BTC and ETH usage were both down: BTC and ETH active addresses were down over 2% week-to-week, and transaction and transfer counts are both down by over 4%.

After surging to new all-time highs at the end of October, BTC hash rate is down over the last week. There are reports that the drop in hash rate may be related to the end of China’s rainy season, which causes some hydropower stations to decrease their capacity and forces many miners offline in search of cheaper electricity. However, it may also be due to a lag between price and hash rate decline, following the price drop from $10k to $8k. Alternatively, it could simply be due to variance.

BTC realized cap continues to hit new all-time highs; on November 3rd BTC realized cap hit a new high of $102,936,158,856. “Realized capitalization” is calculated by valuing each unit of supply at the price it last moved and can be thought of as the average cost basis for crypto asset holders. Read more about how we calculate realized cap in State of the Network Issue 14.

BTC’s realized cap has grown by about 30% since the beginning of 2019, which is more than any other large crypto asset over the same period. For comparison, XTZ’s realized cap grew by 12%, LTC’s grew by 3%, and ETH’s declined by 9%.

After ETH total daily transaction fees threatened to pass BTC over the course of September, BTC has now pulled back out into the lead. BTC fees surged to over $439,000 on October 26th, and have remained at $300,000 or more for most of the days since. ETH had a little over $100,000 daily fees on October 26th, and has not topped more than $106,000 since.

Both BTC and ETH continue to dominate all other blockchains when it comes to overall fees. The following chart shows the percent of mining revenue (which we define as total transaction fees plus newly issued tokens, i.e., block reward) composed of transaction fees, averaged over the last three months.

In the long run, most blockchains’ block rewards will gradually decrease towards zero due to regularly scheduled block reward halvings. As block rewards decrease, fees begin to become a larger percentage of overall mining revenue and therefore become a more and more critical part of a chain’s long term sustainability and health.

Interestingly, after the October surge in ETH fees, about 4.5% of ETH’s mining revenue is composed of fees, compared to 1.8% for BTC. However, no other chain comes close to either ETH or BTC. Only 0.23% of DASH mining revenue is composed of fees, and only 0.03% of BCH revenue currently comes from fees.

Bitcoin’s two biggest forks have outperformed most of the rest of the major crypto assets over the past month. Surprisingly, Bitcoin Cash SV (BSV) has provided top monthly returns, rising 56% over the last 30 days. Bitcoin Cash (BCH) is not far behind, with a 31% gain, compared to a 13% gain for Bitcoin itself. The following charts show trailing month returns, from October 3rd to November 3rd.

China-based crypto assets, like Tron and NEO, have also exhibited strong gains over the last month. The direct cause of Tron and NEO’s outperformance remains unclear, but remarks from Chinese President Xi Jinping urging greater development in blockchain technologies may have been one of the catalysts, as we wrote about in last week’s State of the Network.

Meanwhile, after relatively strong market cap growth over most of the past year, Tezos’ price has started to decline, dropping 6% over the last 30 days.

Despite a historic Friday that saw Bitcoin pump over 40%, the Bletchley Indexes returned mixed results this week. The Bletchley 20 (Mid Cap) and Bletchley 40 (Small Cap) performing the best, returning 0.5% and 1.5% respectively, while the Bletchley 10 (Large Cap) had a disappointing week, falling 2.5%.

October broke a 3 month downwards streak for crypto asset prices, with all indexes returning above 8%. The Bletchley 20 (Mid Cap) performed the strongest, appreciating 15% against the USD and 4% against Bitcoin.

There was no asset turnover between indexes during the November monthly rebalance.