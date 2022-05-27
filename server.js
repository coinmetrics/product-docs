const http = require('http')
const https = require('https')
const fs = require('fs')
const process = require('process')

// Server params
const BUILD_ID = process.env.BUILD_ID
const HOST = process.env.HOST || '127.0.0.1'
const PORT = process.env.PORT || '3000'
// API request params
const API_ENVS = {
  production: {
    pro: 'https://api.coinmetrics.io/v4',
    community: 'https://community-api.coinmetrics.io/v4',
  },
  staging: {
    pro: 'https://staging-api4.coinmetrics.io/v4',
    community: 'https://staging-community-api4.coinmetrics.io/v4',
  },
}
const API_ENV = process.env.API_ENV || 'production'
const API_PRO_URL = API_ENVS[API_ENV].pro
const API_COMMUNITY_URL = API_ENVS[API_ENV].community
const COMMON_REQUEST_HEADERS = {
  Accept: 'application/json',
}
// Response params
const COMMON_RESPONSE_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET',
  'Access-Control-Max-Age': 2592000, // 30 days
  'Content-Type': 'application/json',
}
const CONTENT_TYPE = {
  svg: 'image/svg+xml',
  ico: 'image/x-icon',
  css: 'text/css; charset=utf-8',
  js: 'application/javascript; charset=utf-8',
  html: 'text/html; charset=utf-8',
  json: 'application/json'
}
// Errors
const FAILED = 'request failed'
const BAD_REQUEST = 'bad request'
const INVALID_RESPONSE = 'invalid response'
const INVALID_KEY = 'invalid key'
// HTML document
const NAV_PAGES = {
  assets: 0,
  pairs: 1,
  exchanges: 2,
  assetMetrics: 3,
  pairMetrics: 4,
  exchangeMetrics: 5
}

// Cached data
const CATALOG_UPDATE_INTERVAL = 320000 // 5min
let publicCache = {},
  landingHtmlDocCache,
  notFoundHtmlDocCache,
  errorHtmlDocCache,
  searchResultsCache,
  searchResultsHtmlDocCache,
  assetsCache,
  assetsHtmlDocCache,
  singleAssetHtmlDocsCache = {},
  pairsCache,
  pairsHtmlDocCache,
  singlePairHtmlDocsCache = {},
  exchangesCache,
  exchangesHtmlDocCache,
  singleExchangeHtmlDocsCache = {},
  metricsCache,
  assetMetricsCache,
  assetMetricsHtmlDocCache,
  singleAssetMetricHtmlDocsCache = {},
  pairMetricsCache,
  pairMetricsHtmlDocCache,
  singlePairMetricHtmlDocsCache = {},
  exchangeMetricsCache,
  exchangeMetricsHtmlDocCache,
  singleExchangeMetricHtmlDocsCache = {}

let log = (msg, level = 'ERROR') => {
  let s = '[' + new Date().toISOString() + '|' + level + '] ' + msg
  if (level === 'ERROR') console.error("\x1b[31m", s, "\x1b[0m")
  else console.log(s)
}
let requestLogger = req => (msg, level) => log(req.url + ' :: ' + msg, level)  

// HTML snippets
let renderShipSvg = () => /*html*/`
  <cm-inline-svg>
    <img src="https://cdn.coinmetrics.io/ship.svg" alt="Empty contents">
  </cm-inline-svg>`
let renderEmptyResults = idPrefix => /*html*/`
  <div id="${idPrefix ? idPrefix+'-' : ''}empty" class="Empty-results" hidden>
    <div>
      <h2 class="Text-heading-2">Oops!</h2>
      <div class="Line-h-dark"></div>
      <p class="Text-regular">
        No results found.
      </p>
    </div>
    ${renderShipSvg()}
  </div>`
let renderFrequencyDropdown = () => /*html*/`
  <cm-dropdown id="frequency-filter">
    <fieldset>
      <details class="Dropdown">
        <summary class="Button">
          <span>All frequencies</span>
          <cm-icon name="chevron-down"></cm-icon>
        </summary>
        <fieldset>
          <legend>Select the frequency to filter</legend>
          <input autocomplete="off" type="radio" name="frequencies-filter" id="all-frequencies" value="all" checked>
          <label for="all-frequencies">
            All frequencies
          </label>
          <input autocomplete="off" type="radio" name="frequencies-filter" id="1d" value="1d">
          <label for="1d">
            1d (Daily)
          </label>
          <input autocomplete="off" type="radio" name="frequencies-filter" id="1d-ny-close" value="1d-ny-close">
          <label for="1d-ny-close">
            1d-ny-close (Daily NY)
          </label>
          <input autocomplete="off" type="radio" name="frequencies-filter" id="1h" value="1h">
          <label for="1h">
            1h (Hourly)
          </label>
          <input autocomplete="off" type="radio" name="frequencies-filter" id="1m" value="1m">
          <label for="1m">
            1m (Minute)
          </label>
          <input autocomplete="off" type="radio" name="frequencies-filter" id="1s" value="1s">
          <label for="1s">
            1s (Second)
          </label>
          <input autocomplete="off" type="radio" name="frequencies-filter" id="1b" value="1b">
          <label for="1b">
            1b (Block)
          </label>
        </fieldset>
      </details>
    </fieldset>
  </cm-dropdown>`
let renderMarketTypeDropdown = () => /*html*/`
  <cm-dropdown id="markets-type-filter">
    <fieldset>
      <details class="Dropdown">
        <summary class="Button">
          <span>All types</span>
          <cm-icon name="chevron-down"></cm-icon>
        </summary>
        <fieldset>
          <legend>Select the market type to filter</legend>
          <input autocomplete="off" type="radio" name="type-filter" id="all-types" value="all" checked>
          <label for="all-types">
            All types
          </label>
          <input autocomplete="off" type="radio" name="type-filter" id="spot" value="spot">
          <label for="spot">
            Spot
          </label>
          <input autocomplete="off" type="radio" name="type-filter" id="future" value="future">
          <label for="future">
            Future
          </label>
        </fieldset>
      </details>
    </fieldset>
  </cm-dropdown>`
let renderTextFilter = idPrefix => /*html*/`
  <label class="Input-with-icon Filter-input">
    <input id="${idPrefix ? idPrefix+'-' : ''}text-filter" class="Input" placeholder="Filter">
    <cm-icon name="filter">Filter</cm-icon>
  </label>`
let renderDownloadButton = idPrefix => /*html*/`
  <button id="${idPrefix ? idPrefix+'-' : ''}download" class="Button">
    <span>Download</span>
    <cm-icon class="Icon-s" name="download"></cm-icon>
  </button>
  <a id="${idPrefix ? idPrefix+'-' : ''}download-link" hidden></a>`
let renderLoadMore = idPrefix => /*html*/`
  <article hidden class="Load-buttons">
    <button id="${idPrefix ? idPrefix+'-' : ''}load-more" class="Button">
      <span>Load More</span>
      <cm-icon name="refresh-cw" class="Icon-s"></cm-icon>
    </button>
    <div></div>
    <p class="Text-regular">
      Showing <span class="Text-bold" id="${idPrefix ? idPrefix+'-' : ''}load-count"></span> 
      of <span class="Text-bold" id="${idPrefix ? idPrefix+'-' : ''}load-total"></span>
    </p>
    <button id="${idPrefix ? idPrefix+'-' : ''}load-all" class="Button">
      Show All
    </button>
  </article>`

