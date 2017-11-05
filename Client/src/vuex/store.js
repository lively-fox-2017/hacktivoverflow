import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

let db = axios.create({
  baseURL: 'http://localhost:3000'
})

const store = new Vuex.Store({
  state: {
    questions: [],
    answers: []
  },
  mutations: {
    setQuestions (state, value) {
      state.questions = value
    },
    setAnswers (state, value) {
      state.answers = value
    }
  },
  actions: {
    allQuestions ({commit}) {
      db.get('/questions').then(({data}) => {
        // console.log(data)
        commit('setQuestions', data.data)
      })
    },
    allAnswer ({commit}, id) {
      db.get(`/answers/${id}`).then(({data}) => {
        commit('setAnswers', data.data)
      })
    }
  }
})

export default store
