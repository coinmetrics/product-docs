# Through the Blockchain and Beyond: Combining On-Chain and Off-Chain Data with Coin Metrics Charting Tools

**Date:** 22-11-01

Coin Metrics has long been devoted to providing a holistic view of the crypto landscape through the lens of both network and crypto market data offerings. Understanding the distinction between these two crypto data types—on-chain and off-chain—is an essential first step in any crypto researcher’s journey.

Simply put, “on-chain” data refers to data that is recorded on the blockchain. Examples of this type of data include blocks, transactions, transfers, and crypto addresses/wallet identifiers. At Coin Metrics, on-chain data is collected from the blockchain nodes that we run (a “node” is a computer running the blockchain’s open-source software allowing it to send and receive data from other nodes in the network). Check out our recent State of the Network on running an Ethereum node for a deeper look at the practical node.

In contrast, “off-chain” is generally used as a catch-all describer for any data that is not directly written to the blockchain. The primary example is the trading of cryptocurrencies on exchanges where a central limit order book is maintained by a company to connect buyers and sellers and execute trades (in the crypto jargon, these are referred to as “centralized” exchanges because of the dependence on a central entity to maintain the order book). This data on trade prices and volume is collected from APIs that the exchanges offer. Working with this data allows us to create reference rates, indices, and other helpful market data offerings.

Both data types are essential ingredients for crypto research and analysis. And combining both can lead to some interesting types of analyses. That’s why we’re excited to recently have augmented our charting tools with new market data capabilities, including exchange and exchange-asset pair metrics. In this SOTN, we walk through some examples where combining  on-chain and off-chain data empowers users to make better insights.

As we have pointed out in the past, correlations between exchange holdings and spot volumes can yield insights about the health of exchange data and the legitimacy of exchange data. In this way, on-chain data can provide a verifiable record that we can use to learn more about our counterparties. As an example, we can test the idea that exchange volumes should follow supply flowing into exchanges by comparing the relative share of supply held in exchanges to spot volumes on the exchange. This can inform our process of due-diligence and help to trust our funds in an exchange.

Soon after Ethereum was created and started trading, Kraken was a dominant venue for trading ETH, with over 10% of outstanding ETH supply held on exchange. Kraken’s share of all exchange-traded volume was also very high at this point, during some periods over 20% of total reported exchange volume. ETH supplies held on exchange has not recovered since 2017, and the relative share of ETH volume traded similarly has decreased as Kraken incorporated more assets and other competing exchanges drew away ETH supplies.

A similar picture can be gleaned from BTC market data on Kraken too. BTC supply held on Kraken began rising in 2014, and by 2016 it held around 0.8% of total supply. The exchange’s share of BTC spot volume closely tracked these inflows, peaking around 2016 and then slowly decreasing, likely in proportion to interest in Ethereum and alt-coins as they rose to the spotlight in 2017 and thereafter.

We can also witness an interesting dynamic between exchange traded volumes and on-chain balance data, and XRP offers a fascinating example. We can track the number of addresses with large balances (greater than 1M XPR) and their activities using our network data metrics and trading volumes in the US-based exchange Coinbase.

We can use exchange volumes over time and compare their relative shares across the most important exchanges to judge their relative market share distribution. This can reveal interesting dynamics in the fickle competitive environment of crypto exchanges.

Binance has quickly grown to become a market leader between exchanges in terms of market volume traded. This dominance becomes visible when we plot the relative share of spot volume in USD terms taking place among the largest exchanges.

On July 8, Binance decided to set trading fees on BTC-quoted pairs at zero in a demonstration of the liquidity of their markets. We can see that the share of BTC supply held on Binance (across the exchanges Coin Metrics tracks supply for) did not increase significantly after this decision, even though volume transacted measurably increased during the same period, indicative of an increase in the turnover of BTC held on exchange — a reasonable corollary resulting from reduced trading costs.

With a coverage universe currently consisting of 3,117 assets, 38 exchanges, 17,250 spot markets, 9,139 futures markets, 45,309 options markets, and 3,573 pairs, there are many more potential avenues of inquiry.

To follow the data used in this piece and explore our other network and market metrics check out our free charting tool, formula builder, correlation tool, and mobile apps.

On-chain activity picked up as crypto asset prices rose broadly over the week. Value transferred on Ethereum and Bitcoin rose sharply, while active addresses also increased. Active addresses on Algorand rose considerably to 359K per day, a 223% increase from the week prior. There were 1.05M active addresses on Algorand on October 24th, the highest since December 2021.