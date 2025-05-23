import { LiteElement, html, css, customElement, property } from '@vandeurenglenn/lite'
import '@vandeurenglenn/lite-elements/icon-button.js'

@customElement('drawer-element')
export class DrawerElement extends LiteElement {
  @property({ type: Boolean, reflect: true }) accessor open
  static styles = [
    css`
      :host {
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        padding: 0px 24px 12px;
        background-color: var(--md-sys-color-surface);
        color: var(--md-sys-color-on-surface);
        height: 100%;
        width: 100%;
        position: fixed;
        pointer-events: none;
        transform:translateY(-125%);
        transition: transform 0.5s ease-in-out;
        z-index:1000;
        gap: 12px;
      }

      :host([open]) {
        pointer-events: auto;
        z-index: 1000;
        transition: transform 0.5s ease-in-out;
        transform:translateY(0);
      }

      .header {
        height: 60px;
        padding: 12px 0px;
        display: flex;
        align-items: center;
        gap:12px;
      }
      custom-icon-button {
        pointer-events: none !important;
        z-index:0;
      }
      :host([open]) custom-icon-button {
        pointer-events: auto;
      }
    `
  ]

  render() {
    return html`<div class="header"><custom-icon-button
        icon="menu_open"
        @click=${() => document.dispatchEvent(new CustomEvent('drawer-open', { detail: false }))}></custom-icon-button>
        <slot name="logoname"></slot>
        </div><slot></slot> `
  }
}
