# How To Export Data

This guide will show you how to export data using the Coin Metrics API.

## HTTP API

On a web browser, you can append any valid API request URL with `&format=csv` or `&format=json` to download the data in CSV or JSON format, respectively.

For example:

https://api.coinmetrics.io/v4/timeseries/asset-metrics?api\_key=\<YOUR\_API\_KEY>>\&assets=eth\&metrics=PriceUSD\&frequency=1d\&end\_time=2015-08-01\&start\_inclusive=false\&format=csv

## Google Sheets

On the formula tab, you can use the `IMPORTDATA` function on the HTTP call on a cell:

`=IMPORTDATA("`[`https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=CapMrktEstUSD,SplyCur,PriceUSD,CapMrktCurUSD&api_key=`](https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=CapMrktEstUSD,SplyCur,PriceUSD,CapMrktCurUSD\&api_key=)`<API_KEY>&assets=usdc&frequency=1d&limit_per_asset=1&format=csv")`

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

client.get_asset_metrics(
    assets = ["btc", "eth"], 
    metrics = ["PriceUSD"], 
    start_time = "2024-01-01",
    end_time = "2024-01-31"
).export_to_json("sample_data.json")
```

As of version 2025.9.17.17, exporting to JSON files using the Python API Client is as fast using a `curl` command. See these [release notes](https://github.com/coinmetrics/api-client-python/releases/tag/2025.9.17.17) for more on benchmarking.

Exporting data can be sped up significantly by splitting the API calls to parallel threads.&#x20;

```python
client.get_asset_metrics(
    assets = ["btc", "eth"], 
    metrics = ["PriceUSD"], 
    start_time = "2024-01-01",
    end_time = "2024-01-31"
).parallel("assets").export_to_csv_files()

# Exporting to CSV: 100%|██████████| 2/2 [00:00<00:00, 14.22it/s]
# 2025-09-18 15:41:36 [INFO] Files saved in: 
# ./asset-metrics/*.csv
```

Note that the download speed is evenly divided between all active connections of a single api key. 10 parallel connections are allowed. Excessing connections will be queued (no data transfer will happen).
