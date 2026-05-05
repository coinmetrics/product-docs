# CoinMetricsClient.get_blockchain_metadata_owners

<a id="coinmetrics.api_client.CoinMetricsClient.get_blockchain_metadata_owners"></a>

## `coinmetrics.api_client.CoinMetricsClient.get_blockchain_metadata_owners(page_size=None, next_page_token=None)`

Returns a list of all supported owners lexicographically ordered by the owner_name field.

* **Parameters:**
  * **page_size** (*Optional* *[*[*int*](https://docs.python.org/3/library/functions.html#int) *]*) -- Number of items per single page of results.
  * **next_page_token** (*Optional* *[*[*str*](https://docs.python.org/3/library/stdtypes.html#str) *]*) -- Token for receiving the results from the next page of a query. Should not be used directly. To iterate through pages just use next_page_url response field.
* **Returns:**
  List of tagged entities. Ordered by tuple (entity, tag, location, start_time) if requested by providing entities parameter. Ordered by tuple (tag, location, entity, started_time) if requested by providing tags parameter.
* **Return type:**
  [DataCollection](../../data-collection/README.md#coinmetrics._data_collection.DataCollection)
