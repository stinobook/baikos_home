import { html, css, LiteElement } from '@vandeurenglenn/lite'
import { customElement } from 'lit/decorators.js'
import '../components/footer.js'
import '../components/post.js'
import '../components/card.js'
import { scrollbar } from '../mixins/styles.js'

@customElement('home-view')
export class HomeView extends LiteElement {
static styles = [
    scrollbar,
    css`
        :host {
            width: 100%;
            overflow-y: auto;
            padding-bottom: 24px;
            flex-direction: column;
        }

        flex-container {
            max-width: 1280px;
            margin: 0 auto;
            flex-direction: row;
            gap: 12px;
            justify-content: center;
            align-items: stretch;
        }

      @media (max-width: 1280px) {
        flex-container {
            flex-direction: column;
            align-items: center;
        }
      }
        
        /* Testimonials section */
        .testimonials {
            display: none;
            padding: 80px 24px;
            text-align: center;
        }
        
        .testimonials-title {
            font-size: 2.4rem;
            font-weight: 600;
            margin-bottom: 48px;
            color: var(--md-sys-color-on-surface);
        }
        
        .testimonial-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            gap: 32px;
            max-width: 1200px;
            margin: 0 auto;
        }
        
        .testimonial-card {
            background-color: var(--md-sys-color-surface);
            border-radius: var(--md-sys-shape-corner-large);
            padding: 32px;
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
            text-align: left;
            transition: transform 0.3s ease;
            position: relative;
        }
        
        .testimonial-card:hover {
            transform: translateY(-5px);
        }
        
        .testimonial-card:before {
            content: '"';
            position: absolute;
            top: 20px;
            left: 20px;
            font-size: 5rem;
            color: var(--md-sys-color-primary);
            opacity: 0.2;
            line-height: 1;
        }
        
        .testimonial-text {
            font-style: italic;
            margin-bottom: 24px;
            position: relative;
            z-index: 1;
            padding-left: 16px;
            color: var(--md-sys-color-on-surface);
            font-size: 1.05rem;
            line-height: 1.6;
        }
        
        .testimonial-author {
            display: flex;
            align-items: center;
        }
        
        .testimonial-author-image {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            object-fit: cover;
            margin-right: 16px;
        }
        
        .testimonial-author-name {
            font-weight: 600;
            color: var(--md-sys-color-on-surface);
        }
        
        .testimonial-author-dog {
            font-size: 0.9rem;
            color: var(--md-sys-color-on-surface-variant);
        }

    `
];

  render() {
    return html`
    <flex-container>
      
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
      
      </flex-container>
     <flex-container>
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

            </flex-container><flex-container>
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
            </flex-container>
      <footer-element></footer-element>
    `;
  }
}
