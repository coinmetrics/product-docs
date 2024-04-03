# Understanding Total Value Locked (TVL)

**Date:** 21-07-27

Decentralized Finance (DeFi) has become one of the industry’s most vibrant topics, with dozens of new projects launching on a monthly basis. DeFi applications essentially enable the creation of financial contracts that are automatically executed. Broadly speaking, these contracts facilitate the issuance, lending, trading, and management of cryptoassets.

Given the broad scope of DeFi applications, it is difficult to measure the adoption of the DeFi theme as a whole. After all, trading and lending involve different operations that are not fully comparable. In order to address this, the industry has converged on a metric called “Total Value Locked”, or TVL, to measure the adoption of DeFi projects.

Most DeFi applications, whether they facilitate lending or trading, require a deposit of collateral in the form of a cryptoasset, like a stablecoin. The “Total Value Locked” of a protocol is simply taken as the sum dollar valuation of all collateral deposited in that specific application, regardless of its functionality. As such, TVL enables money markets like Aave to be compared with Decentralized Exchanges like Uniswap.

Since 2019 DeFi has experienced exponential growth. TVL has become the de-facto way to measure DeFi adoption, and one of the most requested metrics at Coin Metrics. In this post, we would like to share some of the challenges that prevent the accurate calculation of TVL, as well as the critical shortcomings when using this metric to evaluate DeFi protocols.

We identified three major challenges that make computing a robust TVL metric a difficult task.

Decentralized finance is still a very young field with protocols and applications launching and disappearing every day. Some of these launches are mere copies of already existing protocols or new versions within an existing system, while others are entirely new creations. Each of them complicates holistic estimates for a given smart contract blockchain.

Protocols can become overnight successes, rallying billions in collateral in a matter of days. For example, Sushiswap, a clone of Uniswap, rose to near-instant fame in September 2020, as its TVL went from a few thousand dollars to over a billion overnight:

What explains this growth rate? In essence, incentive structures in DeFi protocols are entirely malleable. SushiSwap came out of nowhere and attracted over a billion dollars in deposits via an aggressive issuance schedule that favors early adopters with newly minted SUSHI tokens.

This approach set a precedent that will likely be repeated ad infinitum. Given the frequency of protocol clone launches, it has become nearly impossible to perfectly track all collateral allocated to a blockchain in real-time. Observers like Coin Metrics are required to pick which protocols to individually track TVL for since each requires some amount of manual work to be integrated.

The frequency of new protocol launches leads to a natural underestimation of the total value used as collateral across all DeFi applications by all data providers. In order to accurately calculate TVL for a platform like Ethereum, providers must constantly re-evaluate past measurements to reflect the addition of new protocols and collateral types. With DeFi now being aggressively pursued in new smart contract platforms, this fast rate of new launches undermines any approach to have correct protocol-wide TVL estimates.

Beyond the issue of new protocol launches, another complicating factor is that existing protocols can also mutate. In order to account for such mutations, new versions and contract deployments must also be constantly monitored. Uniswap, for example, is already at its 3rd iteration, with collateral being tracked slightly differently for each version. Accordingly, TVL for Uniswap is the sum of collateral allocated to each of its versions, which must be individually assessed.

It is possible that DeFi stabilizes around a set of norms or standards in the future. If such standardization were to happen, that could make the task of integrating new protocols easier. However, standardization is no panacea since there is no guarantee that all protocols would follow standards accurately. As we have seen with the proliferation of the ERC20 standard, many variations exist that still require manual review. As such, it is unlikely that the normalization of DeFi will grant data providers a leap of performance when it comes to protocol additions in the short to medium term.

Decentralized finance protocols support a near-infinite variety of assets that can be used as collateral. While some protocols restrict the collateral types, many do not.

(includes data from Uniswap v1/v2/v3, Sushiswap, Curve, Aave v2, Compound, Maker)

This chart gives a lower bound on the real number of distinct assets used as collateral in DeFi applications. It is not a holistic estimate since it does not include data from all DeFi protocols and is limited to ERC-20 tokens only. Nevertheless, this lower bound provides a glimpse at the impact of tokenization and the rapid growth of collateral types that can now be used in DeFi.

