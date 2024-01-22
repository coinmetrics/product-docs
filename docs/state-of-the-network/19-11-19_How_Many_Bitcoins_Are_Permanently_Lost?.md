# How Many Bitcoins Are Permanently Lost?

**Date:** 19-11-19

Bitcoin’s whitepaper, which recently turned 11 years old, is so concise that it makes only a passing mention of supply:

Once   a   predetermined   number   of   coins   have   entered circulation, the incentive can transition entirely to transaction fees and be completely inflation free.

Diving into one of the earliest backups of Bitcoin’s code, we can find the now-legendary formula that sets the limit on block rewards. These simple lines of code effectively set Bitcoin’s supply at 21M BTC:

Unbeknownst to many, Bitcoin’s codebase does not contain any checks that BTC’s supply does not exceed 21M. Instead, the software checks that each block doesn’t claim more than the prescribed number.

Applying the supply formula to get supply value at block 600,000 on October 19, 2019 gives us 18M BTC:

210,000 blocks * 50 BTC + 210,000 blocks * 25 BTC + 180,000 blocks * 12.5 BTC = 18M BTC

The mining of this block was celebrated by the community as a milestone towards the end of the inflation process for Bitcoin. However, astute observers commented that Bitcoin’s supply didn't actually exceeded the 18M milestone at block 600,000. Pieter Wuille, Bitcoin Core developer, mentioned that the actual supply as of block 600,002 was 17,999,854.82192702 BTC.

In this feature, we dive into why Bitcoin’s supply is lower than expected, and calculate how many coins are permanently lost. Furthermore, we analyze exactly why these coins are lost, and account for what happened to them. We first examine coins that are provably lost, and then analyze coins that are assumed to be lost, but could potentially eventually be found.

Bitcoin’s ledger is made of a set of “unspent outputs” otherwise referred to as the Unspent Transaction Outputs set, or UTXO set. Summing up those outputs’ BTC values give you the Bitcoin supply as seen by a full node.

Bitcoin’s first block, the genesis of its history, contains a transaction minting 50 BTC. However, this transaction’s 50 BTC output isn’t included in the UTXO set. It’s still unclear whether it was an oversight or done on purpose.

The result is that those 50 BTC are not present in Bitcoin’s ledger, even if they are visible in a transaction included in the main chain.

Another oversight from Bitcoin’s designer is the handling of duplicate transactions. While at first glance, it doesn’t seem possible for them to occur (as they contain digital signatures and references to previous transactions which makes them unique), it is still possible to create duplicate transactions.

The easiest transactions to duplicate are the coinbase transactions, which are the first transactions of every block and allow the miner to claim their block reward (the company Coinbase is named after these coinbase transactions), because they do not contain digital signatures or references to previous transactions. If a miner were to create a coinbase transaction paying out the exact same amount of BTC to the same addresses and with the same extra nonce (a small space of the coinbase transaction used to help mining), the transaction would be identical.

This happened twice in Bitcoin’s early history:

Transaction d5d2..8599 was the coinbase output for blocks 91,812 and 91,842

Transaction e3bf...b468 was the coinbase output for blocks 91,722 and 91,880

In each case, the second time the transaction was included, its outputs overwrote the previous ones.

The result is that the two overwritten outputs are not in the UTXO set. Those 100 BTC are not in Bitcoin’s ledger.

While appearing like an innocuous oversight, Russell O’Connor identified this as an attack vector back in 2012. Leveraging duplicate transactions, an attacker could remove other user’s past transactions from the ledger.

In response to this, BIP-30 was introduced in 2012 to forbid new duplicate transactions to be included until the older transaction’s outputs are all spent. However, the handling of the existing duplicates was not changed and they still remain in the chain to this day.

Later in 2012, BIP-34 also made duplicating coinbases much more difficult as they now had to include the height of the block they are part of.

Another set of provably lost coins is linked to the verification of coinbase transactions by full nodes.

Bitcoin’s protocol mandates that the miner of a valid block can credit themselves with a protocol-defined reward plus the fees from the transactions included in that block. Each full node checks that miners don’t try to claim more than they are allowed. However, they do not care if the miner claims less than their share.

Obviously, claiming less than their allotted reward would not be rational behavior from miners, but it has happened a surprisingly large number of times. The first time it occurred was at block 124,724 in May 2011 and the last time thus far at height 564,959 in late February 2019.

The most notable cases are listed in this table:

Broadly, this behavior happened in 3 distinct episodes, totaling 1,221 anomalies. The following chart shows the number of blocks that did not claim their full reward, bucketed by 1000 blocks:

