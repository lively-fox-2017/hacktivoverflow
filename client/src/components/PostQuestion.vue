<template>
  <div class="container">
    <h1>Post a Question</h1>
    <div class="row">
      <div class="col-md-4">
        <form v-on:submit.prevent="postQuestion">
          <div class="form-group">
            <label for="title">Title</label>
            <input type="text" name="title" v-model="title" class="form-control" autocomplete="off" required>
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
    }
  }
</script>

<style></style>
