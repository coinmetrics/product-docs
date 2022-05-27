{
  'use strict'

  let CM = window.__CM = window.__CM || {}

  let canonicalMetrics,
    renderableMetrics,
    renderedMetrics = 0,
    metricFilters = {}

  const METRIC_FILTERS = {
    frequency: 0,
    text: 1
  }
  
  let $tbody = document.querySelector('tbody'),
    $frequencyFilter = document.getElementById('frequency-filter'),
    $textFilter = document.getElementById('text-filter'),
    $download = document.getElementById('download'),
    $downloadLink = document.getElementById('download-link'),
    $loadMore = document.getElementById('load-more'),
    $loadCount = document.getElementById('load-count'),
    $loadTotal = document.getElementById('load-total'),
    $loadAll = document.getElementById('load-all'),
    $empty = document.getElementById('empty')

  let getPairMetrics = () => 
    fetch('/api/pair-metrics')
      .then(res => {
        if (res.status === 500) throw new Error(`Error from API`)
        else return res.json()
      })
      .then(body => canonicalMetrics = renderableMetrics = body.data)

  let $renderRows = (arr) => {
    let html = ''
    arr.forEach(metric => 
      html += /*html*/`
        <tr>
          <td>
            <a href="/pair-metrics/${metric.id}" class="Link Text-regular">${metric.id}</a>
          </td>
          <td>
            <p class="Text-regular">${metric.name}</p>
          </td>
          <td>
            <p class="Text-regular">${metric.category}</p>
          </td>
          <td>
            <p class="Text-regular">${metric.subcategory}</p>
          </td>
          <td>
            <p class="Text-regular">${metric.frequencies.join(', ')}</p>
          </td>
        </tr>`)
    let $t = document.createElement('template')
    $t.innerHTML = html
    return $t.content
  }
  let renderNext20 = () => {
    $empty.hidden = renderableMetrics.length > 0
    let next20 = renderableMetrics.slice(renderedMetrics, renderedMetrics+CM.constants.PAGE_SIZE)
    let $next20 = $renderRows(next20)
    $tbody.append($next20)
    renderedMetrics += CM.constants.PAGE_SIZE
    $loadMore.parentNode.hidden = renderedMetrics >= renderableMetrics.length
  }
  let renderRemaining = () => {
    let remaining = renderableMetrics.slice(renderedMetrics)
    let $remaining = $renderRows(remaining)
    $tbody.append($remaining)
    renderedMetrics = renderableMetrics.length
    $loadCount.textContent = CM.string.formatNumber(renderedMetrics)
    $loadTotal.textContent = CM.string.formatNumber(renderableMetrics.length)
    $loadMore.parentNode.hidden = true
  }

  let onFilter = (type, value) => {
    if (type === METRIC_FILTERS.frequency && value === 'all') value = undefined
    metricFilters[type] = value

    let frequencyFilter = x => 
      x.frequencies.includes(metricFilters[METRIC_FILTERS.frequency])
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
    renderNext20()
  }
  let onDownload = () => {
    $downloadLink.href = CM.CSV.buildMetricsCsv(renderableMetrics)
    $downloadLink.download = `cm-pair-metrics.csv`
    $downloadLink.click()
  }
  let onPairMetrics = () => {
    if ($textFilter.value) onFilter(METRIC_FILTERS.text, $textFilter.value)
    else renderNext20()

    $frequencyFilter.onchange = e => onFilter(METRIC_FILTERS.frequency, e.target.value)
    $textFilter.oninput = e => onFilter(METRIC_FILTERS.text, e.target.value)
    $download.onclick = onDownload
    $loadMore.onclick = renderNext20
    $loadAll.onclick = renderRemaining
  }

  getPairMetrics().then(onPairMetrics).catch(CM.htmlSnippets.renderUnexpectedError)
}