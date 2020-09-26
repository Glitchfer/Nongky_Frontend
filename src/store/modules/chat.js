import axios from 'axios'
export default {
  state: {
    urlApi: process.env.VUE_APP_URL,
    chatList: {}
  },
  mutations: {
    setChatList(state, payload) {
      state.chatList = payload
    }
  },
  actions: {
    chatList(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${context.state.urlApi}chat/${payload}`)
          .then(response => {
            context.commit('setChatList', response.data.data)
            resolve(response.data.data)
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
    getListChat(state) {
      return state.chatList
    }
  }
}
