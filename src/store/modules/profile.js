import axios from 'axios'
export default {
  state: {
    urlApi: process.env.VUE_APP_URL,
    userProfileData: {},
    userCollection: {},
    friendCollections: {}
  },
  mutations: {
    setUserProfileData(state, payload) {
      state.userProfileData = payload
    },
    setUserCollection(state, payload) {
      state.userCollection = payload
    },
    setFriendCollections(state, payload) {
      state.friendCollections = payload
    },
    clearCollections(state, payload) {
      state.friendCollections = {}
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
            }
          })
      })
    },
    getCollection(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${context.state.urlApi}collection/${payload}`)
          .then(response => {
            resolve(response.data)
            context.commit('setUserCollection', response.data.data)
          })
          .catch(error => {
            if (error.response === undefined) {
              alert('Tidak dapat terhubung ke server')
            } else {
              reject(error.response.data.msg)
            }
          })
      })
    },
    addCollection(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${context.state.urlApi}collection/${payload[0]}`, payload[1])
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            if (error.response === undefined) {
              alert('Tidak dapat terhubung ke server')
            } else {
              reject(error.response.data.msg)
            }
          })
      })
    },
    deleteCollection(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`${context.state.urlApi}collection/${payload[0]}`)
          .then(response => {
            payload[1].toast(`${response.data.msg}`, {
              title: 'Success',
              variant: 'success',
              solid: true
            })
            resolve(response.data)
          })
          .catch(error => {
            if (error.response === undefined) {
              alert('Tidak dapat terhubung ke server')
            } else {
              reject(error.response.data.msg)
            }
          })
      })
    },
    friendCollections(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${context.state.urlApi}collection/${payload}`)
          .then(response => {
            resolve(response.data)
            context.commit('setFriendCollections', response.data.data)
          })
          .catch(error => {
            if (error.response === undefined) {
              alert('Tidak dapat terhubung ke server')
            } else {
              context.commit('clearCollections')
              reject(error.response.data.msg)
            }
          })
      })
    },
    updateLocation(context, payload) {
      const data = {
        user_lat: payload[1].lat,
        user_lng: payload[1].lng,
        id: payload[0]
      }
      return new Promise((resolve, reject) => {
        axios
          .patch(`${context.state.urlApi}users/location`, data)
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            if (error.response === undefined) {
              alert('Tidak dapat terhubung ke server')
            } else {
              context.commit('clearCollections')
              reject(error.response.data.msg)
            }
          })
      })
    }
  },
  getters: {
    getUserProfile(state) {
      return state.userProfileData
    },
    getUserCollection(state) {
      return state.userCollection
    },
    getFriendCollections(state) {
      return state.friendCollections
    }
  }
}
