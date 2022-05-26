{
  'use strict'

  let CM = window.__CM = window.__CM || {}

  let key = CM.auth.key,
    id = location.pathname.split('/')[2],
    canonicalMetrics,
    renderableMetrics,
    canonicalMarkets,
    renderableMarkets,
    canonicalExchanges,
    renderableExchanges,
    userAcl,
    renderedMetrics = 0,
    renderedExchanges = 0,
    renderedMarkets = 0,
    metricFilters = {},
    marketFilters = {}

  const METRIC_FILTERS = {
    frequency: 0,
    text: 1
  }, MARKET_FILTERS = {
      type: 0,
      text: 1
    }

  let $metrics = document.getElementById('metrics').querySelector('tbody'),
    $markets = document.getElementById('markets').querySelector('tbody'),
    $exchanges = document.getElementById('exchanges').querySelector('tbody'),
    $metricsFrequencyFilter = document.getElementById('frequency-filter'),
    $metricsTextFilter = document.getElementById('metrics-text-filter'),
    $metricsDownload = document.getElementById('metrics-download'),
    $metricsDownloadIcon = $metricsDownload.querySelector('cm-icon'),
    $metricsDownloadLink = document.getElementById('metrics-download-link'),
    $marketsTextFilter = document.getElementById('markets-text-filter'),
    $marketsTypeFilter = document.getElementById('markets-type-filter'),
    $marketsDownload = document.getElementById('markets-download'),
    $marketsDownloadIcon = $marketsDownload.querySelector('cm-icon'),
    $marketsDownloadLink = document.getElementById('markets-download-link'),
    $exchangesFilter = document.getElementById('exchanges-text-filter'),
    $exchangesDownload = document.getElementById('exchanges-download'),
    $exchangesDownloadIcon = $exchangesDownload.querySelector('cm-icon'),
    $exchangesDownloadLink = document.getElementById('exchanges-download-link'),
    $metricsKeyCol = document.getElementById('metrics-key-col'),
    $marketsKeyCol = document.getElementById('markets-key-col'),
    $exchangesKeyCol = document.getElementById('exchanges-key-col'),
    $metricsLoadMore = document.getElementById('metrics-load-more'),
    $metricsLoadCount = document.getElementById('metrics-load-count'),
    $metricsLoadTotal = document.getElementById('metrics-load-total'),
    $metricsLoadAll = document.getElementById('metrics-load-all'),
    $marketsLoadMore = document.getElementById('markets-load-more'),
    $marketsLoadCount = document.getElementById('markets-load-count'),
    $marketsLoadTotal = document.getElementById('markets-load-total'),
    $marketsLoadAll = document.getElementById('markets-load-all'),
    $exchangesLoadMore = document.getElementById('exchanges-load-more'),
    $exchangesLoadCount = document.getElementById('exchanges-load-count'),
    $exchangesLoadTotal = document.getElementById('exchanges-load-total'),
    $exchangesLoadAll = document.getElementById('exchanges-load-all'),
    $metricsEmpty = document.getElementById('metrics-empty'),
    $marketsEmpty = document.getElementById('markets-empty'),
    $exchangesEmpty = document.getElementById('exchanges-empty')

  let getAsset = () => 
    fetch(`/api/assets/${id}`)
      .then(res => {
        if (res.status === 500) throw new Error(`Error from API`)
        else return res.json()
      })
      .then(body => {
        canonicalMetrics = renderableMetrics = Object.entries(body.metrics).map(([key, value]) => ({id: key, acl: value}))
        canonicalMarkets = renderableMarkets = Object.entries(body.markets).map(([key, value]) => ({id: key, acl: value}))
        canonicalExchanges = renderableExchanges = Object.entries(body.exchanges).map(([key, value]) => ({id: key, acl: value}))
      })
  let getUserAcl = () => 
    fetch(`/api/assets/${id}/user-acl?api_key=${key}`)
      .then(res => {
        if (res.status !== 200 && res.status !== 401) return {isFailed: true}
        else return res.json()
      })

  let $renderRows = (arr, h) => {
    let html = ''
    arr.forEach(x => html += h(x))
    let $t = document.createElement('template')
    $t.innerHTML = html
    return $t.content
  }
  let renderUserAclCells = ids =>
    ids.forEach(id => {
      let $el = document.getElementById(id)
      $el.innerHTML = '<cm-icon name="refresh-cw" class="Icon-spin"></cm-icon>'

      userAcl.then(userAcl => {
        if (!key) 
          $el.innerHTML = /*html*/`<cm-icon name="slash">Visualization key is missing</cm-icon>`
        else if (userAcl.isFailed) 
          $el.innerHTML = /*html*/`<cm-icon name="alert-triangle">Unexpected error</cm-icon>`
        else if (userAcl.metrics && id in userAcl.metrics) 
          $el.innerHTML = /*html*/`<p class="Text-regular">${userAcl.metrics[id].join(', ')}</p>`
        else if (userAcl.markets && id in userAcl.markets || userAcl.exchanges && id in userAcl.exchanges)
          $el.innerHTML = /*html*/`<cm-color-icon name="check">Available</cm-color-icon>`
        else 
          $el.innerHTML = /*html*/`<cm-color-icon name="x">Unavailable</cm-color-icon>`
      })
    })
  let renderMetricRows = metrics => $renderRows(
    metrics, 
    metric => /*html*/`
      <tr>
        <td>
          <a href="/asset-metrics/${metric.id}" class="Link Text-regular">${metric.id}</a>
        </td>
        <td>
          ${metric.acl.c?.length ? 
            `<p class="Text-regular">${metric.acl.c.join(', ')}</p>` 
            : '<cm-color-icon name="x">Unavailable</cm-color-icon>'}
        </td>
        <td>
          ${metric.acl.p?.length > 0 ? 
            `<p class="Text-regular">${metric.acl.p.join(', ')}</p>` 
            : '<cm-color-icon name="x">Unavailable</cm-color-icon>'}
        </td>
        <td id="${metric.id}"></td>
      </tr>
    `
  )
  let renderNext20Metrics = () => {
    $metricsEmpty.hidden = renderableMetrics.length > 0
    let next20Metrics = renderableMetrics.slice(renderedMetrics, renderedMetrics+CM.constants.PAGE_SIZE)
    let $next20Metrics = renderMetricRows(next20Metrics)
    $metrics.append($next20Metrics)
    renderUserAclCells(next20Metrics.map(x => x.id))
    renderedMetrics += CM.constants.PAGE_SIZE
    $metricsLoadCount.textContent = CM.string.formatNumber(renderedMetrics)
    $metricsLoadTotal.textContent = CM.string.formatNumber(renderableMetrics.length)
    $metricsLoadMore.parentNode.hidden = renderedMetrics >= renderableMetrics.length
  }
  let renderRemainingMetrics = () => {
    let remainingMetrics = renderableMetrics.slice(renderedMetrics)
    let $remainingMetrics = renderMetricRows(remainingMetrics)
    $metrics.append($remainingMetrics)
    renderUserAclCells(remainingMetrics.map(x => x.id))
    renderedMetrics = renderableMetrics.length
    $metricsLoadMore.parentNode.hidden = true
  }
  let renderMarketRows = markets => $renderRows(
    markets, 
    market => /*html*/`
      <tr>
        <td>
          <p class="Text-regular">${market.id}</p>
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
        <td id="${market.id}"></td>
      </tr>
    `
  )
  let renderNext20Markets = () => {
    $marketsEmpty.hidden = renderableMarkets.length > 0
    let next20Markets = renderableMarkets.slice(renderedMarkets, renderedMarkets+CM.constants.PAGE_SIZE)
    let $next20Markets = renderMarketRows(next20Markets)
    $markets.append($next20Markets)
    renderUserAclCells(next20Markets.map(x => x.id))
    renderedMarkets += CM.constants.PAGE_SIZE
    $marketsLoadCount.textContent = CM.string.formatNumber(renderedMarkets)
    $marketsLoadTotal.textContent = CM.string.formatNumber(renderableMarkets.length)
    $marketsLoadMore.parentNode.hidden = renderedMarkets >= renderableMarkets.length
  }
  let renderRemainingMarkets = () => {
    let remainingMarkets = renderableMarkets.slice(renderedMarkets)
    let $remainingMarkets = renderMarketRows(remainingMarkets)
    $markets.append($remainingMarkets)
    renderUserAclCells(remainingMarkets.map(x => x.id))
    renderedMarkets = renderableMarkets.length
    $marketsLoadMore.parentNode.hidden = true
  }
  let renderExchangeRows = exchanges => $renderRows(
    exchanges, 
    exchange => /*html*/`
      <tr>
        <td>
          <a href="/exchanges/${exchange.id}" class="Link Text-regular">${exchange.id}</a>
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
        <td id="${exchange.id}"></td>
      </tr>
    `
  )
  let renderNext20Exchanges = () => {
    $exchangesEmpty.hidden = renderableExchanges.length > 0
    let next20Exchanges = renderableExchanges.slice(renderedExchanges, renderedExchanges+CM.constants.PAGE_SIZE)
    let $next20Exchanges = renderExchangeRows(next20Exchanges)
    $exchanges.append($next20Exchanges)
    renderUserAclCells(next20Exchanges.map(x => x.id))
    renderedExchanges += CM.constants.PAGE_SIZE
    $exchangesLoadCount.textContent = CM.string.formatNumber(renderedExchanges)
    $exchangesLoadTotal.textContent = CM.string.formatNumber(renderableExchanges.length)
    $exchangesLoadMore.parentNode.hidden = renderedExchanges >= renderableExchanges.length
  }
  let renderRemainingExchanges = () => {
    let remainingExchanges = renderableExchanges.slice(renderedExchanges)
    let $remainingExchanges = renderExchangeRows(remainingExchanges)
    $exchanges.append($remainingExchanges)
    renderUserAclCells(remainingExchanges.map(x => x.id))
    renderedExchanges = renderableExchanges.length
    $exchangesLoadMore.parentNode.hidden = true
  }
  let renderKeyColumns = () => {
    $metricsKeyCol.textContent = key ? 'your key' : 'no key'
    $exchangesKeyCol.textContent = key ? 'your key' : 'no key'
    $marketsKeyCol.textContent = key ? 'your key' : 'no key'
    $metricsKeyCol.classList.toggle('Missing-key', !key)
    $exchangesKeyCol.classList.toggle('Missing-key', !key)
    $marketsKeyCol.classList.toggle('Missing-key', !key)
  }

  let onFilterMetrics = (type, value) => {
    if (type === METRIC_FILTERS.frequency && value === 'all') value = undefined
    metricFilters[type] = value

    let frequencyFilter = x => 
      x.acl.c?.includes(metricFilters[METRIC_FILTERS.frequency]) || 
      x.acl.p?.includes(metricFilters[METRIC_FILTERS.frequency])
    let textFilter = x => 
      x.id.toLowerCase().includes(metricFilters[METRIC_FILTERS.text].toLowerCase())

    if (metricFilters[METRIC_FILTERS.frequency] && metricFilters[METRIC_FILTERS.text]) 
      renderableMetrics = canonicalMetrics.filter(x => frequencyFilter(x) && textFilter(x))
    else if (metricFilters[METRIC_FILTERS.frequency])
      renderableMetrics = canonicalMetrics.filter(frequencyFilter)
    else if (metricFilters[METRIC_FILTERS.text])
      renderableMetrics = canonicalMetrics.filter(textFilter)
    else 
      renderableMetrics = canonicalMetrics

    $metrics.innerHTML = ''
    renderedMetrics = 0
    renderNext20Metrics()
  }
  let onFilterMarkets = (type, value) => {
    if (type === MARKET_FILTERS.type && value === 'all') value = undefined
    marketFilters[type] = value 

    let typeFilter = x =>
      x.id.toLowerCase().includes(marketFilters[MARKET_FILTERS.type])
    let textFilter = x => 
      x.id.toLowerCase().includes(marketFilters[MARKET_FILTERS.text].toLowerCase())

    if (marketFilters[MARKET_FILTERS.type] && marketFilters[MARKET_FILTERS.text]) 
      renderableMarkets = canonicalMarkets.filter(x => typeFilter(x) && textFilter(x))
    else if (marketFilters[MARKET_FILTERS.type])
      renderableMarkets = canonicalMarkets.filter(typeFilter)
    else if (marketFilters[MARKET_FILTERS.text])
      renderableMarkets = canonicalMarkets.filter(textFilter)
    else 
      renderableMarkets = canonicalMarkets

    $markets.innerHTML = ''
    renderedMarkets = 0
    renderNext20Markets()
  }
  let onFilterExchanges = value => {
    if (value)
      renderableExchanges = canonicalExchanges.filter(x => x.id.toLowerCase().includes(value.toLowerCase()))
    else 
      renderableExchanges = canonicalExchanges

    $exchanges.innerHTML = ''
    renderedExchanges = 0
    renderNext20Exchanges()
  }
  let onDownloadMetrics = () => {
    $metricsDownloadIcon.name = 'refresh-cw'
    $metricsDownloadIcon.classList.add('Icon-spin')

    userAcl.then(userAcl => {
      let rows = [
        ['ID', 'COMMUNITY', 'PROFESSIONAL', 'YOUR_KEY'],
        ...renderableMetrics.map(x => 
          ([x.id, x.acl.c?.join('|'), x.acl.p?.join('|'), userAcl.metrics[x.id]?.join("|") ?? ''])),
      ]
      let csvContent =
        'data:text/csv;charset=utf-8,' + rows.map((e) => e.join(',')).join('\n')
      let encodedUri = encodeURI(csvContent)
      
      $metricsDownloadLink.href = encodedUri
      $metricsDownloadLink.download = `cm-asset-${id}-metrics.csv`
      $metricsDownloadLink.click()

      $metricsDownloadIcon.classList.remove('Icon-spin')
      $metricsDownloadIcon.name = 'download'
    })
  }
  let onDownloadMarkets = () => {
    $marketsDownloadIcon.name = 'refresh-cw'
    $marketsDownloadIcon.classList.add('Icon-spin')

    userAcl.then(userAcl => {
      let rows = [
        ['ID', 'COMMUNITY', 'PROFESSIONAL', 'YOUR_KEY'],
        ...renderableMarkets.map(x => 
          ([x.id, x.acl.includes('c'), x.acl.includes('p'), userAcl.markets[x.id]?.includes('u') ?? ''])),
      ]
      let csvContent =
        'data:text/csv;charset=utf-8,' + rows.map((e) => e.join(',')).join('\n')
      let encodedUri = encodeURI(csvContent)
      
      $marketsDownloadLink.href = encodedUri
      $marketsDownloadLink.download = `cm-asset-${id}-markets.csv`
      $marketsDownloadLink.click()

      $marketsDownloadIcon.classList.remove('Icon-spin')
      $marketsDownloadIcon.name = 'download'
    })
  }
  let onDownloadExchanges = () => {
    $exchangesDownloadIcon.name = 'refresh-cw'
    $exchangesDownloadIcon.classList.add('Icon-spin')

    userAcl.then(userAcl => {
      let rows = [
        ['ID', 'COMMUNITY', 'PROFESSIONAL', 'YOUR_KEY'],
        ...renderableExchanges.map(x => 
          ([x.id, x.acl.includes('c'), x.acl.includes('p'), userAcl.exchanges[x.id]?.includes('u') ?? ''])),
      ]
      let csvContent =
        'data:text/csv;charset=utf-8,' + rows.map((e) => e.join(',')).join('\n')
      let encodedUri = encodeURI(csvContent)
      
      $exchangesDownloadLink.href = encodedUri
      $exchangesDownloadLink.download = `cm-asset-${id}-exchanges.csv`
      $exchangesDownloadLink.click()

      $exchangesDownloadIcon.classList.remove('Icon-spin')
      $exchangesDownloadIcon.name = 'download'
    })
  }
  let onAsset = () => {
    renderKeyColumns()

    if ($metricsTextFilter.value) onFilterMetrics(METRIC_FILTERS.text, $metricsTextFilter.value)
    else renderNext20Metrics()

    if ($marketsTextFilter.value) onFilterMarkets(MARKET_FILTERS.text, $marketsTextFilter.value)
    else renderNext20Markets()

    if ($exchangesFilter.value) onFilterExchanges($exchangesFilter.value)
    else renderNext20Exchanges()
    
    $metricsFrequencyFilter.onchange = e => onFilterMetrics(METRIC_FILTERS.frequency, e.target.value)
    $metricsTextFilter.oninput = e => onFilterMetrics(METRIC_FILTERS.text, e.target.value)
    $metricsDownload.onclick = onDownloadMetrics
    $marketsTypeFilter.onchange = e => onFilterMarkets(MARKET_FILTERS.type, e.target.value)
    $marketsTextFilter.oninput = e => onFilterMarkets(MARKET_FILTERS.text, e.target.value)
    $marketsDownload.onclick = onDownloadMarkets
    $exchangesFilter.oninput = e => onFilterExchanges(e.target.value)
    $exchangesDownload.onclick = onDownloadExchanges
    $metricsLoadMore.onclick = renderNext20Metrics
    $metricsLoadAll.onclick = renderRemainingMetrics
    $marketsLoadMore.onclick = renderNext20Markets
    $marketsLoadAll.onclick = renderRemainingMarkets
    $exchangesLoadMore.onclick = renderNext20Exchanges
    $exchangesLoadAll.onclick = renderRemainingExchanges
  }

  CM.auth.onChange = k => {
    key = k
    userAcl = key ? getUserAcl() : Promise.resolve()
    renderKeyColumns()
    let ids = [
      ...Array.from($metrics.querySelectorAll(':scope > tr > td:nth-child(4)')).map(x => x.id),
      ...Array.from($markets.querySelectorAll(':scope > tr > td:nth-child(4)')).map(x => x.id),
      ...Array.from($exchanges.querySelectorAll(':scope > tr > td:nth-child(4)')).map(x => x.id)
    ]
    renderUserAclCells(ids)
  }

  userAcl = key ? getUserAcl() : Promise.resolve()

  getAsset().then(onAsset).catch(CM.htmlSnippets.renderUnexpectedError)
}