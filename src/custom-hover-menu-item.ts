import { LiteElement, html, css } from '@vandeurenglenn/lite'
import { customElement, property } from '@vandeurenglenn/lite'
import Router from './routing.js'

@customElement('custom-hover-menu-item')
export class CustomHoverMenuItem extends LiteElement {
  @property({ attribute: true })
  accessor name: String

  _click(event) {
    const target = event.target
    const selected = target.getAttribute('route') ?? target.getAttribute('name')
    target.classList.add('custom-selected')
    location.hash = Router.bang(selected)
  }

  firstRender(): void {
    this.addEventListener('click', this._click)
  }

  static styles = [
    css`
      :host {
        display: flex;
        padding: 6px 12px;
        align-items: center;
        box-sizing: border-box;
        cursor: pointer;
        border-radius: 30px;
        width: 100%;
        white-space: nowrap;
        margin: auto;
        height: 50px;
      }

      :host(:hover) {
        background-color: var(--md-sys-color-secondary-container);
        color: var(--md-sys-color-on-secondary-container);
      }

      :host(.custom-selected) {
        background-color: var(--md-sys-color-secondary-container);
        color: var(--md-sys-color-on-secondary-container);
      }
      @media (max-width: 1280px) {
        :host {
          margin: unset
        }
      }
    `
  ]

  render() {
    return html` ${this.name} `
  }
}
