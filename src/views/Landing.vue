<template>
  <div class="landing">
    <b-container>
      <br />
      <h1>Selamat datang ^__^</h1>
      <hr />
      <br />
      <br />
      <p>silahkan login dahulu!</p>
      <router-link to="/login">login</router-link>
      <hr />
    </b-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Landing',
  data() {
    return {}
  },
  components: {},
  computer: {},
  computed: {
    ...mapGetters([])
  },
  methods: {
    ...mapActions(['logout'])
  }
}
</script>

<style src="../assets/css/landing.css"></style>
<style scoped></style>
