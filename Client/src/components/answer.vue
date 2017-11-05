<template lang="html">
  <div>
    <div class="col-md-7 col-sm-12 col-md-offset-3 answerMain" v-for="(value, index) in Answers">
      <div class="votes col-md-1 text-center bg-success">
        <h2>{{ value.votersCount }}</h2>
        <h4>Votes</h4>
      </div>
      <div class="col-md-11 answer">
        <h2 class="list-group-item-heading title"><span class='answerDate'>Answered at {{ value.createdAt | moment('D MMMM YYYY, h:mm A') }}</span></h2><hr>
        <p class="list-group-item-text">{{ value.answer}}</p>
        <h5 class='asker'>answered by <span class="user">{{ value.user.username }}</span></h5>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['questionId'],
  computed: {
    Answers () {
      return this.$store.state.answers
    }
  },
  methods: {
    getAllAnswer () {
      this.$store.dispatch('allAnswer', this.questionId)
    }
  },
  created () {
    this.getAllAnswer()
  }
}
</script>

<style scoped>
  .votes{
    cursor: pointer;
    padding: 0px;
  }

  .votes:hover{
    border-radius: 100%;
    transition: all 1s ease;
    -webkit-transition: all 1s ease;
    -moz-transition: all 1s ease;
    -o-transition: all 1s ease;
  }

  .answerMain{
    margin-top: 20px;
  }

  .answer{
    background-color: #eaeaea;
    box-sizing: border-box;
    padding: 15px;
  }

  .answerDate{
    float: right;
    font-size: 12px;
  }

  .asker{
    float: right;
  }

  .user{
    color: blue;
  }

  hr{
    border-color: green;
  }
</style>
