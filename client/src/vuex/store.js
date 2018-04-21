import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

const initialState = {
  questions: [],
  questionsUser: [],
  username: '',
  loggedIn: false
}

export default new Vuex.Store({
  state: {
    ...initialState
  },
  mutations,
  actions
})
