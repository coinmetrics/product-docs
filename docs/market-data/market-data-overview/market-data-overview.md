# Market Data Overview

The [CM Market Data Feed](https://coinmetrics.io/market-data-feed/) (MDF) provides access to historical and real-time data from the world’s leading centralized and decentralized (Labs) spot and derivatives crypto exchanges. We offer a wide range of harmonized datasets such as trades, candles, order book snapshots, futures-specific data types, and options-specific data types. We also offer metrics at the asset, exchange, exchange-asset, pair, and institution level.&#x20;

Our data is available at several different levels: asset, exchange, market, asset pair, exchange-asset pair, and institution. Our coverage universe consists of 3k+ assets, 39 exchanges, 21k+ spot markets, 10k+ futures markets, 14k+ options markets, 4k+ asset pairs, and one institution.&#x20;

## Data Available at Market Level&#x20;

Many of our data types are available at the market level. We define a market as a specific listed pair or derivatives contract that trades on a specific exchange, like `coinbase-btc-usd-spot` or `binance-BTCUSDT-future` or `deribit-BTC-16MAY21-58000-C-option`. The market coverage can be found by querying our [`/catalog/markets`](https://docs.coinmetrics.io/api/v4#operation/getCatalogMarkets) or [`/catalog-all/markets`](https://docs.coinmetrics.io/api/v4#operation/getCatalogAllMarkets) API endpoints.

Data available at the market level is served through the API endpoints below, which are described in the pages linked in this section:&#x20;

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

{% content-ref url="market-metadata/market-metadata.md" %}
[market-metadata.md](market-metadata/market-metadata.md)
{% endcontent-ref %}

{% content-ref url="trades/market-trades.md" %}
[market-trades.md](trades/market-trades.md)
{% endcontent-ref %}

{% content-ref url="open-interest/market-open-interest.md" %}
[market-open-interest.md](open-interest/market-open-interest.md)
{% endcontent-ref %}

{% content-ref url="liquidations/futures-liquidations.md" %}
[futures-liquidations.md](liquidations/futures-liquidations.md)
{% endcontent-ref %}

{% content-ref url="funding-rates/futures-funding-rates.md" %}
[futures-funding-rates.md](funding-rates/futures-funding-rates.md)
{% endcontent-ref %}

{% content-ref url="orderbooks/market-order-book.md" %}
[market-order-book.md](orderbooks/market-order-book.md)
{% endcontent-ref %}

{% content-ref url="quotes/quotes.md" %}
[quotes.md](quotes/quotes.md)
{% endcontent-ref %}

{% content-ref url="candles/candles.md" %}
[candles.md](candles/candles.md)
{% endcontent-ref %}

{% content-ref url="contract-prices/market-contract-prices.md" %}
[market-contract-prices.md](contract-prices/market-contract-prices.md)
{% endcontent-ref %}

{% content-ref url="volatility/market-implied-volatility.md" %}
[market-implied-volatility.md](volatility/market-implied-volatility.md)
{% endcontent-ref %}

{% content-ref url="greeks/market-greeks.md" %}
[market-greeks.md](greeks/market-greeks.md)
{% endcontent-ref %}

{% content-ref url="market-data-faqs.md" %}
[market-data-faqs.md](market-data-faqs.md)
{% endcontent-ref %}

## Metrics Available at Market Level

Coin Metrics calculates several metrics for markets such as `coinbase-btc-usd-spot` and `binance-BTCUSDT-future`. The asset coverage can be found by querying our [`/catalog/market-metrics`](https://docs.coinmetrics.io/api/v4#operation/getCatalogMarketMetrics) or [`/catalog-all/market-metrics`](https://docs.coinmetrics.io/api/v4#operation/getCatalogAllMarketMetrics) API endpoints.

Metrics available at the market level are available through the [`/timeseries/market-metrics`](https://docs.coinmetrics.io/api/v4#operation/getTimeseriesMarketMetrics) API endpoint and specific metrics are described in the pages linked in this section:

{% content-ref url="liquidations/liquidations.md" %}
[liquidations](liquidations/liquidations.md)
{% endcontent-ref %}

{% content-ref url="liquidity/README.md" %}
[liquidity](liquidity/README.md)
{% endcontent-ref %}

## Metrics Available at Asset Level

Coin Metrics calculates several metrics for assets such as `btc` and `eth`. The asset coverage can be found by querying our [`/catalog/assets`](https://docs.coinmetrics.io/api/v4#operation/getCatalogAssets) or [`/catalog-all/assets`](https://docs.coinmetrics.io/api/v4#operation/getCatalogAllAssets) API endpoints.

Metrics available at the asset level are available through the [`/timeseries/asset-metrics`](https://docs.coinmetrics.io/api/v4#operation/getTimeseriesAssetMetrics) API endpoint and specific metrics are described in the pages linked in this section:&#x20;

{% content-ref url="prices/reference_rate.md" %}
[referencerateusd.md](prices/reference_rate.md)
{% endcontent-ref %}

{% content-ref url="open-interest/open_interest.md" %}
[open-interest](open-interest/open_interest.md)
{% endcontent-ref %}

{% content-ref url="volume/volume.md" %}
[volume](volume/volume.md)
{% endcontent-ref %}

## Metrics Available at Exchange Level

Coin Metrics calculates several metrics for exchanges such as `coinbase`, `binance`, and `deribit`. The exchange coverage can be found by querying our [`/catalog/exchanges`](https://docs.coinmetrics.io/api/v4#operation/getCatalogExchanges) or [`/catalog-all/exchanges`](https://docs.coinmetrics.io/api/v4#operation/getCatalogAllExchanges) API endpoints.

Metrics available at the exchange level are available through the [`/timeseries/exchange-metrics`](https://docs.coinmetrics.io/api/v4#operation/getTimeseriesExchangeMetrics) API endpoint and specific metrics are described in the pages linked in this section:&#x20;

{% content-ref url="open-interest/open_interest.md" %}
[open-interest](open-interest/open_interest.md)
{% endcontent-ref %}

{% content-ref url="volume/volume.md" %}
[volume](volume/volume.md)
{% endcontent-ref %}

## Metrics Available at Exchange-Asset Pair Level&#x20;

Coin Metrics calculates several metrics for exchange-asset pairs such as `coinbase-btc`, `binance-eth`, and `deribit-usdt`. The exchange coverage can be found by querying our [`/catalog/exchange-assets`](https://docs.coinmetrics.io/api/v4#operation/getCatalogExchangeAssets) or [`/catalog-all/exchange-assets`](https://docs.coinmetrics.io/api/v4#operation/getCatalogAllExchangeAssets) API endpoints.

Metrics available at the exchange-asset level are available through the [`/timeseries/exchange-asset-metrics`](https://docs.coinmetrics.io/api/v4#operation/getTimeseriesExchangeAssetMetrics) API endpoint and specific metrics are described in the pages linked in this section:&#x20;

{% content-ref url="basis/basis.md" %}
[basis](basis/basis.md)
{% endcontent-ref %}

{% content-ref url="liquidations/liquidations.md" %}
[liquidations.md](liquidations/liquidations.md)
{% endcontent-ref %}

{% content-ref url="open-interest/open_interest.md" %}
[open-interest.md](open-interest/open_interest.md)
{% endcontent-ref %}

{% content-ref url="volume/volume.md" %}
[volume.md](volume/volume.md)
{% endcontent-ref %}

## Metrics Available at Asset Pair Level

Coin Metrics calculates several metrics for asset pairs such as `btc-usd` and `eth-usd`. The institution coverage can be found by querying our [`/catalog/pairs`](https://docs.coinmetrics.io/api/v4#operation/getCatalogAssetPairs) or [`/catalog-all/pairs`](https://docs.coinmetrics.io/api/v4#operation/getCatalogAllAssetPairs) API endpoints.

Metrics available at the asset pair level are

&#x20;available through the [`/timeseries/pair-metrics`](https://docs.coinmetrics.io/api/v4#operation/getTimeseriesPairMetrics) API endpoint and specific metrics are described in the pages linked in this section:&#x20;

{% content-ref url="open-interest/open_interest.md" %}
[pair-open-interest](open-interest/open_interest.md)
{% endcontent-ref %}

{% content-ref url="volume/volume.md" %}
[pair-volume](volume/volume.md)
{% endcontent-ref %}

## Market Data Exchange Coverage

CM Market Data Feed provides access to historical and real-time data from over 40 of the world’s leading spot and derivatives crypto exchanges.&#x20;

Our most up-to-date exchange coverage can be viewed in our [CM Data Coverage Tool](https://coverage.coinmetrics.io/exchanges). Our coverage tool displays the total number of spot, futures and options markets, as well as the range of history available.&#x20;

The available exchanges and the metrics available for each exchange can be found by querying our [`/catalog/exchanges`  ](https://docs.coinmetrics.io/api/v4#operation/getCatalogExchanges)or [`/catalog-all/exchanges`  ](https://docs.coinmetrics.io/api/v4#operation/getCatalogAllExchanges)API endpoints.

Market data for these exchanges is served through our [market data endpoints](https://docs.coinmetrics.io/market-data/market-data-overview).&#x20;

## Metrics Available at Institution Level

Coin Metrics calculates several metrics for institutions such as `grayscale`. The institution coverage can be found by querying our [`/catalog/institutions`](https://docs.coinmetrics.io/api/v4#operation/getCatalogInstitutions) or [`/catalog-all/institutions`](https://docs.coinmetrics.io/api/v4#operation/getCatalogAllInstitutions) API endpoints.

Metrics available at the institution level is available through the [`/timeseries/institution-metrics`](https://docs.coinmetrics.io/api/v4#operation/getTimeseriesInstitutionMetrics) API endpoint and specific metrics are described in the pages linked in this section:

{% content-ref url="institution-metrics/grayscale" %}
[grayscale](institution-metrics/grayscale)
{% endcontent-ref %}
