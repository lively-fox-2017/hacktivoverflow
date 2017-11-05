<template lang="html">
  <nav class="navbar navbar-inverse">
    <div class="container-fluid">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-2">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" href="#">Brand</a>
      </div>

      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-2">
        <ul class="nav navbar-nav">
          <li class="active"><router-link to="/">Home</router-link></li>
          <li><a href="#">My Questions</a></li>
        </ul>
        <!-- <ul class="nav navbar-nav navbar-right">
          <li><a href="#">Link</a></li>
        </ul> -->
      </div>
    </div>
  </nav>
</template>

<script>
export default {
}
</script>

<style lang="css">
</style>
