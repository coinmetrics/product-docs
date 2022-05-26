{
  'use strict'

  let CM = window.__CM = window.__CM || {}

  let key = CM.auth.key,
    id = location.pathname.split('/')[2],
    canonicalMetrics,
    renderableMetrics,
    canonicalMarkets,
    renderableMarkets,
    userAcl,
    renderedMetrics = 0,
    renderedMarkets = 0,
    metricFilters = {},
    marketFilters = {}

  const METRIC_FILTERS = {
    frequency: 0,
    text: 1
  }, MARKET_FILTERS = {
    type: 0,
    text: 1
  }, DEFAULT_USER_ACL = {
    metrics: {},
    markets: {}
  }

  let $metrics = document.getElementById('metrics').querySelector('tbody'),
    $markets = document.getElementById('markets').querySelector('tbody'),
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
    $metricsKeyCol = document.getElementById('metrics-key-col'),
    $marketsKeyCol = document.getElementById('markets-key-col'),
    $metricsLoadMore = document.getElementById('metrics-load-more'),
    $metricsLoadCount = document.getElementById('metrics-load-count'),
    $metricsLoadTotal = document.getElementById('metrics-load-total'),
    $metricsLoadAll = document.getElementById('metrics-load-all'),
    $marketsLoadMore = document.getElementById('markets-load-more'),
    $marketsLoadCount = document.getElementById('markets-load-count'),
    $marketsLoadTotal = document.getElementById('markets-load-total'),
    $marketsLoadAll = document.getElementById('markets-load-all'),
    $metricsEmpty = document.getElementById('metrics-empty'),
    $marketsEmpty = document.getElementById('markets-empty')

  let getExchange = () => 
    fetch(`/api/exchanges/${id}`)
      .then(res => {
        if (res.status === 500) throw new Error(`Error from API`)
        else return res.json()
      })
      .then(body => {
        canonicalMetrics = renderableMetrics = Object.entries(body.metrics).map(([key, value]) => ({id: key, acl: value}))
        canonicalMarkets = renderableMarkets = Object.entries(body.markets).map(([key, value]) => ({id: key, acl: value}))
      })
  let getUserAcl = () => 
    fetch(`/api/exchanges/${id}/user-acl?api_key=${key}`)
      .then(res => {
        if (res.status === 401) return DEFAULT_USER_ACL
        else if (res.status !== 200) return {isFailed: true, ...DEFAULT_USER_ACL}
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
        else if (userAcl.markets && id in userAcl.markets)
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
          <a href="/exchange-metrics/${metric.id}" class="Link Text-regular">${metric.id}</a>
        </td>
        <td>
          ${metric.acl.c?.length ? 
            `<p class="Text-regular">${metric.acl.c.join(', ')}</p>` 
            : '<cm-color-icon name="x">Unavailable</cm-color-icon>'}
        </td>
        <td>
          ${metric.acl.p?.length ? 
            `<p class="Text-regular">${metric.acl.p.join(', ')}</p>` 
            : '<cm-color-icon name="x">Unavailable</cm-color-icon>'}
        </td>
        <td id="${metric.id}">
          <cm-icon name="refresh-cw" class="Icon-spin"></cm-icon>
        </td>
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
  let renderKeyColumns = () => {
    $metricsKeyCol.textContent = key ? 'you key' : 'no key'
    $marketsKeyCol.textContent = key ? 'you key' : 'no key'
    $metricsKeyCol.classList.toggle('Missing-key', !key)
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
      $metricsDownloadLink.download = `cm-exchange-${id}-metrics.csv`
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
  let onExchange = () => {
    renderKeyColumns()

    if ($metricsTextFilter.value) onFilterMetrics(METRIC_FILTERS.text, $metricsTextFilter.value)
    else renderNext20Metrics()

    if ($marketsTextFilter.value) onFilterMarkets(MARKET_FILTERS.text, $marketsTextFilter.value)
    else renderNext20Markets()
    
    $metricsFrequencyFilter.onchange = e => onFilterMetrics(METRIC_FILTERS.frequency, e.target.value)
    $metricsTextFilter.oninput = e => onFilterMetrics(METRIC_FILTERS.text, e.target.value)
    $metricsDownload.onclick = onDownloadMetrics
    $marketsTypeFilter.onchange = e => onFilterMarkets(MARKET_FILTERS.type, e.target.value)
    $marketsTextFilter.oninput = e => onFilterMarkets(MARKET_FILTERS.text, e.target.value)    
    $marketsDownload.onclick = onDownloadMarkets
    $metricsLoadMore.onclick = renderNext20Metrics
    $metricsLoadAll.onclick = renderRemainingMetrics
    $marketsLoadMore.onclick = renderNext20Markets
    $marketsLoadAll.onclick = renderRemainingMarkets
  }

  CM.auth.onChange = k => {
    key = k
    userAcl = key ? getUserAcl() : Promise.resolve(DEFAULT_USER_ACL)
    renderKeyColumns()
    let ids = [
      ...Array.from($metrics.querySelectorAll(':scope > tr > td:nth-child(4)')).map(x => x.id),
      ...Array.from($markets.querySelectorAll(':scope > tr > td:nth-child(4)')).map(x => x.id)
    ]
    renderUserAclCells(ids)
  }

  userAcl = key ? getUserAcl() : Promise.resolve(DEFAULT_USER_ACL)

  getExchange().then(onExchange).catch(CM.htmlSnippets.renderUnexpectedError)
}
