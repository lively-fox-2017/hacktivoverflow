<template>
  <div class="Loginpanel">
    <div class="col-sm-1">

    </div>
    <div class="col-sm-10" v-if="token==''">
      <div class="" v-if="reg == false">
        <form @submit.prevent="login({ username, password})" class="" action="index.html" method="post">

          <div class="input-group">
            <div class="input-group-addon">Username</div>
            <input v-model="username" type="text" class="form-control" id="exampleInputAmount" >
          </div>

          <div class="input-group">
            <div class="input-group-addon">Password </div>
            <input v-model="password" type="password" class="form-control" id="exampleInputAmount" >
          </div>

          <button class="btn btn-default btn-lg btn-block" type="submit" name="button">Login</button>
          <button @click="registrasi()" class="btn btn-default btn-lg btn-block" type="button" name="button">Register</button>

        </form>
        <button v-on:click="fblogin()" class="logfb btn btn-default btn-lg btn-block" type="" name="button">Login FB</button>
      </div>
      <div class="" v-else>
        <form @submit.prevent="pendaftaran()" class="" action="index.html" method="post">

          <div class="input-group">
            <div class="input-group-addon">Username</div>
            <input v-model="username" type="text" class="form-control" id="exampleInputAmount" >
          </div>

          <div class="input-group">
            <div class="input-group-addon">Password </div>
            <input v-model="password" type="password" class="form-control" id="exampleInputAmount" >
          </div>

          <div class="input-group">
            <div class="input-group-addon">E-Mail  </div>
            <input v-model="email" type="email" class="form-control" id="exampleInputAmount" >
          </div>

          <button class="btn btn-default btn-lg btn-block" type="submit" name="button">Registrasi</button>

        </form>
      </div>


    </div>
    <!-- <div class="col-sm-10" v-if="token==''">

    </div> -->
    <div class="col-sm-10" v-else>
      <h5>Selamat datang kembali:</h5>
      <h4><b>{{profile.username}}</b></h4>
      <button v-on:click="logout()" class="btn btn-default btn-lg btn-block" type="" name="button">Logout</button>
    </div>

  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
export default {
  name: 'Loginpanel',
  components: {
  },
  data () {
    return {
      username: '',
      password: '',
      email: '',
      reg: false
    }
  },
  computed: {
    ...mapState([
      'token',
      // 'tokenwatch',
      'profile'
    ])
  },
  mounted: function () {
    (function (d, s, id) {
      var js
      var fjs = d.getElementsByTagName(s)[0]
      if (d.getElementById(id)) return
      js = d.createElement(s); js.id = id
      js.src = '//connect.facebook.net/en_US/sdk.js'
      fjs.parentNode.insertBefore(js, fjs)
    }(document, 'script', 'facebook-jssdk'))

    window.fbAsyncInit = function () {
      window.FB.init({
        appId: 178711819350175,
        cookie: true,
        xfbml: true,
        version: 'v2.8'
      })
    }
  },
  methods: {
    pendaftaran () {
      this.$store.dispatch('pendaftaranUser', {
        username: this.username,
        password: this.password,
        email: this.email
      })
      this.reg = !this.reg
    },
    registrasi () {
      this.username = ''
      this.password = ''
      this.email = ''
      this.reg = !this.reg
      // console.log('haloha')
    },
    fblogin () {
      // console.log('coba login')
      // var self = this
      // window.FB.getLoginStatus(function (response) {
      //   self.statusChangeCallback(response)
      // })
      this.loginFb()
    },
    // statusChangeCallback (response) {
    //   if (response.status === 'connected') {
    //     console.log('Udah konek Bro', response.authResponse.accessToken)
    //     // window.FB.logout()
    //   } else {
    //     window.FB.login(function (response) {
    //       console.log('respon dari fb login', response.accessToken)
    //     })
    //   }
    // },
    login () {
      this.$store.dispatch('loginuser', {
        username: this.username,
        password: this.password
      })
    },
    logout () {
      localStorage.removeItem('token')
      this.checkToken()
      // let self = this
      // self.token = ''
      // console.log('token after logout', self.toket)
      // let self = this
    },
    ...mapActions([
      'checkToken',
      'getDataPersonal',
      'loginFb'
    ])
  },
  created () {
    this.checkToken()
    if (this.token === '') {
      // console.log('halo')
    } else {
      this.getDataPersonal(this.token)
    }

    // console.log('======> Cek lah', this.token)
  },
  watch: {
    // ditaro di watch karna kalau ga maka ga ke load sebelum di refresh
    token: function (harusdiisi) {
      // console.log('pengecekan token')
      let self = this
      self.getDataPersonal(this.token)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.input-group {
  margin-bottom: 10px;
  border-radius: 10px;
}
.input-group-addon {
  /*width: 10px;*/
}
.Loginpanel {
  padding-bottom: 20px;
}
.col-sm-10 {
  text-align: center;
}
.logfb {
  margin-top: 5px;
}
</style>
