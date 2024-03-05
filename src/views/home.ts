import { html, css, LiteElement, query } from '@vandeurenglenn/lite'
import { customElement } from 'lit/decorators.js'

@customElement('home-view')
export class HomeView extends LiteElement {
  static styles = [
    css`
      :host {
        display: flex;
        flex-direction: row;
        box-sizing: border-box;
        padding: 12px 0 12px 24px;
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
    `
  ]

  render() {
    return html`
    <flex-container>
    <div id="logo">
    <img src="/img/full.png"/>
    </div>    
    </flex-container>

    `
  }
}
