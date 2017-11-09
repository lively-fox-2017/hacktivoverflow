<template>
  <nav class="navbar navbar-inverse">
    <div class="container">
      <!-- Brand and toggle get grouped for better mobile display -->
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <router-link class="navbar-brand" to="/">HacktivOverflow</router-link>
      </div>

      <!-- Collect the nav links, forms, and other content for toggling -->
      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul class="nav navbar-nav">
          <li>
            <router-link to="/questions">Questions</router-link>
          </li>
          <li>
            <router-link v-if="getLoggedIn" to="/post-question">Post a Question</router-link>
          </li>
        </ul>
        <div class="navbar-form navbar-right">
          <template v-if="!getLoggedIn">
            <router-link to="/login" class="btn btn-primary">Login</router-link>
            <router-link to="/register" class="btn btn-default">Register</router-link>
          </template>
          <a href="#" v-else @click="logout" class="btn btn-danger">Logout</a>
        </div>
      </div><!-- /.navbar-collapse -->
    </div><!-- /.container-fluid -->
  </nav>
</template>

<script>
  export default {
    methods: {
      logout () {
        localStorage.removeItem('access_token')
        this.$store.commit('updateLoggedInState')
        this.$swal('Logged Out!', 'See you later', 'success')
        this.$router.push('/')
      }
    },
    computed: {
      getLoggedIn () {
        return this.$store.state.loggedIn
      }
    }
  }
</script>

<style>
  .navbar-inverse {
    border-radius: 0px;
  }
</style>
