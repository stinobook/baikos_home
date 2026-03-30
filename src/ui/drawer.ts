import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('drawer-element')
export class DrawerElement extends LitElement {
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
        width: 100%;
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

      .close-button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        min-width: 40px;
        border: none;
        cursor: pointer;
        background: transparent;
        color: var(--md-sys-color-on-surface);
        border-radius: 50%;
        padding: 0;
        transition: background-color 0.2s ease;
      }

      .close-button:hover {
        background-color: color-mix(in srgb, var(--md-sys-color-on-surface) 10%, transparent);
      }

      .close-button svg {
        width: 24px;
        height: 24px;
        fill: currentColor;
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
    return html`
      <div class="header">
        <button
          class="close-button"
          @click=${() => document.dispatchEvent(new CustomEvent('drawer-open', { detail: false }))}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </button>
        <slot name="logoname"></slot>
      </div>
      <slot></slot>
    `
  }
}
