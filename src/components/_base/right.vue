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
        <div class="msgRow" v-for="(item, index) in 2" :key="index">
          <div
            class="chat"
            :style="[
              index % 2
                ? { justifyContent: 'flex-Start', flexDirection: 'row-reverse' }
                : { justifyContent: 'flex-start', flexDirection: 'row' }
            ]"
          >
            <div class="profile">
              <img
                src="../../assets/img/propict.png"
                alt
                :style="[index % 2 ? { right: '0' } : { left: '0' }]"
              />
            </div>
            <div
              class="profile2"
              :style="[
                index % 2
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
                  index % 2 ? { borderColor: 'red' } : { borderColor: 'blue' }
                ]"
              >
                {{ text }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="four">
        <div class="typing">
          <input type="text" placeholder="Type your message.." v-model="text" />
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
        <div class="msgRow" v-for="(item, index) in 2" :key="index">
          <div
            class="chat"
            :style="[
              index % 2
                ? { justifyContent: 'flex-Start', flexDirection: 'row-reverse' }
                : { justifyContent: 'flex-start', flexDirection: 'row' }
            ]"
          >
            <div class="profile">
              <img
                src="../../assets/img/propict.png"
                alt
                :style="[index % 2 ? { right: '0' } : { left: '0' }]"
              />
            </div>
            <div
              class="profile2"
              :style="[
                index % 2
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
                  index % 2 ? { borderColor: 'red' } : { borderColor: 'blue' }
                ]"
              >
                {{ text }}
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
  computed: {
    ...mapGetters({
      isPick: 'getPicked',
      firstChat: 'getFirstChat',
      getContactData: 'getContactData',
      pickedData: 'getPickedData'
    })
  },
  methods: {
    ...mapActions(['PickUser', 'throwFirstChat']),
    close() {
      this.PickUser(false)
    },
    close2() {
      this.throwFirstChat(['', false])
    },
    send(value) {
      if (value === 2) {
        console.log(this.text)
      }
    }
  }
}
</script>

<style scoped src="../../assets/css/right.css"></style>
