# The BitMEX Liquidation Spiral

**Date:** 20-03-24

In the previous issue of State of the Network, we presented some preliminary analysis of the recent dramatic crash in cryptoasset prices. We showed that on-chain data seem to indicate that few long-term Bitcoin holders capitulated when Bitcoin’s price dropped by nearly 40% in a single day.

Crypto markets are still nascent and this has been one of the first large downward price movements since the MtGox debacle six years ago. Since then, many new exchanges have sprung up, derivatives products have emerged and the amount of capital allocated to trading cryptoassets has skyrocketed.

In this feature, we’ll look at how the markets held under the pressure from the recent sell-off and whether crypto’s unique market structure exacerbated the problem.

Two large Bitcoin price moves occured on March 12th and 13th which were registered by Coin Metrics’ Real Time Reference Rate:

On March 12th, from 10:00 to 11:00AM UTC, Bitcoin’s price fell from $7,300 to a low of $5,690.

From March 12th 11:00PM to March 13th 2:15AM, Bitcoin’s price fell from $5,800 to a low of $3,900.

One exchange played a particularly pivotal role during the second price drop: BitMEX.

BitMEX (Bitcoin Mercantile Exchange) is one of the largest new derivatives markets that emerged post-MtGox. It created the “perpetual inverse swap”, a financial product allowing leveraged trading of dollar-denominated Bitcoin perpetual futures contracts using Bitcoin as margin collateral.

Created in 2014, BitMEX’s popularity grew immensely and by March of 2020 it handled billions of dollars of trading volume per day. Studies have shown that its flagship perpetual contract is critical to Bitcoin’s price discovery.

On March 13th, during the second downward price movement at 2:16AM UTC, trading on BitMEX slowed to a crawl as the exchange faced what was first thought to be a hardware issue, but was later determined to be an intentional DDOS attack. This made it nearly impossible to trade on BitMEX.

As soon as BitMEX was attacked, the price recovered and surged to $5,300.

The red area indicates when BitMEX suffered DDOS attacks.

From March 12th 9AM to March 13th 6AM UTC, long positions worth 1.1B contracts (one contract represents a $1 position) were liquidated. As traders got liquidated, the open interest (the number of contracts held by traders) decreased:

BitMEX allows leveraged trading of Bitcoin, but also guarantees that no trader can lose more than their margin (i.e. you cannot lose more than what you bet). In traditional markets, this is often not possible. BitMEX achieves this using two features.

First, if a position gets liquidated (its remaining margin is not high enough), an automated system takes over the position: the liquidation engine. Run by BitMEX, it aims to close the trader’s position at a price favorable enough that not all the remaining margin gets used. If it manages to do so, the profits go to an insurance fund. If it doesn’t, funds get withdrawn from that insurance fund (which stands at more than 30k BTC as of writing).

The second feature is auto-deleveraging. If the liquidation engine cannot close liquidated positions profitably and the insurance fund runs low, it resorts to taking money from traders with winning positions to cover losses from losing positions. This is the last recourse, as arbitrarily changing traders’ positions on one exchange can affect their overall financial health since they often run strategies on many other exchanges. Following this crash, BitMEX posted a good in-depth explainer of these mechanics.

This bloodbath was partially stopped when BitMEX suffered a reported DDOS attack. This led many to wonder whether the crash was partially caused or aggravated by the exchange’s handling of all the liquidated positions.

The theory goes as follows:

When long positions get liquidated, as was the case when the price went down, the engine has to sell contracts. As liquidations mounted and liquidity waned, the engine was put in a difficult spot: it had lots of contracts to sell, but faced a worsening price leading to more liquidations and more contracts to sell. This can create a vicious cycle that is difficult to stop.

When trading on BitMEX became very difficult due to the DDOS attack, the biggest seller on the market, BitMEX’s liquidation engine, disappeared and the price naturally went up.

A common way to measure market conditions is looking at the bid-ask spread, which is the difference between the best bid (i.e. the price a buyer is willing to pay) and the best ask (i.e. the price a seller wants to receive). It is commonly measured in basis points (0.01% equals 1 basis point or bps).

For Bitcoin, still an emerging asset class and with varying fees per trading venue, the bid-ask spread is mostly below 20 bps in normal trading conditions. This can be seen across three exchanges in the chart below, observed from February 1 to 3 of this year:

Large price movements directly affect the bid ask spread as market makers react to the volatility by widening their bids and asks. In the next chart, we can see the impact of a price drop from $9,500 to a low of $8,000 in the span of 2 hours in September 2019  (the Y-axis is capped at 50bps to make this more visible):

Once the move is over and the price stabilizes, the spreads come back to their pre-move levels.

The March 12th-13th move was different. Spreads still haven’t come back to their previous levels.

There could be multiple explanations as to why spreads haven’t come back to pre-March 12th levels. Market participants could be expecting volatility to continue and are preparing themselves by increasing their spreads. Bitcoin’s realized volatility measured over the past one month is at the high end of its historical trading range over the past six years.

It could also be that some market participants left altogether, reducing liquidity. For example, futures open interest hasn’t grown following the market crash and bid-offer spread for a $10M quote has grown significantly:

The supply of all stablecoins Coin Metrics tracks started growing around the time COVID-19’s impact on global markets started to be visible (S&P all-time-high was on Feb 19th). It seems that the growth of stablecoins’ supply increased after Bitcoin’s massive drop.

The dual impact of Bitcoin’s USD value halving and massive issuance of stablecoins led to stablecoins’ market cap as a percentage of Bitcoin’s doubling in a matter of days:

