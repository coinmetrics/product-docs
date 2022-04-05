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

(() => {
  'use strict'

  const NO_BG_SUFFIX = '-nobg'
  const PREFIX = 'cm-icon-coin-'

  let iconIds

  let getIcons = () => iconIds || (
    iconIds = fetch('https://cdn.coinmetrics.io/crypto-icons-v2.svg')
      .then(res => res.text())
      .then(svg => {
        let $d = document.createElement('div')
        $d.className = 'Coin-sprite-hider'
        $d.innerHTML = svg
        document.body.append($d)
        return new Set(Array.from(svg.matchAll(/<symbol .*?id="([^"]+)"/g)).map(x => x[1].replace(PREFIX, '')))
      })
      .catch(() => ({ svg: '', ids: new Set() }))
  )

  customElements.define('cm-coin', class extends HTMLElement {
    constructor() {
      super()

      let nameIndex
      this.setAttribute('alt', this.textContent.trim())

      Object.defineProperties(this, {
        name: {
          set: x => this.setAttribute('name', x),
          get: () => this.getAttribute('name'),
        },
        alt: {
          set: x => this.setAttribute('alt', x),
          get: () => this.getAttribute('alt') ?? this.name?.toUpperCase(),
        },
      })

      let getIconId = () => {
        let name = this.name.toLowerCase()
        if (!nameIndex) return name
        if (nameIndex.has(name)) return name
        if (name.startsWith('cmbi')) {
          if (name.endsWith(NO_BG_SUFFIX)) return 'cm' + NO_BG_SUFFIX
          return 'cm'
        }
        return 'generic'
      }

      let $icon
      let $title

      let updateIcon = this.updateIcon = () => $icon?.setAttribute('href', '#' + PREFIX + getIconId())
      this.updateTitle = () => {if ($title) $title.textContent = this.alt}

      this.innerHTML = ''
      this.append(Object.assign(document.createElement('template'), {
        innerHTML: `
          <svg class="Coin-svg" viewBox="0 0 32 32">
            ${this.alt && `<title>${this.alt}</title>`}
            <use href="#${PREFIX}${getIconId()}"></use>
          </svg>
        `,
      }).content)
      $icon = this.querySelector('use')
      $title = this.querySelector('title')

      getIcons().then((ids) => {
        nameIndex = ids
        updateIcon()
      })
    }

    static get observedAttributes() { return ['name'] }

    attributeChangedCallback(name) {
      switch (name) {
        case 'name':
          return this.updateIcon()
        case 'alt':
          return this.updateTitle()
      }
    }
  })
})();

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
    let { clientWidth: vw, clientHeight: vh } = document.documentElement

    let tgtDim = getElmBox($tgt)
    let refBox = $ref.getBoundingClientRect()

    // Ref box characteristics
    let isWide = refBox.width > refBox.height * MIN_ASPECT_FOR_WIDE

    // Spatial relationship
    let overhangsRight = refBox.left + tgtDim.width < vw
    let overhangsLeft = refBox.right - tgtDim.width > 0
    let clearsRight = refBox.right + tgtDim.width + gap < vw
    let clearsLeft = refBox.left - tgtDim.width - gap > 0
    let overhangsBottom = refBox.top + tgtDim.height < vh
    let overhangsTop = refBox.bottom - tgtDim.height > 0
    let clearsBottom = refBox.bottom + tgtDim.height + gap < vh
    let clearsTop = refBox.top - tgtDim.height - gap > 0

    // Relative position CSS rules
    let above = { bottom: `calc(100vh - ${refBox.top - gap}px)` }
    let below = { top: `${refBox.bottom + gap}px` }
    let left = { right: `calc(100vw - ${refBox.left - gap}px)` }
    let right = { left: `${refBox.right + gap}px` }
    let leftAlign = { left: `${refBox.left}px` }
    let rightAlign = { right: `calc(100vw - ${refBox.right}px)` }
    let hCenter = { left: `${refBox.left + (refBox.width / 2) - (tgtDim.width / 2)}px` }
    let topAlign = { top: `${refBox.top}px` }
    let bottomAlign = { bottom: `calc(100vh - ${refBox.bottom}px)` }
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

      this.onclick = () => {
        let $target = document.getElementById(this.htmlFor)
        // `setTimeout()` causes the toggling to wait until the event has
        // bubbled up to document.body and handled by elements that listen to
        // 'outside' events, so they don't self-close immediately.
        if ($target) setTimeout(() => $target.toggleAttribute('open'))
      }
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

      let $details = this.querySelector(':scope > .Accordion')
      let $summary = $details.querySelector(':scope > summary')
      let $content = $details.querySelector(':scope > :last-child')

      $summary.addEventListener('click', ev => {
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
      })
    }
  })

  customElements.define('cm-accordion-group', class extends HTMLElement {
    constructor() {
      super()

      let $openAccordion = this.querySelector(':scope > cm-accordion > dialog[open]')

      let closeOpenAccordion = () => {
        if (!$openAccordion) return
        $openAccordion.removeAttribute('open')
        $openAccordion = null
      }
      let updateOpenAccordionRef = $el => {
        if ($el.hasAttribute('open')) $openAccordion = $el
      }

      let onAccordionToggled = $el => {
        closeOpenAccordion()
        updateOpenAccordionRef($el)
      }

      this.addEventListener('toggle', ev => {
        if (ev.target.parentNode.parentNode === this) onAccordionToggled(ev.target)
      })
    }
  })
})(window.__CM = window.__CM || {});

