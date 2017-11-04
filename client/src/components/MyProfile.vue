<template lang="html">
  <md-card md-with-hover>
    <md-card-header>
      <div class="md-title">My Profile</div>
      <div class="md-subhead">Username</div>
    </md-card-header>
    <form>
      <md-card-content>
        <md-input-container>
          <label>Username</label>
          <md-input type="text" v-model="username" disabled></md-input>
        </md-input-container>
        <md-input-container>
          <label>Password</label>
          <md-input type="password" v-model="password" disabled></md-input>
        </md-input-container>
        <md-input-container>
          <label>Email</label>
          <md-input type="email" v-model="email" disabled></md-input>
        </md-input-container>
      </md-card-content>

      <md-card-actions>
        <md-button>Update</md-button>
      </md-card-actions>
    </form>
  </md-card>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      password: '',
      email: ''
    }
  }
}
</script>

<style lang="css">
</style>
