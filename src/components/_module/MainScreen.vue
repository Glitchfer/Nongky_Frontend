<template>
  <b-col cols="12" sm="12" md="12" lg="12" xl="12" class="main">
    <b-row cols="12" sm="12" md="12" lg="12" xl="12" class="row">
      <b-col cols="12" sm="12" md="5" lg="4" xl="4" class="chatList">
        <Left />
      </b-col>
      <b-col v-if="windowWidth >= 768" cols="12" sm="12" md="7" lg="8" xl="8" class="chatRoom">
        <Right />
      </b-col>
    </b-row>
  </b-col>
</template>

<script>
import Left from '../_base/left'
import Right from '../_base/right'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Main',
  data() {
    return {
      windowWidth: window.innerWidth
    }
  },
  components: {
    Left,
    Right
  },
  watch: {},
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize)
    })
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize)
  },
  computed: {
    ...mapGetters([])
  },
  created() {},
  methods: {
    ...mapActions([]),
    onResize() {
      this.windowWidth = window.innerWidth
      console.log(this.windowWidth)
    }
  }
}
</script>

<style scoped>
.main {
  position: absolute;
  top: 0;
  bottom: 0;
}
.row {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  box-shadow: 1px 1px 20px #6a83c7;
  border-radius: 10px;
  margin: 20px;
}

.chatList {
  color: white;
  width: 100%;
  height: 100%;
}
.chatRoom {
  color: white;
  width: 100%;
  height: 100%;
}
</style>
