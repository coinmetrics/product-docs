<p align="center">
  <img src="/.gitbook/assets/cm-dark-combination.png" alt="Coin Metrics" width="360" class="cm-hero-logo only-light">
  <img src="/.gitbook/assets/cm-light-combination.png" alt="Coin Metrics" width="360" class="cm-hero-logo only-dark">
</p>

# Coin Metrics Python API Client

The **Coin Metrics Python API Client** is the official Python wrapper for the [Coin Metrics API](https://docs.coinmetrics.io/api/v4), allowing you to access [Coin Metrics data](https://docs.coinmetrics.io/) using Python. In just a few lines of code, anyone can access clean cryptocurrency data in a familiar form, such as a `pandas` DataFrame.

This tool offers the following convenient features over simply using `requests` to query the Coin Metrics API:

- **Automatic Pagination** — the Coin Metrics API limits most endpoints to no more than 10,000 entries; the client handles pagination transparently.
- **DataFrames** — access Coin Metrics data using `pandas` or `polars` DataFrames.
- **Data Exports** — export API outputs to CSV and JSON files.
- **Typing** — DataFrame columns are automatically converted to the appropriate data types.
- **Parallelization** — submit many requests concurrently to extract data quickly.

## Installation

Install the client from PyPI:

```bash
pip install coinmetrics-api-client
```

The client is updated regularly to reflect changes in [API v4](https://docs.coinmetrics.io/api/v4). Ensure that your version matches what's published on [PyPI](https://pypi.org/project/coinmetrics-api-client/). To upgrade:

```bash
pip install coinmetrics-api-client -U
```

### Installing Behind a Private Network

Related to SSL certificate verification, you may have trouble installing and updating PyPI packages on a corporate network. Choose the option that fits your environment.

#### Using package managers

Full instructions for setting up your environment to use `conda`, `pip`, `yarn`, `npm`, etc. can be [found here](https://medium.com/@iffi33/dealing-with-ssl-authentication-on-a-secure-corporate-network-pip-conda-git-npm-yarn-bower-73e5b93fd4b2). A workaround to disable SSL verification when installing a trusted Python package is:

```bash
pip install --trusted-host pypi.python.org coinmetrics-api-client
```

Make sure you understand the risks of disabling SSL verification and that doing so complies with company policy.

#### Installing locally

It may be easier to download and install the package locally:

1. Download the files for the [Coin Metrics API Client from PyPI](https://pypi.org/project/coinmetrics-api-client/#files).
2. [Install it locally](https://packaging.python.org/en/latest/tutorials/installing-packages/#installing-from-local-archives).

## Initialization

To initialize the client you should use your API key, and the `CoinMetricsClient` class:

```python
from coinmetrics.api_client import CoinMetricsClient
import os

# we recommend storing your Coin Metrics API key in an environment variable
api_key = os.environ.get("CM_API_KEY")
client = CoinMetricsClient(api_key)

# or to use community API:
client = CoinMetricsClient()
```

If you are curious to see how the API calls are being made, instantiating the client with `verbose=True` will print each call and basic performance information to the console:

```python
client = CoinMetricsClient(api_key=api_key, verbose=True)
```

Once you have a client, head over to the [Core Concepts](user-guide/core-concepts.md) page to learn how `DataCollection` objects, DataFrames, and file exports work.

## Explore the Docs

- [**API Client Reference**](reference/README.md) -- Auto-generated reference covering every public method on `CoinMetricsClient`.
- [**User Guide**](user-guide/README.md) -- Core concepts, best practices, runnable examples, and troubleshooting tips.
- [**Changelog**](releases/changelog.md) -- Release history and migration notes.
- [**GitHub**](https://github.com/coinmetrics/api-client-python) -- Source code, issues, and releases on GitHub.
