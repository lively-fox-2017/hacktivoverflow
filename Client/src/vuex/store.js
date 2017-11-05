import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import swal from 'vue-sweetalert2'

Vue.use(Vuex)
Vue.use(swal)

let db = axios.create({
  baseURL: 'http://localhost:3000'
})

const store = new Vuex.Store({
  state: {
    questions: [],
    answers: [],
    isLogin: false
  },
  mutations: {
    setQuestions (state, value) {
      state.questions = value
    },
    setAnswers (state, value) {
      state.answers = value
    },
    setLogin (state, value) {
      state.isLogin = value
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
    },
    login ({commit}, credentials) {
      db.post('/users/login', credentials)
      .then((loginResponse) => {
        // console.log(loginResponse)
        Vue.swal(
          'Login Success!',
          'Welcome Honey',
          'success'
        )

        localStorage.setItem('token', loginResponse.data.token)
        commit('setLogin', true)
      }).catch((reason) => {
        Vue.swal(
          'Oops...',
          'Invalid Username and Password',
          'error'
        )
      })
    },

    signup ({commit}, credentials) {
      db.post('/users/register', credentials)
      .then((signupResponse) => {
        Vue.swal(
          'Sign up Success!',
          'Welcome Honey',
          'success'
        )

        localStorage.setItem('token', signupResponse.data.token)
        commit('setLogin', true)
      }).catch((reason) => {
        Vue.swal(
          'Oops...',
          'Cannot match requirement',
          'error'
        )
      })
    }
  }
})

export default store
