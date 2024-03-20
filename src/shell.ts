import { html, css, LiteElement, query, property } from '@vandeurenglenn/lite'
import { customElement } from 'lit/decorators.js'
import '@vandeurenglenn/lite-elements/icon-set.js'
import '@vandeurenglenn/lite-elements/theme.js'
import '@vandeurenglenn/lite-elements/selector.js'
import '@vandeurenglenn/lite-elements/pages.js'
import '@vandeurenglenn/lite-elements/tabs.js'
import '@vandeurenglenn/lite-elements/icon.js'
import '@vandeurenglenn/lite-elements/dropdown-menu.js'
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
        border-radius: 30px;
        height: 50px;
        background: var(--md-sys-color-surface);
        color: var(--md-sys-color-on-surface);
        box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.281);
        flex-direction: row;
        align-items: center;
        padding: 0 6px;
        overflow: hidden;
        transition: all .5s ease-in-out;
      }
      custom-tabs::before {
        content: "";
        position: absolute;
        left: 0;
        transform: translateX(var(--transformJS)) translateY(var(--transformJStop));
        width: var(--widthJS);
        border-radius: 30px;
        background: var(--md-sys-color-secondary-container);
        transition: all 0.3s ease-in-out;
        height: 50px;
        z-index: 99;
      }
      custom-tab {
        margin: auto;
        border-radius: 30px;
        z-index: 100;
        position: relative;
        opacity: 1;
        transform: translateY(0%);
        width: auto;
        height: auto;
        padding: 0 12px;
        transition: all 0.35s ease-in-out;
        &.is-inactive {
          opacity: 0;
          transform: translateY(-200%);
          width: 0;
          height: 0;
          padding: 0;
        }
      }
      .custom-selected {
        border: unset; 
        color: unset;
      }

      lang-element {
        position: fixed;
        right: 0;
        top: 0;
        margin: 5px;
        z-index: 1000;
      }
      .submenuitem {
        opacity: 0;
        transition: transform 0.35s ease-in-out;
        transform: translateY(200%);
        width: 0;
        height: 0;
        padding: 0;
        &.is-active {
          width: auto;
          height: auto;
          padding: 0 12px;
          opacity: 1;
          transform: translateY(0%);
        }
      }

      @media (max-width: 600px) {
        custom-pages {
          margin-bottom: 50px;
        }
        custom-tabs {
          flex-direction: column;
          border-radius: 30px 30px 6px 30px;
          position: fixed;
          bottom: 6px;
          right: 6px;
          margin: 0;
          height: auto;
          padding: 6px;
          z-index: 1000;
          transition: transform .5s ease-in-out;
          transform: translateX(var(--togglemenu));
          overflow: visible;
        }
        custom-tabs::before {
          height: 40px;
          left: 6px;
          top: 0;
          border-radius: 24px;
        }
        custom-tab {
          width: 100%;
        }
        label {
          display: inline-block;
          padding: 7px;
          background: var(--md-sys-color-surface);
          border-radius: 50%;
          cursor: pointer;
          z-index: 999;
          position: fixed;
          bottom: 6px;
          right: 6px;
        }
        .bar {
          display: block;
          background: var(--md-sys-color-secondary-container);
          width: 30px;
          height: 3px;
          border-radius: 5px;
          margin: 5px auto;
          transition: background-color .5s ease-in, transform .5s ease-in, width .5s ease-in;
        }
      }
    `
  ]

  selectorSelected({ detail }: CustomEvent) {
    location.hash = Router.bang(detail)
    this.getMenuPage(detail)
    this.toggleMenu()
  }

  @query('custom-tabs')
  accessor selector: CustomSelector

  @query('custom-pages')
  accessor pages: CustomPages

  @property()
  accessor submenuName
  @property()
  accessor submenuNameValue

  async select(selected) {
    this.selector.select(selected)
    this.pages.select(selected)
  }

  async connectedCallback() {
    this.router = new Router(this)
    this.getMenuPage(Router.parseHash(location.hash).route)
    screen.orientation.addEventListener("change", () => {
      this.getMenuPage(Router.parseHash(location.hash).route)
    });
  }

  async getMenuPage(route) {
    let routeselector = '[route=' + route + ']'
    const menu = this.shadowRoot.querySelector('custom-tabs') as HTMLElement
    let menuLinkActive = menu.querySelector(routeselector) as HTMLElement
    if (menu.clientWidth < 250) {
      menu.style.setProperty("--transformJStop", `${menuLinkActive.offsetTop}px`);
      menu.style.setProperty("--widthJS", `${menuLinkActive.offsetWidth}px`);
      menu.style.setProperty("--transformJS", `0px`);
    } else {
      menu.style.setProperty("--transformJS", `${menuLinkActive.offsetLeft}px`);
      menu.style.setProperty("--widthJS", `${menuLinkActive.offsetWidth}px`);
      menu.style.setProperty("--transformJStop", `0px`);
    }
    let submenu = menuLinkActive.getAttribute('submenu')
    let submenuReturn = this.shadowRoot.querySelector('[submenuactive="1"]')
    if (submenu === 'main') {
    } else if (submenuReturn) {
      this.shadowRoot.querySelectorAll('.is-inactive').forEach((item) => {
        item.classList.remove('is-inactive')
      })
      this.shadowRoot.querySelectorAll('.is-active').forEach((item) => {
        item.classList.remove('is-active')
      })
      this.submenuName.setAttribute('submenuactive', '0')
      this.submenuName.innerHTML = this.submenuNameValue
    } else {
      this.submenuName = this.shadowRoot.querySelector('[submenu='+ submenu + '][submenuactive="0"')
      this.submenuName.setAttribute('submenuactive', '1')
      this.submenuNameValue = this.submenuName.innerHTML
      this.submenuName.innerHTML = 'Terug'
      this.shadowRoot.querySelectorAll('[submenu="main"]').forEach((item) => {
        item.classList.add('is-inactive')
      })
      this.shadowRoot.querySelectorAll('[route="submenu"][submenuactive="0"').forEach((item) => {
        item.classList.add('is-inactive')
      })
      this.shadowRoot.querySelectorAll('[submenu='+ submenu + ']').forEach((item) => {
        item.classList.add('is-active')
      })
      
    }
  }
 
  toggleMenu() {
    const menu = this.shadowRoot.querySelector('custom-tabs') as HTMLElement
    let toggle = menu.style.getPropertyValue("--togglemenu")
    if (toggle !== '150%') {
      menu.style.setProperty("--togglemenu", `150%`);
    } else {
      menu.style.setProperty("--togglemenu", `0`);
    }

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
        <label @click=${() => this.toggleMenu()}>
          <span class="bar top"></span>
          <span class="bar middle"></span>
          <span class="bar bottom"></span>
        </label>
        <custom-tabs attr-for-selected="route" @selected=${this.selectorSelected.bind(this)}>
          <custom-tab route="home" submenu="main">Home</custom-tab>
          <custom-tab route="about" submenu="main">Over ons</custom-tab>
          <custom-tab route="submenu" submenu="offers" submenuactive="0" class="submenu">Aanbod</custom-tab>
          <custom-tab route="fitness" submenu="offers" class="submenuitem">Fitness</custom-tab>
          <custom-tab route="bodybalance" submenu="offers" class="submenuitem">Body & Balance</custom-tab>
          <custom-tab route="massage" submenu="offers" class="submenuitem">Massage</custom-tab>
          <custom-tab route="training" submenu="offers" class="submenuitem">Training</custom-tab>
          <custom-tab route="submenu" submenu="breeding" submenuactive="0" class="submenu">Border Collie</custom-tab>
          <custom-tab route="vision" submenu="breeding" class="submenuitem">Visie</custom-tab>
          <custom-tab route="studs" submenu="breeding" class="submenuitem">Reuen</custom-tab>
          <custom-tab route="bitches" submenu="breeding" class="submenuitem">Teven</custom-tab>
          <custom-tab route="contact" submenu="main">Contact</custom-tab>
        </custom-tabs>
        <custom-pages attr-for-selected="route">
          <loading-view route="loading"> </loading-view>
          <home-view route="home"> </home-view>
          <about-view route="about"> </about-view>
          <training-view route="training"> </training-view>
          <contact-view route="contact"> </contact-view>
        </custom-pages>
      </div>
    `
  }
}
