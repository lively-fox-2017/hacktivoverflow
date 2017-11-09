<template lang="html">
  <div class="container">
    <!-- <legend v-if="answers.length>0">{{ answers[0].questionId.question }}</legend> -->
    <AnswerAdd :frmAnswer=frmAnswer @emitAddAnswer="addAnswer"></AnswerAdd>
    <AnswerEdit :frmAnswer=frmAnswer @emitEditAnswer="answerEdit"></AnswerEdit>
    <!-- <div class="list-group-item list-group-item-action active"> -->
      <!-- <legend>Question from {{ questionById.userId.username }} : {{ questionById.question }}</legend> -->
      <button @click="setAnswerBlank" type="button" class="btn btn-success" data-toggle="modal" data-target="#addAnswer">
        Add Answer
      </button> <br><br>
    <!-- </div><br> -->
    <div class="" v-if="answers.length==0">
      <div class="list-group">
        <div class="list-group-item list-group-item-action active">
          <h4>Answer Empty</h4>
        </div>
      </div>
    </div>
    <div v-else>
      <div v-for="answer in answers" class="list-group">
        <div class="list-group-item list-group-item-action active">
          <h4>{{ answer.userId.username }} says : </h4>
          <h4 class="list-group-item-heading">{{ answer.answer }}</h4><br>
          <!-- <div class="modal-footer"> -->
            <button @click="answerLike(answer._id)" type="button" name="button" class="btn btn-info">
              ({{ answer.like.length }}) Like
            </button>
            <button @click="answerDisLike(answer._id)" type="button" name="button" class="btn btn-warning">
              ({{ answer.dislike.length }}) Dislike
            </button>
            <div v-if="answer.userId._id != user.userId" class=""></div>
            <button v-else @click="setAnswer({_id:answer._id, answer: answer.answer})" type="button" name="button" class="btn btn-danger"
              data-toggle="modal" data-target="#editAnswer">
              Edit Answer
            </button>
          <!-- </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import AnswerAdd from '@/components/AnswerAdd'
import AnswerEdit from '@/components/AnswerEdit'
export default {
  components: {
    AnswerAdd,
    AnswerEdit
  },
  props: ['id'],
  data () {
    return {
      frmAnswer: {
        _id: '',
        answer: ''
      }
    }
  },
  methods: {
    ...mapActions([
      'getAnswerByQuestion',
      'answerAdd',
      'answerEdit',
      'answerLike',
      'answerDisLike',
      'getUserActive',
      'getQuestionById'
    ]),
    addAnswer (answ) {
      let data = {
        answer: answ.answer,
        questionId: this.id
      }
      this.answerAdd(data)
    },
    setAnswerBlank () {
      this.frmAnswer._id = ''
      this.frmAnswer.answer = ''
    },
    setAnswer (answ) {
      this.frmAnswer._id = answ._id
      this.frmAnswer.answer = answ.answer
    },
    editAnswer (answ) {
      this.answerEdit(answ)
    }
  },
  computed: {
    ...mapState([
      'answers',
      'user',
      'questionById'
    ])
  },
  mounted () {
    this.getAnswerByQuestion(this.id)
    this.getQuestionById(this.id)
    this.answer = ''
    this.getUserActive()
    // console.log(this.questionById)
  },
  watch: {
    id (newId) {
      this.getAnswerByQuestion(newId)
      this.getQuestionById(this.id)
    }
  }
}
</script>

<style lang="css">
</style>
