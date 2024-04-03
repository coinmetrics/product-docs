# Using On-Chain Data to Investigate the Fall of FTX

**Date:** 22-11-15

In a shocking turn of events, FTX suffered an unexpected downfall. In this State of the Network issue, we use on-chain data to investigate the details surrounding FTX’s fall.

On November 2nd, Coindesk published an article stating they had obtained a copy of Alameda Research’s balance sheet, which showed that it was holding billions of dollars worth of FTX’s FTT token. Alameda Research was a trading firm founded by Sam Bankman-Fried (SBF), also the CEO of FTX, formerly one of the largest exchanges in the world.

Even though they were both founded by SBF, Alameda and FTX were theoretically supposed to be two separate entities with separate CEOs and balance sheets. However, the FTT token was issued and controlled by FTX, so questions began to circulate about how independent Alameda and FTX truly were.

Then on November 6th, the CEO of Binance, who is commonly known as CZ, tweeted that “due to recent revelations that have came [sic] to light,” Binance would be liquidating the rest of the FTT they had on their books. Binance, the largest crypto exchange in the world by quite a margin, received roughly $2.1 billion of FTT as part of an investment exit in 2021.

Despite assurances from SBF and from Alameda CEO Caroline Ellison that FTX was fully audited and that there was nothing to worry about, the market disagreed. By the night of November 7th, the price of FTT began to drop from above $22 to less than $16, even though Ellison had tweeted that Alameda would “happily buy” all of Binance’s FTT for $22 a token.

The next day, Binance announced after only 24hrs of doing due diligence that they would not be going through with the acquisition. By the end of the week, FTX, FTX.US, and Alameda had all officially filed for Chapter 11 bankruptcy.

FTX at first appeared to fail out of nowhere. But as more details have come to light, it has become evident that FTX and Alameda were in trouble long before the collapse. For example, multiple reports have emerged that FTX was allegedly loaning customer funds to Alameda without customer consent. Furthermore, there are allegations that SBF may have had a “back door” in the FTX software that allowed him to move funds between the companies without alerting others.

The details are still coming to light and will probably take months, if not longer, to fully emerge. But using on-chain data, we can start to put together some pieces of the puzzle by tracing Alameda’s public transactions on the blockchain.

Using Coin Metrics ATLAS we discovered a large transfer of over $4B worth of the FTT token on September 28th. After looking into the transaction, the FTT apparently belonged to Alameda Research and was set to vest automatically to them after a lockup period. Although unusually large, this initial transaction was not immediately suspicious.

Transfer from Alameda address to FTT Deployer Contract; Source: Coin Metrics ATLAS

However, we also found another transaction that showed that after the tokens were automatically unlocked, Alameda almost immediately sent them to the FTT token deployer contract. This is highly unusual since deployer contracts are not typically used to receive large transfers. The FTT deployer contract is likely connected to FTX, considering FTX launched and managed the FTT token.

This September 28th transaction may have been a roundabout way for Alameda to repay FTX for a large loan. In short, Alameda may have blown up in May or June 2022, along with the LUNA collapse and 3AC collapse (amongst others). However, FTX could have provided Alameda with a loan at the time to cover the losses. If this was the case, it’s unclear where this loan came from or which assets it included. Furthermore, there is currently no known on-chain evidence of such a loan, so if it did occur, it likely happened off-chain.

It’s important to note that this theory is still speculative and unproven—it is based on on-chain activity—but there is still no definitive “smoking gun” proving FTX provided a loan to Alameda. But more and more evidence is starting to pile up. On November 10th, Reuters published an interview with former FTX executives where a transfer of the same size was mentioned:

Seeking to prop up Alameda, which held almost $15 billion in assets, Bankman-Fried transferred at least $4 billion in FTX funds, secured by assets including FTT and shares in trading platform Robinhood Markets Inc, the people said. Alameda had disclosed a 7.6% share in Robinhood that May.

Also, on the 10th, the Wall Street Journal published an article alleging Alameda Research owes FTX about $10 billion and that FTX extended loans to Alameda using customer deposits. On the 11th, Reuters reported that at least $1 billion of client funds were missing from FTX. Former Alameda CEO Caroline Ellison even reportedly confirmed the use of client funds in a meeting with Alameda employees:

Around the time the crypto market crashed this spring, Ms. Ellison explained, lenders moved to recall those loans, the person familiar with the meeting said. But the funds that Alameda had spent were no longer easily available, so the company used FTX customer funds to make the payments.

