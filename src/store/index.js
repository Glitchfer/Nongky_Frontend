import Vue from 'vue'
import Vuex from 'vuex'
import Login from './modules/login'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Login
  },
  state: {},
  mutations: {},
  actions: {},
  getters: {},
  plugins: [
    createPersistedState({
      paths: ['Login.user'],
      storage: window.sessionStorage
    })
  ]
})
