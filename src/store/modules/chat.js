import axios from 'axios'
export default {
  state: {
    urlApi: process.env.VUE_APP_URL,
    chatList: {},
    firstRoomChat: {},
    roomChatLanjutan: {}
  },
  mutations: {
    setChatList(state, payload) {
      state.chatList = payload
    },
    setFirstRoomChat(state, payload) {
      state.firstRoomChat = payload
    },
    setRoomChatLanjutan(state, payload) {
      state.roomChatLanjutan = payload
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
    },
    chatRoom(context, payload) {
      const body = {
        user_id: payload[0],
        friend_id: payload[1]
      }
      return new Promise((resolve, reject) => {
        axios
          .post(`${context.state.urlApi}chat/chat_history`, body)
          .then(response => {
            context.commit('setFirstRoomChat', response.data.data)
            resolve(response.data.data)
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
    chatRoomLanjutan(context, payload) {
      context.commit('setRoomChatLanjutan', {})
      context.commit('setFirstRoomChat', {})
      const body = {
        room_id: payload[1].room_id
      }
      return new Promise((resolve, reject) => {
        axios
          .post(`${context.state.urlApi}chat/room`, body)
          .then(response => {
            context.commit('setRoomChatLanjutan', response.data.data)
            resolve(response.data.data)
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
    postChat(context, payload) {
      let data = {}
      if (payload[3] === 2) {
        data = {
          sender_id: payload[1].user_id,
          friend_id: payload[2].friend_id,
          message: payload[0]
        }
      } else {
        data = {
          sender_id: payload[1].user_id,
          friend_id: payload[2].sender_id,
          message: payload[0]
        }
      }
      return new Promise((resolve, reject) => {
        axios
          .post(`${context.state.urlApi}chat`, data)
          .then(response => {
            resolve(response.data.data)
            data = {}
          })
          .catch(error => {
            if (error.response === undefined) {
              alert('Tidak dapat terhubung ke server')
              data = {}
            } else {
              reject(error.response.data.msg)
              alert(error.response.data.msg)
              data = {}
            }
          })
      })
    },
    clearRoom(context) {
      context.commit('setFirstRoomChat', {})
      context.commit('setRoomChatLanjutan', {})
    }
  },
  getters: {
    getListChat(state) {
      return state.chatList
    },
    getFirstChatHistory(state) {
      return state.firstRoomChat
    },
    getChatHistoryLanjutan(state) {
      return state.roomChatLanjutan
    }
  }
}
