# The BAYC Burn: Breaking Down the Otherside Gas War

**Date:** 22-05-03

On Saturday night Yuga Labs, the creators of Bored Ape Yacht Club (BAYC) launched their much anticipated “Otherside” metaverse land NFT mint on Ethereum.

Although the team posted that they were taking steps to “dramatically soften the potential for a massive gas war” before the launch, the mint ended up causing the largest gas spike in the history of Ethereum sending daily average gas price to over 800 GWEI. In total, over $150M was spent in gas fees during the mint.

To understand why gas prices spiked so high it’s important to first understand how the Ethereum gas market works.

Gas is essentially a measurement of the computational effort needed to execute an operation on Ethereum. More complex operations require more gas to run, while relatively simple transactions like a single token transfer require less gas. Gas fees are paid in ETH and are denominated in GWEI. GWEI is just a smaller denomination of ETH, similar to how a penny is a smaller denomination of a dollar (one GWEI is worth 0.000000001 ETH).

Ethereum transactors effectively set the maximum gas price they are willing to pay each time they send a transaction. The gas price solely determines the amount the user pays per unit of gas used and does not change the amount of gas needed to execute the transaction. This is similar to the idea of paying for gas to power a car - the amount of gas needed to get from point A to point B remains consistent, but the price of gas may fluctuate due to market conditions.

So why would a user choose to pay a high gas price when they could choose to pay the minimum? In short, setting a higher gas price usually leads to faster transaction confirmation.

Imagine a bus stop with thousands of people waiting to catch the next bus. A new bus pulls up every 15 minutes but each bus only has 50 seats, so the seats on the bus are auctioned off to the highest bidder.

For example, if there were at least 50 people willing to pay $1,000 to get on the bus, then the ticket price would be at least $1,000. If people were at most willing to pay $10, then the price would be $10 or less. But if you only had $10 and there were hundreds of people willing to pay $1,000 you would have to wait a while before you could afford to get on a bus.

This is a simplified version of how Ethereum gas prices work (check out txstreet.com for a great live visualization of what this looks like in real-time). Ethereum blocks are mined roughly every 15 seconds. Each Ethereum block has a maximum size (a block gas limit), which limits the amount of transactions that can be included. When mining a new block miners need to specify which transactions to include. So miners naturally prioritize the transactions with the highest gas prices since they will earn more money if these transactions are included.

Sending a transaction with a relatively high gas price will make it more likely that miners include it in the next block since they’re incentivized to include the transactions with the highest gas price. But there is no guarantee that it will be included. If there are a certain number of users willing to pay even higher gas prices, the transaction won’t get confirmed until a later block.

These basic economic principles can be represented by a familiar supply/demand curve.

In August 2021 EIP-1559 was officially merged, which updated Ethereum’s transaction fee mechanism. Following EIP-1559, fees are now composed of a “base fee,” which is required for a transaction to be included in a block, and a “priority fee,” which is essentially a voluntary tip. While the priority fee is paid to miners the base fee is “burned,” which means it’s removed from supply forever.

EIP-1559 base fees are determined algorithmically based on demand for block space. By introducing a protocol-determined fee, EIP-1559 provides better fee predictability and helps prevent overspend. However, if demand for block space suddenly increases the fee mechanism temporarily can revert back to a first price auction, where transactors compete via priority fees (aka miner tips). Additionally, it is important to note that while EIP-1559 might have helped smooth out fee volatility, a better fee mechanism does not solve persistently high fees which is a scalability problem. For more details about how the Ethereum gas mechanism works and how EIP-1559 works see our Ethereum Gas Report.

A few different factors led to the massive gas spike and ETH burn during the Otherside land launch. First, the smart contract used during the mint was not optimized for gas efficiency. Optimizations alone could have potentially saved tens of millions of dollars worth of transaction fees.

