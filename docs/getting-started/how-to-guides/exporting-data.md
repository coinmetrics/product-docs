# How to Export Data

This guide will show you how to export data using the Coin Metrics API.

## HTTP API

On a web browser, you can append any valid API request URL with `&format=csv` or `&format=json` to download the data in CSV or JSON format, respectively.

For example:

https://api.coinmetrics.io/v4/timeseries/asset-metrics?api_key=<YOUR_API_KEY>>&assets=eth&metrics=PriceUSD&frequency=1d&end_time=2015-08-01&start_inclusive=false&format=csv

## Python API Client

In the Python API client, you can use the `export_to_csv` and `export_to_json` methods to export data to a CSV or JSON file.

For example:

```python
from coinmetrics.api_client import CoinMetricsClient

client = CoinMetricsClient()

client.get_asset_metrics(
    assets = ["btc", "eth"], 
    metrics = ["PriceUSD"], 
    start_time = "2024-01-01",
    end_time = "2024-01-31"
).export_to_csv("sample_data.csv")
```