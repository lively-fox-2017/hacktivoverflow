<template lang="html">
<div>
  <md-card>
    <md-card-media>
      <img src="http://images.memes.com/meme/173438" alt="People" style="max-height: 25vh">
    </md-card-media>

    <md-card-content>
      <md-card md-with-hover v-for="question in questions">
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
</div>
</template>

<script>
export default {
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
        hours += ' min '
      }
      return hours
    }
  },
  computed: {
    questions () {
      return this.$store.state.questions
    }
  }
}
</script>

<style lang="css">
</style>
