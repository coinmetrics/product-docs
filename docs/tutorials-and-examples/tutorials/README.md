# Tutorials

Below are some tutorials based on the products used and topic of exploration.

### [walkthrough\_community.md](walkthrough\_community.md "mention")

**Products:** All

**Summary:** This walkthrough guides you through the basic functionality of the Python API Client, a convenient wrapper of our API for Python users.&#x20;

**Use Cases**: Any

**Personas**: Analysts, Researchers, Developers

### [md\_market\_data\_overview.md](md\_market\_data\_overview.md "mention")

**Products:** Market Data

**Summary:** This notebook steps through various market data types available in Market Data Feed, displaying the basic structure of the data & highlighting use cases with examples from our weekly State of the Market. The notebook explains how data is gathered at the most granular level (i.e. trades, order book snapshots) & aggregated upwards to provide convenient hourly/daily metrics across spot, futures, & options markets.

**Use Cases**: Trading, Research

**Personas**: Quant Trader, Market Analyst

### [comparing-stablecoin-prices-using-different-pricing-methods.md](comparing-stablecoin-prices-using-different-pricing-methods.md "mention")

**Products**: Market Data, CM Prices

**Summary:** This demo steps through various methodologies for pricing crypto assets, utilizing USDT price fluctuations as a case study. Pricing methodologies include examples from Market Data Feed, such as market-level trades and candles data, as well as aggregated price methodologies from CM Prices, such as Reference Rates, Reference Rate Candles, and Principal Market Price.

**Use Cases**: Fund Administration, Asset Management, Trading, Research

**Personas**: Fund Admin, Oracles, Quant Trader, Market Analyst

### [comparing-volumes-of-exchanges-and-assets.md](comparing-volumes-of-exchanges-and-assets.md "mention")

**Products:** Market Data

**Summary:** This notebook shows how Market Data Feed can be used to analyze exchange volume patterns at several levels: 1) examining aggregate volume across all exchanges using Exchange Metrics, 2) analyzing the relative share of specific assets’ volume within an exchange with Market Candles, and 3) investigating trade sizes (i.e. retail vs. institutional) using Market Trades data.

**Use Cases**: Trading, Research

**Personas**: Quant Trader, Market Analyst

### [md\_futures\_overview.md](md\_futures\_overview.md "mention")

**Products:** Market Data

**Summary:** This notebook steps through various derivatives-specific data types across multiple aggregation windows. First, investigate futures open interest for BTC, broken down by exchange. Then examine individual liquidation trades and their effect on price. Finally, view USD-denominated liquidations aggregated at the exchange level, plotted against the total BTC open interest.

**Use Cases**: Trading, Research, Asset Management

**Personas**: Quant Trader, Market Analyst, Fund Admin

### [md\_options\_aggregation.md](md\_options\_aggregation.md "mention")

**Products:** Market Data

**Summary:** This notebook shows the basic usage for Coin Metrics options data. First, we show how to find the options markets in our coverage. Then, we calculate volume and open interest.  The open interest data is further broken down by puts and calls to look at the put/call ratio in the options markets examined.

**Use Cases**: Trading, Research, Risk Management

**Personas**: Quant Trader, Market Analyst

### [md\_orderbook\_depth.md](md\_orderbook\_depth.md "mention")

**Products:** Market Data Feed

**Summary:** This notebook shows how granular bid/ask data (from our hourly order book snapshots) can be aggregated into a +/-2% liquidity profile to quantify and visualize the amount of available liquidity in individual crypto asset markets. The same methodology is applied to generate order book depth charts in our weekly State of the Market report.

**Use Cases**: Trading, Research, Risk Management (Liquidity)

**Personas**: Quant Trader, Market Analyst

### [aggregating-orderbook-depth-to-create-liquidity-metrics.md](aggregating-orderbook-depth-to-create-liquidity-metrics.md "mention")

**Products:** Market Data

**Summary:** This notebook showcases our new aggregated USD bid/ask depth metrics, allowing users to quickly quantify market liquidity without needing to manually sum up order book snapshots. The notebook steps through the process of selecting relevant BTC fiat & stablecoin trading pairs from the catalog and creating a market-wide view of BTC order book liquidity.

**Use Cases**: Trading, Research, Asset Management, Risk Management

**Personas**: Quant Trader, Market Analyst, Operations/Risk Analyst

### [atlas\_metric\_workbench.md](atlas\_metric\_workbench.md "mention")

**Products:** Network Data, ATLAS

**Summary:** This demo walks through the various ways ATLAS can be used to construct custom metrics not currently available in Network Data Pro. Examples include 1) basic block-by-block metrics (i.e. block-by-block stablecoin transaction counts), 2) cross-asset metrics (i.e. transactions where USDT + USDC are moved simultaneously), and 3) entity-based metrics (i.e. stablecoin flows to DEX pools).

**Use Cases**: Trading, Research

**Personas**: Quant Trader, On-Chain Researcher

### [ndp\_marketcap\_metrics.md](ndp\_marketcap\_metrics.md "mention")

**Products:** Network Data

