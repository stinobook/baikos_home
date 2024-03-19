import { html, css, LiteElement, query, property } from '@vandeurenglenn/lite'
import { customElement } from 'lit/decorators.js'
import '@vandeurenglenn/lite-elements/icon-set.js'
import '@vandeurenglenn/lite-elements/theme.js'
import '@vandeurenglenn/lite-elements/selector.js'
import '@vandeurenglenn/lite-elements/pages.js'
import '@vandeurenglenn/lite-elements/tabs.js'
import '@vandeurenglenn/lite-elements/icon.js'
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
      custom-tabs {
        margin: 24px;
      }
      custom-selector {
        border-radius: 30px;
        height: 50px;
        background: var(--md-sys-color-surface);
        color: var(--md-sys-color-on-surface);
        box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.281);
        flex-direction: row;
        align-items: center;
        padding: 5px;
        align-items: center;
      }
      custom-tab {
        height: 100%;
        border-radius: 30px;
      }

      lang-element {
        position: fixed;
        right: 0;
        top: 0;
        margin: 5px;
      }

      @media (max-width: 600px) {
        lang-element {
          bottom: 0;
          top: unset;
        }
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
      //this.getMenuPage()
    })
    //this.getMenuPage()
  }

  async getMenuPage() {
    let route = '[route=' + Router.parseHash(location.hash).route + ']'
    const menu = this.shadowRoot.querySelector('.menu') as HTMLElement
    const menuLinkActive = menu.querySelector(route) as HTMLAnchorElement
    menu.style.setProperty("--transformJS", `${menuLinkActive.offsetLeft}px`);
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
        <custom-tabs>
          <custom-selector attr-for-selected="route" @selected=${this.selectorSelected.bind(this)}>
            <custom-tab route="home"><custom-icon>home</custom-icon>Home</custom-tab>
            <custom-tab route="about">Over ons</custom-tab>
            <custom-tab route="training">Aanbod</custom-tab>
            <custom-tab route="breeding">Border Collie</custom-tab>
            <custom-tab route="contact">Contact</custom-tab>
          </custom-selector>
        </custom-tabs>
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
