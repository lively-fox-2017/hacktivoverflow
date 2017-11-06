<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <h1>
          {{ question.title }}
          <span class="badge badge-success">
            <span class="glyphicon glyphicon-thumbs-up"></span>
            {{ question.votes }}
          </span>
        </h1>
        <p>{{ question.content }}</p>
        <p class="text-muted">By: {{ question.author.name }}</p>
        <template v-if="isLoggedIn">
          <a href="#" @click="voteQuestion(question.slug)" v-if="!question.voted" class="btn btn-primary">
            <span class="glyphicon glyphicon-thumbs-up"></span>
          </a>
          <a href="#" @click="unvoteQuestion(question.slug)" v-else class="btn btn-danger">
            <span class="glyphicon glyphicon-thumbs-down"></span>
          </a>
        </template>
        <hr>
      </div>
    </div>

    <div class="row">
      <div class="col-md-4" v-if="isLoggedIn">
        <form v-on:submit.prevent="postAnswer">
          <div class="form-group">
            <label for="your-answer">Your Answer</label>
            <textarea name="your-answer" id="your-answer" v-model="your_answer" cols="30" rows="5" class="form-control" required></textarea>
          </div>
          <div class="form-group">
            <button type="submit" class="btn btn-primary">Submit Answer</button>
          </div>
        </form>
      </div>
      <div class="col-md-8">
        <Answers
          :answers="answers"
          @voteAnswer="fetchQuestionAnswers"
          @unvoteAnswer="fetchQuestionAnswers"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import Answers from '@/components/Answers'
  export default {
    props: ['slug'],
    components: {
      Answers
    },
    data () {
      return {
        question: {},
        answers: [],
        your_answer: ''
      }
    },
    methods: {
      fetchQuestionAnswers () {
        const userId = this.$store.state.user_id
        const userIdQuery = userId ? `?user_id=${userId}` : ''
        this.$http.get(`/questions/${this.slug}${userIdQuery}`)
          .then(({ data }) => {
            this.question = data
            this.$http.get(`/answers/question/${data._id}${userIdQuery}`)
              .then(({ data }) => {
                this.answers = data
              })
              .catch((err) => {
                console.error(err)
              })
          })
          .catch((err) => {
            console.error(err)
          })
      },
      voteQuestion (slug) {
        this.$http.patch('/questions/vote', {
          slug: slug,
          user_id: this.$store.state.user_id
        })
          .then((response) => {
            this.question.voted = true
            this.question.votes++
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
            this.question.voted = false
            this.question.votes--
          })
          .catch((err) => {
            console.error(err)
          })
      },
      postAnswer () {
        const newAnswer = {
          content: this.your_answer,
          by: this.$store.state.user_id,
          question_id: this.question._id
        }
        this.$http.post(`/answers`, newAnswer)
          .then(({ data }) => {
            this.$swal('Posted!', 'Your answer has been posted', 'success')
            this.your_answer = ''
            this.fetchQuestionAnswers()
          })
          .catch((err) => {
            console.error(err)
          })
      }
    },
    created () {
      this.fetchQuestionAnswers(this.slug)
    },
    watch: {
      slug (newSlug) {
        this.fetchQuestionAnswers(newSlug)
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
    background-color: #5cb85c!important;
  }
</style>
