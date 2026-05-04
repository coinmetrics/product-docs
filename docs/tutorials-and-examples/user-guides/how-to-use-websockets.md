# How To Use Websockets

### How to use Websockets with the Python API Client

Below is a template for using the timeseries-stream endpoints using the Python API Client. The Python API Client websocket functionality is built on top of the [websocket](https://websockets.readthedocs.io/en/stable/) library.

```python
import sys
import websocket
from os import environ

import orjson

from coinmetrics.api_client import CoinMetricsClient, CmStream

api_key = (
        environ.get("CM_API_KEY") or sys.argv[1]
)  # sys.argv[1] is executed only if CM_API_KEY is not found

client = CoinMetricsClient(api_key)

# Replace this with any timeseries-stream methods
stream = client.get_stream_market_orderbooks(
    markets=['binance-btc-usdt-spot']
)

def on_message(
        stream: websocket.WebSocketApp, message: str
) -> None:
    """
    Custom message callable to be passed in the streaming object
    :param stream: CmStream, WebSocketApp connection
    :param message: str, The message relayed by the API
    :return: None
    """
    data = orjson.loads(message)
    print(data)
    sequence_id = int(data['cm_sequence_id'])
    
    # Optional: Close stream when a condition is met. For example, after receiving 10 messages.
    max_cm_sequence_id = 10
    if sequence_id >= max_cm_sequence_id:
        print(f"Closing the connection after {max_cm_sequence_id} messages...")
        stream.close()

# blocks until connection is closed or interrupted
if __name__ == '__main__':
    stream.run(on_message=on_message)
```
