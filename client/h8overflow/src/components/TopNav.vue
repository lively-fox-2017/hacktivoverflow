<template lang="html">
  <div class="">
  <nav class="navbar navbar-default">
  <div class="container-fluid">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-2">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="#">H8overFlow</a>
    </div>

    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-2">
      <ul class="nav navbar-nav">
        <li>
          <router-link to="/">Home</router-link>
        </li>
        <li>
          <router-link   to="/" data-toggle="modal" data-target="#modalregister" >Register</router-link>
        </li>
        <li>
          <router-link   to="/" data-toggle="modal" data-target="#modallogin">Login</router-link>
        </li>
        <li>
          <a href="#" @click="logoutUser">Logout</a>
        </li>
      </ul>
      <ul class="nav navbar-nav navbar-right">
        <li><h4 v-if="activeuser!=''">Hi...{{ activeuser }}</h4></li>
      </ul>
    </div>
  </div>
</nav>
<!-- ==============modal register -->
<div class="modal" id="modalregister" >
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h4 class="modal-title">Register</h4>
      </div>
      <div class="modal-body">
        <div class="form-group">
          <label class="control-label" for="inputUsername">Username</label>
          <input class="form-control" id="inputUsername" v-model="newUser.username" type="text" required>
          <label class="control-label" for="inputPassword">Password</label>
          <input class="form-control" id="inputPassword" v-model="newUser.password" type="password" required>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" @click="registerUser(newUser)" data-dismiss="modal">Register</button>
      </div>
    </div>
  </div>
</div>
<!-- ==============modal register -->
<div class="modal" id="modallogin" >
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h4 class="modal-title">Login</h4>
      </div>
      <div class="modal-body">
        <div class="form-group">
          <label class="control-label" for="inputUsername">Username</label>
          <input class="form-control" id="inputUsername" v-model="newUser.username" type="text" required>
          <label class="control-label" for="inputPassword">Password</label>
          <input class="form-control" id="inputPassword" v-model="newUser.password" type="password" required>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" @click="loginUser(newUser)" data-dismiss="modal">Login</button>
      </div>
    </div>
  </div>
</div>

</div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  data () {
    return {
      newUser: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapActions([
      'registerUser',
      'loginUser',
      'logoutUser'
    ])
  },
  computed: {
    ...mapState([
      'activeuser'
    ])
  }
}
</script>

<style lang="css">
</style>
