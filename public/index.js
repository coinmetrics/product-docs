{
  'use strict'

  let $form = document.getElementById('form'),
    $input = $form.querySelector('input')

  $form.onsubmit = e => {
    e.preventDefault()
    location.href = `/search-results?query=${$input.value}`
  }
}