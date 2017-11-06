<template lang="html">
<div>
  <md-toolbar>
    <md-button class="md-icon-button" @click="toggleLeftSidenav">
      <md-icon>menu</md-icon>
    </md-button>
    <h2 class="md-title" style="flex: 1" @click="goToHome">Hacktiv Overflow</h2>
    <md-button v-on:click="openSearchDialog">Search</md-button>
    <md-button v-if="loggedIn" @click="goToDashboard">Dashboard</md-button>
    <md-button v-on:click="doLogout" v-if="loggedIn">LogOut</md-button>
    <md-button v-on:click="openLoginDialog" id="fab" v-else>Login</md-button>
  </md-toolbar>
  <md-sidenav class="md-left" ref="leftSidenav" @open="open('Left')" @close="close('Left')">
    <md-toolbar>
      <div class="md-toolbar-container">
        <h3 class="md-title" @click="goToHome">Hacktiv Overflow</h3>
      </div>
    </md-toolbar>
  </md-sidenav>
</div>
</template>

<script>
export default {
  methods: {
    toggleLeftSidenav () {
      this.$refs.leftSidenav.toggle()
    },
    open (ref) {
      console.log('Opened: ' + ref)
    },
    close (ref) {
      console.log('Closed: ' + ref)
    },
    openLoginDialog () {
      this.$emit('openLoginDialog')
    },
    openSearchDialog () {
      this.$emit('openSearchDialog')
    },
    doLogout () {
      localStorage.removeItem('token')
      this.$store.commit('toggleLog')
      this.$router.push('/')
      this.$swal({
        type: 'success',
        text: 'Logout Success'
      })
    },
    goToHome () {
      this.$router.push('/')
    },
    goToDashboard () {
      this.$router.push('/dashboard')
    }
  },
  computed: {
    loggedIn () {
      return this.$store.state.loggedIn
    }
  }
}
</script>

<style lang="css">

</style>
