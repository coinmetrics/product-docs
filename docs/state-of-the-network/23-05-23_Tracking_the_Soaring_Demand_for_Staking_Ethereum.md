# Tracking the Soaring Demand for Staking Ethereum

**Date:** 23-05-23

Two hundred and fifty days have now passed since Ethereum’s transition to Proof-of-Stake via The Merge, and demand for staking ether (ETH) has never been higher. Buoyed by the successful launch of staked ETH withdrawals last month in the “Shapella” network upgrade, the line to become an Ethereum validator is out the door. In this week’s issue of State of the Network, we examine essential data and metrics highlighting the current state of the Ethereum staking ecosystem.

Prior to the April 12th activation of Shapella, joining Ethereum’s validator set was a one-way street: once becoming an active participant, the lack of any withdrawal function restricted validators from accessing their originally staked ETH and accrued rewards. However, the implementation of withdrawals last month provided the final piece to the life cycle of an Ethereum validator.

As noted in our post-Shapella review from last month, we initially observed strong demand for un-staking. Shortly after the upgrade’s activation, we observed a significant withdrawal of over 1M ETH (around $1.8B) from the Beacon Chain. Validators, who had been eagerly waiting for access to liquidity, took advantage of the opportunity to complete full withdrawals. Within the first two weeks, more than 20K validators requested full withdrawals, allowing them to reclaim their initial 32 ETH stake along with the accumulated rewards. Consequently, these validators ended their participation in Ethereum staking.

To ensure stability in the total number of validators and the amount of ETH securing the network, both full exits and entries are subject to rate limitations. If more validators would like to join or exit than is permissible in a given day, a queue is formed. The chart below illustrates the formation of such a queue. Currently, the network allows for only 1,800 validators to enter or exit per day. In the days following the Shapella upgrade, the exit queue reached as high as 20K validators.

But the tide has shifted dramatically since early May, with a new rush of deposits and validators waiting to be activated and the exit queue clearing out. The entry queue has reached its highest level since the Beacon Chain’s genesis in December 2020, with a total of 64K validators eagerly waiting to participate.

The surge of new validators has helped push the active validator count to a new high of 580K. This count has more than compensated for the short-lived dip in full exits at the onset of withdrawals. As the active validator count nears the threshold of 589K, an in-protocol variable known as the Churn Limit will increase, permitting the activation of an additional 225 new validators each day. However, despite the rate increase, it will still take about 33.5 days to become a validator if you deposit 32 ETH and join the queue today.

To be sure, some of this newly staked ETH represents a re-shuffling of capital between staking operators—especially given the regulatory posture towards “staking as a service” in the US following the SEC’s enforcement action against US exchange Kraken this past February. But since Shapella, the total 4.3M ETH staked has bested the opposing 2.8M total ETH withdrawn for a net positive flow of 1.5M ETH deposited.

Looking at the unique depositor addresses can offer some insight into the source of the new ETH deposits. There has been a rise in the number of unique depositor addresses staking their ETH, perhaps signifying a tick up in demand from a new segment of the market.

The success of Shapella was widely seen as a boost for staking demand. This perception largely stems from the mitigation of risks associated with the upgrade and the new exit liquidity available to potential stakers. However, at the same time the yields offered by staking activities have reached their highest levels since The Merge thanks to a surge in demand for Ethereum blockspace and subsequent fees paid by users.

As we explained in our report Mapping Out The Merge, validator returns are decomposed into rewards from staking activities (e.g., attestations, proposals, etc.) and priority fees or “tips” paid by users when making a transaction (in addition to MEV). While the yield from staking activities is a relatively stable component scaling up and down with the number of active validators, the fee component can vary significantly with the fee market. The recent rise in fees on Ethereum pushed the annualized percentage yield expected from tips to nearly 4%, matching the yield from staking alone. The combined effect of staking rewards and fees has created an attractive overall yield for validators.

