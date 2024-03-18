import { html, css, LiteElement, query, property } from '@vandeurenglenn/lite'
import { customElement } from 'lit/decorators.js'
import '@vandeurenglenn/lite-elements/icon-set.js'
import '@vandeurenglenn/lite-elements/theme.js'
import '@vandeurenglenn/lite-elements/selector.js'
import '@vandeurenglenn/lite-elements/pages.js'
import icons from './icons.js'
import Router from './routing.js'
import type { CustomPages, CustomSelector } from './component-types.js'
// import default page
import './views/loading.js'
import './components/lang.js'

@customElement('baiko-shell')
export class BaikoShell extends LiteElement {
  router: Router
  static styles = [
    css`
      :host {
        display: flex;
        flex-direction: row;
        box-sizing: border-box;
        background: var(--md-sys-color-primary);
        color: var(--md-sys-color-on-primary);
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
      #container {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100vh;
        flex-direction: column;
      }
      .menu {
        border-radius: 30px;
        height: 50px;
        background: var(--md-sys-color-surface);
        color: var(--md-sys-color-on-surface);
        box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.281);
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        position: relative;
        margin: 24px;
        transform: translateY(var(--transformBottom));
        transition: all 0.3 ease-in-out;
      }
      custom-selector {
        flex-direction: row;
        width: unset;
        height: unset;
        gap: 24px;
      }
      custom-selector a {
        line-height: 50px;
        height: 100%;
        display: inline-block;
        position: relative;
        z-index: 1;
        text-align: center;
        border-radius: 30px;
        padding: 0 12px;
        cursor:pointer;
      }
      .menu::before {
        content: "";
        position: absolute;
        height: 100%;
        left: 0;
        transform: translateX(var(--transformJS));
        width: var(--widthJS);
        border-radius: 30px;
        background: var(--md-sys-color-secondary-container);
        transition: all 0.3s ease-in-out;
      }
      custom-selector a.custom-selected {
        background: unset;
      }

      .bottom {
        position: fixed !important;
        bottom: 0;
        z-index:1000;
        transition: all 0.5s ease-in-out;
      }
    `
  ]

  selectorSelected({ detail }: CustomEvent) {
    location.hash = Router.bang(detail)
  }

  @query('custom-selector')
  accessor selector: CustomSelector

  @query('custom-pages')
  accessor pages: CustomPages


  async select(selected) {
    this.selector.select(selected)
    this.pages.select(selected)
  }

  async connectedCallback() {
    this.router = new Router(this)
    this.shadowRoot.addEventListener('click', () => {
      this.getMenuPage()
    })
    this.getMenuPage()
  }

  async getMenuPage() {
    const menu = this.shadowRoot.querySelector('.menu') as HTMLElement
    const menuLinkActive = menu.querySelector('a.custom-selected') as HTMLAnchorElement
    menu.style.setProperty("--transformJS", `${menuLinkActive.offsetLeft}px`);
    menu.style.setProperty("--widthJS", `${menuLinkActive.offsetWidth}px`);
  }
 

  render() {
    return html`
      <style>
      :host {
        display: block;
        inset: 0;
        position: relative;
        height: 100%;
        width: 100%;
      }
        custom-pages {
          width: 100%;
          height: 100%;
          display: flex;
        }
      </style>
      <!-- just cleaner -->
      ${icons}
      <!-- see https://vandeurenglenn.github.io/custom-elements/ -->
      <custom-theme loadFont="false"></custom-theme>
      <lang-element></lang-element>
      <div id="container">
        <div class="menu">
          <custom-selector attr-for-selected="route" @selected=${this.selectorSelected.bind(this)}>
          <a route="home">Home</a>
          <a route="about">Over ons</a>
          <a route="training">Aanbod</a>
          <a route="breeding">Border Collie</a>
          <a route="contact">Contact</a>
          </custom-selector>
        </div>
        <custom-pages attr-for-selected="route">
          <loading-view route="loading"> </loading-view>
          <home-view route="home"> </home-view>
          <about-view route="about"> </about-view>
          <training-view route="training"> </training-view>
          <breeding-view route="breeding"> </breeding-view>
          <contact-view route="contact"> </contact-view>
        </custom-pages>
      </div>
    `
  }
}
