# Q1 2023 Mining Data Special

**Date:** 23-03-28

With Q1 ‘23 almost in the books, signs of springtime are in the air in the Northern Hemisphere. With bitcoin up 65% YTD and a new wave of activity swarming the Bitcoin blockchain in the form of Inscriptions, are sunnier days on the horizon for miners? In a milestone 200th issue of State of the Network, we kick off our first quarterly mining data special of 2023 with a sweeping look at the Bitcoin miner ecosystem touching on everything from fee revenue from Inscriptions to chain splits to hardware profitability trends.

Though the broader Bitcoin community remains at odds over the concept of on-chain NFTs, any BTC miner will tell you that Inscriptions were the answer to their fee revenue prayers. Since their mainstream introduction earlier this year, Inscriptions & Ordinals have set the floor for blockspace demand, ushering in a new era of fee market maturation.

Boosted by a rise in BTC price and fee market rebound,  miners have received $1.8B in revenue in Q1 2023, beating out Q3 and Q4 ‘22.

But the bigger story for miners was the sign of a revival in the long-subdued Bitcoin transaction fee market. The rise of Inscriptions have brought a regime change, with $42M in fee revenue being paid out to miners since the start of the year. This quarter is the first since Q2 2021 with over 2% of revenue attributable to transaction fees. On March 9th, fees represented 5% of daily miner revenue, the highest since July 2021. In the face of an inevitable decline in block rewards—and the next halving roughly just a year and 2 months away—the renewed vibrancy of the fee market is cause for cheer.

Still, the newfound romance between miners & minters remains in its honeymoon phase, leaving room for miscommunication.

While Ordinals are beginning to offer a substantial amount of additional revenue for miners, there’s a few kinks to iron out at the application layer.

Just after midnight on March 18th, Foundry and ViaBTC simultaneously mined a new block at height 781,277, briefly resulting in a short-term chain split. The chain split was resolved within 5 minutes after ViaBTC mined a subsequent block at height 781,278, establishing their previous block as part of the longest proof-of-work chain and rendering Foundry’s block a “stale block.” While this sort of chain split isn’t entirely unprecedented (another chain split between ViaBTC and Foundry blocks occurred again just 1 day later), the event did have some problematic implications for many Ordinals applications.

Shortly after the chain split on March 18, Inscription enthusiasts discovered that popular NFT explorer Ordinals.com had encountered some issues with their indexing engine. In short, Ordinals.com initially received Foundry’s block at 781,277, and considered this to be the canonical “chain tip” of the Bitcoin blockchain. When ViaBTC found a valid block at height 781,278, however, the chronological sequence of on-chain transactions was completely rewritten. Because Ordinals use a First-In First-Out (FIFO) accounting standard to link NFTs to specific UTXOs, this reversion threw a wrench in the Ordinals.com explorer database, breaking the site’s ability to correctly index the order of Inscriptions.

While this disruption doesn’t represent a fundamental flaw in the Ordinals protocol itself, it does indicate that the surrounding NFT ecosystem needs to do some deeper thinking about the interplay between mining game theory and on-chain metadata. While infrequent, blockchain splits and reorganization events do occasionally distort day-to-day settlement assumptions, and may even become more common as the competition for Inscription fee revenue heats up.

With 2022 being one of mining’s roughest years on record, we’ve seen miners across the globe suffer severe hits to their bottom lines. Despite being relatively well-capitalized, U.S. miners have had little respite from the downturn, with many of the most prominent publicly-traded entities under intense pressure from the market and mother nature alike.

Leverage, contagion, and debt remain some of the biggest risk factors for publicly-traded miners. North America’s largest miner Core Scientific (CORZ) filed for Chapter 11 bankruptcy in December 2022, squeezed especially by the collapse of Celsius Network, a key client of the company’s hosting services. Throughout the past year, severe weather conditions have also bombarded major mining sites. Marathon Digital (MARA) saw 75% of their hashrate go offline after a mid-summer thunderstorm took down cooling towers at their Montana campus, while Riot Platforms (RIOT) more recently faced severe damage to pipelines in their Texas facility following days of sub-zero temperatures.

Despite the turbulence, American mining operations have maintained an impressive foothold in the hashrate landscape. Many U.S. firms have taken opportunities to expand in the downturn, with Galaxy Digital snapping up Argo Blockchain’s Helios facility at bargain prices, CleanSpark (CLSK) acquiring a sizable fleet of next-gen S19j Pro+ hardware, and Bitfury-backed Cipher Mining (CIFR) taking center-stage as the nation’s fastest-growing mining operation.

Unsurprisingly, the continued expansion of North America’s mining industry has trickled down to U.S.-based mining pools, cementing the region’s standing as the largest mining mecca. The 3 largest mining pools headquartered in the United States— Foundry, Luxor, and Mara Pool— collectively controlled around 40% of network hashrate by the end of Q1 2023, nearly doubling their share from 2022.

While mining pools are often characterized as location-agnostic software platforms, the natural synergies between North American mining firms and neighboring pools have led to a greater concentration of hashrate in U.S. pools. There are many factors that might prompt North America-based miners to select a U.S. mining pool—business hours overlap, a shared language, due diligence requirements, and a suite of localized ancillary services like ASIC procurement/repair are all powerful incentives. However, technical aspects like the pool’s payout structure may also play a role, with NASDAQ-listed Riot Platforms (RIOT) making a public switch to a more favorable reward schedule.

According to Riot’s November production update, the miner opted to break ties with the Czech Republic-based Braiins mining pool due to the inherent unpredictability of the pool’s Pay-per-Last-N-Shares (PPLNS) payout system:

