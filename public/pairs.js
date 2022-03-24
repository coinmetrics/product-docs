{
  'use strict'

  let pairs = []
  let renderedPairs = 0
  
  let $tbody = document.querySelector('tbody')

  let getPairs = () => 
    fetch('http://localhost:8000/pairs')
      .then(res => res.json())
      .then(body => pairs = body.data)

  let $renderRows = (arr) => {
    let html = ''
    arr.forEach(pair => {
      const [base, quote] = pair.id.split('-')
      html += `
        <tr>
          <td>
            <a href="/pair?id=${pair.id}" class="Link Text-regular">${pair.id}</a>
          </td>
          <td>
            <cm-coin name="${base}"></cm-coin>
            <a href="/asset?id=${base}" class="Link Text-regular">${base}</a>
          </td>
          <td>
            <cm-coin name="${quote}"></cm-coin>
            <a href="/asset?id=${quote}" class="Link Text-regular">${quote}</a>
          </td>
        </tr>
      `
    })
    let $t = document.createElement('template')
    $t.innerHTML = html
    return $t.content
  }
  let renderNext20Pairs = () => {
    let next20Pairs = pairs.slice(renderedPairs, renderedPairs+20)
    let $next20Pairs = $renderRows(next20Pairs)
    $tbody.append($next20Pairs)
    renderedPairs += 20
  }
  let renderRemainingPairs = () => {
    let remainingPairs = pairs.slice(renderedPairs)
    let $remainingPairs = $renderRows(remainingPairs)
    $tbody.append($remainingPairs)
    renderedPairs = pairs.length
  }

  document.getElementById('LoadMore').onclick = renderNext20Pairs
  document.getElementById('LoadAll').onclick = renderRemainingPairs

  getPairs().then(renderNext20Pairs)
}