One very intense episode occurred around height 162,000. Another more prolonged one occurred from 180,000 to 230,000 and a last one around block 530,000.

According to Bitcointalk user midnightmagic, the first instance was done on purpose as a tribute to Satoshi Nakamoto, on a suggestion of Bitcoin developer Matt Corallo. For the other cases, given the amounts lost by some miners, they are most likely attributable to bugs in the software used by miners to create the coin generation transaction.

There’s a special type of Bitcoin transaction output called OP_RETURN. They allow users to embed data in the blockchain (up to 80 bytes per output at the moment) without bloating the UTXO set (those outputs do not get added to the UTXO set − they are considered provably unspendable).

While the great majority of such outputs are created with a value of 0 satoshis, some aren’t. As of block 600,000, there were 3.723039 BTC sent to OP_RETURN outputs, making them unspendable forever, and not part of Bitcoin’s supply.

In total, we can compute Bitcoin’s actual supply at block 600,000 working backwards from the expected 18M BTC value and subtracting what is provably lost.

This figure of 17,999,817 BTC as of block 600,000 is the “technically correct” view of Bitcoin’s supply. It’s what you would get by querying your full node. However, we can do better by looking at more cases that render bitcoins practically but not provably unspendable.

Prior to the standardization of OP_RETURN outputs, there was no easily accessible, provable way to burn Bitcoin. As a result, users resorted to “bogus addresses”, which is an address that does not have a known private key.

When creating a Bitcoin address, we usually start from a known private key, then transform it to get the public key address it corresponds to. This process makes it very difficult to generate custom “vanity prefixes” (i.e. vanity public keys) − you basically have to “mine” private keys to find ones whose address starts with the desired prefix.

However, in the case of bogus addresses, there’s no desire to ever actually spend from the address, so there’s no need to know what the private key is. Therefore the bogus address can start with any prefix (if it can be written using the Base58 alphabet). However, the last characters will be random (by design, the last characters of an address are a checksum to prevent against typos).

While it is impossible to draft a complete list of bogus addresses, we can list some notable ones:

Just those 3 addresses account for 2213.19538012 BTC lost as of block 600,000.

In theory, those coins are not lost forever − someone could find a private key for them. However, the only known way to find a private key given only an address is to randomly guess until you find the right combination (i.e. through bruteforce). In practice, the chance of that happening in the lifetime of our universe is pretty slim.

Beneath the beautiful veneers of today’s wallets, there are critical pieces of code responsible for crafting, signing and broadcasting our transactions to the Bitcoin network. Nowadays, it’s rare to find debilitating bugs in them, but that wasn’t always the case.

In November 2011, MtGox fell victim to a bug in this part of their software. They sent 2609.36304319 BTC to a bogus script, with no known way to spend it. The bogus script was what would happen if you tried to send money to an “empty” public key with software not programmed to detect that this is not desirable.

There have been other similar bugs in other assets that rendered coins unspendable, most notably in Ethereum with the Parity self-destruct issue (513k ETH lost).

Another source of lost coins are the ones that haven’t moved in many years. As it’s impossible to know whether their owners still have the keys or don’t, they are often called “zombie coins”, neither alive nor dead. With this category, we leave the domain of quasi-certainty about whether the coins are truly lost.

To stay conservative in our estimate, we’ll only count coins last touched before Bitcoin was traded on the first exchanges (July 2010). The rationale is simple: people that acquired Bitcoins before they could be traded away had less of an incentive to back up their wallets as the perceived value of Bitcoins (at the time) was very low.

At block 600,000, there were 1,496,907.88000 BTC last touched prior to July 2010. According to various estimates, Satoshi Nakamoto purportedly owns more than half of those coins due to their status as the dominant miner for most of Bitcoin’s very early history.

The last time coins last touched prior to July 2010 were moved was in July 2019, when 150 BTC were spent.

Overall, since the 2013 bull run, those coins have been very rarely spent. Given the price appreciation from 2013 to now, either the owners of those coins are very long-term oriented holders, or they don’t have access to these coins.

There’s one final category of coins that could be considered lost, or at least out of circulation for the time being: known stolen coins. Until the advent of better mixing solutions (which is effectively similar to money laundering, making it much more difficult to follow the money trail), they will be difficult to insert back into circulation, especially for very large amounts.

There’s been many major hacks and thefts over Bitcoin’s history, but two jump to mind as “out of circulation” – the 2011 theft of 80k BTC from MtGox and the 2016 theft of 120k BTC from Bitfinex.

In March 2011, 79,956 BTC were withdrawn from MtGox’s wallet, and have not been touched to this day. As of today, it’s the 6th richest address.