// HTML pages
let renderMasterHtmlDoc = ({links = '', scripts = '', main = '', nav}) => /*html*/`
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <title>Coin Metrics Knowledge Base</title>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta charset="UTF-8">
      <meta name="description" content="CMBI" />
      <meta name="twitter:card" content="CMBI" />
      <meta name="twitter:site" content="@coinmetrics" />
      <meta name="twitter:title" content="Coin Metrics Bletchley Indexes" />
      <meta name="twitter:description" content="Coin Metrics Bletchley Indexes (CMBI) are single-asset, multi-asset and unique cryptoasset indexes" />
      <meta name="twitter:creator" content="@coinmetrics" />
      <meta name="twitter:image" content="https://coinmetrics.io/coinmetrics-share/" />
      <meta property="og:title" content="Coin Metrics Bletchley Indexes" />
      <meta property="og:type" content="app" />
      <meta property="og:url" content="https://indexes.coinmetrics.io/" />
      <meta property="og:image" content="https://coinmetrics.io/coinmetrics-share/" />
      <meta property="og:description" content="Coin Metrics Bletchley Indexes (CMBI) are single-asset, multi-asset and unique cryptoasset indexes." />
      <meta property="og:site_name" content="Coin Metrics Bletchley Indexes" />
      <link rel="icon" type="image/png" href="/public/favicon.ico">
      <link rel="stylesheet" media="screen" href="/public/chocolate-ui.css">
      <link rel="stylesheet" media="screen" href="/public/shared.css">
      <link rel="stylesheet" media="screen" href="/public/app-layout.css">
      ${links}
      <script defer src="/public/chocolate-ui.js"></script>
      <script defer src="/public/shared.js"></script>
      ${scripts}
      <!-- TODO Google Tag Manager -->
    </head>
    <body>
      <input type="checkbox" class="Theme-night-toggle" id="night-toggle">
      <script type="text/javascript">
        let $nightToggle = document.getElementById('night-toggle')
        $nightToggle.checked = localStorage['CMKB:night-mode'] === 'true'
        
        $nightToggle.addEventListener('change', () => 
          localStorage['CMKB:night-mode'] = $nightToggle.checked)
      </script>
      <div class="Theme-content">
        <header class="AppLayout-header">
          <a href="https://coinmetrics.io/" title="Go to Coin Metrics">
            <cm-inline-svg>
              <img class="AppLayout-logo" src="https://cdn.coinmetrics.io/coinmetrics-default.svg" alt="Coin Metrics">
            </cm-inline-svg>
          </a>
          <div class="Line-v-dark"></div>
          <a href="/" title="Go to home">
            <cm-inline-svg>
              <img class="AppLayout-logo" src="/public/wordmark.svg" alt="Knowledge Base">
            </cm-inline-svg>
          </a>
        </header>
        <main class="AppLayout-main">
          ${main}
        </main>
        <cm-sidebar>
          <article class="Sidebar-toolbar">
            <button class="Sidebar-toggle-button" data-extras-section="nav">
              <cm-icon name="menu">Open the navigation menu</cm-icon>
            </button>
            <div class="Line-h-light"></div>
            <cm-popup>
              <details id="api-key-popup">
                <summary class="Sidebar-button">
                  <cm-icon name="key">Manage visualization key</cm-icon>
                </summary>
                <article class="Popup-dialog Dialog Dialog-api-key">
                  <h2 class="Dialog-titlebar">CM Pro</h2>
                  <div class="Panel">
                    <p class="Text-regular">
                      Enter your visualization key to unlock CM Pro data available for your account.
                    </p>
                    <form id="api-key-form">
                      <label class="Input-with-icon">
                        <input class="Input" placeholder="Visualization Key" type="password">
                        <cm-icon name="key">Visualization key input</cm-icon>
                      </label>
                      <button class="Button-primary">Unlock CM Pro</button>
                    </form>
                    <a class="Link" href="#">Need a visualization key?</a>
                  </div>
                </article>
              </details>
            </cm-popup>
            <label class="Sidebar-button Theme-night-toggle-button" for="night-toggle" role="alert">
              <cm-icon name="moon">Night mode</cm-icon>
              <cm-icon name="sun">Day mode</cm-icon>
            </label>
          </article>
          <article class="Sidebar-extras">
            <nav id="nav">
              <form id="nav-search-form" class="Input-with-icon">
                <input class="Input-l" placeholder="Search...">
                <cm-icon name="search">Search CM Knowledge Base</cm-icon>
              </form>
              <ul class="NavList">
                <li ${nav === NAV_PAGES.assets ? 'class="NavList-selected"' : ''}>
                  <a href="/assets" title="Go to assets">
                    <cm-icon name="layers"></cm-icon>
                    Assets
                  </a>
                </li>
                <li ${nav === NAV_PAGES.pairs ? 'class="NavList-selected"' : ''}>
                  <a href="/pairs" title="Go to pairs">
                    <cm-icon name="pairs"></cm-icon>
                    Pairs
                  </a>
                </li>
                <li ${nav === NAV_PAGES.exchanges ? 'class="NavList-selected"' : ''}>
                  <a href="/exchanges" title="Go to exchanges">
                    <cm-icon name="exchanges"></cm-icon>
                    Exchanges
                  </a>
                </li>
                <li ${nav === NAV_PAGES.assetMetrics ? 'class="NavList-selected"' : ''}>
                  <a href="/asset-metrics" title="Go to assets">
                    <cm-icon name="asset-metrics"></cm-icon>
                    Asset Metrics
                  </a>
                </li>
                <li ${nav === NAV_PAGES.pairMetrics ? 'class="NavList-selected"' : ''}>
                  <a href="/pair-metrics" title="Go to pairs">
                    <cm-icon name="pair-metrics"></cm-icon>
                    Pair Metrics
                  </a>
                </li>
                <li ${nav === NAV_PAGES.exchangeMetrics ? 'class="NavList-selected"' : ''}>
                  <a href="/exchange-metrics" title="Go to exchanges">
                    <cm-icon name="exchange-metrics"></cm-icon>
                    Exchange Metrics
                  </a>
                </li>
              </ul>
            </nav>
          </article>
        </cm-sidebar>
      </div>
      <script>
        console.log('Build ${BUILD_ID}')
      </script>
    </body>
  </html>`
