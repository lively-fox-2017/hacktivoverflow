<template>
  <div class="allquestion">

    <div class="" v-if="editbar==false">

    </div>
    <div class="" v-else>
      <div class="col-sm-12 pembatascol">
        <form @submit.prevent="editPertanyaan()" class="">
          <h5><b>Edit Question Anda</b></h5>
          <input v-model="judul" type="text" class="form-control" id="pwd" placeholder="Judul Pertanyaan Anda">
          <textarea v-model="pertanyaan" class="form-control" rows="5" id="comment" placeholder="Tulis pertanyaan anda disini"></textarea>
          <button type="submit" class="">Submit</button>
          <button @click="cencel()" type="button" class="">cencel</button>
        </form>
      </div>
    </div>


    <div class="div-tabel">
      <table class="table">
        <thead>
          <tr>
            <th class="table-center">Judul Question</th>
            <th class="table-center">Username Member</th>
            <th class="table-center"> </th>
            <th class="table-center"> </th>
            <th class="table-center"> </th>
          </tr>
        </thead>
        <tbody v-for="semuaquestion in questionall">
          <tr>
            <td>
              <router-link :to="semuaquestion._id">{{semuaquestion.judul}}
              </router-link>
            </td>
            <td class="font-tengah">{{semuaquestion.iduser[0].username}}</td>

            <td v-if="profile.username == semuaquestion.iduser[0].username"><a @click="hapusquestion(semuaquestion)" href="#">Hapus</a></td>

            <td v-else>Anda Bukan TS</td>

            <td v-if="profile.username == semuaquestion.iduser[0].username"><a @click="mengedit(semuaquestion)" href="#">Edit</a></td>

            <td v-else>Anda Bukan TS</td>

            <td class="font-tengah" v-if="semuaquestion.vote.findIndex((test) => {return test._id === profile._id}) === -1"><button @click="votequestion(semuaquestion)" type="button" class="tumbone btn btn-default btn-sm"><span class="glyphicon glyphicon-thumbs-up"></span> {{semuaquestion.vote.length}} Vote </button></td>

            <td class="font-tengah" v-else><button @click="votequestion(semuaquestion)" type="button" class="tumb btn btn-default btn-sm"><span class="glyphicon glyphicon-thumbs-up"></span> {{semuaquestion.vote.length}} Vote </button></td>

          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th class="table-center"></th>
            <th class="table-center"></th>
            <th class="table-center"></th>
            <th class="table-center"></th>
            <th class="table-center"></th>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
// import ini digunakan untuk memanggil fungsi hasil singkronisasi database di store
export default {
  name: 'Allquestion',
  data () {
    return {
      id: '',
      judul: '',
      pertanyaan: '',
      iduser: '',
      vote: [],
      editbar: false
    }
  },
  computed: {
    ...mapState([
      'questionall',
      'addpertanyaan',
      'profile',
      'deletepertanyaan',
      'votepertanyaan',
      'ujicoba',
      'editper'
    ])
  },
  methods: {
    cencel () {
      this.editbar = !this.editbar
    },
    editPertanyaan () {
      let obj = {
        id: this.id,
        judul: this.judul,
        pertanyaan: this.pertanyaan,
        iduser: this.iduser,
        vote: this.vote
      }
      this.$store.dispatch('editQuestion', obj)
      this.id = ''
      this.judul = ''
      this.pertanyaan = ''
      this.iduser = ''
      this.vote = []

      this.editbar = !this.editbar
    },
    mengedit (data) {
      this.vote = []
      if (this.editbar === false) {
        this.id = data._id
        this.judul = data.judul
        this.pertanyaan = data.pertanyaan
        this.iduser = data.iduser[0]._id
        data.vote.forEach((data) => {
          this.vote.push(data._id)
        })
        this.editbar = !this.editbar
      } else {
        this.id = data._id
        this.judul = data.judul
        this.pertanyaan = data.pertanyaan
        this.iduser = data.iduser[0]._id
        data.vote.forEach((data) => {
          this.vote.push(data._id)
        })
        console.log({
          judul: this.judul,
          pertanyaan: this.pertanyaan,
          iduser: this.iduser,
          vote: this.vote
        })
      }
    },
    votequestion (data) {
      console.log(data)
      console.log(data.iduser[0]._id)
      let cekvotequestion = data.vote.findIndex((test) => {
        return test._id === this.profile._id
      })
      // console.log(cekvotequestion)
      if (cekvotequestion === -1) {
        this.$store.dispatch('voteQuestion', data)
      } else {
        data.index = cekvotequestion
        this.$store.dispatch('unVoteQuestion', data)
      }
    },
    hapusquestion (id) {
      this.$store.dispatch('hapusQuestion', {
        id: id._id
      }).then(() => {
      })
    },
    ...mapActions([
      'questionAll',
      'inputQuestion',
      'getDataPersonal',
      'hapusQuestion'
    ])
  },
  created () {
    this.questionAll()
  },
  watch: {
    // ditaro di watch karna kalau ga maka ga ke load sebelum di refresh
    addpertanyaan: function (harusdiisi) {
      this.questionAll()
      console.log('jalan')
    },
    deletepertanyaan: function (diisi) {
      this.questionAll()
      console.log(this.hapusQuestion)
    },
    votepertanyaan: function (diisi) {
      this.questionAll()
    },
    editper: function (diisilah) {
      this.questionAll()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.table-center {
  text-align: center;
  background-color: #e7e7e7;
  color: #000000;
}
.div-tabel {
  /*padding-top: 30px;*/
}
.font-tengah {
  text-align: center;
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
</style>
