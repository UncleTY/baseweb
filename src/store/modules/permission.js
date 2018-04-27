import {asyncRouterMap, constantRouterMap} from '../../router'
import Layout from '../../views/frame/Layout.vue'
import MainIndex from '../../views/mainIndex.vue'

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: [],
    searchRoute: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.routers = [...constantRouterMap.concat(routers)]
      state.addRouters = [...routers]
    },
    SEARCH_ROUTE: (state, data) => {
      state.searchRoute = data
    }
  },
  actions: {
    // 根据服务端菜单生成路由
    GenerateRoutesByMenus ({commit}, data) {
      return new Promise(resolve => {
        let accessedRouters = filterRouterByMenus([], data, [])
        let main = [{ 
          path: '/mainIndex',
          name: '首页',
          component: MainIndex,
          hidden: true
        }]
        let allRouter = [...main.concat(accessedRouters)]
        // 初始化页面配置
        let route = [{
          path: '/',
          component: Layout,
          redirect: '/mainIndex',
          children: allRouter
        }]
        commit('SET_ROUTERS', route)
        commit('SEARCH_ROUTE', accessedRouters)
        resolve()
      })
    }
  }
}
export default permission

/**
 * 根据后台传回的可用menus,递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param router
 * @param menus
 */
function filterRouterByMenus (router, menus, parentName) {
  if(menus && menus.length > 0) {
    for (let menu of menus) {
      if(menu.children && menu.children.length > 0) {
        filterRouterByMenus(router, menu.children)
      } else {
        router.push({
           path: menu.url, 
           name: menu.title,
           meta: {
            icon: menu.icon,
            hidden: menu.hidden,
           },
           redirect: menu.redirect,
           component: resolve => require(['@/views/bizViews'+ menu.url + '.vue'], resolve) 
        })
      }
    }
  } 
  return router
}
