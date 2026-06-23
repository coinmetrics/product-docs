import os, requests, json

api_key = os.environ['CM_API_KEY']
base = "https://api.coinmetrics.io/v4/catalog-v2"

tests = [
    # Known missing asset metric (should error)
    ("asset-metrics", "FlowInBBXNtv"),
    # Known present asset metric (should succeed)
    ("asset-metrics", "FlowInBFXNtv"),
    # Known present institution metric (should succeed)
    ("institution-metrics", "xlm_coin_per_share"),
    # Known missing institution metric that might be in metrics.json
    ("institution-metrics", "FlowInBBXNtv"),
]

for endpoint, metric in tests:
    url = f"{base}/{endpoint}"
    r = requests.get(url, params={"api_key": api_key, "metrics": metric, "page_size": 1})
    print(f"\n--- {endpoint} | {metric} ---")
    print(f"Status: {r.status_code}")
    print(json.dumps(r.json(), indent=2)[:500])
