import { html, css, LiteElement, query, property, queryAll } from '@vandeurenglenn/lite'
import { customElement } from 'lit/decorators.js'
import '@vandeurenglenn/lite-elements/icon-set.js'
import '@vandeurenglenn/lite-elements/theme.js'
import '@vandeurenglenn/lite-elements/selector.js'
import '@vandeurenglenn/lite-elements/pages.js'
import '@vandeurenglenn/lite-elements/icon.js'
import './ui/header.js'
import './ui/drawer.js'
import './custom-hover-menu.js'
import icons from './icons.js'
import Router from './routing.js'
import type { CustomPages, CustomSelector } from './component-types.js'
// import default page
import './views/loading.js'
import './components/lang.js'
import './components/footer.js'

@customElement('baiko-shell')
export class BaikoShell extends LiteElement {
  router: Router
  static styles = [
    css`
      :host {
        background:
          radial-gradient(ellipse at 20% 50%, color-mix(in srgb, var(--md-sys-color-primary) 30%, transparent) 0%, transparent 60%),
          radial-gradient(ellipse at 80% 20%, color-mix(in srgb, var(--md-sys-color-tertiary, var(--md-sys-color-primary)) 20%, transparent) 0%, transparent 50%),
          linear-gradient(160deg,
            color-mix(in srgb, var(--md-sys-color-primary) 85%, black 15%),
            color-mix(in srgb, var(--md-sys-color-primary) 40%, black 50%)
          );
        display: flex;
        flex-direction: row;
        box-sizing: border-box;
        color: var(--md-sys-color-on-primary);
      }
      ::-webkit-scrollbar {
        width: 6px;
        border-radius: var(--md-sys-shape-corner-extra-large);
        background-color: transparent;
      }
      ::-webkit-scrollbar-thumb {
        background: color-mix(in srgb, var(--md-sys-color-on-surface-container-highest) 60%, transparent);
        border-radius: var(--md-sys-shape-corner-extra-large);
      }
      ::-webkit-scrollbar-thumb:hover {
        background: var(--md-sys-color-on-surface-container-highest);
      }
      #container {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        flex-direction: column;
      }
      header-element {
        max-width: fit-content;
        z-index: 100;
      }
      header-element flex-row {
        height: unset !important;
      }
      .logo {
        background: url("./img/full.png") no-repeat;
        background-size: contain;
        cursor: pointer;
      }
      .logo h1 {
        font-size: 18px;
        font-weight: 700;
        letter-spacing: 0.5px;
        white-space: nowrap;
        min-width: fit-content;
        margin: 0 0 0 44px;
        height: 32px;
        cursor: pointer;
        color: var(--md-sys-color-on-primary);
        text-shadow: 0 1px 4px rgba(0,0,0,0.3);
      }
      drawer-element custom-hover-menu {
        align-items: flex-start;
      }
      lang-element {
        position: fixed;
        right: 0;
        top: 0;
        margin: 5px;
        z-index: 1100;
      }
      @media (max-width: 1280px) {
        header-element {
          min-width: 100%;
          max-height: 64px;
        }
      }

      @media (min-width: 1280px) {
        drawer-element {
          opacity: 0;
          pointer-events: none;
        }
        .logo {
          opacity: 0;
          width: 0px;
          position: fixed;
          left: -100px;
          top: -100px;
        }
      }
    `
  ]

  selectorSelected({ detail }: CustomEvent) {
    location.hash = Router.bang(detail)
  }
  @query('custom-pages')
  accessor pages: CustomPages
  @query('drawer-element')
  accessor drawer
  @queryAll('custom-hover-menu')
  accessor customHoverMenus
  @queryAll('custom-hover-menu-item')
  accessor customHoverMenuItems

  async select(selected) {
    await this.pages.rendered
    this.pages.select(selected)
    for (const item of this.customHoverMenus) {
      if (item.classList.contains('custom-selected')) item.classList.remove('custom-selected')
      const menuItem = item.shadowRoot.querySelector('custom-hover-menu-item')
      const _selected = item.getAttribute('route') ?? item.getAttribute('name')
      if (menuItem.classList.contains('custom-selected') && _selected !== selected)
        menuItem.classList.remove('custom-selected')
    }
    for (const item of this.customHoverMenuItems) {
      const _selected = item.getAttribute('route') ?? item.getAttribute('name')
      if (item.classList.contains('custom-selected') && _selected !== selected) item.classList.remove('custom-selected')

      if (_selected === selected) {
        item.classList.add('custom-selected')
        if (item.getAttribute('slot') === 'sub-menu') {
          item.parentElement.classList.add('custom-selected')
          if (item && this.drawer.open === true) {
            this.drawer.open = false
            this.shadowRoot?.querySelector('#drawer-backdrop')?.classList.remove('visible')
          }
        } else {
          if (this.drawer.open === true) {
            this.drawer.open = false
            this.shadowRoot?.querySelector('#drawer-backdrop')?.classList.remove('visible')
          }
        }
      }
    }
  }

