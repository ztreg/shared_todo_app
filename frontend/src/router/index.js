import Vue from 'vue'
import VueRouter from 'vue-router'
import storeFunc from '../store'
import routes from './routes'

Vue.use(VueRouter)

const store = storeFunc()

export default function ( /* { store, ssrContext } */ ) {
  const Router = new VueRouter({
    scrollBehavior: () => ({
      x: 0,
      y: 0
    }),
    routes,

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })
  Router.beforeEach((to, from, next) => {
    if (!to.meta.middleware) {
      return next()
    }
    const middleware = to.meta.middleware

    const context = {
      to,
      from,
      next,
      store
    }
    return middleware[0]({
      ...context
    })
  })
  return Router
}
