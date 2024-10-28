---
description: Crypto intelligence for the future of finance
---

# Welcome & Product Overview

Welcome to the **Coin Metrics Product Documentation**. At Coin Metrics, we organize the world's crypto data and make it transparent and accessible. We offer network data, market data, indexes, and a holistic risk management offering.

## Network Data

### [Network Data Pro (NDP)](network-data/network-data-overview/)

* **Network Data Pro** is a data feed of insightful, aggregate network data metrics for all of the top cryptoassets. These metrics are available with an API key through our [API](https://docs.coinmetrics.io/api/v4/) via the `/timeseries/asset-metrics` endpoint or through our [Data Visualization](data-visualization/) tools or [CM Pro Charts](data-visualization/cmpro/). All Network Data metrics are described in Network Data Overview.

### [Blockchain Explorer (Atlas)](network-data/atlas-overview/)

* **Atlas** is a complete blockchain search engine that enables users to look up information on transactions, addresses, and blocks through a high-performance [API](https://docs.coinmetrics.io/api/v4/). An API key is required to query the `/blockchain-v2/` endpoint via our API. Specifics on the format of the API output are described below in the [**Atlas**](network-data/atlas-overview/) section of this Encyclopedia.

## [Market Data](market-data/market-data-overview/)

### [Market Data Feed (MDF)](market-data/market-data-overview/)

* **Market Data Feed** provides access to historical and real-time data from over 30 of the world’s leading spot and derivatives crypto exchanges. This data is available primarily via the market data endpoints: `/timeseries/market-trades`, `/timeseries/market-openinterest`, `/timeseries/market-liquidations`, `/timeseries/market-funding-rates`, `/timeseries/market-orderbooks`, `/timeseries/market-quotes`, `/timeseries/market-candles` , and more. All endpoints and concepts are described in the [**Market Data**](market-data/market-data-overview/) section. There are also several aggregated market data metrics in `/timeseries/asset-metrics` and `/timeseries/pair-metrics`.

### [CM Prices](./#cm-prices)

* **Reference Rates** provide prices calculated in U.S. Dollars and Euros for several assets using a transparent and independent methodology, robust to manipulation and derived from high-quality constituent markets. This data is available through our [API](access-our-data/api/) (`timeseries/asset-metrics` endpoint) and also in our [Data Visualization](data-visualization/) and [CM Pro Charts](data-visualization/cmpro/).
* **Reference Rates Community** (Community [API](access-our-data/api/), [Data Visualization](data-visualization/), [Pro Charts](data-visualization/cmpro/)) provides access to all of our reference rates with a limited amount of history for our more granular resolutions. For more info on our Community terms and offerings see our [Labs](https://coinmetrics.io/cm-labs/) page

## [Indexes](broken-reference/)

### [Coin Metrics Bletchley Indexes (CMBI)](https://coinmetrics.io/cm-indexes/)

* **Coin Metrics Bletchley Indexes (CMBI)** are a comprehensive suite of single-asset, multi-asset, and unique crypto asset benchmarks used by leading crypto and traditional financial institutions. This data is available through our [API](access-our-data/api/) (`timeseries/index-levels` and `/timeseries/index-constituents` endpoints) and also in our [Data Visualization](data-visualization/) and [CM Pro Charts](data-visualization/cmpro/).
* **CMBI Community** (Community [API](access-our-data/api/), [Data Visualization](data-visualization/), [Pro Charts](data-visualization/cmpro/)) provides access to all of our index levels with a limited amount of history for our more granular resolutions. For more info on our Community terms and offerings see our [Labs](https://coinmetrics.io/cm-labs/) page. A further description of the limitations of this data is listed in the data concepts in the **Indexes** section of this Encyclopedia.

## [Reference Data](./#reference-data)

* [**Datonomy**](reference-data/datonomy-overview/) is a digital asset classification system created by Coin Metrics, Goldman Sachs and MSCI that creates a consistent, standardized way for investors to analyze the digital assets ecosystem. This data is available via our API via the `/taxonomy/assets` endpoint.
* [**Asset Profiles**](reference-data/asset-profiles-overview/asset-profiles.md) are descriptions of cryptoassets that supplement our asset metrics data to provide a comprehensive overview of a particular asset. This data is available via our API via the `/profiles/assets` endpoint.
* The [**Security Master**](reference-data/security-master-overview/) is a dataset that unifies metadata and provides fundamental reference data about crypto assets and markets. The data is available via our API via the `/security-master/` endpoint.
