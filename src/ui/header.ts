import { LiteElement, html, css, customElement, property } from '@vandeurenglenn/lite'
import '@vandeurenglenn/lite-elements/icon-button.js'

@customElement('header-element')
export class HeaderElement extends LiteElement {
  static styles = [
    css`
      :host {
        display: flex;
        width: 100%;
        height: 100px;
        box-sizing: border-box;
        padding: 12px 24px;
        align-items: center;
        gap:12px;
      }

      [name='nav-bar']::slotted(*) {
        display: flex;
        justify-content: space-between;
        background-color: var(--md-sys-color-surface);
        color: var(--md-sys-color-on-surface);
        border-radius: 30px;
        height: 50px;
        padding: 6px;
        gap: 6px;
        box-shadow: rgba(0, 0, 0, 0.281) 0px 3px 3px;
      }

      custom-icon-button {
        opacity: 0;
        pointer-events: none;
        position: absolute;
        z-index:1;
      }

      @media (max-width: 1280px) {
        custom-icon-button {
          position: initial;
          opacity: 1;
          pointer-events: auto;
          background-color: var(--md-sys-color-surface);
          color: var(--md-sys-color-on-surface);
          border-radius: 30px;
        }
        [name='nav-bar']::slotted(*) {
          opacity: 0;
          position: absolute;
          pointer-events: none;
        }
      }
    `
  ]

  render() {
    return html`
      <custom-icon-button
        icon="menu"
        @click=${() => document.dispatchEvent(new CustomEvent('drawer-open', { detail: true }))}></custom-icon-button>
      <slot></slot>
      <flex-it></flex-it>
      <slot name="nav-bar"></slot>
    `
  }
}
