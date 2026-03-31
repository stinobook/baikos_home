import { html, css, LitElement } from 'lit'
import { customElement, query, queryAll } from 'lit/decorators.js'
import './ui/pages.js'
import './ui/header.js'
import './ui/drawer.js'
import './custom-hover-menu.js'
import Router from './routing.js'
// import default page
import './views/loading.js'
import './components/lang.js'
import './components/footer.js'

@customElement('baiko-shell')
export class BaikoShell extends LitElement {
  router: Router
  static styles = [
    css`
      :host {
        display: flow-root;
        box-sizing: border-box;
        color: var(--md-sys-color-on-primary);
        position: relative;
        width: 100%;
        max-width: 100%;
        overflow-x: clip;
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
        display: block;
        width: 100%;
        max-width: 100%;
        position: relative;
        padding-top: 16px;
        overflow-x: clip;
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
      custom-hover-menu.no-hover {
        pointer-events: none;
      }
      lang-element {
        position: absolute;
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
        .logo h1 {
          min-width: 0;
          overflow: hidden;
          text-overflow: ellipsis;
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
          position: absolute;
          left: -100px;
          top: -100px;
        }
      }
    `
  ]

  selectorSelected({ detail }: CustomEvent) {
    location.hash = Router.bang(detail)
  }

  @query('baiko-pages')
  accessor pages

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
      item.open = false
      item.classList.add('no-hover')
      setTimeout(() => item.classList.remove('no-hover'), 300)
      const menuItem = item.shadowRoot.querySelector('custom-hover-menu-item')
      const _selected = item.getAttribute('route') ?? item.getAttribute('name')
      if (menuItem && menuItem.classList.contains('custom-selected') && _selected !== selected)
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
            document.dispatchEvent(new CustomEvent('drawer-open', { detail: false }))
          }
        } else {
          if (this.drawer.open === true) {
            document.dispatchEvent(new CustomEvent('drawer-open', { detail: false }))
          }
        }
      }
    }
  }

  // Block all scroll while drawer is open; only allow it if the drawer panel itself can scroll
  _blockScroll = (e: Event) => {
    const panel = this.drawer?.shadowRoot?.querySelector('.panel') as HTMLElement
    const inDrawer = panel && e.composedPath().includes(panel)
    if (!inDrawer || panel.scrollHeight <= panel.clientHeight) {
      e.preventDefault()
    }
  }

  _drawerOpen = (e: Event) => {
    const { detail } = e as CustomEvent
    if (detail) {
      window.scrollTo({ top: 0, behavior: 'instant' })
      this.drawer.open = true
      this.shadowRoot?.querySelector('#drawer-backdrop')?.classList.add('visible')
      document.addEventListener('touchmove', this._blockScroll, { passive: false })
      document.addEventListener('wheel', this._blockScroll, { passive: false })
    } else {
      this.drawer.open = false
      this.shadowRoot?.querySelector('#drawer-backdrop')?.classList.remove('visible')
      document.removeEventListener('touchmove', this._blockScroll)
      document.removeEventListener('wheel', this._blockScroll)
    }
  }

  connectedCallback() {
    super.connectedCallback()
    document.addEventListener('drawer-open', this._drawerOpen)
  }

  firstUpdated() {
    this.router = new Router(this)
  }

  render() {
    return html`
    <style>
    :host {
      display: block;
      width: 100%;
    }
      baiko-pages {
        display: flex;
        flex-direction: column;
        min-height: calc(100vh - 88px);
        width: 100%;
      }
      baiko-pages > * {
        overscroll-behavior-x: none;
        min-height: 0;
      }
      baiko-pages > *:not(.custom-selected) {
        display: none !important;
      }
      baiko-pages > .custom-selected {
        flex: 1;
      }
      baiko-pages > .custom-selected.page-enter {
        animation: page-enter 180ms cubic-bezier(0.2, 0, 0.2, 1);
      }
      @keyframes page-enter {
        from {
          opacity: 0.97;
          transform: translateY(2px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      @media (prefers-reduced-motion: reduce) {
        baiko-pages > .custom-selected.page-enter {
          animation: none;
        }
      }
      /* Let each view's own :host { display } take effect — don't override it */
[slot='logoname'] h1 {
        color: var(--md-sys-color-on-surface) !important;
        text-shadow: none;
      }
      #drawer-backdrop {
        display: none;
        background: rgba(0,0,0,0);
        z-index: 999;
        pointer-events: none;
        transition: background 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      }
      #drawer-backdrop.visible {
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.45);
        pointer-events: auto;
      }
    </style>
      <lang-element></lang-element>
      <div id="drawer-backdrop" @click=${() => document.dispatchEvent(new CustomEvent('drawer-open', { detail: false }))}></div>
      <drawer-element>
        <div slot="logoname" class="logo" @click=${() => location.hash = '!/home'}><h1>Baiko's Home</h1></div>
        <custom-hover-menu-item type="drawer" name="Home" route="home"></custom-hover-menu-item>
        <custom-hover-menu-item type="drawer" name="Over ons" route="about"></custom-hover-menu-item>
        <custom-hover-menu-item type="drawer" name="Aanbod" route="services"></custom-hover-menu-item>
        <custom-hover-menu type="drawer" name="Border Collie" route="vision">
          <custom-hover-menu-item type="drawer" slot="sub-menu" name="Visie" route="vision"></custom-hover-menu-item>
          <custom-hover-menu-item type="drawer" slot="sub-menu" name="Reuen" route="studs"></custom-hover-menu-item>
          <custom-hover-menu-item type="drawer" slot="sub-menu" name="Teven" route="bitches"></custom-hover-menu-item>
          <custom-hover-menu-item type="drawer" slot="sub-menu" name="Koda x Siyala" route="kodaxsiyala"></custom-hover-menu-item>
        </custom-hover-menu>
        <custom-hover-menu-item type="drawer" name="Contact" route="contact"></custom-hover-menu-item>
      </drawer-element>
      <div id="container">
      <header-element>
          <div class="logo" @click=${() => location.hash = '!/home'} ><h1>Baiko's Home</h1></div>
          <div slot="nav-bar">
            <custom-hover-menu-item name="Home" route="home"></custom-hover-menu-item>
            <custom-hover-menu-item name="Over ons" route="about"></custom-hover-menu-item>
            <custom-hover-menu-item name="Aanbod" route="services"></custom-hover-menu-item>
            <custom-hover-menu name="Border Collie" route="vision">
              <custom-hover-menu-item slot="sub-menu" name="Visie" route="vision"></custom-hover-menu-item>
              <custom-hover-menu-item slot="sub-menu" name="Reuen" route="studs"></custom-hover-menu-item>
              <custom-hover-menu-item slot="sub-menu" name="Teven" route="bitches"></custom-hover-menu-item>
              <custom-hover-menu-item slot="sub-menu" name="Koda x Siyala" route="kodaxsiyala"></custom-hover-menu-item>
            </custom-hover-menu>
            <custom-hover-menu-item name="Contact" route="contact"></custom-hover-menu-item>
          </div>
        </header-element>
        <baiko-pages attr-for-selected="route">
            <loading-view route="loading"> </loading-view>
            <home-view route="home"> </home-view>
            <about-view route="about"> </about-view>
            <services-view route="services"> </services-view>
            <vision-view route="vision"> </vision-view>
            <studs-view route="studs"> </studs-view>
            <bitches-view route="bitches"> </bitches-view>
            <kodaxsiyala-view route="kodaxsiyala"> </kodaxsiyala-view>
            <contact-view route="contact"> </contact-view>
        </baiko-pages>
      </div>
    `
  }
}
