import { html, css, LiteElement, query } from '@vandeurenglenn/lite'
import { customElement } from 'lit/decorators.js'

@customElement('lang-element')
export class LangElement extends LiteElement {
  static styles = [
    css`
    `
  ]

  render() {
    return html`
    <div class="language-picker language-picker--hide-label js-language-picker" data-trigger-class="li4-btn li4-btn--subtle js-tab-focus">
    <form action="" class="language-picker__form">  
      <select name="language-picker-select" id="language-picker-select">
        <option lang="nl" value="dutch">Nederlands</option>
        <option lang="en" value="english" selected>English</option>
      </select>
    </form>
  </div>
    `
  }
}
