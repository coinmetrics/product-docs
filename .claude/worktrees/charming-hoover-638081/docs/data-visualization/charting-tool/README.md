---
description: https://charts.coinmetrics.io/network-data/
---

# Charting Tool

## Selecting a Data Series

The Charting Tool allows you to easily visualize our [Asset Metrics](https://coverage.coinmetrics.io/asset-metrics-v2). Simply select the "Add" button from the top left selection dialogs.

<figure><img src="../../.gitbook/assets/Screenshot 2024-07-02 at 7.29.03 PM.png" alt=""><figcaption></figcaption></figure>

Upon clicking the "Add" button, the Assets dialog will open to display the available assets. Assets can be searched by category or by typing the symbol or name into the "Asset Name or ID..." search window.

Once you've made your asset selection, you can click on the "Proceed to Metrics" button, which will open the Metrics dialog to display the metrics available for the selected assets.

Instead of selecting the assets first, you can also select the "Start With Metrics" button in the bottom left of the dialog window and the list of all available metrics will be shown.

<figure><img src="../../.gitbook/assets/Screenshot 2024-07-02 at 7.33.27 PM.png" alt=""><figcaption></figcaption></figure>

If "Start With Metrics" was selected, navigate back to select assets by selecting the "Back To Assets" button in the bottom left.

<figure><img src="../../.gitbook/assets/Screenshot 2024-07-02 at 7.35.14 PM.png" alt=""><figcaption></figcaption></figure>

The metric will be displayed in black will be "selectable" if it is available for all selected asset. Metrics that are not available for all of the assets selected will be hidden and will not be shown.

Metrics or Assets that are not available with API key entered will show a lock symbol.

![](<../../.gitbook/assets/Screen Shot 2021-03-09 at 8.54.58 PM.png>)

The metric definition can be expanded via the "question symbol" to the right of the metric name as shown below. To collapse it, click the "up arrow".

![](<../../.gitbook/assets/Screen Shot 2021-03-09 at 8.57.53 PM.png>)

Once all desired assets and metrics have been selected, continue by selecting the "+ Add to Chart" button in the bottom right of the dialog.

<figure><img src="../../.gitbook/assets/Screenshot 2024-07-02 at 7.38.53 PM.png" alt=""><figcaption></figcaption></figure>

You will then see the selected asset-metric pairs plotted in the charting tool as well as the selected combinations at the top of the chart. Additional items can be shown by selecting the down arrow next to the row of asset-metric pairs.

<figure><img src="../../.gitbook/assets/Screenshot 2024-07-02 at 7.39.17 PM.png" alt=""><figcaption></figcaption></figure>

Grayed out items are hidden from the plotted chart. Select an item to show/hide that asset-metric combination. To remove an item from the chart completely, click the "X" in each item to remove it.

<figure><img src="../../.gitbook/assets/Screenshot 2024-07-02 at 7.39.34 PM.png" alt=""><figcaption></figcaption></figure>

## Handling of Data Gaps

On occasion, you may want to compare a continuous data series with one with gaps (such as when you compare cryptoasset returns with a traditional index like S\&P500 that has no values on the weekends or holidays). The tool gives you two options for handling this:

* Linearly interpolate the data to derive a value for the data gap prior to calculating the returns
* Exclude the observations on the dates where one data series has a gap, but the other doesn't prior to calculating the returns (note: this results in fewer observations for the non-gapped series)

The tool will default to "excluding" data where gaps are identified. You can adjust this setting from the settings menu on the right toolbar.

![Click on the "gear" to find the settings for Data Gaps](<../../.gitbook/assets/Screen Shot 2020-12-19 at 4.48.10 PM.png>)

## **Charting Tool Tutorial Series**

_Please note: the below tutorial series utilizes the legacy layout for asset-metric selections. While slightly different the core functionality is the same across the two._

### **Part 1 - Tool Basics**

In the first segment of our tutorial series, we explore the basic features and functions you'll need to get started with our Network Data visualization tool.

[**Charting Tool Tutorial Series - Part 1**](https://5264302.fs1.hubspotusercontent-na1.net/hubfs/5264302/Charting%20Tool%20Demo%20\(Part%201\)%20-%20Tool%20Basics.mp4)

### **Part 2 - Assets & Metrics**

The second segment of the series explores the wide array of assets and metrics available in the Coin Metrics coverage universe, and demonstrates the variety of charting tool settings that can be used to visualize this data.

[**Charting Tool Tutorial Series - Part 2**](https://5264302.fs1.hubspotusercontent-na1.net/hubfs/5264302/Charting%20Tool%20Demo%20\(Part%202\)%20-%20Assets%20&%20Metrics.mp4)
