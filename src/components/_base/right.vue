<template>
  <div class="one">
    <p v-if="isPick === true" @click="close" class="close"></p>
    <div v-if="isPick === true" class="user-pick-true">
      <div class="two">
        <div class="sub-two-1">
          <div class="friend-profile">
            <img src="../../assets/img/propict.png" alt />
          </div>
          <div class="friend-name">
            <h5>
              Mama
              <img src="../../assets/img/Union.png" alt="#" />
            </h5>
            <p v-if="isOnline === true">Online</p>
            <p v-else>Offline</p>
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
            :style="[index %2 ? {justifyContent: 'flex-Start', flexDirection: 'row-reverse'} : {justifyContent: 'flex-start', flexDirection: 'row'}]"
          >
            <div class="profile">
              <img
                src="../../assets/img/propict.png"
                alt
                :style="[index %2 ? {right: '0'} : {left: '0'}]"
              />
            </div>
            <div
              class="profile2"
              :style="[index %2 ? {transform: 'scaleX(1) rotate(92deg)', borderColor: 'red', marginLeft: '-5px'} : {transform: 'scaleX(-1) rotate(92deg)', borderColor: 'blue', marginRight: '-5px'}]"
            ></div>
            <div class="msg">
              <p
                :style="[index %2 ? {borderColor: 'red'} : {borderColor: 'blue'}]"
              >Permisi kak, mau tanya kalo gini bagaimana kak asdas asdasd afas a sfaf aaasf asf asfsa asdas asd asda sda sd asda asd as das sd as d?</p>
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
    <div v-else class="user-pick-false">
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
      text: '',
      isOnline: true
    }
  },
  computed: {
    ...mapGetters({ isPick: 'getPicked' })
  },
  methods: {
    ...mapActions(['PickUser']),
    close() {
      this.PickUser(false)
    }
  }
}
</script>

<style scoped src="../../assets/css/right.css"></style>