The sheer scale of collateral types complicates the value estimations. All of these assets can be traded across multiple venues ranging from centralized, off-chain, exchanges to decentralized, on-chain, protocols. The collection of pricing data from all of these venues is a herculean task that, just like protocol integration, does not scale well. At the same time, this is a requirement so that the asset used as collateral can be priced correctly via an index value that accounts for each venue.

Even if a data provider were to have the bandwidth to produce index values from all possible trading venues, it is hard to take all data collected at face value. Much like the problem of correctly calculating a cryptoasset’s market cap, pricing data in DeFi liquidity pools can be manipulated and ultimately undermine value measurements.

Robust price sources like Coin Metrics reference rates cover at most the top few hundreds of assets. For the remaining long tail of assets, it is possible to use on-chain exchanges to estimate their current price, but there’s no guarantee that they are traded with enough frequency to give accurate prices, or that the liquidity in these protocols was added organically.

Finally, the most subtle yet important challenge with using TVL comes with understanding the makeup of assets used as collateral. When evaluating a protocol’s TVL, one might assume each unit of value deposited as collateral is being exclusively used within the protocol. In other words, the assets are “locked” in that they are strictly being used in the context of the application and nowhere else.

However, due to how DeFi money markets are designed, this assumption is wrong. DeFi enables the creation of asset derivatives that rehypothecate collateral. Put simply, the collateral used in one application can be used in another, which can then be used in yet another, and so on and so forth. There are DeFi applications specifically designed to enable rehypothecation so that their users can get leverage. While the existence of this is nothing new, it should nonetheless challenge one’s understanding of what “locked” collateral represents.

In brief, some assets used as collateral in DeFI applications are derivatives that represent existing claims on other collateral. This results in a multiplier factor that can drastically increase TVL estimates since both real and rehypothecated collateral are being counted. Existing approaches to the calculation of TVL fail to discern between the two. As such, collateral can be considerably overcounted depending on the protocol.

In order to illustrate this, take a look at the following example:

A user deposits $1,500 worth of Wrapped Ether (WETH) into Maker to get a loan in the form of $1,000 worth of DAI (150% collateralization ratio).

The user then deposits this newly minted DAI, as well as another $1,000 worth of USDC in the Uniswap V2 USDC-DAI pool. In return, the user gets Liquidity Provider (LP) tokens representing that $2,000 stake of that pool’s liquidity.

The user can then redeposit these LP tokens into Maker to get another loan of $1,960 of DAI (102% collateralization ratio)

From a naive perspective, TVL could be computed as:

Yet, a more sophisticated approach would only count the $1,500 of Wrapped Ether and $1,000 of USDC as the “real” collateral giving a TVL of $2,500. This approach would not include assets that are claims to other collateral such as DAI (which is minted as a loan against collateral), and Uniswap DAI/USDC LP tokens (which represent a claim to the liquidity held by the Uniswap V2 DAI/USDC pair).

This adds additional complexity as determining whether or not an asset used as collateral adds “hidden” leverage to TVL values.

In order to better reason about DeFi systems and measure them appropriately, it can be helpful to think of DeFi assets as neo asset-backed securities (ABS). These are a type of financial derivative that represent a claim to a pool of collateralized assets. In the context of DeFi, these derivatives provide the foundation to the trading, lending and management of cryptoassets. Relative to the legacy systems used to issue ABS, DeFi attempts to bring higher transparency and automated risk management.

In this vein, what Total Value Locked is measuring is the total size of a levered market. As covered in this report, that figure can be misleading as it is inflated by a leverage multiplier, carries high price sensitivity, and is far from holistic. Without knowing what that multiplier is, it becomes impossible to measure the health of the system. Most importantly, the lack of this data prevents a systemic analysis of a system’s sensitivity to price shocks, which is critical intelligence for these types of systems.

For these reasons, it is of the utmost importance for us to distinguish between “real” and rehypothecated collateral before producing our own TVL estimates. Similarly, it is important to track these figures in the protocol’s “native units”, which removes price sensitivity and provides a better picture of an application’s growth. Beyond better approaches to TVL, another potentially interesting metric to cover is a more simple equivalent to DeFi’s “Open Interest” where, instead of value, the total number of contracts supporting an application is counted.

Needless to say, it is challenging to pursue the creation of all of these metrics at once. In order to better automate the data collection process, we are building a new set of tools to parse smart contract data in a more scalable way. Given the challenges associated with holistic measurements, our expansion of DeFi metrics will focus on risk management at the application level, as well as trades data from high profile AMMs.

