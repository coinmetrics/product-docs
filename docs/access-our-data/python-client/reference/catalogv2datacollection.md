---
description: 'This class is used to implement functionality specific to catalog-v2 endpoints.'
icon: code
---


# CatalogV2DataCollection

`coinmetrics._data_collection.CatalogV2DataCollection`(DataCollection)

This class is used to implement functionality specific to catalog-v2 endpoints.

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/_data_collection.py#L1564)

## Constructor

```python
def CatalogV2DataCollection.__init__(self, data_retrieval_function: DataRetrievalFuncType, endpoint: str, url_params: Dict[str, UrlParamTypes], csv_export_supported: bool=True, client: Optional[CoinMetricsClient]=None, metric_type: Optional[str]=None, iterable_col: Optional[str]=None, iterable_key: Optional[str]=None, explode_on: Optional[str]=None, assign_to: Optional[str]=None, nested_catalog_columns: List[str]=['min_time', 'max_time'], dataframe_type: str='pandas', **kwargs: Any):
```


[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/_data_collection.py#L1569)

## Methods

### `to_dataframe`

```python
def CatalogV2DataCollection.to_dataframe(self, dtype_mapper: Optional[Dict[str, Any]]=None, dataframe_type: str='pandas', decimal_as_string: bool=False) -> DataFrameType:
```


**Deprecated:** Transforms catalog data in list form into a dataframe

**Returns**

DataFrame

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/_data_collection.py#L1613)
