import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import jwtDecode from 'jwt-decode'

const http = axios.create({
  baseURL: 'http://localhost:3000'
})

Vue.use(Vuex)

const state = {
  // untuk menghandle data yang akan digunakan oleh componen lain
  questionall: [],
  token: '',
  profile: '',
  addpertanyaan: [],
  deletepertanyaan: [],
  questionsatuan: [],
  answerbyquestion: [],
  addjawaban: '',
  deletejawaban: '',
  votejawabankita: ''
}

const mutations = {
  // dapatkan semua data question
  setQuestionAll (state, payload) {
    state.questionall = payload
    // console.log(state.questionall)
  },
  setLogin (state, payload) {
    state.token = payload
    // console.log(state.token)
  },
  setProfile (state, payload) {
    state.profile = payload
    // let self = state
    console.log('profile nya =====>', state.profile)
  },
  addPertanyaan (state, payload) {
    state.addpertanyaan = payload
  },
  deletePertanyaan (state, payload) {
    state.deletepertanyaan = payload
    // console.log('Patokan', state.deletepertanyaan)
  },
  questionOne (state, payload) {
    let obj = {
      judul: payload.judul,
      pertanyaan: payload.pertanyaan,
      username: payload.iduser[0].username
    }
    state.questionsatuan = obj
    // console.log('ini payload', state.questionsatuan)
  },
  answerByQuestion (state, payload) {
    state.answerbyquestion = payload
  },
  addJawaban (state, payload) {
    state.addjawaban = payload
  },
  deleteJawaban (state, payload) {
    state.deletejawaban = payload
  },
  voteJawaban (state, payload) {
    state.votejawabankita = payload
  }
}

