{
  'use strict'

  let exchanges = []
  let renderedExchanges = 0
  
  let $tbody = document.querySelector('tbody')
  let $loadMore = document.getElementById('load-more')
  let $loadAll = document.getElementById('load-all')

  let getExchanges = () => 
    fetch('http://localhost:8000/exchanges')
      .then(res => res.json())
      .then(body => exchanges = body.data)
  let getDate = (ts) => ts.split('T')[0]
  let getTime = (ts) => ts.split('T')[1].split('.')[0]

  let $renderRows = (arr) => {
    let html = ''
    arr.forEach(exchange => 
      html += `
        <tr>
          <td>
            <a 
              href="/exchange?id=${exchange.id}" 
              class="Link Text-regular">${exchange.id}</a>
          </td>
          <td>
            <p class="Text-code Text-regular">${getDate(exchange.minTime)}</p>
            <p class="Text-code Text-small">${getTime(exchange.minTime)}</p>
          </td>
          <td>
            <p class="Text-code Text-regular">${getDate(exchange.maxTime)}</p>
            <p class="Text-code Text-small">${getTime(exchange.maxTime)}</p>
          </td>
          <td>
            <p class="Text-code Text-regular">${exchange.totalSpot}</p>
          </td>
          <td>
            <p class="Text-code Text-regular">${exchange.totalFuture}</p>
          </td>
        </tr>
      `
    )
    let $t = document.createElement('template')
    $t.innerHTML = html
    return $t.content
  }
  let renderNext20Exchanges = () => {
    let next20Exchanges = exchanges.slice(renderedExchanges, renderedExchanges+20)
    let $next20Exchanges = $renderRows(next20Exchanges)
    $tbody.append($next20Exchanges)
    renderedExchanges += 20
    if (renderedExchanges >= exchanges.length) {
      $loadMore.disabled = true
      $loadAll.disabled = true
    }
  }
  let renderRemainingExchanges = () => {
    let remainingExchanges = exchanges.slice(renderedExchanges)
    let $remainingExchanges = $renderRows(remainingExchanges)
    $tbody.append($remainingExchanges)
    renderedExchanges = exchanges.length
    $loadMore.disabled = true
    $loadAll.disabled = true
  }

  $loadMore.onclick = renderNext20Exchanges
  $loadAll.onclick = renderRemainingExchanges

  getExchanges().then(renderNext20Exchanges)
}