let renderNotFoundHtmlDoc = () => renderMasterHtmlDoc({
  main: /*html*/`
    <section class="Error">
      <div>
        <h2 class="Text-heading-2">Oops!</h2>
        <div class="Line-h-dark"></div>
        <p class="Text-regular">
          You requested something that was not found
        </p>
      </div>
      ${renderShipSvg()}
    </section>
  `,
})
let renderErrorHtmlDoc = () => renderMasterHtmlDoc({
  main: /*html*/`
    <section class="Error">
      <div>
        <h2 class="Text-heading-2">Oops!</h2>
        <div class="Line-h-dark"></div>
        <p class="Text-regular">
          Something unexpected happened.
        </p>
      </div>
      ${renderShipSvg()}
    </section>
  `,
})
let renderLandingHtmlDoc = () => renderMasterHtmlDoc({
  links: /*html*/`<link rel="stylesheet" media="screen" href="/public/index.css">`,
  scripts: /*html*/`<script defer src="/public/index.js"></script>`,
  main: /*html*/`
    <h1 class="Text-heading-1">Knowledge Base</h1>
    <div class="Line-h-dark"></div>
    <p class="Text-regular">
      Distinctively simplify functionalized catalysts for change and technically sound catalysts for change. 
      <br>
      Quickly scale impactful niche markets via reliable vortals. Quickly evisculate..
    </p>
    <form id="form">
      <input type="search" class="Input-l" placeholder="Search">
      <button class="Button-primary Button-l">
        <span>Search</span>
        <cm-icon name="search"></cm-icon>
      </button>
    </form>`,
})
let renderSearchResultsHtmlDoc = () => renderMasterHtmlDoc({
  links: /*html*/`<link rel="stylesheet" media="screen" href="/public/search-results.css">`,
  scripts: /*html*/`<script defer src="/public/search-results.js"></script>`,
  main: /*html*/`
    <section class="Panel">
      <form id="form">
        <label>
          <span class="AT-only">Search</span>
          <input class="Input-l" placeholder="Search">
        </label>
        <button class="Button-primary Button-l">
          <span>Search</span>
          <cm-icon name="search"></cm-icon>
        </button>
      </form>
    </section>
    <section class="Panel">
      <header>
        <cm-icon name="search"></cm-icon>
        <p class="Text-heading-3">Results</p>
      </header>
      <div class="Line-h-dark"></div>
      <div class="Filters-row">
        <cm-dropdown id="filter">
          <fieldset>
            <details class="Dropdown">
              <summary class="Button">
                <span>All types</span>
                <cm-icon name="chevron-down"></cm-icon>
              </summary>
              <fieldset>
                <legend>Select the result type to filter</legend>
                <input autocomplete="off" type="radio" name="type-filter" id="all-types" value="all" checked>
                <label for="all-types">
                  All types
                </label>
                <input autocomplete="off" type="radio" name="type-filter" id="assets" value="ASSET">
                <label for="assets">
                  Assets
                </label>
                <input autocomplete="off" type="radio" name="type-filter" id="pairs" value="PAIR">
                <label for="pairs">
                  Pairs
                </label>
                <input autocomplete="off" type="radio" name="type-filter" id="exchanges" value="EXCHANGE">
                <label for="exchanges">
                  Exchanges
                </label>
                <input autocomplete="off" type="radio" name="type-filter" id="asset-metrics" value="ASSET_METRIC">
                <label for="asset-metrics">
                  Asset Metrics
                </label>
                <input autocomplete="off" type="radio" name="type-filter" id="pair-metrics" value="PAIR_METRIC">
                <label for="pair-metrics">
                  Pair Metrics
                </label>
                <input autocomplete="off" type="radio" name="type-filter" id="exchange-metrics" value="EXCHANGE_METRIC">
                <label for="exchange-metrics">
                  Exchange Metrics
                </label>
              </fieldset>
            </details>
          </fieldset>
        </cm-dropdown>
        <div class="Filters-row-spacer"></div>
        <p class="Text-regular">
          Showing <span class="Text-bold" id="count">
          of <span class="Text-bold" id="total">
        </p>
        ${renderDownloadButton()}
      </div>
      <div id="results" class="Results"></div>
      <cm-paginator id="paginator" hidden current="1"></cm-paginator>
      ${renderEmptyResults()}
    </section>`,
})
let renderAssetsHtmlDoc = () => renderMasterHtmlDoc({
  links: /*html*/`<link rel="stylesheet" media="screen" href="/public/table.css">`,
  scripts: /*html*/`<script defer src="/public/assets.js"></script>`,
  main: /*html*/`
    <header class="Text-content">
      <h2>Assets</h2>
      <div class="Line-v-light"></div>
      <p>
        The available assets and the available metrics, markets and exchanges 
        for each asset can be found by querying our 
        <a class="Link" target="_blank" rel="noreferrer noopener" href="https://docs.coinmetrics.io/api/v4#operation/getCatalogAssets">
          <code>/catalog/assets</code>
        </a> or 
        <a class="Link" target="_blank" rel="noreferrer noopener" href="https://docs.coinmetrics.io/api/v4#operation/getCatalogAllAssets">
          <code>/catalog-all/assets</code>
        </a> 
        API endpoints. 
      </p>
    </header>
    <div class="Panel">
      <div class="Filters-row">
        ${renderTextFilter()}
        <div class="Filters-row-spacer"></div>
        ${renderDownloadButton()}
      </div>
      <cm-table>
        <table left-align>
          <thead>
            <tr>
              <th>asset</th>
              <th>full name</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </cm-table>
      ${renderLoadMore()}
      ${renderEmptyResults()}
    </div>`,
  nav: NAV_PAGES.assets
})
let renderSingleAssetHtmlDoc = asset => renderMasterHtmlDoc({
  links: /*html*/`<link rel="stylesheet" media="screen" href="/public/table.css">`,
  scripts: /*html*/`<script defer src="/public/single-asset.js"></script>`,
  main: /*html*/`
    <header class="Text-content">
      <cm-coin class="Coin-xl" name="${asset.id}"></cm-coin>
      <div>
        <h2>${asset.id}</h2>
        <p>${asset.fullName}</p>
      </div>
      <div class="Line-v-light"></div>
      <p>
        Full asset is queryable via our API at 
        <a class="Link" target="_blank" rel="noreferrer noopener" href="https://docs.coinmetrics.io/api/v4#operation/getCatalogAssets">
          <code>/catalog/assets?assets=${asset.id}</code>
        </a>
      </p>
    </header>
    <div class="Panel">
      <cm-tabs>
        <fieldset class="Tabs" disabled hidden>
          <input type="radio" value="metrics" name="availability" id="availability-metrics" checked>
          <label for="availability-metrics" class="Text-heading-4">Metrics</label>
          <input type="radio" value="markets" name="availability" id="availability-markets">
          <label for="availability-markets" class="Text-heading-4">Markets</label>
          <input type="radio" value="exchanges" name="availability" id="availability-exchanges">
          <label for="availability-exchanges" class="Text-heading-4">Exchanges</label>
        </fieldset>
      </cm-tabs>
      <article id="metrics" class="Tabbed-table">
        <div class="Filters-row">
          ${renderFrequencyDropdown()}
          ${renderTextFilter('metrics')}
          <div class="Filters-row-spacer"></div>
          ${renderDownloadButton('metrics')}
        </div>
        <cm-table>
          <table class="Access">
            <thead>
              <tr>
                <th>metric</th>
                <th>community</th>
                <th>pro</th>
                <th id="metrics-key-col"></th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </cm-table>
        ${renderLoadMore('metrics')}
        ${renderEmptyResults('metrics')}
      </article>
      <article id="markets" class="Tabbed-table">
        <div class="Filters-row">
          ${renderMarketTypeDropdown()}
          ${renderTextFilter('markets')}
          <div class="Filters-row-spacer"></div>
          ${renderDownloadButton('markets')}
        </div>
        <cm-table>
          <table class="Access">
            <thead>
              <tr>
                <th>market</th>
                <th>community</th>
                <th>pro</th>
                <th id="markets-key-col"></th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </cm-table>
        ${renderLoadMore('markets')}
        ${renderEmptyResults('markets')}
      </article>
      <article id="exchanges" class="Tabbed-table">
        <div class="Filters-row">
          ${renderTextFilter('exchanges')}
          <div class="Filters-row-spacer"></div>
          ${renderDownloadButton('exchanges')}
        </div>
        <cm-table>
          <table class="Access">
            <thead>
              <tr>
                <th>exchange</th>
                <th>community</th>
                <th>pro</th>
                <th id="exchanges-key-col"></th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </cm-table>
        ${renderLoadMore('exchanges')}
        ${renderEmptyResults('exchanges')}
      </article>
    </div>`,
  nav: NAV_PAGES.assets
})
let renderPairsHtmlDoc = () => renderMasterHtmlDoc({
  links: /*html*/`<link rel="stylesheet" media="screen" href="/public/table.css">`,
  scripts: /*html*/`<script defer src="/public/pairs.js"></script>`,
  main: /*html*/`
    <header class="Text-content">
      <h2>Pairs</h2>
      <div class="Line-v-light"></div>
      <p>
        The pair coverage can be found by querying our 
        <a class="Link" target="_blank" rel="noreferrer noopener" href="https://docs.coinmetrics.io/api/v4#operation/getCatalogAssetPairs">
          <code>/catalog/pairs</code>
        </a> or 
        <a class="Link" target="_blank" rel="noreferrer noopener" href="https://docs.coinmetrics.io/api/v4#operation/getCatalogAllAssetPairs">
          <code>/catalog-all/pairs</code>
        </a> 
        API endpoints. The pair coverage is defined as the combination (cartesian product) of all 
        the top assets (approximately the top 300 assets by market capitalization).
      </p>
    </header>
    <div class="Panel">
      <div class="Filters-row">
        ${renderTextFilter()}
        <div class="Filters-row-spacer"></div>
        ${renderDownloadButton()}
      </div>
      <cm-table>
        <table left-align>
          <thead>
            <tr>
              <th>ID</th>
              <th>base asset</th>
              <th>quote asset</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </cm-table>
      ${renderLoadMore()}
      ${renderEmptyResults()}
    </div>`,
  nav: NAV_PAGES.pairs
})
let renderSinglePairHtmlDoc = pair => renderMasterHtmlDoc({
  links: /*html*/`<link rel="stylesheet" media="screen" href="/public/table.css">`,
  scripts: /*html*/`<script defer src="/public/single-pair.js"></script>`,
  main: /*html*/`
    <header class="Text-content">
      <h2>${pair.id}</h2>
      <div class="Line-v-light"></div>
      <p>
        Full pair is queryable via our API at 
        <a class="Link" target="_blank" rel="noreferrer noopener" href="https://docs.coinmetrics.io/api/v4#operation/getCatalogAssetPairs">
          <code>/catalog/pairs?pairs=${pair.id}</code>
        </a>
      </p>
    </header>
    <div class="Panel">
      <div class="Filters-row">
        ${renderFrequencyDropdown()}
        ${renderTextFilter()}
        <div class="Filters-row-spacer"></div>
        ${renderDownloadButton()}
      </div>
      <cm-table>
        <table class="Access">
          <thead>
            <tr>
              <th>metric</th>
              <th>community</th>
              <th>pro</th>
              <th id="key-col"></th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </cm-table>
      ${renderLoadMore()}
      ${renderEmptyResults()}
    </div>`,
  nav: NAV_PAGES.pairs
})
let renderExchangesHtmlDoc = () => renderMasterHtmlDoc({
  links: /*html*/`<link rel="stylesheet" media="screen" href="/public/table.css">`,
  scripts: /*html*/`<script defer src="/public/exchanges.js"></script>`,
  main: /*html*/`
    <header class="Text-content">
      <h2>Exchanges</h2>
      <div class="Line-v-light"></div>
      <p>
        The available exchanges and the metrics available for each exchange 
        can be found by querying our 
        <a class="Link" target="_blank" rel="noreferrer noopener" href="https://docs.coinmetrics.io/api/v4#operation/getCatalogExchanges">
          <code>/catalog/exchanges</code>
        </a> or 
        <a class="Link" target="_blank" rel="noreferrer noopener" href="https://docs.coinmetrics.io/api/v4#operation/getCatalogAllExchanges">
          <code>/catalog-all/exchanges</code> 
        </a> API endpoints. 
      </p>
    </header>
    <div class="Panel">
      <div class="Filters-row">
        ${renderTextFilter()}
        <div class="Filters-row-spacer"></div>
        ${renderDownloadButton()}
      </div>
      <cm-table>
        <table left-align>
          <thead>
            <tr>
              <th>exchange</th>
              <th>min time</th>
              <th>max time</th>
              <th>total spot</th>
              <th>total futures</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </cm-table>
      ${renderLoadMore()}
      ${renderEmptyResults()}
    </div>`,
  nav: NAV_PAGES.exchanges
})
let renderSingleExchangeHtmlDoc = exchange => renderMasterHtmlDoc({
  links: /*html*/`<link rel="stylesheet" media="screen" href="/public/table.css">`,
  scripts: /*html*/`<script defer src="/public/single-exchange.js"></script>`,
  main: /*html*/`
    <header class="Text-content">
      <h2>${exchange.id}</h2>
      <div class="Line-v-light"></div>
      <p>
        Full exchange is queryable via our API at 
        <a class="Link" target="_blank" rel="noreferrer noopener" href="https://docs.coinmetrics.io/api/v4#operation/getCatalogExchanges">
          <code>/catalog/exchanges?exchanges=${exchange.id}</code>
        </a>
      </p>
    </header>
    <div class="Panel">
      <cm-tabs>
        <fieldset class="Tabs" disabled hidden>
          <input type="radio" value="metrics" name="availability" id="availability-metrics" checked>
          <label for="availability-metrics" class="Text-heading-4">Metrics</label>
          <input type="radio" value="markets" name="availability" id="availability-markets">
          <label for="availability-markets" class="Text-heading-4">Markets</label>
        </fieldset>
      </cm-tabs>
      <article id="metrics"  class="Tabbed-table">
        <div class="Filters-row">
          ${renderFrequencyDropdown()}
          ${renderTextFilter('metrics')}
          <div class="Filters-row-spacer"></div>
          ${renderDownloadButton('metrics')}
        </div>
        <cm-table>
          <table class="Access">
            <thead>
              <tr>
                <th>metric</th>
                <th>community</th>
                <th>pro</th>
                <th id="metrics-key-col"></th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </cm-table>
        ${renderLoadMore('metrics')}
        ${renderEmptyResults('metrics')}
      </article>
      <article id="markets"  class="Tabbed-table">
        <div class="Filters-row">
          ${renderMarketTypeDropdown()}
          ${renderTextFilter('markets')}
          <div class="Filters-row-spacer"></div>
          ${renderDownloadButton('markets')}
        </div>
        <cm-table>
          <table class="Access">
            <thead>
              <tr>
                <th>market</th>
                <th>community</th>
                <th>pro</th>
                <th id="markets-key-col">your key</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </cm-table>
        ${renderLoadMore('markets')}
        ${renderEmptyResults('markets')}
      </article>
    </div>`,
  nav: NAV_PAGES.exchanges
})
let renderAssetMetricsHtmlDoc = () => renderMasterHtmlDoc({
  links: /*html*/`<link rel="stylesheet" media="screen" href="/public/table.css">`,
  scripts: /*html*/`<script defer src="/public/asset-metrics.js"></script>`,
  main: /*html*/`
    <header class="Text-content">
      <div>
        <h2>Asset metrics</h2>
        <p>
          <a class="Link" target="_blank" rel="noreferrer noopener" href="https://docs.coinmetrics.io/api/v4#operation/getTimeseriesAssetMetrics">
            <code>/timeseries/asset-metrics</code>
          </a>
        </p>
      </div>
      <div class="Line-v-light"></div>
      <p>
        Our Asset metrics include our Network Data time series metrics and certain Market Data metrics that are aggregated at the asset-level (e.g., Reference Rates/Prices and Trusted Volume). 
      </p>
    </header>
    <div class="Panel">
      <div class="Filters-row">
        ${renderFrequencyDropdown()}
        ${renderTextFilter()}
        <div class="Filters-row-spacer"></div>
        ${renderDownloadButton()}
      </div>
      <cm-table>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>name</th>
              <th>category</th>
              <th>subcategory</th>
              <th>frequencies</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </cm-table>
      ${renderLoadMore()}
      ${renderEmptyResults()}
    </div>`,
  nav: NAV_PAGES.assetMetrics
})
let renderSingleAssetMetricHtmlDoc = assetMetric => renderMasterHtmlDoc({
  links: /*html*/`<link rel="stylesheet" media="screen" href="/public/table.css">`,
  scripts: /*html*/`<script defer src="/public/single-asset-metric.js"></script>`,
  main: /*html*/`
    <header class="Text-content">
      <div>
        <h2>${assetMetric.id}</h2>
        <p>${assetMetric.name}</p>
      </div>
      <div class="Line-v-light"></div>
      <p>${assetMetric.description}</p>
    </header>
    <div class="Panel">
      <div class="Filters-row">
        ${renderTextFilter()}
        <div class="Filters-row-spacer"></div>
        ${renderDownloadButton()}
      </div>
      <cm-table>
        <table class="Access">
          <thead>
            <tr>
              <th>asset</th>
              <th>community</th>
              <th>pro</th>
              <th id="key-col"></th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </cm-table>
      ${renderLoadMore()}
      ${renderEmptyResults()}
    </div>`,
  nav: NAV_PAGES.assetMetrics
})
let renderPairMetricsHtmlDoc = () => renderMasterHtmlDoc({
  links: /*html*/`<link rel="stylesheet" media="screen" href="/public/table.css">`,
  scripts: /*html*/`<script defer src="/public/pair-metrics.js"></script>`,
  main: /*html*/`
    <header class="Text-content">
      <div>
        <h2>Pair metrics</h2>
        <p>
          <a class="Link" target="_blank" rel="noreferrer noopener" href="https://docs.coinmetrics.io/api/v4#operation/getTimeseriesPairMetrics">
            <code>/timeseries/pair-metrics</code>
          </a>
        </p>
      </div>
      <div class="Line-v-light"></div>
      <p>
        Coin Metrics calculates several metrics for asset pairs such as <code>btc-usd</code> and <code>eth-usd</code>. 
        For example, the metric <code>volume_reported_spot_usd_1d</code> represents the daily spot volume 
        in U.S. dollars for all markets in our coverage universe that contain the specific pair.
      </p>
    </header>
    <div class="Panel">
      <div class="Filters-row">
        ${renderFrequencyDropdown()}
        ${renderTextFilter()}
        <div class="Filters-row-spacer"></div>
        ${renderDownloadButton()}
      </div>
      <cm-table>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>name</th>
              <th>category</th>
              <th>subcategory</th>
              <th>frequencies</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </cm-table>
      ${renderLoadMore()}
      ${renderEmptyResults()}
    </div>`,
  nav: NAV_PAGES.pairMetrics
})
let renderSinglePairMetricHtmlDoc = pairMetric => renderMasterHtmlDoc({
  links: /*html*/`<link rel="stylesheet" media="screen" href="/public/table.css">`,
  scripts: /*html*/`<script defer src="/public/single-pair-metric.js"></script>`,
  main: /*html*/`
    <header class="Text-content">
      <div>
        <h2>${pairMetric.id}</h2>
        <p>${pairMetric.name}</p>
      </div>
      <div class="Line-v-light"></div>
      <p>${pairMetric.description}</p>
    </header>
    <div class="Panel">
      <div class="Filters-row">
        ${renderTextFilter()}
        <div class="Filters-row-spacer"></div>
        ${renderDownloadButton()}
      </div>
      <cm-table>
        <table class="Access">
          <thead>
            <tr>
              <th>pair</th>
              <th>community</th>
              <th>pro</th>
              <th id="key-col"></th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </cm-table>
      ${renderLoadMore()}
      ${renderEmptyResults()}
    </div>`,
  nav: NAV_PAGES.pairMetrics
})
let renderExchangeMetricsHtmlDoc = () => renderMasterHtmlDoc({
  links: /*html*/`<link rel="stylesheet" media="screen" href="/public/table.css">`,
  scripts: /*html*/`<script defer src="/public/exchange-metrics.js"></script>`,
  main: /*html*/`
    <header class="Text-content">
      <div>
        <h2>Exchange metrics</h2>
        <p>
          <a class="Link" target="_blank" rel="noreferrer noopener" href="https://docs.coinmetrics.io/api/v4#operation/getTimeseriesExchangeMetrics">
            <code>/timeseries/exchange-metrics</code>
          </a>
        </p>
      </div>
      <div class="Line-v-light"></div>
      <p>
        Coin Metrics calculates several metrics for exchange-asset pairs such as <code>coinbase-btc</code>, <code>binance-eth</code>, and <code>deribit-usdt</code>. 
        For example, the metric <code>volume_reported_spot_usd_1d</code> represents the daily spot volume in U.S. dollars for a specific 
        asset that trades on a specific exchange.
      </p>
    </header>
    <div class="Panel">
      <div class="Filters-row">
        ${renderFrequencyDropdown()}
        ${renderTextFilter()}
        <div class="Filters-row-spacer"></div>
        ${renderDownloadButton()}
      </div>
      <cm-table>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>name</th>
              <th>category</th>
              <th>subcategory</th>
              <th>frequencies</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </cm-table>
      ${renderLoadMore()}
      ${renderEmptyResults()}
    </div>`,
  nav: NAV_PAGES.exchangeMetrics
})
let renderSingleExchangeMetricHtmlDoc = exchangeMetric => renderMasterHtmlDoc({
  links: /*html*/`<link rel="stylesheet" media="screen" href="/public/table.css">`,
  scripts: /*html*/`<script defer src="/public/single-exchange-metric.js"></script>`,
  main: /*html*/`
    <header class="Text-content">
      <div>
        <h2>${exchangeMetric.id}</h2>
        <p>${exchangeMetric.name}</p>
      </div>
      <div class="Line-v-light"></div>
      <p>${exchangeMetric.description}</p>
    </header>
    <div class="Panel">
      <div class="Filters-row">
        ${renderTextFilter()}
        <div class="Filters-row-spacer"></div>
        ${renderDownloadButton()}
      </div>
      <cm-table>
        <table class="Access">
          <thead>
            <tr>
              <th>asset</th>
              <th>community</th>
              <th>pro</th>
              <th id="key-col"></th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </cm-table>
      ${renderLoadMore()}
      ${renderEmptyResults()}
    </div>`,
  nav: NAV_PAGES.exchangeMetrics
})

