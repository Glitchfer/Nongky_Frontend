<template>
  <div class="setting">
    <div class="sub-setting-1">
      <img
        v-if="userData.user_image.length < 1"
        src="../../assets/img/propict.png"
        alt="#"
      />
      <img v-else :src="`${urlApi}${userData.user_image}`" alt="#" />
      <br />
      <input v-if="isInput === true" type="file" @change="imgUpload" />
      <h5 v-if="isInput === false">{{ userData.user_name }}</h5>
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
        {{ userData.user_phone.length > 8 ? '+' + userData.user_phone : '-' }}
      </h6>
      <input
        v-if="isInput === true"
        type="number"
        placeholder="input your number"
        v-model="form.user_phone"
      />
      <p>Phone number</p>
      <h6 v-if="isInput === false">
        {{ '@' + userData.user_name }}
      </h6>
      <input
        v-if="isInput === true"
        type="text"
        placeholder="change username.."
        v-model="form.user_name"
      />
      <p>Username</p>
      <h6 v-if="isInput === false">
        I'm senior frontend developer from tokopedia
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
        <a @click="onSubmit('submit')" v-if="isInput === true" href="#"
          >Submit</a
        >
        <a @click="onSubmit('cancel')" v-if="isInput === true" href="#"
          >Cancel</a
        >
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
        user_image: '',
        user_full_name: '',
        user_phone: '',
        user_name: '',
        user_bio: ''
      }
    }
  },
  created() {},
  computed: {
    ...mapGetters(['userData'])
  },
  watch: {},
  methods: {
    ...mapActions([]),
    onChange() {
      this.isInput = true
    },
    onSubmit(val) {
      if (val === 'submit') {
        console.log('change success')
      } else {
        this.form = {}
        this.isInput = false
      }
    }
  }
}
</script>

<style scoped src="../../assets/css/setting.css"></style>
