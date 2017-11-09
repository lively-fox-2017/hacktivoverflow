<template>
  <div class="container">
    <div class="row">
      <div class="col-md-4">
        <h1>Post a Question</h1>
        <form v-on:submit.prevent="postQuestion">
          <div class="form-group">
            <label for="title">Title</label>
            <input type="text" ref="title" name="title" v-model="title" class="form-control" autocomplete="off" required>
          </div>
          <div class="form-group">
            <label for="content">Content</label>
            <textarea name="content" v-model="content" cols="30" rows="5" class="form-control" required></textarea>
          </div>
          <div class="form-group">
            <button type="submit" class="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
      <div class="col-md-8 well">
        <p class="text-center"><strong>Some tips before asking a question</strong></p>
        <h3>Search, and research</h3>
        <p>Have you thoroughly searched for an answer before asking your question? Sharing your research helps everyone. Tell us what you found (on this site or elsewhere) and why it didn’t meet your needs. This demonstrates that you’ve taken the time to try to help yourself, it saves us from reiterating obvious answers, and above all, it helps you get a more specific and relevant answer!</p>
        <h3>Be specific</h3>
        <p>If you ask a vague question, you’ll get a vague answer. But if you give us details and context, we can provide a useful, relevant answer.</p>
        <h3>Make it relevant to others</h3>
        <p>We like to help as many people at a time as we can. Make it clear how your question is relevant to more people than just you, and more of us will be interested in your question and willing to look into it.</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        title: '',
        content: '',
        author: this.$store.state.user_id
      }
    },
    methods: {
      postQuestion () {
        const newQuestion = {
          title: this.title,
          content: this.content,
          author: this.author
        }

        this.$http.post('/questions', newQuestion)
          .then(({ data }) => {
            this.$swal('Posted!', 'Your question has been posted', 'success')
            this.$router.push('/questions')
          })
          .catch((err) => {
            console.error(err)
          })
      }
    },
    mounted () {
      this.$refs.title.focus()
    }
  }
</script>

<style></style>
