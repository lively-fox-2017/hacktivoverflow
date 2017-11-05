<template lang="html">
<div>
  <md-card md-with-hover>
    <md-card-header>
      <div class="md-title">My Question</div>
      <div class="md-subhead">{{user.username}}</div>
    </md-card-header>

    <md-card-content>
      <md-button class="md-raised md-primary" id="custom" @click="openQuestionDialog">Add New</md-button>
      <md-input-container>
        <label>Search</label>
        <md-input type="text" v-model="search"></md-input>
      </md-input-container>
      <md-divider/>
      <md-divider/>
      <md-divider/>
      <md-divider/>
      <md-card md-with-hover v-for="question in computeQuestion">
        <md-card-header>
          <div class="md-title">{{question.title}}</div>
          <div class="md-subhead"><span>Posted By: {{question.posted_by.username}}</span><span style="float:right">asked at {{question.created_at}}</span></div>
        </md-card-header>

        <md-card-content>
          {{question.content}}<br />
          <md-chip v-for="tag in question.tags">{{tag}}</md-chip>
        </md-card-content>

        <md-card-actions>
          <router-link :to="{ name: 'QuestionDetail', params: {question_id:question._id} }" class="md-button md-raised">Show Details</router-link>
          <md-button @click="editQuestion(question._id)">Edit</md-button>
          <md-button class="md-warn" @click="deleteQuestion(question._id)">Delete</md-button>
        </md-card-actions>
      </md-card>
      <md-divider/>
      <md-divider/>
      <md-divider/>
      <md-divider/>
    </md-card-content>
    <p style="color:white">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, nostrum odio. Dolores, sed accusantium quasi non, voluptas eius illo quas, saepe voluptate pariatur in deleniti minus sint. Excepturi.</p>
  </md-card>
  <FormQuestion :isEdit="isEdit" ref="componentFormQuestion" :question="question" @editQuestion="editedQuestion" @addedQuestion="addedQuestion"/>
  <md-dialog-alert
  :md-content="alert.content"
  :md-ok-text="alert.ok"
  ref="updateQuestionNotif">
  </md-dialog-alert>
</div>
</template>

<script>
import FormQuestion from '@/components/FormQuestion'

export default {
  components: {
    FormQuestion
  },
  props: ['user'],
  data () {
    return {
      search: '',
      questions: [],
      isEdit: false,
      question: {
        title: '',
        content: '',
        tags: '',
        edit: false
      },
      alert: {
        content: 'a',
        ok: 'a'
      }
    }
  },
  methods: {
    getQuestions () {
      this.$http.get('/questions/posted_by/' + localStorage.getItem('token')).then(({data}) => {
        this.questions = data.data
      }).catch((err) => {
        console.error(err)
      })
    },
    openQuestionDialog () {
      this.$refs.componentFormQuestion.openDialog('dialogFormQuestion')
    },
    deleteQuestion (id) {
      this.$http.delete('/questions/' + id).then(({data}) => {
        this.$refs['updateQuestionNotif'].open()
        this.alert.content = 'You have successfully delete a question'
        this.alert.ok = 'Cool!'
        var index = this.questions.findIndex((element) => {
          if (element._id === id) {
            return element
          }
        })
        this.questions.splice(index, 1)
        console.log(data)
      }).catch((err) => {
        this.$refs['updateQuestionNotif'].open()
        this.alert.content = 'Oops there\'s something wrong'
        this.alert.ok = 'What?!'
        console.error(err)
      })
    },
    editQuestion (id) {
      var index = this.questions.findIndex((element) => {
        if (element._id === id) {
          return element
        }
      })
      this.question._id = this.questions[index]._id
      this.question.title = this.questions[index].title
      this.question.content = this.questions[index].content
      this.question.tags = this.questions[index].tags.join(' ')
      this.question.edit = true
      this.openQuestionDialog()
    },
    editedQuestion (val) {
      var index = this.questions.findIndex((element) => {
        if (element._id === val.data._id) {
          return element
        }
      })
      this.questions[index] = val.data
      console.log(index)
      console.log(this.questions[index])
    },
    addedQuestion (val) {
      this.questions.unshift(val.data)
    }
  },
  created () {
    this.getQuestions()
  },
  computed: {
    computeQuestion () {
      if (this.search) {
        var showedData = []
        this.questions.forEach(question => {
          if (question.content.toLowerCase().indexOf(this.search.toLowerCase()) > -1 || question.tags.indexOf('#' + this.search.toLowerCase()) > -1 || question.title.toLowerCase().indexOf(this.search.toLowerCase()) > -1) {
            showedData.push(question)
          }
        })
        return showedData
      } else {
        return this.questions
      }
    }
  }
}
</script>

<style lang="css">
</style>
