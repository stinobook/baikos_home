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
          background-color: color-mix(in srgb, var(--md-sys-color-surface) 97%, transparent);
          border-radius: 20px;
          box-shadow:
            0 2px 8px rgba(0,0,0,0.06),
            0 8px 24px rgba(0,0,0,0.08);
          border: 1px solid color-mix(in srgb, var(--md-sys-color-outline) 10%, transparent);
          overflow: hidden;
          transition:
            transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
            box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          height: auto;
          min-height: 0;
          flex-direction: column;
          gap: 0;
          margin: 6px;
          width: 100%;
          max-width: 620px;
          min-width: 280px;
        }
        :host(:hover) {
          transform: translateY(-6px);
          box-shadow:
            0 4px 16px rgba(0,0,0,0.1),
            0 16px 40px rgba(0,0,0,0.14);
        }
        .image-wrapper {
          overflow: hidden;
          line-height: 0;
        }
        .service-image {
          width: 100%;
          height: 220px;
          object-fit: cover;
          transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          display: block;
        }
        :host(:hover) .service-image {
          transform: scale(1.06);
        }
        .service-content {
          padding: 24px 24px 20px;
          display: flex;
          flex-direction: column;
          flex: 1 1 auto;
          min-height: 0;
          gap: 0;
        }
        .service-title {
          font-size: 1.45rem;
          font-weight: 700;
          margin-bottom: 16px;
          color: var(--md-sys-color-on-surface);
          position: relative;
          padding-bottom: 12px;
          line-height: 1.2;
        }
        .service-title:after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 40px;
          height: 3px;
          background-color: var(--md-sys-color-primary);
          border-radius: 2px;
          transition: width 0.3s ease;
        }
        :host(:hover) .service-title:after {
          width: 70px;
        }
        .service-description {
          margin-bottom: 20px;
          color: var(--md-sys-color-on-surface-variant);
          line-height: 1.7;
          flex-grow: 1;
          font-size: 0.95rem;
        }
        .service-price {
          font-weight: 700;
          font-size: 1.05rem;
          color: var(--md-sys-color-primary);
          margin-bottom: 16px;
          letter-spacing: 0.2px;
        }
        .service-button {
          background-color: var(--md-sys-color-primary);
          color: var(--md-sys-color-on-primary);
          padding: 11px 24px;
          border: none;
          border-radius: 40px;
          cursor: pointer;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          font-weight: 600;
          font-size: 0.9rem;
          letter-spacing: 0.3px;
          transition:
            background-color 0.25s ease,
            transform 0.2s cubic-bezier(0.4, 0, 0.2, 1),
            box-shadow 0.25s ease;
          box-shadow: 0 3px 12px rgba(0,0,0,0.18);
          align-self: flex-start;
        }
        .service-button:hover {
          background-color: color-mix(in srgb, var(--md-sys-color-primary) 85%, black);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.24);
        }
        .service-button:active {
          transform: translateY(0);
        }

        .ul {
          margin: 0 0 20px 20px;
          padding: 0;
          color: var(--md-sys-color-on-surface-variant);
        }

        li {
          margin-bottom: 8px;
          position: relative;
          line-height: 1.6;
          font-size: 0.95rem;
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
            height: 180px;
          }
          .service-title {
            font-size: 1.25rem;
          }
          .service-description {
            font-size: 0.9rem;
          }
        }
        `
    ]

  render() {
    return html`
      ${this.image ? html`<div class="image-wrapper"><img class="service-image" src=${this.image} alt=${this.title ?? ''}></div>` : ''}
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
