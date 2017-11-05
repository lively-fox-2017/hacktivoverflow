<template lang="html">
<div>
  <md-divider />
  <md-tabs md-fixed class="md-accent">
    <md-tab md-label="My Profile" md-icon="account_circle">
      <MyProfile :user="user"/>
    </md-tab>
    <md-tab md-label="My Question" md-icon="live_help">
      <MyQuestion :user="user"/>
    </md-tab>
    <md-tab md-label="My Answer" md-icon="forum">
      <MyAnswer :user="user"/>
    </md-tab>
  </md-tabs>
</div>
</template>

<script>
import MyProfile from '@/components/MyProfile'
import MyAnswer from '@/components/MyAnswer'
import MyQuestion from '@/components/MyQuestion'

export default {
  data () {
    return {
      user: {
        username: '',
        password: '',
        email: ''
      }
    }
  },
  components: {
    MyProfile,
    MyQuestion,
    MyAnswer
  },
  methods: {
    getUserData () {
      this.$http.get('/users/' + localStorage.getItem('token')).then(({data}) => {
        this.user.username = data.data.username
        this.user.password = data.data.password
        this.user.email = data.data.email
      }).catch((err) => {
        console.error(err)
      })
    }
  },
  created () {
    this.getUserData()
  }
}
</script>

<style lang="css">
</style>
