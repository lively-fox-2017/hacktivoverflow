<template lang="html">
  <div>
    <h2 class="col-md-8 col-sm-12 col-md-offset-2 text-center">Ask Question</h2>
    <form class="form-horizontal col-md-7 col-sm-12 col-md-offset-2" @submit.prevent="AskQuestion">
      <fieldset>
        <div class="form-group">
          <label for="inputText" class="col-lg-2 control-label">Title</label>
          <div class="col-lg-10">
            <input class="form-control" id="inputText" placeholder="Title" type="text" v-model="questionForm.title" required>
          </div>
        </div>
        <div class="form-group">
          <label for="textArea" class="col-lg-2 control-label">Question</label>
          <div class="col-lg-10">
            <textarea class="form-control" rows="3" id="textArea" placeholder="Your question" v-model="questionForm.question" required></textarea>
            <span class="help-block">Ask anything regarding the developer worlds.</span>
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
  data () {
    return {
      questionForm: {
        title: '',
        question: ''
      }
    }
  },
  methods: {
    AskQuestion () {
      let tkn = localStorage.getItem('token')

      this.$axios.post('/questions/insert', this.questionForm, {
        headers: {
          'token': tkn
        }
      })
      .then(({data}) => {
        this.$swal(
          'Post Question Success!',
          'Hope somebody reply quickly',
          'success'
        )
        this.$store.dispatch('allQuestions')
        this.questionForm.title = ''
        this.questionForm.question = ''
      }).catch((reason) => {
        this.$swal(
          'Oops...',
          'Didnt match the requirement',
          'error'
        )
      })

      // console.log(this.questionForm)
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
