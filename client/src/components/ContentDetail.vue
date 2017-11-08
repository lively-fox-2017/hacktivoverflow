
<template>
<div class="col-md-9">
<div class="list-group">
 <a href="#" class="list-group-item list-group-item-action active">
    <div class="col-md-12">
    <h4 class="list-group-item-heading">
    {{ content.title }}
    </h4>
    <p class="list-group-item-text">
    {{ content.content }}
    </p>
    </div>
   <small> posted by: {{ content.postCreator.username }}</small>
  </a>
  <div class="list-group"
  v-for="(answer, index) in answers" 
  :answer="answer" 
  :key="index">
    <div class="list-group-item list-group-item">
    <div class="col-md-12">
    <h4 class="list-group-item-heading">
    <span class="tag tag-default tag-pill float-xs-right">{{ answer.votes }} |</span>
    {{ answer.content }}
    </h4>
    <p class="list-group-item-text">
    - {{ answer.answerCreator.username }}
    </p>
    <button @click.prevent="upvote(answer)" class="btn btn-outline-success">Upvote</button>
    <button @click.prevent="del(answer)" class="btn btn-outline-danger">Delete</button>
    </div>
    </div>
  </div>
</div>
<form>
  <fieldset>
    <legend>Submit an answer</legend>
    <div class="form-group">
      <label>Answer</label>
      <input type="text" class="form-control" placeholder="Answer" ref="answer">
      <small class="form-text text-muted">Make your answers short and simple.</small>
    </div>
    <button type="submit" class="btn btn-primary" @click.prevent="postAnswer()">Submit</button>
  </fieldset>
</form>
<br>
<button @click.prevent="editQuestion()" type="button" class="btn btn-outline-info">Edit</button>
<button @click.prevent="delQuestion()" type="button" class="btn btn-outline-danger">Delete</button>
<br>
<br>
<div id='editForm' style='display: none'>
<form>
  <fieldset>
    <legend>Edit Question</legend>
    <div class="form-group">
      <label>Question Title</label>
      <input type="text" class="form-control" placeholder="Title" ref="title">
      <small class="form-text text-muted">Make it as descriptive as possible.</small>
    </div>
    <div class="form-group">
      <label>Question Details</label>
      <textarea class="form-control" rows="3" ref="content"></textarea>
    </div>
    <button type="submit" class="btn btn-primary" @click.prevent="postEdit()">Submit</button>
  </fieldset>
</form>
</div>
</div>
</template>

<script>
import router from '../router/index'
export default {
  props: ['id'],
  data () {
    return {
      content: {
        title: '',
        content: '',
        photo: ''
      },
      answers: []
    }
  },
  methods: {
    checkLogin () {
      this.token = localStorage.getItem('hackToken')
      if (this.token == null) {
        alert('Please login first')
        router.go('/' + this.id + '/detail')
      }
    },
    getContent () {
      this.$http.get('/' + this.id + '/detail')
      .then(({data}) => {
        console.log(data)
        this.content = data
      })
      .catch((err) => {
        console.log(err)
      })
    },
    postAnswer () {
      this.checkLogin()
      this.$http.post('/answer/' + this.id, {
        token: localStorage.getItem('hackToken'),
        content: this.$refs.answer.value
      })
      .then(({data}) => {
        console.log(data)
        this.answers.push(data)
      })
    },
    getAnswer () {
      this.$http.get('/answer/' + this.id)
      .then(({data}) => {
        console.log(data, 'saya adalah para jawaban')
        this.answers = data
      })
      .catch(err => {
        console.log(err)
      })
    },
    del (params) {
      var index = this.answers.indexOf(params)
      console.log(index)
      this.answers.splice(index, 1)
      console.log(params._id)
      this.$http.delete('/answer/' + params._id)
      .then(({data}) => {
        console.log(data)
      })
      .catch(err => {
        console.log(err)
      })
    },
    upvote (params) {
      var index = this.answers.indexOf(params)
      console.log(index)
      this.answers[index].votes += 1
      this.$http.post('/answer/' + params._id + '/' + 1)
    },
    editQuestion () {
      document.getElementById('editForm').style.display = 'block'
    },
    postEdit () {
      this.checkLogin()
      var title = this.content.title
      var content = this.content.content
      if (this.$refs.title.value !== '') {
        title = this.$refs.title.value
      }
      if (this.$refs.content.value !== '') {
        content = this.$refs.content.value
      }
      this.$http.put('/' + this.id, {
        title: title,
        content: content
      })
      .then(({data}) => {
        console.log(data)
        router.go('/')
      })
      .catch(err => {
        console.log(err)
      })
    },
    delQuestion () {
      this.$http.delete('/' + this.id)
      .then(({data}) => {
        console.log(data)
        router.replace('/')
      })
      .catch(err => {
        console.log(err)
      })
    }
  },
  mounted () {
    console.log(this.id)
    this.getContent()
    this.getAnswer()
  }
}
</script>