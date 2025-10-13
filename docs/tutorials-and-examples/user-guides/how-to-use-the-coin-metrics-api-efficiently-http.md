# How To Use the Coin Metrics API Efficiently

## HTTP API

Please follow these rules to use API most efficiently and get the best API performance.

The rules are sorted in the priority order. The first ones make the biggest impact.

* Ensure that your HTTP client sends the proper request headers to enable HTTP compression. Your HTTP request should have an "Accept-Encoding: gzip" header.
* Use the line-delimited JSON format (`format=json_stream`) if it's supported by an API endpoint (currently only catalog-v2 functions) instead of the default format=json. That format allows you to avoid paging so you can quickly request all data using only one HTTP request without facing page\_size limitations (10k elements per page) and related difficulties.
* If you have to use the format=json (default value), strive to use the `paging_from=start` query parameter instead of `paging_from=end` (default value). It always produces faster responses.
* Instead of sending individual requests for different entities, combine them in a single request using commas. For example, `assets=btc,eth&metrics=ReferenceRateUSD,ReferenceRateEUR`. However, avoid combining two lists, e.g. a list of assets and a list of metrics.
* Strive to use limit\_per\_\<entity> query parameters if you want to fetch recent metric values for multiple entities (for example, assets, markets, indexes) at the same time. For example, if you want to request recent reference rates for a set of assets, use the following request: `https://api.coinmetrics.io/v4/timeseries/asset-metrics?assets=btc,eth&frequency=1m&metrics=ReferenceRates&limit_per_asset=1&page_size=2&api_key=<key>`. Note that `page_size` must be greater or equal to the number of requested entities (assets) multiplied by `limit_per_<entity>` value.
* Specify `start_time` and `end_time` query parameters instead of relying on their default values to narrow your results and improve API performance.
* Avoid the `sort=time` query parameter since it provides worse performance than default sorting.
* Avoid setting the granularity query parameter to any value other than "raw" (default). That parameter enables API-level downsampling of the raw data which is slow by design and, in some cases, can lead to a 524 timeout from Cloudflare.
* Avoid the `pretty=true` query parameter in production code because it's always slower than `pretty=false` (default value).

## Python API Client

The Python API Client can be optimized in many ways to speed up your queries.

### Page Size

Queries can be made much faster by increasing the `page_size` parameter. The higher the page\_size, the faster the query, with a maximum of `page_size=10000`

### Data Formats

When a user calls the API using a `CoinMetricsClient`object, it returns a DataCollection. A DataCollection is an object that stores information about your client request.

<pre class="language-python"><code class="lang-python"><strong>from coinmetrics.api_client import CoinMetricsClient
</strong>
client = CoinMetricsClient()
data_collection = client.get_asset_metrics(assets='btc', metrics='PriceUSD', limit_per_asset=5)
</code></pre>

Responses can be returned in the following formats, in order of how fast they're returned:

* A Python Generator (`DataCollection`)
* A CSV/JSON file (`DataCollection.export_to_csv()`, `DataCollection.export_to_json()`)
* A list (`DataCollection.to_list()`)
* A dataframe (`DataCollection.to_dataframe()`)



### Parallelization

API requests can be parallelized by calling `.parallel()` on a `DataCollection` object. Requests can be partitioned in the following ways:

**By Column**

```python
# Parallelize on 'assets' column
data = client.get_asset_metrics(
    assets=['btc', 'eth'],
    metrics=['PriceUSD', 'FeeMeanNtv'],
    limit_per_asset=5
).parallel('assets').to_list()

# Parallelize on 'assets' and 'metrics' columns
data = client.get_asset_metrics(
    assets=['btc', 'eth'],
    metrics=['PriceUSD', 'FeeMeanNtv'],
    limit_per_asset=5
).parallel(['assets', 'metrics']).to_list()
```

**By Time or (Block) Height Increment**

```python
# Parallelize by time increment

from datetime import timedelta
from dateutil.relative_delta import relativedelta

# Parallelize request in 1 month chunks
data = client.get_asset_metrics(
    assets=['btc', 'eth'],
    metrics=['ReferenceRateUSD'],
    start_time='2024-01-01',
    end_time='2024-08-01',
    frequency='1h'
).parallel(time_increment=relativedelta(months=1)).to_list()

# Parallelize request in 1 day chunks
data = client.get_asset_metrics(
    assets=['btc', 'eth'],
    metrics=['ReferenceRateUSD'],
    start_time='2024-01-01',
    end_time='2024-08-01',
    frequency='1h'
).parallel(time_increment=timedelta(days=1))

# Parallelize by 1000 blocks
data = client.get_asset_metrics(
    assets=['btc', 'eth'],
    metrics=['FeeMeanNtv'],
    start_height=0,
    end_height=100_000,
    frequency='1b'
).parallel(height_increment=1000)
```

Note, it is **much faster** to get data the available entities by **first** using the catalog-v2 or reference-data endpoints and then passing that list to the client method as a parallelized call over using a wildcard. This method also bypasses the 414 error code [#id-414-uri-too-long](how-to-troubleshoot-common-errors.md#id-414-uri-too-long "mention").

```python
assets = [
    asset['asset'] 
    for asset in client.catalog_asset_metrics_v2(
    metrics="ReferenceRateUSD")
]
df_assets = client.get_asset_metrics(
    assets=assets,
    metrics=['ReferenceRateUSD'],
    limit_per_asset=1
).parallel().to_dataframe()

markets = [
    market['market']
    for market in client.reference_data_markets(
        base='btc', quote='usd', type='spot'
    )
]
df_markets = client.get_market_trades(
    markets=markets,
    limit_per_market=1
).parallel().to_dataframe()
```

### Wildcards

Wildcards (`*`) allow you to query several entities, such as assets, exchanges, and markets, as one parameter. For example:

```python
# Get prices for all assets
asset_metrics = client.get_asset_metrics(assets='*', metrics='PriceUSD', limit_per_asset=1)

# Get btc-usd candles for all exchanges
market_candles_btc_usd = client.get_market_candles(markets=['*-btc-usd-spot'], limit_per_market=10)

# Get all spot exchanges and pairs
exchanges_reference = client.reference_data_exchanges().to_list()

market_candles_spot = client.get_market_candles(markets=[f'{exchange}-*-spot' for exchange['exchange'] in exchanges_reference], limit_per_market=10)
```

#### Persisting Large Data Requests

Given that parallelization allows you to request large amounts of data, the methods for non-parallelized data may run slower. The `export_to_json_files()` and `export_to_csv_files()` allow you to save parallelized data in an organized way in your local directory.

```python
### save data in local directory

data = client.get_asset_metrics(
    assets=['btc', 'eth'],
    metrics=['FeeMeanNtv'],
    start_height=0,
    end_height=100_000,
    frequency='1b'
).parallel(height_increment=1000).export_to_json_files()
```

For more information, see the guide for How to Export Data using the Python API Client:[#python-api-client](exporting-data.md#python-api-client "mention") .
