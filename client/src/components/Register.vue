<template>
<form>
  <fieldset>
    <legend>Register a new account</legend>
    <div class="form-group">
      <label>Username</label>
      <input type="text" class="form-control" ref="username">
      <small class="form-text text-muted">Choose a memorable username.</small>
    </div>
    <div class="form-group">
      <label>Email</label>
      <input type="text" class="form-control" ref="email">
    </div>
    <div class="form-group">
      <label>Password</label>
      <input type="password" class="form-control" ref="password">
    </div>
    <button type="submit" class="btn btn-primary" @click.prevent="register()">Submit</button>
  </fieldset>
</form>
  </div>
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
    register () {
      this.$http.post('/users', {
        username: this.$refs.username.value,
        password: this.$refs.password.value,
        email: this.$refs.email.value
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