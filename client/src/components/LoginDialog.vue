<template lang="html">
<div>
  <md-dialog md-open-from="#fab" md-close-to="#fab" ref="Login">
    <form v-on:submit.prevent="login">
      <md-dialog-title>Create new note</md-dialog-title>
      <md-dialog-content>
        <md-input-container>
          <label>Username</label>
          <md-input type="text" v-model="username" required></md-input>
        </md-input-container>
        <md-input-container>
          <label>Password</label>
          <md-input type="password" v-model="password" required></md-input>
        </md-input-container>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-primary" @click="openDialog('Register')">SignUp</md-button>
        <md-button class="md-primary" @click="">Login with Facebok</md-button>
        <md-button class="md-primary" type="submit">Login</md-button>
      </md-dialog-actions>
    </form>
  </md-dialog>

  <md-dialog md-open-from="#fab" md-close-to="#fab" ref="Register">
    <form v-on:submit.prevent="register">
      <md-dialog-title>Register yourself to HacktivOverflow</md-dialog-title>
      <md-dialog-content>
        <md-input-container>
          <label>Email</label>
          <md-input type="email" v-model="email" required></md-input>
        </md-input-container>
        <md-input-container>
          <label>Username</label>
          <md-input type="text" v-model="username" required></md-input>
        </md-input-container>
        <md-input-container>
          <label>Password</label>
          <md-input type="password" v-model="password" required></md-input>
        </md-input-container>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-primary" @click="openDialog('Login');closeDialog('Register')">Cancel</md-button>
        <md-button class="md-primary" type="submit">Register</md-button>
      </md-dialog-actions>
    </form>
  </md-dialog>
  <md-dialog-alert
  :md-content="alert.content"
  :md-ok-text="alert.ok"
  ref="dialog3">
  </md-dialog-alert>
</div>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      password: '',
      email: '',
      alert: {
        content: 'a',
        ok: 'a'
      }
    }
  },
  methods: {
    openDialog (ref) {
      this.$refs[ref].open()
    },
    closeDialog (ref) {
      this.$refs[ref].close()
    },
    register () {
      this.$http.post('/auth/register', {
        email: this.email,
        username: this.username,
        password: this.password
      }).then(({data}) => {
        console.log(data)
        this.closeDialog('Register')
        this.openDialog('Login')
        this.openDialog('dialog3')
        this.alert.content = 'You have successfully registered'
        this.alert.ok = 'Cool!'
      }).catch((err) => {
        console.error(err)
        this.alert.content = 'There\' some error'
        this.alert.ok = 'Sad:('
        this.openDialog('dialog3')
      })
    },
    login () {
      this.$http.post('/auth/login', {
        username: this.username,
        password: this.password
      }).then(({data}) => {
        this.closeDialog('Login')
        this.openDialog('dialog3')
        this.alert.content = 'You have successfully logged in'
        this.alert.ok = 'Yeah!'
        localStorage.setItem('token', data.token)
        this.$store.commit('toggleLog')
      }).catch((err) => {
        this.alert.content = 'There\' some error'
        this.alert.ok = 'Sad:('
        this.openDialog('dialog3')
        console.error(err)
      })
    }
  }
}
</script>

<style lang="css">
</style>
