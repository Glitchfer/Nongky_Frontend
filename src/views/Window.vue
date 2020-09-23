<template>
  <b-container fluid class="window">
    <b-row class="main">
      <Main />
    </b-row>
  </b-container>
</template>

<script>
import Main from '../components/_module/MainScreen'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Window',
  data() {
    return {}
  },
  components: {
    Main
  },
  computer: {},
  computed: {
    ...mapGetters([])
  },
  methods: {
    ...mapActions([])
  }
}
</script>

<style scoped>
.window {
  text-align: center;
  width: 100%;
}
</style>
