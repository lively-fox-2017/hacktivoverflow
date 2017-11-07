<template lang="html">
  <div class="container">
    <div class="row">
      <form class="form-horizontal" @submit.prevent="addNewQuestion()">
        <fieldset>
          <!-- <legend>Ask Question</legend> -->
          <div class="form-group">
            <label for="textArea" class="col-lg-2 control-label">Title</label>
            <div class="col-lg-7">
              <textarea class="form-control" rows="1" id="textArea" v-model="formAsk.title"></textarea>
            </div>
          </div>
          <div class="form-group">
            <label for="textArea" class="col-lg-2 control-label">Content</label>
            <div class="col-lg-7">
              <textarea class="form-control" rows="2" id="textArea" v-model="formAsk.content"></textarea>
            </div>
          </div>
          <div class="form-group">
            <div class="col-lg-7 col-lg-offset-2">
              <button type="submit" class="btn btn-primary">Submit</button>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
    <div class="row">
      <div class="col-md-10 col-md-offset-1">

        <questions-summary v-for="question in questions" :question="question" :key="question.id"></questions-summary>

      </div>
    </div>
  </div>
</template>

<script>
import QuestionsSummary from '@/components/QuestionsSummary'
import { mapActions, mapState } from 'vuex'
export default {
  data () {
    return {
      formAsk: {
        title: '',
        content: ''
      }
    }
  },
  components: {
    QuestionsSummary
  },
  methods: {
    ...mapActions([
      'getAllQuestions',
      'submitQuestion'
    ]),
    addNewQuestion () {
      this.submitQuestion(this.formAsk)
    }
  },
  computed: {
    ...mapState([
      'questions'
    ])
  },
  created () {
    this.getAllQuestions()
  }
}
</script>

<style lang="css" scoped>
.question img {
  height: 90px;
}

</style>
