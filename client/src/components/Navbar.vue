<template>
  <div class="Navbar">
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">Hacktiv Overflow</a>
        </div>

        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul class="nav navbar-nav">
            <li><a href="/">Home</a></li>
            <li><a href="#">Profile</a></li>
          </ul>

          <ul class="nav navbar-nav navbar-right">
            <!-- <li data-toggle="modal" data-target="#myModal"><a href="#"><img class="image" src="https://cdn3.iconfinder.com/data/icons/glypho-generic-icons/64/plus-circle-128.png"><b>   Buat Pertanyaan</b></a></li> -->
            <li @click="perubahan()"><a href="#"><img class="image" src="https://cdn3.iconfinder.com/data/icons/glypho-generic-icons/64/plus-circle-128.png"><b>   Buat Pertanyaan</b></a></li>
            <!-- <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Dropdown <span class="caret"></span></a>
              <ul class="dropdown-menu" role="menu">
                <li><a href="#">Action</a></li>
                <li><a href="#">Another action</a></li>
                <li><a href="#">Something else here</a></li>
                <li class="divider"></li>
                <li><a href="#">Separated link</a></li>
                <li class="divider"></li>
                <li><a href="#">One more separated link</a></li>
              </ul>
            </li> -->
          </ul>
        </div>
      </div>
    </nav>
    <div class="" >
      <div class="" v-if="formulir==false">

      </div>
      <div class="" v-else>
        <div class="col-sm-4">

          <div class="panel panel-primary">
            <div class="panel-heading">
              <h3 class="panel-title">Note</h3>
            </div>
            <div class="panel-body">
              <p>Input pertanyaan anda pada Formulir pertanyaan disamping.</p>
            </div>
          </div>

        </div>
        <div class="col-sm-8 pembatascol">
          <form @submit.prevent="inputPertanyaan({judul, pertanyaan})" class="">
            <input v-model="judul" type="text" class="form-control" id="pwd" placeholder="Judul Pertanyaan Anda">
            <textarea v-model="pertanyaan" class="form-control" rows="5" id="comment" placeholder="Tulis pertanyaan anda disini"></textarea>
            <button type="submit" class="">Submit</button>
          </form>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
export default {
  name: 'Navbar',
  components: {
  },
  data () {
    return {
      judul: '',
      pertanyaan: '',
      formulir: false
    }
  },
  computed: {
    ...mapState([
      'token',
      'profile'
    ])
  },
  methods: {
    inputPertanyaan () {
      this.$store.dispatch('inputQuestion', {
        judul: this.judul,
        pertanyaan: this.pertanyaan,
        idgrup: null
      }).then(() => {
        this.judul = ''
        this.pertanyaan = ''
      })
    },
    perubahan () {
      if (this.profile) {
        this.formulir = !this.formulir
      } else {

      }
    },
    ...mapActions([
      'checkToken'
    ])
  },
  created () {
    this.checkToken()
    // console.log(this.token)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.image {
  width: 30px;
}
.form-control {
  margin-bottom: 10px;
}
.pembatascol {
  padding-bottom: 15px;
}
</style>
