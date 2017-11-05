<template lang="html">
  <b-container>
    <b-alert v-if="error != ''" show variant="danger">{{error}}</b-alert>
    <b-row>
      <b-col sm="3"><label for="email">Email:</label></b-col>
      <b-col sm="9">
        <b-form-input v-model="email" id="email" :state="true" type="email" placeholder="ex: nnc@mail.com"></b-form-input>
      </b-col>

      <b-col sm="3"><label for="password">Password:</label></b-col>
      <b-col sm="9">
        <b-form-input v-model="password" id="password" :state="true" type="password" placeholder="Password"></b-form-input>
      </b-col>
      <b-button @click="login" type="button" name="button">Sign-in</b-button>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      error: '',
    };
  },
  methods: {
    login() {
      this.$auth.signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.$router.push({ name: 'index' });
        })
        .catch((error) => {
          // Handle Errors here.
          this.error = error.message;
          // ...
        });
    },
  },
};
</script>

<style lang="css">
</style>
