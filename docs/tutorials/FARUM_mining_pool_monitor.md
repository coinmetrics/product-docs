# FARUM Mining Pool Monitor

Coin Metrics **FARUM** suite can be used for a variety of risk management applications.

## Resources
This notebook demonstrates basic functionality offered by the Coin Metrics Python API Client and FARUM.

Coin Metrics offers a vast assortment of data for hundreds of cryptoassets. The Python API Client allows for easy access to this data using Python without needing to create your own wrappers using `requests` and other such libraries.

To understand the data that Coin Metrics offers, feel free to peruse the resources below.

- The [Coin Metrics API v4](https://docs.coinmetrics.io/api/v4) website contains the full set of endpoints and data offered by Coin Metrics.
- The [Coin Metrics Knowledge Base](https://docs.coinmetrics.io/info) gives detailed, conceptual explanations of the data that Coin Metrics offers.
- The [API Spec](https://coinmetrics.github.io/api-client-python/site/api_client.html) contains a full list of functions.

### Notebook Setup


```python
from os import environ
import sys
import pandas as pd
import numpy as np
import logging
from datetime import date, datetime, timedelta
from coinmetrics.api_client import CoinMetricsClient
import json
import logging
from pytz import timezone as timezone_conv
from datetime import timezone as timezone_info
import matplotlib.dates as mdates
import matplotlib.pyplot as plt
from matplotlib.ticker import MaxNLocator
import ast
%matplotlib inline
import seaborn as sns
import plotly.express as px
import warnings
warnings.filterwarnings("ignore")
```


```python
sns.set(rc={'figure.figsize':(14,8)})
sns.set_theme(style='white')
```


```python
# We recommend privately storing your API key in your local environment.
try:
    api_key = environ["CM_API_KEY"]
    logging.info("Using API key found in environment")
except KeyError:
    api_key = ""
    logging.info("API key not found. Using community client")

client = CoinMetricsClient(api_key)
```

## Retrieve Mining Pool Tips


```python
start = '2023-03-18T01:29:00'
end = '2023-03-18T02:05:00'
```


```python
# Example API call
df = client.get_mining_pool_tips_summary(
    assets='btc',
    start_time = start,
    end_time = end
).to_dataframe()
```


```python
df
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>asset</th>
      <th>time</th>
      <th>tips_count</th>
      <th>block_hashes_at_tip</th>
      <th>tips</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>btc</td>
      <td>2023-03-18 01:29:16.088158+00:00</td>
      <td>2</td>
      <td>2</td>
      <td>[{'last_time': '2023-03-18T01:14:19.580027000Z...</td>
    </tr>
    <tr>
      <th>1</th>
      <td>btc</td>
      <td>2023-03-18 01:29:16.113903+00:00</td>
      <td>2</td>
      <td>2</td>
      <td>[{'last_time': '2023-03-18T01:14:19.585915000Z...</td>
    </tr>
    <tr>
      <th>2</th>
      <td>btc</td>
      <td>2023-03-18 01:29:16.128344+00:00</td>
      <td>2</td>
      <td>1</td>
      <td>[{'last_time': '2023-03-18T01:14:19.585915000Z...</td>
    </tr>
    <tr>
      <th>3</th>
      <td>btc</td>
      <td>2023-03-18 01:29:16.133120+00:00</td>
      <td>2</td>
      <td>2</td>
      <td>[{'last_time': '2023-03-18T01:14:19.585915000Z...</td>
    </tr>
    <tr>
      <th>4</th>
      <td>btc</td>
      <td>2023-03-18 01:29:16.133716+00:00</td>
      <td>3</td>
      <td>1</td>
      <td>[{'last_time': '2023-03-18T01:14:19.580027000Z...</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>102</th>
      <td>btc</td>
      <td>2023-03-18 02:03:48.563545+00:00</td>
      <td>2</td>
      <td>1</td>
      <td>[{'last_time': '2023-03-18T02:03:48.113199000Z...</td>
    </tr>
    <tr>
      <th>103</th>
      <td>btc</td>
      <td>2023-03-18 02:03:48.731747+00:00</td>
      <td>1</td>
      <td>1</td>
      <td>[{'last_time': '2023-03-18T02:03:48.731747000Z...</td>
    </tr>
    <tr>
      <th>104</th>
      <td>btc</td>
      <td>2023-03-18 02:03:49.231875+00:00</td>
      <td>3</td>
      <td>1</td>
      <td>[{'last_time': '2023-03-18T02:03:48.111833000Z...</td>
    </tr>
    <tr>
      <th>105</th>
      <td>btc</td>
      <td>2023-03-18 02:03:49.232056+00:00</td>
      <td>2</td>
      <td>1</td>
      <td>[{'last_time': '2023-03-18T02:03:48.111833000Z...</td>
    </tr>
    <tr>
      <th>106</th>
      <td>btc</td>
      <td>2023-03-18 02:03:50.136746+00:00</td>
      <td>1</td>
      <td>1</td>
      <td>[{'last_time': '2023-03-18T02:03:50.136746000Z...</td>
    </tr>
  </tbody>
</table>
<p>107 rows × 5 columns</p>
</div>




```python
df_raw_tips = df
```


```python
# Convert the 'time' column into datetime objects
df_raw_tips['time'] = pd.to_datetime(df_raw_tips['time'])

# Define a function to extract the relevant data from the 'tips' column
def extract_tip_data(tip_str):
    # Load the string as a JSON object
    tip_data = json.loads(tip_str.replace("'", "\""))
    
    # Initialize the structure to hold the extracted data
    extracted_data = {
        'heights': [],
        'pool_counts': []
    }
    
    # Loop over each tip in the data and extract the height and pool_count
    for tip in tip_data:
        extracted_data['heights'].append(int(tip['height']))
        extracted_data['pool_counts'].append(int(tip['pool_count']))
    
    return extracted_data

# Apply the function to each entry in the 'tips' column and create a new DataFrame from the extracted data
df_tips_extracted = df_raw_tips['tips'].apply(extract_tip_data).apply(pd.Series)

# Combine the new DataFrame with the original one
df_combined = pd.concat([df_raw_tips, df_tips_extracted], axis=1)
df_combined.drop('tips', axis=1, inplace=True)
```


```python
df_combined
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>asset</th>
      <th>time</th>
      <th>tips_count</th>
      <th>block_hashes_at_tip</th>
      <th>heights</th>
      <th>pool_counts</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>btc</td>
      <td>2023-03-18 01:29:16.088158+00:00</td>
      <td>2</td>
      <td>2</td>
      <td>[781275, 781275]</td>
      <td>[8, 1]</td>
    </tr>
    <tr>
      <th>1</th>
      <td>btc</td>
      <td>2023-03-18 01:29:16.113903+00:00</td>
      <td>2</td>
      <td>2</td>
      <td>[781275, 781275]</td>
      <td>[8, 1]</td>
    </tr>
    <tr>
      <th>2</th>
      <td>btc</td>
      <td>2023-03-18 01:29:16.128344+00:00</td>
      <td>2</td>
      <td>1</td>
      <td>[781275, 781276]</td>
      <td>[8, 1]</td>
    </tr>
    <tr>
      <th>3</th>
      <td>btc</td>
      <td>2023-03-18 01:29:16.133120+00:00</td>
      <td>2</td>
      <td>2</td>
      <td>[781275, 781275]</td>
      <td>[8, 1]</td>
    </tr>
    <tr>
      <th>4</th>
      <td>btc</td>
      <td>2023-03-18 01:29:16.133716+00:00</td>
      <td>3</td>
      <td>1</td>
      <td>[781275, 781275, 781276]</td>
      <td>[7, 1, 1]</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>102</th>
      <td>btc</td>
      <td>2023-03-18 02:03:48.563545+00:00</td>
      <td>2</td>
      <td>1</td>
      <td>[781278, 781279]</td>
      <td>[1, 8]</td>
    </tr>
    <tr>
      <th>103</th>
      <td>btc</td>
      <td>2023-03-18 02:03:48.731747+00:00</td>
      <td>1</td>
      <td>1</td>
      <td>[781279]</td>
      <td>[9]</td>
    </tr>
    <tr>
      <th>104</th>
      <td>btc</td>
      <td>2023-03-18 02:03:49.231875+00:00</td>
      <td>3</td>
      <td>1</td>
      <td>[781278, 781278, 781279]</td>
      <td>[1, 1, 7]</td>
    </tr>
    <tr>
      <th>105</th>
      <td>btc</td>
      <td>2023-03-18 02:03:49.232056+00:00</td>
      <td>2</td>
      <td>1</td>
      <td>[781278, 781279]</td>
      <td>[1, 8]</td>
    </tr>
    <tr>
      <th>106</th>
      <td>btc</td>
      <td>2023-03-18 02:03:50.136746+00:00</td>
      <td>1</td>
      <td>1</td>
      <td>[781279]</td>
      <td>[9]</td>
    </tr>
  </tbody>
</table>
<p>107 rows × 6 columns</p>
</div>




```python
df = df_combined[['time','tips_count','pool_counts']]
```


```python
# Create a new DataFrame to hold the expanded 'pool_counts' values
expanded_df = df['pool_counts'].apply(pd.Series)
# Join the new columns with 'time' column to keep track of the time for each pool count
expanded_df = expanded_df.join(df['time'])
expanded_df = expanded_df.set_index('time').fillna(0)
expanded_df
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>0</th>
      <th>1</th>
      <th>2</th>
    </tr>
    <tr>
      <th>time</th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2023-03-18 01:29:16.088158+00:00</th>
      <td>8.0</td>
      <td>1.0</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>2023-03-18 01:29:16.113903+00:00</th>
      <td>8.0</td>
      <td>1.0</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>2023-03-18 01:29:16.128344+00:00</th>
      <td>8.0</td>
      <td>1.0</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>2023-03-18 01:29:16.133120+00:00</th>
      <td>8.0</td>
      <td>1.0</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>2023-03-18 01:29:16.133716+00:00</th>
      <td>7.0</td>
      <td>1.0</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>2023-03-18 02:03:48.563545+00:00</th>
      <td>1.0</td>
      <td>8.0</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>2023-03-18 02:03:48.731747+00:00</th>
      <td>9.0</td>
      <td>0.0</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>2023-03-18 02:03:49.231875+00:00</th>
      <td>1.0</td>
      <td>1.0</td>
      <td>7.0</td>
    </tr>
    <tr>
      <th>2023-03-18 02:03:49.232056+00:00</th>
      <td>1.0</td>
      <td>8.0</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>2023-03-18 02:03:50.136746+00:00</th>
      <td>9.0</td>
      <td>0.0</td>
      <td>0.0</td>
    </tr>
  </tbody>
</table>
<p>107 rows × 3 columns</p>
</div>




```python
# Sort pool counts by size
expanded_df = expanded_df.apply(lambda x: pd.Series(sorted(x, reverse=True)), axis=1)
expanded_df = expanded_df.reset_index()
expanded_df['time'] = pd.to_datetime(expanded_df['time'], format='%Y-%m-%d %H:%M:%S.%f')
expanded_df.set_index('time', inplace=True)
expanded_df
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>0</th>
      <th>1</th>
      <th>2</th>
    </tr>
    <tr>
      <th>time</th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2023-03-18 01:29:16.088158+00:00</th>
      <td>8.0</td>
      <td>1.0</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>2023-03-18 01:29:16.113903+00:00</th>
      <td>8.0</td>
      <td>1.0</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>2023-03-18 01:29:16.128344+00:00</th>
      <td>8.0</td>
      <td>1.0</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>2023-03-18 01:29:16.133120+00:00</th>
      <td>8.0</td>
      <td>1.0</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>2023-03-18 01:29:16.133716+00:00</th>
      <td>7.0</td>
      <td>1.0</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>2023-03-18 02:03:48.563545+00:00</th>
      <td>8.0</td>
      <td>1.0</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>2023-03-18 02:03:48.731747+00:00</th>
      <td>9.0</td>
      <td>0.0</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>2023-03-18 02:03:49.231875+00:00</th>
      <td>7.0</td>
      <td>1.0</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>2023-03-18 02:03:49.232056+00:00</th>
      <td>8.0</td>
      <td>1.0</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>2023-03-18 02:03:50.136746+00:00</th>
      <td>9.0</td>
      <td>0.0</td>
      <td>0.0</td>
    </tr>
  </tbody>
</table>
<p>107 rows × 3 columns</p>
</div>




```python
# Forward fill the missing values
expanded_df.ffill(inplace=True)
expanded_df.index = pd.to_datetime(expanded_df.index)
```


```python
# Colors for the bars (green, yellow, and red)
colors = ['#2ecc71', '#f1c40f', '#e74c3c']

fig, ax = plt.subplots(figsize=(20, 10))
expanded_df.plot(kind='bar', stacked=True, width=1, color=colors, ax=ax)

# Customize the plot as needed
plt.title('\nMining Pool Tips over Time\n', font='arial', fontsize=30)
plt.ylabel('Mining Pools at Tip\n', font='arial', fontsize=22)
plt.xlabel('', fontsize=15)
plt.legend('', frameon=False)

# Set the x-axis locator to show only 10 ticks
ax.xaxis.set_major_locator(MaxNLocator(nbins=5))

# Rotate the x-tick labels for better readability
plt.xticks(rotation=0, fontsize=15)

# Increase the size of y-axis tick labels
plt.yticks(fontsize=17)

# Add padding to x-axis tick labels
plt.tick_params(axis='x', which='major', pad=15)

plt.ylim(0, 9)

# Show the plot
plt.tight_layout()  # Adjust the layout to make room for the x-tick labels
plt.show()
```

    WARNING:matplotlib.font_manager:findfont: Font family 'Lato' not found.
    WARNING:matplotlib.font_manager:findfont: Font family 'Lato' not found.
    WARNING:matplotlib.font_manager:findfont: Font family 'Lato' not found.
    WARNING:matplotlib.font_manager:findfont: Font family 'Lato' not found.
    WARNING:matplotlib.font_manager:findfont: Font family 'Lato' not found.
    WARNING:matplotlib.font_manager:findfont: Font family 'Lato' not found.
    WARNING:matplotlib.font_manager:findfont: Font family 'Lato' not found.
    WARNING:matplotlib.font_manager:findfont: Font family 'Lato' not found.
    WARNING:matplotlib.font_manager:findfont: Font family 'Lato' not found.
    WARNING:matplotlib.font_manager:findfont: Font family 'Lato' not found.
    WARNING:matplotlib.font_manager:findfont: Font family 'Lato' not found.
    WARNING:matplotlib.font_manager:findfont: Font family 'Lato' not found.
    WARNING:matplotlib.font_manager:findfont: Font family 'Lato' not found.



    
![png](output_17_1.png)
    


### The chart above only shows each observation, but they are not evenly spaced over time


```python
# Resample to 1-second frequency and keep only the latest values
expanded_df_resampled = expanded_df.resample('1S').last()
```


```python
# Forward fill to handle any missing values after resampling
expanded_df_resampled.ffill(inplace=True)
```


```python
# Create a new date range
start = pd.Timestamp('2023-03-18 01:40:30', tz='UTC')
end = pd.Timestamp('2023-03-18 01:46:30', tz='UTC')

new_index = pd.date_range(start=start, end=end, freq='1S')

# Reindex the DataFrame
expanded_df_resampled = expanded_df_resampled.reindex(new_index)

# Forward fill to handle any missing values after reindexing
expanded_df_resampled.ffill(inplace=True)
```


```python
expanded_df_resampled
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>0</th>
      <th>1</th>
      <th>2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2023-03-18 01:40:30+00:00</th>
      <td>9.0</td>
      <td>0.0</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>2023-03-18 01:40:31+00:00</th>
      <td>9.0</td>
      <td>0.0</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>2023-03-18 01:40:32+00:00</th>
      <td>9.0</td>
      <td>0.0</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>2023-03-18 01:40:33+00:00</th>
      <td>9.0</td>
      <td>0.0</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>2023-03-18 01:40:34+00:00</th>
      <td>9.0</td>
      <td>0.0</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>2023-03-18 01:46:26+00:00</th>
      <td>9.0</td>
      <td>0.0</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>2023-03-18 01:46:27+00:00</th>
      <td>9.0</td>
      <td>0.0</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>2023-03-18 01:46:28+00:00</th>
      <td>9.0</td>
      <td>0.0</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>2023-03-18 01:46:29+00:00</th>
      <td>9.0</td>
      <td>0.0</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>2023-03-18 01:46:30+00:00</th>
      <td>9.0</td>
      <td>0.0</td>
      <td>0.0</td>
    </tr>
  </tbody>
</table>
<p>361 rows × 3 columns</p>
</div>




```python
fig, ax = plt.subplots(figsize=(20, 10))
expanded_df_resampled.plot(kind='bar', stacked=True, width=1, color=colors, ax=ax)

timestamp_277_foundry = pd.Timestamp('2023-03-18 01:41:10', tz='UTC')
# Find the numerical equivalent of the timestamp
num_timestamp_277_foundry = (timestamp_277_foundry - expanded_df_resampled.index[0]).total_seconds() / (expanded_df_resampled.index[-1] - expanded_df_resampled.index[0]).total_seconds() * len(expanded_df_resampled.index)
plt.axvline(x=num_timestamp_277_foundry, color='black', linestyle='--')

# TIMESTAMP ANNOTATIONS
ax.annotate('Foundry Mines \nBlock 781277', xy=(num_timestamp_277_foundry, 0.9), xytext=(-105, 200), textcoords='offset points',
            fontsize=14, color='black', ha='left', va='bottom')

timestamp_277 = pd.Timestamp('2023-03-18 01:41:17', tz='UTC')
num_timestamp_277 = (timestamp_277 - expanded_df_resampled.index[0]).total_seconds() / (expanded_df_resampled.index[-1] - expanded_df_resampled.index[0]).total_seconds() * len(expanded_df_resampled.index)
plt.axvline(x=num_timestamp_277, color='r', linestyle='--')

ax.annotate('ViaBTC Mines \nBlock 781277', xy=(num_timestamp_277, 0.9), xytext=(10, 200), textcoords='offset points',
            fontsize=14, color='black', ha='left', va='bottom')

timestamp_278 = pd.Timestamp('2023-03-18 01:46:05', tz='UTC')
num_timestamp_278 = (timestamp_278 - expanded_df_resampled.index[0]).total_seconds() / (expanded_df_resampled.index[-1] - expanded_df_resampled.index[0]).total_seconds() * len(expanded_df_resampled.index)
plt.axvline(x=num_timestamp_278, color='r', linestyle='--')

ax.annotate('ViaBTC Mines \nBlock 781278', xy=(num_timestamp_278, 0.9), xytext=(-100, 200), textcoords='offset points',
            fontsize=14, color='black', ha='left', va='bottom')

plt.title('\nMining Pool Tips over Time\n', font='arial', fontsize=30)
plt.suptitle('                     6-Minute Observation Window', font='arial', fontsize=15, y=0.85)
plt.ylabel('Mining Pools at Tip\n', font='arial', fontsize=22)
plt.xlabel('', fontsize=15)
plt.legend('', frameon=False)

# Set the x-axis locator to show only 5 ticks
ax.xaxis.set_major_locator(MaxNLocator(nbins=5))
plt.xticks(rotation=0)
plt.yticks(fontsize=17)
plt.tick_params(axis='x', which='major', pad=15)

plt.ylim(0, 9)

# Show the plot
plt.tight_layout()  # Adjust the layout to make room for the x-tick labels
plt.savefig('./PoolTips-781277.png',facecolor='white',dpi=300)
plt.show()
```

    WARNING:matplotlib.font_manager:findfont: Font family 'Lato' not found.
    WARNING:matplotlib.font_manager:findfont: Font family 'Lato' not found.
    WARNING:matplotlib.font_manager:findfont: Font family 'Lato' not found.
    WARNING:matplotlib.font_manager:findfont: Font family 'Lato' not found.
    WARNING:matplotlib.font_manager:findfont: Font family 'Lato' not found.
    WARNING:matplotlib.font_manager:findfont: Font family 'Lato' not found.
    WARNING:matplotlib.font_manager:findfont: Font family 'Lato' not found.
    WARNING:matplotlib.font_manager:findfont: Font family 'Lato' not found.
    WARNING:matplotlib.font_manager:findfont: Font family 'Lato' not found.
    WARNING:matplotlib.font_manager:findfont: Font family 'Lato' not found.
    WARNING:matplotlib.font_manager:findfont: Font family 'Lato' not found.
    WARNING:matplotlib.font_manager:findfont: Font family 'Lato' not found.
    WARNING:matplotlib.font_manager:findfont: Font family 'Lato' not found.
    WARNING:matplotlib.font_manager:findfont: Font family 'Lato' not found.
    WARNING:matplotlib.font_manager:findfont: Font family 'Lato' not found.
    WARNING:matplotlib.font_manager:findfont: Font family 'Lato' not found.
    WARNING:matplotlib.font_manager:findfont: Font family 'Lato' not found.
    WARNING:matplotlib.font_manager:findfont: Font family 'Lato' not found.
    WARNING:matplotlib.font_manager:findfont: Font family 'Lato' not found.
    WARNING:matplotlib.font_manager:findfont: Font family 'Lato' not found.
    WARNING:matplotlib.font_manager:findfont: Font family 'Lato' not found.
    WARNING:matplotlib.font_manager:findfont: Font family 'Lato' not found.
    WARNING:matplotlib.font_manager:findfont: Font family 'Lato' not found.
    WARNING:matplotlib.font_manager:findfont: Font family 'Lato' not found.
    WARNING:matplotlib.font_manager:findfont: Font family 'Lato' not found.
    WARNING:matplotlib.font_manager:findfont: Font family 'Lato' not found.
    WARNING:matplotlib.font_manager:findfont: Font family 'Lato' not found.
    WARNING:matplotlib.font_manager:findfont: Font family 'Lato' not found.
    WARNING:matplotlib.font_manager:findfont: Font family 'Lato' not found.
    WARNING:matplotlib.font_manager:findfont: Font family 'Lato' not found.
    WARNING:matplotlib.font_manager:findfont: Font family 'Lato' not found.
    WARNING:matplotlib.font_manager:findfont: Font family 'Lato' not found.
    WARNING:matplotlib.font_manager:findfont: Font family 'Lato' not found.
    WARNING:matplotlib.font_manager:findfont: Font family 'Lato' not found.
    WARNING:matplotlib.font_manager:findfont: Font family 'Lato' not found.
    WARNING:matplotlib.font_manager:findfont: Font family 'Lato' not found.
    WARNING:matplotlib.font_manager:findfont: Font family 'Lato' not found.
    WARNING:matplotlib.font_manager:findfont: Font family 'Lato' not found.
    WARNING:matplotlib.font_manager:findfont: Font family 'Lato' not found.
    WARNING:matplotlib.font_manager:findfont: Font family 'Lato' not found.
    WARNING:matplotlib.font_manager:findfont: Font family 'Lato' not found.
    WARNING:matplotlib.font_manager:findfont: Font family 'Lato' not found.



    
![png](output_23_1.png)
    

