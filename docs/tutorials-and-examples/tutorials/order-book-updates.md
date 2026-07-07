# Order Book Updates — Live Book Reconstruction

An order book is the outstanding bids and asks for a market, by price level. Coin Metrics serves it **three ways** — the three delivery schemas:

1. **Historical snapshots** — periodic point-in-time state of the whole book.
2. **Historical updates + snapshots** — the full event-driven stream of level changes; reconstruct the exact book at any timestamp (`dataset=updates`).
3. **Real-time streaming** — a live websocket that opens with a snapshot, then streams updates.

All three share **one** `[price, size]` message shape (a `size` of `0` removes a level), so the **same reconstruction code works across all of them**. This notebook is fully self-contained — every cell uses the Coin Metrics Python client directly — and it makes the point concrete by **streaming a live sample, then replaying the exact same time window from the historical `updates` dataset**.


### Resources

This notebook demonstrates basic functionality offered by the Coin Metrics Python API Client and Market Data Feed.

Coin Metrics offers a vast assortment of data for hundreds of cryptoassets. The Python API Client allows for easy access to this data using Python without needing to create your own wrappers using `requests` and other such libraries.

To understand the data that Coin Metrics offers, feel free to peruse the resources below.

* The [Coin Metrics API v4](https://docs.coinmetrics.io/api/v4) website contains the full set of endpoints and data offered by Coin Metrics.
* The [Coin Metrics Product Documentation](https://docs.coinmetrics.io/info) gives detailed, conceptual explanations of the data that Coin Metrics offers.
* The [API Spec](https://docs.coinmetrics.io/python-api-client/reference) contains a full list of functions.

### File Download

Download the notebook to run it yourself:

{% file src="../../.gitbook/assets/sales_demo_order_book_updates.ipynb" %}

## Setup

The only dependency is the Coin Metrics Python API client (`pip install coinmetrics-api-client`). The API key is read from the environment — never hardcode it.


```python
import os, json, time
from datetime import timedelta
import pandas as pd
import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation, PillowWriter
from IPython.display import Image, display
from coinmetrics.api_client import CoinMetricsClient

client = CoinMetricsClient(os.environ["CM_API_KEY"])
MARKET = 'coinbase-btc-usd-spot'
DEPTH_PCT = 0.001   # depth band around the mid (0.001 = 0.1%)
```

## Schema 1 — Historical snapshots

The simplest shape: a periodic **snapshot** of the whole book. Coin Metrics stores three snapshot products — the top **100** levels and all levels **within 10% of mid** every **10s**, and the **full book hourly**. We pull the latest few (top-100) and show the top of the most recent one:


```python
# Latest few snapshots (default "snapshots" dataset), returned as a DataFrame.
# limit_per_market + paging_from use format="json" (json_stream always streams from start).
snaps = client.get_market_orderbooks(
    markets=[MARKET],
    limit_per_market=3,
    depth_limit="100",
    paging_from="end",
    format="json",
).to_dataframe()

latest = snaps.sort_values("time").iloc[-1]   # most recent snapshot
print(f"latest snapshot: {latest['time']}")
pd.DataFrame({
    "bid_price": [l["price"] for l in latest["bids"][:5]],
    "bid_size":  [l["size"]  for l in latest["bids"][:5]],
    "ask_price": [l["price"] for l in latest["asks"][:5]],
    "ask_size":  [l["size"]  for l in latest["asks"][:5]],
})
```

    latest snapshot: 2026-07-07 05:31:59.984346+00:00





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
      <th>bid_price</th>
      <th>bid_size</th>
      <th>ask_price</th>
      <th>ask_size</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>63033.89</td>
      <td>0.36320277</td>
      <td>63033.9</td>
      <td>0.09268223</td>
    </tr>
    <tr>
      <th>1</th>
      <td>63033.88</td>
      <td>0.03</td>
      <td>63035.48</td>
      <td>0.05552568</td>
    </tr>
    <tr>
      <th>2</th>
      <td>63033.86</td>
      <td>0.03</td>
      <td>63036.42</td>
      <td>0.00022309</td>
    </tr>
    <tr>
      <th>3</th>
      <td>63033.8</td>
      <td>0.00079322</td>
      <td>63037.05</td>
      <td>0.01784664</td>
    </tr>
    <tr>
      <th>4</th>
      <td>63032.01</td>
      <td>0.11820631</td>
      <td>63037.61</td>
      <td>0.0694071</td>
    </tr>
  </tbody>
</table>
</div>



## Reconstructing the book

Both the update stream and the websocket deliver the same messages: a `snapshot` is the full state; an `update` carries absolute `[price, size]` levels where a `size` of `0` removes the level. To maintain the book, treat **every** `snapshot` as a full reset (a redundant-stream failover can emit an out-of-band snapshot), then apply updates in time order. That's the whole algorithm:


```python
def new_book():
    return {"bids": {}, "asks": {}}   # price -> size, per side

def apply_message(book, msg):
    if msg.get("type") == "snapshot":       # full state replacement
        book["bids"].clear()
        book["asks"].clear()
    for side in ("bids", "asks"):           # snapshot or update: apply levels
        levels = msg.get(side)
        if levels is None:
            continue
        for level in levels:
            price, size = float(level["price"]), float(level["size"])
            if size == 0:
                book[side].pop(price, None)  # level removed
            else:
                book[side][price] = size

def best_bid_ask(book):
    bid = max(book["bids"]) if book["bids"] else None
    ask = min(book["asks"]) if book["asks"] else None
    return bid, ask
```

And a small helper to **animate** the top of the book as messages are applied. The *same* function works on live websocket messages and on historical `updates` rows — because they are the same message shape. Levels are drawn by rank (best bid/ask at the center, deeper levels outward) so the bars stay readable and never overlap:


```python
GREEN, CORAL, DARK, TEXT, MUTED = "#22CAAD", "#F96167", "#10121A", "#C9D2DC", "#8E97A8"

def animate_book(messages, out_path, title, top_n=12, max_frames=100, fps=12):
    book, frames = new_book(), []
    for msg in messages:
        apply_message(book, msg)
        if not book["bids"] or not book["asks"]:
            continue
        bids = sorted(book["bids"], reverse=True)[:top_n]
        asks = sorted(book["asks"])[:top_n]
        frames.append(([(p, book["bids"][p]) for p in bids],
                       [(p, book["asks"][p]) for p in asks]))
    if len(frames) > max_frames:
        frames = frames[:: max(1, len(frames) // max_frames)]

    ymax = max((s for b, a in frames for _, s in b + a), default=1.0) * 1.1
    fig, ax = plt.subplots(figsize=(7, 4))
    fig.patch.set_facecolor(DARK)

    def draw(i):
        ax.clear(); ax.set_facecolor(DARK)
        bids, asks = frames[i]
        ax.bar([-(j + 0.5) for j in range(len(bids))], [s for _, s in bids], width=0.9, color=GREEN)
        ax.bar([(j + 0.5) for j in range(len(asks))], [s for _, s in asks], width=0.9, color=CORAL)
        ax.axvline(0, color=MUTED, ls="--", lw=0.8, alpha=0.6)
        ax.text(-0.5, ymax * 0.99, f"bid {bids[0][0]:,.2f}", color=GREEN, fontsize=7.5, ha="right", va="top")
        ax.text(0.5, ymax * 0.99, f"ask {asks[0][0]:,.2f}", color=CORAL, fontsize=7.5, ha="left", va="top")
        ax.text(-(len(bids) - 0.5), ymax * 0.88, f"{bids[-1][0]:,.2f}", color=MUTED, fontsize=6, ha="center", va="top")
        ax.text((len(asks) - 0.5), ymax * 0.88, f"{asks[-1][0]:,.2f}", color=MUTED, fontsize=6, ha="center", va="top")
        ax.set_xlim(-(top_n + 0.5), top_n + 0.5); ax.set_ylim(0, ymax); ax.set_xticks([])
        ax.set_title(f"{title} · frame {i + 1}/{len(frames)}", color=TEXT, fontsize=10)
        ax.set_xlabel("best bid/ask at center · deeper levels outward   (bids ←  |  → asks)", color=TEXT, fontsize=8)
        ax.set_ylabel("size", color=TEXT, fontsize=8)
        ax.tick_params(colors=TEXT, labelsize=7)
        for sp in ("top", "right"): ax.spines[sp].set_visible(False)
        for sp in ("left", "bottom"): ax.spines[sp].set_color(MUTED)

    anim = FuncAnimation(fig, draw, frames=len(frames), interval=1000 / fps)
    anim.save(out_path, writer=PillowWriter(fps=fps), savefig_kwargs={"facecolor": DARK})
    plt.close(fig)
    return out_path
```

## Schema 3 — Real-time streaming

The websocket feed opens with a `snapshot`, then sends `update` messages as the book changes (with occasional re-sync snapshots) — **the production path** for a live book. We subscribe at **`depth_limit="full_book"`** (the stream defaults to top-100) so the live feed matches the historical `updates` dataset, which is full-book — making the two directly comparable. We take a small live sample and **record the time window it spans**, so we can replay exactly that window from history next.

> This cell is *live*: its exact messages (and window) differ every run — unlike the historical replay below, which is reproducible.


```python
def stream_sample(market, n, max_seconds=120):
    """Consume `n` websocket messages, then close. Full-book to match the updates dataset."""
    stream = client.get_stream_market_orderbooks(markets=[market], depth_limit="full_book")
    messages = []
    start = time.time()
    def on_message(ws, message):
        messages.append(json.loads(message))
        if len(messages) >= n or time.time() - start > max_seconds:
            ws.close()
    stream.run(on_message=on_message, reconnect=False)
    return messages

live_msgs = stream_sample(MARKET, n=800)
times = sorted(m["time"] for m in live_msgs)
# The window we just watched, truncated to whole seconds (the messages carry
# nanosecond timestamps; .parallel() chunking needs a second-precision start/end).
win_start, win_end = times[0][:19] + "Z", times[-1][:19] + "Z"
live_changes = sum(len(m.get("asks") or []) + len(m.get("bids") or []) for m in live_msgs)
print(f"{len(live_msgs):,} live messages, {live_changes:,} level-changes")
print(f"streamed window: {win_start} -> {win_end}")
live_msgs[0]
```

    800 live messages, 85,120 level-changes
    streamed window: 2026-07-07T05:31:59Z -> 2026-07-07T05:32:12Z





    {'market': 'coinbase-btc-usd-spot',
     'time': '2026-07-07T05:31:59.984346000Z',
     'coin_metrics_id': 'FxT65kMNSy6PL0celq9B7AAAAACEbj6G',
     'asks': [{'price': '63033.9', 'size': '0.09268223'},
      {'price': '63035.48', 'size': '0.05552568'},
      {'price': '63036.42', 'size': '0.00022309'},
      {'price': '63037.05', 'size': '0.01784664'},
      {'price': '63037.61', 'size': '0.0694071'},
      {'price': '63038', 'size': '0.0815'},
      {'price': '63039.97', 'size': '0.00794908'},
      {'price': '63039.98', 'size': '0.02'},
      {'price': '63040', 'size': '0.0815'},
      {'price': '63041.11', 'size': '0.02'},
      {'price': '63041.12', 'size': '0.32528252'},
      {'price': '63041.13', 'size': '0.12690129'},
      {'price': '63041.98', 'size': '0.09541977'},
      {'price': '63041.99', 'size': '0.04781428'},
      {'price': '63042', 'size': '0.085718'},
      {'price': '63042.83', 'size': '0.000097'},
      {'price': '63043.97', 'size': '0.06345327'},
      {'price': '63043.99', 'size': '0.03975824'},
      {'price': '63044', 'size': '0.0857'},
      {'price': '63044.28', 'size': '0.22040213'},
      {'price': '63044.29', 'size': '0.09541977'},
      {'price': '63044.86', 'size': '0.00485'},
      {'price': '63045', 'size': '0.01'},
      {'price': '63045.06', 'size': '0.15861672'},
      {'price': '63045.48', 'size': '0.00583'},
      {'price': '63045.95', 'size': '0.000018'},
      {'price': '63046', 'size': '0.0857'},
      {'price': '63046.18', 'size': '0.000194'},
      {'price': '63046.32', 'size': '0.03965338'},
      {'price': '63047.8', 'size': '0.0097'},
      {'price': '63047.85', 'size': '0.04781428'},
      {'price': '63048.07', 'size': '0.21563175'},
      {'price': '63048.08', 'size': '0.09541977'},
      {'price': '63048.16', 'size': '0.09126327'},
      {'price': '63048.41', 'size': '0.03573'},
      {'price': '63048.66', 'size': '0.03900293'},
      {'price': '63049.9', 'size': '0.000018'},
      {'price': '63050', 'size': '0.01'},
      {'price': '63050.38', 'size': '0.03975824'},
      {'price': '63050.4', 'size': '0.05'},
      {'price': '63050.56', 'size': '0.1007413'},
      {'price': '63051.2', 'size': '0.00158504'},
      {'price': '63051.93', 'size': '0.09541977'},
      {'price': '63052.81', 'size': '0.0000238'},
      {'price': '63052.89', 'size': '0.000388'},
      {'price': '63053.39', 'size': '0.14'},
      {'price': '63053.65', 'size': '0.01779429'},
      {'price': '63053.66', 'size': '0.0194'},
      {'price': '63053.85', 'size': '0.000018'},
      {'price': '63054.27', 'size': '0.267576'},
      {'price': '63055', 'size': '0.01'},
      {'price': '63056', 'size': '0.00038818'},
      {'price': '63057.41', 'size': '0.00079302'},
      {'price': '63057.42', 'size': '0.09541977'},
      {'price': '63057.5', 'size': '0.00792523'},
      {'price': '63057.8', 'size': '0.000018'},
      {'price': '63058.44', 'size': '0.01268649'},
      {'price': '63059.07', 'size': '0.06'},
      {'price': '63059.13', 'size': '0.40495167'},
      {'price': '63059.14', 'size': '0.04781428'},
      {'price': '63059.8', 'size': '0.60290091'},
      {'price': '63059.81', 'size': '0.09541977'},
      {'price': '63059.83', 'size': '0.027596'},
      {'price': '63060', 'size': '0.01'},
      {'price': '63060.38', 'size': '0.03808335'},
      {'price': '63061.75', 'size': '0.000018'},
      {'price': '63062.85', 'size': '0.92792036'},
      {'price': '63062.86', 'size': '0.09541977'},
      {'price': '63062.9', 'size': '0.05'},
      {'price': '63062.98', 'size': '0.29141206'},
      {'price': '63064.08', 'size': '0.03975824'},
      {'price': '63065', 'size': '0.01'},
      {'price': '63065.44', 'size': '0.04781428'},
      {'price': '63065.7', 'size': '0.038818'},
      {'price': '63066.32', 'size': '0.000776'},
      {'price': '63067.42', 'size': '0.03706545'},
      {'price': '63067.97', 'size': '0.06997503'},
      {'price': '63069.65', 'size': '0.000018'},
      {'price': '63070', 'size': '0.01'},
      {'price': '63071.72', 'size': '0.0000238'},
      {'price': '63073.6', 'size': '0.000018'},
      {'price': '63073.94', 'size': '0.08757252'},
      {'price': '63074', 'size': '0.00003186'},
      {'price': '63074.8', 'size': '0.0005'},
      {'price': '63075', 'size': '0.01'},
      {'price': '63075.14', 'size': '0.01965429'},
      {'price': '63077.55', 'size': '0.000018'},
      {'price': '63077.59', 'size': '0.0023284'},
      {'price': '63078.47', 'size': '1.48164991'},
      {'price': '63078.52', 'size': '0.06998563'},
      {'price': '63079.58', 'size': '0.460025'},
      {'price': '63080', 'size': '0.01'},
      {'price': '63080.61', 'size': '0.0485'},
      {'price': '63080.81', 'size': '0.02537682'},
      {'price': '63081.31', 'size': '0.0375546'},
      {'price': '63081.5', 'size': '0.000018'},
      {'price': '63082.54', 'size': '0.06053282'},
      {'price': '63083.08', 'size': '0.00079308'},
      {'price': '63083.09', 'size': '0.00097'},
      {'price': '63083.89', 'size': '0.54639893'},
      {'price': '63084.03', 'size': '0.03975824'},
      {'price': '63085', 'size': '0.01'},
      {'price': '63085.45', 'size': '0.000018'},
      {'price': '63088.87', 'size': '0.00172427'},
      {'price': '63089.4', 'size': '0.000018'},
      {'price': '63090', 'size': '0.01'},
      {'price': '63090.63', 'size': '0.0000238'},
      {'price': '63090.9', 'size': '0.02045163'},
      {'price': '63092.59', 'size': '0.25380631'},
      {'price': '63092.63', 'size': '0.04781428'},
      {'price': '63093.35', 'size': '0.000018'},
      {'price': '63093.64', 'size': '1.42645132'},
      {'price': '63094', 'size': '0.00038711'},
      {'price': '63094.12', 'size': '0.03975824'},
      {'price': '63094.71', 'size': '0.06038706'},
      {'price': '63095', 'size': '0.00001'},
      {'price': '63095.06', 'size': '0.01597231'},
      {'price': '63095.35', 'size': '1.04374867'},
      {'price': '63095.75', 'size': '0.01597231'},
      {'price': '63096.87', 'size': '0.57561176'},
      {'price': '63097.3', 'size': '0.000018'},
      {'price': '63099.42', 'size': '0.01597231'},
      {'price': '63099.6', 'size': '0.04781428'},
      {'price': '63099.62', 'size': '1.189319'},
      {'price': '63100.4', 'size': '0.05'},
      {'price': '63101.25', 'size': '0.000018'},
      {'price': '63101.38', 'size': '0.00078119'},
      {'price': '63104.21', 'size': '0.03975824'},
      {'price': '63105.2', 'size': '0.000018'},
      {'price': '63105.32', 'size': '0.12347723'},
      {'price': '63106.67', 'size': '1.42615677'},
      {'price': '63107.74', 'size': '0.00005579'},
      {'price': '63109.54', 'size': '0.0000238'},
      {'price': '63111.31', 'size': '0.09117195'},
      {'price': '63112.9', 'size': '0.05'},
      {'price': '63113.4', 'size': '0.01100056'},
      {'price': '63114.3', 'size': '0.03975824'},
      {'price': '63114.59', 'size': '0.2999'},
      {'price': '63114.83', 'size': '0.01597231'},
      {'price': '63116.32', 'size': '3.0128208'},
      {'price': '63116.33', 'size': '5.046601'},
      {'price': '63117.08', 'size': '0.237945'},
      {'price': '63117.93', 'size': '0.00194'},
      {'price': '63119.34', 'size': '1.42587064'},
      {'price': '63119.69', 'size': '0.23387099'},
      {'price': '63121', 'size': '0.000018'},
      {'price': '63122.99', 'size': '0.097'},
      {'price': '63123.57', 'size': '0.00001584'},
      {'price': '63125.4', 'size': '0.05'},
      {'price': '63126', 'size': '0.01106597'},
      {'price': '63127.48', 'size': '0.01331'},
      {'price': '63127.93', 'size': '0.01061683'},
      {'price': '63128.45', 'size': '0.0000238'},
      {'price': '63132.12', 'size': '1.42558198'},
      {'price': '63132.65', 'size': '10.674255'},
      {'price': '63135', 'size': '3'},
      {'price': '63136.8', 'size': '0.000018'},
      {'price': '63137.9', 'size': '0.05'},
      {'price': '63138.59', 'size': '2.26595294'},
      {'price': '63141.11', 'size': '0.00031738'},
      {'price': '63142.05', 'size': '0.00827458'},
      {'price': '63144.05', 'size': '0.15972312'},
      {'price': '63145.18', 'size': '1.42528714'},
      {'price': '63147.36', 'size': '0.0000238'},
      {'price': '63148.05', 'size': '0.01130472'},
      {'price': '63149.82', 'size': '0.237915'},
      {'price': '63150.4', 'size': '0.05'},
      {'price': '63152.6', 'size': '0.000018'},
      {'price': '63154.05', 'size': '9.816853'},
      {'price': '63155.84', 'size': '0.12125'},
      {'price': '63157.64', 'size': '1.42500594'},
      {'price': '63160', 'size': '0.00032674'},
      {'price': '63161', 'size': '0.00020311'},
      {'price': '63161.55', 'size': '0.15972312'},
      {'price': '63161.59', 'size': '0.002425'},
      {'price': '63163.12', 'size': '0.05440999'},
      {'price': '63164', 'size': '0.00158414'},
      {'price': '63168.4', 'size': '0.000018'},
      {'price': '63169.31', 'size': '0.00156117'},
      {'price': '63169.43', 'size': '0.1'},
      {'price': '63170.1', 'size': '0.01082721'},
      {'price': '63170.53', 'size': '1.42471503'},
      {'price': '63172.64', 'size': '0.00031738'},
      {'price': '63174.52', 'size': '0.09108074'},
      {'price': '63175.74', 'size': '0.03499999'},
      {'price': '63176', 'size': '0.00033543'},
      {'price': '63178.01', 'size': '3.21750749'},
      {'price': '63182.05', 'size': '0.03499999'},
      {'price': '63183.37', 'size': '1.42442565'},
      {'price': '63184.2', 'size': '0.000018'},
      {'price': '63188.36', 'size': '0.03499999'},
      {'price': '63194.67', 'size': '0.11294'},
      {'price': '63195', 'size': '0.00015998'},
      {'price': '63195.42', 'size': '0.1455'},
      {'price': '63195.68', 'size': '0.00468519'},
      {'price': '63196', 'size': '0.00014778'},
      {'price': '63196.54', 'size': '1.42412865'},
      {'price': '63198', 'size': '0.00069786'},
      {'price': '63200', 'size': '0.00475595'},
      {'price': '63208.89', 'size': '0.06087999'},
      {'price': '63209.11', 'size': '1.42384543'},
      {'price': '63213.98', 'size': '0.00291'},
      {'price': '63214.74', 'size': '0.023796'},
      {'price': '63216.08', 'size': '0.01265329'},
      {'price': '63218.45', 'size': '0.01'},
      {'price': '63221.75', 'size': '1.42356073'},
      {'price': '63221.9', 'size': '0.04851777'},
      {'price': '63222.36', 'size': '0.00040133'},
      {'price': '63223.3', 'size': '0.15972312'},
      {'price': '63229.92', 'size': '12.562598'},
      {'price': '63230.99', 'size': '0.15972312'},
      {'price': '63235.53', 'size': '1.42325069'},
      {'price': '63235.71', 'size': '0.00031738'},
      {'price': '63237.78', 'size': '0.09098962'},
      {'price': '63241.2', 'size': '0.34606778'},
      {'price': '63242.49', 'size': '0.00036364'},
      {'price': '63244.4', 'size': '0.01264637'},
      {'price': '63250', 'size': '1'},
      {'price': '63252.99', 'size': '1.4228578'},
      {'price': '63256.06', 'size': '14.990801'},
      {'price': '63258.8', 'size': '0.03695331'},
      {'price': '63260.21', 'size': '0.00583'},
      {'price': '63266.36', 'size': '1.08382235'},
      {'price': '63266.37', 'size': '1.42255673'},
      {'price': '63266.72', 'size': '1.42254891'},
      {'price': '63279.59', 'size': '1.42225954'},
      {'price': '63279.7', 'size': '0.00003931'},
      {'price': '63292.02', 'size': '1.42198032'},
      {'price': '63292.44', 'size': '0.00161152'},
      {'price': '63297.87', 'size': '0.01074189'},
      {'price': '63298.78', 'size': '0.10119738'},
      {'price': '63301.11', 'size': '0.09089859'},
      {'price': '63303.56', 'size': '0.00005561'},
      {'price': '63303.8', 'size': '0.3'},
      {'price': '63318.51', 'size': '0.22417615'},
      {'price': '63326', 'size': '0.00014107'},
      {'price': '63327.96', 'size': '1.226205'},
      {'price': '63335', 'size': '0.00011978'},
      {'price': '63337.01', 'size': '42.039441'},
      {'price': '63338', 'size': '0.03430957'},
      {'price': '63348.75', 'size': '0.00263859'},
      {'price': '63361.85', 'size': '0.12619738'},
      {'price': '63364.5', 'size': '0.09145896'},
      {'price': '63365.26', 'size': '0.3'},
      {'price': '63371.22', 'size': '0.52191617'},
      {'price': '63371.77', 'size': '0.47916936'},
      {'price': '63373', 'size': '0.00038518'},
      {'price': '63374', 'size': '0.00046064'},
      {'price': '63375', 'size': '0.00029513'},
      {'price': '63379', 'size': '0.00008205'},
      {'price': '63392', 'size': '0.00031177'},
      {'price': '63398', 'size': '0.00037597'},
      {'price': '63400', 'size': '0.02764121'},
      {'price': '63405.98', 'size': '0.47916936'},
      {'price': '63421.53', 'size': '0.47586717'},
      {'price': '63424.92', 'size': '0.1'},
      {'price': '63426.72', 'size': '0.3'},
      {'price': '63427.96', 'size': '0.0907168'},
      {'price': '63444', 'size': '0.05461653'},
      {'price': '63448.46', 'size': '0.00466652'},
      {'price': '63450.47', 'size': '0.00486063'},
      {'price': '63450.77', 'size': '0.03684151'},
      {'price': '63465.5', 'size': '0.00042322'},
      {'price': '63475.11', 'size': '0.00583'},
      {'price': '63477.99', 'size': '0.00018547'},
      {'price': '63486.18', 'size': '0.61251011'},
      {'price': '63488.18', 'size': '0.3'},
      {'price': '63491.49', 'size': '0.09062603'},
      {'price': '63492.25', 'size': '0.00022555'},
      {'price': '63500', 'size': '0.21559277'},
      {'price': '63517.4', 'size': '0.00002011'},
      {'price': '63537.46', 'size': '0.00027639'},
      {'price': '63549.64', 'size': '0.3'},
      {'price': '63550.64', 'size': '0.47916936'},
      {'price': '63555.07', 'size': '0.09053536'},
      {'price': '63555.2', 'size': '0.04851777'},
      {'price': '63558.45', 'size': '0.00036183'},
      {'price': '63576.99', 'size': '0.00000294'},
      {'price': '63586.16', 'size': '0.69119144'},
      {'price': '63586.51', 'size': '0.07438927'},
      {'price': '63596.48', 'size': '0.01069135'},
      {'price': '63599.43', 'size': '0.00040133'},
      {'price': '63600', 'size': '1.88779749'},
      {'price': '63600.78', 'size': '0.00024875'},
      {'price': '63611.1', 'size': '0.3'},
      {'price': '63618.72', 'size': '0.09044479'},
      {'price': '63628.34', 'size': '0.00154127'},
      {'price': '63640.01', 'size': '0.00036638'},
      {'price': '63643.32', 'size': '0.03673005'},
      {'price': '63645.67', 'size': '0.0012'},
      {'price': '63650.19', 'size': '0.1'},
      {'price': '63654.01', 'size': '0.00006255'},
      {'price': '63656.83', 'size': '0.47916936'},
      {'price': '63657.99', 'size': '0.02588'},
      {'price': '63670.89', 'size': '0.00003176'},
      {'price': '63672.56', 'size': '1.9'},
      {'price': '63680.65', 'size': '0.00022488'},
      {'price': '63682.43', 'size': '0.09035431'},
      {'price': '63683.14', 'size': '0.00027575'},
      {'price': '63687.88', 'size': '0.03'},
      {'price': '63689', 'size': '0.0012'},
      {'price': '63690.39', 'size': '0.00583'},
      {'price': '63695.67', 'size': '0.01000821'},
      {'price': '63697.04', 'size': '0.00005527'},
      {'price': '63702.25', 'size': '0.00464793'},
      {'price': '63709.12', 'size': '0.2065704'},
      {'price': '63714.41', 'size': '0.00007902'},
      {'price': '63731', 'size': '0.00074025'},
      {'price': '63732.67', 'size': '0.0012'},
      {'price': '63734.02', 'size': '1.6'},
      {'price': '63736.78', 'size': '0.00003903'},
      {'price': '63746.2', 'size': '0.09026391'},
      {'price': '63746.6', 'size': '0.00024817'},
      {'price': '63769.75', 'size': '0.00001487'},
      {'price': '63776', 'size': '0.0012'},
      {'price': '63784.6', 'size': '0.03785325'},
      {'price': '63785', 'size': '0.025'},
      {'price': '63785.46', 'size': '0.25376911'},
      {'price': '63785.64', 'size': '0.00945005'},
      {'price': '63790.14', 'size': '0.00299946'},
      {'price': '63794.58', 'size': '0.05637562'},
      {'price': '63795.48', 'size': '1.6'},
      {'price': '63800', 'size': '0.00471108'},
      {'price': '63808.75', 'size': '0.01065957'},
      {'price': '63810.05', 'size': '0.09017359'},
      {'price': '63811.55', 'size': '0.00111069'},
      {'price': '63814.2', 'size': '0.00046698'},
      {'price': '63818.73', 'size': '0.0000812'},
      {'price': '63819.67', 'size': '0.0012'},
      {'price': '63828.72', 'size': '0.03164837'},
      {'price': '63835.58', 'size': '0.00241604'},
      {'price': '63836.45', 'size': '0.03661892'},
      {'price': '63850.96', 'size': '0.15118441'},
      {'price': '63851.52', 'size': '0.00263859'},
      {'price': '63856.65', 'size': '0.00000293'},
      {'price': '63856.94', 'size': '1.6'},
      {'price': '63866', 'size': '4'},
      {'price': '63869.6', 'size': '0.00022421'},
      {'price': '63873.95', 'size': '0.09008339'},
      {'price': '63876', 'size': '0.00036003'},
      {'price': '63877.33', 'size': '0.0012'},
      {'price': '63882.44', 'size': '0.00019795'},
      {'price': '63888.5', 'size': '0.04851777'},
      {'price': '63889.22', 'size': '0.00000444'},
      {'price': '63890', 'size': '0.09497292'},
      {'price': '63894.69', 'size': '0.0000551'},
      {'price': '63900', 'size': '0.00000062'},
      {'price': '63903.32', 'size': '0.04883149'},
      {'price': '63903.33', 'size': '0.00499997'},
      {'price': '63904.17', 'size': '0.00482612'},
      {'price': '63904.96', 'size': '0.00554932'},
      {'price': '63905.62', 'size': '0.00583'},
      {'price': '63906.67', 'size': '0.0012'},
      {'price': '63908.44', 'size': '0.04301167'},
      {'price': '63909.53', 'size': '0.00001999'},
      {'price': '63909.95', 'size': '0.01320746'},
      {'price': '63911.2', 'size': '0.00316198'},
      {'price': '63914.04', 'size': '0.00562'},
      {'price': '63914.16', 'size': '0.17102007'},
      {'price': '63915.98', 'size': '0.2035214'},
      {'price': '63918.4', 'size': '1.6'},
      {'price': '63926.9', 'size': '0.01131481'},
      {'price': '63930.5', 'size': '0.00499992'},
      {'price': '63937.91', 'size': '0.08999326'},
      {'price': '63944', 'size': '0.05461653'},
      {'price': '63950', 'size': '0.0012'},
      {'price': '63957.06', 'size': '0.00462941'},
      {'price': '63970', 'size': '0.00850135'},
      {'price': '63976.5', 'size': '0.00040133'},
      {'price': '63979.86', 'size': '1.6'},
      {'price': '63980.84', 'size': '0.00053952'},
      {'price': '63985', 'size': '0.00001'},
      {'price': '63988', 'size': '0.4688379'},
      {'price': '63993.67', 'size': '0.0012'},
      {'price': '64000', 'size': '0.61541177'},
      {'price': '64001.95', 'size': '0.08990322'},
      {'price': '64009.65', 'size': '0.00647644'},
      {'price': '64014.95', 'size': '0.00333195'},
      {'price': '64020', 'size': '0.02358637'},
      {'price': '64030.17', 'size': '0.03650813'},
      {'price': '64034.79', 'size': '0.05492434'},
      {'price': '64037', 'size': '0.0012'},
      {'price': '64037.71', 'size': '0.00031544'},
      {'price': '64041.32', 'size': '1.6'},
      {'price': '64047.16', 'size': '0.18090276'},
      {'price': '64059.11', 'size': '0.00022355'},
      {'price': '64064.4', 'size': '0.00014464'},
      {'price': '64066', 'size': '0.07877157'},
      {'price': '64066.05', 'size': '0.08981328'},
      {'price': '64073.5', 'size': '0.15870787'},
      {'price': '64077.73', 'size': '0.00271674'},
      {'price': '64080', 'size': '0.1'},
      {'price': '64080.67', 'size': '0.0012'},
      {'price': '64085.99', 'size': '0.0001539'},
      {'price': '64092.95', 'size': '0.00005493'},
      {'price': '64093.2', 'size': '0.01060744'},
      {'price': '64093.38', 'size': '0.00081232'},
      {'price': '64096.9', 'size': '0.00015618'},
      {'price': '64099.31', 'size': '0.00039782'},
      {'price': '64102.99', 'size': '0.00008791'},
      {'price': '64120.2', 'size': '0.00583'},
      {'price': '64120.91', 'size': '0.00006209'},
      {'price': '64124', 'size': '0.0012'},
      {'price': '64124.3', 'size': '0.04678413'},
      {'price': '64130.08', 'size': '0.0001579'},
      {'price': '64130.2', 'size': '0.08972342'},
      {'price': '64134.12', 'size': '0.00027382'},
      {'price': '64135', 'size': '0.00009235'},
      {'price': '64137.55', 'size': '0.00000291'},
      {'price': '64137.87', 'size': '0.0006921'},
      {'price': '64139.12', 'size': '0.00137372'},
      {'price': '64144.69', 'size': '0.00054455'},
      {'price': '64150', 'size': '0.03350017'},
      {'price': '64167.72', 'size': '0.0012'},
      {'price': '64172.88', 'size': '0.00298157'},
      {'price': '64177.73', 'size': '0.00039615'},
      {'price': '64189.5', 'size': '0.00972313'},
      {'price': '64191.84', 'size': '0.00049955'},
      {'price': '64194.84', 'size': '0.00012117'},
      {'price': '64195', 'size': '0.00001'},
      {'price': '64195.13', 'size': '0.00035824'},
      {'price': '64197.17', 'size': '0.00003875'},
      {'price': '64198.03', 'size': '0.00024643'},
      {'price': '64200', 'size': '1.10771573'},
      {'price': '64207.01', 'size': '0.00316198'},
      {'price': '64211', 'size': '0.0012'},
      {'price': '64212.89', 'size': '0.00461097'},
      {'price': '64218', 'size': '0.0075'},
      {'price': '64221.53', 'size': '0.00006633'},
      {'price': '64221.8', 'size': '0.04851777'},
      {'price': '64224.48', 'size': '0.03639768'},
      {'price': '64228', 'size': '0.0019328'},
      {'price': '64230.41', 'size': '0.00001784'},
      {'price': '64236', 'size': '0.00018507'},
      {'price': '64243.16', 'size': '0.0018432'},
      {'price': '64244.79', 'size': '0.00009235'},
      {'price': '64249.18', 'size': '0.00022289'},
      {'price': '64250', 'size': '1.39403101'},
      {'price': '64254.72', 'size': '0.0012'},
      {'price': '64259.39', 'size': '0.00008057'},
      {'price': '64286.5', 'size': '0.00004244'},
      {'price': '64291.83', 'size': '0.00005476'},
      {'price': '64298', 'size': '0.0012'},
      {'price': '64300', 'size': '0.06093147'},
      {'price': '64300.92', 'size': '0.00481843'},
      {'price': '64302.24', 'size': '0.00007807'},
      {'price': '64304.08', 'size': '0.00001987'},
      {'price': '64305.46', 'size': '0.00000746'},
      {'price': '64307.32', 'size': '0.0001555'},
      {'price': '64316.6', 'size': '0.004'},
      {'price': '64320.66', 'size': '0.00014406'},
      {'price': '64334.67', 'size': '0.00583'},
      {'price': '64337', 'size': '0.00018642'},
      {'price': '64341.2', 'size': '0.00039632'},
      {'price': '64341.64', 'size': '0.00004349'},
      {'price': '64341.72', 'size': '0.0012'},
      {'price': '64344.98', 'size': '0.01057121'},
      {'price': '64350.29', 'size': '0.00015539'},
      {'price': '64353.57', 'size': '0.00040133'},
      {'price': '64354.56', 'size': '0.00009235'},
      {'price': '64354.66', 'size': '0.00000823'},
      {'price': '64358', 'size': '0.04'},
      {'price': '64361.11', 'size': '0.00479186'},
      {'price': '64380.18', 'size': '0.16943487'},
      {'price': '64381.16', 'size': '0.00258577'},
      {'price': '64381.34', 'size': '0.00000271'},
      {'price': '64383.19', 'size': '0.00956454'},
      {'price': '64385', 'size': '0.03226313'},
      {'price': '64385.83', 'size': '0.00000552'},
      {'price': '64386.02', 'size': '0.00008057'},
      {'price': '64387.5', 'size': '0.00009347'},
      {'price': '64390.75', 'size': '0.00019638'},
      {'price': '64393.12', 'size': '0.00945005'},
      {'price': '64393.54', 'size': '0.07438927'},
      {'price': '64396.56', 'size': '0.00001661'},
      {'price': '64400', 'size': '0.10498536'},
      {'price': '64402.02', 'size': '0.00015527'},
      {'price': '64411', 'size': '0.07792333'},
      {'price': '64415.93', 'size': '0.00080826'},
      {'price': '64418', 'size': '0.01'},
      {'price': '64419.32', 'size': '0.00004695'},
      {'price': '64419.38', 'size': '0.03628756'},
      {'price': '64419.69', 'size': '0.0000029'},
      {'price': '64422.97', 'size': '0.00049594'},
      {'price': '64426', 'size': '0.5'},
      {'price': '64426.84', 'size': '0.00002'},
      {'price': '64428.72', 'size': '0.0012'},
      {'price': '64429.25', 'size': '0.1'},
      {'price': '64434.47', 'size': '0.00079166'},
      {'price': '64438', 'size': '0.00018507'},
      {'price': '64439.82', 'size': '0.00022223'},
      {'price': '64440.29', 'size': '0.00003522'},
      {'price': '64442.08', 'size': '0.01371069'},
      {'price': '64442.6', 'size': '0.01626906'},
      {'price': '64444', 'size': '0.12357562'},
      {'price': '64445', 'size': '0.00001'},
      {'price': '64450', 'size': '2'},
      {'price': '64455.27', 'size': '0.00001303'},
      {'price': '64464.35', 'size': '0.00009235'},
      {'price': '64464.58', 'size': '0.00013017'},
      {'price': '64465', 'size': '0.005001'},
      {'price': '64466.99', 'size': '0.01'},
      {'price': '64467.05', 'size': '0.00243091'},
      {'price': '64469.42', 'size': '0.03133385'},
      {'price': '64469.74', 'size': '0.0045926'},
      {'price': '64469.92', 'size': '0.00007807'},
      {'price': '64472', 'size': '0.0012'},
      {'price': '64472.24', 'size': '0.00002311'},
      {'price': '64475', 'size': '0.97557192'},
      {'price': '64481.67', 'size': '0.00001333'},
      {'price': '64491.33', 'size': '0.00005459'},
      {'price': '64497', 'size': '0.01165279'},
      {'price': '64499.41', 'size': '0.0000044'},
      {'price': '64500', 'size': '30.56680207'},
      {'price': '64502.74', 'size': '0.00001333'},
      {'price': '64504.17', 'size': '0.01264792'},
      {'price': '64510.61', 'size': '0.0083'},
      {'price': '64512.89', 'size': '0.00008057'},
      {'price': '64514.65', 'size': '0.00036638'},
      {'price': '64515.38', 'size': '0.0004619'},
      {'price': '64515.66', 'size': '0.0007'},
      {'price': '64515.72', 'size': '0.0012'},
      {'price': '64515.86', 'size': '0.00035646'},
      {'price': '64518.09', 'size': '0.00002417'},
      {'price': '64518.8', 'size': '0.00006099'},
      {'price': '64523.47', 'size': '0.00007988'},
      {'price': '64523.48', 'size': '0.15118441'},
      {'price': '64528.95', 'size': '0.0000141'},
      {'price': '64532.96', 'size': '0.00396128'},
      {'price': '64535.04', 'size': '0.00562'},
      {'price': '64539', 'size': '0.00012543'},
      {'price': '64542.47', 'size': '0.00003819'},
      {'price': '64544.32', 'size': '0.00015493'},
      {'price': '64549.12', 'size': '0.00583'},
      {'price': '64550', 'size': '0.00030983'},
      {'price': '64550.74', 'size': '0.00001564'},
      {'price': '64551.46', 'size': '0.1'},
      {'price': '64554.06', 'size': '0.03206552'},
      {'price': '64555.1', 'size': '0.04851777'},
      {'price': '64557.93', 'size': '0.00296379'},
      {'price': '64559', 'size': '0.0012'},
      {'price': '64560.77', 'size': '0.0000491'},
      {'price': '64563.67', 'size': '0.0002458'},
      {'price': '64566', 'size': '0.00001662'},
      {'price': '64570', 'size': '0.01628525'},
      {'price': '64574.13', 'size': '0.00009235'},
      {'price': '64577.95', 'size': '0.00014349'},
      {'price': '64585.91', 'size': '0.29892784'},
      {'price': '64586.07', 'size': '0.00001563'},
      {'price': '64587.81', 'size': '0.00006164'},
      {'price': '64588.33', 'size': '0.0001801'},
      {'price': '64588.76', 'size': '0.00008791'},
      {'price': '64592.19', 'size': '0.1'},
      {'price': '64594.1', 'size': '0.0000534'},
      {'price': '64594.81', 'size': '0.00001563'},
      {'price': '64595.68', 'size': '0.09614028'},
      {'price': '64600', 'size': '1.46547481'},
      {'price': '64602.72', 'size': '0.0012'},
      {'price': '64605.97', 'size': '0.00010045'},
      {'price': '64610.02', 'size': '0.00001872'},
      {'price': '64610.2', 'size': '0.00154774'},
      {'price': '64614.87', 'size': '0.03617777'},
      {'price': '64615.05', 'size': '0.01052379'},
      {'price': '64618.06', 'size': '0.11443394'},
      {'price': '64627.6', 'size': '0.00183224'},
      {'price': '64631.03', 'size': '0.00022157'},
      {'price': '64633.48', 'size': '0.00001939'},
      {'price': '64638.03', 'size': '0.00007807'},
      {'price': '64638.32', 'size': '0.00002624'},
      {'price': '64640', 'size': '0.02494453'},
      {'price': '64646', 'size': '0.0012'},
      {'price': '64650', 'size': '0.04030935'},
      {'price': '64654.02', 'size': '0.00044789'},
      {'price': '64657.92', 'size': '0.00001871'},
      {'price': '64658', 'size': '0.00927959'},
      {'price': '64658.85', 'size': '0.01546578'},
      {'price': '64659.69', 'size': '0.00161443'},
      {'price': '64660.88', 'size': '0.00003847'},
      {'price': '64661.06', 'size': '1'},
      {'price': '64666', 'size': '0.02231961'},
      {'price': '64668.68', 'size': '0.00153154'},
      {'price': '64669.65', 'size': '0.00124834'},
      {'price': '64669.77', 'size': '0.00022602'},
      {'price': '64669.81', 'size': '1.91739427'},
      {'price': '64671.05', 'size': '0.0000005'},
      {'price': '64674.97', 'size': '0.00005427'},
      {'price': '64676.81', 'size': '0.00030204'},
      {'price': '64678.9', 'size': '0.00316713'},
      {'price': '64680.13', 'size': '0.00006416'},
      {'price': '64681.56', 'size': '0.00050923'},
      {'price': '64682.72', 'size': '0.02778607'},
      {'price': '64683.54', 'size': '0.02339018'},
      {'price': '64683.91', 'size': '0.00009235'},
      {'price': '64684.17', 'size': '0.00160239'},
      {'price': '64688.19', 'size': '0.0000289'},
      {'price': '64688.78', 'size': '0.00029388'},
      {'price': '64689', 'size': '0.01565'},
      {'price': '64689.72', 'size': '0.0012'},
      {'price': '64690.09', 'size': '0.00002581'},
      {'price': '64691', 'size': '0.00001549'},
      {'price': '64693.05', 'size': '0.00000618'},
      {'price': '64695', 'size': '0.00001'},
      {'price': '64695.18', 'size': '0.00166856'},
      {'price': '64695.55', 'size': '0.00003122'},
      {'price': '64697.46', 'size': '0.00417941'},
      {'price': '64698.99', 'size': '0.00005732'},
      {'price': '64700', 'size': '10.90841805'},
      {'price': '64700.15', 'size': '0.01545591'},
      {'price': '64700.6', 'size': '0.00006099'},
      {'price': '64701', 'size': '0.0026'},
      {'price': '64701.07', 'size': '0.00001974'},
      {'price': '64703.06', 'size': '0.00000288'},
      {'price': '64707.31', 'size': '0.00007727'},
      {'price': '64713.02', 'size': '0.0002'},
      {'price': '64713.79', 'size': '0.00020222'},
      {'price': '64713.94', 'size': '0.00000001'},
      {'price': '64718', 'size': '1'},
      {'price': '64718.35', 'size': '0.00010877'},
      {'price': '64719.77', 'size': '0.00000001'},
      {'price': '64721.74', 'size': '0.00463522'},
      {'price': '64723.36', 'size': '0.00001159'},
      {'price': '64724.39', 'size': '0.00004874'},
      {'price': '64725', 'size': '0.00157589'},
      {'price': '64726.24', 'size': '0.00000002'},
      {'price': '64727', 'size': '0.0367'},
      {'price': '64727.27', 'size': '0.00013662'},
      {'price': '64727.62', 'size': '0.0045743'},
      {'price': '64727.77', 'size': '0.00010983'},
      {'price': '64728.94', 'size': '0.03760874'},
      {'price': '64729.54', 'size': '0.00006689'},
      {'price': '64729.85', 'size': '0.0000005'},
      {'price': '64730.64', 'size': '0.00040133'},
      {'price': '64733.65', 'size': '0.00510779'},
      {'price': '64734.51', 'size': '0.00017606'},
      {'price': '64736.22', 'size': '0.00048225'},
      {'price': '64738.16', 'size': '0.00001421'},
      {'price': '64738.19', 'size': '0.01573465'},
      {'price': '64739.99', 'size': '0.00007163'},
      {'price': '64740', 'size': '0.15'},
      {'price': '64740.11', 'size': '0.00080421'},
      {'price': '64741', 'size': '0.02673566'},
      {'price': '64741.13', 'size': '0.00008072'},
      {'price': '64742.62', 'size': '0.00007859'},
      {'price': '64744.94', 'size': '0.0012'},
      {'price': '64745', 'size': '0.05'},
      {'price': '64746.36', 'size': '0.02927531'},
      {'price': '64747', 'size': '1.7414587'},
      {'price': '64747.19', 'size': '0.00000664'},
      {'price': '64749.68', 'size': '0.00308881'},
      {'price': '64750', 'size': '1.18372957'},
      {'price': '64751.67', 'size': '0.00154436'},
      {'price': '64755.98', 'size': '0.464'},
      {'price': '64759.7', 'size': '0.00123534'},
      {'price': '64760.43', 'size': '0.00004797'},
      {'price': '64761.09', 'size': '0.00021636'},
      {'price': '64761.62', 'size': '0.02362764'},
      {'price': '64762.59', 'size': '0.00023099'},
      {'price': '64762.91', 'size': '0.00051842'},
      {'price': '64763.44', 'size': '0.01525986'},
      {'price': '64764.78', 'size': '0.0002'},
      {'price': '64766.43', 'size': '0.00329329'},
      {'price': '64768.32', 'size': '0.00013633'},
      {'price': '64770.48', 'size': '0.00001142'},
      {'price': '64776.72', 'size': '0.0012'},
      {'price': '64777', 'size': '0.03406896'},
      {'price': '64778.38', 'size': '0.00001481'},
      {'price': '64778.53', 'size': '0.00316713'},
      {'price': '64781.81', 'size': '0.9395'},
      {'price': '64785', 'size': '0.02749621'},
      {'price': '64787.96', 'size': '0.00005432'},
      {'price': '64788', 'size': '0.01125'},
      {'price': '64788.88', 'size': '0.05'},
      {'price': '64791.74', 'size': '0.00000789'},
      {'price': '64793.19', 'size': '0.00011001'},
      {'price': '64793.59', 'size': '0.01543362'},
      {'price': '64793.69', 'size': '0.00009235'},
      {'price': '64794.65', 'size': '0.00001512'},
      {'price': '64797', 'size': '1'},
      {'price': '64797.28', 'size': '0.01201366'},
      {'price': '64797.58', 'size': '0.01543267'},
      {'price': '64799.99', 'size': '0.0000003'},
      {'price': '64800', 'size': '10.45882983'},
      {'price': '64800.68', 'size': '0.0000534'},
      {'price': '64803.38', 'size': '0.00003225'},
      {'price': '64803.95', 'size': '0.07519675'},
      {'price': '64804.9', 'size': '0.0001223'},
      {'price': '64806.58', 'size': '0.00007807'},
      {'price': '64810', 'size': '0.00771485'},
      {'price': '64810.95', 'size': '0.0359592'},
      {'price': '64811', 'size': '0.005'},
      {'price': '64811.2', 'size': '0.00308588'},
      {'price': '64811.7', 'size': '0.00028846'},
      {'price': '64812.5', 'size': '0.0002896'},
      {'price': '64814.91', 'size': '1.5'},
      {'price': '64815.18', 'size': '0.00003147'},
      {'price': '64815.67', 'size': '0.00001234'},
      {'price': '64816.55', 'size': '0.00176111'},
      {'price': '64820', 'size': '0.0012'},
      {'price': '64820.43', 'size': '0.00214501'},
      {'price': '64821.32', 'size': '0.00475784'},
      {'price': '64822.01', 'size': '0.0006913'},
      {'price': '64822.7', 'size': '0.00679873'},
      {'price': '64822.8', 'size': '0.00022092'},
      {'price': '64824.97', 'size': '0.00039337'},
      {'price': '64825.71', 'size': '0.00038565'},
      {'price': '64827.11', 'size': '0.00002159'},
      {'price': '64829.09', 'size': '0.01542517'},
      {'price': '64829.3', 'size': '0.00007394'},
      {'price': '64830.33', 'size': '0.00003223'},
      {'price': '64830.41', 'size': '0.00001766'},
      {'price': '64831.06', 'size': '0.00000001'},
      {'price': '64831.26', 'size': '0.00000001'},
      {'price': '64832', 'size': '0.00308489'},
      {'price': '64833.05', 'size': '0.0000812'},
      {'price': '64833.55', 'size': '0.00154241'},
      {'price': '64834.46', 'size': '0.00000004'},
      {'price': '64834.74', 'size': '0.00000003'},
      {'price': '64836.27', 'size': '0.00014291'},
      {'price': '64838.18', 'size': '0.00035469'},
      {'price': '64838.71', 'size': '0.00010208'},
      {'price': '64839.7', 'size': '0.02386751'},
      {'price': '64839.72', 'size': '0.00003377'},
      {'price': '64841', 'size': '0.00010298'},
      {'price': '64841.09', 'size': '0.00001596'},
      {'price': '64842', 'size': '0.00089154'},
      {'price': '64842.78', 'size': '0.00000001'},
      {'price': '64843.03', 'size': '0.00032607'},
      {'price': '64845.58', 'size': '0.0000293'},
      {'price': '64847.21', 'size': '0.00001372'},
      {'price': '64850', 'size': '0.05'},
      {'price': '64851.42', 'size': '0.00003555'},
      {'price': '64853.18', 'size': '0.0000683'},
      {'price': '64855', 'size': '0.51839264'},
      {'price': '64855.64', 'size': '0.00002482'},
      {'price': '64857.64', 'size': '0.00126773'},
      {'price': '64859.23', 'size': '0.00115635'},
      {'price': '64863.72', 'size': '0.0012'},
      {'price': '64863.81', 'size': '0.01048487'},
      {'price': '64865', 'size': '0.0012538'},
      {'price': '64866', 'size': '0.0019315'},
      {'price': '64867.92', 'size': '0.00770797'},
      {'price': '64867.97', 'size': '0.00003437'},
      {'price': '64870', 'size': '0.5'},
      {'price': '64870.26', 'size': '0.00266932'},
      {'price': '64870.72', 'size': '0.00206487'},
      {'price': '64876.41', 'size': '0.2'},
      {'price': '64878.31', 'size': '0.00316713'},
      {'price': '64878.74', 'size': '0.00000001'},
      {'price': '64882.35', 'size': '0.00003514'},
      {'price': '64882.4', 'size': '0.00006099'},
      {'price': '64883.15', 'size': '0.0017593'},
      {'price': '64887.29', 'size': '0.00308226'},
      {'price': '64888', 'size': '0.29780558'},
      {'price': '64888.4', 'size': '0.04851777'},
      {'price': '64890', 'size': '0.19353997'},
      {'price': '64892.41', 'size': '0.00014037'},
      {'price': '64892.5', 'size': '0.00004007'},
      {'price': '64896.3', 'size': '0.00004853'},
      {'price': '64898.05', 'size': '0.00005007'},
      {'price': '64899', 'size': '0.07704278'},
      {'price': '64899.9', 'size': '0.00100959'},
      {'price': '64900', 'size': '10.18730557'},
      {'price': '64902', 'size': '0.00392'},
      {'price': '64903.12', 'size': '0.00019483'},
      {'price': '64903.48', 'size': '0.00009235'},
      {'price': '64903.71', 'size': '0.00007704'},
      {'price': '64907', 'size': '0.0012'},
      {'price': '64910.61', 'size': '0.00077029'},
      {'price': '64917.78', 'size': '0.02410982'},
      {'price': '64920', 'size': '0.025'},
      {'price': '64924', 'size': '0.0042'},
      {'price': '64925', 'size': '0.02887102'},
      {'price': '64926.79', 'size': '0.0000005'},
      {'price': '64928.32', 'size': '0.00005412'},
      {'price': '64932.12', 'size': '0.00013003'},
      {'price': '64933.67', 'size': '0.00228461'},
      {'price': '64934.99', 'size': '0.2610105'},
      {'price': '64935.49', 'size': '0.00000001'},
      {'price': '64941.06', 'size': '0.00030215'},
      {'price': '64942.92', 'size': '0.00095512'},
      {'price': '64945.27', 'size': '0.00294611'},
      {'price': '64946', 'size': '0.05'},
      {'price': '64950', 'size': '3.84631431'},
      {'price': '64950.4', 'size': '0.00000001'},
      {'price': '64950.72', 'size': '0.0012'},
      {'price': '64951.66', 'size': '0.11525953'},
      {'price': '64955', 'size': '0.50153952'},
      {'price': '64960', 'size': '0.0063439'},
      {'price': '64961.01', 'size': '0.00035559'},
      {'price': '64964.39', 'size': '0.01231376'},
      {'price': '64964.5', 'size': '0.00150081'},
      {'price': '64967.09', 'size': '0.00003894'},
      {'price': '64972.64', 'size': '0.00087771'},
      {'price': '64973.15', 'size': '0.0000005'},
      {'price': '64974', 'size': '0.01608699'},
      {'price': '64975.57', 'size': '0.00007807'},
      {'price': '64976.15', 'size': '0.00001899'},
      {'price': '64977.95', 'size': '0.00175674'},
      {'price': '64978.25', 'size': '0.00316713'},
      {'price': '64980', 'size': '0.00007694'},
      {'price': '64984.97', 'size': '0.00153881'},
      {'price': '64985', 'size': '0.07601338'},
      {'price': '64986.53', 'size': '0.00455607'},
      {'price': '64986.7', 'size': '0.00002584'},
      {'price': '64987.54', 'size': '0.02363068'},
      {'price': '64987.69', 'size': '0.00000287'},
      {'price': '64988', 'size': '0.000022'},
      {'price': '64988.17', 'size': '0.00652749'},
      {'price': '64989', 'size': '0.0000006'},
      {'price': '64989.23', 'size': '0.00046742'},
      {'price': '64994', 'size': '0.0012'},
      {'price': '64994.4', 'size': '0.0039136'},
      {'price': '64994.55', 'size': '0.00212351'},
      {'price': '64995.65', 'size': '0.00022488'},
      {'price': '64995.86', 'size': '0.02435459'},
      {'price': '64999', 'size': '0.61586637'},
      {'price': '65000', 'size': '39.06643542'},
      {'price': '65000.01', 'size': '0.00781538'},
      {'price': '65000.6', 'size': '0.00945005'},
      {'price': '65001', 'size': '0.07795375'},
      {'price': '65002', 'size': '0.06860243'},
      {'price': '65003', 'size': '0.06884149'},
      {'price': '65003.6', 'size': '0.00003819'},
      {'price': '65004', 'size': '0.07525814'},
      {'price': '65005', 'size': '0.07757671'},
      {'price': '65006', 'size': '0.05996067'},
      {'price': '65007', 'size': '0.05936106'},
      {'price': '65007.28', 'size': '0.0000534'},
      {'price': '65007.63', 'size': '0.0358504'},
      {'price': '65008', 'size': '0.05855607'},
      {'price': '65008.25', 'size': '0.00076913'},
      {'price': '65008.65', 'size': '0.0000463'},
      {'price': '65013.27', 'size': '0.00009235'},
      {'price': '65014.32', 'size': '0.00182134'},
      {'price': '65015.13', 'size': '0.00022026'},
      {'price': '65018', 'size': '0.01125'},
      {'price': '65020.2', 'size': '0.00076899'},
      {'price': '65021.33', 'size': '0.00005704'},
      {'price': '65023.55', 'size': '0.05642571'},
      {'price': '65026.65', 'size': '0.01332708'},
      {'price': '65027.02', 'size': '0.00846033'},
      {'price': '65027.6', 'size': '0.00062419'},
      {'price': '65028.35', 'size': '0.00009413'},
      {'price': '65029.62', 'size': '0.00000001'},
      {'price': '65031.41', 'size': '0.00113648'},
      {'price': '65032.13', 'size': '0.03075402'},
      {'price': '65032.34', 'size': '0.07'},
      {'price': '65034.12', 'size': '0.0000478'},
      {'price': '65035.48', 'size': '0.00000001'},
      {'price': '65035.56', 'size': '0.05511752'},
      {'price': '65037.78', 'size': '0.0012'},
      {'price': '65038.6', 'size': '0.00013556'},
      {'price': '65040', 'size': '0.19225903'},
      {'price': '65040.27', 'size': '0.0010897'},
      {'price': '65040.45', 'size': '0.00000002'},
      {'price': '65040.58', 'size': '0.03915492'},
      {'price': '65044', 'size': '0.00010247'},
      {'price': '65045.08', 'size': '0.00002152'},
      {'price': '65047.72', 'size': '0.00015831'},
      {'price': '65050', 'size': '0.06830105'},
      {'price': '65051.01', 'size': '0.00028279'},
      {'price': '65051.51', 'size': '0.02060866'},
      {'price': '65052.05', 'size': '0.059542'},
      {'price': '65053.99', 'size': '0.01474245'},
      {'price': '65054.7', 'size': '0.00006119'},
      {'price': '65064.2', 'size': '0.00006099'},
      {'price': '65065.92', 'size': '0.00080018'},
      {'price': '65066.26', 'size': '0.00099461'},
      {'price': '65066.85', 'size': '0.0003919'},
      {'price': '65068.21', 'size': '0.00016144'},
      {'price': '65073.94', 'size': '0.02460184'},
      {'price': '65078.2', 'size': '0.00008791'},
      {'price': '65078.35', 'size': '0.00316713'},
      {'price': '65081', 'size': '0.0012'},
      {'price': '65081.35', 'size': '0.05'},
      {'price': '65087.76', 'size': '0.00020727'},
      {'price': '65088', 'size': '0.008855'},
      {'price': '65088.66', 'size': '0.00034471'},
      {'price': '65089.33', 'size': '0.00125129'},
      {'price': '65095.06', 'size': '0.00012252'},
      {'price': '65095.61', 'size': '0.00014234'},
      {'price': '65100', 'size': '10.07403843'},
      {'price': '65100.51', 'size': '0.00001962'},
      {'price': '65103.19', 'size': '0.00153602'},
      {'price': '65104.83', 'size': '0.03071968'},
      {'price': '65105', 'size': '0.00002319'},
      {'price': '65107.72', 'size': '0.00040133'},
      {'price': '65115.44', 'size': '0.00000446'},
      {'price': '65116.54', 'size': '0.03102245'},
      {'price': '65117.95', 'size': '0.02451976'},
      {'price': '65119.55', 'size': '0.00007656'},
      {'price': '65119.91', 'size': '0.00040981'},
      {'price': '65120', 'size': '0.02887103'},
      {'price': '65123.04', 'size': '0.00009235'},
      {'price': '65124', 'size': '0.00001819'},
      {'price': '65124.78', 'size': '0.0012'},
      {'price': '65127.94', 'size': '0.00003819'},
      {'price': '65131.28', 'size': '0.0076768'},
      {'price': '65132.94', 'size': '0.01078537'},
      {'price': '65133.82', 'size': '0.0002'},
      {'price': '65141.64', 'size': '0.00004289'},
      {'price': '65141.72', 'size': '0.00001538'},
      {'price': '65143.38', 'size': '0.00007675'},
      {'price': '65144.26', 'size': '0.00000001'},
      {'price': '65145', 'size': '0.01507698'},
      {'price': '65146.36', 'size': '0.01608394'},
      {'price': '65147.23', 'size': '0.0012328'},
      {'price': '65147.51', 'size': '0.00000001'},
      {'price': '65147.67', 'size': '0.00000004'},
      {'price': '65147.95', 'size': '0.00000003'},
      {'price': '65150', 'size': '0.00066893'},
      {'price': '65150.35', 'size': '0.0000005'},
      {'price': '65151', 'size': '0.001'},
      {'price': '65152.02', 'size': '0.0248516'},
      {'price': '65155.07', 'size': '0.00015348'},
      {'price': '65156.03', 'size': '0.00000001'},
      {'price': '65162.12', 'size': '0.00035292'},
      {'price': '65162.71', 'size': '0.01280885'},
      {'price': '65164', 'size': '0.00321781'},
      {'price': '65166.43', 'size': '0.00032263'},
      {'price': '65168', 'size': '0.0012'},
      {'price': '65172.99', 'size': '0.00767188'},
      {'price': '65178.52', 'size': '0.00176362'},
      {'price': '65178.59', 'size': '0.00316713'},
      {'price': '65180.31', 'size': '0.00001534'},
      {'price': '65184.22', 'size': '0.00084704'},
      {'price': '65186.36', 'size': '0.06596472'},
      {'price': '65190', 'size': '2.89'},
      {'price': '65193.69', 'size': '0.00000001'},
      {'price': '65198', 'size': '5'},
      {'price': '65199', 'size': '0.00001688'},
      {'price': '65200', 'size': '4.73664999'},
      {'price': '65200.55', 'size': '0.00003098'},
      {'price': '65200.57', 'size': '0.07438927'},
      {'price': '65204.9', 'size': '0.03574194'},
      {'price': '65205', 'size': '0.00001706'},
      {'price': '65205.67', 'size': '0.00015336'},
      {'price': '65208.04', 'size': '0.00021961'},
      {'price': '65211.78', 'size': '0.0012'},
      {'price': '65213', 'size': '0.0075'},
      {'price': '65213.86', 'size': '0.0000534'},
      {'price': '65216.57', 'size': '0.00045693'},
      {'price': '65218.57', 'size': '0.07666528'},
      {'price': '65220.15', 'size': '0.0001385'},
      {'price': '65221.7', 'size': '0.04851777'},
      {'price': '65225', 'size': '0.111'},
      {'price': '65225.91', 'size': '0.00123114'},
      {'price': '65229', 'size': '0.12033105'},
      {'price': '65230', 'size': '0.01533036'},
      {'price': '65230.1', 'size': '0.0251039'},
      {'price': '65232.41', 'size': '0.00158925'},
      {'price': '65232.83', 'size': '0.00009235'},
      {'price': '65234.84', 'size': '0.00011529'},
      {'price': '65235.25', 'size': '0.01619774'},
      {'price': '65235.33', 'size': '0.00020962'},
      {'price': '65238', 'size': '0.00012691'},
      {'price': '65238.13', 'size': '0.01042649'},
      {'price': '65243.19', 'size': '0.0000469'},
      {'price': '65246', 'size': '0.00020143'},
      {'price': '65246.48', 'size': '0.00453792'},
      {'price': '65248.99', 'size': '0.00314181'},
      {'price': '65249.18', 'size': '0.00000001'},
      {'price': '65250', 'size': '4.08882273'},
      {'price': '65252.25', 'size': '0.00400633'},
      {'price': '65252.98', 'size': '0.00392688'},
      {'price': '65255', 'size': '0.03951124'},
      {'price': '65257.5', 'size': '0.02235246'},
      {'price': '65259.81', 'size': '0.03870204'},
      {'price': '65263.09', 'size': '0.00008007'},
      {'price': '65263.38', 'size': '0.00001535'},
      {'price': '65263.55', 'size': '0.00306449'},
      {'price': '65263.79', 'size': '0.00022375'},
      {'price': '65264.17', 'size': '0.00000001'},
      {'price': '65266.58', 'size': '0.00038954'},
      {'price': '65267', 'size': '1.563'},
      {'price': '65273.56', 'size': '0.00000286'},
      {'price': '65274.25', 'size': '0.00001149'},
      {'price': '65275', 'size': '0.05'},
      {'price': '65279', 'size': '0.00316713'},
      {'price': '65280', 'size': '0.01251629'},
      {'price': '65281.21', 'size': '0.00030432'},
      {'price': '65282.5', 'size': '0.00499384'},
      {'price': '65284.06', 'size': '0.00017686'},
      {'price': '65284.81', 'size': '0.00160647'},
      {'price': '65284.82', 'size': '0.00472406'},
      {'price': '65285', 'size': '0.01366911'},
      {'price': '65295.89', 'size': '0.00032199'},
      {'price': '65295.92', 'size': '0.00000766'},
      {'price': '65296.91', 'size': '0.00003245'},
      {'price': '65298.78', 'size': '0.0012'},
      {'price': '65300', 'size': '2.02273641'},
      {'price': '65305', 'size': '0.00003062'},
      {'price': '65308.18', 'size': '0.02535876'},
      {'price': '65308.73', 'size': '0.00039045'},
      {'price': '65310.04', 'size': '0.0000005'},
      {'price': '65310.16', 'size': '0.00145493'},
      {'price': '65310.95', 'size': '0.09220314'},
      {'price': '65315', 'size': '0.02944845'},
      {'price': '65319', 'size': '0.00344463'},
      {'price': '65319.69', 'size': '0.01475446'},
      ...],
     'bids': [{'price': '63033.89', 'size': '0.36320277'},
      {'price': '63033.88', 'size': '0.03'},
      {'price': '63033.86', 'size': '0.03'},
      {'price': '63033.8', 'size': '0.00079322'},
      {'price': '63032.01', 'size': '0.11820631'},
      {'price': '63032', 'size': '0.0815'},
      {'price': '63031.75', 'size': '0.12692014'},
      {'price': '63030.72', 'size': '0.10563185'},
      {'price': '63030.71', 'size': '0.09541977'},
      {'price': '63030.15', 'size': '0.000018'},
      {'price': '63030', 'size': '0.0815'},
      {'price': '63028.12', 'size': '0.20574154'},
      {'price': '63028.11', 'size': '0.027597'},
      {'price': '63028', 'size': '0.0815'},
      {'price': '63027.84', 'size': '0.09541977'},
      {'price': '63026.58', 'size': '0.06'},
      {'price': '63026.2', 'size': '0.000018'},
      {'price': '63025', 'size': '0.01'},
      {'price': '63024.76', 'size': '0.19412352'},
      {'price': '63024.75', 'size': '0.09541977'},
      {'price': '63024.28', 'size': '0.0007932'},
      {'price': '63024', 'size': '0.0857'},
      {'price': '63022.31', 'size': '0.09541977'},
      {'price': '63022.25', 'size': '0.000018'},
      {'price': '63022.12', 'size': '0.04781428'},
      {'price': '63022.01', 'size': '0.24818865'},
      {'price': '63022', 'size': '0.0857'},
      {'price': '63020.54', 'size': '0.03975824'},
      {'price': '63020.2', 'size': '0.0952022'},
      {'price': '63020', 'size': '0.0957'},
      {'price': '63019.07', 'size': '0.00794908'},
      {'price': '63019.06', 'size': '0.09541977'},
      {'price': '63018.98', 'size': '0.00394391'},
      {'price': '63018.7', 'size': '0.04304949'},
      {'price': '63018.3', 'size': '0.000018'},
      {'price': '63018.01', 'size': '0.64263091'},
      {'price': '63018', 'size': '1'},
      {'price': '63016.89', 'size': '0.0557021'},
      {'price': '63016.86', 'size': '0.459951'},
      {'price': '63016.66', 'size': '0.14357031'},
      {'price': '63016.6', 'size': '0.05818108'},
      {'price': '63016.51', 'size': '0.09541977'},
      {'price': '63015.89', 'size': '0.28203227'},
      {'price': '63015.3', 'size': '0.05453258'},
      {'price': '63015.29', 'size': '0.01984869'},
      {'price': '63015.19', 'size': '0.00592'},
      {'price': '63015.02', 'size': '0.03975824'},
      {'price': '63015', 'size': '0.01'},
      {'price': '63014.4', 'size': '0.0000238'},
      {'price': '63014.35', 'size': '0.000018'},
      {'price': '63013.83', 'size': '0.09541977'},
      {'price': '63012.7', 'size': '0.01577563'},
      {'price': '63012.3', 'size': '0.0000841'},
      {'price': '63012.03', 'size': '0.00583'},
      {'price': '63011.79', 'size': '0.15904213'},
      {'price': '63011.78', 'size': '0.09541977'},
      {'price': '63011.51', 'size': '0.00107082'},
      {'price': '63010.4', 'size': '0.000018'},
      {'price': '63010', 'size': '0.01003186'},
      {'price': '63009.8', 'size': '0.09541977'},
      {'price': '63009.62', 'size': '0.02468377'},
      {'price': '63009.46', 'size': '0.03975824'},
      {'price': '63008.98', 'size': '0.04781428'},
      {'price': '63007.78', 'size': '0.15364397'},
      {'price': '63007.77', 'size': '0.09541977'},
      {'price': '63007.74', 'size': '0.00198388'},
      {'price': '63007.58', 'size': '0.00793555'},
      {'price': '63007.34', 'size': '0.00793558'},
      {'price': '63006.89', 'size': '0.06'},
      {'price': '63006.49', 'size': '0.08'},
      {'price': '63006.45', 'size': '0.000018'},
      {'price': '63006.31', 'size': '0.00006234'},
      {'price': '63005.8', 'size': '0.12236431'},
      {'price': '63005.65', 'size': '0.00012468'},
      {'price': '63005', 'size': '0.01'},
      {'price': '63004.33', 'size': '0.03155127'},
      {'price': '63003.2', 'size': '0.03975824'},
      {'price': '63003.06', 'size': '0.04781428'},
      {'price': '63002.5', 'size': '0.000018'},
      {'price': '63002.34', 'size': '0.00024937'},
      {'price': '63000.55', 'size': '0.00316663'},
      {'price': '63000.35', 'size': '0.00162603'},
      {'price': '63000', 'size': '0.01'},
      {'price': '62999.53', 'size': '0.01997891'},
      {'price': '62999.52', 'size': '0.29991277'},
      {'price': '62999.48', 'size': '0.07004154'},
      {'price': '62998.55', 'size': '0.000018'},
      {'price': '62998.01', 'size': '0.03975824'},
      {'price': '62997.75', 'size': '0.04781428'},
      {'price': '62995.72', 'size': '0.00049873'},
      {'price': '62995.49', 'size': '0.0000238'},
      {'price': '62995.02', 'size': '0.00158507'},
      {'price': '62995', 'size': '0.01'},
      {'price': '62994.6', 'size': '0.000018'},
      {'price': '62993.88', 'size': '0.00079308'},
      {'price': '62993.87', 'size': '0.03943909'},
      {'price': '62992.81', 'size': '0.66397059'},
      {'price': '62992.8', 'size': '0.03975824'},
      {'price': '62991.37', 'size': '0.24267485'},
      {'price': '62990.97', 'size': '0.04781428'},
      {'price': '62990.65', 'size': '0.000018'},
      {'price': '62990', 'size': '0.01'},
      {'price': '62988.72', 'size': '0.00792535'},
      {'price': '62988.09', 'size': '0.06939221'},
      {'price': '62987.45', 'size': '0.00062341'},
      {'price': '62986.7', 'size': '0.000018'},
      {'price': '62985.44', 'size': '0.23304997'},
      {'price': '62985.43', 'size': '0.25380631'},
      {'price': '62985', 'size': '0.01'},
      {'price': '62984.99', 'size': '0.03975824'},
      {'price': '62984.35', 'size': '0.07887817'},
      {'price': '62983.3', 'size': '0.02855587'},
      {'price': '62983.29', 'size': '0.04781428'},
      {'price': '62982.75', 'size': '0.000018'},
      {'price': '62980.48', 'size': '0.00277864'},
      {'price': '62978.8', 'size': '0.000018'},
      {'price': '62978.63', 'size': '0.56780418'},
      {'price': '62978.17', 'size': '0.06818887'},
      {'price': '62977.59', 'size': '0.08757252'},
      {'price': '62976.83', 'size': '1.42909684'},
      {'price': '62976.59', 'size': '0.00482083'},
      {'price': '62976.58', 'size': '0.0000238'},
      {'price': '62974.85', 'size': '0.000018'},
      {'price': '62974.7', 'size': '0.00245906'},
      {'price': '62970.99', 'size': '0.99687506'},
      {'price': '62970.98', 'size': '0.237875'},
      {'price': '62970.92', 'size': '0.00124683'},
      {'price': '62970.9', 'size': '0.000018'},
      {'price': '62969.11', 'size': '0.00150554'},
      {'price': '62968.37', 'size': '0.06580204'},
      {'price': '62968.36', 'size': '0.06965192'},
      {'price': '62967.51', 'size': '0.00079302'},
      {'price': '62967.5', 'size': '0.03975824'},
      {'price': '62966.95', 'size': '0.000018'},
      {'price': '62963.76', 'size': '0.85415299'},
      {'price': '62963.75', 'size': '1.42939387'},
      {'price': '62963', 'size': '0.000018'},
      {'price': '62960.43', 'size': '0.001904'},
      {'price': '62959.05', 'size': '0.000018'},
      {'price': '62957.67', 'size': '0.0000238'},
      {'price': '62957.4', 'size': '0.01061683'},
      {'price': '62957', 'size': '0.01116334'},
      {'price': '62956.62', 'size': '1.38084443'},
      {'price': '62955.1', 'size': '0.000018'},
      {'price': '62952.47', 'size': '0.09859772'},
      {'price': '62952.09', 'size': '0.01331'},
      {'price': '62951.64', 'size': '2.23854834'},
      {'price': '62951.63', 'size': '1.235891'},
      {'price': '62950.65', 'size': '1.42969114'},
      {'price': '62950.24', 'size': '0.00155853'},
      {'price': '62949.02', 'size': '0.00356972'},
      {'price': '62947.2', 'size': '0.000018'},
      {'price': '62945', 'size': '3'},
      {'price': '62944.44', 'size': '0.0108863'},
      {'price': '62938.76', 'size': '0.0000238'},
      {'price': '62937.88', 'size': '1.42998135'},
      {'price': '62937.76', 'size': '0.2999'},
      {'price': '62934.93', 'size': '5.258804'},
      {'price': '62932.09', 'size': '0.00019528'},
      {'price': '62931.88', 'size': '0.01112167'},
      {'price': '62931.4', 'size': '0.000018'},
      {'price': '62925.44', 'size': '0.00187024'},
      {'price': '62925', 'size': '0.05'},
      {'price': '62924.91', 'size': '1.43027616'},
      {'price': '62921.09', 'size': '0.11831726'},
      {'price': '62919.85', 'size': '0.0000238'},
      {'price': '62919.32', 'size': '0.01103176'},
      {'price': '62918.6', 'size': '10.308493'},
      {'price': '62917.72', 'size': '0.00031724'},
      {'price': '62915.6', 'size': '0.000018'},
      {'price': '62912.32', 'size': '0.00031728'},
      {'price': '62911.86', 'size': '1.43057279'},
      {'price': '62909.51', 'size': '0.09135466'},
      {'price': '62903.74', 'size': '0.0000157'},
      {'price': '62901.92', 'size': '0.237976'},
      {'price': '62899.8', 'size': '0.000018'},
      {'price': '62898.86', 'size': '1.43086846'},
      {'price': '62897.2', 'size': '10.056939'},
      {'price': '62894.19', 'size': '0.04364'},
      {'price': '62893.28', 'size': '0.00022445'},
      {'price': '62892.3', 'size': '0.04364'},
      {'price': '62887.98', 'size': '0.00159012'},
      {'price': '62887.84', 'size': '0.23958468'},
      {'price': '62886.13', 'size': '1.43115802'},
      {'price': '62885.36', 'size': '0.23958468'},
      {'price': '62884.38', 'size': '0.23958468'},
      {'price': '62884', 'size': '0.000018'},
      {'price': '62880.04', 'size': '0.00000011'},
      {'price': '62873.59', 'size': '0.00285573'},
      {'price': '62873.24', 'size': '1.43145139'},
      {'price': '62868.2', 'size': '0.000018'},
      {'price': '62862.65', 'size': '0.03'},
      {'price': '62861.21', 'size': '3.27683776'},
      {'price': '62860.82', 'size': '0.00742734'},
      {'price': '62860.76', 'size': '0.03'},
      {'price': '62860.56', 'size': '1.43174015'},
      {'price': '62854.63', 'size': '0.00031724'},
      {'price': '62852.4', 'size': '0.000018'},
      {'price': '62852.28', 'size': '0.00827862'},
      {'price': '62849.23', 'size': '0.00031728'},
      {'price': '62847.61', 'size': '1.43203525'},
      {'price': '62846.57', 'size': '0.09144615'},
      {'price': '62839.76', 'size': '0.03'},
      {'price': '62834.77', 'size': '1.43232779'},
      {'price': '62834.54', 'size': '0.023794'},
      {'price': '62834.49', 'size': '10.910353'},
      {'price': '62831.12', 'size': '0.04364'},
      {'price': '62829.23', 'size': '0.01364'},
      {'price': '62828.71', 'size': '0.0003909'},
      {'price': '62824.56', 'size': '0.00275524'},
      {'price': '62823.57', 'size': '0.00000336'},
      {'price': '62822.21', 'size': '1.43261432'},
      {'price': '62821.04', 'size': '0.00336969'},
      {'price': '62820.1', 'size': '0.00150322'},
      {'price': '62808.72', 'size': '1.43292195'},
      {'price': '62807.63', 'size': '0.28860807'},
      {'price': '62805.8', 'size': '0.05'},
      {'price': '62804.99', 'size': '0.00500051'},
      {'price': '62800.89', 'size': '0.00314645'},
      {'price': '62800', 'size': '0.00012662'},
      {'price': '62798.96', 'size': '0.23958468'},
      {'price': '62797.38', 'size': '0.00499997'},
      {'price': '62796.82', 'size': '0.00583'},
      {'price': '62796.06', 'size': '1.43321082'},
      {'price': '62794.93', 'size': '0.00220659'},
      {'price': '62792', 'size': '0.1'},
      {'price': '62791.54', 'size': '0.00031724'},
      {'price': '62786.14', 'size': '0.00031728'},
      {'price': '62786', 'size': '0.0001343'},
      {'price': '62785.54', 'size': '0.04364'},
      {'price': '62783.7', 'size': '0.09153772'},
      {'price': '62783.44', 'size': '1.43349889'},
      {'price': '62778.12', 'size': '14.024456'},
      {'price': '62776.02', 'size': '1.4336683'},
      {'price': '62768.05', 'size': '0.01364'},
      {'price': '62767.97', 'size': '0.00052534'},
      {'price': '62761.3', 'size': '0.28860807'},
      {'price': '62760.85', 'size': '0.00158378'},
      {'price': '62758.43', 'size': '0.01'},
      {'price': '62750.66', 'size': '1.6'},
      {'price': '62740.34', 'size': '0.00002024'},
      {'price': '62739.73', 'size': '0.1'},
      {'price': '62739.43', 'size': '0.00008057'},
      {'price': '62734.79', 'size': '0.00001594'},
      {'price': '62732', 'size': '0.0012'},
      {'price': '62728.54', 'size': '0.00001594'},
      {'price': '62728.44', 'size': '0.00031724'},
      {'price': '62728', 'size': '0.00020879'},
      {'price': '62724.82', 'size': '0.00020651'},
      {'price': '62723.88', 'size': '0.00077418'},
      {'price': '62723.05', 'size': '0.00031728'},
      {'price': '62722.45', 'size': '0.04364'},
      {'price': '62720.89', 'size': '0.09162939'},
      {'price': '62720.21', 'size': '0.00006301'},
      {'price': '62717.9', 'size': '0.00005596'},
      {'price': '62717.14', 'size': '0.00001594'},
      {'price': '62713.13', 'size': '0.00027067'},
      {'price': '62712', 'size': '0.00008137'},
      {'price': '62710', 'size': '0.02038717'},
      {'price': '62707.5', 'size': '0.0000534'},
      {'price': '62706.6', 'size': '0.00006099'},
      {'price': '62704.98', 'size': '0.01364'},
      {'price': '62704.87', 'size': '0.00670897'},
      {'price': '62704.51', 'size': '0.00001594'},
      {'price': '62702.46', 'size': '0.00026171'},
      {'price': '62700.17', 'size': '0.00319435'},
      {'price': '62700', 'size': '0.06583728'},
      {'price': '62699.94', 'size': '0.00079745'},
      {'price': '62697.18', 'size': '43.653285'},
      {'price': '62689.2', 'size': '1.6'},
      {'price': '62688.81', 'size': '0.01193753'},
      {'price': '62688.61', 'size': '0.0012'},
      {'price': '62686.38', 'size': '0.03717793'},
      {'price': '62678.85', 'size': '0.00041666'},
      {'price': '62675', 'size': '0.00011223'},
      {'price': '62674.63', 'size': '0.00015789'},
      {'price': '62666.49', 'size': '0.00562'},
      {'price': '62666.4', 'size': '0.00396128'},
      {'price': '62665.02', 'size': '0.47586717'},
      {'price': '62660.37', 'size': '0.07931933'},
      {'price': '62659.87', 'size': '0.01050113'},
      {'price': '62658.14', 'size': '0.09172116'},
      {'price': '62657.77', 'size': '0.00136305'},
      {'price': '62656', 'size': '0.0000798'},
      {'price': '62655.91', 'size': '0.02387506'},
      {'price': '62650.11', 'size': '0.00039425'},
      {'price': '62650', 'size': '3.24571756'},
      {'price': '62649.78', 'size': '0.00009235'},
      {'price': '62647.99', 'size': '0.0001626'},
      {'price': '62646.19', 'size': '0.02'},
      {'price': '62645', 'size': '0.0012'},
      {'price': '62642.29', 'size': '0.00031927'},
      {'price': '62632.57', 'size': '0.0001587'},
      {'price': '62627.74', 'size': '1.6'},
      {'price': '62627.44', 'size': '0.0004597'},
      {'price': '62620.91', 'size': '0.00004797'},
      {'price': '62620.01', 'size': '0.03581259'},
      {'price': '62619.41', 'size': '0.00014522'},
      {'price': '62618.83', 'size': '0.001'},
      {'price': '62617.68', 'size': '0.00022622'},
      {'price': '62617.5', 'size': '0.00004007'},
      {'price': '62616.04', 'size': '0.00008057'},
      {'price': '62614.86', 'size': '1'},
      {'price': '62613.12', 'size': '0.00015971'},
      {'price': '62611.16', 'size': '0.00015971'},
      {'price': '62611', 'size': '0.00079379'},
      {'price': '62605.32', 'size': '0.00039933'},
      {'price': '62603.74', 'size': '0.00319435'},
      {'price': '62602.99', 'size': '0.00047921'},
      {'price': '62601.61', 'size': '0.0012'},
      {'price': '62600', 'size': '0.5121244'},
      {'price': '62597.44', 'size': '0.000006'},
      {'price': '62595.45', 'size': '0.09181301'},
      {'price': '62593', 'size': '0.00775837'},
      {'price': '62590', 'size': '0.00119968'},
      {'price': '62588', 'size': '0.00157857'},
      {'price': '62583.8', 'size': '0.1'},
      {'price': '62582.29', 'size': '0.00583'},
      {'price': '62580', 'size': '0.45473394'},
      {'price': '62575.11', 'size': '0.03035662'},
      {'price': '62574.19', 'size': '0.00198564'},
      {'price': '62573.62', 'size': '0.00009521'},
      {'price': '62573.26', 'size': '0.00587843'},
      {'price': '62570.67', 'size': '0.00945005'},
      {'price': '62568', 'size': '0.00014196'},
      {'price': '62567.45', 'size': '0.00019952'},
      {'price': '62566.38', 'size': '0.03196604'},
      {'price': '62566.28', 'size': '1.6'},
      {'price': '62565.02', 'size': '0.00005761'},
      {'price': '62558', 'size': '0.0012'},
      {'price': '62555.55', 'size': '0.0005595'},
      {'price': '62555.3', 'size': '0.04851777'},
      {'price': '62555', 'size': '0.01552633'},
      {'price': '62548.54', 'size': '0.00185423'},
      {'price': '62547.35', 'size': '0.00155274'},
      {'price': '62546.78', 'size': '0.00004244'},
      {'price': '62545.58', 'size': '0.00399708'},
      {'price': '62545.02', 'size': '0.00159884'},
      {'price': '62542.17', 'size': '0.00009235'},
      {'price': '62540.86', 'size': '0.00033721'},
      {'price': '62538.67', 'size': '0.00155295'},
      {'price': '62535.7', 'size': '0.00000001'},
      {'price': '62533.45', 'size': '0.00238432'},
      {'price': '62532.82', 'size': '0.09190497'},
      {'price': '62532.11', 'size': '0.00022715'},
      {'price': '62531.95', 'size': '0.00007995'},
      {'price': '62528.78', 'size': '0.00103952'},
      {'price': '62528.4', 'size': '0.00006099'},
      {'price': '62527.92', 'size': '0.01420165'},
      {'price': '62527.59', 'size': '0.01599294'},
      {'price': '62525', 'size': '0.00007996'},
      {'price': '62523.88', 'size': '0.00005613'},
      {'price': '62523.34', 'size': '0.00000295'},
      {'price': '62521', 'size': '0.03'},
      {'price': '62514.76', 'size': '0.0000018'},
      {'price': '62514.74', 'size': '0.00127971'},
      {'price': '62514.62', 'size': '0.00038838'},
      {'price': '62514.61', 'size': '0.0012'},
      {'price': '62512.72', 'size': '0.07193'},
      {'price': '62506.36', 'size': '0.00470393'},
      {'price': '62506.06', 'size': '0.00047707'},
      {'price': '62505.91', 'size': '0.15118441'},
      {'price': '62505.84', 'size': '0.00085644'},
      {'price': '62505.53', 'size': '0.00111281'},
      {'price': '62505', 'size': '0.0000534'},
      {'price': '62504.82', 'size': '1.6'},
      {'price': '62501', 'size': '0.01591974'},
      {'price': '62500.99', 'size': '0.00007999'},
      {'price': '62500', 'size': '0.36641462'},
      {'price': '62497.49', 'size': '0.00160006'},
      {'price': '62497.04', 'size': '0.0081'},
      {'price': '62496.72', 'size': '0.03729075'},
      {'price': '62495.97', 'size': '0.00077332'},
      {'price': '62495.74', 'size': '0.02'},
      {'price': '62495.47', 'size': '0.000016'},
      {'price': '62494.92', 'size': '0.01330937'},
      {'price': '62492.9', 'size': '0.00008057'},
      {'price': '62489.69', 'size': '0.00938689'},
      {'price': '62489.48', 'size': '0.001'},
      {'price': '62487.03', 'size': '0.0003496'},
      {'price': '62485.77', 'size': '0.00079057'},
      {'price': '62483', 'size': '0.0047821'},
      {'price': '62481.96', 'size': '0.00223023'},
      {'price': '62478.8', 'size': '0.00008692'},
      {'price': '62475.39', 'size': '0.00040015'},
      {'price': '62471', 'size': '0.0012'},
      {'price': '62468.36', 'size': '0.00009604'},
      {'price': '62468.21', 'size': '0.00040133'},
      {'price': '62461.03', 'size': '0.00228718'},
      {'price': '62459.65', 'size': '0.00036545'},
      {'price': '62458.78', 'size': '0.00081641'},
      {'price': '62450', 'size': '0.0719277'},
      {'price': '62447.47', 'size': '0.00030162'},
      {'price': '62447', 'size': '0.28860807'},
      {'price': '62444', 'size': '0.05461653'},
      {'price': '62443.36', 'size': '1.6'},
      {'price': '62437.84', 'size': '0.00000014'},
      {'price': '62434.57', 'size': '0.00009235'},
      {'price': '62433.85', 'size': '0.00160169'},
      {'price': '62432.43', 'size': '0.00022689'},
      {'price': '62427.61', 'size': '0.0012'},
      {'price': '62427.47', 'size': '0.00000014'},
      {'price': '62425.2', 'size': '0.28860807'},
      {'price': '62423.74', 'size': '0.00233372'},
      {'price': '62421.75', 'size': '0.00208035'},
      {'price': '62420', 'size': '0.00237534'},
      {'price': '62418.75', 'size': '0.0004646'},
      {'price': '62416.47', 'size': '0.00000015'},
      {'price': '62411.82', 'size': '0.00047747'},
      {'price': '62411.3', 'size': '0.00045058'},
      {'price': '62411.11', 'size': '0.00301746'},
      {'price': '62406.04', 'size': '0.00799201'},
      {'price': '62404.81', 'size': '0.00000015'},
      {'price': '62404.02', 'size': '0.00008855'},
      {'price': '62401.24', 'size': '0.001'},
      {'price': '62400', 'size': '1.84838392'},
      {'price': '62399', 'size': '0.00795542'},
      {'price': '62392.46', 'size': '0.00000015'},
      {'price': '62391.91', 'size': '0.0559425'},
      {'price': '62388', 'size': '0.0025'},
      {'price': '62384', 'size': '0.0012'},
      {'price': '62381.9', 'size': '9.6'},
      {'price': '62380', 'size': '0.00161306'},
      {'price': '62379.36', 'size': '0.00000015'},
      {'price': '62375.34', 'size': '0.00003959'},
      {'price': '62375', 'size': '0.00159919'},
      {'price': '62374.44', 'size': '0.00799606'},
      {'price': '62373.41', 'size': '0.001'},
      {'price': '62370', 'size': '0.00061585'},
      {'price': '62369.93', 'size': '0.0001458'},
      {'price': '62368.18', 'size': '0.00040085'},
      {'price': '62368.11', 'size': '0.00160338'},
      {'price': '62367.82', 'size': '0.00583'},
      {'price': '62365.48', 'size': '0.00000016'},
      {'price': '62364.28', 'size': '0.16034819'},
      {'price': '62362.66', 'size': '0.00079232'},
      {'price': '62360.17', 'size': '0.02405381'},
      {'price': '62355.38', 'size': '0.00002036'},
      {'price': '62355', 'size': '0.00013198'},
      {'price': '62350.76', 'size': '0.00000016'},
      {'price': '62350.53', 'size': '0.00436354'},
      {'price': '62350.2', 'size': '0.00006099'},
      {'price': '62348.27', 'size': '0.001'},
      {'price': '62345', 'size': '0.00044552'},
      {'price': '62343.92', 'size': '0.00251828'},
      {'price': '62343.21', 'size': '0.00207632'},
      {'price': '62340.56', 'size': '0.0012'},
      {'price': '62340.08', 'size': '0.00125689'},
      {'price': '62337.59', 'size': '0.00001604'},
      {'price': '62335.17', 'size': '0.00000016'},
      {'price': '62331.27', 'size': '0.00002965'},
      {'price': '62330.46', 'size': '0.00005631'},
      {'price': '62327.36', 'size': '0.001'},
      {'price': '62326.95', 'size': '0.00009235'},
      {'price': '62325', 'size': '2'},
      {'price': '62321.15', 'size': '0.00200573'},
      {'price': '62320.44', 'size': '8'},
      {'price': '62318.63', 'size': '0.00000016'},
      {'price': '62313.43', 'size': '0.00004244'},
      {'price': '62309.22', 'size': '0.00008024'},
      {'price': '62307.64', 'size': '0.03740392'},
      {'price': '62303.35', 'size': '0.00031722'},
      {'price': '62302.5', 'size': '0.0000534'},
      {'price': '62301.1', 'size': '0.00000017'},
      {'price': '62300', 'size': '4.54515573'},
      {'price': '62297', 'size': '0.0012'},
      {'price': '62292.77', 'size': '0.00589925'},
      {'price': '62291.95', 'size': '0.00007385'},
      {'price': '62291.5', 'size': '0.02393584'},
      {'price': '62289.83', 'size': '0.00003718'},
      {'price': '62289', 'size': '0.00040085'},
      {'price': '62282.53', 'size': '0.00000018'},
      {'price': '62276', 'size': '0.00079366'},
      {'price': '62275.34', 'size': '0.00001605'},
      {'price': '62271', 'size': '0.00003949'},
      {'price': '62269', 'size': '0.02'},
      {'price': '62262.83', 'size': '0.00000018'},
      {'price': '62261.09', 'size': '0.00001606'},
      {'price': '62260.97', 'size': '0.00020077'},
      {'price': '62258.98', 'size': '8'},
      {'price': '62257.33', 'size': '0.00472274'},
      {'price': '62254.86', 'size': '0.00005789'},
      {'price': '62253.56', 'size': '0.0012'},
      {'price': '62253.31', 'size': '0.00006349'},
      {'price': '62250', 'size': '0.07668714'},
      {'price': '62249.51', 'size': '0.00000297'},
      {'price': '62247.73', 'size': '0.00022756'},
      {'price': '62246', 'size': '0.00150906'},
      {'price': '62241.96', 'size': '0.00000018'},
      {'price': '62241.27', 'size': '0.0006'},
      {'price': '62239.35', 'size': '0.00002'},
      {'price': '62236.96', 'size': '0.00278139'},
      {'price': '62230.41', 'size': '0.00001808'},
      {'price': '62230.33', 'size': '0.00003932'},
      {'price': '62230.21', 'size': '0.03985458'},
      {'price': '62227', 'size': '0.00296196'},
      {'price': '62222', 'size': '0.04851777'},
      {'price': '62221.26', 'size': '0.00235997'},
      {'price': '62219.83', 'size': '0.00000018'},
      {'price': '62219.35', 'size': '0.00009235'},
      {'price': '62218.59', 'size': '0.0002283'},
      {'price': '62216.88', 'size': '0.0007'},
      {'price': '62212.5', 'size': '0.01397327'},
      {'price': '62210.44', 'size': '0.00008202'},
      {'price': '62210', 'size': '0.16066119'},
      {'price': '62209.63', 'size': '0.00002625'},
      {'price': '62207.43', 'size': '0.00079411'},
      {'price': '62206.94', 'size': '0.0001'},
      {'price': '62205', 'size': '0.00003989'},
      {'price': '62200', 'size': '1.77691658'},
      {'price': '62199.86', 'size': '0.00016377'},
      {'price': '62197.52', 'size': '8'},
      {'price': '62196.38', 'size': '0.00000019'},
      {'price': '62193.25', 'size': '0.00000448'},
      {'price': '62191.51', 'size': '0.00803968'},
      {'price': '62188.22', 'size': '0.01196368'},
      {'price': '62183.74', 'size': '0.00156182'},
      {'price': '62181.97', 'size': '0.00001608'},
      {'price': '62176.47', 'size': '0.00186533'},
      {'price': '62172', 'size': '0.00108033'},
      {'price': '62171.52', 'size': '0.0000002'},
      {'price': '62170.68', 'size': '0.00048744'},
      {'price': '62169.06', 'size': '0.25'},
      {'price': '62168.36', 'size': '0.0080105'},
      {'price': '62167.87', 'size': '0.00002011'},
      {'price': '62166.56', 'size': '0.0012'},
      {'price': '62164.85', 'size': '0.00025022'},
      {'price': '62162.1', 'size': '0.00003946'},
      {'price': '62158.94', 'size': '0.92192245'},
      {'price': '62157.07', 'size': '0.00078124'},
      {'price': '62155.22', 'size': '0.03167'},
      {'price': '62154.98', 'size': '0.00055875'},
      {'price': '62154.68', 'size': '0.00008432'},
      {'price': '62152.46', 'size': '0.00171766'},
      {'price': '62149.15', 'size': '0.00036728'},
      {'price': '62148.44', 'size': '0.00119213'},
      {'price': '62148.38', 'size': '0.00008367'},
      {'price': '62146.02', 'size': '0.00082052'},
      {'price': '62145.16', 'size': '0.0000002'},
      {'price': '62144.79', 'size': '0.001'},
      {'price': '62142.43', 'size': '0.00052345'},
      {'price': '62142.11', 'size': '0.0012'},
      {'price': '62137.65', 'size': '0.00005648'},
      {'price': '62136.42', 'size': '0.00001609'},
      {'price': '62136.06', 'size': '8'},
      {'price': '62133.2', 'size': '0.00008902'},
      {'price': '62132.85', 'size': '0.002'},
      {'price': '62131.04', 'size': '0.00040238'},
      {'price': '62127.98', 'size': '0.01180251'},
      {'price': '62123.78', 'size': '0.0063887'},
      {'price': '62122.5', 'size': '0.00004007'},
      {'price': '62122', 'size': '0.00139496'},
      {'price': '62121.44', 'size': '0.00014638'},
      {'price': '62119.13', 'size': '0.03751742'},
      {'price': '62118', 'size': '0.00159052'},
      {'price': '62117.23', 'size': '0.0000002'},
      {'price': '62116.64', 'size': '0.00071564'},
      {'price': '62113.97', 'size': '0.0056348'},
      {'price': '62112.22', 'size': '0.00033647'},
      {'price': '62111.74', 'size': '0.00009235'},
      {'price': '62108.36', 'size': '0.00337106'},
      {'price': '62108.03', 'size': '0.0000161'},
      {'price': '62105', 'size': '0.00240922'},
      {'price': '62102.2', 'size': '0.0000152'},
      {'price': '62100', 'size': '0.07412206'},
      {'price': '62097.5', 'size': '0.00181777'},
      {'price': '62096.26', 'size': '0.00042671'},
      {'price': '62095.77', 'size': '0.00172821'},
      {'price': '62094', 'size': '0.00000016'},
      {'price': '62091.64', 'size': '0.00004579'},
      {'price': '62089', 'size': '0.02000064'},
      {'price': '62088.33', 'size': '0.00018607'},
      {'price': '62087.62', 'size': '0.00000021'},
      {'price': '62080.07', 'size': '0.00004244'},
      {'price': '62079.56', 'size': '0.0012'},
      {'price': '62076', 'size': '0.00080534'},
      {'price': '62074.6', 'size': '8'},
      {'price': '62073.52', 'size': '0.00020111'},
      {'price': '62065.95', 'size': '0.00048335'},
      {'price': '62065.18', 'size': '0.1043502'},
      {'price': '62064.28', 'size': '0.00562'},
      {'price': '62063.58', 'size': '0.00022824'},
      {'price': '62062', 'size': '0.01603235'},
      {'price': '62056.23', 'size': '0.00000021'},
      {'price': '62054.23', 'size': '0.00040287'},
      {'price': '62053.82', 'size': '0.03054558'},
      {'price': '62051', 'size': '0.06430194'},
      {'price': '62050', 'size': '1.00801244'},
      {'price': '62048', 'size': '0.00782652'},
      {'price': '62047.61', 'size': '0.00033989'},
      {'price': '62041.19', 'size': '0.00001209'},
      {'price': '62038.88', 'size': '0.00303556'},
      {'price': '62036', 'size': '0.0012'},
      {'price': '62035', 'size': '0.02'},
      {'price': '62032.84', 'size': '0.00318363'},
      {'price': '62029.51', 'size': '0.005'},
      {'price': '62028.23', 'size': '0.0063887'},
      {'price': '62027.46', 'size': '0.00015988'},
      {'price': '62025', 'size': '0.40810002'},
      {'price': '62022.96', 'size': '0.00000021'},
      {'price': '62018', 'size': '0.0025'},
      {'price': '62013.14', 'size': '8'},
      {'price': '62010', 'size': '0.40938925'},
      {'price': '62009.29', 'size': '0.00474163'},
      {'price': '62005', 'size': '0.00240496'},
      {'price': '62004.13', 'size': '0.00009235'},
      {'price': '62003.69', 'size': '0.0241921'},
      {'price': '62003', 'size': '0.00639969'},
      {'price': '62001', 'size': '0.07769402'},
      {'price': '62000.01', 'size': '0.0015937'},
      {'price': '62000', 'size': '5.99957419'},
      {'price': '61999.99', 'size': '0.00320657'},
      {'price': '61999.27', 'size': '0.00043017'},
      {'price': '61999', 'size': '0.01008073'},
      {'price': '61993.8', 'size': '0.00006099'},
      {'price': '61992.56', 'size': '0.0012'},
      {'price': '61987.7', 'size': '0.00000022'},
      {'price': '61980', 'size': '0.17674127'},
      {'price': '61978.07', 'size': '0.00016134'},
      {'price': '61977.72', 'size': '0.05906'},
      {'price': '61976.88', 'size': '0.00000298'},
      {'price': '61974', 'size': '0.000379'},
      {'price': '61972.78', 'size': '0.00002049'},
      {'price': '61972.46', 'size': '0.07438927'},
      {'price': '61972.18', 'size': '0.00032273'},
      {'price': '61965', 'size': '0.00032276'},
      {'price': '61963.19', 'size': '0.00945005'},
      {'price': '61960', 'size': '0.62615012'},
      {'price': '61957.32', 'size': '0.00112981'},
      {'price': '61957.28', 'size': '0.00209595'},
      {'price': '61954.8', 'size': '0.00169476'},
      {'price': '61950.31', 'size': '0.00000023'},
      {'price': '61949.36', 'size': '0.00000162'},
      {'price': '61949', 'size': '0.0012'},
      {'price': '61946.23', 'size': '0.00005818'},
      {'price': '61945.43', 'size': '0.00005666'},
      {'price': '61944.6', 'size': '0.03228691'},
      {'price': '61944', 'size': '0.05461653'},
      {'price': '61943.71', 'size': '0.04837052'},
      {'price': '61939.52', 'size': '0.01398493'},
      {'price': '61936.01', 'size': '0.00160165'},
      {'price': '61935', 'size': '1'},
      {'price': '61934.69', 'size': '0.00008855'},
      {'price': '61933.81', 'size': '0.00000162'},
      {'price': '61933.46', 'size': '0.001'},
      {'price': '61933.25', 'size': '0.00001615'},
      {'price': '61932.83', 'size': '0.0063887'},
      {'price': '61931.2', 'size': '0.03763127'},
      {'price': '61928.02', 'size': '0.00003988'},
      {'price': '61920.25', 'size': '0.001'},
      {'price': '61918.27', 'size': '0.00000162'},
      {'price': '61917.08', 'size': '0.00080268'},
      {'price': '61915.3', 'size': '0.01188282'},
      {'price': '61913.25', 'size': '0.00161516'},
      {'price': '61912.6', 'size': '0.0025561'},
      {'price': '61910.69', 'size': '0.00000023'},
      {'price': '61910', 'size': '0.1602339'},
      {'price': '61906.64', 'size': '0.00022945'},
      {'price': '61906.17', 'size': '0.00104367'},
      {'price': '61905.56', 'size': '0.0012'},
      {'price': '61903.57', 'size': '0.00001089'},
      {'price': '61902.74', 'size': '0.00000162'},
      {'price': '61901.58', 'size': '0.00008077'},
      {'price': '61900.22', 'size': '0.00001615'},
      {'price': '61900', 'size': '0.10659084'},
      {'price': '61899.25', 'size': '0.00000534'},
      {'price': '61897.5', 'size': '0.0000534'},
      {'price': '61896.52', 'size': '0.00009235'},
      {'price': '61893.4', 'size': '0.0002955'},
      {'price': '61890.73', 'size': '0.00036638'},
      {'price': '61888.22', 'size': '0.01202167'},
      {'price': '61888', 'size': '0.04366881'},
      {'price': '61887.43', 'size': '0.0331'},
      {'price': '61887.22', 'size': '0.00000162'},
      {'price': '61883.22', 'size': '0.00039235'},
      {'price': '61882.61', 'size': '0.00080798'},
      {'price': '61882.01', 'size': '0.00091021'},
      {'price': '61879.97', 'size': '0.00022891'},
      {'price': '61879.65', 'size': '0.00602'},
      {'price': '61878.4', 'size': '0.0064898'},
      {'price': '61878.14', 'size': '0.00002682'},
      {'price': '61875.27', 'size': '0.00008081'},
      {'price': '61875', 'size': '0.00143503'},
      {'price': '61873.95', 'size': '0.00014697'},
      {'price': '61872.69', 'size': '0.00008081'},
      {'price': '61871.7', 'size': '0.00000162'},
      {'price': '61862', 'size': '0.0012'},
      {'price': '61856.19', 'size': '0.00000162'},
      {'price': '61850', 'size': '0.08703515'},
      {'price': '61846.72', 'size': '0.00004244'},
      {'price': '61845.39', 'size': '0.05'},
      {'price': '61840.69', 'size': '0.00000162'},
      {'price': '61840.44', 'size': '0.0020932'},
      {'price': '61840.19', 'size': '0.00036911'},
      {'price': '61837.57', 'size': '0.00319435'},
      {'price': '61837.46', 'size': '0.0000812'},
      {'price': '61834.83', 'size': '0.00082465'},
      {'price': '61828.86', 'size': '0.00246772'},
      {'price': '61827.2', 'size': '0.00050624'},
      {'price': '61825.2', 'size': '0.00000162'},
      {'price': '61818.56', 'size': '0.0012'},
      {'price': '61815.6', 'size': '0.00006099'},
      {'price': '61809.71', 'size': '0.00000162'},
      {'price': '61807.6', 'size': '0.01145304'},
      {'price': '61806.62', 'size': '0.00187649'},
      {'price': '61806.25', 'size': '0.00052369'},
      {'price': '61800', 'size': '0.22627615'},
      {'price': '61799', 'size': '0.05'},
      {'price': '61797', 'size': '0.00119908'},
      {'price': '61794.23', 'size': '0.00000162'},
      {'price': '61790.89', 'size': '0.00647344'},
      {'price': '61790.79', 'size': '0.65489705'},
      {'price': '61788.91', 'size': '0.00009235'},
      {'price': '61786.41', 'size': '0.00006397'},
      {'price': '61784.21', 'size': '0.00000488'},
      {'price': '61778.76', 'size': '0.00000162'},
      {'price': '61777', 'size': '0.00247614'},
      {'price': '61776', 'size': '0.00010247'},
      {'price': '61775', 'size': '0.0012'},
      {'price': '61772.04', 'size': '0.001'},
      {'price': '61770.29', 'size': '0.00005294'},
      {'price': '61766', 'size': '0.00799792'},
      {'price': '61763.3', 'size': '0.00000162'},
      {'price': '61762.9', 'size': '0.00150906'},
      {'price': '61762.25', 'size': '0.0047606'},
      {'price': '61760.15', 'size': '0.00326402'},
      {'price': '61758.76', 'size': '0.00037547'},
      {'price': '61755', 'size': '0.7'},
      {'price': '61754.94', 'size': '0.00016495'},
      {'price': '61754.88', 'size': '0.00043256'},
      {'price': '61753.8', 'size': '0.00005683'},
      {'price': '61753.7', 'size': '0.0004858'},
      {'price': '61750', 'size': '0.21027813'},
      {'price': '61747.85', 'size': '0.00000162'},
      {'price': '61745.76', 'size': '0.01'},
      {'price': '61743.83', 'size': '0.03774547'},
      {'price': '61742.47', 'size': '0.00319435'},
      {'price': '61738.39', 'size': '0.02415028'},
      {'price': '61733.12', 'size': '0.00396128'},
      {'price': '61733', 'size': '0.00824226'},
      {'price': '61732.4', 'size': '0.00000162'},
      {'price': '61731.56', 'size': '0.0012'},
      {'price': '61725', 'size': '0.00157343'},
      {'price': '61720.23', 'size': '0.03147266'},
      {'price': '61720', 'size': '0.02600072'},
      {'price': '61719.51', 'size': '0.00041873'},
      {'price': '61719.39', 'size': '0.0000162'},
      {'price': '61716.96', 'size': '0.00000162'},
      {'price': '61714.07', 'size': '0.00040133'},
      {'price': '61712.9', 'size': '0.00008268'},
      {'price': '61712.24', 'size': '0.01610701'},
      {'price': '61711', 'size': '0.00800505'},
      {'price': '61710.64', 'size': '0.00048289'},
      {'price': '61707.16', 'size': '0.00088614'},
      {'price': '61705.45', 'size': '0.00000299'},
      {'price': '61701.43', 'size': '0.00000163'},
      {'price': '61700', 'size': '1.2226511'},
      {'price': '61699', 'size': '0.00276827'},
      {'price': '61698.88', 'size': '0.00035533'},
      {'price': '61696.97', 'size': '0.00169796'},
      {'price': '61696.91', 'size': '0.00022959'},
      {'price': '61695.24', 'size': '0.00003146'},
      {'price': '61695', 'size': '0.0000534'},
      {'price': '61693', 'size': '0.013'},
      {'price': '61690', 'size': '0.11471855'},
      {'price': '61688', 'size': '0.0012'},
      {'price': '61685.91', 'size': '0.00000163'},
      {'price': '61684.92', 'size': '0.00015988'},
      {'price': '61683.82', 'size': '0.00486351'},
      {'price': '61681.31', 'size': '0.00009235'},
      {'price': '61676.24', 'size': '0.17713157'},
      {'price': '61675', 'size': '0.04852047'},
      {'price': '61670.4', 'size': '0.00000163'},
      {'price': '61668.87', 'size': '0.00305377'},
      {'price': '61665.16', 'size': '0.00326905'},
      {'price': '61663.52', 'size': '0.0003643'},
      {'price': '61655.44', 'size': '0.00057903'},
      {'price': '61654.9', 'size': '0.00000163'},
      {'price': '61653.98', 'size': '0.001'},
      {'price': '61647.51', 'size': '0.0001344'},
      {'price': '61647.16', 'size': '0.00207809'},
      {'price': '61644.56', 'size': '0.0012'},
      {'price': '61642.36', 'size': '0.00001622'},
      {'price': '61639.4', 'size': '0.00000163'},
      {'price': '61639.13', 'size': '0.00005847'},
      {'price': '61638.41', 'size': '0.001'},
      {'price': '61637.4', 'size': '0.00006099'},
      {'price': '61630.41', 'size': '0.00001862'},
      {'price': '61627.5', 'size': '0.00845761'},
      {'price': '61627.44', 'size': '0.00034844'},
      {'price': '61624.29', 'size': '0.00160326'},
      {'price': '61623.91', 'size': '0.00000163'},
      {'price': '61613.35', 'size': '0.00004244'},
      {'price': '61612.72', 'size': '0.00209483'},
      {'price': '61608.63', 'size': '0.000006'},
      {'price': '61608.43', 'size': '0.00000163'},
      {'price': '61604.87', 'size': '0.00000453'},
      {'price': '61603.68', 'size': '0.0003372'},
      {'price': '61601', 'size': '0.0012'},
      {'price': '61600', 'size': '0.41176008'},
      {'price': '61597', 'size': '0.00788382'},
      {'price': '61596.25', 'size': '0.00023061'},
      {'price': '61595.33', 'size': '0.00004171'},
      {'price': '61592.96', 'size': '0.00000163'},
      {'price': '61592.53', 'size': '0.00002061'},
      {'price': '61590', 'size': '2.575'},
      {'price': '61587.85', 'size': '0.00078301'},
      {'price': '61583.49', 'size': '0.00020271'},
      {'price': '61579.83', 'size': '0.0003496'},
      {'price': '61578', 'size': '0.0005422'},
      {'price': '61577.92', 'size': '0.00020088'},
      {'price': '61577.8', 'size': '0.00004797'},
      {'price': '61577.5', 'size': '0.00000163'},
      {'price': '61577', 'size': '0.00016044'},
      {'price': '61573.69', 'size': '0.00009235'},
      {'price': '61570.32', 'size': '0.00327408'},
      {'price': '61570.27', 'size': '0.00066112'},
      {'price': '61570', 'size': '0.0161767'},
      {'price': '61566.83', 'size': '0.00367747'},
      {'price': '61562.77', 'size': '0.00005701'},
      {'price': '61562.04', 'size': '0.00000163'},
      {'price': '61561.21', 'size': '0.0142137'},
      {'price': '61559.64', 'size': '0.00127651'},
      {'price': '61557.56', 'size': '0.0012'},
      {'price': '61557.02', 'size': '0.03786001'},
      {'price': '61555.61', 'size': '0.0001605'},
      {'price': '61555', 'size': '0.00393719'},
      {'price': '61554.37', 'size': '0.00034262'},
      {'price': '61552.69', 'size': '0.0063887'},
      {'price': '61552.17', 'size': '0.00017686'},
      {'price': '61550', 'size': '0.00159471'},
      {'price': '61549.26', 'size': '0.0011373'},
      {'price': '61548.6', 'size': '0.00003342'},
      {'price': '61546.59', 'size': '0.00000163'},
      {'price': '61540', 'size': '0.96373179'},
      {'price': '61537.04', 'size': '0.0003211'},
      {'price': '61533.8', 'size': '0.01925215'},
      {'price': '61532.77', 'size': '0.00037096'},
      {'price': '61531.15', 'size': '0.00000163'},
      {'price': '61528.79', 'size': '0.00443283'},
      {'price': '61528.44', 'size': '0.00020088'},
      {'price': '61528.4', 'size': '0.01625265'},
      {'price': '61525.2', 'size': '0.0008288'},
      {'price': '61525', 'size': '0.00080902'},
      {'price': '61516.18', 'size': '0.00477964'},
      {'price': '61515.72', 'size': '0.00000163'},
      {'price': '61514.38', 'size': '0.00023027'},
      {'price': '61514.21', 'size': '0.0005928'},
      {'price': '61514', 'size': '0.0012'},
      {'price': '61510.46', 'size': '0.01627366'},
      {'price': '61510.25', 'size': '0.16127718'},
      {'price': '61501', 'size': '0.01617859'},
      {'price': '61500.29', 'size': '0.00000163'},
      {'price': '61500', 'size': '4.27115094'},
      {'price': '61496.26', 'size': '0.00211166'},
      {'price': '61492.5', 'size': '0.0000534'},
      {'price': '61484.87', 'size': '0.00000163'},
      {'price': '61483.91', 'size': '0.00004017'},
      {'price': '61480.95', 'size': '0.0003'},
      {'price': '61479', 'size': '0.00020088'},
      {'price': '61475.62', 'size': '0.00327913'},
      {'price': '61471.82', 'size': '0.05677983'},
      {'price': '61470.5', 'size': '0.0012'},
      {'price': '61469.46', 'size': '0.00000163'},
      {'price': '61468.89', 'size': '0.00008855'},
      {'price': '61468.71', 'size': '0.0006998'},
      {'price': '61466.09', 'size': '0.00009235'},
      {'price': '61459.22', 'size': '0.00455586'},
      {'price': '61459.2', 'size': '0.00006099'},
      {'price': '61455.8', 'size': '0.00562'},
      {'price': '61454.06', 'size': '0.00000163'},
      {'price': '61449.79', 'size': '0.02278282'},
      {'price': '61447.74', 'size': '0.01130065'},
      {'price': '61447.1', 'size': '0.00001627'},
      {'price': '61447', 'size': '0.00032287'},
      {'price': '61444', 'size': '0.05461653'},
      {'price': '61441.72', 'size': '0.19276'},
      {'price': '61439.63', 'size': '0.02278659'},
      {'price': '61438.97', 'size': '0.00188772'},
      {'price': '61438.67', 'size': '0.00000163'},
      {'price': '61435.2', 'size': '0.000003'},
      {'price': '61427', 'size': '0.0012'},
      {'price': '61423.89', 'size': '0.04825484'},
      {'price': '61423.28', 'size': '0.00000163'},
      {'price': '61421.3', 'size': '0.00346304'},
      {'price': '61421.2', 'size': '0.00029615'},
      {'price': '61420.35', 'size': '0.0012211'},
      {'price': '61415.65', 'size': '0.00016184'},
      {'price': '61414.42', 'size': '0.00160874'},
      {'price': '61409.98', 'size': '0.00000001'},
      {'price': '61407.9', 'size': '0.00000163'},
      {'price': '61403.52', 'size': '0.00537428'},
      {'price': '61400', 'size': '2.05796384'},
      {'price': '61399', 'size': '0.05'},
      {'price': '61397.93', 'size': '0.00045239'},
      {'price': '61392.53', 'size': '0.00000163'},
      {'price': '61391.01', 'size': '0.01609356'},
      {'price': '61390', 'size': '0.01422863'},
      {'price': '61388', 'size': '0.00160943'},
      {'price': '61387.72', 'size': '0.00341063'},
      {'price': '61383.5', 'size': '0.0012'},
      {'price': '61381.91', 'size': '0.00014815'},
      {'price': '61381.07', 'size': '0.00328418'},
      {'price': '61380', 'size': '0.03080986'},
      {'price': '61377.17', 'size': '0.00000163'},
      {'price': '61377', 'size': '0.00017191'},
      {'price': '61375', 'size': '0.00080488'},
      {'price': '61374.8', 'size': '0.00778373'},
      {'price': '61372.32', 'size': '0.00005719'},
      {'price': '61370.79', 'size': '0.0379749'},
      {'price': '61370.3', 'size': '0.00048101'},
      {'price': '61367.86', 'size': '0.08589'},
      {'price': '61361.81', 'size': '0.00000163'},
      {'price': '61358.48', 'size': '0.00009235'},
      {'price': '61355.76', 'size': '0.00016298'},
      {'price': '61355.71', 'size': '0.00945005'},
      {'price': '61351.83', 'size': '0.00037423'},
      {'price': '61350', 'size': '0.02852548'},
      {'price': '61346.46', 'size': '0.00000163'},
      {'price': '61340.29', 'size': '0.001'},
      {'price': '61340.14', 'size': '0.00003289'},
      {'price': '61340', 'size': '0.0012'},
      {'price': '61337', 'size': '0.00040133'},
      {'price': '61334.64', 'size': '0.001'},
      {'price': '61333.56', 'size': '0.00005876'},
      {'price': '61333', 'size': '0.0489133'},
      {'price': '61332.4', 'size': '0.00023096'},
      {'price': '61331.76', 'size': '0.00533224'},
      {'price': '61331.03', 'size': '0.00000164'},
      {'price': '61330', 'size': '1.02763025'},
      {'price': '61329', 'size': '0.03261099'},
      {'price': '61328.37', 'size': '0.00568415'},
      {'price': '61325', 'size': '0.0024313'},
      {'price': '61319.11', 'size': '0.00179071'},
      {'price': '61315.85', 'size': '0.00020141'},
      {'price': '61315.6', 'size': '0.00000164'},
      {'price': '61313.2', 'size': '0.00016614'},
      {'price': '61309.8', 'size': '0.00325396'},
      {'price': '61302.37', 'size': '0.00001631'},
      {'price': '61301.06', 'size': '0.0030721'},
      {'price': '61301', 'size': '0.11354878'},
      {'price': '61300.18', 'size': '0.00000164'},
      {'price': '61300', 'size': '11.71863777'},
      {'price': '61298', 'size': '0.0018'},
      {'price': '61296.81', 'size': '0.00201478'},
      {'price': '61296.5', 'size': '0.0012'},
      {'price': '61295.8', 'size': '0.01584529'},
      {'price': '61291.64', 'size': '0.00004665'},
      {'price': '61291', 'size': '0.01618508'},
      {'price': '61290', 'size': '0.0000534'},
      {'price': '61289.62', 'size': '0.0017'},
      {'price': '61289.49', 'size': '0.16120218'},
      {'price': '61289', 'size': '0.00040739'},
      {'price': '61287.42', 'size': '0.00023177'},
      {'price': '61286.66', 'size': '0.00328924'},
      {'price': '61284.77', 'size': '0.00000164'},
      {'price': '61282.31', 'size': '0.00045141'},
      {'price': '61282.27', 'size': '0.0016'},
      {'price': '61281', 'size': '0.00016099'},
      {'price': '61275.82', 'size': '0.00001297'},
      {'price': '61274.5', 'size': '0.0012'},
      {'price': '61271.1', 'size': '0.00479876'},
      {'price': '61269.37', 'size': '0.00000164'},
      {'price': '61265.81', 'size': '0.02306914'},
      {'price': '61263.22', 'size': '0.11927'},
      {'price': '61263.19', 'size': '0.00014817'},
      {'price': '61263.18', 'size': '0.02448452'},
      {'price': '61263.13', 'size': '0.12365'},
      {'price': '61263', 'size': '0.00153327'},
      {'price': '61262.29', 'size': '0.00064497'},
      {'price': '61262.2', 'size': '0.00001625'},
      {'price': '61261.84', 'size': '0.00029855'},
      {'price': '61259', 'size': '0.00080641'},
      {'price': '61258.78', 'size': '0.00486787'},
      {'price': '61258', 'size': '0.00044463'},
      {'price': '61255', 'size': '0.10033546'},
      {'price': '61253.97', 'size': '0.00000164'},
      {'price': '61252', 'size': '0.28308694'},
      {'price': '61251.01', 'size': '0.0001613'},
      {'price': '61250.87', 'size': '0.00009235'},
      {'price': '61250', 'size': '0.26370758'},
      {'price': '61249.36', 'size': '0.00233471'},
      {'price': '61249.19', 'size': '0.00079282'},
      {'price': '61246', 'size': '0.01585817'},
      {'price': '61245.77', 'size': '0.00310458'},
      {'price': '61245.57', 'size': '0.01343777'},
      {'price': '61245.36', 'size': '0.00997717'},
      {'price': '61243.35', 'size': '0.00633062'},
      {'price': '61241.74', 'size': '0.00001632'},
      {'price': '61241.23', 'size': '0.00024346'},
      {'price': '61240.71', 'size': '0.00001632'},
      {'price': '61240.04', 'size': '0.00814418'},
      {'price': '61240', 'size': '0.0012381'},
      {'price': '61238.9', 'size': '0.00025022'},
      {'price': '61238.58', 'size': '0.00000164'},
      {'price': '61236.8', 'size': '0.00032464'},
      {'price': '61233.16', 'size': '0.00001633'},
      {'price': '61232', 'size': '0.00162031'},
      {'price': '61231.85', 'size': '0.00816568'},
      {'price': '61231.38', 'size': '0.00002'},
      ...],
     'type': 'snapshot',
     'collect_time': '2026-07-07T05:31:59.996317000Z',
     'cm_sequence_id': '0'}



Animate the live book as those messages are applied (green bids, coral asks):


```python
display(Image(animate_book(live_msgs, "live_book.gif", f"Live — {MARKET}")))
```

<figure><img src="../../.gitbook/assets/sales_demo_order_book_updates_12_0.gif" alt=""><figcaption></figcaption></figure>


    <IPython.core.display.Image object>


## Schema 2 — Historical updates + snapshots (replay the window we just streamed)

`dataset=updates` returns the **identical** message shape (snapshot + updates) for a **historical** window, and the sequence is **reproducible** — the same market and time range return the same rows on every query. Instead of a hard-coded window, we pass the **`win_start` / `win_end` we just captured from the live stream** — so we replay the very window we watched live. Following the product docs, we fetch it **in parallel** and return a **DataFrame** (`.parallel(time_increment=…).to_dataframe()`), then reconstruct with the **same `apply_message` / `animate_book`** code. `start_with_snapshot=True` prepends a snapshot so we can initialise before the first update.

> **Row count vs live-message count.** Both feeds carry the **full book** (we subscribed the websocket at `depth_limit="full_book"` to match). The websocket **bundles many level changes into each message**, while historical `granularity="raw"` emits them as **finer, individual rows** — so there are more rows than live messages, but the **total book activity (level-changes) is comparable**. Same book, same schema, same code — just different message framing.

> Historical updates settle after a short persistence lag, so the final seconds of a just-streamed window may still be landing; the leading snapshot keeps the replay well-formed regardless.


```python
df = client.get_market_orderbooks(
    markets=[MARKET],
    dataset="updates",
    start_with_snapshot=True,   # leading snapshot to initialise the book
    depth_limit="full_book",
    granularity="raw",
    format="json_stream",
    paging_from="start",
    start_time=win_start,       # the window we streamed live above
    end_time=win_end,
).parallel(time_increment=timedelta(minutes=1)).to_dataframe()

rows = df.to_dict("records")   # message dicts for reconstruction / animation
hist_changes = int(df["asks"].map(len).sum() + df["bids"].map(len).sum())
print(f"historical (raw): {len(df):,} rows, {hist_changes:,} level-changes")
print(f"live (websocket): {len(live_msgs):,} messages, {live_changes:,} level-changes")
df.head()
```

    Exporting to dataframe type:   0%|          | 0/1 [00:00<?, ?it/s]

    Exporting to dataframe type: 100%|██████████| 1/1 [00:08<00:00,  8.02s/it]

    Exporting to dataframe type: 100%|██████████| 1/1 [00:08<00:00,  8.02s/it]

    


    historical (raw): 52,974 rows, 97,459 level-changes
    live (websocket): 800 messages, 85,120 level-changes





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
      <th>market</th>
      <th>time</th>
      <th>coin_metrics_id</th>
      <th>asks</th>
      <th>bids</th>
      <th>type</th>
      <th>database_time</th>
      <th>collect_time</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>coinbase-btc-usd-spot</td>
      <td>2026-07-07 05:30:09.985257+00:00</td>
      <td>AAEDAAZV_q83wulCVEMtVVNE</td>
      <td>[{'price': '62893.29', 'size': '0.00141817'}, ...</td>
      <td>[{'price': '62893.28', 'size': '1.40248756'}, ...</td>
      <td>snapshot</td>
      <td>2026-07-07 05:30:10.204346194+00:00</td>
      <td>2026-07-07 05:30:09.999438+00:00</td>
    </tr>
    <tr>
      <th>1</th>
      <td>coinbase-btc-usd-spot</td>
      <td>2026-07-07 05:30:10.013888+00:00</td>
      <td>AAEDAAZV_q84MsBCVEMtVVNE</td>
      <td>[]</td>
      <td>[{'price': '62871.98', 'size': '0.540278'}]</td>
      <td>update</td>
      <td>2026-07-07 05:30:10.204398185+00:00</td>
      <td>2026-07-07 05:30:10.018256+00:00</td>
    </tr>
    <tr>
      <th>2</th>
      <td>coinbase-btc-usd-spot</td>
      <td>2026-07-07 05:30:10.016763+00:00</td>
      <td>AAEDAAZV_q84PftCVEMtVVNE</td>
      <td>[]</td>
      <td>[{'price': '62872.11', 'size': '0.48858106'}]</td>
      <td>update</td>
      <td>2026-07-07 05:30:10.204419996+00:00</td>
      <td>2026-07-07 05:30:10.024894+00:00</td>
    </tr>
    <tr>
      <th>3</th>
      <td>coinbase-btc-usd-spot</td>
      <td>2026-07-07 05:30:10.016875+00:00</td>
      <td>AAEDAAZV_q84PmtCVEMtVVNE</td>
      <td>[{'price': '62925.66', 'size': '0.94122215'}, ...</td>
      <td>[]</td>
      <td>update</td>
      <td>2026-07-07 05:30:10.204430666+00:00</td>
      <td>2026-07-07 05:30:10.024923+00:00</td>
    </tr>
    <tr>
      <th>4</th>
      <td>coinbase-btc-usd-spot</td>
      <td>2026-07-07 05:30:10.018792+00:00</td>
      <td>AAEDAAZV_q84RehCVEMtVVNE</td>
      <td>[{'price': '62925.67', 'size': '0'}]</td>
      <td>[]</td>
      <td>update</td>
      <td>2026-07-07 05:30:10.204440166+00:00</td>
      <td>2026-07-07 05:30:10.024948+00:00</td>
    </tr>
  </tbody>
</table>
</div>




```python
display(Image(animate_book(rows[:600], "historical_book.gif", "Historical replay — same window")))
```

<figure><img src="../../.gitbook/assets/sales_demo_order_book_updates_15_0.gif" alt=""><figcaption></figcaption></figure>


    <IPython.core.display.Image object>


## Reconstruct & measure

Replaying the updates in time order gives the level-1 series (best bid/ask, spread) and depth near the mid — the raw material for TCA, event studies, and backtests. The **same** `apply_message` that drove the animations builds the metrics here:


```python
book, series = new_book(), []
for row in sorted(rows, key=lambda r: r["time"]):
    apply_message(book, row)
    bid, ask = best_bid_ask(book)
    if bid is None or ask is None:
        continue
    mid = (bid + ask) / 2
    lo, hi = mid * (1 - DEPTH_PCT), mid * (1 + DEPTH_PCT)
    series.append({
        "time": row["time"],
        "spread_bps": (ask - bid) / mid * 1e4,
        "bid_depth": sum(s for p, s in book["bids"].items() if p >= lo),
        "ask_depth": sum(s for p, s in book["asks"].items() if p <= hi),
    })

metrics = pd.DataFrame(series)
metrics["time"] = pd.to_datetime(metrics["time"])
metrics[["spread_bps", "bid_depth", "ask_depth"]].describe()
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
      <th>spread_bps</th>
      <th>bid_depth</th>
      <th>ask_depth</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>count</th>
      <td>52974.000000</td>
      <td>52974.000000</td>
      <td>52974.000000</td>
    </tr>
    <tr>
      <th>mean</th>
      <td>0.037895</td>
      <td>13.749850</td>
      <td>14.006826</td>
    </tr>
    <tr>
      <th>std</th>
      <td>0.110120</td>
      <td>2.348151</td>
      <td>2.138078</td>
    </tr>
    <tr>
      <th>min</th>
      <td>0.001587</td>
      <td>6.192858</td>
      <td>7.618362</td>
    </tr>
    <tr>
      <th>25%</th>
      <td>0.001588</td>
      <td>12.175648</td>
      <td>12.528570</td>
    </tr>
    <tr>
      <th>50%</th>
      <td>0.001589</td>
      <td>13.971209</td>
      <td>14.032747</td>
    </tr>
    <tr>
      <th>75%</th>
      <td>0.001590</td>
      <td>15.600170</td>
      <td>15.622603</td>
    </tr>
    <tr>
      <th>max</th>
      <td>1.188795</td>
      <td>20.020468</td>
      <td>22.517797</td>
    </tr>
  </tbody>
</table>
</div>




```python
fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 4))
ax1.plot(metrics["time"], metrics["spread_bps"], color=GREEN, lw=1)
ax1.set_title("Bid-ask spread (bps)"); ax1.set_ylabel("bps")
ax2.plot(metrics["time"], metrics["bid_depth"], color=GREEN, lw=1, label="bid")
ax2.plot(metrics["time"], metrics["ask_depth"], color=CORAL, lw=1, label="ask")
ax2.set_title(f"Depth within {DEPTH_PCT * 100:g}% of mid"); ax2.set_ylabel("size"); ax2.legend()
fig.autofmt_xdate()
plt.tight_layout(); plt.show()
```


    
<figure><img src="../../.gitbook/assets/sales_demo_order_book_updates_18_0.png" alt=""><figcaption></figcaption></figure>
    


## Takeaways

- **Three schemas, one data model.** Historical snapshots, historical updates, and the real-time stream all share the same `[price, size]` message shape.
- **One code path, live or historical.** The same `apply_message` reconstructs the book from websocket messages and from `dataset=updates` rows — we even replayed the exact window we had just streamed live.
- Treat **every** `snapshot` as a full reset (not just the first) — a redundant-stream failover can emit an out-of-band snapshot.
- Historical `dataset=updates` is **reproducible**, so research and production share the exact same book-building logic.
