# Re-examining Four of the Largest Bitcoin Hacks

**Date:** 20-01-28

Re-examining Four of the Largest Bitcoin Hacks

When cryptoasset exchanges get hacked and large monetary amounts get stolen, news tends to spread fairly quickly. However, articles tend to focus largely on the monetary amount stolen. Rarely do they explore the deeper consequences and fallout resulting from these shocks.

In this feature, we use both on-chain and market data to analyze four of the largest Bitcoin exchange hacks and look at the deep consequences of each, both positive and negative.

Often unknown by newcomers to the industry, the Bitcoinica hack was one of the most influential hacks of all-time. Bitcoinica launched in September 2011 and was a Bitcoin trading platform created by Zhou Tong, a teenager at the time. It quickly gained traction and attracted deposits from many prominent community members. In late 2011, Zhou Tong sold Bitcoinica to Intersango (a UK-based exchange) but stayed involved as CEO and lead developer.

From March to July 2012, Bitcoinica suffered a series of catastrophic incidents:

In March 2012, Bitcoinica’s servers were hosted by Linode. A Linode web portal was compromised by someone that explicitly looked for customers showing any signs of Bitcoin activity. Bitcoinica’s server was therefore targeted and its wallet emptied out.

Very quickly, Zhou Tong made the theft public, even publishing the hacker’s transactions. The theft was made possible by the use of an un-encrypted wallet.

A few weeks after the Linode compromise, another 18.5k BTC was stolen. Zhou Tong promptly disclosed the theft, along with the transaction’s hash. The publicly known cause was the exploit of an email server that escalated into an exploit of the exchange’s hot wallet. Zhou Tong took control quickly enough to avoid the theft of Bitcoinica’s Mt. Gox API key, which could have led to another 15k BTC being stolen (Bitcoinica held BTC on Mt. Gox in order to fill orders).

Following a leak of Bitcoinica’s source code, its old Mt. Gox API key was revealed. Unfortunately, it was used as a password to a LastPass account which contained the new Mt. Gox API key. Someone took advantage of this and proceeded to steal 40k BTC + $40k out of Bitcoinica’s Mt. Gox account (the maximum daily withdrawal possible).

Overall, 102,101 BTC and $40k of user funds were stolen from Bitcoinica. Roger Ver was probably one of the largest creditors, having held 24,841 BTC on Bitcoinica prior to July 2012. Bitcoin’s price was largely unaffected by all of the hacks and even rallied following the Mt. Gox API key exploit.

On the positive side of things, the publication of Bitcoinica’s source code inspired many new entrepreneurs. Most notably, Bitfinex’s early codebase was directly issued from Bitcoinica’s. The disappearance of a very successful exchange also left room for competitors to grow.

Unfortunately for its creditors, the downfall of Mt. Gox tied up 64,673 of Bitcoinica’s BTC in bankruptcy proceedings that are still ongoing to this day.

Of course, when speaking about Bitcoin exchange hacks, one has to mention Mt. Gox. It was one of the first fiat on-ramps and quickly gained the majority of fiat inflows into Bitcoin from 2010 to 2013. Originally created by Jeb McCaleb (who then went on to help create Ripple and Stellar), it was later purchased and operated by Mark Karpelès. From its inception to its death, Mt. Gox went through a series of hacks that went largely unidentified eventually culminating in its collapse in 2014.

Following its catastrophic collapse in early 2014, the public finally learned the scale of its mismanagement. An excellent analysis by Kim Nilsson, using Mt. Gox proprietary data, shed more light into how BTC was siphoned off Mt. Gox.

The following excerpt is from the transitional period between Jeb McCaleb and Mark Karpelès, when the first major Mt. Gox hack occurred in March of 2011.

Excerpt from chat log between Jeb McCaleb (Mt. Gox) and Mark Karpelès

