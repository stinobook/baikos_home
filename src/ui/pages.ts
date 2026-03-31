customElements.define(
  'baiko-pages',
  class BaikoPages extends HTMLElement {
    #attrForSelected = 'route'
    #enterTimer: number | null = null

    rendered = Promise.resolve()

    connectedCallback() {
      this.#attrForSelected = this.getAttribute('attr-for-selected') || 'route'
    }

    select(value: string) {
      const children = this.children as HTMLCollectionOf<HTMLElement>
      let nextChild: HTMLElement | null = null

      for (const child of children) {
        if (child.getAttribute(this.#attrForSelected) === value) {
          nextChild = child
          break
        }
      }

      if (!nextChild) return

      // Switch instantly to avoid flash/fade artifacts on view changes.
      nextChild.classList.add('custom-selected')
      nextChild.style.opacity = ''
      nextChild.style.transition = ''

      // Apply a very subtle enter animation so text changes feel less abrupt.
      nextChild.classList.remove('page-enter')
      void nextChild.offsetWidth
      nextChild.classList.add('page-enter')

      if (this.#enterTimer !== null) window.clearTimeout(this.#enterTimer)
      this.#enterTimer = window.setTimeout(() => {
        nextChild.classList.remove('page-enter')
        this.#enterTimer = null
      }, 180)

      for (const child of children) {
        if (child === nextChild) continue
        child.classList.remove('custom-selected')
        child.classList.remove('page-enter')
        child.style.opacity = ''
        child.style.transition = ''
      }
      // Let the browser keep visual viewport stable on iOS during hash navigation.
    }
  }
)
