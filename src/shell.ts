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
        border-radius: 30px;
        height: 50px;
        background: var(--md-sys-color-surface);
        color: var(--md-sys-color-on-surface);
        box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.281);
        flex-direction: row;
        align-items: center;
        padding: 0 6px;
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
          transform: translateX(var(--togglemenu))
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
    this.toggleMenu()
  }

  @query('custom-tabs')
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
    screen.orientation.addEventListener("change", () => {
      this.getMenuPage()
    });
  }

  async getMenuPage() {
    let route = '[route=' + Router.parseHash(location.hash).route + ']'
    const menu = this.shadowRoot.querySelector('custom-tabs') as HTMLElement
    const menuLinkActive = menu.querySelector(route) as HTMLAnchorElement
    if (menu.clientWidth < 250) {
      menu.style.setProperty("--transformJStop", `${menuLinkActive.offsetTop}px`);
      menu.style.setProperty("--widthJS", `${menuLinkActive.offsetWidth}px`);
      menu.style.setProperty("--transformJS", `0px`);
    } else {
      menu.style.setProperty("--transformJS", `${menuLinkActive.offsetLeft}px`);
      menu.style.setProperty("--widthJS", `${menuLinkActive.offsetWidth}px`);
      menu.style.setProperty("--transformJStop", `0px`);
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
          <custom-tab route="home">Home</custom-tab>
          <custom-tab route="about">Over ons</custom-tab>
          <custom-tab route="training">Aanbod</custom-tab>
          <custom-tab route="breeding">Border Collie</custom-tab>
          <custom-tab route="contact">Contact</custom-tab>
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
