# Analyzing the Supply Distributions of Projects with On-Chain Governance

**Date:** 19-12-10

It takes a whole network of people to make a public blockchain work. You need miners to validate and secure the ledger. You need developers to maintain and update the protocol’s code. And you need users and investors who use the blockchain and value its native crypto asset.

Often times, these different groups’ interests are aligned. For example, investors and miners typically both want the price of a cryptocurrency to increase. But in other cases, like in the debate over whether Bitcoin should adopt SegWit, different constituents can have vastly different opinions.

Most people would probably agree that for a blockchain to be successful in the long run it needs some sort of process for aligning on things like protocol upgrades and economic policies. But beyond that, there are countless different opinions about how blockchains should be governed, and even if they should be governed at all.

In this piece, we analyze a specific subset of blockchain governance called on-chain governance, and look at the supply distributions of three different projects that make use of it.

Broadly defined, blockchain governance refers to the processes used to manage how blockchains change over time. This includes changes to the core protocol, but can also include changes to any other part of the blockchain’s ecosystem. The specific governance rules and procedures are unique to each blockchain.

There are two general forms of blockchain governance: off-chain and on-chain governance. In on-chain governance, voting is recorded on the blockchain’s ledger and is therefore publicly viewable and auditable. There are different ways that this on-chain voting can be structured, but it typically involves staking cryptocurrency to express support for an issue.

Off-chain governance, on the other hand, does not involve recording votes on the blockchain ledger itself. Off-chain governance is more nebulous than on-chain governance and can involve many different forms of coordination and signaling, including forum discussions, informal polls, and formalized debate. But ultimately off-chain governance comes down to one critical decision: “voting” through deciding whether or not to change the protocol.

Bitcoin and Ethereum both use forms of off-chain governance. Whenever there is a protocol upgrade, full node maintainers must decide whether they want to adopt the new changes. If they agree with the changes, they update their software. The version of the software endorsed by the majority of the community is considered the “main chain.” Full nodes maintainers can decide at any time to use a different version of the protocol than the main chain and thus create a fork as long as miners also run that version of the protocol.

Off-chain governance typically works relatively smoothly for scheduled protocol updates, like those introduced in Bitcoin Improvement Proposals (BIPs) or Ethereum Improvement Proposals (EIPs). But it can sometimes lead to drawn-out, contentious hard forks, where two (or more) different factions of the community have drastically different ideas of how the chain should proceed. Notably, this occurred after the Ethereum DAO hack, which resulted in the split between Ethereum and Ethereum Classic, and the split between Bitcoin and Bitcoin Cash over what maximum size, if any, blocks should have.

These contentious hard forks led other blockchains to search for new, alternative ways to structure blockchain governance. Partially as a response to the perceived ineffectiveness of off-chain governance, on-chain governance began to gain favor. Starting around 2016, blockchains like Decred and Tezos began to experiment with forms of on-chain governance.

On-chain governance allows users to vote directly for the changes they want made to the core protocol code. Additionally, some blockchains allow the option to vote for economic changes such as setting fee price. These votes can be polls, that serve as a way for the community to coordinate and signal their opinions, or they can be binding, and immediately be put into effect as soon as the vote ends.

Most on-chain votes involve some form of staking. In order to vote, users must “stake” a certain amount of crypto assets, which locks the staked assets into escrow until the voting period ends. If users are caught cheating or committing voting fraud they lose some or all of their stake, depending on the specific rules of the blockchain.

On-chain governance is pitched as solving several problems with off-chain governance. It is described as being more efficient, allowing for quicker decisions on key issues (although it’s still up for debate whether this is a good or bad thing). It also, in theory, takes the power out of the hands of miners and other powerful node operators and puts it into the hands of the token holders.

However, on-chain governance is not without its problems. Most staking protocols give some form of advantage towards large balance holders. This means that the degree of concentration in supply distribution takes on increasing importance for governance systems that rely on on-chain staking. If supply is mostly held by a small number of addresses, those addresses gain huge influence over the governance decision-making process, which can lead to a plutocracy.

In the following sections, we analyze the supply distributions for three different projects that use on-chain governance: MakerDAO, Decred, and Tezos.

MakerDAO, the Ethereum-based decentralized finance platform, uses both polls and binding on-chain voting to govern the DAI stablecoin and to make other decisions for the MakerDAO ecosystem. MakerDAO polls are “symbolic votes used to poll community sentiment towards specific models or data sources.” The Maker Foundation uses polls to gauge community sentiment for different issues, like adjusting the DAI stability fee. MakerDAO also has “Executive Votes.” Executive votes are binding decisions, and the winning option is enacted once voting ends.

Currently, MakerDAO votes are directly proportional to stake. When a poll or executive vote is opened, users vote by staking their MKR on a specific side of the issue. The side with the highest amount of MKR staked by the end of the voting period wins. For Executive Votes, the voting process continues until  “the number of votes surpasses the total in favor of the previous Executive Vote.”

