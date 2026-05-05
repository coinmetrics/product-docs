# ParallelDataCollection.get_parallel_datacollections

<a id="coinmetrics._data_collection.ParallelDataCollection.get_parallel_datacollections"></a>

`coinmetrics._data_collection.ParallelDataCollection.get_parallel_datacollections()`

Materialize the cartesian product of every parallelized URL parameter
(and, optionally, every time / height increment) into one
[`DataCollection`](../data-collection/README.md#coinmetrics._data_collection.DataCollection) per combination.

For example, calling:

```default
client.get_asset_metrics(assets="btc,eth,algo", ...) \
    .parallel() \
    .get_parallel_datacollections()
```

returns three data collections split by asset. Adding a second
parallelization axis:

```default
client.get_asset_metrics(
    assets="btc,eth,algo",
    metrics="volume_reported_spot_usd_1d,volume_trusted_spot_usd_1d",
).parallel(parallelize_on=["metrics", "assets"]) \
 .get_parallel_datacollections()
```

returns six combinations. Layering a `time_increment` on top:

```default
client.get_asset_metrics(
    assets="btc,eth,algo",
    metrics="volume_reported_spot_usd_1d,volume_trusted_spot_usd_1d",
    start_time="2023-01-01",
    end_time="2023-02-01",
).parallel(
    parallelize_on=["metrics", "assets"],
    time_increment=timedelta(weeks=2),
).get_parallel_datacollections()
```

returns twelve, because each metric / asset pair is also split into
two-week windows.

* **Returns:**
  One [`DataCollection`](../data-collection/README.md#coinmetrics._data_collection.DataCollection) per combination of parallelized
  parameters and time / height increment.

**Returns:**

* List[[DataCollection](../data-collection/README.md#coinmetrics._data_collection.DataCollection)]