// Backend CM API request functions
class RequestError extends Error {
  constructor(msg, res, json) {
    super(msg)
    this.statusCode = res.statusCode
    this.method = res.req?.method
    this.host = res.req?.host
    this.path = res.req?.path
    this.json = json ?? ''
  }

  toString() {
    return `${this.message} ${this.statusCode} ${this.method} ${this.host} ${this.path} ${this.json}`
  }
}
let transformMetricFrequenciesAcl = metrics => {
  if (!metrics) return {}

  let aclFrequencies = {}

  for (let {metric: id, frequencies} of metrics) {
    let acl = {c: [], p: []}
    frequencies.forEach(({frequency, community}) => {
      if (community) acl.c.push(frequency)
      acl.p.push(frequency)
    })
    if (!acl.c.length) delete acl.c
    aclFrequencies[id] = acl
  }

  return aclFrequencies
}
let getData = url => new Promise((resolve, reject) => {
  https.get(
    url,
    { headers: { ...COMMON_REQUEST_HEADERS, 'X-Request-Time': '' + Date.now() } },
    res => {
      if (res.statusCode === 401) reject(new RequestError(INVALID_KEY, res))
      if (res.statusCode !== 200) reject(new RequestError(BAD_REQUEST, res))
      let json = ''
      res.on('data', chunk => json += chunk)
      res.on('end', () => {
        try {
          resolve(JSON.parse(json).data)
        } catch (e) {
          reject(new RequestError(INVALID_RESPONSE, res, json))
        }
      })
    },
  ).on('error', error => new RequestError(FAILED, error))
})
let getAssets = () => Promise.all([
  getData(API_COMMUNITY_URL + '/catalog-all/assets'),
  getData(API_COMMUNITY_URL + `/catalog/assets`)
])
  .then(([all, community]) => {
    // we aggregate dictionaries to improve performance
    let communityAssets = {}
    let communityExchanges = {}
    let communityMarkets = {}
    community.forEach(asset => {
      communityAssets[asset.asset] = 'c'
      if (asset.exchanges)
        asset.exchanges.forEach(exchange => communityExchanges[asset.asset + '-' + exchange] = 'c')
      if (asset.markets)
        asset.markets.forEach(markets => communityMarkets[asset.asset + '-' + markets] = 'c')
    })
  
    let assets = {}
    all.forEach(asset => {
      let exchanges = {}
      asset.exchanges?.forEach(id => exchanges[id] = 'p' + (communityExchanges[asset.asset + '-' + id] ?? ''))

      let markets = {}
      asset.markets?.forEach(id => markets[id] = 'p' + communityExchanges[asset.asset + '-' + id] ?? '')

      assets[asset.asset] = {
        id: asset.asset,
        fullName: asset.full_name,
        acl: 'p' + (communityAssets[asset.asset] ?? ''),
        metrics: transformMetricFrequenciesAcl(asset.metrics),
        exchanges,
        markets
      }  
    })
  
    return {
      assets,
      pruned: Object.fromEntries(all.map(({asset, full_name}) => [asset, full_name]))
      // pruned: all.map(asset => ({
      //   id: asset.asset,
      //   fullName: asset.full_name
      // }))
    }
  })
