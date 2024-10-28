# API Conventions

## **API Endpoint Structure**

The Coin Metrics API is structured as the following:

1. **Reference data** is a handbook of the entities Coin Metrics ever supported, currently supports or plans to support in the future. This includes assets, exchanges, markets, their metrics etc.
2. **Catalog** data describes the availability for time series or time series-like endpoints. For more information on the catalog migration, see [catalog-v1-v2-migration.md](catalog-v1-v2-migration.md "mention")
3. **Timeseries** data is some of the most valuable data we provide for our customers: market data (trades, order books, candles etc.), metrics (asset metrics, exchange metrics, pair metrics etc.), index levels and so on.
4. **Time Series Stream** data is time series data served in real-time through a Websocket connection.
5. **Custom endpoints** - endpoints that do not fit to any of the aforementioned. These endpoints follow the same design principles as the Timeseries data. Examples of custom endpoints:
   1. **Blockchain** endpoints (ATLAS)
   2. **Blockchain Metadata** (Tagging)
   3. Transaction tracker API
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

We have two subtypes of catalog endpoints:

* /catalog prefixed endpoints - provide time ranges of the time series data available for your API key.
* /catalog-all prefixed endpoints - provide time ranges of the time series data for our entire data set.

Catalog endpoints list all data types and possible entities and their combinations. The deepest part of each combination is the "min\_time" and "max\_time" values representing the availability of the corresponding time series(-like) endpoint. For example, `/catalog-v2/market-metrics`:\\

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

or `/catalog-v2/exchange-metrics`:

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

_Note: This query was made on 2023-06-27. max\_time is subject to change depending on when a request is made._

Catalog endpoints abide by the following guidelines:

1. Normally, each catalog endpoint has a corresponding time series-like endpoint (for example, /catalog-v2/market-metrics and /timeseries/market-metrics).
2. Each catalog endpoint supports pagination
3. Catalog endpoints do not require any filtering query parameters; by default, all records are being returned (paginated), but filtering query parameters (especially if they match the corresponding time series endpoint’s query parameters) are welcomed.
4. Each Catalog endpoint must support json\_stream format. While it is not required for Time series endpoints (the response size may be impractically large to use with json\_stream)), it is mandatory for Catalog ones.
5. Responses of endpoints for similar data types are consistent. For example, /catalog-v2/asset-metrics, /catalog-v2/exchange-metrics provide information about metrics and their availability, so the response schemas should not differ unnecessarily.
6. Response format assumes that multiple frequencies can be added in the future.

See [catalog-v1-v2-migration.md](catalog-v1-v2-migration.md "mention") for more details on the differences between catalog v1 and v2.

### Timeseries

Timeseries endpoints return data or metrics over time. We have a set of parameters to filter time series responses.

| Parameter        | Default value        | Description                                                         | Examples          |
| ---------------- | -------------------- | ------------------------------------------------------------------- | ----------------- |
| start\_time      | \<unix\_epoch>       | Start of the time interval.                                         | 2020-01-01        |
| end\_time        | \<current\_time>     | End of the time interval.                                           | 2020-01-02        |
| start\_inclusive | true                 | Inclusive or exclusive corresponding start\_\* parameters.          | false             |
| end\_inclusive   | true                 | Inclusive or exclusive corresponding end\_\* parameters.            | false             |
| timezone         | UTC                  | Timezone name for parsing the start\_time and end\_time timestamps. | America/New\_York |
| page\_size       | varies (usually 100) | Number of items per single page of results.                         | 100, 10000        |

Also, additional query parameters, apart from the pagination ones, can be specified to reduce the amount of returned data:

\\

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

\\

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

## API Versions

