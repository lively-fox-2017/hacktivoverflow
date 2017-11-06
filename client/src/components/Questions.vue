<template>
  <div class="container">
    <Question
      v-if="questions.length"
      :questions="questions"
      @unvoteQuestion="fetchQuestions"
      @voteQuestion="fetchQuestions"
      @deleteQuestion="fetchQuestions"
    />
    <h1 v-else class="text-muted text-center">No questions available</h1>
  </div>
</template>

<script>
  import Question from '@/components/Question'
  export default {
    components: {
      Question
    },
    data () {
      return {
        questions: []
      }
    },
    methods: {
      fetchQuestions () {
        const userId = this.$store.state.user_id
        const userIdQuery = userId ? `?user_id=${userId}` : ''
        this.$http.get(`/questions${userIdQuery}`)
          .then(({ data }) => {
            this.questions = data
          })
          .catch((err) => {
            console.error(err)
          })
      }
    },
    mounted () {
      this.fetchQuestions()
    }
  }
</script>

<style></style>
