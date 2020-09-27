<template>
  <div class="landing">
    <b-container>
      <h1>Landing Page</h1>
      <router-link to="/login">login</router-link>
      <hr />
      <button type="button" @click="onLogout">logout</button>
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