Chat between Jeb McCaleb and Mark Karpelès following the theft’s discovery source

The reason why this haul (worth $73k at the time it was stolen, $700M today) was never spent is unknown. Most likely, the thief is unable to access the private key.

In August 2016, Bitfinex lost 119,756 BTC to a hack. To this day, very few of these stolen coins have been moved and only 22 BTC were recovered. As of block 600,000, the addresses where the stolen coins were sent to still held 117,091.31922097 BTC.

The common adage that there will only ever be 21M coins is an optimistic one. Over time, quirks, bugs and other events impact how many Bitcoins actually exist.

From those estimates of lost coins, we can construct three adjusted views of Bitcoin’s supply:

A technically correct one, which counts all but provably lost coins.

A supply that excludes provably lost coins and coins which are assumed to be long lost or burned.

A supply that excludes stolen coins in addition to provably and assumed lost coins.

This analysis is just one of many ways to assess Bitcoin’s true supply. Depending on needs, different categories could be considered, ignored or expanded upon. It also uses a top-down approach, starting from the maximum possible supply and removing various classes of lost or encumbered coins. Another way to estimate Bitcoin’s supply would be to break it down by time of last activity with the expectation that coins untouched for years are probably lost. We will continue to monitor lost Bitcoins, and update our findings in the future.

After three weeks of growth, BTC fees dropped by over 30% over the past week. Although ETH fees only fell by 7.3%, BTC still had average daily fees of over $241K over the past week, compared to $85.1K for ETH.

BTC difficulty continued to drop over the last week, falling by over 4%. However, BTC hash rate bounced back over the past week, growing 2.8%. This signals that BTC difficulty is likely to be adjusted back upwards in the near future, after it was readjusted downward on November 7th.

DAI, the decentralized stablecoin created by MakerDAO, has a supply limit which is officially referred to as its “debt ceiling.”  After DAI reached its debt ceiling of 100M tokens (which is roughly equivalent to $100M) on November 6th, the Maker Foundation quickly proposed an executive vote to raise the DAI debt ceiling to 120M tokens. The vote was executed on November 7th. Since then the DAI supply peaked at 102,979,304 on November 13th, and was 101,640,989 as of November 17th.

In addition to the DAI debt ceiling vote, the MakerDAO community recently voted to approve and activate Multi-Collateral DAI (MCD), which went live on November 18th.  MCD introduces the ability to create DAI tokens backed by collateral from multiple different types of crypto assets, in addition to ETH.

In order to vote on decisions about DAI (and other decisions involving the MakerDAO ecosystem), MKR holders need to stake their MKR to signal support for a specific proposal. MKR needs to be in a designated voting contract in order to be staked.

Examining MKR unique daily active addresses shows that usage spiked on October 9th, when MakerDAO announced MCD, and again on November 15th when the Maker Foundation held a vote to officially approve MCD. Additionally, MKR active addresses spiked on both July 27th and July 28th after the Maker Foundation opened an executive vote on whether to lower the DAI stability fee after it had reached all-time highs.

Most of the major crypto assets dropped in price over the past week. BTC fell 6% over the course of the week, while ETH dipped 3%.

Stellar (XLM) had a particularly down week, dropping 9%. XLM price recently surged on November 5th after the Stellar Foundation burned over half of all XLM tokens. After another temporary spike on November 11th, XLM price has dropped, and is now back close to price levels before the November 5th burn.

ChainLink (LINK) continues its meteoric rise, growing 5% over the week while almost every other major asset was down. Additionally, NEO continued to outperform and is now up 70% over the last 30 days.

Cardano (ADA) also ended the week in the green due to strong growth towards the end of the week. On November 12th, Cardano announced they were beginning the roll out of their incentivized testnet, which is a step towards decentralizing the Cardano network.

All Bletchley market cap weighted indexes were down this week. Once again it was the Large Cap index that performed the worst, falling 6% off the back of BTC and ETH’s performance. The Bletchley 20 (mid-cap) and Bletchley 40 (small cap) Indexes were slightly in the red against the USD, but both returned ~6% against Bitcoin, demonstrating their strong relative performance against Bitcoin and large-cap digital assets.

Interestingly, whilst the Bletchley Total fell almost 6%, the Bletchley Total Even was up almost 5%, further highlighting the weakness of large cap assets this week.

After Bitcoin’s very strong first nine months of the year, it seems that mid and small cap assets have found resistance against their BTC pairs. This is evidenced below where it can be seen that the relative strength of the Bletchley 20, and less so the Bletchley 40 has now persisted for the better part of two months.