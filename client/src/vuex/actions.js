import axios from 'axios'

const http = axios.create({
  // baseURL: 'https://hacktivoverflow-api.lokilokostudio.tk/api'
  baseURL: 'http://localhost:3000/api'
})

const actions = {
  getAllQuestions ({ commit }) {
    http.get('/questions')
    .then(({ data }) => {
      commit('setQuestions', data.data)
    })
    .catch((err) => console.log(err))
  },
  getQuestionsUser ({ commit }) {
    http.get('/questions/posted_by/' + localStorage.getItem('token')).then(({data}) => {
      commit('setQuestionsUser', data.data)
    }).catch((err) => {
      console.error(err)
    })
  }
}

export default actions
