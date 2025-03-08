import { html, css, LiteElement } from '@vandeurenglenn/lite'
import { customElement } from 'lit/decorators.js'
import '../components/post.js'
import '../components/footer.js'

@customElement('bitches-view')
export class BitchesView extends LiteElement {
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
        image="./img/bitches/koda3.webp"
        headline="Koda - Van de Weimeniershoeve"
        subline="20/06/2011"
        .content=${html`
          <p>Koda is mijn tweede eigen hond en border collie. Een heel leuk en fijn bordertje. Eigenlijk is zij de makkelijkste hond die ooit gehad heb en ooit zal hebben. Ze kan overal perfect mee loslopen, zoek geen contact met andere honden en komt hierdoor ook nooit in conflict en toch heeft ze genoeg autoriteit zodat de hele roedel respect heeft voor haar.</p>
          <p>Koda is een hondje die niet vaak liefde of knuffels wilt maar wel altijd in je buurt zal zijn. Ook onbekende mensen zal ze eerder meiden, ze is echt een hondje op haar eigen. Koda heeft vroeger in de gehoorzaamheid getraind en enkele wedstrijden gedaan, jammer genoeg hebben we dit niet echt intensief kunnen doorzetten doordat ik teveel stress ervaarde tijdens de wedstrijden.</p>
        `}
      ></post-element>

      <post-element
        .images=${[
            './img/bitches/koda2.webp',
            './img/bitches/koda1.webp',
        ]}
        headline="Gezondheidsresultaten"
        .content=${html`
          <table>
            <tr><td>Kleur</td><td>Lilac merle tricolor</td></tr>
            <tr><td>HD</td><td>C</td></tr>
            <tr><td>ED</td><td>0/0</td></tr>
            <tr><td>Combibreed</td><td>CEA drager, verder vrij</td></tr>
            <tr><td>Gonioscopie</td><td>Affected</td></tr>
            <tr><td>ECVO</td><td>Vrij</td></tr>
          </table>
          <h3>Certificaten</h3>
          <ul>
            <li>Sociale test</li>
            <li>Brevet 4B</li>
          </ul>
        `}
      ></post-element>
      
      <post-element
        image="./img/bitches/siyala2.webp"
        headline="Siyala - Irelia Bernenska Prystan"
        subline="23/04/2022"
        .content=${html`
          <p>Siyala (vos in het Bengaals) is afkomstig van Polen. Ik was al enige tijd op zoek naar een nieuwe border collie, maar ik kon maar niet de combi vinden die mij volledig aanstond, of er waren geen pups meer beschikbaar. Tot ik op Siyala botste. Toen het moment daar was, ben ik helemaal naar Polen gereden om mijn kleine vos te gaan ophalen en het avontuur kon beginnen.</p>
          <p>En wat was het een avontuur, als jonge pup vloog ze de trap op zonder enige aarzeling, het hekje rond haar bench sprong ze zonder moeite over en ook het kinder hekje was geen probleem. Een pittige vossenkind met enkele Duracell batterijen. Ondertussen is ze een jonge teef die nog altijd energie voor 10 heeft.</p>
          <p>Siyala is het type hond dat niet veel druk verdraagt maar ook niet nodig heeft, ze weet hoe ze zich moet gedragen. Siyala is geen al te grote knuffelkont, ze is niet het type hond dat veel aandacht van vreemden wilt en zal ook niet zomaar samenwerken met iemand anders. Naar vreemde honden is ze eerder neutraal, als ze contact zoeken zal ze hier gepast mee omgaan.</p>
          <p>Ze is een geboren drijver want ook dat deed ze al vlotjes als jonge pup. De konijnen die loslopen op de tuin wist ze maar al te goed de pas af te snijden en ze ging telkens voor hun vluchtwegen liggen. Maar zoals een goede drijver heeft ze er nooit eentje gebeten. Aangezien de drijvers instincten zo hard aanwezig zijn bij Siyala, ga ik met haar regelmatig schapendrijven en ik hoop dit ooit op wedstrijdniveau te kunnen verwezenlijken.</p>
        `}
      ></post-element>

      <post-element
        .images=${[
            './img/bitches/siyala1.webp',
            './img/bitches/siyala3.webp',
            './img/bitches/siyala4.webp',
            './img/bitches/siyala5.webp',
            './img/bitches/siyala6.webp'
        ]}
        headline="Gezondheidsresultaten"
        .content=${html`
          <table>
            <tr><td>Kleur</td><td>Choco sable merle</td></tr>
            <tr><td>HD</td><td>A</td></tr>
            <tr><td>SD</td><td>0/0</td></tr>
            <tr><td>ED</td><td>0/0</td></tr>
            <tr><td>Laxiteit</td><td>0,31 beide kanten</td></tr>
            <tr><td>MY dog DNA</td><td>GG carrier (deleted test), vrij op al de rest</td></tr>
            <tr><td>Gonioscopie</td><td>Affected (ICAA:PLA = moderate)</td></tr>
            <tr><td>ECVO</td><td>Vrij</td></tr>
          </table>
          <h3>Certificaten</h3>
          <ul>
            <li>Sociale test</li>
          </ul>
        `}
      ></post-element>

      <post-element
        image="./img/bitches/xorua1.webp"
        headline="Xorua - Xorua from flying color borders"
        subline="Binnenkort"
        .content=${html`
          <p>Meer informatie over Xorua komt binnenkort...</p>
        `}
      ></post-element>

      <post-element
        .images=${[
            './img/bitches/xorua2.webp',
            './img/bitches/xorua3.webp',
            './img/bitches/xorua4.webp'
        ]}
        headline="Gezondheidsresultaten"
        .content=${html`
          <table>
            <tr><td>Kleur</td><td>Binnenkort beschikbaar</td></tr>
            <tr><td>Gezondheidsresultaten</td><td>Binnenkort beschikbaar</td></tr>
          </table>
          <h3>Certificaten</h3>
          <p>Informatie komt binnenkort</p>
        `}
      ></post-element>
    </flex-container>
    <footer-element></footer-element>
    `
  }
}
