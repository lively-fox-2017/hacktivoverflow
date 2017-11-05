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
  methods: {
    getAllQuestions () {
      this.$store.dispatch('allQuestions')
    }
  },
  created () {
    this.getAllQuestions()
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
</style>
