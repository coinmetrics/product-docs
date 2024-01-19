# Helicopter Tokens: A New Look at the Data Behind Some of the Largest Airdrops on Ethereum

**Date:** 22-01-10

Airdrops have become a highly popular mechanism in the crypto ecosystem for allocating crypto assets to users. In general, an “airdrop” refers to the event of distributing new or existing crypto assets (usually tokens) to a predetermined set of eligible crypto identifiers such as addresses.

There have been many high-profile airdrops in the last couple of years, sometimes involving hundreds of thousands of addresses. As they have proliferated, airdrops have generated a rich amount of on-chain data. This has created an opportunity to study both recipients’ behavior and the airdrops’ designs, goals, and outcomes.

The goals of airdrops can vary, but the larger airdrops in recent times have been designed to transfer a protocol’s governance rights to its users via a token that represents voting stake. Starting with the acceleration of DeFi adoption in summer 2020 and other protocols, Ethereum has been host to many of the high-profile airdrops in the last couple of years. However, airdrops have been around longer than that with earlier examples including Stellar’s distribution of XLM to holders of bitcoin in 2016 and OMG network’s (formerly OmiseGo) airdrop to ETH holders in 2017. Hard forks (e.g. Bitcoin Cash) might even be considered a special type of airdrop.

One of the most significant airdrops in recent times was the distribution of Uniswap’s governance token, $UNI, in September 2020. In a Uniswap blog post announcing the airdrop and launch of the token, the team behind the largest decentralized exchange (DEX) on Ethereum described $UNI’s purpose as “enabling shared community ownership and a vibrant, diverse, and dedicated governance system…” To determine who would receive $UNI, the Uniswap team took a snapshot of all distinct historical users up to that point in time. In total, over 250K Ethereum addresses had interacted with Uniswap’s smart contracts before and were eligible to claim $UNI.

The retroactive $UNI airdrop effectively established the standard design for airdrops that have followed on Ethereum. Retroactive airdrops distribute governing power to past users, while essentially rewarding early adopters. Ultimately, retroactive airdrops are popular and feasible because of public blockchains' core properties of data availability, detailed provenance, and largely immutable records of activity.

The following sections explore the data behind eight different airdrops (summarized below) on Ethereum that occurred over the last two years covering DeFi protocols, NFT platforms, public goods funding, and decentralized domain name infrastructure.

Uniswap, DEX, $UNI, September 16, 2020 [release]

1inch, DEX Aggregator, $1INCH, December 24, 2020 [release]

Gitcoin, Public Goods Funding Platform, $GTC, May 24, 2021 [release]

SuperRare, Digital Art Marketplace, $RARE, August 17, 2021 [release]

dYdX, Derivatives Trading Platform, $DYDX, September 8, 2021 [release]

Ethereum Name Service, Decentralized Domain Names, $ENS, November 8, 2021 [release]

Paraswap, DEX Aggregator, $PSP, November 15, 2021 [release]

OpenDAO, NFT DAO, $SOS, December 24, 2021 [release]

While there were 250K ETH addresses that were eligible for the UNI airdrop, not every address claimed their tokens. Because of the gas costs associated with transferring tokens, the onus is usually on the recipient to actively claim the tokens.

Around 200K addresses (80%) claimed their $UNI tokens within the first two weeks of the airdrop. For context, there were ~7M active ETH addresses in all of September 2020, when the airdrop started. How does this compare to some of the more recent airdrops? The chart below shows the number of addresses that claimed their tokens within the first two weeks of each airdrop beginning.

Despite there usually being a long time window for claiming and possibly high gas fees, a common trend among all of the airdrops is that most eligible addresses tend to claim their tokens within the first couple of days. Beyond the sheer excitement factor, there might be financial reasons for this. In some jurisdictions, airdrops are treated as income (like in the U.S., though the rules are worded for hard forks). So if the recipient believes the token will increase in value in the near future, it might make sense to claim sooner (but note that in some jurisdictions you may also have to pay capital gains taxes upon realizing a gain so claiming at a higher price increases the cost basis as well). There might also be immediate benefits to being a token holder, or financial incentives to stake or lend the tokens.

In some airdrops there are flat rewards that everyone receives. In the $UNI airdrop all users received a base 400 tokens, with some more loyal liquidity providers receiving greater amounts. But the amount of tokens that an individual address receives is often a function of that address’s activity level and involvement with the protocol. For example, the amount of $SOS tokens an address received in the OpenDAO airdrop was a function of both trading volume and number of transactions on OpenSea. Like many other socioeconomic systems, this distribution is long-tailed with large “whale” NFT traders.

In the scatter plots below, each dot shows the amount of tokens received by an address (y-axis, native units) and when they claimed those tokens (x-axis). Addresses in green received amounts that were in the top 5% of all claims.

This view helps illuminate a few trends. First, there can be a large variance in the amounts received airdrop to airdrop (hence the need for log scales). Addresses claiming large amounts also tend to claim relatively early, a trend that was especially prevalent in the $SOS airdrop. Being more privy to the inner workings of the project, these users might be more on top of the airdrop than the average user, or are more incentivized to claim earlier for the outsized financial benefit.

One airdrop that sticks out is the allocation of Paraswap’s $PSP token. The Paraswap team designed an airdrop that attempted to distribute tokens to only the most “active users,” defining three tiers of addresses that received a flat 10.4K, 7.8K, or 5.2K tokens, respectively.

