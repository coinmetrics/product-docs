# Coin Metrics Prices Methodology

## Introduction

Coin Metrics publishes a collection of prices for a set of cryptocurrencies and fiat currencies consisting of the Coin Metrics Reference Rates (“CM Reference Rates”) and the Coin Metrics Principal Market Prices (“CM Principal Market Prices”), which are collectively referred to as the Coin Metrics Prices (“CM Prices”). This document describes the data inputs, calculation methodologies, and data exclusion rules for the CM Prices.

The CM Reference Rates are published once a day, once an hour, once a minute, once a second, and once every 200 milliseconds and utilize volume-weighted median, time-weighted average, and inverse price variance-weighted median techniques. Common use cases for the CM Reference Rates include research, backtesting, calculating net asset value for investment funds, serving as a data source for on-chain price oracles, risk management, and indicative intraday values.

The CM Principal Market Prices are published once a day, once an hour, once a minute, and once a second and adhere to the guidelines regarding fair value measurement issued by the International Financial Reporting Standards and the Association of International Certified Professional Accountants, specifically standards IFRS 13 and FASB ASC 820. The Principal Market Prices identify a principal market for each asset and utilize the most recent price from this market. Common use cases are for fair value measurement and preparing financial statements.

The CM Prices are designed to serve as a set of transparent and independent pricing sources that promote the functioning of efficient markets, reduce information asymmetries among market participants, facilitate trading in standardized contracts, and accelerate the adoption of cryptocurrencies as an asset class with the highest standards. The CM Prices are calculated using robust and resilient methodologies that are resistant to manipulation.

## Other Documents

