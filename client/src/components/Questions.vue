<template>
  <div class="container">
    <Question :questions="questions" />
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
        this.$http.get('/questions')
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
