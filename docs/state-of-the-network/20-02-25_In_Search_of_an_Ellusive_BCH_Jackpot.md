# In Search of an Ellusive BCH Jackpot

**Date:** 20-02-25

“I thought for a long time whether to write here. And now that I am doing it, I doubt whether I am doing the right thing. Imagine that there is a casino with a jackpot of $500k. To hit it, you need to bet about $15k and the probability that the bet will payout is about 60%. The problem is that there are several more people that know about this jackpot for sure. What would you do in a similar situation?”

On November 20th 2017, a russian Bitcointalk user ponders over an interesting opportunity that presents itself to him. To understand it, we must go back in time.

Several weeks earlier, two crucial events unfolded: on August 1st, Bitcoin Cash forked away from Bitcoin. Then, on August 24th, Bitcoin activated its most important upgrade in years: SegWit (segregated witness).

The Bitcoin Cash fork created two assets that shared practically everything. Importantly for this story, both networks support special types of addresses, P2SH (pay-to-script hash), that start with a ‘3’. These addresses enable usage of complex scripts like multisignature schemes. The script associated with a P2SH address is only known when the address gets “spent from”: someone sending BTC or BCH to a never-spent-from P2SH address cannot know what script it uses.

SegWit, among many other changes, added a special type of P2SH address: nested SegWit. They look like normal P2SH addresses, but their spending script uses SegWit. It offered an easy and backward compatible way to onboard users to SegWit.

Over time, users have been mistakenly sending BCH to nested SegWit addresses. As Bitcoin Cash doesn’t implement SegWit, these addresses’ scripts fallback to looking like anyone-can-spend addresses (which do not require a signature; all you need is the knowledge of the script). This misplaced BCH is therefore effectively a jackpot waiting for whoever can get there first.

This figure only gives a minimum estimate of how many BCH have been mistakenly lost this way. We can only detect whether an address uses nested SegWit when the script the address uses is revealed. As time goes on, more and more addresses can be detected, which will inflate this figure.

There is one slight caveat though: only miners can access this jackpot. Transactions have to obey consensus rules (no double spending, etc.) but there’s another set of rules they have to obey in order to be relayed by nodes: standardness rules, which were implemented to avoid denial-of-service attacks using large or very complex transactions. Bitcoin has a small number of standard scripts that are relayed from node to node. Non-standard scripts are accepted as part of mined blocks, but these non-standard scripts are not relayed from node to node.

Transactions spending from a nested SegWit address on Bitcoin Cash break one of these standardness rules (the cleanstack rule, to be precise) and therefore will not be relayed; they can only be mined if included directly by a miner. So miners, or a user in direct contact with a miner,  can spend from nested SegWit addresses on Bitcoin Cash, while normal users cannot.

With this knowledge, we can decipher the opportunity that presented itself to our Russian Bitcointalk user:

$500k jackpot: at the time the user wrote his post, there were slightly more than 400 BCH (worth around $500k at the time) sent to nested SegWit addresses on Bitcoin Cash that could only be claimed by miners.

$15k bet: this is what it would cost to rent 1/144th of BCH’s hashrate for a day.

60% payout chance: a 1/144th miner has a ~63% chance of mining a block in a single day.

If only he could mine a block, he could claim the jackpot for himself:

“I need to mine a block. But all the pools are in China and I have no friends among admins.”

Over time, more than 19,000 BCH have been sent to nested SegWit addresses. In this feature, we will look at the fate of these mistakenly lost BCH.

On September 10th 2017, Reddit user /u/btctroubadour noticed a worrying pattern of events: many Trezor users were sending BCH to nested SegWit addresses. He recommended setting up a miner-run recovery service that would gather this lost BCH and give them back to users (minus a finder’s fee for the pools’ trouble). As per usual with constructive contributions on the internet, the discussion quickly degenerated into endless debates and attacks and nothing came out of it.

However, several people took notice and started thinking about this issue. Furthermore, as time went on, the size of the bounty created by this issue kept growing.

Around this time, our Russian Bitcointalk user probably took notice of the issue and started searching for a miner amenable to mining transactions breaking the standardness rule which prevents regular users from claiming these coins.

One week after, having found no existing mining pool willing to include his transactions, he posts on Bitcointalk, wondering if he could create a temporary pool on Bitcoin Cash, just to mine a single block.

