import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import jwtDecode from 'jwt-decode'

const http = axios.create({
  baseURL: 'http://ec2-18-216-180-217.us-east-2.compute.amazonaws.com/'
  // baseURL: 'http://localhost:3000/'
})

Vue.use(Vuex)

const state = {
  users: [],
  user: [],
  questions: [],
  questionById: [],
  answers: []
}

const mutations = {
  setUsers (state, payload) {
    state.users = payload
  },
  addUsers (state, payload) {
    state.users.push(payload)
  },
  setUser (state, payload) {
    state.user = (payload)
  },
  setQuestions (state, payload) {
    state.questions = (payload)
  },
  setQuestionById (state, payload) {
    state.questionById = (payload)
  },
  questionEdit (state, payload) {
    let newQuestions = state.questions.map((ans) => {
      if (payload._id === ans._id) {
        ans.question = payload.question
      }
      return ans
    })
    state.questions = newQuestions
  },
  questionLikeUnlike (state, payload) {
    let newQuestions = state.questions.map((ans) => {
      if (payload._id === ans._id) {
        let idx = ans.like.findIndex((like) => like._id === payload.like._id)
        if (idx === -1) {
          ans.like.push(payload.like)
        } else {
          ans.like.splice(idx, 1)
        }
      }
      return ans
    })
    state.questions = newQuestions
  },
  questionDislikeUndislike (state, payload) {
    let newQuestions = state.questions.map((ans) => {
      if (payload._id === ans._id) {
        let idx = ans.dislike.findIndex((dislike) => dislike._id === payload.dislike._id)
        if (idx === -1) {
          ans.dislike.push(payload.dislike)
        } else {
          ans.dislike.splice(idx, 1)
        }
      }
      return ans
    })
    state.questions = newQuestions
  },
  questionPush (state, payload) {
    state.questions.push(payload)
  },
  setAnswer (state, payload) {
    state.answers = (payload)
  },
  answerPush (state, payload) {
    state.answers.push(payload)
  },
  answerEdit (state, payload) {
    // const idx = state.answers.findIndex((answer) => answer._id === payload._id)
    // console.log('id data yang mau diganti', state.answers)
    // console.log('data yang mau diganti', payload.answer)
    // state.answers.splice(idx, 1, payload)
    let newAnswer = state.answers.map((ans) => {
      if (payload._id === ans._id) {
        ans.answer = payload.answer
      }
      return ans
    })
    state.answers = newAnswer
  },
  answerLikeUnlike (state, payload) {
    let newAnswer = state.answers.map((ans) => {
      if (payload._id === ans._id) {
        let idx = ans.like.findIndex((like) => like._id === payload.like._id)
        if (idx === -1) {
          ans.like.push(payload.like)
        } else {
          ans.like.splice(idx, 1)
        }
      }
      return ans
    })
    state.answers = newAnswer
  },
  answerDislikeUndislike (state, payload) {
    let newAnswer = state.answers.map((ans) => {
      if (payload._id === ans._id) {
        let idx = ans.dislike.findIndex((dislike) => dislike._id === payload.dislike._id)
        if (idx === -1) {
          ans.dislike.push(payload.dislike)
        } else {
          ans.dislike.splice(idx, 1)
        }
      }
      return ans
    })
    state.answers = newAnswer
  }
}

