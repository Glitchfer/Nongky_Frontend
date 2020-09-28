import axios from 'axios'
export default {
  state: {
    urlApi: process.env.VUE_APP_URL,
    userProfileData: {}
  },
  mutations: {
    setUserProfileData(state, payload) {
      state.userProfileData = payload
    }
  },
  actions: {
    patchFoto(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .patch(`${context.state.urlApi}profile/${payload[0]}`, payload[1])
          .then(response => {
            resolve(response.data.msg)
          })
          .catch(error => {
            if (error.response === undefined) {
              alert('Tidak dapat terhubung ke server')
            } else {
              reject(error.response.data.msg)
              alert(error.response.data.msg)
            }
          })
      })
    },
    profileData(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${context.state.urlApi}users/${payload}`)
          .then(response => {
            resolve(response.data)
            context.commit('setUserProfileData', response.data.data[0])
          })
          .catch(error => {
            if (error.response === undefined) {
              alert('Tidak dapat terhubung ke server')
            } else {
              reject(error.response.data.msg)
              alert(error.response.data.msg)
            }
          })
      })
    }
  },
  getters: {
    getUserProfile(state) {
      return state.userProfileData
    }
  }
}
