<template lang="html">
<div>
  <md-dialog ref="dialogFormAnswer">
    <md-dialog-title>Edit Answer</md-dialog-title>
    <form v-on:submit.prevent="save">
      <md-dialog-content>
        <md-input-container>
          <label>Answer Content</label>
          <md-input type="text" v-model="answer.answer" required></md-input>
        </md-input-container>
      </md-dialog-content>

      <md-dialog-actions>
        <md-button class="md-primary" @click="closeDialog('dialogFormAnswer')">Cancel</md-button>
        <md-button class="md-primary" type="submit">Update</md-button>
      </md-dialog-actions>
    </form>
  </md-dialog>
  <md-dialog-alert
  :md-content="alert.content"
  :md-ok-text="alert.ok"
  ref="updateAnswerNotif">
  </md-dialog-alert>
</div>
</template>

<script>
export default {
  props: ['answer'],
  data () {
    return {
      alert: {
        content: 'a',
        ok: 'a'
      }
    }
  },
  methods: {
    openDialog (ref) {
      this.$refs[ref].open()
    },
    closeDialog (ref) {
      this.$refs[ref].close()
    },
    save () {
      this.$http.put('/answers/' + this.answer._id, {
        answer: this.answer.answer
      }).then(({data}) => {
        this.openDialog('updateAnswerNotif')
        this.alert.content = 'Your answer successfully updated'
        this.alert.ok = 'Cool!'
        console.log(data)
        this.closeDialog('dialogFormAnswer')
        this.$emit('editAnswer', data)
      }).catch((err) => {
        this.alert.content = 'There\' some error'
        this.alert.ok = 'Sad:('
        this.openDialog('updateAnswerNotif')
        console.error(err)
      })
    }
  }
}
</script>

<style lang="css">
</style>
