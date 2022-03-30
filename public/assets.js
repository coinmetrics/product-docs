{
  'use strict'

  let assets = []
  let renderedAssets = 0
  
  let $tbody = document.querySelector('tbody')
  let $loadMore = document.getElementById('load-more')
  let $loadAll = document.getElementById('load-all')

  let getAssets = () => 
    fetch('http://localhost:8000/assets')
      .then(res => res.json())
      .then(body => assets = body.data)

  let $renderRows = (arr) => {
    let html = ''
    arr.forEach(asset => 
      html += `
        <tr>
          <td>
            <cm-coin name="${asset.id}" alt=""></cm-coin>
            <a 
              href="/asset?id=${asset.id}" 
              class="Link Text-regular">${asset.id.toUpperCase()}</a>
          </td>
          <td>
            <p class="Text-regular">${asset.fullName}</p>
          </td>
        </tr>
      `
    )
    let $t = document.createElement('template')
    $t.innerHTML = html
    return $t.content
  }
  let renderNext20Assets = () => {
    let next20Assets = assets.slice(renderedAssets, renderedAssets+20)
    let $next20Assets = $renderRows(next20Assets)
    $tbody.append($next20Assets)
    renderedAssets += 20
    if (renderedAssets >= assets.length) {
      $loadMore.disabled = true
      $loadAll.disabled = true
    }
  }
  let renderRemainingAssets = () => {
    let remainingAssets = assets.slice(renderedAssets)
    let $remainingAssets = $renderRows(remainingAssets)
    $tbody.append($remainingAssets)
    renderedAssets = assets.length
    $loadMore.disabled = true
    $loadAll.disabled = true
  }

  $loadMore.onclick = renderNext20Assets
  $loadAll.onclick = renderRemainingAssets

  getAssets().then(renderNext20Assets)
}