<template lang="html">
  <div class="panel panel-primary">
    <div class="panel-heading">
        <h3 class="panel-title">{{ question.title }}</h3>
        <ul class="nav navbar-nav navbar-right">
            <router-link :to="{ name: '', params: {} }" class="btn btn-primary btn-xs">Vote <span class="badge"  > {{ question.voters.length }}</span></router-link>
        </ul>
    </div>
    <div class="panel-body question">
      <div class="row">
        <!-- <div class="col-md-1">
          <img :src="question.askBy.imgUrl" alt="">
        </div> -->
        <div class="col-md-12">
          <p>{{ question.content }}</p>
          <!-- <p>{{ question.voters.filter(a => a.voter=='59f9d16eed550b7df8c5a813').length }}</p> -->
        </div>

      </div>

      <ul class="nav nav-pills">
        <a href="#"  @click="voteupquestion(question._id)" class="btn btn-primary btn-sm" v-if="question.voters.filter(a => a.voter=='59f9d16eed550b7df8c5a813').length==0">Vote</a>
        <a href="#"  @click="votedownquestion(question._id)" class="btn btn-primary btn-sm" v-if="question.voters.filter(a => a.voter=='59f9d16eed550b7df8c5a813').length>0">UnVote</a>
        <router-link :to="'/question/' + question._id" class="btn btn-warning btn-sm">Detail</router-link>
        <a href="#" class="btn btn-danger btn-sm">Delete</a>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: ['question'],
  components: {
  },
  methods: {
    ...mapActions([
      'addVote',
      'redVote'
    ]),
    voteupquestion (id) {
      this.addVote(id)
    },
    votedownquestion (id) {
      this.redVote(id)
    }
  }
}
</script>

<style lang="css">
</style>
