<template lang="html">
  <b-container>
    {{questions}}
    {{a}}
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      a: '',
    };
  },
  computed: {
    questions() {
      this.$db.collection('questions').orderBy('createdAt').limit(20).get()
        .then((doc) => {
          console.log();
          return doc;
        })
        .catch((err) => {
          console.log();
          return err;
        });
    },
  },
  mounted() {
    this.$db.collection('questions').orderBy('createdAt').limit(20).get()
      .then((doc) => {
        console.log();
        this.a = doc;
      })
      .catch((err) => {
        console.log();
        this.a = err;
      });
  },
};
</script>

<style lang="css">
</style>
