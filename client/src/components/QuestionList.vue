<template lang="html">
<div>
  <md-layout md-align="center" md-row md-sm-column style="padding: 8px;">
    <md-layout md-flex="75" md-align="center">
      <md-card>
        <md-card-media>
          <img src="http://images.memes.com/meme/173438" alt="People" style="max-height: 25vh">
        </md-card-media>

        <md-card-content>
          <md-card md-with-hover v-for="question in computeQuestion">
            <md-card-header style="background:lightblue">
              <div class="md-title">{{question.title}}</div>
              <div class="md-subhead"><span>Posted By: {{question.posted_by.username}}</span><span style="float:right">asked {{ calculateDate(question.created_at) }} ago</span></div>
            </md-card-header>

            <md-card-content>
              {{question.content}}
              <br>
              <md-chip v-for="tag in question.tags">{{tag}}</md-chip>
            </md-card-content>

            <md-card-actions>
              <router-link :to="{ name: 'QuestionDetail', params: {question_id:question._id} }" class="md-button md-raised">Show Details</router-link>
            </md-card-actions>
            <md-divider />
            <md-divider />
            <md-divider />
            <md-divider />
          </md-card>
          <p style="color:white">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, nostrum odio. Dolores, sed accusantium quasi non, voluptas eius illo quas</p>
        </md-card-content>
      </md-card>
    </md-layout>
  </md-layout>
</div>
</template>

<script>

export default {
  props: ['search'],
  methods: {
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
  computed: {
    questions () {
      return this.$store.state.questions
    },
    computeQuestion () {
      if (this.search) {
        var showedData = []
        this.questions.forEach(question => {
          if (question.content.toLowerCase().indexOf(this.search.toLowerCase()) > -1 || question.tags.indexOf('#' + this.search.toLowerCase()) > -1) {
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
