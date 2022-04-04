{
  'use strict'

  let CM = window.__CM = window.__CM || {}
  let key = CM.auth.key
  let id = (new URLSearchParams(location.search)).get('id')
  let asset = {}
  let renderedMetrics = 0
  let renderedExchanges = 0
  let renderedMarkets = 0

  let $icon = document.getElementById('icon')
  let $id = document.getElementById('id')
  let $name = document.getElementById('name')
  let $metrics = document.getElementById('metrics').querySelector('tbody')
  let $exchanges = document.getElementById('exchanges').querySelector('tbody')
  let $markets = document.getElementById('markets').querySelector('tbody')
  let $metricsKeyCol = document.getElementById('metrics-key-col')
  let $exchangesKeyCol = document.getElementById('exchanges-key-col')
  let $marketsKeyCol = document.getElementById('markets-key-col')
  let $metricsLoadMore = document.getElementById('metrics-load-more')
  let $metricsLoadAll = document.getElementById('metrics-load-all')
  let $exchangesLoadMore = document.getElementById('exchanges-load-more')
  let $exchangesLoadAll = document.getElementById('exchanges-load-all')
  let $marketsLoadMore = document.getElementById('markets-load-more')
  let $marketsLoadAll = document.getElementById('markets-load-all')

  let getAsset = () => 
    fetch(`http://localhost:8000/asset?id=${id}&api-key=${key}`)
      .then(res => res.json())
      .then(body => asset = body)

  let $renderRows = (arr, h) => {
    let html = ''
    arr.forEach(x => html += h(x))
    let $t = document.createElement('template')
    $t.innerHTML = html
    return $t.content
  }
  let renderMetricRows = (metrics) => $renderRows(
    metrics, 
    metric => `
      <tr>
        <td>
          <a href="/asset-metric?id=${metric.id}" class="Link Text-regular">${metric.id}</a>
        </td>
        <td>
          ${metric.acl.c?.length ? 
              `<p class="Text-regular">${metric.acl.c.join(',')}</p>` 
              : '<cm-color-icon name="x" alt="Unavailable"></cm-color-icon>'}
        </td>
        <td>
          ${metric.acl.p?.length > 0 ? 
              `<p class="Text-regular">${metric.acl.p.join(',')}</p>` 
              : '<cm-color-icon name="x" alt="Unavailable"></cm-color-icon>'}
        </td>
        <td>
          ${key ? 
            metric.acl.u?.length > 0 ? 
              `<p class="Text-regular">${metric.acl.u.join(',')}</p>` 
              : '<cm-color-icon name="x" alt="Unavailable"></cm-color-icon>'
            : '<cm-icon name="slash" alt="Visualization key is missing"></cm-icon>'}
        </td>
      </tr>
    `
  )
  let renderNext20Metrics = () => {
    let next20Metrics = asset.metrics.slice(renderedMetrics, renderedMetrics+20)
    let $next20Metrics = renderMetricRows(next20Metrics)
    $metrics.append($next20Metrics)
    renderedMetrics += 20
    if (renderedMetrics >= asset.metrics.length) {
      $metricsLoadMore.disabled = true
      $metricsLoadAll.disabled = true
    }
  }
  let renderRemainingMetrics = () => {
    let remainingMetrics = asset.metrics.slice(renderedMetrics)
    let $remainingMetrics = renderMetricRows(remainingMetrics)
    $metrics.append($remainingMetrics)
    renderedMetrics = asset.metrics.length
    $metricsLoadMore.disabled = true
    $metricsLoadAll.disabled = true
  }
  let reRenderMetrics = () => {
    let alreadyRenderedMetrics = asset.metrics.slice(0, renderedMetrics)
    let $alreadyRenderedMetrics = renderMetricRows(alreadyRenderedMetrics)
    $metrics.innerHTML = ''
    $metrics.append($alreadyRenderedMetrics)
  }
  let renderExchangeRows = (exchanges) => $renderRows(
    exchanges, 
    exchange => `
      <tr>
        <td>
          <a href="/exchange?id=${exchange.id}" class="Link Text-regular">${exchange.id}</a>
        </td>
        <td>
          <cm-color-icon ${exchange.acl.includes('c') ? 
            'name="check" alt="Available"'
            : 'name="x" alt="Unavailable"'}></cm-color-icon>
        </td>
        <td>
          <cm-color-icon ${exchange.acl.includes('p') ? 
            'name="check" alt="Available"'
            : 'name="x" alt="Unavailable"'}></cm-color-icon>
        </td>
        <td>
          ${key ? 
            `<cm-color-icon ${exchange.acl.includes('u') ? 
              'name="check" alt="Available"'
              : 'name="x" alt="Unavailable"'}></cm-color-icon>`
            : '<cm-icon name="slash" alt="Visualization key is missing"></cm-icon>'}
        </td>
      </tr>
    `
  )
  let renderNext20Exchanges = () => {
    let next20Exchanges = asset.exchanges.slice(renderedExchanges, renderedExchanges+20)
    let $next20Exchanges = renderExchangeRows(next20Exchanges)
    $exchanges.append($next20Exchanges)
    renderedExchanges += 20
    if (renderedExchanges >= asset.exchanges.length) {
      $exchangesLoadMore.disabled = true
      $exchangesLoadAll.disabled = true
    }
  }
  let renderRemainingExchanges = () => {
    let remainingExchanges = asset.exchanges.slice(renderedExchanges)
    let $remainingExchanges = renderExchangeRows(remainingExchanges)
    $exchanges.append($remainingExchanges)
    renderedExchanges = asset.exchanges.length
    $exchangesLoadMore.disabled = true
    $exchangesLoadAll.disabled = true
  }
  let reRenderExchanges = () => {
    let alreadyRenderedExchanges = asset.exchanges.slice(0, renderedExchanges)
    let $alreadyRenderedExchanges = renderExchangeRows(alreadyRenderedExchanges)
    $exchanges.innerHTML = ''
    $exchanges.append($alreadyRenderedExchanges)
  }
  let renderMarketRows = (markets) => $renderRows(
    markets, 
    market => `
      <tr>
        <td>
          <a href="#" class="Link Text-regular">${market.id}</a>
        </td>
        <td>
          <cm-color-icon ${market.acl.includes('c') ? 
            'name="check" alt="Available"'
            : 'name="x" alt="Unavailable"'}></cm-color-icon>
        </td>
        <td>
          <cm-color-icon ${market.acl.includes('p') ? 
            'name="check" alt="Available"'
            : 'name="x" alt="Unavailable"'}></cm-color-icon>
        </td>
        <td>
          ${key ? 
            `<cm-color-icon ${market.acl.includes('u') ? 
              'name="check" alt="Available"'
              : 'name="x" alt="Unavailable"'}></cm-color-icon>`
            : '<cm-icon name="slash" alt="Visualization key is missing"></cm-icon>'}
        </td>
      </tr>
    `
  )
  let renderNext20Markets = () => {
    let next20Markets = asset.markets.slice(renderedMarkets, renderedMarkets+20)
    let $next20Markets = renderMarketRows(next20Markets)
    $markets.append($next20Markets)
    renderedMarkets += 20
    if (renderedMarkets >= asset.markets.length) {
      $marketsLoadMore.disabled = true
      $marketsLoadAll.disabled = true
    }
  }
  let renderRemainingMarkets = () => {
    let remainingMarkets = asset.markets.slice(renderedMarkets)
    let $remainingMarkets = renderMarketRows(remainingMarkets)
    $markets.append($remainingMarkets)
    renderedMarkets = asset.markets.length
    $marketsLoadMore.disabled = true
    $marketsLoadAll.disabled = true
  }
  let reRenderMarkets = () => {
    let alreadyRenderedMarkets = asset.markets.slice(0, renderedMarkets)
    let $alreadyRenderedMarkets = renderMarketRows(alreadyRenderedMarkets)
    $markets.innerHTML = ''
    $markets.append($alreadyRenderedMarkets)
  }
  let renderKeyColumns = () => {
    $metricsKeyCol.textContent = key ? 'you key' : 'no key'
    $exchangesKeyCol.textContent = key ? 'you key' : 'no key'
    $marketsKeyCol.textContent = key ? 'you key' : 'no key'
    $metricsKeyCol.classList.toggle('Missing-key', !key)
    $exchangesKeyCol.classList.toggle('Missing-key', !key)
    $marketsKeyCol.classList.toggle('Missing-key', !key)
  }
  let reRenderTables = () => {
    renderKeyColumns()
    reRenderMetrics()
    reRenderExchanges()
    reRenderMarkets()
  }
  let renderAsset = () => {
    $icon.innerHTML = `<cm-coin class="Coin-xl" name="${id}" alt=""></cm-coin>`
    $id.textContent = id
    $name.textContent = asset.fullName
    renderKeyColumns()
    renderNext20Metrics()
    renderNext20Exchanges()
    renderNext20Markets()
  }

  $metricsLoadMore.onclick = renderNext20Metrics
  $metricsLoadAll.onclick = renderRemainingMetrics
  $exchangesLoadMore.onclick = renderNext20Exchanges
  $exchangesLoadAll.onclick = renderRemainingExchanges
  $marketsLoadMore.onclick = renderNext20Markets
  $marketsLoadAll.onclick = renderRemainingMarkets

  getAsset().then(renderAsset)

  CM.auth.onChange = k => {
    key = k
    getAsset().then(reRenderTables)
  }
}
