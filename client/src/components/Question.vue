<template>
  <div>
    <div v-for="(question, index) in questions" class="row" :key="index">
      <div class="col-md-12">
        <h1>
          {{ question.title }}
          <span class="badge badge-success">
            <span class="glyphicon glyphicon-thumbs-up"></span>
            {{ question.votes }}
          </span>
        </h1>
        <p class="text-muted">By: {{ question.author.name }}</p>
        <template v-if="isLoggedIn">
          <a href="#" class="btn btn-primary">
            <span class="glyphicon glyphicon-thumbs-up"></span>
          </a>
          <a href="#" class="btn btn-danger">
            <span class="glyphicon glyphicon-thumbs-down"></span>
          </a>
        </template>
        <router-link class="btn btn-default" :to="{ name: 'QuestionContent', params: { slug: question.slug } }">
          See answers
        </router-link>
        <hr>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['questions'],
    computed: {
      isLoggedIn () {
        return this.$store.state.loggedIn
      }
    }
  }
</script>

<style>
  .badge-success {
    background-color: #5cb85c;
  }
</style>
