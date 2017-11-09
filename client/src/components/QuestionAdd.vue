<template lang="html">
  <div class="modal fade" id="addQuestion" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title" id="myModalLabel">Add Question</h4>
        </div>
        <form class="form-group">
          <div class="modal-body">
            <textarea v-model="frmQuestion.question" class="form-control" id="exampleTextarea" rows="3" placeholder="write your question"></textarea>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            <button @click="addQuestion(frmQuestion)" type="button" class="btn btn-primary" data-dismiss="modal">Add Question</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['frmQuestion'],
  methods: {
    addQuestion (ques) {
      this.$emit('emitAddQuestion', ques)
    }
  }
}
</script>

<style lang="css">
</style>
