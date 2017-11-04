<template lang="html">
<div>
  <NavBar @openLoginDialog="openLoginDialog" @openSearchDialog="openSearchDialog"/>
  <LoginDialog ref="Login"/>
  <SearchDialog ref="Search" @doSearch="doSearch"/>
  <md-layout md-align="center" md-row md-sm-column style="padding: 8px;">
    <md-layout md-flex="75" md-align="center">
      <router-view :search="search"/>
    </md-layout>
  </md-layout>
</div>
</template>

<script>
import { mapActions } from 'vuex'
import NavBar from '@/components/NavBar'
import LoginDialog from '@/components/LoginDialog'
import QuestionList from '@/components/QuestionList'
import SearchDialog from '@/components/SearchDialog'
export default {
  data () {
    return {
      search: ''
    }
  },
  components: {
    NavBar,
    LoginDialog,
    SearchDialog,
    QuestionList
  },
  methods: {
    openLoginDialog () {
      this.$refs['Login'].openDialog('Login')
    },
    openSearchDialog () {
      this.$refs['Search'].openDialog('Search')
    },
    doSearch (val) {
      this.search = val
    },
    ...mapActions([
      'getAllQuestions'
    ])
  },
  created () {
    this.getAllQuestions()
  }
}
</script>

<style lang="css">
</style>
