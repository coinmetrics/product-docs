# Tracking Exchange Wallets

**Date:** 22-12-06

Recent events have ignited discussion surrounding digital asset custody and counterparty risk. We believe it is an important time to offer some perspective on crypto asset exchange data from the view of a crypto data firm. Coin Metrics has long served exchange-specific metrics that shed light on crypto asset supplies held on exchange and the flow of funds between users and exchanges. In this week’s State of the Network, we discuss how to track crypto asset exchange balances on public blockchains as well as some of the difficulties. We conclude with some data from Gemini to illustrate some of the key ideas.

Crypto assets offer analysts a degree of data that is generally unavailable with other financial assets. Take bitcoin (BTC) for example. Every transaction in BTC’s history is recorded on a public ledger that is readily available to analyze for anyone that would like to run a BTC node. This allows crypto data analysts to construct detailed observations about every coin’s whereabouts and movements. When enriched with additional information about on-chain entities, this data can be very insightful for determining where and how BTC is flowing.

Crypto exchanges control wallets that store, receive, and send BTC so that their customers can trade and hold funds on the exchange (note that we refer to a “wallet” as a collection of addresses). But tagging these exchange wallets is a non-trivial problem. From the view of an on-chain observer like Coin Metrics, exchange wallets are simply lists of pseudo-anonymous crypto addresses that interact with other addresses to send and receive coins.

Identifying an exchange’s addresses usually starts by getting some seed information: some addresses known to be definitively associated with this exchange. Some external sources offer this (explorers, dedicated websites), other times, this is obtained by expert knowledge or by direct admission from the exchanges via social media or other sources.

Once a foothold is gained into an exchange’s wallet, its structure can be determined. In general, exchanges segregate long-term custody assets from funds used to cover daily activities, but this structure is not always respected — as was the case with FTX.

There is no universal approach to exchange wallet management; however, most exchanges conduct their operations with three different types of addresses.

Deposit addresses

Addresses that receive user deposits from users. These addresses usually don’t hold a balance for long periods of time and immediately transfer and consolidate balances to a common collection wallet (i.e., hot wallet).

Sometimes deposit addresses are created for each individual deposit, other times, they are unique at the exchange user level and can be reused if the user makes multiple deposits to the exchange.

“Hot” wallet

A common collection wallet — composed of one or more addresses — that receives funds from deposit addresses and maintains reserves for customer withdrawals or moves overflow reserves to more secure cold storage wallets if sufficient reserves are available.

Hot wallets are generally identifiable by high levels of on-chain activity.

“Cold” wallet

A secure long-term storage wallet — comprises one or more addresses — that holds large balances and transacts infrequently.

Given the significant amount of funds they tend to hold, the management of cold wallets should be sophisticated and highly secure. The private keys for assets held in cold storage are entirely offline and disconnected from the internet or other systems. As Coinbase describes here, this can mean a number of storage techniques ranging from physical isolation (e.g. vaults in the Swiss Alps) to hardware security modules (HSM).

An increasingly popular method of digital asset security is Multi-Party Computation (MPC) which involves breaking up private keys into encrypted shares divided across a number of participants.

The flow chart below shows how this classic wallet structure tends to work.

At the top are users (e.g. User A, User B) that would like to deposit their BTC or other assets to the exchange. As described above, the exchange will typically assign each user one or several deposit addresses that they can send coins to with their own wallets.

When the exchange detects that one of these addresses has received funds, it sweeps them into a hot wallet, pooling all users' deposits together in a small set of one or more addresses. As a quick aside, the mass consolidation of deposit addresses can sometimes cause spikes in on-chain activity, as was the case with the sharp increase in ETH active addresses this past summer coinciding with a Binance hot wallet consolidation. Thus, pinpointing an exchange’s on-chain activity can help blockchain analysts decipher real increases in adoption from innocuous intra-exchange movements.

If the exchange determines that the hot wallet has too many funds in it (i.e., if it believes it has sufficient reserves to cover daily withdrawals), the excess is usually sent to the cold wallet – a more secure setup where private keys are safeguarded and kept offline. On the other hand, if the exchange doesn’t have enough funds, it will tap the cold wallet to top up the hot wallet to help handle withdrawals (e.g. User E, User F).

