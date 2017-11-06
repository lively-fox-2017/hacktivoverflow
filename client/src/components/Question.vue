<template>
  <div class="Question">

    <div class="" v-if="form==false">

      <div class="panel panel-default">
        <div class="panel-heading"><b>{{questionsatuan.judul}}</b></div>
        <div class="panel-body">
          <blockquote class="blockquote-reverse">
            {{questionsatuan.pertanyaan}}
            <small>{{questionsatuan.username}} <cite title="Source Title"></cite></small>
          </blockquote>
          <div class="" v-if="profile.username == questionsatuan.username">
            <a @click="hapusquestion()" href="#">Hapus</a>
          </div>
        </div>
      </div>

      <div class="formulir">
        <form @submit.prevent="inputJawaban()" class="">
          <textarea v-model="jawaban" class="form-control" rows="5" id="comment" placeholder="Jawab Pertanyaan"></textarea>
          <button type="submit" class="">Submit</button>
        </form>
      </div>

      <div class="panel panel-default" v-for="dataanswer in answerbyquestion">
        <div class="panel-heading">
          <p class="panel-title"><b>{{dataanswer.iduser[0].username}}</b></p>
        </div>
        <div class="panel-body">
          {{dataanswer.jawaban}}
        </div>
        <div class="panel-footer clearfix">
          <div class="col-xs-8">
            <div class="col-xs-4">
              <button @click="voteanswer(dataanswer)" type="button" name="button">{{dataanswer.vote.length}}</button>
            </div>
            <div class="col-xs-8" v-for="data in dataanswer.vote">
              <div class="" v-if="data.username === profile.username">
                <p>Kamu sudah Vote</p>
              </div>
            </div>
          </div>
        <div class="col-xs-2" v-if="profile.username == dataanswer.iduser[0].username">
          <button class="btn btn-default btn-xs btn-lg" @click="hapusanswer(dataanswer._id)" type="button" name="button">Delete</button>
        </div>
        <div class="col-xs-2" v-if="profile.username == dataanswer.iduser[0].username">
          <button class="btn btn-default btn-xs btn-lg" @click="Editanswer(dataanswer._id)" type="button" name="button">Edit</button>
        </div>
      </div>
    </div>
    <button type="button" name="button" @click="hide()">Umpetin</button>
    </div>

    <div class="" v-else>
      <button type="button" name="button" @click="hide()">Tmpilkan</button>
    </div>



  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'Question',
  data () {
    return {
      id: this.$route.params.id,
      jawaban: '',
      form: false
    }
  },
  computed: {
    ...mapState([
      'questionsatuan',
      'answerbyquestion',
      'addjawaban',
      'profile',
      'deletepertanyaan',
      'deletejawaban',
      'votejawabankita'
    ])
  },
  methods: {
    voteanswer (data) {
      let penyaringan = data.vote.findIndex((test) => {
        return test._id === this.profile._id
      })
      if (penyaringan === -1) {
        console.log('belum ada cuy')
        this.$store.dispatch('voteAnswer', data)
      } else {
        console.log('yah udah ada', penyaringan)
        data.index = penyaringan
        this.$store.dispatch('unVoteAnswer', data)
      }
    },
    inputJawaban () {
      this.$store.dispatch('postingAnswer', {
        jawaban: this.jawaban,
        idquestion: this.id
      }).then(() => {
        this.jawaban = ''
      })
    },
    hapusquestion (id) {
      this.$store.dispatch('hapusQuestion', {
        id: this.id
      }).then(() => {
      })
    },
    hapusanswer (id) {
      this.$store.dispatch('hapusAnswer', {
        id: id
      }).then(() => {
      })
    },
    Editanswer (id) {
      this.form = !this.form
      console.log('ceritanya mau edit', {
        id: id,
        idQuestion: this.id
      })
      this.editQuestion({
        id: id,
        idQuestion: this.id
      })
    },
    hide () {
      this.form = !this.form
    },
    ...mapActions([
      'question',
      'postingAnswer',
      'hapusQuestion',
      'hapusAnswer',
      'editQuestion'
    ])
  },
  created () {
    this.question(this.id)
  },
  watch: {
    addjawaban: function (cari) {
      this.question(this.id)
    },
    deletepertanyaan: function (hapus) {
      this.$router.push('/')
    },
    deletejawaban: function (hapus) {
      // this.$router.push('/' + this.id)
      this.question(this.id)
    },
    votejawabankita: function (vote) {
      console.log('jalandog')
      this.question(this.id)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.form-control {
  margin-top: 10px;
  margin-bottom: 10px;
}
.formulir {
  padding-bottom: 10px;
}
.blockquote-reverse {
  font-size: 12px;
}
.panel-title {
  font-size: 13px;
}
.col-xs-2 {
  text-align: right;
}
</style>