In conclusion, Total Value Locked is a deceptively complicated metric hiding under a benign name. Each word that make up its name brings its own set of challenges:

“Total” means tracking all the versions of a protocol and now even some versions of it on multiple chains (Ethereum, Binance Chain) as well as second layers like Matic or Fantom.

“Value” means finding a robust price for each of the thousands of assets that can be used as collateral.

“Locked” is a misnomer as in most protocols liquidity can be added or removed quite quickly. It also means untangling the links between each asset to avoid double or triple counting.

As an industry, it is important to converge on better methodologies to contextualize and caveat growth in DeFi applications. This will be a collaborative process, so we look forward to contributing to better metrics, and learning from the community as a whole.

Bitcoin (BTC) and Ethereum (ETH) both rose midweek following a high-profile conversation between Cathie Wood, Elon Musk, and Jack Dorsey at The B Word Conference (Coin Metrics’ co-founder Nic Carter and Sr. Research Analyst Nate Maddrey also participated in the conference, see CM updates below).

Among new information, Musk hinted that Tesla may once again start accepting bitcoin as payment conditional on sustainable energy continuing to constitute a greater makeup of the energy mix of Bitcoin’s hash rate. Musk additionally disclosed he personally holds bitcoin, ether, and dogecoin, and also disclosed that SpaceX holds bitcoin (amount not revealed).

Bitcoin also continues to naturally adapt to changes in Hash Rate. Bitcoin’s mining difficulty, which programmatically adjusts roughly every 2 weeks (2,016 blocks) to target a 10-minute average time between blocks, decreased 4.81% on July 17. This followed the near 28% fall in difficulty on July 3rd, the largest in Bitcoin’s history:

This also marked the 4th straight decline in difficulty, the longest such streak since 2011 when difficulty decreased 8 times in a row:

This is simply a sign that Bitcoin is naturally readjusting to relatively large changes in hash rate, as designed.

Maker, one of the earliest Ethereum-based decentralized finance platforms, announced last week that the Maker Protocol will complete a long-stated goal to become a fully decentralized autonomous organization (DAO). In a blog post, Maker Foundation CEO Rune Christensen formally disclosed that the Foundation, which has existed to help promote protocol growth and DAI stablecoin adoption, will dissolve “within the next few months” leaving full governance of the protocol to the DAO and the community of MKR token holders. The Maker Foundation had already taken steps in this direction in recent years, giving full control of the Maker smart contracts to holders of MKR in March 2020 and returning 84K MKR to the DAO in May 2021, but formal dissolution is the final step in this process.

MakerDAO governance is completed by MKR holders who “lock-up” their tokens into a designated Voting Contract. Voting outcomes are determined based on the quantity of MKR tokens in support of a given side (e.g. changing important protocol parameters such as acceptable collateral types or the debt floor/ceiling). Given the importance of MKR stake in governance, the distribution of MKR supply is an important measure to follow on-chain. Historically, MKR supply has been somewhat concentrated in a few addresses. However, the number of addresses with smaller MKR balances has been growing.

The number of addresses holding at least 1/10B of total MKR supply but no more than 1/100M increased from ~115K to ~175K in 2021 through July 20th.

Additionally, the percentage of MKR supply held by the top 100 addresses is still ~82% but is decreasing. From an economic standpoint though, the largest MKR holders should have the largest incentive to safeguard and grow the protocol.

MakerDAO is in charge of managing a growing supply of DAI in circulation. DAI supply (ERC-20) has surpassed 5B in 2021, growing steadily throughout the year. Accompanying this growth in supply, the value of on-chain DAI transferred is increasing while the price of DAI has remained close to its peg, even during times of market stress.

In the long-run, MakerDAO expects to foster three key governance elements to ensure success of the protocol: elected paid contributors (EPCs), Maker improvement proposals (MIPs), and the ability for MKR holders to delegate their votes. These refinements may help the DAO address potential challenges to protocol health such as excessive borrowing/lending of MKR or collateral concentration.

Measures of MKR supply distribution, DAI issuance, and other on-chain analytics will become increasingly important as well for self-sufficient and effective governance of the protocol via the DAO and Maker community.