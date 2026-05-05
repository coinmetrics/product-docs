# `DataCollection.parallel`

*method*

```python
coinmetrics._data_collection.DataCollection.parallel(
    parallelize_on=None,
    executor=None,
    max_workers=None,
    progress_bar=None,
    time_increment=None,
    height_increment=None,
)
```

Convert this [`DataCollection`](README.md#coinmetrics._data_collection.DataCollection) into a [`ParallelDataCollection`](../parallel-data-collection/README.md#coinmetrics._data_collection.ParallelDataCollection),
splitting a single HTTP request into many parallel requests for faster
data export.

By default the request is split on the primary query parameter (for example,
`get_asset_metrics(assets=...)` is split into one request per asset).

* **Parameters:**
  * **parallelize_on** (*Optional* *[**Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]* *]*) -- Parameter(s) to parallelize on. Must be one of the
    list-type parameters of the underlying endpoint
    (`assets`, `markets`, `metrics`, ...).
  * **executor** (*Optional* *[**Callable* *[* *[**Any* *]* *,* [*concurrent.futures.Executor*](https://docs.python.org/3/library/concurrent.futures.html#concurrent.futures.Executor) *]* *]*) -- Executor class used for concurrency. Defaults to
    [`concurrent.futures.ThreadPoolExecutor`](https://docs.python.org/3/library/concurrent.futures.html#concurrent.futures.ThreadPoolExecutor); pass a
    [`ProcessPoolExecutor`](https://docs.python.org/3/library/concurrent.futures.html#concurrent.futures.ProcessPoolExecutor) (or any other
    `Executor` subclass) to swap it out.
  * **max_workers** (*Optional* *[*[*int*](https://docs.python.org/3/library/functions.html#int) *]*) -- Number of parallel workers. Defaults to `10` and is
    capped at `10` to respect API rate limits.
  * **progress_bar** (*Optional* *[*[*bool*](https://docs.python.org/3/library/functions.html#bool) *]*) -- Whether to display a `tqdm` progress bar while the
    workers run. Defaults to `True`.
  * **time_increment** (*Optional* *[**Union* *[**relativedelta* *,* *timedelta* *,* *DateOffset* *]* *]*) -- Optionally split the request along the time axis as
    well. Use [`datetime.timedelta`](https://docs.python.org/3/library/datetime.html#datetime.timedelta) for sub-month windows and
    `dateutil.relativedelta.relativedelta` for month / year windows.
    Requires `start_time` to be set on the original request.
  * **height_increment** (*Optional* *[*[*int*](https://docs.python.org/3/library/functions.html#int) *]*) -- Optionally split the request along the block-height
    axis. Requires `start_height` to be set on the original request.
* **Returns:**
  A [`ParallelDataCollection`](../parallel-data-collection/README.md#coinmetrics._data_collection.ParallelDataCollection) that mirrors the original
  request but executes its workload across multiple workers.
* **Return type:**
  [ParallelDataCollection](../parallel-data-collection/README.md#coinmetrics._data_collection.ParallelDataCollection)
