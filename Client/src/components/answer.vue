<template lang="html">
  <div>
    <div class="col-md-7 col-sm-12 col-md-offset-3 answerMain" v-for="(value, index) in Answers">
      <div class="votes col-md-1 text-center bg-success" @click="voteAnswer(value._id)" v-if="value.voters.indexOf(userId) == -1">
        <h2>{{ value.votersCount }}</h2>
        <h4>Votes</h4>
      </div>
      <div class="votes col-md-1 text-center bg-success red" data-toggle="tooltip" data-placement="left" title="You are already vote this, Click to down vote" @click="voteAnswer(value._id)" v-else>
        <h2>{{ value.votersCount }}</h2>
        <h4>Votes</h4>
      </div>
      <div class="col-md-10 answer">
        <h2 class="list-group-item-heading title"><span class='answerDate'>Answered at {{ value.createdAt | moment('D MMMM YYYY, h:mm A') }}</span></h2><hr>
        <p class="list-group-item-text">{{ value.answer}}</p>
        <h5 class='text-right'>answered by <span class="user">{{ value.user.username }}</span></h5>
      </div>
      <div class="col-md-1 col-sm-12 text-center" v-if="isLogin === true && value.user._id === userId">
        <a href="#" class="btn btn-success" data-toggle="modal" :data-target="'#myModal'+index" @click="setModel(value._id)">Edit</a>

        <div :id="'myModal'+index" class="modal fade" role="dialog">
          <div class="modal-dialog">

            <!-- Modal content-->
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Edit Answer</h4>
              </div>
              <div class="modal-body">

                <form class="form-horizontal" @submit.prevent="editAnswer(value._id)">
                  <fieldset>
                    <div class="form-group">
                      <label for="textArea" class="col-lg-2 control-label">Answer</label>
                      <div class="col-lg-10">
                        <textarea class="form-control" rows="3" id="textArea" v-model="answerEditForm.answer" required></textarea>
                        <span class="help-block">Answer the question seriously.</span>
                      </div>
                    </div>
                    <div class="form-group">
                      <div class="col-lg-10 col-lg-offset-2">
                        <button type="submit" class="btn btn-primary">Submit</button>
                        <button type="reset" class="btn btn-default" data-dismiss="modal">Cancel</button>
                      </div>
                    </div>
                  </fieldset>
                </form>

              </div>
            </div>

          </div>
        </div>

        <a href="#" class="btn btn-danger" @click="deleteAnswer(value._id)">Delete</a>
      </div>
    </div>
    <answerQuestion :questionId="questionId" v-if="isLogin == true" />
  </div>
</template>

<script>
import answerQuestion from '@/components/answerQuestion'
export default {
  props: ['questionId'],
  data () {
    return {
      answerEditForm: {
        answer: ''
      }
    }
  },
  components: {
    answerQuestion
  },
  computed: {
    Answers () {
      return this.$store.state.answers
    },
    isLogin () {
      return this.$store.state.isLogin
    },
    userId () {
      return this.$store.state.userId
    }
  },
  methods: {
    getAllAnswer () {
      this.$store.dispatch('allAnswer', this.questionId)
    },
    deleteAnswer (answerId) {
      let tkn = localStorage.getItem('token')
      this.$swal({
        title: 'Are you sure?',
        text: '',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'red',
        cancelButtonColor: '#eaeaea',
        confirmButtonText: 'Are you sure?'
      }).then(() => {
        this.$swal({
          title: 'Bye bye :(',
          text: 'deleted',
          imageUrl: 'https://media.giphy.com/media/12Y2QggFypRf7G/giphy.gif',
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: 'Custom image',
          animation: false
        })

        this.$axios.delete(`/answers/delete/${answerId}`, {
          headers: {
            'token': tkn
          }
        }).then((serverResponse) => {
          this.$store.dispatch('allAnswer', this.questionId)
        }).catch((reason) => {
          this.$swal(
            'Oops...',
            `Something's wrong`,
            'error'
          )
        })
      })
    },
    setModel (answerId) {
      this.Answers.forEach((dataAnswer) => {
        if (dataAnswer._id === answerId) {
          this.answerEditForm.answer = dataAnswer.answer
        }
      })
    },
    editAnswer (answerId) {
      let tkn = localStorage.getItem('token')

      this.$axios.put(`/answers/update/${answerId}`, this.answerEditForm, {
        headers: {
          'token': tkn
        }
      }).then((serverResponse) => {
        this.$store.dispatch('allAnswer', this.questionId)
        this.$swal(
          'Edit Success',
          `Nice edit`,
          'success'
        )
      }).catch((reason) => {
        this.$swal(
          'Oops...',
          `Didnt match the requirement`,
          'error'
        )
      })
    },
    voteAnswer (answerId) {
      if (this.isLogin === false) {
        this.$swal(
          'Sorry...',
          'You should login before vote',
          'error'
        )
      } else {
        let tkn = localStorage.getItem('token')
        this.$axios.put(`/answers/vote/${answerId}`, '', {
          headers: {
            'token': tkn
          }
        }).then((serverResponse) => {
          this.$store.dispatch('allAnswer', this.questionId)
          this.$swal(
            'Vote Success',
            `Nice vote`,
            'success'
          )
        }).catch((reason) => {
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
    isLogin (newUserId) {
      let decodedToken = this.$jwt.decode()
      this.$store.commit('setUserId', decodedToken._id)
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

  .answerMain{
    margin-top: 20px;
    padding: 0px;
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

  .user{
    color: blue;
  }

  hr{
    border-color: green;
  }
</style>
