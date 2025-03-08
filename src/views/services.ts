import { html, css, LiteElement, query } from '@vandeurenglenn/lite'
import { customElement } from 'lit/decorators.js'
import '../components/post.js'
import '../components/footer.js'

@customElement('services-view')
export class ServicesView extends LiteElement {
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
        flex-direction: column;
        max-width: 1280px;
        gap:12px;
        height:fit-content;
        margin: 0 auto;
        background-color: var(--md-sys-color-surface);
        color: var(--md-sys-color-on-surface);
        border-radius: 30px;
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
      image="./img/full.png"
      headline="Aanbod"
      .content=${html`
                <p>Onder de verschillende secties kan je specifiek kiezen tussen Fitness, Body&Balance, loopbandtraining en massage.
                  De praktijkruimte kan ook zelfstandig afgehuurd worden, op voorwaarde dat er al minstens één sessie onder begeleiding heeft plaatsgevonden.
                </p>
                <h3>Tarieven</h3>
                <table>
                  <tr><td>Fitness</td><td>€30/30min</td></tr>
                  <tr><td>Body&Balance</td><td>€30/30min</td></tr>
                  <tr><td>Loopbandtraining</td><td>€30/30min</td></tr>
                  <tr><td>Massage</td><td>€30/30min</td></tr>
                  <tr><td>Ruimte afhuren</td><td>€12/30min</td></tr>
                  <tr><td>Privétraining</td><td>€45/h</td></tr>
                </table>
                <h3>Training aan huis</h3>
                <p>Heb je een nieuwe puppy? Of een ouder hondje dat wat sturen nodig heeft? Of wil je jouw trouwe vriend iets specifieks aanleren? Hiervoor kom ik bij jou thuis om jullie samen op goede weg te zetten.<br />
                Ik train op een positieve manier en hou het welzijn van de hond steeds in de gaten.</p>
            `}
      ></post-element>
      <post-element
      image="./img/services/fitness.webp"
      headline="Fitness"
      .content=${html`
                <p>Tijdens de fitness fixeren we ons om bepaalde spiergroepen aan te sterken door oefeningen te herhalen. Fitness kan m’n ook doen als revalidatie na een operatie, dit mits verslag van de dierenarts.<br>
                Ook sporthonden kunnen baat hebben bij Fitness, naast de techniektraining kunnen ze er ook baat bij hebben door hun spieren te versterken
                </p>
            `}
      ></post-element>
      <post-element
      image="./img/services/bodybalance.webp"
      headline="Body & Balance"
      .content=${html`
                <p>Tijdens Body&Balance worden verschillende toestellen en ondergronden klaargezet zodat de hond hier gewoon kan aan worden en zich bewust leert worden van zijn poten en eigen lichaam. <br>
Body&Balance kan interessant zijn voor onzekere hondjes of voor de socialisatie van pups. Maar ook andere honden kunnen hier nut en plezier van hebben. 
Voor onze sporthonden kan dit ook heel belangrijk zijn, hoe beter bewust ze zijn van hun lichaam, hoe makkelijker ze zichzelf kunnen corrigeren wanneer ze hun lichaam of poot verkeerd positioneren.
                </p>
            `}
      ></post-element>
      <post-element
      image="./img/full.png"
      headline="Massage"
      .content=${html`
                <p>Tijdens de massage laten we de honden volledig onstpannen en worden stramme spieren losgewerkt. Gewrichtjes worden ook weer wat losser gemaakt.
                </p>
            `}
      ></post-element>
      <post-element
      image="./img/services/loopband.webp"
      headline="Loopband"
      .content=${html`
                <p>De loopband kan enorm handig zijn tijdens de donkere en/of regenachtige dagen om de honden toch voldoende beweging te geven. Het verschil met een gewone wandeling en de loopband is dat de gangen van de hond beter bekeken kunnen worden en dat de hond zich ook meer moet concentreren op zijn stappen. Een nadeel ervan is dat de gang deels beïnvloed wordt door het bewegende vlak.
                </p>
            `}
      ></post-element>
    </flex-container>
    <footer-element></footer-element>
    `
  }
}
