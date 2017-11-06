<template lang="html">
<div>
  <md-card>
    <md-card-header>
      <md-card-header-text>
        <div class="md-title">{{question.title}}</div>
        <div class="md-subhead"><span>Posted By: {{question.posted_by.username}}</span><span style="float:right">asked {{ calculateDate(question.created_at) }} ago</span></div>
      </md-card-header-text>

      <md-menu md-size="4" md-direction="bottom left">
        <md-button class="md-icon-button" md-menu-trigger>
          <md-chip>{{question.votes}}</md-chip>
        </md-button>

        <md-menu-content>
          <md-menu-item v-on:click="upVoteQuestion(questions_id)">
            <span>UpVote : {{question.upvotes}}</span>
            <md-icon>vertical_align_top</md-icon>
          </md-menu-item>

          <md-menu-item v-on:click="downVoteQuestion(questions_id)">
            <span>DownVote : {{question.downvotes}}</span>
            <md-icon>vertical_align_bottom</md-icon>
          </md-menu-item>
        </md-menu-content>
      </md-menu>
    </md-card-header>

    <md-card-content>
      {{question.content}}
      <md-divider />
      <md-divider />
      <md-divider />

      <md-card v-for="answer in answers">
        <md-card-header>
          <md-card-header-text>
            <!-- <div class="md-title">{{answer}}</div> -->
            <div class="md-subhead"><span>Posted By: {{answer.posted_by.username}}</span><span style="float:right">answered {{ calculateDate(answer.created_at) }} ago</span></div>
          </md-card-header-text>

          <md-menu md-size="4" md-direction="bottom left">
            <md-button class="md-icon-button" md-menu-trigger>
              <md-chip>{{answer.votes}}</md-chip>
            </md-button>

            <md-menu-content>
              <md-menu-item v-on:click="upVoteAnswer(answer._id)">
                <span>UpVote : {{answer.upvotes}}</span>
                <md-icon>vertical_align_top</md-icon>
              </md-menu-item>

              <md-menu-item v-on:click="downVoteAnswer(answer._id)">
                <span>DownVote : {{answer.downvotes}}</span>
                <md-icon>vertical_align_bottom</md-icon>
              </md-menu-item>
            </md-menu-content>
          </md-menu>
        </md-card-header>

        <md-card-content>
          {{answer.answer}}
        </md-card-content>
        <md-divider />
        <md-divider />
        <md-divider />
        <md-divider />
        <md-divider />
        <md-divider />
        <md-divider />
        <md-divider />
        <md-divider />
        <md-divider />
        <md-divider />
        <md-divider />
      </md-card>
      <p style="color:white">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, nostrum odio. Dolores, sed accusantium quasi non, voluptas eius illo quas</p>
      <form v-on:submit.prevent="postNewAnswer">
        <md-input-container>
          <label>Textarea</label>
          <md-textarea v-model="textAnswer" required></md-textarea>
        </md-input-container>
        <md-card-actions>
          <md-button class="md-raised md-accent" type="submit">Answer This</md-button>
        </md-card-actions>
      </form>
    </md-card-content>
  </md-card>
  <md-dialog-alert
  :md-content="alert.content"
  :md-ok-text="alert.ok"
  ref="commentNotif">
  </md-dialog-alert>
</div>
</template>