const actions = {
  getAllUsers ({ commit }) {
    http.get('/users')
    .then(({ data }) => {
      // console.log('data actions', data)
      commit('setUsers', data)
    })
    .catch(err => {
      console.log(err)
    })
  },
  addUsers ({ commit }, newUser) {
    http.post('/users/signup', newUser)
    .then(({ data }) => {
      alert('Signup Sukses')
      commit('addUsers', data)
    })
    .catch(err => {
      console.log(err)
    })
  },
  signIn ({ commit }, login) {
    console.log('ini login======', login)
    http.post('/users/signin', login)
    .then(({ data }) => {
      console.log('masukkkkk gakkk')
      localStorage.setItem('HO-Token', data.token)
      alert(data.message)
      let decoded = jwtDecode(localStorage.getItem('HO-Token'))
      commit('setUser', decoded)
      // console.log('set state user', this.state)
      // this.$router.push('/')
      // this.$router.push('/')
    })
    .catch(err => {
      console.log(err)
    })
  },
  getUserActive ({ commit }) {
    if (localStorage.getItem('HO-Token') != null) {
      let decoded = jwtDecode(localStorage.getItem('HO-Token'))
      commit('setUser', decoded)
    }
  },
  signOut ({ commit }, login) {
    // console.log('ini login======', user)
    http.post('/users/signin', login)
    .then(({ data }) => {
      localStorage.setItem('HO-Token', data.token)
      alert(data.message)
      commit('setUser', data.data)
    })
    .catch(err => {
      console.log(err)
    })
  },
  getAllQuestion ({ commit }) {
    http.get('/questions')
    .then(({ data }) => {
      // console.log('ini data Questions', data.data)
      commit('setQuestions', data.data)
    })
    .catch(err => {
      console.log(err)
    })
  },
  getQuestionById ({ commit }, id) {
    http.get('/questions/' + id)
    .then(({ data }) => {
      // console.log('ini data Questions', data.data)
      commit('setQuestionById', data.data)
    })
    .catch(err => {
      console.log(err)
    })
  },
  questionAdd ({ commit }, question) {
    // console.log('asdfasd==', question)
    let decoded = jwtDecode(localStorage.getItem('HO-Token'))
    http.post('/questions', { question: question.question, userId: decoded.userId })
    .then(({ data }) => {
      // console.log('add data Questions', data.data)
      commit('questionPush', data.data)
      // alert('question added')
    })
    .catch(err => {
      console.log(err)
    })
  },
  questionEdit ({ commit }, question) {
    http.put('/questions/' + question._id, { question: question.question })
    .then(({ data }) => {
      commit('questionEdit', question)
    })
    .catch(err => {
      console.log(err)
    })
  },
  questionLike ({ commit }, _id) {
    let decoded = jwtDecode(localStorage.getItem('HO-Token'))
    let idxQuestion = this.state.questions.findIndex((question) => question._id === _id)
    let idxLike = this.state.questions[idxQuestion].like.findIndex((question) => question._id === decoded.userId)
    let paramHttp = ''
    if (idxLike === -1) {
      paramHttp = 'like'
    } else {
      paramHttp = 'unlike'
    }
    http.put(`/questions/${paramHttp}/${_id}`, { _id: decoded.userId })
    .then(({ data }) => {
      commit('questionLikeUnlike', { _id: _id, like: {_id: decoded.userId, username: decoded.username} })
    })
    .catch(err => {
      console.log(err)
    })
  },
  questionDisLike ({ commit }, _id) {
    let decoded = jwtDecode(localStorage.getItem('HO-Token'))
    let idxQuestion = this.state.questions.findIndex((question) => question._id === _id)
    let idxDislike = this.state.questions[idxQuestion].dislike.findIndex((question) => question._id === decoded.userId)
    let paramHttp = ''
    if (idxDislike === -1) {
      paramHttp = 'dislike'
    } else {
      paramHttp = 'undislike'
    }
    http.put(`/questions/${paramHttp}/${_id}`, { _id: decoded.userId })
    .then(({ data }) => {
      commit('questionDislikeUndislike', { _id: _id, dislike: {_id: decoded.userId, username: decoded.username} })
    })
    .catch(err => {
      console.log(err)
    })
  },
  getAllAnswer ({ commit }) {
    http.get('/answers')
    .then(({ data }) => {
      commit('setAnswer', data.data)
    })
    .catch(err => {
      console.log(err)
    })
  },
  getAnswerByQuestion ({ commit }, id) {
    http.get('/answers/byquestion/' + id)
    .then(({ data }) => {
      // console.log('ini data', data.data)
      commit('setAnswer', data.data)
    })
    .catch(err => {
      console.log(err)
    })
  },
  answerAdd ({ commit }, answer) {
    http.post('/answers',
    { questionId: answer.questionId, answer: answer.answer, token: localStorage.getItem('HO-Token') })
    .then(({ data }) => {
      // alert('answ masuk')
      commit('answerPush', data.data)
    })
    .catch(err => {
      console.log(err)
    })
  },
  answerEdit ({ commit }, answer) {
    http.put('/answers/' + answer._id, { answer: answer.answer })
    .then(({ data }) => {
      commit('answerEdit', answer)
    })
    .catch(err => {
      console.log(err)
    })
  },
  answerLike ({ commit }, _id) {
    let decoded = jwtDecode(localStorage.getItem('HO-Token'))
    let idxAnswer = this.state.answers.findIndex((answer) => answer._id === _id)
    let idxLike = this.state.answers[idxAnswer].like.findIndex((answer) => answer._id === decoded.userId)
    let paramHttp = ''
    if (idxLike === -1) {
      paramHttp = 'like'
    } else {
      paramHttp = 'unlike'
    }
    http.put(`/answers/${paramHttp}/${_id}`, { _id: decoded.userId })
    .then(({ data }) => {
      commit('answerLikeUnlike', { _id: _id, like: {_id: decoded.userId, username: decoded.username} })
    })
    .catch(err => {
      console.log(err)
    })
  },
  answerDisLike ({ commit }, _id) {
    let decoded = jwtDecode(localStorage.getItem('HO-Token'))
    let idxAnswer = this.state.answers.findIndex((answer) => answer._id === _id)
    let idxDislike = this.state.answers[idxAnswer].dislike.findIndex((answer) => answer._id === decoded.userId)
    let paramHttp = ''
    if (idxDislike === -1) {
      paramHttp = 'dislike'
    } else {
      paramHttp = 'undislike'
    }
    http.put(`/answers/${paramHttp}/${_id}`, { _id: decoded.userId })
    .then(({ data }) => {
      commit('answerDislikeUndislike', { _id: _id, dislike: {_id: decoded.userId, username: decoded.username} })
    })
    .catch(err => {
      console.log(err)
    })
  }
}

const store = new Vuex.Store({
  state,
  mutations,
  actions
})

export default store