But secondly, and more importantly, as Vitalik Buterin alluded to the mint design had a fatal flaw: Yuga Labs set a flat price for each mint of 305 ApeCoin (APE) instead of designing a mechanism that let the market decide the fair price (like a Dutch auction, for example). Even though Yuga Labs implemented KYC and limited the first wave of mints to 2 NFTs per address the demand still exceeded the supply, which meant that not everyone who wanted to mint would be able to. Because of this, market participants competed using gas price, trying to outbid each other and get first in line to mint land before the supply ran out. As a result, the average transaction fee quickly shot up to over 2 ETH after the mint started.

In all fairness, it’s difficult to completely avoid gas wars during highly-anticipated NFT mints and Dutch auctions are far from a perfect solution. But there are many other potential solutions for avoiding gas wars during NFT mints such as smart batched auctions or raffles.

The gas bidding war essentially caused the mint to turn into an auction. Although the price was set at 305 APE (a little over $7,000 at time of launch), the market was ostensibly anticipating that the immediate secondary price would be higher. This incentivized market participants to spend thousands of dollars on gas as long as they believed they would still be able to turn around and sell the land deed NFT for more than they spent, including gas. For example, if a buyer believed that the actual secondary price was closer to $15,000, they could spend thousands of dollars on gas in addition to the $7,000 purchase price and still turn a quick profit. This proved to be the case, as the average Otherside land deed sale price shot up to over 8 ETH (roughly $22,000 at the time) shortly after launch. If the NFTs had been accurately priced, the bulk of the money spent on gas likely would have gone to the Yuga Labs team, since buyers were clearly willing to pay more than 305 APE. But instead that excess ETH was mostly burned, removed from supply forever.

ETH miners also benefited from the mint. As discussed above, EIP-1559 introduced the concept of a base fee and miner tip to the Ethereum gas market. Base fees move up or down based on demand in the previous block. However, base fees can only move up or down a max 12.5% from one block to the next.

When the mint started, base fees were at ~200 GWEI which was excessively low compared to demand on the network at the time. While base fees adjusted upward, transactors competed via miner tips, as shown below. Some blocks had over 260 ETH (~$750K ) paid out in tips to miners. Between 1:00 and 1:30 UTC miners received 6,200 ETH (~$17M) in tips total.

The mad rush to mint also led to a high amount of failed transactions. There were over 10,000 failed transactions and over $4M of failed transaction fees from users who tried to mint but set too low of a gas price, meaning their transaction did not get confirmed before supply ran out. Although there is no way to directly recover fees from failed transactions Yuga Labs has pledged to refund the fees out of their own pocket for those who were affected.

One silver lining is that a historic amount of ETH was burned during the event,  lowering ETH’s overall supply. Over 66K ETH was burned between 9PM (when the mint started) and midnight, ET. For context, about 13.5K new ETH is issued per day.

More records were set on the block level. Ethereum block 14688911 had a base fee of 8,629 GWEI, a new all-time high for the EIP-1559 era. Block 14688922 burned a total of 220 ETH, also a new all-time high for a single block.

The Otherside launch placed massive stress on Ethereum and pushed the chain to its limits. But despite some claims that the mint broke Ethereum or “turned the lights off” the network never actually went down. Even at the peak of the gas war it was still possible to get transactions through, although you would have had to pay exorbitant fees.

But that being said, most other activity dropped off during the Otherside mint. The number of Uniswap trades in some pools during the mint window fell to practically zero as it became prohibitively expensive to use the chain.

With some changes to the mint mechanics the gas war likely could have been avoided, or at least mitigated. In the past, researchers NiftyTable and TakensTheorem did a thorough data analysis on NFT gas wars and suggested ways to avoid them. The Paradigm team also published an extensive report on designing effective NFT launches late last year.

In addition to better mechanism design, Ethereum Layer 2 (L2 ) solutions like Optimism, Arbitrum, StarkNet, and Immutable X are quickly building ways to make Ethereum more scalable and conduct NFT sales with lower fees.

In the future, we will hopefully see less of these types of gas wars as scalability solutions and mechanism designs improve. But in the meantime, ETH holders at least benefit from the massive amounts of ETH burned during inefficient mints.

Outside of the NFT mania over the weekend, the crypto markets trended mostly flat or lower following the broader financial markets. The correlation between BTC and the S&P 500 index has been increasing throughout most of 2022.