---
description: 'CmStream'
icon: code
---


# CmStream

`coinmetrics.api_client.CmStream`

[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L87)

## Constructor

```python
def CmStream.__init__(self, ws_url: str):
```


[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L88)

## Methods

### `run`

```python
def CmStream.run(self, on_message: MessageHandlerType=None, on_error: MessageHandlerType=None, on_close: Optional[Callable[[websocket._core.WebSocket, Any, Any], None]]=None, reconnect: bool=True) -> None:
```


[Source](https://github.com/coinmetrics/api-client-python/blob/master/coinmetrics/api_client.py#L93)
