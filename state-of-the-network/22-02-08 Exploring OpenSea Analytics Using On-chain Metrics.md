# Exploring OpenSea Analytics Using On-chain Metrics

**Date:** 22-02-08

Up until now, the data produced by websites and apps has typically been controlled by companies or organizations. Although some of it is selectively made public through APIs much is hidden away in private servers. Applications built on blockchains flip this model upside down - decentralized application data is inherently public.

Every time a decentralized application (dapp) transaction occurs it's publicly recorded on the blockchain, available forever for anyone to independently verify. This means that end users no longer need to strictly rely on APIs to get data from companies. Instead, it’s possible to get application data from the blockchain itself.

In this week’s State of the Network we explore the process of extracting application level data from the blockchain, and dive into some OpenSea data derived entirely on-chain.

Public blockchains like Bitcoin and Ethereum are pieces of open source software run across a network of computers. Anyone is free to run their own copy of the software to access the network. Running a version of Ethereum’s core software is known as running a “node.”

There are several different options for setting up and running a node depending on use case and hardware capabilities. Different node setups contain varying degrees of a blockchain’s transaction history. Light nodes, for example, contain basic information like previous block hash and timestamp, but not the full ledger.

Running an archival node, on the other hand, includes a full set of Ethereum’s transaction history. At Coin Metrics we run Ethereum archival nodes as well as nodes for dozens of other blockchains which allows us to collect the data needed to compute metrics and conduct other analysis.

Ethereum data is fundamentally stored as blocks and each block contains a list of transactions that were included in that block. Transactions include data like the sending address and receiving address of the transactors, as well as information like amount of ETH transferred and amount of gas spent. But tucked within the transactions is even richer data in the form of event logs.

When writing a smart contract, developers can include event logs that get emitted every time a specific event occurs. Frontend applications listen for these event logs and update their user interface based on newly emitted logs. Event logs are typically used to announce state change or user interaction, like the sale of an NFT or deposit into a DeFi vault.

For example, when an NFT is transferred a “Transfer” event log is emitted. Transfer event logs include the address the token is being transferred to and from, as well as the token ID. Additionally, the log's address represents the collection address of the token being transferred. These logs are permanently stored on the blockchain and can be used to reconstruct user activity over time.

OpenSea is by far the largest NFT marketplace built on Ethereum. OpenSea offers an API that can be used to access data about assets and collections as well as some aggregated statistics. But since OpenSea is built on the Ethereum blockchain every OpenSea transaction is also recorded on-chain. We can therefore get OpenSea’s entire sales history without needing to rely on their API.

In addition to the transaction data, OpenSea emits an “OrdersMatched” event log every time a sale occurs:

OrdersMatched includes data such as the address of the seller (“maker”), address of the buyer (“taker”), and the price of the sale. Event log data is separated into “topics” and “data.” In this case, the address data is included as topics and the price data is in the data field.

Combined with Transfer logs, OrdersMatched logs can be used to build out a complete history of OpenSea sales.

Note: This data only includes sales that used the following currencies: ETH, WETH, DAI, USDC, MANA, and SAND. The data is also still relatively new and in a testing phase so may not account for some edge cases. If you have questions or feedback please let us know at info@coinmetrics.io or @coinmetrics on Twitter.

The following OpenSea data is derived entirely from our Ethereum nodes, without the need for third-party APIs.

OpenSea sales volume topped over $200M a day in parts of January 2022 which is more daily volume than most of JPEG summer of 2021, save for the very peak. Despite a dip over the last week the number of unique sales is also near all-time highs.

Most NFTs are bought and sold using ETH so it’s often thought that rising ETH price might hurt NFT sales (and vice versa). This appears to be the case during some particularly extreme price swings. But looking at the data there does not appear to be a consistent correlation between OpenSea sales volume and ETH price - at times they are highly correlated, like August 2021, but at other times they’re negatively correlated, like November 2021. Although it’s still early, it appears that NFTs are a relatively independent market and may for the most part move separately from the rest of the crypto market. The following chart shows OpenSea sales volume in ETH (left-hand axis, log scale) compared to ETH price, USD (right-hand axis).

