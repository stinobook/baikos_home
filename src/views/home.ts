import '../components/footer.js'
import { html, css, LitElement } from 'lit'
import { customElement } from 'lit/decorators.js'
import '../components/post.js'
import '../components/card.js'
import { scrollbar } from '../mixins/styles.js'

@customElement('home-view')
export class HomeView extends LitElement {
static styles = [
    scrollbar,
    css`
        :host {
            display: flex;
            flex-direction: column;
            width: 100%;
          gap: 16px;
            padding-top: 16px;
            padding-bottom: 24px;
            box-sizing: border-box;
        }

        .flex-container {
            max-width: 1280px;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            gap: 16px;
            padding: 0 20px;
            width: 100%;
            box-sizing: border-box;
        }

        /* Card rows use grid so cells in the same row always share height */
        .cards-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
          gap: 16px;
            width: 100%;
        }

        post-element {
            width: 100%;
            margin: 0;
        }

        card-element {
            width: 100%;
            margin: 0;
            box-sizing: border-box;
        }

      @media (max-width: 1280px) {
        :host {
          padding-bottom: 24px;
          gap: 16px;
          box-sizing: border-box;
        }
        .flex-container {
            padding: 0 16px;
            gap: 16px;
            box-sizing: border-box;
        }
        .cards-row {
            grid-template-columns: 1fr;
          gap: 16px;
            box-sizing: border-box;
        }
        post-element {
            width: 100%;
            margin: 0;
            box-sizing: border-box;
        }
        card-element {
            width: 100%;
            margin: 0;
            box-sizing: border-box;
        }
      }

      @media (max-width: 600px) {
        .flex-container {
          padding: 0 12px;
          gap: 12px;
          box-sizing: border-box;
        }
        .cards-row {
          gap: 12px;
          box-sizing: border-box;
        }
        card-element {
            width: 100%;
            margin: 0;
            box-sizing: border-box;
        }
      }
      footer-element {
        margin-top: auto;
      }
    `
];

  render() {
    return html`
    <div class="flex-container">
      <post-element
        image="./img/full.png"
        headline="Wat kan Baiko's Home betekenen voor jouw hond?"
        .content=${html`
            <p>Baiko's Home is gespecialiseerd in het begeleiden van honden en hun eigenaren naar een sterkere band en betere gezondheid door gerichte training en zorg.</p>
            <p>Onze trainingen zijn gebaseerd op positieve bekrachtiging en wetenschappelijk onderbouwde methoden, met respect voor zowel de fysieke als de mentale gezondheid van jouw hond.</p>
            <p>Met een persoonlijke benadering voor elke hond geven we een training dat perfect aansluit bij zijn of haar specifieke behoeften, of het nu gaat om revalidatie, conditieverbetering of plezierige activiteiten.</p>
            <p>Ontdek wat ons aanbod kan betekenen voor jouw hond. Neem contact op voor al je vragen of een afspraak te maken.</p>
            <a href="#!/contact" class="cta-button">Contacteer ons</a>
            `}
        ></post-element>
      </div>
     <div class="flex-container cards-row">
          <card-element
            image="./img/services/loopband.webp"
            title="Hondentraining"
            .description=${html`
                <p>Ontdek ons aanbod voor een fitte en gelukkige hond:</p>
                <ul>
                    <li>Fitness</li>
                    <li>Body & Balance</li>
                    <li>Loopbandtraining</li>
                    <li>Massage</li>
                    <li>Privétraining</li>
                </ul>
                `}
            link="#!/services"
            linkLabel="Bekijk alle trainingen"></card-element>
            <card-element
            image="/img/litters/litter1.webp"
            title="Border Collie"
            .description=${html`
                <p>
                  Het fokken van een nestje begint niet van vandaag op morgen. Het vraagt maandenlange voorbereiding, toewijding en soms ook slapeloze nachten. Elke beslissing wordt met uiterste zorg genomen, met als doel gezonde pups groot te brengen die niet alleen fysiek sterk zijn, maar ook sociaal en evenwichtig. Wij streven ernaar om nieuwe gezinnen te laten genieten van een hond die liefde en stabiliteit brengt, en blijven ook later een betrokken steunpunt mocht dat nodig zijn.
                </p>
                <ul>
                  <li>Expertise in gezondheid en genetische risico's</li>
                  <li>Zorgvuldige keuze van ouderdieren op basis van gezondheid en karakter</li>
                  <li>Bewaking van lage inteeltpercentages</li>
                  <li>Levenslange ondersteuning en hulp bij herplaatsing</li>
                </ul>
              `}
            link="#!/kodaxsiyala"
            linkLabel="Nestplanning"></card-element>
            </div><div class="flex-container cards-row">
          <card-element
            image="/img/services/fitness.webp"
            title="Fitness"
            .description=${html`
              <p>Versterk de spieren van je hond en help bij revalidatie na operatie met gerichte oefeningen.</p>
              `}
            price="€30 / 30min"
            link="#!/services"
            linkLabel="Meer info"></card-element>
          <card-element
            image="/img/services/bodybalance.webp"
            title="Body & Balance"
            .description=${html`
              <p>Help je hond zich bewust te worden van zijn lichaam met verschillende toestellen en ondergronden, ideaal voor het verbeteren van coördinatie en zelfvertrouwen.</p>
              `}
            price="€30 / 30min"
            link="#!/services"
            linkLabel="Meer info"></card-element>
            </div>
    <footer-element></footer-element>
    `;
  }
}
