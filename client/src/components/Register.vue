<template>
  <div class="container">
    <h1>Register</h1>
    <div class="row">
      <div class="col-md-4">
        <form v-on:submit.prevent="register">
          <div class="form-group">
            <label for="name">Name</label>
            <input type="text" class="form-control" v-model="name" autocomplete="off" required>
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" class="form-control" v-model="email" autocomplete="off" required>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" class="form-control" v-model="password" autocomplete="off" required>
          </div>
          <div class="form-group">
            <button type="submit" class="btn btn-primary">Register</button>
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
        name: '',
        email: '',
        password: ''
      }
    },
    methods: {
      register () {
        const newUser = {
          name: this.name,
          email: this.email,
          password: this.password
        }
        this.$http.post('/auth/register', newUser)
          .then(({ data }) => {
            this.$swal('Registered!', 'You have been registered, please login', 'success')
            this.$router.push('/login')
          })
          .catch((err) => {
            this.$swal('Error!', 'There\'s a trouble while processing your request', 'error')
          })
      }
    }
  }
</script>

<style></style>
