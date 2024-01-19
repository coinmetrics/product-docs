# The Privacy Issue

**Date:** 20-09-01

The early 1990’s saw the dissemination of two great forces that would come to shape the next decades: the Internet, and strong cryptography.

In a seminal manifesto written in 1993, Eric Hughes condensed the ethos of a young movement born at the intersection of these two technologies: the Cypherpunk. Determined to defend privacy in an age of already ever-growing surveillance, their tools would be cryptography and software: cypher + cyberpunk.

“We the Cypherpunks are dedicated to building anonymous systems. We are defending our privacy with cryptography, with anonymous mail forwarding systems, with digital signatures, and with electronic money.”

Satoshi Nakamoto provided the cypherpunks with lasting electronic money 15 years later. In its wake, many other anonymous electronic money systems would be created, incorporating the latest developments in cryptography.

In this feature, we’ll look into how the current anonymous transactions systems, aka crypto-currencies, compare to the privacy hopes of their cypherpunk forefathers.

“Privacy is the power to selectively reveal oneself to the world.” – “A Cypherpunk’s Manifesto”

Compared to traditional transaction systems involving fiat currencies, crypto-currencies offer a lot of privacy. Freed from the need of proving the identities of those involved and the source and usage of funds, crypto-currencies only require its participants to reveal very little, if any, information about themselves. Yet, over time, even this proved to be too much as many attacks that de-anonymize Bitcoin transactions have been found.

Some of these shortcomings were foreseen by its creator, like the need to never reuse public keys, or the information that multi-inputs transactions leak, making it possible to associate many public keys to the same owner.

Over time, techniques that improve the privacy of Bitcoin users were developed, most notably CoinJoin, which allows users to “mix” their bitcoins together, making tracing their transaction history nigh impossible.

Quantifying CoinJoin is not easy since it is beneficial for its users to conceal it, but so far its usage is far from generalized.

These issues, making Bitcoin a good-enough-but-not-ideal anonymous transactions system, led some Cypherpunks to do what they do best: write code. Many new crypto-currencies, focused on better privacy, have been created over the years. In this feature, we’ll focus on three:

Zcash was created in 2016 as a codebase fork of Bitcoin. It integrated a recent development in cryptography: zk-SNARKs (Zero Knowledge Succinct Non-Interactive Arguments of Knowledge), which enables nodes to validate transactions without knowing their contents. Private Zcash transactions therefore do not reveal anything about who transacts or what amounts are exchanged. The protocol, however, allows for so-called transparent transactions which are identical to Bitcoin’s. This makes Zcash’s strong privacy features opt-in.

Zcash’s supply can be broken down into two types: shielded and transparent. The transparent supply is similar to Bitcoin’s and is fully auditable.  Zcash held in the shielded supply can be exchanged privately using zk-SNARKs. As of writing, only around 5% of all issued ZEC is currently shielded.

Since Zcash’s privacy features are opt-in, we can also measure what percentage of transactions make use of them:

Zcash’s transactions can be further divided into three categories:

Transparent transactions which only interact with transparent supply

Partially-private transactions which exchange ZEC between the shielded and transparent supplies

Fully-private transactions which only interact with the shielded supply

Less than 2% of transactions belong to the last category, despite a recent surge in activity.

Monero was created in 2014 and uses the CryptoNote technology built on top of ring signatures and Confidential Transactions. These allow someone to prove they belong to a group without revealing which member they are. Therefore, compared to Bitcoin, it is impossible to determine the sender of a Monero transaction: the multi-inputs transaction information leak is fixed. In 2017, Monero also adopted Bulletproofs, an even more recent cryptography advancement which hides (blinds) the amounts received.

Grin is the youngest of these new crypto-currencies. It is an implementation of a 2016 innovation called MimbleWimble which leverages new advancements in cryptography to allow its users to conceal not only the amounts and public keys used, but also obfuscate the transaction graph: if Alice sends Bob money and Bob sends it to Charlie, the transaction can be rewritten as Alice -> Charlie without Bob’s intervention being visible on-chain.

On paper, these alternatives offer stronger privacy than Bitcoin, yet their combined daily transaction count only reaches around 6% of Bitcoin’s. For every transaction on one of these privacy assets there are 16 done on Bitcoin and countless more on assets that offer even less privacy.

“For privacy to be widespread it must be part of a social contract.” – “A Cypherpunk’s Manifesto”

User apathy towards privacy is probably the biggest shortcoming of the current anonymous transactions systems. Despite great technological advancements in crypto-currency privacy, uptake of privacy features and assets has been slow. As crypto-currencies continue to be adopted by the wider public, its original privacy-oriented ethos must be transmitted in order for it to survive.

Failing to do so could result in the original idea of anonymous transactions systems fading away and being superseded by other conceptions of what crypto-currencies are useful for.

