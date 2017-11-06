<template lang="html">
<div>
  <md-card md-with-hover>
    <md-card-header>
      <div class="md-title">My Answer</div>
      <div class="md-subhead">{{user.username}}</div>
    </md-card-header>

    <md-card-content>
      <md-input-container>
        <label>Search</label>
        <md-input type="text" v-model="search"></md-input>
      </md-input-container>
      <md-divider/>
      <md-divider/>
      <md-divider/>
      <md-divider/>
      <md-card md-with-hover v-for="answer in computeAnswer">
        <md-card-header>
          <div class="md-title">{{answer.question_id.title}}</div>
          <div class="md-subhead">{{answer.question_id.posted_by.username}}<span style="float:right">asked at {{answer.question_id.created_at}}</span></div>
        </md-card-header>

        <md-card-content>
          {{answer.answer}}
        </md-card-content>

        <md-card-actions>
          <router-link :to="{ name: 'QuestionDetail', params: {question_id:answer.question_id._id} }" class="md-button md-raised">Show Details</router-link>
          <md-button @click="editAnswer(answer._id)">Edit</md-button>
          <md-button @click="deleteAnswer(answer._id)" class="md-warn">Delete</md-button>
        </md-card-actions>
      </md-card>
    </md-card-content>
  </md-card>
  <md-dialog-alert
  :md-content="alert.content"
  :md-ok-text="alert.ok"
  ref="updateAnswerNotif">
  </md-dialog-alert>
  <FormAnswer ref="componentFormAnswer" :answer="answer" @editAnswer="editedAnswer"/>
</div>
</template>

<script>
import FormAnswer from '@/components/FormAnswer'

export default {
  components: {
    FormAnswer
  },
  props: ['user'],
  data () {
    return {
      search: '',
      answers: [],
      answer: {
        _id: '',
        answer: ''
      },
      alert: {
        content: 'a',
        ok: 'a'
      }
    }
  },
  methods: {
    openQuestionDialog () {
      this.$refs.componentFormAnswer.openDialog('dialogFormAnswer')
    },
    getAnswers () {
      this.$http.get('/answers/posted_by/' + localStorage.getItem('token')).then(({data}) => {
        this.answers = data.data
      }).catch((err) => {
        console.error(err)
      })
    },
    editAnswer (id) {
      var index = this.answers.findIndex((element) => {
        if (element._id === id) {
          return element
        }
      })
      this.answer._id = this.answers[index]._id
      this.answer.answer = this.answers[index].answer

      this.openQuestionDialog()
    },
    deleteAnswer (id) {
      this.$http.delete('/answers/' + id).then(({data}) => {
        this.$refs['updateAnswerNotif'].open()
        this.alert.content = 'You have successfully delete an answer'
        this.alert.ok = 'Cool!'
        var index = this.answers.findIndex((element) => {
          if (element._id === id) {
            return element
          }
        })
        this.answers.splice(index, 1)
        console.log(data)
      }).catch((err) => {
        this.$refs['updateAnswerNotif'].open()
        this.alert.content = 'Oops there\'s something wrong'
        this.alert.ok = 'What?!'
        console.error(err)
      })
    },
    editedAnswer (val) {
      var index = this.answers.findIndex((element) => {
        if (element._id === val.data._id) {
          return element
        }
      })
      // this.answers[index] = val.data
      // this.answers.splice(index, 1)
      // this.answers.splice(index, 0, val.data)
      this.$set(this.answers[index], 'answer', val.data.answer)
      console.log(val.data)
    }
  },
  created () {
    this.getAnswers()
  },
  computed: {
    computeAnswer () {
      if (this.search) {
        var showedData = []
        this.answers.forEach(answer => {
          if (answer.answer.toLowerCase().indexOf(this.search.toLowerCase()) > -1 || answer.question_id.title.toLowerCase().indexOf(this.search.toLowerCase()) > -1 || answer.question_id.content.toLowerCase().indexOf(this.search.toLowerCase()) > -1 || answer.question_id.tags.indexOf('#' + this.search.toLowerCase()) > -1) {
            showedData.push(answer)
          }
        })
        return showedData
      } else {
        return this.answers
      }
    }
  }
}
</script>

<style lang="css">
</style>
