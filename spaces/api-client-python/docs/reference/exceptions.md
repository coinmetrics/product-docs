# Exceptions

The Python client raises a small set of typed exceptions on top of the standard `requests.HTTPError`. Catching them lets you distinguish between bad input, authentication failures, rate limiting, and transport errors without inspecting status codes by hand.

```python
from coinmetrics.api_client import CoinMetricsClient
from coinmetrics._exceptions import (
    CoinMetricsClientBadParameterError,
    CoinMetricsClientRateLimitError,
    CoinMetricsClientUnauthorizedError,
)

client = CoinMetricsClient("<your-api-key>")

try:
    rows = client.get_asset_metrics(
        assets="btc", metrics="ReferenceRateUSD", limit_per_asset=1,
    ).to_list()
except CoinMetricsClientUnauthorizedError:
    ...  # invalid / missing API key
except CoinMetricsClientBadParameterError as exc:
    ...  # API rejected the request payload; exc.response carries the body
except CoinMetricsClientRateLimitError as exc:
    ...  # back off; exc.rate_limit_reset is the seconds-until-reset header
```

## HTTP errors

Each of these wraps a specific HTTP status code returned by the API. They subclass `requests.HTTPError`, so existing code that catches `HTTPError` keeps working.

### *exception* coinmetrics._exceptions.CoinMetricsClientBadParameterError(response, \*args, \*\*kwargs)

Bases: `HTTPError`

Raised when a request is made with bad parameters (HTTP 400).

* **Parameters:**
  * **response** (*Response*)
  * **args** ([*Any*](https://docs.python.org/3/library/typing.html#typing.Any))
  * **kwargs** ([*Any*](https://docs.python.org/3/library/typing.html#typing.Any))

### *exception* coinmetrics._exceptions.CoinMetricsClientUnauthorizedError(response, \*args, \*\*kwargs)

Bases: `HTTPError`

Raised when a request is unauthorized due to invalid or missing API key (HTTP 401).

* **Parameters:**
  * **response** (*Response*)
  * **args** ([*Any*](https://docs.python.org/3/library/typing.html#typing.Any))
  * **kwargs** ([*Any*](https://docs.python.org/3/library/typing.html#typing.Any))

### *exception* coinmetrics._exceptions.CoinMetricsClientForbiddenError(response, \*args, \*\*kwargs)

Bases: `HTTPError`

Raised when a request is forbidden due to insufficient permissions (HTTP 403).

* **Parameters:**
  * **response** (*Response*)
  * **args** ([*Any*](https://docs.python.org/3/library/typing.html#typing.Any))
  * **kwargs** ([*Any*](https://docs.python.org/3/library/typing.html#typing.Any))

### *exception* coinmetrics._exceptions.CoinMetricsClientQueryParamsException(response, \*args, \*\*kwargs)

Bases: `HTTPError`

Raised when a request is too long.

* **Parameters:**
  * **response** (*Response*)
  * **args** ([*Any*](https://docs.python.org/3/library/typing.html#typing.Any))
  * **kwargs** ([*Any*](https://docs.python.org/3/library/typing.html#typing.Any))

### *exception* coinmetrics._exceptions.CoinMetricsClientRateLimitError(response, \*args, \*\*kwargs)

Bases: `HTTPError`

Raised when the rate limit is exceeded (HTTP 429).

* **Parameters:**
  * **response** (*Response*)
  * **args** ([*Any*](https://docs.python.org/3/library/typing.html#typing.Any))
  * **kwargs** ([*Any*](https://docs.python.org/3/library/typing.html#typing.Any))

## Transport and client errors

### *exception* coinmetrics._exceptions.CoinMetricsClientConnectionError(original_error, \*args, \*\*kwargs)

Bases: [`Exception`](https://docs.python.org/3/library/exceptions.html#Exception)

Raised when a connection error occurs (ConnectionResetError, ChunkedEncodingError).

* **Parameters:**
  * **original_error** ([*Exception*](https://docs.python.org/3/library/exceptions.html#Exception))
  * **args** ([*Any*](https://docs.python.org/3/library/typing.html#typing.Any))
  * **kwargs** ([*Any*](https://docs.python.org/3/library/typing.html#typing.Any))

### *exception* coinmetrics._exceptions.CoinMetricsClientNotFoundError(message='CoinMetricsClient not found')

Bases: [`Exception`](https://docs.python.org/3/library/exceptions.html#Exception)

Raised when a CoinMetricsClient instance is not found.

## Data collection errors

These are raised by [`DataCollection`](data-collection.md) and its subclasses while iterating, exporting, or paging through a response.

### *exception* coinmetrics._data_collection.DataFetchError

Bases: [`Exception`](https://docs.python.org/3/library/exceptions.html#Exception)

Raised when [`DataCollection`](data-collection.md#coinmetrics._data_collection.DataCollection) exhausts its retry budget while
pulling a page of data from the Coin Metrics API.

### *exception* coinmetrics._data_collection.CsvExportError

Bases: [`Exception`](https://docs.python.org/3/library/exceptions.html#Exception)

Raised when [`DataCollection.export_to_csv()`](data-collection.md#coinmetrics._data_collection.DataCollection.export_to_csv) is called on an
endpoint that does not support CSV export.
