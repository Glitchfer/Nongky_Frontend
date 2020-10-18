<template>
  <div class="page">
    <div class="login">
      <b-container>
        <h3>Register</h3>
        <p>Let's create your account!</p>
        <b-form @submit.prevent="onSubmit">
          <b-form-group id="input-group-1" label="Name:" label-for="input-1">
            <b-form-input
              id="input-1"
              required
              placeholder="Enter your name"
              v-model="form.user_name"
            ></b-form-input>
          </b-form-group>
          <b-form-group
            id="input-group-2"
            label="Phone number:"
            label-for="input-2"
          >
            <b-form-input
              id="input-1"
              type="number"
              required
              placeholder="Enter your phone number"
              v-model="form.user_phone"
            ></b-form-input>
          </b-form-group>
          <b-form-group id="input-group-2" label="Email" label-for="input-2">
            <b-form-input
              id="input-2"
              type="email"
              required
              placeholder="Enter email"
              v-model="form.user_email"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-3"
            label="Your Password:"
            label-for="input-3"
          >
            <b-form-input
              id="input-3"
              type="password"
              required
              placeholder="Enter password"
              v-model="form.user_password"
            ></b-form-input>
          </b-form-group>
          <br />
          <b-button type="submit" variant="primary">Register</b-button>
          <div class="hr">
            <hr />
            <div>
              <p>Register with</p>
            </div>
          </div>
          <b-button variant="danger" @click="onGoogle">Google</b-button>
          <br />
          <br />
          <div class="p4">
            <p>
              Nevermind,
              <router-link to="/login">Back !</router-link>
            </p>
          </div>
        </b-form>
      </b-container>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
export default {
  name: 'Register',
  data() {
    return {
      msg: '',
      form: {
        user_name: '',
        user_phone: null,
        user_email: '',
        user_password: ''
      }
    }
  },
  props: [],
  computed: {
    ...mapGetters([])
  },
  methods: {
    ...mapActions(['register']),
    ...mapMutations([]),
    onSubmit() {
      this.register(this.form)
        .then(result => {
          this.$bvToast.toast(result.msg, {
            title: 'Success',
            variant: 'success',
            solid: true
          })
          setTimeout(() => {
            this.$router.push({
              name: 'Login',
              params: {
                ...this.form.email
              }
            })
          }, 2000)
        })
        .catch(error => {
          this.msg = error.data.msg
          this.$bvToast.toast(this.msg, {
            title: 'Warning',
            variant: 'danger',
            solid: true
          })
        })
    },
    onGoogle() {
      this.$bvToast.toast(
        'This feature will be able to use as soon as posible',
        {
          title: 'Info',
          variant: 'info',
          solid: true
        }
      )
    }
  }
}
</script>

<style scoped src="../../assets/css/login.css"></style>
