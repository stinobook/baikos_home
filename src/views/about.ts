import '../components/footer.js'
import { html, css, LitElement } from 'lit'
import { customElement } from 'lit/decorators.js'
import '../components/post.js'

@customElement('about-view')
export class AboutView extends LitElement {
  static styles = [
    css`
      :host {
        display: flex;
        flex-direction: column;
        width: 100%;
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
        :host {
          padding-bottom: 24px;
          gap: 16px;
          box-sizing: border-box;
        }
        .flex-container {
          border-radius: 0;
          padding: 0 16px;
          gap: 16px;
          box-sizing: border-box;
        }
        post-element {
          margin: 0;
          width: 100%;
          box-sizing: border-box;
        }
      }
      @media (max-width: 600px) {
        .flex-container {
          padding: 0 12px;
          gap: 12px;
          box-sizing: border-box;
        }
        post-element {
          margin: 0;
          width: 100%;
          box-sizing: border-box;
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
    <div class="flex-container">
      <post-element
      image="./img/about/about1.webp"
      headline="Madeline,"
      .content=${html`
                <p>
                  Dat ben ik, en mijn hondenverhaal begint al van jongs af aan. Maar het startte pas echt toen ik op mijn 15 jaar mijn eerste hond mocht kopen. Mijn eerste eigen hond, een border collie genaamd Bailey. En in dat zelfde jaar kwam ook Koda in mijn leven.
                  Bailey en Koda, waar het allemaal mee begon. Vandaar ook de keuze om dit alles Baiko's Home te noemen.
                </p>
                <p>Met hen heb ik vooral in de gehoorzaamheid gezeten. We zijn blijven plakken en werden zo in 2014 instructeur op de hondenschool. Tot de lente van 2025 gaf ik daar twee keer per week les, voornamelijk aan de hoogste groep maar ik heb in het verleden al elke groep op mij genomen. Sindsdien heb ik de hondenschool vaarwel gezegd en sloeg ik een nieuwe weg in.</p>
            `}
      ></post-element>
      <post-element
      image="./img/about/about2.webp"
      .content=${html`
                <p>Van 2013-2016 volgde ik de opleiding agro – en biotechnologie met de afstudeerrichting dierenzorg</p>
                <p>2018, het eerste Baiko's Home nestje werd geboren. Koda schonk het leven aan 5 knappe pups, het 6de pupje heeft het jammer genoeg niet gehaald. Van dit nestje is Roylu bij ons gebleven. Het eerst volgende nestje zou, indien alles goed verloopt, in 2025 plaatsvinden.
                Later in datzelfde jaar startte ik ook de postgraduaat animal rehab assistant and sports coaching. Deze heb ik in 2021 met grote onderscheiding afgerond. </p>
                <p>Vervolgens in 2019 werd Baiko's Home opgericht, in eerste instatie werden er privélessen aan huis gegeven. Het ging hem tijdens de lessen vooral over trainingen, probleembjes bij hond en baas bijsturen en voor de communicatie optimaliseren. Tot op de dag van vandaag geven we nog altijd trainingen aan huis.</p>
                <p>Tot slot in 2024 werd dan eindelijk mijn eigen trainingsruimte geopend. Hier zet ik de opgedane kennis van mijn postgraduaat om in de praktijk.</p>
            `}
      ></post-element>
      <post-element
      image="./img/about/about3.webp"
      .content=${html`
                <p>Ons gezin bestaat momenteel uit 4 border collies (Koda, Roylu, Siyala en Xorua), 1 mechelaar (Riley) en 1 franse Bulldog (Blue). Naast verschillende honden leeft er ook een kat bij ons en verschillende buitendiertjes. Hier wil ik ook nog Bailey vernoemen, aangezien met haar alles begon. Bailey hebben we op 12,5 jarige leeftijd moeten laten inslapen.</p>
            `}
      ></post-element>
      <post-element
      headline="Studies"
      .content=${html`
                <table>
                  <tr>
                    <td>2013-2016</td>
                    <td>Agro- en biotechnologie dierenzorg</td>
                  </tr>
                  <tr>
                    <td>2018-2021</td>
                    <td>Animal rehab assistant and sports coaching</td>
                  </tr>
                </table>
            `}
      ></post-element>
      </div>
    <footer-element></footer-element>
    `
  }
}
