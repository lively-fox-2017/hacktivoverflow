<template>
  <div class="col-md-9">
    <div class="list-group">
      <content-summary 
      v-for="(content, index) in content" 
      :content="content" 
      :key="index">
      </content-summary>
    </div>
    <br>
    <br>
<form>
  <fieldset>
    <legend>Submit a new Question</legend>
    <div class="form-group">
      <label>Question Title</label>
      <input type="text" class="form-control" placeholder="Title" ref="title">
      <small class="form-text text-muted">Make it as descriptive as possible.</small>
    </div>
    <div class="form-group">
      <label>Question Details</label>
      <textarea class="form-control" rows="3" ref="content"></textarea>
    </div>
    <button type="submit" class="btn btn-primary" @click.prevent="postQuestion()">Submit</button>
  </fieldset>
</form>
  </div>
</template>

<script>
import ContentSummary from '@/components/ContentSummary'
import router from '../router/index'
export default {
  props: ['content'],
  components: {
    ContentSummary
  },
  data () {
    return {
      token: ''
    }
  },
  methods: {
    checkLogin () {
      this.token = localStorage.getItem('hackToken')
      if (this.token == null) {
        alert('Please login first')
        router.go('/')
      }
    },
    postQuestion () {
      this.checkLogin()
      this.$http.post('/', {
        token: this.token,
        title: this.$refs.title.value,
        content: this.$refs.content.value
      })
      .then(({data}) => {
        console.log(data)
        router.go('/')
      })
      .catch(err => {
        console.log(err)
      })
    }
  }
}
</script>