(() => {
  'use strict'

  const PREFIX = 'cm-icon-color-'

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

  customElements.define('cm-color-icon', class extends HTMLElement {
    constructor() {
      super()

      this.setAttribute('alt', this.textContent.trim())

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

      let $icon
      let $title

      this.updateIcon = () => $icon.setAttribute('href', '#' + PREFIX + this.name)
      this.updateTitle = () => {
        if (this.alt) {
          if (!$title) $icon.parentNode.insertBefore($icon, $title = document.createElement('title'))
          $title.textContent = this.alt
        } else if ($title) $title.remove()
      }

      getIcons()

      this.innerHTML = ''
      this.append(Object.assign(document.createElement('template'), {
        innerHTML: `
          <svg class="Color-icon-svg" viewBox="0 0 24 24">
            ${this.alt && `<title>${this.alt}</title>`}
            <use href="#${PREFIX}${this.name}"></use>
          </svg>
        `
      }).content)
      $title = this.querySelector('title')
      $icon = this.querySelector('use')
    }

    static get observedAttributes() { return ['name'] }

    attributeChangedCallback(name) {
      switch (name) {
        case 'name':
          return this.updateIcon()
        case 'alt':
          return this.updateTitle()
      }
    }
  })
})();

(CM => {
  'use strict'

  let gap = CM.properties.getCSSProp('style-gap-xs')

  customElements.define('cm-dropdown', class extends HTMLElement {
    constructor() {
      super()

      let $details = this.querySelector('.Dropdown')
      let $dropdownList = $details.querySelector('fieldset')
      let $button = $details.querySelector('summary')
      let $label = $button.querySelector(':not(cm-icon)')
      let $current = $dropdownList.querySelector('input:checked')

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
      })
      this.addEventListener('change', ev => {
        let $input = ev.target
        $label.innerHTML = $input.dataset.label ?? $input.nextElementSibling.innerHTML
        $current = $input
        updateLayout()
      })
      this.addEventListener('click', ev => {
        if (ev.target.tagName === 'LABEL') $details.open = false
      })
      $details.addEventListener('toggle', ev => {
        if ($details.open) updateLayout()
      })
      this.onstop = [
        CM.events.onLayoutChange(() => {
          if ($details.open) updateLayout()
        }),
        CM.events.onClickOutside(this, () => {
          $details.open = false
        })
      ]
      updateLayout()
    }

    disconnectedCallback() {
      this.onstop.forEach(fn => fn())
    }
  })
})(window.__CM = window.__CM || {});

(() => {
  'use strict'

  const PREFIX = 'cm-icon-'

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
      .catch(() => '')
  )

  customElements.define('cm-icon', class extends HTMLElement {
    constructor() {
      super()

      this.setAttribute('alt', this.textContent.trim())

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

      let $icon
      let $title

      this.updateIcon = () => $icon?.setAttribute('href', '#' + PREFIX + this.name)
      this.updateTitle = () => {
        if (this.alt) {
          if (!$title) $icon.parentNode.insertBefore($icon, $title = document.createElement('title'))
          $title.textContent = this.alt
        } else if ($title) $title.remove()
      }

      getIcons()

      this.innerHTML = ''
      this.append(Object.assign(document.createElement('template'), {
        innerHTML: `
          <svg class="Icon-svg" viewBox="0 0 24 24">
            ${this.alt && `<title>${this.alt}</title>`}
            <use href="#${PREFIX}${this.name}"></use>
          </svg>
        `
      }).content)
      $icon = this.querySelector('use')
      $title = this.querySelector('title')
    }

    static get observedAttributes() { return ['name'] }

    attributeChangedCallback(name) {
      switch (name) {
        case 'name':
          return this.updateIcon()
        case 'alt':
          return this.updateTitle()
      }
    }
  })
})();

