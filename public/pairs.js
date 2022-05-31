{
  'use strict'

  let CM = window.__CM ??= {}
  
  let canonicalPairs, 
    renderablePairs,
    renderedPairs = 0
  
  let $tbody = document.querySelector('tbody'),
    $filter = document.getElementById('text-filter'),
    $download = document.getElementById('download'),
    $downloadLink = document.getElementById('download-link'),
    $loadMore = document.getElementById('load-more'),
    $loadCount = document.getElementById('load-count'),
    $loadTotal = document.getElementById('load-total'),
    $loadAll = document.getElementById('load-all'),
    $empty = document.getElementById('empty')

  let getPairs = () => 
    fetch('/api/pairs')
      .then(res => {
        if (res.status === 500) throw new Error(`Error from API`)
        else return res.json()
      })
      .then(body => canonicalPairs = renderablePairs = body.data)

  let $renderRows = (arr) => {
    let html = ''
    arr.forEach(id => {
      const [base, quote] = id.split('-')
      html += /*html*/`
        <tr>
          <td>
            <a href="/pairs/${id}" class="Link Text-regular">${id}</a>
          </td>
          <td>
            <cm-coin name="${base}"></cm-coin>
            <a href="/assets/${base}" class="Link Text-regular">${base}</a>
          </td>
          <td>
            <cm-coin name="${quote}"></cm-coin>
            <a href="/assets/${quote}" class="Link Text-regular">${quote}</a>
          </td>
        </tr>`})
    let $t = document.createElement('template')
    $t.innerHTML = html
    return $t.content
  }
  let renderNext20Pairs = () => {
    $empty.hidden = renderablePairs.length > 0
    let next20 = renderablePairs.slice(renderedPairs, renderedPairs+CM.constants.PAGE_SIZE)
    let $next20 = $renderRows(next20)
    $tbody.append($next20)
    renderedPairs += CM.constants.PAGE_SIZE
    $loadCount.textContent = CM.string.formatNumber(renderedPairs)
    $loadTotal.textContent = CM.string.formatNumber(renderablePairs.length)
    $loadMore.parentNode.hidden = renderedPairs >= renderablePairs.length
  }
  let renderRemaining = () => {
    let remaining = renderablePairs.slice(renderedPairs)
    let $remaining = $renderRows(remaining)
    $tbody.append($remaining)
    renderedPairs = renderablePairs.length
    $loadMore.parentNode.hidden = true
  }

  let onFilter = filter => {    
    if (filter)
      renderablePairs = canonicalPairs.filter(x => x.toLowerCase().includes(filter.toLowerCase()))
    else 
      renderablePairs = canonicalPairs

    $download.disabled = renderablePairs.length === 0
    $tbody.innerHTML = ''
    renderedPairs = 0
    renderNext20Pairs()
  }
  let onDownload = () => {
    $downloadLink.href = CM.algorithns.encodeCsv([
      ['ID', 'BASE_ASSET', 'QUOTE_ASSET'],
      ...renderablePairs.map(x => ([x, ...x.split('-')])),
    ])
    $downloadLink.download = `cm-pairs.csv`
    $downloadLink.click()
  }
  let onPairs = () => {
    if ($filter.value) onFilter($filter.value)
    else renderNext20Pairs()

    $filter.oninput = e => onFilter(e.target.value)
    $download.onclick = onDownload
    $loadMore.onclick = renderNext20Pairs
    $loadAll.onclick = renderRemaining
  }

  getPairs().then(onPairs).catch(CM.htmlSnippets.renderUnexpectedError)
}