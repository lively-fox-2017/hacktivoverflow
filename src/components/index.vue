<template lang="html">
  <div class="">
    <b-button @click="logout" type="button" name="button">Logout</b-button>
    <b-button @click="postQuestion" type="button" name="button">Post Question</b-button>
    <b-button @click="recentQuestions" type="button" name="button">Recent Question</b-button>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$auth.signOut().then(() => {
        // Sign-out successful.
        this.$store.commit('setUser', null);
      }).catch((error) => {
        // An error happened.
        console.log(error);
      });
    },
    postQuestion() {
      this.$router.push({ name: 'post-question' });
    },
    recentQuestions() {
      this.$router.push({ name: 'recent-questions' });
    },
  },
};
</script>

<style lang="css">
</style>
