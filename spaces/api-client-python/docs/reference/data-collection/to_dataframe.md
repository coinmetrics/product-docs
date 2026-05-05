# DataCollection.to_dataframe

<a id="coinmetrics._data_collection.DataCollection.to_dataframe"></a>

## *method* `DataCollection.to_dataframe`

```python
coinmetrics._data_collection.DataCollection.to_dataframe(
    dtype_mapper=None,
    dataframe_type='pandas',
    decimal_as_string=False,
)
```

Outputs a pandas or polars dataframe with schema-derived types.

Uses PyArrow as the intermediate representation for type-safe,
near-zero-copy conversion to both pandas and polars.

* **Parameters:**
  * **dtype_mapper** ([*dict*](https://docs.python.org/3/library/stdtypes.html#dict)) -- Optional dictionary mapping column names to pandas
    dtypes.  Overrides schema-derived types for the specified columns.
  * **dataframe_type** ([*str*](https://docs.python.org/3/library/stdtypes.html#str)) -- Type of dataframe outputted, either "pandas" (default) or "polars".
  * **decimal_as_string** ([*bool*](https://docs.python.org/3/library/functions.html#bool)) -- If True, decimal columns are returned as strings
    to preserve full precision. If False (default), decimals are cast to
    float64 which may lose precision for values with more than ~15
    significant digits.
* **Returns:**
  Data in a pandas or polars dataframe
* **Return type:**
  DataFrameType
