{
  'use strict'

  let id = (new URLSearchParams(location.search)).get('id')
  let metric = []
  let renderedPairs = 0
  
  let $id = document.getElementById('id')
  let $name = document.getElementById('name')
  let $description = document.getElementById('description')
  let $tbody = document.querySelector('tbody')

  let getPairMetric = () => 
    fetch(`http://localhost:8000/pair-metric?id=${id}`)
      .then(res => res.json())
      .then(body => metric = body)

  let $renderRows = (arr) => {
    let html = ''
    arr.forEach(pair => 
      html += `
        <tr>
          <td>
            <a href="/pair?id=${pair.id}" class="Link Text-regular">${pair.id}</a>
          </td>
          <td>
            <cm-color-icon ${pair.acl.includes('c') ? 
              'name="check" alt="Available"'
              : 'name="x" alt="Unavailable"'}></cm-icon>
          </td>
          <td>
            <cm-color-icon ${pair.acl.includes('p') ? 
              'name="check" alt="Available"'
              : 'name="x" alt="Unavailable"'}></cm-icon>
          </td>
          <td>
            <cm-color-icon ${pair.acl.includes('u') ? 
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
  let renderNext20Pairs = () => {
    let next20Pairs = metric.pairs.slice(renderedPairs, renderedPairs+20)
    let $next20Pairs = $renderRows(next20Pairs)
    $tbody.append($next20Pairs)
    renderedPairs += 20
  }
  let renderRemainingPairs = () => {
    let remainingPairs = metric.pairs.slice(renderedPairs)
    let $remainingPairs = $renderRows(remainingPairs)
    $tbody.append($remainingPairs)
    renderedPairs = metric.pairs.length
  }
  let renderPairMetric = () => {
    $id.textContent = metric.id
    $name.textContent = metric.name
    $description.textContent = metric.description
    renderNext20Pairs()
  }

  document.getElementById('LoadMore').onclick = renderNext20Pairs
  document.getElementById('LoadAll').onclick = renderRemainingPairs

  getPairMetric().then(renderPairMetric)
}