79,956 BTC (worth around $70k) were taken out of Mt. Gox’s wallet in March 2011 after the server hosting the wallet was hacked. As mentioned in a previous State of the Network feature, none of this BTC has ever moved since, so it is unknown whether the thief still has the address’ private key.

Later, in September 2011, someone got access to Mt. Gox’s hot wallet file. It contained keys that held BTC at the time, and also unused keys that would end up as deposit addresses afterwards. Over time, the thief slowly withdrew money from the wallet, undetected by inexistent wallet monitoring.

As the thief’s wallet was a copy of Mt. Gox’s, some of the thief’s spending was interpreted as deposits by the Mt. Gox system further muddying the traces of the thefts.

Mt. Gox’s insolvency had a major impact on Bitcoin. Suspicious trading behavior attributable to Mt. Gox occurred during the late 2013 price run-up leading some to think the incredible rise of Bitcoin’s price at the time was not entirely natural.

Its collapse durably depressed Bitcoin’s price following the 2013 run-up. It took slightly more than 3 years for Bitcoin to reach another all-time high.

Mt. Gox was also the introduction to Bitcoin for many in the mainstream crowd. The stigma associated with Bitcoin due to Mt. Gox is still very strong to this day. Had Mt. Gox not happened, one can only imagine what Bitcoin’s current public image would be.

As Mt. Gox concentrated most of Bitcoin’s trading for years, its disappearance left the field open for many competitors. Since then, no other exchange has dominated Bitcoin exchange market share as much as Mt. Gox at its peak. It also highlighted the need for exchanges to monitor their Bitcoin holdings on a constant basis, something even Bitcoinica managed to do.

At Coin Metrics we track on-chain exchange activity as part of our CM Network Data Pro offering.  Specifically, we track the supply of BTC and ETH held by most major exchanges, as well as the amount flowing into and out of each exchange. We believe that tracking exchange on-chain activity is more important now than ever, and it’s crucial to keep exchanges accountable and hold them to a high standard. We have also vouched for the concept of “Proof of Reserves” as a means of exchanges publicly verifying their holdings. Check out State of the Network Issue 34 for more information on how we track exchange health using on-chain data.

Born from Bitcoinica’s ashes, Bitfinex grew over time as it added more currencies and features to become one of the largest and more influential exchanges of today. From our estimates, Bitfinex had at least 225k BTC under custody on August 1st 2016, just prior to its largest hack.

On August 2nd 2016, 119,756 of these BTC were stolen. They were jointly custodied by BitGo and Bitfinex in 2 out of 3 multisig addresses (meaning 2 out of 3 keys have to sign a withdrawal transactions) where BitGo held one key and Bitfinex the others.

While the details are still unclear, Bitfinex’s BitGo API key was compromised. Due to the lack of checks on how much BTC could be withdrawn in a given time window, very large amounts of BTC were stolen.

At the time news of a breach was made public, there was uncertainty about the amount involved. However, it was possible to get a very accurate estimate using on-chain analysis.

BitGo uses special addresses, known as P2SH (pay-to-script-hash), which enable complex multisignature setups and are well-suited to custody large amounts of BTC. The thief elected to withdraw the heist money to non-P2SH addresses. The specialized website p2sh.info (now txstats.com, a joint BitMEX and Coin Metrics property) tracked the number of BTC stored in P2SH addresses and reflected this large movement a few blocks after they happened, which according to the timeline above, made it the first source of the existence and size of the breach.

Reconstitution of what p2sh.info’s (now txstats.com) homepage would have displayed just after the hack

At the time of the hack, the price of Bitcoin dropped more than $200 but it recovered quickly, in just under 3 months.

Bitfinex’s hack is unique inasmuch the exchange survived despite losing 36% of its reserves (on a USD basis). Bitfinex even managed to thrive afterwards, generating $730M in profit over 2017-2018.

Instead of electing to go into a very long and complex bankruptcy procedure (as highlighted by the Bitcoinica and Mt. Gox cases), Bitfinex management decided to use financial engineering to get out of the hole created by the breach.

