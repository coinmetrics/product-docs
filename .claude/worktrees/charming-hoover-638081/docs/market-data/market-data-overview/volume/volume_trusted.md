# Trusted Volume

## Overview

The sum of all volume from the spot markets of a set of trusted exchanges in U.S. dollars. These metrics are available for assets and pairs.

Fake trading volume is a persistent problem on crypto exchanges. With little regulatory oversight, it can be difficult to determine whether reported volume numbers are accurate or exaggerated. At Coin Metrics, we’ve taken a data driven approach to the problem and offer a trusted volume metric, derived from the [Trusted Exchange Framework](https://coinmetrics.io/special-insights/trusted-exchange-framework), to help identify legitimate trading volume. Our trusted volume metric is an aggregation of the reported volume from exchanges that we consider the most accurate and trustworthy. This is based on a combination of both quantitative and qualitative features.&#x20;

## Metrics

<table data-full-width="true"><thead><tr><th>Metric</th><th>Description</th><th width="100">Frequency</th><th width="100">Coverage</th></tr></thead><tbody><tr><td><code>volume_trusted_spot_usd_1d</code></td><td>The sum of all volume from the spot markets of a set of trusted exchanges in units of U.S. dollars.</td><td>1d</td><td><a href="https://coverage.coinmetrics.io/search-results?query=volume_trusted_spot_usd_1d">🔗</a></td></tr><tr><td><code>volume_trusted_spot_usd_1h</code></td><td>The sum of all volume from the spot markets of a set of trusted exchanges in units of U.S. dollars.</td><td>1h</td><td><a href="https://coverage.coinmetrics.io/search-results?query=volume_trusted_spot_usd_1h">🔗</a></td></tr></tbody></table>

## Data Sources and Methodology

The input data source for the trusted volume metrics are trades collected from exchanges that we consider the most accurate and trustworthy. The full list of constituent exchanges included in our Trusted Volume can be found [here](https://coinmetrics.io/special-insights/trusted-exchange-framework). The trade amounts are converted to U.S. dollars and summed over the interval defined in the metric name.

Let us define the following notation:

* $$i$$: index of an individual trade
* $$t_i$$: timestamp of trade $$i$$
* $$Q_i$$: quantity in contract-units of trade $$i$$
* $$\mathrm{ReferenceRate}_{\mathrm{base}}(t_i)$$: price of one unit of the base asset at time $$t_i$$
* $$\mathcal{I}_{\mathrm{spot,trusted}}(T)$$: set of spot trades in period $$T$$ from trusted exchanges

The reported spot volume metrics `volume_trusted_spot_*`  are defined as:&#x20;

$$
\mathrm{VolumeTrustedSpot}(T)
\;=\;
\sum_{i \,\in\, \mathcal{I_{spot,trusted}}(T)}
Q_i
\;\times\;
\mathrm{ReferenceRate_{base}}(t_i)
$$

Coin Metrics calculates these metrics for various entities: assets, exchanges, exchange-assets, and pairs. For each entity, the markets used as input in the calculation differ. The entity defines a set of markets that are used in the calculation. The metric description further filters to a specific subset of markets as defined in the metric description.

* For **assets**, the markets included are any market where the asset is either the base asset or quote asset and match the markets in the metric description.
* For **pairs**, the markets included are any market across all exchanges that contain the pair and match the markets in the metric description.

## Coverage

{% embed url="https://coverage.coinmetrics.io/search-results?query=volume_trusted_%2A" %}

## API Endpoints

The metrics are served through the following endpoints:

* [/timeseries/asset-metrics](https://docs.coinmetrics.io/api/v4/#tag/Timeseries/operation/getTimeseriesAssetMetrics)
* [/timeseries/pair-metrics](https://docs.coinmetrics.io/api/v4/#tag/Timeseries/operation/getTimeseriesPairMetrics)

## Examples

#### Example for Asset Metrics

A sample of the `volume_trusted_spot_usd_1d` metric for the asset `btc` from our `/timeseries/asset-metrics` API endpoint is provided below. You can view this example in your browser [here](https://api.coinmetrics.io/v4/timeseries/asset-metrics?assets=btc\&metrics=volume_trusted_spot_usd_1d\&limit_per_asset=3\&api_key=YOUR_API_KEY).

```json
[
  {
    "asset": "btc",
    "time": "2025-04-29T00:00:00.000000000Z",
    "volume_trusted_spot_usd_1d": "9116127030.72694"
  },
  {
    "asset": "btc",
    "time": "2025-04-30T00:00:00.000000000Z",
    "volume_trusted_spot_usd_1d": "10113171473.0258"
  },
  {
    "asset": "btc",
    "time": "2025-05-01T00:00:00.000000000Z",
    "volume_trusted_spot_usd_1d": "11408714338.2257"
  }
]
```

#### Example for Pair Metrics

A sample of the `volume_trusted_spot_usd_1d` metric for the pair `btc-usd` from our `/timeseries/pair-metrics` API endpoint is provided below. You can view this example in your browser [here](https://api.coinmetrics.io/v4/timeseries/pair-metrics?pairs=btc-usd\&metrics=volume_trusted_spot_usd_1d\&limit_per_pair=3\&api_key=YOUR_API_KEY).

```json
[
  {
    "pair": "btc-usd",
    "time": "2025-04-29T00:00:00.000000000Z",
    "volume_trusted_spot_usd_1d": "1655838700.58862"
  },
  {
    "pair": "btc-usd",
    "time": "2025-04-30T00:00:00.000000000Z",
    "volume_trusted_spot_usd_1d": "2077481898.04856"
  },
  {
    "pair": "btc-usd",
    "time": "2025-05-01T00:00:00.000000000Z",
    "volume_trusted_spot_usd_1d": "2334258095.40682"
  }
]
```
