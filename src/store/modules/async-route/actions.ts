import { routes } from '@/router'

export const actions = {
  async generateRoutes({ commit }) {
    // 动态获取菜单
    const routers = routes.find((item) => item.name == 'Layout')!.children
    commit('setRouters', routers)
    return routers
  }
}