let getAssetUserAcl = (id, apiKey) => 
  getData(API_PRO_URL + `/catalog/assets?assets=${id}&api_key=${apiKey}`)
    .then(([asset]) => ({
      id: asset.asset,
      metrics: Object.fromEntries(asset.metrics?.map(({metric, frequencies}) => [
        metric, frequencies.map(x => x.frequency)
      ]) ?? []),
      exchanges: Object.fromEntries(asset.exchanges?.map(exchange => [
        exchange, 'u'
      ]) ?? []),
      markets: Object.fromEntries(asset.markets?.map(market => [
        market, 'u'
      ]) ?? []),
    }))
let getAssetsForUser = apiKey => getData(API_PRO_URL + `/catalog/assets?api_key=${apiKey}`)
let getPairs = () => Promise.all([
  getData(API_COMMUNITY_URL + '/catalog-all/pairs'),
  getData(API_COMMUNITY_URL + '/catalog/pairs')
])
  .then(([all, community]) => {
    let communityPairs = {}
    for (let {pair: id} of community)
      communityPairs[id] = 'c'

    let pairs = {}
    for (let {pair: id, metrics} of all)
      pairs[id] = {
        id,
        acl: 'p' + (communityPairs[id] ?? ''),
        metrics: transformMetricFrequenciesAcl(metrics)
      }

    return {
      pairs,
      pruned: all.map(pair => pair.pair)
    }
  })
