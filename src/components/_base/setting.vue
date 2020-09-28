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
      form: {
        image: '',
        user_full_name: '',
        user_phone: '',
        user_name: '',
        user_bio: ''
      }
    }
  },
  created() {
    this.profileData(this.userData.user_id)
  },
  computed: {
    ...mapGetters(['userData', 'getUserProfile'])
  },
  watch: {},
  methods: {
    ...mapActions(['patchFoto', 'profileData']),
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
        .then((result) => {
          alert(result)
          this.profileData(this.userData.user_id)
          this.form = {
            image: '',
            user_full_name: '',
            user_phone: '',
            user_name: '',
            user_bio: ''
          }
        })
        .catch((error) => {
          alert(error)
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
    },
    imgUpload(event) {
      this.form.image = event.target.files[0]
      // const data = new FormData()
      // data.append('image', this.form.image)
    }
  }
}
</script>

<style scoped src="../../assets/css/setting.css"></style>
