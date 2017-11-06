<template>
  <div>
    <div v-for="(question, index) in questions" class="row" :key="index">
      <div class="col-md-12">
        <h1>
          {{ question.title }}
          <span class="badge badge-success">
            <span class="glyphicon glyphicon-thumbs-up"></span>
            {{ question.votes }}
          </span>
        </h1>
        <p class="text-muted">
          By: {{ (question.author._id === $store.state.user_id) ? 'You' : question.author.name }}
        </p>
        <template v-if="isLoggedIn">
          <button @click="voteQuestion(question.slug)" v-if="!question.voted" class="btn btn-default">
            <span class="glyphicon glyphicon-thumbs-up"></span>
          </button>
          <button @click="unvoteQuestion(question.slug)" v-else class="btn btn-default">
            <span class="glyphicon glyphicon-thumbs-down"></span>
          </button>
          <template v-if="question.author._id === $store.state.user_id">
            <router-link :to="{ name: 'EditQuestion', params: { slug: question.slug } }" class="btn btn-default">
              <span class="glyphicon glyphicon-pencil"></span>
            </router-link>
            <button class="btn btn-danger" @click="confirmDeleteQuestion(question.slug)">
              <span class="glyphicon glyphicon-trash"></span>
            </button>
          </template>
        </template>
        <router-link class="btn btn-default" :to="{ name: 'QuestionContent', params: { slug: question.slug } }">
          See answers
        </router-link>
        <hr>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['questions'],
    methods: {
      voteQuestion (slug) {
        this.$http.patch('/questions/vote', {
          slug: slug,
          user_id: this.$store.state.user_id
        })
          .then((response) => {
            this.$emit('voteQuestion')
          })
          .catch((err) => {
            console.error(err)
          })
      },
      unvoteQuestion (slug) {
        this.$http.patch('/questions/unvote', {
          slug: slug,
          user_id: this.$store.state.user_id
        })
          .then((response) => {
            this.$emit('unvoteQuestion')
          })
          .catch((err) => {
            console.error(err)
          })
      },
      deleteQuestion (slug) {
        this.$http.delete(`/questions/${slug}`)
          .then((response) => {
            this.$swal('Successfully deleted!', { icon: 'success' })
            this.$emit('deleteQuestion')
          })
          .catch((err) => {
            console.error(err)
          })
      },
      confirmDeleteQuestion (slug) {
        this.$swal({
          title: 'Delete this question?',
          text: 'You can\'t undo this action',
          icon: 'warning',
          buttons: true,
          dangerMode: true
        }).then((confirmed) => {
          if (confirmed) {
            this.deleteQuestion(slug)
          }
        })
      }
    },
    computed: {
      isLoggedIn () {
        return this.$store.state.loggedIn
      }
    }
  }
</script>

<style>
  .badge-success {
    background-color: #5cb85c;
  }
</style>
