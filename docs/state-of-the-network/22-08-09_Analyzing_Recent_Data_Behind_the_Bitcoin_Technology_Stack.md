# Analyzing Recent Data Behind the Bitcoin Technology Stack

**Date:** 22-08-09

Earlier this year at the Bitcoin 2022 conference, Coin Metrics’ Lucas Nuzzi presented the following diagram showing a sample of some of the key projects pushing the Bitcoin ecosystem forward.

This diagram is evidence of an active ecosystem of innovation developing around the Bitcoin protocol today to improve scalability, security, and privacy while introducing new functionality.

In this week’s State of the Network, we explore some of the data behind the adoption and acceleration of the Bitcoin technology stack. We source advanced Bitcoin statistics from TxStats.com, a collaborative project between Coin Metrics and BitMEX Research providing in-depth, high quality and timely information about how the Bitcoin network is being used today.

Last November, Bitcoin’s Taproot upgrade went live via a soft fork bringing important new technical benefits to the protocol and opening the door for more use cases to be built on top of Bitcoin. Among the key improvements, Taproot lowers fees for more complex Bitcoin transactions by efficiently compacting transaction data, introduces better privacy features for users, and provides new functionality through better scripting capabilities.

Since its November launch, a total of 11.74K BTC is now stored in Taproot (P2TR) outputs (0.06% of all BTC), steadily growing since March of this year.

In aggregate BTC terms, this is small but historically the adoption rate of Bitcoin upgrades has been slow to start.

SegWit offers a helpful point of comparison. Also introduced through a soft fork in 2017, segregated witness transactions (SegWit) changed how a transaction’s data use is measured, effectively allowing for larger block sizes. After a few years of stalled adoption, SegWit use now accounts for over 80% of transactions.

The Lightning Network is a second-layer scaling solution built on Bitcoin. As a second-layer solution, it aims to consolidate many transactions between two parties by aggregating them, greatly reducing the overhead to individual transactions (think keeping a tab at a bar). By deferring settlement on the base chain, this allows the Lightning Network to process transactions quickly and at low cost. LN is a protocol that is jointly developed by various groups, including ACINQ, Lightning Labs, and Blockstream, which together agree on a framework and create separate implementations of the lightning network.

The LN is powered by the opening and funding of payment channels between users. The number of open channels observable on the Bitcoin base layer has risen 38% over the last year, climbing from 65.5K to 90.3K today. The amount of bitcoin held in these channels has also increased by 103% YoY from 2.2K to 4.5K.

Behind this growth is a developing ecosystem of applications, which are quickly growing to fill a greater variety of verticals and niches. One such vertical includes wallets with varying implementations and functionality, such as payment streaming and custodial solutions. Another compelling vertical is the managed node, or node-as-a-service, which is gaining popularity as merchants integrate LN and find themselves lacking technical expertise, fiat on-ramps or inbound liquidity.

When these upgrades are combined together, improvements in the tech stack can be even more potent. For example, earlier this year Lightning Labs introduced Taro, a Taproot-powered protocol for issuing assets on Bitcoin that can be transferred over the Lightning Network.

Also, just last week Foundry Digital completed a BTC donation to Stratum V2, an open-source protocol to help miners better communicate with mining pools and contribute their hash power to the network.

These are just a few signs that Bitcoin’s technology stack is quickly changing and evolving. To keep up with adoption of Lightning, Taproot, and to follow more advanced Bitcoin metrics check out TxStats.com.

(If you have any projects that are not yet tracked on Bitcoin Ekosys, feel free to reach out to @LucasNuzzi on Twitter!)

Daily active Bitcoin addresses were flat week-over-week holding steady at 900K. Daily active Ethereum addresses also remained at the same level as the week prior, averaging just under 650K per day.

Re-Architecting Trust by author Omid Malekan is an exploration of how decentralized blockchain networks, and the digital assets that they enable, let us reinvent our most important trust frameworks by creating brand-new types of money, reinvigorating how we transact the old kind, disintermediating the least trustworthy financial institutions, and enabling brand-new business models for artists and influencers.

We’ve pulled some salient excerpts from from Re-Architecting Trust and paired them with Coin Metrics data to dive into the data behind Omid’s words:

Bitcoin mining is different from other kinds of mining because the amount of effort has no bearing on production. Unlike a physical asset such as gold, where spikes in price lead to greater supply being brought to market, and vice versa, the price of bitcoin has no bearing on production. Bitcoin miners have no power over how many coins are unearthed at any given moment in time. Miners can commit more resources to solving the puzzle—and many regularly do to gain an edge over their competition— but doing so has no bearing on new coin creation. -p.56

Every token transaction, every bit of smart contract code, and all governance decisions are public information, from the latest block all the way back to the very first. This form of radical transparency is a necessary condition of decentralization, as consensus wouldn’t work without it. The easiest way for participants in a crypto transaction to know they haven’t been cheated is to inspect the ledger. When there is no authority in charge, the data can’t be hoarded. - p.84

Transparent records are better than opaque ones, and immutable agreements that can only be appended consensually are best. Important processes should be automated and run around the clock, keeping reconciliation errors and settlement risk to a minimum. Ask any intelligent and honest Wall Street veteran to sketch out the optimum capital market infrastructure for the next hundred years and what they’ll describe is a blockchain—in every important way, if not by name. - p 159

Coin Metrics is excited to host Re-Architecting Trust’s author Omid Malekan for an AMA on August 18th in our research community on gm.xyz! We’ll discuss decentralized platforms, all things web3, and Omid’s newest book.

Submit your questions for Omid on gm, Twitter with #coinmetricsAMA, or LinkedIn and we’ll answer as many as we can next Thursday, August 18th starting at 12pm, EST. After the AMA concludes, you’ll be able to sign up for a free digital download of a chapter from Re-Architecting Trust!