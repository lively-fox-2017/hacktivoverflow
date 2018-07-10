<template>
 <a href="#" class="list-group-item">
    <div class="row">
      <div class="col-md-12">
        <router-link :to="'/' + content._id">
          <h4 class="list-group-item-heading">
            {{ content.title }}
          </h4>
        </router-link>
        <p class="list-group-item-text">
          {{ content.content.substring(0, 150) }} . . .
        </p>
      </div>
    </div>
  </a>
</template>

<script>
export default {
  props: ['content']
}
</script>