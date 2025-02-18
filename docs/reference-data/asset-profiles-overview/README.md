# Profiles Overview

Our Profiles describe cryptoassets as well as different networks.  These descriptions supplement our asset metrics data to provide a comprehensive overview of a particular cryptoasset and a network a cryptoasset might live on.

Given the landscape of tokens that live on different networks and the unique characteristics that both assets as well as networks posess, we provide two different lenses onto this reference data. You can explore it by asset through the Asset Profiles which include fields such as the asset ID, full name, short description of an asset, an longer overview of the asset, the website URL, the whitepaper URL, the creation date, and the supply cap (if there is one) amongst other fields. To view information on networks you can explore our Network Profiles which includes fields such as the network ticker, full name, an overview of the network, the consensus mechanism, hashing algorithm as well as useful links to different respositories and other data points.

## Coverage

The asset coverage can be found by querying our [profile/assets](https://docs.coinmetrics.io/api/v4#operation/getAssetProfiles) API endpoint. &#x20;

The network coverage can be found be querying our [profile/networks](https://docs.coinmetrics.io/api/v4/#tag/Profile/operation/getNetworkProfiles) API endpoint.

## API Endpoints

Data available at the asset level is available through the [profile/assets](https://docs.coinmetrics.io/api/v4#operation/getAssetProfiles) API endpoint while data available at the network level is available through the [profile/networks](https://docs.coinmetrics.io/api/v4/#tag/Profile/operation/getNetworkProfiles) API endpoint.  More details on these endpoints can be found in the sections below:

{% content-ref url="asset-profiles.md" %}
[asset-profiles.md](asset-profiles.md)
{% endcontent-ref %}

{% content-ref url="network-profiles.md" %}
[network-profiles.md](network-profiles.md)
{% endcontent-ref %}
