# Catalog V1 to Catalog V2 Migration

Coin Metrics would like to provide advance notice for an upcoming change to the catalog endpoints in our API. While these changes have been designed with backwards compatibility in mind, the change can lead to a breaking change in functionality for users that rely on the catalog endpoints to query historical option markets.

We are also announcing the upcoming release of a new set of catalog v2 and reference data endpoints which incorporate a significant number of enhancements that utilize a harmonious and consistent design. We hope these changes will allow our users to more easily understand all the data that Coin Metrics offers!

## Why are we making this change?

Our catalog endpoints describe our coverage universe and the time range of the data that we support. For instance, our /catalog/markets describes the available spot, futures, and options markets. We currently support over 150,000 markets of which over 110,000 markets are option markets.

On a typical day, more than 100 new option markets are added as old option markets expire and new option markets are listed with a variety of strike prices and expiration dates. Over time, this has caused certain of our catalog endpoints to have large response sizes, and the response sizes will continue to increase. Our /catalog/markets response size is currently 110 megabytes.

As our catalog endpoints have evolved over time, we have also detected minor inconsistencies in the schema of our catalog endpoint responses. Some catalog endpoints contain only the time availability of the available data while other catalog endpoints contain only reference data about the entities in our coverage universe. And some catalog endpoints contain a mixture of the two.

To deal with the problem of large response sizes and the schema inconsistencies, Coin Metrics plans on limiting the response size of existing catalog endpoints and introducing a new set of catalog v2 and reference data endpoints with an internally consistent schema to serve as a replacement.

## Which existing catalog endpoints will be affected?

The response size limit changes will affect the following endpoints:

* /catalog/markets&#x20;
* /catalog/market-trades&#x20;
* /catalog/market-candles&#x20;
* /catalog/market-orderbooks
* &#x20;/catalog/market-quotes&#x20;
* /catalog/market-funding-rates&#x20;
* /catalog/market-contract-prices&#x20;
* /catalog/market-implied-volatility&#x20;
* /catalog/market-greeks&#x20;
* /catalog/market-openinterest&#x20;
* /catalog/market-liquidations
* &#x20;/catalog/market-metrics

The /catalog-all version of the above endpoints will also be affected. We will refer to endpoints identified in this section as the “affected catalog endpoints” below.

How will the response size be limited for the affected catalog endpoints?

The affected catalog endpoints will retain their existing functionality until the number of markets in the response exceeds 170,000. After the number of markets exceed this number, the response will begin to exclude the oldest option markets. The newest spot, futures, and option markets will still be included in the response. We expect the number of markets to exceed this threshold on about October 6, 2023.

This change will result in a breaking change if a user relies on the catalog endpoints to query historical option markets. For this reason, we encourage all users to switch to our new catalog v2 and reference data endpoints as soon as possible which are described in the sections below.

What data will be returned by the new catalog v2 and reference data endpoints?

Our existing catalog endpoints contain a mixture of both reference data and time availability data with inconsistent response schema. To resolve this inconsistency, Coin Metrics is introducing a new set of catalog v2 and reference data endpoints with an internally consistent schema.

Coin Metrics considers time availability data to be the time range of the timeseries we support and reference data to be metadata about all the entities in our coverage universe. Under our new design, our catalog v2 endpoints will solely contain time availability data and our reference data endpoints will contain solely our reference data.

Let us examine the response from our /catalog-v2/asset-metrics as an example:

```
{
  "data": [
    {
      "asset": "btc",
      "metrics": [
        {
          "metric": "PriceUSD",
          "frequencies": [
            {
              "frequency": "1d",
              "min_time": "2010-07-18T00:00:00.000000000Z",
              "max_time": "2023-07-09T00:00:00.000000000Z"
            },
            {
              "frequency": "1b",
              "min_time": "2009-01-03T18:15:05.000000000Z",
              "max_time": "2023-07-10T21:51:32.000000000Z"
            }
          ]
        }
      ]
    }
  ]
}
```

The /catalog-v2/asset-metrics endpoint describes the time availability for the PriceUSD metric for our btc asset. It describes the two frequencies we offer for this metric as well as the time range of the available data for each frequency.

Now let us examine the response from our /reference-data/asset-metrics endpoint:

```
{
  "data": [
    {
      "metric": "PriceUSD",
      "full_name": "Price, USD",
      "description": "The fixed closing price of the asset as of 00:00 UTC the following day (i.e., midnight UTC of the current day) denominated in USD. This price is generated by Coin Metrics' fixing/reference rate service. Real-time PriceUSD is the fixed closing price of the asset as of the timestamp set by the block's miner.",
      "product": "Network Data",
      "category": "Market",
      "subcategory": "Price",
      "unit": "USD",
      "data_type": "decimal",
      "type": "NA",
      "display_name": "USD Denominated Closing Price"
    }
  ]
}
```

The /reference-data/asset-metrics endpoint describes the metadata for the PriceUSD metric such as the full name and description. It does not contain data about the time availability of the metric by asset.

All of our catalog v2 and reference data endpoints will follow a similar schema. All of our catalog v2 and reference data endpoints will support pagination in a manner identical to our /timeseries endpoints. These new endpoints will support a page\_size parameter with default value of 10,000. This means the response will by default contain the first 10,000 observations. To get the next set of 10,000 observations, the user should use the next\_page\_url to fetch the next page of results.

## I currently use one of the existing catalog endpoints. How do I switch to the new catalog v2 and reference data endpoints?

We have created a mapping of how existing catalog endpoints will map to our new endpoints [here](../tutorials-and-guides/user-guides/how-to-migrate-from-catalog-v1-to-catalog-v2.md). The new endpoints should contain the same data as the existing catalog endpoint.

If you have any questions or have any use cases that may be adversely impacted by this change, please contact us.
