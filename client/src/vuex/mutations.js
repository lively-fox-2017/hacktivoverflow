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
    state.questionsUser[index] = payload
  }
}

export default mutations