On November 14th 2017, I tweeted about this issue, giving the first public estimate of the bounty available at the time: 478 BCH (worth $644k at the time).

Two days later, on the 16th, the first ever recovery took place: 100.7 BCH mistakenly sent to a nested SegWit address were recovered by BTC.com.

On November 21st 2017 the hopes and dreams of our Russian Bitcointalk user were crushed: an anonymous Reddit user (/u/bchsegwitrecover) recovered 493.5 BCH ($600k at the time) and offered to give it back to affected users after charging a 30% finder’s fee. The catch is that users had to submit claims before December 6th 2017.

The block that included this recovery transaction included a second recovery operation of 12.64 BCH sent to a nested SegWit address. However, this recovery was special because the script needed to recover the BCH was never made public on the Bitcoin chain. Therefore it must have been communicated to the miner directly, to avoid having the lost BCH “claimed” by someone that wouldn’t give it back.

These 12.64 BCH were sent to the same address that recovered 100.7 BCH earlier, which is possibly related to BitGo.

After November 28th, /u/bchsegwitrecover decided to forego his 30% finders fee and reimburse the fees already collected.

The fate of the BCH unclaimed by the deadline is murkier as the funds have gone through peeling chains (where a large amount is peeled off in many smaller denominations over many transactions) making tracing what happened to the funds more difficult.

Two days after /u/bchsegwitrecover’s announcement, BTC.com launched a recovery service, charging a 10% recovery fee, fulfilling /u/btctroubadour’s vision from months earlier.

The introduction of BTC.com’s recovery service started a new era for these lost BCH. Now, public mining pools would mine transactions recovering mistakenly lost BCH.

Using BTC.com’s tagging of BCH miners, we tracked how much BCH each mining pool recovered:

Focusing on BTC.com’s recovery transactions, we can uncover interesting things. Its nominal 10% finders fee was seemingly always sent to the same address, which allows us to determine the revenue the pool got from it: 368.03 BCH.

Astute readers will have noticed that their revenue of 368.03 BCH and their recovered amount of 5,779.30 BCH don’t align with their supposed 10% finders fee. We found 12 transactions for which a lower finder’s fee was charged by BTC.com, of which 5 had a fixed fee of 10 BCH for amounts larger than 100 BCH. This indicates that at some point in time, BTC.com decided to cap their finder’s fee to 10 BCH.

Bitcoin Cash has a policy of bi-annual hard forks, on May 15th and November 15th of each year.

Two of these hard forks are relevant for SegWit recoveries:

On November 15th 2018, SegWit recovery transactions were made completely invalid by a new “cleanstack” consensus rule change

On May 15th 2019 (the following hard fork), this new consensus rule was partially rolled back to only allow SegWit recovery-like transactions.

One consequence is that during the 6 months period during which recovering SegWit funds was impossible, a large amount of lost BCH accumulated and became spendable on the May 15th fork, as is visible on this chart.

This accumulation of anyone-can-spend money (around 4k BCH, or $1.6M at the time) created a bounty that attracted nefarious interests.

As analyzed by BitMEX research, several issues compounded after the hard fork which caused various chain splits. One of these issues made miners produce empty blocks. Right after this bug was fixed, the “fake unknown” miner claimed the nested SegWit BCH bounty for himself. According to an account of the incident by Chinese user “BCH Bruce Lee” on WeChat:

“After discovering this situation, the big BCH miners urgently allocated a large amount of hashpower from BTC to mine BCH, actively initiated the chain reorganization of the two blocks, voided the "fake unknown" mining pool transaction, and sent back the mistakenly lost BCHs to their original owner.”

The “fake unknown” block claiming the mistakenly lost BCH was indeed orphaned by other miners.

Mining pools orphaning an otherwise valid block on purpose is a very rare event. The fact that it happened to avoid many innocent users losing access to their lost BCH makes it unique. This incident can be contrasted with another event that happened one week earlier on BTC: Binance lost 7,000 BTC from a hack and considered colluding with miners to reorg the thief’s transactions out. However, this plan was quickly abandoned.

