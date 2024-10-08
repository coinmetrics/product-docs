# API Structure Explained

This page explains the logic behind the API structure and will help you understand how to navigate the API.

## **API Endpoint Structure**

The Coin Metrics API is structured as the following:

1. **Time Series** data is some of the most valuable data we provide for our customers: market data (trades, order books, candles etc.), metrics (asset metrics, exchange metrics, pair metrics etc.), index levels and so on.
2. **Time Series Stream** data is time series data served in real-time through a Websocket connection.
3. **Catalog** data describes the availability for time series or time series-like endpoints. For more information on the catalog migration, see [catalog-v1-v2-migration.md](catalog-v1-v2-migration.md "mention")
4. **Reference data** is a handbook of the entities Coin Metrics ever supported, currently supports or plans to support in the future. This includes assets, exchanges, markets, their metrics etc.
5. **Custom endpoints** - endpoints that do not fit to any of the mentioned ones. Examples of custom endpoints:
   1. **Blockchain** endpoints (ATLAS)
   2. **Blockchain Metadata**
   3. Transaction tracker API.
   4. Security Master
   5. Constituents

We will explain the different endpoints in depth below.

### Reference Data

**Reference Data** is a common starting point for new users. This endpoint gives the you an idea of what data types we support (assets, exchanges, markets, metrics), the format of data (like the format of market name or asset code) and other useful information (metric description, its data type etc). As an example, here is the response of `/reference-data/exchange-metrics` endpoint:

```json
{
 "data": [
   {
     "metric": "liquidations_reported_future_buy_units_1d",
   "full_name": "Liquidations, reported, future, buys, native units, one day",
   "description": "The sum of all buy liquidations from perpetual futures markets in native units of the underlying base asset.",
     "product": "Market Data",
     "category": "Liquidations",
     "subcategory": "Futures",
     "unit": "Native Units",
     "data_type": "decimal",
     "type": "Sum",
     "display_name": "Reported Futures Buy Liquidations, native units"
   }
 ]
}
```

### Catalog

The catalog endpoints allow you to know:

* what data types are available,
* min and max time of each data type that API can provide.

We have two subtypes of catalog endpoints:&#x20;

* /catalog prefixed endpoints - provide time ranges of the time series data available for your API key.&#x20;
* /catalog-all prefixed endpoints - provide time ranges of the time series data supported by API.\


Catalog endpoints list all data types and possible entities and their combinations. The deepest part of each combination is the "min\_time" and "max\_time" values representing the availability of the corresponding time series(-like) endpoint. For example, `/catalog-v2/market-metrics`:\


```json
{
 "data": [
   {
     "market": "binance-1000FLOKIUSDT-future",
     "metrics": [
       {
         "metric": "liquidations_reported_future_buy_units_1d",
         "frequencies": [
           {
             "frequency": "1d",
             "min_time": "2023-05-08T00:00:00.000000000Z",
             "max_time": "2023-06-27T00:00:00.000000000Z"
           }
         ]
       }
     ]
   }
 ]
}

```

or `/catalog/exchange-metrics`:

```json

{
 "data": [
   {
     "exchange": "binance",
     "metrics": [
       {
         "metric": "liquidations_reported_future_buy_units_5m",
         "frequencies": [
           {
             "frequency": "1h",
             "min_time": "2023-06-04T00:00:00.000000000Z",
             "max_time": "2023-06-27T05:40:00.000000000Z"
           },
           {
             "frequency": "1d",
             "min_time": "2023-06-04T00:00:00.000000000Z",
             "max_time": "2023-06-27T05:40:00.000000000Z"
           }
         ]
       }
    }
  ]
}

```

Catalog endpoints abide by the following guidelines:

1. Normally, each Catalog endpoint should have a corresponding time series-like endpoint (for example, /catalog/market-metrics and /timeseries/market-metrics).&#x20;
2. Each catalog endpoint supports pagination
3. Catalog endpoints do not require any filtering query parameters; by default, all records are being returned (paginated), but filtering query parameters (especially if they match the corresponding time series endpoint’s query parameters) are welcomed.
4. Each Catalog endpoint must support json\_stream format. While it is not required for Time series endpoints (the response size may be impractically large to use with json\_stream)), it is mandatory for Catalog ones.
5. Responses of endpoints for similar data types are consistent. For example, /catalog/asset-metrics, /catalog/exchange-metrics provide information about metrics and their availability, so the response schemas should not differ unnecessarily.
6. Response format assumes that multiple frequencies can be added in the future.

