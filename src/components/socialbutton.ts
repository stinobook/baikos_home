import { html, css, LiteElement, customElement, property } from '@vandeurenglenn/lite'
import { svg } from 'lit'

@customElement('socialbutton-element')
export class SocialbuttonElement extends LiteElement {
  @property() accessor href
  @property() accessor path
static styles = [
    css`
        :host {
            margin: 4px;
        }

        a {
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--md-sys-color-on-primary);
            text-decoration: none;
            gap: 8px;
            transition: color 0.3s ease, transform 0.2s ease;
        }

        span {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 42px;
            height: 42px;
            border-radius: 50%;
            border-color: var(--md-sys-color-surface);
            text-decoration: none;
            transition: background-color 0.3s ease, transform 0.2s ease;
            border: 1px solid color-mix(in srgb, var(--md-sys-color-surface) 50%, transparent);
        }
        a:hover {
            transform: scale(1.05);
        }
        
        a:hover span {
            background-color: color-mix(in srgb, var(--md-sys-color-surface) 50%, var(--md-sys-color-primary));
            box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);

        }

        svg {
            width: 24px;
            height: 24px;
            fill: var(--md-sys-color-on-primary);
        }
    `
]
  _generatePaths() {
    if (typeof this.path === 'string') {
      return svg`<path d="${this.path}" />`
    }
    if (Array.isArray(this.path)) {
      return svg`${this.path.map(this._generatePathObject)}`
    }
  }

  _generatePathObject({ d, fillRule }) {
    const fillRuleAttr = fillRule ? `fill-rule="${fillRule}"` : '';
    return svg`<path d="${d}" ${fillRuleAttr} />`
  }
  
  render() {
    return html`
    <a href="${this.href}" target="_blank">
        <span class="icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            ${this._generatePaths()}
        </svg>
        </span>
        <slot></slot>
    </a>
    `
  }
}
