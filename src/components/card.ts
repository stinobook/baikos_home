import { LiteElement, customElement, html, property } from '@vandeurenglenn/lite'
import { css, StyleList } from '@vandeurenglenn/lite/element'

@customElement('card-element')
export class CardElement extends LiteElement {
  @property() accessor image: string
  @property() accessor title: string
  @property() accessor description
  @property() accessor price: string
  @property() accessor link: string
  @property() accessor linkLabel: string = 'Meer info'

  static styles?: StyleList = [
    css`
        :host {
        display: flex;
        background-color: var(--md-sys-color-surface);
        border-radius: var(--md-sys-shape-corner-medium);
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        overflow: hidden;
        transition: all 0.3s ease;
        height: auto;
        min-height: 0;
        flex-direction: column;
        gap: 32px;
        margin: 6px;
        width: 100%;
        max-width: 620px;
        min-width: 300px;
        }
        :host(:hover) {
        transform: translateY(-8px);
        box-shadow: 0 12px 24px rgba(0,0,0,0.15);
        }
        .service-image {
        width: 100%;
        height: 220px;
        object-fit: cover;
        transition: transform 0.5s ease;
        display: block;
        }
        :host(:hover) .service-image {
        transform: scale(1.05);
        }
        .service-content {
        padding: 24px;
        display: flex;
        flex-direction: column;
        flex: 1 1 auto;
        min-height: 0;
        }
        .service-title {
        font-size: 1.6rem;
        font-weight: 600;
        margin-bottom: 12px;
        color: var(--md-sys-color-on-surface);
        position: relative;
        padding-bottom: 10px;
        }
        .service-title:after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 60px;
        height: 3px;
        background-color: var(--md-sys-color-primary);
        }
        .service-description {
        margin-bottom: 24px;
        color: var(--md-sys-color-on-surface-variant);
        line-height: 1.6;
        flex-grow: 1;
        }
        .service-price {
        font-weight: 600;
        color: var(--md-sys-color-primary);
        margin-bottom: 16px;
        }
        .service-button {
        background-color: var(--md-sys-color-primary-container);
        color: var(--md-sys-color-on-primary-container);
        padding: 12px 24px;
        border: none;
        border-radius: var(--md-sys-shape-corner-small);
        cursor: pointer;
        text-decoration: none;
        display: inline-block;
        text-align: center;
        font-weight: 500;
        transition: background-color 0.3s ease;
        }
        .service-button:hover {
        background-color: var(--md-sys-color-secondary-container);
        }

      .ul {
        margin: 0 0 24px 20px;
        padding: 0;
        color: var(--md-sys-color-on-surface-variant);
      }
      
      li {
        margin-bottom: 8px;
        position: relative;
        line-height: 1.5;
      }
      
      li::before {
        content: "•";
        color: var(--md-sys-color-primary);
        font-weight: bold;
        display: inline-block;
        width: 20px;
        margin-left: -20px;
      }
        @media (max-width: 600px) {
        .service-image {
            height: 160px;
        }
        .service-title {
            font-size: 1.3rem;
        }
        .service-description {
            font-size: 0.95rem;
        }
        }
        `
    ]

  render() {
    return html`
      ${this.image ? html`<img class="service-image" src=${this.image} alt=${this.title ?? ''}>` : ''}
      <div class="service-content">
        ${this.title ? html`<h3 class="service-title">${this.title}</h3>` : ''}
        ${this.description ? html`<p class="service-description">${this.description}</p>` : ''}
        ${this.price ? html`<p class="service-price">${this.price}</p>` : ''}
        <flex-it></flex-it>
        ${this.link ? html`
          <a class="service-button" href=${this.link}>${this.linkLabel}</a>
        ` : ''}
        <slot></slot>
      </div>
    `
  }
}
