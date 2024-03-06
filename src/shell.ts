import { html, css, LiteElement, query, property } from '@vandeurenglenn/lite'
import { customElement } from 'lit/decorators.js'
import '@vandeurenglenn/lit-elements/drawer-layout.js'
import '@vandeurenglenn/lit-elements/icon-set.js'
import '@vandeurenglenn/lit-elements/theme.js'
import '@vandeurenglenn/lit-elements/selector.js'
import '@vandeurenglenn/lit-elements/pages.js'
import '@vandeurenglenn/lit-elements/tabs.js'
import '@vandeurenglenn/lit-elements/tab.js'
import icons from './icons.js'
import Router from './routing.js'
import type { CustomDrawerLayout, CustomPages, CustomSelector } from './component-types.js'
// import default page
import './views/loading.js'

@customElement('baiko-shell')
export class BaikoShell extends LiteElement {
  router: Router

  selectorSelected({ detail }: CustomEvent) {
      location.hash = Router.bang(detail)
  }

  @query('custom-selector')
  accessor selector: CustomSelector

  @query('custom-pages')
  accessor pages: CustomPages

  @query('custom-drawer-layout')
  accessor drawerLayout: CustomDrawerLayout


  async select(selected) {
    this.selector.select(selected)
    this.pages.select(selected)
  }

  async connectedCallback() {
    this.router = new Router(this)
  }
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
      flex-container {
        width: 100%;
      }
      #logo {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
      }
      #logo img {
        max-width: 100%;
        max-height: 100%;
      }
    `
  ]
  render() {
    return html`
      <style>
        custom-pages {
          width: 100%;
          height: 100%;
          display: block;
        }
      </style>
      <!-- just cleaner -->
      ${icons}
      <!-- see https://vandeurenglenn.github.io/custom-elements/ -->
      <flex-container>
      <div id="logo">
      <img src="/img/full.png"/>
      </div>  
      <custom-tabs round="">
        <custom-selector attr-for-selected="route" @selected=${this.selectorSelected.bind(this)}>
        <custom-tab route="home">Home</custom-tab>
        <custom-tab route="home">Home</custom-tab>
        <custom-tab route="home">Home</custom-tab>
        <custom-tab route="home">Home</custom-tab>
        <custom-tab route="home">Home</custom-tab>
        </custom-selector>

        <custom-pages attr-for-selected="route">
          <loading-view route="loading"> </loading-view>
          <home-view route="home"> </home-view>
        </custom-pages>
      </custom-tabs>
      </flex-container>
    `
  }
}
