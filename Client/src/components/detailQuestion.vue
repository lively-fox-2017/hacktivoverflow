<template lang="html">
  <div>
    <div class="col-md-8 col-sm-12 col-md-offset-2">
      <div class="votes col-md-1 text-center bg-success" @click="voteQuestion" v-if="question.voters.indexOf(userId) == -1">
        <h2>{{ question.votersCount }}</h2>
        <h4>Votes</h4>
      </div>
      <div class="votes col-md-1 text-center bg-success red" data-toggle="tooltip" data-placement="left" title="You are already vote this, Click to down vote" @click="voteQuestion" v-else>
        <h2>{{ question.votersCount }}</h2>
        <h4>Votes</h4>
      </div>
      <div class="col-md-11 question">
        <h2 class="list-group-item-heading title">{{ question.title }} <span class='updatedDate' v-if="question.updatedAt">Edited at {{ question.updatedAt | moment('D MMMM YYYY, h:mm A') }}</span></h2><hr>
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
    },
    isLogin () {
      return this.$store.state.isLogin
    },
    userId () {
      return this.$store.state.userId
    }
  },
  methods: {
    voteQuestion () {
      if (this.isLogin === false) {
        this.$swal(
          'Sorry...',
          'You should login before vote',
          'error'
        )
      } else {
        let tkn = localStorage.getItem('token')
        // console.log(tkn)
        this.$axios.put(`/questions/vote/${this.id}`, '', {
          headers: {
            'token': tkn
          }
        }).then((serverResponse) => {
          // console.log(serverResponse)
          this.$store.dispatch('allQuestions')
          this.$swal(
            'Vote Success',
            `Nice vote`,
            'success'
          )
        }).catch((reason) => {
          // console.log(reason)
          this.$swal(
            'Oops...',
            'You cant vote yourself',
            'error'
          )
        })
      }
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

  .red:hover{
    background-color: red;
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
