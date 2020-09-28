<template>
  <div class="one">
    <div v-if="isPick === true" class="user-pick-true">
      <div class="two">
        <p v-if="isPick === true" @click="close" class="close"></p>
        <div class="sub-two-1">
          <div class="friend-profile">
            <img
              v-if="pickedData.user_image.length < 1"
              src="../../assets/img/propict.png"
              alt="#"
            />
            <img v-else :src="`${urlApi}${pickedData.user_image}`" alt="#" />
          </div>
          <div class="friend-name">
            <h5>
              {{
                pickedData.user_full_name === ''
                  ? pickedData.user_name
                  : pickedData.user_full_name
              }}
              <img src="../../assets/img/Union.png" alt="#" />
            </h5>
            <p class="p-online" v-if="pickedData.user_login_status === 1">
              Online
            </p>
            <p class="p-offline" v-else>Offline</p>
            <p v-if="typing !== false">{{ typing }} is Typing...</p>
          </div>
          <div class="dots">
            <img src="../../assets/img/Profilemenu.png" alt @click="onDots" />
            <div v-if="isDots === true" class="sub-dots">
              <div class="sub-dots-call">
                <img src="../../assets/img/call2.png" alt="" />
                <h6>Call</h6>
              </div>
              <div class="sub-dots-delete">
                <img src="../../assets/img/del.png" alt="" />
                <h6>Delete chat history</h6>
              </div>
              <div class="sub-dots-mute">
                <img src="../../assets/img/mute.png" alt="" />
                <h6>Mute notification</h6>
              </div>
              <div class="sub-dots-search">
                <img src="../../assets/img/Search1.png" alt="" />
                <h6>Search</h6>
              </div>
              <div class="sub-dots-profile">
                <img
                  @click="friendProfile('open')"
                  src="../../assets/img/Contacts2.png"
                  alt=""
                />
                <h6 @click="friendProfile('open')">Friend profile</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="three">
        <div class="msgRow" v-for="(item, index) in chat" :key="index">
          <div
            class="chat"
            :style="[
              item.sender_id === userData.user_id
                ? { justifyContent: 'flex-Start', flexDirection: 'row-reverse' }
                : { justifyContent: 'flex-start', flexDirection: 'row' }
            ]"
          >
            <div class="profile">
              <img
                v-if="item.sender_id === userData.user_id"
                :src="`${urlApi}${item.sender_image}`"
                alt="#"
                :style="[
                  item.sender_id === userData.user_id
                    ? { right: '0' }
                    : { left: '0' }
                ]"
              />
              <img
                v-else-if="item.sender_id !== userData.user_id"
                :src="`${urlApi}${item.sender_image}`"
                alt="#"
                :style="[
                  item.sender_id === userData.user_id
                    ? { right: '0' }
                    : { left: '0' }
                ]"
              />
            </div>
            <div
              class="profile2"
              :style="[
                item.sender_id === userData.user_id
                  ? {
                      transform: 'scaleX(1) rotate(92deg)',
                      borderColor: 'red',
                      marginLeft: '-5px'
                    }
                  : {
                      transform: 'scaleX(-1) rotate(92deg)',
                      borderColor: 'blue',
                      marginRight: '-5px'
                    }
              ]"
            ></div>
            <div class="msg">
              <p
                :key="index"
                :style="[
                  item.sender_id === userData.user_id
                    ? { borderColor: 'red' }
                    : { borderColor: 'blue' }
                ]"
              >
                {{ item.message }}
                <!-- {{ item2.message }} -->
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="four">
        <div class="typing">
          <input
            type="text"
            placeholder="Type your message.."
            v-model="text"
            v-on:keyup.enter="send(1)"
          />
          <div class="imgIcon">
            <img src="../../assets/img/Plus.png" alt />
            <img src="../../assets/img/Vector(3).png" alt />
            <img src="../../assets/img/Group81.png" alt />
          </div>
        </div>
      </div>
      <div v-if="isFriendProfile === true" class="fP">
        <img
          @click="friendProfile('back')"
          src="../../assets/img/back.png"
          alt=""
        />
      </div>
    </div>

    <div v-if="firstChat[1] === true" class="user-pick-true">
      <div class="two">
        <p v-if="firstChat[1] === true" @click="close2" class="close"></p>
        <div class="sub-two-1">
          <div class="friend-profile">
            <img
              v-if="getContactData.user_image.length < 1"
              src="../../assets/img/propict.png"
              alt="#"
            />
            <img
              v-else
              :src="`${urlApi}${getContactData.user_image}`"
              alt="#"
            />
          </div>
          <div class="friend-name">
            <h5>
              {{
                getContactData.user_full_name === ''
                  ? getContactData.user_name
                  : getContactData.user_full_name
              }}
              <img src="../../assets/img/Union.png" alt="#" />
            </h5>
            <p class="p-online" v-if="getContactData.user_login_status === 1">
              Online
            </p>
            <p class="p-offline" v-else>Offline</p>
          </div>
          <div class="dots">
            <img src="../../assets/img/Profilemenu.png" alt />
          </div>
        </div>
      </div>
      <div class="three">
        <div class="msgRow" v-for="(item, index) in chatHistory" :key="index">
          <div
            class="chat"
            :style="[
              item.sender_id === userData.user_id
                ? { justifyContent: 'flex-Start', flexDirection: 'row-reverse' }
                : { justifyContent: 'flex-start', flexDirection: 'row' }
            ]"
          >
            <div class="profile">
              <img
                v-if="item.sender_id === userData.user_id"
                :src="`${urlApi}${item.sender_image}`"
                alt="#"
                :style="[
                  item.sender_id === userData.user_id
                    ? { right: '0' }
                    : { left: '0' }
                ]"
              />
              <img
                v-else-if="item.sender_id !== userData.user_id"
                :src="`${urlApi}${item.sender_image}`"
                alt="#"
                :style="[
                  item.sender_id === userData.user_id
                    ? { right: '0' }
                    : { left: '0' }
                ]"
              />
              <!-- <img
                src="../../assets/img/propict.png"
                alt
                :style="[
                  item.sender_id === userData.user_id
                    ? { right: '0' }
                    : { left: '0' }
                ]"
              /> -->
            </div>
            <div
              class="profile2"
              :style="[
                item.sender_id === userData.user_id
                  ? {
                      transform: 'scaleX(1) rotate(92deg)',
                      borderColor: 'red',
                      marginLeft: '-5px'
                    }
                  : {
                      transform: 'scaleX(-1) rotate(92deg)',
                      borderColor: 'blue',
                      marginRight: '-5px'
                    }
              ]"
            ></div>
            <div class="msg">
              <p
                :style="[
                  item.sender_id === userData.user_id
                    ? { borderColor: 'red' }
                    : { borderColor: 'blue' }
                ]"
              >
                {{ item.message }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="four">
        <div class="typing">
          <input
            type="text"
            placeholder="Type your message.."
            v-model="text"
            v-on:keyup.enter="send(2)"
          />
          <!-- <b-form-textarea
            id="textarea"
            v-model="text"
            placeholder="Type your message.."
            rows="3"
            max-rows="6"
            v-on:keyup.enter="send"
          ></b-form-textarea> -->
          <div class="imgIcon">
            <img src="../../assets/img/Plus.png" alt />
            <img src="../../assets/img/Vector(3).png" alt />
            <img src="../../assets/img/Group81.png" alt />
          </div>
        </div>
      </div>
    </div>

    <div v-if="isPick === false && isPick2 === false" class="user-pick-false">
      <div class="noChat">
        <p>Please select a chat to start messaging</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import io from 'socket.io-client'
export default {
  name: 'Right',
  data() {
    return {
      socket: io('http://127.0.0.1:3001'),
      urlApi: process.env.VUE_APP_URL,
      text: '',
      isOnline: true,
      typing: false,
      isDots: false,
      isFriendProfile: false
    }
  },
  watch: {
    text(value) {
      if (value) {
        this.socket.emit('typing', {
          userName: this.userData.user_name,
          room: this.pickedData.room_id
        })
      } else {
        this.socket.emit('typing', {
          userName: false,
          room: this.pickedData.room_id
        })
      }
    }
  },
  created() {
    this.getChatList()
  },
  mounted() {
    // this.socket.on('chat', (data) => {
    //   this.socketData(data)
    // })
    this.socket.on('typingMessage', (data) => {
      this.typing = data.userName
    })
  },
  updated() {},

  computed: {
    ...mapGetters({
      isPick: 'getPicked',
      isPick2: 'getPicked2',
      firstChat: 'getFirstChat',
      getContactData: 'getContactData',
      pickedData: 'getPickedData',
      userData: 'userData',
      chatHistory: 'getFirstChatHistory',
      chat: 'getChatHistoryLanjutan'
    })
  },
  methods: {
    ...mapActions([
      'PickUser',
      'throwFirstChat',
      'clearRoom',
      'postChat',
      'chatList',
      'socketData'
    ]),
    friendProfile(val) {
      if (val === 'open') {
        this.isFriendProfile = true
      } else {
        this.isFriendProfile = false
      }
    },
    getChatList() {
      this.chatList(this.userData.user_id)
    },
    close() {
      this.PickUser([{}, false])
      this.clearRoom()
      this.text = ''
    },
    close2() {
      this.throwFirstChat(['', false])
      this.clearRoom()
      this.text = ''
    },
    send(value) {
      if (value === 2) {
        this.postChat([this.text, this.userData, this.getContactData, value])
        this.getChatList()
        this.text = ''
      } else {
        const setData = {
          room_id: this.pickedData.room_id,
          sender_id: this.userData.user_id,
          sender_name: this.userData.user_name,
          sender_image: this.userData.user_image,
          sender_email: this.userData.user_email,
          sender_phone: this.userData.user_phone,
          receiver_id: this.pickedData.friend_contact_id,
          receiver_name: this.pickedData.user_name,
          receiver_image: this.pickedData.user_image,
          receiver_email: this.pickedData.user_email,
          receiver_phone: this.pickedData.user_phone,
          message: this.text
        }
        this.postChat([this.text, this.userData, this.pickedData, value])
        this.socket.emit('privateRoom', setData)
        this.text = ''
      }
    },
    onDots() {
      if (this.isDots === false) {
        this.isDots = true
      } else {
        this.isDots = false
      }
    }
  }
}
</script>

<style scoped src="../../assets/css/right.css"></style>
