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