This recent market move was spectacular, the largest in Bitcoin’s modern history. It had many implications: spreads on spot and futures markets widened, on-chain fees spiked as people rushed to deposit coins, and stablecoins gained market share.

It also raised many questions: should circuit-breakers be instituted? Is Bitcoin really a store of value if its value can drop in half in a matter of hours or is this merely a function of nascent market structure?

While a lot of these questions are still unanswered, one is getting closer to having an answer: Huobi has recently implemented a liquidation circuit breaker on all their derivatives products. Despite its name, it isn’t a traditional circuit breaker in which trading stops if the traded product’s price drops too quickly. Instead of stopping trading, it throttles the liquidation engine to avoid vicious liquidation cycles. It is still unclear whether this would prevent any such cycle. It could also end up exposing the exchange to large losses if the drop in price was warranted and not caused by its liquidation engine.

While the price mostly recovered, this event left lasting marks on Bitcoin’s market structure from spreads to concerns about its stability. BitMEX might have lost traders’ confidence, as the number of Bitcoin it holds has been steadily decreasing since the crash.

Times of stress and sudden change often lead to innovation and restructuring. Crypto market structure will likely continue to be tested during these turbulent times, and will hopefully mature and grow stronger as a result.

Most usage and security metrics were down for the major cryptoassets this past week as the dust began to settle following the March 12th crash. Notably, Bitcoin transactions are down over 14% week-over-week, more than any other large cryptoasset. This is at least partially because Coinbase introduced transaction batching on March 12th, which helped reduce transactions and lighten the load on the Bitcoin blockchain.

Also of note, Ethereum active addresses increased by almost 17% week-over-week while decreasing for all other cryptoassets in our sample. This may be due to the increase in usage of Ethereum-based Tether (more on this in the “Network Highlights” section).

Bitcoin estimated hash rate fell 12.1% over the week, as mining revenue tumbled due to the drastic price decrease. As a result, it looks like Bitcoin difficulty will likely readjust to its lowest level in 2020 at the next difficulty retarget.

Stablecoin transfer value hit an all-time high amidst the market turmoil. On March 13th, the aggregated transfer of all stablecoins that we track (listed below) reached a new all-time high of $444.21M.

The following chart shows the total transfer value (smoothed using a seven day rolling average) for the following stablecoins: Tether issued on Omni (USDT), Ethereum (USDT-ETH), and Tron (USDT-TRX), DAI, PAX, USDC, TUSD, and GUSD.

Money continues to pour into stablecoins as investors look for stability amidst volatile price action. USDC has been the biggest gainer percentage-wise, with a 57% market cap increase over the last 30 days. USDC is mainly used on Coinbase but is now also being used as collateral on MakerDAO in addition to other DeFi applications.

MakerDAO made the decision to add USDC as a collateral option (in addition to ETH and BAT) after the price of their own decentralized stablecoin, DAI, increased to as high as $1.06 on March 12th. DAI’s destabilization was the result of a mass MakerDAO collateral liquidation. As of March 22nd, DAI price remains above $1.02.

GUSD also slipped off of its $1 peg over the past two weeks. Its price is less than $0.98 as of March 22nd.

Tether issued on Ethereum (USDT-ETH) has also had a large increase in market cap, and now accounts for over 50% of the total stablecoin market cap out of the stablecoins that we cover. USDT-ETH market cap has increased by over $660M since March 10th to $3.7B as of March 22nd.

After starting the week down, Bitcoin rallied to finish up 9% on the week. The major Bitcoin forks (Bitcoin Cash and Bitcoin SV) also finished the week strong, up 13% and 28% respectively. Most other cryptoassets are up or relatively unchanged for the week.

Recent coronavirus-related events have provided more evidence in understanding Bitcoin’s unusual reaction function. After selling off in concert with global equities two weeks ago, leading to the highest correlation between Bitcoin and the S&P 500 in its history, it has since experienced a few days with less correlated movement.

Bitcoin’s inconsistent correlation with the S&P 500, with some days being highly correlated and some days being completely independent, suggest that its reaction function is still not fully understood. The common explanation that Bitcoin is a risk-off asset during periods of negative growth shocks is compelling and appears to fit some of the facts. The other commonly cited explanation is that fiat-based bills, debt servicing requirements, and margin calls combined with the de-risking of portfolios has led to a liquidity crisis, which in turn has contributed to the Bitcoin sell-off.

We examine an alternative explanation based on inflation expectations. Here we show the five year inflation expectations. Five years forward is a standard barometer of where market participants think inflation is heading in the long-term.

During normal times, we see inflation expectations well-anchored around the Fed’s two percent inflation mandate. But over the past week, inflation expectations have cratered as the economic impact of the coronavirus has been realized and as oil prices (a key determinant of headline inflation) have declined. This is happening despite unprecedented monetary policy stimulus by the Fed and most central banks around the world.

One of the main reasons why we are so interested in Bitcoin is because it is a store-of-value, especially in environments where there are high levels of inflation. Under this lens, Bitcoin declining value should be completely expected and reinforces rather than hurts the store-of-value thesis.

Despite the dreariness of global markets that continue to reel from the impacts of COVID-19, CMBI and Bletchley Indexes managed to claw back some of last week’s significant losses. The CMBI Bitcoin index was the strongest performer of the week, returning 11%, with the CMBI Ethereum Index experiencing the slowest recovery, only jumping 1%.

Despite Bitcoin’s strong performance, the Bletchley 40, small-cap assets was the best of the multi-asset indexes, demonstrating Bitcoin was an outlier among its large-cap peers.