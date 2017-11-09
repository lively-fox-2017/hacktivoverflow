import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

const $http = axios.create({
  baseURL: 'http://localhost:3000'
})

Vue.use(Vuex)

const state = {
  questions: [],
  questiondetail: {},
  activeuser: '',
  id: ''
}

const mutations = {
  setQuestions (state, payload) {
    state.questions = payload
  },
  setQuestionDetail (state, payload) {
    state.questiondetail = payload
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
    state.questions[idx].voters.push(payload.data)
  },
  redVote (state, payload) {
    const idx = state.questions.findIndex((element) => {
      if (element._id === payload.id) {
        return element._id
      }
    })
    const index = state.questions[idx].voters.findIndex((element) => {
      if (element.userid === this.activeuser) {
        return element._id
      }
    })
    state.questions[idx].voters.splice(index, 1)
  },
  deleteQuestion (state, payload) {
    const idx = state.questions.findIndex((element) => {
      if (element._id === payload) {
        return element._id
      }
    })
    state.questions.splice(idx, 1)
  },
  setActiveuser (state, payload) {
    state.activeuser = payload.userid
    state.id = payload.id
  },
  delActiveuser (state) {
    state.activeuser = ''
    state.id = ''
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
  getDetail ({ commit }, id) {
    $http.get('/api/questions/' + id)
    .then(({data}) => {
      console.log(data)
      commit('setQuestionDetail', data)
    }).catch(err => {
      console.log(err)
    })
  },
  submitQuestion ({ commit }, newquestion) {
    $http.post('/api/questions', newquestion, {headers: {'tokenjwt': localStorage.getItem('tokenjwt')}})
    .then(({ data }) => {
      console.log(data)
      commit('saveQuestion', data)
    })
  },
  addVote ({ commit }, id) {
    const data = {
      _id: id
    }
    $http.put('/api/questions/voteup/' + id, data, {headers: {'tokenjwt': localStorage.getItem('tokenjwt')}})
    .then(({ data }) => {
      commit('addVote', {id: id, data: data})
    }).catch(err => {
      alert('Please login first')
      console.log(err)
    })
  },
  redVote ({ commit }, id) {
    const data = {
      _id: id
    }
    $http.put('/api/questions/votedown/' + id, data, {headers: {'tokenjwt': localStorage.getItem('tokenjwt')}})
    .then(({ data }) => {
      commit('redVote', {id: id, data: data})
    }).catch(err => { console.log(err) })
  },
  deleteQuestion ({commit}, id) {
    $http.delete('api/questions/' + id, {headers: {'tokenjwt': localStorage.getItem('tokenjwt')}})
    .then(({ data }) => {
      commit('deleteQuestion', id)
    }).catch(err => { console.log(err) })
  },
  registerUser ({commit}, newUser) {
    $http.post('api/users', newUser)
    .then(({data}) => {
      alert('Register Completed')
    }).catch(err => {
      alert('Opps..Register Fail')
      console.log(err)
    })
  },
  loginUser ({commit}, userdata) {
    $http.post('api/users/login', userdata)
    .then(({data}) => {
      localStorage.setItem('tokenjwt', data.token)
      commit('setActiveuser', data)
      alert('Login Completed')
    }).catch(err => {
      alert('Opps..Login Fail')
      console.log(err)
    })
  },
  logoutUser ({commit}) {
    localStorage.removeItem('tokenjwt')
    commit('delActiveuser')
  },
  submitAnswer ({ commit }, newanswer) {
    $http.put('/api/questions/answer/' + newanswer.questionid, {answer: newanswer.content}, {headers: {'tokenjwt': localStorage.getItem('tokenjwt')}})
    .then(({ data }) => {
      console.log(data)
      commit('saveAnswer', data)
    })
  }
}

const store = new Vuex.Store({
  state,
  mutations,
  actions
})

export default store
