{
  'use strict'

  let metrics = []
  let renderedMetrics = 0
  
  let $tbody = document.querySelector('tbody')

  let getExchangeMetrics = () => 
    fetch('http://localhost:8000/exchange-metrics')
      .then(res => res.json())
      .then(body => metrics = body.data)

  let $renderRows = (arr) => {
    let html = ''
    arr.forEach(metric => 
      html += `
        <tr>
          <td>
            <a 
              href="/exchange-metric?id=${metric.id}" 
              class="Link Text-regular">${metric.id}</a>
          </td>
          <td>
            <p class="Text-regular">${metric.name}</p>
          </td>
          <td>
            <p class="Text-regular">${metric.category}</p>
          </td>
          <td>
            <p class="Text-regular">${metric.subcategory}</p>
          </td>
          <td>
            <p class="Text-regular">${metric.frequencies}</p>
          </td>
        </tr>
      `
    )
    let $t = document.createElement('template')
    $t.innerHTML = html
    return $t.content
  }
  let renderNext20Metrics = () => {
    let next20Metrics = metrics.slice(renderedMetrics, renderedMetrics+20)
    let $next20Metrics = $renderRows(next20Metrics)
    $tbody.append($next20Metrics)
    renderedMetrics += 20
  }
  let renderRemainingMetrics = () => {
    let remainingMetrics = metrics.slice(renderedMetrics)
    let $remainingMetrics = $renderRows(remainingMetrics)
    $tbody.append($remainingMetrics)
    renderedMetrics = metrics.length
  }

  document.getElementById('LoadMore').onclick = renderNext20Metrics
  document.getElementById('LoadAll').onclick = renderRemainingMetrics

  getExchangeMetrics().then(renderNext20Metrics)
}