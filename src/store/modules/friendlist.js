// import axios from 'axios'
export default {
  state: {
    urlApi: process.env.VUE_APP_URL,
    isPicked: false
  },
  mutations: {
    setPicked(state, payload) {
      state.isPicked = payload
    }
  },
  actions: {
    PickUser(context, payload) {
      context.commit('setPicked', payload)
    }
  },
  getters: {
    getPicked(state) {
      return state.isPicked
    }
  }
}
