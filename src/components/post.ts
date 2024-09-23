import { LiteElement, customElement, html, property } from '@vandeurenglenn/lite'
import { StyleList, css } from '@vandeurenglenn/lite/element'

@customElement('post-element')
export class PostElement extends LiteElement {
  @property()
  accessor image

  @property()
  accessor headline

  @property()
  accessor subline

  @property()
  accessor content

  static styles?: StyleList = [
    css`
      :host {
        width: 100%;
      }
      :host * {
        box-sizing: border-box;
      }
      .card {
        display: flex;
        margin: 1rem auto;
        box-shadow: 0 3px 7px -1px rgba(#000, .1);
        line-height: 1.4;
        justify-content: center;
        flex-wrap: wrap;
        flex-direction: var(--flex-direction);
        align-items: stretch;
        align-content: stretch;
        gap: 12px;
        padding: 12px;
      }
      .img {
        flex: 1 1 30%;
        min-height:150px;
        align-items: center;
        display: flex;
      }
      img {
        width: 100%;
        max-height:300px;
        object-fit: contain;
        border-radius: 5px;
      }
      .content {
        padding: 1rem;
        position: relative;
        flex: 3 0 65%;
      }
      h1 {
        line-height: 1;
        margin: 0;
        font-size: 1.7rem;
      }
      h2 {
        font-size: 1rem;
        font-weight: 300;
        margin-top: 5px;
      }
      p {
        position: relative;
        margin-bottom: 12px;
      }
      custom-icon {
        --custom-icon-color: var(--md-sys-color-on-primary);
      }
      custom-button {
        margin-bottom: 12px;
      }
      th {
        text-align: left;
      }
      tr, td, th {
        padding: 0 12px;
      }
      @media (max-width: 640px) {
        .card {
          flex-direction: column;
        }
        img {
          margin: 0 auto;
          width: auto;
          max-width: 100%;
        }
      }
    `
  ]

  _renderImage() {
    if (!this.image) return ''
    return html` <div class="img"><img loading="lazy" src=${this.image} /></div> `
  }

  _renderHeadline() {
    if (!this.headline) return ''
    return html`<h1>${this.headline}</h1>`
  }

  _renderSubline() {
    if (!this.subline) return ''
    return html`<h2>${this.subline}</h2>`
  }

  _renderContent() {
    if (!this.content) return ''
    return html`<p>${this.content}</p>`
  }

  render() {
    return html`
    <div class="card">
        ${this._renderImage()}
      <div class="content">
        ${this._renderHeadline()} 
        ${this._renderSubline()}
        ${this._renderContent()}
       <slot></slot>
      </div>
    </div>
    `
  }
}