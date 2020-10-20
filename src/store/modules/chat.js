import axios from 'axios'
export default {
  state: {
    urlApi: process.env.VUE_APP_URL,
    chatList: {},
    firstRoomChat: {},
    roomChatLanjutan: {},
    // lastChat: {},
    recentRoom: '',
    room: 0
  },
  mutations: {
    setRoom(state, payload) {
      state.room = payload
    },
    setChatList(state, payload) {
      state.chatList = payload
    },
    setFirstRoomChat(state, payload) {
      state.firstRoomChat = payload
    },
    setRoomChatLanjutan(state, payload) {
      state.roomChatLanjutan = payload
    },
    setSocketData(state, payload) {
      state.roomChatLanjutan.push(payload)
    },
    // setLastChat(state, payload) {
    //   state.lastChat = payload
    // },
    setRecentRoom(state, payload) {
      state.recentRoom = payload
    }
  },
  actions: {
    updateStatus(context, payload) {
      const body = {
        room_id: payload[0],
        user_id: payload[1]
      }
      axios
        .post(`${context.state.urlApi}chat/unread`, body)
        .then(response => {
          const maping = response.data.data.map(function(val) {
            return val.table_id
          })
          for (let i = 0; i < maping.length; i++) {
            axios
              .patch(`${context.state.urlApi}chat/${maping[i]}`)
              .then(response => {
                // console.log(response.data)
              })
              .catch(error => {
                console.log(error)
              })
          }
        })
        .catch(error => {
          if (error.response === undefined) {
            alert('Tidak dapat terhubung ke server')
          }
        })
    },
    // lastChat(context, payload) {
    //   const data = []
    //   for (let i = 0; i < payload[0].length; i++) {
    //     const body = {
    //       room_id: payload[0][i],
    //       user_id: payload[1]
    //     }
    //     axios
    //       .post(`${context.state.urlApi}chat/last`, body)
    //       .then(response => {
    //         data.push(response.data)
    //       })
    //       .catch(error => {
    //         if (error.response === undefined) {
    //           alert('Tidak dapat terhubung ke server')
    //         }
    //       })
    //   }
    //   context.commit('setLastChat', data)
    // },
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
      // context.commit('setRoomChatLanjutan', {})
      context.commit('setFirstRoomChat', {})
      context.commit('setRoom', payload[1].room_id)
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
        if (payload[2].sender_id !== payload[1].user_id) {
          data = {
            sender_id: payload[1].user_id,
            friend_id: payload[2].sender_id,
            message: payload[0]
          }
        } else {
          data = {
            sender_id: payload[1].user_id,
            friend_id: payload[2].friend_id,
            message: payload[0]
          }
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
              data = {}
            }
          })
      })
    },
    clearRoom(context) {
      context.commit('setFirstRoomChat', {})
      context.commit('setRoomChatLanjutan', {})
    },
    socketData(context, payload) {
      context.commit('setSocketData', payload)
    },
    throwRoom(context, payload) {
      context.commit('setRecentRoom', payload)
    }
  },
  getters: {
    getRoomDummy(state) {
      return state.room
    },
    getRecentRoom(state) {
      return state.recentRoom
    },
    getListChat(state) {
      return state.chatList
    },
    getFirstChatHistory(state) {
      return state.firstRoomChat
    },
    getChatHistoryLanjutan(state) {
      return state.roomChatLanjutan
    }
    // getLastChat(state) {
    //   return state.lastChat
    // }
  }
}