Each account received a 36.067% reduction in all balances (even though only BTC was stolen) and was credited with an amount of BFX tokens. Bitfinex would either buy back BFX at a ratio of 1 BFX per dollar lost or convert for shares in iFinex Inc, the BVI registered company behind Bitfinex.

Creditors electing to convert their BFX for iFinex Inc shares would also receive Recovery Right Tokens (RRT) allowing them to get exposure to any recovered heist funds once all BFX had been bought back or converted for shares. Any RRT held would give rights to $1 in heist funds recovered.

Furthermore, an open market allowing trading of BFX and RRT tokens was created on Bitfinex allowing creditors to sell their BFX and therefore enable a market-based pricing of each token.

At first BFX traded at 38 cents on the dollar and RRT at 20 cents on the dollar. BFX trading ended in April 2017 close to par when all tokens were either redempted or converted to iFinex Inc shares. RRT still trades to this day at 2.9 cents on the dollar.

All BFX tokens were redeemed or converted to iFinex Inc shares. The use of the BFX token allowed Bitfinex to survive this otherwise critical event. It even turned out to be a profitable trade for creditors that converted their BFX to iFinex Inc shares, as the entity distributed over $500M in dividends in the 2 years that followed.

Bitfinex also used a similar idea to get past the seizure of $850M deposited at payment processor Crypto Capital to raise $1B by selling 1B Unus Sed Leo (LEO) tokens. Each LEO token gives exposure to any recovery of funds from the heist. Any money left after redemption of RRT tokens, legal and other fees, will go towards buying LEO on the open market.

To this day, only 28 BTC have been recovered from this heist. In June 2019, two Israeli brothers were arrested in relation to the Bitfinex hack, but no more funds have been recovered yet.

The last hack covered by this feature happened on Binance, an exchange that went on to dominate altcoin trading from late 2017 onward. Binance attracted many retail traders and amassed considerable Bitcoin and altcoin reserves.

On May 8th 2019, a 7,000 BTC withdrawal from its hot wallet was triggered. Hackers supposedly broke into many retail accounts via various methods and managed to fool Binance’s hot wallet system into processing such a large withdrawal.

While the details of how the hackers managed to pull-off this heist are sparse, one theory has emerged over time as to how hackers managed to withdraw large amounts of BTC.

Binance lists many exchange pairs (601 active pairs as of writing), the majority of which are illiquid, and therefore cannot support large trades. Hackers can exploit these pairs to concentrate funds from many hacked accounts into fewer ones.

Over time and through various methods, hackers acquired two types of Binance accounts:

trade-only API keys that can only be used to send trades from unsuspecting accounts

full accounts, authorized to withdraw large amounts of BTC

The hackers placed buy orders at very high prices on illiquid pairs from accounts authorized to withdraw large amounts of BTC and used the many hacked API keys to exhaust the order book of that pair all at once, filling all the buy orders, reaching the orders the hackers placed on the withdrawal accounts. Once all this is done, a large percentage of hacked funds were funneled into the right accounts for withdrawals.

News of the hack had no impact on Bitcoin’s price, in fact, the price rallied shortly thereafter.

Thankfully for Binance, a prior initiative called SAFU (Secure Asset Fund for Users) was launched in August 2018 and allowed them to avoid insolvency following the theft. They were saving 10% of trading fees in a separate, cold, wallet to handle exactly this kind of situation.

From the genesis of Bitcoin exchange hacks with the Bitcoinica hacking of a single server to the highly complex and well-orchestrated Binance hack, the constant duel between exchanges and whoever wants to steal their reserves has intensified.

Despite the millions in lost funds and the many victims of these hacks, each stands as an important milestone in the maturation of an asset and asset class, providing many lessons for future market participants:

Bitcoinica traumatized many, but at the same time allowed new exchanges to be born via its open codebase

Mt. Gox’s implosion pushed Bitcoin into the mainstream, resulting in a more fragmented but industrious spot market and granted long-term enthusiasts low Bitcoin prices for many years