let getPairUserAcl = (id, apiKey) => 
  getData(API_PRO_URL + `/catalog/pairs?pairs=${id}&api_key=${apiKey}`)
    .then(([pair]) => ({
      id: pair.pair,
      metrics: Object.fromEntries(pair.metrics?.map(({metric, frequencies}) => [
        metric, frequencies.map(x => x.frequency)
      ]) ?? [])
    }))
let getPairsForUser = apiKey => getData(API_PRO_URL + `/catalog/pairs?api_key=${apiKey}`)
let getExchanges = () => Promise.all([
  getData(API_COMMUNITY_URL + '/catalog-all/exchanges'),
  getData(API_COMMUNITY_URL + `/catalog/exchanges`)
])
  .then(([all, community]) => {
    // we aggregate dictionaries to improve performance
    let communityExchanges = {}
    let communityMarkets = {}
    community.forEach(exchange => {
      communityExchanges[exchange.exchange] = 'c'
      if (exchange.markets)
        exchange.markets.forEach(market => communityMarkets[exchange.exchange + '-' + market] = 'c')
    })
  
    let exchanges = {}
    all.forEach(exchange => {
      let markets = {}
      exchange.markets?.forEach(x => markets[x] = 'p' + (communityMarkets[exchange.exchange + '-' + x] ?? ''))

      exchanges[exchange.exchange] = {
        id: exchange.exchange,
        acl: 'p' + (communityExchanges[exchange.exchange] ?? ''),
        metrics: transformMetricFrequenciesAcl(exchange.metrics),
        markets
      }
    }
    )
  
    return {
      exchanges,
      pruned: all.map(exchange => ({
        id: exchange.exchange,
        minTime: exchange.min_time,
        maxTime: exchange.max_time,
        totalSpot: exchange.markets.filter(x => x.includes('-spot')).length,
        totalFuture: exchange.markets.filter(x => x.includes('-future')).length,
      }))
    }
  })
let getExchangeUserAcl = (id, apiKey) => 
  getData(API_PRO_URL + `/catalog/exchanges?exchanges=${id}&api_key=${apiKey}`)
    .then(([exchange]) => ({
      id: exchange.exchange,
      metrics: Object.fromEntries(exchange.metrics?.map(({metric, frequencies}) => [
        metric, frequencies.map(x => x.frequency)
      ]) ?? []),
      markets: Object.fromEntries(exchange.markets?.map(market => [
        market, 'u'
      ]) ?? [])
    }))
let getExchangesForUser = apiKey => getData(API_PRO_URL + `/catalog/exchanges?api_key=${apiKey}`)
let getMetrics = () =>
  getData(API_COMMUNITY_URL + '/catalog-all/metrics')
    .then(metrics => Object.fromEntries(metrics.map(metric => [
      metric.metric, {
        id: metric.metric,
        name: metric.display_name || metric.full_name,
        fullName: metric.full_name,
        description: metric.description,
        category: metric.category,
        subcategory: metric.subcategory,
        type: metric.type,
        unit: metric.unit,
        dataType: metric.dataType,
        frequencies: metric.frequencies.map(x => x.frequency)
      }
    ])))
let getAssetMetrics = () => Promise.all([
  assetsCache,
  metricsCache
]).then(([{assets}, metrics]) => {
  // source of truth comes from assets
  let assetMetricIds = new Set()
  let metricAssets = {}
  for (let k in assets) 
    for (let m in assets[k].metrics) {
      assetMetricIds.add(m)

      if (!(m in metricAssets)) metricAssets[m] = {}
      metricAssets[m][k] = assets[k].acl
    }

  // then we build the asset metrics from the metric ids
  let pruned = []
  let assetMetrics = {}
  assetMetricIds.forEach(id => {
    let metric = metrics[id]
    if (!metric) log(`Asset metric not found in metrics for ${id}`)
    else {
      pruned.push(metric)
      assetMetrics[id] = {
        id, 
        name: metric.name,
        description: metric.description,
        assets: metricAssets[id]
      }
    }
  })

  return {
    pruned,
    assetMetrics
  }
})
let getAssetMetricUserAcl = (id, apiKey) => 
  getAssetsForUser(apiKey)
    .then(assets => {
      let metricAssets = {}
      assets.forEach(asset => 
        asset.metrics?.forEach(({metric}) => {
          if (metric === id) metricAssets[asset.asset] = 'u'
        }))

      return {
        id,
        assets: metricAssets
      }
    })
let getPairMetrics = () => Promise.all([
  pairsCache,
  metricsCache
]).then(([{pairs}, metrics]) => {
  // source of truth comes from pairs
  let pairMetricIds = new Set()
  let metricPairs = {}
  for (let k in pairs) {
    for (let m in pairs[k].metrics) {
      pairMetricIds.add(m)

      if (!(m in metricPairs)) metricPairs[m] = {}
      metricPairs[m][k] = pairs[k].acl
    }
  } 

  let pruned = []
  let pairMetrics = {}
  pairMetricIds.forEach(id => {
    let metric = metrics[id]
    if (!metric) log(`Asset metric not found in metrics for ${id}`)
    else {
      pruned.push(metric)
      pairMetrics[id] = {
        id, 
        name: metric.name,
        description: metric.description,
        pairs: metricPairs[id] 
      }
    }
  })

  return {
    pruned,
    pairMetrics
  }
})
let getPairMetricUserAcl = (id, apiKey) =>
  getPairsForUser(apiKey)
    .then(pairs => {
      let metricPairs = {}
      pairs.forEach(pair =>
        pair.metrics?.forEach(({metric}) => {
          if (metric === id) metricPairs[pair.pair] = 'u'
        }))

      return {
        id,
        pairs: metricPairs
      }
    })
let getExchangeMetrics = () => Promise.all([
  exchangesCache,
  metricsCache
]).then(([{exchanges}, metrics]) => {
  // source of truth comes from exchanges
  let exchangeMetricIds = new Set()
  let metricExchanges = {}
  for (let k in exchanges) {
    for (let m in exchanges[k].metrics) {
      exchangeMetricIds.add(m)

      if (!(m in metricExchanges)) metricExchanges[m] = {}
      metricExchanges[m][k] = exchanges[k].acl
    }
  } 

  let pruned = []
  let exchangeMetrics = {}
  exchangeMetricIds.forEach(id => {
    let metric = metrics[id]
    if (!metric) log(`Asset metric not found in metrics for ${id}`)
    else {
      pruned.push(metric)
      exchangeMetrics[id] = {
        id, 
        name: metric.name,
        description: metric.description,
        exchanges: metricExchanges[id] 
      }
    }
  })

  return {
    pruned,
    exchangeMetrics
  }
})
let getExchangeMetricUserAcl = (id, apiKey) => 
  getExchangesForUser(apiKey)
    .then(exchanges => {
      let metricExchanges = {}
      exchanges.forEach(({exchange, metrics}) =>
        metrics?.forEach(({metric}) => {
          if (metric === id) metricExchanges[exchange] = 'u'
        }))

      return {
        id,
        exchanges: metricExchanges
      }
    })
