# Introducting Quarterly Supply Inflation Reports

**Date:** 20-08-11

The following is an excerpt from a full announcement of our new Quarterly Supply Transparency Report (truncated due to space). You can read the full piece here.

Part of Coin Metrics’ mission is to provide the community with transparent cryptoasset market and network data that allows investors to make the most informed decisions. One of our most recent metrics, Free Float Supply, has provided Coin Metrics with the opportunity to gain visibility into the activities of strategic stakeholders in cryptoasset networks and report our findings to our community on a quarterly basis. We perceive this type of reporting to be akin to traditional equity markets which mandate that company insiders and other strategic stakeholders (e.g. those that own >5% of shares) report their holdings to governing bodies, which in turn are promptly made public.

Having only released the Free Float Metrics one month ago, our first report is being released slightly behind schedule. But moving forward the Quarterly Transparency Report will be released on a regular schedule, which we will be announcing soon.

At the highest level, analyzing and understanding the changes in Free Float Supply have allowed Coin Metrics to identify and better understand the inflation rate of cryptoassets. It is widely known that Proof of Work or Proof of Stake blockchains have a rate of inflation from the issuance of tokens to miners/stakers. But what is less understood is the inflation rate of cryptoassets like Stellar, Cardano, XRP, or Chainlink. Whilst these tokens all have fixed or deflationary total on-chain supplies, the transition of restricted assets (such as those held by stakeholders) into the supply available to the market can be perceived as inflation.

Evidenced above, Free Float Inflation Rates across cryptoassets vary vastly. There are also several results that may seem non-intuitive at first glance, again highlighting the importance of understanding the full context of an asset before passing judgment. Some of the glaring oddities include:

Huobi Token’s high deflation - Whilst Huobi undergoes routine token burns, on March 1, 2020, Huobi burned 147.4m HT of a total 500m outstanding HT. This one-off burn followed a community vote to remove assets assigned to the Platform Operation and Investor Protection Fund.

In instances where a cryptoasset’s Free Float Supply is relatively small compared to its total On-Chain Supply, new issuances from foundation addresses can significantly impact inflation levels, as witnessed in the case of Crypto.com Coin (CRO).

Dogecoin deflation - In the case of blockchains that are older than 5 years, Coin Metrics Network Data tools identify addresses whose assets have not been sent in over 5 years. Assets in these addresses are classified as belonging to long term strategic holders of a network and thus considered restricted from liquid supply. In the case of DOGE over the last 12 months, assets that have fallen into this category have been larger than those issued by the mining issuance schedule, thus resulting in a net deflation of Free Float Supply.

In the early stages of crypto assets, the primary categories of stakeholders that restrict supply are foundations/companies and team members. Very few chains have aged more than 5 years, thus have no ‘provably’ long term strategic holders, and there has been little burning that has taken place other than from some revenue-generating businesses that operate tokens (e.g. exchanges like FTX or Huobi). To that extent, the majority of changes to supply disclosed in the Quarterly Supply Transparency Report are from the movement from Foundation/Company or Team owned addresses.

The chart below displays the foundations/companies that have been most active over the last 12 months manage some of the largest market capitalization crypto assets, including XRP, Stellar, Crypto.com Coin and Huobi.

Note 1: In March 2020, Huobi Foundation burned $422M worth of HT

Note 2: In November 2019, Stellar Foundation burned $4.14B worth of XLM

The net value of cryptoassets that moved outside of identified Foundation/Company controlled addresses in Q2 2020 was $743M, down from $891M during the previous quarter ($148M less). However, on closer observation, $422M of the assets moved outside of foundation addresses in Q1 2020 were from the Huobi burn of 147M HT. If we were to exclude this from Q1 values since it was a burn, distribution of assets from foundation address increased $274M or 58%.

Continue reading here...

Ethereum’s (ETH) growth slowed this past week, at least temporarily. After surging last week due to the rapid rise of decentralized finance (DeFi), ETH active addresses were about even for the week. ETH transactions grew by just 0.9% week-over-week, while transfers declined by 1.4%.

Bitcoin (BTC) usage was also fairly flat for the week, with active addresses growing slightly and transfers dropping by 2.0%. On a positive note, BTC estimated hash rate was up 3.0% week-over-week and continues to hover near all-time highs.

On paper, total supply seems like one of the most straightforward cryptoasset metrics to calculate. But in practice calculating ETH’s total supply is tricky, as many found out over the weekend.

One of the advantages of cryptoassets is that they are inherently auditable. Unlike traditional assets, anyone can audit the supply and full transaction history. The entire Bitcoin blockchain can be replayed by running a node and tracking the unspent transaction outputs (UTXOs) that are included in each block. After replaying the whole chain, the remaining unspent outputs make up the asset’s ledger. Summing up their value gives the asset’s supply.

