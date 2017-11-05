<template lang="html">
<div>
  <md-card md-with-hover>
    <md-card-header>
      <div class="md-title">My Profile</div>
      <div class="md-subhead">{{user.username}}</div>
    </md-card-header>
    <form @submit.prevent="updateProfile">
      <md-card-content>
        <md-button class="md-accent" @click="toggleEditUsername" style="float: right">(Edit)</md-button>
        <md-input-container>
          <label>Username</label>
          <md-input type="text" v-model="user.username" :disabled="usernameChange === 0" required></md-input>
        </md-input-container>
        <md-button class="md-accent" @click="toggleEditPassword" style="float: right">(Edit)</md-button>
        <md-input-container>
          <label>Password</label>
          <md-input type="password" v-model="user.password" :disabled="passwordChange === 0" required></md-input>
        </md-input-container>
        <md-button class="md-accent" @click="toggleEditEmail" style="float: right">(Edit)</md-button>
        <md-input-container>
          <label>Email</label>
          <md-input type="email" v-model="user.email" :disabled="emailChange === 0" required></md-input>
        </md-input-container>
      </md-card-content>

      <md-card-actions v-if="usernameChange === 1 || passwordChange === 1 || emailChange === 1">
        <md-button type="submit">Update</md-button>
      </md-card-actions>
    </form>
  </md-card>
  <md-dialog-alert
  :md-content="alert.content"
  :md-ok-text="alert.ok"
  ref="updateProfileNotif">
  </md-dialog-alert>
</div>
</template>

<script>
export default {
  props: ['user'],
  data () {
    return {
      usernameChange: 0,
      passwordChange: 0,
      emailChange: 0,
      alert: {
        content: 'a',
        ok: 'a'
      }
    }
  },
  methods: {
    toggleEditEmail () {
      if (this.emailChange) {
        this.emailChange = 0
      } else {
        this.emailChange = 1
      }
    },
    toggleEditPassword () {
      if (this.passwordChange) {
        this.passwordChange = 0
      } else {
        this.passwordChange = 1
      }
    },
    toggleEditUsername () {
      if (this.usernameChange) {
        this.usernameChange = 0
      } else {
        this.usernameChange = 1
      }
    },
    updateProfile () {
      var dataUpdate = {}
      if (this.emailChange) {
        dataUpdate.email = this.user.email
        this.toggleEditEmail()
      }
      if (this.passwordChange) {
        dataUpdate.password = this.user.password
        this.toggleEditPassword()
      }
      if (this.usernameChange) {
        dataUpdate.username = this.user.username
        this.toggleEditUsername()
      }
      console.log(dataUpdate)
      this.$http.put('/users/' + localStorage.getItem('token'), dataUpdate).then(({data}) => {
        this.$refs['updateProfileNotif'].open()
        this.alert.content = 'You have successfully edit your profile'
        this.alert.ok = 'Cool!'
        console.log(data)
      }).catch((err) => {
        this.$refs['updateProfileNotif'].open()
        this.alert.content = 'Oops there\'s something wrong'
        this.alert.ok = 'What?!'
        console.error(err)
      })
    }
  }
}
</script>

<style lang="css">
</style>
