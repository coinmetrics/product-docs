# Introducing Coin Metrics' Bitcoin Wallet Metrics

**Date:** 21-12-14

One of Coin Metrics’ goals is to determine the economic significance of public blockchains. We try to achieve this by building metrics that empower people to make informed crypto financial decisions. Among the most interesting features to track for public blockchains is the number of individuals using them. In normal economies, population data is crucial: census data is taken very seriously by most countries as many decisions depend on knowing how many people interact with a given economy.

A recent poll suggest 25% of US investors hold bitcoin. Polls are good tools to gauge public blockchain adoption in a limited geographic area, however extending polls to encompass everyone on Earth is complicated. Another approach is to use the blockchains themselves to answer this question and this is the approach Coin Metrics chose.

As part of our Network Data Pro 5.1 release, we are publishing wallet metrics for Bitcoin which will help in understanding how many people use Bitcoin. In this feature we will explain how we built these metrics, what they tell us about Bitcoin usage and ownership, and their limitations and potential improvements.

An address (or “account”) is the closest thing to an individual on a public blockchain. It’s similar to a bank account: it holds crypto assets, it could belong to one or several people, and people can own several of them. In a crypto transaction, several addresses interact with one another, transferring funds between them.

At first, basic analytics like counting how many addresses were active on a single day or how many unique addresses owned crypto assets were the best available metrics for gauging usage. But drawbacks to this simple method were quickly noticed: it would overcount activity emanating from large services like exchanges, gambling services, and other heavy users of public blockchains. This is especially true for Bitcoin and other Bitcoin-like assets that do not incentivize users to reuse the same address: a single exchange can use millions of addresses.

Heuristics were developed to attempt to group addresses belonging to the same entity together. Addresses owned by the same entity form what’s called a “wallet”. Individuals can still own several wallets but it is much less likely than owning multiple addresses.

The most powerful address clustering heuristic for Bitcoin is called the shared-inputs heuristic. It was known to Satoshi Nakamoto as he mentions it in the Bitcoin White Paper: “Some linking is still unavoidable with multi-input transactions, which necessarily reveal that their inputs were owned by the same owner.” This heuristic is also sometimes referred to as the common-input-ownership or co-spending heuristic.

A Bitcoin transaction creates outputs and spends previous outputs (also called inputs):

In this example transaction, 2 inputs are spent and 2 outputs are created. What the shared-inputs heuristic tells us is that all addresses that are used as inputs in a single transaction are controlled by the same entity and belong to the same wallet. In the case of that example transaction, the addresses 3MgkQfN... and 3FQqsUb... probably belong to the same wallet (or in other words, are owned by the same individual or entity).

There are many other heuristics that have been invented over the years but the shared-inputs heuristic remains the strongest. As with any privacy-reducing heuristic, many techniques have been invented to defeat this kind of analysis. The most well known being CoinJoin where several users build a transaction with inputs belonging to each of them (more on wallet metrics’ limitations below).

Wallet clustering techniques also introduce a new set of problems for network data metrics computation. One of the rules we apply for our metrics is that no metric should incorporate knowledge that was known after the day it is computed for.

This is particularly problematic for wallets, especially in Bitcoin, as the information that several addresses belong to the same wallet is usually revealed when the addresses are emptied of their funds, long after they’ve been credited for the first time.

Therefore, when we compute the number of wallets for a given day, we only use the information that would have been known at that time. This leads to an overcount of the actual number of wallets, but makes the count more consistent over time.

The chart below shows that effect. Computing the number of wallets with future knowledge for past data gives accurate figures in the past, but gives identical data as our methodology when computing day to day.

Using knowledge from mid March 2014, it was clear that a lot of addresses from the early history of Vertcoin belonged to a limited set of users, however it was impossible to know this at that time, hence why our metric doesn’t incorporate it.

An alternative would be to recompute all wallet metrics every day to incorporate all knowledge available. However, due to the amount of computation required this is not an option yet.

This effect is most present for metrics counting with balance (e.g. wallets holding >= 100 BTC), but active wallets metrics are less affected by it.

As discussed above, active addresses will tend to overcount unique Bitcoin users as individuals tend to control multiple addresses. The chart below presents daily active addresses compared to daily active wallets. As anticipated, the number of active addresses is generally higher than daily active wallets, by a factor of about 2. In the last week there were on average roughly half a million active wallets each day compared to about one million active addresses every day.

