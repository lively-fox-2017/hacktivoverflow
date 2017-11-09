<template lang="html">
  <div class="">
    <QuestionAdd :frmQuestion=frmQuestion @emitAddQuestion="questionAdd"></QuestionAdd>
    <QuestionEdit :frmQuestion=frmQuestion @emitEditQuestion="questionEdit"></QuestionEdit>
    <div class="list-group-item list-group-item-action active">
      <button :disabled="user.length==0" @click="setQuestionBlank" type="button" class="btn btn-primary" data-toggle="modal" data-target="#addQuestion">
        Add Question
      </button>
    </div><br>
    <!-- <AnswerEdit :frmAnswer=frmAnswer @emitEditAnswer="answerEdit"></AnswerEdit> -->
    <div v-for="question in questions" class="list-group">
      <div class="list-group-item list-group-item-action active">
        <img v-bind:src="question.userId.imageUrl" alt="" style="width: 40px; height: 50px">
        <h4>{{ question.userId.username }} ask :</h4>
        <h4 class="list-group-item-heading">{{ question.question }} </h4><br>
        <!-- <div class="modal-footer"> -->
        <div v-if="user.length === 0" class=""></div>
        <div v-else>
          <div class="row">
            <div class="col-md-7">
              posted at {{ question.date }}
            </div>
            <div class="col-md-5">
              <router-link :to="{ name: '', params: {} }"></router-link>
              <router-link :to="'/answers/' + question._id">
                <button type="button" name="button" class="btn btn-success">({{ question.answerId.length }}) Answer</button>
              </router-link>
              <button @click="questionLike(question._id)" type="button" name="button" class="btn btn-info">
                ({{ question.like.length }}) Like
              </button>
              <button @click="questionDisLike(question._id)" type="button" name="button" class="btn btn-warning">
                ({{ question.dislike.length }}) Dislike
              </button>

              <div v-if="question.userId._id != user.userId" class=""></div>
              <button v-else @click="setQuestion({_id:question._id, question: question.question})" type="button" name="button" class="btn btn-danger"
              data-toggle="modal" data-target="#editQuestion">
              Edit Question
            </button>
            </div>
          </div>
        </div>
        <!-- </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import QuestionAdd from '@/components/QuestionAdd'
import QuestionEdit from '@/components/QuestionEdit'
export default {
  components: {
    QuestionAdd,
    QuestionEdit
  },
  data () {
    return {
      frmQuestion: {
        _id: '',
        question: ''
      }
    }
  },
  methods: {
    ...mapActions([
      'getAllQuestion',
      'questionAdd',
      'questionEdit',
      'questionLike',
      'questionDisLike',
      'getUserActive'
    ]),
    setQuestionBlank () {
      this.frmQuestion._id = ''
      this.frmQuestion.question = ''
    },
    setQuestion (quest) {
      this.frmQuestion._id = quest._id
      this.frmQuestion.question = quest.question
    }
  },
  computed: {
    ...mapState([
      'questions',
      'user'
    ])
  },
  mounted () {
    // this.user =
    this.getUserActive()
  },
  created () {
    this.getAllQuestion()
  }
}
</script>

<style lang="css">
.setRigth {
  float: right;
}
</style>
