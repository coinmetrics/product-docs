# Ethereum’s Bellatrix Upgrade Goes Live in Final Preparation for The Merge 

**Date:** 22-09-08

All eyes in the crypto ecosystem are turned to Ethereum as the network approaches its long-awaited transition from Proof-of-Work to Proof-of-Stake. With The Merge fast approaching, final preparations are underway for the network to complete this momentous upgrade. In this week’s State of the Network, we analyze Ethereum’s recent Bellatrix upgrade, the last brushstroke before The Merge itself, and offer some insight into the estimated timing of The Merge and why it is not so straightforward.

Ethereum moved one step closer to The Merge Tuesday with the activation of Bellatrix, a network upgrade to Ethereum’s Consensus Layer (CL), also known as the Beacon Chain. This upgrade prepares the CL to include Ethereum users’ transactions from the Execution Layer (EL) once the total terminal difficulty (TTD) is reached on the EL.

The Bellatrix upgrade was completed via a hard fork of the CL, meaning that all nodes on the network needed to upgrade their client software to support the fork ahead of its scheduled activation at epoch 144,896 (September 6th at 11:34 am UTC).

The upgrade was completed successfully on Tuesday morning. However, we found some evidence that not all validators were fully prepared for Bellatrix. One measurement of this is the rate of missed blocks on the CL. In each CL epoch, there are exactly 32 slots where a randomly selected validator proposes a block. Although pre-Merge CL blocks do not yet contain EL transaction payloads (and the subsequent user transaction fees), it is still costly to miss out on an opportunity to propose a block and validators are incentivized to be online. While it is still possible a validator might just happen to be offline or have a bad connection when selected, the jump in the rate of missed blocks signaled some trouble — likely stemming from validators failing to upgrade their nodes or some EL-CL client pairs having issues.

The chart below shows the status of each slot 100 epochs before and after Bellatrix, pulled from Coin Metrics’ Lighthouse CL node. Slots in green are proposed blocks as expected, while slots in red are missed blocks. The rate of missed blocks picked up right after the Bellatrix fork—most epochs had 3-5 missed blocks, noticeably higher than before the Bellatrix upgrade.

While the upgrade was ultimately successful and network uptime was easily maintained with the level of observed participation, it is not ideal to have a high rate of missed blocks.

Post-Merge, too many missed blocks can be a nuisance because they can impact transaction time-to-finality and potentially increase fees as pending transactions accumulate. They can also impact DeFi applications’ efficiency as on-chain prices move out of sync with off-chain markets.

However, by Wednesday morning, the network was on its way to recovering to pre-Bellatrix participation rates, likely as more node operators upgraded their client software.

With the CL now ready to include EL transaction data in blocks, the Bellatrix upgrade sets the stage for the Paris upgrade on the EL, which triggers The Merge. However, it is crucial to understand that the timing for The Merge is not as simple as a clock ticking down second by second on New Year’s Eve.

Past Ethereum upgrades have been set to occur at specified block numbers, which are fairly easy to predict in the future given a known average time between blocks. However, due to the possibility of miners acting maliciously as they are ousted from the network, Ethereum developers and participants had to think of a different way to agree on when The Merge would happen. The solution was to set a threshold called Total Terminal Difficulty (TTD) that is harder to tamper with. Crucially, TTD is not a set point in time and involves more variables when attempting to predict it.

TTD is the cumulative measure of difficulty for the entire Ethereum blockchain. A particular block’s difficulty is determined by the Ethereum protocol, which targets an average 13.5-second block time. If the network hashrate (a measure of the total computational resources allocated to mining) increases and blocks are produced more quickly, difficulty will increase as well to maintain consistent block times (Ethereum’s difficulty adjusts each block, unlike Bitcoin’s 2-week difficulty adjustment interval). This means that network hashrate is a key variable in predicting the timing of The Merge. The Paris upgrade from PoW to PoS targets a TTD of 58,750,000,000,000,000,000,000, at which point the last PoW block is mined and validators take over block production.

In practice, estimating hashrate is very difficult for a number of reasons. First, miners will only operate if it is profitable to do so. If ETH price increases, this can encourage more miners to join the network pushing hashrate up, and vice versa for price decreases. Quick changes to miner input costs (electricity, hardware) can also impact an operation’s profitability.

On top of these persistent and hard-to-predict systematic factors, there is also the idiosyncrasy of The Merge itself. Ethereum’s GPU miners have to grapple with the options of joining other existing, but less lucrative GPU PoW networks like Ethereum Classic, sell their hardware, or wait and see if a PoW fork of Ethereum will persist after The Merge. It’s tough to know how many ETH miners use ASICs (hardware specifically meant for mining ETH), but for the small number of them that do, they should be incentivized to continue mining until The Merge. Finally, like an employee collecting their last paycheck, there are logistical details miners and mining pools need to address in miners taking their final pool payouts. In summary, it is simply hard to know how hashrate will progress in the days leading up to The Merge, impacting our estimates of its timing.

But since we know the target TTD for The Merge, we can naively estimate its exact moment by finding the difference between the target TTD and current total difficulty, divided by the average block difficulty. This expression gives us the expected number of blocks until The Merge. We can then multiply by the average block time (13.5s) to estimate the time left until The Merge. However, this is just an estimate; in reality, block difficulty and hashrate can experience significant variation day-to-day (as observed in the chart above), particularly as miners close their operations in expectation of the switch to PoS.

Using the total difficulty as of block 15492777 and an average difficulty from blocks mined on September 6th, this comes out to an estimated timing of next Wednesday evening (ET), September 14th.

Plugging in recent values:

Some other practitioners have applied statistical models to predict TTD and add more context to the spread of possible times when The Merge will occur. One such example is the site bordel, which many in the Ethereum community have looked to in recent weeks and also points to a similar estimated timing for The Merge.

Ultimately, as total difficulty keeps increasing, the confidence interval is tightening on the exact timing. Even if difficulty were to suddenly drop 20%, the naive model above would only push back The Merge’s estimated time by about 42 hours . Should conditions stay roughly the same, The Merge will likely have occurred by this time next week. Coin Metrics Research will be closely monitoring all of the most relevant data in the coming days ahead of Ethereum’s big shift.

To learn more about The Merge, how Coin Metrics is preparing for this event, and other helpful resources check out our dedicated page here.

Adjusted transfer value on Ethereum Classic (ETC) picked up over the week as The Merge nears. Hashrate on ETC has increased as some ETH miners have likely moved operations to ETC ahead of The Merge. However, the prospect of mining ETC is far less lucrative compared to ETH. ETC miners make ~$500K in revenue today, while ETH miners earn 40x more, around $20M per day.