**Summary:** This notebook steps through Coin Metrics various methodologies for indexing the total market capitalization of major crypto assets. Three market cap metrics are highlighted: verified on-chain market cap (CapMrktCurUSD), estimated market cap (CapMrktEstUSD), and free float market cap (CapMrktFFUSD). The notebook discusses asset coverage and trade-offs for each, and shows how the metrics can be used to quantify the total crypto market cap.

**Use Cases**: Research, Asset Management, Passive Trading

**Personas**: On-Chain Researcher, Fund Admin, Trader

### [atlas\_miner\_signatures.md](atlas\_miner\_signatures.md "mention")

**Products:** Network Data, ATLAS

**Summary:** This demo shows how ATLAS v2’s extra\_data field can be used to extract a block’s “coinbase signature,” which is often used by mining pools to denote blocks they’ve mined. By transforming the data in this field and combining it with other block metadata (i.e. is it an “empty block,” or does it contain transactions?), we can derive a number of interesting mining pool performance and profitability metrics.

**Use Cases**: Research (Bitcoin Mining), Risk Management (Hashrate Concentration)

**Personas**: On-Chain Researcher, Risk Analyst

### [using-staking-metrics-to-get-yield-and-staked-supply.md](using-staking-metrics-to-get-yield-and-staked-supply.md "mention")

**Products:** Network Data

**Summary:** This notebook demonstrates how metrics sourced from the Ethereum Execution Layer (ETH) and the Consensus Layer (ETH\_CL) can be combined to create a holistic picture of the Ethereum staking ecosystem. First, we walk through the process of calculating an “estimated validator yield” based on the number of active validators and the average amount of priority tips. Then, we determine the total amount of staked vs. unstaked supply by examining the ETH Staking Contract.

**Use Cases**: Asset Management, Research, Operations/Risk Management, Passive Trading

**Personas**: Fund Admin, On-Chain Researcher, Operations/Risk Analyst, Trader

### [granular-insights-on-chain-using-hourly-network-data-metrics.md](granular-insights-on-chain-using-hourly-network-data-metrics.md "mention")

**Products:** Network Data

**Summary:** This notebook highlights capabilities enabled by Coin Metrics’ new suite of hourly on-chain metrics. First, we examine the relationship between ETH tx count & “fee burn,” quantifying the amount of Ether removed from circulation during peak periods of activity. Then, investigate the response of BTC fees to slow block times, with median tx fee exhibiting a clear dependence on the mean inter-block interval.

**Use Cases**: Trading, Research, Risk Management

**Personas**: Quant Trader, On-Chain Researcher, Risk Analyst

### [exploring-options-open-interest-and-volatility-data.md](exploring-options-open-interest-and-volatility-data.md "mention")

**Products:** Market Data

**Summary:** This demo shows how to use options market metadata contained in our Catalog/Markets endpoint with the Implied Volatility endpoint to construct “Volatility Smiles,” a popular way of visualizing the relationship between IV and strike price across various contract expiries. A similar analysis is performed in State of the Network 169, in which volatility smiles are examined prior to the ETH “Merge” to proof of stake.

**Use Cases**: Trading, Research

**Personas**: Quant Trader, Market Analyst

### [calculating-total-value-locked-in-liquidity-pools-using-dex-data.md](calculating-total-value-locked-in-liquidity-pools-using-dex-data.md "mention")

**Products:** Network Data, ATLAS, CM Prices, DeFi

**Summary:** This demo shows how ATLAS can be used to monitor imbalances in decentralized exchange liquidity pool contracts. First, leverage the Reference Data endpoint to extract a list of contract addresses for liquidity pools of interest. Then, use ATLAS to query for balance updates in the pool address. Finally, multiply the supply held in the pool contract by the Coin Metrics Reference Rate to calculate USD-denominated pool TVL.

**Use Cases**: Research, Trading, Risk management

**Personas**: On-Chain Researcher, Quant Trader, Operations/Risk Analyst

### [calculating-dex-liquidity-pool-fees-and-volumes.md](calculating-dex-liquidity-pool-fees-and-volumes.md "mention")

**Products:** Network Data, ATLAS, Market Data, DeFi

**Summary:** This notebook explores Coin Metrics’ coverage of decentralized exchanges like Uniswap & Sushiswap. First, examine a list of available liquidity pools, supplemented with contract addresses in the catalog’s DEX-specific fields. Then, dig into swaps data, estimating the number of unique buyers with an added beneficiary field. Finally, pull aggregated market candles to easily compare Uniswap volume against equivalent Coinbase markets.

**Use Cases**: Research, Trading

**Personas**: OnChain Researcher, Quant Trader

### [analyzing-defi-protocol-balance-sheets.md](analyzing-defi-protocol-balance-sheets.md "mention")

**Products:** Network Data, DeFi

**Summary:** This notebook explores our newest DeFi capabilities, unlocking a detailed view of Total Value Locked (TVL) for major lending protocols like AAVE and Compound. After highlighting a set of key “Protocol Health Metrics,” the notebook shows how assets & liabilities can be extracted and transformed into novel TVL metrics.

**Use Cases**: Research, Risk Management

**Personas**: On-Chain Researcher, Operations/Risk Analyst