Coin Metrics tags exchange wallets using this classical structure as a guide. It’s important to note that some exchanges deviate from this model making it harder for blockchain observers to track down funds. Without going into too much detail, the root cause of the challenges usually arises from a lack of address reuse and inability to establish a strong footing without the ground truth. Also, the exchange may not devolve sufficient information about its wallets — as was the case with FTX. In retrospect, the inability to locate FTX cold wallets on-chain was a red flag.

But blockchains comprise complex networks of transfers between participants and exchanges tend to have a strong on-chain footprint with large, concentrated pockets of activity. In the next section we offer an example where we have identified an exchange’s holdings with a good degree of confidence.

Recently, US-based crypto exchange Gemini launched the Gemini Trust Center—a metrics dashboard disclosing funds held on exchange. The dashboard includes crypto and fiat holdings. As of December 1st, the dashboard lists total crypto holdings of $4.8B broken down by $2.3B of BTC, $1.8B of ETH, and $700M of other crypto assets.

While this is an encouraging step in transparency, exchanges can go further by implementing Proof of Reserves. For more information on Proof of Reserves check out CM co-founder Nic Carter’s writings on the topic here.

Nevertheless, this offers us some data to compare against. At a BTC price of $17K this implies ~137K BTC held on the exchange (just over 0.70% of all BTC). This closely matches the 137K BTC held by addresses that Coin Metrics has tagged as being controlled by Gemini. Note that we are not perfectly matching but this is simply due to a small amount of tagging discrepancy; as you will see below we have tagged hundreds of thousands of addresses for Gemini and edge cases can exist where it is difficult to determine the ownership of a specific address without confirmation from the entity itself.

The balance held on exchange has fallen sharply as of late as users have sold or chosen to withdraw funds to self custody following the collapse of FTX.

How is this BTC split up on-chain? First note that to-date, we have tagged over 339,000 BTC addresses associated with Gemini. Studying the activity level of these addresses can help us categorize them into deposit addresses and hot and cold wallets.

The first observation we can make is that the majority of funds (126K BTC) are held in the top 10 addresses. Using data from Coin Metrics’ ATLAS blockchain explorer, we’ve listed the top 10 addresses we tag as Gemini by BTC balance as of December 1, 2022. We can see that some of the larger addresses are fairly old — created in 2015, 2016 — and have relatively small amounts of credits and debits. These older and less active addresses meet the description forming a cold wallet as described above.

The top address, 38UmuU… has characteristics of belonging to a cold wallet, going through many periods of inactivity over its lifetime. The chart below plots the balance of this address over time.

Taking another one of the less active addresses (likely another part of the cold wallet) we can see the balance of 3DwVjw… has remained largely unchanged in its history. It has been inactive since December 2021 and currently holds 9,000 BTC (~$155M).

On the other hand, we can also see that one address in the top 10 is particularly active (bc1quq…), which is typical for an address in a hot wallet that is handling user withdrawals frequently. This address has over half a million credits and debits since its creation in 2019. Its supply is constantly changing as demand for withdrawals ebbs and flows, but tends to hold under 5K BTC.

Further confirming our understanding of the relationship between the addresses above, we can see that the last time the cold wallet 38UmuU… was debited in June 2022, it sent 5,000 BTC to the hot wallet bc1quq… above. This is a typical flow of funds within an exchange’s wallets to help meet accelerated demand for withdrawals.

Continuing our search across these addresses, we observe that 337K or 99% have a balance of 0. Going back to the diagram earlier, these are deposit addresses created just for deposits to exchange. Here is an example of such an address. Notice how the funds are moved within a week; the address is simply a pass through.

In this issue we have laid out some core principles behind exchange wallet management and digital asset custody.  Recent events have prompted users to seek better information about crypto asset custody on exchanges. Encouragingly, many exchanges have responded with new information about assets they hold and, better yet, plans for Proof of Reserve implementations. Equipped with the right Product Documentation, we believe users can benefit by looking at blockchain data themselves to better understand the location of their funds.

Network activity across most digital assets has decreased compared to previous weeks. This decrease is likely due to the recent FTX and Alameda debacle, which caused an increase in network activity. The decrease in activity seen now is a return to normal levels. Activity in UNI is on the rise, possibly due to their recent release of Genie, an NFT aggregator which Uniswap acquired earlier this year, as well as an upcoming $5M USDC airdrop to certain historical Genie users.