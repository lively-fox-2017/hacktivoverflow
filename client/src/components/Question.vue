<template>
  <div class="Question">

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

      <div class="formulir" v-if="form == false">
        <div class="formulir" v-if="!token">

        </div>
        <div class="formulir" v-else>
          <h5><b>Input Tanggapan Anda</b></h5>
          <form @submit.prevent="inputJawaban()" class="">
            <textarea v-model="jawaban" class="form-control" rows="5" id="comment" placeholder="Jawab Pertanyaan"></textarea>
            <button type="submit" class="">Submit</button>
          </form>
        </div>
      </div>
      <div class="formulir" v-else>

        <form @submit.prevent="editJawaban()" class="">
            <h5><b>Edit Question Anda</b></h5>
            <textarea v-model="jawaban" class="form-control" rows="5" id="comment" placeholder="Tulis pertanyaan anda disini"></textarea>

            <button type="submit" class="">Submit</button>

            <button @click="cencel()" type="button" class="">cencel</button>
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
              <div class="" v-if="dataanswer.vote.findIndex((test) => {return test._id === profile._id}) === -1">
                <button @click="voteanswer(dataanswer)" type="button" class="tumbone btn btn-default btn-sm"><span class="glyphicon glyphicon-thumbs-up"></span> {{dataanswer.vote.length}} Vote </button>
              </div>
              <div class="" v-else>
                <button @click="voteanswer(dataanswer)" type="button" class="tumb btn btn-default btn-sm"><span class="glyphicon glyphicon-thumbs-up"></span> {{dataanswer.vote.length}} Vote </button>
              </div>
              <!-- <button @click="voteanswer(dataanswer)" type="button" name="button">{{dataanswer.vote.length}}</button> -->
            </div>
            <!-- <div class="col-xs-8" v-for="data in dataanswer.vote">
              <div class="" v-if="dataanswer.vote.findIndex((test) => {return test._id === profile._id}) === -1">
                <p>Belum</p>
              </div>
              <div class="" v-else>
                <p>Udh ada</p>
              </div>
            </div> -->
          </div>
        <div class="col-xs-2" v-if="profile.username == dataanswer.iduser[0].username">
          <button class="btn btn-default btn-xs btn-lg" @click="hapusanswer(dataanswer._id)" type="button" name="button">Delete</button>
        </div>
        <div class="col-xs-2" v-if="profile.username == dataanswer.iduser[0].username">
          <button class="btn btn-default btn-xs btn-lg" @click="Editanswer(dataanswer)" type="button" name="button">Edit</button>
        </div>
      </div>
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
      _id: '',
      idquestion: '',
      iduser: '',
      vote: [],
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
      'votejawabankita',
      'token',
      'editjaw'
    ])
  },
  methods: {
    editJawaban () {
      let obj = {
        id: this._id,
        idquestion: this.idquestion,
        iduser: this.iduser,
        jawaban: this.jawaban,
        vote: this.vote
      }
      this.$store.dispatch('editMenjawab', obj)
      this._id = ''
      this.idquestion = ''
      this.iduser = ''
      this.jawaban = ''
      this.form = !this.form
    },
    Editanswer (data) {
      this.vote = []
      if (this.form === false) {
        this._id = data._id
        this.idquestion = data.idquestion[0]._id
        this.iduser = data.iduser[0]._id
        this.jawaban = data.jawaban
        data.vote.forEach((data) => {
          this.vote.push(data._id)
        })
        this.form = !this.form
      } else {
        this._id = ''
        this.idquestion = ''
        this.iduser = ''
        this.jawaban = ''
        this.form = !this.form
      }

      console.log('edited', {
        id: data._id,
        idquestion: data.idquestion[0]._id,
        iduser: data.iduser[0]._id,
        jawaban: data.jawaban,
        vote: this.vote
      })
    },
    cencel () {
      this.form = !this.form
    },
    voteanswer (data) {
      if (this.profile) {
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
      } else {
        console.log('belum login')
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
    },
    editjaw: function (jawab) {
      console.log('jawaban edit')
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
.tumb {
  background: #0000FF;
  color: #ffffff;
}
.tumbone {
  background: #ffffff;
  color: #000000;
}
.form-control {
  margin-bottom: 10px;
}
.pembatascol {
  padding-bottom: 15px;
}
.formulir {
  color: #000000;
}
</style>
