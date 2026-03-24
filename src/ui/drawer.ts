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
        padding: 0 20px 20px;
        background-color: color-mix(in srgb, var(--md-sys-color-primary) 18%, var(--md-sys-color-surface));
        backdrop-filter: blur(20px) saturate(1.5);
        -webkit-backdrop-filter: blur(20px) saturate(1.5);
        color: var(--md-sys-color-on-surface);
        height: 100%;
        width: min(320px, 85vw);
        position: fixed;
        left: 0;
        top: 0;
        pointer-events: none;
        transform: translateX(-100%);
        transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1),
                    box-shadow 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        z-index: 1000;
        gap: 8px;
        box-shadow: none;
        border-right: 1px solid color-mix(in srgb, var(--md-sys-color-outline) 20%, transparent);
        overflow-y: auto;
      }

      :host([open]) {
        pointer-events: auto;
        transform: translateX(0);
        box-shadow: 8px 0 40px rgba(0, 0, 0, 0.25);
      }

      .header {
        height: 64px;
        min-height: 64px;
        padding: 8px 0;
        display: flex;
        align-items: center;
        gap: 12px;
        border-bottom: 1px solid color-mix(in srgb, var(--md-sys-color-outline) 15%, transparent);
        margin-bottom: 8px;
      }

      custom-icon-button {
        pointer-events: none !important;
        z-index: 0;
      }

      :host([open]) custom-icon-button {
        pointer-events: auto;
      }

      ::-webkit-scrollbar {
        width: 4px;
      }
      ::-webkit-scrollbar-thumb {
        background: color-mix(in srgb, var(--md-sys-color-outline) 40%, transparent);
        border-radius: 4px;
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
