# Market Price

## Overview

The market price per share of an investment trust or fund in U.S. dollars. The metric name is prefixed by the ticker symbol of the investment product (e.g. `gbtc_market_price` for Grayscale's Bitcoin Investment Trust). Market price per share reflects the closing price of the product's shares on the relevant exchange or over-the-counter market.

## Metrics

<table data-full-width="true"><thead><tr><th width="500">Metric</th><th>Description</th><th width="100">Frequency</th></tr></thead><tbody><tr><td><code>bat_market_price</code></td><td>The market price per share of Grayscale Basic Attention Token Trust in U.S. dollars.</td><td>1d</td></tr><tr><td><code>bch_market_price</code></td><td>The market price per share of Grayscale Bitcoin Cash Trust in U.S. dollars.</td><td>1d</td></tr><tr><td><code>bcor_market_price</code></td><td>The market price per share of Grayscale Bitcoin Covered Call ETF in U.S. dollars.</td><td>1d</td></tr><tr><td><code>btc_market_price</code></td><td>The market price per share of Grayscale Bitcoin Trust in U.S. dollars.</td><td>1d</td></tr><tr><td><code>defi_market_price</code></td><td>The market price per share of Grayscale DeFi Fund in U.S. dollars.</td><td>1d</td></tr><tr><td><code>dlc_market_price</code></td><td>The market price per share of Grayscale Digital Large Cap Fund in U.S. dollars.</td><td>1d</td></tr><tr><td><code>etc_market_price</code></td><td>The market price per share of Grayscale Ethereum Classic Trust in U.S. dollars.</td><td>1d</td></tr><tr><td><code>eth_market_price</code></td><td>The market price per share of Grayscale Ethereum Trust in U.S. dollars.</td><td>1d</td></tr><tr><td><code>ethe_market_price</code></td><td>The market price per share of Grayscale Ethereum Trust (ETHE) in U.S. dollars.</td><td>1d</td></tr><tr><td><code>ethemini_market_price</code></td><td>The market price per share of Grayscale Ethereum Mini Trust in U.S. dollars.</td><td>1d</td></tr><tr><td><code>ethepq_market_price</code></td><td>The market price per share of Grayscale Ethereum Premium Income ETF in U.S. dollars.</td><td>1d</td></tr><tr><td><code>fil_market_price</code></td><td>The market price per share of Grayscale Filecoin Trust in U.S. dollars.</td><td>1d</td></tr><tr><td><code>gbtc_market_price</code></td><td>The market price per share of Grayscale Bitcoin Trust (GBTC) in U.S. dollars.</td><td>1d</td></tr><tr><td><code>gbtcmini_market_price</code></td><td>The market price per share of Grayscale Bitcoin Mini Trust in U.S. dollars.</td><td>1d</td></tr><tr><td><code>gbtcpq_market_price</code></td><td>The market price per share of Grayscale Bitcoin Premium Income ETF in U.S. dollars.</td><td>1d</td></tr><tr><td><code>gfof_market_price</code></td><td>The market price per share of Grayscale Future of Finance ETF in U.S. dollars.</td><td>1d</td></tr><tr><td><code>link_market_price</code></td><td>The market price per share of Grayscale Chainlink Trust in U.S. dollars.</td><td>1d</td></tr><tr><td><code>lpt_market_price</code></td><td>The market price per share of Grayscale Livepeer Trust in U.S. dollars.</td><td>1d</td></tr><tr><td><code>ltc_market_price</code></td><td>The market price per share of Grayscale Litecoin Trust in U.S. dollars.</td><td>1d</td></tr><tr><td><code>mana_market_price</code></td><td>The market price per share of Grayscale Decentraland Trust in U.S. dollars.</td><td>1d</td></tr><tr><td><code>sol_market_price</code></td><td>The market price per share of Grayscale Solana Trust in U.S. dollars.</td><td>1d</td></tr><tr><td><code>xlm_market_price</code></td><td>The market price per share of Grayscale Stellar Lumens Trust in U.S. dollars.</td><td>1d</td></tr><tr><td><code>zec_market_price</code></td><td>The market price per share of Grayscale Zcash Trust in U.S. dollars.</td><td>1d</td></tr><tr><td><code>zen_market_price</code></td><td>The market price per share of Grayscale Horizen Trust in U.S. dollars.</td><td>1d</td></tr></tbody></table>

## Data Sources and Methodology

Market price is sourced from the closing price of the investment product's shares at 4 PM ET on OTCQX® or the relevant listing exchange. To date, many trusts have not met their investment objectives and shares have traded at both premiums and discounts to net asset value, with variations that have at times been substantial.

## Coverage

Institution metrics are not currently displayed on coverage.coinmetrics.io.

## API Endpoints

The metrics are served through the following endpoints:

* [/timeseries/institution-metrics](https://docs.coinmetrics.io/api/v4/#tag/Timeseries/operation/getTimeseriesInstitutionMetrics)

## Release History

* Release Version. [Market Data Feed 2.4 (August 2021)](https://coinmetrics.io/cm-market-data-feed-v2-4-release-notes/)