See [catalog-v1-v2-migration.md](catalog-v1-v2-migration.md "mention") for more details on the differences between catalog v1 and v2.

### Timeseries

Timeseries endpoints return data or metrics over time. We have a set of parameters to filter time series responses.



| Parameter        | Default value    | Description                                                         | Examples          |
| ---------------- | ---------------- | ------------------------------------------------------------------- | ----------------- |
| start\_time      | \<unix\_epoch>   | Start of the time interval.                                         | 2020-01-01        |
| end\_time        | \<current\_time> | End of the time interval.                                           | 2020-01-02        |
| start\_inclusive | true             | Inclusive or exclusive corresponding start\_\* parameters.          | false             |
| end\_inclusive   | true             | Inclusive or exclusive corresponding end\_\* parameters.            | false             |
| timezone         | UTC              | Timezone name for parsing the start\_time and end\_time timestamps. | America/New\_York |



Also, additional query parameters, apart from the pagination ones, can be specified to reduce the amount of returned data:

\


| Parameter             | Default value | Description                                        | Examples            |
| --------------------- | ------------- | -------------------------------------------------- | ------------------- |
| limit\_per\_\<entity> | <p><br></p>   | How many entries per entity result should contain. | limit\_per\_asset=1 |

#### Frequency vs. Granularity

Timeseries endpoints may return data via some fixed frequency (\*-metrics) or as raw observation (market-trades, market-orderbooks).

#### Nulls and Empty Strings In Responses

\
Usually, if some response field does not have a value, we don't include this field in the response.

But we have a set of exceptions for this rule. Nulls are included in the response if null is a correct metric value. It happens when the metrics can't be mathematically calculated due to, for example, division by zero or similar things. Multiple supported metrics are requested by a user but only some of the metrics have values calculated for the requested time.

API has a special query parameter null\_as\_zero=true that converts nulls to zero in the mentioned exceptional cases.

### Timeseries Stream

WebSocket endpoints are used to stream real-time data to clients. They send individual JSON messages/objects/events as soon as API becomes aware of them. Usually, they have the same names as regular time series endpoints. For example,

`/timeseries/asset-metrics` and `/timeseries-stream/asset-metrics`

But they can support different sets of query parameters because of the different nature of the data (historical vs real-time).

#### HTTP status codes & error messages

API has a standard set of errors and error message formats that it can send to clients.

Usually, we don't need to create a new error message or code.

\


| Code | Description                                                                                                                                                                                |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 200  | A successful response.                                                                                                                                                                     |
| 400  | Indicates that request is invalid. Includes incorrect query parameter names and/or values, all of the requested resources are unsupported by API, required query parameters aren’t passed. |
| 401  | API key is not provided or is invalid/expired.                                                                                                                                             |
| 403  | API key is provided but the client doesn't have access to at least one of the requested resources.                                                                                         |
| 404  | The endpoint or request path is not found.                                                                                                                                                 |
| 414  | Request URI is too long                                                                                                                                                                    |
| 429  | Rate limits are violated. The client must slow down their requests.                                                                                                                        |
| 524  | User closed connection. This is not returned by the API but is generated by a web service providern due to prolonged waiting.                                                              |
| 500  | Something wrong happened in the API server.                                                                                                                                                |

## Metric Data Types

Coin Metrics aggregates metrics by various aggregation levels:

* [Asset](asset-metrics-overview.md) (timeseries/asset-metrics). See [#what-asset-ticker-naming-conventions-does-coin-metrics-use](../market-data/faqs/#what-asset-ticker-naming-conventions-does-coin-metrics-use "mention")
* Exchange (timeseries/exchange-metrics)
* Exchange-Asset (timeseries/exchange-asset-metrics)
* Market (timeseries/market-metrics). See [#what-market-naming-conventions-does-coin-metrics-use](../market-data/faqs/#what-market-naming-conventions-does-coin-metrics-use "mention")
* Pair (timeseries/pair-metrics)

For a technical overview of how to use our API, please see our [API docs](https://docs.coinmetrics.io/api/v4/).