But for other blockchains, auditing supply can be more complicated. Ethereum, for example, uses an account-based model which requires auditors to track credits and debits for each account on the chain. Further complicating things, Ethereum has made some implicit ledger edits, where the ledger was changed but the change was not included in a transaction or block. Implicit ledger edits are not unique to Ethereum - other account-based blockchains, like Tezos, have had similar issues.

In State of the Network Issue 30 we analyzed Ethereum’s previous internal ledger edits as part of a deep dive into the auditability of different cryptoassets:

For example, following the DAO attack, Ethereum experienced a hard fork to return funds withdrawn from the DAO to another address not controlled by the person behind the unexpected DAO withdrawals. Those changes to the ledger are implemented in the code run by the nodes, not in a transaction nor in a block. Unfortunately for auditors, neither the block raw data nor the tracing data indicate that those changes occurred. The only way to capture those credits and debits is to find the hardcoded list of affected addresses and emulate what edits the code ran over the ledger.

Taking this and other edge cases into account, we can calculate ETH’s total supply: 112.1146M as of August 9th.

But verifying on-chain supply is just the first step in understanding a cryptoasset’s true supply. Cryptoasset supply can be permanently lost or burned, which should be accounted for (we detailed some examples of this in State of the Network Issue 26 - How Many Bitcoins Are Permanently Lost?). Additionally, certain cryptoassets have supply that is staked or held by an official foundation, effectively removing it from liquid supply.

To account for this, Coin Metrics developed “free float supply,” which was introduced in State of the Network Issue 57. Free float supply takes a methodical approach to identifying supply that is highly unlikely to be available to the market in the short to mid-term. ETH’s free float supply is 108.0168M as of August 9th.

Interestingly, ETH’s free float supply percentage (i.e. the percent of total supply that is liquid) is higher than Bitcoin (BTC), Ripple (XRP), Litecoin (LTC), Bitcoin Cash (BCH), Tezos (XTZ), and Cardano (ADA). About 96.35% of ETH supply is freely available to the market at time of writing.

Ultimately, it’s important that data providers operate their own nodes to get a full picture of what is truly happening on-chain. When it comes to important metrics like on-chain supply, the old adage always rings true: don’t trust, verify.

The markets cooled off this past week after last week’s ETH fueled surge. BTC and ETH are both up 5%, while Ripple (XRP) finished the week even.

ChainLink (LINK) continued its run, up 67% on the week with price reaching new all-time highs. LINK’s trading volume even temporarily passed BTC’s trading volume on Coinbase. ChainLink is a decentralized oracle network that’s used in decentralized finance (DeFi) apps like Synthetix. Over the weekend, over $20M worth of LINK short positions were liquidated on Aave, a DeFi platform built on Ethereum. This led to questions whether the short positions were part of an elaborate marketing campaign designed to pump LINK’s price higher.

Ethereum Classic (ETC) was the only major cryptoasset down on the week, with a 4% loss. Over the past week ETC suffered multiple 51% attacks and a successful double spend of $5.6M, a massive security breach that poses an existential threat to the Ethereum Classic network.

As the CMBI Bitcoin Index and CMBI Ethereum Index took a breather from their last two weeks of strong returns, it was the alt-coins that saw the most action this past week. The Blethley 40 (small caps) experienced the greatest returns, growing 20.7% for the week. The Bletchley 20 (mid caps) and Bletchley 10 (large caps) also both outshone the single asset indexes, returning 9.0% and 7.4% respectively.

Interestingly, despite the Bletchley 10 and Bletchley Total growing the least of the market cap weighted indexes, their even counterparts both outperformed the Bletchley 20 Even fairly substantially. This is largely the result of Bitcon and Ethereum composing the majority of the market cap weighted Bletchley 10 (68% BTC, 13% ETH) and Bletchley Total (63% BTC, 12% ETH).

Update to the Bletchley Indexes: As of the 1st of September, Coin Metrics will take the next step to integrate the Bletchley Indexes into Coin Metrics, transitioning all infrastructure over to Coin Metrics owned systems and updating all pricing sources to Coin Metrics Reference Rates. As part of the transition, Coin Metrics will be updating the history of the Bletchley Indexes to reflect Coin Metrics historical reference rates. Further, going forward, we will also be expanding the universe of assets available for selection which will result in a significant turnover in the index during the September Rebalance.

This is an exciting step for Coin Metrics that allows the company to wholly own, manage and have transparency into the current and historical pricing data as well as overcoming anomalies that currently existed from methodologies that are not administered and calculated by Coin Metrics.