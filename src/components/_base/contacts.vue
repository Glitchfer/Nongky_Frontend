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
          <p
            :style="[
              item.user_login_status === 0
                ? { color: 'rgb(129, 129, 129)' }
                : { color: 'rgb(0, 184, 0)' }
            ]"
          >
            {{ item.user_login_status === 0 ? 'Offline' : 'Online' }}
          </p>
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
      <div v-if="isCollection === false" class="contDetail">
        <h6>Phone Number</h6>
        <p>{{ getContactData.user_phone }}</p>
        <h6>Username</h6>
        <p>@{{ getContactData.user_name }}</p>
        <h6>Bio</h6>
        <p>{{ getContactData.user_bio }}</p>
        <h6>Location</h6>
        <p>{{ getContactData.user_lat }}, {{ getContactData.user_lng }}</p>
        <a href="#" @click="showLocation">show location</a>
      </div>
      <div v-if="isCollection === true" class="collection">
        <div class="sub-collection">
          <div class="sub-collection-1">
            <div v-for="(item, index) in getFriendCollections" :key="index">
              <img
                v-if="
                  item.collection_type === 'image/jpeg' ||
                    item.collection_type === 'image/png'
                "
                :src="`${urlApi}${item.collection}`"
                @click="onCollection(item)"
              />
              <video
                v-if="item.collection_type === 'video/mp4'"
                :src="`${urlApi}${item.collection}`"
                @click="onCollection(item)"
              ></video>
            </div>
          </div>
        </div>
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
        <div class="options-2" @click="photos">
          <h6>Photo & videos</h6>
        </div>
      </div>
      <div v-if="isLocation === true" class="maps">
        <p @click="off">x</p>
        <div class="sub-maps">
          <GmapMap
            :center="{
              lat: Number(getContactData.user_lat),
              lng: Number(getContactData.user_lng)
            }"
            :zoom="16"
            map-type-id="terrain"
            style="width: 500px; height: 300px"
          >
            <GmapMarker
              :position="{
                lat: Number(getContactData.user_lat),
                lng: Number(getContactData.user_lng)
              }"
              :clickable="false"
              :draggable="false"
              icon
            />
          </GmapMap>
        </div>
      </div>
    </div>
    <div v-if="isSellection === true" class="collectionSellect">
      <div class="sub-sellection">
        <h4 @click="tutup">X</h4>
        <img
          v-if="
            this.collection.type === 'image/jpeg' ||
              this.collection.type === 'image/png'
          "
          :src="`${urlApi}${collection.fileName}`"
        />
        <video
          v-if="this.collection.type === 'video/mp4'"
          :src="`${urlApi}${collection.fileName}`"
          width="50%"
          controls
        ></video>
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
      isContactClicked: false,
      isLocation: false,
      isCollection: false,
      friendId: '',
      collection: {
        fileName: '',
        type: '',
        id: ''
      },
      isSellection: false
    }
  },
  directives: {
    focus: {
      inserted: function(el) {
        el.focus()
      }
    },
    fontsize: {
      bind: function(el, binding) {
        if (binding.arg === 'small') {
          el.style.fontSize = '5px'
        } else {
          el.style.fontSize = '25px'
        }
      }
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
      'getUserProfile',
      'getFriendCollections'
    ])
  },
  watch: {},
  methods: {
    ...mapActions([
      'friendList',
      'throwContact',
      'throwFirstChat',
      'chatRoom',
      'friendCollections'
    ]),
    onCollection(item) {
      this.collection.fileName = item.collection
      this.collection.type = item.collection_type
      this.collection.id = item.collection_id
      this.isSellection = true
    },
    tutup() {
      this.collection.fileName = ''
      this.collection.type = ''
      this.collection.id = ''
      this.isSellection = false
    },
    showLocation() {
      this.isLocation = true
    },
    off() {
      this.isLocation = false
    },
    photos() {
      if (this.isCollection === false) {
        this.isCollection = true
        this.friendCollections(this.friendId)
      } else {
        this.isCollection = false
      }
    },
    getFriends() {
      this.friendList(this.userData)
        .then(result => {})
        .catch(error => {
          console.log(error)
        })
    },
    onPick(data) {
      this.throwContact(data)
      this.friendId = data.friend_id
      this.isContactClicked = true
    },
    back() {
      this.isContactClicked = false
    },
    onContact(value) {
      this.throwFirstChat([value, true])
      this.chatRoom([this.userData.user_id, this.getContactData.friend_id])
        .then(result => {
          // console.log(result)
        })
        .catch(error => {
          console.log(
            error === 'Bad Request' ? 'Anda belum memilih kontak' : null
          )
        })
    }
  }
}
</script>

<style scoped src="../../assets/css/contacts.css"></style>
<style scoped>
.vue-map-container {
  width: 100% !important;
}
</style>