Wallet metrics provide a better proxy for the number of unique Bitcoin users, but shouldn’t necessarily be interpreted as unique individuals. Address clusters can still be owned by entities such as exchanges that facilitate activity for many different users each day.

Wallet metrics also provide another lens to study the distribution of bitcoin ownership, a topic we recently revisited. The graphs below show the percentage of total bitcoin supply owned by wallets and addresses of various sizes.

The breakdown between address size and wallet size is similar, but large wallets holding 10K+ bitcoin control a slightly larger share of supply vs. addresses with 10K+ bitcoin. This likely reflects large entities’ addresses, such as exchanges, being clustered together into wallets. It is important to note that clustering heuristics can be prone to collapsing into so-called “superclusters'' arising from multiple large wallets merging together. This is one reason why it is critical to understand the limitations of wallet metrics.

The shared-inputs heuristic is a well-established address clustering technique and past research on the methodology shows its high effectiveness. But like any heuristic, there is a degree of uncertainty that must be understood.

First, there is a potential for false positives arising from coin mixing. As described earlier, CoinJoin transactions allow distinct parties to conduct transactions together using shared inputs. To the outside observer, there is no way to tell that the mixed coins belong to multiple parties. As a result, blockchain observers like Coin Metrics are tricked into thinking all these users form a single wallet. However, adoption of wallet clustering defeating measures like CoinJoin remains marginal, with some estimates putting it at around 5% of daily transactions.

Coin mixing is the only way that false positives arise using a shared-inputs heuristic but false negatives are also of concern, i.e. address clusters that the methodology cannot identify. At the most basic level, users that simply avoid co-spending with more than one address they control will not have their addresses grouped into a wallet because of a lack of on-chain information.

Wallet metrics can also be impacted by the relative prevalence of address reuse. In the Bitcoin White Paper Satoshi discourages reusing addresses advising that “as an additional firewall, a new key pair should be used for each transaction to keep them from being linked to a common owner”. Despite the suggestion, on-chain data imply that many Bitcoin users today frequently reuse addresses, with some recent estimates as high as 35% of unique Bitcoin addresses per day having been used previously. Address reuse increases the efficacy of the shared-inputs heuristic by retaining wallet information as new transactions occur.

But even if new addresses are used more often, using additional heuristics could lead to incremental improvements to our Bitcoin wallet metrics. Some researchers have suggested grouping newly generated change addresses with the input address(es). This heuristic assumes that the fresh address is associated with the inputs group as a one-time change address. However, the benefits should be weighed against the costs as this would introduce another vector for false positives. If the false positive rate is too high, over time all wallets will merge with one another. Introducing heuristics with higher false positive rates also requires introducing new heuristics to counter these accidental merges, greatly increasing the methodology’s complexity.

Finally, wallet metrics could be extended to account-based blockchains using alternative heuristics (the shared-inputs heuristic only makes sense for UTXO-based chains). Some past research on clustering Ethereum addresses has proposed heuristics based on exchange deposit addresses and token airdrops.

When users would like to deposit ETH or ERC-20 tokens to an exchange, the exchange will often ask that the user send their funds to a “deposit address” that the exchange controls. The deposit addresses are generally created per customer, so multiple addresses that send to the same deposit address are likely controlled by the same user. The figure below illustrates this:

Another heuristic might be based on token airdrops. The heuristic assumes that users who control multiple eligible addresses will aggregate their airdropped tokens into one address for ease of management.

These are, however, active areas of research with varying degrees of effectiveness.

Ultimately, wallet metrics make use of powerful heuristics to provide a clearer window into the real number of entities that are using a blockchain. However, it is essential to understand the construction of these metrics and their limitations. Wallet metrics can have important economic and social implications as they might be used to better understand supply distribution. But any results should consider the nuances of on-chain data, especially as users dynamically adapt to clustering techniques.

On-chain activity decreased over the week as the crypto markets faced increased volatility. The mean transaction fee on Ethereum was $23 on December 12th, the lowest daily average since October 23rd, reflecting lower activity on the network. On a weekly average, Bitcoin Hash Rate broke past a new all-time high, fully recovering from the sudden ban placed on Chinese miners this past May, exhibiting the network’s resiliency.

Check out our weekly summary video, this week highlighting trends in Bitcoin’s Hash Rate, Ethereum fees, and Stablecoin supply.