“Variance in a mining pool can impact results and while this variance should balance out over time, can be volatile in the short term. This variance led to lower Bitcoin production than expected in the month of November, relative to our hash rate. In order to ensure more predictable results going forward, Riot will be transitioning to another mining pool which offers a more consistent reward mechanism…”

Though RIOT didn’t explicitly specify which pool they’d divert hashrate towards, the statement implied their pool of choice would offer a Full Pay-Per-Share (FPPS) reward mechanism, allowing them to sell shares at the “market rate” based on global reward averages. Both Luxor and Foundry offer this payout mechanism, making them strong contenders for Riot’s replacement pool.

Examining flows from Braiin’s and Foundry’s 0-hop addresses, we observe that Bitcoin address 1JfNy…Deh6 has received payouts from both mining pools. The sum total of inflows roughly matches the amount of Bitcoin mined reported in RIOT’s monthly production updates, though some inflow sources don’t come directly from either pool’s primary 0-hop pool address. However, scanning just 1 address-hop further indicates that many of these unknown addresses are linked to Braiins pool by a single inbound transaction. Assuming the 1JfNy… address does indeed belong to Riot Platforms, we’re able to extract an on-chain record of the miner’s shifting pool preferences (and consequently, their day-to-day revenues).

Though the concentration of miners within American borders does pose some centralization risk, the public disclosure requirements of the U.S. regulatory regime— combined with the granular auditability of on-chain transfers— allow us to more closely monitor the financial health of Bitcoin’s most powerful stakeholders.

In raw revenue terms, miners are enjoying a Q1 comeback, with USD-denominated incomes getting a major boost as Bitcoin surged from $19,000 to over $28,000 in the short span of 2 weeks. On the expense side of the equation, however, miners remain at the mercy of elevated energy costs. Last summer, the average electric rate for the U.S. industrial sector reached as high as 9.51 cents per kilowatt-hour (kWh). Power costs were  especially exacerbated by extreme weather conditions, with August temperatures reaching the highest levels on record in North America.

Though electric rates have since receded from their mid-2022 peak, inflationary pressures leave a lasting impression. Nationwide averages for industrial power purchasers remain above 8.3 cents per kWh, up incrementally from 7.3 cents in January of last year.

A year-over-year increase of $0.01 per kWh may not seem like much, but for large-scale operators running thousands of power-hungry mining rigs, these costs can quickly add up. For an Antminer S19— the most popular choice for modern day mining firms— every 1 cent uptick corresponds to an extra $0.78 in power costs per day. Even with the latest rally in Bitcoin price, daily revenue for the S19 has barely cracked $7, making every penny count. Without a sustained uptrend, mining margins may soon revisit the cold depths of winter 2022, when the average S19 briefly operated at a loss of more than -$1.22 per day.

Though increased electric rates have downstream impacts for all industries, U.S.-based Bitcoin miners may soon face even higher power prices as part of an excise tax proposed by the Biden Administration. On March 9, the Department of the Treasury released a budget framework outlining a number of measures to curb “digital asset mining,” including a 30% tax on electricity used by miners. The proposal would affect both grid-connected and off-grid facilities, purportedly motivated by the “negative environmental effects” brought on by mining operations.

With most miners already squeezed by razor-thin margins, a 30% increase to their primary operating expense would be a devastating blow to facilities in the United States. Though the proposal recommends a phased rollout over a 3-year period, the enactment of this tax would have an immediate chilling effect on any additional investment into mining operations within U.S. borders. Future profit margins are nearly impossible to predict, but at current revenue levels, even newer-generation ASICs like the Antminer S19 XP would tiptoe along the breakeven threshold with the added 30% tax.

Despite the havoc Biden’s tax could wreak on American operations, ASICs have a way of quickly finding a new home— even after a near 50% decline during the Chinese miner migration of July 2021, network hashrate took a mere 6 months to recover to the previous levels.

In truth, an excise tax on U.S. miners has the potential to strengthen network decentralization, forcing miners to further prioritize low-cost energy sources over access to easy American capital markets. In any case, the proposed tax will undoubtedly trigger a fierce backlash from the most entrenched publicly-traded miners, putting the political influence of the U.S. mining industry to the ultimate test.

Surviving 2022 was no small feat for Bitcoin miners. In retrospect, the industry’s overwhelming reliance on cheap debt and collateralized lending was bound for a reckoning, with the collapse of crypto’s largest lenders putting enormous pressure on miners’ over-leveraged balance sheets. While NFT fees and a resurgence in BTC price have been a breath of fresh air for the sector, miners aren’t out of the woods just yet. Inflated power costs will remain a stubborn thorn in the industry’s side, and could quickly worsen if governments succeed in saddling miners with an added energy tax. Inscriptions and Ordinals have boosted fee market revenue in the short-term, but are yet to prove they can solve longer-term issues with Bitcoin’s security budget.

Still, amid a backdrop of collapsing confidence in traditional finance, the mining ecosystem appears remarkably antifragile. Network hashrate continues to shatter records, revenue is back on an upward trajectory, and the dust is finally beginning to settle in the public miner shakeout. Despite political headwinds and economic uncertainty, 2023 could be the year Bitcoin miners reclaim the narrative, serving as key stakeholders in a more distributed, resilient financial system.

The free float supply of Tether on Tron has risen to 43B, a rise of about 2B in the last week alone. Together with 35B of Tether on Ethereum, the market cap of Tether has reached its highest level since last spring.