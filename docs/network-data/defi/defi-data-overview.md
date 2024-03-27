# DeFi Overview

Decentralized Finance (DeFi) is a rapidly emerging ecosystem of applications and protocols used for trading, lending, and various other financial services. Rather than relying on centralized intermediaries, these protocols utilize permissionless blockchains such as Ethereum to conduct the majority of their activities and transactions on-chain.

[**Balance Sheet Endpoint**](defi-balance-sheets-overview.md)

Coin Metrics’ DeFi Balance Sheet endpoint enables users to monitor, analyze and reason about a DeFi protocol’s financial health using a familiar, balance sheet-like data model.  Coin Metrics’ approach to TVL, as shared in our State of the Network [Understanding Total Value Locked (TVL),  ](https://coinmetrics.substack.com/p/coin-metrics-state-of-the-network-0c0#new\_tab)takes a more granular approach to the previous methods of tracking value in DeFi protocols.&#x20;

This data can be accessed at our[ /timeseries/defi-balance-sheets](https://docs.coinmetrics.io/api/v4#operation/getDefiBalanceSheets) API endpoint. Data in this endpoint is made available on an end of day basis (00:00 UTC).&#x20;

This endpoint currently supports Aave v2 and Compound v2 on Ethereum. We will be expanding coverage in this endpoint throughout the rest of the year to cover DEXs and other emerging popular DeFi protocols.&#x20;

[**DEX Swaps Data**](../defi-data-overview/decentralized-exchange-data.md)

In CM Market Data Feed v2.6 we announced that Uniswap and Sushiswap swaps,  liquidity pool metadata, candles, and volume metrics. Coin Metrics has been actively working on collecting data from major DeFi protocols. For our first release, we are adding support for all major liquidity pools on Uniswap v2, Uniswap v3, and Sushiswap v1.

Swaps data is served through our existing [/timeseries/market-trades](https://docs.coinmetrics.io/api/v4#operation/getTimeseriesMarketTrades) endpoint because swaps are conceptually identical to a trade. Users can see all the standard trade fields for a swap such as time, price, and volume but can also see DeFi-specific fields such as the block hash, transaction id, the addresses involved in the swap, and more by passing the include\_DeFi\_fields=true parameter.

Metadata about all major liquidity pools such as the base and quote asset, contract addresses, fees are also available through our [/catalog/markets](https://docs.coinmetrics.io/api/v4#operation/getCatalogMarkets) endpoint.

Candles for all major liquidity pools are also available through our [/timeseries/market-candles](https://docs.coinmetrics.io/api/v4#operation/getTimeseriesMarketCandles) endpoint.Reported spot volume metrics (volume\_reported\_spot\_usd\_1d and volume\_reported\_spot\_usd\_1h) are available at the exchange and exchange-asset level through our [/timeseries/exchange-metrics](https://docs.coinmetrics.io/api/v4#operation/getTimeseriesExchangeMetrics) and [/timeseries/exchange-asset-metrics](https://docs.coinmetrics.io/api/v4#operation/getTimeseriesExchangeAssetMetrics) endpoints.&#x20;

This DEX swaps data is now available through our [Websocket streaming API](https://docs.coinmetrics.io/api/v4/#tag/Timeseries-stream).&#x20;

[**DeFi Token Coverage**](broken-reference)

Through our Network Data Pro offering you can access 18+ different DeFi Tokens for metrics like Market Cap, Supply, Active Addresses and many more metrics. These insights can provide health and usability of these DeFi tokens and their associated Protocols.&#x20;