Bitfinex’s hack and subsequent recovery via financial engineering might have been the genesis idea behind many exchange tokens

Binance’s recent hack showed the usefulness of self-insurance as well as the increased sophistication of hackers

BTC had a relatively stable week, with market cap, realized cap, active addresses, and transaction count all fluctuating by less than 3% week-over-week. ETH, however, saw more of a usage drop over the week, with active addresses decreasing by 17.8% and transactions falling by 21.2%. XRP also had a particularly bad week, as active addresses dropped by over 67%.

On a positive note, security metrics were mostly up across the board. BTC and BCH led the way, with BTC estimated hash rate growing by 5.7%, and BCH growing by 7.4%.

The rise of Tether on Ethereum was one of the big stories of 2019. Over the course of the year, Ethereum-based Tether (USDT-ETH) rapidly overtook the Bitcoin-based, Omni protocol version of Tether (USDT) in terms of market cap and usage.

Towards the end of 2019, Tether started gaining traction on a new platform: Tron. There is now close to a billion dollars worth of Tether issued on Tron (USDT-TRX), in addition to the $2.29B and and $1.55B issued on Ethereum and Omni, respectively.

We recently added USDT-TRX data to our Network Data Pro offering. Find out more about Coin Metrics Network Data Pro here.

Tron-based Tether is starting to gain some of the share of Tether transfer value, but the Ethereum version still dominates. The following chart shows the percent share of the total adjusted transfer value of USDT, USDT-ETH, and USDT-TRX. As of January 26th, they have 11%, 74%, and 15% share, respectively.

Markets were largely unchanged this week. Tezos (+6%) and Cardano (+6%) were the only notable gainers among major assets. The start of the Chinese New Year celebration which lasts  for one week may have contributed to the muted market activity.

Developments surrounding the 2019-nCoV novel coronavirus and its uncertain future impact have already had significant impacts on financial assets. Equity markets around the world, particularly Chinese markets, have sold off sharply and we have observed safe haven capital flows to gold, U.S. treasuries, and the typical reserve currencies. Interestingly, Bitcoin sold off slightly in concert with Chinese equities. This risk-off behavior seen in Bitcoin complicates the Bitcoin safe haven theory that has been advocated by many market participants.

While the evidence suggests that Bitcoin may react in a risk-off manner to the 2019-nCoV novel coronavirus, another event that occurred over the weekend provided evidence that further bolsters the safe haven theory. On January 26, 2020 at 16:38 UTC, reports on Twitter surfaced that the U.S. embassy in Baghdad was under attack by several rockets.

In a previous issue of the State of the Network, we found that there may be limitations to the degree of Bitcoin’s market efficiency in our study of Bitcoin’s price response to the recent U.S.-Iran military conflict. The most recent developments show, however, that Bitcoin was able to respond instantaneously to an unexpected increase in geopolitical tensions.

Returning to market performance, Ethereum Classic (+7%), Dash (+6%), and ZCash (+4%) continue to outperform the broader market. Maker (-5%) and NEO (-4%) saw slight losses this week.

This week Coin Metrics announced the launch of the CMBI Bitcoin Index and CMBI Ethereum Index. These indexes mark the first to be launched under the CMBI branding, with more single asset indexes, market cap weighted indexes and smart beta indexes to be designed and launched in the future. These initial single asset index products complement the Bletchley Indexes which currently provide a broader market perspective.

To read and learn more about our indexes and how they fit into our broader strategy please check out our website or the recent CMBI launch announcement.

This week, the CMBI Bitcoin Index fell 1% against the USD, whilst the CMBI Ethereum Index finished slightly up. The best performing market cap weighted index was the Bletchley 20 (mid caps), which ended the week 1.5% up, outperforming the CMBI Bitcoin Index by 2.5%. In what has been a recurring theme for the start of 2020, all even weighted indexes continued to outperform their market cap weighted counterparts.