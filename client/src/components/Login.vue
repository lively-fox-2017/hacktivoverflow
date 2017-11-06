<template>
  <div class="container">
    <h1>Login</h1>
    <div class="row">
      <div class="col-md-4">
        <form v-on:submit.prevent="login">
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" ref="email" class="form-control" v-model="email" autocomplete="off" required>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" class="form-control" v-model="password" autocomplete="off" required>
          </div>
          <div class="form-group">
            <button type="submit" class="btn btn-primary">Login</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      login () {
        const user = {
          email: this.email,
          password: this.password
        }
        this.$http.post('/auth/login', user)
          .then(({ data }) => {
            localStorage.setItem('access_token', data.access_token)
            this.$store.commit('updateLoggedInState')
            this.$swal('Logged In!', 'You\'re logged in', 'success')
            this.$router.push('/')
          })
          .catch((err) => {
            this.$swal('Oops!', 'Email/Password is wrong', 'error')
          })
      }
    },
    mounted () {
      this.$refs.email.focus()
    }
  }
</script>

<style></style>
