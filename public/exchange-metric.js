{
  'use strict'

  let CM = window.__CM = window.__CM || {}
  let key = CM.auth.key
  let id = (new URLSearchParams(location.search)).get('id')
  let metric = {}
  let renderedExchanges = 0
  let renderedMarkets = 0
  
  let $id = document.getElementById('id')
  let $name = document.getElementById('name')
  let $description = document.getElementById('description')
  let $markets = document.getElementById('markets').querySelector('tbody')
  let $exchanges = document.getElementById('exchanges').querySelector('tbody')
  let $marketsKeyCol = document.getElementById('markets-key-col')
  let $exchangesKeyCol = document.getElementById('exchanges-key-col')
  let $marketsLoadMore = document.getElementById('markets-load-more')
  let $marketsLoadAll = document.getElementById('markets-load-all')
  let $exchangesLoadMore = document.getElementById('exchanges-load-more')
  let $exchangesLoadAll = document.getElementById('exchanges-load-all')

  let getExchangeMetric = () => 
    fetch(`http://localhost:8000/exchange-metric?id=${id}&api-key=${key}`)
      .then(res => res.json())
      .then(body => metric = body)

  let $renderRows = (arr, h) => {
    let html = ''
    arr.forEach(x => html += h(x))
    let $t = document.createElement('template')
    $t.innerHTML = html
    return $t.content
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
            'name="check">Available' : 'name="x">Unavailable'}
          </cm-color-icon>
        </td>
        <td>
          <cm-color-icon ${market.acl.includes('p') ? 
            'name="check">Available' : 'name="x">Unavailable'}
          </cm-color-icon>
        </td>
        <td>
          ${key ?
            `<cm-color-icon ${market.acl.includes('u') ? 
              'name="check">Available' : 'name="x">Unavailable'}>
             </cm-color-icon>`
            : '<cm-icon name="slash">Visualization key is missing</cm-icon>'}
        </td>
      </tr>
    `
  )
  let renderNext20Markets = () => {
    let next20Markets = metric.markets.slice(renderedMarkets, renderedMarkets+20)
    let $next20Markets = renderMarketRows(next20Markets)
    $markets.append($next20Markets)
    renderedMarkets += 20
    if (renderedMarkets > metric.markets.length) {
      $marketsLoadMore.disabled = true
      $marketsLoadAll.disabled = true
    }
  }
  let renderRemainingMarkets = () => {
    let remainingMarkets = metric.markets.slice(renderedMarkets)
    let $remainingMarkets = renderMarketRows(remainingMarkets)
    $markets.append($remainingMarkets)
    renderedMarkets = metric.markets.length
    $marketsLoadMore.disabled = true
    $marketsLoadAll.disabled = true
  }
  let reRenderMarkets = () => {
    let alreadyRenderedMarkets = metric.markets.slice(0, renderedMarkets)
    let $alreadyRenderedMarkets = renderMarketRows(alreadyRenderedMarkets)
    $markets.innerHTML = ''
    $markets.append($alreadyRenderedMarkets)
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
            'name="check">Available' : 'name="x">Unavailable'}
          </cm-color-icon>
        </td>
        <td>
          <cm-color-icon ${exchange.acl.includes('p') ? 
            'name="check">Available' : 'name="x">Unavailable'}
          </cm-color-icon>
        </td>
        <td>
        ${key ?
          `<cm-color-icon ${exchange.acl.includes('u') ? 
            'name="check">Available' : 'name="x">Unavailable'}
          </cm-color-icon>`
          : '<cm-icon name="slash">Visualization key is missing</cm-icon>'}
        </td>
      </tr>
    `
  )
  let renderNext20Exchanges = () => {
    let next20Exchanges = metric.exchanges.slice(renderedExchanges, renderedExchanges+20)
    let $next20Exchanges = renderExchangeRows(next20Exchanges)
    $exchanges.append($next20Exchanges)
    renderedExchanges += 20
    if (renderedExchanges >= metric.exchanges.length) {
      $exchangesLoadMore.disabled = true
      $exchangesLoadAll.disabled = true
    }
  }
  let renderRemainingExchanges = () => {
    let remainingExchanges = metric.exchanges.slice(renderedExchanges)
    let $remainingExchanges = renderExchangeRows(remainingExchanges)
    $exchanges.append($remainingExchanges)
    renderedExchanges = metric.exchanges.length
    $exchangesLoadMore.disabled = true
    $exchangesLoadAll.disabled = true
  }
  let reRenderExchanges = () => {
    let alreadyRenderedExchanges = metric.exchanges.slice(0, renderedExchanges)
    let $alreadyRenderedExchanges = renderExchangeRows(alreadyRenderedExchanges)
    $exchanges.innerHTML = ''
    $exchanges.append($alreadyRenderedExchanges)
  }
  let renderKeyColumns = () => {
    $marketsKeyCol.textContent = key ? 'your key' : 'no key'
    $exchangesKeyCol.textContent = key ? 'your key' : 'no key'
    $marketsKeyCol.classList.toggle('Missing-key', !key)
    $exchangesKeyCol.classList.toggle('Missing-key', !key)
  }
  let reRenderTables = () => {
    renderKeyColumns()
    reRenderMarkets()
    reRenderExchanges()
  }
  let renderExchangeMetric = () => {
    $id.textContent = id
    $name.textContent = metric.fullName
    $description.textContent = metric.description
    renderKeyColumns()
    renderNext20Exchanges()
    renderNext20Markets()
  }

  $marketsLoadMore.onclick = renderNext20Markets
  $marketsLoadAll.onclick = renderRemainingMarkets
  $exchangesLoadMore.onclick = renderNext20Exchanges
  $exchangesLoadAll.onclick = renderRemainingExchanges

  getExchangeMetric().then(renderExchangeMetric)

  CM.auth.onChange = k => {
    key = k
    getExchangeMetric().then(reRenderTables)
  }
}