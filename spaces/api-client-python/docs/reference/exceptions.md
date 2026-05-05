# Exceptions
### *exception* `coinmetrics._exceptions.CoinMetricsClientBadParameterError(response, *args, **kwargs)`
Bases: `HTTPError`

Raised when a request is made with bad parameters (HTTP 400).

* **Parameters:**
  * **response** (*Response*)
  * **args** ([*Any*](https://docs.python.org/3/library/typing.html#typing.Any))
  * **kwargs** ([*Any*](https://docs.python.org/3/library/typing.html#typing.Any))

### *exception* `coinmetrics._exceptions.CoinMetricsClientConnectionError(original_error, *args, **kwargs)`
Bases: [`Exception`](https://docs.python.org/3/library/exceptions.html#Exception)

Raised when a connection error occurs (ConnectionResetError, ChunkedEncodingError).

* **Parameters:**
  * **original_error** ([*Exception*](https://docs.python.org/3/library/exceptions.html#Exception))
  * **args** ([*Any*](https://docs.python.org/3/library/typing.html#typing.Any))
  * **kwargs** ([*Any*](https://docs.python.org/3/library/typing.html#typing.Any))

### *exception* `coinmetrics._exceptions.CoinMetricsClientForbiddenError(response, *args, **kwargs)`
Bases: `HTTPError`

Raised when a request is forbidden due to insufficient permissions (HTTP 403).

* **Parameters:**
  * **response** (*Response*)
  * **args** ([*Any*](https://docs.python.org/3/library/typing.html#typing.Any))
  * **kwargs** ([*Any*](https://docs.python.org/3/library/typing.html#typing.Any))

### *exception* `coinmetrics._exceptions.CoinMetricsClientNotFoundError(message='CoinMetricsClient not found')`
Bases: [`Exception`](https://docs.python.org/3/library/exceptions.html#Exception)

Raised when a CoinMetricsClient instance is not found.

### *exception* `coinmetrics._exceptions.CoinMetricsClientQueryParamsException(response, *args, **kwargs)`
Bases: `HTTPError`

Raised when a request is too long.

* **Parameters:**
  * **response** (*Response*)
  * **args** ([*Any*](https://docs.python.org/3/library/typing.html#typing.Any))
  * **kwargs** ([*Any*](https://docs.python.org/3/library/typing.html#typing.Any))

### *exception* `coinmetrics._exceptions.CoinMetricsClientRateLimitError(response, *args, **kwargs)`
Bases: `HTTPError`

Raised when the rate limit is exceeded (HTTP 429).

* **Parameters:**
  * **response** (*Response*)
  * **args** ([*Any*](https://docs.python.org/3/library/typing.html#typing.Any))
  * **kwargs** ([*Any*](https://docs.python.org/3/library/typing.html#typing.Any))

### *exception* `coinmetrics._exceptions.CoinMetricsClientUnauthorizedError(response, *args, **kwargs)`
Bases: `HTTPError`

Raised when a request is unauthorized due to invalid or missing API key (HTTP 401).

* **Parameters:**
  * **response** (*Response*)
  * **args** ([*Any*](https://docs.python.org/3/library/typing.html#typing.Any))
  * **kwargs** ([*Any*](https://docs.python.org/3/library/typing.html#typing.Any))
