<template>
  <div class="page">
    <div class="login">
      <b-container>
        <h3>Login</h3>
        <p>Hi, Welcome back!</p>
        <b-form @submit.prevent="onSubmit">
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
          <div class="forgot">
            <router-link to="/forgot">Forgot password?</router-link>
          </div>
          <br />
          <b-button type="submit" variant="primary">Login</b-button>
          <div class="hr">
            <hr />
            <div><p>Login with</p></div>
          </div>
          <b-button variant="danger" @click="onGoogle">Google</b-button>
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
      msg: '',
      form: {
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
    ...mapActions(['login']),
    ...mapMutations([]),
    onSubmit() {
      this.login(this.form)
        .then(result => {
          alert(result.msg)
          console.log(result.data)
          this.$router.push({
            name: 'Window',
            params: {
              ...this.form.email
            }
          })
        })
        .catch(error => {
          this.msg = error.data.msg
          alert(this.msg)
        })
    },
    onGoogle() {
      alert('This feature will be able to use as soon as posible')
    }
  }
}
</script>

<style scoped src="../../assets/css/login.css"></style>
