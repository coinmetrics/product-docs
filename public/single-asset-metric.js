{
  'use strict'

  let CM = window.__CM = window.__CM || {}

  let key = CM.auth.key,
    id = location.pathname.split('/')[2],
    canonicalAssets,
    renderableAssets,
    userAcl, 
    renderedAssets = 0

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

  const DEFAULT_USER_ACL = {assets: {}}

  let getAssetMetric = () => 
    fetch(`/api/asset-metrics/${id}`)
      .then(res => {
        if (res.status === 500) throw new Error(`Error from API`)
        else return res.json()
      })
      .then(body => {
        canonicalAssets = renderableAssets = Object.entries(body.assets).map(([key, value]) => ({id: key, acl: value}))
      })
  let getUserAcl = () => key ?
    fetch(`/api/asset-metrics/${id}/user-acl?api_key=${key}`)
      .then(res => {
        if (res.status === 401) return DEFAULT_USER_ACL
        else if (res.status !== 200) return {isFailed: true, ...DEFAULT_USER_ACL}
        else return res.json()
      })
    : Promise.resolve(DEFAULT_USER_ACL)

  let $renderRows = (arr) => {
    let html = ''
    arr.forEach(asset => 
      html += /*html*/`
        <tr>
          <td>
            <a href="/assets/${asset.id}" class="Link Text-regular">
              <cm-coin name="${asset.id}"></cm-coin>
              ${asset.id}
            </a>
          </td>
          <td>
            <cm-color-icon ${asset.acl.includes('c') ? 
              'name="check">Available' : 'name="x">Unavailable'}
            </cm-color-icon>
          </td>
          <td>
            <cm-color-icon ${asset.acl.includes('p') ? 
              'name="check">Available' : 'name="x">Unavailable'}
            </cm-color-icon>
          </td>
          <td id="${asset.id}"></td>
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
        else if (userAcl.assets && id in userAcl.assets) 
          $el.innerHTML = /*html*/`<cm-color-icon name="check">Available</cm-color-icon>`
        else 
          $el.innerHTML = /*html*/`<cm-color-icon name="x">Unavailable</cm-color-icon>`
      })
    })
  let renderNext20Assets = () => {
    $empty.hidden = renderableAssets.length > 0
    let next20Assets = renderableAssets.slice(renderedAssets, renderedAssets+CM.constants.PAGE_SIZE)
    let $next20Assets = $renderRows(next20Assets)
    $tbody.append($next20Assets)
    renderUserAclCells(next20Assets.map(x => x.id))
    renderedAssets += CM.constants.PAGE_SIZE
    $loadCount.textContent = CM.string.formatNumber(renderedAssets)
    $loadTotal.textContent = CM.string.formatNumber(renderableAssets.length)
    $loadMore.parentNode.hidden = renderedAssets >= renderableAssets.length
  }
  let renderRemainingAssets = () => {
    let remainingAssets = renderableAssets.slice(renderedAssets)
    let $remainingAssets = $renderRows(remainingAssets)
    $tbody.append($remainingAssets)
    renderUserAclCells(remainingAssets.map(x => x.id))
    renderedAssets = renderableAssets.length
    $loadMore.parentNode.hidden = true
  }
  let renderKeyColumn = () => {
    $keyCol.textContent = key ? 'your key' : 'no key'
    $keyCol.classList.toggle('Missing-key', !key)
  }
  
  let onFilterAssets = filter => {
    if (filter)
      renderableAssets = canonicalAssets.filter(x => x.id.toLowerCase().includes(filter.toLowerCase()))
    else 
      renderableAssets = canonicalAssets

    $download.disabled = renderableAssets.length === 0
    $tbody.innerHTML = ''
    renderedAssets = 0
    renderNext20Assets()
  }
  let onDownload = () => 
    CM.helpers.whileSpinning($downloadIcon, done => 
      userAcl.then(userAcl => {
        $downloadLink.href = CM.CSV.buildGenericAclCsv(renderableAssets, userAcl, 'assets')
        $downloadLink.download = `cm-asset-metric-${id}-assets.csv`
        $downloadLink.click()
        done()
      })
    )
  let onAssetMetric = () => {
    renderKeyColumn()

    if ($filter.value) onFilterAssets($filter.value)
    else renderNext20Assets()
    
    $filter.oninput = e => onFilterAssets(e.target.value)
    $download.onclick = onDownload
    $loadMore.onclick = renderNext20Assets
    $loadAll.onclick = renderRemainingAssets
  }

  CM.auth.onChange = k => {
    key = k
    userAcl = getUserAcl()
    renderKeyColumn()
    let ids = Array.from($tbody.querySelectorAll(':scope > tr > td:nth-child(4)')).map(x => x.id)
    renderUserAclCells(ids)
  }

  userAcl = getUserAcl()

  getAssetMetric().then(onAssetMetric).catch(CM.htmlSnippets.renderUnexpectedError)
}