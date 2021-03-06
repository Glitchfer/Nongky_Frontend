import axios from 'axios'
export default {
  state: {
    urlApi: process.env.VUE_APP_URL,
    isPicked: false,
    isPicked2: false,
    pickedData: {},
    allUser: {},
    inviteBy: '',
    foundData: {},
    friendList: {},
    invitationData: {},
    contactData: {},
    firstChat: []
  },
  mutations: {
    setFriendList(state, payload) {
      state.friendList = payload
    },
    setPicked(state, payload) {
      state.isPicked = payload[1]
      state.pickedData = payload[0]
    },
    setAllUser(state, payload) {
      state.allUser = payload
    },
    setInviteType(state, payload) {
      state.inviteBy = payload
    },
    setFoundData(state, payload) {
      state.foundData = payload
    },
    setErase(state) {
      state.foundData = {}
    },
    setInvitation(state, payload) {
      state.invitationData = payload
    },
    setContactData(state, payload) {
      state.contactData = payload
    },
    setFirstChat(state, payload) {
      state.firstChat = payload
      state.isPicked2 = payload[1]
    },
    setFirstChatData(state, payload) {
      state.firstChat = payload
    },
    clearPicked(state, payload) {
      state.isPicked2 = payload
    }
  },
  actions: {
    inviteResponse(context, payload) {
      const data = {
        user_id: payload[1].user_id,
        sender_id: payload[1].sender_id,
        response_status: payload[0]
      }
      return new Promise((resolve, reject) => {
        axios
          .patch(`${context.state.urlApi}friend/invitation`, data)
          .then(response => {
            resolve(response.data)
            context.commit('setInvitation', {})
          })
          .catch(error => {
            reject(error.response.data.msg)
          })
      })
    },
    invitation(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          // ini nampilin log error
          .post(`${context.state.urlApi}friend/invitation`, payload)
          .then(response => {
            if (response.data.status === 210) {
              return null
            } else {
              resolve(response.data.data)
              context.commit('setInvitation', response.data.data)
            }
          })
          .catch(error => {
            reject(error.response.data)
          })
      })
    },
    requestFriend(context, payload) {
      const form = {
        user_id: payload[1].user_id,
        friend_id: payload[0].user_id
      }
      return new Promise((resolve, reject) => {
        axios
          .post(`${context.state.urlApi}friend/add`, form)
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error.response)
          })
      })
    },
    friendList(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${context.state.urlApi}friend/${payload.user_id}`)
          .then(response => {
            resolve(response.data)
            context.commit('setFriendList', response.data.data)
          })
          .catch(error => {
            reject(error.response)
          })
      })
    },
    findFriends(context, payload) {
      if (payload[1].length < 1) {
        context.commit('setErase')
      } else {
        if (context.state.inviteBy === 'username') {
          return new Promise((resolve, reject) => {
            axios
              .post(`${context.state.urlApi}users/name`, payload[0])
              .then(response => {
                resolve(response.data.data)
                context.commit('setFoundData', response.data.data)
              })
              .catch(error => {
                reject(error.response.data)
                context.commit('setErase')
              })
          })
        } else if (context.state.inviteBy === 'email') {
          return new Promise((resolve, reject) => {
            axios
              .post(`${context.state.urlApi}users/email`, payload[0])
              .then(response => {
                resolve(response.data.data)
                context.commit('setFoundData', response.data.data)
              })
              .catch(error => {
                reject(error.response.data)
                context.commit('setErase')
              })
          })
        } else if (context.state.inviteBy === 'phone') {
          return new Promise((resolve, reject) => {
            axios
              .post(`${context.state.urlApi}users/phone`, payload[0])
              .then(response => {
                resolve(response.data.data)
                context.commit('setFoundData', response.data.data)
              })
              .catch(error => {
                reject(error.response.data)
                context.commit('setErase')
              })
          })
        } else {
          alert('Invalid params')
        }
      }
    },
    PickUser(context, payload) {
      context.commit('setPicked', payload)
    },
    allUser(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${context.state.urlApi}users`)
          .then(response => {
            resolve(response.data)
            context.commit('setAllUser', response.data.data)
          })
          .catch(error => {
            reject(error.response)
          })
      })
    },
    inviteBy(context, payload) {
      context.commit('setInviteType', payload)
    },
    erase(context) {
      context.commit('setErase')
    },
    throwContact(context, payload) {
      context.commit('setContactData', payload)
    },
    throwFirstChat(context, payload) {
      context.commit('setFirstChat', payload)
      context.commit('setPicked', [context.state.pickedData, false])
    }
  },
  getters: {
    getFirstChat(state) {
      return state.firstChat
    },
    getContactData(state) {
      return state.contactData
    },
    getFriendList(state) {
      return state.friendList
    },
    getInvitationData(state) {
      return state.invitationData
    },
    getPicked(state) {
      return state.isPicked
    },
    getPicked2(state) {
      return state.isPicked2
    },
    getPickedData(state) {
      return state.pickedData
    },
    getAllUser(state) {
      return state.allUser
    },
    getFoundData(state) {
      return state.foundData
    }
  }
}
