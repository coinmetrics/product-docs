{
  'use strict'

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

  let getExchange = () => 
    fetch(`http://localhost:8000/exchange?id=${id}`)
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
          <cm-color-icon ${metric.acl.includes('u') ? 
            'name="check" alt="Available"'
            : 'name="x" alt="Unavailable"'}></cm-color-icon>
        </td>
      </tr>
    `
  )
  let renderNext20Metrics = () => {
    let next20Metrics = exchange.metrics.slice(renderedMetrics, renderedMetrics+20)
    let $next20Metrics = renderMetricRows(next20Metrics)
    $metrics.append($next20Metrics)
    renderedMetrics += 20
  }
  let renderRemainingMetrics = () => {
    let remainingMetrics = exchange.metrics.slice(renderedMetrics)
    let $remainingMetrics = renderMetricRows(remainingMetrics)
    $metrics.append($remainingMetrics)
    renderedMetrics = exchange.metrics.length
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
          <cm-color-icon ${market.acl.includes('u') ? 
            'name="check" alt="Available"'
            : 'name="x" alt="Unavailable"'}></cm-color-icon>
        </td>
      </tr>
    `
  )
  let renderNext20Markets = () => {
    let next20Markets = exchange.markets.slice(renderedMarkets, renderedMarkets+20)
    let $next20Markets = renderMarketRows(next20Markets)
    $markets.append($next20Markets)
    renderedMarkets += 20
  }
  let renderRemainingMarkets = () => {
    let remainingMarkets = exchange.markets.slice(renderedMarkets)
    let $remainingMarkets = renderMarketRows(remainingMarkets)
    $markets.append($remainingMarkets)
    renderedMarkets = exchange.markets.length
  }
  let renderAsset = () => {
    $id.textContent = id
    renderNext20Metrics()
    renderNext20Markets()
  }

  $tabs.onchange = e => $$tabs.forEach($ => $.hidden = $.id !== e.target.value)

  document.getElementById('LoadMore_metrics').onclick = renderNext20Metrics
  document.getElementById('LoadAll_metrics').onclick = renderRemainingMetrics
  document.getElementById('LoadMore_markets').onclick = renderNext20Markets
  document.getElementById('LoadAll_markets').onclick = renderRemainingMarkets

  getExchange().then(renderAsset)
}
