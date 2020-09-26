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
              {{ pickedData.user_name }}
              <img src="../../assets/img/Union.png" alt="#" />
            </h5>
            <p class="p-online" v-if="pickedData.user_login_status === 1">
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
            v-on:keyup.enter="send(1)"
          />
          <div class="imgIcon">
            <img src="../../assets/img/Plus.png" alt />
            <img src="../../assets/img/Vector(3).png" alt />
            <img src="../../assets/img/Group81.png" alt />
          </div>
        </div>
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
              {{ getContactData.user_name }}
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

    <div
      v-if="isPick === false && firstChat[1] === false"
      class="user-pick-false"
    >
      <div class="noChat">
        <p>Please select a chat to start messaging</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Right',
  data() {
    return {
      urlApi: process.env.VUE_APP_URL,
      text: '',
      isOnline: true
    }
  },
  created() {
    this.getChatList()
    this.getChathisto()
  },
  updated() {},
  computed: {
    ...mapGetters({
      isPick: 'getPicked',
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
      'chatList'
    ]),
    getChathisto() {
      this.chat()
    },
    getChatList() {
      this.chatList(this.userData.user_id)
    },
    close() {
      this.PickUser(false)
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
        this.postChat([this.text, this.userData, this.pickedData, value])
        this.text = ''
      }
    }
  }
}
</script>

<style scoped src="../../assets/css/right.css"></style>
