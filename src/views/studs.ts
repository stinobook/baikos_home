import '../components/footer.js'
import { html, css, LitElement } from 'lit'
import { customElement } from 'lit/decorators.js'
import '../components/post.js'

@customElement('studs-view')
export class StudsView extends LitElement {
  static styles = [
    css`
      :host {
        display: flex;
        flex-direction: column;
        width: 100%;
        padding-top: 16px;
        padding-bottom: 24px;
        gap: 16px;
        box-sizing: border-box;
      }
      ::-webkit-scrollbar {
        width: 6px;
        background-color: transparent;
      }
      ::-webkit-scrollbar-thumb {
        background: color-mix(in srgb, var(--md-sys-color-on-surface-container-highest) 60%, transparent);
        border-radius: 4px;
      }
      .flex-container {
        max-width: 1280px;
        margin: 0 auto;
        padding: 0 20px;
        width: 100%;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        gap: 16px;
      }
      post-element {
        margin: 0;
        width: 100%;
        box-sizing: border-box;
      }
      @media (max-width: 1280px) {
        :host { padding-bottom: 24px; gap: 16px; box-sizing: border-box; }
        .flex-container { border-radius: 0; padding: 0 16px; gap: 16px; box-sizing: border-box; }
        post-element { margin: 0; width: 100%; box-sizing: border-box; }
      }
      @media (max-width: 600px) {
        .flex-container { padding: 0 12px; gap: 12px; box-sizing: border-box; }
        post-element { margin: 0; width: 100%; box-sizing: border-box; }
      }
      post-element:nth-of-type(even) { --flex-direction: row; }
      post-element:nth-of-type(odd) { --flex-direction: row-reverse; }
      footer-element { margin-top: auto; }
    `
  ]

  render() {
    return html`
    <div class="flex-container">
      <post-element
      .images=${[
          './img/studs/roylu.webp',
          './img/studs/roylu2.webp',
          './img/studs/roylu3.webp',
          './img/studs/roylu4.webp',
          './img/studs/roylu5.webp',
          './img/studs/roylu6.webp'
      ]}
        .mainImage=${true}
        .mainImageRows=${5}
        headline="Roylu - Baiko's Home Roaring Roylu"
        subline="06/03/2018"
        .content=${html`
          <p>Roylu is het eerste levend geboren pupje bij Baiko's Home. Hij is altijd een enorme knuffelbeer geweest die nooit snel van iets onder de indruk is. In de roedel is hij de echte gentleman voor al zijn teven. Roylu kan mensen heel goed aanvoelen en kan kinderen en mensen die schrik hebben van honden toch overtuigen om hem leuk te vinden.</p>
          <p>Over het algemeen is Roylu ok met andere honden, behalve in de hondenschool vlak voor de training reageert hij geagiteerd op andere honden en met nerveuze honden kan hij ook problemen hebben. Verder is Roylu een hond dat je overal mee naartoe kan nemen, zo ging hij tijdens mijn postgraduaat heel vaak mee naar de les en liet hem met veel plezier door iedereen overpampelen. Hij is ook de hond waar je makkelijk verschillende disciplines mee kan uittesten.</p>
          <p>Roylu traint nog recreatief in de gehoorzaamheid. Vroeger hebben we agility gedaan, maar hiermee zijn we gestopt door omstandigheden, al zou ik dit graag terug opnemen met hem. Ook heb ik al enkele keren detectie met hem gedaan en dit concept heeft hij enorm snel door.</p>
          <p>Roylu heeft een contactallergie aan de pootjes, dit valt goed te managen. Vooral in augustus tem oktober heeft hij hier last van. Hij is de enige van zijn nest die hier last van heeft.</p>
        <h1>Gezondheidsresultaten</h1>
          <table>
            <tr><td>Kleur</td><td>Lilac tricolor</td></tr>
            <tr><td>Merle</td><td>Geen merle (m/m)</td></tr>
            <tr><td>Piebald</td><td>Drager (S/sp)</td></tr>
            <tr><td>HD</td><td>A</td></tr>
            <tr><td>SD</td><td>0/0</td></tr>
            <tr><td>ED</td><td>0/0</td></tr>
            <tr><td>Laxiteit</td><td>0,4 en 0,5</td></tr>
            <tr><td>MY dog DNA</td><td>GG carrier, vrij op al de rest (inclusief EAOD)</td></tr>
            <tr><td>Gonioscopie</td><td>vrij</td></tr>
            <tr><td>ECVO</td><td>Suture line tips, verder vrij</td></tr>
          </table>
          <h3>Certificaten</h3>
          <ul>
            <li>Sociale test</li>
            <li>Brevet 4B</li>
          </ul>
        `}
      ></post-element>
    </div>
    <footer-element></footer-element>
    `
  }
}
