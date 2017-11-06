const mutations = {
  toggleLog (state) {
    if (localStorage.getItem('token')) {
      state.loggedIn = true
    } else {
      state.loggedIn = false
    }
  },
  setQuestions (state, payload) {
    state.questions = payload
  },
  setUsername (state, payload) {
    state.username = payload
  },
  setQuestionsUser (state, payload) {
    state.questionsUser = payload
  },
  addQuestionUser (state, payload) {
    state.questionsUser.unshift(payload)
  },
  deleteQuestionUser (state, payload) {
    var index = state.questionsUser.findIndex((element) => {
      if (element._id === payload) {
        return element
      }
    })
    state.questionsUser.splice(index, 1)
  },
  editQuestionUser (state, payload) {
    var index = state.questionsUser.findIndex((element) => {
      if (element._id === payload._id) {
        return element
      }
    })
    // Vue.$set(state.questionsUser[index], 'title', payload.title)
    // Vue.$set(state.questionsUser[index], 'content', payload.content)
    // state.questionsUser[index] = payload
    state.questionsUser.splice(index, 1)
    state.questionsUser.splice(index, 0, payload)
  }
}

export default mutations
