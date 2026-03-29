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
        child.classList.toggle('custom-selected', matches)
        if (matches) found = true
      }
      if (found) window.scrollTo(0, 0)
    }
  }
)
