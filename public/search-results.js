{
  'use strict'

  let CM = window.__CM = window.__CM || {}
  
  let query = new URLSearchParams(location.search).get('query'),
    canonicalResults,
    renderableResults,
    pageNum = 1

  let $form = document.getElementById('form'),
    $input = $form.querySelector('input'),
    $filter = document.getElementById('filter'),
    $count = document.getElementById('count'),
    $total = document.getElementById('total'),
    $download = document.getElementById('download'),
    $downloadLink = document.getElementById('download-link'),
    $results = document.getElementById('results'),
    $paginator = document.getElementById('paginator'),
    $empty = document.getElementById('empty')

  let getSearchResults = () => 
    fetch(`/api/search?query=${query}`)
      .then(res => {
        if (res.status === 500) throw new Error(`Error from API`)
        else return res.json()
      })
      .then(body => canonicalResults = renderableResults = body.data)

  let renderAssetResult = asset => /*html*/`
    <a class="Result" href="/assets/${asset.id}">
      <div>
        <cm-icon name="layers"></cm-icon>
        <p class="Text-large Text-Bold">Asset</p>
        <div class="Line-v-light"></div>
        <cm-coin name="${asset.id}"></cm-coin>
        <p class="Text-large Text-Bold">${asset.id.toUpperCase()}</p>
        <p class="Text-large">${asset.fullName}</p>
      </div>
      <div>
        <cm-icon name="minus"></cm-icon>
        <p class="Text-regular">Metrics Availability</p>
        <cm-icon name="minus"></cm-icon>
        <p class="Text-regular">Exchange Availability</p>
        <cm-icon name="minus"></cm-icon>
        <p class="Text-regular">Markets Availability</p>
      </div>
    </a>`
  let renderPairResult = pair => /*html*/`
    <a class="Result" href="/pairs/${pair.id}">
      <div>
        <cm-icon name="pairs"></cm-icon>
        <p class="Text-large Text-Bold">Pair</p>
        <div class="Line-v-light"></div>
        <cm-coin name="${pair.id.split('-')[0]}"></cm-coin>
        <p class="Text-large Text-Bold">${pair.id.split('-')[0].toUpperCase()}</p>
        <cm-icon name="minus"></cm-icon>
        <cm-coin name="${pair.id.split('-')[1]}"></cm-coin>
        <p class="Text-large Text-Bold">${pair.id.split('-')[1].toUpperCase()}</p>
      </div>
      <div>
        <cm-icon name="minus"></cm-icon>
        <p class="Text-regular">Metrics Availability</p>
      </div>
    </a>`
  let renderExchangeResult = exchange => /*html*/`
    <a class="Result" href="/exchanges/${exchange.id}">
      <div>
        <cm-icon name="exchanges"></cm-icon>
        <p class="Text-large Text-bold">Exchange</p>
        <div class="Line-v-light"></div>
        <p class="Text-large Text-bold">${exchange.id}</p>
      </div>
      <div>
        <cm-icon name="minus"></cm-icon>
        <p class="Text-regular">Metrics Availability</p>
        <cm-icon name="minus"></cm-icon>
        <p class="Text-regular">Markets Availability</p>
      </div>
    </a>`
  let renderAssetMetricResult = assetMetric => /*html*/`
    <a class="Result" href="/asset-metrics/${assetMetric.id}">
      <div>
        <cm-icon name="asset-metrics"></cm-icon>
        <p class="Text-large Text-bold">Asset Metric</p>
        <div class="Line-v-light"></div>
        <p class="Text-large Text-bold">${assetMetric.id}</p>
      </div>
      <div>
        <cm-icon name="minus"></cm-icon>
        <p class="Text-regular">Assets Availability</p>
      </div>
    </a>`
  let renderPairMetricResult = pairMetric => /*html*/`
    <a class="Result" href="/pair-metrics/${pairMetric.id}">
      <div>
        <cm-icon name="pair-metrics"></cm-icon>
        <p class="Text-large Text-bold">Pair Metric</p>
        <div class="Line-v-light"></div>
        <p class="Text-large Text-bold">${pairMetric.id}</p>
      </div>
      <div>
        <cm-icon name="minus"></cm-icon>
        <p class="Text-regular">Pairs Availability</p>
      </div>
    </a>`
  let renderExchangeMetricResult = exchangeMetric => /*html*/`
    <a class="Result" href="/exchange-metrics/${exchangeMetric.id}">
      <div>
        <cm-icon name="exchange-metrics"></cm-icon>
        <p class="Text-large Text-bold">Exchange Metric</p>
        <div class="Line-v-light"></div>
        <p class="Text-large Text-bold">${exchangeMetric.id}</p>
      </div>
      <div>
        <cm-icon name="minus"></cm-icon>
        <p class="Text-regular">Exchanges Availability</p>
      </div>
    </a>`
  let renderResults = () => {
    let html = '',
      start = (pageNum - 1) * CM.constants.PAGE_SIZE,
      end = Math.min(renderableResults.length, pageNum * CM.constants.PAGE_SIZE)

    for (let i = start; i < end; i++) {
      let result = renderableResults[i]
      switch (result.resultType) {
        case 'ASSET':
          html += renderAssetResult(result)
          break
        case 'PAIR':
          html += renderPairResult(result)
          break
        case 'EXCHANGE':
          html += renderExchangeResult(result)
          break
        case 'ASSET_METRIC':
          html += renderAssetMetricResult(result)
          break
        case 'PAIR_METRIC':
          html += renderPairMetricResult(result)
          break
        case 'EXCHANGE_METRIC':
          html += renderExchangeMetricResult(result)
          break
      }
    }

    $results.innerHTML = ''
    $results.append(Object.assign(document.createElement('template'), {
      innerHTML: html,
    }).content)

    $count.textContent = CM.string.formatNumber(start+1) + '-' + CM.string.formatNumber(end)
    $total.textContent = CM.string.formatNumber(renderableResults.length)
    $count.parentNode.hidden = renderableResults.length === 0
    
    $paginator.hidden = renderableResults.length < CM.constants.PAGE_SIZE
    $paginator.total = Math.ceil(renderableResults.length / CM.constants.PAGE_SIZE)

    $empty.hidden = renderableResults.length > 0
  }

  let onFilter = filter => {
    pageNum = 1
    $paginator.current = pageNum

    if (filter && filter !== 'all')
      renderableResults = canonicalResults.filter(x => x.resultType === filter)
    else 
      renderableResults = canonicalResults

    renderResults()
  }
  let onDownload = () => {
    let rows = [
      ['TYPE', 'ID'],
      ...renderableResults.map(x => ([x.resultType, x.id])),
    ]
    let csvContent =
      'data:text/csv;charset=utf-8,' + rows.map((e) => e.join(',')).join('\n')
    let encodedUri = encodeURI(csvContent)
    
    $downloadLink.href = encodedUri
    $downloadLink.download = `cm-search-results-${query}.csv`
    $downloadLink.click()
  }
  let onPageChange = newPageNum => {
    pageNum = newPageNum
    renderResults()
  }

  $input.value = query
  $form.onsubmit = e => {
    e.preventDefault()
    location.href = `/search-results?query=${$input.value}`
  }
  $filter.onchange = e => onFilter(e.target.value)
  $download.onclick = onDownload
  $paginator.onchange = e => onPageChange(e.target.current)

  getSearchResults()
    .then(renderResults)
    .catch(CM.htmlSnippets.renderUnexpectedError)
}