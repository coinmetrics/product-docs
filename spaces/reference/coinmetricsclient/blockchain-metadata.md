# Blockchain Metadata

#### `CoinMetricsClient.get_blockchain_metadata_locations(page_size=None, next_page_token=None)`

Returns a list of all supported locations ordered lexicographically.

* **Parameters:**
  * **page\_size** (_Optional_ _\[_[_int_](https://docs.python.org/3/library/functions.html#int) _]_) -- Number of items per single page of results.
  * **next\_page\_token** (_Optional_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_) -- Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use next\_page\_url response field.
* **Returns:** List of tagged entities. Ordered by tuple (entity, tag, location, start\_time) if requested by providing entities parameter. Ordered by tuple (tag, location, entity, started\_time) if requested by providing tags parameter.
* **Return type:** [DataCollection](../../api-client-python/docs/reference/data-collection.md#coinmetrics._data_collection.DataCollection)

#### `CoinMetricsClient.get_blockchain_metadata_owners(page_size=None, next_page_token=None)`

Returns a list of all supported owners lexicographically ordered by the owner\_name field.

* **Parameters:**
  * **page\_size** (_Optional_ _\[_[_int_](https://docs.python.org/3/library/functions.html#int) _]_) -- Number of items per single page of results.
  * **next\_page\_token** (_Optional_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_) -- Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use next\_page\_url response field.
* **Returns:** List of tagged entities. Ordered by tuple (entity, tag, location, start\_time) if requested by providing entities parameter. Ordered by tuple (tag, location, entity, started\_time) if requested by providing tags parameter.
* **Return type:** [DataCollection](../../api-client-python/docs/reference/data-collection.md#coinmetrics._data_collection.DataCollection)

#### `CoinMetricsClient.get_blockchain_metadata_tagged_entities(tags=None, entities=None, locations=None, owner_names=None, page_size=None, next_page_token=None)`

Returns a list of all entities associated with provided tags. Ordered by tuple (entity, tag, location, start\_time) if requested by providing entities parameter. Ordered by tuple (tag, location, entity, started\_time) if requested by providing tags parameter. Ordered by tuple (owner\_name, location, entity, tag, timestamp\_start) if requested by providing owner\_name parameter.

* **Parameters:**
  * **tags** (_Optional_ \*\[\*_Union_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _,_ _List_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_ _]_ _]_) -- Comma separated list of tags. Mutually exclusive with entities parameter. Currently a single tag is allowed per each request.
  * **entities** (_Optional_ \*\[\*_Union_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _,_ _List_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_ _]_ _]_) -- Comma separated list of entities. Mutually exclusive with tags parameter.
  * **locations** (_Optional_ \*\[\*_Union_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _,_ _List_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_ _]_ _]_) -- Comma separated list of entity locations (asset representation where the entity has been tagged). Currently a single entity location is allowed per each request.
  * **owner\_names** (_Optional_ \*\[\*_Union_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _,_ _List_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_ _]_ _]_) -- Comma separated list of owner names. Mutually exclusive with tags and entities parameters. Currently a single owner name is allowed in a request.
  * **page\_size** (_Optional_ _\[_[_int_](https://docs.python.org/3/library/functions.html#int) _]_) -- Number of items per single page of results.
  * **next\_page\_token** (_Optional_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_) -- Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use next\_page\_url response field.
* **Returns:** List of tagged entities. Ordered by tuple (entity, tag, location, start\_time) if requested by providing entities parameter. Ordered by tuple (tag, location, entity, started\_time) if requested by providing tags parameter.
* **Return type:** [DataCollection](../../api-client-python/docs/reference/data-collection.md#coinmetrics._data_collection.DataCollection)

#### `CoinMetricsClient.get_blockchain_metadata_tags(type=None, page_size=None, next_page_token=None)`

Returns a list of all available tags along with their descriptions, lexicographically ordered by the tag field.

* **Parameters:**
  * **type** (_Optional_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_) -- The type of a tag.
  * **page\_size** (_Optional_ _\[_[_int_](https://docs.python.org/3/library/functions.html#int) _]_) -- Number of items per single page of results.
  * **next\_page\_token** (_Optional_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_) -- Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use next\_page\_url response field.
* **Returns:** List of tags.
* **Return type:** [DataCollection](../../api-client-python/docs/reference/data-collection.md#coinmetrics._data_collection.DataCollection)
