{
  'use strict'

  let CM = window.__CM = window.__CM || {}

  let key = CM.auth.key,
    id = location.pathname.split('/')[2],
    canonicalPairs,
    renderablePairs,
    userAcl,
    renderedPairs = 0

  let $tbody = document.querySelector('tbody'),
    $filter = document.getElementById('text-filter'),
    $download = document.getElementById('download'),
    $downloadIcon = $download.querySelector('cm-icon'),
    $downloadLink = document.getElementById('download-link'),
    $keyCol = document.getElementById('key-col'),
    $loadMore = document.getElementById('load-more'),
    $loadCount = document.getElementById('load-count'),
    $loadTotal = document.getElementById('load-total'),
    $loadAll = document.getElementById('load-all'),
    $empty = document.getElementById('empty')

  const DEFAULT_USER_ACL = {pairs: {}}

  let getPairMetric = () => 
    fetch(`/api/pair-metrics/${id}`)
      .then(res => {
        if (res.status === 500) throw new Error(`Error from API`)
        else return res.json()
      })
      .then(body => 
        canonicalPairs = renderablePairs = Object.entries(body.pairs).map(([key, value]) => ({id: key, acl: value})))
  let getUserAcl = () => 
    fetch(`/api/pair-metrics/${id}/user-acl?api_key=${key}`)
      .then(res => {
        if (res.status === 401) return DEFAULT_USER_ACL
        else if (res.status !== 200) return {isFailed: true, ...DEFAULT_USER_ACL}
        else return res.json()
      })

  let $renderRows = arr => {
    let html = ''
    arr.forEach(pair => 
      html += /*html*/`
        <tr>
          <td>
            <a href="/pairs/${pair.id}" class="Link Text-regular">${pair.id}</a>
          </td>
          <td>
            <cm-color-icon ${pair.acl.includes('c') ? 
              'name="check">Available' : 'name="x">Unavailable'}
            </cm-color-icon>
          </td>
          <td>
            <cm-color-icon ${pair.acl.includes('p') ? 
              'name="check">Available' : 'name="x">Unavailable'}
            </cm-color-icon>
          </td>
          <td id="${pair.id}"></td>
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
        else if (userAcl.isFailed) 
          $el.innerHTML = /*html*/`<cm-icon name="alert-triangle">Unexpected error</cm-icon>`
        else if (userAcl.pairs && id in userAcl.pairs) 
          $el.innerHTML = /*html*/`<cm-color-icon name="check">Available</cm-color-icon>`
        else 
          $el.innerHTML = /*html*/`<cm-color-icon name="x">Unavailable</cm-color-icon>`
      })
    })
  let renderNext20Pairs = () => {
    $empty.hidden = renderablePairs.length > 0
    let next20Pairs = renderablePairs.slice(renderedPairs, renderedPairs+CM.constants.PAGE_SIZE)
    let $next20Pairs = $renderRows(next20Pairs)
    $tbody.append($next20Pairs)
    renderUserAclCells(next20Pairs.map(x => x.id))
    renderedPairs += CM.constants.PAGE_SIZE
    $loadCount.textContent = CM.string.formatNumber(renderedPairs)
    $loadTotal.textContent = CM.string.formatNumber(renderablePairs.length)
    $loadMore.parentNode.hidden = renderedPairs >= renderablePairs.length
  }
  let renderRemainingPairs = () => {
    let remainingPairs = renderablePairs.slice(renderedPairs)
    let $remainingPairs = $renderRows(remainingPairs)
    $tbody.append($remainingPairs)
    renderUserAclCells(remainingPairs.map(x => x.id))
    renderedPairs = renderablePairs.length
    $loadMore.parentNode.hidden = true
  }
  let renderKeyColumn = () => {
    $keyCol.textContent = key ? 'your key' : 'no key'
    $keyCol.classList.toggle('Missing-key', !key)
  }
  
  let onFilterPairs = filter => {
    if (filter)
      renderablePairs = canonicalPairs.filter(x => x.id.toLowerCase().includes(filter.toLowerCase()))
    else 
      renderablePairs = canonicalPairs

    $tbody.innerHTML = ''
    renderedPairs = 0
    renderNext20Pairs()
  }
  let onDownload = () => {
    $downloadIcon.name = 'refresh-cw'
    $downloadIcon.classList.add('Icon-spin')

    userAcl.then(userAcl => {
      $downloadLink.href = CM.algorithms.buildGenericAclCsv(renderablePairs, userAcl, 'pairs')
      $downloadLink.download = `cm-pair-metric-${id}-pairs.csv`
      $downloadLink.click()

      $downloadIcon.classList.remove('Icon-spin')
      $downloadIcon.name = 'download'
    })
  }
  let onPairMetric = () => {
    renderKeyColumn()

    if ($filter.value) onFilterPairs($filter.value)
    else renderNext20Pairs()
    
    $filter.oninput = e => onFilterPairs(e.target.value)
    $download.onclick = onDownload
    $loadMore.onclick = renderNext20Pairs
    $loadAll.onclick = renderRemainingPairs
  }

  CM.auth.onChange = k => {
    key = k
    userAcl = key ? getUserAcl() : Promise.resolve(DEFAULT_USER_ACL)
    renderKeyColumn()
    let ids = Array.from($tbody.querySelectorAll(':scope > tr > td:nth-child(4)')).map(x => x.id)
    renderUserAclCells(ids)
  }

  userAcl = key ? getUserAcl() : Promise.resolve(DEFAULT_USER_ACL)

  getPairMetric().then(onPairMetric).catch(CM.htmlSnippets.renderUnexpectedError)
}