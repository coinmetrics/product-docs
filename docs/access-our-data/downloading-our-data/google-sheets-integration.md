# Google Sheets Integration

## Importing Coin Metrics Data to Google Sheets

Where our Coin Metrics API includes a csv format option data can be directly loaded into google sheets.&#x20;

To do this input you API call into the `=IMPORTDATA()`  formula.&#x20;

Below is an example Once included there is warning that requires you to allow access: steps for setting this up yourself

1. Open a new google sheet
2. Add API Parameters to cells in columns A and add results to column B
   1. Example using time series asset-metrics endpoint

| A           | B                    |
| ----------- | -------------------- |
| API KEY     | {API\_KEY}           |
| ASSETS      | btc                  |
| METRICS     | PriceUSD             |
| PAGE SIZE   | 1000                 |
| START TIME  | 2025-01-01T00:00:00Z |
| END TIME    | 2025-01-31T00:00:00Z |
| PAGING FROM | end                  |
| FREQUENCY   | 1d                   |



3. Leverage this formula for creating your API Query

<pre><code>= "https://api.coinmetrics.io/v4/timeseries/asset-metrics?" &#x26;
"api_key="&#x26; B1 &#x26;
"&#x26;assets=" &#x26; B2 &#x26;
"&#x26;metrics=" &#x26; B3 &#x26;
"&#x26;page_size=" &#x26; B4 &#x26;
"&#x26;start_time=" &#x26; B5 &#x26;
"&#x26;end_time=" &#x26; B6 &#x26;
"&#x26;paging_from=" &#x26; B7 &#x26;
"&#x26;frequency=" &#x26; B8 &#x26;
"&#x26;format=csv"

<strong>
</strong>
</code></pre>

4. In a new cell enter: `=IMPORTDATA({Cell with API Call})`&#x20;

At this point you will see a warning where you need to allow access for the API Call

<figure><img src="../../.gitbook/assets/Screenshot 2025-12-05 at 10.42.13 AM.png" alt=""><figcaption></figcaption></figure>



Example results:

<figure><img src="../../.gitbook/assets/Screenshot 2025-12-05 at 10.47.02 AM.png" alt=""><figcaption></figcaption></figure>
