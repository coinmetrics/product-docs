# No Ordinary Number

**Date:** 23-02-14

Bitcoin’s nature is inextricably linked to the philosophy that guided its design and development. It is, first and foremost, a philosophy that aims to maximize the power of the individual to own and control their assets and identity through cryptography. It also enshrines money as a public good—beyond state control—subject to purely mechanical and predetermined issuance. The notion of immutability in protocol design, transaction finality, and issuance schedule, is firmly anchored by both the design and the community of people participating and making use of the network. It is thus astonishing to witness a novel use case for Bitcoin emerge so suddenly, as is the case with Ordinals.

Ordinal numbers are a mathematical concept that extends the set of natural numbers (1, 2, 3, …) to include a notion of order. If we consider satoshis (sats) the elementary particles of Bitcoin—that is, the smallest, indivisible constituent elements—we can define a mapping between sats and ordinals by naturally counting the order in which these sats were minted. Mathematically, we can say that the set of satoshis is well-ordered because there exists an unambiguous and well-defined mapping between the order in which these sats were minted (ordered and recorded in the Bitcoin chain) and the set of natural numbers that we use to count them.

This mapping is possible because, while the exchange value of BTC applies equally to all satoshis, the identity of each satoshi is uniquely determined by the blockchain record—making each satoshi non-fungible insofar as each satoshi is perfectly distinct and differentiable from every other satoshi. So while the concept of fungibility is usually centered on the exchange value of an asset, the perfect (i.e., complete, unique) history of every satoshi, from the moment it’s minted, across every transaction, allows us to postulate an identity for each satoshi—an identity that may in turn affect the exchange value. It is not, however, the only way of categorizing satoshis, as other equally-valid numbering systems can be implemented, such as FIFO vs LIFO.

Ordering sats naturally leads to multiple interpretations of a sat’s relative rarity and value in relation to the 1.9 quadrillion sats that were mined so far. We can thus consider the first satoshi minted in a block to be much rarer than the average satoshi, as there are ~776,400 blocks in total. We can go further and identify the first satoshi in a difficulty adjustment, which happens every two weeks (~242 difficulty adjustments in total), or even the first satoshi minted after a halving, which happens every four years (3 halvings so far), to identify unbelievably rare sats. However, this system of attribution is entirely arbitrary, so other means of ascribing rarity to sats may ultimately become more dominant than the system described previously, based on sat issuance. Other schemes that define names, numbers, coordinates, percentiles, etc. based on sat order can be just as easily considered.

Inscriptions are a type of digital collectible or artifact that is created using taproot script-path spend scripts. Inscriptions are stored entirely on-chain—a change facilitated by the Taproot upgrade, since taproot scripts have fewer restrictions than those found on traditional OP_RETURN messages. This upgrade greatly expanded the limit on storage available to Bitcoin users, from a measly 80 bytes to the full-block 4 MB, an increase of 50,000x over the previous limit. This blockspace can be filled with any data or media, including text, images, videos, the game of Snake, and more. These are very similar to the NFTs that people have become accustomed to, with a critical distinction that these “NFTs” must be minted and stored on-chain one-by-one.

Following the SegWit upgrade, the Bitcoin protocol allowed users to pay less in fees for the witness data associated with a SegWit transaction. This operation reduced the price of an average transaction and encouraged the spending of a greater set of inputs to disincentivize the “splitting” of UTXOs. Furthermore, the witness data does not need to be stored once the transaction has been verified and spent, allowing nodes to prune this data once fully synced. Following the Taproot upgrade, this witness data “discount” was available to be used by inscriptions, which are stored in the witness data field. This witness discount helps to make the process of creating inscriptions more economical than other means of storing data on-chain, especially in relation to regular economic transactions.

There has been a noticeable increase in Taproot usage as a direct result of demand for Ordinals, as seen in the chart above . Nevertheless, confusion and controversy flourish around ordinals’ use of Taproot. While ordinals are implemented as Pay-to-Taproot (P2TR) transactions, they do not make use of Taproot’s core innovation. Rather, they leverage a loosening of rules introduced along with Taproot to embed arbitrary data into a transaction’s signature field (known as the transaction’s witness). This change effectively removed the previous data cap for signature data. While the specific reason behind this choice remains unclear, it is likely that Bitcoin Core developers were considering things like Zero Knowledge Proofs, which are larger in size, to be embedded in Bitcoin transactions. Although this might have been the initial justification, it was instead cleverly used by ordinals to embed all sorts of data into the blockchain.

