# How to use the Coin Metrics API Efficiently (HTTP)

Please follow these rules to use API most efficiently and get the best API performance. Note that some of these are auto

The rules are sorted in the priority order. The first ones make the biggest impact.

* Ensure that your HTTP client sends the proper request headers to enable HTTP compression. Your HTTP request should have an "Accept-Encoding: gzip" header.&#x20;
* Use the line-delimited JSON format (format=json\_stream) if it's supported by an API endpoint (check API docs) instead of the default format=json. That format allows you to avoid paging so you can quickly request all data using only one HTTP request without facing page\_size limitations (10k elements per page) and related difficulties.
* If you have to use the format=json (default value), strive to use the paging\_from=start query parameter instead of paging\_from=end (default value). It always produces faster responses.
* Instead of sending individual requests for different entities, combine them in a single request using commas. For example, assets=btc,eth\&metrics=ReferenceRateUSD,ReferenceRateEUR.
* Strive to use limit\_per\_\<entity> query parameters if you want to fetch recent metric values for multiple entities (for example, assets, markets, indexes) at the same time. For example, if you want to request recent reference rates for a set of assets, use the following request: https://api.coinmetrics.io/v4/timeseries/asset-metrics?assets=btc,eth\&frequency=1m\&metrics=ReferenceRates\&limit\_per\_asset=1\&page\_size=2\&api\_key=\<key>. Note that page\_size must be greater or equal to the number of requested entities (assets) multiplied by limit\_per\_\<entity> value.
* Specify start\_time and end\_time query parameters instead of relying on their default values to narrow your results and improve API performance.
* Avoid the sort=time query parameter since it provides worse performance than default sorting.
* Avoid setting the granularity query parameter to any value other than "raw" (default). That parameter enables API-level downsampling of the raw data which is slow by design and, in some cases, can lead to a 524 timeout from Cloudflare.
* Avoid the pretty=true query parameter in production code because it's always slower than pretty=false (default value).