const actions = {
  questionAll ({commit}) {
    // dapatkan semua data question
    http.get('/question/all')
    .then(({data}) => {
      commit('setQuestionAll', data)
    })
    .catch((err) => {
      console.log(err)
    })
  },
  loginuser ({commit}, masukan) {
    console.log(masukan)
    http.post('/user/login', {
      username: masukan.username,
      password: masukan.password
    })
    .then(({data}) => {
      if (data === 'Fail') {
        console.log('hapus')
      } else {
        console.log('Token dari Actions: ', data)
        localStorage.setItem('token', data)
        commit('setLogin', data)
      }
    })
  },
  checkToken ({commit}) {
    console.log('cektoken di store')
    const token = localStorage.getItem('token')
    if (token) {
      commit('setLogin', token)
      // console.log('==> Token dari checkToken', token)
    } else {
      commit('setLogin', '')
    }
  },
  getDataPersonal ({commit}, masukanToken) {
    console.log('tokennyabagaimana', masukanToken)
    if (!masukanToken) {
      state.profile = ''
      console.log('horay')
    } else {
      let decoded = jwtDecode(masukanToken)
      commit('setProfile', decoded)
      // http.get('/user/profile', {
      //   headers: {
      //     token: masukanToken
      //   }
      // })
      // .then(({data}) => {
      //   commit('setProfile', data)
      //   // console.log('hanyatoken', data)
      // })
      // .catch(() => {
      //   console.log('ga ada data')
      // })
    }
  },
  inputQuestion ({commit}, masukan) {
    http.post('/question', {
      judul: masukan.judul,
      pertanyaan: masukan.pertanyaan,
      idgrup: masukan.idgrup
    }, {
      headers: {
        token: localStorage.getItem('token')
      }
    })
    .then(({data}) => {
      commit('addPertanyaan', data)
    })
  },
  hapusQuestion ({commit}, masukan) {
    // console.log(masukan.id)
    http.delete('/question/' + masukan.id, {
      headers: {
        token: localStorage.getItem('token')
      }
    })
    .then(({data}) => {
      // console.log(data)
      commit('deletePertanyaan', data)
    })
  },
  question ({commit}, masukan) {
    // console.log(masukan)
    http.get('/question/' + masukan)
    .then(({data}) => {
      // console.log(data)
      commit('questionOne', data)
      http.get('/answer/' + data._id)
      .then(({data}) => {
        // console.log({data})
        commit('answerByQuestion', data)
      })
    })
  },
  postingAnswer ({commit}, masukan) {
    console.log(state.profile._id)
    http.post('/answer', {
      jawaban: masukan.jawaban,
      iduser: state.profile._id,
      idquestion: masukan.idquestion
    })
    .then(({data}) => {
      commit('addJawaban', data)
    })
  },
  hapusAnswer ({commit}, masukan) {
    console.log('haspusAnswer', masukan)
    http.delete('/answer/' + masukan.id)
    .then(({data}) => {
      console.log(data)
      commit('deleteJawaban', data)
    })
  },
  loginFb ({commit}) {
    // (function (d, s, id) {
    //   var js
    //   var fjs = d.getElementsByTagName(s)[0]
    //   if (d.getElementById(id)) return
    //   js = d.createElement(s); js.id = id
    //   js.src = '//connect.facebook.net/en_US/sdk.js'
    //   fjs.parentNode.insertBefore(js, fjs)
    // }(document, 'script', 'facebook-jssdk'))
    //
    // window.fbAsyncInit = function () {
    //   window.FB.init({
    //     appId: 178711819350175,
    //     cookie: true,
    //     xfbml: true,
    //     version: 'v2.8'
    //   })
    // }

    // var self = this
    window.FB.getLoginStatus(function (response) {
      // self.statusChangeCallback(response)
      if (response.status === 'connected') {
        console.log('Udah konek Bro', response.authResponse)
        http.post('/loginfb', {fbtoken: response.authResponse.accessToken})
        .then(({data}) => {
          localStorage.setItem('token', data)
          commit('setLogin', data)
          let datadecode = data
          let decoded = jwtDecode(datadecode)
          console.log('ini data sementara', decoded)
          // buat ambil balikan
        })
        // window.FB.logout()
      } else {
        window.FB.login(function (response) {
          console.log('respon dari fb login', response.authResponse.accessToken)
          http.post('/loginfb', {fbtoken: response.authResponse.accessToken})
          .then(({data}) => {
            localStorage.setItem('token', data)
            commit('setLogin', data)
            let datadecode = data
            let decoded = jwtDecode(datadecode)
            console.log('ini data sementara', decoded)
            // buat ambil balikan
          })
          // kirim ke belakang
        })
      }
    })
  },
  voteAnswer ({commit}, masukan) {
    let obj = {
      idquestion: masukan.idquestion[0]._id,
      iduser: masukan.iduser[0]._id,
      jawaban: masukan.jawaban,
      vote: []
    }
    masukan.vote.forEach((data) => {
      obj.vote.push(data._id)
    })
    obj.vote.push(state.profile._id)
    console.log(obj)
    // console.log('ini dari store', masukan._id)
    http.put('/answer/' + masukan._id, {
      idquestion: obj.idquestion,
      iduser: obj.iduser,
      jawaban: obj.jawaban,
      vote: obj.vote
    })
    .then(({data}) => {
      console.log('data keluaran edit', data)
      commit('voteJawaban', data)
    })
  },
  unVoteAnswer ({commit}, masukan) {
    let obj = {
      idquestion: masukan.idquestion[0]._id,
      iduser: masukan.iduser[0]._id,
      jawaban: masukan.jawaban,
      vote: masukan.vote
    }
    masukan.vote.splice(masukan.index, 1)
    http.put('/answer/' + masukan._id, {
      idquestion: obj.idquestion,
      iduser: obj.iduser,
      jawaban: obj.jawaban,
      vote: obj.vote
    })
    .then(({data}) => {
      console.log('data keluaran edit', data)
      commit('voteJawaban', data)
    })
    // console.log(masukan.vote)
    // console.log(obj)
    // console.log(masukan.index)
  },
  editQuestion ({commit}, masukan) {
    console.log('daristate', masukan)
  }
}

const store = new Vuex.Store({
  state,
  actions,
  mutations
})

export default store
