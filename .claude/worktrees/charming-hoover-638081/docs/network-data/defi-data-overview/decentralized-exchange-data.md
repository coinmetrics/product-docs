# Decentralized Exchange Data

Decentralized Finance (DeFi) is a rapidly emerging ecosystem of applications and protocols used for trading, lending, and various other financial services. Rather than relying on centralized intermediaries, these protocols utilize permissionless blockchains such as Ethereum to conduct the majority of their activities and transactions on-chain.

## Decentralized Exchange Swaps Data

Our decentralized exchange (DEX) market data is collected directly from the blockchain and harmonized to match the format of our centralized exchange market data. Each liquidity pool contract is represented as a distinct market, with many pairs being traded across multiple liquidity pools with alternative fee structures.

Market coverage can be found by querying our [/catalog-v2/market-trades](https://docs.coinmetrics.io/api/v4/#tag/Catalog-v2/operation/getCatalogV2MarketTrades), [/catalog-all-v2/market-trades](https://docs.coinmetrics.io/api/v4/#tag/Full-catalog-v2/operation/getCatalogAllV2MarketTrades), or [/reference-data/markets](https://docs.coinmetrics.io/api/v4/#tag/Reference-Data/operation/getReferenceDataMarkets)  API endpoints. Using the market-trades endpoints, decentralized exchanges can be identified as any market where the `market` parameter in the response contains the exchange value. Alternatively, the catalog results can be queried with the `exchange` parameter set to any of the exchange values in the table below. Using the reference-data endpoint, decentralized exchanges can be identified as any market where the `exchange` parameter contains the exchange value from the table below.

Currently we offer coverage of 5 DEX protocols:

<table><thead><tr><th width="181.33333333333331">Exchange Name</th><th>Exchange</th><th width="217" align="center">Spot Market Count</th><th align="center">Start Date</th></tr></thead><tbody><tr><td>Curve</td><td>curve_eth</td><td align="center">200</td><td align="center">2020-02-10</td></tr><tr><td>Sushiswap</td><td>sushiswap_v1_eth</td><td align="center">216</td><td align="center">2020-09-04</td></tr><tr><td>Uniswap v1</td><td>uniswap_v1_eth</td><td align="center">39</td><td align="center">2018-11-02</td></tr><tr><td>Uniswap v2</td><td>uniswap_v2_eth</td><td align="center">660</td><td align="center">2020-05-05</td></tr><tr><td>Uniswap v3</td><td>uniswap_v3_eth</td><td align="center">989</td><td align="center">2021-05-04</td></tr></tbody></table>

In addition to returning standard metadata such as the market's base and quote asset, DEX market entries in the reference-data endpoint also contain several DeFi-specific fields:

* `contract_address`: The smart contract address of the liquidity pool contract.
* `fee`: The fee percentage charged for each swap. Fees are distributed pro-rata to the pool's liquidity providers.
* `base_address`: The address of the ERC-20 token contract associated with the _base_ asset.
* `quote_address`: The address of the ERC-20 token contract associated with the _quote_ asset.

## Data Available at the Market Level

Many of our data types are available at the market level. For decentralized exchanges, we define a market as a specific liquidity pool contract deployed on a specific decentralized exchange, like `uniswap_v2_eth-1inch-aave-spot` or `uniswap_v3_eth-2-wsteth-weth-spot` or `sushiswap_v1_eth-srm-weth-spot`. The data types listed below are available for each DEX liquidity pool:

{% content-ref url="../../market-data/market-data-overview/market-trades.md" %}
[market-trades.md](../../market-data/market-data-overview/market-trades.md)
{% endcontent-ref %}

{% content-ref url="../../market-data/market-data-overview/candles.md" %}
[candles.md](../../market-data/market-data-overview/candles.md)
{% endcontent-ref %}

In addition to returning standard metadata such as the trade's size and price, DEX market entries in the catalog also contain several DeFi-specific fields:

* `block_hash`: The unique hash of the block containing the swap transaction.
* `block_height`: The height of the block containing the swap transaction.
* `txid`: The transaction hash associated with the swap.
* `initiator`: The Ethereum address which submitted the transaction, as a result of which the swap occurred.
* `sender`: The Ethereum address that invoked the liquidity pool smart contract's function for swapping.
* `beneficiary`: The Ethereum address credited with the output tokens upon the completion of a swap.

## Data Available at the Exchange-Asset Pair Level

Coin Metrics calculates several metrics for exchange-asset pairs such as `uniswap_v3_eth-usdc`, `sushiswap_v1_eth-aave`, and `uniswap_v2_eth-wbtc`. The exchange coverage can be found by querying our [`/catalog/exchange-assets`](https://docs.coinmetrics.io/api/v4#operation/getCatalogExchangeAssets) or [`/catalog-all/exchange-assets`](https://docs.coinmetrics.io/api/v4#operation/getCatalogAllExchangeAssets) API endpoints.

Data available at the exchange-asset level is available through the [`/timeseries/exchange-asset-metrics`](https://docs.coinmetrics.io/api/v4#operation/getTimeseriesExchangeAssetMetrics) API endpoint and specific metrics are described in the pages linked in this section:

{% content-ref url="../../market-data/market-data-overview/volume/" %}
[volume](../../market-data/market-data-overview/volume/)
{% endcontent-ref %}

## Data Available at Exchange Level

Coin Metrics calculates several metrics for decentralized exchanges such as `uniswap_v3_eth`, `uniswap_v2_eth`, and `sushiswap_v1_eth`. The exchange coverage can be found by querying our [`/catalog/exchanges`](https://docs.coinmetrics.io/api/v4#operation/getCatalogExchanges) or [`/catalog-all/exchanges`](https://docs.coinmetrics.io/api/v4#operation/getCatalogAllExchanges) API endpoints.

Data available at the exchange level is available through the [`/timeseries/exchange-metrics`](https://docs.coinmetrics.io/api/v4#operation/getTimeseriesExchangeMetrics) API endpoint and specific metrics are described in the pages linked in this section:

{% content-ref url="../../market-data/market-data-overview/volume/" %}
[volume](../../market-data/market-data-overview/volume/)
{% endcontent-ref %}
