import axios from 'axios'

const http = axios.create({
  baseURL: 'http://localhost:3000'
})

const actions = {
  getAllArticles ({ commit }) {
    http.get('/articles')
    .then(({ data }) => {
      commit('setArticles', data)
    })
    .catch((err) => console.log(err))
  }
}

export default actions
