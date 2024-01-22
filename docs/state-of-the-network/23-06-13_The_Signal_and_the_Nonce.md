# The Signal and the Nonce

**Date:** 23-06-13

Mining is among the most captivating aspects of the cryptocurrency industry and frequently seizes public attention. Even for those relatively unfamiliar with the cryptocurrency world, mining tends to be an element of Bitcoin that is not only widely recognized but also provokes considerable intrigue.

As Bitcoin mining has progressively shifted to becoming a predominantly American industry in recent years, it has attracted the attention and scrutiny of domestic policy makers in the President’s Council of Economic Advisers (CEA), as well as other agencies abroad. Given this heightened interest, it is of utmost importance that we develop high-quality analytics centered on Bitcoin mining. Among the most critical areas requiring such rigorous analysis is Bitcoin's electricity consumption, an issue that has evolved into one of the most contentious topics within the industry.

Today, we are excited to present a new methodology that has several advantages over the existing body of research on this topic and other issues crucial to Bitcoin’s future. At the heart of our analysis is the ability to fingerprint specific types of mining hardware that are identifiable in data patterns left in the mining process. This is an essential ingredient in generating accurate energy use estimates as different miners have different specs. As a general rule, newer machines are far more efficient and powerful. The diagram below shows how newer models achieve far more terahashes per second (TH/s) than older ones, with greater efficiency.

Sources: Coin Metrics, ASIC Miner Value

Like Coin Metrics’ previous miner identification methodology and research in State of the Network (Issue 23, Issue 45, Issue 51), our findings and the resulting data set are based on something called nonce analysis. In Bitcoin lingo, the word "nonce" is short for "number used once" and it is essentially the special number between 0 and 4,294,967,295 Bitcoin miners are searching for.

To gain an intuition, one must first grasp the Bitcoin mining process which, while significant in its implications, is quite simple conceptually. Contrary to some popular belief, Bitcoin mining does not involve solving “complex” math problems. Instead, it might be easier to imagine trying to guess a password without any prior knowledge. It’s not unreasonable to assume a default strategy of just incrementing the guess; e.g. 0000, 0001, 0002, … or jumping around randomly until the passcode is found. The nonce is intuitively similar to the password that is guessed.

But as it turns out, and what our past research on the subject has suggested, there exists an intrinsic pattern in the miner’s hardware chip design that makes each machine traceable. Remarkably, we have found that the overwhelming majority of ASICs (Application-specific integrated circuit, essentially, a machine used to mine bitcoin and only mine bitcoin) leave an identifiable pattern, as shown in the charts below.

Nonce Patterns in Big-Endian (Left) and Little-Endian (Right)

What makes this methodology so exciting is that it does not rely heavily on anecdotal evidence like the timing of an ASIC release coinciding with the appearance of a new pattern on-chain. Instead, this new methodology incorporates data sourced directly from the ASICs themselves. As a result, this new methodology is more accurate and easily extensible to newer hardware models.

Bitcoin’s estimated total power draw is easily derivable from the key data on mining hardware produced by our analysis. As of May 2023, we estimate the network’s power draw at roughly 13.4 gigawatts (GW), or about 16% less than Cambridge University’s Center for Alternative Finance’s estimate of 15.9 GW (often deemed the gold standard). For context, the Three Gorges Dam in China has a total electric generating capacity of about 22.5 GW. This also puts Bitcoin in the vicinity of 1/10th of 1 percent of global energy use.

Studying the data underlying Bitcoin’s economic value can serve to put these numbers in context, such as the current $3B+ the Bitcoin Network settles daily today employing Coin Metrics’ adjusted transfer value methodology. However, with this analysis we have striven to present a novel methodology to derive better data, and we leave subjective judgment of Bitcoin’s energy profile out of this report. That being said, Bitcoin’s energy consumption is one of the industry’s most debated issues, and we believe this data can serve industry leaders and policymakers alike in driving more constructive and informed discussions around the topic. Following Coin Metrics’ values of neutrality and openness, we are excited to present the most accurate and truthful estimates to date on this subject.

Energy consumption is just one of many exciting areas of research enabled by this analysis. Estimates around Bitcoin’s electronic waste (E-waste), network efficiency, and a dive into some key mining industry trends are all possible. We invite you to continue exploring by reading the full report below.

Download Report

We are also excited to showcase this data through Coin Metrics Labs in dashboard form. Check out the link below (best viewed on desktop).

labs.coinmetrics.io

Activity rose across the board over the past week in the wake of the SEC’s tightening grip on cryptocurrency exchanges Binance and Coinbase. Many ERC-20 tokens experienced large surges in on-chain activity, such as Polygon (MATIC) which was called a crypto asset security in the SEC’s complaint alleging Coinbase operated as an Unregistered Securities Exchange, Broker, and Clearing Agency.