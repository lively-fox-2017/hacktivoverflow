<template>
  <div>
    <h2 class="col-md-8 col-sm-12 col-md-offset-2 text-center">My Questions</h2>
    <div class="list-group col-md-8 col-sm-12 col-md-offset-2">
      <a class="list-group-item col-md-12" v-for="(value, index) in myQuestions" :key="index">
        <router-link :to="'/detailQuestion/'+value._id">
          <div class="votes col-md-1 text-center bg-success">
            <h2>{{ value.voters.length }}</h2>
            <h4>Votes</h4>
          </div>
          <div class="col-md-10">
            <h4 class="list-group-item-heading title">{{ value.title }} <span class='createdDate'>created at {{ value.createdAt | moment('D MMMM YYYY, h:mm') }}</span></h4><hr>
            <p class="list-group-item-text">{{ value.question.substring(0,80) }} ...</p>
          </div>
        </router-link>
        <div class="col-md-1 col-sm-12 text-center">
          <a href="#" class="btn btn-success" data-toggle="modal" :data-target="'#myModal' + index" @click="setModel(index)">Edit</a>

            <div :id="'myModal'+index" class="modal fade" role="dialog">
              <div class="modal-dialog">

                <!-- Modal content-->
                <div class="modal-content">
                  <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">Edit Question</h4>
                  </div>
                  <div class="modal-body">

                    <form class="form-horizontal" @submit.prevent="editQuestion(value._id)">
                      <fieldset>
                        <div class="form-group">
                          <label for="inputText" class="col-lg-2 control-label">Title</label>
                          <div class="col-lg-10">
                            <input class="form-control" id="inputText" placeholder="Title" type="text" v-model="questionEditForm.title" required>
                          </div>
                        </div>
                        <div class="form-group">
                          <label for="textArea" class="col-lg-2 control-label">Question</label>
                          <div class="col-lg-10">
                            <textarea class="form-control" rows="3" id="textArea" v-model="questionEditForm.question" required></textarea>
                            <span class="help-block">Ask anything regarding the developer worlds.</span>
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
          <a href="#" class="btn btn-danger" @click="deleteQuestion(value._id)">Delete</a>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      myQuestions: [],
      questionEditForm: {
        title: '',
        question: ''
      }
    }
  },
  methods: {
    getMyQuestions (id) {
      this.$axios.get(`/questions/${id}`).then(({data}) => {
        this.myQuestions = data.data
      })
    },
    deleteQuestion (questionId) {
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

        this.$axios.delete(`/questions/delete/${questionId}`, {
          headers: {
            'token': tkn
          }
        }).then((serverResponse) => {
          this.$store.dispatch('allQuestions')
          this.getMyQuestions(this.$store.state.userId)
        }).catch((reason) => {
          this.$swal(
            'Oops...',
            `Something's wrong`,
            'error'
          )
        })
      })
    },
    setModel (index) {
      this.questionEditForm.title = this.myQuestions[index].title
      this.questionEditForm.question = this.myQuestions[index].question
    },
    editQuestion (questionId) {
      let tkn = localStorage.getItem('token')

      this.$axios.put(`/questions/update/${questionId}`, this.questionEditForm, {
        headers: {
          'token': tkn
        }
      }).then((serverResponse) => {
        this.$store.dispatch('allQuestions')
        this.$swal(
          'Edit Success',
          `Nice edit`,
          'success'
        )

        this.getMyQuestions(this.$store.state.userId)
      }).catch((reason) => {
        this.$swal(
          'Oops...',
          `Didnt match the requirement`,
          'error'
        )
      })
    }
  },
  created () {
    let userId = this.$store.state.userId
    this.getMyQuestions(userId)
  }
}
</script>

<style scoped>
  .votes{
    color: white;
    border-radius: 100%;
    padding: 0px;
  }

  .title{
    font-weight: bold;
    color: black;
  }

  .createdDate{
    float: right;
    font-size: 12px;
  }

  hr{
    border-color: green;
  }
</style>
