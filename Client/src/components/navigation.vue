<template lang="html">
  <nav class="navbar navbar-inverse">
    <div class="container-fluid">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-2">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" href="#">Hacktiv Overflow</a>
      </div>

      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-2">
        <ul class="nav navbar-nav">
          <li class="active"><router-link to="/">Home</router-link></li>
          <li v-if="isLogin == true"><router-link to="/myQuestion">My Questions</router-link></li>
          <!-- login -->
          <li class="dropdown" v-if="isLogin == false">
            <a class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Login <span class="caret"></span></a>
            <ul class="dropdown-menu" role="menu">
              <li>
                <form class="loginform" @submit.prevent="login">
                  <div class="form-group">
                    <label class="control-label" for="inputDefault">Username</label>
                    <input class="form-control" id="inputDefault" type="text" v-model="credentials.username" required>
                  </div>
                  <div class="form-group">
                    <label class="control-label" for="inputDefault">Password</label>
                    <input class="form-control" id="inputDefault" type="password" v-model="credentials.password" required>
                  </div>
                  <div class="form-group">
                    <div class="col-lg-10 col-lg-offset-2">
                      <button type="submit" class="btn btn-primary">Submit</button>
                    </div>
                  </div>
                </form>
              </li>
            </ul>
          </li>
          <!-- register -->
          <li class="dropdown" v-if="isLogin == false">
            <a class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Sign Up <span class="caret"></span></a>
            <ul class="dropdown-menu" role="menu">
              <li>
                <form class="loginform" @submit.prevent="signup">
                  <div class="form-group">
                    <label class="control-label" for="inputDefault">Username</label>
                    <input class="form-control" id="inputDefault" type="text" v-model="credentials.username" required>
                  </div>
                  <div class="form-group">
                    <label class="control-label" for="inputDefault">Password</label>
                    <input class="form-control" id="inputDefault" type="password" v-model="credentials.password" required>
                  </div>
                  <div class="form-group">
                    <div class="col-lg-10 col-lg-offset-2">
                      <button type="submit" class="btn btn-primary">Submit</button>
                    </div>
                  </div>
                </form>
              </li>
            </ul>
          </li>
          <li @click="logout" v-else><a href="#">Logout</a></li>
          </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data () {
    return {
      credentials: {
        username: '',
        password: ''
      }
    }
  },
  computed: {
    isLogin () {
      return this.$store.state.isLogin
    }
  },
  methods: {
    login () {
      let credentials = {
        username: this.credentials.username,
        password: this.credentials.password
      }

      this.$store.dispatch('login', credentials)
      this.credentials.username = ''
      this.credentials.password = ''
    },

    signup () {
      let credentials = {
        username: this.credentials.username,
        password: this.credentials.password
      }

      this.$store.dispatch('signup', credentials)
      this.credentials.username = ''
      this.credentials.password = ''
    },

    logout () {
      this.$swal({
        title: 'Are you sure?',
        text: '',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#eaeaea',
        confirmButtonText: 'Logout'
      }).then(() => {
        this.$swal({
          title: 'Bye bye Honey',
          text: 'Hope you come back soon',
          imageUrl: 'https://media.giphy.com/media/TzpnO1kZpEC0U/giphy.gif',
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: 'Custom image',
          animation: false
        })

        localStorage.removeItem('token')
        this.$store.commit('setLogin', false)
        this.$store.commit('setUserId', '')
        this.$router.go('/')
      })
    }
  }
}
</script>

<style lang="css">
  .loginform{
    padding: 5px;
  }
</style>
