{
  'use strict'

  let CM = window.__CM = window.__CM || {}
  let key = CM.auth.key
  let id = (new URLSearchParams(location.search)).get('id')
  let pair = {}
  let renderedMetrics = 0
  
  let $tbody = document.querySelector('tbody')
  let $id = document.getElementById('id')
  let $keyCol = document.getElementById('key-col')
  let $loadMore = document.getElementById('load-more')
  let $loadAll = document.getElementById('load-all')

  let getPair = () => 
    fetch(`http://localhost:8000/pair?id=${id}&api-key=${key}`)
      .then(res => res.json())
      .then(body => pair = body)

  let $renderRows = (arr) => {
    let html = ''
    arr.forEach(metric => 
      html += `
        <tr>
          <td>
            <a href="/pair-metric?id=${metric.id}" class="Link Text-regular">${metric.id}</a>
          </td>
          <td>
            <cm-color-icon ${metric.acl.includes('c') ? 
              'name="check">Available' : 'name="x">Unavailable'}
            </cm-color-icon>
          </td>
          <td>
            <cm-color-icon ${metric.acl.includes('p') ? 
              'name="check">Available' : 'name="x">Unavailable'}
            </cm-color-icon>
          </td>
          <td>
            ${key ? 
              `<cm-color-icon ${metric.acl.includes('u') ? 
                'name="check">Available' : 'name="x"?>Unavailable'}
               </cm-color-icon>`
              : '<cm-icon name="slash">Visualization key is missing</cm-icon>'}
          </td>
        </tr>
      `
    )
    let $t = document.createElement('template')
    $t.innerHTML = html
    return $t.content
  }
  let renderNext20Metrics = () => {
    let next20Metrics = pair.metrics.slice(renderedMetrics, renderedMetrics+20)
    let $next20Metrics = $renderRows(next20Metrics)
    $tbody.append($next20Metrics)
    renderedMetrics += 20
    if (renderedMetrics >= pair.metrics.length) {
      $loadMore.disabled = true
      $loadAll.disabled = true
    }
  }
  let renderRemainingMetrics = () => {
    let remainingMetrics = pair.metrics.slice(renderedMetrics)
    let $remainingMetrics = $renderRows(remainingMetrics)
    $tbody.append($remainingMetrics)
    renderedMetrics = pair.metrics.length
    $loadMore.disabled = true
    $loadAll.disabled = true
  }
  let reRenderMetrics = () => {
    let alreadyRenderedMetrics = pair.metrics.slice(0, renderedMetrics)
    let $alreadyRenderedMetrics = $renderRows(alreadyRenderedMetrics)
    $tbody.innerHTML = ''
    $tbody.append($alreadyRenderedMetrics)
  }
  let renderKeyColumn = () => {
    $keyCol.textContent = key ? 'your key' : 'no key'
    $keyCol.classList.toggle('Missing-key', !key)
  }
  let renderPair = () => {
    $id.textContent = id
    renderKeyColumn()
    renderNext20Metrics()
  }

  $loadMore.onclick = renderNext20Metrics
  $loadAll.onclick = renderRemainingMetrics

  getPair().then(renderPair)

  CM.auth.onChange = k => {
    key = k
    getPair().then(() => {
      renderKeyColumn()
      reRenderMetrics()
    })
  }
}