let getSearchResults = text => 
  searchResultsCache.then(({
    assets,
    pairs,
    exchanges,
    assetMetrics,
    pairMetrics,
    exchangeMetrics
  }) => {
    text = text.toLowerCase()
    let results = []
  
    for (let asset in assets)
      if (asset.toLowerCase().includes(text) || assets[asset].toLowerCase().includes(text))
        results.push({
          resultType: 'ASSET',
          id: asset,
          fullName: assets[asset]
        })
  
    for (let pair of pairs) 
      if (pair.toLowerCase().includes(text))
        results.push({
          resultType: 'PAIR',
          id: pair
        })
  
    for (let exchange of exchanges) 
      if (exchange.id.toLowerCase().includes(text))
        results.push({
          resultType: 'EXCHANGE',
          ...exchange
        })
  
    let metricCondition = x => 
      x.id.toLowerCase().includes(text) ||
      x.name.toLowerCase().includes(text) ||
      x.fullName.toLowerCase().includes(text)
  
    for (let metric of assetMetrics)
      if (metricCondition(metric))
        results.push({
          resultType: 'ASSET_METRIC',
          ...metric
        })
  
    for (let metric of pairMetrics)
      if (metricCondition(metric))
        results.push({
          resultType: 'PAIR_METRIC',
          ...metric
        })
  
    for (let metric of exchangeMetrics)
      if (metricCondition(metric))
        results.push({
          resultType: 'EXCHANGE_METRIC',
          ...metric
        })
  
    return {data: results}
  })

// Cache functions
let cachePublic = path => {
  let dirents = fs.readdirSync(path, { withFileTypes: true })
  for (let i = 0; i < dirents.length; i++) {
    let fullPath = `${path}/${dirents[i].name}`
    if (dirents[i].isDirectory()) cachePublic(fullPath)
    else publicCache[fullPath.replace(/^\./, '')] = fs.readFileSync(fullPath)
  }
}
let handleUpdateCacheError = error => {
  log(`Error caught updating cache ${error}`)
  return Promise.resolve({error})
}
let updateCache = () => {
  log('Starting cache update', 'INFO')
  assetsCache = getAssets().catch(handleUpdateCacheError)
  singleAssetHtmlDocsCache = {}
  pairsCache = getPairs().catch(handleUpdateCacheError)
  singlePairHtmlDocsCache = {}
  exchangesCache = getExchanges().catch(handleUpdateCacheError)
  singleExchangeHtmlDocsCache = {}
  metricsCache = getMetrics().catch(handleUpdateCacheError)
  assetMetricsCache = getAssetMetrics().catch(handleUpdateCacheError)
  singleAssetMetricHtmlDocsCache = {}
  pairMetricsCache = getPairMetrics().catch(handleUpdateCacheError)
  singlePairMetricHtmlDocsCache = {}
  exchangeMetricsCache = getExchangeMetrics().catch(handleUpdateCacheError)
  singleExchangeMetricHtmlDocsCache = {}
  searchResultsCache = Promise.all([
    assetsCache,
    pairsCache,
    exchangesCache,
    assetMetricsCache,
    pairMetricsCache,
    exchangeMetricsCache
  ]).then(([
    {pruned: assets, error: assetsError},
    {pruned: pairs, error: pairsError},
    {pruned: exchanges, error: exchangesError},
    {pruned: assetMetrics, error: assetMetricsError},
    {pruned: pairMetrics, error: pairMetricsError},
    {pruned: exchangeMetrics, error: exchangeMetricsError}
  ]) => ({
    assets,
    pairs,
    exchanges,
    assetMetrics,
    pairMetrics,
    exchangeMetrics,
    errors: [
      assetsError, 
      pairsError, 
      exchangesError,
      assetMetricsError, 
      pairMetricsError, 
      exchangeMetricsError
    ].filter(x => x)
  }))

  Promise.all([
    assetsCache,
    pairsCache,
    exchangesCache,
    metricsCache,
    assetMetricsCache,
    pairMetricsCache,
    exchangeMetricsCache
  ]).then(() => log('Completed cache update', 'INFO'))
}

