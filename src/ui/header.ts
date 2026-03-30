import { LitElement, html, css } from 'lit'
import { customElement } from 'lit/decorators.js'

@customElement('header-element')
export class HeaderElement extends LitElement {
  static styles = [
    css`
      :host {
        display: flex;
        height: 72px;
        box-sizing: border-box;
        padding: 10px 20px;
        align-items: center;
        gap: 12px;
        margin: 16px auto;
        max-width: 1280px;
        width: 100%;
      }

      [name='nav-bar']::slotted(*) {
        display: flex;
        justify-content: space-between;
        background-color: color-mix(in srgb, var(--md-sys-color-surface) 85%, transparent);
        backdrop-filter: blur(16px) saturate(1.4);
        -webkit-backdrop-filter: blur(16px) saturate(1.4);
        color: var(--md-sys-color-on-surface);
        border-radius: 40px;
        height: 52px;
        padding: 6px 8px;
        gap: 4px;
        box-shadow:
          0 4px 24px rgba(0, 0, 0, 0.18),
          0 1px 0 rgba(255, 255, 255, 0.08) inset;
        border: 1px solid color-mix(in srgb, var(--md-sys-color-surface) 40%, transparent);
        transition: box-shadow 0.3s ease;
      }

      [name='nav-bar']::slotted(*:hover) {
        box-shadow:
          0 8px 32px rgba(0, 0, 0, 0.22),
          0 1px 0 rgba(255, 255, 255, 0.10) inset;
      }

      .flex-it {
        flex: 1;
      }

      .menu-button {
        display: none;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        min-width: 40px;
        border: none;
        cursor: pointer;
        background-color: color-mix(in srgb, var(--md-sys-color-surface) 90%, transparent);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        color: var(--md-sys-color-on-surface);
        border-radius: 50%;
        box-shadow: 0 2px 12px rgba(0,0,0,0.15);
        padding: 0;
      }

      .menu-button svg {
        width: 24px;
        height: 24px;
        fill: currentColor;
      }

      @media (max-width: 1280px) {
        :host {
          height: 64px;
          padding: 8px 16px;
          margin: 12px auto;
        }
        .menu-button {
          display: flex;
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
      <button
        class="menu-button"
        @click=${() => document.dispatchEvent(new CustomEvent('drawer-open', { detail: true }))}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
        </svg>
      </button>
      <slot></slot>
      <div class="flex-it"></div>
      <slot name="nav-bar"></slot>
      <div class="flex-it"></div>
    `
  }
}
