# Withdrawals

## Contents

* [ETF Withdrawals (FlowOutXNtv, FlowOutXUSD)](withdrawals.md#flowin)
* [ETF Withdrawals Count (FlowTfrOutXCnt)](withdrawals.md#flowtfrin)

## ETF Withdrawals <a href="#flowout" id="flowout"></a>

### Definition

The sum of assets withdrawn from an ETF that interval.

| Name                                                            | MetricID          | Unit         | Interval |
| --------------------------------------------------------------- | ----------------- | ------------ | -------- |
| ARK Invest Withdrawals (native units)                           | FlowOutARKNtv     | Native units | 1 day    |
| ARK Invest Withdrawals (USD)                                    | FlowOutARKUSD     | USD          | 1 day    |
| BlackRock Withdrawals (native units)                            | FlowOutBLKNtv     | Native units | 1 day    |
| BlackRock Withdrawals (USD)                                     | FlowOutBLKUSD     | USD          | 1 day    |
| Bitwise Withdrawals (native units)                              | FlowOutBWSNtv     | Native units | 1 day    |
| Bitwise Withdrawals (USD)                                       | FlowOutBWSUSD     | USD          | 1 day    |
| Exchange Traded Fund Withdrawals, Including EtoE (native units) | FlowOutEtfInclNtv | Native units | 1 day    |
| Exchange Traded Fund Withdrawals, Including EtoE (USD)          | FlowOutEtfInclUSD | USD          | 1 day    |
| Exchange Traded Fund Withdrawals (native units)                 | FlowOutEtfNtv     | Native units | 1 day    |
| Exchange Traded Fund Withdrawals (USD)                          | FlowOutEtfUSD     | USD          | 1 day    |
| Grayscale Withdrawals (native units)                            | FlowOutGSCNtv     | Native units | 1 day    |
| Grayscale Withdrawals (USD)                                     | FlowOutGSCUSD     | USD          | 1 day    |
| Invesco Withdrawals (native units)                              | FlowOutINVNtv     | Native units | 1 day    |
| Invesco Withdrawals (USD)                                       | FlowOutINVUSD     | USD          | 1 day    |
| Franklin Templeton Withdrawals (native units)                   | FlowOutTMPNtv     | Native units | 1 day    |
| Franklin Templeton Withdrawals (USD)                            | FlowOutTMPUSD     | USD          | 1 day    |
| VanEck Withdrawals (native units)                               | FlowOutVANNtv     | Native units | 1 day    |
| VanEck Withdrawals (USD)                                        | FlowOutVANUSD     | USD          | 1 day    |
| Valkyrie Withdrawals (native units)                             | FlowOutVLKNtv     | Native units | 1 day    |
| Valkyrie Withdrawals (USD)                                      | FlowOutVLKUSD     | USD          | 1 day    |
| WisdomTree Withdrawals (native units)                           | FlowOutWDTNtv     | Native units | 1 day    |
| WisdomTree Withdrawals (USD)                                    | FlowOutWDTUSD     | USD          | 1 day    |

### Details

* Native units are considered as withdrawn if they leave the control of an address we identify as being owned by an ETF.
* USD flows are computed as `FlowOut{ETF}Ntv * PriceUSD`

### Asset-Specific Details

* For Bitcoin, this metric excludes the effect of change outputs:
  * If a transaction spends 100 BTC from ETF A but 90 BTC are sent back to it as change, the flow is -10 BTC, not -100 BTC and +90 BTC.

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics-v2/FlowOutEtfInclNtv" %}

## ETF Withdrawal Count <a href="#flowtfrout" id="flowtfrout"></a>

### Definition

The sum count of transfers from any address belonging to an exchange in that interval. If the recipient address also belongs to the same exchange, the transfer is not counted.

<table><thead><tr><th>Name</th><th width="181">MetricID</th><th>Unit</th><th>Interval</th></tr></thead><tbody><tr><td>ARK Invest Withdrawal Count</td><td>FlowTfrOutARKCnt</td><td>Withdrawals</td><td>1 day</td></tr><tr><td>BlackRock Withdrawal Count</td><td>FlowTfrOutBLKCnt</td><td>Withdrawals</td><td>1 day</td></tr><tr><td>Bitwise Withdrawal Count</td><td>FlowTfrOutBWSCnt</td><td>Withdrawals</td><td>1 day</td></tr><tr><td>Grayscale Withdrawal Count</td><td>FlowTfrOutGSCCnt</td><td>Withdrawals</td><td>1 day</td></tr><tr><td>Invesco Withdrawal Count</td><td>FlowTfrOutINVCnt</td><td>Withdrawals</td><td>1 day</td></tr><tr><td>Franklin Templeton Withdrawal Count</td><td>FlowTfrOutTMPCnt</td><td>Withdrawals</td><td>1 day</td></tr><tr><td>VanEck Withdrawal Count</td><td>FlowTfrOutVANCnt</td><td>Withdrawals</td><td>1 day</td></tr><tr><td>Valkyrie Withdrawal Count</td><td>FlowTfrOutVLKCnt</td><td>Withdrawals</td><td>1 day</td></tr><tr><td>WisdomTree Withdrawal Count</td><td>FlowTfrOutWDTCnt</td><td>Withdrawals</td><td>1 day</td></tr><tr><td>Exchange Traded Fund Withdrawal Count</td><td>FlowTfrFromEtfCnt</td><td>Withdrawals</td><td>1 day</td></tr><tr><td>Exchange Traded Fund Withdrawal Count, Incl EtoE</td><td>FlowTfrFromEtfInclCnt</td><td>Withdrawals</td><td>1 day</td></tr></tbody></table>

### Details

* Coinbase (i.e., miner reward) transactions are not counted.

### Asset-Specific Details

* For UTXO-based protocols, this metric does not count change outputs:
  * If the input addresses belong to a given ETF, then the outputs belonging to the same ETF are not counted as transfers to that ETF

### Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics-v2/FlowTfrFromEtfCnt" %}

## API Endpoints

ETF Withdrawal metrics can be accessed using these endpoints:

* `timeseries/asset-metrics`

and by passing in the metric ID's `FlowOut*` and `FlowTfrOut*` in the `metrics` parameter.

{% openapi-operation spec="knowledge-coinmetrics-api" path="/timeseries/asset-metrics" method="get" %}
[OpenAPI knowledge-coinmetrics-api](https://gitbook-x-prod-openapi.4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/raw/08e54b073fe224876d70fb093dff66c7f1921316515e8f46ff1b7a4836f20780.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20250725%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250725T204413Z&X-Amz-Expires=172800&X-Amz-Signature=3445c0f15057bdba4449b8da2f8cfab81ba91c772f77058d13e3d3244494bc6d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-operation %}

{% tabs %}
{% tab title="Shell" %}
```shell
curl --compressed "https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=FlowOutARKNtv&assets=btc&pretty=true&api_key=<your_key>"
```
{% endtab %}

{% tab title="Python" %}
```python
import requests
response = requests.get('https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=FlowOutARKNtv&assets=btc&pretty=true&api_key=<your_key>').json()
print(response)
```
{% endtab %}

{% tab title="Python Client" %}
```python
from coinmetrics.api_client import CoinMetricsClient

api_key = "<API_KEY>"
client = CoinMetricsClient(api_key)

print(
    client.get_asset_metrics(
        metrics="FlowOutARKNtv", 
        assets="btc",
    ).to_dataframe()
)
```
{% endtab %}
{% endtabs %}
