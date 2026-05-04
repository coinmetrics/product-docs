# Asset Profiles

#### `CoinMetricsClient.get_asset_profiles(assets=None, full_names=None, page_size=None, paging_from=None)`

Returns profile data for assets, ordered by asset

* **Parameters:**
  * **assets** (_Optional_ \*\[\*_Union_ \*\[\*_List_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_ _]_) -- Returns profile data for assets.
  * **full\_names** (_Optional_ \*\[\*_Union_ \*\[\*_List_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_ _]_) -- Comma separated list of asset full names. By default profile data for all assets is returned. Mutually exclusive with assets parameter.
  * **page\_size** ([_int_](https://docs.python.org/3/library/functions.html#int)) -- Number of items per single page of results.
  * **paging\_from** ([_int_](https://docs.python.org/3/library/functions.html#int)) -- Where does the first page start, at the "start" of the interval or at the "end"
* **Return type:** [_DataCollection_](../../api-client-python/docs/reference/data-collection.md#coinmetrics._data_collection.DataCollection)

#### `CoinMetricsClient.get_network_profiles(networks=None, full_names=None, page_size=None, paging_from=None)`

Returns profile data for assets, ordered by asset

* **Parameters:**
  * **networks** (_Optional_ \*\[\*_Union_ \*\[\*_List_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_ _]_) -- Comma separated list of networks. By default profile data for all networks is returned. Mutually exclusive with full\_names parameter.
  * **full\_names** (_Optional_ \*\[\*_Union_ \*\[\*_List_ _\[_[_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_ _,_ [_str_](https://docs.python.org/3/library/stdtypes.html#str) _]_ _]_) -- Comma separated list of asset full names. By default profile data for all assets is returned. Mutually exclusive with networks parameter.
  * **page\_size** ([_int_](https://docs.python.org/3/library/functions.html#int)) -- Number of items per single page of results.
  * **paging\_from** ([_int_](https://docs.python.org/3/library/functions.html#int)) -- Where does the first page start, at the "start" of the interval or at the "end"
* **Return type:** [_DataCollection_](../../api-client-python/docs/reference/data-collection.md#coinmetrics._data_collection.DataCollection)
