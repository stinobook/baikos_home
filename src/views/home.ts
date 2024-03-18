import { html, css, LiteElement, query } from '@vandeurenglenn/lite'
import { customElement } from 'lit/decorators.js'
import '@vandeurenglenn/flex-elements/container.js'

@customElement('home-view')
export class HomeView extends LiteElement {
  static styles = [
    css`
      :host {
      }
      ::-webkit-scrollbar {
        width: 8px;
        border-radius: var(--md-sys-shape-corner-extra-large);
        background-color: var(--md-sys-color-surface-container-highest);
      }
      ::-webkit-scrollbar-thumb {
        background: var(--md-sys-color-on-surface-container-highest);
        border-radius: var(--md-sys-shape-corner-extra-large);
        box-shadow: 0px 0px 6px 2px rgba(0, 0, 0, 0.5) inset;
      }
      img{
        max-width:100%;
        max-height: calc(100vh - 50px - 24px - 24px);
        object-fit:contain;
      }
      flex-container {
        width: 100vh;
        margin: auto;
      }
    `
  ]

  render() {
    return html`
    <flex-container>
    <img src="/img/full.png" />
    </flex-container>
    `
  }
}
