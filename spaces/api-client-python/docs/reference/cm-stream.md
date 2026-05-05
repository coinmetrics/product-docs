# CmStream

`CmStream` is the WebSocket wrapper returned by every `get_stream_*` method on [`CoinMetricsClient`](../../../reference/coinmetricsclient/). It manages the connection lifecycle (connect, reconnect, signal handling) and dispatches incoming messages to the handlers you provide.

A typical usage looks like:

```python
from coinmetrics.api_client import CoinMetricsClient

client = CoinMetricsClient("<your-api-key>")

stream = client.get_stream_asset_metrics(
    assets="btc,eth",
    metrics="ReferenceRateUSD",
    frequency="1s",
)

def on_message(ws, message):
    print(message)

stream.run(on_message=on_message)
```

### _class_ `coinmetrics.api_client.CmStream(ws_url)`

Bases: [`object`](https://docs.python.org/3/library/functions.html#object)

* **Parameters:** **ws\_url** ([_str_](https://docs.python.org/3/library/stdtypes.html#str))

#### `run(on_message=None, on_error=None, on_close=None, reconnect=True)`

* **Parameters:**
  * **on\_message** ([_Callable_](https://docs.python.org/3/library/typing.html#typing.Callable) _\[_ \*\[\*_WebSocket_ _,_ [_Any_](https://docs.python.org/3/library/typing.html#typing.Any) _]_ _,_ _None_ _]_ _|_ _None_)
  * **on\_error** ([_Callable_](https://docs.python.org/3/library/typing.html#typing.Callable) _\[_ \*\[\*_WebSocket_ _,_ [_Any_](https://docs.python.org/3/library/typing.html#typing.Any) _]_ _,_ _None_ _]_ _|_ _None_)
  * **on\_close** ([_Callable_](https://docs.python.org/3/library/typing.html#typing.Callable) _\[_ \*\[\*_WebSocket_ _,_ [_Any_](https://docs.python.org/3/library/typing.html#typing.Any) _,_ [_Any_](https://docs.python.org/3/library/typing.html#typing.Any) _]_ _,_ _None_ _]_ _|_ _None_)
  * **reconnect** ([_bool_](https://docs.python.org/3/library/functions.html#bool))
* **Return type:** None
