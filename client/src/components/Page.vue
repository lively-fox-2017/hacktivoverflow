<template>
<div class="container">
    <div class="row">
    <sidebar
    :content='content'>
    </sidebar>
    <router-view
    :content="content">
    </router-view>
    </div>
    <br>
    <br>
</div>
</template>

<script>
import Sidebar from '@/components/Sidebar'
import ContentPage from '@/components/ContentPage'
import router from '../router/index'
export default {
  components: {
    ContentPage,
    Sidebar
  },
  data () {
    return {
      content: [],
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
    getArticles () {
      this.$http.get('/')
        .then(({data}) => {
          this.content = data
          console.log(data)
        })
    }
  },
  mounted () {
    this.getArticles()
  }
}
</script>