(CM => {
  customElements.define('cm-list', class extends HTMLElement {
    constructor() {
      super()

      this.addEventListener('click', ev => {
        let $opt = ev.target.closest('li')
        if (!$opt) return console.warn('Click from non-list-item element', ev.target)

        // Check for suboptions and/or other suboptions that are currently open
        let $subopts = $opt.querySelector('.List-l2')
        let $otherSubopts = $opt.closest('.List-l1').querySelector('input:checked ~ .List-l2')
        if (!$subopts && !$otherSubopts) return // no, we don't

        ev.preventDefault()

        let $input = $opt.firstElementChild

        let flips = []
        if ($otherSubopts) flips.push(CM.animation.startFLIP($otherSubopts, { properties: { height: true, visibility: true }}))

        let $eventTarget = $input

        if ($subopts) {
          flips.push(CM.animation.startFLIP($subopts, { properties: { height: true, visibility: true } }))
          let $first = $subopts.querySelector('input[type=radio]')
          if ($first) $first.checked = true
          if ($first?.value) $eventTarget = $first
        }

        $input.checked = true
        $eventTarget.dispatchEvent(new Event('change', { bubbles: true }))
        flips.forEach(f => f())
      }, false)
    }
  })
})(window.__CM = window.__CM || {});

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

      let renderPaginator = () => {
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
      }
      let updatePages = $$pageSet => {
        let { total, current } = this
        let pageCount = $$pageSet.length
        let pagesOnSide = (pageCount - 1) / 2

        let pageMin = Math.max(1, Math.min(total - pageCount, current - pagesOnSide))
        let pageMax = Math.min(total, pageMin + pagesOnSide * 2)

        $$pageSet.forEach(($, i) => {
          let pageNo = pageMin + i
          $.hidden = pageNo > pageMax
          $.dataset.target = $.textContent = pageNo
          $.title = 'page ' + pageNo + (pageNo === total ? ' (last page)' : '')
          $.disabled = pageNo === current
        })

        return { pageMin, pageMax }
      }
      let updatePaginator = this.updatePaginator = () => {
        let { total, current } = this

        // Calculate the page range to be shown
        let { pageMin, pageMax } = updatePages($$pages)
        updatePages($$pagesMobile)

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
        $last.dataset.target = $last.textContent = total
        $last.disabled = isLast
        $last.title = 'page ' + total + ' (last page)'
        $moreNext.hidden = !hasRightGap || !showExtraButtons
      }

      let onPage = pageNo => {
        this.current = pageNo
        this.dispatchEvent(new Event('change'))
      }

      renderPaginator()
      updatePaginator()
      this.onclick = ev => {
        let $target = ev.target.closest('button[data-target]:not([disabled])')
        if (!$target) return
        onPage($target.dataset.target)
      }
    }

    static get observedAttributes() { return ['total', 'current'] }

    attributeChangedCallback() {
      this.updatePaginator()
    }
  })
})();

(CM => {
  'use strict'

  customElements.define('cm-popup', class extends HTMLElement {
    constructor() {
      super()

      let defaultIcon
      let defaultAlt

      let $details = this.firstElementChild
      let $button = $details.firstElementChild
      let $dialog = $details.lastElementChild
      let $icon = $button.querySelector(':scope > cm-icon')
      let gap = CM.properties.getEmOrRemSize(CM.properties.getCompStyl(this).getPropertyValue('--style-popup-gap'), $button)

      if ($icon) {
        defaultIcon = $icon.name
        defaultAlt = $icon.alt
      }

      let updateIcon = () => {
        if ($icon) {
          if ($details.open) {
            $icon.name = 'x'
            $icon.alt = 'close'
          }
          else {
            $icon.name = defaultIcon
            $icon.alt = defaultAlt
          }
        }
      }
      let updatePopupOrientation = () => {
        let pos = CM.position.relPos($button, $dialog, gap)
        let direction
        let alignment
        if (pos.isWide) {
          direction = CM.position.DIR_BELOW
          alignment = CM.position.ALIGN_LEFT
          if (!pos.clearsBottom) direction = CM.position.DIR_ABOVE
          if (!pos.overhangsRight) alignment = CM.position.ALIGN_RIGHT
        } else {
          direction = CM.position.DIR_RIGHT
          alignment = CM.position.ALIGN_TOP
          if (!pos.clearsRight) direction = CM.position.DIR_LEFT
          if (!pos.overhangsBottom) alignment = CM.position.ALIGN_BOTTOM
        }
        let p = CM.position.position(direction, alignment, pos)
        let s = $dialog.style
        s.setProperty('--popup-dialog-top', p.top)
        s.setProperty('--popup-dialog-left', p.left)
        s.setProperty('--popup-dialog-right', p.right)
        s.setProperty('--popup-dialog-bottom', p.bottom)
      }

      $details.addEventListener('toggle', () => {
        updateIcon()
        if ($details.open) updatePopupOrientation()
      })

      this.onStop = [
        CM.events.onClickOutside(this, ev => {
          if ($dialog.contains(ev.target)) return
          $details.open = false
        }),
        CM.events.onLayoutChange(() => {
          if ($details.open) updatePopupOrientation()
        }),
      ]
      updatePopupOrientation()
    }

    disconnectedCallback() {
      this.onStop.forEach(f => f())
    }
  })
})(window.__CM = window.__CM || {});

