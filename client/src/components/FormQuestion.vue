<template lang="html">
<div>
  <md-dialog ref="dialogFormQuestion" md-open-from="#custom" md-close-to="#custom">
    <md-dialog-title>{{title}}</md-dialog-title>
    <form v-on:submit.prevent="save">
      <md-dialog-content>
        <md-input-container>
          <label>Question Title</label>
          <md-input type="text" v-model="question.title" required></md-input>
        </md-input-container>
        <md-input-container>
          <label>Question Content</label>
          <md-input type="text" v-model="question.content" required @input="generateTags"></md-input>
        </md-input-container>
        <md-input-container>
          <label>Tags</label>
          <md-input type="text" v-model="question.tags" readonly></md-input>
        </md-input-container>
      </md-dialog-content>

      <md-dialog-actions>
        <md-button class="md-primary" @click="closeDialog('dialogFormQuestion')">Cancel</md-button>
        <md-button class="md-primary" type="submit">{{button}}</md-button>
      </md-dialog-actions>
    </form>
  </md-dialog>
  <md-dialog-alert
  :md-content="alert.content"
  :md-ok-text="alert.ok"
  ref="updateQuestionNotif">
  </md-dialog-alert>
</div>
</template>

<script>

export default {
  props: ['isEdit', 'question'],
  data () {
    return {
      button: '',
      title: '',
      alert: {
        content: 'a',
        ok: 'a'
      }
    }
  },
  methods: {
    openDialog (ref) {
      this.$refs[ref].open()
      this.titleText()
      this.buttonName()
    },
    closeDialog (ref) {
      this.$refs[ref].close()
    },
    titleText () {
      if (this.question.edit) {
        this.title = 'Edit Your Question'
      } else {
        this.title = 'Insert Your Question Here'
      }
    },
    buttonName () {
      if (this.question.edit) {
        this.button = 'Update'
      } else {
        this.button = 'Post a Question'
      }
    },
    save () {
      if (this.question.edit) {
        this.$http.put('/questions/' + this.question._id, {
          title: this.question.title,
          content: this.question.content,
          tags: this.question.tags.split(' ')
        }).then(({data}) => {
          this.openDialog('updateQuestionNotif')
          this.alert.content = 'Your question successfully updated'
          this.alert.ok = 'Cool!'
          console.log(data)
          this.closeDialog('dialogFormQuestion')
          this.$emit('editQuestion', data)
        }).catch((err) => {
          this.alert.content = 'There\' some error'
          this.alert.ok = 'Sad:('
          this.openDialog('updateQuestionNotif')
          console.error(err)
        })
      } else {
        this.$http.post('/questions', {
          title: this.question.title,
          content: this.question.content,
          tags: this.question.tags.split(' '),
          posted_by: localStorage.getItem('token')
        }).then(({data}) => {
          this.openDialog('updateQuestionNotif')
          this.alert.content = 'You have successfully post a question'
          this.alert.ok = 'Cool!'
          console.log(data)
          this.closeDialog('dialogFormQuestion')
          this.$emit('addedQuestion', data)
        }).catch((err) => {
          this.alert.content = 'There\' some error'
          this.alert.ok = 'Sad:('
          this.openDialog('updateQuestionNotif')
          console.error(err)
        })
      }
    },
    generateTags () {
      // this.$http.get('/users/aylien/' + this.question.content).then(({data}) => {
      //   console.log(data.hashtags.join(' '))
      //   this.question.tags = data.hashtags.join(' ')
      // }).catch((err) => {
      //   console.error(err)
      // })
    }
  },
  mounted () {
    this.titleText()
    this.buttonName()
  }
}
</script>

<style lang="css">
</style>
