<template lang="html">
  <div>
    <h2 class="col-md-8 col-sm-12 col-md-offset-2 text-center">Answer Question</h2>
    <form class="form-horizontal col-md-7 col-sm-12 col-md-offset-2" @submit.prevent="AnswerQuestion">
      <fieldset>
        <div class="form-group">
          <label for="textArea" class="col-lg-2 control-label">Answer</label>
          <div class="col-lg-10">
            <textarea class="form-control" rows="3" id="textArea" placeholder="Your answer" v-model="answerForm.answer" required></textarea>
            <span class="help-block">Answer the question seriously.</span>
          </div>
        </div>
        <div class="form-group">
          <div class="col-lg-10 col-lg-offset-2">
            <button type="submit" class="btn btn-primary">Submit</button>
            <button type="reset" class="btn btn-default">Cancel</button>
          </div>
        </div>
      </fieldset>
    </form>
  </div>
</template>

<script>
export default {
  props: ['questionId'],
  data () {
    return {
      answerForm: {
        answer: ''
      }
    }
  },
  methods: {
    AnswerQuestion () {
      let tkn = localStorage.getItem('token')

      this.$axios.post(`/answers/insert/${this.questionId}`, this.answerForm, {
        headers: {
          'token': tkn
        }
      })
      .then(({data}) => {
        this.$swal(
          'Post Answer Success!',
          'Hope your answer help',
          'success'
        )
        this.$store.dispatch('allAnswer', this.questionId)
        this.answerForm.answer = ''
      }).catch((reason) => {
        this.$swal(
          'Oops...',
          'Didnt match the requirement',
          'error'
        )
      })
    }
  }
}
</script>

<style scope>
  .form-horizontal{
    box-sizing: border-box;
    margin-bottom: 10px;
  }
</style>
