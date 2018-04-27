import {login, logout} from '../../api/login'
import Cookies from 'js-cookie'
import hui from 'h_ui/dist/h_ui.min.js'

const user = {
  state: {
    user: '',
    token: Cookies.get('Admin-Token'),
    optAuths: []
  },
  mutations: {
    LOGIN_SUCCESS: () => {
      //console.log('登录成功')
    },
    LOGOUT_USER: state => {
      state.user = ''
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_OPT_AUTHS: (state, optAuths) => {
      state.optAuths = optAuths
    }
  },
  actions: {
    // 登录
    // 将token信息保存
    Login ({commit}, userInfo) {
      // Cookies.set('Admin-Token', 'admin')
      // commit('SET_TOKEN', 'admin')
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password, userInfo.checkcode).then(response => {
          const data = response.data
          // return_code: 0  登录成功
          // return_code: -1 用户名错误
          // return_code: -2 密码错误
          if (data && data[window.LOCAL_CONFIG.SUCCESS_KEY] == '0') {
            Cookies.set('Admin-Token', data.sessionId)
            window.sessionStorage.setItem('userName', username)
            commit('SET_TOKEN', data.sessionId)
          }
          resolve(data)
        }).catch(error => {
          reject(error)
        }) 
      })
    },
    // 登出
    // 将浏览器保存的token及权限清除
    Logout ({commit, state}) {
      return new Promise((resolve, reject) => {
        logout().then(response => {
          if (response.data[window.LOCAL_CONFIG.SUCCESS_KEY] == '0') {
            commit('SET_TOKEN', '')
            Cookies.remove('Admin-Token')
            Cookies.remove('lock')
            window.sessionStorage.removeItem('menus')
            window.sessionStorage.removeItem('menusType')
            window.sessionStorage.removeItem('userName')
            resolve()
          } else {
            hui.hMessage.error("未退出成功")
          }
        })
      })
    },
    ReLogin ({commit, state}) {
      commit('SET_TOKEN', '')
      Cookies.remove('Admin-Token')
      Cookies.remove('lock')
      window.sessionStorage.removeItem('menus')
      window.sessionStorage.removeItem('menusType')
      window.sessionStorage.removeItem('userName')
      location.reload()
    }
  }
}
export default user