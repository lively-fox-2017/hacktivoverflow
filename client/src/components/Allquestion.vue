<template>
  <div class="allquestion">
    <div class="div-tabel">
      <table class="table">
        <thead>
          <tr>
            <th class="table-center">Judul Question</th>
            <th class="table-center">Username Member</th>
            <th class="table-center">Hapus Pertanyaan</th>
          </tr>
        </thead>
        <tbody v-for="semuaquestion in questionall">
          <tr>
            <td>
              <router-link :to="semuaquestion._id">{{semuaquestion.judul}}
              </router-link>
            </td>
            <td>{{semuaquestion.iduser[0].username}}</td>
            <td v-if="profile.username == semuaquestion.iduser[0].username"><a @click="hapusquestion(semuaquestion)" href="#">Hapus</a></td>
            <td v-else></td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
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
      // .......
    }
  },
  computed: {
    ...mapState([
      'questionall',
      'addpertanyaan',
      'profile',
      'deletepertanyaan'
    ])
  },
  methods: {
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
</style>
