# Special Merge Update

**Date:** 22-09-15

This is a special update from the Coin Metrics Research team on our immediate takeaways from The Merge, which successfully occurred early this morning (2:43 AM EDT)

Ethereum successfully reached the Total Terminal Difficulty (TTD) trigger for The Merge on the Execution Layer (EL) without interruption.

Block production was successfully passed over to validators on the Consensus Layer (CL) without any disruption or coordination issues.

Validator uptime was near perfect on the CL with only one missed slot in the critical first two epochs (32 slots each) after The Merge, and the network achieved finality as expected with sufficient participation rates.

Network uptime has remained steady and blocks are being produced by validators without issue right now.

While The Merge was successfully executed in an uneventful fashion (as was expected in the best case outcome) minor issues were noticed with some validators incorrectly or possibly forgetting to configure their addresses for receiving priority fees on the EL, as well as one validator being slashed for attesting twice to the same slot.

Hashrate on Ethereum Classic (ETC) jumped immediately after The Merge as some GPU miners directed their hashrate to mining on the network.

At 2:43 AM Eastern Time at block 15537393, Ethereum’s Proof-of-Work era came to an end, ushering in a new age of Proof-of-Stake Ethereum. With no downtime and in the course of just 12 seconds, Ethereum block production successfully transitioned from a globally-distributed group of miners running specialized hardware to a globally-distributed group of validators staking ETH. CM Research was awake and excited to witness this ambitious feat of upgrading a network securing many billions in value. In this special update, we share what we saw on the ground at the time of The Merge.

As seen from Coin Metrics’ Lighthouse Node logs

The first step of The Merge, the surpassing of Total Terminal Difficulty (TTD), was met without any issue. Network hashrate dropped slightly over the last day of PoW but remained constant enough to push total difficulty over the finish line matching our timing predictions. Although Coin Metrics’ FARUM detected 6 re-orgs (re-organizations of block ordering) in the 2 hours leading up to The Merge, there was no disagreement regarding the last PoW block, mined by f2Pool, at height 15537393.

To monitor network health right after TTD was hit, we constructed the visualization below pulling directly from our Lighthouse node for the Consensus Layer (also known as the Beacon Chain). The chart shows the status of slots on the CL by epoch (an epoch is composed of 32 slots that are 12 seconds in duration where a block can be proposed by a randomly selected validator). Slots in green had a validator successfully propose a block while slots in red are slots missing a block, usually due to validator downtime or a misconfigured client. While a few missed slots here or there is normal behavior, a sharp increase can signal network issues. During the Bellatrix hard fork on September 6th, which prepared the CL for The Merge, the rate of missed slots briefly spiked, and this was something to keep an eye on heading into The Merge.

A successful Merge would therefore mean a high rate of proposed blocks with no observed increase in missed slots. This is exactly what we observed: from the first post-Merge slot, at 4,700,013 in epoch 146,875, there was only one missed slot in the subsequent two epochs. The two epochs were also successfully attested to by at least two-thirds of the network, finalizing the network after about 13 minutes and officially marking The Merge’s success.

This means that most validators’ nodes were successfully connected and prepared for The Merge. As also shown in the bottom of the chart above (taken as a snapshot at slot 4,700,112), we know for sure The Merge happened and was successful with the “execution payload” (users’ transactions from the EL) populated in Beacon Chain blocks.

As of epoch 146,968 (~Noon ET Sep. 15th) the rate of missed slots has remained about the same as pre-Merge levels, with a smattering of missed slots as expected under normal conditions.

With blocks accumulating in the new PoS era of Ethereum, we can start to see some impacts on-chain. The chart below shows the time between blocks pre and post-Merge. As expected, eschewing the probabilistic process of mining, block times now arrive in more predictable 12-second increments (save for a couple of missed slots).

Looking on-chain we also noticed that the last PoW block had an interesting composition, containing only a single transaction that minted an NFT. The first PoS block was a lucrative one for the lucky proposer that was chosen (validator index 347963), with ~45 ETH (~$72K) being paid out in tips (mostly from an NFT mint).

While some validators were basking in the wealth of tips that were previously doled out to miners, others were having trouble getting paid out. We’ve noticed at least 15 blocks post-Merge so far with the EL fee recipient being an inaccessible burn address (e.g. 0x0000000000000000000000000000000000000000). This is likely from validators either failing to set their address or setting it incorrectly.

There was also some unfortunate news for other validators. The first slashing post-Merge occurred at slot 4,700,025 with validator 404680 being slashed for attesting twice. Every epoch, all active validators are charged with attesting for exactly one slot. The root cause of the slashing appears to be redundancy set up by the node operator, a common mistake that can lead to slashing. Validators must remain online as much as possible so that they can perform their attestation and proposal duties and be rewarded for them. So it’s only natural that validators would spin up multiple nodes to increase resilience against any single node failure. The problem is when validators set up their nodes using the same validator key, which may lead these nodes to propose or attest twice for a single slot. This is a slashable offense.

Although setting up your nodes incorrectly does not imply any malicious intent, it is critical that the network identify blocks for each slot unambiguously and conclusively.

As their role on Ethereum comes to an end, it’s hard to ignore the impact that miners had in the network’s 7-year PoW era. Miners earned a final total revenue of just over $35B for securing Ethereum up until The Merge. They were responsible for producing roughly 50M of the 120M ETH in circulation today.

The end to Ethereum mining paints a bleak picture for GPU miners with falling hardware prices and far less lucrative chains to mine on. Despite this though, some miners appear to be doing what they can by shifting to Ethereum Classic (ETC). Immediately after The Merge, difficulty spiked on ETC, signaling greater hashrate on the network (difficulty is a network parameter that moves up or down to help keep block times in check, if blocks are coming in faster than expected difficulty increases to make it harder to find the next block given constant hashrate).

But miners unfortunately won’t find much revenue to go around on ETC these days, with ETC miners making around 1/40th of the daily revenue that was previously made on ETH pre-Merge.

Considering that you can go all the way back to the 2014 Ethereum whitepaper which notes “that in the future, it is likely that Ethereum will switch to a proof-of-stake model,” it’s incredibly exciting to see The Merge succeed. Coordinating a software upgrade at this scale across a global set of participants all while maintaining 100% uptime is an impressive feat.

We’re excited to keep studying the ramifications of this major upgrade in the near future. To check out some of the new staking metrics we’ve released in conjunction with The Merge, make sure to read our announcement here.

To keep up to date on on-chain data across Ethereum and the entire crypto ecosystem check out our free charting tools, formula builder, and correlation tool.