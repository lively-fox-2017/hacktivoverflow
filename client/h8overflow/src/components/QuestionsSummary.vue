<template lang="html">
  <div class="panel panel-primary">
    <div class="panel-heading">
        <h2 class="panel-title">{{ question.title }}</h2>
        <small>Asked by {{ question.askBy.userid }}</small>
        <ul class="nav navbar-nav navbar-right">
            <router-link :to="{ name: '', params: {} }" class="btn btn-primary btn-xs">Vote <span class="badge"  > {{ question.voters.length }}</span></router-link>
        </ul>
    </div>
    <div class="panel-body question">
      <div class="row">
        <div class="col-md-12">
          <p>{{ question.content }}</p>
        </div>
      </div>
      <ul class="nav nav-pills">
        <button type="button"  @click="voteupquestion(question._id)" class="btn btn-primary btn-sm"   v-if="question.voters.filter(a => a.voter==id).length==0">Vote</button>
        <button type="button"  @click="votedownquestion(question._id)" class="btn btn-primary btn-sm" v-if="question.voters.filter(a => a.voter==id).length>0">UnVote</button>
        <router-link :to="'/question/' + question._id" class="btn btn-warning btn-sm">Detail</router-link>
        <button type="button" @click="deleteQuestion(question._id)" class="btn btn-danger btn-sm" v-if="question.askBy==id">Delete</button>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
// import jwtdecode from 'jwt-decode'
export default {
  props: ['question'],
  components: {
  },
  methods: {
    ...mapActions([
      'addVote',
      'redVote',
      'deleteQuestion'
    ]),
    voteupquestion (id) {
      this.addVote(id)
    },
    votedownquestion (id) {
      this.redVote(id)
    }
  },
  computed: {
    ...mapState([
      'id'
    ])
  }
}
</script>

<style lang="css">
</style>
