<template lang="html">
  <div class="modal fade" id="addAnswer" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title" id="myModalLabel">Add Answer</h4>
        </div>
        <form class="form-group">
          <div class="modal-body">
            <textarea v-model="frmAnswer.answer" class="form-control" id="exampleTextarea" rows="3" placeholder="write your answer"></textarea>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            <button @click="addAnsw(frmAnswer)" type="button" class="btn btn-primary" data-dismiss="modal">Add Answer</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['frmAnswer'],
  methods: {
    addAnsw (answ) {
      this.$emit('emitAddAnswer', answ)
    }
  }
}
</script>

<style lang="css">
</style>
