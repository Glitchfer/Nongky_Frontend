<template>
  <div class="container-one">
    <div class="container-two">
      <div class="sub-container-two-1">
        <h5>Nongky</h5>
        <div class="icon">
          <img @click="onAdd" src="../../assets/img/Plus.png" alt />
          <img @click="onSearch" src="../../assets/img/Search.png" alt />
          <img @click="onBar" src="../../assets/img/Menu.png" alt />
        </div>
      </div>
      <div class="sub-container-two-2">
        <b-input-group v-if="isSrc === true" class="mt-3">
          <b-form-input v-model="searchMsg" placeholder="Search or start new chat"></b-form-input>
        </b-input-group>
      </div>
      <div class="sub-container-two-2">
        <b-input-group v-if="isAdd === true" class="mt-3">
          <b-form-input v-model="searchAccount" placeholder="Fiend people with username"></b-form-input>
        </b-input-group>
      </div>
      <div class="sub-container-two-3">
        <h6>All</h6>
        <h6>Important</h6>
        <h6>Unread</h6>
        <h6>Read</h6>
      </div>
    </div>
    <div class="container-three">
      <div v-for="(item, index) in 2" :key="index" class="friend-list">
        <div class="profile-picture" @click="onFriendPick">
          <img src="../../assets/img/propict.png" alt="#" />
        </div>
        <div class="name" @click="onFriendPick">
          <h5>
            Mama
            <img src="../../assets/img/Union.png" alt="#" />
          </h5>
          <p>Why did you do that?</p>
        </div>
        <div class="notif">
          <p>15:20</p>
          <div class="count">
            <p>2</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Left',
  data() {
    return {
      isSrc: false,
      isAdd: false,
      isExpand: false,
      searchMsg: '',
      searchAccount: ''
    }
  },
  computed: {
    ...mapGetters(['getPicked'])
  },
  methods: {
    ...mapActions(['PickUser']),
    onSearch() {
      if (this.isSrc === false) {
        this.isSrc = true
        this.isAdd = false
      } else {
        this.isSrc = false
      }
    },
    onAdd() {
      if (this.isAdd === false) {
        this.isAdd = true
        this.isSrc = false
      } else {
        this.isAdd = false
      }
    },
    onBar() {
      if (this.isExpand === false) {
        this.isExpand = true
      } else {
        this.isExpand = false
      }
    },
    onFriendPick() {
      this.PickUser(true)
    }
  }
}
</script>

<style scoped src="../../assets/css/left.css"></style>