In a later block, BTC.TOP recovered 3.8k BCH from nested SegWit addresses using a novel technique. Instead of having to wait for claimants to come forward and having to validate that they controlled the address that received the lost coins, they used the information present in the nested SegWit scripts to craft a non-SegWit address that only the holder of the original address could spend. This way, they can give users control over their lost BCH without having to get in contact with them.

However, BTC.TOP didn’t recover all the claimable BCH post-fork; 10 blocks after they recovered 3.8k BCH, the “fake unknown” miner claimed 216 mistakenly lost BCH, whose fate is unknown.

Using all the information above, we can retrace with some certainty the fate of half of the mistakenly lost BCH:

Publicly identified miners are a paragon of virtue, returning the majority of the BCH they recovered to their rightful owners. However, the fate of half of the lost coins is still undetermined.

They have been “recovered” in blocks that haven’t been associated with any known pool. This “unknown” mining entity has been diligently recovering most of the lost BCH (except for the post-May 15th bounty) since mid-2018.

And so the search continues. As is often the case with blockchain archaeology, solving one problem leads to others. No matter where it may lead, we will continue to follow this story, and look forward to unraveling more blockchain mysteries.

After several weeks of positive growth, the major cryptoassets cooled off a little this past week. Bitcoin (BTC) and Ethereum (ETH) both saw declines in usage, and a drop in most economic metrics including daily fees and adjusted transfer value.

However, mining and security measures for both cryptoassets continued to show positive growth over the last 7 days. BTC and ETH estimated hash rate increased by 4.8% and 3.7% week-over-week, respectively.

ETH has had a strong month of market cap growth. Looking at on-chain data, it has also outperformed in several key network metrics.

Over the past 30 days, ETH active addresses have grown 41% (using a seven-day rolling average). Comparatively BTC active addresses have grown by 1%.

ETH has also outpaced most other major cryptoassets in terms of adjusted transfer value growth. Over the last 30 days, ETH’s adjusted transfer value has grown by 132% (using a seven-day rolling average) compared to 11% for BTC.

Interestingly, ETH has also outperformed BTC in terms of the growth of transactions involving exchanges over the past 30 days.

The major cryptoassets remain in a narrow trading range over the past week with muted volatility. BTC’s annualized realized volatility measured over the past month and three months are around 50%, the low end of its recent historical range.

Short-lived bouts of liquidations in the BTC futures market are causing sharp changes in price, both up and down, but have thus far not resulted in a sustained move. While large liquidations were a defining characteristic of 2019, so far in 2020 the impact of liquidations have been more moderate.

Escalation in the number of confirmed COVID-19 (coronavirus) cases and its ensuing economic impact present an additional opportunity to evaluate BTC’s safe haven characteristics. While market participants are quick to point out instances where BTC’s correlation with gold is high, such as during the summer in 2019, much less attention is paid to instances where BTC should react to safe haven capital flows but doesn’t.

Events regarding the spread of COVID-19 in countries such as Korea and Italy are significant because of the sharp response in financial markets over the world. Equity markets have sold off while safe havens such as gold and U.S. treasuries have gained. BTC’s response is curiously absent -- under a basic interpretation of the digital gold thesis, BTC’s price should have reacted positively but has instead declined.

In fact, the correlation between Bitcoin and gold measured over the past 30 days is currently negative, adding evidence to the thesis that BTC only reacts to certain types of events and not others. But past history has shown us that BTC shows qualities of a unique safe haven asset, able to hedge against true black swan-type events where centralized institutions fail or commit policy errors while simultaneously being unresponsive to normal macroeconomic surprises.

Under this lens, one explanation for BTC’s lack of reaction to COVID-19 events is that the virus represents more of a macroeconomic shock rather than an uncertain geopolitical  situation in which policy errors by centralized institutions are likely. And therefore perhaps BTC has characteristics of both risk-off and safe haven assets with a truly unique reaction function.

This week the majority of indexes remained relatively flat after mixed results across large, mid and small-cap cryptoassets. This week’s best performer was the CMBI Ethereum Index, which returned 7.5% for the week, and now has nine consecutive weeks of positive returns.

Of the multi-asset indexes, this is the first week of 2020 that the Bletchley 10 (large-cap) has performed the best among its market cap weighted peers. This is reflective of the relative strength of mid and small-cap assets in 2020, a trend that has not been as prevalent in crypto assets throughout 2019 and most of 2018.