* \*\*\*\*[**API v4**](https://docs.coinmetrics.io/api/v4) **(stable)**

## API Access

### Free Tier (Community API)

Our community data can be accessed without an API key. Simply run queries against the`community-api.coinmetrics.io` endpoint. This data is available for free for non-commercial use under a [Creative Commons](https://creativecommons.org/licenses/by-nc/4.0/) license. See our [Terms of Use](https://coinmetrics.io/terms-of-use/) for more details.

### Paid Tier (Pro API)

Our professional data is available to institutions via an API key. Please [contact us](https://share.hsforms.com/15lLsB4n2Tl-Jj9MS7P2utA34tym) if you wish to purchase our institutional data.

## Coin Metrics API Standards

### Timestamps

Coin Metrics formats time in accordance with the ISO 8601 standard. As such, the following formats for time parameters in the query string are supported:

* 2020-03-13
* 20060120
* 2020-03-13T15:25:15Z
* 2020-03-13T15:25:15.12345789Z
* 2020-03-13T525.999Z

Note the **Z** suffix in requests is optional. All dates in the query parameters are in the UTC timezone by default. All responses are always in the UTC timezone and with nanoseconds precision.

### Number Format

All numbers in API responses are surrounded by quotes, which allows JavaScript clients to work with numbers that have more than 53 bits. The decimal separator is always a "dot". The number of decimal places is defined by blockchain/exchange and not modified by the API.

### Monetary Amount Formats

Monetary amounts are provided as strings and with the same order of magnitude as the one used for pricing. For Bitcoin, the primary format is the native BTC unit (e.g., 1 BTC, 0.29938 BTC) as opposed to any subformat, such as satoshis, which represent one hundred millionth of a Bitcoin.

## Pagination

Large lists may be split into pages. In accordance with Coin Metrics' API v4, page size has a default value of **100** and can be changed using a `page_size` parameter. The **maximum** page size supported is **10,000**.

If a response contains the `next_page_url` field at the top level of the JSON response, it means the client can request the next page of results by fetching the provided URL without any modifications.

## HTTP/REST API

Coin Metrics' API v4 API uses the HTTP/2 protocol.

## Rate limits

To ensure the quality of Coin Metrics services, our API is subject to rate limiting. If you reach the limit, the API will begin to return `429 Too Many Requests` HTTP response status. The API also provides `X-RateLimit-*` response headers formatted according to [https://tools.ietf.org/html/draft-polli-ratelimit-headers-03](https://tools.ietf.org/html/draft-polli-ratelimit-headers-03).

### Community API

The community version of API has a limit of 10 requests per 6 seconds sliding window for an **IP address**. It corresponds to 1.6 RPS.

### Paid Tier (Pro API)

The paid version of API has a limit of 6,000 requests per 20 seconds sliding window for an **API key**. It corresponds to 300 RPS.

## WebSocket

We use the default WS protocol ping/pong mechanism. There are some restarts occasionally because it goes through Cloudflare, so you should have some logic in place to automatically reconnect.

## Backward Compatibility

Our API is versioned using [Semantic Versioning](https://semver.org/). The API version number convention is `major.minor.patch`. The notation rules are:

* Backward incompatible changes increase the major number.
* Backward compatible changes increase the minor number.
* Backward compatible bug fixes increase the patch number.

### Versioning

Major versions of the API are run in parallel. The choice of what major API version to use is up to the client, although clients are advised to use the highest stable version.

Major versions can be marked as either stable or unstable. As backward-incompatible changes can be introduced only in unstable or development major versions, no breakage is expected when using fixed, stable major API versions (and adhering to safety guidelines below).

New major API releases are to be added alongside old major API versions, so clients of old (stable) versions are not affected. Old major API versions may be gradually deprecated and removed, following a (generally long-term) deprecation schedule. This should give clients time to adapt their implementations to the new major version.

Minor and patch releases replace old minor/patch API versions, under the same major version. Old minor/patch API versions become inaccessible following these releases.

#### Unstable Major Versions

Recently introduced versions of the API may be explicitly labeled "unstable". Unstable API versions are fully tested, usable by clients, and have complete documentation. However, an unstable API version is not covered by the backward compatibility rules below and can receive arbitrary changes at any time without any warning. Unstable API versions should be used only for evaluation of new features. It is not advised to use unstable versions in production systems.

New major versions of the API are expected to be marked unstable, and after a period of stabilization and testing become permanently stable.

#### Development Major Versions

The newest version of the API may be explicitly labeled "development". Development API versions may receive arbitrary changes at any time and may also have wrong/incomplete implementation, documentation, or other critical issues. Generally, development API versions should be completely avoided, as there are no guarantees about how well it works, or whether it works at all.

### Backward Compatible Changes

A change is considered backward compatible when an API client built for an old version of the API still works with the new version. Hence, it is important that clients use correct assumptions about what details of the API they can rely on.

#### Changes considered backward-compatible (can be introduced in a minor or patch API version)

{% hint style="danger" %}
These changes can be introduced in minor or patch API versions. Follow the below recommendations to avoid broken integrations:

* Addition of a new API method. Do not rely on the absence of a specific URL path or API method.
* Addition of new constant-named fields to response structures of the existing API method. Do not rely on the absence of unknown fields in API response structures.
* Addition of a new optional request parameter to a method, given that its absence has the same meaning as it was before the change. Do not add unsupported request parameters to API calls - they are ignored while unsupported, but may suddenly become "supported".
* Making previously mandatory request parameters optional.
* Addition of new possible values for enum-typed request parameters of the API method.
* Changes in human-friendly strings (i.e. asset/metric names/definitions, error descriptions). Do not make decisions in your code based on human-friendly strings. These strings can be changed for reasons like fixing misspelling or style. Use fields designed to be "stable", e.g. error codes, etc.
* Adding/removing/changing available resources: assets, metrics, etc. Availability of specific assets/metrics/etc is not part of the API interface and not covered by this policy. You should use the discovery API methods to get an accurate list of available resources.
* Fixes which technically should be considered backward-incompatible, when the affected part of the API was virtually unusable before the fix.
{% endhint %}

#### Changes considered backward-incompatible

{% hint style="success" %}
These changes can only be introduced in a new major API version or unstable major API version. It is safe to assume that this will not happen to fixed, stable major API versions.

* Renaming or removing an API method.
* Removing mandatory request parameters of an API method.
* Making previously optional request parameters mandatory.
* Removing constant-named fields from API response structures.
* Renaming, removing, or changing the meaning of a request parameter.
* Renaming, removing, or changing the meaning of the possible value of enum-typed request parameters.
* Changing the response structure of an API method.
{% endhint %}

### Emergency Changes <a href="#apibackwardcompatibilitypolicy-emergencychanges" id="apibackwardcompatibilitypolicy-emergencychanges"></a>

Generally, changes to the API interface and functionality will follow this policy as outlined above. However, breaking changes may still be made without introducing a new major version, if it is needed for continuous operation of Coin Metrics' services, for security reasons, or for other reasons, if following this policy is deemed to be infeasible. That may include, but is not limited to, the following: introducing or changing request rate limits, applying specific limits per specific API key, immediate disabling of specific methods or features, etc. Changes also can be made to this policy.

Such emergency changes are expected to be rare exceptions and would be conducted only after careful assessment of the impact to clients. In the event of such a change, Coin Metrics would provide as much advance notice as possible.
