<template>
  <div class="contacts">
    <div class="sub-contacts-1">
      <h5>Contacts List</h5>
    </div>
    <div class="sub-contacts-2">
      <div
        v-for="(item, index) in getFriendList"
        :key="index"
        class="friend-list"
      >
        <div class="profile-picture" @click="onPick(item)">
          <img
            v-if="item.user_image.length < 1"
            src="../../assets/img/propict.png"
            alt="#"
          />
          <img v-else :src="`${urlApi}${item.user_image}`" alt="#" />
        </div>
        <div class="name" @click="onPick(item)">
          {{
            item.user_full_name === '' ? item.user_name : item.user_full_name
          }}
          <p>Online</p>
        </div>
      </div>
    </div>
    <div v-if="isContactClicked" class="sub-contacts-3">
      <img @click="back" class="back" src="../../assets/img/back.png" alt="" />
      <div class="cover">
        <img
          v-if="getContactData.user_image.length < 1"
          src="../../assets/img/propict.png"
          alt="#"
        />
        <img v-else :src="`${urlApi}${getContactData.user_image}`" alt="#" />
        <h4>
          {{
            getContactData.user_full_name === ''
              ? getContactData.user_name
              : getContactData.user_full_name
          }}
        </h4>
      </div>
      <div class="options">
        <div class="options-1">
          <div @click="onContact('first-chat')" class="chat">
            <img src="../../assets/img/Vector1).png" alt="" />
            <p>Chat</p>
          </div>
          <div class="call">
            <img src="../../assets/img/Vector(2).png" alt="" />
            <p>Free call</p>
          </div>
        </div>
        <div class="options-2">
          <h6>Photo & videos</h6>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Contacts',
  data() {
    return {
      urlApi: process.env.VUE_APP_URL,
      isContactClicked: false
    }
  },
  created() {
    this.getFriends()
  },
  computed: {
    ...mapGetters([
      'userData',
      'getFriendList',
      'getContactData',
      'getFirstChat',
      'getUserProfile'
    ])
  },
  watch: {},
  methods: {
    ...mapActions(['friendList', 'throwContact', 'throwFirstChat', 'chatRoom']),
    getFriends() {
      this.friendList(this.userData)
        .then((result) => {})
        .catch((error) => {
          console.log(error)
        })
    },
    onPick(data) {
      this.throwContact(data)
      this.isContactClicked = true
    },
    back() {
      this.isContactClicked = false
    },
    onContact(value) {
      this.throwFirstChat([value, true])
      this.chatRoom([this.userData.user_id, this.getContactData.friend_id])
        .then((result) => {
          // console.log(result)
        })
        .catch((error) => {
          console.log(
            error === 'Bad Request' ? 'Anda belum memilih kontak' : null
          )
        })
    }
  }
}
</script>

<style scoped src="../../assets/css/contacts.css"></style>
