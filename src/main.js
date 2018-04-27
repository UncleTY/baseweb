// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import hui from 'h_ui/dist/h_ui.min.js'
import 'h_ui/dist/h_ui.min.css'
import './style/main.scss'// 开发theme时修改main.scss中引入的custom.scss

import {getMenuList} from './api/login.js'

Vue.prototype.LOCAL_CONFIG = window.LOCAL_CONFIG

Vue.config.productionTip = false

Vue.use(hui)
const whiteList = ['/login']

Vue.config.debug = true
/* 页面刷新前进行权限校验 */
router.beforeEach((to, from, next) => {
/* 开启页面加载进度提示 */
  hui.hLoadingBar.start()
  if (store.getters.token) { //有token，证明已登录
    if (to.path === '/login') {
      next({path: '/'})
    } else {
      let menus = JSON.parse(window.sessionStorage.getItem('menus'));
      if (menus && menus.length > 0 && store.getters.addRouters.length > 0) {
        if (to.matched.length === 0) {
          from.path ? next({path:from.path }) : next({path: '/'})
        } else {
          next()
        }
      } else if (menus && menus.length > 0 && store.getters.addRouters.length == 0) {
        store.dispatch('GenerateMenuByMenus', menus)
        store.dispatch('GenerateRoutesByMenus', menus).then(() => {
          router.addRoutes(store.getters.addRouters)
          // 路由未定义     
          next({...to})
        })
      } else { 
        getMenuList(store.getters.token).then(res => {
          if (res && res.data && res.data.length > 0) {
            // 根据权限生成对应菜单
            store.dispatch('GenerateMenuByMenus', res.data)
            // 根据权限生成路由
            store.dispatch('GenerateRoutesByMenus', res.data).then(() => {
              router.addRoutes(store.getters.addRouters)
              // 路由未定义        
              next({...to})
            })
          }
        })
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('./login')
      hui.hLoadingBar.finish()
    }
  } 
})
router.afterEach(() => {
  hui.hLoadingBar.finish()
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
