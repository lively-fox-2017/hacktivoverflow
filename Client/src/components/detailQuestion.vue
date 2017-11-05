<template lang="html">
  <div>
    <div class="col-md-8 col-sm-12 col-md-offset-2">
      <div class="votes col-md-1 text-center bg-success">
        <h2>{{ question.votersCount }}</h2>
        <h4>Votes</h4>
      </div>
      <div class="col-md-11 question">
        <h2 class="list-group-item-heading title">{{ question.title }} <span class='updatedDate' v-if="question.updatedAt">Edited at {{ value.createdAt | moment('D MMMM YYYY, h:mm A') }}</span></h2><hr>
        <p class="list-group-item-text">{{ question.question}}</p>
        <h5 class='text-right'>asked by <span class="user">{{ question.user.username }}</span></h5>
      </div>
    </div>
    <answer :questionId="id" />
  </div>
</template>

<script>
import answer from '@/components/answer'
export default {
  props: ['id'],
  components: {
    answer
  },
  data () {
    return {
      question: {}
    }
  },
  computed: {
    Questions () {
      return this.$store.state.questions
    }
  },
  watch: {
    Questions (newQuestions) {
      // console.log(newQuestions)
      newQuestions.forEach((newQuestion) => {
        if (newQuestion._id === this.id) {
          this.question = newQuestion
        }
      })
    }
  },
  created () {
    let newQuestions = this.$store.state.questions

    newQuestions.forEach((newQuestion) => {
      if (newQuestion._id === this.id) {
        this.question = newQuestion
      }
    })
  }
}
</script>

<style scoped>
  .votes{
    cursor: pointer;
    color: white;
    padding: 0px;
  }

  .votes:hover{
    border-radius: 100%;
    transition: all 1s ease;
    -webkit-transition: all 1s ease;
    -moz-transition: all 1s ease;
    -o-transition: all 1s ease;
  }

  .question{
    box-sizing: border-box;
    padding: 15px;
  }

  .updatedDate{
    float: right;
    font-size: 12px;
  }

  .user{
    color: blue;
  }

  hr{
    border-color: green;
  }
</style>
