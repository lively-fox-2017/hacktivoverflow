<template>
  <div class="panel panel-primary">
    <div class="panel-heading">
      Latest Questions
    </div>
    <div class="panel-body">
      <div class="list-group">
        <router-link 
        v-for="(content, index) in content" 
        :to="'/' + content._id" 
        class="list-group-item"
        :key="index">
          {{ content.title }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['content']
}
</script>

<style scoped>
.panel-body {
  padding: 0;
}
.list-group {
  margin-bottom: 0;
}
.list-group-item {
  cursor: pointer;
}
</style>