<template lang="html">
  <b-container v-if="checked">
    <b-alert v-if="error.length!=0" show variant="danger">{{error}}</b-alert>
    <b-row>
      <b-col md="7">
        <b-form-input v-model="question.title" id="title" :state="true" type="text" placeholder="Title..."></b-form-input>
      </b-col>
    </b-row>
    <b-row class="title-question-gap"></b-row>
    <b-row>
      <b-col md="6">
        <b-form-textarea id="question"
                    :state="true"
                     v-model="question.question"
                     placeholder="Your question..."
                     :rows="3"
                     :max-rows="6">
        </b-form-textarea>
      </b-col>
      <b-col md="1">
        <b-button @click="post" class="button-post" variant="success" type="button" name="button">OK</b-button>
      </b-col>
    </b-row>
    <b-row class="title-question-gap"></b-row>
    <b-row>
      <b-col md="6">
        <b-form-input v-model="question.tags" id="tags" :state="true" type="text" placeholder="Tags..."></b-form-input>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      question: {
        title: '',
        question: '',
        tags: '',
      },
      checked: false,
      error: '',
    };
  },
  methods: {
    post() {
      if (!this.question.title || !this.question.question) {
        this.error = 'All field is required';
      } else {
        const email = this.$store.state.user.email;
        const user = this.$db.collection('users').doc(email);
        this.$db.collection('questions').add({
          title: this.question.title,
          description: this.question.question,
          comments: [],
          votes: [],
          tags: [],
          user,
          createdAt: new Date(),
        })
          .then((docRef) => {
            console.log('Document written with ID: ', docRef.id);
          })
          .catch((error) => {
            console.error('Error adding document: ', error);
          });
      }
    },
  },
  mounted() {
    const user = this.$store.state.user;
    if (user) {
      this.checked = true;
    } else {
      this.$router.push({ name: 'index' });
    }
  },
};
</script>

<style lang="css">
.title-question-gap{
  height: 20px;
}
.button-post{
  width: 100%;
  height: 100%;
}
</style>
