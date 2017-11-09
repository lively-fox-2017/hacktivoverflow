<template>
  <div class="container">
    <div class="row">
      <div class="col-md-4">
        <h1>Edit your Question</h1>
        <form v-on:submit.prevent="updateQuestion">
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
    </div>
  </div>
</template>

<script>
  export default {
    props: ['slug'],
    data () {
      return {
        title: '',
        content: ''
      }
    },
    methods: {
      fetchQuestion (slug) {
        this.$http.get(`/questions/${slug}`)
          .then(({ data }) => {
            if (this.$store.state.user_id === data.author._id) {
              this.title = data.title
              this.content = data.content
            } else {
              this.$router.push('/questions')
            }
          })
          .catch((err) => {
            console.error(err)
          })
      },
      updateQuestion () {
        const newQuestion = {
          title: this.title,
          content: this.content
        }

        this.$http.put(`/questions/${this.slug}`, newQuestion)
          .then(({ data }) => {
            this.$swal('Updated!', 'Your question has been updated', 'success')
            this.$router.push('/questions')
          })
          .catch((err) => {
            console.error(err)
          })
      }
    },
    created () {
      this.fetchQuestion(this.slug)
    },
    watch: {
      slug (newSlug) {
        this.fetchQuestion(newSlug)
      }
    },
    mounted () {
      this.$refs.title.focus()
    }
  }
</script>

<style></style>
