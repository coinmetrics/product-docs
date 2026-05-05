# Taxonomy

<a id="coinmetrics.api_client.CoinMetricsClient.get_taxonomy_assets"></a>

### CoinMetricsClient.get_taxonomy_assets

```python
coinmetrics.api_client.CoinMetricsClient.get_taxonomy_assets(
    assets=None,
    class_ids=None,
    sector_ids=None,
    subsector_ids=None,
    classification_start_time=None,
    classification_end_time=None,
    end_inclusive=None,
    start_inclusive=None,
    page_size=None,
    paging_from=None,
    version=None,
)
```

Returns assets with information about their sector, industry, and industry group IDs. By default reutrns all
covered assets

* **Parameters:**
  * **assets** (*Optional* *[**List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]*) -- Asset names
  * **class_ids** (*Optional* *[**List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]*) -- List of class identifiers.
  * **sector_ids** (*Optional* *[**List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]*) -- Lst of sector identifiers.
  * **subsector_ids** (*Optional* *[**List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]*) -- List of subsector identifiers
  * **classification_start_time** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Start time for the taxonomy assets. ISO-8601 format date. Inclusive by default
  * **classification_end_time** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- End time for the taxonomy assets. ISO-8601 format date. Inclusive by default
  * **start_inclusive** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if start timestamp must be included in the timeseries if present. True by default.
  * **end_inclusive** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- Flag to define if end timestamp must be included in the timeseries if present. True by default.
  * **page_size** (*Optional* *[*[*int*](https://docs.python.org/3/library/functions.html#int) *]*) -- Page size for # of assets to return, will default to 100
  * **paging_from** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Which direction to page from "start" or "end". "end" by default
  * **version** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Version to query, default is "latest".
* **Returns:**
  Returns a data collection containing the taxonomy assets
* **Return type:**
  Datacollection

<a id="coinmetrics.api_client.CoinMetricsClient.get_taxonomy_assets_metadata"></a>

### CoinMetricsClient.get_taxonomy_assets_metadata

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
