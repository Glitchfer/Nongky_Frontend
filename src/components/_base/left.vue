<template>
  <div class="container-one">
    <div class="container-two">
      <div class="sub-container-two-1">
        <h5>Nongky</h5>
        <p @click="onNotif">{{ inviteCount }}</p>
        <div class="icon">
          <img @click="onAdd" src="../../assets/img/Plus.png" alt />
          <img @click="onSearch" src="../../assets/img/Search.png" alt />
          <img @click="onBar" src="../../assets/img/Menu.png" alt />
        </div>
      </div>
      <div class="sub-container-two-2">
        <b-input-group v-if="isSrc === true" class="mt-3">
          <b-form-input
            v-model="searchMsg"
            placeholder="Search message"
          ></b-form-input>
        </b-input-group>
      </div>
      <div class="sub-container-two-2">
        <b-input-group v-if="isAdd === true" class="mt-3">
          <b-form-input
            v-model="searchFriends"
            placeholder="Start chating with your friends"
          ></b-form-input>
        </b-input-group>
      </div>
      <div class="sub-container-two-3">
        <h6>All</h6>
        <h6>Important</h6>
        <h6>Unread</h6>
        <h6>Read</h6>
      </div>
    </div>
    <div class="container-three">
      <div
        v-for="(item, index) in getListChat"
        :key="index"
        class="friend-list"
      >
        <div class="profile-picture" @click="onFriendPick(item[1])">
          <img
            v-if="item[1].user_image.length < 1"
            src="../../assets/img/propict.png"
            alt="#"
          />
          <img v-else :src="`${urlApi}${item[1].user_image}`" alt="#" />
        </div>
        <div class="name" @click="onFriendPick(item[1])">
          <h5>
            {{
              item[1].user_full_name === ''
                ? item[1].user_name
                : item[1].user_full_name
            }}
          </h5>
          <div>
            <!-- <p>{{ getLastChat[index].data[0].message }}</p> -->
            <p>{{ item[1].message }}</p>
          </div>
        </div>
        <div class="notif">
          <!-- <p>
            {{ getLastChat[index].data[0].created }}
          </p> -->
          <p>
            {{ item[1].created }}
          </p>
          <!-- <div
            class="count"
            v-if="
              getLastChat[index].pagination[0].unread_count > 0 &&
                getPicked === false &&
                item.sender_id === getLastChat[index].data[0].sender_id
            "
          >
            <p>{{ getLastChat[index].pagination[0].unread_count }}</p>
          </div> -->
          <div
            v-if="
              item[0].unread_count > 0 &&
                getPicked === false &&
                item[1].sender_id === item[2].sender_id
            "
            class="count"
          >
            <p>{{ item[0].unread_count }}</p>
          </div>
        </div>
      </div>
    </div>
    <div v-if="isExpand === true" class="container-four">
      <div class="container-four-1">
        <div class="back">
          <p @click="close" class="close2"></p>
          <img @click="onSetting" src="../../assets/img/Settings.png" alt="" />
        </div>
        <div v-if="isSetting === true" class="userSetting">
          <Setting />
        </div>
        <div class="sub-container-four-1">
          <img
            v-if="getUserProfile.user_image.length < 1"
            src="../../assets/img/propict.png"
            alt="#"
          />
          <img v-else :src="`${urlApi}${getUserProfile.user_image}`" alt="#" />
          <h5>
            {{
              getUserProfile.user_full_name === ''
                ? getUserProfile.user_name
                : getUserProfile.user_full_name
            }}
          </h5>
        </div>
        <div class="sub-container-four-2">
          <div class="contact">
            <div class="iconImage">
              <img
                @click="onContacts"
                src="../../assets/img/Contacts.png"
                alt=""
              />
            </div>
            <p @click="onContacts">Contacts</p>
          </div>
          <div class="calss">
            <div class="iconImage">
              <img src="../../assets/img/Vector(2).png" alt="" />
            </div>
            <p>Calls</p>
          </div>
          <div class="archive">
            <div class="iconImage">
              <img src="../../assets/img/Rectangle37.png" alt="" />
            </div>
            <p>Save messages</p>
          </div>
          <div class="invite">
            <div @click="onInvite" class="iconImage">
              <img src="../../assets/img/Invitefriends.png" alt="" />
            </div>
            <p @click="onInvite">Invite friends</p>
          </div>
          <div class="faq">
            <div class="iconImage">
              <img src="../../assets/img/FAQ.png" alt="" />
            </div>
            <p>Nongky FAQ</p>
          </div>
          <div class="logout">
            <button type="button" @click="onLogout">logout</button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="isInvite === true" class="container-invite">
      <div class="tabInvite">
        <h4 @click="close">X</h4>
        <h5>Friend search</h5>
      </div>
      <div class="tabOptions">
        <b-form-group>
          <b-form-radio-group
            id="radio-group-2"
            v-model="selected"
            name="radio-sub-component"
          >
            <b-form-radio value="username">Username</b-form-radio>
            <b-form-radio value="email">Email</b-form-radio>
            <b-form-radio value="phone">Phone number</b-form-radio>
          </b-form-radio-group>
        </b-form-group>
      </div>
      <div class="tabSearchFriend">
        <b-form-input
          v-model="searchAccount"
          :placeholder="`Enter your friends ${selected}`"
        ></b-form-input>
      </div>
      <div class="tabFound">
        <div
          v-for="(item, index) in getFoundData"
          :key="index"
          class="found-list"
        >
          <div class="found-picture">
            <img
              v-if="item.user_image.length < 1"
              src="../../assets/img/propict.png"
              alt="#"
            />
            <img v-else :src="`${urlApi}${item.user_image}`" alt="#" />
            <!-- <img src="../../assets/img/propict.png" alt="#" /> -->
          </div>
          <div class="found-name">
            <h5>{{ item.user_name }}</h5>
          </div>
          <div class="found-add-btn">
            <img
              @click="invite_friend(item)"
              src="../../assets/img/Plus.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
    <div v-if="isRequest === true" class="friendRequest">
      <div
        v-for="(item, index) in getInvitationData"
        :key="index"
        class="req-list"
      >
        <div class="req-picture">
          <img src="../../assets/img/propict.png" alt="#" />
        </div>
        <div class="req-name">
          <h6>{{ item.user_name }}</h6>
        </div>
        <div class="btnAcc">
          <p @click="accept([1, item])">v</p>
          <p @click="accept([0, item])">x</p>
        </div>
      </div>
    </div>
    <div v-if="isContacts === true" class="contactList">
      <Contacts />
    </div>
  </div>
