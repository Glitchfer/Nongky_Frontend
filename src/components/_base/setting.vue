<template>
  <div class="setting">
    <div class="sub-setting-1">
      <img
        v-if="getUserProfile.user_image.length < 1"
        src="../../assets/img/propict.png"
        alt="#"
      />
      <img v-else :src="`${urlApi}${getUserProfile.user_image}`" alt="#" />
      <br />
      <input v-if="isInput === true" type="file" @change="imgUpload" />
      <h5 v-if="isInput === false">{{ getUserProfile.user_full_name }}</h5>
      <br />
      <input
        v-if="isInput === true"
        type="text"
        placeholder="input your full name.."
        v-model="form.user_full_name"
      />
      <hr />
      <h6>Account</h6>
      <h6 v-if="isInput === false">
        {{
          getUserProfile.user_phone.length > 8
            ? '+' + getUserProfile.user_phone
            : '-'
        }}
      </h6>
      <input
        v-if="isInput === true"
        type="number"
        placeholder="input your number"
        v-model="form.user_phone"
      />
      <p>Phone number</p>
      <h6 v-if="isInput === false">
        {{ '@' + getUserProfile.user_name }}
      </h6>
      <input
        v-if="isInput === true"
        type="text"
        placeholder="change username.."
        v-model="form.user_name"
      />
      <p>Username</p>
      <h6 v-if="isInput === false">
        {{ getUserProfile.user_bio }}
      </h6>
      <input
        v-if="isInput === true"
        type="text"
        placeholder="type your bio.."
        v-model="form.user_bio"
      />
      <p>Bio</p>
      <div class="change">
        <a v-if="isInput === false" @click="onChange" href="#"
          >Tab to change your data</a
        >
        <p class="submit" @click="onSubmit" v-if="isInput === true">Submit</p>
        <p class="cancel" @click="onCancel" v-if="isInput === true">Cancel</p>
      </div>
      <hr />
      <div class="location">
        <h5>Location</h5>
        <a @click="showLocation" href="#"> Show your location </a>
      </div>
      <div class="collections">
        <div class="sub-collection">
          <h6>Collections</h6>
        </div>
        <div class="sub-collection-2">
          <div class="cont">
            <div
              class="sub-cont"
              v-for="(item, index) in getUserCollection"
              :key="index"
            >
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
          <input type="file" @change="onUpload" />
        </div>
        <h1>+</h1>
      </div>
    </div>
    <div v-if="isLocation === true" class="maps">
      <p @click="off">x</p>
      <div class="sub-maps">
        <GmapMap
          :center="coordinate"
          :zoom="12"
          map-type-id="terrain"
          style="width: 500px; height: 300px"
        >
          <GmapMarker
            :position="coordinate"
            :clickable="true"
            :draggable="true"
            @click="onMarker"
            icon
          />
        </GmapMap>
      </div>
    </div>
    <div v-if="isCollection === true" class="collectionSellect">
      <div class="sub-sellection">
        <h4 @click="tutup">X</h4>
        <a href="#" @click="deleteFile">Delete file</a>
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
  name: 'Setting',
  data() {
    return {
      urlApi: process.env.VUE_APP_URL,
      isInput: false,
      isLocation: false,
      isCollection: false,
      collection: {
        fileName: '',
        type: '',
        id: ''
      },
      form: {
        image: '',
        user_full_name: '',
        user_phone: '',
        user_name: '',
        user_bio: ''
      },
      coordinate: {
        lat: 0,
        lng: 0
      }
    }
  },
  created() {
    this.profileData(this.userData.user_id)
    this.$getLocation()
      .then(coordinates => {
        this.coordinate = {
          lat: coordinates.lat,
          lng: coordinates.lng
        }
      })
      .catch(error => {
        this.$bvToast.toast(error, {
          title: 'Warning',
          variant: 'danger',
          solid: true
        })
      })
    this.getCollection(this.userData.user_id)
  },
  computed: {
    ...mapGetters(['userData', 'getUserProfile', 'getUserCollection'])
  },
  watch: {},
  methods: {
    ...mapActions([
      'patchFoto',
      'profileData',
      'getCollection',
      'deleteCollection',
      'addCollection',
      'updateLocation'
    ]),
    onUpload(event) {
      const data = new FormData()
      data.append('image', event.target.files[0])
      this.addCollection([this.userData.user_id, data])
        .then(result => {
          this.getCollection(this.userData.user_id)
          this.$bvToast.toast(result.msg, {
            title: 'Success',
            variant: 'success',
            solid: true
          })
        })
        .catch(error => {
          this.$bvToast.toast(`${error}`, {
            title: 'Warning',
            variant: 'danger',
            solid: true
          })
        })
    },
    onCollection(item) {
      this.collection.fileName = item.collection
      this.collection.type = item.collection_type
      this.collection.id = item.collection_id
      this.isCollection = true
    },
    tutup() {
      this.collection.fileName = ''
      this.collection.type = ''
      this.collection.id = ''
      this.isCollection = false
    },
    deleteFile() {
      this.deleteCollection([this.collection.id, this.$bvToast])
        .then(result => {
          this.getCollection(this.userData.user_id)
        })
        .catch(error => {
          this.$bvToast.toast(`${error}`, {
            title: 'Warning',
            variant: 'danger',
            solid: true
          })
        })
    },
    onMarker(position) {
      this.coordinate = {
        lat: position.latLng.lat(),
        lng: position.latLng.lng()
      }
      this.updateLocation([this.userData.user_id, this.coordinate])
    },
    showLocation() {
      this.isLocation = true
    },
    onChange() {
      this.isInput = true
    },
    onSubmit() {
      const data = new FormData()
      data.append('image', this.form.image)
      data.append('user_full_name', this.form.user_full_name)
      data.append('user_phone', this.form.user_phone)
      data.append('user_name', this.form.user_name)
      data.append('user_bio', this.form.user_bio)
      this.patchFoto([this.userData.user_id, data])
        .then(result => {
          this.$bvToast.toast(result, {
            title: 'Success',
            variant: 'success',
            solid: true
          })
          this.profileData(this.userData.user_id)
          this.form = {
            image: '',
            user_full_name: '',
            user_phone: '',
            user_name: '',
            user_bio: ''
          }
        })
        .catch(error => {
          this.$bvToast.toast(error, {
            title: 'Warning',
            variant: 'danger',
            solid: true
          })
        })
    },
    onCancel() {
      this.form = {
        image: '',
        user_full_name: '',
        user_phone: '',
        user_name: '',
        user_bio: ''
      }
      this.isInput = false
    },
    imgUpload(event) {
      this.form.image = event.target.files[0]
    },
    off() {
      this.isLocation = false
    }
  }
}
</script>

<style scoped src="../../assets/css/setting.css"></style>
<style scoped>
.vue-map-container {
  width: 100% !important;
}
</style>
