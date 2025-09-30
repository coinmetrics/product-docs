# How to Troubleshoot Common Errors



### Debugging the Python API Client

There are two additional options for the API Client - `debug_mode` and `verbose`. These two options log network calls to the console, and in the case of `debug_mode` it will generate a log file of all the network requests and the time it takes to call them. These tools can be used to diagnose issues in your code and also to get a better understanding of request times so that users can write more performant code. For example, running the below code:

```python
import os

from coinmetrics.api_client import CoinMetricsClient

api_key = os.environ['CM_API_KEY']

if __name__ == '__main__':
    client = CoinMetricsClient(api_key=api_key, debug_mode=True)
    reference_rates_example = client.get_asset_metrics(assets=['btc', 'algo', 'eth'], metrics=['ReferenceRateUSD'])
    for data in reference_rates_example:
        continue
```

The console output will look like:

```commandline
[DEBUG] 2023-01-09 11:01:02,044 - Starting API Client debugging session. logging to stdout and cm_api_client_debug_2023_01_09_11_01_02.txt
[DEBUG] 2023-01-09 11:01:02,044 - Using coinmetrics version 2022.11.14.16
[DEBUG] 2023-01-09 11:01:02,044 - Current state of API Client, excluding API KEY: {'_verify_ssl_certs': True, '_api_base_url': 'https://api.coinmetrics.io/v4', '_ws_api_base_url': 'wss://api.coinmetrics.io/v4', '_http_header': {'Api-Client-Version': '2022.11.14.16'}, '_proxies': {'http': None, 'https': None}, 'debug_mode': True, 'verbose': False}
[DEBUG] 2023-01-09 11:01:02,044 - Attempting to call url: timeseries/asset-metrics with params: {'assets': ['btc', 'algo', 'eth'], 'metrics': ['ReferenceRateUSD'], 'frequency': None, 'page_size': None, 'paging_from': 'start', 'start_time': None, 'end_time': None, 'start_height': None, 'end_height': None, 'start_inclusive': None, 'end_inclusive': None, 'timezone': None, 'sort': None, 'limit_per_asset': None}
[DEBUG] 2023-01-09 11:01:02,387 - Response status code: 200 for url: https://api.coinmetrics.io/v4/timeseries/asset-metrics?api_key=[REDACTED]&assets=btc%2Calgo%2Ceth&metrics=ReferenceRateUSD&paging_from=start took: 0:00:00.342874 response body size (bytes): 9832
[DEBUG] 2023-01-09 11:01:02,388 - Attempting to call url: timeseries/asset-metrics with params: {'assets': ['btc', 'algo', 'eth'], 'metrics': ['ReferenceRateUSD'], 'frequency': None, 'page_size': None, 'paging_from': 'start', 'start_time': None, 'end_time': None, 'start_height': None, 'end_height': None, 'start_inclusive': None, 'end_inclusive': None, 'timezone': None, 'sort': None, 'limit_per_asset': None, 'next_page_token': '0.MjAxOS0wOS0zMFQwMDowMDowMFo'}
[DEBUG] 2023-01-09 11:01:02,559 - Response status code: 200 for url: https://api.coinmetrics.io/v4/timeseries/asset-metrics?api_key=[REDACTED]&assets=btc%2Calgo%2Ceth&metrics=ReferenceRateUSD&paging_from=start&next_page_token=0.MjAxOS0wOS0zMFQwMDowMDowMFo took: 0:00:00.171487 response body size (bytes): 9857
```

Then it can be easier to understand what network calls the API Client is making, and where any issues may exist. If you wish to dig even deeper, you may consider modifying the `_send_request()` method of the API Client to log additional data about the state of your environment, or anything else that would help diagnose issues. You will notice a log file generated in the format `cm_api_client_debug_2023_01_09_11_01_02.txt`. This log file might be helpful for your own use or to give more context if you are working with Coin Metrics customer success.

### Proxy Error

Sometimes your organization has special rules on making requests to third parties and you have to use proxies in order to comply with the rules.

For proxies that don't require auth you can specify them similar to this example:

```python

client = CoinMetricsClient(proxy_url=f'http://<hostname>:<port>')
```

For proxies that require auth, you should be able to specify username and password similar to this example:

```python

client = CoinMetricsClient(proxy_url=f'http://<username>:<password>@<hostname>:<port>')
```

### SSLError: SSL Certs Verification

Sometimes your organization network have special rules on SSL certs verification and in this case you might face the following error when running the script:

```
SSLError: HTTPSConnectionPool(host='api.coinmetrics.io', port=443): Max retries exceeded with url: <some_url_path> (Caused by SSLError(SSLCertVerificationError(1, '[SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: self signed certificate in certificate chain (_ssl.c:1123)')))
```

