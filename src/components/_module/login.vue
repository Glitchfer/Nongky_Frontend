<template>
  <div class="page">
    <div class="login">
      <b-container>
        <h3>Login</h3>
        <p>Hi, Welcome back!</p>
        <b-form @submit.prevent="onSubmit" @reset.prevent="onReset">
          <b-form-group id="input-group-2" label="Email" label-for="input-2">
            <b-form-input
              id="input-2"
              type="email"
              required
              placeholder="Enter email"
              v-model="form.email"
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
              v-model="form.password"
            ></b-form-input>
          </b-form-group>
          <div class="forgot">
            <router-link to="/forgot">Forgot password?</router-link>
          </div>
          <br />
          <b-button type="submit" variant="primary">Login</b-button>
          <div class="hr">
            <hr />
            <div><p>Login with</p></div>
          </div>
          <b-button variant="danger">Google</b-button>
          <br /><br />
          <div class="p4">
            <p>
              Don't have an account?
              <router-link to="/register">Sign Up</router-link>
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
  name: 'Login',
  data() {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  props: [],
  computed: {
    ...mapGetters([])
  },
  methods: {
    ...mapActions([]),
    ...mapMutations([]),
    onSubmit() {
      // this.$router.push({name: 'home', params: this.isPt}) <== untuk otorisasi badag app
      this.$router.push({
        name: 'Chat',
        params: {
          ...this.form
        }
      })
    },
    onReset() {
      this.form = {
        email: '',
        password: ''
      }
    }
  }
}
</script>

<style scoped src="../../assets/css/login.css"></style>
