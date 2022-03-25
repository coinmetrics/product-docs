{
  'use strict'

  let id = (new URLSearchParams(location.search)).get('id')
  let pair = {}
  let renderedMetrics = 0
  
  let $tbody = document.querySelector('tbody')
  let $id = document.getElementById('id')

  let getPair = () => 
    fetch(`http://localhost:8000/pair?id=${id}`)
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
              'name="check" alt="Available"'
              : 'name="x" alt="Unavailable"'}></cm-icon>
          </td>
          <td>
            <cm-color-icon ${metric.acl.includes('p') ? 
              'name="check" alt="Available"'
              : 'name="x" alt="Unavailable"'}></cm-icon>
          </td>
          <td>
            <cm-color-icon ${metric.acl.includes('u') ? 
              'name="check" alt="Available"'
              : 'name="x" alt="Unavailable"'}></cm-icon>
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
  }
  let renderRemainingPairs = () => {
    let remainingMetrics = pair.metrics.slice(renderedMetrics)
    let $remainingMetrics = $renderRows(remainingMetrics)
    $tbody.append($remainingMetrics)
    renderedMetrics = pair.metrics.length
  }
  let renderPair = () => {
    $id.textContent = id
    renderNext20Metrics()
  }

  document.getElementById('LoadMore').onclick = renderNext20Metrics
  document.getElementById('LoadAll').onclick = renderRemainingPairs

  getPair().then(renderPair)
}