On the bright side of things, the advent of Bitcoin renewed interest in research on the topic of cryptography, leading to new innovations like Bulletproofs and Mimblewimble. We can also note a renewed interest in CoinJoin with providers like Wasabi and Samurai’s Whirlpool which, despite representing a very small proportion of Bitcoin’s transaction volume, are growing quickly.

Ethereum’s (ETH) activity continued to  moderate as average daily transactions fees decreased for the second week in row to $3.58M.   Bitcoin’s (BTC) average daily transaction fees saw an even more dramatic decrease (24%) to $1.04M.

Bitcoin (BTC) age distribution bands, also known as “HODL waves,” show BTC’s supply grouped by the age it was last moved on-chain - or in other words, the age that it was last sent as part of a transaction. Introduced by Unchained Capital in 2018, HODL waves give a macroscopic view of how BTC’s supply has shifted over the years.

Reading from the bottom of the chart up, the red and orange colored bands show the percent of supply that has been active relatively recently, ranging from less than 1 day to 30-90 days. This short-term supply tends to peak during market tops. For example, in December 2017 as BTC price neared $20,000 over 32% of BTC supply had moved on-chain within the previous 90 days. By August 2018 the amount of BTC supply moved within 90 days had dropped to about 15%.

Conversely, reading from the top of the chart down shows the supply that has not moved for relatively long periods. These long-term bands tend to grow wider during bear markets and contract during bull periods when long-terms holders begin to sell. The purple band at the top represents coins that have never been moved on-chain other than the initial coinbase transaction.

The lower bands spiked following the crypto crash of March 12th, 2020. But since then the larger bands have been regaining ground. The 1-2 year band has grown from about 16.3% on March 12th to 19.1% on August 12th.

Ethereum (ETH) HODL waves show that ETH short-term bands have been increasingly active in July and August. ETH’s 7-30 day band accounted for about 7.6% of total ETH supply on March 12th. Since then it has grown to over 9.7% in late August. Simultaneously, ETH’s 180 day-1 year band has decreased from about 11% on March 12th to less than 7.3% in late August.

This past week was one of many impressive milestones for the FTX team. There is a lot going on in the space at the moment, so we won’t blame you if you missed it. The highlights include launching the Project Serum DEX, all-time high prices for FTT (FTX’s exchange token), over $1B in monthly volume for the OTC desk, listing a Uniswap 100 Index Future and, of course, the reported $150M deal to acquire the portfolio tracking app Blockfolio.

Serum DEX Launch

Over the weekend the Project Serum (https://projectserum.com/) DEX went live. The decentralized exchange is unique from others in that it is built on the Solana blockchain as opposed to Ethereum, which the team touts as better in terms of processing, as well as having much lower transaction fees while allowing for cross-chain tokenization. The DEX has its own tokens, Serum (SRM) and MegaSerum (MSRM), the latter of which is 1M locked SRM tokens, which can be used for trading discounts on the DEX, staking, and on-chain governance.

FTT Pushing All Time Highs

It should not be a surprise that FTX’s exchange token, FTT, has hit new highs following the news of the Blockfolio acquisition. However, there may be more involved than just pure speculation on the synergies between the portfolio tracking application and the exchange. The exchange has offered airdrops equalling 5% of the total SRM supply to token holders who hold 500 FTT or more on the FTX exchange at a rate of 3 locked SRM per week for every 500 FTT held. At the current market value as of writing (SRM at $3.25 with a total supply of 10B tokens), the airdrop would be worth $1.625B which is roughly equivalent to ~4.06 times the total Market Capitalization of FTT ($400M). Those who are bullish on the team are likely to be putting on this trade, further driving market demand. FTT is breaching its all time highs at roughly $4.23 as of time of writing according to our CM Reference Rates.

This week was a relatively uneventful week for most of the CMBI and Bletchley Indexes, with choppy trading and low volatility resulting in returns of < 2% for all market cap weighted indexes. The CMBI Bitcoin Index also had an uneventful week, finishing the week at $11,644.80 (down 0.3%). However, the CMBI Ethereum Index managed to significantly outperform all other indexes this week, returning 8.2% to close at $425.72.

The CMBI Bitcoin Hash Rate Index again reached all time highs during the week, closing as high as 135,722. With the Chinese wet season well underway, the hash rate continues to reach for ATH levels despite the Bitcoin block subsidy halving back in May.

Important Note: Bletchley Index pricing is being transitioned to CM Reference Rates which will result in three major changes:

Future levels will utilize CM Real-Time Reference Rates

Historical levels will be recalculated to reflect CM Real-Time Reference Rates

The Bletchley Universe will be increased to include more assets from September 1, 2020

For more information please read the recent announcement.

More performance information can be found here:

CMBI Bitcoin Index and CMBI Ethereum Index can be found in the July CMBI Single Asset Index Factsheet.

CMBI Mining Indexes can be found in the July CMBI Mining Index Factsheet.