import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loggedIn: false
  },
  mutations: {
    updateLoggedInState (state) {
      if (localStorage.getItem('access_token')) {
        state.loggedIn = true
      } else {
        state.loggedIn = false
      }
    }
  }
})
