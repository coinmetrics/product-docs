# Profiles Overview

Our Profiles describe cryptoassets as well as different networks. These descriptions supplement our asset metrics data to provide a comprehensive overview of a particular cryptoasset and a network a cryptoasset might live on.

Given the landscape of tokens that live on different networks and the unique characteristics that both assets as well as networks posess, we provide two different lenses onto this reference data. You can explore it by asset through the Asset Profiles which include fields such as the asset ID, full name, short description of an asset, an longer overview of the asset, the website URL, the whitepaper URL, the creation date, and the supply cap (if there is one) amongst other fields. To view information on networks you can explore our Network Profiles which includes fields such as the network ticker, full name, an overview of the network, the consensus mechanism, hashing algorithm as well as useful links to different respositories and other data points.

## Coverage

The asset coverage can be found by querying our [profile/assets](https://docs.coinmetrics.io/api/v4#operation/getAssetProfiles) API endpoint.

The network coverage can be found be querying our [profile/networks](https://docs.coinmetrics.io/api/v4/#tag/Profile/operation/getNetworkProfiles) API endpoint.

## API Endpoints

Data available at the asset level is available through the [profile/assets](https://docs.coinmetrics.io/api/v4#operation/getAssetProfiles) API endpoint while data available at the network level is available through the [profile/networks](https://docs.coinmetrics.io/api/v4/#tag/Profile/operation/getNetworkProfiles) API endpoint. More details on these endpoints can be found in the sections below:

{% content-ref url="asset-profiles.md" %}
[asset-profiles.md](asset-profiles.md)
{% endcontent-ref %}

{% content-ref url="network-profiles.md" %}
[network-profiles.md](network-profiles.md)
{% endcontent-ref %}

## Change Log

{% updates format="full" %}
{% update date="2026-01-29" %}
## Network Profiles - Added BNB Smart Chain

Added BNB Smart Chain to Network Profiles endpoint and made some smaller changes to Flow, Solana and Ethereum. Full details below.

<details>

<summary>Full Details</summary>



1\. New BNB Smart Chain (BSC) Network Profile

* Added network profile for BNB Smart Chain (bsc)
* Includes:
  * Overview, consensus protocol, hashing algorithm
  * Available clients
  * Foundation information
  * Repository links
  * Significant Historical Changes
  * Upgrade History: 9 upgrades documented

2\. Flow Network Updates

* Added significant historical change entry.

3\. Solana Network Updates

* **Fixed typo:** Changed "mostlh theoretical" to "mostly theoretical" in overview

4\. Ethereum Network Updates

* **Fixed typo:** "get" to "geth" in github\_repository

</details>
{% endupdate %}
{% endupdates %}
