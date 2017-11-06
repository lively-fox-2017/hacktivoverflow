<template>
  <div id="app">
    <navbar/>
    <router-view/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
export default {
  name: 'app',
  components: {
    Navbar
  },
  created () {
    this.$store.commit('updateLoggedInState')
  }
}
</script>

<style>
</style>
