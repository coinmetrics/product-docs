# Python API Client

The CM Python API Client provides a simple way to access all data available via the Coin Metrics' API.  D Use this client to query all kinds of data.  In just a few lines of code, _anyone_ can access clean cryptocurrency data in a familiar form, such as a pandas dataframe. &#x20; etailed documentation & installation instructions can be found on [GitHub](https://coinmetrics.github.io/api-client-python/site/index.html). 

For a thorough walkthrough of what you can do with the community client, check out our [walkthrough](https://github.com/coinmetrics/api-client-python/blob/master/examples/notebooks/walkthrough\_community.ipynb) in Jupyter Notebook form.  Examples of exporting data can be found in the [examples](https://github.com/coinmetrics/api-client-python/tree/master/examples) folder.

## Installation

To install the client you can run the following command:

`pip install coinmetrics-api-client`

Note that the client is updated regularly to reflect the changes made in API v4. Ensure that your latest version matches with what's in pyPI

To update your version, run the following command:

`pip install coinmetrics-api-client -U`

For more in depth information on how to use the Python API Client, see the [Python API Client docs.](https://coinmetrics.github.io/api-client-python/site/index.html)

### Basic Usage

To use the client, you need to initialize a CoinMetricsClient object with your API key.

```
from coinmetrics.api_client import CoinMetricsClient

client = CoinMetricsClient(<CM_API_KEY>)

# or to use community API:
client = CoinMetricsClient()
```

Endpoints are accessible via the `client` object. For example, to get price data for the asset `btc`, you can use the following code:

```
data = client.get_asset_metrics(
    assets=['btc'], 
    metrics=['PriceUSD'], 
    start_time='2024-01-01T00:00:00Z', 
    limit_per_asset=10
)

df = data.to_dataframe()
```


Note that the `data` variable is a `DataCollection` object, which is a Python generator object that is a wrapper for the request being sent to the API. The `DataCollection` object has a `to_dataframe()` method, which is used to convert the request results to a pandas dataframe. 
