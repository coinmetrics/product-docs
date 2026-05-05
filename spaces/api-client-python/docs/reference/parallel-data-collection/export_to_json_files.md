# `ParallelDataCollection.export_to_json_files`

*method*

```python
coinmetrics._data_collection.ParallelDataCollection.export_to_json_files(
    data_directory=None,
    compress=False,
)
```

Export the parallelized request to a directory of JSON files, one file
per combination of the `parallelize_on` attribute of the parent
[`ParallelDataCollection`](README.md#coinmetrics._data_collection.ParallelDataCollection).

Examples:

```default
client.get_market_trades(
    "coinbase-eth-btc-spot,coinbase-eth-usdc-spot",
).parallel("markets").export_to_json_files()
```

produces:

```default
./market-trades/coinbase-eth-btc-spot.json
./market-trades/coinbase-eth-usdc-spot.json
```

Layering a `time_increment` on top:

```default
client.get_asset_metrics(
    "btc,eth", "ReferenceRateUSD",
    start_time="2024-01-01", limit_per_asset=1,
).parallel(
    "assets,metrics",
    time_increment=timedelta(days=1),
).export_to_json_files()
```

produces:

```default
./asset-metrics/btc/ReferenceRateUSD/start_time=2024-01-01T00-00-00Z.json
./asset-metrics/eth/ReferenceRateUSD/start_time=2024-01-01T00-00-00Z.json
```

* **Parameters:**
  * **data_directory** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Path to the directory where files should be
    written. Defaults to the current working directory.
  * **compress** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Whether to gzip the resulting files.
* **Return type:**
  None
