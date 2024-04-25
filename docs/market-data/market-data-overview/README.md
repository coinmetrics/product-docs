# Market Data Overview

The [CM Market Data Feed](https://coinmetrics.io/market-data-feed/) (MDF) provides access to historical and real-time data from the world’s leading centralized and [decentralized (Labs)](../../network-data/defi-data-overview/decentralized-exchange-data.md) spot and derivatives crypto [exchanges](https://coverage.coinmetrics.io/exchanges-v2/). We offer a wide range of harmonized datasets such as trades, candles, order book snapshots, futures-specific data types, and options-specific data types. We also offer metrics at the asset, exchange, exchange-asset, pair, and institution level.

Our data is available at several different levels: asset, exchange, market, asset pair, exchange-asset pair, and institution. Our coverage universe consists of 3k+ assets, 39 exchanges, 21k+ spot markets, 10k+ futures markets, 14k+ options markets, 4k+ asset pairs, and one institution.

## Data Available at Market Level

Many of our data types are available at the market level. We define a market as a specific listed pair or derivatives contract that trades on a specific exchange, like `coinbase-btc-usd-spot` or `binance-BTCUSDT-future` or `deribit-BTC-16MAY21-58000-C-option`. The market coverage can be found by querying our [`/catalog/markets`](https://docs.coinmetrics.io/api/v4#operation/getCatalogMarkets) or [`/catalog-all/markets`](https://docs.coinmetrics.io/api/v4#operation/getCatalogAllMarkets) API endpoints.

Data available at the market level is served through the API endpoints below, which are described in the pages linked in this section:

* [`/catalog/markets`](https://docs.coinmetrics.io/api/v4#operation/getCatalogMarkets) and [`/catalog-all/markets`](https://docs.coinmetrics.io/api/v4#operation/getCatalogAllMarkets)
* [`/timeseries/market-trades`](https://docs.coinmetrics.io/api/v4#operation/getTimeseriesMarketTrades)
* [`/timeseries/market-openinterest`](https://docs.coinmetrics.io/api/v4#operation/getTimeseriesMarketOpenIntereset)
* [`/timeseries/market-liquidations`](https://docs.coinmetrics.io/api/v4#operation/getTimeseriesMarketLiquidations)
* [`/timeseries/market-funding-rates`](https://docs.coinmetrics.io/api/v4#operation/getTimeseriesMarketFundingRates)
* [`/timeseries/market-orderbooks`](https://docs.coinmetrics.io/api/v4#operation/getTimeseriesMarketOrderbooks)
* [`/timeseries/market-quotes`](https://docs.coinmetrics.io/api/v4#operation/getTimeseriesMarketQuotes)
* [`/timeseries/market-candles`](https://docs.coinmetrics.io/api/v4#operation/getTimeseriesMarketCandles)
* [`/timeseries/market-contract-prices`](https://docs.coinmetrics.io/api/v4#operation/getTimeseriesMarketContractPrices)
* [`/timeseries/market-implied-volatility`](https://docs.coinmetrics.io/api/v4#operation/getTimeseriesMarketImpliedVolatility)
* [`/timeseries/market-greeks`](https://docs.coinmetrics.io/api/v4#operation/getTimeseriesMarketGreeks)

{% content-ref url="market-metadata.md" %}
[market-metadata.md](market-metadata.md)
{% endcontent-ref %}

{% content-ref url="market-trades.md" %}
[market-trades.md](market-trades.md)
{% endcontent-ref %}

{% content-ref url="open_interest/market-open-interest.md" %}
[market-open-interest.md](open\_interest/market-open-interest.md)
{% endcontent-ref %}

{% content-ref url="liquidations/futures-liquidations.md" %}
[futures-liquidations.md](liquidations/futures-liquidations.md)
{% endcontent-ref %}

{% content-ref url="funding-rates/futures-funding-rates.md" %}
[futures-funding-rates.md](funding-rates/futures-funding-rates.md)
{% endcontent-ref %}

{% content-ref url="market-order-book.md" %}
[market-order-book.md](market-order-book.md)
{% endcontent-ref %}

{% content-ref url="quotes.md" %}
[quotes.md](quotes.md)
{% endcontent-ref %}

{% content-ref url="candles.md" %}
[candles.md](candles.md)
{% endcontent-ref %}

{% content-ref url="market-contract-prices.md" %}
[market-contract-prices.md](market-contract-prices.md)
{% endcontent-ref %}

{% content-ref url="volatility/market-implied-volatility.md" %}
[market-implied-volatility.md](volatility/market-implied-volatility.md)
{% endcontent-ref %}

{% content-ref url="market-greeks.md" %}
[market-greeks.md](market-greeks.md)
{% endcontent-ref %}

{% content-ref url="../faqs/" %}
[faqs](../faqs/)
{% endcontent-ref %}

## Metrics Available at Market Level

Coin Metrics calculates several metrics for markets such as `coinbase-btc-usd-spot` and `binance-BTCUSDT-future`. The asset coverage can be found by querying our [`/catalog/market-metrics`](https://docs.coinmetrics.io/api/v4#operation/getCatalogMarketMetrics) or [`/catalog-all/market-metrics`](https://docs.coinmetrics.io/api/v4#operation/getCatalogAllMarketMetrics) API endpoints.

Metrics available at the market level are available through the [`/timeseries/market-metrics`](https://docs.coinmetrics.io/api/v4#operation/getTimeseriesMarketMetrics) API endpoint and specific metrics are described in the pages linked in this section:

{% content-ref url="liquidations/" %}
[liquidations](liquidations/)
{% endcontent-ref %}

{% content-ref url="liquidity/" %}
[liquidity](liquidity/)
{% endcontent-ref %}

## Metrics Available at Asset Level

Coin Metrics calculates several metrics for assets such as `btc` and `eth`. The asset coverage can be found by querying our [`/catalog/assets`](https://docs.coinmetrics.io/api/v4#operation/getCatalogAssets) or [`/catalog-all/assets`](https://docs.coinmetrics.io/api/v4#operation/getCatalogAllAssets) API endpoints.

Metrics available at the asset level are available through the [`/timeseries/asset-metrics`](https://docs.coinmetrics.io/api/v4#operation/getTimeseriesAssetMetrics) API endpoint and specific metrics are described in the pages linked in this section:

{% content-ref url="../reference-rates-overview/reference_rate.md" %}
[reference\_rate.md](../reference-rates-overview/reference\_rate.md)
{% endcontent-ref %}

{% content-ref url="open_interest/" %}
[open\_interest](open\_interest/)
{% endcontent-ref %}

{% content-ref url="volume/" %}
[volume](volume/)
{% endcontent-ref %}

## Metrics Available at Exchange Level

Coin Metrics calculates several metrics for exchanges such as `coinbase`, `binance`, and `deribit`. The exchange coverage can be found by querying our [`/catalog/exchanges`](https://docs.coinmetrics.io/api/v4#operation/getCatalogExchanges) or [`/catalog-all/exchanges`](https://docs.coinmetrics.io/api/v4#operation/getCatalogAllExchanges) API endpoints.

Metrics available at the exchange level are available through the [`/timeseries/exchange-metrics`](https://docs.coinmetrics.io/api/v4#operation/getTimeseriesExchangeMetrics) API endpoint and specific metrics are described in the pages linked in this section:

{% content-ref url="open_interest/" %}
[open\_interest](open\_interest/)
{% endcontent-ref %}

{% content-ref url="volume/" %}
[volume](volume/)
{% endcontent-ref %}

## Metrics Available at Exchange-Asset Pair Level

Coin Metrics calculates several metrics for exchange-asset pairs such as `coinbase-btc`, `binance-eth`, and `deribit-usdt`. The exchange coverage can be found by querying our [`/catalog/exchange-assets`](https://docs.coinmetrics.io/api/v4#operation/getCatalogExchangeAssets) or [`/catalog-all/exchange-assets`](https://docs.coinmetrics.io/api/v4#operation/getCatalogAllExchangeAssets) API endpoints.

Metrics available at the exchange-asset level are available through the [`/timeseries/exchange-asset-metrics`](https://docs.coinmetrics.io/api/v4#operation/getTimeseriesExchangeAssetMetrics) API endpoint and specific metrics are described in the pages linked in this section:

{% content-ref url="basis.md" %}
[basis.md](basis.md)
{% endcontent-ref %}

{% content-ref url="liquidations/" %}
[liquidations](liquidations/)
{% endcontent-ref %}

{% content-ref url="open_interest/" %}
[open\_interest](open\_interest/)
{% endcontent-ref %}

{% content-ref url="volume/" %}
[volume](volume/)
{% endcontent-ref %}

## Metrics Available at Asset Pair Level

Coin Metrics calculates several metrics for asset pairs such as `btc-usd` and `eth-usd`. The institution coverage can be found by querying our [`/catalog/pairs`](https://docs.coinmetrics.io/api/v4#operation/getCatalogAssetPairs) or [`/catalog-all/pairs`](https://docs.coinmetrics.io/api/v4#operation/getCatalogAllAssetPairs) API endpoints.

Metrics available at the asset pair level are

available through the [`/timeseries/pair-metrics`](https://docs.coinmetrics.io/api/v4#operation/getTimeseriesPairMetrics) API endpoint and specific metrics are described in the pages linked in this section:

{% content-ref url="open_interest/" %}
[open\_interest](open\_interest/)
{% endcontent-ref %}

{% content-ref url="volume/" %}
[volume](volume/)
{% endcontent-ref %}

## Market Data Exchange Coverage

CM Market Data Feed provides access to historical and real-time data from over 40 of the world’s leading spot and derivatives crypto exchanges.

Our most up-to-date exchange coverage can be viewed in our [CM Data Coverage Tool](https://coverage.coinmetrics.io/exchanges). Our coverage tool displays the total number of spot, futures and options markets, as well as the range of history available.

The available exchanges and the metrics available for each exchange can be found by querying our [`/catalog/exchanges` ](https://docs.coinmetrics.io/api/v4#operation/getCatalogExchanges)or [`/catalog-all/exchanges` ](https://docs.coinmetrics.io/api/v4#operation/getCatalogAllExchanges)API endpoints.

Market data for these exchanges is served through our [market data endpoints](https://docs.coinmetrics.io/market-data/market-data-overview).

## Metrics Available at Institution Level

Coin Metrics calculates several metrics for institutions such as `grayscale`. The institution coverage can be found by querying our [`/catalog/institutions`](https://docs.coinmetrics.io/api/v4#operation/getCatalogInstitutions) or [`/catalog-all/institutions`](https://docs.coinmetrics.io/api/v4#operation/getCatalogAllInstitutions) API endpoints.

Metrics available at the institution level is available through the [`/timeseries/institution-metrics`](https://docs.coinmetrics.io/api/v4#operation/getTimeseriesInstitutionMetrics) API endpoint and specific metrics are described in the pages linked in this section:

{% content-ref url="institution-metrics-overview/grayscale/" %}
[grayscale](institution-metrics-overview/grayscale/)
{% endcontent-ref %}
