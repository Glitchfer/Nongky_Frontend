import Vue from 'vue'
import Vuex from 'vuex'
import Login from './modules/login'
import Forgot from './modules/forgot'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Login,
    Forgot
  },
  state: {},
  mutations: {},
  actions: {},
  getters: {},
  plugins: [
    createPersistedState({
      paths: ['Login.user', 'Login.userId', 'Login.activityId'],
      storage: window.sessionStorage
    })
  ]
})
