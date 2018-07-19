<template>
  <div class="hello">
    <askQuestion v-if="isLogin == true" />

    <h2 class="col-md-8 col-sm-12 col-md-offset-2 text-center">Top Questions</h2>
    <div class="list-group col-md-8 col-sm-12 col-md-offset-2">
      <a class="list-group-item col-md-12" v-for="(value, index) in Questions" :key="index">
        <router-link :to="'/detailQuestion/'+value._id">
          <div class="votes col-md-1 text-center bg-success">
            <h2>{{ value.votersCount }}</h2>
            <h4>Votes</h4>
          </div>
          <div class="col-md-11">
            <h4 class="list-group-item-heading title">{{ value.title }} <span class='createdDate'>created at {{ value.createdAt | moment('D MMMM YYYY, h:mm') }}</span></h4><hr>
            <p class="list-group-item-text">{{ value.question.substring(0,80) }} ...</p>
            <h6 class='text-right'>asked by <span class="user">{{ value.user.username }}</span></h6>
          </div>
        </router-link>
      </a>
    </div>
  </div>
</template>

<script>
import askQuestion from '@/components/askQuestion'
export default {
  components: {
    askQuestion
  },
  computed: {
    Questions () {
      return this.$store.state.questions
    },
    isLogin () {
      return this.$store.state.isLogin
    },
    userId () {
      return this.$store.state.userId
    }
  },
  watch: {
    isLogin (newUserId) {
      let decodedToken = this.$jwt.decode()
      this.$store.commit('setUserId', decodedToken._id)
    }
  },
  created () {
    let decodedToken = this.$jwt.decode()
    this.$store.commit('setUserId', decodedToken._id)
  }
}
</script>

<style scoped>
  .votes{
    color: white;
    border-radius: 100%;
    padding: 0px;
  }

  .title{
    font-weight: bold;
    color: black;
  }

  .createdDate{
    float: right;
    font-size: 12px;
  }

  .user{
    color: blue;
  }

  hr{
    border-color: green;
  }
</style>
