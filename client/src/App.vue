<template>
  <div id="app">

    <div class="">
      <Navbar/>
    </div>

    <div>
      <div class="col-sm-4">
        <Loginpanel/>
      </div>
      <div class="col-sm-8">
        <router-view/>
      </div>
    </div>


  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import Loginpanel from '@/components/Loginpanel'
export default {
  name: 'app',
  components: {
    Navbar,
    Loginpanel
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-size: 13px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  margin-top: 0px;
}
</style>
