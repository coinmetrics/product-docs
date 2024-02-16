# Contents
* [1 Year Active Supply Velocity](#velactadj1yr)
* [1 Year Active Supply Velocity, Adj](#velactadj1yr)
* [1 Year Current Supply Velocity](#velcur1yr)
* [1 Year Current Supply Velocity, Adj](#velcuradj1yr)

# 1 Year Active Supply Velocity <a href="#VelAct1yr" id="VelAct1yr"></a>

## Definition

The ratio of the value transferred (i.e., the aggregate "size" of all transfers) in the trailing 1 year divided by active supply in the trailing 1 year. It can be thought of as a rate of turnover -- the number of times that an average native unit among the active supply has been transferred in the past 1 year.

| Name                          | MetricID  | Category     | Subcategory | Type  | Unit          | Interval |
| ----------------------------- | --------- | ------------ | ----------- | ----- | ------------- | -------- |
| 1 Year Active Supply Velocity | VelAct1yr | Transactions | Velocity    | Ratio | Dimensionless | 1 year   |

## Release History

* Released in the 1.0 release of NDP

## Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/VelAct1yr" %}

# 1 Year Active Supply Velocity, Adj <a href="#velactadj1yr" id="velactadj1yr"></a>

## Definition

The ratio of the adjusted value transferred (i.e., the aggregate "size" of all transfers) in the trailing 1 year divided by active supply in the trailing 1 year. It can be thought of as a rate of turnover -- the number of times that an average native unit among the active supply has been transferred in the past 1 year.

| Name                               | NameID       | Category     | Subcategory | Type  | Unit          | Interval |
| ---------------------------------- | ------------ | ------------ | ----------- | ----- | ------------- | -------- |
| 1 Year Active Supply Velocity, Adj | VelActAdj1yr | Transactions | Velocity    | Ratio | Dimensionless | 1 year   |

## Release History

* Released in the 1.0 release of NDP

## Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/VelActAdj1yr" %}

# 1 Year Current Supply Velocity <a href="#velcur1yr" id="velcur1yr"></a>

## Definition

The ratio of the value transferred (i.e., the aggregate "size" of all transfers) in the trailing 1 year divided by the current supply on that day. It can be thought of as a rate of turnover -- the number of times that an average native unit has been transferred in the past 1 year.

| Name                           | MetricID  | Category     | Subcategory | Type  | Unit          | Interval |
| ------------------------------ | --------- | ------------ | ----------- | ----- | ------------- | -------- |
| 1 Year Current Supply Velocity | VelCur1yr | Transactions | Velocity    | Ratio | Dimensionless | 1 year   |

## Details

* [Xfer'd Value (native units)](txtfrvalntv.md) for trailing 1 year / [Current Supply (native units)](../supply/splycur.md)

## Release History

* Released in the 1.0 release of NDP

## Interpretation

Velocity​ is a measurement of the rate at which an asset is exchanged. It can be thought of as a rate of turnover, or, in other words, the number of times that an average unit of an asset has been transferred within the last year. Our Adjusted Velocity metric removes noise and other artifacts from the transfer value in the numerator.

## Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/VelCur1yr" %}

# 1 Year Current Supply Velocity, Adj <a href="#velcuradj1yr" id="velcuradj1yr"></a>

## Definition

The ratio of the adjusted value transferred (i.e., the aggregate "size" of all transfers) in the trailing 1 year divided by the current supply on that day. It can be thought of as a rate of turnover -- the number of times that an average native unit has been transferred in the past 1 year.

| Name                                | MetricID     | Category     | Subcategory | Type  | Unit          | Interval |
| ----------------------------------- | ------------ | ------------ | ----------- | ----- | ------------- | -------- |
| 1 Year Current Supply Velocity, Adj | VelCurAdj1yr | Transactions | Velocity    | Ratio | Dimensionless | 1 year   |

## Details

* [Xfer'd Val, Adj (native units)](txtfrvaladjntv.md) for trailing 1 year / [Current Supply (native units)](../supply/splycur.md)

## Chart

![https://charts.coinmetrics.io/network-data/#576](../../.gitbook/assets/Velocity\_1\_Yr,\_Adjusted.png)

## Release History

* Released in the 1.0 release of NDP

## Interpretation

Velocity​ is a measurement of the rate at which an asset is exchanged. It can be thought of as a rate of turnover, or, in other words, the number of times that an average unit of an asset has been transferred within the last year. In the above chart, we calculate velocity by dividing BTC’s adjusted transfer value over the past year (which is the total amount of cryptoasset transferred) by BTC’s total supply. Historically BTC’s velocity has increased during a rising bull cycle as on-chain activity increases, and has dipped following both the 2013 and 2017 price peaks. If velocity starts to slow dramatically, it could be read as a sign that the bull phase is reaching its end.

## See Also

* [1 Year Current Supply Velocity](velcur1yr.md)

## Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/VelCurAdj1yr" %}

# API Endpoints

Token Transaction metrics can be accessed using these endpoints:

* `timeseries/asset-metrics` 

and by passing in the metric ID's `VelAct1yr`, `VelActAdj1yr`, etc. in the `metrics` parameter.

{% swagger src="../../.gitbook/assets/openapi.yaml" path="/timeseries/asset-metrics" method="get" %}
[openapi.yaml](../../.gitbook/assets/openapi.yaml)
{% endswagger %}

{% tabs %}
{% tab title="Shell" %}
```shell
curl --compressed "https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=VelAct1yr&assets=btc&pretty=true&api_key=<your_key>"
```
{% endtab %}

{% tab title="Python" %}
```python
import requests
response = requests.get('https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=VelAct1yr&assets=btc&pretty=true&api_key=<your_key>').json()
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
        metrics="VelAct1yr", 
        assets="eth",
    ).to_dataframe()
)
```
{% endtab %}
{% endtabs %}