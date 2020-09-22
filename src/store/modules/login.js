import axios from 'axios'
import router from '../../router/index'
export default {
  state: {
    urlApi: process.env.VUE_APP_URL,
    user: {},
    token: localStorage.getItem('token') || null
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
      state.token = payload.token
    },
    delUser(state) {
      state.user = {}
      state.token = null
    }
  },
  actions: {
    login(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${context.state.urlApi}users/login-user`, payload)
          .then((response) => {
            context.commit('setUser', response.data.data)
            localStorage.setItem('token', response.data.data.token)
            resolve(response.data)
          })
          .catch((error) => {
            if (error.response === undefined) {
              alert('Tidak dapat terhubung ke server')
            } else {
              reject(error.response)
            }
          })
      })
    },
    register(context, payload) {
      return new Promise((resolve, reject) => {
        console.log(payload)
        axios
          .post(`${context.state.urlApi}register`, payload)
          .then((response) => {
            // resolve(response)
          })
          .catch((error) => {
            if (error.response === undefined) {
              alert('Tidak dapat terhubung ke server')
            } else {
              console.log(error.respons)
              // reject(error.response)
            }
          })
      })
    },
    logout(context, payload) {
      alert('Anda akan dialihkan ke halaman login')
      console.log(context.state.isOn)
      if (context.state.isOn === true) {
        router.push('/')
        localStorage.removeItem('token')
        context.commit('delUser')
      } else {
        return null
      }
    },
    interceptorRequest(context) {},
    interceptorResponse(context) {}
  },
  getters: {
    getFullUserData(state) {
      return state.fullData
    },
    isLogin(state) {
      return state.token !== null
    },
    userData(state) {
      return state.user
    }
  }
}
