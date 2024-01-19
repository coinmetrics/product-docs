# Examining The First Week of Libra Testnet Data

**Date:** 19-06-25

Based on reader feedback, we have decided to publish State of the Network on Tuesday mornings EST. We hope you like this new publication time.

Continuing on from last week, we would like to ask you to provide feedback on State of the Network and how we can do better. We’ve created a very brief and anonymous survey, and would appreciate your thoughts. You can complete the survey here.

Yesterday, we published An Analysis of Kin’s On-Chain Activity. Check out this tweet thread for the highlights.

Coin Metrics API v2.0 was successfully promoted to “stable” on Tuesday, June 18th. Read the update here.

Coin Metrics transitioned all of its legacy Community data infrastructure over to our Pro infrastructure on Tuesday, June 18th. Read the announcement in this post.

After much anticipation, Facebook’s Libra has arrived. Although the Libra mainnet is not scheduled to launch until 2020, Facebook has already launched the Libra testnet. We analyzed early activity on the testnet to see how it is being used during its first week.

Testnet Libra is a stripped-down version of what mainnet will probably look like. For example, the smart contract capabilities aren’t available yet. Users can request new coins to be issued to them at no cost, and can transact with them. Transaction fees are burned instead of being collected by the validators. The testnet does not use real Libra (it uses fake Libra which is not worth real money), but still provides an interesting look into the potential of the network.

In order to serve as a global currency, Facebook is designing Libra to be scalable (i.e. high throughput). Libra is slated to handle more than 1,000 transactions per second at launch.

Less than 1 week after its launch, the Libra testnet is averaging 25,000 transactions a day, which puts it roughly on par with Dash and NEO, both above $1B in market cap. However, digging deeper, most transactions are token mints (anyone can request up to trillions of Libra Testnet tokens at no cost), as opposed to peer-to-peer token transfers:

Peer-to-peer transfers are less frequent and have been gradually decreasing over the last week, averaging around 500 transfers per day in the past few days:

Testnet transfers could be made by a small group of people, since they can be executed at no cost. One way to estimate how many people used the Libra testnet is to look at how many unique addresses sent any testnet Libra to another address. The amount of unique active addresses has also been declining, falling from over 750 on June 18th to a little over 250 a day as of June 23rd, as seen in the below chart.

However, it’s important to remember that testnet activity is just a small sample of potential future activity. There are not as many reasons to transfer worthless testnet tokens other than for testing:

Libra is in a unique position in that it already has billions of potential users due to the huge size of the Facebook and WhatsApp user bases. However it is also relatively unique to have a group of large corporations governing a blockchain; Libra will also likely need to win users’ trust in their governance in order to one day have the billions of users that they hope for.

The Libra blockchain will be governed by a consortium of companies known as the Libra Association, who will run the validator nodes for the network. Libra is therefore a permissioned blockchain: validators need to be approved by the Libra Association. At least that is the plan initially; Facebook has stated that they plan to eventually transition Libra to a permissionless blockchain, but it remains to be seen whether they will be able to accomplish this while maintaining scalability. This differs from permissionless blockchains like Bitcoin and Ethereum where anyone can run a validator node without permission.

Permissioned blockchains can achieve significantly higher throughput than permissionless blockchains (at least for now - Ethereum and others are currently working to build next generation permissionless blockchains that achieve high scalability while maintaining decentralization). But permissioned blockchain validator nodes essentially have full control of the network, and can decide collectively to censor transactions or blacklist certain addresses.

It remains to be seen exactly whether users will care about Libra’s relative lack of decentralization. Different blockchains have different levels of decentralization, and some high-market cap blockchains (such as XRP) are also permissioned. But ultimately, if Libra is to gain widespread user adoption, it will need to figure out how to win over users’ trust in both Facebook and the Libra Association.

We will continue monitoring Libra data and look forward to seeing how the project plays out over the coming months. If you are interested in accessing Libra testnet data, we plan to add it to our Network Data Pro package in the near future. Reach out to info@coinmetrics.io for more info.

The markets rallied over the past week with Bitcoin leading the charge (19.77% week over week market cap growth) and Ethereum close behind (13.70% week over week growth). Interestingly, Ethereum led Bitcoin in terms of realized cap (which we define as the sum USD value based on the USD closing price on the day that a native unit last moved, i.e., last transacted, for all native units) growing 2.63% and 2.20% over the last week, respectively. This is possible because 67.6% of ETH supply has been active in the last year compared to 42.8% of BTC supply:

Mining revenue also grew over the past week. Bitcoin led the way in terms of overall mining revenue, with $139.36M. Zcash also had a good week, growing 24.14% since last week:

Gemini Dollar (GUSD) is on the decline. Gemini Dollar active addresses (which we define as the number of unique addresses that were active in the network either as a recipient or originator of a ledger change that day) have fallen below 100 per day, 10 times less than the next least active major stablecoin on the Ethereum chain, Paxos:

The number of BTC held by BitMEX dropped from 246k at its ATH in March this year to 207k currently. This marks the first time BTC supply held dropped significantly since the BCH fork in August 2017:

Two major developments occurred over the past week: the announcement of Libra, Facebook’s cryptocurrency, and further confirmation of the shift in the Fed’s future monetary policy as described in the latest Federal Open Market Committee’s statement. In both cases, the overall market has responded in a discerning manner.

In response to the latest macroeconomic developments, assets that can lay some claim to being a store-of-value experienced strong gains, including Bitcoin (+19%), Ethereum (+13%), ZCash (+13%), Monero (+21%), and Binance Coin (13%). Facebook’s announcement also contributed to these gains, as these assets also operate in areas that Libra will avoid, so they can reap the benefits of increased exposure without increased competition from Facebook.

Most other assets, however, were flat for the week or declined in value, including EOS (0%), Stellar (-4%), Cardano (+3%), Basic Attention Token (-4%), and several others. Although the scope of Libra’s use cases are not yet well-defined, there is the possibility that it could compete in the narrower domains that several of the smaller assets are operating in.

Bitcoin outperformed the majority of CM’s coverage universe:

As has been the case recently, this last week, Bitcoin continued to lead the market and outperform most other assets. As is often the case, once Bitcoin starts outperforming there is a significant rush to the king of crypto and the rest of the market falters. In particular, lower cap and less liquid assets suffer the most as investors sell into Bitcoin as to not miss out on Bitcoin’s run.

This can be seen below where the Bletchley 10 and Total have performed the best (with 65% and 59% Bitcoin respectively) and the Bletchley 40 which is comprised of less liquid alt coins performed the worst.