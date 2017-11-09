<template lang="html">
  <div class="panel">
    <div class="panel-body">
      <!-- <div class="col-md-1">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqzzdjI4PIbvPOvwYOlWunYnmjvHJgrDfS1jo56KuQyyUyImbXzg" alt="">
      </div> -->
      <div class="col-md-12">
        <p>{{answer.answer}}</p>
      </div>
      <ul class="nav nav-pills">
        <button type="button"  @click="voteupanswer(answer._id)" class="btn btn-primary btn-sm"   v-if="answer.voters.filter(a => a.voter==id).length==0">Vote</button>
        <button type="button"  @click="votedownanswer(answer._id)" class="btn btn-primary btn-sm" v-if="answer.voters.filter(a => a.voter==id).length>0">UnVote</button>
        <button type="button" @click="deleteanswer(answer._id)" class="btn btn-danger btn-sm" v-if="answer.answerBy==id">Delete</button>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: ['answer']
}
</script>

<style lang="css">
</style>
