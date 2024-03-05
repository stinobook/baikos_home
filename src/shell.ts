import { html, LiteElement, query, property } from '@vandeurenglenn/lite'
import { customElement } from 'lit/decorators.js'
import '@vandeurenglenn/lit-elements/drawer-layout.js'
import '@vandeurenglenn/lit-elements/icon-set.js'
import '@vandeurenglenn/lit-elements/theme.js'
import '@vandeurenglenn/lit-elements/selector.js'
import '@vandeurenglenn/lit-elements/pages.js'
import icons from './icons.js'
import Router from './routing.js'
import type { CustomDrawerLayout, CustomPages, CustomSelector } from './component-types.js'
// import default page
import './views/loading.js'

@customElement('baiko-shell')
export class BaikoShell extends LiteElement {
  router: Router

  selectorSelected({ detail }: CustomEvent) {
      this.drawerLayout.drawerOpen = false
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
      <custom-drawer-layout appBarType="small">
        <span slot="top-app-bar-title">Baiko\'s Home</span>
        <span slot="drawer-headline"> menu </span>
        <custom-selector attr-for-selected="route" slot="drawer-content" @selected=${this.selectorSelected.bind(this)}>
          <custom-drawer-item route="home">Home</custom-drawer-item>
        </custom-selector>

        <custom-pages attr-for-selected="route">
          <loading-view route="loading"> </loading-view>
          <home-view route="home"> </home-view>
        </custom-pages>
      </custom-drawer-layout>
    `
  }
}
