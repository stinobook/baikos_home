import { BaikoShell } from './shell.js'

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
    this.host.select(route)
    if (!customElements.get(`./${route}-view`)) await import(`./${route}.js`)
    const selected = this.host.pages.querySelector('.custom-selected')
    this.host.selected = selected
    if (Object.keys(params).length > 0) selected.params = params
  }
}