MakerDAO’s most recent Executive Vote, which enabled the community to adjust the DAI debt ceiling and SAI stability fee, was executed on December 6th. The vote passed with a total of 51,910 MKR staked in support. Two addresses accounted for over 66% of the total MKR staked, according to mkrgov.science. Furthermore, MakerDAO has had several votes where a single address has accounted for over 90% of the winning stake, including a vote in October where a single address contributed over 94% of the winning vote.

Therefore, supply distribution is an important consideration when analyzing MakerDAO’s governance. Holders with large balances can have an outsized influence on votes.

To analyze supply distribution, we look at the number of addresses that hold above a certain fraction of the total supply, ranging from 1/1,000th of supply to 1/10,000,000,000th of total supply.

However, MKR’s distribution is a bit skewed, because there are several MKR addresses that pool a large number of tokens for staking. Specifically, the Maker MultiSig Contract and Maker Governance Contract hold 219,296 and 137,084 MKR, respectively. Therefore we excluded those two addresses to create the following adjusted supply distributions, which brings the total MKR supply from 999,999 to 643,609.

After this adjustment, 1/1,000th of the total adjusted supply of MKR, is 643.61 MKR (equivalent to about $324K at current MKR price), and 1/10,000,000,000th of the total supply of MKR is 0.000064 MKR (equivalent to about $.03).

The below table shows stats for addresses holding greater than or equal to 1/X of the total supply of MKR, where X ranges from 1,000 to 10,000,000,000. For example, there are 102 addresses that hold at least 1/1,000th of total MKR supply (i.e. at least 643.61 MKR). These 102 addresses, which are only 0.58% of the total amount of addresses, collectively hold over 509,991 MKR, which is over 79% of the total supply. Given that the most recent vote required 51,910 MKR, these top 0.58% of addresses could be able to control MakerDAO votes if they cooperated.

Note: MKR’s supply is adjusted in the following chart to exclude two Maker Foundation contracts, as explained above.

The number of addresses holding smaller amounts of MKR has been growing steadily over time. But the number of addresses holding greater than 1/100,000th of the total MKR supply (i.e. holding at least 6.44 MKR) has remained relatively flat. Therefore the majority of voting power has been concentrated in a relatively small number of addresses over the course of most of MakerDAO’s history.

Decred’s on-chain voting system also uses staking but does not have staking directly proportional to votes. Instead, Decred users stake DCR in exchange for voting tickets, which gives them an opportunity to both vote and validate the previous block. Every block randomly picks five tickets to vote. Staked DCR is locked until the ticket is selected to vote, and is then returned to its owner along with a PoS reward (source).

Although votes are not directly proportional to the amount of DCR staked, there is still an advantage to having a relatively large amount of DCR. Decred voting tickets each currently cost 144.71 DCR each, which is equivalent to about $2,980. There are currently 28,158 addresses that hold at least 107.83 DCR (representing about 24% of the total DCR supply), which is a little less than the current price of a voting ticket.

Jumping up one level, there are only 792 addresses that hold at least 1/10,000th of DCR supply (i.e. at least 1,078 DCR) which is equivalent to about $22,260 at current price. These 792 addresses hold over 55% of total DCR supply. Given that this group of addresses holds over 50% of supply, they could conceivably control Decred voting if their owners cooperated. However, Decred’s voting ticket system makes this much more difficult to do than in MakerDAO. Since Decred voting tickets are randomly selected, a single user cannot come in and immediately dictate the vote.

The number of addresses holding greater than 1/100,000th of the total DCR supply (i.e. greater than 107.83 DCR) has almost doubled over the past year. Similarly, the number of addresses holding smaller amounts of DCR has also grown. The number of addresses holding more than 10,783 DCR (1/1,000th of the supply) decreased over the course of the year, dropping from 73 to 64.

The Tezos governance process is more similar to Decred than to MakerDAO. Tezos bakers (which is Tezos’ version of miners) vote on issues by staking their tokens. Bakers validate blocks in addition to voting on governance issues, but we will be focusing solely on their voting duties for this analysis.

Additionally, Tezos users can delegate their tokens to bakers, which allows the baker to vote on that user’s behalf. This allows users with less than 8,000 XTZ to still participate (indirectly) in the baking process.

In order to be eligible as a baker, Tezos users must stake a certain amount of XTZ, known as “rolls.” The more rolls a baker has, the higher the chance they have to be selected as a block validator. Tezos rolls currently cost 8,000 XTZ.

There are currently 5,424 Tezos addresses that hold at least 7,399 XTZ (i.e. at least 1/100,000th). These 5,424 addresses collectively hold over 96% of the total Tezos supply. Furthermore, there are 883 addresses that hold at least 1/10,000th total supply (73,999 XTZ), equivalent to about $118K. These 883 addresses hold over 82% of the total supply.

