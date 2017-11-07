<template lang="html">
  <div class="panel panel-warning">
    <div class="panel-heading">
      <h3 class="panel-title">{{ question.title }}</h3>
    </div>
    <div class="panel-body question">
      <div class="row">
        <div class="col-md-1">
          <img :src="question.askBy.imgUrl" alt="">
        </div>
        <div class="col-md-11">
          <p>{{ question.content }}</p>
        </div>

      </div>

      <ul class="nav nav-pills">
        <li class="active"><router-link :to="{ name: '', params: {} }" >Likes<span class="badge" v-if="question.voters.length > 0" >{{ question.voters.length }}</span></router-link></li>
      </ul>
      <form class="form-horizontal">
        <fieldset>
          <div class="form-group">
            <label for="textArea" class="col-lg-2 control-label">Answer</label>
            <div class="col-lg-7">
              <textarea class="form-control" rows="2" id="textArea"></textarea>
            </div>
          </div>
          <div class="form-group">
            <div class="col-lg-7 col-lg-offset-2">
              <button type="submit" class="btn btn-success">Submit</button>
            </div>
          </div>
        </fieldset>
      </form>
      <!-- =================== -->
        <answer></answer>
      <!-- ====================== -->
    </div>
  </div>
</template>

<script>
import Answer from '@/components/Answer'
export default {
  props: ['id'],
  components: {
    Answer
  },
  methods: {
  },
  created () {

  }
}
</script>

<style lang="css">
</style>
