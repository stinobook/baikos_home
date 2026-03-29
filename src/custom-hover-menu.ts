import { LiteElement, html, css, customElement, property } from '@vandeurenglenn/lite'
import './custom-hover-menu-item.js'

@customElement('custom-hover-menu')
export class CustomHoverMenu extends LiteElement {
  @property({ attribute: true })
  accessor name: string

  @property({ attribute: true })
  accessor route: string

  @property({ attribute: true, type: Boolean })
  accessor open: boolean = false

  static styles = [
    css`
      :host {
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        position: relative;
        justify-content: flex-start;
        align-items: flex-end;
        width: 100%;
      }

      .sub-menu-container {
        overflow: hidden;
        pointer-events: none;
        z-index: 1000;
        position: absolute;
        top: 100%;
        padding-top: 8px;
        max-height: 0;
        opacity: 0;
        transition:
          max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1),
          opacity 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        left: 50%;
        transform: translateX(-50%);
        white-space: nowrap;
        filter: drop-shadow(0 4px 16px rgba(0,0,0,0.2));
      }

      .sub-menu {
        background-color: color-mix(in srgb, var(--md-sys-color-surface) 85%, transparent);
        backdrop-filter: blur(16px) saturate(1.4);
        -webkit-backdrop-filter: blur(16px) saturate(1.4);
        color: var(--md-sys-color-on-surface);
        border-radius: 0 0 24px 24px;
        padding: 6px;
        border: 1px solid color-mix(in srgb, var(--md-sys-color-surface) 40%, transparent);
        border-top: none;
        box-shadow:
          0 4px 24px rgba(0, 0, 0, 0.18),
          0 1px 0 rgba(255, 255, 255, 0.08) inset;
      }

      :host(:hover) .sub-menu-container {
        pointer-events: auto;
        max-height: 1000px;
        opacity: 1;
        transition:
          max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1),
          opacity 0.25s cubic-bezier(0.4, 0, 0.2, 1);
      }

      :host(:hover) custom-hover-menu-item,
      :host(.custom-selected) custom-hover-menu-item {
        background-color: var(--md-sys-color-primary);
        color: var(--md-sys-color-on-primary);
        box-shadow: 0 2px 10px color-mix(in srgb, var(--md-sys-color-primary) 40%, transparent);
      }

      /* Drawer styles */
      :host([type='drawer']) .sub-menu {
        background-color: color-mix(in srgb, var(--md-sys-color-surface-container-highest) 95%, transparent);
        color: var(--md-sys-color-on-secondary-container);
        box-shadow: none;
        border-radius: 20px;
        border: 1px solid color-mix(in srgb, var(--md-sys-color-outline) 12%, transparent);
        margin-top: 6px;
      }

      :host([type='drawer']) .sub-menu-container {
        left: 0;
        transform: translateX(0);
      }

      :host([type='drawer'][open]) .sub-menu-container {
        position: relative;
        top: 0;
        max-height: 1000px;
        opacity: 1;
        pointer-events: auto;
        left: 0;
        transform: translateX(0);
        width: 100%;
        transition:
          max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1),
          opacity 0.25s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .drawer-trigger {
        display: flex;
        padding: 8px 16px;
        align-items: center;
        box-sizing: border-box;
        cursor: pointer;
        border-radius: 30px;
        width: 100%;
        white-space: nowrap;
        height: 48px;
        font-size: 1rem;
        font-weight: 500;
        letter-spacing: 0.2px;
        color: inherit;
        transition:
          background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1),
          color 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .drawer-trigger:hover {
        background-color: color-mix(in srgb, var(--md-sys-color-secondary-container) 80%, transparent);
        color: var(--md-sys-color-on-secondary-container);
      }
    `
  ]

  render() {
    const isDrawer = this.getAttribute('type') === 'drawer'
    return html`
      ${isDrawer
        ? html`<div class="drawer-trigger" @click=${() => { this.open = !this.open }}>${this.name}</div>`
        : html`<custom-hover-menu-item .name=${this.name} .route=${this.route ?? null}></custom-hover-menu-item>`
      }
      <div class="sub-menu-container">
        <div class="sub-menu">
          <slot name="sub-menu"></slot>
        </div>
      </div>
    `
  }
}
