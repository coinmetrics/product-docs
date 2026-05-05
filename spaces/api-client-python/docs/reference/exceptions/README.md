# Exceptions

The Coin Metrics Python client raises a typed exception hierarchy for HTTP errors, rate limiting, transport failures and data-collection errors. All exception classes are exported from the top-level `coinmetrics` package.

* [`CoinMetricsClientBadParameterError`](CoinMetricsClientBadParameterError.md)
* [`CoinMetricsClientConnectionError`](CoinMetricsClientConnectionError.md)
* [`CoinMetricsClientForbiddenError`](CoinMetricsClientForbiddenError.md)
* [`CoinMetricsClientNotFoundError`](CoinMetricsClientNotFoundError.md)
* [`CoinMetricsClientQueryParamsException`](CoinMetricsClientQueryParamsException.md)
* [`CoinMetricsClientRateLimitError`](CoinMetricsClientRateLimitError.md)
* [`CoinMetricsClientUnauthorizedError`](CoinMetricsClientUnauthorizedError.md)
