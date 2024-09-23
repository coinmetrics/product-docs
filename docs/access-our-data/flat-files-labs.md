# Flat Files (Labs)

{% hint style="warning" %}
Flat Files have been released as a [CM Labs](https://docs.coinmetrics.io/cm-labs) project. Breaking changes may be introduced with minimal notice. Please exercise caution given the endpoint's experimental nature.
{% endhint %}

**Flat Files Overview**

Our datasets are available via our [Flat Files Console](https://files.coinmetrics.io/). This enables users to download a file for a specific data type for a specific exchange for a specific day. Many users prefer this rather than downloading large amounts of historical data via API.

The flat file application currently supports [trades](../market-data/market-data-overview/market-trades.md), market [candles](../market-data/market-data-overview/candles.md) and [quotes](../market-data/market-data-overview/quotes.md) from all of our spot and futures markets.\
\
Flat file datasets for a given day are available on the next day around 05:00 UTC.

API Keys are not provisioned by default to access the application. If you are interested in accessing our flat files please reach out to the Customer Success Team. Also, please note this delivery system is a [Labs](../core-concepts/cm-labs.md) product.

**Login Methods**

1. Paste your API key in Username field. Password field can be blank.
2. Pass the 'api\_key' query parameter (e.g. https://files.coinmetrics.io/?api\_key=XXX)

**Navigation**

For candles and trades, the navigation is always data type --> exchange --> \[file for each date]. However, for quotes some data is also split by instrument.

**JSON API**

* To access the folders available to your API Key enter this in your browser: https://files.coinmetrics.io/api/?api\_key=XXX
* Then you can traverse to any specific folder and see it's contents by adding the folder name to the URL: https://files.coinmetrics.io/api/market-candles-future-10m/?api\_key=XXX
* To traverse into the exchange folder you desire, add the exchange name: https://files.coinmetrics.io/api/market-candles-future-10m/bitmex/?api\_key=XXX

**Python Access**

There is also an example in the client api area which shows a way to get the files with our API Client: [https://github.com/coinmetrics/api-client-python/blob/master/examples/files\_download/trades\_files\_exporter.py](https://github.com/coinmetrics/api-client-python/blob/master/examples/files\_download/trades\_files\_exporter.py)
