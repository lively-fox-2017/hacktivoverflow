<template>
  <div id="app">
    <navigation/>
    <router-view/>
  </div>
</template>

<script>
import navigation from '@/components/navigation'
export default {
  name: 'app',
  components: {
    navigation
  },
  computed: {
    isLogin () {
      return this.$store.state.isLogin
    }
  },
  methods: {
    getAllQuestions () {
      this.$store.dispatch('allQuestions')
    },
    checkLogin () {
      if (localStorage.getItem('token')) {
        this.$store.commit('setLogin', true)

        let decodedToken = this.$jwt.decode()
        this.$store.commit('setUserId', decodedToken._id)
      } else {
        this.$store.commit('setLogin', false)
      }
    }
  },
  created () {
    this.getAllQuestions()
    this.checkLogin()
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
</style>
