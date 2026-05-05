# CoinMetricsClient.get_asset_profiles

<a id="coinmetrics.api_client.CoinMetricsClient.get_asset_profiles"></a>

## *method* `CoinMetricsClient.get_asset_profiles`

```python
coinmetrics.api_client.CoinMetricsClient.get_asset_profiles(
    assets=None,
    full_names=None,
    page_size=None,
    paging_from=None,
)
```

Returns profile data for assets, ordered by asset

* **Parameters:**
  * **assets** (*Optional* *[**Union* *[**List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]*) -- Returns profile data for assets.
  * **full_names** (*Optional* *[**Union* *[**List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *,* [*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]*) -- Comma separated list of asset full names. By default profile data for all assets is returned. Mutually exclusive with assets parameter.
  * **page_size** ([*int*](https://docs.python.org/3/library/functions.html#int)) -- Number of items per single page of results.
  * **paging_from** ([*int*](https://docs.python.org/3/library/functions.html#int)) -- Where does the first page start, at the "start" of the interval or at the "end"
* **Return type:**
  [*DataCollection*](../../data-collection/README.md#coinmetrics._data_collection.DataCollection)
