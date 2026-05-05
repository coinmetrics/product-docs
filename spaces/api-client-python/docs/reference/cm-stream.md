# CmStream

`CmStream` is the WebSocket wrapper returned by every `get_stream_*` method on [`CoinMetricsClient`](coinmetricsclient.md). It manages the connection lifecycle (connect, reconnect, signal handling) and dispatches incoming messages to the handlers you provide.

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

<a id="coinmetrics.api_client.CmStream"></a>

### *class* CmStream

```python
class coinmetrics.api_client.CmStream(ws_url)
```

Bases: [`object`](https://docs.python.org/3/library/functions.html#object)

* **Parameters:**
  **ws_url** ([*str*](https://docs.python.org/3/library/stdtypes.html#str))

<a id="coinmetrics.api_client.CmStream.run"></a>

#### CmStream.run

```python
coinmetrics.api_client.CmStream.run(
    on_message=None,
    on_error=None,
    on_close=None,
    reconnect=True,
)
```

* **Parameters:**
  * **on_message** ([*Callable*](https://docs.python.org/3/library/typing.html#typing.Callable) *[* *[**WebSocket* *,* [*Any*](https://docs.python.org/3/library/typing.html#typing.Any) *]* *,* *None* *]*  *|* *None*)
  * **on_error** ([*Callable*](https://docs.python.org/3/library/typing.html#typing.Callable) *[* *[**WebSocket* *,* [*Any*](https://docs.python.org/3/library/typing.html#typing.Any) *]* *,* *None* *]*  *|* *None*)
  * **on_close** ([*Callable*](https://docs.python.org/3/library/typing.html#typing.Callable) *[* *[**WebSocket* *,* [*Any*](https://docs.python.org/3/library/typing.html#typing.Any) *,* [*Any*](https://docs.python.org/3/library/typing.html#typing.Any) *]* *,* *None* *]*  *|* *None*)
  * **reconnect** ([*bool*](https://docs.python.org/3/library/functions.html#bool))
* **Return type:**
  None
