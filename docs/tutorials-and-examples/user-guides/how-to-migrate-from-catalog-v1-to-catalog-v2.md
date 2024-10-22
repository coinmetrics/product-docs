# How To Migrate From Catalog to Catalog V2 and Reference Data

This guide will help you migrate from using `catalog` ("Catalog V1") to `catalog-v2` ("Catalog V2") and `reference-data` ("Reference Data"). Catalog V1 contains both static "reference data" (name, category, product, etc.) and coverage for a given data type (e.g. `min_time` and `max_time` for `trades`). Due to growing complexity in data coverage and the resulting performance bottlenecks from surfacing all of this data, this metadata is being separated. Catalog V2 and Reference Data allow for more lightweight and flexible queries as they can be queried across several dimensions (for example, `catalog-v2/asset-metrics` lets you filter by both asset and metric).

Switching between catalog v1 to catalog v2 requires a subtle change in how to think about and find the data you're looking for. V2

**In general:**

* Use catalog-v2 to get information on **when** a **data type** is present.
* Use reference-data to get information on **which** **entities** are available and descriptions of **what** they are.
* catalog-v2 and reference-data take **less time** to retrieve data per call and go through pagination (which the [python-client.md](../../access-our-data/python-client.md "mention") automatically takes care of).

For more information on the reasoning behind the catalog migration, see [catalog-v1-v2-migration.md](../../access-our-data/api/catalog-v1-v2-migration.md "mention")

## Examples

### **How do I** get which assets have been on an exchange?

**V1**: Use catalog/assets and get the "exchanges" field. Note that due to the size of the response, this might take a while.

**V2**: Use reference-data/markets?asset=\<ASSET> and get the "exchange" field for each observation, loop through each observation. (Note that due to pagination, you will have to loop through the entire response).

{% tabs %}
{% tab title="V2" %}
```python
list_markets = client.reference_data_markets(asset="btc").to_list()
list_exchanges = set([market['exchange'] for market in list_markets])
```
{% endtab %}

{% tab title="V1" %}
```python
list_exchanges = client.catalog_assets(assets="btc")[0]['exchanges']
```
{% endtab %}
{% endtabs %}

