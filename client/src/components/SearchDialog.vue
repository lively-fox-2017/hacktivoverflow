<template lang="html">
  <md-dialog md-open-from="#search" md-close-to="#search" ref="Search">
    <form v-on:submit.prevent="doSearch">
      <md-dialog-title>Search a Question</md-dialog-title>
      <md-dialog-content>
        <md-input-container>
          <label>Search / Tags</label>
          <md-input type="text" v-model="search" required></md-input>
        </md-input-container>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-primary" type="submit">Search</md-button>
      </md-dialog-actions>
    </form>
  </md-dialog>
</template>

<script>
export default {
  data () {
    return {
      search: ''
    }
  },
  methods: {
    doSearch () {
      console.log('aaa')
    },
    openDialog (ref) {
      this.$refs[ref].open()
    }
  }
}
</script>

<style lang="css">
</style>