<script>
export default {
  props: ['question_id'],
  data: () => {
    return {
      question: [],
      answers: [],
      textAnswer: '',
      alert: {
        content: 'a',
        ok: 'a'
      }
    }
  },
  methods: {
    openDialog (ref) {
      this.$refs[ref].open()
    },
    getQuestionsData () {
      this.$http.get('/questions/' + this.question_id).then(({data}) => {
        this.question = data.data
      }).catch(err => {
        console.error(err)
      })
    },
    getAnswersData () {
      this.$http.get('/answers/' + this.question_id).then(({data}) => {
        this.answers = data.data
      }).catch(err => {
        console.error(err)
      })
    },
    upVoteQuestion (id) {
      if (this.$store.state.loggedIn) {
        this.$http.put('/questions/upvote/' + this.question_id, {
          user: localStorage.getItem('token')
        }).then(({data}) => {
          this.question.votes++
          this.question.upvotes++
          if (data.message.indexOf('Old') > -1) {
            this.question.downvotes--
          }
          this.alert.content = 'You upvote to this question'
          this.alert.ok = 'Cool!'
          this.openDialog('commentNotif')
        }).catch(err => {
          this.alert.content = 'There\' some error \n or you probably has upvote this'
          this.alert.ok = 'Sad:('
          this.openDialog('commentNotif')
          console.error(err)
        })
      } else {
        this.$swal({
          type: 'error',
          text: 'Login First !'
        })
      }
    },
    downVoteQuestion (id) {
      if (this.$store.state.loggedIn) {
        this.$http.put('/questions/downvote/' + this.question_id, {
          user: localStorage.getItem('token')
        }).then(({data}) => {
          this.question.votes--
          this.question.downvotes++
          if (data.message.indexOf('Old') > -1) {
            this.question.upvotes--
          }
          this.alert.content = 'You downvote to this question'
          this.alert.ok = 'Cool!'
          this.openDialog('commentNotif')
        }).catch(err => {
          this.alert.content = 'There\' some error \n or you probably has upvote this'
          this.alert.ok = 'Sad:('
          this.openDialog('commentNotif')
          console.error(err)
        })
      } else {
        this.$swal({
          type: 'error',
          text: 'Login First !'
        })
      }
    },
    upVoteAnswer (id) {
      if (this.$store.state.loggedIn) {
        this.$http.put('/answers/upvote/' + id, {
          user: localStorage.getItem('token')
        }).then(({data}) => {
          var index = this.answers.findIndex((element) => {
            if (element._id === id) {
              return element
            }
          })
          if (data.message.indexOf('Old') > -1) {
            this.answers[index].downvotes--
          }
          this.answers[index].upvotes++
          this.answers[index].votes++
          this.alert.content = 'You upvote to this answer'
          this.alert.ok = 'Cool!'
          this.openDialog('commentNotif')
        }).catch(err => {
          this.alert.content = 'There\' some error \n or you probably has upvote this'
          this.alert.ok = 'Sad:('
          this.openDialog('commentNotif')
          console.log('hubaaaa')
          console.error(err)
        })
      } else {
        this.$swal({
          type: 'error',
          text: 'Login First !'
        })
      }
    },
    downVoteAnswer (id) {
      if (this.$store.state.loggedIn) {
        this.$http.put('/answers/downvote/' + id, {
          user: localStorage.getItem('token')
        }).then(({data}) => {
          var index = this.answers.findIndex((element) => {
            if (element._id === id) {
              return element
            }
          })
          if (data.message.indexOf('Old') > -1) {
            this.answers[index].upvotes--
          }
          this.answers[index].downvotes++
          this.answers[index].votes--
          this.alert.content = 'You downvote to this answer'
          this.alert.ok = 'Cool!'
          this.openDialog('commentNotif')
        }).catch(err => {
          this.alert.content = 'There\' some error \n or you probably has upvote this'
          this.alert.ok = 'Sad:('
          this.openDialog('commentNotif')
          console.error(err)
        })
      } else {
        this.$swal({
          type: 'error',
          text: 'Login First !'
        })
      }
    },
    postNewAnswer () {
      if (this.$store.state.loggedIn) {
        var body = {
          answer: this.textAnswer,
          question_id: this.question_id,
          posted_by: localStorage.getItem('token')
        }
        this.$http.post('/answers', body).then(({data}) => {
          this.answers.unshift(data.data)
          this.textAnswer = ''
          this.alert.content = 'Your comment has successfully posted'
          this.alert.ok = 'Cool!'
          this.openDialog('commentNotif')
        }).catch(err => {
          this.alert.content = 'There\' some error'
          this.alert.ok = 'Sad:('
          this.openDialog('commentNotif')
          console.log(err)
          console.error(err)
        })
      } else {
        this.$swal({
          type: 'error',
          text: 'Login First !'
        })
      }
    },
    calculateDate (tanggal) {
      var dateSekarang = Date(Date.now())
      var datePost = new Date(tanggal)
      var dateOneObj = new Date(dateSekarang)
      var dateTwoObj = new Date(datePost)
      var hours = Math.round(Math.abs(dateTwoObj - dateOneObj) / 36e5)
      if (hours > 23) {
        hours = Math.floor(hours / 24) + ' day '
      } else {
        hours += ' hour '
      }
      return hours
    }
  },
  created: function () {
    this.getQuestionsData()
    this.getAnswersData()
  },
  watch: {
    question_id (watched) {
      this.question_id = watched
      this.getArticleData()
    }
  }
}
</script>

<style lang="css">
</style>
