# Troubleshooting

The most up-to-date troubleshooting information can be found in the [Troubleshooting Guide](https://docs.coinmetrics.io/tutorials-and-examples/user-guides/how-to-troubleshoot-common-errors) section of the Coin Metrics product documentation.

## Debugging the Python API Client

There are two diagnostic options for the API Client — `debug_mode` and `verbose`. Both log network calls to the console; `debug_mode` additionally writes a log file recording every network request and the time it took. These tools help diagnose issues and give insight into request timings so you can write more performant code.

For example, running the snippet below:

```python
import os
from coinmetrics.api_client import CoinMetricsClient

api_key = os.environ['CM_API_KEY']

if __name__ == '__main__':
    client = CoinMetricsClient(api_key=api_key, debug_mode=True)
    reference_rates = client.get_asset_metrics(
        assets=['btc', 'algo', 'eth'], metrics=['ReferenceRateUSD'],
    )
    for data in reference_rates:
        continue
```

Produces console output like:

```text
[DEBUG] 2023-01-09 11:01:02,044 - Starting API Client debugging session. logging to stdout and cm_api_client_debug_2023_01_09_11_01_02.txt
[DEBUG] 2023-01-09 11:01:02,044 - Using coinmetrics version 2022.11.14.16
[DEBUG] 2023-01-09 11:01:02,044 - Current state of API Client, excluding API KEY: {'_verify_ssl_certs': True, '_api_base_url': 'https://api.coinmetrics.io/v4', '_ws_api_base_url': 'wss://api.coinmetrics.io/v4', '_http_header': {'Api-Client-Version': '2022.11.14.16'}, '_proxies': {'http': None, 'https': None}, 'debug_mode': True, 'verbose': False}
[DEBUG] 2023-01-09 11:01:02,044 - Attempting to call url: timeseries/asset-metrics with params: {'assets': ['btc', 'algo', 'eth'], 'metrics': ['ReferenceRateUSD'], ... }
[DEBUG] 2023-01-09 11:01:02,387 - Response status code: 200 for url: https://api.coinmetrics.io/v4/timeseries/asset-metrics?api_key=[REDACTED]&assets=btc%2Calgo%2Ceth&metrics=ReferenceRateUSD&paging_from=start took: 0:00:00.342874 response body size (bytes): 9832
```

This makes it easier to understand what network calls the client is making and where any issues may be. To dig deeper, you can modify `_send_request()` on the API Client to log additional state. The accompanying log file (named like `cm_api_client_debug_2023_01_09_11_01_02.txt`) is also useful when working with Coin Metrics customer success.

## Common Errors

### Proxy Error

Some organizations require all third-party requests to flow through a proxy. For proxies that don’t require auth:

```python
client = CoinMetricsClient(proxy_url='http://<hostname>:<port>')
```

For proxies that require auth, include credentials in the URL:

```python
client = CoinMetricsClient(proxy_url='http://<username>:<password>@<hostname>:<port>')
```

### SSLError: SSL Certificate Verification

Some corporate networks have special rules for SSL certificate verification, leading to errors like:

```text
SSLError: HTTPSConnectionPool(host='api.coinmetrics.io', port=443): Max retries exceeded with url: <some_url_path> (Caused by SSLError(SSLCertVerificationError(1, '[SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: self signed certificate in certificate chain (_ssl.c:1123)')))
```

You can disable SSL verification at client initialization (not recommended in general — understand the risks first):

```python
client = CoinMetricsClient(verify_ssl_certs=False)
```

Alternatively, point the client at a specific certificate bundle. This is helpful when Python cannot locate the certificates on its own (commonly inside virtual environments):

```python
from coinmetrics.api_client import CoinMetricsClient

SSL_CERT_LOCATION = '/Users/<USER_NAME>/Library/Python/3.8/lib/python/site-packages/certifi/cacert.pem'
client = CoinMetricsClient(verify_ssl_certs=SSL_CERT_LOCATION)
```

A quick way to find the certs on your machine:

```bash
python3 -c "import requests; print(requests.certs.where())"
```

Note this can change depending on whether you’re [using a Python virtual environment](https://realpython.com/python-virtual-environments-a-primer/).

```python
from coinmetrics.api_client import CoinMetricsClient
import requests

SSL_CERT_LOCATION = requests.certs.where()
print(f"SSL Certs Location: {SSL_CERT_LOCATION}")

client = CoinMetricsClient(verify_ssl_certs=SSL_CERT_LOCATION)
```

### 400 Bad Parameter

This error occurs when an invalid parameter value is passed, e.g. `client.get_asset_metrics(assets='bad_asset_name')` yields `"Bad parameter 'assets'. Value 'bad_asset_name' is not supported."`. Two ways to fix it:

1. If the endpoint supports `ignore_unsupported_errors`, set it to `True`.
2. Otherwise, use the `reference_data` and `catalog_v2` methods to construct a query with valid parameter values. See [this tutorial](https://docs.coinmetrics.io/tutorials-and-examples/tutorials/walkthrough_community#market-observations) for an example.

### 401 Unauthorized

Your credentials are invalid — you may be using an invalid API key. Check the [Getting Started](https://docs.coinmetrics.io/getting-started#id-1.-set-up-your-api-key) guide for instructions on setting up the proper credentials.

### 403 Forbidden

Your credentials are valid but not authorized for the requested data. Check the [Getting Started](https://docs.coinmetrics.io/getting-started#id-1.-set-up-your-api-key) guide for instructions on configuring credentials with the right permissions.

### 414 URI Too Long

This error occurs when the HTTP URI generated by the client is too long. It commonly happens when passing a very large number of parameters, e.g. `client.get_asset_metrics(assets=<long_list_of_assets>, ...)` or `client.get_list_of_balance_updates_v2(asset='btc', accounts=<long_list_of_accounts>)`.

Use the `.parallel()` method to bypass this issue, e.g.: `client.get_asset_metrics(assets=<long_list_of_assets>).parallel()`. Parallelization breaks up the request into chunks based on the parallelization variable, keeping each URI well under the limit.

This workaround only works for endpoints that allow parallelization. See [`ParallelDataCollection._VALID_PARALLEIZATION_PARAMS`](https://github.com/coinmetrics/api-client-python/blob/027b464ffe4037eb730569ee4c33940c29b117ce/coinmetrics/_data_collection.py#L542-L546) for the list of parallelizable variables and [`ParallelDataCollection._ENDPOINT_FIRST_PARAM_DICT`](https://github.com/coinmetrics/api-client-python/blob/027b464ffe4037eb730569ee4c33940c29b117ce/coinmetrics/_data_collection.py#L547-L619) for the per-endpoint defaults.

### 429 Too Many Requests

This error occurs when rate limits are exceeded. See [API Rate Limits](https://docs.coinmetrics.io/api/v4/#tag/Rate-limits) for more information.

Retry logic was refactored in version `2025.9.17.17` to better handle these errors. If you see this error often, we strongly recommend upgrading to `2025.9.17.17` or later.