Further complicating things, late Friday night hundreds of millions of dollars began to mysteriously flow out of FTX, leading to questions about whether the exchange had been hacked.

Alameda and FTX were involved with many other entities and networks in the crypto ecosystem. Alameda was an influential market marker and had a significant presence in decentralized finance (DeFi). FTX was a large borrower and lender and invested in and supported many ecosystems and tokens. FTX also had a long list of venture capital investors, including Paradigm and Sequoia Capital.

Some of the Ethereum DeFi protocols that Alameda was involved with include AAVE, undercollateralized lending/credit protocols such as TrueFi and Clearpool Finance, as well as Abracadabra—an overcollateralized lending platform where users can mint MIM (a USD pegged stablecoin). Although active participants in the Ethereum ecosystem, there’s no immediate on-chain evidence that would explain how Alameda was able to lose billions of dollars.

Alameda and FTX were also big backers of the Solana ecosystem. Alameda Research was an early Solana investor that contributed to its private token sale, and FTX supposedly held about $1 billion of SOL on its balance sheet at the time of collapse. Additionally, FTX held large amounts of the Solana-based Serum (SRM) token and may have even minted SRM to help prop up their balance sheet. The Solana Foundation reportedly invested in FTX and has tens of millions of dollars stranded on the exchange.

FTX and Alameda’s losses have already had cascading effects throughout the industry. On November 10th, crypto lender BlockFi paused withdrawals and limited other client activity following FTX’s collapse. BlockFi has since denied rumors that assets were custodied on FTX. BlockFi brokered a $680 million deal with FTX.US in July that included a $400 million line of credit.

On Monday the 14th, some questions started circulating about Crypto.com after it was revealed that the exchange supposedly accidentally sent 320k ETH (about $400M) to the Gate.io exchange in October. Crypto.com’s CEO responded by claiming that Gate.io had returned the transfer and that Crypto.com’s exposure to FTX was limited to $10 million.

Crypto.com has a similar business model as other tokenized lenders that collapsed. However, given the precedent set by FTX’s use of the FTT token, we wanted to see if there were unusual CRO transfers over the past month.

Using on-chain data, we also found three large transfers of at least 1B CRO each on October 11th. These transfers all went to the same wallet, which now holds over 3% of CRO’s supply.

It is unclear what this transaction constitutes. It is entirely possible that it simply represents a cold wallet shuffle, which is when funds are sent to a fresh address controlled by a new key. However, given the significance of the FTX collapse, we expect market participants to require more transparency from tokenized lenders such as Crypto.com, especially when such large quantities of the lender’s native tokens are moved on-chain.

In addition to exchanges, hedge funds and other trading firms are at risk of losing some or all of their funds due to being locked on FTX. On November 10th, Genesis Trading disclosed that its derivatives business had about $175 million locked on FTX. On Monday, crypto hedge fund Ikigai announced that a large majority of the fund’s total assets are stuck on FTX. Unfortunately, other firms are likely in a similar situation but are yet to announce it publicly.

Many other investors are responding by removing their funds from exchanges entirely. Across the exchanges that Coin Metrics tracks, at least 120K BTC and 1.4M ETH have flown out of exchanges over the past week.

The movement of funds off exchanges is also evident in the sharp increase in wallets on-chain holding relatively smaller amounts.

One potential silver lining of the situation is a new rush for exchanges to implement Proof of Reserves - in other words, to publicly share which addresses they hold their client funds in (the exchange’s assets) while allowing users to verify using cryptographic primitives like Merkle trees to confirm that they are included in the set (the liabilities side of the equation). Publishing these addresses allows independent firms like Coin Metrics to verify exchange holdings, which helps hold exchanges accountable.

In the wake of the crash the main narratives around DeFi are also resurfacing with new urgency. FTX was a centralized entity that utilized crypto rails—it was by no means ever a decentralized protocol or a part of the foundational layers of crypto. The value proposition for truly decentralized protocols has never been clearer. Although regulators will likely redouble their spotlight on crypto, the industry is poised to come out the other end even stronger, hopefully with an even greater appreciation for true transparency.

We witnessed record on-chain volumes as the world responded to the ongoing FTX–Alameda crisis. We saw a large increase in active addresses across stablecoins as everyone sought to reduce their risk exposure; Binance USD active addresses increased by 85%, while USDC rose by 69%. FTT experienced a catastrophic price collapse, spurring daily coin transfer by 885% over the last week.