(() => {
  'use strict'

  customElements.define('cm-scrollbox-relay', class extends HTMLElement {
    constructor() {
      super()

      this.firstElementChild.addEventListener('scroll', () =>
        window.dispatchEvent(new Event('scroll'))
      )
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

      let $btn = this.querySelector('.Sidebar-toggle-button')

      let onToggleOpenExtras = () => this.toggleAttribute('open')
      let onCloseExtras = () => this.removeAttribute('open')

      if ($btn) $btn.onclick = onToggleOpenExtras
      CM.events.onClickOutside(this, onCloseExtras)
    }
  })
})(window.__CM = window.__CM || {});

(CM => {
  'use strict'

  let gap = parseFloat(CM.properties.getCSSProp('style-gap-n'))

  customElements.define('cm-table', class extends HTMLElement {
    constructor() {
      super()

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
          let top = this.getBoundingClientRect().top - clearHeight - gap
          if (top > 0) return stopAdjusting()
          $thead.style.setProperty('--table-pos-adjust', -top + 'px')
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
      }

      stopAdjusting()
      updateColWidth()
      this.onStop = [
        stopAdjusting,
        CM.events.onLayoutChange(updateColWidth)
      ]
    }

    disconnectedCallback() {
      this.onStop.forEach(f => f())
    }
  })
})(window.__CM = window.__CM || {});

(() => {
  'use strict'

  customElements.define('cm-tabs', class extends HTMLElement {
    constructor() {
      super()

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
      this.addEventListener('change', ev => {
        let $input = ev.target
        if ($activeTab) $activeTab.hidden = true
        $activeTab = $$tabContent[$input.value]
        if (!$activeTab) return // no content associated with tabs
        $activeTab.hidden = false
      })
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
    constructor() {
      super()

      this.PRIORITY = {
        info: 'info',
        success: 'success',
        warning: 'warning',
        error: 'error',
      }
    }

    appendToast(content, options) {
      let { title, icon, actionCallback, actionLabel, priority = 'info' } = options || {}
      icon = icon ?? PRIORITY_ICONS[priority]
      let hasAction = actionCallback && actionLabel

      let $toast = document.createElement('cm-toast')
      $toast.innerHTML = `
        <article class="${PRIORITY_CLASSES[priority]}">
          ${icon ? `<cm-icon name=${icon}></cm-icon>` : ''}
          ${title ? `<h2 class="Toast-title">${title}</h2>` : ''}
          ${icon || title ? `<hr>` : ''}
          <p class="Toast-content">${content}</p>
          ${hasAction ? `<button class="${PRIORITY_BTN_CLASS[priority]} Toast-action-button">${actionLabel}</button>` : ''}
          <button class="${PRIORITY_BTN_CLASS[priority]} Toast-close-button">
            <cm-icon name="x">Dismiss this message</cm-icon>
          </button>
        </article>
      `

      if (hasAction) {
        let $btn = $toast.querySelector('.Toast-action-button')
        if ($btn) $btn.onclick = ev => actionCallback(ev, $toast)
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

      this.onclick = ev => {
        if (!ev.target.closest('.Toast-close-button')) return
        clearTimeout(this.timer)
        this.clearToast()
      }
      this.onmouseenter = () => {
        clearTimeout(this.timer)
      }
      this.onmouseleave = () => {
        this.connectedCallback()
      }
    }

    clearToast() {
      this.ontransitionend = () => this.remove()
      this.onanimationend = () => this.remove()
      this.classList.add('Toast-clear')
    }

    connectedCallback() {
      requestAnimationFrame(() => this.classList.add('Toast-shown'))
      this.timer = setTimeout(() => this.clearToast(), TOAST_DURATION)
    }
  })
})();

(() => {
  'use strict'

  customElements.define('cm-calendar', class extends HTMLElement {
    constructor() {
      super()

      Object.defineProperties(this, {
        max: {
          set: x => this.setAttribute('max', x),
          get: () => this.getAttribute('max'),
        },
        min: {
          set: x => this.setAttribute('min', x),
          get: () => this.getAttribute('min'),
        },
      })

      let $trigger = this.firstElementChild

      if (!$trigger) return console.warn('Calendar requires at least one element child to serve as a trigger')

      let $calendarBody = Object.assign(document.createElement('div'), {
        hidden: true,
        className: 'Panel',
        innerHTML: `
          <aside class="Dialog">
            <formset>
              <div class="Calendar-header">
                <button class=""
              </div>
            </formset>
          </aside>
        `
      })
    }
  })
})();

