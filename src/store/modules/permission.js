import { constantRoutes } from '@/router'
import { getRouteList } from '@/api/route'
import mapRouter from '@/utils/mapping'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}
const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      getRouteList().then(response => {
        if (response.code === 20000) {
          const accessedRoutes = mapRouter(response.data)
          commit('SET_ROUTES', accessedRoutes)
          resolve(accessedRoutes)
        }
      })
    })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
