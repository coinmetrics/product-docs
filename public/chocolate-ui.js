(() => {
  'use strict'

  let CUE_EVT_OPTS = { passive: true, once: true }

  let kbdCueOff = () => {
    document.body.setAttribute('data-pointer', '')
    window.addEventListener('keydown', kbdCueOn, CUE_EVT_OPTS)
  }
  let kbdCueOn = () => {
    document.body.removeAttribute('data-pointer')
    window.addEventListener('pointerdown', kbdCueOff, CUE_EVT_OPTS)
  }

  kbdCueOff()
})();

(CM => {
  'use strict'

  let DEFAULT_OPTIONS = {
    duration: 250, // ms
    easing: 'ease-out',
    properties: {
      position: true,
      opacity: true,
      visibility: true,
      height: true,
      width: true,
    },
  }

  let startFLIP = ($el, options) => {
    options = Object.assign({}, DEFAULT_OPTIONS, options)
    let { properties } = options
    let computedStyle = {}
    let initBox = $el.getBoundingClientRect()
    let initialOpacity, initialVisibility
    if (properties.opacity || properties.visibility)
      computedStyle = $el.computedStyle = $el.computedStyle || window.getComputedStyle($el)

    if (properties.opacity) initialOpacity = computedStyle.opacity
    if (properties.visibility) initialVisibility = computedStyle.visibility

    return () => new Promise(res => {
      let finalBox = $el.getBoundingClientRect()
      let finalOpacity, finalVisibility
      if (properties.opacity) finalOpacity = computedStyle.opacity
      if (properties.visibility) finalVisibility = computedStyle.visibility

      let initStyles = {}
      let finalStyles = {}
      if (properties.position) {
        initStyles.transform = `translate3D(${initBox.x - finalBox.x}px, ${initBox.y - finalBox.y}px, 0)`
        finalStyles.transform = 'none'
      }
      if (properties.opacity) {
        initStyles.opacity = initialOpacity
        finalStyles.opacity = finalOpacity
      }
      if (properties.visibility) {
        initStyles.visibility = initialVisibility
        finalStyles.visibility = finalVisibility
      }
      if (properties.height) {
        initStyles.height = initBox.height + 'px'
        finalStyles.height = finalBox.height + 'px'
      }
      if (properties.width) {
        initStyles.width = initBox.width + 'px'
        finalStyles.width = finalBox.width + 'px'
      }
      if (properties.overflow) {
        initStyles.overflow = 'hidden'
      }

      let anim = $el.animate([initStyles, finalStyles], {
        duration: options.duration,
        easing: options.easing,
      })
      anim.onfinish = anim.oncancel = res
    })
  }

  CM.animation = {
    startFLIP,
  }
})(window.__CM = window.__CM || {});

(CM => {
  let evalDefault = x => {
    if (typeof x === 'function') return x()
    return x
  }
  let aliasStringAttr = ($el, attrName, propName = attrName, defaultValue = '') => {
    Object.defineProperty($el, propName, {
      set: x => $el.setAttribute(attrName, x),
      get: () => $el.getAttribute(attrName) || evalDefault(defaultValue)
    })
  }
  let aliasBooleanAttr = ($el, attrName, propName = attrName) => {
    Object.defineProperty($el, propName, {
      set: x => $el.toggleAttribute(attrName, x),
      get: () => $el.hasAttribute(attrName),
    })
  }
  let aliasNumericAttr = ($el, attrName, propName = attrName, defaultVal) => {
    Object.defineProperty($el, propName, {
      set: x => $el.setAttribute(attrName, x),
      get: () => +($el.getAttribute(attrName) || evalDefault(defaultVal)),
    })
  }
  let aliasReadOnly = ($el, attrName, propName = attrName, coerce = x => x) => {
    Object.defineProperty($el, propName, {
      get: () => coerce(this.getAttribute(attrName))
    })
  }
  let aliasReadOnlyBoolean = ($el, attrName, propName = attrName) => {
    Object.defineProperty($el, propName, {
      get: () => $el.hasAttribute(attrName)
    })
  }
  let dispatchEvent = ($el, eventName, evOpts) => {
    evOpts ??= { bubbles: true }
    $el.dispatchEvent(new Event(eventName, evOpts))
  }

  class BaseElement extends HTMLElement {
    constructor() {
      super()
      let disconnectHooks = []
      this.onstop = () => {
        for (let i = 0; i < disconnectHooks.length; i++) disconnectHooks[i]()
        disconnectHooks.length = 0
      }
      this.onstop.push = disconnectHooks.push.bind(disconnectHooks)
    }

    addEventListenerWhileConnected(type, listener, options) {
      this.addEventListener(type, listener, options)
      this.onstop.push(() => this.removeEventListener(type, listener, options))
    }

    addEventListenerToElementWhileConnected($el, type, listener, options) {
      if (typeof $el === 'string') $el = this.querySelector($el)
      if (!$el) return
      $el.addEventListener(type, listener, options)
      this.onstop.push(() => $el.removeEventListener(type, listener, options))
    }

    disconnectedCallback() {
      this.onstop()
    }
  }

  CM.customElements = {
    aliasStringAttr,
    aliasBooleanAttr,
    aliasNumericAttr,
    aliasReadOnly,
    aliasReadOnlyBoolean,
    dispatchEvent,
    BaseElement,
  }
})(window.__CM ??= {});

(CM => {
  'use strict'

  let MIN_ASPECT_FOR_WIDE = 1.5 // 3:2 ratio, arbitrary
  let DIR_ABOVE = 'above'
  let DIR_BELOW = 'below'
  let DIR_LEFT = 'left'
  let DIR_RIGHT = 'right'
  let ALIGN_LEFT = 'leftAlign'
  let ALIGN_RIGHT = 'rightAlign'
  let ALIGN_HCENTER = 'hCenter'
  let ALIGN_TOP = 'topAlign'
  let ALIGN_BOTTOM = 'bottomAlign'
  let ALIGN_VCENTER = 'vCenter'

  let getElmBox = ($el) => {
    let box
    if (!$el.offsetHeight && !$el.offsetWidth) {
      let $sandbox = document.createElement('div')
      Object.assign($sandbox.style, { width: '0', height: '0', overflow: 'hidden' })
      $el = $el.cloneNode(true)
      $sandbox.append($el)
      $el.style.display = 'block'
      document.body.append($sandbox)
      box = $el.getBoundingClientRect()
      document.body.removeChild($sandbox)
    }
    else {
      box = $el.getBoundingClientRect()
    }
    return box
  }

  let relPos = ($ref, $tgt, gap) => {
    let vw = window.innerWidth
    let vh = window.innerHeight

    let tgtDim = getElmBox($tgt)
    let refBox = $ref.getBoundingClientRect()

    // Ref box characteristics
    let isWide = refBox.width > refBox.height * MIN_ASPECT_FOR_WIDE

    // Spatial relationship
    let overhangsRight = refBox.left + tgtDim.width + gap < vw
    let overhangsLeft = refBox.right - tgtDim.width - gap > 0
    let clearsRight = refBox.right + tgtDim.width + gap < vw
    let clearsLeft = refBox.left - tgtDim.width - gap > 0
    let overhangsBottom = refBox.top + tgtDim.height < vh
    let overhangsTop = refBox.bottom - tgtDim.height > 0
    let clearsBottom = refBox.bottom + tgtDim.height + gap < vh
    let clearsTop = refBox.top - tgtDim.height - gap > 0

    // Relative position CSS rules
    let heightWithGap = tgtDim.height + gap
    let widthWithGap = tgtDim.width + gap
    let above = { bottom: `min(calc(100vh - ${heightWithGap}px), calc(100vh - ${refBox.top - gap}px))` }
    let below = { top: `min(calc(100vh - ${heightWithGap}px), ${refBox.bottom + gap}px)` }
    let left = { right: `min(calc(100vw - ${widthWithGap}px), calc(100vw - ${refBox.left - gap}px))` }
    let right = { left: `min(calc(100vw - ${widthWithGap}px), ${refBox.right + gap}px)` }
    let leftAlign = { left: `min(calc(100vw - ${widthWithGap}px), ${refBox.left}px)` }
    let rightAlign = { right: `min(calc(100vw - ${widthWithGap}px), calc(100vw - ${refBox.right}px))` }
    let topAlign = { top: `min(calc(100vh - ${heightWithGap}px), ${refBox.top}px)` }
    let bottomAlign = { bottom: `min(calc(100vh - ${heightWithGap}px), calc(100vh - ${refBox.bottom}px))` }
    let hCenter = { left: `${refBox.left + (refBox.width / 2) - (tgtDim.width / 2)}px` }
    let vCenter = { top: `${refBox.top + (refBox.height / 2) - (tgtDim.height / 2)}px` }

    return {
      isWide,
      overhangsRight,
      overhangsLeft,
      clearsRight,
      clearsLeft,
      overhangsBottom,
      overhangsTop,
      clearsTop,
      clearsBottom,
      above,
      below,
      left,
      right,
      leftAlign,
      rightAlign,
      hCenter,
      topAlign,
      bottomAlign,
      vCenter,
    }
  }

  let position = (direction, alignment, posData) => ({
    top: 'auto',
    bottom: 'auto',
    left: 'auto',
    right: 'auto',
    ...posData[direction],
    ...posData[alignment],
  })

  CM.position = {
    DIR_ABOVE,
    DIR_BELOW,
    DIR_LEFT,
    DIR_RIGHT,
    ALIGN_LEFT,
    ALIGN_RIGHT,
    ALIGN_HCENTER,
    ALIGN_TOP,
    ALIGN_BOTTOM,
    ALIGN_VCENTER,
    getElmBox,
    relPos,
    position,
  }
})(window.__CM = window.__CM || {});