Sources: Coin Metrics Labs and Coin Metrics Reference Rates

Large sales became much more prevalent last year during the JPEG summer bull run. The amount of sales over 100 ETH increased in early August 2021 and peaked towards the end of the month, as shown in the below chart.

The dots below each represent the sale price (in ETH) of an individual sale and are color coded by collection - for example, dark blue dots represent Art Blocks Curated, which had many large sales during JPEG Summer, and the pink dots represent Bored Ape Yacht Club (BAYC). The highest OpenSea sale of 2021 was for a full set of DEAFBEEF generative audiovisual NFTs, sold for 2,275 ETH which was about $6.8M at the time. Large sales have picked up at the start of 2022 but have not yet reached the level of August 2021.

Average sales price (in ETH) varies from project to project. While some NFT collections have found consistent success others have had big peaks and valleys. Blue chip profile picture projects (pfps) like BAYC and Doodles have seen relatively consistent average price growth. But other collections, like Art Blocks Curated, peaked during JPEG summer and are yet to fully recover.

The following heatmap shows how close NFT collections are to their all-time high price, calculated by dividing daily average sales price by the previous all-time high. Red squares represent being close to or at all-time high, and blue squares mean current average price is 30% or less of the all-time high. Gaps in certain collections are due to different launch dates or may represent a day that did not have any sales. This once again illustrates that different projects peak at different times, with some heating up going into 2022 while others have remained flat.

Our NFT data is still in relatively early phases but will be a continuous focus for us throughout 2022. To keep up to date on our progress or contact us with questions or feedback feel free to reach out to us at @coinmetrics on Twitter. And to explore our other on-chain metrics check out our free charting tool, formula builder, correlation tool, and mobile apps.

Prices of the major crypto assets recovered over the last week after a shaky start to 2022. Bitcoin (BTC) and ether (ETH) crossed back above $40K and $3K, respectively. Activity on-chain picked up with active addresses rising 8% for both BTC and ETH.

Last Wednesday, February 2nd, an attacker exploited a vulnerability found in a token bridge  built by the protocol Wormhole leading to a loss of 120K wrapped ether (wETH, the ERC-20 compliant version of ether) worth about $325M at the time. Token bridges like Wormhole allow users to send crypto assets across different blockchains and have become more popular as demand for moving crypto assets across multiple networks has grown.

Most token bridges like Wormhole do not actually swap or convert crypto assets, but instead work by locking native tokens in a smart contract and issuing redeemable tokens on the target blockchain against the assets deposited. For example, if a user wanted to send ETH to Solana, they could deposit wETH to the Wormhole contract and receive a wormhole ETH token on Solana backed by the underlying wETH held in the Ethereum contract.

In the exploit last week, the attacker was able to mint 120K of effectively unbacked wormhole ETH on Solana, and redeem it for actual wETH tokens on Ethereum. The chart below shows the wETH balance of the Wormhole bridge contract on Ethereum, which the attacker depleted by redeeming 93.75K wETH, leaving wormhole ETH tokens on Solana undercapitalized.

However, less than a day later, Jump Crypto announced that they had replenished the 120k wETH in the wormhole contract – re-collateralizing the wormhole ETH tokens on Solana.

This incident underscores the challenges in building infrastructure across multiple blockchains as well as the importance of on-chain accounting and smart contract risk-monitoring tools. Unfortunately, as bridges accumulate more deposits they tend to become more desirable targets to adversarial agents. Of the top 10 Ethereum addresses by wETH balance, there are 3 other bridges in addition to Wormhole that collectively hold a little over 1M wETH, or about $3B.

While there is no reason to currently doubt the integrity of these other bridges, it will be important to continue following the security of bridge infrastructure given their increasing economic importance in the crypto ecosystem.