Another interesting case study was the formula used by the ENS team. The amount of $ENS an address received was a function of two things: how long an address had held an ENS name for and how far in the future it was registered (with a multiplier for setting a primary ENS name). Notably, the amount of $ENS given was not a function of the number of ENS names held by an address, likely to limit the governance responsibility given to ENS name squatters.

Airdrops can be a big windfall for some individuals, and usually come unexpectedly. But what do people do with the tokens once they get them?

This is actually an interesting economic question as this concept has been discussed much in research focusing on the Milton Friedman parable turned policy idea of "helicopter money," usually referring to direct transfers from central banks to households. Economists have theorized on the outcome of what individuals would do with these transfers, basically inferring individuals' marginal propensity to save or spend. In a lot of ways, token airdrops evoke the same ideas as helicopter money by being an unexpected windfall, albeit with different intentions.

But while tracking household use of government stimulus funds is a difficult task, following the flow of airdropped tokens (pseudo anonymously) is actually trivial with a blockchain. Policymakers have started to recognize this as multiple research papers (e.g. BIS, ECB) on the subject of central bank digital currencies (CBDCs) have posited that occasional government "airdrops" to personal digital wallets could be a core feature of such a system.

To investigate, we looked at how many of the recipient addresses increased, decreased or kept the same balance in the week after receiving their tokens. Longer time intervals might also be of interest, but the charts below show how airdrop recipients’ balances of that token changed (in % terms) in that relatively short period (note 100 = 100% and over).

Many recipients choose to move their tokens immediately. If they do move them, they tend to move either all of them or hold. Very few airdrop recipients increase their balance in the first week.

Importantly, note that this doesn't necessarily mean these addresses sold their tokens, as this counts any movement on-chain which could simply be movement between addresses or sending the tokens to a custodial service like a centralized exchange. Claimers might also be incentivized to send the tokens to a DEX pool to provide liquidity early on.

But undeniably, many addresses choose to sell. Looking at $UNI specifically, the number of addresses with 100-1,000 UNI has remained below levels around the airdrop.

At latest count, there are roughly 6.6M Ethereum addresses holding a balance of at least 0.1 ETH. Given that crypto is still undergoing rapid adoption and is in its early stages, are these airdrop recipients simply the same cohort of early adopters? Or are there pockets of distinct users forming within the Ethereum ecosystem?

The venn diagrams below show the overlap in the number of addresses who claimed tokens in both of the two given airdrops.

Looking at the venn diagrams, there are some airdrops that share many recipient addresses, but others that do not have many addresses in common at all. It turns out this analysis is very helpful for understanding user behavior on Ethereum.

The protocols that are generally more alike tend to have more crossover. For example, the set of users receiving $UNI tokens and $1INCH tokens is relatively large. This makes sense as the cohort of users who have made a swap on Uniswap were likely aware of DEX aggregators like 1inch as well. Additionally, more than half of the $RARE recipients also received $SOS tokens as collectors on SuperRare have very likely traded on OpenSea before as well. Interestingly, $ENS has a large overlap with many of the other airdrops being a linchpin tool of the ecosystem.

This analysis can also help identify if DeFi users also tend to be NFT traders. Looking at the venn diagram for $UNI and $SOS, there is some overlap at 18K addresses but this is only about 6% of the $SOS claimers. This suggests that most of the addresses that have used OpenSea are likely newer users who onboarded to Ethereum after September 2020, making them ineligible for the $UNI airdrop. But it's also possible that the NFT ecosystem is more distinct from DeFi.

Taken all together, interestingly there are zero addresses that claimed tokens in all 8 of the selected airdrops. There are 52 addresses that claimed 7 and 266 that claimed 6.

Airdrops have now become a regular event in crypto and a standard for token distribution. While airdrops are facilitating experiments with new models of protocol ownership, there are still many challenges and room for design improvements.

One challenge is preventing Sybil attacks. In a Sybil attack, one or a few people pose as many by creating multiple addresses to farm an airdrop. Some airdrops have tried methodologies to snuff this out, like the Paraswap airdrop discussed earlier.

Another challenge is in incentivizing users to hold the tokens and conduct protocol governance. As seen above, many addresses will tend to offload their tokens immediately after the airdrop.

Finally, once an airdrop occurs it is generally hard to do it again. Some protocols like 1inch have completed multiple airdrops but once a certain amount of tokens have been distributed, it is unsavory to issue more and dilute the existing holders’ governance power. By rewarding users early in the adoption curve, later users (and hopefully the majority if the protocol grows) are necessarily left out.

Yet, protocol developers and leaders continue to experiment with new tokenomics, making airdrops some of the most exciting events to continue studying in crypto.

The markets took a downward turn this past week as newly released Federal Reserve minutes revealed that rate hikes are likely coming earlier than expected. Despite the drastic drop in price, on-chain activity did not have a massive dropoff - BTC active addresses dipped 4.3% week-over-week, while ETH active addresses actually grew by 1.4%. ETH fees also increased, likely driven by an uptick in NFT activity and trading on decentralized exchanges (DEXs). Stablecoin activity also grew following the price volatility. Tether (USDT) active addresses averaged about 526K per day over the last week, USDC averaged 28.7K daily active addresses.