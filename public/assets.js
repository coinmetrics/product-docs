{
  'use strict'

  let CM = window.__CM = window.__CM || {}

  let canonicalAssets, 
    downloadableAssets,
    renderableAssets,
    renderedAssets = 0
  
  let $tbody = document.querySelector('tbody'),
    $filter = document.getElementById('text-filter'),
    $download = document.getElementById('download'),
    $downloadLink = document.getElementById('download-link'),
    $loadMore = document.getElementById('load-more'),
    $loadCount = document.getElementById('load-count'),
    $loadTotal = document.getElementById('load-total'),
    $loadAll = document.getElementById('load-all'),
    $empty = document.getElementById('empty')

  let getAssets = () => 
    fetch('/api/assets')
      .then(res => {
        if (res.status === 500) throw new Error(`Error from API`)
        else return res.json()
      })
      .then(body => 
        canonicalAssets = downloadableAssets = renderableAssets = Object.entries(body).map(([key, value]) => ({id: key, fullName: value})))

  let $renderRows = arr => {
    let html = ''
    arr.forEach(asset => 
      html += /*html*/`
        <tr>
          <td>
            <cm-coin name="${asset.id}"></cm-coin>
            <a 
              href="/assets/${asset.id}" 
              class="Link Text-regular">${asset.id.toUpperCase()}</a>
          </td>
          <td>
            <p class="Text-regular">${asset.fullName}</p>
          </td>
        </tr>`)
    let $t = document.createElement('template')
    $t.innerHTML = html
    return $t.content
  }
  let renderNext20 = () => {
    $empty.hidden = renderableAssets.length > 0
    let next20 = renderableAssets.slice(renderedAssets, renderedAssets+CM.constants.PAGE_SIZE)
    let $next20 = $renderRows(next20)
    $tbody.append($next20)
    renderedAssets += CM.constants.PAGE_SIZE
    $loadCount.textContent = CM.string.formatNumber(renderedAssets)
    $loadTotal.textContent = CM.string.formatNumber(renderableAssets.length)
    $loadMore.parentNode.hidden = renderedAssets >= renderableAssets.length
  }
  let renderRemaining = () => {
    let remaining = renderableAssets.slice(renderedAssets)
    let $remaining = $renderRows(remaining)
    $tbody.append($remaining)
    renderedAssets = renderableAssets.length
    $loadMore.parentNode.hidden = true
  }

  let onFilter = filter => {
    if (filter)
      downloadableAssets = renderableAssets = canonicalAssets.filter(x => x.id.toLowerCase().includes(filter.toLowerCase()))
    else
      downloadableAssets = renderableAssets = canonicalAssets

    $tbody.innerHTML = ''
    renderedAssets = 0
    renderNext20()
  }
  let onDownload = () => {
    let rows = [
      ['ID', 'FULL_NAME'],
      ...downloadableAssets.map(x => ([x.id, x.fullName])),
    ]
    let csvContent =
      'data:text/csv;charset=utf-8,' + rows.map((e) => e.join(',')).join('\n')
    let encodedUri = encodeURI(csvContent)
    
    $downloadLink.href = encodedUri
    $downloadLink.download = `cm-assets.csv`
    $downloadLink.click()
  }
  let onAssets = () => {
    if ($filter.value) onFilter($filter.value)
    else renderNext20()

    $filter.oninput = e => onFilter(e.target.value)
    $download.onclick = onDownload
    $loadMore.onclick = renderNext20
    $loadAll.onclick = renderRemaining
  }

  getAssets()
    .then(onAssets)
    .catch(CM.htmlSnippets.renderUnexpectedError)
}