Although the fee market appears to be cooling off, the average performing validator can still expect returns of 5–6% at current fee rates. But with 1-year US Treasury rates earning a similar level (albeit in dollars), there is still high competition for capital in today’s macro environment. Nevertheless, long-term ETH holders are likely poised to keep staking at current rates to avoid their share of supply being diluted away—especially as the liquid staking ecosystem receives a big boost with the launch of Lido’s v2.

Lido—the largest player in Ethereum’s liquid staking landscape—went live with Lido v2, the second iteration of its protocol. This upgrade serves the dual purpose of enabling stETH withdrawals along with the introduction of Lido’s staking router, creating an onramp for a more diverse set of node operators. Withdrawals of stETH marked a crucial event due to Lido’s dominant position of underlying pooled ETH held among its validators—commanding a 31% share of staked ETH—a move highly anticipated by stakeholders and participants of the Ethereum ecosystem alike.

Keeping withdrawals in focus, Lido’s design is informed by Ethereum’s async nature of processing withdrawals thus utilizing a queue within the protocol to fulfill stETH redemption requests sequentially. The main operational flow of withdrawals from a user-perspective is designed to follow a 3-step process in the order of request, fulfillment, and claim.

Request: Users initiate the process by submitting a request to redeem their stETH tokens to a withdrawals contract which locks the amount of stETH to be withdrawn. A transferable claim on the request is issued through an NFT.

Fulfillment: Requests are processed following the queue mechanism to calculate the redemption rate and obtain sufficient ETH to fulfill the request. In the case of mass slashing events, withdrawals are processed under “bunker mode,” forming an additional layer of safety

Claim: Once a withdrawal request is processed and fulfilled users can claim their stETH tokens, completing the withdrawal process and gaining access to their staked assets.

This three-step process ensures a systematic and secure approach to stETH withdrawals, enabling users to regain liquidity of their staked position. Lido’s commitment to designing a withdrawal mechanism that aligns with the Ethereum network’s design is a reflection of their dedication to the health of the ecosystem. Indeed, Lido is expected to contribute no full-validator exits thanks to their ample buffer and staked pool management.

The buffer utilized by Lido pools together accrued staking rewards, execution layer rewards and deposits to handle incoming requests efficiently—evident in the changing balances of the deposit contract. This mechanism played a crucial role in successfully completing Celsius’ 428k stETH withdrawal, by having over 450k ETH available in the buffer to absorb the impact.

The change in stETH supply above represents ~280K net withdrawals on Lido as a result of stETH being burned since the upgrade went live on May 15th. With the majority of withdrawals coming from Celsius, demand for staking on Lido still remains high due to the benefits realized by holding its liquid staking token. At large, the prevalence of stETH in secondary markets is also evident through its growing use as collateral—currently representing 50% of Aave V2’s TVL, rising 11% since the beginning of the year ($1.74B). This is reflective of the winner-takes-all dynamic further increasing the liquidity and usage of the token.

As the Ethereum ecosystem continues to evolve, it is crucial to monitor market dynamics, macroeconomic factors, and further upgrades to the Ethereum protocol. Staking is also not without its share of risks, ranging from regulatory to technical and operational risk. Indeed, the first ever inactivity leak period—an effective emergency state that kicks in when more than ⅓ of validators suddenly go offline preventing finality for more than 4 epochs—was just recorded earlier this month. Although the issue resolved quickly, it serves as a reminder that validators must always be monitoring for unforeseen events.

Despite these complexities, the transition to Proof of Stake and the successful launch of the Shapella upgrade have bolstered confidence in the Ethereum ecosystem. The future looks promising for Ethereum staking, offering participants the potential for both financial rewards and active involvement in securing and supporting the network.

Tether (USDT) continued its upsurge in activity and total supply last week, with active addresses on Tron reaching nearly 1M/day and USDT free float supply topping $46B on Tron, $35.7B on Ethereum, and holding at $850M on Omni. This comes as Tether indicated last week it will “regularly allocate up to 15%” of its realized profits towards buying bitcoin (BTC).