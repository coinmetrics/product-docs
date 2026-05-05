# CoinMetricsClient

`CoinMetricsClient` is the main entry point for the Python client. Instantiate it once with your API key and call the method that matches the Coin Metrics REST endpoint you want to hit; every method returns either a [`DataCollection`](../../api-client-python/docs/reference/data-collection.md) (REST endpoints) or a [`CmStream`](../../api-client-python/docs/reference/cm-stream.md) (WebSocket endpoints).

### _class_ `coinmetrics.api_client.CoinMetricsClient(api_key='', verify_ssl_certs=True, proxy_url=None, session=None, debug_mode=False, verbose=False, host=None, port=None, schema='https', ignore_unsupported_errors=False, ignore_forbidden_errors=False, max_retries=5)`

Bases: [`object`](https://docs.python.org/3/library/functions.html#object)

The CoinMetricsClient class is a Python wrapper for calling the Coin Metrics API.

* **Parameters:**
  * **api\_key** ([_str_](https://docs.python.org/3/library/stdtypes.html#str))
  * **verify\_ssl\_certs** ([_bool_](https://docs.python.org/3/library/functions.html#bool) _|_ [_str_](https://docs.python.org/3/library/stdtypes.html#str))
  * **proxy\_url** ([_str_](https://docs.python.org/3/library/stdtypes.html#str) _|_ _None_)
  * **session** (_Session_ _|_ _None_)
  * **debug\_mode** ([_bool_](https://docs.python.org/3/library/functions.html#bool))
  * **verbose** ([_bool_](https://docs.python.org/3/library/functions.html#bool))
  * **host** ([_str_](https://docs.python.org/3/library/stdtypes.html#str) _|_ _None_)
  * **port** ([_int_](https://docs.python.org/3/library/functions.html#int) _|_ _None_)
  * **schema** ([_str_](https://docs.python.org/3/library/stdtypes.html#str))
  * **ignore\_unsupported\_errors** ([_bool_](https://docs.python.org/3/library/functions.html#bool))
  * **ignore\_forbidden\_errors** ([_bool_](https://docs.python.org/3/library/functions.html#bool))
  * **max\_retries** ([_int_](https://docs.python.org/3/library/functions.html#int) _|_ _None_)

## Endpoints

Methods are grouped by endpoint root. For example, every `catalog-v2/*` request lives under **Catalog v2** and every `timeseries/*` request lives under **Time Series**.
