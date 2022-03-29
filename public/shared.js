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