The continued weakness of the Bitcoin fee market in the face of an inevitable decline in block subsidies has sparked some concern around the network’s ability to properly incentivize miners in the future. Therefore, the introduction of a new source of demand for Bitcoin transactions—beyond simple transfers—has the potential to provide a welcomed boost in fees. However, despite the busy mempool (the virtual queue of transactions waiting to be included in a block) and recent interest around ordinals, on-chain data is yet to show a substantial increase in the total fees paid out to miners.

There are a few possible reasons for the lack of sustained pressure on the fee market so far. First, there simply might not be enough ordinals yet to make a substantial impact. Another possibility is that a portion of the fees are being paid “out-of-band”, or off-chain, directly to miners; as was the case with the largest Bitcoin block ever produced at height 774628—even though this block is hardly representative. Finally, fees might not be rising yet due to the structural composition of the mempool. As mentioned earlier, the witness data “discount” effectively allows more space to be taken up at a lower fee rate. But as the mempool continues to fill up, lower bound transactions at a fee rate of 1 sat/vB have started crowding the mempool to the point where transactors may need to start raising rates to stay competitive.

It has been little over two weeks since the use of inscriptions began taking off, but already we can find many significant changes across our network data. The sum block size per day (in MB) has swelled to over 400 MB added to the chain daily, including all witness data.

The increased size of blocks has some implications for node operators, but is not as much of a burden as one might anticipate at first glance. Although Witness data must be downloaded during initial synchronization of the Bitcoin blockchain (a node “sync”), it can be purged once this node syncing is completed. However, this can cause issues if too many nodes purge this data, making it harder for a prospective node operator to locate a network peer with the full history of transaction signatures, even if they planned to prune it afterwards themselves.

Nonetheless, the impact of these recent developments is clearly visible in the distribution of Bitcoin’s largest blocks in history, which were all mined over the last two weeks. Although this is a relatively new development in Bitcoin’s history, some of these new dynamics are likely to persist in the form of structurally heavier blocks.

Bitcoin is not the only blockchain facing a drastic increase in NFT issuance. The number of NFT smart contracts in Ethereum has increased nearly five fold thus far this year. In Ethereum, one of the culprits behind this trend appears to be a project called XEN which is aggressively air-dropping NFTs compliant with the ERC721 standard to existing addresses. The less drastic growth in contracts compliant with ERC1155, the second most popular NFT standard, indicates a unilateral growth in NFT issuance.

The recent increase in NFT issuance might be due to the precedent set by previous bull markets. Consider this: the first Cryptopunk was issued in a period of low fees, the summer of 2017, where average transaction fees hovered between 20 and 30 cents. NFTs take time to accrue value, so it makes sense to issue them in times of low demand for block space, when transaction fees are low, thereby enabling NFT creators to issue tokens more trivially.

In contrast to the many NFT marketplaces on Ethereum, Solana, and smart contract platforms in general, the Ordinals ecosystem is so young that it still lacks marketplace infrastructure for trading. Some users have resorted to tracking sales off-chain on forums, while new ordinals are shared primarily on social media. One might argue Ordinal NFTs carry features of a grassroots movement. It is no coincidence then that some inscriptions explore themes that take Bitcoiners back to the early days of Bitcoin itself.

Although inscriptions and ordinals are novel concepts for most, they are not by any means the first NFT or “digital artifact” that has been explored on the Bitcoin network. However, they are having a measurable impact on-chain, and may have a better chance at catching on and perhaps contributing to Bitcoin’s security budget as issuance diminishes over time. It is exciting to witness how creative developers eke out new functionality out of existing infrastructure, and we cannot wait to see what new surprises remain barely out of hand’s reach—just waiting for a clever hacker or a driven team of developers to bring it to reality.

Bitcoin active addresses fell 2% over the week, while Ethereum active addresses also fell by about 3%. Tether activity rose sharply on Ethereum, with daily active addresses averaging 130K, a 26% rise over the previous week.