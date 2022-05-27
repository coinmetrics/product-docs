{ // CM.auth
  'use strict'

  let CM = window.__CM = window.__CM || {}
  let KEY = 'CMKB:api_key'

  let $popup = document.getElementById('api-key-popup')
  let $form = document.getElementById('api-key-form')
  let $input = $form.querySelector('input')

  $input.value = localStorage[KEY]
  
  $form.onsubmit = e => {
    e.preventDefault()
    
    localStorage[KEY] = $input.value
    CM.auth.key = $input.value
    $popup.open = false

    if (CM.auth?.onChange) CM.auth.onChange($input.value)
  }
  
  CM.auth = {
    key: localStorage[KEY]
  }
}
{ // CM.constants
  'use strict'

  let CM = window.__CM = window.__CM || {}

  CM.constants = {
    PAGE_SIZE: 20
  }
}
{ // CM.string
  'use strict'

  let CM = window.__CM = window.__CM || {}

  let formatNumber = (
    num,
    minimumFractionDigits = 0,
    maximumFractionDigits = 8
  ) => {
    if (num === undefined) {
      console.error(
        'formatNumber received an undefined number\n\n',
        new Error().stack
      )
      return ''
    }
  
    if (typeof num === 'string') num = Number(num)
    return num.toLocaleString('en', {
      minimumFractionDigits,
      maximumFractionDigits,
    })
  }

  CM.string = {
    formatNumber
  }
}
{ // nav search
  'use strict'

  let $form = document.getElementById('nav-search-form'),
  $input = $form.querySelector('input')

  $form.onsubmit = e => {
    e.preventDefault()
    location.href = `/search-results?query=${$input.value}`
  }
}
{ // HTML snippets
  'use strict'

  let CM = window.__CM = window.__CM || {}

  let $main = document.getElementsByTagName('main')[0]

  let renderUnexpectedError = () => 
    $main.innerHTML = /*html*/`
      <section class="Error">
        <div class="Text-content">
          <h2>Oops!</h2>
          <div class="Line-h-dark"></div>
          <p>
            Something unexpected happened.
          </p>
        </div>
        <cm-inline-svg>
          <img src="https://cdn.coinmetrics.io/ship.svg" alt="Unexpected error">
        </cm-inline-svg>
      </section>`

  CM.htmlSnippets = {
    renderUnexpectedError
  }
}
{ // algorithms
  'use strict'

  let CM = window.__CM = window.__CM || {}

  let encodeCsv = rows => encodeURI('data:text/csv;charset=utf-8,' + rows.map((e) => e.join(',')).join('\n'))

  let buildMetricsAclCsv = (metrics, userAcl) => {
    let rows = [ ['ID', 'COMMUNITY', 'PROFESSIONAL', 'YOUR_KEY'] ]
    
    for (let {id, acl} of metrics) {
      let community, pro, yourKey
      if (acl.c) {
        community = acl.c.join(',')
        if (acl.c.length > 1) community = `"${community}"`
      }
      if (acl.p) {
        pro = acl.p.join(',')
        if (acl.p.length > 1) pro = `"${pro}"`
      }
      if (userAcl.metrics[id]) {
        yourKey = userAcl.metrics[id].join(',')
        if (userAcl.metrics[id].length > 1) yourKey = `"${yourKey}"`
      }
      rows.push([id, community, pro, yourKey])
    }

    return encodeCsv(rows)
  }

  let buildMarketsAclCsv = (markets, userAcl) => {
    let rows = [ ['ID', 'COMMUNITY', 'PROFESSIONAL', 'YOUR_KEY'] ]
    
    for (let {id, acl} of markets) {
      let community = acl.includes('c')
        pro = acl.includes('p'),
        yourKey = userAcl.markets[id]?.includes('u') ?? ''

      rows.push([id, community, pro, yourKey])
    }

    return encodeCsv(rows)
  }

  let buildMetricsCsv = metrics => {
    let rows = [ ['ID', 'NAME', 'CATEGORY', 'SUBCATEGORY', 'FREQUENCIES'] ]

    for (let x of metrics) 
      rows.push([x.id, x.name, x.category, x.subcategory, `"${x.frequencies?.join(',') ?? ''}"`])

    return encodeCsv(rows)
  }

  let buildGenericAclCsv = (data, userAcl, index) => {
    let rows = [ ['ID', 'COMMUNITY', 'PROFESSIONAL', 'YOUR_KEY'] ]

    for (let {id, acl} of data) {
      let community = acl.includes('c')
        pro = acl.includes('p'),
        yourKey = userAcl[index][id]?.includes('u') ?? ''
      
        rows.push([id, community, pro, yourKey])
    }

    return encodeCsv(rows)
  }

  CM.algorithms = {
    encodeCsv,
    buildMetricsAclCsv,
    buildMarketsAclCsv,
    buildMetricsCsv,
    buildGenericAclCsv
  }
}