# Revisiting the Myth of Bitcoin Ownership Concentration

**Date:** 21-11-02

With the price of bitcoin floating around an all-time high, almost all holders of bitcoin today are in the green. Bitcoin has been one of the best performing assets so far this year with a YTD return of ~110%, compared to the NASDAQ’s 21% return. As bitcoin’s price touches all-time highs, public intrigue naturally grows around the largest holders of bitcoin, and who stands to gain from further increases in its price.

Bitcoin, and most crypto assets in general, differ from traditional financial assets in their data transparency and richness. Every Bitcoin transaction recorded since the network’s inception is maintained on a publicly shared ledger that anyone can access by running their own Bitcoin node. This allows anyone to view and verify the complete history of transactions and Bitcoin address balances, with interest often falling on the largest holders popularly referred to as bitcoin “whales”.

Bitcoin’s remarkable data transparency also makes it far easier to scrutinize, and it is common to see claims of Bitcoin ownership being concentrated in the hands of a small group of early adopters or otherwise wealthy individuals. A cursory look at the on-chain data appears to point to this: 18.7M of 18.9M total bitcoins are held by the top 10% of bitcoin addresses while 17.3M are held by the top 1% of addresses. But this is very misleading when taken at face value as many of the largest addresses are entities holding bitcoin on behalf of thousands, if not millions, of individuals.

One such entity is an exchange. Centralized exchanges (e.g. Binance, Kraken, Coinbase) hold bitcoin to facilitate trading, and custody bitcoin on behalf of individuals.

There is currently about 1.4M BTC held on the major exchanges that Coin Metrics tracks, or about 7.7% of total BTC supply. This is likely an underestimation of the actual amount as well because observers like Coin Metrics must develop heuristics to identify addresses owned by the major exchanges. Even still, exchanges control 4 out of the top 10 largest BTC addresses, including the top 2 by Binance which currently holds a total of 465K BTC across its wallets.

In addition to exchanges, there are other institutional entities that hold large sums of BTC and may appear to be whales without further inspection. Bitcoin trusts are funds that hold and manage BTC on behalf of other individuals or entities. The largest trust today by assets under management is the Grayscale Bitcoin Trust (GBTC) which holds 647K BTC (~3.5% of total supply).

In addition to trusts, at least 225K BTC is “wrapped” as a token (WBTC) that can be used within the Ethereum ecosystem. WBTC tokens are backed 1:1 and redeemable for the underlying BTC. The BTC is effectively held in custody by a few addresses that appear like large holders when in reality 41K Ethereum addresses have a positive balance of WBTC.

Other custodial solutions include sidechains like Liquid and entities developing custodial-based services on the Lightning Network, a layer-2 scaling solution for Bitcoin.

It’s worth noting that BTC is far from being the only financial asset to appear highly concentrated at the surface due to custodial entities. Although the data is updated less frequently and includes fewer details, US equities follow a similar pattern where institutions hold an outsized portion of shares on the behalf of others.

For example, for the FAANG stocks, the top 10 holding institutions have anywhere between a 30-50% stake in total shares outstanding as of Q2 2021. But millions of investors can allocate capital into these institutions via investment vehicles like ETFs.

Also, note that insiders such as founders and CEOs also tend to maintain relatively large ownership stakes. But this is often viewed as a way to align incentives and promote good decision making. While BTC is comparably far more decentralized, large holders of BTC should also be incentivized to promote the health of the network as big stakeholders, perhaps by funding Bitcoin Core development or promoting adoption.

Aside from large institutions and entities, 2.3M BTC (~12% of supply) is held by dormant early adopters that have been inactive since 2012 or earlier. The most famous of these OGs is Satoshi Nakamoto, who is believed to own over 1M BTC split up across various addresses. It is currently impossible to know whether the owner(s) still have the keys to these coins, but given the rapid rise in price from 2012 to now, either these holders have a very long time horizon or they simply have lost access to the coins.

There are also so-called “vanity” wallets that have received large sums of BTC but do not have a known private key, making the coins inaccessible. One such example is the address 1CounterpartyXXXXXXXXXXXXXXXUWLpVr that holds ~2,131 BTC.

