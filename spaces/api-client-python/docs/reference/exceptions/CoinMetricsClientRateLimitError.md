# `CoinMetricsClientRateLimitError`

```python
exception coinmetrics._exceptions.CoinMetricsClientRateLimitError(
    response,
    *args,
    **kwargs,
)
```

Bases: `HTTPError`

Raised when the rate limit is exceeded (HTTP 429).

* **Parameters:**
  * **response** (*Response*)
  * **args** ([*Any*](https://docs.python.org/3/library/typing.html#typing.Any))
  * **kwargs** ([*Any*](https://docs.python.org/3/library/typing.html#typing.Any))
