# CoinMetricsClient

`CoinMetricsClient` is the main entry point for the Python client. Instantiate it once with your API key and call the method that matches the Coin Metrics REST endpoint you want to hit; every method returns either a [`DataCollection`](data-collection.md) (REST endpoints) or a [`CmStream`](cm-stream.md) (WebSocket endpoints).

### *class* coinmetrics.api_client.CoinMetricsClient(api_key='', verify_ssl_certs=True, proxy_url=None, session=None, debug_mode=False, verbose=False, host=None, port=None, schema='https', ignore_unsupported_errors=False, ignore_forbidden_errors=False, max_retries=5)

Bases: [`object`](https://docs.python.org/3/library/functions.md#object)

The CoinMetricsClient class is a Python wrapper for calling the Coin Metrics API.

* **Parameters:**
  * **api_key** ([*str*](https://docs.python.org/3/library/stdtypes.md#str))
  * **verify_ssl_certs** ([*bool*](https://docs.python.org/3/library/functions.md#bool) *|* [*str*](https://docs.python.org/3/library/stdtypes.md#str))
  * **proxy_url** ([*str*](https://docs.python.org/3/library/stdtypes.md#str) *|* *None*)
  * **session** (*Session* *|* *None*)
  * **debug_mode** ([*bool*](https://docs.python.org/3/library/functions.md#bool))
  * **verbose** ([*bool*](https://docs.python.org/3/library/functions.md#bool))
  * **host** ([*str*](https://docs.python.org/3/library/stdtypes.md#str) *|* *None*)
  * **port** ([*int*](https://docs.python.org/3/library/functions.md#int) *|* *None*)
  * **schema** ([*str*](https://docs.python.org/3/library/stdtypes.md#str))
  * **ignore_unsupported_errors** ([*bool*](https://docs.python.org/3/library/functions.md#bool))
  * **ignore_forbidden_errors** ([*bool*](https://docs.python.org/3/library/functions.md#bool))
  * **max_retries** ([*int*](https://docs.python.org/3/library/functions.md#int) *|* *None*)

## Endpoints

Methods are grouped by endpoint root. For example, every `catalog-v2/*` request lives under **Catalog v2** and every `timeseries/*` request lives under **Time Series**.

* [Catalog v2](groups/catalog-v2.md)
* [Time Series](groups/timeseries.md)
* [Reference Data](groups/reference-data.md)
* [Security Master](groups/security-master.md)
* [Taxonomy](groups/taxonomy.md)
* [Asset Profiles](groups/asset-profiles.md)
* [Constituents](groups/constituents.md)
* [Blockchain Data](groups/blockchain-data.md)
* [Blockchain Metadata](groups/blockchain-metadata.md)
