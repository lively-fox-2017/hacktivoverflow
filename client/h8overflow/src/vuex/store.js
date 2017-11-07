import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

const $http = axios.create({
  baseURL: 'http://localhost:3000'
})
//
// Vue.prototype.$http = axios.create({
//   baseURL: 'http://localhost:3000'
// })

Vue.use(Vuex)

const state = {
  questions: [],
  question: {},
  id: ''
}

const mutations = {
  setQuestions (state, payload) {
    state.questions = payload
  },
  saveQuestion (state, payload) {
    state.questions.push(payload)
  },
  addVote (state, payload) {
    const idx = state.questions.findIndex((element) => {
      if (element._id === payload.id) {
        return element._id
      }
    })
    console.log(payload)
    state.questions[idx].voters.push(payload.data)
  },
  redVote (state, payload) {
    const idx = state.questions.findIndex((element) => {
      if (element._id === payload.id) {
        return element._id
      }
    })
    const index = state.questions[idx].voters.findIndex((element) => {
      if (element._id === '59f9d16eed550b7df8c5a813') {
        return element._id
      }
    })
    console.log(payload)
    state.questions[idx].voters.splice(index, 1)
  }
}

const actions = {
  getAllQuestions ({ commit }) {
    $http.get('/api/questions')
    .then(({data}) => {
      console.log(data)
      commit('setQuestions', data)
    }).catch(err => {
      console.log(err)
    })
  },
  submitQuestion ({ commit }, newquestion) {
    $http.post('/api/questions', newquestion, {headers: {'tokenjwt': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI1OWY5ZDE2ZWVkNTUwYjdkZjhjNWE4MTMifQ.D7t_rTo9JW35C4dM5xgJdpvM-RcaR1FJxfaKcDMGHJs'}})
    .then(({ data }) => {
      commit('saveQuestion', data)
    })
  },
  addVote ({ commit }, id) {
    const data = {
      _id: id
    }
    $http.put('/api/questions/voteup/' + id, data, {headers: {'tokenjwt': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI1OWY5ZDE2ZWVkNTUwYjdkZjhjNWE4MTMifQ.D7t_rTo9JW35C4dM5xgJdpvM-RcaR1FJxfaKcDMGHJs'}})
    .then(({ data }) => {
      commit('addVote', {id: id, data: data})
    }).catch(err => { console.log(err) })
  },
  redVote ({ commit }, id) {
    const data = {
      _id: id
    }
    $http.put('/api/questions/votedown/' + id, data, {headers: {'tokenjwt': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI1OWY5ZDE2ZWVkNTUwYjdkZjhjNWE4MTMifQ.D7t_rTo9JW35C4dM5xgJdpvM-RcaR1FJxfaKcDMGHJs'}})
    .then(({ data }) => {
      commit('redVote', {id: id, data: data})
    }).catch(err => { console.log(err) })
  }
}

const store = new Vuex.Store({
  state,
  mutations,
  actions
})

export default store
