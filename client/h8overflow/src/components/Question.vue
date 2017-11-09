<template lang="html">
  <div class="panel panel-primary">
    <div class="panel-heading">
      <h3 class="panel-title">{{ questiondetail.title }}</h3>
      <ul class="nav navbar-nav navbar-right">
          <router-link to="" class="btn btn-primary btn-xs">Vote <span class="badge"  > {{ questiondetail.voters.length }}</span></router-link>
      </ul>
    </div>
    <div class="panel-body question">
      <div class="row">
        <!-- <div class="col-md-1">
          <img :src="questiondetail.askBy.imgUrl" alt="">
        </div> -->
        <div class="col-md-12">
          <p>{{ questiondetail.content }}</p>
        </div>

      </div>

      <ul class="nav nav-pills">
        <button type="button"  @click="voteupquestion(questiondetail._id)" class="btn btn-primary btn-sm" v-if="questiondetail.voters.filter(a => a.voter=='59f9d16eed550b7df8c5a813').length==0">Vote</button>
        <button type="button"  @click="votedownquestion(questiondetail._id)" class="btn btn-primary btn-sm" v-if="questiondetail.voters.filter(a => a.voter=='59f9d16eed550b7df8c5a813').length>0">UnVote</button>
        <button type="button" @click="deleteQuestion(questiondetail._id)" class="btn btn-danger btn-sm">Delete</button>
      </ul>
      <form class="form-horizontal" @submit.prevent="submitnewanswer(questiondetail._id)">
        <fieldset>
          <div class="form-group">
            <label for="textArea" class="col-lg-2 control-label" >Answer</label>
            <div class="col-lg-7">
              <textarea class="form-control" rows="2" id="textArea" v-model="myanswer"></textarea>
            </div>
          </div>
          <div class="form-group">
            <div class="col-lg-7 col-lg-offset-2">
              <button type="submit" class="btn btn-success btn-sm">Submit</button>
            </div>
          </div>
        </fieldset>
      </form>
        <answer v-for="answer in questiondetail.answers" :answer="answer" :key="answer._id"></answer>
    </div>
  </div>
</template>

<script>
import Answer from '@/components/Answer'
import { mapActions, mapState } from 'vuex'
export default {
  props: ['id'],
  components: {
    Answer
  },
  data () {
    return {
      myanswer: ''
    }
  },
  methods: {
    ...mapActions([
      'getDetail',
      'submitAnswer'
    ]),
    submitnewanswer (questionid) {
      let answer = {
        questionid: questionid,
        content: this.myanswer
      }
      console.log(answer)
      this.submitAnswer(answer)
    }
  },
  computed: {
    ...mapState([
      'questiondetail'
    ])
  },
  created () {
    this.getDetail(this.id)
  }
}
</script>

<style lang="css">
</style>