(CM => {
  'use strict'

  let propsCache
  let $testElement = document.createElement('div') // element used for testing style values
  let testStyle = window.getComputedStyle($testElement)

  $testElement.hidden = true
  document.body.append($testElement)

  let isLoaded = $link => {
    for (let i = 0, s; s = document.styleSheets[i++];) if (s.href === $link.href && s.cssRules.length) return true
    return false
  }

  let cssReady = (() => {
    let $$links = document.head.querySelectorAll('link[rel="stylesheet"]')
    let loadEvents = []
    for (let i = 0, $link; $link = $$links[i++];) loadEvents.push(new Promise((resolve, reject) => {
      if (isLoaded($link)) resolve()
      $link.addEventListener('load', resolve)
      $link.addEventListener('error', reject)
    }))
    return Promise.all(loadEvents)
  })()

  let getPropsCache = () => {
    if (propsCache) return propsCache
    let cache = {}
    Array.from(document.styleSheets)
      .forEach(ss => Array.from(ss.cssRules)
        .forEach(rule => {
          if (rule.selectorText !== ':root') return
          Array.from(rule.style).forEach(property => {
            if (property.startsWith('--')) {
              cache[property] = rule.style.getPropertyValue(property)
            }
          })
        }))
    return propsCache = cache
  }

  let getCSSProp = propName => getPropsCache()['--' + propName]

  let getCompLength = (cssVal, baseFontSize = '1rem') => {
    $testElement.style.fontSize = baseFontSize
    $testElement.style.width = cssVal
    return parseFloat(testStyle.width)
  }

  let getCompDuration = cssVal => {
    $testElement.style.transitionDuration = cssVal
    return parseFloat(testStyle.transitionDuration) * 1000
  }

  let computedStyleCache = new WeakMap()
  let getCompStyl = $target => {
    if (!computedStyleCache.has($target)) {
      computedStyleCache.set($target, window.getComputedStyle($target))
    }
    return computedStyleCache.get($target)
  }

  let getEmOrRemSize = (x, $target) => getCompLength(x, getCompStyl($target).fontSize)

  CM.properties = {
    cssReady,
    getCSSProp,
    getCompStyl,
    getCompLength,
    getCompDuration,
    getEmOrRemSize,
  }
})(window.__CM = window.__CM || {});

(CM => {
  let debounce = (t, cb) => {
    let timer

    return (...args) => {
      clearTimeout(timer)
      timer = setTimeout(cb, t, ...args)
    }
  }

  let throttle = (t, cb) => {
    let lastCall = 0

    return (...args) => {
      let now = Date.now()
      if (now - lastCall > t) {
        lastCall = now
        cb(...args)
      }
    }
  }

  let fpsThrottle = cb => {
    let busy = false
    return (...args) => {
      if (busy) return
      busy = requestAnimationFrame(() => {
        cb(...args)
        busy = false
      })
    }
  }

  CM.rateLimit = {
    debounce,
    throttle,
    fpsThrottle,
  }
})(window.__CM = window.__CM || {});

(CM => {
  let { BaseElement, aliasStringAttr } = CM.customElements

  class IconBase extends BaseElement {
    constructor() {
      super()

      aliasStringAttr(this, 'name')
      aliasStringAttr(this, 'alt')
      this.getIcons()
    }

    static get observedAttributes() { return ['name', 'alt'] }

    attributeChangedCallback(name) {
      if (name === 'name') this.updateIcon()
      if (name === 'alt') this.updateTitle()
    }

    connectedCallback() {
      this.alt = this.textContent.trim()
      this.onstop.push(
        () => this.innerHTML = '',
        () => this.textContent = this.alt
      )
    }

    getIcons() {}

    updateIcon() {
      this.querySelector('use')?.setAttribute('href', '#' + this.prefix + this.name)
    }

    updateTitle() {
      let $icon = this.querySelector('use')
      let $title = this.querySelector('title')
      if (!$icon) return
      if (this.alt) {
        if (!$title) $icon.parentNode.prepend($title = document.createElement('title'))
        $title.textContent = this.alt
      } else {
        $title?.remove()
      }
    }
  }

  CM.iconBase = {
    IconBase,
  }
})(window.__CM = window.__CM || {});

(CM => {
  'use strict'

  let { BaseElement } = CM.customElements

  customElements.define('cm-inline-svg', class extends BaseElement {
    connectedCallback() {
      let $img = this.firstElementChild
      if (!$img) return

      fetch($img.src)
        .then(res => res.text())
        .then(svg => {
          let $svg = Object.assign(document.createElement('template'), {
            innerHTML: svg.replace(/fill="[^"]+"/g, 'fill="currentColor"'),
          }).content
          $svg.insertBefore(Object.assign(document.createElement('title'), { textContent: $img.alt }), $svg.firstChild)
          this.replaceChild($svg, $img)
        })
    }
  })
})(window.__CM ??= {});

(CM => {
  'use strict'

  let { BaseElement } = CM.customElements

  customElements.define('cm-switch-checkbox', class extends BaseElement {
    connectedCallback() {
      let $icons
      this.append($icons = Object.assign(document.createElement('span'), {
        className: 'Switch-icons',
        innerHTML: `
          <cm-icon class="Switch-icon-on" name="check-square"></cm-icon>
          <cm-icon class="Switch-icon-off" name="square"></cm-icon>
          <cm-icon class="Switch-icon-partial" name="minus-square"></cm-icon>
        `
      }))

      this.onstop.push(() => $icons.remove())
    }
  })

  customElements.define('cm-switch-toggle', class extends BaseElement {
    connectedCallback() {
      let $icons
      this.append($icons = Object.assign(document.createElement('span'), {
        className: 'Switch-icons',
        innerHTML: `
          <cm-color-icon class="Switch-icon-on" name="toggle-left"></cm-color-icon>
          <cm-color-icon class="Switch-icon-off" name="toggle-right"></cm-color-icon>
        `
      }))

      this.onstop.push(() => $icons.remove())
    }
  })

  customElements.define('cm-switch-radio', class extends BaseElement {
    connectedCallback() {
      let $icons
      this.append($icons = Object.assign(document.createElement('span'), {
        className: 'Switch-icons',
        innerHTML: `
          <cm-icon class="Switch-icon-on" name="circle-radio"></cm-icon>
          <cm-icon class="Switch-icon-off Switch-icon-partial" name="circle"></cm-icon>
        `
      }))

      this.onstop.push(() => $icons.remove())
    }
  })
})(window.__CM ??= {});

(CM => {
  'use strict'

  let { BaseElement, aliasStringAttr } = CM.customElements

  customElements.define('cm-toggler', class extends BaseElement {
    constructor() {
      super()

      aliasStringAttr(this, 'for', 'htmlFor')
    }

    connectedCallback() {
      this.addEventListenerWhileConnected('click', () => {
        let $target
        // `setTimeout()` causes the toggling to wait until the event has
        // bubbled up to document.body and handled by elements that listen to
        // 'outside' events, so they don't self-close immediately.
        if ($target = document.getElementById(this.htmlFor)) setTimeout(() => $target.toggleAttribute('open'))
      })
    }
  })
})(window.__CM ??= {});

(CM => {
  let onOutsideEvent = (eventType, $el, cb) => {
    let listener = ev => {
      if ($el.contains(ev.target)) return
      return cb(ev)
    }
    document.body.addEventListener(eventType, listener, false)
    return () => document.body.removeEventListener(eventType, listener, false)
  }
  let onClickOutside = onOutsideEvent.bind(null, 'click')

  let onGlobalEvent = (eventType, cb, options) => {
    window.addEventListener(eventType, cb, options)
    return () => window.removeEventListener(eventType, cb, options)
  }
  let onLayoutChange = cb => {
    cb = CM.rateLimit.fpsThrottle(cb)
    let stopHooks = [
      onGlobalEvent('resize', cb, { passive: true }),
      onGlobalEvent('orientationchange', cb, { passive: true }),
      onGlobalEvent('scroll', cb, { passive: true })
    ]
    return () => stopHooks.forEach(fn => fn())
  }

  CM.events = {
    onOutsideEvent,
    onClickOutside,
    onGlobalEvent,
    onLayoutChange,
  }
})(window.__CM = window.__CM || {});

(CM => {
  'use strict'

  let { BaseElement, aliasBooleanAttr, dispatchEvent } = CM.customElements
  let { onGlobalEvent } = CM.events

  customElements.define('cm-modal', class extends BaseElement {
    constructor() {
      super()
      aliasBooleanAttr(this, 'open')
    }

    static get observedAttributes() { return ['open'] }

    attributeChangedCallback() {
      this.toggleHide?.()
    }

    connectedCallback() {
      let hide = () => {
        let $modal = this.firstElementChild
        if (!$modal) return
        $modal.classList.remove('Modal-open')
        $modal.addEventListener('transitionend', () => {
          $modal.hidden = true
          dispatchEvent(this, 'close')
        }, { once: true })
      }
      let reveal = () => {
        let $modal = this.firstElementChild
        if (!$modal) return
        $modal.hidden = false
        requestAnimationFrame(() => requestAnimationFrame(() => { // NB: double-RAF to wait for hidden to fully toggle
          $modal.classList.add('Modal-open')
        }))
      }
      this.toggleHide = () => {
        if (!this.open) hide()
        else reveal()
      }

      this.addEventListenerWhileConnected('click', ev => {
        if (ev.target.closest('.Modal-close, .Modal-click-trap') && this.open) this.open = false
      })
      this.onstop.push(
        onGlobalEvent('keydown', ev => {
          if (ev.code !== 'Escape' || !this.open) return
          this.open = false
        }),
        () => this.open = false
      )
      if (this.firstElementChild) {
        let $modal = this.firstElementChild
        $modal.hidden = !this.open
        $modal.classList.toggle('Modal-open', this.open)
      }
    }
  })
})(window.__CM ??= {});