</template>

<script>
import Contacts from '../_base/contacts'
import Setting from '../_base/setting'
import { mapGetters, mapActions } from 'vuex'
import io from 'socket.io-client'
export default {
  name: 'Left',
  data() {
    return {
      urlApi: process.env.VUE_APP_URL,
      // socket: io(process.env.VUE_APP_URL),
      socket: io('http://127.0.0.1:3001'),
      isRequest: false,
      isSrc: false,
      isAdd: false,
      isExpand: false,
      isInvite: false,
      isContacts: false,
      isSetting: false,
      selected: 'username',
      searchMsg: '',
      searchFriends: '',
      searchAccount: '',
      errMsg: '',
      msgInvite: '',
      inviteCount: 0,
      chatListData: {},
      recentRoom: ''
    }
  },
  components: {
    Contacts,
    Setting
  },
  watch: {
    searchAccount(value) {
      const params = {
        user_email: value,
        user_name: value,
        user_phone: value
      }

      this.findFriends([params, value])
        .then(result => {})
        .catch(error => {
          this.errMsg = error.msg
        })
    }
  },
  computed: {
    ...mapGetters([
      'getPicked',
      'getFoundData',
      'userData',
      'getInvitationData',
      'getListChat',
      'getUserProfile'
      // 'getLastChat'
    ])
  },
  created() {
    this.getAllUser()
    this.getInvitation()
    this.getChatList()
    this.getprofileData()
  },
  mounted() {
    this.socket.on('chat', data => {
      this.socketData(data)
    })
  },
  updated() {
    this.inviteType()
    this.getInvitation()
    // this.getChatList()
  },
  methods: {
    ...mapActions([
      'PickUser',
      'allUser',
      'findFriends',
      'friendList',
      'inviteBy',
      'erase',
      'requestFriend',
      'invitation',
      'inviteResponse',
      'chatList',
      'chatRoomLanjutan',
      'logout',
      'profileData',
      'socketData',
      // 'lastChat',
      'updateStatus',
      'throwRoom'
    ]),
    getprofileData() {
      this.profileData(this.userData.user_id)
    },
    getChatList() {
      this.chatList(this.userData.user_id)
        .then(result => {
          // const room = result.map(function(val) {
          //   return val.room_id
          // })
          // this.lastChat([room, this.userData.user_id])
        })
        .catch(error => {
          this.$bvToast.toast(error, {
            title: 'Warning',
            variant: 'danger',
            solid: true
          })
        })
    },
    accept(val) {
      if (val[0] === 1) {
        this.inviteResponse(val)
          .then(result => {
            this.$bvToast.toast(result.msg, {
              title: 'Success',
              variant: 'success',
              solid: true
            })
          })
          .catch(error => {
            this.$bvToast.toast(error, {
              title: 'Warning',
              variant: 'danger',
              solid: true
            })
          })
      } else {
        this.inviteResponse(val)
          .then(result => {
            const data = {
              user_id: this.userData.user_id
            }
            this.invitation(data)
              .then(result => {})
              .catch(error => {
                console.log(error.msg)
              })
          })
          .catch(error => {
            this.$bvToast.toast(error, {
              title: 'Warning',
              variant: 'danger',
              solid: true
            })
          })
      }
    },
    getInvitation() {
      const data = {
        user_id: this.userData.user_id
      }
      this.invitation(data)
        .then(result => {
          this.inviteCount = result.length
        })
        .catch(error => {
          this.msgInvite = error.status
          this.inviteCount = 0
        })
    },
    invite_friend(data) {
      this.requestFriend([data, this.userData])
        .then(result => {})
        .catch(error => {
          this.$bvToast.toast(error, {
            title: 'Warning',
            variant: 'danger',
            solid: true
          })
        })
    },
    onSearch() {
      if (this.isSrc === false) {
        this.isSrc = true
        this.isAdd = false
      } else {
        this.isSrc = false
        this.searchMsg = ''
      }
    },
    inviteType() {
      this.inviteBy(this.selected)
    },
    onAdd() {
      if (this.isAdd === false) {
        this.isAdd = true
        this.isSrc = false
      } else {
        this.isAdd = false
        this.searchFriends = ''
      }
    },
    onBar() {
      this.getChatList()
      if (this.isExpand === false) {
        this.isExpand = true
      } else {
        this.isExpand = false
      }
    },
    onNotif() {
      if (this.isRequest === false) {
        this.isRequest = true
      } else {
        this.isRequest = false
      }
    },
    onFriendPick(data) {
      this.getChatList()
      this.PickUser([data, true])
      this.chatRoomLanjutan([this.userData.user_id, data])
        .then(result => {
          // this.updateStatus([result[0].room_id, this.userData.user_id])
          this.getChatList()
        })
        .catch(error => {
          this.$bvToast.toast(
            error === 'Bad Request' ? 'Anda belum memilih kontak' : null,
            {
              title: 'Warning',
              variant: 'danger',
              solid: true
            }
          )
        })
      if (this.recentRoom) {
        this.socket.emit('changeRoom', [data.room_id, this.recentRoom])
        this.recentRoom = data.room_id
        this.throwRoom(this.recentRoom)
      } else {
        this.socket.emit('setRoom', data)
        this.recentRoom = data.room_id
        this.throwRoom(this.recentRoom)
      }
    },
    getAllUser() {
      this.allUser()
    },
    close() {
      this.isExpand = false
      this.isInvite = false
      this.searchAccount = ''
      this.selected = 'username'
      this.erase()
      this.friendList(this.userData)
      this.isContacts = false
      this.getChatList()
    },
    onInvite() {
      this.isInvite = true
    },
    onContacts() {
      this.isContacts = true
    },
    onLogout() {
      this.logout(this.$bvToast)
    },
    onSetting() {
      if (this.isSetting === false) {
        this.isSetting = true
      } else {
        this.isSetting = false
      }
    }
  }
}
</script>

<style scoped src="../../assets/css/left.css"></style>
