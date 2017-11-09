<template lang="html">
  <div class="container">
    <!-- <h1>Hacktiv Overflow</h1><br><br> -->
    <!-- <router-link to="/question-add"><button type="button" name="button" class="btn btn-primary">Add Question</button></router-link> <br><br> -->
    <Question></Question>
  </div>
</template>

<script>
import Question from '@/components/Question'
export default {
  components: {
    Question
  }
}
</script>

<style lang="css">
</style>
