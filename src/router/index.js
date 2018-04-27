import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login'
import MainIndex from '@/views/mainIndex'

Vue.use(Router)

/* 常量路由 */
export const constantRouterMap = [
  {
    path: '/login',
    component: Login,
    hidden: true
  },
  // { 
  //   path: '/mainIndex',
  //   name: '首页',
  //   component: MainIndex,
  //   hidden: true
  // },
  {
    path: '/aaa',
    name: '测试',
    component: MainIndex,
    hidden: true
  }
]


const router = new Router({
  // mode: 'history',
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})

export default router
