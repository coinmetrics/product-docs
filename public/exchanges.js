{
  'use strict'

  let CM = window.__CM = window.__CM || {}
  
  let canonicalExchanges, 
    renderableExchanges,
    renderedExchanges = 0
  
  let $tbody = document.querySelector('tbody'),
    $filter = document.getElementById('text-filter'),
    $download = document.getElementById('download'),
    $downloadLink = document.getElementById('download-link'),
    $loadMore = document.getElementById('load-more'),
    $loadCount = document.getElementById('load-count'),
    $loadTotal = document.getElementById('load-total'),
    $loadAll = document.getElementById('load-all'),
    $empty = document.getElementById('empty')

  let getExchanges = () => 
    fetch('/api/exchanges')
      .then(res => {
        if (res.status === 500) throw new Error(`Error from API`)
        else return res.json()
      })
      .then(body => canonicalExchanges = renderableExchanges = body.data)
  let getDate = (ts) => ts.split('T')[0]
  let getTime = (ts) => ts.split('T')[1].split('.')[0]

  let $renderRows = (arr) => {
    let html = ''
    arr.forEach(exchange => 
      html += /*html*/`
        <tr>
          <td>
            <a 
              href="/exchanges/${exchange.id}" 
              class="Link Text-regular">${exchange.id}</a>
          </td>
          <td>
            <p class="Text-code Text-regular">${getDate(exchange.minTime)}</p>
            <p class="Text-code Text-small">${getTime(exchange.minTime)}</p>
          </td>
          <td>
            <p class="Text-code Text-regular">${getDate(exchange.maxTime)}</p>
            <p class="Text-code Text-small">${getTime(exchange.maxTime)}</p>
          </td>
          <td>
            <p class="Text-code Text-regular">${exchange.totalSpot}</p>
          </td>
          <td>
            <p class="Text-code Text-regular">${exchange.totalFuture}</p>
          </td>
        </tr>`)
    let $t = document.createElement('template')
    $t.innerHTML = html
    return $t.content
  }
  let renderNext20 = () => {
    $empty.hidden = renderableExchanges.length > 0
    let next20 = renderableExchanges.slice(renderedExchanges, renderedExchanges+CM.constants.PAGE_SIZE)
    let $next20 = $renderRows(next20)
    $tbody.append($next20)
    renderedExchanges += CM.constants.PAGE_SIZE
    $loadCount.textContent = CM.string.formatNumber(renderedExchanges)
    $loadTotal.textContent = CM.string.formatNumber(renderableExchanges.length)
    $loadMore.parentNode.hidden = renderedExchanges >= renderableExchanges.length
  }
  let renderRemaining = () => {
    let remaining = renderableExchanges.slice(renderedExchanges)
    let $remaining = $renderRows(remaining)
    $tbody.append($remaining)
    renderedExchanges = renderableExchanges.length
    $loadMore.parentNode.hidden = true
  }

  let onFilter = filter => {
    if (filter)
      renderableExchanges = canonicalExchanges.filter(x => x.id.toLowerCase().includes(filter.toLowerCase()))
    else 
      renderableExchanges = canonicalExchanges

    $tbody.innerHTML = ''
    renderedExchanges = 0
    renderNext20()
  }
  let onDownload = () => {
    $downloadLink.href = CM.algorithms.encodeCsv([
      ['ID', 'MIN_TIME', 'MAX_TIME', 'TOTAL_SPOT', 'TOTAL_FUTURE'],
      ...renderableExchanges.map(x => ([x.id, x.minTime, x.maxTime, x.totalSpot, x.totalFuture])),
    ])
    $downloadLink.download = `cm-exchanges.csv`
    $downloadLink.click()
  }
  let onExchanges = () => {
    if ($filter.value) onFilter($filter.value)
    else renderNext20()

    $filter.oninput = e => onFilter(e.target.value)
    $download.onclick = onDownload
    $loadMore.onclick = renderNext20
    $loadAll.onclick = renderRemaining
  }

  getExchanges().then(onExchanges).catch(CM.htmlSnippets.renderUnexpectedError)
}