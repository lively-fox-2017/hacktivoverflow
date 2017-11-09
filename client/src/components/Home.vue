<template>
  <div class="home">
    <!-- <Allquestion/> -->
    <!-- <Question/> -->
    <router-view></router-view>
  </div>
</template>

<script>
import Allquestion from '@/components/Allquestion'
import Question from '@/components/Question'
export default {
  name: 'Home',
  components: {
    Allquestion,
    Question
  },
  data () {
    return {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
