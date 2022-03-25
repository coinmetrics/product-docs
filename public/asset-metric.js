{
  'use strict'

  let id = (new URLSearchParams(location.search)).get('id')
  let assetMetric = []
  let renderedAssets = 0
  
  let $id = document.getElementById('id')
  let $name = document.getElementById('name')
  let $description = document.getElementById('description')
  let $tbody = document.querySelector('tbody')

  let getMetric = () => 
    fetch(`http://localhost:8000/asset-metric?id=${id}`)
      .then(res => res.json())
      .then(body => assetMetric = body)

  let $renderRows = (arr) => {
    let html = ''
    arr.forEach(asset => 
      html += `
        <tr>
          <td>
            <a href="/asset?id=${asset.id}" class="Link Text-regular">
              <cm-coin name="${asset.id}" alt=""></cm-coin>
              ${asset.id}
            </a>
          </td>
          <td>
            ${asset.acl.c?.length ? 
              `<p class="Text-regular">${asset.acl.c.join(',')}</p>` 
              : '<cm-color-icon name="x" alt="Unavailable">'}
          </td>
          <td>
            ${asset.acl.p?.length > 0 ? 
              `<p class="Text-regular">${asset.acl.p.join(',')}</p>` 
              : '<cm-color-icon name="x" alt="Unavailable">'}
          </td>
          <td>
            ${asset.acl.u?.length > 0 ? 
              `<p class="Text-regular">${asset.acl.u.join(',')}</p>` 
              : '<cm-color-icon name="x" alt="Unavailable">'}
          </td>
        </tr>
      `
    )
    let $t = document.createElement('template')
    $t.innerHTML = html
    return $t.content
  }
  let renderNext20Assets = () => {
    let next20Assets = assetMetric.assets.slice(renderedAssets, renderedAssets+20)
    let $next20Assets = $renderRows(next20Assets)
    $tbody.append($next20Assets)
    renderedAssets += 20
  }
  let renderRemainingAssets = () => {
    let remainingAssets = assetMetric.assets.slice(renderedAssets)
    let $remainingAssets = $renderRows(remainingAssets)
    $tbody.append($remainingAssets)
    renderedAssets = assetMetric.assets.length
  }
  let renderMetric = () => {
    $id.textContent = assetMetric.id
    $name.textContent = assetMetric.name
    $description.textContent = assetMetric.description
    renderNext20Assets()
  }

  document.getElementById('LoadMore').onclick = renderNext20Assets
  document.getElementById('LoadAll').onclick = renderRemainingAssets

  getMetric().then(renderMetric)
}