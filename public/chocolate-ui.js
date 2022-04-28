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
  class IconBase extends HTMLElement {
    constructor() {
      super()

      let $icon
      let $title

      Object.defineProperties(this, {
        name: {
          set: x => this.setAttribute('name', x),
          get: () => this.getAttribute('name'),
        },
        alt: {
          set: x => this.setAttribute('alt', x),
          get: () => this.getAttribute('alt') ?? '',
        },
      })
      this.getIcons()
    }

    getIcons() {}

    updateIcon() {
      this.querySelector('use')?.setAttribute('href', '#' + this.prefix + this.name)
    }

    static get observedAttributes() { return ['name'] }

    attributeChangedCallback(name) {
      if (name === 'name') this.updateIcon()
      if (name === 'alt') this.updateTitle()
    }

    connectedCallback() {
      this.alt = this.textContent.trim()
    }

    disconnectedCallback() {
      this.innerHTML = ''
      this.textContent = this.alt
    }

    updateTitle() {
      let $icon = this.querySelector('use')
      let $title = this.querySelector('title')
      if (this.alt) {
        if (!$title) $icon.parentNode.insertBefore($icon, $title = document.createElement('title'))
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

  let buildPropsCache = () => {
    propsCache = {}
    Array.from(document.styleSheets)
      .forEach(ss => Array.from(ss.cssRules)
        .forEach(rule => {
          if (rule.selectorText !== ':root') return
          Array.from(rule.style).forEach(property => {
            if (property.startsWith('--')) {
              propsCache[property] = rule.style.getPropertyValue(property)
            }
          })
        }))
  }

  let getAllProps = () => {
    if (!propsCache) buildPropsCache()
    return propsCache
  }

  let getCSSProp = (propName) => {
    if (!propsCache) buildPropsCache()
    return propsCache['--' + propName]
  }

  let computedStyleCache = new WeakMap()
  let getCompStyl = $target => {
    if (!computedStyleCache.has($target)) {
      computedStyleCache.set($target, window.getComputedStyle($target))
    }
    return computedStyleCache.get($target)
  }

  let getEmOrRemSize = (x, $target) => {
    let n = parseFloat(x)
    if (x.endsWith('rem')) $target = document.documentElement
    return parseFloat(getCompStyl($target).fontSize) * n
  }

  CM.properties = {
    getAllProps,
    getCSSProp,
    getCompStyl,
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

(() => {
  'use strict'

  customElements.define('cm-toggler', class extends HTMLElement {
    constructor() {
      super()

      Object.defineProperties(this, {
        htmlFor: {
          set: x => this.setAttribute('for', x),
          get: () => this.getAttribute('for'),
        },
      })
    }

    connectedCallback() {
      let onClick = () => {
        let $target = document.getElementById(this.htmlFor)
        if (!$target) return
        // `setTimeout()` causes the toggling to wait until the event has
        // bubbled up to document.body and handled by elements that listen to
        // 'outside' events, so they don't self-close immediately.
        setTimeout(() => $target.toggleAttribute('open'))
      }
      this.addEventListener('click', onClick)
      this.onstop = () => this.removeEventListener('click', onClick)
    }

    disconnectedCallback() {
      this.onstop()
      this.onstop = null
    }
  })
})();

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

  let animationFast = parseFloat(CM.properties.getCSSProp('style-animation-speed-fast'))

  customElements.define('cm-accordion', class extends HTMLElement {
    constructor() {
      super()

      this.onstop = () => {}
    }

    connectedCallback() {
      let $details = this.querySelector(':scope > .Accordion')
      let $summary = $details.querySelector(':scope > summary')
      let $content = $details.querySelector(':scope > :last-child')

      let onSummaryClick = ev => {
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
        } else {
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
      }

      $summary.addEventListener('click', onSummaryClick)
      this.onstop = () => $summary.removeEventListener('click', onSummaryClick)
    }

    disconnectedCallback() {
      this.onstop()
    }
  })

  customElements.define('cm-accordion-group', class extends HTMLElement {
    constructor() {
      super()

      this.onstop = []
    }

    connectedCallback() {
      let onToggle = ev => {
        let $$openAccordions = this.querySelectorAll('cm-accordion details[open]')
        $$openAccordions.forEach($ => {
          if ($ === ev.target) return
          $.open = false
        })
      }
      let onClick = ev => {
        // Handle cases where accordions are mixed with non-accordion content (e.g., list)
        if (ev.target.closest('cm-accordion')) return
        this.dispatchEvent(new Event('toggle'))
      }

      this.addEventListener('toggle', onToggle)
      this.addEventListener('click', onClick)

      this.onstop.push(
        () => this.removeEventListener('toggle', onToggle),
        () => this.removeEventListener('click', onClick)
      )
    }

    disconnectedCallback() {
      this.onstop.forEach(f => f())
      this.onstop.length = 0
    }
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

  let gap = CM.properties.getCSSProp('style-gap-xs')

  customElements.define('cm-dropdown', class extends HTMLElement {
    constructor() {
      super()
      this.onstop = []
    }

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
      let updateLayout = this.updateLayout = () => {
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

      this.addEventListener('keydown', ev => {
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
      this.addEventListener('change', ev => {
        $current = ev.target
        updateLabel()
        updateLayout()
      })
      $dropdownList.addEventListener('click', ev => {
        if (ev.target.closest('label')) $details.open = false
      })
      $details.addEventListener('toggle', ev => {
        if ($details.open) updateLayout()
      })
      this.onstop.push(
        CM.events.onLayoutChange(() => {
          if ($details.open) updateLayout()
        }),
        CM.events.onClickOutside(this, () => {
          $details.open = false
        })
      )
      updateLabel()
      updateLayout()
    } // connectedCallback

    disconnectedCallback() {
      this.onstop.forEach(fn => fn())
      this.onstop.length = 0
    }
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

(() => {
  'use strict'

  customElements.define('cm-list', class extends HTMLElement {
    constructor() {
      super()

      Object.defineProperties(this, {
        value: {
          set: x => this.setAttribute('value', x),
          get: () => this.getAttribute('value'),
        }
      })
    }

    static get observedAttributes() { return ['value'] }

    attributeChangedCallback() {
      this.querySelector('.List-selected')?.classList.remove('List-selected')
      let $tgt = this.querySelector(`[data-value="${this.value}"],[href="${this.value}"]`)
      if (!$tgt) return
      $tgt.closest('li').classList.add('List-selected')
      let $l2 = $tgt.closest('details:not([open])')
      if ($l2) $l2.open = true
    }

    connectedCallback() {
      let onClick = ev => {
        let $tgt = ev.target.closest('a, button')
        if ($tgt.tagName === 'A') ev.preventDefault()

        this.querySelector('.List-selected')?.classList.remove('List-selected')
        $tgt.closest('li').classList.add('List-selected')
        this.value = $tgt.dataset.value || $tgt.getAttribute('href')
        let chg = new Event('change', { bubbles: true })
        Object.defineProperty(chg, 'target', { value: this, writable: false })
        this.dispatchEvent(chg)
        if (this.onchange) this.onchange(chg)
      }
      this.addEventListener('click', onClick)
      this.onstop = () => this.removeEventListener('click', onClick)
    }

    disconnectedCallback() {
      this.onstop()
      this.onstop = null
    }
  })
})();

(() => {
  'use strict'

  customElements.define('cm-paginator', class extends HTMLElement {
    constructor() {
      super()

      Object.defineProperties(this, {
        total: {
          set: x => this.setAttribute('total', x),
          get: () => Number(this.getAttribute('total'))
        },
        current: {
          set: x => this.setAttribute('current', x),
          get: () => Number(this.getAttribute('current'))
        },
      })
    }

    static get observedAttributes() { return ['total', 'current'] }

    attributeChangedCallback() {
      this.updatePaginator?.()
    }

    connectedCallback() {
      let $start
      let $prev
      let $first
      let $morePrev
      let $$pages
      let $$pagesMobile
      let $moreNext
      let $last
      let $next
      let $end

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

        let pageMin, pageMax

        { // Update non-mobile pages
          let pageCount = $$pages.length
          let pagesOnSide = (pageCount - 1) / 2
          pageMin = Math.max(1, Math.min(total - pageCount, current - pagesOnSide))
          pageMax = Math.min(total, pageMin + pagesOnSide * 2)
          updatePages($$pages, pageMin, pageMax)
        }

        { // Update mobile pages
          let pageMobileCount = $$pagesMobile.length
          let pageMobileOnSide = (pageMobileCount - 1) / 2
          let pageMobileMin = Math.max(1, Math.min(total - (pageMobileOnSide * 2), current - pageMobileOnSide))
          let pageMobileMax = Math.min(total, pageMobileMin + pageMobileOnSide * 2)
          updatePages($$pagesMobile, pageMobileMin, pageMobileMax)
        }

        let isFirst = current === 1
        let isLast = current === total
        let showExtraButtons = total > 3

        $start.disabled = isFirst
        $end.disabled = isLast
        $prev.disabled = isFirst
        $prev.dataset.target = current - 1
        $next.disabled = isLast
        $next.dataset.target = current + 1

        let showFirst = pageMin > 1
        let hasLeftGap = pageMin > 2
        $first.hidden = !showFirst || !showExtraButtons
        $morePrev.hidden = !hasLeftGap || !showExtraButtons

        let showLast = pageMax !== total
        let hasRightGap = pageMax < total - 1
        $last.hidden = !showLast || !showExtraButtons
        $last.dataset.target = $end.dataset.target = $last.textContent = total
        $last.disabled = isLast
        $last.title = 'page ' + total + ' (last page)'
        $moreNext.hidden = !hasRightGap || !showExtraButtons
      }

      let onPage = pageNo => {
        this.current = pageNo
        this.dispatchEvent(new Event('change'))
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
        `

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

      let onClick = ev => {
        let $target = ev.target.closest('button[data-target]:not([disabled])')
        if (!$target) return
        onPage($target.dataset.target)
      }
      this.addEventListener('click', onClick)
      this.onstop = () => this.removeEventListener('click', onClick)
    }

    disconnectedCallback() {
      this.onstop()
      this.onstop = null
      this.updatePaginator = null
      this.innerHTML = ''
    }
  })
})();

(CM => {
  'use strict'

  let { position } = CM

  customElements.define('cm-popup', class extends HTMLElement {
    constructor() {
      super()
      this.onstop = []
    }

    connectedCallback() {
      let $details = this.firstElementChild

      if (!$details) throw Error('<cm-popup> must not be empty')

      let $dialog = $details.lastElementChild
      let $button = $details.firstElementChild
      let $icon = $button.querySelector(':scope > cm-icon') || { name: '', alt: '' }
      let defaultIcon = $icon.name
      let defaultAlt = $icon.alt
      let gap = CM.properties.getEmOrRemSize(CM.properties.getCompStyl(this).getPropertyValue('--style-popup-gap'), $button)

      let iconOpenCloseProperties = [
        { name: defaultIcon, alt: defaultAlt },
        { name: 'x', alt: 'close' },
      ]
      let updateIcon = () => Object.assign($icon, iconOpenCloseProperties[$details.open])
      let updateOrientation = () => {
        let pos = position.relPos($button, $dialog, gap)
        let direction
        let alignment
        if (pos.isWide) {
          direction = position.DIR_BELOW
          alignment = position.ALIGN_LEFT
          if (!pos.clearsBottom) direction = position.DIR_ABOVE
          if (!pos.overhangsRight) alignment = position.ALIGN_RIGHT
        } else {
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
      }

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
        })
      )

      updateOrientation()
    }

    disconnectedCallback() {
      this.onstop.forEach(f => f())
      this.onstop = []
    }
  })
})(window.__CM = window.__CM || {});

(() => {
  'use strict'

  customElements.define('cm-scrollbox-relay', class extends HTMLElement {
    connectedCallback() {
      let onScroll = () => window.dispatchEvent(new Event('scroll'))
      this.firstElementChild.addEventListener('scroll', onScroll)
      this.onstop = () => this.firstElementChild.removeEventListener('scroll', onScroll)
    }

    disconnectedCallback() {
      this.onstop()
      this.onstop = null
    }
  })
})();

(CM => {
  'use strict'

  customElements.define('cm-sidebar', class extends HTMLElement {
    constructor() {
      super()

      Object.defineProperties(this, {
        open: {
          get: () => this.hasAttribute('open'),
          set: x => this.toggleAttribute('open', x)
        }
      })
    }

    connectedCallback() {
      this.onstop = CM.events.onClickOutside(this, () => this.removeAttribute('open'))
      if (this.$btn) return
      this.$btn = this.querySelector('.Sidebar-toggle-button')
      this.$btn?.addEventListener('click', () => this.toggleAttribute('open'))
    }

    disconnectedCallback() {
      this.onstop()
    }
  })
})(window.__CM = window.__CM || {});

(CM => {
  'use strict'

  let dummyCallback = () => {}

  customElements.define('cm-table', class extends HTMLElement {
    constructor() {
      super()

      Object.defineProperties(this, {
        stickyCol: {
          get: () => this.hasAttribute('sticky-col'),
        },
      })

      this.onstop = []
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

    disconnectedCallback() {
      this.onstop.forEach(f => f())
      this.onstop.length = 0
    }
  })

  customElements.define('cm-table-remote', class extends HTMLElement {
    constructor() {
      super()

      Object.defineProperties(this, {
        htmlFor: {
          set: x => this.setAttribute('for', x),
          get: () => this.getAttribute('for'),
        },
      })

      this.updateVisibility = dummyCallback
      this.onstop = []
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
      }

      $btnLeft.addEventListener('click', () => {
        updateScrollOffset($col => -$col.previousElementSibling.offsetWidth)
      })
      $btnRight.addEventListener('click', () => {
        updateScrollOffset($col => $col.offsetWidth)
      })
      updateVisibility()
      this.onstop.push(CM.events.onLayoutChange(updateVisibility))
    }

    disconnectedCallback() {
      this.onstop.for(f => f())
      this.onstop.length = 0
      this.updateVisibility = dummyCallback
      this.innerHTML = ''
    }
  })
})(window.__CM ??= {});

(() => {
  'use strict'

  customElements.define('cm-tabs', class extends HTMLElement {
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
      this.onstop = () => this.removeEventListener('change', onChange)
    }

    disconnectedCallback() {
      this.onstop()
      this.onstop = null
    }
  })
})();

(() => {
  'use strict'

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

  customElements.define('cm-toast-list', class extends HTMLElement {
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
        <article class="${PRIORITY_CLASSES[priority]}" role="alert">
          ${icon && `<cm-icon name="${icon}"></cm-icon>`}
          ${title && `<h2 class="Toast-title">${title}</h2>`}
          ${(icon || title) && '<div class="Toast-separator">'}
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

  customElements.define('cm-toast', class extends HTMLElement {
    constructor() {
      super()
      this.onstop = []
    }

    clearToast() {
      this.ontransitionend = () => this.remove()
      this.onanimationend = () => this.remove()
      this.classList.add('Toast-clear')
    }

    connectedCallback() {
      let onClick = ev => {
        if (!ev.target.closest('.Toast-close-button')) return
        clearTimeout(this.timer)
        this.clearToast()
      }
      let onMouseenter = () => {
        clearTimeout(this.timer)
      }
      let onMouseleave = () => {
        this.timer = setTimeout(() => this.clearToast(), TOAST_DURATION)
      }
      this.addEventListener('click', onClick)
      this.addEventListener('mouseenter', onMouseenter)
      this.addEventListener('mouseleave', onMouseleave)
      this.onstop.push(
        () => this.removeEventListener('click', onClick),
        () => this.removeEventListener('mouseenter', onMouseenter),
        () => this.removeEventListener('mouseleave', onMouseleave),
      )

      requestAnimationFrame(() => requestAnimationFrame(() => {
        this.classList.add('Toast-shown')
      }))
      this.timer = setTimeout(() => this.clearToast(), TOAST_DURATION)
    }

    disconnectedCallback() {
      clearTimeout(this.timer)
      this.onstop.forEach(f => f())
      this.onstop.length = 0
    }
  })
})();

(() => {
  'use strict'

  let HAS_CLIPBOARD = navigator.clipboard != null

  customElements.define('cm-copy', class extends HTMLElement {
    constructor() {
      super()

      if (!HAS_CLIPBOARD) return

      Object.defineProperties(this, {
        text: {
          set: x => this.setAttribute('text', x),
          get: () => this.getAttribute('text'),
        },
      })

      this.onstop = null
    }

    static get observedAttributes() { return ['text'] }

    attributeChangedCallback() {
      if (!this.firstElementChild) return
      this.firstElementChild.title = `Copy '${this.text}' to clipboard`
    }

    connectedCallback() {
      let onClick = () => {
        navigator.clipboard.writeText(this.text)
          .then(() => {
            let evt = new Event('copy', { bubbles: true })
            Object.defineProperty(evt, 'target', { value: this, writable: false })
            this.dispatchEvent(evt)
            if (this.oncopy) this.oncopy(evt)
          }, err => {
            console.error(err)
            let evt = new Event('copyerror', { bubbles: true })
            Object.defineProperty(evt, 'target', { value: this, writable: false })
            this.dispatchEvent(evt)
            if (this.oncopyerror) this.oncopyerror(evt)
          })
      }
      this.addEventListener('click', onClick)
      this.onstop = () => this.removeEventListener('click', onClick)
      let $btn
      this.append($btn = Object.assign(document.createElement('button'), {
        className: 'Button-clear',
        title: `Copy '${this.text}' to clipboard`,
      }))
      $btn.innerHTML = '<cm-icon name="copy" class="Icon-s"></cm-icon>'
    }

    disconnectedCallback() {
      this.onstop()
      this.onstop = null
      this.innerHTML = ''
    }
  })
})();

(CM => {
  'use strict'

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

  customElements.define('cm-calendar', class extends HTMLElement {
    constructor() {
      super()

      Object.defineProperties(this, {
        max: {
          set: x => this.setAttribute('max', x),
          get: () => this.getAttribute('max') || '',
        },
        min: {
          set: x => this.setAttribute('min', x),
          get: () => this.getAttribute('min') || '',
        },
        value: {
          set: x => this.setAttribute('value', x),
          get: () => this.getAttribute('value') || '',
        },
        limit: {
          set: x => this.setAttribute('limit', x),
          get: () => this.getAttribute('limit') || '',
        },
      })

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
                <tr class="Text-heading-6">
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
      }
      $calendarDates.onclick = ev => {
        let $btn = ev.target.closest('button')
        if (!$btn || $btn.disabled) return

        let btnVal = $btn.firstElementChild.getAttribute('datetime')
        if (this.value === btnVal) {
          $btn.blur()
          this.value = ''
        }
        else this.value = $btn.firstElementChild.getAttribute('datetime')

        let changeEv = new Event('change', { bubbles: true })
        Object.defineProperty(changeEv, 'target', { value: this })
        this.dispatchEvent(changeEv)
        if (this.onchange) this.onchange(changeEv)
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
    } // connectedCallback

    disconnectedCallback() {
      this.innerHTML = ''
    }
  }) // cm-calendar

  customElements.define('cm-calendar-icon', class extends HTMLElement {
    constructor() {
      super()

      Object.defineProperties(this, {
        max: {
          set: x => this.setAttribute('max', x),
          get: () => this.getAttribute('max') || '',
        },
        min: {
          set: x => this.setAttribute('min', x),
          get: () => this.getAttribute('min') || '',
        },
        value: {
          set: x => this.setAttribute('value', x),
          get: () => this.getAttribute('value') || '',
        },
        htmlFor: {
          set: x => this.setAttribute('for', x),
          get: () => this.getAttribute('for'),
        },
        disabled: {
          set: x => this.toggleAttribute('disabled', x),
          get: x => this.hasAttribute('disabled'),
        },
      })
    } // constructor

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
    } // connectedCallback

    disconnectedCallback() {
      this.innerHTML = ''
      delete this.updateFocusability
    }
  }) // cm-calendar-icon

  customElements.define('cm-calendar-range', class extends HTMLElement {
    constructor() {
      super()

      Object.defineProperties(this, {
        value: {
          set: x => this.setAttribute('value', x),
          get: () => this.getAttribute('value'),
        },
      })

      this.onstop = []
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

      let updateMin = () => {
        $calendarMax.limit = $calendarMax.min = $inputMin.value
        updateValue()
        dispatchChangeEvent()
      }
      let updateMax = () => {
        $calendarMin.limit = $calendarMin.max = $inputMax.value
        updateValue()
        dispatchChangeEvent()
      }
      $inputMin.addEventListener('input', updateMin)
      $inputMax.addEventListener('input', updateMax)
      this.onstop.push(
        () => $inputMin.removeEventListener('input', updateMin),
        () => $inputMax.removeEventListener('input', updateMax),
      )

      if (this.value) updateInputsFromValue()
      else updateValue()
    }

    disconnectedCallback() {
      this.onstop.forEach(f => f())
      this.onstop.length = 0
    }
  }) // cm-calendar-range
})(window.__CM ??= {});

