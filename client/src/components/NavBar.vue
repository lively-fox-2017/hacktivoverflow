<template>
  <nav class="navbar navbar-default">
    <div class="container">
      <div class="navbar-header">
        <router-link to="/" class="navbar-brand">Home</router-link>
        <router-link to="/register" class="nav-item">Register</router-link>
      </div>
      <form v-if="token == null" class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2" type="text" placeholder="Username" ref="username">
      <input class="form-control mr-sm-2" type="password" placeholder="Password" ref="password">
      <button class="btn btn-secondary my-2 my-sm-0" type="submit" @click.prevent="login()">Login</button>
      </form>
      <form v-else class="form-inline my-2 my-lg-0">
      <button class="btn btn-secondary my-2 my-sm-0" type="submit" @click.prevent="logout()">Logout</button>
      </form>
    </div>
  </nav>
</template>

<script>
import router from '../router/index'
export default {
  data () {
    return {
      token: ''
    }
  },
  methods: {
    login () {
      console.log(this.$refs.username.value)
      console.log(this.$refs.password.value)
      this.$http.post('/users/login', {
        username: this.$refs.username.value,
        password: this.$refs.password.value
      })
      .then(({data}) => {
        localStorage.setItem('hackToken', data)
        if (typeof data === 'string') {
          router.go('/')
        }
      })
      .catch(err => {
        console.log(err)
      })
    },
    logout () {
      console.log('logout')
      localStorage.removeItem('hackToken')
      router.go('/')
    }
  },
  mounted () {
    this.token = localStorage.getItem('hackToken')
    console.log(this.token)
  }
}
</script>

<style scoped>
.navbar {
  border-radius: 0;
}
</style>