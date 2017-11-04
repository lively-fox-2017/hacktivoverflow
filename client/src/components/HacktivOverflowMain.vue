<template lang="html">
<div>
  <NavBar @openLoginDialog="openLoginDialog"/>
  <LoginDialog ref="Login"/>
</div>
</template>

<script>
import NavBar from '@/components/NavBar'
import LoginDialog from '@/components/LoginDialog'
export default {
  components: {
    NavBar,
    LoginDialog
  },
  methods: {
    openLoginDialog () {
      this.$refs['Login'].openDialog('Login')
    }
  }
}
</script>

<style lang="css">
</style>