  _drawerOpen = ({ detail }) => {
    if (detail) {
      this.drawer.open = true
      this.shadowRoot?.querySelector('#drawer-backdrop')?.classList.add('visible')
    } else {
      this.drawer.open = false
      this.shadowRoot?.querySelector('#drawer-backdrop')?.classList.remove('visible')
    }
  }

  async connectedCallback() {
    this.router = new Router(this)
    document.addEventListener('drawer-open', this._drawerOpen)
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
      [slot='logoname'] h1 {
        color: var(--md-sys-color-on-surface) !important;
        text-shadow: none;
      }
      #drawer-backdrop {
        position: fixed;
        inset: 0;
        background: rgba(0,0,0,0);
        z-index: 999;
        pointer-events: none;
        transition: background 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      }
      #drawer-backdrop.visible {
        background: rgba(0,0,0,0.45);
        pointer-events: auto;
      }
    </style>
      <!-- just cleaner -->
      ${icons}
      <!-- see https://vandeurenglenn.github.io/custom-elements/ -->
      <custom-theme .loadFont=${false}></custom-theme>
      <lang-element></lang-element>
      <div id="drawer-backdrop" @click=${() => document.dispatchEvent(new CustomEvent('drawer-open', { detail: false }))}></div>
      <div id="container">
      <header-element>
          <div class="logo" @click=${() => location.hash = '!/home'} ><h1>Baiko's Home</h1></div>
          <flex-row slot="nav-bar">
            <custom-hover-menu-item name="Home" route="home"></custom-hover-menu-item>
            <custom-hover-menu-item name="Over ons" route="about"></custom-hover-menu-item>
            <custom-hover-menu-item name="Aanbod" route="services"></custom-hover-menu-item>
            <custom-hover-menu name="Border Collie">
              <custom-hover-menu-item slot="sub-menu" name="Visie" route="vision"></custom-hover-menu-item>
              <custom-hover-menu-item slot="sub-menu" name="Reuen" route="studs"></custom-hover-menu-item>
              <custom-hover-menu-item slot="sub-menu" name="Teven" route="bitches"></custom-hover-menu-item>
              <custom-hover-menu-item slot="sub-menu" name="Koda x Siyala" route="kodaxsiyala"></custom-hover-menu-item>
            </custom-hover-menu>
            <custom-hover-menu-item name="Contact" route="contact"></custom-hover-menu-item>
          </flex-row>
        </header-element>
        <drawer-element>
        <div slot="logoname" class="logo" @click=${() => location.hash = '!/home'}><h1>Baiko's Home</h1></div>
        <custom-hover-menu-item type="drawer" name="Home" route="home"></custom-hover-menu-item>
        <custom-hover-menu-item type="drawer" name="Over ons" route="about"></custom-hover-menu-item>
        <custom-hover-menu-item type="drawer" name="Aanbod" route="services"></custom-hover-menu-item>
        <custom-hover-menu type="drawer" name="Border Collie">
          <custom-hover-menu-item type="drawer" slot="sub-menu" name="Visie" route="vision"></custom-hover-menu-item>
          <custom-hover-menu-item type="drawer" slot="sub-menu" name="Reuen" route="studs"></custom-hover-menu-item>
          <custom-hover-menu-item type="drawer" slot="sub-menu" name="Teven" route="bitches"></custom-hover-menu-item>
          <custom-hover-menu-item type="drawer" slot="sub-menu" name="Koda x Siyala" route="kodaxsiyala"></custom-hover-menu-item>
        </custom-hover-menu>
        <custom-hover-menu-item type="drawer" name="Contact" route="contact"></custom-hover-menu-item>
        </drawer-element>
        <custom-pages attr-for-selected="route">
            <loading-view route="loading"> </loading-view>
            <home-view route="home"> </home-view>
            <about-view route="about"> </about-view>
            <services-view route="services"> </services-view>
            <vision-view route="vision"> </vision-view>
            <studs-view route="studs"> </studs-view>
            <bitches-view route="bitches"> </bitches-view>
            <kodaxsiyala-view route="kodaxsiyala"> </kodaxsiyala-view>
            <contact-view route="contact"> </contact-view>
        </custom-pages>
      </div>
    `
  }
}
