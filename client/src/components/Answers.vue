<template>
  <div>
    <div class="row" v-for="(answer, index) in answers" :key="index">
      <div class="col-md-12">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              Answered by: {{ answer.by.name }}, {{ new Date(answer.created_at).toLocaleString() }}
              <span class="badge badge-success">
                <span class="glyphicon glyphicon-thumbs-up"></span>
                {{ answer.votes }}
              </span>
            </h3>
          </div>
          <div class="panel-body">
            {{ answer.content }}
          </div>
          <div class="panel-footer">
            <button @click="voteAnswer(answer._id)" v-if="!answer.voted" class="btn btn-primary">
              <span class="glyphicon glyphicon-thumbs-up"></span>
            </button>
            <button @click="unvoteAnswer(answer._id)" v-else class="btn btn-danger">
              <span class="glyphicon glyphicon-thumbs-down"></span>
            </button>
            <button v-if="answer.by._id === $store.state.user_id" class="btn btn-default">
              <span class="glyphicon glyphicon-pencil"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['answers'],
    methods: {
      voteAnswer (id) {
        this.$http.patch('/answers/vote', {
          id: id,
          user_id: this.$store.state.user_id
        })
          .then((response) => {
            this.$emit('voteAnswer')
          })
          .catch((err) => {
            console.error(err)
          })
      },
      unvoteAnswer (id) {
        this.$http.patch('/answers/unvote', {
          id: id,
          user_id: this.$store.state.user_id
        })
          .then((response) => {
            this.$emit('unvoteAnswer')
          })
          .catch((err) => {
            console.error(err)
          })
      },
    }
  }
</script>

<style></style>
