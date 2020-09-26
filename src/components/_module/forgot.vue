<template>
  <div class="page">
    <div class="login">
      <b-container>
        <h3>Login</h3>
        <p>An activation link will be send to your e-mail</p>
        <b-form @submit.prevent="onSubmit">
          <b-form-group id="input-group-2" label="Email" label-for="input-2">
            <b-form-input
              id="input-2"
              type="email"
              required
              placeholder="Enter email"
              v-model="user_email"
            ></b-form-input>
          </b-form-group>
          <b-form-group
            id="input-group-3"
            label="Password:"
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
          <b-form-group
            id="input-group-3"
            label="Repeat Password:"
            label-for="input-3"
          >
            <b-form-input
              id="input-3"
              type="password"
              required
              placeholder="Repeat password"
              v-model="form.re_password"
            ></b-form-input>
          </b-form-group>
          <br />
          <b-button type="submit" variant="primary">Send</b-button>
          <br /><br />
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
  name: 'Forgot',
  data() {
    return {
      msg: '',
      user_email: '',
      form: {
        user_password: '',
        re_password: ''
      }
    }
  },
  props: [],
  computed: {
    ...mapGetters([])
  },
  methods: {
    ...mapActions(['forgot']),
    ...mapMutations([]),
    onSubmit() {
      this.forgot([this.user_email, this.form])
        .then((result) => {
          alert('Please check your e-mail')
          alert('try again, if you did not get your activation link')
          alert(result.msg)
          this.$router.push({
            name: 'Login',
            params: {
              ...this.form.email
            }
          })
        })
        .catch((error) => {
          this.msg = error
          alert(this.msg)
        })
    }
  }
}
</script>

<style scoped src="../../assets/css/login.css"></style>
