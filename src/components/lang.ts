import { html, css, LiteElement, query } from '@vandeurenglenn/lite'
import { customElement } from 'lit/decorators.js'

@customElement('lang-element')
export class LangElement extends LiteElement {
  static styles = [
    css`
    :host {
        visibility: hidden;
    }
    `
  ]

  render() {
    return html`
    <div>
    <form>  
      <select name="language-picker-select" id="language-picker-select">
        <option lang="nl" value="dutch">NL</option>
        <option lang="en" value="english" selected>ENG</option>
      </select>
    </form>
  </div>
    `
  }
}
