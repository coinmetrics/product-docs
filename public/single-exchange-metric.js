{
  'use strict'

  let CM = window.__CM = window.__CM || {}

  let key = CM.auth.key,
    id = location.pathname.split('/')[2],
    canonicalExchanges,
    renderableExchanges,
    userAcl,
    renderedExchanges = 0

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

  const DEFAULT_USER_ACL = {exchanges: {}}

  let getExchangeMetric = () => 
    fetch(`/api/exchange-metrics/${id}`)
      .then(res => {
        if (res.status === 500) throw new Error(`Error from API`)
        else return res.json()
      })
      .then(body =>
        canonicalExchanges = renderableExchanges = Object.entries(body.exchanges).map(([key, value]) => ({id: key, acl: value})))
  let getUserAcl = () => 
    fetch(`/api/exchange-metrics/${id}/user-acl?api_key=${key}`)
      .then(res => {
        if (res.status === 401) return DEFAULT_USER_ACL
        else if (res.status !== 200) return {isFailed: true, ...DEFAULT_USER_ACL}
        else return res.json()
      })

  let $renderRows = arr => {
    let html = ''
    arr.forEach(exchange => 
      html += /*html*/`
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
        else if (userAcl.exchanges && id in userAcl.exchanges) 
          $el.innerHTML = /*html*/`<cm-color-icon name="check">Available</cm-color-icon>`
        else 
          $el.innerHTML = /*html*/`<cm-color-icon name="x">Unavailable</cm-color-icon>`
      })
    })
  let renderNext20Exchanges = () => {
    $empty.hidden = renderableExchanges.length > 0
    let next20Exchanges = renderableExchanges.slice(renderedExchanges, renderedExchanges+CM.constants.PAGE_SIZE)
    let $next20Exchanges = $renderRows(next20Exchanges)
    $tbody.append($next20Exchanges)
    renderUserAclCells(next20Exchanges.map(x => x.id))
    renderedExchanges += CM.constants.PAGE_SIZE
    $loadCount.textContent = CM.string.formatNumber(renderedExchanges)
    $loadTotal.textContent = CM.string.formatNumber(renderableExchanges.length)
    $loadMore.parentNode.hidden = renderedExchanges >= renderableExchanges.length
  }
  let renderRemainingExchanges = () => {
    let remainingExchanges = renderableExchanges.slice(renderedExchanges)
    let $remainingExchanges = $renderRows(remainingExchanges)
    $tbody.append($remainingExchanges)
    renderUserAclCells(remainingExchanges.map(x => x.id))
    renderedExchanges = renderableExchanges.length
    $loadMore.parentNode.hidden = true
  }
  let renderKeyColumn = () => {
    $keyCol.textContent = key ? 'your key' : 'no key'
    $keyCol.classList.toggle('Missing-key', !key)
  }

  let onFilterExchanges = filter => {
    if (filter)
      renderableExchanges = canonicalExchanges.filter(x => x.id.toLowerCase().includes(filter.toLowerCase()))
    else 
      renderableExchanges = canonicalExchanges

    $tbody.innerHTML = ''
    renderedExchanges = 0
    renderNext20Exchanges()
  }
  let onDownload = () => {
    $downloadIcon.name = 'refresh-cw'
    $downloadIcon.classList.add('Icon-spin')

    userAcl.then(userAcl => {
      $downloadLink.href = CM.algorithms.buildGenericAclCsv(renderableExchanges, userAcl, 'exchanges')
      $downloadLink.download = `cm-exchange-metric-${id}-exchanges.csv`
      $downloadLink.click()

      $downloadIcon.classList.remove('Icon-spin')
      $downloadIcon.name = 'download'
    })
  }
  let onExchangeMetric = () => {
    renderKeyColumn()

    if ($filter.value) onFilterExchanges($filter.value)
    else renderNext20Exchanges()
    
    $filter.oninput = e => onFilterExchanges(e.target.value)
    $download.onclick = onDownload
    $loadMore.onclick = renderNext20Exchanges
    $loadAll.onclick = renderRemainingExchanges
  }
  
  CM.auth.onChange = k => {
    key = k
    userAcl = key ? getUserAcl() : Promise.resolve(DEFAULT_USER_ACL)
    renderKeyColumn()
    let ids = Array.from($tbody.querySelectorAll(':scope > tr > td:nth-child(4)')).map(x => x.id)
    renderUserAclCells(ids)
  }

  userAcl = key ? getUserAcl() : Promise.resolve(DEFAULT_USER_ACL)

  getExchangeMetric().then(onExchangeMetric).catch(CM.htmlSnippets.renderUnexpectedError)
}