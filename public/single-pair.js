{
  'use strict'

  let CM = window.__CM = window.__CM || {}

  let key = CM.auth.key,
    id = location.pathname.split('/')[2],
    canonicalMetrics,
    renderableMetrics,
    userAcl,
    renderedMetrics = 0,
    metricFilters = {}

  const METRIC_FILTERS = {
    frequency: 0,
    text: 1
  }

  let $tbody = document.querySelector('tbody'),
    $frequencyFilter = document.getElementById('frequency-filter'),
    $textFilter = document.getElementById('text-filter'),
    $keyCol = document.getElementById('key-col'),
    $loadMore = document.getElementById('load-more'),
    $loadCount = document.getElementById('load-count'),
    $loadTotal = document.getElementById('load-total'),
    $loadAll = document.getElementById('load-all'),
    $empty = document.getElementById('empty')

  let getPair = () => 
    fetch(`/api/pairs/${id}`)
      .then(res => {
        if (res.status === 500) throw new Error(`Error from API`)
        else return res.json()
      })
      .then(body =>
        canonicalMetrics = renderableMetrics = Object.entries(body.metrics).map(([key, value]) => ({id: key, acl: value})))
  let getUserAcl = () => 
    fetch(`/api/pairs/${id}/user-acl?api_key=${key}`)
      .then(res => res.json())

  let $renderRows = (arr) => {
    let html = ''
    arr.forEach(metric => 
      html += /*html*/`
        <tr>
          <td>
            <a href="/pair-metrics/${metric.id}" class="Link Text-regular">${metric.id}</a>
          </td>
          <td>
            ${metric.acl.c?.length ? 
              `<p class="Text-regular">${metric.acl.c.join(',')}</p>` 
              : '<cm-color-icon name="x">Unavailable</cm-color-icon>'}
          </td>
          <td>
            ${metric.acl.p?.length ? 
              `<p class="Text-regular">${metric.acl.p.join(',')}</p>` 
              : '<cm-color-icon name="x">Unavailable</cm-color-icon>'}
          </td>
          <td id="${metric.id}"></td>
        </tr>`)
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
        else if (userAcl.metrics && id in userAcl.metrics) 
          $el.innerHTML = /*html*/`<p class="Text-regular">${userAcl.metrics[id].join(',')}</p>`
        else 
          $el.innerHTML = /*html*/`<cm-color-icon name="x">Unavailable</cm-color-icon>`
      })
    })
  let renderNext20Metrics = () => {
    $empty.hidden = renderableMetrics.length > 0
    let next20Metrics = renderableMetrics.slice(renderedMetrics, renderedMetrics+CM.constants.PAGE_SIZE)
    let $next20Metrics = $renderRows(next20Metrics)
    $tbody.append($next20Metrics)
    renderUserAclCells(next20Metrics.map(x => x.id))
    renderedMetrics += CM.constants.PAGE_SIZE
    $loadCount.textContent = CM.string.formatNumber(renderedMetrics)
    $loadTotal.textContent = CM.string.formatNumber(renderableMetrics.length)
    $loadMore.parentNode.hidden = renderedMetrics >= renderableMetrics.length
  }
  let renderRemainingMetrics = () => {
    let remainingMetrics = renderableMetrics.slice(renderedMetrics)
    let $remainingMetrics = $renderRows(remainingMetrics)
    $tbody.append($remainingMetrics)
    renderUserAclCells(remainingMetrics.map(x => x.id))
    renderedMetrics = renderableMetrics.length
    $loadMore.parentNode.hidden = true
  }
  let renderKeyColumn = () => {
    $keyCol.textContent = key ? 'your key' : 'no key'
    $keyCol.classList.toggle('Missing-key', !key)
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

    $tbody.innerHTML = ''
    renderedMetrics = 0
    renderNext20Metrics()
  }
  let onPair = () => {
    renderKeyColumn()

    if ($textFilter.value) onFilterMetrics(METRIC_FILTERS.text, $textFilter.value)
    else renderNext20Metrics()
    
    $frequencyFilter.onchange = e => onFilterMetrics(METRIC_FILTERS.frequency, e.target.value)
    $textFilter.oninput = e => onFilterMetrics(METRIC_FILTERS.text, e.target.value)
    $loadMore.onclick = renderNext20Metrics
    $loadAll.onclick = renderRemainingMetrics
  }

  CM.auth.onChange = k => {
    key = k
    userAcl = getUserAcl()
    renderKeyColumn()
    let ids = Array.from($tbody.querySelectorAll(':scope > tr > td:nth-child(4)')).map(x => x.id)
    renderUserAclCells(ids)
  }

  userAcl = key ? getUserAcl() : Promise.resolve()

  getPair().then(onPair).catch(CM.htmlSnippets.renderUnexpectedError)
}