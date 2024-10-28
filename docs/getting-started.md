# Getting Started

Welcome! Follow the steps below to get started with using Coin Metrics data.

## 1. Set up Your API Key

Most of our data requires an API Key. If you want an API key, get in touch with us on our contact page: [https://coinmetrics.io/contact/](https://coinmetrics.io/contact/)

We offer some data for free under our Community Data. For more information, go to: [coin-metrics-community-data.md](packages/coin-metrics-community-data.md "mention")

Data coverage can be seen by plugging in your API key at [coverage.coinmetrics.io](https://coverage.coinmetrics.io)

## 2. Learn How to Use Coin Metrics Tools

Coin Metrics offers several ways to access our data.

### For Business Users

You can use our [Data Viz](https://charts.coinmetrics.io/crypto-data/) to create charts dynamically using a point-and-click interface without any code. To learn how to use the charting tool, see our data visualization guide.

[data-visualization](data-visualization/ "mention")

You can directly download files from your browser by adding a "format=csv" in your HTTP request, i.e. `https://api.coinmetrics.io/v4/timeseries/asset-metrics?assets=btc&metrics=PriceUSD,FlowInGEMUSD&frequency=1d&pretty=true&api_key=<your_key>&format=csv`

On Google Sheets, you can use the `IMPORTDATA` function on the formula tab:

`=IMPORTDATA("`[`https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=CapMrktEstUSD,SplyCur,PriceUSD,CapMrktCurUSD&api_key=`](https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=CapMrktEstUSD,SplyCur,PriceUSD,CapMrktCurUSD\&api\_key=)`<API_KEY>&assets=usdc&frequency=1d&limit_per_asset=1&format=csv")`

For more information on exporting data, see the guide: [exporting-data.md](tutorials-and-examples/user-guides/exporting-data.md "mention")

### For Developers

You can use our [API](https://docs.coinmetrics.io/api/v4/) for accessing data. To learn more about our API design, see the [API Conventions](access-our-data/api/) page.

[api](access-our-data/api/ "mention")

We offer convenient wrappers for our API in different languages.

#### **Python Users**

[python-client.md](access-our-data/python-client.md "mention")

**R Users**

[r-client.md](access-our-data/r-client.md "mention")

## 3. Use and Explore Coin Metrics Data

You can view examples of how to use Coin Metrics data in the [Tutorials and Examples](tutorials-and-examples/) section.

We recommend new users to read the following guides first to get a basic understanding of Coin Metrics data:

* [Python API Client Walkthrough](tutorials-and-examples/tutorials/walkthrough\_community.md)
* [Data Visualization Walkthrough](data-visualization/)
* [How To Export Data](tutorials-and-examples/user-guides/exporting-data.md)

Refer to our more use-case-specific guides to make the most out of our data:

* [how-to-use-the-coin-metrics-api-efficiently-http.md](tutorials-and-examples/user-guides/how-to-use-the-coin-metrics-api-efficiently-http.md "mention")
* [How To Migrate From Catalog V1 to Catalog V2](tutorials-and-examples/user-guides/how-to-migrate-from-catalog-v1-to-catalog-v2.md)

## 4. Understand our Data

Coin Metrics data is divided into the following types of data:

* **Network Data**: Data sourced directly onchain, primarily from nodes maintained by Coin Metrics.
* **Market Data**: Historical and real-time data from the world’s leading centralized and decentralized (Labs) spot and derivatives crypto exchanges
* **Index Data**: Independent measurements of cryptoasset market performance and network activity
* **Reference Data**: Information about the properties of a token or other entity.

[network-data-overview](network-data/network-data-overview/ "mention")

[market-data-overview](market-data/market-data-overview/ "mention")

[index](index-data/index/ "mention")

[Broken link](broken-reference "mention")

More information on each dataset can be found in their respective sections. You can find different metrics or data types by navigating the sidebar e.g. Market Data Overview > Volume > Trusted Volume, Network Data Overview > Addresses > Active Addresses.

Coin Metrics data is heavily featured in our research at [https://coinmetrics.io/insights/](https://coinmetrics.io/insights/). You can subscribe to our weekly newsletter State of the Network at [https://coinmetrics.substack.com/](https://coinmetrics.substack.com/).&#x20;
