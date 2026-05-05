# ParallelDataCollection.parse_date

<a id="coinmetrics._data_collection.ParallelDataCollection.parse_date"></a>

## `static ParallelDataCollection.parse_date`

```python
coinmetrics._data_collection.ParallelDataCollection.parse_date(date_input)
```

Parses a datetime object or datetime string into a datetime object. Datetime string must be a valid
ISO 8601 format. Timezone aware objects are converted to UTC
:param date_input: Union[datetime, date, str] date to parse into datetime
:return: datetime

* **Parameters:**
  **date_input** ([*datetime*](https://docs.python.org/3/library/datetime.html#datetime.datetime) *|* [*date*](https://docs.python.org/3/library/datetime.html#datetime.date) *|* [*str*](https://docs.python.org/3/library/stdtypes.html#str) *|* *Timestamp*)
* **Return type:**
  [*datetime*](https://docs.python.org/3/library/datetime.html#datetime.datetime)
