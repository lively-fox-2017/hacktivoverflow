const mutations = {
  toggleLog (state) {
    if (localStorage.getItem('token')) {
      state.loggedIn = true
    } else {
      state.loggedIn = false
    }
  }
}

export default mutations
