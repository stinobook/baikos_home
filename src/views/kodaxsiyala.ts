import { html, css, LiteElement } from '@vandeurenglenn/lite'
import { customElement } from 'lit/decorators.js'
import '../components/post.js'

@customElement('kodaxsiyala-view')
export class KodaxsiyalaView extends LiteElement {
  static styles = [
    css`
      :host {
        overflow-y: auto;
        padding-bottom: 12px;
        flex-direction: column;
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
      flex-container {
        max-width: 1280px;
        margin: 0 auto;
      }
      @media (max-width: 1280px) {
        :host {
          padding-bottom: 0px;
        }
        flex-container {
          border-radius: 0px;
        }
      }
      post-element:nth-of-type(even) {
        --flex-direction: row;
      }
      post-element:nth-of-type(odd) {
        --flex-direction: row-reverse;
      }

    `
  ]

  render() {
    return html`
    <flex-container>
      <post-element
        image="./img/litters/kodaxsiyala.webp"
        headline="Koda x Siyala"
        subline="23 Mei 2025"
        .content=${html`
        <ul>
            <li>Teef 1 - 16:35 - 412g - Brown Sable Merle</li>
            <li>Reu&nbsp;&nbsp;1 - 16:41 - 334g - Brown Sable</li>
            <li>Teef 2 - 17:10 - 330g - Brown Tricolor</li>
            <li>Reu&nbsp;&nbsp;2 - 17:16 - 260g - Brown Sable</li>
            <li>Reu&nbsp;&nbsp;3 - 17:40 - 398g - Brown Sable Merle</li>
            <li>Teef 3 - 17:53 - 300g - Brown (Hidden Tricolor)</li>
        </ul>
            `}
      ></post-element>
    </flex-container>
    `
  }
}