Note that these responses includes exchanges or markets that are now defunct. To get a more precise real-time coverage, see [#how-do-i-get-which-the-min-and-max-times-an-asset-has-been-traded-in-an-exchange](how-to-migrate-from-catalog-v1-to-catalog-v2.md#how-do-i-get-which-the-min-and-max-times-an-asset-has-been-traded-in-an-exchange "mention")

### How do I get which markets are on an exchange?

**V1**: Use catalog/exchanges and get "markets" field

**V2**: Use reference-data/markets?exchange=\<EXCHANGE> and get the "market" field for each observation, loop through each observation. (Note that due to pagination, you will have to loop through the entire response).

{% tabs %}
{% tab title="V2" %}
```python
list_markets = client.reference_data_markets(exchange="coinbase").to_list()
list_markets = set([market['market'] for market in list_markets])
```
{% endtab %}

{% tab title="V1" %}
```python
list_exchanges = client.catalog_exchanges(exchanges="coinbase")[0]['markets']
```
{% endtab %}
{% endtabs %}

### How do I get the markets for which an asset is a base/quote?

**V1:** Use `catalog/markets?base=<ASSET>` or `catalog/markets?quote=<ASSET>`

**V2:** Use `reference-data/markets?base=<ASSET>` or `reference-data/markets?quote=<ASSET>`

{% tabs %}
{% tab title="V2" %}
```python
list_markets = client.reference_data_markets(base="<ASSET>").to_list()
```
{% endtab %}

{% tab title="V1" %}
```python
list_markets = client.catalog_markets(base='btc')
```
{% endtab %}
{% endtabs %}

### How do I get which metrics are covered for a given asset/pair/exchange/market?

**V1:** Use`catalog/*-metrics` respectively and pass asset, pair, exchange, or market where applicable. Then, loop through each element to search for the presence of that asset, pair, exchange, or market.

**V2:** Use`catalog-v2/*-metrics` respectively and pass asset, pair, exchange, or market where applicable.

Suppose you wanted to know which `asset-metrics` are available for `btc`:

{% tabs %}
{% tab title="V2" %}
```python
list_asset_metrics = client.catalog_asset_metrics_v2(assets="btc").to_list()[0]['metrics']
```
{% endtab %}

{% tab title="V1" %}
```python
list_asset_metrics = client.catalog_asset_metrics(metrics="PriceUSD").to_list()
list_asset_metrics = [metric for metric in list_asset_metrics if 'btc' in metric['frequencies'][0]['assets']]
```
{% endtab %}
{% endtabs %}

### How do I get which assets/pairs/exchanges/markets are covered for a given metric?

**V1**: Use `catalog/*-metrics` and pass your metric(s). Each element will have a frequencies value with a nested `assets` value for each frequency. Find the appropriate frequency and grab that list of assets.

**V2**: Use `catalog-v2/*-metrics` and pass your metric(s). Loop through element and get the `asset` value.

Suppose you wanted to know what assets are covered by `PriceUSD`:



{% tabs %}
{% tab title="V2" %}
```python
list_asset_metrics = client.catalog_asset_metrics_v2(metrics="PriceUSD").to_dataframe()
list_assets = list(df_asset_metrics.loc[((df_asset_metrics.metric=='PriceUSD') & (df_asset_metrics.frequency=='1d')), 'asset'])
```
{% endtab %}

{% tab title="V1" %}
```python
list_asset_metrics = client.catalog_asset_metrics(metrics="PriceUSD").to_list()
list_assets = list_asset_metrics[0]['frequencies'][-1]['assets']
```
{% endtab %}
{% endtabs %}

### How do I get which event (e.g. market level) data are covered for a given market?

**V1 and V2:** Use `catalog/market-*` and `catalog-v2/market-*` respectively and pass markets where applicable.&#x20;



{% tabs %}
{% tab title="V2" %}
```python
list_markets = client.reference_data_markets(base="<ASSET>").to_list()
```
{% endtab %}

{% tab title="V1" %}
```python
list_markets = client.catalog_markets(base='btc')
```
{% endtab %}
{% endtabs %}

### **How do I get which the min and max times an asset has been traded in an exchange?**

**V1 and V2:** Use `catalog/market-trades?asset=<ASSET>&exchange=<EXCHANGE>` and `catalog-v2/market-trades?asset=<ASSET>&exchange=<EXCHANGE>` respectively and get the `min` and `max` times.

{% tabs %}
{% tab title="V2" %}
```python
trades = next(client.catalog_market_trades_v2(exchange='coinbase', asset='btc'))
min_time = trades['min_time']
max_time = trades['max_time']
```
{% endtab %}

{% tab title="V1" %}
```python
trades = client.catalog_market_trades(exchange='coinbase', asset='btc')
min_time = trades[0]['min_time']
max_time = trades[0]['max_time']
```
{% endtab %}
{% endtabs %}

### How do I get what metrics are available for a given product and frequency?

Suppose we wanted to get metrics for the Network Data product that are available at 1 hour frequency.

**V1:**

* Use catalog/asset-metrics, filter by frequency = '1h' and 'product' = 'Network Data'

**V2:**

* query `reference-data/asset-metrics`, filter for 'product' = 'Network Data'
* query `catalog-v2/asset-metrics?metrics=<LIST_OF_NETWORK_DATA_METRICS>`, filter for frequency = '1h'

{% tabs %}
{% tab title="V2" %}
```python
asset_metrics_reference = client.reference_data_asset_metrics().to_dataframe()
list_metrics_nd = list(asset_metrics_reference.loc[asset_metrics_reference['product']=='Network Data', 'metric'])

asset_metrics_catalog = client.catalog_asset_metrics_v2(metrics=list_metrics_nd).to_dataframe()
list_hourly_metrics_nd = list(asset_metrics_catalog.loc[asset_metrics_catalog.frequency=='1h', 'metric'].unique())
```
{% endtab %}

{% tab title="V1" %}
<pre class="language-python"><code class="lang-python"><strong>df_catalog_asset_metrics = client.catalog_asset_metrics().to_dataframe()
</strong>list_hourly_metrics_nd = list(df_catalog_asset_metrics.loc[
    (df_catalog_asset_metrics['frequency']=='1h') &#x26; (df_catalog_asset_metrics['product']=='Network Data')
])
</code></pre>
{% endtab %}
{% endtabs %}



## A Mapping of Catalog Endpoints to Catalog V2 and Reference Data Endpoints

| Existing Catalog Endpoint          | Catalog v2 Endpoints                                                                                                                                                                     | Reference Data Endpoints\*                                                                                                                                                                                 | Notes                                                                |
| ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| /catalog/assets                    | /catalog-v2/asset-metrics                                                                                                                                                                | /reference-data/assets, /reference-data/markets                                                                                                                                                            |                                                                      |
| /catalog/metrics                   | /catalog-v2/asset-metrics, /catalog-v2/exchange-metrics, /catalog-v2/exchange-asset-metrics, /catalog-v2/pair-metrics, /catalog-v2/institution-metrics, /catalog-v2/market-metrics       | /reference-data/asset-metrics, /reference-data/exchange-metrics, /reference-data/exchange-asset-metrics, /reference-data/pair-metrics, /reference-data/institution-metrics, /reference-data/market-metrics |                                                                      |
| /catalog/asset-metrics             | /catalog-v2/asset-metrics                                                                                                                                                                | /reference-data/asset-metrics                                                                                                                                                                              |                                                                      |
| /catalog/exchange-metrics          | /catalog-v2/exchange-metrics                                                                                                                                                             | /reference-data/exchange-metrics                                                                                                                                                                           |                                                                      |
| /catalog/exchange-asset-metrics    | /catalog-v2/exchange-asset-metrics                                                                                                                                                       | /reference-data/exchange-asset-metrics                                                                                                                                                                     |                                                                      |
| /catalog/pair-metrics              | /catalog-v2/pair-metrics                                                                                                                                                                 | /reference-data/pair-metrics                                                                                                                                                                               |                                                                      |
| /catalog/institution-metrics       | /catalog-v2/institution-metrics                                                                                                                                                          | /reference-data/institution-metrics                                                                                                                                                                        |                                                                      |
| /catalog/exchanges                 |                                                                                                                                                                                          | /reference-data/exchanges, /reference-data/markets                                                                                                                                                         |                                                                      |
| /catalog/exchange-assets           | /catalog-v2/exchange-asset-metrics                                                                                                                                                       | /reference-data/exchange-asset-metrics                                                                                                                                                                     |                                                                      |
| /catalog/pairs                     | /catalog-v2/pair-metrics                                                                                                                                                                 | /reference-data/pair-metrics                                                                                                                                                                               |                                                                      |
| /catalog/pair-candles              | /catalog-v2/pair-candles                                                                                                                                                                 |                                                                                                                                                                                                            |                                                                      |
| /catalog/institutions              | /catalog-v2/institution-metrics                                                                                                                                                          | /reference-data/institution-metrics                                                                                                                                                                        |                                                                      |
| /catalog/markets                   | /catalog-v2/market-trades, /catalog-v2/market-orderbooks, /catalog-v2/market-quotes, /catalog-v2/market-funding-rates, /catalog-v2/market-open-interest, /catalog-v2/market-liquidations | /reference-data/markets                                                                                                                                                                                    | The existing catalog endpoint will be restricted to 170,000 markets. |
| /catalog/market-trades             | /catalog-v2/market-trades                                                                                                                                                                |                                                                                                                                                                                                            | The existing catalog endpoint will be restricted to 170,000 markets. |
| /catalog/market-candles            | /catalog-v2/market-candles                                                                                                                                                               |                                                                                                                                                                                                            | The existing catalog endpoint will be restricted to 170,000 markets. |
| /catalog/market-orderbooks         | /catalog-v2/market-orderbooks                                                                                                                                                            |                                                                                                                                                                                                            | The existing catalog endpoint will be restricted to 170,000 markets. |
| /catalog/market-quotes             | /catalog-v2/market-quotes                                                                                                                                                                |                                                                                                                                                                                                            | The existing catalog endpoint will be restricted to 170,000 markets. |
| /catalog/market-funding-rates      | /catalog-v2/market-funding-rates                                                                                                                                                         |                                                                                                                                                                                                            | The existing catalog endpoint will be restricted to 170,000 markets. |
| /catalog/market-contract-prices    | /catalog-v2/market-contract-prices                                                                                                                                                       |                                                                                                                                                                                                            | The existing catalog endpoint will be restricted to 170,000 markets. |
| /catalog/market-implied-volatility | /catalog-v2/market-implied-volatility                                                                                                                                                    |                                                                                                                                                                                                            | The existing catalog endpoint will be restricted to 170,000 markets. |
| /catalog/market-greeks             | /catalog-v2/market-greeks                                                                                                                                                                |                                                                                                                                                                                                            | The existing catalog endpoint will be restricted to 170,000 markets. |
| /catalog/market-openinterest       | /catalog-v2/market-openinterest                                                                                                                                                          |                                                                                                                                                                                                            | The existing catalog endpoint will be restricted to 170,000 markets. |
| /catalog/market-liquidations       | /catalog-v2/market-liquidations                                                                                                                                                          |                                                                                                                                                                                                            | The existing catalog endpoint will be restricted to 170,000 markets. |
| /catalog/market-metrics            | /catalog-v2/market-metrics                                                                                                                                                               | /reference-data/market-metrics                                                                                                                                                                             | The existing catalog endpoint will be restricted to 170,000 markets. |
| /catalog/indexes                   | /catalog-v2/index-levels, /catalog-v2/index-constituents                                                                                                                                 | /reference-data/indexes                                                                                                                                                                                    |                                                                      |
| /catalog/index-candles             | /catalog-v2/index-candles                                                                                                                                                                |                                                                                                                                                                                                            |                                                                      |
| /catalog/asset-alerts              |                                                                                                                                                                                          | /reference-data/asset-alerts                                                                                                                                                                               |                                                                      |
| /catalog/asset-chains              | /catalog-v2/asset-chains                                                                                                                                                                 |                                                                                                                                                                                                            |                                                                      |
| /catalog/mempool-feerates          | /catalog-v2/mempool-feerates                                                                                                                                                             |                                                                                                                                                                                                            |                                                                      |
| /catalog/minig-pool-tips-summary   | /catalog-v2/mining-pool-tips-summary                                                                                                                                                     |                                                                                                                                                                                                            |                                                                      |
| /catalog/transaction-tracker       | /catalog-v2/transaction-tracker                                                                                                                                                          |                                                                                                                                                                                                            |                                                                      |

_\*Note that reference-data endpoints will show all data covered for a given entity, not just those visible in catalog-v2. This contrasts that of the behavior of catalog-v2 showing just the data available with your API key and catalog-v2-all showing all data._
