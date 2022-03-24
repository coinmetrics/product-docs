{
  'use strict'

  let KEY = 'CMKB:api_key'
  let key = localStorage[KEY]

  let $keyInput = document.getElementById('Key-input')
  
  if (!key) {
    // $keyInput.style.backgroundColor = 'var(--color-secondary-light-red)'
    // $keyInput.style.color = 'var(--color-secondary-dark-red)'
  }
}