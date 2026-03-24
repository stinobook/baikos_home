import { LiteElement, html, css, customElement, property } from '@vandeurenglenn/lite'
import '@vandeurenglenn/lite-elements/icon-button.js'

@customElement('header-element')
export class HeaderElement extends LiteElement {
  static styles = [
    css`
      :host {
        display: flex;
        width: 100%;
        height: 72px;
        box-sizing: border-box;
        padding: 10px 20px;
        align-items: center;
        gap: 12px;
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

      custom-icon-button {
        opacity: 0;
        pointer-events: none;
        position: absolute;
        z-index: 1;
      }

      @media (max-width: 1280px) {
        :host {
          height: 64px;
          padding: 8px 16px;
        }
        custom-icon-button {
          position: initial;
          opacity: 1;
          pointer-events: auto;
          background-color: color-mix(in srgb, var(--md-sys-color-surface) 90%, transparent);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          color: var(--md-sys-color-on-surface);
          border-radius: 50%;
          box-shadow: 0 2px 12px rgba(0,0,0,0.15);
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