(CM => {
  'use strict'

  let { BaseElement } = CM.customElements
  let { getCSSProp, getCompDuration, cssReady } = CM.properties

  cssReady.then(() => {
    let animationFast = getCompDuration(getCSSProp('style-animation-speed-fast'))

    customElements.define('cm-accordion', class extends BaseElement {
      connectedCallback() {
        let $details = this.querySelector(':scope > .Accordion')
        let $summary = $details.querySelector(':scope > summary')
        let $content = $details.querySelector(':scope > :last-child')

        let toggleAccordion = ev => {
          ev.preventDefault()

          if ($details.open) {
            let doFlip = CM.animation.startFLIP($details, {
              duration: animationFast,
              properties: { height: true, overflow: true },
            })
            $content.classList.add('Accordion-content-collapsed')
            doFlip().then(() => {
              $details.open = false
              $details.dispatchEvent(new Event('toggle', { bubbles: true }))
            })
          }
          else {
            $content.classList.add('Accordion-content-collapsed')
            $details.open = true
            $details.dispatchEvent(new Event('toggle', { bubbles: true }))
            let doFlip = CM.animation.startFLIP($details, {
              duration: animationFast,
              properties: { height: true, overflow: true },
            })
            $content.classList.remove('Accordion-content-collapsed')
            doFlip()
          }
        } // toggleAccordion

        $summary.addEventListener('click', toggleAccordion)
        this.onstop.push(() => $summary.removeEventListener('click', toggleAccordion))
      }
    })

    customElements.define('cm-accordion-group', class extends BaseElement {
      connectedCallback() {
        let toggleAccordion = ev => {
          let $$openAccordions = this.querySelectorAll('cm-accordion details[open]')
          $$openAccordions.forEach($ => {
            if ($ === ev.target) return
            $.open = false
          })
        }
        let toggleOnNonAccordionClick = ev => {
          // Handle cases where accordions are mixed with non-accordion content (e.g., nav-list)
          if (ev.target.closest('cm-accordion')) return
          toggleAccordion(ev)
        }

        this.addEventListener('toggle', toggleAccordion)
        this.addEventListener('click', toggleOnNonAccordionClick)

        this.onstop.push(
          () => this.removeEventListener('toggle', toggleAccordion),
          () => this.removeEventListener('click', toggleOnNonAccordionClick),
        )
      }
    })
  })
})(window.__CM = window.__CM || {});

