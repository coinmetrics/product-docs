# CoinMetricsClient.get_taxonomy_assets_metadata

<a id="coinmetrics.api_client.CoinMetricsClient.get_taxonomy_assets_metadata"></a>

```python
coinmetrics.api_client.CoinMetricsClient.get_taxonomy_assets_metadata(
    start_time=None,
    end_time=None,
    start_inclusive=None,
    end_inclusive=None,
    page_size=None,
    paging_from=None,
    version=None,
)
```

Returns metadata about the assets, sectors, and industries included in the CM taxonomy

* **Parameters:**
  * **start_time** (*Optional* *[**Union* *[**datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]*) -- Start time for the taxonomy version file. ISO-8601 format date. Inclusive by default
  * **end_time** (*Optional* *[**Union* *[**datetime* *,* *date* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]*) -- End time for the taxonomy version file. ISO-8601 format date. Exclusive by default
  * **start_inclusive** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Start time of taxonomy version.
  * **end_inclusive** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- End time of taxonomy version.
  * **page_size** (*Optional* *[*[*int*](https://docs.python.org/3/library/functions.html#int) *]*) -- Page size for # of asset metadata to return, will default to 100
  * **paging_from** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Which direction to page from "start" or "end". "end" by default
  * **version** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Version to query, default is "latest".
* **Returns:**
  Returns a data collection containing the taxonomy assets
* **Return type:**
  Datacollection
