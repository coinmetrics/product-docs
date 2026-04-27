---
description: 'CatalogExchangesData'
icon: code
---


# CatalogExchangesData

`coinmetrics._catalogs.CatalogExchangesData`(List[Any])

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/_catalogs.py#L274)

## Methods

### `to_dataframe`

```python
def CatalogExchangesData.to_dataframe(self, secondary_level: Optional[str]=None) -> pd.DataFrame:
```


Transforms catalog data in list form into a dataframe

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `secondary_level` | `str` | Second level of aggregation next to exchanges. One of "markets" or "metrics"; raises ValueError if neither. |

**Returns**

Catalog Data

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/_catalogs.py#L275)