// Server functions
let handleApiRequest = (log, req, res) => {
  let { pathname, searchParams } = new URL(req.url, `http://${req.headers.host}`)
  let path = pathname.split('/')
  let id = path[3]
  let apiKey = searchParams.get('api_key')

  let respondJson = (body, status = 200) => {
    let json = JSON.stringify(body)
    res.writeHead(status, {
      ...COMMON_RESPONSE_HEADERS,
      'Content-Length': Buffer.byteLength(json)
    })
    res.end(json)
  }
  let respond401 = () => {
    log('Requested API unauthorized')
    respondJson({}, 401)
  } 
  let respond404 = () => {
    log('Requested API not found')
    respondJson({}, 404)
  }
  let respond500 = err => {
    log(`Error caught handling API request ${err}`)
    respondJson({}, 500)
  }

  let handleUserAcl = req => 
    req(id, apiKey)
      .then(respondJson)
      .catch(err => {
        if (err.statusCode === 401) respond401()
        else respond500()
      })

  let handleAssetsRequest = () => {
    if (path[4] === 'user-acl') 
      handleUserAcl(getAssetUserAcl)
    else 
      assetsCache.then(({assets, pruned, error}) => {
        if (error) respond500(error)
        else if (!id) respondJson(pruned)
        else if (!(id in assets)) respond404()
        else respondJson(assets[id])
      })
  }
  
  let handlePairsRequest = () => {
    if (path[4] === 'user-acl') 
      handleUserAcl(getPairUserAcl)
    else 
      pairsCache.then(({pairs, pruned, error}) => {
        if (error) respond500(error)
        else if (!id) respondJson({data: pruned})
        else if (!(id in pairs)) respond404()
        else respondJson(pairs[id])
      })
  }

  let handleExchangesRequest = () => {
    if (path[4] === 'user-acl') 
      handleUserAcl(getExchangeUserAcl)
    else 
      exchangesCache.then(({exchanges, pruned, error}) => {
        if (error) respond500(error)
        else if (!id) respondJson({data: pruned})
        else if (!(id in exchanges)) respond404()
        else respondJson(exchanges[id])
      })
  }

  let handleAssetMetricsRequest = () => {
    if (path[4] === 'user-acl') 
      handleUserAcl(getAssetMetricUserAcl)
    else 
      assetMetricsCache.then(({assetMetrics, pruned, error}) => {
        if (error) respond500(error)
        else if (!id) respondJson({data: pruned})
        else if (!(id in assetMetrics)) respond404()
        else respondJson(assetMetrics[id])
      })
  }

  let handlePairMetricsRequest = () => {
    if (path[4] === 'user-acl') 
      handleUserAcl(getPairMetricUserAcl)
    else 
      pairMetricsCache.then(({pairMetrics, pruned, error}) => {
        if (error) respond500(error)
        else if (!id) respondJson({data: pruned})
        else if (!(id in pairMetrics)) respond404()
        else respondJson(pairMetrics[id])
      })
  }

  let handleExchangeMetricsRequest = () => {
    if (path[4] === 'user-acl') 
      handleUserAcl(getExchangeMetricUserAcl)
    else 
      exchangeMetricsCache.then(({exchangeMetrics, pruned, error}) => {
        if (error) respond500(error)
        else if (!id) respondJson({data: pruned})
        else if (!(id in exchangeMetrics)) respond404()
        else respondJson(exchangeMetrics[id])
      })
  }

  let handleSearchRequest = () =>
    searchResultsCache.then(({errors}) => {
      if (errors.length) respond500(errors)
      else {
        let query = searchParams.get('query')
        getSearchResults(query)
          .then(respondJson)
          .catch(respond500)
      }
    })

  switch (path[2]) {
    case 'assets':
      handleAssetsRequest()
      break
    case 'pairs':
      handlePairsRequest()
      break
    case 'exchanges':
      handleExchangesRequest()
      break
    case 'asset-metrics':
      handleAssetMetricsRequest()
      break
    case 'pair-metrics':
      handlePairMetricsRequest()
      break
    case 'exchange-metrics':
      handleExchangeMetricsRequest()
      break
    case 'search':
      handleSearchRequest()
      break
    default:
      respond404()
  }
}
let handlePublicRequest = (log, req, res) => {
  let ext = req.url.split('.')[1]
  let data = publicCache[req.url]
  if (!data) {
    log('Requested resource in /public missing')
    res.writeHead(404)
    res.end()
  } else {
    res.writeHead(200, { 
      'Content-Type': CONTENT_TYPE[ext] ?? CONTENT_TYPE.html,
      'Content-Length': Buffer.byteLength(data)
    })
    res.end(data)
  }
}
let handlePageRequest = (log, req, res) => {
  let path = req.url.split('/')
  let id = path[2]

  let respondHtml = (html, status = 200) => {
    res.writeHead(status, { 
      'Content-Type': CONTENT_TYPE.html,
      'Content-Length': Buffer.byteLength(html)
    })
    res.end(html)
  }
  let respond404 = () => {
    log('Requested page missing')
    respondHtml(notFoundHtmlDocCache, 404)
  }
  let respond500 = err => {
    log('Error caught handling page request', err)
    respondHtml(errorHtmlDocCache, 500)
  }

  let handleAssetsRequest = () =>
    assetsCache.then(({assets, error}) => {
      if (error) respond500(error)
      else if (id) {
        if (!(id in assets)) respond404()
        else {
          let data
          if (id in singleAssetHtmlDocsCache) data = singleAssetHtmlDocsCache[id]
          else data = singleAssetHtmlDocsCache[id] = renderSingleAssetHtmlDoc(assets[id])
          respondHtml(data)
        }
      } else respondHtml(assetsHtmlDocCache)
    })

  let handlePairsRequest = () => 
    pairsCache.then(({pairs, error}) => {
      if (error) respond500(error)
      else if (id) {
        if (!(id in pairs)) respond404()
        else {
          let data
          if (id in singlePairHtmlDocsCache) data = singlePairHtmlDocsCache[id]
          else data = singlePairHtmlDocsCache[id] = renderSinglePairHtmlDoc(pairs[id])
          respondHtml(data)
        }
      } else respondHtml(pairsHtmlDocCache)
    })  

  let handleExchangesRequest = () => 
    exchangesCache.then(({exchanges, error}) => {
      if (error) respond500(error)
      else if (id) {
        if (!(id in exchanges)) respond404()
        else {
          let data
          if (id in singleExchangeHtmlDocsCache) data = singleExchangeHtmlDocsCache[id]
          else data = singleExchangeHtmlDocsCache[id] = renderSingleExchangeHtmlDoc(exchanges[id])
          respondHtml(data)
        }
      } else respondHtml(exchangesHtmlDocCache)
    })

  let handleAssetMetricsRequest = () => 
    assetMetricsCache.then(({assetMetrics, error}) => {
      if (error) respond500(error)
      else if (id) {
        if (!(id in assetMetrics)) respond404()
        else {
          let data
          if (id in singleAssetMetricHtmlDocsCache) data = singleAssetMetricHtmlDocsCache[id]
          else data = singleAssetMetricHtmlDocsCache[id] = renderSingleAssetMetricHtmlDoc(assetMetrics[id])
          respondHtml(data)
        }
      } else respondHtml(assetMetricsHtmlDocCache)
    })

  let handlePairMetricsRequest = () => 
    pairMetricsCache.then(({pairMetrics, error}) => {
      if (error) respond500(error)
      else if (id) {
        if (!(id in pairMetrics)) respond404()
        else {
          let data
          if (id in singlePairMetricHtmlDocsCache) data = singlePairMetricHtmlDocsCache[id]
          else data = singlePairMetricHtmlDocsCache[id] = renderSinglePairMetricHtmlDoc(pairMetrics[id])
          respondHtml(data)
        }
      } else respondHtml(pairMetricsHtmlDocCache)
    })

  let handleExchangeMetricsRequest = () => 
    exchangeMetricsCache.then(({exchangeMetrics, error}) => {
      if (error) respond500(error)
      else if (id) {
        if (!(id in exchangeMetrics)) respond404()
        else {
          let data
          if (id in singleExchangeMetricHtmlDocsCache) data = singleExchangeMetricHtmlDocsCache[id]
          else data = singleExchangeMetricHtmlDocsCache[id] = renderSingleExchangeMetricHtmlDoc(exchangeMetrics[id])
          respondHtml(data)
        }
      } else respondHtml(exchangeMetricsHtmlDocCache)
    })

  let handleSearchResultsRequest = () => 
    searchResultsCache.then(({errors}) => {
      if (errors.length) respond500(errors)
      else respondHtml(searchResultsHtmlDocCache)
    })

  switch (path[1].split('?')[0]) {
    case '':
      respondHtml(landingHtmlDocCache)
      break
    case 'assets':
      handleAssetsRequest()
      break
    case 'pairs': 
      handlePairsRequest()
      break
    case 'exchanges':
      handleExchangesRequest()
      break
    case 'asset-metrics':
      handleAssetMetricsRequest()
      break
    case 'pair-metrics':
      handlePairMetricsRequest()
      break
    case 'exchange-metrics':
      handleExchangeMetricsRequest()
      break
    case 'search-results':
      handleSearchResultsRequest()
      break
    case 'unexpected-error':
      respond500()
      break
    default:
      respond404()
  }
}
let respond = (req, res) => {
  let log = requestLogger(req)

  try {
    log('New request', 'INFO')
    switch (req.url.split('/')[1]) {
      case 'api':
        handleApiRequest(log, req, res)
        break
      case 'public':
        handlePublicRequest(log, req, res)
        break
      default:
        handlePageRequest(log, req, res)
    }
  } catch (err) {
    log(`Exception caught in respond ${err}`)
    res.writeHead(500)
    res.end()
  }
}
let main = () => {
  log(`Starting up ${BUILD_ID}`, 'INFO')
  cachePublic('./public')
  landingHtmlDocCache = renderLandingHtmlDoc()
  searchResultsHtmlDocCache = renderSearchResultsHtmlDoc()
  notFoundHtmlDocCache = renderNotFoundHtmlDoc()
  errorHtmlDocCache = renderErrorHtmlDoc()
  assetsHtmlDocCache = renderAssetsHtmlDoc()
  pairsHtmlDocCache = renderPairsHtmlDoc()
  exchangesHtmlDocCache = renderExchangesHtmlDoc()
  assetMetricsHtmlDocCache = renderAssetMetricsHtmlDoc()
  pairMetricsHtmlDocCache = renderPairMetricsHtmlDoc()
  exchangeMetricsHtmlDocCache = renderExchangeMetricsHtmlDoc()
  updateCache()
  let updateCacheInterval = setInterval(updateCache, CATALOG_UPDATE_INTERVAL)

  let server = http.createServer(respond)
  server.listen(PORT, HOST, () => {
    log(`Server is listening ${HOST}:${PORT}`, 'INFO')
  })

  let exit = () => {
    server.close(() => process.exit(0))
    clearInterval(updateCacheInterval)
    log('Server is closed', 'INFO')
  }

  process.on('SIGINT', exit)
  process.on('SIGTERM', exit)

  process.on('uncaughtException', (err, origin) => {
    log(`Process caught unhandled exception ${err} ${origin}`)
    exit()
  });
}

main()