There have also been instances where coins have been incorrectly sent due to bugs in participants’ software, such as MtGox’s November 2011 mistake in which they sent 2,609 BTC to a bogus script. It is also important to exclude “dust addresses” that hold amounts less than the fee to move them.

Naturally, Bitcoin’s ownership distribution is an ongoing topic of study. A new working paper from the National Bureau of Economic Research (NBER) studies the supply distribution of bitcoin, focusing on individual ownership and taking into account many of the caveats arising from custodial entities described above. While it is certainly true that there is currently a degree of skewness in the distribution of BTC ownership, this is only a measurement at one point in time and ignores the trend.

As BTC adoption increases and miners inevitably sell new coins to cover fiat-denominated expenses, supply is getting more equal. The number of addresses with at least 0.01 BTC now stands at 9.1M, rising from 8.5M at the beginning of this year.

Coin Metrics continues to research this topic for BTC and other assets and has contributed to the discussion many times in the past including in Issues 2, 29, and 38, of State of the Network, as well as in Senior Research Analyst Nate Maddrey’s ₿-Word Conference presentation from this past July.

BTC and other crypto assets ultimately provide an unprecedented financial data set for researchers as a comprehensive and public history of economic activity available to anyone with a desire to access it.

To follow the data used in this piece and explore our other on-chain metrics check out our free charting tool, formula builder, correlation tool, and mobile apps.

Bitcoin hash rate continued to climb back this past week and is close to returning to the pre-crash levels of early May. Difficulty has continuously adjusted upwards as mining has rebounded. As of Sunday, Bitcoin has had 8 consecutive positive difficulty adjustments.

Bitcoin mining revenue is also on the rise, which should incentivize more miners to join the network. Mining revenue for October was $1.7B, compared to $1.3B in September. This is partially due to an increase in transaction fees - there was $19M in fees in September compared to $27M in October - but is mostly due to BTC price appreciation.

It was a big week for ETH, as price reached a new all-time high and market cap averaged over $425B. ETH user adoption continues to look strong, as the number of addresses holding 0.01 - 1 ETH rose over 1M in October, from 16.6M to 17.6M.

On October 27th the Ethereum Beacon Chain Altair update went live, taking one step closer towards the Ethereum 2.0 merge. The Ethereum 2.0 staking contract launched just about a year ago and recently surpassed 8M total ETH, worth close to $35B.

Staking introduces a way for holders to earn yield on their ETH, and also serves as a supply sink as large amounts of ETH is locked into the deposit contract. Staking rewards are dependent on the amount of ETH staked, and gradually decreases as more ETH gets deposited.

There are currently a few different methods that are commonly used to stake ETH. Some choose to run their own staking nodes, but this requires at least 32 ETH (roughly $135K at current prices) plus the technical knowledge needed to keep a node up and running. Although the minimum staking amount is growing in USD terms as ETH price rises, this method has attracted many ETH enthusiasts and those with a technical background, but is generally not an option for those looking to stake smaller amounts.

Another option is staking on centralized exchanges - many centralized exchanges including Coinbase, Binance, and Kraken offer custodial staking services, and stake ETH on their customers’ behalf. This is simpler than running your own node since it does not require technical expertise, but often comes with indefinite lock-up periods and some additional fees.

Additionally, there are more decentralized solutions like Lido, which gives stakers tokens (stETH) in exchange for their staked ETH. This gives stakers more flexibility and liquidity since they can sell their stETH tokens on the open market or use the stETH tokens in other DeFi protocols. For example, stETH was recently integrated as a collateral asset on MakerDAO.

The following chart shows cumulative ETH staked in the Ethereum 2.0 staking contract separated by depositor type, tagging the addresses for some of the largest staking services.

Hobbyist depositors are broadly defined as the ETH addresses that have only contributed the minimum 32 ETH required to stake, and no more.

As the move to PoS ETH approaches, following the distribution of depositor type will be important as too much concentration can introduce new risks to network performance and increase slashing penalties. Harsher penalties are given to validators who are offline when more than ⅓ of the total validators are also offline, making concentrated staking potentially more risky.