(CM => {
  'use strict'

  let { IconBase } = CM.iconBase

  const NO_BG_SUFFIX = '-nobg'
  const PREFIX = 'cm-icon-coin-'

  let iconIds
  let nameIndex

  let getIcons = () => iconIds || (
    iconIds = fetch('https://cdn.coinmetrics.io/crypto-icons-v2.svg')
      .then(res => res.text())
      .then(svg => {
        let $d = document.createElement('div')
        $d.className = 'Coin-sprite-hider'
        $d.innerHTML = svg
        document.body.append($d)
        nameIndex = new Set(Array.from(svg.matchAll(/<symbol .*?id="([^"]+)"/g)).map(x => x[1].replace(PREFIX, '')))
      })
      .catch(() => {})
  )

  customElements.define('cm-coin', class extends IconBase {
    get prefix() { return 'cm-icon-coin-' }

    getIcons() { getIcons() }

    get iconId() {
      let name = this.name.toLowerCase()
      if (!nameIndex) return name
      if (nameIndex.has(name)) return name
      if (name.startsWith('cmbi')) {
        if (name.endsWith(NO_BG_SUFFIX)) return 'cm' + NO_BG_SUFFIX
        return 'cm'
      }
      return 'generic'
    }

    updateIcon() {
      this.querySelector('use')?.setAttribute('href', '#' + this.prefix + this.iconId)
    }

    connectedCallback() {
      super.connectedCallback()
      this.innerHTML = `
        <svg class="Coin-svg" viewBox="0 0 32 32" tabindex="-1">
          ${this.alt && `<title>${this.alt}</title>`}
          <use href="#${this.prefix}${this.name}" tabindex="-1"></use>
        </svg>
      `
      getIcons().then(() => this.updateIcon())
    }
  })
})(window.__CM ??= {});

(CM => {
  'use strict'

  let { IconBase } = CM.iconBase

  let iconCache
  let getIcons = () => iconCache || (
    iconCache = fetch('https://cdn.coinmetrics.io/cm-color-icons-v2.svg')
      .then(res => res.text())
      .then(svg => {
        let $d = document.createElement('div')
        $d.className = 'Icon-sprite-hider'
        $d.innerHTML = svg
        document.body.append($d)
        return true
      })
      .catch(() => '')
  )

  customElements.define('cm-color-icon', class extends IconBase {
    get prefix() { return 'cm-icon-color-' }

    getIcons() { getIcons() }

    connectedCallback() {
      super.connectedCallback()
      this.innerHTML = `
        <svg class="Color-icon-svg" viewBox="0 0 24 24" tabindex="-1">
          ${this.alt && `<title>${this.alt}</title>`}
          <use href="#${this.prefix}${this.name}" tabindex="-1"></use>
        </svg>
      `
    }
  })
})(window.__CM ??= {});

(CM => {
  'use strict'

  let { BaseElement } = CM.customElements
  let { cssReady, getCSSProp } = CM.properties

  cssReady.then(() => {
    let gap = getCSSProp('style-gap-xs')

    customElements.define('cm-dropdown', class extends BaseElement {
      connectedCallback() {
        let $details = this.querySelector('.Dropdown')
        let $dropdownList = $details.querySelector('fieldset')
        let $button = $details.querySelector('summary')
        let $label = $button.querySelector(':scope > :not(cm-icon)')
        let $current = $dropdownList.querySelector('input:checked')

        let defaultLabel = $label.innerHTML

        let updateLabel = () => {
          if ($current) $label.innerHTML = $current.dataset.label || $current.nextElementSibling.innerHTML
          else $label.innerHTML = defaultLabel
        }
        let updateLayout = () => {
          let pos = CM.position.relPos($button, $dropdownList, CM.properties.getEmOrRemSize(gap, $dropdownList))
          let direction = CM.position.DIR_BELOW
          let alignment = CM.position.ALIGN_LEFT
          if (!pos.clearsBottom) direction = CM.position.DIR_ABOVE
          if (!pos.overhangsRight) alignment = CM.position.ALIGN_RIGHT
          let p = CM.position.position(direction, alignment, pos)
          let s = $dropdownList.style
          s.setProperty('--dropdown-top', p.top)
          s.setProperty('--dropdown-left', p.left)
          s.setProperty('--dropdown-right', p.right)
          s.setProperty('--dropdown-bottom', p.bottom)
        }

        this.addEventListenerWhileConnected('keydown', ev => {
          switch (ev.code) {
            case 'ArrowDown': {
              ev.preventDefault()
              if (ev.getModifierState('Alt')) {
                $details.open = true
                return
              }
              let $next = $current
              while ($next = $next?.nextElementSibling || $dropdownList.querySelector('input')) {
                if ($next.tagName !== 'INPUT') continue
                $next.checked = true
                $next.dispatchEvent(new Event('change', { bubbles: true }))
                $next.focus()
                break
              }
              break
            }
            case 'ArrowUp': {
              ev.preventDefault()
              if (ev.getModifierState('Alt')) {
                $details.open = true
                return
              }
              let $prev = $current
              while ($prev = $prev?.previousElementSibling || $dropdownList.querySelector('input:last-of-type')) {
                if ($prev.tagName !== 'INPUT') continue
                $prev.checked = true
                $prev.dispatchEvent(new Event('change', { bubbles: true }))
                $prev.focus()
                break
              }
              break
            }
            case 'Enter':
              ev.preventDefault()
              $details.open = !$details.open
              if ($details.open) updateLayout()
              break
            case 'Escape':
              ev.preventDefault()
              $details.open = false
              break
          }
        }) // keydown
        this.addEventListenerWhileConnected('change', ev => {
          $current = ev.target
          updateLabel()
          updateLayout()
        })
        this.addEventListenerToElementWhileConnected($dropdownList, 'click', ev => {
          // NB: since radios can only get checked while the details are opened in Firefox, we need to delay closing it
          if (ev.target.closest('label')) requestAnimationFrame(() => $details.open = false)
        })
        this.addEventListenerToElementWhileConnected($details, 'toggle', () => {
          if ($details.open) {
            // NB: Firefox will not allow an item to be checked in a closed dropdown, so we check it when dropdown opens
            if ($current) $current.checked = true
            updateLayout()
          } else $button.focus()
        })
        this.onstop.push(
          CM.events.onLayoutChange(() => {
            if ($details.open) updateLayout()
          }),
          CM.events.onClickOutside(this, () => {
            $details.open = false
          }),
        )
        updateLabel()
        updateLayout()
      } // connectedCallback
    })
  })
})(window.__CM ??= {});

(CM => {
  'use strict'

  let { IconBase } = CM.iconBase

  let iconCache
  let getIcons = () => iconCache || (
    iconCache = fetch('https://cdn.coinmetrics.io/cm-icons-v2.svg')
      .then(res => res.text())
      .then(svg => {
        let $d = document.createElement('div')
        $d.className = 'Icon-sprite-hider'
        $d.innerHTML = svg
        document.body.append($d)
        return true
      })
      .catch(() => {})
  )

  customElements.define('cm-icon', class extends IconBase {
    get prefix() { return 'cm-icon-' }

    getIcons() { getIcons() }

    connectedCallback() {
      super.connectedCallback()
      this.innerHTML = `
        <svg class="Icon-svg" viewBox="0 0 24 24" tabindex="-1">
          ${this.alt && `<title>${this.alt}</title>`}
          <use href="#${this.prefix}${this.name}" tabindex="-1"></use>
        </svg>
      `
    }
  })
})(window.__CM ??= {});

(CM => {
  'use strict'

  let { BaseElement, aliasStringAttr, dispatchEvent } = CM.customElements

  customElements.define('cm-nav-list', class extends BaseElement {
    constructor() {
      super()

      aliasStringAttr(this, 'value')
    }

    static get observedAttributes() { return ['value'] }

    attributeChangedCallback() {
      this.querySelector('.NavList-selected')?.classList.remove('NavList-selected')
      let $tgt, $l2
      if ($tgt = this.querySelector(`[data-value="${this.value}"],[href="${this.value}"]`)) {
        $tgt.closest('li').classList.add('NavList-selected')
        if ($l2 = $tgt.closest('details:not([open])')) $l2.open = true
      }
    }

    connectedCallback() {
      this.addEventListenerWhileConnected('click', ev => {
        let $tgt = ev.target.closest('a, button')
        if ($tgt.tagName === 'A') ev.preventDefault()

        this.querySelector('.NavList-selected')?.classList.remove('NavList-selected')
        $tgt.closest('li').classList.add('NavList-selected')
        this.value = $tgt.dataset.value || $tgt.getAttribute('href')
        dispatchEvent(this, 'change')
      })
    }
  })
})(window.__CM ??= {});

(CM => {
  'use strict'

  let { BaseElement, aliasNumericAttr, dispatchEvent } = CM.customElements

  customElements.define('cm-paginator', class extends BaseElement {
    constructor() {
      super()

      aliasNumericAttr(this, 'total')
      aliasNumericAttr(this, 'current')
    }

    static get observedAttributes() { return ['total', 'current'] }

    attributeChangedCallback() {
      this.updatePaginator?.()
    }

    connectedCallback() {
      let $start
        , $prev
        , $first
        , $morePrev
        , $$pages
        , $$pagesMobile
        , $moreNext
        , $last
        , $next
        , $end

      let updatePages = ($$pageSet, min, max) => {
        let { total, current } = this
        $$pageSet.forEach(($, i) => {
          let pageNo = min + i
          $.hidden = pageNo > max
          $.dataset.target = $.textContent = pageNo
          $.title = 'page ' + pageNo + (pageNo === total ? ' (last page)' : '')
          $.disabled = pageNo === current
        })
      }
      let updatePaginator = this.updatePaginator = () => {
        let { total, current } = this
          , pageMin
          , pageMax

        { // Update non-mobile pages
          let pageCount = $$pages.length
            , pagesOnSide = (pageCount - 1) / 2

          pageMin = Math.max(1, Math.min(total - pageCount, current - pagesOnSide))
          pageMax = Math.min(total, pageMin + pagesOnSide * 2)
          updatePages($$pages, pageMin, pageMax)
        }

        { // Update mobile pages
          let pageMobileCount = $$pagesMobile.length
            , pageMobileOnSide = (pageMobileCount - 1) / 2
            , pageMobileMin = Math.max(1, Math.min(total - (pageMobileOnSide * 2), current - pageMobileOnSide))
            , pageMobileMax = Math.min(total, pageMobileMin + pageMobileOnSide * 2)
          updatePages($$pagesMobile, pageMobileMin, pageMobileMax)
        }

        let isFirst = current === 1
          , isLast = current === total
          , showExtraButtons = total > 3

        $start.disabled = isFirst
        $end.disabled = isLast
        $prev.disabled = isFirst
        $prev.dataset.target = current - 1
        $next.disabled = isLast
        $next.dataset.target = current + 1

        let showFirst = pageMin > 1
          , hasLeftGap = pageMin > 2
        $first.hidden = !showFirst || !showExtraButtons
        $morePrev.hidden = !hasLeftGap || !showExtraButtons

        let showLast = pageMax !== total
          , hasRightGap = pageMax < total - 1
        $last.hidden = !showLast || !showExtraButtons
        $last.dataset.target = $end.dataset.target = $last.textContent = total
        $last.disabled = isLast
        $last.title = 'page ' + total + ' (last page)'
        $moreNext.hidden = !hasRightGap || !showExtraButtons
      } // updatePaginator

      let onPage = pageNo => {
        this.current = pageNo
        dispatchEvent(this, 'change')
      }

      this.innerHTML = `
        <button class="Button Paginator-start" data-target="1"><cm-icon name="chevrons-left">first page</cm-icon></button>
        <button class="Button Paginator-prev"><cm-icon name="chevron-left">previous page</cm-icon></button>
        <button class="Button Paginator-first" data-target="1" title="page 1">1</button>
        <cm-icon class="Paginator-more-prev" name="more-horizontal"></cm-icon>
        <button class="Button Paginator-page"></button>
        <button class="Button Paginator-page"></button>
        <button class="Button Paginator-page"></button>
        <button class="Button Paginator-page"></button>
        <button class="Button Paginator-page"></button>
        <button class="Button Paginator-page-m"></button>
        <button class="Button Paginator-page-m"></button>
        <button class="Button Paginator-page-m"></button>
        <cm-icon class="Paginator-more-next" name="more-horizontal"></cm-icon>
        <button class="Button Paginator-last"></button>
        <button class="Button Paginator-next"><cm-icon name="chevron-right">next page</cm-icon></button>
        <button class="Button Paginator-end"><cm-icon name="chevrons-right">last page</cm-icon></button>
      ` // this.innerHTML

      $start = this.querySelector('.Paginator-start')
      $prev = this.querySelector('.Paginator-prev')
      $first = this.querySelector('.Paginator-first')
      $morePrev = this.querySelector('.Paginator-more-prev')
      $$pages = this.querySelectorAll('.Paginator-page')
      $$pagesMobile = this.querySelectorAll('.Paginator-page-m')
      $moreNext = this.querySelector('.Paginator-more-next')
      $last = this.querySelector('.Paginator-last')
      $next = this.querySelector('.Paginator-next')
      $end = this.querySelector('.Paginator-end')
      updatePaginator()

      this.addEventListenerWhileConnected('click', ev => {
        let $target = ev.target.closest('button[data-target]:not([disabled])')
        if (!$target) return
        onPage($target.dataset.target)
      })
      this.onstop.push(
        () => delete this.updatePaginator,
        () => this.innerHTML = ''
      )
    } // connectedCallback
  }) // cm-paginator
})(window.__CM ??= {});

(CM => {
  'use strict'

  let { position } = CM
  let { BaseElement } = CM.customElements
  let { getEmOrRemSize, getCompStyl, cssReady } = CM.properties

  cssReady.then(() => {
    customElements.define('cm-popup', class extends BaseElement {
      connectedCallback() {
        let $details = this.firstElementChild

        if (!$details) throw Error('<cm-popup> must not be empty')

        let $dialog = $details.lastElementChild
        let $button = $details.firstElementChild
        let $icon = $button.querySelector(':scope > cm-icon') || { name: '', alt: '' }
        let defaultIcon = $icon.name
        let defaultAlt = $icon.alt

        let updateIcon = () => {
          if ($details.open) {
            if (!defaultIcon) defaultIcon = $icon.name
            if (!defaultAlt) defaultAlt = $icon.alt
            $icon.name = 'x'
            $icon.alt = 'Close the popup'
          }
          else {
            $icon.name = defaultIcon
            $icon.alt = defaultAlt
          }
        }
        let updateOrientation = () => {
          let gap = getEmOrRemSize(getCompStyl(this).getPropertyValue('--style-popup-gap'), $button)
          let pos = position.relPos($button, $dialog, gap)
          let direction
          let alignment
          if (pos.isWide) {
            direction = position.DIR_BELOW
            alignment = position.ALIGN_LEFT
            if (!pos.clearsBottom) direction = position.DIR_ABOVE
            if (!pos.overhangsRight) alignment = position.ALIGN_RIGHT
          }
          else {
            direction = position.DIR_RIGHT
            alignment = position.ALIGN_TOP
            if (!pos.clearsRight) direction = position.DIR_LEFT
            if (!pos.overhangsBottom) alignment = position.ALIGN_BOTTOM
          }
          let p = position.position(direction, alignment, pos)
          let s = $dialog.style
          s.setProperty('--popup-dialog-top', p.top)
          s.setProperty('--popup-dialog-left', p.left)
          s.setProperty('--popup-dialog-right', p.right)
          s.setProperty('--popup-dialog-bottom', p.bottom)
        } // updateOrientation

        let onDetailsToggle = () => {
          updateIcon()
          if ($details.open) updateOrientation()
        }
        $details.addEventListener('toggle', onDetailsToggle)

        this.onstop.push(
          () => $details.removeEventListener('toggle', onDetailsToggle),
          CM.events.onClickOutside(this, ev => {
            if ($dialog.contains(ev.target)) return
            $details.open = false
          }),
          CM.events.onLayoutChange(() => {
            if ($details.open) updateOrientation()
          }),
        )

        updateOrientation()
        updateIcon()
      } // connectedCallback
    })
  })
})(window.__CM = window.__CM || {});

(CM => {
  'use strict'

  let { BaseElement, aliasNumericAttr, aliasBooleanAttr, dispatchEvent } = CM.customElements

  customElements.define('cm-range-slider', class extends BaseElement {
    constructor() {
      super()

      aliasNumericAttr(this, 'min', undefined, 0)
      aliasNumericAttr(this, 'max', undefined, 100)
      aliasNumericAttr(this, 'x1', undefined, () => this.min)
      aliasNumericAttr(this, 'x2', undefined, () => this.max)
      aliasNumericAttr(this, 'step', undefined, 1)
      aliasBooleanAttr(this, 'disabled')
    }

    connectedCallback() {
      this.innerHTML = `
        <div class="RangeSlider">
          <div class="RangeSlider-slider" tabindex="0">
            <div class="RangeSlider-handle-l" tabindex="0"></div>
            <div class="RangeSlider-handle-r" tabindex="0"></div>
          </div>
        </div>
      `

      let $track = this.querySelector('.RangeSlider')
      let $slider = $track.querySelector('.RangeSlider-slider')
      let $handleL = $track.querySelector('.RangeSlider-handle-l')
      let $handleR = $track.querySelector('.RangeSlider-handle-r')

      let dragging = false
      let dragStartCursorX = 0
      let dragStartRange = null
      let dragPxToValueFactor = 1

      let capToRange = n => Math.min(this.max, Math.max(this.min, n))
      let alignToStep = n => Math.round(n / this.step) * this.step
      let toCSSPctPosition = n => (n - this.min) / (this.max - this.min) * 100
      let updateSliderPosition = this.updateSliderPosition = () => {
        $track.style.setProperty('--slider-left', toCSSPctPosition(this.x1) + '%')
        $track.style.setProperty('--slider-right', 100 - toCSSPctPosition(this.x2) + '%')
      }
      let updateDisabledState = this.updateDisabledState = () => {
        $slider.setAttribute('tabindex', this.disabled ? '-1' : '0')
        $handleL.setAttribute('tabindex', this.disabled ? '-1' : '0')
        $handleR.setAttribute('tabindex', this.disabled ? '-1' : '0')
      }
      let getDragPxToValueFactor = () => (this.max - this.min) / $track.getBoundingClientRect().width // unit/pixel

      let updateLeft = ev => {
        let [startX1, startX2] = dragStartRange
        let deltaVal = (ev.screenX - dragStartCursorX) * dragPxToValueFactor
        let nextX1 = alignToStep(capToRange(startX1 + deltaVal))
        if (nextX1 > startX2) { // Swap left/right?
          this.x2 = nextX1
          this.x1 = startX2
        }
        else this.x1 = nextX1
        dispatchEvent(this, 'change')
      }
      let updateRight = ev => {
        let [startX1, startX2] = dragStartRange
        let deltaVal = (ev.screenX - dragStartCursorX) * dragPxToValueFactor
        let nextX2 = alignToStep(capToRange(startX2 + deltaVal))
        if (nextX2 < startX1) { // Swap left/right?
          this.x1 = nextX2
          this.x2 = startX1
        }
        else this.x2 = nextX2
        dispatchEvent(this, 'change')
      }
      let updateBoth = ev => {
        let [startX1, startX2] = dragStartRange
        let deltaVal = (ev.screenX - dragStartCursorX) * dragPxToValueFactor
        let x1 = alignToStep(startX1 + deltaVal)
        let x2 = alignToStep(startX2 + deltaVal)
        if (x1 < this.min) {
          x1 = this.min
          x2 = x1 + alignToStep(startX2 - startX1)
        }
        else if (x2 > this.max) {
          x2 = this.max
          x1 = x2 - alignToStep(startX2 - startX1)
        }
        Object.assign(this, { x1, x2 })
        dispatchEvent(this, 'change')
      }
      let startDrag = updatePosition => ev => {
        if (dragging) return

        ev.preventDefault()
        ev.stopImmediatePropagation()

        dragging = true
        dragPxToValueFactor = getDragPxToValueFactor()
        dragStartCursorX = ev.screenX
        dragStartRange = [this.x1, this.x2]

        let cb = CM.rateLimit.fpsThrottle(updatePosition)
        window.addEventListener('pointermove', cb, false)
        let finishDrag = () => {
          dragging = false
          window.removeEventListener('pointermove', cb, false)
        }
        let endEvtOpts = { capture: false, once: true }
        window.addEventListener('pointerup', finishDrag, endEvtOpts)
        window.addEventListener('pointercancel', finishDrag, endEvtOpts)
      } // startDrag
      let jumpToPosition = ev => {
        let $pointerTarget = document.elementFromPoint(ev.clientX, ev.clientY)
        if ([$handleL, $handleR, $slider].includes($pointerTarget)) return

        // FIXME: This logic is not good. StR: click right outside right handle on date range demo
        let clickX = ev.clientX

        let handleLeftBox = $handleL.getBoundingClientRect()
        let handleLeftPos = handleLeftBox.x + handleLeftBox.width / 2
        let distToHandleL = Math.abs(handleLeftPos - clickX)

        let handleRightBox = $handleR.getBoundingClientRect()
        let handleRightPos = handleRightBox.x + handleRightBox.width / 2
        let distToHandleR = Math.abs(handleRightPos - clickX)

        let clickPosInTrack = clickX - $track.getBoundingClientRect().left
        let val = alignToStep(capToRange(this.min + getDragPxToValueFactor() * clickPosInTrack))
        if (distToHandleL < distToHandleR) this.x1 = val
        else this.x2 = val
      } // jumpToPosition
      let decLeftByStep = step => this.x1 = Math.max(this.min, this.x1 - step)
      let incLeftByStep = step => this.x1 = Math.min(this.max, Math.min(this.x2, this.x1 + step))
      let setLeft = n => this.x1 = n
      let decRightByStep = step => this.x2 = Math.min(this.max, Math.max(this.x1, this.x2 - step))
      let incRightByStep = step => this.x2 = Math.min(this.max, this.x2 + step)
      let setRight = n => this.x2 = n
      let decBothByStep = step => {
        let range = this.x2 - this.x1
        decLeftByStep(step)
        this.x2 = this.x1 + range
      }
      let incBothByStep = step => {
        let range = this.x2 - this.x1
        incRightByStep(step)
        this.x1 = this.x2 - range
      }
      let setBoth = n => {
        let { x1, x2 } = this
        if (n === x1 || n === x2) return
        let range = this.x2 - this.x1
        if (n < x1) {
          setLeft(n)
          this.x2 = this.x1 + range
        }
        if (n > x2) {
          setRight(n)
          this.x1 = this.x2 - range
        }
        // Other cases are probably some invalid state so we ignore
      }
      let onKey = (dec, inc, set) => ev => {
        ev.stopImmediatePropagation()
        switch (ev.code) {
          case 'ArrowDown':
          case 'ArrowLeft':
            dec(this.step)
            break
          case 'ArrowUp':
          case 'ArrowRight':
            inc(this.step)
            break
          case 'PageDown':
            dec(this.step * 10)
            break
          case 'PageUp':
            inc(this.step * 10)
            break
          case 'Home':
            set(this.min)
            break
          case 'End':
            set(this.max)
            break
          default:
            return // exit to prevent dispatch
        }
        dispatchEvent(this, 'change')
      } // onKey

      $handleL.addEventListener('pointerdown', startDrag(updateLeft), false)
      $handleL.addEventListener('keydown', onKey(decLeftByStep, incLeftByStep, setLeft), false)
      $handleR.addEventListener('pointerdown', startDrag(updateRight), false)
      $handleR.addEventListener('keydown', onKey(decRightByStep, incRightByStep, setRight), false)
      $slider.addEventListener('pointerdown', startDrag(updateBoth), false)
      $slider.addEventListener('keydown', onKey(decBothByStep, incBothByStep, setBoth), false)
      $track.addEventListener('pointerdown', jumpToPosition, false)
      updateSliderPosition()
      updateDisabledState()
      this.onstop.push(
        () => delete this.updateDisabledState,
        () => delete this.updateSliderPosition,
        () => this.innerHTML = ''
      )
    } // connectedCallback

    static get observedAttributes() { return ['x1', 'x2', 'max', 'min', 'disabled'] }

    attributeChangedCallback(name) {
      if (name === 'disabled') this.updateDisabledState?.()
      else this.updateSliderPosition?.()
    }
  }) // cm-range-selector
})(window.__CM ??= {});

(CM => {
  'use strict'

  let { BaseElement } = CM.customElements

  customElements.define('cm-scrollbox-relay', class extends BaseElement {
    connectedCallback() {
      this.addEventListenerToElementWhileConnected(
        this.firstElementChild,
        'scroll',
        () => window.dispatchEvent(new Event('scroll'))
      )
    }
  })
})(window.__CM ??= {});

(CM => {
  'use strict'

  let { BaseElement, aliasBooleanAttr, aliasStringAttr, dispatchEvent } = CM.customElements

  customElements.define('cm-sidebar', class extends BaseElement {
    constructor() {
      super()

      aliasBooleanAttr(this, 'open')
      aliasStringAttr(this, 'section')
    }

    static get observedAttributes() { return ['open', 'section'] }

    attributeChangedCallback(name) {
      if (name === 'open' && !this.open) this.resetActiveButtons?.()
      if (name !== 'section') return
      this.updateExtrasSection?.()
    }

    connectedCallback() {
      let $$sidebarToggles = this.querySelectorAll('.Sidebar-toggle-button')
      $$sidebarToggles.forEach($ => {
        // Store the default button icon and alt text
        let $icon = $.icon = $.querySelector('cm-icon')
        $.defaultAlt = $icon.alt
        $.defaultIcon = $icon.name
      })

      let unsetActiveButton = $btn => {
        $btn.icon.name = $btn.defaultIcon
        $btn.icon.alt = $btn.defaultAlt
        $btn.classList.remove('Sidebar-toggle-active')
      }
      let setActiveButton = $btn => {
        $btn.icon.alt = 'Close the sidebar'
        $btn.icon.name = 'chevrons-right'
        $btn.classList.add('Sidebar-toggle-active')
      }
      this.resetActiveButtons = () => {
        let $activeToggle = this.querySelector('.Sidebar-toggle-active')
        if (!$activeToggle) return
        unsetActiveButton($activeToggle)
      }
      let updateExtrasSection = this.updateExtrasSection = () => {
        let $$sidebarSections = this.querySelectorAll('.Sidebar-extras > *')
        if ($$sidebarSections.length <= 1) return
        for (let i = 0, $; $ = $$sidebarSections[i++];) $.hidden = $.id !== this.section
      }
      let switchSection = $btn => {
        this.section =  $btn.dataset.extrasSection || ''
      }
      let toggleOpen = $btn => {
        let $activeBtn = this.querySelector('.Sidebar-toggle-active')
        if ($btn === $activeBtn) { // Close the sidebar
          this.open = false
        } else { // Open the sidebar
          if ($activeBtn) unsetActiveButton($activeBtn)
          setActiveButton($btn)
          this.open = true
        }
      }

      this.onstop.push(
        () => delete this.resetActiveButtons,
        () => delete this.updateExtrasSection,
        CM.events.onClickOutside(this, () => this.removeAttribute('open')),
      )
      this.addEventListenerWhileConnected('click', ev => {
        let $btn = ev.target.closest('.Sidebar-toggle-button')
        if (!$btn) return
        switchSection($btn)
        toggleOpen($btn)
      })
      updateExtrasSection()
    } // connectedCallback
  }) // cm-sidebar
})(window.__CM = window.__CM || {});

(CM => {
  'use strict'

  let { BaseElement, aliasReadOnlyBoolean, aliasStringAttr } = CM.customElements

  let dummyCallback = () => {}

  customElements.define('cm-table', class extends BaseElement {
    constructor() {
      super()

      aliasReadOnlyBoolean(this, 'sticky-col', 'stickyCol')
    }

    connectedCallback() {
      let isIntersecting = false

      let $clearEl = document.querySelector(this.getAttribute('clear'))
      let $thead = this.querySelector('thead')
      let clearHeight = $clearEl ? $clearEl.getBoundingClientRect().height : 0
      if (!$thead) return

      let obs = new IntersectionObserver(entries => {
        isIntersecting = entries[0].isIntersecting
        updateSticky()
      }, { rootMargin: `-${clearHeight}px 0px 0px 0px`, threshold: [1] })

      let startAdjusting = () => {
        window.addEventListener('scroll', $thead.scrollListener = () => {
          let top = this.getBoundingClientRect().top - clearHeight
          if (top > 0) return stopAdjusting()
          // Make sure the table header stick to the top of the viewport. We
          // subtract another px from it because the dimensions we obtain from
          // the above calculation is imprecise, and we want to make sure that
          // no content shows behind the header.
          $thead.style.setProperty('--table-pos-adjust', (-top - 1) + 'px')
        }, { passive: true })
        obs.disconnect()
      }
      let stopAdjusting = () => {
        $thead.classList.remove('Table-sticky-header')
        window.removeEventListener('scroll', $thead.scrollListener, { passitve: true })
        $thead.scrollListener = null
        $thead.style.setProperty('--table-pos-adjust', 0)
        obs.observe($thead)
      }
      let updateSticky = () => {
        if (isIntersecting) stopAdjusting()
        else startAdjusting()
      }
      let updateColWidth = () => {
        this.style.setProperty('--table-width', this.getBoundingClientRect().width + 'px')
        this.style.setProperty('--table-first-col-width', this.querySelector('tr > :first-child').getBoundingClientRect().width + 'px')
      }

      stopAdjusting()
      updateColWidth()
      this.onstop.push(
        stopAdjusting,
        CM.events.onLayoutChange(updateColWidth),
      )
    }
  })

  customElements.define('cm-table-remote', class extends BaseElement {
    constructor() {
      super()

      aliasStringAttr(this, 'for', 'htmlFor')
      this.updateVisibility = dummyCallback
    }

    connectedCallback() {
      this.innerHTML = `
        <button class="Button" hidden>
          <cm-icon name="chevron-left">Go one column left</cm-icon>
        </button>
        <button class="Button" hidden>
          <cm-icon name="chevron-right">Go one column right</cm-icon>
        </button>
      `

      let $btnLeft = this.firstElementChild
      let $btnRight = this.lastElementChild

      let getTable = () => document.getElementById(this.htmlFor)
      let updateVisibility = this.updateVisibility = () => {
        let $table = getTable()
        $btnLeft.hidden = $btnRight.hidden = $table && ($table.offsetWidth >= $table.scrollWidth)
      }
      let updateScrollOffset = (getScrollDist) => {
        let $table = getTable()
        if (!$table) return

        let isSticky = $table.stickyCol
        let scrollOffset = $table.scrollLeft
        let scrollPadding = 0
        if (isSticky) {
          scrollPadding = $table.querySelector('tr > :first-child').offsetWidth
          scrollOffset -= scrollPadding
        }

        let $colAtScrollPos = $table.querySelector(isSticky
          ? 'tbody > tr > *:nth-child(2)'
          : 'tbody > tr > *:first-child')
        while (scrollOffset - scrollPadding >= 0) {
          scrollOffset -= $colAtScrollPos.offsetWidth
          $colAtScrollPos = $colAtScrollPos.nextElementSibling
        }

        $table.scrollTo({
          left: $table.scrollLeft + getScrollDist($colAtScrollPos),
          behavior: 'smooth',
        })
      } // updateScrollOffset

      $btnLeft.addEventListener('click', () => {
        updateScrollOffset($col => -$col.previousElementSibling.offsetWidth)
      })
      $btnRight.addEventListener('click', () => {
        updateScrollOffset($col => $col.offsetWidth)
      })
      updateVisibility()
      this.onstop.push(
        CM.events.onLayoutChange(updateVisibility),
        () => this.updateVisibility = dummyCallback,
        () => this.innerHTML = ''
      )
    }
  })
})(window.__CM ??= {});

(CM => {
  'use strict'

  let {BaseElement} = CM.customElements

  customElements.define('cm-tabs', class extends BaseElement {
    connectedCallback() {
      let $fieldset = this.firstElementChild
      let $$tabs = $fieldset.querySelectorAll(`input`)
      let $activeTab
      let $$tabContent = {}

      // Hide the tab content and prepare for switching
      for (let $tab of $$tabs) {
        let tabId = $tab.value
        let $content = document.getElementById(tabId)
        if (!$content) continue
        $$tabContent[tabId] = $content
        $content.hidden = !$tab.checked
        if ($tab.checked) $activeTab = $content
      }
      $fieldset.disabled = $fieldset.hidden = false

      let onChange = ev => {
        let $input = ev.target
        if ($activeTab) $activeTab.hidden = true
        $activeTab = $$tabContent[$input.value]
        if (!$activeTab) return // no content associated with tabs
        $activeTab.hidden = false
      }
      this.addEventListener('change', onChange)
      this.onstop.push(() => this.removeEventListener('change', onChange))
    } // connectedCallback
  })
})(window.__CM ??= {});

(CM => {
  'use strict'

  let { BaseElement } = CM.customElements

  let TOAST_DURATION = 5000
  let PRIORITY_CLASSES = {
    info: 'Toast-info',
    success: 'Toast-success',
    warning: 'Toast-warning',
    error: 'Toast-error',
  }
  let PRIORITY_ICONS = {
    info: 'info-circle',
    success: 'check-circle',
    warning: 'alert-triangle',
    error: 'x-circle',
  }
  let PRIORITY_BTN_CLASS = {
    info: 'Button-info',
    success: 'Button-success',
    warning: 'Button-warning',
    error: 'Button-error',
  }

  customElements.define('cm-toast-list', class extends BaseElement {
    PRIORITY = {
      info: 'info',
      success: 'success',
      warning: 'warning',
      error: 'error',
    }

    appendToast(content, options) {
      let { title = '', icon = '', actionCallback, actionLabel = '', priority = 'info' } = options || {}
      icon = icon || PRIORITY_ICONS[priority] || ''

      let $toast = document.createElement('cm-toast')
      $toast.innerHTML = `
        <article class="${PRIORITY_CLASSES[priority]}">
          ${icon && `<cm-icon name="${icon}"></cm-icon>`}
          ${title && `<h2 class="Toast-title">${title}</h2>`}
          ${(icon || title) && '<div class="Toast-separator"></div>'}
          <p class="Toast-content">${content}</p>
          ${actionLabel && `<button class="${PRIORITY_BTN_CLASS[priority]} Toast-action-button">${actionLabel}</button>`}
          <button class="${PRIORITY_BTN_CLASS[priority]} Toast-close-button">
            <cm-icon name="x">Dismiss this message</cm-icon>
          </button>
        </article>
      `

      let $btn = $toast.querySelector('.Toast-action-button')
      if ($btn) {
        if (!actionCallback) throw Error('actionCallback must be provided if actionLabel is specified')
        $btn.onclick = ev => actionCallback(ev, $toast)
      }

      this.append($toast)
    }

    info(content, options) {
      this.appendToast(content, { ...options, priority: this.PRIORITY.info })
    }

    success(content, options) {
      this.appendToast(content, { ...options, priority: this.PRIORITY.success })
    }

    warning(content, options) {
      this.appendToast(content, { ...options, priority: this.PRIORITY.warning })
    }

    error(content, options) {
      this.appendToast(content, { ...options, priority: this.PRIORITY.error })
    }
  })

  customElements.define('cm-toast', class extends BaseElement {
    clearToast() {
      this.ontransitionend = this.onanimationend = ()  => this.remove()
      this.classList.add('Toast-clear')
    }

    connectedCallback() {
      let scheduleToastClear = () => this.timer = setTimeout(() => this.clearToast(), TOAST_DURATION)
      this.addEventListenerWhileConnected('click', ev => {
        if (!ev.target.closest('.Toast-close-button')) return
        clearTimeout(this.timer)
        this.clearToast()
      })
      this.addEventListenerWhileConnected('mouseenter', () => {
        clearTimeout(this.timer)
      })
      this.addEventListenerWhileConnected('mouseleave', scheduleToastClear)

      requestAnimationFrame(() => requestAnimationFrame(() => {
        this.classList.add('Toast-shown')
        scheduleToastClear()
      }))
      this.onstop.push(() => clearTimeout(this.timer))
    } // connectedCallback
  })
})(window.__CM ??= {});

(CM => {
  'use strict'

  let { BaseElement, aliasStringAttr, dispatchEvent } = CM.customElements

  let HAS_CLIPBOARD = navigator.clipboard != null

  customElements.define('cm-copy', class extends BaseElement {
    constructor() {
      super()

      if (!HAS_CLIPBOARD) return
      aliasStringAttr(this, 'text')
    }

    static get observedAttributes() { return ['text'] }

    attributeChangedCallback() {
      if (!this.firstElementChild) return
      this.firstElementChild.title = `Copy '${this.text}' to clipboard`
    }

    connectedCallback() {
      this.addEventListenerWhileConnected('click', () => {
        navigator.clipboard.writeText(this.text)
          .then(
            () => dispatchEvent(this, 'copy'),
            err => {
              console.error(err)
              dispatchEvent(this, 'copyerror')
            },
          )
      })
      let $btn
      this.append($btn = Object.assign(document.createElement('button'), {
        className: 'Button-clear',
        title: `Copy '${this.text}' to clipboard`,
      }))
      $btn.innerHTML = '<cm-icon name="copy" class="Icon-s"></cm-icon>'
      this.onstop.push(() => this.innerHTML = '')
    } // connectedCallback
  })
})(window.__CM ??= {});

(CM => {
  'use strict'

  let { BaseElement, aliasBooleanAttr, dispatchEvent } = CM.customElements
  let { getCompStyl } = CM.properties

  let measureTextWidth = (() => {
    let ctx = document.createElement('canvas').getContext('2d')
    return (font, text) => {
      ctx.font = font
      return (Math.ceil(ctx.measureText(text).width) + 2) + 'px' // 2px border
    }
  })()

  customElements.define('cm-editable', class extends BaseElement {
    constructor() {
      super()

      aliasBooleanAttr(this, 'active')

      let $input
      Object.defineProperty(this, 'value', {
        get: () => ($input ??= this.querySelector('input')).value,
        set: v => ($input ??= this.querySelector('input')).value = v
      })
    }

    connectedCallback() {
      let $input = this.querySelector('input')
      let uneditedValue = $input.value

      let inactiveUI = () => {
        this.active = false
        $input.blur()
        requestAnimationFrame(() => $input.style.setProperty('--text-width', measureTextWidth(getCompStyl($input).font, $input.value|| $input.placeholder)))
      }
      let setActiveUI = () => {
        this.active = true
        $input.size = 16
      }

      let onCancelEdit = () => {
        $input.value = uneditedValue
        inactiveUI()
        dispatchEvent(this, 'cancel')
      }
      let onConfirmEdit = () => {
        if ($input.required && !$input.value) return
        inactiveUI()
        if (uneditedValue !== this.value) {
          uneditedValue = this.value
          dispatchEvent(this, 'change')
        }
        dispatchEvent(this, 'confirm')
      }

      this.addEventListenerToElementWhileConnected('input', 'focus', setActiveUI)
      this.addEventListenerWhileConnected('keyup', ev => {
        switch (ev.code) {
          case 'Escape':
            onCancelEdit()
            break
          case 'Enter':
            onConfirmEdit()
            break
        }
      })
      this.addEventListenerToElementWhileConnected('.Editable-cancel', 'click', onCancelEdit)
      this.addEventListenerToElementWhileConnected('.Editable-confirm', 'click', onConfirmEdit)

      if (this.active) setActiveUI()
      else inactiveUI()
    }
  })
})(window.__CM ??= {});

(CM => {
  'use strict'

  let { BaseElement, aliasStringAttr, aliasBooleanAttr, dispatchEvent } = CM.customElements

  let DAYS_IN_CALENDAR = 42 // 6 rows x 7 days
  let YEARS_IN_YEAR_PICKER = 18
  let N_PREV_YEARS_IN_YEAR_PICKER = 10
  let MONTH_NAMES = []
  let WEEKDAY_NAMES = []
  let WEEKDAY_SHORT_NAMES = []

  for (let i = 0; i < 12; i++) {
    let d = new Date(1, i, 1)
    MONTH_NAMES.push(d.toLocaleDateString(navigator.language, { month: 'short' }))
  }

  {
    let d = new Date(0)
    while (d.getDay()) d.setDate(d.getDate() + 1)
    for (let i = 0; i < 7; i++) {
      WEEKDAY_NAMES.push(d.toLocaleDateString(navigator.language, { weekday: 'long' }))
      WEEKDAY_SHORT_NAMES.push(d.toLocaleDateString(navigator.language, { weekday: 'narrow' }))
      d.setDate(d.getDate() + 1)
    }
  }

  let toISODate = d => d && (
    d.getFullYear() + '-' +
    (d.getMonth() + 1).toString().padStart(2, '0') + '-' +
    d.getDate().toString().padStart(2, '0')
  )
  let toDateTimestamp = s => new Date(s).setHours(0, 0, 0, 0)

  customElements.define('cm-calendar', class extends BaseElement {
    constructor() {
      super()

      aliasStringAttr(this, 'max')
      aliasStringAttr(this, 'min')
      aliasStringAttr(this, 'value')
      aliasStringAttr(this, 'limit')

      let value = new Date(Date.parse(this.value) || Date.now())
      this.displayYear = value.getFullYear()
      this.displayMonth = value.getMonth()
      this.hoverValue = ''
    }

    static get observedAttributes() { return ['value', 'max', 'min', 'range-from', 'limit'] }

    attributeChangedCallback(name) {
      if (name === 'value') {
        let value = new Date(Date.parse(this.value) || Date.now())
        this.displayYear = value.getFullYear()
        this.displayMonth = value.getMonth()
      }
      this.updateCalendar?.()
    }

    connectedCallback() {
      this.innerHTML = `
        <article class="Calendar">
          <header>
            <button class="Button" data-target="prev">
              <cm-icon name="chevron-left">Go to the previous month</cm-icon>
            </button>
            <button class="Button" data-mode="month" title="Pick a month">${MONTH_NAMES[this.displayMonth]}</button>
            <button class="Button" data-mode="year" title="Pick a year">${this.displayYear}</button>
            <button class="Button" data-target="next">
              <cm-icon name="chevron-right">Go to the next month</cm-icon>
            </button>
          </header>
          <fieldset class="Calendar-dates">
            <legend>Pick a date</legend>
            <table>
              <thead>
                <tr class="Calendar-header Text-heading-6">
                  <th class="Calendar-sunday"><abbr title="${WEEKDAY_NAMES[0]}">${WEEKDAY_SHORT_NAMES[0]}</abbr></th>
                  <th><abbr title="${WEEKDAY_NAMES[1]}">${WEEKDAY_SHORT_NAMES[1]}</abbr></th>
                  <th><abbr title="${WEEKDAY_NAMES[2]}">${WEEKDAY_SHORT_NAMES[2]}</abbr></th>
                  <th><abbr title="${WEEKDAY_NAMES[3]}">${WEEKDAY_SHORT_NAMES[3]}</abbr></th>
                  <th><abbr title="${WEEKDAY_NAMES[4]}">${WEEKDAY_SHORT_NAMES[4]}</abbr></th>
                  <th><abbr title="${WEEKDAY_NAMES[5]}">${WEEKDAY_SHORT_NAMES[5]}</abbr></th>
                  <th class="Calendar-saturday"><abbr title="${WEEKDAY_NAMES[6]}">${WEEKDAY_SHORT_NAMES[6]}</abbr></th>
                </tr>
              </thead>
              <tbody>
                ${`<tr>${`<td><button class="Calendar-date"><time></time></button></td>`.repeat(7)}</tr>`.repeat(6)}
              </tbody>
            </table>
          </fieldset>
          <fieldset class="Calendar-months">
            <legend>Pick a month</legend>
            ${MONTH_NAMES.map((m, i) => `<button class="Calendar-month" data-value="${i}">${m}</button>`).join('')}
          </fieldset>
          <fieldset class="Calendar-years">
            <legend>Pick a year</legend>
            ${'<button class="Calendar-year"></button>'.repeat(YEARS_IN_YEAR_PICKER)}
          </fieldset>
        </article>
      `

      let $calendar = this.firstElementChild
      let $header = this.querySelector('header')
      let $monthButton = $header.querySelector('button[data-mode="month"]')
      let $yearButton = $header.querySelector('button[data-mode="year"]')
      let $calendarDates = $calendar.querySelector('.Calendar-dates')
      let $$dates = Array.from($calendarDates.querySelectorAll('button'))
      let $calendarMonths = $calendar.querySelector('.Calendar-months')
      let $$months = Array.from($calendarMonths.querySelectorAll('button'))
      let $calendarYears = $calendar.querySelector('.Calendar-years')
      let $$years = Array.from($calendarYears.querySelectorAll('button'))

      let updateCalendar = this.updateCalendar = () => {
        let today = toDateTimestamp(Date.now())
        let valueTs = this.value && toDateTimestamp(this.value)
        let minVal = toDateTimestamp(this.min) || 0
        let maxVal = toDateTimestamp(this.max) || Infinity

        let limitTs = toDateTimestamp(this.limit)
        let limitMin = false  // default false because undefined is truthy in classList.toggle
        let limitMax = false
        if (this.limit && (this.value || this.hoverValue)) {
          let limitOtherVal = toDateTimestamp(this.hoverValue) || valueTs
          limitMin = Math.min(limitTs, limitOtherVal)
          limitMax = Math.max(limitTs, limitOtherVal)
        }

        // Update the dates
        let firstDayOffset = new Date(this.displayYear, this.displayMonth, 1).getDay()
        for (let i = 0; i < DAYS_IN_CALENDAR; i++) {
          let d = new Date(this.displayYear, this.displayMonth, i + 1 - firstDayOffset, 0, 0, 0, 0)
          let dTime = +d
          let $btn = $$dates[i]
          $btn.firstElementChild.setAttribute('datetime', toISODate(d))
          $btn.firstElementChild.textContent = d.getDate()
          $btn.classList.toggle('Calendar-extra', d.getMonth() !== this.displayMonth)
          $btn.classList.toggle('Calendar-selected', dTime === valueTs)
          $btn.classList.toggle('Calendar-range-to-left', dTime === limitMax)
          $btn.classList.toggle('Calendar-range-to-right', dTime === limitMin)
          $btn.classList.toggle('Calendar-today', dTime === today)
          $btn.classList.toggle('Calendar-limit', dTime === limitTs)
          $btn.classList.toggle('Calendar-range', limitMin && limitMax && d > limitMin && d < limitMax)
          $btn.disabled = dTime < minVal || dTime > maxVal
        }

        // Update month buttons
        $$months.forEach(($, i) => {
          let targetMonthStart = new Date(this.displayYear, i, 1).getTime()
          let targetMonthEnd = new Date(this.displayYear, i + 1, 0).getTime()
          $.classList.toggle('Calendar-selected', i === this.displayMonth)
        })

        // Update year buttons
        let firstYear = this.displayYear - N_PREV_YEARS_IN_YEAR_PICKER
        $$years.forEach(($, i) => {
          let targetYear = i + firstYear
          let targetYearStart = new Date(targetYear, 0, 1).getTime()
          let targetYearEnd = new Date(targetYear, 11, 31).getTime()
          $.classList.toggle('Calendar-selected', targetYear === this.displayYear)
          $.textContent = $.dataset.value = targetYear
        })

        // Update month/year labels
        $monthButton.textContent = MONTH_NAMES[this.displayMonth]
        $yearButton.textContent = this.displayYear
      } // updateCalendar

      $header.onclick = ev => {
        let $btn = ev.target.closest('button')
        let { target, mode } = $btn.dataset

        if (target) {
          if (target === 'prev') {
            if (this.displayMonth) this.displayMonth--
            else {
              this.displayMonth = 11
              this.displayYear--
            }
          }
          else if (target === 'next') {
            if (this.displayMonth < 11) this.displayMonth++
            else {
              this.displayYear++
              this.displayMonth = 0
            }
          }
          updateCalendar()
        }
        if (mode) {
          $header.querySelector('.Button-active')?.classList.remove('Button-active')
          $btn.classList.toggle('Button-active', $calendar.dataset.mode !== mode)
          if ($calendar.dataset.mode === mode) delete $calendar.dataset.mode
          else $calendar.dataset.mode = mode
        }
      } // $header.onclick
      $calendarDates.onclick = ev => {
        let $btn = ev.target.closest('button')
        if (!$btn || $btn.disabled) return

        let btnVal = $btn.firstElementChild.getAttribute('datetime')
        if (this.value === btnVal) {
          $btn.blur()
          this.value = ''
        }
        else this.value = $btn.firstElementChild.getAttribute('datetime')
        dispatchEvent(this, 'change')
      }
      $calendarMonths.onclick = ev => {
        let value = ev.target.dataset.value
        if (!value) return
        delete $calendar.dataset.mode
        $monthButton.classList.remove('Button-active')
        if (this.displayYear == value) return
        this.displayMonth = Number(value)
        updateCalendar()
      }
      $calendarYears.onclick = ev => {
        let value = ev.target.dataset.value
        if (!value) return
        delete $calendar.dataset.mode
        $yearButton.classList.remove('Button-active')
        if (this.displayYear == value) return
        this.displayYear = Number(value)
        updateCalendar()
      }

      $$dates.forEach($btn => {
        let $td = $btn.parentNode
        $td.onmouseenter = () => {
          if ($btn.disabled) return
          this.hoverValue = $btn.firstElementChild.getAttribute('datetime')
          updateCalendar()
        }
        $td.onmouseleave = () => {
          this.hoverValue = ''
          updateCalendar()
        }
      })

      updateCalendar()
      this.onstop.push(() => this.innerHTML = '')
    } // connectedCallback
  }) // cm-calendar

  customElements.define('cm-calendar-icon', class extends BaseElement {
    constructor() {
      super()

      aliasStringAttr(this, 'max')
      aliasStringAttr(this, 'min')
      aliasStringAttr(this, 'value')
      aliasStringAttr(this, 'for', 'htmlFor')
      aliasBooleanAttr(this, 'disabled')
    }

    static get observedAttributes() { return ['value', 'min', 'max', 'disabled'] }

    attributeChangedCallback(name) {
      switch (name) {
        case 'disabled':
          this.updateFocusability?.()
          break
        default:
          let $calendar = this.querySelector('cm-calendar')
          if (!$calendar) return
          $calendar.setAttribute(name, this.getAttribute(name))
      }
    }

    connectedCallback() {
      let $linkedInput = document.getElementById(this.htmlFor) || this.closest('label').querySelector('input')
      this.value ??= $linkedInput.value

      this.innerHTML = `
        <cm-popup>
          <details>
            <summary class="Button-clear">
              <cm-icon name="calendar">Open a calendar and pick a date</cm-icon>
            </summary>
            <div class="Popup-dialog Dialog">
              <cm-calendar 
                class="Panel" 
                value="${this.value}" 
                min="${this.min}" 
                max="${this.max}" 
              ></cm-calendar>
            </div>
          </details>
        </cm-popup>
      `

      let $details = this.querySelector('details')
      let $summary = $details.querySelector('summary')
      let $calendar = this.querySelector('cm-calendar')

      let updateFocusability = this.updateFocusability = () => {
        if (this.disabled) $summary.setAttribute('tabindex', '-1')
        else $summary.removeAttribute('tabindex')
      }

      $calendar.onchange = ev => {
        $details.open = false
        let val = this.value = ev.target.value
        if (!$linkedInput) return
        $linkedInput.value = val
        $linkedInput.dispatchEvent(new Event('input', { bubbles: true }))
        $linkedInput.focus()
      }
      if ($linkedInput) $linkedInput.addEventListener('change', () => {
        this.value = $linkedInput.value
      })
      updateFocusability()
      this.onstop.push(() => this.innerHTML = '')
      this.onstop.push(() => delete this.updateFocusability)
    } // connectedCallback
  }) // cm-calendar-icon

  customElements.define('cm-calendar-range', class extends BaseElement {
    constructor() {
      super()

      aliasStringAttr(this, 'value')
    }

    static get observedAttributes() { return ['value'] }

    attributeChangedCallback() {
      this.updateInputsFromValue?.()
    }

    getDateRange() {
      let [min, max] = this.value.split(',')
      return [min ? new Date(min.trim()) : null, max ? new Date(max.trim()) : null]
    }

    connectedCallback() {
      let [$inputMin, $inputMax] = Array.from(this.querySelectorAll('input'))
      let [$calendarMin, $calendarMax] = Array.from(this.querySelectorAll('cm-calendar'))
      if ($inputMax == null || $calendarMax == null) throw Error('<cm-calendar-range> requires 2 inputs and 2 calendars to work')

      let dispatchChangeEvent = () => this.dispatchEvent(new Event('change', { bubbles: true }))
      let updateInputsFromValue = this.updateInputsFromValue = () => {
        let [min, max] = this.value.split(',')
        $inputMin.value = $calendarMin.value = $calendarMax.limit = $calendarMax.min = min.trim()
        $inputMax.value = $calendarMax.value = $calendarMin.limit = $calendarMin.max = max.trim()
      }
      let updateValue = () => this.value = $inputMin.value.trim() + ',' + $inputMax.value.trim()

      this.addEventListenerToElementWhileConnected($inputMin, 'input', () => {
        $calendarMax.limit = $calendarMax.min = $inputMin.value
        updateValue()
        dispatchChangeEvent()
      })
      this.addEventListenerToElementWhileConnected($inputMax, 'input', () => {
        $calendarMin.limit = $calendarMin.max = $inputMax.value
        updateValue()
        dispatchChangeEvent()
      })

      if (this.value) updateInputsFromValue()
      else updateValue()
    } // connectedCallback
  }) // cm-calendar-range
})(window.__CM ??= {});

