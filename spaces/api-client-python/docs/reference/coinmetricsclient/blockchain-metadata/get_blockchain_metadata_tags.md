# CoinMetricsClient.get_blockchain_metadata_tags

<a id="coinmetrics.api_client.CoinMetricsClient.get_blockchain_metadata_tags"></a>

```python
coinmetrics.api_client.CoinMetricsClient.get_blockchain_metadata_tags(
    type=None,
    page_size=None,
    next_page_token=None,
)
```

Returns a list of all available tags along with their descriptions, lexicographically ordered by the tag field.

* **Parameters:**
  * **type** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- The type of a tag.
  * **page_size** (*Optional* *[*[*int*](https://docs.python.org/3/library/functions.html#int) *]*) -- Number of items per single page of results.
  * **next_page_token** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use next_page_url response field.

**Returns:**

* [DataCollection](../../data-collection/README.md#coinmetrics._data_collection.DataCollection)
  * List of tags.
