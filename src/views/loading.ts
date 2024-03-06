import { html, css, LiteElement } from '@vandeurenglenn/lite'
import { customElement } from 'lit/decorators.js'

@customElement('loading-view')
export class LoadingView extends LiteElement {
  static styles = [
    css`
      :host {
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
      }
      /* HTML: <div class="loader"></div> */
      .loader {
        width: calc(6*30px);
        height: 50px;
        display: flex;
        color: #8d7958;
        filter: drop-shadow(30px 25px 0 currentColor) drop-shadow(60px 0 0 currentColor) drop-shadow(120px 0 0 currentColor);
        clip-path: inset(0 100% 0 0);
        animation: l12 2s infinite steps(7);
      }
      .loader:before {
        content: "";
        width: 30px;
        height: 25px;
        --c:no-repeat radial-gradient(farthest-side,currentColor 92%,#0000);
        background: url(img/paw.png) no-repeat scroll ;
        transform: rotate(90deg);
        background-size: 30px 25px;
      }
      @keyframes l12 {
        100% {clip-path: inset(0 -30px 0 0)}
      }
        
    `
  ]

  render() {
    return html`
      <div class="loader"></div>
    `
  }
}
