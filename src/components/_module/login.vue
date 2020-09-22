<template>
  <div>
    <h1>LOGIN</h1>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
export default {
  name: 'Login',
  data() {
    return {}
  },
  props: [],
  computed: {
    ...mapGetters([])
  },
  methods: {
    ...mapActions([]),
    ...mapMutations([])
  }
}
</script>

<style scoped src="../../assets/css/login.css"></style>
