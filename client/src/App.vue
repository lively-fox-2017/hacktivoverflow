<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <div class="container">
      <Navbar></Navbar>
      <Jumbotron></Jumbotron>
    </div>
    <router-view/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import Jumbotron from '@/components/Jumbotron'
export default {
  name: 'app',
  components: {
    Navbar,
    Jumbotron
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  /*color: #2c3e50;*/
  /*margin-top: 60px;*/
}
</style>
