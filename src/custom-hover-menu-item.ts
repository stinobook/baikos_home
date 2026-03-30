import { html, css, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import Router from './routing.js'

@customElement('custom-hover-menu-item')
export class CustomHoverMenuItem extends LitElement {
  @property({ attribute: true })
  accessor name: String

  @property({ attribute: true })
  accessor route: string

  _click(event) {
    const target = event.target
    const route = target.getAttribute('route')
    
    // Don't navigate if this is a parent menu item (no route attribute)
    if (!route) {
      event.preventDefault()
      event.stopPropagation()
      return
    }
    
    const selected = route ?? target.getAttribute('name')
    target.classList.add('custom-selected')
    location.hash = Router.bang(selected)
  }

  firstUpdated(): void {
    this.addEventListener('click', this._click)
  }

  static styles = [
    css`
      :host {
        display: flex;
        padding: 6px 16px;
        align-items: center;
        box-sizing: border-box;
        cursor: pointer;
        border-radius: 30px;
        width: 100%;
        white-space: nowrap;
        margin: auto;
        height: 40px;
        font-size: 0.95rem;
        font-weight: 500;
        letter-spacing: 0.2px;
        transition:
          background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1),
          color 0.2s cubic-bezier(0.4, 0, 0.2, 1),
          transform 0.15s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
        overflow: hidden;
      }

      :host::after {
        content: '';
        position: absolute;
        inset: 0;
        background: var(--md-sys-color-secondary-container);
        opacity: 0;
        border-radius: 30px;
        transition: opacity 0.2s ease;
        pointer-events: none;
      }

      :host(:hover) {
        background-color: color-mix(in srgb, var(--md-sys-color-secondary-container) 80%, transparent);
        color: var(--md-sys-color-on-secondary-container);
      }

      :host(:active) {
        transform: scale(0.96);
      }

      :host(.custom-selected) {
        background-color: var(--md-sys-color-primary);
        color: var(--md-sys-color-on-primary);
        font-weight: 600;
        box-shadow: 0 2px 10px color-mix(in srgb, var(--md-sys-color-primary) 40%, transparent);
      }

      @media (max-width: 1280px) {
        :host {
          margin: unset;
          height: 48px;
          padding: 8px 16px;
          font-size: 1rem;
        }
      }
    `
  ]

  render() {
    return html` ${this.name} `
  }
}
