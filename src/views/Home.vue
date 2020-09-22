<template>
  <div class="home">
    <b-container>
      <h1>Landing Page</h1>
      <router-link to="/login">login</router-link>
    </b-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Home',
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

<style src="../assets/css/home.css"></style>
<style scoped></style>
