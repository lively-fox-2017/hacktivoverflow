<template>
  <div class="container">
    <div class="row">
      <div class="col-md-4">
        <h1>Edit your Answer</h1>
        <form v-on:submit.prevent="updateAnswer">
          <div class="form-group">
            <label for="content">Content</label>
            <textarea ref="content" name="content" v-model="content" cols="30" rows="5" class="form-control" required></textarea>
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
    props: ['id'],
    data () {
      return {
        content: ''
      }
    },
    methods: {
      fetchAnswer (id) {
        this.$http.get(`/answers/${id}`)
          .then(({ data }) => {
            if (this.$store.state.user_id === data.by._id) {
              this.content = data.content
            } else {
              this.$router.push('/answers')
            }
          })
          .catch((err) => {
            console.error(err)
          })
      },
      updateAnswer () {
        const newAnswer = {
          title: this.title,
          content: this.content
        }

        this.$http.put(`/answers/${this.id}`, newAnswer)
          .then(({ data }) => {
            this.$swal('Updated!', 'Your answer has been updated', 'success')
            window.history.back()
          })
          .catch((err) => {
            console.error(err)
          })
      }
    },
    created () {
      this.fetchAnswer(this.id)
    },
    watch: {
      id (newId) {
        this.fetchAnswer(newId)
      }
    },
    mounted () {
      this.$refs.content.focus()
    }
  }
</script>

<style></style>
