import { html, css, LiteElement } from '@vandeurenglenn/lite'
import { customElement } from 'lit/decorators.js'
import '../components/post.js'

@customElement('vision-view')
export class VisionView extends LiteElement {
  static styles = [
    css`
      :host {
        overflow-y: auto;
        padding-bottom: 12px;
        flex-direction: column;
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
        max-width: 1280px;
        margin: 0 auto;
      }
      @media (max-width: 1280px) {
        :host {
          padding-bottom: 0px;
        }
        flex-container {
          border-radius: 0px;
        }
      }
      post-element:nth-of-type(even) {
        --flex-direction: row;
      }
      post-element:nth-of-type(odd) {
        --flex-direction: row-reverse;
      }

    `
  ]

  render() {
    return html`
    <flex-container>
      <post-element
        image="./img/litters/litter1.webp"
        headline="Visie"
        .content=${html`
                Het fokken van een nestje is niet iets wat je vandaag op morgen doet. Je moet als fokker goed ingelezen zijn over het ras en de bijhorende ziektes alvorens je aan een nestje kan beginnen. Rekening houdend met alle risico's en de slapeloze nachten maakt dat er enorm veel komt kijken bij het hele plaatje.<br />
                Het kiezen van de juiste ouderdieren is enorm belangrijk. De honden waarmee gefokt wordt dienen gezond te zijn met een goed karakter. Extreme angst of agressie dient sowieso uitgesloten te worden. Waar ikzelf heel veel belang aan hecht is de inbreeding van een nest, zeker bij border collies waar er enorme pool aan honden beschikbaar is. Hoe lager de inbreeding hoe beter! Ik zal zelf steeds proberen rond de 2% of lager te blijven wanneer ik een geschikte reu zoek voor één van mijn teefjes. Ook karakterieel dienen de twee honden elkaar mooi aan te vullen. Dit alles in de hoop een nieuw gezin gelukkig te kunnen maken met hun nieuwe pup.<br />
                Moest er om de één of andere reden een pup die hier gefokt werd niet meer in zijn huidige gezin kunnen blijven dan kunnen we steeds helpen in de zoektocht naar een nieuwe thuis.
                `}
      ></post-element>
    </flex-container>
    `
  }
}