The number of addresses holding greater than 1/100,000th of the total XTZ supply (i.e. greater than 7,399 XTZ) has grown at a slower pace than DCR, increasing from 4,625 at the start of the year to 5,424 today. The number of addresses holding more than 1/1,000,000,000th of the total supply of XTZ (i.e. at least .74 XTZ) has grown significantly faster, jumping from 24,556 on January 1st to over 44,000.

Governance, in general, is an incredibly difficult problem to solve; societies have been trying to govern themselves for thousands of years, to varying degrees of success.

On-chain governance is still at very early stages. MakerDAO, Decred, and Tezos are still in relatively experimental phases, and their governance systems will certainly evolve as the projects progress.

Many people are currently working on ways to improve on-chain governance and blockchain governance in general. For example, quadratic voting has been put forth as one potential improvement.  Furthermore, several projects are working on solutions for online identities, which could also improve the on-chain voting process by aligning voting power to the individual rather than to their stake in the network.

Token distribution will likely continue to be an important metric to monitor, especially as long as staking is involved in on-chain voting. We will continue to track these projects moving forward.

Most major crypto networks stabilized over the past week, with BTC and ETH market cap dropping 0.3% and 1.7%, respectively. Transfer value and fees, however, dropped significantly over the past week. BTC and ETH fees both dropped to weekly lows at the end of the week. On December 8th, BTC had $108,452 total daily fees, while ETH had $39,987.

XRP transactions decreased by 34.1% over the past week, after staggering growth the two previous weeks: XRP transactions increased by over 50% last week after being up over 121% the week before.

Coin Metrics recently released updates and enhancements to our exchange flow metrics. The following two charts are generated using the updated metrics.

The PlusToken scam has been back in the news recently as the wallet continues to shed coins. Reports going back to August claim that Huobi has processed a large amount of PlusToken withdrawals, and on-chain data appears to back that up.

The following chart shows our estimate of Huobi’s BTC supply over the past year. Huobi’s supply started increasing mid-year and shot up towards the end of the year, which coincides with reports of the PlusToken sell-off.

Poloniex has also been in the news for spinning out of Circle, after being acquired in early 2018. Poloniex’s supply of BTC and ETH plummeted after Circle’s acquisition, and are now at their lowest levels since early 2016. It remains to be seen whether Poloniex can recover after the recent spin out.

Ethereum recently completed its scheduled Istanbul hard fork. The protocol upgrade made several protocol changes, including changes to some gas costs, which some developers were apparently not fully prepared for.

The below chart shows the percent of Ethereum contract calls that ran out of gas, from December 6th to December 9th. Contracts running out of gas spiked up to over 1% on December 8th, immediately after Istanbul went live.

Notably, this change appears to have affected Gemini. Gemini has not swept user deposits into its hot wallet since the launch of the Istanbul fork. Each of their attempts has resulted in an “out of gas” error, as noted by Coin Metrics’ resident data archaeologist Antoine Le Calvez. Gemini later fixed the issue, whose root cause was a bad estimate of post-fork gas cost to sweep user funds.

This week, ZCash (+5%) and Bitcoin Cash SV (-7%) saw significant moves in price while the other top assets remained unchanged, although brief periods of elevated intraday volatility were seen.

Tezos, however, continues its track record of short-term outperformance with a +26% gain this week.

The recent launch of Bakkt’s monthly Bitcoin options product marks an important step in the institutionalization of the asset class. Both CME and OKEx have announced they will offer Bitcoin options in the future, joining the ranks of Deribit who already offers option markets. A robust and liquid options market is significant because it allows portfolio managers additional tools to hedge away certain portfolio risks and opens the possibility of creating portfolios with a defined volatility target -- an attractive proposition for pension funds and large institutional investors.

Options also allow market participants to implement specific market views that previously were not possible, namely the ability to bet on future levels of volatility. In time, an index calculated off option-implied volatility levels (similar to the VIX for U.S. equities) are possible. Opportunities in volatility trading will likely be present as market participants gain experience in accurately pricing Bitcoin options.

Current levels of realized volatility, measured over a trailing one-month period, are reaching levels rarely seen over the past three years. Historically, annualized volatility has rarely dipped below 50% and exhibits mean-reverting behavior. For crypto assets, low levels of volatility breed complacency and increase risk-taking through increased leverage or futures positions. Under such conditions, heightened future volatility is likely, as forced liquidations can exaggerate a price move in either direction. Currently, Bitfinex leveraged long positions are approaching all-time highs although BitMEX’s open interest are still at moderate levels.

Most Bletchley Indexes were up slightly over the week, returning 1%-2% as the whole crypto asset market remained relatively flat. Mid-cap assets were the exception with the Bletchley 20 falling 0.8%.

A testament to the stability and general uniformity across the market over the last month is the results of the Bletchley December rebalance. The only change to the large-cap, mid-cap, and small cap indexes was the promotion of Tezos (XTZ) to the Bletchley 10 and the demotion of Binance (BNB) to the Bletchley 20.