In this case, you can pass an option during client initialization to disable ssl verification for requests like this:

```python

client = CoinMetricsClient(verify_ssl_certs=False)
```

We don't recommend setting it to False by default and you should make sure you understand the security risks of disabling SSL certs verification.

Additionally, you may choose to specify the path to the SSL certificates on your machine. This may cause errors where Python is unable to locate the certificates on your machine, particularly when using Python virtual environments.

```python
from coinmetrics.api_client import CoinMetricsClient
SSL_CERT_LOCATION = '/Users/<USER_NAME>/Library/Python/3.8/lib/python/site-packages/certifi/cacert.pem'
client = CoinMetricsClient(verify_ssl_certs=SSL_CERT_LOCATION)
```

A quick way to find the certs on your machine is:\
`python3 -c "import requests; print(requests.certs.where())"`\
And note that this will change based on whether or not you are using a [Python virtual environment or not](https://realpython.com/python-virtual-environments-a-primer/)

```python
from coinmetrics.api_client import CoinMetricsClient
import requests

SSL_CERT_LOCATION = requests.certs.where()
print(f"SSL Certs Location: {SSL_CERT_LOCATION}")

client = CoinMetricsClient(verify_ssl_certs=SSL_CERT_LOCATION)
```

#### 400 Bad Parameter

This error occurs when an invalid parameter value is passed, e.g. `client.get_asset_metrics(assets='bad_asset_name')` yields `"Bad parameter 'assets'. Value 'bad_asset_name' is not supported."`. There are two ways to fix this:

1. If the endpoint supports the `ignore_unsupported_errors` parameter, set this value to True.
2. Else, you will need to use the `reference_data` and `catalog_v2` methods to properly construct a query with the valid parameter values. See [this tutorial](https://docs.coinmetrics.io/tutorials-and-examples/tutorials/walkthrough_community#market-observations) for an example.

### 401 Unauthorized

This error occurs when your credentials are invalid. You may be using an invalid API key. Check the [Getting Started](https://docs.coinmetrics.io/getting-started#id-1.-set-up-your-api-key) guide for instructions on how to get set up with the proper credentials.

### 403 Forbidden

This error occurs when your credentials are valid but you may not be authorized to access the data, e.g.

`{"error": {"type": "forbidden","message": "Requested metric 'SplyBMXNtv' with frequency '1d' for asset 'btc' is not available with supplied credentials."}}`

Reach out to [https://coinmetrics.io/contact/](https://coinmetrics.io/contact/) to expand your existing credentials. Check that your key has proper access to the data by going to [coverage.coinmetrics.io](https://coverage.coinmetrics.io/).&#x20;

To fix bypass this error with your current credentials, there are two options:

1. If the endpoint supports the `ignore_forbidden_errors` parameter, set this value to True.
2. Else, you will need to use the `reference_data` and `catalog_v2` methods to properly construct a query with the valid parameter values. See [this tutorial](https://docs.coinmetrics.io/tutorials-and-examples/tutorials/walkthrough_community#market-observations) for an example.

### 414 URI Too Long

This error occurs when the HTTP URI being passed using the Python API Client is too long. This is a common consequence of passing too many parameters in a given endpoints, e.g. `client.get_asset_metrics(assets=<long_list_of_assets>, ...)` or `client.get_list_of_balance_updates_v2(asset='btc', accounts=<long_list_of_accounts>)`.

Use the `.parallel()` method to bypass this issue, e.g.: `client.get_asset_metrics(assets=<long_list_of_assets>).parallel()`. Parallelization breaks up the HTTP requests into chunks by the variable it is being parallelized on, resulting in URI(s) well under the limit.

Note this workaround works only for endpoints which allow parallelization. See the attribute [`ParallelDataCollection._VALID_PARALLEIZATION_PARAMS`](https://github.com/coinmetrics/api-client-python/blob/027b464ffe4037eb730569ee4c33940c29b117ce/coinmetrics/_data_collection.py#L542-L546) for the list of parallelizable variables and [`ParallelDataCollection._ENDPOINT_FIRST_PARAM_DICT`](https://github.com/coinmetrics/api-client-python/blob/027b464ffe4037eb730569ee4c33940c29b117ce/coinmetrics/_data_collection.py#L547-L619) for the dict of endpoints and default set of parallelizable variables.

### 429 Too Many Requests

This error occurs when the rate limits are exceeded. See the [API Rate limits](https://docs.coinmetrics.io/api/v4/#tag/Rate-limits) for more information.

In version `2025.9.17.17`, retry logic was refactored to ensure that these errors are better handled by the API Client. If you are seeing this error often, we highly recommend upgrading to `2025.9.17.17` or later.
