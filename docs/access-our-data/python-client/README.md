---
description: Official Python wrapper for the Coin Metrics API v4.
icon: python
---

# Python API Client

The **Coin Metrics Python API Client** is the official Python wrapper for the [Coin Metrics API](https://docs.coinmetrics.io/api/v4). In just a few lines of code, anyone can access clean cryptocurrency data in a familiar form, such as a pandas or polars DataFrame.

This client offers the following affordances over hand-rolled `requests` calls:

- **Automatic pagination** &mdash; the API limits most endpoints to 10,000 entries per page; the client handles pagination transparently.
- **DataFrames** &mdash; results convert directly to pandas or polars.
- **Data exports** &mdash; stream large result sets to CSV or JSON files.
- **Typed responses** &mdash; columns are coerced to the correct dtypes.
- **Parallelization** &mdash; `.parallel()` dispatches many requests concurrently.

## Install

```bash
pip install coinmetrics-api-client
```

The client tracks API v4 closely; pin to or upgrade with the latest version on [PyPI](https://pypi.org/project/coinmetrics-api-client/):

```bash
pip install -U coinmetrics-api-client
```

## Initialize

```python
from coinmetrics.api_client import CoinMetricsClient
import os

# Recommended: read your key from the environment
client = CoinMetricsClient(os.environ["CM_API_KEY"])

# Community endpoints don't need an API key
community_client = CoinMetricsClient()
```

## Where to next

- [Quickstart](quickstart.md) &mdash; a guided tour of the most common methods.
- [Guides](guides/README.md) &mdash; best practices, examples, troubleshooting.
- [API Reference](reference/README.md) &mdash; auto-generated from the Sphinx-style docstrings in the [`coinmetrics` package](https://github.com/coinmetrics/api-client-python/tree/master/coinmetrics).
- [Changelog](changelog.md) &mdash; release notes.

{% hint style="info" %}
The reference pages on this site are generated from the docstrings in the [`coinmetrics`](https://github.com/coinmetrics/api-client-python/tree/master/coinmetrics) package by `scripts/build_docs.py`. To update them, edit the docstrings and run `make docs` from `api-client-python/`.
{% endhint %}
