customElements.define(
  'baiko-pages',
  class BaikoPages extends HTMLElement {
    #attrForSelected = 'route'

    rendered = Promise.resolve()

    connectedCallback() {
      this.#attrForSelected = this.getAttribute('attr-for-selected') || 'route'
    }

    select(value: string) {
      let found = false
      for (const child of this.children as HTMLCollectionOf<HTMLElement>) {
        const matches = child.getAttribute(this.#attrForSelected) === value
        if (matches) {
          child.style.opacity = '0'
          child.style.transition = ''
          child.classList.add('custom-selected')
          // Two rAFs: first commits display:block at opacity:0, second starts the transition
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              child.style.transition = 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              child.style.opacity = '1'
              setTimeout(() => {
                if (child.classList.contains('custom-selected')) {
                  child.style.transition = ''
                  child.style.opacity = ''
                }
              }, 350)
            })
          })
          found = true
        } else {
          child.classList.remove('custom-selected')
          child.style.opacity = ''
          child.style.transition = ''
        }
      }
      // Let the browser keep visual viewport stable on iOS during hash navigation.
    }
  }
)
