import { BaikoShell } from './shell.js'

const routeMeta: Record<string, { title: string; description: string }> = {
  home: {
    title: "Baiko's Home | Hondentraining & Border Collie Fokker – Mere, België",
    description: "Baiko's Home in Mere biedt professionele hondentraining: fitness, body & balance, loopband en massage. Ook erkend Border Collie fokker. Neem contact op voor een afspraak."
  },
  about: {
    title: "Over ons – Baiko's Home | Madeline, hondentrainer & fokker",
    description: "Leer Madeline kennen, oprichter van Baiko's Home. Gediplomeerd in dierenzorg en animal rehab assistant. Actief als instructeur en Border Collie fokker sinds 2014."
  },
  services: {
    title: "Aanbod – Hondentraining bij Baiko's Home | Fitness, Massage & meer",
    description: "Ontdek het trainingsaanbod van Baiko's Home: hondenfitness (€30/30min), body & balance, loopbandtraining, massage en privétraining aan huis (€45/u)."
  },
  vision: {
    title: "Visie – Border Collie Fokkerij bij Baiko's Home",
    description: "De fokkerijvisie van Baiko's Home: gezonde ouderdieren, lage inteeltpercentages en levenslange opvolging voor elke pup. Kwaliteit boven kwantiteit."
  },
  studs: {
    title: "Reuen – Border Collie Dekreuen bij Baiko's Home",
    description: "Bekijk de Border Collie reuen van Baiko's Home. Gezonde, gekarakteriseerde honden met lage inteelt, beschikbaar voor dekking."
  },
  bitches: {
    title: "Teven – Border Collie Teven bij Baiko's Home",
    description: "Maak kennis met de Border Collie teven van Baiko's Home: Koda, Roylu, Siyala en Xorua. Fokdieren geselecteerd op gezondheid en karakter."
  },
  kodaxsiyala: {
    title: "Koda x Siyala – Nestplanning Border Collie | Baiko's Home",
    description: "Nestplanning Koda x Siyala bij Baiko's Home. Alles over de verwachte pups, inteeltpercentages en hoe je je kandidaat kunt stellen."
  },
  contact: {
    title: "Contact – Baiko's Home | Afspraak maken in Mere",
    description: "Neem contact op met Baiko's Home. Bosstraat 136, 9420 Mere. Bel +32 486 29 53 39 of mail info@baikoshome.be voor een afspraak of meer info."
  }
}

function updatePageMeta(route: string) {
  const meta = routeMeta[route] ?? routeMeta['home']
  document.title = meta.title
  let descEl = document.querySelector<HTMLMetaElement>('meta[name="description"]')
  if (descEl) descEl.setAttribute('content', meta.description)
  let ogTitleEl = document.querySelector<HTMLMetaElement>('meta[property="og:title"]')
  if (ogTitleEl) ogTitleEl.setAttribute('content', meta.title)
  let ogDescEl = document.querySelector<HTMLMetaElement>('meta[property="og:description"]')
  if (ogDescEl) ogDescEl.setAttribute('content', meta.description)
  let ogUrlEl = document.querySelector<HTMLMetaElement>('meta[property="og:url"]')
  if (ogUrlEl) ogUrlEl.setAttribute('content', `https://www.baikoshome.be/#!/${route}`)
}

export default class Router {
  host: BaikoShell

  constructor(host: BaikoShell) {
    this.host = host

    globalThis.onhashchange = this.#onhashchange

    if (!location.hash) {
      location.hash = Router.bang('home')
    }
    this.#onhashchange()
  }

  static bang(route: string) {
    return `#!/${route}`
  }

  static debang(route: string) {
    return route.split('#!/')[1]
  }

  static parseHash(hash) {
    const afterBang = Router.debang(hash)
    const splitted = afterBang.split('?')
    const routes = splitted[0].split('/')
    const route = routes[0]
    const subRoutes = routes.slice(1, -1)
    const params = {}

    if (splitted[1]) {
      for (const item of splitted[1].split('&')) {
        const [key, value] = item.split('=')
        params[key] = value
      }
    }

    return { route, routes, subRoutes, params }
  }

  #onhashchange = async () => {
    const { route, params } = Router.parseHash(location.hash)
    updatePageMeta(route)

    // Ensure the target view is defined before selection to avoid a transient
    // empty page during hash navigation (notably problematic on iOS Safari).
    if (!customElements.get(`${route}-view`)) {
      await import(`./${route}.js`)
    }

    this.host.select(route)
    const selected = this.host.pages.querySelector('.custom-selected')
    this.host.selected = selected
    if (Object.keys(params).length > 0) selected.params = params
  }
}