The CM Prices are collectively governed by policies described in [Coin Metrics Prices Policies](https://docs.coinmetrics.io/market-data/methodologies/coin-metrics-prices-policies) which describes the administration, conflicts of interest, material changes, recalculations, internal controls, complaints, record retention, and compliance policies.

## Data Inputs

Coin Metrics evaluates markets traded on digital asset exchanges as input data sources for the CM Prices using a three step process. The first step relates to how to quantify an exchange’s trustworthiness to be used in subsequent steps. The second step relates to how to generate a universe of candidate constituent markets that are eligible for selection as constituent markets. The third step relates to how to select a unique set of high-quality constituent markets for each instrument.

Coin Metrics produces a unique set of selected markets for each asset in the coverage universe on a quarterly basis and during interim periods if market conditions warrant. Such market conditions include, but are not limited to, material changes in an exchange’s solvency risk, material changes in the degree of free capital flows in and out of an exchange, the presence of long-lasting price differences from other exchanges, and times of market stress.

### Trusted Exchange Framework

Trading in cryptocurrencies can occur at several hundred centralized or decentralized exchanges. The process of selecting constituent markets for calculating the price of a given cryptocurrency becomes highly challenging due to the large number of eligible exchanges. The difficulty is further compounded by the fact that some cryptocurrency exchanges engage in deceptive practices to manipulate their reported trading activity, such as facilitating or engaging in trades between the same party to artificially boost price, liquidity or interest (known as wash trading).

To address this issue, the CM Prices relies upon the Coin Metrics Trusted Exchange Framework to quantify the trustworthiness of an exchange. The Trusted Exchange Framework assesses exchanges using several criteria that represent the fundamental properties of exchange trustworthiness: transparency, resilience & security, data quality, regulatory compliance, and API quality. The criteria examine public information about an exchange such as incident history, financial statements, and license disclosure as well as market activity that can be derived from an exchange’s data.

The Coin Metrics Trusted Exchange Framework assigns a numerical rating ranging to an exchange for each category as well as an overall numerical rating for each exchange. The numerical rating ranges from 0.00 to 1.00. The numerical rating is transformed into a letter rating ranging from A to D. A letter rating of A indicates that the exchange excels in most or all of the factors assessed and a letter rating of D indicates that the exchange scores poorly across most of the factors assessed.

The CM Prices uses the overall numerical rating for each exchange in subsequent steps. If a centralized exchange is not evaluated in the Coin Metrics Trusted Exchange Framework, the numerical rating for the exchange defaults to 0.00. If a decentralized exchange is not evaluated in the Coin Metrics Trusted Exchange Framework, the numerical rating for the exchange defaults to 0.10.

### Generation of Candidate Markets

The set of candidate markets for each asset in the coverage universe is determined by the following set of rules:

1. If the asset is Bitcoin or Ethereum, the candidate markets are spot markets on Coin Metrics’ exchange coverage universe where the base asset is Bitcoin or Ethereum, respectively, and the quote asset is U.S. dollars.
2. If the asset is Tether or USD Coin, the candidate markets are (1) spot markets on Coin Metrics’ exchange coverage universe where the base asset is Tether or USD Coin, respectively, and the quote asset is U.S. dollars, and (2) spot markets on Coin Metrics’ exchange coverage universe where the base asset is Bitcoin or Ethereum and the quote asset is Tether or USD Coin, respectively. The logic to generate candidate markets for Tether differs from other assets because market convention sets Tether as the quote asset for the majority of active markets.
3. If the asset is a cryptocurrency that is not a stablecoin, the candidate markets are spot markets on Coin Metrics’ exchange coverage universe where the base asset is the given cryptocurrency and the quote asset is either U.S. dollars, Bitcoin, Ethereum, Tether, USD Coin, or Wrapped Ether.
4. If the asset is a stablecoin, the candidate markets are (1) spot markets on Coin Metrics’ exchange coverage universe where the base asset is the stablecoin and the quote asset is U.S. dollars, Tether, USD Coin, or Wrapped Ether and (2) spot markets on Coin Metrics’ exchange coverage universe where the base asset is Bitcoin or Ethereum and the quote asset is the stablecoin. The logic to generate candidate markets for stablecoins differs from other spot assets because market convention sets stablecoins as the quote asset for the majority of active markets. The following assets in the coverage universe are considered to be stablecoins:

| Name                    | Ticker |
| ----------------------- | ------ |
| Tether                  | usdt   |
| TrueUSD                 | tusd   |
| USD Coin                | usdc   |
| Paxos Standard          | pax    |
| Gemini Dollar           | gusd   |
| Wrapped Bitcoin         | wbtc   |
| Binance USD             | busd   |
| Dai                     | dai    |
| Tether Gold             | xaut   |
| PAX Gold                | paxg   |
| BIDR                    | bidr   |
| sUSD                    | susd   |
| Wrapped Ether           | weth   |
| Brazilian Digital Token | brz    |
| TerraClassicUSD         | ust    |
| USDD                    | usdd   |
| EURC                    | euroc  |
| poundtoken              | gbpt   |
| Terra 2.0               | luna2  |
| First Digital USD       | fdusd  |

1. If the asset is a fiat currency, the candidate markets are (1) spot markets on Coin Metrics’ exchange coverage universe where the base asset is the fiat currency and the quote asset is U.S. dollars, Tether, USD Coin, or Wrapped Ether and (2) spot markets on Coin Metrics’ exchange coverage universe where the base asset is Bitcoin or Ethereum and the quote asset is the fiat currency. The logic to generate candidate markets for fiat currencies differs from other spot assets because market convention sets fiat currencies as the quote asset for the majority of active markets. The following assets in the coverage universe are considered to be fiat currencies:

| Name              | Ticker |
| ----------------- | ------ |
| Euro              | eur    |
| British Pound     | gbp    |
| Japanese Yen      | jpy    |
| Canadian Dollar   | cad    |
| Korean won        | krw    |
| Russian Ruble     | rub    |
| Ukrainian Hryvnia | uah    |
| Turkish Lira      | try    |
| Australian Dollar | aud    |
| Brazilian Real    | brl    |
| Swiss Franc       | chf    |
| Singapore Dollar  | sgd    |

### Selection of Constituent Markets

For each asset in the coverage universe, a unique set of constituent markets are selected from the set of candidate markets. The set of constituent markets are determined by the following set of rules:

1. For each candidate market, calculate the average daily volume in U.S. dollars for the previous 90 days. If the constituent market is quoted in an asset other than U.S. dollars, the average daily volume is converted to U.S. dollars using the Coin Metrics Reference Rate.
2. If a candidate market is on a centralized exchange, exclude the candidate market if it has a volume market share of less than 1 percent, where the volume market share is calculated as the average daily volume in U.S. dollars described above.
3. If a candidate market is on a decentralized exchange, exclude the candidate market if it has a volume market of less than 5 percent, where the volume market share is calculated as the average daily volume in U.S. dollars described above.
4. For each candidate market, calculate the volume-weighted average price in U.S. dollars using the most recent 24 hour period beginning at 00:00:00.000000 UTC time and ending at 23:59:59.999999 UTC. If the constituent market is quoted in an asset other than U.S. dollars, the volume-weighted average price is converted to U.S. dollars using the Coin Metrics Reference Rate.
5. Exclude the candidate market if the absolute value of the volume-weighted average price in U.S. dollars exceeds 3 percent from the median volume-weighted average price in U.S. dollars, where the median is calculated using the volume-weighted average price in U.S. dollars for all candidate markets for the asset.
6. Sort the remaining candidate markets by quote asset using the following order: U.S. dollars, Bitcoin, Ethereum, USD Coin, Tether, Wrapped Ether. All other quote assets, if they exist, are sorted at the end. Within each grouping of quote asset, sort in descending order the candidate markets by each candidate market’s exchange score from the Coin Metrics Trusted Exchange Framework. If a given candidate market’s exchange is a decentralized exchange that is not covered in the Trusted Exchange Framework, the exchange score assigned to the decentralized exchange is 0.1. If a given candidate market’s exchange is not covered in the Trusted Exchange Frameowrk, the exchange score assigned to the exchange is 0.
7. Select a candidate market as a constituent market if the candidate market is ranked within the top six according to the sorting described above.
8. Also select a candidate market as a constituent market if the candidate market meets the following criteria: (1) the candidate market is ranked within the top 10 according to the sorting described above, and (2) the candidate market has a volume market share greater than 20 percent.
9. If the above rules result in zero constituent markets, then the constituent markets are selected using expert judgment.

## Reference Rates Calculation Methodology

The CM Reference Rates represent the reference rate of one unit of the asset quoted in U.S. dollars or other currency. The CM Reference Rates supports multiple frequencies. The daily and hourly frequencies utilize one calculation methodology and the minute, second, and 200 millisecond frequencies (“real-time frequencies”) utilize a separate calculation methodology. The daily and hourly frequencies are calculated at the end of every hour and day, respectively, (the “Calculation Time”) and are published within 5 minutes (the “Publication Time”). The real-time frequencies are published in real-time with no delay.

### Coverage Universe

The set of assets included in the CM Reference Rates coverage universe are included in Appendix A.

### Calculation Algorithm for Daily and Hourly Frequencies

The calculation algorithm of the CM Reference Rates for daily and hourly frequencies is described below.

1. All observable transactions from Constituent Markets are combined and partitioned into time intervals, with each time interval spanning a period of one minute. The first one-minute time interval begins 60 minutes before the Calculation Time and the last one-minute time interval begins at the Calculation and ends one minute after the Calculation Time. In total, the calculation period spans a period of 61 minutes (the “Observation Window”). A total of 61 one-minute time intervals are created.
2. The price of each observable transaction for one unit of the given asset is converted to U.S. dollars if necessary using the Reference Rates calculated for Bitcoin (BTC), Ethereum (ETH), USD Coin (USDC), or Tether (USDT).
3. The volume-weighted median price (VWMP) of each time interval is calculated. The volume-weighted median rate is calculated by ordering the transactions from lowest to highest price, taking the cumulative sum of volumes of these transactions, and identifying the price associated with the trades at the 50th percentile of volume measured in native units.
4. The time-weighted average price (TWAP) of the 61 time intervals is calculated using a custom weight function. The weight function assigns a weight of 0 percent to the first time interval, subsequent time intervals are assigned a weight that increases linearly, and the last two time intervals are assigned a weight of 5 percent such that the sum of all weights equals 100 percent. The weight function assigns more weight to time slices that are closer to the Calculation Time. The resulting figure is the published reference rate.

The weights for each time interval are listed in Appendix B:

### Data Contingency Rules for Daily and Hourly Frequencies

The following contingency rules are followed to address situations where data is delayed, missing, or unavailable due to periods of illiquidity, extraordinary market circumstances, or outside factors beyond the control of Coin Metrics.

1. If observable transactions from a constituent market are unable to be collected due to technical problems specific to the constituent market’s exchange during the calculation of a reference rate, the observable transactions from the constituent market are not included in the calculation of the specific instance of the given reference rate.
2. If no observable transactions from constituent markets occur during the first one-minute time interval, the next one-minute time interval’s volume-weighted median price is used as the volume-weighted median price. This contingency rule is applied recursively if necessary.
3. If no observable transactions from constituent markets occur during any one-minute time intervals, excluding the first and last one-minute time intervals in the Calculation Window, the next one-minute time interval’s volume-weighted median price is used as the volume-weighted median price. This contingency rule is applied recursively if necessary.
4. If no observable transactions from constituent markets occur during the last one-minute time interval, the previous time interval’s volume-weighted median price is used as the volume-weighted median price. This contingency rule is applied recursively if necessary.
5. If no observable transactions from constituent markets exist during the Calculation Period for a reference rate, the reference rate will be determined to equal the previous hourly reference rate in which there were trades during that hour’s Observation Window.

### Calculation Algorithm for Real-Time Frequencies

The calculation algorithm of the CM Reference Rates for the real-time frequencies is described below.

1. Collect all trades for the Constituent Markets over the previous 60 minutes. Sort the combined trade stream in ascending order of trade time. For each pair of consecutive trades, calculate the time difference (in seconds). The mean trade interval is the arithmetic mean of these time differences. Establish the active market cutoff by multiplying the mean trade interval by 100.
2. For each of the Constituent Markets, measure the elapsed time since its most recent trade relative to the calculation time. Exclude any venue whose “time-since-last-trade” exceeds the active market cutoff from the set of Constituent Markets. If every Constituent Market is filtered out, override the exclusion and treat Constituent Markets as active.
3. Calculate the volume denominated in units of the given asset from observable transactions that occurred over the trailing 60 minutes for each of the Constituent Markets. Calculate the volume weight for each of the Constituent Markets by dividing the volume figure for each of the Constituent Markets by the total volume across all Constituent Markets. The resulting figure is referred to as the volume weight.
4. Convert the trade price of all observable transactions over the trailing 60 minutes for each of the Constituent Markets to U.S. dollars if necessary using the Real-Time Reference Rate calculated for Bitcoin (BTC), Ethereum (ETH), USD Coin (USDC), or Tether (USDT). Calculate the inverse variance of the trade price converted to U.S. dollars for each of the Constituent Markets using the population mean in the calculation of variance, where the population mean is defined as the mean price of all trades from Constituent Markets over the trailing 60 minutes. If a Constituent Market has an infinite or undefined inverse price variance, the inverse price variance for that Constituent Market is set to zero. For each Constituent Market, count the distinct minutes within the last 60 that contained at least one trade and divide this count by 60 to derive the inverse variance scaling factor, and multiply the market’s raw inverse variance by that factor to obtain its scaled inverse variance. Calculate the inverse price variance weight for each of the Constituent Markets by dividing the scaled inverse price variance by the total scaled inverse price variance across all Constituent Markets. The resulting figure is referred to as the inverse price variance weight.
5. Calculate the final weight for each of the Constituent Markets by taking a mean of the volume weight and the inverse price variance weight.
6. Extract the most recent observable transaction from each of the Constituent Markets. Convert the trade price of the most recent observable transactions to U.S. dollars if necessary using the Reference Rate calculated for Bitcoin (BTC), Ethereum (ETH), USD Coin (USDC), or Tether (USDT).
7. Calculate the weighted median price of the most recent observable transactions using the prices calculated in step 4 and the final weights calculated in step 3. The weighted median price is calculated by ordering the transactions from lowest to highest price, and identifying the price associated with the trades at the 50th percentile of final weight. The resulting figure is the published reference rate for the given asset.

### Data Contingency Rules for Real-Time Frequencies

The following contingency rules are followed to address situations where data is delayed, missing, or unavailable due to periods of illiquidity, extraordinary market circumstances, or outside factors beyond the control of Coin Metrics.

1. If observable transactions from a constituent market are unable to be collected due to technical problems specific to the constituent market’s exchange during the calculation of a real-time reference rate, the observable transactions from the constituent market are not included in the calculation of the specific instance of the given real-time reference rate.
2. If no observable transactions from constituent markets exist during the trailing 60 minutes, the value of the real-time reference rate will be determined to equal the value calculated during the previous second.

## Principal Market Prices Calculation Methodology

The Principal Market Prices are published once per second, every day of the year, and represent the price of one unit of the asset quoted in U.S. dollars.

### Fair Market Valuation Background

The Principal Market Prices were developed taking into account the requirements of IFRS 13 and FASB ASC 820 accounting guidelines defining what a Principal Market is and how it should be selected. These guidelines also allow for additional controls to verify the market is active and trades are orderly.

As Coin Metrics already provides the CM Reference Rates methodology to price cryptocurrencies which we believe to be robust and stable, it is worth briefly describing the philosophy behind producing the Principal Market Prices to supplement the reference rates. The first and most significant criteria is that certain regulatory agencies require a methodology consistent with the aforementioned accounting principles. These principles clearly describe the preferred “fair market value” calculation as one which identifies a Principal Market by trade volume and tracks executed trades in that market.

Beyond external requirements, the benefits for a Principal Market Prices methodology are that it is clearly defined and auditable. The price is always taken from a single market, which tends to remain constant, and can easily be traced and verified for a given time stamp. We minimize computations being done on the price, which reduces the likelihood of unforeseen behavior. Additionally, the trades are always taken from the exchange where the most of the activity occurs, which is a characteristic users are interested in.

Like all things in life, this comes with some trade offs. Our CM Reference Rates look for a central tendency among several markets. In some cases this can avoid volatility and the presence of outliers if the Principal Market Prices deviate from the global average, but it also means that the final price may be taken from comparatively insignificant market where the price is between the prices of markets of larger volume. With these trade-offs in mind, our methodology seeks to err on the side of trusting the largest market by volume of trades and only excludes a market in extreme situations.

We also attempt to avoid numerical comparisons of the price between markets in the methodology, in order to minimize the possibility that a price anomaly in another market could affect the calculation. Our CM Reference Rates by contrast choose to combine multiple markets to identify a more stable price representative of the global environment.

### Coverage Universe

The set of assets included in the Principal Market Prices coverage universe are included in Appendix A.

### Calculation Algorithm

The calculation algorithm of the Principal Market Prices is described below.

1. Consider the list of Constituent Markets selected by the Market Selection Framework.
2. Identify any inactive markets, and exclude all trades associated with the inactive market. A market is considered inactive if it meets the following conditions: (1) The last trade was more than 1-minute ago and the last trade was either: longer than 10 minutes from the calculation time or longer than 100 \* \[mean trade interval], (2) The mean trade interval is defined as the the average of all intervals between sequential trades in the window 0 to 60 minutes before the calculation time. For example, if trades occur at timestamps `[00:02, 00:12, 00:37, 01:15]`, the mean trade interval will be `mean([10 seconds, 25 seconds, 38 seconds]) = 23.3 seconds`.
3. If there are no active markets, then the Principal Market Price will forward-fill the last non-null value available.
4. Check if any trades in the markets are not considered orderly (IFRS 13.B37-B38). Exclude any non-orderly trades from the calculation. This is accomplished by examining the window 60 to 120 minutes before the calculation time to calculate a reference standard deviation of prices in each market separately. If there are insufficient trades to calculate a standard deviation, then all trades are considered orderly (i.e. no trades are dropped if there is sparse data).
5. We then partition the calculation window 0 to 60 minutes before the calculation time into 60 one-minute time intervals and calculate how far each trade is from the mean price of trades from that market in the one-minute time interval the trade resides in.
6. Finally, we exclude trades that occur more than three reference standard deviations from the mean price of trades within a particular one-minute time interval. We require at least five trades occur in a particular one-minute time interval in order to exclude trades. The two parameters (3 reference deviations and 5 trades) may be adjusted in the future.
7. Identify the active market with the largest volume of orderly trades in the calculation window 0 to 60 minutes before the calculation time. This will serve as the Principal Market (IFRS 13.16, FASB ASC 820-35-5).
8. Use the most recent orderly trade from the Principal Market and publish its price as the Principal Market Price.

## Data Exclusion Rules

All observable transactions from constituent markets are evaluated using a systematic data quality control process. If potential errors or anomalies in the data are detected, the exercise of expert judgment will be applied to determine if the potentially erroneous data is included in the calculation of the price. The exercise of expert judgment in this circumstance is used to determine if the potentially erroneous data reflects observable transactions that are entered into at arm’s length between buyers and sellers and constitute an active market in the underlying asset, whether the observable transactions in question are formed by the competitive forces of supply and demand, and whether the observable transactions in question are a credible indicator of executable prices in the underlying asset. The exercise of expert judgment may include adding or removing markets from the set of constituent markets for a particular asset.

An investigation into the causes of the potential error, including whether any price deviations are specific to the exchange itself, is conducted. Any exercise of expert judgment is subject to dual approval by staff members, and is logged and reported to the Oversight Committee which periodically reviews the application of expert judgment to ensure consistency.

## Appendix A

The coverage universe can be accessed from our [Coin Metrics Coverage](https://coverage.coinmetrics.io/asset-metrics-v2/ReferenceRate).

## Appendix B

The following table lists the weights applied to each one-minute time interval described in Section 5.4 Calculation Algorithm.

| Time Interval | Weight   |
| ------------- | -------- |
| 0             | 0.000000 |
| 1             | 0.000526 |
| 2             | 0.001052 |
| 3             | 0.001578 |
| 4             | 0.002104 |
| 5             | 0.002630 |
| 6             | 0.003156 |
| 7             | 0.003682 |
| 8             | 0.004208 |
| 9             | 0.004734 |
| 10            | 0.005260 |
| 11            | 0.005786 |
| 12            | 0.006312 |
| 13            | 0.006838 |
| 14            | 0.007364 |
| 15            | 0.007890 |
| 16            | 0.008416 |
| 17            | 0.008942 |
| 18            | 0.009468 |
| 19            | 0.009994 |
| 20            | 0.010520 |
| 21            | 0.011046 |
| 22            | 0.011572 |
| 23            | 0.012098 |
| 24            | 0.012624 |
| 25            | 0.013150 |
| 26            | 0.013676 |
| 27            | 0.014202 |
| 28            | 0.014728 |
| 29            | 0.015254 |
| 30            | 0.015780 |
| 31            | 0.016306 |
| 32            | 0.016832 |
| 33            | 0.017358 |
| 34            | 0.017884 |
| 35            | 0.018410 |
| 36            | 0.018936 |
| 37            | 0.019462 |
| 38            | 0.019988 |
| 39            | 0.020514 |
| 40            | 0.021040 |
| 41            | 0.021566 |
| 42            | 0.022092 |
| 43            | 0.022618 |
| 44            | 0.023144 |
| 45            | 0.023670 |
| 46            | 0.024196 |
| 47            | 0.024722 |
| 48            | 0.025248 |
| 49            | 0.025774 |
| 50            | 0.026300 |
| 51            | 0.026826 |
| 52            | 0.027352 |
| 53            | 0.027878 |
| 54            | 0.028404 |
| 55            | 0.028930 |
| 56            | 0.029456 |
| 57            | 0.029982 |
| 58            | 0.030508 |
| 59            | 0.050000 |
| 60            | 0.050000 |

## Change Log

1. **Version 1.20 on August 7, 2025:** The coverage universe is expanded to include the following assets: `tree`, `sahara`, `newt`, `resolv`, `home`, `huma`, `soph`, `frag`, `icnt`, `dmc`, `h`, `asrr`, `bdxn`, `elde`, `lava_lavanetwork`, `pfvs`, `skate`, `asp`, `blum`, `edgen`, `tanssi`, `usdg`, `tac`, `b`, `cross`, `velvet`, `myx`, `useless`, `pumpbtc`, `bulla`, `cudis`. The following assets are terminated from the coverage universe: `kai`, `lmr`, `wolf`, `dsla`, `nest`, `fsn`, `beta`, `auto`, `zkf`, `dechat`, `conv`, `ooki`, `usdm`, `fly`, `asto`, `bbf`, `store`.
2. **Version 1.19 on July 11, 2025:** The coverage universe is expanded to include the following assets: `m`, `ain`, `agt`. The following assets are terminated from the coverage universe: `euroc`, `stpt`, `npt`, `asd`, `rbn`, `mta`, `orc`, `bcd`, `nom`, `lith`, `angle`, `param`, `n3`, `pumlx`, `smt`.
3. **Version 1.18 on June 25, 2025:** The coverage universe is expanded to include the following assets: `spk`, `nxpc`, `la`, `eurq`, `eurr`, `tgt`, `lofi`, `mat`, `launchcoin`, `prai`, `mgo`. The following assets are terminated from the coverage universe: `kuji`, `gft`, `mcb`, `prq`, `bcn`, `mnw`, `anc`, `srk`, `dx`, `btm`, `uft`, `lina`, `cvp`, `bitci`, `vite`, `sos`, `sswp`, `thg`, `vega`, `snm`, `kono`, `bbl`, `combo`, `lamb`, `social`, `ez`, `mim`, `lends`, `berry`, `drep`, `lba`, `lym`, `ocn`, `pay`, `prmx`, `ranker`, `suia`, `umee`, `xwg`, `com`.
4. **Version 1.17 on May 29, 2025:** The coverage universe is expanded to include the following assets: `init`, `a`, `haedal`, `sign`, `usd1`, `dood`, `milk`, `shm`, `obol`, `b2`, `gork`, `house`, `troll`, `aiot`. The following assets are terminated from the coverage universe: `o3`, `dar`, `gyen`, `sfi`, `wsm`, `avg`, `insur`, `gm`, `vela`, `orn`, `ecox`, `psl`.
5. **Version 1.16 on May 13, 2025:** The coverage universe is expanded to include the following assets: `red`, `wct`, `kernel`, `bmt`, `baby`, `parti`, `gun`, `prompt`, `b3`, `mubarak`, `nil`, `hyper`, `epic`, `zora`, `wal`, `tut`, `sto`, `shell`, `hei`, `clanker`, `elx`, `ept`, `fhe`, `lvva`, `tst_test`, `edge`, `usdq`, `usdr`, `avl`, `br`, `fluid`, `g7`, `kilo`, `roam`, `jellyjelly`, `anlog`, `dark`, `ghibli`, `jailstool`, `keycat`, `doginme`, `xusd`, `jitosol`, `siren`, `bank`, `bid`, `rfc`, `skyai`, `paws`, `mint`, `oik`, `pain`, `pell`, `imt`, `sky_sky`, `usds`, `geod`, `strx`, `dolo`, `sxt`. The following assets are terminated from the coverage universe: `hegic`, `aury`, `abbc`, `soon`, `akro`, `jet`, `solve`, `cvt`, `wom_wombatexchange`, `astro`, `vib`, `pbr`, `tulip`, `kok`, `AUSD`, `rcn_ripiocreditnetwork`, `mean`, `media`, `smr`, `ngl_entangle`, `etp`, `hc_hypercash`, `unb`.
6. **Version 1.15 on March 26, 2025:** The coverage universe is expanded to include the following assets: `vine`, `solv`, `vvv`, `plume`, `gps`, `obt`, `j`, `duck`, `form`, `hat`, `nc`, `lseth`, `spurs`, `pi`, `mengo`, `milo`, `polydoge`, `runecoin`, `sswp`, `tra`, `1000sats`, `bnsol`, `wbeth`, `euri`, `aeur`, `bananas31`, `seraph`, `bgsc`, `clay`, `apx`, `tremp`, `aipump`, `n3`, `soso`, `yuli`, `treat`, `bera`, `kaito`, `ip`, `cbbtc`. The following assets are terminated from the coverage universe: `bnx`, `wzrd_bitcoinwizards`, `slnd`, `vchf`, `sdao`, `veur`, `lbl`, `strp`, `nord`, `dpx`, `mda`, `iht`, `nexg`, `next`, `toms`, `open`, `swrv`.
7. **Version 1.14 on January 23, 2025:** The coverage universe is expanded to include the following assets: `aixbt`, `pengu`, `s`, `bio`, `vana`, `f`, `sonic`, `syrup`, `major`, `d`, `gomining`, `peaq`, `alch`, `bubble`, `cats`, `hpos10i`, `mnry`, `moz`, `ol`, `pip`, `smile`, `stream`, `xion`, `xter`, `lyx`, `teva`, `alu`, `avaai`, `blue`, `griffain`, `kima`, `swarms`, `uro`, `wmtx`, `koma`, `the`, `cheems`, `gme`, `flock`, `rex`, `hsk`, `buzz`, `send`, `fuel_fuelnetwork`, `gear`, `wolf_landwolf0x67`, `moodengeth`, `apepe`, `barsik`, `bendog`, `catdog`, `duko`, `peng`, `scihub`, `daddy`, `eliza_elizaai16zeliza`, `happy`, `fred`, `grok`, `goats`, `island`, `lingo`, `monky`, `pippin`, `taocat`, `u2u`, `deai`, `over`, `phil`, `soon`, `gems`, `kekius`, `power`, `neiro_neirolol`. The following assets are terminated from the coverage universe: `tribl`, `vsp`, `orb`, `mco2`, `maps`, `rfuel`, `perl`, `dyp`, `tapt`, `tryb`, `maid`, `tct`, `indi`, `fuel`.
8. **Version 1.13 on January 16, 2025:** Implemented improvements to the Reference Rates Calculation Algorithm for Real-Time Frequencies. The new methodology implements a check for active markets to more rapidly exclude markets that have become inactive. It also implements a modified weighting applied to the inverse price volatility to counteract situations where illiquid markets receive a large inverse volatility weight because their trades are all clustered around the same time.&#x20;
9. **Version 1.12 on December 12, 2024:** The coverage universe is expanded to include the following assets: `me`, `pnut`, `move`, `grass`, `zrc`, `swell`, `virtual`, `ban`, `chillguy`, `luce`, `memefi`, `rifsol`, `btf`, `tai`, `billy`, `fwog`, `eurc`, `cook`, `ns`, `morpho`, `solvbtc`, `lbtc`, `islm`, `snek`, `act`, `dogegov`, `zerebro`, `usual`, `pork`, `mumu`, `fartcoin`, `jet`, `toshi`, `niko`, `velo_velodromefinance`, `supra`. The following assets are terminated from the coverage universe: `upp`, `breed`, `dock`, `pdt`, `xcur`, `klay`, `qash`, `nas`.
10. **Version 1.11 on November 6, 2024:** The coverage universe is expanded to include the following assets: `kaia`, `scr`, `hmstr`, `cati`, `dbr`, `neirocto`, `puffer`, `carv`, `bbl`, `bcut`, `cloud`, `gtai`, `moca`, `x`, `goat`, `lumia`, `honey`, `dapp`, `deep`, `mak`, `nibi`, `social`, `xzk`, `beer`, `cho`, `egp`, `hippo`, `logx`, `omnia`, `wat`, `cow`, `fb`, `aleo`, `paal`, `giga`, `spx`, `moodeng`, `osak`, `pepecoin`, `retardio`, `npc`. The following assets are terminated from the coverage universe: `cudos`, `wmt`, `ant`, `usdv`, `qrdo`, `ogv`, `xdefi`, `nftx`, `wicc`, `yld`, `klay`, `nii`.
11. **Version 1.10 on September 17, 2024:** The coverage universe is expanded to include the following assets: `dogs`, `cxt`, `l3`, `lrds`, `neiroeth`, `sundog`, `xr`, `slf`, `vara`, `pixfi`, `cat`, `max`, `synt`, `dog`, `mother`, `order`, `miggles`, `ethx`, `ohm_2`. The following assets are terminated from the coverage universe: `fnsa`, `front`, `crpt`, `cmp`, `zkx`.
12. **Version 1.9 on August 2, 2024:** The coverage universe is expanded to include the following assets: `blast`, `ath`, `banana`, `zkj`, `pirate`, `dop`, `mon`, `nrn`, `lista`, `g`, `ccd`, `zkx`, `cookie`, `kmno`, `tst`, `zero`, `zex`, `csix`, `uxlink`, `avail`, `zkl`, `alt_aptoslaunchtoken`, `ftn`, `apu`, `a8`, `caw`, `gho`, `reth`, `sdai`, `stone_eth`, `zbu`, `wolf`, `why`, `ultima`, `uds`, `smt`, `qubic`, `peipei`, `kuji`, `gpu`, `cheel`, `bobo`, `bmx`, `apex`, `andy_eth`, `usd0`. The following assets are terminated from the coverage universe: `noia`, `rfox`, `play`, `agix`, `act`, `stsol`.
13. **Version 1.8 on June 14, 2024:** The coverage universe is expanded to include the following assets: `tnsr`, `safe`, `not`, `alt`, `prcl`, `wen`, `bb`, `drift`, `taiko`, `zbcn`, `degen`, `merl`, `zeus`, `rez`, `karrat`, `spec`, `cta`, `foxy`, `masa`, `mfer`, `mog`, `nyan`, `pbux`, `sca`, `ulti`, `zent`, `maneki`, `open`, `msn`, `saga`, `shdw`, `seam`, `mode`, `velar`, `truf`, `brawl`, `brett`, `ese`, `g3`, `hlg`, `ll`, `nlk`, `param`, `ponke`, `sqd`, `zerc`, `fury`, `mapo`, `nexg`, `pit`, `wsdm`, `rio`, `pundu`, `popcat`, `acx`, `ageur`, `alex`, `hpos10i_eth`, `cbeth`, `eeth`, `frxeth`, `fud`, `gui`, `inter`, `ita`, `mean`, `meth`, `omi`, `por`, `pufeth`, `pxeth`, `render`, `rseth`, `rsweth`, `sauce`, `seiyan`, `slnd`, `strd`, `stsol`, `susde`, `sweth`, `thg`, `thl`, `usde`, `usdm`, `usdv`, `usdy`, `vchf`, `veur`, `friend`, `boden`, `slerf`, `crvusd`. The following assets are terminated from the coverage universe: `gf`, `pla`, `cre`, `hbtc`, `derc`, `bidr`, `wtc`, `clo`, `gbpt`, `rub`, `bix`.
14. **Version 1.7 on April 17, 2024:** The coverage universe is expanded to include the following assets: `ethfi`, `aevo`, `w`, `zk`, `ena`, `aero`, `mobile`, `dechat`, `venom`, `sln`, `pda`, `mpc`, `aeg`, `gmrx`, `ngl_entangle`, `qorpo`, `sqr`, `sqt`, `mew`, `pandora`, `smole`, `omni`, `slerf`, `agi_delysium`. The following assets are terminated from the coverage universe: `zbc`, `octo.`
15. **Version 1.6 on March 28, 2024:** Added clarifying language on how candidate markets are selected. The coverage universe is expanded to include the following assets: `zeta`, `htx`, `mavia`, `dmail`, `defi`, `far`, `lends`, `aitech`, `ice_icenetwork`, `navx`, `bome`, `planet`, `weeth`, `nos`. The following assets are terminated from the coverage universe: `ssx`, `rev`, `pla`.
16. **Version 1.5 on March 8, 2024:** The coverage universe is expanded to include the following assets: `jup` `wif` `ondo` `arty` `pixel` `nfp` `portal` `coq` `flip` `myro` `vrtx` `ace_fusionist` `app` `rats` `root` `rpk` `saros` `shrap` `zkf` `ai_sleeplessai` `com` `insp` `pepe2` `port3` `token` `zig` `1cat` `dyp_new` `mubi` `turt` `analos` `tao_bittensor` `silly` `sols` `dym`. The following assets are terminated from the coverage universe: `quick`, `phnx`.
17. **Version 1.4 on January 25, 2024:** The coverage universe is expanded to include the following assets: `pyusd`, `pyth`, `xai`, `beamx`, `sats`, `vic`, `hopr`, `borg`, `cbk`, `dck`, `combo`, `xsgd`, `dimo`, `hunt`, `manta`, `mvl`, `dext`, `gog`, `moc`, `upp`, `bzz`, `mix`, `bax`, `layer`, `gene`, `pbx`, `phnx`, `hapi`, `idea`, `lmr`, `maha`, `nord`, `srk`, `jto`, `vext`, `vanry`. The following assets are terminated from the coverage universe: `zks`, `ice`, `jet`, `srn`, `cover`, `saitama`.
18. **Version 1.3 on December 13, 2023:** Modify data inputs section to remove usage of Market Selection Framework and replace it with the Trusted Exchange Framework. Modify logic used to generate candidate markets and select constituent markets. The coverage universe is expanded to include the following assets: `ace`, `act`, `insur`, `ngc`, `wild`, `ctx`, `cre`, `clo`, `unb`, `meme`, `like`, `rfox`, `roobee`, `play`, `nwc`, `bepro`, `weth`, `mcb`, `mlk`, `pol`, `trade`, `ufo`, `rfuel`, `hyve`, `hydra`, `okt`, `hbtc`, `aqt`, `bondly`, `muse`, `orai`, `pando`, `pbr`, `dsla`, `kono`, `psl`, `xcur`, `isp`, `stnd`, `caps`, `crts`, `derc`, `epik`, `gmee`, `orc`, `png`, `route`, `sdao`, `slim`, `xava`, `yld`, `zcx`, `blok`, `eqx`, `leash`, `naka`, `opul`, `vega`, `xwg`, `cere`, `jet`, `o3`, `shill`, `ads`, `next`, `trvl`, `wsteth`, `lat`, `deso`, `wlkn`, `bnc`, `pdt`, `bbf`, `cweb`, `lbl`, `npt`, `xpla`, `arg`, `mine`, `fwb`, `swise`, `dmtr`, `ageur_eth`, `nom`, `waxl`, `brwl`, `push`, `azero`, `azy`, `boring`, `cmp`, `cwar`, `dome`, `ertha`, `goal`, `kicks`, `mcrt`, `mnw`, `ngl`, `nodl`, `ogv`, `ole`, `orb`, `pokt`, `pumlx`, `ranker`, `skeb`, `sps`, `store`, `vr`, `well`, `wwy`, `xdefi`, `bdx`, `fnsa`, `fuse`, `izi`, `karate`, `myria`, `suia`, `tama`, `toms`, `vvs`, `wifi`, `wmt`, `lbr`, `unibot`, `fdusd`, `wom_wombatexchange`, `ordi`, `moon`, `bigtime`, `brick`, `cyber`, `lmwr`, `mbx`, `ntrn`, `tia`, `wsm`, `zelix`, `ztx_ztx`. The following assets are terminated from the coverage universe: `tomo`, `efi`, `ddx`, `cra`, `onston`, `sdl`, `mona`, `ignis`, `vtc`, `rdd`, `nxt`.
19. **Version 1.2 on November 8, 2023:** Removes language around policies and oversight which are contained in the Coin Metrics Prices Policies.
20. **Version 1.1 on August 15, 2023**: The coverage universe is expanded to include the following assets: `ali`, `dep`, `hotcross`, `tlos`, `cfg`, `lith`, `sfund`, `dose`, `num`, `sis`, `jam_geojam`, `mv`, `mplx`, `sidus`, `acs`, `blur`, `arb`, `snm`, `fuel`, `tct`, `edu`, `bob`, `mnt`, `ron`, `cos`, `perl`, `troy`, `vidt`, `wom`, `brz`, `fio`, `mtr`, `mtrg`, `solo`, `spa`, `xpr`, `df`, `burger`, `nbs`, `hard`, `cover`, `vai`, `ez`, `ousd`, `iag`, `mngo`, `wing`, `aury`, `gofx`, `ice`, `pendle`, `xrd`, `id`, `mbs`, `umee`, `tko`, `uft`, `radar`, `mnde`, `xen`, `vinu`, `volt`, `prmx`, `myth`, `bone`, `brise`, `gft`, `gns`, `prime`, `rdnt`, `agix`, `xeta`, `igu`, `kcal`, `movez`, `rss3`, `grail`, `strm`, `lai`, `pepe`, `aidoge`, `astra`, `canto`, `cetus`, `cgpt`, `kas`, `ladys`, `mong`, `squad`, `sui`, `tenet`, `tomi`, `turbo`, `turbos`, `wojak`, `combo_combo`, `mav`, `rlb`, `tapt`, `hades`, `smr`, `vela`, `bgb`, `quick_new`, `arkm`, `wld`, `neon`, `sei`. The following assets are terminated from the coverage universe: `nu`, `usdk`, `chat`, `cmt`, `mof`, `inx`, `qlc`, `renbtc`, `dta`, `hkd`, `cocos`, `rsv`, `xhv`, `nrg`, `aoa`, `seele`, `ohm`, `tnb`, `path`, `ncash`, `hades`.
21. **Version 1.0 on March 16, 2023**: Initial publication of Coin Metrics Pricing Methodology. Previous versions of this document were contained in our Market Selection Framework, Hourly Reference Rates Methodology, Real-Time Reference Rates Methodology, and Principal Mark Price Methodology. Those four documents are now consolidated into the Coin Metrics Pricing Methodology. The coverage universe is expanded to include the following assets: `bonk`, `cusd`, `cra`, `jewel`, `apt`, `asto`, `aurora`, `avg`, `axl`, `bld`, `breed`, `ceur`, `cpool`, `ecox`, `evmos`, `flx`, `fly`, `fort`, `gf`, `index`, `indi`, `inx`, `multi`, `path`, `rpl`, `rsv`, `sd`, `sdl`, `tbtc`, `tribl`, `gmx`, `bifi_beef`, `dpx`, `boo`, `beth`, `magic`, `juno`, `port`, `phb`, `kishu`, `lever`, `flr`, `hft`, `porto`, `polyx`, `lazio`, `atm`, `acm`, `xcad`, `ssv`, `pros`, `rei`, `qlc`, `dego`, `vite`, `firo`, `iq`, `bar`, `og`, `hifi`, `asr`, `dyp`, `time`, `sylo`, `polc`, `bitci`, `fct2`, `onston`, `vsp`, `afc`, `bsw`, `epx`, `xno`, `dexe`, `core`, `vemp`, `cult`, `saitama`, `ever`, `babydoge`, `dc`, `kar`, `fsn`, `hero`, `oas`, `hook`, `cocos`. The following assets are terminated from the coverage universe: `mft`, `hpt`, `hxro`, `usdn`, `aion`.
22. **Coin Metrics Real-Time Reference Rates Methodology Version 0.15 on February 9, 2023**: Added a 200 milliseconds publication frequency.
23. **Coin Metrics Hourly Reference Rates Methodology Version 2.13 and Coin Metrics Real-Time Reference Rates Methodology Version 0.14 on September 21, 2022**: The coverage universe is expanded to include the following assets: `loka`, `mc`, `polis`, `sgb`, `steth`, `frax`, `rai`, `lusd` , `dfi`, `gbpt`, `ooki`, `fis`, `nest`, `drep`, `math`, `aleph`, `media`, `luna2`, `t`, `ethw`, `bttc`, `vra`, `swftc`, `raca`, `pyr`, `mbox`, `sweat`, `fitfi`, `qrdo`, `wemix`, `zbc`, `psg`, `voxel`, `chess`, `prq`, `gari`, `nym`, `arv`, `cudos`, `efi`, `for`, `juv`, `cvp`, `mbl`, `auto`, `eden`, `xcn`, `kai`, `velo`, `akt`, `berry`, `klv`, `kok`, `senso`, `floki`, `sdn`, `alpine`, `step`, `eurt`, `bfc`, `toke`, `shping`, `oxy`, `ssx`, `lit`, `conv`. The publication of reference rates is terminated for the following assets: `ramp`, `grs`, `ppt`, `nav`, `itc`, `qc`, `meta`, `cope`, `zb`. Minor changes to internal audit section.
24. **Coin Metrics Hourly Reference Rates Methodology Version 2.12 and Coin Metrics Real-Time Reference Rates Methodology Version 0.13 on July 1, 2022**: The coverage universe is expanded to include the following assets: `fei`, `op`, `usdd`, `xch`, `gmt`, `bico`, `ctk`, `flm`, `sfp`, `starl`, `glmr`, `tulip`, `astro`, `sfi`, `gst`, `mob`, `bit`, `vgx`, `auction`, `pundix`, `stg`, `ata`, `bel`, `dar`, `gal`, `astr`, `cqt`, `cspr`, `metis`, `boba`, `twt`, `aca`, `dao`, `xprt`, `cube`. The publication of reference rates is terminated for the following assets: `gxs`, `dgtx`, `wluna`, `dgd`, `foam`, `csp`, `cnn`, `bft`.
25. **Market Selection Framework Version 1.0.2 on February 15, 2022**: The selection algorithm was modified so that any market with volume, measured in U.S. dollars over the past 90 days, of less than 5 percent of the volume of the selected market with the largest volume is excluded.
26. **Coin Metrics Hourly Reference Rates Methodology Version 2.11 and Coin Metrics Real-Time Reference Rates Methodology Version 0.12 on February 15, 2022**: The coverage universe is expanded to include the following assets: `xec`, `kda`, `mina`, `xdc`, `elon`, `flux`, `movr`, `ceek`, `win_wink`, `dvi`, `dusk`, `asd`, `gala`, `spell`, `ens`, `tru`, `alcx`, `clv`, `imx`, `agld`, `jasmy`, `farm`, `alice`, `chr`, `dydx`, `tlm`, `mdt`, `gtc`, `sun`, `c98`, `people`, `lina`, `rndr`, `ach`, `super`, `mask`, `quick`, `arpa`, `qi`, `idex`, `rad`, `bond`, `mir`, `joe`, `gods`, `front`, `pla`, `orn`, `ramp`, `rgt`, `fida`, `forth`, `tribe`, `wluna`, `coval`, `rbn`, `lcx`, `asm`, `ddx`, `suku`, `krl`, `rari`, `mco2`, `gyen`, `btrst`, `api3`, `rly`, `wcfg`, `musd`, `ilv`, `atlas`, `usdp`, `joe`, `ldo`, `cvx`, `fxs`, `kp3r`, `alpaca`, `bnx`, `boson`, `dora`, `ghst`, `nft`, `ohm`, `om`, `pond`, `rare`, `revv`, `stpt`, `torn`, `tvk`, `wncg`, `xym`, `ygg`. The publication of reference rates is terminated for the following assets: `hedg`, `eurs`, `bzrx`, `poa`, `wpr`, `dmg`, `cdt`, `phx`, `appc`, `btt`, `idrt`, `rdn`, `via`, `evx`. The section “Data Inputs”, subsections “Other Cryptocurrencies Excluding Stablecoins” and “Stablecoins”, was modified to consider markets quoted in USD Coin or Tether to serve as constituent markets. The constituent markets for all assets in the coverage universe are updated. The constituent markets for all assets in the coverage universe are updated.
27. **Coin Metrics Hourly Reference Rates Methodology Version 2.10 and Coin Metrics Real-Time Reference Rates Methodology Version 0.11 on September 28, 2021**: The coverage universe is expanded to include the following assets: `amp`, `axs`, `shib`, `audio`, `bake`, `med`, `dag`, `slp`, `xdb`. The publication of reference rates is terminated for the following assets: `agi` ,`btmx`, `dgx`, `ethos`, `mco`, `sngls`, `cpay`, `eng`, `lun`, `pnt`. The constituent markets for all assets in the coverage universe are updated.
28. **Coin Metrics Hourly Reference Rates Methodology Version 2.9 and Coin Metrics Real-Time Reference Rates Methodology Version 0.10 on May 27, 2021**: The coverage universe is expanded to include the following assets: `icp`, `cope`, `maps`, `btcst`, `ctsi`, `erg`, `woo`, `prom`, `strax`, `usdn`, `cfx`, `mdx`, `nkn`, `sand`, `fx`, `pha`. The publication of reference rates is terminated for the following assets: `tnt`, `npxs`, `zar`. The constituent markets for all assets in the coverage universe are updated.
29. **Coin Metrics Hourly Reference Rates Methodology Version 2.8 and Coin Metrics Real-Time Reference Rates Methodology Version 0.9 on April 25, 2021**: The methodology was modified to add fiat currencies to the coverage universe. The coverage universe is expanded to include the following assets: `eur`, `krw`, `gbp`, `jpy`, `aud`, `try`, `brl`, `rub`, `sgd`, `bidr`, `ngn`, `cad`, `chf`, `zar`, `idrt`, `hkd`, `uah`, `qc`, `klay`, `cake`, `btmx`, `flow`, `zks`, `stmx`, `skl`, `reef`, `dodo`, `coti`, `bora`, `cream`, `ray`, `tryb`, `rook`. The publication of reference rates is terminated for the following assets: `xzc`, `bcpt`, `yamv2`, `xns`, `tmtg`, `kp3r`.
30. **Coin Metrics Hourly Reference Rates Methodology Version 2.7 and Coin Metrics Real-Time Reference Rates Methodology Version 0.8 on February 23, 2021**: The coverage universe is expanded to include the following assets: `1inch`, `alpha`, `octo`, `perp`, `scrt`, `grt`, `keep`, `xvs`, `nu`, `tel`, `badger`.
31. **Coin Metrics Hourly Reference Rates Methodology Version 2.6 and Coin Metrics Real-Time Reference Rates Methodology Version 0.7 on January 26, 2021**: The coverage universe is expanded to include the following assets: `susd`, `pols`, `ust`, `lto`, `swap`, `nim,` `lbc`, `mta`, `kp3r`, `glm`, `near`, `noia`, `rose`, `inj`. The publication of reference rates is terminated for the following assets: `gnt`, `fxc`, `bht`, `cmct`, `strat`, `loki`. The constituent markets for all assets in the coverage universe are updated.
32. **Coin Metrics Hourly Reference Rates Methodology Version 2.5 and Coin Metrics Real-Time Reference Rates Methodology Version 0.6 on November 5, 2020**: The coverage universe is expanded to include the following assets: `akro`, `ampl`, `ar`, `bal`, `bzrx`, `celo`, `comp`, `crv`, `csp`, `dmg`, `dot`, `foam`, `kin`, `oxt`, `rune`, `sol`, `srm`, `vtho`, `wbtc`, `wnxm`, `xhv`, `xyo`, `yamv2`, `yfi`, `yfii`, `uma`, `ewt`, `rev`, `rsr`, `avax`, `tmtg`, `jst`, `hnt`, `trac`, `vlx`, `mxc`, `fet`, `aoa`, `iris`, `pnk`, `mln`, `shr`, `uqc`, `one_harmony`, `trb`, `ogn`, `ava`, `loki`, `hxro`, `wxt`, `cpay`, `fil`, `uni`, `swrv`, `sushi`, `aave`, `egld`, `hns`, `dia`, `boa`, `uos`, `ctc`, `renbtc`. The publication of reference rates is terminated for the following assets: `arn`, `pma`, `erd`, `man`, `iq`, `lend`. The Market Selection Framework was amended such that extremely low volume markets are less likely to be selected as a constituent market if higher volume markets of similar quality are available. The constituent markets for all assets in the coverage universe are updated.
33. **Market Selection Framework Version 1.0.1 on November 5, 2020**: The selection algorithm was modified so that any market with volume, measured in U.S. dollars over the past 90 days, of less than 1 percent of the volume of the selected market with the largest volume is excluded.
34. **Coin Metrics Hourly Reference Rates Methodology Version 2.4 on July 29, 2020 and Coin Metrics Real-Time Reference Rates Methodology Version 0.5 on July 29, 2020**: The coverage universe is expanded to include the following assets: `wrx`, `band`, `ksm`, `usdk`, `snx`, `stx`, `fxc`, `kcs`, `hive`, `nrg`, `cel`, `ubt`, `chsb`, `crpt`, `bht`, `cvt`, `data`, `eurs`, `xns`, `gt`, `dgtx`, `kava`, `tt`, `sxp`, `mx`, `ocean`, `erd`, `lpt`. The publication of reference rates is terminated for the following assets: `storm`, `gto`. A revision policy was amended. The constituent markets for all assets in the coverage universe are updated.
35. **Coin Metrics Hourly Reference Rates Methodology Version 2.3 on February 27, 2020 and Coin Metrics Real-Time Reference Rates Methodology Version 0.4 on February 27, 2020**: The coverage universe is expanded to include the following assets: `xaut`, `paxg`, `husd`, `dgx`, `busd`, `ftt`, `hedg`, `okb`, `zb`, `hbar`, `ckb`, `mof`, `vsys`, `cennz`, `luna`, `chz`, `seele`, `dx`, `matic`, `abbc`, `rif`, `tomo`, `hpt`, and `ant`.
36. **Coin Metrics Hourly Reference Rates Methodology Version 2.2 on February 6, 2020 and Coin Metrics Real-Time Reference Rates Methodology Version 0.3 on February 6, 2020**: The constituent markets for all assets in the coverage universe are updated. The coverage universe is adjusted to remove the following assets: `box`, `cosm`, `fsn`, `medx`, `pst`, and `ttc_protocol`. The coverage universe was expanded to include Dai and the previous asset with this name was renamed to Sai to appropriately reflect MakerDAO’s transition from Single-Collateral Dai (Sai) to Multi-Collateral Dai (Dai).
37. **Coin Metrics Hourly Reference Rates Methodology Version 2.1 on December 9, 2019 and Coin Metrics Real-Time Reference Rates Methodology Version 0.2 on December 9, 2019**: The coverage universe is expanded to include the following assets: `algo` and `beam`. Updated calculation methodology to include price inverse variance weighting to reduce the impact of outliers.
38. **Coin Metrics Real-Time Reference Rates Methodology Version 0.1 on August 30, 2019**: Initial publication of Real-Time Reference Rates Methodology.
39. **Coin Metrics Hourly Reference Rates Methodology Version 2.0 on July 8, 2019**: Increased publication times from once daily at midnight UTC to once hourly. Changed human oversight from once daily at midnight UTC to once daily at 16:00 New York time.
40. **Coin Metrics Hourly Reference Rates Methodology Version 1.2 on June 13, 2019**: The coverage universe is expanded to include the following assets: `gno`, `hot_holo`, `maid`, `nuls`, `qkc`, `rdd`, `rvn`, `zen`, and `mona`.
41. **Coin Metrics Hourly Reference Rates Methodology Version 1.1 on May 30, 2019**: Updated data contingency rules. If no observable transactions from constituent markets occur during a one-minute time interval, the next one-minute time interval’s volume-weighted median price is used instead of the previous. This contingency rule is applied recursively.
42. **Coin Metrics Hourly Reference Rates Methodology Version 1.0 on May 13, 2019**: Initial publication of Reference Rates Methodology.
43. **Market Selection Framework Version 1.0.0 on May 13, 2019**: Initial publication of Market Selection Framework.
