{
  'use strict'

  let id = (new URLSearchParams(location.search)).get('id')
  let asset = {}
  let renderedMetrics = 0
  let renderedExchanges = 0
  let renderedMarkets = 0

  let $icon = document.getElementById('icon')
  let $id = document.getElementById('id')
  let $name = document.getElementById('name')
  let $tabs = document.querySelector('cm-tabs')
  let $$tabs = [
    document.getElementById('metrics'),
    document.getElementById('exchanges'),
    document.getElementById('markets')
  ]
  let $metrics = $$tabs[0].querySelector('tbody')
  let $exchanges = $$tabs[1].querySelector('tbody')
  let $markets = $$tabs[2].querySelector('tbody')

  let getAsset = () => 
    fetch(`http://localhost:8000/asset?id=${id}`)
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
          ${metric.acl.c?.length ? `<p class="Text-regular">${metric.acl.c.join(',')}</p>` : '<cm-color-icon name="x"></cm-icon>'}
        </td>
        <td>
          ${metric.acl.p?.length > 0 ? `<p class="Text-regular">${metric.acl.p.join(',')}</p>` : '<cm-color-icon name="x"></cm-icon>'}
        </td>
        <td>
          ${metric.acl.u?.length > 0 ? `<p class="Text-regular">${metric.acl.u.join(',')}</p>` : '<cm-color-icon name="x"></cm-icon>'}
        </td>
      </tr>
    `
  )
  let renderNext20Metrics = () => {
    let next20Metrics = asset.metrics.slice(renderedMetrics, renderedMetrics+20)
    let $next20Metrics = renderMetricRows(next20Metrics)
    $metrics.append($next20Metrics)
    renderedMetrics += 20
  }
  let renderRemainingMetrics = () => {
    let remainingMetrics = asset.metrics.slice(renderedMetrics)
    let $remainingMetrics = renderMetricRows(remainingMetrics)
    $metrics.append($remainingMetrics)
    renderedMetrics = asset.metrics.length
  }
  let renderExchangeRows = (exchanges) => $renderRows(
    exchanges, 
    exchange => `
      <tr>
        <td>
          <a href="/exchange?id=${exchange.id}" class="Link Text-regular">${exchange.id}</a>
        </td>
        <td>
          <cm-color-icon name="${exchange.acl.includes('c') ? 'check' : 'x'}"></cm-icon>
        </td>
        <td>
          <cm-color-icon name="${exchange.acl.includes('p') ? 'check' : 'x'}"></cm-icon>
        </td>
        <td>
          <cm-color-icon name="${exchange.acl.includes('u') ? 'check' : 'x'}"></cm-icon>
        </td>
      </tr>
    `
  )
  let renderNext20Exchanges = () => {
    let next20Exchanges = asset.exchanges.slice(renderedExchanges, renderedExchanges+20)
    let $next20Exchanges = renderExchangeRows(next20Exchanges)
    $exchanges.append($next20Exchanges)
    renderedExchanges += 20
  }
  let renderRemainingExchanges = () => {
    let remainingExchanges = asset.exchanges.slice(renderedExchanges)
    let $remainingExchanges = renderExchangeRows(remainingExchanges)
    $exchanges.append($remainingExchanges)
    renderedExchanges = asset.exchanges.length
  }
  let renderMarketRows = (markets) => $renderRows(
    markets, 
    market => `
      <tr>
        <td>
          <a href="#" class="Link Text-regular">${market.id}</a>
        </td>
        <td>
          <cm-color-icon name="${market.acl.includes('c') ? 'check' : 'x'}"></cm-icon>
        </td>
        <td>
          <cm-color-icon name="${market.acl.includes('p') ? 'check' : 'x'}"></cm-icon>
        </td>
        <td>
          <cm-color-icon name="${market.acl.includes('u') ? 'check' : 'x'}"></cm-icon>
        </td>
      </tr>
    `
  )
  let renderNext20Markets = () => {
    let next20Markets = asset.markets.slice(renderedMarkets, renderedMarkets+20)
    let $next20Markets = renderMarketRows(next20Markets)
    $markets.append($next20Markets)
    renderedMarkets += 20
  }
  let renderRemainingMarkets = () => {
    let remainingMarkets = asset.markets.slice(renderedMarkets)
    let $remainingMarkets = renderMarketRows(remainingMarkets)
    $markets.append($remainingMarkets)
    renderedMarkets = asset.markets.length
  }
  let renderAsset = () => {
    $icon.innerHTML = `<cm-coin class="Coin-xl" name="${id}" alt=""></cm-coin>`
    $id.textContent = id
    $name.textContent = asset.fullName
    renderNext20Metrics()
    renderNext20Exchanges()
    renderNext20Markets()
  }

  $tabs.onchange = e => $$tabs.forEach($ => $.hidden = $.id !== e.target.value)

  document.getElementById('LoadMore_metrics').onclick = renderNext20Metrics
  document.getElementById('LoadAll_metrics').onclick = renderRemainingMetrics
  document.getElementById('LoadMore_exchanges').onclick = renderNext20Exchanges
  document.getElementById('LoadAll_exchanges').onclick = renderRemainingExchanges
  document.getElementById('LoadMore_markets').onclick = renderNext20Markets
  document.getElementById('LoadAll_markets').onclick = renderRemainingMarkets

  getAsset().then(renderAsset)
}
