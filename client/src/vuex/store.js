import Vue from 'vue'
import Vuex from 'vuex'
import jwt from 'jsonwebtoken'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loggedIn: false,
    user_id: '',
    user_name: '',
    user_email: ''
  },
  mutations: {
    updateLoggedInState (state) {
      const accessToken = localStorage.getItem('access_token')

      if (accessToken) {
        const loggedInUser = jwt.decode(accessToken)
        state.user_id = loggedInUser._id
        state.user_name = loggedInUser.name
        state.user_email = loggedInUser.email
        state.loggedIn = true
      } else {
        state.user_id = ''
        state.user_name = ''
        state.user_email = ''
        state.loggedIn = false
      }
    }
  }
})
