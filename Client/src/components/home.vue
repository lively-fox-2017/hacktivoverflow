<template>
  <div class="hello">
    <h2 class="text-center">Top Questions</h2>
    <div class="list-group col-md-8 col-sm-12 col-md-offset-2">
      <router-link class="list-group-item col-md-12" v-for="(value, index) in Questions" :to="'/'+value._id" :key="index">
        <div class="votes col-md-1 text-center bg-success">
          <h2>{{ value.votersCount }}</h2>
          <h4>Votes</h4>
        </div>
        <div class="col-md-11">
          <h4 class="list-group-item-heading title">{{ value.title }} <span class='createdDate'>created at {{ value.createdAt | moment('D MMMM YYYY, h:mm') }}</span></h4><hr>
          <p class="list-group-item-text">{{ value.question.substring(0,80) }} ...<span class='asker'>asked by <span class="user">{{ value.user.username }}</span></span></p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    Questions () {
      return this.$store.state.questions
    }
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
  }

  .createdDate{
    float: right;
    font-size: 12px;
  }

  .asker{
    float: right;
  }

  .user{
    color: blue;
  }

  hr{
    border-color: green;
  }
</style>
