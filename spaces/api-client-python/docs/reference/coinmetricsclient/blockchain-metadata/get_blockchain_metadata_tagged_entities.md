# CoinMetricsClient.get_blockchain_metadata_tagged_entities

<a id="coinmetrics.api_client.CoinMetricsClient.get_blockchain_metadata_tagged_entities"></a>

```python
coinmetrics.api_client.CoinMetricsClient.get_blockchain_metadata_tagged_entities(
    tags=None,
    entities=None,
    locations=None,
    owner_names=None,
    page_size=None,
    next_page_token=None,
)
```

Returns a list of all entities associated with provided tags. Ordered by tuple (entity, tag, location, start_time) if requested by providing entities parameter. Ordered by tuple (tag, location, entity, started_time) if requested by providing tags parameter. Ordered by tuple (owner_name, location, entity, tag, timestamp_start) if requested by providing owner_name parameter.

* **Parameters:**
  * **tags** (*Optional* *[**Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]* *]*) -- Comma separated list of tags. Mutually exclusive with entities parameter. Currently a single tag is allowed per each request.
  * **entities** (*Optional* *[**Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]* *]*) -- Comma separated list of entities. Mutually exclusive with tags parameter.
  * **locations** (*Optional* *[**Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]* *]*) -- Comma separated list of entity locations (asset representation where the entity has been tagged). Currently a single entity location is allowed per each request.
  * **owner_names** (*Optional* *[**Union* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *,* *List* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]* *]* *]*) -- Comma separated list of owner names. Mutually exclusive with tags and entities parameters. Currently a single owner name is allowed in a request.
  * **page_size** (*Optional* *[*[*int*](https://docs.python.org/3/library/functions.html#int) *]*) -- Number of items per single page of results.
  * **next_page_token** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use next_page_url response field.
* **Returns:**
  List of tagged entities. Ordered by tuple (entity, tag, location, start_time) if requested by providing entities parameter. Ordered by tuple (tag, location, entity, started_time) if requested by providing tags parameter.
* **Return type:**
  [DataCollection](../../data-collection/README.md#coinmetrics._data_collection.DataCollection)
