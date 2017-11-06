<template>
  <div class="container">
    <h1>Welcome to HacktivOverflow</h1>
    <p v-if="!isLoggedIn">To post a question/answer you have to <router-link to="/login">login</router-link> first</p>
    <p v-else>Post a question, post an answer, give your goddamn contribution to this world boi</p>
  </div>
</template>

<script>
  export default {
    computed: {
      isLoggedIn () {
        return this.$store.state.loggedIn
      }
    }
  }
</script>

<style></style>
