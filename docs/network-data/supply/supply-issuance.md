# Contents

* [Coinbase Issuance](supply-issuance.md#isscontntv)
* [Annual Inflation Rate](supply-issuance.md#isscontpctann)
* [Daily Inflation Rate](supply-issuance.md#isscontpctday)
* [Coinbase Issuance](supply-issuance.md#isscont)
* [Total Issuance](supply-issuance.md#isstot)
* [Puel Multiple Total](supply-issuance.md#puellmultot)
* [Puell Multiple, Coinbase Issuance](supply-issuance.md#puelmulcont)

# Coinbase Issuance (native units)<a href="#isscontntv" id="isscontntv"></a>

## Definition

The sum of native units issued that day. Only those native units that are issued by a protocol-mandated continuous emission schedule are included.

| Name                             | MetricID   | Category | Subcategory | Type | Unit         | Interval |
| -------------------------------- | ---------- | -------- | ----------- | ---- | ------------ | -------- |
| Coinbase Issuance (native units) | IssContNtv | Supply   | Issuance    | Sum  | Native units | 1 day    |

## Details

* Most protocols have a fixed monetary policy that describes how many native units must be issued per block. This metric tracks those policies.
* It includes founders and community rewards if their amounts are predictable.

## Asset-Specific Details

* For XLM, the inflation process is considered continuous issuance as it is protocol mandated and predictable.

## Release Details

* Released in the 1.0 release of NDP

## Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/IssContNtv" %}

# Annual Inflation Rate<a href="#isscontpctann" id="isscontpctann"></a>

## Definition

The percentage of new native units (continuous) issued on that day, extrapolated to one year (i.e., multiplied by 365), and divided by the current supply on that day. Sometimes referred to as the annual inflation rate.

| Name                  | MetricID      | Category | Subcategory | Type       | Unit          | Interval |
| --------------------- | ------------- | -------- | ----------- | ---------- | ------------- | -------- |
| Annual Inflation Rate | IssContPctAnn | Supply   | Issuance    | Percentage | Dimensionless | 1 year   |

## Details

* This metric can be seen as the asset’s annualized inflation rate. Note that it only includes the predictable inflation, some other emission schedule could happen that would lead to this metric under-estimating the inflation.
* Computed as 100 \* IssContNtv \* 365 / SplyCur
* A value of 1.0 means that the asset’s supply will increase by 1% per year.
* This metric extrapolates the issuance rate from the current day’s issuance. It doesn’t take into account changes that will happen after the day of this metric’s computation like ETH unpredictable changes in monetary policy (no forward knowledge).

## Chart

<figure><img src="../../.gitbook/assets/Coin_Metrics_Network_Data_2022-09-16T14-00.png" alt=""><figcaption><p>Source: CM Network Data Charts</p></figcaption></figure>

## Asset-Specific Details

* For XLM, the inflation process is considered continuous issuance as it is protocol mandated and predictable.

## Release History

* Released in the 1.0 release of NDP

## Interpretation

While colloquially referred to as the inflation rate, this should be understood as supply inflation, not the conventional understanding of inflation as a decline in purchasing power driven by new supply. This metric might more appropriately be called the annualized issuance rate. Coins already existing in circulation but held in an encumbered state (like XRP being released from escrow) are not included in the measure as they are already incorporated in supply.

## See Also

* [Daily Inflation Rate](https://docs.coinmetrics.io/asset-metrics/supply/isscontpctday#details)

## Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/IssContPctAnn" %}

# Daily Inflation Rate<a href="#isscontpctday" id="isscontpctday"></a>

## Definition

The percentage of new native units (continuous) issued on that day divided by the current supply on that day. Also referred to as the daily inflation rate.

| Name                 | MetricID      | Category | Subcategory | Type       | Unit          | Interval |
| -------------------- | ------------- | -------- | ----------- | ---------- | ------------- | -------- |
| Daily Inflation Rate | IssContPctDay | Supply   | Issuance    | Percentage | Dimensionless | 1 day    |

## Details

* This metric can be seen as the asset’s daily inflation rate. Note that it only includes the predictable inflation, some other emission schedule could happen that would lead to this metric under-estimating the inflation.
* Computed as 100 \* IssContNtv / SplyCur
* Also equivalent to IssContPctAnn / 365
* A value of 1.0 means that the asset’s monetary policy is a 1% daily inflation.

## Chart

<figure><img src="../../.gitbook/assets/Coin_Metrics_Network_Data_2022-09-16T14-11.png" alt=""><figcaption><p>Source: CM Network Data Chart</p></figcaption></figure>

## Asset-Specific Details

* For XLM, the inflation process is considered continuous issuance as it is protocol mandated and predictable.

## Release History

* Released in the 1.0 release of NDP

## See Also

* [Annual Inflation Rate](https://docs.coinmetrics.io/asset-metrics/supply/isscontpctann?q=inflation)

## Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/IssContPctDay" %}

# Coinbase Issuance<a href="#isscont" id="isscont"></a>

## Definition

The sum of supply units issued that day. Only those native units that are issued by a protocol-mandated continuous emission schedule are included.

| Name                             | MetricID   | Category | Subcategory | Type | Unit         | Interval |
| -------------------------------- | ---------- | -------- | ----------- | ---- | ------------ | -------- |
| Coinbase Issuance (native units) | IssContNtv | Supply   | Issuance    | Sum  | Native units | 1 day    |
| Coinbase Issuance (USD) | IssContUSD | Supply   | Issuance    | Sum  | Native units | 1 day    |

## Details

* Most protocols have a fixed monetary policy that describes how many native units must be issued per block. This metric tracks those policies.
* It includes founders and community rewards if their amounts are predictable.

## Asset-Specific Details

* For XLM, the inflation process is considered continuous issuance as it is protocol mandated and predictable.

## Release Details

* Released in the 1.0 release of NDP

## Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/IssContNtv" %}
{% embed url="https://coverage.coinmetrics.io/asset-metrics/IssContUSD" %}

# Total Issuance<a href="#isstot" id="isstot"></a>

## Definition

The sum of all new supply units issued that day.

| Name                          | MetricID  | Category | Subcategory | Type | Unit         | Interval |
| ----------------------------- | --------- | -------- | ----------- | ---- | ------------ | -------- |
| Total Issuance (native units) | IssTotNtv | Supply   | Issuance    | Sum  | Native units | 1 day    |
| Total Issuance (nUSD) | IssTotUSD | Supply   | Issuance    | Sum  | Native units | 1 day    |

## Details

* In this metric, compared to the continuous one, all sources of issuance are taken into account.
* This metric is the gross issuance: if in the same day, 100 units are issued and 10 burned, this metric’s value will be 100, not 90 (which would be the net issuance).

## Release History

* Released in the 1.0 release of NDP

## Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/IssTotNtv" %}
{% embed url="https://coverage.coinmetrics.io/asset-metrics/IssTotUSD" %}

# Puell Multiple, Coinbase Issuance<a href="#puellmultot" id="puellmultot"></a>

## Definition

The ratio of the USD value of new issuance during the period to the 365-day moving average of the USD value of new issuance. Only those native units that are issued by a protocol-mandated continuous emission schedule are included (i.e., units manually released from escrow or otherwise disbursed are not included).

| Name                              | MetricID     | Category | Subcategory | Type  | Unit          | Interval |
| --------------------------------- | ------------ | -------- | ----------- | ----- | ------------- | -------- |
| Puell Multiple, Coinbase Issuance | PuellMulCont | Supply   | Issuance    | Ratio | Dimensionless | 365 days |

## Details

* Computed as IssContUSD/ma365(IssContUSD)

## Release History

* Release Version: NDP-EOD 4.8 (Nov, 2020)

## Interpretation

The Puell Multiple provides insight into market cycles from a mining revenue perspective. Because miners are sometimes considered compulsory sellers given their fixed costs (e.g., equipment, electricity), metric provides insight into the supply side of a cryptoasset's economy.   The idea being, that periods where the Puell Multiple is extremely low could be buying opportunities for investors, and periods where it is extremely high could indicate a profit-taking/selling opportunities.&#x20;

## See Also

* [Puell Multiple, Revenue](miner-revenue.md#puellmulrev)

## Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/PuellMulCont" %}

# Puell Multiple, Total Issuance<a href="#puellmultot" id="puellmultot"></a>

## Definition

The ratio of the USD value of all new issuance during the period to the 365-day moving average of the USD value of all new issuance.

| Name                           | MetricID    | Category | Subcategory | Type  | Unit          | Interval |
| ------------------------------ | ----------- | -------- | ----------- | ----- | ------------- | -------- |
| Puell Multiple, Total Issuance | PuellMulTot | Supply   | Issuance    | Ratio | Dimensionless | 365 days |

## Details

* Computed as IssTotUSD/ma365(IssTotUSD)
* Created by David Puell

## Release History

* Release Version: NDP-EOD 4.8 (Nov, 2020)

## Interpretation

The Puell Multiple provides insight into market cycles from a mining revenue perspective. Because miners are sometimes considered compulsory sellers given their fixed costs (e.g., equipment, electricity), this metric provides insight into the supply side of a cryptoasset's economy.   The idea being, that periods where the Puell Multiple is extremely low could be buying opportunities for investors, and periods where it is extremely high could indicate a profit-taking/selling opportunities.&#x20;

## See Also

* [Puell Multiple, Revenue](miner-revenue.md#puellmulrev)

## Availability for Assets

{% embed url="https://coverage.coinmetrics.io/asset-metrics/PuellMulTot" %}

# API Endpoints

Supply Issuance metrics can be accessed using these endpoints:

* `timeseries/asset-metrics`

and by passing in the metric ID's `Iss*` in the `metrics` parameter.

{% swagger src="../../.gitbook/assets/openapi.yaml" path="/timeseries/asset-metrics" method="get" %}
[openapi.yaml](../../.gitbook/assets/openapi.yaml)
{% endswagger %}

{% tabs %}
{% tab title="Shell" %}
```shell
curl --compressed "https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=IssContNtv&assets=btc&pretty=true&api_key=<your_key>"
```
{% endtab %}

{% tab title="Python" %}
```python
import requests
response = requests.get('https://api.coinmetrics.io/v4/timeseries/asset-metrics?metrics=IssContNtv&assets=btc&pretty=true&api_key=<your_key>').json()
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
        metrics="IssContNtv", 
        assets="btc",
    ).to_dataframe()
)
```
{% endtab %}
{% endtabs %}
