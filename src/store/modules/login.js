import axios from 'axios'
import router from '../../router/index'
export default {
  state: {
    urlApi: process.env.VUE_APP_URL,
    user: {},
    token: localStorage.getItem('token') || null,
    activityId: null,
    userId: null
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
      state.token = payload.token
    },
    setActivity(state, payload) {
      state.userId = payload.user_id
      state.activityId = payload.id
    },
    delUser(state) {
      state.user = {}
      state.token = null
      state.userId = null
      state.activityId = null
    }
  },
  actions: {
    login(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${context.state.urlApi}users/login`, payload)
          .then(response => {
            context.commit('setUser', response.data.data)
            context.commit('setActivity', response.data.pagination)
            localStorage.setItem('token', response.data.data.token)
            resolve(response.data)
          })
          .catch(error => {
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
        axios
          .post(`${context.state.urlApi}users/register`, payload)
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            if (error.response === undefined) {
              alert('Tidak dapat terhubung ke server')
            } else {
              reject(error.response)
            }
          })
      })
    },
    logout(context, payload) {
      payload.toast('Anda akan dialihkan ke halaman login', {
        title: 'Info',
        variant: 'info',
        solid: true
      })
      if (context.state.userId === null && context.state.activityId === null) {
        return null
      } else {
        axios
          .patch(
            `${context.state.urlApi}users/?activity_id=${context.state.activityId}&user_id=${context.state.userId}`
          )
          .then(response => {
            payload.toast(response.data.msg, {
              title: 'Success',
              variant: 'success',
              solid: true
            })
            localStorage.removeItem('token')
            context.commit('delUser')
            setTimeout(() => {
              router.push('/login')
            }, 2000)
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    interceptorRequest(context) {
      axios.interceptors.request.use(
        function(config) {
          config.headers.Authorization = `Bearer ${context.state.token}`
          return config
        },
        function(error) {
          return Promise.reject(error)
        }
      )
    },
    interceptorResponse(context) {
      axios.interceptors.response.use(
        function(response) {
          return response
        },
        function(error) {
          if (error.response.status === 400) {
            if (
              error.response.data.msg === 'invalid token' ||
              error.response.data.msg === 'invalid signature'
            ) {
              axios
                .patch(
                  `${context.state.urlApi}users/?activity_id=${context.state.activityId}&user_id=${context.state.userId}`
                )
                .then(response => {})
                .catch(error => {
                  console.log(error)
                })
              localStorage.removeItem('token')
              context.commit('delUser')
              router.push('/login')
            } else if (error.response.data.msg === 'jwt expired') {
              axios
                .patch(
                  `${context.state.urlApi}users/?activity_id=${context.state.activityId}&user_id=${context.state.userId}`
                )
                .then(response => {})
                .catch(error => {
                  console.log(error)
                })
              localStorage.removeItem('token')
              context.commit('delUser')
              router.push('/login')
            }
          }
          return Promise.reject(error)
        }
      )
    }
  },
  getters: {
    isLogin(state) {
      return state.token !== null
    },
    userData(state) {
      return state.user
    }
  }
}
