<template>
  <div class="landing">
    <b-container>
      <h1>Landing Page</h1>
      <router-link to="/login">login</router-link>
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
    ...mapActions([])
  }
}
</script>

<style src="../assets/css/landing.css"></style>
<style scoped></style>
