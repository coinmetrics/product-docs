# Launching Uniswap Swap Data

**Date:** 22-04-12

As part of an ongoing effort at Coin Metrics to collect and contextualize on-chain data from DeFi protocols, we’re excited to be releasing data for decentralized exchanges (DEXs) as part of our market data feed. Our first release covers swaps (i.e. trades), liquidity data and pool metadata for Uniswap and Sushiswap, two of the largest DEXs on Ethereum. In this week’s State of the Network, we explore how this data can be useful for analyzing some of the most important DeFi protocols today.

As a brief refresher, unlike centralized crypto exchanges that collect bids and offers on a central limit order book, trading on Uniswap and other DEXs is completed autonomously through smart contracts that pool funds from liquidity providers. Each token swap is recorded on-chain, and any ETH user can create a new market on Uniswap or provide liquidity to earn trading fees. While the first version of Uniswap launched just 4 years ago in 2018, an intricate network of tradable assets has already emerged. DEXs have created a rich new set of questions for crypto researchers, as they require a knowledge of both blockchain and market data mechanics.

One of the most fundamental DEX metrics is trading volume. Uniswap trading volume now regularly outpaces some large centralized exchanges. The chart below shows daily trading volume in the ETH-USD spot markets across a selected group of centralized exchanges compared to daily volume in the Uniswap V3 pool (the 3rd iteration of the protocol released in May ‘21) for wETH-USDC (0.05% fee tier).

Daily volume in this pool has typically ranged between $600M-$800M in 2022 so far. Uniswap volume also tends to peak on days where there is also high volume on CEXs, as one might expect.

An important area of crypto asset market research is understanding how the price discovery process occurs and the overall function of different exchanges. Price discrepancies can arise between exchanges, and comparing against benchmark prices robust to dislocations like Coin Metrics’ reference rates can be useful to gauge a market’s efficiency. This analysis is also relevant in the context of DEXs.

The chart below shows a sample of swap prices in four different ETH-USD (USDC/USDT) pools on Uniswap V3 vs. Coin Metrics’ ETH-USD reference rate on January 21, 2022.

Sources: Coin Metrics Market Data Feed and Reference Rates

This sample shows that swap prices tend to closely track ETH’s reference rate. Some larger swaps can deviate from the reference rate, though. Like traditional order book based markets, larger swaps in pools with lower liquidity will incur high price impact.

When prices do move out of sync from prevailing market prices, lucrative opportunities for arbitrage can emerge. But unlike arbitrage in traditional financial markets, the unique complexities of blockchain consensus and smart contracts have spawned an entirely new field of research called miner extractable value (MEV), first dubbed in an influential 2019 paper called Flashboys 2.0 by Phil Daian.

MEV broadly encompasses any opportunities miners (or validators in PoS) have to profit from the ability to reorder, include, or exclude certain transactions in blocks being added to the chain. MEV comes in many forms, but data collected from Flashbots, an MEV R&D organization, shows that arbitrage comprises many of the most profitable opportunities.

The chart below shows an example of arbitrage on Uniswap V3 where the price of ETH deviates below the market price in the WETH-USDT 0.3% fee pool. In this transaction, an MEV bot first swaps 5,243 ETH for $16.19M USDC (top chart). It then transfers the USDC for USDT (incurring a small amount of slippage) and finally uses that USDT to buy 5,518 ETH, for a roughly 275 ETH profit (~$815K).

Although outsized opportunities like this are rare (this example ranks in the top-25 largest MEV transactions on the Flashbots leaderboard), large examples like this show why MEV is such an important area of research and how DEXs play a key role in its development.

Sources: Coin Metrics Market Data Feed and Network Data

There is a close relationship between fees and the distribution of swap sizes. When fees are low, as they were in the beginning of March, small swaps are more practical. But when fees rise, swaps below a certain threshold can get priced out. However, Uniswap has now been deployed to layer 2s (L2s) Optimism and Arbitrum, as well as Polygon, where fees are much cheaper. This should help smaller users but also introduces more complexity for tracking DEX analytics like TVL across multiple networks.

This is just a small taste of where this data might be useful. The rise of DEXs has introduced many more questions such as competition between DEXs and fee structures, liquidity provider (LP) profitability and impermanent loss, and the effects of more exotic DeFi use cases like flash loans.

Coin Metrics looks forward to providing more data for this vibrant space of the crypto ecosystem in the near future.

Most major crypto assets moved lower week-over-week amidst renewed market volatility. Weekly on-chain activity was mostly lower for the major layer one blockchains and stablecoins. Bitcoin active addresses averaged 894K per day over the week, roughly 7% lower than the prior week. Across the Ethereum ecosystem, the liquid staking protocol Lido continues to see increased adoption. The total supply of stETH, the token that represents staked ETH in Lido, passed 3.2M – doubling YTD.

The Luna Foundation’s treasury now holds almost 40K BTC worth about $1.6B at today’s BTC price. The Luna Foundation has been acquiring BTC to back the TerraUSD algorithmic stablecoin. Terra’s founder Do Kwon recently announced that the Foundation plans to purchase $10B in BTC.

Crypto donations to Ukraine continue to flow in. Roughly 450 BTC ($18M) and 9500 ETH ($28.5M) have now been donated to the Ukrainian government addresses.