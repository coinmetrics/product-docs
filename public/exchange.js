{
  'use strict'

  let CM = window.__CM = window.__CM || {}
  let key = CM.auth.key
  let id = (new URLSearchParams(location.search)).get('id')
  let exchange = {}
  let renderedMetrics = 0
  let renderedMarkets = 0

  let $id = document.getElementById('id')
  let $tabs = document.querySelector('cm-tabs')
  let $$tabs = [
    document.getElementById('metrics'),
    document.getElementById('markets')
  ]
  let $metrics = $$tabs[0].querySelector('tbody')
  let $markets = $$tabs[1].querySelector('tbody')
  let $metricsKeyCol = document.getElementById('metrics-key-col')
  let $marketsKeyCol = document.getElementById('markets-key-col')
  let $metricsLoadMore = document.getElementById('metrics-load-more')
  let $metricsLoadAll = document.getElementById('metrics-load-all')
  let $marketsLoadMore = document.getElementById('markets-load-more')
  let $marketsLoadAll = document.getElementById('markets-load-all')

  let getExchange = () => 
    fetch(`http://localhost:8000/exchange?id=${id}&api-key=${key}`)
      .then(res => res.json())
      .then(body => exchange = body)

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
          <a href="/exchange-metric?id=${metric.id}" class="Link Text-regular">${metric.id}</a>
        </td>
        <td>
          <cm-color-icon ${metric.acl.includes('c') ? 
            'name="check" alt="Available"'
            : 'name="x" alt="Unavailable"'}></cm-color-icon>
        </td>
        <td>
          <cm-color-icon ${metric.acl.includes('p') ? 
            'name="check" alt="Available"'
            : 'name="x" alt="Unavailable"'}></cm-color-icon>
        </td>
        <td>
          ${key ? 
            `<cm-color-icon ${metric.acl.includes('u') ? 
              'name="check" alt="Available"'
              : 'name="x" alt="Unavailable"'}></cm-color-icon>` 
            : '<cm-icon name="slash" alt="Visualization key is missing"></cm-icon>'}
        </td>
      </tr>
    `
  )
  let renderNext20Metrics = () => {
    let next20Metrics = exchange.metrics.slice(renderedMetrics, renderedMetrics+20)
    let $next20Metrics = renderMetricRows(next20Metrics)
    $metrics.append($next20Metrics)
    renderedMetrics += 20
    if (renderedMetrics >= exchange.metrics.length) {
      $metricsLoadMore.disabled = true
      $metricsLoadAll.disabled = true
    }
  }
  let renderRemainingMetrics = () => {
    let remainingMetrics = exchange.metrics.slice(renderedMetrics)
    let $remainingMetrics = renderMetricRows(remainingMetrics)
    $metrics.append($remainingMetrics)
    renderedMetrics = exchange.metrics.length
    $metricsLoadMore.disabled = true
    $metricsLoadAll.disabled = true
  }
  let reRenderMetrics = () => {
    let alreadyRenderedMetrics = exchange.metrics.slice(0, renderedMetrics)
    let $alreadyRenderedMetrics = renderMetricRows(alreadyRenderedMetrics)
    $metrics.innerHTML = ''
    $metrics.append($alreadyRenderedMetrics)
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
    let next20Markets = exchange.markets.slice(renderedMarkets, renderedMarkets+20)
    let $next20Markets = renderMarketRows(next20Markets)
    $markets.append($next20Markets)
    renderedMarkets += 20
    if (renderedMarkets >= exchange.markets.length) {
      $marketsLoadMore.disabled = true
      $marketsLoadAll.disabled = true
    }
  }
  let renderRemainingMarkets = () => {
    let remainingMarkets = exchange.markets.slice(renderedMarkets)
    let $remainingMarkets = renderMarketRows(remainingMarkets)
    $markets.append($remainingMarkets)
    renderedMarkets = exchange.markets.length
    $marketsLoadMore.disabled = true
    $marketsLoadAll.disabled = true
  }
  let reRenderMarkets = () => {
    let alreadyRenderedMarkets = exchange.markets.slice(0, renderedMarkets)
    let $alreadyRenderedMarkets = renderMarketRows(alreadyRenderedMarkets)
    $markets.innerHTML = ''
    $markets.append($alreadyRenderedMarkets)
  }
  let renderKeyColumns = () => {
    $metricsKeyCol.textContent = key ? 'you key' : 'no key'
    $marketsKeyCol.textContent = key ? 'you key' : 'no key'
    $metricsKeyCol.classList.toggle('Missing-key', !key)
    $marketsKeyCol.classList.toggle('Missing-key', !key)
  }
  let reRenderTables = () => {
    renderKeyColumns()
    reRenderMetrics()
    reRenderMarkets()
  }
  let renderAsset = () => {
    $id.textContent = id
    renderKeyColumns()
    renderNext20Metrics()
    renderNext20Markets()
  }

  $tabs.onchange = e => $$tabs.forEach($ => $.hidden = $.id !== e.target.value)

  $metricsLoadMore.onclick = renderNext20Metrics
  $metricsLoadAll.onclick = renderRemainingMetrics
  $marketsLoadMore.onclick = renderNext20Markets
  $marketsLoadAll.onclick = renderRemainingMarkets

  getExchange().then(renderAsset)

  CM.auth.onChange = k => {
    key = k
    getExchange().then(reRenderTables)
  }
}
