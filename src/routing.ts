import { BaikoShell } from './shell.js'

export default class Router {
  host: BaikoShell

  constructor(host: BaikoShell) {
    this.host = host

    globalThis.onhashchange = this.#onhashchange
    console.log(location.hash)

    if (!location.hash) {
      location.hash = Router.bang('home')
    } else this.#onhashchange()
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
    await this.host.pages.updateComplete
    await this.host.selector.updateComplete
    this.host.select(route)
    if (!customElements.get(`./${route}.js`)) await import(`./${route}.js`)
  }
}
