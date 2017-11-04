<template lang="html">
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
          <md-menu-item>
            <span>UpVote : {{question.upvotes}}</span>
            <md-icon>vertical_align_top</md-icon>
          </md-menu-item>

          <md-menu-item>
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
              <md-menu-item>
                <span>UpVote : {{answer.upvotes}}</span>
                <md-icon>vertical_align_top</md-icon>
              </md-menu-item>

              <md-menu-item>
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
      <form>
        <md-input-container>
          <label>Textarea</label>
          <md-textarea></md-textarea>
        </md-input-container>
        <md-card-actions>
          <md-button class="md-raised md-accent">Answer This</md-button>
        </md-card-actions>
      </form>
    </md-card-content>
  </md-card>
</template>

<script>
export default {
  props: ['question_id'],
  data: () => {
    return {
      question: {},
      answers: []
    }
  },
  methods: {
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
    calculateDate (tanggal) {
      var dateSekarang = Date(Date.now())
      var datePost = new Date(tanggal)
      var dateOneObj = new Date(dateSekarang)
      var dateTwoObj = new Date(datePost)
      var hours = Math.round(Math.abs(dateTwoObj - dateOneObj) / 36e5)
      if (hours > 23) {
        hours = Math.floor(hours / 24) + ' day '
      } else {
        hours += ' min '
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
